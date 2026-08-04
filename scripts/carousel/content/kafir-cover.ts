import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'كُفْر',
  headerLabel:  'Word Study',
  totalSlides:  5,
  theme:        'dark',
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'كَافِر',
    hookLine:    'A kāfir is not simply a "disbeliever."',
    payoff:      'The root means: one who covers.',
    subtext:     'ك-ف-ر — to cover, to conceal, to bury. Before it ever meant disbelief, it described the act of hiding something under a surface. The picture is not an empty head. It is a covered heart.',
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'One Root. Three Coverings.',
    subtitle: 'Lisān al-ʿArab · Mufradāt al-Rāghib',
    stages: [
      {
        arabic: 'ٱلْكُفَّار',
        title:  'The farmer covers the seed',
        desc:   'The Quran itself uses al-kuffār for tillers — farmers — because the farmer buries the seed under soil. Same root. The most innocent kufr in the language is agriculture.',
      },
      {
        arabic: 'كُفْر النِّعْمَة',
        title:  'Ingratitude covers the gift',
        desc:   'To be ungrateful is to take a favour and bury it — to cover the kindness so the giver disappears from view. Kufr is the opposite of shukr: concealing a blessing instead of acknowledging it.',
      },
      {
        arabic: 'كُفْر',
        title:  'Disbelief covers the truth',
        desc:   'And the famous meaning: to take a truth the heart already recognises — and bury it. Not failing to find the light. Choosing to throw soil over it.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Why "Disbeliever" Flattens It',
    subtitle:   'A label about the mind vs. a verb about the will',
    leftLabel:  '"Disbeliever"',
    rightLabel: 'One who covers',
    pairs: [
      { left: 'Someone who simply never knew.',   right: 'Someone hiding what they know.'   },
      { left: 'An absence of belief.',             right: 'An act of active concealment.'    },
      { left: 'A state of the head.',              right: 'A choice of the will.'            },
    ],
    insight: 'The Quran\'s picture of kufr is not an empty mind searching for proof it cannot find. It is a heart that found the truth — and reached for the soil.',
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'Al-Hadid · 57:20',
    arabic:      'كَمَثَلِ غَيْثٍ أَعْجَبَ ٱلْكُفَّارَ نَبَاتُهُۥ',
    translation: 'Like rain whose growth delights the tillers (al-kuffār)…',
    reference:   'Surah Al-Hadid · 57:20',
    insight:
      'Here the Quran calls farmers "al-kuffār" — not as an insult, but by the literal root: they cover the seed. ' +
      'It is the proof inside the Book itself. Kufr is covering. The disbeliever does to the truth exactly what the farmer does to the seed: buries it.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Kufr · the covering',
    heading:      'What truth are you covering — not failing to find, but burying?',
    questions: [
      {
        label:    'The blessing',
        question: 'Which gift in your life have you covered over with complaint until you stopped seeing the Giver?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The knowing',
        question: 'Is there something you already know is true that it is easier to keep buried?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The uncovering',
        question: 'What would it look like to brush the soil off one thing this week — to acknowledge instead of conceal?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: 'The opposite of kufr is not just belief. It is uncovering — letting the truth, and the One behind it, back into view.',
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `A "kāfir" isn't simply a disbeliever. Not at the root.

ك-ف-ر means: to cover. To conceal. To bury.

The proof is inside the Quran itself. In 57:20, Allah calls farmers "al-kuffār" — the tillers — because a farmer covers the seed under the soil. Same exact root.

So the Quran's picture of kufr was never an empty head that couldn't find proof. It's a covered heart: someone who found the truth and reached for the soil anyway.

And the same root gives us ingratitude — kufr an-niʿma — covering a blessing until the Giver disappears from view.

The opposite of kufr, then, isn't only belief. It's uncovering.

Save this — the etymology changes everything 🤍

What have you been covering? ↓

·
·
·
#Quran #Arabic #tadabbur #islam #ArabicLanguage #quranreflection #islamicreminders #gratitude`;
}
