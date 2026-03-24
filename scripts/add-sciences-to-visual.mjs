#!/usr/bin/env node

/**
 * Adds a `sciencesActive` field to the SURAH_DATA object in each
 * visual surah page file (src/data/visual/surah-{N}.tsx).
 *
 * Inserts the field after `readTime` (or after `reflectionUrl` if
 * readTime is not found). Idempotent — skips files that already
 * have the field.
 *
 * Usage: node scripts/add-sciences-to-visual.mjs [--dry-run]
 */

import fs from 'fs'
import path from 'path'

const DRY_RUN = process.argv.includes('--dry-run')
const VISUAL_DIR = path.resolve('src/data/visual')

const SCIENCE_LABELS = {
  sarf:         'Morphology',
  nahw:         'Grammar',
  lughah:       'Lexicology',
  balaghah:     'Rhetoric',
  ijaz:         'Inimitability',
  muhkamat:     'Clear & Ambiguous Verses',
  nazm:         'Structural Coherence',
  makki_madani: 'Revelation Context',
  munasabat:    'Inter-surah Connections',
  qasas:        'Quranic Narratives',
  amthal:       'Parables',
  qasam:        'Oaths',
  tafsir:       'Exegesis',
  tajwid:       'Recitation',
  qiraat:       'Variant Readings',
  nasikh:       'Abrogation',
  usul_tafsir:  'Principles of Interpretation',
  aqeedah:      'Theology',
}

const SCIENCES_BY_SURAH = [
  ['balaghah','nahw','aqeedah'],['nasikh','muhkamat','nazm'],['nazm','muhkamat','munasabat'],
  ['nasikh','usul_tafsir','muhkamat'],['nasikh','makki_madani','usul_tafsir'],['aqeedah','balaghah','nazm'],
  ['qasas','nazm','munasabat'],['makki_madani','usul_tafsir','nasikh'],['makki_madani','nasikh','usul_tafsir'],
  ['qasas','balaghah','aqeedah'],['qasas','nazm','munasabat'],['qasas','nazm','balaghah'],
  ['amthal','balaghah','aqeedah'],['amthal','balaghah','qasas'],['qasas','nazm','balaghah'],
  ['amthal','aqeedah','nazm'],['nazm','balaghah','munasabat'],['qasas','nazm','amthal'],
  ['qasas','balaghah','nazm'],['qasas','balaghah','nazm'],['qasas','nazm','aqeedah'],
  ['makki_madani','aqeedah','nasikh'],['nazm','balaghah','aqeedah'],['usul_tafsir','amthal','makki_madani'],
  ['balaghah','nazm','aqeedah'],['qasas','nazm','balaghah'],['qasas','nazm','munasabat'],
  ['qasas','nazm','munasabat'],['amthal','nazm','aqeedah'],['ijaz','aqeedah','nazm'],
  ['amthal','qasas','nazm'],['nazm','aqeedah','munasabat'],['makki_madani','usul_tafsir','nazm'],
  ['amthal','qasas','balaghah'],['balaghah','aqeedah','nazm'],['balaghah','nazm','aqeedah'],
  ['qasas','qasam','nazm'],['qasas','nazm','balaghah'],['balaghah','amthal','nazm'],
  ['balaghah','qasas','aqeedah'],['balaghah','ijaz','nazm'],['aqeedah','nazm','balaghah'],
  ['balaghah','amthal','nazm'],['balaghah','qasam','qasas'],['balaghah','aqeedah','nazm'],
  ['qasas','nazm','balaghah'],['makki_madani','balaghah','nazm'],['makki_madani','usul_tafsir','balaghah'],
  ['makki_madani','usul_tafsir','nahw'],['qasam','balaghah','nazm'],['qasam','balaghah','qasas'],
  ['qasam','balaghah','ijaz'],['qasam','balaghah','aqeedah'],['balaghah','nazm','ijaz'],
  ['balaghah','ijaz','nazm'],['balaghah','nazm','aqeedah'],['balaghah','aqeedah','amthal'],
  ['makki_madani','usul_tafsir','nahw'],['makki_madani','balaghah','aqeedah'],
  ['makki_madani','usul_tafsir','nasikh'],['nazm','balaghah','munasabat'],
  ['makki_madani','balaghah','amthal'],['makki_madani','balaghah','nahw'],
  ['makki_madani','aqeedah','balaghah'],['usul_tafsir','nasikh','makki_madani'],
  ['makki_madani','usul_tafsir','amthal'],['balaghah','nazm','aqeedah'],['qasam','balaghah','qasas'],
  ['balaghah','ijaz','aqeedah'],['balaghah','sarf','nazm'],['qasas','balaghah','nazm'],
  ['qasas','balaghah','aqeedah'],['balaghah','tajwid','sarf'],['balaghah','sarf','nazm'],
  ['balaghah','qasam','aqeedah'],['balaghah','nazm','sarf'],['qasam','balaghah','ijaz'],
  ['balaghah','nazm','aqeedah'],['qasam','balaghah','sarf'],['balaghah','sarf','nazm'],
  ['qasam','balaghah','ijaz'],['balaghah','sarf','nazm'],['balaghah','nazm','sarf'],
  ['qasam','balaghah','sarf'],['qasam','qasas','balaghah'],['qasam','balaghah','ijaz'],
  ['balaghah','nazm','sarf'],['balaghah','nazm','amthal'],['qasam','qasas','balaghah'],
  ['qasam','balaghah','sarf'],['qasam','balaghah','ijaz'],['balaghah','nazm','sarf'],
  ['qasam','balaghah','sarf'],['balaghah','sarf','ijaz'],['qasam','balaghah','ijaz'],
  ['sarf','balaghah','nazm'],['ijaz','balaghah','sarf'],['aqeedah','balaghah','nazm'],
  ['ijaz','sarf','balaghah'],['qasam','sarf','balaghah'],['balaghah','sarf','ijaz'],
  ['balaghah','nahw','ijaz'],['ijaz','nahw','sarf'],['balaghah','sarf','nazm'],
  ['qasas','balaghah','ijaz'],['nahw','balaghah','munasabat'],['balaghah','nazm','sarf'],
  ['ijaz','sarf','balaghah'],['balaghah','aqeedah','nazm'],['sarf','balaghah','ijaz'],
  ['balaghah','sarf','ijaz'],['aqeedah','ijaz','nahw'],['balaghah','aqeedah','munasabat'],
  ['balaghah','aqeedah','munasabat'],
]

