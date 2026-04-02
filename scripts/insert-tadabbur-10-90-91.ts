import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/10-90-91.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = '۞ وَجَـٰوَزْنَا بِبَنِىٓ إِسْرَٰٓءِيلَ ٱلْبَحْرَ فَأَتْبَعَهُمْ فِرْعَوْنُ وَجُنُودُهُۥ بَغْيًا وَعَدْوًا ۖ حَتَّىٰٓ إِذَآ أَدْرَكَهُ ٱلْغَرَقُ قَالَ ءَامَنتُ أَنَّهُۥ لَآ إِلَـٰهَ إِلَّا ٱلَّذِىٓ ءَامَنَتْ بِهِۦ بَنُوٓا۟ إِسْرَٰٓءِيلَ وَأَنَا۠ مِنَ ٱلْمُسْلِمِينَ ءَآلْـَٔـٰنَ وَقَدْ عَصَيْتَ قَبْلُ وَكُنتَ مِنَ ٱلْمُفْسِدِينَ'
  const translation = 'We carried Banu Isra\'il across the sea, and Fir\'awn and his armies pursued them in tyranny and hostility. Then, when drowning overtook him, he said, "I believe that there is no god except the One in whom Banu Isra\'il believe, and I am among those who submit." Now? When you had disobeyed before and had long been among the corrupters?'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 10)
    .eq('ayah_start', 90)
    .eq('ayah_end', 91)
    .maybeSingle()

  if (existing) {
    console.log('Exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 10,
      ayah_start: 90,
      ayah_end: 91,
      arabic_text: arabicText,
      translation,
      title: "Now?: Fir'awn's Confession at the Waterline",
      word_count: 36,
      estimated_duration: '48-55 minutes',
      passage_context: "Surah Yunus captures Fir'awn's final confession as drowning overtakes him, exposing the line between faith freely chosen and belief forced by unveiled consequence.",
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
    entity_id: 'f4f69408-d31f-44d7-8ff1-ed3682ea6692',
    ayah_record_id: data.id,
    is_primary: true
  })

  if (tagError) {
    console.error(tagError)
    process.exit(1)
  }

  console.log('Tagged tawbah. Done!')
}

main().catch(console.error)
