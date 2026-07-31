#!/usr/bin/env npx tsx
/**
 * insert-path-hub-articles.ts
 *
 * The guided paths at /paths route readers through hub pages, and an audit on
 * 2026-07-31 found three of those stops landing on hubs with no articles at
 * all: `tadabbur` (stop 1 of "Reading the Quran Differently"), `khushu`
 * (stop 1 of "Going Deeper") and `tawakkul` (the closing stop of "When Life
 * Breaks Apart"). The path wiring was fine; the destinations were empty.
 *
 * This script publishes the articles written to fill them. Drafts live in
 * scripts/drafts/<entity>/ with YAML frontmatter and an <article> body, the
 * same shape insert-dawud-facet-articles.ts reads.
 *
 * Validation status (recorded per article as it is added):
 *   tadabbur-never-a-command-quran
 *     verify_arabic          — 7 passages, all confirmed Quranic and matched to
 *                              the exact ayah cited, 0 fail
 *     verify_morphology      — 7 tagged root/POS claims, 7 verified, 0 fail
 *                              (corpus confirms all four form-V occurrences are
 *                              IMPF 3MP, and 32:5 is the form-II counterpart)
 *     cross_reference_tafsir — 7/7 ayahs covered in Ibn Kathir, al-Tabari,
 *                              al-Muyassar and al-Jalalayn
 *     voice + brand          — no anti-patterns, no scaffolding words, no
 *                              <strong> on interpretive claims, blockquote /
 *                              cite / font / colour structure conformant
 *
 * Idempotent: a slug that already exists is skipped, never double-inserted.
 *
 * Run with:  ./node_modules/.bin/tsx --env-file=.env.local scripts/insert-path-hub-articles.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const DRAFTS = [
  'scripts/drafts/tadabbur/tadabbur-never-a-command-quran.md',
  'scripts/drafts/tawakkul/tawakkul-after-the-decision-quran.md',
  'scripts/drafts/khushu/khushu-ground-before-rain-quran.md',
  'scripts/drafts/nazm/nazm-sentence-crosses-surah-boundary.md',
]

type Draft = {
  title: string
  slug: string
  excerpt: string
  seo_title: string
  seo_description: string
  tags: string[]
  reading_time_minutes: number
  entity_primary: string
  entity_secondary: string[]
  content_html: string
}

function parseDraft(path: string): Draft {
  const raw = readFileSync(path, 'utf8')

  const fm = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fm) throw new Error(`No frontmatter in ${path}`)

  const get = (key: string): string => {
    const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    if (!m) throw new Error(`Missing "${key}" in ${path}`)
    return m[1].trim().replace(/^["']|["']$/g, '')
  }
  const getArray = (key: string): string[] => {
    const m = fm[1].match(new RegExp(`^${key}:\\s*\\[(.*)\\]\\s*$`, 'm'))
    if (!m) return []
    return m[1]
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }

  const body = raw.match(/<article[^>]*>([\s\S]*?)<\/article>/)
  if (!body) throw new Error(`No <article> block in ${path}`)

  return {
    title: get('title'),
    slug: get('slug'),
    excerpt: get('excerpt'),
    seo_title: get('seo_title'),
    seo_description: get('seo_description'),
    tags: getArray('tags'),
    reading_time_minutes: parseInt(get('reading_time_minutes'), 10),
    entity_primary: get('entity_primary'),
    entity_secondary: getArray('entity_secondary'),
    content_html: `<article class="prose-blog">${body[1]}</article>`,
  }
}

async function entityIdFor(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
  if (!data) {
    console.error(`  ⚠️  entity "${slug}" not found — skipping tag`)
    return null
  }
  return data.id
}

async function main() {
  for (const path of DRAFTS) {
    const d = parseDraft(path)

    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', d.slug)
      .maybeSingle()

    if (existing) {
      console.log(`↩︎  ${d.slug} already exists (${existing.id}) — skipping`)
      continue
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        title: d.title,
        slug: d.slug,
        type: 'article',
        excerpt: d.excerpt,
        seo_title: d.seo_title,
        seo_description: d.seo_description,
        content_html: d.content_html,
        status: 'published',
        tags: d.tags,
        reading_time_minutes: d.reading_time_minutes,
        featured: false,
        published_at: new Date().toISOString(),
        created_by: ADMIN_USER_ID,
      })
      .select('id')
      .single()

    if (error || !post) {
      console.error(`❌ insert failed for ${d.slug}:`, error)
      continue
    }
    console.log(`✅ inserted ${d.slug} (${post.id})`)

    const tagPlan = [
      { slug: d.entity_primary, is_primary: true },
      ...d.entity_secondary.map((s) => ({ slug: s, is_primary: false })),
    ]

    for (const tag of tagPlan) {
      const entityId = await entityIdFor(tag.slug)
      if (!entityId) continue
      const { error: tagErr } = await supabase
        .from('entity_tags')
        .insert({ post_id: post.id, entity_id: entityId, is_primary: tag.is_primary })
      if (tagErr) console.error(`  ❌ tag ${tag.slug}:`, tagErr)
      else console.log(`  🏷  tagged ${tag.slug}${tag.is_primary ? ' (primary)' : ''}`)
    }
  }

  const { error: rpcErr } = await supabase.rpc('refresh_entity_co_occurrence')
  console.log(rpcErr ? `⚠️  co-occurrence refresh failed: ${rpcErr.message}` : '🔄 co-occurrence graph refreshed')
}

main()
