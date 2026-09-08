"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NAZIAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-naziat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Naziat",
  arabicName: "النَّازِعَات",
  meaning: "Those Who Pull Out",
  number: 79,
  ayahCount: 46,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "A forty-six-ayah cross-examination that compresses the argument for resurrection into a single unanswerable question, sets the story of the greatest tyrant against the fate of a single soul, and then collapses the distance between now and the Day until a lifetime fits inside an afternoon.",
  reflectionUrl: "/surahs/an-naziat",
  readTime: "22 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"}],
  heartVerse: {
    arabic: "وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِۦ وَنَهَى ٱلنَّفْسَ عَنِ ٱلْهَوَىٰ فَإِنَّ ٱلْجَنَّةَ هِىَ ٱلْمَأْوَىٰ",
    ayahRef: "79:40–41",
    translation: "But as for the one who feared standing before their Lord and restrained the self from desire — then the Garden is the refuge.",
    why: "The surah's complete ethical teaching compressed into two conditions: fear of the divine encounter and restraint of the desiring self. No list of prohibitions, no catalog of virtues — just these two. The person who carries the awareness that they will stand before God, and who holds the self back from what it craves, is the person An-Naziat identifies as saved.",
  },

  audio: { surahNumber: 79, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Cross-Examination",
      subtitle: "Four strokes: oaths → precedent → confrontation → verdict",
      sections: [
        { ayahs: "1–14", title: "The Forces and the Tremor", color: "#e07a8a", desc: "Five oaths crash open the surah — forces pulling, drawing, gliding, racing, governing. The cosmic machinery at work before the listener can settle. Then the two blasts: the quaking and its successor. Hearts pounding, eyes humbled. The skeptics ask if decayed bones can really be restored — and the surah answers with devastating brevity: one shout, and they are standing on the open earth." },
        { ayahs: "15–26", title: "The Confrontation in the Valley", color: "#9b7fd4", desc: "The most compressed telling of the Musa-Pharaoh story anywhere in the Quran — twelve ayahs where other surahs use sixty. No burning bush, no staff, no sorcerers, no sea. Just the skeleton: God called Musa, sent him to Pharaoh who had transgressed, offered purification and guidance. Pharaoh denied, gathered, proclaimed himself the highest lord — and God seized him as an exemplary punishment." },
        { ayahs: "27–33", title: "The Question That Cannot Be Answered", color: "#C9A84C", isPivot: true, desc: "A-antum ashaddu khalqan ami as-sama'? — Are you a more difficult creation, or the heaven? He built it. The surah wheels from narrative to direct confrontation. The heaven raised and proportioned, the earth spread, water drawn, mountains anchored — all provision for you. The question cannot be answered without conceding that resurrection is within God's power. Silence concedes it too." },
        { ayahs: "34–46", title: "The Hour and the Dissolving Afternoon", color: "#4ecdc4", desc: "The great overwhelming event arrives. Two fates in perfect parallel: the one who transgressed and preferred worldly life finds the Fire; the one who feared standing before their Lord and restrained the self from desire finds the Garden. Then the Quraysh ask when — and the answer strips the question bare: you are only a warner. And when they see it, a lifetime will feel like an afternoon or its morning." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Cosmic forces and collapsing time mirror each other across the surah's center",
      pairs: [
        {
          left: { label: "Angelic Forces", ayahs: "1–5", desc: "Five oaths about unseen powers — pulling, drawing, gliding, racing, governing. The machinery of the cosmos before you know what it is building toward." },
          right: { label: "Creative Power", ayahs: "27–33", desc: "Heaven built, earth spread, mountains anchored. The same divine agency displayed at cosmic scale — now as evidence that resurrection is the smaller act." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Tremor and the Skeptics", ayahs: "6–14", desc: "Two blasts, trembling hearts, downcast eyes. The skeptics ask about decayed bones — one shout answers them. Resurrection as disputed future." },
          right: { label: "The Hour and Two Fates", ayahs: "34–46", desc: "The overwhelming event, Hellfire displayed, the transgressor's refuge and the God-conscious person's refuge. Resurrection as realized present. A lifetime becomes an afternoon." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Musa and Pharaoh", ayahs: "15–26",
        desc: "The historical proof that the pattern is real — transgression, warning, refusal, seizure.",
        note: "The center of gravity. Every argument before it points toward why this story matters. Every argument after draws its force from this story having happened. The narrative is a template: the Quraysh are inside the diagram.",
      },
    },
    keywordThread: {
      title: "The Thread of Fear",
      subtitle: "The root kh-sh-y (reverential fear) threads through the surah as its single through-line",
      layers: [
        { depth: 1, label: "The Goal for Pharaoh", ayah: "19", arabic: "وَأَهْدِيَكَ إِلَىٰ رَبِّكَ فَتَخْشَىٰ", desc: "Musa's offer: let me guide you to your Lord so you would fear Him. Khashyah is what the prophet was sent to cultivate. Pharaoh refused.", color: "#9b7fd4" },
        { depth: 2, label: "Who the Lesson Reaches", ayah: "26", arabic: "إِنَّ فِى ذَٰلِكَ لَعِبْرَةً لِّمَن يَخْشَىٰٓ", desc: "In Pharaoh's destruction is a lesson — but only for the one who fears. The same quality Pharaoh was offered and refused becomes the condition for learning from his ruin.", color: "#4ecdc4" },
        { depth: 3, label: "Who Is Saved", ayah: "40", arabic: "وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِۦ", desc: "The one who feared standing before their Lord and restrained the self from desire — the Garden is their refuge. Fear becomes the orientation of a life around an encounter one takes seriously.", color: "#C9A84C" },
        { depth: 4, label: "Who the Warning Reaches", ayah: "45", arabic: "إِنَّمَآ أَنتَ مُنذِرُ مَن يَخْشَىٰهَا", desc: "You are only a warner for those who fear it. The chain completes: khashyah is the goal of the mission, the condition for learning, the quality that saves, and the prerequisite for hearing the warning at all.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips the Musa story to its skeleton — every absence sharpens the pattern",
      absences: [
        { item: "No burning bush, no staff, no serpent", note: "The most famous elements of the Musa story are absent. No shoes removed, no fire described, no rod cast down. What remains is the irreducible skeleton: a call, a command, a sign, a denial, a seizure. The compression transforms narrative into template." },
        { item: "No Harun", note: "In nearly every other Quranic telling, Musa asks for or is given Harun as support. Here Musa stands alone before Pharaoh — one messenger, one tyrant, one outcome. The solitude mirrors the Prophet's own position in Mecca." },
        { item: "No ethical commands", note: "No instructions for prayer, charity, fasting, or social conduct. The closest the surah comes is the portrait of the saved: the one who feared and restrained. An-Naziat assumes that the reality of the Hour, once seen clearly, generates its own ethics." },
        { item: "No sorcerers, no sea, no escape", note: "The extended confrontation — sorcerers prostrating, the Red Sea parting, the Israelites crossing — is all absent. The story is not about Musa's mission. It is about a pattern: transgression, warning, denial, destruction." },
        { item: "Allah named only once", note: "The divine name Allah appears only when Pharaoh is seized (ayah 25). The surah's preferred name is Rabb — Lord, Sustainer — the intimate authority who calls, creates, and before whom one will stand. The personal register, not the theological abstract." },
      ],
    },
  },

  contentNodes: [
    { concept: "Khashyah — the fear that saves", type: "surah-specific", articleSlug: "khashyah-fear-thread-79" },
    { concept: "Ana rabbukumu al-a'la — the stolen name", type: "surah-specific", articleSlug: "pharaoh-stolen-name-79-24" },
    { concept: "An-Naba / An-Naziat diptych", type: "cross-surah", articleSlug: "naba-naziat-diptych" },
    { concept: "Naha an-nafsa 'an il-hawa — restraint as the single ethic", type: "cross-surah", articleSlug: "restraint-single-ethic-79-40" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "cross", label: "Cross-Exam" },
  { id: "ring", label: "Ring" },
  { id: "fear", label: "Fear" },
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

function KeywordThread({ data }: { data: typeof SURAH_DATA.diagrams.keywordThread }) {
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
        Goal offered → lesson conditioned → salvation defined → warning limited
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
          {activeTab === "cross" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "fear" && <KeywordThread data={d.diagrams.keywordThread} />}
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
