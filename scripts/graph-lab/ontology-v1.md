# Tadabbur Knowledge-Graph Ontology — v1 (candidate)

Built **bottom-up** from `recurring-terms.txt` (1,002 terms ≥5×, 18,674 total uses) and reconciled against the old 45-slug `concept-vocabulary.md` (which captured only ~25% of usage). This is a **multi-axis** controlled vocabulary: a single passage gets tagged on several orthogonal axes at once, not forced into one flat list.

The core failure of the old vocab was conflating *what a passage is about* (theme), *who Allah is shown to be* (attribute), *how the Arabic says it* (rhetoric/grammar), *who appears* (character), *what the human feels* (state), and *what the modern bridge is* (analogy). Those are six different kinds of node and must be separate axes, or every query collapses.

---

## 0. Axes (node categories)

The prior scan's seven axes are confirmed, with two refinements: SURAH-REFERENCE is split out as its own axis (it is structurally distinct — it is a citation, not a theme), and DIVINE-ATTRIBUTE is split internally into *named attributes* (al-asma) vs *divine-action themes* (see §2 note). Final axis set:

| # | Axis | What it answers | ~Canonical size |
|---|------|-----------------|-----------------|
| A | **THEME** (concept) | What is this passage *about*? | ~150 |
| B | **DIVINE-ATTRIBUTE** | Who is Allah shown to be here? | ~45 |
| C | **RHETORICAL-DEVICE** (balāghah) | What rhetorical move is being made? | ~30 |
| D | **GRAMMATICAL-FEATURE** | What morphosyntactic feature carries meaning? | ~30 |
| E | **CHARACTER / PEOPLE** | Who appears? | ~35 |
| F | **HUMAN-STATE** (emotional/spiritual) | What inner state is depicted/evoked? | ~45 |
| G | **MODERN-BRIDGE** | What contemporary concept is the analogy? | ~15 |
| H | **SURAH-REFERENCE** | Which surah / structural locus? | ~40 (closed, not curated) |
| — | **NOISE** (drop) | — | excluded |

**Estimated total curated canonical vocabulary: ~350 terms** (down from 1,002 raw via merging + noise removal), plus the SURAH-REFERENCE axis (~40, mechanically derived, not hand-curated) and an EVENT mini-axis folded into E.

---

## A. THEME / CONCEPT axis

The dominant axis. Note the heavy synonym collapse — the corpus says the same theme in English, transliterated Arabic, and variant spellings.

