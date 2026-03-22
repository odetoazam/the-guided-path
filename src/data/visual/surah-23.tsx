"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MU'MINUN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-muminun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mu'minun",
  arabicName: "المُؤمِنون",
  meaning: "The Believers",
  number: 23,
  ayahCount: 118,
  period: "Makki",
  juz: 18,
  movements: 4,
  thesis:
    "A surah that tells you the verdict first — the believers have already succeeded — then spends 118 ayahs building the case until the only honest response left is the prayer it places on your lips at the end.",
  reflectionUrl: "/surahs/al-muminun",
  readTime: "25 min read",

  heartVerse: {
    arabic: "ثُمَّ أَنشَأْنَاهُ خَلْقًا آخَرَ ۚ فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
    ayahRef: "23:14",
    translation: "Then We produced it as another creation entirely. So blessed is Allah, the best of creators.",
    why: "The phrase khalqan akhar marks a moment of genuine ontological wonder. What emerges from the embryonic stages is not just a more developed version of what came before — it is something new. The exclamation fa-tabaraka Allah is placed at the point where evidence tips into awe.",
  },

  audio: { surahNumber: 23, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", translation: "The believers have already succeeded —" },
    { ayah: 2, arabic: "الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ", translation: "those who are humble in their prayer," },
    { ayah: 3, arabic: "وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ", translation: "and those who turn away from idle speech," },
    { ayah: 4, arabic: "وَالَّذِينَ هُمْ لِلزَّكَاةِ فَاعِلُونَ", translation: "and those who give the purifying alms," },
    { ayah: 10, arabic: "أُولَٰئِكَ هُمُ الْوَارِثُونَ", translation: "Those are the inheritors —" },
    { ayah: 11, arabic: "الَّذِينَ يَرِثُونَ الْفِرْدَوْسَ هُمْ فِيهَا خَالِدُونَ", translation: "who will inherit al-Firdaus. They will abide therein eternally." },
    { ayah: 12, arabic: "وَلَقَدْ خَلَقْنَا الْإِنسَانَ مِن سُلَالَةٍ مِّن طِينٍ", translation: "And We created the human being from an extract of clay." },
    { ayah: 14, arabic: "ثُمَّ أَنشَأْنَاهُ خَلْقًا آخَرَ ۚ فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ", translation: "Then We produced it as another creation. So blessed is Allah, the best of creators." },
    { ayah: 53, arabic: "فَتَقَطَّعُوا أَمْرَهُم بَيْنَهُمْ زُبُرًا ۖ كُلُّ حِزْبٍ بِمَا لَدَيْهِمْ فَرِحُونَ", translation: "But they tore their affair into pieces among themselves, each faction rejoicing in what it had." },
    { ayah: 84, arabic: "قُلْ لِّمَنِ الْأَرْضُ وَمَن فِيهَا إِن كُنتُمْ تَعْلَمُونَ", translation: "Say: To whom belongs the earth and whoever is in it, if you should know?" },
    { ayah: 85, arabic: "سَيَقُولُونَ لِلَّهِ ۚ قُلْ أَفَلَا تَذَكَّرُونَ", translation: "They will say: 'To Allah.' Say: 'Then will you not remember?'" },
    { ayah: 88, arabic: "قُلْ مَن بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَهُوَ يُجِيرُ وَلَا يُجَارُ عَلَيْهِ إِن كُنتُمْ تَعْلَمُونَ", translation: "Say: In whose hand is the realm of all things — and He protects while none can protect against Him — if you should know?" },
    { ayah: 89, arabic: "سَيَقُولُونَ لِلَّهِ ۚ قُلْ فَأَنَّىٰ تُسْحَرُونَ", translation: "They will say: 'Allah's.' Say: 'Then how are you deluded?'" },
    { ayah: 99, arabic: "حَتَّىٰ إِذَا جَاءَ أَحَدَهُمُ الْمَوْتُ قَالَ رَبِّ ارْجِعُونِ", translation: "Until, when death comes to one of them, he says: 'My Lord, send me back.'" },
    { ayah: 102, arabic: "فَمَن ثَقُلَتْ مَوَازِينُهُ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", translation: "Those whose scales are heavy — it is they who are the successful." },
    { ayah: 117, arabic: "إِنَّهُ لَا يُفْلِحُ الْكَافِرُونَ", translation: "Indeed, the disbelievers will not succeed." },
    { ayah: 118, arabic: "وَقُل رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ", translation: "And say: My Lord, forgive and have mercy, and You are the best of the merciful." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Case",
      subtitle: "Four arcs: portrait → evidence → confrontation → reckoning",
      sections: [
        { ayahs: "1–11", title: "The Portrait", color: "#C9A84C", isPivot: true, desc: "Seven qualities of the believer, ascending from inner humility in prayer through avoiding what is vain, giving zakat, guarding private life, honoring trusts — then returning to prayer. The list opens and closes with salah. Everything between is what the container holds. The verdict: they are the inheritors of al-Firdaus." },
        { ayahs: "12–50", title: "The Evidence", color: "#4ecdc4", desc: "Signs in creation from the embryo outward — dust, fluid, clot, flesh, then khalqan akhar, another creation entirely. The lens pulls to sky, water, gardens, livestock, ships. Then a rapid procession of prophets: Nuh, Musa and Harun, 'Isa and his mother — each carrying the same structural beat: a messenger arrives, the people reject." },
        { ayahs: "51–92", title: "The Confrontation", color: "#e07a8a", desc: "The message was always one, but people tore it into factions, each rejoicing in what it had. Then the triple question sequence (84–89): three times the audience is asked who owns and governs everything, three times they answer 'Allah,' and three escalating follow-ups — will you not remember? will you not fear? how are you deluded? Correct knowledge coexisting with contradictory living." },
        { ayahs: "93–118", title: "The Reckoning", color: "#9b7fd4", desc: "The deathbed plea: 'My Lord, send me back.' The answer: kalla. Then the scales — muflihun, from the same root as the surah's opening aflaha. The mirror inversion: the disbelievers will not succeed. And the final word is not triumph but a prayer placed on the Prophet's lips: Rabbi ighfir warham." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "Qad aflaha al-mu'minun opens the surah; laa yuflih al-kafirun closes it — same root, opposite verdicts",
      pairs: [
        {
          left: { label: "Already Succeeded", ayahs: "1", desc: "Qad aflaha al-mu'minun — the believers have already succeeded. Perfect tense. Settled before the qualities are named." },
          right: { label: "Will Not Succeed", ayahs: "117", desc: "Innahu laa yuflih al-kafiroon — the disbelievers will not succeed. Same root f-l-h. Photographic negative." },
          color: "#C9A84C",
        },
        {
          left: { label: "Seven Qualities", ayahs: "2–9", desc: "Humility in prayer, turning from laghw, zakat, guarding private life, honoring trusts — framed by salah" },
          right: { label: "Heavy Scales", ayahs: "102", desc: "Those whose scales are heavy are the muflihun — the successful. Same root completing the circle." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Signs in Creation", ayahs: "12–22", desc: "From embryo to sky to earth — the most intimate evidence expanding outward concentrically" },
          right: { label: "Triple Question", ayahs: "84–89", desc: "Who owns the earth? The heavens? All things? 'Allah.' Then how are you deluded?" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Fracture", ayahs: "53",
        desc: "They tore their affair into pieces — each faction rejoicing in what it had.",
        note: "The message was always one. The division came from human hands. This is the hinge: everything before it presents the unified truth; everything after confronts the fragmented response.",
      },
    },
    deductiveFunnel: {
      title: "The Escalation",
      subtitle: "The triple question sequence — three correct answers, three deepening challenges",
      layers: [
        { depth: 1, label: "Ownership of the Earth", ayah: "84–85", arabic: "لِّمَنِ الْأَرْضُ وَمَن فِيهَا", desc: "To whom belongs the earth and whoever is in it? They answer: to Allah. The follow-up: then will you not remember? Tatadhakkarun — the gentlest challenge. A nudge.", color: "#4ecdc4" },
        { depth: 2, label: "Lord of the Heavens", ayah: "86–87", arabic: "مَن رَّبُّ السَّمَاوَاتِ السَّبْعِ", desc: "Who is Lord of the seven heavens and Lord of the Great Throne? They answer: Allah's. The follow-up: then will you not fear Him? Tattaqun — the challenge sharpens into warning.", color: "#9b7fd4" },
        { depth: 3, label: "Realm of All Things", ayah: "88–89", arabic: "مَن بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ", desc: "In whose hand is the realm of all things — He protects, none can protect against Him? They answer: Allah's. The follow-up: then how are you deluded? Tu'sahoon — passive voice. Not 'why do you delude yourselves' but 'how are you being deluded?' Forces beyond the individual.", color: "#e07a8a" },
        { depth: 4, label: "The Verdict", ayah: "90", arabic: "بَلْ أَتَيْنَاهُم بِالْحَقِّ وَإِنَّهُمْ لَكَاذِبُونَ", desc: "We have brought them the truth, and indeed they are liars. After three correct answers, the gap between their words and their lives is named as a lie. Evidence becomes indictment.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The architecture implies that the case itself is the consolation",
      absences: [
        { item: "No legal rulings in 118 ayahs", note: "For a surah of this length, that absence is a design choice. Al-Mu'minun is a surah of demonstration, not instruction. It builds a case rather than issues directives." },
        { item: "No extended prophetic narratives", note: "Prophets appear in compressed, skeletal strokes — each carrying the same structural beat: messenger arrives, people reject, consequence falls. The pattern is the point, not the drama." },
        { item: "No consolation for the believers", note: "The surah opens by declaring them successful and immediately moves to evidence. Once you see creation, history, and consequence clearly, you will not need to be comforted. You will need only to act." },
        { item: "No commands to the Prophet until the end", note: "The few imperatives — the qul commands in the triple question sequence — are instruments of cross-examination, not legislation. The surah's voice is prosecutorial, not pastoral." },
        { item: "No triumph in the closing", note: "After 118 ayahs of mounting evidence and unanswerable argument, the surah does not close with victory. It closes on its knees: Rabbi ighfir warham — My Lord, forgive and have mercy." },
      ],
    },
  },

  contentNodes: [
    { concept: "Qad aflaha — the f-l-h root and what it means to succeed", type: "surah-specific", articleSlug: "qad-aflaha-success-root-23" },
    { concept: "Khalqan akhar — the moment something new emerges", type: "surah-specific", articleSlug: "khalqan-akhar-23-14" },
    { concept: "The triple question sequence and passive-voice delusion", type: "cross-surah", articleSlug: "triple-question-tusahoon-23-84-89" },
    { concept: "Khushi' in prayer — the root image of softened earth", type: "cross-surah", articleSlug: "khushu-prayer-softened-earth" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "case", label: "Case" },
  { id: "mirror", label: "Mirror" },
  { id: "escalation", label: "Escalation" },
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
        Remember → fear → how are you deluded? → verdict
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
          {activeTab === "case" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "escalation" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
