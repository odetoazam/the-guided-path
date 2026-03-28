"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HAQQAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-haqqa
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Haqqah",
  arabicName: "الحاقَّة",
  meaning: "The Inevitable Reality",
  number: 69,
  ayahCount: 52,
  period: "Makki",
  juz: 29,
  movements: 5,
  thesis:
    "A surah that grabs you with a single word repeated three times, marches you past five ruined civilizations and one shattered cosmos, forces you to see yourself holding a book in either your right or your left hand, and then — having shown you everything — turns to the very words you are hearing and says: these, too, are real.",
  reflectionUrl: "/surahs/al-haqqa",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "يَوْمَئِذٍ تُعْرَضُونَ لَا تَخْفَىٰ مِنكُمْ خَافِيَةٌ",
    ayahRef: "69:18",
    translation: "On that Day you will be exposed — no secret of yours will remain hidden.",
    why: "The hinge between the cosmic and the personal. Before it, the surah deals in civilizations and landscapes. After it, the surah deals in individuals — one person's right hand, another's left hand. The universe was cleared away so that you could stand visible.",
  },

  audio: { surahNumber: 69, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الْحَاقَّةُ", translation: "The Inevitable Reality." },
    { ayah: 2, arabic: "مَا الْحَاقَّةُ", translation: "What is the Inevitable Reality?" },
    { ayah: 3, arabic: "وَمَا أَدْرَاكَ مَا الْحَاقَّةُ", translation: "And what can make you know what the Inevitable Reality is?" },
    { ayah: 4, arabic: "كَذَّبَتْ ثَمُودُ وَعَادٌ بِالْقَارِعَةِ", translation: "Thamud and Ad denied the Striking Calamity." },
    { ayah: 5, arabic: "فَأَمَّا ثَمُودُ فَأُهْلِكُوا بِالطَّاغِيَةِ", translation: "As for Thamud, they were destroyed by the overwhelming blast." },
    { ayah: 6, arabic: "وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ", translation: "And as for Ad, they were destroyed by a screaming, violent wind," },
    { ayah: 7, arabic: "سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا فَتَرَى الْقَوْمَ فِيهَا صَرْعَىٰ كَأَنَّهُمْ أَعْجَازُ نَخْلٍ خَاوِيَةٍ", translation: "which He imposed upon them for seven nights and eight days in succession — you would see the people fallen as if they were hollow trunks of palm trees." },
    { ayah: 8, arabic: "فَهَلْ تَرَىٰ لَهُم مِّن بَاقِيَةٍ", translation: "Do you see any remnant of them?" },
    { ayah: 9, arabic: "وَجَاءَ فِرْعَوْنُ وَمَن قَبْلَهُ وَالْمُؤْتَفِكَاتُ بِالْخَاطِئَةِ", translation: "And there came Pharaoh, and those before him, and the overturned cities — with sin." },
    { ayah: 10, arabic: "فَعَصَوْا رَسُولَ رَبِّهِمْ فَأَخَذَهُمْ أَخْذَةً رَّابِيَةً", translation: "They disobeyed the messenger of their Lord, so He seized them with a grip that kept tightening." },
    { ayah: 11, arabic: "إِنَّا لَمَّا طَغَا الْمَاءُ حَمَلْنَاكُمْ فِي الْجَارِيَةِ", translation: "Indeed, when the floodwaters overflowed, We carried you in the sailing vessel," },
    { ayah: 12, arabic: "لِنَجْعَلَهَا لَكُمْ تَذْكِرَةً وَتَعِيَهَا أُذُنٌ وَاعِيَةٌ", translation: "so that We might make it a reminder for you, and so that a retaining ear might retain it." },
    { ayah: 13, arabic: "فَإِذَا نُفِخَ فِي الصُّورِ نَفْخَةٌ وَاحِدَةٌ", translation: "Then when the trumpet is blown with a single blast," },
    { ayah: 14, arabic: "وَحُمِلَتِ الْأَرْضُ وَالْجِبَالُ فَدُكَّتَا دَكَّةً وَاحِدَةً", translation: "and the earth and the mountains are lifted and crushed with a single blow —" },
    { ayah: 15, arabic: "فَيَوْمَئِذٍ وَقَعَتِ الْوَاقِعَةُ", translation: "then on that Day, the Occurrence will occur." },
    { ayah: 16, arabic: "وَانشَقَّتِ السَّمَاءُ فَهِيَ يَوْمَئِذٍ وَاهِيَةٌ", translation: "And the sky will split apart, for on that Day it will be frail." },
    { ayah: 17, arabic: "وَالْمَلَكُ عَلَىٰ أَرْجَائِهَا ۚ وَيَحْمِلُ عَرْشَ رَبِّكَ فَوْقَهُمْ يَوْمَئِذٍ ثَمَانِيَةٌ", translation: "And the angels will be at its edges, and eight will bear the Throne of your Lord above them on that Day." },
    { ayah: 18, arabic: "يَوْمَئِذٍ تُعْرَضُونَ لَا تَخْفَىٰ مِنكُمْ خَافِيَةٌ", translation: "On that Day you will be exposed — no secret of yours will remain hidden." },
    { ayah: 19, arabic: "فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ فَيَقُولُ هَاؤُمُ اقْرَءُوا كِتَابِيَهْ", translation: "As for the one given their record in their right hand, they will say: 'Here, read my record!'" },
    { ayah: 20, arabic: "إِنِّي ظَنَنتُ أَنِّي مُلَاقٍ حِسَابِيَهْ", translation: "'I knew I would meet my account.'" },
    { ayah: 21, arabic: "فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ", translation: "So they will be in a pleasant life," },
    { ayah: 22, arabic: "فِي جَنَّةٍ عَالِيَةٍ", translation: "in a lofty garden," },
    { ayah: 23, arabic: "قُطُوفُهَا دَانِيَةٌ", translation: "its fruits hanging within reach." },
    { ayah: 24, arabic: "كُلُوا وَاشْرَبُوا هَنِيئًا بِمَا أَسْلَفْتُمْ فِي الْأَيَّامِ الْخَالِيَةِ", translation: "'Eat and drink in satisfaction for what you put forward in the days gone by.'" },
    { ayah: 25, arabic: "وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِشِمَالِهِ فَيَقُولُ يَا لَيْتَنِي لَمْ أُوتَ كِتَابِيَهْ", translation: "But as for the one given their record in their left hand, they will say: 'I wish I had never been given my record,'" },
    { ayah: 26, arabic: "وَلَمْ أَدْرِ مَا حِسَابِيَهْ", translation: "'and had never known what my account was.'" },
    { ayah: 27, arabic: "يَا لَيْتَهَا كَانَتِ الْقَاضِيَةَ", translation: "'I wish it had been the end.'" },
    { ayah: 28, arabic: "مَا أَغْنَىٰ عَنِّي مَالِيَهْ", translation: "'My wealth has not availed me.'" },
    { ayah: 29, arabic: "هَلَكَ عَنِّي سُلْطَانِيَهْ", translation: "'My authority has perished from me.'" },
    { ayah: 30, arabic: "خُذُوهُ فَغُلُّوهُ", translation: "'Seize him and shackle him,'" },
    { ayah: 31, arabic: "ثُمَّ الْجَحِيمَ صَلُّوهُ", translation: "'then drive him into Hellfire,'" },
    { ayah: 32, arabic: "ثُمَّ فِي سِلْسِلَةٍ ذَرْعُهَا سَبْعُونَ ذِرَاعًا فَاسْلُكُوهُ", translation: "'then insert him into a chain whose length is seventy cubits.'" },
    { ayah: 33, arabic: "إِنَّهُ كَانَ لَا يُؤْمِنُ بِاللَّهِ الْعَظِيمِ", translation: "Indeed, he did not believe in Allah, the Magnificent," },
    { ayah: 34, arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", translation: "and he did not encourage the feeding of the poor." },
    { ayah: 35, arabic: "فَلَيْسَ لَهُ الْيَوْمَ هَاهُنَا حَمِيمٌ", translation: "So he has no devoted friend here today," },
    { ayah: 36, arabic: "وَلَا طَعَامٌ إِلَّا مِنْ غِسْلِينٍ", translation: "and no food except from the discharge of wounds," },
    { ayah: 37, arabic: "لَّا يَأْكُلُهُ إِلَّا الْخَاطِئُونَ", translation: "which none eat except the sinners." },
    { ayah: 38, arabic: "فَلَا أُقْسِمُ بِمَا تُبْصِرُونَ", translation: "I swear by what you see" },
    { ayah: 39, arabic: "وَمَا لَا تُبْصِرُونَ", translation: "and what you do not see —" },
    { ayah: 40, arabic: "إِنَّهُ لَقَوْلُ رَسُولٍ كَرِيمٍ", translation: "it is the word of a noble messenger." },
    { ayah: 41, arabic: "وَمَا هُوَ بِقَوْلِ شَاعِرٍ ۚ قَلِيلًا مَّا تُؤْمِنُونَ", translation: "It is not the word of a poet — how little you believe!" },
    { ayah: 42, arabic: "وَلَا بِقَوْلِ كَاهِنٍ ۚ قَلِيلًا مَّا تَذَكَّرُونَ", translation: "And not the word of a soothsayer — how little you reflect!" },
    { ayah: 43, arabic: "تَنزِيلٌ مِّن رَّبِّ الْعَالَمِينَ", translation: "A revelation from the Lord of all worlds." },
    { ayah: 44, arabic: "وَلَوْ تَقَوَّلَ عَلَيْنَا بَعْضَ الْأَقَاوِيلِ", translation: "And if he had fabricated against Us some sayings," },
    { ayah: 45, arabic: "لَأَخَذْنَا مِنْهُ بِالْيَمِينِ", translation: "We would have seized him by the right hand," },
    { ayah: 46, arabic: "ثُمَّ لَقَطَعْنَا مِنْهُ الْوَتِينَ", translation: "then cut from him the aorta," },
    { ayah: 47, arabic: "فَمَا مِنكُم مِّنْ أَحَدٍ عَنْهُ حَاجِزِينَ", translation: "and none of you could have shielded him from it." },
    { ayah: 48, arabic: "وَإِنَّهُ لَتَذْكِرَةٌ لِّلْمُتَّقِينَ", translation: "And indeed, it is a reminder for the God-fearing." },
    { ayah: 49, arabic: "وَإِنَّا لَنَعْلَمُ أَنَّ مِنكُم مُّكَذِّبِينَ", translation: "And We know that among you are deniers." },
    { ayah: 50, arabic: "وَإِنَّهُ لَحَسْرَةٌ عَلَى الْكَافِرِينَ", translation: "And it will be a source of agonizing regret for the disbelievers." },
    { ayah: 51, arabic: "وَإِنَّهُ لَحَقُّ الْيَقِينِ", translation: "And indeed, it is the truth of certainty." },
    { ayah: 52, arabic: "فَسَبِّحْ بِاسْمِ رَبِّكَ الْعَظِيمِ", translation: "So glorify the name of your Lord, the Magnificent." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Verdict",
      subtitle: "Five movements: invocation \u2192 history \u2192 cosmos \u2192 two fates \u2192 testimony",
      sections: [
        { ayahs: "1\u20133", title: "The Triple Invocation", color: "#C9A84C", isPivot: true, desc: "Three ayahs, one word. The surah names the Inevitable Reality, asks what it is, then asks a deeper question: what could possibly make you know? The formula wa ma adraka signals something beyond human comprehension. The surah opens at the edge of what language can carry." },
        { ayahs: "4\u201312", title: "The Evidence from History", color: "#e07a8a", desc: "Five destroyed peoples in rapid succession. Thamud by the overwhelming blast. Ad by a screaming wind for seven nights and eight days, their bodies like hollow palm trunks. Pharaoh, the overturned cities, and the floodwaters of Nuh. Each one proof that the Haqqah has come before in smaller forms." },
        { ayahs: "13\u201318", title: "The Cosmic Scene", color: "#9b7fd4", desc: "A single blast on the trumpet. Earth and mountains crushed in one blow. The sky splits and becomes frail. Angels at its edges, eight bearing the Throne. Then the pivot: on that Day you will be exposed. The universe is cleared away so every soul stands visible." },
        { ayahs: "19\u201337", title: "The Two Fates", color: "#4ecdc4", desc: "The one given their record in the right hand: radiant, in a lofty garden, fruit within reach. The one given it in the left: three wishes descending into despair, wealth and power named and dismissed, seized and bound in a chain of seventy cubits. The reason: disbelief in Allah the Magnificent, and not encouraging the feeding of the poor." },
        { ayahs: "38\u201352", title: "The Quran\u2019s Testimony", color: "#e07a8a", desc: "The Quran places itself on trial. Sworn by all reality visible and invisible, it declares: this is the word of a noble messenger, not a poet, not a soothsayer. If the Prophet had fabricated even one saying, his aorta would be severed. The surah closes by returning haqq to its opening: this is haqq al-yaqin, the truth of certainty." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Al-Haqqah\u2019s opening and closing mirror each other around the two fates at the center",
      pairs: [
        {
          left: { label: "Al-Haqqah", ayahs: "1\u20133", desc: "The Inevitable Reality named three times \u2014 a word beyond comprehension" },
          right: { label: "Haqq al-Yaqin", ayahs: "48\u201352", desc: "The same root returns: the Quran is haqq al-yaqin, the truth of certainty \u2014 and the command to glorify Allah the Magnificent" },
          color: "#C9A84C",
        },
        {
          left: { label: "Historical Destructions", ayahs: "4\u201312", desc: "Five nations destroyed for rejecting their messengers \u2014 proof from the past" },
          right: { label: "Hypothetical Destruction", ayahs: "44\u201347", desc: "If the Prophet himself were false, he would be destroyed \u2014 proof from the present" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Day Arrives", ayahs: "13\u201318", desc: "The cosmic scene: trumpet, earth pulverized, sky torn, full exposure" },
          right: { label: "The Quran\u2019s Authority", ayahs: "38\u201343", desc: "Sworn by all reality, visible and invisible \u2014 a revelation from the Lord of all worlds" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Two Fates", ayahs: "19\u201337",
        desc: "Right hand: joy, a lofty garden, fruit within reach. Left hand: despair, a chain of seventy cubits, no friend and no food.",
        note: "Everything before this builds toward the moment of personal reckoning. Everything after argues that the instrument delivering it is trustworthy.",
      },
    },
    deductiveFunnel: {
      title: "The Autopsy of Despair",
      subtitle: "The condemned person\u2019s response peels back layer after layer",
      layers: [
        { depth: 1, label: "Reject the Record", ayah: "25", arabic: "يَا لَيْتَنِي لَمْ أُوتَ كِتَابِيَهْ", desc: "The first wish: I wish I had never been given my record. The evidence itself is unbearable.", color: "#4ecdc4" },
        { depth: 2, label: "Reject the Knowledge", ayah: "26", arabic: "وَلَمْ أَدْرِ مَا حِسَابِيَهْ", desc: "The second wish: I wish I had never known what my account was. Consciousness of what was done becomes a torment of its own.", color: "#9b7fd4" },
        { depth: 3, label: "Reject Existence", ayah: "27", arabic: "يَا لَيْتَهَا كَانَتِ الْقَاضِيَةَ", desc: "The third wish: I wish death had been the end. The grammar of despair moves inward \u2014 from rejecting evidence, to rejecting consciousness, to rejecting existence itself.", color: "#e07a8a" },
        { depth: 4, label: "The Verdict", ayah: "28\u201329", arabic: "مَا أَغْنَىٰ عَنِّي مَالِيَهْ ۜ هَلَكَ عَنِّي سُلْطَانِيَهْ", desc: "Two things that defined this person\u2019s life \u2014 wealth and power \u2014 named and dismissed in two lines. Halaka: the same word used for the destroyed nations. The personal destruction echoes the historical one.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah declares \u2014 every absence sharpens the declaration",
      absences: [
        { item: "No moral commands", note: "No legislation. No \u2018O you who believe\u2019 followed by a directive. No prayer instructions, no fasting rules. The surah has one concern only: establishing what is real and what will happen because it is real." },
        { item: "No extended dialogue", note: "No back-and-forth between God and a prophet, no conversation between the righteous and the damned. The surah speaks in one direction. It declares." },
        { item: "No named prophets in their missions", note: "Prophets appear only as historical markers. Musa is not mentioned by name at all, Nuh barely so. The surah is not interested in the messenger\u2019s journey \u2014 only in what happened to people who refused the message." },
        { item: "No opportunity for persuasion", note: "The surah does not invite, does not reason toward a conclusion. It stands in front of you and names what is coming, shows historical proof, then forces you to see what it will look like." },
        { item: "No comfortable category", note: "The closing section strips away every label \u2014 poet, soothsayer \u2014 that the Quraysh invented to dismiss the Quran. The surah is its own evidence, and it refuses to be filed under anything other than revelation." },
      ],
    },
  },

  contentNodes: [
    { concept: "Haqq al-yaqin \u2014 the truth of certainty shared with Al-Waqi\u2019ah", type: "cross-surah", articleSlug: "haqq-al-yaqin-69-56" },
    { concept: "Hollow palm trunks \u2014 the image shared with Al-Qamar", type: "cross-surah", articleSlug: "hollow-palm-trunks-69-54" },
    { concept: "Yahuddu \u2014 not encouraging the feeding of the poor", type: "surah-specific", articleSlug: "yahuddu-feeding-poor-69-34" },
    { concept: "The severed aorta \u2014 the Quran placing itself under existential scrutiny", type: "surah-specific", articleSlug: "severed-aorta-69-46" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "courtroom", label: "Verdict" },
  { id: "mirror", label: "Ring" },
  { id: "autopsy", label: "Autopsy" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;

  const toggle = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  const seekTo = (clientX: number) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    seekTo(e.clientX);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "\u23F8" : "\u25B6"}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div
            ref={progressRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"
          >
            <div
              className="h-full rounded-full bg-gold-500 transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">
          {fmt(currentTime)}/{fmt(duration)}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget;
          setCurrentTime(t.currentTime);
          setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0);
        }}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
        {verse.arabic}
      </p>
      <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p>
      <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p>
    </div>
  );
}

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic}{" "}
            <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
          </p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
    </div>
  );
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>
              {pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span>
            </div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}>
              <span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}
            </div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">
          {"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
        </div>
        <p className="text-sm italic text-cream font-body">{data.center.desc}</p>
        <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p>
      </div>
    </div>
  );
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? layer.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: layer.color,
              marginLeft: `${layer.depth * 6}px`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>
              {layer.arabic}
            </p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Record \u2192 knowledge \u2192 existence \u2192 verdict
      </div>
    </div>
  );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.absences.map((a, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2">
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE SHELL — v3 (brand-aligned, proper tabs, ornaments)
// ══════════════════════════════════════════════════════════════════════════════

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period}
          </p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>

          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">
            {d.thesis}
          </p>

          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">1</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

        {/* -- Tab bar ------------------------------------------------------ */}
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${
                  activeTab === tab.id
                    ? "bg-gold-500 text-navy-dark shadow-sm"
                    : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "courtroom" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "autopsy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper ---------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
