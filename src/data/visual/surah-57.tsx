"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HADID — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-hadid
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Hadid",
  arabicName: "الحديد",
  meaning: "Iron",
  number: 57,
  ayahCount: 29,
  period: "Madani",
  juz: 27,
  movements: 5,
  thesis:
    "A surah that tells you the universe already belongs to Allah, then watches to see if that fact changes what you do with your money, your time, and the tenderness of your heart.",
  reflectionUrl: "/surahs/al-hadid",
  readTime: "25 min read",

  heartVerse: {
    arabic: "أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ",
    ayahRef: "57:16",
    translation: "Has the time not come for those who believe that their hearts should be humbled by the remembrance of Allah?",
    why: "The only verse in the Quran that directly questions the timing of the believers' spiritual responsiveness. Addressed to people who already believe — the question is not about faith's existence but about its depth. Has the moment arrived for that belief to soften you? The surah's entire architecture radiates from this center.",
  },

  audio: { surahNumber: 57, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ", translation: "Whatever is in the heavens and the earth has glorified Allah, and He is the Almighty, the Wise." },
    { ayah: 3, arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ ۖ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ", translation: "He is the First and the Last, the Manifest and the Hidden, and He has knowledge of all things." },
    { ayah: 7, arabic: "آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ", translation: "Believe in Allah and His Messenger, and spend out of that over which He has made you trustees." },
    { ayah: 13, arabic: "انظُرُونَا نَقْتَبِسْ مِن نُّورِكُمْ", translation: "Wait for us — let us borrow some of your light!" },
    { ayah: 16, arabic: "أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ", translation: "Has the time not come for those who believe that their hearts should be humbled by the remembrance of Allah?" },
    { ayah: 17, arabic: "اعْلَمُوا أَنَّ اللَّهَ يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا", translation: "Know that Allah gives life to the earth after its death." },
    { ayah: 25, arabic: "وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ", translation: "And We sent down iron, in which is great might and benefits for people." },
    { ayah: 29, arabic: "وَأَنَّ الْفَضْلَ بِيَدِ اللَّهِ يُؤْتِيهِ مَن يَشَاءُ ۚ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ", translation: "And that grace is in Allah's hand — He gives it to whom He wills. And Allah is the possessor of great grace." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Architecture of Ownership",
      subtitle: "Five movements: sovereignty → spend → light vs. dark → softened hearts → iron and grace",
      sections: [
        { ayahs: "1–6", title: "The Cosmic Declaration", color: "#4ecdc4", desc: "Everything in the heavens and earth has glorified Allah. He owns it all, created it in six periods, knows what enters the earth and what leaves it. Then ayah 3 — the verse that stops everything: He is the First and the Last, the Manifest and the Hidden. Four names. Four directions of reality. Every philosophical position already claimed." },
        { ayahs: "7–11", title: "The Call to Spend", color: "#C9A84C", desc: "The transition from cosmic theology to economic command — without preamble. Your wealth was never yours. You are a mustakhlaf — a trustee, a temporary custodian. Spending in Allah's cause is returning what was already His. Who will loan Allah a goodly loan?" },
        { ayahs: "12–15", title: "The Wall of Light", color: "#e07a8a", desc: "The Day of Judgment — believers walk with light streaming ahead of them. The hypocrites call out: wait for us, let us borrow some of your light. A wall is erected between them — mercy on one side, punishment on the other. Light in Al-Hadid is never decorative. It is the measure of reality." },
        { ayahs: "16–21", title: "The Heart's Question", color: "#9b7fd4", isPivot: true, desc: "Has the time come for your heart to soften? The surah's structural center. Dead earth revived by rain — the metaphor for hearts that have hardened. The parable of worldly life: play, amusement, adornment, boasting, competition, then debris. Race toward forgiveness and a Garden wide as the heavens and earth." },
        { ayahs: "22–29", title: "Iron, Monasticism, and Grace", color: "#4ecdc4", desc: "Everything that befalls you was written before it was created. Iron sent down — anzalna — the same verb used for revelation. Scripture, balance, and iron: guidance, justice, and material means. Monasticism critiqued — withdrawal from the world is another form of withholding. The surah closes where it began: with sovereignty revealed as grace." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Sovereignty and Grace",
      subtitle: "The opening establishes ownership — the closing reveals what that ownership is for",
      pairs: [
        {
          left: { label: "Sovereignty", ayahs: "1–6", desc: "Everything glorifies Allah, the Almighty, the Wise. He owns the heavens and earth. He is the First, the Last, the Manifest, the Hidden." },
          right: { label: "Grace", ayahs: "28–29", desc: "Grace is in Allah's hand — He gives it to whom He wills. The sovereignty of the opening resolves into invitation and generosity." },
          color: "#C9A84C",
        },
        {
          left: { label: "Spend", ayahs: "7–11", desc: "Believe and spend from what He made you trustees of. Who will loan Allah a goodly loan? The economic consequence of cosmic theology." },
          right: { label: "Messengers and Iron", ayahs: "25–27", desc: "Scripture, balance, iron — guidance, justice, material means. Monasticism critiqued as withdrawal from infaq. The means of spending, divinely provided." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Light and Hypocrisy", ayahs: "12–15", desc: "The wall between light and darkness. The hypocrites' desperate cry: let us borrow your light. Light cannot be borrowed." },
          right: { label: "Worldly Life's Parable", ayahs: "20–24", desc: "Play, amusement, boasting, competition — then debris. Do not grieve at loss or exult at gain. Both are rooted in the same error." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Heart's Question", ayahs: "16–17",
        desc: "Has the time not come for those who believe that their hearts should be humbled by the remembrance of Allah?",
        note: "At the structural center: a question about emotional receptivity. The cosmic sovereignty of the opening, the economics, the eschatology — all lead here. Has the time come yet?",
      },
    },
    deductiveFunnel: {
      title: "The Logic of Infaq",
      subtitle: "Each layer builds the case: from who owns reality to what you should do about it",
      layers: [
        { depth: 1, label: "Ownership", ayah: "2", arabic: "لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ", desc: "The heavens and earth belong to Him. This is the premise. Everything that follows is a consequence of this single fact.", color: "#4ecdc4" },
        { depth: 2, label: "Trusteeship", ayah: "7", arabic: "مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ", desc: "You are mustakhlafin — temporary trustees, custodians of what passes through your hands. The word changes the entire meaning of 'your' wealth.", color: "#9b7fd4" },
        { depth: 3, label: "Loan", ayah: "11", arabic: "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا", desc: "Who will loan Allah a goodly loan? The Creator asks for a loan. The theological audacity is immense. The request dignifies the giver.", color: "#C9A84C" },
        { depth: 4, label: "Consequence", ayah: "13", arabic: "انظُرُونَا نَقْتَبِسْ مِن نُّورِكُمْ", desc: "Those who gave carry light. Those who withheld beg to borrow it. The wall between them has a door — visible reminder of what was close and what was lost.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah legislates nothing — it diagnoses everything",
      absences: [
        { item: "No prophetic narratives", note: "No stories of Musa, Ibrahim, Nuh told at length. Prophets are mentioned in ayah 26 (Nuh and Ibrahim briefly), but their stories are not told. The surah keeps its lens entirely on the present community." },
        { item: "No legal rulings", note: "For a Madani surah of this length, the absence of law is striking — no inheritance, no dietary code, no procedural guidance. Al-Hadid is entirely occupied with the interior life of the believers and the metaphysics of ownership." },
        { item: "No external enemies", note: "The danger is not persecution from outside but complacency from within — the slow hardening of hearts that comes with security and success. The surah arrived into a community that had already won." },
        { item: "No ritual commands", note: "No mention of prayer times, fasting, hajj. The surah's only command is to spend — and the only question is whether the heart has softened enough to do so." },
        { item: "No escape from impermanence", note: "The parable of worldly life — play to debris — offers no exception. The only escape is racing toward what does not wither: forgiveness and a Garden whose width is the heavens and earth." },
      ],
    },
  },

  contentNodes: [
    { concept: "He is the First and the Last — 57:3's four divine names", type: "surah-specific", articleSlug: "four-names-57-3" },
    { concept: "Has the time not come — the heart's question at 57:16", type: "surah-specific", articleSlug: "heart-question-57-16" },
    { concept: "Iron sent down — anzalna and astrophysical confirmation", type: "cross-surah", articleSlug: "iron-sent-down-57-25" },
    { concept: "The Musabbihat family — surahs that open with glorification", type: "cross-surah", articleSlug: "musabbihat-family" },
  ],
};

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "infaq", label: "Infaq" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() { return ( <div className="flex items-center gap-3 py-2"> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> <span className="text-gold-500/50 text-sm">۞</span> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> </div> ); }

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;
  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return ( <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"> <div className="flex items-center gap-3"> <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button> <div className="flex-1 min-w-0"> <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div> <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"> <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}> <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /> </div> </div> </div> <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div> </div> <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /> </div> );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return ( <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"> <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p> <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p> <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p> </div> ); }
function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return ( <div className="space-y-5">{verses.map((v) => ( <div key={v.ayah} className="space-y-1"> <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p> <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p> </div> ))}</div> ); }

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.sections.map((sec, i) => ( <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span> <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span> </div> <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p> {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>} </div> ))}</div> </div> ); }

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> {data.pairs.map((pair, i) => ( <div key={i} className="flex gap-2"> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}> <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div> <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p> </div> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}> <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div> <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p> </div> </div> ))} <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"> <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div> <p className="text-sm italic text-cream font-body">{data.center.desc}</p> <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p> </div> </div> ); }

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-2">{data.layers.map((layer, i) => ( <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span> <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span> </div> <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p> {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>} </button> ))}</div> <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Ownership → trusteeship → loan → consequence</div> </div> ); }

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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div></div>
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
          {activeTab === "infaq" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
