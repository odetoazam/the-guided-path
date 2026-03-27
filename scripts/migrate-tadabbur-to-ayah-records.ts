#!/usr/bin/env npx tsx

/**
 * migrate-tadabbur-to-ayah-records.ts
 *
 * Migrates markdown tadabbur files from content/tadabbur/ into the
 * ayah_records table in Supabase.
 *
 * Usage:
 *   npx tsx scripts/migrate-tadabbur-to-ayah-records.ts             # live run
 *   npx tsx scripts/migrate-tadabbur-to-ayah-records.ts --dry-run   # preview only
 *
 * Requires: gray-matter (npm install gray-matter)
 * Env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DRY_RUN = process.argv.includes('--dry-run')
const BATCH_SIZE = 20
const CONTENT_DIR = path.resolve(__dirname, '..', 'content', 'tadabbur')

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Frontmatter {
  surah: number
  surah_name: string
  ayah?: number
  ayahs?: string | number | number[]
  title?: string
  arabic?: string
  arabic_range?: string
  translation?: string
  word_count?: number
  estimated_duration?: string
  passage_context?: string
  passage_rationale?: string
  generated_by?: string
  validated?: boolean
  validation_date?: string
  scholarly_note?: string
  [key: string]: unknown  // for arabic_N, translation_N patterns
}

interface AyahRecord {
  surah_number: number
  ayah_start: number
  ayah_end: number
  arabic_text: string
  translation: string
  layer_a: {
    grounding_table: string
    linguistic_html: string
  }
  layer_b: {
    reflection_html: string
  }
  title: string | null
  word_count: number | null
  estimated_duration: string | null
  passage_context: string | null
  status: 'published' | 'draft'
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse ayah range from frontmatter. Handles all variants:
 * - `ayah: 5`           → { start: 5, end: 5 }
 * - `ayahs: "51-52"`    → { start: 51, end: 52 }
 * - `ayahs: "60"`       → { start: 60, end: 60 }  (single ayah as string)
 * - `ayahs: 60`         → { start: 60, end: 60 }  (single ayah as number)
 * - `ayahs: [2,3,4,5]`  → { start: 2, end: 5 }   (YAML array)
 */
function parseAyahRange(fm: Frontmatter): { start: number; end: number } | null {
  if (typeof fm.ayah === 'number') {
    return { start: fm.ayah, end: fm.ayah }
  }
  if (Array.isArray(fm.ayahs)) {
    const nums = fm.ayahs.map(Number).filter((n) => !isNaN(n))
    if (nums.length > 0) {
      return { start: Math.min(...nums), end: Math.max(...nums) }
    }
  }
  if (typeof fm.ayahs === 'number') {
    return { start: fm.ayahs, end: fm.ayahs }
  }
  if (typeof fm.ayahs === 'string') {
    const rangeMatch = fm.ayahs.match(/^(\d+)-(\d+)$/)
    if (rangeMatch) {
      return { start: parseInt(rangeMatch[1], 10), end: parseInt(rangeMatch[2], 10) }
    }
    const singleMatch = fm.ayahs.match(/^(\d+)$/)
    if (singleMatch) {
      const n = parseInt(singleMatch[1], 10)
      return { start: n, end: n }
    }
  }
  return null
}

/**
 * Extract arabic text from frontmatter. Handles:
 * - `arabic: "..."` — single field
 * - `arabic_range: "..."` — range variant
 * - `arabic_3: "...", arabic_4: "..."` — per-ayah fields
 */
function extractArabic(fm: Frontmatter, range: { start: number; end: number }): string | null {
  if (fm.arabic) return fm.arabic
  if (fm.arabic_range) return fm.arabic_range
  // Try per-ayah fields: arabic_3, arabic_4, etc.
  const parts: string[] = []
  for (let i = range.start; i <= range.end; i++) {
    const val = fm[`arabic_${i}`]
    if (typeof val === 'string') parts.push(val)
  }
  return parts.length > 0 ? parts.join(' ') : null
}

/**
 * Extract translation from frontmatter. Handles:
 * - `translation: "..."` — single field
 * - `translation_3: "...", translation_4: "..."` — per-ayah fields
 */
function extractTranslation(fm: Frontmatter, range: { start: number; end: number }): string | null {
  if (fm.translation) return fm.translation
  const parts: string[] = []
  for (let i = range.start; i <= range.end; i++) {
    const val = fm[`translation_${i}`]
    if (typeof val === 'string') parts.push(val)
  }
  return parts.length > 0 ? parts.join(' ') : null
}

