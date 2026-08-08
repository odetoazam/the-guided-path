# Interpretive-read pass — handoff (state as of 2026-08-07, after the overnight run)

Read this before doing anything. It is the resume point.

**Read `docs/NORTH-STAR.md` FIRST, before any priority list in memory.** A
session on 2026-07-31 built and shipped ayah pages to the public web against
decision 4 by following a stale backlog entry. Walked back the same session.
When a priority list conflicts with NORTH-STAR, NORTH-STAR wins.

---

## What this pass is

The last validation gate for tadabbur files whose mechanical validators already
pass. The 2026-07-27 lockdown found false theses surviving every validator; this
catches those, plus unflagged ikhtilaf, bad attributions, and adab gaps.

**System:** `RUBRIC.md` (5 checks + three standing warnings) · `AGENT-BRIEF.md`
(agents write verdict JSON to disk, return one line — keeps the orchestrator's
context free) · `apply_interpretive_reads.py` (PASS → `validated: true` + stamp;
FLAG → `REVIEW-QUEUE.md`; everything appended to `audit-log.jsonl`).

**Loop:** read → flag → fix → **verify the fix** → flip. The verify step is not
optional and it is not a formality. This session it caught **3 of 16 repairs
introducing brand-new defects**, two of them the same breadth overclaim the
repair was supposed to be fixing elsewhere. A fix is never self-certifying.

## Numbers (after the 2026-08-07 overnight run)

- Corpus: `validated: true` **2233** · `false` **774**
- Graph: `v=1 2219 · v=0 761 · v=-1 28` · validated-only edges **7690**
  (7505 when the Aug 6 session began — +185 edges in one day+night)
- 94 files now have a verdict · **181** auto-verified files remain unread
- Overnight: BOTH regenerations shipped and verified (41:53, 86:1-10 —
  vr5: 52 claims, 0 failed); 10 repaired files verified by vr8 (10 PASS) and
  flipped; the live-file audit ran (see the ⚠ section above); 20 more unread
  files read (waves r6-r8): At-Tawbah is now 0-for-12 on first read, Al-Anfal
  1-for-8 — the flags are repaired and verified, but expect the same defect
  families in the remaining unread At-Tawbah/Al-Anfal files.

---

## THE finding: breadth-of-attribution is the pass's dominant defect

It is now written into `RUBRIC.md` as a binding rule. Summary:

Three of the six ikhtilaf sections written to FIX flagged files carried a claim
about how many editions say something, with fewer editions actually named:

- `009-at-tawbah/ayahs-038-039` — "all four" anchor to Tabuk; al-Muyassar names
  no occasion. (Caught previously, corrected, re-verified clean this session.)
- `012-yusuf/ayahs-109-111` — "All four ... answer it the same way"; al-Jalalayn
  supplies no object for the despair at all. The same section also misstated
  what 'A'ishah rejected — it is the *kudhibū/kudhdhibū* qirā'ah dispute, not
  despair of Allah's help — so a section written to report ikhtilaf suppressed
  one. Both repaired and verified.
- `006-al-anam/ayahs-055-058` — "All four read the referent narrowly"; the
  unnamed fourth, al-Jalalayn, reads it *widely* (*fī dhālika wa-ghayrihi*).
  Repaired and verified.

And then the repairs did it again:
- `040-ghafir/ayahs-069-072` — repair asserted the editions agree the dragging
  is by the *zabāniya*; al-Jalalayn names no agent (*yujarrūna bihā*, by the
  chains). Fixed, re-verified by vr7, flipped.
- `017-al-isra/ayahs-026-030` — repair over-corrected to "not about quantity at
  all"; the unnamed fourth, al-Muyassar, carries the quantity sense. Fixed,
  re-verified by vr7, flipped.

**The tell is mechanical: prose names three editions, summary sentence says
four. Check the unnamed edition FIRST.** That single check caught four of these.

## Second finding: al-Jalalayn FETCH FAILED is often recoverable

Also written into `RUBRIC.md`. The upstream dataset has real gaps — 4.5% of
ayahs across the surahs worked so far, but wildly uneven: **Surah 26 is missing
47 of 227 (21%)**, while Hud, ar-Ra'd, al-Isra and al-Mulk are at 0%. This
matters because a writer who cannot see al-Jalalayn is exactly the writer who
guesses "all four".

**18 of Surah 26's 47 gaps are ayahs that repeat an earlier ayah verbatim, and
al-Jalalayn's commentary sits at the first occurrence.** Confirmed against
`quran-verses.json`: `26:185` is identical to **`26:153`** (present), and
`26:190` is identical to **`26:8`** (present).

