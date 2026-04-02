#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const q1Html = readFileSync('/tmp/qiyamah-1.html', 'utf8')
const q2Html = readFileSync('/tmp/qiyamah-2.html', 'utf8')
const q3Html = readFileSync('/tmp/qiyamah-3.html', 'utf8')

const articles = [
  {
    title: "The Day of Qiyamah: Seventy Names and What Each One Reveals",
    slug: "al-qiyamah-seventy-names",
    type: "article",
    excerpt: "The Quran gives the Final Day more than seventy names — Yawm al-Qiyama, al-Sa'a, Yawm al-Hisab, Yawm al-Fasl, Yawm al-Jam', al-Tamma al-Kubra. Each name is a lens. Each reveals something the others do not. Together they constitute the most detailed portrait the Quran draws of anything that hasn't happened yet.",
    seo_title: "The Seventy Names of the Day of Judgment in the Quran",
    seo_description: "The Quran names the Final Day more than seventy ways — Yawm al-Qiyama, al-Sa'a, Yawm al-Hisab, Yawm al-Fasl, and more. A semantic reading of each name as a distinct entry point into understanding the Day of Rising.",
    content_html: q1Html,
    status: 'published',
    tags: ['al-qiyamah', 'eschatology', 'the-unseen', 'semantic-analysis', 'quranic-language'],
    reading_time_minutes: 12,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "When the Mountains Move: The Quran's Physical Description of the End",
    slug: "al-qiyamah-mountains-move",
    type: "article",
    excerpt: "The Quran returns to the mountains at the Final Hour in seven or more distinct passages, each with a different verb and image: set in motion, blown to dust, become a mirage, turned to carded wool. Together they form a vocabulary of dissolution that approaches the unmaking of permanence from every direction.",
    seo_title: "When the Mountains Move — The Quran's Description of the Day of Judgment",
    seo_description: "Seven distinct Quranic passages describe what happens to the mountains at the Final Hour — suyirat (set in motion), nusifat (blown away), saraban (become mirage), kal-'ihn al-manfush (carded wool). A reading of the Quran's physical vocabulary for the end.",
    content_html: q2Html,
    status: 'published',
    tags: ['al-qiyamah', 'eschatology', 'the-unseen', 'quranic-language'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Weighing: Mizan and What Gets Placed on the Scale",
    slug: "mizan-weighing-day-of-judgment",
    type: "article",
    excerpt: "The Quran places scales at the center of the Day of Reckoning. The weighing is called al-haqq — the truth. Whoever does an atom's weight of good will see it; whoever does an atom's weight of evil will see it. The scale that humans cheat in the world is replaced by the divine scale that cannot be cheated.",
    seo_title: "The Mizan: What the Quran Says About the Scales of Judgment",
    seo_description: "The Quran describes the Mizan (scales) of the Day of Judgment in 7:8-9, 99:7-8, 21:47, and 101:6-8. A reading of what gets weighed, what heavy and light scales mean, and how the Quran uses the scale as both eschatological fact and moral argument.",
    content_html: q3Html,
    status: 'published',
    tags: ['al-qiyamah', 'mizan', 'eschatology', 'the-unseen', 'quranic-language', 'jahannam', 'jannah'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
  'al-qiyamah-seventy-names': [
    { slug: 'qiyamah', is_primary: true },
  ],
  'al-qiyamah-mountains-move': [
    { slug: 'qiyamah', is_primary: true },
  ],
  'mizan-weighing-day-of-judgment': [
    { slug: 'qiyamah', is_primary: true },
    { slug: 'mizan', is_primary: false },
    { slug: 'jahannam', is_primary: false },
    { slug: 'jannah', is_primary: false },
  ],
}

async function main() {
  for (const article of articles) {
    const { data: post, error } = await supabase
      .from('posts')
      .insert({ ...article, created_by: ADMIN_USER_ID })
      .select('id, slug')
      .single()

    if (error) { console.error('Insert error for', article.slug, ':', error); continue }
    console.log('Inserted:', post.slug)

    const entityTags = entityTagMap[post.slug] || [{ slug: 'qiyamah', is_primary: true }]

    for (const tag of entityTags) {
      const { data: entity } = await supabase
        .from('entities').select('id').eq('slug', tag.slug).single()
      if (!entity) { console.warn('Entity not found:', tag.slug); continue }
      await supabase.from('entity_tags').insert({
        post_id: post.id, entity_id: entity.id, is_primary: tag.is_primary
      })
    }
    console.log('Tagged entities for:', post.slug)
  }

  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('Done. Co-occurrence refreshed.')
}

main().catch(console.error)
