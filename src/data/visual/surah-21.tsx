"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ANBIYA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-anbiya
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Anbiya",
  arabicName: "الأنبياء",
  meaning: "The Prophets",
  number: 21,
  ayahCount: 112,
  period: "Makki",
  juz: 17,
  movements: 4,
  thesis:
    "Sixteen prophets gathered as witnesses in a single courtroom — each one testifying to the same cry-and-rescue pattern until the pattern itself becomes the proof that God answers, and always has.",
  reflectionUrl: "/surahs/al-anbiya",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    ayahRef: "21:87",
    translation: "There is no god but You; glory be to You; I have been among the wrongdoers.",
    why: "Yunus's cry from inside the whale — three concentric darknesses: night, sea, belly. The prayer stripped to its essence: pure tawhid, pure recognition of fault, spoken from the most enclosed and hopeless space in the surah. The Prophet said no Muslim calls upon God with this prayer except that God answers. The gallery's emotional peak and the surah's universal promise in a single breath.",
  },

  audio: { surahNumber: 21, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Summation",
      subtitle: "Wake-up call → Ibrahim → gallery → final gathering",
      sections: [
        { ayahs: "1–47", title: "The Wake-Up Call", color: "#4ecdc4", desc: "The surah opens mid-argument: their reckoning has drawn near while they turn away in heedlessness. Two waves — a theological challenge to the Quraysh about God's oneness, then a historical reminder that every mocking civilization was destroyed. The heavens and earth were ratq, a sealed mass, and God split them apart. Every soul will taste death." },
        { ayahs: "48–73", title: "Ibrahim and the Idols", color: "#9b7fd4", isPivot: true, desc: "The dramatic centerpiece. Ibrahim smashes the idols, hangs the axe on the largest, tells the people: ask him. They admit 'you know these do not speak' — and in that admission their theology collapses. Then they reverse themselves. The fire follows. God commands it to become coolness and peace. Ibrahim walks out." },
        { ayahs: "74–91", title: "The Gallery", color: "#e07a8a", desc: "Prophet after prophet in rapid succession — Lut, Nuh, Dawud, Sulayman, Ayyub, Ismail, Idris, Dhul-Kifl, Yunus, Zakariyya, Maryam — each one a variation on the same cry-and-rescue pattern. The compression is the point. By the fifth entry the pattern has become liturgical. Wa-kadhalika nunji al-mu'minin: this is how We rescue the believers." },
        { ayahs: "92–112", title: "The Final Gathering", color: "#C9A84C", desc: "The widest lens. The prophets were one community — umma wahida — and humanity broke it apart. The Day when heaven is folded like a scroll. The universe that was torn open will be folded shut. And the surah's thesis: We have not sent you except as a mercy for all worlds. Then the question that hangs: will you submit?" },
      ],
    },
    chiasticRing: {
      title: "Sleep to Waking",
      subtitle: "The surah opens with people asleep to their reckoning and closes with the demand for a response",
      pairs: [
        {
          left: { label: "Heedlessness", ayahs: "1–2", desc: "Their reckoning draws near while they turn away in ghafla — willed sleep. Every fresh reminder, they listen while playing." },
          right: { label: "The Question", ayahs: "108", desc: "Your God is one God — fa-hal antum muslimun? Will you submit? The sleep they chose must end in a decision." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Cosmic Signs", ayahs: "30–33", desc: "The heavens and earth were ratq — a sealed mass — split apart. From water, every living thing. Sun and moon swimming in their orbits." },
          right: { label: "Cosmic Folding", ayahs: "104", desc: "The Day We fold the heaven like folding a scroll. As We began creation, We will repeat it. The ratq-fatq finds its eschatological mirror." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Ibrahim's Story", ayahs: "48–73", desc: "One prophet's confrontation told at length — idols smashed, fire commanded cool, deliverance complete." },
          right: { label: "The Gallery", ayahs: "74–91", desc: "Many prophets in compressed form — each one a variation on the same cry-and-rescue. One story expanded, then the pattern proven universal." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Yunus's Cry", ayahs: "87–88",
        desc: "La ilaha illa anta subhanaka inni kuntu min al-zalimin — from inside the whale, at night, at the bottom of the sea.",
        note: "The gallery's emotional peak. Three darknesses, and the cry still reached. The response generalizes the entire surah: wa-kadhalika nunji al-mu'minin — this is how We rescue the believers.",
      },
    },
    deductiveFunnel: {
      title: "The Cry-and-Rescue Pattern",
      subtitle: "Each prophet calls out (nada) — God answers (fa-istajabna) — rescue follows",
      layers: [
        { depth: 1, label: "Nuh Cries Out", ayah: "76", arabic: "إِذْ نَادَىٰ مِن قَبْلُ فَاسْتَجَبْنَا لَهُ", desc: "When he called out before — fa-istajabna lahu — We answered him and saved him and his family from the great affliction. The pattern's first iteration: cry, answer, rescue.", color: "#4ecdc4" },
        { depth: 2, label: "Ayyub Cries Out", ayah: "83–84", arabic: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", desc: "Harm has touched me, and You are the most merciful of the merciful. God answers, removes the affliction, restores the family. A mercy from Us and a reminder for the worshippers.", color: "#9b7fd4" },
        { depth: 3, label: "Yunus Cries Out", ayah: "87", arabic: "فَنَادَىٰ فِي الظُّلُمَاتِ", desc: "He called out in the darknesses — fi al-zulumat. Night, sea, whale. Three concentric layers, and from inside all of them: pure tawhid, pure confession. The pattern reaches its most compressed and desperate form.", color: "#e07a8a" },
        { depth: 4, label: "Zakariyya Cries Out", ayah: "89–90", arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا", desc: "Do not leave me alone. God gives him Yahya, restores his wife. They used to hasten in good deeds, call upon Us in hope and fear, and were humbly submissive before Us.", color: "#C9A84C" },
        { depth: 5, label: "The Universal Promise", ayah: "88", arabic: "وَكَذَٰلِكَ نُنجِي الْمُؤْمِنِينَ", desc: "And thus do We rescue the believers. Present tense. Still active. The Yunus verse generalizes the entire gallery into a standing offer: this is how God operates. The rescue of the believers is not an exception. It is the rule.", color: "#f28585" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah trusts its evidence — every absence amplifies the argument",
      absences: [
        { item: "No direct ethical instruction", note: "Sixteen prophets named and almost no commands to pray, fast, give charity, or observe any specific practice. The omission is structural — Al-Anbiya builds the case for tawhid entirely through prophetic witness and the cry-and-rescue pattern. The moral implications are left for the listener to draw." },
        { item: "No extended narrative for most prophets", note: "Ibrahim receives twenty-five ayahs. Most prophets receive two or three, some only a single line. The compression is the argument — each entry adds another witness confirming the same testimony. A family register versus a family portrait." },
        { item: "No demand for conversion", note: "After all the evidence — cosmic arguments, Ibrahim's confrontation, sixteen prophets — the surah does not demand. It asks: fa-hal antum muslimun? Will you submit? The question hangs. The silence that follows is the space for the listener's decision." },
        { item: "No mention of Muhammad's own story", note: "The surah that gathers more prophets than almost any other never narrates the Prophet's own experience. He is the summoner, not the subject. The evidence comes from everyone who preceded him." },
        { item: "No playing — la'ibin refuted", note: "The opening says people listen to reminders while playing — yal'abun. Ayah 16 declares the universe was not created in play — la'ibin. The surah structurally eliminates the possibility that any of this is unserious." },
      ],
    },
  },

  contentNodes: [
    { concept: "Yunus's du'a — the most authenticated rescue prayer", type: "surah-specific", articleSlug: "yunus-dua-anbiya-87" },
    { concept: "Ratq and fatq — the universe torn open", type: "surah-specific", articleSlug: "ratq-fatq-anbiya-30" },
    { concept: "Umma wahida — the prophets as one family", type: "cross-surah", articleSlug: "umma-wahida-anbiya-muminun" },
    { concept: "Ya naru kuni bardan wa salama — the fire commanded cool", type: "cross-surah", articleSlug: "ya-naru-kuni-bardan-anbiya-69" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "summation", label: "Summation" },
  { id: "ring", label: "Ring" },
  { id: "pattern", label: "Pattern" },
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
              marginLeft: `${layer.depth * 4}px`,
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
        Nuh cries → Ayyub cries → Yunus cries → Zakariyya cries → the believers are rescued
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
              <div className="text-2xl font-bold text-gold-500 font-serif">16</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Prophets</div>
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
          {activeTab === "summation" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "pattern" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
