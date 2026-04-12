#!/usr/bin/env node
/**
 * Add word_count to tadabbur files that are missing it.
 * Computes word count from the body (excluding frontmatter, morphology comments,
 * Arabic text blocks, and HTML comments).
 *
 * SKIPS Codex territory (surahs 3-17 and scattered singles) to avoid conflicts
 * with Codex's simultaneous completion pass.
 */

import fs from 'fs'
import path from 'path'

const ROOT = 'content/tadabbur'
const CODEX_SKIP = new Set([
  '003-aal-imran', '004-an-nisa', '005-al-maidah', '006-al-anam',
  '007-al-araf', '008-al-anfal', '009-at-tawbah', '010-yunus',
  '011-hud', '012-yusuf', '013-ar-rad', '014-ibrahim',
  '015-al-hijr', '016-an-nahl', '017-al-isra',
  '036-ya-sin', '039-az-zumar', '054-al-qamar', '055-ar-rahman',
  '056-al-waqiah', '065-at-talaq', '067-al-mulk', '080-abasa',
  '050-qaf',
])

function countWords(text) {
  // Strip HTML comments (including morphology markers)
  let cleaned = text.replace(/<!--[\s\S]*?-->/g, '')
  // Strip Arabic text blocks (simplified heuristic — lines with Arabic chars)
  cleaned = cleaned.replace(/[\u0600-\u06FF\u0750-\u077F]+/g, '')
  // Strip markdown formatting
  cleaned = cleaned.replace(/[#*_\[\]()]/g, ' ')
  // Count actual words
  const words = cleaned.split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w))
  return words.length
}

let added = 0
let skipped = 0

const dirs = fs.readdirSync(ROOT).filter(d => {
  const full = path.join(ROOT, d)
  return fs.statSync(full).isDirectory() && !CODEX_SKIP.has(d)
}).sort()

for (const d of dirs) {
  const fullDir = path.join(ROOT, d)
  const files = fs.readdirSync(fullDir).filter(
    f => f.endsWith('.md') &&
         !f.startsWith('tafsir-report-') &&
         !f.startsWith('tafsir-') &&
         !f.startsWith('_')
  )
  for (const f of files) {
    const fp = path.join(fullDir, f)
    const content = fs.readFileSync(fp, 'utf8')
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) {
      skipped++
      continue
    }
    const rawFm = match[1]
    const body = match[2]
    if (/^word_count:/m.test(rawFm)) {
      skipped++
      continue
    }
    const wc = countWords(body)
    // Insert word_count before the closing ---
    const newFm = rawFm + `\nword_count: ${wc}`
    const newContent = `---\n${newFm}\n---\n${body}`
    fs.writeFileSync(fp, newContent)
    added++
  }
}

console.log(`Added word_count to ${added} files`)
console.log(`Skipped: ${skipped}`)
