import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/103-al-asr/ayahs-001-003.md', 'utf-8')

  const comments = raw.match(/<!--[\s\S]*?-->/g) || []
  const grounding = comments.join('\n')

  const lastCommentEnd = raw.lastIndexOf('-->')
  const body = raw.substring(lastCommentEnd + 3).trim()

  const part2Marker = '## PART 2: THE THEMATIC DEPTHS'
  const part2Start = body.indexOf(part2Marker)
  const linguisticHtml = body.substring(0, part2Start).trim()
  const reflectionHtml = body.substring(part2Start).trim()

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 103)
    .eq('ayah_start', 1)
    .eq('ayah_end', 3)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 103,
      ayah_start: 1,
      ayah_end: 3,
      arabic_text: 'وَٱلْعَصْرِ ﴿١﴾ إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ ﴿٢﴾ إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ ﴿٣﴾',
      translation: "By time. Indeed, the human being is in loss — except those who believed, and did righteous deeds, and counseled each other to truth, and counseled each other to patience.",
      title: "Everyone Is Losing — The Three-Ayah Surah That Diagnosed the Human Condition and Prescribed Its Only Cure",
      word_count: 230,
      estimated_duration: '48-58 minutes',
      passage_context: "The entire Surah Al-Asr in three ayahs — Imam Shafi'i said if only this surah had been revealed it would be sufficient. The most compressed diagnosis and prescription in revelation. Key linguistic discoveries: وَٱلْعَصْرِ from root ع-ص-ر (squeezing/pressing — time as a force that extracts life, not merely passes), إِنَّ + لَ + فِى = triple emphatic immersion (the human is INSIDE loss, not heading toward it), خُسْرٍ indefinite (unlimited, unbounded loss — commercial bankruptcy of the capital itself), ءَامَنُوا۟ Form IV causative (faith as active production, not passive acceptance), ٱلصَّـٰلِحَـٰتِ active participle (deeds that are ACTIVELY repairing), تَوَاصَوْا۟ Form VI mutual/reciprocal appearing TWICE (the grammar IS the sociology — no hierarchy, peer-to-peer counsel, cannot be performed alone), separated into ḥaqq and ṣabr because truth without patience is cruelty and patience without truth is negligence.",
      status: 'published',
      layer_a: {
        grounding_table: grounding,
        linguistic_html: linguisticHtml
      },
      layer_b: {
        reflection_html: reflectionHtml
      }
    })
    .select('id')
    .single()

  if (error) {
    console.error('Insert error:', error)
    process.exit(1)
  }

  console.log('Published:', data.id)
}

main()
