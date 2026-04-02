import { useEffect } from "react";

// ─── Brand tokens (from tailwind.config.ts) ──────────────────────────────────
const B = {
  bg:         "#0D1B2A",
  bgCard:     "#162F3D",
  bgLight:    "#1A3A4A",
  gold:       "#C9A84C",
  goldLight:  "#DBBF6A",
  goldDark:   "#B8960C",
  cream:      "#F5F0E8",
  muted:      "#D8D0C4",
  dim:        "rgba(245,240,232,0.45)",
};

// Ring section palette
const R = {
  A:  { main: "#C9A84C", bg: "rgba(201,168,76,0.11)",  border: "rgba(201,168,76,0.38)" },
  B:  { main: "#6B9FAF", bg: "rgba(107,159,175,0.11)", border: "rgba(107,159,175,0.32)" },
  C:  { main: "#82AF8A", bg: "rgba(130,175,138,0.16)", border: "rgba(130,175,138,0.65)" },
};

// ─── Shared layout ────────────────────────────────────────────────────────────
const W = 540;
const H = 540;

function Slide({ children, style = {} }) {
  return (
    <div style={{
      width: W, height: H,
      background: B.bg,
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      ...style,
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: -80, left: "50%",
        transform: "translateX(-50%)",
        width: 400, height: 200,
        background: `radial-gradient(ellipse, ${B.gold}0D 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {children}
    </div>
  );
}

function SlideHeader({ surahArabic = "سورة الكهف", label = "Surah Al-Kahf", slide, total }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 28px 0",
      zIndex: 1,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Gold mark */}
        <div style={{ width: 3, height: 28, background: B.gold, borderRadius: 2 }} />
        <div>
          <div style={{ fontSize: 13, fontFamily: "'Amiri', Georgia, serif", color: B.gold, lineHeight: 1.2 }}>
            {surahArabic}
          </div>
          <div style={{ fontSize: 8.5, fontFamily: "'Inter', sans-serif", color: B.muted, letterSpacing: 2.5, textTransform: "uppercase" }}>
            {label}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 9, fontFamily: "'Inter', sans-serif", color: "rgba(245,240,232,0.25)", letterSpacing: 1.5 }}>
        {slide} / {total}
      </div>
    </div>
  );
}

function SlideFooter({ cta = false }) {
  return (
    <div style={{
      padding: "0 28px 18px",
      display: "flex", alignItems: "center",
      justifyContent: cta ? "space-between" : "flex-end",
      zIndex: 1,
    }}>
      {cta && (
        <div style={{
          fontSize: 9.5, fontFamily: "'Inter', sans-serif",
          color: B.gold, letterSpacing: 1,
          border: `1px solid ${B.gold}55`, borderRadius: 20,
          padding: "4px 12px",
        }}>
          ayahguide.com
        </div>
      )}
      {!cta && (
        <div style={{ fontSize: 8.5, fontFamily: "'Inter', sans-serif", color: "rgba(201,168,76,0.4)", letterSpacing: 2.5, textTransform: "uppercase" }}>
          ayahguide.com
        </div>
      )}
      {cta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 8.5, fontFamily: "'Inter', sans-serif", color: B.dim, letterSpacing: 1 }}>swipe</div>
          <div style={{ fontSize: 11, color: B.dim }}>›</div>
        </div>
      )}
    </div>
  );
}

// ─── Slide 1: Hook ────────────────────────────────────────────────────────────
function Slide1() {
  return (
    <Slide>
      <SlideHeader slide={1} total={5} />

      {/* Center content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 40px", gap: 0, zIndex: 1,
        textAlign: "center",
      }}>
        {/* Large Arabic */}
        <div style={{
          fontSize: 52,
          fontFamily: "'Amiri', Georgia, serif",
          color: B.gold,
          lineHeight: 1.3,
          marginBottom: 24,
          letterSpacing: 2,
        }}>
          سورة الكهف
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: `${B.gold}25` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: B.gold, opacity: 0.5 }} />
          <div style={{ flex: 1, height: 1, background: `${B.gold}25` }} />
        </div>

        {/* Hook line */}
        <div style={{
          fontSize: 28,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: B.cream,
          lineHeight: 1.35,
          marginBottom: 16,
          fontStyle: "italic",
        }}>
          Al-Kahf isn't five random stories.
        </div>

        {/* Payoff */}
        <div style={{
          fontSize: 34,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: "bold",
          lineHeight: 1.2,
          background: `linear-gradient(135deg, ${B.goldLight} 0%, ${B.goldDark} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 20,
        }}>
          It's a ring.
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 13,
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: B.dim,
          lineHeight: 1.7,
          maxWidth: 340,
        }}>
          And every ring has a center — one story placed at the exact middle for a reason.
        </div>
      </div>

      {/* Swipe nudge */}
      <div style={{
        position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 6, zIndex: 1,
      }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: i === 0 ? 16 : 5, height: 5,
            borderRadius: 3,
            background: i === 0 ? B.gold : `${B.gold}30`,
          }} />
        ))}
      </div>

      <SlideFooter />
    </Slide>
  );
}

