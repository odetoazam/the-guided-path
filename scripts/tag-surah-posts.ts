#!/usr/bin/env npx tsx

/**
 * Auto-tags published surah posts with entities from the `entities` table.
 *
 * For each surah post, searches content_html (and title) for entity mentions
 * by transliteration (case-insensitive) and Arabic name (with and without
 * diacritics). Inserts into entity_tags with is_primary based on frequency.
 *
 * Usage: npx tsx scripts/tag-surah-posts.ts [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
  process.exit(1)
}
const DRY_RUN = process.argv.includes('--dry-run')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ── Arabic diacritics stripping ───────────────────────────────────────────────

/** Unicode codepoints for Arabic tashkeel / diacritical marks */
const TASHKEEL_RE = /[\u064B-\u0655\u0670\u0674\u0675]/g
//  ً  ٌ  ٍ  َ  ُ  ِ  ّ  ْ  (064B-0652)
//  ٓ (0653)  ٔ (0654)  ٕ (0655)
//  ٰ (0670)  ٴ (0674)  ٵ (0675)

function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL_RE, '')
}

// ── HTML stripping ────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ')
}

// ── Counting helper ───────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Count non-overlapping occurrences of `needle` in `haystack`.
 * If `caseInsensitive` is true, match is case-insensitive.
 * If `wordBoundary` is true, only match whole words (prevents "uns" matching "counsel").
 */
function countOccurrences(
  haystack: string,
  needle: string,
  caseInsensitive = false,
  wordBoundary = false,
): number {
  if (!needle || needle.length === 0) return 0
  const flags = caseInsensitive ? 'gi' : 'g'
  const escaped = escapeRegex(needle)
  const pattern = wordBoundary ? `\\b${escaped}\\b` : escaped
  const matches = haystack.match(new RegExp(pattern, flags))
  return matches ? matches.length : 0
}

// Categories that are meta/methodological — not topical content tags
const EXCLUDED_CATEGORIES = new Set(['study_terms'])

// ── Types ─────────────────────────────────────────────────────────────────────

interface Entity {
  id: string
  slug: string
  name_arabic: string
  name_translit: string
  category: string
}

interface SurahPost {
  id: string
  title: string
  content_html: string
  surah_number: number
}

interface TagRow {
  entity_id: string
  post_id: string
  is_primary: boolean
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== Tag Surah Posts with Entities ===\n')
  if (DRY_RUN) console.log('** DRY RUN — no writes **\n')

  // 1. Fetch all entities
  const { data: entities, error: entitiesErr } = await supabase
    .from('entities')
    .select('id, slug, name_arabic, name_translit, category')

  if (entitiesErr || !entities) {
    console.error('Failed to fetch entities:', entitiesErr)
    process.exit(1)
  }
  console.log(`Fetched ${entities.length} entities`)

  // 2. Fetch all published surah posts
  const { data: posts, error: postsErr } = await supabase
    .from('posts')
    .select('id, title, content_html, surah_number')
    .eq('type', 'surah')
    .eq('status', 'published')
    .order('surah_number', { ascending: true })

  if (postsErr || !posts) {
    console.error('Failed to fetch surah posts:', postsErr)
    process.exit(1)
  }
  console.log(`Fetched ${posts.length} published surah posts\n`)

  // 3. Match entities against each post
  const allTags: TagRow[] = []
  let totalPrimary = 0
  let totalSecondary = 0

  for (const post of posts as SurahPost[]) {
    const plainText = stripHtml(post.content_html)
    const plainTextStripped = stripTashkeel(plainText)
    const titleLower = post.title.toLowerCase()
    const postTags: { entity: Entity; isPrimary: boolean; count: number }[] = []

    for (const entity of entities as Entity[]) {
      // Skip meta categories — study_terms are about methodology, not content topics
      if (EXCLUDED_CATEGORIES.has(entity.category)) continue

      let count = 0

      // Transliteration match (case-insensitive, WORD BOUNDARY) in body
      // Word boundary prevents "Uns" matching "counsel", "thousands", etc.
      count += countOccurrences(plainText, entity.name_translit, true, true)

      // Arabic match (exact with diacritics) — no word boundary needed for Arabic
      if (entity.name_arabic) {
        count += countOccurrences(plainText, entity.name_arabic)
      }

      // Arabic match (stripped diacritics — fuzzy)
      if (entity.name_arabic) {
        const strippedArabic = stripTashkeel(entity.name_arabic)
        if (strippedArabic !== entity.name_arabic) {
          const exactCount = countOccurrences(plainText, entity.name_arabic)
          const fuzzyCount = countOccurrences(plainTextStripped, strippedArabic)
          const additionalFuzzy = Math.max(0, fuzzyCount - exactCount)
          count += additionalFuzzy
        }
      }

      if (count === 0) continue

      // Check title for transliteration or Arabic mention
      const inTitle =
        titleLower.includes(entity.name_translit.toLowerCase()) ||
        (entity.name_arabic && post.title.includes(entity.name_arabic)) ||
        (entity.name_arabic && stripTashkeel(post.title).includes(stripTashkeel(entity.name_arabic)))

      const isPrimary = count >= 3 || !!inTitle

      postTags.push({ entity, isPrimary, count })
      allTags.push({
        entity_id: entity.id,
        post_id: post.id,
        is_primary: isPrimary,
      })

      if (isPrimary) totalPrimary++
      else totalSecondary++
    }

    if (postTags.length > 0) {
      const primaryList = postTags
        .filter((t) => t.isPrimary)
        .map((t) => `${t.entity.name_translit}(${t.count})`)
        .join(', ')
      const secondaryList = postTags
        .filter((t) => !t.isPrimary)
        .map((t) => `${t.entity.name_translit}(${t.count})`)
        .join(', ')

      console.log(
        `Surah ${String(post.surah_number).padStart(3, '0')}: ` +
          `${postTags.length} entities — ` +
          `PRIMARY [${primaryList || 'none'}] ` +
          `SECONDARY [${secondaryList || 'none'}]`,
      )
    } else {
      console.log(`Surah ${String(post.surah_number).padStart(3, '0')}: no entity matches`)
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Total tags to insert: ${allTags.length}`)
  console.log(`  Primary:   ${totalPrimary}`)
  console.log(`  Secondary: ${totalSecondary}`)
  console.log(`  Posts with tags: ${new Set(allTags.map((t) => t.post_id)).size}/${posts.length}`)

  if (DRY_RUN) {
    console.log('\nDry run complete. No rows written.')
    return
  }

  // 4. Upsert in batches of 100
  const BATCH_SIZE = 100
  let upserted = 0

  for (let i = 0; i < allTags.length; i += BATCH_SIZE) {
    const batch = allTags.slice(i, i + BATCH_SIZE)
    const { data, error } = await supabase
      .from('entity_tags')
      .upsert(batch, { onConflict: 'entity_id,post_id' })
      .select('id')

    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error)
      process.exit(1)
    }

    upserted += data?.length ?? 0
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${data?.length ?? 0} rows upserted`)
  }

  // Verify
  const { count } = await supabase
    .from('entity_tags')
    .select('*', { count: 'exact', head: true })
    .not('post_id', 'is', null)

  console.log(`\nDone. ${upserted} tags upserted. ${count} total post entity_tags in database.`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
