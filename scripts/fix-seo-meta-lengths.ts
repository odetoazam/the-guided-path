#!/usr/bin/env npx tsx
/**
 * fix-seo-meta-lengths.ts
 *
 * SEO audit (2026-07-24) found, across 322 live pages:
 *   167 with an effective meta description > 160 chars (Google truncates)
 *    71 with an effective meta title > 60 chars (truncated in SERP)
 *
 * "Effective" = seo_description || excerpt, and seo_title || title, matching the
 * fallback logic in generateMetadata().
 *
 * This script SHORTENS existing text only. It never invents new copy — every
 * output is a prefix of text a human already wrote, cut at a sentence or word
 * boundary. Titles prefer cutting at a colon/dash so they end cleanly.
 *
 * Usage:
 *   npx tsx scripts/fix-seo-meta-lengths.ts           # dry run, prints samples
 *   npx tsx scripts/fix-seo-meta-lengths.ts --apply   # writes to DB
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const APPLY = process.argv.includes('--apply')
const DESC_MAX = 160
const TITLE_MAX = 60

/** Trim a description to <= max, preferring a clean sentence end. */
function trimDescription(text: string, max = DESC_MAX): string {
  const t = text.trim().replace(/\s+/g, ' ')
  if (t.length <= max) return t

  // Prefer ending at a sentence terminator that lands in a good range.
  const window = t.slice(0, max)
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '),
    window.endsWith('.') ? window.length - 1 : -1
  )
  if (sentenceEnd >= 110) return t.slice(0, sentenceEnd + 1).trim()

  // Otherwise cut at the last word boundary and add an ellipsis.
  const cut = t.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[,;:—–-]$/, '').trim() + '…'
}

/**
 * Trim a title to <= max — but ONLY when the result is clean.
 *
 * A literary title cut mid-phrase with an ellipsis reads worse than a title
 * Google merely truncates visually (the full text still counts for relevance).
 * So: split at a colon/dash if that yields a good standalone title; otherwise
 * return null and leave the title untouched.
 */
function trimTitle(text: string, max = TITLE_MAX): string | null {
  const t = text.trim().replace(/\s+/g, ' ')
  if (t.length <= max) return null

  for (const sep of [': ', ' — ', ' – ', ' - ', ' | ']) {
    const i = t.indexOf(sep)
    if (i >= 25 && i <= max) return t.slice(0, i).trim()
  }
  // Only accept a word-boundary cut when the title is far over the limit and
  // the cut still leaves a substantial phrase.
  if (t.length > 75) {
    const cut = t.slice(0, max - 1)
    const lastSpace = cut.lastIndexOf(' ')
    if (lastSpace >= 40) return cut.slice(0, lastSpace).replace(/[,;:—–-]$/, '').trim() + '…'
  }
  return null
}

async function fetchAll(table: string, sel: string) {
  const out: any[] = []
  let from = 0
  for (;;) {
    const { data, error } = await supabase.from(table).select(sel).range(from, from + 999)
    if (error) { console.error(error); break }
    out.push(...(data ?? []))
    if (!data || data.length < 1000) break
    from += 1000
  }
  return out
}

async function main() {
  const posts = await fetchAll('posts', 'id,slug,title,seo_title,seo_description,excerpt,status,type')
  const live = posts.filter((p: any) => p.status === 'published' && (p.type === 'article' || p.type === 'surah'))

  const updates: { id: string; slug: string; seo_title?: string; seo_description?: string; before: any }[] = []

  for (const p of live as any[]) {
    const effTitle = p.seo_title || p.title
    const effDesc = p.seo_description || p.excerpt || ''
    const patch: any = {}
    const before: any = {}

    if (effTitle.length > TITLE_MAX) {
      const nt = trimTitle(effTitle)
      if (nt && nt.length >= 25 && nt !== effTitle) { patch.seo_title = nt; before.title = effTitle }
    }
    if (effDesc.length > DESC_MAX) {
      const nd = trimDescription(effDesc)
      if (nd.length >= 80 && nd !== effDesc) { patch.seo_description = nd; before.desc = effDesc }
    }
    if (Object.keys(patch).length) updates.push({ id: p.id, slug: p.slug, ...patch, before })
  }

  console.log(`pages needing meta trim: ${updates.length}\n`)
  console.log('── SAMPLE (first 6) ──')
  for (const u of updates.slice(0, 6)) {
    console.log(`\n${u.slug}`)
    if (u.seo_title) console.log(`  TITLE ${u.before.title.length} → ${u.seo_title.length}\n    "${u.seo_title}"`)
    if (u.seo_description) console.log(`  DESC  ${u.before.desc.length} → ${u.seo_description.length}\n    "${u.seo_description}"`)
  }

  if (!APPLY) { console.log('\n(dry run — pass --apply to write)'); return }

  let ok = 0, fail = 0
  for (const u of updates) {
    const patch: any = {}
    if (u.seo_title) patch.seo_title = u.seo_title
    if (u.seo_description) patch.seo_description = u.seo_description
    const { error } = await supabase.from('posts').update(patch).eq('id', u.id)
    error ? (fail++, console.error(`❌ ${u.slug}: ${error.message}`)) : ok++
  }
  console.log(`\n✅ updated ${ok}${fail ? `  ❌ failed ${fail}` : ''}`)
}

main()
