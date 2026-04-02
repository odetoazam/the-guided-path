# AyahGuide: Architecture, Strategy, and Open Questions

*A document for thinking on a flight — March 2026*

---

## Part 1: Where Things Stand

### What AyahGuide Actually Is (Architecturally)

AyahGuide is a **Quranic knowledge graph with a content layer on top**. This is the most important thing to understand about its architecture, because it determines what the platform can become.

The visible product is a website: surah pages, articles, glossary terms, entity hubs. But underneath, the data model is a graph:

- **~250 entity nodes** (glossary terms, Quranic characters, theological concepts, states of the heart) — each with rich structured data in JSONB
- **~114 surah posts + growing article corpus** — tagged to entities via a polymorphic join table
- **~200+ ayah records** (passage-level tadabbur reflections) — each with two layers: Layer A (linguistic grounding, always public) and Layer B (contemplative reflection, gatable for premium)
- **Entity co-occurrence graph** — a materialized view that tracks which entities appear together on the same content, creating edges between nodes automatically

The tagging system (`entity_tags`) is the connective tissue. It links both posts and ayah records to entities, with a primary/secondary distinction. Primary tags drive hub page assembly. Secondary tags create knowledge graph edges. The co-occurrence view materializes these relationships for fast lookup.

This means AyahGuide is not a blog with a glossary bolted on. It's a **semantic content network** where every piece of content is positioned within a web of Quranic concepts. The hub pages are just one view into that graph. The graph itself is the real asset.

### The Content Pipeline

Content enters the system through several paths:

1. **Surah overviews** — 114 posts with `type='surah'`, each tagged to relevant entities. Published via `publish-surah.mjs`.

2. **Visual surah pages** — 114 pre-generated React components in `src/data/visual/`, each exporting a `SURAH_DATA` object with diagram types (section maps, chiastic rings, deductive funnels, absence maps). These are static — not database-driven.

3. **Ayah-level tadabbur** — Markdown files in `content/tadabbur/` are generated via the `/quranic-tadabbur` skill, validated with 3 scripts (Arabic verification, morphology checking, tafsir cross-reference), and migrated to `ayah_records` table via `migrate-tadabbur-to-ayah-records.ts`. Currently ~200 validated, targeting 6,236 (one per ayah or passage).

4. **Hub articles** — Thematic articles written via the `hub-article-pipeline` skill, inserted via TypeScript scripts (`insert-articles.ts` pattern), tagged to entities, with hub synthesis generated and cached.

5. **Hub synthesis** — AI-generated overview prose cached in `hub_synthesis_cache`, keyed by entity. Staleness detected via `content_hash`.

### The Tech Stack

- **Framework**: Next.js 14 (App Router) on Vercel
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Email**: Resend with Contacts API
- **Styling**: Tailwind CSS with custom gold/navy/cream palette
- **Fonts**: Inter (sans), Playfair Display (serif), Source Serif 4 (body), Amiri (Arabic)
- **Analytics**: PostHog + Vercel Analytics + Sentry
- **Validation**: Zod schemas, quran-validator package, custom verification scripts
- **Editor**: Tiptap (admin CMS)
- **Bot protection**: Cloudflare Turnstile

### Current Scale

| Asset | Count | Status |
|-------|-------|--------|
| Entities | ~250 | All seeded from glossary |
| Surah posts | 114 | All published |
| Visual surah pages | 114 | All generated (v3 template) |
| Hub articles | ~10 | Shaytan (6), Dhul-Qarnayn (4) |
| Ayah records | ~200 | 13 surahs; all 6,236 targeted |
| Hub syntheses | 2 | Shaytan, Dhul-Qarnayn |
| Subscribers | Growing | Double opt-in via Resend |

---

## Part 2: What the Architecture Enables

### The Developer Platform Vision

The knowledge graph structure means AyahGuide's data is **inherently API-shaped**. Every entity, every tagged relationship, every ayah record is a discrete, addressable resource. This is what makes an API, MCP server, and CLI realistic — the data model already supports it. The question is exposure, not restructuring.

Here's what each layer could look like:

#### Public REST API (v1)

The existing internal API routes (`/api/entities`, `/api/ayah-records`, `/api/hub/[slug]`, etc.) are already structured as REST endpoints. Making them public requires:

