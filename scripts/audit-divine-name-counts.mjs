#!/usr/bin/env node
/**
 * Verifies every wordCount in src/data/divine-names.ts against the Quranic corpus.
 *
 *   node scripts/audit-divine-name-counts.mjs          # check, non-zero exit on failure
 *   node scripts/audit-divine-name-counts.mjs --all    # also print the rows that pass
 *
 * WHY THIS EXISTS. The counts on /names are the page's whole claim to being more
 * defensible than every other 99-names list, and they were wrong. The original
 * figures were produced by summing every lemma whose spelling matched the name,
 * which silently added up different words:
 *
 *   Al-Malik    152  →   15   (88 of them were malak, ANGEL; 48 were mulk, dominion)
 *   Al-Akhir    225  →  155   (70 of them were akhar, "another")
 *   Ash-Shakur   12  →   10   (2 were shukur, the act of thanks) — this one had
 *                              reached a published article before it was caught
 *   Al-Hakam     33  →    3   (30 were hukm, judgement)
 *   Al-Ali       14  →   11   (ala and illiyy)
 *   Al-Barr      30  →   22   (8 were birr)
 *   Al-Afuww      7  →    5   (2 were afw)
 *   Al-Hadi       7  →   10   (the opposite error — one of the participle's two
 *                              corpus spellings was missed)
 *
 * Keep the distinction the page itself makes. "The word, not the name" is a
 * DISCLOSED caveat: Al-Mu'min is 202 because the word mostly describes human
 * believers — same word, different referent, and the page says so. Summing malak
 * into Al-Malik is not that. It is a different word, and it is a bug.
 *
 * So: any name whose spelling is shared by more than one lemma must declare the
 * exact lemma(s) it counts, in the `lemmas` field. This script fails if it does not.
 * Names counted as a phrase (Malik al-Mulk, Dhul-Jalali wal-Ikram) declare
 * `lemmas: []` and are checked by hand — see their countNote.
 */
import fs from 'fs'

const corpus = JSON.parse(fs.readFileSync('scripts/.corpus-cache/quranic-corpus.json', 'utf8'))
const src = fs.readFileSync('src/data/divine-names.ts', 'utf8')
const showAll = process.argv.includes('--all')

const norm = (x) => (x || '').normalize('NFC')
  .replace(/[ً-ْٰـ]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/^ال/, '')
  .trim()

// exact-lemma tallies, and a spelling → lemmas index
const exact = new Map()
const bySpelling = new Map()
for (const segs of Object.values(corpus)) {
  for (const s of segs) {
    if (s.pos !== 'N' || !s.lemma) continue
    exact.set(s.lemma, (exact.get(s.lemma) || 0) + 1)
    const k = norm(s.lemma)
    if (!bySpelling.has(k)) bySpelling.set(k, new Set())
    bySpelling.get(k).add(s.lemma)
  }
}

const rowRe = /\{ number: (\d+), arabic: '([^']+)', translit: '([^']+)'[\s\S]*?wordCount: (\d+)(?:, lemmas: \[([^\]]*)\])?/g
const rows = [...src.matchAll(rowRe)]

let fail = 0, pass = 0, phrase = 0
for (const [, num, arabic, translit, wcRaw, lemRaw] of rows) {
  const wc = Number(wcRaw)
  const declared = lemRaw === undefined
    ? null
    : lemRaw.trim() === ''
      ? []
      : lemRaw.split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean)

  // phrase-counted names opt out of the mechanical check
  if (declared && declared.length === 0) {
    phrase++
    if (showAll) console.log(`  ~  ${translit.padEnd(22)} ${String(wc).padStart(4)}  counted as a phrase, verified by hand`)
    continue
  }

  const tokens = arabic.split(/\s+/).map(norm).filter(Boolean)
  const candidates = new Set()
  for (const t of tokens) for (const l of bySpelling.get(t) || []) candidates.add(l)

  if (declared) {
    const missing = declared.filter((l) => !exact.has(l))
    if (missing.length) {
      console.log(`  ✗  ${translit.padEnd(22)} declares lemma(s) absent from the corpus: ${missing.join(', ')}`)
      fail++
      continue
    }
    const total = declared.reduce((a, l) => a + exact.get(l), 0)
    if (total !== wc) {
      console.log(`  ✗  ${translit.padEnd(22)} wordCount ${wc}, but ${declared.join(' + ')} = ${total}`)
      fail++
    } else {
      pass++
      if (showAll) console.log(`  ✓  ${translit.padEnd(22)} ${String(wc).padStart(4)}  = ${declared.join(' + ')}`)
    }
    continue
  }

  // No declaration: only allowed when the spelling is unambiguous.
  if (candidates.size > 1) {
    const detail = [...candidates].map((l) => `${l}=${exact.get(l)}`).join(' + ')
    console.log(`  ✗  ${translit.padEnd(22)} ${String(wc).padStart(4)}  spelling covers ${candidates.size} lemmas (${detail}) — must declare \`lemmas\``)
    fail++
    continue
  }
  const total = [...candidates].reduce((a, l) => a + exact.get(l), 0)
  if (total !== wc) {
    console.log(`  ✗  ${translit.padEnd(22)} wordCount ${wc}, corpus says ${total}${candidates.size ? ` (${[...candidates][0]})` : ' (no noun lemma with this spelling)'}`)
    fail++
  } else {
    pass++
    if (showAll) console.log(`  ✓  ${translit.padEnd(22)} ${String(wc).padStart(4)}`)
  }
}

console.log(`\n${rows.length} names · ${pass} verified · ${phrase} phrase-counted · ${fail} failing`)
if (fail) {
  console.log('\nFix the count, or declare the exact lemma(s) in `lemmas` and say why in `countNote`.')
  process.exit(1)
}
