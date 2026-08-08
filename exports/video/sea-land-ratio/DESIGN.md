# AyahGuide · The Sea / Land Ratio — Design

## Concept
Format: Structural Surprise. Show the Quran's word counts of "sea" (بَحْر) vs "land" (بَرّ), compute the ratio, then reveal that ratio matches Earth's actual ocean-to-land surface ratio.

**Verifiable data:**
- بَحْر (baḥr - sea) — 32 occurrences in the Quran (singular form)
- بَرّ (barr - land/dry land) — 13 occurrences
- Ratio: 32 / (32+13) = 71.1%
- Earth's ocean surface coverage: 71% (NASA / National Geographic)

## Editorial posture
This reel does NOT make the claim that the Quran is "predicting" Earth's ratio. It presents the data and lets the viewer draw their own inference. The closing line: "Make of it what you will." This avoids the sensationalist numerology trap while keeping the WOW factor.

## Style
Cinematic data presentation. Counters tick up like a calculator. The globe fills with water like a beaker. Numbers have tabular-nums for that "scientific" feel. Arabic calligraphy held large.

## Colors
- `#0f172a` — Navy. Background.
- `#f5f1e8` — Cream. Primary text.
- `rgba(201, 168, 76, 0.92)` — Gold. Arabic, accents.
- `rgba(76, 158, 220, 0.85)` — Ocean blue. The water in the globe.
- `rgba(245, 241, 232, 0.55)` — Cream muted. Labels.

## Typography
- **Amiri** — Arabic words. Direction RTL.
- **Playfair Display** — The closing line and brand.
- **Inter** — Numbers (tabular-nums), labels, "Earth's ocean coverage."

## Motion Vocabulary
- Cover hold (0 → 1.5s) — fully designed cover frame, no animation
- Counter ticks for the 32 and 13 — not a static reveal, the numbers actually count up
- The math compute is animated: 32 ÷ 45 = 71%
- Globe fills with blue water from bottom to top in 1.2s ease-out
- The two ratios "match up" with a subtle gold pulse when both are on screen

## What NOT to Do
- Don't claim "miracle" or "scientific proof in the Quran"
- Don't add equalizer bars or generic data viz cliches
- Don't fade in scene 0 — the cover MUST be visible at frame 1
