# DistruCommerce · Product Video Design

## Style Prompt
Dark, minimal, high-conviction. The aesthetic of a product that knows exactly what it is. Near-black canvas, surgical green accent, precise Inter typography. Motion is deliberate — not decorative. Every animation earns its place. Nothing bounces. Nothing glows neon. This is the product video Steve Jobs would have approved of: one idea per beat, held long enough to land.

## Colors
- `#09090b` — Near-black. Background throughout.
- `#f8fafc` — Off-white. All headline and body text. Never pure #fff.
- `#22c55e` — Green. Single accent. Feature dots, counter, closing line, underline rule.
- `rgba(248,250,252,0.78)` — Muted white. Feature text, secondary labels.
- `rgba(248,250,252,0.4)` — Whisper white. URLs, stat labels.
- `rgba(34,197,94,0.04-0.09)` — Green whisper. Background glows only.

## Typography
- **Inter 800** — Product name (104px+), closing lines (128px). Tight tracking (-0.03em).
- **Inter 700** — Hero headline (80px). Slightly looser (-0.025em).
- **Inter 400** — Feature labels (34px). Normal weight, reads as supporting cast.
- **Inter 300** — Stat label, URL (22–26px). Light, recedes.

## Motion Language
- Text reveals: clip-path `inset(0 100% 0 0)` → `inset(0 0% 0 0)`. Left-to-right cinematic wipe.
- Entrances: power3.out / power2.out. Fast in, slow settle.
- Feature items: x:-32, opacity:0 → position. Stagger 0.2s.
- Background: hairline green grid (0.04 opacity), slow sine breathe.
- Glows: radial ellipse, breathing scale 1.0 → 1.15–1.20, sine.inOut.
- Transitions: S1→S2 = zoom (scale+blur, power3, 0.5s). S2→S3 = blur crossfade (sine.inOut, 0.8s).

## What NOT to Do
- No gradient text or rainbow accents.
- No bounce, elastic, or playful easing.
- No more than 4 content elements visible at once.
- No bright neon greens — #22c55e is the ceiling.
- No particle systems, confetti, or visual noise.
- No pure white (#fff) anywhere — use #f8fafc.
- No exit animations on individual scene elements — only on the scene container (transition) or final scene fade.
