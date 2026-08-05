/**
 * The ninety-nine names, as listed in the narration of Sunan al-Tirmidhi (3507).
 *
 * IMPORTANT — the list itself is contested. The hadith that Allah has ninety-nine names
 * is agreed sahih (al-Bukhari, Muslim). The *itemised list* is a separate matter: it is
 * absent from the strongest narrations, scholars regarded it as an insertion by a
 * transmitter rather than prophetic speech, and different scholars compiled different
 * lists. See the note rendered on /names — we say this on the page rather than quietly
 * presenting one list as definitive.
 *
 * `wordCount` is MECHANICALLY VERIFIED against scripts/.corpus-cache/quranic-corpus.json:
 * it counts occurrences of the name's lemma tagged as a noun or adjective. Two cautions
 * that the page states plainly:
 *
 *   1. It counts the WORD, not the name. Al-Mu'min appears 202 times, but the
 *      overwhelming majority describe human believers, not Allah. An-Nur's 43 are
 *      almost all light as a created thing; Allah is named as light once (24:35).
 *   2. wordCount === 0 means the name in that exact form never appears in the Quran.
 *      Seventeen names are in this position. Many are derived from Quranic verbs —
 *      yuhyi wa yumit gives Al-Muhyi and Al-Mumit — rather than quoted from it.
 *
 * Verbs and prepositions are excluded from the count deliberately: matching Al-Ali's
 * lemma without a part-of-speech filter returns 1,458 hits, because 1,444 of them are
 * the preposition 'ala.
 */

export interface DivineName {
  number: number
  arabic: string
  translit: string
  english: string
  root: string
  /** Occurrences of the lemma as noun/adjective. 0 = the word never appears. */
  wordCount: number
  /** Present when we have published an article on this name. */
  articleSlug?: string
  hubSlug?: string
}

