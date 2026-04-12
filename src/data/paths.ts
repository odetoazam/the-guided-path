// Guided Paths — curated sequences for people seeking guidance
// Each path is built for a specific arrival state, not a topic.
// Ayah stops use "S:A-B" format matching ayah_records (surah:ayah_start-ayah_end).

export interface PathStop {
  type: 'article' | 'hub' | 'ayah'
  // article → posts.slug
  // hub     → entities.slug
  // ayah    → "surah:start-end" e.g. "2:153-157"
  slug: string
  connectorText: string
}

export interface Path {
  slug: string
  arrivalStatement: string // emotional hook on the card — what the person is feeling
  title: string
  description: string
  estimatedMinutes: number
  stops: PathStop[]
}

// ─── PATH 1 ────────────────────────────────────────────────────────────────
// Arrival state: Something happened — hardship, loss, crisis
const pathSomethingHappened: Path = {
  slug: 'when-life-breaks-apart',
  arrivalStatement: "Something happened and I'm trying to make sense of it",
  title: 'When Life Breaks Apart',
  description:
    'The Quran does not bypass grief — it speaks directly into it. This path begins in the language of hardship and moves toward a stabilising trust.',
  estimatedMinutes: 35,
  stops: [
    {
      type: 'ayah',
      slug: '2:153-157',
      connectorText:
        'The Quran opens its account of hardship by naming it plainly — loss of wealth, of life, of what you loved. Then it names the people who receive something in return.',
    },
    {
      type: 'hub',
      slug: 'sabr',
      connectorText:
        'That return hinges on a single word: sabr. Most translations render it as patience — but the Arabic contains something far more active.',
    },
    {
      type: 'article',
      slug: 'ayyub-patience-complaint',
      connectorText:
        'Sabr is not passive waiting. Ayyub — the Quran\'s clearest portrait of a person in sustained suffering — eventually cried out. The Quran records it, and answers immediately.',
    },
    {
      type: 'ayah',
      slug: '94:1-8',
      connectorText:
        'Then this: Allah speaking directly to a person who is overwhelmed, reminding him of what was already done for him before he asks. Difficulty paired with ease — twice.',
    },
    {
      type: 'hub',
      slug: 'tawakkul',
      connectorText:
        'The path closes with tawakkul — not resignation, but the active entrusting that becomes possible after understanding. It is the posture hardship is trying to build in you.',
    },
  ],
}

// ─── PATH 2 ────────────────────────────────────────────────────────────────
// Arrival state: Something's missing — disconnected, want back in
const pathSomethingMissing: Path = {
  slug: 'finding-your-way-back',
  arrivalStatement: 'I grew up with this but something feels distant now',
  title: 'Finding Your Way Back',
  description:
    'Distance from the Quran is not a sign you are broken — it is often a sign the connection was never explained properly. This path starts with what you already carry.',
  estimatedMinutes: 30,
  stops: [
    {
      type: 'ayah',
      slug: '89:27-30',
      connectorText:
        'Before the mechanics of return, the destination. Four words from Allah to the soul that has finally settled. This is what the whole path is moving toward.',
    },
    {
      type: 'hub',
      slug: 'fitrah',
      connectorText:
        'The pull you feel toward this is not random — it is fitrah, the original orientation every person carries. Understanding it changes how the distance feels.',
    },
    {
      type: 'article',
      slug: 'adams-tawbah-and-iblis-refusal-the-fork-at-the-moment-of-wrong',
      connectorText:
        'The Quran\'s first story of distance and return is Adam\'s. Two figures make a mistake; one turns back and one refuses. The difference between them is not the wrong — it is what happens immediately after.',
    },
    {
      type: 'hub',
      slug: 'tawbah',
      connectorText:
        'The turning that Adam performed has a name. Tawbah is not guilt — it is a direction. This hub traces the word to its root and shows what the Quran actually means by it.',
    },
    {
      type: 'ayah',
      slug: '1:6-7',
      connectorText:
        'Al-Fatiha closes the path because it always was the prayer for this moment. ihdinas-sirat al-mustaqim — guide us on the straight path. You have been saying this your whole life.',
    },
  ],
}

