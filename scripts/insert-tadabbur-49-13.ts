import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/049-al-hujurat/ayah-013.md', 'utf-8')

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
    .eq('surah_number', 49)
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
      surah_number: 49,
      ayah_start: 13,
      ayah_end: 13,
      arabic_text: 'يَـٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقْنَـٰكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَـٰكُمْ شُعُوبًا وَقَبَآئِلَ لِتَعَارَفُوٓا۟ ۚ إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ ۚ إِنَّ ٱللَّهَ عَلِيمٌ خَبِيرٌ',
      translation: "O humanity — We created you from a male and a female, and made you into nations and tribes so that you may come to know one another. The most noble of you in the sight of Allah is the most mindful of Him. Allah is All-Knowing, All-Aware.",
      title: "The Only Hierarchy That Matters Is the One No Human Eye Can See",
      word_count: 220,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Al-Hujurat is a Medinan surah of social ethics — addressing believers on manners, backbiting, suspicion, and mockery. But at ayah 13, the address suddenly widens from 'O you who believe' to 'O humanity,' making this declaration universal. Revealed during the conquest of Makkah, when Bilal — a former slave — was chosen to call the adhan from atop the Ka'bah, provoking tribal contempt from Qurayshi aristocrats.",
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
