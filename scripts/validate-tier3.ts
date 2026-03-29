/**
 * Tier 3 Validation: Surah-level descriptions (why_this_surah, thesis)
 *
 * Checks each entry for:
 * 1. Unsourced hadith claims ("The Prophet said..." / "The Prophet ﷺ said...")
 * 2. Specific numerical claims that could be wrong ("appears X times", "X ayahs")
 * 3. Historical claims about revelation circumstances ("revealed when...", "revealed after...")
 * 4. Arabic root claims ("the root means...", "from the root...")
 * 5. Entries that are too short to be meaningful (< 80 chars)
 *
 * Run: npx tsx scripts/validate-tier3.ts
 * Output: validation-report-tier3.json + console summary
 */
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface Flag {
  type: string
  severity: 'error' | 'warning' | 'info'
  detail: string
  excerpt: string
}

interface EntryResult {
  surah_number: number
  field: string
  content: string
  flags: Flag[]
  status: 'pass' | 'warn' | 'fail'
}

// Source names that constitute a valid citation
const SOURCE_NAMES = /bukhari|muslim|abu dawud|tirmidhi|ibn majah|nasai|nasa'i|ahmad|al-hakim|al-tabarani|tabari|ibn hibban|daraqutni|bayhaqi/i

// Patterns that require manual verification
const CHECKS = [
  {
    type: 'unsourced_hadith',
    severity: 'error' as const,
    // Match "the prophet said..." but only flag if no source citation follows in the same or next sentence
    pattern: /the prophet[^.]*?said[^.(]*(?:\([^)]*\))?[^.]*\./gi,
    detail: 'Hadith claim must include source (e.g., Bukhari, Muslim) and grading.',
    sourceCheck: true,
  },
  {
    type: 'unsourced_hadith_arabic',
    severity: 'error' as const,
    pattern: /prophet ﷺ[^.]*?said[^.(]*(?:\([^)]*\))?[^.]*\./gi,
    detail: 'Hadith claim must include source and grading.',
    sourceCheck: true,
  },
  {
    type: 'numerical_claim',
    severity: 'warning' as const,
    pattern: /\b(equals?|worth|equivalent to|one third|a third)\b[^.]*?(quran|surah)[^.]*?\./gi,
    detail: 'Numerical equivalence claim (e.g., "equals a third of the Quran") should be sourced.',
  },
  {
    type: 'ayah_count_claim',
    severity: 'warning' as const,
    pattern: /\b\d+\s+ayahs?\b/gi,
    detail: 'Ayah count claim — verify against actual surah length.',
  },
  {
    type: 'revelation_claim',
    severity: 'warning' as const,
    pattern: /\b(revealed when|revealed after|revealed in response|came down when|sent down when)\b/gi,
    detail: 'Revelation circumstance claim — verify against classical asbab al-nuzul sources.',
  },
  {
    type: 'arabic_root_claim',
    severity: 'warning' as const,
    pattern: /\b(the root (means|is|comes from)|from the root|root letters?)\b/gi,
    detail: 'Arabic root claim — verify against Lane\'s Lexicon or Hans Wehr.',
  },
  {
    type: 'too_short',
    severity: 'error' as const,
    pattern: null,
    detail: 'Entry is too short to be meaningful (< 80 characters).',
  },
  {
    type: 'missing_content',
    severity: 'error' as const,
    pattern: null,
    detail: 'Entry is null or empty.',
  },
]

function flagEntry(content: string | null, field: string): Flag[] {
  const flags: Flag[] = []

  if (!content || content.trim() === '') {
    flags.push({
      type: 'missing_content',
      severity: 'error',
      detail: 'Entry is null or empty.',
      excerpt: '(empty)',
    })
    return flags
  }

  if (content.trim().length < 80) {
    flags.push({
      type: 'too_short',
      severity: 'error',
      detail: CHECKS.find(c => c.type === 'too_short')!.detail,
      excerpt: content.trim(),
    })
  }

  for (const check of CHECKS) {
    if (!check.pattern) continue
    const matches = [...content.matchAll(check.pattern)]
    for (const match of matches) {
      const matchText = match[0]
      // Skip if this is a hadith check and the match already contains a source citation
      if ((check as any).sourceCheck && SOURCE_NAMES.test(matchText)) continue
      flags.push({
        type: check.type,
        severity: check.severity,
        detail: check.detail,
        excerpt: matchText.trim().substring(0, 120),
      })
    }
  }

  return flags
}

async function main() {
  console.log('Tier 3 Validation: Fetching surah_visual_data...\n')

  const { data, error } = await supabase
    .from('surah_visual_data')
    .select('surah_number, why_this_surah, thesis')
    .order('surah_number')

  if (error) {
    console.error('Failed to fetch data:', error.message)
    process.exit(1)
  }

  const results: EntryResult[] = []
  let totalErrors = 0
  let totalWarnings = 0
  let totalPass = 0

  for (const row of data) {
    for (const field of ['why_this_surah', 'thesis'] as const) {
      const content = row[field] as string | null
      if (!content && field === 'thesis') continue // thesis is optional

      const flags = flagEntry(content, field)
      const hasErrors = flags.some(f => f.severity === 'error')
      const hasWarnings = flags.some(f => f.severity === 'warning')
      const status = hasErrors ? 'fail' : hasWarnings ? 'warn' : 'pass'

      if (status === 'fail') totalErrors++
      else if (status === 'warn') totalWarnings++
      else totalPass++

      if (status !== 'pass') {
        results.push({
          surah_number: row.surah_number,
          field,
          content: content?.substring(0, 200) || '(empty)',
          flags,
          status,
        })
      }
    }
  }

  // Write report
  const reportPath = 'validation-report-tier3.json'
  fs.writeFileSync(reportPath, JSON.stringify({ generated: new Date().toISOString(), results }, null, 2))

  // Console summary
  console.log('=== TIER 3 VALIDATION REPORT ===\n')
  console.log(`Total entries checked: ${data.length} surahs (why_this_surah + thesis)`)
  console.log(`✅ Pass:     ${totalPass}`)
  console.log(`⚠️  Warn:     ${totalWarnings} (require manual review)`)
  console.log(`❌ Fail:     ${totalErrors} (must fix before republishing)\n`)

  if (results.length > 0) {
    console.log('--- FLAGGED ENTRIES ---\n')
    for (const r of results) {
      const icon = r.status === 'fail' ? '❌' : '⚠️'
      console.log(`${icon} Surah ${r.surah_number} [${r.field}]`)
      for (const flag of r.flags) {
        console.log(`   ${flag.severity === 'error' ? 'ERROR' : 'WARN'} [${flag.type}]: ${flag.detail}`)
        console.log(`   → "${flag.excerpt}"`)
      }
      console.log()
    }
  }

  console.log(`Full report saved to: ${reportPath}`)

  if (totalErrors > 0) {
    console.log(`\n🚫 VALIDATION FAILED — ${totalErrors} entries require fixes before they are considered validated.`)
    console.log('Fix the flagged entries and re-run this script until zero errors remain.')
    process.exit(1)
  } else if (totalWarnings > 0) {
    console.log(`\n⚠️  VALIDATION PASSED WITH WARNINGS — ${totalWarnings} entries require manual review.`)
    console.log('Review the flagged entries in validation-report-tier3.json and confirm accuracy.')
    process.exit(0)
  } else {
    console.log('\n✅ ALL ENTRIES PASSED TIER 3 VALIDATION')
    process.exit(0)
  }
}

main()
