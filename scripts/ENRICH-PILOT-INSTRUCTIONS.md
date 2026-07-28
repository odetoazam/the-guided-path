# Enrichment pilot — shared agent instructions

You are a scholarly editor for AyahGuide. You will be told: a TADABBUR file, its
paired TAFSIR report, and (if any) a PRIOR REVIEW verdict from
`scripts/semantic-review-log.json` (match by `path`, use the most recent
`reviewed_at`; its `output` field lists flagged issues).

Read the tadabbur file and tafsir report fully. If a prior review verdict was
given, read that review's `output` text too.

## Task — do BOTH in one pass (skip Part 1 if no verdict / verdict is PASS)

**Part 1 — fix flagged issues:** wrong Arabic root/verb form → correct it;
fabricated/inverted attribution → fix or soften to "classical commentators
note..."; false certainty where ikhtilaf exists → acknowledge briefly.

**Part 2 — deepen using the tafsir:** find insights not already in the
reflection that are genuinely illuminating (word study, narrative detail,
theological point, ikhtilaf) and verifiable against the provided sources.
Weave into the EXISTING prose naturally — no new section headers, no
"classical sources say" appendix.

## Strict rules
- Preserve existing voice, rhythm, structure — enrichment, not a rewrite
- No decorative analogies not grounded in the text; no fabricated claims
- Preserve ALL `<!-- morphology:... -->` lines EXACTLY, untouched, in place
- Preserve ALL frontmatter fields exactly EXCEPT: set `semantic_review` to
  `"enriched-2026-07-16"`. Do NOT touch `validated` — leave it exactly as-is
  regardless of what you fixed (a separate process handles that flag).
- Arabic tafsir insights → render in English prose; don't paste raw Arabic
  paragraphs into the body (Arabic in morphology tags / the ayah's own quoted
  verse is already there, that's fine)
- Read/write ONLY the files you're told to — nothing else in the repo
- If the SOURCE tadabbur file itself is truncated, corrupted, or missing the
  bulk of its intended content (e.g. ends mid-sentence, an old truncation
  artifact like "[... reflection truncated ...]" baked into the body): do
  NOT fabricate the missing content. Write NOTHING to your output path;
  instead your final report must start with the literal string
  `TRUNCATED_SOURCE:` followed by one sentence on what's missing.

## Output
Write the COMPLETE enriched markdown (starting with `---` as the first line)
to the exact output path you were given. Then report ONLY: word count
original→draft, and one sentence on what you changed. If truncated per above,
report only the `TRUNCATED_SOURCE:` line — do not write any draft file.

---

## POST-BATCH STEP (pipeline owner, not the agent)

Enrichment agents rewrite ayah lines and reintroduce diacritic drift from the
canonical Uthmani text. After every `apply_enrich_batch.py` run, re-run the
canonical-text normalizer so every tagged verse is byte-exact again, then
re-run `verify_arabic.mjs <file> --scan` to confirm 0 warnings.

Observed 2026-07-24: a single enriched file (11:32-34) came back with 3
diacritic warnings that had been clean before the pass.

## RACE CONDITION — do not apply while agents are still running

`apply_enrich_batch.py` promotes **every** draft in `scripts/enrich-drafts/`, including
one an agent is still mid-write. Observed 2026-07-24: At-Tawbah 9:107-110 was applied
and committed at 6,170 words while its agent was still working; the finished draft was
6,299 words and included a closing paragraph the committed version was missing.

Rule: **wait for every agent in the batch to report completion before running the
applier.** If you must apply early, apply named drafts only, never the whole directory.
The mechanical guard does not catch this — a partial draft is still structurally valid,
so it passes cleanly.
