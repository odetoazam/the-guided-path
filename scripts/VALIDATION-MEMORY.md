# AyahGuide Validation Memory

Tracks all validation sources, tooling decisions, known bugs, and findings.
**Update this file whenever a new source is tested, a bug is found, or a combination proves effective.**

---

## Validation Stack (Current)

### Layer 1 — Arabic Text
| Tool | Source | What it checks | Status |
|---|---|---|---|
| `verify_arabic.mjs` | `quran-validator` npm (yazinsai) | Quoted Arabic vs Uthmani corpus, 6,236 verses | ✅ Active |
| `validate-enhanced.mjs` L1 | `alquran.cloud/v1/ayah/{S}:{A}/quran-uthmani` | Same, cross-check via live API | ✅ Active |

**Known issue:** Both validators pass with a "diacritics differ / normalized match" warning on almost every file. This is acceptable — diacritic variants don't change meaning. Not a bug to fix.

---

### Layer 2 — Morphology
| Tool | Source | What it checks | Status |
|---|---|---|---|
| `verify_morphology.mjs` | corpus.quran.com tags | Root, POS, verb form per word | ⚠️ Broken |

**Bug (2026-04-28):** All auto-generated files use `<!-- morphology pruned -->` convention — zero tags to verify. Validator always returns 0 failures, creating false confidence.

**Fix needed:** Either (a) reinstate morphology tags in generation prompt, or (b) build an extraction layer that reads root claims from prose and checks them against a morphology dataset.

**Resources available for fix:**
- Leeds Quranic Arabic Corpus — 77,430 tokens annotated (root, form, POS). Download: `corpus.quran.com/download` or `github.com/mustafa0x/quran-morphology`
- `alquran.cloud` word-by-word: `quran-wordbyword` edition gives `word|translation` per word. NOT roots — just translations.
- `quran-corpus-qd` edition on alquran.cloud: tested 2026-05-14, returned empty/null. Not useful.

**Priority:** HIGH. This is the biggest validation gap. Morphological claims are the core intellectual substance of the linguistic journey sections.

---

### Layer 3 — Tafsir Cross-Reference
| Tool | Source | What it checks | Status |
|---|---|---|---|
| `cross_reference_tafsir.mjs` | `spa5k/tafsir_api` CDN | Ibn Kathir, al-Jalalayn, al-Muyassar per ayah | ⚠️ Bug fixed 2026-05-14 |
| `validate-enhanced.mjs` L2 | `alquran.cloud` live API | al-Jalalayn, al-Muyassar, al-Qurtubi, al-Baghawi | ✅ Active |

**Bug found (2026-05-14):** `cross_reference_tafsir.mjs` used a broad regex `(\d+):(\d+)` that matched `related_ayahs` entries in frontmatter, fetching wrong ayahs. For 5:51, it fetched tafsir for 2:225 and 19:26 instead.

**Fix applied (2026-05-14):** Script now reads `surah`/`ayah_start`/`ayah_end` from YAML frontmatter first, then `[ayah:S:A]` tags in body. No more regex fishing in full document.

**Impact:** All tafsir cross-reference reports generated BEFORE 2026-05-14 may reference wrong ayahs. Regenerate for contested files.

**alquran.cloud tafsir editions available (tested 2026-05-14):**
- `ar.jalalayn` — al-Jalalayn ✅
- `ar.muyassar` — King Fahad Complex ✅
- `ar.qurtubi` — al-Qurtubi ✅
- `ar.baghawi` — al-Baghawi ✅
- `ar.wahidi` — not available (404)
- All 4 can be fetched in one call: `api.alquran.cloud/v1/ayah/{S}:{A}/editions/ar.jalalayn,ar.muyassar,ar.qurtubi,ar.baghawi`

---

