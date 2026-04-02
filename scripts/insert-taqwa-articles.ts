#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const t1Html = readFileSync('/tmp/taqwa-1.html', 'utf8')
const t2Html = readFileSync('/tmp/taqwa-2.html', 'utf8')
const t3Html = readFileSync('/tmp/taqwa-3.html', 'utf8')

const articles = [
  {
    title: "The Shield: Taqwa's Root as Protective Cover",
    slug: "taqwa-root-shield-protective-cover",
    type: "article",
    excerpt: "Taqwa is translated as piety, God-consciousness, and fear of God — but the root w-q-y means to shield, to protect, to place a cover between a person and harm. Taqwa names the ongoing disposition of self-shielding. The muttaqi is not just the pious person; they are the armored one.",
    seo_title: "Taqwa in the Quran — The Shield: What the Root W-Q-Y Really Means",
    seo_description: "Taqwa's root w-q-y means to shield and protect. A semantic analysis of taqwa as armor (2:197, 40:45, 2:2) — the protective disposition that guards against divine displeasure while simultaneously opening the self toward guidance.",
    content_html: t1Html,
    status: 'published',
    tags: ['taqwa', 'quranic-language', 'semantic-analysis', 'concepts-of-existence'],
    reading_time_minutes: 9,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Ittaqu Allah: The Command the Quran Repeats Most Often",
    slug: "ittaqu-allah-most-repeated-command",
    type: "article",
    excerpt: "No command in the Quran is repeated more often than 'ittaqu Allah' — be mindful of Allah. It is found in every surah category, addressed to prophets and communities alike. The command's repetition is the Quran's signal that taqwa is the foundation from which all other ethical commands derive their force.",
    seo_title: "Ittaqu Allah — The Most Repeated Command in the Quran",
    seo_description: "The command 'ittaqu Allah' (be mindful of Allah) is the most repeated directive in the Quran. A reading of its strongest forms — haqqa tuqatihi (3:102), ma istata'tum (64:16), and the makhraj promise (65:2-3) — and why every prophet delivers this command first.",
    content_html: t2Html,
    status: 'published',
    tags: ['taqwa', 'quranic-language', 'concepts-of-existence'],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Taqwa and Its Fruits: What the Quran Promises the Muttaqin",
    slug: "taqwa-fruits-what-quran-promises-muttaqin",
    type: "article",
    excerpt: "The Quran describes what taqwa produces: guidance, a way out of difficulty, furqan (the capacity to distinguish truth from falsehood), a light to walk by, and the highest possible honor before Allah. The muttaqin are not just ethically cautious — they are cognitively sharpened, protected, and oriented toward Jannah prepared specifically for them.",
    seo_title: "The Fruits of Taqwa — What the Quran Promises the Muttaqin",
    seo_description: "The Quran promises taqwa's fruits: furqan/discernment (8:29), light to walk by (57:28), a garden whose width is the heavens and earth (3:133), and the highest rank before Allah (49:13). A reading of what taqwa produces, not just what it demands.",
    content_html: t3Html,
    status: 'published',
    tags: ['taqwa', 'jannah', 'quranic-language', 'concepts-of-existence', 'al-qiyamah'],
    reading_time_minutes: 11,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

const entityTagMap: Record<string, Array<{ slug: string; is_primary: boolean }>> = {
  'taqwa-root-shield-protective-cover': [
    { slug: 'taqwa', is_primary: true },
  ],
  'ittaqu-allah-most-repeated-command': [
    { slug: 'taqwa', is_primary: true },
  ],
  'taqwa-fruits-what-quran-promises-muttaqin': [
    { slug: 'taqwa', is_primary: true },
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

    const entityTags = entityTagMap[post.slug] || [{ slug: 'taqwa', is_primary: true }]

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
