"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ASH-SHARH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ash-sharh
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ash-Sharh",
  arabicName: "الشَّرْح",
  meaning: "The Opening / The Relief",
  number: 94,
  ayahCount: 8,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Eight ayahs of the most intimate speech in the Quran — a reminder of gifts already given, a promise that ease is woven inside hardship, and a closing command not to rest but to desire.",
  reflectionUrl: "/surahs/ash-sharh",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ayahRef: "94:5",
    translation: "For truly, with hardship comes ease.",
    why: "The gravitational center of the surah. The preposition ma'a — 'with,' not 'after' — changes everything. Ease is not waiting on the other side of difficulty. It is already present inside it. And the Arabic grammar yields a celebrated insight: the hardship is definite (one), the ease is indefinite (new each time). One hardship, two eases.",
  },

  audio: { surahNumber: 94, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", translation: "Did We not open for you your chest?" },
    { ayah: 2, arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", translation: "And remove from you your burden —" },
    { ayah: 3, arabic: "الَّذِي أَنقَضَ ظَهْرَكَ", translation: "the one that was breaking your back?" },
    { ayah: 4, arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", translation: "And raised for you your name?" },
    { ayah: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "For truly, with hardship comes ease." },
    { ayah: 6, arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Truly, with hardship comes ease." },
    { ayah: 7, arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", translation: "So when you have finished, then rise to labor." },
    { ayah: 8, arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", translation: "And to your Lord, turn in longing." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Conversation",
      subtitle: "Three movements: gifts already given → promise at the center → forward command",
      sections: [
        { ayahs: "1–4", title: "The Three Gifts", color: "#4ecdc4", desc: "Three completed acts in ascending order. First an internal transformation — the chest opened, made spacious enough to carry revelation. Then the removal of a burden so heavy the back was making the sound of wood about to break (anqada). Finally the raising of the Prophet's name — joined to Allah's in every shahada, every adhan, every prayer across every century." },
        { ayahs: "5–6", title: "The Doubled Promise", color: "#C9A84C", isPivot: true, desc: "The same sentence spoken twice, word for word. With hardship comes ease. The definite article on 'hardship' (al-'usr) means it is one and the same. The indefinite 'ease' (yusr) means each mention is a new instance. One hardship, two eases. The repetition is not emphasis — it is a mathematical claim embedded in grammar." },
        { ayahs: "7–8", title: "The Forward Command", color: "#9b7fd4", desc: "Two imperatives that reframe everything. When you finish, rise into the next effort. And turn your deepest wanting — irghab, from a root meaning appetite, longing, desire — toward your Lord. The surah that began with gifts ends with a command not to rest but to desire. The relief is fuel, not destination." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah opens with divine action upon the Prophet and closes with the Prophet's action toward Allah",
      pairs: [
        {
          left: { label: "Allah Acts Upon Him", ayahs: "1–3", desc: "Three past-tense verbs — opened, removed, raised. Allah is the subject, the Prophet is the recipient. Every line ends with the possessive -ka: your chest, your burden, your name." },
          right: { label: "He Acts Toward Allah", ayahs: "7–8", desc: "Two imperative verbs — rise, desire. The Prophet is now the subject, and the motion is toward Allah (ila rabbika). The grammar has flipped completely." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Past Evidence", ayahs: "1–4", desc: "Completed gifts — what has already been done. The question form (alam) invites the listener to remember and affirm." },
          right: { label: "Future Orientation", ayahs: "7–8", desc: "Forward commands — what to do next. The imperative form (fa-insab, fa-irghab) pushes toward what has not yet been reached." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Hinge", ayahs: "5–6",
        desc: "With hardship comes ease. With hardship comes ease.",
        note: "The universal principle that connects past evidence to future command. The only part of the surah not addressed to 'you' — a truth larger than any individual.",
      },
    },
    deductiveFunnel: {
      title: "The Ascent",
      subtitle: "Three gifts arranged in ascending order — each larger than the last",
      layers: [
        { depth: 1, label: "Internal Transformation", ayah: "1", arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", desc: "The chest (sadr) is the seat of spiritual perception in the Quran. When constricted, the person cannot receive. When opened, they can hold revelation, suffering, the weight of a mission, and the vastness of the divine. This is the foundational gift — without it, nothing else is carriable.", color: "#4ecdc4" },
        { depth: 2, label: "Removal of Suffering", ayah: "2–3", arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ ۝ الَّذِي أَنقَضَ ظَهْرَكَ", desc: "The burden (wizr) is set down — not endured, not lightened, but placed on the ground. The verb anqada means 'to make a cracking sound' — the sound a wooden beam makes under a load it can barely bear. Allah is saying: I heard the sound your back was making. I put the load down.", color: "#9b7fd4" },
        { depth: 3, label: "Public Elevation", ayah: "4", arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", desc: "The name is raised. Every shahada, every adhan, every prayer across every century joins Muhammad's name to Allah's. Interior → burden → name. Each gift is larger than the last. The movement is from what only you can feel, to what pressed upon you, to what the entire world will hear.", color: "#C9A84C" },
        { depth: 4, label: "The Principle", ayah: "5–6", arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", desc: "The three gifts become evidence for a universal law. Because We did all of that — know this: hardship and ease are bound together. The evidence came first. The principle comes second.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of pure mercy — every absence confirms the register",
      absences: [
        { item: "No threat or warning", note: "No reckoning, no consequence for disobedience, no mention of disbelievers, no destroyed nations, no Day of Judgment. In a Quran where warning (indhar) is one of the primary modes of speech, this surah contains none of it." },
        { item: "No third person", note: "Every ayah is addressed to 'you' — second person singular, intimate, direct. Allah is speaking to His prophet the way a healer speaks to someone who has forgotten they were already healed." },
        { item: "No command to endure", note: "The closing imperatives do not ask for patience or perseverance. They ask for effort (insab) and desire (irghab). Relief is not an invitation to stop — it is fuel for what comes next." },
        { item: "No separation between hardship and ease", note: "The preposition is ma'a — 'with,' not ba'da — 'after.' The surah refuses the common consolation that things will get better later. The ease is already here, inside the hardship, simultaneous." },
        { item: "No basmala controversy resolved", note: "Some early reciters joined Ash-Sharh to Ad-Duha without a basmala, treating them as one revelation. The surah arrives as the second half of a conversation — the internal evidence of care after Ad-Duha's external reassurance." },
      ],
    },
  },

  contentNodes: [
    { concept: "Sharh al-sadr — the opened chest and Musa's prayer in Taha", type: "cross-surah", articleSlug: "sharh-sadr-opened-chest-taha" },
    { concept: "Ma'a vs. ba'da — the grammar of simultaneous ease", type: "surah-specific", articleSlug: "maa-grammar-simultaneous-ease-94" },
    { concept: "The Duha-Sharh diptych — outer and inner care", type: "cross-surah", articleSlug: "duha-sharh-diptych-93-94" },
    { concept: "Irghab — the Quran's vocabulary of desire and longing", type: "surah-specific", articleSlug: "irghab-desire-longing-94-8" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "conversation", label: "Conversation" },
  { id: "mirror", label: "Mirror" },
  { id: "ascent", label: "Ascent" },
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
          {playing ? "\u23F8" : "\u25B6"}
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
            <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}
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
          {"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
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
        Interior transformation → burden removed → name raised → universal principle
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
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

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period}
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

        {/* -- Tab bar ------------------------------------------------------ */}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "conversation" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "ascent" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper --------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
