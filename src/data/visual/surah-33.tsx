"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-AHZAB — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ahzab
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ahzab",
  arabicName: "الأحزاب",
  meaning: "The Combined Forces",
  number: 33,
  ayahCount: 73,
  period: "Madani",
  juz: "21–22",
  movements: 6,
  thesis:
    "A seventy-three-ayah Madani surah that moves from battlefield to household to cosmos — legislating the Prophet's private life, narrating the siege of Medina, and closing with the staggering image of a trust the heavens refused and humanity accepted.",
  reflectionUrl: "/surahs/al-ahzab",
  readTime: "28 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا وَأَشْفَقْنَ مِنْهَا وَحَمَلَهَا الْإِنسَانُ",
    ayahRef: "33:72",
    translation: "Indeed, We offered the trust to the heavens and the earth and the mountains, and they declined to bear it and feared it; but the human being bore it.",
    why: "The surah's cosmic capstone. After seventy-one ayahs of battles, marriages, curtains, and etiquette, everything lifts. The trust offered to the largest entities in creation — refused. The human being accepted. The verdict: deeply unjust, deeply ignorant. And yet the mercy follows.",
  },

  audio: { surahNumber: 33, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يَا أَيُّهَا النَّبِيُّ اتَّقِ اللَّهَ وَلَا تُطِعِ الْكَافِرِينَ وَالْمُنَافِقِينَ", translation: "O Prophet, have taqwa of Allah and do not obey the disbelievers and the hypocrites." },
    { ayah: 4, arabic: "مَّا جَعَلَ اللَّهُ لِرَجُلٍ مِّن قَلْبَيْنِ فِي جَوْفِهِ", translation: "Allah has not made for any man two hearts within his body." },
    { ayah: 6, arabic: "النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ", translation: "The Prophet is closer to the believers than they are to themselves." },
    { ayah: 10, arabic: "إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ وَإِذْ زَاغَتِ الْأَبْصَارُ وَبَلَغَتِ الْقُلُوبُ الْحَنَاجِرَ", translation: "When they came at you from above and below, and the eyes shifted and the hearts reached the throats." },
    { ayah: 21, arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ", translation: "There has certainly been for you in the Messenger of Allah an excellent example." },
    { ayah: 35, arabic: "إِنَّ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ", translation: "Indeed, the Muslim men and Muslim women, the believing men and believing women..." },
    { ayah: 37, arabic: "وَتُخْفِي فِي نَفْسِكَ مَا اللَّهُ مُبْدِيهِ وَتَخْشَى النَّاسَ وَاللَّهُ أَحَقُّ أَن تَخْشَاهُ", translation: "You concealed within yourself what Allah was going to reveal, and you feared the people, but Allah has more right that you fear Him." },
    { ayah: 40, arabic: "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَـٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ", translation: "Muhammad is not the father of any of your men, but the Messenger of Allah and the seal of the prophets." },
    { ayah: 56, arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا", translation: "Indeed, Allah and His angels send blessings upon the Prophet. O you who believe, ask Allah to bless him and grant him peace." },
    { ayah: 70, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا", translation: "O you who believe, have taqwa of Allah and speak words of upright truth." },
    { ayah: 72, arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا وَأَشْفَقْنَ مِنْهَا وَحَمَلَهَا الْإِنسَانُ ۖ إِنَّهُ كَانَ ظَلُومًا جَهُولًا", translation: "Indeed, We offered the trust to the heavens and the earth and the mountains, and they declined to bear it; but the human being bore it. Indeed, he was unjust and ignorant." },
    { ayah: 73, arabic: "لِّيُعَذِّبَ اللَّهُ الْمُنَافِقِينَ وَالْمُنَافِقَاتِ وَالْمُشْرِكِينَ وَالْمُشْرِكَاتِ وَيَتُوبَ اللَّهُ عَلَى الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ", translation: "That Allah may punish the hypocrite men and women and the polytheist men and women, and turn in mercy to the believing men and believing women." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Threshold",
      subtitle: "Six movements: command → siege → household → the Prophet's heart → salawat → the trust",
      sections: [
        { ayahs: "1–8", title: "The Command & Covenant", color: "#4ecdc4", desc: "Taqwa commanded to the Prophet directly. Two hearts cannot live in one body. Adoption-as-blood-fiction abolished. The Prophet declared closer to the believers than they are to themselves. His wives are their mothers. The covenant of all the prophets invoked." },
        { ayahs: "9–27", title: "The Siege", color: "#e07a8a", desc: "The Battle of the Trench in visceral detail. Eyes shifted, hearts reached throats. The fault line between believers and hypocrites exposed. The uswah hasanah — the Prophet as excellent example — established in the context of endurance, not triumph." },
        { ayahs: "28–35", title: "The Household", color: "#9b7fd4", desc: "The Prophet's wives given a choice: the world or the akhirah. Doubled accountability, doubled reward. Then ayah 35 — ten pairs of believing men and women, the Quran's most systematic affirmation of spiritual equality between the sexes." },
        { ayahs: "36–40", title: "The Prophet's Heart", color: "#C9A84C", isPivot: true, desc: "The affair of Zayd and Zaynab. The Prophet corrected: you concealed what Allah was going to reveal, you feared the people. Muhammad named — the seal of the prophets. The most personally revelatory passage in the entire Quran." },
        { ayahs: "41–55", title: "The Salawat & the Curtain", color: "#4ecdc4", desc: "Allah and His angels bless the Prophet (ayah 56). The verse of the curtain — the Prophet too courteous to ask guests to leave, protected by revelation. His wives legislated as Mothers of the Believers for eternity." },
        { ayahs: "56–73", title: "The Trust", color: "#9b7fd4", desc: "Blessings, warnings to harm-doers, the command to speak truthfully. Then the cosmic capstone: the amanah offered to heavens, earth, mountains — all refused. The human being accepted. Unjust and ignorant. And yet: mercy to the believing men and women." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The outer frame is taqwa and obedience — the center is the Prophet's household",
      pairs: [
        {
          left: { label: "Taqwa & Obedience", ayahs: "1–8", desc: "Taqwa commanded. The covenant of the prophets. The community's foundation established." },
          right: { label: "Taqwa & True Speech", ayahs: "69–73", desc: "Taqwa commanded again — now with qawlan sadidan, upright speech. The amanah. Mercy for believers." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Siege & Hypocrites", ayahs: "9–27", desc: "The external crisis. Hearts reached throats. The hypocrites exposed. The believers held firm." },
          right: { label: "Warnings & Harm-doers", ayahs: "56–68", desc: "Those who harm Allah and His Messenger. The hypocrites warned again. The external threat mirrors the internal one." },
          color: "#e07a8a",
        },
        {
          left: { label: "Believers' Qualities", ayahs: "35", desc: "Ten pairs — Muslim men and women, believing men and women — the great affirmation of spiritual equality." },
          right: { label: "Believers' Blessings", ayahs: "41–43", desc: "Remember Allah abundantly. He and His angels send blessings upon you. The community honored before the Prophet is." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Prophet's Household", ayahs: "28–40",
        desc: "The wives' choice, the Zayd-Zaynab legislation, the Prophet's concealed heart revealed, the seal of prophethood.",
        note: "The domestic sphere sits at the center of the ring. The battlefield is the outer layer. The household is the core. The cosmic trust (amanah) is carried not in grand gestures but in how a household functions.",
      },
    },
    deductiveFunnel: {
      title: "The Weight",
      subtitle: "From the covenant to the cosmic trust — each layer carries more weight",
      layers: [
        { depth: 1, label: "The Meethaq", ayah: "7", arabic: "وَأَخَذْنَا مِنْهُم مِّيثَاقًا غَلِيظًا", desc: "The heavy covenant taken from all the prophets — Nuh, Ibrahim, Musa, Isa. The word meethaq carries the weight of binding obligation. Can the community carry what the prophets carried?", color: "#4ecdc4" },
        { depth: 2, label: "The Uswah", ayah: "21", arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ", desc: "The excellent example — established not in triumph but in endurance during siege. The standard is set in the hardest moment, not the easiest.", color: "#9b7fd4" },
        { depth: 3, label: "The Correction", ayah: "37", arabic: "وَتُخْفِي فِي نَفْسِكَ مَا اللَّهُ مُبْدِيهِ", desc: "The Prophet's own heart is not exempt from revelation's reach. His concealment named, his fear corrected. Even the Prophet carries the trust under divine scrutiny.", color: "#e07a8a" },
        { depth: 4, label: "The Amanah", ayah: "72", arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ", desc: "The heavens, earth, and mountains understood the weight and declined. The human being accepted — dhalooman jahoola, deeply unjust, deeply ignorant. The trust is carried in battles and marriages and curtains and words.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah immersed in the present tense — every absence points to the community writing its own chapter",
      absences: [
        { item: "No extended prophetic narrative", note: "Nuh, Ibrahim, Musa, Isa appear only in ayah 7, as a list. No stories told. No Pharaoh, no 'Ad, no Thamud. The surah's entire evidential base is the present — this community, this household, this siege." },
        { item: "No destroyed nations", note: "History is invoked once (the covenant) and set aside. The implication: this community is writing its own chapter of prophetic history. The test is happening in real time." },
        { item: "No cosmic creation signs", note: "No rain, no mountains, no sky-as-canopy. The cosmic only enters at the very end — the amanah. Everything before it is grounded in lived human experience." },
        { item: "No separation of public and private", note: "The surah insists that battles, marriages, etiquette, and cosmic purpose belong together. The way you treat your spouse is connected to the way you face an army." },
        { item: "No escape from accountability", note: "The Prophet's wives face doubled punishment. The Prophet's own concealment is corrected. The mountains declined the trust. Proximity to revelation increases the weight, never reduces it." },
      ],
    },
  },

  contentNodes: [
    { concept: "The amanah — the trust that creation refused", type: "surah-specific", articleSlug: "amanah-trust-creation-refused-33-72" },
    { concept: "The salawat verse — foundation of the tradition of blessings", type: "surah-specific", articleSlug: "salawat-verse-foundation-33-56" },
    { concept: "Meethaq and amanah — covenant and trust as structural bookends", type: "surah-specific", articleSlug: "meethaq-amanah-bookends-33" },
    { concept: "Ayah 35 — the Quran's affirmation of spiritual equality", type: "cross-surah", articleSlug: "spiritual-equality-men-women-33-35" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "threshold", label: "Threshold" },
  { id: "ring", label: "Ring" },
  { id: "weight", label: "Weight" },
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
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Covenant → example → correction → cosmic trust</div></div>);
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
          {activeTab === "threshold" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "weight" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
