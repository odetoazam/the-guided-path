"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH LUQMAN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/luqman
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Luqman",
  arabicName: "لُقمان",
  meaning: "Luqman the Wise",
  number: 31,
  ayahCount: 34,
  period: "Makki",
  juz: 21,
  movements: 5,
  thesis:
    "A thirty-four-ayah surah named after a man who was never given prophethood — a father speaking quietly to his son, passing on everything he has learned about God, pride, patience, and how to walk through the world without losing yourself.",
  reflectionUrl: "/surahs/luqman",
  readTime: "22 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَا بُنَيَّ إِنَّهَا إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِي صَخْرَةٍ أَوْ فِي السَّمَاوَاتِ أَوْ فِي الْأَرْضِ يَأْتِ بِهَا اللَّهُ",
    ayahRef: "31:16",
    translation: "O my son, indeed if it be the weight of a mustard seed within a rock or in the heavens or in the earth, Allah will bring it forth.",
    why: "The ethical hinge of the surah. Everything before establishes tawhid and the parent-child bond. Everything after flows from this: if God sees the mustard seed in the rock, then prayer matters, character matters, the angle of your face when you speak to someone matters.",
  },

  audio: { surahNumber: 31, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الم", translation: "Alif, Lam, Mim." },
    { ayah: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ", translation: "These are the signs of the wise Book —" },
    { ayah: 12, arabic: "وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ", translation: "And We had certainly given Luqman wisdom, saying: 'Be grateful to Allah.'" },
    { ayah: 13, arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ", translation: "And when Luqman said to his son while advising him: 'O my son, do not associate anything with Allah.'" },
    { ayah: 14, arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ", translation: "And We have enjoined upon man concerning his parents — his mother carried him in weakness upon weakness." },
    { ayah: 16, arabic: "يَا بُنَيَّ إِنَّهَا إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِي صَخْرَةٍ أَوْ فِي السَّمَاوَاتِ أَوْ فِي الْأَرْضِ يَأْتِ بِهَا اللَّهُ", translation: "O my son, indeed if it be the weight of a mustard seed within a rock or in the heavens or in the earth, Allah will bring it forth." },
    { ayah: 17, arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ", translation: "O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you." },
    { ayah: 18, arabic: "وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا", translation: "And do not turn your cheek away from people in contempt, and do not walk through the earth with insolence." },
    { ayah: 19, arabic: "وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ ۚ إِنَّ أَنكَرَ الْأَصْوَاتِ لَصَوْتُ الْحَمِيرِ", translation: "Be moderate in your pace and lower your voice. Indeed, the most disagreeable of sounds is the voice of donkeys." },
    { ayah: 22, arabic: "وَمَن يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ", translation: "Whoever submits his face to Allah while being a doer of good has grasped the most trustworthy handhold." },
    { ayah: 27, arabic: "وَلَوْ أَنَّمَا فِي الْأَرْضِ مِن شَجَرَةٍ أَقْلَامٌ وَالْبَحْرُ يَمُدُّهُ مِن بَعْدِهِ سَبْعَةُ أَبْحُرٍ مَّا نَفِدَتْ كَلِمَاتُ اللَّهِ", translation: "If all the trees on earth were pens and the ocean were ink, replenished by seven more oceans, the words of Allah would not be exhausted." },
    { ayah: 33, arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ وَاخْشَوْا يَوْمًا لَّا يَجْزِي وَالِدٌ عَن وَلَدِهِ", translation: "O mankind, fear your Lord and fear a Day when no father will avail his son." },
    { ayah: 34, arabic: "إِنَّ اللَّهَ عِندَهُ عِلْمُ السَّاعَةِ وَيُنَزِّلُ الْغَيْثَ وَيَعْلَمُ مَا فِي الْأَرْحَامِ", translation: "Indeed, Allah alone has knowledge of the Hour. He sends down the rain. He knows what is in the wombs." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Counsel",
      subtitle: "Five movements: the wise Book → wisdom defined → the father's counsel → the challenge → the five unknowables",
      sections: [
        { ayahs: "1–11", title: "The Wise Book", color: "#4ecdc4", desc: "The Quran declared al-hakim — wise. Two kinds of listeners contrasted: one who receives the Book and one who trades in lahw al-hadith, idle speech that displaces. The obstacle to wisdom is not ignorance — it is arrogance (mustakbiran)." },
        { ayahs: "12", title: "Wisdom Defined", color: "#C9A84C", desc: "A single ayah that changes everything. Luqman is given al-hikmah, and the surah defines it immediately: gratitude. An ushkur lillah. The entire content of wisdom compressed into two words." },
        { ayahs: "13–19", title: "The Father's Counsel", color: "#9b7fd4", isPivot: true, desc: "Tawhid, the mother's sacrifice (wahnan 'ala wahn), God's awareness of the mustard seed, prayer, moral responsibility, patience, the diseases of pride — how you walk, how you speak. Luqman covers the whole person." },
        { ayahs: "20–29", title: "The Challenge & the Cosmic", color: "#e07a8a", desc: "Those who argue without knowledge. The 'urwa al-wuthqa — the firmest handhold. Then the staggering image: every tree a pen, the ocean ink, seven more oceans — God's words never exhausted. Luqman's few sentences set inside infinite divine speech." },
        { ayahs: "30–34", title: "The Five Unknowables", color: "#4ecdc4", desc: "No father will avail his son on that Day. The Hour, the rain, the wombs, tomorrow's provision, the place of your death — five domains of knowledge that belong to God alone. The surah that began with what wisdom can give ends with what wisdom cannot know." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah layers divine knowledge around the center of a father's counsel",
      pairs: [
        {
          left: { label: "The Wise Book", ayahs: "1–11", desc: "The Quran as al-kitab al-hakim — signs of the wise Book. Creation signs confirm the source." },
          right: { label: "Cosmic Signs & Unknowables", ayahs: "26–34", desc: "God's inexhaustible words, the five unknowables. The closing frame of divine knowledge beyond human reach." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Wisdom Received", ayahs: "12", desc: "Luqman receives hikmah, defined as gratitude. The accepting response to guidance." },
          right: { label: "Wisdom Rejected", ayahs: "20–25", desc: "Those who follow ancestral custom without thought. The refusing response to guidance." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Father's Counsel", ayahs: "13–19",
        desc: "Tawhid meets parenthood. Luqman speaks, Allah interrupts to honor the mother, then Luqman resumes: the mustard seed, prayer, character, humility.",
        note: "The center of the ring is the mother's body (wahnan 'ala wahn). In a surah named after the father, the architectural weight falls on the mother's sacrifice.",
      },
    },
    deductiveFunnel: {
      title: "The Pedagogy",
      subtitle: "Luqman's counsel moves from theology to embodied practice in a single arc",
      layers: [
        { depth: 1, label: "Tawhid", ayah: "13", arabic: "يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ", desc: "The foundation. Do not associate anything with Allah. Addressed as ya bunayya — my dear son, my little one. The theological instruction arrives wrapped in tenderness.", color: "#4ecdc4" },
        { depth: 2, label: "Awareness", ayah: "16", arabic: "إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ", desc: "The ethical hinge. If God sees a mustard seed inside a rock — al-Latif, the Subtle, the one whose awareness reaches into places too small for anyone else. Theology becomes ethics.", color: "#9b7fd4" },
        { depth: 3, label: "Practice", ayah: "17", arabic: "أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ", desc: "Four commands in one ayah. Prayer (vertical), moral responsibility (horizontal), patience (internal). The word 'azm — resolve, backbone — closes the sequence.", color: "#e07a8a" },
        { depth: 4, label: "Character", ayah: "18–19", arabic: "وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ", desc: "Pride is not a doctrine — it is a posture. The sideways turn of the face, the bouncing gait, the raised voice. Luqman reads his son's future body language and warns.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that replaces destruction with counsel — every absence shapes the argument",
      absences: [
        { item: "No destroyed nations", note: "No 'Ad, no Thamud, no people of Lut. For a Makkan surah, this is extraordinary. Luqman replaces warning-by-destruction with warning-by-counsel. The danger is internal: pride, heedlessness, the swaggering gait." },
        { item: "No direct address to the Prophet", note: "The surah speaks through the Prophet but not to him by name or title. The audience is wider — parents, children, anyone who has been given advice and must decide whether to receive it." },
        { item: "No prophetic status for Luqman", note: "He is a hakim, a wise man — not a prophet. His direct speech is quoted at length as moral instruction, the only non-prophet afforded this treatment in the entire Quran." },
        { item: "No certainty about the future", note: "The five unknowables close the surah: the Hour, rain, the wombs, tomorrow, the place of death. Luqman can teach his son how to live. He cannot tell him when or where he will die." },
        { item: "No separation of wisdom and gratitude", note: "Hikmah is defined as shukr in ayah 12. The double helix of the surah: wisdom is gratitude, ingratitude is disbelief. They cannot be separated." },
      ],
    },
  },

  contentNodes: [
    { concept: "Wahnan 'ala wahn — the mother at the center of the father's surah", type: "surah-specific", articleSlug: "wahnan-ala-wahn-mother-center-31" },
    { concept: "Al-'urwa al-wuthqa — the firmest handhold in Luqman and Al-Baqarah", type: "cross-surah", articleSlug: "urwa-wuthqa-handhold-luqman-baqarah" },
    { concept: "The five unknowables and the Hadith of Jibril", type: "cross-surah", articleSlug: "five-unknowables-hadith-jibril-31-34" },
    { concept: "Luqman's embodied ethics — pride as posture, not doctrine", type: "surah-specific", articleSlug: "luqman-embodied-ethics-pride-posture" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "counsel", label: "Counsel" },
  { id: "ring", label: "Ring" },
  { id: "pedagogy", label: "Pedagogy" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
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
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
        <div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>);
}

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>);
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Theology → awareness → practice → character</div></div>);
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
          {activeTab === "counsel" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "pedagogy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (<div className="space-y-6"><FullSurahText verses={d.fullText} /><OrnamentDivider /><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>)}
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
