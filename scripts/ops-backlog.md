# AyahGuide Ops Backlog

A rolling log of findings and actions from all three weekly agents.
Each agent appends a short entry after every run. Read this file to see
what's been flagged, fixed, and queued — across all ops functions.

---

<!-- Agents append new entries below this line, newest first -->

## 2026-07-28 — Site Health

**Status:** 🔴 2 critical, 2 warnings
**Fixed this run:** Nothing regressed from Jul 7. Deployments, all 10 key pages, and DB integrity are clean. Both criticals are pre-existing silent failures surfaced for the first time by the Vercel runtime-error check — neither was visible from page checks alone.
**Actions queued:**
- 🔴 **OG images broken on all 114 surah pages + all glossary pages.** `/api/og/quote` returns a 0-byte PNG (HTTP 200, so nothing alerted) whenever `arabic=` is passed. Failing since 2026-06-17. Cause: `ImageResponse` gets no `fonts` option and no Arabic-capable font exists in the repo, so satori chokes on the fallback font's contextual-substitution table. Fix = add `NotoNaskhArabic-Regular.ttf` to `src/app/fonts/`, pass it via `fonts:`, and add a try/catch fallback that drops the Arabic block instead of emitting an empty image.
- 🔴 **Saved reading progress 500s for returning users.** `user_progress` has select/insert/delete RLS policies but no **update** policy, while `/api/progress` upserts — so the first mark succeeds and every repeat fails. `user_favorites` has the identical latent bug. Fix = two `create policy ... for update` statements (SQL in the report), then commit as `supabase/migrations/20260728_progress_favorites_update_policy.sql`.
- 🟡 Update this monitor's homepage assertion — it still expects "Receive Spiritual Guidance", removed in the Jul 27 landing redesign. Will throw a false positive every week until changed.
- 🟡 `/api/health` doesn't exist (404). Either drop it from the check list or build it.

**DB snapshot:** 205 published articles (+30 vs Jul 7) · 114 surahs · 4 tadabbur · 15 active subscribers (21 total) · 114 surah_visual_data rows · 691 sitemap URLs

## 2026-07-07 — Site Health

**Status:** 🟡 1 warning (0 critical)
**Fixed this run:** N/A — first Site Health run since Apr 28; no prior-flagged health issues had regressed. All 10 key pages serving 200s, DB clean.
**Actions queued:**
- Fix OG font error on `/api/og/quote` — `@vercel/og`/Satori rejects the Arabic font's substFormat-3 GSUB lookup (`lookupType: 5 - substFormat: 3 is not yet supported`), breaking some quote share-cards. Swap to Noto Naskh Arabic / Amiri static subset + try/catch fallback. 6 hits / 3 users, persistent since Apr 21.
- Still can't query Vercel deploy status/build logs (no MCP deploy tool; `.env.local` OIDC token rejected by REST API). Add a personal Vercel access token to unblock (carried over from 2026-06-13 digest).
**DB snapshot:** 293 published (175 articles · 114 surahs · 4 tadabbur; +14 articles vs Apr 28) · 114 surah_visual_data rows · 18 subscribers (12 active/5 pending/1 unsub, +2). Newest post 2026-07-05.

## 2026-06-13 — Analytics Digest

**Wins:** Biggest traffic week on record — 136 pageviews / 65 sessions, up 4.9× WoW (28 / 23 prior). Custom-event instrumentation is **confirmed firing in production** (scroll_depth 133, guidance_entry_point 102, surah_tab_switch 30) — resolves the multi-week "custom events dark in prod" finding. ChatGPT referrals appear for the first time (3 visits), Google organic 36 — GEO/AEO investment is landing. Sentry down to 1 unresolved issue (from 5). Scroll depth healthy: 53% of engaged pages reach 100%.
**Issues:** Subscribe funnel is the bottleneck — 1 attempt / 1 success in 30 days vs 65 sessions this week (18 subscribers total, +2 since April). One benign Sentry error (`AbortError` on `/`, 0 users, last seen Jun 2). Could not query Vercel API — OIDC token in .env.local is rejected by the REST API (`invalidToken`); needs a personal Vercel access token. Supabase `posts` has no `view_count` column (engagement must come from PostHog $pageview, not DB). Audience is mobile-majority (35 mobile / 29 desktop).
**Actions queued:** Redesign the subscribe CTA (mobile-first inline/end-of-article placement or a lead magnet); add a Vercel personal access token to .env.local so deploy/runtime logs are queryable; extend the high-performing "names of" eschatology listicle format with FAQPage schema.
**Content gaps flagged:** Eschatology / "names of the Fire" + Qiyamah-names cluster is overperforming and under-supplied; Ar-Rahman / Nuh / An-Nisa drawing traffic without deep hub treatment.

## 2026-04-30 — Analytics Digest

