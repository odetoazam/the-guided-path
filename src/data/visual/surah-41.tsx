"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH FUSSILAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/fussilat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Fussilat",
  arabicName: "فُصِّلَت",
  meaning: "Explained in Detail",
  number: 41,
  ayahCount: 54,
  period: "Makki",
  juz: "24–25",
  movements: 4,
  thesis:
    "A fifty-four-ayah confrontation that systematically closes every exit — language, cosmos, history, the human body itself — until the only distance remaining between the listener and God is the distance the listener insists on maintaining.",
  reflectionUrl: "/surahs/fussilat",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
    ayahRef: "41:34",
    translation: "Good and evil are not equal. Repel evil with what is better, and the one between whom and you there was enmity will become as though he were a devoted friend.",
    why: "In a surah built around confrontation and refusal, the prescription is not louder speech or greater force — it is beauty. The word ahsan means more beautiful, more excellent. The surah redefines what confrontation with falsehood requires: not matching hostility, but disarming it.",
  },

  audio: { surahNumber: 41, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Elimination of Distance",
      subtitle: "Four movements: declaration \u2192 cosmos \u2192 body \u2192 final challenge",
      sections: [
        { ayahs: "1\u20138", title: "The Declaration", color: "#4ecdc4", desc: "The Quran announces itself as a book whose verses have been explained in detail, in Arabic, for a people who know. The Prophet delivers the simplest possible message: your god is one God. The Quraysh respond by describing their own sealed condition with clinical accuracy \u2014 wrapped hearts, deaf ears, a veil between them and the messenger." },
        { ayahs: "9\u201218", title: "The Cosmos as Argument", color: "#9b7fd4", desc: "The surah pulls the camera to the widest frame: the creation of the heavens and earth. The heavens and earth are asked to come, willingly or unwillingly. They answer: we come willingly. The cosmos submitted. Then the ruins of Ad and Thamud \u2014 nations that heard the same call and chose blindness over guidance." },
        { ayahs: "19\u201232", title: "The Testimony of Skin", color: "#e07a8a", isPivot: true, desc: "The structural center. On the Day of Judgment, human hearing, eyes, and skin testify against their owners. The condemned ask their own bodies: why? The answer is theological in a single sentence. Then the pivot \u2014 the angels descend on those who said 'Our Lord is Allah' and remained steadfast. From exposure to embrace." },
        { ayahs: "33\u201254", title: "The Final Challenge", color: "#C9A84C", desc: "The ethics of the messenger: repel evil with what is more beautiful. The cosmic signs as a test of worship. The Quran as an unbreachable fortress. The hypothetical of a foreign Quran that closes every exit. And the final question: is it not enough that your Lord is witness over all things?" },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's chiastic architecture places the testimony of skin at its center",
      pairs: [
        {
          left: { label: "Clear Arabic Revelation", ayahs: "1\u20134", desc: "The Quran declares itself as fussilat \u2014 explained in detail, in Arabic. Most turn away and do not hear." },
          right: { label: "Arabic Revelation Defended", ayahs: "40\u201354", desc: "The Quran as a mighty book falsehood cannot approach. Had it been foreign, they would have demanded clarity. The final challenge: if it is from God?" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Sealed Hearts", ayahs: "5\u20138", desc: "Wrapped hearts, deaf ears, a veil between. The Prophet's spare declaration: your god is one God." },
          right: { label: "The Messenger's Ethics", ayahs: "33\u201336", desc: "Who is better in speech than one who calls to Allah? Repel evil with what is more beautiful. Seek refuge from Satan's provocation." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Cosmic Submission", ayahs: "9\u201312", desc: "The heavens and earth say 'we come willingly' \u2014 creation as dialogue, the cosmos choosing obedience." },
          right: { label: "Angelic Descent", ayahs: "30\u201232", desc: "The angels descend on the steadfast: we are your allies. A welcome from One who is Forgiving, Merciful." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Body Speaks", ayahs: "19\u201325",
        desc: "Hearing, eyes, and skin testify against their owners. The condemned ask: why did you testify against us? The skin answers: Allah made us speak.",
        note: "The organs that were supposedly sealed turn out to have been witnesses the entire time. The surah's deepest argument about knowledge \u2014 the body was listening even when the will refused.",
      },
    },
    deductiveFunnel: {
      title: "The Closing of Every Exit",
      subtitle: "Each section eliminates one more escape route until the only distance left is chosen",
      layers: [
        { depth: 1, label: "Language", ayah: "3", arabic: "فُصِّلَتْ آيَاتُهُ قُرْآنًا عَرَبِيًّا", desc: "It is in your own language. Every verse has been separated, made distinct, explained in detail. The root f-s-l carries the image of joints being distinguished. If you turn away, the fault is not in the message.", color: "#4ecdc4" },
        { depth: 2, label: "Cosmos", ayah: "11", arabic: "ائْتِيَا طَوْعًا أَوْ كَرْهًا قَالَتَا أَتَيْنَا طَائِعِينَ", desc: "The heavens and earth obeyed willingly. The creation narrative is transformed from chronicle to testimony \u2014 the cosmos submitted, the Quraysh will not. The God who built with this care does not speak carelessly.", color: "#9b7fd4" },
        { depth: 3, label: "Body", ayah: "20\u201321", arabic: "شَهِدَ عَلَيْهِمْ سَمْعُهُمْ وَأَبْصَارُهُمْ وَجُلُودُهُم", desc: "Even the body itself testifies. The organs they thought were sealed were keeping the record all along. Their own skin will speak against them. The assumption of privacy where there was none \u2014 wrong theology as fire.", color: "#e07a8a" },
        { depth: 4, label: "Encompassment", ayah: "54", arabic: "أَلَا إِنَّهُ بِكُلِّ شَيْءٍ مُّحِيطٌ", desc: "He encompasses all things. The final word. The people in doubt imagine they have escaped. The surah's last image is of a God from whom nothing escapes at all. The only remaining distance is chosen.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silence on certain topics is itself a form of argument",
      absences: [
        { item: "No extended legal instruction", note: "No commands about prayer, fasting, charity, or community regulation. The surah is entirely devoted to whether revelation itself will be received. Before any command can land, the question of whether you will listen must be settled." },
        { item: "No prophetic narrative", note: "Ad and Thamud appear as compressed warnings, not stories. No Musa at the sea, no Ibrahim and the fire, no Nuh and the flood. The surah is not interested in what happened to past communities. It is interested in why they refused \u2014 and whether you will refuse the same way." },
        { item: "No intermediary", note: "Where the preceding surah (Ghafir) gave the community a believing man from Pharaoh's court who argued on behalf of faith, Fussilat has no such intermediary. The Prophet stands alone, and the Quran itself does the arguing." },
        { item: "No claim the response will be easy", note: "Ayah 35 says directly: only those with immense inner fortune are granted the capacity to respond to hostility with beauty. The surah does not pretend that hearing the truth is sufficient \u2014 acting on it requires something most people do not have." },
        { item: "No escape from the question", note: "The surah does not give the listener a comfortable way to remain undecided. Its final question \u2014 'if it is from God and you disbelieve in it, who is more astray?' \u2014 demands a position. Neutrality is not on offer." },
      ],
    },
  },

  contentNodes: [
    { concept: "The testimony of skin \u2014 the body as witness on Judgment Day", type: "surah-specific", articleSlug: "testimony-skin-41-20" },
    { concept: "Repel with what is ahsan \u2014 beauty as counter-strategy", type: "surah-specific", articleSlug: "repel-ahsan-41-34" },
    { concept: "Ha Mim family \u2014 revelation and resistance across surahs 40\u201346", type: "cross-surah", articleSlug: "ha-mim-family-40-46" },
    { concept: "Cosmic submission \u2014 the heavens and earth as willing obedients", type: "cross-surah", articleSlug: "cosmic-submission-41-11" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "funnel", label: "Exits" },
  { id: "absent", label: "Absences" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">&#x2726; Structural pivot</div>}
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
          &#x2726; {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
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
        Language &#x2192; cosmos &#x2192; body &#x2192; encompassment
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">&#x2205; {a.item}</div>
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
            Surah {d.number} &middot; {d.period} &middot; Juz {d.juz}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        {/* -- Go Deeper ---------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} &middot; The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
