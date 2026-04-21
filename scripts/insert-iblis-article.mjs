import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const contentHtml = readFileSync('/tmp/story-test/iblis-article.html', 'utf-8')

const { data: entities } = await supabase.from('entities').select('id, slug').in('slug', ['shaytan', 'iblis', 'adam', 'malaika'])
console.log('Available entities:', entities?.map(e => e.slug))

const article = {
  title: 'I Am Better: The First Time Pride Sounded Like Reason',
  slug: 'iblis-refusal-al-araf-7-11-15',
  type: 'article',
  excerpt: 'The first argument any created being ever made against a direct command from God. The Quran preserves it word for word — and the shape of it is the lesson.',
  seo_title: 'Iblis\'s Refusal in Al-A\'raf 7:11-15 — The First Argument',
  seo_description: 'Iblis\'s reply to Allah — "I am better than him" — is the first argument against a direct command from God. A close reading of the grammar of pride in Al-A\'raf 7:11-15.',
  content_html: contentHtml,
  status: 'published',
  tags: ['iblis', 'shaytan', 'adam', 'al-araf', 'kibr', 'arrogance', 'prostration', 'quranic-stories', 'path:the-loop', 'path:what-youre-worth'],
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
  { slug: 'adam', is_primary: false },
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
