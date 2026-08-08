# The Machine of Waswasa

*How the shayṭān moves a human from un-acted-upon to acted-upon — the operational
pipeline, its built-in limits, and how hidāyah collapses it at every stage.*

Research note for the **hidāyah book**. Mechanism-first, corpus-grounded. Written to be
the "counter-force" chapter: if guidance reshapes the determinate world so truth becomes
recognizable, waswasa is the apparatus that distorts the same filter so falsehood does.

**Method note.** Every occurrence-claim below was produced by a `python3` pass over
`scripts/.corpus-cache/quranic-corpus.json` (morphology) cross-checked against
`quran-verses.json` (Uthmani text); scope is marked **[root]**, **[lemma]**, or
**[exact form/phrase]** on each. Every interpretive claim is grounded in classical tafsir
pulled with `cross_reference_tafsir.mjs` (Ibn Kathīr, al-Ṭabarī, al-Muyassar,
al-Jalālayn). Where I lean on a balāgha reading vs. a modern synthesis, it is flagged.
Attributions are limited to what the tool returned — al-Zamakhsharī appears once, only
because al-Jalālayn quotes him at 113:4. The doc then survived a same-day **adversarial
pass**: every appendix number re-derived from scratch, agent-attributions re-checked
against morphology, and a directed hunt for vocabulary the first draft missed (which found
سول، زلل، ملو، أزز، the وحي-relay, the ṣadd goal-clause, ilqāʾ/naskh, and the غَرُور
epithet — all now incorporated; errors found are listed in the corrections log at the end).

---

## 0. The one-sentence finding

**The apparatus is not a force; it is a perception-edit.** The adversary's verified verb-set
sorts into four families, and **not one of them is coercive**:

- **perception-verbs** — *tazyīn* (making-appear-beautiful), *taswīl* (47:25; al-Jalālayn
  glosses *sawwala = zayyana*), *zukhruf al-qawl* (6:112, "gilded speech"; al-Jalālayn:
  *mumawwah min al-bāṭil*, falsehood varnished), *ghurūr* (delusion, false appearance);
- **suggestion-verbs** — *waswasa* (the whisper), *ilqāʾ* (22:52, casting content in),
  *yūḥī* (6:112, the shayāṭīn-relay — which al-Jalālayn glosses *yuwaswisu*: the relay runs
  on the whisper-channel);
- **affect-verbs** — *nazgh* (the jab), *azz* (19:83, agitation), *takhwīf* (3:175,
  fear-induction), the fear-promise (2:268, *yaʿidukumu l-faqr* — he promises you poverty),
  *imlāʾ* (47:25, stretching out hope);
- **attention-verbs** — *inṣāʾ* (making-forget: 58:19 *fa-ansāhum dhikra llāh*), *ṣadd*
  (blocking: 5:91, 43:62), *istifzāz* (17:64).

Perception, suggestion, affect, attention — all four operate **upstream of the will**, on
the inputs to choice, never on choice itself. The machine changes how reality *looks*,
*feels*, and *what stays in view* for the nafs, so the nafs — freely — chooses wrongly.
This is why it is the exact structural inverse of hidāyah as the book defines it: guidance
and waswasa operate on the **same organ** (the determinate world through which reality is
filtered), in opposite directions. The adversary has no lever on the world and no lever on
the will; his only access is to the *appearance* of things in the gap that opens when the
heart looks away from remembrance.

Iblīs says this himself, and the whole model is compressed into his confession:

> *"I had no authority (**sulṭān**) over you — **except that I called you, and you
> answered me**. So do not blame me; blame yourselves."* — 14:22

Al-Jalālayn glosses *sulṭān* here as *quwwa wa qudra aqharukum ʿalā mutābaʿatī* — "force
or power by which I could **compel** you to follow me"; al-Muyassar, *quwwa aqharukum bihā…
wa lā kānat maʿī ḥujja* — "no power to coerce, nor any proof." The entire transaction
reduces to **invitation + response**. Everything that follows is the anatomy of that
sentence.

---

## 1. The staged machine

Five stages. Each has its own Quranic vocabulary, its corpus receipt, its classical
grounding, and — critically — its **own built-in limit**. The limits are not add-ons; the
mechanism is leaky by design.

### The fullest single specimen: the Fall of Ādam (7:20–22)

Before the abstract model, the one place the Quran runs the whole pipeline start to finish
in three consecutive āyāt. It is the master template:

| Step | Verse | Verb | What happens |
|---|---|---|---|
| Whisper | 7:20 | *fa-waswasa* | Reframes the prohibition as *withheld good*: "your Lord only forbade this tree lest you become angels or immortals." |
| Dangle | 7:20 / 20:120 | (content is *amānī*) | The bait is *khuld* (immortality) and *mulk lā yablā* (a kingdom that never decays). |
| Swear | 7:21 | *wa-qāsamahumā* | He **takes an oath**: "I am to you a sincere adviser." False credibility. |
| Lower | 7:22 | *fa-dallāhumā bi-ghurūr* | He "brings them down **by delusion**." |
| Act → exposure | 7:22 | *fa-lammā dhāqā…* | They taste; *badat lahumā sawʾātuhumā* — what was hidden is exposed. |

Note 7:20's stated *goal* of the whisper: *li-yubdiya lahumā mā wūriya ʿanhumā* — "so that
he might **expose** to them what had been **covered** from them." The whisper's telos is
un-covering; 7:27 makes it physical — *yanziʿu ʿanhumā libāsahumā*, "he strips their
garment from them." Keep this covering/uncovering image; it returns in the defense (dhikr
re-clothes perception).

The abstract model generalizes this specimen.

---

### STAGE 1 — THE OPENING (*ghafla / ʿashā ʿan dhikr*)

**The adversary does not initiate from nothing. He needs a gap, and the gap is a specific
one: the heart turned away from remembrance.**

- **Receipt.** *dhikr*-conditioned access is stated three ways that converge:
  - **114:4–5** [exact form *al-khannās*; root **خنس** for the name]: the whisperer is
    named *al-waswās **al-khannās*** — "the whisperer, **the one who retreats**." Al-Muyassar:
    he "whispers at the moment of *ghafla* (heedlessness) and **hides when God is
    remembered** (*yakhtafī ʿinda dhikri llāh*)." Al-Jalālayn, on the name itself: *al-khannās*
    "because he **withdraws from the heart whenever God is remembered** (*kullamā dhukira
    llāh*)"; and on 114:5, he whispers "*idhā ghafalū ʿan dhikri llāh*" — when they are
    heedless of remembrance. **The limit is inside his name.** He is, by definition, the
    retreater.
  - **43:36** [lemma *qarīn*; the opening verb is *yaʿshu*, root **عشو**]: *wa man **yaʿshu
    ʿan dhikr al-raḥmān** nuqayyiḍ lahu shayṭānan fa-huwa lahu qarīn* — "whoever goes
    **dim-sighted** toward the remembrance of the Most Merciful, We assign him a shayṭān as
    a companion." Al-Ṭabarī: *ʿashā* is literally *al-naẓar bi-ghayr thabat li-ʿilla fī
    l-ʿayn* — **looking without steadiness because of a defect in the eye.** The opening is
    a *perceptual dimming*.
  - **58:19** [root **حوذ**, *istaḥwadha*]: *istaḥwadha ʿalayhim al-shayṭānu fa-ansāhum
    dhikra llāh* — "the shayṭān gained mastery over them and **made them forget God's
    remembrance**." The endpoint of the whole process is, again, the loss of *dhikr*.

