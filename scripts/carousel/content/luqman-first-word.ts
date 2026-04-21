import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة لقمان',
  headerLabel:  'Luqman · First Counsel',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يَا بُنَيَّ',
    hookLine:    'Allah named a surah after a father.',
    payoff:      'Not a prophet. A father.',
    subtext:     "Luqman was not a nabi, not a king, not a scholar. His only recorded act is teaching his son. And the first word out of his mouth is the diminutive of love.",
  },

  // ── Slide 2: Timeline ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'How the Lesson Is Framed',
    subtitle: 'Four deliberate choices · all of them tender',
    stages: [
      {
        arabic: '١',
        title:  'The classroom is the family',
        desc:   "Of 114 surahs, the one named for ordinary wisdom is named for parenting. The first syllabus of faith is spoken at home. (31:12–13)",
      },
      {
        arabic: '٢',
        title:  'The first word is not a command',
        desc:   '"Ya bunayya" — my dear little son. The diminutive of love. Luqman is not speaking from authority. He is speaking from affection. (31:13)',
      },
      {
        arabic: '٣',
        title:  'The prohibition arrives next',
        desc:   '"La tushrik billah" — do not associate anything with Allah. The Form IV verb makes the son the architect, not a passive joiner. (31:13)',
      },
      {
        arabic: '٤',
        title:  'The reason is wrongdoing — to himself',
        desc:   '"Shirk is a great zulm." Zulm means placing something where it does not belong. No threat. No fire. Just: you would be hurting yourself. (31:13)',
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'How This Ayah Could Have Been Written',
    subtitle:   'What was chosen · what was set aside',
    leftLabel:  'A judge\'s warning',
    rightLabel: "A father's counsel",
    pairs: [
      { left: 'From authority',                 right: 'From endearment (ya bunayya)'             },
      { left: 'Fear of punishment',              right: 'Fear of self-harm (zulm)'               },
      { left: 'A ruling for everyone',           right: 'A conversation with one child'           },
      { left: 'The listener is a defendant',     right: 'The listener is a beloved'               },
    ],
    insight: "The gravest prohibition in the Quran is wrapped in the softest possible address.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The First Counsel · Luqman 31:13',
    arabic:      'يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ',
    translation: 'O my dear son, do not associate [anything] with Allah. Indeed, association is a great wrongdoing.',
    reference:   'Surah Luqman · 31:13',
    insight:
      'Zulm in its root meaning is placing something where it does not belong. ' +
      'Shirk is called zulm because it puts created things in the seat that belongs only to the Creator — ' +
      'and the first person wronged by it is you.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'The Luqman Pattern',
    heading:      'What are you placing in a seat that belongs only to Allah?',
    questions: [
      {
        label:    'Seat',
        question: 'Whose approval is currently holding the weight only Allah can carry?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'Fear',
        question: 'What loss do you fear more than losing nearness to Allah?',
        color:    PALETTE.power.main,
      },
      {
        label:    'Tone',
        question: 'Are you warning the people you love from authority — or from love?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'Inheritance',
        question: 'If your first lesson to a child were one sentence, what would it be?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "A father who warns from love is more effective than a judge who warns from power.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `Allah named a surah after a father.

Not a prophet. Not a king. Not a scholar. A man whose only recorded act is teaching his son. And the first word out of his mouth is "ya bunayya" — my dear little son. The diminutive of love.

Then, wrapped inside that tenderness, the gravest prohibition in the Quran: "Do not associate anything with Allah. Indeed, shirk is a great wrongdoing."

No threat. No fire. Just: you would be hurting yourself.

Zulm means placing something where it does not belong. Shirk is zulm because it puts created things in the seat that belongs only to the Creator — and the first person wronged is you.

Save this for the next hard conversation you have to have with someone you love 🤍

What are you currently placing in a seat that belongs only to Allah? ↓

·
·
·
#luqman #surahluqman #quran #tadabbur #islamicwisdom`;
}
