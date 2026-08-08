---
name: surah-visual-page
description: >
  Generates the visual architecture page for a Quranic surah — selecting appropriate
  diagram types, extracting verified data from the surah's written reflection, and
  publishing it as a row in the surah_visual_data table that the app's shared
  renderers draw.
  Use this skill whenever someone asks to create a visual surah page, generate surah
  diagram data, build a surah architecture visualization, or produce the "front door"
  visual experience for a surah on AyahGuide. Trigger for requests like "generate the
  visual page for Surah Al-Kahf", "create the surah diagrams for Yusuf", "build the
  architecture visualization", or "update the visual data for An-Nahl". Also trigger
  when someone mentions "surah visual",
  "surah diagram", "diagram registry", or "visual architecture page" in the context
  of AyahGuide or Quranic content. This skill is downstream of surah-architecture —
  it transforms written analysis into interactive visual data.
---

# Surah Visual Page Skill

## Purpose

This skill produces one thing: a verified **row of visual data** in the
`surah_visual_data` table, which the app's shared renderer components draw as the
visual "front door" to a surah on AyahGuide.

You are producing data, not components. The page shell, fonts, colors, tab bar,
audio player, and every diagram renderer already exist in
`src/components/surah/`. See Step 5 for the exact contract.

The visual page is not a summary of the written article. It is a different *format*
for the same structural understanding — one that communicates architecture, pattern,
and relationship through layout and interaction rather than prose. The written
reflection and the visual page are peers, not parent and child.

The skill's distinctive contribution is the **diagram selection** step — choosing
which 3-4 diagram types (from the registry of registered renderers) best fit this
particular surah's character. A narrative surah like Yusuf needs different visualizations than an
argument surah like Al-Asr or a refrain surah like Ar-Rahman. One-size-fits-all
templates produce mediocre results. This skill produces specific ones.

---

## The Pipeline

The visual page is always generated **downstream** of a vetted written article.
This is non-negotiable. The article is the source of truth; the diagrams visualize
it. The pipeline:

```
Written article (vetted) → Data extraction → Diagram selection → Verification → surah_visual_data row
```

If no written article exists yet, the surah-architecture skill should be run first
to produce one. Do not generate diagram data directly from the Quran text without
an intermediary analysis — that's where hallucination risk is highest.

---

## Step 0: Source the Written Article

Before anything else, locate the vetted written article for this surah.

**If the article exists on AyahGuide:** Read it (via browser, URL fetch, or user-
provided content). This is the source of truth for all diagram data.

**If the article exists in the conversation:** Use it directly.

**If no article exists:** Tell the user: "The visual page works best when generated
from a vetted written reflection. Want me to generate the article first using the
surah-architecture skill, or do you want to provide the source material?" Do not
proceed without a source.

---

## Step 1: Surah Classification

Before selecting diagrams, classify the surah along these dimensions. This drives
diagram selection.

### Length category
- **Micro** (1-10 ayahs): Al-Asr, Al-Kawthar, Al-Ikhlas
- **Short** (11-50 ayahs): Al-Mulk, Ar-Rahman, Al-Kahf's individual stories
- **Medium** (51-120 ayahs): Al-Hijr, Maryam, Ta-Ha
- **Long** (121+ ayahs): Al-Baqarah, Al-Imran, An-Nisa

### Structural type
- **Argument**: Logical proof structure (oath → claim → evidence). Al-Asr, At-Takathur.
- **Narrative**: Story-driven, one or more extended narratives. Yusuf, Al-Kahf.
- **Chiastic**: Ring/mirror composition with a clear center. Al-Hijr, Al-Baqarah.
- **Refrain**: Repeated phrase creating rhythmic sections. Ar-Rahman, Al-Mursal.
- **Catalog**: Series of scenes, signs, or images without narrative arc. At-Takwir.
- **Address**: Direct speech to a specific audience throughout. Al-Hujurat, Al-Munafiqun.
- **Hybrid**: Combines two or more of the above.

### Dominant emotion
What is the surah's primary emotional register? (Warning, tenderness, wonder,
urgency, grief, celebration, confrontation, consolation, etc.)

Record these three dimensions before proceeding.

---

## Step 2: Diagram Selection

