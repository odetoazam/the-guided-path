import { AnySlide, buildDocument } from '../slides';
import { PALETTE } from '../brand';

const BASE = {
  headerArabic: 'لَا تَقْنَطُوا',
  headerLabel:  'For the Weary',
  totalSlides:  5,
  theme:        'light',  // warm cream — a verse of mercy
} as const;

const slides: AnySlide[] = [
  {
    ...BASE,
    type:        'hook',
    slideNum:    1,
    largeArabic: 'يَـٰعِبَادِى',
    hookLine:    'The most hope-filled verse in the Quran',
    payoff:      'opens by calling sinners "Mine."',
    subtext:     'Before "do not despair." Before the sin is even named. Allah says yā ʿibādī — O My servants. He claims you first. The belonging comes before the correction.',
  },
  {
    ...BASE,
    type:     'timeline',
    slideNum: 2,
    title:    'The Order Is the Mercy',
    subtitle: 'Read what comes first — Surah Az-Zumar 39:53',
    stages: [
      {
        arabic: '١',
        title:  'He calls you "Mine"',
        desc:   'Yā ʿibādī — "O My servants." He could have opened with "O sinners." Instead He opens with possession. You are still His before a single word about the wrong is spoken.',
      },
      {
        arabic: '٢',
        title:  'He names the wound gently',
        desc:   'Alladhīna asrafū ʿalā anfusihim — those who went to excess against their own selves. Notice: against yourselves. The sin wounded you, not Him. He describes it as your injury, not His offence.',
      },
      {
        arabic: '٣',
        title:  'He forbids despair',
        desc:   'Lā taqnaṭū — do not lose all hope. Despair is treated as its own mistake — a second wall built on top of the first. He tears it down before it sets.',
      },
      {
        arabic: '٤',
        title:  'He forgives all of it',
        desc:   'Yaghfiru-dh-dhunūba jamīʿan — He forgives the sins, all of them. Not most. Not the small ones. Jamīʿan — every single one, with no asterisk.',
      },
    ],
  },
  {
    ...BASE,
    type:       'contrast',
    slideNum:   3,
    title:      'What Despair Says vs. What He Says',
    subtitle:   'The lie, answered line by line',
    leftLabel:  'Despair whispers',
    rightLabel: 'The verse answers',
    pairs: [
      { left: 'I have gone too far.',          right: 'He forgives the sins — all of them.' },
      { left: 'He must be done with me.',      right: 'He still calls me "My servant."'     },
      { left: 'There is no way back.',         right: 'The door was never locked from your side.' },
    ],
    insight: 'Despair feels like humility — like you are being honest about how bad you are. But the verse calls it the one thing not allowed. To despair of His mercy is to believe your sin is bigger than His forgiveness.',
  },
  {
    ...BASE,
    type:        'quote',
    slideNum:    4,
    badge:       'Az-Zumar · 39:53',
    arabic:      'لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا',
    translation: 'Do not despair of the mercy of Allah. Indeed, Allah forgives the sins, all of them.',
    reference:   'Surah Az-Zumar · 39:53',
    insight:
      'The verb taqnaṭū is harsh in sound — a guttural qāf, a closing ṭāʾ — the sound of a door slamming. ' +
      'And the verse is placed in front of that door to keep it open. Whatever you have done, you were not addressed as a stranger. You were addressed as "Mine."',
  },
  {
    ...BASE,
    type:         'cta',
    slideNum:     5,
    sectionLabel: 'Lā taqnaṭū · do not despair',
    heading:      'What have you decided is unforgivable that Allah never did?',
    questions: [
      {
        label:    'The weight',
        question: 'What is the one thing you keep deciding is too far gone to bring back to Him?',
        color:    PALETTE.power.main,
      },
      {
        label:    'The return',
        question: 'If He is still calling you "My servant," what is actually stopping the first step back?',
        color:    PALETTE.faith.main,
      },
      {
        label:    'The mercy',
        question: 'What would change today if you truly believed His forgiveness is larger than your record?',
        color:    PALETTE.knowledge.main,
      },
    ],
    closing: 'He did not call you a sinner. He called you Mine — and then told you not to give up on the One who already refused to give up on you.',
  },
];

export function buildHtml(): string { return buildDocument(slides); }

export function buildCaption(): string {
  return `The most hope-filled verse in the Quran opens by calling sinners "Mine."

Before "do not despair." Before the sin is even named. Allah says: yā ʿibādī — "O My servants." (39:53)

Read the order, because the order is the mercy:

1. He calls you "Mine" — belonging before correction.
2. He names the wound gently — "against their OWN selves." The sin hurt you, not Him.
3. He forbids despair — lā taqnaṭū. Losing hope is treated as its own mistake.
4. He forgives ALL of it — jamīʿan. Every single one. No asterisk.

Despair can feel like honesty — like you're just admitting how bad you are. But the verse calls it the one thing not allowed. To despair of His mercy is to believe your sin is bigger than His forgiveness.

The door was never locked from your side.

Save this. Send it to someone who needs it 🤍

·
·
·
#Quran #tadabbur #islam #mercy #ArabicLanguage #quranreflection #islamicreminders #hope #tawbah`;
}
