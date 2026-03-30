# AyahGuide Brand Guidelines

> This document is the source of truth for visual and editorial identity. The hub-article-pipeline skill checks against this before publishing any content.

---

## Typography

### Font Stack (CSS Variables — defined in globals.css `:root`)

| Variable | Value | Use |
|---|---|---|
| `--font-sans` | Inter → system-ui | UI chrome: navigation, buttons, labels, cards, metadata |
| `--font-body` | Source Serif 4 → Georgia | Long-form reading: article body, surah analysis prose, hub synthesis |
| `--font-serif` | Playfair Display → Georgia | Display headings: article h1/h2/h3, section headers in content |
| `--font-amiri` | Amiri → Scheherazade New → Georgia | Arabic text: all Quranic quotations, Arabic terms |
| `--font-arabic` | Amiri → Vazirmatn → Scheherazade New | RTL UI elements (Arabic navigation labels, entity name displays) |

### Rules

1. **Never hardcode font names in components.** Always use the CSS variable: `font-family: var(--font-body)`, not `font-family: 'Source Serif 4', Georgia, serif`.
2. **Arabic text always uses `--font-amiri`**, regardless of context. No exceptions.
3. **UI text (buttons, tabs, nav, badges) uses `--font-sans`** — Inter only. No serif in UI chrome.
4. **Long-form prose uses `--font-body`** (Source Serif 4). This includes:
   - Article body text (`prose-blog` class)
   - Hub synthesis overview text
   - Surah analysis written reflections
   - Glossary entry body text (when there's a substantial paragraph)
5. **Headings in content areas use `--font-serif`** (Playfair Display): h1, h2, h3 within prose.
6. **Never use `--font-body` for UI chrome** — cards, nav, badges stay on `--font-sans`.

---

## Color Palette

### Core Colors

| Name | Light mode | Dark mode | Use |
|---|---|---|---|
| Navy | `#0f172a` (zinc-950 approx) | `#f5f1e8` (cream) | Primary text |
| Cream | `#f5f1e8` | `#0f172a` (navy) | Background, reverse text |
| Gold | `#c9a84c` (gold-500) | `#c9a84c` | Accents, links, Arabic text color |
| Gold muted | `rgba(201, 168, 76, 0.85)` | same | Arabic Quranic text in blockquotes |

### Accent Usage Rules

- **Gold borders**: Ayah blockquotes (`border-l-4 border-gold-500`), grounding panel toggles
- **Gold text**: Links, Arabic Quranic text in articles, entity name Arabic display
- **Gold backgrounds**: Ayah quote containers (`bg-gold-50 dark:bg-gold-900/10`), selection highlights
- **No other accent colors** — AyahGuide uses a strict two-accent palette (navy + gold). No blue, green, red buttons in content areas.

---

## Arabic Text Rendering

### Required Properties for All Arabic Text

```css
direction: rtl;
text-align: right;
font-family: var(--font-amiri);
line-height: 2.0;          /* minimum — use 2.2 for large display sizes */
word-break: break-word;
overflow-wrap: anywhere;
```

### Inline Arabic Terms in English Prose

When inserting an Arabic root or term inline within an English sentence:
```html
<strong>sabr</strong> (صَبْرٌ)
```
- The transliteration goes in `<strong>` — renders in `--font-body`
- The Arabic in parentheses renders naturally inline — browser uses `--font-amiri` via the `[lang="ar"]` or explicit `style` attribute
- Do NOT wrap inline Arabic terms in `dir="rtl"` blocks — this breaks text flow

### Quranic Blockquote (canonical structure)

```html
<blockquote class="ayah-quote">
  <p class="arabic" dir="rtl" style="font-family: var(--font-amiri); font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
    {exact Arabic text}
  </p>
  <p class="translation">{English translation}</p>
  <cite>{Surah Name} ({surah}:{ayah})</cite>
</blockquote>
```

**Do not** deviate from this structure. The inline grounding system depends on the `<cite>` pattern `{surah}:{ayah}` to inject the "✦ Linguistic insight" toggle.

---

## Content Voice

### Publication Voice
AyahGuide publishes in the voice of **intellectual discovery happening in real time** — the reader watching meaning emerge from the Arabic text, not being told what to think. Academic rigor without academic dryness. Literary precision without literary affectation.

### Prohibited Phrases (auto-checked by skill Voice Check)
- "This is critical / important / crucial / significant"
- "Notice what happens here" / "Pay attention to"
- "And this is exactly how..." / "And here's the thing..."
- "Let me show you" / "Let's explore" / "Let's look at"
- "There are several layers to unpack"

### Prohibited Formatting
- `<strong>` on interpretive claims — only on Arabic terms, proper nouns, Quranic references
- `!` (exclamation points) anywhere in prose
- Decorative dividers or flourishes between paragraphs

---

## Content Structure Standards

### Article HTML
```html
<article class="prose-blog">
  <p class="text-lg leading-relaxed">{opening paragraph}</p>
  <p>{body}</p>
  <h2>{section heading}</h2>
  <blockquote class="ayah-quote">...</blockquote>
</article>
```

### Hub Synthesis HTML
No `<article>` wrapper — synthesis is injected directly into the hub Overview tab. Use `<h2>` for section headings. Font is inherited from the hub page's prose styling.

---

## Brand Check Checklist (run before publishing any content)

This checklist is enforced by Step 3c of the hub-article-pipeline skill.

**Typography:**
- [ ] All Arabic text uses `var(--font-amiri)` or inline `style="font-family: var(--font-amiri)..."`
- [ ] No hardcoded font names in new HTML/JSX (use variables)
- [ ] Article/synthesis body uses `prose-blog` class or explicit `var(--font-body)`

**Color:**
- [ ] Quranic Arabic text color is `rgba(201, 168, 76, 0.85)` in blockquotes
- [ ] No new accent colors introduced (no blue/green/red/purple UI elements)

**Structure:**
- [ ] Every ayah blockquote uses `class="ayah-quote"` with the canonical structure
- [ ] Every `<cite>` uses `{Surah Name} ({surah}:{ayah})` format (for grounding detection)
- [ ] No `<strong>` on interpretive claims

**Voice (from skill Voice Check):**
- [ ] No prohibited phrases
- [ ] Negation count < 10 per 2000 words (excluding blockquotes)
- [ ] No exclamation points

**SEO:**
- [ ] `slug` is entity-name-first, max 6 tokens
- [ ] `seo_title` is 50-60 chars, includes entity name + "Quran"
- [ ] `seo_description` is 140-160 chars, distinct from `excerpt`
