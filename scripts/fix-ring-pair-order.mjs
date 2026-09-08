#!/usr/bin/env node
/**
 * Orders ring pairs outermost-first in the four surahs where that alone makes the
 * diagram concentric (7, 12, 65, 66).
 *
 *   node scripts/fix-ring-pair-order.mjs            # dry run
 *   node scripts/fix-ring-pair-order.mjs --apply
 *
 * A ring diagram is read outside-in, so the order of the rows is a claim about
 * structure. This only reorders rows; no pairing, verse, colour or wording changes,
 * and it refuses to write unless the reordering actually produces a nested ring.
 * The other non-nesting rings are left alone: whether they are broken rings or
 * simply a different structure is a judgement about the reading, not about the data.
 */
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
const APPLY=process.argv.includes('--apply')
const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return[l.slice(0,i).trim(),l.slice(i+1).trim().replace(/^"|"$/g,'')]}))
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const TARGETS=[7,12,65,66]
const lo=a=>{const m=String(a).match(/(\d+)/);return m?+m[1]:null}
const hi=a=>{const m=String(a).match(/(\d+)\s*[-–—‒]\s*(\d+)/);if(m)return +m[2];const o=String(a).match(/(\d+)/);return o?+o[1]:null}
const span=p=>[lo(p.left?.ayahs), hi(p.right?.ayahs)]
const nests=A=>A.every((p,k)=>{if(k===0)return true;const[a,b]=span(p),[c,d]=span(A[k-1]);return a>=c&&b<=d})

const { data, error } = await sb.from('surah_visual_data').select('surah_number,tabs,diagrams').in('surah_number',TARGETS)
if(error){console.error(error.message);process.exit(2)}
let planned=0
for (const r of data.sort((a,b)=>a.surah_number-b.surah_number)) {
  const tab=(r.tabs||[]).find(t=>t.renderer==='ring'); if(!tab) continue
  const d=r.diagrams[tab.diagramKey]; const before=d.pairs
  if(nests(before)){ console.log(`  surah ${r.surah_number}: already nested, skipping`); continue }
  const after=[...before].sort((a,b)=>{const[al,ar]=span(a),[bl,br]=span(b);return (ar-al)===(br-bl)?al-bl:(br-bl)-(ar-al)})
  if(!nests(after)){ console.log(`  surah ${r.surah_number}: reordering does not make it nest, skipping`); continue }
  const bag=A=>A.map(x=>JSON.stringify(x)).sort().join('|')
  if(bag(after)!==bag(before)) throw new Error(`surah ${r.surah_number}: reorder changed the set of pairs`)
  if(after.length!==before.length) throw new Error(`surah ${r.surah_number}: pair count changed`)
  console.log(`  surah ${String(r.surah_number).padStart(3)} "${tab.label}"  ${before.map(p=>`${p.left?.ayahs}↔${p.right?.ayahs}`).join('  ')}`)
  console.log(`            becomes  ${after.map(p=>`${p.left?.ayahs}↔${p.right?.ayahs}`).join('  ')}`)
  planned++
  if(APPLY){ d.pairs=after
    const { error:e2 } = await sb.from('surah_visual_data').update({diagrams:r.diagrams}).eq('surah_number',r.surah_number)
    console.log(`            ${e2?'FAILED '+e2.message:'written'}`) }
}
console.log(`\n${planned} ring(s) ${APPLY?'reordered':'would be reordered'}`)
if(!APPLY) console.log('Nothing written. Re-run with --apply.')