Each surah gets **3-4 diagrams** from the registry below. Selection is based on
the classification from Step 1.

### The Diagram Registry

⚠️ **A diagram exists only if a renderer is registered for it.** The authoritative
list — with the exact data shape each one consumes — is the renderer registry table
in **Step 5**, derived from `src/components/surah/diagrams/DiagramRenderer.tsx`.
Read that table before selecting. `references/diagram-registry.md` predates the
database migration and describes diagram *concepts*, several of which (Thematic Key,
Emotional Arc, Parallel Narratives, Number Architecture) have **no renderer and
cannot be published** — treat that file as design background only.

Selection logic, by renderer key:

| `renderer` | Best For | Avoid When |
|---|---|---|
| `ring` | Chiastic surahs with demonstrable mirror pairs | Micro surahs, surahs without structural symmetry |
| `journey` | Medium/Long surahs with 4+ distinct movements | Micro surahs (feels absurd), Argument surahs |
| `funnel` | Argument surahs with oath → claim → exception | Narrative surahs, Long surahs |
| `absence` | Always include — every surah has meaningful absences | Never skip this |
| `compression` | Micro surahs where density is the point | Medium/Long surahs (less impressive) |
| `arcs` | Threads linking two distant ayahs that answer each other | When the link is thematic mood, not specific text |
| `landmark` | Long surahs — the handful of verses worth stopping at | Micro surahs (the whole text is already shown) |
| `contrast` | Surahs built on opposed pairs | When the opposition is not sustained |
| `polar` | Two-pole surahs, and cross-surah pairings | When there is no genuine second pole |
| `conditions` | Surahs that enumerate (4 conditions, 7 gates) | When no clear enumeration exists |
| `wordmirror` | One word doing double duty across the surah | When the word appears only once |
| `refrain` | Refrain surahs (Ar-Rahman, Al-Mursalat) | Surahs without a repeated phrase |
| `addressshift` | Surahs whose grammar turns — person, tense, mood, or voice shifts that carry meaning | When shifts exist but are merely grammatical housekeeping |

### Selection rules

1. **Always include Absence Map.** It works for every surah and is one of the most
   distinctive features of the visual page.
2. **Micro surahs** (1-10 ayahs): Populate `full_text` so the **"Text" tab**
   (always last) carries the whole surah. Choose 3-4 diagram tabs from: `funnel`,
   `conditions`, `compression`, `wordmirror`, `absence`. Never use `journey` or
   `ring`.
3. **Short/Medium surahs**: Choose from the full registry based on structural type.
   Use `ring` only if the written article identifies specific chiastic pairs.
4. **Long surahs**: Prioritize `journey` and `landmark` for navigability. Add
   `ring` if present, `arcs` for long-range threads.
5. **Never force a diagram.** If the surah doesn't have a clean ring structure,
   don't create one. Three honest diagrams beat four with one invented. An honest
   "this surah's structure resists simple visual mapping" is better than a forced
   diagram — and a diagram whose renderer doesn't exist is not a choice at all.

---

## Step 3: Data Extraction

For each selected diagram, extract the structured data from the written article.

### Heart verse extraction

Before extracting diagram data, identify the heart verse from the written article:
1. Read "What the Structure Is Doing" — what does the article name as the turning
   point or argumentative hinge? That's usually the heart verse.
2. If not explicit, read the opening section — what ayah does the article
   lead with or return to most often?
3. Tag the Arabic text with `ayahRef` for quran-validator.
4. Write the `why` in 1-2 sentences: a door, not an analysis. Make a newcomer
   want to read more.
5. Flag `articleAnchor` if the article has section anchors for this ayah.

### Extraction rules

- **Ayah ranges**: Must match the section divisions in the written article exactly.
- **Arabic text**: Only include ayah text you can verify. For key verses, include
  the full Arabic. Never approximate or reconstruct Arabic from memory.
- **Section names**: Use the names from the written article's "Walking Through the
  Surah" section.
- **Keyword counts**: Count occurrences by listing the specific ayah numbers where
  each keyword appears. If you cannot list the ayah numbers, do not include a count.
- **Structural claims**: Ring structure pairs, pivot points, turning moments — all
  must come from the article's "What the Structure Is Doing" section.
- **Absence claims**: Must come from the article's "Character of This Surah" section.

