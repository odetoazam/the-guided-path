import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'مُوسَىٰ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'hook',
    slideNum:   1,
    largeArabic: 'مُوسَىٰ',
    hookLine:   'Musa is mentioned 136 times in the Quran.',
    payoff:     'More than anyone.',
    subtext:    "That frequency isn't random. His story is the one Allah returns to — because it's the one we need most.",
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Journey Before the Mission',
    subtitle: 'Four stations · one design · no coincidences',
    stages: [
      {
        arabic: '١',
        title:  'Born under a death decree',
        desc:   'Hidden in the Nile. Found by the wife of the very man who feared him. Raised inside the palace that wanted him dead.',
      },
      {
        arabic: '٢',
        title:  'One strike. One exile.',
        desc:   'A man dies by his hand. The palace becomes a prison overnight. He flees Egypt with nothing but his life.',
      },
      {
        arabic: '٣',
        title:  'Ten years of hiddenness',
        desc:   "Shepherd. Stranger. Husband. Obscure years that felt like being forgotten — and were actually formation.",
      },
      {
        arabic: '٤',
        title:  'A fire that doesn\'t burn',
        desc:   '"Take off your sandals." A burning bush. A name announced from a valley he wandered into by accident.',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'His Strength Was His Test',
    subtitle:   'The same qualities — two edges',
    leftLabel:  'The Gift',
    rightLabel: 'The Trial',
    pairs: [
      { left: 'Unshakeable passion',       right: 'Uncontrollable anger'         },
      { left: 'Desperate urgency',          right: 'Impatience with Khiḍr'       },
      { left: 'Called to lead millions',    right: 'Asked Harun to speak for him' },
    ],
    insight: "Allah doesn't call the polished. He calls the fracture lines.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Selection · Tā Hā 20:13',
    arabic:      'وَأَنَا ٱخْتَرْتُكَ فَٱسْتَمِعْ لِمَا يُوحَىٰ',
    translation: 'And I have chosen you — so listen carefully to what is revealed.',
    reference:   'Surah Tā Hā · 20:13',
    insight:
      'Musa was alone, afraid, far from Egypt, carrying the weight of a man\'s death. ' +
      'The selection didn\'t wait for him to be ready. It arrived in his wilderness.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Musa Pattern',
    heading:      'Which station are you in right now?',
    questions: [
      {
        label:    'Palace',
        question: 'Where were you shaped by something you now need to leave behind?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Exile',
        question: 'What mistake became your turning point?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Madyan',
        question: 'Are you in the obscure years — and can you trust them?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Sinai',
        question: 'What calling have you been walking past?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "He wasn't called because he was ready. He was ready because he was called.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}
