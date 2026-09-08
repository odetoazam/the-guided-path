"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TALAQ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-talaq
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Talaq",
  arabicName: "الطَّلاق",
  meaning: "The Divorce",
  number: 65,
  ayahCount: 12,
  period: "Madani",
  juz: 28,
  movements: 5,
  thesis:
    "Twelve ayahs where the rules for ending a marriage and the architecture of seven heavens are governed by the same word, the same command, the same God who counts all things — a surah that placed the cosmos inside a courtroom.",
  reflectionUrl: "/surahs/at-talaq",
  readTime: "18 min read",

  sciencesActive: [{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"nasikh","english":"Abrogation"},{"key":"makki_madani","english":"Revelation Context"}],
  heartVerse: {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    ayahRef: "65:2-3",
    translation: "And whoever fears Allah, He will make for him a way out, and will provide for him from where he does not expect.",
    why: "The surah's most quoted passage — embedded inside divorce legislation. The most universal promise about divine provision lives inside the most painful domestic reality. The root kh-r-j (to go out) connects the prohibition of expulsion, the divine exit, and the prophetic mission.",
  },

  audio: { surahNumber: 65, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Interweave",
      subtitle: "Each block of legislation is followed by a theological opening — and the theology escalates",
      sections: [
        { ayahs: "1–3", title: "Procedure & Tawakkul", color: "#4ecdc4", desc: "Divorce procedure and waiting period, then the tawakkul promise: whoever fears Allah, He makes a way out and provides from the unseen. The most quoted verses in this surah, born inside legislation." },
        { ayahs: "4–5", title: "Specific Cases & Taqwa", color: "#9b7fd4", desc: "Post-menopausal women, those who haven't yet menstruated, pregnant women — the law refined. Then: whoever fears Allah, He eases his affairs and magnifies his reward." },
        { ayahs: "6–7", title: "Obligations & Cosmic Promise", color: "#C9A84C", isPivot: true, desc: "Housing, nursing wages, financial support. Then the fusion: Allah does not burden a soul beyond what He has given it. After hardship, ease. The domestic and the cosmic meet." },
        { ayahs: "8–10", title: "The Warning", color: "#e07a8a", desc: "Destroyed communities invoked. Disobeying divorce legislation carries the same weight as the defiance that destroyed cities. The word amr threads from domestic hope to civilizational judgment." },
        { ayahs: "11–12", title: "Light & Cosmos", color: "#4ecdc4", desc: "The Messenger brings people from darkness to light. Seven heavens, seven earths, divine command descending through all of them. The God who legislates your divorce governs the universe." },
      ],
    },
    chiasticRing: {
      title: "The Root Kh-r-j",
      subtitle: "Three uses of the same root — legal, providential, salvific",
      pairs: [
        {
          left: { label: "Do Not Expel", ayahs: "1", desc: "La tukhrijuhunna — do not force her out of her home. The legal prohibition. The human act of expulsion." },
          right: { label: "Brought Into Light", ayahs: "11", desc: "Li-yukhrija — to bring those who believe out of darkness into light. The prophetic mission as divine exit." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Amr as Possibility", ayahs: "1", desc: "Perhaps Allah will bring about a new amr — reconciliation as open future" },
          right: { label: "Amr as Cosmic Reality", ayahs: "12", desc: "His amr descends through seven heavens and seven earths — the same word, now universal" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Makhraja — Way Out", ayahs: "2–3",
        desc: "Whoever fears Allah, He will make for him a way out and provide from where he does not expect.",
        note: "Between the prohibition of expulsion and the prophetic mission of bringing people out — the divine exit for the one who fears Allah.",
      },
    },
    deductiveFunnel: {
      title: "Five Taqwa Commands",
      subtitle: "The word taqwa saturates the surah — every legal instruction is framed as worship",
      layers: [
        { depth: 1, label: "Fear Allah, your Lord", ayah: "1", arabic: "وَاتَّقُوا اللَّهَ رَبَّكُمْ", desc: "The first command, opening the surah. Taqwa as the foundation of the entire divorce procedure.", color: "#4ecdc4" },
        { depth: 2, label: "A way out", ayah: "2", arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", desc: "The second: whoever fears Allah receives the makhraja. Taqwa and provision are inseparable.", color: "#9b7fd4" },
        { depth: 3, label: "Ease of affairs", ayah: "4", arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا", desc: "The third: taqwa brings ease. The pattern is now unmistakable — every block of legislation sealed with a promise.", color: "#e07a8a" },
        { depth: 4, label: "O people of understanding", ayah: "10", arabic: "فَاتَّقُوا اللَّهَ يَا أُولِي الْأَلْبَابِ", desc: "The fourth: addressed to those who think. The legislative-to-historical arc culminates in a call to those who can see the pattern.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of focused intensity — twelve ayahs with no room for anything peripheral",
      absences: [
        { item: "No narrative", note: "No prophets named. No stories told. The destroyed nations of ayahs 8-10 are unnamed — referenced only as communities who disobeyed. The law stands on its own authority." },
        { item: "No address to women directly", note: "The entire surah speaks to the Prophet and through him to husbands and authorities. The women whose rights are being protected are spoken about, not spoken to. Protection operates through obligation placed on the powerful." },
        { item: "No detailed eschatology", note: "No paradise scene, no hellfire. The destroyed nations serve as warning, but the surah's urgency is about how you conduct yourself through dissolution, not what awaits afterward." },
        { item: "No separation of law and theology", note: "This is what makes the surah unique. There is no 'legal section' followed by a 'spiritual section.' The theology interrupts the legislation. The two are inseparable by design." },
        { item: "No comfort without obligation", note: "Every promise is preceded by a condition of taqwa. The makhraja, the provision, the ease — all require fear of Allah. Grace is not unconditional; it is responsive." },
      ],
    },
  },

  contentNodes: [
    { concept: "The makhraja promise — divine exit from difficulty", type: "surah-specific", articleSlug: "makhraja-65-2" },
    { concept: "Amr — from domestic hope to cosmic descent", type: "surah-specific", articleSlug: "amr-thread-65" },
    { concept: "At-Talaq and At-Tahrim diptych", type: "cross-surah", articleSlug: "talaq-tahrim-diptych" },
    { concept: "After hardship ease — 65:7 and 94:5-6", type: "cross-surah", articleSlug: "hardship-ease-talaq-inshirah" },
  ],
};

const TABS = [
  { id: "journey", label: "Interweave" },
  { id: "mirror", label: "Kh-r-j" },
  { id: "funnel", label: "Taqwa" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() { return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return (<div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3"><button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button><div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div><div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div><audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /></div>); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Foundation → exit → ease → understanding</div></div>); }
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
