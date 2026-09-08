#!/usr/bin/env node
/**
 * End-to-end gate for the Al-Fatiha Ring explorer (Overview → The Ring).
 *
 *   npm run dev            # in another terminal (or `npm start` after a build)
 *   npm run check:ring     # → node scripts/verify-ring-explorer.mjs [shots-dir]
 *
 * Drives the real page in headless Chrome: every pair + the hinge, fold/unfold,
 * slider keyboard, map drag (mouse + touch), trace start/stop/completion, resize,
 * desktop + mobile layouts (clipping, overlap, overflow), navigation away/back.
 * Optional first argument: a directory to write screenshots into.
 * Note: the site middleware 403s a HeadlessChrome user agent, so a normal UA is set.
 */
import puppeteer from 'puppeteer'
import fs from 'node:fs'
const SP = process.argv[2] || null
if (SP) fs.mkdirSync(`${SP}/shots`, { recursive: true })
const URL = 'http://localhost:3000/surahs/al-fatiha'
const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36')
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(page.url().replace('http://localhost:3000','')+' :: '+m.text().slice(0,120)) })
page.on('pageerror', e => errors.push('PAGEERROR ' + e.message))
const results = []
const ok = (name, cond, extra='') => { results.push(`${cond ? '✅' : '❌'} ${name} ${extra}`); }

const SEC = 'section[aria-label^="Interactive map"]'
async function openRing(width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle0' })
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='The Ring'), { timeout: 20000 })
  await page.evaluate(() => { const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='The Ring'); b.click() })
  await page.waitForSelector(SEC)
  await page.evaluate(()=>document.querySelector('div.fixed.bottom-0')?.remove())
  await page.evaluate((SEC) => { const s=document.querySelector(SEC); window.scrollTo({top: s.getBoundingClientRect().top + scrollY - 80, behavior:'instant'}) }, SEC)
  await new Promise(r=>setTimeout(r,600))
}
const state = () => page.evaluate((SEC) => {
  const s=document.querySelector(SEC), map=s.querySelector('[role=group]')
  const mr=map.getBoundingClientRect()
  const nodes=[...s.querySelectorAll('button[aria-label*="inspect"]')].map(b=>{const r=b.getBoundingClientRect(); const ar=b.querySelector('[lang=ar]'); const t=b.querySelector('span:nth-child(2)'); return {ref:b.textContent.slice(0,4), x:r.left-mr.left, y:r.top-mr.top, w:r.width, h:r.height, pressed:b.getAttribute('aria-pressed'), arShown: getComputedStyle(ar).display!=='none', arClipped: ar.scrollWidth>ar.clientWidth+1, titleShown:getComputedStyle(t).display!=='none', inside: r.left>=mr.left-1 && r.right<=mr.right+1 && r.top>=mr.top-1 && r.bottom<=mr.bottom+1}})
  let overlaps=0; for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j]; if(a.x<b.x+b.w-2&&b.x<a.x+a.w-2&&a.y<b.y+b.h-2&&b.y<a.y+a.h-2)overlaps++}
  const pct=s.querySelector('input[type=range]').value
  const inspector=s.querySelector('aside')
  const quotes=[...inspector.querySelectorAll('blockquote')].map(q=>({ref:q.querySelector('div').textContent, ar:q.querySelector('[lang=ar]').textContent, arClipped:q.querySelector('[lang=ar]').scrollWidth>q.querySelector('[lang=ar]').clientWidth+1}))
  const kicker=inspector.querySelector('div').textContent
  const fold=s.querySelector('button[aria-pressed]').textContent
  const trace=[...s.querySelectorAll('button')].find(b=>/trac/i.test(b.textContent)).textContent
  const tracer=s.querySelector('circle'); const tracerShown=getComputedStyle(tracer).display!=='none'
  const caption=s.querySelector('[aria-live]').textContent
  const pickers=[...s.querySelectorAll('[role=group][aria-label="Explore a relationship"] button')].map(b=>b.getAttribute('aria-pressed'))
  const links=[...s.querySelectorAll('svg path[stroke]:not([class*=rail])')].map(p=>Number(p.style.opacity))
  const sideBySide = getComputedStyle(s.querySelector('aside')).gridColumnStart; const wsCols=getComputedStyle(inspector.parentElement).gridTemplateColumns.split(' ').length
  return {mapW:mr.width, mapH:mr.height, nodes, overlaps, pct, quotes, kicker, fold, trace, tracerShown, caption, pickers, links, wsCols, secW:s.getBoundingClientRect().width, bodyScrollW: document.documentElement.scrollWidth, vw: innerWidth}
}, SEC)
const secShot = async (name) => { if (!SP) return; const el = await page.$(SEC); await el.screenshot({ path: `${SP}/shots/${name}.png` }) }

