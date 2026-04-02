#!/usr/bin/env npx tsx
/**
 * Voice V2: Updates published articles with revised content
 * that follows the Literary Voice Framework.
 *
 * Reads rewritten HTML files from scripts/rewrites/ and updates
 * the corresponding posts in Supabase by slug.
 *
 * Usage: npx tsx scripts/update-articles-voice-v2.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const REWRITES_DIR = join(__dirname, 'rewrites')

// Map filename → slug (filename is already the slug + .html)
function slugFromFile(filename: string): string {
  return filename.replace(/\.html$/, '')
}

async function updateArticle(slug: string, content_html: string) {
  console.log(`\nUpdating: "${slug}"`)

  // Count words for reading time estimate
  const textOnly = content_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  const wordCount = textOnly.split(' ').filter(Boolean).length
  const reading_time_minutes = Math.max(8, Math.round(wordCount / 200))

  const { data, error } = await supabase
    .from('posts')
    .update({ content_html, reading_time_minutes })
    .eq('slug', slug)
    .select('id, title')
    .single()

  if (error || !data) {
    console.error(`  Failed:`, error?.message || 'No matching post found')
    return false
  }

  console.log(`  Updated: "${data.title}" (ID: ${data.id}, ~${wordCount} words, ${reading_time_minutes} min read)`)
  return true
}

async function main() {
  console.log('=== Voice V2: Article Content Update ===\n')

  if (!existsSync(REWRITES_DIR)) {
    console.error('No rewrites directory found at', REWRITES_DIR)
    process.exit(1)
  }

  const files = readdirSync(REWRITES_DIR).filter(f => f.endsWith('.html'))
  console.log(`Found ${files.length} rewrite files\n`)

  let success = 0
  let failed = 0

  for (const file of files) {
    const slug = slugFromFile(file)
    const content = readFileSync(join(REWRITES_DIR, file), 'utf-8').trim()
    const ok = await updateArticle(slug, content)
    if (ok) success++
    else failed++
  }

  console.log(`\n=== Done: ${success} updated, ${failed} failed ===`)
}

main().catch(console.error)
