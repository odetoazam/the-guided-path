# AyahGuide — Codex Agent Instructions

## Default Tadabbur Meaning

If the user says anything like:

- `keep doing quranic tadabbur`
- `continue tadabbur`
- `keep going through the ayah queue`
- `resume AyahGuide tadabbur`

assume they mean the **ayah-level filesystem pipeline** in this repo, not the old draft/article pipeline.

Start from the live queue in:

`/Users/azamkhan/the-guided-path/scripts/pending-ayahs.txt`

and continue autonomously until:

1. context is genuinely too full to work safely
2. the queue is empty
3. a real blocker cannot be resolved locally

Do not stop after a single file unless one of those conditions is reached.

## First Reads for Any Ayah-Level Tadabbur Session

Before writing anything, read:

- `/Users/azamkhan/.codex/skills/quranic-tadabbur/SKILL.md`
- `/Users/azamkhan/.codex/skills/quranic-tadabbur/references/authoring-guide.md`
- `/Users/azamkhan/the-guided-path/docs/tadabbur-session-protocol.md`
- `/Users/azamkhan/the-guided-path/docs/codex-tadabbur-prompt.md`

Treat repo-local protocol/docs as the source of truth when they are more specific than the skill.

## Current Ayah-Level Pipeline

This repo now uses a **filesystem-first** tadabbur pipeline.

Write directly to:

- `content/tadabbur/{surah-folder}/ayah-XXX.md`
- `content/tadabbur/{surah-folder}/ayahs-XXX-YYY.md`

Do not write ayah-level work to:

- `scripts/drafts/`
- temporary staging folders

Do not insert into Supabase in this pipeline.

Do not mark new ayah-level tadabbur files as `validated: true`.

## Required Ayah-Level Workflow

For each queue item:

1. Check `scripts/pending-ayahs-opus.txt` and skip any reserved passage.
2. Inspect the target `content/tadabbur/{surah-folder}/` directory for duplicates or stronger overlapping ranges.
3. Decide single ayah vs combined range based on real rhetorical unity.
4. Write the tadabbur directly to the final content path.
5. Run all required validators and tafsir cross-check.
6. Review the tafsir report for drift.
7. Only after the file and report are clean:
   - remove the covered queue line or lines
   - update `scripts/article-backlog.md`
8. Reopen the queue and continue immediately.

## Validation Is Mandatory

Run all of these for every completed ayah-level file:

```bash
cd /Users/azamkhan/the-guided-path

node scripts/lint-tadabbur-frontmatter.mjs content/tadabbur/{surah-folder}/{filename}.md
node scripts/verify_arabic.mjs content/tadabbur/{surah-folder}/{filename}.md --scan
node scripts/verify_morphology.mjs content/tadabbur/{surah-folder}/{filename}.md
node scripts/cross_reference_tafsir.mjs content/tadabbur/{surah-folder}/{filename}.md --output content/tadabbur/{surah-folder}/{tafsir-report-filename}.md
```

Never skip validators.

Treat frontmatter, Arabic, and morphology failures as blocking.

Treat tafsir output as a required drift check before the queue is advanced.

## Continuity Is Mandatory

After every completed file or combined range, update:

- `scripts/article-backlog.md`

with both:

1. a prose session-log block near the top matching the recent Al-Ma'idah format
2. a row in the lower Session Log table

The continuity log is not optional.

## Non-Negotiables

- Never overwrite existing tadabbur files.
- Never redo already-covered passages if a valid existing file already handles them.
- Never mark ayah-level output `validated: true`.
- Never insert ayah-level tadabbur into Supabase from this workflow.
- Prefer small safe patches over brittle giant writes.
- If a file edit gets awkward, recover and continue.

## If the User Gives a Very Short Prompt

If the prompt is just:

`keep doing quranic tadabbur`

that is sufficient in this repo.

Interpret it as:

- continue the ayah-level queue from `scripts/pending-ayahs.txt`
- follow the ayah-level protocol
- maintain continuity in `scripts/article-backlog.md`
- keep going autonomously until a real stopping condition is hit

