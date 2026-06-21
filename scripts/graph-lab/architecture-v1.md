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

## ✅ FULL STACK VALIDATED — capstone
The complete core pathway runs end-to-end on real data:
**natural-language situation → theme seeds → graph pool → within-cluster centrality rank → MMR diversify → a constellation of sound, diverse, exemplar-anchored ayahs.**
This IS the "PLACE the right sign" step of the Guidance Loop. It needs: no voice, no new content extraction, no graph DB, no embeddings, no LLM in the retrieval path (one optional cheap LLM call at routing). It runs in-memory over existing frontmatter in a few hundred lines. The differentiated product is buildable now.

## What's NOT decided yet (open)
- ~~Salvage rate of the 14,257 edges~~ **RESOLVED: ~98% salvageable (see step 3). Salvage all.**
- Graph DB choice (FalkorDB vs Neo4j vs in-memory build) — defer until node/edge counts post-normalization are known; at this scale it may not matter.
- Whether MODERN-BRIDGE axis ships at all (scholar call — adversarial-quotation risk).
- Quality of the bottom-up ontology clustering (ontology-v1 is a first pass; needs the normalization run to validate that the merge map actually collapses the tail cleanly).
- Next empirical test: run normalization on the full corpus + build a tiny graph projection and execute a real "constellation" query end-to-end to validate the whole stack on live data.