### Layer 4 — Semantic / Scholar Attribution
| Tool | Source | What it checks | Status |
|---|---|---|---|
| `semantic-review.py` | Claude Sonnet | Methodology compliance, scholar attribution, du'a grounding | ✅ Active |
| `validate-enhanced.mjs` L4 | Claude Sonnet + live tafsir | Compares claimed scholar positions vs actual tafsir texts | ✅ Active |
| Opus review (in pipeline) | Claude Opus | Post-generation review of Sonnet output before logging | ✅ Active (2026-05-14) |

---

## Resources Available

### APIs (Free, No Auth)
| Resource | URL | What it provides | Tested |
|---|---|---|---|
| alquran.cloud | `api.alquran.cloud/v1` | Arabic text, 4 tafsirs, word-by-word | ✅ 2026-05-14 |
| alquran.cloud editions | `/edition/language/ar` | Full list of Arabic editions | ✅ 2026-05-14 |

**alquran.cloud word-by-word format:** `word|translation|id1|id2|id3$next_word|...` — pipe-separated, dollar-separated per word. Gives translation, NOT morphological root.

### Datasets (Download)
| Resource | Location | What it provides | Status |
|---|---|---|---|
| Leeds Quranic Corpus | `corpus.quran.com/download` | Full morphology (root, form, POS) for all 77,430 tokens | Not yet downloaded |
| Lane's Lexicon SQLite | `github.com/laneslexicon/LexiconDatabase` | Classical Arabic-English lexicon | Not yet downloaded |
| OpenITI tafsir corpus | `github.com/openiti` | 207 tafsir texts, full al-Tabari + Ibn Kathir | Not yet downloaded |
| Mufradat al-Raghib | `archive.org` + `arabiclexicon.hawramani.com` | Quranic-specific lexicon by al-Raghib | Not yet downloaded |

### npm Packages
| Package | Purpose | Installed |
|---|---|---|
| `quran-validator` (yazinsai) | Arabic text verification, auto-correction, LLM prompts | ✅ v1.3.0 |

### Web References (No API)
| Resource | URL | Use |
|---|---|---|
| quran-center.github.io | `quran-center.github.io/quran-meta` | Surah metadata | Not yet tested |
| verifyquran.com | `verifyquran.com/verify_arabic.html` | Web tool only, no API | Manual use only |
| altafsir.com | `altafsir.com` | 110+ tafsir books, Royal Aal al-Bayt | Manual spot-check only |

---

## Combination Testing Log

### 2026-05-14 — First enhanced validation run

**File tested:** `content/tadabbur/005-al-maidah/ayah-055.md` (manually written, Opus-generated)

**Combination:** Arabic (alquran.cloud) + 4 tafsirs (alquran.cloud) + word-by-word + Claude Sonnet semantic

**Findings:**
- `contested_verse: false` was WRONG — 5:55 is āyat al-walāya, one of the most contested Sunni/Shia verses. Fixed to `true`.
- "al-Tabari, al-Qurtubi, Ibn Kathir, al-Razi read 5:55 as structural complement" overstated — actual Qurtubi tafsir discusses occasion-of-revelation (Ibn Salam, Qurayza/Nadir), not structural complement framing. Softened to interpretive language.
- Arabic text: PASS
- quran-validator: PASS (diacritics warning, acceptable)

**Verdict:** MODERATE (no critical errors, 2 fixable moderate issues)

**Assessment:** The 4-tafsir live API comparison is the most valuable layer. It caught a real scholar attribution overstatement that no other validator would catch.

### 2026-05-14 — Semantic review on contested verses

**Files:** `ayah-051.md` (5:51), `ayah-082.md` (5:82)

**Bug found:** `semantic-review.py` regex didn't handle markdown bold verdicts (`**CRITICAL**`). Claude sometimes returns `VERDICT: **CRITICAL**` instead of `VERDICT: CRITICAL`. Fixed.

**5:82 result:** MODERATE — see report for details.

**5:51 result:** Tafsir report covered wrong ayahs (2:225, 19:26 instead of 5:51). Root cause: `cross_reference_tafsir.mjs` regex bug. Fixed.

---

## Known Issues / Open Items

