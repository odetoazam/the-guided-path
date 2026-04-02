/**
 * Rewrite why_this_surah for surahs 21-40
 * Voice: invitation to someone simple. Lead with lived experience.
 * Run: npx tsx scripts/rewrite-why-learn-2.ts
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
    surah_number: 21,
    why_this_surah: "A surah full of prophets — Ibrahim, Musa, Dawud, Sulayman, Ayyub, Yunus, Zakariyya — each facing a different kind of impossible. If you've ever wondered how people of faith handle moments when everything seems lost, this surah gives you story after story of people who called on God at their lowest and were answered.",
  },
  {
    surah_number: 22,
    why_this_surah: "If you've ever been on Hajj — or wondered what Hajj is really about — this surah is the primary source. It connects the pilgrimage back to Ibrahim building the Ka'ba, and frames it as something the entire earth participates in. It also contains some of the Quran's most vivid descriptions of the Day of Judgment.",
  },
  {
    surah_number: 23,
    why_this_surah: "Opens with a description of the believers who succeed — and the list is surprisingly practical: they guard their prayers, avoid idle talk, pay their charity, and are faithful to their commitments. If you want a clear picture of what the Quran considers a successful life, this surah defines it in the first eleven ayahs.",
  },
  {
    surah_number: 24,
    why_this_surah: "The surah of light — and also the surah of boundaries. It lays out rules about modesty, privacy, entering people's homes, and how a community should handle accusations of immorality. If you want to understand the Quran's vision of a society that protects people's dignity and reputation, this surah is the blueprint.",
  },
  {
    surah_number: 25,
    why_this_surah: "The surah that draws the sharpest line between truth and falsehood — Al-Furqan, 'the Criterion.' It also contains a portrait of the servants of the Most Merciful near the end — people who walk humbly, respond to ignorance with peace, pray at night, and spend in moderation. A description worth reading slowly.",
  },
  {
    surah_number: 26,
    why_this_surah: "Seven messengers, seven communities, and the same sentence repeated after each one: 'Your Lord is the Mighty, the Merciful.' The surah doesn't just tell you what happened — it shows you the same scene playing out across civilizations. The repetition is the point. Humanity keeps getting the same message and keeps making the same mistake.",
  },
  {
    surah_number: 27,
    why_this_surah: "Contains two of the Quran's most memorable scenes: Sulayman and the ant (an entire army halted for one small creature), and Sulayman and the Queen of Sheba (a woman leader who recognizes truth when she sees it). A surah about power used wisely and wisdom that comes from unexpected places.",
  },
  {
    surah_number: 28,
    why_this_surah: "The most detailed account of Musa's early life — before he became a prophet. A man who made a terrible mistake, fled his home, arrived in a foreign land with nothing, and was taken in by a stranger. If you've ever had to start over somewhere new after something went wrong, this surah shows that God was already arranging what comes next.",
  },
  {
    surah_number: 29,
    why_this_surah: "Opens with a direct question: 'Do people think they will be left alone because they say we believe, and not be tested?' If you've ever felt like your faith was being tested and wondered whether that was normal, this surah says yes — that's exactly how it works. Belief without testing is just a claim.",
  },
  {
    surah_number: 30,
    why_this_surah: "The surah that made a prediction. When the Romans lost to the Persians, the Quran said they would win again within a few years — and they did. But beyond the historical prophecy, this surah is about the idea that God turns things around. What looks like a permanent defeat can reverse. Circumstances change; God's plan doesn't.",
  },
  {
    surah_number: 31,
    why_this_surah: "Contains the advice of Luqman to his son — and it reads like the best parenting advice you've ever heard. Don't associate anything with God. Be grateful to your parents. Pray. Encourage good. Be patient with what happens. Don't walk arrogantly. Lower your voice. If you're a parent, or were ever someone's child, this surah speaks to you.",
  },
  {
    surah_number: 32,
    why_this_surah: "The Prophet ﷺ used to recite this surah every Friday at Fajr. It covers everything from the creation of the universe to the creation of the human being to the moment you stand before God. Short enough to read in one sitting, comprehensive enough to reshape how you think about why you exist.",
  },
  {
    surah_number: 33,
    why_this_surah: "When the entire city of Madinah was under siege — armies from every direction — this surah came. It tells you what faith looks like under real pressure, not theoretical pressure. It also contains the Quran's most direct instructions about the Prophet's household and the responsibilities that come with being part of a community that claims to believe.",
  },
  {
    surah_number: 34,
    why_this_surah: "The story of Saba' — an entire civilization that had everything (gardens, security, easy travel) and lost it all because they stopped being grateful. If you've ever taken a good thing for granted and only realized its value after it was gone, this surah is a warning about how blessings disappear when gratitude does.",
  },
  {
    surah_number: 35,
    why_this_surah: "Opens by naming God as the originator of the heavens and the earth, the one who made angels with two, three, and four wings. Then it asks: is there any creator other than God who provides for you? The surah builds the case for God through what He originates — and challenges you to find another explanation.",
  },
  {
    surah_number: 36,
    why_this_surah: "Muslims recite this surah more than almost any other — for the dying, at funerals, on Thursday nights. The Quran's core arguments compressed into eighty-three ayahs: a messenger rejected by his own town, the evidence written into creation, the certainty that death is not the end. If you learn one surah beyond Al-Fatiha, many scholars would point you here.",
  },
  {
    surah_number: 37,
    why_this_surah: "The surah that tells the story of Ibrahim being asked to sacrifice his son — the event behind Eid al-Adha. It also lines up the prophets one after another, each one affirmed with the phrase 'peace be upon him.' A surah about what it costs to obey God when obedience means giving up what you love most.",
  },
  {
    surah_number: 38,
    why_this_surah: "Dawud made a mistake and immediately fell into prostration and repented. Sulayman was given a kingdom and said 'forgive me.' This surah shows prophets who had power and wealth but never let it make them forget where it came from. If you've ever struggled with whether success and faith can coexist, the answer lives here.",
  },
  {
    surah_number: 39,
    why_this_surah: "Contains one of the most hopeful verses in the entire Quran: 'Say: O My servants who have transgressed against themselves — do not despair of the mercy of God. God forgives all sins.' If you've ever felt too far gone, too sinful, too broken to come back — this surah was revealed for you.",
  },
  {
    surah_number: 40,
    why_this_surah: "Inside Pharaoh's own court, one man stood up and said: 'Will you kill a man because he says My Lord is God?' A believer hiding his faith, speaking truth to the most powerful tyrant on earth. This surah is about the courage it takes to say the right thing in the wrong room.",
  },
]

async function main() {
  let success = 0
  let failed = 0

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
