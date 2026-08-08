#!/usr/bin/env node
/**
 * verify_claims.mjs — Validator #4: falsifiable-claim verification.
 *
 *   node scripts/verify_claims.mjs <file.md|file.tsx> [--surah N] [--ayahs A-B] [--json] [--strict]
 *
 * WHY THIS EXISTS. The three existing validators check Arabic quotes, morphology
 * tags, and tafsir alignment. None of them checks the *prose's* falsifiable
 * claims — "this root appears three times in this ayah", "the word Allah never
 * appears in this surah", "the only place in the Quran where..." — and that is
 * exactly the class of error that has shipped: the divine-names count bug
 * (lemma vs spelling), and the "all four" overclaims of the Aug 2026 audit,
 * all of which passed every existing validator.
 *
 * DESIGN: precision over recall, two tiers.
 *
 *   Tier A (auto-verified): claims where a subject (Arabic token or dashed
 *   transliterated root) and a scope (this ayah / this surah / the Quran) can
 *   be resolved. Checked against the corpus THREE ways — root, lemma, exact
 *   surface form — because the divine-names incident proved the three diverge
 *   and prose rarely says which it means. PASS if any interpretation at the
 *   stated scope matches (the report names which one); FAIL if none does.
 *   Only Tier A failures set a non-zero exit code.
 *
 *   Tier B (ledger): claims the script can see but not resolve — universal
 *   quantifiers ("all four stories..."), English-only subjects, pairing
 *   claims, vague counts. These are NOT failures; they are printed as a
 *   worklist for the Refutation Pass, which must rule on each one by name.
 *
 * Inline tags (optional, same line or the line above the claim):
 *   <!-- claim:ok [reason] -->                 hand-verified; reported as MANUAL
 *   <!-- claim:subject=سوء scope=surah -->     disambiguate subject/scope
 *     scope = ayah | surah | quran
 */
import fs from 'fs'
import path from 'path'

const CORPUS_PATH = new URL('./.corpus-cache/quranic-corpus.json', import.meta.url).pathname
if (!fs.existsSync(CORPUS_PATH)) {
  console.error(`Corpus cache not found at ${CORPUS_PATH}. Run verify_morphology.mjs --setup first.`)
  process.exit(2)
}
const corpus = JSON.parse(fs.readFileSync(CORPUS_PATH, 'utf8'))

// ── CLI ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))
const flag = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : null
}
const asJson = args.includes('--json')
const strict = args.includes('--strict')
if (!file) {
  console.error('Usage: node scripts/verify_claims.mjs <file> [--surah N] [--ayahs A-B] [--json] [--strict]')
  process.exit(2)
}
const text = fs.readFileSync(file, 'utf8')

// ── Scope inference: which surah/ayahs does this file cover? ──────────────
function inferScope() {
  let surah = flag('surah') ? parseInt(flag('surah'), 10) : null
  let range = null
  if (flag('ayahs')) {
    const m = flag('ayahs').match(/^(\d+)(?:-(\d+))?$/)
    if (m) range = [parseInt(m[1], 10), parseInt(m[2] || m[1], 10)]
  }
  if (!surah) {
    // tadabbur path: content/tadabbur/006-al-anam/ayahs-042-045.md
    const p = file.match(/(\d{3})-[^/]+\/ayahs?-(\d{3})(?:-(\d{3}))?\.md$/)
    if (p) {
      surah = parseInt(p[1], 10)
      range = [parseInt(p[2], 10), parseInt(p[3] || p[2], 10)]
    }
  }
  if (!surah) {
    // SURAH_DATA in a visual .tsx
    const m = text.match(/number:\s*(\d+)/)
    if (m) surah = parseInt(m[1], 10)
  }
  return { surah, range }
}
const fileScope = inferScope()

// ── Arabic normalization (same family as audit-divine-name-counts.mjs) ────
const norm = (x) => (x || '').normalize('NFC')
  .replace(/[ً-ْٰـ۟-ۯۖ-۝]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/ٮ/g, 'ب')
  .trim()
