"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-BURUJ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-buruj
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Buruj",
  arabicName: "البُروج",
  meaning: "The Constellations",
  number: 85,
  ayahCount: 22,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "A twenty-two-ayah surah that watches believers die in a trench of fire and answers not with rescue but with the stars, the Throne, the name al-Wadud, and an eternal Tablet — holding divine love and divine severity in the same breath without flinching from either.",
  reflectionUrl: "/surahs/al-buruj",
  readTime: "18 min read",

  heartVerse: {
    arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ",
    ayahRef: "85:14",
    translation: "And He is the Forgiving, the Loving.",
    why: "In a surah about believers burned alive, the declaration that God is al-Wadud — the one whose love actively moves toward its object — lands with devastating force. The love is not softness. It is the love of one who watched His servants die in fire and holds their place in gardens.",
  },

  audio: { surahNumber: 85, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالسَّمَاءِ ذَاتِ الْبُرُوجِ", translation: "By the sky containing great constellations —" },
    { ayah: 2, arabic: "وَالْيَوْمِ الْمَوْعُودِ", translation: "and by the promised Day —" },
    { ayah: 3, arabic: "وَشَاهِدٍ وَمَشْهُودٍ", translation: "and by the witness and the witnessed —" },
    { ayah: 4, arabic: "قُتِلَ أَصْحَابُ الْأُخْدُودِ", translation: "Cursed were the companions of the trench —" },
    { ayah: 5, arabic: "النَّارِ ذَاتِ الْوَقُودِ", translation: "the fire full of fuel —" },
    { ayah: 6, arabic: "إِذْ هُمْ عَلَيْهَا قُعُودٌ", translation: "when they sat by it —" },
    { ayah: 7, arabic: "وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ", translation: "and they, over what they were doing to the believers, were witnesses." },
    { ayah: 8, arabic: "وَمَا نَقَمُوا مِنْهُمْ إِلَّا أَن يُؤْمِنُوا بِاللَّهِ الْعَزِيزِ الْحَمِيدِ", translation: "And they resented them for no reason other than that they believed in God, the Almighty, the Praiseworthy —" },
    { ayah: 9, arabic: "الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ", translation: "to whom belongs the dominion of the heavens and the earth. And God is witness over all things." },
    { ayah: 10, arabic: "إِنَّ الَّذِينَ فَتَنُوا الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ثُمَّ لَمْ يَتُوبُوا فَلَهُمْ عَذَابُ جَهَنَّمَ وَلَهُمْ عَذَابُ الْحَرِيقِ", translation: "Those who persecuted the believing men and women, then did not repent — for them is the punishment of Hell, and the punishment of the Burning." },
    { ayah: 11, arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۚ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ", translation: "Those who believed and did righteous deeds — for them are gardens beneath which rivers flow. That is the great triumph." },
    { ayah: 12, arabic: "إِنَّ بَطْشَ رَبِّكَ لَشَدِيدٌ", translation: "Indeed, the assault of your Lord is severe." },
    { ayah: 13, arabic: "إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ", translation: "Indeed, it is He who originates and repeats." },
    { ayah: 14, arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ", translation: "And He is the Forgiving, the Loving." },
    { ayah: 15, arabic: "ذُو الْعَرْشِ الْمَجِيدُ", translation: "Possessor of the Throne, the Glorious —" },
    { ayah: 16, arabic: "فَعَّالٌ لِّمَا يُرِيدُ", translation: "Effecter of what He intends." },
    { ayah: 17, arabic: "هَلْ أَتَاكَ حَدِيثُ الْجُنُودِ", translation: "Has there reached you the story of the forces?" },
    { ayah: 18, arabic: "فِرْعَوْنَ وَثَمُودَ", translation: "Pharaoh and Thamud." },
    { ayah: 19, arabic: "بَلِ الَّذِينَ كَفَرُوا فِي تَكْذِيبٍ", translation: "Yet the disbelievers are in persistent denial —" },
    { ayah: 20, arabic: "وَاللَّهُ مِن وَرَائِهِم مُّحِيطٌ", translation: "while God, from behind them, encompasses them entirely." },
    { ayah: 21, arabic: "بَلْ هُوَ قُرْآنٌ مَّجِيدٌ", translation: "Rather, this is a glorious Quran —" },
    { ayah: 22, arabic: "فِي لَوْحٍ مَّحْفُوظٍ", translation: "in a Preserved Tablet." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Vertical Ascent",
      subtitle: "Five movements: oath → trench → warning → attributes → Tablet",
      sections: [
        { ayahs: "1–3", title: "The Cosmic Oath", color: "#4ecdc4", desc: "The sky with its constellations, the promised Day, the witness and the witnessed. The surah assembles its courtroom at the highest possible vantage point. The root sh-h-d — to witness, to testify — appears at the threshold and governs everything that follows." },
        { ayahs: "4–9", title: "The Trench", color: "#e07a8a", desc: "Believers burned alive for no reason other than faith. The horror is not in the flames but in the posture of the persecutors: they sat and watched. The root sh-h-d returns — they were witnesses to their own crime. Their spectatorship becomes their testimony." },
        { ayahs: "10–11", title: "The Warning & Promise", color: "#9b7fd4", desc: "Fire answered by water. The persecutors receive Hell and the Burning. The believers receive gardens with flowing rivers. But the door of repentance remains open — thumma lam yatubu, 'then did not repent.' Even after burning believers alive, the door is not shut." },
        { ayahs: "12–16", title: "The Divine Attributes", color: "#C9A84C", isPivot: true, desc: "Severity, then creative power, then — unexpectedly — love. Al-Wadud, among God's most intimate names. In a surah about believers burned alive, the declaration of divine love lands with particular force. Then the Throne. Then the keystone: fa''alun lima yurid — He does whatever He wills." },
        { ayahs: "17–22", title: "The Ascent to the Tablet", color: "#4ecdc4", desc: "Pharaoh and Thamud — two names, no elaboration, a lineage of organized persecution that ends in destruction. Then the final altitude: the Preserved Tablet, where these words were written before the trench was dug. The persecutors could destroy bodies. They could not touch the Tablet." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing pair forms one of the Quran's most striking architectural arcs",
      pairs: [
        {
          left: { label: "The Constellated Sky", ayahs: "1–3", desc: "The physical heavens — visible, enormous, sworn by as witnesses to what follows" },
          right: { label: "The Preserved Tablet", ayahs: "21–22", desc: "The metaphysical heavens — invisible, eternal, the origin of this very Quran beyond time" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Trench", ayahs: "4–9", desc: "Organized persecution — believers burned for faith. The crime and its witnesses named." },
          right: { label: "Pharaoh & Thamud", ayahs: "17–18", desc: "The historical lineage — organized forces that opposed God's people and were annihilated." },
          color: "#e07a8a",
        },
        {
          left: { label: "Warning & Promise", ayahs: "10–11", desc: "Hell for persecutors who do not repent. Gardens for believers. Fire answered by water." },
          right: { label: "Deniers Encompassed", ayahs: "19–20", desc: "They think they advance. God is already behind them, encompassing. They are inside something they cannot see." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Divine Attributes", ayahs: "12–16",
        desc: "Severity. Origination. Love. The Throne. Whatever He wills.",
        note: "The theological core from which everything radiates. The hinge between the human plane and the cosmic plane. Al-Wadud at the center of a surah about unanswered suffering.",
      },
    },
    deductiveFunnel: {
      title: "The Triangle of Witness",
      subtitle: "The root sh-h-d (to witness) appears three times — each occurrence reshapes its meaning",
      layers: [
        { depth: 1, label: "Cosmic Witness", ayah: "3", arabic: "وَشَاهِدٍ وَمَشْهُودٍ", desc: "The witness and the witnessed — cosmic, unnamed, sworn by at the surah's threshold. The courtroom is being assembled. Whether the witness is the Day, the Prophet, or the angels, the structural function is clear: something is about to be testified to.", color: "#4ecdc4" },
        { depth: 2, label: "Criminal Witness", ayah: "7", arabic: "وَهُمْ عَلَىٰ مَا يَفْعَلُونَ بِالْمُؤْمِنِينَ شُهُودٌ", desc: "The persecutors as witnesses to their own crime. They sat by the trench and watched. The same word that opens a courtroom now produces the evidence. They saw what they did. They cannot claim ignorance.", color: "#e07a8a" },
        { depth: 3, label: "Divine Witness", ayah: "9", arabic: "وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ", desc: "God Himself is the final witness. The root completes its arc: cosmic witness, criminal witness, divine witness. The triangle holds the surah's argument together. Witnessing is the central concern — who sees, who is accountable, who holds the final testimony.", color: "#C9A84C" },
        { depth: 4, label: "The Record", ayah: "22", arabic: "فِي لَوْحٍ مَّحْفُوظٍ", desc: "The Preserved Tablet — where the witnessing is made permanent. The testimony is not oral. It is inscribed in something no force can alter. The word mahfuz — preserved, guarded — is the final answer to the trench.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences are its theology — what it does not say shapes what it means",
      absences: [
        { item: "No rescue", note: "Most Quranic persecution narratives end with divine intervention — the sea parts, the fire becomes cool, the army drowns. In al-Buruj, the believers burn. The absence of rescue is the presence of a different kind of divine response: justice delayed, not justice denied." },
        { item: "No named prophet, king, or place", note: "The trench narrative has no specifics. It is persecution stripped to its archetype — applicable to every era, every trench, every fire lit because someone believed." },
        { item: "No extended dialogue", note: "The surah does not try to persuade the persecutors. It curses them, warns them, and moves on. The rhetorical posture is judicial, not pedagogical — a verdict, not a lesson." },
        { item: "No legislative instruction", note: "No halal, no haram, no behavioral code. The surah operates in pure theology: witness, sovereignty, love, record. It has one question and one answer — who holds power, and where is the record kept." },
        { item: "No resolution of the tension", note: "Al-Wadud appears in the same surah where believers burn without rescue. The surah holds divine love and divine silence together without resolving the contradiction — and in that holding, offers something more durable than comfort." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-Wadud — divine love in a surah of fire", type: "surah-specific", articleSlug: "al-wadud-love-fire-85" },
    { concept: "Al-Lawh al-Mahfuz — the Preserved Tablet", type: "surah-specific", articleSlug: "lawh-mahfuz-preserved-tablet-85" },
    { concept: "Buruj-Inshiqaq pair — the sky that obeys and the sky that testifies", type: "cross-surah", articleSlug: "buruj-inshiqaq-sky-pair" },
    { concept: "Shahid — the triangle of witness across the surah", type: "cross-surah", articleSlug: "shahid-witness-triangle-85" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ascent", label: "Ascent" },
  { id: "ring", label: "Ring" },
  { id: "witness", label: "Witness" },
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
          {playing ? "\u23F8" : "\u25B6"}
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
            <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
        Cosmic witness → criminal witness → divine witness → eternal record
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Witnesses</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />

        {/* -- Tab bar ------------------------------------------------------ */}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "ascent" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "witness" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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

        {/* -- Go Deeper --------------------------------------------------- */}
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