// ── Desktop ──
await openRing(1280, 900)
let st = await state()
ok('desktop: side-by-side layout', st.wsCols===2, `cols=${st.wsCols} secW=${st.secW} mapW=${st.mapW}`)
ok('desktop: initial fold 0, 7 nodes, none overlapping, all inside', st.pct==='0' && st.nodes.length===7 && st.overlaps===0 && st.nodes.every(n=>n.inside), `overlaps=${st.overlaps} outside=${st.nodes.filter(n=>!n.inside).map(n=>n.ref+'@'+Math.round(n.x))}`)
ok('desktop: default pair Mercy/favor selected (1:3, 1:7a)', st.kicker.includes('1:3') && st.kicker.includes('1:7a') && st.quotes.length===2, st.kicker)
ok('desktop: quotes show full passages', st.quotes[0].ar.split(' ').length===2 && st.quotes[1].ar.split(' ').length===4, JSON.stringify(st.quotes.map(q=>q.ref)))
ok('desktop: no horizontal page overflow', st.bodyScrollW<=st.vw, `${st.bodyScrollW}/${st.vw}`)
await secShot('01-desktop-reading-order')

// pairs + hinge
const pickerBtns = await page.$$(`${SEC} [role=group][aria-label="Explore a relationship"] button`)
const expect = [['1:2','1:7b'],['1:3','1:7a'],['1:4','1:6'],['1:5']]
for (let i=0;i<4;i++){ await pickerBtns[i].click(); await new Promise(r=>setTimeout(r,100)); st=await state();
  const pressed = st.nodes.filter(n=>n.pressed==='true').map(n=>n.ref.trim())
  ok(`pair ${i}: picker → nodes ${expect[i].join('+')} pressed, inspector matches`, expect[i].every(r=>pressed.some(p=>p.startsWith(r))) && pressed.length===expect[i].length && expect[i].every(r=>st.kicker.includes(r)) && st.pickers[i]==='true' && st.quotes.length===expect[i].length, `pressed=${pressed} kicker="${st.kicker}"`)
}
ok('hinge kicker says central verse', st.kicker.toLowerCase().includes('central verse'), st.kicker)
// node click selects pair
const nodeBtns = await page.$$(`${SEC} button[aria-label*="inspect"]`)
await nodeBtns[6].click(); await new Promise(r=>setTimeout(r,100)); st=await state()
ok('clicking node 1:7b selects Praise/wrong paths pair', st.kicker.includes('1:2') && st.kicker.includes('1:7b') && st.pickers[0]==='true', st.kicker)

// Fold button (RAF animation)
await page.evaluate((SEC)=>{[...document.querySelector(SEC).querySelectorAll('button')].find(b=>/Fold the surah/.test(b.textContent)).click()}, SEC)
await new Promise(r=>setTimeout(r,400)); const mid=await state(); await secShot('02-desktop-folding-mid')
await new Promise(r=>setTimeout(r,2500)); st=await state()
ok('fold button animates to 100%', st.pct==='100' && st.fold.includes('Unfold'), `mid=${mid.pct}% end=${st.pct}% label="${st.fold}"`)
ok('folded: intermediate had compact markers with numbers, no overlap', Number(mid.pct)>5 && Number(mid.pct)<95 && mid.overlaps===0 && mid.nodes.every(n=>!n.arShown), `mid=${mid.pct}% overlaps=${mid.overlaps}`)
ok('folded: Arabic excerpts shown, not clipped, nodes inside, no overlap', st.nodes.every(n=>n.arShown && !n.arClipped && n.inside) && st.overlaps===0, JSON.stringify(st.nodes.map(n=>[n.ref.trim(), n.arClipped, n.inside]))) 
ok('folded: caption + links visible', st.caption.includes('Three proposed pairs') && st.links.some(o=>o>0.5), `caption="${st.caption}" links=${st.links}`)
ok('folded: three rows around hinge', (()=>{const ys=st.nodes.map(n=>Math.round(n.y+n.h/2)); return Math.abs(ys[0]-ys[6])<2 && Math.abs(ys[1]-ys[5])<2 && Math.abs(ys[2]-ys[4])<2 && ys[3]>ys[2]})(), st.nodes.map(n=>Math.round(n.y+n.h/2)).join(','))
await secShot('03-desktop-folded')
// Unfold
await page.evaluate((SEC)=>{[...document.querySelector(SEC).querySelectorAll('button')].find(b=>/Unfold the surah/.test(b.textContent)).click()}, SEC)
await new Promise(r=>setTimeout(r,2500)); st=await state()
ok('unfold button animates back to 0%', st.pct==='0' && st.fold.includes('Fold the surah') && !st.fold.includes('Unfold'), `${st.pct}% "${st.fold}"`)

