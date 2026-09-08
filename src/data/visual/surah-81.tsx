"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAKWIR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-takwir
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Takwir",
  arabicName: "التَّكْوِير",
  meaning: "The Folding Up",
  number: 81,
  ayahCount: 29,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "A surah that dismantles the universe in order to hold a trial for one murdered girl — and then turns to you and asks where you think you are headed.",
  reflectionUrl: "/surahs/at-takwir",
  readTime: "18 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "وَإِذَا الْمَوْءُودَةُ سُئِلَتْ ﴿٨﴾ بِأَيِّ ذَنبٍ قُتِلَتْ",
    ayahRef: "81:8–9",
    translation: "And when the infant girl buried alive is asked — for what sin were you killed?",
    why: "In the middle of cosmic destruction — suns extinguished, mountains moved, oceans boiling — the surah pauses for the smallest and most helpless victim. The question indicts the killer by honoring the victim. In a culture that treated her death as unremarkable, the Quran gives her a voice and a courtroom.",
  },

  audio: { surahNumber: 81, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Arc",
      subtitle: "Three movements: unraveling → testimony → challenge",
      sections: [
        { ayahs: "1–6", title: "The Cosmic Unraveling", color: "#e07a8a", desc: "Six images strip away the familiar world: light (sun), navigation (stars), stability (mountains), wealth (pregnant camels), natural order (wild beasts), elemental boundaries (seas). No commentary between them — each lands before the reader recovers from the last. The form enacts the content: the world is coming apart, and so is your footing." },
        { ayahs: "7–14", title: "The Human Reckoning", color: "#C9A84C", isPivot: true, desc: "The focus shifts from cosmos to conscience. Souls are paired with their deeds. The buried infant girl is asked — not the killer, but the victim — for what sin she was killed. Scrolls spread open. Sky stripped away. Hellfire ablaze. Paradise brought near. Then the main clause: every soul will know what it has brought forward." },
        { ayahs: "15–25", title: "The Oath and Testimony", color: "#9b7fd4", desc: "After the breathless cascade, something deliberate. Allah swears by retreating stars, departing night, and the dawn as it breathes — one image of gentle life after twelve of destruction. On these oaths: this is the word of a noble messenger (Jibreel), and your companion (Muhammad) is not possessed. The vision of the End is authenticated by the source of the message." },
        { ayahs: "26–29", title: "The Challenge", color: "#4ecdc4", desc: "Four ayahs bearing the weight of twenty-five. Fa-ayna tadh'habun — where are you going? A reminder for all creation, for whoever wills to walk straight — but you cannot will unless Allah wills. Human freedom and divine sovereignty held in two consecutive ayahs without collapsing either." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "From the largest external image to the most intimate internal reality",
      pairs: [
        {
          left: { label: "Cosmic Destruction", ayahs: "1–6", desc: "Stars fall, seas boil, mountains move — the visible order dismantled" },
          right: { label: "Celestial Beauty", ayahs: "15–18", desc: "Stars retreat gracefully, night departs, the dawn breathes — the same created world through a different lens" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Buried Girl's Trial", ayahs: "7–9", desc: "The smallest victim given a voice and a courtroom amid cosmic annihilation" },
          right: { label: "The Prophet's Defense", ayahs: "22–25", desc: "The man dismissed as mad is defended — he saw Jibreel on the clear horizon" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Scrolls & Reckoning", ayahs: "10–13", desc: "Deeds spread open, sky stripped, Hellfire and Paradise made present" },
          right: { label: "Noble Messenger", ayahs: "19–21", desc: "Jibreel — possessing power, secure in rank, obeyed, trustworthy — the carrier of the message about that reckoning" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Arrival", ayahs: "14",
        desc: "Every soul will know what it has brought forward.",
        note: "Twelve suspended conditions resolve into one sentence about personal accountability. The past tense (alimat) conveys certainty — it is so sure to happen it is spoken of as already completed.",
      },
    },
    deductiveFunnel: {
      title: "The Descent",
      subtitle: "From the sun to the soul — the surah's journey inward",
      layers: [
        { depth: 1, label: "The Sun Folded", ayah: "1", arabic: "إِذَا الشَّمْسُ كُوِّرَتْ", desc: "The most visible, most reliable thing in creation — wrapped up and put away like a turban wound at the end of the day. Kuwwirat carries the image of winding cloth until what was visible is concealed.", color: "#e07a8a" },
        { depth: 2, label: "The Girl Asked", ayah: "8–9", arabic: "وَإِذَا الْمَوْءُودَةُ سُئِلَتْ", desc: "From the largest cosmic image to the smallest human victim. The universe is being dismantled, and Allah stops for one murdered child. The structural choice is the theology: injustice against the powerless is what the Day of Judgment was created to answer.", color: "#9b7fd4" },
        { depth: 3, label: "The Dawn Breathes", ayah: "18", arabic: "وَالصُّبْحِ إِذَا تَنَفَّسَ", desc: "After twelve images of destruction, one image of gentle life. Tanaffas — the dawn taking its first breath. The root n-f-s (breath, soul, self) transforms in context. Beauty survives even the unraveling.", color: "#4ecdc4" },
        { depth: 4, label: "Where Are You Going?", ayah: "26", arabic: "فَأَيْنَ تَذْهَبُونَ", desc: "The entire surah compressed into a single question, carrying the weight of all twenty-five previous ayahs. From cosmos to conscience, from the sun to the soul — now the question is personal. Where are you headed, now that you know what is real?", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah lets its vision do the moral work — every absence is a deliberate silence",
      absences: [
        { item: "No moral commands", note: "No instructions on how to pray, give, or treat others. No legislation, no ethical teaching. The surah does not tell you how to live — it shows you what everything is heading toward and lets that vision do the work on its own." },
        { item: "No stories of past prophets or nations", note: "No Nuh, no Ad, no Thamud, no destroyed cities. The surah is not interested in precedent. It is interested in what is coming, and the authority of the one who brings the news." },
        { item: "No named agent of destruction", note: "The entire first section is passive constructions — the sun is folded, the stars are scattered, the mountains are moved. No agent named. The doer is so vast that naming Him would diminish the scale of the event." },
        { item: "No comfort or consolation", note: "Nothing is softened. Twelve images of annihilation, no reassurance between them. The surah's gift is not comfort — it is proportion. It recalibrates what is permanent and what is temporary." },
        { item: "No middle ground in the closing", note: "Human will is real (li-man sha'a). But human will is not sovereign (wa ma tasha'una illa an yasha'a Allah). Both truths held in consecutive ayahs without collapsing either. No resolution offered — you must live inside the tension." },
      ],
    },
  },

  contentNodes: [
    { concept: "The maw'uda — the buried girl's courtroom", type: "surah-specific", articleSlug: "mawuda-buried-girl-81" },
    { concept: "Wa al-subhi idha tanaffas — the dawn breathing", type: "surah-specific", articleSlug: "dawn-breathes-81-18" },
    { concept: "Abasa–Takwir diptych — moral blindness and cosmic unraveling", type: "cross-surah", articleSlug: "abasa-takwir-diptych" },
    { concept: "The cosmic oath surahs (81, 82, 84) — architecture of accountability", type: "cross-surah", articleSlug: "cosmic-oath-surahs-81-82-84" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "arc", label: "Arc" },
  { id: "mirror", label: "Mirror" },
  { id: "descent", label: "Descent" },
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
        Sun folded → girl asked → dawn breathes → where are you going?
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
              <div className="text-2xl font-bold text-gold-500 font-serif">12</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">When-Clauses</div>
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
          {activeTab === "arc" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "descent" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
