import { readFileSync } from 'fs'
const arr = JSON.parse(readFileSync('node_modules/quran-validator/data/quran-verses.json','utf8'))
const get=(s:number,a:number)=>(arr as any[]).find(v=>(v.surah??v.sura??v.chapter)===s&&(v.ayah??v.verse??v.number)===a)
const v = get(10,22)
console.log('10:22 ->', v ? String(v.text??v.arabic).slice(0,200) : 'NOT FOUND')
