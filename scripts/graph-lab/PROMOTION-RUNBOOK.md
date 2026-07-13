# Fable Runbook — Motif-Level Munāsabāt Promotion

*Drop this whole file into a fresh **Fable 5** Claude Code session on `the-guided-path`. It is self-contained, resumable, and never mutates sacred content. Estimated: DF≤6 tier = 517 motifs / 26 chunks — one long autonomous session.*

---

## Mission

The corpus has a hand-authored munāsabāt graph. A mechanical discovery pass found tens of thousands of *unauthored* cross-surah connections — pairs of passages sharing a rare Arabic root. Most are real classical munāsabāt nobody had entered; some are coincidence. Your job is to **review them at the motif level and confirm the real ones into the graph, with provenance.**

**Why motif-level, not pairwise:** a rare root shared by *n* passages spawns C(n,2) pairs. Reviewing pairs asks the same question dozens of times. Instead you review **one root-motif at a time**: "is this rare root a genuine cross-surah thematic/structural motif, and which passages truly participate?" One judgment confirms a hub-and-spoke of edges.

**Why Fable:** this is a long, autonomous, investigate-then-verify loop over hundreds of units. Sustain the session; verify each call against the passages; don't rush.

---

## The reputational rule (non-negotiable)

A confirmed edge is a **claim that two passages are meaningfully connected**, shown (eventually) to readers. A wrong CONFIRM is a false claim on sacred content. So:

- **Default to REJECT when unsure.** A missed real motif costs nothing (it stays a proposal); a false CONFIRM burns trust. Asymmetric — act on it.
- **The shared root is a FACT; the resonance is a CLAIM you must earn.** Two passages sharing rare root X is given. Whether X marks a *real* munāsabāt (retelling, twin ruling, deliberate echo, shared motif) vs. two unrelated uses of the same word is your judgment — and you must be able to state the basis in one sentence.
- **You never write to `content/`.** No frontmatter edits, no tadabbur changes. You only append to two lab ledgers (below). The graph is rebuilt from those mechanically.
- **You are not validating the tadabbur.** Whether the passages themselves are validated is a separate track (the `v` flag is shown for context only). You are judging the *connection*.

---

## Setup (run once at session start)

```bash
# 1. Make sure the substrate is fresh (must print "fresh:")
npm run graph:check || npm run graph

# 2. Generate the motif review chunks for the DF≤6 tier (highest signal first)
python3 scripts/graph-lab/build_motif_chunks.py --df 6 --chunk 20
#    -> writes motif-chunks.json (structured) + motif-chunks.md (readable)
#    On resume it AUTO-SKIPS roots already in motifs-reviewed.json.
```

Read `scripts/graph-lab/motif-chunks.json`. Each motif looks like:

```json
{ "root": "دول", "df": 2, "n_nodes": 2, "n_surahs": 2, "n_validated": 2,
  "already_linked": [],
  "nodes": [
    {"ref":"3:137-141","surah":"aal-imran","title":"…","v":1},
    {"ref":"59:7","surah":"al-hashr","title":"…","v":1} ] }
```

---

## Per-motif review protocol

For each motif, in order:

1. **Read the actual passages.** For each node `ref`, open its file under `content/tadabbur/<NNN-surah>/…md` and read the Arabic + translation + the relevant part of the tadabbur. Confirm the root actually carries meaning in each (not an incidental particle).
2. **Judge the motif.** Ask: does this rare root mark a genuine cross-surah connection? Name the type:
   - `retelling` — same event told in two places (e.g. the ḥiṭṭah episode)
   - `twin-ruling` — the same legislation stated twice (e.g. wudū/tayammum)
   - `shared-scene` — same figures/scene (e.g. Isa in the cradle and as kahl)
   - `shared-epithet` — same rare descriptor applied deliberately (e.g. awwāh of Ibrāhīm)
   - `deliberate-echo` — a phrase/image echoed for effect across surahs
   - `thematic-parallel` — same motif/theme carried by the shared root
   - → if none fit and it's just two unrelated uses of the word: **REJECT the motif.**
3. **If CONFIRM:** pick the **exemplar** — the passage that is the thematic center (usually the most developed / most cross-referenced / the one others echo). Then list which of the other passages *genuinely* participate (some may not — a 5-passage motif can have 3 real participants + 2 coincidental). You will emit an edge **exemplar ↔ each real participant**.
4. **Handle same-surah near-duplicates** (flagged in `already_linked`, e.g. `78:21-26` and `78:23`): treat overlapping same-surah nodes as one; don't emit an edge between them.

---

## Output contract (the only two files you write)

**A. Confirmed edges → append to `scripts/graph-lab/edges-promoted.json`** (the `edges` array). One object per exemplar↔participant edge, EXACT shape (this is what `type_edges.py` reads):

```json
{ "src": "3:137-141", "tgt": "59:7", "verdict": "CONFIRM",
  "connection_type": "thematic-parallel",
  "note": "د(dawla): 3:140 'those days We alternate among people' ↔ 59:7 spoils must circulate, 'so wealth does not become a dawla among your rich' — the same root theologizing the rotation of fortune/wealth so it never concentrates." }
```

- `src` = exemplar, `tgt` = participant (both must be `ref`s exactly as given).
- `note` = the one-sentence basis. Must quote or point to the concrete shared material. This IS the provenance — write it so a skeptic reading only the note is convinced.
- Do NOT emit REJECT rows for individual pairs; motif-level rejection is handled in file B.

**B. Every reviewed root → append to `scripts/graph-lab/motifs-reviewed.json`** (create if absent). This drives resume + stops re-proposal:

```json
{ "roots": ["دول", "محق", "…"], "rejected": ["someRoot", "…"] }
```

- Add EVERY root you review to `roots` (confirmed or rejected) — this is the resume ledger.
- Also add rejected-motif roots to `rejected` (audit trail).

**Write incrementally** — after each chunk, not at the end. If the session dies, everything up to the last chunk is saved and `build_motif_chunks.py` resumes cleanly.

---

## Resume protocol

If the session is interrupted:
1. Start a new Fable session, paste this runbook.
2. Re-run `python3 scripts/graph-lab/build_motif_chunks.py --df 6 --chunk 20` — it reads `motifs-reviewed.json` and regenerates chunks with the done roots removed.
3. Continue from chunk 1 of the new (shorter) file.

---

## Finalize (end of session)

```bash
# Rebuild the graph so confirmed edges enter as provenance-carrying overlay edges
npm run graph
# Confirm the new promoted edges landed (count should have grown)
python3 -c "import json;d=json.load(open('scripts/graph-lab/edges-typed.json'));print('promotion-review overlay edges:',d['meta']['promoted_overlay_edges'])"
```

Report: motifs reviewed, confirmed vs rejected, edges added, and any motif you were genuinely unsure about (list them — those are for Azam, not for you to force a call on).

---

## Scope note

- **Run 1 = DF≤6** (517 motifs) — highest signal, do this first.
- **Run 2 = DF 7–10** (`--df 10` regenerates all; done roots skip, so it only adds the 7–10 band): ~126 more motifs.
- Do **not** go below DF≤10 in this campaign — beyond that the root is common enough that co-occurrence stops being evidence, and the false-CONFIRM risk rises. That tier waits for a different method (phrase-level, not root-level).
