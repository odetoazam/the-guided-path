-- ============================================================================
-- AyahGuide Unified Content Architecture Migration
-- 2026-03-27 · REPLACES 20260327_001_content_architecture.sql (first draft)
-- ============================================================================
-- Key changes from _001 draft:
--   • No `articles` table — all authored content lives in `posts` with a
--     new `type` column ('article' | 'surah')
--   • entity_tags join table has NO article_id column
--   • entity_category enum uses the real glossary.ts categories (7 values)
--   • Co-occurrence materialized view joins on post_id + ayah_record_id only
-- ============================================================================
-- Existing tables (profiles, posts, subscribers, email_logs, settings,
-- analytics) are untouched except for the ALTER on `posts`.
-- ============================================================================


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  1. ALTER POSTS — add type discriminator column                          ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- The posts table already serves double duty: surah overviews (114 rows with
-- surah_number set) and future thematic articles. Making this explicit with
-- a type column lets us query/filter cleanly and add type-specific logic.

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'article'
  CHECK (type IN ('article', 'surah'));

-- Backfill: any post with a surah_number is a surah overview
UPDATE posts SET type = 'surah' WHERE surah_number IS NOT NULL;
-- Everything else stays 'article' via the DEFAULT

CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  2. ENTITIES — knowledge graph nodes (glossary → DB)                    ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Replaces the static glossary.ts file. Categories match the existing
-- frontend glossary categories, snake_cased for Postgres convention.

CREATE TYPE entity_category AS ENUM (
  'states_of_the_heart',    -- tawbah, khushu, taqwa, etc.
  'the_unseen',             -- Jannah, Jahannam, angels, etc.
  'quranic_characters',     -- Musa, Ibrahim, Firawn, Shaytan, etc.
  'nations_and_peoples',    -- Bani Isra'il, Quraysh, 'Ad, Thamud, etc.
  'study_terms',            -- tadabbur, tafsir, asbab al-nuzul, etc.
  'concepts_of_existence',  -- fitrah, ruh, nafs, etc.
  'theology_and_ethics'     -- tawhid, shirk, 'adl, ihsan, etc.
);

CREATE TABLE entities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,               -- kebab-case, used in /hub/{slug} and /glossary/{slug}
  name_arabic     TEXT NOT NULL,                       -- شَيْطَان
  name_translit   TEXT NOT NULL,                       -- Shaytan
  name_english    TEXT,                                -- "The Adversary" (optional)
  category        entity_category NOT NULL,
  one_line        TEXT NOT NULL,                       -- popover: evocative one-liner

  pronunciation   TEXT,                                -- IPA or informal guide

  -- Root info (for glossary header)
  root_letters    TEXT,                                -- ش-ط-ن
  root_translit   TEXT,                                -- sh-t-n
  root_meaning    TEXT,                                -- "to be far from truth"
  root_elaboration TEXT,

  -- Quantitative
  occurrence_count  INT,                               -- Quran corpus count
  occurrence_note   TEXT,                               -- "Appears 88 times as شيطان..."

  -- Rich glossary data — structured JSONB for rootForms, keyAyahs,
  -- scholarsSaid, semanticField, practicalSection, relatedTerms, goDeeper, etc.
  -- Keeps the table lean while storing the full GlossaryEntry richness.
  glossary_data   JSONB DEFAULT '{}'::jsonb,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Slug is the primary lookup path (/hub/{slug}, /glossary/{slug})
CREATE INDEX idx_entities_slug ON entities(slug);

-- Category filtering on the glossary page
CREATE INDEX idx_entities_category ON entities(category);

-- GIN index for full-text search across entity names (search bar, autocomplete)
CREATE INDEX idx_entities_search ON entities USING GIN (
  to_tsvector('simple', coalesce(name_translit, '') || ' ' || coalesce(name_english, '') || ' ' || coalesce(slug, ''))
);


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  3. AYAH RECORDS — passage-based tadabbur (1–N ayahs per row)           ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Each row represents a passage (contiguous group of 1–9 ayahs) with two
-- content layers:
--   Layer A: linguistic grounding — grammar, root analysis, scholarly notes
--   Layer B: contemplative tadabbur — personal reflection, spiritual insight
--
-- Both layers are currently public. When paid tiers launch, Layer B becomes
-- the natural gating point. See comments below for implementation options.

