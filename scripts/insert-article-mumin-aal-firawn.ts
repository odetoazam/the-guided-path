import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const SLUG = 'believer-pharaoh-family-yusuf-ghafir'
const ADMIN = '5814582a-9f09-473a-be6f-619c210cca8e'

// Derived from the validated tadabbur files content/tadabbur/040-ghafir/ayah-028.md
// and ayah-034.md (both passed the 3-layer content validators). All 9 Arabic
// blockquotes verified against the Uthmani corpus via verify_arabic.mjs
// (9/9 normalized match). Corpus-level facts (al-rashad occurs only at 40:29 &
// 40:38; al-malik x6 / Fir'awn x0 in Surah 12) verified directly against
// quran-verses.json.
const contentHtml = fs.readFileSync('docs/articles-source/believer-pharaoh-family-yusuf-ghafir.html', 'utf8').trim()

// Primary: the two poles of the bridge the article traces. Secondary: mentions.
const entityTags: { slug: string; is_primary: boolean }[] = [
  { slug: 'yusuf', is_primary: true },
  { slug: 'firaun', is_primary: true },
  { slug: 'musa', is_primary: false },
  { slug: 'yaqub', is_primary: false },
]

async function main() {
  const now = new Date().toISOString()

  const record = {
    title: "The Man Who Remembered Yusuf: A Secret Believer in Pharaoh's Court",
    slug: SLUG,
    excerpt:
      "He hid his faith for years inside Pharaoh's inner circle. The day Pharaoh moved to kill Musa, he stood up — and reached back four centuries to a name the court could not deny: Yusuf.",
    content_html: contentHtml,
    content_json: {},
    status: 'published',
    type: 'article',
    seo_title: "The Believer of Pharaoh's Family — Quran (Ghafir 40:28)",
    seo_description:
      "A secret believer in Pharaoh's court defends Musa and reminds Egypt of Yusuf — the Quran's only bridge between the two prophets. A close reading of Ghafir 40:28-45.",
    tags: ['yusuf', 'musa', 'firaun', 'ghafir', 'al-qasas', 'prophets', 'courage', 'doubt'],
    quran_refs: ['40:26', '40:28', '40:29', '40:34', '40:38', '40:44', '40:45', '12:21', '28:4'],
    reading_time_minutes: 16,
    featured: false,
    published_at: now,
    publish_date: now,
    created_by: ADMIN,
  }

  const { data: existing } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', SLUG)
    .maybeSingle()

  let postId: string
  if (existing) {
    const { error } = await supabase
      .from('posts')
      .update({ ...record, updated_at: now })
      .eq('id', existing.id)
    if (error) { console.error('Update error:', error); process.exit(1) }
    postId = existing.id
    console.log('Updated existing post:', postId)
  } else {
    const { data, error } = await supabase
      .from('posts')
      .insert(record)
      .select('id')
      .single()
    if (error) { console.error('Insert error:', error); process.exit(1) }
    postId = data.id
    console.log('Published article:', postId, '→ /posts/' + SLUG)
  }

  // Entity tags — clear existing tags for this post, then insert fresh (idempotent)
  await supabase.from('entity_tags').delete().eq('post_id', postId)
  for (const tag of entityTags) {
    const { data: entity } = await supabase
      .from('entities')
      .select('id')
      .eq('slug', tag.slug)
      .maybeSingle()
    if (!entity) { console.warn('  ⚠ entity not found, skipping tag:', tag.slug); continue }
    const { error: tagErr } = await supabase
      .from('entity_tags')
      .insert({ post_id: postId, entity_id: entity.id, is_primary: tag.is_primary })
    if (tagErr) { console.warn('  ⚠ tag error', tag.slug, tagErr.message) }
    else { console.log('  tagged', tag.slug, tag.is_primary ? '(primary)' : '(secondary)') }
  }

  // Refresh the knowledge graph
  const { error: rpcErr } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcErr) console.warn('  ⚠ co-occurrence refresh:', rpcErr.message)
  else console.log('  co-occurrence refreshed')
}

main()
