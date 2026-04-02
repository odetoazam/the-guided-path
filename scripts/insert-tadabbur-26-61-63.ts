import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/26-61-63.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'فَلَمَّا تَرَٰٓءَا ٱلْجَمْعَانِ قَالَ أَصْحَـٰبُ مُوسَىٰ إِنَّا لَمُدْرَكُونَ ﴿٦١﴾ قَالَ كَلَّآ ۖ إِنَّ مَعِىَ رَبِّى سَيَهْدِينِ ﴿٦٢﴾ فَأَوْحَيْنَآ إِلَىٰ مُوسَىٰٓ أَنِ ٱضْرِب بِّعَصَاكَ ٱلْبَحْرَ ۖ فَٱنفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَٱلطَّوْدِ ٱلْعَظِيمِ ﴿٦٣﴾'
  const translation = 'When the two groups saw each other, the companions of Musa said, "We are surely overtaken!" He said, "No! Indeed, my Lord is with me — He will guide me." So We revealed to Musa: "Strike the sea with your staff." And it split, and each part was like a great mountain.'

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 26)
    .eq('ayah_start', 61)
    .eq('ayah_end', 63)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 26,
      ayah_start: 61,
      ayah_end: 63,
      arabic_text: arabicText,
      translation,
      title: 'The Two-Syllable Wall — When the Sea Remembered What It Was Created to Do',
      word_count: 27,
      estimated_duration: '48-55 minutes',
      passage_context: "The moment at the Red Sea when Musa's followers despaired, Musa said kallā, and the sea split — three voices across three ayahs.",
      status: 'published',
      layer_a: { grounding_table: groundingTable, linguistic_html: linguisticHtml },
      layer_b: { reflection_html: reflectionHtml }
    })
    .select('id')
    .single()

  if (error) { console.error('Insert error:', error); process.exit(1) }
  console.log('Inserted:', data.id)

  const { error: tagError } = await supabase
    .from('entity_tags')
    .insert({ entity_id: 'a3221ae5-2aea-497d-bdca-c26ef513ccfa', ayah_record_id: data.id, is_primary: true })
  if (tagError) { console.error('Tag error:', tagError); process.exit(1) }
  console.log('Tagged to musa. Done!')
}
main().catch(console.error)
