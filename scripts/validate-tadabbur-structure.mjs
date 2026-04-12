#!/usr/bin/env node
/**
 * Validates tadabbur folder structure.
 * Checks for duplicate surah folders (e.g. both 050-qaf and 050-al-qaf).
 *
 * Usage:
 *   node scripts/validate-tadabbur-structure.mjs
 *
 * Exits 1 on any duplicate. Safe to run as a pre-push hook or before migrations.
 */

import fs from 'fs'
import path from 'path'

const ROOT = 'content/tadabbur'

const dirs = fs.readdirSync(ROOT).filter(d => {
  try {
    return fs.statSync(path.join(ROOT, d)).isDirectory()
  } catch {
    return false
  }
})

// Group folders by surah number
const surahMap = new Map()
for (const d of dirs) {
  const m = d.match(/^(\d{3})-/)
  if (!m) continue
  const num = parseInt(m[1])
  if (!surahMap.has(num)) surahMap.set(num, [])
  surahMap.get(num).push(d)
}

let hasErrors = false
for (const [num, folders] of [...surahMap.entries()].sort((a, b) => a[0] - b[0])) {
  if (folders.length > 1) {
    console.error(`\nDUPLICATE: Surah ${num} has ${folders.length} folders:`)
    for (const f of folders) {
      const files = fs.readdirSync(path.join(ROOT, f)).filter(f => f.endsWith('.md'))
      console.error(`  - ${f}  (${files.length} .md files)`)
    }
    hasErrors = true
  }
}

if (hasErrors) {
  console.error('\nFATAL: Resolve duplicate folders before running migrations.')
  console.error('Move the unwanted folder\'s files to its _superseded/ subdirectory.')
  process.exit(1)
}

console.log(`OK: ${dirs.length} surah folders, no duplicates.`)