### What to extract for each diagram type

**Ring Structure:**
```
pairs: [{ left: {label, ayahs, desc}, right: {label, ayahs, desc}, color }]
center: {label, ayahs, desc, note}
```

**Section Journey:**
```
sections: [{ ayahs, title, color, desc, arabic?, ayahRef?, isPivot? }]
```

**Deductive Funnel:**
```
stages: [{ label, arabic, desc, color, linguisticNote? }]
```

**Thematic Key:**
```
root: { arabic, transliteration, meaning }
verse: { arabic, translation, ref }
layers: [{ title, ayah, desc, color }]
```

**Conditions/Components:**
```
conditions: [{ arabic, label, category, desc, color }]
```

**Absence Map:**
```
absences: [{ item, note }]
```

See `references/diagram-registry.md` for the full data shape of every diagram type.

---

## Step 4: Verification (Mandatory — Two Layers)

This is the most important step. Every piece of data in the visual payload is a
claim. Verification happens in two layers: what the model checks during generation,
and what automated tools check after generation.

### Layer 1: Model-side verification (during generation)

**Tag all Quranic quotes.** Every Arabic verse in the payload must be tagged
with its reference using XML format so it can be validated programmatically:

```js
// Every arabic field that quotes an ayah MUST carry a ref field:
{
  arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
  ayahRef: "15:9"  // surah:ayah format — REQUIRED for every quoted verse
}
```

This tagging lets the validators below check every quoted verse against the
authentic Uthmani text before it reaches the database.

**Manual verification checklist (still required):**

**Factual claims (must be correct):**
- [ ] Surah number, name (Arabic and English), ayah count, period (Makki/Madani), juz
  — check against `scripts/quran_metadata.json`
- [ ] Every ayah reference — does the verse actually say what you claim?
- [ ] Ayah ranges for sections — do they match the written article?
- [ ] Word/keyword counts — can you list the specific ayah numbers?

**Structural claims (must be grounded):**
- [ ] Ring structure pairs — does the written article identify these specific pairs?
- [ ] Pivot/center — does the written article identify this as the turning point?
- [ ] Section transitions — do they match the article's division?

**Absence claims (must be verified):**
- [ ] For each "X is absent" claim — is X actually absent from the surah?
- [ ] Is the absence genuinely noteworthy, or is it trivially true?

**Attribution claims:**
- [ ] Hadith citations — include source, collection, and scholarly grading
- [ ] Scholar attributions — note when a chain of transmission is uncertain
- [ ] If you cannot verify a hadith or attribution, either flag it or remove it

### Layer 2: Automated verification (after generation)

Draft the payload into its publish script under `scripts/` first, then run the
validators against that file. Nothing is written to the database until all of
them pass.

**Tool 1: Metadata verifier** (bundled with this skill)
```bash
python scripts/verify_surah_data.py <payload_file.ts>
```
This checks surah number, ayah count, Makki/Madani, juz, ayah range validity,
section coverage gaps, and diagram type appropriateness against the bundled
database of all 114 surahs.

**Tool 2: quran-validator** (npm package)
```bash
# If not installed: npm install quran-validator
node scripts/validate_arabic.mjs <payload_file.ts>
```
This validates every tagged Arabic verse against the authentic Quran database.
It catches misquoted verses, missing diacritics, combined verses, and subtle
word changes — the exact errors LLMs are prone to. It can also auto-correct
misquotes.

See `scripts/validate_arabic.mjs` for the validation script. It:
1. Extracts all Arabic text + ayahRef pairs from the payload
2. Validates each against the quran-validator's complete Uthmani database
3. Reports exact matches, normalized matches, partial matches, and failures
4. Optionally auto-corrects misquoted text
5. Checks for untagged Arabic text that might be Quranic but wasn't referenced

**Tool 3: Morphology verifier** (corpus.quran.com data)
```bash
# One-time setup: node scripts/verify_morphology.mjs --setup
node scripts/verify_morphology.mjs <payload_file.ts>
```
Validates any root analysis or morphological claims in the payload against
the Quranic Arabic Corpus — the peer-reviewed academic dataset from the
University of Leeds.

