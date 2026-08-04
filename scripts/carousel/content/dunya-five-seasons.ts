import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'ٱلدُّنْيَا',
  headerLabel:  'Word Study',
  totalSlides:  5,
  theme:        'deep',
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'ٱلدُّنْيَا',
    hookLine:    'The word for “this world” means the lower one.',
    payoff:      'And the Quran defines it in five descending words.',
    subtext:     'The root د-ن-و means near, low, base. Al-dunyā isn\'t neutral — it is literally “the lower life.” And in one ayah (57:20), Allah lists exactly what that lower life is made of.',
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Five Seasons',
    subtitle: 'What 57:20 says the lower life actually is',
    stages: [
      { arabic: 'لَعِب',     title: 'Laʿib — play',         desc: 'Urgent in the moment, forgotten by morning.' },
      { arabic: 'لَهْو',     title: 'Lahw — distraction',   desc: 'What pulls you from what actually matters.' },
      { arabic: 'زِينَة',    title: 'Zīna — adornment',     desc: 'The image, the surface, the polish.' },
      { arabic: 'تَفَاخُر',  title: 'Tafākhur — boasting',  desc: 'Measuring yourself against others, out loud.' },
      { arabic: 'تَكَاثُر',  title: 'Takāthur — competing', desc: 'The endless race to out-accumulate.' },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'The Rain That Forgot It Would Dry',
    subtitle:   'The parable inside the same ayah',
    leftLabel:  'What dazzles',
    rightLabel: 'What follows',
    pairs: [
      { left: 'Growth that amazes the farmers.',  right: 'Then it yellows before your eyes.' },
      { left: 'The lush, the green, the alive.',   right: 'Then it crumbles to ḥuṭām — debris.' },
      { left: 'The peak you’re chasing now.',      right: 'The same peak, a season later.' },
    ],
    insight: 'The ayah doesn\'t say the dunya is evil. It says it is a season — dazzling, then yellowing, then gone. The error isn\'t enjoying it. It\'s forgetting it dries.',
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'Al-Hadid · 57:20',
    arabic:      'وَمَا ٱلْحَيَوٰةُ ٱلدُّنْيَآ إِلَّا مَتَـٰعُ ٱلْغُرُورِ',
    translation: 'And the lower life is nothing but the enjoyment of delusion.',
    reference:   'Surah Al-Hadid · 57:20',
    insight:
      'Matāʿ al-ghurūr — the enjoyment of delusion. Not the enjoyment that IS a delusion, but the enjoyment that deludes you ' +
      'into thinking the lower life is the whole story. Use it. Just don\'t be fooled by it.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Al-dunyā · the lower life',
    heading:      'Which of the five seasons has the most of your heart right now?',
    questions: [
      { label: 'Distraction', question: 'What lahw is quietly eating the hours you meant to give to what lasts?', color: PALETTE.power.main },
      { label: 'Image',       question: 'How much of your effort goes to the zīna — the surface others see?', color: PALETTE.faith.main },
      { label: 'The race',    question: 'Who are you secretly competing with in takāthur — and did you ever agree to that race?', color: PALETTE.knowledge.main },
    ],
    closing: 'Plant for the season that doesn\'t yellow. The lower life is real — it just isn\'t the harvest.',
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `The Arabic for "this world" — ٱلدُّنْيَا — literally means "the lower one." The root د-ن-و is near, low, base.

It was never a neutral word. And in a single ayah (57:20), Allah defines exactly what this lower life is made of — in five descending words:

لَعِب — play
لَهْو — distraction
زِينَة — adornment (the image)
تَفَاخُر — boasting
تَكَاثُر — competing to out-accumulate

Then the parable: growth that amazes the farmers… then yellows… then crumbles to debris (ḥuṭām).

"And the lower life is nothing but the enjoyment of delusion." (57:20)

Not the enjoyment that IS a delusion — the enjoyment that deludes you into thinking this is the whole story. Use the dunya. Just don't forget it dries.

Which of the five seasons has the most of your heart right now? ↓

Save this 🤍

·
·
·
#Quran #dunya #tadabbur #islam #QuranicArabic #quranreflection #islamicreminders`;
}
