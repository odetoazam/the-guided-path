"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AS-SAJDAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/as-sajdah
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "As-Sajdah",
  arabicName: "السَّجدة",
  meaning: "The Prostration",
  number: 32,
  ayahCount: 30,
  period: "Makki",
  juz: 21,
  movements: 4,
  thesis:
    "A thirty-ayah surah that begins at Allah's throne and ends at the dust of forgotten civilizations — and between those two poles traces the entire arc of existence, funneling everything cosmic toward a single person praying in the dark.",
  reflectionUrl: "/surahs/as-sajdah",
  readTime: "20 min read",

  sciencesActive: [{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"},{"key":"munasabat","english":"Inter-surah Connections"}],
  heartVerse: {
    arabic: "تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا",
    ayahRef: "32:16",
    translation: "Their sides forsake their beds; they call upon their Lord in fear and hope.",
    why: "The surah's emotional and structural center. The entire cosmological argument — the throne, the six days, the clay, the spirit, the angel of death, the reckoning — funnels into a bedroom in the last third of the night. The verb tatajafa describes the body's refusal to stay comfortable. Something pulls it upward.",
  },

  audio: { surahNumber: 32, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الم", translation: "Alif, Lam, Mim." },
    { ayah: 2, arabic: "تَنزِيلُ الْكِتَابِ لَا رَيْبَ فِيهِ مِن رَّبِّ الْعَالَمِينَ", translation: "The revelation of this Book, about which there is no doubt, is from the Lord of all worlds." },
    { ayah: 4, arabic: "اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَمَا بَيْنَهُمَا فِي سِتَّةِ أَيَّامٍ", translation: "Allah is the One who created the heavens and the earth and all between them in six days." },
    { ayah: 7, arabic: "الَّذِي أَحْسَنَ كُلَّ شَيْءٍ خَلَقَهُ ۖ وَبَدَأَ خَلْقَ الْإِنسَانِ مِن طِينٍ", translation: "He who perfected everything He created, and began the creation of the human being from clay." },
    { ayah: 9, arabic: "ثُمَّ سَوَّاهُ وَنَفَخَ فِيهِ مِن رُّوحِهِ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ", translation: "Then He proportioned him and breathed into him of His spirit, and made for you hearing and sight and hearts." },
    { ayah: 10, arabic: "وَقَالُوا أَإِذَا ضَلَلْنَا فِي الْأَرْضِ أَإِنَّا لَفِي خَلْقٍ جَدِيدٍ", translation: "And they say: when we are lost in the earth, will we indeed be in a new creation?" },
    { ayah: 11, arabic: "قُلْ يَتَوَفَّاكُم مَّلَكُ الْمَوْتِ الَّذِي وُكِّلَ بِكُمْ", translation: "Say: the angel of death who has been entrusted with you will take you." },
    { ayah: 15, arabic: "إِنَّمَا يُؤْمِنُ بِآيَاتِنَا الَّذِينَ إِذَا ذُكِّرُوا بِهَا خَرُّوا سُجَّدًا", translation: "Only those believe in Our signs who, when reminded of them, fall in prostration." },
    { ayah: 16, arabic: "تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا", translation: "Their sides forsake their beds; they call upon their Lord in fear and hope." },
    { ayah: 17, arabic: "فَلَا تَعْلَمُ نَفْسٌ مَّا أُخْفِيَ لَهُم مِّن قُرَّةِ أَعْيُنٍ", translation: "No soul knows what has been hidden for them of the coolness of eyes." },
    { ayah: 24, arabic: "وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا وَكَانُوا بِآيَاتِنَا يُوقِنُونَ", translation: "And We made from among them leaders guiding by Our command when they were patient and certain of Our signs." },
    { ayah: 27, arabic: "أَوَلَمْ يَرَوْا أَنَّا نَسُوقُ الْمَاءَ إِلَى الْأَرْضِ الْجُرُزِ فَنُخْرِجُ بِهِ زَرْعًا", translation: "Have they not seen that We drive water to barren land and bring forth thereby crops?" },
    { ayah: 30, arabic: "فَأَعْرِضْ عَنْهُمْ وَانتَظِرْ إِنَّهُم مُّنتَظِرُونَ", translation: "So turn away from them and wait. Indeed, they are waiting." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Arc",
      subtitle: "Four rooms: creation → denial → prostration → precedent",
      sections: [
        { ayahs: "1–9", title: "Creation: Throne to Clay to Spirit", color: "#4ecdc4", desc: "The widest aperture: six days, the throne, the management of affairs. Then the collapse from cosmic to intimate — from heaven to a body made of clay, given water, proportioned, breathed into with God's own spirit. Hearing, sight, hearts. And the quiet indictment: little do you give thanks." },
        { ayahs: "10–14", title: "Denial and Reckoning", color: "#e07a8a", desc: "They say: when we are lost in the earth, will we really be made new? The angel of death answers. Then the devastating scene: the guilty hang their heads — now they are certain, in the one place where certainty can no longer help." },
        { ayahs: "15–22", title: "The Night Worshippers", color: "#C9A84C", isPivot: true, desc: "The surah's center. Those whose sides forsake their beds — tatajafa, the body's refusal to stay comfortable. Between fear and hope they call. Their reward has been hidden — ukhfiya — secrecy matched with secrecy. Then the separation: believers and the corrupt are not equal." },
        { ayahs: "23–30", title: "Precedent and Waiting", color: "#9b7fd4", desc: "Musa and the Torah in one ayah. Leaders forged by sabr and yaqin. Ruined nations. Rain on dead land — the proof of resurrection in your fields. The closing command: turn away and wait. Both parties wait, but what they wait for is not the same thing." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "A concentric structure that makes its center unmistakable",
      pairs: [
        {
          left: { label: "The Book's Origin", ayahs: "1–3", desc: "The Quran is from the Lord of all worlds. They say he fabricated it — the surah answers with creation." },
          right: { label: "The Challenge & Waiting", ayahs: "28–30", desc: "When will this victory come? Turn away and wait. The opening's certainty (la rayba) inhabits patience (intazir)." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Cosmic Creation", ayahs: "4–6", desc: "Heavens, earth, throne, the management of affairs ascending and descending." },
          right: { label: "Historical Signs", ayahs: "24–27", desc: "Patient leaders, ruined nations, rain on dead land — creation's evidence in history and landscape." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Human Creation", ayahs: "7–9", desc: "Clay, water, spirit breathed in, hearing, sight, hearts. The internal Book of the human body." },
          right: { label: "Musa's Book", ayahs: "23", desc: "The external Book of revelation — mirroring the internal one. Both are gifts. Both can be ignored." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Night Worshippers", ayahs: "15–17",
        desc: "Those whose sides forsake their beds, calling on God in fear and hope. The hidden reward.",
        note: "The sajdah is the structural center of a surah called 'The Prostration.' The prostration is the lowest physical point a body can reach — and in the surah's architecture, it is the point from which everything ascends.",
      },
    },
    deductiveFunnel: {
      title: "The Collapse",
      subtitle: "From the widest cosmic aperture to the most intimate human act",
      layers: [
        { depth: 1, label: "The Throne", ayah: "4–5", arabic: "ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ", desc: "Six days of creation, establishment on the throne, the management of all affairs. The widest possible frame — everything starts at the scale of the cosmos.", color: "#4ecdc4" },
        { depth: 2, label: "The Body", ayah: "7–9", arabic: "وَبَدَأَ خَلْقَ الْإِنسَانِ مِن طِينٍ", desc: "Clay, then water, then spirit breathed in. The cosmos narrows to a single body. The phrase min ruhih — of His spirit — grounds human dignity.", color: "#9b7fd4" },
        { depth: 3, label: "The Reckoning", ayah: "12", arabic: "رَبَّنَا أَبْصَرْنَا وَسَمِعْنَا", desc: "Now they see, now they hear — too late. The certainty they refused in life arrives where it cannot help. The guilty hang their heads.", color: "#e07a8a" },
        { depth: 4, label: "The Prayer Mat", ayah: "16", arabic: "تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ", desc: "Everything funnels here. The universe was made, a body was shaped, a spirit was breathed, and the proof that the spirit is real is this: it wakes you at 3 a.m.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that strips narrative to its skeleton — argument replaces story",
      absences: [
        { item: "No extended prophetic narrative", note: "Musa appears in one ayah (23). No dramatic scene, no dialogue, no Pharaoh. Where Surah Hud gives you eleven prophets, As-Sajdah gives you the logic that makes all eleven unnecessary: look at the creation inside you and draw the conclusion yourself." },
        { item: "No ethical legislation", note: "No commands about charity, prayer times, family law. The surah is making an ontological case — about what you are, where you came from, where you are going — and trusts that behavior follows from seeing clearly." },
        { item: "No description of Paradise in the hidden reward", note: "No gardens, rivers, or thrones. Qurrat a'yun — the cooling of the eyes — is left undefined. The reward is hidden even from the text that announces it." },
        { item: "No named destroyed nation", note: "The ruins are mentioned (ayahs 26-27) but without names or cities. The surah has stripped warning to its most abstract form: you walk through their ruins. That is enough." },
        { item: "No resolution to the waiting", note: "Both parties wait (ayah 30). The Prophet waits for Allah's promise. The Quraysh wait for him to fail. Same verb — intazar — opposite meaning. The surah closes on shared posture concealing absolute divergence." },
      ],
    },
  },

  contentNodes: [
    { concept: "Min ruhih — the breathing of the spirit and human dignity", type: "surah-specific", articleSlug: "min-ruhih-spirit-dignity-32-9" },
    { concept: "The sajdah-spirit mirror: angels prostrate to Adam, believers prostrate to God", type: "cross-surah", articleSlug: "sajdah-spirit-mirror-32-38" },
    { concept: "Tatajafa — the body's refusal to stay comfortable", type: "surah-specific", articleSlug: "tatajafa-body-night-prayer-32-16" },
    { concept: "As-Sajdah and Al-Mulk — the Friday night pairing", type: "cross-surah", articleSlug: "sajdah-mulk-friday-pairing" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "arc", label: "Arc" },
  { id: "ring", label: "Ring" },
  { id: "collapse", label: "Collapse" },
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
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Throne → body → reckoning → prayer mat</div></div>);
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
          {activeTab === "arc" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "collapse" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
