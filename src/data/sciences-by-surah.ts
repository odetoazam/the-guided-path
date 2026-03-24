/**
 * Maps each surah to its 2-3 most active Ulum al-Quran sciences.
 *
 * These assignments are based on the dominant analytical lenses each
 * surah's architecture demands — not exhaustive coverage, but the
 * sciences a student would need *most* to go deeper.
 *
 * Science key:
 *   sarf          – Morphology (word-form patterns, verb forms I-X)
 *   nahw          – Grammar & Syntax (sentence structure, i'rab, particles)
 *   lughah        – Lexicology (word meanings, semantic ranges)
 *   balaghah      – Rhetoric (imagery, metaphor, iltifat, taqdim/ta'khir)
 *   ijaz          – Inimitability (miraculous precision, compression)
 *   muhkamat      – Clear vs. Ambiguous verses
 *   nazm          – Structural Coherence (surah architecture, ring composition)
 *   makki_madani  – Revelation Context (Makki/Madani classification)
 *   munasabat     – Inter-surah Connections (surah pairs, neighbors)
 *   qasas         – Quranic Narratives (prophetic stories)
 *   amthal        – Parables & Similitudes
 *   qasam         – Quranic Oaths
 *   tafsir        – Exegesis (classical commentary traditions)
 *   tajwid        – Recitation Rules (phonetic precision)
 *   qiraat        – Variant Readings
 *   nasikh        – Abrogation (legal rulings superseded)
 *   usul_tafsir   – Principles of Interpretation
 *   aqeedah       – Theology & Creed
 */

export type ScienceKey =
  | 'sarf'
  | 'nahw'
  | 'lughah'
  | 'balaghah'
  | 'ijaz'
  | 'muhkamat'
  | 'nazm'
  | 'makki_madani'
  | 'munasabat'
  | 'qasas'
  | 'amthal'
  | 'qasam'
  | 'tafsir'
  | 'tajwid'
  | 'qiraat'
  | 'nasikh'
  | 'usul_tafsir'
  | 'aqeedah'

export interface ScienceInfo {
  key: ScienceKey
  arabic: string
  english: string
}

export const SCIENCE_LABELS: Record<ScienceKey, ScienceInfo> = {
  sarf: { key: 'sarf', arabic: 'الصرف', english: 'Morphology' },
  nahw: { key: 'nahw', arabic: 'النحو', english: 'Grammar' },
  lughah: { key: 'lughah', arabic: 'علم اللغة', english: 'Lexicology' },
  balaghah: { key: 'balaghah', arabic: 'البلاغة', english: 'Rhetoric' },
  ijaz: { key: 'ijaz', arabic: 'الإعجاز', english: 'Inimitability' },
  muhkamat: { key: 'muhkamat', arabic: 'المحكم والمتشابه', english: 'Clear & Ambiguous' },
  nazm: { key: 'nazm', arabic: 'النظم', english: 'Structural Coherence' },
  makki_madani: { key: 'makki_madani', arabic: 'المكي والمدني', english: 'Revelation Context' },
  munasabat: { key: 'munasabat', arabic: 'المناسبات', english: 'Inter-surah Connections' },
  qasas: { key: 'qasas', arabic: 'القصص', english: 'Quranic Narratives' },
  amthal: { key: 'amthal', arabic: 'الأمثال', english: 'Parables' },
  qasam: { key: 'qasam', arabic: 'القسم', english: 'Oaths' },
  tafsir: { key: 'tafsir', arabic: 'التفسير', english: 'Exegesis' },
  tajwid: { key: 'tajwid', arabic: 'التجويد', english: 'Recitation' },
  qiraat: { key: 'qiraat', arabic: 'القراءات', english: 'Variant Readings' },
  nasikh: { key: 'nasikh', arabic: 'الناسخ والمنسوخ', english: 'Abrogation' },
  usul_tafsir: { key: 'usul_tafsir', arabic: 'أصول التفسير', english: 'Principles of Interpretation' },
  aqeedah: { key: 'aqeedah', arabic: 'العقيدة', english: 'Theology' },
}

