#!/usr/bin/env node
/**
 * Voice gate for AyahGuide articles — the anti-antithesis check.
 *
 * WHY THIS EXISTS. On 2026-08-15 Azam read a live article and flagged this
 * sentence: "This is not a modern observation or a gotcha. It is a recorded
 * disagreement." He said the writing sounds like AI-generated posts on Twitter.
 * A scan found the construction in 62% of published pages, 711 instances, one
 * article using it 21 times.
 *
 * It survived because `verify_readability.mjs` measures sentence LENGTH and
 * SYLLABLES. "This is not X. It is Y." is short and plain — it scores well. The
 * existing gate could not see it. This is the same lesson as the readability
 * rewrite, one layer up: a rule nobody measures is a rule that stops applying,
 * and a gate only catches what it was built to look for.
 *
 * WHAT IT LOOKS FOR. Negation used to manufacture contrast — you deny something
 * plausible, then assert your point, and the reader feels corrected without
 * being told anything new. It is the cheapest way to make a paragraph feel like
 * it lands. Legitimate factual negation ("not one of them is a verb") is NOT the
 * target and is scored separately as `soft`.
 *
 * Scores ENGLISH PROSE ONLY — reuses proseOf() from verify_readability so Arabic
 * blockquotes and inline ayah fragments are stripped identically.
 *
 *   node scripts/verify_voice.mjs <file.html|md>
 *   node scripts/verify_voice.mjs --db          # every published post
 *   node scripts/verify_voice.mjs --db --quiet  # summary + failures only
 */
import fs from 'node:fs'
import { proseOf } from './verify_readability.mjs'

