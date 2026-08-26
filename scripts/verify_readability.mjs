#!/usr/bin/env node
/**
 * Readability gate for AyahGuide articles.
 *
 * WHY THIS EXISTS. Azam gave the plain-language instruction on 2026-07-17. It was
 * saved to memory and never reached the pipeline, so 236 articles were written
 * under a voice framework that told the writer to channel Guy Davenport, John
 * Berger and Maggie Nelson — literary essayists. On 2026-08-13 he read a live
 * article and said, plainly, that it was too complex. A rule nobody measures is a
 * rule that quietly stops applying. This is the measurement.
 *
 * It scores the article's ENGLISH PROSE ONLY. Arabic blockquotes, translations,
 * citations and HTML comments are stripped first — the Quran's own language is
 * not the thing being simplified, and counting it would punish exactly the
 * articles that quote most carefully.
 *
 * Thresholds are calibrated against the corpus as it stood on 2026-08-13
 * (median grade 8.8, median reading ease 60.7) and against five hand-rewrites
 * that landed at grade 6.9 / ease 72.2. A validator that fails half the corpus
 * is a validator nobody runs, so FAIL is set where prose is genuinely academic
 * rather than merely careful.
 *
 *   node scripts/verify_readability.mjs <file.html>      # one file
 *   node scripts/verify_readability.mjs --db             # every published article
 *   node scripts/verify_readability.mjs --db --quiet     # failures only
 */
import fs from 'node:fs'

// ⚠️ RECALIBRATED 2026-08-15. proseOf() used to collapse `</li>` and `</p>` to a
// space, so a five-bullet <ul> scored as ONE 117-word sentence. Fixing that dropped
// the corpus median grade 8.2 -> 7.5 and ease 66.6 -> 68.7 — the prose had always
// been easier than the checker said. Thresholds were tightened by the same 0.7 so
// the gate is no more permissive than the day it was calibrated against the five
// hand-rewrites (6.9 / 72.2). A bug fix that silently loosens a gate is a
// regression wearing a green tick.
const FAIL_GRADE = 9.3   // Flesch-Kincaid grade level
const WARN_GRADE = 7.8
const FAIL_EASE = 55.0    // Flesch reading ease
const LONG_SENTENCE = 35  // words

// -- DENSITY, not just sentence length (Azam, Aug 20 2026) -------------------
// Azam: "lets just keep the writing simple... the people reading these articles
// wont be academics." The articles he flagged ALL PASSED this gate on grade and
// ease. Measured across the 40 most recent: scholar-name density had DOUBLED,
// 2.5 -> 4.9 per 1000 words, while average sentence length went DOWN, 18 -> 17.
// That is the shape of the failure - chopping sentences to satisfy the grade
// check produced prose that is terse AND dense: a literature survey in short
// words. The articles he praised (al-baqi, al-warith, al-muhaymin, al-khaliq)
// name ZERO scholars. So density gets measured too.
const WARN_SCHOLARS = 4.0   // named commentators per 1000 words
const FAIL_SCHOLARS = 7.0

