import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/042-ash-shura/ayah-011.md', 'utf-8')

  // Extract grounding table (comments)
  const comments = raw.match(/<!--[\s\S]*?-->/g) || []
  const grounding = comments.join('\n')

  // Get reflection body (after last -->)
  const lastCommentEnd = raw.lastIndexOf('-->')
  const body = raw.substring(lastCommentEnd + 3).trim()

  // Split sections
  const part2Marker = '## Part 2: The Thematic Depths'
  const part2Start = body.indexOf(part2Marker)
  const linguisticHtml = body.substring(0, part2Start).trim()
  const reflectionHtml = body.substring(part2Start).trim()

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 42)
    .eq('ayah_start', 11)
    .eq('ayah_end', 11)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 42,
      ayah_start: 11,
      ayah_end: 11,
      arabic_text: 'فَاطِرُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا وَمِنَ ٱلْأَنْعَـٰمِ أَزْوَٰجًا ۖ يَذْرَؤُكُمْ فِيهِ ۚ لَيْسَ كَمِثْلِهِۦ شَىْءٌ ۖ وَهُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ',
      translation: 'Originator of the heavens and the earth. He has made for you from yourselves mates, and among the cattle, mates; He multiplies you thereby. There is nothing like His likeness, and He is the Hearing, the Seeing.',
      title: 'Nothing Like His Likeness — The Six Words That Broke Every Comparison',
      word_count: 210,
      estimated_duration: '48-58 minutes',
      passage_context: "Ash-Shura (The Consultation) is a late Meccan surah at the heart of the Ha Mim cluster (surahs 40-46). Ayah 42:11 arrives after establishing that Allah sends revelation by His command (42:3), that the heavens almost break apart from above (42:5), and that those who take protectors besides Allah — Allah is their watchful guardian (42:6). The ayah is a theological watershed: it simultaneously declares total divine transcendence (laysa kamithlihi shay') and total divine intimacy (wa huwa al-Sami' al-Basir).",
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
