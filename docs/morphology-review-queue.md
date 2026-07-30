# Morphology Review Queue

**Run date:** 2026-07-24. Source: `scripts/run-leeds-validation.sh` over all 3,024 tadabbur files.
Previous run (May 14) preserved at `scripts/leeds-validation-report-2026-05-14.md`.

## Headline

The checker reported **338 problems across 208 files**. After verifying every one of them against the
Leeds corpus data directly, **the overwhelming majority are checker misfires, not content errors.**

| Category | Count | Real problem? |
|---|---|---|
| Checker misfire — root/form **is** in the ayah | 197 | No — checker bug |
| Contrastive — essay explicitly says the verse does *not* use it | 83 | No — this is good teaching |
| Final-weak root spelling (و vs ي) vs corpus | 15 | Cosmetic only |
| Tag for an adjacent ayah, just outside declared range | 8 | Trivial |
| **Genuine content errors found and fixed** | **2** | **Yes — fixed** |
| Remaining, need a human read | ~33 | Unknown |

## Why the checker misfires so badly

Two independent bugs:

1. **It cannot tell assertion from negation.** Good tadabbur constantly explains what a verse *didn't*
   use in order to illuminate what it *did* — "Form VII would mean it was split, **but Allah uses Form
   V**." The checker sees the string "Form VII" and reports a false claim. 83 of the flags are this.
   These flags are firing on precisely the *best* writing in the corpus.
2. **It fails to find roots that are present.** e.g. it reported root أنس absent from 3:172–175, but
   the corpus gives ناس the root أنس — 241 times across the Quran, twice in 3:173. 197 flags are this.

**Consequence: this report cannot be used as a pass/fail gate as written.** Anyone burning it down
straight would "fix" ~280 things that were never broken, damaging good content. That is very likely
why the May run was never actioned.

## Genuine errors found and FIXED (2026-07-24)

1. **`071-nuh/ayahs-026-028.md`** — claimed *tabār* (تَبَارًۢا, 71:28) comes "from the root **b-w-r**".
   The corpus gives it root **ت-ب-ر**. Both roots mean ruin/perishing, which is how the slip happened,
   but the attribution was wrong. Fixed in prose and in the frontmatter root note.
2. **`001-al-fatiha/ayah-001.md`** — morphology tags written in Latin transliteration
   (`root=a-l-h`, `root=s-m-w`, `root=r-h-m`) instead of Arabic, making them invisible to every
   validator. Corrected to أله / سمو / رحم. Now passes `verify_morphology`. This was the **only** file
   in the corpus with this defect (4 tags out of 20,804).

## Third checker bug found (2026-07-24, second pass)

Reading `scripts/validate-morphology-leeds.mjs` explains the noise. It extracts a "claim" from **any**
hyphenated root (`ك-ت-ب`) or the bare string `Form X` anywhere in the file, with no awareness of what
the sentence is doing. So it fires on all three of the things good tadabbur does most:

1. **Contrastive teaching** — "Form VII *would* mean it was split, but Allah uses Form V."
2. **Generic grammar examples** — `034-saba/ayah-019.md` uses "the root ك-ت-ب, which means writing,
   can become *kataba*… *kattaba*… *kātaba*" purely to explain how verb forms work. It has nothing to
   do with 34:19. Flagged as a false claim.
3. **Variant readings (qirāʾāt)** — `029-al-ankabut/ayahs-058-059.md` correctly discusses the Kufan
   reading لَنَثْوِيَنَّهُمْ (root ث-و-ي) beside the Madinan/Basran لَنُبَوِّئَنَّهُمْ (root ب-و-أ),
   citing al-Ṭabarī. The Leeds corpus encodes Ḥafṣ only, so ث-و-ي is legitimately absent from it.
   Flagged as an error. **It is the opposite of an error — it is the most careful work in the file.**
4. **Cross-surah comparison** — `032-as-sajdah/ayah-025.md` compares 32:25 (يَفْصِلُ, root ف-ص-ل) with
   the near-identical 16:124 (يَحْكُمُ, root ح-ك-م), explaining why Allah chose a different verb in a
   surah built on *distinction*. The root ح-ك-م is correctly attributed to An-Naḥl. The checker knows
   only the file's own ayah range, so every cross-surah comparison reads as a false claim to it.

