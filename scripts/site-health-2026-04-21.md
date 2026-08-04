# Site Health Report — 2026-04-21

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | ✅ | Last 3 all READY |
| Key Pages | ✅ | 10 pages checked, 0 issues |
| Database | ✅ | Clean — 279 published, +3 from last week |
| Runtime Errors | 🔴→✅ | 1 critical found and **fixed this run** |

---

## 🟢 FIXED THIS RUN

**Issue:** `/surahs/quraysh` returning 500 — 12 errors in last 24h
**Root cause:** `SectionJourney` component expects `data.sections` array, but Quraysh's `causalChain` diagram data in Supabase used `links` instead. `data.sections.map()` on `undefined` threw `TypeError: Cannot read properties of undefined (reading 'map')`.
**Fix applied:** Updated `surah_visual_data` for `surah_number = 106` — renamed `causalChain.links` → `causalChain.sections` via SQL. Verified: page now returns 200 and renders correctly.
**No code change needed** — data-only fix. All other surahs already used `sections` consistently.

---

## 🔴 CRITICAL (carried over — fix today)

**Issue:** PostHog localhost tracking — production behavioral data is dark
All PostHog events (including pageviews) have `$host = localhost:3000`. This is at least 4 consecutive weeks with zero real-user behavioral data (0 scroll_depth, 0 subscribe_attempt, 0 share_click in production).
**ACTION:** In Vercel Dashboard → Settings → Environment Variables, confirm `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set for the Production environment (not just Preview). Also verify PostHog init in the app does not hardcode a localhost host string. Check `src/app/providers.tsx` or wherever PostHog is initialized.

**Issue:** Sentry TypeError `undefined.map` on `/surahs/:slug`
Recurring TypeError "Cannot read properties of undefined (reading 'map')" on surah detail pages. Was 3 new events as of Apr 11 — unknown if still active but not fixed.
**ACTION:** Open the surah overview tab component (likely `src/app/(public)/surahs/[slug]/overview/page.tsx` or a tab component). Find any `.map()` call on data from a DB query and add a null guard: `(data ?? []).map(...)`.

---

## 🟢 ALL CLEAR

- **Vercel Deployments**: Last 3 deployments all READY. Latest: Production (12h ago, 2m build). No ERROR or stuck builds.
- **Homepage** (`/`): Loads with "Receive Spiritual Guidance From Quranic Contemplation" heading. ✅
- **Surah Map** (`/surahs`): "The Surah Map" heading found, all 114 chapters listed. ✅
- **Surah pages** (`/surahs/al-fatiha`, `/surahs/al-baqarah`): Arabic text renders, full tadabbur content present. ✅
- **Articles** (`/articles`): "Explorations in Quranic Meaning" heading found, 160+ articles listed. ✅
- **Glossary** (`/glossary`): 111/111 terms loaded across all categories. ✅
- **Understanding Quran** (`/understanding-quran`): Full content present — tafsir vs. tadabbur, study frameworks, FAQ, full A–Z glossary. ✅
- **Sitemap** (`/sitemap.xml`): Valid XML, 1000+ URLs, correct `<loc>/<lastmod>/<priority>` structure. Last modified 2026-04-21T03:50:43Z. ✅
- **Robots.txt** (`/robots.txt`): Present, User-agent rules configured, AI crawler policy in place (PerplexityBot/ChatGPT-User/Claude-Web allowed; GPTBot/CCBot/anthropic-ai training blocked). ✅
- **No null slugs/titles**: Zero corrupt posts found. ✅
- **surah_visual_data**: 114/114 rows — full coverage. ✅
- **`/api/health`**: 404 — endpoint not implemented (expected, not a bug).

---

## 📊 DB Snapshot

| Type | Status | Count | Δ vs Apr 14 |
|------|--------|-------|-------------|
| article | published | 161 | +3 |
| article | draft | 2 | 0 |
| surah | published | 114 | 0 |
| tadabbur | published | 4 | 0 |
| **Total published** | | **279** | **+3** |

**Subscribers:** 11 active · 4 pending · 1 unsubscribed (16 total) — unchanged from Apr 14
**surah_visual_data:** 114 rows (complete)

**Recent activity (last 7 days):**
- `[published][article]` The Reason That Arrived After the Decision — 2026-04-20
- `[published][article]` I Am Better: The First Time Pride Sounded Like Reason — 2026-04-20
- `[published][article]` The River That Decided the Battle — 2026-04-20

3 new articles published Apr 20 — pipeline active. ✅

---

## Carried-Over Actions (from prior sessions — not new findings)

- **CRITICAL**: Fix PostHog `$host = localhost:3000` — 4+ weeks of dark production analytics
- **CRITICAL**: Fix Sentry TypeError `undefined.map` on `/surahs/:slug`
- Fix `publish_date` null on 161 articles: `SET publish_date = published_at WHERE publish_date IS NULL AND type = 'article'`
- Fix `guidance_entry_point` `path_id` null property in PostHog events
- Update SKILL.md health monitor: replace any remaining `post_type` references with `type`
