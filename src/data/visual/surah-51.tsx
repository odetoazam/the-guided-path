"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ADH-DHARIYAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/adh-dhariyat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Adh-Dhariyat",
  arabicName: "الذّاريات",
  meaning: "The Scattering Winds",
  number: 51,
  ayahCount: 60,
  period: "Makki",
  juz: "26–27",
  movements: 4,
  thesis:
    "A sixty-ayah prosecution that opens by swearing on invisible forces and closes with the reason you exist — building through cosmic oaths, creation-signs, and a gallery of ruined nations until ayah 56 delivers the verdict: you were made for worship, and the evidence has been surrounding you the entire time.",
  reflectionUrl: "/surahs/adh-dhariyat",
  readTime: "20 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"qasas","english":"Quranic Narratives"}],
  heartVerse: {
    arabic: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
    ayahRef: "51:56",
    translation: "And I did not create the jinn and mankind except to worship Me.",
    why: "Nine words in Arabic that have defined Islamic theology of purpose for fourteen centuries. The exclusive particle illa narrows the entire scope of human and jinn existence to a single function. Fifty-five ayahs of evidence — cosmic, personal, historical — have been building toward this sentence. The purpose of existence is worship, and the surah presents the entire visible and invisible universe as evidence for why that purpose is inescapable.",
  },

  audio: { surahNumber: 51, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Evidence File",
      subtitle: "Four movements: cosmic oaths → conscience → historical gallery → the purpose of existence",
      sections: [
        { ayahs: "1–6", title: "The Cosmic Oaths", color: "#4ecdc4", desc: "Four oaths sworn on invisible forces — scattering winds, burden-bearing clouds, gliding ships, distributing angels — each one moving further from direct perception. The verdict lands in two emphatic declarations: the promise is true, and the reckoning will occur." },
        { ayahs: "7–23", title: "Conscience and Creation-Signs", color: "#9b7fd4", desc: "The deniers are diagnosed as incoherent — mukhtalif, internally contradictory. The muttaqun are described as people who slept little and sought forgiveness before dawn. Then three fields of evidence: the earth, your own selves, the sky. The section seals with an oath: all of this is as certain as the fact that you speak." },
        { ayahs: "24–46", title: "The Gallery of Ruins", color: "#e07a8a", desc: "Ibrahim's angel-guests deliver joy and ruin at the same table. Then five destructions accelerate in rapid succession — Lut's people, Pharaoh, 'Ad and the barren wind, Thamud and the thunderbolt, the people of Nuh — each shorter than the last, evidence overflowing until even the flood of Nuh needs only one ayah." },
        { ayahs: "47–60", title: "The Purpose", color: "#C9A84C", isPivot: true, desc: "The surah lifts from history to cosmology — heaven built with power, earth spread out, pairs in everything — and then delivers the sentence the entire prosecution has been building toward: 'I did not create jinn and mankind except to worship Me.' Everything before is evidence. Everything after is consequence." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's movements mirror each other around a theological center",
      pairs: [
        {
          left: { label: "Cosmic Oaths", ayahs: "1–6", desc: "The promise is declared true through four oaths sworn on invisible forces — winds, clouds, ships, angels" },
          right: { label: "Final Warning", ayahs: "59–60", desc: "Woe to the disbelievers from their Day which they are promised — the same root wa-'-da frames the closing" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Deniers vs. Believers", ayahs: "7–19", desc: "The confused deniers contrasted with the God-conscious who pray before dawn and share their wealth" },
          right: { label: "Flee to God", ayahs: "50–58", desc: "The command to flee to Allah, the purpose of creation, and the self-sufficiency of God who needs no provision" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Creation-Signs", ayahs: "20–23", desc: "Earth, self, sky — evidence so close it surrounds the listener's own body and consciousness" },
          right: { label: "Cosmic Architecture", ayahs: "47–49", desc: "Heaven built with power, earth spread out, pairs created from everything — creation-signs from the divine perspective" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Historical Gallery", ayahs: "24–46",
        desc: "Ibrahim's angel-guests, five destroyed nations — history is the surah's primary exhibit.",
        note: "The center is where the surah lingers longest. Cosmic signs frame the argument; historical evidence is the argument.",
      },
    },
    deductiveFunnel: {
      title: "The Provision Arc",
      subtitle: "The word rizq (provision) threads through the surah, carrying its argument about the direction of dependence",
      layers: [
        { depth: 1, label: "Invisible Provision", ayah: "1–4", arabic: "وَالذَّارِيَاتِ ذَرْوًا", desc: "The opening oaths swear on forces that carry, distribute, and deliver — unseen agents of provision moving through the cosmos. The winds scatter seeds, the clouds carry rain, the ships carry goods, the angels carry divine commands.", color: "#4ecdc4" },
        { depth: 2, label: "Provision in the Sky", ayah: "22", arabic: "وَفِي السَّمَاءِ رِزْقُكُمْ", desc: "In the sky is your provision and what you are promised. Rizq appears here as something above you — descending, given, beyond your control. The direction of dependence flows downward from heaven.", color: "#9b7fd4" },
        { depth: 3, label: "The Purpose", ayah: "56", arabic: "إِلَّا لِيَعْبُدُونِ", desc: "You were created to worship — not to provide. The verb ya'budun carries the physical image of a path worn smooth by repeated walking. Worship is the beaten track of the soul returning to its source.", color: "#C9A84C" },
        { depth: 4, label: "God Needs Nothing", ayah: "57–58", arabic: "مَا أُرِيدُ مِنْهُم مِّن رِّزْقٍ", desc: "I do not want from them any provision. The arc completes: God provides everything, God needs nothing. Rizq flows one way — from Creator to created — and never in reverse.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah operates at the level of why before it reaches how — every absence is a design choice",
      absences: [
        { item: "No extended legislation", note: "No dietary laws, no rules of inheritance, no instructions for community organization. Adh-Dhariyat is building the foundation that every commandment elsewhere in the Quran rests upon." },
        { item: "No dialogue with the deniers", note: "Their objections are characterized in passing — mukhtalif (confused), yu'fakuna (deluded) — but the surah does not pause to argue with them. It argues past them, to the believer who might momentarily waver." },
        { item: "No extended moral instruction", note: "If the question 'why do I exist?' has not been answered, no ethical code can stand on its own. The surah answers that question first." },
        { item: "No Ibrahim arguing for Lut's people", note: "In Surah Hud, Ibrahim pleads on behalf of Lut's community. Here, he asks the angels' mission and accepts the answer. The Dhariyat version shows submission — acceptance as itself a form of evidence." },
        { item: "No urgency in the closing warning", note: "The surah tells the wrongdoers not to rush — their portion is coming like the portion of their predecessors. The patience is the confidence. The case has already been won." },
      ],
    },
  },

  contentNodes: [
    { concept: "Ayah 56 — the most concise statement of human purpose", type: "surah-specific", articleSlug: "purpose-creation-51-56" },
    { concept: "Ibrahim's hospitality scene — awjasa and concealed fear", type: "surah-specific", articleSlug: "ibrahim-hospitality-51-24-30" },
    { concept: "Dhariyat–Tur diptych: evidence file and cross-examination", type: "cross-surah", articleSlug: "dhariyat-tur-diptych" },
    { concept: "Rizq theology — provision flows one way", type: "cross-surah", articleSlug: "rizq-provision-theology" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "evidence", label: "Evidence" },
  { id: "ring", label: "Ring" },
  { id: "provision", label: "Provision" },
  { id: "absent", label: "Absences" },
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
        Invisible forces → sky provision → purpose → divine self-sufficiency
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
          {activeTab === "evidence" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "provision" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
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