Note for anyone re-auditing: roots are usually written **hyphenated** in prose (`ح-ك-م`), so a plain
text search for `حكم` finds nothing. Search the hyphenated form or you will wrongly conclude the claim
does not exist in the file.

## Morphology TAG audit — the good news

Separately, every `<!-- morphology:s:a:w root=X -->` tag in the corpus was checked against the Quran
data: is the claimed root actually present in the claimed ayah?

**20,808 tags checked. 4 wrong (0.02%).** All four in `002-al-baqarah/ayahs-120-121.md`, and all four
were spelling conventions rather than factual errors — hamza written `ء` instead of `أ` (ءتي/ءمن),
plus جيء vs جيأ and رضي vs رضو. **Fixed** and re-verified.

This is the strongest evidence yet that the corpus is in good shape: the machine-checkable layer is
99.98% clean. **After the fix: 20,808 tags, 0 wrong.**

## Full-corpus `verify_morphology` run — now clean

Run across all 3,024 files (not just the unvalidated subset):

| Result | Files |
|---|---|
| PASS | 1,034 |
| FAIL | **0** (was 1) |
| No morphology tags to check | 1,994 |

The single failing file was `002-al-baqarah/ayahs-120-121.md` with 21 failed claims. It was **already
failing at HEAD** (21 fails, 0 verified) — not caused by this session's edits. Its root labels were
correct; its **word-position numbers** used a different counting scheme than the validator, which
counts flat token position (prefixes counted separately, so `وَ` and `لَن` are positions 1 and 2).
Positions recomputed from the corpus; roots left untouched. Now 21 verified, 0 failed.

**The whole corpus now passes `verify_morphology` with zero failures.**

Caveat worth keeping in view: 1,994 files have no morphology tags at all, so this validator has
nothing to check in them. "Zero failures" means nothing false was found — not that everything was
examined.

## Still needs a human read (~33)

Each needs someone to look at the sentence and judge. Not mechanically decidable.

- `029-al-ankabut/ayahs-058-059.md` — root ثوي (×2)
- `007-al-araf/ayahs-011-015.md`, `022-al-hajj/ayah-032.md`, `014-ibrahim/ayah-007.md` — root علم
- `032-as-sajdah/ayah-025.md` — root حكم
- `019-maryam/ayahs-022-026.md` — roots مكن, ليت
- `019-maryam/ayahs-016-021.md` — root أني (likely a particle with no corpus root — probably fine)
- `026-ash-shuara/ayah-220.md` — root رأي
- `014-ibrahim/ayahs-024-027.md` — root قلب
- `033-al-ahzab/ayah-032.md` — root معرو (looks like a truncated معروف — probably a typo in the tag)
- `028-al-qasas/ayah-069.md` — root سرر
- `043-az-zukhruf/ayah-044.md` — root دكر (vs corpus ذكر — likely dāl/dhāl typo)
- `034-saba/ayah-019.md` — root كتب
- `037-as-saffat/ayahs-040-049.md` — root معن
- `087-al-ala/ayahs-016-019.md` — root علو
- `051-adh-dhariyat/ayah-035.md` — root كرم
- `005-al-maidah/ayah-075.md` — root كذب
- `021-al-anbiya/ayah-083.md` — root دعو
- `056-al-waqiah/ayahs-035-038.md` — Form V
- `002-al-baqarah/ayahs-204-210.md` — root جهنم
- Latin-transliterated root claims in prose (not tags): `074-al-muddaththir/ayahs-039-041.md` (rhn),
  `047-muhammad/ayah-001.md` (alh), `031-luqman/ayah-031.md` (sbr), `070-al-maarij/ayahs-011-018.md`
  (ksb), `021-al-anbiya/ayah-037.md` (gfr) — these may be the same Latin-tag defect as Al-Fatiha,
  appearing in prose instead. **Check these first — likely a quick systematic fix.**

## Reviewed and cleared (no change needed)

