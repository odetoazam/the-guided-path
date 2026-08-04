import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'دَاوُودُ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
  theme:        'dark',  // Dawud — mountains, Psalms, nature
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'دَاوُودُ',
    hookLine:    'He had everything.',
    payoff:      'And wept more than anyone.',
    subtext:     "Dawud was king, prophet, and the most powerful man of his era. The Quran says he was also the one who wept most.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    "The Weight of His Gifts",
    subtitle: 'Each blessing was also a responsibility',
    stages: [
      {
        arabic: '١',
        title:  'Killed Goliath as a young man',
        desc:   'A shepherd boy with a sling. An army that had already retreated. One stone. The battle changed in a moment.',
      },
      {
        arabic: '٢',
        title:  'Given the Zabur — his scripture was song',
        desc:   'Mountains and birds made tasbih with him. When Dawud recited, everything around him joined.',
      },
      {
        arabic: '٣',
        title:  'King of the most powerful kingdom on earth',
        desc:   'Wind, jinn, and animals were subject to him. He judged with perfect justice. And he fasted every other day for life.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Power Without Distance',
    subtitle:   'What made him different from every other king',
    leftLabel:  'What Power Usually Produces',
    rightLabel: 'What It Produced in Dawud',
    pairs: [
      { left: 'Self-sufficiency',   right: 'The most intense worship of any prophet' },
      { left: 'Comfort',            right: 'He fasted every other day, all his life'  },
      { left: 'Distance from Allah', right: 'He was called Khalifah — steward of Allah on earth' },
    ],
    insight: "He didn't weep despite his power. He wept because he understood it.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Stewardship · Sad 38:26',
    arabic:      'يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُم بَيْنَ النَّاسِ بِالْحَقِّ',
    translation: 'O Dawud, We have made you a steward on the earth — so judge between people with truth.',
    reference:   'Surah Sad · 38:26',
    insight:
      'Khalifah is not just a title. It is a weight. ' +
      'Every decision, every judgment, every moment of power — carried in front of Allah. ' +
      'Dawud understood this. That is why he wept.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Dawud Pattern',
    heading:      'What has power done to your relationship with Allah?',
    questions: [
      {
        label:    'The Sling',
        question: 'What victory came to you when you were the least equipped?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Zabur',
        question: 'What form does your worship take — and does it still move you?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Kingdom',
        question: 'Where has success made you feel less dependent on Allah?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Tears',
        question: 'When did you last weep in salah — and what was it about?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "The most powerful man of his age bowed the most. That is the Dawud pattern.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `He had everything. And wept more than anyone.

Dawud was king, prophet, warrior. Mountains made tasbih with him. Wind and jinn were subject to him.

And he fasted every other day for the rest of his life. And he wept in worship more than any prophet before or after.

Power didn't take him away from Allah. It drove him toward Him.

Save this 🤍

Where has success made you feel less dependent on Allah? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
