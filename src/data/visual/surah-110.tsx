"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NASR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-nasr
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "An-Nasr",
  arabicName: "النصر",
  meaning: "The Divine Help",
  number: 110,
  ayahCount: 3,
  period: "Madani",
  juz: 30,
  movements: 3,
  thesis:
    "An-Nasr is the surah that teaches you what to do at the top of the mountain — not to plant a flag, but to bow. A farewell disguised as victory, its three ayahs compress the proper response to every human achievement: glorify the One who gave it, and prepare to return.",
  reflectionUrl: "/surahs/an-nasr",
  readTime: "14 min read",

  sciencesActive: [{"key":"sarf","english":"Morphology"},{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
    ayahRef: "110:3",
    translation:
      "Then glorify with the praise of your Lord, and seek His forgiveness. Indeed, He has always been the Accepter of repentance.",
    why: "The command that made the companions weep. At the pinnacle of victory, the Prophet is told to seek forgiveness. The entire surah builds the largest possible human achievement and turns all of it inward toward two imperatives that could be performed in silence.",
    articleAnchor: "#the-interior-response",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 110,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text (micro surah — displayed above tabs) ──────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
      ayahRef: "110:1",
      translation: "When the help of Allah comes, and the opening.",
    },
    {
      ayah: 2,
      arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
      ayahRef: "110:2",
      translation:
        "And you see the people entering the religion of Allah in crowds.",
    },
    {
      ayah: 3,
      arabic:
        "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
      ayahRef: "110:3",
      translation:
        "Then glorify with the praise of your Lord, and seek His forgiveness. Indeed, He has always been the Accepter of repentance.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — the funnel from cosmic to interior
    sectionJourney: {
      title: "The Funnel",
      subtitle: "Three movements: cosmic intervention → communal response → interior return",
      sections: [
        {
          ayahs: "1",
          title: "The Divine Intervention",
          color: "#4ecdc4",
          desc: "God acting in history. Two nouns define the event: nasr (divine help, rescue) and fath (opening what was sealed). The subject is God alone — the Prophet and his companions are not mentioned as agents. They are recipients. The verb ja'a treats this world-historical event as something that simply comes. Like rain. Like morning.",
        },
        {
          ayahs: "2",
          title: "The Human Consequence",
          color: "#9b7fd4",
          desc: "The Prophet positioned as spectator of what God is doing. The people enter din Allah in waves — afwajan, a tidal image. The verb is present tense: yadkhuluna, they are entering. Not a completed event but a reality unfolding before his eyes. Where once they came one by one, at great cost, now they surge like the sea.",
        },
        {
          ayahs: "3",
          title: "The Interior Response",
          color: "#e0a848",
          isPivot: true,
          desc: "The fa is consequential: therefore, in response to all of this. Twenty-three years of persecution, exile, warfare, community-building — compressed into a subordinate clause. The main clause, what the surah actually commands, is two words: fasabbih and istaghfir. Glorify. Seek forgiveness. Everything else is context for those imperatives.",
        },
      ],
    },

    // 2. Absence Map — what An-Nasr deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "The quietest surah of triumph ever written — every absence is a design choice",
      absences: [
        {
          item: "No naming of the defeated",
          note: "The Quraysh who persecuted the Muslims for two decades are never mentioned. The victory has no losers in this surah — only God giving and humanity entering.",
        },
        {
          item: "No description of battle or conquest",
          note: "The opening of Makkah — the most significant military event in Islamic history — receives no narrative. No army, no march, no gates swinging open. Just: the opening came.",
        },
        {
          item: "No celebration or listing of favors",
          note: "No catalogue of what was won. No recounting of hardships now vindicated. The moment the world would expect a victory speech, the surah turns inward to glorification and forgiveness.",
        },
        {
          item: "No mention of Makkah by name",
          note: "The city whose opening this surah commemorates is never named. The fath is unnamed, unclaimed, unpossessed. It belongs to God alone.",
        },
        {
          item: "No mention of the believers",
          note: "No 'O you who believe,' no companions praised, no community addressed. The surah strips the moment until only one man stands before his Lord at the peak of his mission.",
        },
      ],
    },

    // 3. Opening-Closing Echo (Bookends)
    openingClosing: {
      title: "The Bookends",
      subtitle: "How the surah's first and last words frame the entire prophetic arc",
      pairs: [
        {
          left: {
            label: "Nasr Allah",
            ayahs: "1",
            desc: "God's help — the giving of victory. Divine intervention in history on behalf of one who could not prevail alone.",
          },
          right: {
            label: "Tawwab",
            ayahs: "3",
            desc: "The Accepter of return — the receiving back. God's permanently open door for those who turn toward Him.",
          },
          color: "#d4a853",
        },
        {
          left: {
            label: "Al-Fath",
            ayahs: "1",
            desc: "The opening of a city — historical, temporal. Gates that swing open in a specific year, in a specific desert.",
          },
          right: {
            label: "Istighfar",
            ayahs: "3",
            desc: "The opening of return — eternal, permanent. The gate between creature and Creator that never closes.",
          },
          color: "#9b7fd4",
        },
        {
          left: {
            label: "Al-Hamd (Fatiha 1:2)",
            ayahs: "First revelation",
            desc: "The Quran opens: all praise belongs to God. A declaration given to humanity.",
          },
          right: {
            label: "Tasbih bi-hamd (110:3)",
            ayahs: "Last surah",
            desc: "The Quran closes by commanding praise be returned. The revelation is a circle: it opens with God's praise and closes by sending it back.",
          },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Prophetic Arc",
        ayahs: "1–3",
        desc: "God helped him, the mission succeeded, and now God receives him back",
        note: "The first word of substance is about God giving. The last word is about God receiving. The Prophet is held between these two divine gestures — the giving of victory and the receiving of return.",
      },
    },

    // 4. Word Anatomy — key roots unpacked
    wordAnatomy: {
      title: "The Weight of Words",
      subtitle: "Twenty-one words in Arabic — each one carrying centuries",
      elements: [
        {
          label: "Nasr",
          ayah: "1",
          desc: "From a root meaning to aid someone against their opponent. Carries the sense of rescue, of intervention on behalf of one who could not prevail alone. The victory belongs to God, not the army.",
          color: "#4ecdc4",
        },
        {
          label: "Fath",
          ayah: "1",
          desc: "To open what was closed — a gate, a lock, a sealed heart. Together with nasr: God intervened, and what had been sealed shut was opened.",
          color: "#9b7fd4",
        },
        {
          label: "Afwajan",
          ayah: "2",
          desc: "From f-w-j: a group that moves together — a wave, a surge. The image is tidal. Where once people entered Islam individually at great cost, now they come in waves that cannot be counted.",
          color: "#e0a848",
        },
        {
          label: "Istighfar",
          ayah: "3",
          desc: "The root gh-f-r means to cover, to shield, to protect from consequence. Asking God to cover you — to shield you from the gap between what you owe Him and what you have given.",
          color: "#e07a8a",
        },
        {
          label: "Tawwab",
          ayah: "3",
          desc: "The intensive form (fa''al) — not an occasional quality but God's nature. He keeps turning toward those who turn toward Him. And kana places this outside of time: He was tawwab before the conquest. He will be tawwab after the Prophet is gone.",
          color: "#4dbb9b",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Victory and istighfar — why the Quran pairs triumph with repentance",
      type: "cross-surah",
      searchIntent: "why seek forgiveness after victory Quran theology",
      articleSlug: "victory-and-istighfar-quran",
      diagramRef: "sectionJourney",
    },
    {
      concept: "An-Nasr and Al-Kawthar as a matched pair — loss and triumph",
      type: "cross-surah",
      searchIntent: "surah kawthar nasr pair consolation triumph",
      articleSlug: "kawthar-nasr-pair-loss-triumph",
      diagramRef: "openingClosing",
    },
    {
      concept: "The Quran's farewell register — how the last surahs signal departure",
      type: "cross-surah",
      searchIntent: "last surahs revealed quran farewell departure",
      articleSlug: "quran-farewell-register-last-surahs",
      diagramRef: "absenceMap",
    },
    {
      concept: "Fath as theological concept — the openings God creates",
      type: "surah-specific",
      searchIntent: "fath opening conquest quran meaning",
      articleSlug: "fath-opening-quran-theology",
      diagramRef: "wordAnatomy",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "funnel", label: "Funnel" },
  { id: "bookends", label: "Bookends" },
  { id: "words", label: "Words" },
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
              <span className="text-xs text-cream-muted/50 font-sans">Ayah {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ The main clause</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function OpeningClosing({ data }: { data: typeof SURAH_DATA.diagrams.openingClosing }) {
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

function WordAnatomy({ data }: { data: typeof SURAH_DATA.diagrams.wordAnatomy }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.elements.map((el, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? el.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: el.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: el.color }}>{el.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{el.ayah}</span>
            </div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{el.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        3 ayahs · 21 words · The last complete surah revealed
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
          {activeTab === "funnel" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "bookends" && <OpeningClosing data={d.diagrams.openingClosing} />}
          {activeTab === "words" && <WordAnatomy data={d.diagrams.wordAnatomy} />}
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