`030-ar-rum/ayah-012.md`, `076-al-insan/ayah-023.md`, `046-al-ahqaf/ayah-002.md`,
`072-al-jinn/ayahs-014-015.md`, `059-al-hashr/ayah-021.md`, `003-aal-imran/ayah-048.md` — all read in
context; each is teaching the verb-form system or drawing an explicit contrast. The content is correct
and, in several cases, unusually good.

## Before the checker is used again

Fix `scripts/validate-morphology-leeds.mjs` to (a) resolve roots through the same corpus data the
other validators use, and (b) skip mentions inside a negation window. Until then its output is
~85% noise and must not gate anything.


---

# QUEUE CLOSED — 2026-07-24

All remaining flagged items were opened and read in context. Final disposition:

## Real errors found and FIXED (2 more, bringing the session total to 6)

1. **`043-az-zukhruf/ayah-044.md`** — prose read *"The root **د-ك-ر** carries, at its core, the idea of
   something being brought to mind."* The root of ذِكْر is **ذ-ك-ر** (dhāl), not **د-ك-ر** (dāl). One
   letter, but it is a factual claim about an Arabic root. Fixed → Leeds now 1✓/0✗.
2. **`033-al-ahzab/ayah-032.md`** — prose read *"The root **م-ع-ر-و-ف** — *maʿrūf* — comes from
   *ʿarafa*."* That string is the **word spelled out**, not a root; the root is **ع-ر-ف**, which the
   very same sentence then states correctly. Self-contradictory. Rewritten to
   *"The word *maʿrūf* is built on the root ع-ر-ف — from *ʿarafa*."* Leeds now 1✓/0✗.
   (The file's own frontmatter pruning-note already listed ع-ر-ف correctly — only the prose was wrong.)

## Everything else: dispositioned, no change needed

| Pattern | Files | Verdict |
|---|---|---|
| **Generic grammar teaching example** — "take the root ك-ت-ب…", "take the root ك-ر-م…" used to explain how verb forms work, nothing to do with the ayah | 34:19, 51:35, 5:75, 21:37, 28:69, 21:83 | Checker artifact. Correct as written. |
| **Cross-surah / adjacent-verse reference** — 87:16-19 citing *al-Aʿlā* from 87:1; 74:39-41 explicitly saying *"the verse directly before ours — 74:38"* | 87:16-19, 74:39-41 | Correct and well-signposted. |
| **Latin-transliterated roots in prose** (`k-s-b`, `s-b-r`, `a-l-h`) used as teaching examples | 47:1, 31:31, 70:11-18 | Prose only — **not** the Al-Fatiha tag defect. No morphology tags affected. Fine. |
| **Step 0 grounding-table rows for words the corpus assigns no root** — proper nouns and particles: مَرْيَم (PN), أَنَّىٰ (INTG), يَـٰلَيْتَ (particle), جَهَنَّم (PN) | 19:16-21, 19:22-26, 2:204-210 | The corpus lists these with **no root**, so any root given is an unverifiable derivation rather than a corpus fact. Low risk (internal tables, not reader-facing claims) but worth softening if these files are ever revised. Logged, not changed. |
| **In-range after all** — 37:40-49 claiming معن, which is present at 37:45 (*maʿīn*) | 37:40-49 | Checker range bug. Correct. |

## Bottom line

Of **338** problems the Leeds checker reported across the corpus, **6 were real**, and all 6 are now
fixed. The remaining ~332 are the four documented checker bugs: negation-blindness, root-resolution
failure, qirāʾāt-blindness, and cross-surah-blindness.

**The checker still must not be used as a pass/fail gate until it is repaired.** Its value is as a
*lead generator* for human review — which is exactly how it was used here.

---

# Tafsir report heading-offset — confirmed instances (2026-07-24)

Three independent enrichment agents found al-Tabari's or Ibn Kathir's commentary block
sitting under the wrong `## S:A` heading in generated tafsir reports. Hand-verified:

| Report | Defect |
|---|---|
| `003-aal-imran/tafsir-report-133-136.md` | al-Tabari offset by one — the block under `## 3:134` quotes 3:133 |
| `003-aal-imran/tafsir-report-118-120.md` | al-Tabari offset by one — his *bitanah* commentary sits under `## 3:119` |
| `005-al-maidah/tafsir-report-051.md` | Ibn Kathir offset **within the Al-Mumtahanah sections** — under `## 60:8` he pastes 60:9's Arabic, under `## 60:9` he comments on 60:7. al-Tabari and al-Muyassar are correctly aligned in the same file. |

Also observed: some reports repeat one truncated Ibn Kathir block under every heading
in the passage (e.g. `011-hud/tafsir-report-032-034.md` carries the same 11:32-anchored
text under 11:32, 11:33 and 11:34).

**Scale is unknown and deliberately not asserted.** Two attempts to count this
corpus-wide produced unusable numbers because the detector kept matching al-Tabari's
footnote and narration numbers rather than ayah markers. A reliable detector must key
on the ayah number that terminates his `القول في تأويل قوله … (NNN)` formula *and*
exclude footnote markers — until then, treat the scale as open.

## ✅ THE OFFSET DEFECT IS NOW MEASURABLE TOO (2026-07-27)

`scripts/detect_tafsir_offset.mjs` sidesteps the counting problem by **never parsing a
number**. It reads the Arabic each block actually quotes and asks which ayah of the
report's own passage contains it — the same method the enrichment agents use by hand.

Over 1,367 reports: **710 blocks in 302 reports quote an ayah other than their heading.**

| Commentator | Blocks |
|---|---|
| Ibn Kathir (English) | 526 |
| al-Tabari (Arabic) | 163 |
| al-Muyassar (Arabic) | 21 |

| Pattern | Count |
|---|---|
| off by exactly 1 **backward** (the classic signature) | 354 |
| off by exactly 1 forward | 69 |
| off by more than 1, same surah | 278 |
| points at a different surah entirely | 9 |
| **quoting nothing at all from their own heading ayah** | **686** |

**Read this as a lead list, not a hard count.** Known false-positive mode: a commentator
may legitimately quote the *previous* ayah while setting up the current one, and if he
quotes it more than the current one the block is flagged. The **686 that quote nothing
from their own heading ayah** are the defensible core. The 526 Ibn Kathir figure also
overlaps the duplicate-block measurement below, since a block pasted under every heading
is necessarily wrong under all but one.

Either way the operational conclusion is settled: **per-ayah attribution cannot be taken
from the heading in these reports.** List: `scripts/review-v2/tafsir-offset-blocks.json`.

## ✅ SCALE NOW MEASURED for one sub-class (2026-07-27)

The *offset* defect still resists counting. But the **duplicate-block** sub-class —
one commentator's block repeated **identically under every `## S:A` heading** in a
multi-ayah report — needs no ayah-number parsing at all, so it is exactly countable:

| Measure | Value |
|---|---|
| Multi-ayah tafsir reports | 800 |
| Reports with a source block identical under every heading | **314 (39.2%)** |
| — Ibn Kathir (English) | **313** |
| — al-Tabari (Arabic) | 40 |
| — al-Muyassar (Arabic) | 25 |

File list: `scripts/review-v2/tafsir-duplicate-block-reports.txt`.

**Consequence: in ~40% of multi-ayah reports, per-ayah Ibn Kathir attribution is not
trustworthy.** The single block is typically his commentary on the *first* ayah of the
passage — or on the ayah *before* it — pasted under each heading, often truncated
mid-sentence. Three independent enrichment agents hit this on 2026-07-27 in
`010-yunus/tafsir-report-085-086.md` (block is 10:84, identical under 10:85 and 10:86)
and `014-ibrahim/tafsir-report-023.md` (block is 14:22), and all three attributed
around it correctly rather than trusting the heading.

**The mitigation works and must stay in force:** enrichment agents are instructed to
read the Arabic each commentator actually quotes and confirm it matches the ayah before
attributing anything. That instruction is the only thing standing between this defect
and false attributions in published reflections. It is not optional.

**Mitigation now in force:** enrichment agents are instructed to read the Arabic each
commentator actually quotes and confirm it matches the ayah before attributing anything
to him. All three agents above caught the offset this way and attributed correctly.

---

# Quran-text defects found by enrichment agents (2026-07-24)

Two classes that **no validator catches**, because `verify_arabic` only checks Arabic
carrying an `ayah:` tag — untagged Arabic in prose is scanned but not blocked.

### 1. Fabricated ayah — `005-al-maidah/ayah-105.md`
The body presented `lā taḥmilū anfusakum…` as a Quranic quotation. **It is not in the
Quran.** Removed; replaced with the actual 2:286 supplication. Highest severity.

### 2. Elision that changes the grammatical subject — `002-al-baqarah/ayahs-006-017.md`
The body quoted `زَادَهُمُ مَرَضًا` ("increased them disease"). The actual text is
`فَزَادَهُمُ ٱللَّهُ مَرَضًا` — the elision **drops Allah as the subject**, leaving it
ambiguous who increased the disease. Real Quranic words, wrong meaning. Corrected.

## Why the validators miss both

`verify_arabic --scan` reports untagged Arabic that *resolves* to a verse, but does not
fail on Arabic that resolves to nothing (fabrication) or that resolves to a *fragment*
with words removed (elision). Both defects sat in files that pass every automated check.

## Mitigation now in force

Enrichment agents are instructed to verify every Arabic passage presented as a Quranic
quotation against the real text before letting it stand. Both defects above were found
that way, not by a script. **Until a detector exists for these two classes, they can
only be found by reading.**

---

# ⚠ CORRECTION (2026-07-28) — the duplicate-block "defect" was mostly the truncation

Earlier today this document asserted that 314 of 800 multi-ayah reports repeat one
commentator's block identically under every heading, and characterised that block as
**"usually commentary on a different ayah, often truncated."** Agents were instructed
accordingly, and several responded by attributing *nothing* to Ibn Kathir.

**After regenerating all 1,367 reports untruncated, that characterisation is wrong.**

The repetition count is essentially unchanged — **314 → 314 (39.1%)**. So regeneration
did not fix it, which means it was never our bug. **Ibn Kathir comments on passages, not
on single ayahs**, and the source API maps every ayah in a passage to the same block.
The repetition is the correct representation of how his tafsir is organised.

What the 500-char truncation did was cut those passage blocks off near their opening —
so the visible fragment discussed only the passage's *first* ayah, and the block looked
misfiled under the rest. Concrete reversal: `015-al-hijr/tafsir-report-097-099.md` was
reported today as carrying an Ibn Kathir block "identical under all three headings and
commentary on 15:94," and an agent therefore drew nothing from him. Untruncated, that
block covers 15:97–99. Same for `010-yunus/tafsir-report-085-086.md`, whose full block
ends on 10:86's *wa najjinā bi-raḥmatika* — "save us by Your mercy… from the
disbelieving folk."

**The offset detector's numbers must not be read as a defect count.** Run against the
regenerated reports it reports **2,438 blocks in 644 reports**, up from 710 in 302 — and
the increase is the artifact, not a discovery. A full passage-level block quotes many
ayahs, so "which ayah does this block quote most" frequently resolves to something other
than the heading. `scripts/detect_tafsir_offset.mjs` is only meaningful against
per-ayah-scoped commentary; against passage-scoped commentary it measures scope, not
misfiling.

**What survives.** Genuine misfiling does exist — several were hand-verified today with
the Arabic in front of them (`003-aal-imran/tafsir-report-133-136.md`,
`005-al-maidah/tafsir-report-051.md`, and al-Ṭabarī offset by one throughout
`014-ibrahim/tafsir-report-024-027.md`). Those are real. What is now unsupported is the
*scale* claim and the blanket instruction to distrust every repeated block.

**Standing instruction, revised.** Still verify the Arabic a commentator actually quotes
before attributing — that discipline caught real errors today and costs little. But do
**not** treat a repeated block as evidence of misattribution, and do **not** decline to
cite a commentator merely because his block appears under several headings. Read the full
block and see which ayahs it treats.

This is the second time today a measurement made on truncated data proved misleading.
The first was the semantic-review log. The lesson is the same both times: **measure the
source before measuring the content.**
