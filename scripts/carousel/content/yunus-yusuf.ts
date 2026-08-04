import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'يُونُسُ vs يُوسُفُ',
  headerLabel:  'Prophet Comparison',
  totalSlides:  5,
  theme:        'gold',  // Prophet Comparison default
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'ظُلُمَاتٌ',
    hookLine:    'Both were swallowed by darkness.',
    payoff:      'One chose it. One was thrown in.',
    subtext:     "Yunus entered darkness by leaving. Yusuf was dragged into it by those who loved him. Their responses could not have been more different.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Same Darkness. Different Journey.',
    subtitle: 'The whale and the well — both places of total isolation',
    stages: [
      {
        arabic: '١',
        title:  'Yusuf — thrown in without warning',
        desc:   'His brothers stripped him and cast him into a well. He was a child. He did nothing wrong. The Quran says Allah revealed to him: you will tell them of this one day.',
      },
      {
        arabic: '٢',
        title:  'Yunus — swallowed by his own departure',
        desc:   'He left his mission. The ship cast lots. He knew — the lot was his. He entered the whale carrying the weight of his own choice.',
      },
      {
        arabic: '٣',
        title:  'Both emerged to something greater',
        desc:   'Yusuf rose to the throne of Egypt. Yunus was sent to 100,000 who believed. The darkness was not the end of either story.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'How Each Responded',
    subtitle:   'Patience before the trial vs. repentance after it',
    leftLabel:  'Yusuf',
    rightLabel: 'Yunus',
    pairs: [
      { left: 'Wronged by others — bore it silently.',   right: 'Wronged himself — admitted it immediately.' },
      { left: 'Patient through years of injustice.',     right: 'Repentant in a single moment of darkness.' },
      { left: 'Never complained of his circumstances.',  right: 'Took full responsibility for his.'         },
    ],
    insight: "The Quran honors both. Sabr before the test. Tawbah after it. We need to know both.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Revelation in the Well · Yusuf 12:15',
    arabic:      'وَأَوْحَيْنَآ إِلَيْهِ لَتُنَبِّئَنَّهُم بِأَمْرِهِمْ هَٰذَا وَهُمْ لَا يَشْعُرُونَ',
    translation: 'And We revealed to him: you will surely inform them of this deed of theirs — while they do not perceive.',
    reference:   'Surah Yusuf · 12:15',
    insight:
      'While Yusuf was at the bottom of the well, abandoned, Allah was already narrating the end of the story to him. ' +
      'The darkness was not absence. It was preparation.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Darkness Question',
    heading:      'Which kind of darkness are you in?',
    questions: [
      {
        label:    'The Well',
        question: 'Are you in a darkness you did not choose — wronged by someone else?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Whale',
        question: 'Are you in a darkness that came from your own decision?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Yusuf',
        question: 'Can you hold on without knowing when it ends — trusting the end is already written?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Yunus',
        question: 'Is there something you need to name before Allah — simply, without excuse?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "Both men came out. The question is only what you do while you are in.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Yusuf was thrown into a well by his brothers. Yunus jumped into a situation of his own making.

Both landed in total darkness. Both came out to something greater.

The Quran honors both responses — patient endurance and honest repentance. We need both.

Save this 🤍

Which kind of darkness are you in right now — the well or the whale? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
