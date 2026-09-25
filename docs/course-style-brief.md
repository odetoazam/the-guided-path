# Course rewrite brief — make the prose read like a person, not a model

The founder read the courses and said: "it's very AI. It's trash. It should read and flow
nicely so people with no advanced English can understand, but don't exclude depth."

Your job: rewrite the prose of each module IN PLACE so it reads in the site's article
style: simple, calm, elegant, plain English. Keep every fact. Keep all the depth.
Change only HOW it is said.

## The target register (read this sample first)

The published article `al-baqi-divine-name-quran` (posts table) is an article the founder praised.
Notice: short declarative sentences. Almost no dashes. No suspense, no hype, no
"listen to this". It states what the text says, says who held which view, and moves on.
It is patient and clear and still carries real scholarship. That is the voice.

## What "AI" looks like in these modules — remove ALL of it

1. **Em-dashes as the main punctuation.** Modules have 40-70 per file. Target: zero in
   your prose. Use a full stop, a comma, "which", "so", "because", or brackets.
   (Dashes inside the untouchable blockquote translations do not count.)
2. **Suspense and teasing.** "Keep that sentence; Module 2 lives inside it." "Module 5 is
   about nothing else." "Hold on to two details, because the whole course comes back to
   them." "We will spend a whole module on the order of those words." Replace with one
   plain signpost at most per module: "Module 2 looks at this closely."
3. **Drama fragments.** "Chosen. After." "Not: he rebelled. Not: he schemed." One-word
   sentences for effect. Write ordinary sentences.
4. **Hype and superlatives.** "may be the most humane thing ever said about a human
   being", "astonishing", "the whole course turns on", "the fork on which both courses
   turn", "with no cushioning". Say the plain thing.
5. **Stage directions to the reader.** "Listen to", "watch", "notice", "hold on to",
   "here is the thing", "what matters tonight", "let that land". Cut them. Just say it.
6. **Colon punchlines and rhetorical questions.** "And where did that sentence come from?
   The Baqarah telling gives the astonishing answer:" becomes "Al-Baqarah says where the
   words came from."
7. **Triple stacks and lists for rhythm.** "No name for the woman, no species for the
   tree, no serpent, no inherited guilt" is fine ONCE as content, never as a drumbeat.
8. **Manufactured contrast.** "This is not X. It is Y." / "not X but Y" / "It is not a
   warning. It is an invitation." Delete the denied half unless a reader truly believes
   it or a named source denies it. Just say Y.
9. **Italics for drama.** Keep <em> only for Arabic terms and quoted phrases from the
   verse. Remove <em> and <strong> used for emphasis.
10. **Self-congratulating honesty.** "honestly", "plainly", "we do not get to soften it",
    "faced with the scholars on the table". Just be honest; don't announce it.
11. **Sentences starting with "And" or "But" for rhythm**, every paragraph. Occasional is
    fine. Habitual is a tell.
12. **Academic register.** "glosses" → "explains". "the exegetes" → "the early scholars".
    "adjudicates" → "decides". "the tradition preserves" → "the old books record".
    Grammar jargon: explain it in plain words the first time, then use the plain words.

## What must NOT change — hard rules

- **Every `<blockquote class="ayah-quote">…</blockquote>` block stays byte-for-byte
  identical.** Do not touch the Arabic, the translation, or the cite. A script will
  compare them and reject your file if anything moved.
- **Never type or retype Arabic anywhere.** Inline Arabic words in the prose: keep them
  exactly as they are, or drop a repetition. Never add new Arabic. Never "fix" diacritics.
- **Keep every fact, every named scholar, every guard clause, every "X held Y while Z
  held W".** The depth stays. If a sentence reports a disagreement with named holders,
  the rewrite still names them. Do not add any new claim about what a verse says.
  Do not soften a ruling. Do not merge two views into one.
- **Keep the `<h1>` text exactly.** Keep the top HTML comments. Keep every `<a href>`
  link. Keep the course map `<ul>` at the end of module-0 with the same module titles
  (you may simplify the description after the title).
- **Keep `<h2>` headings** (you may reword one if it is itself hype, but keep the count
  and order).
- **Keep the second-person voice** ("you") where it exists. Keep the module's ending
  on the same point it ended on.
