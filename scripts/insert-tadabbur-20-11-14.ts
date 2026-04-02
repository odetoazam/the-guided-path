import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/20-11-14.md', 'utf-8')

  // Split grounding table (HTML comment) from content
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''

  // Extract linguistic HTML (Introduction + Part 1)
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()

  // Extract reflection HTML (Part 2 + Closing)
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'فَلَمَّآ أَتَىٰهَا نُودِىَ يَـٰمُوسَىٰ ﴿١١﴾ إِنِّىٓ أَنَا۠ رَبُّكَ فَٱخْلَعْ نَعْلَيْكَ ۖ إِنَّكَ بِٱلْوَادِ ٱلْمُقَدَّسِ طُوًى ﴿١٢﴾ وَأَنَا ٱخْتَرْتُكَ فَٱسْتَمِعْ لِمَا يُوحَىٰ ﴿١٣﴾ إِنَّنِىٓ أَنَا ٱللَّهُ لَآ إِلَـٰهَ إِلَّآ أَنَا۠ فَٱعْبُدْنِى وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِىٓ ﴿١٤﴾'

  const translation = 'When he came to it, he was called: "O Musa! Indeed I am your Lord — so remove your sandals. Indeed you are in the sacred valley of Tuwa. And I have chosen you, so listen to what is revealed. Indeed I am Allah — there is no god except Me — so worship Me and establish prayer for My remembrance."'

  // Check if record already exists
  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 20)
    .eq('ayah_start', 11)
    .eq('ayah_end', 14)
    .maybeSingle()

  if (existing) {
    console.log('Record already exists:', existing.id)
    return
  }

  // Insert the record
  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 20,
      ayah_start: 11,
      ayah_end: 14,
      arabic_text: arabicText,
      translation: translation,
      title: 'The First Conversation — When Fire Became a Voice',
      word_count: 29,
      estimated_duration: '48-55 minutes',
      passage_context: "Musa's first prophetic call at the burning bush in the valley of Tuwa — he came seeking fire for his family and found the voice of Allah.",
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
    console.error('Insert error:', error)
    process.exit(1)
  }

  console.log('Inserted ayah_record:', data.id)

  // Tag to musa entity
  const musaEntityId = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'

  const { error: tagError } = await supabase
    .from('entity_tags')
    .insert({
      entity_id: musaEntityId,
      ayah_record_id: data.id,
      is_primary: true
    })

  if (tagError) {
    console.error('Tag error:', tagError)
    process.exit(1)
  }

  console.log('Tagged to musa entity')
  console.log('Done!')
}

main().catch(console.error)
