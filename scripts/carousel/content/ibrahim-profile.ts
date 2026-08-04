import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'إِبْرَاهِيمُ',
  headerLabel:  'Prophet Series',
  totalSlides:  5,
  theme:        'dark',  // Ibrahim — fire, sacrifice, surrender
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'إِبْرَاهِيمُ',
    hookLine:    'Allah called him His Friend.',
    payoff:      'Then asked him to give up everyone he loved.',
    subtext:     'Khalilullah is not a title earned by comfort. It is earned by surrender.',
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Three Acts of Leaving',
    subtitle: 'Each one harder than the last',
    stages: [
      {
        arabic: '١',
        title:  'He left his father and his people',
        desc:   'Smashed the idols. Stood alone before a king. Thrown into a fire — and the fire was told to be cool.',
      },
      {
        arabic: '٢',
        title:  'He left his wife and infant son in the desert',
        desc:   '"Is this Allah\'s command?" Hajar asked. "Yes." "Then He will not abandon us." He walked away.',
      },
      {
        arabic: '٣',
        title:  'He raised the knife over his son',
        desc:   'He told Ismail. Ismail said: "Do what you are commanded. You will find me, if Allah wills, among the patient."',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What He Gave Up. What He Received.',
    subtitle:   'The arithmetic of surrender',
    leftLabel:  'The Surrender',
    rightLabel: 'What Came After',
    pairs: [
      { left: 'Left his homeland',            right: 'Given a new people across nations'      },
      { left: 'Left his son in an empty desert', right: 'That valley became the holiest city on earth' },
      { left: 'Raised the knife over Ismail', right: 'Given a ram — and a legacy to Qiyamah' },
    ],
    insight: "He never lost anything. He returned everything. That is the difference.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Submission · Al-Baqarah 2:131',
    arabic:      'إِذْ قَالَ لَهُ رَبُّهُ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ الْعَالَمِينَ',
    translation: 'When his Lord said to him, "Submit." He said, "I submit to the Lord of all worlds."',
    reference:   'Surah Al-Baqarah · 2:131',
    insight:
      'No negotiation. No conditions. No "I will — after this one thing." ' +
      'Complete surrender, in two words. This is why he was called Khalilullah.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Ibrahim Pattern',
    heading:      'What are you still holding on to?',
    questions: [
      {
        label:    'The Fire',
        question: 'Where has standing for truth cost you a relationship?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The Desert',
        question: 'What have you had to leave behind, trusting that Allah would provide?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Knife',
        question: 'What is the thing you love most — that you haven\'t yet surrendered?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Khalil',
        question: 'What would it mean to be Allah\'s friend — not just His servant?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "Khalilullah is not given to the comfortable. It is given to the surrendered.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `Allah called him His Friend.

Then asked him to leave his homeland, abandon his wife and infant son in a desert, and raise a knife over his firstborn.

Ibrahim didn't earn Khalilullah by being comfortable. He earned it by having nothing left to hold.

Save this 🤍

What is the one thing you love most that you haven't yet surrendered to Allah? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
