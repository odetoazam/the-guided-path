import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const tags: any[] = []
for (let f=0;;f+=1000){ const {data}=await s.from('entity_tags').select('entity_id,post_id,is_primary').range(f,f+999); if(!data?.length) break; tags.push(...data); if(data.length<1000) break }
const { data: ents } = await s.from('entities').select('id,slug')
const { data: synth } = await s.from('hub_synthesis_cache').select('entity_id')
const has = new Set((synth??[]).map((x:any)=>x.entity_id))
const posts: any[] = []
for (let f=0;;f+=500){ const {data}=await s.from('posts').select('id').eq('status','published').range(f,f+499); if(!data?.length) break; posts.push(...data); if(data.length<500) break }
const pub = new Set(posts.map(p=>p.id))
const counts = new Map<string,number>()
for (const t of tags) if (t.post_id && t.is_primary && pub.has(t.post_id)) counts.set(t.entity_id,(counts.get(t.entity_id)??0)+1)
const missing = (ents??[]).filter((e:any)=>(counts.get(e.id)??0)>=3 && !has.has(e.id))
console.log('total syntheses now:', synth?.length)
console.log('hubs with 3+ primary articles and NO synthesis:', missing.length, missing.map((e:any)=>e.slug).join(', ') || '— none —')
