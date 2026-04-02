import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/12-53.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'وَمَآ أُبَرِّئُ نَفْسِى ۚ إِنَّ ٱلنَّفْسَ لَأَمَّارَةٌۢ بِٱلسُّوٓءِ إِلَّا مَا رَحِمَ رَبِّىٓ ۚ إِنَّ رَبِّى غَفُورٌ رَّحِيمٌ'
  const translation = 'And I do not acquit myself — indeed the nafs is a most persistent commander toward evil, except what my Lord has mercy upon. Indeed my Lord is Forgiving, Merciful.'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 12).eq('ayah_start', 53).eq('ayah_end', 53).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 12, ayah_start: 53, ayah_end: 53,
    arabic_text: arabicText, translation,
    title: "I Do Not Acquit Myself — The Sentence Anyone Could Have Said",
    word_count: 40, estimated_duration: '48-55 minutes',
    passage_context: "At the climax of Surah Yusuf — after the trial, the prison, and the vindication — someone says the most honest sentence in the story: 'I do not acquit myself. The nafs compulsively commands toward evil, except what my Lord has mercy upon.' Classical scholars dispute whether Yusuf or Zulaikha speaks it. Both readings are true.",
    status: 'published',
    layer_a: { grounding_table: groundingTable, linguistic_html: linguisticHtml },
    layer_b: { reflection_html: reflectionHtml }
  }).select('id').single()
  if (error) { console.error(error); process.exit(1) }
  console.log('Inserted:', data.id)

  const { error: te } = await supabase.from('entity_tags').insert({ entity_id: '84e3be67-e74d-45e0-abb6-7fb969907b3c', ayah_record_id: data.id, is_primary: true })
  if (te) { console.error(te); process.exit(1) }
  console.log('Tagged to nafs. Done!')
}
main().catch(console.error)
