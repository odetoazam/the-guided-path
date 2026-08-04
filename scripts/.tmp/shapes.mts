import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,layer_a,layer_b').eq('status','published').range(f,f+199); if(!data?.length) break; all.push(...data); if(data.length<200) break }
console.log('records:', all.length)
const counts: Record<string,number> = {}
const bump=(k:string)=>counts[k]=(counts[k]??0)+1
let lenA=0, lenB=0, missingLing=0, missingRefl=0
for (const r of all){
  const ling = r.layer_a?.linguistic_html ?? ''
  const refl = r.layer_b?.reflection_html ?? ''
  if(!ling.trim()) missingLing++
  if(!refl.trim()) missingRefl++
  lenA+=ling.length; lenB+=refl.length
  for (const body of [ling,refl]){
    for (const line of body.split('\n')){
      if(/^#{1,6}\s/.test(line)) bump('heading '+(line.match(/^#+/)![0].length))
      else if(/^\s*\|.*\|/.test(line)) bump('table-row')
      else if(/^\s*[-*]\s+/.test(line)) bump('bullet')
      else if(/^\s*\d+\.\s+/.test(line)) bump('ol')
      else if(/^>\s/.test(line)) bump('blockquote')
      else if(/^(---|\*\*\*|___)\s*$/.test(line)) bump('hr')
      else if(/^<!--/.test(line)) bump('html-comment')
      else if(/^<[a-z]/i.test(line)) bump('raw-html-line')
    }
    if(/\[ayah:\d+:\d+(-\d+)?\]/.test(body)) bump('ayah-tag')
    if(/\*\*[^*]+\*\*/.test(body)) bump('bold')
    if(/(?<!\*)\*(?!\*)[^*]+\*/.test(body)) bump('italic')
    if(/\[[^\]]+\]\([^)]+\)/.test(body)) bump('md-link')
    if(/`[^`]+`/.test(body)) bump('code')
  }
}
console.log('avg linguistic chars', Math.round(lenA/all.length), 'avg reflection chars', Math.round(lenB/all.length))
console.log('missing linguistic:', missingLing, 'missing reflection:', missingRefl)
console.log(counts)
// sample raw-html lines
const ex = all.find(r=>/^<[a-z]/im.test(r.layer_b?.reflection_html??''))
if(ex) console.log('RAW HTML EXAMPLE:', (ex.layer_b.reflection_html.match(/^<[a-z][^\n]*/im)||[])[0])
