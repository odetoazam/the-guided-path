/**
 * People the Quran names.
 *
 * `count` is MECHANICALLY VERIFIED against scripts/.corpus-cache/quranic-corpus.json:
 * occurrences of the name as a proper noun, matched by lemma. Spot-checks against the
 * figures the tradition reports line up — Musa 136, Ibrahim 69, Firaun 74, Maryam 34.
 *
 * Two counts needed manual disambiguation and are NOT raw lemma totals:
 *   - Dhul-Kifl: the lemma kifl occurs 4x, but only 21:85 and 38:48 are the name.
 *     The other two (4:85, 57:28) mean "a portion".
 *   - Ilyas: 3 occurrences, one of which (37:130) is the variant form Il Yasin.
 *
 * `hubSlug` is present only where an entity hub already exists. Four of the twenty-five
 * prophets have none yet: Dhul-Kifl, Ilyas, Al-Yasa, and Muhammad (peace be upon him).
 */

export interface QuranicFigure {
  order?: number
  arabic: string
  translit: string
  english: string
  /** Times the name appears as a proper noun in the Quran. */
  count: number
  hubSlug?: string
  note?: string
}

export const PROPHETS: QuranicFigure[] = [
  { order: 1, arabic: 'آدَم', translit: 'Adam', english: 'Adam', count: 25, hubSlug: 'adam' },
  { order: 2, arabic: 'إِدْرِيس', translit: 'Idris', english: 'Enoch', count: 2, hubSlug: 'idris', note: "Named only twice, both times in lists of the patient and the guided." },
  { order: 3, arabic: 'نُوح', translit: 'Nuh', english: 'Noah', count: 43, hubSlug: 'nuh' },
  { order: 4, arabic: 'هُود', translit: 'Hud', english: 'Hud', count: 10, hubSlug: 'hud' },
  { order: 5, arabic: 'صَالِح', translit: 'Salih', english: 'Salih', count: 9, hubSlug: 'salih' },
  { order: 6, arabic: 'إِبْرَاهِيم', translit: 'Ibrahim', english: 'Abraham', count: 69, hubSlug: 'ibrahim' },
  { order: 7, arabic: 'لُوط', translit: 'Lut', english: 'Lot', count: 27, hubSlug: 'lut' },
  { order: 8, arabic: 'إِسْمَاعِيل', translit: 'Ismail', english: 'Ishmael', count: 12, hubSlug: 'ismail' },
  { order: 9, arabic: 'إِسْحَاق', translit: 'Ishaq', english: 'Isaac', count: 17, hubSlug: 'ishaq' },
  { order: 10, arabic: 'يَعْقُوب', translit: 'Yaqub', english: 'Jacob', count: 16, hubSlug: 'yaqub' },
  { order: 11, arabic: 'يُوسُف', translit: 'Yusuf', english: 'Joseph', count: 27, hubSlug: 'yusuf' },
  { order: 12, arabic: 'أَيُّوب', translit: 'Ayyub', english: 'Job', count: 4, hubSlug: 'ayyub' },
  { order: 13, arabic: 'شُعَيْب', translit: 'Shuayb', english: 'Shuayb', count: 11, hubSlug: 'shuayb' },
  { order: 14, arabic: 'مُوسَىٰ', translit: 'Musa', english: 'Moses', count: 136, hubSlug: 'musa', note: "Named more often than any other person in the Quran." },
  { order: 15, arabic: 'هَارُون', translit: 'Harun', english: 'Aaron', count: 20, hubSlug: 'harun' },
  { order: 16, arabic: 'ذُو ٱلْكِفْل', translit: 'Dhul-Kifl', english: 'Dhul-Kifl', count: 2, note: "Named twice (21:85, 38:48), both times inside a list. The Quran tells no story about him." },
  { order: 17, arabic: 'دَاوُۥد', translit: 'Dawud', english: 'David', count: 16, hubSlug: 'dawud' },
  { order: 18, arabic: 'سُلَيْمَان', translit: 'Sulayman', english: 'Solomon', count: 17, hubSlug: 'sulayman' },
  { order: 19, arabic: 'إِلْيَاس', translit: 'Ilyas', english: 'Elijah', count: 3, note: "Three mentions, one of which (37:130) uses the variant form Il Yasin." },
  { order: 20, arabic: 'ٱلْيَسَع', translit: 'Al-Yasa', english: 'Elisha', count: 2, note: "Named twice (6:86, 38:48), both times in a list." },
  { order: 21, arabic: 'يُونُس', translit: 'Yunus', english: 'Jonah', count: 4, hubSlug: 'yunus' },
  { order: 22, arabic: 'زَكَرِيَّا', translit: 'Zakariyya', english: 'Zechariah', count: 7, hubSlug: 'zakariyya' },
  { order: 23, arabic: 'يَحْيَىٰ', translit: 'Yahya', english: 'John', count: 5, hubSlug: 'yahya' },
  { order: 24, arabic: 'عِيسَىٰ', translit: 'Isa', english: 'Jesus', count: 25, hubSlug: 'isa' },
  { order: 25, arabic: 'مُحَمَّد', translit: 'Muhammad', english: 'Muhammad ﷺ', count: 4, note: "Named four times, plus once as Ahmad (61:6) — fewer than Musa, Ibrahim, Nuh, Lut, Yusuf, Isa or Adam." },
]

export const OTHER_FIGURES: QuranicFigure[] = [
  { arabic: 'مَرْيَم', translit: 'Maryam', english: 'Mary', count: 34, hubSlug: 'maryam', note: "The only woman the Quran names, and the only person with a surah named after her." },
  { arabic: 'فِرْعَوْن', translit: 'Firaun', english: 'Pharaoh', count: 74, hubSlug: 'firaun', note: "Named more often than every prophet except Musa and Ibrahim." },
  { arabic: 'هَامَان', translit: 'Haman', english: 'Haman', count: 6 },
  { arabic: 'قَارُون', translit: 'Qarun', english: 'Korah', count: 4, hubSlug: 'qarun' },
  { arabic: 'لُقْمَان', translit: 'Luqman', english: 'Luqman', count: 2, hubSlug: 'luqman', note: "Two mentions, both in the surah that carries his name." },
  { arabic: 'طَالُوت', translit: 'Talut', english: 'Saul', count: 2, hubSlug: 'talut' },
  { arabic: 'جَالُوت', translit: 'Jalut', english: 'Goliath', count: 3, hubSlug: 'jalut' },
  { arabic: 'عِمْرَان', translit: 'Imran', english: 'Imran', count: 3 },
  { arabic: 'آزَر', translit: 'Azar', english: 'Azar', count: 1, note: "Named once (6:74)." },
]

export const PROPHETS_WITH_HUBS = PROPHETS.filter((p) => p.hubSlug)
