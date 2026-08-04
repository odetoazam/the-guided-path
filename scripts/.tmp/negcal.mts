import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugs = ['mutrafun-affluent-rejected-every-prophet-quran','riba-only-declaration-of-war-quran','aqabah-steep-climb-al-balad-quran','dawud-iron-work-worship-quran','qunut-despair-mercy-quran']
const RE = /\b(not|never|no|nothing|nobody|cannot|isn't|without|neither|nor)\b/gi
function score(html: string) {
  const prose = html.replace(/<blockquote[\s\S]*?<\/blockquote>/g,'').replace(/<!--[\s\S]*?-->/g,'')
  const text = prose.replace(/<[^>]+>/g,' ')
  const w = text.split(/\s+/).filter(Boolean).length
  const n = (text.match(RE)||[]).length
  return { w, n, per2000: +(n/w*2000).toFixed(1) }
}
for (const slug of slugs) {
  const { data } = await s.from('posts').select('content_html').eq('slug',slug).single()
  if (!data) { console.log(slug, 'not found'); continue }
  const r = score((data as any).content_html)
  console.log(`${slug.padEnd(52)} words ${String(r.w).padStart(5)}  negations ${String(r.n).padStart(3)}  per2000 ${r.per2000}`)
}
const mine = score(readFileSync('scripts/drafts/tadabbur/tadabbur-question-never-command.html','utf8'))
console.log(`\n${'MY DRAFT'.padEnd(52)} words ${String(mine.w).padStart(5)}  negations ${String(mine.n).padStart(3)}  per2000 ${mine.per2000}`)
