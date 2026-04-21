import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'سورة الشرح',
  headerLabel:  'Ash-Sharh · Ayah Unlock',
  totalSlides:  5,
} as const;

const slides: AnySlide[] = [
  // ── Slide 1: Hook ────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    hookLine:    "Allah said it twice. That\u2019s not repetition.",
    payoff:      "It\u2019s a mathematical guarantee.",
    subtext:     'One rule of Arabic grammar changes how you read hardship forever. The score is already rigged in your favor.',
  },

  // ── Slide 2: Timeline (Grammar Reveal) ───────────────────────────────────────
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'How Arabic Grammar Works Here',
    subtitle: 'One rule · two ayahs · a permanent law',
    stages: [
      {
        arabic: '١',
        title:  'The rule',
        desc:   'In Arabic: a definite noun (with "the") repeated = the SAME thing. An indefinite noun (no "the") repeated = TWO DIFFERENT things.',
      },
      {
        arabic: '٢',
        title:  'ٱلْعُسْرِ — THE hardship',
        desc:   'Definite both times. The same hardship in ayah 5 and ayah 6. One hardship. Single, specific, known.',
      },
      {
        arabic: '٣',
        title:  'يُسْرًا — AN ease',
        desc:   'Indefinite both times. Two different eases — unbound, unspecified, arriving in their own form.',
      },
      {
        arabic: '٤',
        title:  'The ratio',
        desc:   "One hardship. Two eases. This isn't poetry. This is Arabic grammar making a structural guarantee about the nature of reality.",
      },
    ],
  },

  // ── Slide 3: Contrast ────────────────────────────────────────────────────────
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'Two Words That Change Everything',
    subtitle:   'The preposition most translations miss',
    leftLabel:  'What we assume',
    rightLabel: 'What Allah actually said',
    pairs: [
      { left: 'After hardship, ease will come',   right: 'مَعَ — with hardship, ease is here'     },
      { left: 'Light at the end of the tunnel',   right: 'Light inside the tunnel, right now'     },
      { left: 'One hardship, one ease',            right: 'One hardship, two eases — always'       },
      { left: 'Endure until it passes',            right: 'Look — the ease already arrived'        },
    ],
    insight: "مَعَ doesn't mean 'after'. It means 'alongside'. The ease is not coming. It's already here.",
  },

  // ── Slide 4: Key Ayah ────────────────────────────────────────────────────────
  // Arabic verified from content/tadabbur/094-ash-sharh/_grounding/ayahs-001-008.md
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'The Guarantee · Ash-Sharh 94:5–6',
    arabic:      'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    translation: 'Then indeed, with hardship comes ease. Indeed, with hardship comes ease.',
    reference:   'Surah Ash-Sharh · 94:5–6',
    insight:
      'The scholars called it a proverb: lan yaghliba \'usrun yusrayn — ' +
      '"one hardship cannot defeat two eases." Not optimism. Mathematics. ' +
      'The definite article is the algebra. You are outnumbered by mercy.',
  },

  // ── Slide 5: CTA ─────────────────────────────────────────────────────────────
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Ayah Unlock · Ash-Sharh',
    heading:      "Where is the ease you haven\u2019t noticed yet?",
    questions: [
      {
        label:    'The grammar',
        question: "What hardship are you in right now \u2014 and what ease is already present inside it that you\u2019ve been calling something else?",
        color:    PALETTE.faith.main,
      },
      {
        label:    'The preposition',
        question: 'Are you waiting for hardship to end before the ease arrives — or can you look for it now, inside this?',
        color:    PALETTE.knowledge.main,
      },
      {
        label:    'The second ease',
        question: "The first ease you can name. What might the second \u2014 the one you haven\u2019t identified yet \u2014 actually be?",
        color:    PALETTE.power.main,
      },
      {
        label:    'The ratio',
        question: 'If ease always outnumbers hardship, what would it look like to live like you believed that?',
        color:    PALETTE.faith.main,
      },
    ],
    closing: "You are not waiting for mercy. You are outnumbered by it.",
  },
];

export function buildHtml(): string {
  return buildDocument(slides);
}

export function buildCaption(): string {
  return `Allah said it twice. That's not repetition. It's a mathematical guarantee.

In Arabic, a definite noun repeated refers to the same thing. An indefinite one repeated refers to two different things. ٱلْعُسْرِ (THE hardship) is definite — same one. يُسْرًا (AN ease) is indefinite — two separate eases. One hardship. Two eases. Every time.

And the word is مَعَ — WITH. Not after. The ease isn't coming. It's already here.

Save this 🤍

What ease is already present inside your current hardship that you haven't named yet? ↓

·
·
·
#quran #ashsharh #ayahunlock #islamicwisdom #tadabbur`;
}
