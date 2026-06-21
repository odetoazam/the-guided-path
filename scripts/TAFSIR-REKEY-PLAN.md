# Tafsir Re-Keying + Verified Matcher — Plan

**Status:** PLAN — ready to execute next session.
**Author:** /cofounder session 2026-06-20
**Why:** The `semantic-enrich.py` quality pipeline is stalled. It pairs tadabbur files to
tafsir reports by *filename* (`tafsir-{stem}.md`), but the 773 reports live in one flat
folder with **surah-blind names** — `tafsir-ayah-005.md` exists once but could belong to
any of ~50 surahs. 86% of filename pairings are ambiguous, so the `is_matched()` guard
(correctly) refuses to enrich and only ~7 files are eligible. The pipeline is failing
*safe* — refusing to enrich an ayah with the wrong surah's commentary — but it's stuck.

**The unlock:** every report is surah-blind in its filename but **self-identifying in its
content** — each carries `## {surah}:{ayah}` section headers (e.g. `tafsir-ayah-005.md`
opens with `## 105:5` → Surah Al-Fil). So we can build a *content-verified* index and
pair deterministically, with zero LLM guessing and zero wrong-surah risk.

---

## Goal

Convert a stalled, filename-trusting pipeline into a **content-verified** one:
1. Every tafsir report unambiguously keyed to its true `surah:ayah` range (from its headers).
2. Every tadabbur file paired to the correct report (or flagged as genuinely missing).
3. Human correctness check on 30 pairings before any enrichment runs.
4. The enrich backlog (~1,150 flagged files) becomes a real, safe, all-night run.

**Non-destructive:** build a sidecar index, do NOT rename the report files (reversible,
no risk to existing references). Renaming is an optional later cleanup.

---

## Phase 1 — Build the verified tafsir index (deterministic, no LLM)

Script: `scripts/build-tafsir-index.py`

For each `scripts/tadabbur-output/*.md`:
- Extract all `^## (\d+):(\d+)` headers.
- **Surah** = the surah number shared by all headers. If headers span >1 surah → flag
  `MULTI_SURAH` (data error, exclude). If no headers → flag `NO_HEADERS` (malformed).
- **Ayah range** = (min ayah, max ayah) across headers.

Emit `scripts/tafsir-index.json`:
```json
{
  "by_passage": { "26:176-180": "tafsir-ayahs-176-180.md", "105:5-5": "tafsir-ayah-005.md" },
  "by_ayah":    { "26:176": "tafsir-ayahs-176-180.md", "26:177": "...", "105:5": "..." },
  "flags":      { "MULTI_SURAH": [...], "NO_HEADERS": [...], "DUPLICATE_PASSAGE": [...] }
}
```
`by_ayah` lets any single ayah resolve to its covering report even when the report is a range.

**Report at end:** reports indexed cleanly / flagged multi-surah / malformed / duplicate
passages (two reports claiming the same surah:ayah).

---

## Phase 2 — Build the tadabbur→tafsir pairing (deterministic)

Script: `scripts/build-tadabbur-pairs.py`

For each `content/tadabbur/*/ayah*.md`:
- **Surah** = leading number of the parent dir (`018-al-kahf` → 18). *Do NOT trust the
  frontmatter `surah` field — it holds the NAME ("Al-Kahf"), which is the bug that also
  broke `is_matched()`.*
- **Ayah range** = parsed from filename (`ayahs-090-091` → 90–91; `ayah-025` → 25).
- Resolve via `tafsir-index.json["by_ayah"][f"{surah}:{ayah_start}"]`.

Bucket each file:
- `EXACT` — report range == file range
- `COVERED` — file ayahs ⊆ a report's range (acceptable)
- `MISSING` — no report covers this ayah (a true gap → needs tafsir generation later)

Emit `scripts/tadabbur-tafsir-pairs.json` + counts. **This finally tells us true tafsir
coverage of the corpus** (the number every prior estimate got wrong).

---

## Phase 3 — Correctness dry-run (30 pairings, human eyeball — MANDATORY)

Script: `scripts/verify-pairs.py --sample 30`

Sample 30 pairs spanning short/long surahs and passage/single-ayah files. For each, print:
```
TADABBUR  026-ash-shuara/ayahs-176-180.md   (surah 26, ayahs 176-180)
REPORT    tafsir-ayahs-176-180.md           (header ## 26:176 … 26:180)
          Ibn Kathir opening: "Shu`ayb and His Preaching to the Dwellers of Al-Aykah…"
MATCH?    surah ✓   ayah-range ✓
```
**Deliberately include former-ambiguous stems** (every surah's `ayah-005.md`) to prove the
content-keyed index now resolves each to the right surah. You confirm by eye that report
↔ ayah are genuinely the same passage. **No enrichment runs until this passes.**

---

## Phase 4 — Patch the enrich script (surgical)

In `scripts/semantic-enrich.py`:
- Replace `find_tafsir_report()` → look up `tafsir-index.json` by the file's
  dir-derived `surah:ayah_start`. No more filename guessing.
- Replace `is_matched()` → the index already guarantees identity; keep a cheap assertion
  that the resolved report's surah == the file's dir surah (belt-and-suspenders).
- Add `--strict` (default ON): refuse any file without an `EXACT`/`COVERED` verified pair —
  preserves the fail-safe behavior (never enrich with an unverified report).
- Keep everything else (the two-part fix+deepen prompt, resume-safe logging) untouched.

---

## Phase 5 — Re-run the real backlog (the actual all-night job)

```bash
cd /Users/azamkhan/the-guided-path && \
nohup sh -c 'python3 scripts/semantic-enrich.py --verdict CRITICAL --opus && \
             python3 scripts/semantic-enrich.py --verdict MODERATE' \
  > scripts/enrich-overnight.log 2>&1 &
```
Now the eligible pool is the full verified-paired set, not 7. Watch with
`python3 scripts/semantic-enrich.py --report`. When CRITICAL+MODERATE unfixed ≈ 0,
the gate to **Job 1 (meaning-layer extraction)** is clear.

---

## Safety guarantees (why this is correct for sacred content)

- **Deterministic indexing** — pairings come from parsing the report's own `## surah:ayah`
  headers, not from filename inference or LLM judgment. No hallucinated matches.
- **Surah identity is content-verified** on both sides (report header + tadabbur dir).
- **Human dry-run** on 30 pairings, weighted toward the previously-ambiguous cases.
- **`--strict` fail-safe retained** — an unverifiable file is skipped, never mis-enriched.

## Open data issues this will surface (handle as found)
- `MULTI_SURAH` / `NO_HEADERS` reports — malformed; regenerate or discard.
- `DUPLICATE_PASSAGE` — two reports for one passage; pick the richer, log the other.
- `MISSING` ayahs — genuine tafsir gaps. These, not enrichment runtime, are the real
  remaining coverage work. Quantify them in Phase 2 and decide whether to generate.
