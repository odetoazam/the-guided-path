# Refutation Pass — first run (2026-08-07)

Adversarial pass over the 12 tadabbur files with the highest verify_claims ledger density.
**Worst-case sample, deliberately chosen — not a random sample of the corpus.**

- Ledger items ruled on: **106** across **12** files
- Did not survive: **57** (18 REFUTED, 39 DOWNGRADE) — 54% of items examined
- Survived the attack: **49**

Run: 13 agents, Opus 5 at xhigh effort, ~1.2M subagent tokens.
Raw verdicts with member-by-member enumeration: see the workflow journal.

---

## What this is

57 findings, 12 files, all in `content/tadabbur/`. 18 are REFUTED (the claim is false), 39 are DOWNGRADE (the claim is true in a narrower form than stated). Three of the 57 were found off-ledger by the reviewer while checking something adjacent (`002-al-baqarah/ayah-062.md` L141, `026-ash-shuara/ayahs-184-190.md` L246, `058-al-mujadila/ayah-008.md` L281) — those three are among the more serious items, which is worth noting about the ledger's coverage.

**I cannot give you a failure rate.** Only the failures were handed to me; the number of claims the pass actually tested is not in this payload. Get the denominator from the pass log before anyone quotes a percentage. What I can say: 12 files are implicated, and the corpus is ~1,300+ tadabbur files, so this is a sample, not a census.

---

## Patterns, in order of how much they matter

### Pattern 1 — Wrong ayah cited, or a fact that is simply not true (5 items)
These are falsifiable by a reader in thirty seconds and are the ones that get screenshotted.

- **`058-al-mujadila/ayah-008.md` L259 and L317** — "He is the fourth of every two who whisper (58:7)". 58:7 says *najwā of **three**, He is the fourth*. Two whisperers plus Allah is three, not four. The file itself gets it right in its own frontmatter (L13) and at L283, and every sibling file in the directory gets it right. **L317 is inside a duʿāʾ** — the error is being prayed. Fix: "the fourth of every **three** who whisper" in both places; they must move together.
- **`027-an-naml/ayah-001.md` L97** — "The Companions of the Cave are in two of them." Root ك-ه-ف occurs 6 times in the Quran, all in Surah 18. They are in none of surahs 26/27/28. Fix: delete, or "Lūṭ and Thamūd are in two of them."
- **`012-yusuf/ayah-018.md` L112** — presents a quotation as "verbatim confirmation" from al-Muyassar with the words *amran ʿaẓīman wa-sahhalat-hu fī aʿyunikum*. Al-Muyassar's actual text is *amran **qabīḥan** fī Yūsuf, fa-raʾaytumūhu ḥasanan wa-faʿaltumūh*. "Great" for "ugly" inverts the valence of the very word that makes the gloss support the thesis. Fix: use the real wording and drop "verbatim".
- **`027-an-naml/ayah-001.md` L137** — "Al-Ṭabarī placed them in the category of *mutashābihāt*." Al-Ṭabarī does the opposite: he adopts a multi-meaning decoding and calls the rival view *khaṭaʾ fāsid*. The position described is real but belongs to Ibn Kathīr reporting from the four caliphs and Ibn Masʿūd. Fix: swap the name.
- **`002-al-baqarah/ayah-062.md` L141** — "The Muslims are the only group defined by a verb." هَادُوا۟ is a Form I perfect verb, morphologically parallel to ءَامَنُوا۟. Two verbs, two nouns — not three-and-one. The file's own FORM DECISIONS block already says so. The honest version is better material: the two groups actually in the room in Medina get verbs; the two absent groups get nouns.

### Pattern 2 — "All N" where only some fit (13 items)
The signature failure. The worst instance is theological, not cosmetic:

- **`024-an-nur/ayahs-048-050.md` L262, L266, L382, L472** — four assertions that the *bal* "removes all three" diagnoses. It removes only the third (fear of an unfair verdict). Every mufassir in the file's own tafsir report affirms the diseased heart rather than cancelling it — Ibn Kathīr says they "must necessarily" have one of the three and that Allah knows which. L382 is self-refuting inside its own sentence: it says "removes all three" and then quotes two proofs that both reach only the third. **Theme Two ("There is nothing underneath... the behavior is not a symptom of the condition") does not survive the correction** — this one needs an author pass, not a find-and-replace. L266 is worse still: it calls the three options excuses that "let the man off the hook" twenty lines after calling the third "the most damning of the three."
- `012-yusuf/ayah-018.md` L216/L220 — *sawwalat* "every single time" decorates evil for its doer. 12:83 is a father's carried-over suspicion about an act the brothers did not commit. 3 of 4. Fix: "three of those four times."
- `007-al-araf/ayahs-040-041.md` L162 — "almost every other time it is Allah threading" is 10 of 13 (9:16 *walījah*, 34:2 and 57:4 have created things entering). L192 — three doors refused, but repentance is nowhere in 7:40 and the piece's own Theme 4 calls repentance the door that stays open.
- `020-ta-ha/ayah-055.md` L137 — "Creation is not containment" is stated as a universal and 39:6 (*yakhluqukum fī buṭūni ummahātikum*) contradicts it, while the article's own Theme One is built on the womb as a container. Restrict it to creation *from the earth* and the problem vanishes.
- `058-al-mujadila/ayah-008.md` L281 (and L181) — "each chamber more private than the last." The middle member is the *taḥiyyah*, which the piece's own label four lines away calls "Public." The movement is private → public → most private. A V, not a descent.
- Also: `056-al-waqiah` L262 (karīm), `002-al-baqarah` L118 and L170, `027-an-naml/ayah-025.md` L331 and L55, `026-ash-shuara` L76.

### Pattern 3 — Borrowed authority (7 items)
An interpretive extension, or a reading with no source behind it, wearing a classical name.

- **`056-al-waqiah/ayahs-075-082.md` L284** — the worst. "All three readings were held by classical mufassirūn." The third (*kitāb maknūn* = the hearts of the believers) has **zero** support in the 2,589-line tafsir report next to the file: 0 hits for قلوب, قلب, صدور. And "layers, not alternatives" invents an *ikhtilāf* where al-Ṭabarī records none. Meanwhile al-Jalālayn's actual referent (the *muṣḥaf*) is omitted. Own it as an extension or cut it.
- **`056-al-waqiah` L202/L208** — "the third reading, and this is the one the classical scholars found the deepest." All four sources settle on the *astronomical* reading, and al-Ṭabarī argues against the *tanjīm* reading on morphological grounds. The whole "the Quran swearing by the Quran" movement at L210-216 rests on a preference the classical scholars do not hold. Also an uncounted fourth qawl (*manāzil al-nujūm*) is silently dropped.
- `027-an-naml/ayah-001.md` L133 — "every great scholar of this tradition, without exception, concluded [we do not know]." 2 of 7 named parties fit; al-Ṭabarī, cited approvingly in the very next sentence, is the strongest counter-witness. L217 — the Lawḥ al-Maḥfūẓ reading attributed to "certain statements in al-Ṭabarī" when 0 of 4 sources hold it on this verse and 3 of 4 explicitly hold the rival.
- `012-yusuf/ayah-018.md` L115 (al-Rāzī — absent from the source set; the observation is the piece's own and is good), `031-luqman/ayah-033.md` L245 (al-Ḥasan al-Baṣrī not in the record; Qatādah and al-Ḍaḥḥāk are), `024-an-nur` L163 ("neck-bent" load image is an embellishment of a Lane entry that says something adjacent but different; the repo's *Mufradāt* JSON has no ذعن entry at all).

### Pattern 4 — Hard counts (11 items across 6 files, several repeating)
Free to fix, and nothing downstream depends on any of them.

| File | Lines | Says | Is |
|---|---|---|---|
| `020-ta-ha/ayah-055.md` | 63, 515 | ten words | **eight** (17 segments) |
| `027-an-naml/ayah-001.md` | 75, 412 | seven words | **six** (10 segments) |
| `031-luqman/ayah-033.md` | 51 | *yā bunayya* four times | **three** (31:13, 16, 17) |
| `031-luqman/ayah-033.md` | 150, 158, **291, 419** | *jazā* three times | **two** |
| `002-al-baqarah/ayah-062.md` | 252 | formula thirteen times | **twelve** |
| `035-fatir/ayah-013.md` | 300, **170** | "the whole verse is built on" م-ل-ك | 34 of 47 segments precede it |

Note the bolded lines: L291/L419 in Luqman and L170 in Fatir were **not in the ledger** and inherit the same error. Fix them together or the files contradict themselves.

The Luqman *yā bunayya* miscount is the most embarrassing of these — it reached four by counting imperatives instead of vocatives, split one vocative into two, invented one at 31:18 where the word does not appear, and dropped the real one at 31:16.

### Pattern 5 — Grammar made to prove what grammar cannot (6 items)
The theological points are all sound; the syntax is not what carries them.

- `020-ta-ha/ayah-055.md` L367 and L493 — the continuing object pronoun is said to establish that the self persists. 6:6 *ahlaknāhum* carries the identical suffix through "We destroyed them." The real ground is the *barzakh* material the piece cites correctly at L397-401. Change "because" to "and" at L493 and the observation survives intact. L281 — the Bridge says all three verbs are Form IV causatives; *khalaqnā* is Form I.
- **`012-yusuf/ayah-018.md` L485** — "the only verbless thing in a sea of verbs." *wa-llāhu-l-mustaʿān* is equally a *jumla ismiyya*. This is the closing architectural reveal, and the true reading is stronger: from the pivot onward Yaqub's speech never takes another verb; every remaining verb belongs to the brothers.
- `027-an-naml/ayah-025.md` L125 (heading calls the finite imperfect *yukhriju* an "active participle" — the section body contradicts its own heading four lines later), L151 (the sun is not a constituent of 27:25 at all), L335 ("word-family" for خبأ and خفي, which share only an initial letter; the file gets this right at L187 with "same texture").
- `020-ta-ha/ayah-055.md` L461 — "chiasm" for what the piece correctly describes and demonstrates as a ring (ABA, outer clauses in identical order).

### Pattern 6 — Superlatives the piece itself contradicts (6 items, lowest severity)
`012-yusuf/ayah-018.md` L448 ("the only place in the universe where the pouring is purely received" — the same paragraph grants the journal as "another place"), L538 ("the only place to become the noun" vs. Theme One's room where you cannot lie), L84 ("Yusuf is the only one not named" — Yaqub and the brothers are unnamed too, and the file says so at L76). `020-ta-ha` L63 ("proves resurrection" — the verse argues it), L227 ("gifts", the author's tenderness reading placed inside divine speech), L243/L245 (*tāra* exclusivity, when 20:37 uses *marratan ukhrā* eighteen ayahs earlier for the same job).

These are stylistic overreach. A reader is unlikely to be misled about anything that matters; they just make the prose look less careful than it is. One-word fixes, low priority.

---

## What I would do, in order

