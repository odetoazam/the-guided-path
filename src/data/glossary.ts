// ── Glossary data ─────────────────────────────────────────────────────────────

export type GlossaryCategory =
  | 'States of the Heart'
  | 'The Unseen'
  | 'Quranic Characters'
  | 'Nations & Peoples'
  | 'Study Terms'

export interface GlossaryMeta {
  slug: string
  term: string
  transliteration: string
  category: GlossaryCategory
  evocativeLine: string
  hasFullEntry: boolean
}

export interface KeyAyah {
  ref: string
  arabic: string
  translation: string
  note: string
}

export interface ScholarNote {
  scholar: string
  text: string
  source?: string
}

// ── New richer interfaces ──────────────────────────────────────────────────────

export interface RootForm {
  arabic: string
  transliteration: string
  /** Grammatical type: "Verb (perfect)", "Verbal noun", "Divine Name", etc. */
  type: string
  meaning: string
  /** Approximate occurrences — flag for corpus verification */
  approxCount: number
  verified: boolean
}

export type SemanticRelationship =
  | 'precedes'
  | 'parallels'
  | 'deepens'
  | 'divine-response'
  | 'intensifies'

export interface SemanticConnection {
  slug: string
  arabic: string
  transliteration: string
  relationship: SemanticRelationship
  /** Short human-readable label, e.g. "Precedes — the emotion that moves you to act" */
  relationshipLabel: string
  description: string
}

export interface Condition {
  number: number
  title: string
  arabic: string
  arabicTranslit: string
  description: string
}

export interface SpiritualStation {
  name: string
  description: string
}

export interface PracticalQA {
  question: string
  answer: string
}

export interface PracticalSection {
  conditions: Condition[]
  stations: SpiritualStation[]
  questions: PracticalQA[]
}

export interface RelatedTerm {
  slug: string
  transliteration: string
  term: string
}

export interface GoDeeperLink {
  slug: string
  surahName: string
  note: string
}

export interface GlossaryEntry extends GlossaryMeta {
  pronunciation: string
  summary: string
  root: {
    letters: string
    transliteration: string
    meaning: string
    elaboration: string
  }
  occurrenceCount: number
  occurrenceNote: string
  /** Derived word-forms of this root across the Quran */
  rootForms?: RootForm[]
  keyAyahs: KeyAyah[]
  scholarsSaid: ScholarNote[]
  hadith?: { text: string; source: string }[]
  acrossTransitions: string
  /** Semantic constellation — how this term connects to neighbouring concepts */
  semanticField?: SemanticConnection[]
  practicalSection?: PracticalSection
  relatedTerms: RelatedTerm[]
  goDeeper: GoDeeperLink[]
}

// ── Index catalogue ───────────────────────────────────────────────────────────

