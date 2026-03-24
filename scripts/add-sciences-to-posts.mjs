#!/usr/bin/env node

/**
 * Batch-adds a "Sciences Active in This Surah" note to all 114 published
 * surah articles in Supabase. Inserts the note at the end of the
 * "To Carry With You" section, right before "Virtues & Recitation".
 *
 * Usage: node scripts/add-sciences-to-posts.mjs [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
  process.exit(1)
}
const DRY_RUN = process.argv.includes('--dry-run')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Science labels for generating HTML
const SCIENCE_LABELS = {
  sarf:         { english: 'Morphology',               slug: 'sarf' },
  nahw:         { english: 'Grammar',                   slug: 'nahw' },
  lughah:       { english: 'Lexicology',               slug: 'lughah' },
  balaghah:     { english: 'Rhetoric',                 slug: 'balaghah' },
  ijaz:         { english: 'Inimitability',            slug: 'ijaz' },
  muhkamat:     { english: 'Clear & Ambiguous Verses', slug: 'muhkamat' },
  nazm:         { english: 'Structural Coherence',     slug: 'nazm' },
  makki_madani: { english: 'Revelation Context',       slug: 'makki-madani' },
  munasabat:    { english: 'Inter-surah Connections',  slug: 'munasabat' },
  qasas:        { english: 'Quranic Narratives',       slug: 'qasas' },
  amthal:       { english: 'Parables',                 slug: 'amthal' },
  qasam:        { english: 'Oaths',                    slug: 'qasam' },
  tafsir:       { english: 'Exegesis',                 slug: 'tafsir' },
  tajwid:       { english: 'Recitation',               slug: 'tajwid' },
  qiraat:       { english: 'Variant Readings',         slug: 'qiraat' },
  nasikh:       { english: 'Abrogation',               slug: 'nasikh' },
  usul_tafsir:  { english: 'Principles of Interpretation', slug: 'usul-al-tafsir' },
  aqeedah:      { english: 'Theology',                 slug: 'aqeedah' },
}

// Same mapping as sciences-by-surah.ts (duplicated here for ESM script)
const SCIENCES_BY_SURAH = [
  ['balaghah','nahw','aqeedah'],        // 1
  ['nasikh','muhkamat','nazm'],         // 2
  ['nazm','muhkamat','munasabat'],      // 3
  ['nasikh','usul_tafsir','muhkamat'],  // 4
  ['nasikh','makki_madani','usul_tafsir'], // 5
  ['aqeedah','balaghah','nazm'],        // 6
  ['qasas','nazm','munasabat'],         // 7
  ['makki_madani','usul_tafsir','nasikh'], // 8
  ['makki_madani','nasikh','usul_tafsir'], // 9
  ['qasas','balaghah','aqeedah'],       // 10
  ['qasas','nazm','munasabat'],         // 11
  ['qasas','nazm','balaghah'],          // 12
  ['amthal','balaghah','aqeedah'],      // 13
  ['amthal','balaghah','qasas'],        // 14
  ['qasas','nazm','balaghah'],          // 15
  ['amthal','aqeedah','nazm'],          // 16
  ['nazm','balaghah','munasabat'],      // 17
  ['qasas','nazm','amthal'],            // 18
  ['qasas','balaghah','nazm'],          // 19
  ['qasas','balaghah','nazm'],          // 20
  ['qasas','nazm','aqeedah'],           // 21
  ['makki_madani','aqeedah','nasikh'],  // 22
  ['nazm','balaghah','aqeedah'],        // 23
  ['usul_tafsir','amthal','makki_madani'], // 24
  ['balaghah','nazm','aqeedah'],        // 25
  ['qasas','nazm','balaghah'],          // 26
  ['qasas','nazm','munasabat'],         // 27
  ['qasas','nazm','munasabat'],         // 28
  ['amthal','nazm','aqeedah'],          // 29
  ['ijaz','aqeedah','nazm'],            // 30
  ['amthal','qasas','nazm'],            // 31
  ['nazm','aqeedah','munasabat'],       // 32
  ['makki_madani','usul_tafsir','nazm'], // 33
  ['amthal','qasas','balaghah'],        // 34
  ['balaghah','aqeedah','nazm'],        // 35
  ['balaghah','nazm','aqeedah'],        // 36
  ['qasas','qasam','nazm'],             // 37
  ['qasas','nazm','balaghah'],          // 38
  ['balaghah','amthal','nazm'],         // 39
  ['balaghah','qasas','aqeedah'],       // 40
  ['balaghah','ijaz','nazm'],           // 41
  ['aqeedah','nazm','balaghah'],        // 42
  ['balaghah','amthal','nazm'],         // 43
  ['balaghah','qasam','qasas'],         // 44
  ['balaghah','aqeedah','nazm'],        // 45
  ['qasas','nazm','balaghah'],          // 46
  ['makki_madani','balaghah','nazm'],   // 47
  ['makki_madani','usul_tafsir','balaghah'], // 48
  ['makki_madani','usul_tafsir','nahw'], // 49
  ['qasam','balaghah','nazm'],          // 50
  ['qasam','balaghah','qasas'],         // 51
  ['qasam','balaghah','ijaz'],          // 52
  ['qasam','balaghah','aqeedah'],       // 53
  ['balaghah','nazm','ijaz'],           // 54
  ['balaghah','ijaz','nazm'],           // 55
  ['balaghah','nazm','aqeedah'],        // 56
  ['balaghah','aqeedah','amthal'],      // 57
  ['makki_madani','usul_tafsir','nahw'], // 58
  ['makki_madani','balaghah','aqeedah'], // 59
  ['makki_madani','usul_tafsir','nasikh'], // 60
  ['nazm','balaghah','munasabat'],      // 61
  ['makki_madani','balaghah','amthal'], // 62
  ['makki_madani','balaghah','nahw'],   // 63
  ['makki_madani','aqeedah','balaghah'], // 64
  ['usul_tafsir','nasikh','makki_madani'], // 65
  ['makki_madani','usul_tafsir','amthal'], // 66
  ['balaghah','nazm','aqeedah'],        // 67
  ['qasam','balaghah','qasas'],         // 68
  ['balaghah','ijaz','aqeedah'],        // 69
  ['balaghah','sarf','nazm'],           // 70
  ['qasas','balaghah','nazm'],          // 71
  ['qasas','balaghah','aqeedah'],       // 72
  ['balaghah','tajwid','sarf'],         // 73
  ['balaghah','sarf','nazm'],           // 74
  ['balaghah','qasam','aqeedah'],       // 75
  ['balaghah','nazm','sarf'],           // 76
  ['qasam','balaghah','ijaz'],          // 77
  ['balaghah','nazm','aqeedah'],        // 78
  ['qasam','balaghah','sarf'],          // 79
  ['balaghah','sarf','nazm'],           // 80
  ['qasam','balaghah','ijaz'],          // 81
  ['balaghah','sarf','nazm'],           // 82
  ['balaghah','nazm','sarf'],           // 83
  ['qasam','balaghah','sarf'],          // 84
  ['qasam','qasas','balaghah'],         // 85
  ['qasam','balaghah','ijaz'],          // 86
  ['balaghah','nazm','sarf'],           // 87
  ['balaghah','nazm','amthal'],         // 88
  ['qasam','qasas','balaghah'],         // 89
  ['qasam','balaghah','sarf'],          // 90
  ['qasam','balaghah','ijaz'],          // 91
  ['balaghah','nazm','sarf'],           // 92
  ['qasam','balaghah','sarf'],          // 93
  ['balaghah','sarf','ijaz'],           // 94
  ['qasam','balaghah','ijaz'],          // 95
  ['sarf','balaghah','nazm'],           // 96
  ['ijaz','balaghah','sarf'],           // 97
  ['aqeedah','balaghah','nazm'],        // 98
  ['ijaz','sarf','balaghah'],           // 99
  ['qasam','sarf','balaghah'],          // 100
  ['balaghah','sarf','ijaz'],           // 101
  ['balaghah','nahw','ijaz'],           // 102
  ['ijaz','nahw','sarf'],               // 103
  ['balaghah','sarf','nazm'],           // 104
  ['qasas','balaghah','ijaz'],          // 105
  ['nahw','balaghah','munasabat'],      // 106
  ['balaghah','nazm','sarf'],           // 107
  ['ijaz','sarf','balaghah'],           // 108
  ['balaghah','aqeedah','nazm'],        // 109
  ['sarf','balaghah','ijaz'],           // 110
  ['balaghah','sarf','ijaz'],           // 111
  ['aqeedah','ijaz','nahw'],            // 112
  ['balaghah','aqeedah','munasabat'],   // 113
  ['balaghah','aqeedah','munasabat'],   // 114
]

function buildSciencesHtml(surahNumber) {
  const sciences = SCIENCES_BY_SURAH[surahNumber - 1]
  if (!sciences) return null

  const parts = sciences.map(key => {
    const info = SCIENCE_LABELS[key]
    return `<strong>${info.english}</strong>`
  })

  let sentence
  if (parts.length === 2) {
    sentence = `Going deeper into this surah calls especially for ${parts[0]} and ${parts[1]}.`
  } else {
    sentence = `Going deeper into this surah calls especially for ${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}.`
  }

  return `<hr><p><em>${sentence} Explore these and other Quranic sciences on our <a href="/ulum-al-quran">Sciences of the Quran</a> page.</em></p>`
}

const MARKER = '<!-- sciences-active -->'

async function main() {
  console.log(DRY_RUN ? '🏃 DRY RUN — no changes will be written\n' : '✏️  LIVE RUN — updating Supabase posts\n')

  // Fetch all published surah posts
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, surah_number, title, content_html')
    .eq('status', 'published')
    .not('surah_number', 'is', null)
    .order('surah_number', { ascending: true })

  if (error) {
    console.error('Failed to fetch posts:', error)
    process.exit(1)
  }

  console.log(`Found ${posts.length} surah posts\n`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const post of posts) {
    const html = post.content_html
    const surahNum = post.surah_number

    // Skip if already has the marker
    if (html.includes(MARKER)) {
      console.log(`  ⏭️  Surah ${surahNum} (${post.title}) — already has sciences note`)
      skipped++
      continue
    }

    const sciencesHtml = buildSciencesHtml(surahNum)
    if (!sciencesHtml) {
      console.log(`  ⚠️  Surah ${surahNum} — no science mapping found`)
      failed++
      continue
    }

    // Insert before "Virtues & Recitation" section
    // Pattern: <hr> or </...> followed by <h2>Virtues
    const virtuesPattern = /<h2>Virtues\s*(?:&amp;|&)\s*Recitation<\/h2>/
    const virtuesMatch = html.match(virtuesPattern)

    let newHtml
    if (virtuesMatch) {
      // Find the <hr> tag immediately before the Virtues heading
      const virtuesIdx = html.indexOf(virtuesMatch[0])
      // Look for the <hr> right before it (within 20 chars)
      const before = html.substring(Math.max(0, virtuesIdx - 20), virtuesIdx)
      const hrIdx = before.lastIndexOf('<hr>')

      let insertIdx
      if (hrIdx >= 0) {
        // Insert before the <hr> that precedes Virtues
        insertIdx = virtuesIdx - (before.length - hrIdx)
      } else {
        // No <hr> found, insert right before the <h2>
        insertIdx = virtuesIdx
      }

      newHtml = html.substring(0, insertIdx) + MARKER + sciencesHtml + html.substring(insertIdx)
    } else {
      // Fallback: insert at the very end
      console.log(`  ⚠️  Surah ${surahNum} — no "Virtues & Recitation" section found, appending at end`)
      newHtml = html + MARKER + sciencesHtml
    }

    if (DRY_RUN) {
      console.log(`  ✅ Surah ${surahNum} (${post.title}) — would update`)
      updated++
      continue
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ content_html: newHtml })
      .eq('id', post.id)

    if (updateError) {
      console.error(`  ❌ Surah ${surahNum} (${post.title}) — update failed:`, updateError.message)
      failed++
    } else {
      console.log(`  ✅ Surah ${surahNum} (${post.title}) — updated`)
      updated++
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped (already had note): ${skipped}`)
  console.log(`Failed: ${failed}`)
}

main().catch(console.error)
