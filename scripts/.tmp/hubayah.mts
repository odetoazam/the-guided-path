import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const tags:any[]=[]
for(let f=0;;f+=1000){const {data}=await s.from('entity_tags').select('entity_id,ayah_record_id,is_primary').not('ayah_record_id','is',null).range(f,f+999); if(!data?.length)break; tags.push(...data); if(data.length<1000)break}
const { data: ents } = await s.from('entities').select('id,slug')
const byId=new Map((ents??[]).map((e:any)=>[e.id,e.slug]))
const prim=new Map<string,number>()
for(const t of tags) if(t.is_primary) prim.set(byId.get(t.entity_id)!,(prim.get(byId.get(t.entity_id)!)??0)+1)
console.log('total ayah_record tags:', tags.length, '| records covered:', new Set(tags.map(t=>t.ayah_record_id)).size, 'of 182')
console.log('hubs now showing ayah records:', prim.size)
console.log('top:', [...prim].sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>`${k}=${v}`).join(' '))
