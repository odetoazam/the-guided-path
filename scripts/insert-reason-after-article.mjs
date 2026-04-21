import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const contentHtml = readFileSync('/tmp/story-test/reason-after-article.html', 'utf-8')

const { data: entities } = await supabase.from('entities').select('id, slug').in('slug', ['shaytan', 'iblis', 'bani-israil'])
console.log('Available entities:', entities?.map(e => e.slug))

const article = {
  title: 'The Reason That Arrived After the Decision',
  slug: 'reason-after-decision-iblis-bani-israil',
  type: 'article',
  excerpt: 'The Quran shows us two scenes — Iblis and Bani Isra\'il — where stated reasons and actual decisions point in opposite directions. A pattern for self-examination.',
  seo_title: 'The Reason That Arrived After the Decision — Iblis and Bani Isra\'il',
  seo_description: 'Two Quranic scenes reveal how stated reasons and actual decisions can diverge: Iblis announces his verdict before his reason; Bani Isra\'il reason elaborately, then walk the other way.',
  content_html: contentHtml,
  status: 'published',
  tags: ['iblis', 'shaytan', 'bani-israil', 'al-araf', 'al-baqarah', 'psychology', 'self-examination', 'quranic-stories', 'path:the-loop', 'path:what-youre-worth'],
  reading_time_minutes: 8,
  featured: false,
  published_at: new Date().toISOString(),
  created_by: ADMIN_USER_ID,
}

const { data: post, error: postErr } = await supabase.from('posts').insert(article).select('id, slug').single()
if (postErr) { console.error('Insert failed:', postErr); process.exit(1) }
console.log('Inserted post:', post)

const entityTags = [
  { slug: 'shaytan', is_primary: true },
  { slug: 'bani-israil', is_primary: false },
]
for (const tag of entityTags) {
  const entity = entities?.find(e => e.slug === tag.slug)
  if (!entity) { console.log(`  ${tag.slug} not found — skipping`); continue }
  const { error } = await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: entity.id, is_primary: tag.is_primary })
  if (error) console.error(`  ${tag.slug} tag failed:`, error); else console.log(`  Tagged: ${tag.slug} (primary=${tag.is_primary})`)
}

const { error: refreshErr } = await supabase.rpc('refresh_entity_co_occurrence')
if (refreshErr) console.error('Refresh failed:', refreshErr); else console.log('Co-occurrence refreshed')
console.log(`\n✅ Published: https://ayahguide.com/posts/${post.slug}`)
