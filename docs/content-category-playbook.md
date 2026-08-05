# AyahGuide Content Category Playbook

*How to build articles for each category of the corpus. Read this before starting any batch.*
*Created 2026-08-04, after the first divine-names batch exposed that the site had no model for categories beyond "entity hub".*

---

## 1. The three layers

Every category on the site resolves into the same three layers. Naming them fixes what used to be improvised per-category.

| Layer | Job | Complete? | Price |
|---|---|---|---|
| **Index** | Show the whole territory, including what's *not* covered yet | Must be complete from day one | Free, always |
| **Entry** | One searchable, self-contained article per item | Grows over time | Free, always |
| **Depth** | Course-shaped treatment: full occurrence map, adab, contemplation | Rare, deliberate | Premium candidate |

Two rules that follow:

1. **The Index is complete before the Entry layer is.** `/surahs` listed all 114 long before all 114 had real pages. Do the same for names, characters, and states. An honest "not yet written" is an asset — it shows the shape of the work and it is the SEO surface for the plural query ("99 names of Allah", "prophets in the Quran").
2. **Never cripple the Entry layer to protect Depth.** A free article must fully answer the query it ranks for. Premium earns its price by being a *different genre*, not by being the same article with the ending removed. This is the trust brand; violating it costs more than it earns.

---

## 2. The two axes (why labels felt wrong)

An article has two independent properties, and the site was only modelling one:

- **SUBJECT** — what it is about → the entity and its category (`divine_names`, `quranic_characters`, …)
- **LENS** — how it is examined → the analytical mode

Because only SUBJECT was displayed, 117 of 217 published articles (54%) wore the same "Quranic Characters" chip, and every divine-name article wore "Theology & Ethics" because it was tagged to `tawhid`. The category was carrying a load it was never designed for.

**Fix applied:** `divine_names` added as its own category; label/style maps centralised in `src/lib/entity-categories.ts` (they had been duplicated across three files).

**Fix proposed, needs sign-off:** promote LENS to a controlled vocabulary. Today it lives in `tags`, which holds 335 distinct values across 217 articles — 189 of them used exactly once — because `tags` is simultaneously doing entity, surah, category, and genre. A closed lens list makes browsing meaningful and makes this playbook enforceable:

`scene` · `root-study` · `grammar-reveal` · `connection-reveal` · `cross-story` · `structure-nazm` · `name-breakdown` · `contested-doorway` · `rhetorical-device`

That list is not invented — it is the six literary models in the hub-article-pipeline skill plus the non-count lenses from the *diversify beyond wordcounts* steer.

---

## 3. The universal spine

Regardless of category, every article does this, in this order:

1. **Scan before writing.** Section 5. Non-negotiable — this is where the money is saved.
2. **Verify the substrate mechanically.** Match on **lemma**, not root, in `scripts/.corpus-cache/quranic-corpus.json`. (The root ن-و-ر returns 194 hits, but 145 are *nār*, fire. A root-level count would have published a false number.)
3. **Pull tafsir before drafting**, not to decorate afterwards: `node scripts/cross_reference_tafsir.mjs <file> --output <report>`. Build on what the mufassirūn actually say.
4. **Draft** against the voice rules in `.claude/skills/hub-article-pipeline.md`.
5. **Validate — all three, zero failures.** See section 6 for the traps.
6. **Publish** via `scripts/publish-article.ts`, confirm live + in sitemap.
7. **Log** in `scripts/article-backlog.md`, update `docs/knowledge-state.md`.

---

## 4. Per-category playbooks

The differences between categories are real: they differ in where good angles come from, what the failure mode is, and what the title has to do.

### Divine Names — `divine_names`

