#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const jah1Html = readFileSync('/tmp/jahannam-1.html', 'utf8')
const jah2Html = readFileSync('/tmp/jahannam-2.html', 'utf8')
const jah3Html = readFileSync('/tmp/jahannam-3.html', 'utf8')

const articles = [
  {
    title: "The Names of the Fire: How the Quran Refuses a Single Word for Hell",
    slug: "jahannam-names-of-the-fire",
    type: "article",
    excerpt: "The Quran uses at least seven distinct names for the realm of punishment — Jahannam, al-Jahim, al-Sa'ir, Saqar, al-Hutama, Laza, and al-Hawiya. Each appears in a different context, each carries a different register of meaning. The question is not which name is correct, but why the Quran needs all seven.",
    seo_title: "The Seven Names of Hell in the Quran — Jahannam, Jahim, Sa'ir, and More",
    seo_description: "The Quran refuses a single name for the realm of punishment, using at least seven distinct terms. A semantic analysis of Jahannam, al-Jahim, al-Sa'ir, Saqar, al-Hutama, Laza, and al-Hawiya — each foregrounding a different aspect of the same reality.",
    content_html: jah1Html,
    status: 'published',
    tags: ['jahannam', 'eschatology', 'quranic-language', 'the-unseen', 'semantic-analysis'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Fire That Speaks: Jahannam as a Character in the Quran",
    slug: "jahannam-fire-that-speaks",
    type: "article",
    excerpt: "In Surah Al-Mulk, Jahannam almost bursts apart with rage. In Surah Qaf, Allah asks it a question and it answers. The fire is not background scenery in the Quran — it is enraged, it speaks, and it participates in the moral order of the Day of Judgment.",
    seo_title: "The Fire That Speaks — Jahannam as a Character in the Quran",
    seo_description: "Surah Al-Mulk says Jahannam almost bursts from rage (67:8). Surah Qaf has Allah speak to Jahannam and it answers (50:30). A close reading of how the Quran personifies Jahannam as a moral participant, not mere scenery.",
    content_html: jah2Html,
    status: 'published',
    tags: ['jahannam', 'eschatology', 'the-unseen', 'al-mulk', 'quranic-language'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Two Processions: What the Quran's Grammar Reveals About Choice",
    slug: "jahannam-two-processions-choice",
    type: "article",
    excerpt: "In Surah Az-Zumar, those going to Jahannam are driven — the verb suq, herded — while those going to Jannah come of their own motion. The same word for groups (zumara) is used for both processions, making the grammatical contrast the Quran's entire theology of choice compressed into a single parallel.",
    seo_title: "Two Processions in Surah Az-Zumar — What the Grammar Reveals About Choice",
    seo_description: "Az-Zumar 39:71-73 shows two processions to Jahannam and Jannah using the same word (zumara) but opposite verbs — herded vs. arriving. A reading of how the Quran encodes free choice and justice into its grammar of the Day of Judgment.",
    content_html: jah3Html,
    status: 'published',
    tags: ['jahannam', 'jannah', 'eschatology', 'the-unseen', 'quranic-language', 'az-zumar'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
  'jahannam-names-of-the-fire': [
    { slug: 'jahannam', is_primary: true },
  ],
  'jahannam-fire-that-speaks': [
    { slug: 'jahannam', is_primary: true },
  ],
  'jahannam-two-processions-choice': [
    { slug: 'jahannam', is_primary: true },
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

    const entityTags = entityTagMap[post.slug] || [{ slug: 'jahannam', is_primary: true }]

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
