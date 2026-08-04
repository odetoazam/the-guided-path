import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'لَا تَحْزَنْ',
  headerLabel:  'Ayah Unlock',
  totalSlides:  5,
  theme:        'dark',  // la-tahzan — parchment warmth
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'لَا تَحْزَنْ',
    hookLine:    'Allah said "do not grieve" three times.',
    payoff:      'Each time, to someone alone.',
    subtext:     "Hajar in the desert. Maryam under the palm tree. The Prophet ﷺ in the cave. Three different people. Three different centuries. The same two words.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'Three Times Allah Said It',
    subtitle: 'لَا تَحْزَنْ — to three people who had nothing left',
    stages: [
      {
        arabic: '١',
        title:  'To Hajar — in the desert',
        desc:   'Her husband had walked away. Her infant was dying of thirst. She ran between two hills seven times. Then a voice: "Do not grieve. Allah will not let your son perish." Water came from beneath his feet.',
      },
      {
        arabic: '٢',
        title:  'To Maryam — alone in labor',
        desc:   '"Do not grieve — your Lord has placed a stream beneath you." (19:24) She had just given birth, alone, under a tree, with no one. He sent water and fresh dates before He sent words of explanation.',
      },
      {
        arabic: '٣',
        title:  'To the Prophet ﷺ — in the cave',
        desc:   '"Do not grieve — indeed Allah is with us." (9:40) Abu Bakr was afraid. The Prophet ﷺ said these words. At the lowest point of Hijrah, with enemies searching outside the cave.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What الحُزْن Actually Means',
    subtitle:   'Grief vs. Fear — two different commands',
    leftLabel:  'لَا تَحْزَنْ',
    rightLabel: 'لَا تَخَفْ',
    pairs: [
      { left: 'Do not grieve (ḥuzn)',          right: 'Do not fear (khawf)'                  },
      { left: 'About what is already lost.',   right: 'About what might be coming.'           },
      { left: 'Grief is backward-facing.',     right: 'Fear is forward-facing.'               },
      { left: 'Said to those in the moment.',  right: 'Said to those before the trial.'       },
    ],
    insight: "Allah chose ḥuzn in all three cases — not khawf. He was not telling them the danger wasn't real. He was releasing them from mourning what they thought was already over.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'In the Cave · At-Tawbah 9:40',
    arabic:      'لَا تَحْزَنْ إِنَّ ٱللَّهَ مَعَنَا',
    translation: 'Do not grieve — indeed, Allah is with us.',
    reference:   'Surah At-Tawbah · 9:40',
    insight:
      'Not "Allah is watching." Not "Allah will help." Maʿanā — with us. Present tense. In the cave. ' +
      'The grief is released because the company is certain. ' +
      'This is the same word Musa used at the sea: "Indeed with me is my Lord — He will guide me."',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Do Not Grieve',
    heading:      'What are you grieving that you think is already lost?',
    questions: [
      {
        label:    'Hajar',
        question: 'Are you running between two hills — exhausting yourself — while the answer is already beneath you?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Maryam',
        question: 'Is there something you need right now that Allah could send without an explanation first?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The Cave',
        question: 'What would change in your heart if you truly believed He is with you — not watching, but with you?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'The Word',
        question: 'What have you already concluded is over — that Allah may not have closed?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "He did not say: everything is fine. He said: do not grieve. He knows the difference.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Allah said "do not grieve" three times in the Quran.

To Hajar — alone in the desert, her infant dying.
To Maryam — alone in labor under a palm tree.
To the Prophet ﷺ — in a cave with enemies searching outside.

Same two words. Three different people. Three different centuries.

He didn't say everything was fine. He said: do not grieve. He knows the difference.

Save this 🤍

What have you concluded is already over — that Allah may not have closed? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
