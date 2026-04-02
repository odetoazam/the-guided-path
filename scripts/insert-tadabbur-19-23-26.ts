import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/19-23-26.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'فَأَجَآءَهَا ٱلْمَخَاضُ إِلَىٰ جِذْعِ ٱلنَّخْلَةِ قَالَتْ يَـٰلَيْتَنِى مِتُّ قَبْلَ هَـٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا ﴿٢٣﴾ فَنَادَىٰهَا مِن تَحْتِهَآ أَلَّا تَحْزَنِى قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا ﴿٢٤﴾ وَهُزِّىٓ إِلَيْكِ بِجِذْعِ ٱلنَّخْلَةِ تُسَـٰقِطْ عَلَيْكِ رُطَبًا جَنِيًّا ﴿٢٥﴾ فَكُلِى وَٱشْرَبِى وَقَرِّى عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ ٱلْبَشَرِ أَحَدًا فَقُولِىٓ إِنِّى نَذَرْتُ لِلرَّحْمَـٰنِ صَوْمًا فَلَنْ أُكَلِّمَ ٱلْيَوْمَ إِنسِيًّا ﴿٢٦﴾'
  const translation = 'Then the labor pains drove her to the trunk of a palm tree. She said: "I wish I had died before this and been a thing forgotten, utterly forgotten." Then he called her from beneath her: "Do not grieve — your Lord has placed beneath you a stream. And shake toward yourself the trunk of the palm tree — it will drop upon you fresh, ripe dates. So eat, and drink, and cool your eye. And if you see any human being, say: I have vowed a fast to the Most Merciful, so I will not speak to any person today."'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 19).eq('ayah_start', 23).eq('ayah_end', 26).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 19, ayah_start: 23, ayah_end: 26,
    arabic_text: arabicText, translation,
    title: "The Tree, the Stream, and the Shake — What Allah Provided When Maryam Wished to Disappear",
    word_count: 52, estimated_duration: '48-55 minutes',
    passage_context: "Maryam in labor alone, wishes for death, then receives provision from beneath: a stream, dates she must shake for, and the command to eat, drink, and be comforted.",
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
