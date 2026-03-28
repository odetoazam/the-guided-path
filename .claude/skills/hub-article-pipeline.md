---
name: hub-article-pipeline
description: End-to-end pipeline for writing, validating, inserting, and synthesizing thematic articles for AyahGuide entity hub pages. Covers article authoring with Quranic accuracy checks, entity tagging, database insertion, and hub synthesis generation.
triggers:
  - write articles for
  - create hub articles
  - article pipeline
  - write about entity
  - hub article
  - insert articles
  - generate hub synthesis
  - synthesize hub page
  - article batch
  - write and publish articles
---

# Hub Article Pipeline

## Purpose

This skill governs the full lifecycle of creating thematic articles for AyahGuide entity hub pages: from research through writing, validation, insertion, entity tagging, and hub synthesis generation.

## Pipeline Overview

```
1. RESEARCH    → Understand the entity, its Quranic footprint, and existing coverage
2. PLAN        → Decide article count, angles, and entity tag strategy
3. WRITE       → Author articles with proper Quranic references and Arabic text
4. VALIDATE    → Run all 3 Quranic validators on every article
5. INSERT      → Insert articles + entity tags into Supabase
6. AYAH RECORDS → Extract key ayahs from articles → generate tadabbur → tag to entity
7. SYNTHESIZE  → Generate hub overview synthesis from the published articles
8. VERIFY      → Confirm hub page renders correctly
```

---

## Step 1: RESEARCH

Before writing a single word, understand the entity:

```sql
-- Check what entity data exists
SELECT slug, name_arabic, name_translit, category, one_line,
       root_letters, root_meaning, occurrence_count, glossary_data
FROM entities WHERE slug = '{entity_slug}';

-- Check existing articles tagged to this entity
SELECT p.title, p.slug, p.type, et.is_primary
FROM posts p
JOIN entity_tags et ON et.post_id = p.id
JOIN entities e ON e.id = et.entity_id
WHERE e.slug = '{entity_slug}' AND p.status = 'published';

-- Check connected entities (for cross-referencing)
SELECT e2.slug, e2.name_translit, ec.count
FROM entity_co_occurrence ec
JOIN entities e1 ON e1.id = ec.entity_a_id
JOIN entities e2 ON e2.id = ec.entity_b_id
WHERE e1.slug = '{entity_slug}'
ORDER BY ec.count DESC;
```

Key research questions:
- How many times does this entity appear in the Quran? (occurrence_count)
- What are its root letters and linguistic depth?
- Which other entities co-occur with it? (these become secondary tags)
- What surahs feature it most prominently?
- What has already been written about it?

---

## Step 2: PLAN

### Article Count
- **Minimum 3 articles** per entity for a meaningful synthesis
- **Ideal: 4-6 articles** covering different angles
- Each article should stand alone but contribute to a cohesive whole

### Angle Strategy
Every article set should cover distinct facets. Common patterns:

| Angle Type | Example (Shaytan) |
|---|---|
| Core profile / overview | "The Psychology of Shaytan" |
| Methodology deep-dive | "The Footsteps of Shaytan" |
| Key Quranic scene | "Shaytan's Promise (Surah Ibrahim 14:22)" |
| Internal alliance | "The Alliance of Iblis and the Nafs" |
| Counter-strategy | "The Weapons Against Waswasa" |
| Comparative / thematic | "What the Quran Doesn't Say About Shaytan" |

### Entity Tag Plan
Before writing, map out entity tags for each article:
- **Primary tags**: The main entities the article is _about_ (drives hub page listing)
- **Secondary tags**: Entities mentioned or relevant but not the focus
- Every article MUST have the target entity as a primary tag
- Cross-tagging to related entities creates the knowledge graph connections

---

## Step 3: WRITE

### Article Format

Articles are stored as `content_html` in the `posts` table. Use this structure:

```html
<article class="prose-blog">
  <p class="text-lg leading-relaxed">{opening paragraph — hook the reader}</p>

  <p>{body paragraphs}</p>

  <h2>{section heading}</h2>

  <!-- Ayah quotes use this exact structure -->
  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      {Arabic text — MUST be exact Quranic text}
    </p>
    <p class="translation">{English translation}</p>
    <cite>{Surah Name} ({surah_number}:{ayah_number})</cite>
  </blockquote>

  <p>{analysis of the ayah}</p>
</article>
```

