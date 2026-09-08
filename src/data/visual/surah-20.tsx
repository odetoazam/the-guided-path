"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH TA-HA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ta-ha
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ta-Ha",
  arabicName: "طه",
  meaning: "Ta-Ha",
  number: 20,
  ayahCount: 135,
  period: "Makki",
  juz: 16,
  movements: 5,
  thesis:
    "The Quran's most intimate portrait of what it costs to be chosen — told through a prophet under pressure, a community that forgot, and the quiet certainty that suffering comes not from carrying the truth but from turning away from it.",
  reflectionUrl: "/surahs/ta-ha",
  readTime: "30 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "مَا أَنزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَىٰ",
    ayahRef: "20:2",
    translation: "We did not send down the Quran to you so that you would suffer.",
    why: "The first substantive statement after the opening letters. Allah pauses to console the man carrying the message — to say, in effect, I see what this is costing you. The word tashqa (to suffer) frames the entire surah, returning at ayah 124 to reveal that the true source of suffering is forgetting, not the mission itself.",
  },

  audio: { surahNumber: 20, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Arc",
      subtitle: "Consolation → commissioning → confrontation → calf → covenant → counsel",
      sections: [
        { ayahs: "1–8", title: "The Consolation", color: "#4ecdc4", desc: "Two letters, then the most tender opening in the Quran: We did not send the Quran to you so you would suffer. The word tashqa frames the entire surah. The God who is about to send Musa into impossible danger first identifies Himself through His names — and the claim is that those names are husna, the most beautiful." },
        { ayahs: "9–40", title: "The Burning Bush", color: "#9b7fd4", desc: "Musa sees fire, walks toward it, hears his name called, is told to remove his sandals. The commissioning — 'establish prayer for My remembrance' — compresses the surah's entire theology into one phrase: li-dhikri. Then the staff, the shining hand, and the most beloved du'a in the tradition: Rabbish-rahli sadri." },
        { ayahs: "41–76", title: "The Confrontation", color: "#e07a8a", isPivot: true, desc: "Speak to him with gentle speech — qawlan layyina — even Pharaoh is to be addressed with gentleness. The sorcerers arrive as Pharaoh's champions and leave as martyrs, their transformation the surah's clearest example of what happens when remembrance breaks through." },
        { ayahs: "77–98", title: "The Golden Calf", color: "#C9A84C", desc: "The sea crossing in a single ayah. Then twenty-one ayahs on the calf — because liberation does not guarantee faithfulness. Al-Samiri claims private spiritual insight, builds a counterfeit, and receives permanent exile: 'Your lot is to say, Do not touch me.' The question for every reader: if they forgot that quickly, what makes you certain you would not?" },
        { ayahs: "99–127", title: "Judgment and Adam", color: "#f28585", desc: "Adam forgot — nasiya — the first covenant. The Israelites forgot an entire history of miracles. The surah maps the same human failure at increasing scale. But the remedy persists: whoever follows My guidance will neither go astray nor suffer. And whoever turns away from My remembrance — ma'ishatan danka — a constricted life." },
        { ayahs: "128–135", title: "The Return", color: "#7ec8e3", desc: "The surah circles home — directly to Muhammad. Fill the edges of your days with glorification. Do not extend your eyes toward what others have been given — it is the flower of worldly life. Your Lord's provision is better and more lasting. Everyone is waiting — so wait." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Remembrance",
      subtitle: "The surah opens with suffering reframed and closes with the source of suffering named",
      pairs: [
        {
          left: { label: "Not to Suffer", ayahs: "2", desc: "Ma anzalna 'alaykal-Qur'ana li-tashqa — the Quran was not sent to make you suffer. The word tashqa opens the frame." },
          right: { label: "The Constricted Life", ayahs: "123–124", desc: "Whoever follows My guidance — la yadillu wa la yashqa. Whoever turns away — ma'ishatan danka. The root sh-q-w returns to reveal suffering's true source." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Musa's Du'a", ayahs: "25–28", desc: "Rabbish-rahli sadri — expand my chest, ease my task, untie my tongue. The capacity to speak." },
          right: { label: "Muhammad's Du'a", ayahs: "114", desc: "Rabbi zidni 'ilma — My Lord, increase me in knowledge. The capacity to understand. Two prophetic prayers framing the surah's narrative arc." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Musa's Story", ayahs: "9–98", desc: "The longest prophetic biography in the surah — bush, signs, Pharaoh, sea, calf. A prophet's full arc." },
          right: { label: "Adam's Story", ayahs: "115–127", desc: "The compressed mirror — covenant, forgetting, fall, renewed guidance. Individual forgetting to communal forgetting." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Pivot", ayahs: "83",
        desc: "And what made you hasten ahead of your people, O Musa?",
        note: "Everything before: Musa's relationship with God. Everything after: Musa's relationship with his people — and the discovery that liberation did not liberate them spiritually.",
      },
    },
    deductiveFunnel: {
      title: "The Dhikr Thread",
      subtitle: "Remembrance — the surah's keyword — appears at every structural turning point",
      layers: [
        { depth: 1, label: "The Frame", ayah: "3", arabic: "تَذْكِرَةً لِّمَن يَخْشَىٰ", desc: "The Quran is a tadhkirah — a reminder — for those who fear God. The word dhikr is established as the surah's governing concern in its third ayah.", color: "#4ecdc4" },
        { depth: 2, label: "The Anchor", ayah: "14", arabic: "وَأَقِمِ الصَّلَاةَ لِذِكْرِي", desc: "Establish prayer for My remembrance — li-dhikri. The burning bush commissioning places prayer as the instrument of remembrance. The surah's thematic anchor in miniature.", color: "#9b7fd4" },
        { depth: 3, label: "Pharaoh's Door", ayah: "44", arabic: "لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ", desc: "Perhaps he will remember — yatadhakkaru. The door of remembrance is left open even for a tyrant. The same root, the same possibility, extended to the worst human being in the narrative.", color: "#e07a8a" },
        { depth: 4, label: "The Forgetting", ayah: "115", arabic: "فَنَسِيَ وَلَمْ نَجِدْ لَهُ عَزْمًا", desc: "Adam forgot — nasiya. The opposite of dhikr. The first human being forgot the first covenant. Forgetting is not a modern problem — it is the original human condition.", color: "#C9A84C" },
        { depth: 5, label: "The Verdict", ayah: "124", arabic: "وَمَنْ أَعْرَضَ عَن ذِكْرِي", desc: "Whoever turns away from My dhikr — a constricted life. The surah's thesis in its most distilled form: the one who remembers may struggle, the one who forgets will suffocate.", color: "#f28585" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah persuades by immersion, not argument — every absence is deliberate",
      absences: [
        { item: "No extended polemic against the Quraysh", note: "In a Makkan surah of 135 ayahs, the Quraysh are addressed only briefly (99–104, 124–127). The surah persuades by pulling the listener so deeply into Musa's experience that resistance becomes harder to sustain. The warning is in the story itself." },
        { item: "No lingering at the sea crossing", note: "The parting of the Red Sea — the dramatic climax of most Exodus tellings — occupies a single ayah (77). The liberation is not the point. What comes after liberation is where Ta-Ha places its weight: twenty-one ayahs on the golden calf." },
        { item: "No answer to the sorcerers' fate", note: "The sorcerers declare faith, Pharaoh threatens crucifixion, they refuse to submit — and the surah moves on. Their willingness to die is recorded. Whether they actually did is left to silence. The commitment is the point, not the outcome." },
        { item: "No thundering judgment", note: "The Day of Judgment scene (102–112) whispers. Voices drop. Faces are humbled. The mood is hushed, almost reverent — the opposite of the shattering scenes in surahs like Al-Haqqah. Ta-Ha's judgment is quiet." },
        { item: "No explicit moral instruction", note: "The surah contains almost no direct commands to the community. It narrates. It shows. The devotion lives in Musa's prayer, in the sorcerers' transformation, in Ibrahim's sandals removed on sacred ground — not in any list of rules." },
      ],
    },
  },

  contentNodes: [
    { concept: "Li-dhikri — prayer as the instrument of remembrance", type: "surah-specific", articleSlug: "li-dhikri-taha-14" },
    { concept: "Rabbish-rahli sadri — the beloved du'a of Musa", type: "surah-specific", articleSlug: "rabbish-rahli-sadri-taha-25" },
    { concept: "Ma'ishatan danka — the constricted life of forgetting", type: "cross-surah", articleSlug: "maishatan-danka-taha-124" },
    { concept: "The Maryam-TaHa-Anbiya triptych", type: "cross-surah", articleSlug: "kahf-maryam-taha-triptych" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "arc", label: "Arc" },
  { id: "ring", label: "Ring" },
  { id: "dhikr", label: "Dhikr" },
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
        Reminder → prayer → possibility → forgetting → verdict
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
          {activeTab === "arc" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "dhikr" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
