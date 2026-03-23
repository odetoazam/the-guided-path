"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH FATIR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/fatir
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Fatir",
  arabicName: "فَاطِر",
  meaning: "The Originator",
  number: 35,
  ayahCount: 45,
  period: "Makki",
  juz: 22,
  movements: 4,
  thesis:
    "A surah that walks you through a gallery of everything God ever originated — wings, rain, oceans, mountains streaked in three colors, the full spectrum of the human heart — and then turns the lights on to show you that the Artist has been watching you look at His work all along.",
  reflectionUrl: "/surahs/fatir",
  readTime: "22 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
    ayahRef: "35:28",
    translation: "Only those among His servants who have knowledge truly fear Allah.",
    why: "Placed at the summit of a passage about geology and pigmentation — the streaks of red, white, and raven-black in mountains. Knowledge here is the ability to read color as theology. The scholar who trembles is the one who sees a fingerprint of divine will in every shade of stone.",
  },

  audio: { surahNumber: 35, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ جَاعِلِ الْمَلَائِكَةِ رُسُلًا أُولِي أَجْنِحَةٍ مَّثْنَىٰ وَثُلَاثَ وَرُبَاعَ", translation: "All praise belongs to Allah, Originator of the heavens and the earth, who made the angels messengers having wings in pairs — two, three, and four." },
    { ayah: 2, arabic: "مَا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا ۖ وَمَا يُمْسِكْ فَلَا مُرْسِلَ لَهُ مِن بَعْدِهِ", translation: "Whatever mercy Allah opens for people, none can withhold it. And whatever He withholds, none can release it after Him." },
    { ayah: 3, arabic: "يَا أَيُّهَا النَّاسُ اذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ ۚ هَلْ مِنْ خَالِقٍ غَيْرُ اللَّهِ يَرْزُقُكُم مِّنَ السَّمَاءِ وَالْأَرْضِ", translation: "O humanity, remember the blessing of Allah upon you. Is there any creator other than Allah who provides for you from the sky and the earth?" },
    { ayah: 15, arabic: "يَا أَيُّهَا النَّاسُ أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ ۖ وَاللَّهُ هُوَ الْغَنِيُّ الْحَمِيدُ", translation: "O humanity, you are the ones in need of Allah, and Allah is the Free of need, the Praiseworthy." },
    { ayah: 27, arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ ثَمَرَاتٍ مُّخْتَلِفًا أَلْوَانُهَا", translation: "Do you not see that Allah sends down rain from the sky, and We produce thereby fruits of varying colors?" },
    { ayah: 28, arabic: "وَمِنَ الْجِبَالِ جُدَدٌ بِيضٌ وَحُمْرٌ مُّخْتَلِفٌ أَلْوَانُهَا وَغَرَابِيبُ سُودٌ ۝ إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ", translation: "And in the mountains are tracts, white and red of varying shades, and raven-black. Only those among His servants who have knowledge truly fear Allah." },
    { ayah: 32, arabic: "ثُمَّ أَوْرَثْنَا الْكِتَابَ الَّذِينَ اصْطَفَيْنَا مِنْ عِبَادِنَا ۖ فَمِنْهُمْ ظَالِمٌ لِّنَفْسِهِ وَمِنْهُم مُّقْتَصِدٌ وَمِنْهُمْ سَابِقٌ بِالْخَيْرَاتِ", translation: "Then We caused those whom We chose to inherit the Book. And among them is he who wrongs himself, the moderate, and the one foremost in good deeds." },
    { ayah: 34, arabic: "وَقَالُوا الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنَّا الْحَزَنَ", translation: "And they will say: 'Praise to Allah who has removed from us sorrow.'" },
    { ayah: 37, arabic: "أَوَلَمْ نُعَمِّرْكُم مَّا يَتَذَكَّرُ فِيهِ مَن تَذَكَّرَ وَجَاءَكُمُ النَّذِيرُ", translation: "Did We not give you lives long enough for whoever would reflect to reflect? And the warner came to you." },
    { ayah: 45, arabic: "وَلَوْ يُؤَاخِذُ اللَّهُ النَّاسَ بِمَا كَسَبُوا مَا تَرَكَ عَلَىٰ ظَهْرِهَا مِن دَابَّةٍ ۚ إِنَّ اللَّهَ كَانَ بِعِبَادِهِ بَصِيرًا", translation: "If Allah were to take people to account for what they have earned, He would not leave upon the earth a single creature. Indeed, Allah is ever, of His servants, Seeing." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Gallery Tour",
      subtitle: "Four movements: origination → signs → poverty → reckoning",
      sections: [
        { ayahs: "1–8", title: "The Originator & His Angels", color: "#4ecdc4", desc: "Opens with praise for al-Fatir — the One who splits open what never existed. Angels with wings in pairs of two, three, and four. Mercy that none can withhold. A direct challenge: is there any creator besides Allah? And a warning against the deception of worldly life." },
        { ayahs: "9–14", title: "The Gallery of Signs", color: "#C9A84C", desc: "Rain on dead earth. Two seas — fresh and salt — that never merge. Night turning into day. The surah's prose slows to the pace of observation. Each sign demonstrates a principle: the same rain produces different colors of fruit. Diversity is the evidence of intention." },
        { ayahs: "15–28", title: "Poverty & the Theology of Color", color: "#e07a8a", isPivot: true, desc: "The hinge: 'O humanity, you are the ones in need of Allah.' Then parables of the blind and seeing, the living and the dead. Mountains streaked white, red, and raven-black. Creatures of every shade. And at the summit: 'Only those who have knowledge truly fear Allah.'" },
        { ayahs: "29–45", title: "The Three Inheritors & the Final Seeing", color: "#9b7fd4", desc: "Believers sorted into three categories — the self-wronging, the moderate, the foremost — all called inheritors of the Book. Paradise described as the removal of sorrow. Hell confronted with: 'Did We not give you time?' The final word: Bassir — Seeing. The Artist watches you watch His work." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The direction of the gaze reverses — from seeing creation to being seen",
      pairs: [
        {
          left: { label: "Allah as Originator", ayahs: "1–4", desc: "Fatir — Originator of heavens and earth. Angels with varied wings. Mercy opened and closed by Him alone." },
          right: { label: "Allah as Seer", ayahs: "38–45", desc: "Knower of the unseen. False gods created nothing. The deferral is mercy, and the One deferring is watching. Bassir." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Two Paths", ayahs: "5–8", desc: "Warning against worldly deception. Shaytan as the arch-deceiver. The one whose evil deeds are made beautiful to him." },
          right: { label: "The Three Categories", ayahs: "29–37", desc: "Not binary but spectrum: the self-wronging, the moderate, the foremost. All three are inheritors. All three were chosen." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Cosmic Signs", ayahs: "9–14", desc: "Rain, salt and fresh seas, night and day, sun and moon. Creation as field of provision." },
          right: { label: "Color as Theology", ayahs: "27–28", desc: "Mountains white, red, raven-black. Creatures of every shade. Knowledge that leads to khashya — trembling awe." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Poverty Declaration", ayahs: "15",
        desc: "O humanity, you are the ones in need of Allah, and Allah is the Free of need, the Praiseworthy.",
        note: "Everything before it displays the creation and asks: who did this? Everything after it explores the moral consequences of answering that question.",
      },
    },
    deductiveFunnel: {
      title: "The Gaze",
      subtitle: "The surah reverses who is looking at whom",
      layers: [
        { depth: 1, label: "The Origin", ayah: "1", arabic: "فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ", desc: "Fatir — the One who splits something open from nothing, who originates without precedent, without model. Diversity is original. Difference is by design. Even the angels do not all have the same number of wings.", color: "#4ecdc4" },
        { depth: 2, label: "The Evidence", ayah: "9–14", arabic: "وَاللَّهُ الَّذِي أَرْسَلَ الرِّيَاحَ", desc: "Rain on dead earth, two seas that never merge, night turning into day. The surah does not argue from hidden knowledge or prophetic narrative. It argues from what everyone can already see. The challenge is not 'believe this story' but 'explain what is already in front of you.'", color: "#C9A84C" },
        { depth: 3, label: "The Poverty", ayah: "15", arabic: "أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ", desc: "The hinge. The word fuqara — utterly destitute — applied to all of humanity without exception. The contrast with al-Ghani al-Hamid is total. There is no middle ground.", color: "#e07a8a" },
        { depth: 4, label: "The Seeing", ayah: "45", arabic: "إِنَّ اللَّهَ كَانَ بِعِبَادِهِ بَصِيرًا", desc: "The final word is Bassir — Seeing. The gallery visitor is also being observed. You began by looking at what He made. You end realizing He has been looking at you the entire time.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence shapes the gallery — what is not on the walls tells you what the curator intends",
      absences: [
        { item: "No prophetic story", note: "In a Makkan surah of this length, you would expect at least one narrative — Nuh, Hud, Musa. Fatir offers none. Messengers are mentioned only in passing. The entire persuasive weight rests on creation, on what a person can observe without any scripture at all." },
        { item: "No detailed eschatological scene", note: "Paradise and Hell are stated as consequence, not depicted as experience. No vivid immersive scenes of judgment — unlike neighboring surahs Saba and Ya-Sin. The afterlife is conclusion, not cinema." },
        { item: "No direct ethical commands", note: "No instruction to pray, give charity, or observe specific obligations. The surah is not legislating. It is displaying. The moral argument is made entirely through the evidence of creation and the taxonomy of response." },
        { item: "No named antagonist", note: "No Pharaoh, no 'Ad, no Thamud. The antagonist in Fatir is not a person or a nation — it is distraction itself, the inability to see what is already in front of you. The enemy is unnamed because it is universal." },
        { item: "No consolation for the Prophet", note: "Only two moments address the Prophet directly (ayahs 8, 22). Both are brief. The surah's frustration — quiet but real — is not at persecution but at the gap between evidence and response. The evidence is overwhelming. The refusal continues." },
      ],
    },
  },

  contentNodes: [
    { concept: "Innama yakhsha — knowledge that produces trembling", type: "surah-specific", articleSlug: "yakhsha-ulama-knowledge-awe-35-28" },
    { concept: "The three inheritors — zalim, muqtasid, sabiq", type: "surah-specific", articleSlug: "three-inheritors-35-32" },
    { concept: "Saba-Fatir diptych — paired openings of praise", type: "cross-surah", articleSlug: "saba-fatir-praise-diptych" },
    { concept: "The fly and the raindrop — Al-Hajj 22:73 and Fatir 35:40", type: "cross-surah", articleSlug: "fly-raindrop-hajj-fatir" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "gallery", label: "Gallery" },
  { id: "ring", label: "Ring" },
  { id: "gaze", label: "Gaze" },
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
        Origin → evidence → poverty → the Seeing
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
          {activeTab === "gallery" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "gaze" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
