// ── Glossary data ─────────────────────────────────────────────────────────────

export type GlossaryCategory =
  | 'States of the Heart'
  | 'The Unseen'
  | 'Quranic Characters'
  | 'Nations & Peoples'
  | 'Study Terms'
  | 'Concepts of Existence'
  | 'Theology & Ethics'

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
  hadith?: { text?: string; source?: string; ref?: string; arabic?: string; translation?: string; note?: string }[]
  acrossTransitions: string
  /** Semantic constellation — how this term connects to neighbouring concepts */
  semanticField?: SemanticConnection[]
  practicalSection?: PracticalSection
  relatedTerms: RelatedTerm[]
  goDeeper: GoDeeperLink[]
}

// ── Index catalogue ───────────────────────────────────────────────────────────

export const GLOSSARY_TERMS: GlossaryMeta[] = [
  // ── States of the Heart ──────────────────────────────────────────────────────
  { slug: 'tawbah',     term: 'تَوْبَة',    transliteration: 'Tawbah',     category: 'States of the Heart', evocativeLine: 'The act of turning back — not just regret, but return.',                               hasFullEntry: true  },
  { slug: 'sabr',       term: 'صَبْر',      transliteration: 'Sabr',       category: 'States of the Heart', evocativeLine: 'Patient endurance that holds firm without losing hope.',                               hasFullEntry: true  },
  { slug: 'tawakkul',   term: 'تَوَكُّل',   transliteration: 'Tawakkul',   category: 'States of the Heart', evocativeLine: 'Complete reliance on Allah — after you have tied your camel.',                         hasFullEntry: true  },
  { slug: 'khushu',     term: 'خُشُوع',     transliteration: "Khushu'",    category: 'States of the Heart', evocativeLine: 'The trembling stillness of the heart in the presence of the Real.',                    hasFullEntry: true  },
  { slug: 'shukr',      term: 'شُكْر',      transliteration: 'Shukr',      category: 'States of the Heart', evocativeLine: 'Gratitude that moves from tongue to heart to action.',                                  hasFullEntry: true  },
  { slug: 'nadam',      term: 'نَدَم',      transliteration: 'Nadam',      category: 'States of the Heart', evocativeLine: 'The remorse that precedes returning — the ache before the turn.',                      hasFullEntry: true  },
  { slug: 'mahabbah',   term: 'مَحَبَّة',   transliteration: 'Mahabbah',   category: 'States of the Heart', evocativeLine: 'The love that reshapes everything — when the heart finds what it was made for.',        hasFullEntry: true  },
  { slug: 'khawf',      term: 'خَوْف',      transliteration: 'Khawf',      category: 'States of the Heart', evocativeLine: 'The sacred fear that keeps the soul honest — not terror, but reverential awe.',         hasFullEntry: true  },
  { slug: 'raja',       term: 'رَجَاء',     transliteration: "Raja'",      category: 'States of the Heart', evocativeLine: "Hope in Allah's mercy — the rope that holds even when the hand has let go.",            hasFullEntry: true  },
  { slug: 'ikhlas',     term: 'إِخْلَاص',   transliteration: 'Ikhlas',     category: 'States of the Heart', evocativeLine: 'Sincerity stripped of all audience — the deed done when only Allah is watching.',       hasFullEntry: true  },
  { slug: 'sidq',       term: 'صِدْق',      transliteration: 'Sidq',       category: 'States of the Heart', evocativeLine: 'Truthfulness so complete that the inner and outer become one.',                          hasFullEntry: true },
  { slug: 'tawadu',     term: 'تَوَاضُع',   transliteration: "Tawadu'",    category: 'States of the Heart', evocativeLine: 'Humility that knows where it stands — not self-deprecation but honest seeing.',          hasFullEntry: true },
  { slug: 'zuhd',       term: 'زُهْد',      transliteration: 'Zuhd',       category: 'States of the Heart', evocativeLine: 'Detachment from the world — not hating it, but not being owned by it.',                  hasFullEntry: true },
  { slug: 'wara',       term: 'وَرَع',      transliteration: "Wara'",      category: 'States of the Heart', evocativeLine: 'Scrupulous caution — leaving even the doubtful for fear of the forbidden.',              hasFullEntry: true },
  { slug: 'hayaa',      term: 'حَيَاء',     transliteration: "Hayaa'",     category: 'States of the Heart', evocativeLine: 'The modesty that guards — the eyes, the tongue, the heart, and the limbs.',             hasFullEntry: true },
  { slug: 'qanah',      term: 'قَنَاعَة',   transliteration: "Qana'ah",    category: 'States of the Heart', evocativeLine: "Contentment with what Allah has given — the richness that needs no addition.",           hasFullEntry: true },
  { slug: 'muraqaba',   term: 'مُرَاقَبَة', transliteration: 'Muraqaba',   category: 'States of the Heart', evocativeLine: 'The awareness of being watched — living as though you can see Allah, knowing He sees you.', hasFullEntry: true },
  { slug: 'muhasaba',   term: 'مُحَاسَبَة', transliteration: 'Muhasaba',   category: 'States of the Heart', evocativeLine: 'The daily accounting of the self — before you are called to account.',                   hasFullEntry: true },
  { slug: 'inabah',     term: 'إِنَابَة',   transliteration: 'Inabah',     category: 'States of the Heart', evocativeLine: 'Turning to Allah with the whole soul — more urgent and total than tawbah.',              hasFullEntry: true },
  { slug: 'tafakkur',   term: 'تَفَكُّر',   transliteration: 'Tafakkur',   category: 'States of the Heart', evocativeLine: 'The deliberate use of reason to see signs — thinking as an act of worship.',             hasFullEntry: true },
  { slug: 'dhikr',      term: 'ذِكْر',      transliteration: 'Dhikr',      category: 'States of the Heart', evocativeLine: "The remembrance of Allah — the heart's breath, without which it suffocates.",            hasFullEntry: true },
  { slug: 'hilm',       term: 'حِلْم',      transliteration: 'Hilm',       category: 'States of the Heart', evocativeLine: 'Forbearance that absorbs harm without retaliation — the strength to be still.',          hasFullEntry: true },
  { slug: 'uns',        term: 'أُنْس',      transliteration: 'Uns',        category: 'States of the Heart', evocativeLine: 'Intimacy with Allah — the sweetness of His presence that makes solitude a gift.',         hasFullEntry: true },
  { slug: 'khashya',    term: 'خَشْيَة',    transliteration: 'Khashya',    category: 'States of the Heart', evocativeLine: 'Reverential awe born of knowledge — the fear of those who truly know.',                  hasFullEntry: true },
  { slug: 'afw',        term: 'عَفْو',      transliteration: "Afw",        category: 'States of the Heart', evocativeLine: 'Pardoning — the release of the right to retaliate, chosen freely out of strength.',      hasFullEntry: true },

  // ── The Unseen ───────────────────────────────────────────────────────────────
  { slug: 'barzakh',         term: 'بَرْزَخ',         transliteration: 'Barzakh',         category: 'The Unseen', evocativeLine: 'The barrier between two worlds — where the departed now dwell.',                      hasFullEntry: true  },
  { slug: 'mizan',           term: 'مِيزَان',         transliteration: 'Mizan',           category: 'The Unseen', evocativeLine: 'The scale on which deeds weigh more than mountains.',                                hasFullEntry: true  },
  { slug: 'jannah',          term: 'جَنَّة',          transliteration: 'Jannah',          category: 'The Unseen', evocativeLine: 'The garden — a word that carries moisture, shade, and promise.',                      hasFullEntry: true  },
  { slug: 'jahannam',        term: 'جَهَنَّم',        transliteration: 'Jahannam',        category: 'The Unseen', evocativeLine: 'The fire whose true nature is beyond imagination.',                                   hasFullEntry: true  },
  { slug: 'al-ghayb',        term: 'ٱلْغَيْب',        transliteration: 'Al-Ghayb',        category: 'The Unseen', evocativeLine: 'The unseen realm — the first quality the Quran asks us to believe in.',               hasFullEntry: true  },
  { slug: 'malaika',         term: 'مَلَائِكَة',      transliteration: 'Malaika',         category: 'The Unseen', evocativeLine: 'Beings of light and obedience — woven through all of creation, seen by none.',        hasFullEntry: true  },
  { slug: 'jinn',            term: 'جِنّ',            transliteration: 'Jinn',            category: 'The Unseen', evocativeLine: 'Hidden beings of smokeless fire — accountable like humanity, invisible to it.',        hasFullEntry: false },
  { slug: 'shaytan',         term: 'شَيْطَان',        transliteration: 'Shaytan',         category: 'The Unseen', evocativeLine: 'The one who refused — and has been whispering refusals ever since.',                   hasFullEntry: true  },
  { slug: 'al-arsh',         term: 'ٱلْعَرْش',        transliteration: 'Al-Arsh',         category: 'The Unseen', evocativeLine: "The Throne above all creation — the symbol of Allah's absolute sovereignty.",          hasFullEntry: false },
  { slug: 'al-kursi',        term: 'ٱلْكُرْسِيّ',     transliteration: 'Al-Kursi',        category: 'The Unseen', evocativeLine: 'His seat encompasses the heavens and the earth — and guarding them tires Him not.',    hasFullEntry: false },
  { slug: 'al-lawh',         term: 'ٱللَّوْح ٱلْمَحْفُوظ', transliteration: 'Al-Lawh al-Mahfuz', category: 'The Unseen', evocativeLine: 'The Preserved Tablet — where all of existence was written before time began.', hasFullEntry: false },
  { slug: 'sirat',           term: 'صِرَاط',          transliteration: 'Al-Sirat',        category: 'The Unseen', evocativeLine: 'The bridge over the fire — crossed by every soul on the Day of Judgment.',             hasFullEntry: false },
  { slug: 'qiyamah',         term: 'قِيَامَة',        transliteration: 'Al-Qiyamah',      category: 'The Unseen', evocativeLine: 'The Standing — the Day when all of history arrives at its conclusion.',                hasFullEntry: false },
  { slug: 'hisab',           term: 'حِسَاب',          transliteration: 'Al-Hisab',        category: 'The Unseen', evocativeLine: 'The reckoning — when every moment of every life is laid completely open.',             hasFullEntry: false },

  // ── Quranic Characters ───────────────────────────────────────────────────────
  { slug: 'maryam',       term: 'مَرْيَم',           transliteration: 'Maryam',        category: 'Quranic Characters', evocativeLine: 'The only woman named by name in the Quran — and her own surah.',              hasFullEntry: true  },
  { slug: 'luqman',       term: 'لُقْمَان',          transliteration: 'Luqman',        category: 'Quranic Characters', evocativeLine: 'The wise man who taught his son by talking, not commanding.',                 hasFullEntry: false },
  { slug: 'dhul-qarnayn', term: 'ذُو ٱلْقَرْنَيْن', transliteration: "Dhul-Qarnayn",  category: 'Quranic Characters', evocativeLine: 'The one of two epochs — a sovereign who served rather than ruled.',            hasFullEntry: false },
  { slug: 'ayyub',        term: 'أَيُّوب',           transliteration: 'Ayyub',         category: 'Quranic Characters', evocativeLine: "Affliction beyond measure — and a faith that didn't flinch.",                 hasFullEntry: false },
  { slug: 'iblis',        term: 'إِبْلِيس',          transliteration: 'Iblis',         category: 'Quranic Characters', evocativeLine: 'He knew the truth, refused it — and has spent eternity trying to make others do the same.', hasFullEntry: false },
  { slug: 'firaun',       term: 'فِرْعَوْن',         transliteration: "Fir'awn",       category: 'Quranic Characters', evocativeLine: 'The supreme symbol of arrogance — a man who called himself lord and drowned in the sea.', hasFullEntry: false },
  { slug: 'qarun',        term: 'قَارُون',           transliteration: 'Qarun',         category: 'Quranic Characters', evocativeLine: 'The man of treasures who forgot their source — and was swallowed by the earth.', hasFullEntry: false },
  { slug: 'bilqis',       term: 'بِلْقِيس',          transliteration: 'Bilqis',        category: 'Quranic Characters', evocativeLine: 'The queen who recognized truth when she saw it — and chose it over her throne.', hasFullEntry: false },
  { slug: 'asiya',        term: 'آسِيَة',            transliteration: 'Asiya',         category: 'Quranic Characters', evocativeLine: 'A queen who built a house in Jannah while living in a palace of oppression.',   hasFullEntry: false },
  { slug: 'yusuf',        term: 'يُوسُف',            transliteration: 'Yusuf',         category: 'Quranic Characters', evocativeLine: 'Thrown into a well, sold, imprisoned — and still the most beautiful of stories.', hasFullEntry: false },
  { slug: 'ibrahim',      term: 'إِبْرَاهِيم',       transliteration: 'Ibrahim',       category: 'Quranic Characters', evocativeLine: "The friend of Allah — who broke the idols, walked into the fire, and didn't flinch.", hasFullEntry: false },
  { slug: 'musa',         term: 'مُوسَىٰ',           transliteration: 'Musa',          category: 'Quranic Characters', evocativeLine: 'Called from a burning bush, raised in the palace of his enemy — the most mentioned prophet.', hasFullEntry: false },
  { slug: 'isa',          term: 'عِيسَىٰ',           transliteration: "'Isa",          category: 'Quranic Characters', evocativeLine: "Born without a father, spoke as an infant, and did not die as the world believes.", hasFullEntry: false },
  { slug: 'nuh',          term: 'نُوح',              transliteration: 'Nuh',           category: 'Quranic Characters', evocativeLine: "950 years of calling — and his own son refused the ark.",                         hasFullEntry: false },
  { slug: 'dawud',        term: 'دَاوُود',           transliteration: 'Dawud',         category: 'Quranic Characters', evocativeLine: 'The king who sang to Allah — given wisdom, a kingdom, and the Psalms.',           hasFullEntry: false },
  { slug: 'sulayman',     term: 'سُلَيْمَان',        transliteration: 'Sulayman',      category: 'Quranic Characters', evocativeLine: 'The sovereign of wind, jinn, and birds — whose prayer was a greater gift than the kingdom.', hasFullEntry: false },
  { slug: 'yunus',        term: 'يُونُس',            transliteration: 'Yunus',         category: 'Quranic Characters', evocativeLine: "The prophet who left before permission — and called from the belly of the deep.",  hasFullEntry: false },

  // ── Nations & Peoples ────────────────────────────────────────────────────────
  { slug: 'ad',               term: 'عَاد',                transliteration: "'Ad",             category: "Nations & Peoples", evocativeLine: "The people of the wind — destroyed by the very air they breathed.",         hasFullEntry: false },
  { slug: 'thamud',           term: 'ثَمُود',              transliteration: 'Thamud',          category: "Nations & Peoples", evocativeLine: 'They carved mountains for homes and still could not find safety.',           hasFullEntry: false },
  { slug: 'bani-isra-il',     term: 'بَنُو إِسْرَائِيل',  transliteration: "Bani Isra'il",    category: "Nations & Peoples", evocativeLine: "The people of a thousand stories — struggle, covenant, and mercy.",         hasFullEntry: false },
  { slug: 'ashab-al-kahf',    term: 'أَصْحَاب ٱلْكَهْف',  transliteration: 'Ashab al-Kahf',   category: "Nations & Peoples", evocativeLine: 'Young men who chose a cave over a kingdom.',                                hasFullEntry: false },
  { slug: 'quraysh',          term: 'قُرَيْش',             transliteration: 'Quraysh',         category: "Nations & Peoples", evocativeLine: "The tribe that guarded the Kaaba and rejected its Lord — until the day they couldn't.", hasFullEntry: false },
  { slug: 'ashab-al-ukhdud',  term: 'أَصْحَاب ٱلْأُخْدُود', transliteration: 'Ashab al-Ukhdud', category: "Nations & Peoples", evocativeLine: 'They watched believers burned in the ditch — and would not deny their faith.', hasFullEntry: false },
  { slug: 'ashab-al-fil',     term: 'أَصْحَاب ٱلْفِيل',   transliteration: 'Ashab al-Fil',    category: "Nations & Peoples", evocativeLine: 'The army of the elephant — turned back by birds, the year the Prophet ﷺ was born.', hasFullEntry: false },
  { slug: 'madyan',           term: 'مَدْيَن',             transliteration: 'Madyan',          category: "Nations & Peoples", evocativeLine: 'The people of Shuayb — who cheated in their scales and met the weight of divine justice.', hasFullEntry: false },
  { slug: 'qawm-nuh',         term: 'قَوْم نُوح',         transliteration: "Qawm Nuh",        category: "Nations & Peoples", evocativeLine: "Noah's people — 950 years of warning and still they chose the flood.",        hasFullEntry: false },
  { slug: 'qawm-lut',         term: 'قَوْم لُوط',         transliteration: "Qawm Lut",        category: "Nations & Peoples", evocativeLine: "Lot's people — whose transgression became the permanent example of civilizational collapse.", hasFullEntry: false },

  // ── Study Terms ──────────────────────────────────────────────────────────────
  { slug: 'tafsir',          term: 'تَفْسِير',            transliteration: 'Tafsir',          category: 'Study Terms', evocativeLine: 'The science of uncovering what the Quran means — layer by layer.',               hasFullEntry: true  },
  { slug: 'tadabbur',        term: 'تَدَبُّر',            transliteration: 'Tadabbur',        category: 'Study Terms', evocativeLine: "To ponder deeply — the Quran's own word for how it wants to be read.",           hasFullEntry: true  },
  { slug: 'nazm',            term: 'نَظْم',               transliteration: 'Nazm',            category: 'Study Terms', evocativeLine: 'The hidden architecture of the Quran — the coherence beneath the surface.',       hasFullEntry: true  },
  { slug: 'ijaz',            term: 'إِعْجَاز',            transliteration: "I'jaz",           category: 'Study Terms', evocativeLine: "The Quran's inimitability — the challenge that has never been met.",              hasFullEntry: true  },
  { slug: 'asbab-al-nuzul',  term: 'أَسْبَاب ٱلنُّزُول', transliteration: 'Asbab al-Nuzul',  category: 'Study Terms', evocativeLine: 'The occasions of revelation — the moments that gave the verses their first breath.', hasFullEntry: true  },
  { slug: 'balaghah',        term: 'بَلَاغَة',            transliteration: 'Balaghah',        category: 'Study Terms', evocativeLine: "The Quran's rhetoric — why its words land with a force no translation can carry.",  hasFullEntry: false },
  { slug: 'qiraat',          term: 'قِرَاءَات',           transliteration: "Qira'at",         category: 'Study Terms', evocativeLine: 'The seven readings — different transmissions of the same divine word.',            hasFullEntry: false },
  { slug: 'makki-madani',    term: 'مَكِّي/مَدَنِي',     transliteration: 'Makki / Madani',   category: 'Study Terms', evocativeLine: 'The two faces of the Quran — revelation in struggle, then revelation in power.',   hasFullEntry: false },
  { slug: 'maqasid',        term: 'مَقَاصِد',             transliteration: 'Maqasid',         category: 'Study Terms', evocativeLine: 'The higher objectives of the Quran — life, intellect, lineage, wealth, and deen.',  hasFullEntry: false },

  // ── Concepts of Existence ────────────────────────────────────────────────────
  { slug: 'nafs',    term: 'نَفْس',    transliteration: 'Nafs',    category: 'Concepts of Existence', evocativeLine: "The self the Quran calls you to master — commanding, blaming, and at peace.",        hasFullEntry: true  },
  { slug: 'ruh',     term: 'رُوح',     transliteration: 'Ruh',     category: 'Concepts of Existence', evocativeLine: "The spirit breathed into Adam — known to Allah alone in its full nature.",           hasFullEntry: true  },
  { slug: 'qadar',   term: 'قَدَر',    transliteration: 'Qadar',   category: 'Concepts of Existence', evocativeLine: 'Divine measure — the decree that governs all things, and the belief that frees the heart.', hasFullEntry: true  },
  { slug: 'fitrah',  term: 'فِطْرَة',  transliteration: 'Fitrah',  category: 'Concepts of Existence', evocativeLine: "The primordial nature — the factory setting of the human soul, inclined toward its Creator.", hasFullEntry: true  },
  { slug: 'rizq',    term: 'رِزْق',    transliteration: 'Rizq',    category: 'Concepts of Existence', evocativeLine: 'Provision — everything Allah has apportioned, wider than money and impossible to miss.',   hasFullEntry: true  },
  { slug: 'amanah',  term: 'أَمَانَة', transliteration: 'Amanah',  category: 'Concepts of Existence', evocativeLine: 'The trust the heavens refused — and humanity accepted, for better and for worse.',          hasFullEntry: false },
  { slug: 'aql',     term: 'عَقْل',    transliteration: "'Aql",    category: 'Concepts of Existence', evocativeLine: 'The intellect — the faculty that carries the weight of moral responsibility.',              hasFullEntry: false },
  { slug: 'dunya',   term: 'دُنْيَا',  transliteration: 'Dunya',   category: 'Concepts of Existence', evocativeLine: "The present world — the word itself means 'near' and 'low', and the Quran won't let you forget it.", hasFullEntry: false },
  { slug: 'akhira',  term: 'آخِرَة',   transliteration: 'Akhira',  category: 'Concepts of Existence', evocativeLine: 'The hereafter — the permanent home toward which this life is only a passage.',            hasFullEntry: false },
  { slug: 'ajal',    term: 'أَجَل',    transliteration: 'Ajal',    category: 'Concepts of Existence', evocativeLine: 'The appointed term — the moment of death already written before birth.',                   hasFullEntry: false },
  { slug: 'barakah', term: 'بَرَكَة',  transliteration: 'Barakah', category: 'Concepts of Existence', evocativeLine: 'Divine blessing that multiplies — the invisible increase Allah places in what He wills.',  hasFullEntry: false },
  { slug: 'yawm',    term: 'يَوْم',    transliteration: 'Yawm',    category: 'Concepts of Existence', evocativeLine: 'The Day — used over 400 times in the Quran, pointing always toward the Day that ends all days.', hasFullEntry: false },
  { slug: 'layl',    term: 'لَيْل',    transliteration: 'Layl',    category: 'Concepts of Existence', evocativeLine: 'Night — the time of standing, of secrets, of proximity, of divine descent.',               hasFullEntry: false },
  { slug: 'mawt',    term: 'مَوْت',    transliteration: 'Mawt',    category: 'Concepts of Existence', evocativeLine: "Death — the destroyer of pleasures, the great reorienter, the door to what matters.",      hasFullEntry: false },
  { slug: 'hayah',   term: 'حَيَاة',   transliteration: 'Hayah',   category: 'Concepts of Existence', evocativeLine: 'Life — but the Quran speaks of many: this one, the life of the heart, and the life to come.', hasFullEntry: false },

  // ── Theology & Ethics ────────────────────────────────────────────────────────
  { slug: 'tawhid',    term: 'تَوْحِيد',  transliteration: 'Tawhid',   category: 'Theology & Ethics', evocativeLine: "The oneness of Allah — the axis on which the entire universe turns.",                     hasFullEntry: true  },
  { slug: 'iman',      term: 'إِيمَان',   transliteration: 'Iman',     category: 'Theology & Ethics', evocativeLine: 'Faith — not just belief in the mind, but conviction that moves the limbs.',               hasFullEntry: true  },
  { slug: 'ihsan',     term: 'إِحْسَان',  transliteration: 'Ihsan',    category: 'Theology & Ethics', evocativeLine: "To worship Allah as though you see Him — knowing He sees you.",                           hasFullEntry: true  },
  { slug: 'taqwa',     term: 'تَقْوَى',   transliteration: 'Taqwa',    category: 'Theology & Ethics', evocativeLine: 'God-consciousness — the shield that makes every moment a moral choice.',                  hasFullEntry: true  },
  { slug: 'rahmah',    term: 'رَحْمَة',   transliteration: 'Rahmah',   category: 'Theology & Ethics', evocativeLine: "Mercy — the quality that precedes and encompasses all of Allah's other attributes.",       hasFullEntry: true  },
  { slug: 'hikmah',    term: 'حِكْمَة',   transliteration: 'Hikmah',   category: 'Theology & Ethics', evocativeLine: 'Wisdom — the ability to put things in their right place, given only to those Allah chooses.', hasFullEntry: true },
  { slug: 'adl',       term: 'عَدْل',     transliteration: "'Adl",     category: 'Theology & Ethics', evocativeLine: "Justice — one of the Quran's supreme values, demanded even against yourself.",             hasFullEntry: true },
  { slug: 'shirk',     term: 'شِرْك',     transliteration: 'Shirk',    category: 'Theology & Ethics', evocativeLine: 'The one sin declared unforgivable — placing anything alongside Allah in the heart.',       hasFullEntry: true },
  { slug: 'kufr',      term: 'كُفْر',     transliteration: 'Kufr',     category: 'Theology & Ethics', evocativeLine: 'Disbelief and ingratitude — the covering over of what the heart already knows.',           hasFullEntry: true },
  { slug: 'nifaq',     term: 'نِفَاق',    transliteration: 'Nifaq',    category: 'Theology & Ethics', evocativeLine: 'Hypocrisy — the gap between what is shown and what is held, wider than disbelief.',        hasFullEntry: true },
  { slug: 'haqq',      term: 'حَقّ',      transliteration: 'Haqq',     category: 'Theology & Ethics', evocativeLine: "Truth and right — the word that is also one of Allah's names and the Quran's purpose.",    hasFullEntry: true },
  { slug: 'zulm',      term: 'ظُلْم',     transliteration: 'Zulm',     category: 'Theology & Ethics', evocativeLine: 'Wrongdoing and oppression — the darkness the Quran cannot name without condemning.',        hasFullEntry: true },
  { slug: 'birr',      term: 'بِرّ',      transliteration: 'Birr',     category: 'Theology & Ethics', evocativeLine: 'Comprehensive righteousness — the full expression of goodness in every direction.',         hasFullEntry: true },
  { slug: 'ummah',     term: 'أُمَّة',    transliteration: 'Ummah',    category: 'Theology & Ethics', evocativeLine: 'Community — the body of believers across time and space, responsible for each other.',      hasFullEntry: true },
  { slug: 'mithaq',    term: 'مِيثَاق',   transliteration: 'Mithaq',   category: 'Theology & Ethics', evocativeLine: 'The primordial covenant — the agreement made before birth that shapes all of human life.',  hasFullEntry: false },
  { slug: 'dawah',     term: 'دَعْوَة',   transliteration: "Da'wah",   category: 'Theology & Ethics', evocativeLine: 'The call — inviting to Allah with wisdom and beautiful speech.',                           hasFullEntry: true },
  { slug: 'jihad',     term: 'جِهَاد',    transliteration: 'Jihad',    category: 'Theology & Ethics', evocativeLine: 'Striving — the comprehensive struggle in every domain, of which warfare is one dimension.', hasFullEntry: false },
  { slug: 'ukhuwwah',  term: 'أُخُوَّة',  transliteration: 'Ukhuwwah', category: 'Theology & Ethics', evocativeLine: 'Brotherhood and sisterhood — the bond the Quran places above tribe and blood.',            hasFullEntry: false },
  { slug: 'sadaqah',   term: 'صَدَقَة',   transliteration: 'Sadaqah',  category: 'Theology & Ethics', evocativeLine: 'Voluntary giving — the charity that purifies the giver and multiplies for both.',          hasFullEntry: false },
  { slug: 'fasad',     term: 'فَسَاد',    transliteration: 'Fasad',    category: 'Theology & Ethics', evocativeLine: 'Corruption and disorder — what happens when humanity forgets its covenant.',               hasFullEntry: false },
  { slug: 'shura',     term: 'شُورَى',    transliteration: 'Shura',    category: 'Theology & Ethics', evocativeLine: 'Consultation — the Quranic principle that decisions must be made together.',               hasFullEntry: false },
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

  // ── SABR ────────────────────────────────────────────────────────────────────

  sabr: {
    slug: 'sabr',
    term: 'صَبْر',
    transliteration: 'Sabr',
    pronunciation: "sab-r · the 'a' as in 'sun' · one syllable",
    category: 'States of the Heart',
    evocativeLine: 'Patient endurance that holds firm without losing hope.',
    hasFullEntry: true,

    summary:
      "Sabr is almost always translated as 'patience,' but patience implies passivity — waiting without complaint. The root ص-ب-ر means to bind, to confine, to hold oneself in place. Sabr is active restraint: the effort of keeping yourself together when everything pulls you apart. The Quran returns to it more than any other virtue — as a command, a promise, and a description of the people Allah is with.",

    root: {
      letters: 'ص-ب-ر',
      transliteration: 'ṣād-bā-rā',
      meaning: 'To bind, restrain, confine; to endure by holding oneself firm',
      elaboration:
        "The ancient Arabs called the aloe plant the ṣabir — bitter, but medicinal. The word for the desert stone prison was also from this root: to be enclosed, unable to move. Sabr carries both: the bitterness of constraint and the healing that comes through it. This is why scholars have said sabr is not the absence of pain but the refusal to be defined by it. The Quran never asks you to pretend it does not hurt. It asks you to hold.",
    },

    occurrenceCount: 90,
    occurrenceNote: 'All forms of root ص-ب-ر across the Quran. The noun sabr appears ~45 times; the plural al-ṣābirīn (the patient ones) appears ~15 times as a mark of divine commendation.',

    rootForms: [
      { arabic: 'صَبَرَ',      transliteration: 'ṣabara',     type: 'Verb — Perfect',          meaning: '"He endured / was patient"',                        approxCount: 20, verified: false },
      { arabic: 'يَصْبِرُ',    transliteration: 'yaṣbiru',    type: 'Verb — Imperfect',        meaning: '"He endures / is patient" — ongoing',              approxCount: 12, verified: false },
      { arabic: 'اصْبِرُوا',   transliteration: 'iṣbirū',     type: 'Verb — Imperative',       meaning: '"Be patient!" — the repeated Divine command',       approxCount: 10, verified: false },
      { arabic: 'صَبْر',       transliteration: 'ṣabr',       type: 'Verbal noun',             meaning: '"Patience / endurance" — the act as a quality',    approxCount: 45, verified: false },
      { arabic: 'صَابِر',      transliteration: 'ṣābir',      type: 'Active participle',       meaning: '"One who endures" — the patient person',            approxCount: 8,  verified: false },
      { arabic: 'الصَّابِرِين', transliteration: 'al-ṣābirīn', type: 'Plural — commendatory',  meaning: '"The patient ones" — used as a divine accolade',    approxCount: 15, verified: false },
      { arabic: 'صَبَّار',     transliteration: 'ṣabbār',     type: 'Intensive form',          meaning: '"The greatly patient" — human or divine attribute', approxCount: 2,  verified: false },
    ],

    keyAyahs: [
      {
        ref: '2:153',
        arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ',
        translation: 'O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.',
        note: "The command is to seek help through sabr — meaning sabr is not an end in itself but a tool. And the promise is not reward but presence: إِنَّ ٱللَّهَ مَعَ — 'Allah is with.' This is among the most intimate expressions of divine accompaniment in the Quran.",
      },
      {
        ref: '2:156-157',
        arabic: 'ٱلَّذِينَ إِذَآ أَصَٰبَتْهُم مُّصِيبَةٌ قَالُوٓا۟ إِنَّا لِلَّهِ وَإِنَّآ إِلَيْهِ رَٰجِعُونَ ۝ أُو۟لَٰٓئِكَ عَلَيْهِمْ صَلَوَٰتٌ مِّن رَّبِّهِمْ وَرَحْمَةٌ',
        translation: 'Those who, when affliction strikes them, say: Indeed we belong to Allah, and indeed to Him we will return. Those are the ones upon whom are blessings from their Lord and mercy.',
        note: "This is the Quranic picture of sabr in action: not silence, not suppression, but an utterance — a reorientation of meaning. Inna lillahi is not resignation; it is a theological claim about ownership and destination. The response is immediate: divine salawat and rahma upon the person in their very moment of loss.",
      },
      {
        ref: '39:10',
        arabic: 'إِنَّمَا يُوَفَّى ٱلصَّٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
        translation: 'Indeed, the patient will be given their reward without measure.',
        note: "Every other deed in the Quran is rewarded by measure — ten to seven hundred times. Sabr alone receives بِغَيْرِ حِسَابٍ, 'without account.' The scholars ask: why? Because sabr cannot be measured — you cannot count how many times someone chose not to collapse. Its reward is fittingly immeasurable.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Sabr on obedience', arabic: 'صبر على الطاعة', arabicTranslit: 'ṣabr ʿalā al-ṭāʿa', description: 'Doing what Allah commands even when it is difficult — fasting when hungry, praying when tired, giving when it costs you. This is the most demanding form because it is daily.' },
        { number: 2, title: 'Sabr from sin',     arabic: 'صبر عن المعصية', arabicTranslit: "ṣabr ʿan al-maʿṣiya",  description: 'Restraining yourself from what is forbidden when the desire is real. Ibn al-Qayyim called this the highest form of sabr because the self must actively hold itself back.' },
        { number: 3, title: 'Sabr on trials',    arabic: 'صبر على البلاء', arabicTranslit: "ṣabr ʿalā al-balā'",   description: 'Accepting what Allah decrees — loss, illness, grief — without losing faith or becoming bitter. This is what most people mean by "patience" but it is only one of three.' },
      ],
      stations: [
        { name: 'Endurance (taḥammul)', description: "The raw capacity to bear pain without breaking. Every person has some of this — sabr at this level is a human baseline. The Quran develops it into something far richer." },
        { name: 'Acceptance (riḍā)', description: "Beyond merely enduring, the person who reaches riḍā is satisfied with Allah's decree. Not numb — genuinely at peace. Ibn Ata Allah: 'He has truly tasted faith who has surrendered his will to Allah's will.'" },
        { name: "Gratitude within trial (shukr fī al-balā')", description: "The highest station: the person who finds, within the trial itself, a reason for gratitude — because they see the trial as a form of closeness to Allah, a purification, a sign of being noticed." },
      ],
      questions: [
        { question: 'Is sabr the same as suppressing emotion?', answer: "No. The Prophet ﷺ wept at the death of his son Ibrahim. Sabr is not the absence of feeling but the refusal to let feeling become faithlessness. Weeping, grief, and acknowledging pain are not opposites of sabr." },
        { question: 'Does sabr mean I should not try to change my situation?', answer: "Not at all. Sabr on a trial does not mean passive acceptance of injustice or neglect of practical means. The Prophet ﷺ sought treatment for illness, took precautions in battle, and pursued his rights. Sabr operates in the heart while the limbs continue to act." },
        { question: 'What is the relationship between sabr and gratitude?', answer: "The Prophet ﷺ described the believer's condition as remarkable: 'If good comes to him, he is grateful — that is good for him. If harm comes to him, he is patient — that is good for him.' The two are the complete response to all of existence." },
      ],
    },

    semanticField: [
      { slug: 'shukr',    arabic: 'شُكْر',    transliteration: 'Shukr',    relationship: 'parallels',  relationshipLabel: "Pairs with — the Quran's other half of the complete believer", description: "The Prophet ﷺ said the believer's affair is all good: in ease they are grateful, in hardship they are patient. Sabr and shukr are the Quran's twin responses to all of existence — between them they cover every condition a human being can be in." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens',    relationshipLabel: 'Deepens into — what sabr in action eventually becomes', description: "When sabr is sustained over time, it opens into tawakkul: the heart releases its grip on outcomes and genuinely entrusts affairs to Allah. Sabr is the effort; tawakkul is what the effort produces when it is truly surrendered." },
      { slug: 'tawbah',   arabic: 'تَوْبَة',  transliteration: 'Tawbah',  relationship: 'parallels',  relationshipLabel: 'Partners with — two different responses to difficulty', description: "Tawbah is the response to distance caused by one's own choices; sabr is the response to difficulty that comes from outside. Together they are the complete toolkit for navigating a human life." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "Sabr is half of faith — for faith is two halves: sabr and shukr. And the highest form of sabr is restraining yourself from sin, which requires the most effort of the self. Easier is sabr on trials, since the soul is already humbled by them. Hardest is daily sabr on obedience, because the soul would rather rest.", source: 'Uddat al-Sābirīn' },
      { scholar: 'Al-Ghazali', text: "Sabr is a rider upon the self. Without sabr, the self is ridden by its desires. With it, the self becomes a vehicle — carrying you where you need to go, not where it wants to go.", source: 'Iḥyāʾ ʿUlūm al-Dīn' },
      { scholar: "Ibn 'Ata Allah al-Iskandari", text: "Do not demand recompense for an act whose doer Allah did not witness — or whose witnessing you do not value.", source: 'Al-Ḥikam' },
    ],

    hadith: [
      { text: "No person is given a gift better and more comprehensive than patience.", source: 'Sahih al-Bukhari, 1469' },
      { text: "Amazing is the affair of the believer. Verily all of his affairs are good, and this is for no one except the believer. If good times come his way, he is thankful, and that is good for him. If hardship comes his way, he is patient, and that is good for him.", source: 'Sahih Muslim, 2999' },
    ],

    acrossTransitions: `Patience as a virtue appears across every major wisdom tradition, but what each tradition asks patience *toward* differs significantly.

In Stoic philosophy (Marcus Aurelius, Epictetus), patience is directed toward accepting the unchangeable — what is outside your control should not disturb your equanimity. The goal is inner stillness, self-sufficiency. This is close to sabr on trials but strips away the relational dimension: in the Quran, sabr is not about self-mastery alone but about remaining oriented toward a personal God who is watching and present.

In Buddhist thought, patience (kṣānti) is one of the six perfections, directed primarily at accepting suffering without aversion and at not retaliating against those who harm you. The emphasis is on releasing attachment. The Islamic sabr does not require releasing attachment to the good — it asks you to continue loving, continue hoping, while bearing what is hard.

What is distinctively Quranic is the promise that sabr is *witnessed* and *rewarded* — and that the one practicing it is not alone. The phrase إِنَّ ٱللَّهَ مَعَ ٱلصَّابِرِينَ ("Allah is with the patient") transforms sabr from a coping mechanism into a form of companionship. You are not enduring alone; you are enduring *with*.`,

    relatedTerms: [
      { slug: 'shukr',    transliteration: 'Shukr',    term: 'شُكْر'    },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: 'Contains the most concentrated teaching on sabr in the Quran, including the trial verses (2:155-157) and the promise of divine companionship (2:153).' },
      { slug: 'az-zumar',   surahName: 'Az-Zumar',   note: 'Contains 39:10 — the promise that the patient are rewarded without measure.' },
    ],
  },

  // ── TAWAKKUL ─────────────────────────────────────────────────────────────────

  tawakkul: {
    slug: 'tawakkul',
    term: 'تَوَكُّل',
    transliteration: 'Tawakkul',
    pronunciation: "ta-WAK-kul · stress on the second syllable",
    category: 'States of the Heart',
    evocativeLine: 'Complete reliance on Allah — after you have tied your camel.',
    hasFullEntry: true,

    summary:
      "Tawakkul comes from the root meaning 'to appoint a wakīl' — a representative, a proxy. When you make tawakkul, you are appointing Allah as your wakīl: entrusting the management of your affairs to Him while continuing to act with your own hands. The famous hadith sets the balance precisely: tie your camel, then rely on Allah. Tawakkul is not passivity; it is the inner posture of someone who acts fully and clings to outcomes not at all.",

    root: {
      letters: 'و-ك-ل',
      transliteration: 'wāw-kāf-lām',
      meaning: 'To entrust, to appoint as agent, to rely upon completely',
      elaboration:
        "A wakīl (وَكِيل) is a legal representative — someone you entrust with authority to act on your behalf. When you make tawakkul upon Allah, you are recognizing that He is already managing the affairs of the universe and inviting Him to manage yours. The Divine Name Al-Wakīl appears in the Quran — meaning Allah is the ultimate Trustee, the One upon whom all creation relies whether it knows it or not. Tawakkul is the conscious alignment with that reality.",
    },

    occurrenceCount: 70,
    occurrenceNote: 'All forms of root و-ك-ل across the Quran. The verb tawakkala/yatawakkalu appears ~40 times; al-Wakīl as a Divine Name appears ~14 times. The noun tawakkul itself appears rarely but the concept pervades the Quran.',

    rootForms: [
      { arabic: 'تَوَكَّلَ',     transliteration: 'tawakkala',    type: 'Verb — Perfect (Form V)',  meaning: '"He relied / entrusted himself" — the act of reliance',    approxCount: 25, verified: false },
      { arabic: 'يَتَوَكَّلُ',   transliteration: 'yatawakkalu',  type: 'Verb — Imperfect',         meaning: '"Relies / entrusts" — ongoing reliance',                   approxCount: 15, verified: false },
      { arabic: 'تَوَكَّلْ',     transliteration: 'tawakkal',     type: 'Verb — Imperative',        meaning: '"Rely! Entrust!" — the command to let go of outcomes',     approxCount: 8,  verified: false },
      { arabic: 'الْمُتَوَكِّل', transliteration: 'al-mutawakkil', type: 'Active participle',        meaning: '"The one who relies" — characterizes the believer',        approxCount: 10, verified: false },
      { arabic: 'الوَكِيل',      transliteration: 'al-wakīl',     type: 'Divine Name — intensive',  meaning: '"The Trustee / Ultimate Representative" — one of the 99',  approxCount: 14, verified: false },
      { arabic: 'وَكَّلَ',       transliteration: 'wakkala',      type: 'Verb — Causative (Form II)', meaning: '"He appointed as agent" — to delegate authority',         approxCount: 6,  verified: false },
    ],

    keyAyahs: [
      {
        ref: '65:3',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ',
        translation: 'And whoever relies upon Allah — then He is sufficient for him.',
        note: "The syntax is absolute: whoever. No qualifying condition, no minimum amount of faith required. The promise حَسْبُهُۥ — 'He is sufficient for him' — is one of the Quran's most complete assurances. Not 'He will help' but 'He is enough.' This verse follows the command to act (divorce proceedings, iddah observance) — action comes first, then tawakkul.",
      },
      {
        ref: '3:159',
        arabic: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى ٱللَّهِ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُتَوَكِّلِينَ',
        translation: 'And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].',
        note: "The order is precise: decide first (عَزَمْتَ = you have made the decision), *then* make tawakkul. This verse comes directly after a command to consult others and deliberate — meaning tawakkul is the final step of full engagement, not a replacement for it. And again the language of love: Allah loves the mutawakkilīn.",
      },
      {
        ref: '14:12',
        arabic: 'وَمَا لَنَآ أَلَّا نَتَوَكَّلَ عَلَى ٱللَّهِ وَقَدْ هَدَىٰنَا سُبُلَنَا',
        translation: 'And why should we not rely upon Allah while He has guided us to our ways?',
        note: "This is the Prophets speaking — and the logic they offer is profound: the one who has already received guidance has the strongest reason for tawakkul. If Allah guided you, why would He then abandon you? Tawakkul becomes rational — an inference from past mercy to present reliance.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Act fully', arabic: 'الأخذ بالأسباب', arabicTranslit: "al-akhdh bi-l-asbāb", description: "Tawakkul is not valid without first taking the means. The Prophet ﷺ said: 'Tie your camel, then rely on Allah.' To skip action and call it tawakkul is not piety — the scholars called it 'testing Allah,' which is its opposite." },
        { number: 2, title: 'Release outcomes', arabic: 'تسليم النتيجة', arabicTranslit: 'taslīm al-natīja', description: 'After taking the means, genuinely release your grip on the result. This is the hard part: acting as if it matters entirely, then holding the outcome as if it does not belong to you.' },
        { number: 3, title: 'Expect sufficiency', arabic: 'حسن الظن بالله', arabicTranslit: 'ḥusn al-ẓann billāh', description: "Maintain good opinion of Allah regarding the result — whether it matches your hope or not. Ibn al-Qayyim: 'Tawakkul is leaning upon Allah while being certain that He will bring what is best.' The 'best' may look different than you imagined." },
      ],
      stations: [
        { name: 'Reliance alongside action', description: "The commoner's tawakkul: acting, planning, preparing — and then genuinely entrusting the result to Allah. This is the normative level and entirely complete." },
        { name: 'Trusting without knowing the means', description: 'The advanced station: the heart is at rest without needing to see how Allah will bring the outcome. Like a child resting in a parent\'s arms — not because they understand the route, but because they trust the carrier.' },
        { name: "Full rest in Allah's decree", description: 'What Ibn al-Qayyim called tawakkul of the khāṣṣ al-khāṣṣ — the elect of the elect. The person at this station has no preference between outcomes, genuinely pleased with whatever Allah chooses. This is the station of the Prophets.' },
      ],
      questions: [
        { question: "Does tawakkul mean I don't plan or take precautions?", answer: 'The opposite: tawakkul requires planning and precaution. The Prophet ﷺ wore armor in battle, treated illness, and took food on journeys. To skip means and call it tawakkul is what the scholars called tajrī — tempting Allah rather than trusting Him.' },
        { question: 'What if the result is not what I hoped?', answer: "That is precisely when tawakkul is tested and proven. The outcome not matching your wish is not evidence that tawakkul failed. It is the moment you discover whether your reliance was genuine — whether you trusted Allah's sufficiency unconditionally or only when He agreed with you." },
        { question: 'Is tawakkul compatible with anxiety?', answer: "Yes. Feeling anxious about an outcome while simultaneously choosing to entrust it to Allah is not a contradiction — it is a very human experience of tawakkul in process. The feeling passes with practice; the intention to rely is what counts." },
      ],
    },

    semanticField: [
      { slug: 'sabr',    arabic: 'صَبْر',   transliteration: 'Sabr',    relationship: 'precedes',       relationshipLabel: 'Often precedes — sabr through difficulty builds the capacity to release outcomes', description: "The person who has practiced sabr through trials has, slowly, loosened their grip on how things must go. Tawakkul is often what sabr eventually produces — the heart that has endured enough learns to rest." },
      { slug: 'tawbah',  arabic: 'تَوْبَة', transliteration: 'Tawbah',  relationship: 'parallels',      relationshipLabel: 'Parallels — both are acts of turning toward Allah', description: "Tawbah turns toward Allah after having moved away. Tawakkul turns toward Allah for what comes next. Both are movements in the same direction — from self-reliance toward Divine reliance." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "Tawakkul is the heart's reliance upon Allah in seeking what benefits and repelling what harms — in matters of religion and of the world. It involves the heart doing its part, while the limbs do theirs. Whoever abandons the means has invalidated his tawakkul; whoever thinks the means are sufficient has invalidated his Islam.", source: 'Madārij al-Sālikīn' },
      { scholar: 'Al-Ghazali', text: "Know that tawakkul is a station of the heart — and it has a beginning, a middle, and an end. Its beginning is knowledge that all things are in the hand of Allah. Its middle is the heart's peace with that knowledge. Its end is the heart's complete rest, such that it has no preference between two states — for it knows that Allah's choice is better than its own.", source: 'Iḥyāʾ ʿUlūm al-Dīn' },
    ],

    hadith: [
      { text: "'Tie your camel, then rely on Allah.' A man came to the Prophet ﷺ and said: 'O Messenger of Allah, shall I tie my camel and rely on Allah, or shall I leave her untied and rely?' He said: 'Tie her, then rely on Allah.'", source: 'Al-Tirmidhi, 2517 (hasan)' },
      { text: "If you were to rely upon Allah with true reliance, He would provide for you as He provides for the birds — they go out in the morning hungry and return in the evening full.", source: 'Al-Tirmidhi, 2344 (hasan)' },
    ],

    acrossTransitions: `The idea of entrusting one's affairs to a higher power appears across traditions but takes distinctly different forms depending on the underlying theology.

In Stoic philosophy, the nearest concept is amor fati — love of fate. The Stoic releases attachment to outcomes because they are "not up to us" (Epictetus). But the Stoic does not entrust affairs to a personal Being — they accept an impersonal cosmic order. Tawakkul by contrast is intensely relational: you are not surrendering to fate but to a God who is aware of you, concerned with you, and actively providing for you.

Christian theology speaks of "casting your cares upon God" (1 Peter 5:7) and the abandonment to Divine Providence famously developed by Jean-Pierre de Caussade. These are among the closest parallels to tawakkul — active surrender to a caring personal God. The distinction lies in the Islamic insistence that means must be taken: Christian mystical traditions sometimes elevated complete passivity as the higher spiritual state; Islamic scholarship almost unanimously rejected this reading of tawakkul.

What is distinctively Quranic is the precision: the Quran commands action (deliberate, consult, plan) and then commands tawakkul. The two are not in tension; they are sequential. This makes the Islamic vision of spiritual maturity practically engaged rather than contemplatively withdrawn.`,

    relatedTerms: [
      { slug: 'sabr',   transliteration: 'Sabr',   term: 'صَبْر'   },
      { slug: 'tawbah', transliteration: 'Tawbah', term: 'تَوْبَة' },
    ],

    goDeeper: [
      { slug: 'al-imran',  surahName: 'Al-Imran',  note: 'Contains 3:159 — the sequential command: deliberate, decide, then make tawakkul.' },
      { slug: 'at-talaq',  surahName: 'At-Talaq',  note: 'Contains 65:3 — the unconditional promise: whoever relies upon Allah, He is sufficient for them.' },
    ],
  },

  // ── KHUSHU' ──────────────────────────────────────────────────────────────────

  khushu: {
    slug: 'khushu',
    term: 'خُشُوع',
    transliteration: "Khushu'",
    pronunciation: "khu-SHOO' · the 'kh' is guttural as in 'Bach'",
    category: 'States of the Heart',
    evocativeLine: 'The trembling stillness of the heart in the presence of the Real.',
    hasFullEntry: true,

    summary:
      "Khushu' is the state the Quran considers essential to prayer — not a feeling to manufacture but a capacity to develop. The root describes something that becomes low, still, and dry — like land that has been flattened by rain or a voice that drops to barely a whisper. In prayer, khushu' is when the heart becomes like that: quieted, directed, present. It is what transforms ritual movement into actual meeting.",

    root: {
      letters: 'خ-ش-ع',
      transliteration: 'khā-shīn-ʿayn',
      meaning: 'To become still, low, and subdued; to submit in the presence of something greater',
      elaboration:
        "The Quran uses this root for land that is barren and flat, waiting for rain to bring it back to life (41:39). It uses it for voices that drop to a hush (20:108). It uses it for a mountain that would split open in awe of the Quran (59:21). Each image carries the same core: something that was upright, loud, or full of itself — brought low, quieted, made ready to receive. This is what khushu' does to the heart in prayer.",
    },

    occurrenceCount: 17,
    occurrenceNote: "All forms of root خ-ش-ع across the Quran. A relatively rare root — which makes its placement at the opening of Surah Al-Mu'minun (23:1-2) all the more striking: the very first quality of the successful believers.",

    rootForms: [
      { arabic: 'خَشَعَ',    transliteration: 'khashaʿa',  type: 'Verb — Perfect',    meaning: '"It became still / humbled" — the state occurring',              approxCount: 5, verified: false },
      { arabic: 'يَخْشَعُ',  transliteration: 'yakhshaʿu', type: 'Verb — Imperfect',  meaning: '"Becomes still / humble" — ongoing or potential',               approxCount: 4, verified: false },
      { arabic: 'خُشُوع',   transliteration: "khushūʿ",   type: 'Verbal noun',       meaning: '"Humility / stillness / awe" — the quality as a noun',          approxCount: 2, verified: false },
      { arabic: 'خَاشِع',   transliteration: 'khāshiʿ',   type: 'Active participle', meaning: "\"One who has khushu'\" — the humble, present person",            approxCount: 3, verified: false },
      { arabic: 'خَاشِعِين', transliteration: 'khāshiʿīn', type: 'Plural — commendatory', meaning: "\"Those who have khushu'\" — used to describe believers and Prophets", approxCount: 3, verified: false },
    ],

    keyAyahs: [
      {
        ref: '23:1-2',
        arabic: 'قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ ٱلَّذِينَ هُمْ فِى صَلَاتِهِمْ خَٰشِعُونَ',
        translation: 'Successful indeed are the believers — those who in their prayer have khushu\'.',
        note: "The Quran opens its portrait of the successful believer not with the number of prayers, the length of worship, or the level of knowledge — but with this interior quality. Among all the virtues that could lead the list, it is khushu' in prayer. That placement is the Quran's commentary on what makes worship real.",
      },
      {
        ref: '59:21',
        arabic: 'لَوْ أَنزَلْنَا هَٰذَا ٱلْقُرْءَانَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُۥ خَٰشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ ٱللَّهِ',
        translation: 'Had We sent down this Quran upon a mountain, you would have seen it humble itself and split apart from the awe of Allah.',
        note: "This is the Quran's indirect diagnosis: if a mountain would crack open in khushu', what should the human heart be doing when it receives these words? The image is not to inspire fear but to measure — to help us feel the gap between what the Quran deserves and what we often bring to it.",
      },
      {
        ref: '2:45',
        arabic: 'وَٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى ٱلْخَٰشِعِينَ',
        translation: 'And seek help through patience and prayer — and indeed it is heavy except upon those who have khushu\'.',
        note: "Prayer, the Quran acknowledges, is heavy (kabīra). It is hard to do consistently and with presence. But the caveat: for those who have khushu', it is not heavy at all. The presence that makes prayer genuinely prayer also makes it genuinely light. This is both a diagnostic and a motivation: develop khushu' and prayer transforms.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Presence of heart', arabic: 'حضور القلب', arabicTranslit: 'ḥuḍūr al-qalb', description: "The heart is in the prayer, not elsewhere. This is the baseline: you are aware of what you are doing and Who you are doing it with. Al-Ghazali considered this the first and most essential condition — all others flow from it." },
        { number: 2, title: "Comprehension of meaning", arabic: 'التفهم', arabicTranslit: 'al-tafahhum', description: "Understanding what you are reciting. Khushu' is nearly impossible in words you do not understand. Learning even basic meanings of Al-Fatiha and common surahs transforms the quality of prayer." },
        { number: 3, title: 'Reverence (taʿẓīm)', arabic: 'التعظيم', arabicTranslit: "al-taʿẓīm", description: "A sense of the greatness of the One you are addressing. Not abstract theology but felt awareness: this is Allah. The scholars say this is the heart of khushu' — without it, presence and comprehension produce knowledge but not awe." },
        { number: 4, title: 'Hope and fear (rajā\' and khawf)', arabic: 'الرجاء والخوف', arabicTranslit: "al-rajā' wa-l-khawf", description: "Standing between hope and fear — hoping for Allah's mercy, aware of your own need. Al-Ghazali called this the emotional climate in which khushu' lives. Too much fear collapses into paralysis; too much hope becomes heedlessness. Khushu' lives in the balance." },
      ],
      stations: [
        { name: "Khushu' of the limbs", description: "Visible stillness: eyes cast down, no fidgeting, full bodily attention. This is the outer form of khushu' — necessary but insufficient. Even hypocrites showed this in the early community, which is why the Quran emphasizes the heart." },
        { name: "Khushu' of the heart", description: "The interior reality: the heart is quieted, turned fully toward Allah, not running to tomorrow's problems or yesterday's conversations. This is genuine khushu'. It transforms prayer from motion into meeting." },
        { name: "Khushu' as a sustained state", description: "What begins in prayer eventually extends: the person of sustained khushu' carries a quality of interior stillness into their day. Ibn al-Qayyim described this as the heart that has 'settled' — no longer restless, genuinely at home in the presence of Allah." },
      ],
      questions: [
        { question: 'My mind wanders constantly in prayer. Am I failing?', answer: "No — and the question itself shows you have khushu' enough to notice the wandering, which requires presence. The scholars say the reward is in the effort to return, not in perfect unbroken attention. Each return is itself a small act of khushu'." },
        { question: 'Is khushu\' an emotion or a practice?', answer: "Both — but primarily a practice. You do not wait to feel khushu' before praying well; you create the conditions (meaning, slowness, awareness) and the feeling follows. Al-Ghazali: 'Force the heart to khushu', and the emotion will come.'" },
        { question: 'Does khushu\' apply outside of prayer?', answer: "Yes — the Quran describes the final moment of hearing the Quran as producing khushu' (39:23), and the scholars describe khushu' in remembrance of Allah (dhikr), in supplication (du'a), and in the presence of the dying. But salah is its primary home." },
      ],
    },

    semanticField: [
      { slug: 'sabr',    arabic: 'صَبْر',   transliteration: 'Sabr',    relationship: 'precedes',  relationshipLabel: "Prepares the ground — the stilled self is a sab patient self", description: "The restless self cannot have khushu'. Sabr — the practice of holding and restraining — trains the inner capacity for stillness that khushu' requires." },
      { slug: 'tawbah',  arabic: 'تَوْبَة', transliteration: 'Tawbah',  relationship: 'deepens',   relationshipLabel: 'Deepens through — genuine tawbah produces real khushu\'', description: "The heart that has genuinely turned toward Allah in tawbah enters prayer differently. It has been through the humbling. This is why the scholars connected tawbah and khushu' as two faces of the same reorientation." },
    ],

    scholarsSaid: [
      { scholar: 'Al-Ghazali', text: "Khushu' is the fruit of the heart's presence before Allah. And the heart cannot be present while it is busy with the world. Therefore the first enemy of khushu' is not distraction but attachment — what you are attached to in the world will follow you into prayer until you release it.", source: 'Iḥyāʾ ʿUlūm al-Dīn' },
      { scholar: 'Ibn Rajab al-Hanbali', text: "True khushu' is the khushu' of the heart — not the bowing of the head and the drooping of the eyes, for many people perform that outwardly while their hearts are harder than stone.", source: "Al-Khushūʿ fī al-Ṣalāh" },
    ],

    hadith: [
      { text: "Verily the first thing to be lifted from this Ummah will be khushu', until you will see no one in it who has khushu'.", source: 'Al-Tabarani (Hadith scholars debate its grade; widely cited in this context)' },
      { text: "The person who prays does not receive from their prayer except what they were mentally present for.", source: 'Al-Nasa\'i, classified as sound by scholars of hadith' },
    ],

    acrossTransitions: `The question of interior presence in prayer is one every tradition that has prayer must eventually face: what distinguishes ritual motion from genuine worship?

In Jewish thought, the concept of kavanah (כַּוָּנָה) — intention and inner directedness — is nearly identical to khushu'. The Talmudic tradition holds that prayer without kavanah is like a body without a soul. The rabbinic debate over whether prayer requires kavanah at all (halacha generally requires it for at least the opening blessing) parallels the Islamic discussion about the minimum required for prayer to be valid versus prayer that is truly alive.

In Christian contemplative tradition, the Desert Fathers and later mystics (John of the Cross, Thomas Keating's centering prayer) developed extensive techniques for quieting the mind in the presence of God. The emphasis on releasing internal chatter and becoming fully present is remarkably close to the conditions for khushu'.

What is distinctively Quranic about khushu' is its placement: not in advanced mystical writings but at the opening of Surah Al-Mu'minun as the *first* quality of the successful believer. This is not reserved for the spiritual elite — it is the baseline expectation for every praying Muslim. That democratization of the interior life is characteristically Quranic.`,

    relatedTerms: [
      { slug: 'sabr',   transliteration: 'Sabr',   term: 'صَبْر'   },
      { slug: 'tawbah', transliteration: 'Tawbah', term: 'تَوْبَة' },
    ],

    goDeeper: [
      { slug: 'al-mu-minun', surahName: "Al-Mu'minun", note: "Opens with khushu' as the first quality of the successful believer — the Quran's definitive statement on what makes faith genuine." },
      { slug: 'al-baqarah',  surahName: 'Al-Baqarah',  note: '2:45 describes prayer as heavy except for those with khushu\' — the Quran\'s diagnosis of what makes worship light.' },
    ],
  },

  // ── NADAM ─────────────────────────────────────────────────────────────────────

  nadam: {
    slug: 'nadam',
    term: 'نَدَم',
    transliteration: 'Nadam',
    pronunciation: "na-DAM · 'a' as in 'cat' in both syllables",
    category: 'States of the Heart',
    evocativeLine: 'The remorse that precedes returning — the ache before the turn.',
    hasFullEntry: true,

    summary:
      "Nadam is the pang of regret — the internal recognition that something was lost by what you chose. It is not yet tawbah, but it is what makes tawbah possible. The Prophet ﷺ said 'al-nadam tawbah' — remorse is repentance — meaning nadam is the essential seed without which the turning cannot take root. But nadam that never moves becomes grief. The question nadam poses is always: will you stay in the feeling, or let it move you?",

    root: {
      letters: 'ن-د-م',
      transliteration: 'nūn-dāl-mīm',
      meaning: 'To regret, to feel remorse, to be sorrowful about a past action',
      elaboration:
        "The root ن-د-م appears relatively rarely in the Quran — which is instructive. The Quran does not dwell on regret; it mentions it at pivotal moments to show its function: it marks the turning point. When Qabil feels nadam after killing his brother (5:31), it does not redeem him — because it leads nowhere. When the Prophet ﷺ's companions feel nadam after the Battle of Uhud, it does lead somewhere. The word is not good or bad in itself — its moral weight depends entirely on what follows it.",
    },

    occurrenceCount: 6,
    occurrenceNote: "The root ن-د-م appears only ~6 times in the Quran — always marking a moment of recognition after an irreversible action. Its rarity makes each occurrence significant.",

    rootForms: [
      { arabic: 'نَدِمَ',     transliteration: 'nadima',    type: 'Verb — Perfect',    meaning: '"He regretted" — the feeling occurring',            approxCount: 2, verified: false },
      { arabic: 'نَدَم',      transliteration: 'nadam',     type: 'Verbal noun',       meaning: '"Regret / remorse" — the feeling as a concept',     approxCount: 1, verified: false },
      { arabic: 'نَادِم',     transliteration: 'nādim',     type: 'Active participle', meaning: '"One who regrets" — the person in remorse',          approxCount: 1, verified: false },
      { arabic: 'النَّادِمِين', transliteration: 'al-nādimīn', type: 'Plural participle', meaning: '"The regretful ones" — a state, not a commendation', approxCount: 2, verified: false },
    ],

    keyAyahs: [
      {
        ref: '5:31',
        arabic: 'فَأَصْبَحَ مِنَ ٱلنَّٰدِمِينَ',
        translation: 'And he became of the regretful.',
        note: "This is Qabil — who killed his brother and then watched a raven show him how to bury a body. The nadam here is devastating because it came too late to change anything and led to no turning back to Allah. This is nadam as dead end: the feeling without the movement. The Quran records it without judgment — simply: he regretted. What that regret became, it does not say.",
      },
      {
        ref: '49:6',
        arabic: 'فَتُصْبِحُوا۟ عَلَىٰ مَا فَعَلْتُمْ نَٰدِمِينَ',
        translation: 'And you would become regretful over what you have done.',
        note: "This verse warns against acting on unverified news — you may harm innocent people and then feel nadam. Here nadam is used as a warning, not a state to aspire to. The prevention is better than the cure. This Quranic usage reveals that nadam, while the seed of tawbah, is ideally avoided altogether by careful action.",
      },
      {
        ref: '39:56',
        arabic: 'أَن تَقُولَ نَفْسٌ يَٰحَسْرَتَىٰ عَلَىٰ مَا فَرَّطتُ فِى جَنۢبِ ٱللَّهِ',
        translation: "Lest a soul should say: 'Alas, what I have neglected in regard to Allah.'",
        note: "Though the word nadam does not appear here, this is the Quran's most vivid picture of nadam without redemption — the ultimate regret, on a day when regret cannot help. The word is ḥasra — an even deeper form of grief. The Quran mentions it as motivation: feel the nadam now, while it can still become tawbah.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognition', arabic: 'الإدراك', arabicTranslit: 'al-idrāk', description: "Nadam begins with seeing clearly what happened — not minimizing, not excusing, not comparing yourself to others who did worse. Just: I did this, and it mattered. This honest recognition is the necessary first moment." },
        { number: 2, title: 'Let it land', arabic: 'الشعور الحقيقي', arabicTranslit: 'al-shuʿūr al-ḥaqīqī', description: "Real nadam is felt, not performed. The heart actually registers the loss — of trust, of closeness to Allah, of the person you wanted to be. This feeling is not self-punishment; it is honesty about value. What you regret, you valued." },
        { number: 3, title: 'Move into tawbah', arabic: 'الانتقال إلى التوبة', arabicTranslit: 'al-intiqāl ilā al-tawba', description: "The purpose of nadam is to become tawbah. The Prophet ﷺ's equation — 'nadam is tawbah' — describes the ideal: nadam that immediately moves. Nadam that stays still, cycling in guilt without action, has lost its purpose and becomes a burden rather than a bridge." },
      ],
      stations: [
        { name: 'Nadam that leads forward', description: "The healthy form: the recognition of error produces an immediate orientation toward correction. This is what the Prophet ﷺ described. The feeling does not linger to punish — it surfaces, signals, and moves." },
        { name: 'Nadam that cycles', description: "The stuck form: regret that returns again and again without being released into tawbah or resolved into acceptance. This often looks like guilt but functions as pride — an unwillingness to accept that you erred and that Allah can forgive it." },
        { name: 'Nadam on the final day', description: "The Quran describes a form of nadam that is final and unredeemable — the regret of the Day of Judgment. This is why it motivates now: nadam in this world is a door that opens. Nadam on that day is a door that is closed." },
      ],
      questions: [
        { question: "How do I know if what I'm feeling is real nadam or just embarrassment?", answer: "Embarrassment is about how you appear to others. Nadam is about how you appear to Allah. If your regret changes when no one can see — if you feel it even in private — it is closer to real nadam." },
        { question: "I feel nadam but no tawbah comes. What do I do?", answer: "Begin tawbah anyway. The scholars say the intention to make tawbah can come before the feeling is complete. Ask Allah to give you tawbah: 'O Allah, You are al-Tawwāb — turn me.' The feeling often follows the action, not the other way around." },
        { question: 'Is it possible to have nadam without having wronged someone?', answer: "Yes — the Quran's prophets express something like nadam for missed opportunities of worship, for moments of heedlessness, for times when they could have done more. At higher spiritual stations, nadam is not only about sin but about incompleteness." },
      ],
    },

    semanticField: [
      { slug: 'tawbah',   arabic: 'تَوْبَة',   transliteration: 'Tawbah',   relationship: 'deepens',       relationshipLabel: 'Moves into — nadam is the doorway, tawbah is the room', description: "The Prophet ﷺ said 'al-nadam tawbah' — not as equivalence but as sequence. Nadam that moves becomes tawbah. Nadam that stays becomes a wound. The distance between them is the decision to turn." },
      { slug: 'istighfar', arabic: 'ٱسْتِغْفَار', transliteration: 'Istighfar', relationship: 'parallels',     relationshipLabel: 'Accompanies — the plea that voices what nadam feels', description: "As nadam arises in the heart, istighfar gives it a voice: 'Astaghfirullah' — I seek Allah's covering and forgiveness. The feeling (nadam) and the supplication (istighfar) work together as the complete interior and exterior of the turning." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "The Prophet's statement 'nadam is tawbah' does not mean they are identical. It means nadam is the most essential pillar of tawbah — for without it, the ceasing of the sin is mere exhaustion and the resolution is mere planning. Nadam is what makes tawbah real from the inside.", source: 'Madārij al-Sālikīn' },
      { scholar: 'Al-Muhasibi', text: "When the heart truly sees what it has done in relation to Who it has wronged, nadam comes on its own — it cannot be forced and it cannot be prevented. The question is only whether it will be allowed to become tawbah or whether the self will build a wall around it and call it 'being hard on myself.'", source: "Al-Riʿāya li-Ḥuqūq Allāh" },
    ],

    hadith: [
      { text: "Remorse is repentance.", source: "Ibn Majah, 4252 (and similar wordings in Ahmad and al-Hakim; classified as sound by multiple scholars)" },
    ],

    acrossTransitions: `Regret and remorse appear in every ethical tradition, but what to do with them differs significantly.

In secular psychology, guilt and remorse are carefully distinguished: guilt ("I did something bad") is considered healthy when it motivates repair; shame ("I am bad") is considered destructive when it attacks identity rather than behavior. Modern therapeutic approaches largely agree with the Islamic framework: feel the regret, let it signal, use it to change, then release it.

In Buddhist ethics, the concept of kukkucca (worry or remorse) is considered one of the "hindrances" — not because regret is wrong, but because prolonged dwelling on it interferes with present-moment awareness. The Buddhist approach is similar to the Prophetic one: acknowledge, resolve, and release. Do not let regret become a residence.

Christianity holds a more complex relationship with guilt and remorse: in many traditions, guilt is a gift — a sign that the conscience is alive. The Catholic sacrament of confession creates a formal structure for moving nadam into absolution. The Islamic understanding shares the importance of feeling the weight but insists — much like the Protestant critique of confession — that the direct path to forgiveness requires no intermediary.

What is distinctively Quranic is the framing of nadam as functional: it is not to be cultivated, refined, or dwelt in — it is to be moved through. The Quran's use of nadam almost always describes it at the point of transformation (or failed transformation), not as a permanent interior posture.`,

    relatedTerms: [
      { slug: 'tawbah',  transliteration: 'Tawbah',  term: 'تَوْبَة' },
      { slug: 'sabr',    transliteration: 'Sabr',    term: 'صَبْر'   },
    ],

    goDeeper: [
      { slug: 'az-zumar', surahName: 'Az-Zumar', note: "Contains the Quran's most urgent call not to let nadam wait — 39:56 describes the final regret that comes when tawbah is no longer possible." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SHUKR
  // ─────────────────────────────────────────────────────────────────────────────

  shukr: {
    slug: 'shukr',
    term: 'شُكْر',
    transliteration: 'Shukr',
    pronunciation: "shukr · the 'u' is short, like 'book' · rhymes with 'book-r'",
    category: 'States of the Heart',
    evocativeLine: 'Gratitude that moves from tongue to heart to action.',
    hasFullEntry: true,

    summary:
      "Shukr is usually translated 'gratitude,' but in the Quranic idiom it is an active, tri-dimensional state: recognition in the heart, acknowledgment on the tongue, and expression through the limbs. The Quran stakes an extraordinary claim about it: 'If you are grateful, I will certainly increase you' (14:7) — making shukr the only human act whose reward is literally more of what you are grateful for. Its opposite, kufr al-niʿmah (ingratitude for blessing), uses the same root as disbelief — signalling that the Quran understands ingratitude as a form of blindness to Reality.",

    root: {
      letters: 'ش-ك-ر',
      transliteration: 'shīn-kāf-rā',
      meaning: 'To thank, to be grateful, to acknowledge a favour',
      elaboration:
        "The root ش-ك-ر has an interesting etymological range: it can mean to recognise and praise, but also — in the context of animals — to produce much from little (a camel that gives abundant milk on sparse grazing was called shakūr). This gives shukr a productive quality: genuine gratitude generates more. The divine name al-Shakūr (the Supremely Grateful) is remarkable — it describes Allah as acknowledging and multiplying even the small deeds of His servants. Shukr is thus a loop: you recognise Allah's gifts → you act on them → Allah multiplies what you have → recognition deepens. The scholars emphasise that shukr of the heart is maʿrifa (recognition); shukr of the tongue is ḥamd (praise); shukr of the limbs is ṭāʿa (obedience). All three must be present for shukr to be complete.",
    },

    occurrenceCount: 75,
    occurrenceNote: 'All forms of the root ش-ك-ر appear approximately 75 times in the Quran — spanning the verb, verbal noun, active participle, and Divine name al-Shakūr. Pending full corpus verification.',

    rootForms: [
      { arabic: 'شَكَرَ',    transliteration: 'shakara',   type: 'Verb — Perfect (Form I)',   meaning: '"He was grateful / he thanked" — the act completed',       approxCount: 10, verified: false },
      { arabic: 'يَشْكُرُ',  transliteration: 'yashkuru',  type: 'Verb — Imperfect',          meaning: '"Is grateful / gives thanks" — ongoing or habitual',       approxCount: 18, verified: false },
      { arabic: 'ٱشْكُرْ',   transliteration: 'ushkur',    type: 'Verb — Imperative',         meaning: '"Be grateful!" — the Divine command to individuals',       approxCount: 6,  verified: false },
      { arabic: 'شُكْر',     transliteration: 'shukr',     type: 'Verbal noun (maṣdar)',       meaning: '"Gratitude / thankfulness" — the state as a noun',        approxCount: 5,  verified: false },
      { arabic: 'شَاكِر',    transliteration: 'shākir',    type: 'Active participle',          meaning: '"One who is grateful" — the grateful person',             approxCount: 8,  verified: false },
      { arabic: 'شَكُور',    transliteration: 'shakūr',    type: 'Intensified form',           meaning: '"Deeply, profoundly grateful" — habitual intense gratitude', approxCount: 5, verified: false },
      { arabic: 'ٱلشَّكُور', transliteration: 'al-Shakūr', type: 'Divine Name',               meaning: '"The Supremely Grateful" — Allah acknowledges and multiplies', approxCount: 4, verified: false },
    ],

    keyAyahs: [
      {
        ref: '14:7',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌ',
        translation: 'If you are grateful, I will surely increase you; but if you deny, indeed My punishment is severe.',
        note: "This is the Quranic charter for shukr — a conditional promise of the highest order. The contrast with kufr (denial/ingratitude) is deliberate: the Quran frames ingratitude not just as impolite but as a form of disbelief in the reality of the gift. The increase promised (la-azīdannakum) is left unspecified — more of whatever you are grateful for, in ways you may not expect.",
      },
      {
        ref: '2:152',
        arabic: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ',
        translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        note: "Here shukr is placed alongside dhikr (remembrance) as the two essential responses to divine relationship. The pairing is significant: remembrance is the cognitive act, gratitude is the affective act. Together they constitute presence before Allah. The prohibition 'do not be ungrateful' uses the same root as kufr — again making ingratitude adjacent to disbelief.",
      },
      {
        ref: '31:12',
        arabic: 'وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ حَمِيدٌ',
        translation: 'And whoever is grateful is only grateful for the benefit of himself. And whoever denies — Allah is Free of need and Praiseworthy.',
        note: "In Luqman's wisdom, shukr is radically reframed as self-benefit. Allah gains nothing from your gratitude — He is al-Ghanī, entirely self-sufficient. Gratitude is good for you. It opens the channels through which blessings flow; ingratitude closes them. This verse dismantles the idea that worship serves God rather than the worshipper.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognition in the heart', arabic: 'الاعتراف بالقلب', arabicTranslit: 'al-iʿtirāf bi-al-qalb', description: "Shukr begins with seeing the gift as a gift — tracing it back to its source. The scholars insist that the first condition is maʿrifa: knowing Who gave it. A blessing enjoyed without awareness of the Giver is, in the Quranic framework, a kind of blindness." },
        { number: 2, title: 'Acknowledgment on the tongue', arabic: 'الاعتراف باللسان', arabicTranslit: 'al-iʿtirāf bi-al-lisān', description: "The second dimension is verbal: to say 'Alhamdulillah,' to praise Allah, to tell others of the blessing. This is not performance — it is the overflow of a heart that has genuinely recognised. The Arabic word ḥamd (praise) is the verbal expression of shukr." },
        { number: 3, title: 'Expression through action', arabic: 'الجوارح', arabicTranslit: 'al-jawāriḥ', description: "The third and completing dimension: using the blessing in the way its Giver would approve of. Ibn al-Qayyim says this is the most demanding form — shukr of the limbs means your eyes, your wealth, your health, your time are deployed in obedience. The blessing becomes a vehicle for worship rather than merely a comfort." },
      ],
      stations: [
        { name: 'Gratitude for the obvious', description: "The entry level: gratitude for health, family, food, safety. Most people begin here. The Quran gently expands this level by pointing to blessings that go unnoticed: the alternation of night and day (3:190), the coolness of water (67:30), the paired creation of everything (36:36)." },
        { name: 'Gratitude through difficulty', description: "The intermediate station: finding shukr not despite hardship but within it. This is where sabr and shukr begin to overlap. The Prophet ﷺ described himself as praying until his feet swelled and being told: 'has Allah not forgiven your past and future sins?' — and responding: 'should I not be a grateful servant?'" },
        { name: 'Shukr as continuous presence', description: "The advanced station: a state of ongoing awareness that everything — including the breath you just drew — is gift. At this level shukr is less an emotion and more an orientation. Al-Junayd said the highest form of shukr is 'not using any blessing against its Giver.' The blessing is received, and immediately channelled back into closeness to Him." },
      ],
      questions: [
        { question: 'How can I be grateful when life is genuinely hard?', answer: "The Quran never commands us to pretend. Sabr and shukr can coexist. The Prophet ﷺ was grateful even in the hardest moments — not because he denied difficulty but because he could still see beyond it. Begin small: what can you genuinely see as blessing right now, even one thing? Shukr does not require the absence of pain." },
        { question: "I feel grateful but it doesn't change anything. Is the feeling enough?", answer: "In the Quranic framework, no — shukr is action. But the feeling is the necessary beginning. Ibn al-Qayyim compares shukr to a tree: the root is in the heart (recognition), the trunk is the tongue (praise), and the branches are the limbs (action). You cannot have branches without roots, but roots without branches are not yet a tree." },
        { question: 'Does saying Alhamdulillah count even if I do not fully feel it?', answer: "Yes — and the feeling often follows the saying. The Prophet ﷺ recommended saying certain phrases even before the feeling is present, because the saying trains the heart. But the goal is to work toward alignment: tongue expressing what the heart genuinely holds." },
      ],
    },

    semanticField: [
      { slug: 'sabr',    arabic: 'صَبْر',    transliteration: 'Sabr',    relationship: 'parallels',      relationshipLabel: 'Parallel axis — sabr in hardship, shukr in ease', description: "The Prophet ﷺ said 'the affair of the believer is wondrous: everything is good for him — if he is tested he is patient, and if he is blessed he is grateful.' Sabr and shukr are the two wings of the Muslim heart, covering the full range of human experience. Neither can be fully present without the other." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens',       relationshipLabel: 'Deepens — shukr grounds tawakkul in reality', description: "Genuine shukr for what has already been given makes tawakkul for what is yet to come natural and confident. You trust the Giver because you have seen Him give. Shukr is the memory that enables tawakkul's forward lean." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "Shukr is built on five pillars: the grateful person's humility before the One he thanks; love of the One he thanks; acknowledgment of His blessing; praise for it; and not using it in ways that displease the One who gave it. If any of these is missing, shukr is incomplete.", source: "Madārij al-Sālikīn" },
      { scholar: 'Al-Ghazali', text: "Know that the station of shukr is one of the highest stations, superior even to that of sabr — for patience is a state of one being tested, while gratitude is the state of one receiving favour. And the Divine gifts are more complete than the Divine tests.", source: "Iḥyāʾ ʿUlūm al-Dīn" },
      { scholar: 'Ibn Kathir', text: "Allah's statement 'If you are grateful I will increase you' is a definitive promise — and what Allah promises, He fulfills. The increase may be in wealth, health, knowledge, offspring, or faith itself. The grateful servant opens every door at once.", source: "Tafsīr Ibn Kathīr, on 14:7" },
    ],

    hadith: [
      { text: "Wonderful is the affair of the believer, for his affairs are all good, and this applies only to a believer. If something good happens to him, he is thankful, and that is good for him. And if something bad befalls him, he bears it patiently, and that is also good for him.", source: "Sahih Muslim, 2999" },
      { text: "Whoever does not thank people has not thanked Allah.", source: "Abu Dawud, 4811; Tirmidhi, 1955 — classified hasan" },
    ],

    acrossTransitions: `Gratitude is universal, but its metaphysics varies dramatically across traditions.

In contemporary positive psychology (Emmons, McCullough), gratitude is extensively studied as a human trait with measurable effects on wellbeing, social bonding, and mental health. The research consistently shows that grateful people are happier, healthier, and more prosocial. The Islamic framework shares this empirical observation but grounds it theologically: gratitude works not because of its psychological effects but because it realigns you with Reality.

In Stoic philosophy, gratitude was directed toward the rational universe (logos) rather than a personal God. Marcus Aurelius expressed something very similar to shukr: the discipline of noticing gifts already present rather than seeking more. But Stoic gratitude has no personal Giver — it is appreciation of circumstance. Quranic shukr is always relational: you are grateful to Allah, Who knows you gave thanks.

In Buddhist ethics, gratitude (kataññutā) is considered a virtue and a basis for merit. But the Buddhist framework has no creator to thank — gratitude is directed toward teachers, parents, and the conditions that enabled one's practice. This is shukr without its theological root.

What is uniquely Quranic is the feedback loop: shukr produces increase (14:7), which produces more to be grateful for, which deepens shukr. The believer who learns to see everything as gift enters an expanding spiral — gratitude becomes a mode of seeing rather than a response to specific events.`,

    relatedTerms: [
      { slug: 'sabr',    transliteration: 'Sabr',    term: 'صَبْر'   },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'khushu',  transliteration: "Khushu'", term: 'خُشُوع'  },
    ],

    goDeeper: [
      { slug: 'ibrahim', surahName: 'Ibrahim', note: "Surah 14 contains the definitive Quranic statement on shukr (14:7) — and explores what gratitude looks like in the life of a prophet who had very little external security." },
      { slug: 'luqman', surahName: 'Luqman', note: "Contains the wisdom tradition of shukr — including 31:12's radical reframe: 'whoever is grateful is only grateful for his own benefit.'" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BARZAKH
  // ─────────────────────────────────────────────────────────────────────────────

  barzakh: {
    slug: 'barzakh',
    term: 'بَرْزَخ',
    transliteration: 'Barzakh',
    pronunciation: "BAR-zakh · stress on first syllable · 'kh' is the soft guttural",
    category: 'The Unseen',
    evocativeLine: 'The barrier between two worlds — where the departed now dwell.',
    hasFullEntry: true,

    summary:
      "Barzakh means barrier, partition, or isthmus — something that separates two realms without eliminating either. In the Quran it appears in three distinct contexts: between two bodies of water that cannot mix (55:20), between the living and the dead (23:100), and between the sweet and salt seas (25:53). The theological usage that has most captured Islamic reflection is the middle one: the barzakh as the intermediate state after death and before resurrection. It is not heaven, not hell — it is the antechamber between this world and the next, a realm the Quran deliberately leaves veiled.",

    root: {
      letters: 'ب-ر-ز-خ',
      transliteration: 'bā-rā-zāy-khā',
      meaning: 'A barrier, an obstacle, something that separates two things from mingling',
      elaboration:
        "Interestingly, ب-ر-ز-خ is not a Semitic root in the usual sense — many Arabic linguists consider it a loanword, possibly from Persian (barzakh, meaning 'between'). This foreign origin is itself instructive: the concept resists easy categorisation within the Quranic vocabulary's normal patterns. The root in its verb forms means to place a barrier between things. What makes it theologically significant is its consistent Quranic use to mark the limit of the knowable — the barzakh is always at the edge of what we can reach.",
    },

    occurrenceCount: 3,
    occurrenceNote: 'The word barzakh appears exactly 3 times in the Quran: 23:100, 25:53, and 55:20. Each occurrence marks a different kind of barrier — between the living and dead, between two seas, and between salt and sweet water.',

    rootForms: [
      { arabic: 'بَرْزَخ',  transliteration: 'barzakh', type: 'Noun',   meaning: '"Barrier / partition / isthmus" — a separator between two states', approxCount: 3, verified: true },
    ],

    keyAyahs: [
      {
        ref: '23:100',
        arabic: 'وَمِن وَرَآئِهِم بَرْزَخٌ إِلَىٰ يَوْمِ يُبْعَثُونَ',
        translation: 'And behind them is a barzakh until the Day they are resurrected.',
        note: "This is the defining verse for the theological usage of barzakh. The soul at death enters a barrier-state — it cannot return to the world it left, and it has not yet reached the world to come. The verse appears in the context of those who, at death, finally wish they could return to do righteous deeds: the door is closed. The barzakh seals what was, and holds everything until resurrection.",
      },
      {
        ref: '25:53',
        arabic: 'وَهُوَ ٱلَّذِى مَرَجَ ٱلْبَحْرَيْنِ هَٰذَا عَذْبٌ فُرَاتٌ وَهَٰذَا مِلْحٌ أُجَاجٌ وَجَعَلَ بَيْنَهُمَا بَرْزَخًا وَحِجْرًا مَّحْجُورًا',
        translation: 'And it is He who has released the two seas — one fresh and sweet, and one salty and bitter — and placed between them a barrier and a forbidden partition.',
        note: "Here barzakh is a physical metaphor: the fresh and salt water meet at estuaries and coasts but do not fully merge. Modern oceanography has noted the phenomenon of haloclines — salinity gradients that can maintain distinct water masses. The Quran uses this physical reality as a sign pointing to a deeper pattern: Allah places barriers that preserve distinction. The barzakh of death is of the same order.",
      },
      {
        ref: '55:19–20',
        arabic: 'مَرَجَ ٱلْبَحْرَيْنِ يَلْتَقِيَانِ ۝ بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ',
        translation: 'He released the two seas, meeting — between them is a barrier they do not transgress.',
        note: "Surah Ar-Rahman repeats the image of the two seas with a key addition: lā yabghiyān — 'they do not transgress.' The barzakh enforces a limit that the seas themselves honour. This dimension of the barzakh as a divinely-maintained boundary runs through all three Quranic uses: it is not a wall the creatures could break through if they tried harder; it is a metaphysical distinction upheld by Allah's will.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Belief without specification', arabic: 'الإيمان بالغيب', arabicTranslit: 'al-īmān bi-al-ghayb', description: "The first and essential posture toward barzakh: to believe in it without demanding detail. The Quran says enough to make it real but deliberately witholds the imagery that attaches to jannah and jahannam. This is spiritually intentional: barzakh is beyond our categories." },
        { number: 2, title: 'Preparation through deeds', arabic: 'الاستعداد', arabicTranslit: 'al-istiʿdād', description: "The hadith literature describes the barzakh state as shaped by what one brought into it. The grave can be either a garden from the gardens of paradise or a pit from the pits of hellfire (Tirmidhi). The practical implication: what you carry into the barzakh is what you live in while there." },
        { number: 3, title: 'Remembrance of death', arabic: 'ذكر الموت', arabicTranslit: 'dhikr al-mawt', description: "The Prophet ﷺ described death as 'the destroyer of pleasures' and recommended its remembrance. Awareness of the barzakh is not morbidity — it is the correct setting of priorities. The traveller who knows there is a customs point at the border packs accordingly." },
      ],
      stations: [
        { name: 'The separation', description: "At death, the soul enters the barzakh and cannot return to the world it has left. Surah 23:100 records the desperate wish to go back — 'Perhaps I will do righteous deeds' — and the answer: 'It is only a word he is saying.' The barzakh establishes the finality of the earthly life as a period of action." },
        { name: 'The waiting', description: "The barzakh is an interval — min warāʾihim means 'behind them,' a state they are held in until the Day of Resurrection. What that waiting entails is known only partially through the hadith: the soul can experience either comfort or distress, and may be aware of some events in the world." },
        { name: 'The reunion', description: "At resurrection, the barzakh ends. The Quran describes the blowing of the trumpet (39:68) that ends the intermediate state and begins the accounting. The barzakh is temporary — not a final destination but a threshold." },
      ],
      questions: [
        { question: 'Can the dead hear us? Can we communicate with those in the barzakh?', answer: "The scholars differ. Some hold that the dead can hear greetings addressed to them (supported by hadiths about the Prophet ﷺ greeting those in graves). The Quran says 'you cannot make the dead hear' (27:80) in the context of those who will not respond to guidance — most scholars interpret this as a metaphor. Intercommunication of the kind séances claim is not permitted in Islamic theology." },
        { question: 'Is the barzakh punishment, or can it be peaceful?', answer: "Both. The hadith literature describes the barzakh state as differentiated by one's deeds. The martyr's soul is in green birds by the Throne (Muslim). The grave of a believer can expand and fill with light. The grave of a wrongdoer can compress. The Quran leaves the details sparse; the sunnah adds some texture without removing the mystery." },
        { question: 'What benefit is there in visiting graves?', answer: "The Prophet ﷺ visited graves and instructed the companions to do so, saying it 'reminds you of the hereafter.' Grave visitation is an act for the living — to recalibrate priorities — and an act for the dead — to extend salutations and prayers. Whether those prayers reach and benefit the deceased is affirmed by the majority of scholars based on Quranic and hadith evidence." },
      ],
    },

    semanticField: [
      { slug: 'al-ghayb', arabic: 'ٱلْغَيْب', transliteration: 'Al-Ghayb', relationship: 'deepens', relationshipLabel: 'Within — barzakh is a specific domain of the unseen', description: "Al-ghayb is the vast category; barzakh is one of its most intimate realities. Believing in the barzakh is part of believing in al-ghayb — the first quality the Quran describes in the believers of Al-Baqarah (2:3)." },
      { slug: 'jannah',   arabic: 'جَنَّة',   transliteration: 'Jannah',   relationship: 'precedes', relationshipLabel: 'Before — barzakh is the waiting room before the final destination', description: "For those destined for jannah, the barzakh is the antechamber. It is not jannah yet — but the hadith describes righteous souls experiencing something like its early breeze. The barzakh's quality is shaped by jannah's proximity." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "The barzakh is the abode between this world and the next. Whoever dies enters it, and he will remain there until resurrection. It is neither the world nor the hereafter — it is the middle stage, and its nature is unlike either. The soul in it continues to exist, to experience, and to await.", source: "Kitāb al-Rūḥ" },
      { scholar: 'Al-Qurtubi', text: "The scholars have established that the grave is the first station of the hereafter and the last station of the world. Whoever is saved from it — with Allah's mercy — is saved from what comes after it. And whoever is punished therein, his punishment is only an intensification of what he prepared with his own hands.", source: "al-Tadhkira fī Aḥwāl al-Mawtā" },
    ],

    hadith: [
      { text: "The grave is the first station of the hereafter. Whoever is saved from it, then what comes after is easier. And whoever is not saved from it, then what comes after is harder.", source: "Tirmidhi, 2308; classified hasan" },
      { text: "When the deceased is buried and his companions leave him, he hears the sound of their sandals departing. Then two angels come to him and ask him three questions...", source: "Bukhari, 1374 — abridged" },
    ],

    acrossTransitions: `The idea of an intermediate state between death and final judgment appears across many religious traditions, though its nature varies significantly.

In Catholic Christianity, Purgatory is the closest analogue — a state of purification after death before entry into Heaven. Like barzakh, it is temporary and transitional. Unlike barzakh, Purgatory is explicitly associated with purificatory suffering and can be influenced by the prayers and masses of the living on behalf of the dead. Islam shares the belief that du'a for the deceased is beneficial; it does not, however, hold that the barzakh necessarily involves purification.

Ancient Egyptian religion developed an elaborate intermediate-state theology: the deceased journeyed through the Duat, was weighed by Anubis on a scale against the feather of Ma'at, and either passed into the Field of Reeds or was consumed by Ammit. The imagery of scales echoes the Quranic mizan — though the theology differs completely.

In Jewish tradition, Gehinnom is understood as a place of post-death refinement lasting up to twelve months for most souls. The Quranic barzakh differs in that it does not necessarily involve active purification but rather a waiting state shaped by one's deeds.

What makes the Quranic barzakh unusual in comparative religion is its deliberate vagueness — the Quran gives enough to establish its reality and moral weight, but declines the elaborate imagery that other traditions provide. This is consistent with Islam's general restraint about the details of the unseen: enough to believe in, not so much as to distract from action in this world.`,

    relatedTerms: [
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
      { slug: 'jannah',   transliteration: 'Jannah',   term: 'جَنَّة'  },
      { slug: 'mizan',    transliteration: 'Mizan',    term: 'مِيزَان' },
    ],

    goDeeper: [
      { slug: 'al-muminun', surahName: "Al-Mu'minun", note: "Surah 23 contains the key barzakh verse (23:100) — embedded in a sequence about the soul's journey from creation through death to resurrection." },
      { slug: 'ar-rahman', surahName: 'Ar-Rahman', note: "The imagery of the two seas (55:19-20) presents barzakh as a cosmic principle — divine boundaries that uphold the order of creation." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // JANNAH
  // ─────────────────────────────────────────────────────────────────────────────

  jannah: {
    slug: 'jannah',
    term: 'جَنَّة',
    transliteration: 'Jannah',
    pronunciation: "jan-NAH · stress on second syllable · 'j' as in 'jar'",
    category: 'The Unseen',
    evocativeLine: 'The garden — a word that carries moisture, shade, and promise.',
    hasFullEntry: true,

    summary:
      "Jannah means 'garden' — from the root meaning to cover, to conceal, to become dense with vegetation. The word itself carries the experience: the coolness of shade, the sound of water, the concealment that makes a garden a sanctuary. The Quran uses the word over 140 times, building jannah not as a vague afterlife reward but as a vivid, specific, multi-layered reality — rivers, fruits, companions, and above all the closeness to Allah that no earthly metaphor fully captures. Its highest promise is not rivers of wine or silk garments but the vision of Allah Himself: 'Faces that Day will be radiant, looking at their Lord' (75:22-23).",

    root: {
      letters: 'ج-ن-ن',
      transliteration: 'jīm-nūn-nūn',
      meaning: 'To cover, to conceal, to be dense and lush with growth',
      elaboration:
        "The root ج-ن-ن is one of the most productive in the Quran. From it come: janna (to cover/conceal), jannah (the garden, paradise), jinn (the hidden beings), janān (the heart, the hidden inner self), and majnūn (the 'covered' one — insane, because reason is veiled). The garden is the place where things are densely covered — shaded, lush, enclosed. This etymology matters: jannah is not an abstract reward floating in space. It is a place of covering, of shelter, of being held. The Arabic root suggests that paradise is the ultimate sanctuary — the place where the soul is finally, completely protected.",
    },

    occurrenceCount: 147,
    occurrenceNote: 'Jannah and its plural jannāt appear approximately 147 times in the Quran — making it one of the most frequently referenced realities in the text. The plural form (gardens) is used as often as the singular, suggesting differentiated levels.',

    rootForms: [
      { arabic: 'جَنَّة',    transliteration: 'jannah',    type: 'Noun — singular',  meaning: '"The garden" — paradise, the singular realm',        approxCount: 66,  verified: false },
      { arabic: 'جَنَّات',   transliteration: 'jannāt',    type: 'Noun — plural',    meaning: '"Gardens" — paradise described in its multiplicity',  approxCount: 81,  verified: false },
      { arabic: 'جَنَّ',     transliteration: 'janna',     type: 'Verb — Perfect',   meaning: '"It covered / concealed" — the root action',         approxCount: 4,   verified: false },
      { arabic: 'جِنّ',      transliteration: 'jinn',      type: 'Noun (related)',   meaning: '"Hidden beings" — same root, different realm',        approxCount: 22,  verified: false },
      { arabic: 'جَنَان',    transliteration: 'janān',     type: 'Noun (related)',   meaning: '"The heart" — the inner, concealed self',            approxCount: 0,   verified: false },
    ],

    keyAyahs: [
      {
        ref: '75:22–23',
        arabic: 'وُجُوهٌ يَوْمَئِذٍ نَّاضِرَةٌ ۝ إِلَىٰ رَبِّهَا نَاظِرَةٌ',
        translation: 'Faces that Day will be radiant — looking at their Lord.',
        note: "This is the summit of jannah — not any physical comfort but the direct vision (ruʾyat Allah) of the Creator. Al-Qurtubi reports a hadith in Sahih Muslim where the Prophet ﷺ said: 'You will see your Lord as you see the full moon — you will have no trouble in seeing Him.' The paradox is in the language: wujūh nāḍira (radiant faces) and nāẓira (looking) — the light in the face is from what the eye is beholding.",
      },
      {
        ref: '9:72',
        arabic: 'وَعَدَ ٱللَّهُ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَٰتِ جَنَّٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَٰرُ خَٰلِدِينَ فِيهَا وَمَسَٰكِنَ طَيِّبَةً فِى جَنَّٰتِ عَدْنٍ ۚ وَرِضْوَٰنٌ مِّنَ ٱللَّهِ أَكْبَرُ',
        translation: "Allah has promised the believing men and believing women gardens beneath which rivers flow — eternal therein — and pleasant dwellings in gardens of perpetual residence. But the approval of Allah is greatest.",
        note: "The verse lists the physical pleasures of jannah — gardens, rivers, dwellings — and then pivots on a hinge: 'wa-riḍwānun min Allāh akbar.' The contentment/approval of Allah is greater than all of that. The scholars call this the crown of jannah: not the reward you receive but the relationship it represents. To have Allah pleased with you — that is the essence.",
      },
      {
        ref: '32:17',
        arabic: 'فَلَا تَعْلَمُ نَفْسٌ مَّآ أُخْفِىَ لَهُم مِّن قُرَّةِ أَعْيُنٍ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ',
        translation: 'No soul knows what has been hidden for them of comfort and delight — as a reward for what they used to do.',
        note: "The Prophet ﷺ reported Allah saying (hadith qudsi in Bukhari): 'I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has not occurred to any human heart.' This verse is the Quranic anchor of that tradition. Jannah is not describable in human categories — the Quran offers images not as specifications but as gestures toward something beyond the imagination.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Faith and righteous action', arabic: 'الإيمان والعمل الصالح', arabicTranslit: 'al-īmān wa-al-ʿamal al-ṣāliḥ', description: "The Quran consistently pairs these two as the prerequisites: 'those who believe and do righteous deeds' (2:25, 4:57, 10:9, and scores more). Faith alone without action, or action without genuine belief — neither is the complete picture. Jannah is the home of those whose inner reality (faith) and outer reality (action) are aligned." },
        { number: 2, title: "Allah's mercy", arabic: 'رحمة الله', arabicTranslit: 'raḥmat Allāh', description: "The Prophet ﷺ said: 'No one's deeds will enter them into paradise.' The companions asked, even him? 'Not even me — unless Allah covers me with His mercy' (Bukhari). Jannah is not earned in a transactional sense; it is granted through mercy, which deeds invite. This removes both despair (I have not done enough) and pride (I have done enough)." },
        { number: 3, title: 'Longing for it', arabic: 'الشوق', arabicTranslit: 'al-shawq', description: "The Prophet ﷺ described whoever 'loves to meet Allah' as someone Allah loves to meet — and entry into paradise is the ultimate meeting. The quality of longing for jannah is itself a spiritual state that shapes behavior: whoever truly longs for it will not find themselves doing what distances from it." },
      ],
      stations: [
        { name: "The levels of Jannah", description: "The Quran and sunnah describe jannah as multi-levelled: al-Firdaws (the highest), Jannat al-ʿAdn (gardens of perpetual residence), Dār al-Salām (the abode of peace). Entry into jannah is one thing; the level reached is another. The Prophet ﷺ said: 'The people of higher stations are seen by those below them as stars are seen on the horizon.'" },
        { name: "The greeting at the gates", description: "The Quran describes the angles greeting those who enter: 'Peace be upon you — you have done well, so enter it forever' (39:73). The greeting itself — salām — is jannah's atmosphere. The Prophet ﷺ described its gateways: eight gates, each named for an act that was its key (prayer, fasting, charity, jihad, and others)." },
        { name: "The vision of Allah", description: "Al-Firdaws al-Aʿlā — the highest reaches — is described as directly beneath the Throne, from which rivers of paradise flow. The greatest joy of jannah, the scholars unanimously hold, is the vision of Allah on Fridays (described in the hadith as a 'gathering' in jannah). This transforms jannah from a destination into a relationship." },
      ],
      questions: [
        { question: "The descriptions of jannah seem so physical. Is it really like that?", answer: "The Prophet ﷺ said: 'The Quran has described jannah to you in your language so that your hearts would incline toward it.' The physical descriptions are real, but they point beyond themselves — 'no eye has seen, no ear has heard' (Bukhari). Think of the descriptions as arrows: they point in the right direction but do not map the full territory. A creature of this world cannot fully conceive of a world without its limitations." },
        { question: "Can I ask Allah for specific things in jannah?", answer: "The Quran says: 'And therein is whatever the souls desire and delights the eyes' (43:71) — and 'you will have therein whatever you call for' (41:31). The hadith literature describes jannah as a realm of complete wish-fulfilment — but purified: the desires there are the desires of a purified soul, not the mixed, sometimes harmful desires of this world." },
        { question: "Should I think about jannah every day?", answer: "Yes — the scholars recommend daily reflection on jannah as part of what they call 'the medicine of the heart.' Ibn al-Qayyim dedicated a long section of his Ḥādī al-Arwāḥ to vivid meditation on jannah precisely because he believed it was motivating. The Prophet ﷺ said: 'Whoever is concerned about the hereafter, Allah will put richness in his heart.'" },
      ],
    },

    semanticField: [
      { slug: 'barzakh',  arabic: 'بَرْزَخ',  transliteration: 'Barzakh',  relationship: 'precedes', relationshipLabel: 'What comes before — barzakh leads toward jannah or jahannam', description: "The barzakh is the waiting room; jannah is one of the two possible destinations. What happens in the barzakh is shaped by what was done in this world, and shapes the quality of the jannah entered." },
      { slug: 'al-ghayb', arabic: 'ٱلْغَيْب', transliteration: 'Al-Ghayb', relationship: 'deepens',  relationshipLabel: 'Part of the unseen — jannah is the most beloved of what is hidden', description: "The Quran describes jannah in terms the intellect can partially grasp but the imagination cannot fully hold. To believe in jannah is to believe in al-ghayb — and that belief is what the Quran calls the first quality of the muttaqīn (2:3)." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "The people of jannah do not grieve for anything they left behind in this world — except the hours in which they did not remember Allah. And the greatest joy of jannah is not its rivers or its palaces but the vision of the Face of Allah — a joy so immense that it makes everything else seem negligible.", source: "Ḥādī al-Arwāḥ ilā Bilād al-Afrāḥ" },
      { scholar: 'Al-Nawawi', text: "Know that jannah is the ultimate purpose — and its greatest pleasure is the contentment of Allah. Everything else — the rivers, the companions, the food — is a frame. The picture itself is His Pleasure (riḍwān). This is why the verse says 'the riḍwān of Allah is greater' (9:72), even after listing all the physical pleasures.", source: "Sharḥ Ṣaḥīḥ Muslim" },
    ],

    hadith: [
      { text: "A space equal to a bow in paradise is better than everything the sun rises upon.", source: "Bukhari, 2793" },
      { text: "Allah said: 'I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has never occurred to any human heart.'", source: "Bukhari, 3244 (Hadith Qudsi)" },
    ],

    acrossTransitions: `The garden of paradise is one of humanity's oldest and most persistent images — appearing across civilizations long before Islam.

The Persian concept of pairi-daēza (walled garden) gave us the very word 'paradise' in English, through Greek paradeisos. The Persian paradise was a royal enclosed garden — lush, irrigated, filled with exotic animals — a symbol of the king's power and the land's flourishing. The Quranic jannah shares the garden imagery but radically democratises it: this garden belongs to every soul who earned it, not to royalty.

In ancient Mesopotamia, the Epic of Gilgamesh describes a garden of the gods with jewel-bearing trees and divine rivers — remarkably close to Quranic imagery. This is not coincidence: the imagery of garden-as-paradise appears to be pan-Semitic and pre-dates both Islam and the biblical tradition, suggesting it taps into something deeply embedded in desert-dwelling cultures where water and shade represent the ultimate luxury.

The Jewish concept of Gan Eden (Garden of Eden) is closest structurally — a garden from which humanity was expelled and toward which, in some rabbinic thought, the righteous will return. The Quran's jannah is not Eden restored but something qualitatively new: not a return to innocence but an elevation beyond it.

Christian theological traditions vary widely: some hold a highly physical Heaven; others (following Platonic influence) de-emphasise the body in the afterlife. The Catholic, Orthodox, and many Protestant traditions converge on the Beatific Vision — seeing God face to face — as heaven's essence, which aligns closely with the Quranic emphasis on the vision of Allah as jannah's highest pleasure.

What is distinctly Quranic is the insistence that jannah's descriptions are given in human language precisely because human language is all we have — while simultaneously insisting that the reality transcends all human language. This productive tension makes jannah always slightly beyond what the imagination can grasp, which is itself a mercy: the longing it creates is inexhaustible.`,

    relatedTerms: [
      { slug: 'barzakh',  transliteration: 'Barzakh',  term: 'بَرْزَخ'  },
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
      { slug: 'mizan',    transliteration: 'Mizan',    term: 'مِيزَان'  },
    ],

    goDeeper: [
      { slug: 'ar-rahman', surahName: 'Ar-Rahman', note: "The most vivid sustained description of jannah in the Quran — gardens with gushing springs, reclining on silk, fruits within reach, and glorious maidens of paradise. The refrain 'which of your Lord's favours will you deny?' frames every image as gift." },
      { slug: 'al-waqiah', surahName: "Al-Waqi'ah", note: "Describes the people of paradise in three groups, each with different stations — including the 'forerunners' (al-sābiqūn) who receive the richest descriptions of closeness to Allah." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AL-GHAYB
  // ─────────────────────────────────────────────────────────────────────────────

  'al-ghayb': {
    slug: 'al-ghayb',
    term: 'ٱلْغَيْب',
    transliteration: 'Al-Ghayb',
    pronunciation: "al-GHAYB · 'gh' is the soft gargling sound · 'ayb' rhymes with 'robe'",
    category: 'The Unseen',
    evocativeLine: 'The unseen realm — the first quality the Quran asks us to believe in.',
    hasFullEntry: true,

    summary:
      "Al-ghayb is the unseen — everything that lies beyond the reach of human senses and reason. The Quran opens by describing the successful believers as those 'who believe in al-ghayb' (2:3), making faith in the unseen the foundational act of the Islamic worldview. Al-ghayb is not ignorance or superstition: it is the recognition that Reality is larger than perception. It includes the angels, the jinn, the afterlife, divine decrees, and — at its summit — Allah Himself, Who is described as 'ʿĀlim al-ghayb wa-al-shahāda' (the Knower of the Unseen and the Witnessed). Crucially, the Quran insists that true knowledge of al-ghayb belongs to Allah alone.",

    root: {
      letters: 'غ-ي-ب',
      transliteration: 'ghayn-yāʾ-bāʾ',
      meaning: 'To be absent, to be hidden, to go beyond sight',
      elaboration:
        "The root غ-ي-ب means fundamentally to be absent from something — to go behind the horizon, to be out of sight. From it come: ghāba (he was absent), ghayba (absence), ghayb (the hidden/unseen), and ghaybūba (unconsciousness — the state of being absent from one's senses). In Arabic, when the sun sets, you say ghabat al-shams — 'the sun became ghāʾib,' absent. Al-ghayb is literally the realm that has 'gone behind the horizon' of human perception. The Quran's use of this root is profoundly philosophical: it says that the realms of meaning, causation, and divine reality are not absent — they simply lie beyond the horizon of what unaided human senses can reach.",
    },

    occurrenceCount: 49,
    occurrenceNote: 'The word ghayb and related forms appear approximately 49 times in the Quran. It is consistently paired with al-shahāda (the witnessed/present) — establishing a fundamental Quranic worldview of two complementary realms.',

    rootForms: [
      { arabic: 'ٱلْغَيْب',    transliteration: 'al-ghayb',    type: 'Noun — with definite article', meaning: '"The Unseen" — the specific realm beyond perception',      approxCount: 49, verified: false },
      { arabic: 'غَائِب',      transliteration: 'ghāʾib',      type: 'Active participle',             meaning: '"Absent one / the hidden" — what is not present',          approxCount: 3,  verified: false },
      { arabic: 'غَيْبَة',      transliteration: 'ghayba',      type: 'Verbal noun',                   meaning: '"Absence / disappearance" — the state of being hidden',    approxCount: 1,  verified: false },
      { arabic: 'يَغِيبُ',      transliteration: 'yaghību',     type: 'Verb — Imperfect',              meaning: '"It is hidden / it disappears" — the process of concealment', approxCount: 2, verified: false },
    ],

    keyAyahs: [
      {
        ref: '2:3',
        arabic: 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ',
        translation: 'Those who believe in al-ghayb, and establish prayer, and spend from what We have provided for them.',
        note: "The Quran's opening description of successful believers begins here — with belief in al-ghayb as the first quality named. This is architecturally deliberate: everything else (prayer, charity, belief in the prophets) builds on this foundation. A person who only believes what they can see and measure has, in the Quranic view, made their senses the final authority — which is a form of shirk (association) at the epistemological level.",
      },
      {
        ref: '6:59',
        arabic: 'وَعِندَهُۥ مَفَاتِحُ ٱلْغَيْبِ لَا يَعْلَمُهَآ إِلَّا هُوَ',
        translation: 'And with Him are the keys of the unseen; none knows them except Him.',
        note: "The mafātiḥ al-ghayb — the keys of the unseen — are then elaborated in the following verse as the five matters which only Allah knows: the Hour of resurrection, rainfall, what is in the wombs, what anyone will earn tomorrow, and where anyone will die. These five (al-umūr al-khams) become a cornerstone of Islamic theology: they are the specific limit of ghayb that no human can access.",
      },
      {
        ref: '72:26',
        arabic: 'عَٰلِمُ ٱلْغَيْبِ فَلَا يُظْهِرُ عَلَىٰ غَيْبِهِۦٓ أَحَدًا',
        translation: 'Knower of the unseen — He does not disclose His unseen to anyone,',
        note: "The verse continues: 'except to a messenger He has approved.' This establishes the principle of waḥy (revelation) as the only legitimate channel through which ghayb can be known by humans. The prophets receive ghayb through revelation; astrologers, psychics, and fortune-tellers claim ghayb without this channel — which is why the Quran and sunnah treat such claims as falsehood.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Epistemic humility', arabic: 'التواضع المعرفي', arabicTranslit: 'al-tawāḍuʿ al-maʿrifī', description: "The first requirement of believing in al-ghayb is acknowledging the limits of human knowledge. The Quran repeatedly asks: 'Do you know?' or 'Have you been informed?' about the unseen matters. Intellectual humility — not agnosticism — is the correct posture. We affirm what revelation tells us; we abstain from speculation about what revelation leaves silent." },
        { number: 2, title: 'Trusting the Messenger', arabic: 'تصديق الرسول', arabicTranslit: 'taṣdīq al-rasūl', description: "Since only prophets receive ghayb, belief in al-ghayb is inseparable from belief in prophethood. The one who says 'I believe in Allah but I need evidence for the unseen realities' has placed himself as the arbiter — which removes the need for a Messenger altogether. Islam's epistemology is clear: some things we know from reason, some from sensory experience, and some only from revelation." },
        { number: 3, title: 'Acting on what is hidden', arabic: 'العمل بالغيب', arabicTranslit: 'al-ʿamal bi-al-ghayb', description: "Belief in al-ghayb is not passive. The Quran describes those who 'believe in al-ghayb' and immediately 'establish prayer and spend' — faith in the unseen produces visible action. The angel recording deeds, the scale on the Day of Judgment, the garden waiting — all of these invisible realities should be as motivation-shaping as visible consequences." },
      ],
      stations: [
        { name: 'Al-Ghayb al-Mutlaq', description: "The absolute unseen: what only Allah knows and has never revealed — the exact moment of the Hour, what lies in the womb, the details of each soul's destiny. This domain is simply accepted; to claim knowledge of it is a major spiritual error." },
        { name: 'Al-Ghayb al-Muqayyad', description: "The relative unseen: what was ghayb until Allah revealed it through His prophets. Angels are ghayb — but we know their nature through revelation. Jannah is ghayb — but its general reality is known through waḥy. This domain is affirmed with confidence, based on the trustworthiness of the Messenger." },
        { name: 'The ghayb of intention', description: "Even within human experience, much is ghayb: the intentions of others, the future consequences of choices, what Allah knows of your heart that you yourself do not see clearly. Believing in al-ghayb cultivates a quality of humility about even personal knowledge." },
      ],
      questions: [
        { question: 'Can we use modern science to determine what is ghayb?', answer: "Science explores al-shahāda — the witnessed, measurable realm. When science confirms things the Quran revealed (ocean layers, embryonic stages, the expanding universe), this is a sign. But science cannot reach al-ghayb by design: it works through repeatable observation. The existence of souls, of angels, of divine decree — these are not measurable, and science's silence on them is not their disproof." },
        { question: 'Is believing in al-ghayb the same as being superstitious?', answer: "No — superstition is believing in unseen causes that have no basis (black cats, broken mirrors). Belief in al-ghayb is accepting the testimony of the most reliable source (Allah's revelation) about realities beyond perception. The distinction is epistemic: what is the source of your belief in the unseen? Superstition has no reliable source; Islamic belief in al-ghayb is grounded in revelation." },
        { question: 'Why does Allah keep the ghayb hidden?', answer: "The Quran suggests several reasons. One: hiddenness is what makes faith meaningful — if the Day of Judgment were visible now, 'belief' would be replaced by simple reaction to evidence. Two: hiddenness protects human agency — if you could see the recording angels and your fate, free choice would be coerced. The ghayb creates the space in which genuine faith — and therefore genuine virtue — can exist." },
      ],
    },

    semanticField: [
      { slug: 'barzakh', arabic: 'بَرْزَخ', transliteration: 'Barzakh', relationship: 'deepens', relationshipLabel: 'Within al-ghayb — barzakh is a specific hidden realm', description: "The barzakh belongs to al-ghayb: we know it exists through revelation; we cannot experience it while alive. Every specific element of the unseen — angels, jinn, jannah, jahannam, barzakh — is a named portion of the larger category." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: 'Enabled by — trust requires believing in what you cannot see', description: "Tawakkul is reliance on Allah Whose plan is, by definition, ghayb. You cannot see the wisdom in the trial, the outcome of the decision, or how the provision will come. Genuine tawakkul is only possible for someone who believes in al-ghayb — otherwise it is not trust, it is recklessness." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Taymiyyah', text: "Al-ghayb is of two kinds: what Allah has not disclosed to anyone from His creation — like the exact time of the Hour — and what He disclosed through His messengers. The first kind is sealed. The second kind is, through revelation, known to believers with certainty.", source: "Majmūʿ al-Fatāwā" },
      { scholar: 'Al-Ghazali', text: "The mark of the scholar in matters of ghayb is silence — not the silence of ignorance but the silence of reverence. The one who speaks freely about what Allah has not disclosed has made himself equal to the prophets. The correct posture is: I believe what I have been told; I accept what I have not been told; I do not demand what I have not been given.", source: "Iḥyāʾ ʿUlūm al-Dīn" },
    ],

    hadith: [
      { text: "The five things of the unseen are known only to Allah: the knowledge of the Hour, the sending of rain, what is in the wombs, what any soul will earn tomorrow, and where any soul will die.", source: "Bukhari, 4697; Muslim, 9 — summarising Quran 31:34" },
    ],

    acrossTransitions: `Every metaphysical tradition grapples with the question of what lies beyond human perception — and how we can have any legitimate knowledge of it.

Western philosophy since Kant has broadly distinguished the noumenon (the thing-in-itself, beyond perception) from the phenomenon (the thing as perceived). Kant argued we can only know phenomena — the noumenon is permanently inaccessible. This is similar to al-ghayb in some ways, but differs crucially: Islam holds that the noumenal realm is accessible through revelation, even if not through reason or sense alone.

In Sufi metaphysics, al-ghayb is elaborated into multiple levels — ʿālam al-ghayb (the unseen world) versus ʿālam al-shahāda (the witnessed world), with an intermediate realm of imagination (ʿālam al-khayāl or al-mithāl). Ibn al-ʿArabī in particular developed a sophisticated topology of the unseen worlds.

Secular materialism effectively denies al-ghayb: it holds that only what is measurable and observable is real. On this view, talk of souls, angels, or divine decrees is meaningless — not false, but literally nonsense. The Quran's response is not philosophical argument but an appeal to the structure of the real: 'Or were they created from nothing? Or were they the creators?' (52:35).

Interestingly, modern physics has introduced concepts that function somewhat like al-ghayb for the secular mind: quantum fields that cannot be directly observed, dark matter that comprises 27% of the universe but has never been seen, multiple dimensions predicted by string theory. These are 'unseen realities' accepted on the basis of theoretical frameworks — analogous, epistemologically, to accepting revelation. The difference is the source of testimony: mathematical models vs. prophetic transmission.`,

    relatedTerms: [
      { slug: 'barzakh', transliteration: 'Barzakh', term: 'بَرْزَخ'  },
      { slug: 'jannah',  transliteration: 'Jannah',  term: 'جَنَّة'   },
      { slug: 'mizan',   transliteration: 'Mizan',   term: 'مِيزَان'  },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Opens with the definitive description of the successful believers as those who believe in al-ghayb (2:3) — the foundation from which all other qualities proceed." },
      { slug: 'al-anam', surahName: "Al-An'am", note: "Contains the mafātiḥ al-ghayb — the five keys of the unseen known only to Allah (6:59) — embedded in a larger argument about divine sovereignty over all knowledge." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TAFSIR
  // ─────────────────────────────────────────────────────────────────────────────

  tafsir: {
    slug: 'tafsir',
    term: 'تَفْسِير',
    transliteration: 'Tafsir',
    pronunciation: "taf-SEER · stress on second syllable · long 'ee' at the end",
    category: 'Study Terms',
    evocativeLine: 'The science of uncovering what the Quran means — layer by layer.',
    hasFullEntry: true,

    summary:
      "Tafsir is the science and practice of explaining the Quran — uncovering its meanings, its historical context, its linguistic depths, and its legal and spiritual implications. The word means 'explanation' or 'unveiling': to make the hidden surface. Classical tafsir drew from Arabic language, hadith, companion reports, pre-Islamic poetry, and Jewish and Christian traditions. Modern tafsir adds historical-critical and thematic methods. But at its core, tafsir is the community's ongoing conversation with its scripture — begun by the Prophet ﷺ himself, who was the Quran's first and most authoritative interpreter.",

    root: {
      letters: 'ف-س-ر',
      transliteration: 'fāʾ-sīn-rāʾ',
      meaning: 'To uncover, to explain, to make clear, to disclose what was hidden',
      elaboration:
        "The root ف-س-ر carries the sense of revealing something that was covered. Related words include fassara (to explain), tafsira (a urine sample for diagnosis — the physician 'reads' what is hidden in the body), and in older Arabic, safara means to travel and to have the veil lifted from one's face. All share the sense of bringing the concealed to light. Tafsir of the Quran is thus 'lifting the veil' — not on the Quran itself, which is clear (mubīn), but on the reader's understanding, which needs assistance to fully receive what the Quran is offering.",
    },

    occurrenceCount: 1,
    occurrenceNote: "The word tafsīr appears only once in the Quran itself (25:33): 'and We have brought you the truth and the best tafsīr' — referring to the Quran as its own best explanation of itself. This single use has generated an entire discipline.",

    rootForms: [
      { arabic: 'فَسَّرَ',    transliteration: 'fassara',    type: 'Verb — Perfect (Form II)', meaning: '"He explained / interpreted" — the act of explaining',     approxCount: 1, verified: false },
      { arabic: 'تَفْسِير',   transliteration: 'tafsīr',     type: 'Verbal noun (Form II)',    meaning: '"Explanation / interpretation" — the discipline itself',  approxCount: 1, verified: true  },
      { arabic: 'مُفَسِّر',   transliteration: 'mufassir',   type: 'Active participle',        meaning: '"One who interprets" — the Quran scholar/commentator',   approxCount: 0, verified: false },
      { arabic: 'تَفَسَّرَ',  transliteration: 'tafassara',  type: 'Verb — Perfect (Form V)',  meaning: '"It became clear / explained itself" — the reflexive',   approxCount: 0, verified: false },
    ],

    keyAyahs: [
      {
        ref: '25:33',
        arabic: 'وَلَا يَأْتُونَكَ بِمَثَلٍ إِلَّا جِئْنَٰكَ بِٱلْحَقِّ وَأَحْسَنَ تَفْسِيرًا',
        translation: 'And they do not come to you with an argument except that We bring you the truth and the best tafsir.',
        note: "The only verse in the Quran containing the word tafsīr — and it is Allah speaking of His own Quran as the best explanation of itself. This establishes the first and highest principle of tafsir: al-Quran yufassiru baʿḍuhu baʿḍan — 'the Quran explains parts of itself through other parts.' When a verse is ambiguous, the first place to look is the Quran itself.",
      },
      {
        ref: '75:19',
        arabic: 'ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُۥ',
        translation: 'Then upon Us is its clarification.',
        note: "Allah takes responsibility for the Quran's clarification (bayān) — which the scholars interpret as happening through the Prophet ﷺ's sunnah and through the illumination He grants to scholars of each age. This verse grounds tafsir in divine aid: the Quran is not a closed text left to human interpretation alone, but an ongoing conversation in which Allah's guidance continues.",
      },
      {
        ref: '38:29',
        arabic: 'كِتَٰبٌ أَنزَلْنَٰهُ إِلَيْكَ مُبَٰرَكٌ لِّيَدَّبَّرُوٓا۟ءَايَٰتِهِۦ وَلِيَتَذَكَّرَ أُو۟لُوا۟ ٱلْأَلْبَٰبِ',
        translation: 'A blessed Book We have revealed to you, that they might reflect on its verses — and that those of understanding might be reminded.',
        note: "This verse names tadabbur (deep reflection) as the Quran's own stated goal for how it wants to be engaged. Tafsir is the structured discipline that enables tadabbur. Without tafsir, tadabbur can become unguided — the untrained reader imposing their own meanings. With tafsir as a foundation, tadabbur becomes deeper and more reliable.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Sources of tafsir in order', arabic: 'مصادر التفسير', arabicTranslit: 'maṣādir al-tafsīr', description: "Classical scholarship established a hierarchy: (1) Quran explains Quran. (2) Authentic sunnah — the Prophet ﷺ's own explanations. (3) Companion reports — those who witnessed the revelation in its context. (4) Language of the Arabs — the Quran revealed in Arabic must be read through mastery of classical Arabic. Any interpretation that contradicts a higher source is rejected." },
        { number: 2, title: "The forbidden: tafsir bi-al-ra'y", arabic: 'التفسير بالرأي المذموم', arabicTranslit: "al-tafsīr bi-al-raʾy al-madhmūm", description: "Not all opinion-based tafsir is rejected — the scholars distinguish tafsir bi-al-raʾy al-madhmūm (blameworthy opinion — imposing meaning without knowledge) from tafsir bi-al-raʾy al-maḥmūd (praiseworthy opinion — educated reasoning within established principles). The Prophet ﷺ warned: 'whoever speaks about the Quran from his own opinion, let him prepare his seat in the fire.'" },
        { number: 3, title: 'Reading the mufassirun', arabic: 'قراءة كتب التفسير', arabicTranslit: 'qirāʾat kutub al-tafsīr', description: "The great tafsir works are: Ibn Jarir al-Tabari (the comprehensive encyclopaedic foundation), Ibn Kathir (hadith-focused, widely accessible), Al-Qurtubi (legal and ethical emphasis), Al-Zamakhshari (language-focused), Sayyid Qutb's Fi Zilal al-Quran (modern, thematic), and Ibn Ashur's Al-Tahrir wa-al-Tanwir (linguistic and contextual). Each emphasises different dimensions of the text." },
      ],
      stations: [
        { name: 'Tafsir of the tongue', description: "The linguistic and grammatical explanation of the text: what the words mean, what the grammar implies, what the Arabic idiom conveys to native ears. This layer is necessary but not sufficient — you can understand every word and still miss the meaning." },
        { name: 'Tafsir of the mind', description: "The theological and analytical layer: how this verse relates to the doctrine of Islam, what it implies about belief, how it coheres with other verses. This is where the great systematic commentaries do their work — harmonising apparent contradictions, establishing rulings, drawing out principles." },
        { name: 'Tafsir of the heart', description: "What the scholars call al-tafsīr al-ishārī or tafsīr al-ṣūfiyyah — the spiritual dimension of meaning. How does this verse speak to the inner life? What does it demand of the soul? Ibn al-Qayyim excelled at this layer. It presupposes the first two layers are already in place; without them, 'tafsir of the heart' can slide into projection." },
      ],
      questions: [
        { question: 'Can I read the Quran in English and derive my own tafsir?', answer: "You can and should read translations and reflect on them — but you are reading a translation's choices, not the Arabic text itself. Many meanings cannot survive translation. Deriving Islamic rulings or claiming definitive meanings from translations alone would require the scholarly tools of tafsir. For personal reflection, translations are valuable; for academic interpretation, the Arabic and its scholarly tradition are necessary." },
        { question: 'Why are there different opinions in tafsir?', answer: "Because the Arabic allows multiple meanings, the historical context sometimes has multiple traditions, and scholarly principles sometimes yield different applications. Difference of opinion (ikhtilāf) in tafsir is not a weakness — it is the sign of a living tradition. What matters is that each opinion comes from a scholar with proper tools, not from personal preference disconnected from the tradition." },
        { question: 'How should a non-Arabic speaker approach tafsir?', answer: "Through translation combined with tafsir literature available in your language. Works like Ibn Kathir (widely translated), the Maarif-ul-Quran of Mufti Shafi, and the Quran Tafsir App (based on classical sources) make the tradition accessible. Learning even basic Quranic Arabic (50–100 key words) radically improves your engagement with the text." },
      ],
    },

    semanticField: [
      { slug: 'tadabbur', arabic: 'تَدَبُّر', transliteration: 'Tadabbur', relationship: 'deepens', relationshipLabel: 'Enables — tafsir is the ground, tadabbur is the walk', description: "Tafsir establishes the reliable meaning; tadabbur explores and inhabits that meaning. The mufassir maps the terrain; the mutadabbir walks it. Good tadabbur is always anchored in tafsir — otherwise reflection can become self-referential, finding in the Quran whatever the reader brings to it." },
      { slug: 'nazm',     arabic: 'نَظْم',    transliteration: 'Nazm',     relationship: 'deepens', relationshipLabel: 'Dimension within — tafsir must account for nazm', description: "The discipline of nazm (Quranic coherence) emerged partly as a response to tafsir's tendency to interpret verse-by-verse in isolation. The greatest modern tafsir works — Ibn Ashur, Islahi, Farahi — integrate nazm as a lens that transforms the reading of every individual verse by seeing its function within the whole." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Taymiyyah', text: "The best method of tafsir is to explain the Quran by the Quran — for what is summarised in one place is elaborated in another, and what is brief in one place is expanded elsewhere. Then the sunnah, for it explains the Quran and expounds it. Then the companions, who received the revelation in their time and whose Arabic was the language of the revelation. Then the tabi'un who learned from them.", source: "Muqaddima fī Uṣūl al-Tafsīr" },
      { scholar: 'Al-Suyuti', text: "There are fifteen sciences the mufassir requires: Arabic, morphology, grammar, language derivation, literary style, rhetoric, Quranic readings, theology, the principles of jurisprudence, the occasions of revelation, abrogation, the narratives of the Israʾiliyyat, the principles of jurisprudence applied to tafsir, the causes behind the Quran's order, and the science of Quranic interpretation itself.", source: "Al-Itqān fī ʿUlūm al-Qurʾān" },
    ],

    hadith: [
      { text: "Whoever speaks about the Quran from his own opinion — even if he is correct — has erred.", source: "Tirmidhi, 2952; Abu Dawud, 3652 — with various chains" },
      { text: "The best of you are those who learn the Quran and teach it.", source: "Bukhari, 5027" },
    ],

    acrossTransitions: `Scriptural interpretation is not unique to Islam — every tradition with a sacred text has developed hermeneutical methods. The comparison is illuminating.

Jewish biblical interpretation (midrash, Talmud, and later commentaries) shares several features with tafsir: attention to every word and letter, layered meaning (PaRDeS: literal, hinted, expounded, hidden), reliance on transmitted traditions, and vigorous internal debate. The major difference is that Jewish interpretation became more decentralised after the destruction of the Temple, developing through rabbinic council. Islamic tafsir retains a stronger anchoring in the prophetic sunnah as the primary interpretive frame.

Christian biblical hermeneutics developed through allegorical reading (Origen), literal-historical emphasis (Antiochene school), and the four senses of scripture (literal, allegorical, tropological/moral, anagogical). The Reformation's 'sola scriptura' created a hermeneutical crisis whose effects continue — when the tradition is removed, every reader becomes their own interpreter. Islamic tafsir explicitly resists this: the tradition (sunnah, companions, scholarly consensus) is not separate from the text but the lens through which it was always meant to be read.

Modern Western biblical criticism (historical-critical method) approaches scripture primarily as a human document embedded in history — examining authorship, redaction, and socio-political context. Some Muslim scholars engage with these methods; most hold that the Quran's divine origin means its meaning cannot be exhausted by historical method, which is a necessary but not sufficient lens.

What makes Islamic tafsir distinctive is its insistence on the Arabic language as a living vessel of meaning — not merely the historical language of a text, but the medium through which Allah chose to speak, with all its semantic range intact and significant.`,

    relatedTerms: [
      { slug: 'tadabbur',      transliteration: 'Tadabbur',      term: 'تَدَبُّر' },
      { slug: 'nazm',          transliteration: 'Nazm',          term: 'نَظْم'    },
      { slug: 'asbab-al-nuzul', transliteration: 'Asbab al-Nuzul', term: 'أَسْبَاب ٱلنُّزُول' },
    ],

    goDeeper: [
      { slug: 'al-furqan', surahName: 'Al-Furqan', note: "Contains the one Quranic use of tafsīr (25:33) — embedded in a response to those who challenged the Quran, with Allah declaring His own text the best explanation of itself." },
      { slug: 'al-qiyamah', surahName: 'Al-Qiyamah', note: "Contains the key verse 'upon Us is its clarification' (75:19) — grounding the ongoing interpretive tradition in divine responsibility." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TADABBUR
  // ─────────────────────────────────────────────────────────────────────────────

  tadabbur: {
    slug: 'tadabbur',
    term: 'تَدَبُّر',
    transliteration: 'Tadabbur',
    pronunciation: "ta-DAB-bur · stress on second syllable · 'dabb' rhymes with 'bob'",
    category: 'Study Terms',
    evocativeLine: "To ponder deeply — the Quran's own word for how it wants to be read.",
    hasFullEntry: true,

    summary:
      "Tadabbur is the Quran's own word for the manner in which it wants to be read. It appears four times in the Quran — always as a command or a rebuke to those who do not practice it. The root means to look at the back of something, to trace consequences, to follow a thing all the way to its end. To make tadabbur of the Quran is to follow its meanings all the way — to where they lead in your theology, your character, and your daily life. It is distinguished from tafsir (explaining) in that tafsir is primarily intellectual and tafsir is primarily transformative. Tadabbur is reading that does not stop at understanding but continues until it changes you.",

    root: {
      letters: 'د-ب-ر',
      transliteration: 'dāl-bāʾ-rāʾ',
      meaning: 'The back of something, the end, the consequence, to turn away from',
      elaboration:
        "The root د-ب-ر is rich: dubur is the back, the rear; dabbara means to manage/plan (looking at the consequences of actions); mudabbir is one who plans (the verse 79:5 describes angels as 'mudabbirāt amran' — those who regulate affairs); and tadabbara (Form V) means to reflect deeply on consequences, to trace something to its end. The Form V pattern intensifies and internalises: whereas dabbara means to plan something, tadabbara means to fully absorb and trace the implications of something — not a quick glance but a sustained gaze at where the thing leads. The Quran uses this Form V specifically for its own reading: not a casual encounter but a sustained, consequence-tracing engagement.",
    },

    occurrenceCount: 4,
    occurrenceNote: 'The verb yatadabbarūn and related forms appear exactly 4 times in the Quran: 4:82, 23:68, 38:29, and 47:24 — always in the context of how the Quran should be (and is not being) read. Its rarity and consistent context make each appearance significant.',

    rootForms: [
      { arabic: 'تَدَبَّرَ',     transliteration: 'tadabbara',     type: 'Verb — Perfect (Form V)',  meaning: '"He pondered deeply / traced consequences" — the act',     approxCount: 0, verified: false },
      { arabic: 'يَتَدَبَّرُونَ', transliteration: 'yatadabbarūna', type: 'Verb — Imperfect (Form V)', meaning: '"They reflect / ponder deeply" — ongoing engagement',        approxCount: 4, verified: true  },
      { arabic: 'تَدَبُّر',      transliteration: 'tadabbur',      type: 'Verbal noun (Form V)',     meaning: '"Deep reflection / pondering" — the discipline as a noun', approxCount: 0, verified: false },
      { arabic: 'مُدَبِّر',      transliteration: 'mudabbir',      type: 'Active participle (Form II)', meaning: '"One who manages / regulates" — used for divine management and angels', approxCount: 2, verified: false },
    ],

    keyAyahs: [
      {
        ref: '4:82',
        arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ ٱللَّهِ لَوَجَدُوا۟ فِيهِ ٱخْتِلَٰفًا كَثِيرًا',
        translation: 'Do they not reflect on the Quran? If it had been from anyone other than Allah, they would have found in it much contradiction.',
        note: "The first Quranic occurrence of the tadabbur command — and its form is a rebuke: 'do they not?' The tadabbur of the Quran is also an argument for its divine origin: sustained reflection reveals a coherence that cannot be humanly produced. This verse makes tadabbur simultaneously a spiritual practice and an intellectual exercise. The one who does it properly discovers both its effect on the heart and its evidence for the mind.",
      },
      {
        ref: '47:24',
        arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَآ',
        translation: 'Do they not reflect on the Quran, or are there locks on their hearts?',
        note: "Perhaps the most striking of the tadabbur verses — and the most diagnostic. The failure to engage in tadabbur is attributed to a spiritual condition: aqfāl (locks) on the hearts. The Quran is not unclear; the hearts are locked. This makes tadabbur not merely an intellectual method but a spiritual state — the heart must be unlocked (through tawbah, dhikr, sincere intention) before the meanings of the Quran can enter.",
      },
      {
        ref: '38:29',
        arabic: 'كِتَٰبٌ أَنزَلْنَٰهُ إِلَيْكَ مُبَٰرَكٌ لِّيَدَّبَّرُوٓا۟ءَايَٰتِهِۦ وَلِيَتَذَكَّرَ أُو۟لُوا۟ ٱلْأَلْبَٰبِ',
        translation: 'A blessed Book We have revealed to you, so that they may reflect on its verses — and that those of understanding might be reminded.',
        note: "This verse names the purpose of the Quran's revelation: tadabbur. Not recitation as a ritual act alone, not memorisation as a tribal achievement alone, but tadabbur — reflection that leads to tadhakkur (being reminded, awakened). Those who practice tadabbur are called ulū al-albāb — 'those possessing the cores,' people whose hearts are not locked but alive to meaning.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Slow recitation with presence', arabic: 'الترتيل مع الحضور', arabicTranslit: 'al-tartīl maʿa al-ḥuḍūr', description: "The Prophet ﷺ's recitation pace was slow and deliberate — every letter fully sounded. ʿĀʾisha described him as reciting 'letter by letter, with pauses.' This is the physical prerequisite of tadabbur: the mind cannot reflect while racing through words. Slow down until the words can land." },
        { number: 2, title: 'Single-verse depth over quantity', arabic: 'التعمق في الآيات', arabicTranslit: 'al-taʿammaq fī al-āyāt', description: "The companions sometimes spent the entire night reciting a single verse, returning to it again and again. This is the opposite of finishing the Quran quickly. Choose one verse per day and follow it all the way: its Arabic, its tafsir, its connection to other verses, its application to your life. This is tadabbur." },
        { number: 3, title: 'Asking how it speaks to you', arabic: 'السؤال عن المراد بك', arabicTranslit: 'al-suʾāl ʿan al-murād bika', description: "The final step is personal application: this verse, to me, now, in my life. This is not about abandoning the text's universal meaning but about receiving it personally. Ibn Masʿud said: 'when you recite a command, say: I hear and obey. When you recite a promise, feel hope. When you recite a warning, feel fear.' The text must land." },
      ],
      stations: [
        { name: 'Reading that understands', description: "The first station: you understand the words. This is what most translation-reading achieves. It is necessary but not yet tadabbur. The Quran's words are understood, but they have not yet traced their way through the heart." },
        { name: 'Reading that feels', description: "The second station: the meanings begin to move you. A verse about divine mercy produces gratitude; a verse about accountability produces awareness; a verse about the prophets produces love and longing. The heart is responding to what the mind understands. This is the beginning of tadabbur." },
        { name: 'Reading that transforms', description: "The highest station: the Quran changes what you do. A verse about generosity makes you more generous. A verse about anger makes you slower to anger. A verse about tawbah produces actual turning. The test of tadabbur is not how you feel during recitation but how you live between recitations." },
      ],
      questions: [
        { question: 'Can I make tadabbur without knowing Arabic?', answer: "Yes, with effort. Read a reliable translation, then read the tafsir of the verse, then sit with both and reflect. The Arabic enriches tadabbur immensely — even learning the key words of a verse (10-15 words) deepens engagement significantly. But the Quran was 'sent down in Arabic' so that it could be understood — Allah did not intend it only for Arabic speakers. The spirit of tadabbur is available to every sincere heart." },
        { question: 'What do I do when a verse does not move me?', answer: "This is the 47:24 diagnosis: locks on the heart. The prescription is not to try harder with the verse but to address the heart. Ibn al-Qayyim lists the causes of heart-lock: sin, excessive worldly attachment, inconsistency in worship, and heedlessness. The treatment is tawbah, dhikr, and du'a: 'O Allah, soften my heart to Your Book.'" },
        { question: 'Is it safe to make my own tadabbur without scholarly guidance?', answer: "Tadabbur is safe when grounded in tafsir. Personal reflection within the established meaning is not only safe but commanded. What is not safe is using personal reflection to reject established meanings or derive novel rulings. Think of tafsir as the map and tadabbur as the walk — you need the map to walk safely, but you still have to walk." },
      ],
    },

    semanticField: [
      { slug: 'tafsir', arabic: 'تَفْسِير', transliteration: 'Tafsir', relationship: 'precedes', relationshipLabel: 'Foundation — tafsir enables tadabbur to go deeper', description: "Tafsir answers 'what does this mean?' Tadabbur asks 'where does this meaning lead in me?' The two are complementary; tadabbur without tafsir can be imaginative but unreliable; tafsir without tadabbur can be precise but inert." },
      { slug: 'nazm',   arabic: 'نَظْم',    transliteration: 'Nazm',   relationship: 'deepens',  relationshipLabel: 'Deepened by — understanding nazm unlocks richer tadabbur', description: "When you see how a verse functions within the surah's architecture (nazm), your tadabbur gains a new dimension — you are no longer reflecting on a fragment but on a carefully placed element in a grand design. The surprise of a verse in context adds layers unavailable to isolated reading." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "There is no doubt that the reader's heart can grasp from the Quran's meanings what no interpreter has explicitly stated — because the Quran contains treasuries of knowledge, wells of wisdom, rivers of guidance, and reserves of divine mercy. Its depths are inexhaustible, its wonders do not end.", source: "Badāʾiʿ al-Fawāʾid" },
      { scholar: 'Imam Al-Nawawi', text: "One should reflect on the verses recited, and pursue their meanings. He should pause at the verses of mercy and ask, and at the verses of punishment he should seek refuge. At the glorification verses, he should glorify. At the supplication verses, he should supplicate. And he should understand what the verse is saying to him specifically — not just to those it was first addressed to.", source: "Al-Tibyān fī Ādāb Ḥamalat al-Qurʾān" },
    ],

    hadith: [
      { text: "Beautify the Quran with your voices. Verily, a beautiful voice increases the Quran in beauty.", source: "Abu Dawud, 1468 — related to the practice of slow, measured recitation that enables tadabbur" },
      { text: "The one who recites the Quran and it does not move him is not from us.", source: "Al-Bayhaqi — with discussion of chain; reflecting the standard that the Quran should produce an internal response" },
    ],

    acrossTransitions: `Deep scriptural reading is a practice found across religious traditions, though the method and goal vary.

Jewish lectio divina includes practices like shiur (sustained Torah study with a teacher), chazarah (repetitive review), and iyyun (slow analytical reading). The Talmudic culture of sustained textual engagement over years is perhaps closest in spirit to the companions' approach to the Quran — though the social structure differs: Talmud study is dialogical and debate-driven, while Quranic tadabbur is contemplative and individually transformative.

Christian lectio divina (sacred reading) is the closest formal analogue: a four-stage practice of reading (lectio), meditation (meditatio), prayer (oratio), and contemplation (contemplatio). The medieval monks developed this as a way of allowing scripture to transform the reader, not merely inform them. This parallels the Quranic emphasis: tadabbur is not merely comprehension but transformation.

Hindu mantra recitation engages with sacred syllables through repetition and internalization — the meaning gradually unfolds through sustained engagement. This has surface similarity to tadabbur but differs fundamentally: Quranic tadabbur is about following the meaning of propositional content to its implications, not about the transformative power of sound itself.

What is distinctive about the Quranic concept is that it self-names the practice: the Quran uses the word tadabbur for itself, commanding and rebuking as needed. No other major scripture has a word for 'the right way to read me' used repeatedly as a command. This makes tadabbur not a later scholarly invention but a divine instruction — built into the revelation from the beginning.`,

    relatedTerms: [
      { slug: 'tafsir',         transliteration: 'Tafsir',         term: 'تَفْسِير' },
      { slug: 'nazm',           transliteration: 'Nazm',           term: 'نَظْم'    },
      { slug: 'khushu',         transliteration: "Khushu'",        term: 'خُشُوع'   },
    ],

    goDeeper: [
      { slug: 'an-nisa', surahName: "An-Nisa'", note: "Contains the first Quranic use of the tadabbur command (4:82) — immediately after a passage about hypocrisy, making the failure to reflect a marker of spiritual disconnection." },
      { slug: 'muhammad', surahName: 'Muhammad', note: "Contains the most searching tadabbur verse (47:24) — 'or are there locks on their hearts?' — which has become the diagnostic question for every reader's engagement with the Quran." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NAZM
  // ─────────────────────────────────────────────────────────────────────────────

  nazm: {
    slug: 'nazm',
    term: 'نَظْم',
    transliteration: 'Nazm',
    pronunciation: "nazm · single syllable · 'a' as in 'jazz' · 'z' then 'm'",
    category: 'Study Terms',
    evocativeLine: 'The hidden architecture of the Quran — the coherence beneath the surface.',
    hasFullEntry: true,

    summary:
      "Nazm means 'arrangement' or 'threading' — as in threading pearls on a string. As a Quranic concept, it refers to the internal coherence of the Quran: the way surahs are not random collections of verses but architecturally unified compositions, each with a theme, a structure, and a logic that connects beginning to end. The scholars who developed this discipline — al-Razi, al-Biqa'i, Hamiduddin Farahi, and his student Amin Ahsan Islahi — argued that recognising nazm is necessary for correct tafsir. Without it, you interpret fragments; with it, you interpret a whole. Nazm is the discovery that the Quran's seemingly abrupt transitions and diverse topics conceal an exquisite internal logic.",

    root: {
      letters: 'ن-ظ-م',
      transliteration: 'nūn-ẓāʾ-mīm',
      meaning: 'To arrange in order, to string together, to compose in verse',
      elaboration:
        "The root ن-ظ-م means to arrange, specifically in the way pearls are threaded on a string — each element given its place and connected to the others in a meaningful sequence. From it come: naẓm (arrangement, poetry), naẓẓama (to compose, to arrange), and niẓām (order, system). Arabic poetry is called naẓm — verse is 'arranged' language as opposed to nathr (prose, which is 'scattered'). The Quranic discipline of naẓm applies this aesthetic concept to the structure of surahs: each surah is a naẓm — an arrangement where every element is placed with intention, connected to what comes before and after, forming a coherent whole.",
    },

    occurrenceCount: 0,
    occurrenceNote: "The word naẓm itself does not appear in the Quran — it is a term from the scholarly tradition used to describe a quality of the Quran's structure. Its absence from the text does not diminish its importance: the discipline of naẓm is the study of what the Quran does rather than what it says about itself.",

    rootForms: [
      { arabic: 'نَظَّمَ',   transliteration: 'naẓẓama',   type: 'Verb — Perfect (Form II)', meaning: '"He arranged / composed" — the act of structuring',    approxCount: 0, verified: false },
      { arabic: 'نَظْم',    transliteration: 'naẓm',      type: 'Verbal noun (Form I)',     meaning: '"Arrangement / poetry / threading" — the discipline', approxCount: 0, verified: false },
      { arabic: 'نِظَام',   transliteration: 'niẓām',     type: 'Noun (related)',           meaning: '"Order / system" — structured arrangement',          approxCount: 0, verified: false },
      { arabic: 'مُنَظَّم', transliteration: 'munaẓẓam',  type: 'Passive participle',       meaning: '"Arranged / organised" — the result of naẓm',       approxCount: 0, verified: false },
    ],

    keyAyahs: [
      {
        ref: '4:82',
        arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ ٱللَّهِ لَوَجَدُوا۟ فِيهِ ٱخْتِلَٰفًا كَثِيرًا',
        translation: 'Do they not reflect on the Quran? If it had been from anyone other than Allah, they would have found in it much contradiction.',
        note: "This is the Quranic argument for nazm: the absence of 'much contradiction' (ikhtilāf kathīr) is the sign of divine origin. The scholars of nazm argue this goes further — not only is there no contradiction, there is positive coherence: a unity of theme, purpose, and structure that reveals a single Author. Recognising nazm is, for these scholars, completing the tadabbur that this verse commands.",
      },
      {
        ref: '11:1',
        arabic: 'الٓر ۚ كِتَٰبٌ أُحْكِمَتْ ءَايَٰتُهُۥ ثُمَّ فُصِّلَتْ مِن لَّدُنْ حَكِيمٍ خَبِيرٍ',
        translation: 'Alif, Lam, Ra. A Book whose verses are perfected and then set out clearly — from One who is Wise and Aware.',
        note: "The word uḥkimat (from ḥikma — wisdom/precision) describes the Quran's verses as 'perfected' or 'made precise' before being elaborated. This precision is what nazm studies: each verse is placed with wisdom; each surah's architecture is designed. The verse itself models what it describes — a brief, exact statement followed by elaboration.",
      },
      {
        ref: '2:23',
        arabic: 'وَإِن كُنتُمْ فِى رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا۟ بِسُورَةٍ مِّن مِّثْلِهِۦ',
        translation: 'And if you are in doubt about what We have sent down upon Our servant, then produce a surah like it.',
        note: "The taḥaddī (challenge) of the Quran challenges at the level of the surah — not just individual verses. This is significant for nazm: the unit of the challenge is the surah-as-whole. The scholars of nazm argue that inimitability (iʿjāz) includes the coherence of the surah as an integrated composition — which human producers have never been able to replicate.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Identify the ʿamūd — the central column', arabic: 'تحديد العمود', arabicTranslit: "taḥdīd al-ʿamūd", description: "Farahi's method begins with identifying the ʿamūd — the central pillar or spine of the surah. This is the single most important theme around which everything else organises. For example, Al-Baqarah's ʿamūd is the concept of hidāya (guidance) — every passage relates to who is guided, how guidance comes, and what happens to those who reject it. Without identifying the ʿamūd, you cannot see the surah's coherence." },
        { number: 2, title: 'Identify the surah family (naẓāʾir)', arabic: 'تحديد النظائر', arabicTranslit: "taḥdīd al-naẓāʾir", description: "Surahs in the Quran are arranged in pairs and groups that illuminate each other — called naẓāʾir (counterparts). Al-Anfal and At-Tawbah are a pair; the seven long surahs (as-Sabʿ al-Ṭiwāl) form a group. Reading surahs in their family relationships reveals connections invisible when each is read in isolation. Islahi's 9-volume Tadabbur-e-Quran applies this method comprehensively." },
        { number: 3, title: "Read transitions as bridges, not breaks", arabic: 'قراءة الانتقالات', arabicTranslit: "qirāʾat al-intiqālāt", description: "The most common objection to the Quran's coherence is its 'abrupt transitions' — subjects seem to change without warning. Nazm resolves this: every apparent transition connects the preceding theme to the following one through a specific relationship (cause, consequence, contrast, elaboration, example). Learning to read transitions as bridges rather than breaks is the core skill of the student of nazm." },
      ],
      stations: [
        { name: 'Verse-level coherence', description: "The entry level of nazm: understanding how a verse connects to the verses immediately before and after it. Why does this verse follow that one? What does it add, qualify, or expand? This level of coherence can be found in the classical tafsirs but is often not made explicit." },
        { name: 'Surah-level architecture', description: "The intermediate level: seeing the surah as a unified composition with a beginning (muṭlaʿ), development, and conclusion (maqṭaʿ) that mirrors and answers the beginning. Al-Razi was perhaps the first to systematically note surah-level coherence; Farahi and Islahi built the most complete methodology for it." },
        { name: 'Quran-level unity', description: "The advanced level: the Quran as a single book with a coherent message and structure — the order of surahs as divinely arranged, not arbitrary. This is the most contested claim of nazm scholars, as the arrangement of surahs is generally understood as tawqīfī (divinely fixed), and its internal logic is a matter of ongoing scholarly debate." },
      ],
      questions: [
        { question: 'Did the classical scholars believe in nazm?', answer: "Some did — Al-Razi discussed it, Al-Biqa'i wrote extensively on surah connections, and Imam Al-Suyuti documented it. But it became a full discipline in the Indian subcontinent through Farahi and Islahi in the 20th century. The classical scholars were aware of connections but did not systematise them into a methodology the way Farahi did." },
        { question: 'Is nazm the same as ring composition or chiasm?', answer: "Related but distinct. Chiastic structure (where A-B-C is followed by C'-B'-A') is a form of nazm — the Quran uses it extensively. But nazm is broader: it includes linear development, thematic return, contrast structure, and surah-pairing — not only chiasm. The discovery of chiastic patterns in the Quran has been significant, with scholars like Raymond Farrin mapping complete surah chiasms." },
        { question: 'How does nazm help me in my daily Quran reading?', answer: "Once you understand a surah's central theme (ʿamūd), your daily reading of that surah shifts: every verse is now read against that theme, and apparent non-sequiturs resolve into necessary steps in the argument. The surah becomes a conversation rather than a list. Begin with shorter surahs — Al-Fatiha, Al-Kawthar, Al-Ikhlas — and trace their internal logic before moving to longer ones." },
      ],
    },

    semanticField: [
      { slug: 'tafsir',   arabic: 'تَفْسِير', transliteration: 'Tafsir',   relationship: 'deepens',  relationshipLabel: 'Transforms — nazm gives tafsir a structural lens', description: "Traditional tafsir without nazm is like art criticism that looks at individual brushstrokes but not the composition. Nazm teaches the tafsir reader to ask not only 'what does this verse mean?' but 'what is this verse doing in this position in this surah?'" },
      { slug: 'tadabbur', arabic: 'تَدَبُّر', transliteration: 'Tadabbur', relationship: 'deepens',  relationshipLabel: 'Enriches — understanding structure deepens reflection', description: "Tadabbur without awareness of nazm can be rich but fragmented — each verse reflects independently. When you know where a verse sits in the surah's architecture, your tadabbur gains depth: you are reflecting not on a bead but on a bead in its place on the string." },
    ],

    scholarsSaid: [
      { scholar: 'Hamiduddin Farahi', text: "The arrangement of the Quran is the greatest of its wonders. Its verses, surahs, and sections are interlocked with each other in a way that, when seen, leaves no doubt about the divine origin of this order. This nazm is not something human minds could produce — it is the architecture of a wisdom beyond all earthly wisdom.", source: "Dalāʾil al-Niẓām" },
      { scholar: 'Amin Ahsan Islahi', text: "A person who does not understand the coherence and unity of the Quran, and treats it as a collection of scattered verses and passages without internal connection — however learned he may be in other sciences — is not equipped for tafsir. For tafsir without nazm is tafsir of fragments, not of the Quran.", source: "Tadabbur-e-Quran, Introduction" },
      { scholar: 'Fakhr al-Din al-Razi', text: "Know that the most powerful aspect of the Quran's miraculous nature is its arrangement (tartīb). Whoever reflects on its surahs and its verses, and on how they connect, will understand that the Quran is like a single word in its coherence — each part necessary to every other part.", source: "Tafsīr al-Kabīr (Mafātīḥ al-Ghayb)" },
    ],

    hadith: [],

    acrossTransitions: `The discovery of literary architecture in sacred texts is not unique to Islam, but the specific claim that the Quran is a coherent unified composition is one of the bolder theses in Quranic studies.

Jewish literary scholarship has extensively mapped the chiastic structures of the Hebrew Bible — particularly in the Torah. The work of scholars like Umberto Cassuto on biblical narrative and more recently Yitzhak Peleg on Pentateuchal structure shows that ring composition is not a modern imposition but an ancient Near Eastern literary convention. The Quran uses similar structures, but they appear within individual surahs that were revealed over years — which, for scholars of nazm, makes their coherence even more remarkable.

Western Quranic studies in the 20th century was largely sceptical of surah-level coherence — influenced by source-critical methods that viewed the Quran as a compilation. Neal Robinson's 'Discovering the Quran' and later Raymond Farrin's 'Structure and Quranic Interpretation' brought structure analysis to academic Western Quranic studies and have significantly shifted the conversation.

Linguists interested in text linguistics (discourse analysis) have independently approached Quranic coherence through methods like theme progression analysis, topic continuity, and illocutionary force — finding that the Quran's apparent topic shifts are often cohesive devices common to sophisticated discourse. This provides a secular-academic parallel to the Muslim scholarly tradition of nazm.

What remains uniquely Islamic about the doctrine of nazm is its theological claim: the coherence is not the achievement of a human compiler but the intentional architecture of divine revelation, given in pieces over 23 years and yet forming a unity that surpasses what any single human composition could achieve. This is part of iʿjāz — the inimitability that the Quran itself challenges the world to match.`,

    relatedTerms: [
      { slug: 'tafsir',   transliteration: 'Tafsir',   term: 'تَفْسِير' },
      { slug: 'tadabbur', transliteration: 'Tadabbur', term: 'تَدَبُّر' },
      { slug: 'ijaz',     transliteration: "I'jaz",    term: 'إِعْجَاز' },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "The longest surah and the most extensively studied for nazm — Islahi's analysis of its seven sections and central theme of guidance is a masterclass in the discipline." },
      { slug: 'al-kahf', surahName: 'Al-Kahf', note: "Famous for its four chiastic narrative cycles (Cave, Two Gardens, Moses and Khidr, Dhul-Qarnayn) arranged around a central axis — one of the most studied examples of large-scale Quranic structure." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MIZAN
  // ─────────────────────────────────────────────────────────────────────────────

  mizan: {
    slug: 'mizan',
    term: 'مِيزَان',
    transliteration: 'Mizan',
    pronunciation: "mee-ZAAN · stress on second syllable · long 'aa' at the end",
    category: 'The Unseen',
    evocativeLine: 'The scale on which deeds weigh more than mountains.',
    hasFullEntry: true,

    summary:
      "Al-Mizan is the Scale — the instrument of divine justice on the Day of Resurrection. The Quran mentions it to assert a fundamental theological claim: the accounting of the afterlife is not arbitrary. Deeds have weight. Actions have consequences that are real, measurable, and recorded. The Quran does not specify the mizan's mechanism — it is from al-ghayb — but its function is clear: to make manifest what was hidden in the world, so that nothing unjust passes and nothing righteous goes unrecognised. A single word of sincere praise can outweigh a mountain's worth of negligence.",

    root: {
      letters: 'و-ز-ن',
      transliteration: 'wāw-zāy-nūn',
      meaning: 'To weigh, to measure, to balance',
      elaboration:
        "The root و-ز-ن gives us wazn (weight), wazana (to weigh), and mizan (the scale — the instrument of weighing). The same root appears in the Quran's call to give full measure in trade (11:85) — the mizan of commerce and the mizan of the Day are connected: Allah who demands honest scales in the market is the same Allah who holds the perfect scale at judgment. The plural form mawazin (scales) appears in key passages describing the Day, suggesting not a single weighing but a full accounting.",
    },

    occurrenceCount: 23,
    occurrenceNote: "The root و-ز-ن and its forms — including mizan, mawazin, and wazana — appear approximately 23 times in the Quran, spanning both worldly contexts (trade, balance in creation) and eschatological ones (the Day of Judgment).",

    rootForms: [
      { arabic: 'مِيزَان',  transliteration: 'mīzān',   type: 'Noun — instrument',     meaning: '"The scale / balance" — the instrument of weighing',        approxCount: 9, verified: false },
      { arabic: 'مَوَازِين', transliteration: 'mawāzīn', type: 'Noun — plural',          meaning: '"The scales" — the complete weighing on the Day',           approxCount: 7, verified: false },
      { arabic: 'وَزَنَ',   transliteration: 'wazana',  type: 'Verb — Perfect',        meaning: '"He weighed" — the act of measuring',                       approxCount: 2, verified: false },
      { arabic: 'وَزْن',    transliteration: 'wazn',    type: 'Verbal noun',           meaning: '"Weight / measure" — the quality of having substance',      approxCount: 3, verified: false },
      { arabic: 'ثَقُلَت',  transliteration: 'thaqulat', type: 'Verb (related context)', meaning: '"It became heavy" — used for scales that tip heavy with good deeds', approxCount: 2, verified: false },
    ],

    keyAyahs: [
      {
        ref: '101:6–9',
        arabic: 'فَأَمَّا مَن ثَقُلَتْ مَوَٰزِينُهُۥ ۝ فَهُوَ فِى عِيشَةٍ رَّاضِيَةٍ ۝ وَأَمَّا مَن خَفَّتْ مَوَٰزِينُهُۥ ۝ فَأُمُّهُۥ هَاوِيَةٌ',
        translation: "As for one whose scales are heavy — he will be in a pleasing life. But as for one whose scales are light — his refuge is the Pit.",
        note: "Surah Al-Qari'ah presents the two outcomes with stark economy: thaqulat (heavy) versus khaffat (light). The scales tip. The result is permanent. The Quran's eschatological precision here is theologically significant — the outcome is proportional and just, not capricious. What made the scales heavy was the quality of the life lived.",
      },
      {
        ref: '21:47',
        arabic: 'وَنَضَعُ ٱلْمَوَٰزِينَ ٱلْقِسْطَ لِيَوْمِ ٱلْقِيَٰمَةِ فَلَا تُظْلَمُ نَفْسٌ شَيْـًٔا',
        translation: "We shall set up the scales of justice for the Day of Resurrection — and no soul will be wronged at all.",
        note: "The phrase mawazin al-qisṭ — the scales of justice — contains a double assurance: the scales exist (they will be set up, naḍaʿu) and they are just (al-qisṭ). Then the most comprehensive guarantee in Quranic eschatology: lā tuẓlamu nafsun shayʾan — not a soul will be wronged even by the weight of a thing. This verse is a mercy: it means the accounting is real and it is fair.",
      },
      {
        ref: '99:7–8',
        arabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُۥ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُۥ',
        translation: "And whoever does an atom's weight of good will see it. And whoever does an atom's weight of evil will see it.",
        note: "These two verses — among the most memorised in the Quran — establish the precision of the mizan. Mithqāl dharra: the weight of a particle, the smallest conceivable unit. Nothing escapes the scale. The same precision that makes this terrifying for evil makes it luminous for good: no act of sincerity is too small to be seen and counted.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "Knowing what makes the scale heavy", arabic: "ما يثقّل الميزان", arabicTranslit: "mā yuthaqqil al-mīzān", description: "The Prophet ﷺ described two phrases that are 'light on the tongue, heavy on the Scale, beloved to the Most Merciful: Subḥān Allāh wa-bi-ḥamdihi, Subḥān Allāh al-ʿAẓīm' (Bukhari). The mizan rewards sincerity, not volume. A small deed done with full presence can outweigh a large deed done by habit." },
        { number: 2, title: "Giving full measure in this world", arabic: "الوفاء بالكيل", arabicTranslit: "al-wafāʾ bi-al-kayl", description: "The Quran connects earthly scales with the eschatological scale: 'Give full measure when you measure, and weigh with a straight balance' (17:35). The person who cheats in trade has already, in a sense, rejected the mizan — they have made themselves the arbiter of weight. Living honestly is a form of already honouring the Day of Scales." },
        { number: 3, title: "Counting your deeds before they are counted", arabic: "محاسبة النفس", arabicTranslit: "muḥāsabat al-nafs", description: "Umar ibn al-Khattab is reported to have said: 'Count yourselves before you are counted, and weigh yourselves before you are weighed.' Daily muhasaba (self-accounting) is the practice of placing your own deeds on the scale before the Day arrives — catching what is light and adding what is heavy." },
      ],
      stations: [
        { name: "The weight of character", description: "The Prophet ﷺ said: 'Nothing is heavier on the Scale on the Day of Resurrection than good character (ḥusn al-khuluq)' (Tirmidhi). Not ritual alone — but the quality of the heart expressed in daily dealings. The mizan rewards virtue embedded in life, not virtue performed for the record." },
        { name: "The weight of sincerity", description: "Ibn al-Qayyim says the weight of a deed is determined not by its size but by its ikhlas (sincerity) and its mutabaʿa (conformity with the Prophet's example). A small deed done with complete sincerity may be heavier than a large one done for reputation. The mizan weighs the soul's intention, not the action's appearance." },
        { name: "What erases from the scale", description: "The Quran warns about deeds that are 'rendered worthless' — by shirk (4:48), by showing off (4:142), by harming the recipients of charity (2:264). These deeds remain on the ledger but tip the scale the wrong way. The mizan makes visible not just what was done but how and why it was done." },
      ],
      questions: [
        { question: "Are deeds literally placed on a physical scale?", answer: "The Quran and authentic hadith affirm that the mizan is real — it is from the established realities of the unseen world. Whether it has a physical form identical to earthly scales is beyond what revelation specifies. The Ash'ari position is that we affirm its reality and trust Allah to make the weighing just, without speculating about its precise mechanism." },
        { question: "What about someone whose good and bad deeds are exactly equal?", answer: "The scholars discuss this — they are called ahl al-aʿraf (the People of the Heights, mentioned in 7:46). They stand between jannah and jahannam and are ultimately admitted to jannah through divine mercy, not through the weighing tipping either way. The mizan determines justice; mercy can supplement it." },
        { question: "Does the mizan weigh only deeds, or also intentions?", answer: "Both. The Prophet ﷺ said: 'Actions are by intentions' (Bukhari). The scholars hold that the mizan weighs the deed-as-intended — the intention is part of what gives the deed its weight. A sincere small deed is heavy; an insincere large deed may be light." },
      ],
    },

    semanticField: [
      { slug: 'al-ghayb', arabic: 'ٱلْغَيْب', transliteration: 'Al-Ghayb', relationship: 'deepens', relationshipLabel: 'Part of — mizan is a specific reality within the unseen', description: "The mizan is one of the realities of al-ghayb whose general nature is established by revelation. We know it exists; we know it weighs deeds; we know its outcome is just. The details of its mechanism belong to what is hidden." },
      { slug: 'barzakh', arabic: 'بَرْزَخ', transliteration: 'Barzakh', relationship: 'precedes', relationshipLabel: 'Followed by — barzakh leads to the day of the mizan', description: "The barzakh is the waiting period; the mizan is what the waiting resolves into. The soul in barzakh knows that the Scale is coming — which is why both the scholars and the Quran emphasise using the time before barzakh (this life) to ensure the scale will tip toward mercy." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "The heaviness of the scales on the Day does not come from the volume of deeds but from their truthfulness, their sincerity, and their conformity with what Allah loves. A word spoken with a heart full of Allah can outweigh years of empty ritual.", source: "Al-Wābil al-Ṣayyib" },
      { scholar: 'Al-Qurtubi', text: "The mizan is established by the Book and the Sunnah and the consensus of the scholars of Islam. It is one of the pillars of belief in the Last Day. Whoever denies it has denied what the Quran explicitly affirms.", source: "Al-Tadhkira fī Aḥwāl al-Mawtā wa-Umūr al-Ākhira" },
    ],

    hadith: [
      { text: "Two words are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: Subḥān Allāh wa-bi-ḥamdihi, Subḥān Allāh al-ʿAẓīm.", source: "Bukhari, 6682; Muslim, 2694" },
      { text: "Nothing is heavier on the Scale on the Day of Resurrection than good character.", source: "Tirmidhi, 2003 — classified hasan sahih" },
    ],

    acrossTransitions: `The concept of a divine scale for human deeds appears across multiple ancient traditions, though its theological grounding differs significantly.

The most famous parallel is the Egyptian tradition of the Weighing of the Heart — the Wāgning ceremony in which the deceased's heart was placed on a scale against the feather of Ma'at (truth/order). If the heart was lighter, the soul passed; if heavier (burdened by sin), it was devoured by Ammit. The imagery is strikingly similar to the Quranic mizan: a scale, two outcomes, divine justice. The difference is theological: in Egyptian religion, the heart was weighed against an impersonal cosmic principle; in Islam, the mizan is set up by a personal, merciful God who also wants the scale to tip toward His servants.

Zoroastrian eschatology includes the Chinvat Bridge — a crossing that widens for the righteous and narrows for the wicked — with a related weighing ceremony. The Persian influence on late antique religion is debated, but the convergence around weighing-of-deeds imagery is remarkable across cultures.

In Rabbinic Judaism, the concept of the heavenly ledger (sefer zikhronot) and divine accounting appears extensively in Rosh Hashanah liturgy: "On Rosh Hashanah it is written, on Yom Kippur it is sealed" — echoing the Islamic principle that all is recorded and will be accounted for.

What is uniquely Quranic is the precision: mithqāl dharra — the weight of an atom. This granularity goes beyond the general "good and bad deeds are weighed" of other traditions. The Quran insists that the accounting is exhaustive and that divine justice operates at the level of the smallest conceivable unit.`,

    relatedTerms: [
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
      { slug: 'barzakh',  transliteration: 'Barzakh',  term: 'بَرْزَخ'  },
      { slug: 'jannah',   transliteration: 'Jannah',   term: 'جَنَّة'   },
    ],

    goDeeper: [
      { slug: 'al-qariah',  surahName: "Al-Qari'ah",  note: "The shortest and starkest statement of the mizan: heavy scales, pleasing life; light scales, the Pit. A complete theology of divine justice in 11 verses." },
      { slug: 'al-zalzalah', surahName: 'Az-Zalzalah', note: "Contains the most precise statement of the scale's sensitivity — the weight of an atom of good or evil will be seen. Often memorised and meditated on together with Al-Qari'ah." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // JAHANNAM
  // ─────────────────────────────────────────────────────────────────────────────

  jahannam: {
    slug: 'jahannam',
    term: 'جَهَنَّم',
    transliteration: 'Jahannam',
    pronunciation: "ja-HAN-nam · stress on second syllable · 'j' as in 'jar'",
    category: 'The Unseen',
    evocativeLine: 'The fire whose true nature is beyond imagination.',
    hasFullEntry: true,

    summary:
      "Jahannam is the Quran's name for Hell — not derived from a common Arabic root but likely from a Hebrew or Aramaic cognate (Gehinnom — the Valley of Hinnom outside Jerusalem, associated with ancient fire rituals). The Quran describes it with seventy-seven names and countless images: layers of fire, boiling water, bitter fruit, crushing chains, and — most devastatingly — the withdrawal of divine mercy. Yet the Quran never presents Jahannam as Allah's desire; it appears always as a warning, always as something avoidable, always alongside the open door of tawbah. Its function in the Quran is motivational and just — not sadistic.",

    root: {
      letters: 'ج-ه-ن-م',
      transliteration: 'jīm-hāʾ-nūn-mīm',
      meaning: 'Deep, dark, yawning abyss — likely borrowed from Hebrew Gehinnom',
      elaboration:
        "The word jahannam has no clear Arabic triliteral root in the way most Quranic nouns do, which supports its status as a loanword. In Hebrew, Gehinnom (גֵּיהִנֹּם) refers to the Valley of Hinnom (ge-Hinnom) south of Jerusalem, where, according to biblical sources, children were sacrificed to the god Moloch by fire. The site became associated with fire, death, and abomination — and in Second Temple Judaism it developed into a metaphor for post-death punishment. The Quran inherits this word as a proper noun for the realm of punishment, stripped of its geographical reference and filled with its own revealed content.",
    },

    occurrenceCount: 77,
    occurrenceNote: "Jahannam appears 77 times in the Quran — making it one of the most frequently named realities in the text. The scholars note that it has been described by 77 names and attributes across the Quran and sunnah.",

    rootForms: [
      { arabic: 'جَهَنَّم',   transliteration: 'jahannam',   type: 'Proper noun',   meaning: '"Hell / the fire" — the realm of punishment',               approxCount: 77, verified: false },
      { arabic: 'جَحِيم',    transliteration: 'jaḥīm',      type: 'Related noun',  meaning: '"The blazing fire" — one of Hell\'s specific names',          approxCount: 26, verified: false },
      { arabic: 'سَعِير',    transliteration: 'saʿīr',      type: 'Related noun',  meaning: '"The raging flame" — another specific name for Hell',        approxCount: 16, verified: false },
      { arabic: 'لَظَىٰ',    transliteration: 'laẓā',       type: 'Proper noun',   meaning: '"The blazing fire" — used in Surah Al-Maʿarij',             approxCount: 1,  verified: false },
      { arabic: 'هَاوِيَة',  transliteration: 'hāwiya',     type: 'Noun',          meaning: '"The abyss / the pit" — used in Surah Al-Qari\'ah',         approxCount: 1,  verified: false },
    ],

    keyAyahs: [
      {
        ref: '67:8',
        arabic: 'تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ ۖ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌ',
        translation: 'It almost bursts with rage. Every time a group is thrown into it, its keepers ask them: did a warner not come to you?',
        note: "Two remarkable dimensions here: first, Jahannam is described as almost bursting with rage (tatamayyazu min al-ghayẓ) — it is personalised, furious, as if it resents those who ignored its warning. Second, the keepers' question — 'did a warner not come?' — establishes that entry is never arbitrary. The warner came. The message was given. Entry into Jahannam is by choice, however unconscious. This is justice, not cruelty.",
      },
      {
        ref: '39:71',
        arabic: 'وَسِيقَ ٱلَّذِينَ كَفَرُوٓا۟ إِلَىٰ جَهَنَّمَ زُمَرًا ۖ حَتَّىٰٓ إِذَا جَآءُوهَا فُتِحَتْ أَبْوَٰبُهَا',
        translation: 'And those who disbelieved will be driven to Hell in groups — until when they arrive there, its gates are opened.',
        note: "The contrast with jannah in 39:73 is architectural: the same surah describes both processions. Those entering jahannam are 'driven' (suq); those entering jannah 'arrive' (jāʾū) and are greeted with peace. The gates of jahannam open when they arrive — not welcomed, simply processed. The detail of groups (zumar) suggests that rejection of truth clusters socially — people influenced each other away from guidance.",
      },
      {
        ref: '4:56',
        arabic: 'إِنَّ ٱلَّذِينَ كَفَرُوا۟ بِـَٔايَٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًا كُلَّمَا نَضِجَتْ جُلُودُهُم بَدَّلْنَٰهُمْ جُلُودًا غَيْرَهَا لِيَذُوقُوا۟ ٱلْعَذَابَ',
        translation: "Indeed, those who disbelieve in Our verses — We will drive them into a fire. Every time their skins are roasted through, We will replace them with other skins so they may taste the punishment.",
        note: "This is among the most viscerally difficult verses in the Quran — and one that raises questions precisely because it is meant to. Al-Razi notes that this verse is proof of the body's resurrection: if only souls were punished, the replacing of skin would make no sense. The verse also points to the comprehensiveness of divine accounting — nothing in the body that participated in disbelief escapes its consequence.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "What leads toward Jahannam", arabic: "أسباب دخول النار", arabicTranslit: "asbāb dukhūl al-nār", description: "The Quran consistently names the causes: kufr (rejection of truth), shirk (associating partners with Allah), kibr (arrogance), and dhulm (injustice to others). These are not arbitrary categories — they are the modes by which a soul progressively distances itself from the reality of Allah until the distance becomes permanent." },
        { number: 2, title: "What protects from Jahannam", arabic: "الوقاية من النار", arabicTranslit: "al-wiqāya min al-nār", description: "The Prophet ﷺ said: 'Protect yourselves from the fire, even with half a date.' The smallest act of generosity is a shield. The Prophet ﷺ also described charity, dhikr, salah, and sincerity as protections. The Quran says: 'And whoever is saved from the fire and admitted to paradise — he has attained the real success' (3:185)." },
        { number: 3, title: "The mercy within the warning", arabic: "الرحمة في التخويف", arabicTranslit: "al-raḥma fī al-takhwīf", description: "The scholars of tafsir emphasise that every description of Jahannam in the Quran functions as a warning — and a warning is an act of love. Allah does not warn of Jahannam because He wants people in it; He warns because He wants people out of it. The Quran consistently places descriptions of Jahannam alongside invitations to tawbah, like a doctor describing a disease in order to motivate the patient to take the cure." },
      ],
      stations: [
        { name: "Jahannam as warning, not destiny", description: "The Quran never presents anyone as doomed before death. Every mention of Jahannam in relation to living people is conditional — 'if they continue,' 'unless they turn back,' 'those who reject.' The door of tawbah is open as long as life continues. Jahannam is the destination of choices, not of identities." },
        { name: "The levels of Jahannam", description: "The scholars identify seven levels based on Quranic names (Jahannam, Lazā, al-Ḥuṭama, al-Saʿīr, Saqar, al-Jaḥīm, al-Hāwiya). These levels are associated with different categories of transgression — the hypocrites are described as in the deepest level (4:145). The differentiation reflects the same divine precision as the mizan: the punishment fits the transgression." },
        { name: "What remains of mercy even there", description: "The Quran mentions that Jahannam's denizens who had faith but major sins may eventually be released through Allah's mercy (a position held by the majority of Sunni scholars based on multiple hadiths). The permanent residents of Jahannam — those who died in kufr — are those who, by their choices, had made the distance from Allah total and final." },
      ],
      questions: [
        { question: "How can a merciful God create Jahannam?", answer: "The Quran answers this question indirectly but completely: Jahannam is the consequence of human choices, not divine arbitrariness. Allah created the capacity for choice; He sent warners; He kept the door of tawbah open until the last breath. Jahannam is not created to punish — it is the place where the consequences of chosen distance from Allah are made real and permanent. Mercy was offered; it was refused." },
        { question: "Are the descriptions of Jahannam literal?", answer: "The mainstream position in Islamic theology is that the descriptions of Jahannam are real — not merely metaphorical — but that their true nature is beyond what we can fully imagine from this world's experience. Just as jannah's rivers are real but qualitatively beyond our rivers, Jahannam's fire is real but beyond our fire. The Prophet ﷺ said the fire of this world is one of seventy parts of Jahannam's fire." },
        { question: "What is the correct emotional relationship to Jahannam?", answer: "The Prophet ﷺ and the scholars consistently recommend a balance of khawf (fear of Jahannam) and rajāʾ (hope in Allah's mercy) — with neither overwhelming the other. Excessive fear without hope leads to despair (a sin in itself); excessive hope without fear leads to complacency. The Quran presents both consistently. Think of khawf and rajāʾ as the two wings of the bird of faith — both are needed to fly." },
      ],
    },

    semanticField: [
      { slug: 'tawbah', arabic: 'تَوْبَة', transliteration: 'Tawbah', relationship: 'precedes', relationshipLabel: 'The exit door — tawbah is what makes Jahannam avoidable', description: "Every description of Jahannam in the Quran is preceded or followed, somewhere in the text, by an invitation to return. The two are always in productive tension: Jahannam as the cost of turning away; tawbah as the way back before the turning becomes final." },
      { slug: 'jannah',  arabic: 'جَنَّة',  transliteration: 'Jannah',  relationship: 'parallels', relationshipLabel: 'The contrast — Jahannam is seen most clearly against Jannah', description: "The Quran consistently presents them together (39:71-73, 2:82,86), each illuminating the other. Jannah shows what acceptance looks like; Jahannam shows what rejection leads to. The believer holds both in view — motivated by love for jannah, sobered by awareness of jahannam." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim al-Jawziyyah', text: "Jahannam is the abode of those who chose distance from Allah. Its punishment is not alien to them — it is the full experience of what they chose in microcosm. They turned away from Allah's light, and Jahannam is darkness. They preferred the fire of their passions to the coolness of remembrance, and Jahannam is fire. In a profound sense, they are in Jahannam already — only without the permanence.", source: "Ḥādī al-Arwāḥ" },
      { scholar: 'Al-Ghazali', text: "Know that the fear of Jahannam is among the most profitable of all fears — for it drives the servant from every sin and toward every act of worship. But let the servant not be consumed by it to the point of losing hope in Allah's mercy, for the mercy of Allah is wider than His punishment, and His forgiveness awaits those who turn.", source: "Iḥyāʾ ʿUlūm al-Dīn" },
    ],

    hadith: [
      { text: "The fire of this world is one part of the seventy parts of the fire of Jahannam. The companions said: By Allah, even that would have been enough! He said: It has been made sixty-nine parts more intense.", source: "Bukhari, 3265; Muslim, 2843" },
      { text: "Protect yourselves from the fire, even with half a date. And if he cannot find one, then with a good word.", source: "Bukhari, 1413; Muslim, 1016" },
    ],

    acrossTransitions: `Hell is one of the most debated and reimagined concepts in the history of religion — and the disagreements reveal deep differences in how traditions understand justice, mercy, and the nature of the divine.

In biblical Christianity, Gehenna (the same root as Jahannam) appears in the New Testament as the place of final punishment — described with fire, worms, and outer darkness. Mainstream Catholic and Protestant theology holds that Hell is eternal for the unrepentant. However, the Christian theological tradition has increasingly engaged with universalism (ultimately all will be saved) and annihilationism (the wicked cease to exist rather than suffer eternally) as alternatives to eternal conscious torment. Islam, by contrast, holds that Jahannam is permanent for those who died in kufr, while believers who sinned may be eventually released through mercy.

Zoroastrian eschatology includes a 'House of Lies' (Druj-Demana) for the wicked — but crucially, the Zoroastrian vision ends in universal renovation (Frashokereti) where even the wicked are eventually purified. This universal restorationism is absent from mainstream Islamic theology, though it has been explored by some Sufi thinkers.

Buddhist cosmology contains multiple hell realms (Naraka) of different durations and intensities — but none are eternal. All hell states are temporary in Buddhist thought, with the duration proportional to the karma accumulated. This is closer to the Islamic position on believers who sin than to the Islamic position on kufr.

What is theologically distinctive about the Quranic Jahannam is its consistent contextualisation: it is always the consequence of choice, always preceded by a warning, and always presented alongside the mercy that makes it avoidable. The Quran does not dwell on Jahannam as spectacle but deploys its descriptions strategically — to motivate the living to choose differently.`,

    relatedTerms: [
      { slug: 'jannah',   transliteration: 'Jannah',   term: 'جَنَّة'   },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
    ],

    goDeeper: [
      { slug: 'az-zumar', surahName: 'Az-Zumar', note: "Contains the paired processions of those entering Jahannam and those entering Jannah (39:71-73) — the most architecturally balanced comparison of the two destinies in the Quran." },
      { slug: 'al-mulk', surahName: 'Al-Mulk', note: "Contains the dialogue between Jahannam's keepers and those entering it (67:8-11) — establishing the principle that entry is always preceded by a warner and is therefore always a consequence of choice." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MARYAM
  // ─────────────────────────────────────────────────────────────────────────────

  maryam: {
    slug: 'maryam',
    term: 'مَرْيَم',
    transliteration: 'Maryam',
    pronunciation: "MAR-yam · stress on first syllable · both syllables short",
    category: 'Quranic Characters',
    evocativeLine: 'The only woman named by name in the Quran — and her own surah.',
    hasFullEntry: true,

    summary:
      "Maryam bint Imran is the most honoured woman in the Quran — the only female figure to have a surah named after her, and the only woman named by name in the entire text. She appears in 11 surahs and is described as having been chosen twice over the women of the worlds (3:42). Her story is told not merely as the background to the birth of Isa — it is a complete theological argument: about sincerity, about divine provision, about the possibility of miracles, and about the courage to speak truth before a hostile world. She is the Quran's supreme portrait of a woman who lived entirely for Allah.",

    root: {
      letters: 'م-ر-ي-م',
      transliteration: 'mīm-rāʾ-yāʾ-mīm',
      meaning: 'A proper noun — likely from Aramaic/Hebrew Miriam, meaning "beloved" or "sea of bitterness"',
      elaboration:
        "Maryam is a proper noun rather than a common Arabic word, corresponding to Miriam (מִרְיָם) in Hebrew — the name of Moses's sister in the Torah. The name's etymology is debated: some scholars derive it from the Egyptian mr (beloved) + ymn (God's name), giving 'beloved of God.' Others trace it to the Hebrew root meaning 'bitterness' or 'sea.' The Quran uses it without etymological comment — the name is simply who she is. That the Quran gives this name to Isa's mother when the Gospel of Luke uses the same name (rendered 'Mary' in Greek) is part of the Quran's explicit engagement with the Abrahamic tradition.",
    },

    occurrenceCount: 34,
    occurrenceNote: "The name Maryam appears 34 times in the Quran — more often than in the New Testament (which mentions Mary/Miriam about 19 times). She has her own surah (Surah 19), and is mentioned in 11 different surahs.",

    rootForms: [
      { arabic: 'مَرْيَم', transliteration: 'Maryam', type: 'Proper noun', meaning: '"Maryam" — the name itself, occurring throughout the Quran', approxCount: 34, verified: false },
    ],

    keyAyahs: [
      {
        ref: '3:42',
        arabic: 'وَإِذْ قَالَتِ ٱلْمَلَٰٓئِكَةُ يَٰمَرْيَمُ إِنَّ ٱللَّهَ ٱصْطَفَىٰكِ وَطَهَّرَكِ وَٱصْطَفَىٰكِ عَلَىٰ نِسَآءِ ٱلْعَٰلَمِينَ',
        translation: 'And when the angels said: O Maryam, indeed Allah has chosen you and purified you and chosen you above the women of the worlds.',
        note: "The double use of iṣṭafā (chosen) is significant: first, Allah chose her for purification; second, He chose her above all women. Al-Qurtubi notes the repetition is not redundant — the first is the choice for spiritual distinction, the second is the choice for the miraculous role. She is addressed directly by the angels — an honour shared with very few human beings in the Quran.",
      },
      {
        ref: '19:23–25',
        arabic: 'فَأَجَآءَهَا ٱلْمَخَاضُ إِلَىٰ جِذْعِ ٱلنَّخْلَةِ قَالَتْ يَٰلَيْتَنِى مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا',
        translation: "And the pains of labor drove her to the trunk of a palm tree. She said: I wish I had died before this and had been completely forgotten.",
        note: "This is the most humanly intimate moment of Maryam's story — and the most extraordinary. Here she is: alone, in labor, afraid not of death but of the shame she knows is coming. Her words — 'I wish I had been completely forgotten' — are not despair but the prayer of someone who understands what she will face. The divine response is immediate and practical: 'shake the palm tree, eat, drink, and if you see any human, say: I have vowed silence to the Most Merciful.' Allah's answer to her grief is provision, not speech.",
      },
      {
        ref: '19:29–30',
        arabic: 'فَأَشَارَتْ إِلَيْهِ ۖ قَالُوا۟ كَيْفَ نُكَلِّمُ مَن كَانَ فِى ٱلْمَهْدِ صَبِيًّا',
        translation: 'She pointed to him. They said: How can we speak to one who is in the cradle, an infant?',
        note: "Her silence before her people — she has vowed it — and then her pointing to the infant Isa is one of the most dramatic moments in the Quran. She has no defense. She points. The baby speaks. This is the moment that vindicates everything: her sincerity before Allah produced the miracle that silence before the world could only direct attention to. Her trust in Allah's plan, expressed as a vow of silence, becomes the evidence of her innocence.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "Total dedication from before birth", arabic: "الإخلاص من القبل", arabicTranslit: "al-ikhlāṣ min qabl", description: "Maryam's mother dedicated her to Allah before she was born: 'I have dedicated what is in my womb entirely to You' (3:35). Maryam grew up in the masjid, raised by Zakariyya, in a state of constant worship. Her exceptional spiritual station was prepared through decades of sincere formation — a reminder that extraordinary closeness to Allah rarely comes without extraordinary formation." },
        { number: 2, title: "Scrupulous guarding of honour", arabic: "صون العرض", arabicTranslit: "ṣawn al-ʿirḍ", description: "When the angel appeared to her in human form, her first response was to invoke the Most Merciful as a shield: 'I seek refuge in the Most Merciful from you, if you are conscious of Him' (19:18). Her guard was not timid or fearful — it was principled. The Quran calls her the one who 'guarded her private part' (66:12) — her purity was not passive but actively maintained." },
        { number: 3, title: "Trusting Allah's plan in the face of shame", arabic: "الثقة في الله رغم الشنعة", arabicTranslit: "al-thiqa fī Allāh raghm al-shanaʿa", description: "What Maryam faced on returning to her people with an infant is almost impossible to imagine: the certain social condemnation of a community that would see only evidence of the unthinkable. She did not explain — she pointed. The willingness to be misunderstood rather than defend yourself with words, trusting that Allah will speak for you, is one of the highest spiritual postures in the Quran." },
      ],
      stations: [
        { name: "The woman of siddiqiyya", description: "The Quran calls her ṣiddīqa (66:12) — one of the profoundly truthful, a title shared with Abu Bakr in Islam. This is the highest description of a human being below prophethood: a person whose inner state and outer life are in complete correspondence, who witnesses divine truth and lives it completely." },
        { name: "The mother of a miracle", description: "Maryam's role in the birth of Isa without a father is the Quran's most explicit miracle attributed to a human being's obedience. Allah tells her: 'So it will be — Allah creates what He wills' (3:47). She is the vessel through which one of Allah's greatest signs enters the world — not because of her power but because of her purity and submission." },
        { name: "The model for every believer", description: "The Quran presents Maryam not only as historical figure but as an archetype: 'And Allah presents an example of those who believed: the wife of Pharaoh... and Maryam' (66:11-12). She is placed alongside Asiyah (wife of Pharaoh) as the two female models of faith for all believers — male and female." },
      ],
      questions: [
        { question: "Is Maryam a prophet in Islam?", answer: "The majority of Muslim scholars do not classify Maryam as a prophet (nabiyya) — prophethood in the classical definition is specific to those who received wahy with a mission to convey. However, some scholars (including Ibn Hazm) held that she was a prophet because she received divine communication through the angel. Most classical scholars classify her as a ṣiddīqa — the highest station below prophethood." },
        { question: "How does the Quranic Maryam compare to the Biblical Mary?", answer: "The Quran presents substantially the same narrative as Luke's Gospel in its core: the angel's appearance, the miraculous conception, the birth. Key differences: the Quran places the birth under a palm tree rather than in a stable; it includes her vow of silence and the baby Isa speaking in the cradle (not in any Gospel). The Quran does not narrate Mary's adult life with Isa or her role at the crucifixion (which the Quran does not affirm as having occurred)." },
        { question: "Why is Maryam the only woman named in the Quran?", answer: "The scholars have offered several reasons: her story requires her name for narrative clarity (she is also the mother of a prophet, and Isa is consistently identified as Ibn Maryam — Son of Maryam); her individual spiritual excellence merits individual identification; and she is a model for all believers by name, not merely by role. Other women in the Quran are significant but defined by their relationships — wife of, mother of. Maryam stands named in her own right." },
      ],
    },

    semanticField: [
      { slug: 'sabr', arabic: 'صَبْر', transliteration: 'Sabr', relationship: 'deepens', relationshipLabel: 'Embodied — Maryam is sabr made into a life', description: "Maryam's entire story is a study in sabr: waiting in the masjid, bearing the angel's news alone, enduring labor alone under a palm tree, facing her community's judgment in silence. She did not argue, did not complain, did not flee. She pointed. This is sabr at its summit: not endurance through gritted teeth but complete trust expressed through stillness." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: 'Highest example — she entrusted everything', description: "When she had no explanation to give and the condemnation was certain, she pointed at the infant and entrusted the outcome entirely to Allah. This is the Quranic definition of tawakkul in action: you have done your part (guarded your honour, submitted to the divine plan), and now you let Allah speak for you." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Kathir', text: "The scholars of Islam agree that Maryam bint Imran is the best of the women of this world. The Prophet ﷺ said: 'The best of the women of the worlds are: Maryam bint Imran, Khadijah bint Khuwaylid, Fatimah bint Muhammad, and Asiyah wife of Pharaoh.' Her rank is thus established by prophetic testimony as the highest among all women ever created.", source: "Tafsīr Ibn Kathīr, on Surah Maryam" },
      { scholar: 'Al-Qurtubi', text: "She combined in herself all the qualities that constitute the summit of human excellence for a woman: complete chastity, deep worship, truthfulness before Allah, and the courage to face a world that did not believe her. The Quran does not merely tell her story — it presents her as proof of divine power and as a model for every soul that wishes to be close to Allah.", source: "Al-Jāmiʿ li-Aḥkām al-Qurʾān, on 3:42" },
    ],

    hadith: [
      { text: "The best of the women of the worlds are: Maryam bint Imran, Khadijah bint Khuwaylid, Fatimah bint Muhammad, and Asiyah wife of Pharaoh.", source: "Ahmad, 2663; classified sahih by Al-Albani" },
      { text: "Many men have reached perfection, but of women none reached perfection except Maryam bint Imran and Asiyah wife of Pharaoh.", source: "Bukhari, 3411; Muslim, 2431" },
    ],

    acrossTransitions: `Maryam/Mary occupies a unique position across the Abrahamic traditions — honoured in all three, but differently shaped by each.

In Catholic and Orthodox Christianity, Mary holds the title Theotokos (God-bearer) — a theological statement that what she bore was divine. She is venerated, prayed to as intercessor, and associated with a range of apparitions and miracles across Christian history. The Marian tradition in Christianity is enormously elaborate — rosary prayers, special feast days, Marian apparitions (Lourdes, Fatima), and theological controversies about her perpetual virginity and bodily assumption. Islam affirms her purity and virginity but stops well short of the doctrines that developed around her in Christianity.

In Protestant Christianity, the Reformation significantly reduced the role of Mary — retaining her as the blessed mother but removing intercessory functions. This 'de-Marianisation' made Protestantism in some ways closer to the Islamic position: honour her, but direct worship only to God.

In Judaism, Miriam (Moses's sister, same name) is honoured as a prophetess, but the New Testament Mary has no significant status in Jewish theology. The name connects the traditions, but the figure they name has evolved differently in each.

What is remarkable about the Quranic presentation is its detail and sympathy. The Quran narrates Maryam's inner experience — her wish to have died before the birth, her fear, her aloneness — in ways that make her intensely human rather than iconographic. She is not a figure to be prayed to; she is a figure to be learned from. The Quran humanises her precisely so that the reader can enter her story and ask: what would I have done in her place?`,

    relatedTerms: [
      { slug: 'sabr',    transliteration: 'Sabr',    term: 'صَبْر'   },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
    ],

    goDeeper: [
      { slug: 'maryam', surahName: 'Maryam', note: "Surah 19 — entirely named after her, containing the most complete narrative of her story from birth through the cradle speech of Isa." },
      { slug: 'ali-imran', surahName: "Ali 'Imran", note: "Contains the theological context of Maryam's conception, her dedication, and the angel's address (3:35-47) — the narrative of her family." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // IJAZ
  // ─────────────────────────────────────────────────────────────────────────────

  ijaz: {
    slug: 'ijaz',
    term: 'إِعْجَاز',
    transliteration: "I'jaz",
    pronunciation: "ee-JAZ · stress on second syllable · 'j' as in 'jar'",
    category: 'Study Terms',
    evocativeLine: "The Quran's inimitability — the challenge that has never been met.",
    hasFullEntry: true,

    summary:
      "Iʿjāz al-Qurʾān is the doctrine of the Quran's miraculous inimitability — the claim that the Quran is a text that no human being, alone or in collaboration, could produce or even approach. The word means 'rendering incapable' — the Quran renders its challengers incapable of matching it. The Quran itself issues this challenge (taḥaddī) multiple times: produce a book like it, then ten surahs like it, then one surah like it. Fourteen centuries of Arabic literature — the richest poetic tradition in the world — have not produced a convincing response. Iʿjāz is thus not merely a claim about the Quran's beauty; it is a standing argument for its divine origin.",

    root: {
      letters: 'ع-ج-ز',
      transliteration: 'ʿayn-jīm-zāy',
      meaning: 'To be incapable, to be unable, to be weakened and rendered powerless',
      elaboration:
        "The root ع-ج-ز means fundamental inability — ʿajaza means 'he was unable,' ʿajz means 'weakness/incapacity,' and aʿjaza means 'to render someone incapable.' Iʿjāz is the fourth form verbal noun: 'the rendering incapable.' The doctrine of iʿjāz al-Qurʾān thus says: the Quran renders its challengers incapable. The word is also related to ʿajuz (old person, one diminished in strength) — the sense of incapacity runs through all its uses. Al-Bāqillāni wrote the first systematic treatise on this doctrine (Iʿjāz al-Qurʾān), establishing the vocabulary and framework that Islamic theology has used ever since.",
    },

    occurrenceCount: 7,
    occurrenceNote: "The taḥaddī (challenge) verses appear at 52:34, 11:13, 10:38, 2:23, and 17:88 — five escalating challenges, plus the general statement of 17:88 that jinn and humans together could not produce its like. The word iʿjāz itself is a scholarly term, not a Quranic one.",

    rootForms: [
      { arabic: 'عَجَزَ',    transliteration: 'ʿajaza',   type: 'Verb — Perfect',         meaning: '"He was unable / incapable" — the state of weakness',        approxCount: 3, verified: false },
      { arabic: 'إِعْجَاز',  transliteration: "iʿjāz",    type: 'Verbal noun (Form IV)',   meaning: '"Rendering incapable" — the doctrine of inimitability',     approxCount: 0, verified: false },
      { arabic: 'مُعْجِزَة', transliteration: "muʿjiza",  type: 'Active participle (F IV)', meaning: '"A miracle" — literally "something that renders incapable"', approxCount: 0, verified: false },
      { arabic: 'عَاجِز',   transliteration: 'ʿājiz',    type: 'Active participle',       meaning: '"One who is incapable / powerless" — the human challenger',  approxCount: 2, verified: false },
    ],

    keyAyahs: [
      {
        ref: '17:88',
        arabic: 'قُل لَّئِنِ ٱجْتَمَعَتِ ٱلْإِنسُ وَٱلْجِنُّ عَلَىٰٓ أَن يَأْتُوا۟ بِمِثْلِ هَٰذَا ٱلْقُرْءَانِ لَا يَأْتُونَ بِمِثْلِهِۦ وَلَوْ كَانَ بَعْضُهُمْ لِبَعْضٍ ظَهِيرًا',
        translation: 'Say: If mankind and the jinn gathered together to produce something like this Quran, they could not produce the like of it, even if they were assistants to one another.',
        note: "The comprehensive challenge: not individual humans, not the greatest poets — but all of humanity and all of the jinn together, collaborating. The result would still be failure. The scholars note that the taḥaddī progresses in reverse: this grandest challenge comes before the surah-level challenge (11:13) and the single-surah challenge (2:23). Some see the progression as descending to meet the challenger halfway: we challenged you with the whole book; then just ten chapters; now just one. You still cannot.",
      },
      {
        ref: '2:23',
        arabic: 'وَإِن كُنتُمْ فِى رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا۟ بِسُورَةٍ مِّن مِّثْلِهِۦ وَٱدْعُوا۟ شُهَدَآءَكُم مِّن دُونِ ٱللَّهِ إِن كُنتُمْ صَٰدِقِينَ',
        translation: "And if you are in doubt about what We have sent down upon Our servant, then produce a surah the like thereof and call upon your witnesses other than Allah, if you should be truthful.",
        note: "This is the most precise formulation of the taḥaddī — a single surah. Not a book. Not even a chapter of equal length. One surah. And bring your helpers. Al-Bāqillāni and later Ibn Khaldun both note that the Arabic world of the 7th century was at the peak of its poetic sophistication — if anyone could have answered this challenge, they would have then. The silence of the most eloquent culture in history is itself part of the evidence.",
      },
      {
        ref: '52:34',
        arabic: 'فَلْيَأْتُوا۟ بِحَدِيثٍ مِّثْلِهِۦٓ إِن كَانُوا۟ صَٰدِقِينَ',
        translation: 'Then let them produce a statement like it, if they are truthful.',
        note: "The earliest form of the challenge, from a Makkan surah: not even a Quran-like book, not even a surah — just a hadith (statement/discourse) of the same kind. The challenge begins maximally inclusive and narrows through multiple verses. Each time the Quran reduces the bar, the silence becomes louder.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "The dimensions of iʿjāz", arabic: "وجوه الإعجاز", arabicTranslit: "wujūh al-iʿjāz", description: "Classical scholars identified multiple dimensions: (1) linguistic iʿjāz — the unmatched depth and precision of its Arabic; (2) legislative iʿjāz — legal rulings that centuries of jurisprudence have only elaborated; (3) informational iʿjāz — knowledge of past peoples, future events, and natural phenomena beyond 7th-century Arabia's reach; (4) structural iʿjāz — the nazm (coherence) that holds across 23 years of revelation; (5) transformative iʿjāz — the effect it produces on sincere hearts." },
        { number: 2, title: "The ṣarfa position", arabic: "الصرفة", arabicTranslit: "al-ṣarfa", description: "A minority position in Islamic theology (held by Al-Nazzam and some Muʿtazilites) holds that the Quran's inimitability is not intrinsic but results from Allah restraining (ṣarafa) human ability to match it — i.e., humans could produce something similar but are divinely prevented. The majority position (and the mainstream Ash'ari view) rejects this: the Quran is intrinsically inimitable, and the challenge stands on its own merits." },
        { number: 3, title: "Responding to the challenge honestly", arabic: "الرد الأمين", arabicTranslit: "al-radd al-amīn", description: "The proper Muslim posture toward iʿjāz is not tribal pride but honest engagement: reading the Quran with the intention of hearing it as literature, theology, law, and spiritual guide — and asking oneself whether any human composition produces the same effect. Ibn al-Qayyim describes the experience of sincere Quran recitation as itself a form of iʿjāz: the effect on the heart is unlike what any human text produces." },
      ],
      stations: [
        { name: "Iʿjāz al-lafẓ — linguistic", description: "The most debated dimension: the Quran's language operates at a level of precision, density, and aesthetic power that classical Arabic scholars themselves — the most competent judges — consistently described as beyond human composition. Al-Walid ibn al-Mughira, a pre-Islamic master of Arabic poetry, heard the Quran and said: 'It has a sweetness, it has a grace — its highest part is fruitful and its lowest is overflowing; it towers above and nothing towers over it.'" },
        { name: "Iʿjāz al-ʿilmī — scientific", description: "A more modern dimension, developed primarily in the 20th century: Quranic verses that appear to correspond to later scientific discoveries (embryology, oceanography, the expanding universe). This has been both enthusiastically promoted and cautiously critiqued by scholars — the risk is reading scientific meaning into verses whose primary function was spiritual, theological, and legal." },
        { name: "Iʿjāz al-tashriʿī — legislative", description: "The Quran's legal and ethical system — built from verses revealed over 23 years in response to real events — contains a coherence and a balance that legal scholars have found remarkable. The fact that Quranic jurisprudence could generate a rich and detailed legal tradition across diverse societies and fourteen centuries points to a depth in its foundational texts beyond what one man's legal thinking could produce." },
      ],
      questions: [
        { question: "Have there been attempts to meet the challenge of the Quran?", answer: "Yes — including Musaylima al-Kadhdhāb (a false prophet in the time of the Prophet ﷺ), and various modern attempts. The classical Muslim scholars examined these attempts and found them either imitative (reproducing Quranic style without producing anything original) or simply inferior. The most famous analysis is Al-Bāqillāni's Iʿjāz al-Qurʾān, which subjects pre-Islamic poetry and the attempts of competitors to rigorous linguistic comparison with the Quran." },
        { question: "Isn't literary beauty subjective? Who decides what's inimitable?", answer: "The subjective element is real — but the scholars point to the testimony of native Arabic speakers at the height of Arabic literary culture who, hearing the Quran, recognised its qualitative difference from all human composition. Al-Walid ibn al-Mughira was not a Muslim sympathiser; his testimony is the more compelling for that. The challenge was issued to the most qualified judges, in the highest period of the tradition, and it stood unanswered." },
        { question: "How does iʿjāz relate to my personal relationship with the Quran?", answer: "Knowing about iʿjāz enriches the relationship because it changes how you listen. When you know you are reading a text that all of humanity together could not produce, the appropriate response to every verse shifts. It is not a text to critique but to receive. At the same time, the scholars emphasise that iʿjāz is best felt, not merely believed — sustained tadabbur, recitation with presence, and learning even basic Quranic Arabic opens the experiential dimension of iʿjāz." },
      ],
    },

    semanticField: [
      { slug: 'tadabbur', arabic: 'تَدَبُّر', transliteration: 'Tadabbur', relationship: 'deepens', relationshipLabel: "Reveals — tadabbur makes iʿjāz experiential", description: "Iʿjāz is a doctrine; tadabbur is the practice through which it becomes a felt reality. Someone who knows about iʿjāz intellectually but never practices tadabbur has accepted the doctrine without experiencing the evidence. The scholars say: read the Quran slowly, attentively, in Arabic if possible — and iʿjāz will argue for itself." },
      { slug: 'nazm', arabic: 'نَظْم', transliteration: 'Nazm', relationship: 'deepens', relationshipLabel: "Dimension of — nazm is one facet of iʿjāz", description: "The structural coherence of the Quran — its nazm — is increasingly understood as a dimension of iʿjāz. The Quran was revealed in fragments over 23 years, in response to events, and yet its surahs and the mushaf as a whole exhibit an architectural unity that cannot be explained by human editorial work." },
    ],

    scholarsSaid: [
      { scholar: 'Al-Baqillani', text: "We say that the Quran is inimitable in its entirety — in its linguistic beauty, in its legislative wisdom, in its information about the unseen, and in its effect on hearts. The challenge (taḥaddī) was issued to the most capable people in the most capable period, and it was met with silence and with swords — never with a competing text.", source: "Iʿjāz al-Qurʾān" },
      { scholar: 'Ibn Khaldun', text: "Know that the miraculous nature of the Quran is established from multiple angles — from the inability of the Arabs to match it despite their mastery of the language; from the fact that it was produced by someone unlettered; from the information it contains about past and future; and from its effect on the souls of those who hear it in a state of openness.", source: "Muqaddima" },
    ],

    hadith: [
      { text: "Every prophet was given a miracle appropriate to his time. What I was given is the Quran — and I hope to have the most followers on the Day of Resurrection.", source: "Bukhari, 4981; Muslim, 152" },
    ],

    acrossTransitions: `The claim of scriptural inimitability is rare in the history of religion — most traditions claim divine authority for their scriptures without making the specific linguistic challenge that the Quran issues.

The Quran's challenge has been analysed from multiple academic angles. Western scholars of Arabic literature (A.J. Arberry, Reynold Nicholson) have written about the Quran's extraordinary qualities while stopping short of the theological claim. Arberry described his own translation attempt as an 'Interpretation' because he held translation to be impossible — the Arabic was too dense with meaning. This academic acknowledgment does not constitute acceptance of iʿjāz as divine evidence, but it does confirm the Quran's qualitative distinctiveness.

The study of iʿjāz has intersected with modern disciplines: information theory (the information density of Quranic Arabic), literary theory (its use of register-shifting across legal, narrative, and poetic modes within single surahs), and cognitive science (the effect of Quranic recitation on the nervous system — though this research is nascent).

One productive comparison is with the Jewish concept of Torah as divine speech: both traditions assert that God's word has qualities no human can replicate. The difference is that the Quran makes the challenge explicit and public — 'produce one surah like it' — while Torah theology does not issue the same open challenge. The Quran's confidence in its own inimitability is, on its own terms, itself a kind of evidence: a human author would not stake the entire doctrine of prophethood on an open challenge to produce even one chapter.`,

    relatedTerms: [
      { slug: 'tafsir',   transliteration: 'Tafsir',   term: 'تَفْسِير' },
      { slug: 'tadabbur', transliteration: 'Tadabbur', term: 'تَدَبُّر' },
      { slug: 'nazm',     transliteration: 'Nazm',     term: 'نَظْم'    },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains the most cited taḥaddī verse (2:23) — the single-surah challenge, in the context of addressing those who doubt the Quran's divine origin." },
      { slug: 'al-isra',    surahName: "Al-Isra'",   note: "Contains the comprehensive challenge (17:88) — all humanity and jinn together could not produce its like. The context is a refutation of demands for a different kind of miracle." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ASBAB AL-NUZUL
  // ─────────────────────────────────────────────────────────────────────────────

  'asbab-al-nuzul': {
    slug: 'asbab-al-nuzul',
    term: 'أَسْبَاب ٱلنُّزُول',
    transliteration: 'Asbab al-Nuzul',
    pronunciation: "as-BAAB an-noo-ZOOL · stress on second syllable of each word",
    category: 'Study Terms',
    evocativeLine: 'The occasions of revelation — the moments that gave the verses their first breath.',
    hasFullEntry: true,

    summary:
      "Asbāb al-Nuzūl (plural: occasions of revelation; singular: sabab al-nuzūl) refers to the specific historical circumstances, events, or questions that prompted the revelation of particular Quranic verses or passages. Not every verse has an occasion — many were revealed as part of the ongoing flow of guidance without a specific trigger. But for those that do, knowing the occasion illuminates meaning in ways no amount of linguistic analysis alone can provide. The Quran was not delivered into a vacuum; it was revealed into a living community, responding to their questions, their disputes, their griefs, and their spiritual struggles. Asbāb al-Nuzūl is the discipline that recovers those moments.",

    root: {
      letters: 'ن-ز-ل',
      transliteration: 'nūn-zāy-lām',
      meaning: 'To descend, to come down, to alight at a place',
      elaboration:
        "The root ن-ز-ل (to descend) is the vocabulary of revelation itself: nazzala (to send down), anzala (to cause to descend), tanzīl (the act of sending down, used as a name for the Quran), and nuzūl (the descent). The Quran was revealed (nuzzila) from above — and 'occasions of its descent' (asbāb nuzūlihi) are the earthly moments that met the divine speech on its way down. The discipline of asbāb al-nuzūl studies the meeting point between the divine and the human in history.",
    },

    occurrenceCount: 0,
    occurrenceNote: "Asbāb al-nuzūl is a scholarly discipline; the phrase itself does not appear in the Quran. The verb nazzala (to send down) and its forms appear over 80 times in the Quran, establishing the vocabulary that this discipline inherits.",

    rootForms: [
      { arabic: 'نَزَّلَ',   transliteration: 'nazzala',  type: 'Verb — Perfect (Form II)', meaning: '"He sent down / caused to descend" — divine revelation',    approxCount: 50, verified: false },
      { arabic: 'أَنزَلَ',   transliteration: 'anzala',   type: 'Verb — Perfect (Form IV)', meaning: '"He sent down" — also used for revelation (and rain)',       approxCount: 36, verified: false },
      { arabic: 'تَنزِيل',   transliteration: 'tanzīl',   type: 'Verbal noun (Form II)',    meaning: '"The sending down" — used as a name for the Quran itself',  approxCount: 10, verified: false },
      { arabic: 'نُزُول',    transliteration: 'nuzūl',    type: 'Verbal noun (Form I)',     meaning: '"Descent / coming down" — the act of revelation',           approxCount: 1,  verified: false },
      { arabic: 'أَسْبَاب',  transliteration: 'asbāb',    type: 'Noun — plural',            meaning: '"Causes / occasions / reasons" — from sabab (a rope, a cause)', approxCount: 9, verified: false },
    ],

    keyAyahs: [
      {
        ref: '4:11',
        arabic: 'يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ',
        translation: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
        note: "This inheritance verse has a known sabab al-nuzūl: the death of Saʿd ibn al-Rabīʿ al-Anṣārī, whose brother took all his wealth, leaving his wife and daughters with nothing. The widow came to the Prophet ﷺ and said: 'O Messenger of Allah, Saʿd died and his brother has taken everything.' The revelation came. Knowing this occasion makes the verse concrete: it arose to protect actual women from an actual injustice.",
      },
      {
        ref: '2:115',
        arabic: 'وَلِلَّهِ ٱلْمَشْرِقُ وَٱلْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا۟ فَثَمَّ وَجْهُ ٱللَّهِ ۚ إِنَّ ٱللَّهَ وَٰسِعٌ عَلِيمٌ',
        translation: 'To Allah belongs the east and the west. Wherever you turn, there is the face of Allah. Indeed, Allah is All-Encompassing, All-Knowing.',
        note: "Two different occasions of revelation have been attributed to this verse. One: some companions prayed nafl prayers while travelling, not knowing the direction of qibla — the verse assured them their prayers were valid. Two: it was revealed for the people of the book who prayed in different directions. Knowing both possible occasions reveals the verse's range: it addresses both practical uncertainty and theological diversity in one luminous statement.",
      },
      {
        ref: '33:37',
        arabic: 'وَإِذْ تَقُولُ لِلَّذِىٓ أَنْعَمَ ٱللَّهُ عَلَيْهِ وَأَنْعَمْتَ عَلَيْهِ أَمْسِكْ عَلَيْكَ زَوْجَكَ وَٱتَّقِ ٱللَّهَ',
        translation: 'And when you said to the one upon whom Allah had bestowed favour and upon whom you had bestowed favour: Keep your wife and fear Allah.',
        note: "This verse has a very specific sabab al-nuzūl — the Prophet ﷺ's marriage to Zaynab bint Jahsh after her divorce from Zayd ibn Haritha. The occasion reveals the verse's purpose: to abolish the pre-Islamic custom of treating adopted sons as biological sons (with all the legal implications for marriage prohibitions). Without the sabab, the verse's historical intervention is invisible; with it, its social transformation becomes clear.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "The occasion does not limit the verse", arabic: "العبرة بعموم اللفظ", arabicTranslit: "al-ʿibra bi-ʿumūm al-lafẓ", description: "The most important principle of asbāb al-nuzūl in Islamic jurisprudence: al-ʿibra bi-ʿumūm al-lafẓ lā bi-khuṣūṣ al-sabab — 'the ruling is based on the generality of the wording, not the specificity of the occasion.' The verse may have been triggered by one event but its authority extends to all similar situations. Knowing the occasion informs the interpretation; it does not imprison it." },
        { number: 2, title: "Establishing authenticity", arabic: "شروط صحة الأسباب", arabicTranslit: "shurūṭ ṣiḥḥat al-asbāb", description: "Not every reported sabab is equally reliable. The scholars established criteria: the chain must be authentic; the companion reporting it must have witnessed the occasion; the phrase should explicitly connect the event to the revelation ('this was revealed when...' or 'we asked the Prophet about X and this verse was revealed'). Al-Suyuti's Lubāb al-Nuqūl fī Asbāb al-Nuzūl collects and grades these reports." },
        { number: 3, title: "Multiple occasions for one verse", arabic: "تعدد الأسباب", arabicTranslit: "taʿaddud al-asbāb", description: "Some verses have multiple reported occasions, which the scholars handle carefully: if one report is stronger, it takes precedence; if they are equally strong, some scholars hold all occasions are valid (the verse speaks to each situation); others hold one occasion must be primary. The multiplicity of occasions itself often reveals the verse's broad applicability — it was needed in multiple contexts simultaneously." },
      ],
      stations: [
        { name: "Reading backwards into history", description: "The primary value of asbāb al-nuzūl for the modern reader: it makes the Quran's revelation a living event rather than a fixed text. When you know that a verse was revealed because a woman's husband died and her children were being dispossessed, the verse is not merely law — it is divine response to human suffering. This makes the Quran feel inhabited." },
        { name: "The Prophet ﷺ as the first occasion", description: "The most intimate form of sabab al-nuzūl is the Prophet's own experience: the verses of Surah Ad-Duha came after a period of silence in revelation during which the Prophet ﷺ was greatly distressed, even mocked. Knowing this transforms the verse 'Your Lord has not forsaken you nor despised you' into something almost unbearably tender. The occasion is the frame; the verse is the response." },
        { name: "The companions as occasions", description: "Many surahs and verses were revealed in response to questions from companions — Surah Al-Ikhlas in response to a question about Allah's description, the beginning of Surah Al-ʿAbasa in response to the Prophet's turning from a blind man. The companions' questions are themselves a form of divine provision — they drew out from the Quran what the community needed to know." },
      ],
      questions: [
        { question: "Do I need to know asbāb al-nuzūl to understand the Quran?", answer: "For general reading and spiritual benefit, no — the Quran is designed to be accessible to sincere readers in every age. But for accurate tafsir, yes — especially for verses with legal implications or with language that presupposes a historical context. Without the occasion, some verses can be misread (taken too broadly or too narrowly). Asbāb al-nuzūl is not a requirement for every reader; it is a necessity for every mufassir." },
        { question: "Can the sabab al-nuzūl contradict the verse's general meaning?", answer: "No — and this is the key principle. The occasion does not determine the ruling; the language does. If the verse says 'those who do X,' the ruling applies to everyone who does X, not only to the specific people who occasioned the revelation. The scholars use this principle to prevent both under-application (limiting a verse only to its occasion) and over-application (extending a verse beyond its intended scope)." },
        { question: "What's the best resource for asbāb al-nuzūl?", answer: "Al-Suyuti's Lubāb al-Nuqūl is the classical standard. In English, Maulana Mufti Shafi's Maʿārif al-Qurʾān consistently cites occasions of revelation. The IslamWeb and Quran.com tafsir databases provide occasion information with source citations for most verses that have known occasions." },
      ],
    },

    semanticField: [
      { slug: 'tafsir',   arabic: 'تَفْسِير', transliteration: 'Tafsir',   relationship: 'deepens', relationshipLabel: "Source for — tafsir draws on asbāb al-nuzūl as a primary tool", description: "Asbāb al-nuzūl is one of the 15 sciences Al-Suyuti listed as prerequisites for tafsir. It is the historical lens without which some verses remain obscure. The greatest tafsirs — al-Tabari, Ibn Kathir, al-Qurtubi — consistently cite occasions of revelation as the first step in explaining difficult or contextually-specific verses." },
      { slug: 'tadabbur', arabic: 'تَدَبُّر', transliteration: 'Tadabbur', relationship: 'deepens', relationshipLabel: "Enriches — knowing the occasion deepens personal reflection", description: "Tadabbur without asbāb al-nuzūl can produce valid personal reflection but miss the specific register of the verse's revelation. When you know that a verse was revealed at a moment of grief, of joy, of military crisis, or of personal question — your reflection enters that moment and the verse gains its full emotional and historical resonance." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Daqiq al-Id', text: "The elucidation of the occasion of revelation is a powerful way to understand the meanings of the Quran. When a text is connected to its occasion, the meaning becomes clear and the ambiguity is resolved — just as when a question is known, the answer becomes precise.", source: "Cited in Al-Suyuti, Al-Itqān" },
      { scholar: 'Al-Wahidi', text: "It is not permissible for anyone to speak about the meaning of a verse without first knowing its story and the explanation of its revelation. Without this knowledge, he would be guessing — and guessing about the Quran is a sin.", source: "Asbāb al-Nuzūl, Introduction" },
    ],

    hadith: [],

    acrossTransitions: `The study of historical context for sacred texts is not unique to Islam — all major scriptural traditions have developed methods for recovering the context of their revelations or compositions.

Jewish biblical scholarship relies heavily on the context of Israelite history for interpreting the Torah and the prophets. The Deuteronomistic history (the books of Joshua through 2 Kings) is itself understood as a theological interpretation of events — the context and the text are interwoven. The Midrash frequently provides narrative context for biblical verses: 'Why is this verse written here? Because X happened.'

Christian New Testament scholarship makes extensive use of socio-historical context — the Sitz im Leben (situation in life) methodology developed by form critics asks: what community situation produced this passage? This is structurally similar to asbāb al-nuzūl, though applied to a text that was written rather than orally transmitted in its occasion.

The difference is in the status of the occasion. In biblical criticism, the occasion is often used to explain a text's origin — which can lead to relativising its authority. In Islamic tafsir, the occasion of revelation never reduces the Quran's authority; it only illuminates its meaning. The distinction is theological: the Quran is divine speech that responded to an occasion; it is not human speech produced by an occasion. The occasion explains the application, not the origin.

This makes asbāb al-nuzūl a uniquely Islamic discipline: it combines historical sensitivity with theological conviction in a way that neither undermines the text's authority nor treats it as historically disembodied.`,

    relatedTerms: [
      { slug: 'tafsir',   transliteration: 'Tafsir',   term: 'تَفْسِير' },
      { slug: 'tadabbur', transliteration: 'Tadabbur', term: 'تَدَبُّر' },
      { slug: 'nazm',     transliteration: 'Nazm',     term: 'نَظْم'    },
    ],

    goDeeper: [
      { slug: 'an-nisa', surahName: "An-Nisa'", note: "One of the richest surahs for asbāb al-nuzūl — many of its legal verses were revealed in direct response to questions, disputes, or events in the early community, making the occasions essential for correct understanding of the rulings." },
      { slug: 'ad-duha', surahName: 'Ad-Duha', note: "Perhaps the most intimate occasion of revelation: a surah revealed directly in response to the Prophet ﷺ's grief during a pause in revelation, making the occasion and the text almost impossible to separate." },
    ],
  },

  mahabbah: {
    slug: 'mahabbah',
    term: 'مَحَبَّة',
    transliteration: 'Mahabbah',
    pronunciation: 'ma-HAB-bah',
    category: 'States of the Heart',
    evocativeLine: 'The love that reshapes everything — when the heart finds what it was made for.',
    hasFullEntry: true,

    summary: `Mahabbah is the Quranic word for love — not the sentimental love of poetry, but the existential love that restructures the entire self. The scholars of the heart placed mahabbah at the apex of all spiritual stations: every other station — tawbah, khawf, raja', sabr, shukr — is either a road toward mahabbah or a fruit that grows from it. When Ibn al-Qayyim wrote his masterwork on the stations of the heart, he named it Madarij al-Salikin after the Quranic description of the path — and its summit is mahabbah.

The Quran's most important statement about mahabbah comes in Surah Al-Baqarah (2:165): those who truly love Allah love Him with a love stronger than any other love. This is not a commandment to feel warm toward Allah — it is a description of what the awakened heart discovers. When the soul truly sees Allah's beauty, His generosity, and His nearness, love arises as naturally as the eye is drawn to light. The problem is not that we do not love Allah; it is that we love other things more, and those loves crowd out the original one.

The condition of mahabbah is mutual. The Quran does not only speak of the human's love for Allah but of Allah's love for the human — "He loves them and they love Him" (5:54). This reciprocity is extraordinary: the Creator of all things loves specific human beings, and that love is not earned through performance but through orientation. The muttaqin, the muhsinin, the mutawakkilin — those who have a certain quality of heart — are explicitly described as beloved by Allah. Mahabbah, then, is not a one-sided pursuit. It is a call and response that spans the distance between the finite and the Infinite.`,

    root: {
      letters: 'ح–ب–ب',
      transliteration: 'ḥ–b–b',
      meaning: 'To love; to be drawn toward; to desire',
      elaboration: "The root ḥ–b–b carries the sense of a seed that swells and bursts — the Arabic ḥabb means grain or seed, and some scholars derive the emotional sense of love from this image: mahabbah is what happens when something takes root in the heart and grows until it fills it. The doubled 'b' (shadda) in ḥabba intensifies the meaning — a deep, settled, abiding attachment rather than a passing attraction.",
    },

    occurrenceCount: 95,
    occurrenceNote: "The root ḥ–b–b appears approximately 95 times in the Quran in various forms. The verb aḥabba ('He loves' / 'they love') is the most common form. The noun mahabbah itself appears rarely — the Quran more often uses the verb to describe the dynamic of love in action.",

    rootForms: [
      { arabic: 'مَحَبَّة', transliteration: 'mahabbah', type: 'Verbal noun', meaning: 'Love — the state or condition of loving', approxCount: 2, verified: false },
      { arabic: 'أَحَبَّ', transliteration: 'aḥabba', type: 'Verb — Form IV', meaning: 'To love (transitive)', approxCount: 50, verified: false },
      { arabic: 'حَبِيب', transliteration: 'ḥabīb', type: 'Intensive adjective', meaning: 'Beloved one — the one deeply loved', approxCount: 1, verified: false },
      { arabic: 'مَحْبُوب', transliteration: 'maḥbūb', type: 'Passive participle', meaning: 'That which is loved', approxCount: 1, verified: false },
    ],

    keyAyahs: [
      {
        ref: '2:165',
        arabic: 'وَٱلَّذِينَ ءَامَنُوٓا۟ أَشَدُّ حُبًّا لِّلَّهِ',
        translation: 'And those who believe are most intense in love for Allah.',
        note: "The most defining statement on mahabbah in the Quran. The word ashadu (most intense) is the superlative — faith is measured not only by what you believe but by how much you love. The verse is set against the idolaters who love their idols: the believers' love for Allah is stronger than any rival love. This is both a description and a standard.",
      },
      {
        ref: '5:54',
        arabic: 'يُحِبُّهُمْ وَيُحِبُّونَهُ',
        translation: 'He loves them and they love Him.',
        note: "The Quran's most intimate declaration: divine love is not one-directional. Allah loves certain people — the humble, the patient, the righteous — and they love Him in return. This mutuality is the heart of the spiritual path. The scholars say: to know that Allah loves you is the beginning of transformation.",
      },
      {
        ref: '3:31',
        arabic: 'قُلْ إِن كُنتُمْ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِى يُحْبِبْكُمُ ٱللَّهُ',
        translation: 'Say: If you love Allah, then follow me — Allah will love you.',
        note: "The 'love verse' (ayat al-maḥabba) as the scholars call it. Love of Allah is not expressed through sentiment but through following the Prophet ﷺ. The result of following is being loved by Allah — so the chain is: claim love → demonstrate it through following → receive divine love. The verse also confirms the Prophet ﷺ as the living embodiment of what loving Allah looks like.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Knowledge precedes love', arabic: 'المعرفة قبل المحبة', arabicTranslit: "al-maʿrifa qabl al-maḥabba", description: "You cannot love what you do not know. The path to mahabbah begins with maʿrifa — deep knowledge of Allah: His names, His attributes, His acts in creation and revelation. Ibn al-Qayyim lists ten causes of mahabbah, and the first is extended reflection on the names and attributes of Allah. The heart that encounters the reality of Al-Rahman, Al-Lateef, Al-Wadud — the Most Merciful, the Subtly Kind, the Loving — cannot remain cold." },
        { number: 2, title: 'Recitation that enters the heart', arabic: 'التلاوة المؤثرة', arabicTranslit: "al-tilāwa al-muʾaththira", description: "Ibn al-Qayyim says that one cause of mahabbah is khalwa maʿ Allāh fī al-saḥar — seclusion with Allah in the pre-dawn hours, reciting His speech. The Quran is the primary site where Allah speaks directly to the human heart. The recitation that produces mahabbah is not fast, not performed, but slow and attended — where each verse has time to arrive." },
        { number: 3, title: "Awareness of Allah's blessings", arabic: 'مشاهدة النعم', arabicTranslit: "mushāhadat al-niʿam", description: "To see every blessing — health, sight, sustenance, relationships, safety — as coming from Allah's hand is the fastest route to gratitude, and gratitude opens into love. The Quran repeats 'Do you not see?' and 'Have you considered?' as an invitation to attend to the blessings hidden in the ordinary. The heart that truly sees where its provisions come from cannot withhold love." },
      ],
      stations: [
        { name: 'Uns — intimacy with Allah', description: "Mahabbah at its maturity produces uns — a sense of closeness and intimacy that makes aloneness bearable, even desirable. The person of uns prefers the pre-dawn hours because the crowd has thinned and the presence feels near. They turn to Allah in moments of joy as naturally as in moments of distress. This is the fruit the Quran describes: 'Verily, in the remembrance of Allah do hearts find rest' (13:28) — not comfort as a substitute, but rest as an arrival." },
        { name: "Loving what Allah loves", description: "A practical sign of mahabbah is that the heart begins to align its loves and hates with Allah's. The Quran speaks of Allah loving the just, the patient, the purified, the tawwābīn — and of His displeasure with the arrogant, the corrupters, the betrayers. The person who loves Allah finds these loves and displeasures gradually becoming their own — not as performance but as alignment. 'None of you truly believes until his desires follow what I have brought,' said the Prophet ﷺ." },
        { name: "Love as propulsion", description: "Mahabbah is not quietist — it moves. The one who loves Allah hastens toward what He loves, flees from what He hates, and finds the worship that others find burdensome a form of proximity. Ibn Taymiyyah wrote: 'Worship is built on love and reverence — the combination of khawf and mahabbah is what drives the heart forward.' Fear alone paralyzes; love without reverence grows careless. Together they keep the heart moving toward Allah with both longing and caution." },
      ],
      questions: [
        { question: "Can I love Allah if I don't feel anything during prayer?", answer: "The absence of feeling is not the absence of love — it may be the presence of an obstacle. Spiritual numbness (qaswa — hardness of the heart) is a known condition the Quran and the scholars address. The treatment is not to wait for feeling but to attend to what produces feeling: slow recitation, reflection on blessings, reduction of distraction, and keeping company with those who love Allah. Mahabbah is a flame that can be covered; uncovering it requires removing what smothers it." },
        { question: "Is loving the Prophet ﷺ part of mahabbah?", answer: "Inseparably. The verse (3:31) ties love of Allah to following the Prophet ﷺ — and the Prophet ﷺ himself said, 'None of you truly believes until I am more beloved to him than his children, his parents, and all of mankind.' Loving the Prophet ﷺ is not a detour from loving Allah; it is the demonstrated form of it. The scholars say: you cannot claim to love the Quran and not love the one who lived it." },
        { question: "How do I know if I truly love Allah?", answer: "Ibn al-Qayyim gives several signs: you prefer Allah's speech to all other speech; you are disturbed when you sin, not because of consequence but because of what it does to the relationship; you find worship light rather than burdensome; you love those whom Allah loves and are wary of what He dislikes; you give priority to what pleases Him over what pleases your desires. These are not perfectly achievable tests — they are orientations to aim toward." },
      ],
    },

    semanticField: [
      { slug: 'khawf',   arabic: 'خَوْف',   transliteration: 'Khawf',   relationship: 'parallels', relationshipLabel: 'Paired with — love and fear are the two wings of the heart', description: "The scholars consistently say that the heart flies to Allah on two wings: mahabbah (love) and khawf (fear). Love without fear becomes presumption — the assumption that one can do as one likes and still be beloved. Fear without love becomes despair or mere compliance. The Quran addresses both: it describes Allah as the Most Loving and the Most Severe in consequence, and the healthy heart holds both." },
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: 'Purified by — true love empties itself of audience', description: "Ikhlas (sincerity) is love that has been refined of all impurity — of showing off, of hoping for return, of loving Allah for the sake of something else. The scholars say: the first stage is to love Allah for His blessings; the second is to love Him for His attributes; the third is to love Him for Himself — and that is ikhlas in mahabbah. Most worship is in the first stage, which is still valid. The third stage is rare." },
      { slug: 'shukr',  arabic: 'شُكْر',   transliteration: 'Shukr',  relationship: 'deepens', relationshipLabel: 'Gateway to — gratitude opens the heart to love', description: "Shukr and mahabbah are intimately linked: you cannot be truly grateful to someone you do not love, and you cannot love someone without feeling gratitude. The Quran pairs these emotions consistently. In practice, cultivating shukr — noticing specific blessings and tracing them to Allah — is one of the most reliable ways to awaken mahabbah in a heart that has grown cold." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Love is the spirit of deeds, the core of the stations, the foundation of the path. It is the source of every good, and its absence is the source of every evil, every corruption, every harm in this world and the next. The path to Allah has no station that is not built upon love.", source: "Madarij al-Salikin" },
      { scholar: "Al-Junayd", text: "Mahabbah is the inclination of the heart toward the Beloved without choosing any other above Him, and without repose in anything other than Him.", source: "Cited in Al-Qushayri, Al-Risala" },
      { scholar: 'Ibn Taymiyyah', text: "The basis of all worship and the foundation of all faith is love of Allah — love that is total, such that He is more beloved than anything else. Everything else follows from this: the commands become desirable because they are His commands, and the prohibitions become repulsive because they are what He has forbidden.", source: "Majmu' al-Fatawa" },
    ],

    hadith: [
      { ref: "Bukhari & Muslim", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَلَدِهِ وَوَالِدِهِ وَالنَّاسِ أَجْمَعِينَ", translation: "None of you truly believes until I am more beloved to him than his children, his parents, and all of mankind.", note: "This hadith places love of the Prophet ﷺ at the very definition of faith — not love in word but love that outranks every other attachment. The scholars say this love manifests in following: 'If you love me, follow me' (3:31)." },
    ],

    acrossTransitions: `Mahabbah exists at the intersection of every great spiritual tradition, but what the Quran does with it is distinctive.

In Jewish spirituality, love of God is commanded: "You shall love the LORD your God with all your heart, all your soul, and all your might" (Deuteronomy 6:5). The Shema is recited twice daily as the central affirmation of Jewish faith. The medieval philosopher Maimonides wrote that love of God is the highest commandment — but the dominant emphasis in rabbinic tradition is on the deed (mitzvah) rather than the feeling. The heart follows the hand.

In Christian mysticism, love is the explicit summit of the spiritual life. The mystical tradition — Pseudo-Dionysius, Meister Eckhart, Julian of Norwich — describes the goal of the spiritual journey as union with God through love (theosis or deification). Augustine's famous line — "our heart is restless until it rests in Thee" — captures the same restlessness the Quran ascribes to the heart that has not found its true beloved.

Sufi poetry — Rumi, Hafiz, Ibn 'Arabi — poured the Quranic concept of mahabbah into Persian and Arabic verse, producing the most celebrated love poetry in world literature. The Masnavi is, at its root, an extended meditation on the mahabbah between the created and the Creator. The reed's cry at separation from the reed bed is the human soul's cry for Allah.

What distinguishes the Quranic treatment is the mutuality and the specific conditions of divine love. The Quran does not merely tell humans to love Allah and trust that Allah tolerates them. It identifies specific qualities — justice, patience, purification, repentance, trust in Allah — as conditions that elicit Allah's love. This makes mahabbah not merely a feeling to cultivate but a relationship to develop, with specific behaviors that strengthen or weaken it. The Quran describes a God who is Wadud — actively, intensely loving — not a God who is abstractly benevolent.`,

    relatedTerms: [
      { slug: 'khawf',    transliteration: 'Khawf',    term: 'خَوْف'    },
      { slug: 'raja',     transliteration: "Raja'",    term: 'رَجَاء'   },
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص' },
      { slug: 'shukr',    transliteration: 'Shukr',    term: 'شُكْر'    },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
    ],

    goDeeper: [
      { slug: 'al-imran', surahName: 'Ali Imran', note: "Contains the 'love verse' (3:31): 'Say: If you love Allah, follow me — Allah will love you.' The surah also contains some of the Quran's most explicit descriptions of what Allah loves and what He does not, building a portrait of the Beloved's preferences." },
      { slug: 'al-maidah', surahName: 'Al-Maidah', note: "Verse 5:54 — 'He loves them and they love Him' — describes the community that Allah will replace if believers turn away: a people characterized by mutual love with Allah, humility toward believers, and strength against disbelief. This verse defines the community of mahabbah." },
    ],
  },

  khawf: {
    slug: 'khawf',
    term: 'خَوْف',
    transliteration: 'Khawf',
    pronunciation: 'KHAWF',
    category: 'States of the Heart',
    evocativeLine: 'The sacred fear that keeps the soul honest — not terror, but reverential awe.',
    hasFullEntry: true,

    summary: `Khawf is the fear of Allah — but fear is too thin a translation. The Arabic khawf is not the panic of the prey before the predator; it is the alert, watchful fear of the heart that understands what is at stake. The scholars define it as the pain of the heart at the anticipation of something disliked — whether that is Allah's displeasure, a lapse in worship, or the consequence of sin. Khawf, rightly understood, is protective: it is the guardrail that keeps the soul from wandering into harm.

The Quran consistently pairs khawf with raja' — fear with hope — as the two necessary orientations of the heart toward Allah. The scholars were emphatic: too much fear without hope tips into despair (which the Quran forbids); too much hope without fear tips into ghurur — delusion, the comfortable assumption that one's sins are already forgiven. The balanced heart is described by the Quran itself: "They call upon their Lord in khawf and hope" (32:16). Fear keeps the heart honest; hope keeps it alive.

There is also a more elevated form of khawf that the scholars distinguish from ordinary fear of punishment: khashya. Khashya is the fear born of knowledge — the awe that arises when a person truly understands who Allah is, what the Day of Judgment means, and how fragile and contingent every moment of their life is. The Quran specifically says: "Only those who have knowledge truly fear (yakhsha) Allah" (35:28). This is not the fear of the ignorant who imagines a terrifying deity; it is the fear of the awake who have glimpsed the true scale of Reality.`,

    root: {
      letters: 'خ–و–ف',
      transliteration: 'kh–w–f',
      meaning: 'To fear; to be apprehensive; to feel dread',
      elaboration: "The root kh–w–f covers a range from ordinary anxiety to reverential awe. In Quranic usage it typically denotes the heart's response to the awareness of Allah's greatness and the weight of accountability. It is distinguished from khashya (from a different root: kh–sh–y) which is specifically the fear arising from deep knowledge — the scholars reserve khashya for the highest form of spiritual awe.",
    },

    occurrenceCount: 124,
    occurrenceNote: "The root kh–w–f appears approximately 124 times across multiple forms in the Quran — one of the most frequently occurring emotional-spiritual terms. This frequency reflects the Quran's insistence that proper orientation toward Allah necessarily involves this quality.",

    keyAyahs: [
      {
        ref: '32:16',
        arabic: 'تَتَجَافَىٰ جُنُوبُهُمْ عَنِ ٱلْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا',
        translation: 'Their sides forsake their beds; they call upon their Lord in fear and hope.',
        note: "The definitive Quranic description of the people of the night — those who give up sleep to worship. The pairing of khawf and hope (tama') is programmatic: neither alone is sufficient. This verse is often cited as the model for the balanced heart.",
      },
      {
        ref: '35:28',
        arabic: 'إِنَّمَا يَخْشَى ٱللَّهَ مِنْ عِبَادِهِ ٱلْعُلَمَٰٓؤُا۟',
        translation: 'Only those who have knowledge truly fear Allah among His servants.',
        note: "A crucial verse that elevates khawf to khashya and ties it to knowledge. The one who truly fears Allah is not the one who is most anxious but the one who has the deepest understanding. This verse is the scholars' primary evidence that spiritual fear is a fruit of learning, not a replacement for it.",
      },
      {
        ref: '2:155',
        arabic: 'وَلَنَبْلُوَنَّكُم بِشَىْءٍ مِّنَ ٱلْخَوْفِ وَٱلْجُوعِ',
        translation: 'And We will surely test you with something of fear and hunger.',
        note: "Allah names khawf as one of the instruments of divine testing — an external fear (of enemies, of insecurity) that tests the heart's reliance. The distinction between this external khawf and the internal khawf of reverence is important: one is a test; the other is a response to the tester.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Fear as motivation, not paralysis', arabic: 'الخوف المحرك لا المشلّ', arabicTranslit: "al-khawf al-muḥarrik lā al-mushall", description: "Healthy khawf moves the person — toward worship, away from sin, into acts of repair. Unhealthy fear paralyzes — it produces guilt without action, despair without return to Allah. The scholars say: if your khawf produces more worship and better behavior, it is a mercy; if it produces only more anxiety and withdrawal, it has crossed into despair and needs to be paired with raja'." },
        { number: 2, title: "Fear what you can actually control", arabic: 'خف مما تقدر عليه', arabicTranslit: "khaf mimmā taqdiru ʿalayhi", description: "Al-Ghazali points out that khawf should focus on what is within the person's power to change — one's own sins, one's own state of heart, one's own death while unprepared. Fear of what one cannot control (other people's actions, qadar) is not productive khawf; it is anxiety. The Quran's consistent message is that the believer fears their own accountability, not the world's chaos." },
        { number: 3, title: 'Khawf and its companion raja', arabic: 'الخوف والرجاء', arabicTranslit: "al-khawf wa-al-rajāʾ", description: "The scholars said: the sick person who hopes for health without changing anything that makes them sick is foolish. The sick person who fears death without any hope of recovery is in despair. The person who hopes for recovery while following the treatment is wise. This is the model: khawf motivates the treatment; raja' maintains the energy to continue. Neither replaces the other." },
      ],
      stations: [
        { name: 'Wara — scrupulous caution', description: "Khawf at its most practical produces wara': a careful avoidance not only of the clearly forbidden but of what might lead toward it. The people of wara' are described as those whose fear of displeasing Allah makes them cautious even in the permissible — not from joylessness but from love of safety. The Prophet ﷺ said: 'Leave what makes you doubt for what does not make you doubt.' This caution is khawf operationalized." },
        { name: 'Weeping in worship', description: "One of the most consistent signs of active khawf in the tradition is the ability to weep in worship — in salah, upon reading the Quran, when alone with Allah. The Quran describes the prophets falling in prostration weeping (19:58). The Prophet ﷺ described a man who weeps in the night out of fear of Allah as one of the seven who will be sheltered on the Day when there is no other shelter. This is not performance — the tears are the overflow of a heart that has glimpsed its own smallness and Allah's greatness." },
        { name: 'Fear of the heart, not the face', description: "The scholars warned against a counterfeit form of khawf: appearing fearful in front of people while the heart is careless in private. True khawf is consistent — it does not depend on audience. Ibn al-Qayyim said the sign of genuine khawf is that a person is more careful in private than in public, because they are more aware of Allah's observation than of human observation. The hadith of Uqbah ibn Amir captures this: 'Be a guard over yourself.'" },
      ],
      questions: [
        { question: "Isn't it psychologically harmful to focus on fear?", answer: "Khawf in the Islamic sense is not anxiety disorder — it is not chronic worry about things outside one's control. Healthy khawf is purposeful: it directs attention toward what one can actually do (repent, worship, reform behavior) and away from presumption. The tradition is careful about this balance: the Prophet ﷺ forbade causing someone to despair of Allah's mercy. Fear is medicine for the careless heart, not a permanent state of distress." },
        { question: "Should I fear Allah more or love Allah more?", answer: "Both, and the balance shifts with your condition. Al-Ghazali wrote that when the heart is healthy and tending toward complacency, increase your khawf. When the heart is sick and tending toward despair, increase your raja' and mahabbah. The scholars who emphasized fear the most were often writing for people who were spiritually comfortable and needed a wake-up call. The scholars who emphasized hope were often writing for people broken by guilt who needed to be drawn back to Allah." },
        { question: "Is fear of punishment the same as khawf of Allah?", answer: "They overlap but are not identical. Fear of punishment (fear of Jahannam, fear of consequences in this life) is the lower level of khawf — valid and useful, but not the highest form. Khashya — the awe of the knowledgeable — is fear of Allah Himself: of displeasing Him, of being veiled from Him, of the gravity of standing before Him. The scholars say: the servant who worships only to avoid punishment is like the slave who serves only to avoid the whip. The one who worships out of khashya serves because they understand who they are serving." },
      ],
    },

    semanticField: [
      { slug: 'raja',     arabic: 'رَجَاء',   transliteration: "Raja'",   relationship: 'parallels', relationshipLabel: "Paired with — fear and hope are the two wings", description: "Khawf without raja' becomes despair. Raja' without khawf becomes delusion. The Quran's consistent pairing of the two is the model for the balanced spiritual life. The scholars said: hold both in equal measure except at the moment of death, when raja' should dominate — do not die with fear predominating, because you are about to meet the Most Merciful." },
      { slug: 'mahabbah', arabic: 'مَحَبَّة', transliteration: 'Mahabbah', relationship: 'deepens',  relationshipLabel: "Companion of — fear purifies love from presumption", description: "The highest love of Allah is inseparable from reverential awe. A person who claims to love Allah but feels no weight of accountability has confused comfort with closeness. The scholars said: mahabbah is the engine; khawf is the brake. The engine without the brake destroys; the brake without the engine stands still. Both together is the way of the people of Allah." },
      { slug: 'taqwa',   arabic: 'تَقْوَى',  transliteration: 'Taqwa',   relationship: 'deepens',  relationshipLabel: "Root of — taqwa is khawf made practical", description: "Taqwa is often described as building a shield (wiqaya) between oneself and Allah's displeasure. That shield is built from khawf — the awareness that Allah sees all and that every choice matters. Taqwa is khawf translated into consistent behavior: not a single feeling but a sustained practice of awareness." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Khawf is the whip that drives the servant toward Allah and prevents him from grazing in the pastures of negligence. Without it, the servant would not undertake the journey or endure its hardships.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Ghazali', text: "Know that khawf is a state of the heart that arises from knowledge of the greatness of Allah and the smallness of the self. When the heart truly sees both of these things, khawf arises — not as punishment but as the natural response of the perceptive heart.", source: "Ihya Ulum al-Din" },
      { scholar: "Al-Hasan al-Basri", text: "The believers continue to examine their deeds and fear their sins, even if their deeds were greater than mountains. The hypocrites continue to be heedless of their sins and say 'We have a good opinion of Allah' — but they lie. If they truly had a good opinion of Allah, they would improve their deeds.", source: "Cited in Ibn Rajab, Jami' al-Ulum" },
    ],

    hadith: [
      { ref: "Tirmidhi", arabic: "سَيِّدُ الِاسْتِغْفَارِ أَنْ يَقُولَ الْعَبْدُ: اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ...", translation: "The master of seeking forgiveness is that the servant says: 'O Allah, You are my Lord, there is no god but You...' — and whoever says it with conviction during the day and dies before the evening has entered Paradise.", note: "The formula (Sayyid al-Istighfar) encapsulates khawf made verbal: it is an acknowledgment of one's own mortality, a confession of sin, and a turning toward Allah — the full motion of a heart that lives in healthy fear." },
    ],

    acrossTransitions: `The concept of sacred fear appears in every major religious tradition, but its precise calibration differs dramatically.

In the Hebrew Bible, yirat Adonai (fear of God) is the "beginning of wisdom" (Proverbs 9:10) — the foundational orientation of the righteous person. The Psalms are full of this fear: trembling, prostration, the acknowledgment of one's smallness before the divine majesty. The later rabbinic tradition distinguished between yirat ha-onesh (fear of punishment) and yirat ha-romemut (awe of the divine majesty) — almost exactly the Islamic distinction between ordinary khawf and khashya.

In Christianity, the tradition has moved somewhat away from emphasis on divine fear, especially in modern Protestant thought, which tends to foreground God's love to the exclusion of divine justice. But the classical tradition — Thomas Aquinas, the mystics, Eastern Orthodoxy — preserved a robust sense of the fear of God as one of the seven gifts of the Holy Spirit. The Desert Fathers spoke constantly of penthos (compunction, grief over sin) which is the emotional correlate of khawf.

Buddhist practice has a parallel concept in hiri — moral conscience or shame — and ottappa — fear of wrongdoing and its consequences. These are described in Theravada Buddhism as the "guardians of the world": the two mental factors that prevent moral collapse. The parallel to khawf is not exact (there is no object of fear in non-theistic Buddhism) but the function is similar: a restraining awareness of the weight of one's actions.

What the Quranic tradition uniquely adds is the insistence on balance. The Quran forbids both despair of Allah's mercy (12:87) and false security (ghurur) before Allah's power (6:44). This precise calibration — not too much fear, not too little; not too much hope, not too little — reflects the Quran's understanding of the human heart as something that can be calibrated, trained, and refined rather than merely responded to.`,

    relatedTerms: [
      { slug: 'raja',     transliteration: "Raja'",    term: 'رَجَاء'   },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'  },
      { slug: 'nadam',    transliteration: 'Nadam',    term: 'نَدَم'    },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
    ],

    goDeeper: [
      { slug: 'az-zumar', surahName: 'Az-Zumar', note: "One of the Quran's most concentrated explorations of khawf and raja' in tension — describing those who fear the punishment of the next life while hoping for mercy (39:9), and those who experience neither because they have become heedless. The surah ends with a dramatic vision of the Day of Judgment that makes the fear concrete." },
      { slug: 'as-sajdah', surahName: 'As-Sajdah', note: "Contains the verse (32:16) that became the defining Quranic description of the people of khawf and raja: 'Their sides forsake their beds, calling upon their Lord in fear and hope.' The surah as a whole meditates on accountability and the different destinations of the fearful and the heedless." },
    ],
  },

  raja: {
    slug: 'raja',
    term: 'رَجَاء',
    transliteration: "Raja'",
    pronunciation: "ra-JAA'",
    category: 'States of the Heart',
    evocativeLine: "Hope in Allah's mercy — the rope that holds even when the hand has let go.",
    hasFullEntry: true,

    summary: `Raja' is hope — specifically, hope directed toward Allah and His mercy. But it is not the passive optimism of someone who hopes things will work out; it is the active, tethered hope of a person who knows who they are hoping in. The scholars defined raja' as the heart's inclination toward something it loves, which it expects to arrive. The key word is "expects" — without some real basis for expectation, hope becomes wishful thinking (umniyya), which the scholars consider a spiritual defect, not a virtue.

The Quran's commands and descriptions around raja' cluster around a single axis: do not despair of Allah's mercy. The famous verse of Surah Az-Zumar (39:53) — "O My servants who have transgressed against themselves — do not despair of the mercy of Allah. Indeed, Allah forgives all sins" — is among the most cited verses in the entire Quran for its power to reopen hearts that have closed. The scholars say this verse is addressed to the worst of sinners, specifically: not the mediocre, not the slightly wayward, but those who know they have committed enormous wrongs. For them, the Quran opens a door and says: still.

Raja' is one half of the heart's orientation toward Allah, paired with khawf (fear). The scholars are clear that false hope — the assumption that Allah will forgive without the person making any effort to return — is not raja' but ghurur (delusion). True raja' is always accompanied by action: the one who hopes for a harvest plants the seed, waters it, removes the weeds, and then trusts Allah for the rain. The one who sits in an empty field hoping for a harvest has confused hope with passivity.`,

    root: {
      letters: 'ر–ج–و',
      transliteration: 'r–j–w',
      meaning: 'To hope; to expect; to look forward to with longing',
      elaboration: "The root r–j–w carries both the sense of expectation and the sense of longing — something you look toward with desire. The form raja' (maṣdar of rajā) is the settled, noun-form of this motion — not the momentary flicker of hope but the sustained posture of a heart oriented toward what it expects from Allah. The same root appears in the Quran as yarjū ('he hopes/expects') and marjū ('something hoped for').",
    },

    occurrenceCount: 70,
    occurrenceNote: "The root r–j–w and its derivatives appear approximately 70 times in the Quran. The verb yarjū (he hopes for / he expects) is the most common form, often followed by Allah's mercy or the meeting with Allah as the object of hope.",

    keyAyahs: [
      {
        ref: '39:53',
        arabic: 'قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا',
        translation: 'Say: O My servants who have transgressed against themselves — do not despair of the mercy of Allah. Indeed, Allah forgives all sins.',
        note: "One of the most beloved verses in the entire Quran, cited by scholars as the most hope-giving verse in scripture. The address 'O My servants' is a divine intimacy — Allah is speaking directly, claiming these transgressors as His own even before the forgiveness is granted. The 'all sins' is inclusive and unqualified.",
      },
      {
        ref: '15:56',
        arabic: 'قَالَ وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِۦٓ إِلَّا ٱلضَّآلُّونَ',
        translation: 'He said: Who despairs of the mercy of his Lord except those who are astray?',
        note: "The Prophet Ibrahim ﷺ, when told he would be given a son in his very old age and he marveled, was told this. Despair of Allah's mercy is classified here not as sadness but as dalal — going astray. It is a theological error, not just an emotional state.",
      },
      {
        ref: '94:5-6',
        arabic: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
        translation: 'Indeed, with hardship comes ease. Indeed, with hardship comes ease.',
        note: "The repetition is deliberate and the scholars analyzed it: the word for hardship (al-'usr) carries the definite article both times — the same hardship. But the word for ease (yusr) is indefinite — implying two different eases for every one hardship. The Quran is structuring raja' into the grammar of difficulty: ease is not somewhere ahead, it is already embedded in the hardship.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Raja must be rooted in action', arabic: 'الرجاء الصادق مقرون بالعمل', arabicTranslit: "al-rajāʾ al-ṣādiq maqrūn bi-al-ʿamal", description: "The scholars are unanimous: raja' without action is ghurur (self-delusion). Ibn al-Qayyim uses the analogy of the farmer — he hopes for the harvest but does not plant. True raja' is accompanied by doing what one can: making tawbah, keeping obligatory worship, avoiding known sins. The hope is in Allah's mercy filling the gap between one's efforts and the prize, not replacing the effort entirely." },
        { number: 2, title: 'Strengthen raja at the moment of death', arabic: 'الرجاء عند الموت', arabicTranslit: "al-rajāʾ ʿinda al-mawt", description: "The hadith is clear: the Prophet ﷺ said, 'None of you should die except while having a good opinion (husn al-zann) of Allah.' The scholars say: as the moment of death approaches and the opportunity for action has passed, raja' should dominate over khawf — because at that moment, you are about to meet the Most Merciful, and it is meet to arrive with the posture of trust. This is why Islamic tradition emphasizes the prayers and supplications at the deathbed that emphasize mercy." },
        { number: 3, title: "Know what Allah has said about His mercy", arabic: 'تعلّم كيف وصف الله رحمته', arabicTranslit: "taʿallam kayfa waṣafa Allāhu raḥmatahu", description: "Raja' is fed by knowledge of Allah's attributes — especially Al-Rahman, Al-Rahim, Al-Ghaffar (the Most Forgiving), Al-Tawwab (the Ever-Returning with mercy). The hadith qudsi says: 'My mercy precedes My wrath.' The Prophet ﷺ said Allah has one hundred mercies, and has sent one to the earth from which all creatures show compassion to one another — the remaining ninety-nine are reserved for the Day of Judgment. Knowing these things gives raja' a concrete object." },
      ],
      stations: [
        { name: 'The moment after falling', description: "Raja' is most needed and most powerful immediately after a sin. The Quran describes Shaytan's strategy as making sin seem final — as though it has severed the connection to Allah permanently. The person of raja' knows that the connection is severed only when they choose not to return. The door is open until the moment of death (the rattling in the throat) — and that knowledge is what prevents a single fall from becoming a collapse." },
        { name: 'Hope that transforms, not comforts', description: "The scholars warn against 'hope' that functions as a buffer against change — the person who says 'Allah is merciful' as a reason to not examine themselves. Real raja' is uncomfortable in the way that a patient's hope for recovery motivates them to take the medicine. If your raja' makes you less careful, less attentive, less motivated toward Allah — it has become ghurur. If it makes you eager to return, to repair, to continue — it is alive." },
        { name: 'The widening circle of hope', description: "As the heart matures in raja', the scope of what it hopes for expands. The beginner hopes for personal salvation. The intermediate hopes for the forgiveness of those they love. The advanced hope for the mercy of Allah to encompass all of creation — they cannot bear the thought of anyone remaining outside of it, and this expands their du'a to encompass the ummah, the Muslims, and humanity. The Quran describes the Prophets and the awliya making broad intercessions — this is raja' at full extension." },
      ],
      questions: [
        { question: "Can raja' coexist with having committed serious sins?", answer: "This is precisely what 39:53 addresses — and it addresses it to those who have transgressed the most. Ibn Kathir records that this verse was so beloved to the companions that they called it the most hope-giving verse in the Quran. The condition is not that the sins be minor; the condition is that the person still turns. As long as the heart is turned toward Allah, raja' is not only permissible — it is obligatory. Despairing is the theological error, not hoping." },
        { question: "Is there a difference between raja' and wishful thinking?", answer: "Yes — the scholars drew a firm line. Wishful thinking (umniyya, tamanni) is desire without action or realistic basis. A person says 'I hope Allah forgives me' while making no effort to stop sinning and never making tawbah. Raja' is desire with action: the person has genuinely turned, made their best effort, and then hopes that Allah will complete what they cannot complete by themselves. Umniyya is hope in oneself; raja' is hope in Allah after exhausting oneself." },
        { question: "How do I cultivate raja' when I feel only despair?", answer: "The scholars' prescriptions are consistent: read the verses of mercy in the Quran (39:53, 15:56, 93:1-5) slowly and repeatedly until they enter. Read the hadiths of Allah's mercy — especially the hadith qudsi: 'O son of Adam, if you came to Me with sins nearly filling the earth and you met Me not associating anything with Me, I would meet you with forgiveness nearly filling it.' Spend time with people who have hope. Make du'a even when it feels hollow — the act of asking is itself a form of belief that there is Someone who can answer." },
      ],
    },

    semanticField: [
      { slug: 'khawf',   arabic: 'خَوْف',   transliteration: 'Khawf',   relationship: 'parallels', relationshipLabel: "Paired with — fear and hope are the two wings", description: "The classical formulation is that the believer's heart flies to Allah on two wings: khawf and raja'. The scholars debated which should dominate and concluded: in life, roughly equal, with khawf slightly more prominent for those who tend toward negligence; at the moment of death, raja' should prevail because despair at that moment is prohibited." },
      { slug: 'tawbah',  arabic: 'تَوْبَة',  transliteration: 'Tawbah',  relationship: 'deepens',   relationshipLabel: "Companion of — raja' opens the door that tawbah walks through", description: "Without raja', tawbah cannot happen — because tawbah requires believing that returning will be received. The person who has despaired of Allah's mercy cannot make tawbah because they don't believe the return is possible. Raja' is what makes tawbah thinkable, and tawbah is what makes raja' not merely wishful." },
      { slug: 'rahmah',  arabic: 'رَحْمَة',  transliteration: 'Rahmah',  relationship: 'deepens',   relationshipLabel: "Object of — raja' hopes for Allah's mercy above all", description: "The specific quality of Allah that raja' most often reaches toward is rahmah (mercy). The Quran identifies Allah as Al-Rahman Al-Rahim at its opening, and the scholars say this is intentional: the first two attributes the believer is asked to know are both forms of mercy. Hope is the orientation of the heart toward a Merciful God — remove the mercy and the hope has no object." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Raja' is one of the most powerful stations — it is the fuel of the spiritual journey. The servant cannot continue toward Allah without it. The heart that has lost raja' has stopped moving, and the heart that stops moving toward Allah begins to move away from Him. There is no standing still on this path.", source: "Madarij al-Salikin" },
      { scholar: "Al-Muhasibi", text: "True raja' is the hope of the one who has planted the seed, watered it, and removed everything that might harm it — and then looks to the sky. False raja' is the hope of the one who has left the field empty and expects a harvest.", source: "Al-Ri'aya li-Huquq Allah" },
      { scholar: 'Ibn Rajab al-Hanbali', text: "The verse 'Do not despair of the mercy of Allah' is addressed specifically to those who have transgressed greatly — not to those who have sinned mildly. Its address ('O My servants') preserves the relationship even before the forgiveness. This is the generosity of Allah: He calls them His servants even in their transgression, and opens the door to mercy even before they have turned.", source: "Jami' al-Ulum wa-al-Hikam" },
    ],

    hadith: [
      { ref: "Muslim", arabic: "لَا يَمُوتَنَّ أَحَدُكُمْ إِلَّا وَهُوَ يُحْسِنُ الظَّنَّ بِاللهِ عَزَّ وَجَلَّ", translation: "None of you should die except while having a good opinion of Allah, the Mighty and Majestic.", note: "This hadith makes husn al-zann (good opinion of Allah) a religious obligation at the time of death — making raja' not merely recommended but required at the moment of departure. The Prophet ﷺ reported elsewhere that Allah says: 'I am as My servant thinks of Me' (ana 'inda zann 'abdi bi) — so the thought itself is consequential." },
    ],

    acrossTransitions: `Hope in divine mercy is perhaps the most universal spiritual experience across religious traditions, but its precise structure differs significantly.

In Christianity, hope (elpis in Greek, spes in Latin) is one of the three theological virtues (with faith and charity). The Christian hope is specifically eschatological: it is hope for resurrection, for eternal life, for the fulfillment of God's promises in the last days. St. Paul writes that hope is not seen — "hope that is seen is not hope" — which means it is directed toward what has not yet arrived. The Quran's raja' shares this eschatological dimension but adds the present dimension: hope in Allah's mercy for one's current situation, not only for the afterlife.

In Jewish spirituality, bitachon (trust/reliance on God) and tikvah (hope) are closely related to raja'. The Psalms are saturated with hope: "I wait for the LORD, my soul waits, and in His word I hope" (130:5). The Hebrew concept of hesed (lovingkindness) — God's steadfast, covenant love — is the object of this hope, parallel to rahmah in the Quran. The Jewish prayer Avinu Malkeinu ("Our Father, Our King") is a sustained act of raja': bringing the self before God in complete dependence and asking for mercy.

In Sufi spirituality, raja' is often described through the image of a person drowning: they cannot save themselves; all they can do is call out. The one who calls is the one who still has hope that the call will be answered. To stop calling is not acceptance — it is despair. The cry itself is the spiritual practice: ya Rabb, ya Rahman, ya Rahim. This is raja' in its most elemental form: the heart that cannot save itself but refuses to stop calling toward the One who can.`,

    relatedTerms: [
      { slug: 'khawf',   transliteration: 'Khawf',   term: 'خَوْف'    },
      { slug: 'tawbah',  transliteration: 'Tawbah',  term: 'تَوْبَة'  },
      { slug: 'rahmah',  transliteration: 'Rahmah',  term: 'رَحْمَة'  },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'nadam',   transliteration: 'Nadam',   term: 'نَدَم'    },
    ],

    goDeeper: [
      { slug: 'az-zumar', surahName: 'Az-Zumar', note: "Contains 39:53 — arguably the single most hope-giving verse in the Quran, addressed explicitly to those who have transgressed greatly. The surah as a whole presents the contrast between those who despair and those who hold to hope, culminating in the gates of paradise opened for the people of taqwa." },
      { slug: 'ad-duha', surahName: 'Ad-Duha', note: "A surah revealed at a moment of the Prophet ﷺ's own distress, when revelation had paused and he feared abandonment. The entire surah is a divine response with raja': 'Your Lord has not forsaken you nor despised you... and the next life is better for you than the first.' The Prophet's own experience of raja' in crisis makes this the most intimate Quranic meditation on hope." },
    ],
  },

  ikhlas: {
    slug: 'ikhlas',
    term: 'إِخْلَاص',
    transliteration: 'Ikhlas',
    pronunciation: 'ikh-LAAS',
    category: 'States of the Heart',
    evocativeLine: 'Sincerity stripped of all audience — the deed done when only Allah is watching.',
    hasFullEntry: true,

    summary: `Ikhlas is sincerity — the purification of an act from any motivation other than Allah. It is what remains when the desire for praise has been removed, when the fear of criticism has been removed, when the hope for social reward has been removed. What is left is the deed done for Allah alone. The scholars called it "the secret of secrets" because it is invisible to everyone except Allah and barely legible even to the person themselves.

The Quran names an entire surah Al-Ikhlas (Surah 112), and while that surah is about the purity and oneness of Allah's nature (the word ikhlas in that context refers to Allah's transcendence of mixture or partnership), the spiritual concept of ikhlas as sincerity flows directly from it: just as Allah is free of all mixture and associate, so the sincere worshipper's deed is free of mixture with anything other than Allah. When the scholars want to give the highest praise to an act of worship, they say it was done with ikhlas — undiluted, unreservedly for Allah.

Ikhlas is what makes deeds weigh on the scale. The scholars of the heart say: a small deed done with ikhlas outweighs a large deed done with riya' (ostentation). The Prophet ﷺ was asked who would receive his intercession: he said the one who says "la ilaha illa Allah" with ikhlas from the heart. Not the one who says it most often, not the one who says it loudest — the one who says it sincerely. Ikhlas is the soul of every act; without it, the body of the act is there but the spirit has left.`,

    root: {
      letters: 'خ–ل–ص',
      transliteration: 'kh–l–ṣ',
      meaning: 'To be pure; to be free of mixture; to escape or be extracted from something',
      elaboration: "The root kh–l–ṣ carries the vivid image of something being purified or extracted — khalasa means to be freed, to escape, to be extracted cleanly. Ikhlas is the verbal noun of Form IV (ikhlaṣa — to make something pure). The image embedded in the word is of removing everything impure from something until what remains is uncontaminated: pure gold, pure water, pure intention. Mukhlis (the one who has ikhlas) is someone whose worship has been extracted of all other motivation.",
    },

    occurrenceCount: 31,
    occurrenceNote: "The root kh–l–ṣ appears approximately 31 times in the Quran in various forms. The most significant occurrence is Surah Al-Ikhlas itself, whose name encapsulates both the purity of Allah's oneness and the sincerity demanded of the worshipper.",

    keyAyahs: [
      {
        ref: '98:5',
        arabic: 'وَمَآ أُمِرُوٓا۟ إِلَّا لِيَعْبُدُوا۟ ٱللَّهَ مُخْلِصِينَ لَهُ ٱلدِّينَ',
        translation: 'And they were not commanded except to worship Allah, sincere to Him in religion.',
        note: "The most direct Quranic statement of what religion ultimately demands: to worship Allah with ikhlas. The scholars say this verse contains the essence of the entire Quran. All the commands, all the prohibitions, all the beliefs — they are all in service of this: worship that is purified of everything other than Allah.",
      },
      {
        ref: '39:2-3',
        arabic: 'فَٱعْبُدِ ٱللَّهَ مُخْلِصًا لَّهُ ٱلدِّينَ ۗ أَلَا لِلَّهِ ٱلدِّينُ ٱلْخَالِصُ',
        translation: 'So worship Allah, sincere to Him in religion. Unquestionably, to Allah belongs pure religion.',
        note: "The phrase al-din al-khalis (the pure/sincere religion) is the Quranic definition of authentic worship. Al-Khalis is the superlative-intensified form of khalasa — utterly pure, free of all contamination. Pure religion is religion with ikhlas.",
      },
      {
        ref: '112:1-4',
        arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ',
        translation: 'Say: He is Allah, the One. Allah, the Self-Sufficient. He neither begets nor was He begotten. And none is comparable to Him.',
        note: "The surah named Al-Ikhlas. The Prophet ﷺ said it is equal to a third of the Quran in weight because it encapsulates tawhid — and tawhid is the theological basis of ikhlas. If God is utterly One, then worship directed to anything alongside Him is a failure of ikhlas at the level of theology, not just psychology.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Ikhlas cannot be produced directly', arabic: 'الإخلاص لا يُصنع', arabicTranslit: "al-ikhlāṣ lā yuṣnaʿ", description: "The scholars noted a paradox: the attempt to have ikhlas can itself become a form of performance — 'I am being sincere' becomes its own kind of self-congratulation. True ikhlas is often described as the absence of awareness of one's own sincerity — the deed flows toward Allah without the person monitoring it. What one can do is remove the obstacles: reduce the desire for praise, reduce the time spent with people who encourage showing off, and pray consistently for ikhlas (the du'a 'O Allah, make my deeds sincere' is in the tradition)." },
        { number: 2, title: 'Riya is its opposite and its greatest danger', arabic: 'الرياء ضد الإخلاص', arabicTranslit: "al-riyāʾ ḍidd al-ikhlāṣ", description: "Riya' — doing deeds to be seen — is the direct opposite of ikhlas, and the Prophet ﷺ called it the 'hidden shirk.' It is hidden because it is invisible in the outer act: the prayer looks like prayer; the charity looks like charity. But the motivation is human observation rather than divine. The scholars say riya' can corrupt even a deed that seemed sincere — if it begins for Allah and shifts midway to seeking praise, the scholars differed on what that does to the deed." },
        { number: 3, title: 'Consistency regardless of audience', arabic: 'المداومة في السر والعلن', arabicTranslit: "al-mudāwama fī al-sirr wa-al-ʿaln", description: "One practical test of ikhlas is whether the deed persists when no one is watching. The person who prays in public and abandons prayer in private, who gives charity when it can be seen and withholds it in private, is exhibiting riya'. The scholars say: check whether your acts of worship are consistent in private and public — this is not a perfect test (even private deeds can be done for some private self-image), but it reveals the most obvious layer of ikhlas or its absence." },
      ],
      stations: [
        { name: "The freed slave", description: "Ibn al-Qayyim described ikhlas using the image of a slave who has been freed — their work is no longer for any master except the one who freed them. The mukhlis (the one of ikhlas) has been freed from the slavery of other people's opinions, the slavery of self-image, the slavery of wanting reward in this life. Every other motivation has dropped away; only Allah remains as the orientation of the deed. This is liberation — not a burden added but the heaviest burden removed." },
        { name: "Hidden deeds as the test", description: "The scholars consistently recommended maintaining acts of worship that are entirely private — known only to Allah. Voluntary fasting (not announced), charity (given secretly), night prayer (when the household is asleep), dhikr (in the heart without moving the lips). These private acts are the training ground of ikhlas because there is no possible audience. If you keep them up, it is evidence that the motivation is real. If they are the first to go when life gets busy, it reveals what was really driving the public acts." },
        { name: "Ikhlas and karamah", description: "The tradition records that ikhlas sometimes produces karamat — extraordinary events that the scholars attribute not to the person's status but to the purity of their connection with Allah at that moment. The three men trapped in a cave who prayed using their most sincere deeds (hadith Bukhari & Muslim) — this is ikhlas in extremis: when all other means are exhausted, the sincere deed becomes the key. The scholars say this is not magic; it is the natural consequence of genuine alignment with the one Whose will governs all things." },
      ],
      questions: [
        { question: "What if I cannot tell whether my deeds are sincere?", answer: "This is the universal spiritual condition — the scholars say that almost no one can claim perfect certainty about their own sincerity. Al-Ghazali wrote that one of the signs of ikhlas is the very inability to be certain about it, because the person who is fully confident of their sincerity may have confused confidence with sincerity. The prescription is: keep going, keep making du'a for ikhlas, keep removing what you know is driving you toward riya', and leave the judgment to Allah. The Prophet ﷺ himself prayed for ikhlas regularly." },
        { question: "Does having good feelings when others praise my worship mean I have riya'?", answer: "The scholars distinguished several types of post-deed pleasure. If the deed was done sincerely and you are pleased afterward that others can see it — this is not riya', it is a human feeling. If the deed was done because you wanted others to see it — this is riya'. If you feel distressed when others do not notice your worship — this is also a sign of riya'. The middle category (feeling pleased after) is not corrupt; the problem is when the pleasure in the observation becomes the purpose of the act." },
        { question: "Can I do a deed for both Allah and worldly benefit?", answer: "The scholars debated this carefully. The principle is: if the primary motivation is Allah and the worldly benefit is incidental (e.g., charity that also builds social relationships), the deed is valid. If the deed would not have been done without the worldly benefit, the ikhlas is compromised. A test: would you do this deed if no one would ever know and you would receive no worldly benefit from it? If yes, the ikhlas is likely present. If no, the worldly motivation may be primary." },
      ],
    },

    semanticField: [
      { slug: 'tawhid',   arabic: 'تَوْحِيد', transliteration: 'Tawhid',   relationship: 'deepens', relationshipLabel: "Rooted in — ikhlas is tawhid at the level of deed", description: "Tawhid is the oneness of Allah in theology; ikhlas is the oneness of Allah in motivation. Just as tawhid says 'there is no god but Allah,' ikhlas says 'there is no motivation for this deed but Allah.' The scholars said: riya' is a hidden form of shirk — giving some portion of one's deed to other than Allah. Ikhlas is tawhid in action." },
      { slug: 'nifaq',    arabic: 'نِفَاق',   transliteration: 'Nifaq',    relationship: 'parallels', relationshipLabel: "Opposite of — hypocrisy is ikhlas inverted", description: "Nifaq (hypocrisy) is the extreme opposite of ikhlas: the outward act contradicts the inner state, with the inner state carefully hidden. Ikhlas is the inner state and outer act aligned in the direction of Allah. Nifaq is alignment in the direction of people. The Quran addresses the munafiqin as the primary spiritual danger to the community precisely because this split between inner and outer is the most corrupting." },
      { slug: 'tawbah',  arabic: 'تَوْبَة',  transliteration: 'Tawbah',  relationship: 'deepens',  relationshipLabel: "Partner of — sincere return requires sincere intention", description: "Tawbah without ikhlas is not tawbah — it is performance of repentance. If the person turns outwardly because of social pressure but inwardly has no intention to change, the scholars say the tawbah has not occurred. Ikhlas is what makes tawbah real: the turn is to Allah, not to reputation." },
    ],

    scholarsSaid: [
      { scholar: 'Sufyan al-Thawri', text: "Nothing was harder for me to treat than my intention — because it keeps changing on me.", source: "Cited in Ibn Rajab, Jami' al-Ulum" },
      { scholar: 'Al-Fudayl ibn Iyad', text: "Abandoning deeds because of people is riya'. Doing deeds because of people is shirk. Ikhlas is that Allah frees you from both.", source: "Cited in Ibn al-Qayyim, Madarij al-Salikin" },
      { scholar: 'Ibn al-Qayyim', text: "Ikhlas is that the servant's motive for the deed is Allah alone — not seeking praise from people, not fleeing their criticism, not seeking worldly return. When the deed is for Allah alone, from beginning to end, without any other motivation entering — that is ikhlas.", source: "Al-Fawa'id" },
    ],

    hadith: [
      { ref: "Bukhari", arabic: "أَسْعَدُ النَّاسِ بِشَفَاعَتِي يَوْمَ الْقِيَامَةِ مَنْ قَالَ لَا إِلَهَ إِلَّا اللَّهُ خَالِصًا مِنْ قَلْبِهِ", translation: "The person who will most benefit from my intercession on the Day of Judgment is the one who says 'la ilaha illa Allah' sincerely (khalisan) from the heart.", note: "The word khalisan (sincerely, purely) is the adverbial form of the same root as ikhlas — and the Prophet ﷺ uses it to identify what makes the testimony of faith consequential on the most important day. Not repetition, not volume, not length of religious career: sincerity." },
    ],

    acrossTransitions: `Sincerity of intention is prized in every religious tradition, but the Islamic framework of ikhlas has a specificity that distinguishes it.

In Christian ethics, the concept of purity of intention (puritas intentionis) is central to moral theology — particularly in the Augustinian tradition where the worth of an act depends on whether it is done for the love of God or for some other end. Thomas Aquinas, following Augustine, taught that a good act done for the wrong reason is not truly good. The concept of 'doing good for God's sake alone' is the Christian equivalent of ikhlas, though the tradition lacks a single technical term as precise and as frequently discussed as ikhlas in Islamic discourse.

In Kantian ethics, the concept of acting from duty (aus Pflicht) rather than merely in conformity with duty bears a structural resemblance to ikhlas: Kant argued that the moral worth of an act comes from the motivation (good will, duty) rather than the outcome. The person who gives to charity because it makes them feel good does not have the same moral worth as the one who gives purely from a sense of duty. The difference from ikhlas is that Kant's framework is rational and impersonal; ikhlas is directed toward a personal God.

In Buddhist ethics, the concept of dana (generosity) without expectation of return, and the emphasis on karuna (compassion) free of ego-attachment, parallel ikhlas. The meditation tradition extensively analyzes the problem of 'spiritual ego' — the subtle way in which even spiritual practice can become another arena for self-advancement. This is the Buddhist name for what Islamic ethics calls riya'.

What is unique to Islamic ikhlas is its institutional embedding: the hadith literature is full of specific tests, descriptions, and prescriptions for achieving and maintaining it. The tradition has a detailed phenomenology of insincerity (riya', sum'a, ujub — showing off, seeking to be heard, self-admiration) and equally detailed practices for their treatment. Ikhlas is not just a virtue to aspire to but a diagnosed condition to be worked on.`,

    relatedTerms: [
      { slug: 'tawhid',   transliteration: 'Tawhid',   term: 'تَوْحِيد' },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
      { slug: 'khushu',   transliteration: "Khushu'",  term: 'خُشُوع'   },
      { slug: 'nadam',    transliteration: 'Nadam',    term: 'نَدَم'    },
    ],

    goDeeper: [
      { slug: 'al-bayyinah', surahName: 'Al-Bayyinah', note: "Contains the verse (98:5) that the scholars consider the most concise statement on ikhlas: 'They were not commanded except to worship Allah, sincere to Him in religion.' The surah also sets ikhlas in the context of accountability — the sincere worshippers are described as the best of creation." },
      { slug: 'az-zumar', surahName: 'Az-Zumar', note: "Opens with a direct command to worship with ikhlas (39:2-3) and introduces the phrase al-din al-khalis (the pure religion). The surah then contrasts the person of ikhlas with the person who associates partners with Allah — making ikhlas the personal equivalent of tawhid." },
    ],
  },

  malaika: {
    slug: 'malaika',
    term: 'مَلَائِكَة',
    transliteration: 'Malaika',
    pronunciation: 'ma-LAA-i-ka',
    category: 'The Unseen',
    evocativeLine: 'Beings of light and obedience — woven through all of creation, seen by none.',
    hasFullEntry: true,

    summary: `Malaika (singular: malak) are the angels — beings of light created from nur (light) whose existence is one of the pillars of Islamic faith. Belief in the angels (Iman bi-al-malaika) is the second article of faith after belief in Allah, appearing in the famous hadith of Jibril that defines Islam, Iman, and Ihsan. To deny the existence of the angels is to step outside the boundaries of faith — not because the angels themselves are objects of worship, but because belief in the unseen (al-ghayb) is the foundational act of the Quran's worldview, and the angels are the most prominent inhabitants of that unseen realm.

The Quran paints the angels with extraordinary specificity: they glorify Allah unceasingly, they never disobey a command, they carry the throne of Allah, they descend with revelation, they record every deed, they receive the souls at death, they stand guard over Jahannam, they greet the inhabitants of Jannah. The angels are not decorative — they are the infrastructure of divine governance. Everything that moves from heaven to earth and from earth to heaven moves through or with them. The Quran says there is no human action that goes unrecorded by the kiraman katibin (the noble scribes), that every person has angels preceding and following them (mu'aqqibat), and that Jibril (Gabriel) is the one who brought the Quran to the Prophet's heart.

What the Quran most emphasizes about the malaika is their utter obedience — "they do not disobey Allah in what He commands them, and they carry out what they are commanded" (66:6). This is the angels' defining quality: they were created without the capacity for disobedience. This is what makes them different from humans and jinn — both of whom have will and can choose. The angels' perfection is the perfection of full alignment. The human's dignity is greater in one sense — they can choose alignment — but the danger is correspondingly greater, because they can also choose its opposite.`,

    root: {
      letters: 'م–ل–ك / أ–ل–ك',
      transliteration: 'm–l–k / ʾ–l–k',
      meaning: 'To possess, to reign; or from ʾ–l–k: to send on a message',
      elaboration: "The root of malak is debated by the linguists. Some derive it from m–l–k (to possess/rule) suggesting the angel as one who holds power. Others derive it from ʾ–l–k (to send) suggesting the angel as messenger — and this aligns with the Greek angelos (messenger) from which the English 'angel' comes. The plural malaika is the standard Quranic form; the form malak (singular) also appears in the Quran.",
    },

    occurrenceCount: 88,
    occurrenceNote: "The root appears approximately 88 times in the Quran in various forms — malak (singular), malaika (plural), and the specific named angels (Jibril, Mika'il, Israfil by implication, Malik, Ridwan). The angels appear in some form in virtually every major narrative in the Quran.",

    rootForms: [
      { arabic: 'مَلَك', transliteration: 'malak', type: 'Singular noun', meaning: 'Angel — one angel', approxCount: 20, verified: false },
      { arabic: 'مَلَائِكَة', transliteration: 'malaika', type: 'Plural noun', meaning: 'Angels — the plural form', approxCount: 68, verified: false },
    ],

    keyAyahs: [
      {
        ref: '66:6',
        arabic: 'لَّا يَعْصُونَ ٱللَّهَ مَآ أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
        translation: 'They do not disobey Allah in what He commands them, and they carry out what they are commanded.',
        note: "The angels' defining characteristic in the Quran: perfect, total, perpetual obedience. No individual will, no resistance, no fatigue, no distraction. The scholars use this verse to describe what the believers are moving toward — not the absence of will, but the alignment of will with Allah's command that the angels embody by nature.",
      },
      {
        ref: '2:30',
        arabic: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً',
        translation: "And when your Lord said to the angels: I am placing a khalifah on the earth.",
        note: "The first scene of human creation in the Quran involves the angels — Allah announces to them the creation of humanity. Their question ('Will you place therein one who will cause corruption?') reveals that they were aware of what came before; their submission to the divine will after the prostration to Adam reveals the structure of their obedience.",
      },
      {
        ref: '50:17-18',
        arabic: 'إِذْ يَتَلَقَّى ٱلْمُتَلَقِّيَانِ عَنِ ٱلْيَمِينِ وَعَنِ ٱلشِّمَالِ قَعِيدٌ ۝ مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ',
        translation: 'When the two receivers receive — seated to the right and to the left — not a word is uttered except that with him is an observer, ready.',
        note: "The recording angels (kiraman katibin / the two receivers) — one to the right (recording good deeds) and one to the left (recording wrongs). Every word is recorded before it has fully left the mouth. This verse is meant to produce consciousness: the person who truly believes this speaks differently.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Belief in the angels is a pillar of faith', arabic: 'الإيمان بالملائكة ركن من أركان الإيمان', arabicTranslit: "al-īmān bi-al-malāʾika rukn min arkān al-īmān", description: "The hadith of Jibril defines Iman as belief in Allah, His angels, His books, His messengers, the Last Day, and qadar. Angels are second on this list. The scholars say: to deny the existence of the angels is kufr because it is to call the Quran false — which mentions them hundreds of times in specific roles. Belief in the angels is not just theological assent but a worldview shift: you live in a world that is full, inhabited, and watched." },
        { number: 2, title: "The angels' presence is morally generative", arabic: 'الملائكة مع المؤمن', arabicTranslit: "al-malāʾika maʿ al-muʾmin", description: "The tradition is rich with descriptions of how the believer's good deeds affect the angels: the angels ask forgiveness for those who make dhikr, they descend at gatherings of knowledge (halaqs), they crowd the mosque on Friday seeking those who arrived early, they say 'Amin' when the imam says 'Amin' in prayer so that any whose Amin coincides with the angels' Amin will be forgiven. Belief in the angels is not abstract — it shapes how the believer inhabits their worship." },
        { number: 3, title: "The recording angels demand consciousness", arabic: 'الكتبة الكرام يوجبون اليقظة', arabicTranslit: "al-kataba al-kirām yūjibūn al-yaqaẓa", description: "The belief that every word is recorded by angels who do not miss anything is the strongest possible argument for consciousness in speech. The Quran says 'not a word is uttered except there is an observer ready' — this is meant to produce a specific practice: asking before speaking, 'Will I be pleased to have this recorded? Will I be pleased for Allah to see this?'" },
      ],
      stations: [
        { name: "Jibril — the angel of revelation", description: "Jibril (Gabriel) is the most prominent angel in the Quran — he is called Ruh al-Qudus (the Holy Spirit), Ruh al-Amin (the Faithful Spirit), and is described as possessing power, and as holding an honored station before the Lord of the Throne (81:20-21). His role is singular: he brought the Quran to the Prophet ﷺ's heart. The scholars say: every word of the Quran passed through Jibril. His faithfulness in transmission is part of what makes the Quran's authority absolute." },
        { name: "The angels of death — 'Izra'il and his helpers", description: "The Quran describes the angels who receive souls at death: the angel of death (malak al-mawt), who extracts the soul, and his assistants. The manner of extraction differs: 'Those whom the angels take in a state of goodness — they say: Peace be upon you; enter paradise' (16:32), while the taking of the unjust is described as severe. The manner of one's death — and the angels' attitude at that moment — is described as reflecting the state of the dying person's heart and deeds." },
        { name: "The angels of Jannah as its inhabitants", description: "The Quran describes the angels entering upon the people of Jannah from every gate: 'Peace be upon you for what you patiently endured — how excellent is the final home!' (13:24). In jannah the believers will encounter the beings they could not see in the dunya — and the tradition says that meeting Jibril, the one who brought the speech of Allah to the Prophet ﷺ, is one of the great distinctions of paradise. The unseen becomes the fully seen." },
      ],
      questions: [
        { question: "Do the angels know the unseen (al-ghayb)?", answer: "No — and this is stated clearly in the Quran. When Allah told the angels He was creating a khalifah, they did not know what He knew (2:30). When they were asked to name the things Adam named, they could not (2:32). The angels have extraordinary knowledge — of their specific domains, of what they observe — but the knowledge of al-ghayb belongs to Allah alone. Even Jibril does not know the Hour. This distinction is important: the angels are creatures, not co-omniscient with Allah." },
        { question: "Do the angels have gender?", answer: "No — and the Quran explicitly rejects the pre-Islamic Arab claim that the angels were daughters of Allah (37:149-153, 43:19). This claim is called a 'grave offense' (iftira' kabir). The scholars say the angels have no gender as humans understand it — they are beings of a different ontological category. The Quran's rejection of the 'daughters of Allah' claim is both a rejection of shirk (associating partners) and of misrepresenting the nature of the angels." },
        { question: "Should I think about the angels during salah?", answer: "The tradition encourages an awareness that the angels are present during salah. The hadith that when you say Amin in salah and the angels say Amin simultaneously, past sins are forgiven — this creates an awareness of the invisible congregation. The awareness is not meant to distract from Allah but to deepen khushu' — you are not alone in a room; you are standing in a company whose worship never ceases, and your salah joins theirs." },
      ],
    },

    semanticField: [
      { slug: 'al-ghayb', arabic: 'ٱلْغَيْب', transliteration: 'Al-Ghayb', relationship: 'deepens', relationshipLabel: "Inhabitants of — angels are the primary population of al-ghayb", description: "The malaika are among the most prominent members of al-ghayb — the unseen realm that the Quran opens by asking believers to believe in (2:3). The angels, jinn, and all the realities of the barzakh and what lies beyond it — all of these are al-ghayb. Belief in the angels is belief in al-ghayb made concrete." },
      { slug: 'barzakh',  arabic: 'بَرْزَخ',  transliteration: 'Barzakh', relationship: 'deepens', relationshipLabel: "Active in — angels manage the transition and life of the barzakh", description: "The malaika are intimately involved in the barzakh: they receive souls at death, they establish the conditions of the intermediate life, they question the deceased (Munkar and Nakir), and they maintain the state of reward or punishment until the resurrection. The barzakh is not empty — it is full of angelic activity that the living cannot perceive." },
      { slug: 'jannah',  arabic: 'جَنَّة',   transliteration: 'Jannah',  relationship: 'deepens', relationshipLabel: "Greeted by — angels welcome the people of jannah", description: "The Quran describes the angels entering upon the people of Jannah from every gate, offering salam (peace) and congratulating them. The presence of the angels in Jannah as companions and greeters is one of the Quran's most vivid details of paradise. Meeting Jibril — the angel of revelation — is described in hadith as one of the extraordinary honors reserved for the people of the highest levels." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Kathir', text: "The angels are an exalted creation. Allah created them from light, gave them complete obedience to His commands, and placed them throughout the universe as executors of His will. They are too numerous to count — 'None knows the soldiers of your Lord except Him' (74:31).", source: "Tafsir Ibn Kathir, commentary on 2:30" },
      { scholar: 'Ibn Hajar al-Asqalani', text: "The scholars have agreed that the angels are alive, speaking, rational beings — not merely forces of nature or symbolic abstractions. Their existence is established by the Quran, the Sunnah, and the consensus of the Muslims. Whoever denies their existence has rejected what is definitively established in the religion.", source: "Fath al-Bari" },
    ],

    hadith: [
      { ref: "Muslim", arabic: "خُلِقَتِ الْمَلَائِكَةُ مِنْ نُورٍ وَخُلِقَ الْجَانُّ مِنْ مَارِجٍ مِنْ نَارٍ وَخُلِقَ آدَمُ مِمَّا وُصِفَ لَكُمْ", translation: "The angels were created from light, the jinn were created from a mixture of fire, and Adam was created from what has been described to you.", note: "The foundational hadith establishing the material of the angels' creation. The scholars note that 'light' here is not the same light as the created light of the sun — the angels are beings of a different ontological category, not merely bright creatures." },
    ],

    acrossTransitions: `Angels appear in every Abrahamic tradition, but their precise nature and role differs significantly.

In Judaism, the mal'akhim (the Hebrew parallel to malaika — both meaning 'messenger') appear throughout the Torah and the Prophets: as wrestlers with Jacob, as visitors to Abraham, as agents of divine judgment on Sodom. The later Jewish mystical tradition (Kabbalah) elaborated an extensive angelology with hierarchies, names, and specific functions. The Talmud describes angels praising God day and night, disagreeing over the creation of humans, and standing before the divine throne. Many details in the Islamic tradition echo these Jewish developments, filtered through and verified or corrected by revelation.

In Christianity, angels are prominent in the New Testament: the angel Gabriel announces the birth of both John and Jesus; angels minister to Jesus after his temptation; angels announce the resurrection. The classical theological tradition — from Pseudo-Dionysius through Thomas Aquinas — developed an elaborate angelology with nine 'choirs' of angels arranged in three triads (seraphim, cherubim, thrones; dominations, virtues, powers; principalities, archangels, angels). This hierarchical schema has no Quranic basis but reflects a similar impulse to understand the divine governance through angelic intermediaries.

What distinguishes the Islamic treatment is its insistence on two things: the angels' absolute obedience (which is their defining attribute, not merely their behavior) and their complete submission to Allah without intermediary function between Allah and humans. In some Christian and Jewish angelology, the angels can have their own agenda, can intercede in ways Allah has not commanded, or can be objects of devotion. The Quran rejects all of this: the angels do exactly what they are commanded, no more, no less, and directing worship toward them is the same error as directing it toward anything other than Allah.`,

    relatedTerms: [
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
      { slug: 'barzakh',  transliteration: 'Barzakh',  term: 'بَرْزَخ'  },
      { slug: 'jannah',   transliteration: 'Jannah',   term: 'جَنَّة'   },
      { slug: 'jahannam', transliteration: 'Jahannam', term: 'جَهَنَّم' },
      { slug: 'shaytan',  transliteration: 'Shaytan',  term: 'شَيْطَان' },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains the central scene of the angels' encounter with the creation of Adam (2:30-34) — where they question, submit, and prostrate. This passage establishes the relationship between the malaika and humanity: the angels are older in creation, purer in nature, but humanity was given the knowledge of names — and it is the human who carries the amanah (trust) of khilafah." },
      { slug: 'fatir', surahName: 'Fatir', note: "Surah Fatir (The Originator) opens: 'Praise be to Allah, the Originator of the heavens and earth, who made the angels messengers with wings — two, three, and four.' This verse establishes the angels as specifically created messengers with a variety of forms — and grounds their existence in the creative act of Allah rather than in mythology or imagination." },
    ],
  },

  shaytan: {
    slug: 'shaytan',
    term: 'شَيْطَان',
    transliteration: 'Shaytan',
    pronunciation: 'shay-TAAN',
    category: 'The Unseen',
    evocativeLine: 'The one who refused — and has been whispering refusals ever since.',
    hasFullEntry: true,

    summary: `Shaytan (Satan) is the Quran's name for Iblis after his refusal to prostrate to Adam — and by extension for the accursed tempter who has declared enmity toward humanity until the Day of Judgment. The Quran tells the story of Shaytan with remarkable detail: he was of the jinn, he was among the angels in station (raised to the company of the angels through his worship), he refused when commanded to prostrate to Adam, he was expelled, he asked for respite until the Day of Judgment, it was granted, and he immediately declared his strategy — to approach humanity from every direction and lead as many as possible astray.

What makes the Quran's treatment of Shaytan distinctive is that it does not present him as a co-equal opposite of Allah (as in dualistic cosmologies). Shaytan is a creature, created by Allah, operating within the limits Allah has set. He was expelled not because he was too powerful but because he chose arrogance. His respite was granted not because Allah cannot stop him but because his existence is part of the test by which humans are distinguished. The Quran makes clear that Shaytan has no power over the sincere servants of Allah — his power is only over those who choose to follow him.

The Quran presents Shaytan's primary weapon as waswasa — whispers. He does not compel; he suggests. He does not force; he whispers doubts, desires, and rationalizations. The Quran ends with Surah Al-Nas — the chapter of Mankind — which is the last and most personal protection: seeking refuge from "the whisperer who withdraws, who whispers into the breasts of mankind, from among the jinn and mankind." Shaytan's most effective move is to be forgotten — to whisper so quietly that the person does not notice they are being whispered to.`,

    root: {
      letters: 'ش–ط–ن',
      transliteration: 'sh–ṭ–n',
      meaning: 'To be far, to be remote; to be rebellious',
      elaboration: "The root sh–ṭ–n is related to the sense of distance and deviance — the shaytan is the one who has removed himself far from Allah's mercy (the Arabic sha'ala — to distance from the good). Some scholars also relate it to the Hebrew 'satan' (the adversary, the accuser). In the Quran, 'shaytan' can refer both to Iblis specifically and generically to any being — human or jinn — that performs the function of temptation and leading astray.",
    },

    occurrenceCount: 88,
    occurrenceNote: "Shaytan appears approximately 88 times in the Quran. The name Iblis (his personal name) appears 11 times — always in contexts recounting the refusal and its consequences. The name Shaytan is used when describing his ongoing activity of temptation.",

    keyAyahs: [
      {
        ref: '7:16-17',
        arabic: 'قَالَ فَبِمَآ أَغْوَيْتَنِى لَأَقْعُدَنَّ لَهُمْ صِرَٰطَكَ ٱلْمُسْتَقِيمَ ۝ ثُمَّ لَءَاتِيَنَّهُم مِّنۢ بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ وَعَنْ أَيْمَٰنِهِمْ وَعَن شَمَآئِلِهِمْ',
        translation: "He said: Because You have put me in error, I will surely sit in wait for them on Your straight path. Then I will come to them from before them and from behind them and from their right and from their left.",
        note: "Shaytan's own declaration of his strategy — to intercept humanity on the path to Allah from every direction. The scholars note what he does not say: he cannot come from above (from the direction of Allah). This gap is intentional.",
      },
      {
        ref: '38:82-83',
        arabic: 'قَالَ فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ أَجْمَعِينَ ۝ إِلَّا عِبَادَكَ مِنْهُمُ ٱلْمُخْلَصِينَ',
        translation: 'He said: By Your might, I will surely mislead them all — except among them Your sincere servants.',
        note: "Shaytan himself acknowledges the limit of his power: he cannot touch the mukhlasin — those whom Allah has made purely sincere. This is why ikhlas is described as the ultimate protection against Shaytan's approach. He swears by Allah's might while opposing Allah's purpose — the irony is complete.",
      },
      {
        ref: '114:4-6',
        arabic: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ۝ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ ۝ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
        translation: 'From the evil of the retreating whisperer — who whispers into the breasts of mankind — from among the jinn and mankind.',
        note: "The Quran's final description of Shaytan's method: al-waswas al-khannas — the whisperer who withdraws. He whispers and then withdraws into the background so you forget he was there. The scholars note that the category of 'shayatin' includes both jinn and human beings who perform the same function — making Al-Nas a protection against all forms of corruption.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "Isti'adha — seeking refuge", arabic: 'الاستعاذة', arabicTranslit: "al-istiʿādha", description: "The primary Quranic prescription for dealing with Shaytan is isti'adha — seeking refuge in Allah from him: 'A'udhu billahi min al-Shaytan al-rajim.' The Quran commands this specifically before reciting the Quran (16:98) and advises it when one feels his whispers (41:36). The scholars say the effectiveness of isti'adha depends on the sincerity and presence of heart with which it is said — it is not a formula but a turning toward Allah." },
        { number: 2, title: "Ikhlas as the ultimate protection", arabic: 'الإخلاص حصن من الشيطان', arabicTranslit: "al-ikhlāṣ ḥiṣn min al-shayṭān", description: "Shaytan himself declared in the Quran that he cannot touch the mukhlasin (38:83). The scholars derive from this that the deepest protection against Shaytan is not formula but condition of heart: sincerity. The person who does things purely for Allah, without audience-seeking, without self-deception, provides no foothold for Shaytan's whispers — because his primary strategy is to insert riya', doubt, and rationalization into cracks of self-interest." },
        { number: 3, title: "Recognize his methods", arabic: 'معرفة أساليبه', arabicTranslit: "maʿrifat asālībihi", description: "The Quran and Sunnah give extensive descriptions of Shaytan's methods so they can be recognized: he whispers (waswasa); he makes evil deeds look good (tazyeen); he promises and then abandons (14:22 — 'I had no authority over you except that I called you and you responded'); he approaches gradually (step by step); he works through desires and anger. Knowing these methods does not neutralize them automatically — but it enables the person to name what is happening and turn to Allah before it progresses." },
      ],
      stations: [
        { name: "The promise Shaytan cannot keep", description: "One of the most dramatic verses in the Quran is Shaytan's speech on the Day of Judgment (14:22): 'Indeed, Allah promised you the promise of truth, and I promised you but I betrayed you. I had no authority over you except that I invited you and you responded to me.' Shaytan acknowledges, on the Day when it is too late, that he only invited — he never forced. He tells those who followed him: 'So do not blame me, but blame yourselves.' This is the Quran's final word on Shaytan's power: invitation only, no compulsion." },
        { name: "Shaytan forgets when dhikr begins", description: "The tradition consistently describes dhikr (remembrance of Allah) as the most effective ongoing protection against Shaytan. The hadith says Shaytan is like a wolf — he takes the sheep that has separated from the flock. Staying with the community of believers, maintaining salah, and keeping one's tongue and heart occupied with dhikr — these are not spiritual luxuries but security measures. The Quran says Shaytan is waiting on the path: the path is traversed faster when one is not distracted." },
        { name: "The ally of Shaytan", description: "The Quran introduces the concept of wali al-shaytan — those who take Shaytan as an ally rather than an enemy. This happens through gradual steps: entertaining his whispers, following desires, rationalizing forbidden things, and eventually the person finds themselves defending what Shaytan suggested. The Quran says (2:268): 'Shaytan promises you poverty and commands you to immorality, while Allah promises you forgiveness from Himself and abundance.' The contrast is the believer's compass." },
      ],
      questions: [
        { question: "Is Shaytan a fallen angel?", answer: "No — and the Quran is explicit. Iblis was from the jinn, not from the angels (18:50: 'He was of the jinn and he departed from the command of his Lord'). The 'fallen angel' narrative is a Christian and Jewish theological development; the Quran corrects this. The angels do not have the capacity for disobedience — they are created without independent will in that direction. Iblis had will (he was jinn, created from fire) and chose to use it wrongly. This distinction matters: it protects the integrity of the angels as beings of pure obedience." },
        { question: "Does Shaytan have real power over people?", answer: "The Quran is clear about the limits: 'He has no authority over those who believe and rely upon their Lord. His authority is only over those who take him as an ally and those who through him associate others with Allah' (16:99-100). Shaytan cannot compel anyone. His tool is suggestion; the human's response to the suggestion is their own responsibility. This is theologically important: it preserves human accountability. On the Day of Judgment, Shaytan will explicitly disclaim any authority to explain why people followed him." },
        { question: "Are all bad thoughts from Shaytan?", answer: "The scholars distinguish several sources of thoughts: the nafs (the self — which produces desires and suggestions from one's own psychology), Shaytan (external whispers), and the malak (the angel — which produces impulses toward good). Al-Ghazali described the heart as a field in which these two forces — Shaytan and the angel — contend. A bad thought is not necessarily from Shaytan — it may arise from the nafs. But a bad thought that one does not choose and immediately dislikes, followed by a strong pull toward it — this the scholars associated with Shaytan's waswasa specifically." },
      ],
    },

    semanticField: [
      { slug: 'malaika', arabic: 'مَلَائِكَة', transliteration: 'Malaika', relationship: 'parallels', relationshipLabel: "Opposite of — angels obey; Shaytan refuses", description: "The contrast between Shaytan and the angels is structurally central to the Quran's presentation of the moral universe. The angels were commanded to prostrate to Adam and immediately did. Iblis (who was among them in station) refused. This simultaneous obedience and refusal at the same command is the Quran's most concentrated statement about the difference between submission and arrogance — and about the nature of free will." },
      { slug: 'ikhlas',  arabic: 'إِخْلَاص',  transliteration: 'Ikhlas',  relationship: 'deepens',  relationshipLabel: "Protection against — sincerity is Shaytan's only acknowledged barrier", description: "Shaytan's own admission in 38:83 — that he cannot touch the mukhlasin — makes ikhlas the deepest available protection. The scholars say: it is not charms, not formulas, not distance from the world that neutralizes Shaytan, but the condition of the heart being genuinely oriented toward Allah alone. Riya' (showing off) and self-deception are the specific cracks through which Shaytan enters." },
      { slug: 'nafs',   arabic: 'نَفْس',     transliteration: 'Nafs',    relationship: 'deepens',  relationshipLabel: "Ally of — Shaytan works through the commanding nafs", description: "Shaytan and the nafs ammara (the commanding self) are described in the tradition as working together — the external suggestion meets the internal desire, and together they produce the pull toward the forbidden. This is why the spiritual path must address both: external protection (isti'adha, dhikr) and internal discipline (muhasaba, taming the nafs). Shaytan cannot do much with a nafs that has been disciplined; he is very effective with a nafs that has been indulged." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Shaytan has two main weapons: desires and doubts. Desires corrupt the heart from within; doubts attack the heart's certainty. The cure for desires is patience and the remembrance of the consequences. The cure for doubts is knowledge and the remembrance of Allah. The heart that is empty of knowledge and patience is the most vulnerable to Shaytan's approach.", source: "Ighathat al-Lahfan" },
      { scholar: 'Ibn Taymiyyah', text: "Shaytan has no power to compel — he only whispers. This means that every sin a person commits is ultimately their own choice. They cannot blame Shaytan for their sins on the Day of Judgment, because Shaytan will himself disclaim them — as the Quran records. Recognizing this is not meant to despair the sinner but to return responsibility to the self, where it belongs, so that the sinner can make tawbah.", source: "Majmu' al-Fatawa" },
    ],

    hadith: [
      { ref: "Bukhari & Muslim", arabic: "إِنَّ الشَّيْطَانَ يَجْرِى مِنَ ابْنِ آدَمَ مَجْرَى الدَّمِ", translation: "Shaytan flows through the son of Adam like blood flows through the veins.", note: "The most vivid hadith of Shaytan's proximity — he is not external and distant but moves through the human like blood. This is why the practices that interrupt his flow (dhikr, bismillah, salah) are so frequent and so brief — they are designed to interrupt the constant circulation, not to address a distant threat." },
    ],

    acrossTransitions: `The figure of the adversary appears in every major religious tradition, but the Quran's treatment is distinctive in several crucial ways.

In the Hebrew Bible, 'ha-Satan' ('the adversary') appears primarily as a member of the divine council whose role is to test and accuse — most prominently in the book of Job, where he appears before God and challenges Job's faith. In the earlier Hebrew tradition, ha-Satan is an agent of God, not an independent rebel. It is only in the later Second Temple literature (and in the New Testament) that Satan becomes the rebel leader of a cosmic opposition.

In Christianity, the fallen angel narrative developed significantly: Satan (Lucifer) rebelled before the creation of humanity, was cast from heaven, and is the source of evil in the world. The Christian tradition emphasized his power (the 'prince of this world') and his organized opposition through a hierarchy of demons. The Quran redirects some of this: Iblis was from the jinn (not the angels), his refusal happened at the creation of Adam (not before), and the Quran insists consistently that he has no real power over those who believe — only invitation.

In Zoroastrianism, the closest parallel is Angra Mainyu (Ahriman) — the principle of evil and darkness in cosmic opposition to Ahura Mazda (the principle of good and light). This is a genuinely dualistic cosmology, where evil is co-eternal and co-powerful with good. The Quran's Shaytan is emphatically not this: he is a creature, he operates within Allah's permission, and his end is Jahannam — he does not escape the sovereignty of the one God he refused.

The Quranic treatment uniquely emphasizes Shaytan's self-awareness of his own limitations — his admission in 14:22, his acknowledgment of the mukhlasin in 38:83 — turning the adversary into a witness for the prosecution of those who followed him. This is a literary and theological masterstroke: Shaytan's own speech on the Day of Judgment will be used to establish the truth that following him was a choice, not a compulsion.`,

    relatedTerms: [
      { slug: 'malaika',  transliteration: 'Malaika',  term: 'مَلَائِكَة' },
      { slug: 'nafs',     transliteration: 'Nafs',     term: 'نَفْس'      },
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص'   },
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب'   },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'    },
    ],

    goDeeper: [
      { slug: 'al-araf', surahName: 'Al-Araf', note: "Contains one of the fullest accounts of Iblis's refusal and his declaration of enmity (7:11-18). The surah's structural placement of this narrative at its opening is significant: it establishes the context of cosmic enmity that runs through the history of prophets that follows — Shaytan's opposition is the background against which every prophet's struggle is played out." },
      { slug: 'an-nas', surahName: 'An-Nas', note: "The Quran's final word — seeking refuge from the whispering retreater. The scholars call Al-Falaq and Al-Nas together the 'two protections' (mu'awwidhatain) and the Prophet ﷺ recited them together in the morning and evening as ongoing protection. Al-Nas is addressed to the most intimate threat: the whisper inside the breast." },
    ],
  },

  nafs: {
    slug: 'nafs',
    term: 'نَفْس',
    transliteration: 'Nafs',
    pronunciation: 'NAFS',
    category: 'Concepts of Existence',
    evocativeLine: "The self the Quran calls you to master — commanding, blaming, and at peace.",
    hasFullEntry: true,

    summary: `Nafs is the self — but a self that the Quran maps with surgical precision. Rather than treating the human interior as unified, the Quran describes the nafs in three conditions or stations that reveal its inner architecture. The nafs ammara bi-al-su' (the nafs commanding to evil) is the base self — the self driven by appetite, impulse, and desire, which pushes toward what it wants regardless of consequence. The nafs lawwama (the self-reproaching soul) is the self that feels remorse — that has enough consciousness to see the gap between what it does and what it knows is right. And the nafs mutma'inna (the soul at peace) is the self that has arrived — settled, content, no longer at war with itself or with Allah.

The Quran does not treat the nafs as something to be destroyed or denied; it treats it as something to be tamed and elevated. Zakat al-nafs — purification of the self — is given in Surah Ash-Shams (91:7-10) as the decisive factor in human destiny: "By the nafs and He who proportioned it — and inspired it with its wickedness and its taqwa — he has succeeded who purifies it, and he has failed who buries it." Success (falah) is defined in terms of what happens to the nafs. This makes the work of the nafs the central project of human life.

The scholars of the heart spent most of their attention on the nafs — on diagnosing its diseases (kibr, hasad, riya', ghurur) and prescribing their cures. Al-Ghazali's Ihya Ulum al-Din is largely a medical text for the nafs. Ibn al-Qayyim's writings return constantly to the nafs as the site of all spiritual warfare. The nafs is not the enemy; it is the patient. And the physician is the one who has recognized that they themselves are the patient and the treatment simultaneously.`,

    root: {
      letters: 'ن–ف–س',
      transliteration: 'n–f–s',
      meaning: 'To breathe; a breath; the self; a person',
      elaboration: "The root n–f–s carries the meaning of breath — nafas is a breath, and nafs is the self animated by breath. This etymology is significant: the nafs is what lives through breathing, which in the Quran connects directly to the divine breath (nafakha — blew) into Adam (15:29). The nafs is literally breathed into being. The root also appears in tanaffus (to breathe freely, to be relieved) — hinting at the state of the nafs mutma'inna: the self that finally breathes freely.",
    },

    occurrenceCount: 295,
    occurrenceNote: "Nafs is one of the most frequently occurring nouns in the Quran — appearing approximately 295 times. It is used in three overlapping senses: the self (nafs in the sense of 'oneself'), the soul (the inner being of a person), and occasionally as a pronoun-substitute ('nafs' meaning 'himself/herself'). Its frequency reflects the Quran's sustained engagement with the inner life of the human being.",

    keyAyahs: [
      {
        ref: '91:7-10',
        arabic: 'وَنَفْسٍ وَمَا سَوَّىٰهَا ۝ فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَىٰهَا ۝ قَدْ أَفْلَحَ مَن زَكَّىٰهَا ۝ وَقَدْ خَابَ مَن دَسَّىٰهَا',
        translation: 'By the nafs and He who proportioned it — and inspired it with its wickedness and its taqwa — he has succeeded who purifies it, and he has failed who buries it.',
        note: "The most important Quranic statement on the nafs. Both wickedness and taqwa were 'inspired' into the nafs — meaning the capacity for both is built in. Success (falah) is the purification (tazkiya) of the nafs; failure is its burial (dass — to bury, to suppress under layers of indulgence). The imagery is agricultural: the nafs is a field, not a wall.",
      },
      {
        ref: '12:53',
        arabic: 'إِنَّ ٱلنَّفْسَ لَأَمَّارَةٌۢ بِٱلسُّوٓءِ إِلَّا مَا رَحِمَ رَبِّى',
        translation: 'Indeed, the nafs is commanding to evil — except what my Lord has mercy upon.',
        note: "The words of Yusuf ﷺ — acknowledging the commanding nature of the self even after emerging from his greatest test with his integrity intact. The exception clause ('except what my Lord has mercy upon') is the scholars' key: the nafs ammara is not the inevitable fate of the person — mercy can transform it. The one who was the most tested acknowledged it most honestly.",
      },
      {
        ref: '89:27-30',
        arabic: 'يَٰٓأَيَّتُهَا ٱلنَّفْسُ ٱلْمُطْمَئِنَّةُ ۝ ٱرْجِعِىٓ إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً ۝ فَٱدْخُلِى فِى عِبَٰدِى ۝ وَٱدْخُلِى جَنَّتِى',
        translation: "O nafs mutma'inna — return to your Lord, well-pleased and pleasing. Enter among My servants, and enter My paradise.",
        note: "The only place in the Quran where Allah addresses the nafs directly — and it is an invitation, not a command. The nafs mutma'inna is not one that has arrived at peace because nothing is wrong; it is the nafs that has found its rest in Allah regardless of circumstances. The invitation to 'return' suggests that arriving at peace is arriving at one's origin.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Muhasaba — self-accounting', arabic: 'المحاسبة', arabicTranslit: "al-muḥāsaba", description: "The primary practice for nafs work is muhasaba — holding the self to account. 'Umar ibn al-Khattab said: 'Hold yourselves to account before you are held to account, and weigh yourselves before you are weighed.' Muhasaba is the regular, honest examination of one's deeds, intentions, and states — not to condemn but to course-correct. The nafs that is never examined drifts; the nafs that is regularly examined has a direction." },
        { number: 2, title: 'Mujahada — struggle with the nafs', arabic: 'المجاهدة', arabicTranslit: "al-mujāhada", description: "The Quran (29:69) promises: 'Those who strive in Our cause — We will guide them to Our paths.' The mujahada of the nafs is the internal jihad: the refusal to follow the nafs ammara's commands, the insistence on doing what is right when the nafs resists, the maintenance of worship when the nafs is tired. This is harder than external struggle because the opponent is also the self. The scholars say: the nafs does not become easier with indulgence — it becomes harder. It becomes easier with consistent discipline." },
        { number: 3, title: 'Tazkiya — purification', arabic: 'التزكية', arabicTranslit: "al-tazkiya", description: "Tazkiya al-nafs is the overall goal: the gradual purification of the nafs from its diseases. The Quran mentions tazkiya as one of the Prophet's ﷺ four functions: reciting the verses, teaching the book, teaching wisdom, and 'purifying them' (tazkihi). The scholars say: tazkiya happens through three channels — knowledge (knowing what the diseases are), practice (doing what purifies), and company (keeping with those who are further along)." },
      ],
      stations: [
        { name: "The three stations of the nafs", description: "The Quran's three descriptions of the nafs are not three different souls — they are three stations the same nafs can occupy. Most people oscillate between the nafs ammara and the nafs lawwama — sometimes pulled by appetite, sometimes stung by conscience. The nafs mutma'inna is not a different kind of person but a person whose nafs has been sufficiently purified that the restlessness has quieted. The scholars say: you cannot skip stages. The nafs lawwama — the conscience, the self-reproach — is the essential middle stage, and its presence (the ability to feel remorse) is a mercy, not a burden." },
        { name: "The nafs as the site of all worship", description: "All external acts of worship are ultimately about what they do to the nafs. Salah is prescribed because regular remembrance prevents the nafs from hardening (20:14, 29:45). Fasting is prescribed because the nafs ammara is strongest when the body is fully indulged — hunger reveals the nafs's priorities. Zakat is prescribed because stinginess (bukhl) is a disease of the nafs. Every ibada is simultaneously a treatment for a specific nafs condition — which is why the Quran consistently gives rationales for worship in terms of its effect on the inner self." },
        { name: "The enemy within", description: "The tradition presents the nafs ammara as the closest and most dangerous enemy because it cannot be avoided. Shaytan can be warded off with isti'adha; bad company can be left. But the nafs goes wherever you go. This is why the Prophet ﷺ said: 'The mujahid is the one who struggles with his nafs.' Ibn al-Qayyim wrote: the person who defeats Shaytan on the outside but surrenders to the nafs on the inside has not won anything." },
      ],
      questions: [
        { question: "Is the nafs the same as the ruh?", answer: "They are related but distinct. The nafs is the self — the whole person as a psychological and moral agent. The ruh is the spirit — the divine breath that animates the nafs. Some scholars treat them as synonyms in certain Quranic contexts; others maintain the distinction. The ruh is what is taken at death; the nafs is what is held accountable. The ruh is pure (it is from Allah's command); the nafs has been given both the capacity for wickedness and for taqwa (91:7-8)." },
        { question: "Can the nafs actually be fully purified in this life?", answer: "The scholars are careful here. The nafs mutma'inna is a real station — the companions attained it, the prophets embodied it — but it is not a fixed achievement; it is a ongoing orientation. Even those who have reached a high degree of nafs purification remain vulnerable to sudden surges of the nafs ammara. The treatment is lifelong. The goal is not to arrive at a place where the nafs no longer requires attention but to reach a place where the attention has become natural and the nafs no longer fights it." },
        { question: "Is it sinful to feel the pull of the nafs ammara?", answer: "No — the Quran describes the nafs ammara as a universal condition ('indeed the nafs is commanding to evil — except what my Lord has mercy upon'). Feeling the pull is not the sin; following it is. The scholar al-Hasan al-Basri said: 'The believer wakes up in grief and goes to sleep in grief — and is not distressed by this, for between these two griefs is his life.' The presence of struggle is not a sign of failure; it is a sign that the nafs lawwama is alive." },
      ],
    },

    semanticField: [
      { slug: 'ruh',      arabic: 'رُوح',    transliteration: 'Ruh',    relationship: 'deepens',  relationshipLabel: "Animated by — the ruh is what gives the nafs life", description: "The nafs and ruh are the two dimensions of the human interior in the Quran. The ruh is the divine breath that animates; the nafs is the self that is animated. When the ruh departs (at death), the nafs as an earthly agent ceases — but the person continues in the barzakh. The scholars describe the ruh as the horse and the nafs as the rider — or sometimes the reverse, depending on which stage of purification the nafs has reached." },
      { slug: 'taqwa',   arabic: 'تَقْوَى', transliteration: 'Taqwa',  relationship: 'deepens',  relationshipLabel: "The nafs's highest achievement", description: "The Quran says the nafs was inspired with both its wickedness (fujur) and its taqwa (91:8). This means taqwa is not imposed from outside — it is a potential within the nafs that has to be cultivated. The nafs that has developed taqwa is the nafs that is moving toward mutma'inna — the shield (wiqaya) has been built from the inside." },
      { slug: 'fitrah',  arabic: 'فِطْرَة', transliteration: 'Fitrah', relationship: 'deepens',  relationshipLabel: "Origin of — the nafs at its cleanest returns to fitrah", description: "The fitrah is the original state of the nafs before it was shaped by environment, sin, and habit. The nafs mutma'inna is sometimes described by the scholars as the nafs returned to fitrah — the self that has been restored to its original God-orientation after the purification process. Tazkiya is the process; fitrah is the destination." },
    ],

    scholarsSaid: [
      { scholar: 'Al-Ghazali', text: "Know that the key to knowing Allah is knowing the self. Whoever knows themselves knows their Lord. The nafs has two faces: one turned toward the body and the world, which is the nafs ammara; and one turned toward Allah and the unseen, which is the ruh. When the face turned toward Allah is dominant, the nafs becomes mutma'inna.", source: "Ihya Ulum al-Din" },
      { scholar: "Ibn al-Qayyim", text: "The nafs has three stages: the nafs ammara, which follows its desires without hesitation; the nafs lawwama, which reproaches itself when it falls but still falls; and the nafs mutma'inna, which is at rest with Allah's command and prohibition, content with His decree, oriented entirely toward Him. Most souls move between the first two; the third is the prize of the path.", source: "Madarij al-Salikin" },
    ],

    hadith: [
      { ref: "Tirmidhi", arabic: "أَعْدَى عَدُوِّكَ نَفْسُكَ الَّتِى بَيْنَ جَنْبَيْكَ", translation: "Your most dangerous enemy is your nafs — the one between your two sides.", note: "The Prophet ﷺ redirects the concept of enemy inward. External enemies are visible and can be confronted. The nafs is the enemy that wears your face — which is both the most dangerous characteristic and, if recognized, the most tractable, because its transformation is within reach." },
    ],

    acrossTransitions: `The concept of the self as both problem and potential is universal in religious and philosophical traditions, but the Quran's tripartite nafs model is distinctive.

In Platonic philosophy, the soul (psyche) is divided into reason (logistikon), spirit (thymoeides), and appetite (epithymetikon). The appetitive part corresponds closely to the nafs ammara; the spirited part to the nafs lawwama (the conscience that feels shame); and the reasoning part, when governed by wisdom, to a state approaching the nafs mutma'inna. Plato's Republic is largely about which part of the psyche should govern — and the answer is reason, disciplined by wisdom. The Quran's answer is different: not reason but submission to Allah, which then produces the inner peace of the nafs mutma'inna.

In Buddhist psychology, the analysis of the self is radical: there is no permanent self (anatta — non-self). What we call the self is a flow of physical and mental processes (the five aggregates). The Buddhist project is not to purify the nafs but to see through it — to recognize its impermanence and release attachment to it. This is structurally different from the Quran, which affirms a real, accountable, ultimately resurrected self — the nafs is not an illusion but a trust.

In Freudian psychoanalysis, the id (instinctual drives) corresponds roughly to the nafs ammara; the superego (internalized social/moral standards) to the nafs lawwama; and the healthy ego that has integrated both to something approaching the nafs mutma'inna. The difference is that Freud's framework is secular — the integrated ego is balanced within the world; the nafs mutma'inna is balanced within Allah.

What the Quran adds that no other framework provides is the divine address to the nafs mutma'inna: "O tranquil soul — return to your Lord, well-pleased and pleasing." No psychological framework ends with the self being invited home by the One who created it. This is the Quran's unique contribution: the nafs is not only a problem to be solved but a self to be saved, invited back to its origin.`,

    relatedTerms: [
      { slug: 'ruh',     transliteration: 'Ruh',     term: 'رُوح'    },
      { slug: 'fitrah',  transliteration: 'Fitrah',  term: 'فِطْرَة' },
      { slug: 'taqwa',   transliteration: 'Taqwa',   term: 'تَقْوَى' },
      { slug: 'shaytan', transliteration: 'Shaytan', term: 'شَيْطَان' },
      { slug: 'tawbah',  transliteration: 'Tawbah',  term: 'تَوْبَة' },
    ],

    goDeeper: [
      { slug: 'ash-shams', surahName: 'Ash-Shams', note: "The surah that most concentratedly addresses the nafs — its potential, its inspiration with both wickedness and taqwa, and the stakes of purification vs. burial. The surah's extraordinary sequence of oaths (by the sun, the moon, the day, the night, the sky, the earth) culminates in the nafs as the apex of creation — the being whose fate decides the meaning of all the oaths that precede." },
      { slug: 'yusuf', surahName: 'Yusuf', note: "The story of Yusuf ﷺ is the Quran's most sustained narrative about the nafs — including the nafs of Yusuf (tested in desire and refused), the nafs of Zulaykha (overwhelmed by desire and admitted it), and the nafs of his brothers (overtaken by jealousy). Verse 12:53 — the nafs is commanding to evil — is spoken by Yusuf at the peak of his trial, making the story the Quran's richest case study in nafs psychology." },
    ],
  },

  ruh: {
    slug: 'ruh',
    term: 'رُوح',
    transliteration: 'Ruh',
    pronunciation: 'ROOH',
    category: 'Concepts of Existence',
    evocativeLine: "The spirit breathed into Adam — known to Allah alone in its full nature.",
    hasFullEntry: true,

    summary: `Ruh is the spirit — the divine breath that animates the human being and gives it life. Its origin in the Quran is precise and breathtaking: when Allah formed Adam from clay, He "breathed into him from His spirit" (nafakha fih min ruhih — 15:29, 32:9). That "from His spirit" is not meant to imply that the ruh is part of Allah (the scholars are emphatic: Allah is not composed of parts, and the ruh is a created thing). It is a statement of origin — the ruh comes from a divine command, not from anything in the material world, and its nature partakes of something beyond the merely physical.

The Quran's most famous statement about the ruh is also one of its most pointed moments of divine reticence. When asked about the ruh, Allah said: "The ruh is from the command of my Lord, and of knowledge you have been given only a little" (17:85). The scholars have debated why the Quran gives this answer — some say it is to emphasize the limits of human knowledge even about ourselves; others say it is to protect the mystery of the divine breath from being reduced to a philosophical category. What the verse establishes is a ceiling: no matter how much humans discover about biology and neuroscience, they will not capture the ruh in their explanations.

The ruh is what departs at death — it is taken by the angel of death and carries the identity and state of the dying person into the barzakh. At the resurrection, it returns to the body for the standing before Allah. The Quran describes the ruh of Maryam's son as "a spirit from Allah" (ruhun minhu — 4:171) — which the scholars read as an intensified expression of the same divine origin that every human shares, while affirming the unique miracle of Isa's creation without a father. The ruh is both universally human and irreducibly mysterious.`,

    root: {
      letters: 'ر–و–ح',
      transliteration: 'r–w–ḥ',
      meaning: 'Spirit, breath, wind; ease, relief',
      elaboration: "The root r–w–ḥ is shared by ruh (spirit/soul), rih (wind), rawh (ease/refreshment), and ruh (in the sense of relief from hardship). All of these share the core image of air in motion — something invisible that moves through and gives life. The scholars note that the etymological connection between spirit (ruh), wind (rih), and ease (rawh) is not accidental: the spirit is the invisible animating presence, and its proper state is ease — the ruh at rest in Allah is rawh.",
    },

    occurrenceCount: 21,
    occurrenceNote: "Ruh appears approximately 21 times in the Quran in the specific sense of spirit/soul. It is also used for Jibril (Ruh al-Qudus) and for divine command in general. The relative infrequency, compared to nafs, reflects the Quran's reticence about the ruh — it speaks of it rarely, and when it does, it defers to divine knowledge.",

    keyAyahs: [
      {
        ref: '17:85',
        arabic: 'وَيَسْـَٔلُونَكَ عَنِ ٱلرُّوحِ ۖ قُلِ ٱلرُّوحُ مِنْ أَمْرِ رَبِّى وَمَآ أُوتِيتُم مِّنَ ٱلْعِلْمِ إِلَّا قَلِيلًا',
        translation: 'They ask you about the ruh. Say: The ruh is from the command of my Lord, and of knowledge you have been given only a little.',
        note: "The Quran's direct and final statement on the ruh. The questioners wanted a philosophical answer; they received a statement of limits. The scholars say this verse is among the most important in the Quran for its epistemology: there are questions the Quran does not answer, and knowing that these questions exist is itself part of faith.",
      },
      {
        ref: '15:29',
        arabic: 'فَإِذَا سَوَّيْتُهُۥ وَنَفَخْتُ فِيهِ مِن رُّوحِى فَقَعُوا۟ لَهُۥ سَٰجِدِينَ',
        translation: 'So when I have proportioned him and breathed into him from My spirit, fall down to him in prostration.',
        note: "The moment of Adam's creation — the divine breath makes clay into a human being worthy of the angels' prostration. The scholars say: the breath that dignified humanity is the reason humanity carries a dignity that angels were commanded to honor. The ruh is the source of the human's unique station in creation.",
      },
      {
        ref: '32:9',
        arabic: 'ثُمَّ سَوَّىٰهُ وَنَفَخَ فِيهِ مِن رُّوحِهِۦ ۖ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ',
        translation: 'Then He proportioned him and breathed into him from His spirit, and made for you hearing and sight and hearts.',
        note: "The divine breath is paired with the specific faculties that make spiritual awareness possible: hearing (to receive revelation), sight (to see the signs), and the fu'ad (the heart — the locus of understanding). The ruh is not just the life-force; it is what makes conscious, spiritually aware life possible.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'The ruh needs its own nourishment', arabic: 'الروح تحتاج غذاءها', arabicTranslit: "al-rūḥ taḥtāj ghidhāʾahā", description: "Just as the body requires food and water, the ruh requires its own nourishment: dhikr (remembrance of Allah), recitation of the Quran, salah, and connection to the spiritual community. Ibn al-Qayyim said: 'The ruh has needs just as the body does. When the body is malnourished it weakens; when the ruh is malnourished it sickens.' The person who feeds the body and starves the ruh will find one dimension of themselves flourishing and another hollowing out." },
        { number: 2, title: 'The ruh belongs to Allah', arabic: 'الروح أمانة من الله', arabicTranslit: "al-rūḥ amāna min Allāh", description: "Since the ruh is 'from the command of my Lord,' it is in a sense a trust (amana) given to the human body. This has practical implications: suicide is prohibited in Islam in part because taking the life (and thus the ruh) that belongs to Allah is a violation of the amanah. The body is the container; the ruh is the essence; and the ownership is Allah's. Living in accordance with this understanding transforms how one cares for body and soul." },
        { number: 3, title: 'Death is the return of the ruh', arabic: 'الموت رجوع الروح', arabicTranslit: "al-mawt rujūʿ al-rūḥ", description: "The Quran describes sleep as a 'lesser death' (al-wafat al-sughra): Allah takes the ruh during sleep and returns it at waking, and takes it fully at death (39:42). Understanding death as the ruh returning to its source — rather than as annihilation — transforms how the Muslim approaches their own death. The du'a upon waking ('Praise be to Allah who gave us life after death — to Him is the resurrection') expresses this: even waking from sleep is a minor resurrection." },
      ],
      stations: [
        { name: "The mystery as a spiritual discipline", description: "The fact that the Quran refuses to fully explain the ruh is itself spiritually significant. The scholars say: living comfortably with the unanswered question is one of the hallmarks of mature faith. The person who demands a complete explanation for the ruh before they can believe is demanding from creation what only the Creator possesses. The Quran's 'of knowledge you have been given only a little' is not a put-down — it is an invitation into humility before mystery." },
        { name: "The ruh in the barzakh", description: "The tradition describes the ruh's condition in the barzakh as reflecting the condition of the person at death. The ruh of the believer is treated with honor — it is moved toward jannah, given a taste of its future state, and rests. The ruh of the wrongdoer is in a state of constriction. The body in the grave is the ruh's former container — which is why the scholars say the grave can be either a garden of paradise or a pit of the fire, depending on the ruh it once housed." },
        { name: "The divine dignity of the ruh", description: "Because every human being carries a ruh breathed from Allah's command, the scholars derived from this the fundamental dignity of every human being. The Quran says the ruh is what made the angels prostrate to Adam — not his clay body but the divine breath in him. This is the theological basis for human dignity: not rationality (Kant), not capacity for suffering (Bentham), not social contract (Rousseau), but the divine breath that is in every human being." },
      ],
      questions: [
        { question: "Is the ruh immortal?", answer: "The scholars say: the ruh is immortal in the sense that it does not cease to exist after death — it continues in the barzakh and through the resurrection. But 'immortal' in the sense of being without beginning is not applicable — the ruh was created, like everything else. What persists is the ruh's existence and identity — the person does not become nothing at death. The Quran is clear that the dead experience their states in the barzakh and will be fully resurrected." },
        { question: "When is the ruh breathed into the fetus?", answer: "The hadith of Ibn Masud (Bukhari & Muslim) specifies: the ruh is breathed into the developing human forty days after conception (some hadith say 120 days — the scholars have harmonized these in various ways). Before the ruh, the fetus is living in a biological sense but not yet a full human being in the Quranic sense. This has significant implications for Islamic bioethics regarding the moral status of the fetus at different stages." },
        { question: "Does the ruh feel anything while the body sleeps?", answer: "The Quran says Allah takes the ruh during sleep and returns it at waking (39:42). The scholars interpret this as the ruh entering a state of partial separation — dreams occur during this state, and the ruh can perceive realities that the fully embodied waking state cannot. The most vivid dreams of the believers are sometimes said to be the ruh's perception of the unseen during this semi-separation. At death, the separation becomes complete." },
      ],
    },

    semanticField: [
      { slug: 'nafs',    arabic: 'نَفْس',    transliteration: 'Nafs',    relationship: 'deepens',  relationshipLabel: "Animated by — the nafs lives through the ruh", description: "The nafs and ruh are complementary dimensions of the inner person. The ruh is the divine animating breath; the nafs is the self that is animated. Some scholars use them interchangeably in certain contexts; others maintain the distinction. The key difference: the ruh is pure (from Allah's command); the nafs has been given both good and evil potentials. The ruh never becomes impure; the nafs can." },
      { slug: 'fitrah',  arabic: 'فِطْرَة', transliteration: 'Fitrah',  relationship: 'deepens',  relationshipLabel: "Related to — fitrah is the ruh's original orientation", description: "The fitrah (primordial nature) and the ruh are connected: the ruh's original orientation, as breathed by Allah, is toward its source. The fitrah is the specific quality of that orientation — the innate inclination toward tawhid and toward the good. The corruption of the nafs does not corrupt the ruh but it can bury the fitrah under layers of habit and sin." },
      { slug: 'malaika', arabic: 'مَلَائِكَة', transliteration: 'Malaika', relationship: 'deepens', relationshipLabel: "Connected to — Jibril is called Ruh al-Qudus", description: "The angel Jibril is given the title Ruh al-Qudus (the Holy Spirit) — a name that connects the ruh of revelation with the ruh of human animation. The scholars explain: Jibril brings the divine word that revives the spiritually dead just as the divine breath revives the physically dead body of clay. Revelation is itself a kind of ruh — what animates the dead community back to life." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "The ruh is the most noble of Allah's creations in this world — it is the locus of faith, knowledge, love, and all the spiritual stations. The body without it is clay; with it, it is the khalifah of Allah on earth. The ruh needs its sustenance just as the body does — the sustenance of the body is food and drink; the sustenance of the ruh is knowledge, faith, and the love of Allah.", source: "Kitab al-Ruh" },
      { scholar: 'Al-Qurtubi', text: "The scholars differed extensively on the nature of the ruh — and this very difference is evidence that the Quran did not intend for us to know. For if the ruh were completely knowable, the verse '...of knowledge you have been given only a little' would be without purpose. The verse is itself the answer: do not seek to fully understand what Allah has withheld.", source: "Al-Jami' li-Ahkam al-Quran" },
    ],

    hadith: [
      { ref: "Bukhari & Muslim (Ibn Masud)", arabic: "إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا نُطْفَةً ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ ثُمَّ يَكُونُ مُضْغَةً مِثْلَ ذَلِكَ ثُمَّ يُرْسَلُ إِلَيْهِ الْمَلَكُ فَيَنْفُخُ فِيهِ الرُّوحَ", translation: "Each of you is gathered in your mother's womb for forty days as a drop of fluid, then as a clot for the same, then as a lump of flesh for the same — then an angel is sent to breathe the ruh into it.", note: "The hadith that most specifically describes the timing of the ruh's entry into the developing human — the basis for much of Islamic bioethical reasoning about the stages of human development and the moral weight of the fetus." },
    ],

    acrossTransitions: `The spirit breathed into humanity appears across traditions as the locus of what is most distinctively human and most connected to the divine.

In the Hebrew Bible, nishmat hayyim (the breath of life) was breathed into Adam: "God breathed into his nostrils the breath of life and man became a living being" (Genesis 2:7). The Hebrew nefesh (cognate to the Arabic nafs) and neshamah (breath/soul) correspond broadly to the Quranic nafs and ruh. The rabbinical tradition developed an extensive soul-vocabulary: nefesh (the animating life), ruah (spirit — same root as ruh), neshamah (the higher breath), hayyah and yechidah (even higher levels of the soul). This elaboration reflects the same conviction that the inner life of humanity is multi-dimensional and connected to the divine.

In Christian theology, the pneuma (spirit) in Pauline theology is the dimension of the human that can commune with the Holy Spirit — "Do you not know that your body is a temple of the Holy Spirit?" (1 Corinthians 6:19). The classical Christian tripartite anthropology — body (soma), soul (psyche), spirit (pneuma) — maps roughly onto the Islamic body-nafs-ruh structure, though with different theological implications. The Christian emphasis is on the spirit being renewed through grace; the Islamic emphasis is on the ruh being originally pure and the nafs requiring purification to align with it.

What the Quran uniquely does is refuse explanation while insisting on reality. The ruh is real — it is the source of human dignity, the site of the divine breath, the thing that travels to the barzakh. But its nature is not available to us. This is not mystification; it is precision. The Quran does not claim ignorance about the ruh; it claims that the knowledge of it belongs to Allah and that the little we are given is sufficient for what we need to know: that we are more than bodies, that our spirit is from a divine source, and that at death it returns toward that source.`,

    relatedTerms: [
      { slug: 'nafs',    transliteration: 'Nafs',    term: 'نَفْس'    },
      { slug: 'fitrah',  transliteration: 'Fitrah',  term: 'فِطْرَة'  },
      { slug: 'barzakh', transliteration: 'Barzakh', term: 'بَرْزَخ'  },
      { slug: 'malaika', transliteration: 'Malaika', term: 'مَلَائِكَة' },
      { slug: 'mawt',    transliteration: 'Mawt',    term: 'مَوْت'    },
    ],

    goDeeper: [
      { slug: 'al-isra', surahName: "Al-Isra'", note: "Contains the central verse on the ruh (17:85) — embedded in a surah about the night journey, which is itself the most vivid Quranic account of what the Prophet ﷺ experienced beyond ordinary human perception. The question about the ruh came from those who wanted to test the Prophet ﷺ; the answer established a limit that has defined Islamic epistemology ever since." },
      { slug: 'as-sajdah', surahName: 'As-Sajdah', note: "Contains the verse (32:9) pairing the divine breath with the specific human faculties of hearing, sight, and the heart — establishing that the ruh is not just the life-force but the source of the specifically spiritual-perceptive capacities that make the human being capable of worship, reflection, and accountability." },
    ],
  },

  qadar: {
    slug: 'qadar',
    term: 'قَدَر',
    transliteration: 'Qadar',
    pronunciation: 'qa-DAR',
    category: 'Concepts of Existence',
    evocativeLine: 'Divine measure — the decree that governs all things, and the belief that frees the heart.',
    hasFullEntry: true,

    summary: `Qadar is divine decree — the doctrine that Allah has measured and determined all things. It is the sixth pillar of Iman in the hadith of Jibril: belief in Allah, His angels, His books, His messengers, the Last Day, and qadar — both its good and its evil. The scholars identified four aspects (arkan) of belief in qadar: ilm (Allah's knowledge of all things from before time), kitaba (the writing of all things in the Preserved Tablet), mashi'a (Allah's will encompassing all that happens), and khalq (Allah's creation of all things, including human actions).

The theological complexity of qadar is acknowledged in the tradition itself — the Prophet ﷺ warned against arguing about it. The tension that most troubles people is the apparent conflict between qadar (divine determination of all things) and insan (human accountability). If Allah has decreed everything, how can humans be responsible for their choices? The mainstream Sunni position, articulated most carefully by al-Maturidi and al-Ashari, holds that human beings have a real (though created) capacity for choice (kasb — acquisition). The decree and the choice coexist — they operate at different levels of reality, and the human's experience of genuine choice is real, not illusory.

What the Quran emphasizes most is not the metaphysics of qadar but its effect on the heart. Surah Al-Hadid (57:22-23) says: "No disaster strikes upon the earth or among yourselves except that it was in a register before We brought it into being — indeed that, for Allah, is easy — in order that you not despair over what has escaped you nor exult over what He has given you." Qadar is not a theological abstraction; it is the antidote to two specific diseases of the heart: despair at loss and arrogance in achievement. The person who truly believes in qadar is stable — what they have was decreed, and what they lost was also decreed.`,

    root: {
      letters: 'ق–د–ر',
      transliteration: 'q–d–r',
      meaning: 'To measure, to determine, to have power over; to be capable',
      elaboration: "The root q–d–r is rich with meaning: qadr (measure, worth, night of power), qadar (decree, determination), qudra (power, ability), qadir (able, capable), muqtadir (fully capable). The connection between measurement and power is at the heart of the word: Allah decrees things because He is the one who has measured them — He knows their full weight and worth. The Laylat al-Qadr (Night of Decree/Power in Surah Al-Qadr) shares this root, connecting divine power with divine decree.",
    },

    occurrenceCount: 132,
    occurrenceNote: "The root q–d–r appears approximately 132 times in the Quran across its multiple forms. The name Al-Qadir (The Capable/Able) and Al-Muqtadir appear as divine attributes. The specific doctrinal sense of qadar (divine decree) is a major Quranic theme even where the exact word is not used.",

    keyAyahs: [
      {
        ref: '57:22-23',
        arabic: 'مَآ أَصَابَ مِن مُّصِيبَةٍ فِى ٱلْأَرْضِ وَلَا فِىٓ أَنفُسِكُمْ إِلَّا فِى كِتَٰبٍ مِّن قَبْلِ أَن نَّبْرَأَهَآ ۚ إِنَّ ذَٰلِكَ عَلَى ٱللَّهِ يَسِيرٌ ۝ لِّكَيْلَا تَأْسَوْا۟ عَلَىٰ مَا فَاتَكُمْ وَلَا تَفْرَحُوا۟ بِمَآ ءَاتَىٰكُمْ',
        translation: 'No disaster strikes upon the earth or among yourselves except that it was in a register before We brought it into being — that, for Allah, is easy — so that you not despair over what has escaped you, nor exult over what He has given you.',
        note: "The Quran gives the purpose of qadar explicitly: not metaphysical satisfaction but emotional stability. The decree is revealed so that loss does not destroy the heart and gain does not inflate it. This is qadar as therapy — the antidote to the two most destabilizing emotional states.",
      },
      {
        ref: '54:49',
        arabic: 'إِنَّا كُلَّ شَىْءٍ خَلَقْنَٰهُ بِقَدَرٍ',
        translation: 'Indeed, all things We have created with measure (qadar).',
        note: "The Quran's most comprehensive statement of divine qadar: everything — not most things, not important things — has been created with precise divine measurement. The word 'qadar' here carries both the sense of decree and of proportion: everything is exactly as much as it is meant to be.",
      },
      {
        ref: '65:3',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍ قَدْرًا',
        translation: 'Whoever relies upon Allah — He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set a measure (qadar) for all things.',
        note: "Qadar and tawakkul are paired here: trust in Allah is rational precisely because all things have been measured and determined by Allah. The one who trusts in Allah is trusting in the One who has already measured the outcome. Qadar is the theological foundation of tawakkul.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "Qadar does not excuse inaction", arabic: 'القدر لا يُسوّغ الكسل', arabicTranslit: "al-qadar lā yusawwigh al-kasal", description: "The most common misuse of belief in qadar is to justify passivity: 'Why try? Whatever will be, will be.' The Prophet ﷺ explicitly addressed this: 'Work, for everything is facilitated for what it was created for.' Qadar operates at the level of outcome; human effort operates at the level of means. Both are from Allah. Tying your camel and relying on Allah (tawakkul) is the model — not untying it and calling the loss qadar." },
        { number: 2, title: "Invoke qadar after the fact, not before", arabic: 'القدر يُستحضر بعد لا قبل', arabicTranslit: "al-qadar yustaḥḍar baʿd lā qabl", description: "The scholars say: before the event, use your reason and effort; after the event, apply qadar to your heart. If you are making a decision, do not say 'whatever is qadar will happen' as an excuse to not think carefully. But after the outcome — after the loss, the failure, the unexpected — say 'this was written' and let it settle the heart. Qadar is medicine for grief, not permission for laziness." },
        { number: 3, title: "The good and the evil are both decreed", arabic: 'القدر خيره وشره من الله', arabicTranslit: "al-qadar khayruhu wa-sharruhu min Allāh", description: "The hadith of Jibril specifies belief in qadar 'its good and its evil.' This complete faith — not only accepting the pleasant decrees but the painful ones — is what produces the stability the Quran promises in 57:22-23. Partial belief in qadar (accepting good outcomes as decreed, rejecting painful ones as mistakes) is not the iman the Quran describes." },
      ],
      stations: [
        { name: "Al-rida bi-al-qadar — contentment with the decree", description: "Al-rida is one of the highest stations of the heart in the Sufi tradition: the state of being genuinely content with whatever Allah has decreed, not merely resigned to it but actively pleased with it. Ibn al-Qayyim described three levels: sabr (bearing the decree patiently), rida (being content with it), and shukr (being grateful for it). The person of rida is the one who has understood deeply enough that they can say with the Companions: 'We are pleased with Allah as our Lord, Islam as our religion, and Muhammad as our Prophet.'" },
        { name: "Freedom through qadar", description: "The counterintuitive experience of genuine belief in qadar is not determinism's oppression but freedom. The person who truly believes that their rizq is determined cannot be enslaved to the fear of poverty; the person who believes that their ajal (appointed time of death) is fixed cannot be paralyzed by the fear of death; the person who believes that honor and humiliation come from Allah cannot be enslaved to seeking approval from people. Each pillar of qadar removes one tyrant from the heart." },
        { name: "Qadar in the face of tragedy", description: "The tradition's most moving statements about qadar come in response to tragedy. When the Prophet ﷺ's son Ibrahim died, he wept and said: 'The eyes weep and the heart grieves, and we do not say anything except what pleases our Lord.' This is the model: qadar does not suppress grief (the eyes weep, the heart grieves) but it directs grief within a container of submission ('we do not say anything except what pleases our Lord'). Qadar makes grief bearable without making it forbidden." },
      ],
      questions: [
        { question: "If everything is decreed, why make du'a?", answer: "The Prophet ﷺ said: 'Nothing changes qadar except du'a.' This is not a contradiction — it reflects the understanding that du'a itself is part of the qadar, and that the response to du'a is also part of the qadar. Allah has decreed both the need and the response, including the du'a as the means. Stopping du'a because 'it is all determined' is like stopping eating because 'my sustenance is determined.' The means is part of the decree." },
        { question: "Does belief in qadar make us robots?", answer: "No — and the scholars were emphatic. Human experience of genuine choice is real. The Quran holds humans fully accountable for their choices (2:286 — Allah does not burden a soul beyond its capacity; 53:39 — the human has only what they have striven for). The doctrine of kasb (acquisition) holds that humans genuinely acquire their actions, even as Allah is the creator of those actions at a deeper level. Both are true simultaneously, at different levels of causation." },
        { question: "What about evil in the world — did Allah decree it?", answer: "This is the central philosophical challenge of qadar. The Sunni scholars' answer is multi-layered: Allah knows all things (including what humans will choose), His will encompasses all events (nothing happens outside His knowledge), and His wisdom encompasses even what appears evil to us (it serves purposes we may not fully grasp). But Allah does not command evil — He may allow it as part of the test, while having commanded the good. The distinction between what Allah decrees to happen and what He commands is crucial: He decreed that Shaytan would be given respite; He did not command following Shaytan." },
      ],
    },

    semanticField: [
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: "Foundation of — qadar is what makes tawakkul rational", description: "Tawakkul (reliance on Allah) is built on the conviction of qadar: Allah has already measured all things, and His measure is perfect. The one who relies on Allah is relying on the One who holds all outcomes — not gambling on an uncertain future but resting in a determined one. Qadar without tawakkul is philosophical; tawakkul without qadar is groundless. Together they are the complete posture." },
      { slug: 'rizq',    arabic: 'رِزْق',    transliteration: 'Rizq',    relationship: 'deepens', relationshipLabel: "Specific instance of — provision is a qadar reality", description: "Rizq (provision) is one of the most concrete applications of qadar in daily life: the belief that one's provision has been determined and will reach them completely. This belief is the specific cure for rizq-anxiety — the chronic worry about money, food, and security that is one of the most universal human experiences. Shaytan's primary weapon in the material realm is threatening provision; qadar is the shield." },
      { slug: 'sabr',   arabic: 'صَبْر',    transliteration: 'Sabr',    relationship: 'deepens', relationshipLabel: "Enabled by — patience becomes possible when the decree is accepted", description: "Sabr (patience) in difficulty is only possible when qadar is believed. The person who has no framework for why suffering is permitted cannot sustain sabr for long — the suffering remains arbitrary and therefore intolerable. Qadar gives suffering a frame: it was written, it was measured, it was permitted by the One who knows what it is for. This does not make the suffering painless; it makes it bearable." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Belief in qadar protects the heart from two deadly conditions: arrogance in success and despair in loss. The person who attributes their success to their own ability is on the edge of kibr. The person who attributes their loss to chance or injustice is on the edge of jahl and despair. Qadar cures both: what you have was given; what you lost was taken. In both cases, the Giver and the Taker is Allah.", source: "Shifa al-Alil" },
      { scholar: 'Al-Ghazali', text: "The mysteries of qadar are of the secrets of Allah. The scholars have divided about it and the debate has extended, and the best of what has been said is: believe in it and do not speak excessively about it. Know that the apparent conflict between qadar and human responsibility is resolved in the reality of Allah's knowledge, which precedes without compelling.", source: "Ihya Ulum al-Din" },
    ],

    hadith: [
      { ref: "Muslim", arabic: "وَاعْلَمْ أَنَّ الأُمَّةَ لَوِ اجْتَمَعَتْ عَلَى أَنْ يَنْفَعُوكَ بِشَيْءٍ لَمْ يَنْفَعُوكَ إِلَّا بِشَيْءٍ قَدْ كَتَبَهُ اللَّهُ لَكَ، وَلَوِ اجْتَمَعُوا عَلَى أَنْ يَضُرُّوكَ بِشَيْءٍ لَمْ يَضُرُّوكَ إِلَّا بِشَيْءٍ قَدْ كَتَبَهُ اللَّهُ عَلَيْكَ", translation: "Know that if the entire nation gathered to benefit you with something, they could not benefit you except with something Allah has already written for you. And if they gathered to harm you with something, they could not harm you except with something Allah has already written against you.", note: "The Prophet ﷺ's most concentrated statement of qadar for practical living — given as personal advice to Ibn Abbas. The implication: the heart that truly believes this cannot be enslaved to fear of people or hope from people. All benefit and all harm pass through Allah's decree." },
    ],

    acrossTransitions: `The question of divine determinism vs. human freedom is one of the oldest and most persistent philosophical problems across all traditions.

In Greek philosophy, the Stoics developed the most complete pre-modern account of divine determinism: the logos (rational principle) governs all things; what happens is fate (heimarmenē); and the wise person's task is not to change what cannot be changed but to understand and accept it. The Stoic practice of amor fati (love of fate) — Epictetus, Marcus Aurelius — closely resembles the Islamic rida bi-al-qadar. But the Stoic universe is impersonal; the Quranic qadar is the decree of a personal, merciful God who loves His servants.

In Jewish thought, the tension between divine foreknowledge and human freedom was articulated memorably by Rabbi Akiva: "Everything is foreseen, yet permission is given." This paradox is accepted as irreducible — both are true, simultaneously, without explanation. The Muslim scholars' position is structurally similar: the decree is complete, and the human choice is real. The mechanism of coexistence is not fully explained in either tradition.

In Calvinist Christianity, the doctrine of predestination holds that God has from eternity elected some for salvation and others for damnation, without reference to their foreseen choices. This 'double predestination' is more deterministic than the mainstream Sunni position on qadar, which does not hold that Allah has decreed that specific individuals will go to Jahannam — rather, He has decreed all things including the choices by which people will arrive at their destinations.

The Mutazilites (a rationalist school within early Islam) rejected strong qadar on the grounds that it makes Allah the author of evil — if Allah decrees sin, how can the sinner be punished? The mainstream Sunni response, developed by al-Ashari and al-Maturidi, preserved both divine sovereignty and human accountability without fully dissolving the tension — and argued that maintaining the tension is more honest than eliminating one horn of it by denying either Allah's complete knowledge or human responsibility.`,

    relatedTerms: [
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'rizq',     transliteration: 'Rizq',     term: 'رِزْق'    },
      { slug: 'sabr',     transliteration: 'Sabr',     term: 'صَبْر'    },
      { slug: 'fitrah',   transliteration: 'Fitrah',   term: 'فِطْرَة'  },
      { slug: 'ajal',     transliteration: 'Ajal',     term: 'أَجَل'    },
    ],

    goDeeper: [
      { slug: 'al-hadid', surahName: 'Al-Hadid', note: "Contains the most explicit Quranic statement on the purpose of qadar (57:22-23) — that all things were written before they occurred, and this was revealed so that loss does not devastate the heart and gain does not inflate it. The surah is particularly rich on the relationship between this-worldly life and the next, making qadar part of a larger re-orientation of the heart's attachments." },
      { slug: 'al-qamar', surahName: 'Al-Qamar', note: "Contains 54:49 — 'Indeed, all things We have created with measure' — the Quran's most all-encompassing statement of divine qadar. The surah as a whole repeats the warning 'Have you considered?' as peoples are described being destroyed according to the divine measure — qadar at its most historical and consequential." },
    ],
  },

  fitrah: {
    slug: 'fitrah',
    term: 'فِطْرَة',
    transliteration: 'Fitrah',
    pronunciation: 'FIT-rah',
    category: 'Concepts of Existence',
    evocativeLine: "The primordial nature — the factory setting of the human soul, inclined toward its Creator.",
    hasFullEntry: true,

    summary: `Fitrah is the primordial nature — the original, uncorrupted state in which every human being is created. The word comes from the root f–ṭ–r which means to split open, to create, to originate — the same root as Surah Al-Fatir (The Originator). Fitrah is what Allah created the human upon: an innate orientation toward tawhid, an instinctive recognition of the Creator, a natural moral conscience, and a fundamental capacity for goodness. Before environment, before culture, before habit — there is fitrah.

The most important hadith on fitrah is the Prophet's ﷺ statement: "Every child is born on the fitrah — it is their parents who make them Jewish, Christian, or Zoroastrian." This hadith does not imply that children of non-Muslims are automatically Muslim; it establishes that the orientation toward the divine is prior to any specific religious formation. The fitrah is the universal baseline; religious and cultural formation either aligns with it or departs from it. The Quran's call is always in some sense a reminder — not presenting something entirely foreign but uncovering what was always there.

The Quran makes fitrah the basis of the divine covenant (mithaq — 7:172): before the creation of the world, Allah took from the children of Adam and had them witness against themselves: "Am I not your Lord?" And they said: "Yes, we testify." This primordial testimony is the origin of the fitrah — the human soul has already met its Lord, already recognized Him, already affirmed the relationship. The Quran and all prophetic messages are therefore not first introductions to Allah but reminders of what was always known. The one who disbelieves is the one who has suppressed or distorted what their fitrah carries.`,

    root: {
      letters: 'ف–ط–ر',
      transliteration: 'f–ṭ–r',
      meaning: 'To create, to originate, to split open; the primary creation',
      elaboration: "The root f–ṭ–r appears in fajr (dawn — the splitting of the night), in fatara (to create/originate), in fitr (the breaking of fast), and in fitrah (the original creation-nature). The sense of splitting or opening is the core: the dawn splits the darkness; creation splits something from nothingness; fitrah is the original crack of light in the human soul — the opening toward the divine that precedes everything else.",
    },

    occurrenceCount: 20,
    occurrenceNote: "The root f–ṭ–r appears approximately 20 times in the Quran, including the specific verse on the fitrah of Allah (30:30) and in the name of Surah Al-Fatir. The concept of original human orientation toward Allah pervades the Quran even where the specific word does not appear.",

    keyAyahs: [
      {
        ref: '30:30',
        arabic: 'فَأَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًا ۚ فِطْرَتَ ٱللَّهِ ٱلَّتِى فَطَرَ ٱلنَّاسَ عَلَيْهَا ۚ لَا تَبْدِيلَ لِخَلْقِ ٱللَّهِ',
        translation: 'So direct your face toward the religion, inclining toward truth. [Adhere to] the fitrah of Allah upon which He has created [all] people. No change should there be in the creation of Allah.',
        note: "The verse that defines fitrah in the Quran. The command is to align with the fitrah — not to create it, but to return to it, to stop covering it over. 'No change in the creation of Allah' means fitrah is permanent — it cannot be destroyed, only buried. The goal of Islamic practice is to uncover what was always there.",
      },
      {
        ref: '7:172',
        arabic: 'وَإِذْ أَخَذَ رَبُّكَ مِنۢ بَنِىٓ ءَادَمَ مِن ظُهُورِهِمْ ذُرِّيَّتَهُمْ وَأَشْهَدَهُمْ عَلَىٰٓ أَنفُسِهِمْ أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا۟ بَلَىٰ',
        translation: "And when your Lord took from the children of Adam — from their loins — their descendants and made them testify of themselves: 'Am I not your Lord?' They said: 'Yes, we testify.'",
        note: "The covenant (mithaq) that precedes all creation and all religious formation. Every human soul has already said 'yes' to Allah. The fitrah carries this 'yes' into every life. The work of the believer is to remember what was said before memory began.",
      },
      {
        ref: '91:7-8',
        arabic: 'وَنَفْسٍ وَمَا سَوَّىٰهَا ۝ فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَىٰهَا',
        translation: 'By the nafs and He who proportioned it — and inspired it with its wickedness and its taqwa.',
        note: "The fitrah contains both potentials — the capacity for taqwa is inspired into the nafs by Allah Himself. The fitrah is not only a moral orientation but a field in which both the good and the possibility of evil were placed. Fitrah does not guarantee righteousness — it provides the raw material from which righteousness can be chosen and cultivated.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Trust the fitrah as evidence', arabic: 'الفطرة حجة', arabicTranslit: "al-fiṭra ḥujja", description: "The scholars say that the universal human intuitions about the existence of a Creator, the wrongness of injustice, the reality of moral conscience — these are fitrah speaking. When an atheist feels genuine moral outrage at cruelty, the scholars say their fitrah is more active than their philosophy. The Quran makes the fitrah a kind of testimony: when the Day of Judgment comes and some say 'we didn't know,' the mithaq is produced — 'you knew, before you knew that you knew.'" },
        { number: 2, title: 'The sunan al-fitrah — acts of purification', arabic: 'سنن الفطرة', arabicTranslit: "sunan al-fiṭra", description: "The Prophet ﷺ identified specific practices as sunan al-fitrah — acts that align with and maintain the original human nature: circumcision, shaving pubic hair, trimming mustaches, trimming nails, cleaning the armpits, using miswak (tooth stick), rinsing the nose, using siwak. These are not merely hygiene practices but a tradition of aligning the physical body with the fitrah — maintaining cleanliness is an expression of the God-orientation that fitrah represents." },
        { number: 3, title: 'Protect the fitrah of children', arabic: 'حفظ فطرة الأطفال', arabicTranslit: "ḥifẓ fiṭrat al-aṭfāl", description: "The hadith about parents shaping a child into Jewish, Christian, or Zoroastrian implies a parental responsibility: the environment surrounding the child either aligns with or distorts the fitrah. This does not mean simply performing religious rituals — it means surrounding children with beauty, with honesty, with genuinely lived taqwa, with the Quran recited naturally, with du'a made visibly. The fitrah is maintained by alignment, not merely by information." },
      ],
      stations: [
        { name: "The fitrah as proof of Allah", description: "Islamic theologians (mutakallimun) frequently cited the fitrah as one of the evidences for Allah's existence — not a philosophical proof but an experiential one. Every human being, left to themselves without specific indoctrination, tends toward some notion of a Creator, some form of worship, some moral conscience. This near-universal tendency is the fitrah's testimony. The diversity of religions is not evidence against this — it is evidence that the fitrah's truth-claim gets expressed through many cultural forms." },
        { name: "Returning to fitrah through tawbah", description: "The scholars describe tawbah as a return to fitrah — the sinful self has covered the original nature under layers of habit and transgression, and tawbah is the act of clearing those layers. This gives tawbah a positive rather than merely corrective character: you are not just avoiding punishment; you are recovering something that was always yours. The nafs mutma'inna is the nafs returned to fitrah — the self that has come home." },
        { name: "The fitra and non-Muslim conscience", description: "The concept of fitrah provides the Islamic framework for understanding the genuine moral goodness of non-Muslims — their fitrah is active even when their formal religion diverges from Islam. This is not a concession that 'all religions are the same'; it is an acknowledgment that the divine image (or rather, the divine breath) in humanity is real and has moral consequences even outside explicit Islam. The scholars used this to explain why the Prophet ﷺ honored righteous pre-Islamic figures." },
      ],
      questions: [
        { question: "If everyone has fitrah, why do so many people not believe?", answer: "The fitrah is the original orientation, not an irresistible force. It can be suppressed, distorted, and covered by environment, by sin, by habitual avoidance. The Quran uses the word 'ran' (a covering over the heart) in 83:14: 'Indeed, over their hearts is a ran from what they have earned.' Fitrah is the heart in its natural state; ran is the layer that forms over it. The work of dawa (calling to Islam) and the work of tazkiya (self-purification) are both in essence the same — removing what covers the fitrah so it can recognize what it already knows." },
        { question: "Is fitrah the same as conscience?", answer: "It overlaps significantly but is broader. Conscience (in Western ethics) is specifically the moral dimension — the sense of right and wrong. Fitrah includes this but also includes the God-orientation — the innate sense of the divine that extends beyond ethics into worship, beauty, and the longing for transcendence. The Quran's fitrah is closer to the full range of what Pascal called the 'God-shaped hole' — an orientation toward something larger than the self that cannot be fully satisfied by anything within the world." },
        { question: "Can fitrah be permanently destroyed?", answer: "The mainstream scholarly position, derived from 30:30 ('no change in the creation of Allah'), is that fitrah cannot be permanently destroyed — only covered. The layers of sin, habit, and denial can become very thick. But the possibility of return always remains until the final breath, because the fitrah remains. This is why the door of tawbah remains open until the moment of death. The hardest heart can still be cracked — and what comes out when it does is often a recognition so deep it feels like memory, not new information." },
      ],
    },

    semanticField: [
      { slug: 'nafs',   arabic: 'نَفْس',    transliteration: 'Nafs',   relationship: 'deepens', relationshipLabel: "Carried in — fitrah is the original state of the nafs", description: "The nafs in its original condition is aligned with fitrah — this is the state the nafs mutma'inna returns to after purification. The nafs ammara is the fitrah covered; the nafs mutma'inna is the fitrah uncovered. This gives tazkiya al-nafs (purification of the self) a specific direction: not toward achieving something new but toward recovering something original." },
      { slug: 'ruh',    arabic: 'رُوح',     transliteration: 'Ruh',    relationship: 'deepens', relationshipLabel: "Connected to — the ruh carries the fitrah's divine orientation", description: "The ruh (spirit breathed by Allah) and the fitrah (original divine orientation of the human) are connected at their source: both reflect the divine act of creation. The fitrah is the orientation; the ruh is the animating force that maintains it. Both are 'from the command of Allah' — both are evidence that the human is more than a biological accident." },
      { slug: 'tawhid', arabic: 'تَوْحِيد', transliteration: 'Tawhid', relationship: 'deepens', relationshipLabel: "Content of — fitrah naturally inclines toward tawhid", description: "The scholars identify the fitrah's specific orientation as tawhid — the recognition of the oneness of Allah. The mithaq (covenant) of 7:172 was an affirmation of Allah's Lordship, not just generic 'religion.' Shirk (associating partners with Allah) is therefore described in the Quran not merely as a theological error but as going against one's own nature — the fitrah rebels against it even when the intellect has been convinced otherwise." },
    ],

    scholarsSaid: [
      { scholar: "Ibn al-Qayyim", text: "Fitrah is what Allah created the hearts upon — the knowledge of Him, the love of Him, and the orientation toward Him. These are prior to all learning, prior to all teaching. They were placed in the heart before the heart was placed in the body. Dhikr (remembrance of Allah) is not implanting something new; it is awakening what was always there.", source: "Miftah Dar al-Saada" },
      { scholar: 'Al-Ghazali', text: "The lights of fitrah do not go out — they are covered. The work of worship and knowledge is to remove the covering. When the covering is thin enough, the light of fitrah shines through and the person recognizes Allah with a recognition that feels more like remembering than discovering.", source: "Ihya Ulum al-Din" },
    ],

    hadith: [
      { ref: "Bukhari & Muslim", arabic: "كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ، فَأَبَوَاهُ يُهَوِّدَانِهِ أَوْ يُنَصِّرَانِهِ أَوْ يُمَجِّسَانِهِ", translation: "Every child is born on the fitrah — it is their parents who make them Jewish, Christian, or Zoroastrian.", note: "The most cited hadith on fitrah. The Prophet ﷺ then said: 'Just as an animal gives birth to a complete animal — do you see any defect in it?' The fitrah is complete in every newborn; defects are acquired. This has profound implications for how the tradition understands religious diversity and the universality of the divine pull." },
    ],

    acrossTransitions: `The concept of an original, uncorrupted human nature oriented toward the divine has parallels in virtually every major tradition.

In Christianity, the concept of imago Dei (image of God) — that humans are made in God's image (Genesis 1:26-27) — is the closest parallel to fitrah. The Fall (Adam and Eve's sin) is understood in Christian theology to have damaged but not destroyed this image. The Christian project (through grace, sacrament, sanctification) is the restoration of the imago Dei — structurally parallel to the Islamic project of restoring the fitrah. The key difference: Christianity posits original sin as a radical disruption of the original state; Islam posits no such radical disruption — the fitrah persists, only covered.

In Buddhist philosophy, the concept of Buddha-nature (tathagatagarbha) holds that all sentient beings have the potential for awakening — an uncorrupted original nature that is hidden under layers of delusion. This is structurally parallel to fitrah, though without the theistic object: the Buddhist original nature is awakened not toward Allah but toward nirvana and liberation. The practical methods (removing what covers the original nature) are similar; the metaphysical framework differs fundamentally.

In Rousseau's philosophy, the "noble savage" concept holds that humans are naturally good and it is civilization and society that corrupt them. This is a secular echo of the fitrah concept — the original nature is good; corruption is environmental. But Rousseau's framework is entirely immanent; the fitrah is transcendent — the original nature is not just good but God-oriented, and its restoration is not accomplished by removing social constraints but by turning toward Allah.

What distinguishes the Quranic fitrah is the mithaq — the primordial covenant. The fitrah is not merely a tendency or potential; it is a memory of an encounter. The human does not incline toward the divine merely by temperament — they carry the echo of a conversation that happened before time, in which they said "yes" to the question "Am I not your Lord?" This gives the fitrah a personal, relational quality that no other framework for original human nature possesses.`,

    relatedTerms: [
      { slug: 'nafs',    transliteration: 'Nafs',    term: 'نَفْس'    },
      { slug: 'ruh',     transliteration: 'Ruh',     term: 'رُوح'     },
      { slug: 'tawhid',  transliteration: 'Tawhid',  term: 'تَوْحِيد' },
      { slug: 'tawbah',  transliteration: 'Tawbah',  term: 'تَوْبَة'  },
      { slug: 'qadar',   transliteration: 'Qadar',   term: 'قَدَر'    },
    ],

    goDeeper: [
      { slug: 'ar-rum', surahName: 'Ar-Rum', note: "Contains the fitrah verse (30:30) — 'the fitrah of Allah upon which He has created all people.' The surah's larger context is remarkable: it was revealed at a time of apparent defeat (the Romans had just lost a battle) and predicts victory to come. The fitrah verse is placed in this context of reversal — just as the apparent defeat concealed a coming victory, the apparent suppression of fitrah in the world conceals its persistence." },
      { slug: 'al-araf', surahName: 'Al-Araf', note: "Contains the mithaq verse (7:172-173) — the primordial covenant in which all human souls testified to Allah's Lordship. The Quran places this before the stories of the prophets as the backdrop against which every prophet's message makes sense: they are reminders of what was already known, not new information." },
    ],
  },

  rizq: {
    slug: 'rizq',
    term: 'رِزْق',
    transliteration: 'Rizq',
    pronunciation: 'RIZQ',
    category: 'Concepts of Existence',
    evocativeLine: 'Provision — everything Allah has apportioned, wider than money and impossible to miss.',
    hasFullEntry: true,

    summary: `Rizq is provision — everything Allah has apportioned to His creation. But rizq in the Quran is far wider than its common translation as "sustenance" or "livelihood." Rizq includes food and money, yes — but also knowledge, children, health, time, relationships, opportunities, spiritual states, and any good that reaches a person. The Quran makes Allah's Raziq-hood (His being the Provider — Al-Razzaq) one of His most-repeated attributes, and the practical implication is radical: every good thing that reaches you comes from Allah, and nothing of your rizq can be prevented from reaching you.

The Quran states it plainly: "There is no creature on earth but that upon Allah is its rizq" (11:6). The scholars derived from this verse the doctrine that rizq is guaranteed — not in the sense that one will always have abundance, but in the sense that one will receive exactly what has been apportioned, no more, no less. This is not a license for passivity (the bird that sits in its nest receives no rizq; the bird that leaves its nest and seeks does) — it is a shield against anxiety. The fear that someone might "steal" your rizq, that you might work hard and still miss what is yours, that others' abundance diminishes what is available for you — the Quran's doctrine of rizq addresses all of these directly.

The deeper dimension of rizq in the Quran is spiritual: Allah is the source not only of material provision but of the most valuable things a person can receive. The hadith says the Prophet ﷺ asked: "Who among you has fasted today?" Abu Bakr replied: "I have." Then: "Who has followed a funeral procession?" Then: "Who has visited a sick person?" Abu Bakr had done all of these. The Prophet ﷺ said: "These things are not combined in a person on any day except that they enter jannah." This is rizq at its highest: the provision of guidance, of tawfiq (divine facilitation), of the opportunity to do what is good.`,

    root: {
      letters: 'ر–ز–ق',
      transliteration: 'r–z–q',
      meaning: 'To provide, to give sustenance; provision',
      elaboration: "The root r–z–q has a specific connotation of continuous, reliable provision — not a one-time gift but an ongoing supply. Allah's name Al-Razzaq (the Continuous Provider) is the intensified form of the active participle, emphasizing the perpetual nature of the divine provision. The word rizq in Arabic is used for what actually reaches and benefits — not merely what is offered or available. If an offered provision is not actually received, the scholars do not call it rizq in the technical sense.",
    },

    occurrenceCount: 123,
    occurrenceNote: "The root r–z–q appears approximately 123 times in the Quran — in the verb form razaqa (He provided), the noun rizq (provision), and in the divine name Al-Razzaq. It appears in nearly every context of the Quran: the creation of the world, the stories of the prophets, legal injunctions, eschatological description.",

    keyAyahs: [
      {
        ref: '11:6',
        arabic: 'وَمَا مِن دَآبَّةٍ فِى ٱلْأَرْضِ إِلَّا عَلَى ٱللَّهِ رِزْقُهَا',
        translation: 'And there is no creature on earth but that upon Allah is its provision.',
        note: "The most comprehensive statement of divine provision in the Quran. The word 'upon Allah' (ʿala Allah) carries a sense of committed obligation — not merely that Allah is generous but that He has undertaken the provision of every creature. The scholars say this verse makes rizq-anxiety a form of doubting Allah's commitment.",
      },
      {
        ref: '65:3',
        arabic: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
        translation: 'And He provides for him from where he does not expect.',
        note: "One of the most hope-giving verses in the Quran for material life — rizq comes from unexpected directions. The scholars taught this verse to people in financial difficulty: when you have exhausted your known sources, remember that the Provider is not limited to the paths you can see. This verse has been called 'the verse of surprise rizq.'",
      },
      {
        ref: '51:58',
        arabic: 'إِنَّ ٱللَّهَ هُوَ ٱلرَّزَّاقُ ذُو ٱلْقُوَّةِ ٱلْمَتِينُ',
        translation: 'Indeed, it is Allah who is the continual Provider — the possessor of firm strength.',
        note: "Al-Razzaq (the continuous Provider) paired with two attributes of power: dhul-quwwa (possessor of power) and al-matin (the Firm). The pairing is important: the provision comes from a source of infinite power that cannot be depleted. Allah does not run out of rizq.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Work is the means, Allah is the Provider', arabic: 'العمل سبب والرازق هو الله', arabicTranslit: "al-ʿamal sabab wa-al-rāziq huwa Allāh", description: "The bird's hadith ('If you relied on Allah as He should be relied upon, He would provide for you as He provides for the bird — it goes out hungry and returns full') is not a command to be passive. The bird goes out — it seeks, it works, it exerts effort. The difference is: the bird does not tie its security to its own effort; it ties its security to the Provider while using the means. The Muslim entrepreneur, the Muslim employee, the Muslim farmer — all work; all attribute the outcome to Allah." },
        { number: 2, title: "Taqwa opens rizq", arabic: 'التقوى تفتح أبواب الرزق', arabicTranslit: "al-taqwā taftaḥ abwāb al-rizq", description: "The Quran explicitly connects taqwa to rizq: 'Whoever has taqwa of Allah — He will make a way out for him, and will provide for him from where he does not expect' (65:2-3). The scholars derived from this that taqwa is one of the asbab (means) of rizq — not a magical formula but an alignment with the divine economy. The person who fears Allah in their dealings, who avoids haram income, who maintains honesty — opens channels of rizq that the heedless person's haram closes." },
        { number: 3, title: 'Istighfar increases rizq', arabic: 'الاستغفار يزيد الرزق', arabicTranslit: "al-istighfār yazīd al-rizq", description: "Nuh ﷺ told his people: 'Ask forgiveness of your Lord — He will send rain upon you in abundance and will increase you in strength upon strength' (71:10-12). The scholars say seeking forgiveness (istighfar) opens provision because sin restricts it: the Prophet ﷺ said that a man is deprived of rizq because of a sin he has committed. Istighfar removes the barrier. This is spiritual economics: the flow of provision is connected to the state of one's relationship with the Provider." },
      ],
      stations: [
        { name: "Halal rizq as worship", description: "The scholars placed seeking halal rizq among the obligatory acts — al-Ghazali called it the sixth pillar of religion after the five pillars, in a sense. The Prophet ﷺ said: 'Seeking halal income is an obligation upon every Muslim.' This elevates the daily work of earning a living from mere economics to worship: every halal transaction is an act of obedience; every patient acceptance of reduced income to avoid the haram is a sacrifice the angels witness. Rizq, in this framing, is not separate from 'spiritual' life — it is one of its primary arenas." },
        { name: "Giving rizq as a means of increasing it", description: "The Quran's most counterintuitive statement about rizq is that giving it away increases it: 'And whatever you spend of good — He will replace it' (34:39). The scholars say sadaqa (voluntary charity) is one of the most reliable means of increasing rizq. This is not a spiritual transaction theory (give to get) but a reorientation of the heart: the person who gives freely has understood that the rizq was always Allah's, and returning it to circulation in Allah's name aligns the giver with the divine economy of generosity." },
        { name: "Rizq in the barzakh and jannah", description: "Rizq does not end at death — the Quran describes the martyrs receiving rizq from their Lord (3:169-170: 'alive with their Lord, provided for'), and jannah itself is described in terms of rivers of rizq: water, milk, honey, wine without harm. The ultimate rizq is the vision of Allah — the sight of His face in jannah, which the hadith calls the greatest of all rewards. The human's orientation toward rizq is thus a training ground: learning to trust the Provider in the world trains the heart for the unlimited provision that has no anxious seeking, because in jannah, the asking and the giving are simultaneous." },
      ],
      questions: [
        { question: "Can I lose rizq that was written for me?", answer: "The mainstream position: no. What was written for you reaches you; what was not written for you does not, no matter what means you employ. This does not mean means are irrelevant — means are the vehicle through which rizq arrives. But the means does not add to or subtract from the written amount. Ibn al-Qayyim compared it to a reservoir: your actions determine which path the water takes to reach you, but the amount in the reservoir is fixed by Allah." },
        { question: "Is acquiring wealth through haram means still rizq?", answer: "The scholars debated this carefully. Some say: everything that reaches you is rizq in the ontological sense (Allah is the ultimate source). Others say: haram acquisition is not rizq in the religious sense because rizq in the Quran implies a gift from the Generous — and the haram acquisition is a transgression, not a gift. Practically, the haram acquisition carries consequences (loss of barakah, corruption of other provision) that the halal does not. The person who acquires through haram means has not added to their rizq — they have borrowed against their akhira." },
        { question: "What should I do when rizq is very tight?", answer: "The Quran and Sunnah give multiple prescriptions: istighfar (seek forgiveness regularly — it removes barriers), give sadaqa (even a little — it opens channels), maintain family ties (the Prophet ﷺ said silat al-rahim expands rizq and age), make du'a specifically for rizq (the du'as of the morning and evening include provision), and seek halal means actively (the bird goes out). Tightness in rizq is not evidence of divine disfavor — it may be a test that carries its own provision in patience and trust." },
      ],
    },

    semanticField: [
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: "Foundation of — trusting Allah as Provider is the basis of tawakkul", description: "Tawakkul in the material realm is specifically trust in Allah as Razzaq (the Provider). The person who has tawakkul regarding rizq does not worry about whether their provision will reach them — they know it is written, they take the means, and they leave the outcome to the One who has already measured it. Tawakkul regarding rizq is the practical daily form of belief in Allah's Raziqiyyah (His attribute of providing)." },
      { slug: 'qadar',   arabic: 'قَدَر',    transliteration: 'Qadar',    relationship: 'deepens', relationshipLabel: "Specific form of — rizq is qadar applied to provision", description: "Rizq is one of the most concrete applications of qadar in daily life: just as qadar holds that all things are measured and decreed, rizq holds that provision specifically is measured and will arrive without fail. The Quran links the two: 'indeed all things We created with qadar' — and rizq is one of the things. Believing in qadar without believing in rizq is believing in the general while doubting the specific." },
      { slug: 'shukr',  arabic: 'شُكْر',    transliteration: 'Shukr',    relationship: 'deepens', relationshipLabel: "Response to — gratitude is the proper response to rizq", description: "When rizq is understood as Allah's provision, gratitude (shukr) becomes the natural and obligatory response. The Quran says: 'Be grateful for My blessing — if you are grateful, I will increase you' (14:7). Shukr and rizq are in a growth relationship: gratitude expands what one receives, and each expansion gives more occasion for gratitude. The scholar's observation: the person who does not see their rizq as coming from Allah cannot truly feel shukr, only self-congratulation." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Rizq is of two types: the rizq of the body — food, drink, clothing — and the rizq of the heart — knowledge, faith, love, contentment, certainty. The second is the real rizq; the first is a vehicle. The person who is rich in the rizq of the heart is truly rich; the person who is rich only in the rizq of the body is like an animal that has been well-fed but has no destination.", source: "Al-Fawa'id" },
      { scholar: 'Hasan al-Basri', text: "When your provision delays in coming to you, do not seek it by sinning against Allah. What Allah has in His keeping will not come to you except through His obedience.", source: "Cited in Ibn Rajab, Jami' al-Ulum" },
    ],

    hadith: [
      { ref: "Tirmidhi", arabic: "لَوْ أَنَّكُمْ كُنْتُمْ تَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا", translation: "If you relied on Allah as He should be relied upon, He would provide for you as He provides for the bird — it goes out hungry in the morning and returns full in the evening.", note: "The most cited hadith on tawakkul and rizq together. The bird is the model: it relies on Allah (tawakkul) and it goes out and seeks (means/effort). The two are not in conflict. The bird does not say 'Allah will bring the food to my nest' — it goes out. But it does not say 'my going out is what produces the food' — it returns with what Allah made available." },
    ],

    acrossTransitions: `The concept of divine provision is universal, but its precise contours differ across traditions.

In Jewish thought, parnasa (livelihood/provision) is a persistent concern in the Talmud and the ethical literature. The rabbis taught that one's parnasa is decreed on Rosh Hashanah (the Jewish New Year) for the coming year — a near-exact parallel to the Islamic doctrine that rizq is written annually on the Night of Decree (Laylat al-Qadr). The rabbinical blessing over food (the various berakhot) reflects the same orientation as Islamic food supplications: acknowledging that what one receives comes from the Creator. The Passover Haggadah's recitation — "the land produces its bounty... God has given us..." — expresses the same theology of gratitude for divine provision.

In Christian thought, "Give us this day our daily bread" (Matthew 6:11) from the Lord's Prayer is the Christian equivalent of rizq-consciousness. Augustine interpreted "daily bread" broadly — not only physical food but all of God's grace and provision. The monastic tradition, particularly Benedictine, structured daily life around the awareness that all provision comes from God: work (ora et labora — pray and work) is combined with the awareness that the outcome belongs to God. This is structurally identical to the Islamic model.

In prosperity theology (a Protestant movement), God's provision is promised in exchange for faith and financial giving — a transactional model that the Islamic tradition would recognize as a distortion. The Quran's rizq is not transactional: Allah provides according to His wisdom and decree, not as a reward for specific investments. The confusion of rizq with prosperity theology (treating sadaqa as a transaction rather than worship) is a recognized misreading in Islamic scholarship.

What the Quran uniquely contributes is the attribute Al-Razzaq — making provision a divine name, not merely a divine action. Allah does not merely provide; He is the Provider. This names the characteristic, not just the behavior — and means that provision is not incidental to who Allah is but constitutive of it. Whoever depends on Allah depends on the One for whom providing is not a function but an identity.`,

    relatedTerms: [
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'qadar',    transliteration: 'Qadar',    term: 'قَدَر'    },
      { slug: 'shukr',    transliteration: 'Shukr',    term: 'شُكْر'    },
      { slug: 'barakah',  transliteration: 'Barakah',  term: 'بَرَكَة'  },
      { slug: 'sabr',     transliteration: 'Sabr',     term: 'صَبْر'    },
    ],

    goDeeper: [
      { slug: 'hud', surahName: 'Hud', note: "Contains verse 11:6 — 'there is no creature on earth but that upon Allah is its provision' — embedded in a surah that tells story after story of communities tested by prosperity and difficulty. The surah's overall message is that rizq is always from Allah, and the human's response to it (gratitude or arrogance) determines their trajectory." },
      { slug: 'at-talaq', surahName: 'At-Talaq', note: "Contains the extraordinary sequence (65:2-3): 'Whoever has taqwa of Allah — He will make a way out for him, and will provide for him from where he does not expect. And whoever relies upon Allah — He is sufficient for him.' This pairing of taqwa, tawakkul, and unexpected rizq is the Quran's most concentrated practical theology of provision." },
    ],
  },

  tawhid: {
    slug: 'tawhid',
    term: 'تَوْحِيد',
    transliteration: 'Tawhid',
    pronunciation: 'taw-HEED',
    category: 'Theology & Ethics',
    evocativeLine: "The oneness of Allah — the axis on which the entire universe turns.",
    hasFullEntry: true,

    summary: `Tawhid is the affirmation of Allah's oneness — the foundational conviction of Islam and the axis on which all Quranic teaching revolves. The word comes from the verb wahhada (to make one, to unify), and tawhid is the act of recognizing and affirming that Allah is utterly, incomparably, exclusively One. Not one among many; not the greatest of a hierarchy; not one in three — but One in a way that has no parallel in created existence.

The scholars divided tawhid into three categories that map the full scope of what oneness means. Tawhid al-Rububiyya: the oneness of Allah's Lordship — He alone creates, sustains, governs, and controls all of existence. Tawhid al-Uluhiyya: the oneness of Allah's divinity — He alone deserves worship, love, fear, hope, and obedience at the level of the absolute. Tawhid al-Asma wa-al-Sifat: the oneness of His names and attributes — He possesses perfect attributes that are unique to Him, which cannot be compared to created attributes. This tripartite framework was developed by Ibn Taymiyyah and became the dominant paradigm for systematic tawhid in the tradition.

The Quran makes tawhid its central demand from the first revelation to the last. The shahadah — la ilaha illa Allah — is not primarily a statement about theology; it is a statement about worship. "There is no god" — everything that functions as a god for the human heart, everything it worships, fears, hopes in absolutely, obeys without question — all of this is negated. "Except Allah" — and all of that worship, fear, hope, and obedience is redirected to its only legitimate object. The scholars say: the la (no) is the blade; the illa Allah (except Allah) is the cure. The shahadah first demolishes every false absolute and then establishes the only Real one.`,

    root: {
      letters: 'و–ح–د',
      transliteration: 'w–ḥ–d',
      meaning: 'To be one; to be alone; oneness, uniqueness',
      elaboration: "The root w–ḥ–d carries the meaning of singularity and uniqueness. The word Ahad (used in Surah Al-Ikhlas: 'Allah is Ahad') is from this root — but Ahad carries a stronger sense of absolute, irreducible singularity than Wahid (one in a numerical sense). The scholars distinguish: Wahid means 'one' as opposed to 'two'; Ahad means 'one' in a sense that admits no comparison, no conjunction, no alongside. Tawhid is the affirmation of both — Allah is Wahid (not multiple) and Ahad (uniquely, incomparably singular).",
    },

    occurrenceCount: 30,
    occurrenceNote: "The verb wahhada and the noun tawhid appear relatively rarely in the Quran — but the concept of tawhid pervades every page. The divine names (Al-Ahad, Al-Wahid, Al-Samad), the denial of partners (la sharika lah), and the negation of anything comparable to Allah (laysa ka-mithlihi shay') are the Quran's constant expression of tawhid.",

    keyAyahs: [
      {
        ref: '112:1-4',
        arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ',
        translation: 'Say: He is Allah, One. Allah, the Self-Sufficient. He neither begets nor was begotten. And there is none comparable to Him.',
        note: "Surah Al-Ikhlas — the Quran's most concentrated statement of tawhid, worth a third of the entire Quran in the Prophet's ﷺ assessment. Each verse removes a category of limitation or comparison: He is One (no multiplicity), Al-Samad (needs nothing, all need Him), did not beget nor was begotten (no genealogy, no succession, no dependents), and nothing is comparable to Him (no analogy, no parallel).",
      },
      {
        ref: '2:255',
        arabic: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ',
        translation: 'Allah — there is no god except Him, the Ever-Living, the Sustainer of all existence.',
        note: "Ayat al-Kursi — the greatest verse in the Quran according to the Prophet ﷺ. It opens with the tawhid formula and immediately establishes the two divine attributes that are the foundation of all others: Al-Hayy (the Ever-Living — no beginning, no end, no sleep, no fatigue) and Al-Qayyum (the Self-Subsisting Sustainer — everything depends on Him, He depends on nothing). All other divine attributes flow from these two.",
      },
      {
        ref: '47:19',
        arabic: 'فَٱعْلَمْ أَنَّهُۥ لَآ إِلَٰهَ إِلَّا ٱللَّهُ',
        translation: 'So know that there is no god except Allah.',
        note: "The command to know tawhid — not merely assert it. The scholars derived from this verse that tawhid must be known (ʿilm), not merely recited. This verse is the basis for the priority of learning tawhid: it must be understood, not merely inherited.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Tawhid of worship, not only of theology', arabic: 'توحيد العبادة لا العلم فقط', arabicTranslit: "tawḥīd al-ʿibāda lā al-ʿilm faqaṭ", description: "The Quran consistently emphasizes that the Makkans already believed in tawhid al-Rububiyya — if asked who created the heavens and earth, they would say Allah (39:38). What they lacked was tawhid al-Uluhiyya — directing worship exclusively to Allah. The scholars say: many modern people have the same condition. They believe Allah exists, they may even pray occasionally — but their fears, hopes, and ultimate obedience are distributed among career, status, other people, and Allah. Tawhid is not complete until the heart's absolute allegiance is unified." },
        { number: 2, title: 'The hidden shirk of the heart', arabic: 'الشرك الخفي', arabicTranslit: "al-shirk al-khafī", description: "The Prophet ﷺ warned against the 'hidden shirk' — which is riya' (showing off in worship). But the scholars extended this to include any attachment that functions as an absolute: the person who fears poverty the way they should fear only Allah's displeasure; the person who hopes for human approval with the intensity that should be reserved for Allah's mercy; the person who obeys a person's commands in what Allah has forbidden — all of these are forms of practical shirk even in those who profess tawhid verbally." },
        { number: 3, title: 'The shahadah as daily renewal', arabic: 'الشهادة تجديد يومي', arabicTranslit: "al-shahāda tajdīd yawmī", description: "The scholars encouraged renewing the shahadah daily — not because its legal force expires, but because the psychological and spiritual force of tawhid needs constant reinforcement in a world that constantly offers alternatives. Every morning, the believer re-establishes: there is no absolute except Allah. Every salah begins with this. The frequent dhikr of 'la ilaha illa Allah' is the consistent practice of returning the heart to its only legitimate anchor." },
      ],
      stations: [
        { name: "Tawhid as liberation", description: "The greatest misunderstanding of tawhid is that it is a constraint — a submission that diminishes the human. The tradition presents it as the opposite: liberation. Every absolute that the heart serves except Allah is a tyrant — wealth demands loyalty and then abandons; status demands performance and then collapses; human approval demands conformity and then betrays. The heart that has unified itself around Allah alone has freed itself from all lesser tyrannies. Ibn Taymiyyah wrote: 'The heart is not right except in Allah — and it will not be in anything as long as it is in other than Allah.'" },
        { name: "The locus of tawhid is the heart", description: "Verbal affirmation of tawhid (the shahadah) is the entry point into Islam. But real tawhid — the tawhid that transforms — is in the heart. The Quran distinguishes between those who say 'we believe' and those whose hearts have truly received faith (49:14). The scholars spend most of their tawhid teaching not on theology but on the heart: what the heart clings to, fears, hopes in, trusts, loves. These are the measures of actual tawhid, not merely the verbal formula." },
        { name: "Tawhid and the cosmos", description: "The Quran presents tawhid not only as personal but as cosmic: the entire creation is in a state of tawhid, submitting to Allah's will continuously (the sun follows its course, the stars follow their orbit, the planets follow their paths — all in submission, all in tawhid). The human being is the only creature given the option of conscious tawhid — of choosing to align with what the rest of creation does automatically. This makes the human's tawhid the most meaningful form in the cosmos: the only tawhid that is chosen." },
      ],
      questions: [
        { question: "Is tawhid purely theological or does it have practical implications?", answer: "Every practical dimension of Islamic ethics flows from tawhid. Honesty: lying is to give undue power to human consequences over divine accountability. Generosity: hoarding is to treat wealth as an absolute security rather than Allah. Justice: oppressing is to place one's own will above Allah's command. Patience in difficulty: despair is to forget that the One Who decreed the difficulty is also the One who will relieve it. Tawhid is not a chapter in a theology book — it is the operating system of the Muslim life." },
        { question: "How is 'la ilaha illa Allah' different from just saying 'God exists'?", answer: "Radically different. Saying 'God exists' is a metaphysical statement. La ilaha illa Allah is a statement about worship: it negates every absolute — every source of ultimate meaning, every object of absolute fear or hope — except Allah. A person can believe God exists while still being practically governed by money, status, or other people. La ilaha illa Allah demolishes those practical gods. The scholars derived seven conditions for the valid shahadah: knowledge, certainty, sincerity, truthfulness, love, submission, and acceptance — all of which are about the heart's actual state, not merely the tongue's statement." },
        { question: "What is shirk and why is it described as the unforgivable sin?", answer: "Shirk is associating partners with Allah — directing any form of absolute worship toward other than Him. The Quran says Allah forgives all sins except shirk if the person dies upon it (4:48). The scholars explain why: every other sin is a violation within the relationship (a servant who sins against their master but still serves them); shirk is a violation of the relationship itself (serving someone other than the master). Tawbah from shirk — sincerely turning away from it — is accepted; dying upon it is not forgivable, because forgiveness requires the relationship that shirk has severed." },
      ],
    },

    semanticField: [
      { slug: 'iman',    arabic: 'إِيمَان',  transliteration: 'Iman',   relationship: 'deepens', relationshipLabel: "Content of — tawhid is the core of iman", description: "Iman (faith) is the broader category; tawhid is its most important content. The first pillar of iman is belief in Allah — which means belief in His oneness, His names and attributes, and His sole right to worship. You cannot have iman without tawhid; and tawhid without the other pillars of iman is incomplete. They are concentric: tawhid is the center; iman is the full circle." },
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: "Expression of — ikhlas is tawhid applied to intention", description: "Ikhlas (sincerity) is tawhid at the level of motivation: just as tawhid says 'no god but Allah,' ikhlas says 'no motivation for this deed but Allah.' The scholars called riya' (showing off) 'hidden shirk' because it gives to human observation the attention that belongs only to Allah. Ikhlas is tawhid lived in every act." },
      { slug: 'taqwa',  arabic: 'تَقْوَى',  transliteration: 'Taqwa',  relationship: 'deepens', relationshipLabel: "Fruit of — true taqwa flows from tawhid", description: "Taqwa (God-consciousness) is only possible when tawhid is settled: the person who knows that Allah alone is the Judge, the Observer, and the Recompenser will fear Him in every moment. Taqwa without tawhid is anxiety about multiple sources of consequence; taqwa rooted in tawhid is focused — only one account to settle, only one Judge to face." },
    ],

    scholarsSaid: [
      { scholar: 'Ibn Taymiyyah', text: "Tawhid is the summit of all religion and the beginning of all paths. Everything that divides tawhid — whether in knowledge, will, or action — is the disease of the heart that all prophets came to cure. The treatment of every social ill, every personal disorder, every theological error, traces back to the proper establishment of tawhid in the heart.", source: "Majmu' al-Fatawa" },
      { scholar: 'Ibn al-Qayyim', text: "The entirety of the Quran is tawhid: some of it is a command to do tawhid and a prohibition against its opposite; some is a praise of those who do it and a description of their reward; some is a description of those who abandon it and their punishment; and some is the description of Allah's names and attributes — which is itself the knowledge that grounds tawhid.", source: "Madarij al-Salikin" },
    ],

    hadith: [
      { ref: "Bukhari", arabic: "حَقُّ اللَّهِ عَلَى الْعِبَادِ أَنْ يَعْبُدُوهُ وَلَا يُشْرِكُوا بِهِ شَيْئًا", translation: "Allah's right over His servants is that they worship Him and associate nothing with Him.", note: "When Muadh asked the Prophet ﷺ what Allah's right over servants is and what servants' right over Allah is, this was the answer for the first. The exclusive worship of Allah — tawhid in practice — is not a favor to Allah; it is the defining right He has over His creation. And in response, the scholars derived, Allah's right over Himself is to not punish those who do not commit shirk." },
    ],

    acrossTransitions: `The oneness of God is affirmed in all Abrahamic traditions but with significantly different content.

In Judaism, "Hear O Israel, the LORD our God, the LORD is One" (Deuteronomy 6:4) — the Shema — is the central Jewish confession of faith, the direct parallel to la ilaha illa Allah. Maimonides' thirteen principles of faith begin with the existence and oneness of God, and his negative theology (the Thirteen Principles' third and fourth articles) mirrors Islamic tawhid al-asma wa-al-sifat: God's attributes must not be understood corporeally, and nothing is comparable to Him. The Jewish tradition's monotheism is among the most rigorous in history — the prohibition against idolatry (avodah zarah) maps closely to the prohibition against shirk.

In Christianity, the classical doctrine of the Trinity holds that God is one in substance (ousia) and three in persons (hypostases). The mainstream Sunni critique — that the Trinity is a form of shirk — is based on the apparent violation of tawhid al-Uluhiyya: if three persons are each fully God, the oneness has been qualified in a way the Quran prohibits. Christian theologians argue that the Trinity is monotheism, not tritheism; Muslim theologians argue that the distinctions between the persons constitute a form of plurality that the Quran's tawhid cannot accommodate. This disagreement, rooted in the two traditions' different understandings of what "one" means when predicated of God, is the oldest and most enduring theological difference between Islam and Christianity.

Sufi metaphysics developed a concept of tawhid wujud (oneness of being) associated with Ibn 'Arabi — the idea that existence is ultimately one, and the multiplicity of the world is a mode of the divine self-disclosure. This approach has been controversial in the mainstream tradition: critics argue it collapses the Creator-creation distinction that the Quran maintains absolutely; defenders argue it is a description of mystical experience, not a metaphysical claim about identity. The mainstream Sunni tradition maintains a firm Creator-creation distinction: tawhid affirms that Allah is uniquely, absolutely One — and the creation is absolutely other than Him, dependent on Him, but not part of Him.`,

    relatedTerms: [
      { slug: 'iman',    transliteration: 'Iman',    term: 'إِيمَان'  },
      { slug: 'ikhlas',  transliteration: 'Ikhlas',  term: 'إِخْلَاص' },
      { slug: 'taqwa',   transliteration: 'Taqwa',   term: 'تَقْوَى'  },
      { slug: 'fitrah',  transliteration: 'Fitrah',  term: 'فِطْرَة'  },
      { slug: 'rahmah',  transliteration: 'Rahmah',  term: 'رَحْمَة'  },
    ],

    goDeeper: [
      { slug: 'al-ikhlas', surahName: 'Al-Ikhlas', note: "The surah whose name means sincerity but whose content is tawhid — the two are inseparable. The Prophet ﷺ said it is worth a third of the Quran. The scholars say: recite it until it enters the heart and the heart becomes a single mirror of the single God." },
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains Ayat al-Kursi (2:255-257) — the greatest verse in the Quran, which is essentially the fullest single-verse description of tawhid in practice: Allah's absolute attributes, His throne encompassing all things, and the contrast between those who worship Him alone (moving from darkness to light) and those who worship other than Him (moving from light to darkness)." },
    ],
  },

  iman: {
    slug: 'iman',
    term: 'إِيمَان',
    transliteration: 'Iman',
    pronunciation: 'ee-MAAN',
    category: 'Theology & Ethics',
    evocativeLine: 'Faith — not just belief in the mind, but conviction that moves the limbs.',
    hasFullEntry: true,

    summary: `Iman is faith — but not merely intellectual assent. The word comes from the root ʾ–m–n, the same root as amana (security, trust), amanah (trust/responsibility), and amin (trustworthy). Iman is the conviction that makes you feel secure, the trust you place in something you have staked your whole life on. In Islamic theology, iman has three components: tasdiq bi-al-qalb (affirmation in the heart — genuine internal conviction), iqrar bi-al-lisan (declaration with the tongue — verbal profession), and amal bi-al-jawarih (action with the limbs — behavioral expression). All three are parts of iman; where scholars differed is whether the actions are intrinsic to iman or its fruits.

The Quran treats iman as a dynamic, living thing rather than a static condition. It increases and decreases: "That they may increase in faith along with their [present] faith" (48:4). It can be complete: "The believers are those whose hearts tremble when Allah is mentioned" (8:2). It can be at risk: "O you who have believed — believe!" (4:136) — the command to increase in iman is addressed to those who already have it. This dynamic quality means iman is not a one-time event but a continuous project of maintenance, increase, and renewal.

The hadith of Jibril is the central definition of iman: to believe in Allah, His angels, His books, His messengers, the Last Day, and qadar — both its good and its evil. This list is not arbitrary; each pillar addresses a dimension of the unseen without which the believer's worldview would be radically impoverished. The scholars note that all six pillars are about al-ghayb — iman is specifically the conviction about what cannot be seen. And the first pillar — belief in Allah — encompasses tawhid, the names and attributes, and the whole orientation of the heart toward the Creator. Everything else in Islam is built on this foundation.`,

    root: {
      letters: 'أ–م–ن',
      transliteration: 'ʾ–m–n',
      meaning: 'Security, trust, safety; to believe, to have confidence in',
      elaboration: "The root ʾ–m–n is one of the most ethically and spiritually rich roots in the Arabic language. It gives iman (faith/trust), amn (security/safety), aman (protection), amanah (trust/responsibility), amin (trustworthy, faithful — the Prophet's ﷺ title before prophethood), and ma'mun (secure, trusted). The connection between faith and security is built into the word: iman is what produces amn — the heart that truly has iman is secure because it has placed its trust in the only truly secure foundation.",
    },

    occurrenceCount: 537,
    occurrenceNote: "The root ʾ–m–n in its various forms appears approximately 537 times in the Quran — making it one of the most frequent roots in the entire text. The verb amana ('they believed'), the noun iman, and the active participle mu'min (believer) appear constantly. The Quran is saturated with calls to iman and descriptions of its characteristics.",

    keyAyahs: [
      {
        ref: '49:14',
        arabic: 'قَالَتِ ٱلْأَعْرَابُ ءَامَنَّا ۖ قُل لَّمْ تُؤْمِنُوا۟ وَلَٰكِن قُولُوٓا۟ أَسْلَمْنَا وَلَمَّا يَدْخُلِ ٱلْإِيمَٰنُ فِى قُلُوبِكُمْ',
        translation: "The Bedouins say: 'We believe.' Say: You have not [yet] believed, but say instead: 'We have submitted.' For faith has not yet entered your hearts.",
        note: "The Quran's clearest distinction between Islam (external submission) and iman (internal conviction). Iman is specifically in the heart — the Quran does not say 'your practice is wrong'; it says 'the faith has not yet entered your hearts.' This verse established for the scholars that iman is a condition of the heart, not merely external performance.",
      },
      {
        ref: '8:2-4',
        arabic: 'إِنَّمَا ٱلْمُؤْمِنُونَ ٱلَّذِينَ إِذَا ذُكِرَ ٱللَّهُ وَجِلَتْ قُلُوبُهُمْ',
        translation: 'The believers are only those who, when Allah is mentioned, their hearts tremble.',
        note: "The Quran's description of the mu'min's experiential hallmarks: the heart trembles at the mention of Allah, faith increases when the verses are recited, reliance is placed on Allah, prayer is maintained, and from the provision given, they spend. These are the signs of genuine iman — internal trembling that produces external action.",
      },
      {
        ref: '48:4',
        arabic: 'هُوَ ٱلَّذِىٓ أَنزَلَ ٱلسَّكِينَةَ فِى قُلُوبِ ٱلْمُؤْمِنِينَ لِيَزْدَادُوٓا۟ إِيمَٰنًا مَّعَ إِيمَٰنِهِمْ',
        translation: 'It is He who sent down tranquility into the hearts of the believers that they might add faith upon their faith.',
        note: "Iman increases — this verse establishes the dynamic, growth-oriented nature of faith. The scholars derived from this that cultivating iman is an ongoing obligation, not a one-time achievement. 'Faith upon faith' (imanan ma'a imanihim) — the base plus the new increment — implies a cumulative growth that has no ceiling in this life.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Iman increases with deeds and decreases with sins', arabic: 'الإيمان يزيد وينقص', arabicTranslit: "al-īmān yazīd wa-yanquṣ", description: "The Ahlus-Sunnah consensus position is that iman increases with obedience and decreases with disobedience. This is not a license for anxiety — it is a call to maintenance. Just as physical health requires ongoing care, iman requires ongoing nourishment: salah, Quran recitation, dhikr, company of the righteous, acts of charity, and avoiding what weakens it. The person who asks 'how is my iman?' is already ahead of the one who does not notice." },
        { number: 2, title: "Shubhat and shahawat are iman's enemies", arabic: 'الشبهات والشهوات قاطعان للإيمان', arabicTranslit: "al-shubuhāt wa-al-shahawāt qāṭiʿān lil-īmān", description: "Ibn al-Qayyim identified two things that weaken iman: shubhat (intellectual doubts that cloud certainty) and shahawat (desires that override the moral compass). Shubhat are treated with knowledge — returning to the Quran, the Sunnah, and the scholars. Shahawat are treated with practice — increasing worship, maintaining fasting, keeping good company. The scholars prescribe different treatments because the diseases are different." },
        { number: 3, title: 'Iman must be lived, not merely carried', arabic: 'الإيمان يُعاش لا يُحمل فقط', arabicTranslit: "al-īmān yuʿāsh lā yuḥmal faqaṭ", description: "The Quran consistently commands those who already believe to keep believing, to increase in belief, to act from their belief. 'O you who have believed — believe' (4:136) is the command to the already-believing to deepen and enact their belief. The tradition does not recognize a faith that produces nothing in the life of the person — not in the narrow sense that any deed can be demanded, but in the broad sense that iman necessarily changes a person." },
      ],
      stations: [
        { name: "The sweetness of iman", description: "The Prophet ﷺ described three things whose presence produces 'the sweetness of faith (halawat al-iman)': that Allah and His messenger are more beloved than anything else; that one loves a person only for Allah's sake; and that returning to kufr after iman would be as hateful as being thrown into fire. The scholars say 'sweetness' is a perfect description: genuine iman has a taste that the person who has experienced it cannot mistake. When iman is thin, worship feels like a burden; when iman is strong, worship is the relief." },
        { name: "Iman in the trial", description: "The Quran reveals that iman is most clearly seen in its encounter with difficulty. 'Do people think they will be left to say: We believe, and they will not be tested?' (29:2). The tests are not punishments; they are the furnace in which genuine iman is distinguished from social conformity. The companions' iman was forged in Mecca — in hunger, torture, and exile — and came out stronger. The scholars say: a faith that has not been tested is not necessarily weak, but a faith that has been tested and held is gold." },
        { name: "Yaqin — certainty as iman's summit", description: "The scholars identified yaqin (certainty) as the highest form of iman. The companions were described as having yaqin — not wavering intellectual probability but settled, unshakable conviction. The Quran addresses those 'who have yaqin in the meeting with their Lord' (2:46) as a specific quality. This yaqin is not blind — it is based on the mountains of evidence in creation, in revelation, in the heart's own experience. The mu'min of yaqin cannot be argued out of their faith because their knowledge is not merely propositional." },
      ],
      questions: [
        { question: "Does committing sins mean I have lost my iman?", answer: "No — the mainstream Sunni position is that iman decreases with major sins but is not eliminated by them (unlike the Kharijites who made takfir over major sins, or the Murji'a who said iman is unaffected by sins). The fasiq (the sinning Muslim) has diminished iman but remains in the fold of Islam and iman, eligible for forgiveness and capable of tawbah. The exception is the specific beliefs that constitute kufr (denial of tawhid, denial of prophethood, etc.) — these do exit iman." },
        { question: "What is the relationship between iman and Islam?", answer: "The scholars say: every mu'min is a Muslim, but not every Muslim is a mu'min in the full sense — as 49:14 demonstrates. Islam is the outer form; iman is the inner reality. When Islam and iman coincide completely — with full conviction and external submission aligned — the person is called a mu'min. When the outer submission is present but the inner conviction incomplete, the person is called a Muslim. Ihsan (excellence) is the further refinement: the mu'min who worships as though they see Allah." },
        { question: "Can iman be lost completely?", answer: "In the living person, iman can be completely lost through specific acts of kufr (explicit rejection of fundamental truths). But the tradition emphasizes how rare complete loss is — and how rapidly it can be recovered through tawbah. The greater danger is the gradual erosion of iman through neglect — the slow accumulation of small failures of worship, small surrenders to desire, small movements away from the community of believers — until the person wakes up to find their connection to Allah thin. This gradual erosion is far more common than sudden apostasy." },
      ],
    },

    semanticField: [
      { slug: 'tawhid',  arabic: 'تَوْحِيد', transliteration: 'Tawhid',  relationship: 'deepens', relationshipLabel: "Core of — tawhid is the heart of iman", description: "Tawhid is the essential content of iman: to have iman is, at its foundation, to believe in Allah's oneness and sole right to worship. All the other pillars of iman (angels, books, messengers, Last Day, qadar) are extensions and amplifications of the central tawhid conviction." },
      { slug: 'ihsan',   arabic: 'إِحْسَان', transliteration: 'Ihsan',   relationship: 'deepens', relationshipLabel: "Summit of — ihsan is iman perfected and lived", description: "The hadith of Jibril presents three levels: Islam (outer practice), iman (inner conviction), and ihsan (worshipping Allah as though you see Him). Ihsan is iman at its most developed — not only believing but living with constant divine awareness. Iman provides the foundation; ihsan is the building raised on it." },
      { slug: 'taqwa',  arabic: 'تَقْوَى',  transliteration: 'Taqwa',  relationship: 'deepens', relationshipLabel: "Fruit of — consistent taqwa is iman's practical expression", description: "Taqwa (God-consciousness) is what iman produces in everyday life: the awareness that every moment is before Allah, that every choice is a choice made in His presence, that every relationship is accountable to Him. Iman is the conviction; taqwa is the consequence of that conviction played out moment to moment." },
    ],

    scholarsSaid: [
      { scholar: 'Al-Ashari', text: "Iman is affirmation in the heart, declaration on the tongue, and action with the limbs. It increases with obedience and decreases with disobedience.", source: "Al-Ibanah 'an Usul al-Diyanah" },
      { scholar: 'Ibn Rajab al-Hanbali', text: "The foundation of iman is knowledge of Allah — His names, His attributes, His actions. From this knowledge arises mahabbah (love), khawf (fear), raja' (hope), and all the states of the heart that are the substance of faith. Without knowledge, there is no real iman — only inherited habit.", source: "Jami' al-Ulum wa-al-Hikam" },
    ],

    hadith: [
      { ref: "Muslim (Hadith of Jibril)", arabic: "أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ", translation: "That you believe in Allah, His angels, His books, His messengers, the Last Day, and that you believe in qadar — both its good and its evil.", note: "The canonical definition of iman from the hadith of Jibril. The Prophet ﷺ called this 'the truth' (sadaqa) when Jibril confirmed it — establishing the six pillars as the authoritative and complete definition." },
    ],

    acrossTransitions: `Faith as a complex of conviction, action, and community appears in all major religious traditions, but Islam's tripartite analysis of iman is distinctive.

In Christian theology, faith (pistis in Greek, fides in Latin) has been the subject of the most contentious debates in Western religious history — most notably the Reformation question of whether salvation comes by faith alone (sola fide) or by faith and works. Martin Luther's insistence on sola fide was partly a reaction against what he saw as works-based Catholic piety. Thomas Aquinas had argued that 'faith without charity is dead' — a position structurally similar to the Sunni view that iman without actions is incomplete.

In Jewish thought, emunah (faith/trust — from the same Semitic root as iman) is distinct from 'belief' in the Western sense. The Jewish scholar Maimonides articulated thirteen principles of faith, but emunah in the tradition is more relational than propositional — it is trust in God's reliability, faithfulness to His covenant, rather than intellectual assent to propositions about His nature. This relational dimension of trust (related to emet — truth, and aman — to be reliable) is shared with the Arabic iman's connection to amana.

In Buddhist philosophy, saddha (faith/confidence) is not blind faith but confidence based on experience and investigation — the confidence of the meditator who has verified the teachings through practice. This experiential verification parallels the Islamic concept of yaqin (certainty) — the highest form of iman that has moved beyond inherited belief into personal witness.

What the Islamic tradition uniquely contributes is the precision of the six pillars — a specific, enumerable content for what faith must encompass. This is not limitation but liberation: the Muslim knows exactly what they are committing to. The six pillars of iman are not arbitrary; each addresses a dimension of the unseen that, without it, would leave the believer's worldview dangerously incomplete.`,

    relatedTerms: [
      { slug: 'tawhid',  transliteration: 'Tawhid',  term: 'تَوْحِيد' },
      { slug: 'ihsan',   transliteration: 'Ihsan',   term: 'إِحْسَان' },
      { slug: 'taqwa',   transliteration: 'Taqwa',   term: 'تَقْوَى'  },
      { slug: 'al-ghayb', transliteration: 'Al-Ghayb', term: 'ٱلْغَيْب' },
      { slug: 'qadar',   transliteration: 'Qadar',   term: 'قَدَر'    },
    ],

    goDeeper: [
      { slug: 'al-hujurat', surahName: 'Al-Hujurat', note: "Contains 49:14 — the verse that distinguishes Islam from iman and establishes that faith is specifically a condition of the heart. The surah as a whole addresses the qualities of the believing community: how they should relate to each other, how they should handle news, how unity and brotherhood are maintained. It is the Quran's most concentrated surah on the ethics of iman in community." },
      { slug: 'al-anfal', surahName: 'Al-Anfal', note: "Opens with the defining description of the mu'minun (8:2-4): hearts that tremble at Allah's mention, faith that increases with recitation, reliance on Allah, establishment of salah, spending from provision. This sequence — from inner trembling to outer action — is the Quran's most vivid portrait of iman in operation." },
    ],
  },

  ihsan: {
    slug: 'ihsan',
    term: 'إِحْسَان',
    transliteration: 'Ihsan',
    pronunciation: 'ih-SAAN',
    category: 'Theology & Ethics',
    evocativeLine: "To worship Allah as though you see Him — knowing He sees you.",
    hasFullEntry: true,

    summary: `Ihsan is the highest of the three dimensions of religion defined in the hadith of Jibril: Islam (submission — the outer acts), Iman (faith — the inner conviction), and Ihsan (excellence — the fullest integration of both). The Prophet ﷺ defined it: "To worship Allah as though you see Him — for if you do not see Him, He sees you." This definition is among the most profound sentences in all of Islamic literature. It describes a mode of being, not merely a mode of acting. The person of ihsan has collapsed the distance between the private and the public, between the observed and the unobserved, between worship and life. Everything is done in the full presence of Allah.

Ihsan has a horizontal dimension as well — excellence toward other people. The Quran uses ihsan repeatedly to mean "doing good" or "excellence in conduct": "Indeed, Allah orders justice and ihsan" (16:90). The scholars say: the one who has ihsan toward Allah cannot fail to have ihsan toward people, because the divine presence they carry informs every interaction. Ihsan toward Allah produces the awareness that every person is Allah's creature — and that is the deepest motivation for ihsan toward them.

What makes ihsan different from mere piety is the quality of awareness it requires and produces. The person who performs salah to be seen is not reaching ihsan. The person who performs salah hoping to be done quickly is not reaching ihsan. The person who performs salah aware that they are in the presence of the Most High, speaking directly to the Lord of all worlds, every movement an address — this person is approaching ihsan. It is excellence of presence, not merely excellence of form. The scholars say ihsan is when the heart has arrived at where the body already is.`,

    root: {
      letters: 'ح–س–ن',
      transliteration: 'ḥ–s–n',
      meaning: 'To be beautiful, good, excellent; to do something well',
      elaboration: "The root ḥ–s–n is the root of all things beautiful and good in Arabic: husn (beauty, goodness), hasan (beautiful, good), tahsin (beautification, improvement), and ihsan (doing excellently, benevolence). Form IV (ahsana) means 'to do excellently' or 'to do good to' — the causative form, suggesting that ihsan is making something beautiful, bringing something to its highest quality. Allah is described as 'the one who makes everything He created excellent' (32:7 — ahsana kulla shay').",
    },

    occurrenceCount: 195,
    occurrenceNote: "The root ḥ–s–n appears approximately 195 times in the Quran in various forms — husn (beauty/goodness), hasan (beautiful/good), ihsan (doing good/excellence), and muhsinun (those who do excellence). It is one of the most thoroughly positive roots in the Quran.",

    keyAyahs: [
      {
        ref: '16:90',
        arabic: 'إِنَّ ٱللَّهَ يَأْمُرُ بِٱلْعَدْلِ وَٱلْإِحْسَٰنِ وَإِيتَآئِ ذِى ٱلْقُرْبَىٰ وَيَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ وَٱلْبَغْىِ',
        translation: 'Indeed, Allah orders justice and ihsan and giving to relatives, and He forbids immorality, wrong conduct, and oppression.',
        note: "This verse is recited in the Friday khutba (sermon) in virtually every mosque in the world. The scholars say justice ('adl) is giving people their rights; ihsan is giving more than their rights — going beyond what is required. Justice is the floor; ihsan is the aspiration above it.",
      },
      {
        ref: '55:60',
        arabic: 'هَلْ جَزَآءُ ٱلْإِحْسَٰنِ إِلَّا ٱلْإِحْسَٰنُ',
        translation: 'Is the reward of ihsan anything but ihsan?',
        note: "One of the most beautiful verses in the Quran for its simplicity: excellence is repaid with excellence. The scholars apply this in both directions — toward Allah (the ihsan of the worshipper is repaid with the ihsan of the divine response) and toward people (the ihsan of the giver produces the condition for the ihsan of the recipient). Ihsan is contagious.",
      },
      {
        ref: '31:22',
        arabic: 'وَمَن يُسْلِمْ وَجْهَهُۥٓ إِلَى ٱللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ ٱسْتَمْسَكَ بِٱلْعُرْوَةِ ٱلْوُثْقَىٰ',
        translation: 'Whoever submits his face to Allah while being a muhsin — he has grasped the most trustworthy handhold.',
        note: "Ihsan and submission to Allah together — the muhsin who also submits fully is described as grasping al-'urwa al-wuthqa (the most trustworthy handhold). This phrase, also in 2:256, describes the maximum security available in this life: to be in full submission with full excellence.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: "Allah's observation is the foundation", arabic: 'مراقبة الله أساس الإحسان', arabicTranslit: "murāqabat Allāh asās al-iḥsān", description: "The Prophet's ﷺ definition of ihsan is built on muraqaba — the awareness of being observed by Allah at all times. This awareness is the engine of ihsan: when the heart is genuinely aware that every act is in Allah's full sight, the motivation to cut corners, to perform for the audience while neglecting the essential, to treat private moments differently from public ones — all of this dissolves. Muraqaba is not paranoia; it is the settling awareness of divine companionship." },
        { number: 2, title: 'Ihsan in all things', arabic: 'الإحسان في كل شيء', arabicTranslit: "al-iḥsān fī kulli shayʾ", description: "The Prophet ﷺ said: 'Indeed, Allah has prescribed ihsan in all things — so when you kill, kill well; and when you slaughter, slaughter well.' This hadith extends ihsan to the most unexpected places: even the necessary taking of animal life should be done with the maximum care and excellence. The scholars derived from this that ihsan is not reserved for worship; it is a comprehensive mode of approaching everything — work, relationships, learning, rest, even the body's care." },
        { number: 3, title: 'The muhsin is loved by Allah', arabic: 'الله يحب المحسنين', arabicTranslit: "Allāhu yuḥibb al-muḥsinīn", description: "The Quran repeats 'Allah loves the muhsinun' (those who have ihsan) more than almost any other statement about divine love. This is the reward of ihsan in this life before the next: to be loved by Allah. The scholars say: to know that your worship is done with ihsan — with full presence and sincerity — is to know that it is received. To know it is received is to know the Receiver. This is the intimacy that ihsan produces." },
      ],
      stations: [
        { name: "Ihsan in salah", description: "The scholars describe the highest form of salah as the 'salah of the muhsin' — not merely the valid salah (which covers the conditions and pillars) but the excellent salah: in which the heart is present from the opening takbir to the final salam, in which the words are understood as one speaks them, in which the prostration (sujud) is a moment of complete nearness. This is ihsan in salah — and the Prophet ﷺ said that of the salah, only the portion done with presence (hudur al-qalb) is written for the person. Not the quantity of rakats but the quality of presence." },
        { name: "Ihsan in relationships", description: "The Quran pairs ihsan toward Allah with ihsan toward parents (17:23), relatives, orphans, the poor, neighbors, travelers, and those under one's authority (4:36). This list shows that the vertical ihsan (toward Allah) is immediately expressed horizontally (toward people). The scholars say the mu'min of ihsan notices the person before the task, the human behind the transaction, the need beyond the explicit request. Ihsan in relationships is giving people more than their due — not just fulfilling the obligation but exceeding it with care." },
        { name: "Allah as Al-Muhsin", description: "The Quran itself says: 'the One who made excellent everything He created' (32:7 — ahsana kulla shay'). This means Allah is Al-Muhsin — the One of perfect excellence in everything He does. Every created thing is made with ihsan — precision, care, fitting proportion. The human command to have ihsan is, in this light, a command to imitate the divine characteristic in the human domain. The person of ihsan is trying to do what Allah does: to make every created thing — every relationship, every act, every deed — as excellent as it can be." },
      ],
      questions: [
        { question: "Is ihsan required or just recommended?", answer: "Ihsan is fard (obligatory) in certain things and mustahabb (highly recommended) in others. The Prophet ﷺ made ihsan obligatory in killing and slaughtering (hadith of Muslim). The Quran's command 'Allah orders justice and ihsan' (16:90) is a command, not merely advice. In worship, the minimum is what is required for validity; ihsan is the aspiration above that minimum. The scholars say: the mukallaf (legally responsible person) is required to do the minimum; the muhsin voluntarily goes beyond it — and this voluntary excellence is the hallmark of the beloved servant." },
        { question: "How do I develop the muraqaba (divine awareness) that produces ihsan?", answer: "The scholars give several prescriptions: frequent dhikr (remembrance of Allah) keeps the awareness of His presence near; recitation of Quran slowly, with presence, trains the heart to be before Allah in speech; night prayer (tahajjud) trains the heart to be before Allah when no one is watching; reflecting on the divine names that emphasize Allah's sight and knowledge (Al-Basir, Al-Khabir, Al-Raqib, Al-Shahid) makes the awareness more concrete. These are not techniques to be applied once but practices to be maintained." },
        { question: "Is ihsan achievable for ordinary people?", answer: "The tradition says yes — though at varying depths. The companions were muḥsinun; the Prophet ﷺ described it to ordinary people as a practical mode of worship, not a mystical achievement. The degree of ihsan varies: from the person who manages ihsan for moments within their worship, to the person who has extended ihsan into most of their life. The distinction is not between muḥsinun and everyone else — it is between more and less ihsan, a continuous scale rather than a threshold. The goal is to extend the moments of presence until they become the norm." },
      ],
    },

    semanticField: [
      { slug: 'iman',   arabic: 'إِيمَان',  transliteration: 'Iman',   relationship: 'deepens', relationshipLabel: "Built on — ihsan is iman perfected in awareness", description: "Ihsan is iman at its fullest development: the conviction (iman) has become so settled that it produces constant divine awareness (muraqaba). The person whose iman is thin can have moments of ihsan; the person whose iman is deep lives in a sustained state of ihsan. Ihsan is not a different thing from iman — it is iman when it has permeated every layer of the person." },
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: "Companion of — ihsan requires ikhlas to be real", description: "Ihsan without ikhlas is impossible — if the deed is done for human observation, the divine observation that defines ihsan has not arrived. Ikhlas (sincerity) is the prerequisite: the deed must be for Allah alone before the awareness of Allah's observation can settle. The two are interlocked: ikhlas ensures the deed is directed to Allah; ihsan ensures the doer is present before Allah." },
      { slug: 'taqwa',  arabic: 'تَقْوَى',  transliteration: 'Taqwa',  relationship: 'deepens', relationshipLabel: "Partner of — taqwa and ihsan are the twin expressions of nearness to Allah", description: "The Quran frequently pairs taqwa and ihsan as the qualities of the people closest to Allah. Taqwa is the protective consciousness — the awareness that prevents overstepping. Ihsan is the positive consciousness — the awareness that drives excellence. Together they describe a person who is both careful and excellent, both protected from harm and aspiring to the highest good." },
    ],

    scholarsSaid: [
      { scholar: 'Al-Nawawi', text: "Ihsan is a quality of the heart — the awareness that Allah sees everything one does, hears everything one says, and knows everything one intends. The person who has truly internalized this cannot do less than their best in any act of worship or service, because they are always before an observer Whose observation cannot be escaped and Whose judgment cannot be influenced.", source: "Sharh Muslim" },
      { scholar: 'Ibn Rajab al-Hanbali', text: "The Prophet ﷺ defined ihsan by two levels: to worship Allah as though you see Him — this is the station of mushahada (witnessing), the highest. And if you do not see Him, He sees you — this is the station of muraqaba (awareness of being observed). The first is for those who have advanced in the path; the second is available to all sincere worshippers.", source: "Jami' al-Ulum wa-al-Hikam" },
    ],

    hadith: [
      { ref: "Muslim (Hadith of Jibril)", arabic: "الإِحْسَانُ أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ", translation: "Ihsan is to worship Allah as though you see Him — for if you do not see Him, He sees you.", note: "The canonical definition from the hadith of Jibril. The two levels within the definition are themselves a progression: 'as though you see Him' is the highest — the heart that has reached mushahada (witnessing). 'He sees you' is the floor — the minimum awareness that constitutes ihsan for those not yet at mushahada." },
      { ref: "Muslim", arabic: "إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ", translation: "Indeed, Allah has prescribed ihsan in all things.", note: "One of the most encompassing hadith in the tradition — ihsan is not optional in worship and optional in everything else. It is prescribed (kataba — written as obligatory or as the ideal) for every single thing. The scholars say: whatever you do, Allah's right over you is that you do it with excellence." },
    ],

    acrossTransitions: `Excellence in worship and conduct as the highest human aspiration appears across traditions, but the Quranic definition — anchored in divine observation — is distinctive.

In Aristotelian ethics, eudaimonia (human flourishing) is achieved through arête (excellence/virtue) — the consistent practice of virtuous action until it becomes one's character. The virtuous person does excellent things naturally, not effortfully, because excellence has become their second nature. This is structurally parallel to ihsan: the muhsin is not performing excellence anxiously but inhabiting it. The Aristotelian virtue ethicist and the Quranic muhsin both describe a person for whom the excellent act is the natural act.

In Confucian thought, ren (benevolence, humaneness) is the highest virtue — a deep, unconditional care for others expressed in every interaction. The Confucian gentleman (junzi) is the person who expresses ren consistently, whose conduct in every situation reflects the highest human ideal. This approximates ihsan toward people — excellence in human relations as a lifelong project. The difference from the Quranic framework is the vertical dimension: Confucian ihsan is toward people and human society; Quranic ihsan is toward Allah first, and from that flows ihsan toward people.

In Christian mysticism, the concept of living coram Deo (before the face of God) — conducting one's life in the constant awareness of the divine presence — is the direct parallel to the muraqaba that defines ihsan. Brother Lawrence's "Practicing the Presence of God" describes the same aspiration: to make every act, however mundane, a conscious act before God. This is ihsan in Christian form — the awareness of divine observation transforming every moment.

What the Quran uniquely provides is the reciprocal: "Is the reward of ihsan anything but ihsan?" (55:60). The divine response to human excellence is divine excellence — which in the ultimate form is the vision of Allah in jannah, described in the hadith as the greatest reward. Human ihsan produces divine ihsan. The circle is complete, and the circle is mercy.`,

    relatedTerms: [
      { slug: 'iman',    transliteration: 'Iman',    term: 'إِيمَان'  },
      { slug: 'ikhlas',  transliteration: 'Ikhlas',  term: 'إِخْلَاص' },
      { slug: 'taqwa',   transliteration: 'Taqwa',   term: 'تَقْوَى'  },
      { slug: 'khushu',  transliteration: "Khushu'", term: 'خُشُوع'   },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
    ],

    goDeeper: [
      { slug: 'an-nahl', surahName: 'An-Nahl', note: "Contains 16:90 — 'Allah orders justice and ihsan' — the verse recited at every Friday sermon. The surah is particularly rich in descriptions of Allah's ihsan in creation (bees, rain, milk, ships, the gifts of day and night) — grounding the command to human ihsan in the divine model. Allah commands ihsan because He practices it first." },
      { slug: 'ar-rahman', surahName: 'Ar-Rahman', note: "The surah whose refrain 'which of your Lord's favors will you deny?' is itself an exercise in ihsan-awareness: attending to the specific, varied, and lavish blessings of Allah produces the consciousness of being before a Giver of excellence. The surah ends: 'Is the reward of ihsan anything but ihsan?' (55:60) — making the entire surah a meditation on the reciprocity of excellence between Creator and creation." },
    ],
  },

  taqwa: {
    slug: 'taqwa',
    term: 'تَقْوَى',
    transliteration: 'Taqwa',
    pronunciation: 'TAQ-wah',
    category: 'Theology & Ethics',
    evocativeLine: 'God-consciousness — the shield that makes every moment a moral choice.',
    hasFullEntry: true,

    summary: `Taqwa is one of the most frequently appearing and most consequential concepts in the Quran. It appears in some form in nearly every surah. It is the quality that the Quran holds up as the standard of honor, the criterion of distinction between people, the basis of divine reward, and the prerequisite for guidance. The word is often translated as "piety," "God-fearing," or "God-consciousness" — but none of these captures the full richness of the Arabic. The root w–q–y means "to protect" or "to shield" — taqwa is the shield you build between yourself and what angers Allah. It is protection, not merely feeling.

The scholars defined taqwa as: "To act in obedience to Allah, upon light from Allah, seeking the reward of Allah; and to leave disobedience to Allah, upon light from Allah, out of fear of the punishment of Allah." This definition has four parts: action, knowledge-basis (light), motivation (seeking reward), avoidance of sin, knowledge-basis again, and motivation again (fear of punishment). Taqwa is not a passive emotional state — it is an active, knowledge-driven, motivation-conscious mode of navigating life.

The Quran makes taqwa the criterion of honor in the most democratic statement of ethics ever uttered: "Indeed, the most noble of you in the sight of Allah is the most muttaqi (the one with the most taqwa)" (49:13). Not the richest, not the most powerful, not the most learned — the most muttaqi. This single verse overturns every human hierarchy of status and replaces it with one measure: the quality of one's relationship with Allah, as expressed in taqwa. And because taqwa is in the heart (which only Allah can fully see), it is the only criterion of honor that no one can fake before the One who counts.`,

    root: {
      letters: 'و–ق–ي',
      transliteration: 'w–q–y',
      meaning: 'To protect, to shield, to guard against',
      elaboration: "The root w–q–y is the root of wiqaya (protection/prevention), taqwa (the state of being protective of oneself from Allah's displeasure), and ittaqa (to have taqwa, to protect oneself). The image is the warrior's shield: taqwa is the shield the believer constructs between themselves and anything that would bring Allah's displeasure. It is active protection — not passive avoidance but deliberate construction. The muttaqi is the shielded one, the one who has taken precautions against the most serious of all dangers.",
    },

    occurrenceCount: 258,
    occurrenceNote: "The root w–q–y appears approximately 258 times in the Quran — making taqwa one of the most frequently occurring concepts in the entire text. The verb ittaqa (to have taqwa), the noun taqwa, the adjective muttaqi (one who has taqwa), and the plural muttaqun appear throughout virtually every surah.",

    keyAyahs: [
      {
        ref: '49:13',
        arabic: 'إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ',
        translation: 'Indeed, the most noble of you in the sight of Allah is the most muttaqi among you.',
        note: "The single most democratic statement in religious history. After listing all the ways humans divide themselves (nations, tribes, ethnicities), the Quran declares that the only measure that counts before Allah is taqwa. The scholars say: this verse demolished every hierarchy of the pre-Islamic period — of lineage, wealth, and power — and replaced it with the only hierarchy that reflects divine rather than human values.",
      },
      {
        ref: '2:2-3',
        arabic: 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ ۝ ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ',
        translation: 'This is the Book about which there is no doubt — a guidance for the muttaqin, who believe in the unseen.',
        note: "The Quran begins by stating who it guides: the muttaqin. This does not mean non-muttaqin receive no benefit — but the deepest guidance is unlocked by taqwa. The scholars say: the Quran is for everyone, but the one whose heart has taqwa receives it differently — as rain that lands on prepared soil rather than rock.",
      },
      {
        ref: '65:2-3',
        arabic: 'وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
        translation: 'And whoever has taqwa of Allah — He will make a way out for them, and will provide for them from where they do not expect.',
        note: "The practical promise attached to taqwa: makhraj (a way out) and unexpected provision. The scholars say this verse has been experienced by believers in every difficulty — taqwa does not prevent trials, but it produces outcomes that the person could not have arranged. The way out comes from where you were not looking.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Taqwa is built deed by deed', arabic: 'التقوى تُبنى شيئاً فشيئاً', arabicTranslit: "al-taqwā tubnā shayʾan fa-shayʾan", description: "Taqwa is not given all at once — it is constructed through the consistent practice of small obediences and small refusals. The person who maintains their five prayers on time, who guards their tongue, who returns the small trust, who avoids the small haram — is building taqwa brick by brick. The scholars say: taqwa is a garden, not a lightning strike. It requires consistent watering." },
        { number: 2, title: 'Taqwa in what is lawful, not only the forbidden', arabic: 'التقوى في المباح أيضاً', arabicTranslit: "al-taqwā fī al-mubāḥ ayḍan", description: "The higher forms of taqwa extend beyond avoiding the haram into being careful about one's relationship with the mubah (the permissible). The scholars described the person of deep taqwa as one who asks 'does this thing I am about to do, though permissible, move me toward Allah or away?' This is not scrupulosity but discernment: the heart that has developed taqwa begins to feel the subtle movements of drawing near and pulling back, and attends to them." },
        { number: 3, title: 'Taqwa requires knowledge', arabic: 'التقوى لا تكون إلا بعلم', arabicTranslit: "al-taqwā lā takūn illā bi-ʿilm", description: "You cannot avoid what you do not know to avoid. The scholars consistently tied taqwa to knowledge: you must know what Allah has commanded and what He has prohibited before you can have meaningful taqwa. This is why seeking knowledge (talab al-ilm) is described as one of the paths to taqwa. The ignorant person who has no idea what the Quran asks for cannot have taqwa — they may have good intentions, but taqwa requires the light (nur) of knowledge to navigate by." },
      ],
      stations: [
        { name: "Wara — the taqwa that goes beyond the minimum", description: "The scholars identified wara' as the station beyond standard taqwa: avoiding not only the clearly forbidden but also what is doubtful, and even being careful about some of the permissible in order to protect the heart from sliding toward the forbidden. 'Leave what makes you doubt for what does not make you doubt' (hadith). Wara' is taqwa refined to its most protective — the person who lives with such sensitivity to what might harm their relationship with Allah that they maintain large margins of safety." },
        { name: "Taqwa in the heart", description: "The Prophet ﷺ pointed to his chest three times and said: 'Taqwa is here.' The scholars derived from this that taqwa is fundamentally a condition of the heart, expressed in outer behavior. A person can perform all the external signs of piety while the heart is occupied elsewhere — this is not taqwa. And a person can have a heart full of divine awareness while their circumstances prevent outward expression — but the heart's state is what Allah sees. Taqwa begins in the heart; the external behavior is its fruit." },
        { name: "Taqwa and the opening of provision", description: "The Quran's attachment of taqwa to provision (65:2-3) is not prosperity theology — it is a description of a divine principle that operates at levels beyond the material. The 'makhraj' (way out) includes the material but also the emotional, the relational, and the spiritual: taqwa produces clarity of thought, protection from corrupted relationships, health of heart, and — sometimes — material provision from unexpected directions. The scholars' commentaries on 65:2-3 are full of stories of people who chose taqwa over material compromise and received provision from directions they could not have predicted." },
      ],
      questions: [
        { question: "How do I know if I have taqwa?", answer: "The scholars give several experiential signs: the heart is pained by sin — not the consequence but the act itself; the heart is reluctant to leave worship; the heart feels genuinely closer to Allah in private than in public; the heart is moved by the Quran; the person is careful about the small permissible things, not only the major sins. None of these is a perfect test — a person can fake them to themselves. But regular muhasaba (self-accounting) combined with sincere du'a for taqwa is the closest available method." },
        { question: "Is taqwa more about fear or love?", answer: "Both — and the scholars were careful to say that reducing taqwa to fear is a mistake. The word comes from the root 'to protect' — and one can protect something out of love as much as out of fear. The person who guards themselves from displeasing Allah because they love Allah and cannot bear to hurt that relationship is exhibiting taqwa rooted in mahabbah. The person who guards themselves because they fear the consequence is also exhibiting taqwa, rooted in khawf. The fullest taqwa has both: 'Call upon your Lord in khawf and tama'' (7:56)." },
        { question: "Can taqwa be lost?", answer: "Taqwa can be weakened and can be strengthened. It is weakened by sin, by the accumulation of the heedless, by bad company, by too much attachment to dunya. It is strengthened by the five prayers, by fasting (the Quran says fasting was prescribed 'so that you may have taqwa' — 2:183), by the company of the muttaqin, by knowledge, by regular dhikr. The muttaqi is not someone who reached taqwa and stopped — they are someone who maintains it through consistent effort." },
      ],
    },

    semanticField: [
      { slug: 'iman',    arabic: 'إِيمَان',  transliteration: 'Iman',    relationship: 'deepens', relationshipLabel: "Partner of — taqwa is iman in protective mode", description: "Taqwa and iman are paired constantly in the Quran. Iman is the conviction; taqwa is the conviction in action — the heart that believes (iman) and then guards itself based on that belief (taqwa). The muttaqi is always a mu'min; but not every mu'min has reached muttaqi-level consistency. Taqwa is iman maturing into constant practice." },
      { slug: 'ihsan',  arabic: 'إِحْسَان', transliteration: 'Ihsan',   relationship: 'deepens', relationshipLabel: "Expressed by — the muttaqi naturally tends toward ihsan", description: "Taqwa (the protective awareness of Allah) and ihsan (the excellence that flows from divine awareness) are deeply related: both emerge from muraqaba, the consciousness of being before Allah. Taqwa is the defensive dimension (protecting from what Allah dislikes); ihsan is the positive dimension (producing what Allah loves). Together they describe the complete person." },
      { slug: 'sabr',   arabic: 'صَبْر',    transliteration: 'Sabr',   relationship: 'deepens', relationshipLabel: "Sustained by — sabr maintains taqwa when it is hard", description: "Taqwa in difficulty requires sabr. When the temptation is present, when the haram path is easier, when the circumstances press toward compromise — it is sabr that sustains the taqwa. The Quran pairs taqwa and sabr repeatedly as the combination that opens divine mercy (3:200, 12:90). Taqwa without sabr breaks under pressure; sabr without taqwa has no direction." },
    ],

    scholarsSaid: [
      { scholar: "Ali ibn Abi Talib", text: "Taqwa is the fear of the Exalted, acting on the revelation, contentment with the little, and preparation for the day of departure.", source: "Cited in Ibn al-Qayyim, Al-Wabil al-Sayyib" },
      { scholar: 'Ibn al-Qayyim', text: "Taqwa is to make between yourself and what you fear — a wiqaya (protection). So taqwa of Allah is to make between yourself and what you fear of His wrath and punishment, a shield that protects you from them — and that shield is obedience to Him.", source: "Al-Fawa'id" },
      { scholar: 'Talq ibn Habib', text: "Taqwa is to act in obedience to Allah, upon light from Allah, hoping for the reward of Allah; and to leave disobedience to Allah, upon light from Allah, fearing the punishment of Allah.", source: "Cited in Ibn Rajab, Jami' al-Ulum" },
    ],

    hadith: [
      { ref: "Muslim", arabic: "التَّقْوَى هَاهُنَا", translation: "Taqwa is here [pointing to the chest three times].", note: "The Prophet ﷺ's most concentrated statement on the nature of taqwa — it is in the heart. The chest-pointing is meant to redirect from the visible to the invisible: the believer is not to judge taqwa by external markers but to attend to the heart's actual state. And it is repeated three times — emphasis upon emphasis." },
    ],

    acrossTransitions: `The concept of living in protective awareness of the divine appears across traditions, though the specificity and comprehensiveness of the Quranic taqwa framework is distinctive.

In Judaism, yirat Hashem (fear of God) is the closest parallel — the reverential awe that governs the Torah-observant life. The Psalmist says: "The fear of the LORD is the beginning of wisdom" (Psalm 111:10). Like taqwa, yirat Hashem is both emotional (reverential feeling) and practical (governing behavior). The rabbinic term for someone who lives in this quality is a yireh shamayim (fearer of heaven) — a term of high praise, parallel to the Quranic muttaqi.

In Buddhist ethics, hiri (moral conscience — shame at wrongdoing) and ottappa (moral dread — fear of consequences) together constitute what the Buddha called the 'guardians of the world.' They prevent moral collapse and maintain the ethical dimension of practice. This pair — inner shame and outward accountability — functions similarly to the dual motivation of taqwa: inner awareness of Allah (the ihsan dimension) and awareness of consequence (the khawf dimension).

In Stoic philosophy, the concept of living kata phusin (according to nature) and specifically according to the rational/divine principle (logos) — avoiding what reason condemns as bad and pursuing what reason affirms as good — is the Stoic form of protective ethical consciousness. The Stoic sage, like the muttaqi, is someone who has internalized a standard of conduct so deeply that their choices reflect it automatically. The difference: the Stoic standard is reason; the Quranic standard is the divine command (which includes and transcends reason).

What the Quran uniquely provides is the social consequentiality of taqwa: the muttaqi is honored before Allah (49:13), receives provision from unexpected sources (65:3), receives a way out of difficulty (65:2), and is the first audience of Quranic guidance (2:2). Taqwa is not merely a personal spiritual virtue — it determines one's orientation in the divine economy. The Quran makes taqwa the only currency that matters before Allah — and since Allah is the only Judge whose judgment is final, this makes taqwa the only currency that matters, period.`,

    relatedTerms: [
      { slug: 'iman',    transliteration: 'Iman',    term: 'إِيمَان'  },
      { slug: 'ihsan',   transliteration: 'Ihsan',   term: 'إِحْسَان' },
      { slug: 'sabr',    transliteration: 'Sabr',    term: 'صَبْر'    },
      { slug: 'khawf',   transliteration: 'Khawf',   term: 'خَوْف'    },
      { slug: 'ikhlas',  transliteration: 'Ikhlas',  term: 'إِخْلَاص' },
    ],

    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Begins with the Quran's first description of the muttaqin (2:2-5): those who believe in the unseen, establish prayer, spend from what they have been given, believe in what was revealed, and are certain of the hereafter. This opening portrait sets the standard against which every Quranic command in the surah is measured." },
      { slug: 'at-talaq', surahName: 'At-Talaq', note: "Contains the most concentrated sequence of taqwa's practical promises (65:2-5): making a way out, providing from the unexpected, making affairs easy, removing sins, and increasing rewards. Five blessings attached to taqwa in three verses — the Quran's most condensed account of what taqwa produces in this world and the next." },
    ],
  },

  rahmah: {
    slug: 'rahmah',
    term: 'رَحْمَة',
    transliteration: 'Rahmah',
    pronunciation: 'RAH-mah',
    category: 'Theology & Ethics',
    evocativeLine: "Mercy — the quality that precedes and encompasses all of Allah's other attributes.",
    hasFullEntry: true,

    summary: `Rahmah is mercy — but it is the word the Quran places first. Every surah (except At-Tawbah) opens with Bismillah al-Rahman al-Rahim: "In the name of Allah, the Rahman, the Rahim." Before any command is given, before any story is told, before any law is stated — Allah introduces Himself as the source of rahmah in two of its most intensive forms. Al-Rahman (the Most Merciful) is the intensified active participle, describing the vastness of the mercy. Al-Rahim (the Ever-Merciful) is the intensive adjective, describing its permanence. The scholars say: Allah chose to introduce Himself with mercy before anything else, and this choice is itself a statement about the character of the God the Quran reveals.

The root of rahmah is r–ḥ–m — the same root as rahim (womb). The scholars say this etymology is not accidental: the mercy of Allah toward His creation is like the mercy of a mother for the child in her womb — instinctive, unconditional, prior to any deed of the child. In fact, the famous hadith says: "Allah has more mercy toward His servants than a mother has toward her child." The maternal mercy is offered as the highest human analogy for the divine rahmah — and then exceeded. Whatever the most intensive human mercy looks like, Allah's rahmah is greater.

The Quran makes rahmah the framework within which all of Allah's other qualities operate. The divine wrath (ghadab) exists — the Quran is clear about that. The divine justice ('adl) is absolute. The divine punishment is real. But all of these exist within a larger context of rahmah. The famous hadith qudsi says: "My mercy precedes My wrath." The scholars derived from this that even the divine wrath is in service of a mercy — the wrath is the boundary that protects the community of the faithful, the correction that can return the sinner to the right path, the justice that vindicates the wronged on the Day when no human power can do so.`,

    root: {
      letters: 'ر–ح–م',
      transliteration: 'r–ḥ–m',
      meaning: 'Mercy, compassion, womb; to have mercy on',
      elaboration: "The root r–ḥ–m is one of the most important roots in the Arabic language and in the Quran. It gives rahmah (mercy), Rahman (the Most Merciful — divine name), Rahim (the Ever-Merciful — divine name and common noun), rahim (womb), and murhim (one who shows mercy). The connection between womb (rahim) and mercy (rahmah) is etymological and intentional: the scholars use it to illustrate the unconditional, generative quality of the divine mercy — it creates, nourishes, and sustains without precondition.",
    },

    occurrenceCount: 339,
    occurrenceNote: "The root r–ḥ–m appears approximately 339 times in the Quran — making it among the most frequent roots in the entire text. Al-Rahman and Al-Rahim together constitute 112 appearances through the basmala alone (once per surah). The Quran's saturation with rahmah is itself a statement about what the Quran is primarily communicating.",

    keyAyahs: [
      {
        ref: '7:156',
        arabic: 'وَرَحْمَتِى وَسِعَتْ كُلَّ شَىْءٍ',
        translation: 'My mercy encompasses all things.',
        note: "One of the most expansive statements about rahmah in the Quran. Not 'most things,' not 'the righteous' — all things. The scholars note that this encompassing quality means rahmah is the primary attribute through which creation exists: everything that exists is encompassed by divine mercy. The specific mercy for the believers in the next life is then differentiated from this general mercy — but the general mercy is all-encompassing.",
      },
      {
        ref: '6:12',
        arabic: 'كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ ٱلرَّحْمَةَ',
        translation: 'Your Lord has written rahmah upon Himself.',
        note: "Allah has committed Himself to mercy — 'written' it 'upon Himself' (ʿala nafsihi). The scholars say this is one of the most hope-giving verses in the Quran: Allah has voluntarily obligated Himself to mercy. This is not a limitation of His freedom; it is a description of His character — mercy is not imposed from outside but is what Allah has chosen to express as the primary mode of His relationship with His creation.",
      },
      {
        ref: '21:107',
        arabic: 'وَمَآ أَرْسَلْنَٰكَ إِلَّا رَحْمَةً لِّلْعَٰلَمِينَ',
        translation: 'And We did not send you except as a mercy to the worlds.',
        note: "The Prophet Muhammad ﷺ is himself described as rahmah — not merely as a messenger of rahmah but as its embodiment. The scholars derive from this that the Prophet's ﷺ life, character, teachings, and the religion he brought are all expressions of rahmah. To follow the Prophet ﷺ is to orient oneself toward the rahmah he embodies.",
      },
    ],

    practicalSection: {
      conditions: [
        { number: 1, title: 'Rahmah toward people opens rahmah from Allah', arabic: 'الرحمة بالخلق تستجلب رحمة الخالق', arabicTranslit: "al-raḥma bi-al-khalq tastajlib raḥmat al-khāliq", description: "The Prophet ﷺ said: 'Those who show mercy will be shown mercy by the Merciful. Show mercy to those on earth, and the One in the heavens will show mercy to you.' This creates the closest thing to a divine transaction available: rahmah toward creation is the fastest path to rahmah from the Creator. The person who is genuinely merciful in their relationships — with family, with those who wrong them, with animals, with the weak — is cultivating the most direct relationship with Al-Rahman." },
        { number: 2, title: "Never despair of Allah's rahmah", arabic: 'لا تقنط من رحمة الله', arabicTranslit: "lā taqnaṭ min raḥmat Allāh", description: "The Quran makes despair of Allah's mercy (qunut min rahmat Allah) a characteristic of the astray (15:56) — not a sign of seriousness but of misguidance. The Quran's great verse of mercy (39:53) is addressed to those who have transgressed greatly: 'Do not despair of the mercy of Allah.' The scholars say: the vastness of rahmah is specifically designed for those who feel most unworthy of it. The condition for receiving it is only turning." },
        { number: 3, title: 'Rahmah as an attribute to cultivate', arabic: 'التحلي بالرحمة', arabicTranslit: "al-taḥallī bi-al-raḥma", description: "The Sufi tradition teaches takhallaq bi-akhlaq Allah (adorning oneself with the character of Allah). Rahmah is among the most emphasized of these divine characters to adopt — because Allah has described it as encompassing all things and has commended it most frequently. The person who cultivates rahmah in themselves — toward family, toward enemies, toward animals, toward those who have no power — is doing something the tradition calls the most God-like of all human qualities." },
      ],
      stations: [
        { name: "Al-Rahman vs. Al-Rahim", description: "The scholars distinguished two forms of rahmah embedded in the two divine names. Al-Rahman (from the superlative form rahmaana) describes the vast, universal mercy that covers all of creation — the mercy that exists whether one believes or not, through which the sun shines and the rain falls on the righteous and the unrighteous. Al-Rahim (from the intensive adjective raheem) describes the specific, perpetual mercy toward the believers — especially in the next life. The first is like rain; the second is like the personal care of a physician. Both are rahmah; they operate at different levels." },
        { name: "The Prophet ﷺ as rahmah incarnate", description: "The verse 21:107 — 'We sent you only as rahmah to the worlds' — has been described by the scholars as the most precise definition of the Prophet's ﷺ mission. Everything he did was mercy: his patience with the ignorant, his forgiveness of enemies, his care for the weak and the slave and the child, his refusal to curse those who drove him from his home (instead praying for their guidance), his concern for his ummah until his final moments ('My ummah, my ummah'). To study the Prophet's ﷺ life is to study rahmah in embodied form." },
        { name: "Rahmah at the moment of death", description: "The scholars consistently teach that the believer should approach their own death with the conviction that the Most Merciful will meet them with mercy. The hadith: 'None of you should die except while having husn al-zann (good opinion) of Allah.' The final meeting, for the believer, is with Al-Rahman — and the scholars say this conviction, held in the final moments, is itself a form of worship and a form of rahmah: Allah gives the believer the capacity to die with hope." },
      ],
      questions: [
        { question: "Does Allah's rahmah mean everyone is forgiven?", answer: "The Quran does not teach universal salvation — it teaches a universal mercy that encompasses all things, within which judgment, accountability, and differentiated outcomes (jannah and jahannam) operate. The scholars say: rahmah encompasses all things in the sense that everything exists within the divine mercy; but the specific rahmah of forgiveness and paradise is for those who meet its conditions (iman, tawbah, right conduct). The door of rahmah is open to all; whether one enters is a matter of choice and condition." },
        { question: "How do I access Allah's rahmah?", answer: "The Quran and Sunnah give multiple routes: tawbah (returning to Allah sincerely — 'He is the Ever-Accepting of repentance, the Most Merciful' 2:37); du'a (calling upon Al-Rahman by His name — 'Call upon Allah or call upon Al-Rahman — whichever you call, to Him belong the best names' 17:110); showing mercy to creation ('those who show mercy will be shown mercy'); maintaining the community of believers (27:19 — 'admit me, by Your mercy, into your righteous servants'); and simply turning toward Allah, since His mercy is described as preceding His wrath." },
        { question: "Is rahmah the same as leniency — does it mean no punishment?", answer: "No — the scholars are explicit. The mercy of a just parent includes discipline; the mercy of a skilled physician includes painful treatment. Allah's rahmah encompasses His justice — the punishment of the wrongdoer, when it occurs, is also within the divine mercy: it is the mercy toward the wronged, and may even be a mercy toward the wrongdoer (the pain of this world's consequence being lighter than the pain of the next). The Quran does not present rahmah as softness that overrides other divine qualities — it presents rahmah as the comprehensive quality within which all divine qualities serve." },
      ],
    },

    semanticField: [
      { slug: 'tawbah',  arabic: 'تَوْبَة',  transliteration: 'Tawbah',  relationship: 'deepens', relationshipLabel: "Opens onto — tawbah is the door into rahmah", description: "The Quran repeatedly pairs tawbah with rahmah: 'And He is the Ever-Accepting of repentance, the Most Merciful' (2:37, 2:54, 2:128, 2:160). Tawbah is the human turning; rahmah is the divine reception. The scholars say: the turning is small; the reception is vast. What the human offers — a sincere turn of the heart — is met with the rahmah that encompasses all things." },
      { slug: 'raja',    arabic: 'رَجَاء',   transliteration: "Raja'",   relationship: 'deepens', relationshipLabel: "Object of — raja' reaches toward Allah's rahmah", description: "The specific quality of Allah that raja' (hope) most reaches toward is rahmah. The person who has raja' is hoping in the mercy of the Most Merciful. This gives raja' a specific object rather than a vague optimism. The scholars say: hope in Allah's rahmah is the most rational hope in existence — because His mercy is described as encompassing all things and preceding His wrath." },
      { slug: 'adl',     arabic: 'عَدْل',    transliteration: 'Adl',     relationship: 'parallels', relationshipLabel: "Paired with — justice and mercy together are the full divine character", description: "The scholars describe Allah's character as the combination of rahmah and 'adl (justice). Rahmah without 'adl would produce a universe with no moral seriousness, where nothing matters and no one is accountable. 'Adl without rahmah would produce a universe of relentless justice with no hope. The Quran's God is both — and the Day of Judgment expresses both simultaneously: the full accounting (justice) within the context of the vast mercy that has already been offered." },
    ],

    scholarsSaid: [
      { scholar: "Ibn al-Qayyim", text: "Rahmah is the first of the divine attributes mentioned in the Quran, and it is not accidental. Everything else — creation, command, judgment — flows from this original quality. The Rahman who created the world by mercy sustains it by mercy and will judge it by mercy — even the judgment is an expression of the mercy toward the oppressed.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Ghazali', text: "Among the most important of the divine names for the servant to know is Al-Rahman Al-Rahim — for these are what the servant calls upon in every state: in seeking provision, in seeking forgiveness, in seeking guidance, in seeking health. Every du'a that begins with 'Ya Rahman, Ya Rahim' is a du'a that calls upon the very quality that defined the divine relationship with creation from the beginning.", source: "Al-Maqsad al-Asna" },
    ],

    hadith: [
      { ref: "Bukhari & Muslim", arabic: "لَلَّهُ أَرْحَمُ بِعِبَادِهِ مِنْ هَذِهِ بِوَلَدِهَا", translation: "Allah is more merciful to His servants than this woman is to her child.", note: "When a woman was frantically searching for her child among captives and seized him to her chest nursing him, the Prophet ﷺ pointed to her and said this. The greatest human love — maternal love at its most intense — is the hadith's standard for comparison. And Allah's rahmah exceeds even that." },
      { ref: "Bukhari (Hadith Qudsi)", arabic: "إِنَّ رَحْمَتِي سَبَقَتْ غَضَبِي", translation: "Indeed, My mercy precedes My wrath.", note: "The most important hadith qudsi on rahmah — a divine first-person statement about the priority of mercy over wrath. This hadith is the foundation of the Islamic framework of hope: whatever the wrath, the mercy was first. The scholars say: the human's window of tawbah is open precisely because the mercy preceded the wrath, and it remains open until the moment the wrath becomes due." },
    ],

    acrossTransitions: `Divine mercy is perhaps the quality most universally attributed to God across religious traditions — but the specific weight and primacy given to it in the Quran is distinctive.

In Judaism, hesed (lovingkindness/steadfast love/mercy) is the central divine attribute of the Hebrew Bible, appearing more than 250 times. It describes God's covenant loyalty — the faithful, enduring mercy that remains with Israel despite their failures. The Psalms return to hesed constantly: "His hesed endures forever" is the refrain of Psalm 136, repeated 26 times. The Jewish concept of rachamim (mercy/compassion — from the same Semitic root as rahmah and rahim) is also central, particularly in the High Holy Day liturgy. The Avinu Malkeinu prayer ("Our Father, Our King") is a sustained appeal to divine mercy in the face of human unworthiness — structurally identical to the Quranic tawbah-rahmah relationship.

In Christianity, the concept of grace (charis in Greek, gratia in Latin) is the theological category closest to rahmah — the unmerited favor of God toward the undeserving. The Christian doctrine of grace holds that salvation comes entirely from divine favor, not human merit. Augustine, Calvin, and the Reformation tradition emphasized the absolute priority of divine grace over human effort. This is structurally parallel to the Quranic rahmah's priority over human worthiness — though the Islamic framework preserves a larger role for human choice and response.

In Buddhism, the concept of karuna (compassion) is among the four brahmaviharas (divine abodes) — the qualities of mind to be cultivated toward all beings. The bodhisattva ideal in Mahayana Buddhism is built on compassion: the bodhisattva delays their own liberation to remain in the world and assist all sentient beings. This is a form of rahmah expressed without a theistic framework — compassion as the highest aspiration of the awakened being.

What the Quran uniquely establishes is the primacy and self-commitment of divine rahmah. Allah has 'written rahmah upon Himself' (6:12) — a divine self-commitment that no theology of an angry God or a merely just God can account for. The Quran's opening — Bismillah al-Rahman al-Rahim — is the universe's first word: before creation is described, before law is given, before judgment is announced, there is rahmah. The scholars say this is the Quran's most consequential structural decision: rahmah first, always.`,

    relatedTerms: [
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
      { slug: 'raja',     transliteration: "Raja'",    term: 'رَجَاء'   },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'tawhid',   transliteration: 'Tawhid',   term: 'تَوْحِيد' },
      { slug: 'iman',     transliteration: 'Iman',     term: 'إِيمَان'  },
    ],

    goDeeper: [
      { slug: 'al-anam', surahName: "Al-An'am", note: "Contains 6:12 — 'Your Lord has written rahmah upon Himself' — one of the most hope-giving verses in the Quran. The surah is a sustained meditation on divine sovereignty and human accountability, with rahmah as the framework within which both operate. The verse's placement — in a surah about the consequences of rejecting divine guidance — makes the offer of mercy all the more striking." },
      { slug: 'al-anbiya', surahName: "Al-Anbiya'", note: "Contains 21:107 — 'We sent you only as rahmah to the worlds' — the definitive description of the Prophet ﷺ as the embodiment of divine mercy. The surah as a whole tells the stories of the prophets, and the final revelation of the Prophet ﷺ as rahmah is the culmination: all the prophets were sent with rahmah, and the last and greatest of them is rahmah in its fullest form." },
    ],
  },

  dhikr: {
    slug: 'dhikr',
    term: 'ذِكْر',
    transliteration: 'Dhikr',
    pronunciation: 'DHIKR',
    category: 'States of the Heart',
    evocativeLine: "The remembrance of Allah — the heart's breath, without which it suffocates.",
    hasFullEntry: true,
    summary: `Dhikr is the remembrance of Allah — perhaps the single most encompassing spiritual practice the Quran prescribes. Every act of worship is, in a sense, dhikr: salah is dhikr performed with the body, Quran recitation is dhikr performed with the tongue and heart, fasting is dhikr enacted through the discipline of the nafs. But dhikr in its specific sense is the active, intentional, frequent remembrance of Allah through verbal and mental acts: saying His names, reciting His praises, reflecting on His attributes, speaking words that orient the heart toward Him.

The Quran makes a statement about dhikr that is among the most frequently quoted verses in Islamic spiritual literature: "Verily, in the remembrance of Allah do hearts find rest" (13:28). Not in success, not in health, not in relationships, not in knowledge — in dhikr. The scholars say this verse identifies the only genuine cure for the restlessness that is the baseline condition of the human heart. The heart was made for Allah; everything it tries in place of Him leaves it hungry. Only dhikr — the return to the presence of its Maker — produces the stillness the heart has always been seeking.

The Quran also makes an extraordinary promise about dhikr that is unlike almost any other: "So remember Me — I will remember you" (2:152). Allah does not merely receive the servant's dhikr; He responds with His own dhikr. The hadith explains this: "Whoever mentions Me in himself, I mention him in Myself; and whoever mentions Me in a gathering, I mention him in a better gathering." This reciprocity makes dhikr not a one-sided act of devotion but a dialogue — the human's remembrance of Allah is met with Allah's remembrance of the human.`,
    root: { letters: 'ذ–ك–ر', transliteration: 'dh–k–r', meaning: 'To remember, to mention, to recall to mind', elaboration: "The root dh–k–r carries both meanings simultaneously: to remember (internal) and to mention (external). This dual meaning is embedded in the Quranic concept of dhikr: remembrance that is never only mental (it speaks) and speech that is never only verbal (it must come from a remembering heart). The word dhikr also means 'the Quran' in several Quranic uses — 'We have sent down the Dhikr and We will preserve it' (15:9)." },
    occurrenceCount: 292,
    occurrenceNote: "The root dh–k–r appears approximately 292 times in the Quran in the noun dhikr (remembrance/mention), the verb dhakara (to remember), the command udhkur (remember!), and the plural adhkar.",
    keyAyahs: [
      { ref: '13:28', arabic: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ', translation: 'Verily, in the remembrance of Allah do hearts find rest.', note: "The most quoted verse on dhikr — not a command but a statement of ontological fact: this is how hearts are made. The word tatma'inn (finds rest) is the same root as the nafs mutma'inna — the soul at peace. Dhikr is the path to the settled self." },
      { ref: '2:152', arabic: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ', translation: 'So remember Me — I will remember you. And be grateful to Me, and do not deny Me.', note: "The divine reciprocity of dhikr. The servant's remembrance is met with divine remembrance. The scholars say 'Allah's remembrance of the servant' means He mentions them to the angels, blesses them, and attends to their affairs." },
      { ref: '33:41-42', arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱذْكُرُوا۟ ٱللَّهَ ذِكْرًا كَثِيرًا', translation: 'O you who believe — remember Allah with frequent remembrance, and exalt Him morning and evening.', note: "Dhikran kathiran — 'frequent remembrance.' The scholars derived from this that dhikr has no prescribed maximum — 'frequent' means as much as possible, in all circumstances, not confined to specific times." },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Presence of heart is the condition that matters most', arabic: 'حضور القلب في الذكر', arabicTranslit: "ḥuḍūr al-qalb fī al-dhikr", description: "Dhikr without presence of heart (hudur al-qalb) is the body of dhikr without its spirit. The tongue moves; the heart is elsewhere. This is better than nothing — but it is not the dhikr the Quran speaks of. Before saying 'subhanAllah,' pause and mean it — consider the Glory of the One you are declaring. This moment of intention is what makes the syllables into dhikr." },
        { number: 2, title: 'Abundance and constancy', arabic: 'الكثرة والمداومة', arabicTranslit: "al-kathra wa-al-mudāwama", description: "The Quran commands dhikran kathiran — abundant, frequent remembrance. The Prophet ﷺ said dhikr is better than spending gold and silver and better than meeting the enemy. Anchor dhikr to activities — bismillah before every beginning, alhamdulillah after every blessing, subhanAllah at every wonder." },
        { number: 3, title: 'Dhikr as protection', arabic: 'الذكر حصن', arabicTranslit: "al-dhikr ḥiṣn", description: "The morning and evening adhkar function as armor: they enclose the day in divine remembrance and provide protection from Shaytan, anxiety, and heedlessness. The Prophet ﷺ described dhikr as the most reliable spiritual protection available — more durable than any single act of worship." },
      ],
      stations: [
        { name: "From tongue to heart to state", description: "The journey of dhikr has three stages. First the tongue: words repeated with attention though the heart is not yet moved. Then the heart: meanings enter, the heart is affected — tears may come, or stillness, or nearness. Then the state (hal): living in the awareness the dhikr expresses — genuinely surrounded by divine presence, genuinely feeling dependence and mercy. Most people live in the first stage; the goal is the third." },
        { name: "Gatherings of dhikr", description: "The hadith describes angels searching the earth for gatherings of dhikr — when they find one, they surround it to the sky. Allah asks them what His servants want; they say His mercy; He gives it. These gatherings — Quran circles, halaqs, dhikr sessions — are described as gardens of paradise on earth. The one who attends is forgiven even if they came for another purpose." },
        { name: "Dhikr in difficulty", description: "The Prophet ﷺ prescribed specific dhikr for specific difficulties. For anxiety: the du'a of Yunus from the belly of the whale, which the Prophet ﷺ said relieves any difficulty when said by a Muslim. For grief: 'Inna lillahi wa inna ilayhi raji'un' — immediately reframing loss as a loan recalled. Dhikr in difficulty is reorientation, not escapism." },
      ],
      questions: [
        { question: "What specific dhikr should I focus on?", answer: "Start with what the Prophet ﷺ practiced: the morning and evening adhkar (from Hisnul Muslim or similar collections), the four beloved words — subhanAllah, alhamdulillah, la ilaha illa Allah, Allahu Akbar — and Surah Al-Ikhlas, Al-Falaq, An-Nas each morning and evening. These are tested, transmitted, and attached to specific divine promises. Beyond these, any remembrance of Allah with presence of heart is dhikr." },
        { question: "Can dhikr be done silently?", answer: "Yes — the Quran praises silent dhikr specifically (7:205). The scholars say silent dhikr is closer to ikhlas, more constant, and more protected from ostentation. Both vocal and silent dhikr are valid; both have specific virtues. Silent dhikr can be maintained through activities that prohibit audible speech." },
        { question: "What is the difference between dhikr and du'a?", answer: "Du'a is asking; dhikr is remembering and praising. Du'a addresses Allah with requests; dhikr addresses Allah with recognition — of His greatness, names, and attributes. In practice they flow into each other: the heart that has spent time in remembrance finds asking comes more naturally and trustingly." },
      ],
    },
    semanticField: [
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: "Sustained by — dhikr maintains the awareness that makes tawakkul possible", description: "Tawakkul is sustained by dhikr — the constant remembrance that Allah is present, that He is Al-Razzaq, that all outcomes are in His hands. The heart that loses dhikr loses tawakkul with it: the sense of Allah's presence fades, and anxiety about provision and outcomes floods in." },
      { slug: 'shukr', arabic: 'شُكْر', transliteration: 'Shukr', relationship: 'deepens', relationshipLabel: "Companion of — dhikr and shukr are the two expressions of the aware heart", description: "Allah pairs them in 2:152: 'Remember Me — I will remember you. And be grateful to Me.' Dhikr and shukr together describe the heart that has recognized its relationship with Allah fully: remembrance (acknowledging who He is) and gratitude (acknowledging what He has given). They reinforce each other." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Dhikr is the spirit of all deeds, and if it is absent from them, they are like a body without a spirit. The secret of dhikr is the presence of the heart: without it, the tongue moves but the spirit of the remembrance is absent.", source: "Al-Wabil al-Sayyib" },
    ],
    hadith: [
      { ref: "Bukhari & Muslim", translation: "Whoever mentions Me in himself, I mention him in Myself. Whoever mentions Me in a gathering, I mention him in a better gathering.", note: "The divine reciprocity of dhikr — the human's remembrance of Allah is met with Allah's remembrance of the human. To be mentioned by Allah in a gathering of angels is the highest honor available to a human being in this life." },
    ],
    acrossTransitions: `The practice of remembrance as a spiritual discipline appears in every major tradition. Jewish liturgy surrounds every moment with blessings (berakhot) — "Blessed are You, Lord our God..." before eating, performing a commandment, seeing beauty. The Talmudic ideal of one hundred blessings per day is a practice of constant divine acknowledgment structurally identical to the Islamic adhkar.

In Christian contemplative tradition, "Pray without ceasing" (1 Thessalonians 5:17) is the Christian form of dhikr. The hesychast tradition of Eastern Orthodoxy developed the Jesus Prayer as a continuous interior prayer, often synchronized with breath — parallel to Islamic dhikr. In Hindu practice, japa — repetitive recitation of divine names or mantras — with the mala (prayer beads) mirrors the tasbih (prayer beads) of Islamic dhikr exactly.

What the Quran uniquely provides is the explicit divine promise of reciprocity: "Remember Me — I will remember you." No other tradition frames the practice of remembrance as a bilateral exchange in which the divine explicitly commits to the human's side of the transaction. This makes Quranic dhikr not merely discipline but dialogue.`,
    relatedTerms: [
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'shukr',    transliteration: 'Shukr',    term: 'شُكْر'    },
      { slug: 'nafs',     transliteration: 'Nafs',     term: 'نَفْس'    },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
    ],
    goDeeper: [
      { slug: 'ar-rad', surahName: "Ar-Ra'd", note: "Contains 13:28 — 'In the remembrance of Allah do hearts find rest' — the Quran's most definitive statement about what dhikr does to the heart." },
      { slug: 'al-ahzab', surahName: 'Al-Ahzab', note: "Contains the command to abundant dhikr (33:41-42). The surah addresses the community in crisis — and prescribes dhikr as the primary spiritual resource, revealing that remembrance is most needed precisely when circumstances most distract from it." },
    ],
  },

  zuhd: {
    slug: 'zuhd',
    term: 'زُهْد',
    transliteration: 'Zuhd',
    pronunciation: 'ZUHD',
    category: 'States of the Heart',
    evocativeLine: 'Detachment from the world — not hating it, but not being owned by it.',
    hasFullEntry: true,
    summary: `Zuhd is detachment from the world — the spiritual station of holding the dunya lightly, without either fleeing it or being captured by it. The word is often translated as "asceticism" but that carries the wrong connotation: asceticism suggests rejection and denial. Zuhd is a condition of the heart, not the hand: the zahid may be wealthy or poor; what defines them is that wealth or poverty moves through their hands without settling in their heart.

The most famous definition of zuhd in the tradition comes from Sufyan al-Thawri: "Zuhd in the world is the shortening of one's hopes, not the eating of dry food or wearing a robe." And the Prophet ﷺ's definition is even more precise: "Zuhd in the world is not prohibiting the lawful or wasting wealth — but it is that you are more confident in what is in Allah's hand than in what is in your own hand." Both definitions place zuhd in the relationship between the heart and the dunya, not in external behavior.

The Quran does not command poverty; it commands freedom from attachment. The Prophet ﷺ himself was not a hermit; he was a husband, a father, a community leader, a statesman. What characterized him was that neither wealth nor poverty affected his orientation toward Allah. This is the zuhd the Quran gestures toward with its repeated reminders that the dunya is mata' ghurur — the enjoyment of delusion — while the akhira is al-hayawan — the real life.`,
    root: { letters: 'ز–ه–د', transliteration: 'z–h–d', meaning: 'To be indifferent to something, to have no desire for it', elaboration: "The root z–h–d means to turn away from something without contempt — to regard it as beneath one's concern. This differs from hatred or rejection: the zahid does not hate the world; they simply find it uncompelling compared to what they have found in Allah. The word zahid (one with zuhd) appears in the Quran once — the merchants who sold Yusuf ﷺ 'regarded him with indifference' (zahidin), undervaluing the precious." },
    occurrenceCount: 5,
    occurrenceNote: "The root z–h–d appears rarely explicitly, but zuhd pervades the Quran through its frequent contrasting of dunya and akhira, descriptions of believers' indifference to worldly pleasures, and consistent reorientation toward the eternal.",
    keyAyahs: [
      { ref: '57:20', arabic: 'وَمَا ٱلْحَيَوٰةُ ٱلدُّنْيَآ إِلَّا مَتَٰعُ ٱلْغُرُورِ', translation: 'And the life of the world is nothing but the enjoyment of delusion.', note: "The Quran's most concentrated summary of the dunya's nature: temporary enjoyment that deludes. Not a condemnation of life's pleasures but a calibration: enjoy what you have, but know its true weight. The verse makes zuhd the epistemically correct response to the dunya." },
      { ref: '28:77', arabic: 'وَلَا تَنسَ نَصِيبَكَ مِنَ ٱلدُّنْيَا', translation: 'And do not forget your share of the world.', note: "This verse establishes the balance: zuhd does not mean neglecting worldly responsibilities or refusing provision. It means doing all of this while keeping the akhira as the primary orientation. Zuhd includes this world; it is not escape from it." },
      { ref: '93:4', arabic: 'وَلَلْءَاخِرَةُ خَيْرٌ لَّكَ مِنَ ٱلْأُولَىٰ', translation: 'And the next life is better for you than the first.', note: "Allah tells the Prophet ﷺ directly: the akhira is better. This is not consolation; it is information. Zuhd is built on this information — when you truly believe the akhira is better, holding the dunya lightly becomes not sacrifice but sanity." },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Zuhd is about the heart, not the hand", arabic: 'الزهد في القلب لا في اليد', arabicTranslit: "al-zuhd fī al-qalb lā fī al-yad", description: "Zuhd is a condition of the heart's attachment, not the hand's holdings. A wealthy person whose heart is detached from their wealth is a zahid; a poor person obsessed with gaining wealth is not. The test: if your wealth or status were suddenly taken, would your heart be shattered? The degree of devastation is the degree to which attachment had formed." },
        { number: 2, title: 'Shorten your hopes', arabic: 'قصر الأمل', arabicTranslit: "qaṣr al-amal", description: "Sufyan al-Thawri makes qasr al-amal (shortening of hopes) the essence of zuhd. Long hopes — planning decades ahead, assuming long life, building attachment to outcomes — tie the heart to the dunya. Shortened hopes — the awareness of death's proximity, treating each day as potentially the last — produce lightness of attachment. The Prophet ﷺ said: 'Be in the world as a stranger or a traveler.'" },
        { number: 3, title: "Prefer the akhira without neglecting the dunya", arabic: 'إيثار الآخرة مع عدم إهمال الدنيا', arabicTranslit: "īthār al-ākhira maʿ ʿadam ihmāl al-dunyā", description: "The Quran commands (28:77): 'do not forget your share of the world.' Work, earn, fulfill duties, raise family, contribute to community — but none of this is the goal. It is the means; the goal is Allah. The zahid does everything the non-zahid does; they do it with different orientation." },
      ],
      stations: [
        { name: "Three levels of zuhd", description: "The scholars identified three levels. The lowest: zuhd in the haram (obligatory for all). The middle: zuhd in the doubtful — the person of wara'. The highest: zuhd in the permissible that is not needed — voluntarily simplifying to make space for Allah. The Prophet ﷺ occupied the third: given the gifts of the world, he consistently chose the simpler path." },
        { name: "Zuhd as freedom", description: "The paradox: zuhd produces expansion, not contraction. Attachment to wealth, status, health, reputation enslaves the person — every threat to any of them is anxiety. The zahid is owned by none. They can lose wealth without being shattered, lose status without being humiliated. This is freedom the dunya cannot provide." },
      ],
      questions: [
        { question: "Should I give up my possessions to practice zuhd?", answer: "No — and the scholars were emphatic. Companions like Uthman and Abd al-Rahman ibn Awf were wealthy zahids — because their wealth passed through their hands in generosity without taking up residence in their hearts. The issue is not what you have; it is what has you." },
        { question: "Is zuhd compatible with ambition?", answer: "Ambition for the akhira IS zuhd. Even worldly ambition is acceptable if it is a means to a larger akhira goal — the entrepreneur who works hard to give more in charity, the scholar who seeks recognition so their teaching reaches more people. Dunya-engagement colored by akhira orientation is the zahid's way." },
      ],
    },
    semanticField: [
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens', relationshipLabel: "Companion of — zuhd and tawakkul together define the free heart", description: "Zuhd is detachment from the dunya; tawakkul is attachment to Allah as the true source. Together they describe the heart that is free: not attached to what it has (zuhd) and not anxious about what it needs (tawakkul)." },
      { slug: 'sabr', arabic: 'صَبْر', transliteration: 'Sabr', relationship: 'deepens', relationshipLabel: "Enabled by — zuhd makes sabr in loss possible", description: "When loss comes to the zahid, it does not devastate because the thing lost was never owned by the heart in the first place — only by the hand. Sabr in loss is easy when the heart was never attached." },
    ],
    scholarsSaid: [
      { scholar: 'Sufyan al-Thawri', text: "Zuhd in the world is the shortening of your hopes — not eating dry food or wearing a robe. For if your hopes were long, and death always felt far, your heart would never settle in the akhira.", source: "Cited in Ibn al-Qayyim, Madarij al-Salikin" },
      { scholar: "Ahmad ibn Hanbal", text: "Zuhd is of three types: abandoning the haram — the zuhd of the common people; abandoning excess in the permissible — the zuhd of the elite; and abandoning what distracts from Allah — the zuhd of the gnostics.", source: "Cited in Ibn Rajab, Jami' al-Ulum" },
    ],
    hadith: [
      { ref: "Tirmidhi", translation: "Be in the world as a stranger or a traveler.", note: "The traveler uses what is available but does not settle; they do not own the inn they sleep in; they keep moving toward their destination. Zuhd is traveling through the dunya, not settling in it." },
    ],
    acrossTransitions: `Detachment from the material world is universal across traditions. Christian monasticism's vow of poverty, Buddhist non-attachment (upekkha), Stoic apatheia — all reach toward something similar. The Islamic calibration is distinctive: the Prophet ﷺ prohibited monasticism (rahbaniyya) in his community. Islam's mainstream tradition rejected extreme renunciation — the Prophet ﷺ himself enjoyed permissible pleasures, laughed with his family, and appreciated beauty. He passed through the world without accumulating attachment.

What Islamic zuhd adds that Buddhism and Stoicism often lack is the positive alternative: you detach from the dunya not into emptiness but into the richness of Allah. The zahid is not empty; they are full — full of dhikr, full of orientation toward the akhira, full of the certainty that what is with Allah is more lasting and more real. This positive fullness distinguishes Islamic zuhd from Buddhist renunciation and Stoic apatheia.`,
    relatedTerms: [
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'sabr',     transliteration: 'Sabr',     term: 'صَبْر'    },
      { slug: 'rizq',     transliteration: 'Rizq',     term: 'رِزْق'    },
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص' },
    ],
    goDeeper: [
      { slug: 'al-hadid', surahName: 'Al-Hadid', note: "The richest Quranic surah on zuhd — describes the dunya as 'mata' al-ghurur' (57:20), commands not to grieve over what has escaped or exult over what has been given (57:23), and contrasts the temporary with the eternal." },
      { slug: 'ad-duha', surahName: 'Ad-Duha', note: "Contains 93:4 — 'The next life is better for you than the first' — revealed when the Prophet ﷺ was in difficulty. Not consolation but information: the akhira is objectively better. Zuhd is built on accepting this information." },
    ],
  },

  sidq: {
    slug: 'sidq',
    term: 'صِدْق',
    transliteration: 'Sidq',
    pronunciation: 'SIDQ',
    category: 'States of the Heart',
    evocativeLine: 'Truthfulness so complete that the inner and outer become one.',
    hasFullEntry: true,
    summary: `Sidq is truthfulness — the alignment of the inner and outer, the agreement between what is said and what is so. But sidq in the Quran is far more than not lying. It is a comprehensive quality of the self in which every dimension — intention, word, and deed — is aligned with reality, with Allah's will, and with itself. The person of sidq is called a siddiq (the intensified form — the one whose sidq is total), and the Quran reserves this highest form for the prophets' closest companions: the Quran calls Maryam ﷺ a siddiqah and places the siddiqun alongside the prophets, the martyrs, and the righteous (4:69).

The scholars of the heart gave sidq a remarkably expansive definition: truthfulness in speech (sidq al-qawl), truthfulness in intention (sidq al-niyya), truthfulness in one's spiritual states and claims (sidq al-hal), and truthfulness in one's deeds — that one's actions match one's words. The worst form of its violation — nifaq (hypocrisy) — is the exact inversion of sidq: claiming what one does not possess, performing what one does not intend.

The Prophet ﷺ described the moral chain reaction sidq produces: "Truthfulness leads to righteousness, and righteousness leads to paradise. A man continues to be truthful until he is written with Allah as a siddiq. And lying leads to wickedness, and wickedness leads to the fire." The chain is moral-ontological: your words shape your character, and your character shapes your destination.`,
    root: { letters: 'ص–د–ق', transliteration: 'ṣ–d–q', meaning: 'To be true, to verify, to confirm; truth, sincerity', elaboration: "The root ṣ–d–q gives sidq (truthfulness), sadaqa (charitable giving — related because charity confirms the truth of one's iman), siddiq (the perfectly truthful), and tasdiq (verification, affirmation). The connection between sadaqa and sidq is not accidental: spending in charity is the most convincing proof of iman — it confirms with action what the mouth claims." },
    occurrenceCount: 155,
    occurrenceNote: "The root ṣ–d–q appears approximately 155 times — the adjective sadiq (truthful), the noun sidq (truth), the intensified siddiq, and divine praise of truthfulness throughout.",
    keyAyahs: [
      { ref: '9:119', arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ وَكُونُوا۟ مَعَ ٱلصَّٰدِقِينَ', translation: 'O you who believe — have taqwa of Allah and be with the truthful.', note: "The command is not merely to be truthful but to be with the truthful — to take them as companions and community. Sidq is contagious: the person who spends time with the sadiqun finds their own sidq strengthened." },
      { ref: '4:69', arabic: 'فَأُو۟لَٰٓئِكَ مَعَ ٱلَّذِينَ أَنْعَمَ ٱللَّهُ عَلَيْهِم مِّنَ ٱلنَّبِيِّۦنَ وَٱلصِّدِّيقِينَ وَٱلشُّهَدَآءِ وَٱلصَّٰلِحِينَ', translation: 'They will be with those Allah has blessed: the prophets, the siddiqun, the martyrs, and the righteous.', note: "The siddiqun are placed second only to the prophets — above the martyrs who give their lives for Allah. This ranking reveals how seriously the tradition views total truthfulness." },
      { ref: '33:35', arabic: 'وَٱلصَّٰدِقِينَ وَٱلصَّٰدِقَٰتِ', translation: 'And the truthful men and the truthful women.', note: "Listed among the qualities of those for whom Allah has prepared forgiveness and great reward — with both genders explicitly named." },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Sidq in intention — the hardest dimension", arabic: 'صدق النية', arabicTranslit: "ṣidq al-niyya", description: "Before every act, the intention is genuinely for Allah — not partially for Allah and partially for other motives. Not deceiving oneself about why one is doing something. The person who tells others they pray for Allah while their true motivation is social belonging is not a sadiq in niyya. The nafs is expert at self-deception — sidq al-niyya is the hardest form precisely because the opponent is the self." },
        { number: 2, title: 'Let your word match your deed', arabic: 'مطابقة الظاهر للباطن', arabicTranslit: "muṭābaqat al-ẓāhir li-al-bāṭin", description: "The Quran asks: 'Why do you say what you do not do?' (61:2-3). If you make a promise, keep it. If you commit to being somewhere, be there. If you commit to a position, maintain it unless you transparently change it. The person whose word matches their deed has the most valuable thing a person can possess in community: trust." },
        { number: 3, title: 'Guard the tongue', arabic: 'صون اللسان', arabicTranslit: "ṣawn al-lisān", description: "Lying, exaggeration, backbiting, false praise, deceptive silence — all violations of sidq at the level of speech. The person of sidq speaks less and means more; does not speak what they do not know, does not claim what they do not possess, does not promise what they cannot deliver." },
      ],
      stations: [
        { name: "The siddiq as the prophetic companion", description: "Abu Bakr al-Siddiq received his title because of his immediate, unhesitating belief when the Prophet ﷺ told him of the Night Journey. 'I believe him' — without demanding proof, without negotiation. This is sidq in iman: the inner conviction so complete that it did not need to negotiate conditions before committing. The greatest of the companions is the one with the greatest sidq." },
        { name: "Sidq in the face of cost", description: "The test of sidq is not when truth is comfortable but when costly. The Quran praises the believers 'true to their covenant' (33:23) — some of them fulfilling it by death. This is the ultimate form: inner commitment so total that no external pressure — even death — can make the outer reality contradict it." },
      ],
      questions: [
        { question: "Are there permissible exceptions to sidq?", answer: "The scholars identified three situations the Prophet ﷺ permitted: reconciling between two people, between spouses to maintain love, and in war. These are not lies in the moral sense because the intention is to protect a greater truth. Outside of these three, the scholars were strict: sidq is required." },
        { question: "What if my inner state does not match what I am practicing?", answer: "Acknowledge the gap honestly — this acknowledgment itself is sidq. Then keep doing the deed. 'Whoever forces themselves to be patient, Allah will make them patient.' The practice of sidq creates the state of sidq over time — but it must begin with the honest acknowledgment that you are not yet there." },
      ],
    },
    semanticField: [
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: "Twin of — sidq and ikhlas together are the heart of worship", description: "Sidq (truthfulness) and ikhlas (sincerity) are the two most essential qualities of the inner life. Sidq is alignment between inner and outer; ikhlas is purification of the inner from any motivation besides Allah. Together they describe worship that is accepted: done for Allah alone and done with genuine inner correspondence." },
      { slug: 'tawbah', arabic: 'تَوْبَة', transliteration: 'Tawbah', relationship: 'deepens', relationshipLabel: "Completed by — real tawbah requires sidq", description: "Tawbah al-nasuha — sincere tawbah — requires sidq: the person's inner conviction must genuinely match the outer act of returning. A person who performs tawbah while inwardly planning to return to the sin has not made sidq; their tawbah is not nasuha." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Sidq is the spirit of ikhlas, and ikhlas is the spirit of deeds. Without sidq, no deed has any worth before Allah — even if it were to fill the earth.", source: "Al-Fawa'id" },
    ],
    hadith: [
      { ref: "Bukhari & Muslim", translation: "Truthfulness leads to righteousness, and righteousness leads to paradise. A man continues to be truthful until he is written with Allah as a siddiq. And lying leads to wickedness, and wickedness leads to the fire. A man continues to lie until he is written with Allah as a kadhdhab.", note: "The most important hadith on sidq — establishing that truthfulness is not merely a virtue but a trajectory: the person who consistently tells truth becomes a siddiq; the person who consistently lies becomes a kadhdhab. Character is built one word at a time." },
    ],
    acrossTransitions: `The virtue of truthfulness is universal. In Confucian ethics, zhengming (rectification of names) holds that things should be called what they truly are — a form of cosmic sidq. In Kantian ethics, the duty not to lie is absolute for Kant — reflecting the same conviction that lying corrupts the framework of moral action regardless of consequences. In indigenous wisdom traditions, the spoken word carries sacred power and careless speech is morally dangerous — paralleled by the hadith: "The servant speaks a word of the pleasure of Allah without thinking much of it, and Allah raises them by it in rank."

What the Quran uniquely provides is the socio-eschatological framing: the siddiq has a specific place in jannah — alongside the prophets, martyrs, and righteous. Truthfulness is not merely a social virtue but a quality that determines eternal station.`,
    relatedTerms: [
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص' },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'  },
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'  },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
    ],
    goDeeper: [
      { slug: 'at-tawbah', surahName: 'At-Tawbah', note: "Contains 9:119 — 'be with the truthful.' The surah distinguishes the sadiqun from those who claimed iman but whose inner state did not match — making it the Quran's most extended test-case of sidq vs. nifaq." },
    ],
  },

  hayaa: {
    slug: 'hayaa',
    term: 'حَيَاء',
    transliteration: "Hayaa'",
    pronunciation: "ha-YAA'",
    category: 'States of the Heart',
    evocativeLine: 'The modesty that guards — the eyes, the tongue, the heart, and the limbs.',
    hasFullEntry: true,
    summary: `Hayaa' is modesty or bashfulness — the quality that produces restraint, decorum, and a protective sense of shame in the presence of the divine and in the company of others. It is one of the most distinctive qualities praised in the Islamic tradition, described by the Prophet ﷺ as a branch of faith. But hayaa' is frequently misunderstood: it is not timidity, self-deprecation, or anxiety. The scholars distinguish sharply between hayaa' (praiseworthy, spiritually productive) and simple shyness (a psychological trait that can be good or harmful).

The Prophet ﷺ said: "If you have no hayaa', do whatever you will." This is not permission for licentiousness — it is a diagnosis. The person without hayaa' is the person from whom the internal governor that restrains harmful action has been removed. Hayaa' is the guardian: when present, certain actions become impossible — not because they are forbidden but because they are beneath the dignity of the person who has hayaa'. The person of hayaa' is not controlled by external enforcement — they are self-governing through an inner sense of what is fitting.

The Quran's most vivid portrayal of hayaa' is in the story of Musa ﷺ at the well of Madyan (28:25): the daughter of Shu'ayb ﷺ came to him "walking with hayaa'" to invite him to her father. Three words that the scholars wrote pages about: she was present, transactional, and purposeful — but present with hayaa'. Hayaa' is not hiding from the world; it is engaging with the world while maintaining one's dignity.`,
    root: { letters: 'ح–ي–ي / ح–ي–و', transliteration: 'ḥ–y–y / ḥ–y–w', meaning: 'Life; to be alive; modesty, bashfulness', elaboration: "The root of hayaa' is the same as hayah (life). The scholars say hayaa' is a sign of the life of the heart: the dead heart has no hayaa'; the living heart is sensitive to what is fitting. Hayaa' is the heart's aliveness expressed in its capacity for appropriate restraint. When the heart dies through persistent sin and heedlessness, hayaa' is one of the first qualities to depart." },
    occurrenceCount: 11,
    occurrenceNote: "The specific word hayaa' appears approximately 11 times in the Quran, but the quality pervades its descriptions of the believers, the prophets, and the model women.",
    keyAyahs: [
      { ref: '28:25', arabic: 'فَجَآءَتْهُ إِحْدَىٰهُمَا تَمْشِى عَلَى ٱسْتِحْيَآءٍ', translation: 'Then one of the two women came to him, walking with modesty.', note: "The Quran's most celebrated description of hayaa' in action. Three words that capture everything: the daughter did not absent herself from the interaction; she was present, transactional, purposeful — but present with hayaa'. Hayaa' is not hiding; it is engaging with dignity." },
      { ref: '2:26', arabic: 'إِنَّ ٱللَّهَ لَا يَسْتَحْىِۦٓ أَن يَضْرِبَ مَثَلًا', translation: 'Indeed, Allah does not feel bashful to strike a parable of a mosquito.', note: "The negation of hayaa' applied to Allah — He does not restrain Himself from stating a truth out of embarrassment. This usage reveals the concept: hayaa' is a feeling of restraint before something. For humans before Allah, such restraint is appropriate." },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Hayaa' before Allah — the primary form", arabic: 'الحياء من الله', arabicTranslit: "al-ḥayāʾ min Allāh", description: "The highest hayaa' is before Allah — the awareness of being seen by Him that makes certain actions impossible. 'If you knew how Allah watches you, you would not sin' is the essence of this. It is not fear of punishment: it is something closer to shame — the inability to do something disgraceful in the presence of someone you love and whose opinion matters infinitely." },
        { number: 2, title: "Hayaa' does not prevent necessary engagement", arabic: 'الحياء لا يمنع الواجب', arabicTranslit: "al-ḥayāʾ lā yamnaʿ al-wājib", description: "The scholars distinguish praiseworthy hayaa' from harmful bashfulness — the person who cannot speak necessary truth because of social awkwardness, cannot seek necessary knowledge because questions are embarrassing, cannot do what is right because they fear ridicule. The daughter of Shu'ayb walked to a man with hayaa' — she did not absent herself. Aisha asked the Prophet ﷺ about intimate matters with complete directness. Hayaa' refines engagement; it does not eliminate it." },
      ],
      stations: [
        { name: "Hayaa' and the departure of iman", description: "The Prophet ﷺ said: 'Hayaa' and iman are companions — when one departs, the other departs too.' The departure of hayaa' is followed by fuhsh (shamelessness) — which the Quran links to Shaytan. 'Shaytan commands you to obscenity and lewdness' (2:268). When hayaa' is lost, the internal governor is removed, and what was unthinkable becomes thinkable, then doable, then habitual." },
        { name: "The hayaa' of the Prophet ﷺ", description: "The Prophet ﷺ was described as having more hayaa' than a virgin woman in her private chamber — meaning his hayaa' was the model for all Muslims. This was not weakness: it was the most refined inner sensitivity to what was fitting before Allah and before people. The person of maximum hayaa' is the person of maximum dignity." },
      ],
      questions: [
        { question: "Is hayaa' only for women?", answer: "No — the tradition applies it equally to men and women. The Prophet ﷺ himself was described with the most intense hayaa'. The companions practiced it. Hayaa' is a quality of any person of dignity regardless of gender." },
        { question: "How do I cultivate hayaa' if I feel I have lost it?", answer: "Routes back: tawbah (returning from whatever caused its loss), company of those who have hayaa' (it is contagious), muraqaba (awareness of Allah's observation), reducing company of those without hayaa' (shamelessness is also contagious), and the adhkar that maintain divine presence. Hayaa' can be grown — it is not only given at birth." },
      ],
    },
    semanticField: [
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: "Companion of — hayaa' before Allah purifies ikhlas", description: "Hayaa' before Allah — the awareness of being seen by Him — is closely related to ikhlas: both involve living in Allah's observation. The person of hayaa' cannot perform for other audiences when they feel the weight of divine observation." },
      { slug: 'taqwa', arabic: 'تَقْوَى', transliteration: 'Taqwa', relationship: 'deepens', relationshipLabel: "Expression of — hayaa' is taqwa experienced as dignity", description: "Taqwa and hayaa' share the same root experience — awareness of being before Allah — but describe different dimensions of the response. Taqwa is the protective consciousness that avoids what angers Allah; hayaa' is the dignified consciousness that cannot bear to do what is beneath the standard of the One being observed." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Junayd', text: "Hayaa' is the seeing of blessings and shortcomings — from which is born a state called hayaa'. Whoever sees the blessings of Allah upon them and sees their own inadequacy in gratitude for them — from the combination of these two visions arises hayaa'.", source: "Cited in Al-Qushayri, Al-Risala" },
    ],
    hadith: [
      { ref: "Bukhari & Muslim", translation: "Hayaa' is a branch of faith.", note: "Placing hayaa' not as a social virtue but as a dimension of iman itself. The chain: iman produces hayaa', and hayaa' produces the behaviors that maintain iman. The departure of one is the departure of the other." },
    ],
    acrossTransitions: `In Confucian ethics, chi (shame) is one of the four beginnings of virtue in Mencius: the capacity to feel shame at wrong action is the seed of righteousness. Without this capacity, moral development is impossible. In classical Greek philosophy, aidos (reverence, shame) was considered a virtue — the appropriate sensitivity to what is fitting in the presence of gods and men. Plato's dialogues place aidos as a gift Zeus gave to humanity to make social life possible.

What the Quran adds is the divine source of hayaa': not before people or abstract social norms but before Allah. This gives hayaa' a stability that social shame cannot provide — social norms change, communities drift, what is considered shameful shifts. But hayaa' before Allah is anchored to something permanent. The person with hayaa' before Allah maintains it even without social enforcement — which is why it is a branch of iman rather than merely a social virtue.`,
    relatedTerms: [
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى'  },
      { slug: 'sidq',   transliteration: 'Sidq',   term: 'صِدْق'    },
    ],
    goDeeper: [
      { slug: 'al-qasas', surahName: 'Al-Qasas', note: "Contains 28:25 — the daughter of Shu'ayb walking with hayaa' — the Quran's most celebrated single depiction of hayaa' in practice." },
      { slug: 'an-nur', surahName: 'An-Nur', note: "The surah most associated with hayaa' in practice — containing commands on lowering the gaze, guarding the private parts, and maintaining the modesty that flows from hayaa'." },
    ],
  },

  tawadu: {
    slug: 'tawadu',
    term: 'تَوَاضُع',
    transliteration: "Tawadu'",
    pronunciation: "ta-WAA-du'",
    category: 'States of the Heart',
    evocativeLine: "Humility that knows where it stands — not self-deprecation but honest seeing.",
    hasFullEntry: true,
    summary: `Tawadu' is humility — knowing one's true place in the order of being, without either inflating or deflating it. The word comes from the root w–d–' which carries the sense of placing something in its proper position. Tawadu' is the act of placing oneself in one's actual position — not higher (kibr, arrogance) and not lower than truth requires. It is the accuracy of self-knowledge translated into how one holds oneself before Allah and before people.

The Quran does not use the word tawadu' very often, but its opposite — kibr (arrogance) — is one of the Quran's most condemned qualities. Kibr is the first sin: Iblis refused to prostrate to Adam, claiming superiority. Kibr is what destroyed Fir'awn: his claim of lordship was the ultimate arrogance. The Quran's consistent condemnation of kibr is simultaneously a sustained praise of tawadu' — because tawadu' is what kibr is not.

The paradox the scholars describe: tawadu' is the quality that elevates. The Prophet ﷺ said: "Whoever is humble for the sake of Allah, Allah will raise them." The one who lowers themselves before Allah is raised by Allah; the one who raises themselves above their station is brought low. Tawadu' is the deliberate emptying that makes room for the divine: the filled cup cannot receive more; the empty cup can be filled.`,
    root: { letters: 'و–ض–ع', transliteration: 'w–ḍ–ʿ', meaning: 'To place, to set down, to lower; humility, modesty', elaboration: "The root w–ḍ–ʿ gives mawdu' (placed, set down), wada'a (to place/put down), and tawadu' (the reflexive form — to lower oneself). The image is concrete: tawadu' is the act of putting yourself down — not in self-contempt but in accurate self-placement." },
    occurrenceCount: 12,
    occurrenceNote: "The root w–ḍ–ʿ appears approximately 12 times in contexts related to humility. The description of 'ibad al-Rahman (servants of the Most Merciful) in 25:63 — walking lightly — is among the Quran's most vivid portraits of tawadu' in action.",
    keyAyahs: [
      { ref: '25:63', arabic: 'وَعِبَادُ ٱلرَّحْمَٰنِ ٱلَّذِينَ يَمْشُونَ عَلَى ٱلْأَرْضِ هَوْنًا', translation: "And the servants of the Most Merciful are those who walk upon the earth lightly.", note: "The Quran's portrait of the 'ibad al-Rahman begins with their walk — hawna (lightly, with humility). Before a single religious deed is mentioned, their fundamental posture in the world is described. They carry themselves with tawadu': they do not swagger, do not take up space that is not theirs." },
      { ref: '17:37', arabic: 'وَلَا تَمْشِ فِى ٱلْأَرْضِ مَرَحًا ۖ إِنَّكَ لَن تَخْرِقَ ٱلْأَرْضَ وَلَن تَبْلُغَ ٱلْجِبَالَ طُولًا', translation: 'And do not walk upon the earth exultantly. Indeed, you will never tear the earth apart, and you will never reach the mountains in height.', note: "One of the most memorable arguments against kibr: the strutting person is trying to be bigger than the earth and taller than the mountains — and will never succeed. The argument is not moral but ontological: arrogance is factually mistaken. Tawadu' is the realistic assessment." },
      { ref: '26:215', arabic: 'وَٱخْفِضْ جَنَاحَكَ لِمَنِ ٱتَّبَعَكَ مِنَ ٱلْمُؤْمِنِينَ', translation: 'And lower your wing [in humility] for those who follow you of the believers.', note: "The image of 'lowering the wing' — a bird protecting its young. The Prophet ﷺ is commanded to lower himself for the believers. Tawadu' is particularly obligatory for those in authority: the more elevated, the more tawadu' is required." },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Tawadu' is not self-abasement", arabic: 'التواضع ليس ذلاً', arabicTranslit: "al-tawāḍuʿ laysa dhullan", description: "The scholars distinguish tawadu' from dhill (abasement before those who should not be obeyed) — humbling oneself before the wealthy to gain favor, or before the oppressor to avoid harm. True tawadu' is lowering oneself before Allah, before the believers, before knowledge. Never lowering oneself in ways that compromise the religion or one's dignity before Allah." },
        { number: 2, title: "Tawadu' in using one's gifts", arabic: 'التواضع مع النعم', arabicTranslit: "al-tawāḍuʿ maʿa al-niʿam", description: "Tawadu' is most tested when one has gifts — knowledge, beauty, wealth, skill, status. Knowing that the gift is from Allah, that others have gifts one does not have, that the gift can be taken, and using the gift in service rather than display. The scholar whose tawadu' increases with their knowledge is the model." },
        { number: 3, title: "Tawadu' with all people, not only superiors", arabic: 'التواضع مع الجميع', arabicTranslit: "al-tawāḍuʿ maʿa al-jamīʿ", description: "The Prophet ﷺ sat with the poor and the slave as naturally as with chieftains; refused to have people stand for him; did not sit on a raised platform. This comprehensiveness — toward all people including those society considers beneath one — is tawadu's most demanding dimension." },
      ],
      stations: [
        { name: "The raising that follows tawadu'", description: "The Prophet ﷺ said: 'Whoever humbles himself for Allah, Allah will raise him.' The raising is not always worldly elevation (though sometimes); it is the spiritual raising of being in Allah's regard, the raising of spiritual station. The most spiritually elevated people in the tradition are consistently described as the most humble." },
        { name: "Tawadu' in knowledge", description: "The scholars particularly emphasized tawadu' in knowledge, because knowledge produces the most socially dangerous kibr — the arrogance of the one who knows. Abu Hanifah said: 'The one who does not know should not be ashamed to say I do not know — it is half of knowledge.' The scholar who can say 'I don't know' has tawadu'." },
      ],
      questions: [
        { question: "How do I know if kibr is hiding beneath apparent tawadu'?", answer: "Diagnostic questions: Do you feel irritation when someone does not acknowledge your contributions? Do you resist being corrected in public? Do you find it difficult to take advice from those you consider beneath you? These are signs of kibr beneath surface tawadu'. The cure: deliberately seek the lower seat, the less recognized role, the opportunity to serve without credit — until the irritation at being unrecognized diminishes." },
        { question: "Is it possible to be too humble?", answer: "Yes — when tawadu' crosses into self-abasement that compromises dignity or religious duty. Tawadu' should not extend to demeaning oneself before the oppressor, abandoning one's rights, or allowing injustice in the name of humility. The Prophet ﷺ was humble but also spoke truth to power and claimed his rights. Tawadu' is compatible with dignity; not with self-erasure." },
      ],
    },
    semanticField: [
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens', relationshipLabel: "Root of — tawadu' before Allah is ikhlas in posture", description: "The person of true ikhlas cannot have kibr — ikhlas means the deed is for Allah alone, and kibr is placing oneself above the standard set by Allah. Genuine sincerity naturally produces genuine humility." },
      { slug: 'sidq', arabic: 'صِدْق', transliteration: 'Sidq', relationship: 'deepens', relationshipLabel: "Expression of — tawadu' is sidq about one's place in creation", description: "Sidq (truthfulness) applied to the self produces tawadu': the honest person who sees accurately where they stand — dependent on Allah, imperfect, undeserving of the gifts given — cannot maintain the fiction of self-sufficiency that kibr requires." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Tawadu' is the fruit of knowledge of Allah and of the self — when the servant knows who Allah is and who they are, tawadu' is the natural result. Kibr is the product of ignorance — not of worldly matters but of the self and its Lord.", source: "Madarij al-Salikin" },
    ],
    hadith: [
      { ref: "Muslim", translation: "Whoever humbles himself for Allah, Allah will raise him. And whoever is arrogant, Allah will bring him low.", note: "The spiritual law of tawadu' and kibr — stated as a divine promise. The raising is primarily in spiritual station: being in Allah's regard, which is the only elevation that endures." },
    ],
    acrossTransitions: `Humility is praised universally. Christian thought considers humilitas the queen of virtues — particularly in Augustinian and Benedictine traditions. Augustine wrote: "The way to Christ is first humility, second humility, third humility." The Rule of St. Benedict identifies twelve steps of humility as the ladder of spiritual ascent. Buddhist non-arrogance (amada) is developed through the insight into anatta (non-self): if there is no permanent self, there is nothing to be arrogant about. In Confucian thought, qian (modesty) is the virtue that draws good fortune — the person who knows their limitations is in alignment with the natural order.

What Islamic tawadu' adds is the dynamic of reciprocity with Allah: "Whoever humbles himself for Allah, Allah will raise him." This is not merely a psychological observation but a theological commitment — Allah Himself is the agent of the raising. The humility is directed toward a Person who responds to it.`,
    relatedTerms: [
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
      { slug: 'sidq',   transliteration: 'Sidq',   term: 'صِدْق'    },
      { slug: 'hayaa',  transliteration: "Hayaa'", term: 'حَيَاء'   },
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى'  },
    ],
    goDeeper: [
      { slug: 'al-furqan', surahName: 'Al-Furqan', note: "Contains 25:63 — the 'ibad al-Rahman walking lightly — the Quran's most famous portrait of tawadu' in practice. The surah's extended character description (25:63-76) builds from the walk of humility through dhikr, prayer, generosity, and the akhira." },
      { slug: 'al-isra', surahName: "Al-Isra'", note: "Contains 17:37 — the prohibition against walking with arrogance. The argument against kibr from the absurdity of the arrogant person's implicit claim is one of the Quran's most elegant rhetorical moments." },
    ],
  },

  wara: {
    slug: 'wara',
    term: 'وَرَع',
    transliteration: "Wara'",
    pronunciation: 'WAH-rah',
    category: 'States of the Heart' as const,
    evocativeLine: 'Scrupulous caution — leaving even the doubtful for fear of the forbidden.',
    hasFullEntry: true,
    summary: `Wara' is the virtue of the careful soul — the one who, when they reach the edge of the permitted, steps back rather than forward. It is not the avoidance of the haram alone; it is the avoidance of whatever might lead to the haram, whatever blurs the line, whatever trains the self to push limits. The Prophet ﷺ described it as "leaving what does not concern you."

The scholars placed wara' among the highest stations of the heart, above zuhd in some classifications, because zuhd concerns the world while wara' concerns the self — it is an internal calibration of sensitivity to what displeases Allah. Ibn al-Qayyim wrote that the person of wara' treats their heart as a guest house: they do not let in what they cannot vouch for.

Wara' produces a quality of life that is simpler, quieter, and more deliberate. The wari' person asks "should I?" before asking "can I?" They carry fewer things because they screen more carefully at the door. The result is a lightness — not the lightness of those who don't care, but of those who care enough to let go.`,
    root: {
      letters: 'و–ر–ع',
      transliteration: 'w–r–ʿ',
      meaning: 'To restrain, hold back, be cautious',
      elaboration: "The root carries the sense of a barrier or restraint — something that holds the self back from overstepping. Related forms include wari' (the one who practices wara'), mawri' (a place of caution or difficulty). The verbal form wara'a means to be cautious, to refrain, to be pious through self-restraint. The noun wara' thus names both the act and the quality of one who habitually holds themselves back from doubtful things.",
    },
    occurrenceCount: 0,
    occurrenceNote: "Wara' as a technical term does not appear in the Quran directly, but its conceptual foundation is in 2:187 (the limits of Allah — 'do not approach them'), 5:90-91 (avoiding what leads to harm), and especially in 2:188 (consuming wealth wrongfully — even if technically permitted). The prophetic tradition is the primary source for wara' as a formal virtue.",
    keyAyahs: [
      {
        ref: '2:187',
        arabic: 'تِلْكَ حُدُودُ اللَّهِ فَلَا تَقْرَبُوهَا',
        translation: 'These are the limits of Allah, so do not approach them.',
        note: "The command is not merely 'do not cross' but 'do not approach' — creating a buffer zone. This is the Quranic logic of wara': the law draws a line, but wara' steps back from the line itself.",
      },
      {
        ref: '6:120',
        arabic: 'وَذَرُوا ظَاهِرَ الْإِثْمِ وَبَاطِنَهُ',
        translation: 'And leave the outward sin and the inward.',
        note: "Wara' is precisely this — not just the external compliance but the inner vigilance. The verse commands both dimensions simultaneously.",
      },
      {
        ref: '49:12',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ',
        translation: 'O you who believe, avoid much suspicion.',
        note: "The command to 'avoid much' — not all suspicion, but 'much' — reflects the wara' consciousness: the scrupulous person avoids even the excess of neutral things, not just the clearly harmful.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Knowledge of the halal and haram', arabic: 'معرفة الحلال والحرام', arabicTranslit: "maʿrifat al-ḥalāl wa-l-ḥarām", description: "Wara' requires knowing what is permitted and forbidden — you cannot avoid the doubtful without knowing where the clear lines are. The ignorant person's caution is just anxiety; the knowledgeable person's caution is wara'." },
        { number: 2, title: 'Sensitivity to the heart', arabic: 'حساسية القلب', arabicTranslit: 'ḥasāsiyyat al-qalb', description: "The Prophet ﷺ said: 'Seek a fatwa from your heart.' Wara' requires that you have cultivated a heart sensitive enough to feel discomfort at the doubtful. If the heart is hardened, it no longer gives reliable readings." },
        { number: 3, title: 'Willingness to leave benefit', arabic: 'ترك المنفعة احتياطاً', arabicTranslit: 'tark al-manfaʿa iḥtiyāṭan', description: "True wara' sometimes means leaving what is technically permissible because of how it affects the heart or leads toward the doubtful. This requires preferring safety over benefit — a form of zuhd applied inward." },
      ],
      stations: [
        { name: "Wara' of the obligatory", description: "The beginning: performing all that is wajib and leaving all that is haram. This is the foundation." },
        { name: "Wara' of the makruh", description: "Avoiding what is disliked even without prohibition — because the disliked thing trains the self toward the prohibited." },
        { name: "Wara' of the doubtful", description: "The classical wara' proper — leaving the mushtabih (doubtful) out of caution, as the Prophet ﷺ commanded: 'Leave what makes you doubt for what does not make you doubt.'" },
        { name: "Wara' of the permissible", description: "The highest station — leaving permissible things that distract the heart from Allah, waste time, or train the self in habits of indulgence. This is the wara' of the awliya'." },
      ],
      questions: [
        { question: "What am I reaching for that I know is not quite right — even if I can technically justify it?", answer: "The heart knows before the tongue justifies. The discomfort that appears before the argument is the voice of wara'." },
        { question: "When I feel the discomfort the Prophet ﷺ described, do I listen to it or override it?", answer: "The override is usually not a decision — it is a habit of not pausing. Wara' builds the pause into the moment of impulse." },
        { question: "Is my caution about Allah's pleasure, or is it just anxiety about consequences?", answer: "Fear of consequences without love produces rigidity. Wara' rooted in love of Allah produces discernment — a different quality entirely." },
      ],
    },
    semanticField: [
      { slug: 'taqwa',  arabic: 'تَقْوَى',  transliteration: 'Taqwa',  relationship: 'parallels',      relationshipLabel: 'The broader frame', description: "Taqwa is the consciousness of Allah that generates wara'. Wara' is taqwa applied to the fine-grained level of daily choices." },
      { slug: 'zuhd',   arabic: 'زُهْد',    transliteration: 'Zuhd',   relationship: 'parallels',      relationshipLabel: 'Related detachment', description: "Zuhd is detachment from what is permissible for the sake of the heart. Wara' is caution about what might not be permissible. They overlap in the higher stations where the permitted itself becomes subject to scrutiny." },
      { slug: 'ikhlas', arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens',        relationshipLabel: 'The motive', description: "Wara' practiced for show is not wara' at all. Ikhlas is what keeps the scrupulousness directed toward Allah rather than toward reputation." },
      { slug: 'sidq',   arabic: 'صِدْق',    transliteration: 'Sidq',   relationship: 'parallels',      relationshipLabel: 'Truthfulness with self', description: "Wara' requires sidq — the willingness to be honest with yourself about what your heart is actually doing. The person who practices wara' cannot afford self-deception." },
    ],
    scholarsSaid: [
      { scholar: 'Sufyan al-Thawri', text: "I have not seen anything easier than wara' — leave what makes you doubt.", source: "Reported in Hilyat al-Awliya" },
      { scholar: 'Ibn al-Qayyim', text: "Wara' is the abandonment of everything that might harm you in the Hereafter.", source: "Madarij al-Salikin" },
      { scholar: 'Ahmad ibn Hanbal', text: "The foundation of this matter — the beginning of it and the end — is wara'. For when the servant is scrupulous in his religion, he is saved from most evils.", source: "Reported by Ibn Rajab" },
    ],
    hadith: [
      { ref: 'Tirmidhi', translation: "Part of the excellence of a person's Islam is leaving what does not concern him.", note: "This hadith is considered one of the foundational texts of wara'. 'What does not concern you' covers doubtful matters, excessive speech, unnecessary involvement — all the territory wara' guards." },
      { ref: 'Bukhari & Muslim', translation: "The halal is clear, the haram is clear, and between them are doubtful matters that many people do not know about. Whoever avoids the doubtful has protected his religion and his honor. And whoever falls into the doubtful falls into the haram, like a shepherd who grazes near a sanctuary — he is likely to enter it.", note: "The foundational hadith for the doctrine of wara'. The 'sanctuary' metaphor is precise: the haram is not a cliff you fall off, but a boundary that proximity itself threatens." },
    ],
    acrossTransitions: `The concept of scrupulosity — heightened moral sensitivity to the boundary between permitted and forbidden — appears across traditions. In Jewish law, lifnim mishurat hadin means "beyond the letter of the law" — the rabbis praised those who acted more stringently than required. The Talmudic concept of geder (a fence around the Torah) is structurally identical to wara': you do not just obey the law, you create distance from its violation.

In Christian monastic tradition, the Desert Fathers taught nepsis — watchfulness, sobriety of soul, vigilance about what enters the heart. Evagrius Ponticus described this as vigilance against logismoi (troubling thoughts) before they become sins. The logic is identical to Islamic wara': the battle is won or lost before the actual transgression.

What is distinctive in the Islamic tradition is the hadith-based precision: the Prophet ﷺ gave specific criteria (what creates doubt in the chest), a specific standard (leave it), and a specific reward (protection of religion and honor). This grounds wara' in practical discernment rather than general anxiousness.`,
    relatedTerms: [
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'   },
      { slug: 'zuhd',     transliteration: 'Zuhd',     term: 'زُهْد'     },
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص'  },
      { slug: 'muhasaba', transliteration: 'Muhasaba', term: 'مُحَاسَبَة' },
    ],
    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains 2:168-188 — the passages on permitted and forbidden food and the command not to approach the limits of Allah. The structure of this passage (eat what is good, avoid what is evil, do not approach the limits) maps perfectly onto the three levels of wara'." },
      { slug: 'al-anam',    surahName: "Al-An'am",    note: "Contains the most detailed Quranic treatment of halal/haram in food (6:118-121, 6:145), including 6:120: 'leave the outward sin and the inward.' The inward dimension is the domain of wara'." },
    ],
  },

  qanah: {
    slug: 'qanah',
    term: 'قَنَاعَة',
    transliteration: "Qana'ah",
    pronunciation: "qa-NAA-'ah",
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: "Contentment with what Allah has given — the richness that needs no addition.",
    hasFullEntry: true,
    summary: `Qana'ah is the virtue of the satisfied soul — not satisfied because it has everything it wants, but because it has reoriented what it wants. The person of qana'ah looks at their provision and sees sufficiency; the person without it looks at the same provision and sees lack. The difference is not in the provision but in the heart's relationship to it.

The Prophet ﷺ called qana'ah "a treasure that does not run out." This is precise: worldly wealth is exhaustible, but the sense of sufficiency is renewable. The person who has trained their heart to be content carries their wealth internally — it cannot be taken, cannot be lost in the market, cannot be inflated away. It is the one truly portable asset.

Qana'ah is not passivity or the abandonment of striving. The person of qana'ah still works, still seeks sustenance, still has goals. But they hold the outcomes loosely — they strive without being enslaved to the result. The work is done for Allah; the provision comes from Allah; and what comes is enough.`,
    root: {
      letters: 'ق–ن–ع',
      transliteration: 'q–n–ʿ',
      meaning: 'To be satisfied, to be content, to suffice',
      elaboration: "The root q-n-' carries the sense of receiving what is given and being satisfied with it. Related forms include qani' (one who is content, who does not beg), and iqtana' (to acquire/possess). The opposite is hirs (greed, excessive desire) and tama' (covetousness).",
    },
    occurrenceCount: 1,
    occurrenceNote: "The root q-n-' appears in 22:36 (qani' and mu'tarr — the content and the one who asks). While qana'ah as a technical spiritual term comes primarily from hadith and scholarly tradition, the Quran's teaching on rizq and tawakkul is its Quranic foundation.",
    keyAyahs: [
      {
        ref: '20:131',
        arabic: 'وَلَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ',
        translation: 'And do not extend your eyes toward what We have given some of them to enjoy of worldly life.',
        note: "Allah commands even the Prophet ﷺ not to look longingly at what others have been given. The phrase 'extend your eyes' is visceral — the eyes reaching out, straining toward what is not yours. Qana'ah is the spiritual posture that keeps the eyes resting at home.",
      },
      {
        ref: '94:7-8',
        arabic: 'فَإِذَا فَرَغْتَ فَانصَبْ ۝ وَإِلَىٰ رَبِّكَ فَارْغَب',
        translation: 'So when you have finished, strive again. And to your Lord direct your longing.',
        note: "The Quran redirects human longing (raghbah) from the world to Allah. This is the inner mechanism of qana'ah: not the suppression of desire, but its redirection. The heart still longs — but toward the right object.",
      },
      {
        ref: '16:97',
        arabic: 'فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً',
        translation: 'We will surely cause him to live a good life.',
        note: "The 'good life' promised to the righteous believer — classical scholars identified this hayah tayyibah as qana'ah: a contentment that transforms ordinary circumstances into sufficiency.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Belief in divine wisdom in provision', arabic: 'الإيمان بحكمة الله في الرزق', arabicTranslit: "al-īmān bi-ḥikmat Allāh fi-l-rizq", description: "Qana'ah is grounded in the conviction that Allah distributes provision with wisdom — that the amount you received is not arbitrary. Without this, contentment is just suppression of desire." },
        { number: 2, title: 'Gratitude for what is present', arabic: 'الشكر على الموجود', arabicTranslit: 'al-shukr ʿalā al-mawjūd', description: "The person of qana'ah actively practices shukr — naming and appreciating what they have. Gratitude prevents the heart from calculating what it lacks." },
        { number: 3, title: 'Guarding the eyes', arabic: 'غض البصر عن الدنيا', arabicTranslit: 'ghaḍḍ al-baṣar ʿan al-dunyā', description: "Qana'ah requires controlling what you look at and dwell on. The Prophet ﷺ commanded looking at those below you in worldly things — not those above you — for exactly this reason." },
      ],
      stations: [
        { name: "Qana'ah from necessity", description: "Accepting what you have because you have no choice. This is patience, not yet qana'ah." },
        { name: "Qana'ah through effort", description: "Training yourself to be satisfied — actively redirecting comparisons, practicing gratitude. The beginning of the virtue." },
        { name: "Qana'ah by nature", description: "The station of the advanced: the heart naturally settles at what it has, without effort, without comparison, without longing for what is not there. This is the 'treasure that does not run out.'" },
      ],
      questions: [
        { question: "What am I looking at that makes my own provision feel insufficient?", answer: "The Quran's answer is direct: stop looking. The eyes train the heart. What you look at longingly, you begin to need." },
        { question: "If my circumstances did not change at all, could I be at peace?", answer: "If not — the disquiet is not in the circumstances but in the heart. Qana'ah treats the source rather than the symptom." },
        { question: "Am I striving for more because it will genuinely serve Allah, or because I cannot be still with what I have?", answer: "Both striving and stillness are valid. The question is which is driving — the soul oriented to Allah, or restlessness oriented to the world." },
      ],
    },
    semanticField: [
      { slug: 'shukr',    arabic: 'شُكْر',   transliteration: 'Shukr',    relationship: 'deepens',        relationshipLabel: "The expression of qana'ah", description: "Qana'ah produces shukr — the content heart naturally gives thanks. Without shukr, qana'ah is merely passive acceptance; with it, it becomes an active blessing." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'parallels',      relationshipLabel: 'Trust in provision', description: "Tawakkul trusts that Allah will provide; qana'ah accepts what He provides. They are forward and backward looking dimensions of the same trust in Allah's wisdom over rizq." },
      { slug: 'zuhd',     arabic: 'زُهْد',   transliteration: 'Zuhd',     relationship: 'parallels',      relationshipLabel: 'Detachment', description: "Zuhd is detachment from the world; qana'ah is contentment with what is given within it. They overlap: the zahid needs qana'ah, and the content person has begun the journey of zuhd." },
      { slug: 'sabr',     arabic: 'صَبْر',   transliteration: 'Sabr',     relationship: 'precedes',       relationshipLabel: 'The training ground', description: "Sabr in hardship is the training that builds qana'ah. The person who has practiced patience with difficulty gradually discovers that their needs are fewer than they thought." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Qana'ah is wealth, and its fruit is ease of living. Whoever is given qana'ah has been given a treasure that does not diminish and a wealth that does not run out.", source: "Madarij al-Salikin" },
      { scholar: "Ali ibn Abi Talib", text: "Qana'ah is a wealth that does not run out.", source: 'Reported in various collections' },
      { scholar: 'Al-Muhasibi', text: "Know that contentment is not the abandonment of seeking, but the abandonment of complaint about what is given and the abandonment of longing for what is withheld.", source: "Al-Ri'ayah" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "Richness is not having many possessions, but richness is contentment of the soul (ghina al-nafs).", note: "The Prophet ﷺ relocates wealth entirely from the external to the internal. Ghina al-nafs — soul-wealth — is qana'ah. A person with a million dollars and an unsatisfied soul is poor; a person with little and a satisfied soul is rich." },
      { ref: 'Tirmidhi', translation: "Be content with what Allah has distributed for you and you will be the richest of people.", note: "The command is active acceptance — satisfaction with the decree. This is qana'ah in imperative form." },
    ],
    acrossTransitions: `Contentment as a virtue appears in every major tradition, often as the culminating achievement of the spiritual life. The Stoics called it autarkeia (self-sufficiency) — the sage who needs nothing external to be at peace. Epictetus, himself a former slave, taught that everything external is "not up to us"; qana'ah is the Islamic parallel, though grounded in divine sovereignty rather than Stoic reason.

In Buddhist thought, santuṭṭhi (contentment) is a foundational virtue — the recognition that craving (taṇhā) is the source of suffering. Reducing wanting reduces suffering. The Buddhist logic is psychological; the Islamic logic adds a layer: the provision that comes is from Allah and is exactly what He chose. Contentment is not just wise, it is a form of trust in a Giver.

In the Jewish tradition, the daily prayer formula "dayenu" — it would have been enough — embeds qana'ah into liturgy. Each gift recounted in the Passover Seder is sufficient on its own. This structure of gratitude for incremental gifts rather than the final total is the practice of qana'ah made communal.`,
    relatedTerms: [
      { slug: 'shukr',    transliteration: 'Shukr',    term: 'شُكْر'    },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'zuhd',     transliteration: 'Zuhd',     term: 'زُهْد'    },
      { slug: 'rizq',     transliteration: 'Rizq',     term: 'رِزْق'    },
    ],
    goDeeper: [
      { slug: 'ta-ha',   surahName: 'Ta-Ha',   note: "Contains 20:131 — the command not to extend the eyes toward worldly enjoyment given to others. This is the Quranic portrait of qana'ah as a posture of the eyes and the heart." },
      { slug: 'al-duha', surahName: 'Al-Duha', note: "The surah's closing promise — 'your Lord will give you, and you will be satisfied' (93:5) — promises satisfaction (tarda) as the ultimate gift. Qana'ah is the orientation that prepares the heart to receive it." },
    ],
  },

  muraqaba: {
    slug: 'muraqaba',
    term: 'مُرَاقَبَة',
    transliteration: 'Muraqaba',
    pronunciation: 'mu-RAA-qa-bah',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'The awareness of being watched — living as though you can see Allah, knowing He sees you.',
    hasFullEntry: true,
    summary: `Muraqaba is the station of the heart that remains continuously aware of Allah's gaze. The word comes from raqaba — to watch, to observe, to guard. Allah is Al-Raqib: the Ever-Watchful. Muraqaba is the servant's reciprocal response — not matching Allah's watch, which is impossible, but acknowledging it, orienting toward it, living in its light.

The Prophet ﷺ described ihsan as "worshipping Allah as though you see Him — and if you do not see Him, knowing He sees you." Muraqaba is this second dimension: even when the heart cannot achieve the vivid presence of seeing Allah, it knows that it is seen. This knowing is not a threat but an intimacy — the awareness of being permanently, attentively regarded by the One who loves the servant more than they can conceive.

Al-Ghazali described muraqaba as the foundation of all spiritual progress: the person who truly knows they are watched changes everything — their speech, their thoughts, their private moments. Not from fear alone, but from the natural modesty of one who is never alone. The most powerful test of muraqaba is what happens in private: does the servant's behavior change when no human eye can see?`,
    root: {
      letters: 'ر–ق–ب',
      transliteration: 'r–q–b',
      meaning: 'To watch, guard, observe closely, be on the lookout',
      elaboration: 'The root r-q-b refers to the heightened, sustained attention of one who watches — a sentinel, a guard. Al-Raqib is one of the Names of Allah (33:52; 5:117): the Ever-Watchful who observes every movement of every creation. Muraqaba is the verbal noun of the third form (raaqaba), meaning to watch mutually — in human-divine relation, it is the awareness of being watched and orienting toward that fact.',
    },
    occurrenceCount: 5,
    occurrenceNote: "The root r-q-b appears in the Quran as one of Allah's Names (Al-Raqib — 33:52, 5:117), as the watching of deeds (50:18: 'a watcher is ready'), and in the context of covenant-keeping (4:1: 'Allah is ever-watchful over you'). The cumulative effect builds the theology on which muraqaba rests.",
    keyAyahs: [
      {
        ref: '50:18',
        arabic: 'مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ',
        translation: 'Not a word does he utter but there is a watcher by him, ready.',
        note: "The verse is visceral: every word has an already-present, already-ready witness. Not a witness who records it after; a watcher who is there before. Muraqaba is the internalization of this reality until the servant feels it.",
      },
      {
        ref: '4:1',
        arabic: 'إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
        translation: 'Indeed, Allah is ever-watching over you.',
        note: "Used here in the context of family ties — Allah watches how you treat relatives. Muraqaba is not an abstract spiritual exercise but a practical awareness that governs every relationship.",
      },
      {
        ref: '58:7',
        arabic: 'مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ',
        translation: 'There is no private conversation of three but He is the fourth of them.',
        note: "This verse demolishes the concept of 'private' in the absolute sense. No gathering, no whispered secret, no closed-door meeting is unwitnessed. Muraqaba is the response to this cosmic reality.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Knowledge of Allah's Names", arabic: "معرفة أسماء الله الحسنى", arabicTranslit: "maʿrifat asmāʾ Allāh al-ḥusnā", description: "Muraqaba is built on knowing Al-Raqib, Al-'Alim, Al-Khabir, Al-Basir — the Names that affirm Allah's total awareness. Without this theological foundation, muraqaba is just self-consciousness." },
        { number: 2, title: 'Continuity of remembrance', arabic: 'ديمومة الذكر', arabicTranslit: "dawāmat al-dhikr", description: "Muraqaba requires dhikr — the repeated return to consciousness of Allah. Without regular dhikr, the awareness fades. Muraqaba is not a one-time realization but a sustained orientation." },
        { number: 3, title: 'Accountability of private moments', arabic: 'محاسبة الخلوات', arabicTranslit: 'muḥāsabat al-khalawāt', description: "The test is privacy: does the servant's behavior change when no human can see? The growing alignment of private and public behavior is the measure of muraqaba's depth." },
      ],
      stations: [
        { name: 'Muraqaba in action', description: "The beginning: remembering Allah's gaze while performing outward acts. The prayer is done correctly because He sees." },
        { name: 'Muraqaba in speech', description: "Extending the awareness to words: every statement is made as if reported directly. The liar cannot sustain this." },
        { name: 'Muraqaba in thought', description: "The advanced station: guarding the thoughts themselves, knowing that Allah sees not just the act and the word but the intention behind both. 'Allah knows what the hearts conceal' (3:119)." },
        { name: 'Muraqaba as presence', description: "The highest station: not monitoring oneself for violations, but simply resting in the awareness of Allah's presence — the orientation of ihsan. The servant lives in a permanent sense of being with Allah." },
      ],
      questions: [
        { question: "Would I do this if I could see Allah watching? Since I cannot see Him but He sees me — what changes?", answer: "The gap between 'what I do when watched' and 'what I do in private' is the measure of how much muraqaba has taken root." },
        { question: "In my most private moments — my thoughts, my internet use, my speech when no one is listening — am I the same person I am in public?", answer: "Muraqaba does not aim for performance in public but for integrity in private. Consistency is the sign of genuine awareness." },
        { question: "Is my muraqaba based on fear of being caught, or on the intimacy of being known?", answer: "Fear produces compliance; love produces presence. The mature muraqaba is not surveillance anxiety but the warmth of never being alone." },
      ],
    },
    semanticField: [
      { slug: 'ihsan',    arabic: 'إِحْسَان',    transliteration: 'Ihsan',    relationship: 'deepens',   relationshipLabel: "Muraqaba's fruit", description: "Ihsan is 'worshipping Allah as though you see Him.' Muraqaba is the beginning of this — the awareness that He sees you, even when you cannot achieve the vivid presence of seeing Him." },
      { slug: 'taqwa',    arabic: 'تَقْوَى',    transliteration: 'Taqwa',    relationship: 'parallels', relationshipLabel: 'Consciousness of Allah', description: "Taqwa is the protective consciousness of Allah; muraqaba is the watchfulness of His gaze. They are twin orientations — taqwa acts, muraqaba attends." },
      { slug: 'muhasaba', arabic: 'مُحَاسَبَة', transliteration: 'Muhasaba', relationship: 'deepens',   relationshipLabel: 'The daily review', description: "Muhasaba is the accounting that follows muraqaba: after living under Allah's gaze all day, the evening review asks what that gaze saw. They are daily companions." },
      { slug: 'ikhlas',   arabic: 'إِخْلَاص',   transliteration: 'Ikhlas',   relationship: 'parallels', relationshipLabel: 'The intention layer', description: "Muraqaba purifies action through awareness; ikhlas purifies action through intention. Together they produce the action that is both sincere and watched — the action of the muhsin." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Junayd', text: "Muraqaba is that you know in every moment that Allah knows what you are doing.", source: "Al-Risalah al-Qushayriyyah" },
      { scholar: 'Al-Ghazali', text: "Picture yourself standing before Allah in every state — that He sees your outward and your inward, your movement and your stillness, and He is witness to your secret and your open acts.", source: "Ihya' Ulum al-Din" },
      { scholar: 'Ibn al-Qayyim', text: "Muraqaba is the heart's knowledge — certain and continuous — that Allah sees it and is aware of it. When this knowledge is confirmed in the heart, it produces hayaa', muhasaba, and the abandonment of all that is displeasing to Him.", source: "Madarij al-Salikin" },
    ],
    hadith: [
      { ref: 'Muslim (Hadith of Jibril)', translation: "He said: 'Tell me about ihsan.' He said: 'It is that you worship Allah as though you see Him. For even if you do not see Him, He sees you.'", note: "The second clause — 'He sees you' — is the definition of muraqaba. The first — 'as though you see Him' — is its highest expression. Muraqaba is the gateway to ihsan: you begin with being seen, and in time the heart opens to see." },
    ],
    acrossTransitions: `The practice of living in the awareness of divine witnessing is universal across traditions. In Christian mysticism, Brother Lawrence's "practicing the presence of God" is structurally identical to muraqaba: a continuous, moment-to-moment awareness of divine regard that transforms ordinary activity into worship.

In Jewish tradition, the Talmudic principle: "Know what is above you: an eye that sees, an ear that hears, and all your deeds are recorded" (Avot 2:1). This awareness is muraqaba embedded in ethical instruction.

In Buddhist practice, sati (mindfulness) is an awareness of what one is doing, saying, and thinking in each moment. The difference is the object: Buddhist sati is awareness of the self's experience; Islamic muraqaba is awareness of being known by Allah. The form is similar; the relationship is different — the Muslim is not alone in the awareness.`,
    relatedTerms: [
      { slug: 'ihsan',    transliteration: 'Ihsan',    term: 'إِحْسَان'   },
      { slug: 'muhasaba', transliteration: 'Muhasaba', term: 'مُحَاسَبَة' },
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'    },
      { slug: 'hayaa',    transliteration: "Hayaa'",   term: 'حَيَاء'     },
    ],
    goDeeper: [
      { slug: 'qaf',         surahName: 'Qaf',         note: "Surah Qaf is the surah of comprehensive witness: 50:16 ('closer to him than his jugular vein'), 50:17-18 (the two recording angels), 50:18 ('not a word but a watcher is ready'). Read it slowly and feel watched." },
      { slug: 'al-mujadila', surahName: 'Al-Mujadila', note: "Contains 58:7 — Allah is the fourth in every private conversation of three. The surah opens with a woman's private complaint heard by Allah, showing that even the most intimate conversations are received." },
    ],
  },

  muhasaba: {
    slug: 'muhasaba',
    term: 'مُحَاسَبَة',
    transliteration: 'Muhasaba',
    pronunciation: 'mu-HAA-sa-bah',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'The daily accounting of the self — before you are called to account.',
    hasFullEntry: true,
    summary: `Muhasaba is the practice of holding yourself to account before you are held to account. It is the evening review, the mid-day pause, the honest look in the mirror before another day begins. The word comes from hisab — accounting, reckoning — the same word used for the Day of Judgment. Muhasaba is the servant's self-administered version of that reckoning, conducted daily so that the final one is easier.

Umar ibn al-Khattab's famous instruction captures it precisely: "Take account of yourselves before you are taken to account, and weigh yourselves before you are weighed." The person who conducts a daily muhasaba is not surprised on the Day of Reckoning — they have been rehearsing it, refining it, correcting the ledger in real time.

Al-Muhasibi — whose very name derives from this practice — built an entire tradition around muhasaba as the foundational spiritual discipline. His insight: most people know their faults in the abstract but never sit with them in the particular. Muhasaba forces the particular. Not "I sometimes get angry" but "today, at Dhuhr, when my brother said X, I responded with Y, and the real reason was Z." This specificity is where transformation lives.`,
    root: {
      letters: 'ح–س–ب',
      transliteration: 'ḥ–s–b',
      meaning: 'To count, reckon, account, consider sufficient',
      elaboration: "The root h-s-b is one of the richest in Arabic. Hisab is accounting; hasib is the reckoner; hasbuna Allah is 'Allah is sufficient for us.' Muhasaba (third form) means a mutual accounting — the self holds itself to account, and what emerges settles the balance between what was intended and what was done.",
    },
    occurrenceCount: 37,
    occurrenceNote: "The root h-s-b appears 37 times in the Quran, primarily in the context of divine reckoning (hisab on the Day of Judgment). The concept of muhasaba as a daily self-practice is derived from the prophetic tradition, but the Quranic emphasis on Allah's hisab provides its urgency.",
    keyAyahs: [
      {
        ref: '59:18',
        arabic: 'وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ',
        translation: 'And let every soul look to what it has sent ahead for tomorrow.',
        note: "This is the Quranic mandate for muhasaba. The command is to 'look' — not just feel vaguely, but actually examine what has been sent forward. The 'tomorrow' is the Day of Judgment, but the looking is now.",
      },
      {
        ref: '84:8',
        arabic: 'فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا',
        translation: 'He will be given an easy accounting.',
        note: "The scholars identified this 'ease' with the practice of muhasaba in this life — the one who accounts themselves daily comes to the final accounting already mostly settled.",
      },
      {
        ref: '2:284',
        arabic: 'وَإِن تُبْدُوا مَا فِي أَنفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُم بِهِ اللَّهُ',
        translation: 'Whether you disclose what is in yourselves or conceal it, Allah will call you to account for it.',
        note: "Muhasaba extends to the inner life — intentions, thoughts, the contents of the nafs. This verse makes the accounting comprehensive: not just deeds, but what is inside.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Honesty before Allah', arabic: 'الصدق مع الله', arabicTranslit: 'al-ṣidq maʿa Allāh', description: "Muhasaba requires radical honesty — naming what you actually did, thought, and intended, not what you wish you had done. Self-deception defeats the entire practice." },
        { number: 2, title: 'Specificity', arabic: 'التفصيل والتحديد', arabicTranslit: 'al-tafṣīl wa-l-taḥdīd', description: "General self-assessment ('I could be better') does not produce change. Muhasaba requires specific incidents, specific words, specific moments — and specific assessment of the intention behind each." },
        { number: 3, title: 'Regularity', arabic: 'المداومة', arabicTranslit: 'al-mudāwama', description: "Al-Ghazali recommended three separate daily audits: before action (plan), during action (monitor), and after action (review). Even once daily — at night — is transformative if practiced consistently." },
      ],
      stations: [
        { name: 'Muhasaba of obligations', description: 'The starting point: did I fulfill what was required? Did I pray? Was there something fard I missed or did incompletely?' },
        { name: 'Muhasaba of speech', description: 'What did I say today? Was it true? Was it useful? Was there backbiting, argumentation, hurtful words?' },
        { name: 'Muhasaba of intention', description: "The deeper level: in what I did and said, what was my actual motive? Was it for Allah, for reputation, for self-interest? Where did riya' (showing off) enter?" },
        { name: 'Muhasaba of the heart', description: "The most advanced: what states did the heart move through today? When was it present with Allah? When did it drift? Where did envy, resentment, or pride arise — and was it noticed or suppressed?" },
      ],
      questions: [
        { question: "At the end of today: what was the best thing I did? What was the worst? What should I have done differently?", answer: "The point is not guilt but recalibration. The evening review that finds the error and corrects course is the practice; condemnation without correction is not muhasaba." },
        { question: "When I examine today's intentions honestly — were they for Allah or for me?", answer: "Ikhlas is the standard muhasaba applies. The question is not whether the action was good but whether it was done for the right reason." },
        { question: "What would today's accounting look like if presented to me on the Day of Judgment?", answer: "This question makes muhasaba urgent without being paralytic. It is not terror but clarity — the clarity of seeing your day as it actually was." },
      ],
    },
    semanticField: [
      { slug: 'muraqaba', arabic: 'مُرَاقَبَة', transliteration: 'Muraqaba', relationship: 'precedes',  relationshipLabel: 'The awareness muhasaba reviews', description: "Muraqaba is the live awareness of being watched; muhasaba is the evening review of what that gaze saw. They are the morning intention and the evening reckoning." },
      { slug: 'tawbah',   arabic: 'تَوْبَة',    transliteration: 'Tawbah',   relationship: 'deepens',   relationshipLabel: "Muhasaba's necessary outcome", description: "Muhasaba that does not lead to tawbah is incomplete. The accounting that finds fault must then return to Allah — otherwise it becomes self-flagellation, not spiritual growth." },
      { slug: 'ikhlas',   arabic: 'إِخْلَاص',   transliteration: 'Ikhlas',   relationship: 'deepens',   relationshipLabel: 'The intention audit', description: "The most important function of muhasaba is examining the sincerity of intentions. Without ikhlas as the standard, muhasaba has no measure to apply." },
      { slug: 'wara',     arabic: 'وَرَع',       transliteration: "Wara'",    relationship: 'parallels', relationshipLabel: 'Pre-emptive and retrospective caution', description: "Wara' is pre-emptive caution before the act; muhasaba is retrospective accounting after it. They guard the entirety of action together." },
    ],
    scholarsSaid: [
      { scholar: "Umar ibn al-Khattab", text: "Take account of yourselves before you are taken to account, and weigh yourselves before you are weighed. For it is easier for you to take account of yourselves today than to be taken to account tomorrow.", source: 'Reported by al-Tirmidhi and Ibn al-Mubarak' },
      { scholar: 'Al-Muhasibi', text: "The beginning of all good is your knowledge of your own soul — for the one who does not know his soul does not know his Lord.", source: "Al-Ri'ayah li-Huquq Allah" },
      { scholar: 'Ibn al-Qayyim', text: "The intelligent person takes account of himself and works for what comes after death. The incapable person follows his desires and then hopes in Allah.", source: "Madarij al-Salikin" },
    ],
    hadith: [
      { ref: "Tirmidhi", translation: "The intelligent person is he who takes account of himself and works for what comes after death.", note: "The Prophet ﷺ defines intelligence as self-accounting plus preparation. This connects muhasaba directly to 'aql — rational capacity properly oriented toward what matters." },
    ],
    acrossTransitions: `Self-examination is a practice present in virtually every serious spiritual tradition. The Stoics practiced the daily evening review — Marcus Aurelius' Meditations are essentially published muhasaba journals. Seneca wrote: "I examine my entire day and go back over what I've done and said, hiding nothing from myself, passing nothing by."

In the Christian tradition, the Ignatian Examen is a structured daily prayer of five steps: gratitude, review, feelings, forgiveness, renewal. Jesuit spiritual directors consider it more important than any other single spiritual practice. The emphasis on feelings and failures as the raw material of spiritual growth closely parallels muhasaba's attention to the inner life.

The Jewish practice of cheshbon ha-nefesh (accounting of the soul) is a formal mussar tradition. Rabbi Yisrael Salanter built elaborate systems of daily self-examination — a direct structural parallel to the tradition of Al-Muhasibi twelve centuries earlier.`,
    relatedTerms: [
      { slug: 'muraqaba', transliteration: 'Muraqaba', term: 'مُرَاقَبَة' },
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'    },
      { slug: 'ikhlas',   transliteration: 'Ikhlas',   term: 'إِخْلَاص'   },
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'    },
    ],
    goDeeper: [
      { slug: 'al-hashr',    surahName: 'Al-Hashr',    note: "Contains 59:18 — the command to 'look to what it has sent ahead for tomorrow.' This is the Quranic muhasaba verse: active, forward-looking, specific. The surah's context — reflecting on the fate of those expelled — makes the urgency concrete." },
      { slug: 'al-inshiqaq', surahName: 'Al-Inshiqaq', note: "Contains 84:8 — the 'easy accounting.' The surah's imagery of the sky splitting and earth stretched flat creates the cosmic setting for the hisab that muhasaba prepares for." },
    ],
  },

  inabah: {
    slug: 'inabah',
    term: 'إِنَابَة',
    transliteration: 'Inabah',
    pronunciation: 'i-NAA-bah',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'Turning to Allah with the whole soul — more urgent and total than tawbah.',
    hasFullEntry: true,
    summary: `Inabah is the total turning of the soul toward Allah — more than tawbah (repentance), more than ruju' (return), more than rida' (acceptance). It is the word for the person who does not just return after going away, but who orients their entire being toward Allah as the permanent direction of existence. The munib (one who practices inabah) is not someone who has arrived once; they are someone who keeps arriving, keeps turning, keeps choosing Allah.

The Quran uses inabah exclusively in contexts of the deepest spiritual seriousness: the prophets turning to Allah in their trials, the believers who will be saved on the Day of Judgment, the quality Allah commands in 39:54 before He closes the door. Inabah is what it looks like when a person has truly understood what Allah is and what they are — and responds with everything they have.

Ibn al-Qayyim placed inabah above tawbah in his ranking of the stations: tawbah responds to sin; inabah responds to separation — to any gap between the heart and Allah, even without a specific violation. The munib person does not wait for a crisis to turn; they live in a continuous orientation toward Allah, like a compass that always finds north.`,
    root: {
      letters: 'ن–و–ب',
      transliteration: 'n–w–b',
      meaning: 'To return, to come back repeatedly, to be a substitute or representative',
      elaboration: "The root n-w-b carries the sense of returning and also of deputizing — the na'ib is a deputy. Inabah (fourth form) means a repeated, thorough returning. Awwab (which Allah uses to describe His prophets) comes from the same root and means one who constantly returns to Allah. The munib is one who is perpetually turned toward Allah — not just once but as the ongoing direction of the soul.",
    },
    occurrenceCount: 8,
    occurrenceNote: "Inabah and its forms appear approximately 8 times in the Quran, always in elevated spiritual contexts: Sulayman's turning to Allah after his trial (38:34), Ibrahim's quality (11:75), the quality of those who receive admonition (50:33), and the direct command in 39:54.",
    keyAyahs: [
      {
        ref: '39:54',
        arabic: 'وَأَنِيبُوا إِلَىٰ رَبِّكُمْ وَأَسْلِمُوا لَهُ مِن قَبْلِ أَن يَأْتِيَكُمُ الْعَذَابُ',
        translation: 'And return to your Lord and submit to Him before the punishment comes to you.',
        note: "The command is urgent — 'before the punishment comes.' This verse comes just after the famous ayah promising that Allah's mercy encompasses all things (39:53). Inabah is the appropriate response to knowing that mercy: turn toward it with everything.",
      },
      {
        ref: '50:33',
        arabic: 'مَنْ خَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ وَجَاءَ بِقَلْبٍ مُّنِيبٍ',
        translation: 'Whoever feared the Most Merciful unseen and came with a heart turning in devotion.',
        note: "The people of Jannah are described as having a heart that is munib. The munib heart is the qualification for paradise — not a perfect heart, but a returning one.",
      },
      {
        ref: '11:88',
        arabic: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
        translation: 'My success is not but through Allah. Upon Him I have relied, and to Him I return.',
        note: "The Prophet Shu'ayb's declaration — tawakkul and inabah together as his complete orientation. 'Ilayhi unib' — 'to Him I return' — present tense, ongoing, directional.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Awareness of separation', arabic: 'الشعور بالبُعد', arabicTranslit: "al-shuʿūr bi-l-buʿd", description: "Inabah begins with feeling the gap — noticing that the heart has drifted, that the connection to Allah has gone quiet. This awareness is itself a gift: the heart that cannot feel its own distance is in greater danger." },
        { number: 2, title: 'Totality of turning', arabic: 'كمال الإقبال', arabicTranslit: 'kamāl al-iqbāl', description: "Inabah is not partial. Ibn al-Qayyim described it as turning all four dimensions: the heart's love toward Allah, fear directed to Him, hope placed in Him, and all actions done for Him. Partial turning is ruju'; total turning is inabah." },
        { number: 3, title: 'Persistence', arabic: 'المداومة على الرجوع', arabicTranslit: "al-mudāwama ʿalā al-rujūʿ", description: "The munib keeps returning — not just once in a crisis but as the ongoing disposition. The root's meaning of repeated return is not weakness; it is the nature of the station. Each return is honored." },
      ],
      stations: [
        { name: 'Inabah from sin (tawbah)', description: "The beginning — returning to Allah after violation. This overlaps with tawbah and is its foundation." },
        { name: 'Inabah from heedlessness', description: "Returning to Allah not because of a sin but because the heart has become occupied with other things and grown distant. This is subtler than tawbah and more continuous." },
        { name: 'Inabah as orientation', description: "The advanced station: the heart is permanently oriented toward Allah — not returning from distance but living in closeness, each moment of dhikr a fresh act of inabah refreshing that orientation." },
      ],
      questions: [
        { question: "Right now, at this moment — is my heart turned toward Allah? If not, what has it turned toward instead?", answer: "The question is not accusatory but diagnostic. Inabah is the remedy, and the diagnosis is simply: where is the heart pointing?" },
        { question: "When was the last time I felt distant from Allah? Did I turn back, or did I let the distance grow?", answer: "The munib person turns back immediately — not because the distance is shameful but because closeness is better, and the door is always open." },
        { question: "What would it feel like if inabah were my permanent state — not an emergency response but my natural direction?", answer: "This is the goal: not a heart that returns from distance but a heart that never leaves. The awwab is perpetually oriented, perpetually refreshing the turning." },
      ],
    },
    semanticField: [
      { slug: 'tawbah',   arabic: 'تَوْبَة',  transliteration: 'Tawbah',   relationship: 'precedes',  relationshipLabel: 'The foundation of inabah', description: "Tawbah is returning to Allah from sin; inabah is the totality of turning that makes the soul permanently directed toward Him. Tawbah is the gate; inabah is the orientation once inside." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'parallels', relationshipLabel: "Shu'ayb's twin virtues", description: "In 11:88, the Prophet Shu'ayb names both his tawakkul and his inabah as complete. Trusting Allah's management and turning toward Him continuously are two angles of the same soul." },
      { slug: 'khawf',    arabic: 'خَوْف',    transliteration: 'Khawf',    relationship: 'precedes',  relationshipLabel: 'The motive', description: "Khashya (the deeper fear) is the companion of inabah in 50:33. The fear that drives inabah is not terror but awe — and it produces turning, not fleeing." },
      { slug: 'mahabbah', arabic: 'مَحَبَّة', transliteration: 'Mahabbah', relationship: 'deepens',   relationshipLabel: "Love's turning", description: "At its highest station, inabah is not just fear-driven but love-driven — the soul turns toward Allah because that is where its heart lives. Love makes inabah effortless." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Inabah is above tawbah, for tawbah is from sin, while inabah is a return to Allah in every state — whether or not there is sin — such that the heart is always turning toward Him.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Tabari', text: "Al-inabah is al-tawbah and al-ruju': returning from what displeases Allah to what pleases Him.", source: "Jami' al-Bayan" },
      { scholar: 'Al-Qurtubi', text: "The munib is the one who perpetually returns to Allah in every state, whose heart does not settle except in Him, and whose turning is to Him alone.", source: "Al-Jami' li-Ahkam al-Quran" },
    ],
    hadith: [
      { ref: 'Tirmidhi', translation: "Turn to your Lord and seek His forgiveness, for I turn to Him a hundred times a day.", note: "The Prophet ﷺ himself practiced inabah constantly — despite being the one to whom forgiveness was guaranteed. This reveals that inabah is not primarily about need but about love and orientation. Returning to Allah is the natural movement of the rightly oriented soul." },
    ],
    acrossTransitions: `The concept of continuous return to God — not just repentance after sin but ongoing orientation — is found across traditions. In Hasidic Judaism, teshuvah (return/repentance) is not a one-time event but an ongoing orientation of the soul toward God. The Ba'al Shem Tov taught that a person should be perpetually engaged in return — structurally identical to inabah.

In Christian mysticism, the concept of conversatio morum — "conversion of manners" — in the Benedictine Rule refers to an ongoing re-orientation, not a single dramatic moment. John Climacus described conversion not as a past event but as a present posture: the soul perpetually climbing toward God.

What is distinctive in the Quranic usage of inabah is the relational specificity: it is not turning toward Truth or the Absolute in general but toward the Rabbi (Lord, Master, Caretaker). The munib is not orienting toward a principle but toward a Person who receives the turning.`,
    relatedTerms: [
      { slug: 'tawbah',   transliteration: 'Tawbah',   term: 'تَوْبَة'   },
      { slug: 'tawakkul', transliteration: 'Tawakkul', term: 'تَوَكُّل' },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'khawf',    transliteration: 'Khawf',    term: 'خَوْف'    },
    ],
    goDeeper: [
      { slug: 'al-zumar', surahName: 'Al-Zumar', note: "Contains 39:53-54 — 'Do not despair of the mercy of Allah... And return to your Lord.' The context makes it the Quran's most powerful inabah moment: mercy is infinite, but the door must be entered now." },
      { slug: 'qaf',      surahName: 'Qaf',      note: "Contains 50:33 — the description of the people of Jannah as those who 'came with a heart turning in devotion (munib).' The entire surah — from cosmic creation to the final Day — is a call to inabah." },
    ],
  },

  tafakkur: {
    slug: 'tafakkur',
    term: 'تَفَكُّر',
    transliteration: 'Tafakkur',
    pronunciation: 'ta-FAK-kur',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'The deliberate use of reason to see signs — thinking as an act of worship.',
    hasFullEntry: true,
    summary: `Tafakkur is the Quranic practice of deliberate, purposeful contemplation — using the mind not to accumulate information but to see through things to their source. The Quran commands it explicitly and repeatedly: "Do they not reflect?" "Do they not think?" "In that are signs for people who reflect." The word shares a root with fikr (thought), but tafakkur is more: it is the prolonged turning over of a thing in the mind until it yields its meaning.

The scholars described tafakkur as the key that unlocks the heart. Al-Ghazali wrote that one hour of tafakkur is worth a year of supererogatory worship, because the act of profound reflection produces change — in understanding, in feeling, in orientation toward Allah — that ritual repetition alone cannot. The mind that truly contemplates the creation cannot remain indifferent to the Creator.

The Quran's constant invitation to look, observe, travel, and reflect reveals that Islam does not separate thinking from worship. The rational faculty is not merely an instrument for jurisprudence; it is a spiritual organ for encountering Allah through His signs. Every created thing is an ayah (sign) waiting to be read — tafakkur is the practice of learning to read.`,
    root: {
      letters: 'ف–ك–ر',
      transliteration: 'f–k–r',
      meaning: 'To think, reflect, ponder, consider',
      elaboration: "The root f-k-r underlies fikr (thought, idea), tafakkur (deep reflection — fifth form, indicating intensity and depth), mutafakkir (one who reflects). The fifth form implies internal, sustained action — not a glance but a sustained look, not a passing thought but a dwelling upon. The Quran uses tafakkur, tadabbur, and ta'ammul as related but distinct practices: tafakkur uses the mind, tadabbur looks at consequences, ta'ammul examines deeply.",
    },
    occurrenceCount: 18,
    occurrenceNote: "The root f-k-r and its related forms (yatafakkarun, tatafakkarun, etc.) appear approximately 18 times in the Quran, almost always as an invitation — 'for people who reflect.' The frequency signals that tafakkur is not optional contemplation for the philosophically inclined, but a core practice for every believer.",
    keyAyahs: [
      {
        ref: '3:191',
        arabic: 'الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ',
        translation: 'Those who remember Allah while standing, sitting, and lying on their sides, and who reflect on the creation of the heavens and earth.',
        note: "This is the Quran's portrait of the ulu al-albab (people of deep understanding, 3:190). Their tafakkur is joined to dhikr — they remember and reflect simultaneously. This is not academic philosophy but a spiritual practice embedded in daily life.",
      },
      {
        ref: '16:44',
        arabic: 'وَأَنزَلْنَا إِلَيْكَ الذِّكْرَ لِتُبَيِّنَ لِلنَّاسِ مَا نُزِّلَ إِلَيْهِمْ وَلَعَلَّهُمْ يَتَفَكَّرُونَ',
        translation: 'And We revealed to you the message that you may make clear to the people what was sent down to them and that they might reflect.',
        note: "The Quran was revealed so that people would reflect. Tafakkur is thus the very purpose of revelation — not mere obedience but genuine understanding. The law is given so the mind can engage with it, not circumvent thinking.",
      },
      {
        ref: '7:184',
        arabic: 'أَوَلَمْ يَتَفَكَّرُوا ۗ مَا بِصَاحِبِهِم مِّن جِنَّةٍ',
        translation: 'Have they not reflected? There is no madness in their companion.',
        note: "Here tafakkur is posed as the solution to confusion and denial. Reflection is the cure for the closed mind — the person who genuinely thinks about the Prophet ﷺ's character and message cannot accuse him of madness.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Silence and stillness', arabic: 'الصمت والسكون', arabicTranslit: "al-ṣamt wa-l-sukūn", description: "Tafakkur requires removing distraction. The mind cannot go deep while being pulled in multiple directions. The practice begins with creating the conditions for sustained attention." },
        { number: 2, title: 'An object worthy of reflection', arabic: 'موضوع للتفكر', arabicTranslit: 'mawḍūʿ li-l-tafakkur', description: "Tafakkur needs a starting point — an ayah, a natural phenomenon, a historical account, a divine Name. The goal is not free association but directed contemplation of a real thing." },
        { number: 3, title: 'Openness of the heart', arabic: 'انفتاح القلب', arabicTranslit: 'infitāḥ al-qalb', description: "Tafakkur is not purely intellectual — it involves the heart. Al-Ghazali distinguished between tafakkur of the mind (which understands) and tafakkur of the heart (which is moved). The second is the goal." },
      ],
      stations: [
        { name: 'Tafakkur in creation', description: "Looking at the natural world — sky, earth, living things — and following the chain of signs to their source. This is the beginning and the most widely commanded form." },
        { name: "Tafakkur in the Quran (tadabbur)", description: "Sitting with a verse or passage until its layers open. Not just understanding what it says but allowing it to speak to the particular moment of one's life." },
        { name: 'Tafakkur in the self', description: "Reflecting on one's own creation, life, provision, relationships — following the thread of gifts back to the Giver. 'And in yourselves — will you not see?' (51:21)." },
        { name: "Tafakkur in history", description: "The Quran commands travel and reflection on the fate of past nations — not as entertainment but as warning and wisdom. 'Have they not traveled through the land and seen?' (12:109)." },
      ],
      questions: [
        { question: "When did I last sit with something long enough for it to genuinely surprise me?", answer: "Tafakkur requires patience — the willingness to stay with a thing past the point of easy understanding. The insight comes after the first obvious layer." },
        { question: "What does the creation I encounter daily reveal about its Creator?", answer: "Every created thing is an ayah. Tafakkur trains the eye to read what has always been written there." },
        { question: "Am I using my mind in the service of my faith, or have I separated thinking from worship?", answer: "Islam does not divide faith from reason. Tafakkur is the practice that keeps them integrated — the intellect engaged with what the heart loves." },
      ],
    },
    semanticField: [
      { slug: 'dhikr',   arabic: 'ذِكْر',    transliteration: 'Dhikr',   relationship: 'parallels',      relationshipLabel: "Reflection's companion", description: "In 3:191, the ulu al-albab practice both dhikr and tafakkur simultaneously. They are different movements of the same awareness: dhikr keeps the tongue and heart returned to Allah; tafakkur explores His signs. Together they constitute the full life of the spiritual intellect." },
      { slug: 'taqwa',   arabic: 'تَقْوَى',  transliteration: 'Taqwa',   relationship: 'deepens',        relationshipLabel: 'Tafakkur produces taqwa', description: "The Quran frequently ends signs and natural phenomena with 'for people who have taqwa' or 'for people who reflect' — they are near-synonymous as the recipients of divine guidance. Tafakkur deepens taqwa; taqwa opens the mind to tafakkur." },
      { slug: 'sabr',    arabic: 'صَبْر',    transliteration: 'Sabr',    relationship: 'precedes',       relationshipLabel: 'Patience to reflect deeply', description: "Tafakkur requires sabr — the patience to stay with something past the surface. The hasty mind cannot contemplate; it can only skim. Sabr is the precondition for the depth tafakkur requires." },
      { slug: 'ikhlas',  arabic: 'إِخْلَاص', transliteration: 'Ikhlas',  relationship: 'deepens',        relationshipLabel: 'Pure intention opens the mind', description: "Tafakkur for show, for reputation, or for argument produces nothing. The mind reflects most deeply when the only motive is to know Allah and draw near." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Ghazali', text: "One hour of tafakkur is better than a year of supererogatory worship, because tafakkur is what leads the heart to know Allah, to love Him, and to fear Him — and from this all worship proceeds.", source: "Ihya' Ulum al-Din" },
      { scholar: 'Ibn al-Qayyim', text: "Tafakkur is the heart's life — the mirror in which the servant sees his faults, his Lord's graces, his origin, his destination, and what stands between him and his Lord.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Hasan al-Basri', text: "An hour of tafakkur is better than a night of prayer.", source: "Reported in multiple collections" },
    ],
    hadith: [
      { ref: 'Ibn Hibban', translation: "Worship Allah as though you see Him. Reflect on the creation of Allah, and do not reflect on Allah Himself — for you cannot fathom Him.", note: "The Prophet ﷺ orients tafakkur: toward the creation (permitted, commanded, illuminating) and away from trying to comprehend the divine essence (which leads only to confusion). The creation is the window; the direct gaze at the sun blinds." },
    ],
    acrossTransitions: `Contemplative reasoning as a spiritual practice is present across traditions. In Jewish tradition, the practice of hitbonenut (contemplation) in Hasidic thought involves the sustained focus of the mind on a spiritual concept until the heart is moved — structurally identical to the tafakkur of the heart that Al-Ghazali described.

In Christian contemplative practice, lectio divina (sacred reading) is slow, prayerful reflection on scripture — allowing a text to reveal itself over time rather than being extracted for information. The Benedictine practice explicitly values "rumination" — chewing over the text as one would chew food, slowly and repeatedly.

The Stoics practiced the "view from above" — imagining oneself looking down at the whole of human activity from space, recognizing the smallness of what seems important. This is structurally similar to the Quranic invitation to contemplate the heavens and earth: stepping back from the immediate to see the scale.

What is distinctive in Islamic tafakkur is its target: not self-improvement or mental clarity but ma'rifa — knowledge of Allah through His signs. The reflection is not about the self but about what the self can lead you to see.`,
    relatedTerms: [
      { slug: 'dhikr',   transliteration: 'Dhikr',   term: 'ذِكْر'    },
      { slug: 'sabr',    transliteration: 'Sabr',    term: 'صَبْر'    },
      { slug: 'taqwa',   transliteration: 'Taqwa',   term: 'تَقْوَى'  },
      { slug: 'ikhlas',  transliteration: 'Ikhlas',  term: 'إِخْلَاص' },
    ],
    goDeeper: [
      { slug: 'al-imran', surahName: "Al-Imran",     note: "Contains 3:190-191 — the foundational tafakkur passage: the creation of the heavens and earth as signs for ulu al-albab who remember and reflect. This is the Quran's most complete portrait of what tafakkur looks like in practice." },
      { slug: 'al-nahl',  surahName: 'Al-Nahl',      note: "Called 'the surah of blessings' — it invites tafakkur in livestock, honey, shade, ships, rain, and creation at every turn. 16:69 ('in that is a sign for people who reflect') appears multiple times. It is the tafakkur surah par excellence." },
    ],
  },

  hilm: {
    slug: 'hilm',
    term: 'حِلْم',
    transliteration: 'Hilm',
    pronunciation: 'HILM',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'Forbearance that absorbs harm without retaliation — the strength to be still.',
    hasFullEntry: true,
    summary: `Hilm is one of the supreme virtues of the Arab character, and Islam elevated it further. It is translated as forbearance, clemency, gentleness — but all translations fall short. Hilm is what happens when someone has the power to respond with force and chooses not to. It is not passivity or weakness; it is the capacity to absorb provocation without losing composure, to be wronged without retaliating, to be insulted without degrading oneself in response.

The Prophet ﷺ praised hilm in the same breath as intelligence ('aql and hilm are paired repeatedly), and the Quran attributes hilm to Allah Himself (Halim is one of His Names) and to Ibrahim ﷺ. This is telling: the supreme example of hilm in Quranic history is Ibrahim, who was thrown into a fire and prayed for his father who tried to have him killed. That is hilm — not the absence of feeling but the presence of something stronger than feeling.

Ibn al-Qayyim described hilm as the fortress of the character — when it is present, rash anger cannot enter. The opposite of hilm is not courage but ghadab (uncontrolled anger) and tahawwur (recklessness). The person of hilm is not someone who doesn't feel anger — they are someone whose character is not controlled by it.`,
    root: {
      letters: 'ح–ل–م',
      transliteration: 'ḥ–l–m',
      meaning: 'To be forbearing, gentle, deliberate; also to dream',
      elaboration: "The root h-l-m carries two senses: forbearance/clemency (the virtue) and dreaming (the experience of sleep). The connection may be in the quality of softness — the dream world is gentle, unresisting. Halim is one of Allah's Names. The plural of hilm is ahlam, which also means 'dreams,' linking the two meanings in their shared quality of non-violence and gentleness. The opposite root, ta'assub (fanaticism), involves the hardening of the self; hilm is the softness that does not shatter under pressure.",
    },
    occurrenceCount: 11,
    occurrenceNote: "Al-Halim (the Forbearing) appears as a Divine Name approximately 11 times in the Quran, always paired with another Name — Al-'Alim (the All-Knowing), Al-Ghafur (the Forgiving), Al-Shakur (the Appreciative). The pairing reveals hilm's character: it is never alone, never harsh, always accompanied by understanding.",
    keyAyahs: [
      {
        ref: '11:75',
        arabic: 'إِنَّ إِبْرَاهِيمَ لَحَلِيمٌ أَوَّاهٌ مُّنِيبٌ',
        translation: 'Indeed, Ibrahim was forbearing, tenderhearted, and often turning to Allah.',
        note: "The Quran's most explicit attribution of hilm to a prophet. It comes in the context of Ibrahim interceding for the people of Lut — even for those whose destruction had been decreed. Hilm is the capacity for compassion that stretches beyond what is deserved.",
      },
      {
        ref: '2:235',
        arabic: 'وَاعْلَمُوا أَنَّ اللَّهَ يَعْلَمُ مَا فِي أَنفُسِكُمْ فَاحْذَرُوهُ ۚ وَاعْلَمُوا أَنَّ اللَّهَ غَفُورٌ حَلِيمٌ',
        translation: 'And know that Allah knows what is in yourselves, so beware of Him. And know that Allah is Forgiving and Forbearing.',
        note: "Allah knows the innermost intentions and yet is Halim — He does not rush to punishment. This is the Quranic portrait of hilm: knowledge of wrongdoing plus the capacity for restraint. Divine hilm is the space in which human tawbah is possible.",
      },
      {
        ref: '3:155',
        arabic: 'وَاللَّهُ غَفُورٌ حَلِيمٌ',
        translation: 'And Allah is Forgiving and Forbearing.',
        note: "Coming in the aftermath of Uhud, where some believers had fled, this pairing of ghafur and halim is pastoral: you fled, you erred, and Allah absorbed the harm without withdrawing His mercy. This is hilm in its divine scale.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognition of power', arabic: 'إدراك القوة', arabicTranslit: 'idrāk al-quwwa', description: "Hilm is only meaningful when you have the power to retaliate and choose not to. This is why it is paired with strength, not weakness. The powerless who do not retaliate are practicing sabr; the powerful who do not retaliate are practicing hilm." },
        { number: 2, title: 'Understanding of the other', arabic: 'فهم الآخر', arabicTranslit: 'fahm al-ākhar', description: "Hilm is often rooted in understanding — knowing why someone acted wrongly, what limited them, what they did not understand. This knowledge softens the impulse to retaliate without excusing the wrong." },
        { number: 3, title: 'Long-term vision', arabic: 'النظر البعيد', arabicTranslit: 'al-naẓar al-baʿīd', description: "The person of hilm is not managing this moment; they are managing their character over a lifetime. The short-term satisfaction of retaliation costs long-term depth and dignity. Hilm chooses the long arc." },
      ],
      stations: [
        { name: 'Hilm in speech', description: "Not responding to insult with insult — absorbing verbal harm without escalating. The Prophet ﷺ was never obscene in response to obscenity." },
        { name: 'Hilm in authority', description: "The leader or parent who has power over others and uses it gently — correcting without crushing, demanding without degrading. This is the hilm of Ibrahim ﷺ toward his father." },
        { name: 'Hilm in anger', description: "The most demanding station: feeling genuine anger — the nafs fully roused — and choosing not to act from it. The Prophet ﷺ said: 'The strong person is not the one who wrestles; the strong person is the one who controls himself in anger.'" },
      ],
      questions: [
        { question: "When I was last provoked, what was my first impulse? Was my response from my values or from my wound?", answer: "Hilm creates a gap between impulse and action. In that gap, character lives. The person of hilm has learned to inhabit the gap." },
        { question: "Do I treat hilm as weakness in myself while admiring it in others?", answer: "This reveals a confusion between hilm and powerlessness. Hilm requires recognizing that restraint is the exercise of power, not its absence." },
        { question: "What would the Prophet ﷺ do with this provocation?", answer: "The sunnah is full of examples — he was mocked, insulted, physically harmed, and he consistently chose hilm. His hilm was not indifference; it was active, chosen dignity." },
      ],
    },
    semanticField: [
      { slug: 'sabr',    arabic: 'صَبْر',   transliteration: 'Sabr',    relationship: 'parallels',      relationshipLabel: 'The inner discipline', description: "Sabr bears difficulty without complaint; hilm bears provocation without retaliation. They are distinct: sabr responds to hardship from the world; hilm responds to harm from others. Both require the same internal discipline." },
      { slug: 'rahmah',  arabic: 'رَحْمَة', transliteration: 'Rahmah',  relationship: 'deepens',        relationshipLabel: 'Mercy that grounds forbearance', description: "Hilm without rahmah can become cold pride — not retaliating because you consider yourself above it. Rahmah warms hilm: you absorb the harm because you wish the person well, not because you disdain to engage." },
      { slug: 'tawadu',  arabic: 'تَوَاضُع', transliteration: "Tawadu'", relationship: 'parallels',      relationshipLabel: 'Humility alongside forbearance', description: "Hilm and tawadu' are natural companions — the humble person does not need to defend their honor, making hilm easier. The arrogant person's hilm is always in tension with their ego." },
      { slug: 'sidq',    arabic: 'صِدْق',   transliteration: 'Sidq',    relationship: 'deepens',        relationshipLabel: 'Honest forbearance', description: "Hilm that suppresses legitimate complaint indefinitely becomes dishonest. True hilm knows when restraint is the right response and when honest address is. Sidq governs which is which." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Ahnaf ibn Qays', text: "We learned hilm by deliberately practicing it — and whoever seeks to be forbearing, Allah will help him to be forbearing.", source: "Reported by Ibn Abi al-Dunya" },
      { scholar: 'Ibn al-Qayyim', text: "Hilm is the fortress of the character. When it is present, rashness and anger find no way in. The person of hilm is the one whose enemy cannot harm him except by making him abandon his hilm.", source: "Madarij al-Salikin" },
      { scholar: "Ali ibn Abi Talib", text: "If you cannot be forbearing, then act as though you are forbearing — for rarely does a person imitate a people without becoming like them.", source: "Reported in various collections" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "The strong person is not the one who wrestles people down. The strong person is the one who controls himself when angry.", note: "This hadith redefines strength from the physical to the psychological and spiritual. The person of hilm is the strongest person in the room — not because they cannot fight but because they choose something harder." },
      { ref: 'Bukhari', translation: "A man said to the Prophet ﷺ: 'Give me advice.' He said: 'Do not get angry.' The man repeated his question several times. He said: 'Do not get angry.'", note: "The repetition is deliberate: the whole of practical ethics distilled into a single instruction. Not 'manage your anger' or 'express it wisely' but the radical simplicity of hilm: do not get angry." },
    ],
    acrossTransitions: `Forbearance as a virtue is universal, but its grounding differs. In Stoic ethics, apatheia — freedom from passion — was the highest ideal. The Stoic sage was unmoved because passions themselves were considered false judgments. Islamic hilm is different: the person of hilm feels the anger but is not governed by it. The emotion is real; the mastery is what matters.

In Buddhist ethics, khanti (patience/forbearance) is one of the ten perfections (paramis). The Jataka tales (stories of the Buddha's previous lives) often feature a bodhisatta enduring terrible provocation without retaliation. The logic is karmic: retaliation creates new suffering; hilm breaks the cycle.

In Christian thought, "turning the other cheek" (Matthew 5:39) describes an active, chosen non-retaliation — structurally identical to Islamic hilm. The key word is "offer" — not passive submission but an active presentation, a chosen response. This aligns with the Islamic understanding that hilm is the exercise of power, not its absence.`,
    relatedTerms: [
      { slug: 'sabr',   transliteration: 'Sabr',   term: 'صَبْر'   },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة' },
      { slug: 'afw',    transliteration: 'Afw',    term: 'عَفْو'   },
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى' },
    ],
    goDeeper: [
      { slug: 'hud',      surahName: 'Hud',       note: "Contains 11:75 — the most explicit attribution of hilm to Ibrahim ﷺ, in the context of his intercession for the people of Lut even after punishment was decreed. The surah's theme of prophetic patience under extreme trial is the context for hilm at its most tested." },
      { slug: 'al-imran', surahName: "Al-Imran",  note: "Contains 3:155 (Allah as Ghafur Halim after Uhud), 3:134 (the description of the muttaqin as those who 'suppress their anger and pardon the people'). The surah's post-Uhud consolation section is the Quran's most sustained treatment of hilm in community." },
    ],
  },

  uns: {
    slug: 'uns',
    term: 'أُنْس',
    transliteration: 'Uns',
    pronunciation: 'UNS',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: "Intimacy with Allah — the sweetness of His presence that makes solitude a gift.",
    hasFullEntry: true,
    summary: `Uns is the term for spiritual intimacy — the warmth, ease, and delight that comes from closeness with Allah. If khawf (fear) is the trembling before Allah and mahabbah (love) is the orientation toward Him, uns is the quality of resting in His presence — the feeling that being with Allah is the most natural, most pleasant, most desired state. The scholars describe the person of uns as one who finds company in solitude and solitude in company: they are never more themselves than when alone with Allah, and they are never quite alone.

The root of uns is the same as that of insan (human being) and uns (companionship between people). This is not coincidental: the human being is defined by a need for companionship — and in the highest spiritual anthropology, the deepest companionship available to the human soul is with Allah. Uns is the experience of that companionship as warmth and ease rather than awe and trembling.

Al-Ghazali described uns as the final station before fana' — the heart that has experienced uns no longer needs distraction, entertainment, or constant human company. It has found the source of satisfaction and rests there. The great irony of uns is that it is found most often in the night prayer, in private dhikr, in the moments most others find lonely: the person of uns has discovered that solitude is populated.`,
    root: {
      letters: 'أ–ن–س',
      transliteration: 'ʾ–n–s',
      meaning: 'To be intimate with, to be familiar with, to be tame (of animals); companionship',
      elaboration: "The root ʾ-n-s is the root of insan (human being — perhaps 'the social one'), uns (intimacy, companionship), mu'anasa (social warmth), and anisa (to be delighted by, to enjoy the company of). The contrast is with wahsha (wildness, estrangement, loneliness). Uns with Allah is the opposite of the estrangement (ghurba) that the believer experiences in a world that does not know Allah.",
    },
    occurrenceCount: 0,
    occurrenceNote: "Uns as a technical spiritual term does not appear in the Quran directly, but its root appears in contexts of companionship and the nature of the human being. The concept is developed extensively in the Sufi tradition, drawing on Quranic foundations of Allah's closeness (2:186, 50:16) and the sweetness of iman described in hadith.",
    keyAyahs: [
      {
        ref: '2:186',
        arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
        translation: 'And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
        note: "This is the Quranic foundation of uns: Allah is near, responsive, present. The verse comes between two passages about Ramadan — the month of intensified closeness. Uns is the felt experience of this nearness.",
      },
      {
        ref: '50:16',
        arabic: 'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',
        translation: 'And We are closer to him than his jugular vein.',
        note: "The intimacy of divine closeness is radical: closer than the most essential artery of the body. Uns is the spiritual state of feeling and living from this closeness.",
      },
      {
        ref: '89:27-28',
        arabic: 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ۝ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',
        translation: 'O reassured soul, return to your Lord, pleased and pleasing.',
        note: "The nafs mutma'inna — the reassured, settled soul — is called to return to its Lord in pleasure. This is uns at its completion: the soul that is at home in Allah's presence, that hears 'return' as an invitation rather than a command.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Regular private worship', arabic: 'المناجاة والخلوة', arabicTranslit: "al-munājāt wa-l-khalwa", description: "Uns develops in private time with Allah — in the night prayer, in extended du'a, in quiet dhikr. It cannot be found in constant social activity. The person who is never alone with Allah cannot know uns." },
        { number: 2, title: "Tasting the sweetness of iman", arabic: 'حلاوة الإيمان', arabicTranslit: 'ḥalāwat al-īmān', description: "The Prophet ﷺ described iman's sweetness as something tasted. Uns is this taste — the experiential dimension of faith. Those who have tasted it seek to return to it; those who have not yet tasted it pursue it through practice." },
        { number: 3, title: 'Reducing attachment to creation', arabic: 'تخفيف التعلق بالخلق', arabicTranslit: 'takhfīf al-taʿalluq bi-l-khalq', description: "Uns with Allah grows as dependency on other sources of comfort and companionship decreases. This is not the rejection of people but a reordering: Allah first, then creation through Allah." },
      ],
      stations: [
        { name: 'Uns in dhikr', description: "The first taste: feeling the peace and warmth that comes during sustained dhikr. The heart that begins to rest in the remembrance of Allah is beginning to know uns." },
        { name: 'Uns in salah', description: "The prayer as companionship — not a ritual to complete but a conversation to inhabit. The Prophet ﷺ said prayer was the 'coolness of his eyes'; this is uns." },
        { name: 'Uns in solitude', description: "The advanced station: finding that being alone is no longer lonely because Allah is present. The khalwa (retreat) is not an absence but a fullness." },
        { name: 'Uns as a continuous state', description: "The highest: the heart carries uns throughout the day — in work, in people, in creation — because it has found the source and carries it everywhere." },
      ],
      questions: [
        { question: "When I am alone and quiet, is it peaceful or restless? What does the quality of my solitude reveal about my relationship with Allah?", answer: "Uns transforms solitude. If quiet time with Allah is uncomfortable, it often reveals that the heart is still seeking satisfaction elsewhere. Uns is the medicine for that restlessness." },
        { question: "Have I ever felt the sweetness the Prophet ﷺ described? What were the conditions that allowed it?", answer: "Identifying the conditions — time of day, state of heart, practice — and returning to them is the beginning of cultivating uns." },
        { question: "Do I use people, entertainment, or busyness to fill space that only Allah can fill?", answer: "Uns does not reject creation; it finds it insufficient as a primary source. The heart oriented to Allah receives people as gifts rather than as replacements for God." },
      ],
    },
    semanticField: [
      { slug: 'mahabbah', arabic: 'مَحَبَّة', transliteration: 'Mahabbah', relationship: 'deepens',        relationshipLabel: "Love's intimate register", description: "Mahabbah is the love of Allah; uns is the intimacy that love produces. You can love someone from a distance; uns is love that has become closeness and ease." },
      { slug: 'dhikr',    arabic: 'ذِكْر',    transliteration: 'Dhikr',    relationship: 'precedes',       relationshipLabel: 'The practice that opens uns', description: "Uns is often first encountered in deep dhikr — the heart that returns again and again to Allah in remembrance begins to feel at home there. Dhikr is the door; uns is the room." },
      { slug: 'khawf',    arabic: 'خَوْف',    transliteration: 'Khawf',    relationship: 'parallels',      relationshipLabel: 'Trembling and intimacy', description: "Khawf (fear of Allah) and uns (intimacy with Allah) are not opposites but stations. The heart moves between them — the tremendous awe of the divine majesty (jalal) and the warm intimacy of the divine beauty (jamal). Both are true; neither cancels the other." },
      { slug: 'tawakkul', arabic: 'تَوَكُّل', transliteration: 'Tawakkul', relationship: 'deepens',        relationshipLabel: 'Trust that becomes intimacy', description: "Tawakkul is trust in Allah's management; uns is the warmth that comes when that trust has been proven over time. The relationship deepens from reliance to intimacy." },
    ],
    scholarsSaid: [
      { scholar: "Ibn 'Ata' Allah al-Iskandari", text: "Whoever finds Allah has found everything. Whoever loses Allah has lost everything.", source: "Al-Hikam" },
      { scholar: 'Al-Junayd', text: "Uns is the heart's delight in its Lord, the sweetness of His remembrance, and the joy of His love — such that the servant finds no pleasure in anything that distracts from Him.", source: "Reported in al-Risalah al-Qushayriyyah" },
      { scholar: 'Al-Ghazali', text: "Uns is the final gift before the station of witnessing — the heart that is intimate with Allah no longer needs the world to entertain it, because it has found the source of all delight.", source: "Ihya' Ulum al-Din" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "There are three things that whoever possesses them will taste the sweetness of iman: that Allah and His Messenger are more beloved to him than anything else; that he loves a person only for Allah's sake; and that he would hate to return to disbelief as he would hate to be thrown into fire.", note: "The 'sweetness of iman' is the experiential dimension — and it is conditional on mahabbah. Uns is what that sweetness feels like when it settles into the heart as a continuous state." },
      { ref: 'Tirmidhi', translation: "O Allah, make me find sweetness in my conversation with You, in my longing for You, and in my meeting with You.", note: "This du'a of the Prophet ﷺ is a supplication for uns — specifically the sweetness of private conversation (munajat), longing (shawq), and the anticipation of meeting Allah." },
    ],
    acrossTransitions: `The mystical experience of divine intimacy — warmth, ease, and delight in God's presence — is attested across traditions. In Jewish mysticism (Kabbalah), devekut (cleaving to God) describes the mystic's continuous attachment to the divine presence — not just in prayer but throughout daily life. The Hasidic master aims to maintain devekut even while performing mundane tasks; this is the equivalent of uns as a continuous state.

In Christian mysticism, Bernard of Clairvaux described four stages of love, culminating in loving oneself for God's sake — the point at which the self is no longer the reference point. Brother Lawrence's "practicing the presence of God" aimed to maintain the intimacy of prayer throughout the workday — washing dishes in the warmth of divine companionship. This is uns.

In Sufi literature, uns is paired with haybah (awe) as the two poles of the spiritual life: the divine Beauty (jamal) produces uns; the divine Majesty (jalal) produces haybah. The mature heart can hold both. The Quran attributes both to Allah — He is Al-Wadud (the Loving, the Warm) and Al-Qahhar (the Overwhelming). Uns is the human response to Al-Wadud; haybah is the human response to Al-Qahhar.`,
    relatedTerms: [
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'dhikr',    transliteration: 'Dhikr',    term: 'ذِكْر'    },
      { slug: 'khawf',    transliteration: 'Khawf',    term: 'خَوْف'    },
      { slug: 'raja',     transliteration: "Raja'",    term: 'رَجَاء'   },
    ],
    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains 2:186 — the pivotal uns verse: 'Indeed I am near.' Embedded between passages on Ramadan, it reveals that fasting creates the conditions for uns — the self emptied, the heart open, Allah near and responsive." },
      { slug: 'al-fajr',    surahName: 'Al-Fajr',    note: "Contains 89:27-30 — the nafs mutma'inna called to return to its Lord in pleasure. This is uns arriving at its destination: the soul that has found intimacy with Allah hears the call to return as the best news possible." },
    ],
  },

  khashya: {
    slug: 'khashya',
    term: 'خَشْيَة',
    transliteration: 'Khashya',
    pronunciation: 'KHASH-ya',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: 'Reverential awe born of knowledge — the fear of those who truly know.',
    hasFullEntry: true,
    summary: `Khashya is the Quran's highest form of fear — not the dread of punishment that a stranger might feel, but the reverential awe that comes from genuinely knowing Allah. The Quran makes this explicit: "Only those among Allah's servants who have knowledge truly fear Him" (35:28). Khashya is thus distinguished from ordinary khawf (fear): khawf can come from ignorance, from uncertainty, from threat — khashya comes only from knowledge. The more a person knows Allah, the deeper their khashya.

This creates a paradox: the scholars, the prophets, the angels — those who know Allah most — fear Him most. Not because their knowledge reveals something terrible, but because genuine knowledge of the divine majesty, power, and perfection produces a reverence so profound that ordinary language calls it fear. The heart that has truly encountered Allah trembles — not in terror but in awe, the way one trembles before something incomprehensibly beautiful or vast.

The Prophet ﷺ said: "I am the one among you who knows Allah best, and I am the most fearful of Him." This is khashya: the knowledge and the awe are one movement. It is why the Quran attributes khashya to the angels, to the scholars, and to the prophets — and commands it as the proper response to awareness of Allah's greatness.`,
    root: {
      letters: 'خ–ش–ي',
      transliteration: 'kh–sh–y',
      meaning: 'To fear with reverence; awe before greatness',
      elaboration: "The root kh-sh-y is distinct from kh-w-f (the ordinary word for fear). Khashya implies reverence, awe, the fear that comes from knowledge of greatness. Al-Asfahani (the classical lexicographer) writes that khashya is stronger than khawf and arises from the recognition of the greatness of what is feared — it is tinged with respect in a way that khawf is not. The person of khashya fears because they know; the person of khawf fears because they are uncertain.",
    },
    occurrenceCount: 47,
    occurrenceNote: "The root kh-sh-y appears approximately 47 times in the Quran in various forms. It is one of the most frequent words for fear in the Quran and is used both of humans fearing Allah and of natural things being 'fearful' — the mountains in 59:21 'would have split from khashya of Allah.' This cosmic khashya appears throughout creation.",
    keyAyahs: [
      {
        ref: '35:28',
        arabic: 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ',
        translation: 'Only those among Allah\'s servants who have knowledge truly fear Him.',
        note: "This is the definitive khashya verse. The inna-ma construction is exclusive: only the 'ulama (those with genuine knowledge) fear Allah with khashya. This makes khashya the measure of knowledge — if you truly know Allah, you must be moved to khashya. If khashya is absent, the knowledge has not arrived.",
      },
      {
        ref: '59:21',
        arabic: 'لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ',
        translation: 'If We had sent down this Quran upon a mountain, you would have seen it humbled and split apart from khashya of Allah.',
        note: "The mountain image is astonishing: even a mountain — the Quran's symbol of immovability and strength — would be shattered by khashya if it could feel it. This is not to terrify but to humble: the human heart that remains unmoved by the Quran is harder than what would split a mountain.",
      },
      {
        ref: '21:49',
        arabic: 'الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ وَهُم مِّنَ السَّاعَةِ مُشْفِقُونَ',
        translation: 'Those who fear their Lord unseen and who are apprehensive about the Hour.',
        note: "'Unseen' (bi-l-ghayb) is crucial: the khashya is not of a visible threat but of Allah whom they cannot see. This is the highest form — reverential awe of the Unseen, not reaction to present danger.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Knowledge of Allah's Attributes", arabic: 'معرفة صفات الله', arabicTranslit: "maʿrifat ṣifāt Allāh", description: "Khashya cannot be manufactured — it grows from genuine knowledge of who Allah is: His power, His knowledge of all things, His justice, His majesty. The more one knows, the deeper the khashya. This is why study of the Names and Attributes is inseparable from spiritual development." },
        { number: 2, title: 'Sustained engagement with the Quran', arabic: 'الملازمة مع القرآن', arabicTranslit: 'al-mulāzama maʿa al-Qurān', description: "The Quran itself is described as that which would split a mountain with khashya (59:21). Sustained, attentive engagement with the Quran — not speed recitation but slow contemplation — is the primary engine of khashya." },
        { number: 3, title: 'Awareness of the Day of Judgment', arabic: 'استحضار يوم الحساب', arabicTranslit: "istiḥḍār yawm al-ḥisāb", description: "Khashya is deepened by genuine awareness of accountability. The person who contemplates the Day of Judgment — not as abstract theology but as a reality they will stand in — cannot sustain casual indifference to Allah." },
      ],
      stations: [
        { name: 'Khashya of the limbs', description: 'The body reflects the heart: lowering the gaze, quieting the voice in prayer, composure in sacred spaces. This is the outer expression of inner khashya.' },
        { name: 'Khashya of the heart', description: "The deeper dimension: the heart's genuine trembling before Allah's greatness — not performed solemnity but the awe that comes from knowing something true about who Allah is." },
        { name: 'Khashya of the knower', description: "The station of 35:28 — the 'alim whose knowledge has become khashya. Not fear that diminishes with learning but awe that deepens as the horizon of what is known expands. The more you know of Allah, the more you see what you don't know." },
      ],
      questions: [
        { question: "Is my knowledge of Allah moving my heart? If I know something about Allah and it does not change me, what is the knowledge really?", answer: "35:28 makes knowledge and khashya inseparable. Knowledge that does not produce awe has not arrived at the heart — it has only reached the mind." },
        { question: "When I recite the Quran, do I feel anything? When I don't — what is the quality of my attention?", answer: "Khashya in the Quran is inseparable from tadabbur. Speed without reflection produces knowledge of words, not the encounter that splits mountains." },
        { question: "What is the relationship between my khashya of Allah and my behavior in private?", answer: "Muraqaba and khashya work together: the one who truly has khashya behaves the same in private and public, because the awe of Allah is present everywhere." },
      ],
    },
    semanticField: [
      { slug: 'khawf',    arabic: 'خَوْف',    transliteration: 'Khawf',    relationship: 'deepens',        relationshipLabel: 'Khashya as the higher fear', description: "Khawf is ordinary fear — of uncertainty, of punishment, of the unknown. Khashya is the specific fear of one who knows. Khawf can exist without knowledge; khashya requires it. The prophets had khashya; ordinary sinners have khawf." },
      { slug: 'taqwa',   arabic: 'تَقْوَى',   transliteration: 'Taqwa',    relationship: 'deepens',        relationshipLabel: "Khashya's expression in life", description: "Taqwa is how khashya lives itself out in practical choices. The heart that trembles before Allah translates that trembling into a life that guards against His displeasure — this translation is taqwa." },
      { slug: 'mahabbah', arabic: 'مَحَبَّة', transliteration: 'Mahabbah', relationship: 'parallels',      relationshipLabel: 'Awe alongside love', description: "The highest stations of the heart combine khashya and mahabbah — the trembling and the love. These are not opposites: the greater the love, the greater the awe of losing what is loved. The lesser the love, the cheaper the khashya." },
      { slug: 'raja',     arabic: 'رَجَاء',   transliteration: "Raja'",    relationship: 'parallels',      relationshipLabel: "Khashya's complement", description: "Khashya without raja' collapses into despair. Raja' (hope in Allah's mercy) is the companion that keeps khashya from becoming paralytic. Ibn al-Qayyim: the heart travels to Allah on two wings — khawf and raja'. One wing alone cannot carry it." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn Rajab al-Hanbali', text: "Khashya is fear mixed with reverence and glorification. It is specific to those who know — for whoever knows Allah more, fears Him more.", source: "Jami' al-'Ulum wa-l-Hikam" },
      { scholar: 'Al-Qushayri', text: "Khashya is the state of the one whose heart is filled with the greatness of Allah such that all else becomes small before it.", source: "Al-Risalah al-Qushayriyyah" },
      { scholar: 'Ibn al-Qayyim', text: "The difference between khashya and khawf is that khashya is specific to those with knowledge of what they fear. Khashya is therefore the fear of the prophets and scholars, while khawf is general.", source: "Madarij al-Salikin" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "I am the one among you who knows Allah best, and I am the most fearful of Him.", note: "The Prophet ﷺ links maximum knowledge of Allah to maximum khashya — this is 35:28 made biographical. His khashya was not theoretical; it produced tears in night prayer, prostrations of gratitude, and constant awareness of the divine presence." },
    ],
    acrossTransitions: `The concept of reverential awe before the divine — distinct from ordinary fear — is a classic in the philosophy of religion. Rudolf Otto's concept of the "numinous" and the "mysterium tremendum" (the tremendous mystery that produces awe) is precisely what the Quran calls khashya: the experience of something that is wholly other, incomprehensibly great, before which the self trembles not from threat but from scale.

In Jewish tradition, yirat ha-romemut (awe of the exaltedness) is distinguished from yirat ha-onesh (fear of punishment). The rabbinic ideal is the higher form — the fear that comes from knowing God's greatness. Maimonides describes how knowledge of God's works produces love and awe together: the more one knows, the more one loves and fears.

In Christian mystical theology, tremendum et fascinans — the tremendous and the fascinating — describes the divine as both terrifying and irresistibly attractive. Rudolf Otto drew from Christian sources but the structure is identical to khashya and uns working together: the divine majesty terrifies (khashya) and the divine beauty attracts (uns).`,
    relatedTerms: [
      { slug: 'khawf',    transliteration: 'Khawf',    term: 'خَوْف'    },
      { slug: 'taqwa',    transliteration: 'Taqwa',    term: 'تَقْوَى'  },
      { slug: 'mahabbah', transliteration: 'Mahabbah', term: 'مَحَبَّة' },
      { slug: 'raja',     transliteration: "Raja'",    term: 'رَجَاء'   },
    ],
    goDeeper: [
      { slug: 'fatir',     surahName: 'Fatir',     note: "Contains 35:28 — the verse that makes khashya the exclusive property of those with knowledge. The surah is about the creation and the Creator — the knowledge that produces khashya is precisely the knowledge of what Fatir displays." },
      { slug: 'al-hashr',  surahName: 'Al-Hashr',  note: "Contains 59:21 — the mountain-splitting verse. The surah's closing passage (59:22-24) is a cascade of divine Names that produces, by design, the khashya that the mountain verse describes. Read the Names slowly and feel the awe they intend to produce." },
    ],
  },

  afw: {
    slug: 'afw',
    term: 'عَفْو',
    transliteration: 'Afw',
    pronunciation: 'AFW',
    category: 'States of the Heart' as GlossaryCategory,
    evocativeLine: "Pardoning — the release of the right to retaliate, chosen freely out of strength.",
    hasFullEntry: true,
    summary: `Afw is pardon — the voluntary release of one's right to hold someone accountable for a wrong. It is more than tolerance, more than moving on, more than forgetting: afw is an active choice to surrender a claim. The Quran pairs it consistently with 'afw as a Divine Name (Al-'Afuw — the Pardoner) and commands it from believers toward each other. When Allah pardons, He does not merely withhold punishment; He erases the record. When a believer practices afw, they do something that mirrors that divine action.

The distinction the scholars make is important: 'afw (pardon) is different from maghfirah (forgiveness) in that 'afw specifically means releasing the right to retaliate. You can forgive internally while still holding someone accountable externally; 'afw means releasing even that right. This is why the Quran consistently asks: would you not love for Allah to forgive you? Then forgive — not as a strategy but as a spiritual posture.

The Prophet ﷺ's life was the greatest exhibition of 'afw. At the conquest of Makkah, when the people who had persecuted, killed, and exiled the Muslims were in his hands, he asked them: "What do you think I will do with you?" And he said: "Go — you are free." This is afw at its most total. And the Quran promises: "Whoever pardons and makes reconciliation — his reward is with Allah" (42:40).`,
    root: {
      letters: 'ع–ف–و',
      transliteration: 'ʿ–f–w',
      meaning: 'To pardon, erase, wipe out, let go of a right or claim',
      elaboration: "The root ʿ-f-w has the sense of wiping clean, erasing — like wind erasing tracks in sand. 'Afwa means surplus, what is left over (implying generosity). Al-'Afuw is one of Allah's Names — the One who erases sins entirely, leaving no trace. Human 'afw mirrors this: not just restraining from retaliation but releasing the claim entirely, as if the wrong had been wiped from the record.",
    },
    occurrenceCount: 35,
    occurrenceNote: "The root ʿ-f-w appears approximately 35 times in the Quran in various forms: as a divine Name (Al-'Afuw), as a command to believers (wa-l-ya'fu — 'let them pardon'), in descriptions of reciprocal forgiveness, and in the context of Allah's pardoning of believers who err.",
    keyAyahs: [
      {
        ref: '24:22',
        arabic: 'وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ',
        translation: 'And let them pardon and overlook. Would you not like that Allah should forgive you?',
        note: "This verse was revealed about Abu Bakr's decision to cut off support for Mistah after he participated in the slander of Aisha. Allah's question is rhetorical: the desire to receive divine pardon is the motive for human pardon. The logic of 'afw runs through the divine-human relationship.",
      },
      {
        ref: '42:40',
        arabic: 'وَجَزَاءُ سَيِّئَةٍ سَيِّئَةٌ مِّثْلُهَا ۖ فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللَّهِ',
        translation: 'The recompense of an evil act is one like it, but whoever pardons and makes reconciliation — his reward is with Allah.',
        note: "The verse grants the right to retaliate equivalently — then raises the alternative: 'afw plus islah (reconciliation). The reward for this is described as 'with Allah' — the highest Quranic way of saying: it cannot be measured in worldly terms.",
      },
      {
        ref: '64:14',
        arabic: 'وَإِن تَعْفُوا وَتَصْفَحُوا وَتَغْفِرُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
        translation: 'And if you pardon and overlook and forgive — indeed, Allah is Forgiving and Merciful.',
        note: "Three layered actions — 'afw (pardon), safh (overlook), ghafara (forgive) — followed by two divine attributes. The pattern teaches: human pardoning invokes divine forgiveness. These are not separate; they are related as action and response.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognizing the right', arabic: 'إدراك الحق', arabicTranslit: 'idrāk al-ḥaqq', description: "Afw is only possible if you have a genuine right to retaliate. Pardoning when you have no right is not 'afw — it is irrelevance. True 'afw requires that the wrong was real and the right to respond is legitimate — and that you release it anyway." },
        { number: 2, title: "Hoping for Allah's 'afw", arabic: "الرجاء في عفو الله", arabicTranslit: "al-rajāʾ fī ʿafw Allāh", description: "The Quran consistently motivates 'afw with the divine parallel: you want Allah to pardon you — practice 'afw toward others. The person who has felt their own need for divine pardon finds human 'afw comes more naturally." },
        { number: 3, title: 'Choosing the better response', arabic: 'الأخذ بالأحسن', arabicTranslit: 'al-akhdh bi-l-aḥsan', description: "41:34 commands 'repel evil with what is better' — the same principle as 'afw. Afw is not weakness; it is choosing a higher response. This requires believing that the higher response is genuinely better — which is itself a form of tawakkul and ihsan." },
      ],
      stations: [
        { name: "Afw of the tongue", description: "Not speaking about the wrong — not to the person, not to others. This is the beginning: the pardon that doesn't go public." },
        { name: "Afw of the heart", description: "The deeper station: genuinely releasing the resentment, not just the retaliation. The heart that has given 'afw does not carry the ledger of wrongs any longer." },
        { name: "Afw with islah", description: "The highest station: pardoning plus actively pursuing reconciliation. 42:40 pairs 'afw with islah — the pardon that rebuilds the relationship. This is the prophetic model." },
      ],
      questions: [
        { question: "Who am I still holding a claim over? What is the cost of carrying that claim?", answer: "The unforgiving heart carries the wrong twice — once when it happened, and continuously in the carrying. 'Afw releases the carrier as much as the wrongdoer." },
        { question: "Do I want Allah's 'afw? What is my response to 24:22 — 'would you not love for Allah to forgive you?'", answer: "The desire for divine pardon and the practice of human 'afw are linked in the Quran. The person who truly wants one is pushed toward the other." },
        { question: "Is my 'afw genuine, or is it suppression? Do I say I forgive but carry the resentment?", answer: "Genuine 'afw requires processing the hurt — not bypassing it. The heart must actually work through the wrong before the release is real. Otherwise what is called 'afw is simply avoidance." },
      ],
    },
    semanticField: [
      { slug: 'hilm',   arabic: 'حِلْم',   transliteration: 'Hilm',   relationship: 'parallels',      relationshipLabel: 'Forbearance alongside pardon', description: "Hilm is absorbing harm without retaliation; 'afw is releasing the right to retaliate. They are natural companions: the person of hilm has the self-control to choose 'afw. Together they describe the full posture of the wronged person who responds from strength." },
      { slug: 'sabr',   arabic: 'صَبْر',   transliteration: 'Sabr',   relationship: 'precedes',       relationshipLabel: 'The patience that enables pardon', description: "Afw requires sabr — the patience to sit with the wound before releasing it. Premature 'afw that hasn't processed the hurt is not genuine. Sabr is the work that makes real 'afw possible." },
      { slug: 'rahmah', arabic: 'رَحْمَة', transliteration: 'Rahmah', relationship: 'deepens',        relationshipLabel: 'Mercy motivates pardon', description: "Rahmah is the orientation toward the welfare of others. It is what prevents 'afw from being cold or performed: the person who truly wants good for the wrongdoer finds pardoning them natural." },
      { slug: 'ihsan',  arabic: 'إِحْسَان', transliteration: 'Ihsan',  relationship: 'deepens',        relationshipLabel: "Excellence's highest expression", description: "Ihsan means giving more than is required. In the context of wrongdoing, justice requires equivalent retaliation; 'afw goes beyond — it is ihsan applied to human conflict. This is why 42:40 says the reward of 'afw is with Allah: no worldly calculation captures it." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "The greatest reward is for the one who has the power to take revenge and does not — who pardons when he is able to punish, and gives when he could withhold. This is the station of 'afw.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Qurtubi', text: "Afw is more complete than taking what is due, because 'afw gives up what the self has a right to — and that is harder than merely enduring what cannot be changed.", source: "Al-Jami' li-Ahkam al-Quran" },
      { scholar: 'Abu Bakr al-Siddiq (upon hearing 24:22)', text: "Yes, by Allah, we want You to forgive us, O our Lord.", source: "Reported in Tafsir Ibn Kathir" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "Charity does not decrease wealth. No one practices 'afw except that Allah increases him in honor. And no one humbles himself for Allah except that Allah raises him in rank.", note: "Three paradoxes: giving does not reduce; pardoning does not diminish; humbling does not lower. The logic of 'afw is the logic of Allah's economy — the opposite of the world's arithmetic." },
      { ref: 'Tirmidhi', translation: "The Prophet ﷺ was never given a choice between two things except that he chose the easier of the two — unless it was a sin. And if he was wronged, he would not take revenge for himself; he would only take action for the sake of Allah.", note: "The sunnah of the Prophet ﷺ reveals 'afw as his default: not the noble exception but the consistent practice. He defended truth and justice, not his own honor." },
    ],
    acrossTransitions: `Forgiveness as a virtue — the voluntary release of resentment and the right to retaliate — is present across traditions but with importantly different logics. In Christian thought, forgiveness is often framed as a gift to the wrongdoer as well as the wronged — the releasing of a debt. Jesus's prayer "forgive us our debts as we forgive our debtors" (Matthew 6:12) has the same structure as 24:22: human forgiveness and divine forgiveness are linked.

In Buddhist ethics, the practice of tonglen (sending and taking) — breathing in the hurt of the wrongdoer and breathing out compassion — approaches 'afw from a different angle: the release of resentment is grounded in recognition of the wrongdoer's suffering. The pardon is motivated by compassion rather than by hope for divine reciprocity, but the practical release of resentment is similar.

In Stoic ethics, forgiving others was reframed as rational self-interest: the resentful person is hurt more by their own resentment than the wrongdoer is. Epictetus: "When someone wrongs you, remember that they did it because they thought it was the right thing to do." This robs the resentment of its fuel.

What is distinctive in Islamic 'afw is the divine motivation: Allah is Al-'Afuw, and human 'afw mirrors divine 'afw. The pardoning person participates in a divine quality — and is promised a divine reward. This is not just wise psychology or good philosophy; it is an act of worship.`,
    relatedTerms: [
      { slug: 'hilm',   transliteration: 'Hilm',   term: 'حِلْم'    },
      { slug: 'sabr',   transliteration: 'Sabr',   term: 'صَبْر'    },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة'  },
      { slug: 'ihsan',  transliteration: 'Ihsan',  term: 'إِحْسَان' },
    ],
    goDeeper: [
      { slug: 'al-nur',   surahName: 'Al-Nur',   note: "Contains 24:22 — the pivotal 'afw verse, revealed about Abu Bakr and the slander of Aisha. The surah's theme of moral purity, light, and social repair makes it the context for 'afw as the virtue that enables community to survive crisis." },
      { slug: 'al-shura', surahName: 'Al-Shura', note: "Contains 42:40 — 'afw with islah, whose reward is with Allah. The surah's extended discussion of how believers respond to adversity (42:36-43) is the Quran's most developed teaching on the alternative to retaliation." },
    ],
  },

  hikmah: {
    slug: 'hikmah',
    term: 'حِكْمَة',
    transliteration: 'Hikmah',
    pronunciation: 'HIK-mah',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Wisdom — the ability to put things in their right place, given only to those Allah chooses.',
    hasFullEntry: true,
    summary: `Hikmah is wisdom — but not the wisdom of experience or intelligence alone. The Quran describes it as a gift from Allah: "He gives hikmah to whoever He wills, and whoever is given hikmah has been given abundant good" (2:269). This is the crucial distinction: hikmah cannot be earned through study alone; it is granted. The one who receives it becomes able to see things as they actually are, to place each thing in its right relationship, to know not just what to do but why — and how.

The classical scholars distinguished hikmah from 'ilm (knowledge): you can have 'ilm without hikmah, but not hikmah without 'ilm. The one who has 'ilm knows facts; the one who has hikmah knows what to do with them. Al-Ghazali described hikmah as the capacity of the rational soul operating at its best — in alignment with divine guidance, purified of ego, oriented toward what truly matters.

In the Quran, hikmah is paired consistently with the Book (kitab): "He taught them the Book and hikmah" (2:129, 2:151, 3:164). This pairing reveals that hikmah is the living dimension of scripture — not just the text but the ability to apply it with discernment, justice, and beauty. The Prophet ﷺ embodied this: he knew the revelation and lived it wisely in every circumstance.`,
    root: {
      letters: 'ح–ك–م',
      transliteration: 'ḥ–k–m',
      meaning: 'To judge, decide, restrain, be firm and sound',
      elaboration: "The root h-k-m is the root of hukm (judgment/rule), hakim (judge/wise person), mahkama (court), and hikma (wisdom). The common thread is the capacity to make sound, binding determinations — to see clearly and decide well. Al-Hakim is one of Allah's Names: the Perfectly Wise. Human hikmah participates in this quality to the degree Allah grants it.",
    },
    occurrenceCount: 20,
    occurrenceNote: "Hikmah appears approximately 20 times in the Quran, almost always in elevated contexts: paired with the Book (2:129, 3:164), as a gift Allah gives to prophets (4:54), as what is given to those who receive abundant good (2:269), and as the method of da'wa — 'Call to the way of your Lord with hikmah' (16:125).",
    keyAyahs: [
      {
        ref: '2:269',
        arabic: 'يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا',
        translation: 'He gives wisdom to whom He wills, and whoever is given wisdom has certainly been given much good.',
        note: "The verse places hikmah entirely in Allah's gift — it is not achieved but received. The superlative 'much good' (khayran kathiran) signals that hikmah is among the highest blessings: wealth, health, and honor are subordinate to it.",
      },
      {
        ref: '16:125',
        arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ',
        translation: 'Call to the way of your Lord with wisdom and good instruction.',
        note: "Hikmah is the method of da'wa — calling to Allah with wisdom means reading the person, the moment, and the message together. It requires knowing what to say, when to say it, and how. This is hikmah in the relational register.",
      },
      {
        ref: '31:12',
        arabic: 'وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ',
        translation: "And We had certainly given Luqman wisdom: Be grateful to Allah.",
        note: "Luqman's hikmah begins with shukr — gratitude to Allah. The wisdom that does not begin with acknowledging the Source is incomplete. The entire surah of Luqman is an exhibition of hikmah applied to parenting, character, and relationship with Allah.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Purification of the heart', arabic: 'تزكية النفس', arabicTranslit: 'tazkiyat al-nafs', description: "The scholars taught that hikmah flows into a purified vessel. The heart cluttered with ego, worldly attachment, and spiritual negligence cannot hold hikmah. Tawbah, dhikr, and tafakkur create the conditions; hikmah is the gift that follows." },
        { number: 2, title: 'Deep engagement with the Quran', arabic: 'الملازمة مع القرآن', arabicTranslit: 'al-mulāzama maʿa al-Qurān', description: "The Quran is the primary source of hikmah for the believer. Not surface reading but tadabbur — sitting with the text until its depths open. The one who deeply knows the Quran develops a Quranic vision of reality." },
        { number: 3, title: 'Learning from scholars and experience', arabic: 'الاستفادة من العلماء والتجارب', arabicTranslit: 'al-istifāda min al-ʿulamāʾ wa-l-tajārib', description: "Hikmah respects accumulated wisdom — in the chain of scholarship, in the experience of elders, in the patterns of history. The Quran's command to 'travel in the earth and see' is a command to learn from what has already been lived." },
      ],
      stations: [
        { name: 'Hikmah in speech', description: "Knowing what to say, how to say it, and when to be silent. The hakeem (wise one) does not speak merely because they know something — they speak when speech will help and are silent when it won't." },
        { name: 'Hikmah in judgment', description: "The ability to see a situation in its full complexity and make a sound determination — not according to desire or pressure but according to what is truly right. This is the hikmah of judges and leaders." },
        { name: "Hikmah in da'wa", description: "Reading the person before speaking — understanding what they need, what they can hear, what would actually help them. 16:125 describes this as the method of inviting to Allah's way." },
        { name: 'Hikmah as a state', description: "The highest expression: the person who has been given hikmah lives from it continuously — their decisions, words, relationships, and responses all reflect a clarity about what truly matters." },
      ],
      questions: [
        { question: "When I am about to speak or act, am I asking 'what is true?' or also 'what is needed, what is right, what will help'?", answer: "Hikmah requires all three. Truth without discernment can harm. Discernment without truth is manipulation. Hikmah holds both." },
        { question: "Am I developing the conditions for hikmah — study, reflection, purification — or am I waiting for it to arrive without preparation?", answer: "Allah gives hikmah to those who seek it. The seeking includes purifying the vessel: not just accumulating knowledge but becoming someone wisdom can dwell in." },
        { question: "When I encounter a difficult person or situation, do I respond from habit and reaction, or from genuine reading of what is actually needed?", answer: "The habitual response is the enemy of hikmah. Wisdom requires pausing — taking the situation in its particularity before responding." },
      ],
    },
    semanticField: [
      { slug: 'ilm',    arabic: 'عِلْم',   transliteration: "'Ilm",    relationship: 'precedes',  relationshipLabel: 'Knowledge before wisdom', description: "Knowledge is the precondition of hikmah — you cannot be wise about what you don't know. But 'ilm without hikmah is incomplete: knowing facts does not guarantee knowing what to do with them." },
      { slug: 'adl',    arabic: 'عَدْل',   transliteration: "'Adl",    relationship: 'parallels', relationshipLabel: 'Justice alongside wisdom', description: "Hikmah and 'adl (justice) are natural companions — wisdom without justice becomes clever manipulation; justice without wisdom becomes rigid rule-following. Together they describe the ideal judge, leader, and parent." },
      { slug: 'taqwa',  arabic: 'تَقْوَى', transliteration: 'Taqwa',   relationship: 'deepens',   relationshipLabel: 'The ground of wisdom', description: "The Quran says Allah will teach the person of taqwa (2:282). Taqwa creates the receptivity that hikmah requires — the purified, rightly-oriented heart is the vessel into which wisdom flows." },
      { slug: 'sabr',   arabic: 'صَبْر',   transliteration: 'Sabr',    relationship: 'precedes',  relationshipLabel: 'Patience as prerequisite', description: "The wise person is patient — they do not respond impulsively, do not judge before seeing, do not act before understanding. Sabr is the temporal dimension of hikmah: the ability to wait for clarity." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Ghazali', text: "Hikmah is the perfection of the human soul — the rational soul's ability to distinguish truth from falsehood, real good from apparent good, and to place each thing in its right position.", source: "Ihya' Ulum al-Din" },
      { scholar: 'Ibn Qayyim al-Jawziyyah', text: "Hikmah means placing things in their right places — neither giving something more than it deserves nor less. It is the foundation of justice, beauty, and rightness in all affairs.", source: "Madarij al-Salikin" },
      { scholar: 'Luqman (as reported in the Quran)', text: "O my son, if something is even the weight of a mustard seed and it is within a rock or in the heavens or in the earth, Allah will bring it forth.", source: "31:16 — Luqman's hikmah in practice: teaching his son that nothing escapes Allah's knowledge." },
    ],
    hadith: [
      { ref: 'Bukhari', translation: "Wisdom (al-hikma) is the lost property of the believer — wherever they find it, they are most entitled to it.", note: "This hadith grounds an important principle: hikmah is not owned by any tradition, era, or people. The believer's intellectual posture is receptive — wherever wisdom is found, it belongs to the believer by right of their orientation toward truth." },
    ],
    acrossTransitions: `Wisdom as a virtue that transcends ordinary knowledge is universal. In Greek philosophy, sophia (wisdom) was the highest intellectual virtue — distinct from phronesis (practical wisdom) and episteme (scientific knowledge). The sophists claimed to sell it; Socrates claimed you could only know you didn't have it. Plato's philosopher-king ruled by sophia; for the Quran, the King of wisdom is Allah and hikmah is His gift to those He chooses.

In Jewish wisdom literature (Proverbs, Ecclesiastes, Wisdom of Solomon), Hokhma (wisdom) is personified as a woman present at creation — almost divine. Proverbs 3:13-18 extols wisdom as more precious than silver, gold, or rubies, and connects it to long life, honor, and peace. The parallel with 2:269 ('much good') is striking.

In Chinese philosophy, the concept of zhi (wisdom) in Confucianism is one of the five cardinal virtues, connected to distinguishing right from wrong. Laozi's Tao Te Ching speaks of sage wisdom as a kind of non-interference with the natural order — the wise person acts without imposing, knows without analyzing. This resonates with hikmah's quality of placing things in their right position without distorting them.`,
    relatedTerms: [
      { slug: 'adl',   transliteration: "'Adl",   term: 'عَدْل'   },
      { slug: 'taqwa', transliteration: 'Taqwa',  term: 'تَقْوَى' },
      { slug: 'sabr',  transliteration: 'Sabr',   term: 'صَبْر'   },
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
    ],
    goDeeper: [
      { slug: 'luqman', surahName: 'Luqman', note: "The surah named after a man given hikmah — and the entire surah is his application of it. Luqman's advice to his son (31:13-19) is the Quran's most complete exhibition of what hikmah looks like when embodied in parental guidance." },
      { slug: 'al-nahl', surahName: 'Al-Nahl', note: "Contains 16:125 — call with hikmah. The surah itself is an exhibition of divine hikmah in creation: from livestock to honey to ships to shade. Reading it is a lesson in seeing creation wisely." },
    ],
  },

  adl: {
    slug: 'adl',
    term: 'عَدْل',
    transliteration: "'Adl",
    pronunciation: 'ADL',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: "Justice — one of the Quran's supreme values, demanded even against yourself.",
    hasFullEntry: true,
    summary: `'Adl (justice) is among the most frequently commanded values in the Quran — not as a legalistic requirement but as a divine attribute that believers are called to embody. Allah is Al-'Adl: the perfectly just. Every human attempt at justice participates in a divine quality and every failure diminishes something of what humans were created to uphold.

What distinguishes Quranic justice from mere fairness is its comprehensiveness and its demands: "O you who believe, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives" (4:135). Justice that applies only to strangers, only when convenient, only when it costs nothing — is not 'adl. The Quran demands a justice that bends even against self-interest, that requires standing as a witness to the truth even when it hurts you.

The scholars distinguished 'adl from qist (equity or fairness in distribution). Both are justice, but 'adl implies the exact proportion — giving each thing exactly what it deserves, no more and no less. Qist implies equity in sharing — making sure things are distributed fairly. The Quran commands both. Together they describe a vision of social life in which nothing and no one is treated as less than they truly are.`,
    root: {
      letters: 'ع–د–ل',
      transliteration: 'ʿ–d–l',
      meaning: 'To be straight, even, equal; to balance, adjust, set upright',
      elaboration: "The root ʿ-d-l carries the image of straightness and balance — a scale that is level, a line that is true. The mu'tadil (moderate, balanced) person is one who does not lean to either excess or deficiency. 'Adl in law is the witness who is reliable, whose testimony is straight. Al-'Adl is one of Allah's Names — the One whose every judgment is perfectly calibrated.",
    },
    occurrenceCount: 28,
    occurrenceNote: "The root ʿ-d-l appears approximately 28 times in the Quran in various forms — as a command to believers, as an attribute of Allah, as the standard for testimony, and as the standard for family relationships. It is among the most repeatedly commanded virtues in the Quran.",
    keyAyahs: [
      {
        ref: '4:135',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ',
        translation: 'O you who believe, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives.',
        note: "This is the most demanding justice verse in the Quran. Qawwamin (persistently standing) is the intensive form — not occasional justice but a permanent, effortful posture. The hardest cases are explicitly named: your own self, your parents, your close relatives. There are no exemptions.",
      },
      {
        ref: '5:8',
        arabic: 'وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ',
        translation: 'And do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.',
        note: "The hardest application of 'adl: being just toward those you hate, those who have wronged you, your enemies. The Quran explicitly names this and then commands it. 'Be just — that is nearer to taqwa' makes justice the road to Allah, not merely a social obligation.",
      },
      {
        ref: '16:90',
        arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ',
        translation: 'Indeed, Allah commands justice, excellence (ihsan), and giving to relatives.',
        note: "The trinity of social virtue: justice as the floor, ihsan as the elevation beyond the floor, and giving to relatives as the specific application. Justice is where ethics begins; ihsan is where it reaches its height. They are inseparable.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Freedom from bias", arabic: "النزاهة من الهوى", arabicTranslit: "al-nazāha min al-hawā", description: "Justice requires freedom from the distortions of desire, affection, and self-interest. 4:135 names the hardest: even against yourself, your parents, your family. The person whose justice bends for those they love has not yet practiced 'adl." },
        { number: 2, title: 'Willingness to be a witness', arabic: 'الاستعداد للشهادة', arabicTranslit: 'al-istiʿdād li-l-shahāda', description: "The Quran pairs 'adl with being a witness (shahid) — justice requires standing up and speaking the truth even when it costs you. The silent bystander who sees injustice and says nothing is not practicing 'adl." },
        { number: 3, title: 'Consistency across groups', arabic: 'الاتساق مع الجميع', arabicTranslit: 'al-ittisāq maʿa al-jamīʿ', description: "5:8 explicitly commands justice even toward enemies, even toward those you hate. The measure of your justice is not how you treat those you love — it is how you treat those you have reason to despise." },
      ],
      stations: [
        { name: "'Adl with Allah", description: "Tawhid is the ultimate 'adl — giving Allah His right station as the only deity, the only ultimate concern. Shirk is the greatest zulm (injustice) because it misplaces the greatest right." },
        { name: "'Adl with people", description: "The practical dimension: in testimony, in judgment, in financial dealings, in family relations. Every context has its demand of 'adl." },
        { name: "'Adl with oneself", description: "Not being unjust to yourself — neither over-demanding nor self-indulgent. The person who destroys their health for worldly gain, or who neglects the soul for the body, has committed zulm against themselves." },
        { name: "'Adl with creation", description: "The Quran's cosmic ethics: justice toward animals, toward the environment, toward future generations. The Quran condemns fasad fil-ard (corruption in the earth) — exploitation of creation is a form of injustice." },
      ],
      questions: [
        { question: "Do I apply the same standard of judgment to people I like and people I dislike? To my group and the other group?", answer: "This is the test of 5:8. The double standard — more lenient with allies, harsher with adversaries — is the most common form of injustice in communities." },
        { question: "Is there a situation in which I know the just thing to do but am not doing it because it costs me something?", answer: "4:135 addresses this directly. The cost is the measure of the 'adl: the justice that costs nothing is not tested." },
        { question: "Have I given everyone and everything in my life its due — my family, my work, my body, my Lord?", answer: "Zulm (injustice) is the failure to give things their due. The daily examination of what is owed and whether it has been given is a form of muhasaba." },
      ],
    },
    semanticField: [
      { slug: 'hikmah',  arabic: 'حِكْمَة',  transliteration: 'Hikmah',  relationship: 'parallels',     relationshipLabel: 'Wisdom alongside justice', description: "'Adl requires hikmah — the wise judgment to know what justice looks like in this particular case. Rules give the framework; hikmah fills in the application." },
      { slug: 'ihsan',   arabic: 'إِحْسَان',  transliteration: 'Ihsan',   relationship: 'deepens',       relationshipLabel: 'Excellence beyond justice', description: "Ihsan is what comes when justice is satisfied and one still chooses to give more. The relationship of 'adl and ihsan is that of duty and gift — justice is the minimum; ihsan exceeds it." },
      { slug: 'rahmah',  arabic: 'رَحْمَة',  transliteration: 'Rahmah',  relationship: 'deepens',       relationshipLabel: 'Mercy that tempers justice', description: "Justice without mercy is rigid; mercy without justice is sentimental. The Quran consistently pairs them in the divine attributes. In human ethics, 'adl sets the standard and rahmah looks for every legitimate reason to be lenient within it." },
      { slug: 'taqwa',   arabic: 'تَقْوَى',  transliteration: 'Taqwa',   relationship: 'deepens',       relationshipLabel: "Justice's foundation", description: "5:8 explicitly connects 'adl to taqwa: 'be just, that is nearer to taqwa.' The person of taqwa has a motive for justice that transcends personal advantage — the consciousness of Allah's watching." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn Taymiyya', text: "The world can survive with justice and disbelief, but it cannot survive with injustice and Islam. This is because justice is the order of all things.", source: "Al-Siyasa al-Shar'iyya" },
      { scholar: 'Ibn al-Qayyim', text: "Allah has established the world on justice, and when it inclines to oppression (zulm), it begins to collapse. Justice is the balance upon which the heavens and earth stand.", source: "I'lam al-Muwaqqi'in" },
      { scholar: 'Al-Qurtubi', text: "'Adl is placing each thing in its right place — giving each soul what it deserves, neither adding nor diminishing. This is the definition that encompasses all its meanings.", source: "Al-Jami' li-Ahkam al-Quran" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "The just will be on thrones of light before Allah — those who were just in their rulings, their families, and all that they were placed in charge of.", note: "Justice is not only a civic virtue; it is a spiritual station. The just leader, the just parent, the just judge — all are promised this elevated position. Ordinary life is the arena for 'adl." },
    ],
    acrossTransitions: `Justice as a supreme virtue is universal, but the Quran's version has a unique character: it is grounded in the divine nature (Allah is Al-'Adl), it includes cosmic scope (justice toward the self, toward creation, toward Allah), and it is demanded even against self-interest.

In Greek philosophy, dikaiosyne (justice) was Plato's supreme virtue — the health of the soul in which reason governs spirit and appetite. The just person does what is right because their inner order mirrors the order of the cosmos. Aristotle grounded justice in giving each person their due — the same definition as the classical Islamic 'adl.

In the Western liberal tradition, justice is often contractual — based on rights that individuals hold against each other and against the state. John Rawls' "veil of ignorance" thought experiment asks: what principles would you choose if you didn't know your position in society? This is structurally similar to 4:135 — justice requires stepping outside your particular interest.

What is distinctive in the Quranic vision is that justice is not the ceiling but the floor — ihsan (excellence beyond what is required) is the aspiration. You must be just; then you are invited to be excellent. The liberal tradition rarely moves beyond rights and duties; the Quran does.`,
    relatedTerms: [
      { slug: 'hikmah', transliteration: 'Hikmah', term: 'حِكْمَة'  },
      { slug: 'ihsan',  transliteration: 'Ihsan',  term: 'إِحْسَان' },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة'  },
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى'  },
    ],
    goDeeper: [
      { slug: 'al-nisa',   surahName: "Al-Nisa'",  note: "Contains 4:135 — the most demanding justice command in the Quran. The surah's extensive treatment of family law, inheritance, and social relations makes 'adl the organizing principle of Medinan social ethics." },
      { slug: 'al-maidah', surahName: "Al-Ma'idah", note: "Contains 5:8 — justice even toward enemies. The surah's focus on covenants, testimony, and legal ethics makes it the fullest treatment of 'adl in practice, including its hardest cases." },
    ],
  },

  shirk: {
    slug: 'shirk',
    term: 'شِرْك',
    transliteration: 'Shirk',
    pronunciation: 'SHIRK',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'The one sin declared unforgivable — placing anything alongside Allah in the heart.',
    hasFullEntry: true,
    summary: `Shirk — associating partners with Allah — is the Quran's supreme transgression, the sin explicitly declared unforgivable if unrepented: "Indeed, Allah does not forgive that partners be associated with Him, but He forgives what is less than that for whom He wills" (4:48). To understand why, you must understand what shirk actually is: it is not merely a theological error — it is a misalignment of the entire soul.

Everything the human person is made for — to know Allah, love Him, serve Him, turn to Him — is redirected. The person who commits shirk has given what belongs only to Allah to something else: fear, love, hope, obedience, worship. This is an injustice (zulm) so fundamental that Luqman calls it "the greatest injustice" (31:13) — not because Allah is harmed (He is not), but because the person has harmed themselves at the most essential level.

The scholars divided shirk into two categories: shirk akbar (major shirk) — the open worship of others alongside Allah, which exits one from Islam — and shirk asghar (minor shirk) — acts that partake of the structure of shirk without constituting outright polytheism. The most discussed form of minor shirk is riya' (showing off in worship) — doing an act of worship for human eyes rather than Allah's. The Prophet ﷺ called this "the thing I fear for you most." This internal shirk — the partnership of the ego and the world in what should be pure for Allah — is the spiritual struggle of every believer.`,
    root: {
      letters: 'ش–ر–ك',
      transliteration: 'sh–r–k',
      meaning: 'To share, to be a partner, to associate',
      elaboration: "The root sh-r-k means to be a partner, to associate, to have a share alongside another. A sharik is a partner or co-owner. Shirk in theology means giving any being a partnership with Allah in what belongs only to Him: worship, ultimate loyalty, the defining orientation of the heart. The structural problem is the 'alongside' — not that other things exist, but that they are placed beside Allah as if they were in the same category.",
    },
    occurrenceCount: 160,
    occurrenceNote: "The root sh-r-k and its derivatives appear approximately 160 times in the Quran — making it one of the most frequent topics. The frequency reflects the urgency of the message: shirk is the background against which tawhid must be understood, and its refutation is a central concern of the Quranic project.",
    keyAyahs: [
      {
        ref: '4:48',
        arabic: 'إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ',
        translation: 'Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills.',
        note: "The single most stark declaration about shirk in the Quran. The structure is important: everything else — every sin — is within the scope of divine forgiveness. Shirk alone is the exception, precisely because it attacks the foundation of the relationship between creature and Creator.",
      },
      {
        ref: '31:13',
        arabic: 'يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ ۖ إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ',
        translation: 'O my son, do not associate anything with Allah. Indeed, association is a great injustice.',
        note: "Luqman's first and most urgent teaching to his son. Shirk is called zulm 'azim — the greatest injustice. This reframes shirk as an ethical failure, not just a theological error: you have given the wrong thing the place that belongs to Allah.",
      },
      {
        ref: '39:65',
        arabic: 'وَلَقَدْ أُوحِيَ إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ',
        translation: 'And it has already been revealed to you and to those before you that if you associate with Allah, your work will surely become worthless.',
        note: "Even addressed to the Prophet ﷺ — the conditional is hypothetical — to show there are no exceptions. And the consequence: habat (the nullification of deeds). Shirk does not merely add a sin; it empties the account entirely.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Understanding tawhid first', arabic: 'فهم التوحيد أولاً', arabicTranslit: 'fahm al-tawḥīd awwalan', description: "You cannot recognize shirk without understanding tawhid. The scholars taught that Ibrahim ﷺ was so careful in his tawhid that every attachment — even to his son, even to his own life — was tested and released. Tawhid defines the standard; shirk is any deviation from it." },
        { number: 2, title: 'Vigilance about hidden shirk', arabic: 'اليقظة من الشرك الخفي', arabicTranslit: "al-yaqẓa min al-shirk al-khafiyy", description: "The Prophet ﷺ said 'the thing I fear for you most is minor shirk.' Riya' (showing off), 'ujb (self-admiration), ta'liq (attachment to omens) — these are the shirk of the subtle heart. Regular muhasaba is the guard against them." },
        { number: 3, title: 'Regular renewal of intention', arabic: 'تجديد النية', arabicTranslit: 'tajdīd al-niyya', description: "Because minor shirk enters through the intention, the renewal of intention (for Allah alone, not for praise, not for status) before each act of worship is the prophylactic. The sincere heart is the best defense." },
      ],
      stations: [
        { name: 'Major shirk (akbar)', description: "The open worship of other than Allah — idols, stars, leaders, anything given divine status. This exits a person from the fold of Islam and, if maintained until death, is unforgivable. This is the shirk the Quran most directly addresses historically." },
        { name: 'Minor shirk (asghar)', description: "Acts that partake of shirk's structure without constituting it fully: riya' (showing off), swearing by other than Allah, using amulets with the belief they ward off harm by themselves. These are grave sins but do not exit from Islam." },
        { name: 'Hidden shirk (khafi)', description: "The subtlest form: the heart's orientation toward other than Allah in its deepest desires, fears, and loves. The person who fears poverty more than Allah, who desires praise more than divine approval, whose decisions are made by what people will think — this is the spiritual struggle every believer faces." },
      ],
      questions: [
        { question: "What do I turn to first when I am afraid or in need? Is it Allah — or something else?", answer: "The reflex reveals the heart's actual orientation. The shirk of the heart is not always conscious; it shows in where we instinctively turn." },
        { question: "When I perform acts of worship, am I aware of being seen by people? Does that affect how I perform them?", answer: "This is the territory of riya'. The question is not whether others can see — they can — but whether their seeing changes the act. The act done the same in public and private, for Allah alone, is free of this form." },
        { question: "Is there anything in my life — a relationship, a status, a possession — that I could not release if Allah required it?", answer: "This is the question Ibrahim ﷺ was asked with his son. The attachment that cannot be released has become a form of shirk, even without worship. Tawhid requires that everything is held loosely, held for Allah." },
      ],
    },
    semanticField: [
      { slug: 'tawhid',  arabic: 'تَوْحِيد', transliteration: 'Tawhid',  relationship: 'parallels',     relationshipLabel: "Shirk's opposite", description: "Tawhid and shirk are the poles between which every human soul positions itself. Every act of genuine tawhid is a movement away from shirk; every compromise of tawhid is a movement toward it." },
      { slug: 'kufr',    arabic: 'كُفْر',   transliteration: 'Kufr',    relationship: 'parallels',     relationshipLabel: 'Related but distinct', description: "Shirk is a form of kufr — the disbeliever in tawhid is committing shirk. But not all kufr is shirk: one can deny the prophethood of Muhammad ﷺ without placing anything beside Allah. Shirk is the specific failure of tawhid." },
      { slug: 'ikhlas',  arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'parallels',     relationshipLabel: "The cure for minor shirk", description: "Ikhlas (sincerity) is the positive formulation of freedom from shirk. The mukhlisun are those who have purified their worship for Allah alone. Ikhlas is what remains when shirk is removed." },
      { slug: 'nifaq',   arabic: 'نِفَاق',  transliteration: 'Nifaq',   relationship: 'parallels',     relationshipLabel: 'Shirk of the exterior', description: "Nifaq (hypocrisy) and shirk overlap when the public display of worship conceals a heart directed elsewhere. The munafiq and the person of riya' share the structural failure: the exterior says Allah; the interior says other-than-Allah." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "The heart's health, purity, perfection, and joy are only possible through its total dedication to Allah — through its love, fear, hope, and action being for Allah alone. Every deviation from this is shirk in the heart, even if the tongue says tawhid.", source: "Al-Fawa'id" },
      { scholar: 'Ibn Taymiyya', text: "The foundation of Islam is the worship of Allah alone with no partner — and the abandonment of the worship of anything other than Him. Whoever fulfills this has completed the demands of la ilaha illa Allah.", source: "Majmu' al-Fatawa" },
      { scholar: 'Al-Hasan al-Basri', text: "Three things ruin good deeds: having good deeds praised while being pleased at that praise; mentioning one's own good deeds; and being grateful to Allah for them outwardly while being secretly pleased with oneself for them.", source: "Reported in various collections — the subtle forms of shirk" },
    ],
    hadith: [
      { ref: 'Ahmad', translation: "The thing I fear for you most is minor shirk.' They said: 'What is minor shirk, O Messenger of Allah?' He said: 'Riya' (showing off). Allah will say on the Day of Resurrection, when people are being given their recompense: 'Go to those for whom you were performing in the world and see if you find with them any reward.'", note: "This hadith locates the most dangerous shirk not in idol worship but in the heart's orientation toward human praise. The reward sought from humans will be sought from humans on the Day of Judgment — and Allah will have nothing to give." },
    ],
    acrossTransitions: `The concept of idolatry — giving divine status to what is not divine — is condemned across the Abrahamic traditions. In Jewish theology, the prohibition of avodah zarah (foreign worship/idolatry) is one of the most serious in the Torah, including the detailed prohibition of images in the Ten Commandments. The Talmudic discussion of idolatry as equivalent to violating the entire Torah parallels the Quranic treatment of shirk as the foundational violation.

In Christian theology, idolatry is condemned in both Testaments and was a central concern of the Reformation (Protestant rejection of veneration of saints and images). Augustine's concept of disordered love — loving finite things as if they were infinite — is structurally identical to shirk asghar: the misplacement of ultimate love and dependence.

What the Quran adds to the general prohibition of idolatry is the concept of the subtle, internal shirk — riya', 'ujb, the heart's dependence on human approval. Most religious traditions address visible idolatry; the Quran addresses the invisible forms with equal urgency. The battle against shirk is lifelong and internal.`,
    relatedTerms: [
      { slug: 'tawhid', transliteration: 'Tawhid', term: 'تَوْحِيد' },
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
      { slug: 'kufr',   transliteration: 'Kufr',   term: 'كُفْر'    },
      { slug: 'nifaq',  transliteration: 'Nifaq',  term: 'نِفَاق'   },
    ],
    goDeeper: [
      { slug: 'luqman',   surahName: 'Luqman',   note: "Contains 31:13 — the greatest injustice is shirk. Luqman's wisdom begins here — before all other moral instruction, the foundation must be right. The surah structures parental guidance as it should be structured: tawhid first, everything else from that foundation." },
      { slug: 'al-zumar', surahName: 'Al-Zumar', note: "Contains 39:65 — shirk nullifies all deeds, addressed even to the Prophet ﷺ. The surah opens with the command to worship Allah with khalisan (pure religion — ikhlas). The opposite of ikhlas is shirk, and Al-Zumar is the surah that most clearly articulates this opposition." },
    ],
  },

  kufr: {
    slug: 'kufr',
    term: 'كُفْر',
    transliteration: 'Kufr',
    pronunciation: 'KUFR',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Disbelief and ingratitude — the covering over of what the heart already knows.',
    hasFullEntry: true,
    summary: `Kufr is the most misunderstood term in Islamic discourse. Translated as "disbelief" or "unbelief," it is often treated as the simple absence of religious conviction — but the Arabic root reveals something more complex. The root k-f-r means to cover, to conceal, to bury. The kafir is not necessarily someone who has never heard the truth; the Quran's most charged usage of kufr is for those who know and cover — who have seen the signs, felt the fitrah (innate knowledge), and chosen to bury it.

This is why kufr is paired with ingratitude (both are rendered by the same word): the kafir in the sense of the ungrateful person has received gifts and concealed them, refuses to acknowledge the Giver. The farmer who covers seeds in the earth is a kafir in the agricultural sense — burying potential. The theological kafir covers the acknowledgment that the evidence demands. Both are acts of concealment.

The Quran uses kufr in a spectrum of meanings: the unbeliever who openly rejects, the ingrate who refuses to acknowledge divine gifts, the person who covers their fitrah with heedlessness, and the believer who commits kufr in a minor sense by ingratitude or rejection of a divine command. The range matters: kufr is not a binary on/off state but a disposition of concealment that operates in degrees.`,
    root: {
      letters: 'ك–ف–ر',
      transliteration: 'k–f–r',
      meaning: 'To cover, conceal, bury; to be ungrateful; to disbelieve',
      elaboration: "The root k-f-r has remarkable semantic breadth: the farmer is called kafir (one who buries seeds in the earth) in 57:20; the cloud is kafir (one that covers the sky); the person who is ungrateful is kafir (one who covers divine gifts with neglect); and the theological disbeliever is kafir (one who covers the truth they have been shown). All share the act of covering — preventing what exists from being seen or acknowledged.",
    },
    occurrenceCount: 525,
    occurrenceNote: "The root k-f-r and its derivatives appear approximately 525 times in the Quran — making it one of the most frequent roots in the entire text. The frequency reflects not only the importance of the concept but the Quran's constant engagement with those who reject: arguing, inviting, warning, explaining.",
    keyAyahs: [
      {
        ref: '2:6-7',
        arabic: 'إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ',
        translation: 'Indeed, those who disbelieve — it is all the same whether you warn them or do not warn them — they will not believe. Allah has sealed their hearts.',
        note: "Coming in the second surah, right after the description of the believers and the hypocrites, this verse describes the third type: those whose kufr has hardened into a permanent disposition. The sealing of the heart is not arbitrary punishment but the inevitable consequence of repeated choice to cover.",
      },
      {
        ref: '14:7',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
        translation: 'If you are grateful, I will certainly increase you in favor. But if you are ungrateful (kafar), indeed My punishment is severe.',
        note: "Here kufr is explicitly translated as ingratitude. The contrast is shukr/kufr — gratitude and its opposite. This verse shows that kufr operates in the realm of everyday response to divine blessing, not only in formal creedal rejection.",
      },
      {
        ref: '57:20',
        arabic: 'كَمَثَلِ غَيْثٍ أَعْجَبَ الْكُفَّارَ نَبَاتُهُ',
        translation: '...like a rain whose resulting plant growth delights the farmers (kuffar).',
        note: "Here kuffar unmistakably means farmers — those who bury seeds. This agricultural usage reveals the root meaning: covering, burying, concealing. The theological kufr participates in the same act: burying what should be brought to light.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognizing the spectrum of kufr', arabic: 'معرفة درجات الكفر', arabicTranslit: 'maʿrifat darajāt al-kufr', description: "Kufr is not binary. The major kufr exits from Islam; the kufr of ingratitude is a disposition every believer must guard against; the minor forms (denying the favor, refusing gratitude) are spiritual diseases requiring treatment, not excommunication." },
        { number: 2, title: 'Cultivating shukr as the antidote', arabic: 'تنمية الشكر', arabicTranslit: 'tanmiyat al-shukr', description: "Shukr (gratitude) is the direct opposite of kufr in the ingratitude sense. The believer who actively names, acknowledges, and responds to divine gifts is moving away from kufr and toward iman." },
        { number: 3, title: 'Attending to the fitrah', arabic: 'الانتباه إلى الفطرة', arabicTranslit: 'al-intibāh ilā al-fiṭra', description: "The fitrah (innate disposition toward truth) is the opposite of kufr: it is the uncovered, natural acknowledgment of the divine. Kufr covers the fitrah; iman uncovers it. The spiritual life is the project of clearing what covers the fitrah." },
      ],
      stations: [
        { name: 'Kufr of outright rejection', description: "Knowing the truth and explicitly refusing it. This is the kufr the Quran most directly addresses with the people of Makkah — those who heard the Prophet ﷺ and said 'no.'" },
        { name: 'Kufr of arrogance (kibr)', description: "Refusing truth because acceptance would require humbling oneself. Iblis is the archetype: he knew, and refused because he considered himself superior. This is kufr as ego defense." },
        { name: 'Kufr of heedlessness (ghafla)', description: "Not active rejection but the gradual covering of truth through distraction, busyness, and neglect. The heart does not say 'no' — it simply never says 'yes.' This is the most common form in comfortable societies." },
        { name: 'Kufr of ingratitude', description: "Receiving gifts and concealing them from acknowledgment — not thanking, not recognizing the Giver. This operates even within the heart of a formal Muslim if gratitude is absent." },
      ],
      questions: [
        { question: "In my daily life, am I acknowledging the source of what I have, or am I covering it with the attribution 'my effort' and 'my luck'?", answer: "This is kufr al-ni'ma — covering the gift by not attributing it to the Giver. Shukr is its antidote: naming what you have and naming from Whom it came." },
        { question: "Is there a truth I know but am covering because accepting it would require something of me I am not ready to give?", answer: "This is the internal kufr that believers must monitor. The covered truth becomes the obstruction. Facing it honestly is a form of iman." },
        { question: "Am I treating my fitrah — my innate knowledge of what is right and true — as an asset to develop or a disturbance to suppress?", answer: "The fitrah speaks; kufr is the choice to muffle it. Iman is the choice to listen." },
      ],
    },
    semanticField: [
      { slug: 'iman',    arabic: 'إِيمَان',  transliteration: 'Iman',    relationship: 'parallels',     relationshipLabel: "Kufr's opposite", description: "Iman (belief) and kufr (covering/disbelief) are the Quran's fundamental poles. Every human being is positioned somewhere between them. Iman uncovers; kufr covers. The movement of the spiritual life is from kufr toward iman." },
      { slug: 'shirk',   arabic: 'شِرْك',   transliteration: 'Shirk',   relationship: 'parallels',     relationshipLabel: 'Kufr of tawhid', description: "Shirk is the specific form of kufr that covers tawhid — replacing the acknowledgment of one God with the association of others. All shirk is kufr; not all kufr is shirk." },
      { slug: 'shukr',   arabic: 'شُكْر',   transliteration: 'Shukr',   relationship: 'parallels',     relationshipLabel: 'The antidote', description: "The Quran pairs shukr and kufr (14:7) as the two responses to divine gift. Shukr acknowledges, uncovers, returns gratitude; kufr conceals, ignores, denies. Every gift demands a response — shukr or kufr." },
      { slug: 'fitrah',  arabic: 'فِطْرَة', transliteration: 'Fitrah',  relationship: 'parallels',     relationshipLabel: "What kufr covers", description: "The fitrah is the innate, uncovered disposition toward truth and tawhid. Kufr is the covering of the fitrah — through conditioning, through arrogance, through heedlessness. Iman is the return to what the fitrah already knew." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Kufr is ingratitude for the bounty of knowledge, and ingratitude for the bounty of iman, and ingratitude for the bounty of creation — covering all that Allah has given with the covering of denial and refusal.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Raghib al-Asfahani', text: "The origin of kufr is covering — the kafir is the one who covers the truth after knowing it, or covers the gift after receiving it.", source: "Al-Mufradat fi Gharib al-Quran" },
      { scholar: 'Fakhr al-Din al-Razi', text: "Know that kufr is the opposite of iman. Iman is the heart's acknowledgment of what the Messenger brought. Kufr is the heart's refusal of it. But between clear kufr and clear iman there are many stations.", source: "Mafatih al-Ghayb" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "Two things among people are disbelief (kufr): reviling one's lineage and wailing over the dead.", note: "This hadith shows kufr used for specific behaviors that partake of kufr's quality — they represent a covering of the truth about human dignity and divine sovereignty — without exiting from Islam. This is the spectrum: kufr in behavior, not in creed." },
    ],
    acrossTransitions: `The concept of a fundamental human capacity to either acknowledge or deny truth — and the moral weight of that choice — is present across traditions. In Greek philosophy, anagnorisis (recognition) is the dramatic moment of acknowledgment; its absence is hamartia (the fatal flaw). Socrates believed no one chooses evil knowingly — ignorance is the root of all wrongdoing. The Quran disagrees: kufr is often chosen with knowledge.

In existentialist thought, bad faith (mauvaise foi) in Sartre is the refusal to acknowledge one's own freedom and responsibility — choosing to act as if one were determined when one is actually free. This is structurally similar to kufr as self-concealment: the person who has been given capacity, fitrah, and signs chooses not to see them.

In Jewish thought, cheit (sin) literally means "to miss the mark." The person who sins is not evil but mistaken — hitting the wrong target. Islamic kufr is closer to the willful covering: not missing the mark by accident but choosing to look away from it.`,
    relatedTerms: [
      { slug: 'iman',   transliteration: 'Iman',   term: 'إِيمَان'  },
      { slug: 'shirk',  transliteration: 'Shirk',  term: 'شِرْك'   },
      { slug: 'shukr',  transliteration: 'Shukr',  term: 'شُكْر'   },
      { slug: 'fitrah', transliteration: 'Fitrah', term: 'فِطْرَة' },
    ],
    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Opens with a typology of three groups — believers (2:2-5), disbelievers (2:6-7), and hypocrites (2:8-20). The kufr described in 2:6-7 is the hardened form — not the initial rejection but the kufr that has become a settled disposition after repeated choice." },
      { slug: 'ibrahim',    surahName: 'Ibrahim',    note: "Contains 14:7 — the shukr/kufr pairing as the two responses to divine blessing. The surah's theme of gratitude and ingratitude toward divine guidance makes it the fullest exploration of kufr in the ingratitude register." },
    ],
  },

  nifaq: {
    slug: 'nifaq',
    term: 'نِفَاق',
    transliteration: 'Nifaq',
    pronunciation: 'ni-FAAQ',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Hypocrisy — the gap between what is shown and what is held, wider than disbelief.',
    hasFullEntry: true,
    summary: `Nifaq — hypocrisy — is one of the most extensively treated subjects in the Quran. An entire surah (Al-Munafiqun) is devoted to it, and the munafiqun (hypocrites) are described in more psychological detail than almost any other group. What makes nifaq so dangerous, and why the Quran treats it with such urgency, is that it corrupts from within: the munafiq is neither an external enemy (whose approach can be seen) nor an honest disbeliever (whose position is known) but a third thing — someone who performs faith while harboring its opposite.

The Prophet ﷺ identified four signs of the munafiq: lying when speaking, breaking promises, betraying trust, and transgressing when in dispute. These are not theological positions but behavioral patterns — the gap between the presented self and the actual self, expressed in conduct. Nifaq is thus first a character disorder before it is a creedal one: the fragmentation of the person into a public face and a hidden reality.

The Quran places the munafiqun in the lowest depths of hellfire (4:145) — below the open disbelievers — because hypocrisy is a deeper betrayal. The kafir has refused the truth; the munafiq has claimed it while living its opposite. The damage done to the community, the trust violated, the deception maintained — these compound the basic rejection into something more corrosive.`,
    root: {
      letters: 'ن–ف–ق',
      transliteration: 'n–f–q',
      meaning: 'A tunnel, underground passage; to spend; to run out (of provisions)',
      elaboration: "The root n-f-q has an evocative range: nafaq is an underground tunnel (with two openings — one visible, one hidden); infaq is spending/giving; nafaqa is provision for a family. The hypocrisy sense comes from the tunnel image: the munafiq has two openings — one that faces believers, showing faith; and one that faces disbelievers, showing what is really there. The double-opening is the structural definition of hypocrisy.",
    },
    occurrenceCount: 37,
    occurrenceNote: "The root n-f-q in the hypocrisy sense appears approximately 37 times in the Quran, with the munafiqun featuring extensively in Medinan surahs — particularly Al-Baqarah, Al-Nisa', Al-Tawbah, and Al-Munafiqun. The extensive treatment reflects the historical reality of the Medinan community and its ongoing challenge.",
    keyAyahs: [
      {
        ref: '2:8-9',
        arabic: 'وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ ۝ يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ',
        translation: "And of the people are some who say, 'We believe in Allah and the Last Day,' but they are not believers. They [think they] deceive Allah and those who believe, but they deceive not except themselves.",
        note: "The opening portrait of nifaq in the Quran. The irony is precise: they try to deceive Allah (who cannot be deceived) and the believers — and succeed only in deceiving themselves. Nifaq is ultimately self-deception.",
      },
      {
        ref: '4:145',
        arabic: 'إِنَّ الْمُنَافِقِينَ فِي الدَّرْكِ الْأَسْفَلِ مِنَ النَّارِ',
        translation: 'Indeed, the hypocrites will be in the lowest depths of the Fire.',
        note: "The most stark statement about nifaq's gravity. Darek al-asfal — the lowest depth — is below the disbelievers. This reflects the extra betrayal of nifaq: it violates trust while claiming to honor it.",
      },
      {
        ref: '9:77',
        arabic: 'فَأَعْقَبَهُمْ نِفَاقًا فِي قُلُوبِهِمْ إِلَىٰ يَوْمِ يَلْقَوْنَهُ بِمَا أَخْلَفُوا اللَّهَ مَا وَعَدُوهُ وَبِمَا كَانُوا يَكْذِبُونَ',
        translation: 'So He penalized them with hypocrisy in their hearts until the Day they will meet Him — because they broke their promise to Allah and because they used to lie.',
        note: "Nifaq described as a consequence — not just a choice but what the heart becomes when broken promises and lies are repeated. The hypocrisy that hardened is the result of accumulated betrayal of one's own stated commitments.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Examining the gap between public and private', arabic: 'مراجعة الفجوة بين العلن والسر', arabicTranslit: "murājaʿat al-fajwa bayna al-ʿaln wa-l-sirr", description: "Nifaq is defined by the gap. The muhasaba that compares your private and public self is the primary diagnostic. Every believer has some gap — the aspiration is to reduce it, not pretend it does not exist." },
        { number: 2, title: 'Taking promises and covenants seriously', arabic: 'الجدية في الوعود والعهود', arabicTranslit: "al-jiddiyya fi-l-wuʿūd wa-l-ʿuhūd", description: "The Prophet ﷺ named promise-breaking as a sign of nifaq. The person who habitually says what they do not mean and does not do what they say is building the habits of the munafiq in character even without the theological dimension." },
        { number: 3, title: 'Vigilance about riya', arabic: 'اليقظة من الرياء', arabicTranslit: "al-yaqẓa min al-riyāʾ", description: "Riya' (showing off in worship) is the entry point of nifaq into the believer's heart. The act done for human eyes partakes of nifaq's structure: the shown and the hidden are different." },
      ],
      stations: [
        { name: 'Nifaq in belief (akbar)', description: "The munafiqun of Madinah: claiming faith while privately disbelieving. This is the major nifaq that exits from Islam and places one in the lowest depths of the fire." },
        { name: 'Nifaq in conduct (asghar)', description: "The Prophet ﷺ named four behavioral signs: lying, breaking promises, betraying trust, transgressing in disputes. These do not exit from Islam but corrode the character toward the structure of hypocrisy." },
        { name: 'Nifaq in worship (riya)', description: "The subtle form every believer must guard against: the prayer performed differently when others are watching; the sadaqa mentioned; the fast advertised. This is the hidden tunnel of nifaq opening into worship." },
      ],
      questions: [
        { question: "Are there things I say in one company that I would not say in another? What does that gap reveal?", answer: "Some social adjustment is wisdom; hypocrisy is the systematic performance of a self you do not hold. The question is whether the adjustment is situational (appropriate) or fundamental (dishonest)." },
        { question: "When I make commitments — to Allah, to people, to myself — do I follow through? What is my pattern?", answer: "The Prophet ﷺ named promise-breaking as a sign of nifaq. Not because one failure is definitive, but because habitual non-completion reveals a gap between intention and integrity." },
        { question: "Does my worship change when I know I am being observed? What does that reveal?", answer: "The test of riya' is this precisely. Muhasaba asks: if I were alone, completely unseen, would I pray the same way, give the same amount, fast with the same intention? The gap is the territory of riya'." },
      ],
    },
    semanticField: [
      { slug: 'ikhlas',  arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'parallels',     relationshipLabel: "Nifaq's opposite", description: "Ikhlas (sincerity) and nifaq are the poles of the inner life: ikhlas is having one opening, one face, one orientation — for Allah alone. Nifaq is having two. Every advance in ikhlas is a retreat from nifaq." },
      { slug: 'sidq',    arabic: 'صِدْق',   transliteration: 'Sidq',   relationship: 'parallels',     relationshipLabel: 'The cure for nifaq', description: "Sidq (truthfulness, integrity) is the direct antidote to nifaq. The sadiq means what they say, does what they commit to, and is the same in public and private. Nifaq is the failure of sidq at the deepest level." },
      { slug: 'kufr',    arabic: 'كُفْر',   transliteration: 'Kufr',   relationship: 'parallels',     relationshipLabel: 'Worse than kufr', description: "The Quran places the munafiqun below the disbelievers in punishment. Kufr is the open rejection of truth; nifaq is its concealment while claiming the opposite. The deception adds to the disbelief." },
      { slug: 'taqwa',   arabic: 'تَقْوَى', transliteration: 'Taqwa',  relationship: 'parallels',     relationshipLabel: "Taqwa's incompatibility with nifaq", description: "Taqwa is the consciousness of Allah that makes one behave the same in public and private (because Allah sees both). It is structurally incompatible with nifaq: the person who truly knows Allah is watching cannot maintain two faces." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Nifaq is of two types: that which concerns belief (nifaq al-i'tiqad) — which is the major hypocrisy that exits from Islam — and that which concerns conduct (nifaq al-'amal) — the four signs the Prophet ﷺ named. The second type is a disease that every believer must diagnose and treat in themselves.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Hasan al-Basri', text: "None feared hypocrisy except a believer, and none felt safe from it except a hypocrite.", source: "Reported in various collections — the companions feared nifaq more than any other spiritual disease" },
      { scholar: "Ibn Mas'ud", text: "The companions of the Prophet ﷺ — they knew that none feared hypocrisy for himself except a believer, and none felt safe from it except a munafiq.", source: "Reported by al-Bukhari in Al-Iman" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "Four characteristics — whoever has them all is a complete hypocrite. Whoever has one of them has one characteristic of hypocrisy until he abandons it: when he speaks, he lies; when he makes a promise, he breaks it; when he enters into an agreement, he betrays it; and when he disputes, he transgresses.", note: "This is the most important prophetic description of nifaq. It is entirely behavioral — no reference to creed, only to character. This is the warning for believers: nifaq can develop in the conduct even when the creed is intact." },
    ],
    acrossTransitions: `Hypocrisy as a moral failure — the gap between professed values and lived conduct — is condemned universally. Jesus's most intense denunciations were directed not at sinners but at hypocrites: "Woe to you, scribes and Pharisees, hypocrites!" (Matthew 23). The Greek word hypokrites originally meant "actor" — one who plays a role. The moral condemnation comes from treating religious life as performance.

In Confucian thought, the junzi (exemplary person) was characterized precisely by the unity of word and deed — saying what they mean and doing what they say. The small person (xiao ren) says one thing and does another. This is the Confucian parallel to nifaq and sidq.

In Stoic ethics, the consistent person (the sage) acts from their values in all circumstances — there is no "public" versus "private" version of the Stoic sage. Inconsistency of character is a sign of weakness and moral failure.

What is distinctive in the Islamic treatment of nifaq is its interior diagnosis: the munafiq does not just act hypocritically but has become hypocritical — the inner structure has changed. This is why the Quran describes the sealing of the hypocrite's heart (2:7) and the progression of nifaq from choice to disposition (9:77). The Islamic concern is not just behavioral compliance but the integrity of the inner person.`,
    relatedTerms: [
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
      { slug: 'sidq',   transliteration: 'Sidq',   term: 'صِدْق'    },
      { slug: 'kufr',   transliteration: 'Kufr',   term: 'كُفْر'    },
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى'  },
    ],
    goDeeper: [
      { slug: 'al-baqarah',  surahName: 'Al-Baqarah', note: "Contains the most extensive early portrait of the munafiqun (2:8-20), including the famous lamp parable (2:17) — they are people who lit a fire and when it illuminated them, Allah took away their light. The surah establishes the tripartite typology that the rest of the Quran develops." },
      { slug: 'al-munafiqun', surahName: 'Al-Munafiqun', note: "The surah dedicated entirely to nifaq — its psychology, its patterns, its warnings. 63:1-4 provides the most condensed portrait: they testify outwardly but Allah testifies that they are liars. Their forms are pleasing; their interiors are hollow." },
    ],
  },

  haqq: {
    slug: 'haqq',
    term: 'حَقّ',
    transliteration: 'Haqq',
    pronunciation: 'HAQQ',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: "Truth and right — the word that is also one of Allah's Names and the Quran's purpose.",
    hasFullEntry: true,
    summary: `Al-Haqq is one of Allah's Names — and haqq is one of the most fundamental concepts in the Quran. It means truth, reality, right, and rightful claim — all at once. In Arabic, haqq is not merely the opposite of falsehood; it is the word for what genuinely exists, what is authentically real, what has a rightful place. The opposite, batil, means void, empty, futile — what has no genuine reality, no rightful claim, no lasting substance.

The Quran comes to establish haqq against batil: to show what is real against what is illusory, what is right against what is wrong, what is genuine against what is pretense. "We have sent down to you the Book in truth" (2:176) — the Quran participates in haqq by being the divine word; it corresponds to reality as it actually is. Reading it is an encounter with what is genuinely real.

Haqq also means rightful claim — a person's haqq is what they are owed. Allah's haqq upon the servant is worship; the servant's haqq upon Allah (by His own promise) is mercy if they worshipped without shirk. The Quran's social ethics are built on haqq: the orphan's haqq, the poor person's haqq, the neighbor's haqq. Injustice is always the violation of haqq; justice is its fulfillment.`,
    root: {
      letters: 'ح–ق–ق',
      transliteration: 'ḥ–q–q',
      meaning: 'To be true, real, established, right; to confirm, verify',
      elaboration: "The root h-q-q conveys firmness, reality, and rightful establishment. Haqq is what is established, what has genuine being. Tahqiq means to verify, to make real. The opposite of haqq is batil (void, false) or zur (falsehood). Al-Haqq as a divine Name means that Allah is the only genuine reality — all else has contingent existence; He has necessary existence. He is the standard against which all else is measured.",
    },
    occurrenceCount: 287,
    occurrenceNote: "The root h-q-q appears approximately 287 times in the Quran — one of the most frequent roots. It appears as a divine Name (Al-Haqq), as the description of the Quran ('the Book in truth'), as the standard of judgment, as the description of the Day of Judgment (a reality that must come), and as a person's rightful claim.",
    keyAyahs: [
      {
        ref: '22:6',
        arabic: 'ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ وَأَنَّهُ يُحْيِي الْمَوْتَىٰ',
        translation: 'That is because Allah — He is the Haqq (Truth/Reality), and that He gives life to the dead.',
        note: "Al-Haqq as a divine Name: Allah is the truth in the most absolute sense — genuinely real, not contingent, the foundation of all that exists. This grounds the concept: the measure of all haqq is Allah Himself.",
      },
      {
        ref: '17:81',
        arabic: 'وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا',
        translation: 'And say: The truth has come, and falsehood has perished. Indeed, falsehood is ever-perishing.',
        note: "The Quranic logic of haqq and batil: batil is structurally incapable of enduring. It perishes not just occasionally but by its nature — zuhūq means perishing inevitably. The arrival of haqq is the departure of batil. This was said at the conquest of Makkah when the idols were toppled.",
      },
      {
        ref: '4:135',
        arabic: 'كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ',
        translation: 'Be persistently standing firm in justice, witnesses for Allah.',
        note: "Being a witness for Allah means testifying to haqq regardless of consequence. The shahid who witnesses in court is doing something sacred — they are the vehicle through which haqq reaches the world against batil.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Alignment with reality', arabic: 'الموافقة للواقع', arabicTranslit: 'al-muwāfaqa li-l-wāqiʿ', description: "Haqq is not constructed; it is discovered. The believer's orientation toward haqq means being willing to revise their beliefs and assumptions when evidence shows them to be in batil. Truth is not what is comfortable; it is what is real." },
        { number: 2, title: 'Speaking haqq regardless of who it is against', arabic: 'قول الحق على كل أحد', arabicTranslit: 'qawl al-ḥaqq ʿalā kulli aḥad', description: "The hardest dimension: speaking haqq even when it costs you, even against those you love, even against yourself. 4:135 demands this. The person who speaks haqq only when it is convenient has not yet practiced it." },
        { number: 3, title: 'Giving everyone their haqq', arabic: 'إيتاء كل ذي حق حقه', arabicTranslit: "ītāʾ kull dhī ḥaqq ḥaqqahu", description: "The prophetic command: 'Give every possessor of a right their right.' The daily practice of haqq is not philosophical; it is in fulfilling what is owed — to family, to employers, to the poor, to creation." },
      ],
      stations: [
        { name: "Haqq in belief", description: "Holding beliefs that correspond to reality — about Allah, about creation, about the self. This is tawhid as haqq: the truth about who Allah is and what He is not." },
        { name: "Haqq in speech", description: "Speaking truth — not just avoiding lies but actively saying what is real, even when silence would be more comfortable. Sidq is the expression of haqq in speech." },
        { name: "Haqq in action", description: "Acting on what is true and right — not what is convenient or pleasing. The person of haqq does not perform justice for approval; they do it because it is right." },
        { name: "Haqq in relationships", description: "Giving every person their due — their rights, their dignity, their haqq as a human being created by Allah. This is the social ethics of haqq." },
      ],
      questions: [
        { question: "Is there something I believe because I want it to be true, rather than because it is true? Am I holding a batil that I am calling haqq?", answer: "This is the most personal question haqq asks. The hardest batil to release is the one that serves us — the narrative about ourselves, about a relationship, about our own righteousness." },
        { question: "Have I given everyone in my life their haqq — their due rights, their owed treatment?", answer: "Haqq is not theoretical. It is the orphan's haqq, the neighbor's haqq, the employee's haqq. The daily audit of who is owed what." },
        { question: "When I speak, do I say what is true — or what is effective, pleasing, or safe?", answer: "Haqq in speech is the demand. Sidq (truthfulness) is its name. The gap between what is said and what is real is the gap where batil lives." },
      ],
    },
    semanticField: [
      { slug: 'adl',   arabic: 'عَدْل',  transliteration: "'Adl",   relationship: 'deepens',   relationshipLabel: "Justice gives haqq its social form", description: "'Adl is the distribution of haqq in social life — giving each person their right in the context of competing claims. Haqq names what is owed; 'adl names the practice of distributing it justly." },
      { slug: 'sidq',  arabic: 'صِدْق', transliteration: 'Sidq',   relationship: 'deepens',   relationshipLabel: "Haqq in speech", description: "Sidq is haqq expressed in language — correspondence between what is said and what is real. The sadiq is the person whose speech participates in haqq; the kadhib (liar) lives in batil." },
      { slug: 'zulm',  arabic: 'ظُلْم', transliteration: 'Zulm',   relationship: 'parallels', relationshipLabel: "Violation of haqq", description: "Zulm (oppression/injustice) is always the violation of haqq — putting something where it does not belong, withholding what is owed. Every act of zulm is a corruption of haqq; every act of haqq is a refusal of zulm." },
      { slug: 'tawhid', arabic: 'تَوْحِيد', transliteration: 'Tawhid', relationship: 'deepens', relationshipLabel: "The ultimate haqq", description: "Tawhid is the supreme haqq — the truth about Allah's oneness. All other haqq in the universe flows from this foundation. Shirk is the ultimate batil — the placement of partnership where none exists." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Haqq is the truth and reality that Allah has established — and it does not change with the change of times, the difference of people, or the desires of hearts. It is established and permanent.", source: "Miftah Dar al-Sa'ada" },
      { scholar: 'Al-Raghib al-Asfahani', text: "Haqq is: the thing that is affirmed and established. It is said of the thing whose existence is necessary or whose existence is fitting. Allah is Haqq because His existence is necessary.", source: "Al-Mufradat" },
      { scholar: 'Ali ibn Abi Talib', text: "Speak the haqq even if it is against you — for helping batil will harm you more than speaking haqq will.", source: "Reported in various collections" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "Give every possessor of a right their right (haqq).", note: "One of the most comprehensive prophetic commands. Every person, every creature, has a haqq. The prophetic ethics is the daily practice of giving what is owed — no more, no less." },
    ],
    acrossTransitions: `Truth as an ultimate value is universal, but the Arabic haqq carries a richness that goes beyond the English "truth." Haqq includes reality (what genuinely exists), rightness (what is correct), and rightful claim (what is owed). This triple meaning is rare in other languages.

In Greek philosophy, aletheia (truth, literally "un-concealment") is what Heidegger saw as the original Greek meaning — truth as bringing what is hidden into the open. This resonates with Islamic haqq as opposed to batil (void/concealment). Truth is what emerges; falsehood is what hides.

In Jewish thought, emet (truth) is one of the three pillars on which the world stands (Avot 1:18). The Talmud says the seal of the Holy Blessed One is truth — structurally identical to "Allah is Al-Haqq." Both traditions locate truth at the heart of divinity.

In the Vedantic tradition, sat (being, truth, reality) is the first of the three ultimate attributes of Brahman (sat-chit-ananda: being-consciousness-bliss). Haqq as "that which genuinely exists" shares this metaphysical weight: truth and being are inseparable.`,
    relatedTerms: [
      { slug: 'adl',   transliteration: "'Adl",   term: 'عَدْل'    },
      { slug: 'sidq',  transliteration: 'Sidq',   term: 'صِدْق'    },
      { slug: 'zulm',  transliteration: 'Zulm',   term: 'ظُلْم'    },
      { slug: 'tawhid', transliteration: 'Tawhid', term: 'تَوْحِيد' },
    ],
    goDeeper: [
      { slug: 'al-isra',  surahName: "Al-Isra'", note: "Contains 17:81 — 'the truth has come and falsehood has perished.' The verse is the Quranic distillation of what the Prophet's mission accomplished. Reading it in the context of the surah — between the Night Journey and the descriptions of what the Quran is — grounds it in history." },
      { slug: 'al-hajj',  surahName: 'Al-Hajj',  note: "Contains 22:6 — 'Allah is Al-Haqq.' The surah's sweeping vision of creation, destruction, resurrection, and divine power makes this Name feel earned rather than asserted." },
    ],
  },

  zulm: {
    slug: 'zulm',
    term: 'ظُلْم',
    transliteration: 'Zulm',
    pronunciation: 'ZULM',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Wrongdoing and oppression — the darkness the Quran cannot name without condemning.',
    hasFullEntry: true,
    summary: `Zulm is one of the Quran's most frequently named evils. The word covers an enormous range: oppression, injustice, wrongdoing, darkness — and the literal root meaning reveals why they are all one concept. Zulm means to put something in the wrong place — to displace, to misarrange, to give something more or less than it deserves. The night is called zulm in Arabic poetry because it covers (displaces) the light. The oppressor commits zulm because they have misplaced their power — they are using it where it does not belong and withholding what others are owed.

Allah declares that He does no zulm — and the Quran returns to this again and again. The remarkable thing is the way it is stated: "I do not wrong the servants" (50:29), "your Lord would never wrong anyone" (18:49), "Allah is not unjust to people at all — but people are unjust to themselves" (10:44). The final phrase is the deepest: the ultimate zulm is the zulm a person does to their own soul, by covering it with sin, by refusing guidance, by following the nafs into what destroys it.

The Quran describes the zalimun (wrongdoers) in vivid, repeated language — the Quran does not euphemize injustice. And it consistently promises that zulm will meet its reckoning: "Do not think Allah is unaware of what the wrongdoers are doing" (14:42). This is not comfort; it is a warning. The Quran's refusal to look away from zulm is part of its ethical power.`,
    root: {
      letters: 'ظ–ل–م',
      transliteration: 'ẓ–l–m',
      meaning: 'To put in the wrong place; darkness; injustice; oppression',
      elaboration: "The root ẓ-l-m has three overlapping senses: displacement (putting something where it does not belong), darkness (zulma is darkness — the covering of light), and injustice (the ethical consequence of displacement). The word for night (zulam) comes from this root, as does zalim (oppressor). The conceptual connection: injustice is a form of darkness — it covers what should be seen (rights, truth, dignity) and places what should not be there (harm, exploitation, lies).",
    },
    occurrenceCount: 315,
    occurrenceNote: "The root ẓ-l-m and its derivatives appear approximately 315 times in the Quran — making it one of the most frequently mentioned concepts. The Quran names zulm to condemn it, in every form: the zulm of shirk (31:13), the zulm of oppressors against the poor, the zulm of nations against prophets, and the zulm a person does to their own soul.",
    keyAyahs: [
      {
        ref: '10:44',
        arabic: 'إِنَّ اللَّهَ لَا يَظْلِمُ النَّاسَ شَيْئًا وَلَٰكِنَّ النَّاسَ أَنفُسَهُمْ يَظْلِمُونَ',
        translation: 'Indeed, Allah does not wrong people at all — but people wrong themselves.',
        note: "The most theologically significant zulm verse. Allah's absolute freedom from zulm is stated; then the diagnosis: the zulm in the world is human — and the deepest is the zulm people commit against their own souls through sin, heedlessness, and refusal of guidance.",
      },
      {
        ref: '14:42',
        arabic: 'وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ',
        translation: 'And do not think Allah is unaware of what the wrongdoers are doing.',
        note: "This verse comes as a warning to the oppressor and a consolation to the oppressed. The zalim's impunity is temporary and apparent. The Quran's promise is that no zulm escapes divine awareness — and its account will be settled.",
      },
      {
        ref: '42:41-42',
        arabic: 'وَلَمَنِ انتَصَرَ بَعْدَ ظُلْمِهِ فَأُولَٰئِكَ مَا عَلَيْهِم مِّن سَبِيلٍ ۝ إِنَّمَا السَّبِيلُ عَلَى الَّذِينَ يَظْلِمُونَ',
        translation: 'And whoever defends himself after being wronged — those have no blame upon them. The blame is only on those who wrong others.',
        note: "The Quran explicitly validates resistance to oppression. The mazlum (the wronged one) who defends themselves is not blameworthy. This is the Quranic foundation of the right to resist zulm — balanced by the strong discouragement of exceeding the equivalent.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Recognizing the forms of zulm', arabic: 'معرفة أشكال الظلم', arabicTranslit: 'maʿrifat ashkāl al-ẓulm', description: "Zulm is not only the dramatic oppression of tyrants. The scholars identified three levels: zulm in relation to Allah (shirk — 31:13 calls it 'the greatest zulm'), zulm between people (oppression, theft, violation of rights), and zulm of the self (sin that harms one's own soul)." },
        { number: 2, title: 'Not acquiescing to zulm', arabic: 'عدم الرضا بالظلم', arabicTranslit: 'ʿadam al-riḍā bi-l-ẓulm', description: "The Quran and the Prophet ﷺ command the resistance of zulm — not just one's own oppression but others'. 'Support your brother whether he is the oppressor or the oppressed' — meaning: if oppressor, restrain him from his oppression; if oppressed, help him against it." },
        { number: 3, title: 'Guarding against one\'s own zulm', arabic: 'الحذر من ظلم النفس', arabicTranslit: "al-ḥadhar min ẓulm al-nafs", description: "10:44 identifies the deepest zulm as the one a person does to themselves. The daily muhasaba asks: where have I misplaced something today? Where have I given my nafs what it wanted at the cost of my soul?" },
      ],
      stations: [
        { name: 'Zulm against Allah (shirk)', description: "31:13 — the greatest zulm. Placing anything in the position that belongs only to Allah — even temporarily, even subtly — is a displacement of the most fundamental order." },
        { name: 'Zulm against others', description: "The oppressor, the thief, the one who violates rights — all are committing zulm by displacing what belongs to others. The Prophet ﷺ said: 'Beware of oppression — for oppression will be darkness on the Day of Judgment.'" },
        { name: 'Zulm against the self', description: "The most commonly overlooked form: every sin a person commits is a zulm against their own soul. 7:23 — Adam and Hawwa said: 'Our Lord, we have wronged ourselves.' The first human acknowledgment in the Quran is the acknowledgment of self-zulm." },
      ],
      questions: [
        { question: "Where in my life am I misplacing things — giving some relationships too much, others too little? Giving the dunya what belongs to the akhira?", answer: "Zulm is displacement. The question is always: is this where it belongs? Does this relationship, this commitment, this time allocation, reflect the right order?" },
        { question: "Is there someone I am wronging — by action, by neglect, by failing to speak? Their haqq is being taken away.", answer: "The passive zulm of neglect is still zulm. The parent who neglects, the employer who underpays, the witness who stays silent — all are committing some form of displacement." },
        { question: "How am I wronging my own soul? What is the zulm I am committing against myself through my choices?", answer: "10:44 places the question here. The sins that seem to hurt only the self still constitute zulm — the soul is being displaced from its rightful state of iman, taqwa, and closeness to Allah." },
      ],
    },
    semanticField: [
      { slug: 'adl',   arabic: 'عَدْل',   transliteration: "'Adl",  relationship: 'parallels', relationshipLabel: "Zulm's opposite", description: "'Adl (justice) is the direct opposite of zulm. Where 'adl puts things in their right place, zulm displaces them. Every command for 'adl is a command against zulm." },
      { slug: 'haqq',  arabic: 'حَقّ',    transliteration: 'Haqq',  relationship: 'parallels', relationshipLabel: 'What zulm violates', description: "Zulm is always the violation of haqq — the rightful claim that is withheld or the right place that is usurped. Haqq names what belongs; zulm names the taking of what does not." },
      { slug: 'sabr',  arabic: 'صَبْر',   transliteration: 'Sabr',  relationship: 'precedes',  relationshipLabel: 'The response to zulm', description: "When zulm cannot be immediately remedied, sabr is the proper response — bearing the wrong without surrendering to despair or bitterness, while maintaining the right and working toward its restoration." },
      { slug: 'tawbah', arabic: 'تَوْبَة', transliteration: 'Tawbah', relationship: 'deepens',  relationshipLabel: 'The remedy for self-zulm', description: "The Quranic pattern is consistent: Adam and Hawwa committed zulm against themselves (7:23), then immediately made tawbah. For the zulm of sin, tawbah is the remedy. For zulm against others, restitution is required before tawbah is complete." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "The whole of zulm is: putting something in the wrong place. And the greatest zulm is shirk — putting worship where it does not belong. And the least zulm is: taking from your brother what is rightfully his.", source: "Madarij al-Salikin" },
      { scholar: 'Ibn Taymiyya', text: "Allah has made this world continue upon justice, even from disbelievers. And He has not made it continue upon zulm, even from believers. For justice is the order of all things; zulm is the destruction of all things.", source: "Al-Siyasa al-Shar'iyya" },
      { scholar: "Umar ibn al-Khattab", text: "Beware of oppression — for oppression will be darkness on the Day of Resurrection.", source: "Reported by various authorities" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "O My servants, I have made oppression forbidden for Myself and have made it forbidden among you, so do not oppress one another.", note: "This is the hadith qudsi (divine hadith, Allah speaking in first person) that most directly addresses zulm. Allah describes Himself as free of zulm and then extends that to a prohibition: the divine freedom from zulm becomes the template for human ethics." },
    ],
    acrossTransitions: `Injustice and oppression as moral evils are universal — no serious tradition defends them. But the Islamic concept of zulm has a distinctive scope: it includes shirk (the cosmic misplacement of Allah's right), self-harm (the zulm a person commits against their own soul), and social oppression. This triple scope is unusual.

In Greek thought, adikia (injustice) was Plato's opposite of justice — the disease of the soul in which the lower parts rule the higher. The inner disorder is justice's violation before it becomes external. This resonates with Islamic zulm against the self.

In Buddhist ethics, the concept of karma contains an implicit theory of zulm: harmful actions create suffering through their own logic. The oppressor is not just harming others; they are creating the conditions for their own future suffering. The Quran's promise that the zalim will face their reckoning has this structure: not arbitrary punishment but the natural consequence of displacement.

In Catholic social teaching, the concept of structural sin — the way unjust social structures perpetuate zulm against marginalized groups — parallels the Quranic concern for the mustad'afin (the oppressed — 4:75). The Quran is unusually explicit about God taking the side of the oppressed and holding the oppressor to account.`,
    relatedTerms: [
      { slug: 'adl',   transliteration: "'Adl",   term: 'عَدْل'    },
      { slug: 'haqq',  transliteration: 'Haqq',   term: 'حَقّ'     },
      { slug: 'sabr',  transliteration: 'Sabr',   term: 'صَبْر'    },
      { slug: 'tawbah', transliteration: 'Tawbah', term: 'تَوْبَة'  },
    ],
    goDeeper: [
      { slug: 'ibrahim', surahName: 'Ibrahim', note: "Contains 14:42 — 'do not think Allah is unaware of what the wrongdoers are doing.' The surah contextualizes this with the story of past nations destroyed for zulm — a historical argument that zulm never truly goes unanswered." },
      { slug: 'al-shura', surahName: 'Al-Shura', note: "Contains 42:41-42 — the right to defend oneself against zulm and the condemnation of the oppressor. The surah's treatment of the limits of retaliation (42:40-43) is the Quran's most nuanced teaching on the ethics of responding to zulm." },
    ],
  },

  birr: {
    slug: 'birr',
    term: 'بِرّ',
    transliteration: 'Birr',
    pronunciation: 'BIRR',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Comprehensive righteousness — the full expression of goodness in every direction.',
    hasFullEntry: true,
    summary: `Birr is the Quran's word for comprehensive righteousness — the full expression of goodness that extends in every direction simultaneously. The longest definition of birr in the Quran (2:177) is remarkable for what it includes: belief, charity, family relationships, keeping promises, and patience in adversity. The verse begins by telling you what birr is not (turning your face east or west in prayer, as a ritualistic performance) and then defines it as the full integration of faith and action.

The word birr shares a root with barr (land, as opposed to sea) — the expansive, solid, stable ground on which everything grows. Birr is the ethical ground of the believing life — not a single virtue but the integration of all virtues. The person of birr is not merely pious in mosque; they are righteous in every dimension of existence.

The Prophet ﷺ gave the simplest possible definition: "Birr is good character." This is precise — good character is not a list of rules followed but a quality of the person that expresses itself naturally in every context. The person of birr does not calculate whether to be kind, honest, generous; these things emerge from who they are. Birr is the fruit of the integrated, rightly-oriented person.`,
    root: {
      letters: 'ب–ر–ر',
      transliteration: 'b–r–r',
      meaning: 'To be righteous, good, kind; land, the firm ground',
      elaboration: "The root b-r-r overlaps between the physical (barr: land, stable ground) and the ethical (birr: righteousness, goodness). This connection is not accidental: birr is the stable ground of character, the solid foundation on which life can be built. Al-Barr is one of Allah's Names (52:28): the source of all goodness. The believer's birr participates in and reflects the divine quality.",
    },
    occurrenceCount: 20,
    occurrenceNote: "The root b-r-r appears approximately 20 times in the Quran: as a description of the comprehensive righteous person (2:177), as Allah's Name Al-Barr (52:28), as the description of Jannah ('the garden and abode of goodness'), and as the command to practice goodness toward parents (al-walidayn).",
    keyAyahs: [
      {
        ref: '2:177',
        arabic: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ',
        translation: 'Righteousness is not that you turn your faces toward the east or the west, but righteousness is in one who believes in Allah, the Last Day, the angels, the Book, and the prophets; and gives wealth, in spite of love for it...',
        note: "The most comprehensive definition of birr in the Quran — belief plus charity plus family plus covenants plus patience. The verse opens by rejecting ritualistic performance as a definition of birr. True birr is the whole person rightly oriented.",
      },
      {
        ref: '3:92',
        arabic: 'لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ',
        translation: 'You will never attain birr until you spend from what you love.',
        note: "Birr requires sacrifice — spending what you love, not just what is surplus. This verse was the occasion for several companions giving their most prized possessions. Birr is tested at the point of real cost.",
      },
      {
        ref: '52:28',
        arabic: 'إِنَّهُ هُوَ الْبَرُّ الرَّحِيمُ',
        translation: 'Indeed, He is Al-Barr (the Source of All Goodness), the Merciful.',
        note: "Al-Barr as a divine Name — Allah is the original and ultimate source of all birr. Human birr participates in and reflects the divine quality. The believer's goodness is not self-generated; it is a participation in Allah's goodness.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Integrated faith and action', arabic: 'التكامل بين الإيمان والعمل', arabicTranslit: 'al-takāmul bayna al-īmān wa-l-ʿamal', description: "Birr cannot be divided: faith without the corresponding action is not birr; action without the corresponding faith is not birr. 2:177 lists both together. The person of birr is whole." },
        { number: 2, title: 'Giving what costs', arabic: 'الإنفاق مما يُحب', arabicTranslit: 'al-infāq mimmā yuḥibb', description: "3:92 makes this explicit. The person of birr gives from what they love — not from surplus, not from what would be wasted anyway. This is the test of whether the goodness is genuine or economically convenient." },
        { number: 3, title: 'Good character as foundation', arabic: 'حسن الخلق', arabicTranslit: "ḥusn al-khuluq", description: "The Prophet ﷺ defined birr as good character. Character is what remains when performance is removed — what you do when no one is watching, who you are when nothing is at stake. Birr is the fruit of genuine character, not of careful performance." },
      ],
      stations: [
        { name: 'Birr toward Allah', description: "Belief and worship — fulfilling the obligations of iman fully. This is the first dimension of 2:177." },
        { name: 'Birr toward parents', description: "Al-walidayn (parents) are mentioned in the Quran alongside Allah repeatedly. The birr of children toward parents is one of the most emphasized ethical obligations in Islam." },
        { name: 'Birr toward people broadly', description: "The social dimension: fulfilling promises, giving the poor their share, treating everyone according to their haqq. This is the 'adl dimension of birr." },
        { name: 'Birr in adversity', description: "2:177 closes with patience in suffering — the person of birr is not good only when it is easy. They maintain their goodness under pressure, in loss, in hardship." },
      ],
      questions: [
        { question: "Is my goodness integrated — am I the same person in prayer and in my dealings? Or is there a gap between my ritual life and my ethical life?", answer: "2:177 refuses this gap. Birr is the integration of the two. The prayer that does not produce goodness in dealings has not yet produced birr." },
        { question: "Have I recently given something I actually love — not what is surplus or convenient?", answer: "3:92 is the test. The comfort zone of giving is surplus and convenience. Birr begins where comfort ends." },
        { question: "What is my character like when nothing is at stake — in private, in small matters, when no one I respect is watching?", answer: "Character is what we are in small things. The prophetic definition of birr as good character points here: birr is not a collection of performed virtues but the natural expression of who you actually are." },
      ],
    },
    semanticField: [
      { slug: 'taqwa',  arabic: 'تَقْوَى',  transliteration: 'Taqwa',  relationship: 'deepens',   relationshipLabel: 'Taqwa generates birr', description: "Taqwa (consciousness of Allah) is the inner orientation that produces birr. The muttaqi person — whose heart is turned toward Allah — expresses that orientation in the comprehensive goodness of birr." },
      { slug: 'ihsan',  arabic: 'إِحْسَان', transliteration: 'Ihsan',  relationship: 'deepens',   relationshipLabel: "Birr at its highest", description: "Birr is comprehensive goodness; ihsan is the excellence that exceeds what is required. Ihsan is birr at its highest expression — not just fulfilling obligations but beautifying them, not just giving what is owed but giving more." },
      { slug: 'shukr',  arabic: 'شُكْر',   transliteration: 'Shukr',  relationship: 'deepens',   relationshipLabel: 'Gratitude as birr in response', description: "Shukr toward Allah is a form of birr — responding to the divine goodness (Al-Barr) with acknowledgment and gratitude. The grateful person is practicing birr toward Allah in the dimension of recognition." },
      { slug: 'rahmah', arabic: 'رَحْمَة', transliteration: 'Rahmah', relationship: 'deepens',   relationshipLabel: "Mercy within birr", description: "Rahmah is the quality that makes birr warm rather than merely correct. The person of birr is not just right — they are kind. Rahmah ensures that comprehensive goodness does not become cold justice." },
    ],
    scholarsSaid: [
      { scholar: 'Al-Hasan al-Basri', text: "Birr is three things: fulfilling what Allah has made obligatory, avoiding what Allah has made forbidden, and accepting what Allah has decreed.", source: "Reported in Tafsir collections" },
      { scholar: 'Ibn al-Qayyim', text: "Birr is the name for all goodness — in belief, in action, in character, in speech, in intention. It is the comprehensive virtue that encompasses all other virtues.", source: "Madarij al-Salikin" },
      { scholar: 'Al-Nawawi', text: "The scholars said: birr in conduct and dealing means good character — and good character is to treat people well, to be patient with harm from them, to give cheerfully what one is able to give.", source: "Sharh Sahih Muslim" },
    ],
    hadith: [
      { ref: 'Muslim', translation: "Birr is good character (husn al-khuluq).", note: "The Prophet ﷺ's most concentrated definition — one sentence that contains an entire ethical tradition. Good character is not a rule followed but a quality of the person. Birr is the external expression of a well-ordered soul." },
      { ref: 'Tirmidhi', translation: "The believer reaches by good character the station of one who fasts all day and prays all night.", note: "Good character — birr in conduct — is placed on par with the most demanding physical worship. This is the Quran's values: what you do to people matters as much as what you do in prayer." },
    ],
    acrossTransitions: `Comprehensive righteousness — goodness that integrates faith, action, character, and social ethics — is the aspiration of every serious ethical tradition. In Jewish ethics, tzedakah (often translated as "charity" but literally "righteousness") has the same expansive quality as birr: it is not a single act but the comprehensive expression of right relationship with God and people.

In Confucian ethics, ren (benevolence, humaneness) is the supreme virtue — the comprehensive goodness that encompasses all other virtues when properly developed. The junzi (exemplary person) expresses ren in every relationship and context, which is exactly the Quranic portrait of birr in 2:177.

In Aristotelian ethics, eudaimonia (flourishing, sometimes translated as "happiness") is the state of the person who has all the virtues operating well in an integrated life. Birr has this quality: it is not one virtue but the integration of all virtues into a coherent person. The person of birr is flourishing in the Islamic sense.`,
    relatedTerms: [
      { slug: 'taqwa',  transliteration: 'Taqwa',  term: 'تَقْوَى'  },
      { slug: 'ihsan',  transliteration: 'Ihsan',  term: 'إِحْسَان' },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة'  },
      { slug: 'adl',    transliteration: "'Adl",   term: 'عَدْل'    },
    ],
    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains 2:177 — the fullest definition of birr in the Quran. The verse comes in the context of the qibla change (from Jerusalem to Makkah), teaching that the direction of prayer matters less than the quality of the person praying." },
      { slug: 'al-imran',   surahName: "Al-Imran",   note: "Contains 3:92 — 'you will never attain birr until you spend from what you love.' The surah's theme of sacrifice and commitment in the face of trial makes this verse the test of whether the birr of 2:177 is real or theoretical." },
    ],
  },

  ummah: {
    slug: 'ummah',
    term: 'أُمَّة',
    transliteration: 'Ummah',
    pronunciation: 'UM-mah',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'Community — the body of believers across time and space, responsible for each other.',
    hasFullEntry: true,
    summary: `Ummah is one of the most theologically significant community concepts in world religion. It is not merely a religious group, a nation, or a culture — it is the community constituted by shared commitment to Allah, spanning time, geography, ethnicity, and language. The Muslim in Senegal and the Muslim in Indonesia, the Muslim in the 7th century and the Muslim today, are all members of one ummah — one body, one community of witness and responsibility.

The Quran describes this ummah with the task of being witnesses to humanity: "We have made you a median (wasatan) community so that you may be witnesses over the people, and the Messenger may be a witness over you" (2:143). The ummah is not merely a community of the saved; it is a community with a mission — to bear witness to the divine message in the world. This is why the Quran's description of the ummah is always accompanied by an ethical charge: to command the good, forbid the evil, and believe in Allah (3:110).

The Prophet ﷺ described the ummah as "one body" — when one part suffers, the whole body responds with fever and sleeplessness. This is the ethical aspiration embedded in the theological concept. The ummah is not a passive identity; it is an active solidarity. And in the Quran's expanded usage, the prophetic communities of all times — the ummah of Musa, of Isa, of Ibrahim — are all ummahs in the same sense: communities constituted by shared prophetic commitment.`,
    root: {
      letters: 'أ–م–م',
      transliteration: 'ʾ–m–m',
      meaning: 'Mother; to intend, to lead; direction, model',
      elaboration: "The root ʾ-m-m is the root of umm (mother), imam (leader, the one who is followed), ummah (community, nation, the body that follows a leader or shares a direction), and amama (in front of, ahead). The conceptual thread: the ummah is a community that follows a single direction — the direction the prophet/imam leads toward. As the mother is the origin and center of the family, the ummah is the human community organized around its divine direction.",
    },
    occurrenceCount: 64,
    occurrenceNote: "Ummah appears approximately 64 times in the Quran in various senses: the Muslim community (2:143, 3:110), the community of a particular prophet (previous ummahs — 7:38, 16:36), a group that is a model (2:128 — Luqman as ummah, meaning a model), and the community of animals (6:38). The range reveals that ummah is a versatile concept of organized community with shared direction.",
    keyAyahs: [
      {
        ref: '2:143',
        arabic: 'وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِّتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ',
        translation: 'And thus We have made you a median community so that you may be witnesses over the people.',
        note: "The ummah's defining description and mission. Wasan (median, middle, balanced) — not extreme in any direction. The mission: witnesses over humanity. The ummah is not for itself; it is constituted for testimony on behalf of the world.",
      },
      {
        ref: '3:110',
        arabic: 'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ',
        translation: 'You are the best community ever raised for humanity: you command what is right, forbid what is wrong, and believe in Allah.',
        note: "The khayra ummah — the best community — is defined by three things: amr bil ma'ruf (commanding good), nahy 'an al-munkar (forbidding wrong), and iman. The 'best' is conditional and earned, not assumed. The ummah is 'best' insofar as it fulfills these three.",
      },
      {
        ref: '49:10',
        arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
        translation: 'The believers are nothing but brothers.',
        note: "The internal relationship of the ummah — brotherhood (ukhuwwah). This is the affective and ethical bond that makes ummah more than a category. Brothers are responsible for each other, intercede for each other, feel each other's pain.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: 'Shared direction toward Allah', arabic: 'الاتجاه المشترك نحو الله', arabicTranslit: 'al-ittijāh al-mushtarak naḥw Allāh', description: "The ummah is constituted by following the same imam (leader) and the same direction — the path of Allah. Without this shared orientation, what exists is merely a cultural or political group." },
        { number: 2, title: 'Active solidarity', arabic: 'التضامن الفعال', arabicTranslit: 'al-taḍāmun al-faʿʿāl', description: "The Prophet ﷺ's 'one body' hadith is a call to active response to suffering in the ummah. Passive membership in the ummah is not the prophetic standard. The standard is feeling the fever when any part of the body is ill." },
        { number: 3, title: "Amr bil ma'ruf, nahy 'an al-munkar", arabic: 'الأمر بالمعروف والنهي عن المنكر', arabicTranslit: "al-amr bi-l-maʿrūf wa-l-nahy ʿan al-munkar", description: "3:110 makes the ummah's quality conditional on this practice: commanding good and forbidding wrong. The ummah that abandons this responsibility has abandoned what makes it the 'best community.'" },
      ],
      stations: [
        { name: 'Ummah as identity', description: "Knowing that you belong to a body that transcends your family, tribe, nation, and ethnicity. The first station is the awareness: I am part of something larger." },
        { name: 'Ummah as responsibility', description: "What 3:110 demands — active engagement in the moral life of the community: commanding good, forbidding wrong, witnessing to truth. The ummah member is not a passive beneficiary." },
        { name: 'Ummah as solidarity', description: "The active response to suffering wherever it is in the ummah: du'a, material support, advocacy, witness. The Prophet ﷺ said: 'The believer is the mirror of his brother' — what you see in a mirror, you respond to." },
      ],
      questions: [
        { question: "Do I experience the ummah as a real bond — does what happens to Muslims in distant lands affect me? Should it?", answer: "The 'one body' hadith is a standard, not merely a description. The aspiration is to cultivate this solidarity — to develop the capacity to feel what happens elsewhere as real." },
        { question: "Am I contributing to the ummah's mission — witnessing to truth, commanding good, forbidding wrong — in my own sphere?", answer: "3:110 is conditional: the ummah is 'best' insofar as it fulfills this function. Each member's contribution begins in their own context." },
        { question: "How do I contribute to unity within the ummah — and how do I contribute to its fragmentation?", answer: "The Quran repeatedly warns against the fragmentation of the ummah. The examination of one's own role — in speech, in allegiance, in the handling of disagreement — is necessary." },
      ],
    },
    semanticField: [
      { slug: 'iman',    arabic: 'إِيمَان',  transliteration: 'Iman',    relationship: 'deepens',   relationshipLabel: "Iman constitutes the ummah", description: "The ummah is constituted by shared iman — the community of belief. The moment of shahada is the moment of joining the ummah. Without iman, there is culture or politics; with iman, there is ummah." },
      { slug: 'adl',     arabic: 'عَدْل',   transliteration: "'Adl",    relationship: 'deepens',   relationshipLabel: 'Justice within the community', description: "The ummah requires 'adl internally — justice in its own dealings, in how it treats its members, in how it handles disputes. The ummah that practices injustice internally cannot witness to justice externally." },
      { slug: 'rahmah',  arabic: 'رَحْمَة', transliteration: 'Rahmah',  relationship: 'deepens',   relationshipLabel: "Mercy as the ummah's internal bond", description: "The brotherhood of the ummah (49:10) is made real by rahmah — mercy, compassion, care for one another. The ummah of hardness and judgment is not fulfilling its internal calling." },
      { slug: 'dawah',   arabic: 'دَعْوَة', transliteration: "Da'wah",  relationship: 'deepens',   relationshipLabel: "The ummah's external mission", description: "Da'wah is the external dimension of the ummah's mission — the witness to the world that 2:143 describes. The ummah that turns inward and loses its sense of witness to humanity has forgotten its purpose." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn Khaldun', text: "The cohesion of the ummah ('asabiyya based on iman) is stronger than any tribal or ethnic solidarity — because it is grounded in something eternal, while tribal bonds are temporary.", source: "Al-Muqaddima" },
      { scholar: 'Sayyid Qutb', text: "The ummah is not a nation in the geographic or ethnic sense — it is a community of faith and purpose, scattered across the earth but united in direction.", source: "Fi Zilal al-Quran" },
      { scholar: "Muhammad Iqbal", text: "The ummah transcends race, color, language, and geography. It is the living embodiment of a divine idea in human history.", source: "The Reconstruction of Religious Thought in Islam" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "The parable of the believers in their love, mercy, and compassion for each other is like the body: when one part of it suffers, the whole body responds with fever and sleeplessness.", note: "The most famous prophetic description of the ummah's internal solidarity. The aspiration is not just fellow-feeling but a genuine sensitivity to the suffering of any part — regardless of geography or relationship." },
    ],
    acrossTransitions: `The concept of a transnational, transethnic religious community with shared identity and mutual obligation is one of Islam's most distinctive contributions to political thought. In most pre-modern thought, community was defined by kinship, geography, or political power. The ummah defined community by shared commitment to divine guidance — a genuinely novel principle.

In Christian thought, the universal Church — the body of Christ — has a similar aspiration: a community that transcends ethnicity and nationality. Paul's "there is neither Jew nor Greek... for you are all one in Christ Jesus" (Galatians 3:28) has the same universalizing impulse. The different emphasis: Christianity's universal community is organized around sacrament and creed; Islam's ummah is organized around iman and practice.

In modern political thought, Benedict Anderson's concept of "imagined communities" — nations as communities whose members never meet but imagine themselves as united — provides an analytical framework. The ummah is an imagined community in this sense: vastly too large for its members to know each other, but genuinely experienced as a bond. The difference from secular nationalism: the ummah is constituted not by language, ethnicity, or territory but by shared orientation toward Allah.`,
    relatedTerms: [
      { slug: 'iman',   transliteration: 'Iman',   term: 'إِيمَان'  },
      { slug: 'dawah',  transliteration: "Da'wah", term: 'دَعْوَة'  },
      { slug: 'adl',    transliteration: "'Adl",   term: 'عَدْل'    },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة'  },
    ],
    goDeeper: [
      { slug: 'al-baqarah', surahName: 'Al-Baqarah', note: "Contains 2:143 — the wasat ummah, the median community of witnesses. The context (the qibla change from Jerusalem to Makkah) situates the ummah in relation to previous communities — inheriting their mission while being its final expression." },
      { slug: 'al-hujurat',  surahName: 'Al-Hujurat', note: "The surah of community ethics — how the ummah is to treat its own members: verifying news (49:6), not mocking each other (49:11), avoiding suspicion (49:12), reconciling disputes (49:9). It is the internal constitution of the ummah." },
    ],
  },

  dawah: {
    slug: 'dawah',
    term: 'دَعْوَة',
    transliteration: "Da'wah",
    pronunciation: 'DAA-wah',
    category: 'Theology & Ethics' as GlossaryCategory,
    evocativeLine: 'The call — inviting to Allah with wisdom and beautiful speech.',
    hasFullEntry: true,
    summary: `Da'wah is the call — the invitation to Allah, to His guidance, to the way of truth. The Quran describes it as the finest thing a person can say: "Who is better in speech than one who calls to Allah, does righteous deeds, and says 'Indeed, I am one of the Muslims'?" (41:33). Three things constitute the best speech: calling to Allah, living rightly, and identifying with the ummah of submission. Da'wah is the external expression of iman turned toward the world.

The method is as important as the message. 16:125 gives the three-part methodology: wisdom (hikmah), beautiful instruction (al-maw'izah al-hasanah), and gracious argumentation (al-jadal bi-allati hiya ahsan). Da'wah is not pressure, not argument for victory, not contempt for the one who has not yet seen. It is a gift — an invitation — offered with the beauty and care of a gift.

The Quran also establishes the limit of da'wah: "There is no compulsion in religion" (2:256). The caller calls; the hearer decides. The Prophet ﷺ is told explicitly: "Indeed, you do not guide whom you love, but Allah guides whom He wills" (28:56). This humbles the caller: the outcome is not in their hands. The responsibility is to call beautifully, sincerely, with wisdom — and then to leave the result with Allah.`,
    root: {
      letters: 'د–ع–و',
      transliteration: 'd–ʿ–w',
      meaning: "To call, invite, summon, pray, name",
      elaboration: "The root d-ʿ-w covers calling in every register: da'wa is an invitation to a meal; du'a is prayer (calling upon Allah); da'wah in the religious sense is the call to the faith. The common thread is the act of calling — turning to someone and inviting their response. Da'wah to Allah is the grandest form: calling humanity toward its most important relationship.",
    },
    occurrenceCount: 212,
    occurrenceNote: "The root d-ʿ-w appears approximately 212 times in the Quran in its various forms — one of the most frequent roots. Most occurrences are in the sense of du'a (supplication) or calling upon Allah. The da'wah sense (inviting others to Allah) appears in key methodological passages: 16:125, 41:33, 12:108.",
    keyAyahs: [
      {
        ref: '16:125',
        arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ',
        translation: 'Call to the way of your Lord with wisdom, beautiful instruction, and argue with them in the best manner.',
        note: "The complete methodology of da'wah in one verse. Hikmah (wisdom — reading the person and moment), maw'izah hasanah (beautiful instruction — not harsh or condescending), jadal bi-llati hiya ahsan (the most gracious form of argument — not to defeat but to illuminate). The method is itself the message.",
      },
      {
        ref: '41:33',
        arabic: 'وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ',
        translation: 'And who is better in speech than one who calls to Allah, does righteous deeds, and says: I am indeed of those who submit?',
        note: "Da'wah paired with righteous deeds and personal identification with the faith. The caller who calls to what they do not live, or who distances themselves from the community they represent, has broken the three-part formula.",
      },
      {
        ref: '12:108',
        arabic: 'قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي',
        translation: 'Say: This is my way — I call to Allah with clear understanding, I and those who follow me.',
        note: "Da'wah 'ala basira — calling with insight, with genuine knowledge of what one is calling to. The caller who does not know what they are inviting people toward cannot give the invitation honestly.",
      },
    ],
    practicalSection: {
      conditions: [
        { number: 1, title: "Living what you call to", arabic: 'تطبيق ما تدعو إليه', arabicTranslit: 'taṭbīq mā tadʿū ilayhi', description: "41:33 joins da'wah with 'amal salih (righteous deeds). The caller who calls to patience must be patient; who calls to honesty must be honest. The life is the most powerful da'wah." },
        { number: 2, title: 'Knowledge of what you are calling to', arabic: 'العلم بما تدعو إليه', arabicTranslit: "al-ʿilm bimā tadʿū ilayhi", description: "12:108 demands basira — clear seeing, genuine knowledge. Da'wah without knowledge produces misinformation. The caller must know what they are presenting with enough depth to represent it honestly." },
        { number: 3, title: 'Letting the outcome go', arabic: 'ترك النتيجة لله', arabicTranslit: 'tark al-natīja li-llāh', description: "28:56 — the Prophet ﷺ is told that guidance is in Allah's hands. The caller's responsibility is to call beautifully and sincerely. The result belongs to Allah. The caller who measures their success by conversion rates has misunderstood da'wah." },
      ],
      stations: [
        { name: "Da'wah through character", description: "The life lived well, the character that attracts — this is the most powerful and most universal form of da'wah. The Prophet ﷺ's character was a living invitation." },
        { name: "Da'wah through knowledge", description: "Answering questions, clarifying misconceptions, presenting the faith with accuracy and depth. This requires learning — you cannot give what you do not have." },
        { name: "Da'wah through beauty", description: "The Quran's method — calling to the good with the good. The beauty of recitation, the beauty of generosity, the beauty of how a Muslim treats others — these are all da'wah." },
        { name: "Da'wah as witness", description: "2:143 — the ummah as witnesses over humanity. This is the collective da'wah: a community that embodies the values it professes becomes a visible argument for those values." },
      ],
      questions: [
        { question: "Is my life itself a form of da'wah? If people observe me without any words, what am I inviting them toward?", answer: "The Prophet ﷺ was asked about by people who had never heard him speak — they were drawn by what they had seen. Character is the most durable da'wah." },
        { question: "When I speak about Islam, am I doing so with wisdom — reading the person, the moment, the need? Or am I speaking at them?", answer: "16:125 demands hikmah — the reading of the situation. Da'wah without hikmah is speech about Islam, not an invitation to Allah." },
        { question: "Am I attached to outcomes? Can I call with sincerity and leave the result entirely with Allah?", answer: "The caller who needs the hearer to accept has made da'wah about themselves. The caller who can leave the result with Allah has understood whose da'wah it actually is." },
      ],
    },
    semanticField: [
      { slug: 'hikmah',  arabic: 'حِكْمَة',  transliteration: 'Hikmah', relationship: 'deepens',   relationshipLabel: "The method of da'wah", description: "16:125 places hikmah as the first method of da'wah. Da'wah without hikmah — wisdom in reading the person and moment — can repel what it intends to invite." },
      { slug: 'rahmah',  arabic: 'رَحْمَة', transliteration: 'Rahmah', relationship: 'deepens',   relationshipLabel: "The spirit of da'wah", description: "Da'wah is an act of rahmah — wanting good for the other person, wanting them to find what you have found. Without rahmah, da'wah becomes argument for victory; with it, it becomes genuine invitation." },
      { slug: 'ummah',   arabic: 'أُمَّة',  transliteration: 'Ummah',  relationship: 'deepens',   relationshipLabel: "Da'wah as the ummah's mission", description: "2:143 makes the ummah's identity as witnesses the basis of its existence. Da'wah is the external expression of ummah identity — a community that exists for humanity." },
      { slug: 'ikhlas',  arabic: 'إِخْلَاص', transliteration: 'Ikhlas', relationship: 'deepens',   relationshipLabel: "Sincerity in the call", description: "Da'wah done for reputation, for community status, or for the pleasure of winning is not da'wah to Allah — it is da'wah to the self. Ikhlas (sincerity) ensures the call is directed toward Allah, not the caller." },
    ],
    scholarsSaid: [
      { scholar: 'Ibn al-Qayyim', text: "Da'wah to Allah is the noblest of all actions — because the caller invites people from the prison of this world to its expanse, from the narrowness of sin to the openness of obedience, from the subjugation of other than Allah to the freedom of worshipping Allah alone.", source: "Madarij al-Salikin" },
      { scholar: 'Imam al-Nawawi', text: "The caller to Allah should be gentle, patient, forbearing — because roughness will drive people away from the truth, while gentleness attracts them to it.", source: "Al-Adhkar" },
      { scholar: 'Al-Ghazali', text: "The scholar who acts on his knowledge and calls others to it is like the sun: it gives light to others while itself remaining bright. Whoever calls to Allah while not acting on his knowledge is like the moon that reflects light it does not itself have.", source: "Ihya' Ulum al-Din" },
    ],
    hadith: [
      { ref: 'Bukhari & Muslim', translation: "Guide one person through you and it is better for you than red camels (the most valued wealth of the Arabs).", note: "The enormous weight placed on a single successful da'wah. But note: the success is the guidance, which is in Allah's hands. The believer's role is to be the channel — 'through you' — not the source of guidance." },
    ],
    acrossTransitions: `The practice of inviting others to one's faith — and the ethics of how to do so — varies enormously across traditions. In Christianity, the Great Commission (Matthew 28:18-20) commands disciples to "go and make disciples of all nations." This missionary imperative has driven both extraordinary good (education, healthcare, translation) and immense harm (forced conversion, cultural destruction).

Islam's da'wah tradition has a distinctive principle that Christian missions often struggled with: "There is no compulsion in religion" (2:256). The invitation is genuine — the hearer is free. This freedom is constitutive of genuine da'wah: an invitation that cannot be refused is not an invitation.

In Buddhist thought, the concept of "skillful means" (upaya) — adapting the teaching to the student's capacity and need — is the closest parallel to Islamic hikmah in da'wah. The Buddha is described as understanding his audience and teaching each person what they could receive. 16:125 describes the same principle: wisdom means reading the person and the moment.`,
    relatedTerms: [
      { slug: 'hikmah', transliteration: 'Hikmah', term: 'حِكْمَة'  },
      { slug: 'rahmah', transliteration: 'Rahmah', term: 'رَحْمَة'  },
      { slug: 'ummah',  transliteration: 'Ummah',  term: 'أُمَّة'   },
      { slug: 'ikhlas', transliteration: 'Ikhlas', term: 'إِخْلَاص' },
    ],
    goDeeper: [
      { slug: 'al-nahl',    surahName: 'Al-Nahl',     note: "Contains 16:125 — the complete methodology of da'wah. The surah is itself an exhibition of da'wah: every creation described is an argument for the Creator." },
      { slug: 'fussilat',   surahName: 'Fussilat',    note: "Contains 41:33 — 'who is better in speech than one who calls to Allah.' The surah's name means 'explained in detail' — da'wah requires that things be explained clearly and beautifully. The surah itself demonstrates what it commands." },
    ],
  },
}