**Tool 4: Tafsir cross-reference** (tafsir_api)
```bash
node scripts/cross_reference_tafsir.mjs <payload_file.ts> --output tafsir-report.md
```
Pulls classical tafsir (Ibn Kathir, al-Tabari, al-Jalalayn, al-Muyassar) for
every ayah referenced in the component. Produces a cross-reference report so
you can verify thematic and structural claims against classical scholarship.

**Tool 5: Falsifiable-claim verifier** (corpus-backed)
```bash
node scripts/verify_claims.mjs <payload_file.ts> --surah N
```
Checks every countable claim in the component's text fields — keyword counts,
"appears N times" descriptions, and especially the **Absence Map** entries and
uniqueness claims — against the morphology corpus, counted three ways (root,
lemma, exact surface form). Pass the surah number with `--surah N`. FAILED claims are corpus-refuted: use the real
count or cut the node. LEDGER items (universal quantifiers, unresolvable
subjects) must be ruled on by hand — and since this skill is downstream of the
written article, a ledger item here usually means the upstream article needs
the same scrutiny.

**All tools must pass before the component is considered ready.**

If the metadata verifier reports errors → fix the data and regenerate.
If the quran-validator reports mismatches → replace the Arabic text with the
validator's corrected version.
If the morphology verifier reports mismatches → fix root/POS claims.
If the tafsir report shows major divergences → review and decide consciously.
If the claim verifier FAILS a count or absence → fix it here AND flag the
written article it came from, since the article is the source of truth.
If any tool reports warnings → review manually and decide.

### Confidence flagging

For any claim you are less than fully confident about, add a `confidence` field:

```json
{
  "title": "The Quran is Protected",
  "ayah": "9",
  "desc": "Allah Himself guards His Book from corruption",
  "confidence": "high"  // "high", "medium", or "flag"
}
```

Claims flagged as `"flag"` should include a `note` explaining the uncertainty.
These flags are for the developer/reviewer, not rendered in the UI.

---

## Step 5: Assemble the Visual Data Payload

**The visual page is not a React file you write.** Since the visual-data migration,
every surah's visual page is a **row in the `surah_visual_data` Supabase table**,
rendered by shared components that already exist in the app. Your output is
**data**, not components.

⚠️ The static files in `src/data/visual/surah-*.tsx` are **archival**. Editing them
changes nothing on the live site. If you produce a self-contained `.tsx`, it will
never reach production.

### What renders your data

| File | Role |
|---|---|
| `src/app/(public)/surahs/[slug]/page.tsx` | `getSurahVisualData(n)` reads the row for this surah |
| `src/components/surah/SurahTabs.tsx` | Renders the audio player, the sub-tab bar, the "Why Learn" tab |
| `src/components/surah/diagrams/DiagramRenderer.tsx` | Dispatches each tab to its renderer component |

The page shell, hero, ornament dividers, fonts, colors, sticky tab bar, audio
player, and mobile behavior are **already implemented in those shared components**.
Do not restate them, restyle them, or generate them. Design-system compliance is
their job now — yours is to produce data whose shape they can render.

### The row shape

| Column | Type | Notes |
|---|---|---|
| `surah_number` | int | Primary key for upsert (`onConflict: 'surah_number'`) |
| `name` / `arabic_name` / `meaning` | text | Identity |
| `thesis` | text | One-sentence organizing argument, shown in the "Why Learn" tab |
| `why_this_surah` | text | Prose for the "Why Learn" tab — SurahTabs prepends this tab automatically when present; it is **not** an entry in `tabs` |
| `sciences_active` | jsonb | `[{ key, english }]` — badges under the thesis |
| `heart_verse` | jsonb | `{ arabic, ayahRef, translation, why, articleAnchor? }` |
| `audio` | jsonb | `{ surahNumber, reciter }` — rendered above the sub-tabs, not inside a tab |
| `full_text` | jsonb | Verse array for the `text` renderer |
| `diagrams` | jsonb | `{ <diagramKey>: <data> }` — one entry per diagram |
| `tabs` | jsonb | `[{ id, label, diagramKey?, renderer }]` |
| `content_nodes` | jsonb | `[{ concept, type, searchIntent, articleSlug, diagramRef }]` |
| `updated_at` | timestamptz | Set on every write |

### The tabs ↔ diagrams ↔ renderer join

