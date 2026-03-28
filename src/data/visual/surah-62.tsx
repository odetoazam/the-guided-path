"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-JUMU'AH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-jumua
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Jumu'ah",
  arabicName: "الجُمُعَة",
  meaning: "Friday",
  number: 62,
  ayahCount: 11,
  period: "Madani",
  juz: 28,
  movements: 3,
  thesis:
    "An eleven-ayah argument about the gap between possessing guidance and being transformed by it — from the cosmic mission of the Prophet, through a donkey carrying books it cannot read, to a congregation that abandoned the Prophet's sermon for a passing caravan.",
  reflectionUrl: "/surahs/al-jumua",
  readTime: "18 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"balaghah","english":"Rhetoric"},{"key":"amthal","english":"Parables"}],
  heartVerse: {
    arabic: "وَتَرَكُوكَ قَائِمًا",
    ayahRef: "62:11",
    translation: "And they left you standing.",
    why: "The surah's emotional center. The Prophet stands at the pulpit. The mosque empties. The congregation scatters toward a caravan. Three words freeze the image of abandoned authority — the living embodiment of the Book, left standing while his community chases commerce.",
  },

  audio: { surahNumber: 62, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ الْمَلِكِ الْقُدُّوسِ الْعَزِيزِ الْحَكِيمِ", translation: "Whatever is in the heavens and whatever is on the earth glorifies Allah, the Sovereign, the Holy, the Almighty, the Wise." },
    { ayah: 2, arabic: "هُوَ الَّذِي بَعَثَ فِي الْأُمِّيِّينَ رَسُولًا مِّنْهُمْ يَتْلُو عَلَيْهِمْ آيَاتِهِ وَيُزَكِّيهِمْ وَيُعَلِّمُهُمُ الْكِتَابَ وَالْحِكْمَةَ وَإِن كَانُوا مِن قَبْلُ لَفِي ضَلَالٍ مُّبِينٍ", translation: "It is He who sent among the unlettered a Messenger from themselves reciting to them His verses and purifying them and teaching them the Book and wisdom, although they had been before in clear error." },
    { ayah: 3, arabic: "وَآخَرِينَ مِنْهُمْ لَمَّا يَلْحَقُوا بِهِمْ ۚ وَهُوَ الْعَزِيزُ الْحَكِيمُ", translation: "And others among them who have not yet joined them. And He is the Almighty, the Wise." },
    { ayah: 4, arabic: "ذَٰلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَن يَشَاءُ ۚ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ", translation: "That is the bounty of Allah, which He gives to whom He wills. And Allah is the possessor of great bounty." },
    { ayah: 5, arabic: "مَثَلُ الَّذِينَ حُمِّلُوا التَّوْرَاةَ ثُمَّ لَمْ يَحْمِلُوهَا كَمَثَلِ الْحِمَارِ يَحْمِلُ أَسْفَارًا ۚ بِئْسَ مَثَلُ الْقَوْمِ الَّذِينَ كَذَّبُوا بِآيَاتِ اللَّهِ ۚ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ", translation: "The example of those who were entrusted with the Torah and then did not carry it is like a donkey carrying volumes of books. How wretched is the example of the people who denied the signs of Allah. And Allah does not guide the wrongdoing people." },
    { ayah: 6, arabic: "قُلْ يَا أَيُّهَا الَّذِينَ هَادُوا إِن زَعَمْتُمْ أَنَّكُمْ أَوْلِيَاءُ لِلَّهِ مِن دُونِ النَّاسِ فَتَمَنَّوُا الْمَوْتَ إِن كُنتُمْ صَادِقِينَ", translation: "Say, 'O you who are Jews, if you claim that you are allies of Allah, excluding all other people, then wish for death, if you are truthful.'" },
    { ayah: 7, arabic: "وَلَا يَتَمَنَّوْنَهُ أَبَدًا بِمَا قَدَّمَتْ أَيْدِيهِمْ ۚ وَاللَّهُ عَلِيمٌ بِالظَّالِمِينَ", translation: "But they will never wish for it, ever, because of what their hands have put forth. And Allah is Knowing of the wrongdoers." },
    { ayah: 8, arabic: "قُلْ إِنَّ الْمَوْتَ الَّذِي تَفِرُّونَ مِنْهُ فَإِنَّهُ مُلَاقِيكُمْ ۖ ثُمَّ تُرَدُّونَ إِلَىٰ عَالِمِ الْغَيْبِ وَالشَّهَادَةِ فَيُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ", translation: "Say, 'Indeed, the death from which you flee — it will meet you. Then you will be returned to the Knower of the unseen and the witnessed, and He will inform you of what you used to do.'" },
    { ayah: 9, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ", translation: "O you who believe, when the call to prayer is made on Friday, then hasten to the remembrance of Allah and leave trade. That is better for you, if you only knew." },
    { ayah: 10, arabic: "فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ", translation: "And when the prayer has been concluded, disperse in the land and seek from the bounty of Allah, and remember Allah often that you may succeed." },
    { ayah: 11, arabic: "وَإِذَا رَأَوْا تِجَارَةً أَوْ لَهْوًا انفَضُّوا إِلَيْهَا وَتَرَكُوكَ قَائِمًا ۚ قُلْ مَا عِندَ اللَّهِ خَيْرٌ مِّنَ اللَّهْوِ وَمِنَ التِّجَارَةِ ۚ وَاللَّهُ خَيْرُ الرَّازِقِينَ", translation: "And when they saw a transaction or amusement, they rushed to it and left you standing. Say, 'What is with Allah is better than amusement and trade. And Allah is the best of providers.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "Three Panels",
      subtitle: "The Gift, the Failure, and the Test",
      sections: [
        { ayahs: "1–4", title: "The Gift", color: "#4ecdc4", desc: "Allah sends a Prophet to the unlettered, giving them recitation, purification, and wisdom. The positive case — what happens when divine instruction meets a receptive community. The word fadl (bounty) names the gift." },
        { ayahs: "5–8", title: "The Failure", color: "#e07a8a", desc: "Those given the Torah before carried it like a donkey carries books — laborious transport without comprehension. They claim special status but cannot face death. The negative case — knowledge possessed without transformation." },
        { ayahs: "9–11", title: "The Test", color: "#C9A84C", isPivot: true, desc: "The Muslim community receives its own instruction — attend Friday prayer, leave trade — and immediately fails it. The caravan arrives, the mosque empties, the Prophet is left standing." },
      ],
    },
    chiasticRing: {
      title: "The Vocabulary Mirror",
      subtitle: "Key roots thread the surah's argument across its three panels",
      pairs: [
        {
          left: { label: "Fadl as Mission", ayahs: "4", desc: "The fadl of Allah is the sending of the Prophet — the supreme gift of guidance to human history" },
          right: { label: "Fadl as Livelihood", ayahs: "10", desc: "The fadl of Allah is provision sought after prayer — the same word, now material" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Cosmic Tasbih", ayahs: "1", desc: "Everything in the heavens and earth glorifies Allah continuously, without interruption" },
          right: { label: "The Empty Mosque", ayahs: "11", desc: "A congregation that cannot maintain attention through a single sermon — creation glorifies; they scatter" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Donkey's Burden", ayahs: "5", desc: "Scripture carried as physical weight, never entering the mind — the Quran's most precise image for unintegrated knowledge" },
          right: { label: "The Prophet Left Standing", ayahs: "11", desc: "The living embodiment of the Book, abandoned mid-sermon — the same failure from a different angle" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Friday Command", ayahs: "9",
        desc: "When the call to prayer is made, hasten to the remembrance of Allah and leave trade.",
        note: "The hinge between diagnosis and test. The simplest possible measure of whether knowledge has moved from the back to the mind.",
      },
    },
    deductiveFunnel: {
      title: "The Descent of Dhikr",
      subtitle: "The root dh-k-r (remembrance) moves through three stages across the surah",
      layers: [
        { depth: 1, label: "Received", ayah: "2", arabic: "يُزَكِّيهِمْ", desc: "The Prophet purifies them (tazkiyah). Remembrance is first something done to the community — received, not yet generated by them.", color: "#4ecdc4" },
        { depth: 2, label: "Performed", ayah: "9", arabic: "فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ", desc: "Hasten to the dhikr of Allah — remembrance as communal act. The community responds to the call and performs what it has received.", color: "#9b7fd4" },
        { depth: 3, label: "Lived", ayah: "10", arabic: "وَاذْكُرُوا اللَّهَ كَثِيرًا", desc: "Remember Allah often — remembrance carried into the marketplace, into daily life. The dhikr of the mosque extends into the world.", color: "#C9A84C" },
        { depth: 4, label: "Abandoned", ayah: "11", arabic: "انفَضُّوا إِلَيْهَا", desc: "They scattered toward trade. The remembrance that was received, performed, and meant to be lived is abandoned for commerce. The arc breaks.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah keeps its argument entirely in this world",
      absences: [
        { item: "No afterlife in any developed sense", note: "No paradise, no hellfire, no detailed reckoning. Death is mentioned only as a challenge to the Jews. The surah does not need eternal consequences — it makes its case about real-time priorities." },
        { item: "No destroyed nations", note: "No historical catastrophe invoked. No 'Ad, no Thamud, no flood. The failure the surah diagnoses is not dramatic — it is ordinary, domestic, weekly." },
        { item: "No legal detail", note: "The Friday prayer command is stated in a single ayah with no procedural specificity. The law here is principle, not procedure." },
        { item: "No cosmic imagery beyond the opening", note: "No angels, no jinn, no natural signs. After the opening tasbih, the surah stays at ground level — knowledge, worship, commerce." },
        { item: "No comfort or consolation", note: "The surah does not address a suffering community. It addresses a distracted one. The medicine is clarity, not comfort." },
      ],
    },
  },

  contentNodes: [
    { concept: "The donkey metaphor — scripture without transformation", type: "surah-specific", articleSlug: "donkey-metaphor-62-5" },
    { concept: "Tijarah in 61 vs 62 — sacred and worldly transactions", type: "cross-surah", articleSlug: "tijarah-saff-jumuah" },
    { concept: "The musabbihat cluster (57, 59, 61, 62, 64)", type: "cross-surah", articleSlug: "musabbihat-cluster" },
    { concept: "Fadl — bounty as guidance and provision", type: "surah-specific", articleSlug: "fadl-jumuah-62" },
  ],
};

const TABS = [
  { id: "journey", label: "Panels" },
  { id: "mirror", label: "Mirror" },
  { id: "funnel", label: "Dhikr" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
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
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3">
      <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
      <div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div>
      <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>);
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>); }

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Received → performed → lived → abandoned</div></div>);
}

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
      <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
        <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div>
      </div>
      <div className="min-h-[400px] pt-6 pb-8">
        {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
        {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
        {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
        {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
        {activeTab === "text" && (<div className="space-y-6"><FullSurahText verses={d.fullText} /><OrnamentDivider /><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>)}
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
