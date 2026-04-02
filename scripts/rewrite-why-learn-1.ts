/**
 * Rewrite why_this_surah for surahs 1-20
 * Voice: invitation to a simple person. Lead with lived experience, not scholarship.
 * Run: npx tsx scripts/rewrite-why-learn-1.ts
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
    surah_number: 1,
    why_this_surah: "You already recite this surah in every prayer — but have you ever stopped to hear what you're actually saying? Seven lines where you speak directly to God, and He answers you back, line by line. Learning Al-Fatiha turns your salah from routine into conversation.",
  },
  {
    surah_number: 2,
    why_this_surah: "The Quran's longest surah covers almost everything — money, marriage, fasting, fighting, debt, divorce, charity, prayer direction, and the story of how humans keep getting the same test and failing it the same way. If you want to understand what Islam actually asks of you in daily life, most of the answers start here.",
  },
  {
    surah_number: 3,
    why_this_surah: "When you're tested — when things fall apart after you thought you were doing everything right — this surah speaks to that. It was revealed after the Muslims lost the Battle of Uhud, and it processes the hardest spiritual question: why do bad things happen to people who are trying to be good?",
  },
  {
    surah_number: 4,
    why_this_surah: "If you've ever wondered what Islam actually says about the rights of women, orphans, and inheritance, this is the primary source. Revealed when the early Muslim community was full of widows and fatherless children after battle, it lays out who is owed what — and why justice inside the family is where faith gets real.",
  },
  {
    surah_number: 5,
    why_this_surah: "The last major surah revealed — God's final word on how to live. It contains the verse where God declares the religion complete. If you want to understand what the Quran considers the final, settled version of its rules on food, justice, and dealing with people of other faiths, this is where to look.",
  },
  {
    surah_number: 6,
    why_this_surah: "Have you ever argued with someone about whether God exists — or argued with yourself? This surah is the Quran's purest case for one God, made entirely through questions: who created the heavens? Who splits the seed? Who brings the living from the dead? No laws, no community rules — just the question of why anything exists at all.",
  },
  {
    surah_number: 7,
    why_this_surah: "The longest account of human history in the Quran — from Adam's creation through seven civilizations that all received a messenger and all had to choose. If you want to understand the pattern the Quran sees in history (a prophet comes, most people reject, consequences follow), this surah lays it out in full.",
  },
  {
    surah_number: 8,
    why_this_surah: "What does it feel like when you're outnumbered, under-resourced, and God asks you to show up anyway? This surah processes the first real battle the Muslims fought — 313 against over 1,000 — and what it means when help comes from somewhere you didn't expect. A surah about courage when the odds are impossible.",
  },
  {
    surah_number: 9,
    why_this_surah: "The only surah that starts without 'In the name of God, the Most Merciful' — because what follows is a reckoning. It separates those who showed up from those who made excuses, those who fought from those who stayed behind. If you've ever wrestled with hypocrisy — your own or others' — this surah holds up the mirror.",
  },
  {
    surah_number: 10,
    why_this_surah: "What if you're not sure? What if you've heard the message but you're still weighing it? This surah speaks directly to the person on the fence — the one who wants proof, who wonders if the Quran is real, who needs to see evidence before committing. It meets doubt where doubt actually lives.",
  },
  {
    surah_number: 11,
    why_this_surah: "Seven prophets told their people the truth, and seven peoples refused. This surah is the Quran's most concentrated study in what happens when a community rejects its messenger — told not to frighten you, but to steady you. Staying faithful when no one around you cares is the hardest thing. This surah says: you're not the first.",
  },
  {
    surah_number: 12,
    why_this_surah: "The Quran calls it 'the best of stories.' A boy thrown into a well by his own brothers grows up to save the people who abandoned him. If you've ever been betrayed by someone close and wondered whether patience could possibly be worth it, this is the surah that answers that question — beginning to end, in one unbroken narrative.",
  },
  {
    surah_number: 13,
    why_this_surah: "Do you ever feel unsettled — restless in a way you can't explain? This surah names the cure in one line: 'In the remembrance of God do hearts find rest.' But it earns that line by first walking you through everything in creation that already points to God — thunder, rain, rivers, the earth itself — as if to say: the peace you're looking for is already everywhere.",
  },
  {
    surah_number: 14,
    why_this_surah: "A father leaves his wife and infant son in an empty desert valley with nothing but trust in God. That father is Ibrahim, and his prayer from that moment lives in this surah. It also draws the image of faith as a tree — roots deep, branches reaching the sky — versus corruption as a tree ripped from the ground with nothing to hold it. Which tree are you growing?",
  },
  {
    surah_number: 15,
    why_this_surah: "If you've ever worried about whether the Quran has been preserved accurately, this surah contains the verse Muslims point to: 'We sent down the reminder, and We will guard it.' It also contains the most detailed conversation between God and Iblis — the enemy's own strategy, laid out in his own words, so you can see it coming.",
  },
  {
    surah_number: 16,
    why_this_surah: "Sometimes you forget how much you've been given. This surah won't let you. It catalogs God's gifts — animals that carry you, seas that feed you, rain that grows your food, the night that lets you rest, the stars that guide you — one after another, relentlessly, until the question isn't whether God exists but whether you've ever actually said thank you.",
  },
  {
    surah_number: 17,
    why_this_surah: "Contains a set of commandments — be good to your parents, don't waste money, don't kill, don't walk arrogantly — that read like a practical manual for being a decent human being. The surah opens with the Prophet's miraculous night journey from Makkah to Jerusalem, then grounds itself in the ethics of everyday life. The extraordinary and the ordinary, in one surah.",
  },
  {
    surah_number: 18,
    why_this_surah: "Muslims read this surah every Friday — and the reason becomes clear when you see what it covers: the four tests every person faces. Faith under pressure, wealth, knowledge, and power. Four stories, four trials, one question at the center: what do you do when the thing you rely on most could pull you away from God?",
  },
  {
    surah_number: 19,
    why_this_surah: "A young woman gives birth alone under a palm tree. An old man begs God for a child he thought he'd never have. A son pleads with his father to stop worshipping idols. This surah is the Quran at its most emotionally raw — the moments where faith costs you something personal, and God meets you in the vulnerability.",
  },
  {
    surah_number: 20,
    why_this_surah: "The most detailed telling of Musa's story in the Quran — from the burning bush where God first speaks to him, through confronting Pharaoh, to the parting of the sea. If you've ever been asked to do something terrifying and felt completely unequipped for it, Musa's story in this surah is for you. He stuttered. He was afraid. God sent him anyway.",
  },
]

async function main() {
  let success = 0
  let failed = 0

  for (const r of rewrites) {
    const { error } = await supabase
      .from('surah_visual_data')
      .update({
        why_this_surah: r.why_this_surah,
        updated_at: new Date().toISOString(),
      })
      .eq('surah_number', r.surah_number)

    if (error) {
      console.error(`✗ ${r.surah_number}: ${error.message}`)
      failed++
    } else {
      console.log(`✓ ${r.surah_number}`)
      success++
    }
  }

  console.log(`\n${success} updated, ${failed} failed`)
}

main()
