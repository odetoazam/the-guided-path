import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'الصَّبْرُ',
  headerLabel:  'Ayah Unlock',
  totalSlides:  5,
  theme:        'light',  // sabr — still water, restraint
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'صَبَرَ',
    hookLine:    'Sabr does not mean patience.',
    payoff:      'Not exactly. Not the way we use it.',
    subtext:     "The root ṣ-b-r means to bind, to hold in, to contain. It is not passive waiting — it is the active force of restraining yourself from responding to difficulty the wrong way.",
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Three Kinds of Ṣabr',
    subtitle: 'Classical scholars identified three distinct forms',
    stages: [
      {
        arabic: '١',
        title:  'Ṣabr ʿalā — on obedience',
        desc:   'Holding yourself to what Allah commands when it is difficult. Continuing salah when exhausted. Continuing honesty when lying would be easier. The restraint required to stay good.',
      },
      {
        arabic: '٢',
        title:  'Ṣabr ʿan — away from sin',
        desc:   'Holding yourself back from what is forbidden when your desire is pulling you toward it. Not a passive "I didn\'t do it" — an active containment of impulse. The restraint required to stay clean.',
      },
      {
        arabic: '٣',
        title:  'Ṣabr ʿalā — on the decree',
        desc:   'Holding yourself from rage, despair, or complaint when something painful happens that you did not choose. Not suppressing grief — holding the response to grief. The restraint required to stay standing.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What Ṣabr Is and Is Not',
    subtitle:   'The Quran\'s use vs. the common translation',
    leftLabel:  'Passive "patience"',
    rightLabel: 'Quranic ṣabr',
    pairs: [
      { left: 'Waiting silently for things to improve.',    right: 'Active force holding the self in check.'  },
      { left: 'Suppressing or ignoring the pain.',          right: 'Feeling it — and not letting it control.' },
      { left: 'A personality trait some people have.',      right: 'A practice anyone can build.'             },
    ],
    insight: "Yusuf wept. Yaqub wept until he went blind. Neither was accused of lacking ṣabr. The Quran distinguishes grief from complaint — and grief from despair.",
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Promise · Al-Baqarah 2:155–157',
    arabic:      'وَبَشِّرِ ٱلصَّـٰبِرِينَ ٱلَّذِينَ إِذَآ أَصَـٰبَتْهُم مُّصِيبَةٌ قَالُوٓا۟ إِنَّا لِلَّهِ وَإِنَّآ إِلَيْهِ رَٰجِعُونَ',
    translation: 'And give glad tidings to the patient — those who, when afflicted with a calamity, say: "Indeed, we belong to Allah, and indeed to Him we will return."',
    reference:   'Surah Al-Baqarah · 2:155–157',
    insight:
      'The definition of the ṣābirīn is not a feeling — it is a statement. ' +
      'Innā lillāhi wa innā ilayhi rājiʿūn is the practice of ṣabr, not just an expression of sadness. ' +
      'It reorients ownership: this life belongs to Him. So does this loss.',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Ṣabr Unlocked',
    heading:      'Which of the three ṣabrs do you need most right now?',
    questions: [
      {
        label:    'On obedience',
        question: 'What act of worship or goodness are you struggling to maintain right now?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Away from sin',
        question: 'What are you letting yourself drift toward that you know you should be holding back from?',
        color:    PALETTE.power.main,
      },
      {
        label:    'On the decree',
        question: 'Is there a loss you are responding to with despair instead of return to Allah?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'The Root',
        question: 'What would it feel like to hold your response — not suppress it, just hold it — for one moment longer?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "Ṣabr is not silence. It is the force of a person who has decided who is in charge.",
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `Sabr doesn't mean patience. Not exactly.

The root ṣ-b-r means to bind, to hold in, to contain. It is active — not passive.

Classical scholars broke it into three kinds:
— Ṣabr on obedience (staying good when it's hard)
— Ṣabr away from sin (holding back what pulls you)
— Ṣabr on the decree (not letting loss break you)

Yusuf wept. Yaqub wept until he went blind. Neither was accused of lacking sabr. The Quran distinguishes grief from despair.

Save this 🤍

Which of the three sabrs do you need most right now? ↓

·
·
·
#QuranicVerses #Quran #islam #QuranTranslation #quranquotes`;
}
