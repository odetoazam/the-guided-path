"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AR-RA'D — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ar-rad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ar-Ra'd",
  arabicName: "الرَّعد",
  meaning: "The Thunder",
  number: 13,
  ayahCount: 43,
  period: "Madani",
  juz: 13,
  movements: 4,
  thesis:
    "A forty-three-ayah argument that the physical world is already saying everything God needs said — thunder doing tasbih, soil preaching, foam vanishing — and the only question left is whether you have the kind of heart that can hear it.",
  reflectionUrl: "/surahs/ar-rad",
  readTime: "20 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayahRef: "13:28",
    translation: "Truly, in the remembrance of God do hearts find rest.",
    why: "Embedded not in a devotional passage but inside the surah's ethical portrait — between people who keep covenants and people who break them. The rest it names is not emotional comfort; it is the settledness of ground after rain. The heart that remembers is like soil that holds water.",
  },

  audio: { surahNumber: 13, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Evidence",
      subtitle: "Four movements: earth as book → demand & knowledge → moral center → prophetic witness",
      sections: [
        { ayahs: "1–4", title: "The Earth Speaks", color: "#4ecdc4", desc: "The surah opens the earth like a book — rivers running through it, fruit in pairs, adjacent plots receiving the same rain and yielding different harvests. The double meaning of ayat (verses and signs) is the surah's organizing engine. Creation is the evidence, laid out with the calm of someone presenting something obvious." },
        { ayahs: "5–18", title: "The Demand & the Answer", color: "#e07a8a", desc: "Those who look at all this and demand something else — miracles, spectacle. The surah answers with God's total knowledge (what every womb carries, measured to the atom), the thunder doing tasbih, and the parable of foam and water: falsehood rises, looks dominant, vanishes. What benefits people stays in the earth." },
        { ayahs: "19–29", title: "The Moral Center", color: "#C9A84C", isPivot: true, desc: "The ulu al-albab — people of deep understanding — drawn in the most detailed ethical portrait in the Quran. They keep covenants, join what should be joined, repel evil with good. Between their portrait and its opposite sits 13:28: 'In the remembrance of God do hearts find rest.' The heart that remembers is ground that holds rain." },
        { ayahs: "30–43", title: "The Witness", color: "#9b7fd4", desc: "The surah returns to the Prophet, addresses his grief directly, reminds him that guidance belongs to God, and closes with the question of witness: 'God is sufficient as a witness between me and you, and whoever has knowledge of the Book.' The surah spent its length showing you creation — and ends asking you to testify." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing form a concentric architecture around the thunder",
      pairs: [
        {
          left: { label: "Signs of the Book", ayahs: "1–4", desc: "The Book's signs presented through creation — rivers, fruit, soil receiving the same rain" },
          right: { label: "Knowledge of the Book", ayahs: "36–43", desc: "Knowledge of the Book qualifies one to be a witness — from signs presented to testimony accepted" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Demand", ayahs: "5–7", desc: "Why no miracle? The Quraysh want spectacle. The surah describes what is already there" },
          right: { label: "God Could Have Guided All", ayahs: "30–35", desc: "If God willed, all humanity would be guided — the weight of refusal was never the Prophet's to carry" },
          color: "#e07a8a",
        },
        {
          left: { label: "God's Knowledge", ayahs: "8–11", desc: "Total surveillance and the mechanism of change: God does not change a people until they change themselves" },
          right: { label: "The Ethical Portrait", ayahs: "19–29", desc: "The ulu al-albab — what the inner change looks like in practice, and the rest hearts find in remembrance" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Thunder", ayahs: "12–18",
        desc: "The thunder glorifies His praise, and the angels out of awe of Him. The foam vanishes; what benefits people stays in the earth.",
        note: "The surah's center of gravity is not an argument or a command — it is an image of the physical world doing theology on its own.",
      },
    },
    deductiveFunnel: {
      title: "The Soil Parable",
      subtitle: "The surah builds from evidence through denial to the principle that makes sense of both",
      layers: [
        { depth: 1, label: "Same Water, Different Fruit", ayah: "4", arabic: "يُسْقَىٰ بِمَاءٍ وَاحِدٍ", desc: "Adjacent plots of soil receive the same rain and yield radically different harvests. The parable of revelation itself: the same message falls on different hearts. What grows depends on the soil.", color: "#4ecdc4" },
        { depth: 2, label: "The Mechanism of Change", ayah: "11", arabic: "لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", desc: "The surah's argumentative hinge. God built the system; you operate within it. The soil does not choose its rain, but the heart chooses its orientation. The harvest follows.", color: "#C9A84C" },
        { depth: 3, label: "Foam and Water", ayah: "17", arabic: "فَأَمَّا الزَّبَدُ فَيَذْهَبُ جُفَاءً", desc: "Falsehood is the foam — visible, loud, apparently dominant, temporary. Truth is what settles into the ground and remains. You do not need to defeat the foam. You need to be the thing that remains.", color: "#e07a8a" },
        { depth: 4, label: "Hearts at Rest", ayah: "28", arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", desc: "The heart that remembers God is like soil that receives rain and holds it. Itmi'nan — the deep settledness — is connected to how you live, not only how you pray. Same system, same logic.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "What the surah leaves out tells you what it has already settled",
      absences: [
        { item: "No single sustained narrative", note: "After Surah Yusuf told the most sustained story in the Quran, Ar-Ra'd follows by doing something entirely different — no prophet's story, but a panoramic argument built from creation itself. As if the Quran, having shown what a story can do, now shows what looking can do." },
        { item: "No miracle produced", note: "The Quraysh wanted the Prophet to move a mountain. The surah describes a mountain, describes a river, describes the drama in the sky — and asks why this drama does not count. The demand for spectacle is answered by pointing at what is already spectacular." },
        { item: "No resolution for the Prophet's grief", note: "The surah addresses the Prophet's pain directly but does not resolve it — it reframes it. Guidance belongs to God. The weight of people's refusal was never his to carry. The consolation is theological, not emotional." },
        { item: "No separation between devotion and ethics", note: "The verse about hearts finding rest (13:28) appears inside an ethical portrait, not a devotional one. The surah refuses to separate how you pray from how you live — rest of the heart is connected to covenant-keeping, patience, and repelling evil with good." },
        { item: "No heavenly focus without earthly ground", note: "Where other surahs look up, Ar-Ra'd keeps pulling the gaze down. The sky appears — thunder, lightning, rain — but always in service of what happens when it reaches the earth. The earth is where the meaning lands." },
      ],
    },
  },

  contentNodes: [
    { concept: "The thunder that does tasbih — creation as worship", type: "surah-specific", articleSlug: "thunder-tasbih-13-13" },
    { concept: "Foam and water — the parable of truth and falsehood", type: "surah-specific", articleSlug: "foam-water-parable-13-17" },
    { concept: "Ar-Ra'd–Ibrahim triptych: from soil to tree", type: "cross-surah", articleSlug: "rad-ibrahim-triptych" },
    { concept: "Itmi'nan — the settledness of ground after rain", type: "cross-surah", articleSlug: "itminan-settled-hearts-13-28" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "evidence", label: "Evidence" },
  { id: "ring", label: "Ring" },
  { id: "soil", label: "Soil" },
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
        Evidence → mechanism → parable → settledness
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
          {activeTab === "evidence" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "soil" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
