import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';

// Entity IDs (from DB query)
const YUSUF_ID    = 'ce7c797b-ae5f-4a6d-8d2d-5a54b43ae5e4';
const MUSA_ID     = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa';
const AYYUB_ID    = 'e070047b-c83a-481d-a68a-d9c7892996af';
const YUNUS_ID    = '949fd304-2b32-4d28-8556-bfc69f8bdf41';
const MARYAM_ID   = '6ce90516-9141-476e-8f4a-bb50e1e77925';
const IBRAHIM_ID  = 'dc5cd1d2-00d3-482d-bdcd-2d20344e7838';
const FIRAUN_ID   = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861';
const SABR_ID     = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49';
const RAHMAH_ID   = '21c6143a-7e57-4e8c-92ea-66415f5d4da7';
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a';

const articles = [

  // ── ARTICLE 1: Yusuf and Musa — Mirror Lives ──────────────────────────────
  {
    post: {
      title: "Yusuf and Musa: The Mirror Lives the Quran Places Side by Side",
      slug: "yusuf-musa-mirror-lives-quran",
      type: 'article',
      excerpt: "The Quran's two most detailed biographies share an architecture no verse names explicitly — water at the start, the enemy's palace, accusation, exile, and a return in which the one who was thrown away becomes the one who saves.",
      seo_title: "Yusuf and Musa: Parallel Lives in the Quran",
      seo_description: "The Quran tells two prophetic biographies with identical architecture — water, palace, accusation, exile, return. A close reading of their hidden parallels.",
      reading_time_minutes: 10,
      status: 'published',
      featured: false,
      tags: ['yusuf', 'musa', 'quranic-characters', 'prophets', 'cross-story', 'quran-parallels'],
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">

  <p class="text-lg leading-relaxed">The Quran tells two lives in unusual detail. <a href="/hub/yusuf">Yusuf</a>'s story fills a single surah — Surah Yusuf, from childhood to old age, with almost no interruption. <a href="/hub/musa">Musa</a>'s biography is distributed across seven surahs, each taking a different moment, each bending the story toward a different argument. One is concentrated; the other is dispersed. Yet when you place them side by side, the two lives share an architecture so precise it cannot be accidental: water at the beginning, the enemy's palace in the middle, false accusation, exile, and a return in which the one who was thrown away becomes the one who saves.</p>

  <h2>Water at the Start</h2>

  <p>Both stories begin with a child entering water against his will. Yusuf's brothers lower him into a well — <em>ghayabat al-jubb</em>, the dark interior of the pit. Musa's mother places him in a chest and releases him into the Nile. The Quran records both acts in similar grammar: in each case, a family member acts on a divine plan they cannot yet see, and a child disappears into water.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا ذَهَبُوا۟ بِهِۦ وَأَجْمَعُوٓا۟ أَن يَجْعَلُوهُ فِى غَيَـٰبَتِ ٱلْجُبِّ ۚ وَأَوْحَيْنَآ إِلَيْهِ لَتُنَبِّئَنَّهُم بِأَمْرِهِمْ هَـٰذَا وَهُمْ لَا يَشْعُرُونَ</p>
    <p class="translation">"So when they took him and agreed to put him at the bottom of the well — We revealed to him: 'You will surely inform them of this deed of theirs while they do not perceive.'"</p>
    <cite>Surah Yusuf (12:15)</cite>
  </blockquote>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَنِ ٱقْذِفِيهِ فِى ٱلتَّابُوتِ فَٱقْذِفِيهِ فِى ٱلْيَمِّ فَلْيُلْقِهِ ٱلْيَمُّ بِٱلسَّاحِلِ يَأْخُذْهُ عَدُوٌّ لِّى وَعَدُوٌّ لَّهُۥ</p>
    <p class="translation">"Cast him into the chest and cast it into the river, and the river will throw it onto the bank — there will take him an enemy to Me and an enemy to him."</p>
    <cite>Surah Ta-Ha (20:39)</cite>
  </blockquote>

  <p>The difference is who acts. Yusuf's brothers throw him into the well out of jealousy — their act is hostile, and the revelation arrives despite them, not through them. Musa's mother places him in the river on divine instruction — her act is obedient, and the revelation precedes the separation. In Yusuf's case, the hostile act is converted into a divine plan retroactively: God sends the revelation <em>after</em> the brothers act. In Musa's case, the mother is told what will happen before she lets go. Both children enter water. Both arrive at the enemy's house. The route is different; the destination is the same.</p>

  <h2>The Enemy's Palace</h2>

  <p>Both children end up in Egyptian palaces belonging to men who hold power over their lives. Yusuf is purchased by the <em>'Aziz</em> of Egypt — a man who tells his wife to honor the boy, hoping he will be useful or adopted. Musa is picked up by the household of <a href="/hub/firaun">Fir'awn</a> — the man actively killing the sons of Bani Isra'il.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَقَالَ ٱلَّذِى ٱشْتَرَىٰهُ مِن مِّصْرَ لِٱمْرَأَتِهِۦٓ أَكْرِمِى مَثْوَىٰهُ عَسَىٰٓ أَن يَنفَعَنَآ أَوْ نَتَّخِذَهُۥ وَلَدًا ۚ وَكَذَٰلِكَ مَكَّنَّا لِيُوسُفَ فِى ٱلْأَرْضِ</p>
    <p class="translation">"And the one who bought him from Egypt said to his wife: 'Make his stay comfortable — perhaps he will benefit us, or we will adopt him as a son.' And thus We established Yusuf in the land."</p>
    <cite>Surah Yusuf (12:21)</cite>
  </blockquote>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَٱلْتَقَطَهُۥٓ ءَالُ فِرْعَوْنَ لِيَكُونَ لَهُمْ عَدُوًّا وَحَزَنًا</p>
    <p class="translation">"And the family of Fir'awn picked him up — so that he would become for them an enemy and a source of grief."</p>
    <cite>Surah Al-Qasas (28:8)</cite>
  </blockquote>

  <p>The Quran frames the two arrivals with commentary that faces in opposite directions. For Yusuf, the commentary faces forward: <em>makkanna li-Yusuf fi al-ard</em> — We established him in the land. God names His own hand in the placement. For Musa, the commentary is ironic: <em>li-yakuna lahum 'aduwwan wa hazanan</em> — so that he would become their enemy and grief. The family takes in the child who will undo them. Both commentaries say the same thing from different angles: the palace that shelters the child is serving a plan it does not understand.</p>

  <p>The phrase <em>'asa an yanfa'ana aw nattakhidhahu waladan</em> — perhaps he will benefit us, or we will adopt him — appears in near-identical form in both stories. The 'Aziz says it about Yusuf. Fir'awn's wife says it about Musa (28:9). Two Egyptian households, two foundlings, the same sentence of conditional adoption. The Quran repeats the phrase as though marking a structural rhyme.</p>

  <h2>Accusation and Enclosure</h2>

  <p>Both prophets face a crisis in Egypt that removes them from public life. Yusuf is accused by the 'Aziz's wife after refusing her advances. The evidence clears him — the shirt torn from behind, the witness's judgment — but the household decides to imprison him anyway:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">ثُمَّ بَدَا لَهُم مِّنۢ بَعْدِ مَا رَأَوُا۟ ٱلْـَٔايَـٰتِ لَيَسْجُنُنَّهُۥ حَتَّىٰ حِينٍ</p>
    <p class="translation">"Then it occurred to them, after they had seen the signs, that they should imprison him for a time."</p>
    <cite>Surah Yusuf (12:35)</cite>
  </blockquote>

  <p>Musa kills a man — an Egyptian who is striking an Israelite — and the death becomes a warrant. He hears that the authorities are deliberating, and he leaves the city before they find him:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَخَرَجَ مِنْهَا خَآئِفًا يَتَرَقَّبُ ۖ قَالَ رَبِّ نَجِّنِى مِنَ ٱلْقَوْمِ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"So he left it, fearful and looking about. He said: 'My Lord, save me from the wrongdoing people.'"</p>
    <cite>Surah Al-Qasas (28:21)</cite>
  </blockquote>

  <p>Prison and exile perform the same structural function: the prophet is removed from the Egyptian setting and enters a period of hiddenness. Yusuf sits in prison for years — the Quran says <em>bid'a sinin</em>, several years (12:42). Musa arrives in Madyan and works for a decade. Both vanish from the narrative stage that produced them. Both re-emerge transformed: Yusuf as the trusted interpreter of dreams, then as governor; Musa as a prophet carrying a divine commission back into the palace that raised him.</p>

  <h2>The Return</h2>

  <p>The reversals mirror each other. Yusuf's brothers — the ones who threw him into the well — come to him in Egypt during a famine. They stand before him and do not recognize him. He recognizes them instantly. The asymmetry is total: the one who was abandoned holds the food supply; the ones who abandoned him are reduced to asking.</p>

  <p>Musa returns to Egypt as a prophet. He walks into Fir'awn's court — the same palace where he was raised — and delivers a message the court cannot receive. The household that picked him from the river to raise him as their own now faces him as their adversary. The Quran's earlier commentary — <em>li-yakuna lahum 'aduwwan wa hazanan</em> — reaches its fulfillment.</p>

  <p>In both returns, the Quran foregrounds recognition and its failure. Yusuf's brothers see him but cannot place him: the child they discarded has become someone they depend on. Fir'awn's court sees Musa but cannot accept what he represents: the foundling they raised is the instrument of their ruin. The person who was most vulnerable has become the one the powerful must answer to.</p>

  <h2>What the Quran Promises at the Start</h2>

  <p>The deepest parallel is theological. Both prophets receive a promise at the moment of maximum helplessness — before the road is visible, before the palace, the exile, or the return.</p>

  <p>Yusuf, at the bottom of the well, receives wahy: <em>la-tunabbiyannahum bi-amrihim hadha wa hum la yash'urun</em> — you will inform them of this deed while they do not perceive. The destination is revealed before the route. He knows nothing of the caravan, the sale, the palace, the prison, the dream, or the famine. He knows only: you will face them again, and they will not know it is you.</p>

  <p>Musa's mother, casting her son into the river, receives a promise: <em>inna raddduhu ilayki wa ja'iluhu min al-mursalin</em> — We will return him to you, and We will make him one of the messengers (28:7). The return and the mission are named before the child reaches the opposite bank. She does not know about the palace, the exile, the burning bush, or the sea. She knows only: he will come back, and he will be sent.</p>

  <p>This is the Quran's theology of foreknowledge enacted in narrative. The promise is given at the point where evidence suggests the opposite. A child in a pit is told about his future authority. A mother releasing her child into a river is told about his return. The gap between the promise and its fulfillment — years, decades, the entire middle section of the story — is where the trial lives. The Quran shows the endpoints and compresses the road between them, as though to say: the suffering is real, but the arc was known from the beginning.</p>

  <h2>The Architecture That Was Always There</h2>

  <p>The Quran never says: Yusuf and Musa lived parallel lives. It places them in different surahs, told in different forms — one concentrated, one distributed — and leaves the reader to see the geometry.</p>

  <p>Water. Palace. Accusation. Enclosure. Return. Promise at the lowest point. These are structural decisions made by a text that tells the story of <a href="/hub/ibrahim">Ibrahim</a>'s descendants across dozens of surahs and allows the architecture to speak for itself. The mirror was always there. The Quran trusts the reader to hold both stories at once and see what connects them.</p>

</article>`
    },
    entityTags: [
      { entityId: YUSUF_ID, is_primary: true },
      { entityId: MUSA_ID, is_primary: true },
      { entityId: FIRAUN_ID, is_primary: false },
      { entityId: IBRAHIM_ID, is_primary: false },
      { entityId: SABR_ID, is_primary: false },
      { entityId: TAWAKKUL_ID, is_primary: false },
    ],
  },

  // ── ARTICLE 2: The Two Complaints — Ayyub and Yunus ───────────────────────
  {
    post: {
      title: "The Two Complaints the Quran Records: Ayyub and Yunus",
      slug: "ayyub-yunus-two-complaints-quran",
      type: 'article',
      excerpt: "In Surah Al-Anbiya, the Quran places two cries four ayahs apart — one from a man on his bed after years of illness, the other from a man inside a fish. Neither asks to be rescued. Both are answered immediately.",
      seo_title: "Ayyub and Yunus: The Two Complaints in the Quran",
      seo_description: "Two prophets cry out to Allah four ayahs apart in Surah Al-Anbiya — neither asks for rescue. A close reading of their du'as and what the Quran answers.",
      reading_time_minutes: 9,
      status: 'published',
      featured: false,
      tags: ['ayyub', 'yunus', 'dua', 'quranic-characters', 'prophets', 'cross-story'],
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">

  <p class="text-lg leading-relaxed">In Surah Al-Anbiya, the Quran places two cries four ayahs apart. The first belongs to <a href="/hub/ayyub">Ayyub</a>, calling from his bed after years of illness. The second belongs to <a href="/hub/yunus">Yunus</a>, calling from inside a fish in the dark of the sea. Both are desperate. Both are prophets at the edge of endurance. And both say something the reader might not expect: neither one asks to be rescued.</p>

  <h2>Ayyub's Words</h2>

  <p>The Quran records Ayyub's complaint in a single verse. After what classical commentators describe as years of physical suffering — his body, his wealth, his family diminished — he turns to God:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ أَنِّى مَسَّنِىَ ٱلضُّرُّ وَأَنتَ أَرْحَمُ ٱلرَّٰحِمِينَ</p>
    <p class="translation">"And [mention] Ayyub, when he called to his Lord: 'Indeed, harm has touched me, and You are the most merciful of the merciful.'"</p>
    <cite>Surah Al-Anbiya (21:83)</cite>
  </blockquote>

  <p>Two clauses. The first is a description of his condition: <em>anni massaniya al-durr</em> — harm has touched me. The verb <em>massa</em> means to touch, to make contact. Ayyub does not say harm has consumed him, overwhelmed him, or destroyed him. He says it has <em>touched</em> him. Years of affliction compressed into a verb that connotes the lightest possible contact — a brush, a graze. The understatement is the du'a's architecture: a man who has suffered for years chooses the gentlest verb available.</p>

  <p>The second clause is an attribution: <em>wa anta arham al-rahimin</em> — and You are the most merciful of the merciful. He describes his state and names God's attribute, and the du'a ends. The space between the two clauses — between "I am in pain" and "You are the most merciful" — is where the request lives, but Ayyub leaves it unvoiced. He lets the gap do the asking.</p>

  <h2>What Allah Answers</h2>

  <p>The Quran records the response in the very next verse:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَٱسْتَجَبْنَا لَهُۥ فَكَشَفْنَا مَا بِهِۦ مِن ضُرٍّ ۖ وَءَاتَيْنَـٰهُ أَهْلَهُۥ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَـٰبِدِينَ</p>
    <p class="translation">"So We responded to him and removed the harm that was upon him. And We gave him back his family and the like of them with them — a mercy from Us and a reminder for the worshippers."</p>
    <cite>Surah Al-Anbiya (21:84)</cite>
  </blockquote>

  <p><em>Fa-stajabna lahu</em> — so We responded to him. The <em>fa</em> is immediate, consecutive: he called, so We responded. The Quran collapses the timeline between the cry and the relief into a single conjunction. And the response exceeds the request — it does not merely remove the harm but restores what was lost and doubles it: <em>wa ataynahu ahlahu wa mithlahum ma'ahum</em>, his family and the like of them with them. The restoration surpasses the loss.</p>

  <h2>Yunus's Words</h2>

  <p>Four ayahs later — after brief mentions of Isma'il, Idris, and Dhul-Kifl — the Quran turns to Yunus. He has already left his people in anger, already been thrown from the ship, already been swallowed by the fish. The Quran names him by his epithet:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"And [mention] the one of the fish, when he went off in anger and thought that We would not decree upon him. Then he called out in the darknesses: 'There is no deity except You; glory be to You. Indeed, I was among the wrongdoers.'"</p>
    <cite>Surah Al-Anbiya (21:87)</cite>
  </blockquote>

  <p>Yunus's du'a has three parts. The first is a declaration of tawhid: <em>la ilaha illa anta</em> — there is no god but You. The second is glorification: <em>subhanaka</em> — glory be to You, You are above all imperfection. The third is confession: <em>inni kuntu min al-zalimin</em> — I was among the wrongdoers.</p>

  <p>Like Ayyub, Yunus does not ask for rescue. He does not say: remove me from this fish, return me to shore, let me breathe. He testifies, glorifies, and confesses. The du'a is shaped as a <em>shahadah</em> of sorts — a declaration of who God is and what Yunus has done. The fish, the darkness, the ocean floor: none of it enters the words. Yunus speaks as though the circumstances are irrelevant to what needs to be said.</p>

  <h2>The Response, Again Immediate</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ</p>
    <p class="translation">"So We responded to him and saved him from the distress. And thus do We save the believers."</p>
    <cite>Surah Al-Anbiya (21:88)</cite>
  </blockquote>

  <p>The same <em>fa-stajabna lahu</em> — so We responded to him. The same immediate conjunction. The same collapsed timeline between cry and answer. But the closing is different. Ayyub's response concludes with <em>dhikra lil-'abidin</em> — a reminder for the worshippers. Yunus's concludes with <em>wa kadhalika nunji al-mu'minin</em> — and thus do We save the believers. The first points backward: remember this. The second points outward: this pattern extends to all believers. Ayyub's story is a lesson in retrospect. Yunus's story is a promise in the present tense.</p>

  <h2>What the Two Complaints Share</h2>

  <p>Neither du'a contains a request. This is the fact the Quran places four ayahs apart and expects the reader to notice. Ayyub describes his condition and names God's <a href="/hub/rahmah">mercy</a>. Yunus declares God's oneness and names his own wrongdoing. Both speak <em>to</em> God rather than <em>asking</em> God. And both receive the same verb in response: <em>istajabna</em> — We responded. The Quran treats both as requests even though neither is grammatically shaped as one.</p>

  <p>The word <em>istajaba</em> means to respond to a call, to answer a plea. The Quran applies it to utterances that contain no plea. This suggests something about what the Quran considers a du'a: the honest acknowledgment of one's condition before God is itself the petition. The act of turning — <em>nada rabbahu</em>, he called upon his Lord — is the request, regardless of what words follow. Ayyub's understatement and Yunus's confession are both recognized by God as cries for help, because they are.</p>

  <h2>The Difference Between Them</h2>

  <p>Ayyub suffered without fault. The Quran presents his affliction as a test — his <a href="/hub/sabr">sabr</a> is endurance in the face of loss he did not cause. When he finally spoke, he spoke with restraint — <em>massa</em>, touched, a verb that minimizes. His du'a faces God's attribute: You are the most merciful.</p>

  <p>Yunus left his people in anger — <em>dhahaba mughadiban</em> — and the Quran says he thought God would not decree upon him. His situation in the fish is a consequence: he left before he was released from his mission. His du'a faces his own failing: <em>inni kuntu min al-zalimin</em>, I was among the wrongdoers. Where Ayyub's du'a is defined by what he says about God, Yunus's is defined by what he says about himself.</p>

  <p>The Quran answers both. It answers the man who endured for years and the man who walked away. The verb is the same. The immediacy is the same. The restoration is the same. What the two complaints placed side by side demonstrate is that God's response to the sincere cry is not calibrated to the caller's moral standing at the moment of calling. It is calibrated to the sincerity of the turn — <em>nada</em>, he called — and both calls are sincere.</p>

  <p>Surah Al-Anbiya clusters these two scenes among a rapid sequence of prophetic portraits — <a href="/hub/ibrahim">Ibrahim</a>, Lut, <a href="/hub/musa">Musa</a>, Harun, and others pass through in quick succession. The surah is a gallery of prophetic moments, each compressed to its essence. That it places Ayyub and Yunus almost consecutively, with the same response verb and the same immediate divine answer, is the surah composing a theology of du'a through juxtaposition. It does not explain the comparison. It performs it.</p>

</article>`
    },
    entityTags: [
      { entityId: AYYUB_ID, is_primary: true },
      { entityId: YUNUS_ID, is_primary: true },
      { entityId: RAHMAH_ID, is_primary: false },
      { entityId: SABR_ID, is_primary: false },
      { entityId: IBRAHIM_ID, is_primary: false },
      { entityId: MUSA_ID, is_primary: false },
    ],
  },

  // ── ARTICLE 3: Maryam and the Mother of Musa ──────────────────────────────
  {
    post: {
      title: "Maryam and the Mother of Musa: Two Women, Two Commands, One Pattern",
      slug: "maryam-umm-musa-two-commands-quran",
      type: 'article',
      excerpt: "The Quran tells two stories about a woman alone with a child and a divine command she cannot refuse — throw your son into the river, shake the trunk of the palm tree. Both commands are impossible. Both promises are kept.",
      seo_title: "Maryam and Musa's Mother: Two Commands in the Quran",
      seo_description: "Two women receive impossible divine commands — cast your son into the river, shake the palm tree in labor. How the Quran pairs their stories across surahs.",
      reading_time_minutes: 10,
      status: 'published',
      featured: false,
      tags: ['maryam', 'musa', 'quranic-characters', 'women-in-quran', 'cross-story', 'rahmah'],
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">

  <p class="text-lg leading-relaxed">The Quran tells two stories about a woman alone with a child and a divine command she cannot refuse. <a href="/hub/maryam">Maryam</a>, unmarried and in labor, is told to shake the trunk of a dead palm tree. The mother of <a href="/hub/musa">Musa</a>, nursing her infant under a state-sponsored killing decree, is told to cast her son into the river. Both commands are impossible in the ordinary sense: a woman in labor cannot shake a tree; a mother cannot throw her child into water. The Quran gives both women the command and records what happened to them after they obeyed.</p>

  <h2>The Command to the Mother of Musa</h2>

  <p>The Quran uses the verb <em>awhayna</em> — We inspired, We revealed — for the instruction given to Musa's mother. This is the same verb used for prophetic revelation:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَوْحَيْنَآ إِلَىٰٓ أُمِّ مُوسَىٰٓ أَنْ أَرْضِعِيهِ ۖ فَإِذَا خِفْتِ عَلَيْهِ فَأَلْقِيهِ فِى ٱلْيَمِّ وَلَا تَخَافِى وَلَا تَحْزَنِى ۖ إِنَّا رَآدُّوهُ إِلَيْكِ وَجَاعِلُوهُ مِنَ ٱلْمُرْسَلِينَ</p>
    <p class="translation">"And We inspired to the mother of Musa: 'Nurse him, and when you fear for him, cast him into the river. And do not fear and do not grieve — indeed, We will return him to you and make him one of the messengers.'"</p>
    <cite>Surah Al-Qasas (28:7)</cite>
  </blockquote>

  <p>The command has five parts. Nurse him. When you fear for him, cast him into the river. Do not fear. Do not grieve. We will return him to you and make him a messenger. The first instruction is natural — <em>ardi'ihi</em>, nurse him. The second is its apparent negation — <em>fa-alqihi fi al-yamm</em>, cast him into the sea. The verb <em>alqa</em> means to throw, to hurl. The Quran does not soften it: this is not "place him gently" or "set him in a basket." The verb is violent. She is told to throw her child into the river after nursing him.</p>

  <p>Between the violent command and the promise, God inserts two prohibitions: <em>wa la takhafi wa la tahzani</em> — do not fear and do not grieve. Fear (<em>khawf</em>) faces forward — what might happen. Grief (<em>huzn</em>) faces backward — what has already been lost. The Quran addresses both temporal directions of her suffering. Then it makes the promise: <em>inna radduhu ilayki</em> — We will return him to you. The active participle <em>radduhu</em> carries certainty: this is a declared intention, not a possibility.</p>

  <h2>The Command to Maryam</h2>

  <p>Maryam's crisis is different in kind but identical in structure. She has withdrawn from her people, alone, and labor pains drive her to the trunk of a palm tree:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَجَآءَهَا ٱلْمَخَاضُ إِلَىٰ جِذْعِ ٱلنَّخْلَةِ قَالَتْ يَـٰلَيْتَنِى مِتُّ قَبْلَ هَـٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا</p>
    <p class="translation">"And the pains of labor drove her to the trunk of a palm tree. She said: 'Oh, I wish I had died before this and been a thing forgotten, completely forgotten.'"</p>
    <cite>Surah Maryam (19:23)</cite>
  </blockquote>

  <p>The word <em>nasyan mansiyyan</em> — a forgotten thing, completely forgotten — is an intensified form. <em>Nasyan</em> alone means something forgotten. <em>Mansiyyan</em> adds the passive participle: forgotten by everyone. Maryam wishes for erasure at her lowest moment. This is the only time in the Quran a righteous person expresses a wish for death — not as surrender to God but as escape from the situation.</p>

  <p>A voice calls from beneath her — whether the newborn or an angel is a matter of scholarly discussion — with instructions:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَنَادَىٰهَا مِن تَحْتِهَآ أَلَّا تَحْزَنِى قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا ﴿٢٤﴾ وَهُزِّىٓ إِلَيْكِ بِجِذْعِ ٱلنَّخْلَةِ تُسَـٰقِطْ عَلَيْكِ رُطَبًا جَنِيًّا</p>
    <p class="translation">"Then he called to her from below her: 'Do not grieve; your Lord has provided beneath you a stream. And shake toward you the trunk of the palm tree — it will drop upon you fresh, ripe dates.'"</p>
    <cite>Surah Maryam (19:24-25)</cite>
  </blockquote>

  <p>The same prohibition appears: <em>alla tahzani</em> — do not grieve. The same word, <em>huzn</em>, addressed to Maryam just as it was addressed to Musa's mother. Then the impossible instruction: <em>wa huzzi ilayki bi-jidh'i al-nakhlah</em> — shake toward you the trunk of the palm tree. A woman in labor, alone, at the moment she has just wished for death, is told to shake a tree trunk. The physical impossibility mirrors the impossible command to Musa's mother: both women are told to do something that contradicts the most basic instinct — one to throw her child into danger, the other to exert strength she does not have.</p>

  <h2>The Near-Breaking</h2>

  <p>The Quran records a moment of near-collapse for each woman. Maryam speaks her wish for death aloud — <em>ya laytani mittu qabla hadha</em>. She does not suppress the thought. The Quran preserves it as spoken.</p>

  <p>Musa's mother experiences something the Quran describes with unusual precision:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَىٰ فَـٰرِغًا ۖ إِن كَادَتْ لَتُبْدِى بِهِۦ لَوْلَآ أَن رَّبَطْنَا عَلَىٰ قَلْبِهَا لِتَكُونَ مِنَ ٱلْمُؤْمِنِينَ</p>
    <p class="translation">"And the heart of the mother of Musa became empty. She was about to disclose him, had We not bound her heart so that she would be of the believers."</p>
    <cite>Surah Al-Qasas (28:10)</cite>
  </blockquote>

  <p>The word <em>farighan</em> — empty — describes her heart after she has released her son. The Quran says her <em>fu'ad</em>, not her <em>qalb</em>. Classical Arabic distinguishes between these: <em>qalb</em> is the heart as seat of understanding and will; <em>fu'ad</em> is the heart as seat of raw emotion, the burning inner core. Her <em>fu'ad</em> became <em>farighan</em> — emptied of everything except the thought of her son. She nearly gave the secret away: <em>kadat la-tubdi bihi</em>, she was about to expose him. The Quran attributes her steadiness not to her own resolve but to divine intervention: <em>lawla an rabatna 'ala qalbiha</em> — had We not tied her heart firm. God binds her heart so she can endure what He commanded her to do.</p>

  <h2>The Promised Return</h2>

  <p>Both promises are kept. Musa's mother is told <em>inna radduhu ilayki</em> — We will return him to you — and the Quran fulfills it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَرَدَدْنَـٰهُ إِلَىٰٓ أُمِّهِۦ كَىْ تَقَرَّ عَيْنُهَا وَلَا تَحْزَنَ وَلِتَعْلَمَ أَنَّ وَعْدَ ٱللَّهِ حَقٌّ وَلَـٰكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ</p>
    <p class="translation">"So We returned him to his mother that her eye might be cooled and she would not grieve, and that she would know that the promise of Allah is true — but most of them do not know."</p>
    <cite>Surah Al-Qasas (28:13)</cite>
  </blockquote>

  <p>The verb <em>radadnahu</em> — We returned him — echoes the promise <em>radduhu</em> with exact correspondence. The purpose clause names three things: <em>kay taqarra 'aynuha</em> (that her eye would be cooled), <em>wa la tahzan</em> (and she would not grieve), <em>wa li-ta'lama anna wa'da Allahi haqq</em> (and that she would know the promise of Allah is true). The Quran makes the emotional restoration explicit: the cooling of the eye, the end of the grief, and the knowledge that what God promised, He delivered.</p>

  <p>Maryam's return is more public and more dangerous. She carries the child back to her people, and they accuse her. The Quran records her response: silence. She points to the baby. And the baby speaks — a miracle that vindicates her without requiring her to explain the unexplainable. Where Musa's mother receives her child back privately, Maryam receives her vindication publicly, through the child himself.</p>

  <h2>The Shared Architecture</h2>

  <p>The Quran uses the same vocabulary, the same prohibitions, and the same narrative structure for two women separated by centuries. <em>La takhafi wa la tahzani</em> / <em>alla tahzani</em> — the same consolation. An impossible command: throw the child into the river; shake the dead tree. A promise that what is lost or endured will produce something beyond what was imaginable: a prophet returned, a baby who speaks from the cradle.</p>

  <p>The Quran pairs these women without ever placing them in the same surah or naming the pattern. Musa's mother appears in Al-Qasas and Ta-Ha. Maryam appears in the surah named after her and in Aal 'Imran. The reader holds both stories separately and discovers the architecture in the space between them: a woman alone, a command from God, the near-breaking, and the return that proves the promise was true.</p>

  <p>What the two stories share at the deepest level is the Quran's insistence that obedience to an impossible command, when the command comes from God, will be met with a restoration that exceeds the sacrifice. The mother who throws her child into the river gets the child back and a prophet. The woman who endures labor alone gets a son who speaks from the cradle and silences her accusers. The Quran tells both stories as evidence that <em>wa'da Allahi haqq</em> — the promise of Allah is true — and uses two women, across two eras, to make the evidence undeniable.</p>

</article>`
    },
    entityTags: [
      { entityId: MARYAM_ID, is_primary: true },
      { entityId: MUSA_ID, is_primary: true },
      { entityId: RAHMAH_ID, is_primary: false },
      { entityId: SABR_ID, is_primary: false },
    ],
  },
];

// ── INSERT LOGIC ──────────────────────────────────────────────────────────────

async function main() {
  console.log(`Inserting ${articles.length} Tier 6 cross-story articles...`);

  for (const article of articles) {
    // Insert post
    const { data: post, error: postErr } = await supabase
      .from('posts')
      .insert(article.post)
      .select('id, title, slug')
      .single();

    if (postErr) {
      console.error(`❌ Failed to insert "${article.post.title}":`, postErr.message);
      continue;
    }
    console.log(`✅ Inserted: "${post.title}" → /posts/${post.slug}`);

    // Tag entities
    for (const tag of article.entityTags) {
      const { error: tagErr } = await supabase.from('entity_tags').insert({
        post_id: post.id,
        entity_id: tag.entityId,
        is_primary: tag.is_primary,
      });
      if (tagErr) {
        console.error(`  ⚠️ Tag error (${tag.entityId}):`, tagErr.message);
      }
    }
    console.log(`  → ${article.entityTags.length} entity tags applied`);
  }

  // Refresh co-occurrence
  console.log('\nRefreshing entity co-occurrence...');
  const { error: rpcErr } = await supabase.rpc('refresh_entity_co_occurrence');
  if (rpcErr) {
    console.error('⚠️ Co-occurrence refresh failed:', rpcErr.message);
  } else {
    console.log('✅ Co-occurrence refreshed');
  }

  console.log('\nDone!');
}

main();
