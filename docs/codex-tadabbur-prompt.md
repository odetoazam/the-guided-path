# Codex Tadabbur Pipeline Prompt

Paste this into a new Codex session only when you want to force the full explicit workflow.

For normal use, repo-local instructions now live in:

- `/Users/azamkhan/the-guided-path/AGENTS.md`
- `/Users/azamkhan/the-guided-path/docs/tadabbur-session-protocol.md`

In a fresh chat inside this repo, the short prompt:

`keep doing quranic tadabbur`

should now be enough.

This file remains the long-form explicit prompt for fallback use.

---

## Your Task

Continue AyahGuide's Quranic tadabbur pipeline by working through:

`/Users/azamkhan/the-guided-path/scripts/pending-ayahs.txt`

For each queue item:

1. Check for duplicates or overlapping existing content
2. Decide whether the passage should be single-ayah or multi-ayah
3. Write the tadabbur directly to the final filesystem path
4. Run the frontmatter linter and the 3-validator loop
5. Save the tafsir cross-check report beside the content file
6. Add a session-log row to `scripts/article-backlog.md` immediately after each completed file or combined range
7. Leave `validated: false`
8. Remove the queue entry only after the file and report exist cleanly
9. Continue until context is nearly full

Do not insert into Supabase in this pipeline.

### One important skip rule

Before starting each passage, check `scripts/pending-ayahs-opus.txt`. Any passage listed there is reserved for Claude Code (Opus-level generation — dense theological passages, multi-ayah arcs, hub-critical ayahs). Skip it, remove it from your queue, and move on.

---

## Project Root

`/Users/azamkhan/the-guided-path`

---

## Step 0 — Read These First

Before writing anything, read:

- `/Users/azamkhan/.codex/skills/quranic-tadabbur/SKILL.md`
- `/Users/azamkhan/.codex/skills/quranic-tadabbur/references/authoring-guide.md`
- `/Users/azamkhan/the-guided-path/docs/codex-tadabbur-prompt.md`

Then check a few current-format examples from the repo itself, especially recent files in:

- `/Users/azamkhan/the-guided-path/content/tadabbur/003-aal-imran/`
- `/Users/azamkhan/the-guided-path/content/tadabbur/004-an-nisa/`

Prefer the latest cleaned files over older legacy files when conventions differ.

---

## Step 1 — Read the Top of the Queue

Read the first line of:

`/Users/azamkhan/the-guided-path/scripts/pending-ayahs.txt`

Queue format:

- `3:181|Aal-Imran|aal-imran`
- `4:17|An-Nisa|an-nisa`
- `3:196-197|Aal-Imran|aal-imran`

If the file is empty, stop.

---

## Step 2 — Duplicate and Overlap Check

Before generating anything, inspect the target surah folder:

`/Users/azamkhan/the-guided-path/content/tadabbur/{surah-folder}/`

Rules:

- Never overwrite an existing content file
- Never create a single-ayah file if that ayah is already covered by a better multi-ayah range file
- Never create a narrower range if a stronger overlapping range already exists
- If the exact target or a clearly superior overlapping file already exists, remove that queue entry and move on

This pipeline uses the filesystem as the required duplicate check.

Do not assume the queue is perfect. Verify against existing files every time.

---

## Step 3 — Decide Single Ayah vs Range

Do not blindly mirror the queue into one file per line if the passage is clearly indivisible.

Use a combined range file when the passage forms one rhetorical unit, especially if it includes:

- mirrored contrast across ayahs
- an address shift across verses
- ring structure, paired openings/closings, or refrain logic
- one uninterrupted moral or legal argument
- one scene that loses force when split

Default guidance:

- Single ayah: when the ayah stands well on its own
- Two ayahs: combine when the second completes or reverses the first
- Three or more ayahs: combine only when the structure genuinely requires it

When you combine multiple queued ayahs into one file, remove all of those covered entries only after the combined file validates cleanly.

---

## Step 4 — Write Directly to the Final Path

Write directly into:

`/Users/azamkhan/the-guided-path/content/tadabbur/{surah-folder}/{filename}.md`

Naming:

- single ayah: `ayah-016.md`
- range: `ayahs-017-018.md`

Do not stage drafts in temporary directories.

---

## Step 5 — Required Frontmatter

Use this structure for current canonical content files:

```yaml
---
surah: 4
surah_name: "An-Nisa"
ayah_start: 17
ayah_end: 18
title: "The Window of Tawbah"
slug: "004-017-018"
category: tadabbur
arabic: "full exact Uthmani Arabic for the ayah or combined passage"
translation: "full English translation for the ayah or combined passage"
word_count: 1713
estimated_duration: "45-55 minutes"
passage_context: "One or two sentences situating the ayah in the surah's flow."
generated_by: "codex-tadabbur"
validated: false
tags: [tawbah, akhirah, rahmah]
---
```

Hard rules:

- Use `surah`, not `surah_number`
- Use `ayah_start` and `ayah_end`
- `slug` is required
- single-ayah slug format: `003-181`
- range slug format: `004-017-018`
- `category` must be exactly `tadabbur`
- `generated_by` must be exactly `codex-tadabbur`
- `validated` must remain `false`
- compute `word_count`; do not leave it null
- use `tags`, not `entity_tags`

