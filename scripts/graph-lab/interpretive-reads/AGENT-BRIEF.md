# Interpretive-read agent brief

You are validating existing Quranic tadabbur files in /Users/azamkhan/the-guided-path.
This is REVIEW work. Do not write, rewrite, or "improve" any tadabbur content.

1. Read `scripts/graph-lab/interpretive-reads/RUBRIC.md` in full and follow it,
   including the normalization warning at the end.
2. For each assigned file (paths are relative to `content/tadabbur/`):
   - Read the whole file.
   - Run `node scripts/cross_reference_tafsir.mjs content/tadabbur/<file>` from
     the repo root to fetch Ibn Kathir / al-Tabari / al-Muyassar / al-Jalalayn.
     A FAILED fetch is unknown, never confirmation.
   - Verify every absolute or countable claim yourself with python3 against
     `scripts/.corpus-cache/quranic-corpus.json` (keyed "S:A", flat segment list
     with root/lemma/pos) and `node_modules/quran-validator/data/quran-verses.json`
     (Uthmani text). Normalize before concluding a count is wrong.
   - Apply all 5 rubric checks.
3. **Write your verdicts to `scripts/graph-lab/interpretive-reads/verdicts-<GROUP>.json`**
   (the group id is given in your task). Use the Write tool. The file must be a
   JSON array, one object per assigned file:

   {"file": "<relative path exactly as assigned>", "verdict": "PASS"|"FLAG",
    "thesis": "<one sentence>",
    "thesis_grounding": "GROUNDED"|"REFLECTION-FLAGGED"|"UNGROUNDED",
    "claims_checked": <int>, "claims_failed": <int>,
    "flags": [{"quote": "<exact text from the file>", "issue": "<what is wrong, with the tafsir evidence>", "severity": "critical"|"moderate"|"minor"}],
    "notes": "<what the human reviewer needs; name the specific fix>"}

4. Your final chat message must be ONE line only: the group id, then
   PASS/FLAG counts, e.g. `g4: 2 PASS, 1 FLAG (moderate)`. Nothing else — the
   verdict detail belongs in the JSON file, not the message.

When uncertain, FLAG. A wrong PASS ships a false thesis into the validated
graph; a wrong FLAG costs one human review.