**Open item, deliberately NOT applied:** at 26:153 al-Jalalayn glosses
*musaḥḥarīn* as *alladhīna suḥirū kathīran ḥattā ghalaba ʿalā ʿaqlihim* —
bewitched until it overcame their minds. That is the same mind-loss element
`026-ash-shuara/ayahs-184-190.md` currently gives to al-Muyassar alone. Adding
it would be an improvement, but the verifier cleared that file on the basis of
al-Jalalayn being silent, so the addition was reverted rather than shipped
unverified into a `validated: true` file. **Next session: verify the 26:153
inference, then apply.**

---

## ⚠ FIRST THING FOR AZAM — the live-file audit (2026-08-07 overnight)

The four most adversarially-quoted single verses were `validated: true` and live
with NO interpretive-read stamp — they cleared older gates before this pass
existed. Audited overnight (`verdicts-wave4-r8.json`, full evidence there):

- **`009-at-tawbah/ayah-123.md` — TRUNCATED ON A LIVE PAGE. QUARANTINED.**
  Ends mid-sentence with a literal `[... reflection continues ...]` stub; 2,693
  words of a promised 9,200 (~71% missing) — Element Three, all of Part 2, the
  synthesis and du'a simply absent. Everything that exists verifies cleanly.
  I flipped it `validated: false` overnight (conservative direction — removes a
  structurally defective file from the validated graph; one-line reversal when
  the file is completed via the skill). Needs regeneration or completion.
- **`009-at-tawbah/ayah-005.md` — NOT touched, needs your call.** The live 9:5
  page suppresses the named Verse-of-the-Sword position (Aḍ-Ḍaḥḥāk + Ibn 'Abbas
  in Ibn Kathir) that its own repaired sibling `ayahs-004-006.md` now carries;
  still scopes by "declared hostility" where al-Tabari scopes by treaty status
  (the same correction already applied to the sibling); omits al-Tabari's
  9:6-not-abrogated ruling (its own best evidence); an "eleven words" count that
  is false; no tadabbur-vs-fatwa line. Fix is the exemplar pattern, already
  proven on the sibling — but it is your most-visible page, so your review.
