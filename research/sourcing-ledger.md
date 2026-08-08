# Sourcing Ledger — the Hidayah Book

*Honest, tiered inventory of every citation the book leans on, by verification status. The
verification gap can't be *fully* closed by Claude alone — hadith grading needs a specialist,
and classical/Western exact loci need the physical texts — but this ledger makes each item
tractable: what's claimed, where used, what's confirmed, and what remains. The load-bearing
layer (Quranic + tafsir) is fully verified; what remains is the secondary illustrative/bridge
layer.*

**Date:** 2026-07-22. Companion to the chapter foundations and `book-enhancement-dossier.md`.

---

## Tier A — VERIFIED (closeable, done)

### A.1 The Quranic + tafsir layer — the book's load-bearing content — FULLY VERIFIED
Every occurrence-claim was produced by corpus census; every interpretive claim was checked
against four mufassirūn (Ibn Kathīr, al-Ṭabarī, al-Muyassar, al-Jalālayn) via
`cross_reference_tafsir.mjs`. Covered across the foundations: ~60+ verses spanning all 8
chapters (Part A/A.6/A.7/A.8 of the dossier; qadar, signs, instrument, preparation, bookends
foundations). Two synthesis-labels applied where a modern framing outran the classical base
(75:5 motivated-reasoning; 29:67 hedonic-adaptation). **This is ~90% of what the book asserts,
and it is done.** Remaining Quranic-layer item: nothing outstanding.

### A.2 Discrete facts — VERIFIED this session
- **The "seventeen times a day" claim** (Same Rain draft, ch. 1): ✓ Fajr 2 + Dhuhr 4 + Asr 4 +
  Maghrib 3 + Isha 4 = 17 fard rakʿahs; al-Fātiḥa (with *ihdinā*) recited in each. Correct.
- **The rain/soils hadith** (Same Rain draft, ch. 5; dossier A.4): ✓ **Ṣaḥīḥ al-Bukhārī 79**
  (Kitāb al-ʿIlm), also **Ṣaḥīḥ Muslim 2282**, narrated **Abū Mūsā al-Ashʿarī**. In Bukhārī ⇒
  **ṣaḥīḥ**. The three ground-types (absorbs-and-grows / holds-for-others / barren) match the
  drafted usage. Flag removed from the draft.
- **Ibn Barrajān of Seville** (Signs ch. / dossier B.6, the "two books"): ✓ **d. 536/1141**,
  Seville; his Qurʾān commentary *Īḍāḥ al-ḥikma bi-aḥkām al-ʿibra* centers God's signs in
  nature and "the crossing from the visible to the unseen" — exactly the articulate/inarticulate
  two-books theme. **Citable modern source:** Yousef Casewit, *The Mystics of al-Andalus: Ibn
  Barrajān and Islamic Thought in the Twelfth Century* (Cambridge UP, 2017); also "A Muslim
  Scholar of the Bible," *Journal of Qurʾanic Studies* (2016). Anchor is solid; use Casewit for
  the precise claim rather than paraphrasing from memory.

---

## Tier B — HADĪTH: likely source known, GRADING needs a specialist before print

These are cited from training knowledge. The collection is stated with reasonable confidence;
**the exact reference and (where not in the two Ṣaḥīḥs) the authenticity grading must be
confirmed against a hadith database (sunnah.com / hadeethenc.com) or a scholar before any use.**
Do NOT print a grade Claude asserted.

| Claim / use | Likely source (confidence) | What to confirm |
|---|---|---|
| The two *lammah*s — the angel's touch (truth) and the devil's touch (evil) on the heart (dossier B.2, khawāṭir taxonomy) | al-Tirmidhī (moderate confidence); Tirmidhī graded it — recall *ḥasan* but **unconfirmed** | exact ref + grading; whether Ghazālī's Iḥyāʾ is the better citation vehicle |
| *Yā muqallib al-qulūb, thabbit qalbī ʿalā dīnik* — the Prophet's frequent duʿāʾ (Instrument ch., taqlīb of hearts; cf. 6:110) | al-Tirmidhī (high confidence it exists; widely narrated) | exact ref + grading |
| The *muḍgha* hadith — "in the body is a morsel; when sound, the whole body is sound… it is the heart" (Instrument ch., organ-centrality) | al-Bukhārī & Muslim (high confidence — famous, part of the Nuʿmān b. Bashīr ḥadīth on the lawful/unlawful) | exact refs (Bukhārī 52 / Muslim 1599 area) |
| "God does not look at your forms but at your hearts" (Preparation/Instrument) | Ṣaḥīḥ Muslim (high confidence — Abū Hurayra) | exact ref (Muslim 2564 area) |

---

## Tier C — CLASSICAL TEXT LOCI: work likely known, exact passage needs the physical text

Claude can name the probable work; it **cannot supply a reliable page/volume or exact Arabic
wording from memory.** Confirm against the actual editions before quoting.

- **Ibn al-Qayyim — the khāṭira-chain** (khāṭira → fikra → shahwa/irāda → ʿazm → fiʿl → ʿāda)
  (dossier B.1, Instrument/Waswasa). Likely in *al-Fawāʾid* and/or *Madārij al-Sālikīn*.
  **Confirm the exact passage.**
- **Ibn al-Qayyim — the four movements of contemplation** (Preparation ch.; also in the ebook).
  Likely *Miftāḥ Dār al-Saʿāda* or *al-Fawāʾid*. **Confirm locus.**
