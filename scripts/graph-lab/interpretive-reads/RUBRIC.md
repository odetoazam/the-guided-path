# Interpretive-read rubric (Fable first pass, human final call)

Purpose: the last validation gate for tadabbur files whose mechanical validators
(arabic + morphology) already pass. The 2026-07-27 lockdown found 3 of 9
rebuilt files carried a FALSE THESIS that passed every validator — this read
exists to catch exactly that.

Per file, in order:

1. **Thesis grounding.** State the file's central organizing claim in one
   sentence. Check it against all four tafsir editions fetched by
   `node scripts/cross_reference_tafsir.mjs <file>`. Verdict per thesis:
   GROUNDED (a classical source carries it), REFLECTION-FLAGGED (the file
   itself presents it as contemplation, not attribution), or UNGROUNDED
   (asserted as the meaning with no classical basis and no flag).
2. **Absolute claims.** Extract EVERY countable/absolute claim ("exactly N
   times", "the only place", "never", "first", "hapax", "always"). Verify each
   against `scripts/.corpus-cache/quranic-corpus.json` (lemma/root data, keyed
   "S:A", flat segment lists) and
   `node_modules/quran-validator/data/quran-verses.json` (Uthmani text). A
   claim you cannot verify mechanically = flag it, do not trust it.
3. **Tafsir attribution.** Any "Ibn Kathir says / al-Tabari records / the
   commentators agree" must match the fetched tafsir text. A fetch FAILURE is
   unknown, not confirmation — flag the attribution as unverifiable.
4. **Ahkam adab.** If the passage is ahkam-bearing or contested (fighting
   verses, hudud, interfaith), the file must acknowledge ikhtilaf / distinguish
   tadabbur from fatwa where it touches the ruling. Missing = flag.
5. **Truncation artifacts.** The old report generator cut tafsir at 500 chars.
   If quoted tafsir seems to stop mid-argument, flag.

Verdict: PASS only when the thesis is GROUNDED or REFLECTION-FLAGGED, all
absolute claims verify, attributions match, and adab holds. Anything else =
FLAG with quoted evidence. When uncertain, FLAG — the human clears flags; a
wrong PASS ships a false thesis into the validated graph.

## The breadth-of-attribution rule (finding, 2026-08-06)

**This is now the single most common defect in the pass, and it is introduced by
the repairs, not by the original files.** Three of the ikhtilaf sections written
to FIX flagged files carried the same error: a claim about how many editions say
something, with fewer editions actually named in the prose.

- `009-at-tawbah/ayahs-038-039` — "all four commentaries" anchor to Tabuk;
  al-Muyassar names no occasion. Caught, corrected to "three of the four".
- `012-yusuf/ayahs-109-111` — "All four commentaries answer that question, and
  they answer it the same way"; al-Jalalayn never supplies an object for the
  despair at all.
- `006-al-anam/ayahs-055-058` — "All four read the referent narrowly"; the
  unnamed fourth, al-Jalalayn, is the one edition that reads it *widely*
  (*fī dhālika wa-ghayrihi*). The overclaim did not merely inflate a count, it
  asserted unanimity in the exact opposite direction of the dissent.

The pattern is mechanical and easy to spot: **prose that names three editions
while a summary sentence claims four.** The unnamed edition is the risk, and in
two of the three cases it was the one that disagreed.

**Rules, binding on anyone writing or verifying an added section:**

1. A section may not use "all four", "the commentators agree", "they answer it
   the same way", or any equivalent, unless every edition is checked
   individually and the agreement is real. Prefer enumerating.
2. When only some editions carry a reading, SAY WHICH, and say what the others
   do instead. An edition that is silent is not an edition that agrees.
3. Verifiers: for every breadth claim, count the editions actually named in the
   prose and check the unnamed remainder FIRST. That single check caught two of
   the three.
4. A dissenting edition is an asset, not a problem. Reporting the disagreement
   is the section's whole job — an overclaim replaces real ikhtilaf with a
   false consensus, which is the opposite of what these sections exist to do.

## al-Jalalayn FETCH FAILED is often recoverable (finding, 2026-08-06)

The upstream dataset (`spa5k/tafsir_api`) has real coverage gaps for
al-Jalalayn — **4.5% of ayahs across the surahs this pass has worked**, but very
unevenly distributed: Surah 26 alone is missing **47 of 227 (21%)**, while Hud,
ar-Ra'd, al-Isra and al-Mulk are at 0%.

This matters because it interacts with the breadth-of-attribution rule above: a
writer who cannot see al-Jalalayn is exactly the writer who guesses "all four".

**A large share of the gaps are verbatim-repeated verses, and those are
recoverable.** 18 of Surah 26's 47 gaps are ayahs that repeat an earlier ayah
letter-for-letter; al-Jalalayn's commentary sits at the FIRST occurrence.
Worked example, both confirmed against `quran-verses.json` after normalization:

- `26:185` (missing) is identical to **`26:153`** (present). al-Jalalayn there
  glosses *musaḥḥarīn* as *alladhīna suḥirū kathīran ḥattā ghalaba ʿalā
  ʿaqlihim* — bewitched until it overcame their minds.
- `26:190` (missing) is identical to **`26:8`** (present).

**Rule:** before recording an al-Jalalayn FETCH FAILED as an unknown, check
whether the ayah repeats an earlier ayah in the same surah and read the first
occurrence. Only if there is no twin is it genuinely unknown — and it is still
never evidence of silence.

## Normalization warning (calibration finding, 2026-07-31)

Before flagging any count-claim as false, make sure the failure is not your own
tooling. Two real cases from the pilot's calibration read (3:9):

- **Waqf marks split phrases.** 2:2 reads لَا رَيْبَ ۛ فِيهِ — the small-high
  three dots (U+06DB) sits between the words, and stripping it leaves a DOUBLE
  space, so a single-space substring search misses the verse. Collapse
  whitespace after stripping marks.
- **Alif wasla ≠ plain alif.** ٱلسَّاعَةَ will not match a search for الساعة
  unless ٱ is folded to ا. Fold all alif variants (ٱ أ إ آ → ا) before matching.

A count-claim may only be flagged FALSE if the re-check still fails after
proper normalization (strip harakat AND waqf marks, fold alifs, collapse
whitespace). Otherwise record it as verified.
