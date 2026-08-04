import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('surah_number,ayah_start,passage_context,translation').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
let withKey=0, empty=0
for (const r of all){ const p=r.passage_context??''; if(!p.trim()) empty++; if(/Key linguistic|discoveries:|Form [IVX]+ /.test(p)) withKey++ }
console.log('total',all.length,'empty passage_context',empty,'contains production shorthand',withKey)
for (const r of all.slice(0,6)) {
  const first = (r.passage_context??'').split(/(?<=[.!?])\s+/)[0] ?? ''
  console.log(`\n${r.surah_number}:${r.ayah_start} FIRST SENTENCE (${first.length}): ${first.slice(0,180)}`)
}
