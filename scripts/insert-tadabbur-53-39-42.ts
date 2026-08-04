import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/053-an-najm/ayahs-039-042.md', 'utf-8')

  const comments = raw.match(/<!--[\s\S]*?-->/g) || []
  const grounding = comments.join('\n')

  const lastCommentEnd = raw.lastIndexOf('-->')
  const body = raw.substring(lastCommentEnd + 3).trim()

  const part2Marker = '## PART 2: THE THEMATIC DEPTHS'
  const part2Start = body.indexOf(part2Marker)
  const linguisticHtml = body.substring(0, part2Start).trim()
  const reflectionHtml = body.substring(part2Start).trim()

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 53)
    .eq('ayah_start', 39)
    .eq('ayah_end', 42)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 53,
      ayah_start: 39,
      ayah_end: 42,
      arabic_text: 'وَأَن لَّيْسَ لِلْإِنسَٰنِ إِلَّا مَا سَعَىٰ ﴿٣٩﴾ وَأَنَّ سَعْيَهُۥ سَوْفَ يُرَىٰ ﴿٤٠﴾ ثُمَّ يُجْزَىٰهُ ٱلْجَزَآءَ ٱلْأَوْفَىٰ ﴿٤١﴾ وَأَنَّ إِلَىٰ رَبِّكَ ٱلْمُنتَهَىٰ ﴿٤٢﴾',
      translation: "And that the human has nothing except what he strove for — And that his striving will be seen — Then he will be recompensed for it the fullest recompense — And that to your Lord is the terminus.",
      title: "What Actually Belongs to You — The Four Anna Clauses That Strip Everything Away",
      word_count: 280,
      estimated_duration: '50-60 minutes',
      passage_context: "Surah An-Najm 53:36-42 closes with four parallel anna-clauses summarizing the eternal teachings inscribed in the scrolls of Mūsā and Ibrāhīm. Following 53:38's negation (no bearer of burden bears another's burden), 53:39-42 deliver its positive corollary: what IS yours is only your striving, that striving will be seen, returned to you in fullness past full, and the terminus of all motion is your Lord. The architecture moves from interior (what you carry) → manifestation (what becomes visible) → reciprocity (what is given back) → ground (where it all arrives). The grammar enacts the meaning: the light ʾan + verbal laysa-illā construction performs a strip-search before the heavy ʾanna delivers the verdicts. Saʿy (bodily exertion) is chosen over kasb (acquisition) and ʿamal (action) precisely because it cannot be outsourced or accidental — only the body's costly motion qualifies as 'yours.' The four ayahs end on the same alif-maqṣūra rhyme (saʿā / yurā / awfā / muntahā), the mouth audibly arriving at the same place each time.",
      status: 'published',
      layer_a: {
        grounding_table: grounding,
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

  console.log('Published:', data.id)
}

main()
