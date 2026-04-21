import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة مريم',
  headerLabel:  'Maryam · At the Palm',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'مَرْيَمَ',
    hookLine:    "The most remembered woman in the Quran",
    payoff:      'wished she had been forgotten.',
    subtext:     "Alone under a palm tree, in the hardest moment of her life, Maryam said: I wish I had died before this. Allah's answer came from beneath her feet.",
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Five Ayahs at the Palm Tree',
    subtitle: 'From wishing to vanish · to being told to eat',
    stages: [
      {
        arabic: '١',
        title:  'She withdrew to a distant place',
        desc:   '"She carried him and withdrew with him to a remote place." The woman of miracles walked alone into isolation. (19:22)',
      },
      {
        arabic: '٢',
        title:  'Labor drove her to the palm trunk',
        desc:   'Not a home, not a midwife — a tree. She said: "I wish I had died before this and been a thing utterly forgotten." (19:23)',
      },
      {
        arabic: '٣',
        title:  'A voice called from below her',
        desc:   '"Do not grieve. Your Lord has placed beneath you a stream." The relief came from the ground she thought had failed her. (19:24)',
      },
      {
        arabic: '٤',
        title:  'She was told to shake, eat, drink, be still',
        desc:   'Allah did not remove the labor. He met her inside it — with dates, water, and a command to cool her eye. (19:25–26)',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Versions of the Same Moment',
    subtitle:   "What she felt · what Allah was doing",
    leftLabel:  'Maryam\'s experience',
    rightLabel: "The reality beneath",
    pairs: [
      { left: 'Alone in a remote place',            right: 'Chosen above the women of the worlds' },
      { left: "\"I wish I were forgotten\"",        right: 'Her name is the only woman\'s in the Quran' },
      { left: 'Labor at a dry trunk',                right: 'A stream already placed beneath her'    },
      { left: 'No one to speak to',                  right: "Allah speaking to her directly"         },
    ],
    insight: "She felt abandoned at the exact moment she was most held.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Voice From Below · Maryam 19:24',
    arabic:      'أَلَّا تَحْزَنِى قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا',
    translation: 'Do not grieve — your Lord has placed beneath you a stream.',
    reference:   'Surah Maryam · 19:24',
    insight:
      'The stream was already there. It did not arrive in response to her pain — it had been placed before she cried out. ' +
      'Some of Allah\'s provisions are made for the moment we will not even see them coming.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Maryam Pattern',
    heading:      'What has Allah already placed beneath you?',
    questions: [
      {
        label:    'Isolation',
        question: 'Where are you carrying something no one around you can see?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Wish',
        question: 'What is the cry you haven\'t even dared to say out loud?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Provision',
        question: "What if the relief is already here — and you just haven't looked down?",
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Action',
        question: 'What shaking of the trunk is still your part of the story?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "Allah did not remove her labor. He met her inside it.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `The most remembered woman in the Quran wished she had been forgotten.

Alone under a palm tree, in labor, with no one to hold her hand, Maryam said: "I wish I had died before this and been a thing utterly forgotten."

And Allah answered — not from the sky, but from the ground she thought had failed her. "Do not grieve. Your Lord has placed beneath you a stream."

The stream was already there. Before she wept, before she wished to vanish, it had been placed.

Save this 🤍

What has Allah already placed beneath you that you haven't looked down to see? ↓

·
·
·
#maryam #surahmaryam #quran #tadabbur #islamicwisdom`;
}
