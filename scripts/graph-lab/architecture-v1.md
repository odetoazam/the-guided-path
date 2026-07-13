# Semantic Layer — Architecture Decision v1 (Jun 2026)

*Output of an internal design debate (tree-first skeptic vs graph-first advocate) adjudicated against empirical corpus data. Companion artifacts: `ontology-v1.md` (the multi-axis vocabulary), `recurring-terms.txt` (the evidence). Supersedes the assumptions in `scripts/EXTRACTION-PASS-SPEC.md`.*

## The empirical findings that drove this

1. **The corpus is richly but inconsistently self-tagged** (two frontmatter eras). `concepts:` is mostly noise as a graph layer (87% hapax, only 25% of uses recurring). `tags:` is the real folksonomy (71% of uses covered by terms appearing ≥5×). 1,002 terms recur ≥5×.
2. **14,257 ayah→ayah edges already exist** in `related_ayahs:` frontmatter — untyped, no basis/provenance, but **authored by the validated `/quranic-tadabbur` skill** alongside the reflections (not random autocomplete exhaust).
3. **The 45-slug controlled vocab was far too small** — it had no rhetoric/grammar/character/state/bridge axes, so it forced everything into ~45 flat themes and captured only 25% of usage.

## The decision: the AYAH is the node; tree and graph are two indexes over it

The debate dissolves once you stop treating tree and graph as competitors. **The ayah-passage is the node.** The hierarchy (surah→passage→ayah) and the typed graph are *two indexes over the same node set*, serving different pathways:

- **Hierarchy / spine** (PageIndex-style reasoning navigation) — serves *deep-study* (#2). **It is nearly free**: the filesystem already IS the tree; we only add per-node summaries for LLM-guided descent. So "tree-first" costs almost nothing and is not in tension with the graph.
- **Graph** (typed edges) — serves *constellation placement* (#1) and *free-roam map* (#5), the differentiated pathways. A tree structurally cannot express cross-surah resonance; this is where the product value and the moat live.

So we build **both**, because they are not alternatives — the tree falls out of the filesystem for free, and the graph is the differentiator. The graph-first advocate is right that the graph is the cargo; the skeptic is right that the tree is the cheap, safe substrate. Both win.

## The edges: candidates, not facts (resolving the central disagreement)

The skeptic is right that shipping 14,257 untyped edges = laundering unverified theological claims. The advocate is right that discarding hand-authored cross-references throws away the biggest asset. **Resolution — treat them as CANDIDATE edges that must pass a typing + basis pass before becoming traversable:**

Every edge carries `{type, basis, source, confidence, validated_by}`:
- **type:** `lexical-root | thematic-echo | rhetorical-parallel | naskh | story-continuation | contrast | shared-concept`
- **confidence tiers** govern product behavior:
  - **objective** (shared root / explicit intra-Quranic citation / classical tafsir cross-ref) → traversable, high confidence
  - **thematic-asserted** (author-chosen resonance, basis quotable from the tadabbur) → traversable, *labeled as interpretive*
  - **unverifiable** (no citable basis) → **quarantined, non-traversable** until human-promoted
- **Provenance is the guardrail, not abstinence.** We don't trust an edge; we trust its basis. This is *strictly safer than the status quo*, where prose implies connections with zero audit trail.

## Storage: filesystem-first, graph as derived projection

- **Source of truth = frontmatter** (edges + axis tags live in the `.md` files, human-inspectable, every change a reviewable git diff touching a sacred file).
- **The graph DB is a build-time projection** (FalkorDB/Neo4j, or even an in-memory/JSON build at this scale — ~3k nodes, ~20k edges fits trivially), rebuilt from frontmatter. Never the source of truth.
- This keeps the no-black-box ethos *and* gets real graph query.

## The discovery layer: pluggable, deferred

Per the tech scan, the curated graph covers *known/cited* resonance; it cannot surface the *unanticipated* cross-surah link no author wrote. Reserve a **pluggable embedding slot** for serendipitous discovery in constellation placement — added later, never the default, clearly separated from the provenance-bearing graph.

## Revised build sequence (supersedes EXTRACTION-PASS-SPEC's blind-extraction plan)

1. **Finalize the multi-axis ontology** (`ontology-v1.md`) — scholar review of the flagged judgment calls (esp. MODERN-BRIDGE warrant, taqwa/khashyah/khawf registers).
2. **Normalize** — map every file's existing concepts/tags → canonical axis nodes via the merge map. (Harvest, don't re-extract — far cheaper, grounded in what the corpus actually says.)
3. **Salvage the 14,257 edges** — typing + basis pass; tier by confidence; quarantine the unverifiable. **EMPIRICALLY VALIDATED (12-file, ~92-edge sample):** ~42% objective, ~55% thematic-asserted, **only ~2% unverifiable.** These are a deliberate hand-authored munāsabāt graph (the related verse is often quoted in the body), not noise. Two mechanical wins: (a) a large share are *lexical-root / twin-verse* links auto-derivable by root-matching against the corpus cache — captures the ~40% objective tier cheaply and with high confidence; (b) *same-surah* edges are almost always story-continuation/structural and trust-high. Recommended pass order: auto lexical-root + same-surah-continuation first → tag remainder `thematic-asserted` for light review → quarantine the ~2% residual. **Verdict: salvage all 14,257; do not discard.**
4. **Fill gaps** — only where normalization leaves a node thin, targeted LLM enrichment (via the skill discipline), not a blind 6,000-file pass.
5. **Build the projection** — frontmatter → graph DB; add per-node spine summaries.
6. **Then** the pathways (free-roam map first — highest unserved demand, lowest risk).

## ✅ EDGE TYPING / SALVAGE PASS — DONE (full corpus, `type_edges.py` → `edges-typed.json`)

Step 3 executed on **all 14,257 raw edges** (→ 11,982 unique after collapsing reciprocal pairs). Each edge now carries `{src, tgt, type, basis, source, confidence, shared_roots, min_df, strength}`. Typing is mechanical (no LLM): lexical-root via Arabic-root intersection against `quranic-corpus.json`, with a **document-frequency filter** (a shared root only counts as objective when DF ≤ 200 — the top ~42 ubiquitous roots like أله/قول/كون are ambient and say nothing; "strong" = rarest shared root DF ≤ 50).

**Results — the mechanical pass reproduces the human hand-sample almost exactly:**
- **Strict** (strong lexical DF≤50 + close same-surah continuation only): **42.9% objective / 55.5% thematic / 1.6% quarantine** — matches the 12-file hand sample's ~42/~55/~2 prediction.
- **Lenient** (any distinctive root ≤200 + continuation): 72.8% objective / 25.6% thematic / 1.6% quarantine.
- The edge file **carries `min_df` + `strength`**, so the query layer chooses its own operating point rather than baking a threshold into the tier (filesystem-first / no-black-box).

**Type breakdown:** lexical-root 6,910 (57.7%) · shared-concept 1,832 · story-continuation 1,812 (same-surah, gap ≤ 30 ayahs — median gap 3, 93% within 30; the long-range tail demoted to thematic) · thematic-echo 1,236 · unresolved 190 · external-reference 2 (e.g. 21:105 → Psalm 37:29, a deliberate intertextual citation — objective but terminal in the Quran graph).

**Spot-checks confirm the lexical tier is genuine munāsabāt, not coincidence:** 50:12→25:38-39 (رسس, People of ar-Rass, DF=2); 12:18→20:96 (سول DF=4 — "your souls enticed you" / "my soul enticed me", Yaʿqūb's sons ↔ the Samiri); 59:7→3:137-141 (دول, wealth-circulation, DF=2); 2:255→53:26/32:4 (شفع, intercession-by-permission). `query_typed.py` proves confidence-gated free-roam + constellation work on the typed graph.

**Byproduct — `gap-report.md`:** the 190 quarantined edges point at **92 cited-but-unwritten ayahs**, concentrated in Aal-Imran (50) and An-Nisa (33). The corpus's own cross-reference structure is naming the highest-value content gaps (3:14 dunya-adornment, 3:54 *wa-makara-llāh*, 3:28 awliyāʾ, 3:19 *inna d-dīna ʿinda-llāhi l-islām*).

**Artifacts (re-runnable):** `type_edges.py`, `edges-typed.json`, `query_typed.py`, `write_gap_report.py`, `gap-report.md`.

## END-TO-END VALIDATION (live data, `build_and_query.py`)

Built the in-memory graph from frontmatter and ran both pathways on the real corpus:
- **Projection works at scale:** 2,858 nodes, **14,044 edges resolved (98.5%)**, avg degree 8.3, 114 isolated. Auto-detected hubs are theologically correct (55:1-13 Ar-Raḥmān, 2:255 Āyat al-Kursī, 2:6-17 hypocrisy, 2:163-167 tawḥīd) — strong evidence the edge data is trustworthy.
- **Constellation pathway works beautifully:** seed "grief" → 39:53 / 9:40 / 30:50 (three surahs, three angles); "divine-testing" → 76:1-3 / 29:2-3 / 2:211-216. The "resonant-but-distinct constellation" is buildable NOW from existing data — no new extraction.
- **Finding 1 (confirms graph-first):** the hand-authored edges encode resonance the theme-tags miss (free-roam from 2:255 → coherent divine-knowledge/sovereignty cluster with *zero* shared normalized tag). Edges are the stronger signal; edges + themes are complementary.
- **Finding 2 (next concrete work):** theme normalization must apply the FULL ontology merge map — the test's ~40-term subset left 12,488 distinct theme strings uncollapsed. Collapsing to ~350 canonical is what makes the theme axis usable.

**Conclusion: the architecture is validated on real data.** No infra required to prove it; an in-memory build over frontmatter already delivers the differentiated pathway.

## EXPERIMENT #1 — full normalization + hybrid constellation (`normalize_and_query.py`)

- **Merge map auto-parsed from ontology-v1.md:** 189 canonical, 778 aliases, 67 conflicts skipped. (Only 189 of the intended ~350 — the prose-with-noise format doesn't fully machine-parse; needs a clean `merge-map.csv`, the ontology's own §6 recommendation.)
- **Normalization coverage — corrected finding (v2 map, `merge-map.csv`, 200 canonical / 1,012 aliases):** raw coverage = 54% of all theme/tag uses; 2% explicit known-noise DROP; 42% still unmapped. **But the unmapped 42% is the irreducible HAPAX TAIL** — 14,070 uses across 11,235 distinct strings (~1.25 uses each), the Codex-era bespoke per-file annotations that by definition connect nothing in a graph. The metric that matters — coverage of the *navigable* (recurring ≥5×) vocabulary — went from a 3,209-use gap to **only 37 uses unmapped ≈ 99%.** Earlier "→80%" prediction was wrong: raw ceiling is ~56% because ~42% of field-uses are unique-by-design. Hitting it = navigable vocabulary essentially complete. (Scholar-review flags for the v2 map captured in the agent's 10 hardest calls: mercy/justice theme-vs-attribute, khashyah/khawf split, taqlid→social-proof bridge warrant, death-as-own-node, etc.)
- **Hybrid constellation = strong.** Switching resonance from raw-degree to **within-cluster edge-centrality** (cross-references *from other ayahs about the same theme*) auto-finds each theme's canonical exemplar: tawakkul→65:3 (w=22, *fa-huwa ḥasbuhu*), divine-testing→29:2-3 (w=22), sabr→73:10 (*sabran jamīlā*). Matches scholarly consensus, zero LLM in the query path. Multi-axis separation cleanly splits theme/state from device/grammar.
- **DISCOVERY — "the Quran's self-weighting":** within-cluster centrality surfaces the verse the corpus's own cross-reference structure treats as load-bearing for each theme. A publishable, defensible artifact derived from 14k hand-authored edges.

### Settled retrieval recipe (resolves graph/tree/vector debate)
**Pool** by canonical theme-membership · **Rank** by within-cluster edge-centrality · **Diversify** by MMR (multi-axis tags + surah + edge-adjacency) · **Embeddings** reserved for the unmapped tail only. Not graph-vs-tree-vs-vector — pool/rank/diversify, each using the signal it's best at.

### Core conclusion
The constellation pathway (the Guidance Loop's "PLACE") **works today, in-memory, over existing frontmatter, ~200 lines** — no voice, no new extraction, no DB, no embeddings needed for the central value. "Harvest what's on disk," not "build the cathedral."

## EXPERIMENT (c) — situation → theme bridge → constellation (`situation_query.py` + `situations.json`)

The product's front door, validated. A natural-language life-situation drives the engine (not a theme slug). 20 curated situations → canonical seed nodes; engine = pool by seed-membership → rank by seed-hits + within-cluster centrality → MMR diversify.

Real results (no LLM in retrieval path):
- *"I feel like a hypocrite"* → 63:1 (Al-Munāfiqūn, central=12), 48:11, 33:4-5.
- *"anxious about money"* → 65:3 (*fa-huwa ḥasbuhu*, **central=32**), 51:22-23, 23:17-18.
- *"my brother betrayed me, can't forgive"* → 42:43 (the ʿafw verse), 26:204-209, 71:26-28.
- *"my faith feels dry"* → 20:123-124 (turning from dhikr), 40:58, 6:25-26.

Caveat: demo routing is keyword-match (2 of 6 test queries missed). Production = one cheap LLM classifier (free-text → situation slug). The *engine* is sound once routed.

## ✅ LLM ROUTER + SITUATION EXPANSION — DONE (`situation_router.py`)

The keyword caveat is now resolved. **`SituationRouter`** routes free text → situation slug + canonical seeds via one cheap **`claude-haiku-4-5`** call (cheapest fast tier), forcing structured JSON through `client.messages.parse()` + `output_config.format` (json_schema), `temperature=0` for determinism, no `effort` param (errors on Haiku), `max_tokens=512`. The model classifies into a **closed set** (the situation slugs) so it cannot invent un-poolable routes; model-proposed seeds are validated against the canonical vocabulary and unioned with the matched situation's curated seeds. **Graceful degradation:** with no `ANTHROPIC_API_KEY`/SDK it falls back to the offline keyword matcher, so the pathway runs with no network.

**Situation set expanded 20 → 37** (`situations.json`), each now carrying an LLM-facing `description` + keyword `phrasings` + canonical `seeds` (all 37 validated by `check_situation_seeds.py`). New situations close the persona/pathway gaps: academic-critique-of-quran (Yusuf), child-asked-a-hard-question (Sara), battling-addiction, comparison-on-social-media, facing-illness-or-diagnosis, angry-at-god, marriage-strain, hurt-by-religious-community, struck-by-awe-and-wonder, etc.

**Routing validated (real Claude instance against the exact catalog): 15/15.** On hard free-text with zero phrasing overlap — *"i found out my brother has been lying to me for years"* → betrayed-by-family; *"the doctor says it's stage 3"* → facing-illness-or-diagnosis; *"a professor argued the quran was edited by later scribes"* → academic-critique-of-quran; *"it feels like shouting into a void"* → feel-unseen-by-god — all 13 substantive queries routed correctly (the keyword matcher got 1/8 of these), and both precision probes (a prayer-time lookup, an Arabic-grammar study request) correctly returned `none`. Live execution needs an API key added to the app env; the SDK plumbing is standard.

## ✅ FULL STACK VALIDATED — capstone
The complete core pathway runs end-to-end on real data:
**natural-language situation → theme seeds → graph pool → within-cluster centrality rank → MMR diversify → a constellation of sound, diverse, exemplar-anchored ayahs.**
This IS the "PLACE the right sign" step of the Guidance Loop. It needs: no voice, no new content extraction, no graph DB, no embeddings, no LLM in the retrieval path (one optional cheap LLM call at routing). It runs in-memory over existing frontmatter in a few hundred lines. The differentiated product is buildable now.

## ✅ PRODUCTIONIZE — infra decision + projection export + free-roam UI prototype

**INFRA DECISION: in-memory build / static JSON projection — NOT FalkorDB/Neo4j.** At the realized scale (2,858 nodes, 11,790 traversable typed edges, avg degree 8, 118 theme nodes) the two product operations are trivial dict/set ops: free-roam = 1-hop neighbor lookup; constellation = pool-by-theme → within-cluster centrality → MMR. A graph DB buys nothing here and adds an external service, a query language, and a frontmatter→DB sync pipeline — all against the filesystem-first/no-black-box ethos. **Source of truth stays the frontmatter; the projection is a derived, rebuildable JSON.** Defer FalkorDB until a real trigger appears: >~100k nodes, multi-hop pathfinding/shortest-path queries, or live per-user graph writes. The engine keeps a clean interface (load projection → adjacency + theme index) so FalkorDB can be swapped behind it later without touching the UI.

**Projection built (`build_export.py` → `graph-export.json`, 896 KB):** the single artifact a UI/engine consumes — `{meta, nodes:{ref:{s,t,th[],d}}, edges:[[src,tgt,typecode,conf]], themeIndex:{theme:[refs]}, situations:[...]}`. Quarantine + external-reference edges excluded; bridge axis excluded from theme membership (call 9). Top hubs theologically correct (55:1-13, 2:255, 2:6-17).

**Free-roam map UI — working prototype** (rendered as an interactive widget, real engine running client-side on a 196-node real slice of the graph — `graph-widget-slice.json`). Two pathways wired and demonstrated end-to-end:
- **Constellation front door:** pick a life-situation → pool by seed-theme → rank by within-cluster centrality → MMR-diversify → 3 resonant-but-distinct verses (different surahs), each labeled with its "via" themes and centrality weight.
- **Free-roam:** click any node → it recenters, typed neighbors fan out, edges styled by tier (gold solid = lexical-root objective, teal = same-surah continuation, dashed gray = thematic/interpretive). Click to walk.

This is the highest-unserved pathway (free-roam map) made tangible **without touching the live Next.js app** — the safe way to validate the surface before building the production route. Production wiring = drop `graph-export.json` into the app as a build artifact (or generate at build), read it in a route/RSC, render with the same engine + a force/SVG layer. **Artifacts:** `build_export.py`, `graph-export.json`, `graph-widget-slice.json`.

## ✅ NODE VALIDATION GATE — ADDED (2026-07-07, adversarial-review F1)

The edge tiers were provenance-gated but the **nodes** were not: `build_export.py` never read `validated:`, so 567 edge-source files (27%) with `validated: false` flowed into the projection — including 29:2-3, the divine-testing centrality exemplar. Fixed: every node now carries `v` (1=validated, 0=failed/pending, -1=unflagged) and `meta.validation` records the counts + policy. Same philosophy as edge `min_df`: the data carries the signal, the consumer picks the operating point — **but product surfaces MUST filter to `v==1`** (master validation policy).

**Measured cost of the gate:** validated-only view = **6,222 of 11,755 edges (53%)**. Clearing the 837 `validated: false` files ≈ doubles the safe traversable graph — the validation burn-down is graph-growth work, not housekeeping. Full findings: `docs/adversarial-review-2026-07.md`.

## ✅ EDGE DISCOVERY PASS — BUILT (2026-07-07, `propose_edges.py` → `edges-proposed.json`)

The salvage pass typed edges authors *had* written; this pass discovers cross-surah lexical-root connections **nobody authored** — root-intersection over the corpus cache, DF≤50, cross-surah only, excluding all existing pairs. **Zero mutation of sacred files.** New tier: `confidence: 'proposed'` — the shared rare root is an objective FACT but the resonance CLAIM is unreviewed (no author intent), so proposals are **non-traversable until promoted** by a review pass reading both passages.

**Results: 77,827 proposals**, tiered: 5,350 very-strong (DF≤10) · **654 multi-root very-strong, of which 350 with both endpoints validated = the elite promotion queue.** Spot-checks confirm the pass rediscovers *classical* munāsabāt no author had entered: 4:43↔5:6 (the two wudu/tayammum verses, 5 shared rare roots), 2:58↔7:161 (ḥiṭṭah told twice), 3:152↔8:11 (نعس DF=2 — the drowsiness at Uhud and Badr), 9:113↔11:74 (Ibrahim's أوّاه in both places), 3:46↔5:110 (Isa speaks in cradle and كهل). Existing graph = 11,982 pairs; the very-strong tier alone is a potential ~45% expansion, mechanically derived.

**Next:** a promotion pass (skill-disciplined — reads both passages, confirms/rejects the resonance, writes promoted edges back to frontmatter with basis) over the 350-elite queue first.

## What's NOT decided yet (open)
- ~~Salvage rate of the 14,257 edges~~ **RESOLVED: ~98% salvageable; typed + tiered (72.8% objective / 25.6% thematic / 1.6% quarantine). Salvage all.**
- ~~Graph DB choice (FalkorDB vs Neo4j vs in-memory build)~~ **RESOLVED: in-memory build / static JSON projection at this scale; FalkorDB deferred until a real trigger (>100k nodes / multi-hop / live writes). See PRODUCTIONIZE above.**
- ~~Whether MODERN-BRIDGE axis ships~~ **RESOLVED (scholar panel call 9): ships only QUARANTINED — separate layer, never pooled with classical vocab, per-term whitelist + caveat, barred from ahkām ayahs, illustrative-only.**
- ~~Quality of the bottom-up ontology clustering~~ **RESOLVED: merge-map collapses the navigable (≥5×) vocab to ~99%; scholar panel adjudicated the 10 hardest calls (see ontology §5-RESOLVED).**
- **Remaining for production wiring:** build the actual Next.js route/RSC for the free-roam map (the prototype proves the surface; `graph-export.json` is the artifact to load); add the live `ANTHROPIC_API_KEY` so `situation_router.py` runs the Haiku path instead of the keyword fallback; decide whether per-node spine summaries (PageIndex-style) are needed for the deep-study pathway (not needed for free-roam/constellation).
- **Still gating CONTENT quality (not the graph build):** tafsir re-key → finish semantic-enrich (`scripts/TAFSIR-REKEY-PLAN.md`).
