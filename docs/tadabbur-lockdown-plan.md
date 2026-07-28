# Tadabbur Lockdown — Status & Plan

**Started:** 2026-07-24. Goal: every file in `content/tadabbur/` provably correct, not just present.

## Where the corpus actually stands

Ayah coverage is genuinely complete — **6,236 / 6,236 ayahs, all 114 surahs**, across 3,029 tadabbur
files (plus 1,363 `tafsir-report-*.md` sidecars). But coverage counts files existing, not work finished.

| Dimension | State |
|---|---|
| Ayah coverage | ✅ 100% |
| Frontmatter integrity | ✅ fixed (95 files repaired 2026-07-24) |
| `validated: true` | ⚠️ 874 files unflagged (29%) |
| Arabic verified | 🔄 running |
| Morphology verified | 🔄 running |
| Tafsir cross-reference | ❌ not started at scale |
| Voice check | ❌ cannot be automated — see below |
| Damaged files | ❌ 12 need regeneration (see `damaged-tadabbur-register.md`) |

## Unvalidated files by generator era

| Generator | Files | `validated:false` | % |
|---|---|---|---|
| `opus-tadabbur-auto` | 1,584 | **583** | 36.8% |
| `codex-tadabbur` (+v2) | 542 | 242 | 44.6% |
| `fable-tadabbur-auto` | 664 | **3** | **0.5%** |
| `quranic-tadabbur skill` | 104 | 3 | 2.9% |
| (missing) | 135 | 49 | 36.3% |

The headline surprise: this is **not primarily a Codex problem**. `opus-tadabbur-auto` accounts for the
largest block of unvalidated files. Codex is structurally sound (541/542 have the themes section,
535/542 have tafsir sidecars); its real weaknesses are 242 unflagged files and 98 thin ones
(5–8 KB against a 26 KB corpus median) — shallow, not broken.

Fable-era files are the cleanest in the corpus by a wide margin. Caveat before reading that as
"Fable is the better model": it more likely reflects **when the pipeline gained validation gates**
than raw model capability. Treat it as evidence about process, not about models.

## Model recommendation

- **Validation burn-down** — no model. The three validators are scripts.
- **Regenerating the 12 damaged files** — **Fable**, via `/quranic-tadabbur`. Cheaper and faster, and
  the fable-era output in this corpus is the cleanest on every mechanical measure.
- **Adversarial review** of contested / aḥkām-bearing passages, and the voice check — **Opus**.

## The gate that cannot be automated

`content-validation-policy.md` Tier 1 requires **all three** validators *plus* a voice check
(hub-article-pipeline Step 3b), and states plainly:

> Failures block publishing — failed entries are written to a review queue, not pushed live.
> A human must clear the review queue before failed entries go live. **Automated systems cannot
> self-approve.**

So a mechanical pass is necessary but **not sufficient** to set `validated: true`. Two consequences:

1. Files passing all three validators get `validators_passed: <date>` recorded as mechanical evidence.
2. `validated: true` is only set where a voice check has actually happened. Flipping 874 flags purely
   on script output would violate the project's own written policy — and would recreate exactly the
   "instructions are not enforcement" failure from the June 29 enricher incident.

## Note on the first Arabic run

The initial sweep used `verify_arabic.mjs <file>` — but Tier 1 policy specifies `--scan`, which
additionally detects **untagged** Arabic (text that is never checked because it carries no ayah tag).
A `--scan` re-run is required before any file is considered Arabic-clean.

## Sequence

1. ✅ Frontmatter repair — 95 files, insert-only, verified no deletions.
2. ✅ Damaged-file register — 12 files quarantined, deliberately *not* auto-completed.
3. 🔄 `verify_arabic` + `verify_morphology` across all 874 unvalidated files.
4. ⬜ Re-run Arabic with `--scan` (policy requirement).
5. ⬜ Triage genuine failures into a review queue for Azam.
6. ⬜ Tafsir cross-reference for files lacking both a sidecar report and inline citations.
7. ⬜ Regenerate the 12 damaged files via the skill (Fable) + all 3 validators.
8. ⬜ Voice check — the human/model gate. Not automatable.

## Recurring-damage guard

`085-al-buruj/ayahs-001-009.md` was found **front-truncated** (no Introduction, no Part 1) only by a
scan for files whose *first heading is PART 2 / CLOSING*. Size and section-presence checks both miss
this. That scan should run as a post-batch gate on every enrichment run:

