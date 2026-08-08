# AyahGuide · The Word for Human — Design

## Concept
Linguistic reveal: the Arabic word for "human" (insān) shares a root with "to forget" (nasiya).
The video enacts the etymology — one Arabic word transforms into another, then lands the takeaway.

## Style Prompt
Reverent, cinematic stillness. Deep navy and warm gold — the palette of old manuscripts and candlelit study. Motion is deliberate: things arrive with weight. Calligraphy is the hero — give it space, let it breathe. The viewer should feel they are watching a private contemplation.

## Colors
- `#0f172a` — Navy. Background.
- `#f5f1e8` — Cream. Primary text.
- `rgba(201, 168, 76, 0.85)` — Gold. Arabic text, accents, dividers.
- `rgba(201, 168, 76, 0.5)` — Gold muted. Secondary references.
- `rgba(245, 241, 232, 0.65)` — Cream muted. Taglines, subdued UI text.

## Typography
- **Amiri** — Arabic Quranic text. Large, breathing line-height (2.0+). Direction RTL.
- **Playfair Display** — Display headings. Italic for translation lines, regular for the takeover line.
- **Inter** — UI labels, references. Light weight, tracked out.

## Motion Vocabulary
- Primary transition: **blur crossfade** — calm, calls back to the intro video.
- Climax transition: **color dip** through gold flash for the takeover.
- Eases vary per scene — `power3.out` for letter landings, `sine.inOut` for blurs, `power4.out` for the takeover.

## What NOT to Do
- No blue, green, red, or purple — strict navy + gold palette only.
- No exclamation points or emphatic punctuation.
- No fast bouncy transitions. No elastic overshoot.
- No `<br>` tags in running text — let CSS max-width handle wrapping.
- No equalizer bars, particle systems, or generic visualizer cliches.
- No declarative hammering ("notice what happens", "watch this").
