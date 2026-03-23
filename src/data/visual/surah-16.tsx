"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NAHL — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-nahl
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Nahl",
  arabicName: "النَّحْل",
  meaning: "The Bee",
  number: 16,
  ayahCount: 128,
  period: "Makki",
  juz: 14,
  movements: 7,
  thesis:
    "A 128-ayah inventory of the physical world so patient and so dense that ingratitude becomes impossible to maintain — and at the center, the verdict: they recognized the favor of Allah, then they denied it.",
  reflectionUrl: "/surahs/an-nahl",
  readTime: "25 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَعْرِفُونَ نِعْمَتَ اللَّهِ ثُمَّ يُنكِرُونَهَا وَأَكْثَرُهُمُ الْكَافِرُونَ",
    ayahRef: "16:83",
    translation: "They recognize the favor of Allah, then they deny it — and most of them are ungrateful.",
    why: "Everything before this verse was evidence. This verse is the verdict. The Arabic uses two words from the same root family — ya'rifoona (they recognize) and yunkiroona (they deny). Recognition and denial are kin, the way a family can contain both the one who sees and the one who turns away. The crime is not ignorance. It is suppression.",
  },

  audio: { surahNumber: 16, reciter: "ar.alafasy" },

  diagrams: {
    sectionMap: {
      title: "The Inventory",
      subtitle: "Seven movements: decree → cosmic gifts → idols → emigrants → domestic gifts → reckoning → model",
      sections: [
        { ayahs: "1–9", title: "The Decree Has Arrived", color: "#4ecdc4", desc: "The surah's first verb is past tense — ata amru Allah — the command has come. Stop waiting for signs, because the signs are the world you are standing in. Gifts begin immediately: cattle, horses, mules, things you do not yet know." },
        { ayahs: "10–21", title: "The Cosmic Gifts", color: "#9b7fd4", desc: "Rain, crops, olives, date palms, grapes. Night and day, sun and moon, stars for navigation. The sea from which you eat and extract ornaments. And then: if you tried to count the blessings of Allah, you could not enumerate them." },
        { ayahs: "22–40", title: "Idols and Incapacity", color: "#e07a8a", desc: "A turn from what God creates to what idols cannot. The same question asked of two groups — what has your Lord sent down? — receives two answers: legends of the ancients versus good. The same question, two destinations." },
        { ayahs: "41–55", title: "Emigrants and the Living Earth", color: "#4ecdc4", desc: "The dispossessed believers addressed directly — your displacement is temporary. Then shadows prostrating, creatures worshipping. The cycle laid bare: gift, crisis, prayer, relief, forgetting." },
        { ayahs: "56–83", title: "The Domestic Inventory", color: "#C9A84C", isPivot: true, desc: "Gifts move closer: milk, fruit, the bee receiving wahy — the same verb used for revelation to prophets. Your own body — born knowing nothing, given hearing, sight, a heart. Birds held aloft. Shade, shelter, armor. Then the pivot: they recognize the favor of Allah, then they deny it." },
        { ayahs: "84–100", title: "The Day of Witnesses", color: "#9b7fd4", desc: "Every community faces its messenger. The Quran named as clarification for all things. Ayah 90 — justice, excellence, giving to kin — the ethical command recited in every Friday sermon worldwide." },
        { ayahs: "101–128", title: "Ibrahim and the Postscript", color: "#e07a8a", desc: "Covenants, food laws, the prohibition against fabricating prohibitions. Then the model: Ibrahim, a man who constituted a nation by himself, defined by one quality — grateful. The Madani postscript: do not grieve. The final word: He is with you." },
      ],
    },
    chiasticRing: {
      title: "The Bracket",
      subtitle: "The surah opens by addressing impatience and closes by addressing grief — two wounds, one inventory between them",
      pairs: [
        {
          left: { label: "Impatience", ayahs: "1", desc: "La tasta'jilooh — do not be impatient. The decree has already come. The signs are the world you are standing in." },
          right: { label: "Grief", ayahs: "127–128", desc: "La tahzan — do not grieve. And your patience is only through Allah. He is with the mindful." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Gifts Begin", ayahs: "5–8", desc: "Cattle created for warmth, benefits, food. Horses, mules, donkeys. Things you do not yet know." },
          right: { label: "The Model", ayahs: "120–121", desc: "Ibrahim — grateful for His blessings. The same root na-'a-ma that populated the surah as livestock arrives as the defining quality of the one who saw correctly." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Cannot Count", ayahs: "18", desc: "If you tried to count the blessings of Allah, you could not enumerate them. Forgiving, Merciful." },
          right: { label: "The Verdict", ayahs: "83", desc: "They recognize the favor of Allah, then they deny it. The crime is suppression, not ignorance." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Bee", ayahs: "68–69",
        desc: "Your Lord inspired the bee — the verb awha, the same word used for revelation to prophets. From that obedience comes a substance that heals.",
        note: "The bee receives its program from the same source that sends scripture. It follows paths made easy, and from the belly of that alignment comes healing.",
      },
    },
    deductiveFunnel: {
      title: "The Root",
      subtitle: "The root na-'a-ma (ن-ع-م) generates both livestock and blessing — the surah performs its own thesis",
      layers: [
        { depth: 1, label: "An'am (Livestock)", ayah: "5–8", arabic: "وَالْأَنْعَامَ خَلَقَهَا", desc: "The word for livestock — an'am — shares the root na-'a-ma with the word for blessing. The cattle grazing in front of you are the word for grace in physical form.", color: "#4ecdc4" },
        { depth: 2, label: "Ni'mah (Blessing)", ayah: "18", arabic: "وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا", desc: "If you tried to count the ni'mah of Allah, you could not. The inventory the surah has begun is, by its own admission, incomplete before it starts.", color: "#9b7fd4" },
        { depth: 3, label: "Recognition-Denial", ayah: "83", arabic: "يَعْرِفُونَ نِعْمَتَ اللَّهِ ثُمَّ يُنكِرُونَهَا", desc: "Ya'rifoona (they recognize) and yunkiroona (they deny) are from the same root family. Recognition and denial live in the same house.", color: "#e07a8a" },
        { depth: 4, label: "Shakirun li-An'umihi", ayah: "120", arabic: "شَاكِرًا لِّأَنْعُمِهِ", desc: "Ibrahim — grateful for His blessings. The root that has moved through the surah as livestock and grace arrives one final time, attached to the man who saw correctly.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "An-Nahl argues from living gifts, not cautionary ruins",
      absences: [
        { item: "No extended destruction narratives", note: "In a Makkan surah of 128 ayahs, no sustained retelling of 'Ad, Thamud, the people of Lut. The argument proceeds without cautionary history because the evidence for God is present and alive, grazing in the field outside your door." },
        { item: "No kafiroon as primary accusation", note: "The surah's preferred charge is la yashkuroon — they do not give thanks. The illness being treated is ingratitude as a failure of sight, not disbelief as a theological position." },
        { item: "No abstract theology", note: "The surah does not argue theology in the abstract. It argues theology through olives, through milk emerging between digested food and blood, through bees building in mountain clefts. Every argument has a physical address." },
        { item: "No completion of the list", note: "Ayah 18 admits the impossibility of the surah's own project — the inventory cannot be completed. And the response to that uncountable abundance is Forgiving and Merciful, as if the falling short is already covered." },
        { item: "No mention of the Prophet's suffering", note: "Until the Madani postscript, the Prophet is not addressed as a wounded messenger. The surah maintains its posture of patient attention to the physical world, as though the pointing itself is the consolation." },
      ],
    },
  },

  contentNodes: [
    { concept: "The Bee and the Prophet — wahy at two scales", type: "surah-specific", articleSlug: "bee-wahy-two-scales-16-68" },
    { concept: "The root na-'a-ma — livestock as blessing", type: "surah-specific", articleSlug: "naam-root-livestock-blessing-16" },
    { concept: "An-Nahl and Surah Ibrahim — the same argument at two scales", type: "cross-surah", articleSlug: "nahl-ibrahim-twin-argument" },
    { concept: "The Friday Ayah (16:90) — justice, excellence, kin", type: "cross-surah", articleSlug: "friday-ayah-16-90-justice" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "sections", label: "Sections" },
  { id: "bracket", label: "Bracket" },
  { id: "root", label: "Root" },
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

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionMap }) {
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
        Livestock → blessing → suppression → gratitude
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
          {activeTab === "sections" && <SectionJourney data={d.diagrams.sectionMap} />}
          {activeTab === "bracket" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "root" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <HeartVerse verse={d.heartVerse} />
              <OrnamentDivider />
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
