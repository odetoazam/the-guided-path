"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAGHABUN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-taghabun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Taghabun",
  arabicName: "التَّغابُن",
  meaning: "The Mutual Loss and Gain",
  number: 64,
  ayahCount: 18,
  period: "Madani",
  juz: 28,
  movements: 4,
  thesis:
    "The last of the Musabbihat — eighteen ayahs that walk from the glory of the universe to the quiet of your own home and say: this is where the real test is, this is where the real spending happens, and this is where mercy begins.",
  reflectionUrl: "/surahs/at-taghabun",
  readTime: "18 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"aqeedah","english":"Theology"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ مِنْ أَزْوَاجِكُمْ وَأَوْلَادِكُمْ عَدُوًّا لَّكُمْ فَاحْذَرُوهُمْ ۚ وَإِن تَعْفُوا وَتَصْفَحُوا وَتَغْفِرُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ",
    ayahRef: "64:14",
    translation: "O you who believe, indeed among your spouses and your children are enemies to you, so beware of them. But if you pardon and overlook and forgive, then indeed Allah is Forgiving and Merciful.",
    why: "The surah's most emotionally charged moment. The word for enemy is the same used for Shaytan elsewhere. And yet in the same breath — three words for forgiveness stacked in ascending intensity. Vigilance and mercy in a single verse.",
  },

  audio: { surahNumber: 64, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۖ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ۖ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Whatever is in the heavens and whatever is on the earth glorifies Allah. To Him belongs the dominion and to Him belongs all praise, and He has power over all things." },
    { ayah: 2, arabic: "هُوَ الَّذِي خَلَقَكُمْ فَمِنكُمْ كَافِرٌ وَمِنكُم مُّؤْمِنٌ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ", translation: "It is He who created you, and among you are disbelievers and among you are believers. And Allah is Seeing of what you do." },
    { ayah: 3, arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ وَصَوَّرَكُمْ فَأَحْسَنَ صُوَرَكُمْ ۖ وَإِلَيْهِ الْمَصِيرُ", translation: "He created the heavens and earth in truth and formed you and perfected your forms, and to Him is the destination." },
    { ayah: 4, arabic: "يَعْلَمُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَيَعْلَمُ مَا تُسِرُّونَ وَمَا تُعْلِنُونَ ۚ وَاللَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ", translation: "He knows what is in the heavens and earth and knows what you conceal and what you declare. And Allah is Knowing of what is in the breasts." },
    { ayah: 5, arabic: "أَلَمْ يَأْتِكُمْ نَبَأُ الَّذِينَ كَفَرُوا مِن قَبْلُ فَذَاقُوا وَبَالَ أَمْرِهِمْ وَلَهُمْ عَذَابٌ أَلِيمٌ", translation: "Has there not come to you the news of those who disbelieved before? So they tasted the bad consequence of their affair, and they will have a painful punishment." },
    { ayah: 6, arabic: "ذَٰلِكَ بِأَنَّهُ كَانَت تَّأْتِيهِمْ رُسُلُهُم بِالْبَيِّنَاتِ فَقَالُوا أَبَشَرٌ يَهْدُونَنَا فَكَفَرُوا وَتَوَلَّوا ۚ وَّاسْتَغْنَى اللَّهُ ۚ وَاللَّهُ غَنِيٌّ حَمِيدٌ", translation: "That is because their messengers came to them with clear proofs, but they said, 'Shall human beings guide us?' So they disbelieved and turned away. And Allah dispensed with them; and Allah is Self-Sufficient, Praiseworthy." },
    { ayah: 7, arabic: "زَعَمَ الَّذِينَ كَفَرُوا أَن لَّن يُبْعَثُوا ۚ قُلْ بَلَىٰ وَرَبِّي لَتُبْعَثُنَّ ثُمَّ لَتُنَبَّؤُنَّ بِمَا عَمِلْتُمْ ۚ وَذَٰلِكَ عَلَى اللَّهِ يَسِيرٌ", translation: "Those who disbelieve claim they will never be resurrected. Say, 'Yes, by my Lord, you will certainly be resurrected, then you will be informed of what you did. And that, for Allah, is easy.'" },
    { ayah: 8, arabic: "فَآمِنُوا بِاللَّهِ وَرَسُولِهِ وَالنُّورِ الَّذِي أَنزَلْنَا ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ", translation: "So believe in Allah and His Messenger and the Light which We have sent down. And Allah is Aware of what you do." },
    { ayah: 9, arabic: "يَوْمَ يَجْمَعُكُمْ لِيَوْمِ الْجَمْعِ ۖ ذَٰلِكَ يَوْمُ التَّغَابُنِ ۗ وَمَن يُؤْمِن بِاللَّهِ وَيَعْمَلْ صَالِحًا يُكَفِّرْ عَنْهُ سَيِّئَاتِهِ وَيُدْخِلْهُ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۚ ذَٰلِكَ الْفَوْزُ الْعَظِيمُ", translation: "The Day He will gather you for the Day of Gathering — that is the Day of Taghabun. And whoever believes in Allah and does good, He will remove from him his misdeeds and admit him to gardens beneath which rivers flow, abiding therein forever. That is the great success." },
    { ayah: 10, arabic: "وَالَّذِينَ كَفَرُوا وَكَذَّبُوا بِآيَاتِنَا أُولَٰئِكَ أَصْحَابُ النَّارِ خَالِدِينَ فِيهَا ۖ وَبِئْسَ الْمَصِيرُ", translation: "But those who disbelieved and denied Our signs — those are the companions of the Fire, abiding therein forever, and wretched is the destination." },
    { ayah: 11, arabic: "مَا أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ اللَّهِ ۗ وَمَن يُؤْمِن بِاللَّهِ يَهْدِ قَلْبَهُ ۚ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ", translation: "No calamity befalls except by the permission of Allah. And whoever believes in Allah, He guides his heart. And Allah is Knowing of all things." },
    { ayah: 12, arabic: "وَأَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ ۚ فَإِن تَوَلَّيْتُمْ فَإِنَّمَا عَلَىٰ رَسُولِنَا الْبَلَاغُ الْمُبِينُ", translation: "And obey Allah and obey the Messenger. But if you turn away, then upon Our Messenger is only clear delivery of the message." },
    { ayah: 13, arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ", translation: "Allah — there is no deity except Him. And upon Allah let the believers rely." },
    { ayah: 14, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ مِنْ أَزْوَاجِكُمْ وَأَوْلَادِكُمْ عَدُوًّا لَّكُمْ فَاحْذَرُوهُمْ ۚ وَإِن تَعْفُوا وَتَصْفَحُوا وَتَغْفِرُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", translation: "O you who believe, indeed among your spouses and your children are enemies to you, so beware of them. But if you pardon and overlook and forgive, then indeed Allah is Forgiving and Merciful." },
    { ayah: 15, arabic: "إِنَّمَا أَمْوَالُكُمْ وَأَوْلَادُكُمْ فِتْنَةٌ ۚ وَاللَّهُ عِندَهُ أَجْرٌ عَظِيمٌ", translation: "Your wealth and your children are but a trial, and Allah — with Him is a great reward." },
    { ayah: 16, arabic: "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ وَاسْمَعُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ ۗ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", translation: "So be conscious of Allah as much as you are able and listen and obey and spend; it will be better for your souls. And whoever is protected from the stinginess of his own soul — those are the successful." },
    { ayah: 17, arabic: "إِن تُقْرِضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعِفْهُ لَكُمْ وَيَغْفِرْ لَكُمْ ۚ وَاللَّهُ شَكُورٌ حَلِيمٌ", translation: "If you lend to Allah a beautiful loan, He will multiply it for you and forgive you. And Allah is Most Appreciative, Most Forbearing." },
    { ayah: 18, arabic: "عَالِمُ الْغَيْبِ وَالشَّهَادَةِ الْعَزِيزُ الْحَكِيمُ", translation: "Knower of the unseen and the witnessed, the Almighty, the Wise." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Controlled Descent",
      subtitle: "From cosmos to household in four movements",
      sections: [
        { ayahs: "1–4", title: "Universal Declaration", color: "#4ecdc4", desc: "Everything glorifies Allah. Sovereignty, praise, power, knowledge. Humanity is divided: believer and disbeliever. He knows what you conceal and what you reveal." },
        { ayahs: "5–6", title: "Historical Witness", color: "#9b7fd4", desc: "Destroyed nations compressed into two ayahs. Their objection: 'Shall human beings guide us?' Allah had no need of them. The entire prophetic cycle in a single breath." },
        { ayahs: "7–10", title: "The Day of Taghabun", color: "#e07a8a", desc: "The Day of Mutual Loss and Gain — a marketplace audit. The believer/disbeliever binary from ayah 2 reaches its conclusion. A name for Judgment Day that appears nowhere else." },
        { ayahs: "11–18", title: "The Believer's Life", color: "#C9A84C", isPivot: true, desc: "Calamity, obedience, tawakkul, the enemy within your family, wealth as trial, consciousness of Allah as much as you can, the beautiful loan, divine knowledge. The surah's distinctive ground." },
      ],
    },
    chiasticRing: {
      title: "The Concentric Frame",
      subtitle: "From the cosmic binary to the domestic binary",
      pairs: [
        {
          left: { label: "Cosmic Division", ayahs: "1–2", desc: "All creation glorifies Allah; humanity divided into believers and disbelievers" },
          right: { label: "Domestic Arena", ayahs: "14–18", desc: "The believer's household — the real arena of the test. Forgive, spend, lend to Allah" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Historical Signs", ayahs: "3–6", desc: "Signs of creation and history — nations that rejected and tasted consequences" },
          right: { label: "Personal Signs", ayahs: "11–13", desc: "Calamity, obedience, reliance — signs in personal life" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Day of Taghabun", ayahs: "7–10",
        desc: "The Day when every transaction shows its true return. The winners and losers are finally revealed.",
        note: "The hinge that transforms everything. Both history and personal life become legible through this lens.",
      },
    },
    deductiveFunnel: {
      title: "The Four Imperatives",
      subtitle: "Ayah 16's practical sequence — from awareness to generosity",
      layers: [
        { depth: 1, label: "Ittaqu — Be conscious", ayah: "16", arabic: "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ", desc: "Be conscious of Allah as much as you are able. The gentlest moment. After naming enemies in your household and calling wealth a trial, the surah asks for capacity, not perfection.", color: "#4ecdc4" },
        { depth: 2, label: "Isma'u — Listen", ayah: "16", arabic: "وَاسْمَعُوا", desc: "Listen. Awareness leads to attention. The ear must open before the hand can move.", color: "#9b7fd4" },
        { depth: 3, label: "Ati'u — Obey", ayah: "16", arabic: "وَأَطِيعُوا", desc: "Obey. Attention leads to obedience. The gap between hearing and acting is the gap the surah measures.", color: "#e07a8a" },
        { depth: 4, label: "Anfiqu — Spend", ayah: "16", arabic: "وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ", desc: "Spend — it will be better for your souls. Obedience leads to generosity. The sequence arrives at the open hand.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah trusts its audience already knows the stories",
      absences: [
        { item: "No prophet named", note: "No Musa, no Ibrahim, no Isa. The destroyed nations are referenced in a single sweeping sentence and then the surah moves on. Histories gestured at, never entered." },
        { item: "No direct address to the Prophet", note: "The commands are addressed to 'you who believe' — the community. This is a surah speaking to a collective, not an individual." },
        { item: "No detailed eschatology", note: "The Day of Taghabun is named but not described. No extended fire or garden scenes. The surah's urgency is about how you live now." },
        { item: "No ascetic rejection of family", note: "The surah calls your family a trial and an enemy — and in the same breath tells you to forgive them. It validates the tension rather than resolving it through renunciation." },
        { item: "No demand for perfection", note: "'As much as you are able' — ma istata'tum. One of the Quran's most merciful concessions, calibrating the command to human capacity." },
      ],
    },
  },

  contentNodes: [
    { concept: "Yawm at-Taghabun — the unique marketplace audit", type: "surah-specific", articleSlug: "taghabun-day-64-9" },
    { concept: "The enemy within — family as spiritual trial", type: "surah-specific", articleSlug: "enemy-within-64-14" },
    { concept: "The Musabbihat bookends (Al-Hadid to At-Taghabun)", type: "cross-surah", articleSlug: "musabbihat-cluster" },
    { concept: "Shuhh al-nafs — stinginess of the soul (59:9 and 64:16)", type: "cross-surah", articleSlug: "shuhh-nafs-hashr-taghabun" },
  ],
};

const TABS = [
  { id: "journey", label: "Descent" },
  { id: "mirror", label: "Frame" },
  { id: "funnel", label: "Imperatives" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() { return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return (<div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"><div className="flex items-center gap-3"><button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button><div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div><div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div></div><audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /></div>); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>); }
function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Awareness → attention → obedience → generosity</div></div>); }
function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) { return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>); }

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream"><div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
      <header className="text-center space-y-3 pb-4">
        <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period}</p>
        <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p><h1 className="text-2xl font-serif text-cream">{d.name}</h1>
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
      <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}><div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div></div>
      <div className="min-h-[400px] pt-6 pb-8">
        {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
        {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
        {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
        {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
        {activeTab === "text" && (<div className="space-y-6"><FullSurahText verses={d.fullText} /><OrnamentDivider /><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>)}
      </div>
      <OrnamentDivider />
      <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"><div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div><div className="text-sm text-cream font-serif">Read the Full Reflection</div><div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div></a>
    </div></div>
  );
}