// ─── Slide 2: The Ring Diagram ────────────────────────────────────────────────
const ringRows = [
  { key: "A",  title: "People of the Cave",  arabic: "أصحاب الكهف",  trial: "Trial of Faith",     ayahs: "9–26",   color: R.A, pivot: false },
  { key: "B",  title: "The Two Gardens",     arabic: "صاحب الجنتين", trial: "Trial of Wealth",    ayahs: "32–44",  color: R.B, pivot: false },
  { key: "C",  title: "Mūsā & Khiḍr",       arabic: "موسى والخضر",  trial: "Pivot: Knowledge",   ayahs: "60–82",  color: R.C, pivot: true  },
  { key: "B'", title: "Dhul-Qarnayn",        arabic: "ذو القرنين",   trial: "Trial of Power",     ayahs: "83–98",  color: R.B, pivot: false },
  { key: "A'", title: "Iblīs & the End",     arabic: "إبليس والآخرة",trial: "Trial of Faith",     ayahs: "99–110", color: R.A, pivot: false },
];

const indents = [0, 20, 40, 20, 0];

function Slide2() {
  return (
    <Slide>
      <SlideHeader slide={2} total={5} />

      <div style={{ padding: "14px 28px 0", zIndex: 1 }}>
        <div style={{
          fontSize: 18, fontFamily: "'Playfair Display', Georgia, serif",
          color: B.cream, marginBottom: 4,
        }}>
          The Architecture
        </div>
        <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: B.dim, letterSpacing: 0.3 }}>
          Five sections — three mirror pairs — one pivot
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 5,
        padding: "12px 28px", zIndex: 1,
      }}>
        {ringRows.map((row, i) => (
          <div key={row.key} style={{
            marginLeft: indents[i], marginRight: indents[i],
            display: "flex", alignItems: "stretch", gap: 7,
          }}>
            {/* Key badge */}
            <div style={{
              width: 30, minWidth: 30,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 5,
              background: row.pivot ? row.color.main : "transparent",
              border: `1.5px solid ${row.color.border}`,
            }}>
              <span style={{
                fontSize: 9.5, fontWeight: "bold",
                color: row.pivot ? B.bg : row.color.main,
                fontFamily: "'Inter', sans-serif",
              }}>{row.key}</span>
            </div>

            {/* Row body */}
            <div style={{
              flex: 1,
              background: row.color.bg,
              border: `1px solid ${row.color.border}`,
              borderRadius: 7,
              padding: row.pivot ? "9px 13px" : "7px 13px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{
                  fontSize: row.pivot ? 13 : 11.5,
                  fontWeight: row.pivot ? "600" : "normal",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: row.pivot ? B.cream : "rgba(245,240,232,0.82)",
                  marginBottom: 2,
                }}>
                  {row.title}
                </div>
                <div style={{
                  fontSize: 8.5, fontFamily: "'Inter', sans-serif",
                  color: row.color.main, letterSpacing: 0.7, textTransform: "uppercase",
                }}>
                  {row.trial}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{
                  fontSize: 13.5, fontFamily: "'Amiri', Georgia, serif",
                  color: `${row.color.main}88`, lineHeight: 1.4,
                }}>
                  {row.arabic}
                </div>
                <div style={{ fontSize: 8.5, fontFamily: "'Inter', sans-serif", color: "rgba(245,240,232,0.2)" }}>
                  {row.ayahs}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SlideFooter cta />
    </Slide>
  );
}

