// ══════════════════════════════════════════════════════════════════════════════
// Ulum al-Quran — The Sciences Behind the Quran
// Data file for /ulum-al-quran page
// ══════════════════════════════════════════════════════════════════════════════

// ── Types ─────────────────────────────────────────────────────────────────────

export type ScaleLevel = 'word' | 'verse' | 'surah' | 'cross-cutting'
export type DifficultyTier = 'start-here' | 'go-deeper' | 'advanced'

export interface AyahExample {
  /** Ayah reference, e.g. "1:5" — tagged as [ayah:S:A] for verification */
  ref: string
  arabic: string
  translation: string
  /** 2-3 sentences on what this science reveals in this ayah */
  analysis: string
  surahLink?: string
  surahName?: string
}

export interface QuranicScience {
  id: string
  arabic: string
  transliteration: string
  english: string
  scale: ScaleLevel
  difficulty: DifficultyTier
  /** One-line evocative description */
  tagline: string
  /** 2-3 paragraphs of explanation */
  description: string[]
  ayahExample: AyahExample
  /** Slug for linking to /glossary/[slug] if an entry exists */
  glossarySlug?: string
  /** IDs of related sciences on this page */
  relatedSciences: string[]
}

export interface LensQuestion {
  question: string
  scienceIds: string[]
  explanation: string
}

export interface ScaleMeta {
  arabic: string
  transliteration: string
  english: string
  subtitle: string
  description: string
}

// ── Scale Metadata ────────────────────────────────────────────────────────────

export const SCALE_META: Record<ScaleLevel, ScaleMeta> = {
  word: {
    arabic: 'الكلمة',
    transliteration: 'Al-Kalimah',
    english: 'Word Level',
    subtitle: 'How individual words carry meaning',
    description:
      'These sciences examine what happens inside a single word — its root, its grammatical form, its vocabulary. A change of one letter can shift the meaning of an entire verse.',
  },
  verse: {
    arabic: 'الآية',
    transliteration: 'Al-Ayah',
    english: 'Verse Level',
    subtitle: 'How sentences achieve what no other language can',
    description:
      'These sciences examine how the Quran constructs sentences with a precision and power that no human author has replicated — its rhetoric, its deliberate ambiguity, its inimitability.',
  },
  surah: {
    arabic: 'السورة',
    transliteration: 'Al-Surah',
    english: 'Surah Level',
    subtitle: 'How entire chapters are designed',
    description:
      'These sciences examine the architecture of complete surahs — their internal coherence, their historical context, their narrative strategies, and how they connect to each other.',
  },
  'cross-cutting': {
    arabic: 'العلوم الشاملة',
    transliteration: 'Al-Ulum al-Shamilah',
    english: 'Cross-Cutting Sciences',
    subtitle: 'Disciplines that operate at every level',
    description:
      'These are the foundational sciences that span the entire Quran — the methodology of interpretation itself, the rules of recitation, and the theological framework the Quran builds.',
  },
}

// ── Sciences ──────────────────────────────────────────────────────────────────