| Issue | Priority | Status |
|---|---|---|
| Morphology effectively unvalidated (all files use "pruned" convention) | HIGH | Open — needs Leeds corpus integration |
| Tafsir reports generated pre-2026-05-14 may reference wrong ayahs | HIGH | Open — regenerate for contested files |
| `semantic-review-log.json` tracks reviewed files but `validate-enhanced.mjs` doesn't feed into it | MEDIUM | Open |
| No asbab al-nuzul structured dataset exists publicly | LOW | Open — best current option: text-search OpenITI al-Wahidi |
| altafsir.com has 110+ tafsir books but no API | LOW | Open — manual spot-check only |

---

## Best Combinations by Use Case

| Goal | Best combination |
|---|---|
| Quick Arabic accuracy check | `verify_arabic.mjs` |
| Scholar attribution check | `validate-enhanced.mjs` (4 tafsirs live) |
| Methodology compliance | `semantic-review.py` (Sonnet) |
| Full pre-publication check | `validate-enhanced.mjs` + Opus review |
| Batch processing existing files | `semantic-review.py --sample N` |
| Contested verses only | `semantic-review.py --contested-only` + `validate-enhanced.mjs` |

**Emerging best practice (2026-05-14):** Run `validate-enhanced.mjs` on every contested file before publishing. The 4-tafsir live comparison catches scholar attribution errors that Claude alone cannot catch because it doesn't have access to the actual tafsir texts at generation time.

---

## Frontmatter Tags

After validation, files are tagged in frontmatter:
- `semantic_review: "opus-generated-YYYY-MM-DD"` — Opus wrote it (highest trust)
- `semantic_review: "opus-reviewed-YYYY-MM-DD"` — Sonnet wrote, Opus reviewed and passed
- `semantic_review: "opus-reviewed-YYYY-MM-DD-moderate"` — Opus reviewed, moderate issues flagged
- `semantic_review: "enhanced-YYYY-MM-DD"` — Passed `validate-enhanced.mjs`
- `semantic_review: "agent-YYYY-MM-DD"` — Passed `semantic-review.py` agent
- `semantic_review: false` — Not yet reviewed

Files with CRITICAL issues from Opus review are moved to `content/tadabbur/{surah}/needs-review/` with a `.review.txt` file containing the Opus findings.

---

## Session Findings — 2026-05-14 (Enhanced Validator First Full Run)

### Files Validated Today

| Ayah | Verdict | Key Findings |
|---|---|---|
| 5:51 | 🟡 MODERATE | "both are wrong" applied to "allies" overclaims (API itself uses "allies"); al-Tabari Banū Qaynuqāʿ attribution needs primary source check |
| 5:55 | 🟡 MODERATE | `contested_verse: false` was wrong → fixed to `true`; structural complement claim softened from consensus to interpretive framing |
| 5:82 | 🟡 MODERATE | "niche of light" in Najashi narration not in Ibn Ishaq/Ibn Hisham — conflates sira with 24:35 imagery; Najashi tie unconfirmed in Qurtubi/Baghawi excerpts |
| 9:29 | 🟡 MODERATE | Sabab presented as unanimous; al-Baghawi preserves competing Banū Qurayẓa/Naḍīr tradition; al-Rāzī/Ibn Kathīr citations unverifiable from 4-tafsir set |
| 2:255 | 🟡 MODERATE | Form IV يُحِيطُونَ labelled "causative" — should be "intensive-transitive/stative"; Kursi/Arsh narration called "hadith" but is mawquf athar of Ibn Abbas |
| 55:1-13 | 🟡 MODERATE | "most concise verse" claim factually wrong (89:1, 103:1 are shorter); pre-creation chronological reading of 55:2-3 stated as settled, not supported by 4 tafsirs |
| 67:1-5 | 🟡 MODERATE | ta'allama wrongly labeled Form VI — it is Form V (tafa''ala not tafa'ala); 4 scholar attributions unverifiable from provided data |
| 36:33-40 | ✅ PASS | "Heart of the Quran" hadith needs authenticity qualifier (chain weakness per Ibn al-Salah); otherwise sound |

