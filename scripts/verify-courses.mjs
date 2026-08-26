#!/usr/bin/env node
/**
 * Course content gate (npm run check:courses)
 *
 * Guards the traps that almost shipped 2026-08-26:
 *  1. Every module in src/data/courses.ts must exist on disk.
 *  2. Every module containing Arabic script must carry data-ayah tags —
 *     "Failed: 0" from verify_arabic means NOTHING WAS CHECKED when tags are absent.
 *  3. Every tagged ayah must match the canonical Uthmani text EXACTLY —
 *     a normalized match (diacritic drift) fails the gate. Fix: verify_arabic --fix.
 *  4. No module may still carry a HELD / do-not-publish marker.
 *
 * Exit 1 on any failure. Run before touching /courses or any module HTML.
 */
import { readFileSync, existsSync, readdirSync } from 'fs'
import { execFileSync } from 'child_process'
import path from 'path'
import { scan as voiceScan, verdict as voiceVerdict } from './verify_voice.mjs'

const ROOT = path.join(process.cwd())
const COURSES_DIR = path.join(ROOT, 'content', 'courses')

// Parse course/module slugs straight from the data file (no TS import needed)
const dataSrc = readFileSync(path.join(ROOT, 'src', 'data', 'courses.ts'), 'utf-8')
const courseSlugs = [...dataSrc.matchAll(/^\s{4}slug: '([a-z-]+)',$/gm)].map((m) => m[1])
const moduleCounts = {}
for (const c of courseSlugs) moduleCounts[c] = 6 // modules 0-5 by convention

let failures = 0
const fail = (msg) => { failures++; console.error('  ✗ ' + msg) }

const ARABIC = /[؀-ۿ]/

for (const course of readdirSync(COURSES_DIR)) {
  const dir = path.join(COURSES_DIR, course)
  if (!courseSlugs.includes(course)) fail(`${course}/ on disk but not in src/data/courses.ts`)
  for (let n = 0; n < (moduleCounts[course] ?? 6); n++) {
    const file = path.join(dir, `module-${n}.html`)
    const rel = path.relative(ROOT, file)
    if (!existsSync(file)) { fail(`${rel} missing`); continue }
    const html = readFileSync(file, 'utf-8')

    // 4. launch marker — only inside HTML comments ("held" is common English prose)
    const comments = (html.match(/<!--[\s\S]*?-->/g) || []).join('\n')
    if (/PAID COURSE CORE|do not publish|·\s*HELD/.test(comments))
      fail(`${rel}: comment still carries a HELD/do-not-publish marker`)

    // 2. Arabic present but untagged = unchecked
    const bodyArabic = html.replace(/<!--[\s\S]*?-->/g, '')
    const hasArabic = ARABIC.test(bodyArabic)
    const tagCount = (html.match(/data-ayah=/g) || []).length
    if (hasArabic && tagCount === 0) {
      fail(`${rel}: contains Arabic but zero data-ayah tags — verify_arabic would check NOTHING`)
      continue
    }

    // 5. voice — the manufactured-contrast tic. `npm run check:voice` only ever
    //    scanned PUBLISHED DB POSTS, so course modules were never checked at all;
    //    when first pointed here on 2026-08-26, 8 of 18 modules FAILED, two courses
    //    of them already live. A gate only catches what it was pointed at.
    const v = voiceVerdict(voiceScan(html))
    if (v === 'FAIL') fail(`${rel}: voice gate FAIL (manufactured contrast) — run the voice report`)

    // 3. exact canonical match (verify_arabic warnings = diacritic drift = fail)
    if (tagCount > 0) {
      const out = execFileSync('node', [path.join(ROOT, 'scripts', 'verify_arabic.mjs'), file], {
        encoding: 'utf-8',
      })
      const passed = Number((out.match(/Passed:\s+(\d+)/) || [])[1] ?? 0)
      const warned = Number((out.match(/Warnings:\s+(\d+)/) || [])[1] ?? 0)
      const failed = Number((out.match(/Failed:\s+(\d+)/) || [])[1] ?? 0)
      if (failed > 0) fail(`${rel}: ${failed} ayah(s) do not match canonical text`)
      if (warned > 0) fail(`${rel}: ${warned} normalized-only match(es) — run verify_arabic --fix`)
      if (passed === 0) fail(`${rel}: tagged but 0 verses verified — tag format broken?`)
    }
  }
}

for (const c of courseSlugs) {
  if (!existsSync(path.join(COURSES_DIR, c))) fail(`course '${c}' in data but content/courses/${c}/ missing`)
}

if (failures) {
  console.error(`\ncheck:courses — ${failures} failure(s)`) // eslint-disable-line
  process.exit(1)
}
console.log(`check:courses — clean (${courseSlugs.length} courses, ${courseSlugs.length * 6} modules, every tagged ayah exact)`)
