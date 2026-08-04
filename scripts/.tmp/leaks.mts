import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('surah_number,ayah_start,layer_a,layer_b').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }
let np=0, na=0
for (const r of all) for (const body of [r.layer_a?.linguistic_html??'', r.layer_b?.reflection_html??'']) {
  for (const line of body.split('\n')) {
    if (/\[PAUSE\]/.test(line) && !/^\[PAUSE\]\s*$/.test(line)) { if(np++<4) console.log('PAUSE-INLINE:', JSON.stringify(line.slice(0,150))) }
    if (/\[ayah:/.test(line) && !/^\[ayah:\d+:\d+(-\d+)?\]/.test(line)) { if(na++<6) console.log('AYAH-INLINE:', JSON.stringify(line.slice(0,170))) }
  }
}
console.log('total inline PAUSE lines:', np, 'inline ayah lines:', na)