| | |
|---|---|
| **Angle sources** | Distribution facts. How many times, in what company, in what form. |
| **Best angles found so far** | Hapax (Ṣamad, 1×) · never-alone (Qayyūm 3×, always after al-Ḥayy) · rare-vs-common pair on one root (Ghafūr 91× vs Ghaffār 5×, *faʿūl* vs *faʿʿāl*) · recorded ikhtilāf (An-Nūr: Ibn ʿAbbās *hādī* vs al-Jalālayn *munawwir*) |
| **Failure mode** | Devotional generality. "Reflect on His mercy" is not an article. If the piece would survive deleting every number in it, it has no spine. |
| **Title rule** | **The name goes in H1, slug, and meta description.** Someone types "Al-Wadud meaning" before they have heard of us. Slug pattern: `<name>-divine-name-quran`. |
| **Adab guardrail** | Never let a name collapse into its created counterpart. Light, hearing, seeing all have physical namesakes; the tradition's discipline (Ibn ʿAbbās reading *nūr* as *hādī*) is itself article material. |
| **Ownership line** | See section 7. |

### Quranic Characters — `quranic_characters`

| | |
|---|---|
| **Angle sources** | The surah inventory — the same story told differently in different surahs is the richest seam on the site. Also: what the character *says*, dialogue order, what the Quran omits. |
| **Failure mode** | Biography. Retelling the story is not analysis; the reader can get the story anywhere. Also: **isrāʾīliyyāt** — if a detail is not in the Quran or a sound report, it does not appear. |
| **Title rule** | Character name in the title. It is the query. |
| **Depth candidate** | Yes — this is the course layer (Dawud pilot: modules 0–5, spine *awwāb*). |

### States of the Heart — `states_of_the_heart`

| | |
|---|---|
| **Angle sources** | Semantic-field work in the Izutsu mode: two words English translates identically, and the chasm between them. *Khawf* vs *khashya*. *Ḥubb* vs *wudd*. |
| **Failure mode** | Self-help. The state must stay anchored to the Arabic and to classical usage, not to modern wellbeing vocabulary. |
| **Title rule** | Lead with the experience, carry the Arabic term. The searcher may know either. |

### Theology & Ethics — `theology_and_ethics`

| | |
|---|---|
| **Note** | This is the junk drawer: 21 entities spanning creed (*īmān*, *tawḥīd*, *kufr*, *shirk*, *nifāq*), virtue (*iḥsān*, *ʿadl*, *birr*, *taqwā*), and social order (*ummah*, *shūrā*, *jihād*, *ṣadaqah*). Splitting it into `creed`, `character`, and `community` is the next taxonomy improvement — deferred because it touches `glossary.ts` and the DB together. |
| **Failure mode** | Drifting into fatwā. Tadabbur describes; it does not rule. Ikhtilāf stays visible. |

### Concepts of Existence — `concepts_of_existence`

| | |
|---|---|
| **Angle sources** | Root archaeology — the concrete, physical origin under an abstract word. *Rizq*, *qadar*, *ajal*, *nafs*. |
| **Failure mode** | Philosophy detached from text. Every move needs an ayah under it. |

### The Unseen — `the_unseen`

| | |
|---|---|
| **Angle sources** | What the Quran describes precisely vs. what it deliberately leaves blank. Absence is the data. |
| **Failure mode** | Speculation, and lurid detail. Restraint is the register the subject demands. |

### Nations & Peoples — `nations_and_peoples`

| | |
|---|---|
| **Angle sources** | The pattern across peoples — what every rejected messenger's people say. Structural repetition with variation. |
| **Failure mode** | Mapping ancient peoples onto modern groups. Do not. |

### Study Terms — `study_terms`

| | |
|---|---|
| **Angle sources** | Tier 5, "what the Arabic does" — iltifāt, naẓm, ring composition, single-point grammar choice. The most differentiated content on the site and the thinnest layer. |
| **Failure mode** | Claiming a device the classical sources do not name. If a reading is modern, label it a reading. |

---

## 5. The overlap scan — mandatory, before a word is written

The site is densely covered. **Assume overlap until proven otherwise.** The Al-Wadud case is the standing lesson: its headline corpus fact ("appears only twice, 11:90 and 85:14") was *already published* inside the Shuʿayb article as a passing aside. Caught only because article **bodies** were searched, not just titles.

