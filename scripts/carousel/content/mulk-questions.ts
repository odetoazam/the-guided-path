import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة الملك',
  headerLabel:  'Surah Architecture',
  totalSlides:  5,
  theme:        'light',  // Al-Mulk — night sky, questioning
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'أَفَلَا تَعْقِلُونَ',
    hookLine:    'Al-Mulk does not lecture.',
    payoff:      'It only asks questions.',
    subtext:     "Thirty ayahs. Eight direct questions. Not to interrogate you — to wake you up. The surah that protects from the grave works by reactivating the mind.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Questions Al-Mulk Asks',
    subtitle: 'Eight challenges — in order',
    stages: [
      {
        arabic: '١',
        title:  '"Do you not see any flaw in creation?"',
        desc:   'Look at the sky. Look again. Then again. "Return your gaze — again and again — and it will come back humbled and exhausted." (67:3–4) This is not poetry. It is a scientific claim.',
      },
      {
        arabic: '٢',
        title:  '"Is He who walks face-down better guided?"',
        desc:   '"Is the one who walks fallen on his face better guided than the one who walks upright on a straight path?" (67:22) Every person is moving somewhere. The question is which direction.',
      },
      {
        arabic: '٣',
        title:  '"Who can help you if He withholds provision?"',
        desc:   '"Who can provide for you if He withholds His provision?" (67:21) Not a threat — a reorientation. Every source of sustenance has a Source.',
      },
      {
        arabic: '٤',
        title:  '"Do you feel safe from what He plans?"',
        desc:   '"Do you feel secure that He who is in the heaven will not cause the earth to swallow you?" (67:16–17) The surah asks: what are you actually relying on?',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Kinds of Hearing',
    subtitle:   'The surah\'s own contrast · 67:10',
    leftLabel:  'What they said in the Fire',
    rightLabel: 'What Al-Mulk offers now',
    pairs: [
      { left: '"Had we listened or used reason..."',      right: 'The surah asks you to reason now.'       },
      { left: '"...we would not be among the people of the Fire."', right: 'The warning is given before, not after.' },
      { left: 'Regret after the fact.',                   right: 'Reflection before it.'                  },
    ],
    insight: "The word 'aql (reason/intellect) appears 49 times in the Quran — always as a faculty you are asked to use. Al-Mulk is its full activation.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Protector · Al-Mulk 67:2',
    arabic:      'ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',
    translation: 'He who created death and life to test you — which of you is best in deed.',
    reference:   'Surah Al-Mulk · 67:2',
    insight:
      'Death is mentioned before life. It was created — meaning it is designed, not accidental. ' +
      'And the test is not quantity: "best in deed," not "most in deed." The surah opens with a reframe of everything.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Surah That Asks',
    heading:      'What question in Al-Mulk are you avoiding?',
    questions: [
      {
        label:    'The Sky',
        question: 'When did you last look at creation and feel something shift inside you?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Direction',
        question: 'Are you walking upright — toward something — or just moving?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Provision',
        question: 'What are you counting on for security that could be removed at any moment?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Reason',
        question: 'What truth are you choosing not to think about too carefully?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "Read it tonight. Not for protection from the grave — but to be someone who deserved that protection.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Al-Mulk doesn't lecture. It asks questions.

30 ayahs. 8 direct questions. Do you not see? Do you not hear? Do you feel safe? Who will provide for you?

Not to interrogate — to wake up. The surah that protects from the punishment of the grave works by reactivating the mind.

It ends by saying: "Had we listened or reasoned, we would not be among the people of the Fire." (67:10)

The warning comes before. Not after.

Save this 🤍

Which question in Al-Mulk are you currently avoiding? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
