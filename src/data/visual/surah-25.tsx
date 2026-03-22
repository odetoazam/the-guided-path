"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FURQAN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-furqan
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Furqan",
  arabicName: "الفُرقان",
  meaning: "The Criterion",
  number: 25,
  ayahCount: 77,
  period: "Makki",
  juz: "18–19",
  movements: 5,
  thesis:
    "A surah that answers every demand for proof by painting a portrait of a person whose life is the proof — the criterion made flesh in the servants of the Most Merciful, whose walk upon the earth is gentle.",
  reflectionUrl: "/surahs/al-furqan",
  readTime: "20 min read",

  heartVerse: {
    arabic: "وَعِبَادُ الرَّحْمَـٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا",
    ayahRef: "25:63",
    translation: "The servants of the Most Merciful are those who walk upon the earth gently.",
    why: "After sixty-two ayahs of declaration, objection, judgment, history, and cosmic sign, the surah finally answers its own question: what does a person look like who has received the criterion fully? The first quality named is not prayer or knowledge — it is a way of moving through the world. A footstep that does not bruise the ground.",
  },

  audio: { surahNumber: 25, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "تَبَارَكَ الَّذِي نَزَّلَ الْفُرْقَانَ عَلَىٰ عَبْدِهِ لِيَكُونَ لِلْعَالَمِينَ نَذِيرًا", translation: "Blessed is the One who sent down the criterion upon His servant, so that he would be a warner to all peoples." },
    { ayah: 2, arabic: "الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَلَمْ يَتَّخِذْ وَلَدًا وَلَمْ يَكُن لَّهُ شَرِيكٌ فِي الْمُلْكِ وَخَلَقَ كُلَّ شَيْءٍ فَقَدَّرَهُ تَقْدِيرًا", translation: "The One to whom belongs the dominion of the heavens and the earth, who has not taken a son and has no partner in dominion, and who created all things and determined them precisely." },
    { ayah: 3, arabic: "وَاتَّخَذُوا مِن دُونِهِ آلِهَةً لَّا يَخْلُقُونَ شَيْئًا وَهُمْ يُخْلَقُونَ", translation: "Yet they have taken besides Him gods who create nothing and are themselves created." },
    { ayah: 30, arabic: "وَقَالَ الرَّسُولُ يَا رَبِّ إِنَّ قَوْمِي اتَّخَذُوا هَـٰذَا الْقُرْآنَ مَهْجُورًا", translation: "And the Messenger said, 'My Lord, my people have taken this Quran as something abandoned.'" },
    { ayah: 53, arabic: "وَهُوَ الَّذِي مَرَجَ الْبَحْرَيْنِ هَـٰذَا عَذْبٌ فُرَاتٌ وَهَـٰذَا مِلْحٌ أُجَاجٌ", translation: "And He is the One who merged the two seas — this one sweet and fresh, that one salty and bitter." },
    { ayah: 62, arabic: "وَهُوَ الَّذِي جَعَلَ اللَّيْلَ وَالنَّهَارَ خِلْفَةً لِّمَنْ أَرَادَ أَن يَذَّكَّرَ أَوْ أَرَادَ شُكُورًا", translation: "And He is the One who made the night and the day in succession — for whoever desires to remember or desires to be grateful." },
    { ayah: 63, arabic: "وَعِبَادُ الرَّحْمَـٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا", translation: "The servants of the Most Merciful are those who walk upon the earth gently, and when the ignorant address them, they say: Peace." },
    { ayah: 74, arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", translation: "Our Lord, grant us from our spouses and our children the coolness of eyes, and make us an example for the righteous." },
    { ayah: 77, arabic: "قُلْ مَا يَعْبَأُ بِكُمْ رَبِّي لَوْلَا دُعَاؤُكُمْ", translation: "Say: My Lord would not care for you were it not for your supplication." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Five Movements",
      subtitle: "Declaration → objection → judgment → sign → portrait",
      sections: [
        { ayahs: "1–9", title: "Declaration & Objection", color: "#e07a8a", desc: "The Quran is the criterion sent upon His servant. Immediately the objectors speak — Why does this messenger eat food? Why no angel, no garden, no treasure? The surah lets their words sit before any response arrives." },
        { ayahs: "10–20", title: "The Deeper Issue", color: "#9b7fd4", desc: "Beneath the surface objections lies spiritual amnesia — nasu al-dhikr. Allah could have given gardens and palaces. The conditional is devastating. Humanity is the messenger's design, not his flaw." },
        { ayahs: "21–34", title: "The Day of Regret", color: "#4ecdc4", desc: "The wrongdoer bites his hands — ya'addu al-dhalimu 'ala yadayhi. He regrets not a belief but a friendship. The Prophet speaks: My people have taken this Quran as abandoned. The word mahjuran echoes the hijran mahjuran of ayah 22." },
        { ayahs: "35–62", title: "History & Creation", color: "#C9A84C", isPivot: true, desc: "Prophetic stories compressed to bare lines, then the surah slows into meditative wonder. Shadow, night, wind, rain, two seas with a barrier. Time itself is mercy: night and day alternate for whoever desires to remember or be grateful." },
        { ayahs: "63–77", title: "The Portrait", color: "#e07a8a", desc: "The 'ibad al-Rahman — those who walk gently, respond to ignorance with peace, prostrate through the night, spend without excess, avoid what is forbidden, stay alert to revelation, and pray for their families. The criterion made flesh." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing form a precise structural correspondence",
      pairs: [
        {
          left: { label: "Criterion Declared", ayahs: "1–3", desc: "The Quran sent down as al-furqan — the criterion that separates truth from falsehood" },
          right: { label: "Criterion Embodied", ayahs: "63–77", desc: "The 'ibad al-Rahman — people who embody the criterion through character, worship, and patience" },
          color: "#e07a8a",
        },
        {
          left: { label: "Signs Demanded", ayahs: "4–9", desc: "Objectors demand miraculous proof — angels, gardens, treasures" },
          right: { label: "Signs Available", ayahs: "45–62", desc: "The signs were always there — shadow, night, wind, rain, two seas, the alternation of day and night" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Judgment Forward", ayahs: "21–34", desc: "Scenes of the Day of Judgment — regret, the wrongdoer biting his hands, the Prophet's lament" },
          right: { label: "Judgment Backward", ayahs: "35–44", desc: "Compressed prophetic histories — Musa, Nuh, 'Ad, Thamud — the pattern of rejection and consequence across time" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Hinge", ayahs: "30",
        desc: "My Lord, my people have taken this Quran as abandoned.",
        note: "The Prophet's lament marks the pivot — everything before is about objections against the message, everything after is about the evidence for it.",
      },
    },
    deductiveFunnel: {
      title: "The Portrait's Architecture",
      subtitle: "Each quality of the 'ibad al-Rahman builds on the last — character before worship, conduct before creed",
      layers: [
        { depth: 1, label: "Movement", ayah: "63a", arabic: "يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا", desc: "The first quality named is not prayer or creed — it is how their feet meet the earth. Hawnan: with lightness, without pressing down hard. Character is physical before it is theological.", color: "#4ecdc4" },
        { depth: 2, label: "Speech", ayah: "63b", arabic: "قَالُوا سَلَامًا", desc: "When ignorance confronts them, they respond with salaman — peace, safety. Not argument, not victory. They de-escalate. They leave encounters whole.", color: "#9b7fd4" },
        { depth: 3, label: "Worship", ayah: "64", arabic: "يَبِيتُونَ لِرَبِّهِمْ سُجَّدًا وَقِيَامًا", desc: "They spend their nights in prostration and standing. The public gentleness rests on private devotion. The walk is light because the knees have bent.", color: "#e07a8a" },
        { depth: 4, label: "Prayer", ayah: "74", arabic: "قُرَّةَ أَعْيُنٍ", desc: "Their deepest prayer is for coolness of eyes from family — qurrata a'yun. For all their moral seriousness, they want the same thing every human being wants: to look at the people they love and feel joy so deep it is almost relief.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Al-Furqan is entirely concerned with seeing — what is conspicuously absent shapes the argument",
      absences: [
        { item: "No direct commands to believers", note: "No legislation, no 'O you who believe' followed by instruction. The surah is descriptive rather than prescriptive — it says 'these are the ones' and lets the portrait do its own work." },
        { item: "No 'O you who believe'", note: "The collective address to the faithful community is entirely absent. The surah speaks to individuals — to the one who walks, the one who prays, the one who regrets." },
        { item: "No counter-argument to the objectors", note: "The surah absorbs the objections without raising its voice. Instead of arguing back, it shows you the universe, or shows you the Day of Judgment, or shows you the portrait of the faithful." },
        { item: "Al-Rahman appears sixteen times", note: "The name al-Rahman — the Most Merciful — is used more densely here than almost anywhere else outside Surah al-Rahman itself. The criterion is being delivered under the banner of mercy." },
        { item: "No specific sunnah occasions", note: "No authenticated hadith assigns this surah to a particular time of recitation. Its placement in juz 18-19 means it falls in the second half of Ramadan — placing the 'ibad al-Rahman portrait in the most spiritually intensive period of the year." },
      ],
    },
  },

  contentNodes: [
    { concept: "'Ibad al-Rahman — the criterion made flesh", type: "surah-specific", articleSlug: "ibad-al-rahman-portrait-25-63" },
    { concept: "Qurrata a'yun — the coolness of eyes", type: "surah-specific", articleSlug: "qurrata-ayun-coolness-eyes-25-74" },
    { concept: "Mahjuran — the Quran abandoned", type: "cross-surah", articleSlug: "mahjuran-quran-abandoned-25-30" },
    { concept: "Al-Furqan to Al-Shu'ara — criterion to evidence", type: "cross-surah", articleSlug: "furqan-shuara-sequence" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Movements" },
  { id: "mirror", label: "Mirror" },
  { id: "portrait", label: "Portrait" },
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
          {playing ? "\u23F8" : "\u25B6"}
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
        Movement → speech → worship → prayer
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
            Surah {d.number} · {d.period} · Juz {d.juz}
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "portrait" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
            </div>
          )}
        </div>

        {/* -- Go Deeper --------------------------------------------------- */}
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
