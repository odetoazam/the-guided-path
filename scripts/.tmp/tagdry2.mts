import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const corpus = JSON.parse(readFileSync('scripts/.corpus-cache/quranic-corpus.json','utf8')) as Record<string, any[]>
const DIA = /[ً-ْٰـ۟-ۭ]/g
const norm = (t:string)=> (t||'').replace(DIA,'').replace(/[^ء-ي]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة$/,'ه')

const { data: ents } = await s.from('entities').select('id,slug,name_translit,name_arabic,root_letters,category')
const E = (ents??[]).filter((e:any)=>e.name_arabic).map((e:any)=>({...e, key: norm(e.name_arabic)}))
console.log('entities with arabic name:', E.length)

const recs:any[]=[]
for(let f=0;;f+=200){const {data}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,title').eq('status','published').range(f,f+199); if(!data?.length)break; recs.push(...data); if(data.length<200)break}

const freq=new Map<string,number>(); const per:any[]=[]
for (const r of recs) {
  const lemmas = new Map<string,number>()
  for (let a=r.ayah_start; a<=(r.ayah_end||r.ayah_start); a++)
    for (const seg of corpus[`${r.surah_number}:${a}`] ?? []) {
      if (seg.lemma) { const k=norm(seg.lemma); lemmas.set(k,(lemmas.get(k)??0)+1) }
    }
  const hits = E.filter((e:any)=>lemmas.has(e.key)).map((e:any)=>({slug:e.slug, n:lemmas.get(e.key)!, cat:e.category}))
  hits.forEach(h=>freq.set(h.slug,(freq.get(h.slug)??0)+1))
  per.push({r,hits})
}
console.log('records with >=1 lemma hit:', per.filter(p=>p.hits.length).length, '| avg hits:', (per.reduce((n,p)=>n+p.hits.length,0)/recs.length).toFixed(1))
console.log('\ntop entities:'); for(const [k,v] of [...freq].sort((a,b)=>b[1]-a[1]).slice(0,14)) console.log(`  ${k.padEnd(16)} ${v}`)
console.log('\nSAMPLES:')
for (const p of per.filter(x=>x.hits.length).slice(0,14))
  console.log(`  ${p.r.surah_number}:${p.r.ayah_start}-${p.r.ayah_end} -> ${p.hits.map((h:any)=>`${h.slug}(${h.n})`).join(' ')}   | ${String(p.r.title).slice(0,44)}`)
