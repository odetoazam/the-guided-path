import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'إِبْرَاهِيمُ وَإِسْمَاعِيلُ',
  headerLabel:  'Prophet Comparison',
  totalSlides:  5,
  theme:        'light',  // Ibrahim/Ismail — fire and sacrifice
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'نَعَمْ',
    hookLine:    'The father said yes. The son said yes.',
    payoff:      'No one had to be convinced.',
    subtext:     "The most complete act of surrender in the Quran was not one person — it was two, at the same moment.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Conversation That Changed History',
    subtitle: 'Surah As-Saffat 37:102 — word for word',
    stages: [
      {
        arabic: '١',
        title:  'Ibrahim told his son the dream',
        desc:   'He did not hide it. He did not soften it. "I see in a dream that I am sacrificing you. What do you think?"',
      },
      {
        arabic: '٢',
        title:  'Ismail responded without hesitation',
        desc:   '"Do what you are commanded, Father. You will find me, if Allah wills, among the patient."',
      },
      {
        arabic: '٣',
        title:  'Both submitted — and both were spared',
        desc:   'The knife was raised. Allah called out: "You have fulfilled the vision." A ram was sent. This is the origin of Eid al-Adha.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What Made This Different',
    subtitle:   'Both had a choice. Both chose the same thing.',
    leftLabel:  'Ibrahim',
    rightLabel: 'Ismail',
    pairs: [
      { left: 'Asked his son — did not command him.',   right: 'Was asked — could have said no.'           },
      { left: 'The hardest thing a father could do.',   right: 'The hardest thing a son could say.'        },
      { left: 'Surrendered his love for Allah.',        right: 'Surrendered his life for Allah.'           },
    ],
    insight: "Ismail's yes was as important as Ibrahim's. The Quran recorded both.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Son\'s Answer · As-Saffat 37:102',
    arabic:      'قَالَ يَٰٓأَبَتِ ٱفْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ مِنَ ٱلصَّٰبِرِينَ',
    translation: 'He said: "O my father, do what you are commanded. You will find me, if Allah wills, among the patient."',
    reference:   'Surah As-Saffat · 37:102',
    insight:
      'He did not say "I am ready." He said: "You will find me patient — if Allah wills." ' +
      'Even in the moment of total surrender, he knew the strength was from Allah, not himself.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Double Yes',
    heading:      'What are you being asked to surrender?',
    questions: [
      {
        label:    'Ibrahim',
        question: 'What is the thing you love most — that you have been asked to offer?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Ismail',
        question: 'Has someone in your life had to say yes to something because of your faith?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Conversation',
        question: 'Who in your life do you need to be honest with about what Allah is asking of you?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Ram',
        question: 'Where has Allah replaced your sacrifice with something you did not expect?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "The test was not the knife. The test was the yes — from both of them.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Ibrahim asked his son. He didn't command him.

Ismail said: do what you are commanded, Father. You will find me among the patient.

The most complete act of surrender in the Quran required two yeses. The Quran recorded both.

Save this 🤍

What is the thing you love most that you are being asked to surrender? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
