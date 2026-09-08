#!/usr/bin/env node
/**
 * Gate for src/data/fatiha-ring.ts.
 *
 *   node scripts/verify_ring_arabic.mjs          # check: every CANONICAL_ARABIC entry is byte-identical to quran-validator
 *   node scripts/verify_ring_arabic.mjs --write  # fill @@S:A@@ placeholders (or rewrite drifted entries) from the validator
 *
 * The Arabic in that file must never be typed or pasted by hand — see
 * memory reference_arabic_canonical_source. This script is the only writer.
 */
import fs from 'node:fs'
import { QuranValidator } from 'quran-validator'

const FILE = new URL('../src/data/fatiha-ring.ts', import.meta.url)
const write = process.argv.includes('--write')
const v = new QuranValidator()
let src = fs.readFileSync(FILE, 'utf8')
const block = src.match(/const CANONICAL_ARABIC[^{]*\{([\s\S]*?)\n\}/)
if (!block) { console.error('CANONICAL_ARABIC block not found'); process.exit(2) }

let bad = 0
for (const m of block[1].matchAll(/^\s+(\d+): '([^']*)',$/gm)) {
  const ayah = Number(m[1]); const current = m[2]
  const canon = v.getVerse(1, ayah).text
  if (current === canon) continue
  if (write) {
    src = src.replace(m[0], m[0].replace(`'${current}'`, `'${canon}'`))
    console.log(`wrote 1:${ayah}`)
  } else {
    bad++
    const i = [...current].findIndex((c, k) => c !== [...canon][k])
    console.error(`❌ 1:${ayah} differs from canonical at index ${i} (${current === `@@1:${ayah}@@` ? 'placeholder' : 'drift'})`)
  }
}
if (write) {
  fs.writeFileSync(FILE, src)
  // verify the write landed
  const check = fs.readFileSync(FILE, 'utf8').match(/const CANONICAL_ARABIC[^{]*\{([\s\S]*?)\n\}/)[1]
  for (const m of check.matchAll(/^\s+(\d+): '([^']*)',$/gm)) {
    if (m[2] !== v.getVerse(1, Number(m[1])).text) { console.error(`❌ post-write mismatch 1:${m[1]}`); process.exit(1) }
  }
  console.log('✅ all 7 entries match quran-validator after write')
} else if (bad) {
  process.exit(1)
} else {
  console.log('✅ fatiha-ring.ts: all 7 Arabic entries byte-identical to quran-validator')
}
