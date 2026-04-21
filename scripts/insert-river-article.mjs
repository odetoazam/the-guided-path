import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const contentHtml = readFileSync('/tmp/story-test/river-article.html', 'utf-8')

const article = {
  title: 'The River That Decided the Battle',
  slug: 'talut-river-test-baqarah-249',
  type: 'article',
  excerpt: 'Before Jalut\'s army, Allah tested Talut\'s forces with a river. Most of them failed before they ever saw the enemy.',
  seo_title: 'The River Before the Battle: Talut in the Quran',
  seo_description: 'Before Jalut\'s army, a river. Allah tested Talut\'s forces with a handful of water — and the battle was decided before the fight began. Al-Baqarah 2:249.',
  content_html: contentHtml,
  status: 'published',
  tags: ['dawud', 'talut', 'jalut', 'bani-israil', 'quranic-stories', 'tawakkul', 'sabr', 'al-baqarah', 'path:the-unpopular-position', 'path:releasing-what-you-cant-control'],
  reading_time_minutes: 9,
  featured: false,
  published_at: new Date().toISOString(),
  created_by: ADMIN_USER_ID,
}

const { data: post, error: postErr } = await supabase
  .from('posts')
  .insert(article)
  .select('id, slug')
  .single()

if (postErr) {
  console.error('Insert failed:', postErr)
  process.exit(1)
}

console.log('Inserted post:', post)

// Tag entities
const entityTags = [
  { slug: 'dawud', is_primary: true },
  { slug: 'musa', is_primary: false },
  { slug: 'harun', is_primary: false },
]

for (const tag of entityTags) {
  const { data: entity } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', tag.slug)
    .single()

  if (!entity) {
    console.log(`  Entity ${tag.slug} not found — skipping`)
    continue
  }

  const { error: tagErr } = await supabase.from('entity_tags').insert({
    post_id: post.id,
    entity_id: entity.id,
    is_primary: tag.is_primary,
  })

  if (tagErr) console.error(`  Tag ${tag.slug} failed:`, tagErr)
  else console.log(`  Tagged: ${tag.slug} (primary=${tag.is_primary})`)
}

// Refresh co-occurrence
const { error: refreshErr } = await supabase.rpc('refresh_entity_co_occurrence')
if (refreshErr) console.error('Refresh failed:', refreshErr)
else console.log('Co-occurrence refreshed')

console.log(`\n✅ Published: https://ayahguide.com/posts/${post.slug}`)
