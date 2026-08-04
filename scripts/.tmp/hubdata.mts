import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const TARGETS = ['fitrah','nazm']

const tags: any[] = []
for (let f=0;;f+=1000){ const {data}=await s.from('entity_tags').select('entity_id,post_id,ayah_record_id,is_primary').range(f,f+999); if(!data?.length) break; tags.push(...data); if(data.length<1000) break }
const { data: ents } = await s.from('entities').select('id,slug,name_translit,name_arabic,root_letters,root_meaning,one_line,occurrence_count')
const posts: any[] = []
for (let f=0;;f+=500){ const {data}=await s.from('posts').select('id,slug,title,excerpt,status').eq('status','published').range(f,f+499); if(!data?.length) break; posts.push(...data); if(data.length<500) break }
const { data: synth } = await s.from('hub_synthesis_cache').select('entity_id')
const hasSynth = new Set((synth??[]).map((x:any)=>x.entity_id))
const arecs: any[] = []
for (let f=0;;f+=200){ const {data}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,title').eq('status','published').range(f,f+199); if(!data?.length) break; arecs.push(...data); if(data.length<200) break }

let out = ''
for (const slug of TARGETS) {
  const e = (ents??[]).find((x:any)=>x.slug===slug)
  if (!e) { out += `\n\n##### ${slug} — ENTITY MISSING\n`; continue }
  const mine = tags.filter(t=>t.entity_id===e.id)
  const prim = mine.filter(t=>t.post_id && t.is_primary).map(t=>posts.find(p=>p.id===t.post_id)).filter(Boolean)
  const sec  = mine.filter(t=>t.post_id && !t.is_primary).map(t=>posts.find(p=>p.id===t.post_id)).filter(Boolean)
  const ayahs= mine.filter(t=>t.ayah_record_id).map(t=>arecs.find(a=>a.id===t.ayah_record_id)).filter(Boolean)
  out += `\n\n##### ${slug} | ${e.name_translit} ${e.name_arabic ?? ''} | root ${e.root_letters ?? '—'} = ${e.root_meaning ?? '—'} | occurrences ${e.occurrence_count ?? '?'} | synthesis:${hasSynth.has(e.id)?'EXISTS':'MISSING'}\n`
  out += `one_line: ${e.one_line ?? '—'}\n`
  out += `PRIMARY (${prim.length}):\n`
  for (const p of prim) out += `  - [${p.slug}] ${p.title}\n      ${(p.excerpt??'').replace(/\s+/g,' ').slice(0,300)}\n`
  out += `SECONDARY (${sec.length}): ${sec.slice(0,14).map((p:any)=>p.slug).join(', ')}\n`
  out += `AYAH RECORDS (${ayahs.length}): ${ayahs.map((a:any)=>`${a.surah_number}:${a.ayah_start}-${a.ayah_end}`).join(', ')}\n`
}
writeFileSync('scripts/.tmp/hubdata3.md', out)
console.log('written', out.length, 'chars')