1. **`058-al-mujadila/ayah-008.md` L259 + L317 today.** Wrong ayah content, in a duʿāʾ, in a file that contradicts itself three lines later.
2. **`024-an-nur/ayahs-048-050.md`** — needs an author pass, not a patch. Four sites plus a theme that rests on them, and the correction runs against the classical consensus the piece claims to be following.
3. **`056-al-waqiah/ayahs-075-082.md` L284 + L202/L208** — invented *ikhtilāf* and a scholarly preference reversed. Also an author pass; the "Quran swearing by the Quran" movement is downstream.
4. **`027-an-naml/ayah-001.md` L97 and L137** — two flat errors, both single-sentence fixes.
5. **`012-yusuf/ayah-018.md` L112 and L115** — the fabricated verbatim quote and the al-Rāzī attribution. Then L485, which is a better reading than what's printed.
6. **The count sweep** — all six files in the Pattern 4 table, including the three unflagged sibling lines. Mechanical, zero interpretive risk, and these are what a hostile reader checks first.

Everything in Patterns 5 and 6 can be batched into one editorial pass whenever convenient.

One structural note for the maintainer: three of the sharpest findings were discovered *outside* the ledger, and in at least four cases (Luqman L291/L419, Fatir L170, Shuʿarāʾ L250, Mujādila L181) the flagged line has an unflagged twin elsewhere in the same file. Whatever produced the ledger is finding instances, not claims. Any fix pass should grep the whole file for the corrected assertion rather than editing the cited line.

---

## Appendix — all 57 findings by file

### content/tadabbur/002-al-baqarah/ayah-062.md (4)

**L118 — DOWNGRADE**

> It names FOUR groups — Muslims, Jews, Christians, Sabians — and then collapses all four labels into a single word: **مَنْ** — *whoever*.

- Members: PREDICATE A ('four groups are named') — 1. ٱلَّذِينَ ءَامَنُوا۟ PASS; 2. ٱلَّذِينَ هَادُوا۟ PASS; 3. ٱلنَّصَـٰرَىٰ PASS; 4. ٱلصَّـٰبِـِٔينَ PASS. Four groups, confirmed. PREDICATE B ('all four are labels') — 1. Muslims: FAIL. The verse gives no label; it gives a relative clause + verb (corpus 2:62:3:1 ءَامَنُ pos=V PERF VF:4 3MP). The file's own ABSENCE FLAGS (L62) and L134/L141 say explicitly there is no proper-noun label here. 2. Jews: FAIL. ٱلَّذِينَ هَادُوا۟ is structurally identical — relative clause + verb (corpus 2:62:5:1 هَادُ pos=V PERF VF:1 3MP); al-Tabari in the adjacent tafsir repo
- Why: The count of four is right and the collapse into مَنْ has explicit classical grammatical backing in the tafsir report. What fails is the word 'labels': only two of the four are actually labels (proper nouns). The other two are relative-clause verb phrases — a fact the file itself asserts 23 lines later and builds an entire insight on. Dropping 'labels' costs nothing and removes a self-contradiction the title also inherits.
- Proposed: It names FOUR groups — Muslims, Jews, Christians, Sabians — and then collapses all four into a single word: **مَنْ** — *whoever*.

**L141 — REFUTED**

> Three label-names. And one action-description. The Muslims are the only group defined by a verb — by the act of believing — rather than by a tribal or religious noun.

