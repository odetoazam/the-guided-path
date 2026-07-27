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
