/**
 * Batch 4a: Overhaul surahs 1-20 — add why_this_surah, reduce tabs
 * Run: npx tsx scripts/batch-visual-overhaul-4a.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const overhauls = [
  {
    surah_number: 1,
    why_this_surah: "The Prophet ﷺ called it the greatest surah in the Quran. Muslims recite it in every raka'ah of every prayer — the one piece of the Quran no salah can exist without. Seven ayahs that God Himself responds to, line by line, in a hadith qudsi: 'My servant praised Me... My servant glorified Me... This is between Me and My servant.'",
    tabs: [
      { id: "ring", label: "The Ring", diagramKey: "ringStructure", renderer: "ring" },
      { id: "journey", label: "The Journey", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 2,
    why_this_surah: "The longest surah in the Quran — 286 ayahs containing more legislation, more narrative, and more foundational theology than any other. The Prophet ﷺ said Shaytan flees from the house in which Al-Baqarah is recited. It contains Ayat al-Kursi (2:255), the greatest single ayah, and the last two ayahs the Prophet ﷺ said are sufficient for anyone who recites them at night.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 3,
    why_this_surah: "Named after the family of Maryam — Āl 'Imrān. Revealed partly in response to a Christian delegation from Najran who came to debate the Prophet ﷺ about the nature of Jesus. The surah pairs with Al-Baqarah — the Prophet ﷺ called them 'the two radiant ones' (al-zahrawān) that will shade their reader on the Day of Judgment.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 4,
    why_this_surah: "The surah of women's rights, orphan protection, and inheritance law — revealed in the aftermath of Uhud, when the Muslim community had to reckon with widows, orphans, and broken families. More legislation about justice within the family than any other surah. The Prophet ﷺ said: 'Learn the inheritance laws, for they are half of knowledge.'",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 5,
    why_this_surah: "The last major surah revealed — the capstone of Quranic legislation. Contains the verse 'Today I have perfected your religion for you' (5:3), revealed during the Farewell Pilgrimage. When 'Umar heard it, he wept, understanding that perfection means completion, and completion means the Prophet's ﷺ mission was nearing its end.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 6,
    why_this_surah: "Revealed in Makkah in a single sitting — all 165 ayahs at once, accompanied by 70,000 angels. The surah of tawḥīd in its purest Makkan form: no legislation, no community rules, only the case for one God made through creation, history, and the internal logic of worship itself.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 7,
    why_this_surah: "The longest Makkan surah — 206 ayahs tracing the human story from Adam's creation through seven civilizations. The surah the Prophet ﷺ recited in Maghrib prayer. Contains the most detailed account of the exchange between God and Iblis, and the only place in the Quran where God directly addresses all of humanity's souls before birth (7:172).",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 8,
    why_this_surah: "The surah of Badr — the first major battle of Islam, where 313 poorly equipped believers faced over 1,000 Qurayshi soldiers. Revealed to process the victory: who fought, who hesitated, how to divide the spoils, and the theological meaning of a victory that could only be explained by divine intervention.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 9,
    why_this_surah: "The only surah that begins without Bismillah — scholars say because it is a declaration of severance from the polytheists, and the Bismillah is a statement of mercy and safety. Contains the verse of repentance (9:118) and the command to be with the truthful (9:119). The last major surah revealed before the Prophet's ﷺ passing.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 10,
    why_this_surah: "Named after the Prophet Yunus, though his story occupies only a few ayahs. The surah's real subject is the Quran itself as proof — its challenge to produce anything like it, its self-description as guidance and healing, and the question posed to every generation: will you believe before the punishment comes, or after, when belief no longer helps?",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 11,
    why_this_surah: "The Prophet ﷺ said: 'Surah Hud and its sisters have turned my hair gray.' The surah that aged him — because of the command 'Be steadfast as you have been commanded' (11:112). Seven prophets, seven rejections, seven consequences. The Quran's most concentrated anthology of prophetic failure and divine response.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 12,
    why_this_surah: "The Quran calls it 'the best of stories' (aḥsan al-qaṣaṣ). The only surah that tells a single narrative from beginning to end — Yusuf's journey from a boy in a well to the vizier of Egypt. Revealed during the Year of Sadness, when the Prophet ﷺ lost both Khadijah and Abu Talib. A story of patience rewarded.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Weave", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 13,
    why_this_surah: "The surah of thunder — Ar-Ra'd. Thunder glorifies God with His praise, and so do the angels in awe of Him. The surah builds the case for God's power through what you can see (lightning, rain, crops) and what you cannot (angels recording, the earth being reshaped). 'Truly in the remembrance of God do hearts find rest' (13:28) lives here.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 14,
    why_this_surah: "Named after Ibrahim — and contains his prayer when he left his wife Hajar and infant son Isma'il in the barren valley of Makkah: 'Our Lord, I have settled some of my descendants in an uncultivated valley near Your Sacred House.' The surah pairs the tree of faith (rooted deep, branches reaching the sky) against the tree of corruption (uprooted, no stability).",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "Two Trees", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 15,
    why_this_surah: "Contains the divine declaration 'Indeed, it is We who sent down the reminder, and indeed, We will be its guardian' (15:9) — the verse Muslims cite for the preservation of the Quran. Also contains the most detailed dialogue between God and Iblis after the creation of Adam, where Iblis requests — and receives — a reprieve until the Day of Judgment.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 16,
    why_this_surah: "Called 'The Surah of Blessings' (surah al-ni'am) because it catalogs God's gifts to humanity — animals, seas, mountains, rivers, the night, the stars, the womb. One hundred and twenty-eight ayahs that build the case for gratitude through evidence so relentless that the surah itself asks: 'Will you still deny?'",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 17,
    why_this_surah: "Opens with the Night Journey — isrā' — when the Prophet ﷺ was taken from Makkah to Jerusalem in a single night. The surah that connects the two sacred mosques also contains seventeen commandments (17:22-39) that scholars compare to the Ten Commandments, covering monotheism, parents, orphans, spending, killing, and arrogance.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 18,
    why_this_surah: "The Prophet ﷺ said: 'Whoever recites Surah Al-Kahf on Friday, a light will shine for him between the two Fridays.' The surah of the four trials — faith under persecution, wealth, knowledge, power — with the Iblis verse at its structural center. The surah Muslims read every week, mapping the permanent tests of being human.",
    tabs: [
      { id: "sections", label: "The Four Trials", diagramKey: "sectionMap", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 19,
    why_this_surah: "Named after Maryam — the only woman named in the Quran. The surah the early Muslims recited to the Christian king of Abyssinia when they sought asylum, and he wept. Contains the birth of Isa, the birth of Yahya, Ibrahim's plea to his father, and the most tender portrait of prophetic vulnerability in the Quran.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },
  {
    surah_number: 20,
    why_this_surah: "The surah that converted 'Umar ibn al-Khattab — he heard his sister reciting it and was overwhelmed. Contains the most detailed account of Musa's story: the burning bush, the staff, Fir'awn's court, the parting of the sea. Tā-Hā — some scholars say it means 'O man,' a direct address to the Prophet ﷺ when the burden of revelation weighed heavily.",
    tabs: [
      { id: "sections", label: "Sections", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Ring", diagramKey: "chiasticRing", renderer: "ring" },
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
