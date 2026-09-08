#!/usr/bin/env node
/**
 * Audits the content behind every surah's Overview tabs (the surah_visual_data table).
 *
 *   node scripts/audit-surah-visual.mjs           # summary
 *   node scripts/audit-surah-visual.mjs --detail  # every finding
 *
 * Checks, in order of how badly each misleads a reader:
 *   1. Quranic quotations — is the Arabic the verse it is labelled with?
 *   2. ayah references that point outside the surah
 *   3. tabs that render nothing (missing diagram, or no renderer registered in code)
 *   4. ring diagrams whose own geometry is not a ring
 *   5. prose reused verbatim across different surahs
 *
 * On the Arabic comparison. The corpus is uthmani; a lot of this table is imla'i
 * (modern) spelling, which differs by real LETTERS, not just marks: al-salah is
 * written with a waw in the mushaf and an alef in modern print, and a shadda is
 * often spelled out as a doubled letter. So the comparison folds weak letters and
 * doubled consonants to a skeleton. That fold is self-tested below on real pairs
 * from this very table, and for collisions across all 6,236 verses — do not change
 * it without re-running those tests. A ranged diacritic strip would silently eat
 * Arabic letters, so the mark set is an explicit list of codepoints.
 */
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import { QuranValidator } from 'quran-validator'

const DETAIL = process.argv.includes('--detail')
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n')
  .filter(l=>l.includes('=')&&!l.startsWith('#'))
  .map(l=>{const i=l.indexOf('=');return[l.slice(0,i).trim(),l.slice(i+1).trim().replace(/^"|"$/g,'')]}))
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const v = new QuranValidator()

const MARKS=new Set([0x64B,0x64C,0x64D,0x64E,0x64F,0x650,0x651,0x652,0x653,0x654,0x655,0x656,0x657,0x658,0x659,0x65A,0x65B,0x65C,0x65D,0x65E,0x65F,
  0x6D6,0x6D7,0x6D8,0x6D9,0x6DA,0x6DB,0x6DC,0x6DD,0x6DE,0x6DF,0x6E0,0x6E1,0x6E2,0x6E3,0x6E4,0x6E5,0x6E6,0x6E7,0x6E8,0x6E9,0x6EA,0x6EB,0x6EC,0x6ED])
