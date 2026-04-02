#!/usr/bin/env npx tsx
/**
 * insert-hub-syntheses.ts
 * Generates and upserts hub synthesis HTML for all 12 entity groups
 * that received new articles in this batch.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const syntheses: Record<string, { articleCount: number; html: string }> = {

'iman': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Iman in the Quran is not primarily a doctrinal category — it is a <em>verb that became a habitation</em>. The three articles in this collection trace iman from its root meaning (entering into safety with God), through the Quran's vocabulary of stages, to its most recognizable form: the recurring address <strong>yā ayyuhā alladhīna āmanū</strong>, which gathers a community not by bloodline but by a shared interior act.</p>

  <h3>The root that enters the heart</h3>
  <p>The root <strong>ʾ-m-n</strong> carries the concrete field of safety, security, and trustworthiness. A road is made safe. A deposit rests in trusted hands. From that field, iman unfolds as entering into safety with God — trusting Him enough that the inner life becomes anchored. The semantic study of iman's vocabulary reveals a ladder: <em>islām</em> (outward submission), <em>īmān</em> (inner trust), and the full <em>yaqīn</em> (certainty) that the Quran names at its apex as <em>ḥaqq al-yaqīn</em> — truth itself made certain.</p>

  <p>Al-Hujurat (49:14) preserves the Quran's sharpest distinction between these stages. The Bedouin say <em>āmannā</em> and are corrected: say <em>aslamnā</em>, for faith has not yet entered your hearts. The word "enter" changes everything. Iman has arrival, penetration, settlement. One may stand near the threshold — outwardly aligned with the Muslim community — and still await the deeper inhabitation.</p>

  <h3>The pair that never separates</h3>
  <p>The Quran's recurring formula <strong>alladhīna āmanū wa ʿamilū al-ṣāliḥāt</strong> — those who believe and do righteous deeds — is not redundancy. It is theological architecture. Iman and ʿamal are paired because the Quran refuses to leave belief behind the ribs as a hidden possession. Trust in God spills outward into kinship obligation, economic generosity, ritual fidelity, and endurance under pressure.</p>

  <p>Al-Asr (103) gives this pairing its most compressed form: the whole human project rushes toward loss except for those who combine faith with action, then wrap both in mutual counsel toward truth and patience. The sequence matters — belief generates action, but neither stands without the other. A community of faith is legible in the world because of how wealth travels, whether promises hold, and the composure of people under hardship.</p>

  <h3>The address that forms a people</h3>
  <p>When the Quran says <em>yā ayyuhā alladhīna āmanū</em>, it does something remarkable: it constitutes a community through a vocative. The address presumes difference of age, temperament, and story, yet gives all those differences a shared center — trust in God strong enough to reorder conduct. The address is both intimate and public. It names a heart-state, then turns that heart-state into a people capable of hearing a command together.</p>

  <p>Al-Anfal (8:2-4) lets us overhear iman while it is alive: hearts tremble at God's mention, recitation increases faith, reliance leans toward the Lord, prayer is established, provision becomes something to pass on. The sequence is exquisite — inner sensation, then receptivity, then reliance, then ritual, then generosity. Iman is not a static entry; it has degree, texture, expansion. The community called by this address is always being enlarged in what it entered.</p>
</div>`,
},

'ihsan': {
  articleCount: 2,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Ihsan in the Quran is not the final layer added to obedience — it is the quality that makes obedience <em>fully itself</em>. The two articles in this collection trace the root <strong>h-s-n</strong> from its concrete field of beauty and fine finish, through the Quran's three-layer structure of islam, iman, and ihsan, to show why the Quran's moral world is never content with bare compliance.</p>

  <h3>The muḥsin: one who does it beautifully</h3>
  <p>The root h-s-n gathers beauty, pleasantness, and fine quality into one field. A gesture can be finely done. A departure can carry grace in its gait. From that concrete ground, ihsan opens: goodness made beautiful in its intention, measure, and completion. The <em>muḥsin</em> is not merely a doer of good — he is the one whose act has beauty in its manner as well as its substance.</p>

  <p>Al-Baqarah (2:195) places the command to do ihsan beside spending and restraint from self-destruction, closing with: <em>Allah loves the muḥsinīn</em>. Divine love in the Quran is attached to a style of action. The beloved human being is one who does what is due with a beauty exceeding bare sufficiency. An-Nahl (16:90) builds the moral ladder explicitly: justice gives each thing its due; ihsan carries the movement further — adding beauty, generosity, and graceful excess. Justice can be exact; ihsan can be radiant.</p>

  <h3>The three-layer structure</h3>
  <p>The Quran's vocabulary of surrender, trust, and beautiful excellence forms a layered structure that classical scholarship named as the three degrees of the religion. Islām — from s-l-m — conveys wholeness, soundness, and surrender into safety: an act of yielding oneself over to divine order. Īmān — from ʾ-m-n — adds inward trust and secure assent: the heart that has entered safety. Iḥsān — from h-s-n — adds beauty: action brought to its fitting form.</p>

  <p>Al-Baqarah (2:112) gives the integration: <em>whosoever submits his face to Allah while being a muḥsin — his reward is with his Lord</em>. The phrase "submits his face" conveys full orientation; "while being a muḥsin" qualifies that orientation with beauty of manner. Ar-Rahman (55:60) gives the axiom that seals the argument: <em>is the recompense of ihsan anything but ihsan?</em> Beauty generates a world in which excellence is mirrored with excellence. The moral ladder in the Quran is therefore beautifully severe: it asks the believer for what is right, then asks that the right be done in a way worthy of the One who loves the muḥsinīn.</p>
</div>`,
},

'qadar': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Qadar in the Quran is not a philosophical puzzle about freedom and determinism — it is a revelation about the nature of a universe shaped by divine <em>measure, proportion, and capacity</em>. The three articles in this collection trace the root q-d-r from its concrete field of measurement, through qaddara as the verb of creation, to the Quran's deliberate refusal to dissolve the tension between decree and human accountability.</p>

  <h3>The root that means measure</h3>
  <p>Before qadar became theological shorthand for fate, its root spoke of exact fit, due proportion, and capacity matched to purpose. A measure is what something holds. A potter's vessel has its qadr. A day has its measured hours. From that concrete ground, the Quran's doctrine of decree opens: Allah decreed all things (<em>wa-qaddara</em>) — not as a detached fatalism but as an act of precise, purposeful calibration. Al-Qamar (54:49) states it plainly: <em>We created everything in measure</em>.</p>

  <h3>Qaddara: the verb the Quran uses for creation</h3>
  <p>The verb <em>qaddara</em> — He measured it out — appears repeatedly in the Quran's account of creation itself. In Abasa (80:19), a human being's creation is announced with: <em>He created him, then measured him out</em>. The measuring is not subsequent to creation — it is part of what creation means. Al-Ala (87:2-3) pairs creation with decree: <em>He who created and formed, and who measured and guided</em>. The universe in the Quran is not thrown out randomly; it is calibrated. Every provision has its measure (Al-Hijr 15:21). Every soul is given what it was shaped to receive.</p>

  <h3>Holding the tension</h3>
  <p>The Quran's most concentrated verses on decree and choice resist every easy resolution. Al-Insan (76:29-30) states that humans will only will what Allah wills — and immediately pairs this with the human will to choose the path (<em>whoever wills, let him take a path to his Lord</em>). At-Takwir (81:28-29) gives the same structure. The Quran does not present these as contradictory. It presents them as two simultaneously true things that a human being must hold without collapsing one into the other.</p>

  <p>Al-Kahf (18:29) gives the moral corollary: <em>Say, the truth is from your Lord — whoever wills, let him believe; whoever wills, let him disbelieve</em>. This is not indifference. It is the Quran asserting that accountability requires real choice. Ash-Shams (91:7-10) goes furthest: Allah inspired the soul with its capacity for transgression <em>and</em> righteousness, and the one who purifies it succeeds. The soul receives its decree; the soul also acts. Both are real. The Quran's doctrine of qadar ultimately generates moral seriousness, not passivity — because a decreed world is a world where what you do with your measure is precisely what you are accountable for.</p>
</div>`,
},

'rizq': {
  articleCount: 2,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Rizq in the Quran is not primarily about wealth — it is about the ongoing divine act of sustaining every creature in existence. The two articles in this collection trace the divine name <strong>Al-Razzaq</strong> and the Quran's circuit of provision, gratitude, and spending, showing that rizq is theological before it is economic.</p>

  <h3>Al-Razzaq: continuous and universal</h3>
  <p>The root r-z-q carries the sense of gift received from above — provision that comes to a creature from a source beyond itself. A master provides for his servant. Rain provides for the earth. The divine name <em>Al-Razzāq</em> (Adh-Dhariyat 51:58) — the Ever-Provider — names this act as continuous. Allah does not provide once and withdraw; He provides without ceasing. The verbal form <em>razzāq</em> carries intensive, ongoing action. Creation is not an event in the past — it is a sustained act in the present, and rizq is the signature of that sustaining.</p>

  <p>Al-Ankabut (29:60) extends this universality to the animal world: how many creatures carry no provision with them, yet Allah provides for them and for you. The provision of creatures that cannot store, plan, or trade is the Quran's evidence for rizq as a direct divine act. The vulnerability of the creature is precisely the site where the divine provision is most visible.</p>

  <h3>The circuit of provision, gratitude, and spending</h3>
  <p>The Quran does not leave rizq as a one-way gift. It weaves provision into a moral circuit. Al-Baqarah (2:3) places <em>mimmā razaqnāhum yunfiqūn</em> — from what We have provided them, they spend — as one of the defining marks of the faithful. Provision received creates an obligation to circulate it. Al-Baqarah (2:254) tightens this: <em>spend from what We have provided you before a day comes when there is no exchange, no friendship, and no intercession</em>. The window for spending from rizq is this life only.</p>

  <p>Ibrahim (14:7) gives the pivot on gratitude: <em>if you are grateful, I will increase you; if you are ungrateful, My punishment is severe</em>. The Quran's economic theology is therefore a single circuit: Allah provides → the creature receives → gratitude opens the valve of increase → spending circulates the provision → this generosity is itself gratitude in action. Saba (34:15) shows this with the people of Sheba, given a land of gardens and commanded to eat of their Lord's provision and be grateful. Their ingratitude collapses the circuit, and the abundance is replaced by bitterness. Rizq, in the Quran, is sustained by the moral condition of the one who receives it.</p>
</div>`,
},

'mahabbah': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Mahabbah in the Quran is a divine initiative before it is a human response. The three articles in this collection trace the root h-b-b from its concrete field of seed and kernel, through the Quran's enumeration of whom Allah loves, to the grammar of mutual love — showing that love in the Quran has direction, condition, and consequence.</p>

  <h3>The root that means seed</h3>
  <p>The root h-b-b connects love with the image of the kernel — dense, concentrated, buried in the heart of a thing. <em>Hubb</em> in the Quran is this concentrated love: deep, interior, grounded. The Quran distinguishes it from <em>wudd</em> (warm affection, tenderness, the easy flow of feeling) by placing them in different contexts. Hubb appears in the declarations of divine love for the muhsineen, the muttaqeen, the mutawakkileen. Wudd appears in Maryam (19:96): <em>Allah will place wudd for those who believe and do righteous deeds</em> — a tenderness placed by God into other hearts toward the believer. Both are real; they operate at different temperatures.</p>

  <h3>Whom Allah loves: the portrait of the beloved</h3>
  <p>The Quran's repeated declarations of divine love — <em>Allāh yuḥibbu</em> — sketch a portrait of the beloved servant. Allah loves the muḥsinīn (those who act beautifully), the muttaqīn (those who are mindful), the mutawakkilīn (those who place their reliance on Him), the tawwābīn (those who return in repentance), and those who purify themselves. As-Saff (61:4) adds the mujāhidīn fī sabīlih — those who strive in His cause in ranks, as though they are a single structure.</p>

  <p>Read together, the portrait is coherent: the beloved servant is one whose inner trust (tawakkul) expresses itself in beautiful action (ihsan), sustained by ongoing return when it fails (tawbah), supported by communal solidarity (saf). Al-Hujurat (49:9) adds the demand to act justly even between warring factions — and attaches divine love to that act of justice. The Quran's picture of the beloved is both demanding and deeply merciful: the beloved is not one who has reached a spiritual summit, but one whose direction is consistently toward Allah even when the path requires repair.</p>

  <h3>Yuhibbuhum wa yuhibbunahu: the mutual grammar</h3>
  <p>Al-Maidah (5:54) gives the Quran's boldest statement of mutual love: <em>He loves them and they love Him</em>. The divine love comes first in the sentence — and in the order of reality. The believer's love for Allah is response, not origin. Aal-e-Imran (3:31) gives the operative link: <em>if you love Allah, follow me, and Allah will love you</em>. Love for Allah is authenticated by following the Messenger — not as a transaction, but as the natural expression of love seeking to resemble its object.</p>

  <p>Al-Baqarah (2:165) describes those who love Allah with a love like the love due to Him alone — <em>ashadu hubban lillah</em>, a love most intense, concentrated, and exclusive. The Quran presents this not as an emotion to manufacture but as a state that grows from continued turning toward Allah. Hud (11:90) closes the circuit: Allah is <em>Wadud</em> — intensely, tenderly affectionate. The divine love is not cold or merely administrative. It is warm with the warmth of wudd, burning with the concentration of hubb. The creature that opens toward it receives both.</p>
</div>`,
},

'khawf': {
  articleCount: 2,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Fear in the Quran is not a spiritual pathology — it is a <em>moral engine</em>. The two articles in this collection trace khawf and khashya as distinct but related states, showing how the Quran uses fear as the force behind night worship, charitable giving, restraint, and patient endurance.</p>

  <h3>Khawf: anticipatory fear that moves</h3>
  <p>The root <em>kh-w-f</em> carries the sense of anticipating possible harm — fear with a forward vector, a consciousness of something that could arrive. In the Quran, this fear directed toward Allah generates motion rather than paralysis. As-Sajdah (32:16) describes the people of the night: <em>their sides draw away from their beds</em> in fear and hope — khawf paired with rajā'. The fear that draws them from rest is not anxious dread; it is awareness of divine reality sharp enough to move the body.</p>

  <p>The Quran's descriptions of those whose fear is productive follow a pattern: they give their wealth despite loving it (Al-Insan 76:8-10 notes they feed others while fearing a severe day from their Lord); they worship in the watches of the night; they restrain themselves from transgression because they are conscious of accountability. Khawf, in this register, is not the opposite of trust in Allah — it is what trust in Allah looks like when the magnitude of divine reality is held in view.</p>

  <h3>Khashya: knowing awe</h3>
  <p>The word <em>khashya</em> operates at a different level. Where khawf can arise from any anticipated harm, khashya is specifically rooted in <em>knowledge</em>. Fatir (35:28) gives the paradigmatic statement: <em>only those who know, among His servants, fear Allah with khashya</em>. The scholars, the learned, those who have looked deeply at the signs of creation — they are the ones in whom this deep reverence settles. Khashya is not accessible to ignorance; it requires having seen something of what one fears.</p>

  <p>Ta-Ha (20:77) and Al-Anbiya (21:49) place khashya in prophetic figures: Musa's confidence at the sea is not the absence of fear but the presence of a deeper knowing. The prophets are not fearless — they carry khashya as a permanent condition. Ya-Sin (36:11) shows the effective reach of Quranic warning: it benefits only one who <em>follows the reminder and fears the Most Merciful in the unseen</em>. Fear of what one cannot see — in the absence of empirical confirmation — is the distinctively faithful form of khashya. It requires the heart to take seriously what the eyes have not witnessed, on the basis of what revelation has said is real.</p>
</div>`,
},

'sidq': {
  articleCount: 2,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Sidq in the Quran is not merely a synonym for honesty — it is the quality of being <em>solid</em> all the way through. The two articles in this collection trace the root s-d-q from its concrete field of density and firmness, through the Quran's enumeration of the siddiq rank, showing why truth in the Quran is always tested by texture.</p>

  <h3>The root that means solid</h3>
  <p>The root s-d-q carries the sense of firmness, density, and correspondence between what something claims to be and what it is. A thing that is true is a thing that is solid — it holds up under pressure. A person of sidq is one whose inward claim and outward act stand in one line. The opposite of sidq is not merely error but pretense — the gap between word and reality, the claim that does not hold.</p>

  <p>The Quran's moral economy places sidq near the apex of virtue. At-Tawbah (9:119) commands the believer to be with the truthful — <em>kūnū maʿa al-ṣādiqīn</em>. This is not merely an instruction to tell the truth; it is an instruction to align oneself with those whose entire life has the quality of sidq. Az-Zumar (39:33) describes the one who brings the truth and the one who confirms it as the ones who are the God-fearing. Al-Hadid (57:18-19) places the siddiqeen and the shahideen alongside one another in the divine reckoning.</p>

  <h3>Al-Siddiq: the rank between prophets and martyrs</h3>
  <p>An-Nisa (4:69) gives the Quran's clearest ranking of the spiritual hierarchy: prophets, then <em>siddiqeen</em>, then <em>shuhadā</em> (martyrs), then the righteous — with the declaration that these are the best companions. The siddiq rank is not an honorary title; it is a station of verified correspondence between belief and life so complete that it approaches prophetic testimony in quality.</p>

  <p>The Quran grants this rank explicitly to several figures. Ibrahim is called a siddiq prophet (Maryam 19:41). Idris is called a siddiq prophet (19:56). Maryam — a woman — is called a siddiqah (Al-Maidah 5:75), confirming that the station is accessible across all categories. The common thread: each of these figures' lives verifies their faith with an integrity that makes the word and the life indistinguishable. Yusuf's confident interpretation in the prison (12:46) carries the quality of sidq — his word holds because his character holds. Al-Siddiq, in the Quran's economy, is the one in whom truth has become structural, not occasional.</p>
</div>`,
},

'qarun': {
  articleCount: 1,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Qarun in the Quran is a study in what happens when possession becomes identity. His single extended appearance in Al-Qasas presents reversal before it presents punishment — the earth does not merely punish him; it corrects an inversion in the order of things.</p>

  <h3>The man who said: this is mine, by my own knowledge</h3>
  <p>Al-Qasas (28:76-82) gives Qarun the most detailed individual portrait of any figure condemned in the Quran outside of Firaun and Iblis. He is of Musa's people — not an enemy of revelation by origin, but one who was given such treasure that the keys alone were a burden for a company of men. When the people counsel him to use his wealth in pursuit of what Allah has given him, he replies: <em>I was given this by knowledge that is in me</em>. The claim that wealth is self-generated — that the possessor's capacity is its own source — is the theological fracture point. It severs the circuit of rizq from the Razzaq.</p>

  <p>The people who envied him went out to observe his display: <em>if only we had what Qarun has been given — he is the owner of great fortune</em>. Yet the people of knowledge said: <em>the reward of Allah is better for one who believes and does righteous deeds</em>. The Quran preserves both voices — the voice of envy and the voice of knowledge — and lets the event adjudicate between them. When the earth swallows him, the same people who envied him say: <em>it is as if he never existed — those who deny Allah's gifts do not succeed</em>.</p>

  <h3>The reversal at the center of the scene</h3>
  <p>The earth swallowing Qarun is not merely a dramatic punishment — it is a structural reversal. Qarun possessed the world's surface; the world's depths reclaimed him. He built identity on accumulation; accumulation disappeared with him. He claimed his treasure was the product of his knowledge; knowledge without gratitude left him with nothing. Al-Ankabut (29:39) places him alongside Firaun and Haman as one of those brought to them the clear proofs but they were arrogant in the land. The three represent the three forms of rejection: theological pride (Firaun), political complicity (Haman), and economic arrogance (Qarun). Ghafir (40:24) echoes the same triad. In each case, the arrogance is named before the destruction — the destruction merely makes visible what the arrogance had already done to the soul.</p>
</div>`,
},

'bilqis': {
  articleCount: 2,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Bilqis in the Quran is the only named queen and one of the most psychologically rendered figures in the entire text. The two articles in this collection trace her appearance in An-Naml — the letter, the throne, and the final recognition — showing that her journey to faith is narrated not as sudden conversion but as a <em>deliberate intelligence arriving at truth</em>.</p>

  <h3>A queen who counsels and is counseled</h3>
  <p>When the hoopoe's report reaches Sulayman, he writes a letter and sends it. Bilqis receives it and does something the Quran emphasizes: she consults her council. <em>She said: O chiefs, advise me in my affair — I do not decide a matter until you bear witness</em> (An-Naml 27:32). This is the portrait of a ruler who governs through deliberation. Her council urges military strength; she overrides them with political wisdom: kings who enter a land in conquest corrupt it and humiliate its people of honor. She will send a gift instead and see what comes back.</p>

  <p>When Sulayman rejects the gift — <em>Do you provide me with wealth when what Allah has given me is better than what He has given you?</em> (27:36) — her response is calibrated. She will come herself. The Quran reads her decision not as capitulation but as recognition: this is a different kind of power.</p>

  <h3>The throne: the object moved before she arrived</h3>
  <p>Before Bilqis arrives, Sulayman asks his assembly: <em>which of you will bring me her throne before they come to me in submission?</em> (27:38). A being with knowledge of the Book brings it in the blink of an eye. Sulayman orders it altered — not destroyed, but modified — and asks: <em>will she recognize it or will she not?</em> (27:41). The test is one of perception: can she see the familiar through change?</p>

  <p>Her answer is extraordinary: <em>It is as if it were it</em> (27:42). Neither full recognition nor full denial — a careful, intelligent suspension. The Quran then gives her interiority directly: she was of a people who disbelieve. When she enters the palace and sees the floor of glass, she lifts her skirts thinking it water. Sulayman tells her it is transparent crystal. And at this moment — not from the letter, not from the gift's refusal, not from the throne — she speaks her iman: <em>My Lord, I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds</em> (27:44). Her faith is reached through a series of tests of perception, culminating in the moment she misread a surface and was corrected. She arrives at truth the way her entire narrative unfolds: by seeing clearly, then more clearly, then all the way through.</p>
</div>`,
},

'dawud': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Dawud in the Quran is the prophet most fully defined by his gifts — and most fully tested by them. The three articles in this collection trace his sonic bounty, his hasty judgment and immediate repentance, and the book given to him that the Quran mentions without quoting, showing a prophetic portrait built on gifted capacity and human accountability.</p>

  <h3>The voice that drew creation into praise</h3>
  <p>Saba (34:10) gives Dawud's sonic gift in one of the Quran's most arresting images: <em>O mountains, echo with him, and the birds</em>. The mountains and birds are not merely background — they are participants. Dawud's praise (tasbih) becomes cosmic. Al-Anbiya (21:79) confirms that the mountains and birds were made to tasbih with Dawud. The gift is not just a beautiful voice; it is the capacity to draw non-human creation into worship.</p>

  <p>Sad (38:17-19) gives the fullest description: Dawud is strong, ever-returning to Allah (awwab), and the mountains and birds respond to his praise morning and evening. The word awwab — one who returns constantly — is the Quran's characterization of Dawud's relationship with Allah. His praise is not occasional; it is structural to his existence. The sound of Dawud is therefore theological sound: tasbih extended outward from a human throat until creation joins it.</p>

  <h3>The judgment he gave against himself</h3>
  <p>Sad (38:21-25) gives one of the most compressed narratives in the Quran. Two disputants climb over the mihrab wall to reach Dawud — surprising him. Their case: one man's ninety-nine ewes vs. the other's single ewe. Dawud judges quickly in favor of the many against the one — and immediately the Quran says: <em>Dawud thought that We had tested him</em>. He did not wait for external correction. He recognized within himself the shape of the test and turned at once in prostration and repentance.</p>

  <p>The scene is not primarily about judicial error — it is about the quality of prophetic self-awareness. Dawud judged without hearing both sides fully (the Quranic commentators note this). His response was not defensive justification but immediate accountability. The Quran then says Allah forgave him and confirmed his station, and described him as having strong insight (38:45 places him among the people of strength and sight). Prophetic accountability is not the absence of mistake but the quality of response to it.</p>

  <h3>The book mentioned without being quoted</h3>
  <p>The Quran mentions the Zabur given to Dawud in four places (An-Nisa 4:163, Al-Isra 17:55, Al-Anbiya 21:105, and the passages around Saba 34:10-11 and Sad 38:17-20). It never quotes from it directly. This is one of the Quran's significant silences — and Al-Anbiya (21:105) gives a partial explanation: the Zabur itself contains the promise that the righteous will inherit the earth. The Quran cites this content not as quotation but as confirmation. The Zabur's content is real; its text is preserved in Dawud's praise that fills the space around it. The mountains, the birds, the morning and evening tasbih — these are the Zabur enacted rather than recited.</p>
</div>`,
},

'sulayman': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Sulayman in the Quran is the prophet whose gifts are most explicitly acknowledged as divine grants that do not belong to him. The three articles in this collection trace his hearing of the ant, his test with the horses, and his wind-carried kingdom — showing a royal figure who holds extraordinary power with deliberate acknowledgment of its source.</p>

  <h3>The ant he heard</h3>
  <p>An-Naml (27:18-19) preserves one of the Quran's most tender moments: Sulayman's army approaches a valley, and an ant warns her colony to enter their homes lest Sulayman and his armies unknowingly crush them. The Quran says Sulayman <em>smiled in laughter at her speech</em> and immediately supplicated: <em>My Lord, enable me to be grateful for Your favor upon me and upon my parents, and to do righteous deeds that please You</em>. The sequence is the article's argument: hearing a small voice that would be inaudible to anyone else, the first response is not pride in the gift but gratitude for it. Prophetic perception in Sulayman is inseparable from prophetic accountability toward the One who gave it.</p>

  <p>An-Naml (27:16) places this in context: Sulayman says he was taught the language of birds and given of all things — then adds <em>this is indeed a clear favor</em>. The gift is named as grace, not as natural capacity.</p>

  <h3>The horses and the sun</h3>
  <p>Sad (38:31-33) is one of the Quran's most deliberately compressed scenes. Beautiful horses are presented to Sulayman in the evening; he is engaged with them until the sun disappears. Then he says: <em>I loved the love of good things more than the remembrance of my Lord, until it disappeared behind the veil</em>. The Quran does not explain every gesture that follows. It preserves the enigma while giving Sulayman's interiority — a prophetic self-examination of where attachment had gone. The scene teaches by what it withholds: the Quran's deliberate refusal to resolve every detail is itself a form of addressing the reader, asking them to sit with the compression rather than demanding explanation.</p>

  <h3>The kingdom that moved</h3>
  <p>Al-Anbiya (21:81), Saba (34:12), and Sad (38:36-39) together describe Sulayman's wind-kingdom. The wind runs by his command to the land he has blessed. Allah gave him copper springs to flow freely; the jinn worked under his supervision. Sad (38:39) gives Allah's direct address: <em>this is Our gift — bestow or withhold without account</em>. The kingdom is framed as pure gift, given without precondition and held without permanent claim. Sulayman's identity is not defined by what he possesses; it is defined by how he responds to being given. An-Naml (27:40) shows this after the throne of Bilqis arrives in an instant: <em>This is from the favor of my Lord to test me whether I am grateful or ungrateful</em>. The kingdom's purpose, in Sulayman's own understanding, is not power but proof.</p>
</div>`,
},

'bani-israil': {
  articleCount: 3,
  html: `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">The Quran addresses Bani Isra'il with a peculiar intensity — not as a historical subject but as covenantal interlocutors still accountable to what was established at Sinai. The three articles in this collection trace the covenant, the calf, and the sea crossing, showing how each moment in the Quran's memory of Bani Isra'il is recalled not for condemnation alone but as part of an ongoing address.</p>

  <h3>Sinai: covenant as address</h3>
  <p>The Quran's memory of Sinai begins with favor before law. Al-Baqarah (2:40) opens: <em>O Children of Israel, remember My favor which I bestowed upon you, and fulfill My covenant and I shall fulfill your covenant</em>. The order is deliberate: grace is recalled before obligation. The covenant rests upon given gift, then answers with demand. Al-Baqarah (2:63) and Al-Araf (7:171) both describe the mountain raised above them — revelation accompanied by overwhelming sign, with the command to hold firmly and remember. The root <em>dh-k-r</em> in remembrance suggests that covenant can fail through forgetfulness as much as through open rebellion. Memory is a religious duty.</p>

  <p>Al-Maidah (5:12) gives the covenant its tribal and institutional shape: twelve leaders appointed, prayer and zakat and belief and support for the messengers forming the structure of covenantal life. Al-Baqarah (2:83-84) extends the covenant into ethics and speech: worship, family duty, care for the vulnerable, truthful speech. Sinai in the Quran is not merely an altar event — it is a complete shaping of communal life under divine command.</p>

  <h3>The calf: a scene the Quran returns to five times</h3>
  <p>The Quran revisits the golden calf across Al-Baqarah, Al-Araf, Ta-Ha, An-Nisa, and other contexts — each retelling sharpening a different theological edge. In Ta-Ha (20:83-98), the most extended account, Musa returns from Sinai to find the calf of Samiri. The exchange between Musa and Harun, between Musa and Samiri, and Musa's destruction of the calf are preserved in detail. The Quran's repeated return to the scene suggests that calf-worship is not an ancient historical episode but a recurring pattern: the tendency to replace the invisible divine with a visible, manageable substitute.</p>

  <p>Each retelling adds texture. Al-Araf (7:148-152) emphasizes the people's remorse and repentance — the calf scene is also a scene of return. An-Nisa (4:153) shows the calf as part of a larger sequence of demands from Bani Isra'il. The Quran does not present them as irredeemably lost but as a people whose oscillation between covenant and departure is precisely the human condition under prophetic guidance — seen most clearly because most documented.</p>

  <h3>The sea: rescue that could not be undone</h3>
  <p>The sea crossing in Al-Baqarah (2:50), Al-Araf (7:138), Yunus (10:90-92), Ta-Ha (20:77-80), and Ad-Dukhan (44:17-33) is one of the Quran's most repeated miracles — and in each telling, the Quran pivots quickly to what followed. Yunus (10:90-92) gives the most striking case: Firaun's last-moment acknowledgment — <em>I believe that there is no god but He in whom the Children of Israel believe</em> — is met with divine refusal: <em>Now? When you disobeyed before and were among the corrupters?</em> The sea is left as a preserved body so that others might take heed.</p>

  <p>The pattern in all the crossing accounts: rescue accomplished, then Al-Araf (7:138) gives the immediate aftermath: Bani Isra'il encounter a people devoted to idols and ask Musa to make them a god like those they have. The sea behind them; the demand for a calf ahead. The crossing that could not be undone in the external world had not yet been completed in the heart. The Quran's theology of rescue insists that the miracle of deliverance creates responsibility, not guarantee.</p>
</div>`,
},

}

async function main() {
  console.log('=== Upserting hub syntheses for 12 entities ===\n')

  for (const [entitySlug, { articleCount, html }] of Object.entries(syntheses)) {
    const { data: entity } = await supabase
      .from('entities')
      .select('id')
      .eq('slug', entitySlug)
      .single()

    if (!entity) {
      console.warn(`⚠️  Entity not found: ${entitySlug}`)
      continue
    }

    const contentHash = `${entitySlug}-${articleCount}-articles-v1`

    const { error } = await supabase
      .from('hub_synthesis_cache')
      .upsert({
        entity_id: entity.id,
        synthesis_html: html.trim(),
        content_hash: contentHash,
        last_generated_at: new Date().toISOString(),
      }, { onConflict: 'entity_id' })

    if (error) {
      console.error(`❌ Synthesis upsert failed for ${entitySlug}:`, error.message)
    } else {
      console.log(`✅ Synthesis upserted: ${entitySlug} (${articleCount} articles)`)
    }
  }

  console.log('\nDone.')
}

main().catch(console.error)
