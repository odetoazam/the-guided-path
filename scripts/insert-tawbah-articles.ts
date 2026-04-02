import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const TAWBAH_ID   = 'f4f69408-d31f-44d7-8ff1-ed3682ea6692';
const ADAM_ID     = 'a70c4879-33e8-4b00-9b22-4f8cb1218ece'; // check below
const IBLIS_ID    = '6647d520-3558-4ff2-882e-c85a706b1c47';
const FIRAUN_ID   = '7c3ef0b7-1b59-4562-a4c8-25d30f0d40ce'; // check below
const MUSA_ID     = 'b1dcdb38-38ba-44b9-9f6d-65e785b5ef4e'; // check below

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Root That Means Return: Tawbah Before It Became Repentance",
      slug: "the-root-that-means-return-tawbah-before-it-became-repentance",
      type: 'article',
      excerpt: "The Arabic root ta-wa-ba means to turn back. The Quran uses it for the servant turning to God AND for God turning to the servant. Al-Tawwab is not 'the Forgiving' but 'the Ever-Returning.' The direction of the word changes what tawbah is.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['tawbah', 'quranic-concepts', 'adam'],
      seo_description: "The Arabic root of tawbah means 'to return.' The Quran uses it for both the servant's return to God and God's return to the servant. An exploration of the semantic structure of repentance in the Quran.",
      content_html: `<article class="prose-blog">

  <p>The English word "repentance" implies contrition — feeling bad about what you did, expressing that feeling, hoping for forgiveness. It is a one-directional movement: from sinner toward God, waiting to see if the petition is accepted. This is not quite what the Arabic root captures.</p>

  <p>The root is <strong>ta-wa-ba</strong> (ت و ب). It means: to turn back. To return. To come back to where you were. The verb is used in the Quran in both directions — for the person returning to God, and for God returning to the person. The same word does both, and the doubling is not accidental.</p>

  <h2>The First Tawbah in the Quran</h2>

  <blockquote class="ayah-quote" data-ayah="2:37">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:37 -->فَتَلَقَّىٰٓ ءَادَمُ مِن رَّبِّهِۦ كَلِمَـٰتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ</p>
    <p class="translation">"Then Adam received from his Lord words, and He turned toward him. Indeed, it is He who is the Accepting of Repentance, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:37)</cite>
  </blockquote>

  <p>The verse records the first tawbah in Quranic narrative. Adam ate from the tree. He and Hawwa were expelled. They received words from their Lord — <em>kalimāt</em>, the content of which the Quran does not specify, though 7:23 gives us their du'a — and then: <em>fa-tāba 'alayhi</em>. He turned toward him.</p>

  <p>The subject of the verb here is God. <em>Tāba 'alayhi</em> — He turned to him, returned to him. The tawbah in this sentence is God's, not Adam's. Adam received words; God turned. The sequence gives priority to divine movement.</p>

  <p>The verse closes by naming God: <em>innahu huwa al-Tawwābu al-Raḥīm</em>. Al-Tawwāb — the intensive, repeated form of the verb. Not merely "the one who accepts tawbah" but "the one who continually returns, repeatedly turns back toward." The pattern is structural: God's tawbah-toward-us is named as one of His attributes. It is something He does repeatedly, by nature.</p>

  <h2>The Same Pattern with Musa's People</h2>

  <blockquote class="ayah-quote" data-ayah="2:54">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:54 -->وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِۦ يَـٰقَوْمِ إِنَّكُمْ ظَلَمْتُمْ أَنفُسَكُم بِٱتِّخَاذِكُمُ ٱلْعِجْلَ فَتُوبُوٓا۟ إِلَىٰ بَارِئِكُمْ فَٱقْتُلُوٓا۟ أَنفُسَكُمْ ذَٰلِكُمْ خَيْرٌ لَّكُمْ عِندَ بَارِئِكُمْ فَتَابَ عَلَيْكُمْ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ</p>
    <p class="translation">"And [recall] when Musa said to his people: 'O my people, indeed you have wronged yourselves by your taking of the calf, so repent to your Creator and kill yourselves. That is best for you in the sight of your Creator.' Then He turned to you. Indeed, it is He who is the Accepting of Repentance, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:54)</cite>
  </blockquote>

  <p>The verse tells the people to make tawbah — <em>fa-tūbū ilā bāri'ikum</em> — and then reports the outcome: <em>fa-tāba 'alaykum</em> — He turned to you. Again, the people's tawbah is met by God's tawbah. Two turnings. One from the human side, one from God's side. The verse closes with the same divine name: Al-Tawwāb al-Raḥīm.</p>

  <h2>Ibrahim and Isma'il's Du'a</h2>

  <blockquote class="ayah-quote" data-ayah="2:128">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:128 -->رَبَّنَا وَٱجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَآ أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَآ ۖ إِنَّكَ أَنتَ ٱلتَّوَّابُ ٱلرَّحِيمُ</p>
    <p class="translation">"Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You. And show us our rites and turn toward us. Indeed, You are the Accepting of Repentance, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:128)</cite>
  </blockquote>

  <p>Ibrahim and Isma'il, building the Ka'bah, make this du'a. Note what they ask: <em>wa tub 'alaynā</em> — turn toward us. These are two prophets in the act of building the house of God. They are not confessing a specific sin. They are asking for God's perpetual turning toward them as a condition of their existence. The request for divine tawbah is not reserved for after transgression — it is itself a form of worship, an acknowledgment that ongoing closeness requires ongoing divine return.</p>

  <h2>What the Root Reveals</h2>

  <p>The root ta-wa-ba in its three-letter form is relational by structure. You turn toward something or someone. When used without complement — <em>tāba</em> — it implies: turned back, returned to the original state or original position. The word carries within it the image of departure and return, of a relationship that was interrupted and has been restored.</p>

  <p>When the Quran uses this root of God — Al-Tawwāb, tāba 'alayhi — it is making a claim about God's nature: He is the one who perpetually turns toward His servants. Not as a response to their performance, but as an expression of who He is. The name Al-Tawwāb appears in the Quran paired with Al-Raḥīm — the Merciful — in every instance, as if to clarify: the returning is itself an expression of mercy.</p>

  <p>What this means for the practice of tawbah: when a person turns toward God, they are not initiating a one-way movement. They are entering a mutual turning. The Quran's language suggests that God's return is already underway — that the attribute Al-Tawwāb means He has never stopped turning toward His servants, and the act of human tawbah is the act of finally turning around to receive what was already coming.</p>

</article>`
    },
    primaryEntityId: TAWBAH_ID,
    secondaryEntityIds: [],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Adam's Tawbah and Iblis's Refusal: The Fork at the Moment of Wrong",
      slug: "adams-tawbah-and-iblis-refusal-the-fork-at-the-moment-of-wrong",
      type: 'article',
      excerpt: "Both Adam and Iblis transgressed. Both were in the presence of God's command and both failed it. The Quran places their responses in proximity, and the difference is not about the scale of the wrong. It is about what happened in the moment after.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['tawbah', 'quranic-concepts', 'adam', 'iblis'],
      seo_description: "Adam and Iblis both transgressed before God. The Quran shows their opposite responses — Adam's tawbah and Iblis's refusal — and what the difference reveals about the nature of sin and recovery.",
      content_html: `<article class="prose-blog">

  <p>The Quran places two transgressions side by side in its account of the beginning. Adam eats the fruit he was told not to eat. Iblis refuses the prostration he was commanded to perform. Both are in the presence of divine command. Both fail it. And then the story diverges completely.</p>

  <h2>Adam's Response</h2>

  <blockquote class="ayah-quote" data-ayah="2:37">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:2:37 -->فَتَلَقَّىٰٓ ءَادَمُ مِن رَّبِّهِۦ كَلِمَـٰتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ</p>
    <p class="translation">"Then Adam received from his Lord words, and He turned toward him. Indeed, it is He who is the Accepting of Repentance, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:37)</cite>
  </blockquote>

  <p>Adam receives words. Surah Al-A'raf (7:23) gives us the content: <em>rabbanā ẓalamnā anfusanā wa in lam taghfir lanā wa tarḥamnā la-nakūnanna min al-khāsirīn</em> — Our Lord, we have wronged ourselves. If You do not forgive us and have mercy on us, we will be among the losers. The du'a is self-accusation before petition. He names what he did — wronged himself — before he asks for anything.</p>

  <p>And then God turned toward him. The tawbah was accepted. Adam descended from the garden — the descent happens — but the relationship was not severed. He left with divine guidance still promised: <em>fa-immā ya'tiyannakum minnī hudan</em> — there will come from Me guidance.</p>

  <h2>Iblis's Response</h2>

  <blockquote class="ayah-quote" data-ayah="7:13">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:7:13 -->قَالَ فَٱهْبِطْ مِنْهَا فَمَا يَكُونُ لَكَ أَن تَتَكَبَّرَ فِيهَا فَٱخْرُجْ إِنَّكَ مِنَ ٱلصَّـٰغِرِينَ</p>
    <p class="translation">"He said: 'Descend from it, for it is not for you to be arrogant therein. So get out; indeed, you are of the debased.'"</p>
    <cite>Surah Al-A'raf (7:13)</cite>
  </blockquote>

  <p>When Iblis is expelled, he does not receive words from his Lord and turn. He makes a request — <em>fa-anẓirnī ilā yawm yub'athūn</em> (7:14) — give me respite until the Day of Resurrection. And he is given the respite. But in every narration of this scene across the Quran, Iblis does not turn. He argues. He claims he was right. In 7:12 he says: I am better than him; You created me from fire and him from clay. In 15:39 he says: because You have put me in error, I will surely make them see things as beautiful. His response to his transgression is not self-accusation but justification, then commitment to further transgression.</p>

  <p>The Quran narrates the expulsion of Iblis across seven surahs, and not once does it record a moment where Iblis says: I was wrong. He says: I refuse. He says: give me time. He says: I will mislead them. The refusal to name the wrong is the thing that distinguishes his trajectory from Adam's.</p>

  <h2>The Structural Difference</h2>

  <p>The contrast is not between a small sin and a large one. Eating a fruit and refusing a divine command are both failures before God. The contrast is in the moment after the failure. Adam says: we wronged ourselves. Iblis says: I am better than him; the fault is not mine.</p>

  <p>The Quran uses both stories to illuminate the mechanism of tawbah by showing what happens in its absence. Iblis is not condemned primarily for the original refusal — he is condemned for what he does with it afterward. He turns the refusal into an identity and a project. Adam turns the failure into a conversation with his Lord.</p>

  <p>Islamic scholars have observed that Iblis's knowledge of God was arguably greater than Adam's at the moment of their respective transgressions. Iblis was created earlier, had been in worship longer, knew the divine attributes in ways Adam did not yet. His transgression was committed with more theological knowledge, not less. What he lacked was not information but the willingness to direct his failure toward God rather than away from Him.</p>

  <h2>Why the Quran Places These Two Stories Together</h2>

  <p>Surah Al-Baqarah's opening section moves through the story of Adam, the angels, the prostration, the garden, the expulsion, and the tawbah in close sequence. The Iblis-Adam contrast appears in multiple surahs as a paired unit: the command, the refusal of Iblis, the failure of Adam, and the divergence of their responses.</p>

  <p>The pairing is pedagogical. The Quran is not telling us that some transgressions are forgivable and others are not. It is showing us that the door of tawbah is not closed by the wrong — it is closed by the refusal to use the door. Adam walked through it. Iblis stood outside and argued about whether the door should exist.</p>

</article>`
    },
    primaryEntityId: TAWBAH_ID,
    secondaryEntityIds: [IBLIS_ID],
  },

  // ── Article 3 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Door That Closes: Tawbah and the Quran's Concept of Too Late",
      slug: "the-door-that-closes-tawbah-and-the-qurans-concept-of-too-late",
      type: 'article',
      excerpt: "The Quran specifies when tawbah is not accepted: at the moment of death, and when the punishment has already arrived. In 4:17-18, it also specifies when it IS accepted: 'min qarib' — from near, while there is still time. The concept of closing is precise.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['tawbah', 'quranic-concepts'],
      seo_description: "The Quran specifies exactly when tawbah closes — at death, or when punishment arrives. An exploration of 4:17-18 and 10:90-91, the Quranic concept of 'too late,' and what it means while the door is still open.",
      content_html: `<article class="prose-blog">

  <p>The Quran is clear that tawbah is accepted. It is equally clear that tawbah has a closing. The same revelation that promises divine return also specifies the conditions under which the return is no longer available. This is not a contradiction — it is the urgency embedded in mercy. An open door requires that there will be a closing for the opening to mean anything.</p>

  <h2>When Tawbah Is Accepted</h2>

  <blockquote class="ayah-quote" data-ayah="4:17">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:4:17 -->إِنَّمَا ٱلتَّوْبَةُ عَلَى ٱللَّهِ لِلَّذِينَ يَعْمَلُونَ ٱلسُّوٓءَ بِجَهَـٰلَةٍ ثُمَّ يَتُوبُونَ مِن قَرِيبٍ فَأُو۟لَـٰٓئِكَ يَتُوبُ ٱللَّهُ عَلَيْهِمْ ۗ وَكَانَ ٱللَّهُ عَلِيمًا حَكِيمًا</p>
    <p class="translation">"Repentance accepted by Allah is only for those who do wrong in ignorance and then repent soon after. It is those to whom Allah will turn. And Allah is ever Knowing and Wise."</p>
    <cite>Surah An-Nisa' (4:17)</cite>
  </blockquote>

  <p>The verse defines the condition with two elements. First: the wrong is done <em>bi-jahāla</em> — in ignorance. Classical scholars interpreted this broadly — not limited to literal unawareness, but including acting against knowledge one possessed, in a state of heedlessness or desire that overrode reason. The word does not excuse the action; it describes the human condition of acting against one's better understanding.</p>

  <p>Second: <em>thumma yatūbūna min qarīb</em> — then they repent from near. The phrase <em>min qarīb</em> means from nearness, from proximity, while it is still close. The scholars debated what this means precisely. The dominant view: before the immediate arrival of death. There is a window. Within that window, tawbah reaches God.</p>

  <h2>When Tawbah Is Not Accepted</h2>

  <blockquote class="ayah-quote" data-ayah="4:18">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:4:18 -->وَلَيْسَتِ ٱلتَّوْبَةُ لِلَّذِينَ يَعْمَلُونَ ٱلسَّيِّـَٔاتِ حَتَّىٰٓ إِذَا حَضَرَ أَحَدَهُمُ ٱلْمَوْتُ قَالَ إِنِّى تُبْتُ ٱلْـَٔـٰنَ وَلَا ٱلَّذِينَ يَمُوتُونَ وَهُمْ كُفَّارٌ ۚ أُو۟لَـٰٓئِكَ أَعْتَدْنَا لَهُمْ عَذَابًا أَلِيمًا</p>
    <p class="translation">"And repentance is not accepted from those who do evil deeds until, when death comes to one of them, he says: 'Indeed, I repent now.' Nor for those who die disbelievers. For those We have prepared a painful punishment."</p>
    <cite>Surah An-Nisa' (4:18)</cite>
  </blockquote>

  <p>The contrast is immediate. The next verse names two categories for whom tawbah does not reach. First: those who persist in evil until death arrives — <em>ḥattā idhā ḥaḍara aḥadahumu al-mawtu qāla innī tubtu al-ān</em> — and then say: I repent now. The now is too late. The proximity of death makes the tawbah coerced rather than chosen. The Quran's acceptance of tawbah is for the turning that happens before the situation compels it.</p>

  <p>Second: those who die in a state of disbelief. For both categories, the pronouncement is <em>a'tadnā lahum 'adhāban alīman</em> — We have prepared for them a painful punishment.</p>

  <p>The paired verses (4:17-18) are among the most precise theological statements in the Quran about the mechanics of tawbah. They tell us: accepted under these conditions, not accepted under these others. The Quran does not leave the question vague.</p>

  <h2>The Case of Firaun</h2>

  <blockquote class="ayah-quote" data-ayah="10:90">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:10:90 -->۞ وَجَـٰوَزْنَا بِبَنِىٓ إِسْرَٰٓءِيلَ ٱلْبَحْرَ فَأَتْبَعَهُمْ فِرْعَوْنُ وَجُنُودُهُۥ بَغْيًا وَعَدْوًا ۖ حَتَّىٰٓ إِذَآ أَدْرَكَهُ ٱلْغَرَقُ قَالَ ءَامَنتُ أَنَّهُۥ لَآ إِلَـٰهَ إِلَّا ٱلَّذِىٓ ءَامَنَتْ بِهِۦ بَنُوٓا۟ إِسْرَٰٓءِيلَ وَأَنَا۠ مِنَ ٱلْمُسْلِمِينَ</p>
    <p class="translation">"And We took the Children of Israel across the sea, and Firaun and his soldiers pursued them in tyranny and enmity until, when drowning overtook him, he said: 'I believe that there is no deity except that in whom the Children of Israel believe, and I am of the Muslims.'"</p>
    <cite>Surah Yunus (10:90)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="10:91">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:10:91 -->ءَآلْـَٔـٰنَ وَقَدْ عَصَيْتَ قَبْلُ وَكُنتَ مِنَ ٱلْمُفْسِدِينَ</p>
    <p class="translation">"Now? While you had disobeyed before and were of the corrupters?"</p>
    <cite>Surah Yunus (10:91)</cite>
  </blockquote>

  <p>The Quran's most vivid illustration of tawbah-too-late. Firaun, in the sea, drowning, declares: I believe. There is no god but the God of Israel. I am of the Muslims. The declaration contains every element that would constitute shahada. But the response is: <em>āl-ān</em> — now? The rhetorical question contains the refusal. You disobeyed before. You were of the corrupters.</p>

  <p>The declaration is real — Firaun is saying something true. But the timing renders it coerced rather than chosen. The water compelled the tawbah. This is the inverse of what 4:17 describes: the tawbah that comes <em>min qarīb</em>, from nearness, while there is still a choice. Firaun's tawbah comes when there is no longer a choice — when the alternative is already closed.</p>

  <h2>The Weight of While the Door Is Open</h2>

  <p>The pairing of 4:17-18 and the Firaun scene in 10:90-91 creates a coherent Quranic position: the door is open, it will close, and the Quran does not promise that any given person will know exactly when. What it does promise is that while it is open, it is genuinely open — that tawbah from <em>min qarīb</em> genuinely reaches God, genuinely effects a divine turning in response.</p>

  <p>The word <em>āl-ān</em> — now? — in 10:91 is perhaps the most chilling two letters in the Quran. Not because they signal divine rejection as the permanent condition, but because they signal that this particular now is too late. The implication of the chilling is: there were other nows. They were available. They passed.</p>

</article>`
    },
    primaryEntityId: TAWBAH_ID,
    secondaryEntityIds: [],
  },

  // ── Article 4 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "Al-Tawwab: The Name That Makes Returning Mutual",
      slug: "al-tawwab-the-name-that-makes-returning-mutual",
      type: 'article',
      excerpt: "God names Himself Al-Tawwab — translated as 'the Acceptor of Repentance,' but the root means 'the Ever-Returning.' The name claims that God, too, turns toward the servant. This reframes tawbah: not a petition awaiting judgment, but two parties turning toward each other.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['tawbah', 'quranic-concepts'],
      seo_description: "Allah's name Al-Tawwab means 'the Ever-Returning.' The name makes tawbah a mutual movement — not a petition awaiting judgment but two turnings toward each other. An exploration of this divine name in the Quran.",
      content_html: `<article class="prose-blog">

  <p>The Quran gives God ninety-nine names. Each name is a claim about divine nature — not a label but a description of how God acts and what God is. Among these names, Al-Tawwāb stands out for an unusual structural reason: it is derived from the same root as the human action it presides over.</p>

  <p>When a person makes tawbah, they use the root ta-wa-ba. When God accepts tawbah — and the Quran describes God doing this — God also uses the root ta-wa-ba. The name Al-Tawwāb is God's name for the same turning that the human performs. The same root, both directions. This is not standard. Most divine names describe an attribute the human does not share. Al-Tawwāb names a movement that runs both ways.</p>

  <h2>The Pattern Across Instances</h2>

  <blockquote class="ayah-quote" data-ayah="4:64">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:4:64 -->وَمَآ أَرْسَلْنَا مِن رَّسُولٍ إِلَّا لِيُطَاعَ بِإِذْنِ ٱللَّهِ ۚ وَلَوْ أَنَّهُمْ إِذ ظَّلَمُوٓا۟ أَنفُسَهُمْ جَآءُوكَ فَٱسْتَغْفَرُوا۟ ٱللَّهَ وَٱسْتَغْفَرَ لَهُمُ ٱلرَّسُولُ لَوَجَدُوا۟ ٱللَّهَ تَوَّابًا رَّحِيمًا</p>
    <p class="translation">"And We did not send any messenger except to be obeyed by permission of Allah. And if, when they wronged themselves, they had come to you and asked forgiveness of Allah and the Messenger had asked forgiveness for them, they would have found Allah Accepting of Repentance and Merciful."</p>
    <cite>Surah An-Nisa' (4:64)</cite>
  </blockquote>

  <p>The verse describes what would have happened if those who wronged themselves had come, sought forgiveness, and had the Messenger seek forgiveness on their behalf: <em>la-wajadū Allāha Tawwāban Raḥīmā</em> — they would have found Allah Tawwāb and Merciful. The word <em>wajadū</em> — found — is significant. They would have found this attribute. It would have been there to encounter. Al-Tawwāb is not something God becomes in response to good performance; it is something already present that the act of seeking makes available to experience.</p>

  <h2>The Intensive Form</h2>

  <p>Al-Tawwāb uses the Arabic pattern <em>fa'āl</em> — an intensive, repeated, or characteristic action. The base verb is <em>tāba</em> — he returned. Al-Tawwāb is not "the one who occasionally returns" or "the one who returns under certain conditions." It is "the one who is characterized by returning, who does this repeatedly and continually." The intensity of the form indicates a defining attribute rather than an occasional action.</p>

  <p>This matters because it addresses the human anxiety about whether tawbah is available this time, after this particular wrong, for this particular person. Al-Tawwāb answers: the returning is structural. It is not available sometimes — it is what God is. The name does not say: God will return if you meet conditions. It says: God is, by nature, the Ever-Returning.</p>

  <h2>Tawwab and Rahim: The Consistent Pairing</h2>

  <p>In every Quranic instance where Al-Tawwāb appears as a divine name, it is paired with Al-Raḥīm — the Merciful. Not with Al-'Adl (the Just) or Al-Ḥakīm (the Wise), though those are true as well. Specifically with Al-Raḥīm. The pairing suggests that the returning is not a judicial event — the case reviewed, verdict rendered — but a merciful one. The standard governing the divine turning is mercy, not merely accounting.</p>

  <p>The root of Al-Raḥīm is <em>r-ḥ-m</em>, which comes from the word for womb (<em>raḥim</em>), implying a mercy that is encompassing, enveloping, preceding any transaction. Paired with Al-Tawwāb, the combination describes: a God whose turning toward you is characterized by the same mercy that a mother extends before the child has done anything to deserve it.</p>

  <h2>The Relational Implication</h2>

  <p>If God is Al-Tawwāb — the Ever-Returning — then the human act of tawbah is not the initiation of a process that God may or may not begin. It is the human's entering a movement that was already underway. The servant turns, and in turning finds that God's turning was already approaching.</p>

  <p>This is the theological structure the name encodes. The door of tawbah is open not because God has created a policy of accepting petitions, but because Al-Tawwāb is a name — which means it describes what God always is. The attribute is constant. The human variable is whether the person turns around to meet it.</p>

  <p>The Quran records Ibrahim and Isma'il asking God to <em>tub 'alaynā</em> — turn toward us — while building the Ka'bah, at a moment of devoted service. The request for divine tawbah from within obedience, not from within transgression, shows that the name Al-Tawwāb is not only relevant in the aftermath of failure. It is the name of the ongoing relationship. The turning is always available. The question the Quran asks is whether the person is facing the right direction.</p>

</article>`
    },
    primaryEntityId: TAWBAH_ID,
    secondaryEntityIds: [],
  },
];

async function main() {
  console.log('Inserting Tawbah articles...');

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
