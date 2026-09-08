"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-AHQAF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ahqaf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ahqaf",
  arabicName: "الأحقاف",
  meaning: "The Sand Dunes",
  number: 46,
  ayahCount: 35,
  period: "Makki",
  juz: 26,
  movements: 4,
  thesis:
    "The closing movement of the Ha Mim symphony — a surah that holds a mother's labor pain and a civilization's annihilation in the same breath, and asks whether the capacity for gratitude formed between a child and their parents is the same capacity that determines whether a person, a people, or an entire world survives the arrival of truth.",
  reflectionUrl: "/surahs/al-ahqaf",
  readTime: "19 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا ۖ حَمَلَتْهُ أُمُّهُ كُرْهًا وَوَضَعَتْهُ كُرْهًا ۖ وَحَمْلُهُ وَفِصَالُهُ ثَلَاثُونَ شَهْرًا",
    ayahRef: "46:15",
    translation: "And We have enjoined upon the human being goodness toward their parents. His mother carried him with hardship and gave birth to him with hardship, and his bearing and weaning is thirty months.",
    why: "The surah's gravitational center. The Quran does not sentimentalize motherhood — it names the cost. The word kurh means difficulty borne against the body's comfort. From this single verse jurists derived the minimum viable pregnancy (six months). The prayer that follows — a forty-year-old asking for gratitude, righteousness, and the repair of their offspring — moves backward to parents, upward to God, and forward to the next generation.",
  },

  audio: { surahNumber: 46, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Closing Symphony",
      subtitle: "Four movements: defense → intimacy → destruction → witness",
      sections: [
        { ayahs: "1–14", title: "The Defense of the Book", color: "#4ecdc4", desc: "The seventh and final Ha Mim opening. The surah restates the case for revelation with the confidence of a closing witness: show me what your gods have created, bring me a scripture before this one, bring me any remnant of knowledge. The Prophet is told: I am not something new among the messengers. I only follow what is revealed." },
        { ayahs: "15–20", title: "The Intimate Center", color: "#C9A84C", isPivot: true, desc: "The surah turns from eschatology to the womb in a single breath. A mother's hardship named in bodily terms. Thirty months of bearing and weaning. A forty-year-old praying for gratitude and righteous offspring. Then the counter-figure: the child who says 'uff' and refuses to believe while the parents plead. Rejection of the message played out in a living room." },
        { ayahs: "21–28", title: "The Sand Dunes of ʿĀd", color: "#e07a8a", desc: "Hud warned his people at the ahqaf — the only mention of these sand dunes in the entire Quran. They saw a cloud approaching and said: this will bring us rain. It brought annihilation. By morning, nothing was visible except their dwellings. They had hearing, sight, and hearts — and none of it availed them." },
        { ayahs: "29–35", title: "The Jinn & the Final Command", color: "#9b7fd4", desc: "A group of jinn hear the Quran, hush each other, and within minutes become warners to their people. They accomplish in four ayahs what the Quraysh have resisted across thirty. The surah closes: be patient as the messengers of determination were patient. On the Day they see what was promised, it will feel like they lived an entire life in a single hour of an afternoon." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric structure places the parental passage at its thematic center",
      pairs: [
        {
          left: { label: "Defense of Revelation", ayahs: "1–14", desc: "The Book from the Mighty, the Wise. Challenge to the deniers: bring evidence, bring a scripture, bring anything. The Prophet: I am not new among the messengers." },
          right: { label: "Witness & Patience", ayahs: "21–35", desc: "ʿĀd's destruction for refusing. The jinn's instant reception. Be patient as the ulu al-azm were patient. A lifetime compressed to an hour of a day." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "Parents, Children & the Test of Reception", ayahs: "15–20",
        desc: "The most intimate human relationship as the template for every act of reception or refusal. The grateful child at forty, praying backward to parents and forward to offspring. The dismissive child who says uff to the truth.",
        note: "Everything before this builds the theological case. Everything after shows the consequences at civilizational scale (ʿĀd), at supernatural scale (the jinn), and at the scale of time itself (the hour-of-a-day image). The center argues that if you cannot receive the gift that arrived through your own mother's body, you will not receive the gift that arrives through the mouth of a prophet.",
      },
    },
    deductiveFunnel: {
      title: "The Parallel Witnesses",
      subtitle: "Two groups encounter truth — one refuses, one accepts. The surah places them side by side without commentary.",
      layers: [
        { depth: 1, label: "ʿĀd — Refusal", ayah: "21–25", arabic: "هَـٰذَا عَارِضٌ مُّمْطِرُنَا", desc: "A human civilization with every advantage — hearing, sight, hearts, and power exceeding what the Quraysh possessed. They saw the approaching cloud and called it rain. It was annihilation. By morning: empty dwellings. The faculties themselves become useless when the will to perceive is absent.", color: "#e07a8a" },
        { depth: 2, label: "The Jinn — Reception", ayah: "29–32", arabic: "قَالُوا أَنصِتُوا", desc: "A group of jinn encounter the Quran for the first time with no preparation. They hush each other. They listen. They identify it as confirming what came before, call their people to respond, and warn of consequences. In four ayahs they become what the Quraysh refuse to become: receivers who carry the message to others.", color: "#4ecdc4" },
        { depth: 3, label: "The Domestic Mirror", ayah: "15–17", arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا", desc: "The same pattern at the smallest scale. Two children, same parents. One reaches forty and prays for gratitude. The other says uff and calls resurrection a fairy tale. The family argument and the civilizational one are the same refusal at different scales.", color: "#9b7fd4" },
        { depth: 4, label: "The Question Left Hanging", ayah: "35", arabic: "فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ", desc: "ʿĀd refused and was erased. The jinn accepted instantly. The Quraysh are positioned between these two responses, and the surah leaves the question hanging: which of these two will yours be?", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The farewell surah of the Ha Mim series — what it excludes completes what the series has said",
      absences: [
        { item: "No legislative content", note: "No legal rulings, no ritual instructions, no communal regulations. The surah is entirely occupied with whether the message will be received or refused. There are no instructions for how to live once you believe — only the question of whether you will believe at all." },
        { item: "No extended prophetic biography", note: "Hud appears but only as a voice delivering a warning. We learn almost nothing about him as a person. The ʿĀd narrative is compressed to its essential elements: warning, refusal, wind, silence. The economy is striking compared to the fuller treatments in Surahs 7, 11, and 26." },
        { item: "No address to the believers as a community", note: "No 'O you who believe.' The surah speaks to the Prophet, through the Prophet, about the people who refuse. The believers are implied but never directly addressed with instructions." },
        { item: "No resolution of the parental tension", note: "The child who says uff and the parents who plead — the surah does not resolve this scene. Both voices are given and the tension is left hanging. Rejection played out in a living room, between people who love each other." },
        { item: "No cosmic spectacle in the jinn encounter", note: "The jinn arrive, listen, respond, and leave. Four ayahs. No fireworks, no dramatic revelation scene. The most significant moment of inter-species reception in the Quran is handled with the restraint of a closing argument that trusts the jury has been listening." },
      ],
    },
  },

  contentNodes: [
    { concept: "The parental verse and the thirty-month calculation", type: "surah-specific", articleSlug: "parental-verse-thirty-months-46-15" },
    { concept: "Rain or annihilation — ʿĀd's fatal misreading", type: "surah-specific", articleSlug: "rain-annihilation-ad-46-24" },
    { concept: "The jinn as parallel witnesses to the Quraysh", type: "cross-surah", articleSlug: "jinn-witnesses-46-72" },
    { concept: "Ulu al-azm — the patience of the greatest messengers", type: "cross-surah", articleSlug: "ulu-azm-patience-46-35" },
  ],
};

const TABS = [
  { id: "symphony", label: "Symphony" },
  { id: "ring", label: "Ring" },
  { id: "witnesses", label: "Witnesses" },
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
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Civilization refused → jinn accepted → family mirrors both → the question hangs</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">7th</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ha Mim</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "symphony" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "witnesses" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
