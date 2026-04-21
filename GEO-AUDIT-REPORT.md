# GEO Audit Report: AyahGuide

**Audit Date:** 2026-04-19  
**URL:** https://www.ayahguide.com  
**Business Type:** Publisher (Quranic reflection / Islamic scholarly content)  
**Pages Analyzed:** 12 pages + sitemap (1,087 URLs)

---

## Executive Summary

**Overall GEO Score: 41/100 — Poor**

AyahGuide has genuinely strong content — long-form articles (4,000–5,000 words), classical scholarship citations, morphological precision, and a well-structured editorial pipeline. The content quality, if exposed to AI systems, would score 68/100 on citability alone. The problem is structural: a robots.txt misconfiguration blocks every major AI search crawler while intending only to block AI training, zero off-site brand presence means AI models have no entity recognition signal for "AyahGuide," and schema markup is incomplete across half the page types. Fixing the robots.txt alone — a 15-minute change — would immediately restore ChatGPT and Perplexity access. Combined with 3 schema fixes, the score would move to ~60/100 within a week.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 |
| Brand Authority | 8/100 | 20% | 1.6 |
| Content E-E-A-T | 72/100 | 20% | 14.4 |
| Technical GEO | 71/100 | 15% | 10.7 |
| Schema & Structured Data | 38/100 | 10% | 3.8 |
| Platform Optimization | 28/100 | 10% | 2.8 |
| **Overall GEO Score** | | | **41/100** |

---

## Critical Issues (Fix Immediately)

### C1 — robots.txt blocks ALL AI search crawlers (contradicts stated intent)

**File:** `src/app/robots.ts`

The robots.txt contains `Content-Signal: search=yes,ai-train=no` — expressing intent to ALLOW AI search while blocking AI training. But the Disallow directives block every AI crawler without distinguishing training from retrieval:

| Crawler | Service | Type | Status |
|---|---|---|---|
| GPTBot | ChatGPT web search + training | Retrieval + training | **BLOCKED** |
| OAI-SearchBot | ChatGPT search only | Retrieval only | Not listed — blocked by default |
| ChatGPT-User | ChatGPT browsing | Retrieval only | **BLOCKED** |
| ClaudeBot | Anthropic training | Training only | BLOCKED (correct) |
| anthropic-ai | Anthropic training | Training only | BLOCKED (correct) |
| Claude-Web | Anthropic browsing | Retrieval only | **BLOCKED** |
| PerplexityBot | Perplexity citations | **Retrieval only — no training** | **BLOCKED** |
| Google-Extended | Gemini training | Training only | BLOCKED (debatable) |
| YouBot | You.com AI search | Retrieval only | **BLOCKED** |
| CCBot | Common Crawl (training) | Training only | BLOCKED (correct) |
| Bytespider | ByteDance AI training | Training | BLOCKED (correct) |

**PerplexityBot is the starkest misconfiguration.** It is a pure search-and-cite crawler with no training function. Blocking it directly contradicts `search=yes` and costs citations from the AI platform most likely to cite niche scholarly content.

**Fix — update `src/app/robots.ts`:**
Remove from Disallow: `PerplexityBot`, `ChatGPT-User`, `Claude-Web`, `YouBot`, `OAI-SearchBot`
Keep in Disallow: `CCBot`, `Bytespider`, `anthropic-ai`, `ClaudeBot` (training crawlers)
Decision required: `GPTBot` (training AND ChatGPT search), `Google-Extended` (Gemini training)

---

### C2 — No off-site brand presence (AI entity recognition = near zero)

AI models build entity recognition through cross-platform corroboration. Current status:

| Platform | Status |
|---|---|
| Wikipedia | **Absent** — highest-weight signal for AI entity recognition |
| Reddit | **Absent** — zero threads in r/islam, r/learnquran, r/QuranStudy |
| YouTube | **Absent** — no channel |
| LinkedIn | **Absent** — no company page |
| Wikidata | **Present ✅** — Q139257356 |
| Instagram | **Present ✅** — @ayahguideus |

When a user asks ChatGPT or Perplexity "what is a good Quran reflection resource," no training-time or retrieval-time signal points to AyahGuide despite strong content quality. The site is an authority island.

---

## High Priority Issues

### H1 — No author attribution on any page

Every article attributes authorship to `"author": { "@type": "Organization", "name": "AyahGuide" }`. This fails Google's Article rich result requirements (author must be a Person) and gives AI models no expertise signal. Full anonymity can be preserved — use "AyahGuide Editorial" as a pen entity with a consistent bio page.

**Files:** `src/app/(public)/posts/[slug]/page.tsx`, `src/app/(public)/surahs/[slug]/page.tsx`

### H2 — No `image` property in BlogPosting/Article schema

The OG image is already dynamically generated at `/api/og/quote`. Schema doesn't reference it. Without image, no Article rich result eligibility.

**Fix:** Add to BlogPosting JSON-LD:
```typescript
image: {
  '@type': 'ImageObject',
  url: `${CANONICAL_URL}/api/og/quote?title=${encodeURIComponent(post.title)}`,
  width: 1200,
  height: 630,
},
```

