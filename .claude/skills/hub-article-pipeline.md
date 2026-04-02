---
name: hub-article-pipeline
description: End-to-end pipeline for writing, validating, inserting, and synthesizing thematic articles for AyahGuide entity hub pages. Covers article authoring with Quranic accuracy checks, entity tagging, database insertion, and hub synthesis generation.
triggers:
  - write articles for
  - create hub articles
  - article pipeline
  - write about entity
  - hub article
  - insert articles
  - generate hub synthesis
  - synthesize hub page
  - article batch
  - write and publish articles
---

# Hub Article Pipeline

## Purpose

This skill governs the full lifecycle of creating thematic articles for AyahGuide entity hub pages: from research through writing, validation, insertion, entity tagging, and hub synthesis generation.

---

## Session Behavior (READ FIRST)

### Autonomous Mode
This skill runs in **fully autonomous mode**. Do not ask for permission before taking any action. Do not pause to confirm. Act immediately on every step. The user has pre-authorized everything this skill does.

Specifically:
- Run bash commands without asking
- Write and execute insert scripts without asking
- Insert into Supabase without asking
- Update the backlog file without asking
- Continue to the next entity batch without asking

### Keep Going Until Context Is Full
Do not stop after one entity. After completing a full batch (articles written + validated + inserted + backlog updated), immediately pick the next highest-priority entity from `scripts/article-backlog.md` and begin the next batch. Keep going.

Stop only when:
1. **Context is near full** (~80% used): Output this exact message and halt:
   ```
   ⚠️  Context is getting full. Completed this session:
   - [list entities + article counts written]

   To continue: start a new session and say "continue from the article backlog"
   ```
2. **The backlog has no more ⭐ priority items** left.
3. **An error occurs** that requires a human decision (e.g., entity slug not found in DB).

### Session Start Protocol
At the start of every session triggered by this skill:
1. Read `scripts/article-backlog.md`
2. Identify the next ⭐⭐⭐ or ⭐⭐ priority entity with 0 articles
3. Announce the plan: "Starting with [entity] — [N] articles planned"
4. Begin Step 1: RESEARCH

### Backlog Update Protocol
At the end of every entity batch (after INSERT is confirmed), immediately:
1. Open `scripts/article-backlog.md`
2. Check off the articles just written (change `- [ ]` to `- [x]`)
3. Add the session to the Session Log table with today's date, entity, count, and any notes
4. Save the file
5. Continue to the next entity

---

## Pipeline Overview

```
0. BACKLOG      → Read scripts/article-backlog.md, select next priority entity
1. RESEARCH     → Understand the entity, its Quranic footprint, and existing coverage
1.5 SURAH INV.  → For prophets/figures in 5+ surahs: map each surah's argument + what it needs from this character
1.6 CROSS-ENTITY → Identify relationship angle candidates from top co-occurring entities
2. PLAN         → Decide article count, angles (sourced from inventory first), and entity tag strategy
3. WRITE        → Author articles with proper Quranic references and Arabic text
3b. VOICE CHECK → Run anti-pattern audit before validation
3c. BRAND CHECK → Verify brand guideline compliance (docs/brand-guidelines.md)
4. VALIDATE     → Run all 3 Quranic validators on every article
5. INSERT       → Insert articles + entity tags into Supabase
6. AYAH QUEUE   → Log key ayahs for tadabbur to pending queue (see below)
7. SYNTHESIZE   → Generate hub overview synthesis from the published articles
8. BACKLOG UPDATE → Update scripts/article-backlog.md
9. NEXT         → Pick next entity from backlog and repeat
```

---

## Step 1: RESEARCH

Before writing a single word, understand the entity:

```sql
-- Check what entity data exists
SELECT slug, name_arabic, name_translit, category, one_line,
       root_letters, root_meaning, occurrence_count, glossary_data
FROM entities WHERE slug = '{entity_slug}';

-- Check existing articles tagged to this entity
SELECT p.title, p.slug, p.type, et.is_primary
FROM posts p
JOIN entity_tags et ON et.post_id = p.id
JOIN entities e ON e.id = et.entity_id
WHERE e.slug = '{entity_slug}' AND p.status = 'published';

-- Check connected entities (for cross-referencing)
SELECT e2.slug, e2.name_translit, ec.count
FROM entity_co_occurrence ec
JOIN entities e1 ON e1.id = ec.entity_a_id
JOIN entities e2 ON e2.id = ec.entity_b_id
WHERE e1.slug = '{entity_slug}'
ORDER BY ec.count DESC;
```

```sql
-- Get surah theses for surahs where this entity appears
-- Use this to understand WHY each surah invokes this character
SELECT s.number, s.name_transliteration, s.name_arabic,
       s.thesis, s.central_theme
FROM surahs s
WHERE s.thesis IS NOT NULL
ORDER BY s.number;
```

Key research questions:
- How many times does this entity appear in the Quran? (occurrence_count)
- What are its root letters and linguistic depth?
- Which other entities co-occur with it? (these become secondary tags + cross-entity angle candidates)
- What surahs feature it most prominently?
- What has already been written about it?

---

## Step 1.5: SURAH INVENTORY

**This step is mandatory for prophetic characters, historical figures, and any entity that appears in 5+ surahs.**

Before planning any angles, build a surah inventory: a systematic mapping of every significant surah that features this entity, what the surah's argument is, and what role this entity plays in that argument.

For each surah (focusing on the most prominent, usually 5-10 even if the entity appears in more):

