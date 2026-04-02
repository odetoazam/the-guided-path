import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/50-30.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'يَوْمَ نَقُولُ لِجَهَنَّمَ هَلِ ٱمْتَلَأْتِ وَتَقُولُ هَلْ مِن مَّزِيدٍ'
  const translation = 'On the Day We will say to Jahannam, "Have you been filled?" and it will say, "Is there any more?"'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 50)
    .eq('ayah_start', 30)
    .eq('ayah_end', 30)
    .maybeSingle()

  if (existing) {
    console.log('Exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 50,
      ayah_start: 30,
      ayah_end: 30,
      arabic_text: arabicText,
      translation,
      title: 'Is There Any More?: When Jahannam Answers',
      word_count: 8,
      estimated_duration: '48-55 minutes',
      passage_context: "Surah Qaf stages a direct exchange between Allah and Jahannam on the Day of Judgment, making the fire a speaking participant in the scene of final consequence.",
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
