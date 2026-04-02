#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const MUSA_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'
const FIRAUN_ID = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861'
const HARUN_ID = '4319881e-8d55-4afe-8d2c-bf583e5dc8b2'
const BANI_ISRA_IL_ID = '34369167-dbaf-427a-abb1-a063633be1a3'
const SABR_ID = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49'
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a'
const DAWAH_ID = 'cb4621d9-fbd2-4acf-a13a-d5a9b645677c'

type EntityTag = { entity_id: string; is_primary: boolean }

const articles: Array<{
  title: string
  slug: string
  excerpt: string
  seo_title: string
  seo_description: string
  content_html: string
  reading_time_minutes: number
  tags: string[]
  entity_tags: EntityTag[]
}> = [
  // ─── ARTICLE 1 ────────────────────────────────────────────────────────────
  {
    title: "The First Conversation: Musa at the Burning Bush",
    slug: "musa-burning-bush-first-conversation",
    excerpt: "Musa arrives at a fire expecting warmth. What he encounters instead is a sequence of three divine actions — address, self-disclosure, instruction — that will define every prophetic call in the Quran.",
    seo_title: "Musa at the Burning Bush: The Quranic Account of the First Prophetic Call",
    seo_description: "A close reading of Surah Taha 20:11-14 and Al-Qasas 28:30. Three things happen when Musa arrives at the bush: Allah calls him by name, announces His identity, and gives an instruction.",
    reading_time_minutes: 11,
    tags: ['musa', 'quranic-characters', 'prophets', 'taha', 'tawakkul', 'dawah'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: TAWAKKUL_ID, is_primary: false },
      { entity_id: DAWAH_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">He is looking for fire. The detail matters: Musa notices light from a distance — <strong>ānasta nāran</strong>, "he perceived a fire" — and his reason for approaching is practical. He wants warmth. He wants something to bring back to his family. He is a shepherd in a foreign land who has been living in exile for years. He is not on a spiritual retreat. He is not seeking revelation. He approaches the burning bush as a man who is cold and who has seen a way to fix that.</p>

  <p>The Quran tells this scene twice at length — once in Surah Taha and once in Surah Al-Qasas — and in each telling, what happens to Musa at the bush follows the same three-part structure: he is called by name, Allah announces His identity, and Musa is given an instruction before he can respond. The instruction in each telling is small and physical. Remove your sandals. The call is everything.</p>

  <h2>The Three Moments of the Call</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا أَتَاهَا نُودِيَ يَا مُوسَىٰ ۝ إِنِّي أَنَا رَبُّكَ فَاخْلَعْ نَعْلَيْكَ ۖ إِنَّكَ بِالْوَادِ الْمُقَدَّسِ طُوًى ۝ وَأَنَا اخْتَرْتُكَ فَاسْتَمِعْ لِمَا يُوحَىٰ ۝ إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي</p>
    <p class="translation">"When he came to it, he was called: O Musa — Indeed I am your Lord, so remove your sandals. You are in the sacred valley of Tuwa. And I have chosen you, so listen to what is revealed. Indeed, I am Allah. There is no god except Me, so worship Me and establish prayer for My remembrance."</p>
    <cite>Surah Taha (20:11-14)</cite>
  </blockquote>

  <p>Four ayahs. Four discrete movements. <strong>Nūdiya yā Mūsā</strong> — "he was called: O Musa." The passive construction is significant: the verb <strong>nūdiya</strong> is passive, placing Musa in the position of receiver before anything else is established. Something is calling. Before the identity of the caller is disclosed, before Musa knows what is happening, his name is spoken. The most intimate address — direct name, direct call — arrives before explanation.</p>

  <p>Then: <strong>innī anā rabbuka</strong> — "Indeed I am your Lord." The double affirmation — <strong>innī anā</strong>, literally "indeed I, I" — is emphatic in Arabic in a way that English translations struggle to render. This is not a casual identification. It is a declaration that carries the weight of everything that follows. And notice that the instruction comes immediately, before Musa has processed the declaration: <strong>fakhla' na'layk</strong> — "remove your sandals." The first demand of the prophetic relationship is not theological recitation. It is a physical act of orientation. Remove what separates your feet from the sacred ground. Stand here as you are, unmediated.</p>

  <p>The third movement: <strong>wa anā ikhtartuka</strong> — "and I have chosen you." The verb <strong>ikhtāra</strong> — from <strong>kh-y-r</strong>, the root of goodness, of choice, of what is best — means to select from among options. The form here is the eighth pattern, <strong>iftā'ala</strong>, which in Arabic adds a nuance of deliberateness to the action. This was a considered choice. Musa did not volunteer. He was selected. And the instruction that follows the selection — <strong>fastami' limā yūhā</strong>, "so listen to what is revealed" — tells him exactly what his response should be: not questions, not objections, not credentials. Listen.</p>

  <p>The fourth movement is the announcement that everything before it was building toward: <strong>innanī anā Allāhu lā ilāha illā anā</strong> — "Indeed I am Allah. There is no god except Me." This is the first commandment. It arrives not as doctrine but as direct speech. Then worship. Then prayer. And the reason for the prayer: <strong>lidhikrī</strong> — "for My remembrance." The entire structure of religious practice — worship, prayer, the regular return of the heart — is rooted in a single purpose. Memory. Do not forget this moment. The prayer is the mechanism that ensures you don't.</p>

  <h2>The Version in Al-Qasas</h2>

  <p>Surah Al-Qasas tells the same event with a different emphasis:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا أَتَاهَا نُودِيَ مِن شَاطِئِ الْوَادِ الْأَيْمَنِ فِي الْبُقْعَةِ الْمُبَارَكَةِ مِنَ الشَّجَرَةِ أَن يَا مُوسَىٰ إِنِّي أَنَا اللَّهُ رَبُّ الْعَالَمِينَ</p>
    <p class="translation">"When he came to it, he was called from the right side of the valley in the blessed spot — from the tree — O Musa, indeed I am Allah, Lord of the worlds."</p>
    <cite>Surah Al-Qasas (28:30)</cite>
  </blockquote>

  <p>Where Surah Taha gives the content of the call in four compressed movements, Al-Qasas gives the geography. <strong>Min shāti' il-wādi il-ayman</strong> — "from the right bank of the valley." <strong>Fil-buq'ati il-mubāraka</strong> — "in the blessed spot." <strong>Mina al-shajara</strong> — "from the tree." Three locational details that Taha omits entirely. Two tellings of the same moment, each emphasizing what the other withholds. This is not inconsistency. It is the Quran's way of insisting that the event exceeds any single account of it.</p>

  <p>Al-Qasas also identifies Allah differently here: not <strong>rabbuka</strong> (your Lord) but <strong>rabb al-'ālamīn</strong> — "Lord of the worlds." Surah Taha addresses Musa personally. Al-Qasas situates the call within a cosmic frame. The same moment contains both registers simultaneously: this is personal — your Lord — and it is universal — Lord of everything that exists.</p>

  <h2>What Musa Was Before the Bush</h2>

  <p>The Quran is deliberate about what precedes the burning bush. In Al-Qasas, the call comes after ten years of shepherding in Madyan after a decade of exile, marriage to Shu'ayb's daughter, and a decision to return to Egypt. He is a man with obligations — his family is with him when he sees the fire. He is traveling. He is not fasting or in spiritual retreat. He has not earned the call through a discipline. He approaches the bush as a working man looking for heat.</p>

  <p>This is the Quran's consistent pattern for prophetic calling: the recipient is never waiting for it. Ibrahim is building a city when the command to leave comes. Muhammad ﷺ is in retreat in a cave, but the retreat is from social disillusionment, not expectation of revelation. Musa is warming his hands. The call arrives before the person is ready, because the calling precedes the readiness. The station is built through the response to the call, not before it.</p>

  <h2>The Request That Follows</h2>

  <p>Musa's response to the commission — go to Firaun — is not immediate compliance. He asks for help:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي</p>
    <p class="translation">"My Lord, expand for me my chest. And ease for me my task. And untie the knot from my tongue so they may understand my speech."</p>
    <cite>Surah Taha (20:25-28)</cite>
  </blockquote>

  <p><strong>Ishrah lī sadrī</strong> — "expand for me my chest." <strong>Sharh</strong> from the root <strong>sh-r-h</strong>: to open, to spread out, to explain. The chest here is the seat of understanding and courage — what in Arabic is the site of both fear and resolve. Musa asks for it to be opened. He is not ashamed of the request. He knows what Firaun represents and he knows his own limitations. He asks Allah to compensate for the gap between what is required and what he currently carries.</p>

  <p><strong>Wa yassir lī amrī</strong> — "and ease for me my task." Then the specific: <strong>wahlul 'uqdatan min lisānī</strong> — "untie the knot from my tongue." The word <strong>'uqda</strong> is a knot — a physical entanglement. Musa's speech impediment is described as something tied, not something broken. A knot can be loosened. He does not ask for a new tongue. He asks for the existing one to be freed.</p>

  <p>The purpose is precise: <strong>yafqahū qawlī</strong> — "so they may understand my speech." The goal is comprehension in the listener, not eloquence in the speaker. Musa does not ask to speak beautifully. He asks to be understood. The distinction is theological: the prophetic mission is not about the messenger's eloquence. It is about the message reaching the receiver.</p>

  <h2>The Fire That Became a Conversation</h2>

  <p>The burning bush is the Quran's most concentrated image of divine encounter — more immediate than Ibrahim's fire, more sustained than the dream-revelation given to Yusuf, more direct than the gradual revelation to Muhammad ﷺ over twenty-three years. Musa hears a voice. He stands on sacred ground with his sandals in his hand. He learns who is speaking. He receives his mission. He asks for help.</p>

  <p>He was looking for warmth. He found the source of it.</p>
</article>`,
  },

  // ─── ARTICLE 2 ────────────────────────────────────────────────────────────
  {
    title: "Staff and Sea: The Two Objects Musa Couldn't Put Down",
    slug: "musa-staff-and-sea",
    excerpt: "Allah asks Musa what is in his right hand — an odd question from one who knows. The answer takes five words and reveals everything about how ordinary objects become instruments of divine action.",
    seo_title: "The Staff of Musa in the Quran: Divine Action Through Ordinary Objects",
    seo_description: "Allah asks Musa what is in his right hand. The staff transforms, becomes a serpent, and eventually splits the sea. A study of how the Quran works through ordinary objects.",
    reading_time_minutes: 10,
    tags: ['musa', 'quranic-characters', 'prophets', 'taha', 'ash-shuara', 'tawakkul'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: BANI_ISRA_IL_ID, is_primary: false },
      { entity_id: TAWAKKUL_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The staff was already in his hand. He had been carrying it for years — leaning on it, herding sheep with it, doing the undramatic work of a shepherd in the hills of Madyan. When Allah asks <strong>wa mā tilka biyamīnika yā Mūsā</strong> — "and what is that in your right hand, O Musa?" — the question is not for information. It is an invitation to narrate the ordinary. To describe what you already hold. The answer Musa gives is longer than a simple answer needs to be, and that excess is the point.</p>

  <h2>The Question and the Answer</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَمَا تِلْكَ بِيَمِينِكَ يَا مُوسَىٰ ۝ قَالَ هِيَ عَصَايَ أَتَوَكَّأُ عَلَيْهَا وَأَهُشُّ بِهَا عَلَىٰ غَنَمِي وَلِيَ فِيهَا مَآرِبُ أُخْرَىٰ</p>
    <p class="translation">"And what is that in your right hand, O Musa? He said: It is my staff. I lean on it, and I beat down leaves for my sheep, and I have other uses for it."</p>
    <cite>Surah Taha (20:17-18)</cite>
  </blockquote>

  <p>The question calls for one word: staff. Musa gives a sentence and a half. <strong>Hiya 'asāya</strong> — "it is my staff." Fine. But then: <strong>atawakka'u 'alayhā</strong> — "I lean on it." Then: <strong>wa ahushu bihā 'alā ghanamī</strong> — "and I beat down leaves for my sheep." Then: <strong>wa liya fīhā ma'āribu ukhrā</strong> — "and I have other uses for it." The word <strong>ma'ārib</strong> is the plural of <strong>ma'riba</strong>: purposes, uses, needs. <strong>Ukhrā</strong> — other. Musa adds that there are additional purposes beyond the ones he just listed, without specifying what they are.</p>

  <p>Classical commentators read this response as more than description. Musa is attached to the staff. He knows it the way a craftsman knows his tools — the weight, the balance, what it does in each hand. His extended answer is the answer of a man who has not yet understood that the object he is describing is about to become something else entirely. He is giving it its biography before it loses the life it had.</p>

  <p>Allah's response is immediate:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ أَلْقِهَا يَا مُوسَىٰ ۝ فَأَلْقَاهَا فَإِذَا هِيَ حَيَّةٌ تَسْعَىٰ ۝ قَالَ خُذْهَا وَلَا تَخَفْ ۖ سَنُعِيدُهَا سِيرَتَهَا الْأُولَىٰ</p>
    <p class="translation">"He said: Cast it down, O Musa. So he cast it down, and suddenly it was a serpent moving swiftly. He said: Take it and do not fear. We will return it to its former state."</p>
    <cite>Surah Taha (20:19-21)</cite>
  </blockquote>

  <p><strong>Alqihā</strong> — "cast it." One word, imperative, no explanation. <strong>Fa-alqāhā</strong> — "so he cast it." The narrative moves at the same speed as the command. Then: <strong>fa-idhā hiya hayyatun tas'ā</strong> — "and suddenly it was a serpent moving swiftly." The particle <strong>fa-idhā</strong> — "and suddenly, and behold" — is the Quran's marker for a transformation so complete that explanation would only slow it down. The staff is a serpent before the sentence is done.</p>

  <p>Musa fears it. This is confirmed in Surah An-Naml and Surah Al-Qasas: he turns and flees. Allah's instruction — <strong>khudhhā wa lā takhaf</strong>, "take it and do not fear" — comes with a promise: <strong>sanu'īduhā sīratahā al-ūlā</strong>, "We will return it to its former condition." The word <strong>sīra</strong> here — from <strong>s-y-r</strong>, to travel, to go — means manner of being, state, biography. The staff will return to its original biography. Pick it up. It will be what it was.</p>

  <h2>The Object Enters the Court of Firaun</h2>

  <p>The staff that began as a shepherd's tool becomes, in Firaun's court, the instrument through which the contest between truth and power is settled. The magicians of Egypt throw their ropes and staffs. They become serpents — the Quran describes them as <strong>yukhayyal ilayhi min sihrihim</strong>, "it was made to seem to him" — illusion, suggestion, the magic of making things appear to be what they are not. Then Musa's staff swallows them all.</p>

  <p>The distinction the Quran draws between Musa's staff and the magicians' work is not one of scale. It is one of ontology. The magicians produce appearances. Musa's staff produces reality. This is why the magicians themselves fall prostrate when they see it — they recognize immediately that what Musa carries is categorically different from what they do. <strong>Āmannā bi-rabbi Mūsā wa Hārūn</strong> — "We believe in the Lord of Musa and Harun." The serpent that swallows illusion converts the illusionists.</p>

  <h2>The Sea</h2>

  <p>The second great transformation of the staff happens not in a palace but at the water's edge. Firaun's army is behind. The sea is ahead. And Musa receives a command so compressed that the Quran devotes only half a verse to it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ</p>
    <p class="translation">"So We revealed to Musa: Strike the sea with your staff. And it split, and each part was like a great towering mountain."</p>
    <cite>Surah Ash-Shu'ara (26:63)</cite>
  </blockquote>

  <p><strong>Idrib bi-'asāka al-baḥr</strong> — "strike the sea with your staff." Then: <strong>fanfalaqa</strong> — "so it split." The <strong>fa</strong> — the connective particle — makes the splitting simultaneous with the striking. No gap. No explanation. No description of what the strike looked like. The result alone: <strong>fa-kāna kullu firqin kal-tawdi il-'azīm</strong> — "each portion was like a great towering mountain." <strong>Tawad</strong> — a massive, solid mountain. The sea does not part like a curtain. It stands.</p>

  <p>The staff that was once used to knock down leaves for sheep has struck the sea and left it standing as mountains. Between these two uses — leaves and sea — the Quran traces the complete arc of what ordinary objects become when they are in the hand of the one called.</p>

  <h2>What the Staff Doesn't Do</h2>

  <p>Throughout the Musa narrative, the staff is always directed. Musa does not use it on his own initiative. He carries it; Allah commands its deployment. At the burning bush, he throws it on command and picks it up on command. In Firaun's court, the contest is structured by divine instruction. At the sea, the strike is revealed <strong>wahy</strong> — by revelation, not Musa's decision.</p>

  <p>The staff is powerful in exact proportion to Musa's submission. When he is frightened by it and flees, the command to return is also a command not to fear. The object does nothing except when directed. The miracle is always at the intersection of divine command and human compliance. Musa's hand is in it, but the action comes from elsewhere.</p>

  <p>This is the theology compressed into an object: what you carry can become something you would never have imagined, but only if you release your grip on what it currently is. Musa's extended answer — "I lean on it, I use it for my sheep, I have other uses for it" — is the answer of a man who knows very well what he holds. The transformation begins the moment he lets go.</p>
</article>`,
  },

  // ─── ARTICLE 3 ────────────────────────────────────────────────────────────
  {
    title: "Musa and Fir'awn: A Forty-Year Conversation",
    slug: "musa-and-firaun-forty-year-conversation",
    excerpt: "Musa is commanded to speak to the man who tried to kill him as an infant, who enslaved his people, who held the most concentrated power of his age. The Quran's instruction for how to do it: use gentle speech.",
    seo_title: "Musa and Fir'awn in the Quran: The Prophet Sent to His Oppressor",
    seo_description: "The Quran's most extended study in da'wah. Musa is sent to Fir'awn with the instruction to speak gently. A study of truth confronting power across Surah Taha, Ash-Shu'ara, and Al-Qasas.",
    reading_time_minutes: 12,
    tags: ['musa', 'firaun', 'quranic-characters', 'prophets', 'dawah', 'tawakkul'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: FIRAUN_ID, is_primary: true },
      { entity_id: DAWAH_ID, is_primary: false },
      { entity_id: HARUN_ID, is_primary: false },
      { entity_id: BANI_ISRA_IL_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The command arrives at the burning bush, immediately after Musa receives his prophetic commission. Go to <a href="/hub/firaun">Firaun</a>. The instruction is simple in form and staggering in content: Firaun is described in one word — <strong>innahū ṭaghā</strong>, "indeed he has transgressed." The case against him is made in three syllables. Then the instruction for how to engage him:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">اذْهَبَا إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ ۝ فَقُولَا لَهُ قَوْلًا لَّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ</p>
    <p class="translation">"Go, both of you, to Fir'awn. Indeed, he has transgressed. And speak to him with gentle speech — perhaps he will be reminded or fear."</p>
    <cite>Surah Taha (20:43-44)</cite>
  </blockquote>

  <p><strong>Qawlan layyinan</strong> — "gentle speech." The word <strong>layyin</strong> comes from the root <strong>l-y-n</strong>, which in Arabic describes softness, pliability, the quality of something that yields without breaking. It is used for soft ground, for gentle water, for a fabric that does not resist. The command to speak gently to the most tyrannical ruler of the age is not a command to minimize the message. It is a command about manner. The message — Firaun has transgressed, there is a Lord of the worlds, release the people — does not become softer. The delivery must be.</p>

  <p>Then the rationale: <strong>la'allahu yatadhakkaru aw yakhshā</strong> — "perhaps he will be reminded or fear." The particle <strong>la'alla</strong> — perhaps, maybe — appears in a divine command. Allah instructs Musa to speak gently in the hope that Firaun might respond. The outcome is described as possible, not certain. The Quran does not tell Musa that Firaun will be saved. It tells him to speak as if he might be. This is the ethics of prophetic engagement: you go to the one who has the least reason to hear you and you speak with the most care.</p>

  <h2>Musa's Fear and the Promise</h2>

  <p>Musa and <a href="/hub/harun">Harun</a> are afraid. The Quran records this plainly. Their concern — that Firaun will have them killed or that his power will overwhelm them — is addressed directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ لَا تَخَافَا ۖ إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ</p>
    <p class="translation">"He said: Do not fear. Indeed I am with you both — I hear and I see."</p>
    <cite>Surah Taha (20:46)</cite>
  </blockquote>

  <p><strong>Innanī ma'akumā asma'u wa arā</strong> — "Indeed I am with you both — I hear and I see." The divine company is described through two attributes: hearing and sight. This is specific to the situation. Musa and Harun are going into a court where they will be watched and where their words will be used against them. The divine guarantee is not that Firaun will be reasonable, or that the mission will proceed without danger. It is that nothing that happens in that court will happen outside of divine perception. Every word spoken, every threat made, every response from Firaun — Allah hears it and sees it.</p>

  <p>This is what makes the fear survivable: not certainty of success, but certainty of witness.</p>

  <h2>The First Audience</h2>

  <p>In Surah Ash-Shu'ara, the confrontation is recorded in sustained dialogue — more of Musa's speech preserved here than in any other surah. Musa presents his credentials: <strong>innanī rasūlu rabbi il-'ālamīn</strong> — "I am a messenger of the Lord of the worlds." Firaun's response is to establish Musa's biography against him. Did we not raise you among us? Did you not kill a man? How dare you speak of lordship?</p>

  <p>Musa engages each point. He acknowledges the killing — <strong>fa'altuhā idhan wa anā mina al-ḍāllīn</strong>, "I did it then when I was of those who erred." He states the flight directly. He explains the prophetic mission. Firaun pivots to cosmology — who is this Lord of the worlds? — and Musa answers: <strong>rabbu al-samāwāti wa al-arḍi wa mā baynahumā</strong>, "the Lord of the heavens and earth and what is between them." Firaun tells his court that Musa is mad. Musa continues.</p>

  <p>The scene that follows in Ash-Shu'ara is striking for its rhythm: Firaun makes a move, Musa responds, Firaun reframes, Musa holds the line. It goes on for twenty-two verses. The confrontation is not a single dramatic moment. It is a sustained exchange across time, with neither side moving. And then the magicians are summoned.</p>

  <h2>The Magicians' Conversion</h2>

  <p>What Firaun intends as Musa's defeat — the contest of signs — becomes Musa's most significant public validation. The magicians, seeing Musa's staff swallow their illusions, fall prostrate immediately. Their declaration — <strong>āmannā bi-rabbi Mūsā wa Hārūn</strong>, "we believe in the Lord of Musa and Harun" — is immediate and collective. Firaun's threat to amputate them and crucify them does not move them. Their response is among the most theologically concentrated moments in the Quran:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">لَن نُّؤْثِرَكَ عَلَىٰ مَا جَاءَنَا مِنَ الْبَيِّنَاتِ وَالَّذِي فَطَرَنَا ۖ فَاقْضِ مَا أَنتَ قَاضٍ</p>
    <p class="translation">"We will never prefer you over the clear proofs that have come to us and over Him who created us. So decree whatever you will decree."</p>
    <cite>Surah Taha (20:72)</cite>
  </blockquote>

  <p><strong>Fa-iqḍi mā anta qāḍin</strong> — "so decree whatever you will decree." The magicians who spent their careers in Firaun's service, who came to this contest as his champions, dismiss his power with a grammatical form that is simultaneously permission and contempt. Do what you are going to do. We have seen what we have seen. The men who were most skilled at making things appear to be what they are not have just met the one thing that cannot be made to appear to be something else, and it has converted them in the space of one moment.</p>

  <h2>The Plagues and the Pattern</h2>

  <p>After the contest, Firaun does not release <a href="/hub/bani-isra-il">Bani Isra'il</a>. The plagues follow: flood, locusts, lice, frogs, blood — each plague arriving after Firaun's refusal, each accompanied by a temporary promise to let the people go, each promise broken when the plague lifts. The Quran describes Firaun's response to each plague as <strong>istakbara</strong> — "he became arrogant" — and <strong>kāna min al-mujrimīn</strong> — "he was of the wrongdoers." The pattern is consistent: evidence, promise, betrayal, more evidence.</p>

  <p>This is not the Quran building suspense. It is the Quran recording a theological reality about a particular type of heart: one that acknowledges truth under pressure and abandons it when the pressure lifts. Firaun's relationship with evidence is not one of ignorance. He sees the plagues. He makes the promises. The knowing betrayal is the point. <strong>Wa jaḥadū bihā wa istayqanat-hā anfusuhum</strong> — "they rejected them while their souls were certain of them." The knowledge does not save you if you refuse to be saved by it.</p>

  <h2>The Final Claim</h2>

  <p>At the sea, the conversation that began at the burning bush reaches its conclusion. Firaun, drowning, makes his declaration of faith: <strong>āmantu annahu lā ilāha illā alladhī āmanat bihi Banū Isrā'īl</strong> — "I believe that there is no god except the one in whom the Children of Israel believe." The Quran's response is one of the most bracing passages in the scripture:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">آلْآنَ وَقَدْ عَصَيْتَ قَبْلُ وَكُنتَ مِنَ الْمُفْسِدِينَ</p>
    <p class="translation">"Now? When you disobeyed before and were of those who spread corruption?"</p>
    <cite>Surah Yunus (10:91)</cite>
  </blockquote>

  <p><strong>Al-āna</strong> — "now?" The single word carries a lifetime of refusal. The conversation that began with <strong>qawlan layyinan</strong>, with gentle speech, with the hope that Firaun might be reminded — that conversation has run its full course. Musa delivered. Firaun heard. The plagues came and went. The magicians believed. And at the moment when there is nothing left to do but drown, Firaun finds the words he could have said at any point during the forty years of the conversation.</p>

  <p>The Quran preserves his body as a sign for those who come after. The man who said <strong>anā rabbukum al-a'lā</strong> — "I am your highest lord" — is a body on a shore, preserved to be looked at. Musa is buried in a tradition that debates the location of his grave. Firaun's afterlife is visibility itself: he claimed to be seen as divine and is now seen as proof that no one is.</p>
</article>`,
  },

  // ─── ARTICLE 4 ────────────────────────────────────────────────────────────
  {
    title: "Musa's Anger: What the Quran Preserves When a Prophet Breaks",
    slug: "musa-anger-prophet-breaks",
    excerpt: "The Quran records three moments when Musa loses his composure — kills a man, smashes the tablets, seizes his brother by the hair. Each time, the Quran also records what he does next.",
    seo_title: "Musa's Anger in the Quran: What the Text Preserves When a Prophet Breaks",
    seo_description: "The Quran records three moments when Musa's anger overcomes him. A study of prophetic humanity, honest self-accusation, and the theology of return in Surah Al-Qasas and Al-A'raf.",
    reading_time_minutes: 10,
    tags: ['musa', 'harun', 'quranic-characters', 'prophets', 'al-qasas', 'al-araf', 'sabr'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: HARUN_ID, is_primary: false },
      { entity_id: SABR_ID, is_primary: false },
      { entity_id: BANI_ISRA_IL_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The killing happens in a single verse. Musa enters the city at a time when the streets are empty, finds two men fighting — one from his people, one from his enemy — and when the man from his people calls for help, Musa strikes the other. One blow. The man dies. And the sentence that follows his death is one of the most theologically honest moments in any prophetic narrative in scripture:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ هَٰذَا مِنْ عَمَلِ الشَّيْطَانِ ۖ إِنَّهُ عَدُوٌّ مُّضِلٌّ مُّبِينٌ ۝ قَالَ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي فَغَفَرَ لَهُ ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ</p>
    <p class="translation">"He said: This is from the work of Shaytan. Indeed, he is a clear, misleading enemy. He said: My Lord, I have wronged myself — so forgive me. And He forgave him. Indeed, He is the Forgiving, the Merciful."</p>
    <cite>Surah Al-Qasas (28:15-16)</cite>
  </blockquote>

  <p>Two sentences, three movements. Musa names the act — <strong>hādhā min 'amali al-shayṭān</strong>, "this is from the work of Shaytan." He is not deflecting responsibility; he is identifying the mechanism. Then he turns to Allah: <strong>rabbī innī ẓalamtu nafsī</strong> — "My Lord, I have wronged myself." The verb <strong>ẓalama</strong> — from <strong>ẓ-l-m</strong>, the root of putting things out of their proper place — is applied inward. Not "I have done wrong" as an abstraction. "I have wronged myself." The harm has a recipient and it is him. Then the request: <strong>faghfir lī</strong> — "so forgive me." Two words. And the Quran concludes the movement in one clause: <strong>fa-ghafara lahu</strong> — "and He forgave him."</p>

  <p>The sequence — act, name, confess, ask, receive — takes three verses. The Quran does not dwell in the guilt. It records it and moves. This is the template for what the Quran does with prophetic failure: it preserves it fully, without softening, and then preserves the return with equal clarity.</p>

  <h2>The Tablets</h2>

  <p>The second rupture is larger in scale. Musa has been on the mountain for forty nights receiving the Torah. He descends to find his people worshipping a golden calf. The Quran's description of his return is among its most physically detailed passages:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَمَّا رَجَعَ مُوسَىٰ إِلَىٰ قَوْمِهِ غَضْبَانَ أَسِفًا قَالَ بِئْسَمَا خَلَفْتُمُونِي مِن بَعْدِي ۖ أَعَجِلْتُمْ أَمْرَ رَبِّكُمْ ۖ وَأَلْقَى الْأَلْوَاحَ وَأَخَذَ بِرَأْسِ أَخِيهِ يَجُرُّهُ إِلَيْهِ</p>
    <p class="translation">"And when Musa returned to his people, angry and grieved, he said: How wretched is what you have done in my absence. Did you hasten the command of your Lord? And he threw down the tablets and seized his brother by the head, dragging him toward himself."</p>
    <cite>Surah Al-A'raf (7:150)</cite>
  </blockquote>

  <p>Two words describe Musa's state: <strong>ghaḍbāna asifan</strong> — "angry and grieved." <strong>Ghaḍb</strong> is the hot anger of the immediate moment. <strong>Asaf</strong> is a deeper word — the grief that comes from profound disappointment, from the gap between what was hoped and what was found. Musa carries both simultaneously as he comes back down the mountain. The tablets — containing the divine word he spent forty nights receiving — he throws on the ground. Then he grabs <a href="/hub/harun">Harun</a> by the head and pulls him.</p>

  <p>The physical detail is extraordinary. The Quran preserved it. A prophet drags his brother by the hair in a moment of overwhelming emotion. Harun's response is the response of someone who understands that what matters now is not defending himself:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ ابْنَ أُمَّ إِنَّ الْقَوْمَ اسْتَضْعَفُونِي وَكَادُوا يَقْتُلُونَنِي فَلَا تُشْمِتْ بِيَ الْأَعْدَاءَ وَلَا تَجْعَلْنِي مَعَ الْقَوْمِ الظَّالِمِينَ</p>
    <p class="translation">"He said: Son of my mother — the people overpowered me and nearly killed me. So do not let the enemies rejoice over me, and do not place me among the wrongdoing people."</p>
    <cite>Surah Al-A'raf (7:150)</cite>
  </blockquote>

  <p><strong>Ibn umm</strong> — "son of my mother." The address strips everything back to the most fundamental bond. In the middle of Musa's fury, Harun invokes the mother they share. He explains what happened — the people threatened him, nearly killed him — and asks for two things: do not let the enemies celebrate my humiliation, and do not number me among the wrongdoers. The second request is the one that matters. Place me correctly. I held the line as long as I could. Count that.</p>

  <p>Musa hears him. The tablets he threw down — the Quran says later he picked them up after his anger subsided. <strong>Wa lammā sakita 'an Mūsā al-ghaḍabu akhadha al-alwāḥ</strong> — "when the anger left Musa, he took up the tablets." The word <strong>sakita</strong> — from <strong>s-k-t</strong>, to be silent, to settle, to quiet — describes the anger departing the way a storm departs. He picks up the divine word he threw on the ground. He asks Allah for mercy for himself and his brother.</p>

  <h2>The Pattern Across the Three Moments</h2>

  <p>The killing in the city. The tablets on the ground. The confrontation with Harun. Three ruptures across the Musa narrative, and a consistent pattern follows each:</p>

  <p>After the killing: immediate self-accusation — <strong>ẓalamtu nafsī</strong> — then forgiveness sought and received.</p>

  <p>After the tablets: anger settles, tablets retrieved, supplication: <strong>rabbī ighfir lī wa li-akhī</strong> — "my Lord, forgive me and my brother."</p>

  <p>After the Khidr encounter — a third instance of Musa failing to keep a commitment — there is no accusation from Allah, only the end of the journey. Musa promised patience three times and broke the promise each time. The relationship ends not with punishment but with a completion: Musa has learned the limit of what he can know, and that is enough.</p>

  <p>The Quran is preserving something about the prophetic life that hagiography tends to smooth over: the men sent as models for humanity are human. They break. They lose their composure. They throw things and grab people and flee in fear. What makes them prophetic is not the absence of these moments. It is what happens immediately after: the turning, the honest naming, the return to Allah, the refusal to stay in the rupture longer than necessary.</p>

  <h2>What the Preservation Means</h2>

  <p>The Quran could have omitted these moments. The text has no obligation to record Musa throwing the tablets, or Harun being grabbed by the hair, or the killing in the city. These details do not serve a narrative purpose in any obvious way. They serve a theological one: the record of how a person who has genuinely received divine trust responds when they fail is more instructive than a record of perfection would ever be.</p>

  <p>The model the Quran offers is not a person who does not break. It is a person who breaks, names it honestly, and returns. The return is what the model is.</p>
</article>`,
  },

  // ─── ARTICLE 5 ────────────────────────────────────────────────────────────
  {
    title: "Musa and Khidr: The Limits of Prophetic Knowledge",
    slug: "musa-and-khidr-limits-of-prophetic-knowledge",
    excerpt: "A man of divine knowledge sinks a boat, kills a boy, and builds a wall for people who offered no hospitality. Musa promised three times to be patient. He broke the promise each time. The Quran records all of it.",
    seo_title: "Musa and Khidr in the Quran: The Prophet Who Could Not Keep His Promise",
    seo_description: "Surah Al-Kahf 18:60-82. Khidr does things that look like catastrophe. Musa promises patience three times and fails. The limits of prophetic knowledge before divine wisdom.",
    reading_time_minutes: 11,
    tags: ['musa', 'quranic-characters', 'prophets', 'al-kahf', 'sabr', 'ilm'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: SABR_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The journey begins with a fish. Musa tells his servant that he will keep walking until he reaches the place where two seas meet, even if it takes ages. When the fish disappears — slips into the sea at the exact place they stop to rest — that is the sign. They have arrived. They have overshot it and must go back. There, they will find a man of particular knowledge. The opening of the Musa-Khidr narrative in Surah Al-Kahf is organized around a fish and a boy carrying it, and the moment the fish escapes is the moment the lesson begins. Musa did not notice it happen. He was asleep.</p>

  <p>This detail — that Musa missed the sign, that his servant witnessed what he did not — is the first lesson of a passage that is entirely about the limits of what any single perspective can hold.</p>

  <h2>The Man They Find</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَاهُ مِن لَّدُنَّا عِلْمًا</p>
    <p class="translation">"And they found a servant from among Our servants whom We had given mercy from Ourselves and had taught from Ourselves a knowledge."</p>
    <cite>Surah Al-Kahf (18:65)</cite>
  </blockquote>

  <p>Three things are attributed to this man, and each one comes from Allah directly. <strong>Rahma min 'indinā</strong> — "mercy from Our presence." Not mercy he earned; mercy given. <strong>Wa 'allamnāhu min ladunnā 'ilmā</strong> — "and We taught him from Ourselves a knowledge." The phrase <strong>min ladunnā</strong> — "from Our presence, from beside Us" — marks this knowledge as something other than what is normally transmitted. Hadith scholarship identifies this figure as Khidr. The Quran identifies him only as a servant given something directly.</p>

  <p>The knowledge he has been given is <strong>'ilm ladunni</strong> — a term that entered the Islamic tradition to describe inner knowledge, knowledge of the unseen dimension of events. It is not supernatural in the sense of being arbitrary; it is the knowledge of causes and consequences that operates below the visible surface of events. He sees what actions produce at their ends. Musa sees what they produce at the moment of the action.</p>

  <p>Musa's request is precise:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ لَهُ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا</p>
    <p class="translation">"Musa said to him: May I follow you on the condition that you teach me from what you have been taught of right guidance?"</p>
    <cite>Surah Al-Kahf (18:66)</cite>
  </blockquote>

  <p><strong>Hal attabi'uka</strong> — "may I follow you?" The phrasing is remarkable. Musa is a prophet. He has spoken directly with Allah. He has parted the sea. He is now asking permission to follow a man whose name the Quran does not give. The form of the request — a question, conditional, humble — is the form of a student before a teacher. And what does he ask to receive? <strong>Rushdan</strong> — right guidance. The word <strong>rushd</strong> carries the sense of maturity of judgment, soundness of direction, the orientation toward what is correct. Musa asks to learn how to see correctly.</p>

  <h2>The Three Actions and the Three Failures</h2>

  <p>Khidr agrees to take Musa but states the condition immediately: <strong>innaka lan tastaṭī'a ma'iya ṣabran</strong> — "indeed you will not be able to have patience with me." The patience he requires is not patience over time. It is the patience of witnessing actions you cannot understand and refraining from objection. That specific patience, Khidr says, Musa does not have. He is right.</p>

  <p>The first action: they board a boat and Khidr damages it — makes a hole in the hull. Musa objects immediately. <strong>A-kharagtahā li-tughriqa ahlahā</strong> — "did you bore a hole in it to drown its people?" The question contains its own accusation. Khidr reminds him: <strong>alam aqul innaka lan tastaṭī'a ma'iya ṣabran</strong> — "did I not say that you would not be able to have patience with me?" Musa apologizes. He asks not to be held to account for forgetting. They continue.</p>

  <p>The second action: Khidr kills a boy. A child, unprovoked, whose life he takes on the road. Musa's response is visceral: <strong>a-qatalta nafsan zakiyyatan bi-ghayri nafsin</strong> — "did you kill a pure soul without a soul?" A life for a life is the principle; there was no prior life taken. Khidr repeats: did I not say you would not have patience with me? Musa makes one more promise: if he asks again, end the companionship. He has no excuse.</p>

  <p>The third action: they pass through a town whose people refuse to give them food. In that same town, Khidr rebuilds a wall that was about to collapse. Musa's objection this time is not about injustice but about economy: if he wanted, he could have taken payment for the work. The three objections trace a line from outrage at harm to curiosity about the logic of effort. Khidr ends the companionship and explains:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَمَّا الْجِدَارُ فَكَانَ لِغُلَامَيْنِ يَتِيمَيْنِ فِي الْمَدِينَةِ وَكَانَ تَحْتَهُ كَنزٌ لَّهُمَا وَكَانَ أَبُوهُمَا صَالِحًا فَأَرَادَ رَبُّكَ أَن يَبْلُغَا أَشُدَّهُمَا وَيَسْتَخْرِجَا كَنزَهُمَا رَحْمَةً مِّن رَّبِّكَ</p>
    <p class="translation">"And as for the wall, it belonged to two orphan boys in the city, and beneath it was a treasure for them, and their father was righteous. Your Lord intended that they reach their maturity and extract their treasure — as a mercy from your Lord."</p>
    <cite>Surah Al-Kahf (18:82)</cite>
  </blockquote>

  <p>The boat was damaged to save it from a king who seized every serviceable vessel by force. A damaged boat the king would pass over. The hole preserved the livelihood of a poor family. The boy killed would have grown to oppress his believing parents beyond what they could bear — the mercy was in the ending of a life whose continuation would have consumed two others. The wall protected an inheritance for two orphans whose father's righteousness had earned them divine protection years after his death.</p>

  <p>Three actions that looked like harm were acts of preservation. The boy whose death looked like murder was a mercy to his parents. The wall rebuilt for the ungrateful town was protecting orphans who had no advocate.</p>

  <h2>What Musa Could Not Hold</h2>

  <p>Khidr ends his explanation with a precise statement: <strong>wa mā fa'altuhu 'an amrī</strong> — "and I did not do it of my own accord." The knowledge that directed the actions was not his own. He was an instrument of a perception he received, not generated. And Musa — the prophet who had received the Torah, who had spoken directly with Allah, who had stood before Firaun — could not hold the patience required to witness divine action through the appearance of harm.</p>

  <p>The Quran is recording a distinction between two types of prophetic knowledge. Musa's knowledge is legislative, revelatory, and direct: he receives the word of Allah and delivers it. Khidr's knowledge is consequential and contextual: he sees the downstream reality of actions before they produce their visible results. Neither is superior; they are different instruments for different dimensions of divine wisdom.</p>

  <p>What the narrative makes available to the reader is the humility to know that when something looks harmful, the full account may not yet be visible. The wall built for ungrateful people. The boat damaged to save it. The life ended to preserve two others. These are not arguments for passivity before injustice. They are arguments for the honest acknowledgment that the frame through which we judge events is always partial — and that the patience required to hold that acknowledgment is harder than any other kind.</p>

  <p>Musa, the greatest prophet in the Quran by frequency of mention, could not hold it for the duration of a single journey. The text does not say this to diminish him. It says it to tell you something true about the difficulty of what is being asked.</p>
</article>`,
  },

  // ─── ARTICLE 6 ────────────────────────────────────────────────────────────
  {
    title: "The Sea That Split: What the Quran Says and Doesn't Say",
    slug: "musa-sea-that-split-what-quran-says",
    excerpt: "One command. Two words for what happened to the water. The Quran's account of the sea split is among the most compressed miracle narratives in scripture — and what it omits is as instructive as what it records.",
    seo_title: "The Parting of the Sea in the Quran: What the Text Says and Omits",
    seo_description: "Surah Ash-Shu'ara 26:63 and Al-Baqarah 2:50. The Quran's account of the sea split is five words. A study of what the text preserves, what it withholds, and why both choices matter.",
    reading_time_minutes: 9,
    tags: ['musa', 'bani-isra-il', 'quranic-characters', 'prophets', 'ash-shuara', 'al-baqarah'],
    entity_tags: [
      { entity_id: MUSA_ID, is_primary: true },
      { entity_id: FIRAUN_ID, is_primary: false },
      { entity_id: BANI_ISRA_IL_ID, is_primary: false },
      { entity_id: SABR_ID, is_primary: false },
      { entity_id: TAWAKKUL_ID, is_primary: false },
    ],
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The entire act of the sea splitting — the command, the result, and the form of the result — takes eleven words in the Quran. <strong>Fa-awḥaynā ilā Mūsā ani idrib bi-'aṣāka al-baḥra fanfalaqa fa-kāna kullu firqin kal-ṭawdi il-'aẓīm</strong>. "So We revealed to Musa: Strike the sea with your staff. And it split. And each portion was like a great towering mountain." The entire event occupies half of one verse in Surah Ash-Shu'ara. What happens before it takes twenty verses. What happens after it takes four more. The miracle itself is the briefest part of the story.</p>

  <p>This is a deliberate choice. The Quran compresses the miraculous act and expands the human experience surrounding it. The people are frightened; the enemy is approaching; Musa speaks with prophetic confidence; the crossing happens; the enemy drowns. The sea's parting is the hinge between fear and deliverance, and the Quran treats it as a hinge — structurally central, visually spare.</p>

  <h2>The Moment Before</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا تَرَاءَى الْجَمْعَانِ قَالَ أَصْحَابُ مُوسَىٰ إِنَّا لَمُدْرَكُونَ ۝ قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ</p>
    <p class="translation">"When the two groups sighted each other, the companions of Musa said: We are overtaken! He said: Absolutely not. Indeed my Lord is with me — He will guide me."</p>
    <cite>Surah Ash-Shu'ara (26:61-62)</cite>
  </blockquote>

  <p><strong>Tarā'ā al-jam'ān</strong> — "the two groups sighted each other." The verb <strong>tarā'ā</strong> — from <strong>r-'-y</strong>, to see — in this form means mutual sighting: each group sees the other. The moment of visual confrontation between <a href="/hub/bani-isra-il">Bani Isra'il</a> and Firaun's army is described with a word that emphasizes the mutual, simultaneous nature of the recognition. They see each other seeing each other. At that moment, the people say: <strong>innā la-mudrakūna</strong> — "we are surely overtaken." The word <strong>mudrakūn</strong> is the passive participle of <strong>adraka</strong> — to catch up to, to reach, to overtake. They are certain of what is about to happen.</p>

  <p>Musa's response is a single syllable followed by a sentence: <strong>kallā</strong> — "absolutely not." The word is emphatic negation, stronger than simple "no." It appears eleven times in the Quran and always carries the force of a categorical refusal to accept the frame being offered. The people say: we will be caught. Musa says: the premise is wrong. Then the ground of the refusal: <strong>inna ma'iya rabbī sayahdīn</strong> — "my Lord is with me; He will guide me." Future tense: <strong>sayahdīn</strong>. The guidance has not arrived yet. Musa speaks of it as certain before it happens.</p>

  <p>This is what Surah Al-Qasas will later identify as <strong>tawakkul</strong> in its functional form — not the absence of fear, but the confidence that produces action in the presence of fear. The sea is still whole when Musa says <strong>kallā</strong>. The revelation to strike it has not yet come. He speaks the certainty before it is confirmed.</p>

  <h2>The Splitting and Its Description</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ</p>
    <p class="translation">"So We revealed to Musa: Strike the sea with your staff. And it split, and each part was like a great towering mountain."</p>
    <cite>Surah Ash-Shu'ara (26:63)</cite>
  </blockquote>

  <p>The verb for the splitting — <strong>infalaqa</strong> — comes from <strong>f-l-q</strong>: to split, to cleave, to break open at the seam. The seventh form <strong>infalaqa</strong> is reflexive and immediate: the sea split itself. Musa's staff struck it; the sea's response is described as internally generated, as if the command caused the water to act from within rather than being pushed from without. Then the description of what resulted: <strong>kullu firqin kal-ṭawdi il-'aẓīm</strong> — "each portion like a great mountain." <strong>Ṭawd</strong> — a massive, solid, immovable peak. The sea does not drape itself aside or flow back. It stands as mountains stand.</p>

  <p>Surah Al-Baqarah records the same event in a single clause: <strong>wa idhfaraqnā bikumu al-baḥra fa-anjaynākum</strong> — "and when We split the sea for you and saved you." Surah Ta-Ha references it in passing. Surah Ad-Dukhan gives it one verse. Across five surahs, the splitting of the sea appears, and in each surah the compression is total. The Quran consistently refuses to dwell on the mechanics of the miracle.</p>

  <h2>What the Quran Withholds</h2>

  <p>The Quran does not describe: how long the crossing took. Whether the sea floor was dry or wet. How wide the path was. Whether anyone looked back. What the sound was. What Firaun's army saw before it entered the water. The reaction of the people as they crossed. How many were crossing. These are the details that fill the other scriptural accounts of the event and that dominate popular imagination. The Quran omits them all.</p>

  <p>What it preserves instead: the fear before, the prophetic certainty before, the command and the result, and then — in Surah Ad-Dukhan — a single instruction given to Musa after the crossing that most accounts never discuss:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَاتْرُكِ الْبَحْرَ رَهْوًا ۖ إِنَّهُمْ جُندٌ مُّغْرَقُونَ</p>
    <p class="translation">"And leave the sea parted — indeed they are an army that will be drowned."</p>
    <cite>Surah Ad-Dukhan (44:24)</cite>
  </blockquote>

  <p><strong>Utruki al-baḥra rahwan</strong> — "leave the sea parted." The word <strong>rahw</strong> describes something left in its open, spread, flowing state — undisturbed, as is. After the crossing, Musa is instructed to leave the sea open. The path remains. Firaun's army enters it. The trap is the miracle itself: the sea that saved Bani Isra'il swallows the army that pursued them. The same water. The same opening. The same divine action serves both purposes.</p>

  <p>This is the Quranic use of economy in miracle narrative: one event, one divine action, two results precisely opposite. No elaboration needed. <strong>Innahum jundun mughraqūn</strong> — "they are an army that will be drowned." Future tense, certain, closing the account before it happens.</p>

  <h2>The Architecture of the Account</h2>

  <p>The compression of the sea-splitting in the Quran is a refusal to let the miracle become the point. The Quran is consistent about this: what happens to people in the presence of miraculous signs is more important to the text than the description of the signs themselves. The people who witnessed the splitting — Bani Isra'il, the generation that was carried across — would later demand a calf to worship. Firaun, who witnessed the plagues, would declare faith only while drowning.</p>

  <p>The question the Quran is always asking is not "what was the miracle like?" It is "what did you do with what you saw?" The sea splits in eleven words. The account of what Bani Isra'il did after crossing it takes a hundred and thirty verses across multiple surahs. The proportion tells you what the text considers worth dwelling on.</p>
</article>`,
  },
]

async function main() {
  console.log('Inserting Musa hub articles...\n')

  const insertedIds: string[] = []

  for (const article of articles) {
    const { entity_tags, ...postData } = article

    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        ...postData,
        type: 'article',
        status: 'published',
        featured: false,
        published_at: new Date().toISOString(),
        created_by: ADMIN_USER_ID,
      })
      .select('id')
      .single()

    if (postError || !post) {
      console.error(`✗ Failed to insert "${article.title}":`, postError)
      continue
    }

    insertedIds.push(post.id)
    console.log(`✓ Inserted: "${article.title}" (${post.id})`)

    for (const tag of entity_tags) {
      const { error: tagError } = await supabase.from('entity_tags').insert({
        post_id: post.id,
        entity_id: tag.entity_id,
        is_primary: tag.is_primary,
      })
      if (tagError) {
        console.error(`  ✗ Tag error for entity ${tag.entity_id}:`, tagError)
      } else {
        console.log(`  ✓ Tagged entity ${tag.entity_id} (primary: ${tag.is_primary})`)
      }
    }
  }

  // Refresh co-occurrence graph
  const { error: rpcError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcError) {
    console.error('\n✗ Co-occurrence refresh failed:', rpcError)
  } else {
    console.log('\n✓ Co-occurrence graph refreshed')
  }

  console.log(`\nDone. ${insertedIds.length}/${articles.length} articles inserted.`)
}

main().catch(console.error)
