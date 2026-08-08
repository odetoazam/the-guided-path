#!/usr/bin/env node
/**
 * Read-only: detect drift between content/tadabbur/*.md and the published
 * ayah_records rows that readers actually see.
 *
 *   node scripts/audit-ayah-record-drift.mjs [--verbose]
 *
 * WHY THIS EXISTS. A repair to a content file does not reach readers until the
 * row is republished. That gap is real: the raghadan fix (2:58) found the live
 * row still serving the wrong "only twice" sentence after the file was correct.
 * Anywhere else that gap exists, the site is publishing text the repo has
 * already moved past — and a corpus sweep of the files would report all clear.
 *
 * METHOD. Timestamps are useless here (bulk normalisation commits touch every
 * file), so this compares CONTENT: it samples distinctive long sentences from
 * the live row and checks whether each still appears in the file. Sentences the
 * file no longer contains are the drift signal.
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config({ path: '.env.local' })

const verbose = process.argv.includes('--verbose')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ROOT = 'content/tadabbur'
const dirs = fs.readdirSync(ROOT).filter((d) => /^\d{3}-/.test(d))
const dirFor = (n) => dirs.find((d) => parseInt(d.slice(0, 3), 10) === n)

// normalise for comparison: collapse whitespace, drop markdown emphasis
const norm = (s) => s.replace(/[*_`>#\[\]]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()

// layer_a is { linguistic_html, grounding_table }; layer_b is { reflection_html }.
// Treating these as strings silently yields "[object Object]" and a vacuous
// all-clear — which is exactly what happened on the first run of this audit.
const layerText = (o) => {
  if (!o) return ''
  if (typeof o === 'string') return o
  return Object.values(o).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join('\n\n')
}

const { data: rows, error } = await supabase
  .from('ayah_records')
  .select('surah_number, ayah_start, ayah_end, layer_a, layer_b, status, updated_at')
  .eq('status', 'published')
if (error) { console.error('fetch failed:', error.message); process.exit(2) }

const missingFile = []
const rangeMismatch = []
const drifted = []
let checked = 0

for (const r of rows) {
  const dir = dirFor(r.surah_number)
  if (!dir) { missingFile.push(`${r.surah_number}:${r.ayah_start}-${r.ayah_end} (no surah dir)`); continue }

  const pad = (n) => String(n).padStart(3, '0')
  const candidates = [
    `ayahs-${pad(r.ayah_start)}-${pad(r.ayah_end)}.md`,
    `ayah-${pad(r.ayah_start)}.md`,
  ].map((f) => path.join(ROOT, dir, f))
  let file = candidates.find((f) => fs.existsSync(f))
  if (!file) {
    // The corpus regrouped ayahs over time, so a row for 2:6-7 has no
    // same-named file while content/tadabbur/002-al-baqarah/ayahs-006-017.md
    // covers it. Name the containing file so the orphan is legible rather than
    // just "missing" — these rows are live text no corpus fix can reach.
    const ranges = fs.readdirSync(path.join(ROOT, dir))
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const m = f.match(/^ayahs?-(\d{3})(?:-(\d{3}))?\.md$/)
        if (!m) return null
        return { f, lo: +m[1], hi: +(m[2] ?? m[1]) }
      })
      .filter(Boolean)
    const container = ranges.find((c) => c.lo <= r.ayah_start && c.hi >= r.ayah_end)
    // No single container does not mean the content is missing — the row's range
    // may simply straddle the corpus's current grouping.
    const overlaps = ranges.filter((c) => c.hi >= r.ayah_start && c.lo <= r.ayah_end)
    missingFile.push(
      `${r.surah_number}:${r.ayah_start}-${r.ayah_end} → no ${path.basename(candidates[0])}; ` +
      (container ? `covered by ${container.f} (${container.lo}-${container.hi})`
        : overlaps.length ? `spans ${overlaps.length} files: ${overlaps.map((o) => o.f).join(', ')}`
        : 'no file covers or overlaps this range')
    )
    continue
  }

  const raw = fs.readFileSync(file, 'utf8')

  // Only compare when the file actually covers the SAME ayah range. A row for
  // 26:61-63 matched against ayah-061.md will differ for a trivial reason, and
  // counting that as drift would inflate the finding.
  const fmStart = raw.match(/^ayah_start:\s*(\d+)/m)
  const fmEnd = raw.match(/^ayah_end:\s*(\d+)/m)
  if (fmStart && fmEnd) {
    const covers = +fmStart[1] === r.ayah_start && +fmEnd[1] === r.ayah_end
    if (!covers) { rangeMismatch.push(`${r.surah_number}:${r.ayah_start}-${r.ayah_end} vs ${file} (covers ${fmStart[1]}-${fmEnd[1]})`); continue }
  }

  const fileText = norm(raw)
  const live = `${layerText(r.layer_a)}\n${layerText(r.layer_b)}`

  // distinctive sentences only: long, prose, no Arabic (Arabic gets re-normalised
  // by the Uthmani pass and would produce noise)
  const sentences = live
    .split(/(?<=[.!?])\s+/)
    .map(norm)
    .filter((s) => s.length >= 80 && s.length <= 400 && !/[؀-ۿ]/.test(s))

  if (sentences.length < 4) continue
  const sample = sentences.filter((_, i) => i % Math.ceil(sentences.length / 12) === 0).slice(0, 12)
  const absent = sample.filter((s) => !fileText.includes(s))
  checked++

  if (absent.length / sample.length > 0.25) {
    drifted.push({
      ref: `${r.surah_number}:${r.ayah_start}-${r.ayah_end}`,
      file,
      missing: absent.length,
      sampled: sample.length,
      updated_at: r.updated_at,
      example: absent[0]?.slice(0, 160),
    })
  }
}

console.log(`Compared ${checked} published ayah_records against their content files.\n`)

// A comparison that sampled nothing is not a pass. Fail loudly rather than
// printing a clean bill of health for work that never happened.
if (checked === 0) {
  console.error('ERROR: 0 records were actually compared — the extraction or filter is broken.')
  process.exit(2)
}

if (missingFile.length) {
  console.log(`⚠️  NO MATCHING FILE (${missingFile.length})`)
  missingFile.slice(0, 20).forEach((m) => console.log(`  • ${m}`))
  if (missingFile.length > 20) console.log(`  … and ${missingFile.length - 20} more`)
  console.log()
}

if (rangeMismatch.length) {
  console.log(`ℹ️  RANGE MISMATCH — row and file cover different ayahs, not compared (${rangeMismatch.length})`)
  rangeMismatch.slice(0, 10).forEach((m) => console.log(`  • ${m}`))
  if (rangeMismatch.length > 10) console.log(`  … and ${rangeMismatch.length - 10} more`)
  console.log()
}

console.log(`${drifted.length ? '⚠️ ' : '✅'} DRIFT — live text no longer matches the file (${drifted.length})`)
for (const d of drifted) {
  console.log(`  • ${d.ref}  ${d.missing}/${d.sampled} sampled sentences absent from ${d.file}`)
  console.log(`      row updated ${d.updated_at}`)
  if (verbose && d.example) console.log(`      live-only: "${d.example}…"`)
}

console.log(`\n${drifted.length === 0 ? 'RESULT: live rows match the repo' : `RESULT: ${drifted.length} row(s) drifted`}\n`)
process.exit(drifted.length ? 1 : 0)