**Wins:**
- Production PostHog tracking is finally live (14 of 35 pageviews this week have `$host = www.ayahguide.com` and `$referring_domain = www.google.com`) — first real organic-traffic data after 5+ weeks of localhost-only. Pageviews 35 vs prior 7d 4 (8.75×).
- 5 surah pages drew Google referrals (al-alaq, al-baqarah, al-fatiha, ghafir, fatir) — Quran-specific search traffic is starting to land.
- Two prophet-narrative posts converted into deep engagement: `/posts/ayyub-yunus-two-complaints-quran` and `/posts/musa-burning-bush-first-conversation` — 6 unique scroll_depth events each, the only multi-engagement non-home pages.

**Issues:**
- **0 `subscribe_attempt` / 0 `subscribe_success` / 0 `share_click` events in 7 days** — instrumentation likely not deployed to production despite components existing in the codebase. Subscribers held flat at 16 (no new signups; matches event drought).
- **All 163 `type=article` posts have `surah_number = NULL`** in Supabase — the field is set on `type=surah` posts only, blocking related-article queries.
- **Sentry: 5 unresolved issues, all on `/surahs/:slug` paths** (3× TypeError on `.map()`, 1× null `parallelRoutes.get`, 1× audio AbortError); first seen 2026-04-07 to 2026-04-18, none new in 7d, but still firing on real visitors arriving from Google.
- **0 deploys in last 7 days** (last prod deploy 2026-04-22). 10-day publishing gap — last article 2026-04-20.
- **`guidance_entry_point` event property schema is inconsistent** — 19 events fired, but some have `path_id` (null), others have `path` (set), others have neither. Different code paths emit different shapes; standardize the helper.
- **`hub_tab_switch` fired only 1× in 7 days** despite hub page traffic — tab UX may be underused or the default tab is sufficient.
- 2 rageclicks recorded — small sample, but worth a follow-up check on which page.

**Actions queued:**
- Fix the 5 unresolved Sentry issues on `/surahs/:slug` (null guards on `.map()`; check Suspense/parallel-route boundary in `/overview`; surface or swallow the audio AbortError)
- Verify `subscribe_attempt`, `subscribe_success`, `share_click` event firing in production (open the live site, trigger each, check PostHog Live Events) — if missing, find the gap in `src/lib/analytics.ts` consumers
- Backfill `posts.surah_number` for `type=article` rows where the post is clearly about a surah (start with the slugs that name a surah/prophet)
- Standardize `guidance_entry_point` payload — single helper that always emits `{path_id, entry_label, source}`
- Confirm whether the `/hub/muhasaba` tab UX is actually engaged or whether the default-tab content is serving everyone

**Content gaps flagged:**
- al-alaq, ghafir, fatir, al-baqarah, al-fatiha — all received Google referrals this week, none have any `type=article` companion post. Companion deep-dives + the surah_number backfill would surface them as "go deeper" automatically.
- More paired-prophet narrative pieces (Ibrahim/Yusuf, Dawud/Sulayman, Hud/Salih) — the only two posts with multi-visitor engagement this week were both in this format.

## 2026-04-28 — Site Health

**Status:** 🟡 2 warnings (carried-over critical items unchanged)
**Fixed this run:** PostHog `guidance_entry_point` `path_id` null — verified resolved by commit `169c378` (6 days ago); removed from carry-over list
**Actions queued:**
- 🔴 PostHog `$host = localhost:3000` — 5+ weeks dark; check Vercel Production env vars for `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` and `posthog.init()` config
- 🔴 Add null guards on `surah_visual_data` `.map()` calls — Quraysh-specific fix Apr 21 was data-only; code path still vulnerable
- 🟡 0 new posts in 7 days (last: Apr 20); not yet at 14-day flag threshold
- 🟡 ~864 modified `content/tadabbur/` files uncommitted; deploy is current but content edits pending push
- 🟡 Subscribers flat at 16 for 3 consecutive weeks (11 active · 4 pending · 1 unsub)
**DB snapshot:** 161 published articles · 114 surahs · 4 tadabbur · 11 active subscribers (Δ vs Apr 21: 0 across all)

## 2026-04-22 — Community & Mentions Monitor

**Reddit:** 0 drafts — domain still fully blocked (5th consecutive run; not a 429). 5 archetype drafts written for user review in community-drafts-2026-04-22.md. Reddit access requires structural fix — RSS/third-party API or manual thread submission.
**Mentions found:** 0 external citations / 0 unlinked mentions / 3 ecosystem opportunities
**Actions queued:**
- 🔴 URGENT: MuslimMatters "Art of Tadabbur" outreach — now 7 weeks old, send email this week or close the opportunity (see draft in community-drafts-2026-04-22.md)
- 🔴 URGENT: Claim @ayahguide on X/Twitter — 5th consecutive flag, handle still unclaimed
- 🟡 Engage Quran4ever blog (quran4ever2026.wordpress.com) — new find, active April 2026, daily Surah Ta Ha tafsir, same niche; engage 2 weeks then outreach
- 🟡 Engage Sincerely, Sumayah Substack (carried from Apr 15) — start engaging content before outreach
**Content gaps from community:** Muhasabah hub (5th flag — highest priority), Musa hub (6 articles exist to anchor it), "Why does Quran repeat stories?" meta-explainer, Surah Al-Kahf hub article, "Most misunderstood ayahs" framing article