export const GLOSSARY_TERMS: GlossaryMeta[] = [
  // States of the Heart
  { slug: 'tawbah',    term: 'تَوْبَة',          transliteration: 'Tawbah',       category: 'States of the Heart', evocativeLine: 'The act of turning back — not just regret, but return.',              hasFullEntry: true  },
  { slug: 'sabr',      term: 'صَبْر',            transliteration: 'Sabr',         category: 'States of the Heart', evocativeLine: 'Patient endurance that holds firm without losing hope.',              hasFullEntry: false },
  { slug: 'tawakkul',  term: 'تَوَكُّل',         transliteration: 'Tawakkul',     category: 'States of the Heart', evocativeLine: 'Complete reliance on Allah — after you have tied your camel.',        hasFullEntry: false },
  { slug: 'khushu',    term: 'خُشُوع',           transliteration: "Khushu'",      category: 'States of the Heart', evocativeLine: 'The trembling stillness of the heart in the presence of the Real.',   hasFullEntry: false },
  { slug: 'shukr',     term: 'شُكْر',            transliteration: 'Shukr',        category: 'States of the Heart', evocativeLine: 'Gratitude that moves from tongue to heart to action.',                 hasFullEntry: false },
  { slug: 'nadam',     term: 'نَدَم',            transliteration: 'Nadam',        category: 'States of the Heart', evocativeLine: 'The remorse that precedes returning — the ache before the turn.',     hasFullEntry: false },

  // The Unseen
  { slug: 'barzakh',   term: 'بَرْزَخ',          transliteration: 'Barzakh',      category: 'The Unseen',          evocativeLine: 'The barrier between two worlds — where the departed now dwell.',       hasFullEntry: false },
  { slug: 'mizan',     term: 'مِيزَان',          transliteration: 'Mizan',        category: 'The Unseen',          evocativeLine: 'The scale on which deeds weigh more than mountains.',                  hasFullEntry: false },
  { slug: 'jannah',    term: 'جَنَّة',           transliteration: 'Jannah',       category: 'The Unseen',          evocativeLine: 'The garden — a word that carries moisture, shade, and promise.',       hasFullEntry: false },
  { slug: 'jahannam',  term: 'جَهَنَّم',         transliteration: 'Jahannam',     category: 'The Unseen',          evocativeLine: 'The fire whose true nature is beyond imagination.',                     hasFullEntry: false },
  { slug: 'al-ghayb',  term: 'ٱلْغَيْب',         transliteration: 'Al-Ghayb',    category: 'The Unseen',          evocativeLine: 'The unseen realm — the first quality the Quran asks us to believe in.',  hasFullEntry: false },

  // Quranic Characters
  { slug: 'maryam',          term: 'مَرْيَم',           transliteration: 'Maryam',        category: 'Quranic Characters', evocativeLine: 'The only woman named by name in the Quran — and her own surah.',      hasFullEntry: false },
  { slug: 'luqman',          term: 'لُقْمَان',          transliteration: 'Luqman',        category: 'Quranic Characters', evocativeLine: 'The wise man who taught his son by talking, not commanding.',         hasFullEntry: false },
  { slug: 'dhul-qarnayn',    term: 'ذُو ٱلْقَرْنَيْن', transliteration: "Dhul-Qarnayn",  category: 'Quranic Characters', evocativeLine: 'The one of two epochs — a sovereign who served rather than ruled.',    hasFullEntry: false },
  { slug: 'ayyub',           term: 'أَيُّوب',           transliteration: 'Ayyub',         category: 'Quranic Characters', evocativeLine: "Affliction beyond measure — and a faith that didn't flinch.",          hasFullEntry: false },

  // Nations & Peoples
  { slug: 'ad',              term: 'عَاد',               transliteration: "'Ad",           category: "Nations & Peoples",  evocativeLine: "The people of the wind — destroyed by the very air they breathed.",   hasFullEntry: false },
  { slug: 'thamud',          term: 'ثَمُود',             transliteration: 'Thamud',        category: "Nations & Peoples",  evocativeLine: 'They carved mountains for homes and still could not find safety.',     hasFullEntry: false },
  { slug: 'bani-isra-il',    term: 'بَنُو إِسْرَائِيل', transliteration: "Bani Isra'il",  category: "Nations & Peoples",  evocativeLine: "The people of a thousand stories — struggle, covenant, and mercy.",   hasFullEntry: false },
  { slug: 'ashab-al-kahf',   term: 'أَصْحَاب ٱلْكَهْف', transliteration: 'Ashab al-Kahf', category: "Nations & Peoples",  evocativeLine: 'Young men who chose a cave over a kingdom.',                          hasFullEntry: false },

  // Study Terms
  { slug: 'tafsir',          term: 'تَفْسِير',           transliteration: 'Tafsir',        category: 'Study Terms', evocativeLine: 'The science of uncovering what the Quran means — layer by layer.',     hasFullEntry: false },
  { slug: 'tadabbur',        term: 'تَدَبُّر',           transliteration: 'Tadabbur',      category: 'Study Terms', evocativeLine: "To ponder deeply — the Quran's own word for how it wants to be read.", hasFullEntry: false },
  { slug: 'nazm',            term: 'نَظْم',              transliteration: 'Nazm',          category: 'Study Terms', evocativeLine: 'The hidden architecture of the Quran — the coherence beneath the surface.', hasFullEntry: false },
  { slug: 'ijaz',            term: 'إِعْجَاز',           transliteration: "I'jaz",         category: 'Study Terms', evocativeLine: "The Quran's inimitability — the challenge that has never been met.",    hasFullEntry: false },
  { slug: 'asbab-al-nuzul',  term: 'أَسْبَاب ٱلنُّزُول', transliteration: 'Asbab al-Nuzul', category: 'Study Terms', evocativeLine: 'The occasions of revelation — the moments that gave the verses their first breath.', hasFullEntry: false },
]