### Writing Rules

1. **Arabic text**: Every Arabic quotation MUST be exact Quranic text. Never paraphrase Arabic.
2. **Transliteration**: Use consistent transliteration (e.g., Shaytan not Shaitan, taqwa not taqwā).
3. **References**: Always cite surah name + number:ayah (e.g., "Surah Al-A'raf (7:16-17)").
4. **Length**: 8-15 minute reading time (1500-3000 words). Each article should feel substantial.
5. **Originality**: Don't repeat the same ayahs across articles in the same batch. Each article should surface different Quranic evidence.
6. **No hadith** unless specifically requested — the platform focuses on Quranic text.
7. **Entity linking**: When mentioning other entities that exist in the system, note them for tagging.

---

### Literary Voice Framework

The voice of AyahGuide articles is the voice of intellectual discovery happening in real time — the reader watching meaning emerge from the Arabic text, not being told what to think about it. The tadabbur content (in `content/tadabbur/`) is the reference standard: root-tracing as methodology, absence as data, evidence before interpretation. Articles must match this standard.

#### Anti-Patterns — Eight Patterns to Eliminate

**1. Negation Cascade** — "Not X, not Y, but Z" / "He doesn't... He doesn't... He..."
- BAD: "His rebellion is intellectual, not emotional. He doesn't rage blindly. He constructs arguments."
- GOOD: "His refusal arrives as a syllogism — he cites material composition, names Adam's clay, derives a hierarchy. The rebellion wears the grammar of proof."
- RULE: Maximum one negation construct per section (between `<h2>` tags). When a second appears, rebuild around the affirmative.

**2. Declarative Hammering** — announcing importance
- BAD: "This matters enormously." / "This is critical." / "This is the first and most foundational insight."
- GOOD: Delete the sentence entirely. If the evidence is strong, the reader feels the weight. If they don't, strengthen the evidence.
- RULE: Delete every sentence whose sole function is telling the reader how important something is.

**3. Forced Staccato** — short fragments manufactured for gravitas
- BAD: "Two sentences. Two truths. First:"
- GOOD: "He calls the barrier *rahma* and in the same breath announces its destruction."
- RULE: Never write a sentence whose only content is a count or label for what follows.

**4. Rhetorical Scaffolding** — narrating your analytical process
- BAD: "Notice what happens here." / "Pay close attention to..." / "There are several layers to unpack." / "Let me show you why this matters."
- GOOD: Delete the sentence and begin the analysis directly.
- RULE: Never announce your own analytical process. Never instruct the reader to pay attention.

**5. Bold-as-Emphasis** — wrapping thesis statements in `<strong>` to simulate a raised voice
- BAD: `<strong>his rebellion is intellectual, not emotional</strong>`
- RULE: Reserve `<strong>` exclusively for Arabic terms, ayah references, and proper nouns. Never bold an interpretive claim.

**6. Template Formula** — coining a catchy phrase and branding it as "the template"
- BAD: "This pattern — correct observation, corrupt conclusion — is the template for every whisper."
- GOOD: Describe the mechanism each time it appears using the specific evidence of each instance. Patterns become visible through repetition, not through naming.

**7. Direct Address as Pressure** — overusing "you" for emotional force
- BAD: "He comes at you with reasons." / "how he operates on you"
- RULE: Second-person address is permitted but must be earned. Maximum twice per article, at moments of genuine existential weight. Let the reader enter the frame voluntarily.

**8. Connector Phrases as Transitions**
- BAD: "And this is exactly how..." / "And here's the thing..." / "And this is where it gets interesting..."
- RULE: Let paragraph breaks carry transitions. If two ideas need a bridge, build it from evidence.

#### Six Literary Models — Choose Per Article Type

Different article types channel different writers. This is where dynamism comes from — articles are unified by intellectual rigor but varied in voice.

1. **Guy Davenport** — for linguistic deep-dives. Microscopist precision. Every detail observed, nothing announced. Present three pieces of linguistic evidence in sequence without editorializing; let the fourth reframe the previous three. Use when the primary substance is "look at what this Arabic root does."

