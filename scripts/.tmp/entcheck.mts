import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data } = await s.from('entities').select('slug,name_translit').in('slug',['tadabbur','qalb','shaytan','hidayah','nazm','khushu','tawakkul','quran','dhikr'])
console.log((data??[]).map((e:any)=>e.slug).join(', '))
