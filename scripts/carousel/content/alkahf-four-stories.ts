import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة الكهف',
  headerLabel:  'Surah Architecture',
  totalSlides:  5,
  theme:        'deep',  // Surah Architecture
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'أَرْبَعُ قِصَصٍ',
    hookLine:    'Four completely different stories.',
    payoff:      'One warning. One surah.',
    subtext:     "The People of the Cave. The Two Gardens. Musa and Khidr. Dhul-Qarnayn. Al-Kahf arranged them deliberately — and what connects them will surprise you.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Four Stories of Al-Kahf',
    subtitle: 'Each tests a different kind of heart',
    stages: [
      {
        arabic: '١',
        title:  'People of the Cave — Trial of Faith',
        desc:   'Young men who held their belief in a society hostile to it. The trial: can your faith survive social pressure and isolation? (18:9–26)',
      },
      {
        arabic: '٢',
        title:  'The Two Gardens — Trial of Wealth',
        desc:   'One man given two gardens, who forgot the Giver. The trial: does abundance make you attribute everything to yourself? (18:32–44)',
      },
      {
        arabic: '٣',
        title:  'Musa and Khidr — Trial of Knowledge',
        desc:   'The most knowledgeable man on earth could not see what a servant of Allah saw. The trial: can you trust when you cannot understand? (18:60–82)',
      },
      {
        arabic: '٤',
        title:  'Dhul-Qarnayn — Trial of Power',
        desc:   'A king who traveled the earth with his power — and used every bit of it in service, not dominance. The trial: what do you do when no one can stop you? (18:83–98)',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'The Pattern Underneath',
    subtitle:   'What each trial actually asks',
    leftLabel:  'The Test',
    rightLabel: 'The Heart It Targets',
    pairs: [
      { left: 'People of the Cave',  right: 'Who do you belong to when alone?'     },
      { left: 'Two Gardens',         right: 'Who gets the credit when blessed?'    },
      { left: 'Musa and Khidr',      right: 'Can you submit when you don\'t see?'  },
      { left: 'Dhul-Qarnayn',        right: 'Who do you serve when unstoppable?'   },
    ],
    insight: "Al-Kahf is read every Friday as protection from Dajjal. Dajjal's weapons are exactly these four: spectacle of faith, wealth, hidden knowledge, and power.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Warning · Al-Kahf 18:103–104',
    arabic:      'قُلْ هَلْ نُنَبِّئُكُم بِٱلْأَخْسَرِينَ أَعْمَـٰلًا ٱلَّذِينَ ضَلَّ سَعْيُهُمْ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَهُمْ يَحْسَبُونَ أَنَّهُمْ يُحْسِنُونَ صُنْعًا',
    translation: 'Shall We tell you of those who are the greatest losers in deeds? Those whose effort is lost in the life of this world while they think they are doing good.',
    reference:   'Surah Al-Kahf · 18:103–104',
    insight:
      'The surah ends with a warning about people who worked hard — but for the wrong thing, ' +
      'without even knowing it. The four stories are the four ways that happens.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Four Trials',
    heading:      'Which trial is yours right now?',
    questions: [
      {
        label:    'Faith',
        question: 'Is your belief in Allah affected by who is watching — or who is not?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Wealth',
        question: 'When things are going well, does your heart say "I" more than "Allah"?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Knowledge',
        question: 'Where are you refusing to trust because you cannot see the full picture?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Power',
        question: 'What would you do if no one — including Allah — could hold you accountable?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "Al-Kahf is not four stories. It is one mirror — held up four different ways.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Al-Kahf has four completely different stories. A cave. A garden. A journey with a mysterious man. A king who conquered the earth.

They feel unrelated — until you see what connects them.

Each story tests a different kind of heart: faith under pressure, gratitude in abundance, trust without understanding, power without accountability.

These are exactly Dajjal's four weapons. That's why we read this surah every Friday.

Save this 🤍

Which of the four trials are you facing right now? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