// -- LENS-AWARE THRESHOLD (2026-08-22) ---------------------------------------
// The density rule above was calibrated on a corpus that was 104/284 word-study
// articles, where a scholar name is decoration and stacking them is the defect.
// It cannot be met by a NAMED-IKHTILAF article, where the holders ARE the
// content and Critical Rule 7 REQUIRES naming who held which reading. Measured
// the day the pipeline skill was fixed: isa-cradle 8.5, fatiha-iltifat 8.9,
// sulayman-death-readings 13.2, ibrahim-fire-causality 15.0 - every non-lexical
// article failing, none for a real defect. 66 of 329 articles trip 4.0.
// Raising the bar globally would lose the real signal, so the article DECLARES
// its lens and gets judged against it:
//     <!-- lens: named-ikhtilaf -->
// Only the dispute lenses get the higher bar. A word study cannot claim it
// without lying in a marker that sits in the file next to the prose.
const DISPUTE_LENSES = ['named-ikhtilaf', 'contested-doorway', 'qiraat-variant', 'grammar-reveal']
const WARN_SCHOLARS_DISPUTE = 10.0
const FAIL_SCHOLARS_DISPUTE = 15.0
const lensOf = (html) => (html.match(/<!--\s*lens:\s*([a-z-]+)\s*-->/i) || [, ''])[1].toLowerCase()
const isDispute = (html) => DISPUTE_LENSES.includes(lensOf(html))
// Length is WARN-only and never FAIL. Calibration across all 429 pages: scholar
// density is a sharp signal (p50 0.0, p75 0.3, p90 2.2, p95 4.1 - so >4 really is
// the outlier tail, 26 pages, and >7 is 10 pages). Word count is NOT sharp,
// because the 114 SURAH pages are long by design and 136 of them would have
// failed a 1800-word rule. Length here is a nudge for a NEW article, not a
// verdict on the corpus - expect the --db sweep to warn on surah pages.
const WARN_WORDS = 1300     // past this an ARTICLE is a survey, not an explainer

/** Named commentators. Density of these = "who said what" scaffolding. */
const SCHOLARS = /\b(al-Zamakhshari|al-Razi|al-Qurtubi|al-Tabari|al-Baghawi|al-Alusi|al-Raghib|al-Ghazali|al-Nahhas|an-Nahhas|al-Mahdawi|al-Zajjaj|al-Wahidi|al-Suddi|al-Jalalayn|al-Sa.?.?adi|as-Sa.?.?adi|al-Sa.?di|as-Sa.?di|Ibn .?Ashur|Ibn Kathir|Ibn al-Qayyim|Ibn Jurayj|Ibn Zayd|Ibn Taymiyya|Mujahid|Qatadah|Ikrimah?)\b/gi

/** Arabic technical terms. Load-bearing once; a tic when repeated untranslated. */
const ARABIC_TERMS = /\b(iltifat|iltifaat|qasr|damir al-fasl|badal|majaz|zarf|masdar|tamyiz|wujuh|hadhf|taqdim|mubtada|isnad|nazm|balagha|balaghah)\b/gi

/** Terms that must be explained in plain words on first use, or dropped. */
const JARGON = [
  'morpholog', 'iʿrab', "i'rab", 'quadriliteral', 'triliteral', 'semantic field',
  'syntactic', 'lexical', 'epistem', 'ontolog', 'hermeneut', 'paradigmatic',
  'apodosis', 'protasis', 'anaphor', 'deictic', 'polysem', 'valence', 'cognate',
]

/** Fancy words with plain equivalents — the "eloquence budget" leak. */
const FANCY = {
  employ: 'use', utilise: 'use', utilize: 'use', demonstrate: 'show',
  commence: 'start', endeavour: 'try', endeavor: 'try', ascertain: 'find out',
  elucidate: 'explain', constitutes: 'is', comprises: 'is made of',
  facilitates: 'helps', necessitates: 'needs', predicated: 'based',
  efficacy: 'how well it works', apparatus: 'the setup', concerning: 'about',
  regarding: 'about', myriad: 'many', plethora: 'plenty', juxtapose: 'set side by side',
}