```
GET /api/v1/entities                    # List entities (filterable by category)
GET /api/v1/entities/{slug}             # Single entity with glossary_data
GET /api/v1/entities/{slug}/hub         # Hub assembly (posts + ayahs + synthesis)
GET /api/v1/ayah-records                # List (filterable by surah, ayah range)
GET /api/v1/ayah-records/{id}           # Single record with Layer A (+ Layer B if authed)
GET /api/v1/surahs/{number}             # Surah overview post
GET /api/v1/graph/connections/{slug}    # Co-occurrence edges for an entity
GET /api/v1/search?q={term}             # Full-text search across entities + content
```

**What's missing today:**
- Pagination (no limit/offset on any endpoint)
- Rate limiting on public endpoints (only subscribe/confirm have it)
- API versioning (no /v1/ prefix)
- OpenAPI spec (no machine-readable schema)
- API keys / token auth for developers (only admin JWT exists)
- Layer B gating (no enforcement — everything is public)
- JSONB schema documentation (glossary_data, layer_a, layer_b are untyped to consumers)

#### MCP Server

An MCP (Model Context Protocol) server would let AI assistants (Claude, etc.) query AyahGuide's knowledge graph directly. This is arguably the highest-leverage developer tool because it turns AyahGuide into **the Quranic knowledge layer for any AI application**.

Potential MCP tools:

```
lookup_entity(slug)           → Entity data + glossary
get_ayah_reflection(surah, ayah) → Layer A grounding for a passage
get_hub(slug)                 → Full hub assembly
search_quran_concepts(query)  → Semantic search across entities
get_connections(slug)         → Related entities via co-occurrence
get_surah_structure(number)   → Visual page SURAH_DATA
```

The MCP server would be a thin wrapper around the same Supabase queries that the web app uses. The data is already structured for it.

**Key decision:** Does the MCP server hit the public API (adding latency but staying DRY) or query Supabase directly (faster but duplicates logic)?

#### CLI Tool

A CLI for developers and scholars:

```bash
ayahguide lookup tawbah              # Entity data
ayahguide ayah 18:84-85              # Passage with Layer A
ayahguide hub dhul-qarnayn           # Hub summary
ayahguide search "repentance"        # Semantic search
ayahguide graph shaytan              # Show connections
ayahguide surah 18 --structure       # Visual architecture data
```

This would consume the public API. It's the simplest of the three to build — primarily a CLI framework (oclif, commander) with API client calls and formatted terminal output.

### The Monetization Architecture

The Layer A / Layer B split in `ayah_records` was designed with this in mind:

- **Layer A** (linguistic grounding) — always public. This is the reference layer. Root analysis, morphological forms, grammatical structures. Think of it as the dictionary/encyclopedia layer.

- **Layer B** (contemplative reflection) — gatable. This is the transformation layer. The thematic depths, psychological bridges, spiritual insights. This is what makes AyahGuide different from a tafsir database.

The schema migration documents three gating options:
1. **Database view** — Create `v_ayah_records_public` that nulls layer_b
2. **Separate table** — Move layer_b to `ayah_records_layer_b` with stricter RLS
3. **API-layer filtering** — Omit layer_b from response JSON for non-premium (simplest)

Option 3 is recommended for launch. Options 1-2 are for when the premium tier has real traffic and you need DB-level enforcement.

### The Knowledge Graph as Product

The co-occurrence graph is currently used for "Related Concepts" chips on hub pages. But the graph itself is a product waiting to be visualized and explored:

- **Interactive knowledge map** — A force-directed graph where entities are nodes, co-occurrence counts are edge weights, and clicking a node navigates to its hub
- **Exploration paths** — "Start at tawbah → see its connections to nafs, khushu, istighfar → explore each"
- **Study sequences** — Curated paths through the graph for structured learning
- **"How are X and Y connected?"** — Shortest path between two entities through shared content

This is a significant frontend project but the data already supports it.

---

## Part 3: Architectural Strengths

### 1. The Polymorphic Tag System Works

The `entity_tags` table with its `(post_id XOR ayah_record_id)` constraint is elegant. One table handles all content-to-entity relationships. The `is_primary` flag cleanly separates "this content is about X" from "this content mentions X." And the co-occurrence view derives the knowledge graph edges automatically from the tagging.

### 2. JSONB for Variable-Schema Data

