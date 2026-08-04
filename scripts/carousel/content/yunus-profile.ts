import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'يُونُسُ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
  theme:        'dark',  // Yunus — whale, water, darkness
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يُونُسُ',
    hookLine:    'He left without permission.',
    payoff:      'Then took full responsibility.',
    subtext:     "Every other prophet was wronged by others. Yunus was the one who wronged himself — and said so.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Three Darknesses',
    subtitle: 'The whale. The ocean. The night.',
    stages: [
      {
        arabic: '١',
        title:  'He left his people in anger',
        desc:   'Allah had not yet given him permission to leave. He walked away — and the ship cast lots. The lot fell on him.',
      },
      {
        arabic: '٢',
        title:  'Swallowed by the whale',
        desc:   'Three layers of darkness: the night, the ocean, the whale. And in that total darkness, he made dhikr.',
      },
      {
        arabic: '٣',
        title:  'Cast onto the shore',
        desc:   'Expelled, sick, exposed. A gourd tree grew over him. Then: sent back to his people — 100,000 of them believed.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What He Did Differently',
    subtitle:   'The moment that changed everything',
    leftLabel:  'What He Could Have Said',
    rightLabel: 'What He Actually Said',
    pairs: [
      { left: '"Why is this happening to me?"',    right: '"I was of the wrongdoers."'           },
      { left: '"I was trying to help my people."', right: '"There is no god but You — glory to You."' },
      { left: '"I did not deserve this."',         right: '"I submit."'                          },
    ],
    insight: "The dua of Yunus has no complaint in it. Only acknowledgment.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Dua of the Whale · Al-Anbiya 21:87',
    arabic:      'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    translation: 'There is no god but You — glory be to You. Indeed, I was of the wrongdoers.',
    reference:   'Surah Al-Anbiya · 21:87',
    insight:
      'No explanation. No justification. No listing of good deeds. ' +
      'Three things only: tawhid, tasbih, and taking responsibility. ' +
      'The scholars say this dua has never been made sincerely without being answered.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Yunus Pattern',
    heading:      'What darkness are you making dhikr in?',
    questions: [
      {
        label:    'The Departure',
        question: 'Where have you left something — or someone — before you were ready?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Whale',
        question: 'What is the darkness you are in right now that feels total?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Dua',
        question: 'Is there something you need to take responsibility for — to Allah, not just yourself?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Shore',
        question: 'What would it mean to be sent back — healed — to the thing you left?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "The dua of the whale is not a cry for rescue. It is an act of recognition.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `He left without permission. Then took full responsibility.

Yunus didn't blame the whale. He didn't explain his intentions. In the deepest darkness — three layers of it — he said: there is no god but You. I was of the wrongdoers.

That's the dua the scholars say has never been made sincerely without being answered.

Save this 🤍

What is the darkness you are in right now — and what are you saying inside it? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
