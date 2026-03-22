"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ASH-SHAMS — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ash-shams
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ash-Shams",
  arabicName: "الشَّمْس",
  meaning: "The Sun",
  number: 91,
  ayahCount: 15,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "Eleven cosmic oaths summoned as witnesses, a single verdict on the human soul, and one historical proof that the universe does not bluff — the soul already knows, and what you do with that knowledge is the only question that matters.",
  reflectionUrl: "/surahs/ash-shams",
  readTime: "18 min read",

  heartVerse: {
    arabic: "قَدْ أَفْلَحَ مَن زَكَّاهَا",
    ayahRef: "91:9",
    translation: "He has succeeded — the one who purifies it.",
    why: "Eleven oaths — sun, moon, day, night, sky, earth, soul — were summoned for this single declaration. The entire cosmic architecture exists to give this sentence the weight of the universe behind it. Purification is not an improvement project. It is the fulfillment of what you were made for.",
  },

  audio: { surahNumber: 91, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالشَّمْسِ وَضُحَاهَا", translation: "By the sun and its morning brightness —" },
    { ayah: 2, arabic: "وَالْقَمَرِ إِذَا تَلَاهَا", translation: "and the moon as it follows it —" },
    { ayah: 3, arabic: "وَالنَّهَارِ إِذَا جَلَّاهَا", translation: "and the day as it reveals it —" },
    { ayah: 4, arabic: "وَاللَّيْلِ إِذَا يَغْشَاهَا", translation: "and the night as it covers it —" },
    { ayah: 5, arabic: "وَالسَّمَاءِ وَمَا بَنَاهَا", translation: "and the sky and the One who built it —" },
    { ayah: 6, arabic: "وَالْأَرْضِ وَمَا طَحَاهَا", translation: "and the earth and the One who spread it —" },
    { ayah: 7, arabic: "وَنَفْسٍ وَمَا سَوَّاهَا", translation: "and the soul and the One who proportioned it —" },
    { ayah: 8, arabic: "فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا", translation: "then inspired it with its wickedness and its safeguarding —" },
    { ayah: 9, arabic: "قَدْ أَفْلَحَ مَن زَكَّاهَا", translation: "he has succeeded — the one who purifies it —" },
    { ayah: 10, arabic: "وَقَدْ خَابَ مَن دَسَّاهَا", translation: "and he has failed — the one who buries it." },
    { ayah: 11, arabic: "كَذَّبَتْ ثَمُودُ بِطَغْوَاهَا", translation: "Thamud denied through their transgression —" },
    { ayah: 12, arabic: "إِذِ انبَعَثَ أَشْقَاهَا", translation: "when the most wretched of them rose up —" },
    { ayah: 13, arabic: "فَقَالَ لَهُمْ رَسُولُ اللَّهِ نَاقَةَ اللَّهِ وَسُقْيَاهَا", translation: "and the messenger of Allah said to them: 'The she-camel of Allah — and her drinking turn.'" },
    { ayah: 14, arabic: "فَكَذَّبُوهُ فَعَقَرُوهَا فَدَمْدَمَ عَلَيْهِمْ رَبُّهُم بِذَنبِهِمْ فَسَوَّاهَا", translation: "But they denied him and hamstrung her, so their Lord crushed them for their sin and leveled them." },
    { ayah: 15, arabic: "وَلَا يَخَافُ عُقْبَاهَا", translation: "And He does not fear its consequence." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Courtroom",
      subtitle: "Two halves: cosmic witness → historical proof",
      sections: [
        { ayahs: "1–6", title: "The Cosmic Witnesses", color: "#4ecdc4", desc: "Six oath-pairs at the scale of the universe. Sun and its brightness, moon following, day revealing, night covering, sky built, earth spread. Each element doing exactly what it was made to do. The accumulation is the argument — creation functioning perfectly becomes the standard against which the soul will be measured." },
        { ayahs: "7–8", title: "The Soul's Knowledge", color: "#9b7fd4", desc: "The seventh oath turns inward. After swearing by everything out there, the surah swears by the human soul and the One who proportioned it — then placed inside it the knowledge of both its ruin (fujur) and its protection (taqwa). The soul arrived knowing. This is the surah's theological center." },
        { ayahs: "9–10", title: "The Verdict", color: "#C9A84C", isPivot: true, desc: "What eleven oaths were building toward. He has succeeded — the one who purifies. He has failed — the one who buries. Two verbs: zakkaha (to clear and let grow) and dassaha (to push beneath the ground). Your soul is either a garden being tended or a grave being filled." },
        { ayahs: "11–15", title: "The Precedent: Thamud", color: "#e07a8a", desc: "The surah drops from cosmic oath to desert narrative. Thamud denied, their most wretched rose, the messenger warned, they hamstrung the camel, God leveled them. Five ayahs covering what other surahs tell in dozens. The compression creates inevitability — there was never another outcome." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Concentric structure — the same divine precision that builds is the same that unmakes",
      pairs: [
        {
          left: { label: "Cosmic Pairs", ayahs: "1–6", desc: "External creation doing its appointed work — sun, moon, day, night, sky, earth" },
          right: { label: "Cosmic Consequence", ayahs: "14–15", desc: "God levels Thamud (fa-sawwaha) — the same verb, the same precision that built now unmakes" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Soul Proportioned", ayahs: "7–8", desc: "God proportioned the soul (sawwaha) and placed inside it the knowledge of ruin and rescue" },
          right: { label: "A Soul That Buried Itself", ayahs: "11–13", desc: "Thamud's transgression — the most wretched rose, the warning ignored, the camel hamstrung" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Verdict", ayahs: "9–10",
        desc: "He has succeeded — the one who purifies it. He has failed — the one who buries it.",
        note: "The center of the ring. Everything before it builds the case (creation works, the soul knows). Everything after it provides the evidence (Thamud knew and refused).",
      },
    },
    deductiveFunnel: {
      title: "The Oath Cascade",
      subtitle: "Seven witnesses summoned — each one narrowing from cosmos to conscience",
      layers: [
        { depth: 1, label: "Sun & Moon", ayah: "1–2", arabic: "وَالشَّمْسِ وَضُحَاهَا · وَالْقَمَرِ إِذَا تَلَاهَا", desc: "The largest visible objects in the sky. The sun radiates, the moon follows. Light and its reflection — each element defined by its relationship to the other.", color: "#4ecdc4" },
        { depth: 2, label: "Day & Night", ayah: "3–4", arabic: "وَالنَّهَارِ إِذَا جَلَّاهَا · وَاللَّيْلِ إِذَا يَغْشَاهَا", desc: "From objects to phenomena. Day reveals, night covers. The world alternates between disclosure and concealment — and both are doing their work.", color: "#9b7fd4" },
        { depth: 3, label: "Sky & Earth", ayah: "5–6", arabic: "وَالسَّمَاءِ وَمَا بَنَاهَا · وَالْأَرْضِ وَمَا طَحَاهَا", desc: "From phenomena to architecture. The sky was built, the earth was spread. The shift from 'what it does' to 'Who made it' introduces the Creator's hand.", color: "#e07a8a" },
        { depth: 4, label: "The Soul", ayah: "7–8", arabic: "وَنَفْسٍ وَمَا سَوَّاهَا · فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا", desc: "From the external cosmos to the internal one. The soul was proportioned and pre-loaded with the knowledge of both its corruption and its protection. The deepest oath, the most consequential witness.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of cosmic oaths that delivers its verdict without the usual apparatus",
      absences: [
        { item: "No paradise or hellfire", note: "For a Makki surah of warning, this is striking. No eschatological scene, no resurrection imagery. The punishment is historical and terrestrial — it happened in a specific desert to a specific people. The reward is a single word: aflaha — 'he has succeeded.'" },
        { item: "No direct address to the Prophet", note: "No qul ('say'), no 'O Messenger,' no second-person command. The surah speaks past the Prophet to the human being as such. Its audience is the species." },
        { item: "No repentance offered", note: "No tawba, no moral instruction, no program of reform. The surah offers a single word — zakkaha, purify — and one historical example of what happens when you don't." },
        { item: "No dialogue with Thamud", note: "Five ayahs cover what Al-A'raf tells across dozens of verses. No back-and-forth, no cultural detail, no arguments. The compression is the point — there was never any other outcome." },
        { item: "No softening of the final ayah", note: "'He does not fear its consequence' — la yakhaf 'uqbaha. The surah ends on divine sovereignty stated without cushion. After eleven oaths of cosmic beauty, the closing image is God acting without hesitation." },
      ],
    },
  },

  contentNodes: [
    { concept: "Sawwaha — the verb that builds and unmakes", type: "surah-specific", articleSlug: "sawwaha-proportioned-leveled-91" },
    { concept: "Dassaha — spiritual infanticide and the buried soul", type: "surah-specific", articleSlug: "dassaha-buried-soul-91-10" },
    { concept: "Ash-Shams and Al-Layl — the diagnostic twin", type: "cross-surah", articleSlug: "shams-layl-twin-surahs" },
    { concept: "The oath cascade — Quran's longest unbroken oath sequence", type: "cross-surah", articleSlug: "oath-cascade-91-cosmic-witnesses" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "courtroom", label: "Courtroom" },
  { id: "mirror", label: "Mirror" },
  { id: "cascade", label: "Cascade" },
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
        Cosmos → phenomena → architecture → conscience
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
          {activeTab === "courtroom" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "cascade" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
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