Using `glossary_data` JSONB for the rich glossary fields (rootForms, keyAyahs, scholarsSaid, semanticField, practicalSection) was the right call. These fields vary dramatically between entity categories. A relational decomposition would have been 10+ tables. JSONB keeps it in one column with the tradeoff of no DB-level type safety.

### 3. Content-Type Discrimination in Posts

Using `posts.type = 'article' | 'surah'` rather than separate tables means articles and surah overviews share the same tagging, the same API routes, and the same rendering pipeline. Less code, more consistency.

### 4. The Validation Pipeline

Three independent validators (Arabic text, morphology, tafsir cross-reference) running against different external sources (Uthmani text database, corpus.quran.com, classical tafsir API) is a strong trust architecture. No single point of failure for content accuracy.

### 5. RLS + Service Role Pattern

Public reads through RLS (only published content visible), admin writes through service role key. Simple, effective, Supabase-native.

---

## Part 4: Architectural Weaknesses and Risks

### 1. No API Versioning

Every API route serves the current schema with no version prefix. When you change the shape of a response (adding fields, renaming keys, restructuring JSONB), every consumer breaks. For internal use this is fine. For a public API, it's a blocker.

**Decision needed:** Version in the URL (`/api/v1/`) or in headers (`Accept: application/vnd.ayahguide.v1+json`)? URL versioning is simpler and more standard for REST.

### 2. JSONB Is Untyped at the Boundary

`glossary_data`, `layer_a`, and `layer_b` are `Record<string, any>` in TypeScript. Internally you know the shape because you wrote the migration scripts. External consumers don't. This needs:
- JSON Schema definitions for each JSONB structure
- OpenAPI spec documenting the expected shapes
- Possibly runtime validation (Zod schemas for JSONB output)

### 3. No Pagination

The `GET /api/entities` and `GET /api/ayah-records` endpoints return all matching rows. With ~250 entities this is fine. With 6,236 ayah records it won't be. Standard cursor-based or offset pagination is needed before public API launch.

### 4. One-Way Markdown Sync

Tadabbur content lives in two places: `content/tadabbur/` markdown files and `ayah_records` database rows. The migration is one-way (markdown → DB). If someone edits an ayah record in the database, the markdown is now stale. If someone edits the markdown, it won't auto-sync to the DB.

**Decision needed:** Is the markdown the source of truth or the database? If markdown, then the DB should be treated as a read cache. If the database, then markdown becomes an archive format. Trying to keep both in sync bidirectionally is a recipe for pain.

### 5. Visual Surah Pages Are Static

The 114 `SURAH_DATA` objects in `src/data/visual/` are hardcoded React components. They can't be edited through the CMS, queried through the API, or updated without a code deploy. If the visual data becomes part of the public API (and it should — the structural analysis data is valuable), it needs to move to the database or at least to a JSON format that can be served dynamically.

### 6. No Full-Text Search Infrastructure

Entity search currently uses pattern matching on `name_translit` and `name_english`. There's a GIN index, but no proper full-text search across:
- Arabic text in ayah records
- Content HTML in posts
- Glossary data JSONB fields
- Transliterated terms

For a developer API, search is table stakes. Supabase supports `tsvector` columns and `ts_query` for PostgreSQL full-text search, or you could add an external search service (Typesense, Meilisearch).

### 7. No Webhooks or Event System

When new content is published (a new article, a new ayah record, a hub synthesis update), nothing happens automatically. There's no event system that could:
- Notify API consumers of new content
- Trigger synthesis regeneration when tagged content changes
- Auto-refresh the co-occurrence view when tags change
- Send subscriber emails on publish

The cron publish endpoint exists but it's a poll-based workaround. A proper event system (even just database triggers + Edge Functions) would unlock automation.

---

## Part 5: The API/MCP/CLI Decision Matrix

### What to Build First

| Product | Effort | Impact | Dependencies |
|---------|--------|--------|--------------|
| Public REST API (v1) | Medium | High — unlocks everything else | Pagination, rate limiting, API keys, OpenAPI spec |
| MCP Server | Low-Medium | Very High — AI-native distribution | Public API OR direct Supabase access |
| CLI Tool | Low | Medium — developer convenience | Public API |
| Knowledge Graph Viz | Medium-High | High — differentiating UX | Co-occurrence data (already exists) |
| SDK (TypeScript/Python) | Medium | Medium — developer experience | Public API + OpenAPI spec |

