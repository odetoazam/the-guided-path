"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-A'RAF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-araf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-A'raf",
  arabicName: "الأعراف",
  meaning: "The Heights",
  number: 7,
  ayahCount: 206,
  period: "Makki",
  juz: "8–9",
  movements: 4,
  thesis:
    "A 206-ayah history of the human species told from above — from the first refusal in the unseen world through seven prophetic witnesses to the primordial covenant that preceded them all — ending in a single prostration that says what the soul said before time.",
  reflectionUrl: "/surahs/al-araf",
  readTime: "30 min read",

  heartVerse: {
    arabic: "وَإِذْ أَخَذَ رَبُّكَ مِن بَنِي آدَمَ مِن ظُهُورِهِمْ ذُرِّيَّتَهُمْ وَأَشْهَدَهُمْ عَلَىٰ أَنفُسِهِمْ أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا بَلَىٰ ۛ شَهِدْنَا",
    ayahRef: "7:172",
    translation: "And when your Lord took from the children of Adam, from their loins, their descendants, and made them testify concerning themselves: 'Am I not your Lord?' They said: 'Yes, we testify.'",
    why: "The most metaphysically dense ayah in the surah. Every human soul has already answered yes. Every act of disbelief is not an encounter with a new claim but a forgetting of an old one. The entire historical panorama — every prophet, every refusal — was an elaboration of what happens when that yes is forgotten.",
  },

  audio: { surahNumber: 7, reciter: "ar.alafasy" },

  fullText: "section-map",

  sectionMap: [
    { ayahs: "1–10", title: "The Letters and the First Address", desc: "The disconnected letters, the address to the Prophet and humanity, and the courtroom framing of the Day of Judgment." },
    { ayahs: "11–25", title: "The Adam Narrative", desc: "The first story — creation, Iblis's refusal, the seduction, the fall, the clothing that covers and the clothing that does not." },
    { ayahs: "26–58", title: "The Address Between Stories", desc: "Warnings to the Children of Adam, the people of the Heights standing between Paradise and Hell, and the weighing of deeds." },
    { ayahs: "59–64", title: "Nuh and His People", desc: "The prototype: the message delivered, the accusation of error, the flood. Six ayahs — compressed because four more witnesses will follow." },
    { ayahs: "65–72", title: "Hud and 'Ad", desc: "The argument from ancestral tradition appears. 'Ad destroyed — their root cut completely, nothing left to regrow." },
    { ayahs: "73–79", title: "Salih and Thamud", desc: "The she-camel as a test of restraint. Thamud cannot leave it alone. Salih's farewell: 'You do not love advisers.'" },
    { ayahs: "80–84", title: "Lut and His People", desc: "The briefest story. The sin named plainly. The righteous threatened with expulsion for their purity." },
    { ayahs: "85–93", title: "Shu'ayb and Madyan", desc: "The prophet of economic justice. Commercial cheating, the demand to conform or face exile, and a prophet's grief for those who chose their own destruction." },
    { ayahs: "103–137", title: "Musa vs. Pharaoh", desc: "The confrontation, the sorcerers' instantaneous faith, the nine signs, and Pharaoh's claim that belief requires his authorization." },
    { ayahs: "138–162", title: "After Liberation", desc: "The golden calf, Musa's rage, Harun's defense, the seventy seized by earthquake, and Musa's prayer of theological vertigo." },
    { ayahs: "163–174", title: "The Sabbath-Breakers and the Covenant", desc: "The obligation to speak truth even when unheard, and the primordial covenant that preceded all of history." },
    { ayahs: "175–206", title: "The Closing Address", desc: "The man who shed God's signs like snakeskin, the final warnings, and the surah's last instruction: prostrate." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Testimony",
      subtitle: "Four movements: primordial drama → prophetic witnesses → the Musa narrative → cosmic frame",
      sections: [
        { ayahs: "1–58", title: "The Primordial Drama", color: "#4ecdc4", desc: "The surah opens before the beginning — Adam's creation, Iblis's refusal from material pride, the seduction in the garden, the fall, and the clothing of taqwa. Then the people of the Heights: figures standing between Paradise and Hell, belonging to neither destination yet. A space that resists the binary of saved and damned." },
        { ayahs: "59–102", title: "The Prophetic Sequence", color: "#9b7fd4", desc: "Five prophets in rapid succession — Nuh, Hud, Salih, Lut, Shu'ayb — each sent with the same message, each rejected by the same human logic. The repetition is the architecture. By the fifth telling, the listener understands: this is not an isolated event. This is the pattern of civilization encountering truth." },
        { ayahs: "103–174", title: "The Musa Narrative", color: "#C9A84C", isPivot: true, desc: "Over seventy ayahs — the surah's center of gravity. What makes this telling unique: the emphasis falls after liberation. The golden calf, the seventy seized by earthquake, Musa's theological vertigo, and the question that precedes all history: 'Am I not your Lord?'" },
        { ayahs: "175–206", title: "The Cosmic Frame", color: "#e07a8a", desc: "The surah pulls back to address the deepest questions — the man who shed God's signs like snakeskin, the Hour whose knowledge belongs only to God, and a closing that lands on prostration. After 206 ayahs of history, the last instruction is physical: put your body on the earth." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's opening and closing form a precise inversion — fall and return",
      pairs: [
        {
          left: { label: "Shaytan's Assault", ayahs: "11–25", desc: "Iblis's refusal from pride, his four-directional vow against humanity, and the seduction that stripped Adam's covering" },
          right: { label: "The Defense", ayahs: "200–206", desc: "Seek refuge in God from Shaytan's whisper, remember God humbly, and prostrate — the instrument the opening showed was needed" },
          color: "#e07a8a",
        },
        {
          left: { label: "The A'raf — Between Worlds", ayahs: "46–49", desc: "Figures standing between Paradise and Hell, recognized by both, belonging to neither — judgment contains dimensions binary thinking cannot map" },
          right: { label: "The Primordial Covenant", ayahs: "172–174", desc: "Before birth, before memory, every soul testified: 'Yes, You are our Lord.' Both scenes exist outside ordinary time; both ask where you stand" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Adam's Loss", ayahs: "19–22", desc: "The garden, the tree, the stripping of garments — closeness to God lost through a whisper performed as friendship" },
          right: { label: "The Man Who Shed", ayahs: "175–176", desc: "The man given God's signs who stripped himself of them like a snake shedding skin — closeness to God lost through choice" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "Musa's Prayer", ayahs: "155",
        desc: "My Lord, if You had willed, You could have destroyed them before — and me as well. It is only Your trial.",
        note: "The moment the public drama of prophets and nations gives way to the private drama of a single human being standing before God with a question he cannot answer alone.",
      },
    },
    deductiveFunnel: {
      title: "The Seven Witnesses",
      subtitle: "Each prophet adds a layer to the surah's case — the same story, told until you recognize your face in it",
      layers: [
        { depth: 1, label: "Nuh — The Pattern", ayah: "59–64", arabic: "اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ", desc: "The message in its clearest form. Worship God — you have no other deity. The prototype for every prophet who follows. The response: 'You are in clear error.' Six ayahs. The surah has four more witnesses to call.", color: "#4ecdc4" },
        { depth: 2, label: "Hud — Ancestral Tradition", ayah: "65–72", arabic: "أَجِئْتَنَا لِنَعْبُدَ اللَّهَ وَحْدَهُ وَنَذَرَ مَا كَانَ يَعْبُدُ آبَاؤُنَا", desc: "The argument from inherited identity: 'Shall we leave what our fathers worshipped?' The truth is rejected not because it is unbelievable but because it threatens what has always been.", color: "#3d9bd4" },
        { depth: 3, label: "Salih — Restraint", ayah: "73–79", arabic: "فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ", desc: "The she-camel as a test: can you leave something alone? Thamud cannot. Salih's farewell breaks the pattern — 'You do not love advisers.' The failure is relational.", color: "#9b7fd4" },
        { depth: 4, label: "Lut — Expelled Purity", ayah: "80–84", arabic: "أَخْرِجُوا آلَ لُوطٍ مِّن قَرْيَتِكُمْ ۖ إِنَّهُمْ أُنَاسٌ يَتَطَهَّرُونَ", desc: "The briefest story, the most direct sin. His people try to expel him — the accusation is purity itself. They are offended by someone who insists on boundaries.", color: "#e07a8a" },
        { depth: 5, label: "Shu'ayb — Economic Justice", ayah: "85–93", arabic: "أَوْفُوا الْكَيْلَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ", desc: "The prophet of fair trade: give full measure and weight. His people offer a choice — assimilation or exile. The earthquake takes Madyan. Shu'ayb's grief: 'How should I grieve for a people who disbelieve?'", color: "#C9A84C" },
        { depth: 6, label: "Musa — After Liberation", ayah: "103–174", arabic: "اجْعَل لَّنَا إِلَٰهًا كَمَا لَهُمْ آلِهَةٌ", desc: "The longest witness. What makes it unique: the emphasis falls after the exodus. A people liberated from Pharaoh immediately ask for an idol. The desire to return to what is familiar — even when what is familiar was slavery.", color: "#e07a8a" },
        { depth: 7, label: "The Covenant — Before History", ayah: "172", arabic: "أَلَسْتُ بِرَبِّكُمْ ۖ قَالُوا بَلَىٰ", desc: "Behind all of history, the moment before it. Every soul testified yes. The prophets were not bringing news — they were triggering memory. The refusal to listen was, in every case, a refusal to remember.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences are as deliberate as its speech — every absence shapes the argument",
      absences: [
        { item: "No legislation", note: "For 206 ayahs — one of the Quran's longest surahs — there is almost no law. No inheritance codes, no dietary rules, no ritual instruction beyond the closing command to remember God. The voice stays entirely in the mode of narration and address." },
        { item: "No angelic intermediaries", note: "No angels acting as intermediaries in the way they appear in Madani surahs. The drama is stripped to its essential actors: God, Iblis, prophets, and peoples." },
        { item: "No resolution for the people of the Heights", note: "The surah is named after them — figures standing between Paradise and Hell — and never resolves their fate. In a book of decisive verdicts, their existence introduces a space that resists binary. The Quran lets them stand there." },
        { item: "No comfort for the Prophet", note: "The surah opens by acknowledging tightness in the Prophet's chest and then proceeds to deliver 206 ayahs of accumulated testimony that only increases the weight. There is no extended consolation, no praise. The prophets in the surah's stories are all members of the communities that reject them." },
        { item: "No explanation for Iblis's reprieve", note: "Iblis asks for reprieve until the Day of Resurrection and receives it. God does not explain why the request is granted. The arrangement is permitted to stand, and the weight of that silence carries across 190 ayahs of human history." },
      ],
    },
  },

  contentNodes: [
    { concept: "The people of the A'raf — the space between verdicts", type: "surah-specific", articleSlug: "araf-heights-between-worlds-7" },
    { concept: "Iblis's syllogism and the architecture of pride", type: "surah-specific", articleSlug: "iblis-pride-syllogism-7-12" },
    { concept: "The primordial covenant — alastu bi-rabbikum", type: "cross-surah", articleSlug: "primordial-covenant-7-172" },
    { concept: "Al-An'am / Al-A'raf diptych — theology meets testimony", type: "cross-surah", articleSlug: "anam-araf-diptych-6-7" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "testimony", label: "Testimony" },
  { id: "mirror", label: "Mirror" },
  { id: "witnesses", label: "Witnesses" },
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

function SectionMapText({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">206 ayahs across 12 movements — tap any section for its scope</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gold-500 font-serif">{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Center of gravity</div>}
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
        Pattern → tradition → restraint → expulsion → injustice → liberation → covenant
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
              <div className="text-2xl font-bold text-gold-500 font-serif">7</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Witnesses</div>
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
          {activeTab === "testimony" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "witnesses" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMapText sections={d.sectionMap} />
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
