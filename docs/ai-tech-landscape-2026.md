# AI Technology Landscape & Architecture Decisions (Jun 2026)

*Four parallel research scans run during the /cofounder session of 2026-06-20, to pressure-test the meaning-layer + voice architecture against the current state of the art. Companion to `docs/ayahguide-vision.md` ("The Meaning Layer" section) and the execution specs in `scripts/`.*

---

## 1. Voice AI — VERDICT: pipeline, not speech-to-speech

**Decision confirmed.** Use STT → Claude (grounded brain) → TTS, orchestrated by **LiveKit Agents** (turn detection, barge-in, echo cancellation built in). Reject end-to-end speech-to-speech (OpenAI Realtime, Gemini Live) as the primary brain.

Why, specifically:
- **Grounding control** — S2S models map audio→audio in one network; you can't insert Claude, and benchmarks (S2SBench, MTalk-Bench) document them *defaulting to the language prior and improvising* when grounding is sparse. Fatal for religious claims.
- **Auditability** — the pipeline yields an intermediate text transcript, so every spoken sentence is reviewable against content policy. Impossible with audio-only S2S.
- **Latency is a non-goal** — a contemplative companion *wants* unhurried pacing. Tune endpointing thresholds *longer*; comfortable silence is a feature.

Concrete stack: **Deepgram Nova-3/Flux** (STT, ~200–400ms, validate on Arabic terms) → **Claude** (grounded) → **ElevenLabs** (warmth) or **Hume EVI/Octave** (programmatic pacing/prosody — pause/resume mid-utterance, useful for reverent delivery).

## 2. Retrieval — VERDICT: spine + typed KG primary, BUT keep a pluggable vector slot

**Bet validated, with one correction.** PageIndex-style hierarchical reasoning-retrieval + a typed knowledge graph is squarely on the 2026 best-practice line for structured, provenance-sensitive corpora ("similarity ≠ relevance"; PageIndex hit 98.7% on FinanceBench beating vector RAG). The Quran's canonical surah→ayah→tafsir hierarchy is a *better* fit than the financial PDFs these tools were built for. A hand-curated typed KG also sidesteps GraphRAG's noisy/expensive auto-extraction stage.

**The correction to our "no vector DB ever" line:** 2026 research (arXiv 2511.18177) shows vectorless wins for *single structured documents* but loses on *fuzzy thematic, cross-document* retrieval. Our riskiest queries are exactly thematic ("ayahs about patience in hardship") where no shared vocabulary or curated edge exists — and serendipitous cross-surah resonance is literally the "living map of meaning" the vision promises. So: **architect a pluggable third retriever slot and add a thin embedding layer later, for thematic/serendipitous discovery only — not as a default.** The typed graph covers *known* links; embeddings surface the *unanticipated* ones.

Tooling worth noting: Neo4j or FalkorDB (graph); LangGraph/agentic router (tree-navigate vs graph-traverse vs vector-fallback).

## 3. Memory — VERDICT: compounding longitudinal memory IS the moat; local-first is non-negotiable

Memory is the 2026 consensus moat — it converts usage into a proprietary user model a stateless ChatGPT can't replicate. For spiritual direction the fit is exact: value compounds as the system tracks recurring themes, resolved-vs-active struggles, and growth.

- **Best fit: a self-hosted temporal knowledge graph (Zep/Graphiti).** Bi-temporal (tracks when a fact was *true* vs *learned*) and *invalidates rather than deletes* — so a resolved struggle stays as queryable history. This models an evolving inner life better than fact-extraction (Mem0, no temporal model) or runtime-tiered memory (Letta).
- **Shape the profile as a single living document** the AI refines via background consolidation (LangMem `enable_inserts=False`), over a searchable fact store. **Invest disproportionately in read-time retrieval** — it dominates outcomes (~20pt) over write sophistication (~3–8pt).
- **Privacy is the product, not a feature.** Spiritual reflections are GDPR Art. 9 *special-category* data (religious belief + health) → explicit consent. Strongest posture: **local-first** (SQLite-vec/LanceDB + on-device embeddings + E2EE sync via CRDTs); escalate to a TEE / Apple-PCC-style private-compute pattern only when a bigger model is needed. Cautionary: Replika broke recall in a re-architecture; Dot shut down and stranded users' memory. The layer is fragile — own it.

## 4. Competitive landscape — VERDICT: large, validated, unowned whitespace

- **Islamic AI is broad but academically discredited.** A 2025 peer-reviewed study (Journal of Digital Islamicate Research) tested 5 Islamic chatbots on 80 fiqh questions — *none* reached "Trusted Educational Output"; documented verse/hadith misattribution, oversimplification, ikhtilāf collapsed into one confident answer, fatwā-shaped output. IslamicLegalBench confirms LLMs reason poorly across the pluralist legal tradition. Institutional lines already drawn (Nahdlatul Ulama prohibits AI fatwas; Dar al-Iftā warns).
- **Christian/contemplative market proves willingness to pay for depth + ritual + audio.** Hallow (~$84M raised, #2 US App Store at Lent, ~40% non-Catholic downloaders); Pray.com (18M+ downloads, $34M); Bible Chat (30M+). The Muslim market is *not* served at this quality tier.
- **Secular reflection UX to borrow:** Rosebud (AI journaling, longitudinal insight, therapist-recommended), Stoic, Mindsera — "AI as a reflective companion that asks better questions and tracks growth," not an oracle.
- **The unowned position:** a depth-first, provenance-transparent, *ikhtilāf-honest* contemplation companion that **refuses to play mufti** — fusing Hallow's ritual/monetization + Rosebud's reflective-companion UX on a human-validated corpus (not a model wrapper). Three markets each hold one piece; nobody holds all three.

### Hard product rules (from the cautionary tales)
1. **Never impersonate a scholar/clergy or perform ritual acts** (the "Father Justin" failure — defrocked in 24h for claiming ordination + offering confession). The companion *introduces and accompanies; it does not rule.*
2. **Provenance or refuse** — a single misattributed ayah/hadith is category-fatal. Every claim carries a verifiable, era/isnād-labeled source; refuse rather than guess.
3. **Surface ikhtilāf by design** — make disagreement a visible feature, not a hidden caveat. This turns the category's #1 trust failure into our differentiator.

---

## Net effect on the plan

Three concrete updates to `docs/ayahguide-vision.md` / specs:
1. **Voice:** LiveKit pipeline (Deepgram → Claude → ElevenLabs/Hume), endpointing tuned *long*.
2. **Retrieval:** keep the spine + typed KG primary, but design a **pluggable vector slot** for thematic/serendipitous discovery (drop the dogmatic "zero vectors" framing).
3. **Memory:** Graphiti temporal graph + living-profile doc, **local-first/E2EE** — privacy as product. This is also the architecture that makes "capture realizations across years" possible (see the Guidance Loop in the vision doc).

The research did not contradict the core bet — it confirmed we're on the 2026 best-practice line and that the whitespace is real, validated, and unowned. The two things that turn this from "good app" into "defensible category-definer": the **validated corpus** (moat vs. every RAG wrapper) and the **guidance theory** (below) that no competitor has.
