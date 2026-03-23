"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AR-RUM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ar-rum
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ar-Rum",
  arabicName: "الرُّوم",
  meaning: "The Romans",
  number: 30,
  ayahCount: 60,
  period: "Makki",
  juz: 21,
  movements: 5,
  thesis:
    "A sixty-ayah surah that stakes the Quran's credibility on a geopolitical prophecy — then spends the rest proving that reversal is God's signature, written in empires, rain, marriage, and the human life-cycle itself.",
  reflectionUrl: "/surahs/ar-rum",
  readTime: "25 min read",

  sciencesActive: [{"key":"ijaz","english":"Inimitability"},{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "فَأَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًا ۚ فِطْرَتَ اللَّهِ الَّتِي فَطَرَ النَّاسَ عَلَيْهَا",
    ayahRef: "30:30",
    translation: "Set your face toward the religion, inclining to truth — the natural disposition of Allah upon which He created people.",
    why: "The structural and theological center. All the external signs — rain, lightning, diversity — point toward something already written inside the human being. The fitrah is the internal sign. The surah's entire argument converges here.",
  },

  audio: { surahNumber: 30, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الم", translation: "Alif, Lam, Mim." },
    { ayah: 2, arabic: "غُلِبَتِ الرُّومُ", translation: "The Romans have been defeated —" },
    { ayah: 3, arabic: "فِي أَدْنَى الْأَرْضِ وَهُم مِّن بَعْدِ غَلَبِهِمْ سَيَغْلِبُونَ", translation: "in the nearest land. But after their defeat, they will triumph —" },
    { ayah: 4, arabic: "فِي بِضْعِ سِنِينَ ۗ لِلَّهِ الْأَمْرُ مِن قَبْلُ وَمِن بَعْدُ", translation: "within a few years. To Allah belongs the command, before and after." },
    { ayah: 6, arabic: "وَعْدَ اللَّهِ ۖ لَا يُخْلِفُ اللَّهُ وَعْدَهُ", translation: "It is the promise of Allah. Allah does not break His promise." },
    { ayah: 21, arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً", translation: "Among His signs is that He created for you, from yourselves, spouses so you may find rest in them, and He placed between you affection and mercy." },
    { ayah: 22, arabic: "وَمِنْ آيَاتِهِ خَلْقُ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافُ أَلْسِنَتِكُمْ وَأَلْوَانِكُمْ", translation: "Among His signs is the creation of the heavens and the earth, and the diversity of your languages and colors." },
    { ayah: 24, arabic: "وَمِنْ آيَاتِهِ يُرِيكُمُ الْبَرْقَ خَوْفًا وَطَمَعًا", translation: "Among His signs is that He shows you lightning, inspiring fear and hope." },
    { ayah: 30, arabic: "فَأَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًا ۚ فِطْرَتَ اللَّهِ الَّتِي فَطَرَ النَّاسَ عَلَيْهَا", translation: "Set your face toward the religion, inclining to truth — the natural disposition of Allah upon which He created people." },
    { ayah: 41, arabic: "ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ", translation: "Corruption has appeared on land and sea because of what people's hands have earned." },
    { ayah: 50, arabic: "فَانظُرْ إِلَىٰ آثَارِ رَحْمَتِ اللَّهِ كَيْفَ يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا", translation: "Look at the effects of Allah's mercy — how He gives life to the earth after its death." },
    { ayah: 54, arabic: "اللَّهُ الَّذِي خَلَقَكُم مِّن ضَعْفٍ ثُمَّ جَعَلَ مِن بَعْدِ ضَعْفٍ قُوَّةً ثُمَّ جَعَلَ مِن بَعْدِ قُوَّةٍ ضَعْفًا وَشَيْبَةً", translation: "Allah created you from weakness, then made after weakness strength, then after strength weakness and gray hair." },
    { ayah: 60, arabic: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ ۖ وَلَا يَسْتَخِفَّنَّكَ الَّذِينَ لَا يُوقِنُونَ", translation: "So be patient; indeed, the promise of Allah is true. And let not those who lack certainty make you impatient." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Letter",
      subtitle: "Five movements: prophecy → signs cascade → fitrah → corruption → patience",
      sections: [
        { ayahs: "1–10", title: "The Prophecy", color: "#4ecdc4", desc: "Rome has been defeated; within a few years they will triumph. History is not random — to Allah belongs the command, before and after. The word wa'd Allah (promise of God) appears here and will return in the final ayah, forming a verbal frame." },
        { ayahs: "11–27", title: "The Signs Cascade", color: "#9b7fd4", desc: "A relentless accumulation: prayer-times tied to cosmic cycles, spouses as sakina, the diversity of languages and colors, lightning as fear and hope, rain on dead earth. Each 'wa min ayatihi' places another exhibit before the jury." },
        { ayahs: "28–32", title: "The Fitrah", color: "#C9A84C", isPivot: true, desc: "The structural center. Set your face toward the religion — the natural disposition upon which He created people. Monotheism is the default. Polytheism and sectarian division are the corruption. The internal sign meets the external signs." },
        { ayahs: "33–50", title: "The Human Condition", color: "#e07a8a", desc: "Fair-weather faith diagnosed as a species-wide pattern. Corruption on land and sea from human hands. Riba contrasted with zakah. Then the return to wind, rain, and dead earth brought to life — the proof of resurrection in your fields every year." },
        { ayahs: "51–60", title: "The Command to Wait", color: "#4ecdc4", desc: "You cannot make the dead hear. The human life-cycle mirrors the surah's pattern of reversal — weakness, strength, weakness again. The closing command: be patient, the promise is true. Do not let the uncertain unsettle you." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's chiastic structure centers on the fitrah — the internal sign",
      pairs: [
        {
          left: { label: "The Prophecy", ayahs: "1–7", desc: "Rome will be reversed. Trust in God's timing — wa'd Allah. The promise that opens the surah." },
          right: { label: "The Patience", ayahs: "51–60", desc: "Be patient — wa'd Allah haqq. The same promise that closes the surah. Geopolitical and eschatological promise unified." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Destroyed Nations", ayahs: "8–10", desc: "Brief reference to ruined civilizations — compressed to two ayahs and left behind." },
          right: { label: "Corruption & Warning", ayahs: "41–42", desc: "Corruption on land and sea echoes the ruin. The surah returns to its opening warning via a structural callback." },
          color: "#e07a8a",
        },
        {
          left: { label: "Signs: First Cascade", ayahs: "17–27", desc: "Marriage, diversity, lightning, rain — the wa min ayatihi sequence building toward the center." },
          right: { label: "Signs: Second Cascade", ayahs: "46–50", desc: "Wind, rain, dead earth brought to life — the resurrection-proof cascade returning after the center." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Fitrah", ayahs: "30",
        desc: "Set your face toward the religion — the natural disposition upon which He created people.",
        note: "All the external signs point toward something already written inside the human being. The fitrah is the internal sign. The rain and wind and diversity of languages are the external signs. They converge on the same truth.",
      },
    },
    deductiveFunnel: {
      title: "The Reversal Engine",
      subtitle: "Every layer demonstrates the same divine pattern: God reverses what seems irreversible",
      layers: [
        { depth: 1, label: "Empires", ayah: "2–4", arabic: "غُلِبَتِ الرُّومُ ... سَيَغْلِبُونَ", desc: "Rome defeated, then victorious. The largest-scale demonstration of reversal — geopolitical, verifiable, staked as prophecy.", color: "#4ecdc4" },
        { depth: 2, label: "Nature", ayah: "19,50", arabic: "يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا", desc: "Dead earth brought to life by rain. The same reversal operating at the level of soil and seasons — visible every year.", color: "#9b7fd4" },
        { depth: 3, label: "Life-cycle", ayah: "54", arabic: "خَلَقَكُم مِّن ضَعْفٍ ثُمَّ جَعَلَ ... قُوَّةً ثُمَّ ... ضَعْفًا", desc: "Weakness, then strength, then weakness again. The reversal pattern written into every human body.", color: "#e07a8a" },
        { depth: 4, label: "Resurrection", ayah: "25", arabic: "ثُمَّ إِذَا دَعَاكُمْ دَعْوَةً مِّنَ الْأَرْضِ إِذَا أَنتُمْ تَخْرُجُونَ", desc: "Then when He calls you with a single call from the earth, you will emerge. The ultimate reversal — death itself reversed by one word.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that builds its case from what you can see — every absence sharpens the argument",
      absences: [
        { item: "No prophetic narratives", note: "In sixty ayahs, no prophet's story is told. No Musa, no Ibrahim, no Nuh. The brief reference to destroyed civilizations is exactly that — brief. The surah's argument depends entirely on observable reality." },
        { item: "No extended theological argument", note: "The surah does not argue for Allah's existence — the Quraysh already affirm it (ayah 61). It argues for the incoherence of affirming Him as Creator while turning to other protectors." },
        { item: "No legislation", note: "No commands about charity amounts, prayer formats, or social conduct beyond the compressed riba/zakah contrast. The surah is making a case, not issuing a code." },
        { item: "No fear-driven rhetoric", note: "Lightning inspires both fear and hope in the same ayah (24). Rain that saves and storms that destroy are held together. The surah refuses to collapse the duality into a single emotional register." },
        { item: "No separation of promise and patience", note: "Wa'd Allah opens (ayah 6) and closes (ayah 60) the surah. The promise and the patience are the same frame — conviction does not exempt you from endurance." },
      ],
    },
  },

  contentNodes: [
    { concept: "The fitrah verse — monotheism as factory setting", type: "surah-specific", articleSlug: "fitrah-verse-monotheism-default-30-30" },
    { concept: "Mawadda in Ar-Rum vs. Al-Ankabut — genuine vs. counterfeit bond", type: "cross-surah", articleSlug: "mawadda-ankabut-rum-counterfeit-original" },
    { concept: "Lightning as dual sign — fear and hope in one image", type: "surah-specific", articleSlug: "lightning-dual-sign-30-24" },
    { concept: "The rain-resurrection argument across the Quran", type: "cross-surah", articleSlug: "rain-resurrection-argument-quran" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "letter", label: "Letter" },
  { id: "ring", label: "Ring" },
  { id: "reversal", label: "Reversal" },
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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative">
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
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p>
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
            <div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div>
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
            <div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Empires → nature → body → resurrection</div>
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div>
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
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "letter" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "reversal" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
