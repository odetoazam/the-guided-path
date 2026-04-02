/**
 * Batch 2: Overhaul surahs 93-102
 * Run: npx tsx scripts/batch-visual-overhaul-2.ts
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
  // ── 93: Ad-Duha (11 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 93,
    why_this_surah: "Revealed after a painful gap when revelation stopped and Quraysh mocked the Prophet ﷺ, saying his Lord had abandoned him. Then this surah came: 'Your Lord has not forsaken you, nor is He displeased.' Muslims recite it in moments of spiritual darkness — when God feels distant.",
    thesis: "Three movements: consolation (your Lord has not left), evidence (look at what He already gave you — orphan, lost, poor, and He sheltered, guided, enriched), then three commands that mirror the three gifts. The surah is a conversation between a servant who fears abandonment and a Lord who answers with receipts.",
    tabs: [
      { id: "journey", label: "The Conversation", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 94: Ash-Sharh (8 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 94,
    why_this_surah: "Paired with Ad-Duha so closely that some scholars recite them as a single unit in prayer. Contains the promise stated twice — 'Indeed, with hardship comes ease' — a repetition the scholars say means two eases for every one hardship. Eight ayahs of direct divine reassurance.",
    thesis: "Eight ayahs, three rhetorical questions ('Did We not expand your chest? Remove your burden? Raise your reputation?'), then the doubled promise of ease, then two commands: when you finish, stand up; and to your Lord, turn. The structure moves from what God already did to what the servant must now do.",
    tabs: [
      { id: "ring", label: "The Mirror", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 95: At-Tin (8 ayahs) ─────────────────────────────────────────────────
  {
    surah_number: 95,
    why_this_surah: "Opens with oaths by four sacred sites — the fig (Damascus or Palestine), the olive (Jerusalem), Mount Sinai (where Musa received the Torah), and Makkah — mapping the geography of revelation. Then declares the human being created in the best form, then reduced to the lowest of the low. Except those who believe.",
    thesis: "Eight ayahs trace an arc from creation to decline to exception. Four oaths establish divine authority, then the verdict: humans made in the finest mold and returned to the lowest — except those who hold faith and act. The closing question — 'Is God not the most just of judges?' — hangs with no recorded answer.",
    tabs: [
      { id: "journey", label: "The Arc", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 96: Al-'Alaq (19 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 96,
    why_this_surah: "The first five ayahs revealed to the Prophet ﷺ in the Cave of Hira — 'Read, in the name of your Lord who created.' The word iqra' started 23 years of revelation. The rest of the surah came later, addressing the man (Abu Jahl) who tried to stop the Prophet from praying at the Ka'ba.",
    thesis: "Two revelations in one surah: the first five ayahs — the beginning of everything, God teaching by the pen — then ayahs 6-19, a warning to the one who forbids a servant from praying. The surah that opened the Quran to the world closes with the command: prostrate, and draw near.",
    tabs: [
      { id: "journey", label: "Two Revelations", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 97: Al-Qadr (5 ayahs) ───────────────────────────────────────────────
  {
    surah_number: 97,
    why_this_surah: "The Night of Decree — the night the Quran first descended, better than a thousand months of worship. Muslims seek it in the odd nights of the last ten days of Ramadan. The Prophet ﷺ would intensify his worship in these nights, and this surah explains why: angels and the Spirit descend with every decree until dawn.",
    thesis: "Five ayahs that open a window onto a single night: the Quran descended in it, it surpasses a thousand months, angels descend in it with every matter, and it is peace until the rising of dawn. The surah names the night three times — Laylat al-Qadr — as if the name itself is the point.",
    tabs: [
      { id: "layers", label: "The Unveiling", diagramKey: "deductiveFunnel", renderer: "funnel" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 98: Al-Bayyina (8 ayahs) ─────────────────────────────────────────────
  {
    surah_number: 98,
    why_this_surah: "The surah of the Clear Evidence — al-bayyina — which the scholars identify as the Prophet ﷺ himself. Those who received earlier scripture could not agree until the evidence arrived. Eight ayahs that trace what happens when proof meets a community: some accept, some divide, and the outcome splits into the worst and the best of creation.",
    thesis: "Eight ayahs map a single sequence: the People of the Book waited for the evidence, the evidence came (a messenger, purified scriptures, upright books), and they divided. Then the surah distills all of religion into one sentence — worship God sincerely, pray, give zakah — and closes with the final sorting: the worst of creation and the best.",
    tabs: [
      { id: "journey", label: "The Case", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 99: Az-Zalzalah (8 ayahs) ────────────────────────────────────────────
  {
    surah_number: 99,
    why_this_surah: "The surah of absolute accountability. The Prophet ﷺ called its final two ayahs 'the comprehensive, the comprehensive' — 'whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.' Nothing escapes the ledger. Muslims recite it to remember that the smallest act is recorded.",
    thesis: "Eight ayahs in three acts: the earth shakes and expels its burdens, then the earth speaks — bearing witness to what was done upon it — then humanity emerges in scattered groups to see their deeds. The surah ends at the atom: the smallest possible unit of moral weight, visible on the scales.",
    tabs: [
      { id: "journey", label: "The Ledger", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 100: Al-Adiyat (11 ayahs) ────────────────────────────────────────────
  {
    surah_number: 100,
    why_this_surah: "Opens with the sound of war horses charging at dawn — breath panting, hooves striking fire, dust rising in clouds. Then the surah pivots: is the human being grateful to his Lord? The horse gives everything in the charge; the human hoards. The contrast between the animal's total commitment and human ingratitude is the surah's engine.",
    thesis: "Eleven ayahs split by a pivot: five oaths by the charging horse (panting, sparking, raiding, dust, center of the enemy), then the indictment — the human being is ungrateful, witnesses against himself, and loves wealth fiercely. The horse mirrors what faithfulness looks like; the human falls short.",
    tabs: [
      { id: "journey", label: "The Charge", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 101: Al-Qari'ah (11 ayahs) ───────────────────────────────────────────
  {
    surah_number: 101,
    why_this_surah: "One of the Quran's names for the Day of Judgment — al-Qāri'ah, the Striking Hour, the calamity that knocks. The surah asks its own name as a question ('What is the Striking Hour?'), then answers with images: people like scattered moths, mountains like carded wool. Then the scales — heavy or light — and a mother who receives you or a pit that swallows.",
    thesis: "Eleven ayahs descend from the cosmic to the personal: a name repeated three times, two images of dissolution (moths, wool), then the scales. Heavy scales — satisfaction. Light scales — hāwiya, the abyss, described only as 'a blazing fire.' The surah names the destination but spares no detail on the journey there.",
    tabs: [
      { id: "journey", label: "The Descent", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 102: At-Takathur (8 ayahs) ───────────────────────────────────────────
  {
    surah_number: 102,
    why_this_surah: "The Prophet ﷺ said: 'If the son of Adam had a valley of gold, he would want a second, and nothing fills his mouth except dust.' This surah diagnoses that condition — al-takāthur, the competition to accumulate more. 'It has distracted you until you visit the graves.' Eight ayahs that name the disease of the age.",
    thesis: "Eight ayahs structured as a divine intervention: the diagnosis (you are distracted by accumulation), the warning (you will know — repeated with escalating certainty), and the promise of accountability (you will be asked about every blessing). The word kallā — 'no, stop' — appears twice, each time breaking the reader's momentum.",
    tabs: [
      { id: "journey", label: "The Intervention", diagramKey: "sectionJourney", renderer: "journey" },
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
