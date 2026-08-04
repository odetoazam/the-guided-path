import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'مَعَ الْعُسْرِ يُسْرًا',
  headerLabel:  'Ayah Unlock',
  totalSlides:  5,
  theme:        'gold',  // inna-maal-usr — warm fire of ease
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'مَعَ',
    hookLine:    'Not "after hardship comes ease."',
    payoff:      '"With hardship is ease."',
    subtext:     "One preposition changes everything. The Quran did not say ease follows hardship — it said they travel together. The ease is already present. Inside the difficulty. Right now.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'What Surah Ash-Sharh Actually Says',
    subtitle: '8 ayahs · one of the most misread surahs',
    stages: [
      {
        arabic: '١',
        title:  'It opens with a question',
        desc:   '"Did We not expand your chest for you?" (94:1) This is addressed to the Prophet ﷺ after a period of intense difficulty. Allah opens with what He has already done — not what He will do.',
      },
      {
        arabic: '٢',
        title:  'The promise is doubled',
        desc:   'The ayah is stated twice — back to back. "With hardship is ease. With hardship is ease." (94:5–6) Classical scholars noted: "al-ʿusr" has the definite article — one specific hardship. "yusran" is indefinite — unlimited ease.',
      },
      {
        arabic: '٣',
        title:  'The command that follows',
        desc:   '"So when you are free from one task, stand up for another." (94:7) Not: rest after hardship. Keep moving. The ease is not a reward at the end — it is the capacity to keep going through.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Baʿda vs. Maʿa',
    subtitle:   'The grammar the Quran chose — and why it matters',
    leftLabel:  'بَعْدَ (After)',
    rightLabel: 'مَعَ (With)',
    pairs: [
      { left: 'Ease comes when hardship ends.',         right: 'Ease is present inside the hardship.'    },
      { left: 'You wait for a season to pass.',         right: 'You carry both at the same time.'        },
      { left: 'Relief is in the future.',               right: 'Relief is in this moment — already.'     },
    ],
    insight: "Arabic precision: 'al-ʿusr' (الْعُسْرَ) is definite — the same specific hardship both times. 'Yusran' (يُسْرًا) is indefinite — ease that is new and unrestricted each time.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Promise · Ash-Sharh 94:5–6',
    arabic:      'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    translation: 'So indeed, with hardship will be ease. Indeed, with hardship will be ease.',
    reference:   'Surah Ash-Sharh · 94:5–6',
    insight:
      'It is not a consolation for later. The word maʿa makes it simultaneous. ' +
      'This is one hardship — al-ʿusr — with two separate, unlimited eases traveling inside it. ' +
      'The repetition is not emphasis. It is mathematics.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'With Hardship',
    heading:      'What ease is already inside the hardship you are in?',
    questions: [
      {
        label:    'Maʿa',
        question: 'If the ease is already present — not coming, but present — where might it be right now?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Al-ʿusr',
        question: 'Have you named what your specific hardship actually is — not generally, but precisely?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Expansion',
        question: 'What has Allah already opened for you that you have forgotten to count?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'The Command',
        question: 'When this particular hardship passes — what is the next thing you already know you need to do?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "He said it twice. Not for decoration. Because you needed to hear it twice.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `"After hardship comes ease."

That's not what the Quran says.

إِنَّ مَعَ الْعُسْرِ يُسْرًا — "With hardship is ease."

One preposition. Everything changes.

Maʿa means simultaneously. The ease is not waiting for the hardship to end. It is already present, inside it, right now.

And it's said twice. One specific hardship (al-ʿusr). Two separate, unlimited eases.

Save this 🤍

What ease might already be inside the hardship you are in right now? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
