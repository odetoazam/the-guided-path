import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة الفاتحة',
  headerLabel:  'Surah Architecture',
  totalSlides:  5,
  theme:        'gold',  // Surah Architecture
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'أُمُّ الْكِتَابِ',
    hookLine:    'Seven lines. The whole Quran.',
    payoff:      'Every theme. Every need. Every truth.',
    subtext:     "The Prophet ﷺ called Al-Fatiha 'the Mother of the Book.' Not a summary — a seed. Everything in 114 surahs grows from what is already here.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Architecture of Al-Fatiha',
    subtitle: 'Seven ayahs — each one a world',
    stages: [
      {
        arabic: '١–٣',
        title:  'Who Allah Is',
        desc:   'Rabb al-ʿālamīn — Lord of all worlds. Al-Raḥmān al-Raḥīm — the infinitely merciful. Mālik yawm al-dīn — Master of the Day of Judgment. Three names. Three complete dimensions.',
      },
      {
        arabic: '٤',
        title:  'The Turning Point',
        desc:   '"You alone we worship. You alone we ask for help." This is the center of the surah — and the center of existence. Everything before this was about Allah. Everything after is about us.',
      },
      {
        arabic: '٥–٧',
        title:  'The Only Duʿāʾ',
        desc:   '"Guide us to the straight path." That\'s the entire request. Not health, not wealth, not safety — guidance. Then it specifies: the path of those You blessed, not those who earned anger or went astray.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'The Surah Divided in Two',
    subtitle:   'A hadith qudsi — Allah\'s own explanation',
    leftLabel:  'Allah\'s Half (1–4)',
    rightLabel: 'Your Half (5–7)',
    pairs: [
      { left: 'Praise and recognition of Who He is.',  right: 'One request — and only one.' },
      { left: 'You describe Allah before you ask.',     right: 'You ask only after you\'ve praised.' },
      { left: 'He says: "My servant has praised Me."', right: 'He says: "My servant has asked — it is his."' },
    ],
    insight: "In Sahih Muslim, Allah says: 'I have divided the prayer between Myself and My servant equally — and My servant shall have what he asks.' Every rakʿah. Every day.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Center · Al-Fatiha 1:5',
    arabic:      'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'You alone we worship, and You alone we ask for help.',
    reference:   'Surah Al-Fatiha · 1:5',
    insight:
      'The verb order matters: worship before help. We don\'t say "help us so we can worship you." ' +
      'We worship first — and ask from within that act. This one shift changes the entire posture of duʿāʾ.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Seven Lines',
    heading:      'You recite this 17 times a day. Do you hear it?',
    questions: [
      {
        label:    'Rabb',
        question: 'When you say "Lord of all worlds" — whose world do you actually believe He runs?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'ʿIbādah',
        question: 'Is your worship aimed at Him — or at results, reputation, or relief?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Istʿāna',
        question: 'What are you trying to manage right now without asking Him for help?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Guidance',
        question: 'Is the thing you want most right now guidance — or something else?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "It's not seven lines. It's a conversation Allah opens 17 times a day — waiting for you to mean it.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Al-Fatiha is 7 lines. The Prophet ﷺ called it the Mother of the Book.

Not a summary — a seed. Every theme in the Quran grows from what's already here.

Allah literally divided it in two in a hadith qudsi: the first half is His, the second half is yours. And He said: My servant asked — it is his.

You recite this 17 times a day.

Save this 🤍

When was the last time you actually heard what you were saying? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
