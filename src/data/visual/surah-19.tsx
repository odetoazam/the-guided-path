"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH MARYAM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/maryam
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Maryam",
  arabicName: "مَرْيَم",
  meaning: "Mary",
  number: 19,
  ayahCount: 98,
  period: "Makki",
  juz: 16,
  movements: 6,
  thesis:
    "A gallery of impossible things — an old man given a son, a virgin given a child, a newborn who speaks — narrated in a voice so quiet and so certain that by the end you are not asking whether they happened but why you ever doubted that they could.",
  reflectionUrl: "/surahs/maryam",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا",
    ayahRef: "19:23",
    translation: "I wish I had died before this and been completely forgotten.",
    why: "The most emotionally exposed moment in the surah. Maryam, alone under a palm tree in labor, wishes for double erasure — forgotten, and the memory of the forgetting itself forgotten. The Quran preserves the words of a woman wishing to be erased, and in preserving them refuses the erasure she asked for.",
  },

  audio: { surahNumber: 19, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "Six Rooms",
      subtitle: "Prayer → miracle → speaking child → gallery → rupture → declaration",
      sections: [
        { ayahs: "1–15", title: "The Room of Prayer", color: "#4ecdc4", desc: "An old man whose bones have gone soft and whose hair has caught fire with age calls out in a whisper — nida'an khafiyya. God answers with an unprecedented child: Yahya. A word used nowhere else in the Quran — hanan, a mother's warmth — is given to this boy alone." },
        { ayahs: "16–21", title: "The Annunciation", color: "#9b7fd4", desc: "Maryam withdraws eastward, puts a screen between herself and the world, and encounters a spirit in the form of a man. Her first instinct is taqwa — she invokes the Most Merciful as a shield. The same divine formula given to Zakariyya returns with a single change: rabbuka becomes rabbuki. Same logic, same ease, different gender." },
        { ayahs: "22–40", title: "The Palm Tree and the Cradle", color: "#e07a8a", isPivot: true, desc: "Maryam in labor, alone, wishing for annihilation. Then water, dates, and a command to be silent. Her child speaks from the cradle — and his first word is 'abd, servant. The theological correction begins from the first syllable." },
        { ayahs: "41–57", title: "The Gallery of Prophets", color: "#C9A84C", desc: "Ibrahim and his father — ya abati four times, tenderness persisting through rejection. Musa called to the mountain and drawn near as a confidant. Ismail true to his promise. Idris raised high. Each portrait a single brushstroke, each prophet shown in a moment of isolation." },
        { ayahs: "58–87", title: "The Rupture", color: "#f28585", desc: "The turning point — ayah 58, the verse of prostration. Then the trapdoor opens: after the prophets came a generation that lost the prayer. Two processions emerge — the God-conscious gathered as a delegation, the sinful driven to Hell in thirst." },
        { ayahs: "88–98", title: "The Declaration", color: "#7ec8e3", desc: "The heavens almost shatter at the claim that God has a son. The creation itself recoils. Then the counter-truth: every being comes to the Most Merciful as a servant. He has counted them all. And for those who believe — sa-yaj'alu lahumu-l-rahmanu wudda — He will place love." },
      ],
    },
    chiasticRing: {
      title: "The Whisper and the Silence",
      subtitle: "The surah opens with a secret prayer and closes with the absence of even a whisper",
      pairs: [
        {
          left: { label: "The Whisper", ayahs: "3", desc: "Zakariyya calls his Lord nida'an khafiyya — with a secret call in the dark. The quiet of prayer." },
          right: { label: "The Silence", ayahs: "98", desc: "Do you perceive a single one of them? Or hear even the faintest sound — rikz? The quiet of obliteration." },
          color: "#4ecdc4",
        },
        {
          left: { label: "It Is Easy — rabbuka", ayahs: "9", desc: "Zakariyya asks how. The answer: it is easy for Me. Masculine address — rabbuka." },
          right: { label: "It Is Easy — rabbuki", ayahs: "21", desc: "Maryam asks how. The identical answer with one change: feminine address — rabbuki." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Peace Received", ayahs: "15", desc: "Yahya's peace — spoken about him by God, in the third person: wa salamun 'alayhi." },
          right: { label: "Peace Claimed", ayahs: "33", desc: "Isa's peace — spoken by him from the cradle, in the first person: wa-l-salamu 'alayya." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Prostration", ayahs: "58",
        desc: "When the verses of the Most Merciful were recited to them, they fell in prostration and in tears.",
        note: "The hinge of the surah. Everything before it builds the prophetic record. Everything after asks: what did you do with that record?",
      },
    },
    deductiveFunnel: {
      title: "Seven Uses of Rahma",
      subtitle: "The word mercy and its root thread through the surah like a pulse",
      layers: [
        { depth: 1, label: "The Opening", ayah: "2", arabic: "ذِكْرُ رَحْمَتِ رَبِّكَ", desc: "The surah's first substantive word after the letters: dhikru rahmati rabbika — a mention of the mercy of your Lord. Mercy is the frame before anything begins.", color: "#4ecdc4" },
        { depth: 2, label: "Yahya's Gift", ayah: "13", arabic: "وَحَنَانًا مِّن لَّدُنَّا", desc: "Hanan — tenderness, a pang of love — given from Us. A word that appears exactly once in the entire Quran, placed here and nowhere else.", color: "#9b7fd4" },
        { depth: 3, label: "Isa as Mercy", ayah: "21", arabic: "وَرَحْمَةً مِّنَّا", desc: "The child himself is described as a mercy from Us — not merely the recipient of mercy but its embodiment for humanity.", color: "#e07a8a" },
        { depth: 4, label: "Ibrahim's Gift", ayah: "50", arabic: "وَوَهَبْنَا لَهُم مِّن رَّحْمَتِنَا", desc: "We gave them of Our mercy — Ibrahim, Ishaq, Yaqub. Mercy extends through the prophetic line as inheritance.", color: "#C9A84C" },
        { depth: 5, label: "Harun as Mercy", ayah: "53", arabic: "مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ", desc: "We gave him, out of Our mercy, his brother Harun. A person given as mercy — companionship itself as divine gift.", color: "#f28585" },
        { depth: 6, label: "The Prostration", ayah: "58", arabic: "آيَاتُ الرَّحْمَٰنِ", desc: "When the verses of al-Rahman were recited, they fell in prostration. The divine name itself — the Most Merciful — saturates the surah's most pivotal verse.", color: "#7ec8e3" },
        { depth: 7, label: "Love Placed", ayah: "96", arabic: "سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا", desc: "The Most Merciful will place love for them — sa-yaj'alu. Actively. Deliberately. Love as a gift set down by God, not earned by the servant.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah trusts the portrait more than the prescription — every absence is a choice",
      absences: [
        { item: "No legal commands", note: "No ethical imperatives, no 'O you who believe,' no instructions about fasting, charity, or prayer. The moral weight is carried entirely by the stories and the contrast between the prophets and those who came after them." },
        { item: "No use of the word Masih", note: "The most extensive account of Isa outside Al Imran — and the surah never once calls him Christ or Messiah. The choice is deliberate: to show Isa as servant, prophet, child, son, before any title enters the room." },
        { item: "No answer to Ibrahim's prayer", note: "Ibrahim promises to ask forgiveness for his idolatrous father. The surah records no response. The love persists even when the request cannot be fulfilled — and in the silence, something about the nature of loving someone who will not turn around becomes visible." },
        { item: "No direct polemic", note: "The correction of the claim about Isa is embedded in the story, not mounted on top of it. Twelve ayahs of portrait before the theological point arrives. The sequencing is the surah's rhetorical genius." },
        { item: "No rikz — only once in the Quran", note: "The final word — rikz, the faintest possible sound — appears nowhere else in all 114 surahs. The surah gave this word to its ending alone, sealing itself with the silence of erased civilizations." },
      ],
    },
  },

  contentNodes: [
    { concept: "The hanan hapax — tenderness used once in the Quran", type: "surah-specific", articleSlug: "hanan-hapax-maryam-13" },
    { concept: "Rabbuka to rabbuki — the mirror formula", type: "surah-specific", articleSlug: "rabbuka-rabbuki-mirror-19" },
    { concept: "Maryam-Kahf-TaHa triptych — survival, mercy, commission", type: "cross-surah", articleSlug: "kahf-maryam-taha-triptych" },
    { concept: "Nasyan mansiyya — the doubled erasure Maryam wished for", type: "surah-specific", articleSlug: "nasyan-mansiyya-19-23" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "rooms", label: "Rooms" },
  { id: "mirror", label: "Mirror" },
  { id: "mercy", label: "Mercy" },
  { id: "absent", label: "Absences" },
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
          {playing ? "⏸" : "▶"}
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
              marginLeft: `${layer.depth * 4}px`,
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
        Opening mercy → unique tenderness → embodied mercy → inherited mercy → companionship as mercy → prostration → love placed
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
          {activeTab === "rooms" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "mercy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
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
