import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'فِتْنَة',
  headerLabel:  'Word Study',
  totalSlides:  5,
  theme:        'deep',  // heavy, furnace-dark
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'فِتْنَة',
    hookLine:    'Fitna does not mean chaos.',
    payoff:      'It is the fire that purifies gold.',
    subtext:     'The root ف-ت-ن first described the assayer placing ore in the furnace — burning it to separate pure gold from worthless dross. What we flatten into "trial" or "chaos" began as the refiner\'s fire.',
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'One Word, Three Lives',
    subtitle: 'How fitna travels — Lisān al-ʿArab · Mufradāt al-Rāghib',
    stages: [
      {
        arabic: '١',
        title:  'The furnace',
        desc:   'The literal root: to melt ore in fire. Gold is not destroyed by the flame — it is revealed by it. The fire removes only what was never truly gold.',
      },
      {
        arabic: '٢',
        title:  'The assay',
        desc:   'From there: a test that exposes what something is made of. Heat does not change the gold. It changes what is mixed in with it. The flame is a question, and the metal answers.',
      },
      {
        arabic: '٣',
        title:  'Your trial',
        desc:   'And finally: the difficulty — or the ease — you are inside right now. Not a punishment dropped on you, but a furnace working on you. Burning away the version of you that was never real.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What Fitna Is and Is Not',
    subtitle:   'The panic reading vs. the root',
    leftLabel:  'How we hear it',
    rightLabel: 'What the root says',
    pairs: [
      { left: 'Random chaos that ruins you.',      right: 'A controlled fire that reveals you.' },
      { left: 'A punishment for being bad.',        right: 'A process that separates the gold.'  },
      { left: 'Something to just survive.',          right: 'Something that is working on you.'   },
    ],
    insight: 'Fitna is not Allah breaking you. It is Allah assaying you — and gold has nothing to fear from the fire. Only the dross is afraid.',
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'Al-Anbiya · 21:35',
    arabic:      'وَنَبْلُوكُم بِٱلشَّرِّ وَٱلْخَيْرِ فِتْنَةً',
    translation: 'And We test you with evil and with good as a trial (fitnah).',
    reference:   'Surah Al-Anbiya · 21:35',
    insight:
      'Read the order: evil AND good are both fitnah. ' +
      'The hard times refine you — but so do the easy ones. ' +
      'Comfort is the furnace most people never notice they are standing in.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Fitna · the refining fire',
    heading:      'What is your current fitna trying to reveal?',
    questions: [
      {
        label:    'The hardship',
        question: 'What is the difficulty you are in right now burning away — and what is it leaving behind that is real?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The ease',
        question: 'Where has comfort quietly become a test you did not realize you were taking?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The gold',
        question: 'If this season is an assay, what part of you is proving to be solid gold?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: 'You are not being destroyed. You are being refined. The fire only takes what was never you.',
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Fitna doesn't mean chaos. Not at the root.

The root ف-ت-ن described the assayer's furnace — melting ore to separate pure gold from the dross. Gold isn't destroyed by that fire. It's revealed by it.

So when the Quran calls your trial a "fitnah," it isn't calling it random punishment. It's calling it a refining fire — and the fire only takes what was never really you.

And notice the verse: "We test you with evil AND with good as a trial." (21:35)

Hardship refines you. But so does ease. Comfort is the furnace most people never notice they're standing in.

Save this for the next hard season 🤍

Which is your furnace right now — the hardship, or the ease? ↓

·
·
·
#Quran #fitna #tadabbur #islam #ArabicLanguage #quranreflection #islamicreminders #patience`;
}