**Recommended order:** API → MCP → CLI → SDK

The API is the foundation. Everything else consumes it. The MCP server is second because it has the highest leverage — it turns AyahGuide into infrastructure for every AI-powered Islamic education tool.

### API Architecture Decisions

**1. Auth model for developers**

Options:
- **API keys** (simplest) — Generate keys in admin, include in header. Good for server-to-server.
- **OAuth 2.0** (standard) — Full auth flow with scopes. Needed if developers build user-facing apps that need per-user access.
- **JWT with tiers** (hybrid) — API key gets a JWT with tier info (free/premium). Layer B access gated by tier claim.

Recommendation: Start with API keys. Add OAuth later if developer-facing apps need user auth.

**2. Rate limiting tiers**

```
Free:     100 requests/hour, Layer A only
Premium:  10,000 requests/hour, Layer A + B
Partner:  Unlimited, all data, webhook access
```

**3. Response format**

The current API returns Supabase row shapes directly. For a public API, you want stable, documented response envelopes:

```json
{
  "data": { ... },
  "meta": {
    "pagination": { "offset": 0, "limit": 20, "total": 250 },
    "version": "v1"
  }
}
```

**4. Caching strategy**

- Entity data changes rarely → aggressive caching (1 hour+)
- Hub assembly changes when articles are added → moderate caching (5-15 min)
- Ayah records are immutable once published → cache indefinitely
- Synthesis changes when regenerated → moderate caching with ETag

### MCP Server Architecture

The MCP server is essentially a tool registry that maps natural language intents to API calls:

```typescript
// Tool: lookup_entity
// Description: "Look up a Quranic concept, term, or character by name"
// Input: { slug: string } or { query: string }
// Output: Entity data with glossary fields

// Tool: get_ayah_reflection
// Description: "Get linguistic grounding for a Quranic passage"
// Input: { surah: number, ayah_start: number, ayah_end?: number }
// Output: Layer A data (grounding table, linguistic analysis)

// Tool: explore_hub
// Description: "Explore everything about a Quranic entity — articles, key passages, connections"
// Input: { slug: string }
// Output: Hub assembly (synthesis + article summaries + ayah summaries + connections)

// Tool: find_connections
// Description: "Find entities related to a given concept through shared content"
// Input: { slug: string, limit?: number }
// Output: Co-occurring entities ranked by count

// Tool: search
// Description: "Search AyahGuide for concepts, passages, or articles"
// Input: { query: string, type?: 'entity' | 'ayah' | 'article' }
// Output: Ranked results
```

**Hosting:** Supabase Edge Functions (Deno-based, same infra) or standalone Node.js service.

**Key advantage:** Because the data is already structured and tagged, the MCP server doesn't need to do any NLP or embedding — it just queries structured data. This makes it fast, reliable, and deterministic.

---

## Part 6: Open Questions

These are the things I don't have answers to yet. They're worth thinking about.

### Content Strategy Questions

**1. What is the final state of the ayah record corpus?**
Target is 6,236 records (one per ayah or passage). Currently ~200. At the current rate (batch generation + validation), what's the realistic timeline? And does the platform need all 6,236 before an API launch, or is a partial corpus valuable?

**2. How many entity hubs should exist before launch?**
Currently 2 (Shaytan, Dhul-Qarnayn) out of ~250 entities. Each hub needs 3-6 articles + synthesis + priority ayah records. That's significant content investment per hub. Which hubs are highest priority? Should there be a "minimum viable hub" (synthesis + glossary data, no articles)?

**3. Should the visual surah data move to the database?**
The 114 `SURAH_DATA` objects contain valuable structural analysis (section maps, chiastic patterns, absence maps). If this stays in code, it's invisible to the API. If it moves to the DB, it becomes queryable, editable, and API-servable. But it also needs a schema and migration.

### Technical Architecture Questions

**4. Source of truth: markdown or database?**
The `content/tadabbur/` markdown files and the `ayah_records` table can drift. Which is authoritative? This affects whether the CMS can edit ayah records directly, or whether all changes must go through the markdown → validate → migrate pipeline.

**5. How should Layer B gating work at scale?**
Option C (API-layer filtering) is fine for launch. But if the API serves thousands of requests and Layer B is the premium differentiator, you need the gating to be reliable and not bypassable. Does this eventually need DB-level enforcement (Option A or B)?

