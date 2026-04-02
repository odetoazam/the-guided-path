#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const AYYUB_ID = 'e070047b-c83a-481d-a68a-d9c7892996af'
const ZAKARIYYA_ID = '178975a6-a53a-48db-8426-00adba42422f'

const ayyubSynthesis = `<div class="hub-synthesis">
  <p>Three articles now form the Ayyub collection, and together they trace a single sustained argument: that the patience of Ayyub was not silence, but a particular kind of speech.</p>

  <p>The first article examines the compressed du'a preserved in <strong>Al-Anbiya 21:83</strong> — seven Arabic words that became the tradition's model for prayer under affliction. The analysis centers on what the prayer does not say: it does not demand relief, does not frame suffering as injustice, does not bargain. It states pain and affirms mercy. The gap between those two statements is where the entire theology of supplication lives.</p>

  <p>The second article opens the Sad account (38:41), where Ayyub's prayer adds a dimension absent from Al-Anbiya: he names the shaytan as the agent of his suffering, and he names the <em>nuṣb</em> — the exhaustion that accumulates over years of sustained trial. This is the article about the limit of patience: not a breaking point but an articulation point, the moment after years of endurance when the suffering finds language and is brought before Allah in its full specificity.</p>

  <p>The third article places Ayyub alongside Musa — two prophets who argued with Allah and were answered. Both brought their exact condition: Ayyub his years of illness, Musa his fear and his tied tongue and his fugitive status in a foreign land. Both were answered, in different forms and through different mechanisms. The comparison builds a Quranic theology of du'a grounded in the prophetic examples: honest description of need, trust in divine character, refusal to prescribe the solution.</p>

  <p>Read together, these three articles make the case that <strong>sabr Ayyub</strong> — the idiom that has come to mean the highest form of endurance — is not a counsel of stoicism. It is a counsel of maintained relationship: suffering without estrangement, pain named without accusation, need that remained trust through years of waiting for an answer.</p>
</div>`

const zakariyyaSynthesis = `<div class="hub-synthesis">
  <p>Five articles now form the Zakariyya collection, reaching across his prayer, his sign, his son, and the three objections that preceded the miracle.</p>

  <p>The first article, on the prayer in the chamber, examines what Zakariyya saw before he prayed: Maryam receiving provision from an unknown source, fruit out of season, sustenance without visible supplier. The witnessed miracle becomes the ground for the impossible request. If this can be given to her, perhaps that can be given to me.</p>

  <p>The second article takes up Zakariyya's sign — the three days (or three nights) of enforced silence. A priest deprived of speech is not being punished; he is being calibrated. The external voice sealed, the interior address deepens. The sign-period is also a worship-period: <em>wadhkur rabbaka kathīran</em>, remember your Lord much, while the promise takes root.</p>

  <p>The third article moves to Yahya — the son given as the answer to the impossible prayer. The name itself is the answer: <em>Yaḥyā</em>, he lives. Given to a man who was as good as dead reproductively, born to a woman who had never conceived, named by Allah before birth with the word for life.</p>

  <p>The fourth article treats Maryam's question alongside Zakariyya's — both ask the angel <em>annā</em>, how can this be. The juxtaposition reveals the range of ways the Quran accommodates honest questioning: Maryam asks once and moves to surrender; Zakariyya asks three times and requests a sign.</p>

  <p>The fifth article, on Zakariyya's three objections across Aal 'Imran and Maryam, is the culminating piece. It traces the intensification of his language: from <em>balaghani al-kibaru</em> (old age has reached me) in Aal 'Imran to <em>balaghtu min al-kibari 'itiyyā</em> (I have reached the extreme of old age) in Maryam — a word, <em>'utiyy</em>, that appears only once in the Quran and means the biological endpoint. The divine responses intensify correspondingly: from "Allah does what He wills" to "I created you when you were nothing." The miracle is nested inside the larger pattern of divine creative action that Zakariyya himself, by existing, already proves.</p>
</div>`

async function main() {
  console.log('Upserting Ayyub synthesis...')
  const { error: ayyubError } = await supabase
    .from('hub_synthesis_cache')
    .upsert({
      entity_id: AYYUB_ID,
      synthesis_html: ayyubSynthesis.trim(),
      content_hash: 'ayyub-3-articles-v1',
      last_generated_at: new Date().toISOString(),
    }, { onConflict: 'entity_id' })

  if (ayyubError) {
    console.error('Ayyub synthesis error:', ayyubError)
  } else {
    console.log('Ayyub synthesis upserted.')
  }

  console.log('Upserting Zakariyya synthesis...')
  const { error: zakariyyaError } = await supabase
    .from('hub_synthesis_cache')
    .upsert({
      entity_id: ZAKARIYYA_ID,
      synthesis_html: zakariyyaSynthesis.trim(),
      content_hash: 'zakariyya-5-articles-v1',
      last_generated_at: new Date().toISOString(),
    }, { onConflict: 'entity_id' })

  if (zakariyyaError) {
    console.error('Zakariyya synthesis error:', zakariyyaError)
  } else {
    console.log('Zakariyya synthesis upserted.')
  }

  console.log('Done.')
}

main().catch(console.error)
