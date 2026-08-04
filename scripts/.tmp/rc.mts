import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data, error } = await s.from('user_reflections').select('*').limit(1)
console.log('cols:', Object.keys(data?.[0] ?? {}), 'err:', error?.message)
const { data: types } = await s.from('user_reflections').select('content_type')
console.log('distinct content_type:', [...new Set((types??[]).map((t:any)=>t.content_type))])
