#!/usr/bin/env node
/**
 * Deletes the now-unrendered `fullText` arrays, and the FullSurahText component that
 * read them, from the static overview pages. Run only after strip-overview-text-tab.mjs.
 *
 *   node scripts/strip-overview-fulltext-data.mjs [--apply]
 *
 * These arrays are whole surahs of Arabic that nothing renders any more but that still
 * ship to every visitor. A file is only touched when it has no remaining reference to
 * either name, so a page that still uses them is left alone.
 */
import fs from 'fs'
const APPLY=process.argv.includes('--apply')
const DIR='src/data/visual'
let files=0, bytes=0, skipped=[]
for (const f of fs.readdirSync(DIR).filter(x=>x.endsWith('.tsx')).sort()) {
  const p=`${DIR}/${f}`; const before=fs.readFileSync(p,'utf8')
  if(/<FullSurahText\b/.test(before)){ skipped.push(`${f} (still rendered)`); continue }
  let s=before
  // the data array
  s=s.replace(/\n  fullText: \[[\s\S]*?\n  \],(?=\n)/,'')
  // single-line variants
  s=s.replace(/\n  fullText: \[.*?\],(?=\n)/,'')
  // the component that read it (declaration may be one line or several)
  s=s.replace(/\nfunction FullSurahText\(\{ verses \}: \{ verses: typeof SURAH_DATA\.fullText \}\)[\s\S]*?\n\}\n/,'\n')
  s=s.replace(/\nfunction FullSurahText\(\{ verses \}: \{ verses: typeof SURAH_DATA\.fullText \}\) \{ return \(.*?\); \}\n/,'\n')
  if(/fullText/.test(s)){ skipped.push(`${f} (a reference to fullText survives)`); continue }
  if(!/heartVerse/.test(s)){ skipped.push(`${f} (heart verse lost)`); continue }
  files++; bytes+=before.length-s.length
  if(APPLY) fs.writeFileSync(p,s)
}
console.log(`${APPLY?'APPLIED':'DRY RUN'}: ${files} files, ${(bytes/1024).toFixed(0)} KB of Quranic text removed from the bundle`)
if(skipped.length){ console.log(`skipped ${skipped.length}:`); skipped.slice(0,20).forEach(x=>console.log('   '+x)) }
if(!APPLY) console.log('Nothing written. Re-run with --apply.')
