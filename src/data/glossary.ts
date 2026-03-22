// ── Glossary data ─────────────────────────────────────────────────────────────
// Each GlossaryMeta entry powers the index cards.
// Full GlossaryEntry records power individual /glossary/[slug] pages.
// Only terms with a full entry can be navigated to — others show "coming soon."

export type GlossaryCategory =
  | 'States of the Heart'
  | 'The Unseen'
  | 'Quranic Characters'
  | 'Nations & Peoples'
  | 'Study Terms'

export interface GlossaryMeta {
  slug: string
  term: string          // Arabic with full diacritics
  transliteration: string
  category: GlossaryCategory
  evocativeLine: string // one-line teaser
  hasFullEntry: boolean
}

export interface KeyAyah {
  ref: string           // e.g. "2:222"
  arabic: string        // the relevant portion of the ayah
  translation: string
  note: string          // why this ayah is the right one
}

export interface ScholarNote {
  scholar: string
  text: string
  source?: string
}

export interface RelatedTerm {
  slug: string
  transliteration: string
  term: string          // Arabic
}

export interface GoDeeperLink {
  slug: string          // surah slug
  surahName: string
  note: string
}

export interface GlossaryEntry extends GlossaryMeta {
  pronunciation: string // e.g. "taw-bah (TAW rhymes with 'law')"
  summary: string       // 2–3 sentences, plain English
  root: {
    letters: string        // ت-و-ب
    transliteration: string // tā-wāw-bā
    meaning: string         // core semantic field
    elaboration: string     // how the root illuminates the concept
  }
  occurrenceCount: number   // verified via Quran corpus
  occurrenceNote: string    // what exactly was counted
  keyAyahs: KeyAyah[]
  scholarsSaid: ScholarNote[]
  hadith?: { text: string; source: string }[]
  acrossTransitions: string // rich text (newlines = paragraphs)
  relatedTerms: RelatedTerm[]
  goDeeper: GoDeeperLink[]
}

// ── Index catalogue ───────────────────────────────────────────────────────────

