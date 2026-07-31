#!/usr/bin/env npx tsx
/**
 * generate-missing-hub-syntheses.ts
 *
 * The 2026-07-24 hub audit found 30 entities with 3+ published articles and NO
 * synthesis row — meaning their Overview tab (the hub's front door) renders the
 * placeholder "A synthesized overview will appear here as content grows." Yusuf
 * with 10 articles, Ibrahim with 10, Maryam with 8 all showed this.
 *
 * Each synthesis below is woven from that hub's actual published articles (titles
 * + excerpts pulled from the DB), not invented. Every ayah reference cited here
 * was verified against the Uthmani text via quran-validator before writing.
 *
 * Idempotent: upsert on entity_id. Run again safely after adding more.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SYNTHESES: Record<string, string> = {

'yusuf': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Surah Yusuf is the only story the Quran tells straight through, start to finish, in a single chapter — and it calls itself <em>the most beautiful of stories</em>. The articles in this collection trace what that beauty is actually made of: not a rescue narrative, but a study of what a person does inside enclosure, accusation, and finally power.</p>

  <h3>The well, and what was said at the bottom of it</h3>
  <p>The story's first crisis is also its quietest theological moment. As the brothers lower him into the pit, the Quran reports that God revealed to Yusuf that he would one day inform them of this very deed while they did not perceive it (12:15). The revelation is not a rescue and not an escape — it is a promise delivered at the lowest point, telling him the story is longer than the hole he is in. That structure recurs across the Quran: a well, a cave, a whale, a fire. Every enclosure should have been an ending; every one became the site of encounter.</p>

  <h3>Prison chosen, not suffered</h3>
  <p>The temptation scene in Egypt is preserved in forensic detail — the attempt, the shirt torn from behind, the women of the city and the banquet where they cut their hands. What the collection draws out is Yusuf's own sentence: <em>my Lord, prison is dearer to me than what they call me to</em> (12:33). He is not choosing pain over pleasure. He is choosing the only freedom still available to him, and naming it as preference rather than endurance. Inside that same prison, addressing two fellow inmates, he states the clause the Quran elsewhere gives as God's own decree — <em>worship none but Him</em> — the exact construction appearing in only two places in the whole book (12:40 and 17:23). A prisoner with no standing states the sovereign command verbatim.</p>

  <h3>The forgiveness that asked for nothing</h3>
  <p>When the brothers finally stand before him, exposed and powerless, Yusuf holds every advantage. What he says is: <em>no blame upon you today</em> (12:92). No demand for an apology, no accounting of what was done. The Quran gives him total leverage and records him declining to use it — which is why the scene, not the throne, is the story's real summit.</p>

  <h3>A story engineered from the first line</h3>
  <p>The craft runs deeper than plot. In the opening scene the boy describes eleven stars, the sun and the moon prostrating — and refers to them with the pronoun and plural ending Arabic reserves for <em>rational beings</em>, quietly solving the dream before any interpreter speaks. The Quran also sets Yusuf beside Musa as mirror lives: water at the start, the enemy's palace, accusation, exile, and a return in which the discarded one holds authority. Centuries later, a secret believer inside Pharaoh's court will reach back and invoke Yusuf's name to stop an execution — the story still working long after its subject has died.</p>
</div>`,

'ibrahim': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Ibrahim appears in the Quran more than almost any other figure, and never as a man in the process of being convinced. The articles in this collection show a mind that argues, tests, dismantles, and asks to see — and a God who answers that temperament rather than rebuking it.</p>

  <h3>The argument as method</h3>
  <p>His confrontations are structured like proofs. Facing a king who claimed the power to give life and death, Ibrahim does not escalate the claim — he relocates it: bring the sun from the east, then, and the king is left speechless (2:258). Facing his people's idols, he destroys all but the largest, leaves the axe in its hands, and invites them to ask it what happened. The trap is built entirely out of their own logic, and they walk into it. In both scenes the Quran preserves not a miracle but a sentence, because the sentence is what did the work.</p>

  <h3>The fire that was told what to be</h3>
  <p>When he is thrown into the fire, God does not extinguish it. The command is given to the fire itself: <em>O fire, be coolness and peace upon Ibrahim</em> (21:69). Protection here is not the removal of the threat but the reordering of its nature — the danger stays exactly where it is and stops behaving as danger. It is the Quran's most compressed statement of what divine protection actually looks like.</p>

  <h3>Asking to see</h3>
  <p>Ibrahim already believed when he asked God to show him how the dead are given life (2:260). The Quran records the question, and God's reply — <em>do you not believe?</em> — and Ibrahim's answer, that he wants his heart to be at rest. The request is granted. Only one other person in the Quran says <em>show me</em>: Musa, asking to see God, and told <em>never</em>, as a mountain collapses. Two men use the same word and receive opposite answers, and the difference is what each asked to see.</p>

  <h3>The prayer that stopped, and the household</h3>
  <p>He prays for the father who threatened to stone him, and keeps praying — until At-Tawbah records the point at which the prayer ended and why (9:114). The collection also places him inside a family the Quran renders with unusual intimacy: the vocative <em>yā abati</em>, "O my dear father," occurs eight times from four speakers, and every one of them turns out upright. And when the messengers bring news of a son, his wife's reaction is preserved twice with one shared phrase and two different responses — she laughs in Surah Hud, and strikes her own face in Adh-Dhariyat.</p>
</div>`,

'nuh': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Nuh's root — <strong>n-w-ḥ</strong> — carries the sense of wailing and lament, and the Quran's portrait earns the name. The articles in this collection trace a mission that ran for centuries and converted almost no one, and a book that preserves it in full rather than quietly editing it into a success.</p>

  <h3>A prophet reporting his own failure</h3>
  <p>Al-Ankabut gives the span plainly: he remained among his people a thousand years less fifty (29:14). Surah Nuh then does something almost unbearable — it lets him file the report himself. He lists the methods: night and day, in public and in private. He describes the response: fingers pushed into ears, garments pulled over faces, a refusal so physical it needed the body to perform it (71:7). The report is addressed to God, not to us; we are overhearing a private accounting. What the Quran chooses to preserve, when a mission does not convert, is the labour rather than the result.</p>

  <h3>The ark, built in front of the people who laughed</h3>
  <p>He is told to build under God's eyes and God's instruction, and the elders mock him each time they pass. The scene is the Quran's clearest teaching on doing the work that matters before anyone agrees it matters — the ridicule is recorded, and so is the fact that it changed nothing about the building.</p>

  <h3>The son who stayed behind</h3>
  <p>The story's deepest wound is domestic. As the waves rise like mountains, Nuh calls out to his own son, standing apart (11:42). The son answers with a theory: he will take shelter on a mountain that will protect him from the water. It is the reply of someone who has heard the argument and produced a counter-argument. Nuh's appeal to God afterward — and the answer he receives — is among the most painful exchanges in the Quran, and it settles something the book insists on everywhere: proximity to a prophet saves no one.</p>

  <h3>The economy of the ending</h3>
  <p>Then the flood ends in two sentences. The earth is told to swallow its water; the sky is told to stop; the water subsides, the matter is decided, the ark comes to rest (11:44). After centuries of narrative, the resolution is delivered in a handful of imperatives addressed to the planet itself. Surah Hud also sets Nuh directly beside Ibrahim, handing each man the same Arabic phrase and using it to opposite ends — one told to move, one told to stop.</p>
</div>`,

'iblis': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran's treatment of Iblis is unusually clinical. It gives no physical description, no kingdom, no cosmic army — but it does give his reasoning, his method, and his own final confession. The articles in this collection assemble what amounts to a dossier compiled from the adversary's own statements.</p>

  <h3>The argument, preserved without rebuttal</h3>
  <p>His refusal arrives as a syllogism: <em>I am better than him — You created me from fire and created him from clay</em> (7:12). The Quran records the argument and declines to argue back. What it does instead is show the outcome: the reasoning was sound in form and catastrophic in result, because it began from a premise about his own superiority. The story is retold across seven surahs, each taking a different piece and serving a different argument — and reading the variations together is itself the lesson.</p>

  <h3>The method: steps, not leaps</h3>
  <p>The Quran's term is <em>khuṭuwāt al-shayṭān</em> — the <em>footsteps</em> of Shaytan. Not lunges. Footsteps: temptation described as a sequence of increments, each small enough to be unremarkable. Paired with this is the internal collaborator — the <em>nafs</em>, the commanding self — so that the external whisper always has something inside already inclined to agree with it.</p>

  <h3>What he told the truth about</h3>
  <p>In 7:16 he states his plan openly, and in 38:82–83 he names his own limit: he will pursue all of them <em>except Your chosen servants among them</em>. The Quran does not dispute his analysis of human weakness — it lets the assessment stand, which is far more unsettling than a refutation. And the final word is a confession. On the Day of Judgment he addresses his followers and admits he never had authority over them at all; he called, and they answered (14:22). The most complete statement of human responsibility in the Quran is placed in the mouth of the tempter.</p>

  <h3>The silences</h3>
  <p>What the Quran withholds is deliberate: no appearance, no throne, no dominion over matter. Every omission redirects attention from a figure to be pictured toward a mechanism to be recognised — which is the only form in which he is actually dangerous.</p>
</div>`,

'firaun': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Fir'awn speaks more than almost any other opponent in the Quran, and his speech is preserved with unusual care. The articles in this collection read that speech closely — because the Quran's case against him is built almost entirely from his own sentences.</p>

  <h3>The grammar of tyranny</h3>
  <p>His rhetoric follows a recognisable sequence: evade the message, attack the messenger's credibility, mock his competence, and finally threaten imprisonment. Across the throne-room exchanges, Musa never once defends himself personally — he returns to the message each time. The Quran's preservation of both scripts, side by side, is the argument: one man defends his position, the other delivers his instructions.</p>

  <h3>Building toward the sky</h3>
  <p>His most revealing order is architectural. <em>Haman, build for me a tower, that I may reach the ways</em> — and look upon the God of Musa (40:36). Power expressed as construction, and a search for the divine conducted by means of masonry. The counterpoint sits in the same household: his own wife uses the identical opening — <em>build for me</em> — and directs it to God, asking for a house with Him in the Garden (66:11). Two people in one palace say the same two words; one points at the sky, the other past it.</p>

  <h3>The belief that came too late</h3>
  <p>At the moment the sea closes over him, he declares faith in the God of the Children of Israel. The Quran records the declaration and then records the reply: <em>now? — when you disobeyed before and were among the corrupters</em> (10:90–91). Belief exists in that sentence; what has closed is the window in which it counted. It is the Quran's most sobering statement about the timing of repentance.</p>

  <h3>The mirror</h3>
  <p>Musa and Fir'awn are constructed as structural opposites — the infant he tried to kill returns as the voice he cannot answer, and each is defined by what the other refuses. The pattern extends into his own court, where a man who had hidden his faith for years finally stands up and defends Musa by invoking Yusuf, a name reaching back centuries that the court could not dismiss. The tyrant is surrounded, in the end, by people his power never actually reached.</p>
</div>`,

'tawbah': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Tawbah is usually translated "repentance," which makes it sound like an emotion. The root <strong>t-w-b</strong> means something plainer and more physical: <em>to turn back</em>. The articles in this collection follow that root through the Quran and find it doing something remarkable — describing a movement that runs in both directions.</p>

  <h3>The name that makes returning mutual</h3>
  <p>The Quran uses the same root for the servant and for God. A person turns back to God; and God is <em>al-Tawwāb</em> — the one who turns, constantly, toward those who turn. Adam's story shows the sequence exactly: he receives words from his Lord, speaks them, <em>and He turned to him</em> (2:37). The turning is mutual, and God's turn is what completes it. Repentance in the Quran is therefore not a transaction a person performs alone and hopes is received; it is a meeting.</p>

  <h3>The fork in the garden</h3>
  <p>The collection's sharpest comparison sets Adam against Iblis. Both were present at a command; both failed it. What separates them is entirely what happened next. Adam says <em>our Lord, we have wronged ourselves</em> (7:23). Iblis argues. The Quran places the two responses close enough that the contrast is unmissable: the sin was not the dividing line — the response to it was. The same confession, word for word, later appears in the mouth of a pagan queen, which is the collection's quiet argument that the door is not restricted by background.</p>

  <h3>Where the door closes</h3>
  <p>The Quran is precise about the limits. Tawbah is not accepted from those who persist until death is actually upon them (4:18), nor once the punishment has visibly arrived. Those two boundaries are the whole of the restriction — and against them stands the most expansive verse in the book, addressed to those who have wronged themselves beyond measure, telling them not to despair of God's mercy (39:53). The collection notes that despair of mercy is the one form of despair the Quran files under disbelief; grief, fear and exhaustion are all allowed to stand uncorrected.</p>

  <h3>The heart, sealed and rusted</h3>
  <p>Running underneath is the Quran's account of what makes returning hard. The heart enters the book sealed (2:7) and leaves it rusted by what a person earned (83:14) — the same image from two directions, one describing a divine act and one a human accumulation. Tawbah is the mechanism the Quran gives for the second: the rust is earned, and so it can be reversed.</p>
</div>`,

'nafs': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The word <em>nafs</em> appears 295 times in the Quran and gets translated as soul, self, person, life and mind — often within the same page. The articles in this collection treat that instability as data rather than a translation problem: the Quran is describing something that genuinely changes state.</p>

  <h3>Three stations, one self</h3>
  <p>The Quran names the self in three conditions. <em>Al-nafs al-ammārah bi'l-sūʾ</em> — the self that commands toward evil (12:53), spoken by Yusuf at the height of his vindication, refusing to declare himself innocent. <em>Al-nafs al-lawwāmah</em> — the self-reproaching soul, which Surah Al-Qiyamah swears an oath by (75:2). And <em>al-nafs al-muṭmaʾinnah</em> — the self at peace, addressed at the moment of return (89:27). These are not three different souls but three stations one self can occupy, and the collection reads them as a map rather than a hierarchy of persons.</p>

  <h3>The oath that means something</h3>
  <p>The detail worth pausing on is what Al-Qiyamah swears by. Not the sun, not the mountains — the self that accuses itself. The capacity for self-reproach is dignified by being placed alongside the Day of Resurrection in a divine oath. The internal witness, in the Quran's account, is evidence of the coming reckoning rather than a symptom of neurosis.</p>

  <h3>The inside collaborator</h3>
  <p>The nafs is also where the Quran's account of temptation becomes uncomfortable. Shaytan works from outside; the commanding self is already inside and already inclined. The articles map that partnership carefully — the whisper needs something to whisper to — and then turn to the prescription: the Quran does not only diagnose, it supplies the counter-move, from the <em>istiʿādha</em> command to Surah An-Nas, which names the whisperer and the chest it whispers into in a single short chapter.</p>
</div>`,

'adam': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Adam's story is the Quran's most-repeated narrative, and the articles in this collection read it for what it establishes rather than what it dramatises: a creature defined by a capacity, a descent that is architecture rather than punishment, and the first words of return ever spoken.</p>

  <h3>The naming</h3>
  <p>The first thing said about human capability is not strength or beauty but language: <em>He taught Adam the names, all of them</em>, then presented them to the angels, who could not (2:31). The fulcrum of the whole scene is naming — the ability to hold reality in words and therefore to know it. The angels' objection about bloodshed is not refuted; it is answered with a demonstration of a faculty they lack.</p>

  <h3>Descent as design</h3>
  <p>When Adam and his wife eat from the tree and their coverings fall away (7:22), the instruction to descend follows. The collection reads that descent as structural rather than penal — the earth was announced as the destination before the tree was ever touched, in the same conversation where a <em>khalīfa</em> was announced. What changed was not the plan but the state in which they arrived.</p>

  <h3>The first words of return</h3>
  <p>What Adam does next becomes the template for everyone after him. He receives words from his Lord and speaks them: <em>our Lord, we have wronged ourselves</em> (7:23) — and God turns to him (2:37). This is the first repentance in human history, and the Quran gives it as a formula rather than a feeling. Set beside Iblis, who received the same exposure and argued instead, the scene establishes the Quran's central claim about failure: what matters is the direction you face afterwards.</p>

  <h3>What the Quran never says</h3>
  <p>One of the collection's most-read findings is an absence. The assumption that Eve caused the fall is among the most settled ideas in religious imagination — and the Quran never names her, never singles her out, and consistently uses the dual form: <em>they both</em> ate, <em>they both</em> said "our Lord, we have wronged ourselves." The blame the tradition inherited from elsewhere is simply not in the text.</p>
</div>`,

'maryam': `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Maryam is the only woman the Quran names, and the only human being given a chapter under her own name. The articles in this collection trace a portrait built almost entirely out of speech and silence — what she asks, what she is given, and the moment she refuses to say anything at all.</p>

  <h3>The question, and the title</h3>
  <p>When the announcement comes, Maryam asks how this can be, given that no man has touched her (3:47). The Quran preserves the question rather than smoothing it away — it is a request for information, not an objection. And the title it finally gives her is not prophetess or saint but <em>ṣiddīqah</em>, one of the profoundly truthful (5:75): the highest human rank the Quran names below prophethood, awarded for a quality of speech.</p>

  <h3>What was provided, and what was not</h3>
  <p>At her most isolated, in labour beneath the palm, she prays to be forgotten entirely — erased from memory. That prayer is not granted. What arrives instead is an instruction to shake the trunk toward herself so that ripe dates fall (19:25): provision requiring her own exhausted effort, and a refusal of the request to disappear. The Quran answers the need underneath the prayer rather than the words of it.</p>

  <h3>She pointed</h3>
  <p>Returning to her people with the child, accused, she had vowed silence — and so she simply pointed at the infant (19:29). The Quran's most compressed defence is a gesture. She does not argue her own case; the case answers for itself.</p>

  <h3>Two miracles, one changed verb</h3>
  <p>The collection's most precise finding sits seven verses apart in Al Imran. Zakariyya asks how he can have a son in old age, and Maryam asks how she can have a child untouched. The two divine answers run word for word in parallel — until the verb. For Zakariyya: <em>thus does God do as He wills</em> (3:40). For Maryam: <em>thus does God create as He wills</em> (3:47). One miracle works through an existing capacity; the other originates. The whole theology of her son's conception turns on a single changed word. Read alongside the mother of Musa — another woman handed an impossible command with a child's life inside it — and alongside At-Tahrim's four women, where marriage to a prophet saves no one and marriage to a tyrant condemns no one, Maryam stands as the Quran's argument that standing before God is never inherited.</p>
</div>`,
}

async function main() {
  for (const [slug, html] of Object.entries(SYNTHESES)) {
    const { data: ent } = await supabase.from('entities').select('id').eq('slug', slug).maybeSingle()
    if (!ent) { console.error(`❌ entity ${slug} not found`); continue }

    const { count } = await supabase
      .from('entity_tags')
      .select('*', { count: 'exact', head: true })
      .eq('entity_id', ent.id)
      .eq('is_primary', true)

    const { error } = await supabase.from('hub_synthesis_cache').upsert({
      entity_id: ent.id,
      synthesis_html: html.trim(),
      content_hash: `${slug}-${count}-articles-v1`,
      last_generated_at: new Date().toISOString(),
    }, { onConflict: 'entity_id' })

    console.log(error ? `❌ ${slug}: ${error.message}` : `✅ ${slug} synthesis written (${count} articles)`)
  }
}

main()
