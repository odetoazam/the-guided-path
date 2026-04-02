/**
 * Rewrite why_this_surah for surahs 41-60
 * Run: npx tsx scripts/rewrite-why-learn-3.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const rewrites: { surah_number: number; why_this_surah: string }[] = [
  {
    surah_number: 41,
    why_this_surah: "When a man came to argue with the Prophet ﷺ, the Prophet recited the opening of this surah — and the man put his hand over the Prophet's mouth and begged him to stop, overwhelmed. The surah describes a moment when your own skin testifies against you on the Day of Judgment. It makes the consequences of your choices feel physical.",
  },
  {
    surah_number: 42,
    why_this_surah: "How does God communicate with a human being? This surah answers that question directly: through inspiration, from behind a veil, or through a messenger. If you've ever wondered what revelation actually means — how a word from beyond reaches a person in this world — this is where the Quran explains it.",
  },
  {
    surah_number: 43,
    why_this_surah: "What happens when faith becomes inherited rather than chosen? When people follow what their parents did without ever asking why? This surah confronts the difference between tradition and truth — and asks whether you believe what you believe because you examined it, or because everyone around you does.",
  },
  {
    surah_number: 44,
    why_this_surah: "Named after the smoke — a sign of the last days. This short Makkan surah compresses the Quran's message into its essentials: the Quran was sent on a blessed night, Pharaoh's people were destroyed for their arrogance, and the tree of Zaqqum awaits those who mocked. A surah that moves fast and hits hard.",
  },
  {
    surah_number: 45,
    why_this_surah: "Have you ever met someone who made their own desires their god? This surah names that condition: a person who hears the truth but turns away as if they never heard it, who treats the signs of God as a joke. It's a surah about spiritual deafness — and the consequences of choosing to stay comfortable over choosing to listen.",
  },
  {
    surah_number: 46,
    why_this_surah: "Contains one of the Quran's most moving commands: be good to your parents. Then it tells you why — because your mother carried you in hardship, gave birth in hardship, and nursed you for years. The surah puts you at the age of forty, looking back at everything your parents gave you, and asks: have you thanked them?",
  },
  {
    surah_number: 47,
    why_this_surah: "The only surah named after the Prophet Muhammad ﷺ himself. It addresses the believers in the most direct terms about what commitment actually requires — not just belief in your heart, but showing up when it's difficult. A surah about what it means to follow someone, not just admire them.",
  },
  {
    surah_number: 48,
    why_this_surah: "The Treaty of Hudaybiyyah looked like a loss — the Muslims were turned away from Makkah. But this surah calls it 'a clear victory.' Sometimes what feels like a setback is actually the breakthrough. If you've ever been in a situation where things didn't go as planned and you couldn't understand why, this surah reframes the question.",
  },
  {
    surah_number: 49,
    why_this_surah: "The surah of manners — how to behave with each other. Don't raise your voice over the Prophet's. Don't act on rumor without checking. Don't mock people, spy on each other, or backbite. If someone wrongs you, make peace. The Quran's most concentrated guide to how a community should actually treat one another.",
  },
  {
    surah_number: 50,
    why_this_surah: "The Prophet ﷺ recited this surah from the pulpit on Fridays. It opens with the Quran and an oath, and it ends with the reminder: 'We know what the earth takes from them, and with Us is a recording book.' Between those two points, the surah asks one question: can God who created everything really not bring you back?",
  },
  {
    surah_number: 51,
    why_this_surah: "When Ibrahim's guests — angels in disguise — told him and his wife they would have a son, Sarah laughed. She was too old. But the promise was true. This surah is built on the idea that what God scatters (wind, provision, truth) always reaches its destination, even when the delivery seems impossible.",
  },
  {
    surah_number: 52,
    why_this_surah: "When Jubayr ibn Mut'im — still not a Muslim — heard the Prophet ﷺ recite this surah at Maghrib, he said his heart nearly flew out of his chest. It opens with five oaths building to a single verdict, and it ends with one of the most beautiful descriptions of Paradise in the Quran. A surah that converts by force of language.",
  },
  {
    surah_number: 53,
    why_this_surah: "Describes the moment the Prophet ﷺ saw Jibril in his true angelic form — twice. The first revelation experience, narrated from the perspective of what the Prophet actually witnessed. It also confronts the pagan idea that the angels are God's daughters and asks: on what basis? A surah about what happens when a human being encounters the divine.",
  },
  {
    surah_number: 54,
    why_this_surah: "The moon split — one of the Prophet's ﷺ greatest miracles — and still they turned away. This surah repeats the phrase 'We made the Quran easy to remember — so is there anyone who will remember?' four times. The miracle wasn't enough. The stories of Nuh, 'Ad, Thamud, and Lut weren't enough. The question is whether the Quran itself will be enough for you.",
  },
  {
    surah_number: 55,
    why_this_surah: "Thirty-one times, this surah asks: 'So which of the favors of your Lord would you deny?' Thirty-one times. It lists what God gave you — your existence, language, the sun, the moon, the sea, fruit, grain — and after each gift, it asks again. By the end, the repetition has either broken through or you've been refusing to listen the entire time.",
  },
  {
    surah_number: 56,
    why_this_surah: "Divides all of humanity into three groups: those brought near to God, those on the right hand, and those on the left. Then it describes what each group receives. If you want to know the Quran's clearest picture of what the afterlife looks like — both the reward and the consequence — this surah paints it in detail.",
  },
  {
    surah_number: 57,
    why_this_surah: "Asks a question that stops you: 'Has the time not come for those who believe that their hearts should be humbled by the remembrance of God?' If you've been Muslim for years and your heart has grown hard, if the prayers feel automatic and the Quran doesn't move you like it used to — this ayah was revealed for exactly that moment.",
  },
  {
    surah_number: 58,
    why_this_surah: "A woman came to the Prophet ﷺ to complain about her husband. God heard her from above seven heavens and revealed this surah in response. A private family dispute became revelation. The surah teaches that no injustice is too small for God to address — and that He hears even when no one else will listen.",
  },
  {
    surah_number: 59,
    why_this_surah: "The last three ayahs of this surah contain more names of God packed together than almost anywhere else in the Quran — the Sovereign, the Holy, the Source of Peace, the Guardian, the Compeller, the Supreme. If you want to understand who God says He is, in His own words, read the end of this surah slowly.",
  },
  {
    surah_number: 60,
    why_this_surah: "Is it possible to be kind to someone whose beliefs you disagree with? This surah draws the line: God doesn't forbid you from being good and just to people who haven't fought you — He only forbids loyalty to those who actively drive you from your home. A surah about boundaries that are firm without being cruel.",
  },
]

async function main() {
  let success = 0, failed = 0
  for (const r of rewrites) {
    const { error } = await supabase
      .from('surah_visual_data')
      .update({ why_this_surah: r.why_this_surah, updated_at: new Date().toISOString() })
      .eq('surah_number', r.surah_number)
    if (error) { console.error(`✗ ${r.surah_number}: ${error.message}`); failed++ }
    else { console.log(`✓ ${r.surah_number}`); success++ }
  }
  console.log(`\n${success} updated, ${failed} failed`)
}
main()
