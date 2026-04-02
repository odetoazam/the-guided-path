/**
 * Rewrite why_this_surah for surahs 81-100
 * Run: npx tsx scripts/rewrite-why-learn-5.ts
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
    surah_number: 81,
    why_this_surah: "When the sun is wrapped up, when the stars fall, when the mountains move, when the pregnant camels are abandoned — the surah stacks image after image of the world ending, then stops and asks: so where are you going? Twelve cosmic events, then one personal question. A surah that makes the Day of Judgment feel like it's already happening.",
  },
  {
    surah_number: 82,
    why_this_surah: "When the sky breaks apart — and it will — every soul will know what it sent ahead and what it left behind. This surah is short and sharp: it takes apart the world you know (sky, stars, seas, graves) and asks what made you careless about your Lord, who created you, shaped you, and proportioned you in whatever form He willed.",
  },
  {
    surah_number: 83,
    why_this_surah: "Do you give full measure? When you buy, do you demand your rights, and when you sell, do you shortchange others? This surah starts with marketplace cheating and ends with the Day of Judgment — because the Quran sees a straight line between how you handle small transactions and how your record reads on the final day.",
  },
  {
    surah_number: 84,
    why_this_surah: "The sky will split open and obey its Lord — as it must. The earth will flatten and throw out everything inside it — as it must. Then: you too are moving toward your Lord, stage by stage, and you will meet Him. A surah about the fact that everything in creation submits to what's coming, whether it wants to or not — including you.",
  },
  {
    surah_number: 85,
    why_this_surah: "Tells the story of believers thrown into a burning trench for their faith — and the people who sat and watched. A surah about persecution and the courage it takes to hold onto belief when the cost is your life. It also carries one of the most reassuring verses: God's forgiveness and love are real, and He does what He intends.",
  },
  {
    surah_number: 86,
    why_this_surah: "A star that knocks in the night sky, a human created from a fluid that gushes — and a Quran that is a decisive word, no joke. Six ayahs in the middle remind you where you came from, physically. The surah strips away every pretension: you were fluid, you will return to the earth, and God can bring you back as easily as rain falls.",
  },
  {
    surah_number: 87,
    why_this_surah: "The Prophet ﷺ recited this surah regularly in the Eid prayers and in Jumu'ah. It tells you to glorify God, reminds you that the afterlife is better and longer-lasting, and connects back to the earliest scriptures of Ibrahim and Musa. A surah you hear on the most communal days of the Muslim year.",
  },
  {
    surah_number: 88,
    why_this_surah: "Has the news reached you — the news of the overwhelming event? Then faces on that day: some humiliated, some radiant. This surah divides the afterlife into two experiences with almost unbearable clarity, then turns to the camel, the sky, the mountains, and the earth and says: just look. The evidence is already in front of you.",
  },
  {
    surah_number: 89,
    why_this_surah: "When God tests a person with generosity, they say 'my Lord has honored me.' When He tests with restriction, they say 'my Lord has humiliated me.' This surah says: no — you're wrong both times. Honor and humiliation aren't about what you have. They're about what you do with it. A surah that redefines what it means to be blessed.",
  },
  {
    surah_number: 90,
    why_this_surah: "You live in this city — and the Quran swears by it. Then it asks: do you think no one has power over you? A surah about the steep path — freeing a slave, feeding on a day of hunger, then being among those who encourage patience and mercy. The Quran's definition of goodness, compressed into a climb.",
  },
  {
    surah_number: 91,
    why_this_surah: "Seven oaths — by the sun, the moon, the day, the night, the sky, the earth, and the soul — all building to one statement: God inspired the soul with its wickedness and its righteousness, and the one who purifies it succeeds. The longest oath sequence in the Quran, all to tell you that the battle is inside you.",
  },
  {
    surah_number: 92,
    why_this_surah: "Two kinds of people: one who gives, is mindful of God, and believes in goodness — God makes the path easy for them. One who withholds, thinks they're self-sufficient, and denies goodness — God makes the path hard. This surah sorts humanity by generosity and stinginess. Which one are you?",
  },
  {
    surah_number: 93,
    why_this_surah: "When you feel like God has forgotten you — when the prayers feel empty and the silence stretches on — this surah was revealed for that exact moment. The Prophet ﷺ went through a period when revelation stopped, and people mocked him. Then these eleven ayahs came: your Lord has not abandoned you. What comes next is better than what came before.",
  },
  {
    surah_number: 94,
    why_this_surah: "With hardship comes ease. The Quran says it twice in this surah — and scholars say the repetition is the point: for every single hardship, there are two eases. Eight ayahs of direct reassurance. If you are going through something difficult right now, this is the surah to read.",
  },
  {
    surah_number: 95,
    why_this_surah: "God created you in the best form — then returned you to the lowest of the low. Except those who believe and do good. Four sacred places, one verdict on human nature, and a question that closes the surah with no recorded answer: is God not the most just of judges? Eight ayahs that cover the entire human arc.",
  },
  {
    surah_number: 96,
    why_this_surah: "The first words of the Quran ever revealed: 'Read, in the name of your Lord who created.' Everything started here — in a cave, with a man who couldn't read, being told to read. If you want to know where Islam began as a lived experience, it began with these five ayahs and a trembling prophet on a mountain.",
  },
  {
    surah_number: 97,
    why_this_surah: "One night, better than a thousand months of worship. Muslims search for it every Ramadan in the last ten nights — praying, reciting, asking. This surah tells you what happens on that night: angels descend with every matter decreed, and it is peace until the dawn. Five ayahs that explain why millions stay awake every year.",
  },
  {
    surah_number: 98,
    why_this_surah: "The clear evidence came — a messenger with purified pages — and people still divided. This surah distills the entire religion into one sentence: worship God sincerely, pray, and give charity. That's it. Then it sorts humanity into two groups: the worst of creation and the best. Eight ayahs. No complexity. Just the choice.",
  },
  {
    surah_number: 99,
    why_this_surah: "The earth will shake. It will throw out everything buried inside it. And then you will see every single thing you ever did — down to an atom's weight of good, down to an atom's weight of evil. Nothing disappears. Nothing is too small to count. Eight ayahs that make you reconsider every small choice you made today.",
  },
  {
    surah_number: 100,
    why_this_surah: "War horses charge at dawn — breath panting, hooves striking sparks, plunging into the enemy without hesitation. Then the surah turns to you: the horse gives everything in the charge, and you? You hoard. You hold back. You love wealth with a fierce love. A surah that uses an animal's total commitment to shame human stinginess.",
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
