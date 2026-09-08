"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAGHABUN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-taghabun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Taghabun",
  arabicName: "التَّغابُن",
  meaning: "The Mutual Loss and Gain",
  number: 64,
  ayahCount: 18,
  period: "Madani",
  juz: 28,
  movements: 4,
  thesis:
    "The last of the Musabbihat — eighteen ayahs that walk from the glory of the universe to the quiet of your own home and say: this is where the real test is, this is where the real spending happens, and this is where mercy begins.",
  reflectionUrl: "/surahs/at-taghabun",
  readTime: "18 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"aqeedah","english":"Theology"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ مِنْ أَزْوَاجِكُمْ وَأَوْلَادِكُمْ عَدُوًّا لَّكُمْ فَاحْذَرُوهُمْ ۚ وَإِن تَعْفُوا وَتَصْفَحُوا وَتَغْفِرُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ",
    ayahRef: "64:14",
    translation: "O you who believe, indeed among your spouses and your children are enemies to you, so beware of them. But if you pardon and overlook and forgive, then indeed Allah is Forgiving and Merciful.",
    why: "The surah's most emotionally charged moment. The word for enemy is the same used for Shaytan elsewhere. And yet in the same breath — three words for forgiveness stacked in ascending intensity. Vigilance and mercy in a single verse.",
  },

  audio: { surahNumber: 64, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Controlled Descent",
      subtitle: "From cosmos to household in four movements",
      sections: [
        { ayahs: "1–4", title: "Universal Declaration", color: "#4ecdc4", desc: "Everything glorifies Allah. Sovereignty, praise, power, knowledge. Humanity is divided: believer and disbeliever. He knows what you conceal and what you reveal." },
        { ayahs: "5–6", title: "Historical Witness", color: "#9b7fd4", desc: "Destroyed nations compressed into two ayahs. Their objection: 'Shall human beings guide us?' Allah had no need of them. The entire prophetic cycle in a single breath." },
        { ayahs: "7–10", title: "The Day of Taghabun", color: "#e07a8a", desc: "The Day of Mutual Loss and Gain — a marketplace audit. The believer/disbeliever binary from ayah 2 reaches its conclusion. A name for Judgment Day that appears nowhere else." },
        { ayahs: "11–18", title: "The Believer's Life", color: "#C9A84C", isPivot: true, desc: "Calamity, obedience, tawakkul, the enemy within your family, wealth as trial, consciousness of Allah as much as you can, the beautiful loan, divine knowledge. The surah's distinctive ground." },
      ],
    },
    chiasticRing: {
      title: "The Concentric Frame",
      subtitle: "From the cosmic binary to the domestic binary",
      pairs: [
        {
          left: { label: "Cosmic Division", ayahs: "1–2", desc: "All creation glorifies Allah; humanity divided into believers and disbelievers" },
          right: { label: "Domestic Arena", ayahs: "14–18", desc: "The believer's household — the real arena of the test. Forgive, spend, lend to Allah" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Historical Signs", ayahs: "3–6", desc: "Signs of creation and history — nations that rejected and tasted consequences" },
          right: { label: "Personal Signs", ayahs: "11–13", desc: "Calamity, obedience, reliance — signs in personal life" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Day of Taghabun", ayahs: "7–10",
        desc: "The Day when every transaction shows its true return. The winners and losers are finally revealed.",
        note: "The hinge that transforms everything. Both history and personal life become legible through this lens.",
      },
    },
    deductiveFunnel: {
      title: "The Four Imperatives",
      subtitle: "Ayah 16's practical sequence — from awareness to generosity",
      layers: [
        { depth: 1, label: "Ittaqu — Be conscious", ayah: "16", arabic: "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ", desc: "Be conscious of Allah as much as you are able. The gentlest moment. After naming enemies in your household and calling wealth a trial, the surah asks for capacity, not perfection.", color: "#4ecdc4" },
        { depth: 2, label: "Isma'u — Listen", ayah: "16", arabic: "وَاسْمَعُوا", desc: "Listen. Awareness leads to attention. The ear must open before the hand can move.", color: "#9b7fd4" },
        { depth: 3, label: "Ati'u — Obey", ayah: "16", arabic: "وَأَطِيعُوا", desc: "Obey. Attention leads to obedience. The gap between hearing and acting is the gap the surah measures.", color: "#e07a8a" },
        { depth: 4, label: "Anfiqu — Spend", ayah: "16", arabic: "وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ", desc: "Spend — it will be better for your souls. Obedience leads to generosity. The sequence arrives at the open hand.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah trusts its audience already knows the stories",
      absences: [
        { item: "No prophet named", note: "No Musa, no Ibrahim, no Isa. The destroyed nations are referenced in a single sweeping sentence and then the surah moves on. Histories gestured at, never entered." },
        { item: "No direct address to the Prophet", note: "The commands are addressed to 'you who believe' — the community. This is a surah speaking to a collective, not an individual." },
        { item: "No detailed eschatology", note: "The Day of Taghabun is named but not described. No extended fire or garden scenes. The surah's urgency is about how you live now." },
        { item: "No ascetic rejection of family", note: "The surah calls your family a trial and an enemy — and in the same breath tells you to forgive them. It validates the tension rather than resolving it through renunciation." },
        { item: "No demand for perfection", note: "'As much as you are able' — ma istata'tum. One of the Quran's most merciful concessions, calibrating the command to human capacity." },
      ],
    },
  },

  contentNodes: [
    { concept: "Yawm at-Taghabun — the unique marketplace audit", type: "surah-specific", articleSlug: "taghabun-day-64-9" },
    { concept: "The enemy within — family as spiritual trial", type: "surah-specific", articleSlug: "enemy-within-64-14" },
    { concept: "The Musabbihat bookends (Al-Hadid to At-Taghabun)", type: "cross-surah", articleSlug: "musabbihat-cluster" },
    { concept: "Shuhh al-nafs — stinginess of the soul (59:9 and 64:16)", type: "cross-surah", articleSlug: "shuhh-nafs-hashr-taghabun" },
  ],
};

const TABS = [
  { id: "journey", label: "Descent" },
  { id: "mirror", label: "Frame" },
  { id: "funnel", label: "Imperatives" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() { return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return (<div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3"><button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button><div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div><div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div><audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /></div>); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Awareness → attention → obedience → generosity</div></div>); }
function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>); }

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream"><div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
      <header className="text-center space-y-3 pb-4">
        <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period}</p>
        <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p><h1 className="text-2xl font-serif text-cream">{d.name}</h1>
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
      <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"><div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div><div className="text-sm text-cream font-serif">Read the Full Reflection</div><div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div></a>
    </div></div>
  );
}
