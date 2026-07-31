#!/usr/bin/env npx tsx
/**
 * generate-hub-syntheses-batch3.ts
 *
 * Closes out the hub-synthesis backlog: the prophet hubs and the remaining
 * concept hubs that still rendered "A synthesized overview will appear here as
 * content grows" on their Overview tab.
 *
 * Same discipline as batches 1 and 2 — each synthesis is woven from that hub's
 * own published articles, and every ayah reference is verified against the
 * Uthmani text before the script is run.
 *
 * Idempotent: upsert on entity_id.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const SYNTHESES: Record<string, string> = {

'ismail': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Isma'il is given very few words in the Quran, and one of the few he speaks is a consent. The articles in this collection read his portrait as the Quran builds it — patience that is not endurance over years but a single compressed moment, and worship that takes the form of construction.</p>

  <h3>The sentence a son said</h3>
  <p>Ibrahim tells him about the dream. What comes back is not protest and not resignation: do what you are commanded — you will find me, if God wills, among the patient. The collection lingers on the conditional clause. He does not promise his own steadiness; he attaches it to God's will even while agreeing. It is consent offered without any claim to be strong enough for it.</p>

  <h3>Patience with no time in it</h3>
  <p>Sabr is usually pictured as something stretched out — an illness, a wait, a long absence. The collection asks what the word means when there is no duration at all, only a moment with a blade in it. Isma'il's patience is not the slow kind. It is the whole of the quality delivered at once, which is why the Quran can hold him up beside figures who suffered for decades.</p>

  <h3>Building as worship</h3>
  <p>The other scene the Quran gives him is architectural. Father and son raise the foundations of the House together, and the Quran records what they were saying as they worked — a prayer accompanying the stone. The collection's reading is that the construction is a liturgy: the request is being made <em>by</em> the building, not merely during it. The son who lay still under the test is the same son who is shown, afterwards, with his hands on the walls.</p>
</div>`,

'yaqub': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Ya'qub is the Quran's portrait of a man waiting for news that does not come. The articles in this collection follow a grief the Quran refuses to tidy up — and a patience that never once curdles into despair.</p>

  <h3>Grief that reached the body</h3>
  <p>He wept until his eyes whitened. The Quran does not soften this or use it as a rebuke; it records a sorrow so sustained that it changed him physically. The collection treats that as permission: the book that commands patience also preserves, without correction, the sight of a believer worn down by sadness. What it never shows him doing is turning that sadness against God.</p>

  <h3>A father who knew</h3>
  <p>From the moment his sons come back without Yusuf, he sees through them. He has no evidence and says so, and he is right anyway. The collection follows this thread across the surah — an intuition that keeps operating ahead of proof, including at the very end, when he says he catches the scent of his son while everyone around him assumes he is wandering.</p>

  <h3>The phrase he left behind</h3>
  <p>His response to catastrophe gave the tradition a term: <em>ṣabr jamīl</em>, a beautiful patience. The collection reads it as a technical description rather than a poetic flourish — patience that grieves without taking the complaint to people, that endures without performing the endurance, and that holds its shape under decades of pressure. He takes his sorrow to one place only, and says so out loud: he complains of his anguish to God, not to them.</p>
</div>`,

'lut': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Every other messenger in the Quran is sent to his own people. Lut is the exception — and the articles in this collection show how much of his story follows from that single structural fact.</p>

  <h3>A prophet with no tribe</h3>
  <p>Prophets in the Quran are usually protected by something before they are protected by God: a clan, a lineage, a network of relatives with reasons to keep them alive. Lut has none of it. He is a stranger in the city he was sent to serve, arguing without any of the social backing every other messenger could draw on. The collection reads his isolation as the condition of his mission rather than an incidental hardship.</p>

  <h3>The household that did not hold</h3>
  <p>The Quran then removes the last shelter. His wife lived in his house, ate at his table, and heard the message daily — and the Quran groups her with the wife of Nuh as its standing proof that nearness to the truth guarantees nothing at all. The collection notes how unsparing this is: the point is made using the households of prophets rather than the households of strangers.</p>

  <h3>The name given to the ruin</h3>
  <p>For the cities themselves the Quran uses <em>al-muʾtafikah</em> — the overturned. The collection reads the word as carrying the verdict inside it: a society that had inverted its own values is described, afterwards, as a place that was physically inverted. The punishment is named with the same word as the crime.</p>
</div>`,

'hud': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">'Ad built high and confused height with permanence. The articles in this collection follow the prophet sent to them, and a destruction the Quran chose to deliver in the least graspable form available.</p>

  <h3>Undone by air</h3>
  <p>The Quran does not send an army against the strongest civilisation of its world. It sends wind — invisible, unfightable, impossible to build a wall against. The collection reads the choice of instrument as the message: a people whose entire self-image rested on what they could raise and hold were dismantled by the one thing that cannot be held.</p>

  <h3>The challenge he issued</h3>
  <p>Hud's most striking speech is an invitation. He tells his people to plot against him — all of them, together, using everything they have — and then tells them they will not reach him. The collection reads this as a redefinition of prophetic courage: not the endurance of threat but the active offering of oneself as a target, on the grounds that the outcome was never in their hands.</p>

  <h3>A city kept as a lesson</h3>
  <p>The Quran names their civilisation with unusual specificity — Iram of the pillars — a name preserved nowhere else with the same precision. The collection's point is about function: the Quran does not record ruins for the sake of history. A lost city is retained as a permanent geography lesson, a place that can be pointed at whenever a later people begins to mistake its own scale for security.</p>
</div>`,

'salih': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Thamud asked for a sign they could touch, and were given one. The articles in this collection follow what happened next, which is the part the Quran is actually interested in.</p>

  <h3>A miracle with a schedule</h3>
  <p>The she-camel is not a spectacle; it is an arrangement. It has a day at the well, and they have theirs. The collection notes how ordinary the resulting test is: the sign they demanded turned into a rota, and honouring it required nothing more dramatic than leaving an animal alone and taking their turn. They hamstrung it instead.</p>

  <h3>Carving stone, refusing to bend</h3>
  <p>The Quran describes them as a people who cut their houses out of mountainsides — engineers of the first order. The collection sets that skill beside the one thing they would not do, and lets the contrast stand: they could shape rock and could not shape themselves. Their monuments outlasted them, which is precisely the Quran's use for them.</p>

  <h3>Three days</h3>
  <p>After the killing, Salih gives them a deadline with a number in it. The collection reads the countdown as a mercy folded inside a sentence — time granted to people who had already used up their time, and a last window that was announced rather than sprung. The Quran's judgments, here as elsewhere, arrive with notice.</p>
</div>`,

'shuayb': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Most prophets in the Quran confront idols. Shu'ayb confronts a scale. The articles in this collection follow the messenger whose people already believed in God — and cheated their customers.</p>

  <h3>The crime was in the marketplace</h3>
  <p>Madyan's failure is not theological in the usual sense. They gave short measure and called it business. The collection's reading is that the Quran refuses to file this under commerce: the demand to fill the measure arrives in the same voice, and with the same weight, as the demand to worship God alone. Fraud in a transaction is treated as a breach of the covenant itself.</p>

  <h3>The prophet who argued well</h3>
  <p>Classical scholars called him <em>khaṭīb al-anbiyāʾ</em>, the orator of the prophets, and the Quran preserves more of his direct speech than almost any messenger besides Musa. The collection takes the speeches seriously as arguments — they anticipate objections, concede what can be conceded, and keep returning to the one point his listeners most wanted to treat as separate from religion.</p>

  <h3>What it cost him</h3>
  <p>After the destruction, the Quran does not give him a victory. It shows him turning away from the ruined town in grief, addressing a people who can no longer hear him. The collection ends here deliberately: the man who was mocked does not celebrate being proved right, and his mourning is what the Quran chose to keep.</p>
</div>`,

'yahya': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Yahya receives one of the shortest portraits in the Quran and one of the most complete. The articles in this collection read a life sketched in a handful of strokes, beginning with his name.</p>

  <h3>A name nobody had carried</h3>
  <p>God names him directly, and specifies that no one before him had been given this name. The collection reads that specification as a statement rather than a detail. In a culture where a name inherits a lineage and carries a family's memory forward, a name with no predecessor announces that this child is not the continuation of anything — he is a beginning.</p>

  <h3>Four strokes</h3>
  <p>The Quran hands him four qualities in quick succession: take hold of the Book with strength; judgment given while still a child; tenderness from God; and purity. The collection notes the unusual pairing — the strength and the judgment sit next to the tenderness, in the same breath, with no sense that one qualifies the other. Authority and gentleness are issued to the same person as a single description.</p>

  <h3>Two impossible births, one surah</h3>
  <p>Surah Maryam places his birth beside the birth of 'Isa. Both are announced by angels, both are impossible by ordinary means, and the collection argues that the pairing is constructed rather than incidental — with the differences between the two announcements doing as much teaching as the parallels. Yahya's own beginning is an old man's prayer, answered.</p>
</div>`,

'malaika': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran's angels are described almost entirely through what they do and never through what they look like. The articles in this collection follow that restraint, and find that the malaika are used chiefly to define, by contrast, what a human being is.</p>

  <h3>Obedience as a nature</h3>
  <p>The Quran never shows an angel disobeying. Their compliance is not a record of good behaviour but a description of what they are: they glorify without tiring and carry out what they are commanded without any interior argument. The collection's point is comparative — set against them, the human being's capacity to hesitate, refuse and return is thrown into relief. The malaika show what obedience looks like when it costs nothing.</p>

  <h3>Named for what he is, not what he does</h3>
  <p>Jibril is given two titles, and both are qualities rather than job descriptions: the Trustworthy Spirit and the Spirit of Holiness. The collection reads this as an argument about transmission. Before the Quran describes the delivery of revelation, it establishes the character of the one delivering it — the integrity of the message is grounded in the integrity of the messenger.</p>

  <h3>Being written down</h3>
  <p>The most intimate angels in the Quran are the two who sit and write. The collection follows the noble scribes and what their presence implies: not surveillance for its own sake, but the claim that nothing a person does falls out of the record. The book cannot be lost or altered, and it is opened on the day when nothing has been forgotten.</p>
</div>`,

'jahannam': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran does not settle on one word for the fire, and it does not describe it as scenery. The articles in this collection follow a place the Quran gives names, a voice, and — most unsettling of all — a role in the moral order.</p>

  <h3>Seven names, seven registers</h3>
  <p>Jahannam, al-Jaḥīm, as-Saʿīr, Saqar, al-Ḥuṭamah, Laẓā, al-Hāwiyah. The collection's question is not which of these is the correct term but why the Quran needs all of them. Each arrives in a different context and carries a different register — one names the blaze, another the crushing, another the falling. No single word is asked to carry the whole idea.</p>

  <h3>A fire that answers</h3>
  <p>In Al-Mulk it almost bursts with rage; in Qaf, God puts a question to it and it replies. The collection takes the personification seriously rather than treating it as ornament. The fire is not a passive location where things are done to people — the Quran gives it something like a will, and lets it speak on the Day when everything else is being made to speak too.</p>

  <h3>Driven, or walking</h3>
  <p>The sharpest piece in the collection is grammatical. In Az-Zumar both groups are moved toward their destinations and both are called by the same word for crowds — but those bound for the fire are <em>driven</em>, herded along, while those bound for the garden come of their own motion. The Quran's whole theology of choice is compressed into the difference between two verbs applied to two otherwise identical processions.</p>
</div>`,

'bani-isra-il': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">No community is addressed by the Quran as often, or as directly, as the Children of Israel. The articles in this collection follow that address — covenant, rescue, failure and return — and pay attention to the fact that it is spoken to them in the second person.</p>

  <h3>Spoken to, not spoken about</h3>
  <p>The Sinai material is remembered as covenant, as burden and as mercy at once, and the Quran delivers it by turning and addressing them. The collection reads that directness as the point: this is not history recited for a third party's benefit. Being given a covenant means being permanently addressable, and the Quran keeps using the grammar that assumes someone is still listening.</p>

  <h3>The rescue and what came after</h3>
  <p>The sea opens and they cross, and the Quran moves almost immediately to what followed. The collection argues that the pivot is not a change of subject. A deliverance is not finished at the moment of survival; its meaning is settled by what the delivered people do next, and the Quran declines to end the scene while the water is still parting.</p>

  <h3>The calf, five times over</h3>
  <p>The Quran returns to the golden calf again and again, and each retelling sharpens a different edge — the speed of it, the excuse offered, the brother left holding the line. The collection follows the scene across surahs rather than flattening the versions into one. Something that happened once is kept in view permanently, which is itself the Quran's comment on how quickly a rescued people can turn, and how patiently the door is held open afterwards.</p>
</div>`,
}

async function main() {
  const slugs = Object.keys(SYNTHESES)
  console.log(`Upserting ${slugs.length} hub syntheses...\n`)

  for (const slug of slugs) {
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

    if (error) {
      console.error(`  ✗ ${slug} — ${error.message}`)
      continue
    }
    console.log(`  ✓ ${slug} (${entity.name_translit}) — ${SYNTHESES[slug].length} chars`)
  }
}

main()
