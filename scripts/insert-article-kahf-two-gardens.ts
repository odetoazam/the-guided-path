import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const content_html = `<article class="prose-blog">

  <p class="text-lg leading-relaxed">Surah Al-Kahf introduces the parable of the two men and two gardens with a command: <em>wadrib lahum mathalan</em> — strike for them a parable. The verb is <em>daraba</em>, to strike. The Quran chooses strike over "tell them a story" or "present an illustration" — as though the parable is a blow, something that lands on the listener before they can defend against it. And what follows is one of the most psychologically precise portraits in the Quran: two men, two gardens, one conversation, and a destruction that arrives in three verses.</p>

  <h2>The Scene the Quran Builds</h2>

  <p>The parable opens with a physical description. Two men. One of them is given two gardens of grapevines, surrounded by palm trees, with crops growing between them:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَٱضْرِبْ لَهُم مَّثَلًا رَّجُلَيْنِ جَعَلْنَا لِأَحَدِهِمَا جَنَّتَيْنِ مِنْ أَعْنَـٰبٍ وَحَفَفْنَـٰهُمَا بِنَخْلٍ وَجَعَلْنَا بَيْنَهُمَا زَرْعًا</p>
    <p class="translation">"And strike for them a parable: two men — We made for one of them two gardens of grapevines, and We surrounded them with palm trees, and placed between them crops."</p>
    <cite>Surah Al-Kahf (18:32)</cite>
  </blockquote>

  <p>Three layers of cultivation in a single verse — grapes, palms, and field crops. The gardens are concentric: grapevines at the center, palms ringing the perimeter, crops filling the space between. This is a functioning agricultural economy, self-sustaining and abundant. And each verb in the verse carries the same subject: <em>ja'alna</em> — We made. <em>Hafafnahuma</em> — We surrounded them. <em>Ja'alna</em> — We placed. Three times the pronoun announces that the maker of this abundance is God — while the owner is the recipient, silent in the grammar. The scene is constructed, grammatically, as a divine act that the man will later claim as his own.</p>

  <p>Both gardens produce their fruit completely, without shortfall:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">كِلْتَا ٱلْجَنَّتَيْنِ ءَاتَتْ أُكُلَهَا وَلَمْ تَظْلِم مِّنْهُ شَيْـًٔا ۚ وَفَجَّرْنَا خِلَـٰلَهُمَا نَهَرًا</p>
    <p class="translation">"Both gardens produced their fruit and did not fall short of it in anything. And We caused a river to gush forth between them."</p>
    <cite>Surah Al-Kahf (18:33)</cite>
  </blockquote>

  <p>The verb for the gardens' productivity is <em>atat ukulaha</em> — it gave its eating, its fruit. And the Quran adds: <em>wa lam tazlim minhu shay'an</em> — it did not do <a href="/hub/zulm">zulm</a> to any of it. The word here is <em>tazlim</em>, from the root <em>za-la-ma</em>, the same root that gives us <em>zulm</em> — injustice, putting something out of place. The garden delivered exactly what it was supposed to deliver — faithful to its function, complete in its yield. The irony the Quran is building is quiet and devastating: the garden does zero <em>zulm</em>, while its owner will commit it. The creation fulfills its purpose. The human being refuses to.</p>

  <p>And then — as though the Quran wants to complete the portrait of blessing before the portrait of ingratitude — a river is caused to gush between the gardens. <em>Fajjarna</em>, Form II of <em>fa-ja-ra</em>, intensive: We caused to burst forth. The water surges — forceful, abundant, assertive in its provision. Every element of the scene is abundance acted upon the man by God. All of it received. All of it given.</p>

  <h2>The First Man Speaks</h2>

  <p>The Quran now gives the garden-owner a voice. But between verses 33 and 34, something has shifted in the grammar. In the previous verses, God was the subject of every verb: <em>ja'alna</em> (We made), <em>hafafnahuma</em> (We surrounded), <em>fajjarna</em> (We caused to gush). In verse 34, the construction changes: <em>wa kana lahu thamar</em> — and he had fruit. The <em>lahu</em> (belonging to him) internalizes the possession. What God made, the man now has. The gift has been absorbed into ownership. And from that ownership, he speaks:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَكَانَ لَهُۥ ثَمَرٌ فَقَالَ لِصَـٰحِبِهِۦ وَهُوَ يُحَاوِرُهُۥٓ أَنَا۠ أَكْثَرُ مِنكَ مَالًا وَأَعَزُّ نَفَرًا</p>
    <p class="translation">"And he had fruit, so he said to his companion while conversing with him: 'I am greater than you in wealth and mightier in manpower.'"</p>
    <cite>Surah Al-Kahf (18:34)</cite>
  </blockquote>

  <p>The setting is intimate: <em>wa huwa yuḥāwiruhu</em> — while he was conversing with him. The root <em>ḥa-wa-ra</em> means to go back and forth, to return. Form III (<em>muḥāwara</em>) implies reciprocity — a genuine exchange. But the man's speech is entirely one-directional. His first words are <em>ana</em> — I. And then: <em>aktharu minka</em> — more than you. The grammar of his speech is comparison. He skips description, gratitude, acknowledgment of source. He measures himself against another human being and announces the result. Wealth and manpower — <em>malan</em> and <em>nafaran</em>. These are the two currencies he recognizes: things and people who serve him. His self is constructed entirely from external accumulation. Remove the garden, the wealth, and the entourage, and the <em>ana</em> collapses into vacancy.</p>

  <p>He then enters his garden — and the Quran specifies his inner state:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَدَخَلَ جَنَّتَهُۥ وَهُوَ ظَالِمٌ لِّنَفْسِهِۦ قَالَ مَآ أَظُنُّ أَن تَبِيدَ هَـٰذِهِۦٓ أَبَدًا</p>
    <p class="translation">"And he entered his garden while he was unjust to himself. He said: 'I do not think this will ever perish.'"</p>
    <cite>Surah Al-Kahf (18:35)</cite>
  </blockquote>

  <p>Two things the Quran does here that determine the entire parable's meaning.</p>

  <p>First: <em>wa huwa zalimun li-nafsihi</em> — while he was doing <em>zulm</em> to his own <em>nafs</em>. The Quran names the diagnosis before the symptom. Before the man opens his mouth to make his most damning statement, the text has already named his condition. He is a <em>zalim</em> — one who puts things out of place. And the object of his <a href="/hub/zulm">zulm</a> is himself. His possessions have not wronged him. God has not wronged him. He has wronged himself, by building his identity on what he has rather than on what he owes. The gardens did no <em>zulm</em> to their yield. The man does <em>zulm</em> to his own soul. The parallel is the architecture.</p>

  <p>Second: his statement — <em>ma azunnu an tabida hadhihi abadan</em>. "I do not think this will ever perish." The verb is <em>azunnu</em>, from <em>zanna</em> — to suppose, to conjecture, to hold an opinion based on probability rather than certainty. He avoids "I know." He avoids revelation, proof, evidence. He says <em>I think</em> — <em>zanna</em>. And the Quran will hold this word against him. Because <em>zanna</em>, in Quranic usage, is consistently associated with baseless assumption. Surah Al-Hujurat (49:12) says <em>ijtanibu kathiran min al-zann</em> — avoid much of conjecture. Surah Yunus (10:36) says <em>inna al-zanna la yughni min al-haqqi shay'an</em> — conjecture avails nothing against truth. The man has built his entire eschatology — his understanding of permanence, decay, and the future — on <em>zanna</em>. On a guess dressed as certainty.</p>

  <p>He continues:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَمَآ أَظُنُّ ٱلسَّاعَةَ قَآئِمَةً وَلَئِن رُّدِدتُّ إِلَىٰ رَبِّى لَأَجِدَنَّ خَيْرًا مِّنْهَا مُنقَلَبًا</p>
    <p class="translation">"And I do not think the Hour will come. And even if I am returned to my Lord, I will surely find something better than this as a return."</p>
    <cite>Surah Al-Kahf (18:36)</cite>
  </blockquote>

  <p>The same <em>azunnu</em> appears again — I do not think the Hour will come. His denial of the afterlife rests on the same epistemological foundation as his denial of impermanence: conjecture. And then the conditional — <em>wa la'in rudidtu ila rabbi</em> — even if I am returned to my Lord. This is a man who concedes the possibility of meeting God only as a hypothetical, and even in that hypothetical, he assumes the garden will follow him. His logic: if God gave me this here, He must value me, and if He values me, He will give me more there. The worldly abundance has become, in his mind, evidence of divine favor that extends into eternity. He has made his garden into a theology.</p>

  <h2>The Second Man Speaks</h2>

  <p>The companion responds. His speech begins differently:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">قَالَ لَهُۥ صَاحِبُهُۥ وَهُوَ يُحَاوِرُهُۥٓ أَكَفَرْتَ بِٱلَّذِى خَلَقَكَ مِن تُرَابٍ ثُمَّ مِن نُّطْفَةٍ ثُمَّ سَوَّىٰكَ رَجُلًا</p>
    <p class="translation">"His companion said to him while conversing with him: 'Have you disbelieved in the One who created you from dust, then from a drop, then fashioned you as a man?'"</p>
    <cite>Surah Al-Kahf (18:37)</cite>
  </blockquote>

  <p>Where the first man began with <em>ana</em> — I — the second man begins with a question aimed at the first man's origin. <em>A-kafarta</em> — have you disbelieved? And then: <em>bi-lladhi khalaqaka min turabin</em> — in the One who created you from dust. The second man counters the first man's self-image with his material origin — directly, without abstraction. You are dust. You were a drop. You were shaped — the verb <em>sawwaka</em>, Form II, intensive shaping — into a man. Everything the first man claims as his own achievement is placed against the backdrop of a body he did not design, made from materials he did not choose, alive by a breath that preceded his will.</p>

  <p>Then the second man makes his declaration:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">لَّـٰكِنَّا۠ هُوَ ٱللَّهُ رَبِّى وَلَآ أُشْرِكُ بِرَبِّىٓ أَحَدًا</p>
    <p class="translation">"But as for me — He is Allah, my Lord, and I do not associate anyone with my Lord."</p>
    <cite>Surah Al-Kahf (18:38)</cite>
  </blockquote>

  <p>The phrase <em>lakinna</em> carries a grammatical weight: it is a particle of rectification, of redirection after a wrong course. <em>But as for me</em> — the second man draws a line. And his <em>ana</em>, when it comes, is oriented entirely differently from the first man's <em>ana</em>. The first man said: I have more wealth, I have more people. The second man says: He is Allah, my Lord. The first <em>ana</em> was self-referential — I measured against you. The second <em>ana</em> is relational — I belong to Him. This is the axis the parable turns on. Two first-person declarations, two entirely different architectures of selfhood.</p>

  <p>The second man then offers counsel:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَلَوْلَآ إِذْ دَخَلْتَ جَنَّتَكَ قُلْتَ مَا شَآءَ ٱللَّهُ لَا قُوَّةَ إِلَّا بِٱللَّهِ ۚ إِن تَرَنِ أَنَا۠ أَقَلَّ مِنكَ مَالًا وَوَلَدًا</p>
    <p class="translation">"And why, when you entered your garden, did you not say: 'What Allah willed [has occurred]. There is no power except through Allah.' If you see me as less than you in wealth and children —"</p>
    <cite>Surah Al-Kahf (18:39)</cite>
  </blockquote>

  <p>The phrase <em>ma sha'a Allah, la quwwata illa bi-llah</em> is offered as the speech that should have accompanied the entry into the garden. The second man is diagnosing what was absent: acknowledgment that the garden's existence, continuity, and fruitfulness all depend on a will and a power that are not the owner's. The entry into abundance was supposed to be an entry into gratitude. Instead it became an entry into self-congratulation. The moment of walking through the gate was the fork in the road.</p>

  <h2>Being and Having</h2>

  <p>The distinction between the two men is orientation, pure and simple. The Quran leaves the second man's material condition entirely unmentioned — a deliberate silence. The difference runs deeper than wealth versus poverty. The first man is defined by what he possesses — gardens, wealth, manpower. Remove those possessions and his identity collapses; his statement "I am greater than you" depends entirely on external accumulation. The second man is defined by whom he belongs to. His declaration — <em>huwa Allahu rabbi</em> — is a statement of relationship, not acquisition. His selfhood does not depend on what he holds but on who holds him.</p>

  <p>This is a distinction that runs deeper than the parable. It is, in one form or another, the central question of every spiritual tradition that has taken the inner life seriously. <a href="/hub/nafs">The nafs</a> can orient itself toward accumulation — more possessions, more status, more security drawn from external sources — or it can orient itself toward what Islamic philosophy calls <em>faqr</em>, not material destitution but ontological poverty: the recognition that the self depends for its existence at every moment on something beyond itself.</p>

  <p>Al-Ghazali builds an entire psychology around this axis. In the <em>Ihya Ulum al-Din</em>, the heart is described as a mirror — its natural state is to reflect divine light. But attachment to <a href="/hub/dunya">dunya</a> accumulates on the mirror's surface like rust, occluding the reflection. The first garden-owner's heart is a rusted mirror. He looks at his garden and sees himself. The second man's heart is polished — he looks at the same world and sees the traces of its Maker. Al-Ghazali's term for this occlusion is <em>hijab</em> — veil. The possessions remain permissible. They have simply become a veil between the man and the recognition of where they came from.</p>

  <p>The philosophical tradition outside Islam has circled the same distinction through different vocabularies. Plotinus describes the soul descending into the material world and progressively losing itself in multiplicity — becoming identified with what it perceives and possesses rather than with its own essential nature as an emanation of the One. The Neoplatonic remedy is <em>epistrophe</em>, a turning-back toward the source. The Quran's remedy is <em>ma sha'a Allah, la quwwata illa bi-llah</em> — an acknowledgment of dependence that prevents the descent into identification with possession. But the Quran diverges from the Neoplatonic framework at a critical point: the problem is orientation toward matter as ultimate. The gardens are called <em>jannatayn</em> — the same word used for Paradise. The crops, the palms, the river are all described with verbs whose subject is God: <em>ja'alna</em>, <em>hafafnahuma</em>, <em>fajjarna</em>. Creation remains a sign. Orientation toward creation <em>as though it were ultimate</em> — that is the prison. The first man's error is that the garden has him — that possessing became a mode of being possessed.</p>

  <p>This distinction — between having possessions and being possessed by them — is what the parable enacts. The first man speaks from his possessions outward: I have wealth, therefore I am significant. The second man speaks from his relationship with God outward: He is my Lord, therefore whatever I have or lack is secondary to that relationship. The first man's <em>ana</em> collapses when the garden collapses. The second man's <em>ana</em> remains intact regardless of circumstance — because it was built on the only reality that does the same.</p>

  <h2>The Destruction in Three Verses</h2>

  <p>The Quran delivers the consequence quickly. The second man warns that God may send a calamity. And then it arrives:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَأُحِيطَ بِثَمَرِهِۦ فَأَصْبَحَ يُقَلِّبُ كَفَّيْهِ عَلَىٰ مَآ أَنفَقَ فِيهَا وَهِىَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا وَيَقُولُ يَـٰلَيْتَنِى لَمْ أُشْرِكْ بِرَبِّىٓ أَحَدًا</p>
    <p class="translation">"And his fruit was encompassed [by destruction], so he began turning his hands over what he had spent on it, while it had collapsed upon its trellises, and he said: 'I wish I had not associated anyone with my Lord.'"</p>
    <cite>Surah Al-Kahf (18:42)</cite>
  </blockquote>

  <p>The verse does three things simultaneously.</p>

  <p>The physical image: <em>yuqallibu kaffayhi</em> — he turns his palms over and over. This is the gesture of a man looking at his empty hands, turning them as though checking whether something remains. The hands that held wealth are now the evidence of its absence. The verb <em>qallaba</em>, Form II, is intensive and repetitive — he keeps turning, keeps looking. The palms come up empty each time.</p>

  <p>The structural image: <em>wa hiya khawiyatun ala urushiha</em> — it had collapsed upon its trellises. The trellises that held the grapevines upright are now the ruins the garden lies upon. The support structure became the wreckage. What held the garden up is what it fell onto. The architectural detail is precise and devastating — the very thing that gave the garden its height and shape is now the thing it is crushed against.</p>

  <p>The theological recognition: <em>ya laytani lam ushrik bi-rabbi ahadan</em> — I wish I had not associated anyone with my Lord. The man's final speech mirrors the second man's declaration in 18:38: <em>wa la ushriku bi-rabbi ahadan</em>. The same words — <em>ushriku bi-rabbi ahadan</em> — appear in both verses. But the second man said it as a present-tense declaration of faith. The first man says it as a past-tense regret. The phrase that was available to him as a living orientation is now available only as a lament over what cannot be recovered.</p>

  <p>Then the Quran delivers the summary:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَلَمْ تَكُن لَّهُۥ فِئَةٌ يَنصُرُونَهُۥ مِن دُونِ ٱللَّهِ وَمَا كَانَ مُنتَصِرًا</p>
    <p class="translation">"And he had no group to help him against Allah, and he could not help himself."</p>
    <cite>Surah Al-Kahf (18:43)</cite>
  </blockquote>

  <p>The <em>nafar</em> — the manpower — he boasted about in verse 34 is now named as absent: <em>lam takun lahu fi'atun yansurūnahu</em>. The faction has vanished. The social capital he measured his worth by has vanished with the garden. And the final clause strips him of even self-reliance: <em>wa ma kana muntasiran</em> — he was not one who could help himself. The passive inability is total. The man who said <em>ana aktharu</em> — I am more — is now a man who has no <em>ana</em> that functions.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">هُنَالِكَ ٱلْوَلَـٰيَةُ لِلَّهِ ٱلْحَقِّ ۚ هُوَ خَيْرٌ ثَوَابًا وَخَيْرٌ عُقْبًا</p>
    <p class="translation">"There, authority belongs to Allah, the True. He is best in reward and best in outcome."</p>
    <cite>Surah Al-Kahf (18:44)</cite>
  </blockquote>

  <p><em>Hunalika</em> — there. In that place. At the site of ruin, where the trellises lie broken and the hands turn over empty, the Quran declares: <em>al-walayatu lillahi al-haqq</em>. Authority — protection, governance, ultimate loyalty — belongs to Allah, the Real. The word <em>al-haqq</em> here carries its full Quranic weight: the Real, the True, the one whose existence is not contingent on anything else. The garden was contingent, the wealth was contingent, the manpower was contingent — every element of his self-portrait depended on a will that was never his own. The only non-contingent reality is the one the second man oriented his life toward.</p>

  <h2>What Al-Kahf Needs From This Parable</h2>

  <p>Al-Kahf is a surah of four trials. The youth in the Cave face the trial of faith against social pressure — their community demands conformity, and they withdraw rather than compromise. <a href="/hub/ashab-al-kahf">Ashab al-Kahf</a> answer the question: what do you do when the world you live in is against what you believe? The parable of the two gardens faces a different trial: what do you do when the world you live in is giving you everything you want?</p>

  <p>The third story — Musa and Khidr — is the trial of knowledge. Musa, the most knowledgeable man of his time, is placed under the instruction of someone whose knowledge operates by entirely different rules. And the fourth — Dhul-Qarnayn — is the trial of power, a king given dominion over the earth who uses it as a trust rather than a personal claim.</p>

  <p>The progression is deliberate: faith under persecution in the Cave, faith under prosperity in the Gardens, faith under intellectual humiliation with Khidr, faith under political authority with Dhul-Qarnayn. Four spheres of human experience — social, economic, epistemological, political — and four demonstrations of what it looks like when the trial is passed or failed.</p>

  <p>The parable of the two gardens occupies the economic position. And Al-Kahf needs it in this position because the surah opened with a warning that prepares the ground for exactly this test. In verse 7, the Quran declares:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">إِنَّا جَعَلْنَا مَا عَلَى ٱلْأَرْضِ زِينَةً لَّهَا لِنَبْلُوَهُمْ أَيُّهُمْ أَحْسَنُ عَمَلًا</p>
    <p class="translation">"Indeed, We have made what is on the earth as adornment for it, so that We may test them as to which of them is best in deed."</p>
    <cite>Surah Al-Kahf (18:7)</cite>
  </blockquote>

  <p>The word is <em>zinah</em> — adornment, beautification. Everything on the surface of the earth is <em>zinah</em>. And the purpose stated for that beautification is <em>li-nabluwahum</em> — so that We may test them. The beauty of the world is the test. The abundance is the trial. The gardens, the fruit, the river — all <em>zinah</em>. The question is what you become when you receive it.</p>

  <p>And in the very next verse, the Quran announces the result:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَإِنَّا لَجَـٰعِلُونَ مَا عَلَيْهَا صَعِيدًا جُرُزًا</p>
    <p class="translation">"And indeed, We will make what is on it into barren ground."</p>
    <cite>Surah Al-Kahf (18:8)</cite>
  </blockquote>

  <p><em>Sa'idan juruzan</em> — barren, dry, leveled earth. The same surface that was adorned will be stripped. The same ground that bore gardens will be emptied. Verses 7-8 give the thesis. Verses 32-44 give the demonstration. The parable is the argument's first fully narrated case study — the opening warning made flesh in two men, two gardens, and one conversation about what a person thinks they own.</p>

  <p>After the parable, the Quran immediately delivers the metaphor that links the particular story to the universal condition:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">وَٱضْرِبْ لَهُم مَّثَلَ ٱلْحَيَوٰةِ ٱلدُّنْيَا كَمَآءٍ أَنزَلْنَـٰهُ مِنَ ٱلسَّمَآءِ فَٱخْتَلَطَ بِهِۦ نَبَاتُ ٱلْأَرْضِ فَأَصْبَحَ هَشِيمًا تَذْرُوهُ ٱلرِّيَـٰحُ ۗ وَكَانَ ٱللَّهُ عَلَىٰ كُلِّ شَىْءٍ مُّقْتَدِرًا</p>
    <p class="translation">"And strike for them the parable of the life of this world: it is like water We send down from the sky, and the vegetation of the earth mingles with it, and then it becomes dry chaff scattered by the winds. And Allah has power over all things."</p>
    <cite>Surah Al-Kahf (18:45)</cite>
  </blockquote>

  <p>The garden was the particular. The water-to-chaff cycle is the universal. All of <a href="/hub/dunya">dunya</a> operates on this pattern: abundance arrives, life flourishes, then the flourishing becomes debris scattered by wind. The garden-owner's error was treating the flourishing phase as permanent — building his identity, his theology, and his social self-image on something the Quran has already announced will become <em>hashim</em>: dry remnants, blown away.</p>

  <h2>The Word That Condemned Him</h2>

  <p>Return to the verb <em>azunnu</em>. The man said: <em>ma azunnu an tabida hadhihi abadan</em>. I do not suppose this will ever perish. The Quran builds an entire epistemological critique around this single word. <em>Zanna</em> is not knowledge. It falls short of <a href="/hub/iman">iman</a>, and short even of honest uncertainty — which might at least have led him to ask questions. <em>Zanna</em> is a comfortable assumption that functions as a substitute for inquiry. The man skipped investigation, bypassed revelation, ignored the fate of others whose abundance preceded his. He has simply assumed — <em>zanna</em> — that what exists now will exist always, because its existence is convenient for his self-image.</p>

  <p>The Quran's treatment of <em>zanna</em> throughout its text makes the garden-owner's usage unmistakable. In Surah Al-Jathiyah (45:24), those who deny the afterlife are described: <em>wa ma lahum bidhālika min 'ilm, in hum illa yazunnūn</em> — they have no knowledge of that; they only conjecture. In Surah An-Najm (53:28), those who follow unsubstantiated belief are told: <em>inna al-zanna la yughni min al-haqqi shay'an</em> — conjecture avails nothing against the Real. The garden-owner's <em>azunnu</em> places him in the company of every Quranic figure who substituted assumption for evidence and called it certainty.</p>

  <p>The philosophical and the textual layers converge here. The being-versus-having distinction is built into the text through grammar and word choice — indigenous to the Quran's own architecture. The man who <em>has</em> speaks from <em>zanna</em> — conjecture, wishful thinking, the epistemology of a self that needs the world to be stable because the self has been constructed on the world's stability. The man who <em>is</em> — who is oriented toward God — speaks from <em>yaqin</em>, certainty rooted in relationship with the Real. <em>Huwa Allahu rabbi</em> — He is Allah, my Lord. The second man's declaration is not conjecture. It is an affirmation of reality as it is, independent of circumstance. <a href="/hub/tawakkul">Tawakkul</a> — trust in God — is the epistemological posture of being. <em>Zanna</em> is the epistemological posture of having.</p>

  <h2>What Remains</h2>

  <p>The parable ends with a man looking at ruins. The trellises that held his garden upright are now what the garden has collapsed onto. His companions have vanished. His hands turn over and over in the gesture of someone looking for something that is gone.</p>

  <p>The Quran leaves his future unnarrated — a silence that is itself a verdict. His final speech — <em>ya laytani lam ushrik bi-rabbi ahadan</em> — is a wish, not a tawbah. He wishes he had not committed shirk. He wishes the past were different. He fails to turn toward God and ask for forgiveness in the present. The distinction is precise: <em>layta</em> expresses retrospective desire, grief over consequence rather than reorientation of the self. The man's regret is still about what he has lost — even his repentance is framed by having.</p>

  <p>The second man, by contrast, disappears from the narrative after his counsel. The Quran gives him silence instead of epilogue — because he needs none. His identity was elsewhere the entire time. The garden's survival or destruction changes nothing about <em>huwa Allahu rabbi</em>. He remains who he is regardless of what the world does, because who he is was built on the only foundation that endures.</p>

  <p>Al-Kahf places this parable between the Cave and Khidr because the economic trial is the one most of its readers will face. The trial of persecution — being driven from your home for your faith — belongs to a minority in any age. The trial of hidden knowledge belongs to prophets. The trial of political power belongs to rulers. But the trial of prosperity — of being given more than you need and slowly allowing what you have to define who you are — that trial belongs to almost everyone who will ever recite this surah on a Friday afternoon.</p>

  <p>The question Al-Kahf asks through this parable goes beyond the certainty of loss — everything on the earth becomes <em>sa'idan juruzan</em> — barren ground. The question is whether, when you entered your garden, you said <em>ma sha'a Allah, la quwwata illa bi-llah</em>. Whether you walked through the gate of abundance as someone who belongs to God, or as someone who belongs to the garden.</p>

  <p>The trellises will fall. The only question is whether you fall with them.</p>

</article>`;

