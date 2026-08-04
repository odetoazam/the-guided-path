import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data: ents } = await s.from('entities').select('id,slug,name_translit,name_arabic,root_letters,category,occurrence_count')
const e = ents ?? []
console.log('entities total:', e.length)
console.log('with root_letters:', e.filter((x:any)=>x.root_letters).length)
console.log('sample roots:', e.filter((x:any)=>x.root_letters).slice(0,10).map((x:any)=>`${x.slug}=${x.root_letters}`).join(' | '))
console.log('\ncategories:', [...new Set(e.map((x:any)=>x.category))].join(', '))
console.log('\nno-root entities sample:', e.filter((x:any)=>!x.root_letters).slice(0,12).map((x:any)=>`${x.slug}(${x.name_arabic??''})`).join(' | '))
// existing ayah tags
const tags:any[]=[]
for(let f=0;;f+=1000){const {data}=await s.from('entity_tags').select('entity_id,ayah_record_id').not('ayah_record_id','is',null).range(f,f+999); if(!data?.length)break; tags.push(...data); if(data.length<1000)break}
console.log('\nexisting ayah_record tags:', tags.length, '| distinct records tagged:', new Set(tags.map(t=>t.ayah_record_id)).size, 'of 182')
