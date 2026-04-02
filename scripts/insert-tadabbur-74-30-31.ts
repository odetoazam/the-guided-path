import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/74-30-31.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'عَلَيْهَا تِسْعَةَ عَشَرَ وَمَا جَعَلْنَآ أَصْحَـٰبَ ٱلنَّارِ إِلَّا مَلَـٰٓئِكَةً ۙ وَمَا جَعَلْنَا عِدَّتَهُمْ إِلَّا فِتْنَةً لِّلَّذِينَ كَفَرُوا۟ لِيَسْتَيْقِنَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَـٰبَ وَيَزْدَادَ ٱلَّذِينَ ءَامَنُوٓا۟ إِيمَـٰنًا ۙ وَلَا يَرْتَابَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَـٰبَ وَٱلْمُؤْمِنُونَ ۙ وَلِيَقُولَ ٱلَّذِينَ فِى قُلُوبِهِم مَّرَضٌ وَٱلْكَـٰفِرُونَ مَاذَآ أَرَادَ ٱللَّهُ بِهَـٰذَا مَثَلًا ۚ كَذَٰلِكَ يُضِلُّ ٱللَّهُ مَن يَشَآءُ وَيَهْدِى مَن يَشَآءُ ۚ وَمَا يَعْلَمُ جُنُودَ رَبِّكَ إِلَّا هُوَ ۚ وَمَا هِىَ إِلَّا ذِكْرَىٰ لِلْبَشَرِ'
  const translation = 'Over it are nineteen. And We have appointed none as the keepers of the Fire except angels, and We have made their number only as a test for those who disbelieve, so that those who were given the Book may arrive at certainty, and those who believe may increase in faith, and so that those who were given the Book and the believers may not doubt, and so that those in whose hearts is disease and the disbelievers may say, "What did Allah intend by this as an example?" Thus does Allah leave astray whom He wills and guide whom He wills. And none knows the armies of your Lord except Him. And it is nothing but a reminder for humanity.'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 74)
    .eq('ayah_start', 30)
    .eq('ayah_end', 31)
    .maybeSingle()

  if (existing) {
    console.log('Exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 74,
      ayah_start: 30,
      ayah_end: 31,
      arabic_text: arabicText,
      translation,
      title: 'Over It Are Nineteen: A Number That Tests Hearts',
      word_count: 68,
      estimated_duration: '48-55 minutes',
      passage_context: "Surah Al-Muddaththir names the nineteen keepers of the Fire, then immediately interprets the disclosure as a fitnah that deepens certainty in some hearts and exposes suspicion in others.",
      status: 'published',
      layer_a: {
        grounding_table: groundingTable,
        linguistic_html: linguisticHtml
      },
      layer_b: {
        reflection_html: reflectionHtml
      }
    })
    .select('id')
    .single()

  if (error) {
    console.error(error)
    process.exit(1)
  }

  console.log('Inserted:', data.id)

  const { error: tagError } = await supabase.from('entity_tags').insert({
    entity_id: '83f81335-3cac-492b-b8f5-8e73606406da',
    ayah_record_id: data.id,
    is_primary: true
  })

  if (tagError) {
    console.error(tagError)
    process.exit(1)
  }

  console.log('Tagged jahannam. Done!')
}

main().catch(console.error)
