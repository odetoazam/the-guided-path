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
  { slug: 'sidq',       term: 'صِدْق',      transliteration: 'Sidq',       category: 'States of the Heart', evocativeLine: 'Truthfulness so complete that the inner and outer become one.',                          hasFullEntry: false },
  { slug: 'tawadu',     term: 'تَوَاضُع',   transliteration: "Tawadu'",    category: 'States of the Heart', evocativeLine: 'Humility that knows where it stands — not self-deprecation but honest seeing.',          hasFullEntry: false },
  { slug: 'zuhd',       term: 'زُهْد',      transliteration: 'Zuhd',       category: 'States of the Heart', evocativeLine: 'Detachment from the world — not hating it, but not being owned by it.',                  hasFullEntry: false },
  { slug: 'wara',       term: 'وَرَع',      transliteration: "Wara'",      category: 'States of the Heart', evocativeLine: 'Scrupulous caution — leaving even the doubtful for fear of the forbidden.',              hasFullEntry: false },
  { slug: 'hayaa',      term: 'حَيَاء',     transliteration: "Hayaa'",     category: 'States of the Heart', evocativeLine: 'The modesty that guards — the eyes, the tongue, the heart, and the limbs.',             hasFullEntry: false },
  { slug: 'qanah',      term: 'قَنَاعَة',   transliteration: "Qana'ah",    category: 'States of the Heart', evocativeLine: "Contentment with what Allah has given — the richness that needs no addition.",           hasFullEntry: false },
  { slug: 'muraqaba',   term: 'مُرَاقَبَة', transliteration: 'Muraqaba',   category: 'States of the Heart', evocativeLine: 'The awareness of being watched — living as though you can see Allah, knowing He sees you.', hasFullEntry: false },
  { slug: 'muhasaba',   term: 'مُحَاسَبَة', transliteration: 'Muhasaba',   category: 'States of the Heart', evocativeLine: 'The daily accounting of the self — before you are called to account.',                   hasFullEntry: false },
  { slug: 'inabah',     term: 'إِنَابَة',   transliteration: 'Inabah',     category: 'States of the Heart', evocativeLine: 'Turning to Allah with the whole soul — more urgent and total than tawbah.',              hasFullEntry: false },
  { slug: 'tafakkur',   term: 'تَفَكُّر',   transliteration: 'Tafakkur',   category: 'States of the Heart', evocativeLine: 'The deliberate use of reason to see signs — thinking as an act of worship.',             hasFullEntry: false },
  { slug: 'dhikr',      term: 'ذِكْر',      transliteration: 'Dhikr',      category: 'States of the Heart', evocativeLine: "The remembrance of Allah — the heart's breath, without which it suffocates.",            hasFullEntry: false },
  { slug: 'hilm',       term: 'حِلْم',      transliteration: 'Hilm',       category: 'States of the Heart', evocativeLine: 'Forbearance that absorbs harm without retaliation — the strength to be still.',          hasFullEntry: false },
  { slug: 'uns',        term: 'أُنْس',      transliteration: 'Uns',        category: 'States of the Heart', evocativeLine: 'Intimacy with Allah — the sweetness of His presence that makes solitude a gift.',         hasFullEntry: false },
  { slug: 'khashya',    term: 'خَشْيَة',    transliteration: 'Khashya',    category: 'States of the Heart', evocativeLine: 'Reverential awe born of knowledge — the fear of those who truly know.',                  hasFullEntry: false },
  { slug: 'afw',        term: 'عَفْو',      transliteration: "Afw",        category: 'States of the Heart', evocativeLine: 'Pardoning — the release of the right to retaliate, chosen freely out of strength.',      hasFullEntry: false },

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
  { slug: 'hikmah',    term: 'حِكْمَة',   transliteration: 'Hikmah',   category: 'Theology & Ethics', evocativeLine: 'Wisdom — the ability to put things in their right place, given only to those Allah chooses.', hasFullEntry: false },
  { slug: 'adl',       term: 'عَدْل',     transliteration: "'Adl",     category: 'Theology & Ethics', evocativeLine: "Justice — one of the Quran's supreme values, demanded even against yourself.",             hasFullEntry: false },
  { slug: 'shirk',     term: 'شِرْك',     transliteration: 'Shirk',    category: 'Theology & Ethics', evocativeLine: 'The one sin declared unforgivable — placing anything alongside Allah in the heart.',       hasFullEntry: false },
  { slug: 'kufr',      term: 'كُفْر',     transliteration: 'Kufr',     category: 'Theology & Ethics', evocativeLine: 'Disbelief and ingratitude — the covering over of what the heart already knows.',           hasFullEntry: false },
  { slug: 'nifaq',     term: 'نِفَاق',    transliteration: 'Nifaq',    category: 'Theology & Ethics', evocativeLine: 'Hypocrisy — the gap between what is shown and what is held, wider than disbelief.',        hasFullEntry: false },
  { slug: 'haqq',      term: 'حَقّ',      transliteration: 'Haqq',     category: 'Theology & Ethics', evocativeLine: "Truth and right — the word that is also one of Allah's names and the Quran's purpose.",    hasFullEntry: false },
  { slug: 'zulm',      term: 'ظُلْم',     transliteration: 'Zulm',     category: 'Theology & Ethics', evocativeLine: 'Wrongdoing and oppression — the darkness the Quran cannot name without condemning.',        hasFullEntry: false },
  { slug: 'birr',      term: 'بِرّ',      transliteration: 'Birr',     category: 'Theology & Ethics', evocativeLine: 'Comprehensive righteousness — the full expression of goodness in every direction.',         hasFullEntry: false },
  { slug: 'ummah',     term: 'أُمَّة',    transliteration: 'Ummah',    category: 'Theology & Ethics', evocativeLine: 'Community — the body of believers across time and space, responsible for each other.',      hasFullEntry: false },
  { slug: 'mithaq',    term: 'مِيثَاق',   transliteration: 'Mithaq',   category: 'Theology & Ethics', evocativeLine: 'The primordial covenant — the agreement made before birth that shapes all of human life.',  hasFullEntry: false },
  { slug: 'dawah',     term: 'دَعْوَة',   transliteration: "Da'wah",   category: 'Theology & Ethics', evocativeLine: 'The call — inviting to Allah with wisdom and beautiful speech.',                           hasFullEntry: false },
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
}
