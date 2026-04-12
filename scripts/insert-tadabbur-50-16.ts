import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/050-qaf/ayah-016.md', 'utf-8')

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
    .eq('surah_number', 50)
    .eq('ayah_start', 16)
    .eq('ayah_end', 16)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 50,
      ayah_start: 16,
      ayah_end: 16,
      arabic_text: 'وَلَقَدْ خَلَقْنَا ٱلْإِنسَـٰنَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِۦ نَفْسُهُۥ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ ٱلْوَرِيدِ',
      translation: "And We have already created the human being, and We know what his soul whispers to him — and We are closer to him than his jugular vein.",
      title: "Closer Than Your Own Pulse — The Ayah That Collapses Every Distance You Thought Existed Between You and Allah",
      word_count: 230,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Qaf's argument for resurrection pivots from cosmic evidence to the most intimate reality: Allah's knowledge of the human interior. The ayah's three clauses move progressively inward — creation (external), knowledge of the soul's whispers (internal), nearness closer than the jugular vein (sub-conscious interior). Key linguistic discoveries: خَلَقْنَا (perfect tense — creation done once) vs. نَعْلَمُ (imperfect — knowing never stops), تُوَسْوِسُ as a quadriliteral root (و-س-و-س) whose reduplicated sibilants phonetically mimic whispering, نَفْسُهُۥ (the soul — not Shaytan — as the grammatical subject of the whispering), وَنَحْنُ (independent emphatic pronoun foregrounding the divine subject), أَقْرَبُ (elative comparison surpassing the most intimate physical referent), and حَبْلِ ٱلْوَرِيدِ (the jugular vein — from root و-ر-د 'to arrive at water' — the channel through which life arrives).",
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
