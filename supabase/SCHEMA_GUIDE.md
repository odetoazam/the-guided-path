# AyahGuide Content Architecture — Schema Guide

## Table Overview

| Table | Purpose | Rows (est.) |
|-------|---------|-------------|
| `entities` | Knowledge graph nodes (people, concepts, divine names, topics) | ~250+ |
| `articles` | Authored thematic content (any topic, any length) | Growing |
| `ayah_records` | Passage-based records (1-5 ayahs), with Layer A + Layer B | ~6,236 max |
| `entity_tags` | Join table connecting content → entities, with `is_primary` | Many |
| `hub_synthesis_cache` | AI-generated overview text per entity hub | 1 per entity |
| `entity_co_occurrence` | Materialized view for knowledge graph edges | Auto |

Existing tables (`posts`, `profiles`, `subscribers`, `email_logs`, `settings`, `analytics`) are unchanged. `posts` remains the surah-overview layer.

---

## Sample Queries for Each UX Pattern

### 1. Glossary Popover (fast single-entity lookup)

When a gold-underlined term is tapped in article prose:

```sql
SELECT
  slug, name_arabic, name_translit, name_english,
  one_line, pronunciation, root_letters, root_meaning,
  glossary_data->'summary' AS summary
FROM entities
WHERE slug = 'shaytan';
```

Response time: <1ms (indexed on slug). Returns everything the popover needs: Arabic, transliteration, meaning, one-line definition, and the "Explore hub →" link is just `/hub/{slug}`.

---

### 2. Inline Ayah Card (ayah lookup by surah + range)

Ayah cards embedded in article flow, expandable to show Layer A:

```sql
SELECT
  id, surah_number, ayah_start, ayah_end,
  arabic_text, translation,
  layer_a->>'grounding_html' AS grounding
FROM ayah_records
WHERE surah_number = 7
  AND ayah_start <= 20 AND ayah_end >= 20
  AND status = 'published';
```

For a specific passage (e.g., 2:51-52):

```sql
SELECT *
FROM ayah_records
WHERE surah_number = 2 AND ayah_start = 51 AND ayah_end = 52
  AND status = 'published';
```

---

### 3. Bottom Sheet (ayah record + all articles where tagged)

When tapping a compact ayah reference, the bottom sheet needs the full ayah record AND all articles that reference it:

```sql
-- Step 1: Get the ayah record
SELECT * FROM ayah_records
WHERE surah_number = 7 AND ayah_start <= 20 AND ayah_end >= 20
  AND status = 'published';

-- Step 2: Get all articles tagged with the same entities as this ayah
-- (the "also appears in" section)
SELECT DISTINCT a.id, a.title, a.slug, a.excerpt
FROM articles a
JOIN entity_tags et_article ON et_article.article_id = a.id
WHERE et_article.entity_id IN (
  SELECT et_ayah.entity_id
  FROM entity_tags et_ayah
  WHERE et_ayah.ayah_record_id = '{ayah_record_id}'
)
AND a.status = 'published'
LIMIT 5;
```

Or combined in one round-trip using Supabase's RPC:

```sql
-- As a function for the API layer
CREATE OR REPLACE FUNCTION get_ayah_bottom_sheet(
  p_surah INT, p_ayah INT
) RETURNS TABLE (
  ayah_record JSONB,
  related_articles JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH target_ayah AS (
    SELECT ar.*
    FROM ayah_records ar
    WHERE ar.surah_number = p_surah
      AND ar.ayah_start <= p_ayah AND ar.ayah_end >= p_ayah
      AND ar.status = 'published'
    LIMIT 1
  ),
  tagged_entities AS (
    SELECT et.entity_id
    FROM entity_tags et, target_ayah ta
    WHERE et.ayah_record_id = ta.id
  ),
  related AS (
    SELECT DISTINCT ON (a.id)
      jsonb_build_object('id', a.id, 'title', a.title, 'slug', a.slug) AS article
    FROM articles a
    JOIN entity_tags et ON et.article_id = a.id
    WHERE et.entity_id IN (SELECT entity_id FROM tagged_entities)
      AND a.status = 'published'
    LIMIT 5
  )
  SELECT
    to_jsonb(ta.*) AS ayah_record,
    COALESCE(jsonb_agg(r.article), '[]'::jsonb) AS related_articles
  FROM target_ayah ta
  LEFT JOIN related r ON true
  GROUP BY ta.*;
END;
$$ LANGUAGE plpgsql STABLE;
```