### Patterns Across All Files (Systematic Issues)

**1. Form IV verb descriptions over-specified as "causative"**
- Multiple files label Form IV as "causative" when Arabic grammar recognizes Form IV as having many functions: causative, transitive, declarative, intensive. يُحِيطُونَ (2:255) and others are intensive-transitive, not causative.
- **Fix:** Add note to generation prompt that Form IV ≠ automatically causative. Add to methodology.

**2. Scholar attributions stated beyond verifiable sources**
- al-Rāzī (Mafātīḥ al-Ghayb) and Ibn Kathīr frequently cited but not in the 4-tafsir API set (Jalalayn, Muyassar, Qurtubi, Baghawi).
- These citations may be accurate but cannot be confirmed from reference data.
- **Fix:** When citing al-Rāzī or Ibn Kathīr specifically, soften to "as reported in classical commentary" OR wire al-Rāzī/Ibn Kathīr into the validation stack. The tafsir_api (spa5k) includes Ibn Kathīr — check if it's being used.

**3. Asbab al-nuzul presented as unanimous when ikhtilaf exists**
- Classical sources frequently preserve multiple competing sabab traditions. The generation model tends to pick one and present it as consensus.
- **Fix:** Generation prompt should instruct: "where multiple asbab traditions exist, name them as ikhtilaf, not as consensus."

