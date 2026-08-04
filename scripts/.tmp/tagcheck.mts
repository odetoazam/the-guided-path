import { createClient } from '@supabase/supabase-js'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const { data: posts } = await s.from('posts').select('id,slug,title,excerpt').eq('status','published').limit(500)
const probes: Record<string,RegExp> = {
  tadabbur: /tadabbur|contemplat|reflect on the quran|how to read/i,
  nazm: /nazm|naẓm|coherence|ring composition|structure of the surah|chiasm/i,
  khushu: /khushu|khushū|humility in prayer|salah|prayer/i,
  fitrah: /fitrah|fiṭrah|innate|natural disposition/i,
  tawakkul: /tawakkul|reliance|trust in allah|entrust/i,
}
for (const [slug, re] of Object.entries(probes)) {
  const hits = (posts??[]).filter((p:any)=> re.test(p.title) || re.test(p.excerpt??''))
  console.log(`\n### ${slug} — ${hits.length} candidate articles by title/excerpt`)
  for (const h of hits.slice(0,8)) console.log(`   ${h.slug} :: ${h.title.slice(0,80)}`)
}
