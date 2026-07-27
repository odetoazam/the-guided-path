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