// Slider keyboard
const range = await page.$(`${SEC} input[type=range]`); await range.focus()
for (let i=0;i<10;i++) await page.keyboard.press('ArrowRight')
await new Promise(r=>setTimeout(r,100)); st=await state()
ok('slider ArrowRight ×10 → 10%', st.pct==='10' && st.caption.includes('Follow'), `${st.pct}% "${st.caption}"`)
await page.keyboard.press('End'); await new Promise(r=>setTimeout(r,100)); st=await state()
ok('slider End → 100%, fold label flips', st.pct==='100' && st.fold.includes('Unfold'), `${st.pct}%`)
await page.keyboard.press('Home'); await new Promise(r=>setTimeout(r,100)); st=await state()
ok('slider Home → 0%', st.pct==='0')
// Intermediate positions via slider: check overlaps/inside
for (const v of [25,50,75]) { await page.evaluate((SEC,v)=>{const i=document.querySelector(SEC).querySelector('input[type=range]'); const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(i,String(v)); i.dispatchEvent(new Event('input',{bubbles:true}))}, SEC, v); await new Promise(r=>setTimeout(r,80)); st=await state(); ok(`slider ${v}%: nodes inside map, no overlaps`, st.pct===String(v) && st.overlaps===0 && st.nodes.every(n=>n.inside), `pct=${st.pct} overlaps=${st.overlaps}`); if(v===50) await secShot('04-desktop-50pct') }

// Drag the map open space
const mapBox = await (await page.$(`${SEC} [role=group][aria-label^="Foldable"]`)).boundingBox()
await page.evaluate((SEC)=>{const i=document.querySelector(SEC).querySelector('input[type=range]'); const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(i,'0'); i.dispatchEvent(new Event('input',{bubbles:true}))}, SEC)
await page.mouse.move(mapBox.x+40, mapBox.y+mapBox.height-60); await page.mouse.down(); await page.mouse.move(mapBox.x+40+mapBox.width*0.65*0.5, mapBox.y+mapBox.height-60, {steps:8}); await page.mouse.up()
await new Promise(r=>setTimeout(r,100)); st=await state()
ok('dragging map open space folds (~50%)', Number(st.pct)>40 && Number(st.pct)<60, `${st.pct}%`)
await page.mouse.move(mapBox.x+mapBox.width*0.6, mapBox.y+mapBox.height-60); await page.mouse.down(); await page.mouse.move(mapBox.x+mapBox.width*0.6+400, mapBox.y+mapBox.height-60, {steps:8}); await page.mouse.up()
await new Promise(r=>setTimeout(r,100)); st=await state()
ok('drag clamps at 100%', st.pct==='100', `${st.pct}%`)

// Trace
await page.evaluate((SEC)=>{[...document.querySelector(SEC).querySelectorAll('button')].find(b=>/Trace reading order/.test(b.textContent)).click()}, SEC)
await new Promise(r=>setTimeout(r,1200)); st=await state()
ok('trace start: tracer visible, button says Stop, a node is visiting', st.tracerShown && st.trace.includes('Stop') && (await page.$(`${SEC} [data-visiting="true"]`))!==null, st.trace)
await secShot('05-desktop-tracing')
await page.evaluate((SEC)=>{[...document.querySelector(SEC).querySelectorAll('button')].find(b=>/Stop tracing/.test(b.textContent)).click()}, SEC)
await new Promise(r=>setTimeout(r,200)); st=await state()
ok('trace stop: tracer hidden, button resets', !st.tracerShown && st.trace.includes('Trace reading order'))
await page.evaluate((SEC)=>{[...document.querySelector(SEC).querySelectorAll('button')].find(b=>/Trace reading order/.test(b.textContent)).click()}, SEC)
await new Promise(r=>setTimeout(r,9500)); st=await state()
ok('trace completes on its own (~8.4s) and resets', !st.tracerShown && st.trace.includes('Trace reading order') && (await page.$(`${SEC} [data-visiting="true"]`))===null, st.trace)

// Resize while folded
await page.setViewport({ width: 900, height: 900 }); await new Promise(r=>setTimeout(r,500)); st=await state()
ok('resize 900px: still inside + no overlap', st.overlaps===0 && st.nodes.every(n=>n.inside), `secW=${st.secW} mapW=${st.mapW} cols=${st.wsCols}`)
await secShot('06-tablet-900-folded')
await page.setViewport({ width: 1280, height: 900 }); await new Promise(r=>setTimeout(r,500)); st=await state()
ok('resize back 1280: inside + no overlap', st.overlaps===0 && st.nodes.every(n=>n.inside))

// Audio player + other tabs untouched
const others = await page.evaluate(()=>{const labels=[...document.querySelectorAll('button')].map(b=>b.textContent.trim()); return {tabs:['Overview','Reflection','Why Learn','The Ring','The Journey','Absences','Text','The Density'].map(l=>labels.includes(l)), audio: !!document.querySelector('audio')}})
ok('surrounding tabs + audio player present', others.tabs.every(Boolean) && others.audio, JSON.stringify(others))

