"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ANFAL — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-anfal
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Anfal",
  arabicName: "الأنفال",
  meaning: "The Spoils of War",
  number: 8,
  ayahCount: 75,
  period: "Madani",
  juz: "9–10",
  movements: 6,
  thesis:
    "Seventy-five ayahs that take a community disoriented by its own victory and teach it that the most important thing about winning is understanding who won — and why that knowledge restructures everything about how you live afterward.",
  reflectionUrl: "/surahs/al-anfal",
  readTime: "25 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"nasikh","english":"Abrogation"}],
  heartVerse: {
    arabic: "فَلَمْ تَقْتُلُوهُمْ وَلَٰكِنَّ اللَّهَ قَتَلَهُمْ ۚ وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَٰكِنَّ اللَّهَ رَمَىٰ",
    ayahRef: "8:17",
    translation: "It was not you who killed them; it was God who killed them. And you did not throw when you threw — it was God who threw.",
    why: "The theological center of the entire surah. The grammatical structure simultaneously affirms and recontextualizes human agency. The human act is real, confirmed in the subordinate clause — but divine agency is asserted in the main clause. The structure is the theology: human agency, fully real, nested inside divine purpose, fully sovereign.",
  },

  audio: { surahNumber: 8, reciter: "ar.alafasy" },

  fullText: "section-map",

  sectionMap: [
    { ayahs: "1–4", title: "The Dispute and the Redirect", desc: "The companions argue about spoils. God's answer dissolves the question: the spoils belong to God and the Messenger. Then a portrait of the genuine believer — trembling heart, strengthened faith, prayer, spending." },
    { ayahs: "5–19", title: "The Night Before Badr", desc: "The community wanted the caravan; God wanted the army. Rain as purification, angels descending, and the verse that reconfigures everything: 'You did not throw when you threw.'" },
    { ayahs: "20–37", title: "The Interior Threat", desc: "God comes between a person and their heart. Fear a trial that strikes everyone, not only the wrongdoers. The real danger is rot from within, not the enemy in front." },
    { ayahs: "38–41", title: "Memory and the Ruling", desc: "Remember when you were few and weak. The legal answer arrives forty ayahs late — a fifth belongs to God, the Messenger, and the vulnerable. The delay is the pedagogy." },
    { ayahs: "42–54", title: "The Geography of Providence", desc: "The second Badr narration. Positioning, timing, perception — all arranged. God made each army see what it needed to see. Reality has a depth only divine narration can reveal." },
    { ayahs: "55–75", title: "Treaties, Peace, and Belonging", desc: "Prepare for deterrence, not aggression. If they incline toward peace, incline toward it. The closing redefines wealth: not camels and swords, but bonds of faith and sacrifice." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Morning After",
      subtitle: "Six movements: dispute → divine replay → interior warning → ruling → geography → belonging",
      sections: [
        { ayahs: "1–4", title: "The Dispute", color: "#e07a8a", desc: "The companions asked 'who gets what.' God answered 'who are you.' The spoils belong to God and the Messenger — the entire framework of earned entitlement collapses. Then, rather than proceeding to rules, the surah pivots to character: hearts that tremble when God is mentioned." },
        { ayahs: "5–19", title: "The Hidden Badr", color: "#9b7fd4", desc: "A sustained replay of Badr from inside divine providence. The angels, the rain, the dread cast into enemy hearts. And at the center: 'You did not throw when you threw — it was God who threw.' Human agency confirmed in the subordinate clause, divine agency asserted in the main clause." },
        { ayahs: "20–40", title: "The Interior Warning", color: "#4ecdc4", desc: "God comes between a person and their heart. Fear a trial that will not strike only the wrongdoers — it will strike all of you. Memory as obligation: remember when you were few, deemed weak, fearing that people would snatch you away." },
        { ayahs: "41", title: "The Legal Answer", color: "#C9A84C", isPivot: true, desc: "Forty ayahs after the question was asked, the ruling arrives. A fifth belongs to God, the Messenger, the relatives, orphans, the needy, the traveler. The distance between question and answer is itself the teaching: law delivered without theological preparation produces entitlement. Law delivered after produces worship." },
        { ayahs: "42–54", title: "The Geography of Providence", color: "#3d9bd4", desc: "The second Badr narration — from the perspective of physical arrangement. The positioning no human strategist could have engineered. God made the Quraysh appear few to embolden the Muslims, and the Muslims appear many to shake the Quraysh. Same battlefield, two perceptions, both arranged." },
        { ayahs: "55–75", title: "The Architecture of Belonging", color: "#e07a8a", desc: "Treaties, deterrence, and the incline toward peace. If they want peace, choose peace — and rely upon God. The closing moves from 'who gets what' to 'who belongs to whom.' The community's real wealth was never the camels. It was the relationships forged in shared risk." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's opening material question is answered by its closing relational architecture",
      pairs: [
        {
          left: { label: "The Spoils Question", ayahs: "1", desc: "Yas'alunaka 'an al-anfal — they ask about material gain, war booty, external possessions, who earned what" },
          right: { label: "The Bonds That Endure", ayahs: "72–75", desc: "Walaya — loyalty, mutual belonging, the bonds of faith and sacrifice. Muhajirun, Ansar, the architecture of community" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Individual Believer", ayahs: "2–4", desc: "A physical portrait: trembling heart, strengthened faith, prayer, spending — the individual's interior confirmed" },
          right: { label: "The Communal Believer", ayahs: "74–75", desc: "Those who believed and emigrated and struggled — personal faith and corporate commitment, the surah insists on both" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Tawakkul — in Faith", ayahs: "2", desc: "'Upon their Lord they rely' — the believers' defining posture, placed at the surah's opening" },
          right: { label: "Tawakkul — in Peace", ayahs: "61", desc: "'If they incline toward peace, incline toward it, and rely upon God' — the same word at the turning point toward diplomacy" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "You Did Not Throw", ayahs: "17",
        desc: "It was not you who killed them; it was God who killed them. And you did not throw when you threw — it was God who threw.",
        note: "The theological center. Every section before builds toward this claim. Every section after flows from it. The spoils belong to God because the victory belongs to God.",
      },
    },
    deductiveFunnel: {
      title: "The Forty-Ayah Delay",
      subtitle: "The surah asks a question in ayah 1 and withholds the answer until ayah 41 — the delay is the pedagogy",
      layers: [
        { depth: 1, label: "The Question", ayah: "1", arabic: "يَسْأَلُونَكَ عَنِ الْأَنفَالِ", desc: "They ask you about the spoils. The companions have just survived Badr. Different groups have different claims. The tension is real. But God does not settle the dispute. He dissolves it: 'The spoils belong to God and the Messenger.' Fix your relationships first.", color: "#e07a8a" },
        { depth: 2, label: "The Portrait", ayah: "2–4", arabic: "وَجِلَتْ قُلُوبُهُمْ", desc: "Before you can receive a ruling about material things, you must understand what a believer actually is. Hearts that tremble. Faith that increases. Spines that stand in prayer. Open hands. A physical, embodied description of faith.", color: "#4ecdc4" },
        { depth: 3, label: "The Replay", ayah: "5–19", arabic: "وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَٰكِنَّ اللَّهَ رَمَىٰ", desc: "Before you can receive a ruling about who earned what, you must learn that the outcome was not yours. The victory was God's. The angels descended. The rain was purification. The throw was God's throw.", color: "#9b7fd4" },
        { depth: 4, label: "The Warning", ayah: "20–37", arabic: "يَحُولُ بَيْنَ الْمَرْءِ وَقَلْبِهِ", desc: "Before you can receive a ruling about distribution, you must face this: God comes between a person and their heart. A trial that strikes everyone. Remember when you were weak. A community that forgets its weakness will misunderstand its strength.", color: "#3d9bd4" },
        { depth: 5, label: "The Memory", ayah: "26", arabic: "وَاذْكُرُوا إِذْ أَنتُمْ قَلِيلٌ", desc: "Remember when you were few, deemed weak in the land, fearing that people would snatch you away. Memory is not nostalgia. It is a spiritual practice with moral force. To remember what God did when you were powerless recalibrates what you owe now.", color: "#C9A84C" },
        { depth: 6, label: "The Answer", ayah: "41", arabic: "وَاعْلَمُوا أَنَّمَا غَنِمْتُم مِّن شَيْءٍ فَأَنَّ لِلَّهِ خُمُسَهُ", desc: "A fifth belongs to God and the Messenger, to relatives, orphans, the needy, and the traveler. The answer arrives after forty ayahs of preparation. Law delivered to people who now understand that the outcome belongs to God produces stewardship, not entitlement.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah for the morning after — what it withholds is as deliberate as what it delivers",
      absences: [
        { item: "No celebration of victory", note: "The community has just been handed survival, validation, and triumph — and the surah will not let them rest in it. There is no extended celebration, no sustained description of the sweetness of victory. The dominant register is corrective." },
        { item: "No stories of earlier prophets", note: "No narratives of Musa, Ibrahim, or Nuh to anchor the argument in ancient history. In Al-Anfal, history is not ancient. History happened last week. The community is being asked to read its own experience as a text authored by God." },
        { item: "No comfort for the grieving", note: "Men killed their own kin at Badr — relatives fighting on opposite lines. The surah does not pause to console. Its reframing of agency — 'it was God who killed them' — is harder and more honest than comfort." },
        { item: "No self-congratulation permitted", note: "The surah tells a victorious community: your real danger is not the enemy in front of you. It is the rot that grows inside a community that begins to trust its own strength. Every moment of potential pride is redirected." },
        { item: "No separation between law and theology", note: "The legal answer about spoils is withheld for forty ayahs of theological preparation. The surah refuses to deliver a ruling without first reshaping the people who will receive it. The structure is the pedagogy." },
      ],
    },
  },

  contentNodes: [
    { concept: "You did not throw when you threw — divine and human agency", type: "surah-specific", articleSlug: "you-did-not-throw-8-17" },
    { concept: "God comes between a person and their heart", type: "surah-specific", articleSlug: "god-between-heart-8-24" },
    { concept: "Al-Anfal / At-Tawbah diptych — the missing basmala", type: "cross-surah", articleSlug: "anfal-tawbah-diptych-8-9" },
    { concept: "Tawakkul across the surah — faith, battle, and peace", type: "cross-surah", articleSlug: "tawakkul-thread-anfal-8" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "morning", label: "Morning After" },
  { id: "mirror", label: "Mirror" },
  { id: "delay", label: "The Delay" },
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

function SectionMapText({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">75 ayahs across 6 movements — tap any section for its scope</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gold-500 font-serif">{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot — the delayed answer</div>}
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
        Question → portrait → replay → warning → memory → answer
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
              <div className="text-2xl font-bold text-gold-500 font-serif">40</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayah Delay</div>
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
          {activeTab === "morning" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "delay" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMapText sections={d.sectionMap} />
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
