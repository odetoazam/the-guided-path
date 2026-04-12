import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/081-at-takwir/ayahs-001-009.md', 'utf-8')

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
    .eq('surah_number', 81)
    .eq('ayah_start', 1)
    .eq('ayah_end', 9)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 81,
      ayah_start: 1,
      ayah_end: 9,
      arabic_text: 'إِذَا ٱلشَّمْسُ كُوِّرَتْ ﴿١﴾ وَإِذَا ٱلنُّجُومُ ٱنكَدَرَتْ ﴿٢﴾ وَإِذَا ٱلْجِبَالُ سُيِّرَتْ ﴿٣﴾ وَإِذَا ٱلْعِشَارُ عُطِّلَتْ ﴿٤﴾ وَإِذَا ٱلْوُحُوشُ حُشِرَتْ ﴿٥﴾ وَإِذَا ٱلْبِحَارُ سُجِّرَتْ ﴿٦﴾ وَإِذَا ٱلنُّفُوسُ زُوِّجَتْ ﴿٧﴾ وَإِذَا ٱلْمَوْءُۥدَةُ سُئِلَتْ ﴿٨﴾ بِأَىِّ ذَنۢبٍ قُتِلَتْ ﴿٩﴾',
      translation: "When the sun is wrapped up. When the stars fall and scatter. When the mountains are set marching. When the pregnant she-camels are abandoned. When the wild beasts are gathered. When the seas are set ablaze. When the souls are paired. When the girl buried alive is asked: For what sin were you killed?",
      title: "The Universe Collapsed for Her Testimony — The Nine Ayahs Where Creation Unwinds to Give Voice to One Voiceless Girl",
      word_count: 270,
      estimated_duration: '48-58 minutes',
      passage_context: "At-Takwir 81:1-9 — the cosmic unraveling sequence culminating in the buried girl's testimony. The Prophet ﷺ said: 'Whoever wishes to look at the Day of Judgment as if seeing it with his own eyes, let him read idhā ash-shamsu kuwwirat' (Ahmad, Tirmidhi). Key linguistic discoveries: كُوِّرَتْ Form II passive (root ك-و-ر = to coil a turban — the sun thoroughly wrapped/folded like cloth, not merely dimmed; composite sketch: Ibn Abbas 'light taken away,' Mujahid 'cast away,' al-Rabi' 'hurled into Hellfire'); ٱنكَدَرَتْ Form VII reflexive (the one outlier — stars scatter of their own accord, releasing themselves, as if they always knew their light was borrowed); all verbs passive throughout = hidden agent (Allah for cosmic events, the father for the murder — hidden for opposite reasons: Allah above naming, the father below naming); structural pivot from cosmic (81:1-7) to human (81:8-9) with contracting scale: sun → stars → mountains → camels → beasts → seas → soul → buried girl; ٱلْمَوْءُۥدَةُ passive participle from و-أ-د = she-who-was-buried-alive, no name, only her victimhood; سُئِلَتْ Form I passive = she is ASKED (not her killer — he is erased from the grammar while she becomes the grammatical subject); قُتِلَتْ Form I passive plain (no intensification — grammar refuses to ornament her suffering); cosmic verbs use Form II intensive but the girl's verbs use Form I plain; the -at rhyme ending nine ayahs = nine soft thuds, nine doors closing. Architecture: scale contracts from 93 million miles (sun) to zero distance (the most vulnerable human being); the universe doesn't end with a bang but with a question addressed to a girl.",
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
