"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-QASAS — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-qasas
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Qasas",
  arabicName: "القَصَص",
  meaning: "The Stories",
  number: 28,
  ayahCount: 88,
  period: "Makki",
  juz: "20",
  movements: 3,
  thesis:
    "A surah about the making of a prophet through helplessness — the decades of fear, displacement, and quiet preparation that turned a terrified young man into the one who could stand before the most powerful ruler on earth. The prayer at the well, spoken from total exposure, is the surah's most powerful image.",
  reflectionUrl: "/surahs/al-qasas",
  readTime: "22 min read",

  heartVerse: {
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    ayahRef: "28:24",
    translation: "My Lord, I am, for whatever good You would send down to me, in need.",
    why: "Musa has no money, no home, no family, no country, no plan. He does not ask for anything specific. He states his condition and places it before God. The prayer is radical transparency — no request, just the truth of his situation spoken aloud to the only One who can change it. The word faqir means someone whose condition is need itself.",
  },

  audio: { surahNumber: 28, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "طسم", translation: "Ta-Sin-Mim." },
    { ayah: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ", translation: "These are the verses of the clear Book." },
    { ayah: 5, arabic: "وَنُرِيدُ أَن نَّمُنَّ عَلَى الَّذِينَ اسْتُضْعِفُوا فِي الْأَرْضِ", translation: "And We wished to bestow favor upon those who were oppressed in the land." },
    { ayah: 7, arabic: "وَأَوْحَيْنَا إِلَىٰ أُمِّ مُوسَىٰ أَنْ أَرْضِعِيهِ", translation: "And We inspired the mother of Musa: Nurse him." },
    { ayah: 10, arabic: "وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَىٰ فَارِغًا", translation: "And the heart of Musa's mother became empty." },
    { ayah: 24, arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", translation: "My Lord, I am in desperate need of whatever good You send down to me." },
    { ayah: 56, arabic: "إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَـٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ", translation: "You do not guide whom you love, but Allah guides whom He wills." },
    { ayah: 78, arabic: "إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي", translation: "I was only given it because of knowledge I possess." },
    { ayah: 83, arabic: "تِلْكَ الدَّارُ الْآخِرَةُ نَجْعَلُهَا لِلَّذِينَ لَا يُرِيدُونَ عُلُوًّا فِي الْأَرْضِ وَلَا فَسَادًا", translation: "That home of the Hereafter — We assign it to those who do not desire exaltedness upon the earth or corruption." },
    { ayah: 88, arabic: "كُلُّ شَيْءٍ هَالِكٌ إِلَّا وَجْهَهُ", translation: "Everything will be destroyed except His face." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Arcs",
      subtitle: "Formation → bridge → theology & consequence",
      sections: [
        { ayahs: "1–6", title: "The Stage", color: "#e07a8a", desc: "Ta-Sin-Mim and the thesis: Pharaoh divided his people, slaughtered their sons, deemed them weak — yastadh'ifu. Allah's counterstroke: We wished to bestow favor upon those very people. Weakness is the qualification, not the obstacle." },
        { ayahs: "7–28", title: "The Making of Musa", color: "#C9A84C", isPivot: true, desc: "A mother's surrender, a heart emptied by grief, a baby returned through the household that sought to kill him. A young man's impulsive crime and panicked flight. The well in Midian, two women, a father-in-law, ten years of shepherding. The surah spends more time here than on the plagues of Egypt." },
        { ayahs: "29–42", title: "Commission & Confrontation", color: "#9b7fd4", desc: "The fire on Mount Tur. The staff becomes a serpent. Harun is granted as support. Then the entire confrontation with Pharaoh — compressed into seven ayahs. The surah has already made its point: the prophet was made in the wilderness. By the time Musa reaches Pharaoh, the real story is over." },
        { ayahs: "43–55", title: "The Bridge", color: "#4ecdc4", desc: "From Musa to Muhammad. 'You were not on the western side of the mountain' — the only way you know this story is because it was revealed to you. The narrative itself is evidence of prophecy. The People of the Book who recognize the Quran serve as witnesses." },
        { ayahs: "56–88", title: "Guidance, Qarun & the Final Home", color: "#e07a8a", desc: "You do not guide whom you love. Then Qarun — an Israelite who had everything and attributed it to his own knowledge. The earth swallows him whole. The closing declaration: the final home belongs to those who do not seek exaltedness or corruption. Everything perishes except His face." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Musa's helplessness and Qarun's wealth form a precise structural inversion",
      pairs: [
        {
          left: { label: "God Favors the Weak", ayahs: "5", desc: "We wished to bestow favor upon those who were oppressed — alladhina istud'ifu. Weakness is the qualification." },
          right: { label: "The Final Home", ayahs: "83", desc: "Assigned to those who do not desire exaltedness or corruption. The opening promises to raise the lowered; the closing reveals who qualifies." },
          color: "#e07a8a",
        },
        {
          left: { label: "Musa's Need", ayahs: "7–28", desc: "From a basket on the Nile to a well in Midian — a prophet made through decades of helplessness and dependence on God" },
          right: { label: "Qarun's Self-Sufficiency", ayahs: "76–82", desc: "An Israelite who attributed his wealth to his own knowledge — the earth that held his treasure becomes his grave" },
          color: "#9b7fd4",
        },
        {
          left: { label: "A Mother's Wahy", ayahs: "7", desc: "Musa's mother receives divine inspiration — awhayna — the same word used for prophetic revelation" },
          right: { label: "Muhammad's Revelation", ayahs: "86", desc: "You were not expecting the Book to be cast upon you, except as a mercy. Each recipient was unprepared, chosen in vulnerability." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Pivot", ayahs: "56",
        desc: "You do not guide whom you love, but Allah guides whom He wills.",
        note: "Everything before is narrative — story, scene, event. Everything after is argument, theology, consequence. The principle of guidance transfers the surah from the historical to the universal.",
      },
    },
    deductiveFunnel: {
      title: "The Archaeology of a Prophet",
      subtitle: "The surah's structural argument: the preparation was the story — the commission was its conclusion",
      layers: [
        { depth: 1, label: "Surrender", ayah: "7–10", arabic: "فُؤَادُ أُمِّ مُوسَىٰ فَارِغًا", desc: "A mother told to place her child in a river. Her heart becomes empty — farighan — hollowed out except for the one thought she cannot bear. The grief coexists with faith. The surah does not rush past what it cost.", color: "#e07a8a" },
        { depth: 2, label: "Crime & Flight", ayah: "15–21", arabic: "خَائِفًا يَتَرَقَّبُ", desc: "Musa kills a man and flees — kha'ifan yataraqqabu — afraid and looking over his shoulder. The future liberator of a nation is a fugitive. The surah holds this image without commentary.", color: "#9b7fd4" },
        { depth: 3, label: "The Well", ayah: "24", arabic: "لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", desc: "The prayer that defines the surah's theology. No money, no home, no country, no plan. Not a prayer from strength — a prayer from need so honest it becomes its own authority.", color: "#C9A84C" },
        { depth: 4, label: "Commission", ayah: "30", arabic: "يَا مُوسَىٰ إِنِّي أَنَا اللَّهُ رَبُّ الْعَالَمِينَ", desc: "After twenty-one ayahs of journey, the call to prophethood arrives in seven. The structural argument is unmistakable: the bush confirmed what the years had built.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Al-Qasas is uninterested in the showdown — the absences tell you where the real story lives",
      absences: [
        { item: "No extended Pharaoh confrontation", note: "The entire confrontation — from arrival at court to drowning — is compressed into approximately seven ayahs. In Al-A'raf it spans dozens of ayahs. In Ash-Shu'ara the dialogue is extensive. Here, the surah has already made its point: the prophet was made at the well." },
        { item: "No childhood of Musa", note: "The surah skips his entire youth in a single ayah — 'when he reached his full strength and maturity.' The formation that matters is not the palace years but the Midian years." },
        { item: "Extraordinary attention to women", note: "Musa's mother receives divine inspiration. His sister orchestrates his return. Pharaoh's wife intervenes. The two women of Midian provide shelter and marriage. At nearly every turning point, a woman's action is the hinge. No other surah gives this much narrative agency to women across a single story." },
        { item: "Interior emotional states", note: "We are told what Musa's mother's heart felt — asbaha fu'adu farighan. We hear Musa's private prayer. These interior moments are rare in Quranic narrative, which typically moves through action and dialogue. Al-Qasas pauses to let us feel." },
        { item: "No name for the father-in-law", note: "Identified in the tafsir tradition as Shu'ayb, but the Quran does not name him here. The anonymity keeps the focus on the transaction itself — shelter, labor, family — the basic architecture of a human existence assembled from nothing." },
      ],
    },
  },

  contentNodes: [
    { concept: "Faqir — the prayer of total need", type: "surah-specific", articleSlug: "faqir-prayer-total-need-28-24" },
    { concept: "Fu'ad farighan — the emptied heart of a mother", type: "surah-specific", articleSlug: "fuad-farighan-mother-grief-28-10" },
    { concept: "Qarun and Musa — the two responses to provision", type: "cross-surah", articleSlug: "qarun-musa-provision-28" },
    { concept: "Al-Qasas and Yusuf — two prophets made through defeat", type: "cross-surah", articleSlug: "qasas-yusuf-formation-parallel" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Arcs" },
  { id: "mirror", label: "Mirror" },
  { id: "formation", label: "Formation" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED
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
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>
          {playing ? "\u23F8" : "\u25B6"}
        </button>
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
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic} <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Surrender → crime → need → commission
      </div>
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
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period} · Juz {d.juz}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
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

        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "formation" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
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