- **`009-at-tawbah/ayah-029.md` — NOT touched, needs your call.** The jizya
  page's structural anchor (partitive *min* — "some of the People of the Book")
  is carried by NONE of the four editions; al-Jalalayn explicitly glosses the
  *min* as bayān (explicative). And the *ṣāghirūn* range is under-reported on
  the hard side (al-Tabari: *adhillāʾ maqhūrūn*; Ibn Kathir's harder material)
  while authorities are named only for the softer readings — an apologetic tilt
  that fails adversarial quotation in the other direction. Also: a five-school
  consensus overclaim (blood-parity is a known madhhab ikhtilāf), a loose Abu
  Dawud citation (muʿāhid, not dhimmī), no reader-facing fatwa line.
- **`009-at-tawbah/ayah-028.md` — PASS.** One minor unverifiable grammar
  attribution (al-Zamakhshari/al-Razi are outside the fetch set). Clean.

## Immediate queue

1. **Azam's calls from the live-file audit (⚠ section above):** 9:5 repair
   (exemplar pattern, proven on the sibling), 9:29 repair (min-as-bayan +
   honest ṣāghirūn range), 9:123 completion/regeneration (quarantined).
2. **Keep reading the 181 unread.** Brief each group with the known risk for
   its verses. Expect At-Tawbah/Al-Anfal defect families (missing ikhtilaf +
   missing fatwa lines on ahkam verses; correct-direction readings missing
   classical scoping).
3. **The 350-elite edge promotion queue** — still untouched, next leverage
   point after the burn-down.

## Newly flagged, evidence already gathered (in `verdicts-wave4-*.json`)

**At-Tawbah interfaith — 0 PASS / 4 FLAG, all critical.**
- `009-at-tawbah/ayahs-030-033` — **the worst file found this session.**
  *qātalahumu Allāh* is rendered as a literal imprecation in the frontmatter
  `translation:` AND the body block, then never glossed in 1,846 words. Ibn
  Kathir ("Ibn 'Abbas said, 'May Allah curse them'"), al-Tabari (Ibn 'Abbas:
  *yaqūlu la'anahum Allāh*; Ibn Jurayj: *kalimatun min kalām al-'Arab*) and
  al-Jalalayn (*qātalahum = la'anahum*) all gloss it. Also: the *'Uzayr* claim
  is unscoped though al-Tabari opens with explicit ikhtilaf (one man, Finhas —
  vs. a group); the 'Adi b. Hatim hadith, which the tradition uses precisely to
  REFUSE the literal-worship reading of *arbāban*, is missing; and there is no
  tadabbur-vs-ruling line anywhere on the interfaith core of this surah.
- `009-at-tawbah/ayahs-023-024` — hijra scoping absent; al-Tabari reads
  *awliyā'* as confidants/disclosure of secrets, not affection.
- `009-at-tawbah/ayahs-017-018` — **reverses the classical reading of *'asā***
  (sources: *'asā* from Allah is certainty — Ibn 'Abbas "every *'asā* in the
  Qur'an is binding"), and builds a closing point on non-certainty. Also
  inverts *shāhidīna 'alā anfusihim bi-l-kufr*, which every source reads as an
  outward, verbal declaration.
- `009-at-tawbah/ayahs-034-035` — three classical positions on *kanz* presented
  as one settled meaning; the Abu Dharr / Mu'awiyah dispute omitted; no fatwa
  line on a zakat-bearing passage.

**Al-Anfal — 0 PASS / 4 FLAG on first read; two repaired+verified overnight
(8:38-40, 8:65-66), and the walāyah trio (8:55-58, 8:72-73, 8:74-75) plus the
At-Tawbah quartet (9:36-37, 9:7-10, 9:19-22, 9:79-80) were flagged by waves
r6/r7, repaired by W9/W10, and verified by vr8 (10 PASS). STILL OPEN:**
- `008-al-anfal/ayahs-041-042` — Khums. al-Tabari's densest ikhtilaf passage in
  the surah; the file quietly commits to a division he rejects as contrary to
  ijmā'.
- `008-al-anfal/ayahs-070-071` — Captives/ransom. Additive fix; the al-'Abbas
  asbāb is the file's own best evidence and is missing.

**Al-A'raf — 3 PASS / 1 FLAG.** `007-al-araf/ayahs-019-022` PASSED, which is
real good news: the serpent that had to be removed from the sibling file
`ayahs-023-025` was **not** imported here.

## Also open

- **Azam's call, untouched:** `041-fussilat/ayah-053.md` REGENERATE (the only
  UNGROUNDED thesis in the pass — reads 41:53 as predicting scientific
  discovery; all four gloss the pronoun in *annahu'l-ḥaqq* as the Qur'an, and
  it inverts *awa-lam yakfi*) and `086-at-tariq/ayahs-001-010.md` REGENERATE
  (*min bayni'l-ṣulbi wa'l-tarā'ib* read as ONE body where all four read TWO;
  the *ḥāfiẓ* of 86:4 called Allah where all four say an angel).
- `SCRIPT-CORRUPTION-QUEUE.md` — 2 left, both needing Azam because supplying the
  wording would be authorship (`وصفed` in 4:40; a sukun inside a romanized form
  at 55:53). A corpus-wide splice scan this session found no others.
- `PUBLIC-CONTENT-NOTES.md` — the 9:5 article fix is DONE and live.
- The 350-elite edge promotion queue is still untouched.
- `tamkin-repetition` (the wrong technical term riding into the graph on
  frontmatter) is FIXED — the device is *takrār*, not *tamkīn*; tag and prose
  both corrected in `031-luqman/ayahs-014-015`. It was the only file carrying it.

## Traps that cost real time — do not rediscover these

- **Normalization is the recurring failure, and it makes CORRECT things look
  wrong.** Waqf marks leaving double spaces; alif-wasla defeating a match; a
  maddah that, stripped, made a TRUE published claim return zero hits. **Also
  ornate brackets U+FD3E/U+FD3F**, which sit between words in al-Jalalayn and
  defeat naive substring search — that one nearly buried the 6:55-58 dissent.
  **Never flag a count-claim false until the re-check survives normalization.**
- **`verify_morphology`** wants the flat corpus **segment** index (compute from
  `scripts/.corpus-cache/quranic-corpus.json`) and roots in **Arabic script** —
  `root=دبر`, not `root=dbr`. Corollary found this session: when cleaning
  Arabic-script splices out of prose, do NOT "fix" the `<!-- morphology: ...
  root=ظلم -->` comments; the Arabic there is required.
- **`verify_arabic` reads the BODY only**, never the frontmatter. Note that no
  validator checks the frontmatter `translation:` field either — the 6:80-83
  quotation bug and the 9:30-33 imprecation both live there.
- **A failed tafsir fetch is unknown, never confirmation** — but see the second
  finding above: check for a verbatim twin earlier in the surah first.
- The negation budget in the skill uses a narrower token list than a plain
  regex — calibrate against published articles, not the raw number.
