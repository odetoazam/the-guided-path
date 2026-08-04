import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('surah_number,ayah_start,layer_a,layer_b').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
const tagCount: Record<string,number> = {}
for (const r of all){
  for (const body of [r.layer_a?.linguistic_html ?? '', r.layer_b?.reflection_html ?? '']){
    const noComment = body.replace(/<!--[\s\S]*?-->/g,'')
    for (const m of noComment.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g)) tagCount[m[1].toLowerCase()] = (tagCount[m[1].toLowerCase()]??0)+1
  }
}
console.log('HTML TAGS outside comments:', tagCount)
// how much content is inside comments?
let cLen=0, tLen=0
for (const r of all) for (const body of [r.layer_a?.linguistic_html ?? '', r.layer_b?.reflection_html ?? '']) { tLen+=body.length; for(const m of body.matchAll(/<!--[\s\S]*?-->/g)) cLen+=m[0].length }
console.log('display chars total', tLen, 'inside comments', cLen)
