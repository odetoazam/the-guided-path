import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const posts:any[]=[]
for(let f=0;;f+=500){const {data}=await s.from('posts').select('slug,title,excerpt').eq('status','published').range(f,f+499); if(!data?.length)break; posts.push(...data); if(data.length<500)break}
const re=/structur|coheren|ring|order|arrang|sequence|why this verse|placement|seam|architecture|composition/i
const hits=posts.filter(p=>re.test(p.title)||re.test(p.excerpt??''))
console.log('structure-adjacent articles:', hits.length)
for(const h of hits.slice(0,18)) console.log(`  ${h.slug}\n     ${String(h.title).slice(0,95)}`)
