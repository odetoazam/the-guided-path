/**
 * Fix Tier 3 validation errors: add hadith sources to surahs 52, 67, 112
 * Run: npx tsx scripts/fix-tier3-hadith.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const fixes = [
  {
    surah_number: 52,
    // Jubayr ibn Mut'im narration: Bukhari 4854, Muslim 463
    why_this_surah: "When Jubayr ibn Mut'im — still not a Muslim — heard the Prophet ﷺ recite this surah at Maghrib, he said his heart nearly flew out of his chest (Bukhari, 4854; Muslim, 463). It opens with five oaths building to a single verdict, and it ends with one of the most beautiful descriptions of Paradise in the Quran. A surah that converts by force of language.",
  },
  {
    surah_number: 67,
    // Hadith about At-Tawba/Al-Mulk interceding: Abu Dawud 1400, Ibn Majah 3786, Tirmidhi 2891 — hasan
    why_this_surah: "The Prophet ﷺ said: 'There is a surah in the Quran of thirty ayahs that intercedes for its companion until he is forgiven — Tabārak alladhī biyadihi'l-mulk' (Abu Dawud, 1400; Ibn Majah, 3786 — classified hasan). Muslims recite it every night before sleep as a shield from the punishment of the grave. Thirty ayahs that begin with sovereignty and end with a question: who will give you water if God withholds it?",
  },
  {
    surah_number: 112,
    // Al-Ikhlas equals a third of the Quran: Bukhari 5013, Muslim 811
    why_this_surah: "Who is God? This surah answers in four lines: God is one. God is eternal and absolute. He was not born and does not give birth. Nothing is comparable to Him. The Prophet ﷺ said reciting it equals a third of the Quran (Bukhari, 5013; Muslim, 811). If someone asks you what you believe about God, this surah is the complete answer.",
  },
]

async function main() {
  let success = 0, failed = 0
  for (const fix of fixes) {
    const { error } = await supabase
      .from('surah_visual_data')
      .update({ why_this_surah: fix.why_this_surah, updated_at: new Date().toISOString() })
      .eq('surah_number', fix.surah_number)
    if (error) { console.error(`✗ Surah ${fix.surah_number}: ${error.message}`); failed++ }
    else { console.log(`✓ Surah ${fix.surah_number} — hadith source added`); success++ }
  }
  console.log(`\n${success} fixed, ${failed} failed`)
}
main()
