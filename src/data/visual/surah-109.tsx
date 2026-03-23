"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-KAFIRUN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-kafirun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Kafirun",
  arabicName: "الكافرون",
  meaning: "The Disbelievers",
  number: 109,
  ayahCount: 6,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "Al-Kafirun is the creed of someone who has stopped negotiating — not out of arrogance but out of clarity. Six ayahs, one repeated root, and a single principle that transforms separation into dignity.",
  reflectionUrl: "/surahs/al-kafirun",
  readTime: "15 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
    ayahRef: "109:4",
    translation: "And I will never worship what you have worshipped.",
    why: "The pivot from present description to permanent identity. The active participle ʻabidun and the past tense ʻabadtum create a temporal architecture — a declaration that one's permanent nature is incompatible with another's established practice.",
  },

  audio: { surahNumber: 109, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", translation: "Say: O you who deny the truth." },
    { ayah: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", translation: "I do not worship what you worship." },
    { ayah: 3, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", translation: "And you do not worship what I worship." },
    { ayah: 4, arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", translation: "And I will never worship what you have worshipped." },
    { ayah: 5, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", translation: "And you will not worship what I worship." },
    { ayah: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", translation: "To you your way, and to me mine." },
  ],

  diagrams: {
    mirrorStructure: {
      title: "The Double Mirror",
      subtitle: "Two mirrored pairs — present tense, then permanent tense — sealed by a single principle",
      pairs: [
        {
          left: { label: "I do not worship", ayahs: "2", desc: "Present tense: the Prophet states his current reality — la aʿbudu ma taʿbudun" },
          right: { label: "You do not worship", ayahs: "3", desc: "Mirror: your position named with equal grammatical weight — wa la antum ʿabiduna ma aʿbud" },
          color: "#4ecdc4",
          tag: "Present",
        },
        {
          left: { label: "I will never worship", ayahs: "4", desc: "Permanent seal: active participle ʿabidun + past tense ʿabadtum — identity, not mood" },
          right: { label: "You will not worship", ayahs: "5", desc: "After ayah 4, this is no longer observation — it is recognition that change will not come" },
          color: "#9b7fd4",
          tag: "Permanent",
        },
      ],
      opening: {
        label: "The Command", ayahs: "1",
        desc: "Qul ya ayyuha al-kafirun — God commands the Prophet to speak. The speech is human, the words are divine.",
        color: "#e0a848",
      },
      closing: {
        label: "The Principle", ayahs: "6",
        desc: "Lakum dinukum wa liya din — the verdict the five preceding lines earned the right to pronounce.",
        color: "#d4a853",
      },
    },

    refrainPattern: {
      title: "The Single Root",
      subtitle: "The root ʿ-b-d (to worship) appears in every single ayah — six times across six lines",
      elements: [
        { ayah: "1", form: "al-kafirun", role: "Address", desc: "The audience is named by their defining act: rejection (kufr). No argument about whether they qualify.", color: "#8a88a0", hasRoot: false },
        { ayah: "2", form: "aʿbudu / taʿbudun", role: "Present: I / You", desc: "Two forms of the root in one ayah. What I worship (aʿbudu) vs. what you worship (taʿbudun).", color: "#4ecdc4", hasRoot: true },
        { ayah: "3", form: "ʿabiduna / aʿbud", role: "Present: You / I", desc: "Mirror of ayah 2. Same truth, reversed subject. The separation is balanced, almost geometric.", color: "#4ecdc4", hasRoot: true },
        { ayah: "4", form: "ʿabidun / ʿabadtum", role: "Permanent + Past", desc: "The pivot. Active participle (permanent nature) meets past tense (established practice). Identity declared.", color: "#9b7fd4", hasRoot: true },
        { ayah: "5", form: "ʿabiduna / aʿbud", role: "Permanent: You / I", desc: "Same words as ayah 3, but after ayah 4's seal they carry the weight of finality.", color: "#9b7fd4", hasRoot: true },
        { ayah: "6", form: "dinukum / din", role: "The Verdict", desc: "The root shifts from ʿ-b-d to d-y-n. Worship becomes way of life. Two complete worlds, named and separated.", color: "#d4a853", hasRoot: false },
      ],
      rootNote: "No other surah in the Quran saturates itself this completely with a single verb root.",
    },

    sectionJourney: {
      title: "The Arc",
      subtitle: "Direct address, through rhythmic proof of incompatibility, to principled separation",
      sections: [
        { ayahs: "1", title: "The Command", color: "#e0a848", desc: "Qul — the divine command to speak. The Prophet is not choosing to address the disbelievers; he is being instructed to. Every line that follows carries the weight of revelation." },
        { ayahs: "2–3", title: "Present Separation", color: "#4ecdc4", desc: "Two mirrored statements of current reality. I do not worship yours, you do not worship mine. The grammatical symmetry makes the separation feel balanced, without hierarchy or condemnation." },
        { ayahs: "4–5", title: "The Permanent Seal", color: "#9b7fd4", isPivot: true, desc: "The tenses shift. What looked like a temporary position becomes an ontological declaration. The active participle transforms a statement of practice into a statement of identity. This is the hinge." },
        { ayahs: "6", title: "The Principle", color: "#d4a853", desc: "Five words in Arabic. After the elaborate parallelism of what precedes it, this line feels like a door closing — quietly, without a slam. The word din is given to both sides equally." },
      ],
    },

    absenceMap: {
      title: "What's Missing",
      subtitle: "What Al-Kafirun leaves out tells you as much as what it includes",
      absences: [
        { item: "No mention of Allah", note: "The word Allah does not appear even once — a striking absence in a surah whose entire purpose is to distinguish the worship of Allah from everything else. The worship itself is what matters." },
        { item: "No threat or punishment", note: "No hellfire, no warning, no description of divine power. The surah has moved past persuasion. It names what is true and lets the truth stand." },
        { item: "No daʻwah — no invitation", note: "The Prophet is told to speak, but his speech contains no appeal, no argument for Islam's truth. The conversation about truth is over; what remains is to name the separation." },
        { item: "No story, no sign, no command", note: "No destroyed nations, no cosmic signs, no moral imperatives. The surah is not asking anyone to do anything except understand." },
        { item: "No promise of paradise", note: "Neither reward nor punishment is offered. The surah separates without bribing and without threatening — the hardest form of clarity." },
      ],
    },
  },

  contentNodes: [
    { concept: "The root ʿ-b-d — worship as a path worn into the ground", type: "cross-surah", articleSlug: "root-abd-worship-path-quran" },
    { concept: "Al-Kafirun and Al-Ikhlas as liturgical pair — cost and theology of tawhid", type: "cross-surah", articleSlug: "kafirun-ikhlas-tawhid-pair" },
    { concept: "Temporal expansion — how repetition seals a declaration across time", type: "surah-specific", articleSlug: "kafirun-temporal-expansion" },
    { concept: "Why Al-Kafirun never names Allah — absence as design", type: "surah-specific", articleSlug: "kafirun-absence-allah-design" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "mirror", label: "Mirror" },
  { id: "refrain", label: "The Root" },
  { id: "arc", label: "The Arc" },
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
          {playing ? "⏸" : "▶"}
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
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
          </p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
    </div>
  );
}

function MirrorStructure({ data }: { data: typeof SURAH_DATA.diagrams.mirrorStructure }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {/* Opening frame */}
      <div
        className="rounded-xl p-3 border border-white/[0.06]"
        style={{ backgroundColor: data.opening.color + "0a", borderLeftWidth: "3px", borderLeftColor: data.opening.color }}
      >
        <div className="text-xs font-semibold font-sans" style={{ color: data.opening.color }}>
          {data.opening.label}{" "}
          <span className="text-cream-muted/50">v.{data.opening.ayahs}</span>
        </div>
        <p className="text-xs text-cream/60 mt-1 font-body">{data.opening.desc}</p>
      </div>

      {/* Mirror pairs */}
      {data.pairs.map((pair, i) => (
        <div key={i} className="space-y-2">
          <div className="text-xs font-medium text-cream-muted/50 uppercase tracking-wider px-1 font-sans">
            {pair.tag}
          </div>
          <div className="flex gap-2">
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
        </div>
      ))}

      {/* Closing frame */}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">
          ✦ {data.closing.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.closing.ayahs}</span>
        </div>
        <p className="text-sm italic text-cream font-body">{data.closing.desc}</p>
      </div>
    </div>
  );
}

function RefrainPattern({ data }: { data: typeof SURAH_DATA.diagrams.refrainPattern }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.elements.map((el, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? el.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: el.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: el.color }}>
                {el.hasRoot ? "◉" : "○"} {el.form}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                v.{el.ayah} · {el.role}
              </span>
            </div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{el.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 italic font-sans">
        {data.rootNote}
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
          {activeTab === "mirror" && <MirrorStructure data={d.diagrams.mirrorStructure} />}
          {activeTab === "refrain" && <RefrainPattern data={d.diagrams.refrainPattern} />}
          {activeTab === "arc" && <SectionJourney data={d.diagrams.sectionJourney} />}
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
