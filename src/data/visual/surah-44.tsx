"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AD-DUKHAN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ad-dukhan
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ad-Dukhan",
  arabicName: "الدُّخَان",
  meaning: "The Smoke",
  number: 44,
  ayahCount: 59,
  period: "Makki",
  juz: 25,
  movements: 5,
  thesis:
    "Fifty-nine ayahs of compressed fury — spoken from inside the Blessed Night, collapsing all of history into a single argument about arrogance and submission, and leaving both the Prophet and his deniers in the same posture: watching.",
  reflectionUrl: "/surahs/ad-dukhan",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"qasam","english":"Oaths"},{"key":"qasas","english":"Quranic Narratives"}],
  heartVerse: {
    arabic: "ذُقْ إِنَّكَ أَنتَ الْعَزِيزُ الْكَرِيمُ",
    ayahRef: "44:49",
    translation: "Taste! Indeed, you are the honored, the noble!",
    why: "The Quran's most concentrated moment of divine sarcasm. The words al-ʿaziz and al-karim are genuine titles of honor when applied to God and prophets. Here they are flung at a person being dragged through fire — meaning exactly what that person once believed about themselves. You called yourself mighty. Taste what your honor has purchased.",
  },

  audio: { surahNumber: 44, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Nocturne",
      subtitle: "Five movements: blessed night → smoke → empire's fall → fire and garden → the watching",
      sections: [
        { ayahs: "1–9", title: "The Blessed Night", color: "#C9A84C", desc: "The surah opens with an oath by the Quran itself, then declares: this Book was sent down on a Blessed Night when every matter of wisdom is made distinct. The movement from 'your Lord' to 'Lord of the heavens and the earth' expands the frame in a single breath. Then the hinge: but they are in doubt, playing." },
        { ayahs: "10–16", title: "The Smoke", color: "#e07a8a", desc: "The sky brings forth a visible smoke that engulfs humanity. They cry out: 'Our Lord, remove this — we believe!' The surah's answer is devastating: how will remembrance benefit them now? A clear messenger came and they called him a taught madman. Relief is temporary. They will return to their old ways." },
        { ayahs: "17–33", title: "Pharaoh's Fall", color: "#9b7fd4", isPivot: true, desc: "A noble messenger sent to Pharaoh. No plagues described, no sea parting in detail — the surah leaps from appeal to escape by night. Leave the sea parted, calm. They are an army already drowned. Then: how many gardens and springs they left behind. The heaven and earth did not weep for them." },
        { ayahs: "34–57", title: "Zaqqum & the Gardens", color: "#4ecdc4", desc: "Creation was not made in play. The Day of Judgment is appointed. Then the Zaqqum tree — like molten metal boiling in bellies. 'Taste! You are the honored, the noble!' Against this: the God-conscious in gardens and springs, wearing silk, facing one another, secure. The same word — gardens, springs — inverted from Pharaoh's loss to the believers' gain." },
        { ayahs: "58–59", title: "The Watching", color: "#C9A84C", desc: "The surah returns to the Quran: made easy in your tongue so that they might remember. So watch — indeed, they are watching. The Prophet watches. His people watch. The same posture, opposite orientations. The silence after the final word is the surah's last argument." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric architecture mirrors the descent of revelation against the ascent of consequence",
      pairs: [
        {
          left: { label: "The Quran Descends", ayahs: "1–9", desc: "By the Clear Book — sent down on a Blessed Night when every decree is made distinct. But they are in doubt, playing." },
          right: { label: "The Quran Made Easy", ayahs: "58–59", desc: "Made easy in your tongue so they might remember. So watch — they too are watching." },
          color: "#C9A84C",
        },
        {
          left: { label: "The Smoke & False Repentance", ayahs: "10–16", desc: "Punishment arrives, they beg for relief, are relieved temporarily, and return to denial" },
          right: { label: "Gardens of Permanent Security", ayahs: "51–57", desc: "The God-conscious receive security that will never be withdrawn — what the deniers begged for temporarily, the believers receive forever" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Pharaoh's Historical Destruction", ayahs: "17–33", desc: "A noble messenger — rasulun karim — rejected. Gardens and springs inherited. The sky did not weep." },
          right: { label: "The Arrogant in Eternal Fire", ayahs: "43–50", desc: "Zaqqum, molten metal, dragged to the center. 'Taste! You are the honored, the karim!' The word bridges both halves." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Creation Is Not Play", ayahs: "34–42",
        desc: "The heavens and earth were not created in play. The Day of Separation is the appointed time for all of them.",
        note: "The fulcrum of the entire argument: if creation has purpose, then accountability is inevitable. Both Hell and Paradise follow with logical necessity.",
      },
    },
    deductiveFunnel: {
      title: "The Temporal Collapse",
      subtitle: "The surah collapses past, present, and future into a single argument — all happening on the same Night",
      layers: [
        { depth: 1, label: "The Eternal Present", ayah: "3–4", arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ", desc: "Revelation descending. The Blessed Night, when every matter of wisdom is made distinct. This is happening now — the present tense of the divine act that makes all other acts possible.", color: "#C9A84C" },
        { depth: 2, label: "The Historical Past", ayah: "17–29", arabic: "فَمَا بَكَتْ عَلَيْهِمُ السَّمَاءُ وَالْأَرْضُ", desc: "Pharaoh's story, told in past tense. A civilization of gardens and springs and noble sites — inherited by others. The cosmos refused to mourn them. What happened then is a mirror of what is happening now.", color: "#9b7fd4" },
        { depth: 3, label: "The Eschatological Future", ayah: "43–49", arabic: "ذُقْ إِنَّكَ أَنتَ الْعَزِيزُ الْكَرِيمُ", desc: "The Zaqqum tree, the dragging, the scalding, the sarcasm. Told in future/present tense — this will happen, is happening, has already been decreed. The word karim travels from Moses (noble messenger) to the condemned (you are the noble one — taste).", color: "#e07a8a" },
        { depth: 4, label: "The Immediate Present", ayah: "58–59", arabic: "فَارْتَقِبْ إِنَّهُم مُّرْتَقِبُونَ", desc: "Back to the page in the Prophet's hands. The Quran made easy in his tongue. So watch — they are watching. The surah treats all four temporal planes as simultaneous, contained in the same Night.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah has a single concern — the gap between divine authority and human arrogance — and everything else is stripped away",
      absences: [
        { item: "No legislation whatsoever", note: "No commands about prayer, charity, fasting, or social conduct anywhere in fifty-nine ayahs. The surah has one question: will you recognize the authority of the One who speaks, or follow Pharaoh's path of refusal?" },
        { item: "No plagues, no miracles described", note: "The entire sequence of signs that Surahs Al-A'raf and Ta-Ha develop across dozens of ayahs is absent. The surah leaps from Moses' appeal directly to God's command: travel by night. The economy is deliberate." },
        { item: "No prophetic inner life", note: "Moses appears as God's instrument. Muhammad is told to watch and wait. No prophet's personal struggle, emotional journey, or private conversation with God appears. The surah is interested in the encounter between divine authority and human arrogance — nothing else." },
        { item: "No community of believers addressed", note: "The believers are described in Paradise (ayahs 51-57) but never addressed with instructions or consolation in this world. The surah speaks past them to the confrontation that matters." },
        { item: "No sea-parting spectacle", note: "The sea stands 'rahwan' — still, calm, at rest. Like a door held open. The army is already drowned in the divine decree before they reach the water. The surah refuses to make the miracle dramatic. It makes it quiet." },
      ],
    },
  },

  contentNodes: [
    { concept: "The heaven and earth did not weep for them", type: "surah-specific", articleSlug: "cosmos-did-not-weep-44-29" },
    { concept: "Dhuq — divine sarcasm and the karim inversion", type: "surah-specific", articleSlug: "taste-karim-sarcasm-44-49" },
    { concept: "Laylat al-Mubaraka and the Night of Decree", type: "cross-surah", articleSlug: "blessed-night-decree-44-97" },
    { concept: "Creation is not play — the purposive cosmos", type: "cross-surah", articleSlug: "creation-not-play-44-38" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "nocturne", label: "Nocturne" },
  { id: "ring", label: "Ring" },
  { id: "temporal", label: "Temporal" },
  { id: "absent", label: "Absences" },
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
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
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
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Eternal present → historical past → eschatological future → immediate present</div>
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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Night</div></div>
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
          {activeTab === "nocturne" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "temporal" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
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