/**
 * Extract the HTML comment block at the top of the body (between <!-- and -->).
 * Returns the content inside the comment (without the delimiters).
 */
function extractGroundingTable(body: string): string {
  // Match everything from the first <!-- to the closing --> before the morphology tags,
  // plus any morphology comment tags that follow.
  const lines = body.split('\n')
  let inComment = false
  const commentLines: string[] = []
  let foundFirst = false

  for (const line of lines) {
    if (!foundFirst && line.trim().startsWith('<!--') && !line.trim().startsWith('<!-- morphology')) {
      inComment = true
      foundFirst = true
      commentLines.push(line)
      if (line.includes('-->')) {
        inComment = false
      }
      continue
    }
    if (inComment) {
      commentLines.push(line)
      if (line.includes('-->')) {
        inComment = false
      }
      continue
    }
    // Also capture morphology tags (they are standalone HTML comments)
    if (foundFirst && line.trim().startsWith('<!-- morphology:')) {
      commentLines.push(line)
      continue
    }
    // Stop once we hit a non-comment, non-blank line after the comment block
    if (foundFirst && !inComment && line.trim() !== '' && !line.trim().startsWith('<!-- morphology:')) {
      break
    }
    if (foundFirst && !inComment && line.trim() === '') {
      commentLines.push(line)
    }
  }

  return commentLines.join('\n').trim()
}

/**
 * Split body into layer_a (Part 1 / Linguistic Journey) and layer_b (Part 2 / Thematic Depths).
 *
 * Strategy:
 * - Everything from the start up to (and including) Part 1 content → layer_a linguistic_html
 * - Everything from Part 2 heading onward → layer_b reflection_html
 * - The HTML comment block → layer_a grounding_table (extracted separately)
 */
function splitLayers(body: string): {
  grounding_table: string
  linguistic_html: string
  reflection_html: string
} {
  const grounding_table = extractGroundingTable(body)

  // Find Part 2 / Thematic Depths boundary
  const part2Patterns = [
    /^## Part 2[:\s]/m,
    /^## .*Thematic Depth/mi,
  ]

  let part2Index = -1
  for (const pattern of part2Patterns) {
    const match = body.match(pattern)
    if (match && match.index !== undefined) {
      part2Index = match.index
      break
    }
  }

  let linguistic_html: string
  let reflection_html: string

  if (part2Index !== -1) {
    // Strip grounding comment block from the linguistic section to avoid duplication
    const rawLinguistic = body.slice(0, part2Index).trim()
    linguistic_html = stripGroundingComment(rawLinguistic)
    reflection_html = body.slice(part2Index).trim()
  } else {
    // No Part 2 found — all content goes to layer_a
    const rawLinguistic = body.trim()
    linguistic_html = stripGroundingComment(rawLinguistic)
    reflection_html = ''
  }

  return { grounding_table, linguistic_html, reflection_html }
}

/**
 * Remove the leading HTML comment block (grounding table + morphology tags) from text.
 * This avoids duplication since grounding_table is stored separately.
 */
