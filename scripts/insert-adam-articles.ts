#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ADAM_ENTITY_ID = '68c432ec-afed-46ce-8a95-5fc97deb11cc'
const IBLIS_ENTITY_ID = '6647d520-3558-4ff2-882e-c85a706b1c47'

const articles = [
  {
    title: "The Naming That Changed Everything",
    slug: "the-naming-that-changed-everything",
    type: 'article' as const,
    excerpt: "Allah taught Adam the names — all of them. The angels could not. This single capacity — naming — is the fulcrum on which the entire human story turns.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['adam', 'quranic-characters', 'linguistic-analysis'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Before Adam takes a single step, before the garden, before the tree, before the descent — the Quran establishes one event as the foundation of his story. Allah teaches him the names. All of them. The angels are asked to produce these names and cannot. Adam is asked and does. This exchange, compressed into a few ayahs of Surah Al-Baqarah, is the hinge on which the entire narrative of human existence turns.</p>

  <h2>The Angelic Objection</h2>

  <p>The sequence begins with a divine announcement — and an immediate response:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ</p>
    <p class="translation">"And when your Lord said to the angels: 'I am placing on the earth a khalifah.' They said: 'Will You place therein one who will cause corruption and shed blood, while we glorify Your praise and sanctify You?'"</p>
    <cite>Surah Al-Baqarah (2:30)</cite>
  </blockquote>

  <p>The word <strong>khalifah</strong> — often translated as "vicegerent" or "successor" — carries the root <strong>kh-l-f</strong>, which means to come after, to succeed, to stand in place of. The Quran does not say Adam will be placed on earth as a worshipper or as a servant. The designation is <strong>khalifah</strong>: one who exercises a delegated role. The angels hear this and project forward. They see corruption — <strong>yufsidu</strong> — and bloodshed — <strong>yasfiku ad-dima'</strong>. Their projection is accurate. Humans will do both of these things. The angels are correct about the data.</p>

  <p>Their follow-up — <strong>wa nahnu nusabbihu bi-hamdika wa nuqaddisu laka</strong> — "while we glorify Your praise and sanctify You" — positions their own worship as the alternative. We already do the job. We glorify without corrupting. We sanctify without shedding blood. The implied argument: why create a being that will fail at what we already accomplish?</p>

  <p>The divine response does not address their objection. It does not argue. It does not explain why corruption and blood are part of the design. It says:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ</p>
    <p class="translation">"He said: 'I know what you do not know.'"</p>
    <cite>Surah Al-Baqarah (2:30)</cite>
  </blockquote>

  <p>Seven words. The objection receives no refutation — only an assertion of a knowledge differential. What follows is not an argument but a demonstration.</p>

  <h2>The Teaching</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا ثُمَّ عَرَضَهُمْ عَلَى الْمَلَائِكَةِ فَقَالَ أَنبِئُونِي بِأَسْمَاءِ هَـٰؤُلَاءِ إِن كُنتُمْ صَادِقِينَ</p>
    <p class="translation">"And He taught Adam the names — all of them. Then He presented them to the angels and said: 'Inform Me of the names of these, if you are truthful.'"</p>
    <cite>Surah Al-Baqarah (2:31)</cite>
  </blockquote>

  <p>The verb is <strong>'allama</strong> — He taught. The root <strong>'-l-m</strong> is the root of <strong>'ilm</strong>, knowledge. The teaching is direct, from Allah to Adam, with no intermediary. And the object of the teaching is <strong>al-asma'a kullaha</strong> — the names, all of them. <strong>Kullaha</strong> is emphatic: not some names, not a selection, but the entirety.</p>

  <p>What are "the names"? The Quran does not specify. Classical commentators offered possibilities: the names of all created things, the names of the angels, the names of Adam's descendants, the names and natures of everything that exists. The deliberate non-specification is itself meaningful. The Quran establishes the capacity for naming as the defining human gift without limiting what that capacity covers.</p>

  <p>The pronoun shift in the ayah is significant. <strong>'Allamahu</strong> — "He taught him" — uses the singular. <strong>'Aradahum</strong> — "He presented them" — shifts to a plural pronoun. The things named are <strong>hum</strong>, "them" — a pronoun used for rational beings. Whatever Adam was taught to name, the Quran grants them the pronoun reserved for beings with consciousness. The naming creates a relationship — between the namer and the named — that is personal, not taxonomic.</p>

  <h2>The Angelic Admission</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا ۖ إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ</p>
    <p class="translation">"They said: 'Glory be to You! We have no knowledge except what You have taught us. You are the All-Knowing, the All-Wise.'"</p>
    <cite>Surah Al-Baqarah (2:32)</cite>
  </blockquote>

  <p>The angels begin with <strong>subhanaka</strong> — glory be to You — a word that carries the root <strong>s-b-h</strong>, which in its physical sense means to swim, to move through a medium. <strong>Tasbih</strong> is movement through praise the way swimming is movement through water. The angels' response to their own limitation is not shame but worship. They cannot name. They acknowledge it. And their acknowledgment is itself an act of the glorification they cited as their qualification moments earlier.</p>

  <p><strong>La 'ilma lana illa ma 'allamtana</strong> — "we have no knowledge except what You have taught us." The construction is precise. The angels do not claim ignorance. They claim bounded knowledge — knowledge limited to what has been given. Their knowledge is received, not generated. They can worship, they can obey, they can glorify — but they cannot produce new knowledge. They cannot name what they have not been taught to name.</p>

  <p>Adam can. This is the difference the demonstration reveals. The human capacity is not worship — the angels worship with greater consistency. The human capacity is the generation of knowledge: naming, categorizing, understanding, discovering relationships between things. The <strong>khalifah</strong> designation makes sense now — not as a reward for obedience but as a role that requires a capability the angels do not possess.</p>

  <h2>The Prostration and the Refusal</h2>

  <p>Immediately after the naming demonstration, the command comes:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ أَبَىٰ وَاسْتَكْبَرَ وَكَانَ مِنَ الْكَافِرِينَ</p>
    <p class="translation">"And when We said to the angels: 'Prostrate to Adam,' they prostrated — except Iblis. He refused and was arrogant, and he was of the disbelievers."</p>
    <cite>Surah Al-Baqarah (2:34)</cite>
  </blockquote>

  <p>Three verbs describe Iblis in rapid sequence. <strong>Aba</strong> — he refused. The root <strong>a-b-y</strong> is categorical refusal, not hesitation. <strong>Istakbara</strong> — he considered himself greater. The <strong>istaf'ala</strong> form indicates self-assessment: he actively constructed a judgment of his own superiority. <strong>Wa kana min al-kafirin</strong> — "and he was of the disbelievers." The verb <strong>kana</strong> — "he was" — places the disbelief as a pre-existing state, not a consequence of the refusal. The refusal revealed something already present.</p>

  <p>The angels, who moments ago could not name, prostrate without hesitation. Their inability to name does not become a source of resentment. Iblis, who presumably also witnessed the naming demonstration, converts the evidence into a grievance. The same event — Adam's capacity — produces submission in the angels and rebellion in Iblis. The data is identical. The responses diverge entirely.</p>

  <h2>The Weight of a Name</h2>

  <p>The capacity to name is the capacity to understand — to perceive a thing, distinguish it from other things, and assign it a place in a web of meaning. Every name is an act of comprehension. Every act of comprehension is an act of relationship: the namer acknowledges the existence and distinctness of what is named.</p>

  <p>This capacity carries its own risk. The one who names can also misname. The one who categorizes can miscategorize. The one who builds systems of meaning can build false ones. <strong>Yufsidu fiha wa yasfiku ad-dima'</strong> — the angels' prediction — is the shadow side of the naming gift. Corruption and bloodshed are possible precisely because the creature who can name reality can also construct alternative realities — ideologies, justifications, hierarchies — that depart from what is true.</p>

  <p>The Quran holds both together. The naming is a gift and a test. The <strong>khalifah</strong> is honored and accountable. The capacity that makes humans capable of knowledge also makes them capable of its corruption. The angels saw only the corruption. Allah saw the whole picture — the naming and the misnaming, the knowledge and the accountability, the descent and the return. <strong>Inni a'lamu ma la ta'lamun</strong>. I know what you do not know.</p>
</article>`
  },
  {
    title: "The First Descent: Architecture, Not Punishment",
    slug: "the-first-descent-architecture-not-punishment",
    type: 'article' as const,
    excerpt: "Adam and his wife eat from the tree, their coverings fall away, and they are told to descend. The Quran frames this not as exile but as the commencement of the role they were created for.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['adam', 'quranic-characters', 'tawbah'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran tells the story of Adam's departure from the Garden across multiple surahs — Al-Baqarah, Al-A'raf, Taha. Each retelling adds a dimension the others leave implicit. Read together, they compose a picture that resists the category of "fall" as the Western tradition frames it. Adam descends. But the descent is the beginning of the plan, not the failure of one.</p>

  <h2>The Approach</h2>

  <p>The prohibition is stated cleanly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَا تَقْرَبَا هَـٰذِهِ الشَّجَرَةَ فَتَكُونَا مِنَ الظَّالِمِينَ</p>
    <p class="translation">"And do not approach this tree, lest you be among the wrongdoers."</p>
    <cite>Surah Al-Baqarah (2:35)</cite>
  </blockquote>

  <p>The verb is <strong>la taqraba</strong> — do not approach — not "do not eat from." The root <strong>q-r-b</strong> means to come near, to draw close. The prohibition operates at the level of proximity, not consumption. The boundary is spatial before it is behavioral. This is a recurring Quranic structure: <strong>la taqrabu az-zina</strong>, do not approach adultery; <strong>la taqrabu mal al-yatim</strong>, do not approach the orphan's wealth. The Quran frequently prohibits the approach rather than the act — which means the act is understood as the natural consequence of the approach. The real decision happens earlier than the moment of transgression.</p>

  <p>The consequence named is <strong>fa-takuna min adh-dhalimin</strong> — "lest you be among the wrongdoers." The root <strong>dh-l-m</strong> means to place something where it does not belong. <strong>Dhulm</strong> is displacement, misplacement. Eating from the tree would be an act of putting themselves in the wrong category — among the <strong>dhalimin</strong>, those who violate the proper order of things.</p>

  <h2>The Whisper</h2>

  <p>In Surah Taha, the mechanism of the transgression is specified:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَوَسْوَسَ إِلَيْهِ الشَّيْطَانُ قَالَ يَا آدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ</p>
    <p class="translation">"Then Shaytan whispered to him. He said: 'O Adam, shall I direct you to the tree of eternity and a kingdom that does not decay?'"</p>
    <cite>Surah Taha (20:120)</cite>
  </blockquote>

  <p>The verb <strong>waswasa</strong> — reduplicated from the root <strong>w-s-w-s</strong> — is onomatopoeic. The doubled syllable mimics the sound of a persistent whisper, a rustling that does not stop. The whisper offers two things: <strong>shajarat al-khuld</strong>, the tree of eternity, and <strong>mulk la yabla</strong>, a kingdom that does not decay. Both offers target impermanence. The whisper reads Adam's situation — you are in a garden, but gardens end; you have a role, but roles expire — and offers an escape from temporality itself.</p>

  <p>The precision of the temptation is striking. Shaytan does not offer pleasure or power for its own sake. He offers permanence — <strong>khuld</strong> and <strong>mulk la yabla</strong>. The lure is framed as a solution to a problem Adam may not yet have articulated: the anxiety of finitude. The whisper creates the problem and offers the solution in the same sentence.</p>

  <h2>The Exposure</h2>

  <p>The consequence arrives immediately:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَكَلَا مِنْهَا فَبَدَتْ لَهُمَا سَوْآتُهُمَا وَطَفِقَا يَخْصِفَانِ عَلَيْهِمَا مِن وَرَقِ الْجَنَّةِ</p>
    <p class="translation">"So they both ate from it, and their private parts became apparent to them, and they began to fasten over themselves from the leaves of the Garden."</p>
    <cite>Surah Taha (20:121)</cite>
  </blockquote>

  <p>The word <strong>saw'at</strong> — private parts, nakedness — comes from the root <strong>s-w-'</strong>, which means badness, ugliness, that which one is ashamed of. The transgression does not produce pain or punishment. It produces exposure — <strong>badat</strong>, it became visible. Something that was covered becomes uncovered. The first consequence of exceeding the boundary is the loss of a covering they did not know they had.</p>

  <p><strong>Tafiqah yakhsifani</strong> — "they began fastening" — the verb <strong>khasafa</strong> means to stitch, to layer one thing over another. They improvise covering from <strong>waraq al-jannah</strong>, the leaves of the Garden. The first human craft is a response to exposure. The first act of making is an act of covering. Before agriculture, before architecture, before any technology the Quran will later describe — the first thing humans build is a garment.</p>

  <p>In Surah Al-A'raf, the Quran expands on this with an explicit principle:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">يَا بَنِي آدَمَ قَدْ أَنزَلْنَا عَلَيْكُمْ لِبَاسًا يُوَارِي سَوْآتِكُمْ وَرِيشًا ۖ وَلِبَاسُ التَّقْوَىٰ ذَٰلِكَ خَيْرٌ</p>
    <p class="translation">"O children of Adam, We have sent down to you clothing to conceal your private parts and as adornment. But the clothing of taqwa — that is best."</p>
    <cite>Surah Al-A'raf (7:26)</cite>
  </blockquote>

  <p>The phrase <strong>libas at-taqwa</strong> — the clothing of taqwa — maps the physical experience onto a spiritual architecture. Just as the body requires covering after exposure, the soul requires <strong>taqwa</strong> — consciousness of Allah, protective awareness — as its garment. The Garden narrative is being read, in real time within the text, as a template for understanding the human condition on earth. The exposure in the Garden is not a historical accident. It is the prototype of every exposure that follows.</p>

  <h2>The Command to Descend</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قُلْنَا اهْبِطُوا مِنْهَا جَمِيعًا ۖ فَإِمَّا يَأْتِيَنَّكُم مِّنِّي هُدًى فَمَن تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ</p>
    <p class="translation">"We said: 'Descend from it, all of you. And when guidance comes to you from Me, whoever follows My guidance — there will be no fear upon them, nor will they grieve.'"</p>
    <cite>Surah Al-Baqarah (2:38)</cite>
  </blockquote>

  <p>The verb <strong>ihbitu</strong> — "descend" — carries the root <strong>h-b-t</strong>, which means to go down, to come down from a higher place. But the ayah does not end with the descent. It continues with a conditional: <strong>fa-imma ya'tiyannakum minni hudan</strong> — "when guidance comes to you from Me." The descent includes a provision. Guidance will follow them down. The earth is not a place without access to divine direction — it is the place where that direction arrives in a new form.</p>

  <p>The phrase <strong>fa-la khawfun 'alayhim wa la hum yahzanun</strong> — "no fear upon them and they will not grieve" — appears dozens of times across the Quran. It becomes the marker of the successful human life. And its first appearance is here, in the context of the descent. The promise is made at the moment of departure from the Garden: the earth is habitable, the guidance is coming, and the door to fearlessness and freedom from grief is open.</p>

  <p>This framing resists any reading of the descent as pure punishment. The khalifah was always meant for the earth — <strong>inni ja'ilun fil-ardi khalifah</strong>. The Garden was a staging ground, a preparation, a place where the human encountered both the prohibition and the whisper, both obedience and transgression, so that the descent to earth would carry the full weight of experience. Adam arrives on earth having already learned what it means to exceed a boundary, what it feels like to be exposed, and how to turn back.</p>

  <h2>The Design</h2>

  <p>The Quranic Adam does not carry original sin. The concept does not exist in the text. Adam transgresses, Adam repents, Adam is forgiven — and the sequence completes. The descent is not a continuation of the punishment. It is the commencement of the assignment. <strong>Khalifah</strong> was the word used before the tree, before the whisper, before any event in the Garden. The role precedes the test. The earth was always the destination.</p>

  <p>The Garden, in this reading, is part of the curriculum. It teaches what the earth will require: boundaries exist; whispers target real anxieties; transgression produces exposure; and the way back — through the words Adam will receive — is always available. The architecture is educational, not penal. Adam descends not as a convict but as a graduate — carrying exactly the experience the khalifah role demands.</p>
</article>`
  },
  {
    title: "Adam's Prayer: The First Words of Return",
    slug: "adams-prayer-the-first-words-of-return",
    type: 'article' as const,
    excerpt: "After the tree, Adam receives words from his Lord and speaks them. These words — rabbana dhalamna anfusana — become the template for every human return. The first prayer in the Quran is a prayer of repentance.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['adam', 'quranic-characters', 'tawbah', 'dua'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">After the tree and the exposure and the frantic stitching of leaves, the Quran records a moment that changes the trajectory of the entire narrative. Adam receives words. He speaks them. And those words — specific, preserved, available for recitation — become the first prayer in the Quran. What he says, and how the Quran frames the fact that he says it, establishes the architecture of <strong>tawbah</strong> for every generation that follows.</p>

  <h2>The Reception</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ كَلِمَاتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ</p>
    <p class="translation">"Then Adam received from his Lord words, and He turned to him in forgiveness. Indeed, He is the Oft-Returning, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:37)</cite>
  </blockquote>

  <p>The verb <strong>talaqqah</strong> — "he received" — is in the <strong>tafa''ala</strong> form, which indicates active reception. Adam did not passively hear words float toward him. He reached for them, took them in, made them his own. The <strong>tafa''ala</strong> form implies effort on the part of the receiver — the way a student receives a lesson, not the way a surface receives rain. Adam had to be ready for the words. The receiving was an act.</p>

  <p>The source is <strong>min rabbihi</strong> — "from his Lord." The relationship named here is <strong>rabb</strong>, the sustainer, the one who nurtures and develops. At the moment when Adam has transgressed, the Quran identifies Allah through the name that carries care: the Lord who raises, who feeds, who brings to maturity. The nurturer provides the words of return to the one who strayed.</p>

  <p>And then: <strong>fa-taba 'alayhi</strong> — "He turned to him." The root <strong>t-w-b</strong> means to turn, to return. When used for the human, it means repentance — turning back to Allah. When used for Allah, it means acceptance — turning toward the one who repents. The same root, two directions. Adam turns. Allah turns. The meeting point is <strong>tawbah</strong>.</p>

  <p>The ayah closes with two names: <strong>at-Tawwab ar-Rahim</strong>. <strong>Tawwab</strong> is the intensive form — the One who turns again and again, who accepts return repeatedly, whose nature is to receive the returning. <strong>Rahim</strong> — the Merciful — carries the root <strong>r-h-m</strong>, which means womb. Mercy in Arabic is etymologically rooted in the place of origin, the first shelter. The names chosen for this moment are the names of return and shelter — precisely what Adam needs after the exposure.</p>

  <h2>The Words</h2>

  <p>Surah Al-A'raf preserves what Adam said:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ</p>
    <p class="translation">"They said: 'Our Lord, we have wronged ourselves. And if You do not forgive us and have mercy upon us, we will surely be among the losers.'"</p>
    <cite>Surah Al-A'raf (7:23)</cite>
  </blockquote>

  <p>The prayer has three movements. Each one repays close attention.</p>

  <p><strong>Rabbana dhalamna anfusana</strong> — "Our Lord, we have wronged ourselves." The verb is <strong>dhalamna</strong>, from the root <strong>dh-l-m</strong> — to place something where it does not belong. They have misplaced themselves. The object of the wronging is <strong>anfusana</strong> — "ourselves." They do not say they wronged Allah, or wronged the Garden, or wronged creation. They wronged themselves. The transgression is understood as self-harm. The boundary existed for their protection; crossing it damaged them.</p>

  <p>This framing — sin as self-harm rather than offense against a deity who needs appeasement — runs throughout the Quran. When humans transgress, the Quran consistently frames the damage as reflexive: they harm themselves. Allah is not diminished by disobedience. The creation is.</p>

  <p><strong>Wa in lam taghfir lana wa tarhamna</strong> — "And if You do not forgive us and have mercy on us." The verb <strong>taghfir</strong> comes from the root <strong>gh-f-r</strong>, which means to cover, to conceal, to protect. The Arabic word for helmet — <strong>mighfar</strong> — shares this root. Forgiveness in Arabic is an act of covering — the same covering they lost when they ate from the tree. They were exposed; they ask to be covered again. The linguistic circle closes: the consequence was exposure, the remedy is a covering that comes from Allah rather than from leaves.</p>

  <p><strong>La-nakunanna min al-khasirin</strong> — "we will surely be among the losers." The root <strong>kh-s-r</strong> means to lose, to suffer loss in trade. <strong>Khasirin</strong> are those whose transaction resulted in net loss. The prayer ends with an economic metaphor: without forgiveness, the entire venture — the naming, the garden, the descent — results in loss. The human project becomes a failed investment. The prayer acknowledges that the outcome depends entirely on divine response.</p>

  <h2>Contrast: What Iblis Said</h2>

  <p>The Quran places Iblis's response to the same situation — being confronted with his transgression — in direct comparison. When asked why he did not prostrate, Iblis says:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ أَنَا خَيْرٌ مِّنْهُ ۖ خَلَقْتَنِي مِن نَّارٍ وَخَلَقْتَهُ مِن طِينٍ</p>
    <p class="translation">"He said: 'I am better than him. You created me from fire and created him from clay.'"</p>
    <cite>Surah Al-A'raf (7:12)</cite>
  </blockquote>

  <p>Both Adam and Iblis face the same structural moment: a transgression and a divine confrontation. Adam says <strong>rabbana dhalamna anfusana</strong> — we wronged ourselves. Iblis says <strong>ana khayrun minhu</strong> — I am better than him. Adam takes responsibility and asks for help. Iblis assigns blame to the divine decree itself — You made me from fire, You made him from clay — and constructs a logical argument for why his refusal was justified.</p>

  <p>The contrast is total. One says: I wronged myself. The other says: I am right and the system is wrong. One asks for covering. The other demands vindication. One acknowledges dependency — <strong>in lam taghfir lana</strong>, if You do not forgive us. The other asserts independence — <strong>la-uqbidanna</strong>, I will lie in wait (7:16). Adam's prayer ends with a conditional: if You do not help us, we are lost. Iblis's statement ends with a declaration: I will operate on my own terms.</p>

  <p>The Quran presents these two responses as the template. Every human moment of transgression contains both possibilities: the Adamic response (acknowledgment, request, return) and the Iblisian response (justification, argument, persistence). The prayer Adam received is available. The alternative is also available. The descent to earth carries both options.</p>

  <h2>The Template That Persists</h2>

  <p>Adam's prayer reappears, in spirit if not in exact wording, throughout the Quran. Musa, after killing a man accidentally, says: <strong>rabbi inni dhalamtu nafsi fa-ghfir li</strong> — "My Lord, I have wronged myself, so forgive me" (28:16). Yunus, in the belly of the whale: <strong>la ilaha illa anta subhanaka inni kuntu min adh-dhalimin</strong> — "There is no deity except You, glory be to You, I was among the wrongdoers" (21:87). The vocabulary of Adam's prayer — <strong>dhulm</strong>, <strong>maghfirah</strong>, <strong>rahma</strong> — becomes the shared language of prophetic return.</p>

  <p>The words Adam received are not locked in the past. They are <strong>kalimat</strong> — words — given once and available always. The first prayer taught by Allah to a human is a prayer of return. Before the law, before the prophets of legislation, before the detailed prescriptions of how to live — the first thing taught is how to come back after going astray. The architecture of return precedes the architecture of everything else.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Adam articles...')

  for (const article of articles) {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert(article)
      .select('id, title, slug')
      .single()

    if (postError) {
      console.error(`Failed to insert "${article.title}":`, postError.message)
      continue
    }
    console.log(`✓ Inserted: "${post.title}"`)

    // Primary tag: Adam
    const { error: tagError } = await supabase.from('entity_tags').insert({
      post_id: post.id,
      entity_id: ADAM_ENTITY_ID,
      is_primary: true,
    })
    if (tagError) console.error(`  Tag error (adam):`, tagError.message)
    else console.log(`  ✓ Tagged: adam (primary)`)

    // Secondary tag: Iblis (for prayer article)
    if (article.slug.includes('prayer')) {
      const { error: iblisTagError } = await supabase.from('entity_tags').insert({
        post_id: post.id,
        entity_id: IBLIS_ENTITY_ID,
        is_primary: false,
      })
      if (iblisTagError) console.error(`  Tag error (iblis):`, iblisTagError.message)
      else console.log(`  ✓ Tagged: iblis (secondary)`)
    }
  }

  // Refresh co-occurrence
  console.log('\nRefreshing entity co-occurrence...')
  const { error: refreshError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (refreshError) console.error('Refresh error:', refreshError.message)
  else console.log('✓ Co-occurrence graph refreshed')

  console.log('\nDone! Inserted', articles.length, 'Adam articles.')
}

main().catch(console.error)
