/**
 * Restore ring diagram tabs on 68 surahs where chiastic data exists
 * but the tab was removed during the overhaul.
 *
 * Inserts ring tab as second tab (after the journey/sections tab, before absences).
 * Uses the correct diagramKey for each surah (chiasticRing or ringStructure).
 *
 * Run: npx tsx scripts/restore-ring-tabs.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const RESTORE_SURAHS = [
  8, 9, 13, 15, 16, 23, 25, 26, 29, 30, 31, 32, 33, 35, 37, 39,
  41, 42, 43, 44, 45, 47, 48, 49, 51, 52, 53, 54, 58, 59, 60, 61,
  62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79,
  80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 92, 93, 95, 96, 97, 99,
  100, 101, 102, 104,
]

async function main() {
  let success = 0
  let failed = 0

  for (const n of RESTORE_SURAHS) {
    // Fetch current state
    const { data, error: fetchErr } = await supabase
      .from('surah_visual_data')
      .select('tabs, diagrams')
      .eq('surah_number', n)
      .single()

    if (fetchErr || !data) {
      console.error(`✗ ${n}: fetch failed — ${fetchErr?.message}`)
      failed++
      continue
    }

    const tabs = (data.tabs || []) as any[]
    const diagrams = data.diagrams || {} as any

    // Already has ring tab? Skip
    if (tabs.some((t: any) => t.renderer === 'ring')) {
      console.log(`⊘ ${n}: already has ring tab`)
      continue
    }

    // Determine correct diagram key
    const diagramKey = diagrams.chiasticRing ? 'chiasticRing' : diagrams.ringStructure ? 'ringStructure' : null
    if (!diagramKey) {
      console.error(`✗ ${n}: no ring diagram data found`)
      failed++
      continue
    }

    // Determine label based on existing tab labels
    // If there's already a custom label pattern, use "The Ring"
    const ringTab = {
      id: 'ring',
      label: 'The Ring',
      diagramKey,
      renderer: 'ring',
    }

    // Insert as second tab (after journey/sections, before absences/text)
    const newTabs = [...tabs]
    // Find the first non-journey tab index to insert before
    const insertIdx = Math.min(
      newTabs.findIndex((t: any) => t.renderer === 'absence'),
      newTabs.findIndex((t: any) => t.renderer === 'text'),
    )

    if (insertIdx > 0) {
      newTabs.splice(insertIdx, 0, ringTab)
    } else {
      // Fallback: insert at position 1
      newTabs.splice(1, 0, ringTab)
    }

    const { error } = await supabase
      .from('surah_visual_data')
      .update({
        tabs: newTabs,
        updated_at: new Date().toISOString(),
      })
      .eq('surah_number', n)

    if (error) {
      console.error(`✗ ${n}: ${error.message}`)
      failed++
    } else {
      console.log(`✓ ${n}: ring tab restored (${diagramKey}, now ${newTabs.length} tabs)`)
      success++
    }
  }

  console.log(`\n${success} restored, ${failed} failed`)
}

main()