CREATE TABLE ayah_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  surah_number    INT NOT NULL CHECK (surah_number >= 1 AND surah_number <= 114),
  ayah_start      INT NOT NULL CHECK (ayah_start >= 1),
  ayah_end        INT NOT NULL CHECK (ayah_end >= 1),
  arabic_text     TEXT NOT NULL,
  translation     TEXT NOT NULL,

  -- Layer A: linguistic, grammatical, scholarly grounding (always public)
  layer_a         JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Expected shape: { grounding_html, word_analysis[], form_decisions[] }

  -- Layer B: contemplative tadabbur reflection
  -- ┌─────────────────────────────────────────────────────────────────────┐
  -- │ LAYER B GATING POINT — Currently public. When paid tiers launch:   │
  -- │                                                                     │
  -- │ Option A: Create a v_ayah_records_public VIEW that nulls layer_b   │
  -- │           for non-premium users. Point public API at the view.     │
  -- │                                                                     │
  -- │ Option B: Move layer_b to a separate ayah_records_layer_b table    │
  -- │           with restrictive RLS (premium role check).               │
  -- │                                                                     │
  -- │ Option C: API-layer gating — simplest. Just omit layer_b from the  │
  -- │           response JSON for non-premium users. No DB changes.      │
  -- └─────────────────────────────────────────────────────────────────────┘
  layer_b         JSONB DEFAULT '{}'::jsonb,
  -- Expected shape: { reflection_html, sections[] }

  -- Metadata from frontmatter
  title           TEXT,                                    -- "Forty Nights and a Golden Calf..."
  word_count      INT,
  estimated_duration TEXT,                                 -- "48-55 minutes"
  passage_context TEXT,                                    -- editorial context note

  status          TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  -- One record per passage per surah
  UNIQUE (surah_number, ayah_start, ayah_end),
  -- End must be >= start (single ayah: start == end)
  CHECK (ayah_end >= ayah_start),
  -- Passages max 9 ayahs to keep content focused
  CHECK (ayah_end - ayah_start < 10)
);

-- Fast lookups by surah (browsing a surah's passages in order)
CREATE INDEX idx_ayah_records_surah ON ayah_records(surah_number, ayah_start);

-- Published-only index for public queries (partial index, small & fast)
CREATE INDEX idx_ayah_records_status ON ayah_records(status) WHERE status = 'published';

-- Overlapping range lookup: find the record containing a specific ayah number
-- e.g., WHERE surah_number = 2 AND ayah_start <= 51 AND ayah_end >= 51
CREATE INDEX idx_ayah_records_range ON ayah_records(surah_number, ayah_start, ayah_end);


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  4. ENTITY TAGS — join table (posts + ayah_records → entities)           ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Uses nullable FKs with a check constraint instead of polymorphic strings.
-- Exactly one of (post_id, ayah_record_id) must be non-null.
-- No article_id — all authored content is in the posts table now.

CREATE TABLE entity_tags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id       UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,

  -- Content pointers (exactly one must be set)
  post_id         UUID REFERENCES posts(id) ON DELETE CASCADE,
  ayah_record_id  UUID REFERENCES ayah_records(id) ON DELETE CASCADE,

  is_primary      BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Enforce: exactly one FK set
  CONSTRAINT chk_exactly_one_content CHECK (
    (post_id IS NOT NULL)::int +
    (ayah_record_id IS NOT NULL)::int = 1
  ),

  -- No duplicate tags: one entity per content item per type
  UNIQUE (entity_id, post_id),
  UNIQUE (entity_id, ayah_record_id)
);

-- Hub assembly: all primary content for an entity (the "best" tagged items)
CREATE INDEX idx_entity_tags_entity_primary
  ON entity_tags(entity_id, is_primary) WHERE is_primary = true;

-- Reverse lookup: what entities are tagged on this post/ayah?
CREATE INDEX idx_entity_tags_post ON entity_tags(post_id) WHERE post_id IS NOT NULL;
CREATE INDEX idx_entity_tags_ayah ON entity_tags(ayah_record_id) WHERE ayah_record_id IS NOT NULL;

