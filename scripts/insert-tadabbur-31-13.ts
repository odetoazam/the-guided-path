import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/031-luqman/ayah-013.md', 'utf-8')

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
    .eq('surah_number', 31)
    .eq('ayah_start', 13)
    .eq('ayah_end', 13)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 31,
      ayah_start: 13,
      ayah_end: 13,
      arabic_text: 'وَإِذْ قَالَ لُقْمَـٰنُ لِٱبْنِهِۦ وَهُوَ يَعِظُهُۥ يَـٰبُنَىَّ لَا تُشْرِكْ بِٱللَّهِ ۖ إِنَّ ٱلشِّرْكَ لَظُلْمٌ عَظِيمٌ',
      translation: "And [mention] when Luqman said to his son while he was advising him, 'O my dear son, do not associate [anything] with Allah. Indeed, association [with Him] is a great wrongdoing.'",
      title: "My Dear Son, Don't Do This to Yourself — Why a Father Called Shirk the Greatest Self-Harm",
      word_count: 210,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Luqman is a late Meccan surah named after a wise man — not a prophet — whose only recorded act is parenting. The first word of his counsel is the diminutive of love (ya bunayya), and the first prohibition is shirk, defined not as a crime against God's power but as zulm (displacement) — placing something where it doesn't belong.",
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
