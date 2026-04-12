import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة الكهف',
  headerLabel:  'Al-Kahf · Section A',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'أَصْحَـٰبَ ٱلْكَهْفِ',
    hookLine:    "The cave story isn't about escape.",
    payoff:      "It's about what you say first.",
    subtext:     'The fityah spoke publicly before they withdrew. The cave was the answer to their stand — not a replacement for it.',
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Their Journey — In Order',
    subtitle: 'Four movements · one unbroken faith',
    stages: [
      {
        arabic: '١',
        title:  'They stood and declared',
        desc:   '"Our Lord is the Lord of the heavens and the earth." Said publicly, in front of their people. They didn\'t whisper it. (18:14–16)',
      },
      {
        arabic: '٢',
        title:  'Allah commanded the cave',
        desc:   '"Take refuge in the cave — your Lord will spread for you from His mercy." The withdrawal was an instruction, not a panic. (18:16)',
      },
      {
        arabic: '٣',
        title:  'He sealed their ears',
        desc:   '"We struck over their ears for a number of years." Not death — a protected sleep only He could measure. (18:11)',
      },
      {
        arabic: '٤',
        title:  'They woke wrong about time',
        desc:   '"How long did you remain?" — "A day, or part of a day." They had slept 309 years and didn\'t know it. (18:19, 18:25)',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Accounts of the Same Men',
    subtitle:   'The world\'s version · Allah\'s version',
    leftLabel:  'What the world saw',
    rightLabel: 'What Allah says',
    pairs: [
      { left: 'Young men, outnumbered',       right: 'فِتْيَةٌ — vitality at its peak'     },
      { left: 'They fled their society',       right: 'They spoke first, then withdrew'    },
      { left: 'Lost to time',                  right: 'We increased them in guidance'       },
      { left: 'Their hearts gave out',          right: 'We bound their hearts firm'         },
    ],
    insight: "The Quran never tells the world's version of events. It only tells the true one.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  // Arabic verified from content/tadabbur/018-al-kahf/ayahs-013-016.md
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Binding · Al-Kahf 18:13–14',
    arabic:      'إِنَّهُمْ فِتْيَةٌ ءَامَنُوا۟ بِرَبِّهِمْ وَزِدْنَـٰهُمْ هُدًى وَرَبَطْنَا عَلَىٰ قُلُوبِهِمْ',
    translation: 'Indeed, they were young men who believed in their Lord, and We increased them in guidance. And We bound firm their hearts.',
    reference:   'Surah Al-Kahf · 18:13–14',
    insight:
      'Three moves — and only the first one was theirs. They believed. Then Allah increased their guidance. ' +
      'Then Allah bound their hearts. Their job was to stand up. His job was to hold them.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Trial of Faith · Section A',
    heading:      'Where is your loyalty when you stand alone?',
    questions: [
      {
        label:    'Conviction',
        question: 'What do you believe that your immediate environment would push back on?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Voice',
        question: 'Are you withdrawing before speaking — or after?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Binding',
        question: "Where are you waiting for your heart to feel steady before you act?",
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Time',
        question: 'What would it mean to trust that your obscure years are already being counted?',
        color:    PALETTE.power.main,
      },
    ],
    closing: "They didn't bind their own hearts. They just stood up.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `The cave story isn't about escape. It's about what you say first.

The fityah spoke publicly before they withdrew — "Our Lord is the Lord of the heavens and the earth." Only after that declaration did Allah say: take refuge in the cave.

And when they entered, He didn't just protect their bodies. He bound their hearts firm. They didn't do that part. He did.

Save this 🤍

When was the last time you held a conviction your whole environment pushed back on? ↓

·
·
·
#alkahf #peopleoofthecave #quran #islamicwisdom #tadabbur`;
}
