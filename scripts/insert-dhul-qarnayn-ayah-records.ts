#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ENTITY_SLUG = 'dhul-qarnayn'

async function getEntityId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
  return data?.id ?? null
}

interface AyahRecordInput {
  surah_number: number
  ayah_start: number
  ayah_end: number
  arabic_text: string
  translation: string
  title: string
  layer_a: Record<string, unknown>
  status: string
}

async function insertAyahRecord(record: AyahRecordInput, entitySlug: string) {
  console.log(`\nInserting ayah record: ${record.surah_number}:${record.ayah_start}-${record.ayah_end} "${record.title}"`)

  // Check if already exists
  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', record.surah_number)
    .eq('ayah_start', record.ayah_start)
    .eq('ayah_end', record.ayah_end)
    .single()

  if (existing) {
    console.log(`  Already exists (ID: ${existing.id}) — adding entity tag only`)
    await tagEntity(existing.id, entitySlug)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert(record)
    .select('id')
    .single()

  if (error || !data) {
    console.error(`  Failed to insert:`, error)
    return
  }

  console.log(`  Inserted with ID: ${data.id}`)
  await tagEntity(data.id, entitySlug)
}

async function tagEntity(ayahRecordId: string, entitySlug: string) {
  const entityId = await getEntityId(entitySlug)
  if (!entityId) {
    console.error(`  Entity "${entitySlug}" not found`)
    return
  }

  // Check if tag already exists
  const { data: existingTag } = await supabase
    .from('entity_tags')
    .select('id')
    .eq('ayah_record_id', ayahRecordId)
    .eq('entity_id', entityId)
    .single()

  if (existingTag) {
    console.log(`  Tag already exists for "${entitySlug}"`)
    return
  }

  const { error } = await supabase.from('entity_tags').insert({
    ayah_record_id: ayahRecordId,
    entity_id: entityId,
    is_primary: true,
  })

  if (error) {
    console.error(`  Failed to tag "${entitySlug}":`, error)
  } else {
    console.log(`  Tagged "${entitySlug}" (primary)`)
  }
}

// ─────────────────────────────────────────────────────
// AYAH RECORDS
// ─────────────────────────────────────────────────────

const records: AyahRecordInput[] = [
  {
    surah_number: 18,
    ayah_start: 84,
    ayah_end: 85,
    arabic_text: 'إِنَّا مَكَّنَّا لَهُ فِي الْأَرْضِ وَآتَيْنَاهُ مِن كُلِّ شَيْءٍ سَبَبًا ﴿٨٤﴾ فَأَتْبَعَ سَبَبًا ﴿٨٥﴾',
    translation: 'Indeed, We established him in the earth and gave him of everything a means. So he followed a means.',
    title: 'The Rope You Were Given',
    status: 'published',
    layer_a: {
      linguistic_html: `### The Word سَبَب (Sabab): Rope, Means, Connection\n\nAt its root, *sabab* (س-ب-ب) means a rope — the thing you grab to pull yourself toward something. Allah gave Dhul-Qarnayn *min kulli shay'in sababā* — of everything, a means. Not outcomes. Not finished products. Means. Ropes. Pathways. The distinction is enormous: a result is finished, but a means is an invitation — you receive it and your work begins.\n\n### Form IV أَتْبَعَ (Atba'a): Active Pursuit vs. Passive Following\n\nThe Quran uses *atba'a* (Form IV) rather than *ittaba'a* (Form VIII). Form VIII means conforming to someone else's lead. Form IV carries active pursuit — taking up the path deliberately. Dhul-Qarnayn was not a passive recipient. He seized the means and pursued them.\n\n### The فَ (Fa): The Conjunction of Immediacy\n\nThe *fa* connecting "We gave him means" to "he pursued a means" is the fa of immediate consequence — no gap, no hesitation. The righteous response to divine provision is not deliberation. It is action.`,
    },
  },
  {
    surah_number: 18,
    ayah_start: 95,
    ayah_end: 97,
    arabic_text: 'قَالَ مَا مَكَّنِّي فِيهِ رَبِّي خَيْرٌ فَأَعِينُونِي بِقُوَّةٍ أَجْعَلْ بَيْنَكُمْ وَبَيْنَهُمْ رَدْمًا ﴿٩٥﴾ آتُونِي زُبَرَ الْحَدِيدِ ۖ حَتَّىٰ إِذَا سَاوَىٰ بَيْنَ الصَّدَفَيْنِ قَالَ انفُخُوا ۖ حَتَّىٰ إِذَا جَعَلَهُ نَارًا قَالَ آتُونِي أُفْرِغْ عَلَيْهِ قِطْرًا ﴿٩٦﴾ فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا ﴿٩٧﴾',
    translation: 'He said: That in which my Lord has established me is better — but assist me with strength, and I will make between you and them a barrier. Bring me blocks of iron. Until, when he had leveled them between the two mountain sides, he said: Blow. Until, when he had made it fire, he said: Bring me, that I may pour over it molten copper. So they could neither scale it nor could they penetrate it.',
    title: 'The Refusal That Defined a Sovereign',
    status: 'published',
    layer_a: {
      linguistic_html: `### The Refusal: مَا مَكَّنِّي فِيهِ رَبِّي خَيْرٌ\n\nDhul-Qarnayn echoes the same root م-ك-ن from 18:84 — *makkannī* — naming the source of his provision. What Allah gave is *khayr* (better) than any tribute. But he does not refuse their participation: *a'īnūnī bi-quwwa* — assist me with strength. Protection becomes partnership, not charity.\n\n### The Word رَدْم (Radm): Total Filling\n\nThe people asked for a *sudd* (dam/obstruction). Dhul-Qarnayn promised a *radm* — from ر-د-م, meaning to fill a gap entirely. A sudd blocks. A radm eliminates the space itself. The word reveals his method: thoroughness without half-measures.\n\n### اسْطَاعُوا vs. اسْتَطَاعُوا: Sound Matching Meaning\n\nThe Quran uses two different words for "could not" — the lighter *isṭā'ū* for scaling (a quicker action) and the heavier *istaṭā'ū* for penetrating (a harder, more laborious effort). The phonetic weight of each word mirrors the physical weight of the impossibility it describes.`,
    },
  },
  {
    surah_number: 18,
    ayah_start: 98,
    ayah_end: 98,
    arabic_text: 'قَالَ هَٰذَا رَحْمَةٌ مِّن رَّبِّي ۖ فَإِذَا جَاءَ وَعْدُ رَبِّي جَعَلَهُ دَكَّاءَ ۖ وَكَانَ وَعْدُ رَبِّي حَقًّا',
    translation: 'He said: This is a mercy from my Lord. But when the promise of my Lord comes, He will level it to the ground. And the promise of my Lord is ever true.',
    title: 'The Promise That Outlasts Everything',
    status: 'published',
    layer_a: {
      linguistic_html: `### رَحْمَةٌ (Raḥma): What He Called His Greatest Achievement\n\nDhul-Qarnayn could have called the barrier a blessing (*ni'ma*), a display of strength (*quwwa*), or an accomplishment (*'amal*). He chose *raḥma* — mercy. From root ر-ح-م, connected to *raḥim* (womb), mercy carries the image of protective enclosure. The barrier is not a monument. It is an act of mercy — protection for those who cannot protect themselves.\n\n### دَكَّاءَ (Dakkā'): The Sound of Annihilation\n\nFrom root د-ك-ك — to crush flat, to level completely. The doubled kāf is percussive, abrupt. The same root used when Musa's mountain is leveled (7:143). This is not erosion or decay. It is instantaneous, complete flattening.\n\n### Three Anchoring Words: رَحْمَة ... دَكَّاء ... حَقًّا\n\nThe ayah moves from present mercy → future destruction → eternal truth. The barrier is *raḥma* (mercy). It will become *dakkā'* (leveled). The promise is *ḥaqq* (absolutely true). What endures is not the building but the truth of divine promise.`,
    },
  },
  {
    surah_number: 21,
    ayah_start: 96,
    ayah_end: 96,
    arabic_text: 'حَتَّىٰ إِذَا فُتِحَتْ يَأْجُوجُ وَمَأْجُوجُ وَهُم مِّن كُلِّ حَدَبٍ يَنسِلُونَ',
    translation: 'Until when Gog and Magog are let loose and they descend from every elevation.',
    title: 'The Breach From Every Height',
    status: 'published',
    layer_a: {
      linguistic_html: `### فُتِحَتْ (Futiḥat): The Passive That Hides the Actor\n\nYa'juj and Ma'juj are not described as breaking through. They are *opened* — passive voice. The actor (Allah) is concealed out of awe. The root ف-ت-ح (same as al-Fātiḥa, the Opener) implies deliberate unlocking. The barrier was always a gate with a timer.\n\n### حَدَبٍ (Ḥadab): From Every Height\n\n*Min kulli ḥadabin* — from every elevation. Not one direction but all directions simultaneously. No single front to hold. The spatial language communicates total, overwhelming, omnidirectional threat beyond all containment.\n\n### يَنسِلُونَ (Yansilūn): The Speed of Cascade\n\nFrom root ن-س-ل — to move swiftly, to slip out, to descend rapidly. Not a march but a cascade. Combined with *min kulli ḥadab*, the image is of water breaking over every ridge — swift, unstoppable, covering everything.`,
    },
  },
]

async function main() {
  console.log('=== Dhul-Qarnayn Hub: Ayah Record Insertion ===\n')

  for (const record of records) {
    await insertAyahRecord(record, ENTITY_SLUG)
  }

  // Refresh co-occurrence
  console.log('\n--- Refreshing entity co-occurrence ---')
  const { error } = await supabase.rpc('refresh_entity_co_occurrence')
  if (error) {
    console.error('Failed to refresh co-occurrence:', error)
  } else {
    console.log('Co-occurrence refreshed')
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
