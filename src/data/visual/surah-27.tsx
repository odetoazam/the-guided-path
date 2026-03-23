"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NAML — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-naml
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Naml",
  arabicName: "النَّمل",
  meaning: "The Ant",
  number: 27,
  ayahCount: 93,
  period: "Makki",
  juz: "19–20",
  movements: 4,
  thesis:
    "A surah that builds the most magnificent kingdom in human history and then names itself after an ant — because the ant could see what the kingdom was for. Power saturated with faith, tested against creatures most kingdoms would never notice.",
  reflectionUrl: "/surahs/an-naml",
  readTime: "22 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"munasabat","english":"Inter-surah Connections"}],
  heartVerse: {
    arabic: "قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ",
    ayahRef: "27:18",
    translation: "An ant said, 'O ants, enter your dwellings so that Sulayman and his armies do not crush you while they do not perceive.'",
    why: "An army of jinn, humans, and birds marching in formation, and one ant stops them. She addresses her community by name, identifies the king, gives tactical instruction, and excuses the army's potential harm — they would do it unknowingly. In a surah filled with palaces, this single sentence names the whole thing.",
  },

  audio: { surahNumber: 27, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "طس ۚ تِلْكَ آيَاتُ الْقُرْآنِ وَكِتَابٍ مُّبِينٍ", translation: "Ta-Sin. These are the verses of the Quran and a clear Book." },
    { ayah: 15, arabic: "وَلَقَدْ آتَيْنَا دَاوُودَ وَسُلَيْمَانَ عِلْمًا", translation: "And We certainly gave Dawud and Sulayman knowledge." },
    { ayah: 18, arabic: "قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ", translation: "An ant said, 'O ants, enter your dwellings.'" },
    { ayah: 19, arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", translation: "My Lord, inspire me to be grateful for Your blessings." },
    { ayah: 30, arabic: "إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ", translation: "Indeed, it is from Sulayman, and indeed it reads: In the name of Allah, the Most Merciful, the Especially Merciful." },
    { ayah: 40, arabic: "أَنَا آتِيكَ بِهِ قَبْلَ أَن يَرْتَدَّ إِلَيْكَ طَرْفُكَ", translation: "I will bring it to you before your glance returns to you." },
    { ayah: 44, arabic: "أَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "I submit with Sulayman to Allah, Lord of all worlds." },
    { ayah: 62, arabic: "أَمَّن يُجِيبُ الْمُضْطَرَّ إِذَا دَعَاهُ", translation: "Is He not better who answers the desperate when they call upon Him?" },
    { ayah: 88, arabic: "وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِيَ تَمُرُّ مَرَّ السَّحَابِ", translation: "And you see the mountains, thinking them rigid, while they pass as the passing of clouds." },
    { ayah: 93, arabic: "وَقُلِ الْحَمْدُ لِلَّهِ سَيُرِيكُمْ آيَاتِهِ فَتَعْرِفُونَهَا", translation: "And say: Praise be to Allah. He will show you His signs and you will recognize them." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Four Movements",
      subtitle: "Encounter → kingdom → rejection → interrogation",
      sections: [
        { ayahs: "1–14", title: "Light & Encounter", color: "#e07a8a", desc: "The Quran arrives as guidance. Musa sees a fire and walks into a divine encounter — nine signs for Pharaoh's people, who reject them 'out of injustice and arrogance' even while recognizing the truth inwardly. The pattern is set: undeniable signs, chosen blindness." },
        { ayahs: "15–44", title: "The Kingdom of Knowledge", color: "#C9A84C", isPivot: true, desc: "Sulayman inherits a kingdom spanning jinn, humans, and birds. The ant speaks with collective concern. The hoopoe delivers theological analysis of Sheba. The letter carries the only interior basmala in the Quran. The throne crosses continents. The Queen arrives at faith through corrected perception in a palace of glass." },
        { ayahs: "45–58", title: "Two Rejections", color: "#9b7fd4", desc: "Salih's Thamud — nine conspirators plotting murder in the dark. Lut's people — desire elevated above sight. The negative image of the Sheba story: where the Queen saw signs and submitted, these communities saw signs and refused. The contrast needs no editorial comment." },
        { ayahs: "59–93", title: "The Creation Interrogation", color: "#4ecdc4", desc: "A cascade of questions — who created, who answers the desperate, who guides through darkness? Five times: 'Is there a god with Allah?' Then the Day of Gathering, the creature that will speak, mountains passing like clouds, and the final command: recite the Quran." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The Quran's guidance at the opening corresponds to its recitation at the close",
      pairs: [
        {
          left: { label: "Quran as Guidance", ayahs: "1–6", desc: "The Quran declared as guidance and good news for those who act on certainty" },
          right: { label: "Quran as Command", ayahs: "91–93", desc: "Recite the Quran — whoever is guided is guided for their own benefit. He will show you His signs." },
          color: "#e07a8a",
        },
        {
          left: { label: "Signs Rejected", ayahs: "7–14", desc: "Musa's nine signs — Pharaoh's people call them sorcery despite recognizing the truth inwardly" },
          right: { label: "Signs Judged", ayahs: "83–86", desc: "On that Day, those who denied Allah's signs are gathered and asked: Did you deny without encompassing them in knowledge?" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Knowledge Given", ayahs: "15–19", desc: "Dawud and Sulayman receive knowledge — language of birds, armies of three species, the ant's perception" },
          right: { label: "Knowledge Displayed", ayahs: "59–75", desc: "The creation questions — gardens, rivers, the desperate answered, darkness navigated. Who does all this?" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Queen's Submission", ayahs: "44",
        desc: "My Lord, I have wronged myself, and I submit with Sulayman to Allah, Lord of all worlds.",
        note: "The surah's emotional and argumentative peak. A queen who arrived at faith through corrected perception — the glass floor revealed that what she saw was not what was real.",
      },
    },
    deductiveFunnel: {
      title: "Three Non-Human Witnesses",
      subtitle: "The surah's three voices from outside the human world — each addressing a failure of human perception",
      layers: [
        { depth: 1, label: "The Ant", ayah: "18", arabic: "لَا يَحْطِمَنَّكُمْ", desc: "Speaks to protect her community from approaching power. She sees the danger no one else sees and speaks with clarity and care. The surah bears her name because she could see what the kingdom was for.", color: "#4ecdc4" },
        { depth: 2, label: "The Hoopoe", ayah: "22–26", arabic: "أَحَطتُ بِمَا لَمْ تُحِطْ بِهِ", desc: "Delivers a theological assessment of Sheba's kingdom that would be sophisticated coming from a human scholar. Identifies sun-worship, names Shaytan as cause, frames it as failure to prostrate. A bird doing theological work.", color: "#9b7fd4" },
        { depth: 3, label: "The Creature", ayah: "82", arabic: "دَابَّةً مِّنَ الْأَرْضِ", desc: "The dabbah that will emerge from the earth at the end of time to indict humanity for refusing to believe. Three voices from outside the human world, escalating in scope: a valley, a kingdom, all of creation.", color: "#e07a8a" },
        { depth: 4, label: "The Pattern", ayah: "93", arabic: "سَيُرِيكُمْ آيَاتِهِ", desc: "He will show you His signs and you will recognize them. The natural world sees what humans refuse to see — and one day, the earth itself will testify.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "An-Naml persuades through spectacle — what it leaves out shapes the argument",
      absences: [
        { item: "No extended punishment scene", note: "Salih's and Lut's destructions are compressed into retrospective summary. The narrative energy, the dialogue and suspense — all reserved for a story that ends in conversion, not destruction. The Queen's submission is center stage; violence is offstage." },
        { item: "No legal instruction", note: "No community regulation, no rules for daily life, no dietary laws. The surah is doing something different from warning or legislating — it is displaying. The argument emerges from the display itself." },
        { item: "No direct address to the Quraysh", note: "The surah builds a portrait of power so much greater, so much more aligned with reality, that Qurayshi prestige shrinks by comparison without ever being named." },
        { item: "The only interior basmala in the Quran", note: "The formula that frames every surah appears inside Sulayman's letter to the Queen (ayah 30). A king's correspondence carries the same opening as divine revelation — the ordinary becomes extraordinary." },
        { item: "Named after an insect that appears for one ayah", note: "In a surah filled with kingdoms, palaces, and jinn who move thrones, Allah names the whole thing after the smallest voice in the room — the one who stopped an army with a sentence of concern." },
      ],
    },
  },

  contentNodes: [
    { concept: "The ant's speech — perception and community", type: "surah-specific", articleSlug: "ant-speech-perception-27-18" },
    { concept: "The Queen's glass floor — corrected perception as faith", type: "surah-specific", articleSlug: "queen-sheba-glass-palace-27-44" },
    { concept: "The interior basmala — Sulayman's letter", type: "cross-surah", articleSlug: "interior-basmala-27-30" },
    { concept: "The Ta-Sin cluster — Ash-Shu'ara, An-Naml, Al-Qasas", type: "cross-surah", articleSlug: "ta-sin-cluster-26-27-28" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Movements" },
  { id: "mirror", label: "Mirror" },
  { id: "witnesses", label: "Witnesses" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED
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
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>
          {playing ? "\u23F8" : "\u25B6"}
        </button>
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

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic} <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}>
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
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Valley → kingdom → all of creation → recognition
      </div>
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
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

        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "witnesses" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
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
