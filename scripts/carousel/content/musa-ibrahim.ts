import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'مُوسَىٰ vs إِبْرَاهِيمُ',
  headerLabel:  'Prophet Comparison',
  totalSlides:  5,
  theme:        'dark',  // Prophet Comparison default
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'ثِقَةٌ',
    hookLine:    'Both trusted Allah completely.',
    payoff:      'In completely different ways.',
    subtext:     "Musa argued. Ibrahim submitted. The Quran shows both — because we need both.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Two Men. Two Tests. One Allah.',
    subtitle: 'The shape of trust is not always the same',
    stages: [
      {
        arabic: '١',
        title:  'Ibrahim — silent surrender',
        desc:   '"Submit." "I submit." No questions. No negotiation. Complete trust expressed through immediate obedience.',
      },
      {
        arabic: '٢',
        title:  'Musa — trust through argument',
        desc:   'He pushed back. He asked Allah to slow down. He said "I am not eloquent." He negotiated — and Allah answered every time.',
      },
      {
        arabic: '٣',
        title:  'Both were called beloved',
        desc:   'Ibrahim: Khalilullah — Friend of Allah. Musa: Kalimullah — the one Allah spoke to directly. Different modes, same intimacy.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Kinds of Trust',
    subtitle:   'Neither is more correct than the other',
    leftLabel:  'Ibrahim',
    rightLabel: 'Musa',
    pairs: [
      { left: 'Silent. Immediate. No questions.',    right: 'Vocal. Negotiating. Full of questions.'  },
      { left: 'Left everything without asking why.', right: 'Asked why — and got answers.'            },
      { left: 'Trust expressed through stillness.',  right: 'Trust expressed through honest struggle.' },
    ],
    insight: "Allah chose both as His closest. Your way of trusting Him is not wrong — it is yours.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Intimacy · An-Nisa 4:125',
    arabic:      'وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا',
    translation: 'And Allah took Ibrahim as a close friend.',
    reference:   'Surah An-Nisa · 4:125',
    insight:
      'Khalil — from khulla — means a love that permeates everything, leaves no gap. ' +
      'Ibrahim earned this through surrender. Musa earned his closeness through honest conversation. ' +
      'Both are models. The Quran kept both.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Trust Question',
    heading:      'Which one are you more like right now?',
    questions: [
      {
        label:    'Ibrahim',
        question: 'Where are you being asked to submit without an explanation — and what is stopping you?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Musa',
        question: 'What honest struggle or question are you holding back from Allah?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Both',
        question: 'When did trusting Allah cost you something — and what came after?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Neither',
        question: 'Where are you not trusting Allah at all right now — and why?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: "The Quran gave us both prophets. It knew we would need both examples.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Ibrahim submitted without a single question. Musa argued, negotiated, pushed back.

Allah called Ibrahim His Friend. And spoke to Musa directly.

Both were right. The Quran kept both stories — because trust doesn't have one shape.

Save this 🤍

Which one are you more like right now — Ibrahim or Musa? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
