# Script corruption — found and repaired 2026-07-31

Raw Arabic characters spliced into English or transliteration in reader-facing
prose. Surfaced by two wave-2 interpretive reads, then swept corpus-wide with a
check for any Arabic character directly adjacent to a Latin one.

The pattern is consistent: a Latin letter or word was replaced by a visually or
phonetically similar Arabic one — `ن` for *n*, `م` for *m*, a bare damma for the
vowel *u*, and in a few places a whole Arabic word dropped into a romanized
line.

**18 occurrences across 16 files. 16 repaired, 2 left below.**

## Repaired

| file | was | now |
|---|---|---|
| 003-aal-imran/ayah-022 | `allā yُqbal` | `allā yuqbal` |
| 050-qaf/ayah-031 | `نearness` | `nearness` |
| 001-al-fatiha/ayahs-003-004 | `نurturing` | `nurturing` |
| 001-al-fatiha/ayahs-003-004 | `like a رب` | `like a rabb` |
| 045-al-jathiyah/ayah-016 | `آتَيْnā` | `ātaynā` |
| 077-al-mursalat/ayah-047 | `mكذِّب` | `mukadhdhib` |
| 060-al-mumtahanah/ayah-007 | `عَادَيْتُm` | `ʿādaytum` |
| 010-yunus/ayahs-037-040 | `wa ادعوا man استطعتum min duni Allah` | `wa'dʿū man istaṭaʿtum min dūni Allāh` |
| 008-al-anfal/ayahs-047-049 | `wa inni جارun lakum` | `wa innī jārun lakum` |
| 016-an-nahl/ayahs-112-119 | `Fa-mani اضطرra` | `Fa-mani uḍṭurra` |
| 005-al-maidah/ayah-003 (×2) | `mani اضطرra` | `mani uḍṭurra` |
| 046-al-ahqaf/ayah-017 | `ufﭐin` | `uffin` |
| 028-al-qasas/ayah-012 | `mِن قَبْلُ` | `مِن قَبْلُ` (Latin m had replaced the meem) |
| 004-an-nisa/tafsir-report-162 | `themـand` | `them and` (tatweel for a space) |
| 005-al-maidah/tafsir-report-003 (×2) | `horns ـand`, `animal ـunless` | spaces restored |

`verify_arabic` re-run on the touched files: 0 failures.

## Left for Azam — 2, because the intended wording is a judgment call

**`004-an-nisa/ayah-040.md`**
> …what was done - and it is **وصفed** as *'azim*, tremendous…

The Arabic وصف (*waṣf*, description) sits where an English verb belongs. Reads
naturally as "it is **described** as ʿaẓīm", but that is a guess at the author's
sentence rather than a repair of a corrupted character, so it is left alone.

**`055-ar-rahman/ayah-053.md`**
> Some say *ilā*, some *aluw*, some *ilْy*. Several candidate singulars…

A bare sukun (ْ) sits inside a romanized form in a list of proposed singulars.
Probably `ily`, but the passage is enumerating competing lexical proposals and
the intended form matters, so this needs the author rather than an inference.

## Worth adding to the pipeline

The check is two lines and catches the whole class — any Arabic character
directly adjacent to a Latin one, outside frontmatter and HTML comments. Worth
running alongside `check_frontmatter_arabic.py` whenever new tadabbur lands,
since neither of the existing validators looks for it.
