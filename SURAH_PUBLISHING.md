# Surah Publishing Guide

Everything a Claude session needs to generate and publish surah analyses to AyahGuide.

---

## Quick Start

1. Pick unpublished surahs (see list below)
2. Run the right skill (see "Which Skill to Use")
3. Run the publish script (see "Publishing a Post")
4. Verify at `https://ayahguide.com/surah/[slug]`

---

## Infrastructure

| Item | Value |
|------|-------|
| Site | https://ayahguide.com |
| Supabase URL | in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` |
| Service Role Key | in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` |
| Admin User ID | query `profiles` table where `role = 'admin'` |
| Node modules | at `/Users/mainframe/the-guided-path/node_modules` |
| Publish helper | `scripts/publish-surah.mjs` |
| Example script | `scripts/publish-al-asr.mjs` (use as template) |

All scripts run from: `node /Users/mainframe/the-guided-path/.claude/worktrees/[worktree]/scripts/[script].mjs`
Or from the main repo: `cd /Users/mainframe/the-guided-path && node scripts/[script].mjs`

---

## Which Skill to Use

### `anthropic-skills:surah-architecture`
Use for **most surahs** — any surah with enough length to have architectural structure.
Rule of thumb: surahs before ~Surah 87 (or with 20+ ayahs).

### `anthropic-skills:quranic-tadabbur`
Use for **short late Makki surahs** — typically Surahs 93–114, especially those with
fewer than ~15 ayahs (Al-Asr, Al-Kawthar, Al-Ikhlas, Al-Falaq, Al-Nas, etc.).

**When in doubt:** if the surah has 3–15 ayahs and is in Juz 30, use tadabbur.

---

## Skill Invocation

### surah-architecture
```
Surah [Name] (Surah [N], [Arabic]) — [X] ayahs, [Makki/Madani]. Generate a complete
surah architecture exploration for publication on a Quranic reflection website. Skip
all internal audit, planning, and pre-writing sections. Begin the output directly from
"The Surah at a Glance" section. The content should be rich, literary, and suitable
for teachers, content creators, and serious students of the Quran.
```

### quranic-tadabbur
```
Surah [Name] (Surah [N]) — all [X] ayahs as a complete surah reflection. Please
generate a full tadabbur that will be published on a Quranic reflection website. Skip
any internal planning or audit sections — begin the output directly from the
Introduction section. The content should be rich, literary, and suitable for a reader
wanting deep engagement with this surah's meaning, structure, and spiritual impact.
```

---

## Content Rules

### What to include
- **surah-architecture output:** Everything from `## The Surah at a Glance` onwards
- **tadabbur output:** Everything from `## Introduction` onwards
- Strip nothing else — include all sections as generated

### What to exclude
- Any internal audit tables (Step 0, Step 1, Step 2)
- Any `[PAUSE]` markers are auto-converted to visual dividers by the publish script

### Fixed section headers (surah-architecture)
The skill always produces these in order — never change them:
1. The Surah at a Glance
2. The Character of This Surah
3. Walking Through the Surah
4. What the Structure Is Doing
5. Why It Still Speaks
6. To Carry With You
7. Virtues & Recitation

---

## Post Fields

| Field | Format | Example |
|-------|--------|---------|
| `title` | `[Name] — [Compelling subtitle from content]` | `Al-Mulk — The Surah That Won't Let You Look Away` |
| `slug` | lowercase, hyphens, no apostrophes | `al-mulk` |
| `surah_number` | integer 1–114 | `67` |
| `seo_title` | max 60 chars | `Surah Al-Mulk: Deep Reflection & Tadabbur \| AyahGuide` |
| `seo_description` | max 160 chars | What the surah is specifically about |
| `excerpt` | 1–2 sentences, the hook | First striking claim or the Imam's quote, etc. |
| `status` | `published` | — |
| `tags` | array of strings | `["al-mulk", "tadabbur", "juz-29"]` |

### Title naming convention
Look at existing titles for the pattern:
- `Al-Mulk — The Surah That Won't Let You Look Away`
- `Al-Baqarah — The Floor of the Palace`
- `Al-'Asr — The Shortest Indictment Ever Written`

Format: `[Surah Name] — [Vivid, specific subtitle]`. The subtitle comes from the skill output — usually the opening hook or the surah's core characterization.

### Slug convention
From `surahSlug()` in `src/lib/surahs.ts`:
- Lowercase
- Remove apostrophes (`'` and `'`)
- Replace spaces with hyphens
- Examples: `Al-'Asr` → `al-asr`, `Al-Ma'ida` → `al-maida`, `Ali 'Imran` → `ali-imran`

---

## Publishing a Post

### 1. Use `scripts/publish-al-asr.mjs` as a template

Copy it, fill in the surah data, run it:

```js
import { publishSurah } from './publish-surah.mjs';

await publishSurah({
  surahNumber: 103,       // integer
  title: "Al-'Asr — The Shortest Indictment Ever Written",
  slug: "al-asr",
  excerpt: "One-to-two sentence hook.",
  seoTitle: "Surah Al-'Asr: Deep Reflection & Tadabbur | AyahGuide",  // max 60 chars
  seoDescription: "Max 160 chars describing what this specific reflection covers.",
  markdownContent: markdown,  // the full skill output as a template literal
  tags: ["al-asr", "tadabbur", "juz-30"],
});
```

### 2. Run from main repo directory
```bash
cd /Users/mainframe/the-guided-path && node scripts/publish-[surah].mjs
```

### 3. The script auto-handles
- Markdown → HTML conversion
- `[PAUSE]` → visual divider
- Reading time calculation
- Duplicate check (won't overwrite existing surah posts)
- Setting `published_at`, `publish_date`, `created_by`

---

## Published Surahs (Do Not Re-publish)

| # | Name | Title |
|---|------|-------|
| 1 | Al-Fatiha | Al-Fatiha - The Opening |
| 2 | Al-Baqara | Al-Baqarah — The Floor of the Palace |
| 5 | Al-Ma'ida | Al-Ma'idah: The Surah of the Final Covenant |
| 12 | Yusuf | Yusuf — The Best of all Stories |
| 56 | Al-Waqi'a | Al-Waqi'ah — The Great Sorting |
| 67 | Al-Mulk | Al-Mulk — The Surah That Won't Let You Look Away |
| 3 | Ali 'Imran | Ali 'Imran — The Surah That Stays With You After the Defeat |
| 103 | Al-'Asr | Al-'Asr — The Shortest Indictment Ever Written |

---

## Verification

After publishing, verify at:
```
https://ayahguide.com/surah/[slug]
```

The surah map at `https://ayahguide.com/surah` will also show the newly published card as active.

---

## Surah Data Reference

All 114 surahs with names and ayah counts are in:
`src/lib/surahs.ts`

Key surahs for planning (good candidates for next sessions):
- **Short tadabbur targets (Juz 30):** Al-Kawthar (108, 3 ayahs), Al-Ikhlas (112, 4), Al-Falaq (113, 5), Al-Nas (114, 6), Al-Fatiha ✓, Al-Qadr (97, 5), At-Takathur (102, 8), Al-Humazah (104, 9)
- **Medium surah-architecture targets:** Ar-Rahman (55), Al-Kahf (18), Ya-Sin (36), Al-Waqi'a ✓, Al-Qiyama (75), Al-Insan (76)
- **Major surah-architecture targets:** An-Nisa (4), Al-An'am (6), At-Tawba (9), Yunus (10), Hud (11), Ar-Ra'd (13)
