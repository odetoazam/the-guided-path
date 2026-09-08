"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FATH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-fath
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Fath",
  arabicName: "الفَتْح",
  meaning: "The Victory",
  number: 48,
  ayahCount: 29,
  period: "Madani",
  juz: 26,
  movements: 4,
  thesis:
    "A surah that holds a grieving community in its hands, turns their face toward what they cannot see, and says: the seed is already in the ground — trust the ground.",
  reflectionUrl: "/surahs/al-fath",
  readTime: "22 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ",
    ayahRef: "48:18",
    translation: "Allah was certainly pleased with the believers when they pledged allegiance to you beneath the tree.",
    why: "The surah's center of gravity. Allah's pleasure is stated in the past tense — accomplished, definitive, rooted in a specific moment at a specific place. In the very moment they felt most defeated, Allah was most pleased with them. The entire surah pivots on this declaration.",
  },

  audio: { surahNumber: 48, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Unfolding",
      subtitle: "Four movements: victory announced → cowards exposed → the tree → the seed",
      sections: [
        { ayahs: "1-10", title: "The Victory Announced", color: "#C9A84C", desc: "Allah declares that what looked like defeat at Hudaybiyyah was a clear victory. Forgiveness, completion of blessing, guidance, divine aid, the descent of sakinah into the hearts of the believers, and the armies of heaven and earth. The pledge is lifted to the theological: those who pledge to the Prophet pledge to Allah. The hand of Allah is over their hands." },
        { ayahs: "11-17", title: "The Ones Who Stayed Behind", color: "#e07a8a", desc: "The Bedouin who refused to join the journey are exposed. Their excuse: possessions and families. The truth: they assumed the Prophet and believers would never return. Their sin was a failure of imagination about Allah. A future test is offered — and the blind, lame, and sick are exempted with quiet precision." },
        { ayahs: "18-26", title: "The Tree", color: "#9b7fd4", isPivot: true, desc: "Allah was pleased with the believers when they pledged beneath the tree. Sakinah descends for the second time. The near victory, the promised spoils, the restrained hands at Mecca. The disbelievers' hamiyyah — blind zealotry — met by the believers' sakinah and the word of taqwa. Three appearances of sakinah trace an arc from faith to devotion to moral discipline." },
        { ayahs: "27-29", title: "The Seed", color: "#4ecdc4", desc: "The Prophet's dream of entering the Sacred Mosque is confirmed as true. The religion of truth will prevail. The community is portrayed like a seed that sends forth its shoot, strengthens, grows thick, and stands firm on its stem — delighting the sowers. The surah ends by showing the world what invisible victory looks like when it finally breaks ground." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah opens with a victory no one can see and closes with a community everyone can see",
      pairs: [
        {
          left: { label: "The Fath Announced", ayahs: "1-3", desc: "A clear victory declared — forgiveness, completion of favor, guidance, divine aid" },
          right: { label: "The Fath Fulfilled", ayahs: "27-29", desc: "The dream confirmed as true, the religion of truth to prevail, the community as a growing seed" },
          color: "#C9A84C",
        },
        {
          left: { label: "Sakinah & Armies", ayahs: "4-7", desc: "Tranquility sent down, armies of heaven and earth, evil assumptions of the hypocrites" },
          right: { label: "Sakinah & Taqwa", ayahs: "20-26", desc: "Promised gains, hands restrained at Mecca, sakinah against hamiyyah, the word of taqwa" },
          color: "#9b7fd4",
        },
        {
          left: { label: "The Prophet's Mission", ayahs: "8-10", desc: "Witness, bearer of good tidings, warner. The pledge as a pledge to Allah — His hand above theirs" },
          right: { label: "The Mukhallafun", ayahs: "11-17", desc: "Those who stayed behind — tongues separated from hearts, the evil assumption, the future test" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Tree", ayahs: "18-19",
        desc: "Allah was certainly pleased with the believers when they pledged beneath the tree. He knew what was in their hearts, and He sent down tranquility upon them.",
        note: "The center of gravity: divine pleasure stated as accomplished fact, rooted in a specific moment. Everything before builds toward it. Everything after radiates from it.",
      },
    },
    deductiveFunnel: {
      title: "The Three Descents of Sakinah",
      subtitle: "Each appearance carries more weight than the last",
      layers: [
        { depth: 1, label: "Faith", ayah: "4", arabic: "أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ", desc: "Sakinah descends into the hearts of the believers so they increase in faith. A general gift — the calm that comes when you accept terms you do not understand. The first answer: to confusion.", color: "#4ecdc4" },
        { depth: 2, label: "Devotion", ayah: "18", arabic: "فَأَنزَلَ السَّكِينَةَ عَلَيْهِمْ", desc: "Sakinah descends upon the specific believers under the specific tree, after Allah declares His pleasure. The calm of covenantal intimacy — not just believing, but being known by God and found worthy. The second answer: to self-doubt.", color: "#9b7fd4" },
        { depth: 3, label: "Discipline", ayah: "26", arabic: "فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ", desc: "Sakinah descends as the disbelievers burn with hamiyyah — blind zealotry. It holds the believers to the word of taqwa, preventing righteous rage from becoming reckless violence. The third answer: to rage.", color: "#C9A84C" },
        { depth: 4, label: "The Arc", ayah: "4→26", arabic: "السَّكِينَة", desc: "From theological calm to covenantal grace to moral power. Each descent answers a different need: confusion, self-doubt, rage. By the third, sakinah is no longer comfort — it is the force that keeps the believing heart from matching the world's violence with its own.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that consoles, explains, and reframes — but never legislates",
      absences: [
        { item: "No direct moral instruction", note: "No commands to pray, fast, give charity, or observe any ritual. The surah dearer to the Prophet than anything under the sun does not legislate. It consoles, explains, and reframes. The entire architecture is devoted to opening the eyes before moving the hands." },
        { item: "No extended prophetic narrative", note: "No story of a previous messenger, no dramatic arc, no dialogue with a rejecting people. The community does not need a mirror from history. It needs someone to tell it what just happened." },
        { item: "No battle description", note: "Despite being revealed in the aftermath of a military confrontation, not a single ayah describes fighting. The restraint of hands — both theirs and the Quraysh's — is attributed directly to Allah. The surah's victory is not on a battlefield." },
        { item: "No eschatological detail", note: "No Day of Judgment scene, no trumpet, no scales, no detailed reckoning. Paradise is mentioned briefly (ayah 5) but not described. The surah's horizon is not the afterlife — it is the next two years of history, and the seed that will grow from them." },
        { item: "No rebuke of the believers", note: "Unlike Surah Muhammad (47), which diagnoses the community's internal disease, Al-Fath does not rebuke those who came. It rebukes only those who stayed behind. The believers who walked to Hudaybiyyah receive nothing but praise, reassurance, and divine pleasure." },
      ],
    },
  },

  contentNodes: [
    { concept: "Sakinah — the threefold descent of tranquility", type: "surah-specific", articleSlug: "sakinah-threefold-48" },
    { concept: "The Bay'ah ar-Ridwan — pledging to Allah under a tree", type: "surah-specific", articleSlug: "bayah-ridwan-48-18" },
    { concept: "Muhammad-Fath diptych: question and answer", type: "cross-surah", articleSlug: "muhammad-fath-diptych" },
    { concept: "Fath and Nasr — the promise and its fulfillment", type: "cross-surah", articleSlug: "fath-nasr-victory-pair" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Unfolding" },
  { id: "ring", label: "Ring" },
  { id: "sakinah", label: "Sakinah" },
  { id: "absent", label: "Absences" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">&#x06DE;</span>
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

  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "\u23F8" : "\u25B6"}</button>
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
        <div className="text-sm font-semibold text-gold-500 font-serif">{"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div>
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
        Confusion {"\u2192"} self-doubt {"\u2192"} rage {"\u2192"} moral power
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
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} {"\u00B7"} {d.period} {"\u00B7"} Juz {d.juz}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">3</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Sakinah</div></div>
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "sakinah" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
