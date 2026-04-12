#!/usr/bin/env node
/**
 * General frontmatter migration for tadabbur content files.
 *
 * Fixes common legacy-schema issues:
 * - Missing `slug` (generates NNN-NNN or NNN-NNN-NNN from filename)
 * - Missing `category` (adds "tadabbur")
 * - Missing `surah_name` (uses SURAH_NAMES mapping)
 * - Wrong slug format (normalizes descriptive slugs to NNN-NNN format)
 * - Unquoted `surah_name`
 * - `ayah: N` single field → `ayah_start: N` + `ayah_end: N`
 *
 * SAFE: does not touch Codex territory (surahs 3-17 and the 7 scattered singles).
 * SAFE: does not delete or rewrite content, only updates frontmatter fields.
 *
 * Usage: node scripts/migrate-frontmatter-general.mjs [--dry-run]
 */

import fs from 'fs'
import path from 'path'

const DRY_RUN = process.argv.includes('--dry-run')
const ROOT = 'content/tadabbur'

// Skip these — they're in Codex's completion-pass territory
const CODEX_SKIP = new Set([
  '003-aal-imran', '004-an-nisa', '005-al-maidah', '006-al-anam',
  '007-al-araf', '008-al-anfal', '009-at-tawbah', '010-yunus',
  '011-hud', '012-yusuf', '013-ar-rad', '014-ibrahim',
  '015-al-hijr', '016-an-nahl', '017-al-isra',
  // Scattered singles — Codex will handle the specific file in each
  // We skip the whole surah to avoid any conflict with Codex's simultaneous work
  '036-ya-sin', '039-az-zumar', '054-al-qamar', '055-ar-rahman',
  '056-al-waqiah', '065-at-talaq', '067-al-mulk', '080-abasa',
  '050-qaf',
])

const SURAH_NAMES = {
  1: 'Al-Fatiha', 2: 'Al-Baqarah', 18: 'Al-Kahf', 19: 'Maryam', 20: 'Ta-Ha',
  21: 'Al-Anbiya', 22: 'Al-Hajj', 23: 'Al-Muminun', 24: 'An-Nur', 25: 'Al-Furqan',
  26: 'Ash-Shuara', 27: 'An-Naml', 28: 'Al-Qasas', 29: 'Al-Ankabut',
  30: 'Ar-Rum', 31: 'Luqman', 32: 'As-Sajdah', 33: 'Al-Ahzab', 34: 'Saba',
  35: 'Fatir', 37: 'As-Saffat', 38: 'Sad', 40: 'Ghafir', 41: 'Fussilat',
  42: 'Ash-Shura', 43: 'Az-Zukhruf', 44: 'Ad-Dukhan', 45: 'Al-Jathiyah',
  46: 'Al-Ahqaf', 47: 'Muhammad', 48: 'Al-Fath', 49: 'Al-Hujurat', 50: 'Qaf',
  51: 'Adh-Dhariyat', 52: 'At-Tur', 53: 'An-Najm', 57: 'Al-Hadid',
  58: 'Al-Mujadila', 59: 'Al-Hashr', 60: 'Al-Mumtahanah', 61: 'As-Saff',
  62: 'Al-Jumuah', 63: 'Al-Munafiqun', 64: 'At-Taghabun', 66: 'At-Tahrim',
  68: 'Al-Qalam', 69: 'Al-Haqqah', 70: 'Al-Maarij', 71: 'Nuh', 72: 'Al-Jinn',
  73: 'Al-Muzzammil', 74: 'Al-Muddaththir', 75: 'Al-Qiyamah', 76: 'Al-Insan',
  77: 'Al-Mursalat', 78: 'An-Naba', 79: 'An-Naziat', 81: 'At-Takwir',
  82: 'Al-Infitar', 83: 'Al-Mutaffifin', 84: 'Al-Inshiqaq', 85: 'Al-Buruj',
  86: 'At-Tariq', 87: 'Al-Ala', 88: 'Al-Ghashiyah', 89: 'Al-Fajr', 90: 'Al-Balad',
  91: 'Ash-Shams', 92: 'Al-Layl', 93: 'Ad-Duha', 94: 'Ash-Sharh', 95: 'At-Tin',
  96: 'Al-Alaq', 97: 'Al-Qadr', 98: 'Al-Bayyinah', 99: 'Az-Zalzalah',
  100: 'Al-Adiyat', 101: 'Al-Qariah', 102: 'At-Takathur', 103: 'Al-Asr',
  104: 'Al-Humazah', 105: 'Al-Fil', 106: 'Quraysh', 107: 'Al-Maun',
  108: 'Al-Kawthar', 109: 'Al-Kafirun', 110: 'An-Nasr', 111: 'Al-Masad',
  112: 'Al-Ikhlas', 113: 'Al-Falaq', 114: 'An-Nas',
}

