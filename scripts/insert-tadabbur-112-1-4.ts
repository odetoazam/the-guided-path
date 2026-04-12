import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/112-al-ikhlas/ayahs-001-004.md', 'utf-8')

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
    .eq('surah_number', 112)
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
      surah_number: 112,
      ayah_start: 1,
      ayah_end: 4,
      arabic_text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ﴿١﴾ ٱللَّهُ ٱلصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ ﴿٤﴾',
      translation: "Say: He is Allah, the One. Allah, the Self-Sufficient, the Eternal Refuge. He begets not, nor was He begotten. And there has never been anyone equal to Him.",
      title: "Say: He Is One — The Four Ayahs That Dismantle Every Image You've Ever Built of God",
      word_count: 215,
      estimated_duration: '48-58 minutes',
      passage_context: "The complete Surah Al-Ikhlas — revealed in response to Quraysh (or the Jews of Medina) asking the Prophet ﷺ to describe his Lord's lineage. The surah answers a genealogical question with an ontological answer, dismantling the framework behind the question. Equal to one-third of the Quran (Bukhari, Muslim). Key linguistic discoveries: أَحَدٌ vs. وَاحِدٌ (categorical uniqueness vs. numerical oneness — ahad takes God off the number line, removing Him from any genus or category), ٱلصَّمَدُ fa'al pattern = permanent intrinsic quality (composite sketch: Ibn Abbas — the one all needs flow to; Ikrimah — no internal void; the sealed sound: ṣad-mim-dal — every consonant closes the mouth; the logical engine of the surah — samad makes ayahs 3-4 inevitable), يَلِدْ active / يُولَدْ passive = same root و-ل-د both voices negated (seals both ends of the timeline: no consequence forward, no cause backward), كُفُوًا fronted predicate (taqdim for absolute categorical denial of equivalence), أَحَدٌ ring closure (first theological word and last word of the surah — first declares identity, last guards it). Architecture: POSITIVE-POSITIVE-NEGATIVE-NEGATIVE with al-Samad as the hinge; the surah defines God by subtraction — every negation leaves less to picture, and the inability to picture Him IS the understanding.",
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
