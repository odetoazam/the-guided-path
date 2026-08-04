import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('id,surah_number,ayah_start,ayah_end,title,translation').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
const has = (su:number,a:number)=> all.find(r=>r.surah_number===su && a>=r.ayah_start && a<=r.ayah_end)
const probe: Record<string,[number,number][]> = {
  tadabbur: [[47,24],[38,29],[4,82],[23,68]],
  khushu:   [[23,1],[2,45],[57,16],[17,109]],
  fitrah:   [[30,30],[7,172]],
  tawakkul: [[65,2],[3,159],[8,2],[9,51],[14,12],[11,88]],
  nazm:     [[11,1],[39,23],[15,87]],
}
for (const [hub, refs] of Object.entries(probe)) {
  console.log(`\n### ${hub}`)
  for (const [su,a] of refs) { const r = has(su,a); console.log(`  ${su}:${a} -> ${r ? `${r.surah_number}:${r.ayah_start}-${r.ayah_end} :: ${(r.title??'').slice(0,70)}` : 'no record'}`) }
}
const { data: g } = await s.from('entities').select('slug,name_translit,one_line,glossary_entry').in('slug',['tadabbur','nazm','khushu','fitrah','tawakkul'])
console.log('\n=== entity glossary presence ===')
for (const e of g??[]) console.log(`${(e as any).slug}: one_line=${!!(e as any).one_line} glossary_entry=${(e as any).glossary_entry ? 'YES' : 'no'}`)
