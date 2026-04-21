# Site Health Report — 2026-04-14

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | ✅ | Last 3 all READY |
| Key Pages | 🟡 | 10 pages checked, 1 issue (/posts redirect) |
| Database | ✅ | Clean — schema note logged |
| Runtime Errors | ✅ | Zero errors in last 24h |

---

## 🟡 WARNING (fix this week)

**Issue:** `/posts` redirect returns "Redirect missing Location header"
The route previously redirected to `/articles`, but WebFetch reports the redirect response has no Location header, suggesting the redirect may be misconfigured or broken for some clients.
**ACTION:** Open `https://www.ayahguide.com/posts` in a browser and check the network tab. If it redirects cleanly to `/articles`, this is a WebFetch tool limitation (known) and can be ignored. If it results in a blank page or 3xx with no destination, check `src/app/(public)/posts/page.tsx` or the middleware redirect config.

**Issue:** Health monitor script uses wrong column name (`post_type`) — actual column is `type`
Three of the DB queries in this script fail every run because the posts table uses `type` not `post_type`. Corrected queries were run manually this session.
**ACTION:** Update this SKILL.md file — replace all instances of `post_type` with `type` in the SQL queries. Also update expected check string for homepage from "Appreciate Quranic depths" to current copy (page loaded fine but copy has changed).

---

## 🟢 ALL CLEAR

- **Vercel Deployments**: Last 3 production deployments all READY. Latest: Al-Kahf 18:99 tadabbur (95e6b53). Two historical ERRORs (positions 16–17) are old and fully superseded.
- **Homepage** (`/`): Loads with AyahGuide content — 114 surahs and guided paths visible. (Copy check string is stale, not an error.)
- **Surah Map** (`/surahs`): "Surah Map" heading found. ✅
- **Surah pages** (`/surahs/al-fatiha`, `/surahs/al-baqarah`): Arabic content renders correctly. ✅
- **Glossary** (`/glossary`): 111 terms loading across all categories. ✅
- **Understanding Quran** (`/understanding-quran`): Full content present (tafsir, tadabbur, balaghah sections). ✅
- **Sitemap** (`/sitemap.xml`): Valid XML, 850+ URLs, correct format and priorities. ✅
- **Robots.txt** (`/robots.txt`): Present, User-agent rules configured, AI crawler blocks in place. ✅
- **No null slugs/titles**: Zero corrupt posts found. ✅
- **surah_visual_data**: 114/114 rows — full coverage. ✅
- **Runtime errors**: Zero error/fatal logs in production over last 24 hours. ✅
- `/api/health`: 404 — endpoint not implemented (expected, not a bug).

---

## 📊 DB Snapshot

| Type | Status | Count |
|------|--------|-------|
| article | published | 158 |
| article | draft | 2 |
| surah | published | 114 |
| tadabbur | published | 4 |
| **Total published** | | **276** |

**Subscribers:** 11 active · 4 pending · 1 unsubscribed (16 total)
**surah_visual_data:** 114 rows (complete)

**Content pipeline note:** No new posts added to DB in the last 7 days. 293+ tadabbur files exist on the filesystem but only 4 are published — the ayah_records migration syncs these to a separate table, not the posts table. This is expected behavior (tadabbur lives in ayah_records, not posts). The 4 published tadabbur in posts are the manually promoted standalone reflections.

---

## Schema Note (for monitor maintenance)
The `posts` table columns are: `id, title, slug, excerpt, content_json, content_html, featured_image, status, publish_date, scheduled_date, seo_title, seo_description, tags, reading_time_minutes, featured, quran_refs, email_sent, email_sent_at, created_by, created_at, updated_at, published_at, surah_number, type`

The column is **`type`** (not `post_type`). Update health monitor SQL queries accordingly.

---

## Carried-Over Actions (from analytics digest 2026-04-13)
These are not new findings but remain unresolved:
- **CRITICAL**: PostHog localhost tracking — 3 consecutive weeks of zero production behavioral data
- **CRITICAL**: Sentry TypeError undefined.map on /surahs/:slug (3 new events this week)
- Fix `publish_date` null on 158 articles: `SET publish_date = published_at WHERE publish_date IS NULL AND type = 'article'`
- Fix `guidance_entry_point` `path_id` null property in PostHog events
