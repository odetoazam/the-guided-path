# Interpretive-read pass — handoff (state as of 2026-07-31)

Read this before doing anything. It is the resume point.

**Read `docs/NORTH-STAR.md` FIRST, before any priority list in memory.** A
session on 2026-07-31 built and shipped ayah pages to the public web against
decision 4 by following a stale backlog entry. Walked back the same session.
When a priority list conflicts with NORTH-STAR, NORTH-STAR wins.

---

## What this pass is

The last validation gate for tadabbur files whose mechanical validators already
pass. The 2026-07-27 lockdown found false theses surviving every validator; this
catches those, plus unflagged ikhtilaf, bad attributions, and adab gaps.

**System:** `RUBRIC.md` (5 checks + a normalization warning) · `AGENT-BRIEF.md`
(agents write verdict JSON to disk, return one line — keeps the orchestrator's
context free) · `apply_interpretive_reads.py` (PASS → `validated: true` + stamp;
FLAG → `REVIEW-QUEUE.md`; everything appended to `audit-log.jsonl`).

**Loop:** read → flag → fix → **verify the fix** → flip. The verify step is not
optional: it caught an overclaim introduced by a repair ("all four commentaries"
where al-Muyassar names no occasion). A fix is not self-certifying.

## Numbers

- 62 files read · 30 PASS on first read · 32 FLAG
- 14 of the 32 now have their ikhtilaf section written; **18 still need work**
- 7 repaired files verified and activated
- Graph: `v=1 2179 · v=0 801 · v=-1 28` · validated-only edges **7505**
  (7355 when the pass began)
- 145 auto-verified files never read at all

## Immediate queue

1. **Re-verify `009-at-tawbah/ayahs-038-039.md`.** Its section was corrected
   after the verify pass flagged my overclaim; it is the one repaired file still
   `validated: false`.
2. **Verify the 6 newest sections** (6:55-58, 7:28-30, 13:12-13, 12:109-111,
   7:26-27, 6:105-108) — written but never checked.
3. **Write sections for the 18 below.**
4. **145 unread auto-verified files.** Brief each group with the known risk for
   its verses — that is what caught the two worst files.

## The 18 still needing work

Most need an ikhtilaf section. Four do not — they are listed separately.

```
006-al-anam/ayahs-042-045      010-yunus/ayahs-054-056     017-al-isra/ayahs-001-008
006-al-anam/ayahs-080-083      011-hud/ayah-044            017-al-isra/ayahs-026-030
007-al-araf/ayahs-023-025      012-yusuf/ayahs-023-029     026-ash-shuara/ayahs-184-190
008-al-anfal/ayahs-011-014     015-al-hijr/ayahs-090-093   031-luqman/ayahs-014-015
010-yunus/ayahs-037-040        017-al-isra/ayah-096        040-ghafir/ayahs-069-072
```

**Not a paragraph — these need something else:**

- **`041-fussilat/ayah-053.md` — REGENERATE.** The only UNGROUNDED thesis in 62
  files. Reads 41:53 as a prophecy of scientific discovery; all four editions
  gloss the pronoun in *annahu'l-ḥaqq* as **the Qur'an**, and it inverts
  *awa-lam yakfi*. Also claims fingers-in-ears is "literally described in this
  surah" — Fussilat has أذان only at 41:5 and 41:44. Thesis is the defect, so a
  section cannot fix it. Needs `/quranic-tadabbur`. **Azam's go required.**
- **`086-at-tariq/ayahs-001-010.md` — probably REGENERATE.** Reads
  *min bayni'l-ṣulbi wa'l-tarāʾib* as ONE body; all four read TWO (al-Jalalayn
  assigns *al-ṣulb* to the man, *al-tarāʾib* to the woman). Plus the *ḥāfiẓ* of
  86:4 called "Allah Himself" where all four say an **angel**. **Azam's go.**
- **`007-al-araf/ayahs-023-025.md` — DELETION.** Imports a serpent into the Adam
  narrative. There is no serpent anywhere in the Qur'an's account.
- **`067-al-mulk/ayahs-001-005.md` and `031-luqman/ayahs-014-015.md` —
  CORRECTIONS, not additions.** Unhedged *iʿjāz ʿilmī*; a Form V verb labelled
  Form VI; an Ibn Kathir attribution the edition does not carry; a Prophetic
  narration with no collection or grading; "thirty-three months minimum"
  contradicted by 46:15's thirty; *tamkīn* misused **and baked into the
  frontmatter tags**, which is how tags reach the graph.
- **`006-al-anam/ayahs-080-083.md`** also has a markup bug: an unclosed quotation
  mark puts 6:82-83 inside Ibrahim's own speech.

## Traps that cost real time — do not rediscover these

- **Normalization is the recurring failure, and it makes CORRECT things look
  wrong.** Three near-misses: waqf marks leaving double spaces; alif-wasla
  defeating a match; and a maddah that, stripped, made a TRUE published claim
  ("worship none but Him" in exactly 12:40 and 17:23) return zero hits. **Never
  flag a count-claim false until the re-check survives proper normalization.**
- **`verify_morphology`** wants the flat corpus **segment** index (compute from
  `scripts/.corpus-cache/quranic-corpus.json`) and roots in **Arabic script** —
  `root=دبر`, not `root=dbr`.
- **`verify_arabic` reads the BODY only**, never the frontmatter `arabic:` field.
  `check_frontmatter_arabic.py` covers that gap and is deliberately narrow: ~300
  files differ in mushaf NOTATION and none are errors, so it filters to
  fatha/damma/kasra on the same letter. Corpus is currently clean.
- **A failed tafsir fetch is unknown, never confirmation.** al-Jalalayn's entry
  for 106:1 failed during this pass; nothing was attributed to him.
- The negation budget in the skill uses a narrower token list than a plain
  regex — every published article scores 12.9–30.5 on a broad one. Calibrate
  against published articles, not the raw number.

## Also open

- `SCRIPT-CORRUPTION-QUEUE.md` — 16 of 18 repaired; 2 left because supplying the
  wording would be authorship (`وصفed` in 4:40; a sukun inside a romanized form
  at 55:53). Needs Azam.
- `PUBLIC-CONTENT-NOTES.md` — the 9:5 article fix is DONE and live.
- **Tag-vocabulary check before any bulk validation flip** — `tamkin-repetition`
  showed a wrong technical term rides into the graph on frontmatter. The `v==1`
  filter currently keeps it away from readers.
- The 350-elite edge promotion queue is untouched.
