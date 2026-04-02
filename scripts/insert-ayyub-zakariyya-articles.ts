#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

// Entity IDs
const AYYUB_ID = 'e070047b-c83a-481d-a68a-d9c7892996af'
const ZAKARIYYA_ID = '178975a6-a53a-48db-8426-00adba42422f'
const MUSA_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'
const IBRAHIM_ID = 'dc5cd1d2-00d3-482d-bdcd-2d20344e7838'
const MARYAM_ID = '6ce90516-9141-476e-8f4a-bb50e1e77925'
const NUH_ID = 'c45f9810-e8ee-43cb-9cb5-a810245159df'

const ayyubArticle1Html = fs.readFileSync('/tmp/ayyub-article-1.html', 'utf-8')
const ayyubArticle2Html = fs.readFileSync('/tmp/ayyub-article-2.html', 'utf-8')
const zakariyyaArticle1Html = fs.readFileSync('/tmp/zakariyya-article-1.html', 'utf-8')

const articles = [
  {
    post: {
      title: "The Patience That Had Limits: Ayyub's Complaint and Why the Quran Records It",
      slug: 'ayyub-patience-complaint',
      type: 'article',
      excerpt: "Ayyub's story is read as a model of silent endurance — but the Quran records his cry, his named exhaustion, and his identification of the shaytan as agent. The limit of his patience was an articulation point, not a breaking point.",
      seo_title: "Ayyub's Complaint — Patience and Prayer in the Quran",
      seo_description: "The Quran records Ayyub naming his exhaustion and the shaytan's role in his suffering. His patience was complaint that never became accusation — need that remained trust.",
      content_html: ayyubArticle1Html,
      status: 'published',
      tags: ['ayyub', 'sabr', 'du\'a', 'suffering', 'patience', 'prophets'],
      reading_time_minutes: 10,
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    },
    entityTags: [AYYUB_ID, MUSA_ID, IBRAHIM_ID, NUH_ID],
  },
  {
    post: {
      title: "Ayyub and Musa: Two Prophets Who Argued With Allah and Were Answered",
      slug: 'ayyub-musa-argument-answered',
      type: 'article',
      excerpt: "Ayyub's prayer is seven words. Musa's petition from Madyan is nine. When placed side by side, they reveal a Quranic theology of du'a built on honest description of need — not specification of the solution.",
      seo_title: "Ayyub and Musa — Two Prophets Who Argued With Allah",
      seo_description: "Both Ayyub and Musa brought their exact condition — suffering, fear, limitation — to Allah without pretending. Both were answered. The form of the answer differed; the calling was the same.",
      content_html: ayyubArticle2Html,
      status: 'published',
      tags: ['ayyub', 'musa', 'du\'a', 'prophets', 'prayer', 'comparative'],
      reading_time_minutes: 10,
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    },
    entityTags: [AYYUB_ID, MUSA_ID, IBRAHIM_ID],
  },
  {
    post: {
      title: "The Old Man and the Impossible: Zakariyya's Three Objections",
      slug: 'zakariyya-three-objections',
      type: 'article',
      excerpt: "When told he would be given a son, Zakariyya did not immediately surrender. He asked three versions of the same question — how? — across two surahs. The Quran records all three, and answers each.",
      seo_title: "Zakariyya's Three Objections — Faith and the Impossible",
      seo_description: "Zakariyya raised three objections when told he would have a son: his old age, his wife's barrenness, and a request for a sign. The Quran accommodates all three — and answers each one differently.",
      content_html: zakariyyaArticle1Html,
      status: 'published',
      tags: ['zakariyya', 'yahya', 'du\'a', 'miracle', 'faith', 'prophets'],
      reading_time_minutes: 10,
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    },
    entityTags: [ZAKARIYYA_ID, MARYAM_ID, IBRAHIM_ID],
  },
]

async function main() {
  for (const { post, entityTags } of articles) {
    console.log(`\nInserting: ${post.title}`)

    const { data: inserted, error: postError } = await supabase
      .from('posts')
      .insert(post)
      .select('id')
      .single()

    if (postError) {
      console.error('Post insert error:', postError)
      process.exit(1)
    }

    console.log('Post inserted:', inserted.id)

    for (const entityId of entityTags) {
      const { error: tagError } = await supabase
        .from('entity_tags')
        .insert({ post_id: inserted.id, entity_id: entityId })

      if (tagError) {
        console.error('Entity tag error:', tagError)
      }
    }

    console.log('Entity tags inserted:', entityTags.length)
  }

  console.log('\nRefreshing entity co-occurrence...')
  const { error: rpcError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcError) {
    console.error('RPC error:', rpcError)
  } else {
    console.log('Co-occurrence refreshed.')
  }

  console.log('\nAll articles inserted successfully.')
}

main().catch(console.error)
