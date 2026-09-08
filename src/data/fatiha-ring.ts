/**
 * Data for the interactive Al-Fatiha Ring explorer.
 *
 * Arabic text in CANONICAL_ARABIC is written by scripts/verify_ring_arabic.mjs
 * from the quran-validator canonical text. Never edit those strings by hand —
 * run `node scripts/verify_ring_arabic.mjs --write` and then the check.
 *
 * Every other Arabic string in this file (excerpts, the two portions of 1:7)
 * is derived from CANONICAL_ARABIC by word index, so it can never drift.
 */

const CANONICAL_ARABIC: Record<number, string> = {
  1: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
  2: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
  3: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
  4: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
  5: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
  6: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
  7: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
}

/** Translations as already published on the surah page (surah_visual_data.full_text). */
const TRANSLATION: Record<number, string> = {
  1: 'In the name of God, the Most Gracious, the Most Merciful.',
  2: 'All praise is due to God, Lord of all the worlds.',
  3: 'The Most Gracious, the Most Merciful.',
  4: 'Master of the Day of Judgment.',
  5: 'You alone we worship, and You alone we ask for help.',
  6: 'Guide us to the straight path —',
  7: 'the path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who have gone astray.',
}

/** Slice a verse by word index (inclusive start, exclusive end). */
function words(ayah: number, start: number, end?: number): string {
  return CANONICAL_ARABIC[ayah].split(' ').slice(start, end).join(' ')
}

export interface RingVerse {
  /** Display reference, e.g. "1:7a". */
  ref: string
  ayah: number
  /** Set when the node is a portion of a single ayah. */
  portion?: 'a' | 'b'
  label: string
  /** Short excerpt shown on the map node. */
  arabicExcerpt: string
  /** The complete relevant passage shown in the detail panel. */
  arabicFull: string
  translation: string
  /** Index into FATIHA_RING_PAIRS. */
  pair: number
}

export interface RingPair {
  /** Indices into FATIHA_RING_NODES (one entry for the hinge). */
  ids: number[]
  color: string
  /** Label drawn on the connecting line. */
  lineLabel: string
  /** Shorter line label for narrow maps. */
  lineLabelShort: string
  /** Label for the pair shortcut button. */
  pickerLabel: string
  /** Detail-panel heading, one entry per line. */
  title: string[]
  body: string
  kind: string
  note: string
}

export const FATIHA_OPENING = {
  ref: '1:1',
  arabic: CANONICAL_ARABIC[1],
  translation: TRANSLATION[1],
}

export const FATIHA_RING_PAIRS: RingPair[] = [
  {
    ids: [0, 6],
    color: '#89c8cb',
    lineLabel: 'contrast',
    lineLabelShort: 'contrast',
    pickerLabel: 'Praise / wrong paths',
    title: ['Praise and its contrast.'],
    body:
      'AyahGuide pairs the opening praise with the closing description of wrong paths. Its reading treats the ending as a contrast to the recognition and orientation expressed at the beginning.',
    kind: 'Thematic contrast',
    note: 'The two passages do not repeat the same words. This is an interpretive pairing, not a literal grammatical mirror.',
  },
  {
    ids: [1, 5],
    color: '#b5a0e0',
    lineLabel: 'mercy → favor',
    lineLabelShort: 'mercy',
    pickerLabel: 'Mercy / favor',
    title: ['Mercy named.', 'Mercy received.'],
    body:
      'The opening names God as merciful. The closing asks for the path of those He has favored. AyahGuide connects the named attribute with the blessing sought by the person praying.',
    kind: 'Thematic correspondence',
    note: '“Mercy” and “favor” are different words. The proposed link is in meaning, not an identical Arabic root.',
  },
  {
    ids: [2, 4],
    color: '#d8b578',
    lineLabel: 'awe → petition',
    lineLabelShort: 'petition',
    pickerLabel: 'Sovereignty / guidance',
    title: ['Sovereignty.', 'Then a request.'],
    body:
      'The surah acknowledges the Master of the Day of Judgment, then asks for guidance after its central declaration of worship and reliance. AyahGuide reads the petition in the light of that acknowledgment.',
    kind: 'Thematic correspondence',
    note: 'This pairing is the page’s structural reading; the clauses themselves have different grammatical forms.',
  },
  {
    ids: [3],
    color: '#dcc58b',
    lineLabel: 'the hinge',
    lineLabelShort: 'hinge',
    pickerLabel: 'The hinge',
    title: ['The point', 'of direct address.'],
    body:
      `The preceding verses describe God. In ayah 5, ${words(5, 0, 1)} directly addresses Him: “You alone.” The prayer then continues with a request for guidance.`,
    kind: 'Grammatical shift',
    note: 'The change into direct address is visible in the text. Placing it at the center of these paired themes is the interpretive map.',
  },
]

/** Hinge pair index. */
export const FATIHA_HINGE_PAIR = 3

/** Map order: 1:2, 1:3, 1:4, 1:5, 1:6, 1:7a, 1:7b. */
export const FATIHA_RING_NODES: RingVerse[] = [
  { ref: '1:2', ayah: 2, label: 'Praise', arabicExcerpt: words(2, 0, 2), arabicFull: words(2, 0), translation: TRANSLATION[2], pair: 0 },
  { ref: '1:3', ayah: 3, label: 'Mercy', arabicExcerpt: words(3, 0, 1), arabicFull: words(3, 0), translation: TRANSLATION[3], pair: 1 },
  { ref: '1:4', ayah: 4, label: 'Sovereignty', arabicExcerpt: words(4, 0), arabicFull: words(4, 0), translation: TRANSLATION[4], pair: 2 },
  { ref: '1:5', ayah: 5, label: 'The hinge', arabicExcerpt: words(5, 0, 2), arabicFull: words(5, 0), translation: TRANSLATION[5], pair: 3 },
  { ref: '1:6', ayah: 6, label: 'Guidance', arabicExcerpt: words(6, 0, 1), arabicFull: words(6, 0), translation: TRANSLATION[6], pair: 2 },
  {
    ref: '1:7a', ayah: 7, portion: 'a', label: 'Favored path',
    arabicExcerpt: words(7, 2, 4), arabicFull: words(7, 0, 4),
    translation: 'the path of those upon whom You have bestowed favor,', pair: 1,
  },
  {
    ref: '1:7b', ayah: 7, portion: 'b', label: 'Wrong paths',
    arabicExcerpt: words(7, 7, 9), arabicFull: words(7, 4, 9),
    translation: 'not of those who have evoked anger or of those who have gone astray.', pair: 0,
  },
]
