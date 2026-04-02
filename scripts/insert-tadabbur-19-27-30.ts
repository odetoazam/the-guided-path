import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/19-27-30.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'فَأَتَتْ بِهِۦ قَوْمَهَا تَحْمِلُهُۥ ۖ قَالُوا۟ يَـٰمَرْيَمُ لَقَدْ جِئْتِ شَيْـًٔا فَرِيًّا ﴿٢٧﴾ يَـٰٓأُخْتَ هَـٰرُونَ مَا كَانَ أَبُوكِ ٱمْرَأَ سَوْءٍ وَمَا كَانَتْ أُمُّكِ بَغِيًّا ﴿٢٨﴾ فَأَشَارَتْ إِلَيْهِ ۖ قَالُوا۟ كَيْفَ نُكَلِّمُ مَن كَانَ فِى ٱلْمَهْدِ صَبِيًّا ﴿٢٩﴾ قَالَ إِنِّى عَبْدُ ٱللَّهِ ءَاتَىٰنِىَ ٱلْكِتَـٰبَ وَجَعَلَنِى نَبِيًّا ﴿٣٠﴾'
  const translation = 'So she came to her people carrying him. They said: "O Maryam, you have brought something monstrous! O sister of Harun — your father was not a man of evil, and your mother was not unchaste." So she pointed to him. They said: "How can we speak to one who is a child in the cradle?" He said: "Indeed I am the servant of Allah. He has given me the Scripture and made me a prophet."'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 19).eq('ayah_start', 27).eq('ayah_end', 30).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 19, ayah_start: 27, ayah_end: 30,
    arabic_text: arabicText, translation,
    title: "She Pointed — When Silence Became the Stage for a Miracle",
    word_count: 42, estimated_duration: '48-55 minutes',
    passage_context: "Maryam returns carrying Isa, is publicly accused, stays silent and points to the infant, who speaks his first words: 'I am the servant of Allah.'",
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