export const SCIENCES: QuranicScience[] = [
  // ─── WORD LEVEL ───────────────────────────────────────────────────────────

  {
    id: 'sarf',
    arabic: 'صرف',
    transliteration: 'Sarf',
    english: 'Morphology',
    scale: 'word',
    difficulty: 'go-deeper',
    tagline: 'How three root letters generate an entire universe of meaning.',
    description: [
      'Arabic words are built from three-letter roots. The root k-t-b (ك-ت-ب) means "to write" — but from those same three letters come kitab (book), katib (writer), maktub (written/destined), and maktabah (library). Sarf is the science of how these patterns work: how a root becomes a verb, a noun, an adjective, a command.',
      'In the Quran, this matters enormously. A verb in Form II (fa\'\'ala) intensifies the action. Form V (tafa\'\'ala) makes it reflexive or reciprocal. Form X (istaf\'ala) means to seek or request the root meaning. When Allah chooses one form over another, the morphological pattern is carrying theological weight.',
      'Even the pattern of a noun matters. The word "Kawthar" in Surah 108 uses the faw\'al pattern — a morphological form that expresses abundance beyond measurement. Not "a lot" but "so much it overflows the word."',
    ],
    ayahExample: {
      // [ayah:108:1]
      ref: '108:1',
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      translation: 'Indeed, We have given you al-Kawthar.',
      analysis:
        'The word al-Kawthar uses the faw\'al morphological pattern — a form that expresses abundance beyond the ability to measure. Not "much" but overflow. A river in Paradise, the largest ummah, intercession, the Quran itself. The morphological form tells you the gift is bigger than any single definition.',
      surahLink: '/surahs/al-kawthar',
      surahName: 'Al-Kawthar',
    },
    relatedSciences: ['nahw', 'lughah'],
  },

  {
    id: 'nahw',
    arabic: 'نحو',
    transliteration: 'Nahw',
    english: 'Syntax & Grammar',
    scale: 'word',
    difficulty: 'go-deeper',
    tagline: 'How sentence structure carries meaning that words alone cannot.',
    description: [
      'Nahw is the science of how Arabic words relate to each other in a sentence — subject, predicate, object, particles. It determines case endings, governs word order, and controls how meaning flows through a sentence. In the Quran, grammatical choices are never accidental.',
      'Arabic has emphatic particles that restructure entire sentences. The particle inna seizes control of the sentence, overriding doubt and establishing certainty. When inna is combined with the lam of emphasis (la-), the result is a grammatical double-lock — a statement that Arabic grammar reserves for claims that allow no escape.',
      'Understanding nahw also reveals why certain words are fronted (moved to an unusual position). In Arabic, the default verb-subject-object order can be rearranged for emphasis, exclusivity, or surprise. When the Quran fronts an object before its verb, it is making a deliberate rhetorical choice.',
    ],
    ayahExample: {
      // [ayah:103:2]
      ref: '103:2',
      arabic: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ',
      translation: 'Indeed, humanity is in loss.',
      analysis:
        'Two emphatic particles — inna and the lam of emphasis — together create what scholars call a grammatical double-lock. Every single human being is included, every exit sealed. The preposition fi (in) means immersion: humanity is inside loss the way a fish is inside water. Three words. No escape clause. The grammar does the theology.',
      surahLink: '/surahs/al-asr',
      surahName: 'Al-\'Asr',
    },
    relatedSciences: ['sarf', 'balaghah'],
  },

  {
    id: 'lughah',
    arabic: 'لغة',
    transliteration: 'Ilm al-Lughah',
    english: 'Arabic Linguistics',
    scale: 'word',
    difficulty: 'go-deeper',
    tagline: 'The vocabulary the Quran chose — and why no synonym would work.',
    description: [
      'Ilm al-Lughah is the study of the Classical Arabic vocabulary used in the Quran. Arabic is a language of extraordinary precision — words that seem like synonyms almost never are. The Quran selects each word with a specificity that translations cannot reproduce.',
      'Consider the word khusr (خُسْر) in Surah Al-\'Asr. It is not simply "loss" — it is a commercial term meaning capital that bleeds away over time. The choice tells you that time is not neutral; every moment you are alive, something is being spent. Or consider that the Quran uses the plural "darknesses" (ẓulumat) but the singular "light" (nur) — darkness comes in varieties, but guidance is one.',
      'This science also studies rare and unusual words (gharib al-Quran), words borrowed from other Semitic languages, and words whose meaning shifted between pre-Islamic and Quranic usage. Knowing the linguistic landscape is essential for reading tafsir.',
    ],
    ayahExample: {
      // [ayah:103:2]
      ref: '103:2',
      arabic: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ',
      translation: 'Indeed, humanity is in loss.',
      analysis:
        'The word khusr is a commercial term — capital that bleeds away over time, not a one-time event but a continuous hemorrhage. The choice of vocabulary turns the verse into an economic metaphor: your life is capital, and time is spending it. No synonym in Arabic carries the same weight.',
      surahLink: '/surahs/al-asr',
      surahName: 'Al-\'Asr',
    },
    relatedSciences: ['sarf', 'balaghah'],
  },

  // ─── VERSE LEVEL ──────────────────────────────────────────────────────────

  {
    id: 'balaghah',
    arabic: 'بلاغة',
    transliteration: 'Balaghah',
    english: 'Rhetoric',
    scale: 'verse',
    difficulty: 'go-deeper',
    tagline: 'The science of saying the right thing, in the right way, to the right audience.',
    description: [
      'Balaghah is Arabic rhetoric — the science of eloquent, appropriate, and effective language. It contains three sub-disciplines: Ilm al-Ma\'ani (meaning through sentence structure — why a sentence is nominal vs verbal, definite vs indefinite), Ilm al-Bayan (figurative language — metaphor, simile, metonymy), and Ilm al-Badi\' (stylistic devices — wordplay, antithesis, phonetic texture).',
      'The Quran operates at a level of balaghah that no human author has replicated. Every sentence choice — active vs passive, definite vs indefinite, present tense vs past — carries meaning. A shift from third person to second person mid-verse (iltifat) is not an error but a rhetorical device that changes the emotional register of the entire passage.',
      'Understanding balaghah is what transforms translation from "knowing the words" to "hearing the music." It is the foundation of the Quran\'s claim to inimitability — and the reason scholars say that the Quran\'s Arabic cannot be adequately translated, only approximated.',
    ],
    ayahExample: {
      // [ayah:1:5]
      ref: '1:5',
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      translation: 'You alone we worship, and You alone we ask for help.',
      analysis:
        'Three rhetorical devices in one verse. First, iltifat — a shift from third-person description of God (verses 2-4) to direct second-person address. Second, taqdim — the object "You" (iyyaka) is fronted before the verb, creating exclusivity: You and no one else. Third, the repetition of iyyaka creates a rhythmic emphasis that reinforces the theological claim. The rhetoric is doing the theology.',
      surahLink: '/surahs/al-fatiha',
      surahName: 'Al-Fatiha',
    },
    glossarySlug: 'balaghah',
    relatedSciences: ['ijaz', 'nahw', 'sarf'],
  },

  {
    id: 'ijaz',
    arabic: 'إعجاز',
    transliteration: 'I\'jaz al-Quran',
    english: 'Inimitability',
    scale: 'verse',
    difficulty: 'advanced',
    tagline: 'The study of what makes the Quran impossible to replicate.',
    description: [
      'I\'jaz means "to render incapable" — the Quran\'s claim that no human being can produce anything like it. This is not a vague spiritual claim; it is a concrete literary challenge. The Quran issues this challenge explicitly: produce even a single surah of comparable quality (2:23). In 1,400 years, the challenge remains unanswered.',
      'Scholars have identified multiple dimensions of i\'jaz. Linguistic i\'jaz refers to the Quran\'s unprecedented rhetorical sophistication — sentences that operate at a level of precision and emotional power beyond human capacity. Structural i\'jaz refers to the coherence of entire surahs and the Quran as a whole. Informational i\'jaz refers to knowledge the Quran contains that was unavailable to 7th-century Arabia.',
      'I\'jaz is not an article of blind faith — it is an observable literary phenomenon. When Surah Al-Kawthar compresses an entire theology of divine generosity, prophetic duty, and cosmic justice into three verses and ten words, you are witnessing i\'jaz in action.',
    ],
    ayahExample: {
      // [ayah:108:1]
      ref: '108:1',
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      translation: 'Indeed, We have given you al-Kawthar.',
      analysis:
        'The shortest surah in the Quran — three verses, ten words — and yet it contains a complete theological argument: divine gift, the only coherent human response, and the cosmic reversal of an accusation. The morphological precision, the pronoun architecture, the sound patterns — all operating simultaneously at a level no human text has matched. This is i\'jaz made visible.',
      surahLink: '/surahs/al-kawthar',
      surahName: 'Al-Kawthar',
    },
    glossarySlug: 'ijaz',
    relatedSciences: ['balaghah', 'nazm'],
  },

  {
    id: 'muhkamat-mutashabihat',
    arabic: 'محكمات ومتشابهات',
    transliteration: 'Muhkamat wa Mutashabihat',
    english: 'Clear & Ambiguous Verses',
    scale: 'verse',
    difficulty: 'advanced',
    tagline: 'Why some verses are crystal clear — and others are deliberately not.',
    description: [
      'The Quran itself distinguishes between two types of verses: muhkamat (clear, definitive, foundational) and mutashabihat (ambiguous, multi-layered, open to interpretation). This distinction is made explicitly in Surah Al Imran 3:7 — the muhkamat are the "mother of the Book," the anchoring principles, while the mutashabihat are verses whose full meaning is known only to Allah.',
      'This is not a flaw in the Quran but a design feature. The muhkamat establish the non-negotiable foundations: Tawhid, the Day of Judgment, the obligation of prayer. The mutashabihat — such as the "letters" that open certain surahs (Alif Lam Mim), descriptions of Allah\'s attributes, or details of the unseen — preserve mystery and humility in the reader.',
      'Scholars throughout history have debated which verses fall into which category. Understanding the distinction protects you from two errors: treating a clear ruling as if it were open to reinterpretation, and treating a genuinely ambiguous verse as if it had only one possible meaning.',
    ],
    ayahExample: {
      // [ayah:3:7]
      ref: '3:7',
      arabic: 'هُوَ ٱلَّذِىٓ أَنزَلَ عَلَيْكَ ٱلْكِتَـٰبَ مِنْهُ ءَايَـٰتٌ مُّحْكَمَـٰتٌ هُنَّ أُمُّ ٱلْكِتَـٰبِ وَأُخَرُ مُتَشَـٰبِهَـٰتٌ',
      translation:
        'It is He who has sent down to you the Book; in it are verses that are precise — they are the foundation of the Book — and others that are ambiguous.',
      analysis:
        'The Quran names its own design principle: some verses are muhkamat (precise, foundational) and others are mutashabihat (resembling multiple meanings). The metaphor "mother of the Book" (umm al-kitab) for the clear verses tells you they are the origin point — everything else is understood in their light.',
    },
    relatedSciences: ['usool-al-tafsir', 'aqeedah'],
  },

  // ─── SURAH LEVEL ──────────────────────────────────────────────────────────

  {
    id: 'nazm',
    arabic: 'نظم',
    transliteration: 'Nazm',
    english: 'Internal Coherence',
    scale: 'surah',
    difficulty: 'go-deeper',
    tagline: 'Why nothing in a surah is out of place.',
    description: [
      'Nazm is the science of a surah\'s internal coherence — how its sections flow from each other, why topics appear in the order they do, and what holds the entire chapter together. Scholars like Imam al-Razi devoted enormous attention to nazm, arguing that no transition in the Quran is arbitrary.',
      'Every surah has what scholars call an amud — a central thesis or governing idea around which every section is organized. Identifying the amud changes how you read every verse: each one is either building toward, supporting, or applying that central idea. What looks like a "topic change" is actually the same idea examined from a new angle.',
      'Nazm also includes ring structures (chiastic patterns), where the first and last sections of a surah mirror each other, creating a frame around the central message. Al-Fatiha, for example, mirrors itself perfectly around verse 5 — praise and wrong paths, mercy and right path, sovereignty and guidance, all reflecting across the meeting point.',
    ],
    ayahExample: {
      // [ayah:1:5]
      ref: '1:5',
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      translation: 'You alone we worship, and You alone we ask for help.',
      analysis:
        'Verse 5 is the structural center of Al-Fatiha\'s ring. Verses 2-4 (praise, mercy, sovereignty) mirror verses 6-7 (guidance, right path, wrong paths) — creating a chiastic frame around this single meeting point where the servant turns from describing God to speaking directly to Him. The nazm is the theology: everything converges on the moment of encounter.',
      surahLink: '/surahs/al-fatiha',
      surahName: 'Al-Fatiha',
    },
    glossarySlug: 'nazm',
    relatedSciences: ['munasabat', 'makki-madani'],
  },

  {
    id: 'makki-madani',
    arabic: 'مكية / مدنية',
    transliteration: 'Makki / Madani',
    english: 'Chronology of Revelation',
    scale: 'surah',
    difficulty: 'start-here',
    tagline: 'The Quran before and after everything changed.',
    description: [
      'The Quran was revealed over 23 years across two very different historical contexts. Surahs revealed before the Prophet\'s ﷺ migration (Hijra) to Madinah are called Makki. Those revealed after are called Madani. The distinction profoundly shapes both the content and style of each surah.',
      'Makki surahs were addressed to a small, persecuted community that needed faith, resilience, and hope. They tend to be shorter, more intense, rhythmic, and focused on the unseen: resurrection, judgment, the stories of earlier prophets who were also rejected. Madani surahs were addressed to an established community that needed laws, social ethics, and guidance for governance.',
      'This is not a rigid formula — some Makki surahs contain Madani verses and vice versa. But knowing whether a surah is Makki or Madani is one of the first things a scholar checks, because it immediately tells you the audience, the tone, and the likely themes.',
    ],
    ayahExample: {
      // [ayah:103:1]
      ref: '103:1',
      arabic: 'وَٱلْعَصْرِ',
      translation: 'By time.',
      analysis:
        'Surah Al-\'Asr is a classic Makki surah — short, intense, oath-driven, focused on the cosmic stakes of human existence. Its compressed, urgent style is characteristic of the Makkan period: three verses that deliver a complete worldview. Compare this to the extended legislative passages of Madani surahs like Al-Baqarah, and you can hear the difference in rhythm, tone, and purpose.',
      surahLink: '/surahs/al-asr',
      surahName: 'Al-\'Asr',
    },
    relatedSciences: ['asbab-al-nuzul', 'nazm'],
  },

  {
    id: 'munasabat',
    arabic: 'مناسبات السور',
    transliteration: 'Munasabat al-Suwar',
    english: 'Inter-Surah Connections',
    scale: 'surah',
    difficulty: 'advanced',
    tagline: 'Why each surah is placed exactly where it is.',
    description: [
      'Munasabat is the science of thematic connections between adjacent surahs — why Al-Fatiha is followed by Al-Baqarah, why Al-Kawthar is followed by Al-Kafirun. Scholars like Imam al-Suyuti argued that the order of the surahs is not arbitrary but divinely guided, and that reading adjacent surahs together reveals connections invisible when they are read alone.',
      'These connections take many forms: a question asked at the end of one surah is answered at the beginning of the next; a theme introduced briefly in one surah is elaborated in the next; a story told from one angle in one surah is retold from a different angle in another.',
      'Understanding munasabat changes the Quran from a collection of independent chapters into a continuous, interlocking conversation. It is one of the most advanced and rewarding Quranic sciences.',
    ],
    ayahExample: {
      // [ayah:1:6]
      ref: '1:6',
      arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
      translation: 'Guide us to the straight path.',
      analysis:
        'Al-Fatiha ends with a prayer: "Guide us to the straight path." Al-Baqarah opens: "This is the Book, in which there is no doubt, a guidance for the mindful." The answer to the prayer is the next surah. This is munasabat — the Quran reading itself, each surah in conversation with its neighbors.',
    },
    relatedSciences: ['nazm', 'makki-madani'],
  },

  {
    id: 'qasas',
    arabic: 'قصص القرآن',
    transliteration: 'Qasas al-Quran',
    english: 'Quranic Narratives',
    scale: 'surah',
    difficulty: 'start-here',
    tagline: 'Stories told not for entertainment but for transformation.',
    description: [
      'The Quran contains the stories of prophets, nations, and pivotal moments in sacred history — but it tells them differently from any other scripture. Quranic narratives are not chronological biographies; they are strategic retellings, each version of a story designed to serve the specific surah it appears in.',
      'The story of Musa (Moses) appears in over 30 surahs, but no two tellings are identical. In one surah, the emphasis is on his confrontation with Pharaoh; in another, on his moment of doubt; in another, on his relationship with Khidr. The repetition is not redundancy — it is a prism, showing different facets of the same truth depending on the surah\'s needs.',
      'Understanding Qasas means asking not just "what happened?" but "why is this particular part of the story told here, in this surah, at this point in the argument?"',
    ],
    ayahExample: {
      // [ayah:28:7]
      ref: '28:7',
      arabic: 'وَأَوْحَيْنَآ إِلَىٰٓ أُمِّ مُوسَىٰٓ أَنْ أَرْضِعِيهِ',
      translation: 'And We inspired the mother of Musa: "Nurse him."',
      analysis:
        'Surah Al-Qasas ("The Stories") opens Musa\'s story not with the confrontation with Pharaoh but with his mother\'s fear and faith. The choice tells you what this particular retelling is about: not political power, but the intimate, terrifying trust a mother places in God when she places her child in the river. Same prophet, different lens, different lesson.',
    },
    relatedSciences: ['amthal', 'makki-madani'],
  },

  {
    id: 'amthal',
    arabic: 'أمثال القرآن',
    transliteration: 'Amthal al-Quran',
    english: 'Parables & Similes',
    scale: 'surah',
    difficulty: 'go-deeper',
    tagline: 'How God explains the invisible by pointing to the visible.',
    description: [
      'The Quran uses parables (amthal) to make abstract truths concrete. These are not decorative illustrations but structural arguments — the parable often does the theological heavy lifting that abstract language cannot. Allah says explicitly: "We strike these parables for people so that they may reflect" (59:21).',
      'Quranic parables operate on multiple levels simultaneously. The parable of light in Surah An-Nur (24:35) — "Allah is the light of the heavens and the earth; the parable of His light is as a niche within which is a lamp" — is at once a description of divine guidance, an image of the believing heart, and a map of how knowledge moves from source to vessel to world.',
      'Studying amthal requires asking: what is being compared to what? What aspect of the comparison carries the point? And what does the parable reveal that direct statement could not?',
    ],
    ayahExample: {
      // [ayah:14:24]
      ref: '14:24',
      arabic: 'أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِى ٱلسَّمَآءِ',
      translation:
        'Have you not seen how Allah sets forth a parable? A good word is like a good tree — its root firm and its branches in the sky.',
      analysis:
        'A "good word" (kalimah tayyibah — understood as la ilaha illa Allah) is compared to a tree with firm roots and branches in the sky. The parable makes the abstract concrete: faith is not a feeling but a living structure. It has roots (conviction), a trunk (practice), branches (influence), and fruit (good deeds). The parable teaches what a definition cannot.',
    },
    relatedSciences: ['qasas', 'balaghah'],
  },

  {
    id: 'qasam',
    arabic: 'قسم',
    transliteration: 'Qasam',
    english: 'Divine Oaths',
    scale: 'surah',
    difficulty: 'go-deeper',
    tagline: 'When God swears by His own creation, listen to what He swears by.',
    description: [
      'Many Quranic surahs open with oaths — God swearing by the sun, the moon, the fig, the pen, time itself. These are not arbitrary; the object of the oath is always connected to the claim that follows it. Understanding the relationship between the oath and its answer is one of the richest tools for understanding a surah.',
      'When God swears by al-\'asr (time) in Surah 103, the oath object tells you the theme: time is the force that makes the verdict (humanity is in loss) inevitable. When He swears by the fig and the olive in Surah 95, the objects point to the lands of prophets — Jerusalem and the Levant — connecting geography to revelation.',
      'Scholars distinguish between the oath (qasam), the object sworn by (muqsam bihi), and the answer/claim the oath supports (muqsam \'alayhi). Sometimes the answer is stated explicitly; sometimes it is implied, and the reader must work to find it.',
    ],
    ayahExample: {
      // [ayah:103:1]
      ref: '103:1',
      arabic: 'وَٱلْعَصْرِ',
      translation: 'By time.',
      analysis:
        'God swears by al-\'asr — time, the declining afternoon, the epoch. The root \'ayn-sad-ra holds the image of pressing or squeezing. Time is not neutral; it is an active force that diminishes everything it touches. The oath tells you the verdict before the verdict arrives: if time is a squeezing force, then everything caught in it is being diminished.',
      surahLink: '/surahs/al-asr',
      surahName: 'Al-\'Asr',
    },
    relatedSciences: ['makki-madani', 'nazm'],
  },

  // ─── CROSS-CUTTING ────────────────────────────────────────────────────────

  {
    id: 'tafsir',
    arabic: 'تفسير',
    transliteration: 'Tafsir',
    english: 'Exegesis',
    scale: 'cross-cutting',
    difficulty: 'start-here',
    tagline: 'The scholarly discipline of explaining what the Quran means.',
    description: [
      'Tafsir comes from a root meaning "to uncover" or "to clarify." It is what scholars do when they explain what a verse means — intellectual, disciplined, grounded in evidence. Tafsir is the foundation of every other Quranic science: without it, there is no reliable basis for understanding.',
      'There are two broad categories. Tafsir bil-Riwayah (narration-based) explains the Quran through the Quran itself, authentic hadith, or the understanding of the Companions. Tafsir bil-Dirayah (reason-based) uses linguistic analysis and logical reasoning — but only when it does not contradict the transmitted tradition.',
      'Scholars established a clear hierarchy: the Quran explains itself first, then the Sunnah, then the understanding of the Sahabah, then the Tabi\'un, then the Arabic language, then sound scholarly reasoning. Knowing this order helps you read any tafsir with greater appreciation — and helps you spot when an interpretation is well-grounded versus speculative.',
    ],
    ayahExample: {
      // [ayah:4:82]
      ref: '4:82',
      arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ ٱللَّهِ لَوَجَدُوا۟ فِيهِ ٱخْتِلَـٰفًا كَثِيرًا',
      translation:
        'Do they not reflect deeply on the Quran? Had it been from other than Allah, they would have found in it much contradiction.',
      analysis:
        'This verse is both a command to engage with the Quran (yatadabbarun — from the root of tadabbur) and an argument for its divine origin: the absence of internal contradiction is evidence of a single, perfect Author. Tafsir as a discipline exists to fulfill this command with rigor.',
    },
    glossarySlug: 'tafsir',
    relatedSciences: ['usool-al-tafsir', 'asbab-al-nuzul'],
  },

  {
    id: 'tajwid',
    arabic: 'تجويد',
    transliteration: 'Tajwid',
    english: 'Recitation Rules',
    scale: 'cross-cutting',
    difficulty: 'start-here',
    tagline: 'The science of giving every letter its right.',
    description: [
      'Tajwid comes from the root j-w-d, meaning "to beautify" or "to make excellent." It is the science of reciting the Quran exactly as it was revealed — with proper pronunciation, articulation points (makharij), and characteristics (sifat) for each letter. It is the most widely practiced of all Quranic sciences.',
      'Tajwid is not merely about sounding beautiful. Mispronouncing a letter can change the meaning of a word. The difference between the letters \'s\' (sin) and \'s\' (sad) — a subtle distinction in articulation point — can be the difference between two entirely different words. Tajwid protects the text from corruption through careless recitation.',
      'Rules include when to extend a vowel (madd), when to merge two letters (idgham), when to nasalize (ghunnah), and where to pause and resume (waqf and ibtida). Learning tajwid is considered a communal obligation (fard kifayah) — and many scholars hold that a basic level is individually obligatory for every Muslim who recites the Quran.',
    ],
    ayahExample: {
      // [ayah:73:4]
      ref: '73:4',
      arabic: 'وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا',
      translation: 'And recite the Quran with measured recitation.',
      analysis:
        'The command "rattil" (recite with tartil) uses a verb form that means careful, measured, deliberate arrangement — not rushed, not careless. The cognate accusative "tartila" (an absolute object repeating the root) intensifies the command: recite it with real recitation. This verse is the Quranic basis for the entire science of tajwid.',
    },
    relatedSciences: ['qiraat', 'tafsir'],
  },

  {
    id: 'qiraat',
    arabic: 'قراءات',
    transliteration: 'Ilm al-Qira\'at',
    english: 'Recitation Methodologies',
    scale: 'cross-cutting',
    difficulty: 'advanced',
    tagline: 'Seven readers, ten transmissions, one Quran.',
    description: [
      'The Quran was transmitted through several slightly different recitation traditions, each going back to the Prophet ﷺ himself through unbroken chains of transmission. These are not errors or disagreements — they are all equally the Quran, preserved as complementary readings that enrich understanding.',
      'The seven canonical readers (qurra\') — including Nafi\' of Madinah, Ibn Kathir of Makkah, and Hafs and Warsh (transmitters of \'Asim\'s reading) — each transmitted a slightly different recitation. Sometimes a variation shifts a grammatical form and opens a new layer of meaning. In one reading of Al-Fatiha, "Maliki yawm al-din" means "Master of the Day of Judgment"; another reads "Maliki" as "King." Both are true — Allah is both.',
      'Most of the Muslim world today recites in the Hafs transmission of \'Asim\'s reading. But when a tafsir mentions "another reading says..." it refers to one of these canonical qira\'at — and exploring the variation often reveals a deeper layer of the verse\'s meaning.',
    ],
    ayahExample: {
      // [ayah:1:4]
      ref: '1:4',
      arabic: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
      translation: 'Master of the Day of Judgment.',
      analysis:
        'In the Hafs reading: Maliki (مَـٰلِكِ) — "Master/Owner" of the Day of Judgment, emphasizing ownership and authority. In the Warsh reading: Maliki (مَلِكِ) — "King" of the Day of Judgment, emphasizing sovereignty and dominion. Both are authentic, both traced to the Prophet ﷺ, and both are true: Allah is both Owner and King. The variation is not a conflict but a complementary revelation.',
      surahLink: '/surahs/al-fatiha',
      surahName: 'Al-Fatiha',
    },
    relatedSciences: ['tajwid', 'tafsir'],
  },

  {
    id: 'nasikh-mansukh',
    arabic: 'ناسخ ومنسوخ',
    transliteration: 'Nasikh wa al-Mansukh',
    english: 'Abrogation',
    scale: 'cross-cutting',
    difficulty: 'advanced',
    tagline: 'How God\'s guidance unfolded in stages.',
    description: [
      'Nasikh wa al-Mansukh is the science of understanding which verses supersede or modify the rulings of earlier verses. The Quran itself establishes this principle: "We do not abrogate a verse or cause it to be forgotten except that We bring forth one better than it or similar to it" (2:106). Abrogation reflects the gradual, pedagogical nature of revelation.',
      'The most well-known example is the prohibition of alcohol, which came in three stages: first a subtle discouragement (2:219 — "In them is great sin and some benefit"), then a restriction (4:43 — "Do not approach prayer while intoxicated"), then a complete prohibition (5:90 — "Avoid it"). Each stage met the community where it was, building toward the final ruling.',
      'This science is critical for anyone reading legal verses. Without understanding abrogation, you might apply an earlier, superseded ruling instead of the final one. Scholars carefully documented which verses abrogate which — and many apparent "contradictions" in the Quran are actually stages of a graduated revelation.',
    ],
    ayahExample: {
      // [ayah:2:106]
      ref: '2:106',
      arabic: 'مَا نَنسَخْ مِنْ ءَايَةٍ أَوْ نُنسِهَا نَأْتِ بِخَيْرٍ مِّنْهَآ أَوْ مِثْلِهَآ',
      translation:
        'We do not abrogate a verse or cause it to be forgotten except that We bring forth one better than it or similar to it.',
      analysis:
        'The Quran establishes its own principle of graduated revelation. The word nansakh (we abrogate) shares the root with nuskha (copy) — the original is not destroyed but superseded by something better suited to the community\'s stage of growth. Abrogation is not contradiction; it is divine pedagogy.',
    },
    relatedSciences: ['usool-al-tafsir', 'makki-madani'],
  },

  {
    id: 'usool-al-tafsir',
    arabic: 'أصول التفسير',
    transliteration: 'Usool al-Tafsir',
    english: 'Principles of Exegesis',
    scale: 'cross-cutting',
    difficulty: 'advanced',
    tagline: 'The rules that keep interpretation honest.',
    description: [
      'Usool al-Tafsir is the methodology behind the methodology — the rules and principles that scholars follow to arrive at a sound interpretation of the Quran. If tafsir is the product, usool al-tafsir is the quality control system that ensures the product is reliable.',
      'The core principles include: the Quran interprets itself first (verses clarify other verses); the Sunnah is the primary external source; the understanding of the Companions carries special authority because they witnessed the revelation; and linguistic analysis must be grounded in classical Arabic usage, not modern connotation.',
      'Understanding usool al-tafsir is what allows you to evaluate competing interpretations. When two scholars disagree on a verse\'s meaning, knowing the principles helps you assess: is one using a stronger source? Is one relying on a linguistic argument that the other grounds in hadith? It is the science that keeps all other sciences accountable.',
    ],
    ayahExample: {
      // [ayah:4:82]
      ref: '4:82',
      arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ',
      translation: 'Do they not reflect deeply on the Quran?',
      analysis:
        'The command to reflect (tadabbur) is itself governed by methodology. Reflection without principles risks becoming projection — finding in the text what you brought to it rather than what Allah placed in it. Usool al-Tafsir is the discipline that ensures tadabbur stays grounded: it provides the hierarchy of sources, the rules of evidence, and the boundaries of legitimate interpretation.',
    },
    relatedSciences: ['tafsir', 'nasikh-mansukh', 'muhkamat-mutashabihat'],
  },

  {
    id: 'asbab-al-nuzul',
    arabic: 'أسباب النزول',
    transliteration: 'Asbab al-Nuzul',
    english: 'Occasions of Revelation',
    scale: 'cross-cutting',
    difficulty: 'start-here',
    tagline: 'The stories behind the verses.',
    description: [
      'Almost every major verse or passage has a historical context — an event, a question, a crisis that prompted its revelation. Knowing that context does not trap the verse in the past; it illuminates the logic of the verse and reveals why it was worded the way it was.',
      'For example, when a man asked the Prophet ﷺ whether he could eat while dawn was approaching during Ramadan, the verse "Eat and drink until the white thread of dawn becomes distinct from the black thread" (2:187) was revealed. Without the sabab (occasion), you might miss the intimacy of a revelation that responds to a real person\'s real question.',
      'Scholars carefully documented the chains of narration for each sabab al-nuzul, applying the same rigor as hadith verification. A sound sabab can completely change how you read a verse — which is why this science is often the first tool a reader picks up after translation.',
    ],
    ayahExample: {
      // [ayah:2:187]
      ref: '2:187',
      arabic: 'وَكُلُوا۟ وَٱشْرَبُوا۟ حَتَّىٰ يَتَبَيَّنَ لَكُمُ ٱلْخَيْطُ ٱلْأَبْيَضُ مِنَ ٱلْخَيْطِ ٱلْأَسْوَدِ مِنَ ٱلْفَجْرِ',
      translation:
        'Eat and drink until the white thread of dawn becomes distinct to you from the black thread.',
      analysis:
        'A Companion tied a white thread and a black thread to his ankle, eating until he could distinguish them — then learned the verse meant the light of dawn against the darkness of night. The sabab al-nuzul shows how revelation met real people in real moments, answering genuine confusion with timeless clarity. The verse is universal; the story makes it human.',
    },
    glossarySlug: 'asbab-al-nuzul',
    relatedSciences: ['tafsir', 'makki-madani'],
  },

  {
    id: 'aqeedah',
    arabic: 'عقيدة',
    transliteration: 'Aqeedah',
    english: 'Theology & Core Beliefs',
    scale: 'cross-cutting',
    difficulty: 'start-here',
    tagline: 'The beliefs the Quran is building in you.',
    description: [
      'Aqeedah refers to the foundational theological principles that the Quran establishes: Tawhid (the absolute oneness of God), prophethood (risalah), the angels, the revealed books, the Day of Judgment, and divine decree (qadr). These are not peripheral topics — they are the architecture that holds the entire Quran together.',
      'Every surah, regardless of its specific subject matter, is building or reinforcing aqeedah. When the Quran tells the story of Musa, it is teaching tawhid. When it describes Paradise, it is teaching accountability. When it addresses the Prophet ﷺ, it is modeling the relationship between God and His messenger. Aqeedah is the lens through which every other topic becomes coherent.',
      'Understanding the Quran\'s theological framework prevents two common errors: reading legal verses without understanding the spiritual foundations beneath them, and reading spiritual verses without appreciating the concrete obligations they entail.',
    ],
    ayahExample: {
      // [ayah:112:1]
      ref: '112:1',
      arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
      translation: 'Say: He is Allah, the One.',
      analysis:
        'Four verses that compress the entire theology of Tawhid into a structure so precise it has been called "one-third of the Quran" by the Prophet ﷺ himself. The word Ahad (One) is not the same as wahid (one in number) — it means uniquely, absolutely, incomparably One. The whole surah is a theological axiom from which everything else follows.',
    },
    relatedSciences: ['muhkamat-mutashabihat', 'tafsir'],
  },
]