const stripAl = (x) => x.replace(/^ال/, '')
// Proclitic particles attach directly to the word (بِأَنفُسِهِنَّ = بِ + أَنفُسِهِنَّ).
// Prose counts those as the same word; the corpus spelling does not. Compare both.
const stripClitics = (x) => x.replace(/^(?:[وف])?(?:[بكل])?(?:ال)?/, '')
// Hamza carriers differ between prose and corpus spelling (prose سوء, corpus
// root سوأ). Compare via variant sets: two tokens match if their variant sets
// intersect.
const variants = (x) => {
  const n = norm(x)
  const set = new Set([n, n.replace(/[ءؤئ]/g, 'ا'), n.replace(/[ءؤئ]/g, '')])
  // case-ending alef (رغدًا → رغدا): let the bare stem match the root too
  if (n.endsWith('ا')) set.add(n.slice(0, -1))
  return set
}
const matches = (a, b) => {
  if (!a || !b) return false
  for (const v of variants(a)) if (variants(b).has(v)) return true
  return false
}

// ── Corpus counting: root / lemma / surface at a given scope ──────────────
function* keysInScope(scope) {
  if (scope.kind === 'quran') { yield* Object.keys(corpus); return }
  for (const k of Object.keys(corpus)) {
    const [s, a] = k.split(':').map(Number)
    if (s !== scope.surah) continue
    if (scope.kind === 'ayah' && (a < scope.range[0] || a > scope.range[1])) continue
    yield k
  }
}

const countMemo = new Map()
function countToken(token, scope) {
  const scopeKey = scope.kind === 'quran' ? 'q' : scope.kind === 'surah' ? `s${scope.surah}` : `a${scope.surah}:${scope.range[0]}-${scope.range[1]}`
  const memoKey = `${norm(token)}|${scopeKey}`
  if (countMemo.has(memoKey)) return countMemo.get(memoKey)
  const tNoAl = stripAl(norm(token))
  let root = 0, lemma = 0, surface = 0
  const locs = { root: [], lemma: [], surface: [] }
  for (const key of keysInScope(scope)) {
    const segs = corpus[key]
    // root & lemma per segment
    for (const s of segs) {
      if (s.root && matches(s.root, tNoAl)) { root++; locs.root.push(key) }
      if (s.lemma && matches(stripAl(norm(s.lemma)), tNoAl)) { lemma++; locs.lemma.push(key) }
    }
    // surface: reconstruct words (segments share s:a:w prefix)
    const words = new Map()
    for (const s of segs) {
      const w = s.loc.split(':').slice(0, 3).join(':')
      words.set(w, (words.get(w) || '') + s.word)
    }
    for (const [, w] of words) {
      const nw = norm(w)
      if (matches(nw, norm(token)) || matches(stripAl(nw), tNoAl) ||
          matches(stripClitics(nw), stripClitics(tNoAl))) { surface++; locs.surface.push(key) }
    }
  }
  const out = { root, lemma, surface, locs }
  countMemo.set(memoKey, out)
  return out
}

// ── Dashed transliterated roots (*s-w-ʾ*, *k-t-b*) → Arabic ───────────────
// Only unambiguous single-reading mappings; anything else goes to the ledger.
const TRANSLIT = {
  "'": 'ء', 'ʾ': 'ء', 'ʼ': 'ء', b: 'ب', t: 'ت', th: 'ث', j: 'ج', 'ḥ': 'ح',
  kh: 'خ', d: 'د', dh: 'ذ', r: 'ر', z: 'ز', s: 'س', sh: 'ش', 'ṣ': 'ص',
  'ḍ': 'ض', 'ṭ': 'ط', 'ẓ': 'ظ', 'ʿ': 'ع', 'ʻ': 'ع', '`': 'ع', gh: 'غ',
  f: 'ف', q: 'ق', k: 'ك', l: 'ل', m: 'م', n: 'ن', h: 'ه', w: 'و', y: 'ي',
}
function dashedRootToArabic(str) {
  const parts = str.split('-')
  if (parts.length < 2 || parts.length > 4) return null
  let out = ''
  for (const p of parts) {
    const key = p.toLowerCase()
    if (!(key in TRANSLIT)) return null
    out += TRANSLIT[key]
  }
  return out
}

