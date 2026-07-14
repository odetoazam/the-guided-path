// ── Updated by /cofounder skill at session end ────────────────────────────────

export const ROADMAP = {
  lastUpdated: 'July 13, 2026',

  content: {
    totalAyahs: 6236,
    doneAyahs: 6236,
    queuePosition: 'COVERAGE COMPLETE — all 6,236 ayahs covered by 3,018 files. Validation split: 2,158 validated / 844 pending (triage: 272 auto-verified awaiting interpretive read · 566 awaiting enrichment · 0 defects) / 36 unflagged',
    surahsInProgress: 114,
  },

  unlockChain: [
    {
      id: 'corpus',
      label: 'Tadabbur corpus',
      sub: '3,018 files · 100% ayah coverage · 2,158 validated — the moat',
      why: 'Every other layer is built on top of this. Coverage is COMPLETE (all 6,236 ayahs, verified Jul 12); validation triage (Jul 12) found 0 defects — the 844 pending files split into 272 auto-verified (awaiting the interpretive tafsir read) and 566 awaiting enrichment. NOT a web-publishing asset (decision Jul 7): it is the grounding corpus for AI surfaces.',
      status: 'active' as const,
      current: 'validation burn-down: 272 interpretive reads + 566 enrichments (unlock: tafsir re-key plan)',
      blockedBy: null,
    },
    {
      id: 'meaning-layer',
      label: 'Graph substrate',
      sub: 'validated nodes + typed munāsabāt edges',
      why: 'THE current priority (decision Jul 7: "graph connections made to make future stuff easier"). Substrate hardened Jul 12-13: freshness gate (npm run graph / graph:check), provenance-preserving promotion overlay, motif-level review. Discovery runs 1+2 complete: 643 root-motifs reviewed, +669 confirmed cross-surah edges each carrying a quotable basis. Graph now 13,279 traversable edges; validated-only view 7,320.',
      status: 'active' as const,
      current: 'runs 1+2 merged · 39-root cleanup pass queued · next lever: validation burn-down activates edges',
      blockedBy: null,
    },
    {
      id: 'ai-surface',
      label: 'AI exposure surface',
      sub: 'typing or voice companion over the substrate',
      why: 'Decision Jul 7: corpus gets exposed through AI surfaces ("voice AI or even typing AI as needed"), NOT web ayah pages. Text-first companion is the cheap demand test before any voice build.',
      status: 'queued' as const,
      current: 'Not started — waits on substrate',
      blockedBy: 'graph substrate (validation burn-down + promoted edges)',
    },
    {
      id: 'voice',
      label: 'Voice companion',
      sub: 'one pathway, built LAST',
      why: 'Single-ayah depth-first, Claude-as-constrained-brain (STT→Claude→TTS). One pathway over the substrate, not the product. Demand unproven (advisor flag) — build after a typing surface proves the interaction.',
      status: 'later' as const,
      current: 'Not started',
      blockedBy: 'typing surface + demand signal',
    },
  ],

  visionLayers: [
    { num: 1, label: 'Living map of Quranic meaning', status: 'building' as const },
    { num: 2, label: 'Personal reflection layer', status: 'shipped' as const },
    { num: 3, label: 'Contemplation companion (AI)', status: 'later' as const },
  ],

  openQuestions: [
    'Which AI surface first — typing companion or voice — and what triggers the build? (NORTH-STAR open item)',
    'Interpretive-read workflow for the 272 auto-verified files (Fable first-pass flagger + human final call?) and executing the tafsir re-key plan to unlock enrichment of the 566.',
    'Definition of "substrate v1.0 done" — measurable gates so graph work has a finish line (deliberation F5); discovery below DF≤10 stays closed pending a phrase-level method.',
    'Do we collect user reflections? Unlocks longitudinal memory (the Blomma moat).',
    'Monetization + scholar endorsements: who first, what the ask looks like.',
  ],

  shipped: [
    { title: 'Motif-level munāsabāt review: 643 roots, +669 confirmed edges with quotable bases', date: 'Jul 2026' },
    { title: 'Graph substrate hardening: freshness gate, provenance-preserving promotion, validation triage (0 defects)', date: 'Jul 2026' },
    { title: 'Corpus coverage COMPLETE — all 6,236 ayahs', date: 'Jul 2026' },
    { title: 'NORTH-STAR.md standing decisions + adversarial review (docs/)', date: 'Jul 2026' },
    { title: 'Graph node validation gate + edge discovery pass (77,827 proposals)', date: 'Jul 2026' },
    { title: 'Tadabbur corpus ~97% coverage (109 surahs, 801 tafsir reports)', date: 'Jun 2026' },
    { title: 'Semantic meaning-layer validated end-to-end (graph-lab)', date: 'Jun 2026' },
    { title: '114 surah overview pages', date: 'Mar 2026' },
    { title: 'Entity hub system (101 hubs, full audit)', date: 'Apr 2026' },
    { title: 'Auth + reading layer (history, favorites, notes)', date: 'Apr 2026' },
    { title: 'Institutional pages (about, methodology, contested-verses)', date: 'Apr 2026' },
    { title: 'AEO motion (answer-first + auto FAQPage schema)', date: 'Jun 2026' },
    { title: 'Guided Paths feature', date: 'Apr 2026' },
  ],
}
