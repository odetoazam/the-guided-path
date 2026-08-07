import fs from 'fs'
const corpus = JSON.parse(fs.readFileSync('scripts/.corpus-cache/quranic-corpus.json', 'utf8'))
const src = fs.readFileSync('src/data/divine-names.ts', 'utf8')

// normalise: drop diacritics, unify alef/ya/ta-marbuta variants, drop the article
const norm = (x) => (x || '').normalize('NFC')
  .replace(/[ً-ْٰـ]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/^ال/, '')

const tally = new Map()
for (const segs of Object.values(corpus)) for (const s of segs) {
  if (s.pos !== 'N' || !s.lemma) continue
  const k = norm(s.lemma)
  if (!tally.has(k)) tally.set(k, new Map())
  const m = tally.get(k)
  m.set(s.lemma, (m.get(s.lemma) || 0) + 1)
}

const rows = [...src.matchAll(/\{ number: (\d+), arabic: '([^']+)', translit: '([^']+)'[^}]*?wordCount: (\d+)/g)]
let diffs = 0, merges = 0
console.log(`registry rows parsed: ${rows.length}\n`)
console.log('name              reg   corpus (exact lemmas under that spelling)')
for (const [, num, arabic, translit, wc] of rows) {
  const m = tally.get(norm(arabic))
  const parts = m ? [...m.entries()] : []
  const total = parts.reduce((a, [, n]) => a + n, 0)
  const merged = parts.length > 1
  if (Number(wc) === total && !merged) continue
  if (Number(wc) !== total) diffs++
  if (merged) merges++
  console.log(
    `${translit.padEnd(16)} ${String(wc).padStart(4)}  ${parts.map(([l, n]) => `${l}=${n}`).join(' + ') || '(none)'}` +
    ` → ${total}${Number(wc) !== total ? '   *** DIFFERS' : '   (merged, total matches)'}`
  )
}
console.log(`\ntotals: ${diffs} rows differ from a fresh count; ${merges} rows span more than one lemma`)