/**
 * Primary sciences for each surah (1-114).
 * Array index 0 = surah 1, index 113 = surah 114.
 *
 * Assignment rationale by category:
 *
 * Long Madani legal surahs (2-5, 8-9, 22, 24, 33, 47-49, 58-66):
 *   → Heavy on Nasikh/Mansukh, Muhkamat, Usool al-Tafsir, Makki/Madani
 *
 * Makki narrative surahs (7, 10-12, 18-21, 26-28, 37-38):
 *   → Qasas, Nazm, Munasabat
 *
 * Makki argument/theology surahs (6, 13-17, 23, 25, 29-32, 34-36, 39-46):
 *   → Balaghah, Aqeedah, Nazm, I'jaz
 *
 * Short Makki oath/warning surahs (50-56, 67-77, 78-90):
 *   → Qasam, Balaghah, I'jaz, Sarf
 *
 * Ultra-short Makki surahs (91-114):
 *   → I'jaz, Sarf, Balaghah, sometimes Qasam
 */
export const SCIENCES_BY_SURAH: ScienceKey[][] = [
  /* 1   Al-Fatiha      */ ['balaghah', 'nahw', 'aqeedah'],
  /* 2   Al-Baqarah     */ ['nasikh', 'muhkamat', 'nazm'],
  /* 3   Ali 'Imran     */ ['nazm', 'muhkamat', 'munasabat'],
  /* 4   An-Nisa        */ ['nasikh', 'usul_tafsir', 'muhkamat'],
  /* 5   Al-Ma'idah     */ ['nasikh', 'makki_madani', 'usul_tafsir'],
  /* 6   Al-An'am       */ ['aqeedah', 'balaghah', 'nazm'],
  /* 7   Al-A'raf       */ ['qasas', 'nazm', 'munasabat'],
  /* 8   Al-Anfal       */ ['makki_madani', 'usul_tafsir', 'nasikh'],
  /* 9   At-Tawbah      */ ['makki_madani', 'nasikh', 'usul_tafsir'],
  /* 10  Yunus          */ ['qasas', 'balaghah', 'aqeedah'],
  /* 11  Hud            */ ['qasas', 'nazm', 'munasabat'],
  /* 12  Yusuf          */ ['qasas', 'nazm', 'balaghah'],
  /* 13  Ar-Ra'd        */ ['amthal', 'balaghah', 'aqeedah'],
  /* 14  Ibrahim        */ ['amthal', 'balaghah', 'qasas'],
  /* 15  Al-Hijr        */ ['qasas', 'nazm', 'balaghah'],
  /* 16  An-Nahl        */ ['amthal', 'aqeedah', 'nazm'],
  /* 17  Al-Isra        */ ['nazm', 'balaghah', 'munasabat'],
  /* 18  Al-Kahf        */ ['qasas', 'nazm', 'amthal'],
  /* 19  Maryam         */ ['qasas', 'balaghah', 'nazm'],
  /* 20  Ta-Ha          */ ['qasas', 'balaghah', 'nazm'],
  /* 21  Al-Anbiya      */ ['qasas', 'nazm', 'aqeedah'],
  /* 22  Al-Hajj        */ ['makki_madani', 'aqeedah', 'nasikh'],
  /* 23  Al-Mu'minun    */ ['nazm', 'balaghah', 'aqeedah'],
  /* 24  An-Nur         */ ['usul_tafsir', 'amthal', 'makki_madani'],
  /* 25  Al-Furqan      */ ['balaghah', 'nazm', 'aqeedah'],
  /* 26  Ash-Shu'ara    */ ['qasas', 'nazm', 'balaghah'],
  /* 27  An-Naml        */ ['qasas', 'nazm', 'munasabat'],
  /* 28  Al-Qasas       */ ['qasas', 'nazm', 'munasabat'],
  /* 29  Al-'Ankabut    */ ['amthal', 'nazm', 'aqeedah'],
  /* 30  Ar-Rum         */ ['ijaz', 'aqeedah', 'nazm'],
  /* 31  Luqman         */ ['amthal', 'qasas', 'nazm'],
  /* 32  As-Sajdah      */ ['nazm', 'aqeedah', 'munasabat'],
  /* 33  Al-Ahzab       */ ['makki_madani', 'usul_tafsir', 'nazm'],
  /* 34  Saba           */ ['amthal', 'qasas', 'balaghah'],
  /* 35  Fatir          */ ['balaghah', 'aqeedah', 'nazm'],
  /* 36  Ya-Sin         */ ['balaghah', 'nazm', 'aqeedah'],
  /* 37  As-Saffat      */ ['qasas', 'qasam', 'nazm'],
  /* 38  Sad            */ ['qasas', 'nazm', 'balaghah'],
  /* 39  Az-Zumar       */ ['balaghah', 'amthal', 'nazm'],
  /* 40  Ghafir         */ ['balaghah', 'qasas', 'aqeedah'],
  /* 41  Fussilat       */ ['balaghah', 'ijaz', 'nazm'],
  /* 42  Ash-Shura      */ ['aqeedah', 'nazm', 'balaghah'],
  /* 43  Az-Zukhruf     */ ['balaghah', 'amthal', 'nazm'],
  /* 44  Ad-Dukhan      */ ['balaghah', 'qasam', 'qasas'],
  /* 45  Al-Jathiyah    */ ['balaghah', 'aqeedah', 'nazm'],
  /* 46  Al-Ahqaf       */ ['qasas', 'nazm', 'balaghah'],
  /* 47  Muhammad       */ ['makki_madani', 'balaghah', 'nazm'],
  /* 48  Al-Fath        */ ['makki_madani', 'usul_tafsir', 'balaghah'],
  /* 49  Al-Hujurat     */ ['makki_madani', 'usul_tafsir', 'nahw'],
  /* 50  Qaf            */ ['qasam', 'balaghah', 'nazm'],
  /* 51  Adh-Dhariyat   */ ['qasam', 'balaghah', 'qasas'],
  /* 52  At-Tur         */ ['qasam', 'balaghah', 'ijaz'],
  /* 53  An-Najm        */ ['qasam', 'balaghah', 'aqeedah'],
  /* 54  Al-Qamar       */ ['balaghah', 'nazm', 'ijaz'],
  /* 55  Ar-Rahman      */ ['balaghah', 'ijaz', 'nazm'],
  /* 56  Al-Waqi'ah     */ ['balaghah', 'nazm', 'aqeedah'],
  /* 57  Al-Hadid       */ ['balaghah', 'aqeedah', 'amthal'],
  /* 58  Al-Mujadilah   */ ['makki_madani', 'usul_tafsir', 'nahw'],
  /* 59  Al-Hashr       */ ['makki_madani', 'balaghah', 'aqeedah'],
  /* 60  Al-Mumtahanah  */ ['makki_madani', 'usul_tafsir', 'nasikh'],
  /* 61  As-Saff        */ ['nazm', 'balaghah', 'munasabat'],
  /* 62  Al-Jumu'ah     */ ['makki_madani', 'balaghah', 'amthal'],
  /* 63  Al-Munafiqun   */ ['makki_madani', 'balaghah', 'nahw'],
  /* 64  At-Taghabun    */ ['makki_madani', 'aqeedah', 'balaghah'],
  /* 65  At-Talaq       */ ['usul_tafsir', 'nasikh', 'makki_madani'],
  /* 66  At-Tahrim      */ ['makki_madani', 'usul_tafsir', 'amthal'],
  /* 67  Al-Mulk        */ ['balaghah', 'nazm', 'aqeedah'],
  /* 68  Al-Qalam       */ ['qasam', 'balaghah', 'qasas'],
  /* 69  Al-Haqqah      */ ['balaghah', 'ijaz', 'aqeedah'],
  /* 70  Al-Ma'arij     */ ['balaghah', 'sarf', 'nazm'],
  /* 71  Nuh            */ ['qasas', 'balaghah', 'nazm'],
  /* 72  Al-Jinn        */ ['qasas', 'balaghah', 'aqeedah'],
  /* 73  Al-Muzzammil   */ ['balaghah', 'tajwid', 'sarf'],
  /* 74  Al-Muddaththir */ ['balaghah', 'sarf', 'nazm'],
  /* 75  Al-Qiyamah     */ ['balaghah', 'qasam', 'aqeedah'],
  /* 76  Al-Insan       */ ['balaghah', 'nazm', 'sarf'],
  /* 77  Al-Mursalat    */ ['qasam', 'balaghah', 'ijaz'],
  /* 78  An-Naba        */ ['balaghah', 'nazm', 'aqeedah'],
  /* 79  An-Nazi'at     */ ['qasam', 'balaghah', 'sarf'],
  /* 80  'Abasa         */ ['balaghah', 'sarf', 'nazm'],
  /* 81  At-Takwir      */ ['qasam', 'balaghah', 'ijaz'],
  /* 82  Al-Infitar     */ ['balaghah', 'sarf', 'nazm'],
  /* 83  Al-Mutaffifin  */ ['balaghah', 'nazm', 'sarf'],
  /* 84  Al-Inshiqaq    */ ['qasam', 'balaghah', 'sarf'],
  /* 85  Al-Buruj       */ ['qasam', 'qasas', 'balaghah'],
  /* 86  At-Tariq       */ ['qasam', 'balaghah', 'ijaz'],
  /* 87  Al-A'la        */ ['balaghah', 'nazm', 'sarf'],
  /* 88  Al-Ghashiyah   */ ['balaghah', 'nazm', 'amthal'],
  /* 89  Al-Fajr        */ ['qasam', 'qasas', 'balaghah'],
  /* 90  Al-Balad       */ ['qasam', 'balaghah', 'sarf'],
  /* 91  Ash-Shams      */ ['qasam', 'balaghah', 'ijaz'],
  /* 92  Al-Layl        */ ['balaghah', 'nazm', 'sarf'],
  /* 93  Ad-Duha        */ ['qasam', 'balaghah', 'sarf'],
  /* 94  Ash-Sharh      */ ['balaghah', 'sarf', 'ijaz'],
  /* 95  At-Tin         */ ['qasam', 'balaghah', 'ijaz'],
  /* 96  Al-'Alaq       */ ['sarf', 'balaghah', 'nazm'],
  /* 97  Al-Qadr        */ ['ijaz', 'balaghah', 'sarf'],
  /* 98  Al-Bayyinah    */ ['aqeedah', 'balaghah', 'nazm'],
  /* 99  Az-Zalzalah    */ ['ijaz', 'sarf', 'balaghah'],
  /* 100 Al-'Adiyat     */ ['qasam', 'sarf', 'balaghah'],
  /* 101 Al-Qari'ah     */ ['balaghah', 'sarf', 'ijaz'],
  /* 102 At-Takathur    */ ['balaghah', 'nahw', 'ijaz'],
  /* 103 Al-'Asr        */ ['ijaz', 'nahw', 'sarf'],
  /* 104 Al-Humazah     */ ['balaghah', 'sarf', 'nazm'],
  /* 105 Al-Fil         */ ['qasas', 'balaghah', 'ijaz'],
  /* 106 Quraysh        */ ['nahw', 'balaghah', 'munasabat'],
  /* 107 Al-Ma'un       */ ['balaghah', 'nazm', 'sarf'],
  /* 108 Al-Kawthar     */ ['ijaz', 'sarf', 'balaghah'],
  /* 109 Al-Kafirun     */ ['balaghah', 'aqeedah', 'nazm'],
  /* 110 An-Nasr        */ ['sarf', 'balaghah', 'ijaz'],
  /* 111 Al-Masad       */ ['balaghah', 'sarf', 'ijaz'],
  /* 112 Al-Ikhlas      */ ['aqeedah', 'ijaz', 'nahw'],
  /* 113 Al-Falaq       */ ['balaghah', 'aqeedah', 'munasabat'],
  /* 114 An-Nas         */ ['balaghah', 'aqeedah', 'munasabat'],
]

/**
 * Get the sciences-active sentence for a surah (for insertion into articles).
 */
export function getSciencesActiveSentence(surahNumber: number): string {
  const sciences = SCIENCES_BY_SURAH[surahNumber - 1]
  if (!sciences) return ''

  const labels = sciences.map((key) => {
    const info = SCIENCE_LABELS[key]
    return `**${info.english}** (*${key.replace('_', ' ')}*)`
  })

  if (labels.length === 2) {
    return `Going deeper into this surah calls especially for ${labels[0]} and ${labels[1]}.`
  }
  return `Going deeper into this surah calls especially for ${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}.`
}
