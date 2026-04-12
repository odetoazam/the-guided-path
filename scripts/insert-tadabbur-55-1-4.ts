import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/055-ar-rahman/ayahs-001-004.md', 'utf-8')

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
    .eq('surah_number', 55)
    .eq('ayah_start', 1)
    .eq('ayah_end', 4)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 55,
      ayah_start: 1,
      ayah_end: 4,
      arabic_text: 'ٱلرَّحْمَـٰنُ ﴿١﴾ عَلَّمَ ٱلْقُرْءَانَ ﴿٢﴾ خَلَقَ ٱلْإِنسَـٰنَ ﴿٣﴾ عَلَّمَهُ ٱلْبَيَانَ ﴿٤﴾',
      translation: "The Most Merciful — Taught the Quran — Created the human being — Taught him expression.",
      title: "He Taught You to Speak Before He Taught You to Exist — The Four Ayahs That Reorder Everything",
      word_count: 230,
      estimated_duration: '48-58 minutes',
      passage_context: "Surah Ar-Rahman opens with a single divine name — not Allah, not Rabb, but Ar-Raḥmān (the fa'lān pattern of overflowing mercy) — then delivers four ayahs whose sequence reverses the expected order: teaching before creating, Quran before human, education bookending existence. The two acts of 'allama (Form II intensive) surround the single act of khalaqa (Form I simple), making teaching the frame and creation the content within it.",
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
