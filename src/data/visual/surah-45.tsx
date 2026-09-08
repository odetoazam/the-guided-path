"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-JATHIYAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-jathiya
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Jathiyah",
  arabicName: "الجاثية",
  meaning: "The Kneeling",
  number: 45,
  ayahCount: 37,
  period: "Makki",
  juz: 25,
  movements: 4,
  thesis:
    "The surah that performs an autopsy on spiritual blindness and finds that the cause of death is not ignorance but the quiet enthronement of the self — desire made god, senses sealed, and every nation kneeling before its own record.",
  reflectionUrl: "/surahs/al-jathiya",
  readTime: "17 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "أَفَرَأَيْتَ مَنِ اتَّخَذَ إِلَـٰهَهُ هَوَاهُ وَأَضَلَّهُ اللَّهُ عَلَىٰ عِلْمٍ وَخَتَمَ عَلَىٰ سَمْعِهِ وَقَلْبِهِ وَجَعَلَ عَلَىٰ بَصَرِهِ غِشَاوَةً",
    ayahRef: "45:23",
    translation: "Have you seen the one who takes his own desire as his god, and Allah has left him astray with knowledge, and sealed his hearing and his heart, and placed a cover over his sight?",
    why: "The surah's central diagnosis. The person has not abandoned worship — they have redirected it. The faculty of devotion is intact; its object has been replaced. The phrase 'with knowledge' is devastating: the sealing happens after knowledge has arrived, because of a choice made in full awareness. Every channel of perception — hearing, heart, sight — is shut.",
  },

  audio: { surahNumber: 45, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Prosecution",
      subtitle: "Four movements: evidence → precedent → diagnosis → verdict",
      sections: [
        { ayahs: "1–13", title: "The Cosmic Exhibition", color: "#4ecdc4", desc: "Signs in the heavens and earth (for believers), in your creation and creatures (for people of certainty), in night and day and rain and winds (for people who reason). Three categories of evidence, three qualities of audience. The sea subjected, the cosmos placed in your service. Then the question: in what discourse after Allah and His signs will they believe?" },
        { ayahs: "14–21", title: "The Historical Precedent", color: "#9b7fd4", desc: "The Children of Israel received the Book, wisdom, prophethood — and divided anyway, not from ignorance but from mutual envy. The Prophet is placed on a shari'ah — a clear road to water. Follow the road. Do not follow desires. The word 'desire' threads from this section into the next." },
        { ayahs: "22–26", title: "The Diagnosis", color: "#e07a8a", isPivot: true, desc: "The surah's center: the person who has taken desire as god. Knowledge was present. The sealing happened anyway. Hearing sealed. Heart sealed. A cover over the sight. Their philosophy: nothing destroys us except time. The universe speaks. Desire deafens. The record awaits." },
        { ayahs: "27–37", title: "Every Nation Kneeling", color: "#C9A84C", desc: "Every nation on its knees, called to its book. The record is a transcription — nastansikhu — everything exactly as it was done. Today We forget you as you forgot this Day. The surah closes with threefold praise: Lord of the heavens, Lord of the earth, Lord of all the worlds. The Mighty, the Wise — the same names from the opening." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah spirals toward and away from a single diagnosis at its center",
      pairs: [
        {
          left: { label: "The Mighty, the Wise — Signs", ayahs: "1–6", desc: "The Book from the Mighty, the Wise. Signs in heavens, earth, creatures, rain, winds — three categories for believers, the certain, the reasoning" },
          right: { label: "The Mighty, the Wise — Praise", ayahs: "36–37", desc: "Lord of the heavens, Lord of the earth, Lord of all the worlds. Grandeur in the heavens and earth. The same two names close the frame" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Warning to the Mocker", ayahs: "7–11", desc: "The person who hears signs recited and persists in arrogance 'as though he did not hear them.' Behind them is Hell." },
          right: { label: "The Two Verdicts", ayahs: "30–35", desc: "Believers admitted to mercy. Deniers confronted: 'Were not My signs recited to you?' Today We forget you as you forgot this Day." },
          color: "#e07a8a",
        },
        {
          left: { label: "Cosmos Subjected for You", ayahs: "12–15", desc: "The sea, the heavens, the earth — all placed in your service. Command to forgive. Righteousness is for your own soul." },
          right: { label: "Every Nation Kneeling", ayahs: "27–29", desc: "Called to its book. The transcription of everything you did. The cosmos that served you now testifies against you." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "Desire as God — Senses Sealed", ayahs: "22–26",
        desc: "The one who takes desire as his god. Sealed in hearing, heart, and sight. Their philosophy: nothing but time destroys us. They are only guessing.",
        note: "The gravitational center of the surah. Everything converges on why the signs are refused. Everything radiates from the answer.",
      },
    },
    deductiveFunnel: {
      title: "The Autopsy",
      subtitle: "The surah tracks the word 'ayat' (signs) from evidence through refusal to courtroom",
      layers: [
        { depth: 1, label: "Cosmic Signs", ayah: "3–5", arabic: "إِنَّ فِي السَّمَاوَاتِ وَالْأَرْضِ لَآيَاتٍ", desc: "Signs placed in creation — heavens, earth, creatures, rain, winds. Visual, tactile, experienced in the natural world. The word ayat appears three times in three ayahs, each addressed to a different quality: believers, the certain, the reasoning.", color: "#4ecdc4" },
        { depth: 2, label: "Recited Signs", ayah: "8", arabic: "يَسْمَعُ آيَاتِ اللَّهِ تُتْلَىٰ عَلَيْهِ", desc: "Signs recited aloud — the Quran being read to someone who persists in arrogance 'as though he did not hear them.' The same word ayat has moved from nature to revelation. The evidence has been delivered in a second form.", color: "#9b7fd4" },
        { depth: 3, label: "Sealed Reception", ayah: "23", arabic: "اتَّخَذَ إِلَـٰهَهُ هَوَاهُ", desc: "The mechanism of refusal exposed. Desire installed as god. Hearing sealed, heart sealed, sight covered. The signs — cosmic and recited — cannot reach a person whose every faculty of reception has been closed by self-worship.", color: "#e07a8a" },
        { depth: 4, label: "Courtroom Evidence", ayah: "31", arabic: "أَفَلَمْ تَكُنْ آيَاتِي تُتْلَىٰ عَلَيْكُمْ", desc: "The same word ayat, now spoken by Allah on the Day of Judgment: 'Were not My signs recited to you?' Cosmic signs became recited signs became courtroom evidence. The defendant was surrounded by ayat in every form and still the verdict arrives.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is pure diagnosis — what it excludes reveals what it is examining",
      absences: [
        { item: "No prophetic narrative", note: "No story of a messenger confronting a tyrant, no scene of ruins, no extended dialogue. The Children of Israel appear as a structural reference, not a narrative. The evidence is not in the past — it is above you, beneath you, inside you, falling as rain right now." },
        { item: "No ethical commands (except one)", note: "A single instruction to the believers: forgive those who do not expect the Days of Allah. Otherwise, no legislation, no ritual, no social conduct. The surah is not about what you should do but what has gone wrong with the mechanism that would let you see why." },
        { item: "No consolation to the believers", note: "The believers are mentioned but never addressed with comfort or reassurance in this world. The surah's gaze is fixed on the diagnosis. The verdict is the only comfort offered." },
        { item: "No escape clause for the sealed", note: "The question in ayah 23 — 'Who will guide him after Allah?' — is rhetorical. No path back is offered within the surah's frame. Once desire sits on the throne, the surah does not pretend another court can remove it." },
        { item: "No extended afterlife description", note: "Paradise is mentioned in a single phrase (ayah 30). Hell receives slightly more — but the surah is not interested in the furniture of the afterlife. It is interested in the moment every nation kneels. The posture is the verdict." },
      ],
    },
  },

  contentNodes: [
    { concept: "Desire as god — the deification of the self", type: "surah-specific", articleSlug: "desire-as-god-45-23" },
    { concept: "Jathiyah — the kneeling of nations", type: "surah-specific", articleSlug: "kneeling-nations-45-28" },
    { concept: "The ayat escalation: cosmic → recited → courtroom", type: "cross-surah", articleSlug: "ayat-escalation-45" },
    { concept: "Shari'ah — the clear road to water (45:18)", type: "cross-surah", articleSlug: "shariah-road-water-45-18" },
  ],
};

const TABS = [
  { id: "prosecution", label: "Prosecution" },
  { id: "ring", label: "Ring" },
  { id: "autopsy", label: "Autopsy" },
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
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Cosmic signs → recited signs → sealed reception → courtroom evidence</div></div>);
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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "prosecution" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "autopsy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