This is the part that breaks most often. Each tab names **two** things: which
entry in `diagrams` holds its data (`diagramKey`), and which component draws it
(`renderer`).

```js
tabs: [
  { id: 'ring',    label: 'The Ring',  diagramKey: 'chiasticRing', renderer: 'ring' },
  { id: 'absent',  label: 'Absences',  diagramKey: 'absenceMap',   renderer: 'absence' },
  { id: 'text',    label: 'Text',      renderer: 'text' },   // no diagramKey
]
```

- `diagramKey` is free-form and must match a key in the `diagrams` object exactly.
- `renderer` must be one of the registry keys below. An unknown renderer renders
  **nothing** — `DiagramRenderer` returns `null`.
- The `text` tab carries no `diagramKey`; it pulls `full_text` and `heart_verse`.
  Keep it **last** in the array.

**⚠️ The silent-drop trap.** `SurahTabs` filters out any tab whose `diagramKey`
has no matching entry in `diagrams`. A typo in either place does not error — the
tab simply vanishes from the live page and everything still looks fine locally.
After every write, confirm the tab count you intended equals the tab count that
renders.

### The renderer registry — the only renderers that exist

These are the registered keys in `DiagramRenderer.tsx`. **Nothing else can render.**
If a surah genuinely needs a shape not in this list, a new renderer component must
be built and registered first — that is a code change, not a data change, and it
belongs in its own task.

| `renderer` | Data shape | Best for |
|---|---|---|
| `ring` | `{ title, subtitle, pairs: [{ left: {label, ayahs, desc}, right: {…}, color }], center: {label, ayahs, desc, note} }` | Chiastic surahs with demonstrable mirror pairs |
| `journey` | `{ title, subtitle, sections: [{ ayahs, title, color, desc, arabic?, ayahRef?, isPivot? }] }` | Medium/long surahs with 4+ movements |
| `funnel` | `{ title, subtitle, stages [or layers]: [{ label, arabic, desc, color, linguisticNote? }] }` | Argument surahs (oath → claim → exception) |
| `absence` | `{ title, subtitle, absences: [{ item, note }] }` | **Always include** — every surah has meaningful absences |
| `compression` | `{ title, subtitle, elements: [...] }` | Micro surahs where density is the point |
| `arcs` | `{ title, subtitle, arcs: [{ from, to, fromLabel, toLabel, label, desc, color }] }` or `{ threads: [{ fromAyah, toAyah, fromArabic, toArabic, label, desc, color }] }` | Threads connecting two distant ayahs |
| `landmark` | `{ title, subtitle, verses: [{ arabic, ayahRef, ref, translation, context, color }] }` | Long surahs — the verses worth stopping at |
| `contrast` | `{ title, subtitle, pairs: [{ label, ayahs, items }], signs }`, items `{ term, arabic, meaning }` | Surahs built on opposed pairs |
| `polar` | `{ title, subtitle, poles [or pairs], left, right, connection, rootNote }`, entries `{ label, arabic, ayah, surah, theme, desc, finalImage, color }` | Two-pole surahs and cross-surah pairings |
| `conditions` | `{ title, subtitle, pairs, logic }` | Surahs that enumerate (4 conditions, 7 gates) |
| `wordmirror` | `{ title, subtitle, mirrors: [{ word, color, inName, inSentence }] }` or `{ title, subtitle, arc, keyInsight, poles: [{ position, ayah, arabic, transliteration, meaning, color }] }` | A single word doing double duty |
| `refrain` | `{ title, subtitle, rootNote?, elements: [{ ayah, form, role, desc, color, hasRoot }] }` | Refrain surahs (Ar-Rahman, Al-Mursalat) |
| `addressshift` | `{ title, subtitle, note?, shifts: [{ ayah, kind, from, to, arabic?, transliteration?, desc, color }] }` | Surahs whose **grammar turns** — see below |
| `text` | no `diagramKey`; pulls `full_text` + `heart_verse` | Always last |

### The `addressshift` renderer — the grammatical audit, made visible

The surah-architecture skill collects a full grammatical audit (Step 0j: person,
tense, mood, and voice shifts across the surah) that until now had nowhere to go.
This renderer is its home, and it is the natural counterweight to the count-based
diagrams — a way of showing the surah's *movement* rather than its tallies.

