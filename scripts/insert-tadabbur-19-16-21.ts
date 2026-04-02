import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/19-16-21.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'وَٱذْكُرْ فِى ٱلْكِتَـٰبِ مَرْيَمَ إِذِ ٱنتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا ﴿١٦﴾ فَٱتَّخَذَتْ مِن دُونِهِمْ حِجَابًا فَأَرْسَلْنَآ إِلَيْهَا رُوحَنَا فَتَمَثَّلَ لَهَا بَشَرًا سَوِيًّا ﴿١٧﴾ قَالَتْ إِنِّىٓ أَعُوذُ بِٱلرَّحْمَـٰنِ مِنكَ إِن كُنتَ تَقِيًّا ﴿١٨﴾ قَالَ إِنَّمَآ أَنَا۠ رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَـٰمًا زَكِيًّا ﴿١٩﴾ قَالَتْ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَلَمْ يَمْسَسْنِى بَشَرٌ وَلَمْ أَكُ بَغِيًّا ﴿٢٠﴾ قَالَ كَذَٰلِكِ قَالَ رَبُّكِ هُوَ عَلَىَّ هَيِّنٌ ۖ وَلِنَجْعَلَهُۥٓ ءَايَةً لِّلنَّاسِ وَرَحْمَةً مِّنَّا ۚ وَكَانَ أَمْرًا مَّقْضِيًّا ﴿٢١﴾'
  const translation = 'And mention in the Book, Maryam, when she withdrew from her family to an eastern place. And she took a screen apart from them. Then We sent to her Our Spirit, and he took for her the form of a well-proportioned man. She said: "I seek refuge in the Most Merciful from you, if you are God-fearing." He said: "I am only the messenger of your Lord, to give you a pure boy." She said: "How can I have a boy when no man has touched me and I have not been unchaste?" He said: "Thus it will be. Your Lord says: It is easy for Me, and so that We may make him a sign for people and a mercy from Us. And it was a matter already decreed."'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 19).eq('ayah_start', 16).eq('ayah_end', 21).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 19, ayah_start: 16, ayah_end: 21,
    arabic_text: arabicText, translation,
    title: "The Screen and the Announcement — When Privacy Became the Room Where the Angel Arrived",
    word_count: 66, estimated_duration: '48-55 minutes',
    passage_context: "Maryam withdraws to solitude, the angel appears as a man, she invokes Ar-Rahman, and learns the matter was already decreed.",
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
