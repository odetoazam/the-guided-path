import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/5-75.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'مَّا ٱلْمَسِيحُ ٱبْنُ مَرْيَمَ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ ٱلرُّسُلُ وَأُمُّهُۥ صِدِّيقَةٌ ۖ كَانَا يَأْكُلَانِ ٱلطَّعَامَ ۗ ٱنظُرْ كَيْفَ نُبَيِّنُ لَهُمُ ٱلْـَٔايَـٰتِ ثُمَّ ٱنظُرْ أَنَّىٰ يُؤْفَكُونَ'
  const translation = 'The Messiah, son of Maryam, was only a messenger — messengers have passed before him. And his mother was al-Siddiqah. They both used to eat food. Look how We make the signs clear to them — then look how they are turned away.'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 5).eq('ayah_start', 75).eq('ayah_end', 75).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 5, ayah_start: 75, ayah_end: 75,
    arabic_text: arabicText, translation,
    title: "Al-Siddiqah — The Name That Stands on Its Own",
    word_count: 47, estimated_duration: '48-55 minutes',
    passage_context: "Allah refutes divinity claims about Isa and Maryam in a single ayah: Isa is positioned as a messenger in a lineage, Maryam is crowned with the title al-Siddiqah (the intensely truthful one), and both are shown to be human through the undeniable testimony of food.",
    status: 'published',
    layer_a: { grounding_table: groundingTable, linguistic_html: linguisticHtml },
    layer_b: { reflection_html: reflectionHtml }
  }).select('id').single()
  if (error) { console.error(error); process.exit(1) }
  console.log('Inserted:', data.id)

  const { error: te } = await supabase.from('entity_tags').insert({ entity_id: '6ce90516-9141-476e-8f4a-bb50e1e77925', ayah_record_id: data.id, is_primary: true })
  if (te) { console.error(te); process.exit(1) }
  console.log('Tagged to maryam. Done!')
}
main().catch(console.error)
