#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ASHAB_AL_KAHF_ID = '23de6860-d6f4-4e32-99f2-d497e596c04f'
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a'
const SABR_ID = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49'
const IBLIS_ID = '6647d520-3558-4ff2-882e-c85a706b1c47'

const articles = [
  // Article 1: The Young Men Who Left the City
  {
    primaryEntity: ASHAB_AL_KAHF_ID,
    secondaryEntities: [TAWAKKUL_ID, SABR_ID],
    article: {
      title: "The Young Men Who Left the City: Ashab al-Kahf and the First Trial",
      slug: "the-young-men-who-left-the-city-ashab-al-kahf",
      type: 'article',
      excerpt: "The Quran doesn't give us their names or their city. It calls them fitya — young men — and says they believed. That's the entire biography. What follows is the story of what believing cost them, and what Allah prepared for them inside a cave.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['ashab-al-kahf', 'quranic-characters', 'tawakkul', 'sabr'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran does not tell us their names. It doesn't tell us their city, their tribe, or the king who ruled over them. It calls them <strong>fitya</strong> — young men — and says they believed. That is the entire biography the Quran offers, and it turns out to be sufficient. What follows in Surah Al-Kahf is not their résumé but their decision: the moment a group of young men looked at their city and chose a cave instead.</p>

  <h2>The Word: Fitya</h2>

  <p>The Arabic <strong>فِتْيَةٌ</strong> is the plural of <strong>فَتَى</strong> — a young man, a youth, someone at the age when identity is still being formed, when the world is still waiting to see what you will become. The Quran uses this word deliberately. These are not seasoned scholars with decades of spiritual formation behind them. They are not prophets with miraculous proofs. They are young men who believed, and whose belief put them in the path of danger.</p>

  <blockquote class="ayah-quote" data-ayah="18:13">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:13 -->نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِٱلْحَقِّ ۚ إِنَّهُمْ فِتْيَةٌ ءَامَنُوا۟ بِرَبِّهِمْ وَزِدْنَـٰهُمْ هُدًى</p>
    <p class="translation">"We narrate to you their story in truth. Indeed, they were young men who believed in their Lord, and We increased them in guidance."</p>
    <cite>Surah Al-Kahf (18:13)</cite>
  </blockquote>

  <p>Three verbs carry the weight of this verse. <strong>Āmanū</strong> — they believed. <strong>Zidnāhum</strong> — We increased them. <strong>Hudā</strong> — guidance. The sequence matters: they believed first, and Allah's response to their belief was to give them more of what had produced the belief. Guidance compounds. The young men who walked into the city's crossroads with their faith intact walked out with more faith than they entered with.</p>

  <p>The next verse tells us what they did with it:</p>

  <blockquote class="ayah-quote" data-ayah="18:14">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:14 -->وَرَبَطْنَا عَلَىٰ قُلُوبِهِمْ إِذْ قَامُوا۟ فَقَالُوا۟ رَبُّنَا رَبُّ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ لَن نَّدْعُوَا۟ مِن دُونِهِۦٓ إِلَـٰهًا ۖ لَّقَدْ قُلْنَآ إِذًا شَطَطًا</p>
    <p class="translation">"And We bound fast their hearts when they stood up and said: Our Lord is the Lord of the heavens and the earth. We will never call upon any deity other than Him — if we did, we would have said an outrage."</p>
    <cite>Surah Al-Kahf (18:14)</cite>
  </blockquote>

  <p><strong>Rabatna 'alā qulūbihim</strong> — "We bound upon their hearts." The verb <strong>r-b-t</strong> means to tie, to fasten, to secure. Allah bound their hearts so they would not waver when they stood up to speak. The binding happened before the speech. The courage was not their own production — it was installed. They stood up, and the words came from hearts that Allah had already secured.</p>

  <h2>What the City Required</h2>

  <p>Verse 18:20 reveals the stakes: <strong>innahu in yadharū 'alaykum yarjumūkum aw yu'īdūkum fī millatihim</strong> — "if they come upon you, they will stone you or force you back into their religion." Two options: death or apostasy. The word <strong>yarjumūkum</strong> — they will stone you — is not a metaphor. The word <strong>yu'īdūkum fī millatihim</strong> — they will return you to their religion — describes compelled apostasy, the forcible erasure of the identity they have built. The young men understood this. They were not naive. They knew what the alternative to the cave was.</p>

  <p>The city's demand was not merely inconvenient. It was a demand for the surrender of the self — the part of the self that says "rabbuna rabbas-samawati wal-ard." Compromise would have been survival at the price of the thing that makes survival worth having. They chose the cave.</p>

  <h2>The Prayer at the Entrance</h2>

  <blockquote class="ayah-quote" data-ayah="18:10">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:10 -->إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا</p>
    <p class="translation">"When the young men took refuge in the cave and said: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.'"</p>
    <cite>Surah Al-Kahf (18:10)</cite>
  </blockquote>

  <p>Two requests. <strong>Rahma</strong> — mercy, from Allah's own storehouse: <strong>min ladunka</strong>, "from You directly," not mediated through any worldly means. And <strong>rashad</strong> — right guidance, rectitude, the sense of moving in the right direction. They do not ask to be rescued from the cave. They do not ask to be taken back to the city in triumph. They ask for mercy and direction — the two things that make any situation livable.</p>

  <p>The prayer is the posture of tawakkul: I cannot see the way forward, but You can prepare ease in my situation. This is the exact promise Allah makes in 18:16 — <strong>wa yuhayyia lakum min amrikum mirfaqan</strong>, "He will prepare for you ease in your situation." The young men ask for <strong>rashad</strong>; Allah responds with <strong>mirfaq</strong>. They asked for direction; He gave them ease. He exceeded the request.</p>

  <h2>Withdrawal as Strategy</h2>

  <blockquote class="ayah-quote" data-ayah="18:16">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:16 -->وَإِذِ ٱعْتَزَلْتُمُوهُمْ وَمَا يَعْبُدُونَ إِلَّا ٱللَّهَ فَأْوُۥٓا۟ إِلَى ٱلْكَهْفِ يَنشُرْ لَكُمْ رَبُّكُم مِّن رَّحْمَتِهِۦ وَيُهَيِّئْ لَكُم مِّنْ أَمْرِكُم مِّرْفَقًا</p>
    <p class="translation">"And when you have withdrawn from them and what they worship other than Allah, take refuge in the cave — your Lord will spread out for you of His mercy and will prepare for you ease in your situation."</p>
    <cite>Surah Al-Kahf (18:16)</cite>
  </blockquote>

  <p>The verb <strong>i'tazaltumūhum</strong> — "you have withdrawn from them" — carries a double object. They withdrew from the people <em>and</em> from what those people worshipped. The separation is complete: from the community that demands apostasy and from the objects of the community's worship. The withdrawal is theological, not merely geographic.</p>

  <p>And what follows the withdrawal? <strong>Yanshur lakum rabbukum min rahmatihi</strong> — "your Lord will spread out for you of His mercy." The verb <strong>yanshur</strong> — to spread out, to unfurl — is used for deploying something large. When you withdraw from what contradicts your Lord, your Lord spreads out His mercy around you. The cave is not punishment. It is the spreading out of the mercy that the city was preventing them from receiving.</p>

  <p>The Quran does not romanticize the cave. It is dark, isolated, and cut off from everything they knew. But it is also the place where three hundred and nine years pass under divine protection, where the sun tracks across the entrance without harming them, and where they wake up — hungry, calm, and asking only where to buy food. The cave is what it looks like when Allah prepares ease in your situation.</p>
</article>`
    }
  },

  // Article 2: The Dog at the Threshold
  {
    primaryEntity: ASHAB_AL_KAHF_ID,
    secondaryEntities: [TAWAKKUL_ID],
    article: {
      title: "The Dog at the Threshold: A Detail the Quran Won't Let Go",
      slug: "the-dog-at-the-threshold-ashab-al-kahf",
      type: 'article',
      excerpt: "In 18:18, the Quran describes the sleepers of the cave — their bodies being turned, their apparent wakefulness. And then it pauses to note: their dog, stretched out at the threshold. The detail appears three times. The Quran is trying to tell us something.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['ashab-al-kahf', 'quranic-characters', 'tawakkul'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran is economical. It does not include details for color or texture. When it describes the sleepers of the cave — their bodies being turned, their eyes open and terrifying to a bystander — and then pauses to tell us about the dog, the detail has a reason. The dog appears in 18:18. It appears again in 18:22, where people speculating about the number of sleepers keep adding "and their dog" to each count, unable to omit it. The Quran includes it every time. Something is being said.</p>

  <h2>The Verse</h2>

  <blockquote class="ayah-quote" data-ayah="18:18">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:18 -->وَتَحْسَبُهُمْ أَيْقَاظًا وَهُمْ رُقُودٌ ۚ وَنُقَلِّبُهُمْ ذَاتَ ٱلْيَمِينِ وَذَاتَ ٱلشِّمَالِ ۖ وَكَلْبُهُم بَـٰسِطٌ ذِرَاعَيْهِ بِٱلْوَصِيدِ ۚ لَوِ ٱطَّلَعْتَ عَلَيْهِمْ لَوَلَّيْتَ مِنْهُمْ فِرَارًا وَلَمُلِئْتَ مِنْهُمْ رُعْبًا</p>
    <p class="translation">"And you would think them awake, while they were asleep. And We turned them to the right and to the left, while their dog stretched out its forelegs at the threshold. If you had looked at them, you would have turned from them in flight and been filled with terror of them."</p>
    <cite>Surah Al-Kahf (18:18)</cite>
  </blockquote>

  <p>Four elements in this verse: the appearance of wakefulness, the divine turning, the dog at the threshold, and the terror an observer would feel. The verse moves from the physical to the theological and back. The divine turning — <strong>nuqallibuhum dhāt al-yamīni wa dhāt al-shimāl</strong> — is Allah actively managing their bodies through the centuries, preventing decay. And in the middle of this divine action, the Quran notes: <strong>wa kalbuhum bāsitun dhirā'ayhi bil-wasīd</strong> — their dog, stretched out, at the threshold.</p>

  <h2>The Posture</h2>

  <p><strong>Bāsit</strong> — stretching out. <strong>Dhirā'ayhi</strong> — its two forelegs. The dog is in the posture of a resting animal that hasn't fully relaxed — forelegs extended, ready. It is the posture of a dog keeping watch. Not curled up asleep. Not standing alert. Extended at the entrance, in the liminal space between inside and outside.</p>

  <p><strong>Bil-wasīd</strong> — at the threshold, the doorstep, the entrance. The word <strong>wasīd</strong> denotes the place where interior and exterior meet. The dog is stationed exactly there — not inside with the sleepers, not outside with the world that would harm them. At the boundary. A guardian that does not know what it is guarding, positioned at the only point that matters.</p>

  <h2>The Dog in the Count</h2>

  <p>In 18:22, people argue about the number of sleepers. Three, the fourth being their dog. Five, the sixth being their dog. Seven, the eighth being their dog. In every version of the count — three different numbers for the humans — the dog is the additional member, always present, always counted alongside the sleepers. The Quran records this pattern because it is instructive: whatever the number of the young men, the dog cannot be argued away. It is a permanent attachment. It went where they went. The miracle extended to include it.</p>

  <h2>What the Dog Could Not Do</h2>

  <p>The dog did not choose to believe. It cannot believe — dogs are not <strong>mukallaf</strong>, not obligated by divine law, not capable of the kind of deliberate faith the young men exercised when they stood up and said "our Lord is the Lord of the heavens and the earth." The dog followed for reasons that are entirely animal — attachment, pack instinct, the inability to be left behind by its people.</p>

  <p>And yet it is in the cave. It is in the miracle. It is in the Quran, named in the count of the blessed.</p>

  <p>Classical scholars have noted this quietly across centuries. Ibn Kathir records that the dog's presence in the cave alongside the sleepers is one of the evidences of how completely Allah's mercy encompassed the companions — it reached even the animal that had attached itself to them. The young men's tawakkul drew a circle of protection, and the dog was inside the circle.</p>

  <h2>Loyalty at the Threshold</h2>

  <p>There is a quality the Quran is honoring in the dog, though it cannot name it a virtue in the human sense: the quality of not leaving. The young men left the city to preserve their faith. The dog left with them for reasons it could not articulate. They entered the cave; the dog took its position at the entrance. It did not enter and did not abandon. It sat at the boundary between the interior of the miracle and the exterior world that would have destroyed its companions.</p>

  <p>The Quran preserves this detail because the detail is load-bearing. The dog at the threshold is the Quran's testimony that when Allah protects, Allah protects fully — including the faithless companion who arrived at the cave not by theology but by attachment. The mercy spreads to cover what followed the faithful, not because the follower understood what it was following, but because the faithful had chosen and the faithful were under divine care.</p>

  <p>Loyalty, even animal loyalty, is given its place in the story. The dog stretched out its forelegs at the threshold. The Quran noted it. Three hundred and nine years later, the noting still stands.</p>
</article>`
    }
  },

  // Article 3: 309 Years
  {
    primaryEntity: ASHAB_AL_KAHF_ID,
    secondaryEntities: [],
    article: {
      title: "309 Years: What the Quran Does With a Disputed Number",
      slug: "309-years-what-the-quran-does-with-a-disputed-number",
      type: 'article',
      excerpt: "The Quran gives us the number — three hundred and nine years — and then immediately says: 'Allah knows best how long they stayed.' It provides the information and surrenders the authority in the same breath. This is the Quran's epistemology, and it is not accidental.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['ashab-al-kahf', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Three hundred and nine years. The Quran gives the number, and then immediately defers: <strong>Allahu a'lamu bimā labithū</strong> — Allah knows best how long they stayed. This sequence — information followed by deference — is not contradiction. It is the Quran's way of teaching us how to hold knowledge: receive what is given, release the claim to completeness. The cave story is a story about time, but the Quran is less interested in the duration than in what the duration reveals about who is really counting.</p>

  <h2>The Argument About the Number</h2>

  <p>Before the Quran gives the number of years, it records the argument about the number of people — and models the correct posture before disputed knowledge:</p>

  <blockquote class="ayah-quote" data-ayah="18:22">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:22 -->سَيَقُولُونَ ثَلَـٰثَةٌ رَّابِعُهُمْ كَلْبُهُمْ وَيَقُولُونَ خَمْسَةٌ سَادِسُهُمْ كَلْبُهُمْ رَجْمًۢا بِٱلْغَيْبِ ۖ وَيَقُولُونَ سَبْعَةٌ وَثَامِنُهُمْ كَلْبُهُمْ ۚ قُل رَّبِّىٓ أَعْلَمُ بِعِدَّتِهِم مَّا يَعْلَمُهُمْ إِلَّا قَلِيلٌ ۗ فَلَا تُمَارِ فِيهِمْ إِلَّا مِرَآءً ظَـٰهِرًا وَلَا تَسْتَفْتِ فِيهِم مِّنْهُمْ أَحَدًا</p>
    <p class="translation">"They will say: Three, the fourth of them being their dog; and they will say: Five, the sixth of them being their dog — guessing at the unseen; and they will say: Seven, and the eighth of them being their dog. Say: My Lord knows best their number. None know them except a few. So do not argue about them except with an outward argument, and do not inquire about them from anyone among them."</p>
    <cite>Surah Al-Kahf (18:22)</cite>
  </blockquote>

  <p>Three different counts. And then the instruction: <strong>qul rabbī a'lamu bi'iddatihim</strong> — "Say: My Lord knows best their number." The Quran is not interested in the number of sleepers as a knowledge project. The number is <strong>ghayb</strong> — unseen — and the correct posture before the ghayb is not argument but deference. The Prophet is instructed to redirect, not to adjudicate. <strong>Falā tumāri fīhim</strong> — do not argue about them. The knowledge belongs to Allah; the argument belongs to those who have confused having an opinion with having the truth.</p>

  <h2>The Number of Years</h2>

  <blockquote class="ayah-quote" data-ayah="18:25">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:25 -->وَلَبِثُوا۟ فِى كَهْفِهِمْ ثَلَـٰثَ مِا۟ئَةٍ سِنِينَ وَٱزْدَادُوا۟ تِسْعًا</p>
    <p class="translation">"And they remained in their cave for three hundred years and added nine."</p>
    <cite>Surah Al-Kahf (18:25)</cite>
  </blockquote>

  <p>Three hundred years and added nine. The phrasing <strong>thalātha mi'atin sinīna waz-dādū tis'an</strong> is notable: the nine are added, appended — as if they are supplemental to the rounder number. Classical scholars noted that the solar year and the lunar year differ by approximately eleven days per year. Over three hundred solar years, the accumulated difference equals roughly nine lunar years. Three hundred solar years is three hundred and nine lunar years. The Quran, using the lunar calendar of the Arab world, gives the lunar count. The additional nine are the calendar's own accounting.</p>

  <p>But this precision is followed immediately by its own correction:</p>

  <blockquote class="ayah-quote" data-ayah="18:26">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:26 -->قُلِ ٱللَّهُ أَعْلَمُ بِمَا لَبِثُوا۟ ۖ لَهُۥ غَيْبُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۖ أَبْصِرْ بِهِۦ وَأَسْمِعْ ۚ مَا لَهُم مِّن دُونِهِۦ مِن وَلِىٍّ وَلَا يُشْرِكُ فِى حُكْمِهِۦٓ أَحَدًا</p>
    <p class="translation">"Say: Allah knows best how long they remained. His is the unseen of the heavens and the earth. How Seeing is He and how Hearing! They have no protector other than Him, and He shares His rule with no one."</p>
    <cite>Surah Al-Kahf (18:26)</cite>
  </blockquote>

  <p>The number is given: 309 years. And then: Allah knows best. The two statements are not in tension — they are the Quran's epistemological signature in full expression. Here is the data. And here is the reminder that data is not the same as omniscience. The number 309 is what we have been given. <strong>Lahu ghaybu al-samawati wal-ard</strong> — His is the unseen of the heavens and the earth — is the context in which 309 exists. The number lives inside a universe of knowledge that 309 only partially describes.</p>

  <p>The verse continues: <strong>abṣir bihi wa asmi'</strong> — "how Seeing is He, how Hearing!" This is an expression of marvel at divine perception — a rhetorical form that underlines the contrast between what Allah knows (everything) and what the arguers know (a guess). The question of how many sleepers there were, how long they stayed, what exactly happened — these are all fully held in the awareness of the One who arranged the sleep and chose the waking. The arguers are guessing at the boundary of human knowledge. Allah was there.</p>

  <h2>What the Number Is Not For</h2>

  <p>The detail about 309 years is not intended to launch a calculation exercise. The Quran does not tell us when the sleepers entered the cave so that we can date their exit. It does not identify the city so that we can verify the historical record. The number is given, and then the authority over the number is returned to Allah, and the story moves on.</p>

  <p>This is the Quran's consistent posture with historical detail: provide what serves the lesson, decline to provide what serves only curiosity. The duration of 309 years tells us something important — not primarily about the calendar, but about the scope of divine care. These young men slept for more than three centuries. The world turned without them. Empires shifted. Languages evolved. And throughout all of it, Allah turned their bodies, sustained their sleep, and chose the moment of their waking. The number 309 is not a chronological fact to be verified. It is a testimony to the scale of divine attention paid to people who chose the cave over compromise.</p>

  <h2>Learning to Hold Knowledge</h2>

  <p>The cave story teaches us how to hold knowledge in three moves. First: the counting argument in 18:22 — some knowledge is ghayb, and the correct response to ghayb is <strong>qul rabbī a'lam</strong>, "say: my Lord knows best." Second: the number in 18:25 — some knowledge is given, and we receive it. Third: the deference in 18:26 — even given knowledge lives inside the larger field of what Allah knows and we do not. The three moves together form a complete epistemology: receive what is given, do not chase what is withheld, and hold even the given in the knowledge that it is partial.</p>

  <p>People who know too little about something often argue loudly. People who know a little — enough to feel certain — argue louder. The Quran interrupts both postures with the same instruction: <strong>qul rabbī a'lam</strong>. Say: my Lord knows best. This is not intellectual laziness. It is the recognition that the one who made the thing and sustained it and woke them up at the right time is in a better position to count the years than anyone arguing about it from the outside.</p>
</article>`
    }
  },

  // Article 4: The First Trial - surah argument deep dive
  {
    primaryEntity: ASHAB_AL_KAHF_ID,
    secondaryEntities: [IBLIS_ID, SABR_ID, TAWAKKUL_ID],
    article: {
      title: "The First Trial: Why Al-Kahf Opens With a Cave",
      slug: "the-first-trial-why-al-kahf-opens-with-a-cave",
      type: 'article',
      excerpt: "Al-Kahf tells four stories about four trials: faith, wealth, knowledge, power. The cave story comes first — not by accident. Before a person can navigate the other three, one thing must be settled. The cave story is about what that thing is.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['ashab-al-kahf', 'quranic-characters', 'iblis', 'sabr', 'tawakkul'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Surah Al-Kahf contains four stories. A group of young men who slept in a cave. A man who owned two magnificent gardens. Musa traveling with Khidr, being taught lessons he couldn't understand. Dhul-Qarnayn traveling the earth, building a barrier between nations. Four stories, four settings, four kinds of people. Classical scholars of Quranic structure identified the architecture: each story corresponds to a trial — faith, wealth, knowledge, power. And the cave story is first.</p>

  <h2>The Architecture</h2>

  <p>The arrangement is not random. The surah moves from the most interior trial (belief itself, under direct persecution) to the most exterior (the exercise of geopolitical power). Each trial is a version of the same question: when the thing you rely on — community, wealth, knowledge, dominion — is placed in the path of your relationship with Allah, what do you choose?</p>

  <p>The cave story answers the question in its most elemental form: when the choice is between your belief and your survival in the city, what do you choose? The young men chose the belief. They walked out and found a cave, and Allah prepared ease in their situation. The surah builds from there — the same fundamental question, escalating in social complexity through wealth, knowledge, and power, until the surah ends with Dhul-Qarnayn building a barrier and then declining to take credit for it.</p>

  <p>At the structural center of the surah — between the wealth trial and the knowledge trial, at verse 18:50 — the Quran places the story of Iblis's refusal to prostrate before Adam. The hinge of the four-trial architecture is the being for whom every trial is an opportunity for the same refusal Adam's descendants face. <strong>Afatatakhidhūnahu wa dhurriyyatahu awliyā'a min dūnī</strong> — "Will you then take him and his offspring as allies instead of Me?" The four trials are the terrain of that choice.</p>

  <h2>Why Faith Comes First</h2>

  <p>The cave story is placed first because faith is the precondition. Wealth can be either a trial toward gratitude or toward arrogance — but only if the person holding the wealth has first settled the question of who the wealth belongs to. Knowledge can be either a door to humility (as Musa learns with Khidr) or to arrogance (as the owner of the two gardens demonstrates) — but only if the question of the source of knowledge has been addressed. Power can either build barriers that protect the vulnerable or collapse into self-aggrandizement — but only if the person holding power knows they are a steward and not an owner.</p>

  <p>The cave story settles the foundational question: when pressed, who is your Lord? The young men answer it with their bodies. They leave everything — city, community, comfort, safety — and enter a cave, and their prayer is <strong>rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada</strong>: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance." Not rescue. Not victory. Mercy and direction. The question of who the Lord is has been answered before the prayer is spoken.</p>

  <blockquote class="ayah-quote" data-ayah="18:14">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:14 -->وَرَبَطْنَا عَلَىٰ قُلُوبِهِمْ إِذْ قَامُوا۟ فَقَالُوا۟ رَبُّنَا رَبُّ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ لَن نَّدْعُوَا۟ مِن دُونِهِۦٓ إِلَـٰهًا ۖ لَّقَدْ قُلْنَآ إِذًا شَطَطًا</p>
    <p class="translation">"And We bound fast their hearts when they stood up and said: Our Lord is the Lord of the heavens and the earth. We will never call upon any deity other than Him — if we did, we would have said an outrage."</p>
    <cite>Surah Al-Kahf (18:14)</cite>
  </blockquote>

  <p><strong>Rabbuna rabbas-samawati wal-ard.</strong> Our Lord is the Lord of the heavens and the earth. This declaration — spoken in a city that demands a different declaration — is the act that unlocks the whole structure. They did not escape the trial of faith by getting a better argument. They escaped it by standing up and speaking the truth while Allah bound their hearts so they would not waver. The courage was installed. The words were true. The rest followed.</p>

  <h2>The Command After the Story</h2>

  <p>The surah does not leave the cave story as history. After the story concludes, the Quran pivots immediately to address the Prophet ﷺ — and through him, every person reading the surah in any generation — with an instruction that is the practical implication of what the cave story demonstrated:</p>

  <blockquote class="ayah-quote" data-ayah="18:28">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:18:28 -->وَٱصْبِرْ نَفْسَكَ مَعَ ٱلَّذِينَ يَدْعُونَ رَبَّهُم بِٱلْغَدَوٰةِ وَٱلْعَشِىِّ يُرِيدُونَ وَجْهَهُۥ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُۥ عَن ذِكْرِنَا وَٱتَّبَعَ هَوَىٰهُ وَكَانَ أَمْرُهُۥ فُرُطًا</p>
    <p class="translation">"And keep yourself patient [in the company of] those who call upon their Lord morning and evening, seeking His face. And let not your eyes pass beyond them, desiring the adornments of the worldly life. And do not obey one whose heart We have made heedless of Our remembrance and who follows his desire and whose affair is ever in neglect."</p>
    <cite>Surah Al-Kahf (18:28)</cite>
  </blockquote>

  <p><strong>Wasbir nafsaka ma'a alladhīna yad'ūna rabbahum.</strong> Keep yourself — actively, effortfully, <strong>iṣbir</strong> — with the people who call on their Lord. The verb <strong>ṣabr</strong> here is applied not to enduring hardship but to enduring company: stay with these people, don't let the pull of worldly adornment move your eyes away from them. The cave story ends with a community instruction. After the young men model what faith under pressure looks like, the address shifts to the Prophet and his companions: your cave is their company. Do not leave it.</p>

  <p>The contrast that follows sharpens the choice: do not obey the one whose heart Allah has made heedless. Two communities are drawn: the ones who call on their Lord at morning and evening, seeking His face; and the ones whose hearts have drifted from remembrance, following their desires. The cave story is ultimately about which community you choose to be with — and the command is to keep yourself there even when it is difficult, even when the adornment of worldly life is pulling your eyes away.</p>

  <h2>Why We Read It Every Friday</h2>

  <p>The tradition that Surah Al-Kahf should be read every Friday is well-established. The structure of the surah illuminates why. Every week is a new exposure to one of the four trials. On any given Friday, a person may be facing the trial of faith — their belief under social pressure, their community demanding a different declaration. Or the trial of wealth — abundance threatening gratitude, or scarcity threatening trust. Or the trial of knowledge — certainty curling into arrogance, or exposure to what we don't understand curling into frustration. Or the trial of power — influence over others becoming a test of character.</p>

  <p>The surah does not tell you which trial you are in. It gives you all four, every week, so that you can recognize the one that is active. And it begins every time with the cave — with the first and foundational trial — because whatever trial you are facing, the question underneath it is the same one the young men answered when they stood up and spoke and entered the dark.</p>

  <p>Who is your Lord? When the city requires you to say otherwise, what will you say?</p>

  <p>The cave is prepared. The mercy spreads. The ease is arranged. But first, the standing up. First, the words. First, the heart that Allah has already bound — if you will let Him.</p>
</article>`
    }
  }
]

async function main() {
  console.log('Inserting Ashab al-Kahf articles...')

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

    if (secondaryEntities) {
      for (const secId of secondaryEntities) {
        await supabase
          .from('entity_tags')
          .insert({ post_id: post.id, entity_id: secId, is_primary: false })
      }
    }
  }

  await supabase.rpc('refresh_entity_co_occurrence')
  console.log(`\n✓ Done! ${articles.length} articles inserted.`)
}

main().catch(console.error)
