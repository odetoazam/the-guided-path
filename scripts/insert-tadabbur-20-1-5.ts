import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/020-taha/ayahs-001-005.md', 'utf-8')

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
    .eq('surah_number', 20)
    .eq('ayah_start', 1)
    .eq('ayah_end', 5)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 20,
      ayah_start: 1,
      ayah_end: 5,
      arabic_text: 'طه ﴿١﴾ مَآ أَنزَلْنَا عَلَيْكَ ٱلْقُرْءَانَ لِتَشْقَىٰٓ ﴿٢﴾ إِلَّا تَذْكِرَةً لِّمَن يَخْشَىٰ ﴿٣﴾ تَنزِيلًا مِّمَّنْ خَلَقَ ٱلْأَرْضَ وَٱلسَّمَـٰوَٰتِ ٱلْعُلَى ﴿٤﴾ ٱلرَّحْمَـٰنُ عَلَى ٱلْعَرْشِ ٱسْتَوَىٰ ﴿٥﴾',
      translation: "Ṭā Hā. We did not send down the Quran upon you to make you miserable — only as a reminder for whoever stands in awe. A sending-down from the One who created the earth and the lofty heavens. The Most Merciful, upon the Throne He established.",
      title: "We Didn't Send This to Break You — The Five Ayahs That Redefine What the Quran Is For",
      word_count: 230,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Ta-Ha opens with the gentlest sound in the Quran — two mystery letters that function as a whisper before a revelation. The passage's architecture moves from mystery (طه) to removal (the Quran was NOT sent for misery) to purpose (just a reminder) to cosmic credentials (from the Creator of earth and heavens) to identity (ar-Raḥmān upon the Throne). The key linguistic discoveries: لِتَشْقَىٰٓ as Form I simple-state misery negated from the divine blueprint, تَذْكِرَةً as Form II intensive making-remember (the Quran drives the remembering, not you), يَخْشَىٰ with absent object creating the widest possible door, and ٱلرَّحْمَـٰنُ fronted before the Throne — word-order topicalization placing mercy before authority.",
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
