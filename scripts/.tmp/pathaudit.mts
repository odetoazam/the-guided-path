import { createClient } from '@supabase/supabase-js'
import P from '@/data/paths'
const { PATHS } = P as any
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// paginated entity_tags
const tags: any[] = []
for (let f=0;;f+=1000){ const {data}=await s.from('entity_tags').select('entity_id,post_id,ayah_record_id,is_primary').range(f,f+999); if(!data?.length) break; tags.push(...data); if(data.length<1000) break }
const { data: ents } = await s.from('entities').select('id,slug,name_translit')
const { data: pubPosts } = await s.from('posts').select('id,slug,status').eq('status','published')
const pubIds = new Set((pubPosts??[]).map((p:any)=>p.id))
const { data: synth } = await s.from('hub_synthesis_cache').select('entity_id')
const hasSynth = new Set((synth??[]).map((x:any)=>x.entity_id))

for (const path of PATHS) {
  console.log(`\n=== ${path.slug} (${path.stops.length} stops) — "${path.arrivalStatement}"`)
  for (const [i, stop] of path.stops.entries()) {
    if (stop.type === 'hub') {
      const e = (ents??[]).find((x:any)=>x.slug===stop.slug)
      if (!e) { console.log(`  ${i+1}. HUB ${stop.slug} — ENTITY MISSING`); continue }
      const mine = tags.filter(t=>t.entity_id===e.id)
      const prim = mine.filter(t=>t.post_id && t.is_primary && pubIds.has(t.post_id)).length
      const sec  = mine.filter(t=>t.post_id && !t.is_primary && pubIds.has(t.post_id)).length
      const ayahs= mine.filter(t=>t.ayah_record_id && t.is_primary).length
      console.log(`  ${i+1}. HUB ${stop.slug.padEnd(12)} primary=${prim} secondary=${sec} ayahRecords=${ayahs} synthesis=${hasSynth.has(e.id)?'YES':'NO — placeholder text'}`)
    } else if (stop.type === 'article') {
      const p = (pubPosts??[]).find((x:any)=>x.slug===stop.slug)
      console.log(`  ${i+1}. ARTICLE ${stop.slug} — ${p?'ok':'MISSING/UNPUBLISHED'}`)
    } else {
      const [su, rest] = stop.slug.split(':'); const [st] = rest.split('-')
      const { data } = await s.from('ayah_records').select('surah_number,ayah_start,ayah_end').eq('status','published').eq('surah_number',+su).eq('ayah_start',+st)
      console.log(`  ${i+1}. AYAH ${stop.slug} — ${data?.length?'ok':'MISSING'}`)
    }
  }
}
