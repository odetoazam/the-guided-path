import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/7-150.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'وَلَمَّا رَجَعَ مُوسَىٰٓ إِلَىٰ قَوْمِهِۦ غَضْبَـٰنَ أَسِفًا قَالَ بِئْسَمَا خَلَفْتُمُونِى مِنۢ بَعْدِىٓ ۖ أَعَجِلْتُمْ أَمْرَ رَبِّكُمْ ۖ وَأَلْقَى ٱلْأَلْوَاحَ وَأَخَذَ بِرَأْسِ أَخِيهِ يَجُرُّهُۥٓ إِلَيْهِ ۚ قَالَ ٱبْنَ أُمَّ إِنَّ ٱلْقَوْمَ ٱسْتَضْعَفُونِى وَكَادُوا۟ يَقْتُلُونَنِى فَلَا تُشْمِتْ بِىَ ٱلْأَعْدَآءَ وَلَا تَجْعَلْنِى مَعَ ٱلْقَوْمِ ٱلظَّـٰلِمِينَ'
  const translation = 'And when Musa returned to his people, angry and grieved, he said: "How wretched is what you did in my absence! Did you try to hasten the command of your Lord?" And he threw down the tablets and seized his brother by the head, dragging him toward himself. He said: "O son of my mother, the people overpowered me and nearly killed me — so do not let the enemies gloat over me, and do not place me among the wrongdoing people."'

  const { data: existing } = await supabase
    .from('ayah_records').select('id').eq('surah_number', 7).eq('ayah_start', 150).eq('ayah_end', 150).maybeSingle()
  if (existing) { console.log('Exists:', existing.id); return }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 7, ayah_start: 150, ayah_end: 150,
      arabic_text: arabicText, translation,
      title: "The Prophet Who Broke — When Anger Flooded Past the Tablets",
      word_count: 35, estimated_duration: '48-55 minutes',
      passage_context: "Musa returns from Sinai to find the golden calf — throws tablets, seizes Harun, and Harun's 'O son of my mother' stops everything.",
      status: 'published',
      layer_a: { grounding_table: groundingTable, linguistic_html: linguisticHtml },
      layer_b: { reflection_html: reflectionHtml }
    }).select('id').single()
  if (error) { console.error(error); process.exit(1) }
  console.log('Inserted:', data.id)

  const { error: te } = await supabase.from('entity_tags').insert({ entity_id: 'a3221ae5-2aea-497d-bdca-c26ef513ccfa', ayah_record_id: data.id, is_primary: true })
  if (te) { console.error(te); process.exit(1) }
  console.log('Tagged. Done!')
}
main().catch(console.error)
