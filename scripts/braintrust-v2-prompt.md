# Braintrust v2 — Article Ideation Run (prompt)

Paste the block below into a Claude Code session (Fable) to launch the second
article braintrust. Or just say: **"run braintrust v2 per scripts/braintrust-v2-prompt.md — use a workflow"**.
The explicit "use a workflow" phrase is required — it authorizes the multi-agent spend.

---

## The prompt

> Run the next-generation article braintrust for AyahGuide **using a workflow**.
> Model this on the July 9 run (memory: project_article_braintrust_2026_07_09,
> journal at run wf_906b6093-fbd) but with these upgrades:
>
> **Mining phase — 6 agents, effort mixed for an A/B:**
> 4 miners at effort **high**, 2 at **xhigh** — record which tier each insight
> came from so we learn whether xhigh mining survives verification at a higher
> rate. Lenses (one per miner, all sweeping scripts/.corpus-cache/quranic-corpus.json
> + node_modules/quran-validator/data/quran-verses.json):
> 1. **Grammatical voice & verb-form mechanisms** (active/passive flips, Form
>    substitutions under near-identical frames) — the budge-root piece
>    (/posts/budge-root-voice-flip-death-quran) proved this lens ships; Zaynab
>    flagged it as the underused mechanism.
> 2. **Exactly-N phrase sets** (the classic twice-told / complete-set method,
>    fresh sweep below DF≤10 at phrase level, not root level — the n-gram gap
>    the graph work left open).
> 3. **Semantic-graph seams** — mine scripts/graph-lab/edges-typed.json (13,279
>    edges) for high-degree nodes and surprising cross-surah clusters no article
>    covers yet.
> 4. **Rare-word adjacency laws** (the qunut/rahmah pattern: a rare word that is
>    always accompanied — /posts/qunut-despair-mercy-quran is the template).
> 5. **Repeated-scene variation** (same event told 2-3×, wording forks mapped to
>    surah themes — /posts/musa-fire-three-tellings-quran is the template).
> 6. **First/last occurrence architecture** (the qalb-sealed-rusted template —
>    mushaf-order bracketing of a word's story).
>
> **Verification:** every load-bearing count mechanically re-run before any
> advisor sees it (effort low-medium — the rigor is in the scripts).
>
> **Advisor phase:** the 4 standing advisors (Zaynab, Hasan, Yasmin, Khalid —
> memory files advisor_*) draft proposals from the verified pool, cross-critique
> everything outside their own slate. Effort **high**.
>
> **Skeptic phase:** adversarial fact-check of the top 10 — each claim gets an
> independent refuter whose job is to break it. Effort **xhigh**. This stage has
> veto power; a refuted exhibit kills the proposal's shortlist spot.
>
> **Deliberation:** synthesize to a recommended-3 portfolio + ranked reserve,
> scored on the four personas (Amina/Khalil/Sara/Yusuf). Effort **high**.
>
> **Hard constraints (non-negotiable, from Azam):**
> - **Quran-only.** No proposal may depend on a hadith citation for its payoff.
>   (Policy ruling 2026-07-17 — the Eden 96:19 piece was dropped for this;
>   do not resurface it or anything shaped like it.)
> - Simple, layman-accessible prose in all titles/theses
>   (memory: feedback_simple_layman_language).
> - Every corpus claim scoped to its exact morphological category (lemma vs root
>   vs stem), first/last claims stated as mushaf order, no unprovable superlatives.
> - Avoid overlap with all ~30 published connection-reveal/braintrust articles —
>   check the posts table (type=article) before proposing.
> - Output contract: agents append structured results to a ledger file per stage
>   (lesson from the run-2 salvage: results returned only as message text get lost).
>
> Deliverable: dossier artifact + all proposals/critiques/verdicts in the
> workflow journal, and the A/B tally (high vs xhigh miner survival rate).

---

*Created 2026-07-17. Estimated scale: comparable to the July 9 run (~30 agents).*
