import { createClient } from '@supabase/supabase-js'
import rr from '@/lib/reflection-render'
const { renderReflection, reflectionSlug, parseReflectionSlug, reflectionContentLength } = rr as any
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const all: any[] = []
for (let f=0;;f+=200){ const {data:d}=await s.from('ayah_records').select('*').eq('status','published').range(f,f+199); if(!d?.length) break; all.push(...d); if(d.length<200) break }

const problems: string[] = []
let totalWords = 0, thin = 0
for (const r of all) {
  const ref = `${r.surah_number}:${r.ayah_start}-${r.ayah_end}`
  const { html, citedRefs, wordCount } = renderReflection(r)
  totalWords += wordCount
  if (reflectionContentLength(r) < 3000) thin++

  // leak checks
  if (/\[PAUSE\]/.test(html)) problems.push(`${ref} PAUSE leaked`)
  if (/\[ayah:/.test(html)) problems.push(`${ref} ayah tag leaked`)
  if (/<!--/.test(html)) problems.push(`${ref} html comment leaked`)
  if (/\*\*/.test(html)) problems.push(`${ref} ** leaked: ${(html.match(/.{0,50}\*\*.{0,50}/)||[])[0]}`)
  if (/^\s*\|/m.test(html)) problems.push(`${ref} table row leaked`)
  if (/^#{1,6}\s/m.test(html.replace(/<[^>]*>/g,''))) problems.push(`${ref} heading leaked`)
  // tag balance
  for (const tag of ['p','blockquote','table','ul','ol','strong','em','h2','h3','div']) {
    const open = (html.match(new RegExp(`<${tag}(\\s|>)`,'g'))||[]).length
    const close = (html.match(new RegExp(`</${tag}>`,'g'))||[]).length
    if (open !== close) problems.push(`${ref} unbalanced <${tag}>: ${open} open / ${close} close`)
  }
  // slug roundtrip
  const slug = reflectionSlug(r.surah_number, r.ayah_start, r.ayah_end)
  const parsed = parseReflectionSlug(slug)
  if (!parsed || parsed.surah!==r.surah_number || parsed.ayahStart!==r.ayah_start || parsed.ayahEnd!==(r.ayah_end||r.ayah_start))
    problems.push(`${ref} slug roundtrip FAILED: ${slug} -> ${JSON.stringify(parsed)}`)
}
// slug uniqueness
const slugs = all.map(r=>reflectionSlug(r.surah_number,r.ayah_start,r.ayah_end))
const dupes = slugs.filter((x,i)=>slugs.indexOf(x)!==i)
if (dupes.length) problems.push('DUPLICATE SLUGS: '+[...new Set(dupes)].join(', '))

console.log(`records ${all.length} | total rendered words ${totalWords.toLocaleString()} | avg ${Math.round(totalWords/all.length)} | thin(<3000 chars) ${thin}`)
console.log(problems.length ? `PROBLEMS (${problems.length}):\n` + problems.slice(0,40).join('\n') : 'NO PROBLEMS')
