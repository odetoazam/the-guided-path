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
