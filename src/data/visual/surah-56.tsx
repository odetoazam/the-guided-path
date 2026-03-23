"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-WAQIAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-waqiah
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Waqiah",
  arabicName: "الواقعة",
  meaning: "The Inevitable Event",
  number: 56,
  ayahCount: 96,
  period: "Makki",
  juz: 27,
  movements: 4,
  thesis:
    "The surah of sorting — when the world ends, every human being will be divided into exactly three groups, and the rest of the surah exists to make you wonder which group you belong to. Then it holds a glass of water in front of your face and asks who filled it.",
  reflectionUrl: "/surahs/al-waqiah",
  readTime: "25 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنكُمْ وَلَـٰكِن لَّا تُبْصِرُونَ",
    ayahRef: "56:85",
    translation: "And We are closer to him than you, but you do not see.",
    why: "At the deathbed — someone is dying, the family stands around watching, helpless — and God declares His proximity. Closer than the people who love this person most, yet invisible to every one of them. The theology of divine proximity at the moment of death, compressed into a single line.",
  },

  audio: { surahNumber: 56, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِذَا وَقَعَتِ الْوَاقِعَةُ", translation: "When the Inevitable Event occurs —" },
    { ayah: 2, arabic: "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ", translation: "there is no denying its occurrence." },
    { ayah: 7, arabic: "وَكُنتُمْ أَزْوَاجًا ثَلَاثَةً", translation: "And you become three kinds." },
    { ayah: 10, arabic: "وَالسَّابِقُونَ السَّابِقُونَ", translation: "And the Foremost — the Foremost." },
    { ayah: 11, arabic: "أُولَـٰئِكَ الْمُقَرَّبُونَ", translation: "Those are the ones brought near." },
    { ayah: 57, arabic: "نَحْنُ خَلَقْنَاكُمْ فَلَوْلَا تُصَدِّقُونَ", translation: "We created you, so why do you not believe?" },
    { ayah: 63, arabic: "أَفَرَأَيْتُم مَّا تَحْرُثُونَ", translation: "Have you considered what you sow?" },
    { ayah: 68, arabic: "أَفَرَأَيْتُمُ الْمَاءَ الَّذِي تَشْرَبُونَ", translation: "Have you considered the water you drink?" },
    { ayah: 71, arabic: "أَفَرَأَيْتُمُ النَّارَ الَّتِي تُورُونَ", translation: "Have you considered the fire you kindle?" },
    { ayah: 85, arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنكُمْ وَلَـٰكِن لَّا تُبْصِرُونَ", translation: "And We are closer to him than you, but you do not see." },
    { ayah: 88, arabic: "فَأَمَّا إِن كَانَ مِنَ الْمُقَرَّبِينَ", translation: "As for the one who is among those brought near —" },
    { ayah: 89, arabic: "فَرَوْحٌ وَرَيْحَانٌ وَجَنَّتُ نَعِيمٍ", translation: "comfort, fragrance, and a Garden of Pleasure." },
    { ayah: 96, arabic: "فَسَبِّحْ بِاسْمِ رَبِّكَ الْعَظِيمِ", translation: "So glorify the name of your Lord, the Most Great." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Sorting",
      subtitle: "Four stages: impact → three portraits → four challenges → deathbed verdict",
      sections: [
        { ayahs: "1–12", title: "The Impact and the Three Groups", color: "#e07a8a", desc: "The Event that falls with finality. Earth shaken, mountains pulverized. Then the sorting: People of the Right, People of the Left, and highest of all — the Foremost, al-sabiqun, named twice for emphasis. Three groups, not two. The Quran's only tripartite eschatological division." },
        { ayahs: "13–56", title: "The Three Portraits", color: "#9b7fd4", desc: "The Foremost described first — closeness, peace, the ambient sound is salam itself. The People of the Right — shade, fruit, flowing water, abundance. The People of the Left — scorching wind, boiling water, shade of black smoke. The distinction between the first two is subtle: intimacy versus provision. Both are paradise. One is nearness." },
        { ayahs: "57–74", title: "The Four Challenges", color: "#4ecdc4", isPivot: true, desc: "The pivot. Have you considered what you sow? What you emit? The water you drink? The fire you kindle? Four domains of human dependence, each ending with the same structure: Is it you who made this, or are We? The surah shifts from the future tense of judgment to the present tense of evidence. The argument is now in your hands." },
        { ayahs: "75–96", title: "The Oath, the Deathbed, and the Verdict", color: "#C9A84C", desc: "An oath by the positions of the stars — a cosmic witness to the Quran's authority. Then the deathbed: the soul reaches the throat, the family watches, God declares He is closer than any of them. The three groups return in compressed couplets. The surah's final word is tasbih — glorification." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Sorting",
      subtitle: "The three groups open the surah and close it — but the register shifts from collective to individual",
      pairs: [
        {
          left: { label: "The Event", ayahs: "1–6", desc: "Cosmic upheaval — earth shaken, mountains pulverized, the stage emptied of everything familiar." },
          right: { label: "The Deathbed", ayahs: "83–87", desc: "A single person dying — the soul at the throat, the family watching. The universal Event made intimately personal." },
          color: "#e07a8a",
        },
        {
          left: { label: "Three Groups Named", ayahs: "7–12", desc: "Humanity sorted into three — Right, Left, Foremost. Categories. Anticipation." },
          right: { label: "Three Groups Verdict", ayahs: "88–96", desc: "The same three — but now applied to one person at the deathbed. Not a crowd. You." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Portraits (Foremost/Right/Left)", ayahs: "13–56", desc: "Detailed descriptions — gardens, shade, fruit for the blessed; scorching wind and smoke for the deniers." },
          right: { label: "Quran's Authority", ayahs: "75–82", desc: "An oath on the stars' positions. The same God who will sort you authored the Book you're dismissing." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Four Challenges", ayahs: "57–74",
        desc: "We created you, so why do you not believe? Your crops, your children, your water, your fire — who made them?",
        note: "The center of the ring is the present world — the evidence in your hands right now. The afterlife is the frame. The proof is here.",
      },
    },
    deductiveFunnel: {
      title: "The Four Challenges",
      subtitle: "Each challenge strips away one more layer of human self-sufficiency",
      layers: [
        { depth: 1, label: "Agriculture", ayah: "63–65", arabic: "أَأَنتُمْ تَزْرَعُونَهُ أَمْ نَحْنُ الزَّارِعُونَ", desc: "You plant the seed — but who makes it grow? And if We willed, We could turn it to debris. Everything you planted, everything you harvested — dry stalks in an instant. The threat embedded in the gift.", color: "#4ecdc4" },
        { depth: 2, label: "Reproduction", ayah: "58–59", arabic: "أَأَنتُمْ تَخْلُقُونَهُ أَمْ نَحْنُ الْخَالِقُونَ", desc: "Have you considered what you emit? Is it you who creates it, or are We? The most intimate act — even here, you are not the author. You did not choose to be born. You cannot choose not to die.", color: "#9b7fd4" },
        { depth: 3, label: "Water", ayah: "68–70", arabic: "أَأَنتُمْ أَنزَلْتُمُوهُ مِنَ الْمُزْنِ أَمْ نَحْنُ الْمُنزِلُونَ", desc: "The water you drink every day — who sent it down from the clouds? If We willed, We could make it bitter. The freshness you never think about, one divine decision away from undrinkable.", color: "#e07a8a" },
        { depth: 4, label: "Fire", ayah: "71–73", arabic: "أَأَنتُمْ أَنشَأْتُمْ شَجَرَتَهَا أَمْ نَحْنُ الْمُنشِئُونَ", desc: "The fire you kindle — who produced its tree? Fire from wood, wood from trees, trees from seeds, and the chain leads back to the same source. Every time you strike a flame, you are being reminded.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is asking you to change your perception, not your behavior",
      absences: [
        { item: "No moral commands", note: "No prohibitions. No 'O you who believe, do such-and-such.' No legal framework, no social legislation, no ethical teaching. The surah is entirely concerned with what will happen and what has already been given." },
        { item: "No prophets or narratives", note: "No historical warning through destroyed nations. The surah's evidence is not historical but empirical — it points at the world you are standing in and says: look again." },
        { item: "No binary sorting", note: "The standard eschatological division in the Quran is two: believers and disbelievers. Al-Waqiah insists on three. The Foremost are separated from the merely righteous by a distinction the surah never fully explains — nearness versus reward." },
        { item: "No explanation of the Foremost", note: "The surah names them, describes their reward, but never tells you what they did to earn it. The criteria for being among the Foremost are left unstated — an open question addressed to every reader." },
        { item: "No comfort for the dying", note: "The deathbed scene offers no consolation — only a challenge. Bring the soul back, if you are truthful. Every human pretension to self-sufficiency collapses at that bedside." },
      ],
    },
  },

  contentNodes: [
    { concept: "The tripartite sorting — three groups, not two", type: "surah-specific", articleSlug: "waqiah-three-groups-56" },
    { concept: "The four creation-challenges — crops, seed, water, fire", type: "surah-specific", articleSlug: "waqiah-four-challenges-56" },
    { concept: "Ar-Rahman / Al-Waqiah twin — gift then invoice", type: "cross-surah", articleSlug: "ar-rahman-waqiah-twin" },
    { concept: "Mawaaqi al-nujum — the oath on the positions of the stars", type: "cross-surah", articleSlug: "oath-positions-stars-56" },
  ],
};

const TABS = [
  { id: "sorting", label: "Sorting" },
  { id: "ring", label: "Ring" },
  { id: "challenges", label: "Challenges" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">۞</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
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
          <div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none">
            <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return ( <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"> <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p> <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p> <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p> </div> );
}

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return ( <div className="space-y-5">{verses.map((v) => ( <div key={v.ayah} className="space-y-1"> <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p> <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p> </div> ))}</div> );
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.sections.map((sec, i) => ( <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span> <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span> </div> <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p> {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>} </div> ))}</div> </div> );
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> {data.pairs.map((pair, i) => ( <div key={i} className="flex gap-2"> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}> <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div> <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p> </div> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}> <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div> <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p> </div> </div> ))} <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"> <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div> <p className="text-sm italic text-cream font-body">{data.center.desc}</p> <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p> </div> </div> );
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-2">{data.layers.map((layer, i) => ( <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span> <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span> </div> <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p> {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>} </button> ))}</div> <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Crops → children → water → fire — who made any of them?</div> </div> );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.absences.map((a, i) => ( <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"> <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div> <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p> </div> ))}</div> </div> );
}

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">3</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Groups</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button> ))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "sorting" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "challenges" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && ( <div className="space-y-6"> <FullSurahText verses={d.fullText} /> <OrnamentDivider /> <HeartVerse verse={d.heartVerse} /> <AudioPlayer audio={d.audio} /> </div> )}
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
