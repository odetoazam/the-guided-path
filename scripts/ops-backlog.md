# AyahGuide Ops Backlog

A rolling log of findings and actions from all three weekly agents.
Each agent appends a short entry after every run. Read this file to see
what's been flagged, fixed, and queued — across all ops functions.

---

<!-- Agents append new entries below this line, newest first -->

## 2026-04-10 (run 2) — Analytics Digest

**Wins:** 276 published posts in DB (158 articles, 38 surah-type, 4 tadabbur visible in last 200 results). Massive entity and concept article batch landed Mar 27 – Apr 6. Sentry holds at 5 unresolved issues.
**Issues:** PostHog `$host` on ALL events (including pageviews) is `localhost:3000` — production tracking is dark. The PostHog token (`NEXT_PUBLIC_POSTHOG_KEY`) is either missing from Vercel env vars or the PostHog init is hardcoding `localhost` as the host. This means zero real-user behavioral data exists: 0 scroll_depth, 0 subscribe_attempt, 0 share_click, 0 go_deeper_click in production. Subscriber count unchanged at 16 (last signup Mar 22). Sentry errors cluster on /surahs/:slug/overview (4 of 5 issues, all TypeError family). Tadabbur post `he-called-you-by-your-blanket-muzzammil-73-1-8` has `published_at: null`.
**Actions queued:**
- CRITICAL: Check Vercel environment → confirm `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set; verify PostHog init does not reference localhost
- Fix /surahs/:slug/overview TypeError cluster (null guard on map call, likely in overview tab component)
- Set `published_at` on muzzammil-73-1-8 tadabbur file
**Content gaps flagged:** Muhasabah (flagged 3 consecutive digests, no article exists), At-Tawbah concept explainer (Ramadan demand, only tadabbur exists)

## 2026-04-10 — Analytics Digest

**Traffic:** 223 pageviews since Mar 25 (2 weeks), ~16/day. ~9 unique visitors — almost certainly all Azam. 24.8 pages/visitor confirms no real external traffic yet.
**Top pages:** Homepage (102, 46% of all traffic), /articles (18), /hub/shaytan (16), /posts/psychology-of-shaytan (12), surah pages (al-fatiha, al-anfal, al-baqarah, al-kahf, al-ikhlas). `/hub/musa` already has 2 views.
**Custom events:** ALL ZERO. subscribe_cta_click, scroll_depth, share_click, go_deeper_click — none fired. Either no external users triggering them, or the instrumentation isn't reaching real traffic yet.
**Subscribers:** 16 total. Last signup: 2026-03-22 (3 weeks ago). Zero new this week.
**Sentry errors (new since Apr 7, post-articles-redesign deploy):**
- `t.map is not a function` — 5 events (rendering issue, likely non-array data being mapped)
- `t.parallelRoutes.get` is null — 4 events (Next.js routing error)
- `Cannot read properties of undefined (reading 'map')` — 1 event
- `Cannot read properties of null (reading 'get')` — 1 event
**Wins:** Shaytan hub (16 views) is the top content page — entity hub strategy validated. Articles page redesign is live.
**Issues:** Zero external discovery. Sentry shows rendering errors post-April 6 deploy. 3 weeks since last subscriber.
**Actions queued:**
- Investigate and fix Sentry `t.map is not a function` and `parallelRoutes.get` errors (articles redesign introduced these)
- Build Musa hub — already getting URL hits at /hub/musa
- External SEO/discovery needed before conversion matters
**Content gaps flagged:** Muhasabah entity (community-confirmed demand), Surah At-Tawbah concept article (Ramadan spike)

## 2026-04-06 — Community & Mentions Monitor

**Reddit:** 0 drafts written — domain still fully blocked (same as April 1 run; RSS feed approach NOT yet tested — needs prompt update). 5 revised evergreen template drafts written. See `scripts/community-drafts-2026-04-06.md`.
**Mentions found:** 0 external citations / 0 unlinked mentions / 5 ecosystem opportunities
**Actions queued:**
- MuslimMatters.org outreach NOW DUE (2-week window from April 1 has passed — draft and send)
- Engage with thecollegemuslim.substack.com "Beauty of Tawbah"
- Engage with azlyrahman.substack.com Surah At-Tawbah Ramadan piece
- QuranReflect.com cross-posting investigation (carried from April 1)
- Claim @ayahguide on X/Twitter (still unclaimed)
**Content gaps from community:** Muhasabah entity (top priority), Surah At-Tawbah concept article (Ramadan search spike), Sabr+Tawbah paired article, "Why does Quran repeat stories?" explainer

## 2026-04-01 — Community & Mentions Monitor

**Reddit:** 0 drafts written — Reddit domain fully blocked in this environment (not a 429; domain inaccessible to WebFetch and WebSearch). 5 evergreen template drafts written for high-frequency question types instead. See `scripts/community-drafts-2026-04-01.md`.
**Mentions found:** 0 external citations / 0 unlinked mentions / 3 ecosystem opportunities
**Actions queued:**
- Claim @ayahguide handle on X/Twitter (handle appears unclaimed)
- Engage with MuslimMatters.org "Art of Tadabbur" article (March 2026, high DA) — outreach after 2 weeks of engagement
- Engage with IslamicSelfHelp.com "Art of Tadabbur" article (March 2026) — smaller site, easier first link
- Investigate cross-posting to QuranReflect community (quranreflect.com)
- Deferred: Yaqeen Institute outreach (cite their paper first, then reach out in 4-6 weeks)
**Content gaps from community:** Muhasabah (not covered), Prophet Ilyas (not covered), "Why does Quran repeat stories?" explainer (missing), Sabr+Tawbah paired article, Surah At-Tawbah concept page
**Note on Reddit block:** Future runs should test if reddit.com becomes accessible. Alternative: use RSS feeds from r/islam and r/learnquran (reddit.com/r/islam/.rss) which may bypass the browser-agent restriction.

## 2026-03-31 — Site Health (manual run)

**Status:** 🔴 1 critical fixed · 🟡 2 warnings (assessed)
**Fixed this run:** `/surahs/al-baqarah` was 404 — surah name had no trailing h in data. Fixed + redirect added.
**Actions queued:** Sentry SDK deprecation warnings in build logs (low priority — migrate `sentry.*.config.ts` to `instrumentation.ts` pattern when convenient)
**DB snapshot:** 153 published articles · 114 surah visual rows · 11 active subscribers
**Notes:** `/understanding-quran` flagged as empty by WebFetch — confirmed false positive (dark-mode CSS). Page is fine.
