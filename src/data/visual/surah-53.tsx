"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NAJM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-najm
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Najm",
  arabicName: "النَّجْم",
  meaning: "The Star",
  number: 53,
  ayahCount: 62,
  period: "Makki",
  juz: 27,
  movements: 4,
  thesis:
    "A sixty-two-ayah testimony that begins with a star descending and ends with a forehead touching the ground — ascending to the farthest boundary of creation, returning to demolish every false god by name, establishing that assumption is not knowledge, and commanding the only honest response to both truths: prostrate.",
  reflectionUrl: "/surahs/an-najm",
  readTime: "22 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "مَا زَاغَ الْبَصَرُ وَمَا طَغَىٰ",
    ayahRef: "53:17",
    translation: "The eye did not swerve, nor did it transgress.",
    why: "Seven Arabic words that compress an entire theology of prophetic reception. At the moment of the greatest vision any human being has ever received — standing at the boundary of creation, in the presence of what covered the Lote Tree — the Prophet's vision held perfectly steady. It did not wander (zagha) and it did not overreach (tagha). Precision, not ecstasy. The eye held its station.",
  },

  audio: { surahNumber: 53, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Testimony",
      subtitle: "Four corridors: vision → demolition → reckoning → prostration",
      sections: [
        { ayahs: "1–18", title: "The Two Visions", color: "#9b7fd4", desc: "The Prophet sees Jibreel in his true form twice — once on the horizon, once at the Lote Tree at the boundary of all creation. The eye did not swerve, nor did it transgress. He saw the greatest signs of his Lord. The surah opens as testimony, not teaching — someone who has seen something so staggering the courtroom goes silent." },
        { ayahs: "19–25", title: "The Three Goddesses", color: "#e07a8a", desc: "From the highest point any soul has reached, the surah drops without warning to the lowest thing the Quraysh could offer. Al-Lat, al-Uzza, Manat — named and exposed as nothing but names with no authority. After fourteen verses about the boundary of the heavens, the surah says: so tell me about your three stone goddesses." },
        { ayahs: "26–42", title: "Knowledge vs. Assumption", color: "#4ecdc4", desc: "Even the angels cannot intercede without permission. Assumption (zann) avails nothing against truth. Then the ethical center: from the scrolls of Ibrahim and Musa — no soul bears another's burden, there is nothing for a person except what they strive for, and to your Lord is the final return." },
        { ayahs: "43–62", title: "The Sovereignty Cascade", color: "#C9A84C", isPivot: true, desc: "A rapid litany — He makes you laugh and weep, causes death and life, created the pairs, is Lord of Sirius, destroyed 'Ad and Thamud. The Hour draws near. And then the command that brought even the Quraysh to their knees: prostrate to Allah and worship." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The star descends at the opening; the forehead descends at the close",
      pairs: [
        {
          left: { label: "The Star Descends", ayahs: "1–4", desc: "By the star when it descends — your companion has not strayed. He does not speak from desire. It is revelation revealed." },
          right: { label: "Prostrate and Worship", ayahs: "59–62", desc: "A warner from the warners of old. The Hour draws near. So prostrate to Allah and worship." },
          color: "#C9A84C",
        },
        {
          left: { label: "Jibreel's Two Visions", ayahs: "5–18", desc: "Two bow lengths or nearer. The Lote Tree at the boundary. The eye held steady. The greatest signs of his Lord." },
          right: { label: "Sovereignty Cascade", ayahs: "43–58", desc: "Laughter and weeping, death and life, male and female, Lord of Sirius, destroyed nations — so which of His favors do you doubt?" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Idols Demolished", ayahs: "19–25", desc: "Al-Lat, al-Uzza, Manat — nothing but names you yourselves have named, for which Allah sent no authority" },
          right: { label: "Intercession and Knowledge", ayahs: "26–35", desc: "Even angels cannot intercede without permission. Assumption avails nothing against truth. Your Lord is vast in forgiveness." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Scrolls of Ibrahim and Musa", ayahs: "36–42",
        desc: "No soul bears another's burden. There is nothing for a person except what they strive for. To your Lord is the final return.",
        note: "The ethical center — what remains when every false support has been stripped away. Your own effort and its consequences.",
      },
    },
    deductiveFunnel: {
      title: "The Zann-'Ilm Line",
      subtitle: "The surah draws a binary between assumption (zann) and knowledge ('ilm) — and places everything on one side or the other",
      layers: [
        { depth: 1, label: "Direct Witness", ayah: "17", arabic: "مَا زَاغَ الْبَصَرُ وَمَا طَغَىٰ", desc: "The Prophet's experience is characterized as direct, undistorted witness. The eye held steady. This is 'ilm at its purest — revelation received without a single degree of deviation.", color: "#9b7fd4" },
        { depth: 2, label: "Empty Names", ayah: "23", arabic: "إِنْ هِيَ إِلَّا أَسْمَاءٌ سَمَّيْتُمُوهَا", desc: "The Quraysh's gods are a vocabulary with no referent — names pointing at nothing. The surah's demolition is linguistic: your gods are a language problem. You invented names and then worshipped the names.", color: "#e07a8a" },
        { depth: 3, label: "Zann Avails Nothing", ayah: "28", arabic: "وَإِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا", desc: "Assumption — no matter how confidently held, no matter how culturally reinforced — does not produce a single grain of truth. The surah's most important epistemological statement.", color: "#C9A84C" },
        { depth: 4, label: "Only What You Strive For", ayah: "39", arabic: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", desc: "When zann is cleared away and 'ilm is established, what remains is this: you own only your effort. Sa'y — striving — carries the image of someone walking briskly toward a destination. Not passive hope but movement.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah replaces narrative with testimony — every absence intensifies the directness",
      absences: [
        { item: "No extended narrative", note: "Ibrahim and Musa are mentioned as sources — the surah references their scriptures to anchor its ethics — but their stories are not told. An-Najm replaces narrative with direct witness: I saw this with my own eyes." },
        { item: "No ethical instruction to believers", note: "No commands about prayer, charity, fasting, or conduct — except the final command to prostrate. The surah is establishing something more basic than law: the reality of revelation itself." },
        { item: "No description of what was revealed", note: "Ayah 10 says 'He revealed to His servant what He revealed' — the content is left unnamed. The surah protects the secret of what passed between them. The channel matters, not the content." },
        { item: "No naming of what covered the Lote Tree", note: "The repetition 'when there covered it that which covered it' is the Quran choosing not to name what the Prophet saw. Whatever covered the Tree was beyond the capacity of language to hold." },
        { item: "No argument with the deniers", note: "The surah does not debate. It testifies, demolishes, and commands. The only question directed at the audience is: will you dispute with him over what he saw?" },
      ],
    },
  },

  contentNodes: [
    { concept: "The Mi'raj testimony — Sidrat al-Muntaha and the steady eye", type: "surah-specific", articleSlug: "miraj-testimony-53-13-18" },
    { concept: "Naming the three goddesses — linguistic demolition", type: "surah-specific", articleSlug: "three-goddesses-53-19-23" },
    { concept: "Najm-Qamar pair: testimony from the witness stand and the archives", type: "cross-surah", articleSlug: "najm-qamar-pair" },
    { concept: "Zann vs. 'ilm — the Quran's epistemology of worship", type: "cross-surah", articleSlug: "zann-ilm-epistemology" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "testimony", label: "Testimony" },
  { id: "ring", label: "Ring" },
  { id: "zann", label: "Zann/'Ilm" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() {
  return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>);
}

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;
  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>);
}


function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Direct witness → empty names → assumption exposed → only striving remains</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

// ══════════════════════════════════════════════════════════════════════════════
export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period} · Juz {d.juz}</p>
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
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "testimony" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "zann" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>
        </div>
        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>
      </div>
    </div>
  );
}
