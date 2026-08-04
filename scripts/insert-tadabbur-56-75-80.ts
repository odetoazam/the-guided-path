import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/056-al-waqia/ayahs-075-080.md', 'utf-8')

  const comments = raw.match(/<!--[\s\S]*?-->/g) || []
  const grounding = comments.join('\n')

  const lastCommentEnd = raw.lastIndexOf('-->')
  const body = raw.substring(lastCommentEnd + 3).trim()

  const part2Match = body.match(/^## Part 2:.*$/im)
  if (!part2Match) {
    console.error('Could not locate Part 2 marker')
    process.exit(1)
  }
  const part2Start = body.indexOf(part2Match[0])
  const linguisticHtml = body.substring(0, part2Start).trim()
  const reflectionHtml = body.substring(part2Start).trim()

  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 56)
    .eq('ayah_start', 75)
    .eq('ayah_end', 80)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 56,
      ayah_start: 75,
      ayah_end: 80,
      arabic_text: 'فَلَآ أُقْسِمُ بِمَوَٰقِعِ ٱلنُّجُومِ ﴿٧٥﴾ وَإِنَّهُۥ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ ﴿٧٦﴾ إِنَّهُۥ لَقُرْءَانٌ كَرِيمٌ ﴿٧٧﴾ فِى كِتَٰبٍ مَّكْنُونٍ ﴿٧٨﴾ لَّا يَمَسُّهُۥٓ إِلَّا ٱلْمُطَهَّرُونَ ﴿٧٩﴾ تَنزِيلٌ مِّن رَّبِّ ٱلْعَٰلَمِينَ ﴿٨٠﴾',
      translation: "So I swear by the setting-places of the stars — and indeed it is, if you only knew, a mighty oath. Indeed this is a noble Quran, in a book kept-treasured. None touches it except the made-pure. A gradual descent from the Lord of all worlds.",
      title: "The Setting of the Stars — The Oath That Holds the Quran's Ontology",
      word_count: 480,
      estimated_duration: '52-58 minutes',
      passage_context: "A six-ayah Meccan oath-passage from Surah Al-Waqi'ah ('The Falling-Event,' the Day of Judgment) where Allah swears by the falling-places of the stars to declare what the Quran is and how access to it works. The passage sits within a surah saturated with the root w-q-ʿ (to fall/settle) — wāqiʿah, mawāqiʿ — making the oath itself an architectural echo of the surah's title. Key linguistic discoveries: مَوَٰقِعِ ٱلنُّجُومِ (ism-makān plural from waqaʿa = 'falling-places' — composite-sketch reading: nightly settings of stars + orbital positions + their fall on the Day + landing-places of revelatory installments since najm also means 'installment'); fa-lā uqsimu (the self-interrupting oath — three classical readings: lā zāʾida emphatic / negation of an opponent's claim / oath-by-disavowal); law taʿlamūna ʿaẓīm (Allah parenthetically pausing inside His own oath to flag its gravity to the listener); كَرِيم applied to a book (an adjective normally used for generous hosts — claim that the Quran's giving regenerates with each reading); مَّكْنُونٍ (Form I PASSIVE participle from k-n-n meaning kept-as-treasure, same word used for the egg-image in 37:49 — the Quran sheltered like the inside of an egg); ٱلْمُطَهَّرُونَ (Form II PASSIVE participle, NOT Form V active al-mutaṭahhirūn — purity received, not earned; primary referent angels, extended to humans in ritual purity per the Mālikī fiqh derivation); تَنزِيلٌ (verbal noun of Form II nazzala = gradual sending-down, contrasting with Form IV anzala = single descent, technically settling that the Quran arrived in installments). Architecture: aperture-widening descent — visible cosmos → listener's interior → text → vault → receivers → Source. The six ayahs walk the listener up the staircase of revelation in reverse, ending at rabb al-ʿālamīn (Lord of all knowables — root ʿ-l-m shared with ʿilm). The whole passage enacts what it describes: revelation as star-precise installments landing in their appointed mawāqiʿ.",
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