| Surah | Surah's Central Argument | What Moment This Surah Takes | Why — What the Surah Needs From This Character |
|---|---|---|---|
| e.g., Ta-Ha | Prophetic commission — the experience of being chosen for an impossible mission | The burning bush + divine call | Ta-Ha needs the moment of selection: a person who feels unworthy being told they've already been chosen |
| e.g., Al-Qasas | Divine providence operating through time and opposition | Birth → exile → return (full biography) | Al-Qasas needs the long road: providence visible only in retrospect, the plan working through its own obstacles |

**Rules for building the inventory:**
1. The "Why" column is the most important. Identify what each surah's thesis *requires* from this character — not just what events appear in it.
2. If two surahs take the same moment, note what each surah emphasizes differently. The difference is the angle.
3. Absence is data: if a major event in the character's story never appears in a particular surah, ask why.
4. When you cannot retrieve a surah thesis from the DB, reconstruct it from the surah's name, opening, and dominant theme.

**Angle generation from inventory:**
After completing the table, scan it for:
- **Contrast rows**: two surahs that take the same character to different places — that contrast is an article
- **Systematic omission**: something central to the character that no surah foregrounds — why?
- **Single-surah deep dives**: a surah that takes an unusual or unexpected moment — why does *this* surah need *this* moment?
- **Cross-surah architecture**: if the character appears in 30+ surahs, what is the aggregate portrait? How does the distributed telling construct something no single surah could?

