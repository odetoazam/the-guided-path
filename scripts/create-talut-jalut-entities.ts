#!/usr/bin/env npx tsx
/**
 * create-talut-jalut-entities.ts
 *
 * Creates the two missing entity rows from the Al-Baqarah 2:246-251 passage.
 * Both were flagged as hub candidates back in the 2026-04-20 session log and
 * are needed so the Dawud facet article (dawud-jalut-victory-quran) and the
 * existing /posts/talut-river-test-baqarah-249 can tag properly.
 *
 * Occurrence counts are corpus-verified against scripts/.corpus-cache:
 *   Talut — 2 (2:247, 2:249)
 *   Jalut — 3 (2:249, 2:250, 2:251)
 *
 * Both names are non-Arabic proper nouns; the corpus assigns them no triliteral
 * root, so root fields are left null rather than invented.
 *
 * Run with:  set -a && source .env.local && set +a && npx tsx scripts/create-talut-jalut-entities.ts
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ENTITIES = [
  {
    slug: 'talut',
    name_arabic: 'طَالُوت',
    name_translit: 'Talut',
    name_english: null,
    category: 'quranic_characters',
    one_line:
      'The king appointed over the objections of those who thought they had more right to the throne.',
    pronunciation: 'taa-LOOT',
    root_letters: null,
    root_translit: null,
    root_meaning: null,
    root_elaboration:
      'Talut is a non-Arabic proper name and the Quranic corpus assigns it no triliteral Arabic root. Classical grammarians treat it as a foreign name, which is why it is diptote. Some lexicographers noted a resemblance to the Arabic root for tallness, given that 2:247 describes him as increased in breadth of knowledge and body, but the Quran itself offers no etymology and the name is not derived from that root.',
    occurrence_count: 2,
    occurrence_note:
      'Talut is named twice, both in Surah Al-Baqarah: at 2:247, where the prophet of the community announces him as king and the people object that they have more right to the kingship and that he lacks wealth; and at 2:249, where he marches the army out and tests them at the river. His victory is reported without his name — 2:251 gives the rout to the army and the killing of Jalut to Dawud.',
  },
  {
    slug: 'jalut',
    name_arabic: 'جَالُوت',
    name_translit: 'Jalut',
    name_english: null,
    category: 'quranic_characters',
    one_line:
      'The champion the Quran names three times and never once describes.',
    pronunciation: 'jaa-LOOT',
    root_letters: null,
    root_translit: null,
    root_meaning: null,
    root_elaboration:
      'Jalut is a non-Arabic proper name, corresponding to the Goliath of earlier scripture, and the Quranic corpus assigns it no triliteral Arabic root. Like Talut, it is treated by the grammarians as a foreign diptote name.',
    occurrence_count: 3,
    occurrence_note:
      'Jalut is named three times, all within a single passage of Al-Baqarah: 2:249 (the small band that crossed the river says it has no strength against Jalut and his forces), 2:250 (they advance and pray for patience and firm feet), and 2:251 (Dawud kills him). The Quran supplies his name and nothing else — no height, armor, challenge, or speech. Every familiar detail about this figure comes from outside the Quran.',
  },
]

async function main() {
  for (const e of ENTITIES) {
    const { data: existing } = await supabase
      .from('entities')
      .select('id')
      .eq('slug', e.slug)
      .maybeSingle()

    if (existing) {
      console.log(`↩︎  ${e.slug} already exists (${existing.id}) — skipping`)
      continue
    }

    const { data, error } = await supabase
      .from('entities')
      .insert(e)
      .select('id')
      .single()

    if (error) console.error(`❌ ${e.slug}:`, error)
    else console.log(`✅ created ${e.slug} (${data.id})`)
  }
}

main()
