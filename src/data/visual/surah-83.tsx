"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUTAFFIFIN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-mutaffifin
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mutaffifin",
  arabicName: "المُطَفِّفِين",
  meaning: "The Defrauders",
  number: 83,
  ayahCount: 36,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "A surah that finds the Day of Judgment in a grain merchant's thumb on the scale — and follows the thread through cosmic registers with names, hearts darkened by accumulation, streets where the faithful are laughed at, until every rigged measure is balanced and the sealed wine is finally opened.",
  reflectionUrl: "/surahs/al-mutaffifin",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"sarf","english":"Morphology"}],
  heartVerse: {
    arabic: "كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ",
    ayahRef: "83:14",
    translation: "No! Rather, their hearts have been covered over by what they used to earn.",
    why: "The surah's turning point. Everything before it describes the crime and its record. Everything after describes the alternative. The word rana — rust, a stain that accumulates layer upon layer — explains how a person moves from cheating a scale to being inscribed in Sijjin: one daily deposit at a time. Not a single dramatic sin, but the slow patina of small compromises.",
  },

  audio: { surahNumber: 83, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَيْلٌ لِّلْمُطَفِّفِينَ", translation: "Ruin to the defrauders —" },
    { ayah: 2, arabic: "الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ", translation: "those who, when they take a measure from people, take in full," },
    { ayah: 3, arabic: "وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ", translation: "but when they give by measure or weight to them, they give less." },
    { ayah: 4, arabic: "أَلَا يَظُنُّ أُولَٰئِكَ أَنَّهُم مَّبْعُوثُونَ", translation: "Do these people not think that they will be resurrected" },
    { ayah: 5, arabic: "لِيَوْمٍ عَظِيمٍ", translation: "for a tremendous Day —" },
    { ayah: 6, arabic: "يَوْمَ يَقُومُ النَّاسُ لِرَبِّ الْعَالَمِينَ", translation: "a Day when mankind will stand before the Lord of the worlds?" },
    { ayah: 7, arabic: "كَلَّا إِنَّ كِتَابَ الْفُجَّارِ لَفِي سِجِّينٍ", translation: "No indeed! The record of the wicked is in Sijjin." },
    { ayah: 8, arabic: "وَمَا أَدْرَاكَ مَا سِجِّينٌ", translation: "And what could make you know what Sijjin is?" },
    { ayah: 9, arabic: "كِتَابٌ مَّرْقُومٌ", translation: "A written register." },
    { ayah: 10, arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", translation: "Ruin that Day to the deniers —" },
    { ayah: 11, arabic: "الَّذِينَ يُكَذِّبُونَ بِيَوْمِ الدِّينِ", translation: "those who deny the Day of Recompense." },
    { ayah: 12, arabic: "وَمَا يُكَذِّبُ بِهِ إِلَّا كُلُّ مُعْتَدٍ أَثِيمٍ", translation: "And none deny it except every sinful transgressor." },
    { ayah: 13, arabic: "إِذَا تُتْلَىٰ عَلَيْهِ آيَاتُنَا قَالَ أَسَاطِيرُ الْأَوَّلِينَ", translation: "When Our verses are recited to him, he says, 'Tales of the ancients.'" },
    { ayah: 14, arabic: "كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ", translation: "No! Rather, their hearts have been covered over by what they used to earn." },
    { ayah: 15, arabic: "كَلَّا إِنَّهُمْ عَن رَّبِّهِمْ يَوْمَئِذٍ لَّمَحْجُوبُونَ", translation: "No indeed! On that Day they will be veiled from their Lord." },
    { ayah: 16, arabic: "ثُمَّ إِنَّهُمْ لَصَالُو الْجَحِيمِ", translation: "Then they will enter the Hellfire." },
    { ayah: 17, arabic: "ثُمَّ يُقَالُ هَٰذَا الَّذِي كُنتُم بِهِ تُكَذِّبُونَ", translation: "Then it will be said, 'This is what you used to deny.'" },
    { ayah: 18, arabic: "كَلَّا إِنَّ كِتَابَ الْأَبْرَارِ لَفِي عِلِّيِّينَ", translation: "No indeed! The record of the righteous is in Illiyyun." },
    { ayah: 19, arabic: "وَمَا أَدْرَاكَ مَا عِلِّيُّونَ", translation: "And what could make you know what Illiyyun is?" },
    { ayah: 20, arabic: "كِتَابٌ مَّرْقُومٌ", translation: "A written register," },
    { ayah: 21, arabic: "يَشْهَدُهُ الْمُقَرَّبُونَ", translation: "witnessed by those brought near." },
    { ayah: 22, arabic: "إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ", translation: "Indeed, the righteous will be in bliss," },
    { ayah: 23, arabic: "عَلَى الْأَرَائِكِ يَنظُرُونَ", translation: "on adorned couches, gazing." },
    { ayah: 24, arabic: "تَعْرِفُ فِي وُجُوهِهِمْ نَضْرَةَ النَّعِيمِ", translation: "You will recognize in their faces the radiance of bliss." },
    { ayah: 25, arabic: "يُسْقَوْنَ مِن رَّحِيقٍ مَّخْتُومٍ", translation: "They are given to drink a sealed wine," },
    { ayah: 26, arabic: "خِتَامُهُ مِسْكٌ ۚ وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ", translation: "its seal is musk — so for this, let the competitors compete." },
    { ayah: 27, arabic: "وَمِزَاجُهُ مِن تَسْنِيمٍ", translation: "And its mixture is of Tasnim —" },
    { ayah: 28, arabic: "عَيْنًا يَشْرَبُ بِهَا الْمُقَرَّبُونَ", translation: "a spring from which those nearest to Allah drink." },
    { ayah: 29, arabic: "إِنَّ الَّذِينَ أَجْرَمُوا كَانُوا مِنَ الَّذِينَ آمَنُوا يَضْحَكُونَ", translation: "Indeed, those who committed crimes used to laugh at those who believed." },
    { ayah: 30, arabic: "وَإِذَا مَرُّوا بِهِمْ يَتَغَامَزُونَ", translation: "And when they passed by them, they would wink at one another." },
    { ayah: 31, arabic: "وَإِذَا انقَلَبُوا إِلَىٰ أَهْلِهِمُ انقَلَبُوا فَكِهِينَ", translation: "And when they returned to their people, they returned jesting." },
    { ayah: 32, arabic: "وَإِذَا رَأَوْهُمْ قَالُوا إِنَّ هَٰؤُلَاءِ لَضَالُّونَ", translation: "And when they saw them, they said, 'These people are truly lost.'" },
    { ayah: 33, arabic: "وَمَا أُرْسِلُوا عَلَيْهِمْ حَافِظِينَ", translation: "But they were not sent as guardians over them." },
    { ayah: 34, arabic: "فَالْيَوْمَ الَّذِينَ آمَنُوا مِنَ الْكُفَّارِ يَضْحَكُونَ", translation: "So today, those who believed are laughing at the disbelievers," },
    { ayah: 35, arabic: "عَلَى الْأَرَائِكِ يَنظُرُونَ", translation: "on adorned couches, gazing." },
    { ayah: 36, arabic: "هَلْ ثُوِّبَ الْكُفَّارُ مَا كَانُوا يَفْعَلُونَ", translation: "Have the disbelievers been repaid for what they used to do?" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Five Movements",
      subtitle: "Market fraud → Sijjin → Illiyyun → mockery scene → cosmic reversal",
      sections: [
        { ayahs: "1–6", title: "The Indictment", color: "#e07a8a", desc: "Ruin to those who take in full when receiving and shortchange when giving. Then the question that transforms everything: do they not think they will stand before the Lord of the worlds? Six ayahs travel from a market stall to the Throne." },
        { ayahs: "7–17", title: "The Record of Sijjin", color: "#9b7fd4", desc: "The wicked's record is in Sijjin — a name that carries the image of imprisonment. Those who deny the Day, who call revelation 'tales of the ancients.' Their hearts rusted over by what they earned. Veiled from their Lord. Then told: this is what you denied." },
        { ayahs: "14", title: "The Rust", color: "#C9A84C", isPivot: true, desc: "The rana verse — the surah's turning point. Hearts covered by the slow deposit of daily wrong action. Not a single dramatic sin but the accumulation of every shortchanged measure, every dismissed sign. The mechanism that connects market fraud to cosmic fate." },
        { ayahs: "18–28", title: "The Record of Illiyyun", color: "#4ecdc4", desc: "The righteous's record is in Illiyyun — height, elevation. Witnessed by those brought near. Sealed wine whose final fragrance is musk. Mixed with Tasnim. The competitive instinct redirected: if you must compete, compete for this." },
        { ayahs: "29–36", title: "The Reversal", color: "#e07a8a", desc: "A scene from this world: mockers laughing at believers, winking, returning home to jest. Then fa-l-yawm — 'so today' — and every relationship inverts. The same verb, the same posture, the direction of the gaze reversed. The final question: have they been repaid?" },
      ],
    },
    chiasticRing: {
      title: "The Scales",
      subtitle: "The surah opens with rigged scales and closes with the cosmic scale correcting them",
      pairs: [
        {
          left: { label: "The Rigged Scale", ayahs: "1–3", desc: "Take full measure when receiving, give less when giving — the human fraud" },
          right: { label: "The Balanced Scale", ayahs: "36", desc: "Have they been repaid? The universe does not defraud — thuwwiba returns the exact measure" },
          color: "#e07a8a",
        },
        {
          left: { label: "Sijjin — The Prison Record", ayahs: "7–9", desc: "The record of the wicked: confined, named, inscribed — kitabun marqum" },
          right: { label: "Illiyyun — The Exalted Record", ayahs: "18–20", desc: "The record of the righteous: elevated, witnessed by those brought near — same phrase, opposite destination" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Mockers Laugh", ayahs: "29–32", desc: "The disbelievers laughed at the believers, winked, returned home jesting — habitual cruelty" },
          right: { label: "Believers Laugh", ayahs: "34–35", desc: "Today the believers laugh at the disbelievers — same verb, subject and object swapped" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Rust", ayahs: "14",
        desc: "Their hearts have been covered over by what they used to earn.",
        note: "The mechanism that connects opening fraud to eschatological fate. One accumulated layer at a time — from the grain merchant's thumb to the sealed heart.",
      },
    },
    deductiveFunnel: {
      title: "From Market to Throne",
      subtitle: "The surah traces a single thread from the smallest fraud to the final reckoning",
      layers: [
        { depth: 1, label: "The Small Fraud", ayah: "1–3", arabic: "وَيْلٌ لِّلْمُطَفِّفِينَ", desc: "The root t-f-f means something trivial, slight — the small amount by which a trader shortchanges. Not grand theft, but the habit of taking a little more and giving a little less. Every shortchanged measure is a theological statement: there is no Day when this will be weighed.", color: "#e07a8a" },
        { depth: 2, label: "The Hidden Denial", ayah: "4–6", arabic: "أَلَا يَظُنُّ أُولَٰئِكَ", desc: "Do they not even suspect? The verb yazunnu carries a shade of uncertainty — the question implies that cheating a scale is, at its root, an act of disbelief in accountability. The connection between a market transaction and standing before the Lord is the argument.", color: "#9b7fd4" },
        { depth: 3, label: "The Rust Deposits", ayah: "14", arabic: "رَانَ عَلَىٰ قُلُوبِهِم", desc: "Rana — rust that accumulates gradually, layer upon layer. The heart becomes opaque through the slow deposit of daily wrong action. Each shortchanged measure, each dismissed sign, each comfortable lie builds a patina of spiritual opacity.", color: "#C9A84C" },
        { depth: 4, label: "The Final Measure", ayah: "36", arabic: "هَلْ ثُوِّبَ الْكُفَّارُ", desc: "Thuwwiba — normally positive, 'rewarded' — applied to punishment. The word for reward describes what the fraudsters receive. The scale has been balanced. The universe does not defraud.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah speaks entirely through contrast — every absence forces a mirror",
      absences: [
        { item: "No prophets", note: "No prophetic stories, no destroyed nations, no historical examples. The surah's only example is the reader's own behavior — the daily transactions you already know." },
        { item: "No commands", note: "No legislative instructions, no prohibitions, no direct address to the Prophet. The surah is not telling you what to do. It is showing you what is already true about the unseen architecture of accountability." },
        { item: "No explanation of how Sijjin and Illiyyun work", note: "Both records are named but not described beyond 'a written register.' The surah trusts the names themselves — prison below, elevation above — to carry the meaning." },
        { item: "No defense offered to the mockers", note: "Ayah 33 notes they were 'not sent as guardians' — they appointed themselves judges with no authority. The surah strips them of their one assumed power: the right to evaluate." },
        { item: "No transition between market and cosmos", note: "The surah moves from a trader's fraud to the Lord of the worlds in six ayahs with no bridge. The absence of explanation is the argument: the connection is self-evident to anyone who believes in accountability." },
      ],
    },
  },

  contentNodes: [
    { concept: "Rana — spiritual rust and the slow-stained heart", type: "surah-specific", articleSlug: "rana-spiritual-rust-83-14" },
    { concept: "Sijjin and Illiyyun — the named cosmic registers", type: "surah-specific", articleSlug: "sijjin-illiyyun-registers-83" },
    { concept: "Khitamuhu misk — the sealed wine and its fragrance", type: "surah-specific", articleSlug: "khitamuhu-misk-sealed-wine-83" },
    { concept: "The mockery reversal — yadhakun returned to its owner", type: "cross-surah", articleSlug: "mockery-reversal-yadhakun-83" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "movements", label: "Movements" },
  { id: "scales", label: "Scales" },
  { id: "thread", label: "Thread" },
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
      <span className="text-gold-500/50 text-sm">۞</span>
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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
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
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div
            ref={progressRef}
            onClick={seek}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"
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
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
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
          ✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
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
        Small fraud → hidden denial → rusted heart → final measure
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div>
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

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} · {d.period}
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

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
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

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "movements" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "scales" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "thread" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* ── Go Deeper ────────────────────────────────────────────────────── */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