**6. Should the co-occurrence view be real-time?**
Currently, `refresh_entity_co_occurrence()` is called manually after bulk tagging. If the API is live and developers are watching the graph, stale co-occurrence data is a bad experience. Options: Postgres trigger on `entity_tags` insert/delete, or a scheduled refresh (every 5 min), or on-demand refresh via API call.

**7. What's the search story?**
Full-text search across Arabic text, English translations, entity names, and article content is a significant feature. PostgreSQL's built-in `tsvector` can handle English well but Arabic needs special handling (no stemming in pg by default, need custom dictionary or external service). Is Supabase's built-in search sufficient, or do you need Typesense/Meilisearch?

### Business and Strategy Questions

**8. Who is the developer audience?**
- Islamic ed-tech startups building apps?
- Individual developers building personal study tools?
- AI companies wanting Quranic data for their models?
- Academic researchers?

The answer shapes the API design, pricing, and documentation tone.

**9. What's the competitive moat?**
The raw Quranic text is public domain. Translations are widely available. What makes AyahGuide's data worth building on?

My answer: **the knowledge graph + the layered tadabbur**. Nobody else has passage-level linguistic grounding (Layer A) at this scale with this level of validation. Nobody else has a tagged entity graph connecting Quranic concepts through shared content. The graph is the moat.

**10. API pricing model?**
- Free tier with Layer A only (reference data)?
- Premium with Layer B (contemplative content)?
- Enterprise with raw data export + webhooks?
- Usage-based vs. flat monthly?

**11. Should there be a write API?**
The current model is read-only for external consumers. But what if scholars or developers could:
- Submit corrections to Arabic text or translations
- Propose new entity tags
- Contribute ayah reflections (subject to validation pipeline)

This turns AyahGuide from a publisher into a **platform**. Significantly more complex but significantly more valuable.

### Infrastructure Questions

**12. Does the API need its own service?**
Currently, API routes live inside the Next.js app. For a public API with its own rate limiting, auth, versioning, and monitoring, you might want a separate service (Supabase Edge Functions, or a standalone Node.js/Deno API) that queries the same database.

**13. How do you handle API key management?**
Need: a `developer_keys` table with key hash, tier, rate limit, usage tracking. Plus an admin UI to issue/revoke keys. Plus middleware to validate keys on every request.

**14. Monitoring and observability?**
For a public API, you need: request logging, error rates, latency percentiles, usage by key, endpoint popularity. Sentry handles errors. PostHog handles product analytics. But API-specific monitoring (per-endpoint latency, per-key usage) needs something purpose-built.

---

## Part 7: Things to Keep in Mind as You Build

### 1. The Graph Is the Product

Every decision should strengthen the knowledge graph. More entities, more tags, more connections, more content per node. The visual surface (website, API, MCP, CLI) is just a lens into the graph. The graph is what compounds over time.

### 2. Validation Is Non-Negotiable

The three-validator pipeline (Arabic verification, morphology checking, tafsir cross-reference) is what makes the content trustworthy. Any expansion (API contributions, AI-generated content, user submissions) must go through the same pipeline. The moment unvalidated content enters the graph, trust erodes.

### 3. Layer A / Layer B Is a Strategic Split

Don't collapse the layers. The distinction between "reference data anyone can access" (Layer A) and "transformative content worth paying for" (Layer B) is the foundation of both the free API tier and the premium product. Keep them cleanly separated in the database, the API, and the mental model.

### 4. Start with Read, Earn the Right to Write

Launch the API as read-only. Let developers build with the data. Learn what they need. Then add write capabilities (corrections, contributions) only when you have the moderation and validation infrastructure to handle it.

### 5. The MCP Server Is Your Distribution Cheat Code

Every AI assistant that can call your MCP server becomes a distribution channel. A developer building a Quran study app with Claude doesn't need to build their own knowledge base — they call your MCP tools. This is how AyahGuide becomes infrastructure rather than just a website.

### 6. Don't Underestimate the Visual Data

The 114 `SURAH_DATA` objects contain structural analysis (chiastic patterns, section maps, thematic arcs) that doesn't exist anywhere else in structured form. This data is extremely valuable for education tools, curriculum designers, and AI applications. Moving it from static React components to a queryable format should be a priority.

### 7. Arabic Search Is a Solved Problem (Elsewhere)