// ─── Slide 3: The Mirrors ─────────────────────────────────────────────────────
function MirrorPair({ label, leftTitle, rightTitle, arabic1, arabic2, insight, color }) {
  return (
    <div style={{
      background: `${color}0C`,
      border: `1px solid ${color}2A`,
      borderRadius: 10,
      padding: "13px 15px",
    }}>
      {/* Titles row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: 9, fontFamily: "'Inter', sans-serif", color: `${color}BB`, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>
            {label}
          </div>
          <div style={{ fontSize: 12.5, fontFamily: "'Playfair Display', Georgia, serif", color: B.cream, lineHeight: 1.3 }}>
            {leftTitle}
          </div>
          <div style={{ fontSize: 11.5, fontFamily: "'Amiri', Georgia, serif", color: `${color}88`, direction: "rtl", marginTop: 2 }}>
            {arabic1}
          </div>
        </div>

        {/* Mirror symbol */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0,
        }}>
          <div style={{ fontSize: 11, color: `${color}66` }}>⟵</div>
          <div style={{ width: 1, height: 16, background: `${color}33` }} />
          <div style={{ fontSize: 11, color: `${color}66` }}>⟶</div>
        </div>

        <div style={{ flex: 1, textAlign: "right" }}>
          <div style={{ fontSize: 9, fontFamily: "'Inter', sans-serif", color: `${color}BB`, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>
            {label.replace("A", "A'").replace("B", "B'")}
          </div>
          <div style={{ fontSize: 12.5, fontFamily: "'Playfair Display', Georgia, serif", color: B.cream, lineHeight: 1.3 }}>
            {rightTitle}
          </div>
          <div style={{ fontSize: 11.5, fontFamily: "'Amiri', Georgia, serif", color: `${color}88`, direction: "rtl", marginTop: 2 }}>
            {arabic2}
          </div>
        </div>
      </div>

      {/* Insight */}
      <div style={{
        borderTop: `1px solid ${color}1F`, paddingTop: 8,
        fontSize: 11, fontFamily: "'Source Serif 4', Georgia, serif",
        color: B.dim, lineHeight: 1.65, fontStyle: "italic",
        textAlign: "center",
      }}>
        {insight}
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <Slide>
      <SlideHeader slide={3} total={5} />

      <div style={{ padding: "14px 28px 0", zIndex: 1 }}>
        <div style={{ fontSize: 18, fontFamily: "'Playfair Display', Georgia, serif", color: B.cream, marginBottom: 4 }}>
          The Mirrors
        </div>
        <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: B.dim }}>
          Each pair shares a hidden question
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 11,
        padding: "14px 28px", zIndex: 1,
      }}>
        <MirrorPair
          label="A"
          leftTitle="People of the Cave"
          rightTitle="Iblīs & the End"
          arabic1="أصحاب الكهف"
          arabic2="إبليس والآخرة"
          insight="Who will you remain loyal to when the world turns against you?"
          color={R.A.main}
        />
        <MirrorPair
          label="B"
          leftTitle="The Two Gardens"
          rightTitle="Dhul-Qarnayn"
          arabic1="صاحب الجنتين"
          arabic2="ذو القرنين"
          insight="What will you do with what you've been given — wealth or power?"
          color={R.B.main}
        />

        {/* Center note */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ flex: 1, height: 1, background: `${R.C.main}25` }} />
          <div style={{
            fontSize: 9.5, fontFamily: "'Inter', sans-serif",
            color: R.C.main, letterSpacing: 1.5, textTransform: "uppercase",
            opacity: 0.8,
          }}>
            C — The Pivot — next slide
          </div>
          <div style={{ flex: 1, height: 1, background: `${R.C.main}25` }} />
        </div>
      </div>

      <SlideFooter cta />
    </Slide>
  );
}

// ─── Slide 4: The Pivot ───────────────────────────────────────────────────────
function Slide4() {
  return (
    <Slide>
      <SlideHeader slide={4} total={5} />

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "10px 32px",
        zIndex: 1, gap: 0,
      }}>
        {/* Pivot badge */}
        <div style={{
          display: "inline-flex", alignSelf: "flex-start",
          alignItems: "center", gap: 6,
          background: `${R.C.main}18`, border: `1px solid ${R.C.border}`,
          borderRadius: 20, padding: "4px 12px", marginBottom: 16,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: R.C.main }} />
          <span style={{ fontSize: 9, fontFamily: "'Inter', sans-serif", color: R.C.main, letterSpacing: 2, textTransform: "uppercase" }}>
            The Pivot · Section C
          </span>
        </div>

        {/* Arabic title */}
        <div style={{
          fontSize: 36, fontFamily: "'Amiri', Georgia, serif",
          color: R.C.main, lineHeight: 1.4, marginBottom: 4,
          direction: "rtl", textAlign: "left",
        }}>
          موسى والخضر
        </div>

        <div style={{
          fontSize: 22, fontFamily: "'Playfair Display', Georgia, serif",
          color: B.cream, marginBottom: 18, lineHeight: 1.3,
        }}>
          Mūsā & Khiḍr
        </div>

        {/* Quote */}
        <div style={{
          borderLeft: `3px solid ${R.C.main}`,
          paddingLeft: 16, marginBottom: 20,
        }}>
          <div style={{
            fontSize: 13, fontFamily: "'Amiri', Georgia, serif",
            color: R.C.main, direction: "rtl", textAlign: "right",
            lineHeight: 1.8, marginBottom: 6,
          }}>
            إِنَّكَ لَن تَسْتَطِيعَ مَعِيَ صَبْرًا
          </div>
          <div style={{
            fontSize: 11.5, fontFamily: "'Source Serif 4', Georgia, serif",
            color: B.dim, fontStyle: "italic", lineHeight: 1.6,
          }}>
            "You will not be able to have patience with me." — Khiḍr to Mūsā (18:67)
          </div>
        </div>

        {/* Insight block */}
        <div style={{
          background: `${R.C.main}0D`, border: `1px solid ${R.C.main}22`,
          borderRadius: 10, padding: "13px 15px",
        }}>
          <div style={{
            fontSize: 12.5, fontFamily: "'Source Serif 4', Georgia, serif",
            color: B.cream, lineHeight: 1.75,
          }}>
            The surah's center isn't a story about power or wealth. It's about{" "}
            <span style={{ color: R.C.main }}>the limits of what you can know.</span>
            {" "}Every trial surrounding it — faith, wealth, power — becomes bearable only
            when you surrender the need to understand it.
          </div>
        </div>
      </div>

      <SlideFooter cta />
    </Slide>
  );
}

