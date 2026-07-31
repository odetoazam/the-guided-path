#!/usr/bin/env npx tsx
/**
 * generate-hub-syntheses-batch4.ts
 *
 * Syntheses for the three hubs that sit on a guided path and had no articles
 * at all until 2026-07-31: tadabbur (stop 1 of "Reading the Quran
 * Differently"), khushu (stop 1 of "Going Deeper") and tawakkul (the closing
 * stop of "When Life Breaks Apart"). Each now has a published article, and
 * without a synthesis row the Overview tab a path walker lands on still reads
 * "A synthesized overview will appear here as content grows".
 *
 * These are shorter than the other batches on purpose: a synthesis weaves what
 * a hub actually holds, and each of these holds one article plus the corpus
 * facts verified while writing it. Every claim below was checked against the
 * morphology corpus and the Uthmani text before being written.
 *
 * Idempotent: upsert on entity_id.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const SYNTHESES: Record<string, string> = {

'fitrah': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Fitrah names the shape a human being already has before anything is added. The root <strong>f-ṭ-r</strong> means to originate, to bring into being — and also to split something open, the way a seed splits when it begins. The word for a person's original disposition is built from the vocabulary of first creation.</p>

  <h3>The verse the word comes from</h3>
  <p>Ar-Rum states it once and completely: set your face to the religion, inclining to truth — <em>the fiṭrah of God upon which He originated people</em>. There is no changing the creation of God. That is the upright religion, but most people do not know (30:30). The verse uses the noun and then the verb from the same root in a single breath: the disposition, and the act of disposing. What follows is a claim about durability — the original making is not replaced by what happens afterwards.</p>

  <h3>What was placed inside the soul</h3>
  <p>Ash-Shams supplies the other half. After a run of oaths sworn on the sun, the moon, the day, the night, the sky and the earth, the oaths turn inward to the soul and what proportioned it, and state that God <em>inspired it with its own corruption and its own guarding</em> (91:7-8). Both are already present. The verdict that follows does not describe acquiring something absent; it describes what a person does with what is already there — success for whoever purifies it, ruin for whoever buries it (91:9-10). The collection's reading of that surah follows the burying all the way to Thamud, a whole civilisation used as the example.</p>

  <h3>Why this matters for a person returning</h3>
  <p>Taken together the two passages describe distance as covering rather than absence. Something was made, and it holds; what changes is how much has been piled on top of it. That is a different problem from having to build a capacity from nothing, and it is the reason the Quran can speak to someone who has been away for years as though they already know what it is talking about.</p>
</div>`,

'tadabbur': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Tadabbur is the word this site is built around, and the Quran uses the verb behind it exactly four times. The root <strong>d-b-r</strong> is the root of the <em>back</em> of a thing — the rear, the far end, what a matter comes out at. To do tadabbur is to go around behind a sentence and look at where it leads, rather than staring harder at its surface.</p>

  <h3>A question, not an order</h3>
  <p>All four occurrences share one grammatical shape: third person, plural, ongoing — <em>they</em>, never <em>you</em>. Three arrive as questions about people who are failing to do it (4:82, 47:24, 23:68), and the fourth states it as the reason the Book was sent down at all (38:29). The commentators are clear that a question in this form carries the force of a command; Ibn Kathir reads both 4:82 and 47:24 as God commanding reflection and forbidding people from turning away. What stays interesting is the delivery. The reader is placed outside the group being asked about, holding a question that nobody has addressed to them directly.</p>

  <h3>The root turned against itself</h3>
  <p>Surah Muhammad plays the three letters three times in four verses. The invitation to turn the Book over (47:24) is followed by people who turned back on their <em>backs</em> after guidance had come to them (47:25), and then by the angels striking their <em>backs</em> at death (47:27). In Arabic, reflecting and walking away are audibly the same word.</p>

  <h3>What God does with the same root</h3>
  <p>One step away in form, this root stops describing a human act and describes a divine one: God <em>directs the affair</em> from the heaven to the earth (32:5), and in three further verses arranges creation toward its end. The human being is asked whether he will do the same thing to a page.</p>

  <h3>The tests the questions name</h3>
  <p>Each question supplies its own method. In 4:82 the test is coherence — turn it over, and had it come from anywhere but God you would have found much contradiction in it. In 47:24 the test turns inward, and the obstacle proposed is not difficulty but locks on the heart. And 23:68 widens the whole thing past scripture: that verse says <em>the word</em>, not <em>the Quran</em>.</p>
</div>`,

'khushu': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Khushu' is usually explained as concentration in prayer. The Quran's own usage points somewhere else: of its seventeen occurrences, all but two are participles — descriptions of the state a thing is <em>in</em> rather than reports of something it is doing — and the things described include voices, eyes, faces, a mountain, and a field of dead ground.</p>

  <h3>The word given to bare land</h3>
  <p>Fussilat calls the earth <em>khashi'a</em> — flat, holding nothing, giving nothing back — and then sends water down onto it, at which the ground stirs and swells (41:39). The verse ends by using the revived field as proof that the dead will be raised. Read from there, khushu' names the condition of something that has stopped producing and can now receive, and its entire significance is what arrives from above.</p>

  <h3>The two places it is a verb</h3>
  <p>Only twice does the word appear as a verb. One is Al-Hadid's question to believers: has the time not come for their hearts to soften at the remembrance of God and what has come down of the truth — rather than becoming like those before them, upon whom the term grew long until their hearts hardened (57:16). The trigger named is remembrance; the failure named is hardness. And the very next verse answers it with ground: know that God revives the earth after its death (57:17).</p>

  <h3>Honest about the weight</h3>
  <p>Al-Baqarah pairs prayer with patience and concedes that it is heavy — except upon the <em>khashi'in</em> (2:45). The Quran declines to pretend otherwise. What lightens it, on this reading, is the state of the ground rather than a greater supply of effort.</p>
</div>`,

'tawakkul': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Tawakkul is often heard as a reason to stop trying. The Quran consistently attaches it to the far side of effort — to the moment after a person has done everything available to them and has to live with a decision already made.</p>

  <h3>The order of operations</h3>
  <p>Al-'Imran gives the sequence in one verse: pardon them, ask forgiveness for them, consult them in the matter — and <em>when you have resolved</em>, rely upon God (3:159). Reliance is the last item, attached to the moment of resolve. Al-Jalalayn's gloss makes the point unmistakable: when you have resolved to carry out what you intend after the consultation, trust in Him — and not in the consultation. The consulting produces the decision; the reliance settles where a person's confidence rests once it is made.</p>

  <h3>Precaution and trust in one breath</h3>
  <p>Ya'qub demonstrates it while sending his remaining sons back to Egypt. He gives a specific tactical instruction — enter by different gates, not one — then concedes immediately that it protects them from nothing God has decided, then declares his own reliance (12:67). He holds the precaution and the trust together, in that order, with the concession sitting between them like a hinge.</p>

  <h3>Sufficiency rather than a guarantee</h3>
  <p>At-Talaq answers reliance with a clause about sufficiency: whoever relies upon God, He is enough for him — and the provision described arrives from where the person <em>does not reckon</em> (65:3). The phrasing assumes the reckoning happened. Tawakkul addresses the gap between a person's best planning and everything their planning could not see.</p>

  <h3>Inside a working life</h3>
  <p>Shu'ayb states it in the middle of an argument with a town he is trying to reform, and the sentence around it is full of effort: I only intend reform as much as I am able, and my success is only through God (11:88). The Quran's short definition of the believers ends the same way — hearts that stir at God's mention, faith increased by the verses, and upon their Lord they rely (8:2).</p>
</div>`,
}

async function main() {
  for (const slug of Object.keys(SYNTHESES)) {
    const { data: entity } = await supabase
      .from('entities')
      .select('id, name_translit')
      .eq('slug', slug)
      .single()

    if (!entity) {
      console.log(`  ✗ ${slug} — entity not found, skipped`)
      continue
    }

    const { error } = await supabase.from('hub_synthesis_cache').upsert(
      {
        entity_id: entity.id,
        synthesis_html: SYNTHESES[slug].trim(),
        content_hash: `${slug}-synthesis-v1`,
        last_generated_at: new Date().toISOString(),
      },
      { onConflict: 'entity_id' }
    )

    console.log(
      error ? `  ✗ ${slug} — ${error.message}` : `  ✓ ${slug} (${entity.name_translit}) — ${SYNTHESES[slug].length} chars`
    )
  }
}

main()
