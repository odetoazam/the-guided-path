import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await supabase.from('entities').select('id, slug, name_translit, category').in('slug', ['dawud', 'talut', 'jalut', 'bani-israil', 'musa', 'harun', 'samuel', 'shamwil'])
console.log(JSON.stringify(data, null, 2))
