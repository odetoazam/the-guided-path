"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ANKABUT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ankabut
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ankabut",
  arabicName: "العَنكَبوت",
  meaning: "The Spider",
  number: 29,
  ayahCount: 69,
  period: "Makki",
  juz: "20–21",
  movements: 7,
  thesis:
    "A sixty-nine-ayah meditation on what happens to faith when it meets resistance — walking through every prophet's furnace to arrive at a single promise: those who strive for Us, We will guide them to Our ways.",
  reflectionUrl: "/surahs/al-ankabut",
  readTime: "25 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
    ayahRef: "29:69",
    translation: "And those who strive for Us — We will surely guide them to Our ways. And indeed, Allah is with those who do good.",
    why: "The surah's architectural capstone. The word jahadu returns from ayah 6, completing the most precise bookend in the Quran. The striving and the guidance are not sequential — they are simultaneous. The struggle is the guidance arriving.",
  },

  audio: { surahNumber: 29, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الم", translation: "Alif, Lam, Mim." },
    { ayah: 2, arabic: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ", translation: "Do people think they will be left alone because they say 'We believe' and not be tested?" },
    { ayah: 3, arabic: "وَلَقَدْ فَتَنَّا الَّذِينَ مِن قَبْلِهِمْ ۖ فَلَيَعْلَمَنَّ اللَّهُ الَّذِينَ صَدَقُوا وَلَيَعْلَمَنَّ الْكَاذِبِينَ", translation: "We certainly tested those before them. And Allah will surely distinguish those who are truthful from those who are liars." },
    { ayah: 6, arabic: "وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ ۚ إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ", translation: "And whoever strives, strives only for his own soul. Indeed, Allah is free of need from all creation." },
    { ayah: 8, arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حُسْنًا", translation: "And We have enjoined upon humanity goodness toward parents." },
    { ayah: 14, arabic: "وَلَقَدْ أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا", translation: "And We certainly sent Nuh to his people, and he remained among them a thousand years minus fifty." },
    { ayah: 25, arabic: "إِنَّمَا اتَّخَذْتُم مِّن دُونِ اللَّهِ أَوْثَانًا مَّوَدَّةَ بَيْنِكُمْ فِي الْحَيَاةِ الدُّنْيَا", translation: "You have taken idols besides Allah only as a bond of affection between you in the life of this world." },
    { ayah: 41, arabic: "مَثَلُ الَّذِينَ اتَّخَذُوا مِن دُونِ اللَّهِ أَوْلِيَاءَ كَمَثَلِ الْعَنكَبُوتِ اتَّخَذَتْ بَيْتًا", translation: "The example of those who take protectors other than Allah is like that of the spider who takes a home." },
    { ayah: 43, arabic: "وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ ۖ وَمَا يَعْقِلُهَا إِلَّا الْعَالِمُونَ", translation: "And these examples — We present them to the people, but none will understand them except those of knowledge." },
    { ayah: 45, arabic: "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ", translation: "Recite what has been revealed to you of the Book and establish prayer." },
    { ayah: 46, arabic: "وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ", translation: "And do not argue with the People of the Book except in a way that is best." },
    { ayah: 56, arabic: "يَا عِبَادِيَ الَّذِينَ آمَنُوا إِنَّ أَرْضِي وَاسِعَةٌ فَإِيَّايَ فَاعْبُدُونِ", translation: "O My servants who have believed, indeed My earth is spacious, so worship Me alone." },
    { ayah: 57, arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۖ ثُمَّ إِلَيْنَا تُرْجَعُونَ", translation: "Every soul will taste death. Then to Us will you be returned." },
    { ayah: 64, arabic: "وَمَا هَـٰذِهِ الْحَيَاةُ الدُّنْيَا إِلَّا لَهْوٌ وَلَعِبٌ", translation: "And this worldly life is nothing but amusement and diversion." },
    { ayah: 69, arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ", translation: "And those who strive for Us — We will surely guide them to Our ways. And indeed, Allah is with those who do good." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Furnace",
      subtitle: "Seven movements: declaration → trial → gallery → spider → prescription → emigration → promise",
      sections: [
        { ayahs: "1–7", title: "The Declaration", color: "#4ecdc4", desc: "Faith will be tested. The word yuftanun shares a root with fitna — the smelting of gold. Faith is not a declaration. It is a metallurgical process. The verb jahada appears for the first time — it will return in the final ayah." },
        { ayahs: "8–9", title: "The Trial at Home", color: "#e07a8a", desc: "Before prophets and nations, the surah pauses at the doorstep. Parents who pressure against faith. The same root j-h-d appears — the parent strives against the child's striving. The test lives inside the family." },
        { ayahs: "10–27", title: "The Prophetic Gallery", color: "#9b7fd4", desc: "The Quran's most compressed archive of prophetic history. Nuh, Ibrahim, Lut, Shu'ayb, 'Ad, Thamud, Qarun, Pharaoh — each story distilled to its crisis point. The word mawadda appears in Ibrahim's speech: the idols are social glue, not conviction." },
        { ayahs: "41–44", title: "The Spider", color: "#C9A84C", isPivot: true, desc: "The surah's namesake and structural hinge. The spider's web is engineered brilliantly but as a home it is the most vulnerable structure in nature. The pivot from narrative to epistemology: who can read the signs?" },
        { ayahs: "45–55", title: "Prescription and Argument", color: "#4ecdc4", desc: "The tools for surviving the test: the Book, the prayer, the beautiful argument — billati hiya ahsan. The Quran itself is declared the sufficient sign. Three forms of evidence, each more immediate than the last." },
        { ayahs: "56–60", title: "The Open Earth", color: "#e07a8a", desc: "The most direct emigration command: My earth is spacious, so worship Me alone. Framed by death — you will lose everything at death anyway. Whatever you gain through faith is permanent." },
        { ayahs: "64–69", title: "The Seal", color: "#9b7fd4", desc: "This worldly life is amusement and play. The ship in the storm strips pretension. And then the capstone: those who strive for Us, We will guide them. The jahada bookend is complete." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing form a chiastic arc centered on the spider",
      pairs: [
        {
          left: { label: "Striving Declared", ayahs: "1–7", desc: "Faith will be tested; whoever strives, strives for himself. The obligation of striving framed as self-regarding." },
          right: { label: "Striving Fulfilled", ayahs: "64–69", desc: "Those who strive for Us will be guided. The same act reframed as relational — a covenant, not just an obligation." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Trial of Family", ayahs: "8–9", desc: "Parents who pressure against faith. The anguish of domestic opposition." },
          right: { label: "Emigration from Family", ayahs: "56–60", desc: "Leave if staying means compromising worship. The command to leave what the earlier passage asked you to endure." },
          color: "#e07a8a",
        },
        {
          left: { label: "Prophets Tested", ayahs: "10–27", desc: "Every community was tested — the prophetic gallery shows the pattern across all of history." },
          right: { label: "How to Endure", ayahs: "45–55", desc: "The prescriptive mirror — pray, recite, argue beautifully. The solution to the problem the gallery illustrated." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Spider", ayahs: "41–44",
        desc: "The image of false security that the entire surah orbits.",
        note: "Everything before is evidence: tested prophets, destroyed nations. Everything after is response: how to live, what to recite, where to go. The spider names the error all the narratives illustrated without naming.",
      },
    },
    deductiveFunnel: {
      title: "The Smelting",
      subtitle: "From the opening question through layers of evidence to the final promise",
      layers: [
        { depth: 1, label: "The Question", ayah: "2", arabic: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا", desc: "Do people think they will be left alone? The surah's first substantive word after Alif Lam Mim is ahasiba — did they suppose? Faith as naive assumption.", color: "#4ecdc4" },
        { depth: 2, label: "The Pattern", ayah: "14–40", arabic: "وَلَقَدْ أَرْسَلْنَا نُوحًا", desc: "Every prophet was tested. Nuh for 950 years, Ibrahim thrown into fire, Lut mocked, Shu'ayb denied. The pattern is universal — each nation thought it was different, each nation was the same.", color: "#9b7fd4" },
        { depth: 3, label: "The Image", ayah: "41", arabic: "كَمَثَلِ الْعَنكَبُوتِ اتَّخَذَتْ بَيْتًا", desc: "The spider's web — intricate, impressive, unable to shelter. The error named in a single metaphor: building entire systems of meaning on something that cannot bear the weight.", color: "#e07a8a" },
        { depth: 4, label: "The Promise", ayah: "69", arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا", desc: "From supposition to companionship. The distance between ahasiba and la-ma'a — between naive assumption and hard-won divine companionship — is the argument in miniature.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that replaces detail with pattern — every absence serves the argument",
      absences: [
        { item: "No narrative detail", note: "Ibrahim's story, told at length in other surahs, is stripped to its bones here. Lut loses nearly all his dramatic scenes. The surah does not want you absorbed in any single story — it wants you to see the pattern running beneath all of them." },
        { item: "No extended legislation", note: "No detailed ethical code, no legal instruction. The prescriptions offered are compressed to their essence: pray, recite, argue beautifully, emigrate. The community's need was not rules but psychological architecture." },
        { item: "No named enemy", note: "The Quraysh are confronted but not named. The surah addresses a type, not a tribe — anyone who builds on the wrong foundation." },
        { item: "No easy comfort", note: "The surah does not promise ease. It promises that the testing is the point. Every consolation is earned through the prophetic gallery, never offered cheaply." },
        { item: "No separation of striving from guidance", note: "Jahadu fina / la-nahdiyanna-hum — the struggle is the guidance arriving. The surah refuses to make them sequential. The person inside the test is already on the path." },
      ],
    },
  },

  contentNodes: [
    { concept: "The spider metaphor — false security named", type: "surah-specific", articleSlug: "spider-metaphor-false-security-29-41" },
    { concept: "Mawadda in Al-Ankabut vs. Ar-Rum — counterfeit and original", type: "cross-surah", articleSlug: "mawadda-ankabut-rum-counterfeit-original" },
    { concept: "The jahada bookend — striving as self-regarding and relational", type: "surah-specific", articleSlug: "jahada-bookend-striving-29" },
    { concept: "The Alif Lam Mim family — surahs about faith under pressure", type: "cross-surah", articleSlug: "alif-lam-mim-family-faith-pressure" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "furnace", label: "Furnace" },
  { id: "ring", label: "Ring" },
  { id: "smelting", label: "Smelting" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
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
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div
            ref={progressRef}
            onClick={seek}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"
          >
            <div
              className="h-full rounded-full bg-gold-500 transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">
          {fmt(currentTime)}/{fmt(duration)}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget;
          setCurrentTime(t.currentTime);
          setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0);
        }}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
        {verse.arabic}
      </p>
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
            {v.arabic}{" "}
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}
          >
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>
              {pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span>
            </div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}>
              <span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}
            </div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">
          ✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
        </div>
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? layer.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: layer.color,
              marginLeft: `${layer.depth * 6}px`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>
              {layer.arabic}
            </p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Supposition → pattern → image → promise
      </div>
    </div>
  );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
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
// PAGE SHELL — v3 (brand-aligned, proper tabs, ornaments)
// ══════════════════════════════════════════════════════════════════════════════

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} · {d.period} · Juz {d.juz}
          </p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>

          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">
            {d.thesis}
          </p>

          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">1</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${
                  activeTab === tab.id
                    ? "bg-gold-500 text-navy-dark shadow-sm"
                    : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "furnace" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "smelting" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* ── Go Deeper ────────────────────────────────────────────────────── */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
