# Concept Backfill — Instructions for Any Claude Session

## What This Does
Adds a `concepts` frontmatter field to every tadabbur file (both Claude-generated and Codex-generated).
These concept tags will power the future cross-reference index and knowledge base query layer.

## State Tracking
`scripts/concept-backfill-state.json` tracks every file:
- `"pending"` — not yet tagged
- `"done"` — concepts added

Never edit this file manually. The session instructions below keep it updated.

## How to Run a Batch (in any new Claude session)

Paste this prompt into Claude Code:

---
**PROMPT TO PASTE:**

> Read `scripts/concept-backfill-state.json` and find the next 30 pending files.
> Then read `scripts/concept-vocabulary.md` for the canonical concept list.
> For each pending file:
> 1. Read the file
> 2. Choose 3–5 concept slugs from the vocabulary that best describe the ayahs covered
> 3. Add `concepts: [slug1, slug2, ...]` to the frontmatter (after `validated:`)
>    - For Claude-format files (have `passage_context`): add after the `validated:` line
>    - For Codex-format files (have `tags:`): add after the `tags:` line
> 4. Do NOT change any other content — frontmatter addition only
> 5. After completing all 30, update `scripts/concept-backfill-state.json` — set each file to `"done"` and increment `completed`
> 6. Report: how many done, how many remaining
>
> Process all 30 files using parallel subagents (10 files each, 3 agents).

---

## Rules
- **Sonnet is fine** for this task — it's classification, not sacred content generation
- **No validators needed** — we're tagging existing validated content, not generating new content
- **Vocabulary only** — only use slugs from `concept-vocabulary.md`. If you see a clear gap, add the slug to the vocabulary file first.
- **3–5 concepts per file** — don't over-tag or under-tag
- **Frontmatter only** — never touch the body of the file

## Tracking Progress

To check current progress in any session:
```
python3 -c "import json; d=json.load(open('scripts/concept-backfill-state.json')); print(f'{d[\"completed\"]}/{d[\"total\"]} done ({d[\"total\"]-d[\"completed\"]} remaining)')"
```

## Expected Timeline
- 30 files per batch, ~5–10 minutes per session
- 356 total files → ~12 batches → ~12 short sessions
- Can run multiple batches per session if desired (just repeat the prompt)

## After Completion
Once all 356 files are tagged:
1. Run `scripts/build-concept-index.ts` (to be created) — compiles concept index files in `content/concepts/`
2. Add `concepts` field to the quranic-tadabbur skill output for future files
