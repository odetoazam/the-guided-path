# AyahGuide Ops Backlog

A rolling log of findings and actions from all three weekly agents.
Each agent appends a short entry after every run. Read this file to see
what's been flagged, fixed, and queued — across all ops functions.

---

<!-- Agents append new entries below this line, newest first -->

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
