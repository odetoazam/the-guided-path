"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH QAF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/qaf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Qaf",
  arabicName: "ق",
  meaning: "The Letter Qaf",
  number: 50,
  ayahCount: 45,
  period: "Makki",
  juz: 26,
  movements: 4,
  thesis:
    "A surah that places death at the center of life, God at the center of the self, and the Quran at the center of the response — and asks you what you are going to do about that.",
  reflectionUrl: "/surahs/qaf",
  readTime: "22 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "وَلَقَدْ خَلَقْنَا الْإِنسَانَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
    ayahRef: "50:16",
    translation: "We have already created the human being and We know what his soul whispers to him, and We are closer to him than his jugular vein.",
    why: "The most concentrated statement of divine nearness in the entire Quran. The jugular vein is the vessel closest to the heart, carrying the blood that keeps you alive. You cannot feel it unless you press your fingers to your neck. The surah is saying: God is closer to you than the thing you can only find by searching for it inside your own body.",
  },

  audio: { surahNumber: 50, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Four Arcs",
      subtitle: "Creation as evidence → destroyed nations → the intimate center → the final address",
      sections: [
        { ayahs: "1-11", title: "Creation as Argument", color: "#4ecdc4", desc: "The Quraysh dismiss resurrection as absurd — 'a far-off return.' The surah answers by pointing at the sky with no rifts, the spread earth, the mountains, the rain reviving dead land. You have already seen resurrection. You watch it happen every growing season. The denial is not philosophical — it is a failure of observation." },
        { ayahs: "12-14", title: "The Catalogue of Denial", color: "#e07a8a", desc: "Nine destroyed peoples named in three ayahs — Noah, Rass, Thamud, 'Ad, Pharaoh, Lot, the thicket, Tubba'. No story, no dialogue, no dramatic arc. The names fall like a drumbeat. The pattern always ends the same way." },
        { ayahs: "15-30", title: "The Intimate Center", color: "#9b7fd4", isPivot: true, desc: "The passage that defines the surah. God is closer than the jugular vein. The two recording angels sit on the right and left. Then death arrives — the intoxication that strips away pretense. The trumpet, the driver and witness, the veil removed, the sight made sharp. Hell asks: 'Is there more?'" },
        { ayahs: "31-45", title: "The Final Address", color: "#C9A84C", desc: "Paradise brought near — not far. The righteous defined not by perfection but orientation: a heart that keeps turning back. Then the command to the Prophet: be patient, glorify God at the edges of the day, and remind by the Quran whoever fears the divine threat. The surah closes where it opened — with the Quran itself." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah opens with creation as evidence and closes with creation compressed into a single ayah",
      pairs: [
        {
          left: { label: "Creation Evidence (detailed)", ayahs: "6-11", desc: "The sky, the earth, the mountains, the rain, the gardens — laid out as proof that the Creator can create again" },
          right: { label: "Creation Evidence (compressed)", ayahs: "38", desc: "The heavens and earth created in six days without weariness — compressed into a single ayah when you have already been through death and judgment" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Destroyed Nations (catalogue)", ayahs: "12-14", desc: "Nine peoples named and dismissed. Denial is a pattern, and the pattern always ends the same way." },
          right: { label: "Destroyed Nations (question)", ayahs: "36", desc: "The catalogue becomes a question: 'Is there any escape?' The movement from statement to question marks the difference between hearing and internalizing." },
          color: "#e07a8a",
        },
        {
          left: { label: "Death and Judgment", ayahs: "19-30", desc: "The intoxication of death, the trumpet, the driver and witness, the veil removed, Hell's insatiable hunger" },
          right: { label: "Paradise Brought Near", ayahs: "31-35", desc: "Paradise not far. The awwab and hafiz. A heart turned in devotion. 'And with Us is more' — the same word mazid, now grace instead of hunger." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Jugular Vein", ayahs: "15-18",
        desc: "We are closer to him than his jugular vein. The two angels record. He does not utter a single word without a watcher ready beside him.",
        note: "The architectural heart: everything before builds toward this intimacy, everything after unfolds its consequences. God's closeness is the foundation of all accountability.",
      },
    },
    deductiveFunnel: {
      title: "The Collapse of Distance",
      subtitle: "The surah systematically destroys every form of distance between you and the inevitable",
      layers: [
        { depth: 1, label: "Creation → You", ayah: "6-11", arabic: "كَذَٰلِكَ الْخُرُوجُ", desc: "The sky, the earth, the rain. Dead land revived. 'Thus is the emergence.' The distance between rain and resurrection is zero — you have already seen it. The surah begins by collapsing the distance between natural observation and theological truth.", color: "#4ecdc4" },
        { depth: 2, label: "God → You", ayah: "16", arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ", desc: "Closer than the jugular vein. The distance between God and the human soul is no distance at all. The surveillance is intimacy. The accountability is closeness.", color: "#9b7fd4" },
        { depth: 3, label: "Death → You", ayah: "19", arabic: "وَجَاءَتْ سَكْرَةُ الْمَوْتِ بِالْحَقِّ", desc: "The intoxication of death arrives with truth — that is what you were trying to avoid. Death is placed at the structural midpoint of the surah because it is at the center of life, not its edge.", color: "#e07a8a" },
        { depth: 4, label: "Judgment → You", ayah: "41", arabic: "مِن مَّكَانٍ قَرِيبٍ", desc: "The caller calls from a nearby place — makan qarib. The trumpet sounds from close. The surah's final collapse: even the Day of Judgment is near. Nothing you were afraid of is far. It is all already here.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of pure argument — no story, no law, only proximity",
      absences: [
        { item: "No extended prophetic narrative", note: "The destroyed nations in ayahs 12-14 are listed — named and dismissed in a single stroke each. No Musa and Pharaoh, no Yusuf arc, no dialogue between a prophet and his people. The surah refuses dramatic distance. Everything is addressed to you, happening to you, now." },
        { item: "No legislative instruction", note: "No command to pray, fast, give charity, or maintain any specific practice. The glorification command near the end is devotional, not legal. The surah is pure argument, pure confrontation with reality." },
        { item: "No community address", note: "No 'O you who have believed,' no 'O mankind.' The surah speaks to the individual — to the single human soul watched by angels, approached by death, driven to judgment. The second person singular dominates: you, your veil, your sight." },
        { item: "No intercession or appeal", note: "No one speaks on anyone's behalf. The companion devil disclaims responsibility (ayah 27). God's word is settled (ayah 28). There is no negotiation at the stage the surah depicts. The door between worlds swings only one way." },
        { item: "No mention of the Prophet's suffering", note: "The Prophet is told to be patient and to glorify God, but he is not consoled for any specific hardship. The surah's emotional weight falls entirely on the listener's reckoning with their own mortality and proximity to God." },
      ],
    },
  },

  contentNodes: [
    { concept: "The jugular vein — habl al-warid (50:16)", type: "surah-specific", articleSlug: "jugular-vein-50-16" },
    { concept: "Sakrat al-mawt — the intoxication of death (50:19)", type: "surah-specific", articleSlug: "sakrat-mawt-50-19" },
    { concept: "Qaf and Ya-Sin — two paths to resurrection", type: "cross-surah", articleSlug: "qaf-yasin-resurrection" },
    { concept: "Mazid — surplus as hunger and as grace (50:30, 50:35)", type: "cross-surah", articleSlug: "mazid-hunger-grace" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "journey", label: "Four Arcs" },
  { id: "ring", label: "Ring" },
  { id: "proximity", label: "Proximity" },
  { id: "absent", label: "Absences" },
];

function OrnamentDivider() {
  return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">&#x06DE;</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>);
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
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "\u23F8" : "\u25B6"}</button>
        <div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div>
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
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">{"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Creation {"\u2192"} God {"\u2192"} death {"\u2192"} judgment — all near</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

// ══════════════════════════════════════════════════════════════════════════════
export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} {"\u00B7"} {d.period} {"\u00B7"} Juz {d.juz}</p>
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "proximity" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>
        </div>
        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>
      </div>
    </div>
  );
}