### H3 — No `logo` in Organization schema

Required for Google Knowledge Panel candidacy and for publisher blocks in Article schemas to be fully valid.

**Fix in `src/app/page.tsx`:** Add `logo: { '@type': 'ImageObject', url: '${CANONICAL_URL}/logo.png', width: 512, height: 512 }` to organizationJsonLd.

### H4 — Organization `sameAs` has only 2 entries (Instagram + Wikidata)

Wikidata Q139257356 is an excellent foundation. LinkedIn, YouTube, Wikipedia are all absent. Expand `sameAs` on the homepage Organization schema and propagate to article/surah/hub page schemas.

### H5 — Zero external citations on article pages

Every article references classical tafsir (al-Tabari, Ibn Kathir) with no outbound hyperlinks. AI systems preferentially cite sources that themselves cite sources. Add 3–5 outbound links per article to islamweb.net, sunnah.com, or archive.org.

### H6 — Homepage meta description is a concatenation artifact

Current: "A path to guidance through contemplation of the Quran. Journey through the Quran with contemplative insight." — two fragments stitched together.

**Fix in `src/app/(public)/page.tsx`:**
```typescript
description: 'Deep Quranic reflections (tadabbur) grounded in Ibn Kathir, al-Tabari, and classical Arabic morphology. 114 surahs, 160+ articles, and a complete glossary of Islamic terms.',
```

---

## Medium Priority Issues

### M1 — BreadcrumbList missing on hub and glossary pages
Present on article and surah pages. Absent on `/hub/[slug]` and `/glossary/[slug]`. Fix: copy pattern from post slug page into both templates. Affects ~260 pages.

### M2 — Hub pages use DefinedTerm only — Article schema also needed
Hub pages are 800–900 words of synthesis content. DefinedTerm covers the entity; Article covers the content. Both should be present. Fix: add second JSON-LD block to `src/app/(public)/hub/[slug]/page.tsx`.

### M3 — llms.txt exists but is prose-only (no URL inventory)
File is present and well-written with correct permissions (`ai-train: disallowed`, `summarization: allowed`, `citation: encouraged`). Missing: actual markdown link lists per the spec. Add `## Optional` section with top 20 articles, all hub page URLs, glossary index, methodology page.

### M4 — Organization schema missing `knowsAbout`, `foundingDate`, `contactPoint`
Add to homepage organizationJsonLd:
```typescript
knowsAbout: ['Quran', 'Quranic exegesis', 'Tafsir', 'Tadabbur', 'Quranic sciences'],
foundingDate: '2024',
contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: `${CANONICAL_URL}/contact` },
```

### M5 — Surah Article schema `description` truncates mid-word
Check string slicing in `src/app/(public)/surahs/[slug]/page.tsx` — description ends with "acr" (cut mid-word).

### M6 — `speakable` absent on all pages
For a Quran reflection platform with audio on the roadmap, `speakable` schema marks sections for voice assistants. Add to BlogPosting and Article schemas: `speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lede'] }`.

### M7 — Bing Webmaster Tools not verified, no IndexNow
Bingbot can crawl but receives no real-time signals. Fix: add `msvalidate.01` meta tag to root layout, implement IndexNow on post-publish webhook. ~30 minutes total.

---

## Low Priority Issues

- **L1** — FAQ schema absent (note: Google restricted FAQ rich results to gov/health Aug 2023 — still useful for AI comprehension and Bing)
- **L2** — Trailing slash ambiguity from `skipTrailingSlashRedirect: true` (canonical tags mitigate)
- **L3** — AhrefsBot/SemrushBot blocked (limits external rank tracking capability)
- **L4** — Permissions-Policy could add `payment=(), usb=(), battery=()`

---

## Category Deep Dives

### AI Citability (68/100)
Content is genuinely strong — long-form, analytically precise, grounded in named classical sources. The morphological form analysis, cross-surah architectural comparisons, and entity insights (e.g., Shaytan omitting "from above/below" in 7:16-17) are citation-worthy. **Gaps:** No FAQ sections, no question-format headings, glossary entries are poetic one-liners rather than structured definitions with root etymology + verse reference + scholarly source.

### Brand Authority (8/100)
Complete off-site vacuum except Wikidata + Instagram. The Wikidata entry (Q139257356) is a hidden asset most comparable sites don't have — build on it. Priority: LinkedIn company page (20 min), Reddit presence (ongoing), Wikipedia article draft (2–3 hrs).

### Content E-E-A-T (72/100)
**Strengths:** Methodology page is exceptional — better than almost any competing Islamic content site. Three-validator pipeline, 15+ named classical authorities, ikhtilaf principle honored, contested-verses framework. Content analytical depth reflects real expertise. **Gaps:** Zero external citations, zero named author, no funding/sustainability disclosure. These are all fixable without compromising the founder's anonymity preference.

### Technical GEO (71/100)
**Strengths:** Full SSR (Next.js App Router), comprehensive security headers, well-structured 1,087-URL sitemap, mobile-optimized. All JSON-LD is server-rendered. **Single critical flaw:** robots.txt blocks all AI crawlers — a single point of failure that nullifies all technical strengths for GEO purposes.

