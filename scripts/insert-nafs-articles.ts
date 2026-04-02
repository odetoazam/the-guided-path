#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

// Load validated HTML from temp files
const nafs1Html = readFileSync('/tmp/nafs-1.html', 'utf8')
const nafs2Html = readFileSync('/tmp/nafs-2.html', 'utf8')
const nafs3Html = readFileSync('/tmp/nafs-3.html', 'utf8')

const articles = [
  {
    title: "The Three Nafs: Ammara, Lawwama, Mutma'inna — A Taxonomy From the Quran",
    slug: "nafs-three-stations-quran",
    type: "article",
    excerpt: "The Quran names three stations the self can inhabit — commanding, reproaching, and at peace. These are not three souls but three orientations of the same self, mapped with surgical precision across Surah Yusuf, Al-Qiyamah, and Al-Fajr.",
    seo_title: "The Three Nafs in the Quran: Ammara, Lawwama, Mutma'inna",
    seo_description: "A deep reading of the Quran's three-station model of the self — the commanding nafs (12:53), the reproaching nafs (75:2), and the soul at peace (89:27-30). Ibn al-Qayyim's map explained.",
    content_html: nafs1Html,
    status: 'published',
    tags: ['nafs', 'taqwa', 'tazkiya', 'concepts-of-existence', 'yusuf'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Nafs That Accuses Itself: Surah Al-Qiyamah and the Internal Witness",
    slug: "nafs-lawwama-al-qiyamah",
    type: "article",
    excerpt: "Surah Al-Qiyamah opens by swearing an oath alongside the Day of Resurrection — not by the sun or the mountains, but by the self-reproaching soul. The surah is about the moment a self confronts its own record and cannot look away.",
    seo_title: "The Nafs That Accuses Itself — Surah Al-Qiyamah Explained",
    seo_description: "Why does Allah swear by the self-reproaching soul in 75:2? A verse-by-verse reading of Al-Qiyamah's internal witness — the nafs lawwama as conscience, oath, and ultimate court.",
    content_html: nafs2Html,
    status: 'published',
    tags: ['nafs', 'al-qiyamah', 'the-unseen', 'eschatology', 'concepts-of-existence'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "What the Quran Means When It Says 'Nafs': The Word the Translators Can't Agree On",
    slug: "nafs-quran-translation-semantics",
    type: "article",
    excerpt: "Nafs appears 295 times in the Quran and gets rendered as 'soul,' 'self,' 'person,' 'life,' and 'mind' — often in the same translation. The disagreement is not a failure. It is an accurate report of what the word actually contains.",
    seo_title: "What 'Nafs' Means in the Quran — Soul, Self, or Person?",
    seo_description: "Nafs appears 295 times and translators can't agree on a single English word for it. A semantic analysis of nafs as person (5:32), self (2:286), divine attribute (6:12), and the field that can be purified or buried (91:7-10).",
    content_html: nafs3Html,
    status: 'published',
    tags: ['nafs', 'quranic-language', 'semantic-analysis', 'concepts-of-existence'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

async function main() {
  for (const article of articles) {
    const { data: post, error } = await supabase
      .from('posts')
      .insert({ ...article, created_by: ADMIN_USER_ID })
      .select('id, slug')
      .single()

    if (error) { console.error('Insert error for', article.slug, ':', error); continue }
    console.log('Inserted:', post.slug)

    const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
      'nafs-three-stations-quran': [
        { slug: 'nafs', is_primary: true },
        { slug: 'taqwa', is_primary: false },
        { slug: 'yusuf', is_primary: false },
      ],
      'nafs-lawwama-al-qiyamah': [
        { slug: 'nafs', is_primary: true },
        { slug: 'jahannam', is_primary: false },
        { slug: 'jannah', is_primary: false },
      ],
      'nafs-quran-translation-semantics': [
        { slug: 'nafs', is_primary: true },
      ],
    }

    const entityTags = entityTagMap[post.slug] || [{ slug: 'nafs', is_primary: true }]

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
