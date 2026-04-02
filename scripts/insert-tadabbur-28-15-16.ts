import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/28-15-16.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'وَدَخَلَ ٱلْمَدِينَةَ عَلَىٰ حِينِ غَفْلَةٍ مِّنْ أَهْلِهَا فَوَجَدَ فِيهَا رَجُلَيْنِ يَقْتَتِلَانِ هَـٰذَا مِن شِيعَتِهِۦ وَهَـٰذَا مِنْ عَدُوِّهِۦ فَٱسْتَغَـٰثَهُ ٱلَّذِى مِن شِيعَتِهِۦ عَلَى ٱلَّذِى مِنْ عَدُوِّهِۦ فَوَكَزَهُۥ مُوسَىٰ فَقَضَىٰ عَلَيْهِ ۖ قَالَ هَـٰذَا مِنْ عَمَلِ ٱلشَّيْطَـٰنِ ۖ إِنَّهُۥ عَدُوٌّ مُّضِلٌّ مُّبِينٌ ﴿١٥﴾ قَالَ رَبِّ إِنِّى ظَلَمْتُ نَفْسِى فَٱغْفِرْ لِى فَغَفَرَ لَهُۥٓ ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ ﴿١٦﴾'
  const translation = 'And he entered the city at a time of inattention from its people, and found in it two men fighting — this one from his party and this one from his enemy. The one from his party called him for help against the one from his enemy. So Musa struck him and finished him. He said: "This is from the work of Shaytan. Indeed he is a clear, misleading enemy." He said: "My Lord, I have wronged myself, so forgive me." And He forgave him. Indeed, He is the Forgiving, the Merciful.'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 28).eq('ayah_start', 15).eq('ayah_end', 16).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 28, ayah_start: 15, ayah_end: 16,
    arabic_text: arabicText, translation,
    title: "The Punch and the Prayer — What Happened Before the Burning Bush",
    word_count: 44, estimated_duration: '48-55 minutes',
    passage_context: "Young Musa kills an Egyptian with a single punch, then turns immediately to Allah in confession — the mistake that preceded the mission.",
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
