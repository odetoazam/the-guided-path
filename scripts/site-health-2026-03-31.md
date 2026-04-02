# Site Health Report — 2026-03-31

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | 🟡 | 2 of last 5 deployments are ERROR (older); latest is READY |
| Key Pages | 🔴 | 9 pages checked, 1 hard 404 (al-baqarah); 1 page renders error shell (understanding-quran) |
| Database | 🟢 | 267 posts, 114 visual rows, 0 null slugs/titles; subscribers healthy |
| Runtime Errors | 🟢 | No 500s or FUNCTION_INVOCATION_FAILED in last 24h logs |

---

## 🔴 CRITICAL (fix today)

### Issue: /surahs/al-baqarah returns HTTP 404
**What's happening:** The slug mismatch between the static SURAHS data and the DB/URL. In `src/lib/surahs.ts` line 14, Surah 2 is defined as `nameEn: "Al-Baqara"` (no trailing 'h'). The `surahSlug()` function lowercases this to `al-baqara`. When a visitor hits `/surahs/al-baqarah` (with 'h', which is the slug stored in the DB), `surahBySlug("al-baqarah")` finds no match in the slug map, returns `undefined`, and the page calls `notFound()`.

The DB record for surah 2 has `slug = "al-baqarah"` (with 'h') and `status = "published"`. The visual data for surah 2 is also fully populated. Only the slug lookup in the SURAHS static array is mismatched.

**ACTION:**
1. Open `/Users/azamkhan/the-guided-path/src/lib/surahs.ts`
2. Line 14: change `nameEn: "Al-Baqara"` to `nameEn: "Al-Baqarah"` (add trailing 'h')
3. Verify `surahSlug("Al-Baqarah")` → `"al-baqarah"` matches the DB slug and URL
4. Also audit lines nearby for other surahs with similar transliteration inconsistencies (e.g. check At-Tawbah vs At-Tawba, Al-Maidah vs Al-Ma'idah)
5. Run `npx tsc --noEmit` locally, then push — should resolve immediately on next deploy

---

## 🟡 WARNING (fix this week)

### Issue: 2 of last 5 deployments were ERROR (deployments dpl_8QTdJcAWowuTQ2FjB91oyEjD27uR and dpl_GGwLAaqjnLzFShLvzFP5mk2BtgoT)
**What happened:** These two failed builds (commits `544d7aa` and `c3b4333`) show `Module not found: Can't resolve './StructuralArcs'`, `'./LandmarkVerses'`, `'./ContrastMap'`, `'./PolarMap'`, `'./FourConditions'`, `'./WordMirror'`, and `'./RefrainPattern'` from `DiagramRenderer.tsx`. These components were referenced in `src/components/surah/diagrams/DiagramRenderer.tsx` but not committed alongside it.

The latest deploy (`dpl_FpmAB7q6nHH9u5pPv18cW2eh6oNJ`, commit `a46b849`) fixed this by adding the missing component files. **The site is currently serving the fixed build.** However, the 2 failed deploys sit in the deployment history as ERROR.

**ACTION:**
- No immediate action needed — site is running the fixed build.
- To prevent recurrence: before committing `DiagramRenderer.tsx` changes, run `git diff --name-only HEAD` to verify all imported component files are staged.
- Consider adding a pre-push hook that runs `npx tsc --noEmit` to catch missing module errors before they reach Vercel.

### Issue: /understanding-quran page renders empty (no recognizable content in HTTP 200 body)
**What's happening:** The page returns HTTP 200 but the body contains a Next.js error shell (`__next_error__` id in HTML). Curl fetches return nothing matching expected content words. This suggests a server component is throwing an unhandled exception that Next.js is suppressing to a silent error page.

**ACTION:**
1. Check Vercel runtime logs filtered to `/understanding-quran` path (not visible in the 24h window checked today — may need a longer window or direct visit to trigger)
2. Open `src/app/(public)/understanding-quran/page.tsx` and look for any DB queries without try/catch or optional chaining that could throw on null data
3. Add error boundary or check if the page depends on a DB record that may have been deleted
4. Visit the page in browser with DevTools open to see the actual client-side error message

### Issue: Sentry SDK deprecation warnings in build logs
**What's happening:** Build logs for multiple deployments show:
- `sentry.server.config.ts` content should be moved into `instrumentation.ts` register() function
- `sentry.edge.config.ts` same issue
- `sentry.client.config.ts` should be renamed to `instrumentation-client.ts`

These are warnings now but will break Sentry error tracking in a future Next.js/Sentry version.

**ACTION:**
1. Follow Sentry's Next.js migration guide to move `sentry.server.config.ts` content into `src/instrumentation.ts` inside a `register()` function
2. Rename `sentry.client.config.ts` to `instrumentation-client.ts`
3. Delete `sentry.edge.config.ts` after migrating its content
4. Re-run `npx @sentry/nextjs wizard` if available, or follow: https://docs.sentry.io/platforms/javascript/guides/nextjs/

---

## 🟢 ALL CLEAR

- **Homepage** `/` — HTTP 200, content loads
- **Surah Map** `/surahs` — HTTP 200, "Surah Map" content confirmed
- **Al-Fatiha** `/surahs/al-fatiha` — HTTP 200, Arabic content confirmed
- **Posts** `/posts` — HTTP 200, "Quranic Reflections" confirmed
- **Glossary** `/glossary` — HTTP 200
- **Sitemap** `/sitemap.xml` — HTTP 200, valid XML with URLs (54,351 bytes)
- **robots.txt** `/robots.txt` — HTTP 200, "User-agent" confirmed, 909 bytes
- **Latest Vercel deployment** `dpl_FpmAB7q6nHH9u5pPv18cW2eh6oNJ` — READY, serving production
- **Database integrity** — 0 posts with null slugs or null/empty titles
- **surah_visual_data** — 114 rows present (all surahs covered)
- **Runtime logs (last 24h)** — 0 errors, 0 FUNCTION_INVOCATION_FAILED, 0 500s; all logged requests returned 200/304
- **Recent content activity** — 20 new articles published on 2026-03-30 (active production pipeline confirmed)

---

## 📊 DB Snapshot

### Posts by type and status
| Type | Status | Count |
|------|--------|-------|
| article | draft | 2 |
| article | published | 153 |
| surah | published | 114 |
| **Total** | | **269** |

### Visual Data
| Table | Rows |
|-------|------|
| surah_visual_data | 114 |

### Subscribers
| Status | Count |
|--------|-------|
| active | 11 |
| pending | 4 |
| unsubscribed | 1 |
| **Total** | **16** |

### Recent content (last 7 days)
20 articles published on 2026-03-30, covering topics including: Bilqis and Sulayman, Qarun, Dawud, Sulayman's Wind, Bani Isra'il's Crossing, and several conceptual pieces (Rizq, Mahabbah root, Khawf vs Khashya, Al-Siddiq). All are `type=article`, `status=published`.

---

*Report generated: 2026-03-31 | Checks performed via Vercel MCP, Supabase MCP, and curl*
