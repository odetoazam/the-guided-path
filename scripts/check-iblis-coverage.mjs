import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await supabase.from('posts').select('title, slug').like('content_html', '%7:11%').eq('status', 'published')
console.log('Articles referencing Al-Araf 7:11 area:')
console.log(JSON.stringify(data, null, 2))
