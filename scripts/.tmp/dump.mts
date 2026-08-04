import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data } = await s.from('ayah_records').select('*').eq('surah_number',94).eq('ayah_start',1).single()
const r = data as any
writeFileSync('scripts/.tmp/sample-ling.md', r.layer_a.linguistic_html)
writeFileSync('scripts/.tmp/sample-refl.md', r.layer_b.reflection_html)
// find one with a table in display content
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('id,surah_number,ayah_start,layer_a,layer_b').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
const withTable = all.find(x => /^\s*\|.*\|/m.test(x.layer_a?.linguistic_html ?? ''))
if (withTable) { writeFileSync('scripts/.tmp/sample-table.md', withTable.layer_a.linguistic_html); console.log('table sample:', withTable.surah_number+':'+withTable.ayah_start) }
const withHtml = all.find(x => /^<[a-z]/im.test(x.layer_b?.reflection_html ?? ''))
if (withHtml) { writeFileSync('scripts/.tmp/sample-html.md', withHtml.layer_b.reflection_html); console.log('rawhtml sample:', withHtml.surah_number+':'+withHtml.ayah_start) }
// content thinness report
const thin = all.filter(x => ((x.layer_a?.linguistic_html??'').length + (x.layer_b?.reflection_html??'').length) < 4000)
console.log('records under 4000 display chars:', thin.length, thin.slice(0,30).map(t=>`${t.surah_number}:${t.ayah_start}(${(t.layer_a?.linguistic_html??'').length}+${(x=>x)((t.layer_b?.reflection_html??'').length)})`).join(' '))
