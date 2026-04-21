import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة يوسف',
  headerLabel:  'Yusuf · The Dream',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يَا أَبَتِ',
    hookLine:    'A child tells his father a dream.',
    payoff:      "The father tells him: don't repeat it.",
    subtext:     "Yusuf's story begins not with a miracle, but with a warning — that some gifts from Allah need to be protected in silence before they can ripen in public.",
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Scene Before the Surah Begins',
    subtitle: 'Four movements · all of them private',
    stages: [
      {
        arabic: '١',
        title:  'A boy speaks in diminutives',
        desc:   '"Ya abati" — my dear father. Before the pit, before the palace, before Egypt, Yusuf is just a son in a safe room. (12:4)',
      },
      {
        arabic: '٢',
        title:  'He describes what overwhelmed him',
        desc:   "Eleven stars, the sun, and the moon prostrating to him. He says \"I saw\" twice — a child trying to tell what exceeded him. (12:4)",
      },
      {
        arabic: '٣',
        title:  "A father reads the danger first",
        desc:   '"Do not tell this to your brothers." Yaqub doesn\'t deny the dream. He regulates its disclosure. Truth and timing are not the same thing. (12:5)',
      },
      {
        arabic: '٤',
        title:  'Then he names the horizon',
        desc:   '"Thus will your Lord choose you" — ijtiba, selection with nearness. The gift is real. It just has to be guarded until Allah completes it. (12:6)',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What the Child Heard · What the Father Saw',
    subtitle:   'Two readings of the same dream',
    leftLabel:  'Yusuf\'s response',
    rightLabel: 'Yaqub\'s response',
    pairs: [
      { left: 'Wonder at the image',          right: 'Weight of its meaning'                },
      { left: 'A story worth telling',         right: 'A secret worth keeping'              },
      { left: "Innocence as protection",       right: 'Envy as real danger'                 },
      { left: 'The dream as the end',          right: 'The dream as the beginning'          },
    ],
    insight: "A loving person often reads your gift more seriously than you can.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Selection · Yusuf 12:6',
    arabic:      'وَكَذَٰلِكَ يَجْتَبِيكَ رَبُّكَ وَيُعَلِّمُكَ مِن تَأْوِيلِ ٱلْأَحَادِيثِ',
    translation: 'And thus will your Lord choose you and teach you the interpretation of events.',
    reference:   'Surah Yusuf · 12:6',
    insight:
      'Ijtiba is not ordinary preference. It is selection with drawing-near. ' +
      'The dream is the hint. The hidden years — the pit, the house, the prison — are the teaching.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Yusuf Pattern',
    heading:      'What has Allah shown you that needs protecting, not broadcasting?',
    questions: [
      {
        label:    'Dream',
        question: 'What glimpse of a future has Allah placed inside you?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Silence',
        question: 'Who around you cannot yet carry the weight of what you\'ve been given?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Counsel',
        question: 'Is there a wiser heart reading your gift more seriously than you are?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Patience',
        question: 'Can you bear the hidden years between the dream and its completion?',
        color:    PALETTE.power.main,
      },
    ],
    closing: "When Allah shows you something luminous, guard it. Let Him complete what only He can complete.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `Yusuf's story begins with a dream — and a father telling him not to repeat it.

"Ya abati, I saw eleven stars and the sun and the moon prostrating to me." The child is amazed. The father is already protective. "Do not tell this to your brothers. They will plot against you."

Yaqub doesn't deny the gift. He regulates its disclosure. Then he names the horizon: "Thus will your Lord choose you." Ijtiba — selection with nearness.

The dream was real. The pit, the house, the prison were the teaching.

Save this for the seasons where your gift feels buried 🤍

What has Allah shown you that needs protecting, not broadcasting? ↓

·
·
·
#yusuf #surahyusuf #quran #tadabbur #islamicwisdom`;
}
