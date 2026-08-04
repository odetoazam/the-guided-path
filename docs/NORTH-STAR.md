# NORTH-STAR — standing decisions

*One page. What we're building toward, what's been decided, what's deferred. When session framings conflict, this file wins. Update it when a real decision is made; link decisions to their evidence.*

---

## Standing decisions

### 1. The graph is infrastructure, not a surface (Jul 2026)

The `/reflect` constellation page (Jun 20) was built and killed. Azam's rationale on record (Jul 7): *"it just isn't the route we're going with this — I just want graph connections and such made, to make the future stuff we do easier."*

**The rule:** no product surfaces built *from* the graph until the substrate is done. Current graph work = making connections richer, cleaner, and validated — so that whatever gets built later (ayah pages, companion, map) inherits a finished substrate instead of a half-built one. The constellation artifacts (`constellation-curation.md`, `situations.json`, the engine) are preserved for whenever a situation-entry surface earns its place.

### 2. Product surfaces must filter to validated nodes (Jul 2026)

`graph-export.json` nodes carry `v` (1/0/-1). Product = `v==1` only. Validated-only view is currently **6,222 of 11,755 edges (53%)** — clearing the 837 `validated: false` files roughly doubles the safe graph. (adversarial-review F1, fixed 2026-07-07)

### 3. Settled architecture (stop re-litigating)

Ayah is the node · tree + typed graph are two indexes over it · in-memory build / static JSON projection, no graph DB · edges are candidates with provenance tiers · no vector default, pluggable slot reserved · voice = STT→Claude→TTS pipeline, built LAST, after a text-first demand test. Evidence: `scripts/graph-lab/architecture-v1.md`, `docs/ai-tech-landscape-2026.md`.

### 4. No ayah pages on the public web (Jul 7, 2026 — Azam, explicit)

*"We definitely don't want to publish ayah pages on the web right now. We'll expose them with voice AI or even typing AI as needed."*

**The rule:** the tadabbur corpus is NOT a web-publishing asset — it is the **grounding corpus for AI surfaces** (voice/text companion). The adversarial review's ship-ayah-pages recommendation (F3) is **overruled**: distribution via SEO/AEO of the deep corpus is off the table for now; the corpus's value is realized through the companion, which consumes the graph substrate. This also means the substrate work (validation, edges, promotion) IS the critical path — it's what the AI surfaces will stand on. Azam continues generating tadabburs for remaining coverage himself.

**Violation + correction (2026-07-31).** An overnight session built `/reflections/[slug]` reader pages for all 182 `ayah_records`, put them in the nav, and submitted 173 of them to the sitemap — working from the Jul 27 cofounder backlog, which lists the "ayah-pages publish gap" as priority #1 and contradicts this decision. This file was not checked. Walked back the same session: nav entry removed, `robots: noindex` on the index and the reader route, zero reflection URLs in the sitemap (844 → 671). **The route still exists**, unindexed, because guided-path ayah stops and hub ayah cards previously had no destination at all — that UX gap is separate from web publishing. Open for Azam: (a) keep the noindex route as a path/hub destination, (b) delete it entirely, or (c) reopen the decision. Note it also does not yet filter to `validated` nodes, which decision 2 requires of product surfaces.

**If you are a future session reading the Jul 27 backlog:** that entry is superseded by this decision until Azam says otherwise.

## Open (not yet decided)

- What the first AI surface is (voice vs. typing companion), which pathway it serves first, and its trigger date.

## Graph-substrate work list (the current priority, in leverage order)

1. **Validation burn-down** — 837 `validated: false` files (An-Naml 78, Al-Ankabut 63, Al-Qasas 61…). Each cleared file activates its edges. Doubles the safe graph.
2. **Edge coverage** — ✅ discovery pass BUILT (Jul 7): `propose_edges.py` → 77,827 proposed cross-surah edges, **350-elite promotion queue** (multi-root, DF≤10, both endpoints validated). Next: promotion pass (skill-disciplined review of both passages → confirmed edges into frontmatter with basis).
3. **The corpus's own gap list** — 92 cited-but-unwritten ayahs (`gap-report.md`: 3:14 ×9, 3:54 ×8…) → generation queue. Closing them un-quarantines 190 edges.
4. **Pipeline compounding** — new tadabbur files should propose their own typed edges at generation time (Karpathy-compiler / A-MEM pattern), so the graph grows itself from here on.
