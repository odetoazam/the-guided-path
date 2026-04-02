#!/usr/bin/env node
/**
 * Frontmatter linter for tadabbur content files.
 * Run before inserting to Supabase. Fails fast on structural errors.
 *
 * Usage:
 *   node scripts/lint-tadabbur-frontmatter.mjs content/tadabbur/003-aal-imran/ayah-056.md
 *   node scripts/lint-tadabbur-frontmatter.mjs content/tadabbur/003-aal-imran/   # entire folder
 */

import fs from 'fs'
import path from 'path'

const SLUG_SINGLE = /^\d{3}-\d{3}$/
const SLUG_RANGE = /^\d{3}-\d{3}-\d{3}$/

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const raw = match[1]
  const result = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^(\w[\w_]*):\s*(.*)$/)
    if (m) result[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return result
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const fm = parseFrontmatter(content)
  const errors = []
  const warns = []

  if (!fm) {
    errors.push('No frontmatter found')
    return { filePath, errors, warns }
  }

  // Hard failures — block insert
  if (fm.validated === 'true') {
    errors.push('validated: true — must be false until validators pass')
  }
  if (!fm.surah_number && !fm.surah) {
    errors.push('Missing surah identifier (surah_number or surah)')
  }
  // Accept either ayah_start (Codex format) or ayahs (multi-ayah range format)
  if (!fm.ayah_start && !fm.ayahs) {
    errors.push('Missing ayah_start (or ayahs for range format)')
  }
  if (!fm.surah_name) {
    errors.push('Missing surah_name')
  }
  if (!fm.slug) {
    errors.push('Missing slug')
  } else if (!SLUG_SINGLE.test(fm.slug) && !SLUG_RANGE.test(fm.slug)) {
    errors.push(`slug "${fm.slug}" does not match format NNN-NNN or NNN-NNN-NNN`)
  }
  if (!fm.category) {
    errors.push('Missing category')
  } else if (fm.category !== 'tadabbur') {
    errors.push(`category is "${fm.category}" — must be "tadabbur"`)
  }

  // Soft warnings — worth fixing but not blocking
  if (!fm.title) warns.push('Missing title')
  if (!fm.tags && !fm.entity_tags) warns.push('No tags or entity_tags')
  if (fm.word_count === 'null' || !fm.word_count) warns.push('word_count not set')

  return { filePath, errors, warns }
}

function run(target) {
  let files = []

  if (fs.statSync(target).isDirectory()) {
    files = fs.readdirSync(target)
      .filter(f => f.endsWith('.md') && !f.startsWith('_') && !f.includes('tafsir-report'))
      .map(f => path.join(target, f))
  } else {
    files = [target]
  }

  let totalErrors = 0
  let totalWarns = 0

  for (const f of files) {
    const { filePath, errors, warns } = lintFile(f)
    if (errors.length === 0 && warns.length === 0) continue

    const rel = path.relative(process.cwd(), filePath)
    if (errors.length > 0) {
      console.error(`\n❌ ${rel}`)
      for (const e of errors) console.error(`   ERROR: ${e}`)
      totalErrors += errors.length
    }
    if (warns.length > 0) {
      if (errors.length === 0) console.warn(`\n⚠️  ${rel}`)
      for (const w of warns) console.warn(`   WARN:  ${w}`)
      totalWarns += warns.length
    }
  }

  console.log(`\n${files.length} files checked. ${totalErrors} errors, ${totalWarns} warnings.`)

  if (totalErrors > 0) {
    console.error('Fix all errors before inserting to Supabase.')
    process.exit(1)
  }
}

const target = process.argv[2]
if (!target) {
  console.error('Usage: node scripts/lint-tadabbur-frontmatter.mjs <file-or-directory>')
  process.exit(1)
}

run(target)
