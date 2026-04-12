#!/usr/bin/env node
/**
 * Migrate Al-Baqarah tadabbur frontmatter to current schema.
 *
 * Adds missing `slug` and `category` fields derived from filename.
 * Also quotes `surah_name` if unquoted. Preserves `validated: true`
 * on files that are already live in the DB.
 *
 * Usage: node scripts/migrate-baqarah-frontmatter.mjs
 */

import fs from 'fs'
import path from 'path'

const SURAH_DIRS = {
  '001-al-fatiha': { num: 1, name: 'Al-Fatiha' },
  '002-al-baqarah': { num: 2, name: 'Al-Baqarah' },
  '088-al-ghashiyah': { num: 88, name: 'Al-Ghashiyah' },
}

const ROOT = 'content/tadabbur'

function pad3(n) {
  return String(n).padStart(3, '0')
}

function slugFromFilename(filename, surahNum) {
  // ayah-255.md → "002-255"
  // ayahs-001-005.md → "002-001-005"
  const base = filename.replace(/\.md$/, '')
  const m1 = base.match(/^ayah-(\d+)$/)
  if (m1) return `${pad3(surahNum)}-${pad3(parseInt(m1[1]))}`
  const m2 = base.match(/^ayahs?-(\d+)-(\d+)$/)
  if (m2) return `${pad3(surahNum)}-${pad3(parseInt(m2[1]))}-${pad3(parseInt(m2[2]))}`
  return null
}

function migrateFile(filePath, surahInfo) {
  const content = fs.readFileSync(filePath, 'utf8')
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { skipped: true, reason: 'no frontmatter' }
  }
  const rawFm = match[1]
  const body = match[2]
  const filename = path.basename(filePath)
  const slug = slugFromFilename(filename, surahInfo.num)
  if (!slug) return { skipped: true, reason: `unparseable filename: ${filename}` }

  const lines = rawFm.split('\n')
  let hasSlug = false
  let hasCategory = false
  let hasSurahNameField = false
  const newLines = []
  for (const line of lines) {
    if (/^slug:/.test(line)) {
      hasSlug = true
      newLines.push(`slug: "${slug}"`)
      continue
    }
    if (/^category:/.test(line)) {
      hasCategory = true
      newLines.push('category: tadabbur')
      continue
    }
    // Quote surah_name if unquoted
    const snMatch = line.match(/^surah_name:\s*(.+)$/)
    if (snMatch) {
      hasSurahNameField = true
      const value = snMatch[1].trim().replace(/^["']|["']$/g, '')
      newLines.push(`surah_name: "${value}"`)
      continue
    }
    newLines.push(line)
  }
  if (!hasSlug) newLines.push(`slug: "${slug}"`)
  if (!hasCategory) newLines.push('category: tadabbur')

  const newFm = newLines.join('\n')
  const newContent = `---\n${newFm}\n---\n${body}`

  if (newContent === content) return { skipped: true, reason: 'no change needed' }
  fs.writeFileSync(filePath, newContent)
  return { changed: true, slug }
}

let totalChanged = 0
let totalSkipped = 0
const skipReasons = {}

for (const [dir, info] of Object.entries(SURAH_DIRS)) {
  const fullDir = path.join(ROOT, dir)
  if (!fs.existsSync(fullDir)) continue
  const files = fs.readdirSync(fullDir).filter(
    f => f.endsWith('.md') && !f.startsWith('tafsir-report-')
  )
  for (const f of files) {
    const fp = path.join(fullDir, f)
    const result = migrateFile(fp, info)
    if (result.changed) {
      totalChanged++
      console.log(`✓ ${dir}/${f} → slug=${result.slug}`)
    } else if (result.skipped) {
      totalSkipped++
      skipReasons[result.reason] = (skipReasons[result.reason] || 0) + 1
    }
  }
}

console.log(`\nMigrated: ${totalChanged}`)
console.log(`Skipped:  ${totalSkipped}`)
for (const [r, c] of Object.entries(skipReasons)) {
  console.log(`  - ${r}: ${c}`)
}