Each entry is anchored at **one ayah** where the grammar turns:
- `kind` — one of `person`, `number`, `tense`, `mood`, `voice`
- `from` / `to` — the mode before and after, in plain language ("speaking about
  them" → "speaking to them")
- `arabic` / `transliteration` — optional evidence for the turn
- `desc` — what the shift *does* rhetorically, not just that it happens
- `note` — optional closing synthesis across all the shifts

Do not confuse it with `arcs`: an arc connects two distant ayahs that speak to each
other thematically; a shift marks the single point where the address, time, or mood
of the speech itself changes. Include it when the written article's grammatical
audit found shifts that carry meaning — not merely shifts that exist.

### Diagram count and ordering

3-4 diagram tabs plus the `text` tab, 5 tabs maximum. The Absence Map is always
one of them. Order the tabs so the surah's strongest structural claim comes first.

---

## Step 6: Publish to the Database

### The upsert script pattern

Write a one-off script under `scripts/` following the established pattern (see
`scripts/update-2-ring.ts` for a single-diagram update and
`scripts/migrate-surah-visual-data.ts` for the full-row shape):

```ts
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  // Read-modify-write: never clobber columns you did not generate.
  const { data: existing } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', N)
    .single()

  const { error } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...existing.diagrams, addressShift: DATA },
      tabs: NEW_TABS,
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', N)

  if (error) console.error('update failed', error)
  else console.log('✓ updated')
}
main()
```

Run with `node_modules/.bin/jiti scripts/<name>.ts` (or `npx tsx`). Never hand the
user a `claude` CLI command.

**Always read-modify-write the `diagrams` object.** A bare `update({ diagrams: {…} })`
replaces every diagram the surah already had. The same applies to `tabs`.

### Post-publish verification

1. Re-read the row and confirm every `tabs[].diagramKey` resolves in `diagrams`
   (the silent-drop trap).
2. Load `/surahs/<slug>` and confirm the intended number of tabs renders.
3. Confirm the Arabic renders RTL and nothing scrolls horizontally at 375px.

### When a new renderer is genuinely needed

If the surah's structure fits none of the registry shapes, do **not** contort the
data into the closest match — a forced diagram is worse than one fewer diagram.
Either drop to 3 diagrams, or open a separate task to build and register a new
renderer component in `src/components/surah/diagrams/` (add the component, import
it in `DiagramRenderer.tsx`, add its key to `RENDERERS`, and document its shape in
a header comment the way every existing renderer does).

---

## Quality Checks Before Responding

**Data integrity:**
- Did I source the data from a vetted written article (not generated from scratch)?
- Did I classify the surah (length, structural type, emotion) before selecting diagrams?
- Did I select 3-4 diagrams that genuinely fit this surah's character?
- Did I avoid forcing diagrams that don't fit (no ring structure for Al-Asr)?
- Is the Absence Map included?
- For every keyword count, can I list the specific ayah numbers?
- For every Arabic verse quoted, is it the actual text?
- For every ring structure pair, does the written article identify this pairing?
- Have I flagged any claims I'm less than fully confident about?
- Have I run through the full verification checklist in Step 4?

**Renderer contract (the failure mode that ships silently):**
- Is every `renderer` value one of the keys registered in `DiagramRenderer.tsx`?
  (An unregistered key renders nothing at all.)
- Does every `tabs[].diagramKey` resolve to an actual key in the `diagrams` object?
  A mismatch makes the tab vanish from the live page without any error.
- Does each diagram's data match the shape its renderer consumes (Step 5 table)?
- Is the `text` tab last, and does it have no `diagramKey`?
- Are there at most 5 tabs total?

**Publishing:**
- Did I read-modify-write `diagrams` and `tabs` rather than replacing them wholesale?
- Did I set `updated_at`?
- Did I re-read the row after writing and confirm the intended tabs render?
- Did I avoid writing to `src/data/visual/*.tsx` (archival — changes nothing)?

**Heart verse**: Is the heart verse the structural turning point from the article
(not just a "beautiful" verse)? Is the Arabic tagged with `ayahRef`? Is the `why`
field a door (not an analysis)?

**Content nodes**: Have I identified 2-4 high-potential diagram nodes for future
articles and added them to `content_nodes` with search intent?
