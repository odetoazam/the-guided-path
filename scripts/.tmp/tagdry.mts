import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const corpus = JSON.parse(readFileSync('scripts/.corpus-cache/quranic-corpus.json','utf8')) as Record<string, any[]>

const DIACRITICS = /[ً-ْٰـ۟-ۭ]/g
const norm = (t: string) => (t||'').replace(DIACRITICS,'').replace(/[^ء-ي]/g,'')

const { data: ents } = await s.from('entities').select('id,slug,name_translit,name_arabic,root_letters,category')
const rooted = (ents??[]).filter((e:any)=>e.root_letters).map((e:any)=>({...e, root: norm(e.root_letters)}))
const named  = (ents??[]).filter((e:any)=>!e.root_letters && e.name_arabic).map((e:any)=>({...e, nm: norm(e.name_arabic)}))

const recs:any[]=[]
for(let f=0;;f+=200){const {data}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,title').eq('status','published').range(f,f+199); if(!data?.length)break; recs.push(...data); if(data.length<200)break}

const rootFreq = new Map<string, number>()   // how many records a root shows up in
const perRecord: {rec:any, hits:{slug:string,count:number,kind:string}[]}[] = []

for (const r of recs) {
  const counts = new Map<string, number>()
  const lemmas = new Set<string>()
  for (let a = r.ayah_start; a <= (r.ayah_end || r.ayah_start); a++) {
    for (const seg of corpus[`${r.surah_number}:${a}`] ?? []) {
      if (seg.root) counts.set(norm(seg.root), (counts.get(norm(seg.root))??0)+1)
      if (seg.lemma) lemmas.add(norm(seg.lemma))
    }
  }
  const hits: {slug:string,count:number,kind:string}[] = []
  for (const e of rooted) { const c = counts.get(e.root); if (c) hits.push({slug:e.slug, count:c, kind:'root'}) }
  for (const e of named)  { if (lemmas.has(e.nm)) hits.push({slug:e.slug, count:1, kind:'name'}) }
  for (const h of hits) rootFreq.set(h.slug, (rootFreq.get(h.slug)??0)+1)
  perRecord.push({rec:r, hits})
}

console.log('records:', recs.length)
console.log('records with >=1 hit:', perRecord.filter(p=>p.hits.length).length)
console.log('avg hits/record:', (perRecord.reduce((n,p)=>n+p.hits.length,0)/recs.length).toFixed(1))
console.log('\nNOISIEST entities (appear in most records):')
for (const [slug,n] of [...rootFreq].sort((a,b)=>b[1]-a[1]).slice(0,18)) console.log(`  ${slug.padEnd(18)} ${n} records`)
console.log('\nSAMPLE records:')
for (const p of perRecord.slice(0,6)) {
  console.log(`  ${p.rec.surah_number}:${p.rec.ayah_start}-${p.rec.ayah_end} -> ` + p.hits.sort((a,b)=>b.count-a.count).map(h=>`${h.slug}(${h.count}${h.kind==='name'?',name':''})`).join(' '))
}
