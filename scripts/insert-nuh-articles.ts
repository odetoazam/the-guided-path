import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const NUH_ID        = 'c45f9810-e8ee-43cb-9cb5-a810245159df';
const SABR_ID       = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49';
const TAWAKKUL_ID   = '547e36b8-aa55-4c03-a139-cd94f1df456a';

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "950 Years: What the Quran Preserves of a Prophet's Report",
      slug: "950-years-what-the-quran-preserves-of-a-prophets-report",
      type: 'article',
      excerpt: "In Surah Nuh, the prophet reports to his Lord after 950 years of calling. The report is not to us. It is a private accounting — what he tried, what his people did, and what it felt like. The Quran lets us hear it.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['nuh', 'quranic-characters', 'sabr', 'tawakkul'],
      seo_description: "In Surah Nuh, the prophet gives a private account to Allah after 950 years of calling his people. An exploration of what the Quran preserves of persistence, failure, and prophetic grief.",
      content_html: `<article class="prose-blog">

  <p>Surah Nuh is structured as a speech. Nuh is speaking — not to his people, not to us — but to his Lord. The surah opens by telling us God commanded Nuh to warn his people, and then immediately cuts to Nuh's report of everything he did. The sequence matters: we don't see the mission unfold. We hear the accounting after it is over.</p>

  <p>The report covers 950 years in a handful of verses. What did Nuh try? What happened? The Quran preserves the answer not as summary but as direct speech from a prophet to his Lord.</p>

  <h2>Day and Night</h2>

  <blockquote class="ayah-quote" data-ayah="71:5">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:5 -->قَالَ رَبِّ إِنِّى دَعَوْتُ قَوْمِى لَيْلًا وَنَهَارًا</p>
    <p class="translation">"He said: 'My Lord, I have called my people night and day.'"</p>
    <cite>Surah Nuh (71:5)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="71:6">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:6 -->فَلَمْ يَزِدْهُمْ دُعَآءِىٓ إِلَّا فِرَارًا</p>
    <p class="translation">"But my calling only increased them in flight."</p>
    <cite>Surah Nuh (71:6)</cite>
  </blockquote>

  <p>The pairing is precise. <em>Laylan wa naharan</em> — night and day. Not: for a long time. Not: constantly. Night and day, the two poles of time, covering everything in between. He called without rest.</p>

  <p>And then the result: <em>falam yazid-hum du'a'i illa firaran</em>. My calling only added to their flight. The word <em>zada</em> means to increase, to add. The calling was not neutral in its effect — it actively pushed them further away. The more he called, the more they fled. This is the outcome he is reporting to God. Not a complaint exactly. A fact. A precise account of what happened when he obeyed.</p>

  <h2>The Methods</h2>

  <blockquote class="ayah-quote" data-ayah="71:7">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:7 -->وَإِنِّى كُلَّمَا دَعَوْتُهُمْ لِتَغْفِرَ لَهُمْ جَعَلُوٓا۟ أَصَـٰبِعَهُمْ فِىٓ ءَاذَانِهِمْ وَٱسْتَغْشَوْا۟ ثِيَابَهُمْ وَأَصَرُّوا۟ وَٱسْتَكْبَرُوا۟ ٱسْتِكْبَارًا</p>
    <p class="translation">"And indeed, every time I called them so that You might forgive them, they put their fingers in their ears, covered themselves with their garments, persisted, and were arrogant with great arrogance."</p>
    <cite>Surah Nuh (71:7)</cite>
  </blockquote>

  <p>The detail here is extraordinary. They put their fingers in their ears. They pulled their garments over themselves to block their sight of him. The physicality of their rejection — the deliberate stopping of ears, the wrapping of cloth — indicates not passive indifference but active suppression. They had to work to not hear him. And still they persisted, and still they were arrogant.</p>

  <p>Nuh gives God a taxonomy of his approaches:</p>

  <blockquote class="ayah-quote" data-ayah="71:8">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:8 -->ثُمَّ إِنِّى دَعَوْتُهُمْ جِهَارًا</p>
    <p class="translation">"Then I called them publicly."</p>
    <cite>Surah Nuh (71:8)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="71:9">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:9 -->ثُمَّ إِنِّىٓ أَعْلَنتُ لَهُمْ وَأَسْرَرْتُ لَهُمْ إِسْرَارًا</p>
    <p class="translation">"Then I announced to them and I spoke to them privately."</p>
    <cite>Surah Nuh (71:9)</cite>
  </blockquote>

  <p>Public calling. Private calling. Openly proclaimed. Secretly whispered. Every mode he could think of. The report to God is exhaustive precisely because Nuh wants God to know he left nothing untried. He is not defending himself. He is giving a complete account.</p>

  <blockquote class="ayah-quote" data-ayah="71:10">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:71:10 -->فَقُلْتُ ٱسْتَغْفِرُوا۟ رَبَّكُمْ إِنَّهُۥ كَانَ غَفَّارًا</p>
    <p class="translation">"And I said: 'Seek forgiveness of your Lord. Indeed, He is ever Forgiving.'"</p>
    <cite>Surah Nuh (71:10)</cite>
  </blockquote>

  <p>The content of the call was forgiveness. He was not threatening them with punishment in this moment — he was offering them the door. <em>Istagh-firū rabbakum</em> — seek forgiveness of your Lord. The call, at its center, was an invitation to mercy.</p>

  <h2>What a 950-Year Report Looks Like</h2>

  <p>Surah Nuh is a short surah — 28 verses. The entire prophetic mission of 950 years is compressed into this report. The Quran is not interested in the timeline. It is interested in the structure of what happened: the persistence, the methods, the response, and the fact that none of it worked.</p>

  <p>This is the most striking thing about Surah Nuh. It is entirely clear that the mission failed with the people. Almost no one believed. The surah ends with Nuh asking God not to leave a single disbeliever on earth. This is not the triumphant closing of a successful mission. It is the closing prayer of a prophet who gave 950 years and saw almost nothing come of it in his lifetime.</p>

  <p>The Quran does not smooth this over. It lets Nuh's report stand. Night and day. Every method. And still they fled. What is preserved here is not the mythology of prophetic success — it is the actuality of prophetic calling, which often looks like this: complete faithfulness, and no visible result.</p>

</article>`
    },
    primaryEntityId: NUH_ID,
    secondaryEntityIds: [SABR_ID, TAWAKKUL_ID],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Ya Bunayya: The Son Who Wouldn't Board the Ark",
      slug: "ya-bunayya-the-son-who-wouldnt-board-the-ark",
      type: 'article',
      excerpt: "In 11:42-46, Nuh calls to his son from the ark as the flood rises. The son's reply is a theory about mountains and water. Nuh's appeal to God afterward is one of the most painful exchanges in the Quran — and God's response redefines what family means.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['nuh', 'quranic-characters', 'sabr'],
      seo_description: "The exchange between Nuh and his son during the flood — his son's refusal, the wave, and God's devastating response: 'He is not of your family.' An exploration of 11:42-46.",
      content_html: `<article class="prose-blog">

  <p>The flood is already happening. Waves like mountains. The ark is moving. And Nuh calls to his son, who is standing apart from everyone who boarded.</p>

  <blockquote class="ayah-quote" data-ayah="11:42">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:42 -->وَهِىَ تَجْرِى بِهِمْ فِى مَوْجٍ كَٱلْجِبَالِ وَنَادَىٰ نُوحٌ ٱبْنَهُۥ وَكَانَ فِى مَعْزِلٍ يَـٰبُنَىَّ ٱرْكَب مَّعَنَا وَلَا تَكُن مَّعَ ٱلْكَـٰفِرِينَ</p>
    <p class="translation">"And it sailed with them through waves like mountains, and Nuh called to his son who was standing apart: 'O my son, board with us and do not be with the disbelievers.'"</p>
    <cite>Surah Hud (11:42)</cite>
  </blockquote>

  <p><em>Wa kana fi ma'zil</em> — and he was in a place apart, at a distance. Standing away from those who boarded. The phrase captures the physical distance that mirrors the spiritual one. And Nuh calls: <em>ya bunayya</em> — O my dear son. The diminutive form expresses tenderness. He is not commanding. He is pleading.</p>

  <h2>The Mountain Theory</h2>

  <blockquote class="ayah-quote" data-ayah="11:43">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:43 -->قَالَ سَـَٔاوِىٓ إِلَىٰ جَبَلٍ يَعْصِمُنِى مِنَ ٱلْمَآءِ ۚ قَالَ لَا عَاصِمَ ٱلْيَوْمَ مِنْ أَمْرِ ٱللَّهِ إِلَّا مَن رَّحِمَ ۚ وَحَالَ بَيْنَهُمَا ٱلْمَوْجُ فَكَانَ مِنَ ٱلْمُغْرَقِينَ</p>
    <p class="translation">"He said: 'I will take shelter on a mountain that will protect me from the water.' [Nuh] said: 'There is no protector today from the decree of Allah, except whom He has mercy upon.' And the wave came between them, and he was among the drowned."</p>
    <cite>Surah Hud (11:43)</cite>
  </blockquote>

  <p>The son has a plan. A mountain — high ground, above the water. It is a reasonable plan for an ordinary flood. But the son has misread the situation entirely. This is not an ordinary flood.</p>

  <p>Nuh's response is one of the most structurally precise sentences in the Quran: <em>lā 'āṣima al-yawma min amri-Llāhi illā man raḥim</em>. There is no protector today from the command of God except the one He has mercy on. The word <em>'āṣim</em> — protector — is the exact same root as the son's word for what the mountain will do: <em>ya'ṣimu-nī</em>, it will protect me. Nuh takes the word and reframes it. You're looking for a protector. There is none — except by God's mercy.</p>

  <p>And then the Quran narrates what happened in a single phrase: <em>wa ḥāla baynahuma al-mawju fa-kāna min al-mughraqīn</em>. The wave came between them. He was among the drowned. No description of the moment. No drama. The wave came and the sentence ends.</p>

  <h2>Nuh's Appeal</h2>

  <blockquote class="ayah-quote" data-ayah="11:45">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:45 -->وَنَادَىٰ نُوحٌ رَّبَّهُۥ فَقَالَ رَبِّ إِنَّ ٱبْنِى مِنْ أَهْلِى وَإِنَّ وَعْدَكَ ٱلْحَقُّ وَأَنتَ أَحْكَمُ ٱلْحَـٰكِمِينَ</p>
    <p class="translation">"And Nuh called to his Lord and said: 'My Lord, indeed my son is of my family, and indeed Your promise is true. And You are the most just of judges.'"</p>
    <cite>Surah Hud (11:45)</cite>
  </blockquote>

  <p>After the flood recedes — after the ark has settled, the water has been commanded back — Nuh calls to his Lord. His son is gone. And he makes a careful argument: <em>inna ibni min ahli</em> — my son is of my family. God had promised to save Nuh's family (<em>ahl</em>). His son is family. Therefore the promise should cover him.</p>

  <p>The argument is structurally valid. It is also entirely human. A father, after the fact, trying to understand what happened to his child. He is not accusing God. He ends with: <em>wa anta aḥkamu al-ḥākimīn</em> — You are the most just of judges. He holds both things: his confusion and his trust.</p>

  <h2>The Answer That Redefines Everything</h2>

  <blockquote class="ayah-quote" data-ayah="11:46">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:46 -->قَالَ يَـٰنُوحُ إِنَّهُۥ لَيْسَ مِنْ أَهْلِكَ ۖ إِنَّهُۥ عَمَلٌ غَيْرُ صَـٰلِحٍ ۖ فَلَا تَسْـَٔلْنِ مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ ۖ إِنِّىٓ أَعِظُكَ أَن تَكُونَ مِنَ ٱلْجَـٰهِلِينَ</p>
    <p class="translation">"He said: 'O Nuh, indeed he is not of your family; indeed, he is a deed that is not righteous. So do not ask Me for that about which you have no knowledge. Indeed, I admonish you lest you be among the ignorant.'"</p>
    <cite>Surah Hud (11:46)</cite>
  </blockquote>

  <p>God's response is one of the most theologically significant statements in the Quran about the nature of family. <em>Innahu laysa min ahlika</em> — he is not of your family. The word <em>ahlika</em> is the same word Nuh used. God takes Nuh's own term and corrects his understanding of it.</p>

  <p>And then the explanation: <em>innahu 'amalun ghayru ṣāliḥ</em> — he is a deed of unrighteousness. Not: he is a bad person. He is a deed. The Quran frames the son's identity as an action — as what he chose to do and what he refused to believe. The son's act of rejection constitutes him, in the Quranic account, as not-family in the sense that matters.</p>

  <p>This is the Quran's definition of family at its most demanding: <em>ahl</em>, in the context of divine promise and rescue, means those who share in belief and righteousness. Blood is real. Grief over a child is real. And God acknowledges Nuh's grief with care — calling him by name, admonishing him gently. But the category of family that God's promise operated on was not the category of blood.</p>

  <p>Nuh is not condemned for asking. He is corrected and told: do not ask about what you do not have knowledge of. The admonition is protective — it tells Nuh something about the limits of his understanding and invites him not to become among the ignorant by mistaking one kind of family for another.</p>

</article>`
    },
    primaryEntityId: NUH_ID,
    secondaryEntityIds: [SABR_ID],
  },

  // ── Article 3 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Ark in an Age of Mockery: What the Quran Says About Building",
      slug: "the-ark-in-an-age-of-mockery",
      type: 'article',
      excerpt: "God tells Nuh to build the ark under His eyes and His revelation. Every time the elders of his people passed by the construction, they mocked him. What the Quran preserves of Nuh's response — and what it says about doing sacred work in public ridicule.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['nuh', 'quranic-characters', 'sabr', 'tawakkul'],
      seo_description: "The Quran captures Nuh building the ark while his people mock him. An exploration of 11:37-38 and what the Quran says about obedience, public ridicule, and the nature of sacred work.",
      content_html: `<article class="prose-blog">

  <p>The command to build comes after Nuh has been told the flood is coming. God does not tell him to evacuate or to warn the people one more time. God tells him to build.</p>

  <blockquote class="ayah-quote" data-ayah="11:37">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:37 -->وَٱصْنَعِ ٱلْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَـٰطِبْنِى فِى ٱلَّذِينَ ظَلَمُوٓا۟ ۚ إِنَّهُم مُّغْرَقُونَ</p>
    <p class="translation">"And construct the ship under Our eyes and Our inspiration, and do not address Me concerning those who have wronged; indeed, they are to be drowned."</p>
    <cite>Surah Hud (11:37)</cite>
  </blockquote>

  <p>The command is surrounded by two other statements. First: build under Our eyes and Our revelation — <em>bi-a'yuninā wa waḥyinā</em>. The ark is not a solo project. It is built under divine oversight and divine instruction. Second: do not speak to Me on behalf of those who wronged — they will be drowned. The matter is settled. Don't plead for them.</p>

  <p>The two instructions bracket the building project: you are not alone in this, and you cannot save who cannot be saved. Nuh is given his task with its full spiritual context before he begins.</p>

  <h2>Building While Being Laughed At</h2>

  <blockquote class="ayah-quote" data-ayah="11:38">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:38 -->وَيَصْنَعُ ٱلْفُلْكَ وَكُلَّمَا مَرَّ عَلَيْهِ مَلَأٌ مِّن قَوْمِهِۦ سَخِرُوا۟ مِنْهُ ۚ قَالَ إِن تَسْخَرُوا۟ مِنَّا فَإِنَّا نَسْخَرُ مِنكُمْ كَمَا تَسْخَرُونَ</p>
    <p class="translation">"And he constructed the ship, and whenever an assembly of the eminent among his people passed by him, they ridiculed him. He said: 'If you ridicule us, then we will ridicule you just as you ridicule.'"</p>
    <cite>Surah Hud (11:38)</cite>
  </blockquote>

  <p>The Quran gives us the image in one verse: he is building, and every time a group of elders walks by, they mock him. The repetition is built into the grammar — <em>kullamā marra 'alayhi mala'un</em>, every time an assembly passed. Not once. Not occasionally. Every time. The mockery is a regular feature of the construction.</p>

  <p>What do you build an ark for, in a place with no sea? The mockery is not simply social cruelty — it has a logic. He is doing something that makes no sense in the context of the world they can see. The elders have evidence on their side. There is no flood. There has been no flood. A man building a massive boat in the middle of dry land is an eccentric, at best.</p>

  <h2>His Response</h2>

  <p>Nuh's reply is striking in its directness: <em>in taskharū minnā fa-innā naskharu minkum kamā taskharūn</em>. If you mock us, we will mock you just as you mock. It is not a threat of divine punishment — that comes in the next verse. It is a simple declaration of reciprocity. What you do to us, we return.</p>

  <p>Some commentators have found this reply harsh. But the Quran preserves it as Nuh's actual response without correction. He does not absorb the mockery silently. He does not perform beatific patience at this moment. He says: you laugh at us now; we will laugh at you.</p>

  <p>The completion of this exchange happens at the flood. When the water comes, what looked like madness will become salvation, and what looked like stability — the dry land, the social order, the laughing elders — will end. The mockery will invert. Nuh didn't need to elaborate. The event itself would complete the sentence.</p>

  <h2>Building as Obedience</h2>

  <p>What the Quran captures in these two verses is the shape of a specific kind of obedience: doing what you were told to do, in public, while being ridiculed for it, with no visible validation yet.</p>

  <p>The ark was built under God's eyes. The mockery happened under human eyes. Both are preserved in the verse. <em>Bi-a'yuninā</em> — under Our eyes — means the construction is seen and sanctioned from the only perspective that ultimately matters. The mockery is real. The watching is also real. And Nuh kept building.</p>

  <p>This is what the Quran shows about Nuh's patience in this passage — not passive endurance but active continuation. He did not stop building when they laughed. He answered, and kept working. The ark, finished, is the argument. Nuh does not need to win the debate. He needs to finish the structure.</p>

</article>`
    },
    primaryEntityId: NUH_ID,
    secondaryEntityIds: [SABR_ID, TAWAKKUL_ID],
  },

  // ── Article 4 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Wa Qīla: The Most Compressed Command in the Flood Narrative",
      slug: "wa-qila-the-most-compressed-command-in-the-flood-narrative",
      type: 'article',
      excerpt: "The Quran narrates the end of the flood in two sentences. The earth is commanded to swallow its water. The sky is commanded to stop. The ark rests on Al-Judi. The economy of the language — and what it says about divine speech — is the subject.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['nuh', 'quranic-characters', 'tawakkul'],
      seo_description: "In 11:44, the Quran ends the flood in two sentences addressed to the earth and sky. An exploration of divine command in the Quran and why the language of 'wa qila' changes everything.",
      content_html: `<article class="prose-blog">

  <p>The flood narrative in Surah Hud builds slowly: the ark, the mockery, the gathering of animals, the warning, the water. And then the flood ends in a single verse.</p>

  <blockquote class="ayah-quote" data-ayah="11:44">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:11:44 -->وَقِيلَ يَـٰٓأَرْضُ ٱبْلَعِى مَآءَكِ وَيَـٰسَمَآءُ أَقْلِعِى وَغِيضَ ٱلْمَآءُ وَقُضِىَ ٱلْأَمْرُ وَٱسْتَوَتْ عَلَى ٱلْجُودِىِّ ۖ وَقِيلَ بُعْدًا لِّلْقَوْمِ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"And it was said: 'O earth, swallow your water, and O sky, cease.' And the water subsided and the matter was concluded, and it settled on Al-Judi. And it was said: 'Away with the wrongdoing people.'"</p>
    <cite>Surah Hud (11:44)</cite>
  </blockquote>

  <p>The verse is structured around two uses of <em>wa qīla</em> — and it was said. The passive construction is significant. The Quran does not say: God said to the earth. It says: it was said. The speaker is unspecified — and the absence of a named speaker is not a gap but a statement. The command issues from a source so absolute that naming it would be redundant. It was said. And so it happened.</p>

  <h2>The Address to the Earth and Sky</h2>

  <p>The earth is addressed as <em>yā arḍu</em> — O earth. It is addressed directly, as a person addressed. <em>Ibla'ī mā'aki</em> — swallow your water. The water belongs to the earth: it is called <em>mā'aki</em>, your water. The earth is commanded to take back what is hers.</p>

  <p>The sky is addressed as <em>yā samā'u</em> — O sky. <em>Aqli'ī</em> — cease, stop, desist. The sky is commanded to stop what it was doing.</p>

  <p>The pairing of these two addresses — earth and sky, swallow and stop — is the Quran narrating the end of an entire catastrophe in two imperative verbs. No description of the water receding. No mention of how long it took. Two commands, and then the results: the water subsided, the matter was concluded, the ark rested on Al-Judi.</p>

  <h2>Wa Quḍiya al-Amr</h2>

  <p><em>Wa quḍiya al-amr</em> — and the matter was concluded, decided, settled. The word <em>quḍiya</em> is from <em>qaḍā</em> — to decree, to complete, to finish. It is used for the finality of divine decree. The flood and its purpose are done. The matter is over.</p>

  <p>The ark rests on Al-Judi — a mountain. The Quran names the mountain without elaborating on where it is or what it looks like. The name is a marker: this is where it ended. The precision of the name amid the compression of everything else is characteristic. The Quran will omit descriptions that would make good drama and preserve the specific detail that grounds the narrative in something real.</p>

  <h2>The Final Word</h2>

  <p>The verse ends with a second <em>wa qīla</em>: and it was said — <em>bu'dan lil-qawm al-ẓālimīn</em>. Away with the wrongdoing people. The word <em>bu'dan</em> indicates distance, banishment, removal from nearness. It is a word of final severance.</p>

  <p>The Quran does not narrate this from God's perspective with named divine speech. The passive <em>wa qīla</em> again. It was said. The pronouncement of the end of the wrongdoing people issues from the same unspecified source that commanded the earth and sky. The symmetry frames the entire event: it was said — begin; it was said — end; it was said — away.</p>

  <p>What this verse preserves is the Quran's vision of divine speech as operative command. God does not describe the flood ending. The words that announce its end are the same words that end it. <em>Yā arḍu ibla'ī</em> — O earth, swallow. And the earth swallows. The Quran's language here is not poetic description. It is the recording of speech that acts.</p>

</article>`
    },
    primaryEntityId: NUH_ID,
    secondaryEntityIds: [TAWAKKUL_ID],
  },
];

async function main() {
  console.log('Inserting Nuh articles...');

  for (const { post, primaryEntityId, secondaryEntityIds } of articles) {
    const { data: inserted, error } = await supabase
      .from('posts')
      .insert({ ...post, created_by: ADMIN_USER_ID, featured: false, published_at: new Date().toISOString() })
      .select('id, title')
      .single();

    if (error) {
      console.error(`✗ "${post.title}":`, error.message);
      continue;
    }

    await supabase.from('entity_tags').insert({
      post_id: inserted.id,
      entity_id: primaryEntityId,
      is_primary: true,
    });

    for (const entityId of secondaryEntityIds) {
      await supabase.from('entity_tags').insert({
        post_id: inserted.id,
        entity_id: entityId,
        is_primary: false,
      });
    }

    console.log(`✓ "${inserted.title}"`);
  }

  await supabase.rpc('refresh_entity_co_occurrence');

  console.log('\n✓ Done! 4 articles inserted.');
}

main().catch(console.error);