Do not set `validated: true` in this pipeline.

That flag is left false even when the validators pass. Human review or a later explicit validation stage can change it.

---

## Step 6 — Body Format

Write Markdown, not HTML wrapper divs.

Use this general structure:

```md
# Title

## Surah Name (S:A) or (S:A-B)

[ayah:S:A] FULL EXACT ARABIC
[ayah:S:B] FULL EXACT ARABIC   # when needed for ranges

*Transliteration*

**Translation**

[PAUSE]

## Introduction

## Part 1: The Linguistic Journey

## Part 2: The Thematic Depths

## Closing Synthesis
```

Use full exact Qur'anic Arabic in tagged ayah lines. Do not use partial Arabic phrases inside ayah tags.

For morphology claims, use comment tags like:

```html
<!-- morphology:4:17:4 root=توب pos=N -->
```

Body conventions:

- Use `## Introduction`, not `## The World This Arrived Into`
- Keep the prose speakable and spiritually weighty
- Use "we" and "you" voice
- Avoid hadith citations in this pipeline
- Avoid decorative analogy
- Ground all linguistic claims conservatively

---

## Step 7 — Arabic Source and Translation Handling

Arabic accuracy is non-negotiable.

Use the exact verse text that the validator will recognize. The safest current source is the same canonical text returned by the `quran-validator` package used by `verify_arabic.mjs`.

If needed, cross-check with:

- `node_modules/quran-validator`
- `/Users/azamkhan/the-guided-path/scripts/verify_arabic.mjs`

Do not reconstruct Arabic from memory.

For morphology, use:

`/Users/azamkhan/the-guided-path/scripts/.corpus-cache/quranic-corpus.json`

---

## Step 8 — Validation Loop

Run all of these for every new file:

```bash
cd /Users/azamkhan/the-guided-path

node scripts/lint-tadabbur-frontmatter.mjs content/tadabbur/{surah-folder}/{filename}.md

node scripts/verify_arabic.mjs content/tadabbur/{surah-folder}/{filename}.md --scan

node scripts/verify_morphology.mjs content/tadabbur/{surah-folder}/{filename}.md

node scripts/cross_reference_tafsir.mjs \
  content/tadabbur/{surah-folder}/{filename}.md \
  --output content/tadabbur/{surah-folder}/{tafsir-report-filename}.md
```

Rules:

- Frontmatter linter failures are blocking
- Arabic failures are blocking
- Morphology failures are blocking
- Tafsir output is a required cross-check artifact
- If tafsir reveals drift or overreach, revise and rerun
- Do not advance the queue until the content file and tafsir report both exist

Even after all of these pass, keep `validated: false`.

---

## Step 9 — Queue Advancement

Only remove queue entries after:

- the content file exists
- the tafsir report exists
- the linter passes
- Arabic verification passes
- morphology verification passes
- the tafsir report has been reviewed for obvious drift

For a single ayah, remove one line.

For a combined range that covers multiple queued single ayahs, remove all covered lines together.

Be careful with queue slicing commands. Always re-open the top of the queue after modification to confirm nothing was accidentally skipped.

---

## Step 10 — Session Logging

After every completed tadabbur file or combined range, add a row to the **Session Log** table in:

`/Users/azamkhan/the-guided-path/scripts/article-backlog.md`

Format:

```md
| 2026-03-31 | an-nisa (tadabbur) | 2 ayah records | 4:29-30 — unlawful consumption, mutual consent, do not kill yourselves, Fire as consequence ✅ |
```

Rules:

- Add the row before moving on to the next queue item
- Use one row per completed file or combined range
- If a range covers multiple ayahs, record the ayah count accurately
- Keep the note specific enough that another agent can instantly see what was completed and the main angle

This is required continuity data for future Claude Code and Codex sessions.

---

## Step 11 — Stop Conditions

Continue until:

- the queue is empty, or
- context is getting too full to continue safely
- a validator or overlap issue requires user input

If stopping due to context, stop at a clean boundary:

- finish the current file
- finish the validation loop
- update the session log
- update the queue correctly
- report the next top queue item

Do not stop just because one file or one small batch has been completed. Default to continuing autonomously.

---

## Quality Bar

Each reflection should:

- trace at least one real root or morphological feature
- include at least one meaningful grammatical or rhetorical observation
- connect the linguistic insight to lived spiritual reality
- stay grounded in what the text can genuinely carry
- prefer depth over cataloguing
- avoid splitting passages that clearly need to stay together

Multi-ayah files should only be combined when the combined reading is genuinely stronger than isolated single-ayah treatment.

---

## Non-Negotiables

- Never overwrite existing tadabbur content
- Never skip duplicate checks
- Never set `validated: true`
- Never insert to Supabase in this pipeline
- Never approximate Arabic from memory
- Never remove queue entries before the file and report are clean

When in doubt, prefer a smaller, cleaner, fully checked pass over a larger, sloppier one.
