---
name: course-pipeline
description: Build a multi-module AyahGuide character course end to end — substrate scan, spine discovery, module drafting, adab guardrails, Arabic splicing, validation, and shipping to /courses. Use for any new course (Ādam, Iblīs, Yūsuf, Mūsā…) or any substantive edit to an existing one.
triggers:
  - build a course
  - new course
  - course on
  - make the iblis course
  - course pipeline
  - write course modules
  - ship a course
---

# Course Pipeline

Distilled from three built courses (Dāwūd pilot, Sulaymān, and the launch of both on
2026-08-26). Every rule here was paid for by a defect.

**A course is not a long article.** An article shows one facet. A course walks every verse
the Quran gives one person, in a sequence that makes a single word land at the end. If the
course does not turn on one word, it is a series of articles and should be published as one.

---

## 0. Model and effort — state this before starting

- **Build with Opus 5, high effort** (xhigh for the trickiest adab / synthesis calls).
  Sacred content plus adab warrants the top bar. This is not negotiable for module prose.
- **Review with Fable 5, adversarially, as a separate pass.** Proven: Fable's review of the
  Sulaymān course found 3 real defects including an **ikhtilāf stated backwards** in M4.
  A model reviewing its own prose does not find that class of error.
- Mechanical work (splicing, validation runs, wiring) — any model.

Always state the choice and one line of why before substantive work (house rule).

---

## 1. Step 0 — SUBSTRATE SCAN. Never skip. Never draft first.

```bash
python3 scripts/course-substrate-scan.py 38:71-85 7:11-27 15:26-44 2:34-38 …
```

Pass every ayah range the course will touch. The scan reports, per ayah:

| Column | What it means |
|---|---|
| `READ:PASS` | A human interpretive read is on record and it passed. **Trustworthy.** |
| `READ:FLAG` / `READ:REPAIR` | Read, and problems found. Read the file's verdict before using. |
| `MECHANICAL-ONLY` | Arabic + morphology checked; **the reading was never examined.** |
| `UNVALIDATED` / `NO-FILE` | Nothing to lean on. |
| `NNed` | Editions in the covering tafsir report. **<10 = regenerate before drafting.** |

### The rule this exists to enforce

**`validated: true` is NOT evidence the reading was checked.** 2,141 of 2,222 validated nodes
are mechanical-only. A course leans entirely on the *reading*, so:

> ⛔ **Build every module from the 14-edition tafsir report directly. Use tadabbur
> reflections as leads — "look at this word" — never as authority.**

This is not theoretical. Sulaymān M4's first draft took its ikhtilāf from a tadabbur file and
got it **backwards**; the 14-edition report showed al-Baghawī reports the majority the other
way and al-Ṭabarī personally dissents. On the Iblīs footprint the scan returned **23 of 28
supporting files unread**. Assume the same ratio on any new course.

The scan also prints **promoted graph edges** — human-reviewed cross-surah connections with a
reviewer's note. These are the single best raw material in the building: they are the one
layer that is human-reviewed by construction. Mine them for module bridges.

If a report is thin, regenerate before writing a word:
```bash
python3 scripts/gen-course-blocker-reports.py   # returns 14-edition reports
```

---

## 2. Step 1 — The spine

A course needs **one word**, corpus-verified, that the whole sequence turns on.

- Dāwūd = **awwāb** (the one who keeps returning)
- Sulaymān = **a-ashkuru am akfur** (the question asked at the peak)
- Ādam = **tawba** → al-Tawwāb · Iblīs = **istikbār** → al-ʿAzīz

Rules:
1. **Verify the spine programmatically before building on it.** Count the root/lemma across
   the corpus (`scripts/.corpus-cache/quranic-corpus.json`, match on normalized lemma —
   a raw substring count can never match diacritised Arabic). Sulaymān's `anāba` = exactly
   4 verses was verified this way; the number went into the course.
2. **The vertical axis must be a divine name, demonstrated not asserted.** The name should be
   *enacted* by the text, ideally by a hostile witness (Iblīs swearing by God's own ʿizzah at
   38:82 and writing his own surrender clause at 38:83 is the model).
3. **Never equate roots that merely rhyme.** أوب and توب are different roots. Locked rule.
4. Present a synthesis spine as *a reading the text invites*, never as the only reading.

---

## 3. Step 2 — Overlap discipline

Before drafting each module, read `scripts/braintrust-v2/published-articles.md` and
`docs/knowledge-state.md`. **State in each module's build comment what it adds over the free
layer.** If a module's content is already free, it is not a module.

Screen by **ayah refs, never by title words** — a title screen once said 8/8 clear and one was
already published.

---

## 4. Step 3 — Architecture: six modules

Locked across all courses; do not re-invent per course.

- **M0 — Start Here: the story/scene, told straight.** Chronological, plain, tellable aloud.
  Added after a persona stress test where 3 of 4 personas could not retell the story. If the
  Quran does not sequence it, say so explicitly and say the order is assembled.
  **Include a visible course map. The spiral must be announced, never implied.**
- **M1** — the full portrait / the opening claim. Feel the size before the turn.
- **M2** — two scenes up close. Loosen an assumption before the hard module.
- **M3 — flagship.** The one word. Everything before this was setup.
- **M4 — "What the Quran Won't Tell You."** The deliberate silences and the ikhtilāf.
  This is the module where courses go wrong; see §5.
