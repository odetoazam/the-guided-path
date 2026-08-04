import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data } = await s.from('posts').select('content_html').ilike('content_html','%pause-divider%').limit(2)
for (const p of data ?? []) { const m = (p as any).content_html.match(/<div class="pause-divider">[\s\S]{0,120}/); console.log(m?.[0]) }
console.log('posts using it:', data?.length ?? 0)
