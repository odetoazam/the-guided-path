"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUJADILA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-mujadila
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mujadila",
  arabicName: "المجادلة",
  meaning: "The Pleading Woman",
  number: 58,
  ayahCount: 22,
  period: "Madani",
  juz: 28,
  movements: 5,
  thesis:
    "A surah that took a single woman's whispered complaint and drew from it a complete theology of the private — from a husband's cruelty to the cosmic division of loyalties — insisting that every hidden word is already part of the record.",
  reflectionUrl: "/surahs/al-mujadila",
  readTime: "22 min read",

  heartVerse: {
    arabic: "مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ",
    ayahRef: "58:7",
    translation: "There is no private conversation among three except that He is the fourth.",
    why: "The surah's most sweeping statement about divine omniscience. No configuration of private counsel escapes His presence — He is the fourth among three, the sixth among five, present wherever you are. In a surah about whispered conspiracies and hidden loyalties, this verse demolishes the concept of secrecy itself.",
  },

  audio: { surahNumber: 58, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا وَتَشْتَكِي إِلَى اللَّهِ", translation: "Allah has certainly heard the speech of the woman who argues with you concerning her husband and complains to Allah." },
    { ayah: 2, arabic: "الَّذِينَ يُظَاهِرُونَ مِنكُم مِّن نِّسَائِهِم مَّا هُنَّ أُمَّهَاتِهِمْ", translation: "Those among you who declare their wives as their mothers — they are not their mothers." },
    { ayah: 7, arabic: "مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ", translation: "There is no private conversation among three except that He is the fourth." },
    { ayah: 9, arabic: "إِذَا تَنَاجَيْتُمْ فَلَا تَتَنَاجَوْا بِالْإِثْمِ وَالْعُدْوَانِ", translation: "When you converse privately, do not converse in sin and aggression." },
    { ayah: 11, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قِيلَ لَكُمْ تَفَسَّحُوا فِي الْمَجَالِسِ فَافْسَحُوا", translation: "O you who believe, when you are told to make room in gatherings, make room." },
    { ayah: 19, arabic: "اسْتَحْوَذَ عَلَيْهِمُ الشَّيْطَانُ فَأَنسَاهُمْ ذِكْرَ اللَّهِ ۚ أُولَـٰئِكَ حِزْبُ الشَّيْطَانِ", translation: "Satan has overcome them and made them forget the remembrance of Allah. Those are the party of Satan." },
    { ayah: 22, arabic: "أُولَـٰئِكَ حِزْبُ اللَّهِ ۚ أَلَا إِنَّ حِزْبَ اللَّهِ هُمُ الْمُفْلِحُونَ", translation: "Those are the party of Allah. Indeed, the party of Allah — they are the successful." },
  ],

  diagrams: {
    sectionJourney: {
      title: "From Whisper to Verdict",
      subtitle: "Five movements: the plea → the warning → secret counsel → assembly ethics → the great division",
      sections: [
        { ayahs: "1–4", title: "The Plea That Was Heard", color: "#4ecdc4", desc: "A woman — Khawla bint Tha'laba — brings a domestic injustice to the Prophet. Her husband declared zihar, freezing her in legal limbo. The Prophet had no answer. So she raised her complaint to Allah, and Allah answered. Qad sami'a — He has certainly heard. The emphatic particle leaves no ambiguity." },
        { ayahs: "5–6", title: "The Warning", color: "#e07a8a", desc: "Those who oppose Allah and His Messenger will be humiliated. Allah has enumerated their deeds while they forgot them. The same divine hearing that comforts the wronged now becomes a warning to the wrongdoer." },
        { ayahs: "7–10", title: "The Anatomy of Secret Counsel", color: "#9b7fd4", isPivot: true, desc: "The surah's architectural center. God is the fourth among three, the sixth among five — present in every private conversation. The word najwa (secret counsel) becomes the central keyword. Conspiratorial najwa is from Satan. Righteous najwa is permitted. The surah demolishes the concept of a private space above God's hearing." },
        { ayahs: "11–13", title: "The Ethics of Assembly", color: "#C9A84C", desc: "Make room in gatherings — tafassahu. After ten ayahs on invisible architecture, the surah turns to visible architecture: how bodies occupy shared space. A charitable gift before private audience with the Prophet — legislated in one ayah, eased in the next. The disease and the cure use the same Arabic root." },
        { ayahs: "14–22", title: "The Great Division", color: "#e07a8a", desc: "Those who befriended God's enemies — their oaths used as shields. Satan's party versus Allah's party. The surah's final words: the party of Allah, they are the successful. The arc from a single woman's plea to the cosmic sorting of all loyalties is complete." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Hearing",
      subtitle: "The surah begins with God listening to a human being and ends with human beings listening to God",
      pairs: [
        {
          left: { label: "The Plea Upward", ayahs: "1–4", desc: "A woman's complaint rises to God. Zihar abolished — the most private domestic injustice becomes divine legislation." },
          right: { label: "The Loyalty Division", ayahs: "14–22", desc: "The party of Satan vs. the party of Allah. Hearts inscribed with faith. The private made cosmic." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Warning to Opposers", ayahs: "5–6", desc: "God enumerates what they forgot. The record-keeping that comforts the wronged now threatens the wrongdoer." },
          right: { label: "Private Audience Rules", ayahs: "12–13", desc: "A charitable gift before consulting the Prophet — sincerity tested, then the requirement eased." },
          color: "#C9A84C",
        },
      ],
      center: {
        label: "God Among Three", ayahs: "7–11",
        desc: "There is no private conversation among three except that He is the fourth. The surah's gravitational core — divine omniscience meets communal ethics.",
        note: "The word Allah appears in every single ayah of this surah — approximately forty times in twenty-two ayahs. In a surah about secrecy, God's name is the most repeated sound.",
      },
    },
    deductiveFunnel: {
      title: "The Expanding Circle",
      subtitle: "From one woman's whispered plea to the cosmic division of all loyalties",
      layers: [
        { depth: 1, label: "One Woman's Plea", ayah: "1", arabic: "قَدْ سَمِعَ اللَّهُ", desc: "God heard what even Aisha, sitting in the same room, could not fully hear. A single woman's domestic grievance becomes the occasion for divine legislation.", color: "#4ecdc4" },
        { depth: 2, label: "Spousal Ethics", ayah: "2–4", arabic: "مَّا هُنَّ أُمَّهَاتِهِمْ", desc: "Zihar declared an abomination — munkar. The pre-Islamic formula abolished with graduated atonement. The speed of divine response is itself the point.", color: "#9b7fd4" },
        { depth: 3, label: "Community Counsel", ayah: "7", arabic: "إِلَّا هُوَ رَابِعُهُمْ", desc: "Every private conversation under divine surveillance. The surah moves from one household to every gathering. No space elevated above God's hearing.", color: "#C9A84C" },
        { depth: 4, label: "Cosmic Loyalty", ayah: "22", arabic: "أُولَـٰئِكَ حِزْبُ اللَّهِ", desc: "The ultimate division — whose party are you in? The domestic and the cosmic are the same question asked at different scales.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah has no interest in history — only in the present moment and the divine gaze upon it",
      absences: [
        { item: "No prophetic narratives", note: "No stories of previous nations, no references to Musa or Ibrahim or Nuh. The warnings are entirely contemporary — directed at specific behaviors happening in real time." },
        { item: "No afterlife descriptions", note: "No painted scenes of hellfire or paradise. The consequences this surah cares about are relational — being on the wrong side of a line you did not realize was being drawn." },
        { item: "No escape from omniscience", note: "The word najwa and its derivatives saturate the middle section. The surah structurally demolishes the concept of secrecy — there is no whispered word that is not already heard." },
        { item: "No male-only legislation", note: "The surah opens by validating a woman's complaint that every earthly authority had failed to address. The occasion of revelation centers female voice and agency." },
        { item: "No silence from God", note: "Allah appears in every single ayah. In a surah about hidden conversations, God's name is never absent — the acoustic architecture performs the thesis." },
      ],
    },
  },

  contentNodes: [
    { concept: "Najwa — the anatomy of secret counsel in 58:7-10", type: "surah-specific", articleSlug: "najwa-secret-counsel-58" },
    { concept: "Allah in every ayah — the acoustic omniscience of Al-Mujadila", type: "surah-specific", articleSlug: "allah-every-ayah-58" },
    { concept: "Khawla's plea and Maryam's cry — parallel divine hearings", type: "cross-surah", articleSlug: "khawla-maryam-divine-hearing" },
    { concept: "Hizb Allah — the party of God across the Quran", type: "cross-surah", articleSlug: "hizb-allah-party-of-god" },
  ],
};

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "circle", label: "Circle" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() { return ( <div className="flex items-center gap-3 py-2"> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> <span className="text-gold-500/50 text-sm">۞</span> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> </div> ); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return ( <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"> <div className="flex items-center gap-3"> <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button> <div className="flex-1 min-w-0"> <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div> <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"> <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div> </div> </div> <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div> </div> <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /> </div> ); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return ( <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"> <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p> <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p> <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p> </div> ); }
function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return ( <div className="space-y-5">{verses.map((v) => ( <div key={v.ayah} className="space-y-1"> <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p> <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p> </div> ))}</div> ); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.sections.map((sec, i) => ( <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span> <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span> </div> <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p> {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>} </div> ))}</div> </div> ); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> {data.pairs.map((pair, i) => ( <div key={i} className="flex gap-2"> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}> <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div> <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p> </div> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}> <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div> <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p> </div> </div> ))} <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"> <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div> <p className="text-sm italic text-cream font-body">{data.center.desc}</p> <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p> </div> </div> ); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-2">{data.layers.map((layer, i) => ( <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span> <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span> </div> <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p> {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>} </button> ))}</div> <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">One whisper → one household → every gathering → all of humanity</div> </div> ); }
function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.absences.map((a, i) => ( <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"> <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div> <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p> </div> ))}</div> </div> ); }

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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">40</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">x Allah</div></div>
          </div>
        </header>
        <OrnamentDivider />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button> ))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "circle" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