// ── Number words ──────────────────────────────────────────────────────────
const NUM = {
  once: 1, twice: 2, thrice: 3, one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20,
}
const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 }
const numOf = (w) => {
  if (!w) return null
  const t = w.toLowerCase().trim()
  if (/^\d+$/.test(t)) return parseInt(t, 10)
  // compound: "twenty-four", "thirty seven" — without this, \bfour\b inside
  // "twenty-four" parses as 4 and flags a correct claim.
  const m = t.match(/^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\s-]+(\w+)$/)
  if (m && NUM[m[2]] != null) return TENS[m[1]] + NUM[m[2]]
  if (TENS[t] != null) return TENS[t]
  return NUM[t] ?? null
}

// ── Sentence segmentation with line tracking ──────────────────────────────
function sentences() {
  const out = []
  const re = /[^.!?؟\n]+[.!?؟]?/g
  let m
  while ((m = re.exec(text))) {
    const raw = m[0]
    if (!raw.trim()) continue
    const line = text.slice(0, m.index).split('\n').length
    out.push({ raw, plain: raw.replace(/[*_`]/g, ''), index: m.index, line })
  }
  return out
}

// ── Subject resolution: find the Arabic thing a claim is about ────────────
// Search the claim sentence first, then neighbors (±2 sentences), because the
// corpus style is "There is a root that appears three times" ... "*s-w-ʾ* (سوء)".
// Letters may carry inline diacritics (هُدًى) — allow them inside the token,
// then normalize. Filter to ≥2 letters after stripping.
const AR_TOKEN = /[ء-يٱ-ۓ][ء-يٱ-ۓً-ْٰۣٓ-ۯ]*/g
// The trailing lookahead must reject ANY letter, not just ASCII — otherwise
// transliterated phrases like "l-khāliqīn" yield a bogus two-letter root (لخ).
const DASHED = /(?<![\p{L}-])((?:[a-zʾʼʿʻ'`ḥṣḍṭẓ]|th|kh|dh|sh|gh)(?:-(?:[a-zʾʼʿʻ'`ḥṣḍṭẓ]|th|kh|dh|sh|gh)){1,3})(?![\p{L}-])/giu

function resolveSubjects(all, i) {
  const seen = new Set()
  const subjects = []
  const push = (token, source, dist) => {
    const n = norm(token)
    if (n.length < 2 || seen.has(n)) return
    seen.add(n)
    subjects.push({ token: n, source, dist })
  }
  for (const d of [0, 1, -1, 2, -2]) {
    const s = all[i + d]
    if (!s) continue
    for (const t of s.plain.match(AR_TOKEN) || []) push(t, 'arabic', Math.abs(d))
    let dm
    DASHED.lastIndex = 0
    while ((dm = DASHED.exec(s.plain))) {
      const ar = dashedRootToArabic(dm[1])
      if (ar) push(ar, `translit:${dm[1]}`, Math.abs(d))
    }
  }
  subjects.sort((a, b) => a.dist - b.dist)
  return subjects
}

// ── Claim-scope resolution from the sentence itself ───────────────────────
function resolveClaimScope(sentence) {
  const s = sentence.toLowerCase()
  const scopes = []
  // "here" is a local scope marker. It matters when a sentence carries two
  // scopes — "repeated four times HERE … everywhere else in the Quran" — because
  // scopes are tried in order and the local one must win.
  if (/\bin\s+(this|the)\s+(ayah|verse|āyah)\b|\bin\s+these\s+(\w+\s+)?(ayahs|verses)\b|\bin\s+(this|the)\s+passage\b|\bhere\b/.test(s)) {
    if (fileScope.surah && fileScope.range) scopes.push({ kind: 'ayah', surah: fileScope.surah, range: fileScope.range, label: `ayah(s) ${fileScope.range[0]}-${fileScope.range[1]}` })
  }
  if (/\bin\s+(this|the)\s+(sūrah|surah)\b|\bacross\s+(this|the)\s+(sūrah|surah)\b/.test(s)) {
    if (fileScope.surah) scopes.push({ kind: 'surah', surah: fileScope.surah, label: `surah ${fileScope.surah}` })
  }
  if (/\bin\s+the\s+(entire\s+|whole\s+)?(quran|qur['ʾʼ]?[aā]n)\b|\bacross\s+the\s+(quran|qur['ʾʼ]?[aā]n)\b|\bquran-?wide\b/.test(s)) {
    scopes.push({ kind: 'quran', label: 'whole Quran' })
  }
  return scopes
}
function fallbackScopes() {
  const out = []
  if (fileScope.surah && fileScope.range) out.push({ kind: 'ayah', surah: fileScope.surah, range: fileScope.range, label: `ayah(s) ${fileScope.range[0]}-${fileScope.range[1]} (inferred)` })
  if (fileScope.surah) out.push({ kind: 'surah', surah: fileScope.surah, label: `surah ${fileScope.surah} (inferred)` })
  out.push({ kind: 'quran', label: 'whole Quran (inferred)' })
  return out
}

// ── Inline tag handling ───────────────────────────────────────────────────
const lines = text.split('\n')
function tagFor(line) {
  for (const l of [lines[line - 1] || '', lines[line - 2] || '']) {
    const m = l.match(/<!--\s*claim:(ok|subject=\S+(?:\s+scope=\S+)?)\s*(.*?)-->/)
    if (m) return m
  }
  return null
}

// ── Claim extraction ──────────────────────────────────────────────────────
// A bare number after the verb is NOT a count — "it appears attached to one
// specific subject" is not a claim that it appears once. Require either a
// self-contained count word (once/twice/thrice) or an explicit times/occurrences.
const NUMWORD = '(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\\s-](?:one|two|three|four|five|six|seven|eight|nine)|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety'
const COUNT_RE = new RegExp(
  '\\b(?:appears?|occurs?|is\\s+(?:used|mentioned|repeated)|used|mentioned|repeated|recurs?)\\b' +
  '[^.!?؟]{0,60}?(?:' +
    '\\b(exactly\\s+)?(once|twice|thrice)\\b' +                              // self-contained
    '|\\b(exactly\\s+)?(\\d+|' + NUMWORD + ')\\s+(?:times|occurrences?)\\b' + // needs the unit
  ')', 'i')
const COUNT_RE2 = /\b(once|twice|thrice|\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+times\b[^.!?؟]{0,40}?\b(?:in\s+(?:this|the)\s+(?:ayah|verse|surah|sūrah|quran|passage))/i
const ABSENCE_RE = /\b(?:never\s+(?:appears?|occurs?|mentioned)|does\s+not\s+appear|do(?:es)?\s+not\s+(?:occur|appear)|is\s+absent|absent\s+from|no\s+mention\s+of|not\s+(?:once|mentioned)\b|nowhere\s+(?:in|to\s+be\s+found))/i
// "X does not appear ONLY here" asserts the opposite of absence.
const NEGATED_ABSENCE_RE = /\bdo(?:es)?\s+not\s+(?:appear|occur)\s+only\b/i
// "the object of X is absent" is a claim about a grammatical gap, not about X
// being missing from the corpus.
const GRAMMATICAL_GAP_RE = /\b(?:object|subject|complement|referent|answer|amount|agent|addressee)\b[^.!?؟]{0,40}\bis\s+absent\b|\bis\s+absent\b[^.!?؟]{0,30}\b(?:from\s+the\s+(?:sentence|grammar|clause))\b/i
const UNIQUE_RE = /\b(?:only\s+(?:place|time|ayah|verse|surah|sūrah|occurrence)|nowhere\s+else|appears?\s+only\s+once|occurs?\s+only\s+once|hapax|the\s+only\s+(?:word|root|surah|sūrah)|unique\s+to\s+this)\b/i
const QUANT_RE = /\b(?:all|each|every)\s+(?:one\s+of\s+)?(?:of\s+the\s+)?(two|three|four|five|six|seven|eight|nine|ten|\d+)\b/i
const NARRATIVE_GUARD = /\b(?:prophet|ﷺ|prayer|prays?|prayed|day|daily|markets?|hand|question|thousand|hundred\s+thousand|knock|door)\b/i

const results = { verified: [], failed: [], manual: [], ledger: [] }
const all = sentences()

for (let i = 0; i < all.length; i++) {
  const s = all[i]
  const plain = s.plain
  // Skip markdown table rows — the Step 0 morphology table's gloss text
  // ("to be absent, hidden") is not prose claims, and the table itself is
  // verify_morphology's territory.
  if (s.raw.trimStart().startsWith('|')) continue
  const isCount = COUNT_RE.test(plain) || COUNT_RE2.test(plain)
  const isAbsence = ABSENCE_RE.test(plain) &&
    !NEGATED_ABSENCE_RE.test(plain) && !GRAMMATICAL_GAP_RE.test(plain)
  const isUnique = UNIQUE_RE.test(plain)
  const isQuant = QUANT_RE.test(plain)
  if (!isCount && !isAbsence && !isUnique && !isQuant) continue
  // Rhetorical absence guard: an absence sentence with no Arabic and no
  // word-ish marker ("the AMOUNT is absent", "Not once more.") is prose
  // rhetoric about a grammatical gap, not a corpus claim. Skip silently.
  if (isAbsence && !isCount && !isUnique && !isQuant) {
    const hasAr = AR_TOKEN.test(plain); AR_TOKEN.lastIndex = 0
    if (!hasAr && !/\b(word|root|name|letter|phrase|term|divine)\b/i.test(plain)) continue
  }

  const excerpt = plain.trim().replace(/\s+/g, ' ').slice(0, 220)
  const tag = tagFor(s.line)
  if (tag && tag[1] === 'ok') {
    results.manual.push({ line: s.line, excerpt, reason: (tag[2] || '').trim() })
    continue
  }

  // Universal quantifiers are never auto-verifiable → ledger (refutation pass input)
  if (isQuant && !isCount && !isAbsence && !isUnique) {
    results.ledger.push({ line: s.line, kind: 'quantifier', excerpt })
    continue
  }

  // Narrative guard: count-phrases about prayer, hadith scenes, rhetoric — skip
  // unless the sentence carries an Arabic token or an explicit corpus scope.
  const hasScopeWord = resolveClaimScope(plain).length > 0
  const hasArabic = AR_TOKEN.test(plain); AR_TOKEN.lastIndex = 0
  if (isCount && !isAbsence && !isUnique && NARRATIVE_GUARD.test(plain) && !hasScopeWord && !hasArabic) continue

  // Resolve subject
  let subjects = resolveSubjects(all, i)
  if (tag && tag[1].startsWith('subject=')) {
    const sub = tag[1].match(/subject=(\S+)/)[1]
    subjects = [{ token: sub, source: 'tag', dist: 0 }]
    const sc = tag[1].match(/scope=(\S+)/)
    if (sc) {
      const kind = sc[1]
      subjects.tagScope =
        kind === 'quran' ? { kind: 'quran', label: 'whole Quran (tag)' } :
        kind === 'surah' ? { kind: 'surah', surah: fileScope.surah, label: `surah ${fileScope.surah} (tag)` } :
        { kind: 'ayah', surah: fileScope.surah, range: fileScope.range, label: 'ayah range (tag)' }
    }
  }
  // Claimed number (for count claims)
  let claimed = null
  const cm = plain.match(COUNT_RE)
  if (cm) {
    // groups: 1=exactly? 2=once|twice|thrice  3=exactly? 4=N (with times/occurrences)
    claimed = numOf(cm[2] || cm[4] || '')
  } else {
    const cm2 = plain.match(COUNT_RE2)
    if (cm2) claimed = numOf(cm2[1])
  }
  if (isUnique && /only\s+once|hapax/i.test(plain)) claimed = 1

  if (!subjects.length) {
    const entry = { line: s.line, kind: isAbsence ? 'absence' : isUnique ? 'uniqueness' : 'count', excerpt, note: 'no Arabic subject resolvable' }
    // English-only subject ("the shirt appears four times in these verses"):
    // if the scope is a small ayah range and a number was claimed, tally every
    // root in range and surface the ones matching the claim as candidates.
    const sc = resolveClaimScope(plain).find((x) => x.kind === 'ayah')
    if (sc && claimed !== null) {
      const tally = new Map()
      for (const key of keysInScope(sc)) for (const seg of corpus[key]) if (seg.root) tally.set(seg.root, (tally.get(seg.root) || 0) + 1)
      const hits = [...tally].filter(([, n]) => n === claimed).map(([r]) => r).slice(0, 6)
      if (hits.length) entry.note = `no Arabic subject resolvable; roots with count ${claimed} in ${sc.label}: ${hits.join(' ')}`
    }
    results.ledger.push(entry)
    continue
  }

  let scopes = subjects.tagScope ? [subjects.tagScope] : resolveClaimScope(plain)
  const scopeStated = scopes.length > 0
  if (!scopes.length) scopes = fallbackScopes()

  // ⚠️ Verification REQUIRES the subject to be named in the claim's own sentence.
  // Borrowing a token from a neighbouring sentence and accepting the first
  // (subject × scope × interpretation) that hits the claimed number will
  // rubber-stamp a false claim whenever some unrelated nearby word happens to
  // count right — a false NEGATIVE, which is far worse here than a false alarm.
  // Neighbour tokens may only inform the ledger, never a verdict.
  const usable = subjects.filter((x) => x.dist === 0 || x.source === 'tag').slice(0, 6)
  if (!usable.length) {
    const near = subjects.slice(0, 2).map((x) => {
      const sc = (subjects.tagScope ? [subjects.tagScope] : resolveClaimScope(plain)).concat(fallbackScopes())[0]
      const c = countToken(x.token, sc)
      return { token: x.token, source: x.source, scope: sc.label, root: c.root, lemma: c.lemma, surface: c.surface }
    })
    results.ledger.push({
      line: s.line,
      kind: isAbsence ? 'absence' : isUnique ? 'uniqueness' : 'count',
      excerpt,
      note: 'subject not named in the claim sentence; nearby tokens shown for context only',
      attempts: near,
    })
    continue
  }
  if (isAbsence && claimed === null && !scopeStated && !subjects.tagScope) {
    results.ledger.push({ line: s.line, kind: 'absence', excerpt, note: 'no explicit scope' })
    continue
  }

  // Try to verify: any (subject × scope × interpretation) match
  let verdict = null
  const attempts = []
  for (const subj of usable) {
    for (const scope of scopes) {
      if ((scope.kind === 'ayah' && !scope.range) || (scope.kind !== 'quran' && !scope.surah)) continue
      const c = countToken(subj.token, scope)
      attempts.push({ token: subj.token, source: subj.source, scope: scope.label, ...{ root: c.root, lemma: c.lemma, surface: c.surface } })
      const checks = isAbsence
        ? [['root', c.root === 0 && c.lemma === 0 && c.surface === 0]]
        : isCount || claimed !== null
          ? [['root', c.root === claimed], ['lemma', c.lemma === claimed], ['surface', c.surface === claimed]]
          : []
      for (const [interp, ok] of checks) {
        if (ok && (claimed !== null || isAbsence)) {
          verdict = { token: subj.token, source: subj.source, scope: scope.label, interp, claimed: isAbsence ? 0 : claimed, scopeStated }
          break
        }
      }
      if (verdict) break
    }
    if (verdict) break
  }

  if (verdict) {
    results.verified.push({ line: s.line, excerpt, ...verdict })
  } else if (claimed !== null || isAbsence) {
    // Nothing matched. Hard-FAIL only when the claim's own sentence names the
    // subject (dist 0) and states a scope — that's a claim the corpus refutes.
    // Subjects borrowed from neighboring sentences ("this pattern appears
    // three times...") are guesses; unmatched guesses go to the ledger.
    const primary = attempts.slice(0, 3)
    const inSentence = usable.some((x) => x.dist === 0 || x.source === 'tag')

    // SPELLING-MERGE GUARD (the /names lesson). When a token's three readings
    // disagree wildly — e.g. النهى giving root=56, lemma=34, surface=3 because
    // the noun al-nuhā normalizes onto the verb nahā — the token's identity is
    // ambiguous and a hard FAIL would be blaming correct prose for a lookup
    // collision. Zeroes are ignored (a derived form often has no indexed root);
    // it is disagreement among the NON-zero readings that signals the merge.
    const spread = primary.map((a) => [a.root, a.lemma, a.surface].filter((v) => v > 0))
      .find((v) => v.length > 1 && Math.max(...v) > 2 * Math.min(...v))

    if (spread) {
      results.ledger.push({
        line: s.line, kind: 'count-ambiguous', excerpt,
        note: 'readings disagree (possible spelling merge) — resolve by lemma before ruling',
        attempts: primary,
      })
    } else if (inSentence && (scopeStated || strict)) {
      results.failed.push({ line: s.line, excerpt, claimed: isAbsence ? 'absent' : claimed, attempts: primary })
    } else {
      results.ledger.push({ line: s.line, kind: 'count-unmatched', excerpt, note: inSentence ? 'no scope stated; nearest counts shown' : 'subject inferred from neighboring sentences only', attempts: primary })
    }
  } else {
    results.ledger.push({ line: s.line, kind: isUnique ? 'uniqueness' : 'count', excerpt, note: 'could not extract claimed number' })
  }
}

// ── Report ────────────────────────────────────────────────────────────────
if (asJson) {
  console.log(JSON.stringify({ file, scope: fileScope, ...results }, null, 2))
} else {
  const rel = path.relative(process.cwd(), file)
  console.log(`\nverify_claims — ${rel}`)
  console.log(`scope: surah ${fileScope.surah ?? '?'}${fileScope.range ? `, ayahs ${fileScope.range[0]}-${fileScope.range[1]}` : ''}\n`)

  if (results.verified.length) {
    console.log(`✅ VERIFIED (${results.verified.length})`)
    for (const v of results.verified)
      console.log(`  L${v.line}: [${v.interp} count of ${v.token} = ${v.claimed} @ ${v.scope}] ${v.excerpt.slice(0, 110)}`)
  }
  if (results.manual.length) {
    console.log(`\n🖐  MANUAL (${results.manual.length}) — tagged claim:ok`)
    for (const m of results.manual) console.log(`  L${m.line}: ${m.excerpt.slice(0, 110)}`)
  }
  if (results.failed.length) {
    console.log(`\n❌ FAILED (${results.failed.length})`)
    for (const f of results.failed) {
      console.log(`  L${f.line}: claimed ${f.claimed} — ${f.excerpt.slice(0, 140)}`)
      for (const a of f.attempts)
        console.log(`      ${a.token} (${a.source}) @ ${a.scope}: root=${a.root} lemma=${a.lemma} surface=${a.surface}`)
    }
  }
  if (results.ledger.length) {
    console.log(`\n📋 LEDGER (${results.ledger.length}) — not auto-verifiable; input for the Refutation Pass`)
    for (const l of results.ledger) {
      console.log(`  L${l.line} [${l.kind}]: ${l.excerpt.slice(0, 140)}${l.note ? ` — ${l.note}` : ''}`)
      for (const a of l.attempts || [])
        console.log(`      ${a.token} @ ${a.scope}: root=${a.root} lemma=${a.lemma} surface=${a.surface}`)
    }
  }
  console.log(`\n${results.failed.length ? 'RESULT: FAIL' : 'RESULT: PASS'} — ${results.verified.length} verified, ${results.failed.length} failed, ${results.ledger.length} for the ledger\n`)
}
process.exit(results.failed.length ? 1 : 0)
