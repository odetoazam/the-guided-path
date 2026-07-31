#!/usr/bin/env npx tsx
/**
 * tag-ayah-records-to-hubs.ts
 *
 * The 182 published ayah_records got reader pages on 2026-07-31, but only 35 of
 * them carried any entity tag — so 147 of the deepest pages on the site sat
 * outside the semantic graph, and most hubs showed "Ayah Records 0" despite the
 * corpus covering their concept repeatedly.
 *
 * Tagging rule — deliberately mechanical and checkable:
 *   an entity is tagged to a passage when the entity's own Arabic name appears
 *   as a LEMMA in that passage, per the Quranic Arabic Corpus.
 *
 * Matching on the entity's ROOT was tried first and rejected: roots conflate
 * distinct concepts. Root ق-و-م put `qiyamah` on Al-Fatiha because of
 * *mustaqīm*; أ-ن-س put `uns` wherever *insān* appeared; أ-م-ن made `iman` and
 * `amanah` indistinguishable. Lemma matching removes that whole class of error.
 *
 * Two names are excluded outright because the name itself is a common word, and
 * every single match was a false positive:
 *   salih — 5/5 matches were *ʿamila ṣāliḥan*, "does righteous deeds"
 *   hud   — 2/2 matches were *hūdan*, "Jews" (2:111, 2:135)
 *
 * is_primary when the lemma occurs twice or more in the passage, or when the
 * entity is a Quranic character named in it — the hub's "Ayah Records" tab
 * filters on is_primary.
 *
 * Idempotent: existing (ayah_record_id, entity_id) pairs are skipped.
 *
 * Run: ./node_modules/.bin/tsx --env-file=.env.local scripts/tag-ayah-records-to-hubs.ts [--dry]
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const DRY = process.argv.includes('--dry')

/** Names whose Arabic form collides with an ordinary Quranic word. */
const EXCLUDED_NAMES = new Set(['salih', 'hud'])

const DIACRITICS = /[ً-ْٰـ۟-ۭ]/g
const normalise = (text: string) =>
  (text || '')
    .replace(DIACRITICS, '')
    .replace(/[^ء-ي]/g, '')
    .replace(/[أإآٱ]/g, 'ا') // alif variants
    .replace(/ى/g, 'ي') // alif maqsura → ya
    .replace(/ة$/, 'ه') // final ta marbuta → ha

type Corpus = Record<string, { lemma?: string }[]>

async function main() {
  const corpus: Corpus = JSON.parse(
    readFileSync('scripts/.corpus-cache/quranic-corpus.json', 'utf8')
  )

  const { data: entityRows } = await supabase
    .from('entities')
    .select('id, slug, name_arabic, category')

  const entities = (entityRows ?? [])
    .filter((e) => e.name_arabic && !EXCLUDED_NAMES.has(e.slug))
    .map((e) => ({ ...e, key: normalise(e.name_arabic) }))

  const records: { id: string; surah_number: number; ayah_start: number; ayah_end: number }[] = []
  for (let from = 0; ; from += 200) {
    const { data } = await supabase
      .from('ayah_records')
      .select('id, surah_number, ayah_start, ayah_end')
      .eq('status', 'published')
      .range(from, from + 199)
    if (!data?.length) break
    records.push(...data)
    if (data.length < 200) break
  }

  // Paginated: entity_tags is well past PostgREST's 1000-row default.
  const existing = new Set<string>()
  for (let from = 0; ; from += 1000) {
    const { data } = await supabase
      .from('entity_tags')
      .select('entity_id, ayah_record_id')
      .not('ayah_record_id', 'is', null)
      .range(from, from + 999)
    if (!data?.length) break
    data.forEach((t) => existing.add(`${t.ayah_record_id}|${t.entity_id}`))
    if (data.length < 1000) break
  }

  const planned: { ayah_record_id: string; entity_id: string; is_primary: boolean }[] = []

  for (const record of records) {
    const lemmaCounts = new Map<string, number>()
    for (let ayah = record.ayah_start; ayah <= (record.ayah_end || record.ayah_start); ayah++) {
      for (const seg of corpus[`${record.surah_number}:${ayah}`] ?? []) {
        if (!seg.lemma) continue
        const key = normalise(seg.lemma)
        lemmaCounts.set(key, (lemmaCounts.get(key) ?? 0) + 1)
      }
    }

    for (const entity of entities) {
      const count = lemmaCounts.get(entity.key)
      if (!count) continue
      if (existing.has(`${record.id}|${entity.id}`)) continue
      planned.push({
        ayah_record_id: record.id,
        entity_id: entity.id,
        is_primary: count >= 2 || entity.category === 'quranic_characters',
      })
    }
  }

  console.log(
    `${planned.length} tags planned (${planned.filter((p) => p.is_primary).length} primary) across ` +
      `${new Set(planned.map((p) => p.ayah_record_id)).size} of ${records.length} records`
  )

  if (DRY) {
    console.log('--dry: nothing written')
    return
  }

  for (let i = 0; i < planned.length; i += 100) {
    const batch = planned.slice(i, i + 100)
    const { error } = await supabase.from('entity_tags').insert(batch)
    if (error) console.error(`  ✗ batch ${i / 100 + 1}: ${error.message}`)
    else console.log(`  ✓ wrote ${batch.length} tags`)
  }

  const { error: rpcErr } = await supabase.rpc('refresh_entity_co_occurrence')
  console.log(rpcErr ? `⚠️  co-occurrence refresh failed: ${rpcErr.message}` : '🔄 co-occurrence graph refreshed')
}

main()