- **The foothold compounds: prior deeds widen the opening.** **3:155** [root **زلل**,
  *istazalla*, form X]: the Uḥud deserters — *innamā **istazallahumu** l-shayṭānu **bi-baʿḍi
  mā kasabū*** — "the shayṭān made them slip **because of some of what they had earned**."
  Al-Jalālayn is explicit on both halves: *istazallahum = azallahum al-shayṭānu
  **bi-waswasatihi*** ("by his whispering") and *bi-baʿḍi mā kasabū = min al-dhunūb* ("by
  reason of sins," namely disobeying the Prophet's command); al-Muyassar likewise:
  "he cast them into this sin **by some of the sins they had [already] done**." So the slip
  is executed *through waswasa*, and the whisper's **traction is proportional to prior
  sin** — each un-repented act widens the aperture for the next whisper. The mechanism is a
  feedback loop, which is exactly the book's nafs-loop (state → thoughts entertained →
  actions → state) with a hostile agent riding it. (Sister verse: 2:36, *fa-azallahumā
  l-shayṭānu ʿanhā* — the Fall itself narrated with the same slip-verb, form IV.)

- **The adversary's stated objective confirms the aperture is dhikr.** **5:91** [roots
  **صدد** + **شطن** co-occur]: *innamā yurīdu l-shayṭānu an yūqiʿa baynakumu l-ʿadāwata
  wa-l-baghḍāʾa fī l-khamri wa-l-maysiri **wa-yaṣuddakum ʿan dhikri llāhi wa-ʿani
  l-ṣalāh*** — the Quran's only explicit statement of the operational **goal**: block
  remembrance and prayer. The tafsir supplies the *means*: al-Muyassar — the ṣadd works
  *bi-ghiyābi l-ʿaql* (through absence of mind, wine) and *al-ishtighāl bi-l-lahw*
  (preoccupation with play, gambling); al-Jalālayn — *bi-l-ishtighāli bihimā* ("by
  preoccupation with the two"), noting ṣalāh is singled out *taʿẓīman lahā*; al-Ṭabarī —
  the entry-move is that he *yuḥassinu* (beautifies) the drinking and gaming. So the chain
  runs: tazyīn → consumption → **attention-capture** → dhikr blocked → aperture held open.
  The adversary's declared war-aim is the master variable of §2 — he is not primarily after
  the sin; he is after the *state the sin produces*, the dhikr-blackout in which he can
  work.

- **The limit, built in.** The opening is not something the adversary *makes*; it is a
  state the human is already in (*ghafla*). Where remembrance is live, there is no aperture
  — the khannās has, by nature, already retreated.

- **Book bridge.** This is the determinate-world thesis in its negative form. *ʿashā ʿan
  dhikr* is a **filter set wrong** — sight dimmed toward the one referent that would
  reorganize everything. The adversary doesn't install the dimming; he *operates in* it.

---

### STAGE 2 — THE WHISPER (*waswasa*) — the delivery method

**Receipt** [root **وسس**]: 5 tokens / 5 verses — **7:20, 20:120, 50:16, 114:4, 114:5**
(verified; matches the census exactly). This is the entire footprint of the root. Two facts
about the distribution do the work:

**(a) The whisper has two sources sharing one medium.** Of the five, four are the external
whisperer (Ādam ×2; the khannās ×2). But **50:16** attributes *waswasa* to the **nafs
itself**: *naʿlamu mā **tuwaswisu bihi nafsuhu*** — "We know what **his own nafs whispers**
to him." This is grammatically unambiguous in the corpus — *tuwaswisu* is 3rd-fem-sing and
*nafsuhu* is nominative (the subject). Al-Muyassar glosses it *tuḥaddith bihi nafsuhu*
("what his nafs *tells* him"); al-Jalālayn, *tuwaswis = tuḥaddith*, pronoun refers to the
human. **So the same verb names both the external prompt and the internal self-talk.** This
is the mechanism's most important lexical fact: the handoff from adversary to self (Stage 4)
is seamless *because they speak in the same medium.* The human cannot easily tell an
injected suggestion from his own thought — they arrive on the same channel.

**(b) The dual-attribution is a *pattern*, not a one-off — *taswīl* does exactly the same
thing.** [root **سول**: 4 tok / 4 verses — 12:18, 12:83, 20:96, 47:25; verified]. In
**47:25** the agent is **al-shayṭān** (*al-shayṭānu sawwala lahum* — al-Jalālayn: *sawwala =
zayyana*). In **all three others** the grammatical agent is the **nafs**: 12:18 & 12:83
(Yaʿqūb: *bal **sawwalat lakum anfusukum** amrā* — "your *selves* made it seem fair") and
20:96 (al-Sāmirī: *sawwalat lī **nafsī*** — "my *nafs* made it seem fair to me"). So the
corpus now shows **two distinct mechanism-verbs, each attributed to both the adversary and
the nafs**: *waswasa* (shayṭān 7:20/20:120/114:5 ↔ nafs 50:16) and *taswīl* (shayṭān 47:25
↔ nafs 12:18/12:83/20:96). Two verbs, one shared channel. This cannot be accidental usage;
the Quran systematically refuses to let you cleanly separate "his voice" from "your voice"
at the moment of temptation — which is precisely why the Stage-4 handoff is seamless.

**(c) The whisperer can be jinn or human.** 114:6 — *min al-jinnati wa-l-nās*. Al-Jalālayn:
this is *bayān* (a clarification) that the whisperer "is jinnī and insī"; a human whispers
"in a manner fitting him [openly], and then his whisper **reaches the heart and settles in
it** by the same route." The category includes the human tempter, the propagandist, bad
company — same destination (the *ṣadr*/*qalb*), different delivery.

**(d) The whisper propagates through a relay network.** **6:112**: *shayāṭīna l-insi
wa-l-jinni **yūḥī baʿḍuhum ilā baʿḍin** zukhrufa l-qawli ghurūrā* — "the shayāṭīn of
humankind and jinn **inspire one another** with gilded speech as delusion." Al-Jalālayn
glosses the inspiration-verb directly: ***yūḥī = yuwaswisu*** — the relay between tempters
runs on the *same whisper-channel* as the attack on the individual. And **6:121** extends
the relay one hop further: *inna l-shayāṭīna **la-yūḥūna ilā awliyāʾihim
li-yujādilūkum*** — "they inspire their allies **so that they argue with you**" (al-Ṭabarī
on 6:112: the purpose is *li-yaṣuddūhum bi-mujādalatihim* — to block through
argumentation). So waswasa is not only dyadic (whisperer → victim); it is a **distributed
system**: shayṭān → human ally → you, with the human relay arriving as ordinary
conversation and debate. 6:121 closes with the stakes: *wa-in aṭaʿtumūhum innakum
la-mushrikūn* — obeying the relay is the same *ṭāʿa* that 16:100 says constitutes his
*sulṭān*.

- **The limit, built in.** A whisper is the weakest possible causal act — it is *suggestion*,
  carrying no compulsion. 7:20/20:120 show its content is always a *reframe* ("God only
  forbade this because…"), never a command that binds.

- **Book bridge.** Waswasa is *khawāṭir* with a hostile author. The book already treats
  incoming thoughts as raw material the nafs sorts; here the point is that **some incoming
  thoughts are authored to be mis-sorted**, and the authorship is deliberately disguised as
  self-generated.

---

### STAGE 3 — THE ESCALATION — from suggestion to pressure

If the whisper is entertained rather than dismissed, the mechanism has several intensifiers.
These are not a fixed sequence; they are the adversary's toolkit for turning a suggestion
into a felt pull.

- **tazyīn — making the wrong appear beautiful.** [root **زين**; broad root = 46 tok / 43
  verses, mostly unrelated aesthetic senses]. The **shayṭān-agent subset** (verified by
  co-occurrence of root **شطن** with an active *zayyana*): **6:43, 8:48, 16:63, 27:24,
  29:38**, plus Iblīs's first-person vow **15:39** (*la-uzayyinanna lahum fī l-arḍ*). In
  every one the object is *aʿmālahum* — "he beautified **their deeds** to them." Note also a
  large set of **passive** *zuyyina* forms (2:212, 3:14, 6:122, 9:37, 10:12, 13:33, 35:8,
  40:37, 47:14, 48:12) where the beautifier is **left unnamed** — a deliberate balāgha
  veiling: the agent of the distortion is hidden, which is itself part of how the distortion
  works. *(Classical balāgha reading, flagged as such.)*

- **amānī — the false-hope payload, installed in the nafs.** [The shayṭān-specific sense is
  narrow. Root **مني** is broad: 22 tok / 19 verses, most unrelated.] The relevant locus is
  the Iblīs passage **4:119–120** [lemma *yumannī*]. **4:119** is his first-person vow —
  *wa-la-umanniyannahum* — and **4:120** is the report — *yaʿiduhum **wa-yumannīhim**… wa-mā
  yaʿiduhumu l-shayṭānu illā ghurūrā*. *(Correction to the working census, which flagged
  only 4:120: 4:119 is the same lemma and the same agent, and should be cited alongside it.)*
  The key mechanism detail is al-Ṭabarī's gloss on 4:119: he misleads them **"bi-mā ajʿalu
  fī nufūsihim min al-amānī"** — "by the false hopes **I place into their selves.**" This is
  the hinge: an external *promise* (*waʿd*) converts into an internal *amānī* now resident in
  the nafs. The nafs then runs on borrowed fuel. And the verdict is stated in the same breath
  the promise is made — *illā ghurūrā*, "nothing but delusion." Al-Jalālayn spells the payload:
  *ṭūl al-ʿumr* (long life) and *an lā baʿth wa lā jazāʾ* (no resurrection, no reckoning).

- **the qarīn — the assigned amplifier.** [lemma *qarīn*, NOT root **قرن** (34 tok / 34
  verses, mostly "generation/century")]. The shayṭān-*qarīn* set is **4:38, 41:25, 43:36,
  43:38, 50:27** (and 37:51 disputed — see §4). Two mechanism facts:
  1. **The qarīn is a consequence, not an initiator.** 43:36: turning dim toward *dhikr*
     → *nuqayyiḍ* ("We assign/appoint," al-Jalālayn *nusabbib*) a shayṭān companion. The
     verb *qayyaḍa* makes the qarīn a **judicial consequence** of the human's own turning,
     not a first mover.
  2. **The qarīn's function is tazyīn.** 41:25 welds the two: *qayyaḍnā lahum quranāʾa
     **fa-zayyanū** lahum mā bayna aydīhim wa-mā khalfahum* — "We assigned them companions
     **who beautified** for them what lay before and behind." So the amplifier's method is
     not force but the same perception-edit. Al-Muyassar on 43:36 gives its behavioral
     output: *yamnaʿuhu l-ḥalāl wa yabʿathuhu ʿalā l-ḥarām* — bars the lawful, drives the
     forbidden.

- **nazgh — the jab / the goad.** [root **نزغ**: 6 tok / 4 verses — **7:200, 12:100, 17:53,
  41:36**]. Two registers, both verified by grammatical agent:
  - *Against the individual*: 7:200 & 41:36 — *wa-immā yanzaghannaka mina l-shayṭāni nazgh*,
    "if a *nazgh* from the shayṭān provokes you." Al-Muyassar glosses the *nazgh* bundle as
    *ghaḍab* (anger) or *waswasa wa tathbīṭ ʿan al-khayr aw ḥathth ʿalā al-sharr* — a
    whisper, a discouragement from good, or an incitement to evil. This is the escalation
    felt as an *emotional spike*.
  - *Between persons*: 17:53 (*yanzaghu baynahum*) and 12:100 (*nazagha l-shayṭānu baynī wa
    bayna ikhwatī*). In 12:100 the corpus confirms the grammatical agent is **al-shayṭān**
    (nominative subject of *nazagha*); al-Jalālayn and al-Muyassar both gloss *nazagha* here
    as *afsada* — "corrupted [the bond]." *(This resolves the census flag on 12:100: the
    agent is Shaytan, not the brothers — see the fresh-insight on Yusuf in §3.)*

- **imlāʾ — stretching out hope (the time-dimension of amānī).** **47:25**: *al-shayṭānu
  sawwala lahum **wa-amlā lahum*** [root **ملو**, form IV]. Al-Muyassar: *madda lahum fī
  l-amal* — "he **extended hope** for them"; Ibn Kathīr's rendering: "enticed them and
  filled them with false hopes." Where *amānī* supplies the false image, *imlāʾ* supplies
  the false **timeline** — "there is still time." (Al-Jalālayn notes a qirāʾa variance on
  *umliya*, active vs passive — the deluder named or veiled, same pattern as the passive
  *zuyyina* set.)

- **the promise has a fear-arm, not only a hope-arm.** **2:268**: *al-shayṭānu **yaʿidukumu
  l-faqra** wa-yaʾmurukum bi-l-faḥshāʾ, wa-llāhu yaʿidukum maghfiratan minhu wa-faḍlā* —
  "the shayṭān **promises you poverty** and commands indecency; Allah promises you
  forgiveness from Himself and bounty." The same *waʿd*-instrument runs on dread: a false
  image of a *bad* future (destitution if you give) doing the same work as the false image
  of a good one. The verse stages the two promise-economies against each other in a single
  breath — his scarcity-image versus God's *maghfira + faḍl*.

- **azz — agitation, the throttle held open.** **19:83** [root **أزز**: 2 tok / 1 verse]:
  *arsalnā l-shayāṭīna ʿalā l-kāfirīna **ta'uzzuhum azzan*** — "We sent the shayāṭīn upon
  the disbelievers, **stirring them with agitation**" — cognate accusative, intensified.
  A pure affect-verb: not a new idea, just *heat* applied to whatever is already burning.

- **inṣāʾ — induced forgetting (the attack on the master variable itself).** Verses where
  roots **نسي** and **شطن** co-occur (verified): **6:68, 12:42, 18:63, 58:19**. The two
  endpoint-cases name *dhikr* as the target: 58:19 (*fa-ansāhum **dhikra llāh***) and 12:42
  (*fa-ansāhu l-shayṭānu **dhikra rabbihi*** — though the referent of the forgetting is a
  classical dispute, see §4). 18:63 (the forgotten fish, *wa-mā ansānīhu illā l-shayṭān*)
  and 6:68 (forgetting *not to sit* with mockers) show the same verb on mundane targets.
  Forgetting is the escalation-move aimed at Stage 1 itself: if the whisper can't survive
  remembrance, then *remove remembrance*.

- **the wider toolkit (17:64).** Iblīs is licensed to deploy *ṣawt* (voice), *khayl
  wa-rajil* (cavalry and infantry — a mobilization image), *mushāraka fī l-amwāl wa-l-awlād*
  (partnership in wealth and children), and *waʿd* (promise). Plus **takhwīf** — fear-
  induction: 3:175, *innamā dhālikum al-shayṭānu **yukhawwifu** awliyāʾahu fa-lā takhāfūhum
  wa-khāfūni* — "that is only the shayṭān, **frightening** his allies; do not fear them,
  fear Me." Al-Ṭabarī: he "frightens the believer with the disbeliever." Fear is an
  escalation instrument, and its counter is *re-aiming* fear at God.

- **the epithet seals the family: al-Gharūr, the Deluder.** [lemma **غَرُور**: exactly 3
  tok / 3 verses — 31:33, 35:5, 57:14; root غرر is broader, 27/21]. All three occurrences
  carry the same construction: *lā yaghurrannakum / gharrakum **bi-llāhi** l-gharūr* — the
  Deluder deludes you **about Allah**. The deepest perception-edit is not about the act;
  it is about *God* — His mercy presumed upon, His reckoning discounted. And **57:14**
  stacks the whole Stage-3 inventory in one verse: *gharratkumu **l-amāniyy**… wa-gharrakum
  bi-llāhi **l-gharūr*** — the installed false-hopes deluded you, *and* the Installer
  deluded you about God. Note the epithet pattern across the corpus: *al-Waswās
  al-Khannās* (114:4), *al-Gharūr* — the Quran names the adversary **by his methods**, as
  if the agent simply *is* his mechanism.

- **The limit, built in.** Every intensifier is still working on *appearances* and
  *affect* — beautifying, hoping, goading, frightening. None reaches the will. 16:99–100
  fixes the ceiling precisely (next stage).

---

### STAGE 4 — THE NAFS-HANDOFF — where the outside becomes the inside

**This is the load-bearing stage and the one the existing site material circles but never
isolates as a mechanism.** The whisper does not act. The nafs acts. The adversary's entire
craft is to get his content *adopted* by the nafs as the nafs's own, at which point he is no
longer needed — the self carries it the rest of the way.

- **The medium makes the handoff invisible.** Because *waswasa* names both the external
  prompt (114:5) and the nafs's self-talk (50:16), the injected content and the self-
  generated content are *phenomenologically identical* — same channel, same voice. The
  suggestion is laundered into "my own idea."
- **The payload is installed, not merely delivered.** 4:119 (al-Ṭabarī): the amānī are put
  *fī nufūsihim* — into their selves. Once resident, they are indistinguishable from the
  nafs's own desires and become part of what the book calls the determinate world (the
  value/goal hierarchy that filters all perception).
- **The authority ceiling is here, and it is exact.** 16:99–100:
  - *laysa lahu sulṭānun ʿalā lladhīna āmanū wa-ʿalā rabbihim yatawakkalūn* — "he has no
    *sulṭān* over those who believe and trust their Lord." Al-Muyassar: *sulṭān = tasalluṭ*
    (domination).
  - *innamā sulṭānuhu ʿalā lladhīna **yatawallawnahu*** — "his domination is only over those
    who **take him as ally**." Al-Jalālayn: *yatawallawnahu = bi-ṭāʿatihi*, "by obeying
    him."
  - 15:42 makes the same carve-out and specifies the *organ*: al-Muyassar — "My sincere
    servants, I will not give you *sulṭān* **over their hearts** (*ʿalā qulūbihim*)…
    *illā* — but — over whoever follows you (*ittabaʿaka*)."

  So the handoff *only completes* when the human supplies *tawallī* (alliance) + *ṭāʿa*
  (obedience) + *ittibāʿ* (following). The adversary cannot cross from Stage 3 to Stage 5 on
  his own power; **the human closes the circuit.**

- **The limit, built in.** The authority is granted *by the victim* and is revocable by the
  victim. 14:22 is the retrospective proof: no *quwwa*, only *daʿwa* answered.

- **Book bridge.** The handoff *is* the corruption of the determinate world. External
  suggestion → resident amānī → altered value-hierarchy → the nafs now "sees" the wrong act
  as good/easy/urgent and chooses it *as itself*. The adversary has authored a preference and
  signed the human's name to it.

---

### STAGE 5 — THE ACT — and its exposure

The suggestion, now owned, issues in deed. 20:121: *fa-akalā… wa-ʿaṣā ādamu rabbahu
fa-ghawā*. And the mechanism's promise is revealed as empty at the moment of delivery:
*fa-badat lahumā sawʾātuhumā* — the "immortality and kingship" resolve into exposure. The
*ghurūr* (false appearance) collapses into what was actually there.

- **The deepest failure mode: not knowing you were moved.** 43:37 — *wa-innahum
  la-yaṣuddūnahum ʿani l-sabīl **wa-yaḥsabūna annahum muhtadūn*** — "they bar them from the
  path **while reckoning themselves rightly guided.**" The completed state is not felt as
  defeat; it is felt as being right. (Cf. 7:30.)

- **The limit, built in — the disavowal.** At the end, the author quits. 14:22 (*fa-lā
  talūmūnī*) and, in the *qarīn's* own mouth, 50:27: *qāla qarīnuhu rabbanā mā aṭghaytuhu* —
  "his companion says: our Lord, I did not make him transgress." Al-Muyassar and al-Jalālayn
  both identify this *qarīn* as *shayṭānuhu* (his devil); al-Jalālayn stages the exchange —
  the devil: "I called, he answered"; the man: "he made me transgress by his calling."
  **The mechanism has no ownership of the outcome; it externalizes the act back onto the
  human the instant consequences arrive.**

---

## 2. The counter-machine: how hidāyah collapses each stage

The defenses are not a separate topic bolted on. **They are the same variables read in
reverse.** The master variable is *dhikr*, and it appears at both ends of the machine — as
the thing whose *absence* opens Stage 1 and whose *presence* closes every stage.

| Stage | The adversary's move | The interrupt | Corpus + tafsir |
|---|---|---|---|
| **1. Opening** | operates in *ghafla / ʿashā ʿan dhikr*; foothold widened by prior sin (3:155); declared war-aim = blocking dhikr (5:91) | **dhikr** — remembrance keeps the aperture shut; **tawba** shrinks the foothold | 114:4 the khannās *retreats* at remembrance (al-Jalālayn); 43:36 the opening *is* dim-sight toward dhikr; 58:19 mastery = making one forget dhikr; 3:155 ends *wa-laqad ʿafā llāhu ʿanhum* |
| **2. Whisper** | subliminal suggestion on the self-talk channel (incl. the human relay, 6:112/6:121) | **istiʿādha** — naming it externalizes it | 7:200, 16:98, 41:36: *fa-staʿidh bi-llāh*; al-Jalālayn 7:200: God "repels it from you" |
| **3. Escalation** | tazyīn, amānī + imlāʾ, nazgh, azz, takhwīf + fear-promise (2:268), inṣāʾ | **ʿilm + re-aimed fear** — see the playbook; fear God not the ally | 3:175 *fa-lā takhāfūhum wa-khāfūni*; 2:268 God's counter-promise *maghfira wa-faḍl*; 35:6 "take him as an enemy" (know the adversary *as* adversary) |
| **4. Handoff** | wants *tawallī + ṭāʿa* | **īmān + tawakkul** — the two states that void *sulṭān* | 16:99 no domination over believers who trust; 15:42 no power over the hearts of the sincere |
| **5. Act** | wants the deed, then disowns it | **tawba** — the fork Ādam took and Iblīs refused | 7:23 vs. 7:12–13; 2:275 *fa-man jāʾahu mawʿiẓatun… fa-ntahā* |

### The single most important symmetry (the book's payoff)

**The opening and the interrupt are the same event running in opposite directions on one
axis: sight.**

- **Opening (43:36):** *yaʿshu ʿan dhikr* — sight goes **dim** toward remembrance; the
  apparatus switches on.
- **Interrupt (7:201):** *idhā massahum ṭāʾifun mina l-shayṭāni **tadhakkarū fa-idhā hum
  mubṣirūn*** — "when a *ṭāʾif* (a passing touch) from the shayṭān touches them, **they
  remember, and at once they see.**" Al-Jalālayn: *ṭayf* is "something that *lightly
  visited* them"; *tadhakkarū* — they recall God's reckoning and reward; *mubṣirūn* — "they
  **see** the truth from other-than-it, and return." Al-Muyassar: they end up *ʿalā baṣīra…
  ʿāṣūn lil-shayṭān* — on clear sight, disobeying the devil.

The two verbs are mirror images: *ʿashā* (dim sight) opens the machine; *tadhakkara →
abṣara* (remember → see) closes it. **Remembrance restores sight, and restored sight is the
end of the whisper.** Note the timing in 7:201: the touch is only a *ṭāʾif* — a light
visitation, Stage 2, *before* escalation — and *tadhakkur* dissolves it *fa-idhā* (at once).
The taqwā-person doesn't out-fight the adversary; he **re-illuminates the field** and the
adversary, being *al-khannās*, is already gone.

This is precisely the book's thesis inverted and then re-inverted:
- Guidance = reshaping the determinate world so truth becomes recognizable (sight
  organized around God).
- Waswasa = distorting the same filter so falsehood looks like good (sight dimmed away
  from God).
- The pivot between them is a single act — *dhikr* — which is why the same word governs
  both the vulnerability and the cure.

### The perception-asymmetry, and why the cure is sight not strength

7:27: *innahu **yarākum huwa wa-qabīluhu min ḥaythu lā tarawnahum*** — "he and his tribe
**see you from where you do not see them.**" The adversary's only structural advantage is
*invisibility* — he operates outside your perceptual field. This is why the counter is
never "fight harder"; it is *ibṣār* — being made to **see** (7:201). Istiʿādha and dhikr do
not out-muscle him; they turn the lights on, at which point his advantage (operating unseen)
is gone and his nature (retreat) takes over. *(This reframes "baseerah" from a virtue into
the specific countermeasure to a specific asymmetry — a synthesis the existing
`psychology-of-shaytan` piece gestures at with "Baseerah" but does not tie to 7:27's
asymmetry.)*

### The interrupt above the interrupts: divine naskh (22:52–54)

The defenses above are all human-side. **22:52 adds a limit that operates with no human
action at all**: even when the adversary successfully *casts* (*alqā l-shayṭānu fī
umniyyatihi*) — and the target here is a prophet in the act of reciting — ***fa-yansakhu
llāhu mā yulqī l-shayṭānu thumma yuḥkimu llāhu āyātih*** — "God **erases** what the shayṭān
casts, then God **consolidates** His verses." Al-Muyassar: God *yubṭilu kayda l-shayṭān,
fa-yuzīlu wasāwisahu* — voids the scheme, removes the whispers. At the level of revelation
itself, injected content has no permanence: the system's owner deletes it. (The famous
occasioning-story al-Ṭabarī and al-Jalālayn attach here is contested — see §4 — but the
mechanism-structure of the verse stands independent of it.)

Then 22:53–54 does something extraordinary for the book: it states the **dual outcome** of
one and the same injection. The *very same* cast content is made *fitna* "for those in whose
hearts is disease and whose hearts are hardened" (22:53; al-Jalālayn: *miḥna*) — **and** a
cause of *increased faith* for the people of knowledge: 22:54, *wa-li-yaʿlama lladhīna ūtū
l-ʿilma annahu l-ḥaqqu min rabbika **fa-yuʾminū bihi fa-tukhbita lahu qulūbuhum*** — "that
those given knowledge may know it is the truth from your Lord, **so they believe and their
hearts humble to it**." Al-Muyassar: for them "the shayṭān has no path into it, **so their
īmān increases**." One event, two opposite trajectories, keyed entirely to the state of the
receiving heart — the determinate-world thesis in the Quran's own syntax. And the passage
closes by *naming the counter-force*: *wa-inna llāha **la-hādi** lladhīna āmanū ilā ṣirāṭin
mustaqīm* — "God is surely the **Guide** of those who believe to a straight path." The
waswasa-passage ends on hidāyah as the last word.

---

## 3. Genuinely fresh mechanism-insights (with overlap status)

Checked against `published-articles.md` and the five most-adjacent pieces
(`psychology-of-shaytan`, `weapons-against-waswasa`, `iblis-and-the-nafs`,
`footsteps-of-shaytan`, `shaytans-promise`). The site treats each node *singly*; the book
needs the *machine*. These are what the machine-view surfaces that the node-view does not.

1. **The dhikr-oscillator unifies opening AND defense on one axis.**
   *ʿashā ʿan dhikr* (43:36, opening) and *tadhakkarū fa-mubṣirūn* (7:201, interrupt) are
   the same sight-variable in opposite directions, with *al-khannās* (114:4) as physical
   proof the whole apparatus is dhikr-keyed. **Overlap: LOW.** `weapons-against-waswasa`
   lists dhikr as "the primary weapon" and has a "khannās" beat, but treats dhikr as one
   tool among five; it never identifies dhikr as the *single master variable* that both
   opens and closes the machine, and never pairs 43:36 with 7:201 as inverses. **This is the
   book's central bridge — highest priority.**

2. **The shared channel is a two-verb PATTERN: waswasa AND taswīl are each dual-attributed.**
   *waswasa*: shayṭān (7:20, 20:120, 114:5) ↔ nafs (50:16). *taswīl* [root سول, 4/4]:
   shayṭān (47:25) ↔ nafs (12:18, 12:83, 20:96 — all three grammatically *anfus/nafs* as
   subject). Two independent mechanism-verbs, each running on both sources ⇒ the Quran
   *systematically* refuses a clean phenomenological line between "his voice" and "your
   voice" — which is why the Stage-4 handoff is seamless and why the defense (istiʿādha)
   works by *externalizing* the thought rather than by introspecting its origin. **Overlap:
   LOW/PARTIAL.** `iblis-and-the-nafs` has "The Nafs Speaks First" and the partnership
   model, but frames it as an *alliance of two agents*; the lexical two-verb pattern is not
   made anywhere on the site. Mechanism-precision the book wants.

3. **The promise is installed *in the nafs* as amānī (4:119, al-Ṭabarī).**
   External *waʿd* → resident *amānī* (*fī nufūsihim*) → the nafs runs on borrowed fuel →
   it becomes part of the determinate world. **Overlap: LOW.** `shaytans-promise` covers the
   *eschatological* confession (14:22) but not the *installation* mechanism of 4:119–120.
   Direct line to the book's determinate-world model.

4. **The qarīn is a consequence, not a cause; its method is tazyīn (43:36 + 41:25).**
   *qayyaḍa* makes the companion a judicial result of the human's own turning-from-dhikr,
   and 41:25 shows its function *is* beautification. Reframes the qarīn from "a devil that
   attacks" to "the amplifier your own turning summons." **Overlap: NONE found** on the
   causal-direction point or the qarīn↔tazyīn weld.

5. **The whole apparatus is a perception-edit, not a force (the §0 finding).**
   Every verb optical/aesthetic; 14:22 explicitly no *quwwa*. The adversary and hidāyah act
   on the same organ in opposite directions. **Overlap: PARTIAL.** `psychology-of-shaytan`
   has "Position, Direction, Target" (the 7:16–17 geometry) and gradualism; it does not
   generalize to *the entire toolkit is non-coercive appearance-management*, which is the
   claim that makes waswasa the exact mirror of the book's guidance.

6. **The purpose-clause: the machine exists so belief becomes visible (34:21).**
   All four mufassirūn converge on manifestation/distinguishing, in their own words:
   al-Jalālayn — *li-naʿlam* is *ʿilm ẓuhūr* ("knowledge-as-manifestation"); al-Muyassar —
   no *qahr* (coercion), but *li-yaẓhara mā ʿalimahu subḥānahu fī l-azal; li-numayyiza*
   ("so that what He knew in eternity becomes manifest; so We distinguish" believer from
   doubter); al-Ṭabarī — *li-yuʿlama ḥizbunā wa-awliyāʾunā* ("so that Our party and allies
   be known"); Ibn Kathīr's rendering — "that We might **test** him who believes." The
   limited *sulṭān* is permitted *so that* the difference between belief and doubt becomes
   visible. The whisper is not a flaw in creation; it is the instrument of moral
   visibility — a theodicy-of-the-whisper. **Overlap: NONE.** `shaytans-promise` covers
   "denial of sultan" but not the *purpose* of the gap. **This is the frame the whole book
   chapter should open or close on.**

7. **Yusuf models the counter to *nazgh-between-persons* (12:100).**
   At his moment of triumph he relocates the enmity from his brothers to *Shaytan-between*
   (*nazagha… baynī wa-bayna ikhwatī*, agent = Shaytan) and even says "out of the *prison*"
   not "out of the *well*" (al-Jalālayn: *takarruman li-allā takhjal ikhwatuhu* — to spare
   his brothers shame). The de-escalation move: refuse to locate evil in the person; name the
   third agent. **Overlap: NONE** in the shaytan set (yusuf pieces exist but on other beats).

8. **The name is the limit: *al-khannās* means "the retreater."**
   The single most economical statement of the whole model's boundary is the adversary's
   epithet — he is *definitionally* the one who withdraws at remembrance. **Overlap: PARTIAL**
   (the name is mentioned in `weapons`), but not developed as *the limit encoded in the
   name*. Extendable: the epithet-set *al-Waswās al-Khannās* (114:4) + *al-Gharūr*
   (31:33, 35:5, 57:14 — lemma exactly 3×) means the Quran names the adversary **by his
   methods** — the agent is presented as identical with his mechanism.

9. **One injection, two outcomes — 22:52–54 is the determinate-world thesis in Quranic
   syntax.** The same *ilqāʾ* is made *fitna* for hearts with disease/hardness (22:53) and
   an *increase of īmān* for the people of knowledge (22:54, al-Muyassar: "no path for the
   shayṭān into it, so their faith increases") — one event, opposite trajectories, keyed to
   the receiving heart's state. Plus a limit no human defense supplies: **divine naskh** —
   God erases the cast content (*fa-yansakhu llāhu mā yulqī l-shayṭān*). And the passage
   ends by naming hidāyah as the closing operator (22:54: *wa-inna llāha la-hādi lladhīna
   āmanū*). Companion purpose-clause to 34:21 — the two belong in the same book chapter.
   **Overlap: NONE found** in the shaytan set (site's tadabbur files not exhaustively
   checked for 22:52 — verify before an article; the gharānīq contestation in §4 must ride
   along with any use).

10. **The no-sulṭān claim is triple-attested — by God, by Iblīs, and by the damned
    misleaders.** God's decree: 15:42, 16:99, 17:65, 34:21. Iblīs's post-hoc confession:
    14:22. And the misleaders themselves in the mutual-recrimination scene: **37:30** — *wa-mā
    kāna lanā ʿalaykum min sulṭānin **bal kuntum qawman ṭāghīn*** — "we had no authority over
    you; rather you were yourselves a transgressing people." Al-Jalālayn's gloss there is
    nearly verbatim his 14:22 gloss: *quwwa wa-qudra **taqharukum** ʿalā mutābaʿatinā* — no
    coercive power. Every party in the drama — the Judge, the tempter, the accomplices —
    testifies to the same mechanical limit. No other single claim about the mechanism has
    this attestation-structure. Bonus detail: 37:28's accusation *taʾtūnanā ʿani l-yamīn* —
    al-Ṭabarī: "you came at us **from the direction of religion and truth**, deceiving us by
    the strongest means" — the approach-vector is *disguise as the good*. **Overlap: LOW.**
    `shaytans-promise` treats 14:22 alone; the triangulation and 37:28's approach-vector are
    new.

11. **The adversary's stated war-aim is dhikr itself (5:91).** The Quran's only explicit
    goal-clause for shaytanic operations: *yaṣuddakum ʿan dhikri llāhi wa-ʿani l-ṣalāh* —
    and the tafsir specifies the means as **attention-capture** (al-Muyassar: absence of
    mind, preoccupation with play). He is not primarily after the sin but after the
    *dhikr-blackout* the sin produces — the sin is instrumental; the state is the target.
    Direct, corpus-level confirmation that the master variable of the whole machine is
    remembrance. **Overlap: LOW** (`weapons` treats dhikr as defense; nowhere is 5:91 read
    as the adversary's own mission-statement).

---

## 4. Open questions / where the tradition disagrees (ikhtilāf honored)

Three the brief flagged, resolved to the extent the tool allows, plus what remains genuinely
open.

- **12:100 — who is the agent of *nazgh*?** **Resolved.** Corpus: the nominative subject of
  *nazagha* is *al-shayṭān*. Tafsir: al-Jalālayn/al-Muyassar gloss *nazagha = afsada*
  ("corrupted the bond"); Ibn Kathīr "sowed enmity between me and my brothers." The brothers
  are *not* named as agents; Yusuf attributes the discord to Shaytan-between. Use with
  confidence.

- **37:51 — is the *qarīn* a devil or a human?** **Genuinely disputed — do not use as a firm
  shayṭān-qarīn proof.** Al-Ṭabarī explicitly records the *ikhtilāf*: "*ikhtalafa ahlu
  l-taʾwīl* in the *qarīn* mentioned here — some said it was a *shayṭān*…"; al-Muyassar reads
  it as a human *ṣāḥib mulāzim* (a close earthly companion); al-Jalālayn, *ṣāḥib yunkiru
  l-baʿth* (a companion who denied resurrection) — ambiguous. Context (Paradise-dwellers
  recalling a mocking friend, then seeing him in the Fire) leans **human**. **Exclude from
  the firm set; cite only with the disagreement noted.** The firm shayṭān-*qarīn* verses are
  4:38, 41:25, 43:36, 43:38, **50:27** (50:27 confirmed a devil by al-Muyassar/al-Jalālayn).

- **2:275 — is the *khabṭ/mass* literal possession or metaphor?** **Handle carefully; it is
  a simile, and the classical vehicle is taken literally.** Grammar: *lā yaqūmūna illā
  **kamā** yaqūmu…* — *kamā* is a simile particle; the verse's *purpose* is describing how
  ribā-eaters rise on Judgment Day, **not** teaching a possession-mechanism. But the *vehicle*
  of the simile (*yatakhabbaṭuhu l-shayṭānu min al-mass*) is read by the mufassirūn as a real
  phenomenon: al-Jalālayn *yatakhabbaṭuhu = yaṣraʿuhu* ("throws him into a fit"), *al-mass =
  al-junūn* (madness); al-Muyassar and Ibn Kathīr likewise gloss *mass* as *junūn*.
  al-Jalālayn separately notes the *"trading is like ribā"* clause is *ʿaks al-tashbīh*
  (inverted simile) for emphasis. **Implication for the model: do NOT build a "possession"
  stage on 2:275.** It is the one *khabṭ* token in the Quran [root **خبط**: 1/1], it sits
  *outside* the waswasa pipeline, and it functions as an *image*, not a stage. The
  possession-question is real in the wider tradition but this verse does not settle it and
  the mechanism doesn't need it.

- **22:52 — the occasioning-story (gharānīq) is contested; the mechanism-structure is not.**
  Al-Ṭabarī and al-Jalālayn transmit the famous story of a shaytanic interpolation during
  the recitation of Sūrat al-Najm; its authenticity is widely rejected in later scholarship
  (isnād criticism), and Ibn Kathīr's fuller treatment elsewhere is skeptical of it. **The
  book should use 22:52–54 for its explicit structure only** — *ilqāʾ → naskh → iḥkām →
  dual outcome* — which is stated by the verse itself and needs no story. Do not hang any
  claim on the gharānīq narrative.

- **12:42 — who forgot?** *fa-ansāhu l-shayṭānu dhikra rabbihi* — either the **cupbearer**
  forgot to mention Yūsuf to his master (*rabbihi* = his human lord), or **Yūsuf** was made
  to forget his Lord by pinning hope on the cupbearer. A classical ikhtilāf; I did not pull
  the 12:42 tafsir this run, so the doc cites the verse only as a member of the
  *inṣāʾ*-family (which stands on 58:19, 18:63, 6:68 regardless) and takes no side.

- **37:28–32 — who are the speakers?** Al-Ṭabarī identifies the exchange as **al-ins
  addressing al-jinn** (*qālat al-insu lil-jinn*) — humans accusing their jinn-misleaders;
  other readings make it followers ↔ human leaders. The mechanism-claim built on 37:30
  (triple attestation of no-sulṭān) survives either way: on both readings the *misleaders*
  disclaim coercive power. Attested here: al-Ṭabarī's identification only.

- **Still open (not resolvable from these four tafsīr):**
  - Are *hamz* (23:97, *hamazāt al-shayāṭīn*) and *nafth* (113:4, *al-naffāthāt fī l-ʿuqad*)
    a **taxonomy** of shaytanic acts or **unrelated**? The corpus keeps them apart: *hamz*
    [root **همز**, 3/3] is elsewhere human slander (68:11 *hammāz*, 104:1 *humazah*), so its
    core sense is a *sharp goading/prodding* — the shaytanic instance (23:97) is the goad
    against the individual, paired with a refuge from their *ḥuḍūr* (presence, 23:98). *nafth*
    [root **نفث**, 1/1] the mufassirūn unanimously read as **sorcery** (al-Muyassar/al-Jalālayn:
    *al-sawāḥir* blowing on knots; al-Jalālayn cites al-Zamakhsharī). **Conclusion: they are
    *not* the same act.** *hamz* belongs to the goad/nazgh family (internal-pressure);
    *nafth* belongs to an *external-harm* family (sihr) alongside the night and the envier in
    Sūrat al-Falaq — adjacent to, but **not part of**, the whisper pipeline. Flag for the
    book: resist the tidy "seven weapons of shaytan" taxonomy; the corpus does not license
    fusing sorcery with whispering.
  - **50:23 vs 50:27 — the two *qarīns*.** 50:27's *qarīn* is the devil (confirmed); 50:23's
    (*hādhā mā ladayya ʿatīd*) is more plausibly the **recording angel**. A role-switch inside
    one passage worth a footnote, not a claim.

---

## 5. Corpus receipts appendix (scope-tagged, re-verified)

| Term | Scope | Tokens / Verses | Verse refs | Shaytan-relevant subset |
|---|---|---|---|---|
| *waswasa* وسوس | root | 5 / 5 | 7:20, 20:120, 50:16, 114:4, 114:5 | all; **50:16 = nafs**, not adversary |
| *nazgh* نزغ | root | 6 / 4 | 7:200, 12:100, 17:53, 41:36 | all shaytan; 2 registers (individual / between-persons) |
| *khuṭuwāt* خطوات | exact form (root خطو) | 5 / 4 | 2:168, 2:208, 6:142, 24:21 | **all four = *khuṭuwāt al-shayṭān***; the root occurs *only* in this word |
| *yumannī / amānī* | lemma *yumannī* (root مني broad = 22/19) | — | shaytan sense: 4:119, 4:120 | both = shaytan (4:119 first-person vow) |
| *qarīn* قرين | lemma (root قرن = 36 tok / 34 verses) | 8 / 7 (4:38 has 2 tokens) | 4:38, 37:51, 41:25, 43:36, 43:38, 50:23, 50:27 | firm devil: 4:38, 41:25, 43:36, 43:38, 50:27; 37:51 disputed; 50:23 prob. angel |
| *hamz* همز | root | 3 / 3 | 23:97, 68:11, 104:1 | shaytan only 23:97; others human |
| *nafth* نفث | root | 1 / 1 | 113:4 | sorcery, not whisper |
| *khabṭ* خبط | root | 1 / 1 | 2:275 | simile, not a stage |
| *sulṭān* سلط | root | 39 / 39 | (broad) | shaytan/Iblīs: 14:22, 15:42, 16:99, 16:100, 17:65, 34:21, **37:30** (misleaders' denial) |
| *istiʿādha* عوذ | root | 17 / 17 | (broad) | shaytan-context: 7:200, 16:98, 23:97, 23:98, 41:36, 113:1, 114:1 |
| *shayṭān* شطن | root | 88 / 78 | (umbrella) | — |
| *jinn* جِنّ | lemma (root جنن = broad; *janna/jannah* 147, *majnūn* 11, *jinnah* 10, *jānn* 7) | 22 / 22 | 6:100…72:6 (free-will account 72:11–15) | — |
| *tazyīn* زين | root (46/43, broad) | — | shaytan-agent: 6:43, 8:48, 15:39, 16:63, 27:24, 29:38; +unnamed passive *zuyyina* set | — |
| *taswīl* سول | root | 4 / 4 | 12:18, 12:83, 20:96, 47:25 | shaytan-agent: 47:25 only; **nafs-agent: the other three** |
| *azalla / istazalla* زلل | root | 4 / 4 | 2:36, 2:209, 3:155, 16:94 | shaytan-agent: 2:36 (form IV), 3:155 (form X, *bi-baʿḍi mā kasabū*) |
| *imlāʾ* ملو (form IV *amlā*) | token-in-context | — | 47:25 | shaytan-agent (al-Muyassar: *madda lahum fī l-amal*) |
| *azz* أزز | root | 2 / 1 | 19:83 | shayāṭīn-agent (cognate accusative) |
| *al-Gharūr* غَرُور | lemma (root غرر = 27/21, broad) | 3 / 3 | 31:33, 35:5, 57:14 | always *bi-llāhi l-gharūr* — deludes *about God* |
| *ilqāʾ* (shaytan-cast) | phrase *alqā/yulqī al-shayṭān* | — | 22:52–53 | erased by divine *naskh* |
| *yūḥī* (relay) | وحي+شطن co-occurrence | — | 6:112, 6:121 | al-Jalālayn: *yūḥī = yuwaswisu* |
| *ṣadd* (blocking) | صدد+شطن co-occurrence | — | 5:91, 27:24, 29:38, 43:62 | 5:91 = the goal-clause (*ʿan dhikri llāh*) |
| *inṣāʾ* (induced forgetting) | نسي+شطن co-occurrence | — | 6:68, 12:42, 18:63, 58:19 | dhikr-targeting: 58:19, 12:42 (referent disputed) |
| fear-promise | phrase | — | 2:268 | *yaʿidukumu l-faqr* |
| *ʿashā* عشو (opening) | root | — | 43:36 | the opening-verb |
| *istaḥwadha* حوذ | root | — | 58:19 | mastery → forgetting dhikr |

*Corrections logged against the working census: (1) the amānī shaytan-sense is **4:119 +
4:120**, not 4:120 alone; (2) the *sulṭān* shaytan-subset must include **16:100** (the
positive statement of who he *does* have power over) alongside 16:99 — and **37:30** (the
misleaders' own denial) belongs in the set; (3) root قرن is **36 tokens / 34 verses** (a
prior draft of this doc printed 34/34 — the token count was wrong); (4) lemma *jinn* جِنّ is
**22 tokens / 22 verses** — the working brief's "31 verses" figure does not match this lemma
(it may have merged جِنّ with جِنَّة/جانّ; use 22/22 for the lemma-scoped claim); (5) the
first draft used *taswīl* in §0 **without a receipt** — root سول is 4/4 and, critically,
shaytan-agent in only one of the four (47:25); the other three are nafs-agent, which turned
an unverified aside into the two-verb dual-attribution pattern of insight #2. All verified
this run.*

*Adversarial-review note (same run): §0's original claim "every verb is optical or
aesthetic" was an overclaim — *nazgh*, *azz*, *istifzāz*, *inṣāʾ*, *ṣadd* are not optical.
Restated as the four-family taxonomy (perception / suggestion / affect / attention), all
upstream-of-will, none coercive — which is the defensible and stronger form.*
