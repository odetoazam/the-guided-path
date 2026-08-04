import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('layer_a,layer_b').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
const tags: Record<string,number> = {}
const heads: Record<string,number> = {}
let tableLines = 0
for (const r of all){
  for (const body of [r.layer_a?.linguistic_html ?? '', r.layer_b?.reflection_html ?? '']){
    for (const m of body.matchAll(/\[([A-Z][A-Z _-]{2,30})\]/g)) tags[m[1]] = (tags[m[1]]??0)+1
    for (const m of body.matchAll(/^(#{1,4})\s+(.+)$/gm)) { const t = m[2].trim().replace(/[:—-].*$/,'').slice(0,42); if(m[1].length<=2) heads[t]=(heads[t]??0)+1 }
    tableLines += (body.match(/^\s*\|/gm) ?? []).length
  }
}
console.log('BRACKET TAGS:', tags)
console.log('TABLE LINES total:', tableLines)
console.log('TOP H1/H2:', Object.entries(heads).sort((a,b)=>b[1]-a[1]).slice(0,18))
