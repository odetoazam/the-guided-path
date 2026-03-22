"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH YUNUS — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/yunus
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Yunus",
  arabicName: "يُونُس",
  meaning: "Jonah",
  number: 10,
  ayahCount: 109,
  period: "Makki",
  juz: 11,
  movements: 4,
  thesis:
    "A surah that walks you through the evidence of the cosmos and the record of history to deliver a single, extraordinary fact: in the long pattern of nations that refused and were destroyed, one community believed just in time — and the surah named itself after that exception because the door is still open.",
  reflectionUrl: "/surahs/yunus",
  readTime: "20 min read",

  heartVerse: {
    arabic: "فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ",
    ayahRef: "10:98",
    translation: "Then has there not been a single city that believed so its faith benefited it — except the people of Yunus?",
    why: "The word illa — except — restructures the entire preceding argument. Every nation rejected and was destroyed. Then: except. One city believed. The surah named itself after that exception, after the proof that the door never fully closes.",
  },

  audio: { surahNumber: 10, reciter: "ar.alafasy" },

  sectionMap: [
    { ayahs: "1–10", title: "The Book & Its Author", color: "#4ecdc4", desc: "The surah opens with alif-lam-ra and immediately declares the nature of this Quran — a Wise Book whose revelation through a man among them should not surprise anyone who considers the God who built the cosmos." },
    { ayahs: "11–40", title: "The Cosmos as Witness", color: "#4ecdc4", desc: "The surah's longest sustained passage. The sun as radiance, the moon measured into phases, the ships on the sea, the storm-prayer-and-forgetting cycle of human nature — and the devastating parable of worldly life at ayah 24." },
    { ayahs: "41–70", title: "Argument & Challenge", color: "#4ecdc4", desc: "The challenge to produce ten surahs like it. Portraits of human nature under pressure: exultant in relief, desperate in hardship, forgetful the moment the crisis passes. The word haqq — truth, reality — pulses through every passage." },
    { ayahs: "71–73", title: "Nuh: The Posture", color: "#e07a8a", desc: "Three compressed ayahs. Not the flood narrative but the prophetic posture: 'In Allah I have placed my trust. So conspire together — and carry it out against me.' The image of a man whose trust lies beyond the reach of his enemies' plans." },
    { ayahs: "75–92", title: "Musa & the Drowning King", color: "#e07a8a", desc: "Seventeen ayahs driving toward a single moment: the sea closes, Fir'awn declares belief with water in his lungs, and the two-word divine response — al-aana? — 'Now?' His body is preserved as a sign for those who come after. The denier becomes the evidence." },
    { ayahs: "93–97", title: "The Children of Israel", color: "#e07a8a", desc: "Settled in the land after the drowning. A bridge between the history of refusal and the exception about to come." },
    { ayahs: "98", title: "The Exception", color: "#C9A84C", isPivot: true, desc: "Illa — 'except.' One city believed before the punishment descended. The people of Yunus. The single exception in the Quran's entire record of prophetic history. The surah carries this word as its name." },
    { ayahs: "99–103", title: "Free Will & Trust", color: "#9b7fd4", desc: "'Had your Lord willed, all those on earth would have believed. So will you compel the people?' The theological weight of human choice. The door was open — but it must be walked through freely." },
    { ayahs: "104–109", title: "The Closing Address", color: "#1A7A54", desc: "Intimate, private, direct. 'Say: O people, if you are in doubt about my religion...' Each instruction a sentence. The rhythm slows. The final word: 'Be patient until Allah gives judgment. And He is the best of judges.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Four Columns",
      subtitle: "Cosmos → History → Exception → Patience",
      sections: [
        { ayahs: "1–70", title: "Cosmic Signs", color: "#4ecdc4", desc: "The surah opens the case with evidence anyone can see — the sun's radiance, the moon's measured phases, ships on the sea, rain on dead ground. The parable of worldly life at ayah 24 is one of the most devastating single images in the Quran: a field flourishing one day and leveled by morning, 'as though it had not flourished the day before.' The argument is empirical before it is eschatological." },
        { ayahs: "71–97", title: "The Historical Record", color: "#e07a8a", desc: "Nuh in three compressed ayahs — posture, not narrative. Then Musa against Fir'awn for seventeen ayahs, building to the drowning and the two-word divine response: al-aana? His body preserved as a sign. Every nation that received a prophet and refused. The pattern seems absolute." },
        { ayahs: "98", title: "The Exception", color: "#C9A84C", isPivot: true, desc: "One word — illa — breaks the pattern. One city believed. The people of Yunus. The surah has spent its entire arc establishing a law of history, and then a single word shatters it. The break is the point. The whole structure was built so that the exception would land with its full weight." },
        { ayahs: "99–109", title: "The Resolution", color: "#1A7A54", desc: "The crowd recedes. The voice drops. Direct instructions to one person: here is what you say, here is where you stand, here is what you do not do. 'Follow what is revealed to you, and be patient until Allah gives judgment.' Shorter sentences for the end of a long road." },
      ],
    },
    chiasticRing: {
      title: "The Echo",
      subtitle: "The surah's opening and closing form a precise inversion",
      pairs: [
        {
          left: { label: "Revelation Contested", ayahs: "2", desc: "'Was it a wonder to the people that We revealed to a man from among them?' — the opening treats revelation as something doubted and mocked" },
          right: { label: "Revelation Trusted", ayahs: "109", desc: "'Follow what is revealed to you, and be patient' — the closing treats it as settled ground, the only solid thing in the room" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Fir'awn's Too-Late Faith", ayahs: "90–91", desc: "He believed at the moment of drowning and was told 'Now?' — faith that arrives after the door has shut" },
          right: { label: "Yunus's Just-In-Time Faith", ayahs: "98", desc: "One city believed at the last moment and was saved — the closest possible rescue next to the closest possible miss" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Exception", ayahs: "98",
        desc: "Except the people of Yunus — when they believed, We removed from them the punishment of disgrace.",
        note: "The distance between 'too late' and 'just in time' is eight ayahs. The surah placed the closest miss next to the closest rescue, and the juxtaposition is the most powerful argument it makes.",
      },
    },
    deductiveFunnel: {
      title: "The Evidence Trail",
      subtitle: "Each layer builds toward the exception that reframes everything",
      layers: [
        { depth: 1, label: "Cosmic Evidence", ayah: "5–6", arabic: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً", desc: "The sun as radiance, the moon as measured light. Two different Arabic words for what translation flattens into one. The calibration of the cosmos as the first evidence that the God who built all this can certainly speak through a human being.", color: "#4ecdc4" },
        { depth: 2, label: "Human Pattern", ayah: "22–23", arabic: "دَعَوُا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ", desc: "The storm-prayer cycle: sincere devotion at sea, forgetfulness on land. The root image of kafara — to cover over — describes someone who has had the experience of God and buried it.", color: "#9b7fd4" },
        { depth: 3, label: "Historical Pattern", ayah: "71–92", arabic: "فَأَغْرَقْنَاهُمْ", desc: "Nuh's posture, Musa's confrontation, Fir'awn's drowning. Every nation that received truth and refused it. The pattern seems like a law of history.", color: "#e07a8a" },
        { depth: 4, label: "The Break", ayah: "98", arabic: "إِلَّا قَوْمَ يُونُسَ", desc: "Except. One word breaks the law the surah spent ninety-seven ayahs establishing. The people of Yunus believed, and the punishment was lifted. The exception is the surah's gift.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences are part of its argument",
      absences: [
        { item: "No vivid Paradise or Hell imagery", note: "Rivers, gardens, chains, fire — almost entirely absent. The surah does not try to move you through longing or terror. It moves you through what you can see with your own eyes and verify from history." },
        { item: "No legal commands", note: "No instructions about prayer, fasting, charity, or social conduct. This surah is entirely diagnostic — it shows you the world, shows you the pattern, shows you the exception, and leaves the implications to you." },
        { item: "Yunus's own story is barely told", note: "The prophet whose name the surah carries is almost invisible. His flight and whale and repentance are detailed in other surahs. Here, what matters is what his people did. They believed. It worked." },
        { item: "No destruction scene for the exception", note: "Every other community in the surah receives a vivid ending. Yunus's people receive a lifting — a removal of punishment. The surah names itself after an absence of ruin." },
        { item: "No moment of prophetic vindication", note: "Nuh is given three ayahs of posture, not triumph. Musa's story drives to Fir'awn's drowning, not to celebration. The surah withholds the satisfaction of being proven right." },
      ],
    },
  },

  contentNodes: [
    { concept: "Illa — the exception that rewrites history", type: "surah-specific", articleSlug: "illa-exception-yunus-10-98" },
    { concept: "The parable of worldly life (10:24)", type: "surah-specific", articleSlug: "parable-worldly-life-10-24" },
    { concept: "Fir'awn's preserved body (10:92)", type: "surah-specific", articleSlug: "firawn-body-preserved-10-92" },
    { concept: "Yunus–Hud–Yusuf triptych", type: "cross-surah", articleSlug: "yunus-hud-yusuf-triptych" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "echo", label: "Echo" },
  { id: "evidence", label: "Evidence" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider
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

function SectionMap({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">109 ayahs across four movements — cosmos, history, exception, patience</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
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
        Cosmos → human pattern → historical pattern → the break
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
// PAGE SHELL — v3
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "echo" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "evidence" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
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
