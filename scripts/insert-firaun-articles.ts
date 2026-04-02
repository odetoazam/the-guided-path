#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const FIRAUN_ENTITY_ID = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861'
const MUSA_ENTITY_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'
const IBLIS_ENTITY_ID = '6647d520-3558-4ff2-882e-c85a706b1c47'

const articles = [
  {
    title: "The Grammar of Tyranny: How the Quran Frames Fir'awn's Speech",
    slug: "the-grammar-of-tyranny-how-the-quran-frames-firauns-speech",
    type: 'article' as const,
    excerpt: "Fir'awn speaks more than almost any villain in the Quran. His words are preserved with precision — not to dignify them, but to let the reader hear exactly how power constructs its own logic.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['firaun', 'quranic-characters', 'linguistic-analysis'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Fir'awn is the most quoted tyrant in the Quran. His speeches are preserved across multiple surahs — Surah Al-A'raf, Surah Taha, Surah Ash-Shu'ara, Surah Al-Qasas, Surah Ghafir, Surah Az-Zukhruf. The Quran does not summarize what he said. It reproduces his arguments, his rhetorical strategies, his self-framing. For a Book that compresses centuries of prophetic history into a few ayahs, this degree of quotation is a deliberate choice.</p>

  <p>The question is what that choice reveals. When the Quran lets Fir'awn speak at length, it turns his own language into evidence — the reader watches tyranny construct itself in real time, sentence by sentence.</p>

  <h2>The First-Person Sovereign</h2>

  <p>Fir'awn's most defining linguistic feature is the first-person pronoun. He uses <strong>ana</strong> — "I" — in a way no other Quranic figure does. The clearest instance appears in Surah An-Nazi'at:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ</p>
    <p class="translation">"I am your lord, the most high."</p>
    <cite>Surah An-Nazi'at (79:24)</cite>
  </blockquote>

  <p>The Arabic is five words. <strong>Ana rabbukum al-a'la</strong>. The pronoun <strong>ana</strong> begins the claim, and <strong>al-a'la</strong> — the superlative form of "high" — closes it. The statement occupies both ends of the sentence. Between the "I" and the "most high," there is only the possessive relationship: <strong>rabbukum</strong>, "your lord." The audience exists only as a possession of the speaker.</p>

  <p>This is the same superlative — <strong>al-a'la</strong> — that opens Surah Al-A'la as an attribute of Allah: <em>sabbih isma rabbika al-a'la</em>, "glorify the name of your Lord, the Most High." Fir'awn does not invent new vocabulary. He appropriates divine grammar. The tyranny is not in the claim itself but in the theft of a linguistic register that belongs elsewhere.</p>

  <h2>The Rhetorical Question as Weapon</h2>

  <p>Fir'awn's second consistent device is the rhetorical question — not as inquiry but as coercion. In Surah Az-Zukhruf, he addresses his people about Musa:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَمْ أَنَا خَيْرٌ مِّنْ هَـٰذَا الَّذِي هُوَ مَهِينٌ وَلَا يَكَادُ يُبِينُ</p>
    <p class="translation">"Am I not better than this one who is insignificant and can hardly express himself clearly?"</p>
    <cite>Surah Az-Zukhruf (43:52)</cite>
  </blockquote>

  <p>The structure repays attention. <strong>Am ana khayrun</strong> — "or am I better" — frames the comparison as if the answer were self-evident. The demonstrative <strong>hadha</strong> — "this one" — reduces Musa to an object pointed at. <strong>Mahin</strong> carries the root <strong>m-h-n</strong>, meaning contemptible, insignificant. And <strong>la yakadu yubin</strong> — "he can hardly make himself clear" — targets Musa's speech impediment, the very vulnerability that Musa himself raised with Allah in Surah Taha.</p>

  <p>Fir'awn weaponizes Musa's own acknowledged weakness. He has access to the same information — Musa's difficulty with speech — but he reads it as disqualification rather than as evidence that a man who struggles to speak would only speak if compelled by something greater than himself. The same data, opposite conclusions. The Quran preserves both readings and lets the listener judge.</p>

  <h2>The Appeal to Material Evidence</h2>

  <p>In the same passage, Fir'awn offers his counter-evidence — and the nature of that evidence reveals his entire epistemology:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَلَيْسَ لِي مُلْكُ مِصْرَ وَهَـٰذِهِ الْأَنْهَارُ تَجْرِي مِن تَحْتِي</p>
    <p class="translation">"Do I not possess the kingdom of Egypt, and these rivers flowing beneath me?"</p>
    <cite>Surah Az-Zukhruf (43:51)</cite>
  </blockquote>

  <p>The word <strong>mulk</strong> — sovereignty, dominion — is a term the Quran elsewhere reserves for Allah. <strong>Lillahi mulku as-samawati wal-ard</strong> — "To Allah belongs the dominion of the heavens and the earth" — appears across multiple surahs. Fir'awn claims <strong>mulk</strong> for himself, but qualifies it: <strong>mulk Misr</strong>, the kingdom of Egypt. He cannot claim the heavens, so he claims the geography. His sovereignty is bounded, and in bounding it, his own language exposes the limitation he cannot see.</p>

  <p>The rivers — <strong>al-anhar tajri min tahti</strong>, "flowing beneath me" — are his proof. Water as wealth, irrigation as power. But the phrase <strong>tajri min tahtiha al-anhar</strong> — "rivers flowing beneath" — recurs throughout the Quran as the description of Paradise. Fir'awn's proof of supremacy is a borrowed image of a garden he will never enter. His evidence indicts him in a register he does not recognize.</p>

  <h2>The Consultation That Is Not a Consultation</h2>

  <p>In Surah Ghafir, the Quran preserves Fir'awn in a rare moment — seeking counsel. After Musa presents his message, Fir'awn addresses his court:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ فِرْعَوْنُ مَا أُرِيكُمْ إِلَّا مَا أَرَىٰ وَمَا أَهْدِيكُمْ إِلَّا سَبِيلَ الرَّشَادِ</p>
    <p class="translation">"I only show you what I see, and I only guide you to the path of right conduct."</p>
    <cite>Surah Ghafir (40:29)</cite>
  </blockquote>

  <p>The verb <strong>urikum</strong> — "I show you" — and <strong>ahdikum</strong> — "I guide you" — are causative forms. He is the one who shows, the one who guides. The hedging particle <strong>ma...illa</strong> — "nothing except" — creates a syntax of false modesty. "I show you only what I see" sounds like restraint. In practice, it means: my perception is the only perception. What I see is all there is to see.</p>

  <p>The word <strong>rashad</strong> — right guidance — is devastating in context. <strong>Rushd</strong> and its derivatives appear throughout the Quran as attributes of divine guidance. The phrase <strong>sabil ar-rashad</strong>, "the path of right conduct," sounds like something a prophet would say. Fir'awn has absorbed prophetic vocabulary into his own speech so completely that his tyranny is syntactically indistinguishable from guidance. The listener must read the speaker, not just the speech.</p>

  <h2>The Threat Behind the Theology</h2>

  <p>When the believing man from Fir'awn's own family speaks up in the same surah — the one the Quran calls <strong>rajulun mu'minun min ali Fir'awn</strong> — Fir'awn responds with the clearest fusion of speech and violence:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَقَالَ فِرْعَوْنُ يَا هَامَانُ ابْنِ لِي صَرْحًا لَّعَلِّي أَبْلُغُ الْأَسْبَابَ</p>
    <p class="translation">"O Haman, build for me a tower that I may reach the pathways—"</p>
    <cite>Surah Ghafir (40:36)</cite>
  </blockquote>

  <p>The tower — <strong>sarhan</strong> — is Fir'awn's answer to theology. He cannot engage the argument about an unseen God, so he proposes to settle it empirically: build high enough and look. The word <strong>asbab</strong> — pathways, means, connections — appears elsewhere in the Quran to describe the causal architecture of the cosmos. Fir'awn wants to reach them physically. The vertical ambition — building upward to find God — mirrors Iblis's refusal to bow downward. Both figures resist the direction the Quran asks of them.</p>

  <p>But the tower is also a deflection. The believing man has just delivered a devastating speech about the transience of worldly life. Fir'awn's response is a construction project. He answers theology with engineering, argument with architecture. The response itself reveals the limitation: he can only process the transcendent through the material.</p>

  <h2>What the Quran Preserves</h2>

  <p>The cumulative effect of all this preserved speech is a portrait assembled from the subject's own words. The Quran could have summarized Fir'awn as a tyrant — and in places it does, calling him <strong>taghiya</strong>, one who transgresses. But the extended quotation does something a summary cannot. It lets the reader hear how tyranny sounds when it believes itself to be reason. How appropriated vocabulary creates the illusion of legitimacy. How material evidence — rivers, kingdoms, towers — becomes the only epistemology available to someone who has closed every other register.</p>

  <p>Fir'awn's grammar is the grammar of a closed system. Every sentence returns to <strong>ana</strong>. Every question has its answer pre-loaded. Every consultation confirms what was already decided. The Quran preserves it all — and in preserving it, transforms the tyrant's speech into a diagnostic manual for recognizing the structure wherever it appears.</p>
</article>`
  },
  {
    title: "The Drowning That Came Too Late",
    slug: "the-drowning-that-came-too-late",
    type: 'article' as const,
    excerpt: "At the moment the sea closes over him, Fir'awn believes. The Quran records the declaration — and the divine response that follows it. Belief exists, but the door has shut.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['firaun', 'quranic-characters', 'tawbah'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Red Sea parts. Bani Israel walks through on dry ground — the Quran specifies <strong>yabas</strong>, dry, not muddy, not damp. Fir'awn follows with his army. The water returns. And in the moment between the wave and the end, Fir'awn speaks. What he says in that moment — and what he receives in response — is one of the most compressed theological passages in the entire Quran.</p>

  <h2>The Declaration</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">حَتَّىٰ إِذَا أَدْرَكَهُ الْغَرَقُ قَالَ آمَنتُ أَنَّهُ لَا إِلَـٰهَ إِلَّا الَّذِي آمَنَتْ بِهِ بَنُو إِسْرَائِيلَ وَأَنَا مِنَ الْمُسْلِمِينَ</p>
    <p class="translation">"Until, when drowning overtook him, he said: 'I believe that there is no deity except that in whom the Children of Israel believe, and I am of those who submit.'"</p>
    <cite>Surah Yunus (10:90)</cite>
  </blockquote>

  <p>The temporal marker is exact. <strong>Hatta idha adrakahu al-gharaq</strong> — "until, when the drowning overtook him." The verb <strong>adraka</strong> means to catch up with, to reach, to overtake. The drowning catches him the way a pursuer catches prey. He was the one who pursued Bani Israel; now the water pursues him. The reversal is embedded in the verb.</p>

  <p>His declaration of faith is technically correct. <strong>La ilaha illa alladhi amanat bihi Banu Isra'il</strong> — the shahada routed through someone else's belief. He does not say "I believe in Allah." He says "I believe in the one the Children of Israel believe in." Even at the threshold of death, his belief is defined relationally — through the people he oppressed. He cannot name what he is submitting to except by pointing at those who already submitted.</p>

  <p>And then: <strong>wa ana min al-muslimin</strong> — "and I am of those who submit." The word <strong>muslim</strong> appears here in its pre-Islamic Quranic sense: one who submits. Fir'awn, who built his entire identity on sovereignty, uses the vocabulary of submission. The linguistic reversal is total.</p>

  <h2>The Response</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">آلْآنَ وَقَدْ عَصَيْتَ قَبْلُ وَكُنتَ مِنَ الْمُفْسِدِينَ</p>
    <p class="translation">"Now? And you had disobeyed before and were of the corrupters?"</p>
    <cite>Surah Yunus (10:91)</cite>
  </blockquote>

  <p>One word opens the response: <strong>al-ana</strong> — "now?" The hamza of interrogation stretches the word. Classical reciters elongate it — <strong>aaal-ana</strong> — and the elongation carries the weight of decades compressed into a syllable. Every plague, every sign, every conversation with Musa — all of it collapses into that single word. Now?</p>

  <p>The construction <strong>wa qad 'asayta qablu</strong> — "and you had disobeyed before" — uses the particle <strong>qad</strong> with the past tense, creating what Arabic grammarians call <strong>tahqiq</strong>: confirmed, established, beyond revision. The disobedience is not alleged. It is grammatically confirmed. And <strong>qablu</strong> — "before" — is left unspecified. Before what? Before this moment. The word encompasses his entire life.</p>

  <p><strong>Wa kunta min al-mufsidin</strong> — "and you were of the corrupters." The root <strong>f-s-d</strong> means to corrupt, to spoil, to cause decay. The verb form <strong>kunta</strong> — "you were" — places the corruption as a settled state, not a momentary lapse. He was not someone who committed corruption. He was of the corrupters — <strong>min al-mufsidin</strong> — it was his category, his classification.</p>

  <h2>What Is Preserved</h2>

  <p>The passage does not end with rejection. What follows is stranger:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً</p>
    <p class="translation">"So today We will save you in body, that you may be a sign for those who come after you."</p>
    <cite>Surah Yunus (10:92)</cite>
  </blockquote>

  <p>The verb <strong>nunajjika</strong> — "We will save you" — uses the same root (<strong>n-j-w</strong>) that describes the salvation of prophets and believers throughout the Quran. Nuh is <strong>najjaynahum</strong> — saved. Lut is <strong>najjaynahu</strong> — saved. The root that means deliverance is applied to Fir'awn — but with a qualifier that redefines the word entirely: <strong>bi-badanika</strong>, "in your body."</p>

  <p>The salvation is physical, not spiritual. The body is preserved. The <strong>badan</strong> — the corporeal frame — will be rescued from the sea so that it can serve as <strong>ayah</strong>, a sign. The same word used for Quranic verses, for the miracles of prophets, for the signs scattered through creation — <strong>ayah</strong> — is applied to a drowned tyrant's corpse. Fir'awn, who demanded to be a sign of power in life, becomes a sign of powerlessness in death.</p>

  <h2>The Theology of the Threshold</h2>

  <p>This passage establishes something the Quran addresses nowhere else with such specificity: the existence of a threshold after which belief, though genuine, no longer avails. Fir'awn's belief at the moment of drowning is not called false. The Quran does not say he lied. It says <strong>al-ana</strong> — "now?" The problem is not the sincerity of the belief but its timing.</p>

  <p>The Quran makes this principle explicit elsewhere in the same surah:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمْ يَكُ يَنفَعُهُمْ إِيمَانُهُمْ لَمَّا رَأَوْا بَأْسَنَا</p>
    <p class="translation">"But their faith did not benefit them when they saw Our punishment."</p>
    <cite>Surah Ghafir (40:85)</cite>
  </blockquote>

  <p>The verb <strong>yanfa'uhum</strong> — "benefit them" — is precise. The faith exists. The benefit does not. The Quran distinguishes between the reality of belief and its efficacy. Faith that arrives only when the consequences become visible operates in a different register than faith that operates in the absence of visible evidence. The first is reaction; the second is commitment.</p>

  <p>Fir'awn's drowning-moment faith is the purest example of faith-as-reaction in the Quran. He believes when belief costs him nothing — because everything has already been taken. The water has already closed. The army has already submerged. The throne has already been emptied. His faith arrives in the only moment when it requires no sacrifice, no change, no risk. It asks nothing of him because there is nothing left to ask.</p>

  <h2>The Body as Archive</h2>

  <p>The preservation of the body — <strong>nunajjika bi-badanika</strong> — transforms Fir'awn from a subject into an object. In life, he was the one who acted on others: enslaving, commanding, killing the sons. In death, he is acted upon. He is preserved, positioned, made into a sign. The passive transformation is complete.</p>

  <p>The phrase <strong>li-man khalfaka</strong> — "for those who come after you" — extends the sign across time. The body is not preserved for Fir'awn's benefit. It is preserved for an audience he will never know, in an era he will never see. He becomes a teaching instrument for generations he cannot address. The sovereign who insisted on controlling every message is now a message he cannot edit.</p>

  <p>The ayah closes with a quiet observation: <strong>wa inna kathiran min an-nasi 'an ayatina la-ghafilun</strong> — "and indeed, many people are heedless of Our signs." The sign is available. The body is preserved. The text is recited. And still — <strong>ghafilun</strong>, heedless. The sign's existence does not guarantee its reception. Even a drowned tyrant, preserved across millennia, can be walked past without recognition.</p>
</article>`
  },
  {
    title: "Fir'awn and Musa: The Architecture of the Mirror",
    slug: "firaun-and-musa-the-architecture-of-the-mirror",
    type: 'article' as const,
    excerpt: "The Quran pairs these two figures with such precision that their opposition becomes structural — each one defined by what the other refuses. The mirror between them is the architecture of the entire narrative.",
    reading_time_minutes: 13,
    status: 'published' as const,
    tags: ['firaun', 'musa', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran tells the story of Musa and Fir'awn more than any other prophetic narrative. It appears, in part or in full, across more than twenty surahs. Each retelling foregrounds a different facet — the childhood, the confrontation, the plagues, the crossing, the aftermath. But beneath every retelling lies a structural principle: these two figures are defined against each other. What Musa is, Fir'awn refuses to become. What Fir'awn claims, Musa surrenders. The pairing is architectural.</p>

  <h2>The Origin in the Enemy's House</h2>

  <p>The Quran establishes the mirror before either figure speaks a word. The decree goes out: kill the sons of Bani Israel. The instrument of that decree — Fir'awn's household — becomes the instrument of its undoing. The child floats in a basket to the palace. The wife of Fir'awn intervenes:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَقَالَتِ امْرَأَتُ فِرْعَوْنَ قُرَّتُ عَيْنٍ لِّي وَلَكَ ۖ لَا تَقْتُلُوهُ عَسَىٰ أَن يَنفَعَنَا أَوْ نَتَّخِذَهُ وَلَدًا</p>
    <p class="translation">"The wife of Fir'awn said: 'A comfort of the eye for me and for you. Do not kill him — perhaps he may benefit us, or we may adopt him as a son.'"</p>
    <cite>Surah Al-Qasas (28:9)</cite>
  </blockquote>

  <p>The phrase <strong>qurrata 'aynin</strong> — "comfort of the eye," "coolness of the eye" — carries the root <strong>q-r-r</strong>, which means to settle, to become cool, to find rest. The same phrase appears in the du'a of the righteous in Surah Al-Furqan: <em>rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun</em>. Asiya sees in the floating child what the righteous pray for. And she sees it in a child her husband's decree was designed to eliminate.</p>

  <p>Musa grows up in Fir'awn's house. He eats Fir'awn's food, walks Fir'awn's corridors, learns the knowledge of Fir'awn's civilization. The prophet is raised inside the very system he will later dismantle. The Quran finds no contradiction in this — it is the pattern. Yusuf was raised in the house of the 'Aziz. Ibrahim emerged from an idol-making household. The messenger grows inside the thing the message will address.</p>

  <h2>The Speech and the Silence</h2>

  <p>When Musa receives his commission at the burning bush, his first response is vulnerability:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ رَبِّ إِنِّي أَخَافُ أَن يُكَذِّبُونِ ۝ وَيَضِيقُ صَدْرِي وَلَا يَنطَلِقُ لِسَانِي</p>
    <p class="translation">"He said: 'My Lord, I fear they will deny me. And my chest tightens, and my tongue does not flow freely.'"</p>
    <cite>Surah Ash-Shu'ara (26:12-13)</cite>
  </blockquote>

  <p>Three admissions in two ayahs. <strong>Akhafu</strong> — I fear. <strong>Yadiqu sadri</strong> — my chest constricts. <strong>La yantaliq lisani</strong> — my tongue does not release. The root <strong>t-l-q</strong> means to release, to set free, to flow without obstruction. Musa's tongue is bound. The man sent to speak to the most powerful human on earth begins by confessing that speech does not come easily to him.</p>

  <p>Place this beside Fir'awn's effortless rhetoric — his rhetorical questions, his polished self-presentation, his command of the room. Musa struggles with language. Fir'awn wields it like a weapon. The Quran establishes eloquence as the tyrant's domain and stammering as the prophet's. The message does not arrive through superior rhetoric. It arrives despite the messenger's limitations — which means the power is in the message, not the speaker.</p>

  <h2>Two Responses to the Staff</h2>

  <p>The confrontation with the magicians reveals the mirror at its sharpest. Fir'awn assembles his sorcerers — the Quran uses <strong>sahara</strong>, sorcerers, a word built on the root <strong>s-h-r</strong>, which includes the meaning of deception, of making something appear other than what it is. Fir'awn's entire apparatus is built on <strong>sihr</strong> — creating appearances.</p>

  <p>Musa throws his staff. The magicians throw their ropes. The moment of truth is recorded in Surah Taha:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأُلْقِيَ السَّحَرَةُ سُجَّدًا قَالُوا آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ</p>
    <p class="translation">"So the magicians fell down in prostration. They said: 'We have believed in the Lord of Harun and Musa.'"</p>
    <cite>Surah Taha (20:70)</cite>
  </blockquote>

  <p>The verb <strong>ulqiya</strong> — "were cast down" — is in the passive voice. The magicians did not choose to prostrate in the way one chooses a political position. They were cast into prostration by the weight of what they witnessed. The professionals — the people who knew exactly how illusions work — recognized immediately that what Musa produced was not an illusion. Their expertise made them the most qualified witnesses. And their testimony <strong>amanna bi-rabbi Haruna wa Musa</strong> — "we believe in the Lord of Harun and Musa" — pointedly avoids Fir'awn's name. They believe in the Lord of the two prophets, not the lord of Egypt.</p>

  <p>Fir'awn's response strips away the last pretense of governance:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ آمَنتُمْ لَهُ قَبْلَ أَنْ آذَنَ لَكُمْ</p>
    <p class="translation">"He said: 'You believed in him before I gave you permission?'"</p>
    <cite>Surah Taha (20:71)</cite>
  </blockquote>

  <p>The verb <strong>adhana</strong> — "I permitted" — comes from the root <strong>a-dh-n</strong>, which relates to the ear, to hearing, to authorization. Fir'awn claims jurisdiction over belief itself. He does not argue that their belief is wrong. He argues that it is unauthorized. Faith, in his system, requires a license. The absurdity of the claim — that prostration before the divine requires a tyrant's permission slip — is left to stand without commentary. The Quran does not mock it. The statement mocks itself.</p>

  <h2>The Directions of Power</h2>

  <p>Musa's movement throughout the narrative is consistently horizontal and downward. He flees Egypt on foot. He walks through the desert to Madyan. He tends sheep. He removes his shoes at the valley of Tuwa because the ground is sacred — <strong>innaka bil-wadil-muqaddasi Tuwa</strong>. He leads his people through the sea on foot. He goes up Sinai only when called — and comes down carrying tablets.</p>

  <p>Fir'awn's movement is vertical and upward. He builds the tower — <strong>ibn li sarhan</strong>. He sits elevated above his court. He claims the superlative height — <strong>al-a'la</strong>. His entire spatial grammar is ascension: higher, above, over.</p>

  <p>The Quran inverts both trajectories at the end. Musa, who walked the earth, receives revelation from the highest source. Fir'awn, who built upward, is brought to the lowest point — the bottom of the sea. The man who claimed to be <strong>al-a'la</strong> drowns. The man who removed his shoes before holy ground inherits the earth his opponent claimed to own.</p>

  <h2>What Each One Says to Allah</h2>

  <p>The deepest mirror is in how each figure addresses Allah. Musa's prayers are collected across the Quran — and every one of them acknowledges dependence:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي</p>
    <p class="translation">"My Lord, expand for me my chest. And ease for me my task. And untie the knot from my tongue."</p>
    <cite>Surah Taha (20:25-27)</cite>
  </blockquote>

  <p><strong>Ishrah li sadri</strong> — expand my chest. The root <strong>sh-r-h</strong> means to open, to lay bare, to make spacious. Musa asks for internal expansion — the opposite of the constriction (<strong>yadiqu sadri</strong>) he confessed earlier. <strong>Yassir li amri</strong> — ease my affair. <strong>Uhlul 'uqdatan min lisani</strong> — untie the knot from my tongue. Every verb is a request. Every sentence begins with a need. The prophet's speech to Allah is structured as dependency.</p>

  <p>Fir'awn's speech to his people, by contrast, is structured as self-sufficiency. <strong>Ana rabbukum al-a'la</strong>. <strong>Ma urikum illa ma ara</strong>. He never asks. He never acknowledges a need. He never positions himself as the one who receives. His grammar is always the grammar of the source — I show, I guide, I am.</p>

  <p>The Quran places these two speech patterns side by side across surahs and lets the contrast accumulate. One figure's language bends toward the ground in supplication. The other's language bends toward the sky in self-assertion. The sea, when it comes, resolves the tension — but the linguistic architecture has already rendered its verdict long before the water moves.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Fir\'awn articles...')

  for (const article of articles) {
    // Insert the article
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert(article)
      .select('id, title, slug')
      .single()

    if (postError) {
      console.error(`Failed to insert "${article.title}":`, postError.message)
      continue
    }

    console.log(`✓ Inserted: "${post.title}" (${post.slug})`)

    // Primary tag: Fir'awn
    const { error: tagError } = await supabase.from('entity_tags').insert({
      post_id: post.id,
      entity_id: FIRAUN_ENTITY_ID,
      is_primary: true,
    })
    if (tagError) console.error(`  Tag error (firaun):`, tagError.message)
    else console.log(`  ✓ Tagged: firaun (primary)`)

    // Secondary tag: Musa (for mirror article)
    if (article.slug.includes('musa')) {
      const { error: musaTagError } = await supabase.from('entity_tags').insert({
        post_id: post.id,
        entity_id: MUSA_ENTITY_ID,
        is_primary: false,
      })
      if (musaTagError) console.error(`  Tag error (musa):`, musaTagError.message)
      else console.log(`  ✓ Tagged: musa (secondary)`)
    }

    // Secondary tag: Iblis (for grammar article that mentions the parallel)
    if (article.slug.includes('grammar')) {
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

  console.log('\nDone! Inserted', articles.length, 'Fir\'awn articles.')
}

main().catch(console.error)
