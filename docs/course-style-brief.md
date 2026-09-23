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