Run all five. Titles alone will lie to you.

1. **Coverage map** — `docs/knowledge-state.md`: angles taken, threads open.
2. **Backlog** — grep `scripts/article-backlog.md` for the candidate.
3. **Published bodies** — dump `posts` (paginate; PostgREST truncates at 1000) and grep `content_html`, not just `title`.
4. **Reflections** — check `ayah_records` for the target ayahs. A live reflection page on the same ayah means take a different cut and cross-link.
5. **Glossary + hubs** — a name or concept is often already treated inside a *sibling* entry (Ar-Rahman inside `rahmah`, Al-Razzaq inside `rizq`, Ash-Shakur inside `shukr`).

Outcome of the scan is one of: **clear** → write · **adjacent** → write a different cut and cross-link · **taken** → pick another candidate and record why in the backlog.

---

## 6. Validation, and the traps that produce false passes

Tier 2 (articles with embedded ayahs) requires all three validators, zero failures. Two of them will hand you a *hollow pass* if you let them:

- **`verify_arabic`** matches **whole verses only.** A partial quotation returns NO MATCH. Quote the full ayah.
- **"diacritics differ" warnings are avoidable.** Write the Arabic from `QuranValidator.getVerse()` output rather than transcribing it; `scripts/.tmp/fix_arabic.mjs` rewrites a whole file in one pass. Target is exact matches, not warnings.
- **`verify_morphology` reports "0 claims found" as a pass.** That is not a pass — it means nothing was checked. Tag claims as `<!-- morphology:S:A:SEG root=<arabic-script> pos=X -->`, where **SEG is the flat 1-based segment index** inside the ayah, not the word index.
- **`cross_reference_tafsir` needs `[ayah:S:A]` tags** or YAML frontmatter; pointed at a bare HTML file it finds zero references and exits happily. Generate a refs file.
- **A fetch failure is not silence.** The report prints an explicit warning when a commentator could not be fetched. Never read that as "the commentator says nothing."

---

## 7. The ownership line (how categories avoid duplicating each other)

**Concept pages own the human state. Name pages own the divine attribute.**

| Concept entry | Name entry |
|---|---|
| `rahmah` — mercy as it moves through creation | **Ar-Rahman** — the Name |
| `tawbah` — the human return | **At-Tawwab** — His return |
| `shukr` — human gratitude | **Ash-Shakur** — the One who multiplies it |
| `rizq` — provision as lived reality | **Ar-Razzaq** — provision as identity |

Theologically correct, not merely convenient. Existing glossary entries keep their concept focus and gain a cross-link; nothing gets rewritten.

Same principle across categories: a character article owns the *narrative*, a state article owns the *interior condition*, a study-term article owns the *device*. When two would collide, the more specific one wins and the broader one links to it.

---

## 8. Free vs premium

Current standing decision: **keep building free.** Depth-layer work (prophet-story courses, name deep-dives) is *held*, not published, until the tier question is settled — it may yet ship free.

If it goes premium, the line is by **layer, never by category**: Index and Entry stay free forever; only Depth is ever paid. The classical warrant for the name deep-dive genre is al-Ghazālī's *al-Maqṣad al-Asnā* — each name carries a *ḥaẓẓ al-ʿabd*, a share of the servant: knowledge of the name, then its adab, then living with it. That is a different genre from the Entry article, which is what makes it saleable without holding anything back from the free layer.

---

## 9. Sequence for any new category

1. Add the entity category (migration; the enum is Postgres-side — `ALTER TYPE` cannot be run from the app's service-role key).
2. Register labels + styles in `src/lib/entity-categories.ts`.
3. Build the **Index** page and link it from Explore. Complete, with honest gaps.
4. Write **Entry** articles in batches of ~5, full scan each time.
5. Create entities only for items that have a published article — no hub is ever born empty.
6. Design **Depth** behind a review gate before writing it (the Sulayman pattern: design doc first, prose second).
