import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/38-71-76.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'إِذْ قَالَ رَبُّكَ لِلْمَلَـٰٓئِكَةِ إِنِّى خَـٰلِقٌۢ بَشَرًا مِّن طِينٍ فَإِذَا سَوَّيْتُهُۥ وَنَفَخْتُ فِيهِ مِن رُّوحِى فَقَعُوا۟ لَهُۥ سَـٰجِدِينَ فَسَجَدَ ٱلْمَلَـٰٓئِكَةُ كُلُّهُمْ أَجْمَعُونَ إِلَّآ إِبْلِيسَ ٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ قَالَ يَـٰٓإِبْلِيسُ مَا مَنَعَكَ أَن تَسْجُدَ لِمَا خَلَقْتُ بِيَدَىَّ ۖ أَسْتَكْبَرْتَ أَمْ كُنتَ مِنَ ٱلْعَالِينَ قَالَ أَنَا۠ خَيْرٌ مِّنْهُ ۖ خَلَقْتَنِى مِن نَّارٍ وَخَلَقْتَهُۥ مِن طِينٍ'
  const translation = 'When your Lord said to the angels, "Indeed, I am creating a human being from clay. Then when I have proportioned him and breathed into him of My spirit, fall before him in prostration," the angels prostrated, all of them together, except Iblis. He was arrogant and became among the disbelievers. He said, "O Iblis, what prevented you from prostrating to what I created with My two hands? Were you arrogant, or were you already among the exalted?" He said, "I am better than him. You created me from fire and created him from clay."'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 38)
    .eq('ayah_start', 71)
    .eq('ayah_end', 76)
    .maybeSingle()

  if (existing) {
    console.log('Exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 38,
      ayah_start: 71,
      ayah_end: 76,
      arabic_text: arabicText,
      translation,
      title: 'I Am Better Than Him: The First Argument of Pride',
      word_count: 53,
      estimated_duration: '48-55 minutes',
      passage_context: "Surah Sad stages the refusal of Iblis as a courtroom of creation: Adam's honored making, the angels' total prostration, Allah's exposing question, and the pride that turns origin into rank.",
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
    entity_id: '6647d520-3558-4ff2-882e-c85a706b1c47',
    ayah_record_id: data.id,
    is_primary: true
  })

  if (tagError) {
    console.error(tagError)
    process.exit(1)
  }

  console.log('Tagged iblis. Done!')
}

main().catch(console.error)
