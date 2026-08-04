import { readFileSync, existsSync } from 'fs'
const src = readFileSync('scripts/generate-hub-syntheses-batch2.ts','utf8')
const refs = [...new Set([...src.matchAll(/\((\d{1,3}):(\d{1,3})(?:\s*and\s*(\d{1,3}):(\d{1,3}))?\)/g)].flatMap(m => {
  const out = [`${m[1]}:${m[2]}`]; if (m[3]) out.push(`${m[3]}:${m[4]}`); return out
}))]
const p = 'node_modules/quran-validator/data/quran-verses.json'
console.log('corpus present:', existsSync(p))
const data = JSON.parse(readFileSync(p,'utf8'))
const arr = Array.isArray(data) ? data : (data.verses ?? Object.values(data)[0])
console.log('corpus entries:', Array.isArray(arr) ? arr.length : 'unknown shape:', Object.keys(data).slice(0,5))
const get = (s:number,a:number)=> (arr as any[]).find(v => (v.surah??v.sura??v.chapter)===s && (v.ayah??v.verse??v.number)===a)
for (const r of refs) {
  const [s,a] = r.split(':').map(Number)
  const v = get(s,a)
  console.log(`${r.padEnd(8)} ${v ? 'OK  ' + String(v.text??v.arabic??'').slice(0,60) : '*** NOT FOUND ***'}`)
}