export const GLOSSARY_TERMS: GlossaryMeta[] = [
  // States of the Heart
  { slug: 'tawbah',    term: 'تَوْبَة',      transliteration: 'Tawbah',    category: 'States of the Heart', evocativeLine: 'The act of turning back — not just regret, but return.',         hasFullEntry: true  },
  { slug: 'sabr',      term: 'صَبْر',        transliteration: 'Sabr',      category: 'States of the Heart', evocativeLine: 'Patient endurance that holds firm without losing hope.',           hasFullEntry: false },
  { slug: 'tawakkul',  term: 'تَوَكُّل',     transliteration: 'Tawakkul',  category: 'States of the Heart', evocativeLine: 'Complete reliance on Allah — after you have tied your camel.',     hasFullEntry: false },
  { slug: 'khushu',    term: 'خُشُوع',       transliteration: "Khushu'",   category: 'States of the Heart', evocativeLine: 'The trembling stillness of the heart in the presence of the Real.', hasFullEntry: false },
  { slug: 'shukr',     term: 'شُكْر',        transliteration: 'Shukr',     category: 'States of the Heart', evocativeLine: 'Gratitude that moves from tongue to heart to action.',               hasFullEntry: false },
  { slug: 'nadam',     term: 'نَدَم',        transliteration: 'Nadam',     category: 'States of the Heart', evocativeLine: 'The remorse that precedes returning — the ache before the turn.',   hasFullEntry: false },

  // The Unseen
  { slug: 'barzakh',   term: 'بَرْزَخ',      transliteration: 'Barzakh',   category: 'The Unseen',          evocativeLine: 'The barrier between two worlds — where the departed now dwell.',     hasFullEntry: false },
  { slug: 'mizan',     term: 'مِيزَان',      transliteration: 'Mizan',     category: 'The Unseen',          evocativeLine: 'The scale on which deeds weigh more than mountains.',                hasFullEntry: false },
  { slug: 'jannah',    term: 'جَنَّة',       transliteration: 'Jannah',    category: 'The Unseen',          evocativeLine: 'The garden — a word that carries moisture, shade, and promise.',     hasFullEntry: false },
  { slug: 'jahannam',  term: 'جَهَنَّم',     transliteration: 'Jahannam',  category: 'The Unseen',          evocativeLine: 'The fire whose true nature is beyond imagination.',                   hasFullEntry: false },
  { slug: 'al-ghayb',  term: 'ٱلْغَيْب',     transliteration: 'Al-Ghayb', category: 'The Unseen',          evocativeLine: 'The unseen realm — the first quality the Quran asks us to believe in.', hasFullEntry: false },

  // Quranic Characters
  { slug: 'maryam',         term: 'مَرْيَم',       transliteration: 'Maryam',        category: 'Quranic Characters', evocativeLine: 'The only woman named by name in the Quran — and her own surah.',    hasFullEntry: false },
  { slug: 'luqman',         term: 'لُقْمَان',      transliteration: 'Luqman',        category: 'Quranic Characters', evocativeLine: 'The wise man who taught his son by talking, not commanding.',       hasFullEntry: false },
  { slug: 'dhul-qarnayn',   term: 'ذُو ٱلْقَرْنَيْن', transliteration: "Dhul-Qarnayn", category: 'Quranic Characters', evocativeLine: 'The one of two epochs — a sovereign who served rather than ruled.', hasFullEntry: false },
  { slug: 'ayyub',          term: 'أَيُّوب',       transliteration: 'Ayyub',         category: 'Quranic Characters', evocativeLine: "Affliction beyond measure — and a faith that didn't flinch.",         hasFullEntry: false },

  // Nations & Peoples
  { slug: 'ad',             term: 'عَاد',           transliteration: "'Ad",           category: "Nations & Peoples",  evocativeLine: "The people of the wind — destroyed by the very air they breathed.",  hasFullEntry: false },
  { slug: 'thamud',         term: 'ثَمُود',         transliteration: 'Thamud',        category: "Nations & Peoples",  evocativeLine: 'They carved mountains for homes and still could not find safety.',    hasFullEntry: false },
  { slug: 'bani-isra-il',   term: 'بَنُو إِسْرَائِيل', transliteration: "Bani Isra'il", category: "Nations & Peoples",  evocativeLine: "The people of a thousand stories — struggle, covenant, and mercy.",  hasFullEntry: false },
  { slug: 'ashab-al-kahf',  term: 'أَصْحَاب ٱلْكَهْف', transliteration: 'Ashab al-Kahf', category: "Nations & Peoples", evocativeLine: 'Young men who chose a cave over a kingdom.',                         hasFullEntry: false },

  // Study Terms
  { slug: 'tafsir',    term: 'تَفْسِير',     transliteration: 'Tafsir',    category: 'Study Terms', evocativeLine: 'The science of uncovering what the Quran means — layer by layer.',   hasFullEntry: false },
  { slug: 'tadabbur',  term: 'تَدَبُّر',     transliteration: 'Tadabbur',  category: 'Study Terms', evocativeLine: "To ponder deeply — the Quran's own word for how it wants to be read.", hasFullEntry: false },
  { slug: 'nazm',      term: 'نَظْم',        transliteration: 'Nazm',      category: 'Study Terms', evocativeLine: 'The hidden architecture of the Quran — the coherence beneath the surface.', hasFullEntry: false },
  { slug: 'ijaz',      term: 'إِعْجَاز',     transliteration: "I'jaz",     category: 'Study Terms', evocativeLine: "The Quran's inimitability — the challenge that has never been met.",    hasFullEntry: false },
  { slug: 'asbab-al-nuzul', term: 'أَسْبَاب ٱلنُّزُول', transliteration: 'Asbab al-Nuzul', category: 'Study Terms', evocativeLine: 'The occasions of revelation — the moments that gave the verses their first breath.', hasFullEntry: false },
]

// ── Full entries ──────────────────────────────────────────────────────────────