2. **John Berger** — for thematic/philosophical articles. The essay as seeing. Berger teaches you to look at what you've been looking past. Warm but never sentimental. Begin with a concrete observation (an image, a scene, a physical detail) and expand outward toward the universal. Use for articles exploring themes across surahs, spiritual psychology, or connecting Quranic concepts to lived experience.

3. **Maggie Nelson** — for contemplative/meditation articles. Fragment as form. Builds through accumulation of honest observations rather than thesis-and-support architecture. Em-dashes as primary punctuation, short paragraphs because each thought is complete, willingness to say "I don't know." Use for articles about the experience of reading the Quran.

4. **Toshihiko Izutsu** — for semantic field articles. The discipline of semantic analysis without academic dryness. Juxtapose two words English translates identically and show the chasm between them — exactly as the tadabbur does with *hamd* vs. *shukr*. Use for articles organized around a single Quranic term (*zulm*, *taqwa*, *sabr*).

5. **Annie Dillard** — for narrative/scene-based articles. Unflinching attention to a single Quranic scene until it yields meaning. Describe the scene before analyzing it — let the reader see it first, then name what they just saw. Use for articles built around one Quranic episode (Ibrahim's fire, Musa at the burning bush, the Adam narrative).

6. **James Baldwin** — for moral urgency articles. Moral clarity without preachiness. The paragraph that turns the mirror — never "them," always "we." Use for articles about accountability, the Day of Judgment, or contemporary moral questions through a Quranic lens.

#### Eight Voice Principles

1. **Root-Tracing as Methodology.** The primary analytical engine is showing how Arabic roots generate meaning. Every article uses root-tracing rather than declarative assertion. Show the root, trace its concrete origin, demonstrate how that origin informs the abstract usage.

2. **Absence as Data.** When the Quran omits something, that omission is a choice. Note what is absent, present what is present, and let the reader feel the gap. The tadabbur's "absence flags" system carries into articles.

3. **Evidence Before Interpretation.** Present the Arabic, show the morphological reality, lay out the textual evidence — THEN offer interpretation. Never lead with an interpretation and find supporting evidence afterward.

4. **Sequential Revelation.** Each paragraph adds exactly one new piece of information or insight. The reader should feel the argument accumulating like bricks, each one placed deliberately.

5. **Sonic Awareness.** When discussing an Arabic word, acknowledge its sound when relevant. The doubled *kaf* in *dakka'* is percussive. The *sin-fa* combination in *tasfikun* sounds like blood hitting stone. Phonetic quality is data.

6. **Trust the Reader.** Never explain why something matters. Present the evidence and let the reader feel its weight. If the reader doesn't feel it, the evidence needs strengthening — not amplification through declarative statements.

7. **Punctuation as Pace.** Em-dashes for asides and apposition. Periods for finality. Colons only for introducing Arabic text or quotations. No exclamation points. The pace should feel measured, deliberate.

8. **Metaphor from the Concrete.** Draw metaphors from the physical world — gardening, architecture, geography, craft, weather — rather than from abstraction. A root that means "rope" teaches more than a paragraph about "connection." The concrete image does the work.

#### Negation Rules

1. **One-Per-Section Rule.** Maximum one negation construct per section (between `<h2>` tags). This is the hardest rule and the most transformative.
2. **Quranic Exception.** When the Quran itself uses negation (*la taqrabu*, *la yasma'una*), the negation may be discussed freely. The rule applies to the writer's own constructs, not the text being analyzed.
3. **Replacement Discipline.** For every negation deleted, write what IS happening. "He doesn't rage blindly" → "His refusal arrives as a syllogism."
4. **Negation Audit.** After drafting, count these tokens: "not," "doesn't," "never," "isn't," "no " (with trailing space), "don't." A 2000-word article should have fewer than 10 total (excluding Quranic quotations and translations).

### Step 3b: VOICE CHECK (run between WRITE and VALIDATE)

Before running the 3 content validators, run these voice checks on the content_html:

1. **Negation audit**: Count negation tokens. Threshold: < 10 per 2000 words (excluding blockquote content).
2. **Anti-pattern grep**: Search for these phrases and remove them:
   - "This is critical" / "This is important" / "This matters"
   - "Notice what happens" / "Pay close attention" / "Pay attention to"
   - "There are several layers" / "layers to unpack"
   - "And this is exactly" / "And here's the thing" / "And this is where"
   - "Let me show you" / "Let's explore" / "Let's look at"
3. **Bold audit**: Every `<strong>` tag must wrap either an Arabic term, a proper noun, or a Quranic reference — never an interpretive claim.
4. **Scaffolding audit**: Search for "notice," "observe that," "it's worth noting," "importantly," "crucially," "significantly."
5. **Staccato audit**: Flag any sequence of 3+ sentences under 6 words each.

### Post Metadata

Each article needs:
```typescript
{
  title: string,           // Compelling, specific title
  slug: string,            // kebab-case, unique, descriptive
  type: 'article',         // Always 'article' for hub content
  excerpt: string,         // 1-2 sentence hook (shown on cards)
  content_html: string,    // Full HTML content
  status: 'published',     // Or 'draft' if not ready
  tags: string[],          // String tags (legacy, keep for backward compat)
  reading_time_minutes: number,
  featured: false,         // Unless specifically requested
  published_at: new Date().toISOString(),
  created_by: '{admin_user_id}'  // Required — get from profiles table
}
```

---

## Step 4: VALIDATE

**MANDATORY** — Every article with Quranic content must pass all 3 validators.

### 4a. Arabic Text Verification
```bash
# Create a temporary file with the article HTML, then:
node scripts/verify_arabic.mjs /tmp/article.html --scan
```
Checks: Every Arabic quotation matches the actual Quranic text.

### 4b. Morphology Verification
```bash
node scripts/verify_morphology.mjs /tmp/article.html
```
Checks: Root word claims, word form analysis, and grammatical assertions.

### 4c. Tafsir Cross-Reference
```bash
node scripts/cross_reference_tafsir.mjs /tmp/article.html
```
Checks: Interpretive claims align with classical scholarship.

### Validation Rules
- ALL 3 must pass before insertion
- If any fail, fix the content and re-run ALL validators (fixing one issue can introduce another)
- Never skip validation — even for "simple" articles
- Log validation results for audit trail

---

## Step 5: INSERT

Use a script pattern like `scripts/insert-articles.ts`:

```typescript
#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 1. Insert post
const { data: post } = await supabase
  .from('posts')
  .insert({ ...article, created_by: ADMIN_USER_ID })
  .select('id')
  .single()

// 2. Tag entities
for (const tag of entityTags) {
  const { data: entity } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', tag.slug)
    .single()

  await supabase.from('entity_tags').insert({
    post_id: post.id,
    entity_id: entity.id,
    is_primary: tag.is_primary,
  })
}

// 3. Refresh co-occurrence counts (after all articles inserted)
await supabase.rpc('refresh_entity_co_occurrence')
```

### Insertion Checklist
- [ ] `created_by` field is set (NOT NULL constraint)
- [ ] Entity slugs exist in `entities` table before tagging
- [ ] `is_primary` is true for the main entity, false for secondary mentions
- [ ] Run with env vars loaded: `set -a && source .env.local && set +a`
- [ ] Call `refresh_entity_co_occurrence` after all inserts to update the knowledge graph

---

## Step 6: AYAH RECORDS (Priority Extraction)

Articles naturally identify the most important ayahs for an entity. This step extracts those key passages and creates full ayah records so the hub's "Ayah Records" tab has real depth from day one.

### 6a. Extract Key Ayahs

Scan all articles just inserted and list every Quranic passage cited:

```
Article: "The Psychology of Shaytan"
  → 15:33 (Iblis refuses to prostrate)
  → 7:16-17 (four-direction attack declaration)
  → 114:1-6 (al-waswas al-khannas)

Article: "Shaytan's Promise"
  → 14:22 (Day of Judgment confession)
  → 17:64 (Shaytan's tools: voice, cavalry, wealth, children)
```

### 6b. Prioritize and Group

Not every cited ayah needs a full record. Prioritize:
- **Must build**: Ayahs that are *central* to the entity's identity (e.g., 14:22 for Shaytan)
- **Should build**: Ayahs that appear across multiple articles (high co-citation)
- **Can skip**: Passing references or ayahs that are better covered under a different entity

Group ayahs into passages following the tadabbur project's grouping rules:
- 1-5 ayahs per record (single scene, argument, or narrative)
- Individual treatment for standalone concept-dense ayahs
- Up to 10 for repetitive refrains

### 6c. Generate Tadabbur via Skill

**CRITICAL: Use the `/quranic-tadabbur` skill for EVERY ayah record.** Do NOT write tadabbur content inline or via custom prompts.

For each prioritized passage:
1. Invoke `/quranic-tadabbur` with the surah and ayah range
2. The skill generates the full Layer A content (grounding_html, linguistic analysis, thematic exploration)
3. Save to `content/tadabbur/{surah_number}-{surah_slug}/ayah-{NNN}.md` or `ayahs-{NNN}-{NNN}.md`

### 6d. Validate Every Record

**MANDATORY** — same 3 validators as articles:
```bash
node scripts/verify_arabic.mjs content/tadabbur/{path} --scan
node scripts/verify_morphology.mjs content/tadabbur/{path}
node scripts/cross_reference_tafsir.mjs content/tadabbur/{path}
```
All 3 must pass. Fix and re-run until clean.

### 6e. Insert Ayah Records

```typescript
const { data: record } = await supabase
  .from('ayah_records')
  .insert({
    surah_number: 14,
    ayah_start: 22,
    ayah_end: 22,
    arabic_text: '...exact text...',
    translation: '...translation...',
    layer_a: { grounding_table: '...', linguistic_html: '...' }::jsonb,
    title: "Shaytan's Confession",
    status: 'published',
  })
  .select('id')
  .single()

// Tag to entity
await supabase.from('entity_tags').insert({
  ayah_record_id: record.id,
  entity_id: entityId,
  is_primary: true,
})
```

### 6f. Deduplication with Sequential Project

The ayah-level tadabbur project (`scripts/pending-ayahs.txt`) is building records surah-by-surah. To avoid conflicts:

- **Before generating**: Check if a record already exists for that surah:ayah range
  ```sql
  SELECT id FROM ayah_records
  WHERE surah_number = 14 AND ayah_start = 22 AND ayah_end = 22;
  ```
- **If it exists**: Just add the entity tag — don't regenerate the content
- **If it doesn't exist**: Generate, validate, and insert as above
- **When the sequential project reaches this ayah later**: It should check for existing records and skip/enrich rather than duplicate

### How Many Ayah Records Per Article Batch?

- **Target: 3-6 priority ayah records** per article batch
- Pick the passages that are most defining for the entity
- Don't try to cover every reference — the sequential project will catch the rest
- Quality over quantity: each record gets full tadabbur treatment

---

## Step 7: SYNTHESIZE

After all articles are inserted, generate a hub synthesis — a cohesive overview that distills insights from ALL the articles into a single narrative.

### Synthesis Rules

1. **Read all published articles** for the entity first
2. **Synthesize, don't summarize** — the overview should feel like a new piece of writing that weaves together insights from the articles, not a bullet-point summary
3. **Structure with clear sections** — use `<h2>` headings that capture the key themes (e.g., "The Profile", "The Method", "The Limitation", "The Defense")
4. **Include Arabic** — key Quranic phrases that define the entity should appear in the synthesis
5. **Keep it readable** — 800-1500 words. This is the "front door" to the entity.
6. **Cross-reference** — mention connections to other entities where natural

### Synthesis Insertion

```typescript
await supabase
  .from('hub_synthesis_cache')
  .upsert({
    entity_id: entityId,
    synthesis_html: synthesisHtml.trim(),
    content_hash: `${entity_slug}-${articleCount}-articles-v1`,
    last_generated_at: new Date().toISOString(),
  }, { onConflict: 'entity_id' })
```

### When to Re-synthesize
- When new articles are added to an entity
- Update `content_hash` to reflect the new article count/version
- The synthesis should incorporate insights from ALL articles, not just new ones

---

## Step 8: VERIFY

After insertion, ayah records, and synthesis:

1. **Check the hub page** at `/hub/{entity_slug}`
   - Overview tab shows synthesis prose (no raw data, no glossary dump)
   - Articles tab lists all inserted articles with correct excerpts
   - Ayah Records tab shows the priority records just created (count > 0)
   - Connections tab shows co-occurrence links updated
2. **Check individual article pages** at `/posts/{article_slug}`
   - Entity tags render as colored badges
   - Related articles section shows cross-referenced content
   - **Inline ayah grounding**: Every `<blockquote class="ayah-quote">` with a matching published ayah_record should show a "✦ Linguistic insight" toggle that expands to show grounding from layer_a
3. **Check ayah record content** — verify tadabbur files saved to `content/tadabbur/` with correct frontmatter
4. **Build check**: `npx tsc --noEmit && npx next build`

---

## Quick Reference: Database Tables

| Table | Key Fields | Notes |
|---|---|---|
| `posts` | title, slug, type, content_html, status, created_by | `type: 'article'` for hub content |
| `entities` | slug, name_arabic, category, glossary_data | The knowledge graph nodes |
| `entity_tags` | post_id/ayah_record_id, entity_id, is_primary | Join table — links both articles AND ayah records to entities |
| `ayah_records` | surah_number, ayah_start, ayah_end, layer_a, status | Passage-level tadabbur records |
| `hub_synthesis_cache` | entity_id (unique), synthesis_html, content_hash | One synthesis per entity |
| `entity_co_occurrence` | entity_a_id, entity_b_id, count | Materialized view, refresh after inserts |

## Admin User ID

Current admin: `5814582a-9f09-473a-be6f-619c210cca8e` (verify via `profiles` table if unsure)

---

## Anti-Patterns (Don't Do This)

- **Don't skip validation** — even one wrong Arabic quote undermines credibility
- **Don't write all articles from the same angle** — diversity of perspective is the whole point
- **Don't dump glossary_data into the overview** — the synthesis replaces it
- **Don't insert without entity tags** — untagged articles are orphaned from the hub system
- **Don't forget `refresh_entity_co_occurrence`** — the connections graph won't update otherwise
- **Don't use `Math.random()` for anything** — use `crypto.randomBytes()` if randomness is needed
- **Don't include hadith references** unless explicitly requested
- **Don't forget the cite format in blockquotes** — must be `<cite>Surah Name, {surah}:{ayah}</cite>` or `<cite>Surah Name ({surah}:{ayah})</cite>` for inline grounding to detect it

---

## Inline Ayah Grounding (Automatic)

When an article contains `<blockquote class="ayah-quote">` with a `<cite>` tag referencing a surah:ayah, AND a published `ayah_records` row exists for that passage, the article page automatically enriches the blockquote with an expandable "Linguistic insight" panel.

### How It Works

```
Server (page.tsx)                          Client (ArticleContent.tsx)
─────────────────                          ──────────────────────────
1. getAyahGroundings(contentHtml)          4. useEffect: scan blockquotes
   → regex extracts cite refs              5. parseCiteRef(cite.textContent)
   → fetches matching ayah_records         6. findGrounding(groundings, ref)
   → extractGroundingExcerpt(layer_a)      7. inject toggle + panel into DOM
   → returns [{surah,ayah,title,html}]     8. event delegation for click toggle
2. Promise.all([relatedPosts, groundings])
3. <ArticleContent html={...} ayahGroundings={...} />
```

### Key Files
- `src/components/ArticleContent.tsx` — client component, replaces raw `dangerouslySetInnerHTML`
- `src/app/(public)/posts/[slug]/page.tsx` — `getAyahGroundings()` + `extractGroundingExcerpt()`

### Excerpt Rules
- Pulls first **2 insights** from `layer_a.linguistic_html` (split by `###` headings)
- Each insight: section title (bold) + first content paragraph
- Truncated to ~160 chars per insight (sentence-break preferred)
- No extra network requests on click — all data preloaded server-side

### CSS Design
- Toggle: full-width, gold border, 44px min-height (iOS touch target), chevron rotates on open
- Panel: `max-height` transition (0 → 800px), gold-tinted background, 13px body text
- Mobile: `@media (max-width: 480px)` adjusts padding and font sizes
- Resets `font-style: normal` to prevent blockquote italic inheritance

### For This to Work, You Need:
1. Article blockquotes must use `class="ayah-quote"` and include a `<cite>` with `{surah}:{ayah}` pattern
2. A published `ayah_records` row must exist with matching `surah_number`, `ayah_start`, `ayah_end`
3. The record's `layer_a` JSONB must have a `linguistic_html` field with `###`-headed sections