function pad3(n) {
  return String(n).padStart(3, '0')
}

function slugFromFilename(filename, surahNum) {
  const base = filename.replace(/\.md$/, '')
  const m1 = base.match(/^ayah-(\d+)$/)
  if (m1) return `${pad3(surahNum)}-${pad3(parseInt(m1[1]))}`
  const m2 = base.match(/^ayahs?-(\d+)-(\d+)$/)
  if (m2) return `${pad3(surahNum)}-${pad3(parseInt(m2[1]))}-${pad3(parseInt(m2[2]))}`
  return null
}

function surahNumFromDir(dirname) {
  const m = dirname.match(/^(\d{3})-/)
  return m ? parseInt(m[1]) : null
}

function parseSimpleFm(rawFm) {
  const result = {}
  for (const line of rawFm.split('\n')) {
    const m = line.match(/^(\w[\w_]*):\s*(.*)$/)
    if (m) result[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return result
}

const SLUG_SINGLE = /^\d{3}-\d{3}$/
const SLUG_RANGE = /^\d{3}-\d{3}-\d{3}$/

function migrateFile(filePath, dirname, surahNum) {
  const content = fs.readFileSync(filePath, 'utf8')
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { skipped: true, reason: 'no frontmatter' }
  }
  const rawFm = match[1]
  const body = match[2]
  const filename = path.basename(filePath)
  const correctSlug = slugFromFilename(filename, surahNum)
  if (!correctSlug) return { skipped: true, reason: `unparseable filename: ${filename}` }

  const fm = parseSimpleFm(rawFm)
  const changes = []
  const lines = rawFm.split('\n')
  const newLines = []
  let slugAdded = false
  let categoryAdded = false
  let surahNameAdded = false
  let ayahStartAdded = false
  let skipNextAyahEnd = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Fix wrong slug format
    if (/^slug:/.test(line)) {
      if (!SLUG_SINGLE.test(fm.slug) && !SLUG_RANGE.test(fm.slug)) {
        newLines.push(`slug: "${correctSlug}"`)
        changes.push(`slug: ${fm.slug} → ${correctSlug}`)
      } else {
        newLines.push(line)
      }
      slugAdded = true
      continue
    }

    // Add quoted surah_name (if unquoted)
    if (/^surah_name:/.test(line)) {
      const snMatch = line.match(/^surah_name:\s*(.+)$/)
      const value = snMatch[1].trim().replace(/^["']|["']$/g, '')
      if (value) {
        newLines.push(`surah_name: "${value}"`)
        surahNameAdded = true
      } else {
        newLines.push(`surah_name: "${SURAH_NAMES[surahNum] || 'Unknown'}"`)
        surahNameAdded = true
        changes.push(`surah_name: (empty) → "${SURAH_NAMES[surahNum]}"`)
      }
      continue
    }

    if (/^category:/.test(line)) {
      newLines.push('category: tadabbur')
      categoryAdded = true
      continue
    }

    // Convert `ayah: N` → ayah_start + ayah_end
    const ayahMatch = line.match(/^ayah:\s*(\d+)\s*$/)
    if (ayahMatch && !fm.ayah_start && !fm.ayahs) {
      const n = ayahMatch[1]
      newLines.push(`ayah_start: ${n}`)
      newLines.push(`ayah_end: ${n}`)
      ayahStartAdded = true
      changes.push(`ayah: ${n} → ayah_start/ayah_end: ${n}`)
      continue
    }

    // Convert `ayah: "SS:A-B"` → ayah_range
    const ayahQuoted = line.match(/^ayah:\s*["']?(\d+):(\d+)(?:-(\d+))?["']?\s*$/)
    if (ayahQuoted && !fm.ayah_start && !fm.ayahs) {
      const start = ayahQuoted[2]
      const end = ayahQuoted[3] || start
      newLines.push(`ayah_start: ${start}`)
      newLines.push(`ayah_end: ${end}`)
      ayahStartAdded = true
      changes.push(`ayah: "${ayahQuoted[0]}" → ayah_start/ayah_end`)
      continue
    }

    // Convert `ayah_range: "A-B"` → ayah_start + ayah_end
    const ayahRange = line.match(/^ayah_range:\s*["']?(\d+)(?:-(\d+))?["']?\s*$/)
    if (ayahRange && !fm.ayah_start && !fm.ayahs) {
      const start = ayahRange[1]
      const end = ayahRange[2] || start
      newLines.push(`ayah_start: ${start}`)
      newLines.push(`ayah_end: ${end}`)
      ayahStartAdded = true
      changes.push(`ayah_range: ${start}${ayahRange[2] ? '-' + ayahRange[2] : ''} → ayah_start/ayah_end`)
      continue
    }

    // Convert `ayahs: "A-B"` to ayah_start/ayah_end if old format
    const ayahsLegacy = line.match(/^ayahs:\s*["']?(\d+)(?:-(\d+))?["']?\s*$/)
    if (ayahsLegacy && !fm.ayah_start) {
      const start = ayahsLegacy[1]
      const end = ayahsLegacy[2] || start
      newLines.push(`ayah_start: ${start}`)
      newLines.push(`ayah_end: ${end}`)
      ayahStartAdded = true
      changes.push(`ayahs: ${start}${ayahsLegacy[2] ? '-' + ayahsLegacy[2] : ''} → ayah_start/ayah_end`)
      continue
    }

    newLines.push(line)
  }

  // Append missing required fields
  if (!slugAdded && !fm.slug) {
    newLines.push(`slug: "${correctSlug}"`)
    changes.push(`+slug: ${correctSlug}`)
  }
  if (!categoryAdded && !fm.category) {
    newLines.push('category: tadabbur')
    changes.push(`+category: tadabbur`)
  }
  if (!surahNameAdded && !fm.surah_name) {
    newLines.push(`surah_name: "${SURAH_NAMES[surahNum] || 'Unknown'}"`)
    changes.push(`+surah_name: "${SURAH_NAMES[surahNum]}"`)
  }

  if (changes.length === 0) return { skipped: true, reason: 'no changes needed' }

  const newFm = newLines.join('\n')
  const newContent = `---\n${newFm}\n---\n${body}`

  if (!DRY_RUN) fs.writeFileSync(filePath, newContent)
  return { changed: true, changes }
}

let totalChanged = 0
let totalSkipped = 0
let totalErrors = 0
const allDirs = fs.readdirSync(ROOT).filter(d => {
  const full = path.join(ROOT, d)
  return fs.statSync(full).isDirectory()
})

// Guard: abort on duplicate surah folders before touching anything
const seenNums = new Map()
for (const d of allDirs) {
  const num = surahNumFromDir(d)
  if (num === null) continue
  if (seenNums.has(num)) {
    console.error(`FATAL: Duplicate folders for surah ${num}: "${seenNums.get(num)}" and "${d}"`)
    console.error('Resolve the duplicate before running migrations.')
    process.exit(1)
  }
  seenNums.set(num, d)
}

const dirs = allDirs.filter(d => !CODEX_SKIP.has(d)).sort()

for (const d of dirs) {
  const fullDir = path.join(ROOT, d)
  const surahNum = surahNumFromDir(d)
  if (!surahNum) continue
  const files = fs.readdirSync(fullDir).filter(
    f => f.endsWith('.md') && !f.startsWith('tafsir-report-') && !f.startsWith('tafsir-')
  )
  for (const f of files) {
    const fp = path.join(fullDir, f)
    try {
      const result = migrateFile(fp, d, surahNum)
      if (result.changed) {
        totalChanged++
        console.log(`✓ ${d}/${f}`)
        for (const c of result.changes) console.log(`    ${c}`)
      } else if (result.skipped && result.reason !== 'no changes needed') {
        console.log(`- ${d}/${f} (${result.reason})`)
        totalSkipped++
      }
    } catch (e) {
      totalErrors++
      console.log(`✗ ${d}/${f}: ${e.message}`)
    }
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Migrated: ${totalChanged}`)
console.log(`Skipped: ${totalSkipped}`)
console.log(`Errors:  ${totalErrors}`)
