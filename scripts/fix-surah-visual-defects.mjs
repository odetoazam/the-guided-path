#!/usr/bin/env node
/**
 * Repairs eight defects found by auditing all 114 surahs' Overview tabs on 2026-09-07.
 *
 *   node scripts/fix-surah-visual-defects.mjs            # dry run, prints what it would change
 *   node scripts/fix-surah-visual-defects.mjs --apply    # writes to surah_visual_data
 *
 * Six are Quranic quotations that were wrong: three quoted a DIFFERENT surah as though
 * it belonged to this one, one dropped a word, and two sat under the wrong ayah number.
 * Two are tabs pointing at diagrams that do not exist, so they rendered nothing.
 *
 * Every replacement Arabic string is spliced out of quran-validator by word index and
 * asserted to be a substring of the canonical verse. No Quranic text is typed here.
 * Each edit asserts on the text it is replacing, so a second run against changed data
 * fails loudly instead of writing something unintended.
 *
 * Pre-change snapshot of the affected rows: scripts/data/surah-visual-backup-2026-09-07.json
 */
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import { QuranValidator } from 'quran-validator'
const APPLY=process.argv.includes('--apply')
const env=Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return[l.slice(0,i).trim(),l.slice(i+1).trim().replace(/^"|"$/g,'')]}))
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const v=new QuranValidator()
// splice: take words [i,j) of a canonical verse. Never type Quranic text.
const W=(s,a,i,j)=>{const t=v.getVerse(s,a).text, out=t.split(' ').slice(i,j).join(' ')
  if(!t.includes(out)) throw new Error(`splice ${s}:${a} [${i},${j}) is not a substring`)
  return out}
const all=JSON.parse(fs.readFileSync(new URL('./data/surah-visual-snapshot.json',import.meta.url),'utf8'))
const get=n=>JSON.parse(JSON.stringify(all.find(r=>r.surah_number===n)))
const edits=[]
const push=(n,field,value,note)=>edits.push({n,field,value,note})

// 1. surah 7 — the funnel quoted 27:56 (An-Naml). Al-A'raf's own wording is 7:82.
{ const r=get(7), L=r.diagrams.deductiveFunnel.layers[3]
  if(!/آلَ لُوطٍ/.test(L.arabic)) throw new Error('s7 anchor moved')
  L.arabic=W(7,82,7,14); push(7,'diagrams',r.diagrams,'funnel: 27:56 → the 7:82 wording') }
// 2. surah 9 — the quote is 9:81; the layer claimed 38–57.
{ const r=get(9), L=r.diagrams.deductiveFunnel.layers[1]
  if(L.ayah!=='38–57') throw new Error('s9 anchor moved')
  L.ayah='38–57, 81'; push(9,'diagrams',r.diagrams,'funnel: label now includes 81, where the quote is') }
// 3. surah 10 — quoted a word that is in 7:136/21:77/43:55, never in Yunus. 10:73 is the drowning in range.
{ const r=get(10), L=r.diagrams.deductiveFunnel.layers[2]
  if(L.arabic.trim()!=='فَأَغْرَقْنَاهُمْ') throw new Error('s10 anchor moved')
  L.arabic=W(10,73,8,12); push(10,'diagrams',r.diagrams,'funnel: out-of-surah word → 10:73') }
// 4. surah 16 — the phrase is 16:121, the layer said 120.
{ const r=get(16), L=r.diagrams.deductiveFunnel.layers[3]
  if(L.ayah!=='120') throw new Error('s16 anchor moved')
  L.ayah='120–121'; push(16,'diagrams',r.diagrams,'funnel: 120 → 120–121, the sentence spans both') }
// 5. surah 26 — quoted 7:79 (Salih in Al-A'raf). The n-s-h root does not occur in surah 26 at all.
{ const r=get(26), L=r.diagrams.deductiveFunnel.layers[3]
  if(!/النَّاصِحِينَ/.test(L.arabic)) throw new Error('s26 anchor moved')
  L.arabic=W(26,181,1,7)
  L.desc="Lut's people choose desire over guidance. Shu'ayb's people corrupt the scales — give full measure, and do not be of those who cause loss. Two appetites, one for the body and one for the ledger, judged by the same standard."
  push(26,'diagrams',r.diagrams,'funnel: 7:79 quote and its claim replaced with 26:181') }
// 6. surah 38 — 38:83 reads "your servants FROM AMONG THEM the sincere"; the quote dropped a word.
{ const r=get(38), L=r.diagrams.deductiveFunnel.layers[3]
  if(L.arabic.trim()!=='عِبَادَكَ الْمُخْلَصِينَ') throw new Error('s38 anchor moved')
  L.arabic=W(38,83,1,4); push(38,'diagrams',r.diagrams,'funnel: quote made contiguous with 38:83') }
// 7. surah 54 — the Lut and Fir'awn sections were given a refrain that is not in them.
{ const r=get(54), E=r.diagrams.refrainPattern.elements
  if(E[4].ayah!=='33–40'||E[5].ayah!=='41–42') throw new Error('s54 anchor moved')
  E[4].form=W(54,37,6,9)                       // 54:37 and 54:39 carry "so taste My punishment"
  E[5].form=''; E[5].role="Fir'awn — no refrain"
  push(54,'diagrams',r.diagrams,'refrains: 33–40 gets the refrain it actually has; 41–42 has none') }
// 8. surahs 16 and 17 — a "Sections" tab pointing at a diagram that does not exist (renders nothing)
for (const n of [16,17]) { const r=get(n)
  const before=r.tabs.length
  r.tabs=r.tabs.filter(t=>!(t.diagramKey && !r.diagrams?.[t.diagramKey]))
  if(r.tabs.length===before) throw new Error(`s${n}: no dead tab found`)
  push(n,'tabs',r.tabs,`removed dead tab (pointed at missing data)`) }

console.log(APPLY?'APPLYING':'DRY RUN — pass --apply to write','\n')
for(const e of edits) console.log(`  surah ${String(e.n).padStart(3)}  ${e.field.padEnd(9)} ${e.note}`)
if(APPLY){ console.log()
  for(const e of edits){ const { error } = await sb.from('surah_visual_data').update({[e.field]:e.value}).eq('surah_number',e.n)
    console.log(`  surah ${String(e.n).padStart(3)} ${e.field}: ${error?'FAILED '+error.message:'written'}`) } }
if(!APPLY) console.log('\nNothing written. Re-run with --apply to write these to the database.')
