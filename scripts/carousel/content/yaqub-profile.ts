import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'يَعْقُوبُ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
  theme:        'light',  // Yaqub — age, tears, patient grief
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يَعْقُوبُ',
    hookLine:    'He was told his son was dead.',
    payoff:      'He never believed it.',
    subtext:     "For 40 years, Yaqub grieved. And for 40 years, he refused to stop hoping. Both at the same time.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Forty Years of Both',
    subtitle: 'Grief and hope — held together',
    stages: [
      {
        arabic: '١',
        title:  'His sons returned with a bloodied shirt',
        desc:   'They said a wolf had taken Yusuf. Yaqub looked at the shirt. He said: "Your souls have tempted you." He did not believe them.',
      },
      {
        arabic: '٢',
        title:  'His eyes went white from weeping',
        desc:   'The grief was real. He wept until he lost his sight. And still told his sons: "Do not despair of the mercy of Allah."',
      },
      {
        arabic: '٣',
        title:  'He smelled Yusuf from a distance',
        desc:   'Decades later, before the caravan arrived, he said: "I can smell Yusuf." His sons thought he had lost his mind. He had not.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What He Chose to Do With the Grief',
    subtitle:   'He did not suppress it. He directed it.',
    leftLabel:  'What He Did Not Do',
    rightLabel: 'What He Did',
    pairs: [
      { left: 'Pretend he was fine',           right: 'Wept openly, lost his sight'              },
      { left: 'Blame Allah',                    right: '"I complain only to Allah."'              },
      { left: 'Give up on Yusuf',              right: 'Told his sons to keep searching'          },
    ],
    insight: "He taught his sons to hope while he himself was breaking. That is a different kind of strength.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Complaint · Yusuf 12:86',
    arabic:      'إِنَّمَآ أَشْكُو بَثِّي وَحُزْنِي إِلَى ٱللَّهِ وَأَعْلَمُ مِنَ ٱللَّهِ مَا لَا تَعْلَمُونَ',
    translation: 'I only complain of my grief and sorrow to Allah — and I know from Allah what you do not know.',
    reference:   'Surah Yusuf · 12:86',
    insight:
      'He did not say "I am fine." He did not say "I have accepted Allah\'s decree." ' +
      'He said: I am in pain, and I am telling Allah about it. ' +
      'That is not weakness. That is the most honest form of tawakkul.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Yaqub Pattern',
    heading:      'Who are you grieving — while still hoping?',
    questions: [
      {
        label:    'The Shirt',
        question: 'What loss were you told to accept — that you have never fully accepted?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Weeping',
        question: 'Have you told Allah — honestly — how much something has cost you?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Smell',
        question: 'What are you still sensing is possible, that others think is gone?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Reunion',
        question: 'What would it change if the thing you lost came back — transformed?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "He grieved fully and hoped fully. The Quran says both were right.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `He was told his son was dead. He never believed it.

For 40 years, Yaqub wept until his eyes went white. And in the same breath told his sons: do not despair of the mercy of Allah.

He didn't suppress the grief. He directed it. "I complain only to Allah."

That is not weakness. That is the most honest form of tawakkul.

Save this 🤍

What loss were you told to accept — that you have never fully accepted? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