- **Ibn al-Qayyim — heart-typology** (qalb ṣaḥīḥ / mayyit / marīḍ) — likely *Ighāthat al-Lahfān*.
  **Confirm.**
- **Ibn al-Qayyim — *Ighāthat al-Lahfān min maṣāyid al-shayṭān*** (Waswasa ch., genre-ancestor).
  Title verified as a real work; cite thematically, confirm any specific claim.
- **al-Ghazālī — Iḥyāʾ, Book 21 (Kitāb sharḥ ʿajāʾib al-qalb)** (khawāṭir taxonomy, mirror-and-
  rust). Book number widely cited as Book 21 of the Iḥyāʾ (Rubʿ al-Muhlikāt) — **confirm** and
  get the mirror/ṣadaʾ passage's exact wording.
- **al-Ghazālī — Mishkāt al-Anwār** (light metaphysics, Signs ch.) — real work; use cautiously
  (its emanationism exceeds the book's need). Confirm any quoted line.
- **al-Rāghib al-Iṣfahānī — Mufradāt** (qalb/fuʾād/ṣadr/lubb discriminations; h-d-y entry)
  (dossier B.4). Standard reference; confirm the specific entries' wording.
- **Ibn al-Jawzī — Talbīs Iblīs**; **al-Muḥāsibī — al-Riʿāya**; **Ibn ʿAṭāʾillāh — al-Ḥikam**
  (dossier B.3) — all real works; confirm any specific quotation.
- **The classical hidāyah-taxonomy** (ʿāmma / bayān / tawfīq / ilā-l-maqṣad) (qadar foundation
  §Tool-1; dossier B.5) — this is a standard mufassir/uṣūl crystallization (Ibn al-Qayyim,
  later tafsīr-primers). The *verses* anchoring each level are tafsir-verified (Tier A); the
  *taxonomy's attribution* should be pinned to a named source (e.g. Ibn al-Qayyim) before print.

---

## Tier D — WESTERN / MODERN: memory-paraphrases, need the actual books before quoting

Every one of these is a paraphrase from training knowledge. **None may be quoted or attributed
with a specific wording until checked against the actual text.** They are *bridges* (dossier
C.5: one per chapter, after the Quranic case, with a disanalogy) — secondary by design, so an
unverified bridge simply waits; it never blocks a chapter.

- **Iris Murdoch**, *The Sovereignty of Good* (attention/vision; the M-and-D example) — verify
  wording of the attention claim + the mother-in-law passage.
- **Simone Weil** (attention as the substance of prayer) — verify source essay + wording.
- **William James**, *Principles* (Will/Attention: "effort of attention is the essential
  phenomenon of will") + *Varieties* (the "habitual centre of personal energy") — verify both.
- **Plato**, *Republic* VII 518c-d (the *periagōgē* / turning the soul) — verify the Stephanus
  passage + a translation.
- **Aristotle / McDowell** (virtue as trained perception) — verify McDowell's formulation.
- **The Stoics** (Epictetus on assent; *prosochē*) — verify the Enchiridion/Discourses loci.
- **Augustine** (*ordo amoris*; *Confessions* VIII divided will) — verify.
- **Pascal**, *Pensées* (*divertissement*) — verify the fragment.
- **C. S. Lewis**, *The Screwtape Letters* ("the safest road to Hell is the gradual one") —
  verify the quotation (Letter XII).
- **Kierkegaard**, *Purity of Heart Is to Will One Thing* — verify.
- **Charles Taylor**, *A Secular Age* (buffered vs porous self) — verify the terms' usage.
- **Predictive processing** (Clark/Seth/Friston) — use as one caveated paragraph only; verify.
- **Attention economy** (J. Williams *Stand Out of Our Light*; Crawford; Hari) — verify.
- **Izutsu**, *God and Man in the Koran* / *Ethico-Religious Concepts* (the semantic-field
  method = the book's corpus method's lineage) — verify the method attribution.
- **Nursi**, *Risale-i Nur* (manā-yi ḥarfī / manā-yi ismī) — verify locus.
- **al-Attas** (knowledge as "the arrival of meaning in the soul…") — verify exact formulation.

---

## The honest bottom line

- **Closed:** the entire Quranic + tafsir layer (the book's substance), plus the 17-rakʿah
  fact, the rain hadith (Bukhārī 79 / Muslim 2282, ṣaḥīḥ), and Ibn Barrajān (d. 536/1141 +
  Casewit source).
- **Cannot be closed by Claude alone, by design:** hadith grading (Tier B — needs a specialist
  or an authoritative database lookup Azam runs) and classical/Western exact loci and wordings
  (Tiers C–D — need the physical texts). These are **secondary/illustrative**, not load-bearing.
- **What Azam should do:** (1) for the four Tier-B hadiths, a 20-minute sunnah.com/hadeethenc
  pass to pin refs + grades; (2) for Tier C, pull the named editions (or have the scholar-
  reviewer do it during the D.4.8 read — kalam + hadith are the same expertise); (3) for Tier D,
  verify each bridge's wording only when/if that chapter is actually drafted (they're optional).

*The verification gap is now inventoried and tiered. The load-bearing layer is verified; the
remainder is explicit, bounded, and assigned. Nothing in the book's core rests on an unverified
claim.*
