#!/usr/bin/env node
/**
 * Read-only: export published post bodies to plain-text files so
 * verify_claims.mjs can sweep them. Articles are the surface where the
 * divine-name count bug actually reached readers, and nothing has ever
 * checked their prose claims against the corpus.
 *
 *   node scripts/export-posts-for-claim-audit.mjs <out_dir>
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config({ path: '.env.local' })

const outDir = process.argv[2]
if (!outDir) { console.error('usage: … <out_dir>'); process.exit(2) }
fs.mkdirSync(outDir, { recursive: true })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Paginate: PostgREST caps at 1000 rows per request and has silently
// truncated audits here before.
const rows = []
const PAGE = 500
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, surah_number, content_html, status')
    .eq('status', 'published')
    .range(from, from + PAGE - 1)
  if (error) { console.error('fetch failed:', error.message); process.exit(2) }
  rows.push(...data)
  if (data.length < PAGE) break
}

const strip = (html) => (html || '')
  .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, '\n\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
  .replace(/[ \t]+/g, ' ')
  .replace(/\n{3,}/g, '\n\n')

let n = 0
const index = []
for (const r of rows) {
  const text = strip(r.content_html)
  if (!text.trim()) continue
  const safe = (r.slug || `post-${n}`).replace(/[^a-z0-9-]/gi, '_')
  const file = path.join(outDir, `${safe}.txt`)
  fs.writeFileSync(file, `${r.title}\n\n${text}\n`, 'utf8')
  index.push({ file, slug: r.slug, surah: r.surah_number })
  n++
}
fs.writeFileSync(path.join(outDir, '_index.json'), JSON.stringify(index, null, 1))
console.log(`exported ${n} published posts (of ${rows.length} fetched) to ${outDir}`)