```
files whose first body heading matches /PART 2|THEMATIC DEPTHS|CLOSING|Theme (One|Two)/
```

---

# Session close — 2026-07-24

## Final state

| Check | Result |
|---|---|
| Ayah coverage | 6,236 / 6,236 (100%) |
| Quran text — all 3,029 files, `--scan` | **0 failures.** Every tagged verse authentic |
| Quran text — byte-exact vs Uthmani reference | **~1,557 verses normalized**; corpus now canonical |
| Morphology — `verify_morphology`, whole corpus | **0 failures** |
| Morphology root tags | 20,808 checked, **0 wrong** |
| Leeds prose-claim checker | 338 reported → **6 real, all fixed** |
| Frontmatter integrity | 95 repaired; 7 files had content trapped in YAML — freed |
| Damaged files | 12 opened → 9 genuinely damaged, **all 9 rebuilt**; 3 were merely thin |
| Semantic graph | rebuilt, **fresh** against corpus `bfb6eb611d26feee` |

## Real content errors found and fixed this session (6)

1. `071-nuh/ayahs-026-028.md` — *tabār* attributed to root b-w-r; it is **t-b-r**.
2. `001-al-fatiha/ayah-001.md` — morphology tags in Latin transliteration, invisible to validators.
3. `002-al-baqarah/ayahs-120-121.md` — 4 hamza/weak-root spellings + all 21 word positions.
4. `043-az-zukhruf/ayah-044.md` — root of *dhikr* written **د-ك-ر**; it is **ذ-ك-ر**.
5. `033-al-ahzab/ayah-032.md` — the *word* م-ع-ر-و-ف called a "root"; the root is **ع-ر-ف**.
6. `075-al-qiyamah/ayah-002.md` — a range correction I made, then reverted after checking the tags.

## Duplicate coverage resolved

The graph's invariant check flagged 49 ayahs claimed by more than one node. Nine were **exact
duplicates in Surah At-Tawbah** — the same ayah written twice, once by the older Codex era
(`ayahs-NNN.md`, `validated: false`, no enrichment) and once by the newer Opus era (`ayah-NNN.md`,
`validated: true`, enriched June 2026). The Codex versions were archived to
`009-at-tawbah/_superseded/` using the convention already present in `003-aal-imran/`. Nothing was
deleted; `git mv` back restores any of them.

Warning count is now 40. **Those 40 are a different, probably intentional pattern** — a single-ayah
deep dive overlapping a passage-level reflection (e.g. `2:269` inside `2:267-274`). They are not
duplicates, but they do leave graph edge-attachment glob-order-dependent.

**Open question for Azam:** when a single-ayah node and a passage node both claim an ayah, which
should own the edge — the narrower node, the newer one, or both? That is a graph-semantics decision,
not a content fix, so it was left alone.

## Still open (deliberately)

- **874 files remain `validated: false`.** Every mechanical check passes; the voice check is the human
  gate and policy is explicit that automated systems cannot self-approve. **This flip is Azam's call.**
- **+1,322 promotable graph edges** built and waiting on approval since July.
- **~527 files still shallow** — the enrichment pipeline's backlog (39 of 566 done).
- **The Leeds checker needs repair** before it can gate anything: negation-blindness,
  root-resolution failure, qirāʾāt-blindness, cross-surah-blindness.

---

# Session 2026-07-27 — the semantic-review log is invalid, and why

## Root cause, found and fixed

`scripts/semantic-review-log.json` holds 1,990 entries from a run on 2026-05-14→28:
**1,124 CRITICAL, 475 MODERATE, 24 PASS.** A corpus where 56% of files are critically
defective was never plausible. The cause is a one-line bug in `semantic-review.py`:

```python
candidate = TAFSIR_DIR / f"tafsir-{stem}.md"     # TAFSIR_DIR = scripts/tadabbur-output/
```

`scripts/tadabbur-output/` is a **flat namespace with no surah component**. A file's stem
is `ayah-005`, so `content/tadabbur/021-al-anbiya/ayah-005.md` resolved to
`tafsir-ayah-005.md` — **and so did every other surah's ayah 5.** Every single-ayah file
in the corpus was reviewed against commentary on a different surah. The reviewer dutifully
reported that the reflection contradicted the tafsir, because it did: it was the wrong tafsir.

Fixed to resolve the sidecar beside the file, `content/tadabbur/<surah>/tafsir-report-<range>.md`.
**Fixing the function does not rehabilitate the log** — those entries were produced under the
bug. The log must not be used as a defect list, and nothing should be prioritised from it.