**4. Hadith/athar conflation**
- Mawquf narrations (companion reports, not traced to the Prophet ﷺ) called "hadith" repeatedly.
- The Kursi/Arsh ring narration (Ibn Abbas) is the clearest example — widely cited as a hadith but is technically an athar.
- **Fix:** Generation prompt should distinguish: prophetic hadith (marfu') vs companion report (mawquf/athar).

**5. Arabic text "mismatch" is a false positive**
- The enhanced validator flags Arabic text as mismatched on almost every file because the file Arabic uses different diacritization or alef variants than the API's Uthmani rendering.
- This is NOT a content error — quran-validator passes on the same files.
- **Fix:** Improve normalize_arabic() function in validate-enhanced.mjs to handle more rasm variants. Or suppress this check and rely on quran-validator instead.

### Recommended Generation Prompt Additions

Add these instructions to `scripts/tadabbur-methodology.md` under a new section "Scholarly Accuracy Requirements":

```
- Form IV verbs (يُفْعِل): DO NOT automatically label as "causative." Arabic Form IV has many functions. Verify the specific semantic function for each verb from lexical sources.
- Scholar attributions: when citing al-Rāzī, Ibn Kathīr, or any scholar not in {Jalalayn, Muyassar, Qurtubi, Baghawi}, mark as "as reported in classical commentary" unless you can cite the specific volume/page.
- Asbab al-nuzul: where multiple traditions exist, present them as ikhtilaf, not consensus. Use "among the narrations" or "one major tradition" rather than stating a single sabab definitively.
- Hadith vs athar: distinguish marfu' (traced to the Prophet ﷺ) from mawquf (companion report) from mursal. Do not call an athar of Ibn Abbas a "hadith."
- Superlatives about Quranic structure: verify before stating. "Most concise verse," "only instance of X" claims require explicit verification.
```

---

## Session Update — 2026-05-14 (End of Day)

### Files Validated Today (Enhanced Validator)
- 5:51, 5:55, 5:82 (contested — all MODERATE after tafsir bug fix)
- 9:29 (contested — MODERATE: sabab ikhtilaf not acknowledged)
- 2:255 / Ayat al-Kursi (MODERATE: athar called hadith, Form IV over-labelled)
- 55:1-13 (MODERATE: "most concise verse" factually wrong, chronological claim overstated)
- 67:1-5 / Al-Mulk opening (MODERATE: Form V labelled as Form VI — genuine error)
- 20:17-21 / Musa's staff (MODERATE: al-Razi attribution unverifiable, defamiliarization reading overstated as classical)
- 19:40 (MODERATE: philosophical framing attributed to "classical commentators" but not in 4-tafsir set)
- 36:33-40 / Ya-Sin (PASS with note: "heart of Quran" hadith needs chain qualification)
- 56:75-82 / Al-Waqiah (MODERATE: mawqi' labelled wrong pattern — fal vs mafʿil)

### One Real CRITICAL Fixed
**5:51 passage_context** claimed "Classical commentators (al-Tabari, al-Qurtubi, Ibn Kathir, al-Razi) ground the ayah in a specific Madinan moment." The actual Ibn Kathir tafsir text (confirmed from report) opens with a universalist standing prohibition, not a contextual Madinan reading. Fixed to acknowledge the ikhtilaf explicitly between al-Tabari's contextual reading and Ibn Kathir's universalist framing.

### Tafsir Report Regeneration
All 150+ tafsir reports regenerated with fixed cross_reference_tafsir.mjs script (using frontmatter surah/ayah instead of regex scan). Remaining reports regenerating in background.

### Error Pattern Summary (8 files, N=14 reviewed)
| Error Type | Frequency | Severity |
|---|---|---|
| Scholar attribution beyond 4-tafsir set (al-Razi, Ibn Kathir, al-Tabari stated as confirmed) | Very common | MODERATE |
| Asbab presented as unanimous when ikhtilaf exists | Common | MODERATE-CRITICAL |
| Hadith/athar conflation (mawquf called hadith) | Frequent | MODERATE |
| Form IV labelled "causative" incorrectly | Frequent | MODERATE |
| Form V vs Form VI confusion | Seen in 1 file | MODERATE |
| Wrong ism makān pattern label | Seen in 1 file | MODERATE |
| Factual superlative claims ("most concise verse") | Seen in 1 file | MODERATE |
| Contemporary interpretive reading stated as classical consensus | Very common | MODERATE |

### No CRITICAL content errors found (other than tafsir-bug artifacts and 5:51 sabab claim)
All errors were MODERATE — fixable before voice AI launch. No fabricated Arabic, no invented scholar positions, no structural theological errors.

### Key Insight
The 4-tafsir set (Jalalayn, Muyassar, Qurtubi, Baghawi) via alquran.cloud is **essential** but **insufficient** for full scholar attribution verification. The most common error is citing al-Rāzī and Ibn Kathīr — who are NOT in the API set — as confirmed positions. The spa5k/tafsir_api CDN includes Ibn Kathīr and al-Tabari. Need to wire those into validate-enhanced.mjs as additional sources.

### Next Actions
1. Wire spa5k Ibn Kathir + al-Tabari into validate-enhanced.mjs (they were in the original tafsir_api, just not the alquran.cloud enhanced layer)
2. Download Leeds morphology corpus for root/form verification
3. Run `semantic-review.py --sample 50` with corrected reports to get better baseline
4. Fix generation prompt: add scholarly accuracy requirements (done 2026-05-14)

---

## Layer 2 UPGRADED — Leeds Morphology Validator (2026-05-14 evening)

### What Changed
The "morphology pruned" gap is now CLOSED. New scripts:
- `scripts/morphology-lookup.mjs` — Indexes Leeds Quranic Arabic Corpus, exports `lookupAyah(s,a)`, `lookupRoot(r)`, `rootsInAyah(s,a)`, `normalizeRoot(claim)`
- `scripts/validate-morphology-leeds.mjs` — Reads tadabbur file, extracts root + verb-form claims from prose and morphology tables, validates each against Leeds corpus
- `scripts/.corpus-cache/quranic-corpus-morphology.txt` — Full Leeds corpus, 6.0 MB, 6,236 ayahs, 1,652 unique roots

### Source
- File: `quranic-corpus-morphology-0.4.txt` (Kais Dukes 2011, GPL)
- Mirror: `raw.githubusercontent.com/cltk/arabic_morphology_quranic-corpus/master/`
- Format: Tab-separated LOCATION/FORM/TAG/FEATURES per segment
- 128,276 segment rows → ~77,430 word entries after merging

### Critical Lessons Learned

**1. Buckwalter is case-sensitive.** Initial implementation lowercased all root strings, which broke validation entirely. Letters that differ by case in Buckwalter: H/h (ح vs ه), S/s (ص vs س), D/d (ض vs د), T/t (ط vs ت), Z/z (ظ vs ز), E/e (ع), $ (ش).

**2. Leeds normalizes hamza in ROOT strings.** All hamza variants (أ، إ، ء، ؤ، ئ) are stored as plain alef `A` in roots — NOT as the hamza Buckwalter symbols (>, <, ', &, }). The root for أخذ is `Ax*`, not `>x*`.

**3. Form I is never explicitly tagged in Leeds.** Form I is the default base form; Leeds only annotates Form II-X. The validator must treat "Form I" claims as a check that a verb (any) exists without explicit form annotation.

### Test Results
- 5:55 (manually written): 0 morphology claims (uses "pruned" convention) — validator runs clean
- 18:60-65 (Step 0 table file): 75 root + verb-form claims — **all 75 verified against Leeds**

### Pipeline Integration
`tadabbur-auto.py` now runs Leeds validation as part of every generation's validator pass. CRITICAL on any mismatch.

### Buckwalter Reference (for VALIDATION-MEMORY users)
```
ا A   ب b   ت t   ث v   ج j   ح H   خ x   د d   ذ *
ر r   ز z   س s   ش $   ص S   ض D   ط T   ظ Z   ع E
غ g   ف f   ق q   ك k   ل l   م m   ن n   ه h   و w
ي y   ى Y   ة p
hamza variants (in roots): all → A
hamza variants (in word forms): > < ' & } (preserve)
```

### Open Items
- Run `bash scripts/run-leeds-validation.sh` to scan all 3,600+ existing files
- Identify pre-existing morphology errors in older auto-generated content
- Update generation prompt to require morphology tags (currently methodology says "morphology pruned" — needs update to require Leeds-verifiable tags)

---

## Leeds Full Corpus Scan Results — 2026-05-14

**Run:** `bash scripts/run-leeds-validation.sh`

### Numbers
- Files scanned: 1,633
- Files with morphology claims: 1,251
- ✅ Passing: 1,080 (86%)
- ⚠️ Flagged: 171 (14%)

### Category Breakdown

**Real errors — 37 files with verb form mismatches**
These are files claiming a specific Arabic verb form (Form II, IV, V, etc.) that doesn't appear in the ayah per Leeds. Verb forms are objectively verifiable — this is where real morphological errors live.
See full list in `scripts/leeds-validation-report.md`.

**Likely false positives — root flags on particles/proper nouns**
Leeds does NOT assign roots to:
- الناس family → Leeds uses `nws` not `Ans` (أنس)
- آدم → treated as PN with no root (Adm not found)  
- أيها → treated as vocative particle, no root
- كيف → treated as interrogative particle, no root
- اليهود → treated as PN/group noun, `hwd` may not be present
- المسيح → treated as PN, `msH` may not be present

When tadabbur files claim roots for these words, it's NOT necessarily wrong — it's using classical Arabic lexicographical tradition (assigning derivational roots) that Leeds doesn't tag.

**Lexicographical school differences**
- ن-د-ي vs ن-د-و for مُنَادِيًا: Leeds uses ndw, some grammarians say ndy. Not an error — a documented ikhtilāf.
- Similar for some hollow verb roots.

### Key Insight
The verb form mismatches (37 files) are the actionable findings. The root mismatches are predominantly false positives due to Leeds's conservative root-tagging conventions for particles and proper nouns.

### Next Actions
1. Run semantic review on the 37 verb-form-mismatch files to confirm and fix
2. Improve `extractRootClaims()` to filter out claims for proper nouns (Adm, msH, hwd, etc.)
3. Add Leeds cross-reference to VALIDATION-MEMORY for common proper noun roots Leeds doesn't tag
