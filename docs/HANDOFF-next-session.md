# Handoff — overnight tadabbur-quality run, 2026-08-08

Azam is asleep. Standing instruction, in his words: *"the goal is to have tadabbur
files as good as possible… I do not have judgments or decisions to make. I want the
right decisions made in the right order."* So: **make the calls yourself, do not
queue questions for him, keep going.**

## Read these first (in order)

1. `docs/refutation-pass-2026-08-07.md` — the defect inventory. 57 of 106 ledger
   claims failed on the 12 worst files. This is the worklist.
2. `docs/quranic-tadabbur-SKILL.md` — especially **REPAIRING AN ALREADY-VALIDATED
   FILE** and **THE REFUTATION PASS**. Follow them literally.
3. `scripts/article-backlog.md`, newest entries at the bottom — what each repair
   session actually did and found.

## Hard rules (these override convenience)

- **Never** generate or repair Quranic content without invoking the
  `/quranic-tadabbur` skill via the Skill tool first. Not from memory, not inline.
- Run **all four** validators on the whole file after any edit: `verify_arabic.mjs`,
  `verify_morphology.mjs`, `cross_reference_tafsir.mjs`, `verify_claims.mjs`.
- Then run the **Refutation Pass on your own new prose**. Repairs are the leading
  source of fresh defects — a repair that fixed a real error still introduced two
  new "all three" overclaims in its connecting sentences, and all four validators
  passed it clean.
- **Sweep the whole file, not the cited line.** Every one of the last four repairs
  found more sites than the report listed. Twins hide in the Hook, section
  headings, the Bridge, the Closing Synthesis, and frontmatter `passage_context` —
  they restate the claim in *different words*, so grep alone misses them.
- **Never global-replace a number.** Correct instances sit beside wrong ones (in
  Luqman, a correct "three times" was two lines from a wrong one).

## State as of 00:45 PDT

**Done and committed** (branch `claude/semantic-graph-architecture`, ~11 commits):
- `verify_claims.mjs` — validator #4. Counts/absences/uniqueness against the corpus,
  three ways (root/lemma/surface). Now also has a **span-scope** detector ("the whole
  verse is built on…" — a correct count with a false scope, which is how one shipped)
  and a **word-count convention** check (orthographic words vs morphological
  segments; both observed errors landed *between* the two conventions).
- Refutation Pass + repair protocol written into both analysis skills.
- 13 drifted `ayah_records` republished; drift audit reports 0.
- Repairs landed: raghadan 2:58, awjasa 51:28, 58:7 al-Mujadila, and six wrong
  counts (20:55, 27:1, 31:33, 2:62, 35:13).
- **an-Nur 24:48-50 rebuilt** — the *bal* cancels only the third diagnosis, not all
  three. Validators pass, refutation run, logged.

**Immediately next — in this order:**

1. **al-Waqiah 56:75-82** (`content/tadabbur/056-al-waqiah/ayahs-075-082.md`).
   Two borrowed-authority defects:
   - L284: "All three readings were held by classical mufassirūn" — the third
     (*kitāb maknūn* = hearts of the believers) has **zero** support in
     `tafsir-report-075-082.md` (0 hits for قلوب/قلب/صدور). It also invents an
     *ikhtilāf* al-Ṭabarī does not record, and omits al-Jalālayn's actual referent
     (the *muṣḥaf*). Own it as an extension or cut it; restore al-Jalālayn.
   - L202/L208: "the third reading… is the one the classical scholars found the
     deepest" — all four sources settle on the **astronomical** reading, and
     al-Ṭabarī argues against the *tanjīm* reading on morphological grounds. The
     "Quran swearing by the Quran" movement at L210-216 rests on this and needs
     reworking, not a hedge. A fourth *qawl* (*manāzil al-nujūm*) is silently dropped.
2. **Push the branch** (`git push`). It is ~117 commits ahead of origin. Nothing has
   been pushed tonight.
3. **Extend the Refutation Pass** to the next tranche of high-ledger files. Use
   `scripts/verify_claims.mjs` across `content/tadabbur/*/*.md`, rank by ledger
   count, and run the same workflow shape as before: one agent per file, Opus at
   xhigh effort, diagnostic only (agents must NOT edit files), then repair the
   confirmed findings yourself. ~1,070 files still carry ledger items.

## Known-good tooling

- `node scripts/verify_claims.mjs <file>` — add `--surah N --ayahs A-B` off-corpus.
- `node scripts/audit-ayah-record-drift.mjs` — live rows vs repo. Currently clean.
- `node scripts/audit-visual-renderers.mjs` — surah_visual_data integrity.
- `node scripts/republish-ayah-records.mjs --write <file>` — dry-run default, backs
  up to `scripts/.backups/` first. Use after repairing a file that has a live row.

## Traps that have already cost time

- `ayah_records.layer_a` / `layer_b` are **JSON objects**, not strings
  (`{grounding_table, linguistic_html}` / `{reflection_html}`). Reading them as
  strings yields `"[object Object]"` and a **vacuous all-clear**.
- Unfiltered `.select()` hits the **PostgREST 1000-row cap** and rows read as absent.
- Rows span ranges: match `ayah_start <= n <= ayah_end`.
- Morphology tag `W` is the **flat segment index**, not the orthographic word count.
- RTK rewrites `grep`; `grep -v pat f > tmp && mv tmp f` **destroys the file**. Use Edit.
- `scripts/tadabbur-output/` is dead. `content/tadabbur/` is the authority.
