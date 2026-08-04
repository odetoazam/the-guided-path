import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const corpus = JSON.parse(readFileSync('scripts/.corpus-cache/quranic-corpus.json','utf8')) as Record<string, any[]>
const DIA = /[ً-ْٰـ۟-ۭ]/g
const norm = (t:string)=> (t||'').replace(DIA,'').replace(/[^ء-ي]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة$/,'ه')
const { data: ents } = await s.from('entities').select('id,slug,name_arabic,category')
const E = (ents??[]).filter((e:any)=>e.name_arabic).map((e:any)=>({...e, key: norm(e.name_arabic)}))
const recs:any[]=[]
for(let f=0;;f+=200){const {data}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,title').eq('status','published').range(f,f+199); if(!data?.length)break; recs.push(...data); if(data.length<200)break}
const existing=new Set<string>()
for(let f=0;;f+=1000){const {data}=await s.from('entity_tags').select('entity_id,ayah_record_id').not('ayah_record_id','is',null).range(f,f+999); if(!data?.length)break; data.forEach((t:any)=>existing.add(`${t.ayah_record_id}|${t.entity_id}`)); if(data.length<1000)break}

const plan:any[]=[]
for (const r of recs) {
  const lem=new Map<string,number>()
  for (let a=r.ayah_start;a<=(r.ayah_end||r.ayah_start);a++)
    for (const seg of corpus[`${r.surah_number}:${a}`]??[]) if (seg.lemma){const k=norm(seg.lemma); lem.set(k,(lem.get(k)??0)+1)}
  for (const e of E) {
    const n = lem.get(e.key); if(!n) continue
    if (existing.has(`${r.id}|${e.id}`)) continue
    const is_primary = n>=2 || e.category==='quranic_characters'
    plan.push({ayah_record_id:r.id, entity_id:e.id, is_primary, slug:e.slug, ref:`${r.surah_number}:${r.ayah_start}-${r.ayah_end}`, n, title:r.title})
  }
}
writeFileSync('scripts/.tmp/tagplan.json', JSON.stringify(plan,null,1))
console.log('planned tags:', plan.length, '| primary:', plan.filter(p=>p.is_primary).length, '| secondary:', plan.filter(p=>!p.is_primary).length)
console.log('records touched:', new Set(plan.map(p=>p.ayah_record_id)).size)
console.log('\n--- ALL PRIMARY TAGS for review (first 40) ---')
for (const p of plan.filter(p=>p.is_primary).slice(0,40))
  console.log(`  ${p.ref.padEnd(12)} ${p.slug.padEnd(14)} x${p.n}  | ${String(p.title).slice(0,50)}`)