export const GLOSSARY_ENTRIES: Record<string, GlossaryEntry> = {
  tawbah: {
    slug: 'tawbah',
    term: 'تَوْبَة',
    transliteration: 'Tawbah',
    pronunciation: "taw-bah (TAW rhymes with 'law'; stress on the first syllable)",
    category: 'States of the Heart',
    evocativeLine: 'The act of turning back — not just regret, but return.',
    hasFullEntry: true,

    summary:
      "Tawbah is often translated as 'repentance,' but that word does not carry the full weight of the Arabic. The root means to turn — specifically, to turn back toward something you have moved away from. In Islamic theology, tawbah is not primarily an emotion but an action: a reorientation. You were facing away from Allah. Now you face Him again. The door, the Quran insists again and again, is always open.",

    root: {
      letters: 'ت-و-ب',
      transliteration: 'tā-wāw-bā',
      meaning: 'To return, to come back, to turn toward',
      elaboration:
        "The root ت-و-ب carries directionality at its core. It is not about feeling bad — nadam (نَدَم) is the word for that. Tawbah is the movement that follows the feeling. This is theologically decisive: a Muslim who is overcome with remorse but does not actually return has not yet made tawbah. Conversely, the Quran uses the same root for Allah — هُوَ ٱلتَّوَّابُ, 'He is the Ever-Turning' — meaning Allah is the One who turns toward His servant before the servant has fully turned. The root thus describes a meeting in motion: both the human and the Divine are in the act of turning toward each other.",
    },

    // Root ت-و-ب appears ~87 times across verb and noun forms.
    // The specific noun تَوْبَة (tawbah) appears 17 times.
    occurrenceCount: 87,
    occurrenceNote:
      'All forms of the root ت-و-ب (verb tāba, noun tawbah, intensive tawwāb) across the Quran. The noun tawbah itself appears 17 times; an entire surah (At-Tawbah, ch. 9) takes its name from it.',

    keyAyahs: [
      {
        ref: '2:222',
        arabic:
          'إِنَّ ٱللَّهَ يُحِبُّ ٱلتَّوَّٰبِينَ وَيُحِبُّ ٱلْمُتَطَهِّرِينَ',
        translation:
          'Indeed, Allah loves those who constantly return to Him, and He loves those who purify themselves.',
        note:
          "This verse links tawbah with love — not just forgiveness, but love. The word is التَّوَّابِين: not those who repented once, but those who are characterized by their returning. It reframes the entire concept: tawbah is not a crisis response but a way of being. The coupling with purification (tahārah) shows that returning to Allah is both spiritual and embodied.",
      },
      {
        ref: '9:104',
        arabic:
          'أَلَمْ يَعْلَمُوٓا۟ أَنَّ ٱللَّهَ هُوَ يَقْبَلُ ٱلتَّوْبَةَ عَنْ عِبَادِهِۦ وَيَأْخُذُ ٱلصَّدَقَٰتِ وَأَنَّ ٱللَّهَ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ',
        translation:
          'Do they not know that it is Allah — He Himself — who accepts repentance from His servants and receives their charities, and that it is Allah who is the Ever-Accepting of Return, the Merciful?',
        note:
          "The emphasis here is grammatical and theological: هُوَ — 'He Himself' — makes it exclusive. No intermediary, no priest, no community required. The act is directly between servant and Lord. That this surah is named At-Tawbah (The Repentance) despite covering political and military events shows how foundational this concept is to the Quran's moral architecture.",
      },
      {
        ref: '39:53',
        arabic:
          'قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ',
        translation:
          "Say: 'O My servants who have transgressed against themselves — do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
        note:
          "This is the Quran at its most direct. The address is remarkable: يَٰعِبَادِىَ — 'O My servants' — Allah claims them even in their transgression. The command is not 'come to Me if your sins are small'; it is جَمِيعًا, 'all sins,' with no qualifier. The scholars have said this is the most expansive verse of hope in the entire Quran. Despair — قنوط — is named as the thing to resist, because despair is what keeps people from turning.",
      },
    ],

    scholarsSaid: [
      {
        scholar: 'Ibn al-Qayyim al-Jawziyyah',
        text:
          "Tawbah has a beginning and an end. Its beginning is knowledge of the sin and its ugliness, then remorse over it, then the firm resolve never to return to it. Its end is when the heart is entirely stripped of the desire for that sin, such that the soul does not even incline toward it. That is true tawbah — and the distance between them is the journey of a lifetime.",
        source: 'Madārij al-Sālikīn',
      },
      {
        scholar: 'Al-Ghazali',
        text:
          "Repentance (tawbah) is the beginning of the path to Allah, its middle, and its end. For the traveler never ceases to repent — not because he is always sinning, but because with every increase in closeness he sees more clearly what he was blind to before, and repents from the veils he did not even know were there.",
        source: 'Iḥyāʾ ʿUlūm al-Dīn',
      },
      {
        scholar: 'Ibn Rajab al-Hanbali',
        text:
          'The scholars have defined valid tawbah as requiring three conditions: ceasing the sin immediately, feeling remorse for having done it, and firmly resolving not to return. If the sin involved the rights of another person, a fourth condition applies: restoring those rights or seeking their pardon.',
        source: "Jāmiʿ al-ʿUlūm wa-l-Ḥikam",
      },
    ],

    hadith: [
      {
        text:
          "Allah is more delighted by the repentance of His servant than one of you would be if he lost his riding beast carrying his food and drink in a barren land, then found it again.",
        source: 'Sahih Muslim, 2747',
      },
      {
        text:
          "Allah extends His hand at night so that those who sinned by day may repent, and He extends His hand by day so that those who sinned by night may repent — until the sun rises from the West.",
        source: 'Sahih Muslim, 2759',
      },
    ],

    acrossTransitions:
      `Most religious traditions recognize something like repentance — the acknowledgment of wrongdoing and a desire to be reconciled. What makes tawbah distinctive is its emphasis on movement over emotion.

In Christian theology, repentance (metanoia in Greek) similarly means a change of mind, a turning. In Catholic tradition, the sacrament of confession formalizes this as a structured rite requiring a priest as mediator. The Islamic understanding removes the intermediary entirely: the door is always open, and you walk through it yourself.

Judaism's teshuva (תְּשׁוּבָה) is linguistically and conceptually the closest parallel — it also means "return," and Jewish law similarly requires ceasing the wrong, remorse, verbal acknowledgment, and firm resolve. The parallels here suggest a shared Abrahamic understanding of what human accountability before God looks like. What differs in the Islamic formulation is the theological emphasis on Divine initiative: in the Quran, Allah is Al-Tawwāb — the One who is perpetually turning toward His servants — before and beyond any turning the servant makes.

What is distinctively Quranic is the insistence that there is no sin beyond the scope of tawbah, no person too far gone. The verse 39:53 is directed explicitly at those who have "transgressed against themselves" — a category deliberately without a ceiling. This is not minimizing sin; it is maximizing mercy. The Quran holds both realities simultaneously, and the conceptual space between them is where tawbah lives.`,

    relatedTerms: [
      { slug: 'nadam',     transliteration: 'Nadam',      term: 'نَدَم'    },
      { slug: 'sabr',      transliteration: 'Sabr',       term: 'صَبْر'    },
      { slug: 'tawakkul',  transliteration: 'Tawakkul',   term: 'تَوَكُّل' },
    ],

    goDeeper: [
      {
        slug: 'al-baqarah',
        surahName: 'Al-Baqarah',
        note: "The Quran's longest surah opens the extended discussion of those who turn — and those who refuse to.",
      },
      {
        slug: 'at-tawbah',
        surahName: 'At-Tawbah',
        note: "Named for this concept itself — and notable for being the only surah that does not begin with Bismillah.",
      },
      {
        slug: 'az-zumar',
        surahName: 'Az-Zumar',
        note: 'Contains 39:53, one of the most hope-filled verses in the entire Quran.',
      },
    ],
  },
}
