/**
 * Rewrite why_this_surah for surahs 61-80
 * Run: npx tsx scripts/rewrite-why-learn-4.ts
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
    surah_number: 61,
    why_this_surah: "God loves those who stand in ranks for His cause as if they were a solid wall. This surah is about unity — and about the gap between what you say and what you do. It directly warns: why do you say what you do not do? If you've ever struggled to live up to your own words, this surah addresses that gap head-on.",
  },
  {
    surah_number: 62,
    why_this_surah: "The surah of Friday — Jumu'ah. It tells you why Friday prayer matters and what happens when commerce competes with worship. It also compares people who carry scripture but don't live by it to a donkey carrying books. A short surah with a sharp question: do you understand what you claim to carry?",
  },
  {
    surah_number: 63,
    why_this_surah: "What does hypocrisy look like from the outside? Polished words. Impressive appearances. This surah describes the hypocrites of Madinah — people who said all the right things and believed none of them. It ends with a warning about being so distracted by wealth and children that you forget God until it's too late.",
  },
  {
    surah_number: 64,
    why_this_surah: "Your wealth and your children are a test. This surah says it plainly. It also says: if you forgive, overlook, and pardon, God will forgive you. A surah about the things you love most becoming the things that pull you furthest from what matters — and how forgiveness is the way back.",
  },
  {
    surah_number: 65,
    why_this_surah: "The surah of divorce — but not just the legal mechanics. It frames divorce within God-consciousness: fear God at every step, count the waiting period carefully, don't drive women from their homes, and know that God will provide a way out for whoever is mindful of Him. Divorce treated as an act that still requires dignity.",
  },
  {
    surah_number: 66,
    why_this_surah: "Even the Prophet ﷺ had tensions in his household. This surah addresses a private moment between the Prophet and his wives, then elevates it into a universal lesson: protect yourselves and your families from a Fire whose fuel is people and stones. The most intimate relationships still answer to God.",
  },
  {
    surah_number: 67,
    why_this_surah: "Muslims recite this surah every night before sleep. The Prophet ﷺ said it intercedes for its reader until God forgives them. Thirty ayahs that open with God holding all sovereignty and close with a question you can't escape: if God took away your water, who would bring it back? A nightly reminder of who is actually in control.",
  },
  {
    surah_number: 68,
    why_this_surah: "Opens with the pen — the first instrument of knowledge. Then tells the story of garden owners who planned to harvest without sharing with the poor, and woke up to find everything destroyed. A surah about what happens when you hoard what God gave you and forget that provision comes with responsibility.",
  },
  {
    surah_number: 69,
    why_this_surah: "The inevitable reality — al-Ḥāqqah. The surah opens by naming it, then asks what it is, then shows you what it did to previous nations. Thamud destroyed by a single blast. 'Ad by a wind. Pharaoh's people by the flood. Then the books of deeds, handed right or left. A surah that eliminates the distance between you and the Day of Judgment.",
  },
  {
    surah_number: 70,
    why_this_surah: "Describes the human being as anxious by nature — when hardship touches him, he panics; when good comes, he withholds. Then it exempts the people of prayer from this diagnosis. If you recognize yourself in that description of anxiety and tightness, this surah says: prayer is the exit.",
  },
  {
    surah_number: 71,
    why_this_surah: "Nuh preached to his people for 950 years. They put their fingers in their ears. He called them in public and in private, at night and during the day. Nothing worked. This surah is the testimony of a prophet who gave everything and was rejected by nearly everyone. If you've ever tried to help someone who refused to listen, Nuh understands.",
  },
  {
    surah_number: 72,
    why_this_surah: "A group of jinn overheard the Quran and believed. They went back to their people and said: we have heard an amazing recitation — it guides to the right path, and we have believed in it. Beings you can't see recognized the truth before many humans did. A surah about the Quran's power reaching even where you wouldn't expect.",
  },
  {
    surah_number: 73,
    why_this_surah: "The first command after the start of revelation: stand up in the night and pray. Before any community was formed, before any law was given, before any battle was fought — the Prophet ﷺ was told to pray at night. This surah establishes that everything in Islam is built on a private relationship with God in the dark hours.",
  },
  {
    surah_number: 74,
    why_this_surah: "The second surah revealed — the moment the Prophet ﷺ was told to stop wrapping himself in his cloak and stand up to warn people. This is where the mission begins. It also contains a description of a man who heard the Quran, knew it was true, and chose to reject it anyway. A surah about the moment you can no longer hide.",
  },
  {
    surah_number: 75,
    why_this_surah: "You know yourself. This surah says it: 'The human being is a witness against himself, even if he throws out his excuses.' On the Day of Judgment, your limbs testify, your record is read — but even now, you already know. A surah about the self-awareness you spend most of your life trying to avoid.",
  },
  {
    surah_number: 76,
    why_this_surah: "There was a time when you were nothing — not even mentioned. This surah traces the human journey from nothing to a drop of fluid to a being with hearing and sight, then asks: will you be grateful or ungrateful? It contains one of the Quran's most beautiful descriptions of Paradise — silk, silver, shade, and a spring called Salsabil.",
  },
  {
    surah_number: 77,
    why_this_surah: "Ten times this surah repeats: 'Woe that Day to the deniers.' Ten times. After describing the winds, the creation of the earth, the mountains, and the fresh water God provides — each time the question returns: you were given all of this, and still you deny? A surah that builds its case through relentless repetition.",
  },
  {
    surah_number: 78,
    why_this_surah: "They're asking each other about it — the great news. This surah opens with people debating the resurrection, then answers them: look at how God made the earth, the mountains, the night, the day, the rain, the gardens. The one who built all of this can certainly build what comes next. A surah that settles the question of whether there's something after death.",
  },
  {
    surah_number: 79,
    why_this_surah: "Contains the most compressed telling of the Musa–Pharaoh confrontation in the Quran: just a few ayahs covering the whole story from 'Go to Pharaoh' to Pharaoh's drowning. Then it asks: are you harder to create, or the sky that God built? A surah that cuts to the point without ceremony.",
  },
  {
    surah_number: 80,
    why_this_surah: "The Prophet ﷺ frowned at a blind man who interrupted him while he was speaking to Quraysh leaders — and God corrected him in revelation that Muslims recite to this day. A surah that teaches you never to judge people by their status. The blind man might be the one who purifies himself. The rich man might be the one who walks away.",
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