## 2026-04-21 — Site Health

**Status:** 🔴→✅ 1 critical found and fixed
**Fixed this run:** `/surahs/quraysh` 500 error (12 hits in 24h) — `causalChain.links` renamed to `causalChain.sections` in Supabase. Data-only fix, no deploy needed. Page now 200.
**Actions queued:**
- ~~CRITICAL: Fix PostHog localhost tracking~~ — CLOSED 2026-04-21. Keys were set in Vercel since Mar 22. "Localhost" events = Azam's own dev sessions. No external users yet, not a config bug.
- ~~Fix publish_date null on 161 articles~~ — CLOSED 2026-04-21. SQL backfill done.
- ~~Fix guidance_entry_point path_id null~~ — CLOSED 2026-04-21. Now extracts slug from /paths/[slug] URLs. Deployed.
- ~~CRITICAL: Sentry TypeError undefined.map on /surahs/:slug~~ — CLOSED 2026-04-21. Root was /overview route (now permanently redirected to /surahs/:slug). No errors in 72h logs.
- ~~PostHog localhost tracking~~ — CLOSED 2026-04-21. Keys were in Vercel since Mar 22. Was a no-traffic problem, not a config bug.
**DB snapshot:** 279 published posts (161 articles · 114 surahs · 4 tadabbur) · 11 active subscribers

## 2026-04-15 — Community & Mentions Monitor

**Reddit:** 0 drafts — domain still fully blocked (4th consecutive run; not a 429). Skill prompt needs RSS/webhook fallback — Reddit will never be accessible via WebFetch or site: search in this environment.
**Mentions found:** 0 external citations / 0 unlinked mentions / 4 ecosystem opportunities
**Actions queued:**
- MuslimMatters.org outreach OVERDUE (6 weeks since publication of "The Art of Tadabbur" — send cold email now before window closes)
- Engage Sincerely, Sumayah Substack (sumayah.substack.com) — 9,000+ subscribers, Quranic reflection newsletter, NEW find — engage for 2 weeks then outreach
- Engage "Beyond the Ayah with Batool" podcast — NEW find, same niche, audio format, complement to AyahGuide written content
- Claim @ayahguide on X/Twitter (still unclaimed — 3rd consecutive flag)
- Engage thecollegemuslim.substack.com + azlyrahman.substack.com (carried from April 6)
**Content gaps from community:** Muhasabah hub (4th consecutive flag — highest priority), Musa hub (URL hits with no content, 6 articles already exist to anchor it), "Why does Quran repeat stories?" meta-explainer, Surah Al-Kahf deep-dive hub article

## 2026-04-14 — Site Health

**Status:** 🟡 2 warnings
**Fixed this run:** Corrected DB queries at runtime (health monitor script uses `post_type` but column is `type` — script needs update)
**Actions queued:**
- Update health monitor SQL: replace `post_type` with `type` in all queries
- Update homepage copy check string (old: "Appreciate Quranic depths" — stale)
- Investigate `/posts` redirect: confirm Location header present in browser network tab
- (Carried over) Fix PostHog localhost tracking — CRITICAL, 3 weeks dark
- (Carried over) Fix Sentry TypeError undefined.map on /surahs/:slug
- (Carried over) SET publish_date = published_at WHERE publish_date IS NULL AND type = 'article'
**DB snapshot:** 158 published articles · 114 surahs · 4 tadabbur · 11 active subscribers

## 2026-04-13 — Analytics Digest

**Wins:** Guided Paths feature shipped (4 paths, homepage + articles entry points). `guidance_entry_point` PostHog event instrumented and firing. 5 clean Vercel deploys this week, zero build failures. Al-Kahf tadabbur sequence 18:99–108 completed and validated. 276 published posts total.
**Issues:** PostHog still 100% localhost:3000 — 3rd consecutive week with zero production behavioral data. Sentry TypeError "Cannot read properties of undefined (reading 'map')" still firing as of Apr 11 (3 new events this week — live bug). 158/158 articles have `publish_date = null` (affects sitemap + JSON-LD structured data). `guidance_entry_point` events fire but `path_id` property is null — property not being captured. Supabase `analytics` table is entirely empty — DB-side view tracking not running. Zero new subscribers (week 3 at 16 total).
**Actions queued:**
- Fix `publish_date` null on 158 articles — SET publish_date = published_at WHERE publish_date IS NULL AND type = 'article'
- Fix Sentry TypeError: undefined.map — still occurring on /surahs/:slug route (3 events Apr 9–11)
- Fix `guidance_entry_point` `path_id` property — check Guided Paths instrumentation code and ensure path ID is passed
- CRITICAL (carried over): Fix PostHog localhost tracking — confirm NEXT_PUBLIC_POSTHOG_KEY in Vercel prod env; check PostHog init host config
**Content gaps flagged:** Muhasabah hub (4 consecutive digests, no article exists), Musa hub (/hub/musa getting URL hits, no content)

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
