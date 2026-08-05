#!/usr/bin/env npx tsx
/**
 * Seeds `divine_names` entities and repoints the published name articles at them.
 *
 * PREREQUISITE: supabase/migrations/20260804_divine_names_category.sql must be applied
 * first, or every insert fails with `invalid input value for enum entity_category`.
 *
 * Policy: an entity is created only for a name that already has a published article, so
 * no hub page is ever born empty. Occurrence counts below are mechanically verified
 * against scripts/.corpus-cache/quranic-corpus.json by lemma — see the note on each.
 *
 * Idempotent: re-running upserts entities and re-points tags without duplicating.
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

type Seed = {
  slug: string
  name_arabic: string
  name_translit: string
  name_english: string
  one_line: string
  pronunciation: string
  root_letters: string
  root_translit: string
  root_meaning: string
  occurrence_count: number
  occurrence_note: string
  /** Article slug this name should become the PRIMARY tag of. Optional. */
  primary_for?: string
}

const NAMES: Seed[] = [
  {
    slug: 'as-samad',
    name_arabic: 'ٱلصَّمَد',
    name_translit: 'As-Samad',
    name_english: 'The One All Turn To',
    one_line: 'The One every need finally arrives at — and who needs nothing in return.',
    pronunciation: 'as-SA-mad · short "a" in both syllables',
    root_letters: 'ص-م-د',
    root_translit: 'ṣād-mīm-dāl',
    root_meaning: 'To head straight for someone in need of them; also: solid the whole way through, without hollow',
    occurrence_count: 1,
    occurrence_note:
      'A hapax legomenon — the word occurs exactly once in the Quran, at 112:2. Al-Tabari opens his treatment with wa-khtalafa ahl al-taʾwīl and records seven distinct early readings before settling it from pre-Islamic usage.',
    primary_for: 'as-samad-divine-name-quran',
  },
  {
    slug: 'al-qayyum',
    name_arabic: 'ٱلْقَيُّوم',
    name_translit: 'Al-Qayyum',
    name_english: 'The Self-Subsisting Sustainer',
    one_line: 'He stands by Himself, and everything else is standing on Him.',
    pronunciation: 'al-qay-YOOM · stress the long "oo"',
    root_letters: 'ق-و-م',
    root_translit: 'qāf-wāw-mīm',
    root_meaning: 'To stand, to rise, to hold a position upright',
    occurrence_count: 3,
    occurrence_note:
      'Occurs 3 times (2:255, 3:2, 20:111). In all three, al-Hayy stands immediately before it — the name never appears alone, while al-Hayy does stand alone at 25:58 and 40:65.',
    primary_for: 'al-qayyum-divine-name-quran',
  },
  {
    slug: 'al-wadud',
    name_arabic: 'ٱلْوَدُود',
    name_translit: 'Al-Wadud',
    name_english: 'The Loving',
    one_line: 'The Quran’s name for divine affection — and both times it appears, it stands just downstream of forgiveness.',
    pronunciation: 'al-wa-DOOD · long "oo"',
    root_letters: 'و-د-د',
    root_translit: 'wāw-dāl-dāl',
    root_meaning: 'Fond affection, warmth that inclines toward closeness — distinct from ḥubb, love as concentrated attachment',
    occurrence_count: 2,
    occurrence_note:
      'Occurs exactly twice (11:90, 85:14). Al-Jalalayn glosses it at 85:14 as al-mutawaddid ilā awliyāʾihi — a Form V participle, meaning God extends the affection rather than merely holding it.',
    primary_for: 'al-wadud-divine-name-quran',
  },
  {
    slug: 'an-nur',
    name_arabic: 'ٱلنُّور',
    name_translit: 'An-Nur',
    name_english: 'The Light',
    one_line: 'Named as light exactly once — and the earliest commentators disagreed about what that means.',
    pronunciation: 'an-NOOR · long "oo"',
    root_letters: 'ن-و-ر',
    root_translit: 'nūn-wāw-rā',
    root_meaning: 'Light, illumination — the same root also gives nār, fire',
    occurrence_count: 43,
    occurrence_note:
      'The noun nūr occurs 43 times, but Allah is named as light in only one verse (24:35). Elsewhere light is something He sends (e.g. 5:15, min Allāhi nūr). Ibn Abbas glossed the name as hādī, the Guide; al-Jalalayn as munawwir, the One who illuminates.',
    primary_for: 'an-nur-divine-name-quran',
  },
  {
    slug: 'al-ghafur',
    name_arabic: 'ٱلْغَفُور',
    name_translit: 'Al-Ghafur',
    name_english: 'The Forgiving',
    one_line: 'Forgiveness as a settled characteristic — the name the Quran reaches for at the close of almost every kind of passage.',
    pronunciation: 'al-gha-FOOR · guttural "gh", long "oo"',
    root_letters: 'غ-ف-ر',
    root_translit: 'ghayn-fā-rā',
    root_meaning: 'To cover something so that what is underneath stops being exposed — the same root gives mighfar, a mail hood',
    occurrence_count: 91,
    occurrence_note:
      'Occurs 91 times, of which 64 are followed directly by Ar-Rahim. Built on the faʿūl pattern (a settled quality), as against Al-Ghaffar on faʿʿāl (a repeated act).',
    primary_for: 'al-ghafur-al-ghaffar-divine-name-quran',
  },
  {
    slug: 'al-ghaffar',
    name_arabic: 'ٱلْغَفَّار',
    name_translit: 'Al-Ghaffar',
    name_english: 'The Repeatedly Forgiving',
    one_line: 'The intensive form of the same root — forgiveness as something that happens again.',
    pronunciation: 'al-ghaf-FAAR · doubled "f", long "aa"',
    root_letters: 'غ-ف-ر',
    root_translit: 'ghayn-fā-rā',
    root_meaning: 'To cover a fault; on the faʿʿāl pattern, to do so repeatedly and as a characteristic act',
    occurrence_count: 5,
    occurrence_note:
      'Occurs 5 times (20:82, 38:66, 39:5, 40:42, 71:10). Three of the five put al-ʿAziz directly before it; al-Jalalayn reads the pair as naming two audiences at once — mighty over enemies, forgiving to those close to Him.',
  },
  {
    slug: 'ar-razzaq',
    name_arabic: 'ٱلرَّزَّاق',
    name_translit: 'Ar-Razzaq',
    name_english: 'The Provider',
    one_line: 'Provision named as an identity rather than an action — He does not merely provide, He is the Provider.',
    pronunciation: 'ar-raz-ZAAQ · rolled "r", doubled "z"',
    root_letters: 'ر-ز-ق',
    root_translit: 'rā-zāy-qāf',
    root_meaning: 'To provide, to sustain, to bestow what is needed',
    occurrence_count: 1,
    occurrence_note:
      'The name in this exact form occurs once, at 51:58, though the root r-z-q runs through roughly 123 verses in verb and noun form.',
    primary_for: 'rizq-al-razzaq-divine-name-quran',
  },
  {
    slug: 'at-tawwab',
    name_arabic: 'ٱلتَّوَّاب',
    name_translit: 'At-Tawwab',
    name_english: 'The Ever-Returning',
    one_line: 'The one name the Quran uses for both parties — the servant turns back, and so does He.',
    pronunciation: 'at-taw-WAAB · doubled "w", long "aa"',
    root_letters: 'ت-و-ب',
    root_translit: 'tā-wāw-bā',
    root_meaning: 'To return, to turn back toward',
    occurrence_count: 12,
    occurrence_note:
      'Occurs 12 times. The same root describes the human act (tawbah) and the divine response, which is what makes returning mutual rather than one-directional.',
    primary_for: 'al-tawwab-the-name-that-makes-returning-mutual',
  },
  {
    slug: 'ar-rahman',
    name_arabic: 'ٱلرَّحْمَٰن',
    name_translit: 'Ar-Rahman',
    name_english: 'The Most Merciful',
    one_line: 'Mercy as a vast, universal condition — the rain that falls on everyone.',
    pronunciation: 'ar-rah-MAAN · guttural "h", long "aa"',
    root_letters: 'ر-ح-م',
    root_translit: 'rā-ḥā-mīm',
    root_meaning: 'Mercy — the same root gives raḥim, the womb',
    occurrence_count: 57,
    occurrence_note:
      'Occurs 57 times as a standalone name, plus once per surah through the basmalah. On the faʿlān pattern, which classical grammarians read as denoting fullness and intensity.',
    primary_for: 'rahman-rahim-two-names-quran',
  },
  {
    slug: 'ar-rahim',
    name_arabic: 'ٱلرَّحِيم',
    name_translit: 'Ar-Rahim',
    name_english: 'The Ever-Merciful',
    one_line: 'The same root as Ar-Rahman, but a different register — specific, perpetual, directed.',
    pronunciation: 'ar-ra-HEEM · long "ee"',
    root_letters: 'ر-ح-م',
    root_translit: 'rā-ḥā-mīm',
    root_meaning: 'Mercy, compassion — on the faʿīl pattern, denoting a constant attribute',
    occurrence_count: 116,
    occurrence_note:
      'Occurs 116 times, most often as the second half of a name pair — 64 of those follow Al-Ghafur directly.',
  },
  {
    slug: 'al-wakil',
    name_arabic: 'ٱلْوَكِيل',
    name_translit: 'Al-Wakil',
    name_english: 'The Disposer of Affairs',
    one_line: 'The agent you hand a matter to — the name behind the command to rely.',
    pronunciation: 'al-wa-KEEL · long "ee"',
    root_letters: 'و-ك-ل',
    root_translit: 'wāw-kāf-lām',
    root_meaning: 'To entrust a matter to an agent; the same root gives tawakkul',
    occurrence_count: 24,
    occurrence_note:
      'Occurs 24 times. Al-Jalalayn glosses it al-mufawwaḍ ilayhi al-amr — the one to whom the matter has been handed over. The root also produces tawakkul, the human act.',
    primary_for: 'al-wakil-divine-name-quran',
  },
  {
    slug: 'al-latif',
    name_arabic: 'ٱللَّطِيف',
    name_translit: 'Al-Latif',
    name_english: 'The Subtle, The Gentle',
    one_line: 'Fine enough to reach a seed under a rock, and a man at the bottom of a well.',
    pronunciation: 'al-la-TEEF · long "ee"',
    root_letters: 'ل-ط-ف',
    root_translit: 'lām-ṭā-fā',
    root_meaning: 'Fineness — so thin or finely divided that it passes where a coarser thing is stopped',
    occurrence_count: 7,
    occurrence_note:
      'Occurs 7 times. Five pair it with al-Khabir (6:103, 22:63, 31:16, 33:34, 67:14); the two exceptions (42:19, 12:100) describe treatment rather than perception.',
    primary_for: 'al-latif-divine-name-quran',
  },
  {
    slug: 'ash-shakur',
    name_arabic: 'ٱلشَّكُور',
    name_translit: 'Ash-Shakur',
    name_english: 'The Appreciative',
    one_line: 'The name that applies the word for gratitude to God Himself.',
    pronunciation: 'ash-sha-KOOR · long "oo"',
    root_letters: 'ش-ك-ر',
    root_translit: 'shīn-kāf-rā',
    root_meaning: 'To thank; also, of an animal, to yield much from little grazing',
    occurrence_count: 12,
    occurrence_note:
      'Occurs 12 times — 4 naming Allah, the rest describing people. Three of the four divine uses put Al-Ghafur immediately before it; the human uses pair it with ṣabbār.',
    primary_for: 'ash-shakur-divine-name-quran',
  },
  {
    slug: 'al-karim',
    name_arabic: 'ٱلْكَرِيم',
    name_translit: 'Al-Karim',
    name_english: 'The Generous',
    one_line: 'Nobility and open-handedness as one quality — and the word a man in the Fire is reminded he claimed.',
    pronunciation: 'al-ka-REEM · long "ee"',
    root_letters: 'ك-ر-م',
    root_translit: 'kāf-rā-mīm',
    root_meaning: 'Nobility of origin and generosity of hand, treated as a single quality',
    occurrence_count: 30,
    occurrence_note:
      'The word occurs 30 times, most describing something other than God (rizq karīm, ajr karīm, the Throne). At 44:49 the pair al-ʿAzīz al-Karīm is spoken to a man in Hell — al-Jalalayn notes it quotes his own boast back to him.',
    primary_for: 'al-karim-divine-name-quran',
  },
  {
    slug: 'al-hafiz',
    name_arabic: 'ٱلْحَفِيظ',
    name_translit: 'Al-Hafiz',
    name_english: 'The Preserver',
    one_line: 'Keeping something so that nothing is lost from it.',
    pronunciation: 'al-ha-FEEDH · guttural "h", long "ee"',
    root_letters: 'ح-ف-ظ',
    root_translit: 'ḥā-fā-ẓā',
    root_meaning: 'To guard or keep so that nothing is lost; the same root gives ḥāfiẓ, one who has memorised the Quran',
    occurrence_count: 12,
    occurrence_note:
      'Occurs 12 times as ḥafīẓ (plus 13 as ḥāfiẓ). One of the twelve is Yusuf describing himself at 12:55 — the bounded, created version of the same word.',
    primary_for: 'al-hafiz-divine-name-quran',
  },
]

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  console.log(dryRun ? '── DRY RUN ──' : '── APPLYING ──')

  for (const n of NAMES) {
    const { primary_for, ...entity } = n
    const payload = { ...entity, category: 'divine_names' as const }

    if (dryRun) {
      console.log(`would upsert  ${n.slug.padEnd(14)} (${n.occurrence_count}×)${primary_for ? `  → primary on /posts/${primary_for}` : ''}`)
      continue
    }

    const { data: existing } = await supabase
      .from('entities').select('id').eq('slug', n.slug).maybeSingle()

    let entityId: string
    if (existing) {
      const { error } = await supabase.from('entities').update(payload).eq('id', existing.id)
      if (error) { console.error(`  ✗ update ${n.slug}:`, error.message); continue }
      entityId = existing.id
      console.log(`  updated  ${n.slug}`)
    } else {
      const { data, error } = await supabase.from('entities').insert(payload).select('id').single()
      if (error) { console.error(`  ✗ insert ${n.slug}:`, error.message); continue }
      entityId = data.id
      console.log(`  created  ${n.slug}`)
    }

    if (!primary_for) continue

    const { data: post } = await supabase
      .from('posts').select('id').eq('slug', primary_for).maybeSingle()
    if (!post) { console.warn(`    ⚠ article not found: ${primary_for}`); continue }

    // Demote whatever currently holds primary, then attach this name as primary.
    await supabase.from('entity_tags').update({ is_primary: false }).eq('post_id', post.id)
    await supabase.from('entity_tags').delete().eq('post_id', post.id).eq('entity_id', entityId)
    const { error: tagErr } = await supabase
      .from('entity_tags').insert({ post_id: post.id, entity_id: entityId, is_primary: true })
    if (tagErr) console.warn(`    ⚠ tag: ${tagErr.message}`)
    else console.log(`    → primary on /posts/${primary_for}`)
  }

  if (!dryRun) {
    const { error } = await supabase.rpc('refresh_entity_co_occurrence')
    console.log(error ? `  ⚠ co-occurrence: ${error.message}` : '  co-occurrence refreshed')
  }
}

main()