---

### 4. Branching Navigation (articles sharing 2+ tags)

At natural breakpoints, show 2-3 "where to next?" options from content sharing overlapping tags:

```sql
-- Given current article's entity tags, find articles with the most overlap
WITH current_tags AS (
  SELECT entity_id
  FROM entity_tags
  WHERE article_id = '{current_article_id}'
),
candidates AS (
  SELECT
    et.article_id,
    COUNT(*) AS shared_tags
  FROM entity_tags et
  JOIN current_tags ct ON ct.entity_id = et.entity_id
  WHERE et.article_id IS NOT NULL
    AND et.article_id != '{current_article_id}'
  GROUP BY et.article_id
  HAVING COUNT(*) >= 2
  ORDER BY COUNT(*) DESC
  LIMIT 3
)
SELECT a.id, a.title, a.slug, a.excerpt, c.shared_tags
FROM candidates c
JOIN articles a ON a.id = c.article_id
WHERE a.status = 'published'
ORDER BY c.shared_tags DESC;
```

---

### 5. Hub Auto-Assembly (all primary-tagged content for an entity)

Entity hub page pulls all primary-tagged articles and ayah records:

```sql
-- Entity header data
SELECT * FROM entities WHERE slug = 'shaytan';

-- AI synthesis (check freshness)
SELECT synthesis_html, content_hash, last_generated_at
FROM hub_synthesis_cache
WHERE entity_id = '{entity_id}';

-- All primary articles
SELECT a.id, a.title, a.slug, a.excerpt, a.published_at, a.reading_time_minutes
FROM articles a
JOIN entity_tags et ON et.article_id = a.id
WHERE et.entity_id = '{entity_id}'
  AND et.is_primary = true
  AND a.status = 'published'
ORDER BY a.published_at DESC;

-- All primary ayah records
SELECT ar.surah_number, ar.ayah_start, ar.ayah_end,
       ar.arabic_text, ar.translation, ar.title
FROM ayah_records ar
JOIN entity_tags et ON et.ayah_record_id = ar.id
WHERE et.entity_id = '{entity_id}'
  AND et.is_primary = true
  AND ar.status = 'published'
ORDER BY ar.surah_number, ar.ayah_start;

-- Connected entities (for the "Connected Entities" chips)
SELECT DISTINCT e.slug, e.name_translit, e.name_arabic, e.category
FROM entity_co_occurrence co
JOIN entities e ON e.id = CASE
  WHEN co.entity_a = '{entity_id}' THEN co.entity_b
  ELSE co.entity_a
END
WHERE (co.entity_a = '{entity_id}' OR co.entity_b = '{entity_id}')
ORDER BY co.co_occurrence_count DESC
LIMIT 12;
```

---

### 6. Knowledge Graph (entity connections by co-occurrence)

Visualize entity connections — which entities appear together most:

```sql
-- Get graph centered on a specific entity
SELECT
  e_a.slug AS source_slug,
  e_a.name_translit AS source_name,
  e_b.slug AS target_slug,
  e_b.name_translit AS target_name,
  co.co_occurrence_count AS weight
FROM entity_co_occurrence co
JOIN entities e_a ON e_a.id = co.entity_a
JOIN entities e_b ON e_b.id = co.entity_b
WHERE co.entity_a = '{entity_id}' OR co.entity_b = '{entity_id}'
ORDER BY co.co_occurrence_count DESC
LIMIT 20;

-- Full graph (for visualization, limited)
SELECT
  e_a.slug AS source, e_b.slug AS target,
  co.co_occurrence_count AS weight
FROM entity_co_occurrence co
JOIN entities e_a ON e_a.id = co.entity_a
JOIN entities e_b ON e_b.id = co.entity_b
WHERE co.co_occurrence_count >= 2
ORDER BY co.co_occurrence_count DESC
LIMIT 100;
```

After bulk tagging operations, refresh the materialized view:

```sql
SELECT refresh_entity_co_occurrence();
```

---

## Migration Path for Existing Content

### A. glossary.ts → entities table

The 222 glossary entries in `src/data/glossary.ts` map to `entities` rows.

**Category mapping:**
| Glossary Category | Entity Category |
|---|---|
| States of the Heart | `concepts` |
| The Unseen | `concepts` |
| Concepts of Existence | `concepts` |
| Theology & Ethics | `concepts` |
| Study Terms | `topics` |
| Quranic Characters | `people` |
| Nations & Peoples | `people` |