## Blast radius in the corpus itself

The broken run also **wrote its verdict into frontmatter**. 618 files currently carry a
`semantic_review: "agent-2026-05-NN-<verdict>"` tag from it — **528 of them `-critical`**.
That is bogus metadata sitting in the content, not just in a log.

## Two scripts must never be run as-is

Both `semantic-review.py` and `semantic-enrich.py` shell out to the `claude` CLI, which
bills a different account and is banned here. Both now carry a ⛔ banner. They are kept for
their prompts and (in the enricher's case) its content-verified tafsir index, which does
**not** have the pairing bug. The live path is in-session agents.

## Corpus state re-measured against correct pairing

| Measure | Value |
|---|---|
| Tadabbur files (excl. `_superseded`) | 3,016 |
| Median body size | 26,962 B |
| Files with a correctly-paired tafsir report | 1,368 |
| Shallow (<20 KB body) | 541 — the "~527" figure |
| Shallow **and** not yet enriched **and** has a real report | **294** ← enrichment queue |
| Shallow, unenriched, but no usable report | 14 (cannot be enriched from sources) |
| Deep files carrying a bogus CRITICAL/MODERATE | **824** ← review queue |

Queues written to `scripts/enrich-queue-v2.json` and `scripts/review-queue-v2.json`.

## Canonical-verse normalizer is now a durable script

`scripts/normalize_canonical_verses.mjs` replaces last session's one-off. Safety invariant:
a verse is rewritten **only** when it already matches canonical after folding
diacritics/hamza/alif variants — so drift is repaired while letter-level differences
(dropped words, elisions, fabricated quotations) are **reported, not overwritten**. Silently
"fixing" those would destroy the evidence for the two defect classes no validator catches.

Frontmatter `arabic:` normalization is **opt-in** (`--frontmatter`), deliberately: ~1,059
files write that field in modern **imlāʾī** orthography (`إِسْرَائِيلَ`) rather than Uthmani
(`إِسْرَٰٓءِيلَ`). That is a corpus convention, not drift; converting it is an orthography
migration and a separate decision. Body `[ayah:]` lines — the surface that actually drifts,
and the one `verify_arabic` gates on — run **0 changes across all 3,029 files**, confirming
both that last session's normalization held and that this tool has no false positives.

## ⚠ THE BIG ONE — "0 failures" mostly means "nothing was examined"

The 2026-07-24 close reports *Quran text — all 3,029 files `--scan`: **0 failures*** and
*Morphology whole corpus: **0 failures***. Both are true. Neither means what it looks like.

A file is only checked by `verify_arabic` if it carries an `[ayah:S:A]` tag, and only by
`verify_morphology` if it carries a `<!-- morphology:... -->` tag. Measured 2026-07-27:

| | Files | % of corpus |
|---|---|---|
| No `[ayah:S:A]` tag — `verify_arabic` has nothing to check | 2,270 | **75.3%** |
| No morphology tag — `verify_morphology` has nothing to check | 2,126 | **70.5%** |
| **Neither — both validators silent, file passes vacuously** | **2,120** | **70.3%** |

File list: `scripts/review-v2/validator-blind-files.txt`.

So the mechanical green light covers **under a third of the corpus**. The remaining 70%
is not "verified clean" — it is *unexamined*. This is the same shape as the June 29
enricher lesson: a passing check that was never actually looking. It also explains how
`085-al-buruj/ayahs-001-009.md` could sit at `validated: true` while missing its entire
front half, and how the two Quran-text defect classes (fabricated ayah, subject-dropping
elision) survived every automated pass.

**Consequence for the validated-flag decision:** flipping any file to `validated: true`
on the strength of "all validators pass" is, for ~70% of the corpus, flipping it on the
strength of no evidence at all. That makes the human voice-check gate more necessary,
not less. Do not treat validator-green as evidence for these files.

**The Arabic half is fixed.** `scripts/add_ayah_tags.mjs` tagged 2,760 verses across
1,845 files, taking `verify_arabic` coverage from **24.7% → 85.9%**, and immediately
exposed **2,692 verses in 1,829 files carrying drift nothing had ever checked** (all
normalized). 425 files remain untagged and 683 lines were near-misses — Arabic that
resembles a verse without matching it. Those are deliberately left for a human, because
"resembles" is exactly how the elision and fabrication defects would slip through.

### The morphology half has a cause, and it is a convention

Found via `021-al-anbiya/ayahs-053-054.md`, whose three false grammar claims
`verify_morphology` could never have caught:

| | Files |
|---|---|
| Using the `<!-- morphology pruned: ... -->` convention | 2,136 |
| Of those, with **zero** machine-checkable morphology tags | **2,123** (70%) |

The convention replaces per-word tags with a prose note — *"key roots documented in
classical lexicons (Lisān al-ʿArab, Mufradāt al-Rāghib); linguistic journey draws only
on lexically attested meanings."* That sentence is not checkable by anything. So the
morphology blind spot is **not missing work — it is a deliberate design choice** that
removed the machine guard from 70% of the corpus.

And the defects found on 2026-07-27 are precisely the class it hides: verb form
(Form VIII labelled Form X), pronoun number (`هَا` called feminine plural), and
governance (a required *lām al-taqwiya* sold as an elective stylistic choice). Every
grammar assertion in those 2,123 files is unguarded and always has been.
List: `scripts/review-v2/morphology-pruned-unguarded.txt`.

**This is the decision Azam has to make**, because un-pruning is a real cost and the
prose notes may have been a deliberate size/noise tradeoff: either restore per-word
tags in those files, or accept that grammar claims there are human-review-only forever
and stop treating a green `verify_morphology` as meaning anything about them.

## Review re-run — the ~94%-artifact assumption is WRONG

30 files re-reviewed against correct pairing (Opus, `scripts/review-v2/ALL-RESULTS.json`):

| New verdict | Count | | Old verdict | Count |
|---|---|---|---|---|
| CRITICAL | **7** | | CRITICAL | 22 |
| MODERATE | **12** | | MODERATE | 8 |
| MINOR | 5 | | | |
| PASS | **6** | | | |

**Artifact rate: 16/30 = 53%, not the assumed ~94%.** And only **6 of 30 came back
clean** — 20%. The old log was wrong in *both* directions. Three files were *escalated*
MODERATE → CRITICAL:

- `035-fatir/ayah-018.md` — printed root `ج-ز-ر` where the transliteration on the very
  same line says "wāw, zāy, rāʾ". **Fixed.**
- `076-al-insan/ayahs-008-010.md` — a whole section built on a non-existent grammatical
  construction.
- `002-al-baqarah/ayahs-261-266.md` — `ٱحْتَرَقَتْ` glossed as internal self-combustion
  when the ayah itself names the external agent (`إعصار فيه نار`).

**So the log can neither be trusted nor bulk-cleared.** Both shortcuts were on the table
at the start of this session; the sample killed both. The 824-file review queue has to be
worked file by file.

Real defects confirmed (all 7 CRITICALs listed in `ALL-RESULTS.json`):

- `002-al-baqarah/ayahs-146-148.md` — `فَٱسْتَبِقُوا۟` labelled Form X in frontmatter,
  body and the `VF:10` tag. It is Form VIII; Form X (`استسبق`) does not exist. The body
  hedge "Form VIII or X — there is scholarly discussion" invents a controversy. Plus
  al-Tabari listed as holding the Prophet-referent reading when his block in the report
  takes the other side.
- `030-ar-rum/ayah-045.md` — the whole second-half thesis ("divine non-engagement, not
  hatred… Allah does not say 'He punishes them'") is contradicted by its own report:
  al-Jalalayn glosses `أي يعاقبهم`, al-Muyassar `لسخطه وغضبه عليهم`.
- `076-al-insan/ayahs-008-010.md` — `يُطْعِمُونَ ٱلطَّعَامَ` called a cognate object
  (*mafʿūl muṭlaq*); it is a plain *mafʿūl bihi*, and a whole section rests on the
  non-existent construction. Plus an apparently invented al-Zamakhsharī position.
- `035-fatir/ayah-018.md` — wrong root. **Fixed.**

Sensitive-content check came back clean where it was most likely to fail: no evolutionary
over-reading on 29:20, no political framing on 76:8-10, and the *asīr*-as-POW reading
matches al-Muyassar.

## Graph rebuilt

`npm run graph` → fresh against corpus `894d68ed79fb6fd9`, 3,009 files, 3,008 nodes,
13,284 traversable edges, 118 themes, 37 situations, **0 unwritten ayahs**. The 40
multi-claim warnings are unchanged and are the known single-ayah-inside-passage pattern
(e.g. `2:269` inside `2:267-274`) — a graph-semantics question for Azam, not a defect.