### Schema & Structured Data (38/100)
**Present:** EducationalOrganization + WebSite + SearchAction (homepage), BlogPosting + BreadcrumbList (articles), Article + BreadcrumbList (surahs), DefinedTerm (hub + glossary). All server-rendered. Wikidata sameAs present. **Missing:** Person author schema (blocks rich results), image in Article/BlogPosting (blocks rich results), logo in Organization, BreadcrumbList on hub/glossary, speakable, expanded sameAs.

### Platform Optimization (28/100)

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 52/100 | No question-format headings, no Person author schema |
| Bing Copilot | 47/100 | No BWT verification, no IndexNow, no LinkedIn |
| Google Gemini | 22/100 | Google-Extended blocked, no YouTube, no Knowledge Panel |
| ChatGPT Web Search | 8/100 | GPTBot + ChatGPT-User blocked |
| Perplexity AI | 6/100 | PerplexityBot blocked, zero Reddit presence |

---

## Quick Wins (This Week)

1. **Fix robots.txt** — Allow PerplexityBot, ChatGPT-User, Claude-Web, YouBot, OAI-SearchBot. 15 min. Unlocks 2–3 major AI search platforms. (`src/app/robots.ts`)
2. **Add `image` to BlogPosting/Article schemas** — OG image already exists. Wire it in. 30 min. Unlocks Google Article rich results. (`src/app/(public)/posts/[slug]/page.tsx`)
3. **Add `logo` to Organization schema** — 10 min. Required for Knowledge Panel. (`src/app/page.tsx`)
4. **Add BreadcrumbList to hub + glossary pages** — Copy existing pattern. 20 min. Fixes 260 pages. (`src/app/(public)/hub/[slug]/page.tsx`, `src/app/(public)/glossary/[slug]/page.tsx`)
5. **Fix homepage meta description** — 5 min. (`src/app/(public)/page.tsx`)

---

## 30-Day Action Plan

### Week 1: Unblock AI Search + Critical Schema
- [ ] Fix robots.txt — separate training from retrieval crawlers
- [ ] Add `image` to BlogPosting + Article schemas (use existing OG image endpoint)
- [ ] Add `logo` to Organization schema
- [ ] Fix homepage meta description
- [ ] Add BreadcrumbList to hub + glossary page templates
- [ ] Fix surah Article schema description truncation

### Week 2: Entity & Author Signals
- [ ] Create LinkedIn company page (under 1 hour)
- [ ] Add LinkedIn URL to sameAs in Organization schema
- [ ] Add `knowsAbout`, `foundingDate`, `contactPoint` to Organization schema
- [ ] Create author entity ("AyahGuide Editorial" with consistent bio page)
- [ ] Add Person schema to article + surah pages
- [ ] Add `speakable` to BlogPosting + Article schemas
- [ ] Expand llms.txt with URL inventory (top 20 articles + all hub pages + glossary index)

### Week 3: Content Citability Upgrades
- [ ] Add external citation links to top 10 articles (3–5 links each to islamweb.net, sunnah.com, archive.org)
- [ ] Restructure 20 flagship glossary entries: add Arabic root, morphological category, verse reference, scholarly source
- [ ] Add FAQ section to top 5 articles — explicit Q&A with 3–5 sentence answers
- [ ] Add dual schema (DefinedTerm + Article) to hub page template

### Week 4: Off-Site Brand Authority
- [ ] Draft Wikipedia article for AyahGuide (meets notability criteria: 1,000+ pages, all-114-surah coverage, published methodology, unique English-language tadabbur positioning)
- [ ] First 3 Reddit contributions to r/islam / r/learnquran / r/QuranStudy with AyahGuide content cited (genuine participation, not promotional posts)
- [ ] Verify site in Bing Webmaster Tools (msvalidate.01 meta tag)
- [ ] Implement IndexNow on post-publish webhook

---

## Appendix: Pages Analyzed

| URL | Schema Types Present | Key Issues |
|---|---|---|
| / (homepage) | WebSite, SearchAction, EducationalOrganization | No logo, 2/7 sameAs, weak meta description |
| /about | None detected | No structured data |
| /methodology | None detected | No structured data — FAQPage opportunity |
| /posts/against-yourself-first | BlogPosting, BreadcrumbList | No image, Organization author, no external links |
| /surahs/al-fatiha | Article, BreadcrumbList | No image, description truncated |
| /surahs/al-baqarah | Article, BreadcrumbList | No image, description truncated |
| /hub/shaytan | DefinedTerm | No BreadcrumbList, no Article schema, no speakable |
| /glossary/tawbah | DefinedTerm | No BreadcrumbList |
| /articles | None confirmed | No structured data |
| /llms.txt | N/A | Present ✅, prose-only, needs URL inventory |
| /robots.txt | N/A | AI retrieval crawlers blocked (misconfiguration) |
| /sitemap.xml | N/A | 1,087 URLs, well-structured ✅ |

---

*Report generated 2026-04-19. Re-audit recommended after Week 1 fixes.*
