"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ISRA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-isra
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Isra",
  arabicName: "الإسْراء",
  meaning: "The Night Journey",
  number: 17,
  ayahCount: 111,
  period: "Makki",
  juz: 15,
  movements: 6,
  thesis:
    "A servant is carried to the farthest point, handed a complete ethical code for the closest concerns, and the entire surah is framed by glorification — tasbih at the opening, takbir at the close.",
  reflectionUrl: "/surahs/al-isra",
  readTime: "25 min read",

  heartVerse: {
    arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    ayahRef: "17:23",
    translation: "Your Lord has decreed that you worship none but Him, and that you be good to your parents.",
    why: "The placement is theology. The first obligation after God is to those who gave you life. The same ayah continues with extraordinary emotional precision — do not say to them even uff, the smallest Arabic sound of irritation. The ethical charter begins here, and the proximity of these two commands says everything about what counts as sacred duty.",
  },

  audio: { surahNumber: 17, reciter: "ar.alafasy" },

  diagrams: {
    sectionMap: {
      title: "The Commission",
      subtitle: "Six movements: journey → human nature → ethical charter → defense → dignity → praise",
      sections: [
        { ayahs: "1–8", title: "The Night Journey and the Mirror", color: "#C9A84C", desc: "Subhana — glory, transcendence. The servant is carried from al-Masjid al-Haram to al-Masjid al-Aqsa to be shown signs. Then immediately: the Children of Israel as a cautionary frame — two cycles of corruption and consequence." },
        { ayahs: "9–22", title: "Human Nature and Accountability", color: "#4ecdc4", desc: "The Quran guides to that which is most upright. The human being is hasty by constitution. Every person's record fastened to their neck. No bearer of burdens bears another's. When God intends to destroy a town, He first commands its affluent to live rightly." },
        { ayahs: "23–39", title: "The Ethical Charter", color: "#9b7fd4", isPivot: true, desc: "Seventeen ayahs: worship God alone, honor parents, give to kin and the poor, do not be wasteful, do not kill children from poverty, do not approach zina, protect the orphan's wealth, fulfill covenants, give full measure, do not pursue what you have no knowledge of, do not walk arrogantly. All of that — hikma, wisdom revealed." },
        { ayahs: "40–69", title: "Arguments and the Story of Iblis", color: "#e07a8a", desc: "Defense against Quraysh's objections. The heavens and earth declare tasbih. A hidden veil placed over hearts that refuse. The argument from resurrection. Iblis's counter-declaration — and the response: over My true servants, you have no authority." },
        { ayahs: "70–88", title: "Dignity and the Quran's Authority", color: "#4ecdc4", desc: "We have honored the children of Adam. The five daily prayers established. The Quran is healing and mercy. The soul — say: it is from the affair of my Lord, and you have been given of knowledge only a little. The inimitability challenge." },
        { ayahs: "89–111", title: "Demands and the Final Praise", color: "#9b7fd4", desc: "Quraysh's escalating demands — springs, gardens, a house of gold, ascension. The Prophet's response echoes the opening: subhana Rabbi. The People of the Book fall in prostration weeping. The final ayah: takbir — glorify Him with great glorification." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The surah opens with tasbih (God is beyond limitation) and closes with takbir (God is greater than all else)",
      pairs: [
        {
          left: { label: "Tasbih", ayahs: "1", desc: "Subhana alladhi asra bi-abdihi — glory be to the One who carried His servant. The journey initiates. The servant is passive, carried." },
          right: { label: "Takbir", ayahs: "111", desc: "Kabbirhu takbira — glorify Him with great glorification. The servant now stands and declares. Passivity gives way to proclamation." },
          color: "#C9A84C",
        },
        {
          left: { label: "Bani Isra'il's History", ayahs: "2–8", desc: "The Children of Israel — given scripture, two cycles of corruption, two divine responses. A mirror held up to Quraysh." },
          right: { label: "Musa and Fir'awn", ayahs: "101–104", desc: "Nine clear signs given, still Fir'awn rejected. More signs do not produce more belief. The parallel to Quraysh's demands." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Human Nature", ayahs: "9–22", desc: "The human being is hasty, prays for harm as readily as good. Individual accountability is absolute." },
          right: { label: "Human Dignity", ayahs: "70–84", desc: "We have honored the children of Adam. Each person acts according to their disposition. The soul is from the affair of my Lord." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Ethical Charter", ayahs: "23–39",
        desc: "Your Lord has decreed — worship, parents, kin, spending, life, covenant, measure, knowledge, humility. That is from what your Lord has revealed to you of wisdom.",
        note: "The charter is the gravitational center. The histories explain why it matters. The arguments defend it. The human nature passages explain why it is so difficult and so necessary.",
      },
    },
    deductiveFunnel: {
      title: "Tasbih's Migration",
      subtitle: "The root s-b-h moves through the surah — from divine declaration to human response",
      layers: [
        { depth: 1, label: "God's Voice", ayah: "1", arabic: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ", desc: "The surah opens with God glorifying Himself — subhana. The word clears the air. Everything that follows proceeds from the premise that God is beyond limitation.", color: "#C9A84C" },
        { depth: 2, label: "Creation's Praise", ayah: "44", arabic: "تُسَبِّحُ لَهُ السَّمَاوَاتُ السَّبْعُ وَالْأَرْضُ", desc: "The seven heavens and the earth and all they contain declare His glory. Tasbih woven into the fabric of creation itself. You do not understand their glorification.", color: "#4ecdc4" },
        { depth: 3, label: "The Prophet's Speech", ayah: "93", arabic: "سُبْحَانَ رَبِّي", desc: "Under pressure from Quraysh's impossible demands, the Prophet responds with the surah's opening word placed in his own mouth — subhana Rabbi. Glorification as resistance.", color: "#9b7fd4" },
        { depth: 4, label: "The Believers' Tears", ayah: "108", arabic: "سُبْحَانَ رَبِّنَا", desc: "The People of the Book fall on their faces weeping — subhana Rabbina. Tasbih that began as divine declaration ends as human response. The distance between is the surah's entire content.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Al-Isra declines to tell stories — it issues instructions and defends the authority behind them",
      absences: [
        { item: "No extended prophet narratives", note: "For a surah of 111 ayahs, no full Musa-and-Fir'awn epic, no Ibrahim and his father, no Yusuf, no Nuh. The Bani Isra'il passage is compressed history. The Iblis scene is brief and pointed. The surah legislates rather than narrates." },
        { item: "No description of the Night Journey itself", note: "Ayah 1 compresses the entire Isra into a single breath. What the Prophet saw is not described. The surah is concerned with what comes after seeing — the ethical code he was meant to carry back." },
        { item: "No promise of earthly victory", note: "The charter does not promise that living by the code will bring worldly success. It promises the code is hikma — wisdom — and that the covenant will be questioned about. The reward is clarity, not comfort." },
        { item: "No softening of the demands", note: "Do not say uff to your parents. Do not pursue what you have no knowledge of. Do not walk arrogantly. Every instruction is precise, physical, daily. There is no escape clause, no exception for difficulty." },
        { item: "No answer to the question of the soul", note: "They ask about al-ruh. The answer is five words: it is from the affair of my Lord. The brevity is itself an argument about the limits of human comprehension." },
      ],
    },
  },

  contentNodes: [
    { concept: "The ethical charter (23–39) — the Quran's complete moral code", type: "surah-specific", articleSlug: "isra-ethical-charter-23-39" },
    { concept: "Tasbih to takbir — glorification as structural frame", type: "surah-specific", articleSlug: "tasbih-takbir-frame-17" },
    { concept: "Al-Isra and Al-An'am — the same commandments at two scales", type: "cross-surah", articleSlug: "isra-anam-commandments-echo" },
    { concept: "The Night Journey and Al-Kahf — limits of human knowledge", type: "cross-surah", articleSlug: "isra-kahf-knowledge-limits" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "sections", label: "Sections" },
  { id: "frame", label: "Frame" },
  { id: "tasbih", label: "Tasbih" },
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

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionMap }) {
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
        Divine declaration → creation's praise → prophetic speech → human tears
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
          {activeTab === "sections" && <SectionJourney data={d.diagrams.sectionMap} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "tasbih" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <HeartVerse verse={d.heartVerse} />
              <OrnamentDivider />
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
