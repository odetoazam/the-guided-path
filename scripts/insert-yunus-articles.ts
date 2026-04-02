import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const YUNUS_ID      = '949fd304-2b32-4d28-8556-bfc69f8bdf41';
const TAWBAH_ID     = 'f4f69408-d31f-44d7-8ff1-ed3682ea6692';
const SABR_ID       = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49';
const TAWAKKUL_ID   = '547e36b8-aa55-4c03-a139-cd94f1df456a';

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Fish That Swallowed a Prophet: What the Quran Preserves of Yunus",
      slug: "the-fish-that-swallowed-a-prophet",
      type: 'article',
      excerpt: "The Quran is precise about Yunus's state when the fish swallowed him: muliym — blameworthy. Not a passive victim of circumstance. The word matters. It changes what the rescue means.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['yunus', 'quranic-characters', 'sabr', 'tawbah'],
      seo_description: "The Quran describes Yunus as muliym — blameworthy — when swallowed by the fish. Exploring what Surah Al-Saffat preserves about the prophet who fled his mission.",
      content_html: `<article class="prose-blog">

  <p>Surah Al-Saffat tells the story of Yunus in six verses. Six verses for an entire prophetic life. The compression is typical of the Quran — but the selection is not. The six verses the Quran chooses are deliberate, and what they choose to say about Yunus is not flattering.</p>

  <blockquote class="ayah-quote" data-ayah="37:139">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:139 -->وَإِنَّ يُونُسَ لَمِنَ ٱلْمُرْسَلِينَ</p>
    <p class="translation">"And indeed, Yunus was among the messengers."</p>
    <cite>Surah Al-Saffat (37:139)</cite>
  </blockquote>

  <p>The verse opens with an assertion. <em>Inna</em> — indeed, truly, without doubt. It is an emphasis particle, and its placement here is not accidental. The Quran is confirming Yunus's prophetic status before telling a story in which he appears to act badly. The reassurance comes first. What follows is more complicated.</p>

  <h2>He Fled</h2>

  <blockquote class="ayah-quote" data-ayah="37:140">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:140 -->إِذْ أَبَقَ إِلَى ٱلْفُلْكِ ٱلْمَشْحُونِ</p>
    <p class="translation">"When he fled to the laden ship."</p>
    <cite>Surah Al-Saffat (37:140)</cite>
  </blockquote>

  <p>The word <em>abaqa</em> is striking. It is the verb used for a slave who runs away from his master without permission. The Quran uses it of Yunus: he fled. He left his people without receiving divine permission to leave. The 21st chapter of the Quran will add a detail — he left <em>mughadiban</em>, in anger. He was frustrated. His people weren't listening, and he had had enough.</p>

  <p>The ship was <em>mashchun</em> — laden, full, overloaded. When the ship became too heavy in a storm, they cast lots to determine who would be thrown overboard.</p>

  <blockquote class="ayah-quote" data-ayah="37:141">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:141 -->فَسَاهَمَ فَكَانَ مِنَ ٱلْمُدْحَضِينَ</p>
    <p class="translation">"He drew lots and was among the losers."</p>
    <cite>Surah Al-Saffat (37:141)</cite>
  </blockquote>

  <p>He lost the lot. He was thrown into the sea.</p>

  <h2>Muliym</h2>

  <blockquote class="ayah-quote" data-ayah="37:142">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:142 -->فَٱلْتَقَمَهُ ٱلْحُوتُ وَهُوَ مُلِيمٌ</p>
    <p class="translation">"And the fish swallowed him, while he was blameworthy."</p>
    <cite>Surah Al-Saffat (37:142)</cite>
  </blockquote>

  <p>The fish swallowed him — <em>iltaqamahu</em>, a word that means to gulp down in one swallow, like food — and the Quran inserts a state clause: <em>wa huwa muliym</em>. While he was blameworthy.</p>

  <p><em>Muliym</em> comes from the root <em>lawm</em> — blame, reproach. It refers to someone who has brought blame upon themselves through their own action. The Quran is not obscuring this. Yunus fled without permission. He left his people. He acted out of frustration rather than divine instruction. The fish swallowed him in that state.</p>

  <p>This is what the Quran preserves. Not a triumphant prophet in the belly of the whale. A prophet who made a mistake and ended up in darkness, knowing he was blameworthy.</p>

  <h2>What Saved Him</h2>

  <blockquote class="ayah-quote" data-ayah="37:143">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:143 -->فَلَوْلَآ أَنَّهُۥ كَانَ مِنَ ٱلْمُسَبِّحِينَ</p>
    <p class="translation">"And had he not been of those who glorify [Allah]..."</p>
    <cite>Surah Al-Saffat (37:143)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="37:144">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:37:144 -->لَلَبِثَ فِى بَطْنِهِۦٓ إِلَىٰ يَوْمِ يُبْعَثُونَ</p>
    <p class="translation">"...he would have remained in its belly until the Day they are resurrected."</p>
    <cite>Surah Al-Saffat (37:144)</cite>
  </blockquote>

  <p>The structure of these two verses is a conditional: <em>falawla</em> — and if not for. If not for the fact that he had been among the musabbihin — those who glorify, those who make tasbih. The implication is devastating in its simplicity: his prior record of glorification is what saved him. Not the du'a he made inside the fish, though that is also recorded elsewhere. What made the rescue possible was a history of worship that preceded the moment of crisis.</p>

  <p>The belly of the fish would have been his grave until Judgment Day. That is the weight of the alternative. And what stood between Yunus and that fate was not a last-minute prayer but a life of tasbih — of continual praise — that he had already accumulated.</p>

  <h2>The Compressed Lesson</h2>

  <p>The Quran tells this story in six verses and leaves almost everything out. It doesn't describe the inside of the fish. It doesn't describe the storm. It doesn't describe the grief of his people when he left. It gives us: he fled, he lost the lot, the fish swallowed him while he was blameworthy, and the thing that saved him was who he had already been before the crisis.</p>

  <p>The compression is the teaching. What you are in ordinary time is what you will have in the darkness. Yunus's history of glorification wasn't the cure for his crisis — it was the container that made rescue possible when the crisis came.</p>

  <p>The Quran's brevity here is its own form of precision. It doesn't want you to miss the word: <strong>muliym</strong>. He was blameworthy. The fish did not swallow an innocent man. It swallowed a prophet who had made a real error — and still, because of who he had been before the error, he was brought out.</p>

</article>`
    },
    primaryEntityId: YUNUS_ID,
    secondaryEntityIds: [SABR_ID, TAWBAH_ID],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "La ilaha illa Anta: The Du'a That Makes No Request",
      slug: "la-ilaha-illa-anta-the-dua-that-makes-no-request",
      type: 'article',
      excerpt: "The du'a of Yunus in the belly of the fish is the most famous du'a in the Quran. What most people miss: it contains no request. It is tawhid, then self-accusation. Nothing else. And then the response comes.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['yunus', 'quranic-characters', 'tawbah', 'tawakkul'],
      seo_description: "Yunus's du'a from the belly of the fish contains no request — only tawhid and self-accusation. An analysis of the most famous du'a in the Quran and why it worked.",
      content_html: `<article class="prose-blog">

  <p>Most people know the du'a of Yunus. It appears on the walls of mosques, in collections of prescribed supplications, in the mouths of people in distress for fourteen centuries. But most people quote it incomplete — and the part they leave out is the part that makes it work.</p>

  <blockquote class="ayah-quote" data-ayah="21:87">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:21:87 -->وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"And [mention] the man of the fish, when he left in anger and thought that We would not decree [anything] upon him, and he called out within the darknesses: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.'"</p>
    <cite>Surah Al-Anbiya' (21:87)</cite>
  </blockquote>

  <h2>The Structure of the Du'a</h2>

  <p>The actual du'a is three elements:</p>

  <ol>
    <li><strong>Lā ilāha illā Anta</strong> — there is no god but You. A declaration of tawhid. Not a petition.</li>
    <li><strong>Subḥānaka</strong> — exalted are You, glory be to You. A declaration of transcendence. Not a petition.</li>
    <li><strong>Innī kuntu min al-ẓālimīn</strong> — indeed I have been among the wrongdoers. A confession. Not a petition.</li>
  </ol>

  <p>There is no petition. Yunus does not say: release me. Get me out. Forgive me. Save me. He makes no request at all. He simply states who God is, and then states who he was.</p>

  <p>This is what most collections of du'a cut off. They quote: <em>Lā ilāha illā Anta, subḥānaka</em>. The tawhid and the tasbih. But the self-accusation is the third movement, and it may be the most important one.</p>

  <h2>Innī Kuntu: The Grammar of Admission</h2>

  <p><em>Innī kuntu</em> — indeed I was, I have been. The past tense is significant. Not "I am a wrongdoer" in the moment of crisis, grasping at humility as a tool. "I have been" — a settled acknowledgment of a prior reality. The Arabic <em>kuntu</em> indicates an established state rather than a momentary one. He is not performing contrition in the darkness. He is naming what was already true of him before he got there.</p>

  <p>The word <em>ẓālimīn</em> — wrongdoers — comes from <em>ẓulm</em>, the root that means putting something in the wrong place. Yunus put himself in the wrong place by leaving his people without permission. He is naming that with precision.</p>

  <h2>Then the Response</h2>

  <blockquote class="ayah-quote" data-ayah="21:88">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:21:88 -->فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ</p>
    <p class="translation">"So We responded to him and saved him from the distress. And thus do We save the believers."</p>
    <cite>Surah Al-Anbiya' (21:88)</cite>
  </blockquote>

  <p><em>Fa-stajabnā lahu</em> — so We responded to him. The response is immediate in the narrative. The connecting particle <em>fa</em> indicates consequence without delay. He called; We responded.</p>

  <p>But responded to what? He made no request. What the Quran shows is that the du'a did not need to be a request. The declaration of tawhid, the glorification, and the self-accusation were sufficient. The response came not to a petition but to an orientation — to a turning of the whole self toward the truth of God and the truth of one's own failure.</p>

  <p>The word for distress here is <em>ghamm</em> — a word that has connotations of grief that covers and oppresses, like something heavy placed over the chest. He was saved from the <em>ghamm</em>. Not merely from the fish. From the weight of what he was carrying.</p>

  <h2>The Generalization</h2>

  <p>The verse does not end with Yunus. It ends with: <em>wa kadhālika nunjī al-mu'minīn</em> — and thus We save the believers. The particular story is extended into a universal principle. This is how rescue works. Not just for Yunus. For the mu'minun — those who believe.</p>

  <p>The Quran is telling you: this du'a is not a Yunus-specific formula. It is a pattern. The movement from tawhid to tasbih to honest self-accusation, with no petition — this is a posture that draws a response. Not because of a magic word sequence but because of what the posture represents: a self that has stopped bargaining and simply told the truth.</p>

  <p>The darkness in the verse is <em>al-ẓulumāt</em> — plural. Darknesses, not darkness. Three layers: the darkness of night, the darkness of the sea, the darkness of the fish's belly. Yunus called from three kinds of dark. The response came to all three.</p>

</article>`
    },
    primaryEntityId: YUNUS_ID,
    secondaryEntityIds: [TAWBAH_ID, TAWAKKUL_ID],
  },

  // ── Article 3 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Only Town That Believed Before the Punishment Came",
      slug: "the-only-town-that-believed-before-the-punishment-came",
      type: 'article',
      excerpt: "In 10:98, the Quran names a general rule — no town's faith benefited them once punishment arrived — and then gives a single exception: Yunus's people. They are the only community in the Quran who believed before it was too late.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['yunus', 'quranic-characters', 'tawbah'],
      seo_description: "Yunus's people are the only community in the Quran who believed before punishment arrived and were saved. An exploration of 10:98 and what this exception reveals about tawbah.",
      content_html: `<article class="prose-blog">

  <p>The Quran has a recurring pattern with prophets and their people: the prophet calls, the people reject, punishment comes, it is too late. Nuh preaches for 950 years and boards the ark with a small number. Hud's people are destroyed by a wind. Salih's people kill the camel and are given three days before the punishment comes. The pattern holds with consistency that can feel like an iron law.</p>

  <p>Then 10:98 names the one exception.</p>

  <blockquote class="ayah-quote" data-ayah="10:98">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:10:98 -->فَلَوْلَا كَانَتْ قَرْيَةٌ ءَامَنَتْ فَنَفَعَهَآ إِيمَـٰنُهَآ إِلَّا قَوْمَ يُونُسَ لَمَّآ ءَامَنُوا۟ كَشَفْنَا عَنْهُمْ عَذَابَ ٱلْخِزْىِ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَمَتَّعْنَـٰهُمْ إِلَىٰ حِينٍ</p>
    <p class="translation">"Then has there not been a city that believed so its faith benefited it except the people of Yunus? When they believed, We removed from them the punishment of disgrace in worldly life and gave them enjoyment for a time."</p>
    <cite>Surah Yunus (10:98)</cite>
  </blockquote>

  <h2>The Structure of the Exception</h2>

  <p>The verse opens with <em>falawlā</em> — then was there not? It is a rhetorical structure that implies: there was no such city. No town whose faith, arriving at the brink of punishment, was accepted — except one. The Quran names the exception precisely: <em>illā qawma Yūnus</em> — except the people of Yunus.</p>

  <p>And then it gives the timeline: <em>lammā āmanū</em> — when they believed. Not before the punishment approached. The punishment was approaching — <em>'adhāb al-khizy</em>, the punishment of disgrace and humiliation — and then they believed, and it was removed. The faith arrived at the edge and was still accepted.</p>

  <p>This is singular in the entire Quran. Every other community either believed before the crisis or was destroyed after rejecting. The people of Yunus believed when they saw the punishment coming and the warning was accepted.</p>

  <h2>The Tension with the Prophet's Departure</h2>

  <p>The paradox in the story is this: Yunus left. He fled his people in anger, without permission, presumably convinced that nothing would come of his mission. He was in the belly of a fish when his people turned. He was not there to see it.</p>

  <p>The Quran puts these two facts together without explaining the mechanism: the prophet who gave up on his people, and the people who turned without him. The rescue of Yunus from the fish and the rescue of his people from punishment happen in a kind of parallel — both brought back from the edge, neither quite where they were supposed to be.</p>

  <p>What this means about prophetic despair is significant. Yunus's conclusion — that they would never believe — was wrong. The Quran does not let this go unnamed. His departure was a misjudgment about his people's capacity for change, as well as a departure without divine permission. He was saved from the fish. His people were saved from punishment. And both rescues happened not because the situation was hopeless but because Yunus had decided it was.</p>

  <h2>Tawbah at the Threshold</h2>

  <p>The people of Yunus illustrate something the Quran makes explicit elsewhere about tawbah — that the door remains open until the final moment. There is a closing, and the Quran names it: faith at the moment of death is not accepted (4:18), and faith when one sees the punishment has already arrived is not accepted (6:158). But the people of Yunus saw the punishment approaching — not yet arrived — and turned. And it was enough.</p>

  <p>The word used for the removal of punishment is <em>kashafnā</em> — We lifted, We removed. The punishment was drawn back. The Quran gives no dramatic account of what the people of Yunus experienced in the moment — no descriptions of the sky darkening, no narration of their fear. Only the outcome: they believed, We removed, We gave them enjoyment for a time.</p>

  <p>The phrase <em>matarnāhum ilā hīn</em> — gave them enjoyment until a time — is a quiet ending. Not: we gave them paradise. Not: they lived forever. We gave them more time. Which is all anyone is ever given. The exception of the people of Yunus is not that they were rewarded with transcendence — it is that they were given more of ordinary life. Time, extended, because they turned before it ran out.</p>

</article>`
    },
    primaryEntityId: YUNUS_ID,
    secondaryEntityIds: [TAWBAH_ID],
  },

  // ── Article 4 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Dhul-Nun: Why the Quran Gives Yunus a Nickname",
      slug: "dhul-nun-why-the-quran-gives-yunus-a-nickname",
      type: 'article',
      excerpt: "The Quran refers to the same prophet by three different names: Yunus, Dhul-Nun, and Sahib al-Hut. Each name frames the story differently. One of them is addressed directly to the Prophet Muhammad as a warning.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['yunus', 'quranic-characters', 'sabr'],
      seo_description: "The Quran calls Yunus by three names: Yunus, Dhul-Nun, and Sahib al-Hut. Each frames him differently — and one becomes a direct warning to the Prophet Muhammad in Surah Al-Qalam.",
      content_html: `<article class="prose-blog">

  <p>The Quran refers to a single prophet by three different names. In 10:98, he is Yunus — simply his name, used in the context of his people's exceptional faith. In 21:87, he is <em>Dhā al-Nūn</em> — the Companion of the Fish, or the One of the Fish — used when narrating his du'a from the darkness. In 68:48, he is <em>ṣāḥib al-ḥūt</em> — the Companion of the Whale — used in a direct address to the Prophet Muhammad.</p>

  <p>Same person. Three framings. The Quran's naming is not random variation. Each name serves a different rhetorical and theological purpose.</p>

  <h2>Yunus: The Name and the People</h2>

  <p>When the Quran uses the name Yunus — his proper name — it is usually in connection with his prophetic mission and his community. <em>Qawm Yūnus</em> — the people of Yunus. The name situates him as a prophet with a people, in a line of prophets. It is the most neutral naming: who he is in relation to his community and his calling.</p>

  <h2>Dhul-Nun: The Name of the Crisis</h2>

  <p>In Surah Al-Anbiya' (21:87), the Quran introduces him as <em>Dhā al-Nūn</em> — the possessor of the Nun, the one connected to the fish. <em>Nūn</em> in Arabic can mean the letter Nūn, a large fish, or a whale. The name appears at the moment the Quran is about to narrate the du'a from the darkness.</p>

  <blockquote class="ayah-quote" data-ayah="21:87">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:21:87 -->وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَـٰضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"And [mention] the man of the fish, when he left in anger and thought that We would not decree [anything] upon him — and he called out within the darknesses: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.'"</p>
    <cite>Surah Al-Anbiya' (21:87)</cite>
  </blockquote>

  <p>The name <em>Dhul-Nun</em> — Companion of the Fish — identifies him by his defining experience rather than his lineage or his mission. He is the prophet for whom the fish is so central that it becomes his name. The encounter was so formative that it marked him in the Quran's vocabulary permanently.</p>

  <p>This is a common Quranic naming pattern. Dhul-Kifl (the one of the double portion). Dhul-Qarnayn (the one of the two horns). The <em>dhul</em> construction identifies a person by the thing most uniquely associated with them. In Yunus's case: the fish. The story that should have been his disgrace became his signature.</p>

  <h2>Sahib al-Hut: The Warning to Another Prophet</h2>

  <blockquote class="ayah-quote" data-ayah="68:48">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:68:48 -->فَٱصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ ٱلْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ</p>
    <p class="translation">"So be patient for the decision of your Lord, and be not like the companion of the fish, when he called out while he was distressed."</p>
    <cite>Surah Al-Qalam (68:48)</cite>
  </blockquote>

  <p>This is the third naming. And it is addressed directly to the Prophet Muhammad: <em>falā takun ka-ṣāḥib al-ḥūt</em> — do not be like the companion of the whale. The command is pointed. Do not do what he did. Do not leave in anger. Do not assume the decree will not reach you. Be patient with your Lord's judgment.</p>

  <p>The name here is <em>ṣāḥib al-ḥūt</em> — the companion of the whale. It is the most distancing of the three names. Not Yunus (the prophet with a community), not Dhul-Nun (the one whose crisis became his mark), but ṣāḥib al-ḥūt — the companion of the whale, full stop. The name strips away lineage and mission and leaves only the defining incident.</p>

  <p>And the state in which he called is recorded: <em>makẓūm</em> — oppressed, burdened, full of grief, suppressed. He called while he was in that state. The Quran does not judge the calling — it records the state.</p>

  <h2>What the Three Names Together Reveal</h2>

  <p>Yunus: who he is — a prophet with a people and a mission.<br>
  Dhul-Nun: what defined him — the fish, the darkness, the du'a that was answered.<br>
  Sahib al-Hut: a warning — an instance that should not be repeated.</p>

  <p>The Quran uses all three because they do different work. The story of Yunus cannot be reduced to inspiration (he was a prophet, he made du'a, he was saved) or to warning (he fled, he was swallowed, learn from his error). It holds both. The same event that makes him Dhul-Nun — the companion of the fish, the one the fish could not contain — is the event that makes him a warning in Al-Qalam.</p>

  <p>The most telling detail is that the story does not end with the warning in 68:48. Surah Al-Qalam continues, and by verse 50 it notes that Yunus was chosen and was among the righteous. The warning does not erase the restoration. The Quran's final word on Yunus — across all three names — is not the fish. It is the righteous man who came out of it.</p>

</article>`
    },
    primaryEntityId: YUNUS_ID,
    secondaryEntityIds: [SABR_ID],
  },
];

async function main() {
  console.log('Inserting Yunus articles...');

  for (const { post, primaryEntityId, secondaryEntityIds } of articles) {
    // Insert post
    const { data: inserted, error } = await supabase
      .from('posts')
      .insert({ ...post, created_by: ADMIN_USER_ID, featured: false, published_at: new Date().toISOString() })
      .select('id, title')
      .single();

    if (error) {
      console.error(`✗ "${post.title}":`, error.message);
      continue;
    }

    // Primary entity tag
    await supabase.from('entity_tags').insert({
      post_id: inserted.id,
      entity_id: primaryEntityId,
      is_primary: true,
    });

    // Secondary entity tags
    for (const entityId of secondaryEntityIds) {
      await supabase.from('entity_tags').insert({
        post_id: inserted.id,
        entity_id: entityId,
        is_primary: false,
      });
    }

    console.log(`✓ "${inserted.title}"`);
  }

  // Refresh co-occurrence
  await supabase.rpc('refresh_entity_co_occurrence');

  console.log('\n✓ Done! 4 articles inserted.');
}

main().catch(console.error);
