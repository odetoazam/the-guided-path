// ── Updated by /cofounder skill at session end ────────────────────────────────

export const ROADMAP = {
  lastUpdated: 'June 20, 2026',

  content: {
    totalAyahs: 6236,
    doneAyahs: 6039,
    queuePosition: 'surahs 108, 109, 110, 111, 113 (~22 ayahs) + scattered gaps',
    surahsInProgress: 109,
  },

  unlockChain: [
    {
      id: 'corpus',
      label: 'Tadabbur corpus',
      sub: '~6,039 / 6,236 ayahs — the moat',
      why: 'Every other layer is built on top of this. ~97% complete: 109 of 114 surahs, 773 tafsir reports. No longer the bottleneck.',
      status: 'active' as const,
      current: '~6,039 done (97%) · 5 short surahs + minor gaps remain',
      blockedBy: null,
    },
    {
      id: 'meaning-layer',
      label: 'Semantic meaning-layer',
      sub: 'spine + munāsabāt graph + lenses',
      why: 'VALIDATED end-to-end (Jun 20): situation → constellation works on real data — 2,858 nodes, 14,257 hand-authored edges (~98% salvageable), 200-term multi-axis ontology, no LLM in the retrieval path. Built from existing frontmatter; no DB/embeddings needed.',
      status: 'active' as const,
      current: 'validated in scripts/graph-lab/ · productionizing',
      blockedBy: null,
    },
    {
      id: 'pathways',
      label: 'Reader pathways (UI)',
      sub: 'free-roam map + situation entry',
      why: 'Wire the validated engine to a surface. Free-roam map = highest unserved demand, lowest risk; constellation entry from a natural-language life-situation ("I feel like a hypocrite" → 63:1).',
      status: 'queued' as const,
      current: 'Engine ready; UI not built',
      blockedBy: 'meaning-layer productionized',
    },
    {
      id: 'voice',
      label: 'Voice companion',
      sub: 'one pathway, built LAST',
      why: 'Single-ayah depth-first, Claude-as-constrained-brain (STT→Claude→TTS). One pathway over the substrate, not the product. Demand unproven (advisor flag) — build after the text pathways prove the engine.',
      status: 'later' as const,
      current: 'Not started',
      blockedBy: 'text pathways shipped + demand signal',
    },
  ],

  visionLayers: [
    { num: 1, label: 'Living map of Quranic meaning', status: 'shipped' as const },
    { num: 2, label: 'Personal reflection layer', status: 'shipped' as const },
    { num: 3, label: 'Contemplation companion (voice)', status: 'building' as const },
  ],

  openQuestions: [
    'Edge typing/salvage pass (auto lexical-root via corpus cache) + scholar review of the ontology’s 10 flagged calls.',
    'Productionize the graph: keep in-memory build over frontmatter, or FalkorDB?',
    'Corpus-quality blocker: tafsir re-key → finish semantic-enrich (28% done) — gates content quality, not the graph build.',
    'Do we collect user reflections? Unlocks longitudinal memory (the Blomma moat).',
    'Monetization + scholar endorsements: who first, what the ask looks like.',
  ],

  shipped: [
    { title: 'Tadabbur corpus ~97% complete (109 surahs, 801 tafsir reports)', date: 'Jun 2026' },
    { title: '114 surah overview pages', date: 'Mar 2026' },
    { title: 'Entity hub system (101 hubs, full audit)', date: 'Apr 2026' },
    { title: 'Auth + reading layer (history, favorites, notes)', date: 'Apr 2026' },
    { title: 'Institutional pages (about, methodology, contested-verses)', date: 'Apr 2026' },
    { title: 'AEO motion (answer-first + auto FAQPage schema)', date: 'Jun 2026' },
    { title: 'Mobile UX (responsive typography, share card)', date: 'Apr 2026' },
    { title: 'OG image generation (per-surah + generic quote route)', date: 'Apr 2026' },
    { title: 'Advisor framework (7 personas)', date: 'Apr 2026' },
    { title: 'Guided Paths feature', date: 'Apr 2026' },
  ],
}