// ─── PATH 3 ────────────────────────────────────────────────────────────────
// Arrival state: I want to understand — intellectually serious, want to get the Quran
const pathWantToUnderstand: Path = {
  slug: 'reading-the-quran-differently',
  arrivalStatement: 'I want to understand what the Quran is actually saying',
  title: 'Reading the Quran Differently',
  description:
    'Most people have heard the Quran their whole lives without being shown how to read it. This path introduces the tools — linguistic, structural, contemplative — that change what you see.',
  estimatedMinutes: 40,
  stops: [
    {
      type: 'hub',
      slug: 'tadabbur',
      connectorText:
        'Before anything else: the Quran has its own instruction for how to read it. The command to do tadabbur appears four times — always directed at people who are not doing it.',
    },
    {
      type: 'ayah',
      slug: '2:26-27',
      connectorText:
        'Here the Quran describes what happens when two people read the same text. One is guided by it; one goes further astray. The same words, two readers, opposite outcomes. Why?',
    },
    {
      type: 'article',
      slug: 'quran-enclosed-spaces-well-cave-whale-fire',
      connectorText:
        'Once you start reading structurally, patterns appear that you cannot unsee. Four prophets are each placed in an enclosed space. Every enclosure should have been an ending. Every one became the site of divine encounter.',
    },
    {
      type: 'hub',
      slug: 'nazm',
      connectorText:
        'That structural coherence is not accidental — it is what classical scholars called nazm, the internal order of the Quran. This hub maps what that tradition actually claimed.',
    },
    {
      type: 'ayah',
      slug: '55:1-4',
      connectorText:
        'The path closes with four ayahs that reorder everything. The Quran identifies itself as the source of language — not just content, but the capacity to speak at all. Read slowly.',
    },
  ],
}

// ─── PATH 4 ────────────────────────────────────────────────────────────────
// Arrival state: I want to go deeper — already have a practice
const pathGoDeeper: Path = {
  slug: 'going-deeper',
  arrivalStatement: 'I already have a practice — I want it to go deeper',
  title: 'Going Deeper',
  description:
    'A practice that does not deepen eventually hollows. This path moves from the outer forms of engagement toward the interior states the Quran is actually addressing.',
  estimatedMinutes: 35,
  stops: [
    {
      type: 'hub',
      slug: 'khushu',
      connectorText:
        "Khushu' is the Quran's clearest measure of whether salah is reaching its destination. It is not a feeling you wait for — it has a structure you can learn.",
    },
    {
      type: 'ayah',
      slug: '2:44-46',
      connectorText:
        'A hard question: the Quran asks whether you command goodness to others while forgetting yourself, while reciting the book. The challenge is not against you — it is the diagnostic for the next level.',
    },
    {
      type: 'hub',
      slug: 'taqwa',
      connectorText:
        'Taqwa is often translated as fear of Allah — but the root means a shield, a protective cover you build around yourself. Understanding what it actually is changes how you pursue it.',
    },
    {
      type: 'article',
      slug: 'ihsan-three-layers-quran',
      connectorText:
        "Islam, Iman, Ihsan — the Quran's three-layer structure of the deen. Ihsan is the ceiling: to worship Allah as though you see Him. This piece traces how the Quran builds toward it.",
    },
    {
      type: 'ayah',
      slug: '2:149-152',
      connectorText:
        "The path closes here: the most reciprocal promise in the Quran. Remember Me, and I will remember you. Sit with what it means that the Creator of the universe offers this exchange.",
    },
  ],
}

// ─── Exports ───────────────────────────────────────────────────────────────

export const PATHS: Path[] = [
  pathSomethingHappened,
  pathSomethingMissing,
  pathWantToUnderstand,
  pathGoDeeper,
]

export const PATHS_BY_SLUG: Record<string, Path> = Object.fromEntries(
  PATHS.map((p) => [p.slug, p])
)

// Used by article/hub pages to show path attribution (v2)
export function getPathsContainingStop(
  type: PathStop['type'],
  slug: string
): Path[] {
  return PATHS.filter((p) => p.stops.some((s) => s.type === type && s.slug === slug))
}