// ── Lens Questions ────────────────────────────────────────────────────────────

export const LENS_QUESTIONS: LensQuestion[] = [
  {
    question: 'Why was this specific word chosen instead of a synonym?',
    scienceIds: ['lughah', 'sarf', 'balaghah'],
    explanation:
      'Arabic synonyms almost never mean the same thing. Linguistics (lughah) tells you the precise shade; morphology (sarf) tells you the form\'s meaning; rhetoric (balaghah) tells you why this form in this context.',
  },
  {
    question: 'A verse seems to contradict another verse.',
    scienceIds: ['nasikh-mansukh', 'muhkamat-mutashabihat', 'usool-al-tafsir'],
    explanation:
      'It may be abrogation (graduated revelation), a clear vs. ambiguous verse distinction, or a misreading that proper methodology resolves.',
  },
  {
    question: 'Why does the topic suddenly change mid-surah?',
    scienceIds: ['nazm', 'munasabat'],
    explanation:
      'It probably doesn\'t. Nazm reveals the hidden logical thread between sections; the topic only appears to change because the surah\'s central thesis is being examined from a new angle.',
  },
  {
    question: 'Why was this verse revealed?',
    scienceIds: ['asbab-al-nuzul', 'makki-madani'],
    explanation:
      'The occasion of revelation tells you the specific context; the Makki/Madani distinction tells you the broad historical period and audience.',
  },
  {
    question: 'What makes the Quran\'s Arabic impossible to replicate?',
    scienceIds: ['ijaz', 'balaghah', 'nazm'],
    explanation:
      'I\'jaz is the macro phenomenon; balaghah shows the sentence-level precision; nazm shows the structural coherence. Together they make the case.',
  },
  {
    question: 'How do I know if I\'m interpreting a verse correctly?',
    scienceIds: ['usool-al-tafsir', 'tafsir', 'muhkamat-mutashabihat'],
    explanation:
      'The principles of exegesis give you the rules; tafsir gives you the scholarly tradition; the clear/ambiguous distinction tells you how much certainty is possible.',
  },
  {
    question: 'Why is the same story told differently in different surahs?',
    scienceIds: ['qasas', 'nazm', 'makki-madani'],
    explanation:
      'Each retelling serves the surah it appears in. The narrative lens changes because the surah\'s thesis requires a different aspect of the story.',
  },
  {
    question: 'Why does the grammar feel unusual in this verse?',
    scienceIds: ['nahw', 'balaghah', 'sarf'],
    explanation:
      'Unusual grammar in the Quran is almost always deliberate — fronted words, emphatic particles, unexpected verb forms. The grammar is doing the theology.',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: 'Do I need to master all these sciences to understand the Quran?',
    answer:
      'No. These sciences exist on a spectrum from accessible to advanced. Start with the "Start Here" sciences — Makki/Madani, Asbab al-Nuzul, Qasas, and basic Tafsir — which require no Arabic and immediately deepen your reading. As you grow, you can move into the "Go Deeper" and "Advanced" sciences. Even scholars specialize; no one masters all of them equally.',
  },
  {
    question: 'How is this page different from the "Understanding Quran" guide?',
    answer:
      'The Understanding Quran guide is a practical "how to read" companion — it teaches you how to approach a surah or an ayah with depth. This page is a taxonomy — a complete map of the scholarly disciplines that have been developed over 1,400 years to study the Quran. Think of it as: that page teaches you to drive; this page shows you how the engine works.',
  },
  {
    question: 'Which science should I learn first?',
    answer:
      'Start with Asbab al-Nuzul (Occasions of Revelation) — it requires no Arabic and immediately makes verses come alive. Then learn the Makki/Madani distinction, which changes how you hear every surah. After that, basic Tajwid will transform your recitation. From there, follow your curiosity.',
  },
  {
    question: 'Can I learn these without knowing Arabic?',
    answer:
      'Many of these sciences are accessible without Arabic: Asbab al-Nuzul, Makki/Madani, Qasas, Amthal, Aqeedah, and Nasikh/Mansukh can all be studied through good English tafsir and scholarship. However, Sarf, Nahw, Balaghah, and I\'jaz require progressively deeper Arabic knowledge to fully appreciate — these are the sciences where the language itself is the subject.',
  },
  {
    question: 'Where can I see these sciences applied to actual surahs?',
    answer:
      'Every surah reflection on AyahGuide applies multiple sciences — the Surah Map gives you access to all 114. The Understanding Quran guide shows you how to use the tools. And the Glossary provides deeper definitions of key terms with real Quranic examples.',
  },
]