### Theology & God-relationship themes
- `tawhid` — divine oneness/unity — [tawhid]
- `shirk` — associating partners with Allah — [shirk, idolatry, false-gods, idols, taghut, ittikhadh (when "taking others as lords")]
- `iman` — faith/belief — [iman, faith, belief]
- `kufr` — disbelief / covering of truth — [kufr, kufr-as-covering, disbelief, juhud]
- `nifaq` — hypocrisy — [nifaq, hypocrisy, munafiqun]
- `taqwa` — God-consciousness — [taqwa, taqwa-as-shield, fear-of-allah (overlaps khashyah — see §F note)]
- `ihsan` — excellence/beauty in worship — [ihsan]
- `ibadah` — worship/servitude — [ibadah, worship, ubudiyyah, servanthood, servitude, cosmic-worship]
- `tawakkul` — reliance on Allah — [tawakkul, trust (in-Allah sense), dependence, dependency]
- `tawbah` — repentance/turning back — [tawbah, tawba, repentance, inabah, inaba, ruju, return-to-allah, return-to-Allah, awwab (overlaps)]
- `dhikr` — remembrance of Allah — [dhikr, remembrance, tadhakkur, dhikra]
- `dua` — supplication — [dua, du'a, supplication, najwa (overlaps), prophetic-prayer]
- `tasbih` — glorification — [tasbih, hamd, tabaraka (overlaps attribute), tilawah?? → no]
- `istighfar` — seeking forgiveness — [istighfar, istiadha?? → no (that's refuge)]
- `ikhlas` — sincerity — [ikhlas, sincerity, sidq (overlaps truthfulness), riya (antonym → keep separate as state)]
- `tadabbur` — reflection on revelation — [tadabbur, tafakkur, reflection, tafsir?? no]
- `fitrah` — innate disposition — [fitrah, fitra, fitra]

### Revelation & prophethood themes
- `hidayah` — guidance / being led astray — [hidayah, guidance, huda, hudan, hudud?? NO (hudud=legal limits), rushd, rushd, straight-path, sirat-mustaqim, sirat-mustaqim, irat-mustaqim, dalal (antonym→misguidance), misguidance]
- `revelation` — the act/fact of wahy — [revelation, wahy, tanzil, gradual-revelation, divine-speech, divine-address, divine-command]
- `quran` — the Book itself — [quran, kitab, scripture, furqan (overlaps criterion), criterion, tanzil(overlaps)]
- `prophethood` — nubuwwah / messengership — [prophethood, prophetic-mission, risalah, risalah, prophecy, messengers, rasul, rusul, prophets, prophet]
- `prophetic-method` — how prophets call/argue — [prophetic-method, prophetic-pattern, dawah, da'wah, daʿwah, balagh, indhar, warning (overlaps), prophetic-confrontation, prophetic-address]
- `covenant` — divine pledge — [covenant, mithaq, ahd, ahd]
- `muqattaat` — disconnected letters — [muqattaat] *(borderline rhetorical — keep in theme)*

### The Unseen & eschatology themes
- `akhirah` — the hereafter (general) — [akhirah, akhira, hereafter, afterlife, the-last-day, dunya-akhira (overlaps dunya)]
- `resurrection` — bodily raising — [resurrection, ba'th, nushur, revival, gathering, hashr (overlaps), thaqalan?? no]
- `qiyamah` — the Day/Hour — [qiyamah, yawm-al-qiyamah, day-of-judgment, judgment-day, the-hour, hour, the-last-day(overlaps), yawm-al-din, yawm-al-fasl, the-day]
- `accountability` — reckoning/weighing — [accountability, hisab, reckoning, mizan, scale, the-record, individual-accountability, self-accountability, collective-responsibility, individual-responsibility, responsibility]
- `judgment` — divine verdict — [judgment, divine-judgment, recompense, jaza, jaza, recompense]
- `jannah` — paradise — [jannah, paradise, gardens, gardens]
- `jahannam` — hellfire — [jahannam, hellfire, hell, fire, jannah?? no]
- `barzakh` — intermediate realm — [barzakh]

### Divine governance themes *(distinct from §B named attributes — these are theological topics)*
- `qadar` — divine decree/predestination — [qadar, qadr, divine-decree, decree, taqdir, divine-will, mashiah, mashi'ah, iradah, divine-pattern, sunnat-allah, divine-timing, ajal, ajal-musamma, appointed-term, divine-promise, divine-pledge]
- `divine-justice` — justice as governance — [divine-justice, justice, adl, qist, qist, mercy-and-justice (overlaps)]
- `divine-mercy` — mercy as governance theme — [divine-mercy, mercy, rahmah, rahma, rahma, hidden-mercy, warning-as-mercy, divine-grace, grace, fadl, fadl, divine-favor, divine-favors, ni'mah, niʿma, ala, ala-favors, barakah, blessing, blessings] *(note: ar-rahman the NAME lives in §B)*
- `free-will` — human agency vs decree — [free-will, agency, kasb, choice, ikhtiyar?? (not present)]
- `divine-testing` — trials — [divine-testing, trial, test, testing, ibtila, bala, fitnah, fitna, hardship, hardship, affliction]
- `rizq` — provision — [rizq, provision, sustenance, divine-provision, divine-economy, divine-sustenance]
- `divine-pedagogy` — Allah's teaching method — [divine-pedagogy, divine-irony, divine-reversal, istidraj (overlaps), respite (overlaps)]

### Human conduct / ethics themes
- `gratitude` — thankfulness — [gratitude, shukr, hamd?? (→tasbih), ingratitude (antonym→kufran), kufr-as-ingratitude]
- `sabr` — patience/steadfastness — [sabr, patience, steadfastness, perseverance, thabat, firmness, istiqamah, istiqama]
- `knowledge` — knowing / epistemology — [knowledge, ilm, knowledge-of-the-unseen, divine-knowledge?? (→§B), epistemology, epistemic-humility, discernment]
- `wisdom` — hikmah — [wisdom, hikmah, divine-wisdom]
- `law-and-ethics` — rulings/boundaries — [law-and-ethics, fiqh, hukm, hudud, halal, haram, boundaries, taklif, adab, akhlaq, character, speech-ethics, modesty, chastity]
- `social-justice` — equity/oppression — [social-justice, justice (overlaps), oppression, zulm, dhulm, ẓulm, dhulm, tyranny, tughyan, baghy, fasad, corruption, wrongdoing, transgression]
- `charity` — giving — [charity, infaq, sadaqah, zakat, zakah, spending, generosity, qard-hasan, birr (overlaps)]
- `family` — kinship/marriage/lineage — [family, marriage, children, parents, motherhood, inheritance, kinship, lineage, household, prophetic-household, divorce, mawaddah, mawadda, brotherhood]
- `community` — ummah & social fabric — [community, ummah, brotherhood (overlaps family), belonging, unity, sectarianism, fragmentation, division, social-fabric, social-pressure (overlaps state), shura]
- `economics` — wealth/material — [economics, wealth, materialism, bukhl, stinginess, israf, reciprocity]
- `dawah` *(see prophetic-method — merge there)*
- `dhikr/dua/etc` *(in God-relationship)*

### Creation & cosmos themes
- `creation` — khalq — [creation, khalq, khalq, human-origin, kun-fayakun, taswiyah, taswiyah]
- `signs` — ayat as evidence — [signs, ayat, signs-of-allah, divine-signs, ayat-allah, ayat-kawniyyah, cosmic-signs, signs-in-creation, ayah-as-sign, sign, ayah, ala (overlaps mercy), bayyinat, bayyinah, bayyinah, evidence, dalil, istidlal (overlaps rhetoric)]
- `nature` — natural phenomena — [nature, rain, water, wind, mountains, night, darkness, light, nur, night-and-day, cosmos, earth, cosmic-order, cosmology, taskhir (subjugation of nature)]
- `history` — past nations/patterns — [history, generations, nations, destroyed-nations, ruins, civilizational-collapse, sunnat-allah (overlaps qadar), destruction, ihlak, sayhah, flood, qaryah]

### Conflict / society-under-stress themes
- `jihad` — striving/struggle — [jihad, struggle, striving, nusrah, nasr, naṣr, nasr, victory, intisar, divine-help]
- `persecution` — oppression of believers — [persecution, hijrah, hijra, hijra, exile, isolation, refuge, deliverance, rescue, najah, najat, escape]
- `polemic` — argument with opponents — [polemic, jadal, jidal, disputation, dispute, hujjah, hujjah, burden-of-proof, challenge, accusation, fabrication, iftira, fabrication, falsehood, slander, qadhf, ifk, dialogue]

### Misc high-frequency themes
- `denial` — rejection of truth — [denial, takdhib, takdhīb, takdhib-denial, rejection, refusal, turning-away, tawalli, iʿrāḍ, i'rad, avoidance, mockery, istihza, istihza, mockery]
- `heedlessness` — ghaflah — [heedlessness, ghaflah, ghafla, distraction, lahw, laghw, forgetting, nisyan]
- `arrogance` — kibr — [arrogance, kibr, istikbar, takabbur, pride, ego, takabbur, ghurur, self-sufficiency (overlaps), self-deception (overlaps state)]
- `truth` — haqq — [truth, haqq, al-haqq, haqq, bil-haqq, truthfulness, sidq, sidq, tasdiq, integrity]
- `intercession` — shafaah — [intercession]
- `wilayah` — alliance/protection-bond — [wilayah, walaya, walaya, awliya, wali, awliya, mawla, loyalty, allegiance, following, ittiba]
- `divine-protection` — guarding — [divine-protection, protection, hifz, security, refuge (overlaps persecution), sakina, sakinah, sakina, divine-care, divine-rescue]
- `dunya` — worldly life — [dunya, materialism (overlaps), impermanence, transience, illusion-of-permanence, illusion-of-control (overlaps bridge), permanence]

---

## B. DIVINE-ATTRIBUTE axis

Two sub-kinds: (B1) the canonical **al-asma al-husna** when invoked as a *name*, and (B2) **attribute-themes** (predications about Allah not tied to a single name). Both are "who Allah is," distinct from §A themes which are topics.

### B1 — Named attributes (asma)
- `ar-rahman` — The Most Merciful — [ar-rahman]
- `al-aziz` — The Almighty/Mighty — [al-aziz, izzah, izza, izza]
- `al-hakim` — The Wise — [al-hakim]
- `al-hakim` *(see)*; `al-khabir` — The All-Aware — [khabir, khabir]
- `al-ghani` — The Self-Sufficient — [al-ghani, ghani, ghina, istighna, self-sufficiency (when of Allah), divine-self-sufficiency, divine-independence, divine-sufficiency, sufficiency]
- `as-sami` / `al-basir` — The All-Hearing/All-Seeing — [sami-alim, basir, divine-sight, divine-hearing?, hearing(overlaps state), sight(overlaps)]
- `al-qadir` — The All-Powerful — [qadir, qudrah, qadir, divine-power, divine-omnipotence]
- `al-wakil` — The Trustee — [wakil]
- `al-jabbar` — The Compeller — [jabbar]
- `al-mulk`/`al-malik` — The Sovereign — [al-mulk, mulk, mulk, kingship, dominion, sovereignty, divine-sovereignty, lordship, rabb (overlaps), rububiyyah, rububiyya, rububiyyah, lordship, dominion]
- `rabb` — The Lord/Sustainer — [rabb, lordship, rububiyyah] *(major — possibly own node)*

### B2 — Attribute-themes
- `divine-mercy-attr` — Allah AS merciful — [divine-mercy (the attribute predication), divine-tenderness, divine-intimacy, divine-nearness, nearness, proximity, maiyyah, divine-presence, divine-pleasure, ridwan, divine-generosity, divine-craftsmanship]
- `divine-knowledge` — Allah's omniscience — [divine-knowledge, divine-omniscience, omniscience, divine-witness, divine-witnessing, divine-sight, surveillance, being-seen, being-known, being-fully-known, observation, encompassment, ihata, knowledge-of-the-unseen]
- `divine-power` — Allah's omnipotence/agency — [divine-power, divine-agency, divine-decree (overlaps §A qadar — judgment call), divine-reversal, taskhir(overlaps)]
- `divine-justice-attr` — Allah AS just — [→ usually §A; keep §A canonical]
- `divine-names` — meta: the names as a topic — [divine-names, divine-attributes, names-of-allah, asma, tanzih, tanzih (transcendence), divine-transcendence, transcendence]
- `divine-will` — [→ merged into §A qadar; cross-link]
- `divine-speech` — Allah as speaker — [divine-speech, divine-address (overlaps revelation), kalam]
- `tanzih` — transcendence/incomparability — [tanzih, divine-transcendence, transcendence, tabaraka, tabaraka]

> **Note for scholar:** B vs A boundary for `divine-mercy`, `divine-justice`, `divine-power`, `divine-decree` is the single biggest design tension. Recommendation: keep ONE canonical per concept and dual-tag it on both axes via the graph edge, rather than duplicating slugs. A passage about Allah's mercy is *about mercy* (theme) AND *reveals ar-Rahman* (attribute).

---

## C. RHETORICAL-DEVICE axis (balāghah)

Pure SIGNAL — this axis is the corpus's distinctive value and was entirely absent from the old vocab.

- `iltifat` — grammatical-person shift — [iltifat, iltifat-address-shift, asymmetric-address, dual-address (overlaps grammar), asymmetric-grammar]
- `istifham-inkari` — rhetorical/negating question — [istifham-inkari, rhetorical-question, rhetorical-questions, divine-questioning]
- `qasam` — oath formula — [qasam, oath, oaths, divine-oath, jawab-al-qasam (the oath's response)]
- `idrab` — rhetorical retraction (bal) — [idrab]
- `qasr` — restriction/exclusivity — [qasr-restriction, hasr, hasr-restriction, restriction, restriction-particle, innama-restriction, qasr]
- `taqdim` — fronting for emphasis — [taqdim]
- `mathal` — parable/simile — [mathal, parable, parables, mubalagha (overlaps), tazyin?? no]
- `mubalagha` — hyperbolic intensification form — [mubalagha, mubalagha]
- `ijaz` — concise omission — [ijaz, ellipsis, suppressed-apodosis, unspecified-object, unspecified-object]
- `istidlal-bil-mahsus` — argument from the sensible — [istidlal-al-maqul-bil-mahsus, istidlal-bil-mahsus, istidlal]
- `refrain` — structural repetition — [refrain, refrain-structure, repetition, accumulation]
- `iltizam`/`tibaq`/`muqabala` — antithesis/contrast — [contrast, asymmetry, asymmetric-absence, duality, counterfactual]
- `irony` — divine/literary irony — [irony, divine-irony (overlaps §A pedagogy), divine-reversal (overlaps)]
- `dual-address` — addressing two parties — [dual-address, dual-form (overlaps grammar), taghlib]
- `bushra/indhar` — glad-tidings vs warning pairing — [bushra, glad-tidings, indhar, warning(overlaps §A), nadhir, nudhur, warner, woe, wayl]
- `divine-passive` — agent-suppression for awe — [divine-passive, passive-voice-theology, passive-voice (overlaps grammar)]

> Several entries (`divine-irony`, `divine-reversal`, `passive-voice`) sit on the C/D/A seam; flagged for scholar adjudication in §5.

---

## D. GRAMMATICAL-FEATURE axis (morphosyntax-as-meaning)

- `form-II` — taf'il intensification/causation — [form-II-intensification, form-ii, form-II, form-ii-intensification, form-II-intensive]
- `form-IV` — if'al causative — [form-IV-causative, form-iv]
- `form-VIII` — ifti'al reflexive — [form-viii, form-VIII-reflexive]
- `form-X` — istif'al seeking — [form-X-seeking]
- `form-III` — mufa'ala reciprocity — [form-III-reciprocity]
- `active-participle` — ism al-fa'il — [active-participle]
- `cognate-accusative` — maf'ul mutlaq — [cognate-accusative, maful-mutlaq, maf'ul-mutlaq]
- `partitive-min` — partitive preposition — [partitive-min]
- `nun-al-tawkid` — emphatic nun — [nun-al-tawkid]
- `damir-al-fasl` — pronoun of separation — [damir-al-fasl]
- `nominal-sentence` — jumla ismiyya (permanence) — [nominal-sentence]
- `tense-asymmetry` — perfect vs imperfect contrast — [perfect-vs-imperfect-tense, tense-asymmetry]
- `passive-voice` — grammatical passive — [passive-voice] *(theological reading → §C divine-passive)*
- `dual-grammar` — dual number/forms — [dual-grammar, dual-form]
- `hal-construction` — circumstantial accusative — [hal-construction]
- `istithna` — exception (illa) — [istithna, exception, am-munqatia, istithna]
- `fa-of-consequence` — fa' al-sababiyya — [fa-of-consequence]
- `qiraat` — variant readings — [qiraat, qiraat-variation, qiraat]
- `morphology` — meta-tag for word-form analysis — [morphology] *(borderline noise — see §3)*

---

## E. CHARACTER / PEOPLE axis

Includes prophets, named individuals, peoples/nations, and a folded EVENT sub-axis (battles/episodes are proper nouns of the same kind).

### Prophets & individuals (collapse English↔transliteration)
- `musa` — Moses — [musa, moses]
- `ibrahim` — Abraham — [ibrahim]
- `yusuf` — Joseph — [yusuf]
- `nuh` — Noah — [nuh]
- `sulayman` — Solomon — [sulayman]
- `dawud` — David — [dawud]
- `isa` — Jesus — [isa]
- `lut` — Lot — [lut]
- `salih` — [salih]
- `hud` — [hud]
- `shuayb` — [shuayb]
- `harun` — Aaron — [harun]
- `yaqub` — Jacob — [yaqub]
- `yunus` — Jonah — [yunus]
- `maryam` — Mary — [maryam]
- `adam` — [adam]
- `luqman` — [luqman]
- `dhul-qarnayn` — [dhul-qarnayn]
- `the-prophet` — Muhammad ﷺ as character — [prophet (when referent is the Prophet), prophetic-character]
- `iblis` — [iblis, shaytan (overlaps theme — keep BOTH: shaytan=theme/enmity, iblis=character)]

### Antagonists & named figures
- `pharaoh` — [pharaoh, firawn, firawn]
- `qarun` — Korah — [qarun]
- `bilqis` — Queen of Sheba — [bilqis]
- `samiri` — [samiri]
- `qarin` — the companion(-figure) — [qarin]
- `magicians` — Pharaoh's sorcerers — [magicians]
- `hoopoe` — [hoopoe] *(borderline — recurring only via An-Naml; keep)*

### Peoples / nations
- `bani-israil` — Children of Israel — [bani-israil, bani-israel]
- `ahl-al-kitab` — People of the Book — [ahl-al-kitab, people-of-the-book]
- `quraysh` — [quraysh]
- `thamud` — [thamud, she-camel (their sign — overlaps), salih(prophet)]
- `aad` — [aad]
- `madyan` — [madyan]
- `people-of-lut` — [people-of-lut]
- `munafiqun` *(→ merged into §A nifaq; but as a named group, cross-link)*
- `jinn` — [jinn, jinn-and-mankind (overlaps thaqalan), thaqalan, al-thaqalan]
- `angels` — [angels, malaika, mala'ikah]

### EVENT sub-axis (folded)
- `badr` — [badr]
- `uhud` — [uhud]
- `ahzab` — Battle of the Trench — [ahzab, battle-of-trench, battle-of-the-trench]
- `hudaybiyya` — [hudaybiyyah, hudaybiyya]
- `tabuk` — [tabuk]
- `banu-nadir` — [banu-nadir]
- `hijrah` *(→ §A persecution theme, but also a historical event — cross-link)*

---

## F. HUMAN-STATE axis (emotional / spiritual / psychological)

The inner-life axis. Distinct from §A *themes* (a passage can be *about* taqwa while *evoking* fear). Many of these are the affective counterpart of a theme.

### Affect (emotions)
- `fear` — [fear, khawf, khashyah, khashya, khashyah, awe, reverence, ishfaq]
- `hope` — [hope, raja, fear-and-hope, optimism]
- `grief` — [grief, suffering, distress, anxiety, despair, abandonment]
- `joy` — [joy, comfort, consolation, ease, rest, contentment, inner-peace, peace, salam, salam, sakina(overlaps protection), tranquility]
- `regret` — [regret, blame, confession, conscience]
- `humility` — [humility, surrender, submission, taslim, islam(as submission state), servitude(overlaps)]
- `gratitude-state` *(→ §A gratitude; affective overlap noted)*
- `love` — [love, mahabbah, attachment, intimacy]
- `desire` — [desire, hawa, lust, hawa]
- `envy` — [envy, hasad, ghayz]
- `enmity` — [enmity, betrayal]
- `courage` — [courage, strength, firmness(overlaps sabr)]

### Cognitive/spiritual states & pathologies
- `certainty` — [certainty, yaqin, yaqeen, yaqin, conviction]
- `doubt` — [doubt, conjecture, zann, conjecture, suspicion, uncertainty]
- `self-deception` — [self-deception, delusion, illusion, false-security, false-security, ghurur(overlaps arrogance), illusion-of-control]
- `hardness-of-heart` — [hardness-of-heart, hardness-of-heart, blindness, spiritual-blindness, kufr-as-covering(overlaps)]
- `motivated-reasoning` *(→ §G bridge; the modern label)*
- `restraint` — [restraint, divine-restraint(→§B?), hilm, forbearance, divine-patience, patience(overlaps sabr)]
- `impatience` — [impatience, haste, istiʿjāl, istiʿjāl, time-and-urgency, procrastination, temporal-discounting(→§G)]
- `khushu` — humble focus in worship — [khushu, khushu, presence, attention, reverence(overlaps), listening, hearing]
- `dignity` — [dignity, honor, human-dignity, status, vulnerability(antonym-adjacent)]

### The faculties / inner organs (psychology vocabulary)
- `qalb` — the heart as organ of cognition — [qalb, the-heart, heart, hearts, the-heart]
- `nafs` — the self/soul — [nafs, the-nafs, soul, the-soul, the-self, self-knowledge, self-examination, inner-life, interior-life, identity, ego(overlaps)]
- `aql` — intellect/reason — [aql, intellect, reason, faculties, perception, recognition, cognition]

---

## G. MODERN-BRIDGE axis

The contemporary-concept layer. Small, high-value, must stay quarantined from classical vocabulary so a reader/scholar can see exactly where modern framing is introduced.

- `motivated-reasoning` — [motivated-reasoning, psychology-of-disbelief, psychology-of-rejection, projection, rationalization]
- `cognitive-dissonance` — [cognitive-dissonance]
- `hedonic-adaptation` — [hedonic-adaptation, hedonic-treadmill]
- `temporal-discounting` — [temporal-discounting, time-and-urgency(overlaps state)]
- `scarcity-mindset` — [scarcity-mindset, scarcity]
- `social-proof` — [social-proof, social-pressure, taqlid(overlaps), inherited-belief, conformity]
- `illusion-of-control` — [illusion-of-control]
- `identity-protective-cognition` — [identity(when modern), tribalism]
- `epistemology` *(→ §A knowledge; modern epistemology overlaps — judgment call)*

> Keep this list **deliberately short and audited**. Every bridge term is a claim that a 7th-century text maps to a modern construct; that is exactly where a scholar must sign off (§5).

---

## H. SURAH-REFERENCE axis

Closed, mechanically derived from surah tags — NOT hand-curated as concepts. Collapse the three naming styles: `surah-X`, `X`, and the bare name. Examples present in the corpus:

- `al-fatiha`, `al-baqarah`, `aal-imran` …
- `surah-qaf`↔`qaf`, `surah-sad`↔`sad`, `surah-al-qamar`↔`al-qamar`↔`surah-al-qamar`, `ya-sin`↔`yasin`↔`ya-sin`, `an-najm`, `ar-rum`, `az-zumar`, `az-zukhruf`, `al-kahf`, `ankabut`, `naml`↔`an-naml`, `fussilat`, `surah-saba`↔`saba`, `surah-muhammad`, `ghafir`, `fatir`, `al-fath`, `al-mulk`, `al-insan`, `al-mursalat`, `an-naba`, `at-tur`, `al-waqiah`, `al-qalam`, `al-jathiyah`, `al-ahqaf`↔`ahqaf`, `al-maarij`, `al-hashr`, `al-hadid`, `al-falaq`, `al-layl`, `adh-dhariyat`, `as-saffat`, `ta-ha`, `qasas`, `anbiya`, `hajj`, `an-nur`↔`surah-an-nur`, `al-furqan`, `surah-shuara`, `mu'minun`, `taghabun`, `juz-amma`, `hawamim` (the Ha-Mim family), `mecca/makkah/makki/makkan/meccan/makkan-surahs/makkan-period/meccan-period/makkan-surah/meccan-surah` → **collapse all to a `makkan` *period* tag**, likewise `madani`.

> **Recommendation:** generate this axis programmatically from each file's surah/ayah path (filesystem already encodes it). Do not curate by hand. The Makkan/Madinan-period cluster (~15 variant slugs) should collapse to two period tags on a separate tiny **REVELATION-PERIOD** facet.

---

## 3. NOISE vs SIGNAL

**Drop as NOISE** (recurring but not navigable — too generic, meta, or category-redundant):

- Bare generic abstractions that match nothing specific: `power`, `time`, `truth`?(keep→haqq), `speech`, `knowledge`?(keep→ilm), `purpose`, `control`, `success`, `loss`, `consequence`, `presence`, `clarity`, `recognition`, `attention`, `silence`, `mystery`, `language`, `naming`, `waiting`, `journey`, `habit`, `scale`, `balance`, `nearness`(keep→divine-mercy-attr), `legacy`, `belonging`(keep→community), `comfort`(→joy).
  - *Decision rule:* if a generic English word ONLY appears because a reflection used it descriptively and it has no Arabic/technical anchor, drop it. If it maps cleanly to a technical canonical, merge it (above) rather than drop.
- Process/meta tags that describe the *document*, not the *content*: `morphology`, `rhetoric`, `balaghah`, `surah-architecture`, `surah-closing`, `closing-ayah`, `the-open-door`, `juz-amma`(→period/locus), `tafsir`, `reflection`(→tadabbur), `recitation`/`tilawah`(borderline — keep tilawah as ibadah?).
- Single-surah artifacts that are really one passage's hook: `she-camel`, `hoopoe`, `dabbah`, `sacred-space`, `the-open-door` — keep `she-camel`/`hoopoe` ONLY as character/sign cross-refs, drop the rest.

**Strong SIGNAL** (definitely keep, even where frequency is modest): the entire §C rhetorical and §D grammatical axes (these are the corpus's scholarly differentiator), all §E proper nouns, all §G bridges, and the technical Arabic of §A/§B.

---

## 4. Estimated final canonical vocabulary size

| Axis | Raw terms feeding it | Canonical after merge | 
|------|---------------------|----------------------|
| A — Theme | ~420 | **~150** |
| B — Divine-attribute | ~70 | **~45** |
| C — Rhetorical-device | ~45 | **~28** |
| D — Grammatical-feature | ~40 | **~28** |
| E — Character/People (+events) | ~70 | **~40** |
| F — Human-state | ~130 | **~45** |
| G — Modern-bridge | ~25 | **~12** |
| H — Surah-reference (auto) | ~80 | ~40 (mechanical) |
| Revelation-period facet | ~15 | **2** |
| NOISE (dropped) | ~60 | 0 |
| **Curated total (A–G + period)** | | **~350** |

So: 1,002 raw → ~350 curated canonical concepts across 7 curated axes, + an auto-generated surah axis. This captures the long tail the old 45-slug vocab missed (which is why it only hit 25%) while staying small enough to be navigable.

---

## 5. Hardest judgment calls — where a SCHOLAR must decide

1. **A vs B axis assignment for `divine-mercy` / `divine-justice` / `divine-power` / `divine-decree`.** These are simultaneously *themes* and *attributes*. Proposal: one canonical slug, dual-tagged via graph edges (a `:REVEALS_ATTRIBUTE` edge from the passage to ar-Rahman, plus a `:ABOUT_THEME` edge to mercy). Needs theological sign-off that this doesn't flatten the distinction between Allah's *names* and Allah's *acts*.

2. **`rabb` / rububiyyah vs uluhiyyah.** The corpus heavily uses `rabb`, `rububiyyah`, `mulk`, `sovereignty`, `lordship`, `dominion`. Classical theology distinguishes tawhid al-rububiyya from tawhid al-uluhiyya — a scholar should decide whether to encode that distinction as structure or collapse it.

3. **The C/D/A seam: `passive-voice` / `divine-passive` / `passive-voice-theology`.** Is agent-suppression a grammatical fact (D), a rhetorical device (C), or a theological theme (A)? Same for `iltifat` (device) vs the *theology* the shift produces. Recommend: feature stays in D, the *interpretive payload* becomes an edge to a theme, not a duplicate slug. Scholar to confirm.

4. **MODERN-BRIDGE warrant.** Every §G term is an assertion that the ayah maps to a modern construct (`hedonic-adaptation`, `motivated-reasoning`, `cognitive-dissonance`). Per the project's own validation policy and advisor concerns about "modern bridges exceeding warrant," a scholar (Hasan al-Qasimi / Yasmin Farid profiles) must whitelist each bridge and ideally attach a confidence/caveat. This is the highest-risk axis.

5. **`shaytan`/`iblis` and `jinn`/`thaqalan`** — theme vs character vs created-category. Proposal kept `shaytan` (theme: enmity/whisper) separate from `iblis` (character). Confirm.

6. **`taqwa` vs `khashyah` vs `fear` vs `khawf`.** Three Arabic registers + English "fear" are NOT synonyms (khashyah = knowledge-based awe; khawf = dread; taqwa = protective consciousness). The merge map deliberately did NOT fully collapse them. A scholar must confirm the boundaries — this is the subtlest lexical call in §F.

7. **`hidayah` super-cluster.** Guidance/misguidance/straight-path/rushd/dalal were merged under one polarity node. Decide whether misguidance (`dalal`, `idlal`) deserves its own canonical (Allah's *active* leading-astray is theologically loaded) rather than being the negative pole of `hidayah`.

8. **Period vs surah-name conflation.** `makkan`/`meccan`/`makki`/`madani` etc. — confirm these belong on a REVELATION-PERIOD facet, not the SURAH axis, and that variant spellings collapse.

---

## 6. Implementation note (non-binding)

Store the merge map as a flat `alias → canonical → axis` table (CSV/JSON) so re-tagging is deterministic and reversible. Tag each passage on multiple axes; model attribute/theme/character/device as separate node *labels* in the graph with typed edges (`:ABOUT`, `:REVEALS`, `:FEATURES_DEVICE`, `:USES_GRAMMAR`, `:DEPICTS_CHARACTER`, `:EVOKES_STATE`, `:BRIDGES_TO`). The axis a term lives on determines its node label; aliases never become nodes.