- Members: The four, checked against the corpus for 'is defined by a verb': 1. ٱلَّذِينَ ءَامَنُوا۟ — VERB. corpus 2:62:3:1 {word: ءَامَنُ, pos: V, root: أمن, features: PERF|VF:4|3MP}. 2. ٱلَّذِينَ هَادُوا۟ — ALSO A VERB. corpus 2:62:5:1 {word: هَادُ, pos: V, root: هود, features: PERF|VF:1|3MP}. Identical construction: ٱلَّذِينَ + 3MP perfect verb. 3. ٱلنَّصَـٰرَىٰ — noun. corpus 2:62:6:3 {pos: N, features: PN|ROOT:نصر}. 4. ٱلصَّـٰبِـِٔينَ — noun. corpus 2:62:7:3 {pos: N, features: PN|ACT_PCPL|ROOT:صبأ}. Tally: TWO verbal descriptions and TWO noun-labels, not three and one. The exclusivity claim ('the on
- Why: NOT A LEDGER ITEM — surfaced by enumerating L118's four members, and reported because it is the strongest finding of the pass and it is what makes L118 loose. The corpus is unambiguous: هَادُوا۟ is a Form I perfect verb, morphologically parallel to ءَامَنُوا۟. The file's own FORM DECISIONS block (L47) already says so ('Form I from هود... The word for "Jew" in the Quran comes from a verb of RETURNING'), and al-Tabari (tafsir report L3939) reads it as تابوا, 'they repented.' Element 1's payoff — '
- Proposed: Two label-names, and two action-descriptions. Both the Muslims and the Jews are named by a verb — by something they did (ءَامَنُوا۟, they believed; هَادُوا۟, they turned/returned) — rather than by a tribal or religious noun. The absence of a proper-noun label for the first group is itself a statement: **you are not saved by what you call yourselves. You are saved by what you do.**

**L170 — DOWNGRADE**

> And this applies to ALL FOUR GROUPS equally.

- Members: Predicate = 'can carry the label without meeting the condition.' 1. Jews — PASS (the entire 2:40-61 context is exactly this). 2. Christians — PASS. 3. Sabians — PASS. 4. Muslims — PASS (the munāfiqūn category; and al-Tabari, report L4053, glosses their condition as ثباته على إيمانه وتركه تبديله — steadfastness, which one can fail). So the predicate holds for all four. The word 'equally' is what fails: al-Tabari, answering the objection of how a believer can be told 'whoever believes,' explicitly differentiates — 'ولكن معنى إيمان المؤمن في هذا الموضع، ثباته على إيمانه وتركه تبديله. وأما إيمان ا
- Why: The attack half-succeeded. The substantive claim — no group is exempt, each can hold the name without the reality — survives every member. But 'equally' asserts uniformity that the primary classical source in the file's own tafsir report expressly denies, and it does so in the very passage that raises this question. The file does flag the scholarly dispute later (L284-290), which is to its credit, but Element 1 states the flat version with no hedge. Deleting one word fixes it.
- Proposed: And this applies to all four groups. No one is exempt.

**L252 — DOWNGRADE**

> The verse closes with a formula that appears thirteen times across the Quran:

- Members: Full corpus enumeration of لا خوفٌ عليهم ولا هم يحزنون (counting the fa-/wa-/allā prefix variants as the same formula): 1. 2:38 فلا; 2. 2:62 ولا; 3. 2:112 ولا; 4. 2:262 ولا; 5. 2:274 ولا; 6. 2:277 ولا; 7. 3:170 ألا; 8. 5:69 فلا; 9. 6:48 فلا; 10. 7:35 فلا; 11. 10:62 لا; 12. 46:13 فلا. TOTAL = 12, not 13. The second-person variant لا خوفٌ عليكم ولا أنتم تحزنون adds 7:49 and 43:68, giving 14 — also not 13. The only quantity in this neighbourhood that equals thirteen is ولا هم يحزنون taken ALONE, which adds 39:61 (وَلَا هُمْ يَحْزَنُونَ with no khawf clause) to the twelve. If the exact string is r
- Why: A pure count claim, and no counting convention yields thirteen for the formula actually quoted on the next line (*Wa lā khawfun 'alayhim wa lā hum yaḥzanūn*). Twelve is the natural reading (both halves, third person, prefix variants folded in). Thirteen appears to come from counting the grief-half by itself, which is not the formula the sentence introduces. Nothing else in Theme 2 depends on the number.
- Proposed: The verse closes with a formula that appears twelve times across the Quran:

### content/tadabbur/007-al-araf/ayahs-040-041.md (2)

**L162 — DOWNGRADE**

> The root appears fourteen times in the Qur'an, and almost every other time it is Allah who is the one doing the threading: *He makes the night slip into the day, and makes the day slip into the night*.

- Members: Root ولج, 14 segments. ALLAH AS AGENT (10 = PASS): 3:27 tūliju ×2 (You cause the night to enter the day); 22:61 yūliju ×2; 31:29 yūliju ×2; 35:13 yūliju ×2; 57:6 yūliju ×2. NOT ALLAH THREADING (3 = FAIL): 9:16 walījah — a noun meaning an intimate confidant, no threading act at all; 34:2 'yaʿlamu mā yaliju fī al-arḍ' — the subject of yaliju is mā, what penetrates the earth, Allah is the knower not the threader; 57:4 same construction, same failure. Plus 7:40 itself = 14. Score: 10/13, not 13/13 or 12/13.
- Why: The count of 14 is exactly right. The universal is not. Three of the other thirteen occurrences do NOT have Allah as the one threading, and two of them (34:2, 57:4) use the root precisely the way 7:40 does — a created thing doing the entering, with Allah only as the knower. That also softens the next line's 'Here, for once, something is asked to thread through': 7:40 is not the lone non-divine use. 10 of 13 is 'most', not 'almost every'.
- Proposed: The root appears fourteen times in the Qur'an, and in ten of the other thirteen it is Allah who is the one doing the threading: *He makes the night slip into the day, and makes the day slip into the night*.

**L192 — DOWNGRADE**

> The one negation in this set describes people who have finished refusing all three.

- Members: The three doors named at L192 are 'work righteousness, believe, repent'. (1) BELIEVE — PASS: 7:40 says kadhdhabū bi-āyātinā, they denied Our signs. Direct refusal. (2) WORK RIGHTEOUSNESS — PASS (interpretive but grounded): 7:40 says wa-istakbarū ʿanhā; al-Tabari, cited by the piece at L98, glosses this as disdaining to follow them and to submit to them, so refusal-to-follow covers the righteous-work door. (3) REPENT — FAIL: 7:40 contains no repentance term and no statement that they refused it; tāba appears in only one of the four phrase-mates (19:60), and at L368 the piece itself says repenta
- Why: Two of the three doors are genuinely refused in 7:40; the third — repentance — is nowhere in the ayah, and the piece's own Theme 4 treats repentance as the door that stays open rather than one these people shut. The third member is supplied by inference from the finality of the verdict, then written as if the text said it. This is the exact glide the pass exists to catch.
- Proposed: The one negation in this set describes people who refused the first two — they denied, and they would not submit — and never came to the third.

### content/tadabbur/012-yusuf/ayah-018.md (8)

**L84 — DOWNGRADE**

> - **No mention of Yusuf by name.** This is not "Yusuf is gone" or "where is my son." The whole ayah moves around the empty space where Yusuf should be. Yaqub never names the loss. The shirt is named. The blood is named. The nafs is named. Allah is named. Yusuf is the only one not named — and his abs

- Members: Enumerating everything the bullet says IS named vs. what is actually a name in 12:18 (corpus segment dump): (1) shirt قَمِيصِ — present but a common noun, not a name → category mismatch; (2) blood دَمٍ — common noun → category mismatch; (3) nafs أَنفُسُ — common noun → category mismatch; (4) Allah ٱللَّهُ — PASS, genuinely the one proper noun in the ayah; (5) Yusuf — correctly absent by name (only هِۦ). Now the members the universal misses: (6) Yaqub — NOT named, the ayah says only قَالَ; (7) the ten brothers — NOT named, only the 3MP verb جَآءُو and the 2MP suffix كُمْ. So Yusuf is one of thr
- Why: The headline claim ("No mention of Yusuf by name") survives — the corpus segment list for 12:18 contains exactly one proper noun, ٱللَّهُ, and Yusuf is present only inside the pronoun هِۦ of قَمِيصِهِۦ. But the universal that closes the bullet — "Yusuf is the only one not named" — is false, and the file refutes itself four bullets earlier: ABSENCE FLAG #1 at L76 says of the brothers "Not one is named." Yaqub is not named either. The bullet also silently switches categories: shirt/blood/nafs are 
- Proposed: Yusuf is not named — no person in this ayah is, except Allah — and his absence from the words mirrors his absence from the home.

**L112 — REFUTED**

> - **al-Muyassar** glosses *sawwalat lakum anfusukum amran* as: "your selves embellished for you a great matter and made it appear easy in your eyes" (zayyanat lakum anfusukum amran ʿaẓīman wa-sahhalat-hu fī aʿyunikum). This is the verbatim confirmation of the *decoration / making-easy-to-look-at* re

- Members: Checked clause by clause against the report's al-Muyassar text for 12:18: (1) "embellished for you" = زيَّنت لكم — PASS, present verbatim. (2) "your selves" = أنفسكم — PASS; the report adds الأمّارة بالسوء, which the article drops. (3) "a great matter" = amran ʿaẓīman — FAIL; the actual word is أمرًا قبيحًا, ugly, the opposite valence. (4) "made it appear easy in your eyes" = wa-sahhalat-hu fī aʿyunikum — FAIL; not in the text. The actual continuation is فرأيتموه حسنًا وفعلتموه, "so you saw it as good and did it." (5) "This is the verbatim confirmation" — FAIL as stated; it is a substantive co
- Why: The word "verbatim" makes this checkable, and it does not check out. al-Muyassar on 12:18, as carried in the tafsir report beside this file (tafsir-report-018.md, al-Muyassar section for 12:18), reads: بل زيَّنت لكم أنفسكم الأمّارة بالسوء أمرًا قبيحًا في يوسف، فرأيتموه حسنًا وفعلتموه — "rather, your souls that command to evil embellished for you an UGLY matter concerning Yusuf, so you saw it as good and did it." Neither ʿaẓīman nor wa-sahhalat-hu fī aʿyunikum appears anywhere in the report, and 
- Proposed: - **al-Muyassar** glosses *sawwalat lakum anfusukum amran* as: "your souls that command to evil embellished for you an ugly matter concerning Yusuf, so you saw it as good and did it" (zayyanat lakum anfusukum al-ammāratu bi-l-sūʾi amran qabīḥan fī Yūsuf, fa-raʾaytumūhu ḥasanan wa-faʿaltumūh). This is direct confirmation of the *decoration / making-it-look-good* reading.

**L115 — DOWNGRADE**

> - **al-Rāzī** notes the architectural beauty: Yaqub answers a *narrative* deception (a story brought with physical evidence) with a *non-narrative* response (he refuses to enter their story; his answer is a posture, not a counter-story).

- Members: Sources the file names in its USOOL checkpoint (L102) vs. sources actually present in tafsir-report-018.md: (1) Ibn Kathir — PASS, present. (2) al-Tabari — PASS, present. (3) al-Jalalayn — PASS, present. (4) al-Qurṭubī — FAIL as a source, but the specific claim attributed to him is independently corroborated by al-Jalalayn in the report. (5) al-Rāzī — FAIL; absent from the report and the attributed observation is not corroborated by any source in it.
- Why: This is the piece's own best insight wearing borrowed authority. The tafsir report next to this file lists exactly four sources — Ibn Kathir (English), al-Tabari, al-Muyassar, al-Jalalayn — and contains no al-Rāzī material at any ayah. The observation itself is defensible and nothing in the classical record contradicts it: al-Tabari's gloss of فصبر جميل as صبري على ما فعلتم بي في أمر يوسف صبرٌ جميل and Mujahid's ليس فيه جزع are consistent with a posture-rather-than-counter-story reading. But it 
- Proposed: - **Interpretive extension (not attributed to a source in the cross-reference report):** Yaqub answers a *narrative* deception (a story brought with physical evidence) with a *non-narrative* response — he refuses to enter their story; his answer is a posture, not a counter-story.

**L216 — DOWNGRADE**

> And every single time, it is used for the same thing: decorating evil so the doer of the evil can stomach it.

- Members: (1) 47:25 الشَّيْطَانُ سَوَّلَ لَهُمْ — Shaytan decorates apostasy for those who turned back after guidance was made clear; evil real, act done, decorator named. PASS. (2) 20:96 وَكَذَٰلِكَ سَوَّلَتْ لِي نَفْسِي — the Samiri's own nafs decorated the calf-making he had already carried out. PASS. (3) 12:18 — al-Muyassar in the report: أمرًا قبيحًا في يوسف، فرأيتموه حسنًا وفعلتموه, "an UGLY matter, so you saw it as good and did it" — the exact decorate-then-stomach pattern. PASS. (4) 12:83 — FAIL. Yaqub says the same sentence about Binyamin's detention, an act the brothers did not commit; al-Taba
- Why: This is the classic fourth-member failure. Three of the four occurrences fit exactly. The fourth, 12:83, does not — and the tafsir report next to this file says so in three separate voices. On 12:83 al-Tabari transmits Ibn Ishaq: اتَّهمهم وظن أن ذلك كفعلتهم بيوسف — "he ACCUSED them and SUPPOSED this was like what they did to Yusuf." al-Jalalayn: اتَّهَمَهُمْ لِما سَبَقَ مِنهُمْ مِن أمْر يُوسُف — he accused them on the strength of the earlier Yusuf affair. And in the surah's own narrative the bro
- Proposed: And three of those four times it is used for the same thing: decorating evil so the doer of the evil can stomach it.

**L220 — DOWNGRADE**

> Four uses. All of them: *the moment when an evil act has to be made bearable to the one who is about to do it.*

- Members: 47:25 PASS (decoration precedes the apostasy). 20:96 PASS (decoration precedes the calf). 12:18 PASS (decoration precedes the throwing and the lie). 12:83 FAIL (no act, imminent or completed, by the brothers for the decoration to attach to — the classical reading is suspicion carried over from the earlier crime).
- Why: Same failure as L216, restated at maximum strength — and here the temporal gloss ("about to do it") makes the fourth member's misfit sharper still. At 12:83 nothing was about to be done and, as to Binyamin, nothing had been done; Yaqub is repeating a diagnosis, not describing a decoration that preceded an act. Keeping the sentence as an unqualified "all of them" is exactly the overclaim the enumeration pass exists to catch, and the honest version costs the section nothing: the repetition at 12:8
- Proposed: Four uses. Three of them name the same moment: when an evil act has to be made bearable to the one who is about to do it. The fourth is Yaqub, years later, reaching for that same word again.

**L448 — DOWNGRADE**

> Pouring grief on Allah is the only place in the universe where the pouring is *purely received* and never *partially absorbed by the receiver*.

- Members: The four receivers the paragraph itself names: (1) the therapist's couch — FAILS the predicate; the text says the therapist is "trained to absorb," i.e. absorption occurs. (2) the journal — FAILS the exclusivity; the text grants it as "another place" where redistribution does not happen. (3) the friend — PASSES as the contrast case; "goes home carrying some of your pain." (4) Allah — PASSES. Two of four undercut "the only place in the universe."
- Why: The paragraph refutes its own superlative two sentences before it lands. It sets up therapist, journal, friend and Allah as four receivers — and it concedes that the therapist "absorbs" (so absorption does happen there) and that the journal is "another place" where redistribution does not happen (so Allah is not the only such place on the piece's own accounting). The genuine, defensible distinction the paragraph is groping toward is narrower and more interesting: the journal costs the receiver n
- Proposed: Allah is the only receiver in the universe who genuinely receives what you pour and is in no way diminished by carrying it.

**L485 — DOWNGRADE**

> It is the only verbless thing in a sea of verbs.

- Members: The ayah's predications, one by one: (1) وَجَآءُو عَلَىٰ قَمِيصِهِۦ بِدَمٍ كَذِبٍ — verbal, جَآءُو. Verb present. (2) قَالَ — verbal. (3) بَلْ سَوَّلَتْ لَكُمْ أَنفُسُكُمْ أَمْرًا — verbal, سَوَّلَتْ. (4) فَصَبْرٌ جَمِيلٌ — VERBLESS. (5) وَٱللَّهُ ٱلْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ — VERBLESS main predication; تَصِفُونَ is inside the embedded relative clause. Two verbless clauses, not one, and both are Yaqub's.
- Why: This is the architectural reveal, the load-bearing claim of the closing synthesis, and it is falsified by the ayah's own final clause. The verb count is right — the corpus gives exactly four verbs in 12:18 (جَآءُو, قَالَ, سَوَّلَتْ, تَصِفُ) — but فَصَبْرٌ جَمِيلٌ is not the only verbless predication. وَٱللَّهُ ٱلْمُسْتَعَانُ is equally a jumla ismiyya: ٱللَّهُ mubtada', ٱلْمُسْتَعَانُ khabar, no verb. Its one verb, تَصِفُونَ, sits inside the relative clause مَا تَصِفُونَ and belongs to the broth
- Proposed: It is verbless in a sea of verbs — and so is the clause that follows it, wa-llāhu-l-mustaʿānu. From the pivot onward Yaqub's speech never takes another verb; every verb left in the ayah belongs to someone else.

**L538 — DOWNGRADE**

> And the only place to *become* the noun is in the room where you are alone with Allah, pouring out everything you are not going to pour onto anyone else, until the inside of you is reshaped, and the patience is no longer something you put on for the visitors but something you simply *are*.

- Members: Places the piece itself identifies as where the interior gets reshaped: (1) alone with Allah, pouring upward (L440, L456) — PASS, this is the piece's central and best-evidenced case. (2) before a person you cannot lie to, where the decorations lose their light (L410) — FAILS the exclusivity; the piece presents it as genuinely transformative and it is not solitary. (3) the nightly self-audit at L416 ("tonight, before sleep... what was my nafs decorating?") — ambiguous, arguably solitary but not framed as being with Allah. At least one named member breaks "the only place."
- Why: The closing superlative contradicts the piece's own Theme One. At L410 the reflection argues that the decorations come off in the presence of a trusted person: "This is one of the gifts of having someone in your life you cannot lie to... In their presence, the decorations come off. The act stands plain." That is a second room where the interior reshaping happens, and it is by definition not the room where you are alone. The reflection is also under no pressure to claim exclusivity: its own evide
- Proposed: And the deepest place to *become* the noun is in the room where you are alone with Allah, pouring out everything you are not going to pour onto anyone else, until the inside of you is reshaped, and the patience is no longer something you put on for the visitors but something you simply *are*.

### content/tadabbur/020-ta-ha/ayah-055.md (12)

**L63 — REFUTED**

> We are about to spend an hour with a verse that contains only ten words in Arabic. Ten words.

- Members: Enumerated the words of 20:55 against the corpus (word indices 20:55:1 – 20:55:8): (1) مِنْهَا, (2) خَلَقْنَـٰكُمْ, (3) وَفِيهَا, (4) نُعِيدُكُمْ, (5) وَمِنْهَا, (6) نُخْرِجُكُمْ, (7) تَارَةً, (8) أُخْرَىٰ. That is EIGHT orthographic words — the corpus stops at word 8. The morphological segment count is SEVENTEEN (min|hā|khalaq|nā|kum|wa|fī|hā|nuʿīdu|kum|wa|min|hā|nukhriju|kum|tāratan|ukhrā). No counting convention yields ten: not words (8), not segments (17). The ۞ in the frontmatter is a ḥizb marker, not a word.
- Why: A flatly checkable count, wrong under both standard conventions, and it is the hook of the introduction. The nearest arithmetic that reaches ten (8 words + 2 wāw prefixes) is not a convention anyone uses, and the article never claims it.
- Proposed: We are about to spend an hour with a verse that contains only eight words in Arabic. Eight words. (and, following: "And in those eight words, Allah has built an architecture…")

**L63 — DOWNGRADE**

> Allah has built an architecture so precise that it answers a tyrant's deflection, redefines the human body, reframes death itself, and proves resurrection — all by playing one preposition off against another.

- Members: Four predicates checked individually against what the min/fī/min architecture can actually do: (1) "answers a tyrant's deflection" — PASSES, 20:51 asks about the former generations and 55 locates them in the earth; (2) "redefines the human body" — PASSES, min names material origin (cf. 23:12 khalaqnā al-insāna min sulālatin min ṭīn); (3) "reframes death itself" — PASSES, fī names residence not dissolution; (4) "proves resurrection" — FAILS. A preposition pattern cannot prove a future event. What 20:55 does is assert resurrection and ground it in the first creation (the nashʾa-ūlā argument, cf.
- Why: Three of the four predicates fit; the fourth is the classic member that the prose glides over. "Proves" is the paradigm overclaim verb — the architecture displays the shape of resurrection, it does not demonstrate it.
- Proposed: …reframes death itself, and makes its case for resurrection — all by playing one preposition off against another.

**L137 — DOWNGRADE**

> If He had used fī all three times — "in, in, in" — He would have been saying creation, death, and resurrection are all forms of containment. That would also be wrong. Creation is not containment; it is emergence. Resurrection is not containment; it is emergence.

- Members: Three members: (1) CREATION as containment — FAILS the article's universal. The Qur'an describes creation as occurring inside a container in exactly the fī form the article says would be "wrong": 39:6 yakhluqukum fī buṭūni ummahātikum khalqan min baʿdi khalq ("He creates you in your mothers' bellies, creation after creation"), and 22:5 nuqirru fī al-arḥām mā nashāʾ… thumma nukhrijukum ṭiflan. The article's own Theme One (line 301) builds on the womb as a hollow that holds a body being formed — i.e. creation-as-containment. (2) DEATH as containment — PASSES; fī is right and attested (71:18, 17:
- Why: Two of three hold. The sentence "Creation is not containment; it is emergence" is stated as a universal about creation as such, and 39:6 contradicts it in the Qur'an's own words — while the article's Theme One depends on the very containment it here denies. Restricting the claim to creation from the earth costs nothing and removes the contradiction.
- Proposed: That would also be wrong here. Your creation out of the earth is not containment inside it; it is emergence. Resurrection is not containment; it is emergence.

**L227 — DOWNGRADE**

> Allah is naming all three of your existences as gifts you do not perform. You did not earn your first life. You will not perform your death. You will not author your second life.

- Members: Predicate has two parts. "You do not perform": (1) first life — Allah is agent (khalaqnā), PASSES; (2) death — Allah is agent (nuʿīdu), PASSES; (3) second life — Allah is agent (nukhriju), PASSES. 3/3. "Gifts", attributed to Allah's own naming: (1) creation — the benefaction language is real but sits in 20:53-54 (mahd, subul, māʾ, "eat and pasture your flocks"), not in 55; borderline; (2) death — FAILS; nothing in the ayah names the return to the earth a gift, and the clause lands on Pharaoh as a verdict, with 20:56 immediately reporting "We showed him all Our signs, and he denied and refused"
- Why: The non-performance claim is airtight; the word "gifts" is the author's tenderness reading placed inside the divine speech ("Allah is naming"). The surrounding prose already hedges it honestly ("There is a tenderness in this if you can see it") — the unhedged sentence should match.
- Proposed: Allah is naming all three of your existences as acts you do not perform.

**L243 — DOWNGRADE**

> It is the word you use when something happens not once-and-for-all, but as one moment in a series.

- Members: Every Qur'anic member of root تور enumerated (corpus-wide scan): exactly TWO — 17:69 تَارَةً and 20:55 تَارَةً, both in the phrase tāratan ukhrā. (1) 17:69 "that He should return you into it another turn" — a repeated instance in a series, PASSES; (2) 20:55 — a repeated instance, PASSES. 2/2 for the sense. What FAILS is the definite article: "It is THE word you use." 20:37 — in this same surah — is وَلَقَدْ مَنَنَّا عَلَيْكَ مَرَّةً أُخْرَىٰ, marratan ukhrā doing precisely the "another instance in a series" job; and 9:126 uses marra of an explicit cycle (fī kulli ʿāmin marratan aw marratayn, "
- Why: The sense assigned to tāra holds for both of its two Qur'anic occurrences. The exclusivity does not: the same surah uses marratan ukhrā for the same job 18 ayahs earlier. Only the article needs to move.
- Proposed: It is one of the words you use when something happens not once-and-for-all, but as one moment in a series.

**L245 — DOWNGRADE**

> If Allah had wanted to say simply "a second time" He could have said marratan thāniyatan. Marra is just a numerical occurrence — a count. First time, second time, third time. But tāra carries the sense of a turn — like the way we say "your turn" or "the turn of the seasons." It implies cycle, rotati

- Members: Checked "marra is just a count" against all 32 corpus hits of root مرر (lemma مَرَّة and relatives): 9:126 مَّرَّةً أَوْ مَرَّتَيْنِ inside fī kulli ʿāmin — an annually recurring cycle, FAILS "just a count"; 17:4 مَرَّتَيْنِ — two turns of corruption in a predicted sequence, FAILS; 20:37 مَرَّةً أُخْرَىٰ — "another time" in a series of favours, FAILS; 24:58 ثَلَٰثَ مَرَّٰتٍ (three times a day) and 2:229 مَرَّتَانِ — these do read as plain counts, PASS. Separately: the hypothesised alternative marratan thāniyatan does not occur anywhere in the Qur'an; the Qur'an's actual alternative phrasing is
- Why: The tāra reading is defensible (the tāratan…wa-tāratan idiom does carry alternation), but the contrast is built on a false floor: marra is not confined to bare counting, and the counterfactual phrase chosen for the comparison is one the Qur'an never uses while the real alternative sits 18 ayahs upstream. Classical lexicography also glosses tāra simply as marra, so the contrast cannot be pushed hard.
- Proposed: If Allah had wanted to say simply "another time" He could have said marratan ukhrā — the phrase this very surah uses at 20:37. Marra most often names a numerical occurrence — a count. Tāra leans toward a turn — like the way we say "your turn" or "the turn of the seasons." It carries a sense of rotation and recurrence.

**L281 — DOWNGRADE**

> You are passive across all three thresholds.

- Members: The preceding clause in the same paragraph is the premise: "the verbs nuʿīdu and nukhriju are Form IV causatives — meaning Allah is the agent of your death and your resurrection, not you." Members: (1) nuʿīdu — VF:4, covered by the premise, PASSES; (2) nukhriju — VF:4, covered, PASSES; (3) khalaqnā — VF:1, Form I, NOT covered by the premise. It reaches the conclusion only through the object suffix كُمْ, which this Bridge never mentions. So the conclusion is true 3/3 on other grounds, but the stated support is 2/3.
- Why: The Bridge is the article's summary — the part a reader carries away — and as compressed it licenses the false takeaway that all three verbs are Form IV causatives. The conclusion itself is sound; only the missing member needs naming.
- Proposed: You are passive across all three thresholds — the first verb takes you as its object too.

**L305 — REFUTED**

> Two of them are made of flesh — the womb and, well, our bodies are flesh that came from the earth which is flesh of a kind. And one is made of wood.

- Members: The three enumerated places are cradle, grave, womb. By material: (1) womb — flesh, PASSES; (2) grave — earth/soil, FAILS: it is not flesh, and the sentence cannot name it, so it substitutes "our bodies," which is not one of the three places, then rescues the tally by calling the earth "flesh of a kind"; (3) cradle — wood, which is the "one" of the closing count. Flesh members = 1 of 3, not 2. The tally 2 (flesh) + 1 (wood) = 3 only works if the grave is counted as flesh.
- Why: A broken enumeration, and the prose knows it — the "well" is the seam where the member that does not fit is being talked past. Three places, three different materials; the sentence claims two of one kind.
- Proposed: One of them is flesh — the womb. One is wood — the cradle. One is earth — the grave. But the shape of all three is the same. Hollowed to hold a body.

**L367 — DOWNGRADE**

> The grammar requires a continuing object: "We will return you." The "you" persists across the verb. Death is something that happens to a continuing you, not an event that ends you.

- Members: Tested the inference against verbs of annihilation carrying the identical object suffix: 6:6 fa-ahlaknāhum bi-dhunūbihim ("so We destroyed them") — same continuing grammatical object across the verb, and nothing about the object survives the action; 17:69 fa-yughriqakum bimā kafartum ("so He drowns you"); 2:28 thumma yumītukum — the -kum runs straight through "He causes you to die." So an object pronoun is compatible with dissolution as easily as with relocation; it does no work at all in establishing survival.
- Why: The theological point is right, but the syntax is not what carries it. What carries it is the fī of residence and the barzakh material the article cites correctly at lines 397-401. As written, the grammar is made to prove something grammar cannot prove.
- Proposed: The grammar keeps naming a you: "We will return you." The verse does not describe a dissolution; it describes a placing.

**L461 — DOWNGRADE**

> The structure is a chiasm, an inverted parallelism — a literary form where the outer pieces mirror each other and the inner piece carries the weight.

- Members: Element order compared member by member: clause 1 = min + hā + verb + kum; clause 3 = min + hā + verb + kum — IDENTICAL order, nothing reversed; clause 2 = fī + hā + verb + kum. Chiasmus / inverted parallelism requires the corresponding elements to recur in reverse order (AB … B′A′). Here the outer clauses run in the same order element for element — which the article itself states four lines earlier: "Min preposition. The earth. A verb of emergence. A pronoun for you." The pattern is ABA, a ring or concentric structure — which is exactly what the gloss after the dash describes.
- Why: The definition given ("outer pieces mirror each other, inner piece carries the weight") is correct and is the definition of ring composition, not chiasmus. The technical label contradicts the article's own demonstration, and it is the one place the piece reaches for borrowed literary-critical authority.
- Proposed: The structure is a ring — a concentric pattern where the outer pieces mirror each other and the inner piece carries the weight.

**L493 — DOWNGRADE**

> Your self persists because the grammar continues to take "you" as its object across all three clauses.

- Members: Object suffix in each clause: (1) khalaqnākum — كُمْ at 20:55:2:3, PASSES; (2) nuʿīdukum — كُمْ at 20:55:4:2, PASSES; (3) nukhrijukum — كُمْ at 20:55:6:2, PASSES. 3/3 on the enumerable part. The failure is the word "because": object status entails nothing about the object's survival — 6:6 ahlaknāhum takes the same continuing object across "We destroyed them."
- Why: The universal survives; the causal connective does not. This is the closing synthesis, so the overclaim is load-bearing: the piece's real ground for persistence is the barzakh material at 397-401, not the pronoun. Changing one word keeps the observation and drops the false entailment.
- Proposed: Your self persists — and the grammar keeps taking "you" as its object across all three clauses.

**L515 — REFUTED**

> The earth is your mother three times — she gave you up at birth, she will receive you in death, and she will give you up one more time — and the prepositions of the verse perform this whole architecture in ten words.

- Members: Two universals in the thesis. (a) "three times": (1) minhā — earth gives you up, PASSES; (2) fīhā — earth receives you, PASSES; (3) minhā … tāratan ukhrā — earth gives you up again, PASSES. 3/3, though "at birth" is loose — the first clause names creation from the earth's substance, not parturition, and the article gets there only via Theme One. (b) "ten words": FAILS — the ayah is eight orthographic words (corpus indices 20:55:1 through 20:55:8) or seventeen morphological segments. Neither is ten.
- Why: This is the One-Sentence Distillation — the thesis the whole refutation pass exists to test — and it carries a hard count that is simply wrong, repeated from line 63. The architecture claim is fine; the number is not.
- Proposed: The earth is your mother three times — she gave you up when she gave you your substance, she will receive you in death, and she will give you up one more time — and the prepositions of the verse perform this whole architecture in eight words.

### content/tadabbur/024-an-nur/ayahs-048-050.md (5)

**L163 — DOWNGRADE**

> He chose *mudhʿinīn* — a word so specific to *eager, bowing, neck-bent compliance* that He used it nowhere else in His Book.

- Members: The predicate is a three-part semantic claim; checked each against the lexical and tafsir record. (1) 'eager' — PASSES, and strongly: Mujāhid via al-Ṭabarī glosses مذعنين as سراعا ('swiftly'); al-Jalālayn glosses مسرعين طائعين ('hastening, willing'); Lane gives 'quick in obedience to him: this is its [proper, or primary] meaning, accord. to Aboo-Is-hák.' (2) 'bowing' — WEAK PASS: Lane has 'lowly, or humble, and abject' (خضع وذلّ), which is bowing as a posture of the self, not a physical bow. (3) 'neck-bent' — FAILS. This comes from the piece's earlier image at L161, 'the camel that bows its ne
- Why: The uniqueness half of the claim survives (verified at root level, see L159). What fails is the semantic rider that the uniqueness is hung on. 'Not compelled against their will' IS attested (Fr, via Lane: 'obedient; not compelled against their will') and 'eager' is attested twice over, so the core contrast the piece is building — willing vs. coerced — holds. But 'neck-bent,' and the L161 image it rests on, is an embellishment of a lexical entry that says something adjacent but different. The wor
- Proposed: He chose *mudhʿinīn* — a word so specific to *eager, willing, uncoerced* compliance that He used it nowhere else in His Book.

**L262 — REFUTED**

> The three questions are not three candidate diagnoses from which Allah selects the third. **The *bal* sweeps all three off the table.**

- Members: The three members are (1) أَفِى قُلُوبِهِم مَّرَضٌ, (2) أَمِ ٱرْتَابُوٓا۟, (3) أَمْ يَخَافُونَ أَن يَحِيفَ ٱللَّهُ عَلَيْهِمْ وَرَسُولُهُۥ. Checked 'the bal removes it' against each, using the file's own tafsir-report-048-050.md. MEMBER 3 — PASSES, unanimously. al-Ṭabarī on بل: 'ما خاف هؤلاء المعرضون... أن يحيف عليهم رسول الله، فيجور في حكمه عليهم، ولكنهم قوم أهل ظلم لأنفسهم'. al-Muyassar: 'كَلّا، إنهم لا يخافون جورًا'. al-Jalālayn: the bare لا placed immediately after the third question. MEMBER 1 — FAILS. Ibn Kathīr: 'their situation cannot be anything else, they MUST NECESSARILY have a disea
- Why: This is the exact failure mode the pass exists to catch, in its worst form — not three-of-four but one-of-three, and it is presented as the classical consensus. The preceding sentence, 'The three questions are not three candidate diagnoses from which Allah selects the third,' is a flat contradiction of Ibn Kathīr, who says precisely that they are three candidate diagnoses and that 'Allah knows which of these characteristics each one of them has.' The two authorities the piece does quote (L258) a
- Proposed: The three questions are three candidate diagnoses — and the *bal* strikes the last one off the table.

**L266 — REFUTED**

> Allah voices three explanations that would each, in their own way, let the man off the hook — an illness, an honest uncertainty, a frightened suspicion of the bench — and then removes all three.

- Members: Two predicates here, so each member is checked twice. 'Would let the man off the hook': (1) 'an illness' — FAILS. فِى قُلُوبِهِم مَّرَضٌ is never exculpatory in Qur'anic idiom (2:10 'فَزَادَهُمُ ٱللَّهُ مَرَضًا' with a painful punishment for lying; likewise 8:49, 9:125, 33:12, 47:20). al-Jalālayn glosses it here as كُفْر outright; Ibn Kathīr: 'Whichever it is, it is pure disbelief.' (2) 'an honest uncertainty' — FAILS. ارتابوا is glossed شكّوا في نبوته — doubting his prophethood, which Ibn Kathīr also files under 'pure disbelief.' Not honest uncertainty. (3) 'a frightened suspicion of the benc
- Why: Both halves of the sentence fail, and the first half also contradicts the piece internally by twenty lines. The rhetorical engine of Theme Two — Allah offering three merciful outs and then withdrawing them — requires the three options to read as mitigations, but two of them are glossed by the mufassirūn as kufr and the third is the one the piece itself calls the ugliest. What actually happens in the ayah is narrower and still sharp: the one excuse that could have posed as a grievance (an unfair 
- Proposed: Allah voices three explanations for the turning-away — a diseased heart, doubt, a frightened suspicion of the bench — and strikes down the last of them: they never actually feared an unfair verdict. What is left is not a grievance. **It is a choice.**

**L382 — REFUTED**

> Allah asks three questions about the man who avoids His judgment. Is he sick? Is he unsure? Is he afraid of an unfair verdict? And then the *bal* falls and removes all three.

- Members: Same three members as L262, same result: (1) مرض — not removed (Ibn Kathīr: they 'must necessarily' have it; al-Jalālayn: كُفْر; al-Ṭabarī: شكّ في رسول الله, treated as the operative cause); (2) ارتابوا — not removed (al-Jalālayn: شكّوا في نبوته; Ibn Kathīr lists it as a live alternative); (3) fear of ḥayf — removed, unanimously (al-Ṭabarī 'ما خاف... أن يحيف عليهم رسول الله'; al-Muyassar 'كلا إنهم لا يخافون جورًا'; al-Jalālayn's bare لا). 1 of 3.
- Why: This instance is self-refuting inside its own sentence. It asserts 'removes all three' and then produces two proofs, both of which reach only the third: al-Muyassar's quoted words are 'they do not fear injustice' — about the fear alone — and the piece itself writes that al-Jalālayn 'answers THE THIRD QUESTION with a bare lā.' The evidence adduced is correctly scoped; the conclusion drawn from it is not. Note also that al-Ṭabarī's actual 24:50 commentary is present in the report but filed under t
- Proposed: Allah asks three questions about the man who avoids His judgment. Is he sick? Is he unsure? Is he afraid of an unfair verdict? And then the *bal* falls and removes the last one.

**L472 — REFUTED**

> And the *bal* removes all three and delivers the actual answer: *they* are the wrongdoers — and, as al-Jalālayn reads it, wrongdoers **in the very act of turning away**.

- Members: Members as above: مرض — not removed; ارتابوا — not removed; خوف الحيف — removed. 1 of 3. The second half of the sentence checks out independently: al-Jalālayn does read the ẓulm as consisting in the turning-away — ﴿بَلْ أُولَئِكَ هُمْ الظّالِمُونَ﴾ بِالإعْراضِ عَنْهُ — so 'wrongdoers in the very act of turning away' is a correct attribution, and al-Ṭabarī independently supports it (أهل ظلم لأنفسهم بخلافهم أمر ربهم... والتسليم له).
- Why: The al-Jalālayn attribution survives cleanly; the 'removes all three' head clause does not, for the same reason as L262 and L382. Because this sits in the Architectural Reveal, the error propagates into the sentence that follows it — 'nor even by a sincere fear of an unfair hearing' is right, but the implied 'and not by a diseased heart either' is what the mufassirūn refuse to say. Minimal fix: change the count and leave the Jalalayn clause standing.
- Proposed: And the *bal* removes the third and delivers the actual answer: *they* are the wrongdoers — and, as al-Jalālayn reads it, wrongdoers **in the very act of turning away**.

### content/tadabbur/026-ash-shuara/ayahs-184-190.md (2)

**L76 — DOWNGRADE**

> But one thing does close all seven, and it drops like a stone into water:

- Members: Predicate = 'the āyah-refrain closes this narrative.' (1) Musa 26:10-68 — refrain at 67 PASS. (2) Ibrahim 26:69-104 — refrain at 103 PASS. (3) Nuh 26:105-122 — refrain at 121 PASS. (4) Hud 26:123-140 — refrain at 139 PASS. (5) Salih 26:141-159 — refrain at 158 PASS. (6) Lut 26:160-175 — refrain at 174 PASS. (7) Shu'ayb 26:176-191 — refrain at 190 PASS. All seven members pass — the primary attack FAILED on the stated predicate. The claim breaks on its EXCLUSIVITY implicature ('one thing'). Corpus search using the full text of 26:9 as needle returns exactly 8 Quran-wide hits, all in surah 26: 26
- Why: The sentence sits in a contrast ('those three lines each land exactly five times' → 'BUT one thing does close all seven'), so 'one thing' reads as 'exactly one thing spans all seven,' and the whole of Part 3 and Distillation Five are built on that. It is false: the closing formula of every one of the seven is a couplet — refrain + وَإِنَّ رَبَّكَ لَهُوَ ٱلْعَزِيزُ ٱلرَّحِيمُ — verified at 8/8 positions, exclusive to surah 26. The article never mentions the second line anywhere. The omission is n
- Proposed: But one couplet does close all seven, and its first line drops like a stone into water:

**L246 — DOWNGRADE**

> The surah does not end on destruction. It ends on this refrain — a sign, and the observation that most did not believe.

- Members: BEYOND-LEDGER — flagged because it is the same defect as L76 in acute form, and it is a factual claim about where the text ends. Check the actual last ayah of each of the seven narratives: Musa ends 26:68, Ibrahim 26:104, Nuh 26:122, Hud 26:140, Salih 26:159, Lut 26:175, Shu'ayb 26:191 — all seven are وَإِنَّ رَبَّكَ لَهُوَ ٱلْعَزِيزُ ٱلرَّحِيمُ, not the refrain. 0 of 7 members end on the refrain. The surah as a whole ends at 26:227.
- Why: The article states outright that the ending lands on the refrain, and L250 repeats it ('This is the note on which Shu'ayb's chapter closes'). Neither is true at the level of the text: every one of the seven, including Shu'ayb's at 26:191 — the ayah immediately after this passage's own range — closes on al-ʿAzīz ar-Raḥīm. The article is right that the surah does not end on destruction; it is wrong about what it ends on instead, and the true answer (might paired with mercy) is stronger than the on
- Proposed: The surah does not end on destruction. It ends on this refrain — a sign, and the observation that most did not believe — and then, one ayah further, on *wa inna rabbaka la-huwa-l-ʿazīzu-r-raḥīm*: and indeed your Lord, He is the Almighty, the Merciful.

### content/tadabbur/027-an-naml/ayah-001.md (6)

**L75 — DOWNGRADE**

> Seven words in Arabic.

- Members: Enumerated from the corpus cache, 27:1. Orthographic words = 6: (1) طسٓ (2) تِلْكَ (3) ءَايَٰتُ (4) ٱلْقُرْءَانِ (5) وَكِتَابٍ (6) مُّبِينٍ. Corpus segments = 10 (تلك splits into 3; ٱلْ+قُرْءَانِ = 2; وَ+كِتَابٍ = 2). Neither standard count is seven. Seven is reachable only by two mutually exclusive fudges: splitting طس into ṭāʾ + sīn and counting وكتاب whole (2+5=7), or keeping طس whole and splitting off the wa- (1+6=7) — and the article itself treats طس as one signal of two letters at L99 ('Two letters, not three'), so its own framing does not license either.
- Why: A hard, checkable number that is wrong under both accepted counting schemes — exactly the class of error the skill's own segment-vs-word warning flags. It recurs at L412 ('a complete theology of divine speech in seven words'), so it reads as a settled fact rather than a slip. Nothing in the argument depends on the number; the fix is free.
- Proposed: Six words in Arabic.

**L97 — REFUTED**

> The Companions of the Cave are in two of them.

- Members: Set = {26 Ash-Shuʿarāʾ, 27 An-Naml, 28 Al-Qaṣaṣ}. Aṣḥāb al-Kahf test, run on the corpus cache: root ك-ه-ف occurs 6 times in the entire Quran — 18:9, 18:10, 18:11, 18:16, 18:17, 18:25. ALL SIX are in Surah 18 (Al-Kahf). 26 = FAIL. 27 = FAIL. 28 = FAIL. Count is zero, not two. Charitable rescues also fail: Aṣḥāb al-Aykah (the nearest-sounding 'Companions of…' group) occurs only in 15 and 50 by that spelling and at 26:176 in context — never in 27 or 28, so that substitution yields one, not two. Verified-true neighbours in the same paragraph, for contrast: 'Moses appears in all three' PASSES (26:1
- Why: This is a flat factual error, not an overclaim. The Companions of the Cave appear in exactly one surah of the Quran (18) and in none of the three surahs the sentence is about. Nothing in the surrounding argument depends on it, which is why it slid past every validator — it is a free-floating detail in a paragraph whose other three claims are all true. It is also the most quotable-against-us sentence in the piece: a reader who checks one thing will check this.
- Proposed: Delete the sentence, or replace with a true member-of-two claim: "Lūṭ and Thamūd are in two of them."

**L133 — DOWNGRADE**

> Here is what every great scholar of this tradition, without exception, concluded — and it is not a failure of scholarship but the whole point:

- Members: Enumerating the 'great scholars' the file's own tafsir reports name on the ḥurūf muqaṭṭaʿāt: (1) Abū Bakr, ʿUmar, ʿUthmān, ʿAlī, Ibn Masʿūd — PASS ('among those things whose knowledge Allah has kept only for Himself', per Ibn Kathīr, tafsir-report-001-005.md L119). (2) Ibn Kathīr — PASS, closes with 'Allah knows best' (L133) — though he also insists 'these letters carry a specific meaning'. (3) al-Ṭabarī — FAIL. In tafsir-report-001-005.md L419 he states his own verdict: «والصواب من القول عندي في تأويل مفاتِح السور… أراد بلفظِه الدلالةَ بكل حرف منه على معان كثيرة، لا على معنى واحد» — each lett
- Why: The universal 'every… without exception' is the exact failure mode this pass exists to catch, and here the counter-members are the biggest names in the field — including al-Ṭabarī, whom the very next sentence of the article cites in support. The piece then contradicts itself four sentences later ('Scholars across centuries proposed theories… But none achieved certainty'), which is the honest version. The true claim — no consensus decoding was ever reached — survives; the universal does not.
- Proposed: Here is what many of the greatest scholars of this tradition concluded — and it is not a failure of scholarship but the whole point:

**L137 — REFUTED**

> Al-Ṭabarī placed them in the category of *mutashābihāt* — the ambiguous, whose full meaning belongs to Allah alone.

- Members: Single-member attribution, checked against the repo's own al-Ṭabarī text. (a) On 27:1 (tafsir-report-001.md L87-91) al-Ṭabarī does not classify طس as mutashābih; he transmits Ibn ʿAbbās's decoding (an oath, from Allah's names) and derives a meaning from it: «فالواجب على هذا القول أن يكون معناه: والسميع اللطيف». (b) On the muqaṭṭaʿāt generally (tafsir-report-001-005.md L419-425) he states his own considered position: «والصواب من القول عندي… أنّ كلّ حرف منه يحوي ما قاله الربيع، وما قاله سائر المفسرين… شاملٌ جميعُها من أسماء الله عز وجل وصفاته». He affirmatively adopts a multi-meaning decoding an
- Why: Borrowed authority, and pointed at the one scholar who held the opposite. Al-Ṭabarī is the strongest available counter-witness to the 'we do not know' framing, so citing him for it inverts the record. The fix is a name swap; the surrounding argument survives untouched because the position itself is genuinely attested.
- Proposed: Ibn Kathīr reports from Abū Bakr, ʿUmar, ʿUthmān, ʿAlī and Ibn Masʿūd that these letters are among the things whose knowledge Allah has kept for Himself.

**L217 — DOWNGRADE**

> **Some** — including certain statements in al-Ṭabarī and those who follow — understand *āyāt al-Qurʾān* as the Quran in its recited form and *kitābin mubīn* as a reference to al-Lawḥ al-Maḥfūẓ, the Preserved Tablet — the Quran in its written, preserved, cosmic form.

- Members: The paragraph frames this as 'the classical commentators on this asymmetry' — i.e. on 27:1. Checking all four sources in the file's own tafsir report (tafsir-report-001.md): (1) al-Ṭabarī — FAIL, and contrary: «وخفض قوله ﴿وَكِتَابٍ مُبِينٍ﴾ عطفا به على القرآن», with mubīn glossed as «يبين لمن تدبَّره وفكَّر فيه بفهم أنه من عند الله» — the recited Quran proving its own origin, no Tablet anywhere. (2) al-Muyassar — FAIL, and explicitly the rival reading: «فالقرآن هو الكتاب، جمع الله له بين الاسمين» (the Quran IS the Book; Allah joined the two names for it). (3) al-Jalalayn — FAIL: «عطف بزيادة صف
- Why: The claim is real as a position in the wider tafsir tradition, but it is presented as the reading of the commentators on this verse and headed by al-Ṭabarī, who on this verse says the opposite. The article's own hedge ('certain statements in') is doing work it cannot carry when the paragraph's stated subject is 'this asymmetry' in 27:1. Note the downstream cost: the article gives the Lawḥ reading first billing and calls the same-referent reading merely 'a strong position', when the same-referent
- Proposed: **Some** — reading *kitāb mubīn* as it is glossed elsewhere in the Quran (6:59, 27:75) — understand *āyāt al-Qurʾān* as the Quran in its recited form and *kitābin mubīn* as a reference to al-Lawḥ al-Maḥfūẓ, the Preserved Tablet — the Quran in its written, preserved, cosmic form.

**L412 — DOWNGRADE**

> The verse is a complete theology of divine speech in seven words.

- Members: Same enumeration as L75: 27:1 = 6 orthographic words (طسٓ / تِلْكَ / ءَايَٰتُ / ٱلْقُرْءَانِ / وَكِتَابٍ / مُّبِينٍ), 10 corpus segments. Seven = FAIL under both. Note also the CLOSING SYNTHESIS immediately above (L396-400) itself walks the verse in five units, so the piece already disagrees with its own count two paragraphs earlier.
- Why: Second instance of the same miscount, in the load-bearing closing line. Repeating the wrong number is what turns a slip into a claim.
- Proposed: The verse is a complete theology of divine speech in six words.

### content/tadabbur/027-an-naml/ayah-025.md (5)

**L55 — DOWNGRADE**

> There are fifteen ayat in the Quran where, when recited, the listener is recommended or required to prostrate. This is one of them.

- Members: Enumerated the schools and checked 'fifteen' against each: (1) Hanafi — 14 — FAIL. (2) Shafii — 14 — FAIL. (3) Maliki — 11 — FAIL. (4) The mushaf's printed ۩ markers — 15 — PASS. One of four fits, and it is the printing convention rather than any school's ruling. Separately, the placement predicate ('This is one of them', referring to ayah 25) checked against the two positions: Abū Ḥanīfa at 27:25 — PASS; al-Shāfiʿī at 27:26, which is where the file's own report prints the ۩ — FAIL.
- Why: Two problems in one sentence. First, 'fifteen' is the maximal count of sajdah markers, not an agreed figure: the Hanafis count fourteen (excluding 22:77), the Shafiis count fourteen (including 22:77 but treating 38:24 as sajdat shukr, not tilawah), and the Malikis eleven. No single school holds all fifteen as recitation-prostrations, yet the sentence states 'There are fifteen' as bare fact — and the second clause, 'recommended or required', is a fiqh ruling stated without its ikhtilaf. Second, t
- Proposed: Here's what's strange. There are fourteen or fifteen places in the Quran — the schools differ on the count — where, when recited, the listener prostrates. This passage is one of them (Abū Ḥanīfa places the sajdah at this very ayah; al-Shāfiʿī at the end of the next).

**L125 — REFUTED**

> ### Element Two: *Yukhriju* — The Active Participle of an Ongoing Bringing-Forth

- Members: One member: the POS label 'Active Participle'. Checked against the corpus entry for 27:25:5:1 → V | IMPF | VF:4. FAIL.
- Why: يُخْرِجُ is not an active participle. The corpus tags 27:25:5:1 as pos=V, features IMPF|VF:4|3MS|MOOD:IND — a finite imperfect verb, Form IV. The active participle of Form IV أَخْرَجَ is مُخْرِج (mukhrij), which does not occur in this ayah. The section's own body contradicts its heading four lines later ('The form *yukhriju* — what grammarians call the *muḍāriʿ*'), so this is a heading error, not a sustained misunderstanding — but it is the most visible line of the section and it is flatly wrong
- Proposed: ### Element Two: *Yukhriju* — The Imperfect Verb of an Ongoing Bringing-Forth

**L151 — DOWNGRADE**

> It is a passive object in this divine sentence — a thing that comes out because something else brings it out.

- Members: One member: the sun, checked for the predicate 'passive object in this divine sentence'. Scope A, ayah 27:25 — the sun is absent from the ayah entirely; the object of يُخْرِجُ is ٱلْخَبْءَ — FAIL. Scope B, the wider report 27:24-26 — the sun appears only as لِلشَّمْسِ, a prepositional object, never a passive/direct object — FAIL. The predicate fails on both available scopes.
- Why: Stated as grammar, but the sun is not a constituent of 27:25 at all — the ayah's only object of yukhriju is al-khabʾ, and the word shams appears nowhere in it. Widening 'this divine sentence' to the hoopoe's whole report does not rescue the claim: at 27:24 the sun appears as لِلشَّمْسِ, the object of a preposition governed by yasjudūna, not a passive object of anything. The theological point — the sun belongs to the brought-out category — is sound and the piece argues it well elsewhere; it just 
- Proposed: It is acted upon — a thing that comes out because something else brings it out.

**L331 — DOWNGRADE**

> It begins with negation: *allā yasjudū* — that they would *not* prostrate.

- Members: Enumerated the four classical sources in the file's own report and checked the 'negation' predicate against each: (1) Ibn Kathir — renders 'So they do not prostrate themselves before Allah' — PASS. (2) al-Muyassar — 'li-allā yasjudū lillāh' — PASS. (3) al-Tabari — records BOTH readings and declares both mustafīḍah, one of which is imperative not negative — FAIL as a flat statement. (4) al-Jalalayn — 'ay an yusjidū lahu fa-zīdat lā', the lā is redundant, sense is affirmative — FAIL. Two of four do not support the claim as written.
- Why: Presented as settled fact, but two of the four tafsir sources in the file's own tafsir-report-025.md read it otherwise. Al-Tabari records the qiraa split at length — some Meccan, Medinan and Kufan readers read alā with takhfif, meaning 'alā yā hāʾulāʾi sjudū' (an imperative: 'O people, prostrate!'), citing al-Akhtal's line as the Arabic precedent — and then rules explicitly that both are sound: wa-l-sawāb min al-qawl fī dhālika annahumā qirāʾatān mustafīḍatān. Al-Jalalayn, even within the tashdi
- Proposed: It begins, on the reading of Ḥafṣ, with negation: *allā yasjudū* — that they would *not* prostrate. (On the other widespread reading, *alā yā-sjudū*, it is a call: "O people, prostrate!" — al-Ṭabarī holds both readings sound.)

**L335 — DOWNGRADE**

> And the same word-family of hiddenness — *khabʾ*, *tukhfūn* — bridges them.

- Members: Two members named in the claim, checked for shared root: (1) khabʾ — corpus root خبأ — and (2) tukhfūn — corpus root خفي. They do not share a root, a lemma, or a derivational pattern. The predicate 'same word-family' FAILS on the pair it names. The weaker predicate 'same semantic field' PASSES.
- Why: 'Word-family' asserts derivational kinship, and there is none. The corpus gives خَبْء root خبأ and تُخْفُونَ root خفي — two distinct roots sharing only their initial خ. The semantic bridge the piece is pointing at is real and is the better claim; the morphological claim wrapped around it is false. Note the file gets this right at line 187, where it says 'the same texture of hiddenness' — a semantic claim it can support. Only the Closing Synthesis upgrades 'texture' to 'word-family', which is the
- Proposed: And the same field of hiddenness — *khabʾ*, *tukhfūn* — bridges them.

### content/tadabbur/031-luqman/ayah-033.md (4)

**L51 — REFUTED**

> Four times in this surah. The diminutive form. The form of tenderness. Don't associate partners with Allah, my dear son. Establish prayer, my dear son. Be patient, my dear son. Don't walk on the earth in arrogance, my dear son.

- Members: The claim enumerates four occurrences of yā bunayya. Checked against the corpus (lemma بُنَىّ across all of Surah 31): (1) 'Don't associate partners with Allah, my dear son' = 31:13, يَٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ — PASS, real vocative. (2) 'Establish prayer, my dear son' = 31:17, يَٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ — PASS, real vocative. (3) 'Be patient, my dear son' = وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ, which is INSIDE 31:17 and governed by the SAME single vocative already counted at (2) — FAIL, this is not a fourth address, it is the second half of the third one. (4) 'Don't walk on the earth in ar
- Why: Corpus query over all 34 ayahs of Surah 31 returns exactly three segments with lemma بُنَىّ: 31:13 seg13, 31:16 seg2, 31:17 seg2. 'Four times' is false. This is the textbook failure mode this pass exists to catch — the prose reached four by counting imperatives rather than vocatives, and one of the four imperatives (31:18) is not even in a yā-bunayya ayah.
- Proposed: Three times in this surah. The diminutive form. The form of tenderness. Don't associate partners with Allah, my dear son. Nothing escapes Allah — not the weight of a mustard seed — my dear son. Establish prayer and be patient, my dear son.

**L150 — REFUTED**

> ### Element Two: The Word Repeated Three Times

- Members: The heading asserts a threefold repetition of the جزي root inside 31:33. Corpus segment list for 31:33 gives exactly two: (1) 31:33:8:1 يَجْزِى — PASS, verb, root جزي. (2) 31:33:15:1 جَازٍ — PASS, active participle, root جزي. (3) — there is no third member. A full root tally of the ayah's 50 segments returns جزي: 2. The only root in 31:33 with a count of three is غرر (تَغُرَّ / يَغُرَّ / غَرُورُ), and that is a different word discussed in Element Three.
- Why: The section heading promises and frames an entire linguistic argument on a count the text does not support. جزي occurs twice, not three times. The heading also collides with Element Three, which correctly claims three occurrences for غرر — leaving the piece asserting two different 'three times' words when only one is real.
- Proposed: ### Element Two: The Word Repeated in Both Directions

**L158 — REFUTED**

> And the same root appears three times in this short clause — once as the verb *yajzī*, once as the active participle *jāzin*. (The word *jazāʾ* — recompense — comes from this same root.)

- Members: The sentence claims three and then enumerates its own members, so it refutes itself on the page: (1) yajzī, the verb — PASS, present at 31:33:8:1. (2) jāzin, the active participle — PASS, present at 31:33:15:1. (3) unnamed — FAIL, no third member is offered. The parenthetical jazāʾ is not a third occurrence: the word جزاء does not appear anywhere in 31:33 (root tally for the ayah: جزي = 2). It is an etymological aside about a word absent from the verse, and it is doing the silent work of padding two into three.
- Why: The clause states a count of three while naming only two, and the only candidate for a third — jazāʾ — is not in the ayah. Note two further inheritors of the same false count that the ledger did not flag and that must be fixed with it: line 291, 'We have seen the word *jazā* repeated three times', and line 419, 'sealed by the threefold repetition of *jazā*'.
- Proposed: And the same root appears twice in this short clause — once as the verb *yajzī*, once as the active participle *jāzin*. (The word *jazāʾ* — recompense — comes from this same root, though it does not appear here.)

**L245 — DOWNGRADE**

> And classical scholars — Ibn ʿAbbās, Mujāhid, al-Ḥasan al-Baṣrī — they identify *al-Gharūr* as Shayṭān himself.

- Members: Three authorities are named; checked against the tafsir report sitting next to the file (tafsir-report-033.md): (1) Ibn ʿAbbās — PASS, Ibn Kathir names him explicitly for this identification. (2) Mujāhid — PASS, named by both Ibn Kathir and al-Tabari, who gives the isnād to Ibn Abi Najīḥ from Mujāhid: قال: الشيطان. (3) al-Ḥasan al-Baṣrī — FAIL, he appears nowhere in the report on this ayah. The authorities the sources actually name alongside Ibn ʿAbbās and Mujāhid are al-Ḍaḥḥāk and Qatādah (Ibn Kathir; al-Tabari carries separate isnāds for both). The only other named view in the report is Saʿī
- Why: Two of three named authorities are verified; the third is not in the classical record the piece was built from, so the sentence is wearing borrowed authority for one of its three signatures. The underlying identification is sound and well-attested — only the roster is wrong, so this is a downgrade of the citation, not of the claim. Worth noting for accuracy: al-Tabari also records a broader lexical sense (الغَرور ... كائنا ما كان شيطانا كان أو إنسانا، أو دنيا), so 'Shayṭān himself' is the majori
- Proposed: And classical scholars — Ibn ʿAbbās, Mujāhid, Qatādah, al-Ḍaḥḥāk — they identify *al-Gharūr* as Shayṭān himself.

### content/tadabbur/035-fatir/ayah-013.md (1)

**L300 — DOWNGRADE**

> The whole verse is built on **the same root used twice**: م-ل-ك.

- Members: N=2 occurrences of root م-ل-ك in 35:13, enumerated by segment. Member 1 = مُلْكُ, segment 35, noun, lemma مُلْك, in لَهُ ٱلْمُلْكُ — PASS (real, Allah's side). Member 2 = يَمْلِكُ, segment 44, verb, in مَا يَمْلِكُونَ — PASS (real, idols' side). Count of two: PASS. Predicate 'the whole verse is built on' it: FAIL — 34 of 47 segments precede the first occurrence. Predicate 'the same root used twice' as a distinguishing feature: FAIL — ولج، ليل، نهر each also occur exactly twice in this same verse, so four roots satisfy the description, not one.
- Why: The count is correct but the scope word 'whole' is false, and the distinctiveness the sentence implies does not exist. Two independent failures. (1) SCOPE: م-ل-ك occupies segments 35 and 44 of a 47-segment verse. Segments 1-34 — 72% of the ayah, everything from يُولِجُ through رَبُّكُمْ — contain zero م-ل-ك. That stretch is built on ولج، ليل، نهر، سخر، شمس، قمر، جري، أجل، سمو. The root structures the closing contrast, not the whole verse. (2) DISTINCTIVENESS: 'the same root used twice' is presen
- Proposed: The verse's closing contrast is built on **one root used twice**: م-ل-ك.

### content/tadabbur/056-al-waqiah/ayahs-075-082.md (5)

**L168 — DOWNGRADE**

> Three classical readings sit in the tradition. I want to give you all three, but I also want to be honest about where the scholars part ways, because they do not all treat these as equal.

- Members: (1) lā = genuine negation, praeteritio, 'too obvious to require an oath' — FAIL: not in the four sources; the ʿAʾishah evidence cited for it actually supports member (3); the Ibn Kathir attribution is wrong. (2) lā = emphatic/redundant, fa-lā uqsimu = uqsimu — PASS: al-Tabari from Saʿīd b. Jubayr; al-Jalalayn '﴿فلا أقسم﴾ لا زائدة'. (3) lā negates an implied objection, oath then resumed — PASS: al-Tabari from ahl al-ʿarabiyyah, and this is Ibn Kathir's own position, not a third party's.
- Why: Enumerated against the tafsir report, there are two classical positions here, not three — and the piece's Reading One is misattributed to Ibn Kathir. Ibn Kathir's actual text in the report: 'The usage of La (in Fala) is not an extra character without meaning... Rather it is used at the beginning of an oath WHEN THE OATH IS A NEGATION. This is like when ʿAʾishah said, La by Allah! Allah's Messenger never touched any woman's hand.' Then his gloss: 'No! I swear by the Mawāqiʿ of the stars. THE MATT
- Proposed: Two classical positions sit in the sources, and a third gloss the later grammarians layer onto one of them. I want to give you all three, but I also want to be honest about where the scholars part ways, because they do not all treat these as equal.

**L192 — DOWNGRADE**

> You do not have to adjudicate the grammar to hear that all three converge on the same place. This is not a casual oath. Something unusual is happening before Allah has even told you *what* He is swearing by.

- Members: (1) 'the oath is beneath the matter's dignity' (praeteritio) — FAIL: not in any of the four sources, and where the piece sources it (Ibn Kathir) the position is actually member three. (2) 'the oath is weighted beyond the matter's dignity' — FAIL: al-Jalalayn calls the lā zāʾidah (redundant) and Saʿīd b. Jubayr says fa-lā uqsimu simply means uqsimu; neither says anything about weight, and 'meaningless particle' cannot deliver 'something unusual is happening.' (3) 'the oath is correcting the listener's prior dignity' — PASS: al-Tabari from ahl al-ʿarabiyyah, 'laysa al-amru kamā taqūlūn, thumma u
- Why: The convergence is manufactured at member two. The piece's own summary line 189 renders reading two as 'the oath is *weighted* beyond the matter's dignity' — but that is not what reading two says in the sources. Al-Tabari transmits it from Saʿīd b. Jubayr as flatly as possible: '﴿فلا أقسم﴾ قال: أقسم' — fa-lā uqsimu means uqsimu, full stop, no remainder. Al-Jalalayn states it as a bare grammatical fact: '﴿فلا أقسم﴾ لا زائدة' — the lā is REDUNDANT. A redundant particle adds no weight; it adds noth
- Proposed: You do not have to adjudicate the grammar to hear that readings one and three converge on the same place. This is not a casual oath. (Reading two makes no such claim — on its transmitted sense the particle is simply redundant, which is exactly why Ibn Kathir would not accept it.)

**L202 — DOWNGRADE**

> Three classical readings of this phrase too, and again, all three are alive.

- Members: (1) Astronomical — stars setting, horizon points (masāqiṭ/maghāyib) — PASS, and it is al-Tabari's, Ibn Kathir's, al-Muyassar's and al-Jalalayn's settled reading. (2) Eschatological — stars scattering at the Hour (intithār ʿinda qiyām al-sāʿah, al-Hasan via Qatadah) — PASS as a transmitted qawl. (3) Tanjīm — the staged descent of the Quran (Ibn Abbas, Ikrimah, Mujahid) — PASS as a transmitted qawl, FAIL as 'the one the classical scholars found the deepest' (line 208): al-Tabari explicitly rules against it. UNCOUNTED MEMBER (4) manāzil al-nujūm — the stars' stations (Qatadah via Maʿmar in al-Tab
- Why: Two failures. FIRST, the count is wrong against the piece's own primary source. Al-Tabari on 56:75 lists four aqwāl, each with its own isnād block and each introduced by his standard rival-marker 'wa qāla ākharūn: bal maʿnā dhālika': (i) manāzil al-Qurʾān / nazala nujūman mutafarriqah — the tanjīm reading; (ii) masāqiṭ al-nujūm; (iii) manāzil al-nujūm; (iv) intithār al-nujūm ʿinda qiyām al-sāʿah. The piece silently drops (iii), manāzil al-nujūm — the stations/mansions the stars occupy, which is 
- Proposed: Four classical readings of this phrase sit in al-Tabari; I want to walk you through three of them. But be aware which way the tradition leaned: al-Tabari, Ibn Kathir, al-Muyassar and al-Jalalayn all settle on the first.

**L262 — DOWNGRADE**

> All three are present in every *karīm*.

- Members: PASS: 56:77 qurʾānun karīm; 82:6 rabbika l-karīm; 27:40 ghaniyyun karīm; 12:31 malakun karīm; 44:17 / 69:40 / 81:19 rasūlun karīm; 27:29 kitābun karīm; 8:4, 22:50, 24:26, 34:4 rizqun karīm; 17:23 qawlan karīman. FAIL on 'precious/irreplaceable': 26:7 and 31:10 min kulli zawjin karīm (plant kinds — kulli asserts abundance, the opposite of irreplaceability). FAIL on 'generosity/outflow' AND 'precious': 26:58 and 44:26 maqāmin karīm (Pharaoh's abandoned station); 23:116 al-ʿarsh al-karīm (a Throne does not pour out). FAIL on all three: 44:49 al-ʿazīz al-karīm (sarcasm to the punished — the regist
- Why: As written this is a universal over every Quranic use of karīm, and the corpus breaks it. There are 27 instances of the adjective karīm (lemma كَرِيم). The 'precious / irreplaceable' register fails on several, and 'generosity / outflow' fails on several more. The cleanest counter-member is inside this very surah: 56:44, لَّا بَارِدٍ وَلَا كَرِيمٍ, said of the shade in Hell — karīm under negation, glossed in the tradition as 'not beneficial/pleasant,' where only the benefit register is in play at
- Proposed: All three are present when *karīm* is said of a person.

**L284 — DOWNGRADE**

> All three readings were held by classical mufassirūn, and again, they are layers, not alternatives. The Book is simultaneously on the Preserved Tablet, in angelic hands, and inside the chests of those who love it.

- Members: (1) al-Lawḥ al-Maḥfūẓ — PASS (al-Muyassar names it explicitly). (2) 'The heavenly Mushaf held by the angels above' — PARTIAL/FAIL as a SEPARATE reading: Ibn Abbas's 'al-kitāb alladhī fī al-samāʾ' is the same referent al-Muyassar identifies as the Lawḥ; the report never posits a distinct heavenly muṣḥaf, and the only muṣḥaf in the report is al-Jalalayn's EARTHLY one. (3) 'The hearts of the believers' — FAIL outright: 0 occurrences of قلوب/قلب/صدور/الصدور in the entire cross-reference; no source in Ibn Kathir, al-Tabari, al-Muyassar or al-Jalalayn gives it. UNCOUNTED MEMBER (4) al-Jalalayn: ﴿مكن
- Why: This is the classic member-four failure and it is the worst one in the piece. Member 3 has ZERO support anywhere in the 2,589-line tafsir cross-reference sitting next to the file. Diacritic-stripped search of tafsir-report-075-082.md returns 0 hits for قلوب, 0 for قلب, 0 for صدور, 0 for الصدور. Not one of the four sources glosses kitāb maknūn as the hearts of the believers. Worse, the phrase 'they are layers, not alternatives' invents an ikhtilāf where the tradition records none: al-Tabari gives
- Proposed: The first two are one referent under two names — al-Muyassar calls the hidden Book the Preserved Tablet, Ibn Abbas calls it 'the Book that is in the heaven' — while al-Jalalayn takes maknūn to mean the muṣḥaf itself. The reading that hears it as the hearts of the believers is not in these sources; take it as my own extension, not theirs.

### content/tadabbur/058-al-mujadila/ayah-008.md (3)

**L259 — REFUTED**

> He is the fourth of every two who whisper (58:7) — which means He is in the room when they plot, and He is in the room when *you* break.

- Members: The claim cites 58:7 and enumerates one member: a najwā of TWO, with Allah as the FOURTH. Corpus check of 58:7 (scripts/.corpus-cache/quranic-corpus.json) gives the actual enumeration the ayah performs, member by member: (1) 58:7:15-19 نَّجْوَىٰ ثَلَٰثَةٍ إِلَّا هُوَ رَابِعُهُمْ — najwā of THREE, He is the FOURTH → the only pairing in the ayah that produces the ordinal 'fourth', and its base is three, not two. FAIL for the claim. (2) 58:7:21-24 وَلَا خَمْسَةٍ إِلَّا هُوَ سَادِسُهُمْ — five, He is the sixth. Not two/fourth. FAIL. (3) 58:7:25-33 وَلَآ أَدْنَىٰ مِن ذَٰلِكَ وَلَآ أَكْثَرَ إِلَّا ه
- Why: The ayah cited says the opposite of what is attributed to it: 58:7 pairs THREE with FOURTH (ثَلَٰثَةٍ ... رَابِعُهُمْ). 'Fourth of every two' is wrong under 58:7 and wrong under the well-known hadith parallel as well (Abū Dāwūd's 'I am the THIRD of two partners'). This is not a debatable reading — it is a miscount, and the file itself gets it right twice elsewhere: the frontmatter passage_context (line 13) says "there is no secret counsel of three but Allah is the fourth, no five but He is the s
- Proposed: He is the fourth of every three who whisper (58:7) — which means He is in the room when they plot, and He is in the room when *you* break.

**L281 — REFUTED**

> Each chamber is more private than the last. The verse is walking you down, room by room, toward the most hidden place a human being possesses.

- Members: Not a ledger item, but it is the load-bearing universal underneath ledger item L285, and it fails the enumeration test — so I am reporting it. Three members, in the order the piece assigns them (lines 277-279): (1) OUTER — the najwā, self-labelled "Semi-hidden" (line 277) / "Semi-private" (line 177). Baseline. (2) MIDDLE — the taḥiyyah, self-labelled "Public, but corrupted" (line 278) / "Public" (line 178). FAIL — a greeting spoken openly to the Prophet's face is LESS private than a whisper shared with a chosen few, not more. The transition runs outward, not inward. (3) INNER — the qawl fī anf
- Why: This is the classic pattern the pass exists to catch: the sequence is asserted as monotonic ('each more private than the last', 'walking you down, room by room') while the piece's own adjacent line calls member two 'Public'. The actual movement is private → public → most private: a V, not a descent. The same claim appears verbatim in substance at line 181 ('Each one more hidden than the last') and must be fixed in both places. Importantly, the underlying architecture is NOT broken — the three re
- Proposed: The verse does not move in a straight line — it swings from the whisper shared with a few, out to the greeting spoken in the open, and then all the way in to the thought said to no one at all. It ends at the most hidden place a human being possesses. (And at line 181, replace "Each one more hidden than the last." with "Out to the most public, then in to the most hidden.")

**L317 — REFUTED**

> O Allah, You who are the fourth of every two who whisper and nearer to us than our jugular vein — purify our najwā until it climbs toward Your rescue

- Members: Same single-member enumeration as line 259, now placed in the du'ā where it is spoken to Allah as a description of Him. Member (1) 'najwā of two → Allah is the fourth': FAIL — 58:7:15-19 assigns 'fourth' to a najwā of THREE (نَّجْوَىٰ ثَلَٰثَةٍ إِلَّا هُوَ رَابِعُهُمْ). Member (2) 'five → sixth' (58:7:21-24): not invoked, and does not rescue the claim. Member (3) 'fewer or more → He is with them' (58:7:25-33): covers a pair, but assigns no ordinal at all, so it cannot license 'fourth'. Zero of three members support the phrasing.
- Why: This is the same miscount as line 259 and it is more serious here, because a du'ā addresses Allah by an attribute drawn from His own words — so the error is being prayed. Note that the second half of the same clause, 'nearer to us than our jugular vein', is sound: 50:16 وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ ٱلْوَرِيدِ is quoted correctly at line 247. Only the ordinal is wrong. Both instances (259 and 317) must be fixed together or the file will contradict itself in a new place.
- Proposed: O Allah, You who are the fourth of every three who whisper and nearer to us than our jugular vein — purify our najwā until it climbs toward Your rescue

