#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const z1Html = readFileSync('/tmp/zulm-1.html', 'utf8')
const z2Html = readFileSync('/tmp/zulm-2.html', 'utf8')
const z3Html = readFileSync('/tmp/zulm-3.html', 'utf8')

const articles = [
  {
    title: "The Root That Means Putting Things Out of Place: Zulm Before It Meant Oppression",
    slug: "zulm-root-meaning-misplacement",
    type: "article",
    excerpt: "Zulm appears 315 times in the Quran and gets translated as oppression, wrongdoing, injustice. But before it was an ethical term, the root z-l-m meant darkness and misplacement — putting a thing where it does not belong. Recovering the root meaning reveals why the Quran applies the same word to sin, disbelief, and harm done to others.",
    seo_title: "Zulm in the Quran — The Root That Means Putting Things Out of Place",
    seo_description: "Zulm (oppression/wrongdoing) appears 315 times in the Quran. Its root z-l-m means darkness and misplacement. A semantic reading of 18:33, 6:1, and 4:40 to recover why the Quran uses one word for sin, disbelief, and injustice to others.",
    content_html: z1Html,
    status: 'published',
    tags: ['zulm', 'quranic-language', 'semantic-analysis', 'concepts-of-existence', 'adl'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Zulm al-Nafs: When the Quran Turns the Word Against the Self",
    slug: "zulm-al-nafs-wronging-the-self",
    type: "article",
    excerpt: "The Quran uses the same word for oppressing others to describe what a person does to their own soul when they sin. Zulm al-nafs — wronging the self — is first uttered by Adam after he ate from the forbidden tree. It is the Quran's most precise description of what sin actually is: a misplacement of the self from its proper position.",
    seo_title: "Zulm al-Nafs — When the Quran Turns Wrongdoing Against the Self",
    seo_description: "Adam's first words after the Fall were 'rabbana zalamna anfusana' — we have wronged ourselves (7:23). The Quran applies zulm to self-harm, calling shirk 'a tremendous wrong' (31:13). A reading of zulm al-nafs as the Quran's theology of sin.",
    content_html: z2Html,
    status: 'published',
    tags: ['zulm', 'nafs', 'tawbah', 'adam', 'quranic-language', 'concepts-of-existence'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Zulm and Its Opposite: The Quran's Architecture of Justice",
    slug: "zulm-and-adl-architecture-of-justice",
    type: "article",
    excerpt: "The Quran positions zulm and 'adl as the two poles of the moral universe. Justice is built into creation — the mizan (balance) that Allah set in the heavens. The Quran's command is not to create justice but to align human action with the balance already embedded in the order of things.",
    seo_title: "Zulm and Adl — The Quran's Architecture of Justice",
    seo_description: "The Quran pairs zulm (oppression) with 'adl (justice) as the poles of the moral universe. A reading of 55:7-9, 16:90, 42:42, and 3:108 — how the Quran builds its ethics on a cosmic balance set by Allah, which human injustice disturbs.",
    content_html: z3Html,
    status: 'published',
    tags: ['zulm', 'quranic-language', 'concepts-of-existence', 'adl', 'qarun'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
  'zulm-root-meaning-misplacement': [
    { slug: 'zulm', is_primary: true },
  ],
  'zulm-al-nafs-wronging-the-self': [
    { slug: 'zulm', is_primary: true },
    { slug: 'nafs', is_primary: false },
    { slug: 'tawbah', is_primary: false },
  ],
  'zulm-and-adl-architecture-of-justice': [
    { slug: 'zulm', is_primary: true },
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

    const entityTags = entityTagMap[post.slug] || [{ slug: 'zulm', is_primary: true }]

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
