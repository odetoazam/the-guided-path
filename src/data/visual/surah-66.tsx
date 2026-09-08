"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAHRIM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-tahrim
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Tahrim",
  arabicName: "التَّحريم",
  meaning: "The Prohibition",
  number: 66,
  ayahCount: 12,
  period: "Madani",
  juz: 28,
  movements: 4,
  thesis:
    "A surah that enters through the bedroom door and exits through the gates of eternity, carrying the same argument the entire way — that faith is the one thing in your life that is entirely, irreducibly yours. No relationship can give it to you. No relationship can take it away.",
  reflectionUrl: "/surahs/at-tahrim",
  readTime: "18 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"amthal","english":"Parables"}],
  heartVerse: {
    arabic: "رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ",
    ayahRef: "66:11",
    translation: "My Lord, build for me near You a house in Paradise.",
    why: "Asiyah's prayer — from inside the palace of the greatest tyrant the Quran describes. She does not ask for Paradise in general terms. She asks for 'indaka — near You. Proximity, not luxury. The earthly house with all its complications is answered by a request for a house that only faith can build.",
  },

  audio: { surahNumber: 66, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "Bedroom to Eternity",
      subtitle: "Four movements: domestic incident, communal command, judgment, four archetypes",
      sections: [
        { ayahs: "1–5", title: "The Private Sphere", color: "#9b7fd4", desc: "The Prophet's self-imposed prohibition, Allah's correction, the betrayed confidence, the escalating warning to two wives. The most intimate opening in the Quran — a question about something that happened behind closed doors." },
        { ayahs: "6", title: "The Pivot", color: "#C9A84C", isPivot: true, desc: "Protect yourselves and your families from a Fire. The single verse that turns from the Prophet's household to every household. If his family requires divine correction, what makes you think yours does not?" },
        { ayahs: "7–9", title: "Judgment & Striving", color: "#e07a8a", desc: "Disbelievers told to make no excuses. Believers called to sincere repentance — tawbatan nasuha, a phrase unique in the Quran. The vision of light proceeding before the believers on that Day." },
        { ayahs: "10–12", title: "The Four Women", color: "#4ecdc4", desc: "Two wives of prophets destroyed by their own choices. Asiyah, wife of Pharaoh, saved from inside tyranny. Maryam, belonging to no man's household, complete in her faith. The surah's thesis made visible in four lives." },
      ],
    },
    chiasticRing: {
      title: "The Grid of Faith",
      subtitle: "Four women form a precise argument: only the vertical axis determines the outcome",
      pairs: [
        {
          left: { label: "Wife of Nuh", ayahs: "10", desc: "Married to the first major prophet of persistence. Lived in the household of revelation. Betrayed the mission. Entered the Fire." },
          right: { label: "Wife of Pharaoh", ayahs: "11", desc: "Married to history's greatest tyrant. Prayed for a house near God. Saved by her own faith from inside the palace of oppression." },
          color: "#e07a8a",
        },
        {
          left: { label: "Wife of Lut", ayahs: "10", desc: "Married to a prophet of moral isolation. Had daily access to revelation. Betrayed. The prophets could not avail them from Allah at all." },
          right: { label: "Maryam", ayahs: "12", desc: "Identified by her father, not a husband. Guarded her own chastity. Filled with divine spirit. Faith entirely self-contained." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Thesis", ayahs: "10",
        desc: "They did not avail them from Allah at all. Proximity to a prophet does not save you.",
        note: "The horizontal axis is the human bond. The vertical axis is the individual's choice. Only the vertical determines the outcome.",
      },
    },
    deductiveFunnel: {
      title: "The Arc of Tawbah",
      subtitle: "Repentance threads from two specific wives to the entire believing community",
      layers: [
        { depth: 1, label: "Private Tawbah", ayah: "4", arabic: "إِن تَتُوبَا إِلَى اللَّهِ", desc: "If you two repent to Allah — dual form, addressed to two specific wives. Repentance as private correction, born in a domestic incident.", color: "#9b7fd4" },
        { depth: 2, label: "Communal Tawbah", ayah: "8", arabic: "تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا", desc: "Repent to Allah with sincere repentance — plural, addressed to all believers. The only occurrence of tawbatan nasuha in the Quran. Pure, unmixed, free from self-justification.", color: "#4ecdc4" },
        { depth: 3, label: "Walking in Light", ayah: "8", arabic: "نُورُهُمْ يَسْعَىٰ بَيْنَ أَيْدِيهِمْ", desc: "Their light proceeds before them. Those who repent sincerely walk toward Paradise guided by their own light, praying for it to be perfected even as it shines.", color: "#C9A84C" },
        { depth: 4, label: "Faith as Individual Choice", ayah: "10–12", arabic: "ضَرَبَ اللَّهُ مَثَلًا", desc: "Four women. Two near prophets, condemned. Two surrounded by disbelief or standing alone, saved. The arc of tawbah resolves: faith is yours alone.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's omissions reveal its design — intimacy without distraction",
      absences: [
        { item: "No detailed legal rulings", note: "The surah begins with a legal matter (the Prophet's oath) but resolves it in a single verse and moves on. It has no interest in the jurisprudence of oaths — it uses the incident as a doorway." },
        { item: "No descriptions of Paradise beyond nearness", note: "No rivers, no fruit, no physical reward. The one afterlife image that lingers is Asiyah's prayer for a house near God. What she asks for is proximity, not luxury." },
        { item: "No engagement with polytheists or Meccans", note: "No external adversary. The adversary in At-Tahrim is more subtle: the assumption that your relationships define your spiritual standing." },
        { item: "No named prophets in the domestic section", note: "The opening is about the Prophet and his wives, but the incident is never fully narrated. The specifics are withheld because the principle matters more than the occasion." },
        { item: "No male exemplars in the closing", note: "All four archetypes are women. No other surah arranges four female figures as its theological conclusion. The arrangement is deliberate and unprecedented." },
      ],
    },
  },

  contentNodes: [
    { concept: "Asiyah's prayer — 'indaka, nearness over luxury", type: "surah-specific", articleSlug: "asiyah-prayer-66-11" },
    { concept: "Tawbatan nasuha — the unique sincere repentance", type: "surah-specific", articleSlug: "tawbah-nasuha-66-8" },
    { concept: "At-Talaq and At-Tahrim diptych", type: "cross-surah", articleSlug: "talaq-tahrim-diptych" },
    { concept: "Four women — faith as individual choice", type: "cross-surah", articleSlug: "four-women-66-10-12" },
  ],
};

const TABS = [
  { id: "journey", label: "Arc" },
  { id: "mirror", label: "Grid" },
  { id: "funnel", label: "Tawbah" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() { return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return (<div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3"><button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button><div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div><div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div><audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /></div>); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Private correction → universal call → walking in light → individual faith</div></div>); }
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
