# Site Health Report — 2026-07-07

## Summary
| Check | Status | Issues Found |
|-------|--------|--------------|
| Vercel Deployments | 🟡 | Not verifiable this session (no deploy-listing tool / OIDC token rejected). Site is live and serving 200s — inferred healthy. |
| Key Pages | ✅ | 10 checked, 0 real issues (`/api/health` 404 = endpoint doesn't exist, expected) |
| Database | ✅ | Clean — 293 published, no corrupt rows, subscribers healthy |
| Runtime Errors | 🟡 | 1 error group — OG font error on `/api/og/quote` (6 hits / 3 users, low volume, persistent) |

---

## 🔴 CRITICAL (fix today)
None. No broken pages, no data loss, no publishing-pipeline failure.

---

## 🟡 WARNING (fix this week)

### 1. OG image font error on `/api/og/quote`
**Issue:** The only runtime error group in the last 24h (and persistently since 2026-04-21) is:
```
Error: lookupType: 5 - substFormat: 3 is not yet supported
  at node_modules/next/dist/compiled/@vercel/og/index.edge.js
route=/api/og/quote  count=6  users=3
first=2026-04-21  last=2026-07-07T13:31Z  lastDeployment=dpl_9iz6MHCr5ZTvJGL9Rw48X5mhehAb
```
This is Satori/`@vercel/og` choking on an OpenType GSUB feature (contextual substitution, lookupType 5 / substFormat 3) in the **Arabic font** used to render quote OG cards. When it hits a quote whose Arabic requires that ligature lookup, the OG image render throws — that share/preview card fails to generate (social scrapers get a broken image), though the underlying page is unaffected. Low volume (6 events / 3 users over ~2.5 months) but never resolved.

**ACTION:**
1. Open the OG quote route (`src/app/api/og/quote/route.tsx` or similar) and find the Arabic font passed to `ImageResponse`.
2. Swap to a Satori-compatible Arabic font that doesn't use substFormat-3 lookups — **Noto Naskh Arabic** or **Amiri** (static subset) render reliably under `@vercel/og`. Load a pre-subset `.ttf`, not a variable/heavily-featured build.
3. Belt-and-suspenders: wrap the `ImageResponse` render in try/catch and fall back to a text-only (Latin transliteration or English) card so a font edge-case never returns a 500.
4. Verify by hitting `/api/og/quote` with a known-failing ayah (Arabic with ligatures) after the font swap.

---

## 🟢 ALL CLEAR

**Key pages (10/10 serving correctly):**
- `/` — "Receive Spiritual Guidance From Quranic Contemplation" ✅
- `/surahs` — "The Surah Map", 114 chapters ✅
- `/surahs/al-fatiha` — الفاتحة ✅
- `/surahs/al-baqarah` — البقرة ✅
- `/articles` — "Explorations in Quranic Meaning", 174 listed ✅
- `/glossary` — 111 concept terms ✅
- `/understanding-quran` — full guide content present (verified past the dark-mode false-positive note) ✅
- `/sitemap.xml` — valid XML, ~750+ `<url>` entries ✅
- `/robots.txt` — `User-agent: *`, Content-Signal directives present ✅
- `/api/health` — 404 (endpoint does not exist; not wired up — not a regression)

**Database integrity:**
- 0 posts with null/empty slug or title
- `surah_visual_data`: 114 rows (complete)
- Subscribers: no NULL/unexpected statuses
- Publishing pipeline healthy — newest post 2 days old (2026-07-05)

---

## 📊 DB Snapshot

| Type | Status | Count | Δ vs Apr 28 |
|------|--------|-------|-------------|
| article | published | 175 | +14 |
| article | draft | 2 | 0 |
| surah | published | 114 | 0 |
| tadabbur | published | 4 | 0 |
| **Total published** | | **293** | **+14** |

**Subscribers:** 12 active · 5 pending · 1 unsubscribed (**18 total**, +2 vs Apr 28) — no NULL statuses
**surah_visual_data:** 114 rows (complete)
**Recent activity (last 7 days):** ~11 articles published in the 2026-07-05 batch (cross-surah "connection-reveal" genre)

---

## Notes on coverage this run
- **Vercel deployment status could not be pulled.** The Vercel MCP available in this session is the Agent-Runs/runtime-errors observability server — it has no `list_deployments`/build-logs tool. The OIDC token in `.env.local` is also rejected by the Vercel REST API (`invalidToken`, flagged in the 2026-06-13 digest). **Standing action:** add a personal Vercel access token to `.env.local` so deploy health + build logs become queryable. Site liveness (all pages 200) is the current proxy for deploy health.
- Runtime-error coverage (Check 4) **is** real this run — pulled from the Vercel runtime-errors table (24h + full history for the one group), not a short log tail.
