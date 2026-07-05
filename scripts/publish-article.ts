/**
 * Generic AyahGuide article publisher.
 * Usage: tsx scripts/publish-article.ts <meta.json>
 * meta.json shape: { slug, title, excerpt, seo_title, seo_description, tags[],
 *   quran_refs[], reading_time_minutes, html_path, entity_tags:[{slug,is_primary}] }
 */
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)
const ADMIN = '5814582a-9f09-473a-be6f-619c210cca8e'

async function main() {
  const metaPath = process.argv[2]
  if (!metaPath) { console.error('need meta.json path'); process.exit(1) }
  const m = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  const contentHtml = fs.readFileSync(m.html_path, 'utf8').trim()
  const now = new Date().toISOString()

  const record: any = {
    title: m.title,
    slug: m.slug,
    excerpt: m.excerpt,
    content_html: contentHtml,
    content_json: {},
    status: 'published',
    type: 'article',
    seo_title: m.seo_title,
    seo_description: m.seo_description,
    tags: m.tags,
    quran_refs: m.quran_refs,
    reading_time_minutes: m.reading_time_minutes,
    featured: false,
    published_at: now,
    publish_date: now,
    created_by: ADMIN,
  }

  const { data: existing } = await supabase.from('posts').select('id').eq('slug', m.slug).maybeSingle()
  let postId: string
  if (existing) {
    const { error } = await supabase.from('posts').update({ ...record, updated_at: now }).eq('id', existing.id)
    if (error) { console.error('Update error:', error); process.exit(1) }
    postId = existing.id
    console.log('Updated:', postId)
  } else {
    const { data, error } = await supabase.from('posts').insert(record).select('id').single()
    if (error) { console.error('Insert error:', error); process.exit(1) }
    postId = data.id
    console.log('Published:', postId, '→ /posts/' + m.slug)
  }

  await supabase.from('entity_tags').delete().eq('post_id', postId)
  for (const tag of (m.entity_tags || [])) {
    const { data: entity } = await supabase.from('entities').select('id').eq('slug', tag.slug).maybeSingle()
    if (!entity) { console.warn('  ⚠ entity missing:', tag.slug); continue }
    const { error } = await supabase.from('entity_tags').insert({ post_id: postId, entity_id: entity.id, is_primary: tag.is_primary })
    if (error) console.warn('  ⚠ tag', tag.slug, error.message)
    else console.log('  tagged', tag.slug, tag.is_primary ? '(primary)' : '')
  }
  const { error: rpc } = await supabase.rpc('refresh_entity_co_occurrence')
  console.log(rpc ? '  ⚠ co-occ: ' + rpc.message : '  co-occurrence refreshed')
}
main()
