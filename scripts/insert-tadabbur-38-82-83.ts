import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/38-82-83.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'قَالَ فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ أَجْمَعِينَ إِلَّا عِبَادَكَ مِنْهُمُ ٱلْمُخْلَصِينَ'
  const translation = 'He said, "By Your might, I will surely mislead them all, except Your servants among them who are made sincere."'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 38)
    .eq('ayah_start', 82)
    .eq('ayah_end', 83)
    .maybeSingle()

  if (existing) {
    console.log('Exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 38,
      ayah_start: 82,
      ayah_end: 83,
      arabic_text: arabicText,
      translation,
      title: 'The Ones He Cannot Reach',
      word_count: 8,
      estimated_duration: '48-55 minutes',
      passage_context: "After his expulsion in Surah Sad, Iblis vows universal misguidance but names the boundary he cannot cross: Allah's servants whom He has made sincere.",
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
