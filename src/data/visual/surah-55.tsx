"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AR-RAHMAN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ar-rahman
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ar-Rahman",
  arabicName: "الرَّحمٰن",
  meaning: "The Most Merciful",
  number: 55,
  ayahCount: 78,
  period: "Madani",
  juz: 27,
  movements: 4,
  thesis:
    "A 78-ayah hymn of cascading blessings punctuated thirty-one times by a single question — which of the favors of your Lord would you deny? — until the accumulation itself becomes the argument and denial becomes incoherent.",
  reflectionUrl: "/surahs/ar-rahman",
  readTime: "25 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "كُلُّ مَنْ عَلَيْهَا فَانٍ ﴿٢٦﴾ وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ",
    ayahRef: "55:26–27",
    translation: "Everyone upon it is perishing. And there remains the face of your Lord, full of majesty and honor.",
    why: "The turning point of the entire surah. Everything before it is an accumulation of beauty — cosmos, seas, fruit, horizons. This ayah acknowledges that all of it is passing away, already in dissolution. The word 'fan' is a present participle: not 'will perish' but 'is perishing.' And then the counterweight — God's face remains. The phrase dhul-jalali wal-ikram appears only twice in the Quran, both in this surah, framing everything between the pivot and the finale.",
  },

  audio: { surahNumber: 55, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الرَّحْمَـٰنُ", translation: "The Most Merciful —" },
    { ayah: 2, arabic: "عَلَّمَ الْقُرْآنَ", translation: "He taught the Quran." },
    { ayah: 3, arabic: "خَلَقَ الْإِنسَانَ", translation: "He created the human being." },
    { ayah: 4, arabic: "عَلَّمَهُ الْبَيَانَ", translation: "He taught him clear expression." },
    { ayah: 5, arabic: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ", translation: "The sun and the moon move by precise calculation." },
    { ayah: 6, arabic: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ", translation: "And the stars and the trees prostrate." },
    { ayah: 7, arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ", translation: "And the sky He raised, and He established the balance —" },
    { ayah: 13, arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", translation: "So which of the favors of your Lord would you deny?" },
    { ayah: 19, arabic: "مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ", translation: "He released the two seas, meeting side by side —" },
    { ayah: 20, arabic: "بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ", translation: "between them a barrier neither one transgresses." },
    { ayah: 26, arabic: "كُلُّ مَنْ عَلَيْهَا فَانٍ", translation: "Everyone upon it is perishing." },
    { ayah: 27, arabic: "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ", translation: "And there remains the face of your Lord, full of majesty and honor." },
    { ayah: 46, arabic: "وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ", translation: "And for the one who feared standing before their Lord: two gardens." },
    { ayah: 64, arabic: "مُدْهَامَّتَانِ", translation: "Intensely, darkly green." },
    { ayah: 78, arabic: "تَبَارَكَ اسْمُ رَبِّكَ ذِي الْجَلَالِ وَالْإِكْرَامِ", translation: "Blessed is the name of your Lord, full of majesty and honor." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Hymn of Mercy",
      subtitle: "Four waves: creation → earthly signs → reckoning → gardens",
      sections: [
        { ayahs: "1–16", title: "The Name and Creation", color: "#4ecdc4", desc: "The surah opens with a name — Ar-Rahman — and then mercy's first act: teaching. The Quran is taught before the human is created, as if the curriculum preceded the student. From language the surah moves outward: sun, moon, stars, trees, the sky raised, the balance established three times in three ayahs. The earth laid out for all creatures, fruit and fragrant herbs." },
        { ayahs: "17–30", title: "The Horizons and the Pivot", color: "#9b7fd4", desc: "Two easts, two wests, two seas that meet but do not merge — a barzakh between them. Ships like mountains on the water, pearls and coral from the deep. Then the devastating turn: everything upon it is perishing, only God's face remains. The refrain intensifies around the pivot, as if the surah is catching its breath before the descent into accountability." },
        { ayahs: "31–45", title: "The Reckoning", color: "#e07a8a", desc: "The mercy that was cataloged will now be weighed. O company of jinn and humans — we will attend to you. A flame of fire and smoke. The sky splits open like a rose dissolving in oil. The guilty seized by their marks. Even here the refrain continues — the warning itself is a mercy." },
        { ayahs: "46–78", title: "The Four Gardens", color: "#C9A84C", isPivot: true, desc: "Two gardens for those who feared standing before their Lord — spreading branches, flowing springs, every fruit in pairs, brocade-lined couches. Then below them two more — intensely darkly green, gushing springs, pomegranates. The surah ends with the same phrase that marked its pivot: blessed is the name of your Lord, full of majesty and honor." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Names",
      subtitle: "The surah begins with a name and ends by blessing a name — everything between is what the name contains",
      pairs: [
        {
          left: { label: "The Name", ayahs: "1–4", desc: "Ar-Rahman — then teaching, creation, language. Mercy's first acts, in sequence." },
          right: { label: "The Name Blessed", ayahs: "78", desc: "Blessed is the name of your Lord, dhul-jalali wal-ikram. The surah closes the circle." },
          color: "#C9A84C",
        },
        {
          left: { label: "Creation's Signs", ayahs: "5–25", desc: "Sun, moon, stars, trees, balance, earth, seas, ships — this world's blessings displayed." },
          right: { label: "Paradise's Gardens", ayahs: "46–77", desc: "Springs, fruit, shade, companions, cushions — this world's blessings perfected and made permanent." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Reckoning", ayahs: "31–45", desc: "Accountability — the guilty known by their marks, seized by forelocks and feet." },
          right: { label: "The Reckoning", ayahs: "28–30", desc: "Everyone in heavens and earth asks Him; every day He is in activity. Even needing God is a mercy." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Pivot", ayahs: "26–27",
        desc: "Everyone upon it is perishing. And there remains the face of your Lord, full of majesty and honor.",
        note: "The phrase dhul-jalali wal-ikram appears only twice in the Quran — both in this surah. At the pivot (27) and at the finale (78). Everything between radiates from this center.",
      },
    },
    deductiveFunnel: {
      title: "The Refrain's Journey",
      subtitle: "The same question asked thirty-one times — but its weight changes depending on what precedes it",
      layers: [
        { depth: 1, label: "After Creation", ayah: "13", arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", desc: "After the cosmic order — sun, moon, balance, earth, fruit. The question is almost tender. Which of these blessings would you call a lie? The evidence has been laid out. The question is whether you have the capacity to deny any of it.", color: "#4ecdc4" },
        { depth: 2, label: "After Raw Material", ayah: "16", arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", desc: "After naming what humans and jinn are made of — clay and fire. Among the favors is your own creation from almost nothing. The refrain acquires a new dimension.", color: "#9b7fd4" },
        { depth: 3, label: "After Reckoning", ayah: "42", arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", desc: "After sinners seized by forelocks and thrown into hellfire. The word ala' shifts from 'blessings' toward 'awesome acts of power.' The same question now asks: can you deny God's power to hold you to account?", color: "#e07a8a" },
        { depth: 4, label: "After Paradise", ayah: "77", arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", desc: "After pomegranates and green cushions and gushing springs. The question is no longer about this world but the promise of the next. By the final repetition the reader is caught in a rhythm that feels less like being questioned and more like being held.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips away everything except the display of what God has given and the question of whether you can deny it",
      absences: [
        { item: "No prophets", note: "No Musa, no Ibrahim, no narrative of any messenger. No destroyed nations. The surah has no interest in precedent — its evidence is the present world and the world to come." },
        { item: "No moral commands", note: "No 'do this' or 'avoid that.' No mention of prayer, fasting, charity, or any ritual obligation. The surah's only imperative is hidden inside a question." },
        { item: "No dialogue", note: "No quoted speech from any human being. The only voice is the divine voice presenting evidence and the refrain asking for a response." },
        { item: "No name 'Allah'", note: "The divine is named exclusively as ar-Rahman (ayah 1) and as Rabb throughout the refrain. The surah operates entirely within the framework of mercy and sustaining care." },
        { item: "No argument against disbelief", note: "The surah does not argue against atheism or idolatry. It places you inside the evidence and asks if you can deny any of it. The method is immersion, not persuasion." },
      ],
    },
  },

  contentNodes: [
    { concept: "The refrain — thirty-one repetitions and the shifting weight of ala'", type: "surah-specific", articleSlug: "ar-rahman-refrain-31-times" },
    { concept: "Barzakh — the barrier between two seas", type: "surah-specific", articleSlug: "barzakh-barrier-two-seas-55" },
    { concept: "Ar-Rahman / Al-Waqiah twin — gift then invoice", type: "cross-surah", articleSlug: "ar-rahman-waqiah-twin" },
    { concept: "Dhul-jalali wal-ikram — the twin phrase framing the surah", type: "cross-surah", articleSlug: "dhul-jalali-wal-ikram-55" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "refrain", label: "Refrain" },
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
        Invitation → vulnerability → accountability → embrace
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
            Surah {d.number} · {d.period}
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
              <div className="text-2xl font-bold text-gold-500 font-serif">31</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Refrains</div>
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "refrain" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
