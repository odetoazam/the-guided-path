import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/019-maryam/ayahs-022-026.md', 'utf-8')

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
    .eq('surah_number', 19)
    .eq('ayah_start', 22)
    .eq('ayah_end', 26)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 19,
      ayah_start: 22,
      ayah_end: 26,
      arabic_text: 'فَحَمَلَتْهُ فَٱنتَبَذَتْ بِهِۦ مَكَانًا قَصِيًّا ﴿٢٢﴾ فَأَجَآءَهَا ٱلْمَخَاضُ إِلَىٰ جِذْعِ ٱلنَّخْلَةِ قَالَتْ يَـٰلَيْتَنِى مِتُّ قَبْلَ هَـٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا ﴿٢٣﴾ فَنَادَىٰهَا مِن تَحْتِهَآ أَلَّا تَحْزَنِى قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا ﴿٢٤﴾ وَهُزِّىٓ إِلَيْكِ بِجِذْعِ ٱلنَّخْلَةِ تُسَـٰقِطْ عَلَيْكِ رُطَبًا جَنِيًّا ﴿٢٥﴾ فَكُلِى وَٱشْرَبِى وَقَرِّى عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ ٱلْبَشَرِ أَحَدًا فَقُولِىٓ إِنِّىٓ نَذَرْتُ لِلرَّحْمَـٰنِ صَوْمًا فَلَنْ أُكَلِّمَ ٱلْيَوْمَ إِنسِيًّا ﴿٢٦﴾',
      translation: "So she conceived him and withdrew with him to a remote place. Then the pains of childbirth drove her to the trunk of a palm tree. She said, 'Oh, I wish I had died before this and been a thing forgotten, utterly forgotten.' Then he called to her from below her, 'Do not grieve — your Lord has placed beneath you a stream.' And shake toward yourself the trunk of the palm tree; it will drop upon you fresh, ripe dates. So eat and drink and cool your eye. And if you see any human being, say: I have vowed a fast to the Most Merciful, so I will not speak to any person today.",
      title: "She Wished to Be Nothing — The Five Ayahs Where the Most Remembered Woman Asked to Be Forgotten",
      word_count: 65,
      estimated_duration: '48-58 minutes',
      passage_context: "Maryam 19:22-26 — the labor-to-provision arc: Maryam alone, in labor, wishing for double nothingness, then receiving divine provision through a stream and a palm tree. Key linguistic discoveries: ٱنتَبَذَتْ Form VIII reflexive of ن-ب-ذ (she cast HERSELF away — subject and object of the same discarding); أَجَآءَهَا Form IV causative of ج-ي-أ (labor DROVE her, stripped her agency — she is the grammatical object of her own movement); نَسْيًا مَّنسِيًّا double-forgetting cognate construction (a forgotten thing that is itself forgotten — de-personing herself into an object of absolute oblivion, the phonetics dissolve as they're spoken); classical ikhtilaf on who calls from below: Jibril (Ibn Abbas, Mujahid) or baby Isa himself (al-Hasan, Sa'id ibn Jubayr) — both readings devastating; هُزِّىٓ Form I imperative (the command to shake a palm trunk at maximum physical depletion — provision requires participation, not because effort produces the result, but because effort is the condition under which the miracle operates); تُسَـٰقِطْ Form III/tufā'il carrying cooperative/mutual falling (the tree participates, releases toward her); رُطَبًا جَنِيًّا — peak-sweetness stage of dates, freshly picked, luxury-grade provision at the nadir of despair; قَرِّى Form II intensive of ق-ر-ر (thoroughgoing peace, not momentary calm); the -iyyā rhyme scheme mapping the emotional arc: قَصِيًّا (remote) → مَّنسِيًّا (forgotten) → سَرِيًّا (stream) → جَنِيًّا (ripe) → إِنسِيًّا (human being) — from isolation to re-entry. Historical irony: the woman who wished to be doubly forgotten became the only woman named in the Quran, her name appearing 34 times across 14 centuries of continuous recitation.",
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