function stripGroundingComment(text: string): string {
  const lines = text.split('\n')
  let inComment = false
  let foundFirst = false
  let endIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()

    if (!foundFirst && trimmed.startsWith('<!--') && !trimmed.startsWith('<!-- morphology')) {
      inComment = true
      foundFirst = true
      if (trimmed.includes('-->')) {
        inComment = false
      }
      endIndex = i + 1
      continue
    }
    if (inComment) {
      endIndex = i + 1
      if (trimmed.includes('-->')) {
        inComment = false
      }
      continue
    }
    if (foundFirst && !inComment && trimmed.startsWith('<!-- morphology:')) {
      endIndex = i + 1
      continue
    }
    if (foundFirst && !inComment && trimmed === '') {
      endIndex = i + 1
      continue
    }
    if (foundFirst && !inComment) {
      break
    }
  }

  if (!foundFirst) return text

  // Remove leading --- (horizontal rule) that often follows the comment block
  const remaining = lines.slice(endIndex)
  const firstNonEmpty = remaining.findIndex((l) => l.trim() !== '')
  if (firstNonEmpty !== -1 && remaining[firstNonEmpty].trim() === '---') {
    return remaining.slice(firstNonEmpty + 1).join('\n').trim()
  }

  return remaining.join('\n').trim()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`  Tadabbur → ayah_records migration`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`)
  console.log(`${'='.repeat(60)}\n`)

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`)
    process.exit(1)
  }

  const surahDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()

  const allRecords: AyahRecord[] = []
  let totalSkipped = 0
  let totalErrors = 0

  for (const dirName of surahDirs) {
    const dirPath = path.join(CONTENT_DIR, dirName)
    const files = fs.readdirSync(dirPath)
      .filter((f) => f.endsWith('.md'))
      .sort()

    let processed = 0
    let skipped = 0
    const errors: string[] = []

    for (const file of files) {
      const basename = path.parse(file).name

      // Skip tafsir files
      if (basename.startsWith('tafsir')) {
        skipped++
        continue
      }

      // Only process ayah-* and ayahs-* files
      if (!basename.startsWith('ayah')) {
        skipped++
        continue
      }

      const filePath = path.join(dirPath, file)
      const raw = fs.readFileSync(filePath, 'utf-8')

      let parsed: matter.GrayMatterFile<string>
      try {
        parsed = matter(raw)
      } catch (e) {
        errors.push(`  [ERROR] Failed to parse frontmatter: ${file} — ${e}`)
        continue
      }

      const fm = parsed.data as Frontmatter

      // Only include validated files
      if (!fm.validated) {
        skipped++
        continue
      }

      // Validate surah number
      if (!fm.surah) {
        errors.push(`  [ERROR] Missing surah number: ${file}`)
        continue
      }

      // Parse ayah range
      const range = parseAyahRange(fm)
      if (!range) {
        errors.push(`  [ERROR] Cannot determine ayah range: ${file}`)
        continue
      }

      // Extract arabic and translation (handles multiple frontmatter formats)
      const arabicText = extractArabic(fm, range)
      const translationText = extractTranslation(fm, range)
      if (!arabicText || !translationText) {
        errors.push(`  [ERROR] Missing arabic or translation: ${file}`)
        continue
      }

      // Validate CHECK constraint: ayah_end - ayah_start < 10
      if (range.end - range.start >= 10) {
        errors.push(`  [ERROR] Passage too long (${range.end - range.start + 1} ayahs, max 10): ${file}`)
        continue
      }

      // Split content into layers
      const { grounding_table, linguistic_html, reflection_html } = splitLayers(parsed.content)

      const record: AyahRecord = {
        surah_number: fm.surah,
        ayah_start: range.start,
        ayah_end: range.end,
        arabic_text: arabicText,
        translation: translationText,
        layer_a: {
          grounding_table,
          linguistic_html,
        },
        layer_b: {
          reflection_html,
        },
        title: fm.title ?? null,
        word_count: fm.word_count ?? null,
        estimated_duration: fm.estimated_duration ?? null,
        passage_context: fm.passage_context ?? fm.passage_rationale ?? null,
        status: fm.validated ? 'published' : 'draft',
      }

      allRecords.push(record)
      processed++
    }

    console.log(`[${dirName}] ${processed} processed, ${skipped} skipped`)
    if (errors.length > 0) {
      errors.forEach((e) => console.log(e))
      totalErrors += errors.length
    }
    totalSkipped += skipped
  }

  console.log(`\nTotal: ${allRecords.length} records to upsert, ${totalSkipped} skipped, ${totalErrors} errors\n`)

  if (DRY_RUN) {
    console.log('[DRY RUN] Sample records:')
    for (const r of allRecords.slice(0, 3)) {
      console.log(`  Surah ${r.surah_number}, Ayah ${r.ayah_start}-${r.ayah_end}: "${r.title}"`)
      console.log(`    layer_a grounding_table: ${r.layer_a.grounding_table.length} chars`)
      console.log(`    layer_a linguistic_html: ${r.layer_a.linguistic_html.length} chars`)
      console.log(`    layer_b reflection_html: ${r.layer_b.reflection_html.length} chars`)
    }
    console.log('\n[DRY RUN] No writes performed.')
    return
  }

  // Batch upsert
  let upserted = 0
  let failed = 0

  for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
    const batch = allRecords.slice(i, i + BATCH_SIZE)

    const { data, error } = await supabase
      .from('ayah_records')
      .upsert(batch, { onConflict: 'surah_number,ayah_start,ayah_end' })
      .select('id')

    if (error) {
      console.error(`[BATCH ${Math.floor(i / BATCH_SIZE) + 1}] Upsert error:`, error.message)
      failed += batch.length
    } else {
      upserted += data?.length ?? batch.length
      console.log(`[BATCH ${Math.floor(i / BATCH_SIZE) + 1}] Upserted ${data?.length ?? batch.length} records`)
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`  Done: ${upserted} upserted, ${failed} failed`)
  console.log(`${'='.repeat(60)}\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
