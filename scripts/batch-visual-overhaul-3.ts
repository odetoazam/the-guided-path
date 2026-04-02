/**
 * Batch 3: Overhaul surahs 78-92
 * Run: npx tsx scripts/batch-visual-overhaul-3.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const overhauls = [
  // ── 78: An-Naba (40 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 78,
    why_this_surah: "The surah that opens Juz 'Amma — the 30th part of the Quran, the part most Muslims memorize first. An-Naba begins with what people are arguing about — the Great News — and builds the case for resurrection through evidence from creation itself: the earth as a bed, mountains as pegs, the night as a cover.",
    thesis: "Forty ayahs structured as a prosecution: the question (what are they asking about?), the evidence (creation's design proves the Designer can resurrect), the scene (the Day arrives, the trumpet sounds, gates open), and the verdict. The surah that introduces the final juz sets the terms for everything that follows.",
    tabs: [
      { id: "prosecution", label: "The Prosecution", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 79: An-Naziat (46 ayahs) ─────────────────────────────────────────────
  {
    surah_number: 79,
    why_this_surah: "Opens with five oaths by angels performing their tasks — pulling souls, racing forward, administering affairs. Then pivots to the story of Musa and Fir'awn as a case study in what happens when a human being says 'I am your highest lord.' The surah that makes the afterlife feel as close as the next breath.",
    thesis: "Forty-six ayahs that move from the cosmic (angels at work) to the historical (Musa confronts Fir'awn) to the eschatological (the Hour arrives). The surah's closing question — 'You, what do you have to do with its timing?' — cuts off every attempt to postpone reckoning.",
    tabs: [
      { id: "journey", label: "The Cross-Exam", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 80: Abasa (42 ayahs) ─────────────────────────────────────────────────
  {
    surah_number: 80,
    why_this_surah: "The surah where God corrects His own Prophet ﷺ. A blind man came seeking guidance while the Prophet was speaking with Quraysh leaders. The Prophet frowned and turned away. This surah opens: 'He frowned and turned away because the blind man came to him.' No other scripture corrects its own messenger this directly.",
    thesis: "Forty-two ayahs in two halves: the correction (the blind man had more right to your attention than the powerful who feel self-sufficient), then the evidence for resurrection (look at your food, your rain, your crops — the One who grew all that can raise the dead). The surah links social blindness to spiritual blindness.",
    tabs: [
      { id: "journey", label: "The Correction", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 81: At-Takwir (29 ayahs) ─────────────────────────────────────────────
  {
    surah_number: 81,
    why_this_surah: "The Prophet ﷺ said: 'Whoever wants to see the Day of Judgment as though looking at it with his own eyes, let him recite idhā'sh-shamsu kuwwirat — when the sun is wrapped up.' Twelve cosmic events in twelve ayahs before a single question is asked. The most vivid portrait of the end in the entire Quran.",
    thesis: "Twenty-nine ayahs in a single arc: twelve 'when' clauses stacking cosmic dissolution (sun folded, stars scattered, mountains moved, seas boiled), then the question — what have you prepared? — then the oath by the dawn, the night, the breath, establishing that this Quran is the word of a noble messenger.",
    tabs: [
      { id: "journey", label: "The Unraveling", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 82: Al-Infitar (19 ayahs) ────────────────────────────────────────────
  {
    surah_number: 82,
    why_this_surah: "Companion surah to At-Takwir — both open with the cosmos splitting apart. But where At-Takwir asks 'what have you prepared?', Al-Infitar asks 'what has deceived you about your Lord, the Generous?' The root k-r-m (generosity) appears here as the reason for human heedlessness — God was too generous, and you mistook patience for permission.",
    thesis: "Nineteen ayahs: four cosmic fractures (sky splits, stars scatter, seas burst, graves overturned), then the pivot question — what deceived you about your Generous Lord? — then the recording angels, then the final sorting. The surah traces a line from cosmic collapse to personal accountability.",
    tabs: [
      { id: "journey", label: "The Fractures", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 83: Al-Mutaffifin (36 ayahs) ─────────────────────────────────────────
  {
    surah_number: 83,
    why_this_surah: "The only surah named after a sin: tatfīf — cheating in weights and measures. Giving less than what is owed while demanding the full amount for yourself. The Prophet ﷺ arrived in Madinah and found this practice widespread. This surah was among the first responses — making commercial fraud a cosmic crime.",
    thesis: "Thirty-six ayahs built on a scale metaphor: those who cheat the scales, the sealed register of the wicked (Sijjīn), then the sealed register of the righteous ('Illiyyīn), then the reversal — the righteous laugh at the disbelievers as the disbelievers once laughed at them. The cosmic scales correct the commercial ones.",
    tabs: [
      { id: "journey", label: "The Scales", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "ring", label: "The Mirror", diagramKey: "chiasticRing", renderer: "ring" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 84: Al-Inshiqaq (25 ayahs) ───────────────────────────────────────────
  {
    surah_number: 84,
    why_this_surah: "The third of the 'cosmic splitting' surahs (after At-Takwir and Al-Infitar). The sky splits and obeys its Lord — then humanity splits into two lines: those who receive their record in the right hand and those who receive it behind their back. The surah the Prophet ﷺ prostrated during while reciting in prayer.",
    thesis: "Twenty-five ayahs tracing the split: the sky cracks and submits, the earth flattens and empties, then humanity divides. Right-hand recipients return to their families in joy. Behind-the-back recipients call for destruction but receive fire. The oath at the end — by the twilight, the night, the full moon — seals it.",
    tabs: [
      { id: "journey", label: "The Split", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 85: Al-Buruj (22 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 85,
    why_this_surah: "The surah of the People of the Trench — believers burned alive for their faith while their persecutors watched from the edges. The Quran calls the persecutors 'cursed' but never says the believers died. The surah that teaches what faithfulness costs and what God thinks of those who pay that price.",
    thesis: "Twenty-two ayahs: an oath by the sky and the great stars, then the story of the trench — believers thrown into fire by those who hated them only for believing in God. Then the surah zooms out: God's throne encompasses everything, His grip is severe and His forgiveness is vast, and the Quran itself is preserved in a guarded tablet.",
    tabs: [
      { id: "journey", label: "The Witness", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 86: At-Tariq (17 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 86,
    why_this_surah: "The surah of the night-visitor — al-ṭāriq, the star that pierces through the darkness. The oath by the piercing star opens a meditation on origins: look at what the human being was created from (a fluid between the backbone and the ribs). The One who created you from that can bring you back. Seventeen ayahs from the cosmic to the embryonic.",
    thesis: "Seventeen ayahs that move through three scales: the cosmic (the piercing star, the guarded sky), the biological (human creation from fluid), and the eschatological (secrets exposed, no helper). The surah's argument — the God who tracks stars and grows embryos can certainly raise the dead — runs on the logic of scale.",
    tabs: [
      { id: "journey", label: "Three Scales", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 87: Al-A'la (19 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 87,
    why_this_surah: "The Prophet ﷺ recited it in the first raka'ah of Jumu'ah (Friday) prayer and in the 'Eid prayers. 'Glorify the name of your Lord, the Most High' — the surah whose opening command became the words Muslims say in every sujūd: subḥāna rabbiya'l-a'lā.",
    thesis: "Nineteen ayahs in three rooms: praise (glorify your Lord who created, proportioned, guided), revelation (We will make you recite and you will not forget), and warning (the one who purifies himself succeeds, the one who turns away fails — and this was in the scrolls of Ibrahim and Musa). The surah links daily prostration to the oldest scriptures.",
    tabs: [
      { id: "journey", label: "Three Rooms", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 88: Al-Ghashiya (26 ayahs) ───────────────────────────────────────────
  {
    surah_number: 88,
    why_this_surah: "The Prophet ﷺ recited it in the second raka'ah of Jumu'ah and 'Eid, paired with Al-A'la. 'Has there reached you the news of the Overwhelming?' — a single question that opens a surah of contrasts: faces humbled and faces radiant, labor that leads nowhere and labor that satisfies, fire and garden.",
    thesis: "Twenty-six ayahs built on contrast: two groups of faces (humbled in labor vs. radiant in satisfaction), then the evidence — look at the camel, the sky, the mountains, the earth — and the closing reminder: you are a reminder, not a controller. The surah pairs the preacher's Friday sermon with the creator's evidence.",
    tabs: [
      { id: "journey", label: "Two Faces", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 89: Al-Fajr (30 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 89,
    why_this_surah: "Opens with five oaths — the dawn, ten nights (scholars say the first ten of Dhul Hijjah, the most sacred days of the year), the even and the odd, the night as it passes. Then three destroyed civilizations: 'Ad, Thamud, Fir'awn. The surah closes with the soul at rest: 'Return to your Lord, pleased and pleasing.'",
    thesis: "Thirty ayahs: five oaths, three civilizations destroyed (each thinking they were permanent), then the human test — honored with wealth, he says 'my Lord has honored me'; tested with restriction, he says 'my Lord has humiliated me.' Both responses are wrong. The surah ends with the only correct response: the soul at peace, returning to its Lord.",
    tabs: [
      { id: "journey", label: "The Reckoning", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 90: Al-Balad (20 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 90,
    why_this_surah: "The surah of the steep path — al-'aqaba. God swears by Makkah and tells the human being: We created you in hardship. Then asks: has he attempted the steep path? And defines it — freeing a slave, feeding the hungry on a day of severe hunger, the orphan who is a relative, the destitute in the dust. The path to God runs through other people.",
    thesis: "Twenty ayahs: an oath by Makkah, a declaration that human life is struggle, then the challenge — have you attempted the steep path? The path is defined through six acts of material generosity (freeing, feeding, orphan care), then the closing split: companions of the right and companions of the left, fire sealed over them.",
    tabs: [
      { id: "journey", label: "The Steep Path", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 91: Ash-Shams (15 ayahs) ─────────────────────────────────────────────
  {
    surah_number: 91,
    why_this_surah: "The longest oath sequence in the Quran — eleven oaths before the verdict. By the sun, the moon, the day, the night, the sky, the earth, and the soul — the soul that God proportioned and then inspired with both its corruption and its consciousness. 'Successful is the one who purifies it.' Then the story of Thamud, who failed.",
    thesis: "Fifteen ayahs: eleven oaths building to a single point — he who purifies the soul succeeds, he who corrupts it fails. Then the proof: Thamud, who were warned, who denied, who hamstrung the she-camel, and whom God leveled. The surah uses the natural world as character witness for a moral verdict.",
    tabs: [
      { id: "journey", label: "The Courtroom", diagramKey: "sectionJourney", renderer: "journey" },
      { id: "absent", label: "Absences", diagramKey: "absenceMap", renderer: "absence" },
      { id: "text", label: "Text", renderer: "text" },
    ],
  },

  // ── 92: Al-Layl (21 ayahs) ──────────────────────────────────────────────
  {
    surah_number: 92,
    why_this_surah: "The surah of the fork in the road. Three oaths — the night, the day, the creation of male and female — then the verdict: your efforts are diverse, your paths diverge. One gives and is conscious of God; the other hoards and thinks himself self-sufficient. The surah maps the two trajectories to their endpoints.",
    thesis: "Twenty-one ayahs: three oaths, then two paths traced to their conclusions. The one who gives and is mindful — God eases his path to ease. The one who withholds and considers himself beyond need — God eases his path to hardship. The fire awaits one; the garden awaits the other. The surah asks: which ease are you being eased toward?",
    tabs: [
      { id: "journey", label: "The Fork", diagramKey: "sectionJourney", renderer: "journey" },
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
