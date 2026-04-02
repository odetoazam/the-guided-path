#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const m1Html = readFileSync('/tmp/malaika-1.html', 'utf8')
const m2Html = readFileSync('/tmp/malaika-2.html', 'utf8')
const m3Html = readFileSync('/tmp/malaika-3.html', 'utf8')

const articles = [
  {
    title: "The Angels Who Don't Disobey: What the Quran Actually Says About Malaika",
    slug: "malaika-angels-who-dont-disobey",
    type: "article",
    excerpt: "The Quran never describes an angel disobeying Allah. The malaika's obedience is structural — built into their nature. They glorify without slackening, execute every command without interior resistance. Understanding what this means illuminates by contrast what makes the human being singular.",
    seo_title: "The Angels Who Don't Disobey — What the Quran Says About Malaika",
    seo_description: "The Quran states that the malaika 'do not disobey Allah in what He commands them and do what they are commanded' (66:6). A semantic reading of angelic obedience — la ya'suna, yusabbihu, and the prostration before Adam that reveals human singularity.",
    content_html: m1Html,
    status: 'published',
    tags: ['malaika', 'the-unseen', 'quranic-language', 'adam', 'iblis'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Jibril: The Ruh al-Amin and the Architecture of Revelation",
    slug: "jibril-ruh-al-amin-architecture-of-revelation",
    type: "article",
    excerpt: "The Quran gives Jibril two names: Ruh al-Amin (the Trustworthy Spirit) and Ruh al-Qudus (the Spirit of Holiness). Both are descriptions of quality, not function — they name what Jibril is before naming what he does. The title Ruh al-Amin is the Quran's argument for the integrity of its own transmission.",
    seo_title: "Jibril in the Quran: Ruh al-Amin and the Architecture of Revelation",
    seo_description: "The Quran names Jibril 'al-Ruh al-Amin' (the Trustworthy Spirit) in 26:193 and directly as Jibril in 2:97. A close reading of how the Quran grounds the integrity of revelation in the nature of its bearer — and what 'upon your heart' means.",
    content_html: m2Html,
    status: 'published',
    tags: ['malaika', 'the-unseen', 'quranic-language', 'revelation'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Recording Angels: Kiraman Katibin and the Theology of Being Witnessed",
    slug: "kiraman-katibin-recording-angels-theology-of-witness",
    type: "article",
    excerpt: "Two angels sit at your right and left, writing. The Quran calls them Kiraman Katibin — noble scribes. They record every word, every deed, and every trace a person leaves behind. The record cannot be lost, cannot be corrupted, and will be opened on the day when nothing has been forgotten.",
    seo_title: "Kiraman Katibin — The Recording Angels in the Quran",
    seo_description: "The Quran describes two recording angels (82:10-12, 50:17-18) who write every word and deed. A reading of what the Kiraman Katibin record, how the theology of divine witness shapes the Quran's ethics, and what 36:12 adds about traces that outlast a person's life.",
    content_html: m3Html,
    status: 'published',
    tags: ['malaika', 'the-unseen', 'eschatology', 'quranic-language', 'al-qiyamah'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
  'malaika-angels-who-dont-disobey': [
    { slug: 'malaika', is_primary: true },
    { slug: 'iblis', is_primary: false },
  ],
  'jibril-ruh-al-amin-architecture-of-revelation': [
    { slug: 'malaika', is_primary: true },
  ],
  'kiraman-katibin-recording-angels-theology-of-witness': [
    { slug: 'malaika', is_primary: true },
    { slug: 'qiyamah', is_primary: false },
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

    const entityTags = entityTagMap[post.slug] || [{ slug: 'malaika', is_primary: true }]

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
