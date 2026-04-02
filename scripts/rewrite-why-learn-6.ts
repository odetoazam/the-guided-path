/**
 * Rewrite why_this_surah for surahs 101-114
 * Run: npx tsx scripts/rewrite-why-learn-6.ts
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
    surah_number: 101,
    why_this_surah: "The Striking Hour — the name itself is a question. What is it? The surah answers with images: people scattered like moths, mountains dissolved like wool. Then the scales. Your deeds are weighed. If they're heavy, you're at peace. If they're light — the surah ends with a pit of fire described only as 'and what will make you know what it is?'",
  },
  {
    surah_number: 102,
    why_this_surah: "The competition to have more has distracted you — until you visit the graves. This surah names the condition of our age in its opening line. More money, more followers, more possessions, more status. The Quran says this distraction lasts until death. Eight ayahs that diagnose what most people spend their entire lives never questioning.",
  },
  {
    surah_number: 103,
    why_this_surah: "Three ayahs. One oath by time. One verdict: humanity is in loss. One exception: those who believe, do good, encourage truth, and encourage patience. Some scholars said this surah alone would be enough as guidance for all of humanity. If you learn nothing else, learn the four conditions that save a person from loss.",
  },
  {
    surah_number: 104,
    why_this_surah: "Do you talk about people behind their back? Do you count your money and think it will last forever? This surah is addressed to that person — the backbiter, the hoarder — and it tells them exactly where that road leads. Nine ayahs that make gossip and greed feel like what they are: a path to ruin.",
  },
  {
    surah_number: 105,
    why_this_surah: "An army with elephants marched on the Ka'ba to destroy it — and God sent birds carrying stones of baked clay that turned them into eaten straw. You don't need to understand the metaphysics. The point is simple: when God protects something, no army on earth can touch it. A surah about divine protection when human protection fails.",
  },
  {
    surah_number: 106,
    why_this_surah: "Quraysh had two things: a safe winter journey to Yemen and a safe summer journey to Syria. Their entire economy depended on those trade routes. This surah says: the God who made that possible — worship Him. He fed you when you were hungry and made you safe when you were afraid. Four ayahs about recognizing who your security actually comes from.",
  },
  {
    surah_number: 107,
    why_this_surah: "Do you know who really denies the Day of Judgment? The one who pushes away the orphan and doesn't encourage feeding the poor. This surah redefines disbelief — it's not just theology in your head, it's how you treat the most vulnerable people around you. It ends with people who pray but are heedless of their prayer. Faith without compassion is empty.",
  },
  {
    surah_number: 108,
    why_this_surah: "The shortest surah in the Quran — three ayahs. God gave you abundance, so pray and sacrifice. Your enemy is the one cut off, not you. Revealed when people mocked the Prophet ﷺ after his son died, calling him 'cut off' from legacy. The Quran's response: the mocker is forgotten. The Prophet's name is spoken five times a day across the earth.",
  },
  {
    surah_number: 109,
    why_this_surah: "I do not worship what you worship. You do not worship what I worship. To you your way, to me mine. Six ayahs that establish a permanent boundary: you can coexist without compromising. This surah is not about tolerance as weakness — it's about clarity. You know where you stand, and you let others stand where they choose.",
  },
  {
    surah_number: 110,
    why_this_surah: "When victory comes and you see people entering Islam in crowds — glorify your Lord and seek His forgiveness. The scholars say this was the surah that told the Prophet ﷺ his mission was complete and his time was near. Victory is not the moment to celebrate your success. It's the moment to humble yourself before the One who made it happen.",
  },
  {
    surah_number: 111,
    why_this_surah: "The only surah that names and condemns a specific individual — Abu Lahab, the Prophet's own uncle, who dedicated his life to fighting Islam. His wealth did not save him. His wife carried thorns to throw in the Prophet's path. A surah that stands as permanent proof: family connection means nothing without faith, and opposition to truth has an end.",
  },
  {
    surah_number: 112,
    why_this_surah: "Who is God? This surah answers in four lines: God is one. God is eternal and absolute. He was not born and does not give birth. Nothing is comparable to Him. The Prophet ﷺ said reciting it equals a third of the Quran. If someone asks you what you believe about God, this surah is the complete answer.",
  },
  {
    surah_number: 113,
    why_this_surah: "You can't see every threat. Darkness falls, envy works in silence, and harm comes from places you didn't expect. This surah teaches you to seek refuge in God from the things you cannot protect yourself against — the evil in creation, the darkness when it settles, and the envy of those who envy. Five ayahs you say every morning and every night.",
  },
  {
    surah_number: 114,
    why_this_surah: "The last surah of the Quran — and it ends with a warning about the one enemy you carry with you everywhere: the whisper. It retreats when you remember God and returns when you forget. This surah teaches you to ask God for protection from the voice inside that pulls you away from what you know is right. The final lesson the Quran chose to leave you with.",
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