**Field mapping:**
| GlossaryEntry field | Entity column |
|---|---|
| `slug` | `slug` |
| `term` | `name_arabic` |
| `transliteration` | `name_translit` |
| — | `name_english` (derive from evocativeLine or manual) |
| Category (mapped) | `category` |
| `evocativeLine` | `one_line` |
| `pronunciation` | `pronunciation` |
| `root.letters` | `root_letters` |
| `root.transliteration` | `root_translit` |
| `root.meaning` | `root_meaning` |
| `root.elaboration` | `root_elaboration` |
| `occurrenceCount` | `occurrence_count` |
| `occurrenceNote` | `occurrence_note` |
| Everything else | `glossary_data` (JSONB) |

**Migration approach:** Write a Node.js script that:
1. Imports `GLOSSARY_TERMS` and `GLOSSARY_ENTRIES` from `glossary.ts`
2. Maps each entry to an INSERT statement
3. Packs `rootForms`, `keyAyahs`, `scholarsSaid`, `semanticField`, `practicalSection`, `relatedTerms`, `goDeeper`, `hadith`, `acrossTransitions` into `glossary_data` JSONB
4. Outputs SQL or uses Supabase JS client to insert

**New entities not in glossary:** Divine names (Al-Ghafoor, Al-Lateef, etc.) and topic-level entities (marriage, death, wealth) will need to be created separately — either manually or from the article planning list.

### B. Markdown files → ayah_records table

152 files across 3 surahs (Al-Fatiha, Al-Baqarah, Al-Ghashiyah).

**What's in each file:**
- YAML frontmatter: `surah`, `surah_name`, `ayahs` (range string), `title`, `arabic`, `translation`, `word_count`, `estimated_duration`, `passage_context`
- HTML comments: linguistic grounding table, form decisions, absence flags — **this is Layer A**
- Main prose: introduction, themed sections — **this is Layer B**

**Processing needed:**
1. Parse YAML frontmatter → structured fields
2. Parse ayah range: `"51-52"` → `ayah_start: 51, ayah_end: 52`; `"025"` → `ayah_start: 25, ayah_end: 25`
3. Extract HTML comments (everything between `<!--` and `-->`) → Layer A JSONB
4. Extract prose sections (everything after the frontmatter that isn't a comment) → Layer B JSONB
5. Some files may be "tafsir-reports" (research notes) — skip these or flag as draft

**Script outline:**
```javascript
import fs from 'fs';
import matter from 'gray-matter';
import { createAdminClient } from '@/lib/supabase/admin';

const supabase = createAdminClient();

for (const file of markdownFiles) {
  const { data: fm, content } = matter(fs.readFileSync(file, 'utf8'));

  const [ayahStart, ayahEnd] = fm.ayahs.includes('-')
    ? fm.ayahs.split('-').map(Number)
    : [Number(fm.ayahs), Number(fm.ayahs)];

  // Split content into comments (Layer A) and prose (Layer B)
  const comments = [...content.matchAll(/<!--([\s\S]*?)-->/g)].map(m => m[1]);
  const prose = content.replace(/<!--[\s\S]*?-->/g, '').trim();

  await supabase.from('ayah_records').insert({
    surah_number: fm.surah,
    ayah_start: ayahStart,
    ayah_end: ayahEnd,
    arabic_text: fm.arabic,
    translation: fm.translation,
    title: fm.title,
    word_count: fm.word_count,
    estimated_duration: fm.estimated_duration,
    passage_context: fm.passage_context,
    layer_a: { grounding_raw: comments.join('\n\n') },
    layer_b: { reflection_md: prose },
    status: 'published',
  });
}
```

**Important:** Layer A and Layer B content in the markdown files is rich and needs careful parsing. The above is a starting point — you'll likely want to further structure the Layer A JSONB (parse the word tables, form decisions separately) and render Layer B markdown to HTML.

### C. Entity tagging for migrated content

After ayah_records are loaded, AI-assisted tagging:
1. For each ayah_record, send the passage context + Layer B reflection to an AI
2. Ask for `{ primary: [...slugs], secondary: [...slugs] }` output
3. Match slugs against `entities.slug`
4. Insert into `entity_tags`

This should be built as a skill that can be run incrementally as content is added.