-- Knowledge graph: co-occurrence aggregation needs fast entity_id scans
CREATE INDEX idx_entity_tags_entity ON entity_tags(entity_id);


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  5. HUB SYNTHESIS CACHE — AI-generated overview per entity              ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Each entity hub page (/hub/{slug}) shows an AI-generated synthesis of all
-- tagged content. This table caches that synthesis so we don't regenerate on
-- every page load. The content_hash lets us detect staleness.

CREATE TABLE hub_synthesis_cache (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id         UUID NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  synthesis_html    TEXT NOT NULL DEFAULT '',
  -- Hash of all tagged content IDs + updated_at timestamps.
  -- Compare at render time to decide if regeneration is needed.
  content_hash      TEXT,
  last_generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  6. TRIGGERS — updated_at automation                                    ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Reuse the existing update_updated_at_column() function from the base schema.
-- It sets NEW.updated_at = NOW() on every UPDATE.

CREATE TRIGGER update_entities_updated_at
  BEFORE UPDATE ON entities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ayah_records_updated_at
  BEFORE UPDATE ON ayah_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hub_synthesis_updated_at
  BEFORE UPDATE ON hub_synthesis_cache
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  7. ROW LEVEL SECURITY                                                  ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- All new tables get RLS enabled. The service_role key (used by API routes
-- via createAdminClient()) bypasses RLS by default in Supabase, so admin
-- API routes are unaffected.

ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ayah_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_synthesis_cache ENABLE ROW LEVEL SECURITY;

-- ─── Entities: public read, admin write ─────────────────────────────────────

CREATE POLICY "Anyone can read entities"
  ON entities FOR SELECT USING (true);

CREATE POLICY "Admins can manage entities"
  ON entities FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── Ayah Records: published public, admin everything ───────────────────────
-- LAYER B GATING POINT: When paid tiers launch, replace the public SELECT
-- policy with one that uses a helper function to conditionally null layer_b.
-- Or create two policies: one for layer_a (always), one for layer_b (premium).
-- Simplest path: handle at API layer (Option C above).

CREATE POLICY "Anyone can view published ayah records"
  ON ayah_records FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage ayah records"
  ON ayah_records FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── Entity Tags: public read, admin write ──────────────────────────────────

CREATE POLICY "Anyone can read entity tags"
  ON entity_tags FOR SELECT USING (true);

CREATE POLICY "Admins can manage entity tags"
  ON entity_tags FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── Hub Synthesis Cache: public read, admin write ──────────────────────────

CREATE POLICY "Anyone can read hub synthesis"
  ON hub_synthesis_cache FOR SELECT USING (true);

CREATE POLICY "Admins can manage hub synthesis"
  ON hub_synthesis_cache FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  8. MATERIALIZED VIEW — entity co-occurrence for knowledge graph         ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝
-- Counts how often two entities appear on the same content item (post or
-- ayah_record). Used for "Related Concepts" sections on hub pages and for
-- the knowledge graph visualization. Refresh after bulk tagging operations.

CREATE MATERIALIZED VIEW IF NOT EXISTS entity_co_occurrence AS
SELECT
  a.entity_id AS entity_a,
  b.entity_id AS entity_b,
  COUNT(*) AS co_occurrence_count
FROM entity_tags a
JOIN entity_tags b
  ON (a.post_id IS NOT NULL AND a.post_id = b.post_id)
  OR (a.ayah_record_id IS NOT NULL AND a.ayah_record_id = b.ayah_record_id)
WHERE a.entity_id < b.entity_id  -- avoid duplicates and self-joins
GROUP BY a.entity_id, b.entity_id;

-- Unique index required for REFRESH MATERIALIZED VIEW CONCURRENTLY
CREATE UNIQUE INDEX idx_co_occurrence_pair
  ON entity_co_occurrence(entity_a, entity_b);

-- Convenience function: call after bulk tag operations
CREATE OR REPLACE FUNCTION refresh_entity_co_occurrence()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY entity_co_occurrence;
END;
$$ LANGUAGE plpgsql;
