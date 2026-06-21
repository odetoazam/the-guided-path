# Meaning-Layer Extraction Pass — Spec (Job 1)

**Status:** SPEC — not yet implemented. Gated on the semantic-enrich quality pass.
**Author:** /cofounder session 2026-06-20
**Relationship to existing pipeline:** This is NOT content generation and NOT the
`semantic-enrich.py` quality pass. It is a *structural extraction* pass that reads the
already-validated, already-enriched tadabbur prose and derives the machine-readable
"brain" layers: controlled tags, a knowledge graph, and PageIndex node summaries.

---

## 0. Hard dependency gate (do not skip)

Extraction reads prose to produce structure. If the prose still carries flagged
errors, those errors become graph edges and propagate. Therefore:

> **Do not run the extraction pass until `semantic-enrich.py` has cleared all
> CRITICAL and MODERATE review verdicts** (and the 241 ERROR files have been re-run).

Check before running:
```
python3 scripts/semantic-enrich.py --report
```
Proceed only when CRITICAL+MODERATE unfixed ≈ 0.

This pass is **extraction over validated content**, so it does NOT require the
`/quranic-tadabbur` skill (no new Quranic claims are authored). It DOES require the
basis-citation discipline below — every interpretive edge must be grounded.

---

## 1. Purpose

One pass over every tadabbur file. Per file, emit in a single call:
1. **Controlled-axis tags** (the lenses' raw material)
2. **Typed knowledge-graph edges** (the web — munāsabāt + concept relations)
3. **A node summary** (the PageIndex spine — "what does this passage answer?")

One pass produces the substrate for all three brain layers at once.

---

## 2. Output schema

### 2a. Axis tags (appended to file frontmatter)
All values MUST come from a controlled vocabulary file. Novel values are NOT written —
they are logged to `vocab-candidates.json` for human review + vocab expansion.

| axis | vocab file | example values |
|---|---|---|
| `concepts` | `scripts/concept-vocabulary.md` (~45 slugs, exists) | sabr, tawbah, divine-testing |
| `characters` | `scripts/vocab-characters.md` (NEW) | musa, firawn, yusuf, maryam |
| `narrative_role` | `scripts/vocab-narrative-roles.md` (NEW) | court-confrontation, exodus, brothers-plot |
| `story_groupings` | `scripts/vocab-stories.md` (NEW) | people-of-the-cave, brothers-of-yusuf |
| `emotional_register` | `scripts/vocab-emotions.md` (NEW) | grief, fear, gratitude, awe, shame, longing |
| `life_situations` | `scripts/vocab-situations.md` (NEW) | feeling-like-a-hypocrite, spiritual-dryness, betrayed-by-family |

`life_situations` is the bridge to the situation lens — the dominant engagement mode.
Seed its vocabulary by mining the 276 existing articles first (Job 3), so the
controlled list reflects real reader language, not invented categories.

### 2b. Graph edges (appended to `scripts/meaning-layer/edges.jsonl`)
One JSON object per edge:
```json
{
  "from": "12:18",
  "to":   "yusuf-patience",
  "type": "EXEMPLIFIES",
  "basis": "tadabbur §3: 'sabrun jamilun — patience without complaint'",
  "confidence": "high",
  "source_file": "content/tadabbur/012-yusuf/ayahs-016-018.md"
}
```
Edge types (directed unless noted):
- `ECHOES` (ayah↔ayah, symmetric) — cross-surah munāsabāt resonance
- `EXEMPLIFIES` (ayah→concept)
- `CONTRASTS_WITH` (concept↔concept or ayah↔ayah, symmetric)
- `ANSWERS` (ayah→life_situation)
- `PART_OF` (ayah→story_grouping / narrative arc)

**Every edge MUST carry a non-empty `basis`** quoting or citing this file's tadabbur or
its paired tafsir report. Edges without basis are dropped at write time.

### 2c. Node summary (appended to `scripts/meaning-layer/nodes.jsonl`)
```json
{
  "ref": "2:255",
  "title": "Ayat al-Kursi",
  "surah_context": "Madani; the throne verse inside the longest surah",
  "answers": "What is God's relationship to creation and knowledge?",
  "one_line": "A portrait of divine sovereignty — life, knowledge, and sustaining power that never tires.",
  "source_file": "content/tadabbur/002-al-baqarah/ayah-255.md"
}
```

---

## 3. Validation gate (runs after each file; blocks bad writes)

1. **Controlled-vocab check** — any axis value not in its vocab file → not written,
   logged to `vocab-candidates.json`.
2. **Basis required** — edge with empty/whitespace `basis` → dropped + logged.
3. **Edge target exists** — `ECHOES`/`CONTRASTS_WITH` target ayah must exist in corpus;
   dangling targets → logged, not written.
4. **Theological-contrast flag** — any `CONTRASTS_WITH` between theological concepts is
   written with `"needs_review": true` for tier-validation (per content-validation-policy).
5. **Normalization** — canonicalize entity spellings (firawn≠pharaoh, musa≠moses) against
   the character vocab before write.

Audit script `scripts/meaning-layer/audit.py` (post-run): reports orphan edges,
nodes with zero edges, concepts with <2 ayahs, and a confidence histogram.

---

## 4. The 20-file dry run (mandatory before full run)

Pick 20 files spanning the corpus's range — this is the whole decision point:

- 4× Makki narrative (a Musa passage, a Yusuf passage, Kahf, Nuh)
- 4× Madani legal/social (2:282 testimony, 4:34, 2:233, a riba ayah)
- 3× contested verse (9:5, 2:191, 5:32)
- 3× dense theological (2:255, 112 ikhlas, 24:35 nur)
- 3× short Makki surah (93, 94, 103)
- 3× emotional/du'a (Yunus in the fish, 94 sharh, 2:286)

Run: `python3 scripts/extraction-pass.py --sample-set dry-run-20`
**Eyeball check (you, not the script):**
- Are the `ECHOES` edges *real* munāsabāt, or forced/manufactured connections?
- Are `life_situations` tags ones a real person would actually type?
- Is the basis citation always genuinely present in the file?
- Any vocab candidates that reveal a missing controlled term?

If edges feel forced on the 20 → fix the extraction prompt (tighten the munāsabāt
definition, raise the confidence bar) and re-run the 20. Only commit to the full
corpus when the 20 read as trustworthy. **This dry run is cheaper than a corrupted graph.**

---

## 5. Run mechanics

- **Resume-safe:** `scripts/meaning-layer/state.json` records done files; safe to interrupt.
- **Model:** Sonnet for extraction (structured, bounded task). Spot-check a sample with Opus.
- **Scale:** ~2,866 files × 1 call. Batch overnight like the tadabbur pipeline.
- **Outputs are inspectable** (frontmatter + JSONL in repo) — matches the filesystem-first,
  no-black-box philosophy. No embeddings, no vector DB.

---

## 6. What this unlocks (downstream, not part of Job 1)

- **PageIndex spine:** assemble `nodes.jsonl` + surah hierarchy → reasoning-retrieval tree.
- **Knowledge graph:** load `edges.jsonl` → constellation queries ("3 resonant-but-distinct
  ayahs for this situation").
- **Lenses:** concept / character / story / situation indexes are GROUP BY over the tags.
- **Voice companion:** retrieval = walk the spine to the node, pull its edges for the
  constellation. Still depth-first on one ayah; the graph just makes the "and also consider…"
  suggestions principled instead of vibes.