// HARD: near-always the tic. The sentence stages a reversal instead of stating.
export const HARD = [
  // Subject may be a PRONOUN or a NOUN PHRASE. The pronoun-only version of this
  // pattern shipped first and undercounted: "Gratitude is not a feeling. It is
  // conduct." scored clean. A rewrite agent found those by hand, which is the
  // same lesson this file was written for — a gate only catches what it looks for.
  // Four blind spots were found here IN SEQUENCE, every one by a rewrite agent and
  // none by me: (1) pronoun-only subjects, (2) a subject behind a leading comma
  // clause, (3) a second sentence whose verb is not a be-verb, (4) a subject
  // window capped at five words. Each fix raised the true count. A CLEAN RESULT
  // IS A HYPOTHESIS ABOUT THE CHECKER, exactly as a flag is.
  ['flip-two-sentence', /(?:^|[.!?]\s+|["“]\s*|§\s*)(?:[A-Z][^.!?\u00a7]{0,60},\s+)?[A-Za-z][\w'’-]*(?:\s+[\w'’-]+){0,8}\s+(?:is|was|are|were)\s+not\s+[^.!?\u00a7]{3,90}[.!?]\s+(?:It|That|This|He|She|They|[A-Z][\w'’-]*(?:\s+[\w'’-]+){0,4})\s+(?:is|was|are|were|belongs?|comes?|means?|does|stands?|runs?|remains?|becomes?|carries|points?|works?|lies|sits)\b/g],
  ['flip-dash',         /\b(?:is|was|are|were)\s+not\s+[^.!?—\u00a7]{3,70}\s+—\s+(?:it|that|this|they|[a-z]+)\s+(?:is|was|are|were)\b/gi],
  ['flip-comma',        /\b(?:is|was|are|were)\s+not\s+[^.!?\u00a7]{3,70},\s+(?:it'?s|it\s+is)\b/gi],
  ['not-just-but',      /\bnot\s+(?:just|only|merely|simply)\s+[^.!?\u00a7]{2,70}\bbut\b/gi],
  ['not-about',         /\b(?:is|was)\s+not\s+about\s+[^.!?\u00a7]{2,60}[.,—]\s*(?:it|It)\s+(?:is|was)\s+about\b/g],
  // The absence litany: three or more consecutive sentences opened with Not/No,
  // listing what a passage LACKS to make what it has feel weighty. Naming an
  // omission is real analysis; the drumbeat of three is the tic. Collapse to one
  // sentence and keep every fact.
  ['absence-litany',    /\b(?:Not|No)\s+[^.!?\u00a7]{2,45}[.!?]\s+(?:Not|No)\s+[^.!?\u00a7]{2,45}[.!?]\s+(?:Not|No)\s+[^.!?\u00a7]{2,45}[.!?]/g],
  ['no-x-no-y-no-z',    /\bNo\s+\w+,\s+no\s+\w+,\s+no\s+\w+/g],
]
// SOFT: often legitimate. Counted, reported, never fails a build on its own.
export const SOFT = [
  ['fragment-negation', /[.!?]\s+Not\s+[a-z][^.!?\u00a7]{2,60}[.!?]/g],
  ['not-x-but-y',       /\b(?:is|was|are|were)\s+not\s+[^.!?]{3,60}\s+but\s+(?:rather\s+)?/gi],
  ['not-so-much-as',    /\bnot\s+so\s+much\s+[^.!?\u00a7]{2,60}\bas\b/gi],
]

// Quoted revelation and quoted scholars are OFF LIMITS to a style edit. 19:28's
// "your father was not a bad man, and your mother was not unchaste" is a
// translation of the ayah; "It is not poetry, it is not sorcery" is Utbah ibn
// Rabiah speaking. Flagging those would invite an agent to rewrite scripture for
// tone. Strip every quote container before scoring.
export function stripQuoted(html) {
  return String(html)
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')
    .replace(/<p[^>]*class="[^"]*translation[^"]*"[\s\S]*?<\/p>/gi, ' ')
    .replace(/<cite[\s\S]*?<\/cite>/gi, ' ')
}

export function scan(html) {
  // Block boundaries must stop a match. proseOf() strips tags, which glued the end
  // of one paragraph to the start of the next and produced ~20 phantom "flips" that
  // a triage agent had to reject by hand. Insert a sentinel at every block edge and
  // forbid it inside the patterns.
  const withBreaks = stripQuoted(html)
    .replace(/<\/(?:p|h1|h2|h3|h4|li|ul|ol|div|blockquote|section)>/gi, ' \u00a7 ')
    .replace(/<(?:h1|h2|h3|h4|hr|br)\b[^>]*>/gi, ' \u00a7 ')
  const prose = proseOf(withBreaks)
  const words = prose.split(/\s+/).filter(Boolean).length || 1
  const grab = (set) => set.flatMap(([name, re]) => {
    re.lastIndex = 0
    return (prose.match(re) || []).map(t => ({ name, text: t.trim().replace(/\s+/g, ' ') }))
  })
  const hard = grab(HARD), soft = grab(SOFT)
  return { words, hard, soft, hardPer1k: +(1000 * hard.length / words).toFixed(2) }
}

// Calibrated against the corpus on 2026-08-15 (see --db output at build time).
export function verdict(s) {
  if (s.hard.length >= 5 || s.hardPer1k > 2.0) return 'FAIL'
  if (s.hard.length >= 2 || s.hardPer1k > 0.9) return 'WARN'
  return 'PASS'
}

// Only run the CLI when invoked directly — this module is imported by the
// rewrite tooling, and an unguarded argv parse made `import { scan }` exit(2).
// ── Self-test ────────────────────────────────────────────────────────────────
// This gate was wrong FOUR times before it was right, and every fault was found
// by a human/agent reading output rather than by the gate itself. These cases are
// the record of each fix. Run `node scripts/verify_voice.mjs --selftest` after any
// pattern change; a clean corpus scan means nothing if the patterns have drifted.
export const CASES = [
  [true,  'same-paragraph flip',      '<p>This is not a threat. This is a mercy.</p>'],
  [true,  'noun subject',             '<p>Gratitude is not a feeling. It is conduct.</p>'],
  [true,  'subject behind a comma',   '<p>At the same time, righteous action is not an ornament. It is belief becoming legible.</p>'],
  [true,  'non-be verb in 2nd half',  '<p>The calf is not only a lapse. It belongs to a pattern.</p>'],
  [true,  'absence litany of three',  '<p>No command. No promise. No consolation.</p>'],
  [true,  'flip opening a paragraph',  '<p>Something else entirely.</p><p>The test is not complex. It is simple.</p>'],
  [true,  'flip as the very first text','<p>The most repeated phrase is not a command. It is a description.</p>'],
  [false, 'phantom across paragraphs','<p>He named the one community that was not destroyed.</p><p>The surah is short.</p>'],
  [false, 'phantom across a heading', '<p>The two verses are not the same</p><h2>Where they differ</h2><p>Put them side by side.</p>'],
  [false, 'quoted verse translation', '<blockquote><p class="translation">your father was not a bad man. He was righteous.</p></blockquote>'],
  [false, 'already merged, semicolon','<p>The phrase was not ignorance; it was an acknowledgment.</p>'],
]

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
const args = process.argv.slice(2)
const quiet = args.includes('--quiet')
if (!isMain) { /* imported: skip CLI */ }

if (isMain && args.includes('--selftest')) {
  let bad = 0
  for (const [want, label, html] of CASES) {
    const got = scan(html).hard.length > 0
    if (got !== want) { bad++; console.log(`  ❌ ${label}: expected ${want ? 'FLAG' : 'clean'}, got ${got ? 'FLAG' : 'clean'}`) }
    else console.log(`  ✅ ${label}`)
  }
  console.log(bad ? `\n${bad} self-test failure(s)` : `\nall ${CASES.length} self-tests pass`)
  process.exit(bad ? 1 : 0)
}

if (isMain && args.includes('--db')) {
  const { createClient } = await import('@supabase/supabase-js')
  const dotenv = await import('dotenv')
  dotenv.config({ path: '.env.local' })
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const rows = []
  for (let f = 0; ; f += 500) {
    const { data, error } = await sb.from('posts').select('slug,type,content_html').eq('status', 'published').range(f, f + 499)
    if (error) { console.error(error.message); process.exit(2) }
    rows.push(...data); if (data.length < 500) break
  }
  const scored = rows.map(r => ({ slug: r.slug, type: r.type, ...scan(r.content_html || '') }))
    .map(s => ({ ...s, v: verdict(s) }))
  const tally = { PASS: 0, WARN: 0, FAIL: 0 }
  scored.forEach(s => tally[s.v]++)
  const totalHard = scored.reduce((a, b) => a + b.hard.length, 0)
  const totalSoft = scored.reduce((a, b) => a + b.soft.length, 0)
  console.log(`\nscanned ${rows.length} published posts`)
  console.log(`  PASS ${tally.PASS}   WARN ${tally.WARN}   FAIL ${tally.FAIL}`)
  console.log(`  hard rhetorical flips: ${totalHard}   softer negations: ${totalSoft}`)
  const fails = scored.filter(s => s.v === 'FAIL').sort((a, b) => b.hard.length - a.hard.length)
  console.log(`\nFAIL list (${fails.length}):`)
  for (const f of fails) console.log(`  ${String(f.hard.length).padStart(2)} hard  ${String(f.hardPer1k).padStart(5)}/1k  ${f.slug}`)
  if (!quiet) {
    const byPat = {}
    scored.forEach(s => s.hard.forEach(h => byPat[h.name] = (byPat[h.name] || 0) + 1))
    console.log('\nhard patterns:'); Object.entries(byPat).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(20)} ${v}`))
  }
  fs.writeFileSync('scripts/.voice-report.json', JSON.stringify(scored, null, 2))
  process.exit(tally.FAIL > 0 ? 1 : 0)
}

const file = isMain ? args.find(a => !a.startsWith('--')) : null
if (isMain && !file) { console.error('usage: verify_voice.mjs <file> | --db'); process.exit(2) }
if (isMain) {
const s = scan(fs.readFileSync(file, 'utf8'))
const v = verdict(s)
console.log(`\n${file}`)
console.log(`  words ${s.words} · hard flips ${s.hard.length} (${s.hardPer1k}/1k) · soft ${s.soft.length}`)
for (const h of s.hard) console.log(`  ⛔ [${h.name}] ${h.text.slice(0, 120)}`)
if (!quiet) for (const h of s.soft) console.log(`  ·  [${h.name}] ${h.text.slice(0, 100)}`)
console.log(`  ${v === 'PASS' ? '✅' : v === 'WARN' ? '⚠️ ' : '❌'} ${v}`)
process.exit(v === 'FAIL' ? 1 : 0)
}
