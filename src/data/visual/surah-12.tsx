"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH YUSUF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/yusuf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Yusuf",
  arabicName: "يُوسُف",
  meaning: "Joseph",
  number: 12,
  ayahCount: 111,
  period: "Makki",
  juz: "12–13",
  movements: 6,
  thesis:
    "The only surah in the Quran to tell a single story from beginning to end without interruption — a boy's dream, the decades that follow it, and the night it finally comes true — demonstrating that what looks like destruction is a thread in a weave too fine for human sight, and the Weaver's name is Al-Latif.",
  reflectionUrl: "/surahs/yusuf",
  readTime: "25 min read",

  heartVerse: {
    arabic: "إِنَّ رَبِّي لَطِيفٌ لِّمَا يَشَاءُ",
    ayahRef: "12:100",
    translation: "Indeed, my Lord is Latif in what He wills.",
    why: "Spoken at the moment of fulfillment, looking backward across an entire life. The well was lutf. The slavery was lutf. The false accusation, the prison, the forgotten years — lutf. The plan was always there. It moved through spaces human sight could not follow. Only here does the weave become visible. Only here does Yusuf name the Weaver.",
  },

  audio: { surahNumber: 12, reciter: "ar.alafasy" },

  sectionMap: [
    { ayahs: "1–6", title: "The Frame & the Dream", color: "#9b7fd4", desc: "Alif-lam-ra. 'We narrate to you the most beautiful of stories.' A boy tells his father: I saw eleven stars and the sun and the moon prostrating to me. Ya'qub warns: do not tell your brothers. The word kayd — scheming — enters the surah like a seed." },
    { ayahs: "7–20", title: "The Betrayal & First Shirt", color: "#e07a8a", desc: "The brothers' jealousy, the well, the caravan. Inside the well, divine revelation: 'You will one day tell them what they did.' The first shirt — dipped in false blood. Ya'qub: 'Patience is most fitting.' Yusuf sold in Egypt for a trivial price." },
    { ayahs: "21–35", title: "The Household & Second Shirt", color: "#e07a8a", desc: "The Aziz's house. The closed doors. Yusuf's refusal — theological before moral. He flees, the shirt tears from behind. The fabric testifies. The women's banquet, the cut hands. Yusuf chooses prison over compromise." },
    { ayahs: "36–42", title: "The Prison & the Still Center", color: "#C9A84C", isPivot: true, desc: "The chiastic center. Two companions, two dreams. Before interpreting either, Yusuf teaches tawhid to an audience of two in a cell. The lowest physical point is the location of the most important work. The freed companion forgets. Years pass inside a sentence." },
    { ayahs: "43–57", title: "The King's Dream & Vindication", color: "#4ecdc4", desc: "Seven fat cows devoured by seven lean. Yusuf interprets from the cell, adds policy. Refuses to leave until publicly exonerated. Zulaykha confesses. The verb makkanna returns: 'Thus We established Yusuf in the land.'" },
    { ayahs: "58–87", title: "The Brothers Return", color: "#4ecdc4", desc: "The brothers stand before the minister they do not recognize. Benjamin detained. Ya'qub's grief deepens until his eyes turn white. From inside that blindness: 'Do not despair of the mercy of Allah.' The only command-like verse in a surah of no commands." },
    { ayahs: "88–93", title: "The Revelation & Third Shirt", color: "#C9A84C", desc: "'Are you indeed Yusuf?' — 'I am Yusuf.' No blame upon you today. The third shirt sent home to heal a father's blindness. The garment that began as deception becomes restoration." },
    { ayahs: "94–101", title: "The Dream Fulfilled", color: "#9b7fd4", desc: "Ya'qub smells Yusuf before the caravan arrives. The shirt restores his sight. The family prostrates. Eleven stars, the sun, the moon — awake in the world. 'Indeed, my Lord is Latif in what He wills.' Yusuf prays to die a Muslim." },
    { ayahs: "102–111", title: "The Surah Reflects on Itself", color: "#1A7A54", desc: "'You were not with them when they schemed.' The revelation's own credentials. 'This is my way — I invite to Allah with insight.' The final declaration: confirmation, explanation, guidance, mercy." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Weave",
      subtitle: "Dream → compression → the still center → release → fulfillment",
      sections: [
        { ayahs: "1–6", title: "The Dream Given", color: "#9b7fd4", desc: "Eleven stars, the sun, the moon. The word ta'wil — the tracing of something back to its ultimate meaning — enters at ayah 6 and will not close until ayah 100. The surah is about interpretation, and it has structured itself to require interpretation." },
        { ayahs: "7–35", title: "Compression", color: "#e07a8a", desc: "The well. The slavery. The false accusation. The prison. Every form of darkness the Prophet Muhammad was living through — betrayal, separation, false charges, years of silence — mapped onto Yusuf's life. Three shirts tracking deception, evidence, and healing." },
        { ayahs: "36–42", title: "The Still Center", color: "#C9A84C", isPivot: true, desc: "At the mathematical and emotional midpoint, in the darkest room of his life, Yusuf does not cry out for release. He teaches tawhid — the oneness of God — to two men in a cell. The center of the ring is not the triumph. It is the theology spoken in the dark." },
        { ayahs: "43–93", title: "Release", color: "#4ecdc4", desc: "The king's dream cracks the cell open. Vindication insisted upon before freedom accepted. The brothers return. Ya'qub's grief deepens toward blindness. And then: 'Are you indeed Yusuf?' Everything concealed is now revealed. Everything broken begins to mend." },
        { ayahs: "94–111", title: "The Dream Fulfilled", color: "#1A7A54", desc: "The shirt heals. The family prostrates. Ta'wil closes its bracket. Yusuf names Al-Latif — the One whose planning is too fine-grained to detect until complete. His final prayer: to die a Muslim. The surah declares what it has been: the most beautiful of stories, earning the claim it made before a single scene was narrated." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Shirts",
      subtitle: "Three shirts track the arc: deception → truth → restoration",
      pairs: [
        {
          left: { label: "First Shirt: Deception", ayahs: "18", desc: "Dipped in false blood, brought to Ya'qub to substantiate a lie about Yusuf's death — the garment as instrument of falsehood" },
          right: { label: "Third Shirt: Restoration", ayahs: "93–96", desc: "Sent from Egypt to Canaan, placed on Ya'qub's face — his sight returns. The garment as vehicle of healing" },
          color: "#9b7fd4",
        },
        {
          left: { label: "The Well", ayahs: "15", desc: "At the bottom, while his brothers walk away, Allah speaks to Yusuf directly: 'You will one day tell them.' Revelation at the lowest physical point." },
          right: { label: "The Throne", ayahs: "100", desc: "He raises his parents on the throne. They all prostrate. The dream from ayah 4 is now awake in the world. 'This is the ta'wil of my vision from before.'" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Second Shirt: Evidence", ayahs: "26–27", desc: "Torn from behind — the fabric itself testifies. Truth determined by physical evidence. Yusuf exonerated by the object that once condemned him." },
          right: { label: "The Confession", ayahs: "51", desc: "Zulaykha speaks: 'Now the truth has become evident. It was I who sought to seduce him.' The truth surfaces because Yusuf demanded it." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Prison Da'wah", ayahs: "37–40",
        desc: "'Are separate lords better, or Allah, the One, the Prevailing?' — tawhid taught in a dungeon to an audience of two.",
        note: "The hinge between compression and release. Everything before: the well, the accusation, the cell. Everything after: the king's dream, the vindication, the family restored. The center of the surah's structure is not despair — it is da'wah offered from the lowest point a human life can reach.",
      },
    },
    deductiveFunnel: {
      title: "The Three Shirts",
      subtitle: "One garment, three appearances across seventy-five ayahs — the surah's argument made material",
      layers: [
        { depth: 1, label: "Shirt I — Deception", ayah: "18", arabic: "وَجَاءُوا عَلَىٰ قَمِيصِهِ بِدَمٍ كَذِبٍ", desc: "The brothers bring Yusuf's shirt stained with false blood. Ya'qub does not believe them. 'Rather, your souls have enticed you to something, so patience is most fitting.' The word sabr enters the surah — binding, restraining what wants to break loose.", color: "#e07a8a" },
        { depth: 2, label: "Shirt II — Evidence", ayah: "26–27", arabic: "إِن كَانَ قَمِيصُهُ قُدَّ مِن دُبُرٍ", desc: "If the shirt is torn from the front, she is truthful; if torn from behind, she has lied. The fabric testifies. The shirt is torn from behind. The object that once condemned him now exonerates him. Truth is determined by physical evidence.", color: "#C9A84C" },
        { depth: 3, label: "Shirt III — Restoration", ayah: "93", arabic: "اذْهَبُوا بِقَمِيصِي هَٰذَا", desc: "'Take this, my shirt, and cast it over the face of my father — he will regain his sight.' The garment that began as an instrument of deception travels the same geography in the opposite direction to end grief. One shirt. Three functions. Falsehood → truth → healing.", color: "#9b7fd4" },
        { depth: 4, label: "The Name", ayah: "100", arabic: "إِنَّ رَبِّي لَطِيفٌ لِّمَا يَشَاءُ", desc: "At the moment of fulfillment, Yusuf names the attribute that governed the entire journey: Al-Latif — the One whose planning moves through matter the way a fragrance moves through air. The thread was never broken. It went into a space below the threshold of perception.", color: "#1A7A54" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that teaches entirely by example — every absence is a formal choice",
      absences: [
        { item: "No destroyed nations", note: "Every other Makki surah from this period invokes the fate of 'Ad and Thamud. Yusuf has none of this. The warning register is entirely replaced by a living example. Instead of showing what happens to those who transgress, it shows what becomes of the one who holds on." },
        { item: "No direct moral commands", note: "No 'O you who believe, do this.' One hundred and one of the surah's one hundred and eleven ayahs are pure narrative. The story is trusted to teach by itself, without being told what to teach." },
        { item: "No imperative form", note: "The absence of commands is the method. Watching someone's life changes you more permanently than being given instructions. The surah arrives during the Prophet's darkest moment and offers not instruction but companionship." },
        { item: "No moment where the plan is visible in advance", note: "Neither the characters nor the reader can see where the threads are going. The surah's form enacts its theology: you cannot perceive Al-Latif's work until it is complete." },
        { item: "No cheap consolation", note: "Ya'qub's eyes go white from grief. Yusuf is forgotten in prison for years. The narrative holds the full weight without flinching or rushing to the resolution. What it refuses is the conclusion that the suffering is meaningless." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-Latif — the Subtle One named at fulfillment", type: "surah-specific", articleSlug: "al-latif-subtle-yusuf-12-100" },
    { concept: "The three shirts — deception, evidence, restoration", type: "surah-specific", articleSlug: "three-shirts-yusuf-arc" },
    { concept: "The prison da'wah — tawhid at the lowest point", type: "surah-specific", articleSlug: "prison-dawah-yusuf-12-39" },
    { concept: "Yunus–Hud–Yusuf triptych", type: "cross-surah", articleSlug: "yunus-hud-yusuf-triptych" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "weave", label: "Weave" },
  { id: "shirts", label: "Shirts" },
  { id: "layers", label: "Layers" },
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

function SectionMap({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">111 ayahs — a single sustained narrative from dream to fulfillment</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Chiastic center</div>}
          </div>
        ))}
      </div>
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
        Deception → evidence → restoration → the Name
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
// PAGE SHELL — v3
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Shirts</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />

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
          {activeTab === "weave" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "shirts" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "layers" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
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