export function proseOf(html) {
  return html
    .replace(/<blockquote[\s\S]*?<\/blockquote>/g, ' ')  // Arabic + translation + cite
    .replace(/<!--[\s\S]*?-->/g, ' ')                    // morphology/link tags
    // Block edges END a sentence. Without this, `</li>` and `</p>` collapse to a
    // space and a whole <ul> is scored as ONE sentence — al-mutaffifin showed a
    // "117-word sentence" that was really five bullet points. Same class of bug as
    // the inline-Arabic one below: the checker was measuring its own markup
    // handling, not the prose.
    .replace(/<\/(?:li|p|h1|h2|h3|h4|div|section|td|th)>/gi, '. ')
    .replace(/<(?:br|hr)\b[^>]*>/gi, '. ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\.\s*\./g, '.')
    // Named AND numeric entities. `&[a-z]+;` alone left `&#39;` in the prose on
    // 113 pages — 8,354 leaked tokens, each scored as a word with syllables, which
    // inflated the grade AND broke verify_voice's subject-window regex so that real
    // flips read as clean. Decode apostrophes/quotes to their characters so words
    // like "Allah's" stay one word; map the rest to a space.
    .replace(/&#(?:39|8217);/g, "'")
    .replace(/&#(?:34|8220|8221);/g, '"')
    .replace(/&(?:rsquo|lsquo|apos);/g, "'")
    .replace(/&(?:ldquo|rdquo|quot);/g, '"')
    .replace(/&#?[a-z0-9]+;/gi, ' ')
    // Inline Arabic inside a paragraph is quoted scripture, not the writer's
    // English. Left in, it inflates the word count of any sentence that quotes
    // carefully — the first run of this checker flagged well-written sentences
    // as "over 35 words" purely because they contained an ayah fragment.
    .replace(/[؀-ۿݐ-ݿﭐ-﷿ﹰ-ﻼ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!w) return 0
  let n = 0, prevVowel = false
  for (const c of w) {
    const isVowel = 'aeiouy'.includes(c)
    if (isVowel && !prevVowel) n++
    prevVowel = isVowel
  }
  if (w.endsWith('e') && n > 1) n--
  return Math.max(1, n)
}

export function score(html) {
  const text = proseOf(html)
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.split(/\s+/).length > 2)
  const words = text.match(/[A-Za-z'’]+/g) || []
  if (!sentences.length || words.length < 100) return null

  const asl = words.length / sentences.length
  const spw = words.reduce((a, w) => a + syllables(w), 0) / words.length
  const grade = 0.39 * asl + 11.8 * spw - 15.59
  const ease = 206.835 - 1.015 * asl - 84.6 * spw

  const longSentences = sentences
    .filter((s) => s.split(/\s+/).length > LONG_SENTENCE)
    .map((s) => s.split(/\s+/).slice(0, 12).join(' ') + '…')

  const lower = text.toLowerCase()
  const jargon = JARGON.filter((j) => lower.includes(j))
  const fancy = Object.keys(FANCY).filter((f) => new RegExp(`\\b${f}`, 'i').test(text))

  const scholarHits = text.match(SCHOLARS) || []
  const scholars = (scholarHits.length / words.length) * 1000
  const dispute = isDispute(html)
  const termHits = text.match(ARABIC_TERMS) || []
  const terms = (termHits.length / words.length) * 1000

  return { grade, ease, asl, words: words.length, longSentences, jargon, fancy,
           scholars, scholarNames: [...new Set(scholarHits)], terms, dispute,
           termNames: [...new Set(termHits.map((t) => t.toLowerCase()))] }
}

const warnSch = (s) => (s.dispute ? WARN_SCHOLARS_DISPUTE : WARN_SCHOLARS)
const failSch = (s) => (s.dispute ? FAIL_SCHOLARS_DISPUTE : FAIL_SCHOLARS)

function verdict(s) {
  if (s.grade > FAIL_GRADE || s.ease < FAIL_EASE) return 'FAIL'
  if (s.scholars > failSch(s)) return 'FAIL'
  if (s.grade > WARN_GRADE || s.longSentences.length > 2 || s.jargon.length) return 'WARN'
  if (s.scholars > warnSch(s) || s.words > WARN_WORDS || s.terms > 1.5) return 'WARN'
  return 'PASS'
}

function report(name, s, quiet) {
  const v = verdict(s)
  if (quiet && v === 'PASS') return v
  const icon = v === 'FAIL' ? '❌' : v === 'WARN' ? '⚠️ ' : '✅'
  console.log(`${icon} ${v.padEnd(4)} grade ${s.grade.toFixed(1).padStart(4)}  ease ${s.ease.toFixed(1).padStart(5)}  ${String(s.words).padStart(4)}w  sch/1k ${s.scholars.toFixed(1).padStart(4)}  ${name}`)
  if (v !== 'PASS') {
    if (s.longSentences.length) console.log(`        ${s.longSentences.length} sentence(s) over ${LONG_SENTENCE} words — split them:`)
    for (const l of s.longSentences.slice(0, 3)) console.log(`          "${l}"`)
    if (s.jargon.length) console.log(`        explain in plain words on first use, or drop: ${s.jargon.join(', ')}`)
    if (s.fancy.length) console.log(`        plainer word available: ${s.fancy.map((f) => `${f} → ${FANCY[f]}`).join('; ')}`)
    if (s.scholars > warnSch(s)) console.log(`        ${s.scholars.toFixed(1)} scholar names per 1000 words (aim under ${warnSch(s)}${s.dispute ? ', dispute lens' : ''}): ${s.scholarNames.join(', ')}`)
    if (s.scholars > warnSch(s)) console.log('          Lead with the FINDING; attribute once. Do not narrate who said what in turn.')
    if (s.words > WARN_WORDS) console.log(`        ${s.words} words (aim under ${WARN_WORDS}) - an explainer, not a survey. Cut a section.`)
    if (s.terms > 1.5) console.log(`        Arabic technical terms ${s.terms.toFixed(1)}x per 1000 words: ${s.termNames.join(', ')} - name it once in plain English, then use plain words.`)
  }
  return v
}

// Only run the CLI when invoked directly — `score`/`proseOf` are imported by
// other scripts, and a bare import used to trip the usage message and exit(2).
const RUN_CLI = process.argv[1] && import.meta.url === `file://${process.argv[1]}`

const args = process.argv.slice(2)
const quiet = args.includes('--quiet')

if (!RUN_CLI) {
  // imported as a module — stop here
} else {

if (args.includes('--db')) {
  const { createClient } = await import('@supabase/supabase-js')
  const env = Object.fromEntries(
    fs.readFileSync('.env.local', 'utf8').split('\n')
      .filter((l) => l.includes('=') && !l.startsWith('#'))
      .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')] })
  )
  const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
  const { data } = await sb.from('posts').select('slug, content_html').eq('status', 'published')
  // ⚠️ This used to filter `.eq('type','article')`, so the 114 SURAH pages were
  // never scored — 117 reader-facing pages with a median grade of 9.1 against the
  // articles' 7.5, and 48 of them failing. A gate that silently excludes half the
  // corpus reports a clean number about the half it chose to look at.
  const counts = { PASS: 0, WARN: 0, FAIL: 0 }
  const scored = data.map((p) => ({ slug: p.slug, s: score(p.content_html) })).filter((x) => x.s)
  scored.sort((a, b) => b.s.grade - a.s.grade)
  for (const { slug, s } of scored) counts[report(slug, s, quiet)]++
  const median = (k) => scored.map((x) => x.s[k]).sort((a, b) => a - b)[Math.floor(scored.length / 2)]
  console.log(`\n── ${scored.length} articles — median grade ${median('grade').toFixed(1)}, median ease ${median('ease').toFixed(1)}`)
  console.log(`   ✅ ${counts.PASS} pass   ⚠️  ${counts.WARN} warn   ❌ ${counts.FAIL} fail`)
  process.exit(counts.FAIL > 0 ? 1 : 0)
}

if (!args.length) {
  console.error('usage: verify_readability.mjs <file.html> | --db [--quiet]')
  process.exit(2)
}
let failed = 0
for (const f of args.filter((a) => !a.startsWith('--'))) {
  const s = score(fs.readFileSync(f, 'utf8'))
  if (!s) { console.log(`—      too short to score: ${f}`); continue }
  if (report(f, s, quiet) === 'FAIL') failed++
}
process.exit(failed ? 1 : 0)
}
