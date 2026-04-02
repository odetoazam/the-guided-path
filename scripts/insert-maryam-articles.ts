#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const MARYAM_ID = '6ce90516-9141-476e-8f4a-bb50e1e77925'
const ISA_ID = '14ec6c99-9696-4592-8945-ef905403b3ce'
const ASIYA_ID = '23ab8f23-b97b-4a09-81aa-519bbc8e7e7a'
const ZAKARIYYA_ID = '178975a6-a53a-48db-8426-00adba42422f'
const SABR_ID = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49'
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a'

const articles = [
  // Article 1: The Woman Who Asked
  {
    primaryEntity: MARYAM_ID,
    secondaryEntities: [ZAKARIYYA_ID, ISA_ID],
    article: {
      title: "The Woman Who Asked: Maryam's Question and the Angel's Answer",
      slug: "the-woman-who-asked-maryams-question-and-the-angels-answer",
      type: 'article',
      excerpt: "When the angel announces that she will bear a son, Maryam asks: how? Not a question of disbelief — a request for information. The Quran records her question, the angel's answer, and what the sequence reveals about what faith actually requires.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['maryam', 'quranic-characters', 'isa', 'zakariyya'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Maryam's question in Surah Maryam is one of the most quietly remarkable moments in the Quran. The angel has just told her she will have a son. And she asks: how? "How can I have a boy when no man has touched me and I have never been unchaste?" The question is precise. It is not "I refuse." It is not "I don't believe you." It is a request for information about something that has no precedent in human experience. And the Quran records both the question and the answer, which means both the question and the answer are part of the lesson.</p>

  <h2>The Withdrawal</h2>

  <blockquote class="ayah-quote" data-ayah="19:16">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:16 -->وَٱذْكُرْ فِى ٱلْكِتَـٰبِ مَرْيَمَ إِذِ ٱنتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا</p>
    <p class="translation">"And mention in the Book, Maryam, when she withdrew from her family to a place toward the east."</p>
    <cite>Surah Maryam (19:16)</cite>
  </blockquote>

  <p>The verb <strong>intabadhat</strong> — "she withdrew" — comes from the root meaning to be cast aside, to separate oneself. She pulled herself away from her family to a place in the east. This is not coincidental: the east, in the Quran's geography of spiritual practice, is associated with privacy and prayer. She took a screen between herself and the world. Whatever she was doing in that eastern withdrawal, it was interior work — the kind that requires separation from ordinary social space.</p>

  <p>This withdrawal is the context the angel enters. He does not come to her in the marketplace or in her family's company. He comes to her in the place she has set apart.</p>

  <h2>Her First Response</h2>

  <blockquote class="ayah-quote" data-ayah="19:18">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:18 -->قَالَتْ إِنِّىٓ أَعُوذُ بِٱلرَّحْمَـٰنِ مِنكَ إِن كُنتَ تَقِيًّا</p>
    <p class="translation">"She said: I seek refuge in the Most Merciful from you, if you are conscious of Him."</p>
    <cite>Surah Maryam (19:18)</cite>
  </blockquote>

  <p>Before she hears a word from him, she speaks. And what she says is a theological move: <strong>inni a'udhu bil-Rahmani minka</strong> — I seek refuge in the Rahman from you. The name she chooses is <strong>Al-Rahman</strong> — the Merciful, the name that encompasses divine care for all creation. She doesn't say "I am afraid of you." She says: the name of the Merciful is my shield, and if you have any taqwa of Him, this name will stop you.</p>

  <p>The condition <strong>in kunta taqiyyan</strong> — "if you are God-conscious" — is not diplomatic hedging. It is a test. She is using the most fundamental Quranic principle — that every being with awareness of Allah should be constrained by that awareness — as her defense. Before she knows whether this figure is a threat or a messenger, she establishes the ground on which she stands.</p>

  <h2>The Question</h2>

  <blockquote class="ayah-quote" data-ayah="19:20">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:20 -->قَالَتْ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَلَمْ يَمْسَسْنِى بَشَرٌ وَلَمْ أَكُ بَغِيًّا</p>
    <p class="translation">"She said: How can I have a boy when no man has touched me and I have never been unchaste?"</p>
    <cite>Surah Maryam (19:20)</cite>
  </blockquote>

  <p>The word <strong>annā</strong> — "how" — is the question of a person trying to understand a mechanism, not a person refusing a message. She states two facts. <strong>Lam yamsasnī basharun</strong> — no man has touched me. <strong>Lam aku baghiyyan</strong> — I have not been immoral. These are not objections. They are the data she has to work with. Given these facts, she asks: how does this work? What is the causal path from here to a son?</p>

  <p>Compare Zakariyya's question earlier in the same surah (19:8): <strong>"How shall I have a boy when my wife is barren and I have reached extreme old age?"</strong> The two questions are structurally identical — both ask "how" given apparently insurmountable facts. And the answers diverge significantly: Zakariyya is told to fast for three days as a sign; Maryam receives an explanation. The difference has occupied scholars: some suggest Zakariyya asked as a request for a sign, while Maryam asked as a genuine inquiry into mechanism. The Quran honors the inquiry with information.</p>

  <h2>The Answer</h2>

  <blockquote class="ayah-quote" data-ayah="19:21">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:21 -->قَالَ كَذَٰلِكِ قَالَ رَبُّكِ هُوَ عَلَىَّ هَيِّنٌ ۖ وَلِنَجْعَلَهُۥٓ ءَايَةً لِّلنَّاسِ وَرَحْمَةً مِّنَّا ۚ وَكَانَ أَمْرًا مَّقْضِيًّا</p>
    <p class="translation">"He said: So it shall be — your Lord says: it is easy for Me. And We will make him a sign for the people and a mercy from Us. And it is a matter already decreed."</p>
    <cite>Surah Maryam (19:21)</cite>
  </blockquote>

  <p>The angel's answer begins with <strong>kadhāliki</strong> — "thus," "so it shall be" — which is not really an explanation of the mechanism but a closure of the question about it. The mechanism is: your Lord says it is easy for Him. The Quran does not provide a detailed account of how a virginal conception happens. It provides the theological fact that makes the mechanism irrelevant: <strong>huwa 'alayya hayyinun</strong> — it is easy for Me. When the Creator says something is easy, the question "how" has been answered at the level that matters.</p>

  <p>Then the angel explains the purpose: <strong>wa li-naj'alahu āyatan lil-nāsi wa rahmatan minna</strong> — to make him a sign for people and a mercy from Us. Isa is not an accident or an exception to the order. He is a deliberate sign — a statement about divine power embedded in human history. Maryam's question "how" gets the answer: the how is divine will, and the why is divine mercy extended to humanity. She asked how. She received: easy for Allah, a mercy for the world. Both parts of the answer are addressed to her.</p>

  <h2>What the Question Teaches</h2>

  <p>The Quran records Maryam's question because the question is not a failure of faith. It is a model of how to receive news that exceeds comprehension. She does not pretend to understand what she does not understand. She does not suppress the natural inquiry into something unprecedented. She asks. And in asking, she receives both an answer and a clarity about the nature of divine action that silence would have left unspoken.</p>

  <p>The Quran presents this as normative. Faith does not require the suppression of questions about divine action. It requires the willingness to hear the answer and then — when the answer is "it is easy for your Lord" — to accept that this is sufficient. Maryam accepted. The acceptance after the question is the act of faith. The question itself was the honesty that made the acceptance possible.</p>
</article>`
    }
  },

  // Article 2: The Palm Tree
  {
    primaryEntity: MARYAM_ID,
    secondaryEntities: [SABR_ID, TAWAKKUL_ID],
    article: {
      title: "The Palm Tree: What Allah Provided When Maryam Asked to Disappear",
      slug: "the-palm-tree-what-allah-provided-when-maryam-asked-to-disappear",
      type: 'article',
      excerpt: "In the most isolated moment of her story, Maryam asks for the most private thing possible — to be forgotten, erased from memory. Allah does not grant the prayer for disappearance. He provides a stream, fresh dates, and a strategy. The excess is the answer.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['maryam', 'quranic-characters', 'sabr', 'tawakkul'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran tells us that Maryam withdrew to a remote place when the labor came. <strong>Makan qasiyyan</strong> — remote, far, distant. She was already isolated from her family when the angel came. Now she has withdrawn further. She is alone, in labor, without anyone. And then she speaks — the only words the Quran gives us from inside the birth — and they are: <em>I wish I had died before this and had been completely forgotten.</em></p>

  <blockquote class="ayah-quote" data-ayah="19:23">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:23 -->فَأَجَآءَهَا ٱلْمَخَاضُ إِلَىٰ جِذْعِ ٱلنَّخْلَةِ قَالَتْ يَـٰلَيْتَنِى مِتُّ قَبْلَ هَـٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا</p>
    <p class="translation">"And the pains of labor drove her to the trunk of a palm tree. She said: I wish I had died before this and had been a thing completely forgotten."</p>
    <cite>Surah Maryam (19:23)</cite>
  </blockquote>

  <p>The grammar is worth pausing on. <strong>Nasyan mansiyyan</strong> — "a thing forgotten, thoroughly forgotten." The word <strong>nasyan</strong> is a noun meaning "a thing forgotten" — she doesn't say "I wish I had been forgotten" but "I wish I had been <em>a forgotten thing</em>," reduced from a person to a category of absent things. And <strong>mansiyyan</strong> — the passive participle of the same root, intensifying: not merely forgotten but <em>the kind of thing that gets forgotten</em>. She asks to be erased from existence and from memory both.</p>

  <p>This is not despair in the clinical sense. It is the recognition of someone who understands exactly what she is about to face. She has just given birth alone to a child with no father. She knows what her community will say. She wishes she did not have to face that — not that Allah's plan was wrong, but that she personally wishes she could have avoided the encounter. The wish is honest. The Quran records it. It is the wish of a person who is strong enough to face something they would prefer not to face.</p>

  <h2>The Response</h2>

  <blockquote class="ayah-quote" data-ayah="19:24">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:24 -->فَنَادَىٰهَا مِن تَحْتِهَآ أَلَّا تَحْزَنِى قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا</p>
    <p class="translation">"Then he called her from below her: Do not grieve. Your Lord has made beneath you a stream."</p>
    <cite>Surah Maryam (19:24)</cite>
  </blockquote>

  <p>The first response to her wish to disappear is: <strong>alā tahzanī</strong> — do not grieve. Not "your wish is denied." Not "pull yourself together." Do not grieve. And then immediately: <strong>qad ja'ala rabbuki tahtaki sariyyan</strong> — your Lord has made beneath you a stream. The response to grief is provision. The answer to "I wish I were not here" is "here is water."</p>

  <blockquote class="ayah-quote" data-ayah="19:25">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:25 -->وَهُزِّىٓ إِلَيْكِ بِجِذْعِ ٱلنَّخْلَةِ تُسَـٰقِطْ عَلَيْكِ رُطَبًا جَنِيًّا</p>
    <p class="translation">"And shake toward you the trunk of the palm tree — it will drop upon you fresh ripe dates."</p>
    <cite>Surah Maryam (19:25)</cite>
  </blockquote>

  <p>She is in labor. She is weak. She is told to shake a palm tree. The instruction seems almost unreasonable — but the provision it delivers is specific: <strong>rutaban janiyyan</strong> — fresh ripe dates. Not dried dates. Not food in general. Fresh ripe dates, the fruit of a palm in its most nourishing form. Classical scholarship has noted what nutritional science confirms: ripe dates contain oxytocin-stimulating compounds, known to ease labor and encourage uterine contractions, and are one of the most concentrated and easily digestible energy sources available. The Quran's provision is not arbitrary. It is precisely what her body needed in that moment.</p>

  <h2>Eat, Drink, and Be Comforted</h2>

  <blockquote class="ayah-quote" data-ayah="19:26">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:26 -->فَكُلِى وَٱشْرَبِى وَقَرِّى عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ ٱلْبَشَرِ أَحَدًا فَقُولِىٓ إِنِّى نَذَرْتُ لِلرَّحْمَـٰنِ صَوْمًا فَلَنْ أُكَلِّمَ ٱلْيَوْمَ إِنسِيًّا</p>
    <p class="translation">"So eat and drink and let your eyes be comforted. If you see any human, say: I have vowed to the Most Merciful a fast, so I will not speak to any human today."</p>
    <cite>Surah Maryam (19:26)</cite>
  </blockquote>

  <p><strong>Wa qarrī 'aynan</strong> — "and let your eyes be comforted." The phrase <strong>qurra al-'ayn</strong> — the cooling/comfort of eyes — is one of the Quran's expressions for the deepest satisfaction, almost a physical contentment. It is the phrase used for the joy of seeing a beloved face, the relief of something long awaited. After the wish to disappear, after labor alone under a palm tree, she is told: let your eyes be comforted.</p>

  <p>And then the strategy: if anyone speaks to you, say you have vowed a fast to the Most Merciful and will not speak to anyone today. This is divine preparation for the encounter she has been dreading. Allah does not give her the words she needs to defend herself — He gives her the words she needs to redirect the encounter toward the sign that will do the defending. The vow of silence is not imposed on her; she is instructed to declare it. And declaring it means that when she points to the baby, the pointing is framed: I am not refusing to answer you; I have vowed silence to the Merciful. The explanation will come from someone else.</p>

  <h2>The Excess</h2>

  <p>Maryam asked to disappear. She received a stream, fresh ripe dates, comfort for her eyes, and a strategy for the confrontation ahead. Allah did not grant what she asked. He gave her what she needed — and more. The excess is the answer to the wish: you will not disappear, because you are not alone, because the Lord who required this of you has prepared ease in your situation, because the thing you dread has already been arranged for.</p>

  <p>This is not the last time the Quran will show Allah responding to a wish for absence with provisions for presence. It is perhaps the most intimate instance. She is alone, in pain, dreading what comes next. And the response is: here is water. Here are dates. Let your eyes be comforted. You will face your people. You will not face them alone.</p>
</article>`
    }
  },

  // Article 3: She Pointed
  {
    primaryEntity: MARYAM_ID,
    secondaryEntities: [ISA_ID, SABR_ID, TAWAKKUL_ID],
    article: {
      title: "She Pointed: Maryam's Silence Before Her People",
      slug: "she-pointed-maryams-silence-before-her-people",
      type: 'article',
      excerpt: "When Maryam returned to her people with the infant, they accused her. She had vowed silence. She pointed at the baby. The Quran's account of this moment is one of its most compressed theological statements: the silence was not defeat, and the pointing was not surrender.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['maryam', 'quranic-characters', 'isa', 'sabr', 'tawakkul'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">In 19:26, before she returned to her people, Maryam had already prepared for the encounter: "If you see any human, say: I have vowed a fast to the Most Merciful, so I will not speak to any human today." The vow of silence was not a response to the accusation. It was the preparation for it — given to her by the same voice that told her to eat, drink, and let her eyes be comforted. She walked toward her community with the infant, with a vow, and with the knowledge that she would need to point.</p>

  <h2>The Arrival</h2>

  <blockquote class="ayah-quote" data-ayah="19:27">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:27 -->فَأَتَتْ بِهِۦ قَوْمَهَا تَحْمِلُهُۥ ۖ قَالُوا۟ يَـٰمَرْيَمُ لَقَدْ جِئْتِ شَيْـًٔا فَرِيًّا</p>
    <p class="translation">"So she came to her people carrying him. They said: O Maryam, you have brought a monstrous thing."</p>
    <cite>Surah Maryam (19:27)</cite>
  </blockquote>

  <p>The verb <strong>fa'ata bihi</strong> — "she came with him" — is simple and direct. No hesitation, no mediation. She came carrying the infant and presented herself. The community's response is immediate: <strong>laqad ji'ti shay'an fariyyan</strong> — "you have brought a monstrous thing." The word <strong>fariyy</strong> means something extraordinary, grave, and potentially terrible — a thing that has no precedent, that violates the understood order of things. Their accusation is the accusation she knew was coming.</p>

  <blockquote class="ayah-quote" data-ayah="19:28">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:28 -->يَـٰٓأُخْتَ هَـٰرُونَ مَا كَانَ أَبُوكِ ٱمْرَأَ سَوْءٍ وَمَا كَانَتْ أُمُّكِ بَغِيًّا</p>
    <p class="translation">"O sister of Harun, your father was not a man of evil, and your mother was not unchaste."</p>
    <cite>Surah Maryam (19:28)</cite>
  </blockquote>

  <p>The second accusation invokes her lineage. "O sister of Harun" — a title of honor, used here as the sharpest form of accusation. Your family was righteous. Your father was good. Your mother was pure. And you have done this. The implication is: you have failed the standard of everyone who came before you. The community is not merely condemning her act; it is measuring the distance between her ancestry and what they see.</p>

  <p>This is the accusation designed to break someone: you are a disgrace to people who cannot defend themselves from disgrace-by-association. It enlists the honor of the dead as a weapon against the living. Maryam says nothing.</p>

  <h2>The Gesture</h2>

  <blockquote class="ayah-quote" data-ayah="19:29">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:29 -->فَأَشَارَتْ إِلَيْهِ ۖ قَالُوا۟ كَيْفَ نُكَلِّمُ مَن كَانَ فِى ٱلْمَهْدِ صَبِيًّا</p>
    <p class="translation">"She pointed to him. They said: How can we speak to one who is in the cradle, an infant?"</p>
    <cite>Surah Maryam (19:29)</cite>
  </blockquote>

  <p>Four Arabic words: <strong>fa'asharat ilayhi</strong> — so she pointed to him. After the accusations, after the community's judgment of her family, after everything — four words. One gesture. She points to the baby.</p>

  <p>The community's response reveals what they understood her to be doing: "How can we speak to one who is in the cradle?" They hear the pointing as a redirection — she is telling them to ask the infant. This is either absurd or unprecedented. They know it is unprecedented. And so they ask the rhetorical question that precedes the miracle: how can we speak to an infant?</p>

  <blockquote class="ayah-quote" data-ayah="19:30">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:19:30 -->قَالَ إِنِّى عَبْدُ ٱللَّهِ ءَاتَىٰنِىَ ٱلْكِتَـٰبَ وَجَعَلَنِى نَبِيًّا</p>
    <p class="translation">"He said: I am the servant of Allah. He has given me the Book and made me a prophet."</p>
    <cite>Surah Maryam (19:30)</cite>
  </blockquote>

  <p>The baby speaks. The first words of Isa in the Quran are <strong>inni 'abdu Allah</strong> — I am the servant of Allah. Not: I am the son of the woman you are accusing. Not: she is innocent. The first declaration is theological: I am a servant. Everything else follows from this. He then announces his prophetic mission, blesses his mother, and extends salutation to himself on the day of birth, death, and resurrection (19:33). The baby's speech is the vindication that Maryam's silence made possible.</p>

  <h2>The Theology of Pointing</h2>

  <p>What Maryam demonstrates in this exchange is one of the Quran's most compressed theological postures: the willingness to let the sign speak when words are insufficient. She could have tried to explain. She could have wept. She could have appealed to their sympathy. She pointed. And pointing — in this case — was the only move that could produce the miracle, because the miracle required the question. The community had to ask "how can we speak to an infant?" before the infant could answer.</p>

  <p>Her silence created the space for the sign. If she had spoken, the conversation would have continued at the human level — accusation, defense, counter-argument. By pointing, she moved the conversation to a different level entirely: you are asking me to justify the unjustifiable; I am asking you to speak to the one who can.</p>

  <p>The vow of silence, given to her before the encounter, was divine preparation for this precise moment. She was not silenced by fear or by the accusation. She was silenced by a prior commitment to the Merciful. This is the posture the Quran calls tawakkul at its summit: you have done what you can do, you have been truthful before Allah, and now you point to the sign and trust that what Allah has prepared will speak for itself.</p>
</article>`
    }
  },

  // Article 4: Al-Siddiqah
  {
    primaryEntity: MARYAM_ID,
    secondaryEntities: [ISA_ID, ASIYA_ID],
    article: {
      title: "Al-Siddiqah: The Name the Quran Gives Maryam",
      slug: "al-siddiqah-the-name-the-quran-gives-maryam",
      type: 'article',
      excerpt: "In 5:75, the Quran introduces Maryam with a single descriptor: siddiqah — one of the profoundly truthful. Not prophetess. Not saint. Truthful. It is the highest human title below prophethood, shared by Abu Bakr in its masculine form. Why this word for this woman?",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['maryam', 'quranic-characters', 'isa', 'asiya'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">In Surah Al-Ma'idah, the Quran presents an argument against the deification of Isa — and in the middle of that argument, introduces Maryam with one word. Not her purity, not her miracles, not her surah. One word: <strong>ṣiddīqa</strong>. "His mother was ṣiddīqa." The word is chosen from among all the possible descriptions of her life and character, and the choice is theological. It is not the word for a saint. It is not the word for a prophetess. It is the word for a person whose inner life and outer life are in complete correspondence with divine truth — and it is the highest human station below prophethood.</p>

  <h2>The Verse</h2>

  <blockquote class="ayah-quote" data-ayah="5:75">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:5:75 -->مَّا ٱلْمَسِيحُ ٱبْنُ مَرْيَمَ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ ٱلرُّسُلُ وَأُمُّهُۥ صِدِّيقَةٌ ۖ كَانَا يَأْكُلَانِ ٱلطَّعَامَ ۗ ٱنظُرْ كَيْفَ نُبَيِّنُ لَهُمُ ٱلْـَٔايَـٰتِ ثُمَّ ٱنظُرْ أَنَّىٰ يُؤْفَكُونَ</p>
    <p class="translation">"The Messiah, son of Maryam, was no more than a messenger; messengers had passed away before him. And his mother was a ṣiddīqa. They both used to eat food."</p>
    <cite>Surah Al-Ma'idah (5:75)</cite>
  </blockquote>

  <p>The verse is an argument from the nature of things: messengers are finite; they came before; his mother is described not as divine but as a truthful woman; they both ate food — which is the most basic marker of creatureliness. Two entities who eat are not God. And between the mention of his prophethood and the mention of their shared eating, the Quran inserts: <strong>wa ummuhu ṣiddīqatun</strong> — his mother was a ṣiddīqa.</p>

  <p>The word is not incidental. The Quran could have said she was a believer (<strong>mu'mina</strong>), a worshipper (<strong>'abida</strong>), a pious woman (<strong>ṣāliha</strong>). It chose <strong>ṣiddīqa</strong> — the female form of <strong>ṣiddīq</strong>, the title given to Abu Bakr by the Prophet ﷺ when Abu Bakr believed the Night Journey without hesitation. The two most honored bearers of this root-title in Islamic tradition are a companion of the Prophet and the mother of the prophet before him.</p>

  <h2>The Root</h2>

  <p>The root <strong>ṣ-d-q</strong> carries the meaning of solidity, weight, and correspondence. A stone described as <strong>ṣadīq</strong> is dense, impenetrable. Truth is <strong>ṣādiq</strong> when it holds — when the inside and the outside match, when the claim and the reality are the same thing. A <strong>ṣiddīq</strong> is not merely someone who speaks truth. It is someone in whom truth has become a structural quality — someone whose inner life, outer life, and relationship with Allah are in complete correspondence.</p>

  <p>This definition illuminates why the Quran chose it for Maryam. Her entire story is a story of correspondence: what she knew privately (the angel's announcement, the virginal conception, the divine plan) was what her community, eventually, had to accept publicly. She did not distort the truth for social survival. She did not claim what was false. She pointed to the infant and let the evidence speak. The truth she carried — which was the most difficult kind of truth to carry, the kind that looks like its opposite — remained intact through every pressure. That is ṣidq. That is why she is ṣiddīqa.</p>

  <h2>The Universal Model</h2>

  <blockquote class="ayah-quote" data-ayah="66:12">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:66:12 -->وَمَرْيَمَ ٱبْنَتَ عِمْرَٰنَ ٱلَّتِىٓ أَحْصَنَتْ فَرْجَهَا فَنَفَخْنَا فِيهِ مِن رُّوحِنَا وَصَدَّقَتْ بِكَلِمَـٰتِ رَبِّهَا وَكُتُبِهِۦ وَكَانَتْ مِنَ ٱلْقَـٰنِتِينَ</p>
    <p class="translation">"And Maryam, the daughter of 'Imran, who guarded her chastity, and We breathed into it from Our spirit. And she believed in the words of her Lord and His books, and was of the devoutly obedient."</p>
    <cite>Surah At-Tahrim (66:12)</cite>
  </blockquote>

  <p>In Surah At-Tahrim, where the Quran presents Maryam alongside Asiya as <strong>mathal</strong> — an example — for all who believe, the description develops. She guarded her chastity (<strong>ahṣanat farjahā</strong>). Allah breathed into her from His spirit. She <strong>ṣaddaqat bi-kalimāti rabbihā wa kutubihi</strong> — she believed in the words of her Lord and His books. The verb is from the same root as <strong>ṣiddīqa</strong>: she did ṣidq in relation to divine speech. Not merely listened, not merely obeyed — believed with the solidity of correspondence. And she was of the <strong>qānitīn</strong> — the devoutly obedient — in the masculine plural form that includes her among all those who render complete obedience, without a gendered category.</p>

  <p>The title ṣiddīqa, then, is a summary of her entire orientation. She received the most extraordinary announcement in human history, asked how, heard "so it will be — easy for your Lord," and believed. She went alone into labor, asked to disappear, received provision and strategy instead, ate and drank and let her eyes be comforted. She carried the infant to her community, made no defense, pointed, and trusted the sign to speak. From beginning to end, her inner state — belief in the divine word — corresponded perfectly to her outer action. That is ṣidq. That is why this is her name.</p>

  <h2>Why Not Prophetess</h2>

  <p>Some scholars — including Ibn Hazm — argued that Maryam was a prophetess: the angel gave her direct revelation, she was addressed by name by the angel (a mark of honor given to prophets), and she received divine instruction at the moment of birth. Most classical scholars held that prophethood was specific to the mission of conveying to a community, and designated her ṣiddīqa instead.</p>

  <p>The theological importance of this debate aside, the title ṣiddīqa may capture something more essential about her role. A prophet has a message to deliver. Maryam's role was to receive a person — to be the vessel through whom Isa entered the world. The quality required for this was not prophetic mission but the kind of truthful interior alignment that ṣidq names. She did not need to argue. She did not need to proclaim. She needed to be so completely in correspondence with divine truth that the divine sign could work through her without distortion. For that, ṣiddīqa is exactly right.</p>
</article>`
    }
  }
]

async function main() {
  console.log('Inserting Maryam articles...')

  for (const { article, primaryEntity, secondaryEntities } of articles) {
    const { data: post, error } = await supabase
      .from('posts')
      .insert(article)
      .select('id, title')
      .single()

    if (error) {
      console.error(`Failed: "${article.title}":`, error.message)
      continue
    }

    console.log(`✓ "${post.title}"`)

    await supabase
      .from('entity_tags')
      .insert({ post_id: post.id, entity_id: primaryEntity, is_primary: true })

    for (const secId of secondaryEntities) {
      await supabase
        .from('entity_tags')
        .insert({ post_id: post.id, entity_id: secId, is_primary: false })
    }
  }

  await supabase.rpc('refresh_entity_co_occurrence')
  console.log(`\n✓ Done! ${articles.length} articles inserted.`)
}

main().catch(console.error)
