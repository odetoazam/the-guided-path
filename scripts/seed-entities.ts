#!/usr/bin/env npx tsx

/**
 * Seeds the `entities` table from the static glossary.ts data.
 *
 * Reads GLOSSARY_TERMS (264 index entries) and GLOSSARY_ENTRIES (rich entries),
 * maps them to the entities schema, and upserts into Supabase.
 *
 * Usage: npx tsx scripts/seed-entities.ts [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'
import { GLOSSARY_TERMS, GLOSSARY_ENTRIES } from '../src/data/glossary'
import type { GlossaryEntry, GlossaryCategory } from '../src/data/glossary'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
  process.exit(1)
}
const DRY_RUN = process.argv.includes('--dry-run')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Map frontend category names → Postgres enum values
const CATEGORY_MAP: Record<GlossaryCategory, string> = {
  'States of the Heart': 'states_of_the_heart',
  'The Unseen': 'the_unseen',
  'Quranic Characters': 'quranic_characters',
  'Nations & Peoples': 'nations_and_peoples',
  'Study Terms': 'study_terms',
  'Concepts of Existence': 'concepts_of_existence',
  'Theology & Ethics': 'theology_and_ethics',
}

function buildEntityRow(meta: typeof GLOSSARY_TERMS[number], full?: GlossaryEntry) {
  // Pack rich data into glossary_data JSONB — everything that isn't a top-level column
  const glossary_data: Record<string, unknown> = {}

  if (full) {
    if (full.summary) glossary_data.summary = full.summary
    if (full.rootForms) glossary_data.rootForms = full.rootForms
    if (full.keyAyahs) glossary_data.keyAyahs = full.keyAyahs
    if (full.scholarsSaid) glossary_data.scholarsSaid = full.scholarsSaid
    if (full.hadith) glossary_data.hadith = full.hadith
    if (full.acrossTransitions) glossary_data.acrossTransitions = full.acrossTransitions
    if (full.semanticField) glossary_data.semanticField = full.semanticField
    if (full.practicalSection) glossary_data.practicalSection = full.practicalSection
    if (full.relatedTerms?.length) glossary_data.relatedTerms = full.relatedTerms
    if (full.goDeeper?.length) glossary_data.goDeeper = full.goDeeper
  }

  return {
    slug: meta.slug,
    name_arabic: meta.term,
    name_translit: meta.transliteration,
    name_english: null as string | null,
    category: CATEGORY_MAP[meta.category],
    one_line: meta.evocativeLine,
    pronunciation: full?.pronunciation ?? null,
    root_letters: full?.root?.letters ?? null,
    root_translit: full?.root?.transliteration ?? null,
    root_meaning: full?.root?.meaning ?? null,
    root_elaboration: full?.root?.elaboration ?? null,
    occurrence_count: full?.occurrenceCount ?? null,
    occurrence_note: full?.occurrenceNote ?? null,
    glossary_data: Object.keys(glossary_data).length > 0 ? glossary_data : {},
  }
}

async function main() {
  console.log(`\nSeeding entities from glossary.ts...`)
  console.log(`  Index entries: ${GLOSSARY_TERMS.length}`)
  console.log(`  Full entries:  ${Object.keys(GLOSSARY_ENTRIES).length}`)
  if (DRY_RUN) console.log('  ** DRY RUN — no writes **\n')

  const rows = GLOSSARY_TERMS.map((meta) => {
    const full = GLOSSARY_ENTRIES[meta.slug]
    return buildEntityRow(meta, full)
  })

  if (DRY_RUN) {
    console.log(`Would upsert ${rows.length} entities. Sample:`)
    console.log(JSON.stringify(rows[0], null, 2))
    console.log('...')
    console.log(JSON.stringify(rows[rows.length - 1], null, 2))
    return
  }

  // Upsert in batches of 50
  const BATCH_SIZE = 50
  let inserted = 0
  let updated = 0

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const { data, error } = await supabase
      .from('entities')
      .upsert(batch, { onConflict: 'slug' })
      .select('id')

    if (error) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error)
      process.exit(1)
    }

    const count = data?.length ?? 0
    inserted += count
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${count} rows`)
  }

  // Verify
  const { count } = await supabase
    .from('entities')
    .select('*', { count: 'exact', head: true })

  console.log(`\nDone. ${count} entities in database.`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