// ── Full entries ──────────────────────────────────────────────────────────────

export const GLOSSARY_ENTRIES: Record<string, GlossaryEntry> = {
  tawbah: {
    slug: 'tawbah',
    term: 'تَوْبَة',
    transliteration: 'Tawbah',
    pronunciation: "taw-bah · TAW rhymes with 'law' · stress on first syllable",
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

    occurrenceCount: 87,
    occurrenceNote:
      'All forms of the root ت-و-ب across the Quran — verified via Quranic corpus morphological analysis. The noun تَوْبَة (tawbah) itself appears 17 times; an entire surah (At-Tawbah, ch. 9) is named after the concept.',

    // ── Derived forms of the root ──────────────────────────────────────────

    rootForms: [
      {
        arabic: 'تَابَ',
        transliteration: 'tāba',
        type: 'Verb — Perfect (Form I)',
        meaning: '"He returned / repented" — the completed act',
        approxCount: 28,
        verified: false,
      },
      {
        arabic: 'يَتُوبُ',
        transliteration: 'yatūbu',
        type: 'Verb — Imperfect',
        meaning: '"Returns / repents" — ongoing or habitual',
        approxCount: 12,
        verified: false,
      },
      {
        arabic: 'تُوبُوا',
        transliteration: 'tūbū',
        type: 'Verb — Imperative (plural)',
        meaning: '"Repent! Turn back!" — the Divine command',
        approxCount: 8,
        verified: false,
      },
      {
        arabic: 'تَوْبَة',
        transliteration: 'tawbah',
        type: 'Verbal noun (maṣdar)',
        meaning: '"A return / repentance" — the act as a thing',
        approxCount: 17,
        verified: true,
      },
      {
        arabic: 'تَائِب',
        transliteration: "tā'ib",
        type: 'Active participle',
        meaning: '"One who returns / repents" — the returning person',
        approxCount: 4,
        verified: false,
      },
      {
        arabic: 'ٱلتَّوَّابُ',
        transliteration: 'al-tawwāb',
        type: 'Intensive noun — Divine Name',
        meaning: '"The Ever-Relenting" — Allah who perpetually turns toward His servants',
        approxCount: 11,
        verified: false,
      },
      {
        arabic: 'مَتَاب',
        transliteration: 'matāb',
        type: 'Nominal form (place/act)',
        meaning: '"A place of return / a returning" — rare, poetic',
        approxCount: 3,
        verified: false,
      },
    ],

    // ── Key Quranic ayahs ─────────────────────────────────────────────────

    keyAyahs: [
      {
        ref: '2:222',
        arabic:
          'إِنَّ ٱللَّهَ يُحِبُّ ٱلتَّوَّٰبِينَ وَيُحِبُّ ٱلْمُتَطَهِّرِينَ',
        translation:
          'Indeed, Allah loves those who constantly return to Him, and He loves those who purify themselves.',
        note:
          "The word is التَّوَّابِين — not those who repented once, but those whose nature is to return. It reframes tawbah from a crisis response into a way of being. Crucially, the verse links returning with love — not just forgiveness. This is one of the rare places the Quran says Allah loves.",
      },
      {
        ref: '9:104',
        arabic:
          'أَلَمْ يَعْلَمُوٓا۟ أَنَّ ٱللَّهَ هُوَ يَقْبَلُ ٱلتَّوْبَةَ عَنْ عِبَادِهِۦ وَيَأْخُذُ ٱلصَّدَقَٰتِ وَأَنَّ ٱللَّهَ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ',
        translation:
          'Do they not know that it is Allah — He Himself — who accepts repentance from His servants and receives their charities, and that it is Allah who is the Ever-Accepting of Return, the Merciful?',
        note:
          "The grammatical emphasis هُوَ — 'He Himself' — makes the acceptance exclusive and direct. No intermediary, no priest, no community. The act is between servant and Lord alone. That this surah is named At-Tawbah despite covering military and political events reveals how foundational the concept is to the Quran's moral architecture.",
      },
      {
        ref: '39:53',
        arabic:
          'قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ',
        translation:
          "Say: 'O My servants who have transgressed against themselves — do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'",
        note:
          "The address يَٰعِبَادِىَ — 'O My servants' — is remarkable: Allah claims them even in their transgression. The scope is جَمِيعًا, 'all sins,' with no qualifier. Classical scholars called this the most expansive verse of hope in the Quran. Despair (قنوط) is named as the thing to resist — because it is what prevents the turning.",
      },
    ],

    // ── Practical section ─────────────────────────────────────────────────

    practicalSection: {
      conditions: [
        {
          number: 1,
          title: 'Cease',
          arabic: 'الإقلاع',
          arabicTranslit: 'al-iqlāʿ',
          description:
            'Stop the sin immediately. Not gradually, not "from next week." The turning must begin now. This is what distinguishes tawbah from wishful regret.',
        },
        {
          number: 2,
          title: 'Remorse',
          arabic: 'الندم',
          arabicTranslit: 'al-nadam',
          description:
            'Feel the weight of having moved away from Allah. The Prophet ﷺ said: "Remorse is repentance." It is not self-flagellation — it is honest acknowledgment that something was lost.',
        },
        {
          number: 3,
          title: 'Resolve',
          arabic: 'العزم',
          arabicTranslit: 'al-ʿazm',
          description:
            'Form a sincere intention not to return to the sin. The scholars are careful: this is about honest intention, not guaranteed future success. The person who intends never to sin again but later fails can make tawbah again.',
        },
        {
          number: 4,
          title: 'Restore',
          arabic: 'الرد',
          arabicTranslit: 'al-radd',
          description:
            'If the sin involved the rights of another person — stolen wealth, a harmed reputation, a broken trust — tawbah requires making it right. Allah can forgive sins against Himself; the rights of people require returning them.',
        },
      ],

      stations: [
        {
          name: 'For the beginner',
          description:
            "Tawbah is crisis response — the turning that happens in the wake of a fall. This is where almost everyone starts. It is not a lesser form. The Prophet ﷺ said 'all of Adam's children sin' — meaning tawbah at this level is not an exception, it is the norm of the human condition.",
        },
        {
          name: 'For the practicing Muslim',
          description:
            "Tawbah becomes habitual — not because of constant major falling, but because the more regularly someone reflects, the more they see the small ways they drift: in their intentions, their attention, their priorities. Regular tawbah is not shame; it is honesty.",
        },
        {
          name: 'For the advanced traveler',
          description:
            "Al-Ghazali and Ibn al-Qayyim both note that the deepest tawbah is from the veils themselves — the attachments that were never technically sins, but competed with Allah for the heart's primary loyalty. At this level, tawbah is not about guilt but about refinement.",
        },
      ],

      questions: [
        {
          question: 'Do I need to confess to anyone?',
          answer:
            'No. Tawbah in Islam is direct — between you and Allah alone, with no priest, elder, or community required. This is one of the most distinctive features of the Islamic understanding.',
        },
        {
          question: 'What if I commit the same sin again?',
          answer:
            "Make tawbah again. Ibn al-Qayyim addressed this directly: 'Do not let the thought that Allah will not accept your tawbah because you have returned to the sin stop you from making tawbah — for that thought is itself from Shaytan.' Each tawbah is evaluated on its own terms.",
        },
        {
          question: 'Is there a specific supplication required?',
          answer:
            "No fixed formula is required. The Sayyid al-Istighfar (Master of Seeking Forgiveness) narrated in Sahih al-Bukhari is strongly recommended, but any sincere turning to Allah — even without words — has theological validity. Sincerity matters more than form.",
        },
        {
          question: 'Are there better times for tawbah?',
          answer:
            "Yes. The last third of the night is when Allah 'descends' in a manner befitting His majesty and asks: 'Who is calling on Me, that I may answer them?' (Bukhari, Muslim). Also: between adhan and iqamah, on Fridays, during rain, in prostration (sujud).",
        },
      ],
    },

    // ── Semantic field ────────────────────────────────────────────────────

    semanticField: [
      {
        slug: 'nadam',
        arabic: 'نَدَم',
        transliteration: 'Nadam',
        relationship: 'precedes',
        relationshipLabel: 'Precedes — the emotion that moves you to act',
        description:
          "Nadam is the remorse — the ache of recognizing you moved away from something sacred. It is the necessary prerequisite for tawbah, but it is not tawbah itself. Many people feel nadam and never turn. The Prophet ﷺ said 'nadam is tawbah' — meaning it is its seed, not its completion.",
      },
      {
        slug: 'istighfar',
        arabic: 'ٱسْتِغْفَار',
        transliteration: 'Istighfar',
        relationship: 'parallels',
        relationshipLabel: 'Parallels — the verbal plea that accompanies the act',
        description:
          "Istighfar is seeking forgiveness (ghafara = to cover/shield). Where tawbah is the act of turning, istighfar is the vocal plea that accompanies or follows it. They are not identical: you can ask for forgiveness without yet having fully turned (istighfar without tawbah), and you can turn without specific words (tawbah without istighfar). Together, they are complete.",
      },
      {
        slug: 'inabah',
        arabic: 'إِنَابَة',
        transliteration: 'Inabah',
        relationship: 'deepens',
        relationshipLabel: 'Deepens — what tawbah becomes when it matures',
        description:
          "Inabah shares the meaning of 'returning' but with a stronger connotation of orientation — not just turning once, but being turned. The Quran uses it for Ibrahim (Hud 11:75) and for Dawud (Sad 38:17). Inabah is the state of someone whose entire inner posture has settled in the direction of Allah. Tawbah is the act; inabah is the character trait that act builds.",
      },
      {
        slug: 'tawwab',
        arabic: 'ٱلتَّوَّاب',
        transliteration: 'Al-Tawwāb',
        relationship: 'divine-response',
        relationshipLabel: "Divine Response — Allah's name that mirrors the human act",
        description:
          "Al-Tawwāb is one of the Beautiful Names of Allah. It is the intensive form of the same root — the One who perpetually, repeatedly turns toward His servants. This is the theological symmetry that makes tawbah possible: the human act of turning is met by a Divine disposition to turn first and to turn back constantly. The Quran pairs تَابَ (the servant turned) with تَابَ عَلَيْهِ (Allah turned toward him) in the same breath.",
      },
      {
        slug: 'awwab',
        arabic: 'أَوَّاب',
        transliteration: "Awwāb",
        relationship: 'intensifies',
        relationshipLabel: "Intensifies — the human who has made return their nature",
        description:
          "Awwāb is another intensive form meaning 'one who constantly returns.' The Quran uses it as a commendatory title for Dawud (Sad 38:17), Sulayman (Sad 38:30), and Ayyub (Sad 38:44). Where tā'ib is someone who repents, awwāb is someone for whom returning to Allah has become their defining characteristic — not because they sin more, but because they are more awake to the drift.",
      },
    ],

    // ── Scholar notes ─────────────────────────────────────────────────────

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
      { slug: 'nadam',    transliteration: 'Nadam',    term: 'نَدَم'    },
      { slug: 'sabr',     transliteration: 'Sabr',     term: 'صَبْر'    },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
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
        note: "Named for this concept itself — and the only surah that does not begin with Bismillah.",
      },
      {
        slug: 'az-zumar',
        surahName: 'Az-Zumar',
        note: 'Contains 39:53, the most expansive verse of hope in the entire Quran.',
      },
    ],
  },
}