async function main() {
  // 1. Insert the article
  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({
      title: 'The Two Garden Owners: Being vs. Having in Al-Kahf',
      slug: 'two-garden-owners-being-having-al-kahf',
      type: 'article',
      excerpt: 'Two men, two gardens, one conversation. The Quran builds one of its most psychologically precise parables from a dialogue about what it means to say "I" — and what happens when the "I" is built on what can be taken away.',
      seo_title: 'The Two Garden Owners in Al-Kahf — Being vs. Having in the Quran',
      seo_description: 'A complete reading of the parable of the two men and two gardens in Surah Al-Kahf (18:32-44). How the Quran diagnoses the difference between building identity on possessions and building it on God.',
      content_html: content_html,
      status: 'published',
      tags: ['al-kahf', 'parable', 'dunya', 'zulm', 'tawakkul', 'being-vs-having', 'nafs'],
      reading_time_minutes: 22,
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    })
    .select('id')
    .single()

  if (postError) {
    console.error('Post insert error:', postError)
    process.exit(1)
  }

  console.log('Post inserted:', post.id)

  // 2. Insert entity tags
  const entityTags = [
    { post_id: post.id, entity_id: 'f0b13a63-1a8a-4dcd-b111-a74905614c2d', is_primary: true },  // dunya
    { post_id: post.id, entity_id: '97e10ca8-5612-4861-9117-3e11e28974d5', is_primary: false }, // zulm
    { post_id: post.id, entity_id: '547e36b8-aa55-4c03-a139-cd94f1df456a', is_primary: false }, // tawakkul
    { post_id: post.id, entity_id: '6b0f4289-73f5-426d-bc75-f271dbffe67f', is_primary: false }, // iman
    { post_id: post.id, entity_id: '84e3be67-e74d-45e0-abb6-7fb969907b3c', is_primary: false }, // nafs
    { post_id: post.id, entity_id: '21c6143a-7e57-4e8c-92ea-66415f5d4da7', is_primary: false }, // rahmah
    { post_id: post.id, entity_id: '68062942-b083-49c9-a8ce-c7274fe1077f', is_primary: false }, // zuhd
  ]

  const { error: tagError } = await supabase
    .from('entity_tags')
    .insert(entityTags)

  if (tagError) {
    console.error('Tag insert error:', tagError)
    process.exit(1)
  }

  console.log('Entity tags inserted:', entityTags.length)
  console.log('Done! Article slug: two-garden-owners-being-having-al-kahf')
}

main()
