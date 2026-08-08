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

**Also done since (02:00 PDT):** al-Waqiah 56:75-82 repaired — three
borrowed-authority defects, including one the report never flagged that narrowed
*illā l-muṭahharūn* to angels alone when al-Ṭabarī rules it general ("everyone
purified from sins"). Branch **pushed** to origin; working tree clean.

## START HERE: five verified word-count defects

A full-corpus sweep with the new detectors leaves exactly **five** corpus-refuted
claims. Counts below are verified directly against the corpus cache — orthographic
words (distinct word indices) and morphological segments (array length):

| File | Line | Says | Words | Segments |
|---|---|---|---|---|
| `021-al-anbiya/ayah-070.md` | 40 | "this entire ayah is six words" | **5** | 12 |
| `023-al-muminun/ayah-090.md` | 71 | "This ayah is six words." | **5** | 12 |
| `024-an-nur/ayah-044.md` | 359 | "only twelve words" | **10** | 18 |
| `042-ash-shura/ayah-031.md` | 74 | "thirteen words in Arabic" | **14** | 20 |
| `050-qaf/ayah-014.md` | 373 | "eight words in Arabic" | **9** | 14 |

Note none of the stated numbers matches *either* convention, so each is a counting
error rather than a convention mismatch — except possibly 21:70 and 23:90, where
"six" is what you get if you count the leading *wa-*/*bal* as its own word. Decide
per file, **state the convention in the prose**, and check whether any argument
rests on the number (e.g. a symmetry or a "shortest verse" claim) before editing.
Then: whole-file sweep, all four validators, Refutation Pass on your own edits, log.

`content/tadabbur/027-an-naml/ayah-070.md` was flagged and is a FALSE POSITIVE —
"four words *longer than* its parallel" is a comparative, not a total. The regex
now excludes comparatives; do not "fix" that file.

**Then:**

1. **Extend the Refutation Pass** to the next tranche of high-ledger files. Use
   `scripts/verify_claims.mjs` across `content/tadabbur/*/*.md`, rank by ledger
   count, and run the same workflow shape as before: one agent per file, Opus at
   xhigh effort, diagnostic only (agents must NOT edit files), then repair the
   confirmed findings yourself. **2,436 files carry ledger items** (up from 1,070
   once the span-scope detector landed).

   The next tranche by ledger density, already ranked and excluding the 12 covered
   in the first pass:

   ```
   17  046-al-ahqaf/ayah-003.md          10  106-quraysh/ayah-001.md
   15  059-al-hashr/ayahs-011-012.md     10  069-al-haqqah/ayahs-013-017.md
   13  043-az-zukhruf/ayah-067.md        10  065-at-talaq/ayah-004.md
   12  092-al-layl/ayahs-005-010.md      10  034-saba/ayahs-051-053.md
   11  043-az-zukhruf/ayah-071.md        10  023-al-muminun/ayahs-109-111.md
                                         10  002-al-baqarah/ayahs-225-232.md
   ```

   Expect roughly half of what the pass flags to be real. In the first run, 57 of
   106 ledger items failed — but on the *sweep* side, four of the first five files
   flagged were bugs in the validator, not the content. Verify every finding
   against the corpus or the tafsir report before editing a single word.

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
