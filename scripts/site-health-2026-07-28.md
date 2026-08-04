# Site Health Report — 2026-07-28

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | ✅ | Last 3 all READY |
| Key Pages | ✅ | 10 checked, 9 live + 1 non-existent route (`/api/health`, expected) |
| Database | ✅ | 325 posts, 0 corrupt rows, 0 NULL subscriber statuses |
| Runtime Errors | 🔴 | 2 error clusters — both reproduced, both root-caused |

Both runtime errors are **real, confirmed defects**, not noise. One is silently breaking the
social-share image on all 114 surah pages. The other is silently failing saved reading progress
for returning users.

---

## 🔴 CRITICAL (fix today)

### 1. Every surah page's social share image is a 0-byte broken PNG

**Issue:** `/api/og/quote` throws `lookupType: 5 - substFormat: 3 is not yet supported`
whenever the `arabic=` parameter is present. Vercel logs 10 occurrences / 5 users, first seen
**2026-06-17**, last **2026-07-28 11:36** — so this has been live and failing for ~6 weeks.

Reproduced directly:

```
/api/og/quote?text=Test&cite=2:255                 → 200, image/png, 11763 bytes ✅
/api/og/quote?text=Test&cite=2:255&arabic=الله نور  → 200, image/png, 0 bytes    🔴
```

It returns HTTP 200 with an empty body, which is why nothing ever alerted — crawlers and
Slack/WhatsApp/Twitter unfurlers just get a blank card.

