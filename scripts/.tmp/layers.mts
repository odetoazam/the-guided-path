import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data } = await s.from('ayah_records').select('*').eq('surah_number',94).eq('ayah_start',1).single()
const r = data as any
console.log('layer_a keys:', Object.keys(r.layer_a ?? {}))
console.log('layer_b keys:', Object.keys(r.layer_b ?? {}))
for (const [k,v] of Object.entries(r.layer_a ?? {})) console.log(`\n=== A.${k} (${String(v).length} chars) ===\n${String(v).slice(0,700)}`)
for (const [k,v] of Object.entries(r.layer_b ?? {})) console.log(`\n=== B.${k} (${String(v).length} chars) ===\n${String(v).slice(0,900)}`)
