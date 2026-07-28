# Damaged Tadabbur Files — Content Loss Register

**Created:** 2026-07-24. These files were found during a frontmatter integrity audit.

They are **not** metadata problems. Each has a damaged, truncated, or missing reflection body.
Frontmatter was deliberately **NOT** auto-generated for them — completing the metadata would make a
broken file look finished, which is the exact failure mode of the June 29 enricher incident.

Each needs regeneration through the `/quranic-tadabbur` skill + all 3 validators. Do not hand-patch.

| Body size | File | Signal |
|---|---|---|
| ~~4.3KB~~ **15.5KB** | `content/tadabbur/039-az-zumar/ayahs-034-035.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Thematic half (ledger/Inward Mirror) preserved; linguistic journey rebuilt: unbounded *mā yashāʾūna* + ʿinda-address, purpose-lām *li-yukaffira* (Form II cover-root), and the **aswaʾ/aḥsan twin** — أَسْوَأ occurs exactly 2× in the Quran (39:35 + 41:27), same closing clause word-for-word, opposite superlative. Framed as the accounting mechanism behind 39:53. Validators: Arabic 2/2, morphology 14/14 + Leeds 15✓/0✗; Muyassar confirms tawbah-basis of the covering. |
| ~~2,514B~~ **29,169B** | `content/tadabbur/021-al-anbiya/ayahs-076-077.md` | ✅ **REGENERATED 2026-07-24** via `/quranic-tadabbur`. All 3 validators green (Arabic 2/2, morphology 16/16, tafsir report written). See note below. |
| ~~11,190B~~ **21.4KB** | `content/tadabbur/085-al-buruj/ayahs-001-009.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). ⚠️ This file was stamped **`validated: true`** while missing its entire front half — the clearest proof that the flag was not trustworthy. Now `validated: false`. Preserved Part 2 + Closing verbatim; built Introduction + 4 linguistic elements: *burūj* (sky-towers vs. the ditch — same word used for fortified towers in 4:78), *ukhdūd* (root خدد occurs only 2× in the Quran — the trench here, the scornful **cheek** in 31:18), Jalalayn's *qutila = luʿina* (imprecation, not report) and his detail that the watchers sat **on chairs**, and the ش-ه-د thread (shāhid/mashhūd → shuhūd) set up *without* stealing the shahīd reveal the preserved half lands. Plus the -ūd rhyme locking trench/fuel/sitting/watching into one sound. Validators: Arabic 9/9 exact, morphology 23/23, Leeds 25✓/0✗. Also deduped 35 stacked morphology tags (pre-existing defect, plus one block I added). |
| ~~13,585B~~ **28.1KB** | `content/tadabbur/003-aal-imran/ayah-009.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable/Opus, via skill). Preserved Element-Three-onward verbatim; built Introduction + Elements One–Two: *jāmiʿ* as **active participle** ("You **are** the Gatherer" — identity, not event) set against 3:25's verb *jamaʿnāhum* sixteen ayahs later; and *lā rayba fīh* — the categorical *lā*, whose exact masculine formula attaches in the Quran to only **two** things: the **Book** (2:2, 32:2) and the **Day** (3:9, 3:25). Validators: Arabic 1/1, morphology 8/8; one Leeds ✗ is the documented أنس/ناس checker bug. ⚠️ **Repaired a frontmatter-corruption I introduced mid-rebuild** — the original file's closing `---` sat *after* 5KB of prose, so my parser swallowed it into the YAML; spliced back with a line-by-line integrity assertion. |
| ~~3,191B~~ **21.5KB** | `content/tadabbur/044-ad-dukhan/ayahs-030-033.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Remnant was the surviving thematic half ("The Weight of Being Chosen") — preserved verbatim; Introduction + linguistic journey rebuilt (Form II najjaynā, muhīn/mubīn one-letter bookends, ʿālī vs double-ʿalā height contrast, ʿilm/ʿālamīn same-root). Validators: Arabic 4/4 exact, morphology 14/14 + Leeds 16✓/0✗, tafsir report written. Tafsir pass caught one divergence — al-Jalalayn's "worlds **of their time**" qualification on 44:32 — now incorporated. |
| ~~3,358B~~ **17.5KB** | `content/tadabbur/040-ghafir/ayahs-069-072.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Thematic half preserved verbatim; linguistic journey rebuilt: jidāl rope-root + Form III, the 2-active→3-passive verb machine (yuṣrafūn/yusḥabūn/yusjarūn), aghlāl lemma = **غِلّ** (chest-rancor → neck-iron, cf. 7:43). Verified: Ghafir's 5 jadal occurrences are the Quran's densest (next surah: 3). Validators: Arabic 4/4, morphology 16/16 + Leeds 18✓/0✗, tafsir aligned (Muyassar's yūqadu bihim = "fed as fuel"). |
| ~~4,983B~~ **31KB** | `content/tadabbur/044-ad-dukhan/ayahs-001-008.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). The "stub" was actually the surviving **closing synthesis** of the original (Jalalayn on Ḥā-Mīm, Ibn Ṣayyād account, Ṭabarī ikhtilāf on the night) — preserved verbatim; Introduction + Part 1 + Part 2 rebuilt to land on it. Validators: Arabic 8/8 exact, morphology 27/27 (Leeds 27✓/0✗), tafsir report written — al-Muyassar confirms the annual-decree reading (في تلك السنة) and Laylat-al-Qadr identification. |
| ~~10.8KB~~ **21.6KB** | `content/tadabbur/026-ash-shuara/ayahs-184-190.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Had **no frontmatter at all** (`---\n---`) and no Introduction/Part 1. Built both; preserved Parts 2–3, Distillation, Duʿā verbatim. Finds: **مُسَحَّر** (Form II passive participle) occurs exactly **2×** in the Quran — 26:153 (Thamūd→Ṣāliḥ) and 26:185 (Aykah→Shuʿayb) — the *identical sentence*, showing rejection follows a script; the ك-ذ-ب hand-back (*kādhibīn* accusation → *fa-kadhdhabūhu*); and Shuʿayb refusing the dare **without cursing** (*rabbī aʿlamu*). Sets up the preserved 'Shadow That Became Fire' — **ظُلَّة** also occurs only 2× (7:171 mountain-canopy, 26:189). Validators: Arabic 7/7 exact, morphology all verified, Leeds 28✓/0✗. |
| 7.7KB | `content/tadabbur/021-al-anbiya/ayah-096.md` | ⚪ **NOT DAMAGED — thin.** Assessed 2026-07-24: full structure present (Introduction, 3 linguistic elements, 2 themes, Closing, Questions, Distillation, Duʿā) and **all validators clean**. It is simply short (7.7KB vs 26KB corpus median). Belongs to the *enrichment* backlog (566 shallow files), not the damage register. |
| 8.4KB | `content/tadabbur/065-at-talaq/ayah-003.md` | ⚪ **NOT DAMAGED — thin.** Same assessment: complete structure, Arabic 1/1, morphology 8/8, Leeds 8✓/0✗. Enrichment backlog. |
| 9.1KB | `content/tadabbur/080-abasa/ayah-019.md` | ⚪ **NOT DAMAGED — thin.** Complete structure, morphology 3/3, Leeds 3✓/0✗. Enrichment backlog. |
| 8,771B | `content/tadabbur/003-aal-imran/_superseded/ayah-101.md` | body only 8,771B |

## Notes

- ✅ **`021-al-anbiya/ayahs-076-077.md` — DONE (2026-07-24).** The prior session's incident report was
  itself a usable spec (it recorded the intended anchors: `karb`, `nasara-min`, `ahl-as-belief-bonded`).
  Independent Step-0 analysis reached the same anchors, then went further:
  - *karb* occurs **only 4×** in the Quran; the full phrase *al-karb al-ʿaẓīm* exactly **3×** — Nuh
    (21:76), Nuh again (37:76), Musa & Harun (37:115). It is the Quran's reserved phrase for
    **rescue through water**.
  - *naṣara* + **min** (not the usual *ʿalā*) — rescue, not victory. **Confirmed by al-Jalalayn**, who
    glosses it مَنَعْنَاهُ, "We shielded him," not a word for conquest.
  - *wa ahlahu* — **confirmed by al-Muyassar** as *al-muʾminīna bihi*, "his family who believed in
    him," and al-Jalalayn as "those in his ship." Reinforced by Hud 11:46, where Allah tells Nuh of
    his own son: **"he is not of your family."**
  - Al-Jalalayn identifies the unquoted prayer with Surah Nuh 71:26; the reflection says so
    explicitly rather than implying the words are unknowable.
  - One Leeds flag (root ندي "absent" from 21:76) is a **verified false positive** — the corpus gives
    نَادَىٰ the root ندي, and `verify_morphology` passed the tag. Same bug class as the other ~197.
- 🚨 **`021-al-anbiya/ayahs-076-077.md` — THESIS DEFECT FOUND AND FIXED (2026-07-27).**
  The 2026-07-24 rebuild passed all three validators and was still **substantively false**. Its central
  claim — *"The Quran preserves exactly one prayer of Nuh in his own words, and it is the one that was
  refused"* — is refuted by 71:5, 71:21, 71:26, 71:28, 26:117-118, 23:26, 54:10, 11:45 and 11:47. The
  file even cited al-Jalalayn pointing at 71:26, the very verse that refutes it.
  **Lesson: mechanical validation cannot see a false thesis.** `verify_arabic`, `verify_morphology` and
  `cross_reference_tafsir` check citations, not claims. Any "regenerated from scratch" file needs a
  semantic read before it is marked done — passing validators is necessary, not sufficient.
  Thesis rebuilt on verified ground: *nādā* occurs **exactly 4× in Surah Al-Anbiya** — Nuh (76),
  Ayyub (83), Yunus (87), Zakariyya (89) — and three of the four are quoted verbatim while only Nuh's
  is left blank, because his words are distributed across other surahs. 21:76-77 then answers in the
  vocabulary of the requests: *najjinī* (26:118) → *najjaynāhu*; *unṣurnī... kadhdhabūn* (23:26) →
  *naṣarnāhu... kadhdhabū bi-āyātinā*, with the object of denial shifted from "me" to "Our signs".
  Also corrected: the old text called *naṣara ʿalā* the "overwhelming" pattern (it is 5× vs 4× genuine
  *naṣara min*). Replaced with the exhaustive, verified list — *naṣara + min* naming what one is pulled
  out of appears **4×** (11:30, 11:63, 40:29, 21:77), and **21:77 is the only one with a real subject**,
  the other three being rhetorical questions expecting the answer "nobody".
  Frontmatter now carries `semantic_review: "fixed-2026-07-27"`. Both validators re-run clean.
- **Stub sweep run corpus-wide:** `grep -rl "^## Changes Applied" content/tadabbur/` returns **0 files**.
  No other file has enricher notes in place of its body. That blast radius is closed.
- The original reflection at this path remains **irrecoverably lost** (corrupted before commit
  `a80be50`); what is there now is a fresh reflection, not a recovery.
- `003-aal-imran/_superseded/ayah-101.md` is in an archive directory — likely safe to ignore.
- `085-al-buruj/ayahs-001-009.md` was found by a separate scan for files whose **first heading is
  PART 2 / CLOSING** — i.e. the front half is gone. Worth re-running that scan after any enrichment batch.
- `026-ash-shuara/ayah-191.md` was checked and is **healthy** (full Part 1 present, just unheaded);
  it needs only a `title:` and is not listed here.
- Median healthy body size in this corpus is ~26,000B, so everything here is well below half.

## Status as of 2026-07-24 (end of session)

**12 files were opened. 9 were genuinely damaged and all 9 are rebuilt.** The remaining 3 turned out
not to be damaged at all — they are structurally complete and validator-clean, merely *thin*, and
belong to the enrichment backlog rather than here. One archived file under `_superseded/` is ignored
by design.

Every rebuilt file is left `validated: false`. The voice check is the human gate; policy is explicit
that automated systems cannot self-approve.

### A caution worth keeping

`085-al-buruj/ayahs-001-009.md` carried `validated: true` while missing its entire Introduction and
Part 1. Whatever set that flag was not looking at the body. Treat pre-2026-07 `validated: true` as
unverified until re-checked.
