#!/usr/bin/env npx tsx
/**
 * insert-dawud-facet-articles.ts
 *
 * Inserts the three Dawud facet articles (the free funnel tier for the Dawud
 * pilot course — each doubles as a Level-1 course station):
 *   1. dawud-jalut-victory-quran      — the giant (2:251) + the dafʿ principle
 *   2. dawud-iron-work-worship-quran  — the softened iron (34:11), work as worship
 *   3. dawud-khalifa-hawa-quran       — the khalifa charge (38:26) and hawa
 *
 * Validation status at time of writing (2026-07-24):
 *   verify_arabic      — 11 ayah quotes, 0 fail across all three
 *   verify_morphology  — 20 tagged root/POS claims, 20 verified, 0 fail
 *   cross_reference_tafsir — reports generated per article; every interpretive
 *                            claim grounded in Ibn Kathir / al-Tabari /
 *                            al-Muyassar / al-Jalalayn
 *   voice + brand check — anti-patterns clean, negations within budget,
 *                         blockquote/cite/font/color structure conformant
 *
 * Run with:  set -a && source .env.local && set +a && npx tsx scripts/insert-dawud-facet-articles.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const DRAFTS_DIR = '/Users/azamkhan/the-guided-path/scripts/drafts/dawud'

const SLUGS = [
  'dawud-jalut-victory-quran',
  'dawud-iron-work-worship-quran',
  'dawud-khalifa-hawa-quran',
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

/** Minimal frontmatter reader — the drafts use flat scalar/array values only. */
function parseDraft(fileSlug: string): Draft {
  const raw = readFileSync(join(DRAFTS_DIR, `${fileSlug}.md`), 'utf8')

  const fm = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fm) throw new Error(`No frontmatter in ${fileSlug}`)

  const get = (key: string): string => {
    const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    if (!m) throw new Error(`Missing "${key}" in ${fileSlug}`)
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
  if (!body) throw new Error(`No <article> block in ${fileSlug}`)

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
  const { data, error } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', slug)
    .single()
  if (error || !data) {
    console.error(`  ⚠️  entity "${slug}" not found — skipping tag`)
    return null
  }
  return data.id
}

async function main() {
  const drafts = SLUGS.map(parseDraft)

  for (const d of drafts) {
    // Idempotency: never double-insert a slug.
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
  if (rpcErr) console.error('⚠️  refresh_entity_co_occurrence failed:', rpcErr)
  else console.log('🔄 co-occurrence graph refreshed')

  console.log(
    '\nNext: re-run the Dawud hub synthesis (now 6 articles), then update\n' +
      'scripts/article-backlog.md + docs/knowledge-state.md.'
  )
}

main()
