import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'يُوسُفُ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
  theme:        'dark',  // Yusuf — well, prison, depth
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يُوسُفُ',
    hookLine:    'Allah called it the most beautiful story ever told.',
    payoff:      'It contains a well. Slavery. A false accusation. Years of prison.',
    subtext:     "We misread beauty. Yusuf's story is the Quran showing us what it actually looks like.",
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Four Stations. One Design.',
    subtitle: 'Nothing was random. Nothing was wasted.',
    stages: [
      {
        arabic: '١',
        title:  'The Well',
        desc:   'Thrown in by his own brothers. Pulled out by a caravan. What looked like abandonment was a door opening.',
      },
      {
        arabic: '٢',
        title:  'The Palace',
        desc:   "Aziz's wife. A false accusation. A man who did everything right and still ended up in chains.",
      },
      {
        arabic: '٣',
        title:  'The Prison',
        desc:   'Years. He interpreted dreams, asked to be remembered, and was forgotten. Until the king dreamed.',
      },
      {
        arabic: '٤',
        title:  'The Throne',
        desc:   'Overnight: from prisoner to minister. The famine brought the whole world — including his brothers — to his door.',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Every Wound Was a Corridor',
    subtitle:   'The betrayal and the destination were never separate',
    leftLabel:  'The Act Against Him',
    rightLabel: 'Where It Led',
    pairs: [
      { left: 'Thrown into a well',            right: 'Arrived in the most powerful kingdom on earth' },
      { left: 'Wrongly imprisoned',             right: 'Positioned beside the king\'s inner circle'   },
      { left: 'Years of being forgotten',       right: 'The famine that brought his family to him'    },
    ],
    insight: "He didn't arrive despite what happened to him. He arrived through it.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Forgiveness · Yūsuf 12:92',
    arabic:      'لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ ٱللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ',
    translation: 'No blame upon you today. May Allah forgive you — and He is the most merciful of the merciful.',
    reference:   'Surah Yūsuf · 12:92',
    insight:
      'He had the power, the proof, and every right to settle the account. ' +
      'Decades of pain, and this was his first sentence. ' +
      'That is what sustained trust in Allah produces — not bitterness. Release.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Yusuf Pattern',
    heading:      'Which station are you in right now?',
    questions: [
      {
        label:    'The Well',
        question: 'Who put you somewhere you did not choose — and what has opened on the other side?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Palace',
        question: 'Where has doing the right thing cost you something?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Prison',
        question: 'Are you in years of hiddenness right now, feeling forgotten by Allah?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Throne',
        question: 'What would it mean to look back and say: it was all preparation?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "The most beautiful story Allah ever told has a well in it. So might yours.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `Allah called it the most beautiful story ever told.

It contains a well. Slavery. A false accusation. Years in prison. And one sentence of forgiveness that settles all of it.

Yusuf was not preserved despite what happened to him — he arrived through it. Every station that broke him was the corridor to the next one.

Save this 🤍

Which station are you in right now — the well, the palace, the prison, or the throne? ↓

·
·
·
#ProphetYusuf #Quran #IslamicReflection #QuranStudy #AyahGuide`;
}
