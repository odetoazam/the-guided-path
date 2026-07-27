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
| 11,190B | `content/tadabbur/085-al-buruj/ayahs-001-009.md` | **front-truncated** — no Introduction, no Part 1; body opens at PART 2. Thin for a 9-ayah passage. Was already uncommitted-modified at session start, so likely damaged by the in-flight enrichment run. |
| 13,585B | `content/tadabbur/003-aal-imran/ayah-009.md` | **front-truncated** — body opens mid-sentence ("The *mifʿāl* pattern in Arabic…"), no Introduction, no Part 1, no ayah presentation. First heading is PART 2. |
| ~~3,191B~~ **21.5KB** | `content/tadabbur/044-ad-dukhan/ayahs-030-033.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Remnant was the surviving thematic half ("The Weight of Being Chosen") — preserved verbatim; Introduction + linguistic journey rebuilt (Form II najjaynā, muhīn/mubīn one-letter bookends, ʿālī vs double-ʿalā height contrast, ʿilm/ʿālamīn same-root). Validators: Arabic 4/4 exact, morphology 14/14 + Leeds 16✓/0✗, tafsir report written. Tafsir pass caught one divergence — al-Jalalayn's "worlds **of their time**" qualification on 44:32 — now incorporated. |
| ~~3,358B~~ **17.5KB** | `content/tadabbur/040-ghafir/ayahs-069-072.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). Thematic half preserved verbatim; linguistic journey rebuilt: jidāl rope-root + Form III, the 2-active→3-passive verb machine (yuṣrafūn/yusḥabūn/yusjarūn), aghlāl lemma = **غِلّ** (chest-rancor → neck-iron, cf. 7:43). Verified: Ghafir's 5 jadal occurrences are the Quran's densest (next surah: 3). Validators: Arabic 4/4, morphology 16/16 + Leeds 18✓/0✗, tafsir aligned (Muyassar's yūqadu bihim = "fed as fuel"). |
| ~~4,983B~~ **31KB** | `content/tadabbur/044-ad-dukhan/ayahs-001-008.md` | ✅ **FRONT-REBUILT 2026-07-24** (Fable, via skill). The "stub" was actually the surviving **closing synthesis** of the original (Jalalayn on Ḥā-Mīm, Ibn Ṣayyād account, Ṭabarī ikhtilāf on the night) — preserved verbatim; Introduction + Part 1 + Part 2 rebuilt to land on it. Validators: Arabic 8/8 exact, morphology 27/27 (Leeds 27✓/0✗), tafsir report written — al-Muyassar confirms the annual-decree reading (في تلك السنة) and Laylat-al-Qadr identification. |
| 6,947B | `content/tadabbur/026-ash-shuara/ayahs-184-190.md` | body only 6,947B |
| 6,986B | `content/tadabbur/021-al-anbiya/ayah-096.md` | body only 6,986B |
| 7,219B | `content/tadabbur/065-at-talaq/ayah-003.md` | body only 7,219B |
| 8,330B | `content/tadabbur/080-abasa/ayah-019.md` | body only 8,330B |
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
