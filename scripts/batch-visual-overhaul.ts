/**
 * Batch overhaul of surah visual data: add why_this_surah, reduce tabs, fix thesis voice.
 * Run: npx tsx scripts/batch-visual-overhaul.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface SurahOverhaul {
  surah_number: number
  why_this_surah: string
  thesis: string
  tabs: Array<{ id: string; label: string; diagramKey?: string; renderer: string }>
}

const overhauls: SurahOverhaul[] = [
  // ── 103: Al-'Asr (3 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 103,
    why_this_surah: "Imam al-Shafi'i reportedly said that if God had revealed only this surah, it would suffice as guidance for humanity. Three ayahs — an oath by time, a verdict on all of mankind, and a single exit with four conditions. Muslims often recite it when parting from one another.",
    thesis: "An oath by time, a universal verdict of loss, and one compound exception with four conditions joined by 'and' — remove any one and the equation returns to loss. Three ayahs that compress the entire ethical framework of the Quran.",
    tabs: [
      { id: "funnel", label: "The Syllogism", diagramKey: "deductiveFunnel", renderer: "funnel" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 104: Al-Humaza (9 ayahs) ─────────────────────────────────────────────
  {
    surah_number: 104,
    why_this_surah: "The Quran's anatomy of what wealth does to a person who confuses having with being. The Prophet ﷺ warned that backbiting is worse than adultery — this surah shows why: it reduces a human being to what they own and others to what they lack.",
    thesis: "Nine ayahs trace a single arc: the slanderer who hoards, the fire that finds him, the vault that seals shut. The surah names the disease, shows its internal logic, and delivers the sentence — all in the time it takes to recite a paragraph.",
    tabs: [
      { id: "courtroom", label: "The Courtroom", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 105: Al-Fil (5 ayahs) ────────────────────────────────────────────────
  {
    surah_number: 105,
    why_this_surah: "The Year of the Elephant — the year the Prophet ﷺ was born. God protected the Ka'ba from Abraha's army with birds carrying stones of baked clay. Five ayahs that ask one question and then answer it, establishing that God defends His house on His own terms.",
    thesis: "Five ayahs, one question, one answer. 'Have you not seen what your Lord did?' — then the sequence: army arrives, birds dispatched, army reduced to eaten straw. The surah moves from the largest military force Arabia had seen to something a wind could scatter.",
    tabs: [
      { id: "journey", label: "The Sequence", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 106: Quraysh (4 ayahs) ───────────────────────────────────────────────
  {
    surah_number: 106,
    why_this_surah: "Paired with Al-Fil so closely that some early scholars read them as one surah. Al-Fil shows what God did; Quraysh shows what God asks in return. Four ayahs — the cause and the consequence. One request: worship the Lord of this House who feeds you and keeps you safe.",
    thesis: "The shortest causal argument in the Quran: because He gave you the winter and summer caravans, because He feeds you against hunger and secures you against fear — worship Him. Four ayahs, one 'because,' one 'therefore.'",
    tabs: [
      { id: "argument", label: "The Argument", diagramKey: "causalChain", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 107: Al-Ma'un (7 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 107,
    why_this_surah: "The surah that connects prayer to the smallest acts of human decency. The Prophet ﷺ placed neighborly kindness among the signs of faith — this surah asks whether your salah has changed how you treat the orphan, the hungry, the person who needs to borrow a dish.",
    thesis: "Seven ayahs split into a mirror: three on the one who denies religion (pushes the orphan, ignores the hungry), then three on the one who prays (heedless of their prayer, performing for show, withholding small kindnesses). The mirror forces a question: which side are you on?",
    tabs: [
      { id: "mirror", label: "The Mirror", diagramKey: "ringStructure", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 108: Al-Kawthar (3 ayahs) ────────────────────────────────────────────
  {
    surah_number: 108,
    why_this_surah: "The shortest surah in the Quran — three ayahs, ten Arabic words. Revealed when the Prophet ﷺ was mocked for having no surviving male heir. God's response: We have given you abundance. Pray and sacrifice. The one who hates you — he is the one cut off.",
    thesis: "Ten words answer a taunt with a cosmic reversal. The mocker called the Prophet cut off; the surah makes the mocker the one who is severed. The word al-kawthar — abundance — appears nowhere else in the Quran, coined for this single promise.",
    tabs: [
      { id: "funnel", label: "Ten Words", diagramKey: "deductiveFunnel", renderer: "funnel" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 109: Al-Kafirun (6 ayahs) ────────────────────────────────────────────
  {
    surah_number: 109,
    why_this_surah: "The Prophet ﷺ recited it in the first raka'ah of the sunnah before Fajr and in the first raka'ah of witr. A declaration of religious clarity spoken every day — six ayahs that draw a clean line between two ways of living without hostility.",
    thesis: "Six ayahs built on a refrain: lā a'budu mā ta'budūn. The denial repeats across past, present, and future tense — 'I do not worship what you worship, you do not worship what I worship' — until the line between the two positions becomes absolute. The final ayah seals it: lakum dīnukum wa liya dīn.",
    tabs: [
      { id: "mirror", label: "The Refrain", diagramKey: "mirrorStructure", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 110: An-Nasr (3 ayahs) ───────────────────────────────────────────────
  {
    surah_number: 110,
    why_this_surah: "The last complete surah revealed. Ibn Abbas understood it as God informing the Prophet ﷺ that his mission was nearing completion — a farewell framed as a victory announcement. Three ayahs: when victory comes, when people enter Islam in waves, then glorify your Lord and seek forgiveness.",
    thesis: "Three ayahs move from the public to the private: victory arrives, crowds enter the faith, and the Prophet is told to turn inward — glorify, seek forgiveness. The surah that announces the greatest success in prophetic history ends with an act of humility.",
    tabs: [
      { id: "funnel", label: "The Arc", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 111: Al-Masad (5 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 111,
    why_this_surah: "The only surah that names a contemporary of the Prophet ﷺ — Abu Lahab, 'Father of Flame.' His name becomes his sentence. When he stood on Safa and cursed the Prophet, this surah came down. Five ayahs that made the curse permanent and public, preserved for every generation to recite.",
    thesis: "Five ayahs where language does double work: tabbat yadā Abī Lahab — 'may the hands of the Father of Flame perish.' The name Abu Lahab, once a compliment about his radiant face, becomes a prophecy of the fire that awaits him. His wife carries firewood — fuel for a fire named after her husband.",
    tabs: [
      { id: "ring", label: "The Name", diagramKey: "ringStructure", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
]

async function main() {
  let success = 0
  let failed = 0

  for (const o of overhauls) {
    const { error } = await supabase
      .from('surah_visual_data')
      .update({
        why_this_surah: o.why_this_surah,
        thesis: o.thesis,
        tabs: o.tabs,
        updated_at: new Date().toISOString(),
      })
      .eq('surah_number', o.surah_number)

    if (error) {
      console.error(`✗ ${o.surah_number}: ${error.message}`)
      failed++
    } else {
      console.log(`✓ ${o.surah_number} updated (tabs: ${o.tabs.length})`)
      success++
    }
  }

  console.log(`\n${success} updated, ${failed} failed`)
}

main()
