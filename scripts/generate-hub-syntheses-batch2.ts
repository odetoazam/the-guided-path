#!/usr/bin/env npx tsx
/**
 * generate-hub-syntheses-batch2.ts
 *
 * Second pass over the hubs that have 3+ published articles but no
 * `hub_synthesis_cache` row. Without one the Overview tab — the hub's front
 * door — renders "A synthesized overview will appear here as content grows",
 * so a hub with a dozen real articles reads as empty.
 *
 * The first pass (generate-missing-hub-syntheses.ts) covered yusuf, ibrahim,
 * maryam, nuh, iblis, firaun, tawbah, nafs and adam. This one covers the
 * remaining backlog, starting with the hubs that sit on a guided path — an
 * unwritten synthesis there is the first thing a path walker sees.
 *
 * Every synthesis below is woven from that hub's own published articles
 * (titles and excerpts pulled from the database, never from the slug alone),
 * and every ayah reference is checked against the Uthmani text by
 * scripts/.tmp/verify-synthesis-refs before this script is run.
 *
 * Idempotent: upsert on entity_id.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const SYNTHESES: Record<string, string> = {

'sabr': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Sabr is almost always translated "patience," which makes it sound like waiting. The root <strong>ṣ-b-r</strong> means something far more physical: to bind, to restrain, to hold a thing in place. The articles in this collection follow that root through the Quran and find a word about active restraint — about what a person chooses <em>not</em> to do while under pressure.</p>

  <h3>Binding, not waiting</h3>
  <p>Once you know the root, the Quran's usage changes shape. Sabr is not the absence of feeling; it is the decision to hold your position while the feeling runs its course. That is why the collection reads it as the hardest of the moral acts rather than the mildest — it is restraint exercised precisely when release would be easier. And it is why the Quran can command it: you cannot be ordered to stop hurting, but you can be ordered to hold.</p>

  <h3>The one reward with no ceiling</h3>
  <p>Every reward the Quran promises comes with a measure — tenfold, seven hundredfold, a scale, a reckoning. One does not. Az-Zumar says the patient will be given their reward <em>bi-ghayri ḥisāb</em>, without account (39:10). The collection sits with what that phrase implies: the reward for holding firm is the single item in the Quran's economy that is not counted out. Whatever sabr costs, it is not being repaid on a scale.</p>

  <h3>Patience nobody sees, and patience nobody does alone</h3>
  <p>Two articles pull sabr in opposite and complementary directions. One follows <em>jamīl</em> — the Quran calls exactly seven things beautiful, and every one of them is an act of release: a beautiful patience, a beautiful pardon, a dignified parting. Beauty, in this vocabulary, is the open hand. The other follows Al-ʿAsr, where the four-part rescue of the human being ends not with personal patience but with people urging it on one another. Sabr is listed there as something a community does to itself, out loud. Both readings resist the picture of the lone stoic: the Quran's patience is either being handed over or being handed around.</p>

  <h3>The complaint that was not a failure of it</h3>
  <p>The collection's most consoling piece belongs to Ayyūb, the Quran's clearest portrait of sustained suffering — a man the Quran itself praises for sabr, who nonetheless cried out to his Lord. The cry is preserved, and the answer comes immediately. Whatever sabr is, it is evidently not silence, and it is not the suppression of pain. It is the refusal to take the pain anywhere but to God.</p>
</div>`,

'taqwa': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Taqwa is usually rendered "fear of God," which puts the accent in the wrong place. The root <strong>w-q-y</strong> means to shield, to guard, to place a cover between something and the harm coming for it. The articles in this collection recover that image, and the word turns out to describe not a feeling but a posture — the ongoing act of keeping something between yourself and ruin.</p>

  <h3>The armoured one</h3>
  <p>If the root is a shield, then <em>muttaqī</em> does not mean "the pious person" so much as the one who has put armour on. That single shift reorganises the whole vocabulary. Taqwa stops being an emotional temperature to be raised and becomes a practice with a shape: something you build, wear, and maintain. The collection traces how consistently the Quran treats it that way.</p>

  <h3>The command the Quran gives more than any other</h3>
  <p>No instruction in the Quran recurs as often as <em>ittaqū Allāh</em> — guard yourselves with regard to God. It is addressed to prophets and to whole communities, and it turns up across every kind of surah. The collection reads the repetition itself as the argument: taqwa is placed underneath the other commands as the thing that gives them their force. Instructions about wealth, speech, family and war all arrive resting on it.</p>

  <h3>What it produces</h3>
  <p>The Quran is unusually specific about what taqwa yields, and the list is not what a modern reader expects. Not comfort — <em>capacity</em>. Guidance. A way out of what has no visible exit. <em>Furqān</em>, the ability to tell true from false when they look alike. A light to walk by. And the statement that the most honoured person before God is the one with the most of it. The collection's point is that these are cognitive and navigational gifts: the shielded person is described as someone who can <em>see</em> more clearly, not merely someone who behaves better.</p>

  <h3>Where the Quran puts it</h3>
  <p>The placement is part of the teaching. At-Talaq buries one of the Quran's most expansive promises — a way out, and provision from where you did not expect — inside the legislation for how a marriage ends. Al-Hujurat runs its rules for how people must speak of one another and lands on taqwa as the only real measure of rank. The shield is issued for ordinary rooms and hard weeks, not for ceremonial occasions.</p>
</div>`,

'qiyamah': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Day of Standing is the most thoroughly described event in the Quran that has not yet happened. The articles in this collection map that description — its names, its physics, its scales, and the strange fact that the whole Quran keeps rehearsing one question the Day will ask.</p>

  <h3>Seventy names for one day</h3>
  <p>The Quran does not settle on a single term. It gives the Final Day more than seventy names — the Standing, the Hour, the Day of Reckoning, the Day of Separation, the Day of Gathering, the Overwhelming Calamity. The collection treats each name as a lens rather than a synonym: one names the sorting, another the assembling, another the sheer scale. Put together, they form the most detailed portrait the Quran draws of anything still in the future.</p>

  <h3>A vocabulary of dissolution</h3>
  <p>The mountains are the Quran's chosen image for permanence, and it returns to them at the end again and again with a different verb each time: set moving, blown to dust, reduced to a mirage, turned to carded wool. The collection reads these as approaches to a single idea from every available angle — the unmaking of the most solid thing a person can point to. What cannot be shaken is shown being shaken.</p>

  <h3>The scale, and the sentence you already know</h3>
  <p>At the centre of the reckoning stands the balance, and the Quran calls the weighing <em>al-ḥaqq</em> — the truth. An atom's weight of good is seen; an atom's weight of evil is seen. The collection sets this against the marketplace scales the Quran elsewhere condemns people for tilting: the instrument humans cheat is replaced by one that cannot be cheated. Alongside it sits the moment each person is handed their record and told a single word — <em>read</em>. It is the same word that opened the revelation (96:1); the first command given to the Prophet is the last command given to the soul (17:14).</p>

  <h3>The rehearsals</h3>
  <p>The collection's most striking find is a question the Quran keeps asking early so that it will be familiar later. A man is dead a hundred years; youths sleep in a cave for three centuries. Both are asked how long they stayed, and both answer the same way: a day, or part of a day. At the Resurrection, humanity gives that identical answer. The miracles were not only wonders — they were dress rehearsals for a question everyone will be asked.</p>
</div>`,

'ashab-al-kahf': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran withholds their names, their city, and their century. It calls them <em>fityah</em> — young men — and says they believed. That is the entire biography, and the articles in this collection show that the withholding is the point.</p>

  <h3>The first of four trials</h3>
  <p>Al-Kahf is built out of four tests: faith, wealth, knowledge and power. The cave comes first, and the collection argues that the order is structural rather than incidental. Before a person can be trusted with money, with what they know, or with authority over others, one thing has to be settled — where their loyalty actually sits when holding it costs them everything. The young men settle it by walking out of a city.</p>

  <h3>A number given and then handed back</h3>
  <p>The Quran says three hundred years, and adds nine. Then, in the same breath, it says God knows best how long they stayed. The collection reads this as the Quran's own epistemology on display: it supplies the information and declines the authority in one motion, modelling how to hold a fact — firmly, and without pretending the certainty is yours.</p>

  <h3>The dog at the threshold</h3>
  <p>An unnamed animal, stretched out at the entrance, mentioned three separate times in a story that will not even name its human beings. The collection follows the detail rather than explaining it away. Whatever else the repetition does, it insists that the scene be pictured — that the sleepers are not an abstraction but bodies in a real place, with a companion lying across the door.</p>

  <h3>The cave among the enclosures</h3>
  <p>The collection also sets the cave beside the Quran's other confined spaces — the well, the whale, the fire. Each should have been an ending; each became the place where God met the one inside. And the sleepers' answer on waking, that they stayed a day or part of a day, turns out to be the same answer humanity gives at the Resurrection. The cave is a small rehearsal of the largest awakening.</p>
</div>`,

'rahmah': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The root <strong>r-ḥ-m</strong> is the root of the womb. Every time the Quran speaks of mercy it is reaching for that image — enclosure, nourishment, a life sustained by something larger than itself and before it can ask. The articles in this collection trace how thoroughly that one root organises the book.</p>

  <h3>Two names, one root</h3>
  <p>The opening line of the Quran uses the root twice, in two forms: <em>ar-Raḥmān</em> and <em>ar-Raḥīm</em>. The collection resists collapsing them into a single idea. One names mercy as a vast standing condition, the other mercy as it arrives, particular and directed. The Quran's refusal to drop either — repeating both at the head of almost every surah — is itself a statement that the two are not interchangeable.</p>

  <h3>Mercy that encompasses, and mercy that is withheld</h3>
  <p>Al-Aʿraf says God's mercy encompasses all things, and then, without pause, attaches a clause about whom it is written for (7:156). The collection holds the two halves together instead of choosing one. The Quran does not present unbounded mercy and conditional mercy as competing verses to be reconciled; it puts them in the same sentence and expects the reader to carry both.</p>

  <h3>Mercy as the shape of everything</h3>
  <p>One article follows the claim that God inscribed mercy upon Himself — before the creation the reader lives inside. Read that way, mercy is not a divine mood but the architecture: the Quran opens with it, existence is conducted inside it, and what comes after is inside it too.</p>

  <h3>Where despair is standing</h3>
  <p>The collection's most practical piece is a corpus check. The Quran's word for total despair, from the root <em>q-n-ṭ</em>, occurs exactly six times — and every single time, the word for God's mercy is in the same verse or the one beside it. Four of the six sit in the same breath. Despair never gets to appear in this book by itself; mercy is standing next to it in every instance.</p>
</div>`,

'yunus': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Yunus is the prophet who left before he was released. The Quran keeps his story short, tells it in pieces across several surahs, and gives him three different names — and the articles in this collection show that each name frames the same man differently.</p>

  <h3>The word the Quran uses for his state</h3>
  <p>When the fish takes him, the Quran does not describe a victim of circumstance. As-Saffat calls him <em>mulīm</em> — blameworthy. The collection treats this as the hinge of the whole account: the rescue that follows is not the correction of an accident. He is retrieved from a situation he walked into, and the Quran says so plainly before it says anything about mercy.</p>

  <h3>A prayer that asks for nothing</h3>
  <p>The most repeated supplication in Muslim life is the one he made in the dark, and the collection points out what is easy to miss — it contains no request. It states that there is no god but God, declares Him beyond all imperfection, and accuses the speaker himself of wrongdoing. Then the answer comes. A du'a made entirely of acknowledgment turns out to be the Quran's model of what to say when you have no standing to ask.</p>

  <h3>Three names for one man</h3>
  <p>Yunus, Dhul-Nūn — the one of the fish — and the Companion of the Fish. The collection reads the naming as deliberate framing, and notes that one of these names arrives inside an instruction addressed to the Prophet Muhammad ﷺ himself: do not be like him. The story is preserved partly as a warning handed to the one man least likely to need it.</p>

  <h3>The exception in a book of destroyed cities</h3>
  <p>Surah Yunus spends nearly a hundred verses on nations that refused and were ruined, and then makes a single exception: his people. They are the one community in the Quran that believed <em>before</em> the punishment arrived rather than at the moment it became undeniable. The collection also pairs his cry with Ayyūb's — two complaints placed a few verses apart in Al-Anbiya, neither asking to be rescued, both answered at once.</p>
</div>`,

'tawhid': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Tawhid is the claim the Quran will not negotiate: that God is one, without partner, without likeness. The articles in this collection approach it the way the Quran does — not as a doctrine to be asserted but as an argument to be made, usually by someone standing in front of people who disagree.</p>

  <h3>The argument, not the assertion</h3>
  <p>Ibrahim is the collection's central figure here, and none of his scenes are miracles. Facing a king who claimed to give life and take it, he does not escalate; he relocates the claim, asking him to bring the sun from the other direction, and the king has nothing to say (2:258). Facing his people's idols, he destroys all but the largest and leaves the tool in its hands so that they will have to answer their own question. In both cases what the Quran preserves is a sentence, because the sentence is what did the work.</p>

  <h3>What protection actually looks like</h3>
  <p>When he is thrown into the fire, it is not put out. The command is issued to the fire itself, to be coolness and peace. The collection draws the theology out of the grammar: oneness here means that the properties of things are not their own possession. The danger remains exactly where it is and stops behaving as danger.</p>

  <h3>Drawing the line without raising the voice</h3>
  <p>Al-Kafirun is six verses of separation conducted with no anger and no threat — a creed of severance that simply states what will not be mixed. The collection reads it beside the Quran's stranger evidence for the same doctrine: Ayat al-Kursi, where God's throne holds the heavens and the earth without wearying, has as its only twin a verse in which a throne carries a lifeless body (2:255 and 38:34). Two thrones, and only one of them belongs to someone who does not tire.</p>

  <h3>Tawhid at sea</h3>
  <p>The most human piece in the collection watches the grammar move. In Yunus 10:22 God addresses <em>you</em> directly while carrying you over land and sea; the moment the fair wind blows, the verse switches to <em>they</em> — they sailed, they rejoiced — and only returns to direct address inside the drowning prayer. Al-Jalalayn names the turn: a deliberate shift. Tawhid, the passage suggests, is what people reach for the instant the weather changes, and what they drift out of when it does not.</p>
</div>`,

'isa': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran's ʿIsa is honoured without being divinised, and the articles in this collection show how carefully that line is held — usually in the grammar rather than in argument.</p>

  <h3>Defined before he acts</h3>
  <p>Before the cradle, before the clay birds, before any healing, the Quran defines him: a word from God, <em>kalimatun minhu</em>. The collection begins where the Quran begins — with an identity established by speech rather than by miracle. Everything that follows is read in that light.</p>

  <h3>The clause attached to every miracle</h3>
  <p>Each wonder credited to him carries the same qualifying phrase: by God's permission. The collection argues that the repetition is not a stylistic tic but the theology itself, embedded at the level of syntax. The Quran never lets a miracle be reported without naming whose permission it ran on — which is precisely the question the passage is answering.</p>

  <h3>One verb, changed</h3>
  <p>The collection's sharpest piece sets two annunciations side by side in Surah Maryam. Zakariyya asks how he can have a son, and Maryam asks nearly the same thing a few verses later. The two answers run in parallel, word for word — until the verb. For Zakariyya, God <em>does</em>; for Maryam, God <em>creates</em>. The entire account of how ʿIsa began rests on that single substitution, and the Quran makes it without a paragraph of explanation.</p>

  <h3>Asking for a sign, and what it costs</h3>
  <p>His disciples ask for a table to descend from heaven. He prays for it, and the answer arrives with a warning attached — the table comes, and so does a condition that cannot be taken back. The collection reads it as the Quran's teaching on the limits of asking: some requests are granted in a way that raises the stakes rather than settling them.</p>
</div>`,

'jannah': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The root <strong>j-n-n</strong> means to cover and conceal — the same root behind what is hidden from sight. A <em>jannah</em> is a garden so dense that it hides the ground. The articles in this collection follow the Quran's descriptions of paradise, and find a vocabulary that keeps pointing at what it is not saying.</p>

  <h3>Eight words, eight windows</h3>
  <p>The Quran does not have one term for paradise; it has at least eight, each from a different root. The collection reads them as distinct windows rather than interchangeable labels — one naming the shelter, another the height, another the permanence. The variety is doing descriptive work that a single repeated word could not.</p>

  <h3>The line the Quran will not stop repeating</h3>
  <p>Gardens beneath which rivers flow: the phrase appears more than sixty times. The collection asks what the repetition itself is saying, rather than treating it as formula. In a landscape where water is survival and its absence is death, the image is not scenery — it is the promise of a supply that does not depend on the season.</p>

  <h3>People, not only places</h3>
  <p>One article follows the promise that families are rejoined — ancestors, spouses, descendants brought back together. The collection notes how much of the Quran's paradise is relational: the grief being answered is separation, and the resolution is described in terms of who is there.</p>

  <h3>The silence at the end of the description</h3>
  <p>After describing the garden across many verses, As-Sajdah says no soul knows what has been hidden for them (32:17). The collection reads this not as an admission of ignorance but as a deliberate move: having given the most detailed account it will give, the Quran announces that the account is not the thing. The withholding is the last and largest description.</p>
</div>`,

'zulm': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Ẓulm is translated as oppression, injustice, wrongdoing. Before it was an ethical term the root meant something plainer: darkness, and putting a thing where it does not belong. The articles in this collection recover that older sense and find that it explains the Quran's otherwise puzzling range of uses.</p>

  <h3>Misplacement</h3>
  <p>If ẓulm is misplacement, then a single word can cover a tyrant crushing a population and a person quietly ruining themselves — because both are things put where they do not belong. The collection uses the root to explain why the Quran does not need separate vocabularies for public injustice and private sin. They are the same error at different scales.</p>

  <h3>The word turned inward</h3>
  <p>The Quran's first use of it in a human mouth is not an accusation against anyone else. Adam says: <em>our Lord, we have wronged ourselves</em>. The collection treats <em>ẓulm al-nafs</em> as the Quran's most precise account of what sin actually is — not primarily an offence against a rule, but a person setting their own self down in the wrong place.</p>

  <h3>Justice as something already built</h3>
  <p>Against ẓulm the Quran sets the balance placed in the heavens. The collection's reading is that the command is not to invent justice but to align with a balance that is already there — which reframes injustice as a deviation from the structure of things rather than merely a breach of an agreement between people.</p>

  <h3>Who the Quran says was made weak</h3>
  <p>The collection's closest grammatical work is on the word for the powerless. Where English says "the weak," the Quran uses <em>istuḍʿifū</em> — a passive verb: they were <em>made</em> weak. Its counterpart, <em>istakbarū</em>, is the same pattern in the active: they made themselves great. Bigness is self-issued; smallness is inflicted. Four of the five occurrences sit inside an argument that continues past death, and in the fifth God announces that He intends to reverse the arrangement.</p>
</div>`,

'harun': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Harun is never introduced on his own. The Quran mentions him around twenty times and almost always in relation to someone else — and the articles in this collection argue that the relational framing is the portrait, not a shortage of material.</p>

  <h3>A brother who was requested</h3>
  <p>Musa did not simply have a brother; he asked for him. Standing before the assignment of his life, he prayed for Harun to be made his partner in it. The collection reads the request as self-knowledge: a prophet naming, out loud and in advance, the thing he could not do alone. The Quran preserves both the asking and the granting.</p>

  <h3>Holding the line by himself</h3>
  <p>Then the Quran hands him the hardest forty days in the story. Musa climbs the mountain, the people build a calf, and Harun is left to hold a community that has already made up its mind. His explanation when Musa returns is one of the most anguished speeches in the book — a man defending not his conduct but his judgment, having chosen to keep the people together rather than force a confrontation that would have split them. The collection lets the difficulty stand rather than resolving it.</p>

  <h3>Named among the honoured</h3>
  <p>In the Quran's genealogies of praise, Harun is listed with the prophets given guidance and favour. The collection's closing observation is that a life defined by partnership is not treated by the Quran as a lesser life. He is the support, the second voice, the one who stayed with the crowd — and the Book places him among the honoured without qualification.</p>
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

    const { error } = await supabase
      .from('hub_synthesis_cache')
      .upsert(
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