function buildFieldValue(surahNumber) {
  const sciences = SCIENCES_BY_SURAH[surahNumber - 1]
  return sciences.map(key => ({
    key,
    english: SCIENCE_LABELS[key],
  }))
}

function main() {
  console.log(DRY_RUN ? '🏃 DRY RUN\n' : '✏️  LIVE RUN\n')

  let updated = 0
  let skipped = 0
  let failed = 0

  for (let i = 1; i <= 114; i++) {
    const filePath = path.join(VISUAL_DIR, `surah-${i}.tsx`)

    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  surah-${i}.tsx — file not found`)
      failed++
      continue
    }

    let content = fs.readFileSync(filePath, 'utf-8')

    if (content.includes('sciencesActive')) {
      console.log(`  ⏭️  surah-${i}.tsx — already has sciencesActive`)
      skipped++
      continue
    }

    const sciences = buildFieldValue(i)
    const fieldStr = `  sciencesActive: ${JSON.stringify(sciences)},`

    // Insert after readTime line
    const readTimeMatch = content.match(/^(\s*readTime:\s*['"][^'"]+['"],?\s*)$/m)
    if (readTimeMatch) {
      const insertAfter = readTimeMatch[0]
      content = content.replace(insertAfter, insertAfter + '\n' + fieldStr)
    } else {
      // Fallback: insert after reflectionUrl line
      const refUrlMatch = content.match(/^(\s*reflectionUrl:\s*['"][^'"]+['"],?\s*)$/m)
      if (refUrlMatch) {
        const insertAfter = refUrlMatch[0]
        content = content.replace(insertAfter, insertAfter + '\n' + fieldStr)
      } else {
        console.log(`  ⚠️  surah-${i}.tsx — no readTime or reflectionUrl found`)
        failed++
        continue
      }
    }

    if (DRY_RUN) {
      console.log(`  ✅ surah-${i}.tsx — would update`)
      updated++
      continue
    }

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`  ✅ surah-${i}.tsx — updated`)
    updated++
  }

  console.log(`\n--- Summary ---`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Failed: ${failed}`)
}

main()
