"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MURSALAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-mursalat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mursalat",
  arabicName: "المُرسَلَات",
  meaning: "Those Sent Forth",
  number: 77,
  ayahCount: 50,
  period: "Makki",
  juz: 29,
  movements: 7,
  thesis:
    "A fifty-ayah surah that turns the evidence of your own existence into the case for your accountability, repeating its verdict with the patience of someone who knows the accused has nothing left to say.",
  reflectionUrl: "/surahs/al-mursalat",
  readTime: "20 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "أَلَمْ نَجْعَلِ الْأَرْضَ كِفَاتًا ﴿٢٥﴾ أَحْيَاءً وَأَمْوَاتًا",
    ayahRef: "77:25–26",
    translation: "Have We not made the earth a container — for the living and the dead?",
    why: "The center of gravity in the ring composition. One word — kifatan — holds both the cradle and the grave. The living and the dead share the same earth. The sorting the surah promises has always been present in the nature of the ground you stand on.",
  },

  audio: { surahNumber: 77, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Prosecutor's Case",
      subtitle: "Seven movements, ten refrains, nine proofs — one unanswerable question",
      sections: [
        { ayahs: "1–15", title: "The Cosmic Oaths", color: "#4ecdc4", desc: "Five staccato oaths — force, spread, separation, message — resolving into a vision of cosmic dissolution. Stars dimmed, sky torn, mountains blown away, messengers gathered. The Day of Sorting is named. The first refrain falls." },
        { ayahs: "16–19", title: "The Destroyed Nations", color: "#e07a8a", desc: "Three ayahs reduce the entire history of divine punishment to a formula: former peoples destroyed, later ones followed, criminals dealt with. No names, no cities. The pattern is so established it needs no illustration." },
        { ayahs: "20–24", title: "The Creation Proof", color: "#9b7fd4", desc: "From history to biology — 'Did We not create you from a liquid disdained?' Fluid, firm lodging, measured term, proportioning. Your own body testifies against your denial." },
        { ayahs: "25–28", title: "The Earth Proof", color: "#C9A84C", isPivot: true, desc: "The earth as kifatan — a container that gathers the living and the dead into itself. Mountains for stability, sweet water for sustenance. The center of the ring: one ground, two conditions." },
        { ayahs: "29–40", title: "Fire and Silence", color: "#e07a8a", desc: "The evidence ends, the verdict begins. 'Proceed to what you denied.' A false shade, sparks like palaces, yellow camels of fire. Then the devastating pivot: they cannot speak. They cannot make excuses. Every exit their arguments might have used has been preemptively closed." },
        { ayahs: "41–44", title: "The Righteous", color: "#4ecdc4", desc: "For the first time, the surah breathes. Real shade, real springs, real fruit. The same refrain that followed the fire now follows the garden — but its meaning shifts from sentence to lament: woe to those who lost this." },
        { ayahs: "45–50", title: "The Closing Question", color: "#9b7fd4", desc: "Direct address to the deniers. 'Eat and enjoy a little — you are criminals.' The only mention of worship: they refused to bow. And then the terminal question: 'In what message after this will they believe?'" },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah opens by sending a message and closes by asking if it was received",
      pairs: [
        {
          left: { label: "The Claim", ayahs: "1–15", desc: "Cosmic oaths, Day of Sorting — judgment is real, coming, inevitable" },
          right: { label: "The Claim Fulfilled", ayahs: "41–50", desc: "Righteous rewarded, deniers confronted — the closing question: in what message after this?" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Historical Evidence", ayahs: "16–19", desc: "Destroyed nations — unnamed, universal, reduced to a law of nature" },
          right: { label: "Silence of the Accused", ayahs: "35–40", desc: "They cannot speak. The Day of Sorting named again. The challenge: plan against Me." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Biological Evidence", ayahs: "20–24", desc: "Created from fluid — your body testifies against your denial" },
          right: { label: "The Fire", ayahs: "29–34", desc: "What the created body will experience — the false shade, the sparks, the flames" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Earth as Container", ayahs: "25–28",
        desc: "Have We not made the earth a container — for the living and the dead?",
        note: "The center of the ring. The word kifatan holds both cradle and grave. The sorting the surah promises has always been embedded in the ground you walk on.",
      },
    },
    deductiveFunnel: {
      title: "The Refrain's Arc",
      subtitle: "The same ten words carry different weight depending on what precedes them",
      layers: [
        { depth: 1, label: "After the Day of Sorting", ayah: "15", arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", desc: "The first strike — eschatological weight. The Day has been named, its cosmic signs described. The refrain announces: this is real, and denying it has consequences.", color: "#4ecdc4" },
        { depth: 2, label: "After the Destroyed Nations", ayah: "19", arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", desc: "Historical weight. The pattern of destruction is established — unnamed, universal. The refrain now carries centuries of precedent.", color: "#e07a8a" },
        { depth: 3, label: "After the Body Proof", ayah: "24", arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", desc: "Biological weight. You were fluid — your own origin testifies. The refrain is now personal: the evidence is inside you.", color: "#9b7fd4" },
        { depth: 4, label: "After the Garden", ayah: "45", arabic: "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", desc: "The same words after reward carry the weight of loss. This is no longer a sentence — it is a lament. Woe to those who lost shade and springs and fruit.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The door that other Makkan surahs leave open — even slightly — this surah has closed",
      absences: [
        { item: "No named prophets", note: "Not a single prophet is named. The destroyed nations are referred to only as 'the former peoples' and 'the later ones.' The pattern needs no illustration." },
        { item: "No ethical commands", note: "No instruction to pray, give, or be patient. The only mention of worship appears as a refusal — 'when told to bow, they do not bow.' Even prayer becomes evidence for the prosecution." },
        { item: "No direct address to the Prophet", note: "No 'O Messenger,' no consolation, no instruction. The surah speaks past the Prophet to deliver its verdict to the deniers directly." },
        { item: "No mercy language", note: "The word rahma does not appear. The word tawba (repentance) does not appear. The door that other surahs leave open, this surah has closed." },
        { item: "No voice for the deniers", note: "The surah speaks ten times with its refrain. The deniers speak zero. Ayah 35: 'This is a Day they will not speak.' Their silence is the structural counterpart to the refrain's relentlessness." },
      ],
    },
  },

  contentNodes: [
    { concept: "Kifatan — the earth as container for living and dead", type: "surah-specific", articleSlug: "kifatan-earth-container-77-25" },
    { concept: "The tenfold refrain — repetition as semantic progression", type: "surah-specific", articleSlug: "tenfold-refrain-77" },
    { concept: "Al-Mursalat to An-Naba' — question answered by question", type: "cross-surah", articleSlug: "mursalat-naba-question-pair" },
    { concept: "Yawm al-fasl — the Day of Sorting across the Quran", type: "cross-surah", articleSlug: "yawm-fasl-day-sorting" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "case", label: "Case" },
  { id: "ring", label: "Ring" },
  { id: "refrain", label: "Refrain" },
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
        Eschatological → historical → biological → the weight of loss
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
              <div className="text-2xl font-bold text-gold-500 font-serif">10</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Refrains</div>
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
          {activeTab === "case" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "refrain" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
