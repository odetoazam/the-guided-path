/**
 * Backfill the LENS tag (controlled vocabulary from src/lib/article-lenses.ts)
 * onto published articles, derived from existing tags and conservative title
 * heuristics. An article that matches no rule is left untouched — a missing
 * lens chip is better than a wrong one.
 *
 * Usage:
 *   node scripts/backfill-article-lenses.mjs           # dry run, prints plan
 *   node scripts/backfill-article-lenses.mjs --write   # applies to DB
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

// load .env.local
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_0-9]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

const LENSES = [
  'question-explainer', 'name-breakdown', 'root-study', 'connection-reveal',
  'contested-doorway', 'grammar-reveal', 'structure-nazm', 'cross-story',
  'scene', 'rhetorical-device',
]
const LENS_SET = new Set(LENSES)

// free-form tags that are unambiguous aliases of a lens
const TAG_ALIASES = {
  ikhtilaf: 'contested-doorway',
  'word-study': 'root-study',
  'linguistic-analysis': 'root-study',
}

const QUESTION_START = /^(why|what|how|does|do|is|are|can|who|which|when|where|should)\b/i

function classify(post, primaryCategory) {
  const tags = post.tags || []
  const existing = tags.find(t => LENS_SET.has(t))
  if (existing) return { lens: existing, rule: 'already-tagged' }

  for (const t of tags) {
    if (TAG_ALIASES[t]) return { lens: TAG_ALIASES[t], rule: `alias:${t}` }
  }

  const title = post.title || ''
  if (/\?/.test(title) || QUESTION_START.test(title)) {
    return { lens: 'question-explainer', rule: 'title-question' }
  }
  if (/\bgrammar\b/i.test(title)) return { lens: 'grammar-reveal', rule: 'title-grammar' }
  if (/\broot\b/i.test(title)) return { lens: 'root-study', rule: 'title-root' }
  if (primaryCategory === 'divine_names') {
    return { lens: 'name-breakdown', rule: 'divine-name-default' }
  }
  return { lens: null, rule: 'no-signal' }
}

const write = process.argv.includes('--write')
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

let all = []
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb
    .from('posts')
    .select('id, slug, title, tags, entity_tags(is_primary, entities:entity_id(category))')
    .eq('status', 'published')
    .eq('type', 'article')
    .range(from, from + 999)
  if (error) { console.error(error); process.exit(1) }
  all = all.concat(data)
  if (data.length < 1000) break
}

const byRule = {}
const byLens = {}
const updates = []
for (const p of all) {
  const cat = (p.entity_tags || []).find(t => t.is_primary && t.entities)?.entities?.category
  const { lens, rule } = classify(p, cat)
  byRule[rule] = (byRule[rule] || 0) + 1
  if (lens) byLens[lens] = (byLens[lens] || 0) + 1
  if (lens && rule !== 'already-tagged') {
    updates.push({ id: p.id, slug: p.slug, lens, rule, tags: [lens, ...(p.tags || [])] })
  }
}

console.log(`${all.length} published articles`)
console.log('by rule:', byRule)
console.log('lens coverage after backfill:', byLens, `(${all.length - Object.values(byLens).reduce((a, b) => a + b, 0)} without lens)`)
console.log(`\n${updates.length} posts to update`)
for (const u of updates.slice(0, 15)) console.log(`  ${u.lens.padEnd(20)} ${u.rule.padEnd(22)} ${u.slug}`)
if (updates.length > 15) console.log(`  … and ${updates.length - 15} more`)

if (!write) { console.log('\nDRY RUN — pass --write to apply'); process.exit(0) }

let done = 0
for (const u of updates) {
  const { error } = await sb.from('posts').update({ tags: u.tags }).eq('id', u.id)
  if (error) { console.error(u.slug, error.message); process.exit(1) }
  done++
}
console.log(`\nupdated ${done} posts`)