- **Length:** stay within about 15% of the original word count. Do not pad. Do not gut.
  Simple is not short; keep the small connecting words ("so", "which is why", "that
  means") so one sentence leads to the next.
- **Readability targets:** average sentence under 20 words, no sentence over 30 words,
  US grade 6-8. Someone reading on a phone in their second language should never
  have to reread a sentence.
- **Any HTML shape stays the same**: `<p>`, `<h2>`, `<ul>`, `<blockquote>` in the same
  places. Body fragment only, no `<html>` or `<body>`.

## Method (per module)

1. Read the original module fully.
2. Rewrite paragraph by paragraph. For each paragraph ask: what does this actually say?
   Then say that, in plain sentences, in order.
3. Read the result aloud in your head. If it sounds like a trailer, redo it.
4. Write the file back to the same path with the blockquotes untouched.
5. Check: `grep -c '—' <file>` should be tiny (only the blockquote translations).

Report back at the end: for each module, the em-dash count before and after, the word
count before and after, and any place where you were unsure whether a fact survived.

## The guard script used on 2026-09-22

Back up `content/courses/` first, then compare each rewritten file to its backup:
every `<blockquote class="ayah-quote">` byte-identical, no new Arabic tokens, same h1,
no dropped links, same h2 count, length within 20%. The script itself was a scratchpad
file; the rules above are what it checked, and `check:courses` carries the dash gate.

---

# Second pass — make it FLOW (the founder's second note)

The first pass removed dashes and hype, but it chopped the prose into fragments. The
founder quoted this line from the Ādam course:

> They eat. What was promised, immortality and a kingdom that never ends, does not
> arrive. What arrives is exposure.

and wrote how it should read:

> As they eat, none of the immortality arrives. Instead, they start feeling shame, and
> covering themselves with leaves.

His words: "Why is this written in such a disjointed voice? It should be easy to read
for me, and the listener should know what's going on. Not this fancy weird AI style."

**His rewrite is the standard.** Notice what it does: it joins the events into one
natural sentence ("As they eat…"), it uses a plain human word ("shame") instead of an
abstract one ("exposure"), it says what they actually do ("covering themselves with
leaves"), and it uses an ordinary connector ("Instead"). It sounds like a person
telling a friend what happened.

## The voice to write in

Imagine a kind, well-read teacher telling this story to a friend over tea, a friend
who is smart but reads English as a second language and has never studied tafsir.
The teacher does not perform. They just explain clearly, in order, so the listener
always knows who is doing what and why it matters.

- **Sentences flow into each other.** Use "as", "when", "then", "so", "because",
  "but", "instead", "after that", "which is why". A good sentence is often 12 to 25
  words. Short is fine when it is natural. Choppy is not.
- **Plain, concrete words.** Say what people do and feel. "shame" not "exposure".
  "what God told them not to do" not "the prohibition". "the scholars disagreed" not
  "there is a recorded difference".
- **The listener always knows what is going on.** Name who is speaking. Say what
  just happened before saying what it means.

## Patterns to remove everywhere (these are the "AI" tells that remain)

1. **Fragments and staccato.** "They eat." "He is startled." "The house." "You knew."
   "The promotion." Join them into the sentence they belong to.
2. **"What X is Y" sentences.** "What arrives is exposure." "What counts here is his
   exit line." "What he names is a displacement." Say it directly: "His last words
   matter most here."
3. **Mirror pairs for rhythm.** "What was promised … does not arrive. What arrives
   is …" / "Everyone else plots against someone. Heaven plots for someone." Say the
   point once, plainly.
4. **Comma appositives that stall the sentence.** "What was promised, immortality and
   a kingdom that never ends, does not arrive." These came from replacing dashes with
   commas. Rebuild the sentence instead.
5. **Clever metaphors that need decoding.** "God states the policy, and the man who
   lived it countersigns it." "The word runs through the sūrah like a wire." "turns
   the machine inside out." Use a metaphor only if a 14-year-old gets it instantly;
   otherwise say the plain thing.
6. **Abstract nouns doing the work of verbs.** "the descent carries an enmity clause"
   → "when they are sent down, God tells them they will be enemies to one another".
7. **Leftover signposting.** "One note first." "Take them slowly." "One sentence to
   carry in." Just start saying the thing.
8. **Teacherly labels** like "the flagship", "the spine", "the machinery", "the tag".

## Unchanged hard rules (the guard script still enforces them)

- Every `<blockquote class="ayah-quote">` stays byte-identical. Never type Arabic.
  After each Write, splice the original blockquotes back programmatically from the
  backup in a backup of content/courses/ (the Write tool drifts Uthmani text), then run the guard.
- Keep every fact, every named scholar, every "X held this, Y held that", every guard
  clause and limit clause. Depth stays. Add no new claims about what a verse says.
- Keep the h1 text, the top HTML comments, all links, the h2 count and order, the
  course map in module-0 (titles unchanged), and each module's ending point.
- No em-dashes in prose (the course gate fails above 3 per 1000 words).
- Length within about 15% of the current file.
- Ignore the readability checker's grade number. Flowing 20-25 word sentences are
  fine and wanted. Only fix sentences over 35 words.

## The test for every paragraph

Read it aloud. Would someone listening, who has never read this story, follow it
without effort and never feel they are being performed at? If any sentence sounds
like a movie trailer, a tweet, or a riddle, rewrite it as plain storytelling.

---

# Start Here: the WHOLE life, with all the details

The founder, after reading the plain-story pages:

> "Adam's story should be all the way from creation all the way to him dying. That's
> how EACH story should be. You can include some linguistic stuff, but it should be
> written in eloquent yet easy to follow English. Not a lot of commas and complex
> writing style. I noticed it's still there. The point is to learn about the story
> with all the details. You didn't even mention when Adam gave part of his life to
> Dawud because he liked him. You're missing a lot of details."

So the Start Here page (module-0.html) becomes the full life story of this person:
from the beginning (birth, or creation) to the end (death, or the last thing the
sources tell us), in order, with every detail the reliable sources give.

## Sources: what may go in, and how it is labelled

Local full texts (JSON, `{pages:[{text,vol,page}]}`) at `~/turath-corpus/books/<id>.json`:

| id | book | use |
|---|---|---|
| 932 | Ibn Kathīr, Qiṣaṣ al-Anbiyāʾ (from al-Bidāya) | THE SPINE. Follow his order of the life. He grades hadith and flags isrāʾīliyyāt. |
| 735 | Ṣaḥīḥ al-Bukhārī | authentic |
| 1727 | Ṣaḥīḥ Muslim (ʿAbd al-Bāqī) | authentic |
| 7895 | Sunan al-Tirmidhī (ed. Bashshār, with al-Tirmidhī's grading) | use only if graded ṣaḥīḥ or ḥasan |
| 25794 | Musnad Aḥmad (al-Risāla, with al-Arnaʾūṭ's grading in footnotes) | use only if graded ṣaḥīḥ or ḥasan |
| 8473 / 7798 | Tafsīr Ibn Kathīr / al-Ṭabarī | Companion reports and gradings |

Search tip: Arabic has diacritics. Normalize before searching: NFC, strip the
explicit set ًٌٍَُِّْٰٕٓٔـ (never a range), fold أإآ→ا, ى→ي, ة→ه. Search the
normalized text.

**Allowed, in this order of strength:**
1. **The Quran.** Say it as "The Quran says…" or quote the verse.
2. **Authentic hadith.** In al-Bukhārī or Muslim, or graded ṣaḥīḥ/ḥasan by
   al-Tirmidhī, al-Arnaʾūṭ or Ibn Kathīr. Write it as "The Prophet ﷺ said…" and put
   the source in brackets at the end of the sentence or paragraph, like
   (al-Bukhārī) or (al-Tirmidhī, who graded it sound).
3. **Reports from Companions or early scholars** that are not isrāʾīliyyāt. Name who
   said it: "Ibn ʿAbbās said…". Use sparingly, only for real story details.

**Never allowed:**
- Anything Ibn Kathīr (or another source) flags as isrāʾīliyyāt, from the People of
  the Book, or weak/fabricated (ضعيف، منكر، موضوع، لا يصح، من الإسرائيليات،
  أخبار أهل الكتاب). If a famous detail is only in those, you may say in one line:
  "Many popular retellings add X, but it does not come from a reliable source."
- Names, numbers, dates or places no allowed source gives.
- Stating a disputed point as fact. If scholars disagree, one short attributed
  sentence, or leave it out.

**Verify every hadith you use in the actual book text** (Bukhārī/Muslim, or the
graded edition). Record the book id + page for each in an HTML comment at the bottom
of the file, like `<!-- SOURCES: Adam-Dawud 40 years = Tirmidhi 7895 vol5 p.xxx, graded hasan sahih -->`.
Do not rely on memory for any hadith or its grade.

Example of a detail that MUST be in the Ādam page: the Prophet ﷺ said that when God
showed Ādam his descendants, Ādam saw a man whose light he admired. He was told it
was Dāwūd, whose life was sixty years. Ādam asked God to give Dāwūd forty years
from his own life. When the angel of death came, Ādam said forty years of his life
were left. He had forgotten his gift, and his children forget too. (Find it in
al-Tirmidhī, check the grading, and tell it in your own plain words.)

## Writing style

Eloquent yet easy. Think of a gifted storyteller reading aloud to a family.

- **Few commas.** Most sentences have zero or one comma. Never more than two. If a
  sentence needs three commas, it is two sentences.
- **One idea per sentence, but connected.** Use "so", "then", "but", "when",
  "because", "after that" to lead from one sentence to the next. Not choppy. Not
  fragments.
- **No stacked clauses, no asides, no brackets in the middle of a sentence.**
  Source brackets go at the end.
- **Plain concrete words.** Say what people did, said and felt.
- **No dashes. No "What X is Y". No mirror pairs. No stage directions ("notice",
  "listen"). No hype.**
- **Some linguistic insight is welcome**, but only two or three small moments on the
  whole page, each one or two sentences, and only where it makes the story richer.
  Give the Arabic word in simple transliteration with its meaning.

Model sentence (the founder's own): "As they eat, none of the immortality arrives.
Instead, they start feeling shame, and covering themselves with leaves."

## Structure

- Keep the h1 and the top HTML comments. Add a comment line: "2026-09-24: rebuilt as
  the full life story (Quran + authentic hadith), per Azam."
- Open with two or three sentences: this is the whole life of X, from the Quran and
  the authentic sayings of the Prophet ﷺ, told in order.
- Chronological sections with short plain h2 headings, from beginning to end.
- End with his or her death, or what the sources say about the end. If no reliable
  source describes the death, say so in one sentence.
- Then the course map `<ul>` (same module titles, one plain sentence each) and one
  closing line.
- Length: as long as the life needs. Probably 2,000 to 3,500 words. Every paragraph
  must carry story, not commentary.

## Verses and Arabic (hard rules)

- **Never type Arabic.** No Arabic script in the prose at all. Hadith go in English
  only.
- You may keep the page's existing verse blockquotes (byte-identical: splice them from
  the current file, never retype) and you may add new ones. For a new one, write:
  ```html
  <blockquote class="ayah-quote">
    <p class="arabic" data-ayah="S:A" dir="rtl">@@ARABIC@@</p>
    <p class="translation">"…English…"</p>
    <cite>Sūrah Name (S:A)</cite>
  </blockquote>
  ```
  then run `node /Users/azamkhan/the-guided-path/scripts/fill-ayah-placeholders.mjs <file>`.
  Whole ayahs only. Keep verse blockquotes to about 8 or fewer; tell the rest in prose.
- Method: save a backup of the current file in the scratchpad first. Write the draft
  with @@BQ0@@… placeholders for kept blockquotes, splice them programmatically, then
  fill new @@ARABIC@@ placeholders with the script.

## Checks before you finish

1. `node /Users/azamkhan/the-guided-path/scripts/verify-courses.mjs` must not list
   your file.
2. `node /Users/azamkhan/the-guided-path/scripts/verify_readability.mjs <file>`: fix
   any sentence over 30 words. Ignore the length warning.
3. Count sentences with three or more commas in your prose. Target zero.
4. Fact pass: for every sentence that says what a verse or hadith says, re-check it
   against the text. Cut anything you cannot source.

Only edit your course's module-0.html. No git. Report: word count, the list of
hadith/reports used with book id, page and grade, anything famous you deliberately
left out and why, and any fact you were unsure of.