export const DIVINE_NAMES: DivineName[] = [
  { number: 1, arabic: 'ٱلرَّحْمَٰن', translit: 'Ar-Rahman', english: 'The Most Merciful', root: 'ر-ح-م', wordCount: 57, articleSlug: 'rahman-rahim-two-names-quran', hubSlug: 'ar-rahman' },
  { number: 2, arabic: 'ٱلرَّحِيم', translit: 'Ar-Rahim', english: 'The Ever-Merciful', root: 'ر-ح-م', wordCount: 116, articleSlug: 'rahman-rahim-two-names-quran', hubSlug: 'ar-rahim' },
  { number: 3, arabic: 'ٱلْمَلِك', translit: 'Al-Malik', english: 'The Sovereign', root: 'م-ل-ك', wordCount: 152 },
  { number: 4, arabic: 'ٱلْقُدُّوس', translit: 'Al-Quddus', english: 'The Most Holy', root: 'ق-د-س', wordCount: 2 },
  { number: 5, arabic: 'ٱلسَّلَام', translit: 'As-Salam', english: 'The Source of Peace', root: 'س-ل-م', wordCount: 42 },
  { number: 6, arabic: 'ٱلْمُؤْمِن', translit: 'Al-Mu’min', english: 'The Granter of Security', root: 'أ-م-ن', wordCount: 202 },
  { number: 7, arabic: 'ٱلْمُهَيْمِن', translit: 'Al-Muhaymin', english: 'The Guardian', root: 'ه-م-ن', wordCount: 2 },
  { number: 8, arabic: 'ٱلْعَزِيز', translit: 'Al-Aziz', english: 'The Almighty', root: 'ع-ز-ز', wordCount: 101 },
  { number: 9, arabic: 'ٱلْجَبَّار', translit: 'Al-Jabbar', english: 'The Compeller', root: 'ج-ب-ر', wordCount: 10 },
  { number: 10, arabic: 'ٱلْمُتَكَبِّر', translit: 'Al-Mutakabbir', english: 'The Supreme', root: 'ك-ب-ر', wordCount: 7 },
  { number: 11, arabic: 'ٱلْخَالِق', translit: 'Al-Khaliq', english: 'The Creator', root: 'خ-ل-ق', wordCount: 12 },
  { number: 12, arabic: 'ٱلْبَارِئ', translit: 'Al-Bari', english: 'The Originator', root: 'ب-ر-أ', wordCount: 3 },
  { number: 13, arabic: 'ٱلْمُصَوِّر', translit: 'Al-Musawwir', english: 'The Fashioner', root: 'ص-و-ر', wordCount: 1 },
  { number: 14, arabic: 'ٱلْغَفَّار', translit: 'Al-Ghaffar', english: 'The Repeatedly Forgiving', root: 'غ-ف-ر', wordCount: 5, articleSlug: 'al-ghafur-al-ghaffar-divine-name-quran', hubSlug: 'al-ghaffar' },
  { number: 15, arabic: 'ٱلْقَهَّار', translit: 'Al-Qahhar', english: 'The Subduer', root: 'ق-ه-ر', wordCount: 6 },
  { number: 16, arabic: 'ٱلْوَهَّاب', translit: 'Al-Wahhab', english: 'The Bestower', root: 'و-ه-ب', wordCount: 3 },
  { number: 17, arabic: 'ٱلرَّزَّاق', translit: 'Ar-Razzaq', english: 'The Provider', root: 'ر-ز-ق', wordCount: 1, articleSlug: 'rizq-al-razzaq-divine-name-quran', hubSlug: 'ar-razzaq' },
  { number: 18, arabic: 'ٱلْفَتَّاح', translit: 'Al-Fattah', english: 'The Opener', root: 'ف-ت-ح', wordCount: 1 },
  { number: 19, arabic: 'ٱلْعَلِيم', translit: 'Al-Alim', english: 'The All-Knowing', root: 'ع-ل-م', wordCount: 163 },
  { number: 20, arabic: 'ٱلْقَابِض', translit: 'Al-Qabid', english: 'The Withholder', root: 'ق-ب-ض', wordCount: 0 },
  { number: 21, arabic: 'ٱلْبَاسِط', translit: 'Al-Basit', english: 'The Extender', root: 'ب-س-ط', wordCount: 4 },
  { number: 22, arabic: 'ٱلْخَافِض', translit: 'Al-Khafid', english: 'The Abaser', root: 'خ-ف-ض', wordCount: 0 },
  { number: 23, arabic: 'ٱلرَّافِع', translit: 'Ar-Rafi', english: 'The Exalter', root: 'ر-ف-ع', wordCount: 1 },
  { number: 24, arabic: 'ٱلْمُعِزّ', translit: 'Al-Muizz', english: 'The Honourer', root: 'ع-ز-ز', wordCount: 1 },
  { number: 25, arabic: 'ٱلْمُذِلّ', translit: 'Al-Mudhill', english: 'The Humiliator', root: 'ذ-ل-ل', wordCount: 0 },
  { number: 26, arabic: 'ٱلسَّمِيع', translit: 'As-Sami', english: 'The All-Hearing', root: 'س-م-ع', wordCount: 47 },
  { number: 27, arabic: 'ٱلْبَصِير', translit: 'Al-Basir', english: 'The All-Seeing', root: 'ب-ص-ر', wordCount: 51 },
  { number: 28, arabic: 'ٱلْحَكَم', translit: 'Al-Hakam', english: 'The Judge', root: 'ح-ك-م', wordCount: 33 },
  { number: 29, arabic: 'ٱلْعَدْل', translit: 'Al-Adl', english: 'The Utterly Just', root: 'ع-د-ل', wordCount: 14 },
  { number: 30, arabic: 'ٱللَّطِيف', translit: 'Al-Latif', english: 'The Subtle', root: 'ل-ط-ف', wordCount: 7, articleSlug: 'al-latif-divine-name-quran', hubSlug: 'al-latif' },
  { number: 31, arabic: 'ٱلْخَبِير', translit: 'Al-Khabir', english: 'The All-Aware', root: 'خ-ب-ر', wordCount: 45 },
  { number: 32, arabic: 'ٱلْحَلِيم', translit: 'Al-Halim', english: 'The Forbearing', root: 'ح-ل-م', wordCount: 15 },
  { number: 33, arabic: 'ٱلْعَظِيم', translit: 'Al-Azim', english: 'The Magnificent', root: 'ع-ظ-م', wordCount: 107 },
  { number: 34, arabic: 'ٱلْغَفُور', translit: 'Al-Ghafur', english: 'The Forgiving', root: 'غ-ف-ر', wordCount: 91, articleSlug: 'al-ghafur-al-ghaffar-divine-name-quran', hubSlug: 'al-ghafur' },
  { number: 35, arabic: 'ٱلشَّكُور', translit: 'Ash-Shakur', english: 'The Appreciative', root: 'ش-ك-ر', wordCount: 12, articleSlug: 'ash-shakur-divine-name-quran', hubSlug: 'ash-shakur' },
  { number: 36, arabic: 'ٱلْعَلِيّ', translit: 'Al-Ali', english: 'The Most High', root: 'ع-ل-و', wordCount: 14 },
  { number: 37, arabic: 'ٱلْكَبِير', translit: 'Al-Kabir', english: 'The Most Great', root: 'ك-ب-ر', wordCount: 40 },
  { number: 38, arabic: 'ٱلْحَفِيظ', translit: 'Al-Hafiz', english: 'The Preserver', root: 'ح-ف-ظ', wordCount: 12, articleSlug: 'al-hafiz-divine-name-quran', hubSlug: 'al-hafiz' },
  { number: 39, arabic: 'ٱلْمُقِيت', translit: 'Al-Muqit', english: 'The Sustainer', root: 'ق-و-ت', wordCount: 1 },
  { number: 40, arabic: 'ٱلْحَسِيب', translit: 'Al-Hasib', english: 'The Reckoner', root: 'ح-س-ب', wordCount: 4 },
  { number: 41, arabic: 'ٱلْجَلِيل', translit: 'Al-Jalil', english: 'The Majestic', root: 'ج-ل-ل', wordCount: 0 },
  { number: 42, arabic: 'ٱلْكَرِيم', translit: 'Al-Karim', english: 'The Generous', root: 'ك-ر-م', wordCount: 30, articleSlug: 'al-karim-divine-name-quran', hubSlug: 'al-karim' },
  { number: 43, arabic: 'ٱلرَّقِيب', translit: 'Ar-Raqib', english: 'The Watchful', root: 'ر-ق-ب', wordCount: 5 },
  { number: 44, arabic: 'ٱلْمُجِيب', translit: 'Al-Mujib', english: 'The Responsive', root: 'ج-و-ب', wordCount: 2 },
  { number: 45, arabic: 'ٱلْوَاسِع', translit: 'Al-Wasi', english: 'The All-Encompassing', root: 'و-س-ع', wordCount: 9 },
  { number: 46, arabic: 'ٱلْحَكِيم', translit: 'Al-Hakim', english: 'The All-Wise', root: 'ح-ك-م', wordCount: 97 },
  { number: 47, arabic: 'ٱلْوَدُود', translit: 'Al-Wadud', english: 'The Loving', root: 'و-د-د', wordCount: 2, articleSlug: 'al-wadud-divine-name-quran', hubSlug: 'al-wadud' },
  { number: 48, arabic: 'ٱلْمَجِيد', translit: 'Al-Majid', english: 'The Glorious', root: 'م-ج-د', wordCount: 4 },
  { number: 49, arabic: 'ٱلْبَاعِث', translit: 'Al-Baith', english: 'The Resurrector', root: 'ب-ع-ث', wordCount: 0 },
  { number: 50, arabic: 'ٱلشَّهِيد', translit: 'Ash-Shahid', english: 'The Witness', root: 'ش-ه-د', wordCount: 56 },
  { number: 51, arabic: 'ٱلْحَقّ', translit: 'Al-Haqq', english: 'The Truth', root: 'ح-ق-ق', wordCount: 247 },
  { number: 52, arabic: 'ٱلْوَكِيل', translit: 'Al-Wakil', english: 'The Disposer of Affairs', root: 'و-ك-ل', wordCount: 24, articleSlug: 'al-wakil-divine-name-quran', hubSlug: 'al-wakil' },
  { number: 53, arabic: 'ٱلْقَوِيّ', translit: 'Al-Qawiyy', english: 'The Most Strong', root: 'ق-و-ي', wordCount: 11 },
  { number: 54, arabic: 'ٱلْمَتِين', translit: 'Al-Matin', english: 'The Firm', root: 'م-ت-ن', wordCount: 3 },
  { number: 55, arabic: 'ٱلْوَلِيّ', translit: 'Al-Waliyy', english: 'The Protecting Friend', root: 'و-ل-ي', wordCount: 86 },
  { number: 56, arabic: 'ٱلْحَمِيد', translit: 'Al-Hamid', english: 'The Praiseworthy', root: 'ح-م-د', wordCount: 17 },
  { number: 57, arabic: 'ٱلْمُحْصِي', translit: 'Al-Muhsi', english: 'The Enumerator', root: 'ح-ص-ي', wordCount: 0 },
  { number: 58, arabic: 'ٱلْمُبْدِئ', translit: 'Al-Mubdi', english: 'The Originator', root: 'ب-د-أ', wordCount: 1 },
  { number: 59, arabic: 'ٱلْمُعِيد', translit: 'Al-Muid', english: 'The Restorer', root: 'ع-و-د', wordCount: 0 },
  { number: 60, arabic: 'ٱلْمُحْيِي', translit: 'Al-Muhyi', english: 'The Giver of Life', root: 'ح-ي-ي', wordCount: 0 },
  { number: 61, arabic: 'ٱلْمُمِيت', translit: 'Al-Mumit', english: 'The Bringer of Death', root: 'م-و-ت', wordCount: 0 },
  { number: 62, arabic: 'ٱلْحَيّ', translit: 'Al-Hayy', english: 'The Ever-Living', root: 'ح-ي-ي', wordCount: 24 },
  { number: 63, arabic: 'ٱلْقَيُّوم', translit: 'Al-Qayyum', english: 'The Self-Subsisting', root: 'ق-و-م', wordCount: 3, articleSlug: 'al-qayyum-divine-name-quran', hubSlug: 'al-qayyum' },
  { number: 64, arabic: 'ٱلْوَاجِد', translit: 'Al-Wajid', english: 'The Finder', root: 'و-ج-د', wordCount: 0 },
  { number: 65, arabic: 'ٱلْمَاجِد', translit: 'Al-Majid', english: 'The Noble', root: 'م-ج-د', wordCount: 0 },
  { number: 66, arabic: 'ٱلْوَاحِد', translit: 'Al-Wahid', english: 'The One', root: 'و-ح-د', wordCount: 30 },
  { number: 67, arabic: 'ٱلْأَحَد', translit: 'Al-Ahad', english: 'The Unique', root: 'أ-ح-د', wordCount: 74 },
  { number: 68, arabic: 'ٱلصَّمَد', translit: 'As-Samad', english: 'The Eternal Refuge', root: 'ص-م-د', wordCount: 1, articleSlug: 'as-samad-divine-name-quran', hubSlug: 'as-samad' },
  { number: 69, arabic: 'ٱلْقَادِر', translit: 'Al-Qadir', english: 'The Capable', root: 'ق-د-ر', wordCount: 14 },
  { number: 70, arabic: 'ٱلْمُقْتَدِر', translit: 'Al-Muqtadir', english: 'The Omnipotent', root: 'ق-د-ر', wordCount: 4 },
  { number: 71, arabic: 'ٱلْمُقَدِّم', translit: 'Al-Muqaddim', english: 'The Expediter', root: 'ق-د-م', wordCount: 0 },
  { number: 72, arabic: 'ٱلْمُؤَخِّر', translit: 'Al-Muakhkhir', english: 'The Delayer', root: 'أ-خ-ر', wordCount: 0 },
  { number: 73, arabic: 'ٱلْأَوَّل', translit: 'Al-Awwal', english: 'The First', root: 'أ-و-ل', wordCount: 82 },
  { number: 74, arabic: 'ٱلْآخِر', translit: 'Al-Akhir', english: 'The Last', root: 'أ-خ-ر', wordCount: 225 },
  { number: 75, arabic: 'ٱلظَّاهِر', translit: 'Az-Zahir', english: 'The Manifest', root: 'ظ-ه-ر', wordCount: 8 },
  { number: 76, arabic: 'ٱلْبَاطِن', translit: 'Al-Batin', english: 'The Hidden', root: 'ب-ط-ن', wordCount: 3 },
  { number: 77, arabic: 'ٱلْوَالِي', translit: 'Al-Wali', english: 'The Governor', root: 'و-ل-ي', wordCount: 0 },
  { number: 78, arabic: 'ٱلْمُتَعَالِي', translit: 'Al-Mutaali', english: 'The Most Exalted', root: 'ع-ل-و', wordCount: 1 },
  { number: 79, arabic: 'ٱلْبَرّ', translit: 'Al-Barr', english: 'The Source of Goodness', root: 'ب-ر-ر', wordCount: 30 },
  { number: 80, arabic: 'ٱلتَّوَّاب', translit: 'At-Tawwab', english: 'The Ever-Returning', root: 'ت-و-ب', wordCount: 12, articleSlug: 'al-tawwab-the-name-that-makes-returning-mutual', hubSlug: 'at-tawwab' },
  { number: 81, arabic: 'ٱلْمُنْتَقِم', translit: 'Al-Muntaqim', english: 'The Avenger', root: 'ن-ق-م', wordCount: 3 },
  { number: 82, arabic: 'ٱلْعَفُوّ', translit: 'Al-Afuww', english: 'The Pardoner', root: 'ع-ف-و', wordCount: 7 },
  { number: 83, arabic: 'ٱلرَّءُوف', translit: 'Ar-Rauf', english: 'The Most Kind', root: 'ر-أ-ف', wordCount: 11 },
  { number: 84, arabic: 'مَالِكُ ٱلْمُلْك', translit: 'Malik al-Mulk', english: 'Owner of All Sovereignty', root: 'م-ل-ك', wordCount: 4 },
  { number: 85, arabic: 'ذُو ٱلْجَلَالِ وَٱلْإِكْرَام', translit: 'Dhul-Jalali wal-Ikram', english: 'Lord of Majesty and Honour', root: 'ج-ل-ل', wordCount: 2 },
  { number: 86, arabic: 'ٱلْمُقْسِط', translit: 'Al-Muqsit', english: 'The Equitable', root: 'ق-س-ط', wordCount: 3 },
  { number: 87, arabic: 'ٱلْجَامِع', translit: 'Al-Jami', english: 'The Gatherer', root: 'ج-م-ع', wordCount: 3 },
  { number: 88, arabic: 'ٱلْغَنِيّ', translit: 'Al-Ghaniyy', english: 'The Self-Sufficient', root: 'غ-ن-ي', wordCount: 24 },
  { number: 89, arabic: 'ٱلْمُغْنِي', translit: 'Al-Mughni', english: 'The Enricher', root: 'غ-ن-ي', wordCount: 2 },
  { number: 90, arabic: 'ٱلْمَانِع', translit: 'Al-Mani', english: 'The Preventer', root: 'م-ن-ع', wordCount: 0 },
  { number: 91, arabic: 'ٱلضَّارّ', translit: 'Ad-Darr', english: 'The Distresser', root: 'ض-ر-ر', wordCount: 2 },
  { number: 92, arabic: 'ٱلنَّافِع', translit: 'An-Nafi', english: 'The Benefiter', root: 'ن-ف-ع', wordCount: 0 },
  { number: 93, arabic: 'ٱلنُّور', translit: 'An-Nur', english: 'The Light', root: 'ن-و-ر', wordCount: 43, articleSlug: 'an-nur-divine-name-quran', hubSlug: 'an-nur' },
  { number: 94, arabic: 'ٱلْهَادِي', translit: 'Al-Hadi', english: 'The Guide', root: 'ه-د-ي', wordCount: 7 },
  { number: 95, arabic: 'ٱلْبَدِيع', translit: 'Al-Badi', english: 'The Incomparable Originator', root: 'ب-د-ع', wordCount: 2 },
  { number: 96, arabic: 'ٱلْبَاقِي', translit: 'Al-Baqi', english: 'The Everlasting', root: 'ب-ق-ي', wordCount: 1 },
  { number: 97, arabic: 'ٱلْوَارِث', translit: 'Al-Warith', english: 'The Inheritor', root: 'و-ر-ث', wordCount: 7 },
  { number: 98, arabic: 'ٱلرَّشِيد', translit: 'Ar-Rashid', english: 'The Guide to the Right Path', root: 'ر-ش-د', wordCount: 3 },
  { number: 99, arabic: 'ٱلصَّبُور', translit: 'As-Sabur', english: 'The Patient', root: 'ص-ب-ر', wordCount: 0 },
]

/** Names with a published article. */
export const COVERED_NAMES = DIVINE_NAMES.filter((n) => n.articleSlug)

/** Names whose exact form never appears in the Quran. */
export const NAMES_NOT_IN_QURAN = DIVINE_NAMES.filter((n) => n.wordCount === 0)
