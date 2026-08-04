import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'تَفَكُّر',
  headerLabel:  'Reflection',
  totalSlides:  5,
  theme:        'dark',
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'بَاطِلًا',
    hookLine:    'The universe is not pointless.',
    payoff:      'And the Quran puts the proof inside a prayer.',
    subtext:     'In Aal-Imran 3:190–191, the people of understanding look at the heavens and the earth long enough — and reach one conclusion they then say back to God.',
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Remembrance in Every Posture',
    subtitle: '3:191 — there is no position of life closed to Him',
    stages: [
      { arabic: 'قِيَامًا',  title: 'Standing',     desc: 'They remember Him on their feet — in strength, in the middle of the day, in the doing.' },
      { arabic: 'قُعُودًا',  title: 'Sitting',      desc: 'And seated — in the pauses, the waiting, the ordinary hours between.' },
      { arabic: 'عَلَىٰ جُنُوبِهِمْ', title: 'On their sides', desc: 'And lying down — in weakness, in sleeplessness, in the dark before dawn.' },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Ways to Read the Sky',
    subtitle:   'The same stars. Opposite conclusions.',
    leftLabel:  'It’s all random',
    rightLabel: 'It was made',
    pairs: [
      { left: 'Meaning is something we invent.',       right: 'Meaning is something we discover.' },
      { left: 'Look away from the void.',              right: 'Look INTO creation — and find Him.' },
      { left: 'Reflection ends in despair.',            right: 'Reflection ends in prayer.' },
    ],
    insight: 'The Quran doesn’t ask you to stop thinking. It asks you to think *further* — past the surface of things, until the design becomes undeniable and the only honest response is to turn to the Designer.',
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'Aal-Imran · 3:191',
    arabic:      'رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَـٰطِلًا',
    translation: 'Our Lord, You did not create this in vain.',
    reference:   'Surah Aal-Imran · 3:191',
    insight:
      'Notice it’s addressed to Him — not stated about Him. Reflection on creation doesn’t end as a fact in a notebook. ' +
      'It ends as a sentence spoken back to God. The thinking becomes a prayer.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Tafakkur · reflection',
    heading:      'When did you last look at creation long enough to be moved by it?',
    questions: [
      { label: 'The pause',   question: 'What would change if you treated one daily sight — the sky, a face, your own breath — as a sign, not scenery?', color: PALETTE.knowledge.main },
      { label: 'The posture', question: 'Standing, sitting, lying down — which of these is the hardest for you to remember Him in?', color: PALETTE.faith.main },
      { label: 'The turn',    question: 'Where has your thinking been ending in despair, when it was meant to end in prayer?', color: PALETTE.power.main },
    ],
    closing: 'You were given a mind that can read the design. The people of understanding let it carry them all the way to “Rabbanā.”',
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `The universe isn't pointless. And the Quran puts the proof inside a prayer.

In Aal-Imran 3:190–191, the "people of understanding" remember Allah in every posture:

قِيَامًا — standing
قُعُودًا — sitting
عَلَىٰ جُنُوبِهِمْ — on their sides

…and they reflect on the heavens and the earth until they reach one conclusion — which they then say back to God:

رَبَّنَا مَا خَلَقْتَ هَـٰذَا بَاطِلًا
"Our Lord, You did not create this in vain." (3:191)

Notice: it's addressed TO Him, not stated about Him. Reflection on creation isn't meant to end as a fact in a notebook. It's meant to end as a sentence spoken back to the One who made it.

The Quran never asks you to stop thinking. It asks you to think further — until the design is undeniable and the only honest response is "Rabbanā."

When did you last look at creation long enough to be moved by it? ↓

Save this 🤍

·
·
·
#Quran #tafakkur #tadabbur #islam #QuranicArabic #quranreflection #islamicreminders`;
}