PostgreSQL's full-text search doesn't handle Arabic well out of the box. But Typesense and Meilisearch both support Arabic with proper tokenization. If search is important to the developer experience (and it is), plan for an external search service rather than fighting PostgreSQL's limitations.

### 8. The Glossary Data Is Underexploited

Each entity's `glossary_data` JSONB contains rootForms, keyAyahs, scholarsSaid, semanticField, practicalSection — structured data that's currently only rendered on the glossary/hub pages. This data should be first-class in the API. A developer should be able to ask "give me all the key ayahs for tawbah" or "what did Ibn Kathir say about shaytan" and get structured responses.

---

## Part 8: A Possible Roadmap

This is not a timeline. It's an ordering.

### Phase 1: API Foundation
- Add pagination to all list endpoints
- Add API versioning (/api/v1/)
- Add rate limiting middleware
- Create API key table + issuance flow
- Implement Layer B gating (Option C)
- Write OpenAPI 3.0 spec
- Deploy as part of existing Next.js app

### Phase 2: MCP Server
- Define tool schemas (5-7 tools)
- Build MCP server (thin wrapper around Supabase)
- Test with Claude Desktop / Claude Code
- Publish to MCP registry

### Phase 3: Developer Experience
- CLI tool (consumes public API)
- TypeScript SDK (auto-generated from OpenAPI spec)
- Python SDK
- Developer documentation site
- Example applications

### Phase 4: Platform
- Contribution API (submit corrections, propose tags)
- Validation pipeline as a service
- Webhook system (content change notifications)
- Usage analytics dashboard for developers
- Premium tier with Layer B access

### Phase 5: Intelligence
- Full-text search (Arabic + English) via external service
- Knowledge graph visualization (interactive explorer)
- Study path generation (curated entity sequences)
- Embedding-based semantic search
- Graph analytics (centrality, clustering, communities)

---

## Appendix: Current File Map

```
src/
  app/
    (public)/
      hub/[slug]/page.tsx        ← Entity hub pages
      surahs/[slug]/page.tsx     ← Surah pages
      posts/[slug]/page.tsx      ← Article pages
      glossary/                  ← Glossary index + detail
    admin/                       ← CMS dashboard
    api/
      entities/                  ← Entity CRUD
      ayah-records/              ← Ayah record CRUD
      entity-tags/               ← Tagging API
      hub/[slug]/                ← Hub assembly endpoint
      posts/                     ← Post CRUD
      subscribers/               ← Newsletter
      email/                     ← Email sending
  components/
    HubTabs.tsx                  ← Hub page tabs (Overview, Articles, Ayahs, Connections)
    AyahCard.tsx                 ← Passage display with expandable grounding
    ArticleContent.tsx           ← Article renderer with inline ayah grounding
    GlossaryPopover.tsx          ← Gold-underlined term popover
    surah/SurahCanvas.tsx        ← Visual surah architecture renderer
  data/
    glossary.ts                  ← 222 glossary entries (12,060 lines)
    visual/surah-{1-114}.tsx     ← 114 visual architecture components
  lib/
    supabase/                    ← Client, server, admin Supabase clients
    auth.ts                      ← Admin JWT verification
    validators.ts                ← Zod schemas
    rate-limit.ts                ← Rate limiter
  types/
    index.ts                     ← All TypeScript interfaces

content/
  tadabbur/
    {NNN}-{surah-slug}/          ← Markdown tadabbur files (source of truth?)
      ayah-NNN.md
      ayahs-NNN-NNN.md

scripts/
  verify_arabic.mjs              ← Arabic text validator
  verify_morphology.mjs          ← Morphology validator
  cross_reference_tafsir.mjs     ← Tafsir cross-reference
  migrate-tadabbur-to-ayah-records.ts  ← Markdown → DB migration
  seed-entities.ts               ← Glossary → entities table
  insert-articles*.ts            ← Article batch insertion
  pending-ayahs.txt              ← Ayah generation queue

supabase/
  migrations/
    20260327_002_unified_content_architecture.sql  ← Schema definition
  SCHEMA_GUIDE.md                ← Schema documentation

.claude/
  skills/
    hub-article-pipeline.md      ← Article writing + insertion skill
    (plus surah-architecture, surah-visual-page, quranic-tadabbur)
```

---

*End of document. Safe travels.*
