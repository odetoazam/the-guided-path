/**
 * Migrate SURAH_DATA from 114 static TSX files into surah_visual_data table.
 *
 * Run: npx tsx scripts/migrate-surah-visual-data.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const VISUAL_DIR = path.join(__dirname, '..', 'src', 'data', 'visual')

// ── Balanced extraction ──────────────────────────────────────────────────────

function extractBalanced(text: string, startMarker: string, open: string, close: string): string | null {
  const idx = text.indexOf(startMarker)
  if (idx === -1) return null

  const start = text.indexOf(open, idx + startMarker.length - 1)
  if (start === -1) return null

  let depth = 0
  for (let i = start; i < text.length; i++) {
    if (text[i] === open) depth++
    else if (text[i] === close) depth--
    if (depth === 0) return text.slice(start, i + 1)
  }
  return null
}

// ── Comment stripping (preserve strings) ─────────────────────────────────────

function stripComments(code: string): string {
  let result = ''
  let inString: string | null = null
  let escape = false

  for (let i = 0; i < code.length; i++) {
    const ch = code[i]

    if (escape) {
      result += ch
      escape = false
      continue
    }

    if (ch === '\\' && inString) {
      result += ch
      escape = true
      continue
    }

    if (!inString) {
      if ((ch === '"' || ch === "'" || ch === '`')) {
        inString = ch
        result += ch
        continue
      }
      if (ch === '/' && code[i + 1] === '/') {
        // Skip to end of line
        const eol = code.indexOf('\n', i)
        if (eol === -1) break
        i = eol - 1
        continue
      }
    } else if (ch === inString) {
      inString = null
    }

    result += ch
  }
  return result
}

// ── Renderer mapping ─────────────────────────────────────────────────────────

const DIAGRAM_KEY_TO_RENDERER: Record<string, string> = {
  ringStructure: 'ring',
  chiasticRing: 'ring',
  fourConditions: 'ring',
  sectionJourney: 'journey',
  sectionMap: 'journey',
  twoBreaths: 'journey',
  funnel: 'journey',
  deductiveFunnel: 'funnel',
  absenceMap: 'absence',
  compression: 'compression',
  components: 'compression',
}

function inferRenderer(diagramKey: string, data: any): string {
  if (DIAGRAM_KEY_TO_RENDERER[diagramKey]) return DIAGRAM_KEY_TO_RENDERER[diagramKey]
  // Infer from shape
  if (data?.pairs && data?.center) return 'ring'
  if (data?.sections) return 'journey'
  if (data?.layers || data?.stages) return 'funnel'
  if (data?.absences) return 'absence'
  if (data?.elements) return 'compression'
  return 'compression' // fallback
}

function enrichTabs(
  rawTabs: Array<{ id: string; label: string }>,
  diagrams: Record<string, any>,
  fileText: string
): Array<{ id: string; label: string; diagramKey?: string; renderer: string }> {
  return rawTabs.map((tab) => {
    if (tab.id === 'text') {
      return { ...tab, renderer: 'text' }
    }

    // Try to find which diagram key this tab renders from the activeTab conditionals
    // Pattern: activeTab === "tabId" && <Component data={d.diagrams.key} />
    const regex = new RegExp(`activeTab\\s*===\\s*["']${tab.id}["']\\s*&&\\s*<\\w+\\s+data=\\{d\\.diagrams\\.(\\w+)`)
    const match = fileText.match(regex)

    if (match) {
      const diagramKey = match[1]
      return { ...tab, diagramKey, renderer: inferRenderer(diagramKey, diagrams[diagramKey]) }
    }

    // Fallback: try to match tab.id to a diagram key
    const diagramKeys = Object.keys(diagrams)
    const directMatch = diagramKeys.find((k) => k.toLowerCase() === tab.id.toLowerCase())
    if (directMatch) {
      return { ...tab, diagramKey: directMatch, renderer: inferRenderer(directMatch, diagrams[directMatch]) }
    }

    // Last resort: try partial matching
    for (const key of diagramKeys) {
      if (key.toLowerCase().includes(tab.id.toLowerCase()) || tab.id.toLowerCase().includes(key.toLowerCase())) {
        return { ...tab, diagramKey: key, renderer: inferRenderer(key, diagrams[key]) }
      }
    }

    // If still no match, pick unmatched diagram by order
    console.warn(`  ⚠ Could not match tab "${tab.id}" to a diagram key`)
    return { ...tab, renderer: 'compression' }
  })
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function migrate() {
  const errors: string[] = []
  const rows: any[] = []

  for (let n = 1; n <= 114; n++) {
    const file = path.join(VISUAL_DIR, `surah-${n}.tsx`)
    if (!fs.existsSync(file)) {
      console.error(`✗ surah-${n}.tsx not found`)
      errors.push(`surah-${n}: file not found`)
      continue
    }

    const text = fs.readFileSync(file, 'utf-8')

    // Extract SURAH_DATA
    const rawData = extractBalanced(text, 'const SURAH_DATA', '{', '}')
    if (!rawData) {
      console.error(`✗ surah-${n}: could not extract SURAH_DATA`)
      errors.push(`surah-${n}: SURAH_DATA extraction failed`)
      continue
    }

    // Extract TABS
    const rawTabs = extractBalanced(text, 'const TABS', '[', ']')
    if (!rawTabs) {
      console.error(`✗ surah-${n}: could not extract TABS`)
      errors.push(`surah-${n}: TABS extraction failed`)
      continue
    }

    try {
      let cleaned = stripComments(rawData)
      // Strip TypeScript syntax: `as const`, `as SomeType`
      cleaned = cleaned.replace(/\bas\s+const\b/g, '')
      cleaned = cleaned.replace(/\bas\s+[A-Z]\w*/g, '')
      const data = new Function(`return (${cleaned})`)() as any
      const tabs = new Function(`return (${stripComments(rawTabs)})`)() as Array<{ id: string; label: string }>

      const enrichedTabs = enrichTabs(tabs, data.diagrams || {}, text)

      rows.push({
        surah_number: data.number || n,
        name: data.name,
        arabic_name: data.arabicName,
        meaning: data.meaning,
        thesis: data.thesis || null,
        sciences_active: data.sciencesActive || [],
        heart_verse: data.heartVerse || null,
        audio: data.audio || null,
        full_text: data.fullText || null,
        diagrams: data.diagrams || {},
        tabs: enrichedTabs,
        content_nodes: data.contentNodes || [],
      })

      const diagramCount = Object.keys(data.diagrams || {}).length
      console.log(`✓ surah-${n} (${data.name}) — ${diagramCount} diagrams, ${tabs.length} tabs`)
    } catch (err: any) {
      console.error(`✗ surah-${n}: eval error — ${err.message}`)
      errors.push(`surah-${n}: ${err.message}`)
    }
  }

  console.log(`\n── Inserting ${rows.length} rows ──`)

  // Insert in batches of 20
  for (let i = 0; i < rows.length; i += 20) {
    const batch = rows.slice(i, i + 20)
    const { error } = await supabase.from('surah_visual_data').upsert(batch, { onConflict: 'surah_number' })
    if (error) {
      console.error(`Insert error (batch ${i / 20 + 1}):`, error.message)
      errors.push(`batch insert: ${error.message}`)
    } else {
      console.log(`  Batch ${i / 20 + 1}: ${batch.length} rows inserted`)
    }
  }

  // Validate
  const { count } = await supabase.from('surah_visual_data').select('*', { count: 'exact', head: true })
  console.log(`\n── Validation ──`)
  console.log(`Total rows: ${count}`)

  if (errors.length > 0) {
    console.log(`\n── Errors (${errors.length}) ──`)
    errors.forEach((e) => console.log(`  • ${e}`))
  }

  if (count === 114) {
    console.log('\n✓ All 114 surahs migrated successfully!')
  } else {
    console.log(`\n⚠ Expected 114 rows, got ${count}`)
  }
}

migrate().catch(console.error)