const letters = s => [...String(s).normalize('NFD')].filter(c=>!MARKS.has(c.codePointAt(0)))
  .map(c=>{const p=c.codePointAt(0); return p===0x670?'ا':p===0x640?'':c}).join('').normalize('NFC')
  .replace(/[آأإٱٓ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ء/g,'')
  .replace(/[^ؠ-ي\s]/g,'').replace(/\s+/g,' ').trim()
const skel = s => letters(s).replace(/[اوي]/g,'').replace(/(.)\1+/g,'$1').replace(/\s+/g,' ').trim()
const canon = (s,a) => { try { return v.getVerse(s,a)?.text || null } catch { return null } }

const COUNTS=[]; for(let s=1;s<=114;s++){let n=0;for(let a=1;a<=300;a++){try{if(v.getVerse(s,a)?.text)n=a;else break}catch{break}}COUNTS.push(n)}
if (COUNTS.reduce((a,b)=>a+b,0)!==6236) { console.error('verse counts do not total 6236'); process.exit(2) }

const { data: rows, error } = await sb.from('surah_visual_data').select('*')
if (error) { console.error(error.message); process.exit(2) }
const all = rows.sort((a,b)=>a.surah_number-b.surah_number)

/* self-tests: the fold must join imla'i to uthmani, and must not merge distinct verses */
{ const fails=[]
  let folded=0, checked=0
  for (const r of all) for (const verse of (r.full_text||[])) {
    const c=canon(r.surah_number, Number(verse.ayah)); if(!c||!verse.arabic) continue
    checked++; if (skel(verse.arabic)===skel(c)) folded++ }
  if (checked && folded/checked < 0.8) fails.push(`fold rate only ${folded}/${checked}`)
  let collisions=0; const seen=new Map()
  for(let s=1;s<=114;s++) for(let a=1;a<=COUNTS[s-1];a++){ const c=canon(s,a); if(!c) continue
    const k=skel(c); if(k.length<6) continue
    if(seen.has(k)){ const [ps,pa]=seen.get(k); if(canon(ps,pa)!==c) collisions++ } else seen.set(k,[s,a]) }
  if (collisions>30) fails.push(`${collisions} verse-skeleton collisions`)
  if (fails.length) { console.error('SELF-TEST FAILED:\n  '+fails.join('\n  ')); process.exit(2) }
  console.log(`self-test passed (fold ${folded}/${checked}, ${collisions} collisions in 6,236 verses)\n`) }

const surahSkel={}; for(let s=1;s<=114;s++){let w='';for(let a=1;a<=COUNTS[s-1];a++)w+=' '+skel(canon(s,a)||'');surahSkel[s]=w}
const SPLIT=/\s*(?:\.\.\.|…|↔|→|—)\s*/
const parseRefs = raw => { const out=[]
  for (const part of String(raw).split(/[,،]/)) {
    const cl=part.match(/^\s*\d+\s*:\s*(\d+)(?:\s*[-–—‒]\s*(\d+))?/), rg=part.match(/(\d+)\s*[a-z]?\s*[-–—‒]\s*(\d+)/i), on=part.match(/^\s*(\d+)\s*[a-z]?\s*$/i)
    if(cl){const a=+cl[1],b=cl[2]?+cl[2]:a;for(let x=a;x<=b;x++)out.push(x)}
    else if(rg){for(let x=+rg[1];x<=+rg[2];x++)out.push(x)}
    else if(on)out.push(+on[1]) }
  return out }

const F=[]; const add=(surah,kind,where,detail,got='')=>F.push({surah,kind,where,detail,got})
const REG=new Set([...fs.readFileSync('src/components/surah/diagrams/DiagramRenderer.tsx','utf8').matchAll(/^\s{2}([a-z]+):\s*[A-Z]/gm)].map(m=>m[1]))

for (const r of all) {
  const n=r.surah_number, max=COUNTS[n-1]

  /* 3. tabs that cannot render */
  for (const t of (r.tabs||[])) {
    // 'text' tabs were retired on purpose in Sep 2026; SurahTabs filters them out.
    if (t.renderer === 'text') continue
    if (!REG.has(t.renderer)) add(n,'DEAD-TAB',`tab "${t.label}"`,`renderer "${t.renderer}" is not registered in DiagramRenderer`)
    else if (t.diagramKey && !r.diagrams?.[t.diagramKey]) add(n,'DEAD-TAB',`tab "${t.label}"`,`points at "${t.diagramKey}", which has no data`)
  }

  /* 1 + 2. quotations and references */
  const check=(raw,hint,where,labelled)=>{
    for (const piece of String(raw).split(SPLIT)) {
      const sp=skel(piece); if(!sp||sp.length<3) continue
      if(!labelled){ if(!surahSkel[n].includes(sp)) add(n,'NOT-IN-SURAH',where,'not found anywhere in this surah',piece.slice(0,50)); continue }
      const targets=hint.map(a=>[a,canon(n,a)]).filter(x=>x[1])
      if (targets.some(([,c])=>piece===c||letters(piece)===letters(c))) continue
      if (targets.some(([,c])=>skel(c)===sp||skel(c).includes(sp))) continue
      if (targets.length>1 && skel(targets.map(([,c])=>c).join(' ')).includes(sp)) continue
      if (surahSkel[n].includes(sp)) { let real=null
        for(let a=1;a<=max;a++){const c=canon(n,a); if(c&&skel(c).includes(sp)){real=a;break}}
        add(n,'WRONG-AYAH',where,`labelled ${hint.join('/')}, but this is ayah ${real}`,piece.slice(0,50)) }
      else add(n,'NOT-IN-SURAH',where,`labelled ${hint.join('/')}, matches nothing in surah ${n}`,piece.slice(0,50)) } }

  const hv=r.heart_verse
  if(hv?.arabic&&hv?.ayahRef){ const m=String(hv.ayahRef).match(/^(\d+):/), refs=parseRefs(hv.ayahRef)
    if(m&&+m[1]===n&&refs.length) check(hv.arabic,refs,`heart verse ${hv.ayahRef}`,true) }

  const walk=(node,label)=>{ if(node===null||typeof node!=='object')return
    if(Array.isArray(node))return node.forEach(x=>walk(x,label))
    let hint=[]
    for(const k of ['ayah','ayahs','ayahRef','verse','verses']) if(node[k]!==undefined){
      hint=hint.concat(parseRefs(node[k]))
      for(const a of parseRefs(node[k])) if(a<1||a>max) add(n,'REF-OUT-OF-RANGE',`${label} → ${k}`,`"${node[k]}" cites ayah ${a}; surah has ${max}`) }
    for(const [k,val] of Object.entries(node)){
      if(typeof val==='string'&&/[ؠ-ۿ]/.test(val)&&val.replace(/[^ؠ-ۿ]/g,'').length>=6) check(val,hint,`${label} → ${k}`,hint.length>0)
      else if(typeof val==='object') walk(val,label) } }
  for(const [key,d] of Object.entries(r.diagrams||{})) walk(d,key)

  /* 4. ring geometry */
  const mid=a=>{const m=String(a).match(/(\d+)\s*[-–—‒]\s*(\d+)/); if(m)return(+m[1]+ +m[2])/2; const o=String(a).match(/(\d+)/); return o?+o[1]:null}
  for (const t of (r.tabs||[])) { if(t.renderer!=='ring')continue
    const d=r.diagrams?.[t.diagramKey]; if(!d?.pairs?.length)continue
    const rowsP=d.pairs.map(p=>[mid(p.left?.ayahs),mid(p.right?.ayahs)]).filter(x=>x[0]!==null&&x[1]!==null)
    rowsP.forEach(([l,rr],i)=>{ if(l>=rr) add(n,'RING-BACKWARDS',`"${t.label}" pair ${i+1}`,`${d.pairs[i].left?.ayahs} comes after ${d.pairs[i].right?.ayahs}`) })
    for(let i=1;i<rowsP.length;i++) if(!(rowsP[i][0]>=rowsP[i-1][0]&&rowsP[i][1]<=rowsP[i-1][1]))
      add(n,'RING-CROSSES',`"${t.label}" pair ${i+1}`,`does not sit inside pair ${i}, so the pairs cross rather than nest`)
    const c=mid(d.center?.ayahs)
    if(c!==null&&rowsP.length){ const inner=rowsP[rowsP.length-1]
      if(!(c>=inner[0]&&c<=inner[1])) add(n,'RING-CENTRE',`"${t.label}"`,`centre ${d.center?.ayahs} falls outside the innermost pair (${d.pairs[rowsP.length-1].left?.ayahs} / ${d.pairs[rowsP.length-1].right?.ayahs})`) }
  }
}

/* 5. prose reused across surahs */
{ const seen=new Map()
  const collect=(node,surah,where)=>{ if(node===null||typeof node!=='object')return
    if(Array.isArray(node))return node.forEach(x=>collect(x,surah,where))
    for(const [k,val] of Object.entries(node)){
      if(typeof val==='string'){ const t=val.trim()
        if(t.length>=45&&!/[ؠ-ۿ]/.test(t)){ const key=t.toLowerCase().replace(/\s+/g,' ')
          if(!seen.has(key))seen.set(key,new Set()); seen.get(key).add(surah) } }
      else if(typeof val==='object') collect(val,surah,where) } }
  for(const r of all){ for(const [key,d] of Object.entries(r.diagrams||{})) collect(d,r.surah_number,key)
    collect({why:r.why_this_surah,thesis:r.thesis},r.surah_number,'tab text') }
  for(const [txt,surahs] of seen) if(surahs.size>1)
    add([...surahs][0],'PROSE-REUSED','tab text',`the same sentence appears in surahs ${[...surahs].join(', ')}`,txt.slice(0,60)) }

const order=['NOT-IN-SURAH','WRONG-AYAH','REF-OUT-OF-RANGE','DEAD-TAB','RING-CENTRE','RING-BACKWARDS','RING-CROSSES','PROSE-REUSED']
const byKind={}; F.forEach(f=>byKind[f.kind]=(byKind[f.kind]||0)+1)
console.log(`${F.length} findings across ${new Set(F.map(f=>f.surah)).size} surahs\n`)
for (const k of order) if (byKind[k]) console.log(`  ${k.padEnd(18)} ${String(byKind[k]).padStart(3)}`)
if (DETAIL) for (const k of order) { const list=F.filter(f=>f.kind===k); if(!list.length) continue
  console.log(`\n── ${k} ──`)
  list.forEach(f=>console.log(`  surah ${String(f.surah).padStart(3)}  ${f.where}\n        ${f.detail}${f.got?`\n        ${f.got}`:''}`)) }
const serious = (byKind['NOT-IN-SURAH']||0)+(byKind['WRONG-AYAH']||0)+(byKind['REF-OUT-OF-RANGE']||0)
console.log(`\nwrong Quranic information: ${serious}`)
process.exit(serious>0?1:0)
