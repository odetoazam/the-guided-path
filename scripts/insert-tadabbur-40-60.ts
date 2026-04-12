import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const raw = fs.readFileSync('content/tadabbur/040-ghafir/ayah-060.md', 'utf-8')

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
    .eq('surah_number', 40)
    .eq('ayah_start', 60)
    .eq('ayah_end', 60)
    .maybeSingle()

  if (existing) {
    console.log('Already exists:', existing.id)
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert({
      surah_number: 40,
      ayah_start: 60,
      ayah_end: 60,
      arabic_text: 'وَقَالَ رَبُّكُمُ ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ ۚ إِنَّ ٱلَّذِينَ يَسْتَكْبِرُونَ عَنْ عِبَادَتِى سَيَدْخُلُونَ جَهَنَّمَ دَاخِرِينَ',
      translation: 'And your Lord said: "Call upon Me — I will respond to you. Indeed, those who are too arrogant for My worship will enter Hell, humiliated."',
      title: "Just Ask — The Ayah Where Allah Uses the Same Grammar to Describe His Generosity and Your Arrogance",
      word_count: 240,
      estimated_duration: '48-58 minutes',
      passage_context: "Ghafir 40:60 — the ultimate du'a ayah. The Prophet ﷺ said: 'Du'a IS worship' (Abu Dawud, Tirmidhi). Key linguistic discoveries: أَسْتَجِبْ Form X jussive (root ج-و-ب — not Form IV أُجِبْ 'I will answer' but Form X 'I will find-the-response-within-Myself'; the response pre-exists, awaiting the call; jussive mood = conditional certainty after imperative); twin Form X mirror — أَسْتَجِبْ (Form X: finding response within, for you) vs. يَسْتَكْبِرُونَ (Form X: seeking greatness within, against Him) — same morphological skeleton, opposite direction; رَبُّكُمُ nurturing name chosen over Allah/al-Malik (a parent inviting, not a judge summoning); ٱدْعُونِىٓ Form I imperative (simplest verb form for simplest act — no prerequisites, no ritual gate); عِبَادَتِى with possessive yā' = du'a belongs to Him; سَيَدْخُلُونَ active voice (they WALK IN, not thrown in; سَ = near future certainty); دَاخِرِينَ active participle as ḥāl (they carry humiliation through the door — it's their emanating condition, not imposed); iltifat: 2nd person (رَبُّكُمُ ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ) → 3rd person (ٱلَّذِينَ يَسْتَكْبِرُونَ) — the arrogant are no longer addressed, only described; they refused to speak to Allah so Allah stopped speaking to them. Absent object of du'a = bring anything, no conditions. Absent form of response = guaranteed response, not guaranteed form. Asymmetry: invitation side has no conditions/no named destination; punishment side has specific destination (جَهَنَّمَ) and specific condition (دَاخِرِينَ) — generosity is open-ended, consequence is precise. A-B-C-B'-A' chiasm: Rabb → Call → RESPONSE (center) → Arrogance → Hell. The center = Allah's response; the ayah is architecturally about the response, not the punishment. Phonetics: ٱدْعُونِىٓ stretches open (door held ajar) vs. أَسْتَجِبْ clipped decisive vs. يَسْتَكْبِرُونَ phonetically bloated vs. دَاخِرِينَ guttural/crushed.",
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
