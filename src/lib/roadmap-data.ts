// ── Updated by /cofounder skill at session end ────────────────────────────────

export const ROADMAP = {
  lastUpdated: 'July 31, 2026',

  content: {
    totalAyahs: 6236,
    doneAyahs: 6236,
    queuePosition: 'COVERAGE COMPLETE — all 6,236 ayahs covered. Validation: 2,166 validated / 814 pending. Interpretive-read pass live (Jul 31): 50 files read, 24 activated, 26 queued for human review, ZERO false theses found. Triage: 271 auto-verified / 543 awaiting enrichment / 0 defects.',
    surahsInProgress: 114,
  },

  unlockChain: [
    {
      id: 'corpus',
      label: 'Tadabbur corpus',
      sub: '3,018 files · 100% ayah coverage · 2,158 validated — the moat',
      why: 'Every other layer is built on top of this. Coverage is COMPLETE (all 6,236 ayahs, verified Jul 12); validation triage (Jul 12) found 0 defects — the 844 pending files split into 272 auto-verified (awaiting the interpretive tafsir read) and 566 awaiting enrichment. NOT a web-publishing asset (decision Jul 7): it is the grounding corpus for AI surfaces.',
      status: 'active' as const,
      current: 'validation burn-down RUNNING — interpretive-read workflow proven (rubric + parallel reviewers + audit log). 177 auto-verified files left; enrichment still gated on the tafsir re-key.',
      blockedBy: null,
    },
    {
      id: 'meaning-layer',
      label: 'Graph substrate',
      sub: 'validated nodes + typed munāsabāt edges',
      why: 'THE current priority (decision Jul 7: "graph connections made to make future stuff easier"). Substrate hardened Jul 12-13: freshness gate (npm run graph / graph:check), provenance-preserving promotion overlay, motif-level review. Discovery runs 1+2 complete: 643 root-motifs reviewed, +669 confirmed cross-surah edges each carrying a quotable basis. Graph now 13,279 traversable edges; validated-only view 7,320.',
      status: 'active' as const,
      current: 'validated-only view 7,438 edges (was 7,355). Edge attachment made deterministic Jul 31 — overlapping nodes had let glob order pick the owner. Next lever: keep burning down validation; 350-elite promotion queue untouched.',
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
    'ANSWERED Jul 31 — the interpretive-read workflow is running (rubric + parallel reviewers + audit log; 50 files done, 0 false theses). The open half is the tafsir re-key, still gating enrichment of the 543.',
    'The 26 flagged files all share one defect: a classical ikhtilaf stated in one voice. One exemplar paragraph is drafted (9:4-6) awaiting a yes/no on the shape before the pattern is repeated.',
    'Definition of "substrate v1.0 done" — measurable gates so graph work has a finish line (deliberation F5); discovery below DF≤10 stays closed pending a phrase-level method.',
    'Do we collect user reflections? Unlocks longitudinal memory (the Blomma moat).',
    'Paths bet review 2026-09-25: do article/hub attribution strips (?src=) beat the old homepage baseline (9 visitors/60d)? If not, archive paths.',
    'Ayah reader route (/reflections): built 2026-07-31 against NORTH-STAR decision 4, then noindexed + pulled from nav and sitemap. Keep it as an unindexed path/hub destination, delete it, or reopen the decision? It also does not filter to validated nodes yet (decision 2).',
    'Monetization + scholar endorsements: who first, what the ask looks like.',
  ],

  shipped: [
    { title: 'Interpretive-read gate: 50 files read, 24 activated, 0 false theses; 3 frontmatter Arabic defects + 16 script-corruption spots repaired', date: 'Jul 2026' },
    { title: 'Guided paths repaired: all 20 stops now land on real content (was 13)', date: 'Jul 2026' },
    { title: 'Hub synthesis backlog closed — 25 written; every hub with 3+ articles has a real overview', date: 'Jul 2026' },
    { title: '4 corpus-verified articles filling empty path hubs (tadabbur, tawakkul, khushu, nazm)', date: 'Jul 2026' },
    { title: 'Ayah records tagged into the graph: 398 tags, 35 -> 160 records connected, 4 -> 44 hubs', date: 'Jul 2026' },
    { title: 'Sitemap repair: articles were entirely omitted (Next Data-Cache froze the Supabase read)', date: 'Jul 2026' },
    { title: 'Landing redesign (advisor/persona-tested): content-forward hero, articles surfaced, honest paths band', date: 'Jul 2026' },
    { title: 'Paths distribution: /paths index + attribution strips on article/hub pages (instrumented)', date: 'Jul 2026' },
    { title: 'FAQ AEO layer: 36 Q&As across top-10 organic articles (FAQPage schema 1→11)', date: 'Jul 2026' },
    { title: 'Quranic economics article cluster (5 corpus-verified articles + Fable QA pass)', date: 'Jul 2026' },
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