// ─── Slide 5: Why Friday ──────────────────────────────────────────────────────
function Slide5() {
  return (
    <Slide>
      <SlideHeader slide={5} total={5} />

      {/* Bottom gold wash */}
      <div style={{
        position: "absolute", bottom: -40, left: "50%",
        transform: "translateX(-50%)",
        width: 500, height: 200,
        background: `radial-gradient(ellipse, ${B.gold}0A 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "10px 32px",
        zIndex: 1, gap: 0,
      }}>
        {/* Label */}
        <div style={{
          fontSize: 9, fontFamily: "'Inter', sans-serif",
          color: B.muted, letterSpacing: 3, textTransform: "uppercase",
          marginBottom: 12,
        }}>
          Why We Read It Every Friday
        </div>

        {/* Heading */}
        <div style={{
          fontSize: 27, fontFamily: "'Playfair Display', Georgia, serif",
          color: B.cream, lineHeight: 1.3, marginBottom: 20,
        }}>
          Al-Kahf is a weekly recalibration.
        </div>

        {/* The 4 trials list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
          {[
            { trial: "Faith",     q: "Where is your loyalty when you're alone?",  color: R.A.main },
            { trial: "Wealth",    q: "Are you grateful, or are you deceived?",     color: R.B.main },
            { trial: "Knowledge", q: "Can you act without full understanding?",    color: R.C.main },
            { trial: "Power",     q: "What will you build with what you hold?",    color: R.B.main },
          ].map(({ trial, q, color }) => (
            <div key={trial} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: color, marginTop: 6, flexShrink: 0,
              }} />
              <div>
                <span style={{
                  fontSize: 11, fontFamily: "'Inter', sans-serif",
                  color: color, fontWeight: "600",
                  textTransform: "uppercase", letterSpacing: 0.8,
                  marginRight: 6,
                }}>
                  {trial}
                </span>
                <span style={{
                  fontSize: 11.5, fontFamily: "'Source Serif 4', Georgia, serif",
                  color: B.dim, fontStyle: "italic",
                }}>
                  {q}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div style={{
          borderLeft: `3px solid ${B.gold}`,
          paddingLeft: 14,
        }}>
          <div style={{
            fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif",
            color: B.cream, lineHeight: 1.75,
            fontStyle: "italic",
          }}>
            The Quran isn't telling you a story from the past.
            It's preparing you for the one you're living.
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div style={{
        padding: "0 32px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: 10, fontFamily: "'Source Serif 4', Georgia, serif",
          color: B.dim, fontStyle: "italic",
        }}>
          Explore the full tadabbur →
        </div>
        <div style={{
          fontSize: 10, fontFamily: "'Inter', sans-serif",
          color: B.gold, letterSpacing: 1.5,
          border: `1px solid ${B.gold}55`,
          borderRadius: 20, padding: "5px 14px",
        }}>
          ayahguide.com
        </div>
      </div>
    </Slide>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function AlKahfCarousel() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div style={{
      background: "#060D14",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Label */}
      <div style={{
        fontSize: 10, color: "rgba(255,255,255,0.25)",
        letterSpacing: 3, textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        marginBottom: 4,
      }}>
        AyahGuide · Surah Al-Kahf Carousel · 5 slides
      </div>

      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />

      <div style={{
        fontSize: 9, color: "rgba(255,255,255,0.15)",
        letterSpacing: 2, textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        marginTop: 8,
      }}>
        1080 × 1080 · Instagram Carousel
      </div>
    </div>
  );
}