- **M5** — turn it toward the reader. Three questions. Close on the divine name.

**Modules are shooting scripts.** Write to be said aloud.

---

## 5. Adab guardrails — non-negotiable

1. **Plain language, ~8th–9th grade.** Short sentences, every Arabic term glossed at first
   use, zero grammar jargon. Azam explicit; house style.
2. **Name the ikhtilāf with named holders, and never state a reading without its guard
   clause.** "The scholars differed" with nobody named is the project's dominant failure mode —
   a vague appeal is usually covering something specific and wrong. The standard to match is
   `content/courses/sulayman/module-4.html`.
3. **Never merge a real disagreement.** "These are not competing — they are layers", "two
   camera angles", "don't pick one, take them all" are defect phrases. Camera-angle language
   is 8-for-8 as a defect marker. If al-Ṭabarī writes *ikhtalafa ahlu l-ʿilm*, the course says
   they differed and names who held what.
4. **Isrāʾīliyyāt excluded outright.** No Bathsheba on Ṣād 38, no serpent (there is none in the
   Quran at all), no gift inventories, no names for anonymous people. Density is highest around
   the Fall — one Baqarah report carries 57 Ḥawwāʾ and 27 serpent tokens.
5. **Era-bound tafsir**: quote old science in the scholar's voice with his reasoning, never in
   ours. Attribute, don't adopt. Never silently delete.
6. **No manufactured contrast.** The `This is not X. It is Y.` tic was in 62% of pages.
   `npm run check:voice`.
7. **For an adversary course specifically**: exhibit, never protagonist. Never teach a
   mechanism without its limit clauses welded on in the same breath, or it reads as a how-to.
   No taxonomy that fuses sorcery with whispering.

---

## 6. Step 4 — Arabic. The one mechanical rule that matters.

> ⛔ **Never type, paste, or retype an ayah. Even copying re-orders diacritics.**

Author with `@@ARABIC@@` placeholders, then fill programmatically:
```bash
node scripts/fill-ayah-placeholders.mjs <file>
```

- **Whole ayahs only.** `verify_arabic` matches complete verses; a partial quote reports
  NO MATCH.
- Every Arabic line carries `data-ayah="S:A"` on its `<p class="arabic">`.
- Markup shape (matches the site's `.course-content` CSS):
  ```html
  <blockquote class="ayah-quote">
    <p class="arabic" data-ayah="38:82" dir="rtl">@@ARABIC@@</p>
    <p class="translation">"…"</p>
    <cite>Ṣād (38:82)</cite>
  </blockquote>
  ```
- Do **not** add inline `style=` on Arabic lines; the loader strips them and globals.css owns
  both themes.

**A "Failed: 0" from verify_arabic can mean it checked NOTHING** — that happens when Arabic
is untagged. Always read **Passed**, and treat any **Warning** (normalized-only match =
diacritic drift) as a failure. Fix with:
```bash
node scripts/verify_arabic.mjs <file> --fix
```

---

## 7. Step 5 — Validate

```bash
npm run check:courses     # Tier 1b gate: files exist, Arabic tagged, every ayah exact, no HELD markers
npm run check:complete    # no truncated / mid-sentence modules
npm run check:voice       # manufactured-contrast tic
```

Then the **Refutation Pass** by hand: try to kill every factual claim in your own prose.
It has caught a defect in my own writing in **every session it has run** — and it is
*always a number or a count word*. Verify every count programmatically before writing it.
Recent catch: I wrote 27:16 grants "the speech of what flies and what crawls"; the ayah says
birds. Small, load-bearing, and mine.

Then hand the whole course to **Fable 5 for an adversarial read** (§0).

---

## 8. Step 6 — Ship

1. Modules → `content/courses/<slug>/module-{0..5}.html` (body fragments, own `<h1>`, no
   HELD markers).
2. Metadata → `src/data/courses.ts`: slug, hubSlug, figure, figureArabic, title, question,
   description, spine, and 6 modules with `slug` / `number` / `title` / `teaser`.
3. That is all the wiring. Index, landing, reader, sitemap, nav, hub course card, prophets
   chip and progress all read from that array automatically.
4. Reading time is computed from the body — **never invent a duration.**
5. `npm run check:courses && npx tsc --noEmit && npx next build`
6. Add a `shipped` entry to `src/lib/roadmap-data.ts`.
7. Deploy: the working branch is usually behind/diverged from `main`. Cherry-pick the launch
   commit onto `origin/main` in a scratchpad worktree. `content/tadabbur` does not exist on
   main — substrate fixes ride the branch and never block a deploy.
   ⚠️ `rtk` mangles `next build` output into a false "Errors: N" summary — use
   `rtk proxy npx next build` and trust the exit code.

---

## 9. Expect a defect register

Every course build so far has found defects **in our own tadabbur files** — 33 in the
Sulaymān block, none caught by any validator. Log them as you go
(`docs/<figure>-substrate-defects-<date>.md`), route the course around them, and fix them at
source before or alongside launch. Building a course is currently the most effective content
audit the project has.
