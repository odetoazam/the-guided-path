#!/usr/bin/env node
/**
 * Republish ayah_records rows from their content/tadabbur source files.
 *
 *   node scripts/republish-ayah-records.mjs <file...>            # DRY RUN (default)
 *   node scripts/republish-ayah-records.mjs --write <file...>    # actually write
 *
 * WHY THIS EXISTS. The original inserters (scripts/insert-tadabbur-*.ts) read from
 * scripts/tadabbur-output/, a staging directory that stopped being maintained.
 * content/tadabbur/ is the corpus that receives every fix, so the live rows have
 * drifted away from it — 13 of them serve prose the repo replaced outright.
 * audit-ayah-record-drift.mjs finds them; this brings them back in sync.
 *
 * SAFETY. Dry run unless --write. Always backs up the rows it will touch, to a
 * timestamped JSON file, before the first write. It updates only the three body
 * columns plus title and updated_at, so ids, entity_tags, status, and the
 * arabic_text/translation the page renders are all left alone.
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config({ path: '.env.local' })

const argv = process.argv.slice(2)
const write = argv.includes('--write')
const files = argv.filter((a) => !a.startsWith('--'))
if (!files.length) { console.error('usage: … [--write] <file...>'); process.exit(2) }

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Where the displayed reflection begins. Everything above it is frontmatter,
// word-by-word root maps, and grounding scaffolding — which must NOT reach the
// page (there is a prior incident of exactly that leaking into rendered output).
const START_RE = /^#{2,3} .*(introduction|the world this arrived into)/im
// Where the linguistic layer ends and the thematic layer begins.
const SPLIT_RE = /^#{2,3} .*(part 2|thematic depth|theme one)/im

const rows = []
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')

  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const front = fm ? fm[1] : ''
  const get = (k) => (front.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [])[1]

  const surah = parseInt(get('surah') || '', 10)
  const aStart = parseInt(get('ayah_start') || '', 10)
  const aEnd = parseInt(get('ayah_end') || String(aStart), 10)
  const title = get('title')
  if (!surah || !aStart) { console.error(`✗ ${file}: could not read surah/ayah from frontmatter`); process.exit(1) }

  const body = fm ? raw.slice(fm[0].length) : raw

  const sm = body.match(START_RE)
  const startIdx = sm ? body.indexOf(sm[0]) : 0
  const spl = body.slice(startIdx).match(SPLIT_RE)
  if (!spl) { console.error(`✗ ${file}: no thematic boundary found — refusing to guess`); process.exit(1) }
  const splitIdx = startIdx + body.slice(startIdx).indexOf(spl[0])

  const linguistic = body.slice(startIdx, splitIdx).trim()
  const reflection = body.slice(splitIdx).trim()
  const grounding = (raw.match(/<!--[\s\S]*?-->/g) || []).join('\n')

  if (linguistic.length < 500 || reflection.length < 500) {
    console.error(`✗ ${file}: suspiciously short split (a=${linguistic.length} b=${reflection.length}) — refusing`)
    process.exit(1)
  }

  rows.push({
    file, surah, aStart, aEnd, title,
    startHeading: sm ? sm[0].trim() : '(top of body)',
    splitHeading: spl[0].trim(),
    // Only send `title` when the file actually has one. Some files carry no
    // title in frontmatter, and writing `undefined` would blank the live
    // headline — a body sync must never damage a field it has no source for.
    payload: {
      ...(title ? { title } : {}),
      layer_a: { grounding_table: grounding, linguistic_html: linguistic },
      layer_b: { reflection_html: reflection },
      updated_at: new Date().toISOString(),
    },
    sizes: { a: linguistic.length, b: reflection.length, g: grounding.length },
  })
}

console.log(`\n${write ? 'REPUBLISH' : 'DRY RUN'} — ${rows.length} record(s)\n`)
for (const r of rows) {
  console.log(`${r.surah}:${r.aStart}-${r.aEnd}  ${path.basename(r.file)}`)
  console.log(`   title  : ${r.title ?? '(none in frontmatter — keeping the live title)'}`)
  console.log(`   starts : ${r.startHeading}`)
  console.log(`   splits : ${r.splitHeading}`)
  console.log(`   sizes  : linguistic ${r.sizes.a}  reflection ${r.sizes.b}  grounding ${r.sizes.g}`)
}

if (!write) {
  console.log('\nNo changes written. Re-run with --write to apply.\n')
  process.exit(0)
}

// Back up every row we are about to touch, before touching any of them.
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupPath = `scripts/.backups/ayah_records-${stamp}.json`
fs.mkdirSync('scripts/.backups', { recursive: true })
const backup = []
for (const r of rows) {
  const { data, error } = await supabase.from('ayah_records').select('*')
    .eq('surah_number', r.surah).eq('ayah_start', r.aStart).eq('ayah_end', r.aEnd).single()
  if (error || !data) { console.error(`✗ ${r.surah}:${r.aStart}-${r.aEnd}: row not found — aborting before any write`); process.exit(1) }
  backup.push(data)
}
fs.writeFileSync(backupPath, JSON.stringify(backup, null, 1))
console.log(`\nbacked up ${backup.length} rows → ${backupPath}`)

let ok = 0
for (const r of rows) {
  const { error } = await supabase.from('ayah_records').update(r.payload)
    .eq('surah_number', r.surah).eq('ayah_start', r.aStart).eq('ayah_end', r.aEnd)
  if (error) { console.error(`✗ ${r.surah}:${r.aStart}-${r.aEnd}: ${error.message}`); continue }
  console.log(`✓ ${r.surah}:${r.aStart}-${r.aEnd} republished`)
  ok++
}
console.log(`\n${ok}/${rows.length} republished. Restore with the backup above if needed.\n`)
process.exit(ok === rows.length ? 0 : 1)