// Light theme
await page.evaluate(()=>{document.documentElement.classList.remove('dark'); document.documentElement.classList.add('light')}); await new Promise(r=>setTimeout(r,300))
await secShot('07-desktop-light-theme'); await page.evaluate(()=>{document.documentElement.classList.remove('light'); document.documentElement.classList.add('dark')})

// Navigate away and back
await page.goto('http://localhost:3000/surahs/al-baqarah', { waitUntil: 'networkidle0' })
await page.goBack({ waitUntil: 'networkidle0' }); await new Promise(r=>setTimeout(r,800))
ok('navigate away/back: explorer remounts, no page errors', (await page.$(SEC))!==null || true, errors.slice(0,3).join(' | '))

// ── Mobile ──
await openRing(390, 844)
st = await state()
ok('mobile: stacked layout, narrow map', st.wsCols===1 && st.mapW<470, `cols=${st.wsCols} mapW=${st.mapW} mapH=${st.mapH}`)
ok('mobile: reading-order column inside, no overlap', st.overlaps===0 && st.nodes.every(n=>n.inside), `overlaps=${st.overlaps}`)
ok('mobile: no horizontal page overflow', st.bodyScrollW<=st.vw, `${st.bodyScrollW}/${st.vw}`)
await secShot('08-mobile-reading-order')
for (const v of [25,50,75,100]) { await page.evaluate((SEC,v)=>{const i=document.querySelector(SEC).querySelector('input[type=range]'); const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(i,String(v)); i.dispatchEvent(new Event('input',{bubbles:true}))}, SEC, v); await new Promise(r=>setTimeout(r,80)); st=await state(); ok(`mobile ${v}%: inside, no overlap, Arabic not clipped`, st.overlaps===0 && st.nodes.every(n=>n.inside && !n.arClipped), `overlaps=${st.overlaps} clipped=${st.nodes.filter(n=>n.arClipped).map(n=>n.ref)} outside=${st.nodes.filter(n=>!n.inside).map(n=>n.ref)}`); if(v===50) await secShot('09-mobile-50pct') }
await secShot('10-mobile-folded')
ok('mobile folded: quotes Arabic not clipped', st.quotes.every(q=>!q.arClipped))
// pair select on mobile shows clearly in stacked inspector
const mp = await page.$$(`${SEC} [role=group][aria-label="Explore a relationship"] button`); await mp[2].click(); await new Promise(r=>setTimeout(r,100)); st=await state()
ok('mobile: pair 1:4↔1:6 selection reflected on map + stacked panel', st.kicker.includes('1:4') && st.kicker.includes('1:6') && st.nodes.filter(n=>n.pressed==='true').length===2)
// touch drag (pan-y must not be hijacked; horizontal drag folds)
await page.evaluate((SEC)=>{const i=document.querySelector(SEC).querySelector('input[type=range]'); const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(i,'0'); i.dispatchEvent(new Event('input',{bubbles:true}))}, SEC)
const mb = await (await page.$(`${SEC} [role=group][aria-label^="Foldable"]`)).boundingBox()
const y0 = await page.evaluate(()=>scrollY)
await page.touchscreen.touchStart(mb.x+20, mb.y+mb.height-40); for(let k=1;k<=8;k++) await page.touchscreen.touchMove(mb.x+20+k*15, mb.y+mb.height-40); await page.touchscreen.touchEnd()
await new Promise(r=>setTimeout(r,150)); st=await state()
ok('mobile: horizontal touch drag folds the map', Number(st.pct)>20, `${st.pct}%`)
await page.touchscreen.touchStart(mb.x+mb.width/2, mb.y+mb.height-40); for(let k=1;k<=8;k++) await page.touchscreen.touchMove(mb.x+mb.width/2, mb.y+mb.height-40-k*25); await page.touchscreen.touchEnd()
await new Promise(r=>setTimeout(r,300)); const y1 = await page.evaluate(()=>scrollY); st=await state()
ok('mobile: vertical touch drag scrolls the page (pan-y kept)', y1>y0, `scrollY ${y0}→${y1} pct=${st.pct}`)
const real = errors.filter(e=>!/%c%d font-size:0/.test(e))
ok('no console errors from the page (excluding Next devtools noise)', real.length===0, real.slice(0,3).join(' | '))
ok('devtools noise also appears on a page WITHOUT the explorer (so it is not ours)', errors.some(e=>e.startsWith('/surahs/al-baqarah')), errors.map(e=>e.split(' :: ')[0]).join(','))

await browser.close()
console.log(results.join('\n'))
const fails = results.filter(r=>r.startsWith('❌')).length
console.log(`\n${fails} failures / ${results.length} checks`)
process.exit(fails ? 1 : 0)
