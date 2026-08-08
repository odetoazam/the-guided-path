#!/usr/bin/env node
/**
 * Read-only audit of every surah_visual_data row against what can actually render.
 *
 *   node scripts/audit-visual-renderers.mjs
 *
 * WHY THIS EXISTS. Three failure modes ship silently on the live surah pages,
 * because none of them throws:
 *
 *   1. UNKNOWN RENDERER — tabs[].renderer is not a key in the RENDERERS map in
 *      src/components/surah/diagrams/DiagramRenderer.tsx. DiagramRenderer returns
 *      null. The tab appears in the bar and the panel is blank.
 *   2. SILENT DROP — tabs[].diagramKey has no matching entry in the diagrams
 *      object. SurahTabs filters the tab out entirely; the page just has fewer
 *      tabs than intended and looks fine.
 *   3. SHAPE MISMATCH — the diagram data exists but lacks the field its renderer
 *      reads (e.g. a fourConditions entry carrying `conditions` when the
 *      FourConditions component reads `pairs`/`logic`). The tab renders an empty
 *      shell.
 *
 * This script only reads. It reports; it never writes.
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Mirrors RENDERERS in src/components/surah/diagrams/DiagramRenderer.tsx
const RENDERERS = {
  ring: ['pairs'],
  journey: ['sections'],
  funnel: ['stages', 'layers'],          // either satisfies it
  absence: ['absences'],
  compression: ['elements'],
  arcs: ['arcs', 'threads'],
  landmark: ['verses'],
  contrast: ['pairs', 'signs'],
  // PolarMap renders three shapes: inversionFrame (poles), elementalPair (pairs),
  // and twinSurah (left + right). See its header comment.
  polar: ['poles', 'pairs', 'left'],
  conditions: ['pairs'],                 // NOT `conditions`
  wordmirror: ['mirrors', 'poles'],
  refrain: ['elements'],
  addressshift: ['shifts'],
}

const unknown = []
const dropped = []
const shape = []
let totalTabs = 0

const { data: rows, error } = await supabase
  .from('surah_visual_data')
  .select('surah_number, name, diagrams, tabs')
  .order('surah_number')

if (error) {
  console.error('fetch failed:', error.message)
  process.exit(2)
}

for (const row of rows) {
  const diagrams = row.diagrams || {}
  for (const tab of row.tabs || []) {
    totalTabs++
    if (tab.renderer === 'text') continue

    if (!RENDERERS[tab.renderer]) {
      unknown.push(`${row.surah_number} ${row.name}: tab "${tab.id}" renderer="${tab.renderer}"`)
      continue
    }
    if (!tab.diagramKey) {
      dropped.push(`${row.surah_number} ${row.name}: tab "${tab.id}" has no diagramKey`)
      continue
    }
    const data = diagrams[tab.diagramKey]
    if (!data) {
      dropped.push(`${row.surah_number} ${row.name}: tab "${tab.id}" → diagrams.${tab.diagramKey} missing`)
      continue
    }
    const accepted = RENDERERS[tab.renderer]
    if (!accepted.some((f) => data[f] !== undefined)) {
      shape.push(
        `${row.surah_number} ${row.name}: ${tab.diagramKey} (renderer="${tab.renderer}") ` +
        `has [${Object.keys(data).join(', ')}] — needs one of [${accepted.join(' | ')}]`
      )
    }
  }
}

const section = (title, items) => {
  console.log(`\n${title} (${items.length})`)
  if (!items.length) console.log('  none')
  else items.forEach((i) => console.log(`  • ${i}`))
}

console.log(`Audited ${rows.length} surah rows, ${totalTabs} tabs.`)
section('❌ UNKNOWN RENDERER — tab renders blank', unknown)
section('⚠️  SILENT DROP — tab disappears from the page', dropped)
section('⚠️  SHAPE MISMATCH — tab renders an empty shell', shape)

const bad = unknown.length + dropped.length + shape.length
console.log(`\n${bad === 0 ? 'RESULT: CLEAN' : `RESULT: ${bad} problem tab(s)`}\n`)
process.exit(bad ? 1 : 0)
