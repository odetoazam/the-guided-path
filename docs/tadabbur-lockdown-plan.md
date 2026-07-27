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
