import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
async function main() {
  const { data } = await supabase.from('surah_visual_data').select('surah_number, why_this_surah').in('surah_number', [52, 67, 112])
  console.log(JSON.stringify(data, null, 2))
}
main()
