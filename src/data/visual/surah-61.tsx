"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AS-SAFF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/as-saff
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "As-Saff",
  arabicName: "الصَّف",
  meaning: "The Ranks",
  number: 61,
  ayahCount: 14,
  period: "Madani",
  juz: 28,
  movements: 5,
  thesis:
    "A fourteen-ayah confrontation with the believing community that moves from cosmic glorification through the sharpest rebuke — why do you say what you do not do? — through prophetic history, through the certainty of divine light, to a sacred transaction and a single imperative: be helpers of Allah.",
  reflectionUrl: "/surahs/as-saff",
  readTime: "18 min read",

  sciencesActive: [{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"},{"key":"munasabat","english":"Inter-surah Connections"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ",
    ayahRef: "61:2",
    translation: "O you who believe, why do you say what you do not do?",
    why: "The surah's foundational move. The universe glorifies Allah effortlessly (ayah 1), without gap between being and doing. This ayah names the gap the believers have introduced — between speech and action — and the force of the question carries the entire surah's argument.",
  },

  audio: { surahNumber: 61, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ", translation: "Whatever is in the heavens and whatever is on the earth glorifies Allah, and He is the Almighty, the Wise." },
    { ayah: 2, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ", translation: "O you who believe, why do you say what you do not do?" },
    { ayah: 3, arabic: "كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ", translation: "Great is hatred in the sight of Allah that you say what you do not do." },
    { ayah: 4, arabic: "إِنَّ اللَّهَ يُحِبُّ الَّذِينَ يُقَاتِلُونَ فِي سَبِيلِهِ صَفًّا كَأَنَّهُم بُنْيَانٌ مَّرْصُوصٌ", translation: "Indeed, Allah loves those who fight in His cause in a rank as though they are a structure joined firmly." },
    { ayah: 5, arabic: "وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِ يَا قَوْمِ لِمَ تُؤْذُونَنِي وَقَد تَّعْلَمُونَ أَنِّي رَسُولُ اللَّهِ إِلَيْكُمْ ۖ فَلَمَّا زَاغُوا أَزَاغَ اللَّهُ قُلُوبَهُمْ ۚ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الْفَاسِقِينَ", translation: "And when Musa said to his people, 'O my people, why do you harm me when you know I am the messenger of Allah to you?' So when they deviated, Allah caused their hearts to deviate. And Allah does not guide the defiantly disobedient." },
    { ayah: 6, arabic: "وَإِذْ قَالَ عِيسَى ابْنُ مَرْيَمَ يَا بَنِي إِسْرَائِيلَ إِنِّي رَسُولُ اللَّهِ إِلَيْكُم مُّصَدِّقًا لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ ۖ فَلَمَّا جَاءَهُم بِالْبَيِّنَاتِ قَالُوا هَٰذَا سِحْرٌ مُّبِينٌ", translation: "And when Isa son of Maryam said, 'O Children of Israel, I am the messenger of Allah to you, confirming what came before me of the Torah, and bringing good tidings of a messenger to come after me, whose name is Ahmad.' But when he came to them with clear proofs, they said, 'This is obvious magic.'" },
    { ayah: 7, arabic: "وَمَنْ أَظْلَمُ مِمَّنِ افْتَرَىٰ عَلَى اللَّهِ الْكَذِبَ وَهُوَ يُدْعَىٰ إِلَى الْإِسْلَامِ ۚ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ", translation: "And who is more unjust than one who invents a lie about Allah while he is being invited to Islam? And Allah does not guide the wrongdoing people." },
    { ayah: 8, arabic: "يُرِيدُونَ لِيُطْفِئُوا نُورَ اللَّهِ بِأَفْوَاهِهِمْ وَاللَّهُ مُتِمُّ نُورِهِ وَلَوْ كَرِهَ الْكَافِرُونَ", translation: "They want to extinguish the light of Allah with their mouths, but Allah will complete His light, even though the disbelievers detest it." },
    { ayah: 9, arabic: "هُوَ الَّذِي أَرْسَلَ رَسُولَهُ بِالْهُدَىٰ وَدِينِ الْحَقِّ لِيُظْهِرَهُ عَلَى الدِّينِ كُلِّهِ وَلَوْ كَرِهَ الْمُشْرِكُونَ", translation: "It is He who sent His Messenger with guidance and the religion of truth to manifest it over all religion, even though the polytheists detest it." },
    { ayah: 10, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا هَلْ أَدُلُّكُمْ عَلَىٰ تِجَارَةٍ تُنجِيكُم مِّنْ عَذَابٍ أَلِيمٍ", translation: "O you who believe, shall I direct you to a transaction that will save you from a painful punishment?" },
    { ayah: 11, arabic: "تُؤْمِنُونَ بِاللَّهِ وَرَسُولِهِ وَتُجَاهِدُونَ فِي سَبِيلِ اللَّهِ بِأَمْوَالِكُمْ وَأَنفُسِكُمْ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ", translation: "You believe in Allah and His Messenger and strive in the cause of Allah with your wealth and your lives. That is best for you, if you only knew." },
    { ayah: 12, arabic: "يَغْفِرْ لَكُمْ ذُنُوبَكُمْ وَيُدْخِلْكُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ وَمَسَاكِنَ طَيِّبَةً فِي جَنَّاتِ عَدْنٍ ۚ ذَٰلِكَ الْفَوْزُ الْعَظِيمُ", translation: "He will forgive your sins and admit you to gardens beneath which rivers flow and pleasant dwellings in the Gardens of Eternity. That is the great success." },
    { ayah: 13, arabic: "وَأُخْرَىٰ تُحِبُّونَهَا ۖ نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ ۗ وَبَشِّرِ الْمُؤْمِنِينَ", translation: "And another thing you love: help from Allah and a near victory. And give good tidings to the believers." },
    { ayah: 14, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا أَنصَارَ اللَّهِ كَمَا قَالَ عِيسَى ابْنُ مَرْيَمَ لِلْحَوَارِيِّينَ مَنْ أَنصَارِي إِلَى اللَّهِ ۖ قَالَ الْحَوَارِيُّونَ نَحْنُ أَنصَارُ اللَّهِ ۖ فَآمَنَت طَّائِفَةٌ مِّن بَنِي إِسْرَائِيلَ وَكَفَرَت طَّائِفَةٌ ۖ فَأَيَّدْنَا الَّذِينَ آمَنُوا عَلَىٰ عَدُوِّهِمْ فَأَصْبَحُوا ظَاهِرِينَ", translation: "O you who believe, be helpers of Allah, as Isa son of Maryam said to the disciples, 'Who are my helpers for Allah?' The disciples said, 'We are the helpers of Allah.' So a faction of the Children of Israel believed and a faction disbelieved. Then We supported those who believed against their enemy, and they became dominant." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Arc",
      subtitle: "Five movements: glorification, rebuke, history, light, transaction",
      sections: [
        { ayahs: "1–3", title: "Glorification & Rebuke", color: "#e07a8a", desc: "Creation glorifies Allah effortlessly. The believers, by contrast, say what they do not do. The word maqt — loathing, disgust — is among the strongest expressions of divine displeasure in the Quran." },
        { ayahs: "4", title: "The Solid Structure", color: "#C9A84C", isPivot: true, desc: "Bunyanun marsus — a structure joined with molten lead. Not a crowd but an architecture: individuals fused into something unbreakable. The surah's answer to the rebuke." },
        { ayahs: "5–7", title: "Prophets Refused", color: "#9b7fd4", desc: "Musa was defied by people who knew better. Isa prophesied Ahmad, and his people dismissed the signs as magic. Both examples ask: will the believers follow the same path?" },
        { ayahs: "8–9", title: "The Inextinguishable Light", color: "#4ecdc4", desc: "Human mouths trying to blow out divine light — an image almost absurd in its disproportion. Allah will complete His light and make His religion prevail regardless." },
        { ayahs: "10–14", title: "The Transaction & The Call", color: "#e07a8a", desc: "A sacred tijarah: belief and striving exchanged for forgiveness, paradise, and near victory. The closing imperative — be helpers of Allah — with the hawariyyun as the model." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Concentric structure centered on the declaration of divine light",
      pairs: [
        {
          left: { label: "Glorification & Rebuke", ayahs: "1–3", desc: "Creation glorifies Allah; the believers say what they do not do" },
          right: { label: "Be Helpers of Allah", ayahs: "14", desc: "The hawariyyun who said and did — closing the gap between word and deed" },
          color: "#e07a8a",
        },
        {
          left: { label: "Bunyanun Marsus", ayahs: "4", desc: "The image of believers as a solid, fused structure in Allah's cause" },
          right: { label: "Victory & Help", ayahs: "13", desc: "Help from Allah and near victory — the practical fruit of the solid structure" },
          color: "#C9A84C",
        },
        {
          left: { label: "Prophets Refused", ayahs: "5–6", desc: "Musa defied, Isa dismissed — communities that heard truth and refused" },
          right: { label: "The Transaction", ayahs: "10–12", desc: "Allah offers a tijarah — belief and striving for forgiveness and paradise" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Inextinguishable Light", ayahs: "7–9",
        desc: "They want to extinguish Allah's light with their mouths. But Allah will complete His light.",
        note: "The center where the surah's weight rests. Everything before builds to this certainty; everything after flows from it.",
      },
    },
    deductiveFunnel: {
      title: "Three Addresses",
      subtitle: "The surah addresses the believers three times — each time shifting the relationship",
      layers: [
        { depth: 1, label: "Confrontation", ayah: "2", arabic: "لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ", desc: "The first address: 'O you who believe, why do you say what you do not do?' The community is confronted with its gap between speech and action.", color: "#e07a8a" },
        { depth: 2, label: "Negotiation", ayah: "10", arabic: "هَلْ أَدُلُّكُمْ عَلَىٰ تِجَارَةٍ", desc: "The second address: 'Shall I direct you to a transaction?' The community is offered a deal — the language of the marketplace applied to the most sacred exchange.", color: "#9b7fd4" },
        { depth: 3, label: "Calling", ayah: "14", arabic: "كُونُوا أَنصَارَ اللَّهِ", desc: "The third address: 'Be helpers of Allah.' The community is called into an identity. From what is wrong with you, to here is what I offer, to here is who you can become.", color: "#4ecdc4" },
        { depth: 4, label: "The Response", ayah: "14", arabic: "نَحْنُ أَنصَارُ اللَّهِ", desc: "The hawariyyun's answer: 'We are the helpers of Allah.' They said it and meant it. They closed the gap. The surah's arc resolves in their response.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's omissions sharpen its argument — every absence is deliberate",
      absences: [
        { item: "No detailed legal rulings", note: "No procedural legislation, no dietary laws, no ritual instructions. The surah operates entirely at the level of collective identity and spiritual integrity." },
        { item: "No extended narratives", note: "Musa and Isa appear in compressed form — a few ayahs each. The histories are referenced as patterns, not told as stories." },
        { item: "No description of paradise or hellfire", note: "Beyond the briefest mention of gardens in the transaction passage, there is no developed eschatological scene. The surah's urgency is about this life." },
        { item: "No address to the disbelievers directly", note: "Every word is aimed at the believers themselves. The surah does not comfort or console. It is for a community that is underperforming, not suffering." },
        { item: "No mention of patience or consolation", note: "The absence of consolation is itself a message. This is not medicine for pain. It is medicine for complacency." },
      ],
    },
  },

  contentNodes: [
    { concept: "Bunyanun marsus — the fused structure", type: "surah-specific", articleSlug: "bunyanun-marsus-61-4" },
    { concept: "The divine tijarah — faith as transaction", type: "surah-specific", articleSlug: "divine-tijarah-61-10" },
    { concept: "The musabbihat cluster (57, 59, 61, 62, 64)", type: "cross-surah", articleSlug: "musabbihat-cluster" },
    { concept: "Ahmad prophecy — Isa pointing forward", type: "cross-surah", articleSlug: "ahmad-prophecy-61-6" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Arc" },
  { id: "mirror", label: "Ring" },
  { id: "funnel", label: "Addresses" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">۞</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;

  const toggle = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  const seekTo = (clientX: number) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    seekTo(e.clientX);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>
          {playing ? "⏸" : "▶"}
        </button>
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
      <audio ref={audioRef} src={src} preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p>
      <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p>
      <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p>
    </div>
  );
}

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
          </p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
    </div>
  );
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div>
        <p className="text-sm italic text-cream font-body">{data.center.desc}</p>
        <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p>
      </div>
    </div>
  );
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Confrontation → negotiation → calling → response</div>
    </div>
  );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-3">
        {data.absences.map((a, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2">
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE SHELL
// ══════════════════════════════════════════════════════════════════════════════

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


        <AudioPlayer audio={d.audio} />

        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
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
