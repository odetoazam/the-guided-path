"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUNAFIQUN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-munafiqun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Munafiqun",
  arabicName: "المُنافِقون",
  meaning: "The Hypocrites",
  number: 63,
  ayahCount: 11,
  period: "Madani",
  juz: 28,
  movements: 3,
  thesis:
    "An eleven-ayah anatomy of the gap between speech and soul — a surah that spends eight ayahs dissecting someone else's spiritual fraud and then turns, in its final three, to tell the believers that the road to the same destination begins with their own distracted afternoon.",
  reflectionUrl: "/surahs/al-munafiqun",
  readTime: "18 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"balaghah","english":"Rhetoric"},{"key":"nahw","english":"Grammar"}],
  heartVerse: {
    arabic: "كَأَنَّهُمْ خُشُبٌ مُّسَنَّدَةٌ",
    ayahRef: "63:4",
    translation: "As if they are pieces of wood propped up.",
    why: "The surah's central image, unique in the entire Quran. Timber cut from the tree — it no longer grows, no longer draws water. It has the shape of something that once lived, but the life is gone. Musannadah: propped against something, leaning, because it cannot stand on its own.",
  },

  audio: { surahNumber: 63, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "Three Strokes",
      subtitle: "Exposure, narrative, and the pivot to you",
      sections: [
        { ayahs: "1–4", title: "The Mask & Diagnosis", color: "#e07a8a", desc: "The hypocrites arrive with the shahada on their lips. Two testimonies in one verse — theirs and Allah's — with opposite relationships to truth. Their oaths are shields, their hearts are sealed, their bodies are impressive timber propped against a wall." },
        { ayahs: "5–8", title: "The Turning of the Neck", color: "#9b7fd4", desc: "Scene replaces diagnosis. They twist their heads away from forgiveness. They plot to starve the Muslim community. They threaten to expel the Prophet from Medina. Allah reassigns 'izzah to its true owners." },
        { ayahs: "9–11", title: "The Warning for You", color: "#C9A84C", isPivot: true, desc: "The surah abandons the hypocrites entirely and turns to the believers. Wealth and children as distraction. Spend before death arrives. The dying person begging for delay — and the door that will not reopen." },
      ],
    },
    chiasticRing: {
      title: "The Chiastic Frame",
      subtitle: "The first eight ayahs form a sealed, self-contained structure",
      pairs: [
        {
          left: { label: "False Oaths", ayahs: "1–2", desc: "The hypocrites' testimony and their use of speech as a shield — language weaponized into camouflage" },
          right: { label: "Political Speech", ayahs: "7–8", desc: "Their conspiracy and claim of power — the outward display mirroring the false oaths" },
          color: "#e07a8a",
        },
        {
          left: { label: "Sealed Hearts", ayahs: "3", desc: "They believed, then disbelieved, and their hearts were sealed — the interior condition" },
          right: { label: "Rejection of Mercy", ayahs: "5–6", desc: "They turn their necks from forgiveness — the sealed interior made visible in physical gesture" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "Propped-Up Timber", ayahs: "4",
        desc: "Impressive bodies, compelling speech — and hollow wood leaning against a wall. They are the enemy.",
        note: "The center of the chiasm. Everything before builds toward the diagnosis; everything after shows the diagnosis in action.",
      },
    },
    deductiveFunnel: {
      title: "Three Keyword Roots",
      subtitle: "Word-roots that thread the surah and carry its argument",
      layers: [
        { depth: 1, label: "Sh-h-d (witness)", ayah: "1", arabic: "نَشْهَدُ ... يَشْهَدُ", desc: "Appears twice in the opening verse — the hypocrites' nashhadu and Allah's yashhadu. The same act of witnessing, used by two speakers with opposite relationships to truth. Does not appear again.", color: "#e07a8a" },
        { depth: 2, label: "S-d-d (block)", ayah: "2", arabic: "فَصَدُّوا عَن سَبِيلِ اللَّهِ", desc: "They blocked from Allah's path. Connects to the physical turning-away of ayah 5. And to sadaqah (charity) in ayah 10 — giving as the act of unblocking what selfishness keeps closed.", color: "#9b7fd4" },
        { depth: 3, label: "L-h-w (divert)", ayah: "9", arabic: "لَا تُلْهِكُمْ أَمْوَالُكُمْ", desc: "Let not your wealth divert you. The same root used in Al-Jumu'ah 62:11 when companions scattered toward trade. The distance between you and the hypocrites is shorter than you think.", color: "#4ecdc4" },
        { depth: 4, label: "Akh-kh-r (delay)", ayah: "10–11", arabic: "أَخَّرْتَنِي ... يُؤَخِّرَ", desc: "The dying person's plea and its refusal, using the same root. The sound of a deadline that has passed. Delay does not exist.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences are diagnostic — every absence sharpens the portrait",
      absences: [
        { item: "No hellfire, no paradise", note: "No extended afterlife description. The surah treats hypocrisy as its own punishment. The spiritual death already underway is the more urgent horror." },
        { item: "No previous prophets or destroyed nations", note: "No historical parallels. The surah stays in the present, in Medina, in this community, with this specific disease." },
        { item: "No legal rulings", note: "No legislation, no ritual instruction. The surah does one thing only: puts hypocrisy on the examination table and turns the lights on." },
        { item: "No lengthy quotation of the hypocrites", note: "Unlike At-Tawbah, the surah does not give them extended speech. It is interested in the anatomy of the condition, not the catalog of symptoms." },
        { item: "No punishment scene for the hypocrites", note: "The analysis is complete and sealed. The surah steps outside it to address the people who might still change." },
      ],
    },
  },

  contentNodes: [
    { concept: "Khushub musannadah — propped-up timber", type: "surah-specific", articleSlug: "khushub-musannadah-63-4" },
    { concept: "The donkey and the timber — companion images", type: "cross-surah", articleSlug: "donkey-timber-62-63" },
    { concept: "L-h-w root across Al-Jumu'ah and Al-Munafiqun", type: "cross-surah", articleSlug: "lahw-distraction-62-63" },
    { concept: "The plea for delay — mortality and postponement", type: "surah-specific", articleSlug: "plea-delay-63-10" },
  ],
};

const TABS = [
  { id: "journey", label: "Strokes" },
  { id: "mirror", label: "Chiasm" },
  { id: "funnel", label: "Roots" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() { return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>); }

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;
  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (<div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3"><button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button><div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div><div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div><audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /></div>);
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Witness → obstruction → distraction → deadline</div></div>); }
function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>); }

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream"><div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
      <header className="text-center space-y-3 pb-4">
        <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period}</p>
        <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
        <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
        <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
        <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
        <div className="flex justify-center gap-10 pt-4">
          <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div></div>
        </div>
      </header>
      <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
      <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}><div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div></div>
      <div className="min-h-[400px] pt-6 pb-8">
        {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
        {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
        {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
        {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
        <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>
      </div>
      <OrnamentDivider />
      <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
        <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
        <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
        <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
      </a>
    </div></div>
  );
}
