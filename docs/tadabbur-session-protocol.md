# Tadabbur Session Protocol

> For any agent continuing AyahGuide's ayah-level tadabbur queue.
> This is the repo-local operating protocol for the current filesystem pipeline.

---

## What "Continue Tadabbur" Means Here

In this repo, continuing tadabbur means:

- work from `scripts/pending-ayahs.txt`
- write directly to `content/tadabbur/...`
- validate every completed file locally
- generate a local tafsir report beside it
- update `scripts/article-backlog.md`
- advance the queue only after the file and report are clean

This protocol replaces the older draft-only / Supabase-insert workflow for ayah-level sessions.

---

## First Reads

Before starting any ayah-level session, read:

- `/Users/azamkhan/.codex/skills/quranic-tadabbur/SKILL.md`
- `/Users/azamkhan/.codex/skills/quranic-tadabbur/references/authoring-guide.md`
- `/Users/azamkhan/the-guided-path/docs/tadabbur-session-protocol.md`
- `/Users/azamkhan/the-guided-path/docs/codex-tadabbur-prompt.md`

---

## Queue Source

The live queue is:

`/Users/azamkhan/the-guided-path/scripts/pending-ayahs.txt`

Before starting each passage:

1. Read the top of `pending-ayahs.txt`
2. Check `scripts/pending-ayahs-opus.txt`
3. Skip any reserved passage listed there

If a reserved passage appears at the queue head, remove that queue line and continue.

---

## Duplicate and Overlap Check

Before writing any passage, inspect the target surah folder:

`content/tadabbur/{surah-folder}/`

Rules:

- never overwrite an existing tadabbur file
- never create a single-ayah file if a stronger existing range already covers it
- never create a narrower overlapping range when a stronger wider file already exists
- if the exact target or a clearly superior overlap already exists, remove the queue line and continue

The filesystem is the duplicate check.

---

## Deciding Single Ayah vs Range

Do not blindly mirror the queue line-for-line.

Combine adjacent ayahs when they form one rhetorical unit, especially where there is:

- a legal argument completed across verses
- one scene that loses force when split
- an address shift or contrast spanning verses
- obvious paired openings and closings
- one moral arc whose force depends on the sequence

Default:

- single ayah when it stands well alone
- 2 ayahs when the second completes or resolves the first
- 3+ ayahs only when the structure genuinely requires it

When you combine multiple queued ayahs into one file, remove all covered queue lines only after the file and report are clean.

---

## Output Paths

Write directly to the final content path:

- single ayah: `content/tadabbur/{surah-folder}/ayah-XXX.md`
- range: `content/tadabbur/{surah-folder}/ayahs-XXX-YYY.md`

Also write the tafsir cross-check beside it:

- single ayah: `tafsir-report-XXX.md`
- range: `tafsir-report-XXX-YYY.md`

Do not stage drafts in temporary folders.

Do not write ayah-level pipeline output to `scripts/drafts/`.

---

## Frontmatter and Body

Use the current canonical frontmatter:

- `surah`
- `surah_name`
- `ayah_start`
- `ayah_end`
- `title`
- `slug`
- `category: tadabbur`
- `arabic`
- `translation`
- `word_count`
- `estimated_duration`
- `passage_context`
- `generated_by: "codex-tadabbur"`
- `validated: false`
- `tags`

Body requirements:

- Markdown only
- exact full `[ayah:S:A]` lines
- morphology comment tags
- `## Introduction`
- `## Part 1: The Linguistic Journey`
- `## Part 2: The Thematic Depths`
- `## Closing Synthesis`

Never mark new ayah-level files `validated: true`.

---

## Validation Loop

Run all of these for every completed file:

```bash
cd /Users/azamkhan/the-guided-path

node scripts/lint-tadabbur-frontmatter.mjs content/tadabbur/{surah-folder}/{filename}.md
node scripts/verify_arabic.mjs content/tadabbur/{surah-folder}/{filename}.md --scan
node scripts/verify_morphology.mjs content/tadabbur/{surah-folder}/{filename}.md
node scripts/cross_reference_tafsir.mjs content/tadabbur/{surah-folder}/{filename}.md --output content/tadabbur/{surah-folder}/{tafsir-report-filename}.md
```

Rules:

- never skip validators
- frontmatter failures are blocking
- Arabic failures are blocking
- morphology failures are blocking
- tafsir output must be reviewed for drift before queue advancement
- leave `validated: false` even when all checks pass

---

## Continuity Requirements

After every completed file or combined range:

1. add a prose session-log block near the top of `scripts/article-backlog.md`
2. add a row to the Session Log table lower in the same file

Match the recent Al-Ma'idah format already in the file.

This continuity step is mandatory.

---

## Queue Advancement Rule

Only after the file and tafsir report are clean:

- remove the covered queue line or lines from `scripts/pending-ayahs.txt`
- update `scripts/article-backlog.md`
- reopen the queue
- continue to the next passage immediately

Do not stop after one file just because one unit is done.

---

## Stop Conditions

Continue autonomously until:

1. context is genuinely too full to work safely
2. the queue is empty
3. a real blocker cannot be resolved locally

Do not stop merely to ask the user whether to continue.

---

## Non-Negotiables

- never overwrite existing tadabbur files
- never skip validators
- never mark `validated: true`
- never insert into Supabase from this ayah-level pipeline
- recover and continue if a patch/edit attempt is awkward
- prefer small safe patches when needed

