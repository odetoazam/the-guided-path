import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const { data: one } = await s.from('ayah_records').select('*').limit(1)
const sample = (one?.[0] ?? {}) as Record<string, unknown>
console.log('COLUMNS:', Object.keys(sample).join(', '))
const { count: total } = await s.from('ayah_records').select('*', { count: 'exact', head: true })
const { count: pub } = await s.from('ayah_records').select('*', { count: 'exact', head: true }).eq('status','published')
console.log('ayah_records total:', total, 'published:', pub)
for (const k of Object.keys(sample)) {
  const v = sample[k]
  console.log(`  ${k}: ${(typeof v === 'string' ? JSON.stringify(v.slice(0,100)) : JSON.stringify(v))?.slice(0,120)}`)
}
const stops: [number,number][] = [[2,153],[94,1],[89,27],[1,6],[2,26],[55,1],[2,44],[2,149]]
for (const [su, st] of stops) {
  const { data } = await s.from('ayah_records').select('surah_number,ayah_start,ayah_end,title,status').eq('surah_number',su).eq('ayah_start',st)
  console.log(`STOP ${su}:${st} ->`, data?.length ? JSON.stringify(data) : 'NOT FOUND')
}
