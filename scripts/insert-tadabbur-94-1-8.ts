import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/094-ash-sharh/ayahs-001-008.md', 'utf-8')

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
    .eq('surah_number', 94)
    .eq('ayah_start', 1)
    .eq('ayah_end', 8)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 94,
      ayah_start: 1,
      ayah_end: 8,
      arabic_text: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ﴿١﴾ وَوَضَعْنَا عَنكَ وِزْرَكَ ﴿٢﴾ ٱلَّذِىٓ أَنقَضَ ظَهْرَكَ ﴿٣﴾ وَرَفَعْنَا لَكَ ذِكْرَكَ ﴿٤﴾ فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ﴿٦﴾ فَإِذَا فَرَغْتَ فَٱنصَبْ ﴿٧﴾ وَإِلَىٰ رَبِّكَ فَٱرْغَبْ ﴿٨﴾',
      translation: "Did We not expand for you your chest? And remove from you your burden — the one that was breaking your back? And raise for you your mention? Then indeed, with hardship comes ease. Indeed, with hardship comes ease. So when you are emptied, toil. And toward your Lord, turn with longing.",
      title: "We Already Opened Your Chest — The Eight Ayahs That Rewrite What Comfort Actually Means",
      word_count: 230,
      estimated_duration: '48-58 minutes',
      passage_context: "The complete Surah Ash-Sharh (Al-Inshirah) — the companion to Ad-Duha, revealed during a period of the Prophet's ﷺ distress. Eight ayahs of concentrated divine comfort that end not with rest but with command. Key linguistic discoveries: أَنقَضَ Form IV causative (the burden was the active agent CAUSING the back to break — the qaf mimics the sound of cracking), وَضَعْنَا vs. رَفَعْنَا antonymic pair in A-B-B'-A' chiasm (lowest point architecturally enclosed by divine action), ٱلْعُسْرِ definite vs. يُسْرًا indefinite = one hardship but two eases (Arabic grammar's mathematical guarantee — definite article recalls same referent, indefinite creates new), مَعَ preposition of accompaniment not sequence (ease is WITH hardship, not AFTER it), فَرَغْتَ absent object (emptied from what? — deliberately universal), فَٱنصَبْ after six ayahs of comfort = the comfort was fuel not destination, فَٱرْغَبْ absent object (yearn for what? — the yearning itself is the command), رَبِّكَ not Allah/Ilah (the nurturing name closes the nurturing surah), three-phase rhyme shift (-ka → -ra → -b) mapping intimate care → universal principle → commanding send-off.",
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
