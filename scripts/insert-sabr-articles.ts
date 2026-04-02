import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const SABR_ID     = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49';
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a';

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Root That Means Binding: Sabr Before It Meant Patience",
      slug: "the-root-that-means-binding-sabr-before-it-meant-patience",
      type: 'article',
      excerpt: "The Arabic root of sabr means to bind, to withhold, to hold in place. Sabr is not passive endurance — it is active restraint. The Quran's usage reveals a word about what you choose not to do, and why that choice is the hardest one.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['sabr', 'quranic-concepts', 'tawakkul'],
      seo_description: "The Arabic root of sabr means 'to bind' or 'to restrain.' It is not passive endurance but active holding. An exploration of the semantic structure of sabr in the Quran and what the word reveals about the Quranic concept of patience.",
      content_html: `<article class="prose-blog">

  <p>The English word "patience" is passive. You wait. You endure. You are acted upon by circumstances and you do not crack. The Arabic root behind sabr is different in a way that matters.</p>

  <p>The root is <strong>ṣa-ba-ra</strong> (ص ب ر). Its primary meanings in classical Arabic lexicography include: to bind, to confine, to withhold, to hold something in place. <em>Ṣabara al-rajul</em> means the man held himself back. <em>Al-ṣabr</em> in pre-Islamic poetry could refer to confinement — a person bound and restrained. The root is about the act of holding, not about the state of waiting.</p>

  <h2>What the Quran Commands</h2>

  <blockquote class="ayah-quote" data-ayah="2:155">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:155 -->وَلَنَبْلُوَنَّكُم بِشَىْءٍ مِّنَ ٱلْخَوْفِ وَٱلْجُوعِ وَنَقْصٍ مِّنَ ٱلْأَمْوَٰلِ وَٱلْأَنفُسِ وَٱلثَّمَرَٰتِ ۗ وَبَشِّرِ ٱلصَّـٰبِرِينَ</p>
    <p class="translation">"And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient."</p>
    <cite>Surah Al-Baqarah (2:155)</cite>
  </blockquote>

  <p>The verse gives a taxonomy of tests: fear, hunger, loss of wealth, loss of life, loss of crops and income. These are not abstract trials — they are the specific pressures that cause people to break, to abandon their commitments, to stop believing. And the command at the end is: give good tidings to the <em>ṣābirīn</em>.</p>

  <p>The <em>ṣābirīn</em> are not those who happen to endure — they are those who have chosen the act of binding. When fear arrives, they bind themselves to their faith. When hunger comes, they hold themselves in place. The verb form <em>ṣabara</em> implies agency. You do not passively become a ṣābir. You make yourself one by the act of restraint.</p>

  <h2>Sabr as Withholding</h2>

  <p>One of the specific usages in classical Arabic is <em>ṣabara nafsahu</em> — he restrained his self, he bound his nafs. The nafs — the self — is the thing that wants to react, to flee, to despair, to retaliate. Sabr is the act of holding the nafs in check when it would rather not be held.</p>

  <p>This dimension appears in Luqman's advice to his son:</p>

  <blockquote class="ayah-quote" data-ayah="31:17">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:31:17 -->يَـٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ</p>
    <p class="translation">"O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you. Indeed, that is of the matters requiring determination."</p>
    <cite>Surah Luqman (31:17)</cite>
  </blockquote>

  <p><em>Iṣbir 'alā mā aṣābak</em> — be patient with what befalls you. The preposition <em>'alā</em> — upon, over — is significant. Luqman is not telling his son to endure passively. He is telling him to hold himself upon the thing that hits him — to stay on top of it, to not be knocked off course by it. The posture is active weight-bearing, not passive reception.</p>

  <p>And then: <em>inna dhālika min 'azm al-umūr</em> — indeed this is from the matters of determination, of firm resolve. <em>'Azm</em> — determination, the will to do what you have decided to do. Sabr is placed in the category of acts requiring will, not temperament. It is something you do, not something you are born suited to.</p>

  <h2>Sabr and Its Companions in 2:177</h2>

  <blockquote class="ayah-quote" data-ayah="2:177">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:177 -->۞ لَّيْسَ ٱلْبِرَّ أَن تُوَلُّوا۟ وُجُوهَكُمْ قِبَلَ ٱلْمَشْرِقِ وَٱلْمَغْرِبِ وَلَـٰكِنَّ ٱلْبِرَّ مَنْ ءَامَنَ بِٱللَّهِ وَٱلْيَوْمِ ٱلْـَٔاخِرِ وَٱلْمَلَـٰٓئِكَةِ وَٱلْكِتَـٰبِ وَٱلنَّبِيِّـۧنَ وَءَاتَى ٱلْمَالَ عَلَىٰ حُبِّهِۦ ذَوِى ٱلْقُرْبَىٰ وَٱلْيَتَـٰمَىٰ وَٱلْمَسَـٰكِينَ وَٱبْنَ ٱلسَّبِيلِ وَٱلسَّآئِلِينَ وَفِى ٱلرِّقَابِ وَأَقَامَ ٱلصَّلَوٰةَ وَءَاتَى ٱلزَّكَوٰةَ وَٱلْمُوفُونَ بِعَهْدِهِمْ إِذَا عَـٰهَدُوا۟ ۖ وَٱلصَّـٰبِرِينَ فِى ٱلْبَأْسَآءِ وَٱلضَّرَّآءِ وَحِينَ ٱلْبَأْسِ ۗ أُو۟لَـٰٓئِكَ ٱلَّذِينَ صَدَقُوا۟ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُتَّقُونَ</p>
    <p class="translation">"Righteousness is not that you turn your faces toward the east or the west, but righteousness is in one who believes in Allah, the Last Day, the angels, the Book, and the prophets; and gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveler, those who ask, and for freeing slaves; and establishes prayer and gives zakah; and fulfill their promise when they make a promise; and are patient in poverty and hardship and during battle. Those are the ones who have been true, and it is those who are the righteous."</p>
    <cite>Surah Al-Baqarah (2:177)</cite>
  </blockquote>

  <p>This verse gives the Quran's fullest definition of <em>birr</em> — righteousness. It lists beliefs, then actions, then a category at the end: <em>al-ṣābirīna fī al-ba'sā' wa al-ḍarrā' wa ḥīna al-ba's</em> — the patient in poverty, in hardship, and in the moment of battle.</p>

  <p>Three types of circumstances. Three types of binding: holding the self through material deprivation (<em>ba'sā'</em>), through injury and suffering (<em>ḍarrā'</em>), and in the active moment of armed confrontation (<em>ba's</em>). The last one — patience in battle — makes clear that sabr is not the absence of action. In battle, you are doing something intensely. Sabr in that context means holding your position, not fleeing, not breaking — while actively engaged.</p>

  <p>The verse ends: <em>ulā'ika alladhīna ṣadaqū</em> — those are the ones who were true. The ṣābirīn are defined as people of truthfulness. The connection suggests that sabr is a form of keeping faith — with your commitments, with your belief, with the God you claimed to follow when conditions were easier.</p>

  <h2>What the Root Teaches</h2>

  <p>The root ṣa-ba-ra names an act of will, not a temperamental trait. You are not patient because you are built that way. You perform sabr by choosing to hold yourself in place when everything is pushing you to move. The Quran addresses the <em>ṣābirīn</em> as people who have done something, not people who happen to be something. The good tidings at the end of 2:155 are for those who made the choice.</p>

</article>`
    },
    primaryEntityId: SABR_ID,
    secondaryEntityIds: [TAWAKKUL_ID],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Bi-Ghayri Hisab: The One Reward Without an Account",
      slug: "bi-ghayri-hisab-the-one-reward-without-an-account",
      type: 'article',
      excerpt: "In 39:10, the Quran specifies that the reward for sabr will be given bi-ghayri hisab — without account, without measure, without limit. Every other reward in the Quran has a scale. This one doesn't. What does it mean that the reward for patience exceeds calculation?",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['sabr', 'quranic-concepts', 'tawakkul'],
      seo_description: "In 39:10, the Quran promises that the patient will be given their reward bi-ghayri hisab — without account or measure. An exploration of why sabr's reward is the only one in the Quran that exceeds calculation.",
      content_html: `<article class="prose-blog">

  <p>The Quran has an economy of reward. Actions have returns. Good deeds are multiplied — sometimes ten-fold, sometimes seven hundred-fold, sometimes more. The scale is stated, the multiplier is named. The Quran is specific about divine generosity in a way that makes the promises concrete.</p>

  <p>There is one exception.</p>

  <blockquote class="ayah-quote" data-ayah="39:10">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:39:10 -->قُلْ يَـٰعِبَادِ ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ رَبَّكُمْ ۚ لِلَّذِينَ أَحْسَنُوا۟ فِى هَـٰذِهِ ٱلدُّنْيَا حَسَنَةٌ ۗ وَأَرْضُ ٱللَّهِ وَٰسِعَةٌ ۗ إِنَّمَا يُوَفَّى ٱلصَّـٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ</p>
    <p class="translation">"Say: 'O My servants who have believed, fear your Lord. For those who do good in this world is good, and the earth of Allah is spacious. Indeed, the patient will be given their reward without account.'"</p>
    <cite>Surah Az-Zumar (39:10)</cite>
  </blockquote>

  <h2>The Grammar of the Verse</h2>

  <p>The verse has a structure that builds toward its final phrase. The Prophet is told to address the believers. For those who do good in this world there is good — a general principle. The earth of Allah is spacious — an encouragement not to be constrained by circumstances. And then: <em>innamā yuwaffā al-ṣābirūna ajrahum bi-ghayri ḥisāb</em>.</p>

  <p><em>Innamā</em> — only, exclusively, it is solely. The particle restricts and specifies. What follows is the exclusive statement. <em>Yuwaffā</em> — will be given in full, will receive complete payment. The root <em>wafā</em> means fulfillment, completion, payment of what is owed in total. The patient will receive the complete, total, full payment of their reward.</p>

  <p>And then: <em>bi-ghayri ḥisāb</em> — without account. <em>Ḥisāb</em> is reckoning, calculation, accounting. The reward for sabr is given without the standard mechanism of calculation.</p>

  <h2>What Bi-Ghayri Hisab Means</h2>

  <p>The phrase appears elsewhere in the Quran in a different application: God provides for whom He wills <em>bi-ghayri ḥisāb</em> (2:212, 3:27, 3:37). In those contexts it describes divine generosity that exceeds normal economic categories — not constrained by the usual ledger. The same phrase applied to the reward for sabr suggests the same thing: the return is not measured by the same scale that measures other returns.</p>

  <p>Classical scholars interpreted this in several ways: the reward will be so great it cannot be counted; the reward will be given directly without the usual weighing of deeds; the patient will enter the garden without the standard accounting process. Each interpretation conveys the same fundamental point: sabr places the one who performs it in a category whose reward the normal economy of divine recompense cannot contain.</p>

  <h2>Why This Particular Action</h2>

  <p>What is distinctive about sabr that its reward exceeds accounting?</p>

  <p>Other acts of worship — prayer, fasting, charity, pilgrimage — have specified forms and specified conditions. They are bounded. They can be counted: this many prayers, this many days of fasting, this amount of wealth given. They are performed and completed.</p>

  <p>Sabr has no defined form. It has no prescribed number. It is performed in every circumstance where it is needed, and it is needed differently in each situation. The Quran enjoins patience in fear, in hunger, in loss of wealth, in loss of life, in battle, in the reception of insult, in the long slow trials of prophetic mission, in the daily persistence of worship. Sabr is the act underlying every other act of endurance in the Quran. It has no ceiling because the situations that require it have no ceiling.</p>

  <blockquote class="ayah-quote" data-ayah="16:96">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:16:96 -->مَا عِندَكُمْ يَنفَدُ ۖ وَمَا عِندَ ٱللَّهِ بَاقٍ ۗ وَلَنَجْزِيَنَّ ٱلَّذِينَ صَبَرُوٓا۟ أَجْرَهُم بِأَحْسَنِ مَا كَانُوا۟ يَعْمَلُونَ</p>
    <p class="translation">"What is with you will end, and what is with Allah is lasting. And We will surely give those who were patient their reward according to the best of what they used to do."</p>
    <cite>Surah An-Nahl (16:96)</cite>
  </blockquote>

  <p>In 16:96, the reward for sabr is given according to <em>aḥsana mā kānū ya'malūn</em> — the best of what they used to do. Not the average. Not the sum. The best. The reward calibrates to the peak of the act, not the mean.</p>

  <p>Together, 16:96 and 39:10 create a picture: the reward for sabr is calibrated to your best performance of it, and it is given in a quantity that exceeds normal accounting. The Quran does not explain why these two features attach to sabr specifically. It simply states them. And the implication is that the act of holding yourself in place — through fear, through loss, through the long duration of a trial — is treated by the divine economy as a category of action that other categories cannot contain.</p>

</article>`
    },
    primaryEntityId: SABR_ID,
    secondaryEntityIds: [TAWAKKUL_ID],
  },

  // ── Article 3 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Tawasau bil-Sabr: Why Patience Is a Community Obligation",
      slug: "tawasau-bil-sabr-why-patience-is-a-community-obligation",
      type: 'article',
      excerpt: "Surah Al-Asr (103) is three verses. The Imam al-Shafi'i said: if humanity reflected only on this surah, it would be sufficient. The fourth characteristic of the saved — after belief, good deeds, and truth — is tawasau bil-sabr: mutually exhorting each other to patience. Not individual patience. Communal.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['sabr', 'quranic-concepts'],
      seo_description: "Surah Al-Asr names tawasau bil-sabr — mutually exhorting each other to patience — as one of four characteristics of the saved. An exploration of why sabr is framed as communal rather than individual in this surah.",
      content_html: `<article class="prose-blog">

  <p>Surah Al-Asr has three verses. Classical scholars considered it among the most comprehensive surahs in the Quran. Al-Shafi'i said: if people reflected on this surah alone, it would be sufficient for their guidance.</p>

  <p>The first verse is an oath: by Al-'Asr — by time, by the age, by the afternoon. The second verse is a sweeping claim: humanity is in loss. The third verse is the exception — and it has four conditions.</p>

  <blockquote class="ayah-quote" data-ayah="103:3">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:103:3 -->إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ</p>
    <p class="translation">"Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience."</p>
    <cite>Surah Al-Asr (103:3)</cite>
  </blockquote>

  <h2>Four Conditions, Not One</h2>

  <p>The exception has four characteristics: <em>āmanū</em> — believed; <em>wa 'amilū al-ṣāliḥāt</em> — and did righteous deeds; <em>wa tawāṣaw bi-al-ḥaqq</em> — and mutually exhorted each other to truth; <em>wa tawāṣaw bi-al-ṣabr</em> — and mutually exhorted each other to patience.</p>

  <p>The first two conditions are internal — belief and action. The last two are relational — what you do with and for others. The saved community in Surah Al-Asr is not just individually faithful; it is collectively exhorting.</p>

  <p>The word <em>tawāṣaw</em> is the mutual form of <em>waṣā</em> — to counsel, to enjoin, to recommend. The mutual form means both parties are doing it: you counsel me, I counsel you. It is not the expert advising the student or the elder instructing the young. It is people in a community mutually holding each other to truth and to patience. The structure is horizontal, not hierarchical.</p>

  <h2>Why Truth and Patience Together</h2>

  <p>Truth (<em>ḥaqq</em>) and patience (<em>ṣabr</em>) are paired as the content of the mutual exhortation. The pairing is significant. Truth without patience may not survive — a person can know what is right but abandon it under pressure. Patience without truth may be enduring the wrong thing — holding fast to what should be released. Together, they describe what the community is to sustain in each other: the content of what to hold onto, and the capacity to keep holding.</p>

  <p>The Quran elsewhere frequently pairs truth and patience as the two things that make guidance functional over time. In 46:35, the Prophet is told: <em>faṣbir kamā ṣabara ulū al-'azm min al-rusul</em> — be patient as the steadfast messengers were patient. The long arc of prophetic work required both truth — what the prophets were conveying — and sabr — the capacity to keep conveying it when no one was listening.</p>

  <h2>The Surah's Claim About Time</h2>

  <p>The oath in Surah Al-Asr is <em>wa al-'aṣr</em> — by time. Classical interpreters understood this variously: by the age, by the era, by the afternoon prayer, by time itself. Whatever the exact referent, the surah grounds its claim in time: human loss is a function of time passing. People are in loss as time runs out.</p>

  <p>The exception the surah carves out — the four characteristics — is what makes the passage of time not a net loss. Belief accumulates. Righteous deeds compound. And then the two communal acts: exhorting each other to truth and to patience. The surah names these as the conditions under which time is not simply spent but invested.</p>

  <p>The placement of <em>tawāṣaw bi-al-ṣabr</em> at the end of the exception is not incidental. It is the last thing the surah names as the condition for not being among the losers. The surah's architecture suggests: after belief, after deeds, after holding each other to truth — there is still the need to hold each other to patience. The last thing needed, named last, is the one that makes everything else sustainable over time.</p>

  <h2>What This Means for Community</h2>

  <p>The Quran's presentation of sabr in Surah Al-Asr is communal rather than individual. The individual characteristics — belief, deeds — are listed first. Then the relational ones. The implication is that sabr, in its fullest form, is not only performed alone. It is also transmitted, reminded, and mutually sustained in community.</p>

  <p>This is practically significant. The person who is losing their patience in trial needs someone to say: hold on. The person who has forgotten why they are holding on needs the community to articulate the truth again. The <em>tawāṣaw</em> — the mutual exhortation — is how the community performs sabr together, not just individually.</p>

  <p>Surah Al-Asr ends with patience, communally performed, as the final condition of salvation. In a surah of three verses about the meaning of time, the last word is sabr.</p>

</article>`
    },
    primaryEntityId: SABR_ID,
    secondaryEntityIds: [],
  },
];

async function main() {
  console.log('Inserting Sabr articles...');

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

  console.log('\n✓ Done! 3 articles inserted.');
}

main().catch(console.error);