**The surah inventory is the primary source for article angles.** Framework application (literary voices, Dr. Samir's principles) happens *after* identifying the angles — it determines *how* to write them, not *what* to write about.

---

## Step 1.6: CROSS-ENTITY ANGLE CHECK

After the surah inventory, run one more check using the co-occurrence data from Step 1:

Take the top 3-5 co-occurring entities and ask for each:
- What is the relationship between this entity and the primary entity?
- Is there a structural contrast (Musa and Yusuf — distributed telling vs. linear biography)?
- Is there a thematic parallel (Musa asking Allah to expand his chest; Ibrahim asking Allah to show him resurrection)?
- Is there a dependency (Musa's story structurally requires Bani Isra'il; Firaun is the counter-force without which the narrative doesn't move)?
- Has this relationship already been covered in existing articles? (If not, flag it as a cross-entity angle candidate)

Cross-entity angles are not required in every batch, but at least one per batch should be considered. A relationship angle is often the most distinctive and least covered angle in the entire space.

---

## Step 2: PLAN

### Article Count
- **Minimum 3 articles** per entity for a meaningful synthesis
- **Ideal: 4-6 articles** covering different angles
- Each article should stand alone but contribute to a cohesive whole

### Angle Strategy

**Source of angles — in priority order:**

1. **Surah inventory** (Step 1.5) — angles derived from "what does surah X need from this character, and why?" These are the most texturally grounded angles.
2. **Cross-entity relationships** (Step 1.6) — angles that require holding two characters' footprints simultaneously.
3. **Framework application** — literary voices and Dr. Samir's principles applied to specific moments identified in the inventory.
4. **Generic angle types** (table below) — use as a checklist to ensure coverage breadth, not as a primary ideation source.

Inventory-derived angles will usually be more specific and more surprising than generic angle types. If you're reaching for a generic type without grounding it in a specific surah's argument, return to the inventory.

Common angle type patterns (use as coverage checklist):

| Angle Type | Example (Shaytan) | Example (Isma'il) |
|---|---|---|
| Core profile / overview | "The Psychology of Shaytan" | "Who Is Isma'il in the Quran?" |
| Methodology deep-dive | "The Footsteps of Shaytan" | "The Architecture of Submission: How Isma'il Consented" |
| Key Quranic scene | "Shaytan's Promise (Surah Ibrahim 14:22)" | "The Sacrifice of As-Saffat: What Happened on the Mountain" |
| Relationship / alliance | "The Alliance of Iblis and the Nafs" | "Ibrahim and Isma'il: A Father-Son Theology" |
| Semantic deep-dive | "The Weapons Against Waswasa" | "Sabr When the Blade Is Real" |
| Legacy / absence | "What the Quran Doesn't Say About Shaytan" | "Isma'il and the Ka'bah: Architecture as Worship" |
| Narrative scene (Dillard) | "Shaytan's Refusal: The Syllogism in the Garden" | "The Sacrifice: A Father Asks His Son's Permission" |
| Dialogue analysis | "The Trial of Iblis: Who Speaks Last" | "Do What You Are Commanded: Isma'il's One-Line Answer" |
| Surah-argument deep-dive | "What Ash-Shu'ara Needs From Musa" | "Why Al-Qasas Begins at Birth, Not the Burning Bush" |
| Cross-surah distributed portrait | "Shaytan Across Seven Surahs: What Changes Each Time" | "Ibrahim and Isma'il in Al-Baqarah vs. As-Saffat" |
| Cross-entity contrast | "Musa and Yusuf: Two Kinds of Return" | "Ibrahim and Isma'il vs. Ibrahim and Ishaaq: What Changes" |

Mapping rule: Before committing to a set, write down the angle type and the **primary question** each article answers. If two articles answer the same question differently, that's redundancy — collapse them or replace one with a different angle type.

**Ayah-level tadabbur note:** Where ayah-level tadabbur exists for the relevant surahs, mine it for micro-level observations (unusual word choices, grammatical shifts, what's foregrounded within a single verse). These often unlock the most specific and original angles. For entities where tadabbur hasn't been generated yet, the surah inventory is sufficient — but note in the backlog which surahs' ayahs would be worth prioritizing for future tadabbur generation.

### Entity Tag Plan
Before writing, map out entity tags for each article:
- **Primary tags**: The main entities the article is _about_ (drives hub page listing)
- **Secondary tags**: Entities mentioned or relevant but not the focus
- Every article MUST have the target entity as a primary tag
- Cross-tagging to related entities creates the knowledge graph connections

---

## Step 3: WRITE

### Article Format

Articles are stored as `content_html` in the `posts` table. Use this structure:

```html
<article class="prose-blog">
  <p class="text-lg leading-relaxed">{opening paragraph — hook the reader}</p>

  <p>{body paragraphs}</p>

  <h2>{section heading}</h2>

  <!-- Ayah quotes use this exact structure -->
  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      {Arabic text — MUST be exact Quranic text}
    </p>
    <p class="translation">{English translation}</p>
    <cite>{Surah Name} ({surah_number}:{ayah_number})</cite>
  </blockquote>

  <p>{analysis of the ayah}</p>
</article>
```

### Writing Rules

1. **Arabic text**: Every Arabic quotation MUST be exact Quranic text. Never paraphrase Arabic.
2. **Transliteration**: Use consistent transliteration (e.g., Shaytan not Shaitan, taqwa not taqwā).
3. **References**: Always cite surah name + number:ayah (e.g., "Surah Al-A'raf (7:16-17)").
4. **Length**: See Length Calibration below. Target: 9-12 minutes for most articles.
5. **Originality**: Don't repeat the same ayahs across articles in the same batch. Each article should surface different Quranic evidence.
6. **No hadith** unless specifically requested — the platform focuses on Quranic text.
7. **Entity linking**: When mentioning other entities that exist in the system, note them for tagging.

### Length Calibration

Target reading time is **9-12 minutes (roughly 1,800-2,400 words)** for most articles. The outer bounds (8 and 15 minutes) are rarely the right choice.

| Situation | Target | Reason |
|---|---|---|
| Semantic deep-dive (one word/root) | 8-10 min | Density substitutes for breadth — each paragraph yields more per word |
| Scene-based article (Dillard model) | 10-13 min | Needs room to breathe: describe the scene, then analyze, then reflect |
| Multi-scene or legacy article | 11-14 min | Multiple Quranic passages must each receive real treatment |
| Relationship/theology article | 9-11 min | Focused argument, 3-4 sections is enough |

**Hard rule: if you're over 14 minutes, the article is doing two things.** Identify the second thing and cut it or save it for a separate article.

**Hard rule: under 8 minutes is usually underdeveloped**, not concise. Ask: is each ayah actually analyzed, or just quoted? Is each section earning its place?

### The Opening Paragraph

The opening paragraph has one job: **get the reader into the material before they can decide whether to keep reading**. It must not:
- Announce the article's thesis ("In this article, we will explore...")
- State a general truism ("Sabr is one of the most important qualities in Islam")
- Begin with the entity's name and a biographical summary

It must:
- Drop the reader into a specific detail, tension, or observation — linguistic, narrative, or textual
- Earn the `class="text-lg leading-relaxed"` distinction by being genuinely more substantial than what follows
- Leave one thing unresolved that the article will answer

**Pattern 1 (Scene):** Open on the physical or narrative detail and let the reader see it before you name it.
> "The sacrifice narrative in Surah As-Saffat is one of the most compressed scenes in the Quran. A father and a son. A dream. A conversation. A decision."

**Pattern 2 (Tension in the text):** Open on something the Quran does that seems strange until it doesn't.
> "Ibrahim does not act unilaterally. He tells his son about the dream and asks what he thinks. A prophet who has received a divine command—asking his son's permission."

**Pattern 3 (Root anomaly):** Open on a linguistic observation that immediately unsettles a familiar concept.
> "The Quran's vocabulary of *sabr* spans hundreds of ayahs. Isma'il promised it and delivered it. But his *sabr* is unlike every other instance — because it is not patience over time. It is patience in a single moment."

Pattern 3 works best for Izutsu-model articles. Patterns 1 and 2 work best for Dillard and Berger models. Do not mix patterns within an opening paragraph.

---

### Literary Voice Framework

The voice of AyahGuide articles is the voice of intellectual discovery happening in real time — the reader watching meaning emerge from the Arabic text, not being told what to think about it. The tadabbur content (in `content/tadabbur/`) is the reference standard: root-tracing as methodology, absence as data, evidence before interpretation. Articles must match this standard.

#### Anti-Patterns — Eight Patterns to Eliminate

**1. Negation Cascade** — "Not X, not Y, but Z" / "He doesn't... He doesn't... He..."
- BAD: "His rebellion is intellectual, not emotional. He doesn't rage blindly. He constructs arguments."
- GOOD: "His refusal arrives as a syllogism — he cites material composition, names Adam's clay, derives a hierarchy. The rebellion wears the grammar of proof."
- RULE: Maximum one negation construct per section (between `<h2>` tags). When a second appears, rebuild around the affirmative.

**2. Declarative Hammering** — announcing importance
- BAD: "This matters enormously." / "This is critical." / "This is the first and most foundational insight."
- GOOD: Delete the sentence entirely. If the evidence is strong, the reader feels the weight. If they don't, strengthen the evidence.
- RULE: Delete every sentence whose sole function is telling the reader how important something is.

**3. Forced Staccato** — short fragments manufactured for gravitas
- BAD: "Two sentences. Two truths. First:"
- GOOD: "He calls the barrier *rahma* and in the same breath announces its destruction."
- RULE: Never write a sentence whose only content is a count or label for what follows.

**4. Rhetorical Scaffolding** — narrating your analytical process
- BAD: "Notice what happens here." / "Pay close attention to..." / "There are several layers to unpack." / "Let me show you why this matters."
- GOOD: Delete the sentence and begin the analysis directly.
- RULE: Never announce your own analytical process. Never instruct the reader to pay attention.

**5. Bold-as-Emphasis** — wrapping thesis statements in `<strong>` to simulate a raised voice
- BAD: `<strong>his rebellion is intellectual, not emotional</strong>`
- RULE: Reserve `<strong>` exclusively for Arabic terms, ayah references, and proper nouns. Never bold an interpretive claim.

**6. Template Formula** — coining a catchy phrase and branding it as "the template"
- BAD: "This pattern — correct observation, corrupt conclusion — is the template for every whisper."
- GOOD: Describe the mechanism each time it appears using the specific evidence of each instance. Patterns become visible through repetition, not through naming.

**7. Direct Address as Pressure** — overusing "you" for emotional force
- BAD: "He comes at you with reasons." / "how he operates on you"
- RULE: Second-person address is permitted but must be earned. Maximum twice per article, at moments of genuine existential weight. Let the reader enter the frame voluntarily.

**8. Connector Phrases as Transitions**
- BAD: "And this is exactly how..." / "And here's the thing..." / "And this is where it gets interesting..."
- RULE: Let paragraph breaks carry transitions. If two ideas need a bridge, build it from evidence.

#### Six Literary Models — Choose Per Article Type

Different article types channel different writers. This is where dynamism comes from — articles are unified by intellectual rigor but varied in voice.

1. **Guy Davenport** — for linguistic deep-dives. Microscopist precision. Every detail observed, nothing announced. Present three pieces of linguistic evidence in sequence without editorializing; let the fourth reframe the previous three. Use when the primary substance is "look at what this Arabic root does."

2. **John Berger** — for thematic/philosophical articles. The essay as seeing. Berger teaches you to look at what you've been looking past. Warm but never sentimental. Begin with a concrete observation (an image, a scene, a physical detail) and expand outward toward the universal. Use for articles exploring themes across surahs, spiritual psychology, or connecting Quranic concepts to lived experience.

3. **Maggie Nelson** — for contemplative/meditation articles. Fragment as form. Builds through accumulation of honest observations rather than thesis-and-support architecture. Em-dashes as primary punctuation, short paragraphs because each thought is complete, willingness to say "I don't know." Use for articles about the experience of reading the Quran.

4. **Toshihiko Izutsu** — for semantic field articles. The discipline of semantic analysis without academic dryness. Juxtapose two words English translates identically and show the chasm between them — exactly as the tadabbur does with *hamd* vs. *shukr*. Use for articles organized around a single Quranic term (*zulm*, *taqwa*, *sabr*).

5. **Annie Dillard** — for narrative/scene-based articles. Unflinching attention to a single Quranic scene until it yields meaning. Describe the scene before analyzing it — let the reader see it first, then name what they just saw. Use for articles built around one Quranic episode (Ibrahim's fire, Musa at the burning bush, the Adam narrative).

6. **James Baldwin** — for moral urgency articles. Moral clarity without preachiness. The paragraph that turns the mirror — never "them," always "we." Use for articles about accountability, the Day of Judgment, or contemporary moral questions through a Quranic lens.

#### Narrative Analysis Framework (for story/character articles)

When writing about Quranic narratives — prophet stories, parables, historical figures, unnamed characters, or dialogues — apply these analytical principles derived from Dr. Samir Mahmoud's methodology and classical Quranic scholarship.

**Scope of "Quranic narrative":**
- Prophet stories (Musa, Ibrahim, Yusuf, Nuh...)
- Parables/mathal (two garden owners in Al-Kahf, village in Ya-Sin)
- Historical figures (Fir'awn, Qarun, Dhul-Qarnayn, Luqman)
- Unnamed characters (People of the Cave, the man who passed a ruined town)
- Dialogues (Iblis with Allah, angels about Adam, Musa and Khidr)

**1. Vertical vs. Horizontal Axis**
Analyze events not just through horizontal causality (A leads to B) but through their vertical connection to divine names and the unseen. A "horizontal" reading asks what happened next. A "vertical" reading asks what divine attribute is being demonstrated through this moment. Every narrative article should identify which divine name or attribute the story enacts — not as a concluding flourish, but as the structural spine of the analysis.

**2. Character Orientation: Being vs. Having**
Characters in the Quran are defined by their internal orientation. The garden owner in Al-Kahf is defined by *having* (possessions, wealth, status). The Fitya (youth of the Cave) are defined by *being* (spiritual state, proximity to God). When analyzing a character, determine their axis: do they act from accumulation or from essence? This distinction generates more insight than biographical summary.

**3. Pronoun Shifts (Iltifat) as Data**
The Quran shifts between first, second, and third person — sometimes mid-ayah. These shifts are not stylistic flourishes. They alert the reader to different modes of relating to the text: being addressed directly, witnessing from outside, being drawn into the scene. When a pronoun shift occurs in a narrative, name it and analyze what it does to the reader's position.

**4. Value the Gaps (Narrative Ellipsis)**
What the Quran omits from a story is as deliberate as what it includes. The absence of historical detail is the Quran distilling events to their archetypal core. When writing about a narrative, identify what is conspicuously absent — names, timelines, geographical details, motivations — and treat each absence as a choice that reveals what the Quran considers essential versus incidental.

**5. Theological Enactment, Not Statement**
The strongest narrative articles show how a story *enacts* a theological truth rather than simply stating it. Khidr's three actions don't just *tell* Musa about hidden wisdom — they *demonstrate* Al-Hakim (The All-Wise) in real-time. Ibrahim doesn't just *claim* tawakkul — the fire scene *is* tawakkul under the most extreme conditions. Always ask: what divine attribute is being performed, not just referenced?

**6. Dialogue Analysis**
When the Quran records dialogue, pay attention to:
- Who speaks first and who gets the last word
- What a character does NOT say (silence as data)
- Word choice differences between speakers (e.g., Musa's questions vs. Khidr's explanations)
- Progression of agency — in the Musa-Khidr story, the attribution shifts from "I intended" to "we intended" to "your Lord willed"

**7. Cross-Story Architecture**
When multiple stories appear in one surah (Al-Kahf, Al-Anbiya, Ash-Shu'ara), analyze the architectural logic of their arrangement:
- What structural parallels exist between stories?
- Is there a progression (escalating scale, different spheres of trial)?
- What themes or words recur across all stories in the surah?
- Al-Kahf example: four stories cover four spheres — moral/spiritual (Cave), economic (Gardens), epistemological (Musa-Khidr), socio-political (Dhul-Qarnayn)

**8. Time as a Literary Device**
The Quran compresses and expands time deliberately. Centuries pass in a single ayah (the sleepers in the Cave). A single moment stretches across multiple ayahs (Ibrahim's dialogue with his son before the sacrifice). When writing about narrative, note when the Quran speeds up or slows down — the pacing reveals what matters.

**9. Repetition with Variation**
Stories like Musa's are told across multiple surahs, but each telling emphasizes different elements and serves different rhetorical purposes. When writing about a character who appears in multiple surahs, note what changes between tellings and why — this is not redundancy but progressive revelation.

**Sources for narrative methodology:** Dr. Samir Mahmoud (Surah Al-Kahf lecture series), Al-Ghazali (knowledge and dreams), Ar-Razi (human visuality), At-Tabari (historical traditions). Key terms: *qass/qassa* (shadowing/following footsteps), *ta'wil* (unfolding hidden reality vs. *tafsir* outward interpretation), *ilm al-ladunni* (gifted/god-given knowledge), *tamkeen* (divine establishment).

#### Eight Voice Principles

1. **Root-Tracing as Methodology.** The primary analytical engine is showing how Arabic roots generate meaning. Every article uses root-tracing rather than declarative assertion. Show the root, trace its concrete origin, demonstrate how that origin informs the abstract usage.

2. **Absence as Data.** When the Quran omits something, that omission is a choice. Note what is absent, present what is present, and let the reader feel the gap. The tadabbur's "absence flags" system carries into articles.

3. **Evidence Before Interpretation.** Present the Arabic, show the morphological reality, lay out the textual evidence — THEN offer interpretation. Never lead with an interpretation and find supporting evidence afterward.

4. **Sequential Revelation.** Each paragraph adds exactly one new piece of information or insight. The reader should feel the argument accumulating like bricks, each one placed deliberately.

5. **Sonic Awareness.** When discussing an Arabic word, acknowledge its sound when relevant. The doubled *kaf* in *dakka'* is percussive. The *sin-fa* combination in *tasfikun* sounds like blood hitting stone. Phonetic quality is data.

6. **Trust the Reader.** Never explain why something matters. Present the evidence and let the reader feel its weight. If the reader doesn't feel it, the evidence needs strengthening — not amplification through declarative statements.

7. **Punctuation as Pace.** Em-dashes for asides and apposition. Periods for finality. Colons only for introducing Arabic text or quotations. No exclamation points. The pace should feel measured, deliberate.

8. **Metaphor from the Concrete.** Draw metaphors from the physical world — gardening, architecture, geography, craft, weather — rather than from abstraction. A root that means "rope" teaches more than a paragraph about "connection." The concrete image does the work.

#### Negation Rules

1. **One-Per-Section Rule.** Maximum one negation construct per section (between `<h2>` tags). This is the hardest rule and the most transformative.
2. **Quranic Exception.** When the Quran itself uses negation (*la taqrabu*, *la yasma'una*), the negation may be discussed freely. The rule applies to the writer's own constructs, not the text being analyzed.
3. **Replacement Discipline.** For every negation deleted, write what IS happening. "He doesn't rage blindly" → "His refusal arrives as a syllogism."
4. **Negation Audit.** After drafting, count these tokens: "not," "doesn't," "never," "isn't," "no " (with trailing space), "don't." A 2000-word article should have fewer than 10 total (excluding Quranic quotations and translations).

### Internal Linking

When an entity mentioned in the article body exists as a hub in the system, link to it. This builds the knowledge graph for users navigating the site, not just for SEO.

**Rules:**
- Link an entity **the first time it appears** in the article body — not every mention
- Link format: `<a href="/hub/{entity-slug}">{entity name as written in prose}</a>`
- Anchor text must be natural prose — use the name as it appears, not a keyword-stuffed phrase
- Never link from inside a blockquote or `<cite>` tag
- Entity hub links use `/hub/{slug}`. Article links use `/posts/{slug}`.

**What to link:**
- Prophets and people who have hub pages (Shaytan, Ibrahim, Musa, etc.)
- Concepts that have their own entity (if *tawakkul* or *sabr* are hub entities, link on first use)
- Do NOT link every Arabic word — only entities with a hub page

**Example:**
```html
<!-- Good -->
<p>The sacrifice narrative connects <a href="/hub/ibrahim">Ibrahim</a> to his son through a test that is explicitly shared — the trial belongs to both of them.</p>

<!-- Bad — every mention linked, reads as spam -->
<p><a href="/hub/ibrahim">Ibrahim</a> tells <a href="/hub/ismail">Isma'il</a> about the dream. <a href="/hub/ismail">Isma'il</a> responds with sabr.</p>
```

After drafting, do a single pass to identify entity mentions and add first-occurrence links. Note these entities in the `entityTags` plan as secondary tags even if they're already linked.

---

### Step 3c: BRAND CHECK (run after Voice Check, before Validate)

Open `docs/brand-guidelines.md` and run through the Brand Check Checklist on every article's `content_html`. Fix any violations before proceeding to Step 4.

Key things to catch:
1. **Arabic font**: every `<p class="arabic" dir="rtl">` must have `style="font-family: var(--font-amiri);..."` — not a hardcoded font name
2. **Blockquote structure**: every ayah quote must be `<blockquote class="ayah-quote">` with the canonical 3-child structure (arabic `<p>`, translation `<p>`, `<cite>`)
3. **Cite format**: `<cite>Surah Name ({surah}:{ayah})</cite>` — the `{N}:{N}` pattern is required for inline grounding to fire
4. **No `<strong>` on interpretive claims** — only on Arabic terms, proper nouns, ayah references
5. **Color**: Arabic text color in blockquotes must be `rgba(201, 168, 76, 0.85)` — not a Tailwind class, not a different hex

---

### Step 3b: VOICE CHECK (run between WRITE and VALIDATE)

Before running the 3 content validators, run these voice checks on the content_html:

1. **Negation audit**: Count negation tokens. Threshold: < 10 per 2000 words (excluding blockquote content).
2. **Anti-pattern grep**: Search for these phrases and remove them:
   - "This is critical" / "This is important" / "This matters"
   - "Notice what happens" / "Pay close attention" / "Pay attention to"
   - "There are several layers" / "layers to unpack"
   - "And this is exactly" / "And here's the thing" / "And this is where"
   - "Let me show you" / "Let's explore" / "Let's look at"
3. **Bold audit**: Every `<strong>` tag must wrap either an Arabic term, a proper noun, or a Quranic reference — never an interpretive claim.
4. **Scaffolding audit**: Search for "notice," "observe that," "it's worth noting," "importantly," "crucially," "significantly."
5. **Staccato audit**: Flag any sequence of 3+ sentences under 6 words each.

### Post Metadata

Each article needs:
```typescript
{
  title: string,           // Literary/display title — compelling, specific
  slug: string,            // SEO slug — see slug rules below
  type: 'article',         // Always 'article' for hub content
  excerpt: string,         // 1-2 sentence hook for article cards (NOT the meta description)
  seo_title: string,       // Search-optimized title — see SEO title rules below
  seo_description: string, // 150-160 char meta description — see SEO description rules below
  content_html: string,    // Full HTML content
  status: 'published',     // Or 'draft' if not ready
  tags: string[],          // String tags (legacy, keep for backward compat)
  reading_time_minutes: number,
  featured: false,         // Unless specifically requested
  published_at: new Date().toISOString(),
  created_by: '{admin_user_id}'  // Required — get from profiles table
}
```

---

### SEO: Title, Slug, and Description

The literary title and the SEO metadata are different documents serving different readers. The literary title is for the person already on the page. The SEO metadata is for the person who hasn't clicked yet.

#### Slug Rules

The slug is the URL and carries significant SEO weight. Structure: **`{entity-name}-{core-concept}`**

- Front-load the entity name: `ismail-sacrifice-quran`, not `the-son-who-said-do-what-you-are-commanded`
- Include the primary keyword: `shaytan-psychology`, `sabr-meaning-quran`, `ibrahim-kabah-building`
- Max 6 tokens. Shorter is better for sharing and recall.
- No stop words (the, a, an, in, of, and) unless they're load-bearing

| Display Title | Slug |
|---|---|
| "The Son Who Said: Do What You Are Commanded" | `ismail-sacrifice-consent-quran` |
| "The Patience of Isma'il: What Sabr Looks Like When the Blade Is Real" | `ismail-sabr-sacrifice-quran` |
| "Shaytan's Promise (Surah Ibrahim 14:22)" | `shaytan-promise-ibrahim-14-22` |
| "The Alliance of Iblis and the Nafs" | `iblis-nafs-alliance-quran` |

#### SEO Title Rules

`seo_title` goes into the `<title>` tag. It is separate from the display `title`. Rules:
- 50-60 characters (Google truncates at ~60)
- Format: **`{Core Concept} — {Entity Name} in the Quran`** or **`{Entity}: {Key Phrase} | AyahGuide`**
- Include the entity name explicitly — this is the page's primary keyword
- Include "Quran" or "Quranic" — this is the site's domain authority signal
- Do NOT use the literary display title as the SEO title unless it already satisfies the above

Examples:
```
"Ismail's Consent in the Sacrifice — Quran (37:102)"        ← 51 chars ✓
"Sabr in the Quran: Ismail's Moment of Stillness"           ← 49 chars ✓
"Shaytan in the Quran: Psychology and Method"               ← 44 chars ✓
"The Son Who Said: Do What You Are Commanded"               ← beautiful display title, bad SEO title ✗
```

#### SEO Description Rules

`seo_description` goes into the `<meta name="description">` tag and appears as the Google snippet. Rules:
- 140-160 characters (Google truncates beyond 160)
- Must contain: entity name, primary concept, one concrete detail from the article
- Written for the searcher's intent: "What will I learn if I click?"
- Do NOT reuse the `excerpt` — excerpts are written for the card design, not for SERP context
- End with a natural stop (not mid-sentence)

Pattern: **`{What this article explores} — {specific detail or question it answers}. A close reading of {key ayah reference}.`**

Examples:
```
"Isma'il's response to Ibrahim — 'do what you are commanded' — is the Quran's portrait of voluntary consent under the most extreme test. A close reading of As-Saffat 37:102."
→ 174 chars, trim: "Isma'il's response to Ibrahim — 'do what you are commanded' — is the Quran's portrait of voluntary consent. A close reading of As-Saffat 37:102."  → 145 chars ✓

"Sabr carries a root meaning of binding and restraint. Isma'il's patience — one moment, one choice, no chains — is unlike any other instance in the Quran."  → 155 chars ✓
```

#### Tags Rules

`tags` (the string array) become the keywords meta tag and are used for related article surfacing. Include:
- Entity slug (e.g., `ismail`, `shaytan`)
- Key concept slugs (e.g., `sabr`, `sacrifice`, `tawakkul`)
- Category tags (e.g., `quranic-characters`, `prophets`, `concepts`)
- Surah slug if the article is primarily about one surah (e.g., `as-saffat`, `al-baqarah`)

Target: 4-7 tags. More than 7 dilutes the signal.

---

## Step 4: VALIDATE

**MANDATORY** — Every article with Quranic content must pass all 3 validators.

### 4a. Arabic Text Verification
```bash
# Create a temporary file with the article HTML, then:
node scripts/verify_arabic.mjs /tmp/article.html --scan
```
Checks: Every Arabic quotation matches the actual Quranic text.

### 4b. Morphology Verification
```bash
node scripts/verify_morphology.mjs /tmp/article.html
```
Checks: Root word claims, word form analysis, and grammatical assertions.

### 4c. Tafsir Cross-Reference
```bash
node scripts/cross_reference_tafsir.mjs /tmp/article.html
```
Checks: Interpretive claims align with classical scholarship.

### Validation Rules
- ALL 3 must pass before insertion
- If any fail, fix the content and re-run ALL validators (fixing one issue can introduce another)
- Never skip validation — even for "simple" articles
- Log validation results for audit trail

---

## Step 5: INSERT

Use a script pattern like `scripts/insert-articles.ts`:

```typescript
#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 1. Insert post
const { data: post } = await supabase
  .from('posts')
  .insert({ ...article, created_by: ADMIN_USER_ID })
  .select('id')
  .single()

// 2. Tag entities
for (const tag of entityTags) {
  const { data: entity } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', tag.slug)
    .single()

  await supabase.from('entity_tags').insert({
    post_id: post.id,
    entity_id: entity.id,
    is_primary: tag.is_primary,
  })
}

// 3. Refresh co-occurrence counts (after all articles inserted)
await supabase.rpc('refresh_entity_co_occurrence')
```

### Insertion Checklist
- [ ] `created_by` field is set (NOT NULL constraint)
- [ ] Entity slugs exist in `entities` table before tagging
- [ ] `is_primary` is true for the main entity, false for secondary mentions
- [ ] Run with env vars loaded: `set -a && source .env.local && set +a`
- [ ] Call `refresh_entity_co_occurrence` after all inserts to update the knowledge graph

---

## Step 6: AYAH QUEUE (Log Priority Passages — Do NOT Generate Tadabbur Here)

**Article writing sessions and tadabbur sessions are separate.** Generating tadabbur via `/quranic-tadabbur` is expensive in context and time. Do NOT invoke the tadabbur skill during article writing sessions — the context won't survive.

### When to Do Ayah Tadabbur

Ayah tadabbur records are generated in **dedicated tadabbur sessions**, not article sessions. The trigger is:
- User explicitly says "generate tadabbur for [entity]" or "do the ayah records"
- OR a hub entity has all its articles complete and synthesis done, and the user wants to enrich the Ayah Records tab

### What to Do in This Step (Article Sessions)

After inserting articles, scan each article for Quranic citations and log the **3-6 most important passages** to the backlog file under the entity's section:

```markdown
### Musa — AYAH QUEUE (tadabbur not yet generated)
- [ ] 20:11-14 (Musa at the burning bush — first revelation)
- [ ] 26:63 (Staff strikes the sea)
- [ ] 7:150 (Musa's anger on return — the tablets)
- [ ] 18:60-65 (Musa meets Khidr — start of the journey)
```

**Priority criteria:**
- Ayahs *central* to the entity's identity (appear in multiple articles OR are the defining moment)
- Ayahs that appear in 2+ articles from the same batch (high co-citation = high importance)
- Skip passing references — the sequential tadabbur project will cover those

**Deduplication rule**: Before logging, check:
```sql
SELECT id FROM ayah_records
WHERE surah_number = X AND ayah_start = Y;
```
If a record already exists → just add the entity tag, don't add to queue.

### Full Tadabbur Generation (In a Dedicated Session)

When the time comes to generate ayah records:
1. Read the entity's AYAH QUEUE from the backlog
2. For each passage: invoke `/quranic-tadabbur` skill
3. Run all 3 validators
4. Insert to `ayah_records` and tag to entity
5. Update backlog (check off the passage)

Target per tadabbur session: **5-10 passages** (each takes significant context).

---

## Step 7: SYNTHESIZE

After all articles are inserted, generate a hub synthesis — a cohesive overview that distills insights from ALL the articles into a single narrative.

### Synthesis Rules

1. **Read all published articles** for the entity first
2. **Synthesize, don't summarize** — the overview should feel like a new piece of writing that weaves together insights from the articles, not a bullet-point summary
3. **Structure with clear sections** — use `<h2>` headings that capture the key themes (e.g., "The Profile", "The Method", "The Limitation", "The Defense")
4. **Include Arabic** — key Quranic phrases that define the entity should appear in the synthesis
5. **Keep it readable** — 800-1500 words. This is the "front door" to the entity.
6. **Cross-reference** — mention connections to other entities where natural

### Synthesis Insertion

```typescript
await supabase
  .from('hub_synthesis_cache')
  .upsert({
    entity_id: entityId,
    synthesis_html: synthesisHtml.trim(),
    content_hash: `${entity_slug}-${articleCount}-articles-v1`,
    last_generated_at: new Date().toISOString(),
  }, { onConflict: 'entity_id' })
```

### When to Re-synthesize
- When new articles are added to an entity
- Update `content_hash` to reflect the new article count/version
- The synthesis should incorporate insights from ALL articles, not just new ones

---

## Step 8: VERIFY

After insertion, ayah records, and synthesis:

1. **Check the hub page** at `/hub/{entity_slug}`
   - Overview tab shows synthesis prose (no raw data, no glossary dump)
   - Articles tab lists all inserted articles with correct excerpts
   - Ayah Records tab shows the priority records just created (count > 0)
   - Connections tab shows co-occurrence links updated
2. **Check individual article pages** at `/posts/{article_slug}`
   - Entity tags render as colored badges
   - Related articles section shows cross-referenced content
   - **Inline ayah grounding**: Every `<blockquote class="ayah-quote">` with a matching published ayah_record should show a "✦ Linguistic insight" toggle that expands to show grounding from layer_a
3. **Check ayah record content** — verify tadabbur files saved to `content/tadabbur/` with correct frontmatter
4. **Build check**: `npx tsc --noEmit && npx next build`

---

## Quick Reference: Database Tables

| Table | Key Fields | Notes |
|---|---|---|
| `posts` | title, slug, type, content_html, status, created_by | `type: 'article'` for hub content |
| `entities` | slug, name_arabic, category, glossary_data | The knowledge graph nodes |
| `entity_tags` | post_id/ayah_record_id, entity_id, is_primary | Join table — links both articles AND ayah records to entities |
| `ayah_records` | surah_number, ayah_start, ayah_end, layer_a, status | Passage-level tadabbur records |
| `hub_synthesis_cache` | entity_id (unique), synthesis_html, content_hash | One synthesis per entity |
| `entity_co_occurrence` | entity_a_id, entity_b_id, count | Materialized view, refresh after inserts |

## Admin User ID

Current admin: `5814582a-9f09-473a-be6f-619c210cca8e` (verify via `profiles` table if unsure)

---

## Anti-Patterns (Don't Do This)

- **Don't skip validation** — even one wrong Arabic quote undermines credibility
- **Don't write all articles from the same angle** — diversity of perspective is the whole point
- **Don't dump glossary_data into the overview** — the synthesis replaces it
- **Don't insert without entity tags** — untagged articles are orphaned from the hub system
- **Don't forget `refresh_entity_co_occurrence`** — the connections graph won't update otherwise
- **Don't use `Math.random()` for anything** — use `crypto.randomBytes()` if randomness is needed
- **Don't include hadith references** unless explicitly requested
- **Don't forget the cite format in blockquotes** — must be `<cite>Surah Name, {surah}:{ayah}</cite>` or `<cite>Surah Name ({surah}:{ayah})</cite>` for inline grounding to detect it

---

## Inline Ayah Grounding (Automatic)

When an article contains `<blockquote class="ayah-quote">` with a `<cite>` tag referencing a surah:ayah, AND a published `ayah_records` row exists for that passage, the article page automatically enriches the blockquote with an expandable "Linguistic insight" panel.

### How It Works

```
Server (page.tsx)                          Client (ArticleContent.tsx)
─────────────────                          ──────────────────────────
1. getAyahGroundings(contentHtml)          4. useEffect: scan blockquotes
   → regex extracts cite refs              5. parseCiteRef(cite.textContent)
   → fetches matching ayah_records         6. findGrounding(groundings, ref)
   → extractGroundingExcerpt(layer_a)      7. inject toggle + panel into DOM
   → returns [{surah,ayah,title,html}]     8. event delegation for click toggle
2. Promise.all([relatedPosts, groundings])
3. <ArticleContent html={...} ayahGroundings={...} />
```

### Key Files
- `src/components/ArticleContent.tsx` — client component, replaces raw `dangerouslySetInnerHTML`
- `src/app/(public)/posts/[slug]/page.tsx` — `getAyahGroundings()` + `extractGroundingExcerpt()`

### Excerpt Rules
- Pulls first **2 insights** from `layer_a.linguistic_html` (split by `###` headings)
- Each insight: section title (bold) + first content paragraph
- Truncated to ~160 chars per insight (sentence-break preferred)
- No extra network requests on click — all data preloaded server-side

### CSS Design
- Toggle: full-width, gold border, 44px min-height (iOS touch target), chevron rotates on open
- Panel: `max-height` transition (0 → 800px), gold-tinted background, 13px body text
- Mobile: `@media (max-width: 480px)` adjusts padding and font sizes
- Resets `font-style: normal` to prevent blockquote italic inheritance

### For This to Work, You Need:
1. Article blockquotes must use `class="ayah-quote"` and include a `<cite>` with `{surah}:{ayah}` pattern
2. A published `ayah_records` row must exist with matching `surah_number`, `ayah_start`, `ayah_end`
3. The record's `layer_a` JSONB must have a `linguistic_html` field with `###`-headed sections
