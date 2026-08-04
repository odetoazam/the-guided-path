import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  const { data: posts, error: e1 } = await supabase
    .from('posts')
    .select('title, slug, excerpt, type')
    .eq('status', 'published')
    .eq('type', 'article')
    .order('created_at', { ascending: false })
    .limit(60)
  if (e1) console.error('posts error', e1)
  console.log('=== POSTS ===')
  console.log(JSON.stringify(posts, null, 2))

  const { data: ents, error: e2 } = await supabase
    .from('entities')
    .select('slug, name_english, category')
    .order('category', { ascending: true })
    .order('name_english', { ascending: true })
  if (e2) console.error('entities error', e2)
  console.log('=== ENTITIES ===')
  console.log(JSON.stringify(ents, null, 2))
}
main()
