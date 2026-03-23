"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ASH-SHU'ARA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ash-shuara
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ash-Shu'ara",
  arabicName: "الشُّعَراء",
  meaning: "The Poets",
  number: 26,
  ayahCount: 227,
  period: "Makki",
  juz: "19",
  movements: 3,
  thesis:
    "Seven prophets walk into the same wall, one after another — rejected by their own people, vindicated by the same God, sealed with the same two lines. A surah of accumulated testimony delivered in the register of consolation, named after the thing it is arguing against.",
  reflectionUrl: "/surahs/ash-shuara",
  readTime: "22 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "وَمَا كَانَ أَكْثَرُهُم مُّؤْمِنِينَ ۝ وَإِنَّ رَبَّكَ لَهُوَ الْعَزِيزُ الرَّحِيمُ",
    ayahRef: "26:8–9",
    translation: "And most of them were not believers. And indeed your Lord — He is the Exalted in Might, the Merciful.",
    why: "The twin refrain that seals every chamber of the surah — eight times across 227 ayahs. Human failure on one side, divine sovereignty on the other. By the eighth occurrence it has become the surah's thesis about history itself: the pattern is real, and the door was always open.",
  },

  audio: { surahNumber: 26, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "طسم", translation: "Ta-Sin-Mim." },
    { ayah: 2, arabic: "تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ", translation: "These are the verses of the clear Book." },
    { ayah: 3, arabic: "لَعَلَّكَ بَاخِعٌ نَّفْسَكَ أَلَّا يَكُونُوا مُؤْمِنِينَ", translation: "Perhaps you will destroy yourself with grief because they do not believe." },
    { ayah: 23, arabic: "قَالَ فِرْعَوْنُ وَمَا رَبُّ الْعَالَمِينَ", translation: "Pharaoh said, 'And what is the Lord of all worlds?'" },
    { ayah: 78, arabic: "الَّذِي خَلَقَنِي فَهُوَ يَهْدِينِ", translation: "Who created me, and He guides me." },
    { ayah: 80, arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ", translation: "And when I am ill, it is He who cures me." },
    { ayah: 192, arabic: "وَإِنَّهُ لَتَنزِيلُ رَبِّ الْعَالَمِينَ", translation: "And indeed, it is the revelation of the Lord of all worlds." },
    { ayah: 193, arabic: "نَزَلَ بِهِ الرُّوحُ الْأَمِينُ", translation: "The Trustworthy Spirit has brought it down." },
    { ayah: 194, arabic: "عَلَىٰ قَلْبِكَ لِتَكُونَ مِنَ الْمُنذِرِينَ", translation: "Upon your heart, so that you would be among the warners." },
    { ayah: 224, arabic: "وَالشُّعَرَاءُ يَتَّبِعُهُمُ الْغَاوُونَ", translation: "And the poets — the deviants follow them." },
    { ayah: 227, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", translation: "Except those who believe and do righteous deeds." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Movements",
      subtitle: "Prologue → seven chambers → the pivot to revelation",
      sections: [
        { ayahs: "1–9", title: "The Prologue", color: "#e07a8a", desc: "The surah opens with a grief named — bakhiʿun, approaching self-destruction with sorrow over his people's refusal. The divine response reframes: their disbelief is a choice, not a failure of evidence. The first refrain lands, sealing the prologue with the same two lines that will seal every chamber." },
        { ayahs: "10–68", title: "Musa & Pharaoh", color: "#9b7fd4", desc: "The longest story. Musa lists reasons the mission might fail — anxiety, inarticulate speech, a murder charge. Pharaoh asks 'What is the Lord of all worlds?' with studied contempt. His own magicians prostrate and confess faith. The Exodus, the sea, the drowning. Second refrain." },
        { ayahs: "69–104", title: "Ibrahim & the Interior Break", color: "#4ecdc4", desc: "From external tyranny to interior theology. Ibrahim defines God through six intimate attributes — created, guided, fed, cured, will raise, will forgive. Theology spoken as relationship. The shift from third-person to first-person is the moment monotheism becomes personal. Third refrain." },
        { ayahs: "105–191", title: "The Five Parallel Chambers", color: "#C9A84C", isPivot: true, desc: "Nuh (class rejection), Hud/'Ad (traditional pride), Salih/Thamud (sign-destruction), Lut (appetite), Shu'ayb (economic corruption). Five stories built from identical architectural bones — same opening charge, same credentials, same refrain. A comprehensive catalogue of rationalizations." },
        { ayahs: "192–227", title: "The Pivot to Revelation", color: "#e07a8a", desc: "What this Book actually is — tanzil rabb al-'alamin. The phrase that Pharaoh mocked, Ibrahim defined, and every prophet trusted, now names the Quran's source. Then the final distinction: the prophet lives what he speaks. The poet wanders. And then: even for the poets, the door is not closed." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening declaration and closing identification form a precise frame",
      pairs: [
        {
          left: { label: "The Book Declared", ayahs: "2", desc: "These are the ayahs of the clear Book — the opening statement about what this text is" },
          right: { label: "The Book Identified", ayahs: "192", desc: "It is the revelation of the Lord of all worlds — the closing statement about where it comes from" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Prophet's Grief", ayahs: "3", desc: "Perhaps you will destroy yourself with grief because they do not believe" },
          right: { label: "The Prophet Distinguished", ayahs: "224–227", desc: "He is not a poet — the deviants follow poets. He is a messenger whose words come from the Lord of all worlds" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Pharaoh's Mockery", ayahs: "23", desc: "Rabb al-'alamin asked with contempt — a phrase mocked by the powerful" },
          right: { label: "Every Prophet's Trust", ayahs: "109,127,145,164,180", desc: "My reward is only from rabb al-'alamin — the phrase spoken in faith by seven prophets across seven civilizations" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "Ibrahim's Definition", ayahs: "78–82",
        desc: "Who created me and guides me. Who feeds me and gives me drink. When I am ill, He cures me.",
        note: "The pivot from cosmic theology to first-person intimacy. The God being described is not an abstraction. He is the one you call when you are sick.",
      },
    },
    deductiveFunnel: {
      title: "The Catalogue of Rationalizations",
      subtitle: "Each people had a different reason for rejecting the messenger — each one still in circulation",
      layers: [
        { depth: 1, label: "Political Power", ayah: "Pharaoh", arabic: "فِرْعَوْنَ", desc: "Pharaoh's rejection is the rejection of the powerful: the message threatens the order that sustains his position. He performs its dismissal before his court because the mockery is political theater.", color: "#e07a8a" },
        { depth: 2, label: "Social Hierarchy", ayah: "Nuh", arabic: "الْأَرَاذِلُ", desc: "Nuh's people reject the message because of who else accepted it — 'the lowest of us.' The problem is not the message. The problem is the company it keeps.", color: "#9b7fd4" },
        { depth: 3, label: "Inherited Tradition", ayah: "Hud", arabic: "خُلُقُ الْأَوَّلِينَ", desc: "'This is nothing but the custom of the ancients.' We have always done it this way. Nothing has happened to us yet. Therefore nothing will. The oldest rationalization in the repertoire.", color: "#4ecdc4" },
        { depth: 4, label: "Appetite & Economy", ayah: "Lut/Shu'ayb", arabic: "لَا تُحِبُّونَ النَّاصِحِينَ", desc: "Lut's people choose desire over guidance. Shu'ayb's people corrupt the scales. Both are told: you do not love those who advise — la tuhibbuna al-nasihin. One of the most quietly devastating lines in the Quran.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "For a surah of this length, the absences are striking — and deliberate",
      absences: [
        { item: "No direct moral commands", note: "No dietary laws, no ritual instructions, no social regulations. The surah does not come to legislate. It comes to testify. The commands belong to later — after the argument has landed." },
        { item: "No detailed paradise or hell", note: "Descriptions of paradise and hell, so prominent in neighboring Makki surahs, are nearly absent. The surah is not trying to frighten its audience. It is trying to show them a pattern so clear that refusing to see it becomes its own indictment." },
        { item: "No direct address to the Quraysh", note: "The surah speaks to the Prophet, and within each story the prophets speak to their peoples. But the listeners in Mecca are never called out by name. They are left to draw the comparison themselves." },
        { item: "No narrative variation in the five chambers", note: "The five shorter prophet stories use identical structural bones — same opening, same credentials, same refrain. The repetition is the argument. The surah constructs a legal case through the accumulation of identical witnesses." },
        { item: "The surah named after its briefest section", note: "The poets occupy four ayahs at the surah's end (224-227). To name 227 ayahs of prophetic testimony after the thing it argues against is to foreground the question the entire surah exists to settle." },
      ],
    },
  },

  contentNodes: [
    { concept: "The twin refrain — al-'Aziz al-Rahim across history", type: "surah-specific", articleSlug: "twin-refrain-aziz-rahim-26" },
    { concept: "Ibrahim's six attributes — theology as intimacy", type: "surah-specific", articleSlug: "ibrahim-six-attributes-26-78" },
    { concept: "Ruh al-Amin — the Trustworthy Spirit passage", type: "cross-surah", articleSlug: "ruh-al-amin-trustworthy-spirit-26-193" },
    { concept: "Ash-Shu'ara to An-Naml — from accumulation to spectacle", type: "cross-surah", articleSlug: "shuara-naml-qasas-cluster" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Chambers" },
  { id: "mirror", label: "Mirror" },
  { id: "catalogue", label: "Catalogue" },
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
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "\u23F8" : "\u25B6"}
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
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
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Power → hierarchy → tradition → appetite → economy
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
              <div className="text-2xl font-bold text-gold-500 font-serif">8</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Refrains</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

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
          {activeTab === "catalogue" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
