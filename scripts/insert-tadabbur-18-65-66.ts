import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const raw = fs.readFileSync('scripts/tadabbur-output/18-65-66.md', 'utf-8')
  const commentMatch = raw.match(/<!--([\s\S]*?)-->/g)
  const groundingTable = commentMatch ? commentMatch.join('\n') : ''
  const introStart = raw.indexOf('## Introduction')
  const part2Start = raw.indexOf('## Part 2: The Thematic Depths')
  const linguisticHtml = raw.substring(introStart, part2Start).trim()
  const reflectionHtml = raw.substring(part2Start).trim()

  const arabicText = 'فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَآ ءَاتَيْنَـٰهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَـٰهُ مِن لَّدُنَّا عِلْمًا ﴿٦٥﴾ قَالَ لَهُۥ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰٓ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا ﴿٦٦﴾'
  const translation = 'So they found a servant from among Our servants, to whom We had given mercy from Us and whom We had taught from Our own presence a [special] knowledge. Musa said to him: "May I follow you so that you teach me from what you have been taught of right guidance?"'

  const { data: ex } = await supabase.from('ayah_records').select('id').eq('surah_number', 18).eq('ayah_start', 65).eq('ayah_end', 66).maybeSingle()
  if (ex) { console.log('Exists:', ex.id); return }

  const { data, error } = await supabase.from('ayah_records').insert({
    surah_number: 18, ayah_start: 65, ayah_end: 66,
    arabic_text: arabicText, translation,
    title: "The Prophet Who Asked Permission to Follow — Musa and the Unnamed Servant",
    word_count: 21, estimated_duration: '48-55 minutes',
    passage_context: "Musa meets Khidr at the junction of the two seas — the beginning of the journey that will test the limits of prophetic knowledge.",
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
