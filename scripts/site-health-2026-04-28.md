# Site Health Report — 2026-04-28

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | ✅ | Last 3 prod deploys all READY |
| Key Pages | ✅ | 9 pages checked, 0 issues (api/health 404 expected) |
| Database | 🟡 | Clean integrity; 0 new posts in 7 days |
| Runtime Errors | ✅ | No errors in 5-min live log sample |

---

## 🔴 CRITICAL (carried over — fix today)

**Issue:** PostHog `$host = localhost:3000` — production behavioral data still dark
Now 5+ consecutive weeks with no real-user events landing in production. Latest deploy is 5 days old, no PostHog-related env or code change has shipped since the Apr 21 report flagged this.
**ACTION:** In Vercel Dashboard → Settings → Environment Variables, confirm `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set for the **Production** environment (not just Preview). Then check `src/app/providers.tsx` (or wherever `posthog.init()` is called) for any hardcoded `api_host: 'localhost:3000'` or missing `process.env.NEXT_PUBLIC_POSTHOG_HOST` reference. Trigger a redeploy after fixing.

**Issue:** Sentry TypeError `undefined.map` on `/surahs/:slug` — unverified status
Same TypeError flagged in Apr 14 / Apr 21 reports. The Quraysh-specific manifestation was fixed Apr 21 (data-only fix on `surah_visual_data` for surah 106), but the unguarded `.map()` call in code likely still exists for any other surah whose visual data drifts.
**ACTION:** Find every `.map()` invoked on data sourced from `surah_visual_data` (likely in `src/app/(public)/surahs/[slug]/...` or a shared diagram component). Wrap each with `(arr ?? []).map(...)`. This is a defense-in-depth fix — without it, any future `surah_visual_data` row using the wrong shape will 500 the page.

---

## 🟡 WARNING (fix this week)

**Issue:** Zero new posts in the last 7 days
Last published article was 2026-04-20 ("The River That Decided the Battle" / "I Am Better" / "The Reason That Arrived After the Decision"). Threshold for the SKILL.md flag is 14 days; we're at 8. Not a bug — flagging now so a 14-day-silent next week isn't a surprise.
**ACTION:** Note it. If the Apr 20 batch was the planned cadence, no action. If not, queue a tadabbur or article session.

**Issue:** Latest deploy is 5 days old; tadabbur content edits not yet pushed
`git status` shows ~864 modified files in `content/tadabbur/` (mostly the corpus-edit work). None committed. Last commit was 6 days ago.
**ACTION:** When the corpus-edit pass is ready, commit and push to trigger a new deploy. No code-level urgency — content drives the deploy here.

---

## 🟢 RESOLVED SINCE LAST REPORT

- **`guidance_entry_point` PostHog `path_id` null** — fixed in commit `169c378 fix: add path_id to guidance_entry_point PostHog event` (6 days ago). Removing from carry-over list.

---

## 🟢 ALL CLEAR

- **Vercel Deployments**: Last 3 production deployments READY (5d / 6d / 6d ago, builds 1–3 min). Three ERROR deployments visible 9 days ago but recovered before the next attempt.
- **Homepage** (`/`): "Receive Spiritual Guidance From Quranic Contemplation" heading present. ✅
- **Surah Map** (`/surahs`): "The Surah Map" heading, 114 chapters listed. ✅
- **Surah pages** (`/surahs/al-fatiha`, `/surahs/al-baqarah`): Arabic text + tadabbur content render correctly. ✅
- **Articles** (`/articles`): "Explorations in Quranic Meaning" heading; "160 of 161 articles" footer. ✅
- **Glossary** (`/glossary`): "111 of 111 terms" — full coverage. ✅
- **Understanding Quran** (`/understanding-quran`): Tafsir/tadabbur frameworks render. ✅
- **Sitemap** (`/sitemap.xml`): Valid XML, 800+ URLs, lastmod 2026-04-23. ✅
- **Robots.txt** (`/robots.txt`): Present; AI crawler policy intact (PerplexityBot/ChatGPT-User/Claude-Web allowed; GPTBot/CCBot/ClaudeBot/anthropic-ai blocked). ✅
- **`/api/health`**: 404 — endpoint not implemented (expected, not a bug).
- **Database integrity**: Zero posts with null/empty slug or title.
- **`surah_visual_data`**: 114/114 rows — full coverage.
- **Subscribers**: 16 total (11 active · 4 pending · 1 unsubscribed). No NULL statuses.
- **Runtime errors**: 5-minute live `vercel logs` stream produced no error lines. (Note: CLI can't replay 24h history; absence over 5 min is a weak positive, not a guarantee.)

---

## 📊 DB Snapshot

| Type | Status | Count | Δ vs Apr 21 |
|------|--------|-------|-------------|
| article | published | 161 | 0 |
| article | draft | 2 | 0 |
| surah | published | 114 | 0 |
| tadabbur | published | 4 | 0 |
| **Total published** | | **279** | **0** |

**Subscribers:** 11 active · 4 pending · 1 unsubscribed (16 total) — unchanged from Apr 21 (3rd consecutive week flat)
**surah_visual_data:** 114 rows (complete)

**Recent activity (last 7 days):** 0 published posts. Last batch was Apr 20.

---

## Carried-Over Actions (from prior sessions)

- **CRITICAL**: Fix PostHog `$host = localhost:3000` — 5+ weeks of dark production analytics
- **CRITICAL**: Add null guards on `surah_visual_data` `.map()` calls (Sentry TypeError defense-in-depth)
- Backfill `publish_date` on 161 articles: `UPDATE posts SET publish_date = published_at WHERE publish_date IS NULL AND type = 'article'`
- Update SKILL.md health monitor: replace any remaining `post_type` references with `type`
- Subscriber growth has been flat at 16 for 3 weeks — not a bug, but worth a product/marketing nudge
