-- Divine Names as a first-class entity category
--
-- Why: divine names existed only as `posts` rows with no entity of their own, so every
-- name article inherited the category of whatever concept it was tagged to. As-Samad,
-- Al-Qayyum and An-Nur all displayed "Theology & Ethics" because they were tagged to
-- `tawhid`. Names are not a sub-species of theology-and-ethics — they are the vertical
-- axis the rest of the corpus points at (every story article is asked to name the divine
-- attribute it enacts; the Dawud course spine is awwāb → At-Tawwab).
--
-- Postgres will not let ALTER TYPE ... ADD VALUE run inside a transaction block in older
-- versions, and the added value is not usable in the same transaction that adds it.
-- Run STEP 1 on its own, then STEP 2.

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1 — run this alone, commit, then continue.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TYPE entity_category ADD VALUE IF NOT EXISTS 'divine_names';


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2 — verify. Should list 8 values, including divine_names.
-- ─────────────────────────────────────────────────────────────────────────────

-- SELECT unnest(enum_range(NULL::entity_category)) AS category;

-- After this migration, seed the name entities and retag the published name
-- articles with:  npx tsx scripts/seed-divine-names.ts
