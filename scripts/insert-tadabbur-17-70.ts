import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/017-al-isra/ayah-070.md', 'utf-8')

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
    .eq('surah_number', 17)
    .eq('ayah_start', 70)
    .eq('ayah_end', 70)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 17,
      ayah_start: 70,
      ayah_end: 70,
      arabic_text: 'وَلَقَدْ كَرَّمْنَا بَنِىٓ ءَادَمَ وَحَمَلْنَـٰهُمْ فِى ٱلْبَرِّ وَٱلْبَحْرِ وَرَزَقْنَـٰهُم مِّنَ ٱلطَّيِّبَـٰتِ وَفَضَّلْنَـٰهُمْ عَلَىٰ كَثِيرٍ مِّمَّنْ خَلَقْنَا تَفْضِيلًا',
      translation: "And We have certainly honored the children of Adam and carried them on land and sea and provided for them of good things and preferred them over much of what We have created, with definite preference.",
      title: "You Were Honored Before You Did Anything — The Verb That Made Dignity Your Nature",
      word_count: 220,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Al-Isra opens with the Night Journey — the Prophet's miraculous transit through the heavens — and develops a sustained meditation on what a human being is. This ayah, midway through the surah, delivers the answer as a divine declaration: human dignity is not earned but ennobled (Form II karrama), framed by the most emphatic construction in Arabic (wa-laqad), and calibrated by kathīr ('much, not all') to prevent honor from becoming arrogance.",
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