**Blast radius:** `arabic=` is passed by:
- [src/app/(public)/surahs/[slug]/page.tsx:45](src/app/(public)/surahs/[slug]/page.tsx#L45) and
  [:119](src/app/(public)/surahs/[slug]/page.tsx#L119) — **all 114 surah pages**
- [src/app/(public)/glossary/[slug]/page.tsx:22](src/app/(public)/glossary/[slug]/page.tsx#L22) — every glossary term page

Verified live on production HTML: `/surahs/al-baqarah` and `/surahs/an-nas` both emit an
`og:image` URL ending in `&arabic=%D8%A7%D9%84%D8%A8%D9%82%D8%B1%D8%A9` — i.e. the broken variant.
Pages that omit `arabic=` (articles, about, methodology, paths, contact) are fine.

**Root cause:** [src/app/api/og/quote/route.tsx](src/app/api/og/quote/route.tsx) calls
`new ImageResponse(...)` with **no `fonts` option** and `fontFamily: 'Georgia, serif'`. Satori
(inside `@vercel/og`) falls back to a bundled font whose Arabic GSUB table uses contextual
substitution (lookupType 5, substFormat 3), which satori's OpenType parser does not implement.
There is no Arabic-capable font anywhere in the repo — only `GeistVF.woff` and `GeistMonoVF.woff`
in `src/app/fonts/`.

**ACTION:**
1. Add an Arabic font that satori can shape. Noto Naskh Arabic is the safe choice
   (static `.ttf`, not variable — satori cannot parse variable fonts):
   ```bash
   curl -L -o src/app/fonts/NotoNaskhArabic-Regular.ttf "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoNaskhArabic/NotoNaskhArabic-Regular.ttf"
   ```
2. In `src/app/api/og/quote/route.tsx`, load it and pass it to `ImageResponse`:
   ```ts
   const arabicFont = await fetch(new URL('../../../fonts/NotoNaskhArabic-Regular.ttf', import.meta.url)).then(r => r.arrayBuffer())
   // ...
   return new ImageResponse(<...>, {
     width: 1200, height: 630,
     fonts: [{ name: 'NotoNaskhArabic', data: arabicFont, style: 'normal', weight: 400 }],
   })
   ```
   and set `fontFamily: 'NotoNaskhArabic, Georgia, serif'` on the Arabic `<div>` (line ~55).
   Note: `export const runtime = 'edge'` is set — the `new URL(..., import.meta.url)` fetch
   pattern is the edge-safe way to load the font; do not use `fs`.
3. Guard against silent 0-byte responses regardless — wrap the `ImageResponse` in try/catch and
   fall back to rendering **without** the Arabic block so a share card always exists:
   ```ts
   try { return renderCard({ text, cite, arabic }) }
   catch (e) { console.error('og/quote arabic render failed:', e); return renderCard({ text, cite, arabic: '' }) }
   ```
4. Verify after deploy:
   ```bash
   curl -s -o /dev/null -w "%{http_code} %{size_download}\n" "https://www.ayahguide.com/api/og/quote?text=Test&cite=2:255&arabic=%D8%A7%D9%84%D8%A8%D9%82%D8%B1%D8%A9"
   ```
   Expect a non-zero byte count. Then re-scrape one surah URL in the
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to bust the CDN cache.

---

### 2. Saved reading progress fails for returning users (missing UPDATE RLS policy)

**Issue:** `/api/progress` logged
`code: '42501' — new row violates row-level security policy (USING expression) for table "user_progress"`
(2026-07-27 23:16, 1 user).

**Root cause — confirmed by reading the migrations, not inferred:**
`user_progress` was created in
[supabase/migrations/20260411_user_data.sql:17-26](supabase/migrations/20260411_user_data.sql#L17)
with exactly three policies — `select`, `insert`, `delete`. **There is no `update` policy.**
[src/app/api/progress/route.ts:19](src/app/api/progress/route.ts#L19) calls `.upsert(..., { onConflict: 'user_id,slug,content_type' })`,
which Postgres executes as `INSERT ... ON CONFLICT DO UPDATE`. The INSERT path passes; the
moment the row already exists, the UPDATE path is evaluated against a policy that doesn't exist
and RLS rejects it. The `(USING expression)` wording in the error is the exact signature of a
missing UPDATE policy.

So: **the first time a user marks an item read it works; every subsequent touch of that same
item 500s.** That is why the count is low — it only fires on returning readers.

**Same latent bug in `user_favorites`:** same migration
([lines 41-50](supabase/migrations/20260411_user_data.sql#L41)) creates only select/insert/delete,
and [src/app/api/favorites/route.ts:19](src/app/api/favorites/route.ts#L19) also upserts. It just
hasn't been hit yet. `user_reflections` is fine — it *does* have an update policy.

**ACTION:** Run this in Supabase → SQL Editor (project `cwgsnluoojvgpzlomlkk`). It is additive
and safe to re-run:
```sql
create policy "users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can update own favorites"
  on user_favorites for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```
Then save it as `supabase/migrations/20260728_progress_favorites_update_policy.sql` so the repo
matches production. Verify by signing in, marking the same article read twice, and confirming
no 500 in the Vercel logs.

---

## 🟡 WARNING (fix this week)

### 3. This monitor's own homepage assertion is stale

**Issue:** The health-check spec expects the homepage to contain `"Receive Spiritual Guidance"`.
It does not — that string is gone. The homepage is **healthy**; its H1 is now
*"Read the Quran the way it asks to be read"*, following the landing redesign shipped 2026-07-27.
Left unfixed, this check will report a false 🔴 every week.

**ACTION:** Update the check in `~/.claude/scheduled-tasks/site-health-monitor/SKILL.md` —
change the expected string for `/` to `Read the Quran the way it asks to be read`.

### 4. `/api/health` does not exist

**Issue:** Returns 404. The spec already hedges this with "if it exists" — it doesn't.

**ACTION:** Either drop it from the check list, or add `src/app/api/health/route.ts` returning
`{ ok: true, db: <one cheap Supabase count> }` so future runs get a real end-to-end liveness
signal instead of probing pages. Low priority; the page checks already cover this.

---

## 🟢 ALL CLEAR

**Vercel deployments** — last 3 all `READY`:

| Created | Target | State |
|---------|--------|-------|
| 2026-07-27 16:57 | preview | READY |
| 2026-07-27 07:54 | production | READY |
| 2026-07-27 07:27 | production | READY |

Token valid (no 401/403). Last production deploy 2026-07-27 — content is DB-driven, so this is
expected, not stale.

**Key pages** — all HTTP 200 with expected content present:

| Page | Status | Content check |
|------|--------|---------------|
| `/` | 200 | ✅ H1 + 205 articles + 114 surahs rendered |
| `/surahs` | 200 | ✅ "Surah Map" |
| `/surahs/al-fatiha` | 200 | ✅ الفاتحة |
| `/surahs/al-baqarah` | 200 | ✅ البقرة |
| `/articles` | 200 | ✅ "Explorations in Quranic Meaning" |
| `/glossary` | 200 | ✅ H1 "The Glossary" |
| `/understanding-quran` | 200 | ✅ H1 "How to Read the Quran" |
| `/sitemap.xml` | 200 | ✅ 691 `<loc>` entries |
| `/robots.txt` | 200 | ✅ 10 `User-agent` directives |
| `/api/health` | 404 | route does not exist (see #4) |

No redirect loops, no error pages, no empty renders.

**Database integrity** — 0 posts with NULL/empty slug or title. 0 subscribers with NULL status.
0 posts silently flipped out of `published` in the last 7 days. `surah_visual_data` at full
114-row coverage.

---

## 📊 DB Snapshot

| Type | Status | Count | Δ vs Jul 7 |
|------|--------|-------|------------|
| article | published | 205 | **+30** |
| article | draft | 2 | 0 |
| surah | published | 114 | 0 |
| tadabbur | published | 4 | 0 |
| **Total published** | | **323** | **+30** |

**Subscribers:** 15 active · 5 pending · 1 unsubscribed (**21 total**, +3 vs Jul 7) — no NULL statuses
**surah_visual_data:** 114 rows (complete)
**ayah_records:** 182 rows
**Publishing pipeline:** ✅ healthy — 14 articles published in the last 7 days
(5 on 07-26 = the Quranic-economics cluster, 5 on 07-23, 4 on 07-22)

**Note:** `ayah_records` holds 182 deep tadabburs but only 4 rows exist in `posts` as
`type=tadabbur`, and the sitemap carries 691 URLs against 323 published posts + 114 surah routes.
This is the known standing publish gap (182 deep ayah reflections without standalone reader
pages), not a new regression — tracked separately, not counted as a health issue here.
