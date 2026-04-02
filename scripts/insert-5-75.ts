import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const content = readFileSync('scripts/tadabbur-output/5-75.md', 'utf-8')
  
  // Split into grounding table (Step 0) + intro+part1 (layer_a) and part2+closing (layer_b)
  const step0Match = content.match(/<!--\n(STEP 0[\s\S]*?)-->/)?.[1] || ''
  const morphTags = content.match(/<!-- morphology[\s\S]*?<!-- morphology[^\n]*/)?.[0] || ''
  
  // layer_a: Introduction + Part 1
  const introStart = content.indexOf('## Introduction')
  const part2Start = content.indexOf('## Part 2: The Thematic Depths')
  const layerAContent = content.substring(introStart, part2Start).trim()
  
  // layer_b: Part 2 + Closing
  const layerBContent = content.substring(part2Start).trim()
  
  const record = {
    surah_number: 5,
    ayah_start: 75,
    ayah_end: 75,
    arabic_text: 'مَّا ٱلْمَسِيحُ ٱبْنُ مَرْيَمَ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ ٱلرُّسُلُ وَأُمُّهُۥ صِدِّيقَةٌ ۖ كَانَا يَأْكُلَانِ ٱلطَّعَامَ ۗ ٱنظُرْ كَيْفَ نُبَيِّنُ لَهُمُ ٱلْـَٔايَـٰتِ ثُمَّ ٱنظُرْ أَنَّىٰ يُؤْفَكُونَ',
    translation: 'The Messiah, son of Maryam, was not but a messenger. [Other] messengers had passed before him. And his mother was an ever-truthful one. They both used to eat food. Look how We make clear to them the signs; then look how they are deluded.',
    title: 'The Highest Name She Could Carry — When Allah Corrected an Entire Civilization by Naming One Woman',
    word_count: 25,
    estimated_duration: '48-55 minutes',
    passage_context: 'Surah Al-Ma\'idah dismantles false claims about \'Isa while elevating Maryam to the highest station below prophethood — siddiqah — through the Quran\'s quietest and most devastating theological argument.',
    status: 'published',
    layer_a: {
      grounding_table: step0Match + '\n' + morphTags,
      linguistic_html: layerAContent
    },
    layer_b: {
      reflection_html: layerBContent
    }
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert(record)
    .select('id')
    .single()

  if (error) {
    console.error('Insert error:', error)
    process.exit(1)
  }

  console.log('Ayah record inserted:', data.id)

  // Tag to maryam entity
  const { error: tagError } = await supabase
    .from('entity_tags')
    .insert({
      entity_id: '6ce90516-9141-476e-8f4a-bb50e1e77925',
      ayah_record_id: data.id,
      is_primary: true
    })

  if (tagError) {
    console.error('Tag error:', tagError)
    process.exit(1)
  }

  console.log('Entity tag created for maryam')
}

main()
