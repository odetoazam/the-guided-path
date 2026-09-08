"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUDDATHTHIR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-muddathir
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Muddaththir",
  arabicName: "المُدَّثِّر",
  meaning: "The Cloaked One",
  number: 74,
  ayahCount: 56,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "A surah that pulls the cloak off a trembling man and sends him into a world that will call his message magic — narrating the psychology of denial step by step, turning a number into a diagnostic mirror, and closing by naming the God who sent the warning as the God who forgives.",
  reflectionUrl: "/surahs/al-muddathir",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "هُوَ أَهْلُ التَّقْوَىٰ وَأَهْلُ الْمَغْفِرَةِ",
    ayahRef: "74:56",
    translation: "He is worthy of being feared and worthy of forgiving.",
    why: "After fifty-five ayahs of warning — the command, the portrait of denial, the fire, the startled donkeys, the closed door of intercession — the final word is forgiveness. Two divine attributes held in a single breath: taqwa and maghfira. The warning exists so that the forgiveness can be reached.",
  },

  audio: { surahNumber: 74, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Commission",
      subtitle: "Four movements: awakening \u2192 portrait \u2192 mirror \u2192 confrontation",
      sections: [
        { ayahs: "1\u20137", title: "The Awakening", color: "#4ecdc4", desc: "A frightened man hiding under his cloak. Five commands in rapid succession: arise, warn, magnify your Lord, purify your garments, be patient. The Prophet's identity is being named \u2014 he is a nadhir, a warner. The cloak must come off." },
        { ayahs: "8\u201326", title: "The Portrait of the Denier", color: "#e07a8a", desc: "The surah narrows to a single human being, created alone with nothing, given everything, still greedy for more. Then the most psychologically detailed portrait of rejection in the Quran: he thought, calculated, looked, frowned, scowled, turned away, was arrogant \u2014 and produced the oldest dismissal in the world: it's just magic." },
        { ayahs: "27\u201348", title: "Saqar and the Nineteen", color: "#C9A84C", isPivot: true, desc: "The fire that leaves nothing and lets nothing escape. Over it are nineteen \u2014 and their number is a test. The same information produces certainty in one group, increased faith in another, and mockery in a third. Then the criminals confess: we did not pray, did not feed the poor, indulged in falsehood, denied the Day." },
        { ayahs: "49\u201356", title: "The Flight from Remembrance", color: "#9b7fd4", desc: "Those who flee the reminder like startled donkeys from a lion. Each demands his own personalized scripture. The surah closes on divine sovereignty: no one remembers unless Allah wills. And He is worthy of fear and worthy of forgiving." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's broad chiastic symmetry",
      pairs: [
        {
          left: { label: "The Command to Warn", ayahs: "1\u20137", desc: "Arise and warn. Five imperatives to a single man hiding under his cloak." },
          right: { label: "The World Flees the Warning", ayahs: "49\u201356", desc: "They flee the reminder like startled donkeys. The warning meets resistance, and the surah ends on forgiveness." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Difficult Day", ayahs: "8\u201310", desc: "When the trumpet is blown, that day will be difficult \u2014 'asir \u2014 not easy for the disbelievers." },
          right: { label: "Oaths and Accountability", ayahs: "32\u201340", desc: "By the moon, the departing night, the brightening dawn. Every soul is held in pledge for what it has earned." },
          color: "#9b7fd4",
        },
        {
          left: { label: "The Denier's Deliberation", ayahs: "11\u201326", desc: "He thought, calculated, frowned, turned away. The gap between effort and conclusion is the surah's indictment." },
          right: { label: "The Criminals' Confession", ayahs: "41\u201348", desc: "We did not pray. We did not feed the poor. We denied the Day. The certainty we mocked became the certainty we could not escape." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Saqar and the Nineteen", ayahs: "27\u201331",
        desc: "The fire that leaves nothing. The number that becomes a test. The mirror at the center.",
        note: "The number nineteen is a diagnostic. What you do with what you cannot fully explain reveals who you are.",
      },
    },
    deductiveFunnel: {
      title: "The Staircase of Denial",
      subtitle: "Seven verbs, seven choices, each leading to the next with the inevitability of gravity",
      layers: [
        { depth: 1, label: "Thought", ayah: "18", arabic: "إِنَّهُ فَكَّرَ وَقَدَّرَ", desc: "He thought and he calculated. The rejection does not begin with ignorance \u2014 it begins with intelligence. He heard the Quran, recognized its power, and began to deliberate.", color: "#4ecdc4" },
        { depth: 2, label: "Looked", ayah: "21", arabic: "ثُمَّ نَظَرَ", desc: "Then he looked \u2014 surveyed his options, considered the landscape. The pause between thinking and acting, where the choice is still open.", color: "#9b7fd4" },
        { depth: 3, label: "Frowned", ayah: "22", arabic: "ثُمَّ عَبَسَ وَبَسَرَ", desc: "Then he frowned and scowled. The face betrays what the mind has decided. The frown comes after the thinking \u2014 meaning the thinking led somewhere he did not want to go.", color: "#e07a8a" },
        { depth: 4, label: "Turned Away", ayah: "23", arabic: "ثُمَّ أَدْبَرَ وَاسْتَكْبَرَ", desc: "Then he turned his back and was arrogant. The body follows the face. Adbara \u2014 to turn one's back \u2014 and istakbara \u2014 to make oneself great. The physical and spiritual movements are one.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The absences are themselves a statement about the surah's purpose",
      absences: [
        { item: "No stories of previous prophets", note: "For a Makkan surah of this length, the absence is striking. The Prophet is being sent out without the comfort of knowing others walked this road before him. He is simply told to rise. The comfort will come later, in other surahs." },
        { item: "No destroyed nations", note: "No 'Ad, no Thamud, no flood. The consequence is named \u2014 Saqar \u2014 but the historical precedent is absent. The surah addresses the present and the future, not the past." },
        { item: "No descriptions of Paradise", note: "The people of the right are mentioned (ayah 39) and placed in gardens (ayah 40), but Paradise receives no description. The surah's energy is spent entirely on warning." },
        { item: "Allah named sparingly", note: "The divine name appears only in the passage about the nineteen and in the closing verses. For most of the surah, the voice speaks without naming itself. The intimacy is such that no name is needed." },
        { item: "No elaboration on the five commands", note: "Arise, warn, magnify, purify, be patient \u2014 each command receives a single verb. No explanation, no context, no qualification. The brevity is the authority." },
      ],
    },
  },

  contentNodes: [
    { concept: "The psychology of deliberate denial (74:18\u201325)", type: "surah-specific", articleSlug: "psychology-denial-74-portrait" },
    { concept: "Saqar and the diagnostic number nineteen", type: "surah-specific", articleSlug: "saqar-nineteen-74-27-31" },
    { concept: "Al-Muzzammil \u2013 Al-Muddaththir diptych", type: "cross-surah", articleSlug: "muzzammil-muddaththir-diptych" },
    { concept: "Kullu nafsin bima kasabat raheena \u2014 the soul's mortgage", type: "cross-surah", articleSlug: "raheena-soul-mortgage-74-52" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "commission", label: "Commission" },
  { id: "mirror", label: "Mirror" },
  { id: "staircase", label: "Staircase" },
  { id: "absent", label: "Absences" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
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
          <div
            ref={progressRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"
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
        Thought {"\u2192"} looked {"\u2192"} frowned {"\u2192"} turned away
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

        {/* -- Tab bar ------------------------------------------------------- */}
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

        {/* -- Tab content --------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "commission" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "staircase" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        {/* -- Go Deeper ----------------------------------------------------- */}
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
