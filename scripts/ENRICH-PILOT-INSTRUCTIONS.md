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

## HOW TO NOT REINTRODUCE ARABIC DRIFT (agents: read this)

Confirmed 2026-07-27: **6 of 7 enrichment agents silently renormalized the Arabic**
in the `[ayah:]` lines and the frontmatter `arabic:` field on their first write — same
characters, different bytes — taking `verify_arabic` from 0 warnings to 2. All caught
it only because they re-ran the validator afterwards.

The one agent that never triggered it used a better method, and it is now the
recommended one:

> **Copy the source file to your output path first, then edit *around* the Arabic.**
> Never retype or reflow a line containing Quranic text. That way `arabic:`, every
> `[ayah:]` line and every `<!-- morphology: -->` line stay byte-identical by
> construction rather than by repair.

Then always confirm: `node scripts/verify_arabic.mjs <your-draft> --scan` must report
**0 warnings**. If it doesn't, splice the original bytes back and re-check.

## READING THE TAFSIR REPORTS (revised 2026-07-28)

All 1,367 reports were REGENERATED on 2026-07-28. They are no longer truncated, and
al-Jalalayn — previously marked "not available" in 4,952 sections, falsely — is now
present. If you are working from memory of how thin these reports used to be, discard it.

**One commentator's block often appears under several `## S:A` headings. That is NOT a
defect.** Ibn Kathir comments on *passages*, not single ayahs, and the source maps every
ayah in a passage to the same block. An earlier version of this spec told agents the
repeated block was "usually commentary on a different ayah"; that was an artifact of the
old 500-char truncation, which cut passage blocks near their opening so only the first
ayah's material was visible. Several agents consequently refused to cite Ibn Kathir at
all. Do not repeat that.

So:
- **Read the whole block** and see which ayahs it actually treats. A passage block
  legitimately covers the whole passage.
- **Still verify the Arabic a commentator quotes** before attributing a specific point to
  him at a specific ayah. Genuine misfiling does exist — `003-aal-imran/tafsir-report-133-136.md`,
  `005-al-maidah/tafsir-report-051.md`, and al-Tabari offset by one throughout
  `014-ibrahim/tafsir-report-024-027.md` were all hand-verified.
- **Do not infer silence.** If a block says FETCH FAILED, that is a pipeline failure, not
  evidence the commentator is silent. Consult the source before concluding anything.
- Reports now cut only at 12,000 chars, with an explicit marker. If you see that marker,
  consult the source before relying on anything near it.

**DO NOT READ A WHOLE REPORT. Read your sections.** Regeneration made reports complete
but broad: median 30 KB, 178 of them over 150 KB, the largest 892 KB (34 ayahs x 4
commentators). The size is breadth, not depth — a report accumulates a section for every
ayah the reflection cross-references, so most of it is about ayahs you are not writing on.
Reading it whole wastes your context and has caused API failures.

    node scripts/tafsir_section.mjs <report.md> --list          # what is in it
    node scripts/tafsir_section.mjs <report.md> --own           # the file's own range
    node scripts/tafsir_section.mjs <report.md> 2:183,2:184     # named sections

`--own` on that 892 KB report returns 113 KB — an 88% reduction with nothing you need
removed. Start with `--list`, then pull `--own`, then pull specific cross-referenced
sections only if you actually cite them.

**Why this matters for your writing:** the old truncation cut al-Tabari off exactly where
he states `واختلف أهل التأويل في...`. Files written against those reports settled live
disagreements without knowing a disagreement existed — that is the single most common
real defect found in this corpus. You now have the full text. **Look for the ikhtilaf and
report it.**

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
