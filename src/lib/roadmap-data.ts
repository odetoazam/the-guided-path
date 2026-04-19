// ── Updated by /cofounder skill at session end ────────────────────────────────

export const ROADMAP = {
  lastUpdated: 'April 20, 2026',

  content: {
    totalAyahs: 6236,
    doneAyahs: 293,
    queuePosition: '5:102',
    surahsInProgress: 5,
  },

  unlockChain: [
    {
      id: 'corpus',
      label: 'Tadabbur corpus',
      sub: '6,236 ayahs — the moat',
      why: 'Every other layer is built on top of this. Without depth here, nothing downstream is credible.',
      status: 'active' as const,
      current: '293 done · queue at 5:102',
      blockedBy: null,
    },
    {
      id: 'tagging',
      label: 'Concept tagging',
      sub: 'Controlled vocabulary across full corpus',
      why: 'Turns the corpus from a pile of files into a navigable semantic map. Unlocks theme search and cross-surah connections.',
      status: 'queued' as const,
      current: '~5 files done (Surah 1 only)',
      blockedBy: 'corpus at Surah 10+',
    },
    {
      id: 'kb',
      label: 'Knowledge base',
      sub: '/query-quran CLI skill',
      why: 'LLM reads concept indexes → synthesizes answers with ayah citations. The internal intelligence layer.',
      status: 'later' as const,
      current: 'Not started',
      blockedBy: 'concept tagging complete',
    },
    {
      id: 'voice',
      label: 'Voice companion',
      sub: 'Contemplation layer — the end state',
      why: '"Here\'s what I\'m dealing with." Depth-first on a specific ayah. Calm presence. Not a chatbot.',
      status: 'later' as const,
      current: 'Not started',
      blockedBy: 'knowledge base + user reflection data',
    },
  ],

  visionLayers: [
    { num: 1, label: 'Living map of Quranic meaning', status: 'building' as const },
    { num: 2, label: 'Personal reflection layer', status: 'shipped' as const },
    { num: 3, label: 'Contemplation companion', status: 'later' as const },
  ],

  openQuestions: [
    'Do we collect user reflections? Changes what AyahGuide fundamentally is.',
    'Monetization: premium tier, institutional licensing, or donation?',
    'Scholar endorsements: who first, what the ask looks like.',
  ],

  shipped: [
    { title: '114 surah overview pages', date: 'Mar 2026' },
    { title: 'Entity hub system (101 hubs, full audit)', date: 'Apr 2026' },
    { title: 'Auth + reading layer (history, favorites, notes)', date: 'Apr 2026' },
    { title: 'Institutional pages (about, methodology, contested-verses)', date: 'Apr 2026' },
    { title: 'Mobile UX (responsive typography, [PAUSE] dividers, share card)', date: 'Apr 2026' },
    { title: 'OG image generation (per-surah + generic quote route)', date: 'Apr 2026' },
    { title: 'Advisor framework (7 personas)', date: 'Apr 2026' },
    { title: 'Guided Paths feature', date: 'Apr 2026' },
  ],
}
