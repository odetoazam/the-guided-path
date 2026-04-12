import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/018-al-kahf/ayah-028.md', 'utf-8')

  const comments = raw.match(/<!--[\s\S]*?-->/g) || []
  const grounding = comments.join('\n')

  const lastCommentEnd = raw.lastIndexOf('-->')
  const body = raw.substring(lastCommentEnd + 3).trim()

  const part2Marker = '## Part 2: The Thematic Depths'
  const part2Start = body.indexOf(part2Marker)
  const linguisticHtml = body.substring(0, part2Start).trim()
  const reflectionHtml = body.substring(part2Start).trim()

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 18)
    .eq('ayah_start', 28)
    .eq('ayah_end', 28)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 18,
      ayah_start: 28,
      ayah_end: 28,
      arabic_text: 'وَٱصْبِرْ نَفْسَكَ مَعَ ٱلَّذِينَ يَدْعُونَ رَبَّهُم بِٱلْغَدَوٰةِ وَٱلْعَشِىِّ يُرِيدُونَ وَجْهَهُۥ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُۥ عَن ذِكْرِنَا وَٱتَّبَعَ هَوَىٰهُ وَكَانَ أَمْرُهُۥ فُرُطًا',
      translation: "And bind your self to those who call upon their Lord morning and evening, wanting His Face. And do not let your eyes pass beyond them, wanting the adornment of this lower life. And do not obey one whose heart We have made heedless of Our remembrance, who followed his own desire, and whose affair has become lost.",
      title: "Bind Yourself to the People Who Want His Face — The Command That Reorganizes Every Relationship You Have",
      word_count: 250,
      estimated_duration: '48-58 minutes',
      passage_context: "Revealed when Quraysh leaders demanded the Prophet ﷺ remove the poor believers (Bilāl, Ṣuhayb, Khabbāb, Salmān) from his gathering before they would sit with him. Allah's response refuses the economic framing entirely — the poor are never called poor, only described as people who want His Face. The ayah sits at the threshold of Al-Kahf's second trial (wealth), inoculating the listener before the Two Gardens parable (18:32-44). Three anchor points: iṣbir nafsaka (ṣabr as physical binding/restraining, not passive waiting), mirror verbs yurīdūna wajhahū vs. turīdu zīnata-l-ḥayāti-d-dunyā (same Form IV root, opposite objects — His Face vs. worldly adornment), and the aghfalnā + ittaba'a pair (Form IV divine causation + Form VIII human choice in the same sentence — the deepest compressed statement on qadar and free will).",
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
