#!/usr/bin/env python3
"""
SITUATION ROUTER — free text -> situation slug + canonical seeds.

Replaces the brittle keyword matcher (situation_query.py demo) with a single
cheap LLM classification call. The model classifies into a CLOSED set (the
situation slugs from situations.json), so it cannot invent un-poolable routes;
seeds are unioned from the matched situation and any model-proposed seeds are
validated against the canonical vocabulary before use.

Model: claude-haiku-4-5 (cheapest fast tier; structured outputs supported).
  - temperature=0 for a deterministic classifier (Haiku still accepts it).
  - NO `effort` param (errors on Haiku 4.5).
  - max_tokens small — this is a classification, not generation.
  - Forced structured JSON via output_config.format (json_schema) +
    client.messages.parse() (validates the response against the schema).

Graceful degradation: if the `anthropic` SDK or an API key is absent, falls
back to the offline keyword matcher so the pathway is runnable with no network.

Usage:
    from situation_router import SituationRouter
    r = SituationRouter()                       # auto-detects LLM availability
    result = r.route("i found out my brother has been lying to me for years")
    # -> {"situation": "betrayed-by-family", "seeds": [...], "method": "llm",
    #     "confidence": "high", "reasoning": "..."}

    python situation_router.py "free text here"   # CLI; also runs a self-test
"""
import os, re, json, csv, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SIT_PATH = os.path.join(ROOT, 'scripts/graph-lab/situations.json')
MAP_PATH = os.path.join(ROOT, 'scripts/graph-lab/merge-map.csv')
MODEL = "claude-haiku-4-5"        # cheapest fast tier; supports structured outputs


def _fold(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
    return s.strip().lower()


class SituationRouter:
    def __init__(self, force_keyword=False):
        data = json.load(open(SIT_PATH, encoding='utf-8'))
        self.situations = data['situations']
        self.by_slug = {s['slug']: s for s in self.situations}
        # canonical seed vocabulary (for validating model-proposed seeds)
        self.vocab = set()
        for row in csv.DictReader(open(MAP_PATH, encoding='utf-8')):
            if row['axis'].strip().lower() != 'drop':
                self.vocab.add(row['canonical'].strip().lower())
        self.client = None
        if not force_keyword:
            self.client = self._try_client()

    # ---- LLM availability ---------------------------------------------------
    def _try_client(self):
        if not (os.getenv('ANTHROPIC_API_KEY') or os.getenv('ANTHROPIC_AUTH_TOKEN')):
            return None
        try:
            import anthropic
            return anthropic.Anthropic()
        except Exception:
            return None

    # ---- schema for forced structured output -------------------------------
    def _schema(self):
        slugs = [s['slug'] for s in self.situations] + ['none']
        return {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "situation": {"type": "string", "enum": slugs,
                              "description": "The single best-matching situation slug, or 'none' if no situation fits."},
                "seeds": {"type": "array", "items": {"type": "string"},
                          "description": "1-5 canonical seed tags drawn ONLY from the provided vocabulary, ordered by relevance."},
                "confidence": {"type": "string", "enum": ["high", "medium", "low"]},
                "reasoning": {"type": "string", "description": "One short sentence."},
            },
            "required": ["situation", "seeds", "confidence", "reasoning"],
        }

    def _system(self):
        catalog = "\n".join(f"- {s['slug']}: {s['description']}" for s in self.situations)
        vocab = ", ".join(sorted(self.vocab))
        return (
            "You are a router for a Quranic contemplation tool. Given a person's free-text "
            "description of what they are going through, classify it into the SINGLE best-matching "
            "situation from the catalog below, and select 1-5 seed tags that name the themes a "
            "constellation of verses should speak to.\n\n"
            "Rules:\n"
            "- `situation` MUST be one of the catalog slugs, or 'none' if nothing fits well.\n"
            "- `seeds` MUST be drawn ONLY from the canonical vocabulary list. Never invent a tag.\n"
            "- Prefer the seeds attached to the matched situation, but you may substitute or add "
            "from the vocabulary if the text points elsewhere.\n"
            "- This is triage, not a fatwā. Do not give rulings or advice; only classify.\n\n"
            f"SITUATION CATALOG:\n{catalog}\n\n"
            f"CANONICAL SEED VOCABULARY:\n{vocab}"
        )

    # ---- the two routing paths ---------------------------------------------
    def route(self, text):
        if self.client is not None:
            try:
                return self._route_llm(text)
            except Exception as e:
                fb = self._route_keyword(text)
                fb['method'] = 'keyword-fallback'
                fb['error'] = f"{type(e).__name__}: {e}"
                return fb
        return self._route_keyword(text)

    def _route_llm(self, text):
        resp = self.client.messages.parse(
            model=MODEL,
            max_tokens=512,
            temperature=0,                       # deterministic classifier
            system=self._system(),
            messages=[{"role": "user", "content": text}],
            output_config={"format": {"type": "json_schema", "schema": self._schema()}},
        )
        out = resp.parsed_output or {}
        slug = out.get('situation', 'none')
        # union curated seeds with model seeds; keep only canonical
        seeds = list(dict.fromkeys(
            [s for s in out.get('seeds', []) if s in self.vocab]
            + (self.by_slug[slug]['seeds'] if slug in self.by_slug else [])
        ))
        return {"situation": slug, "seeds": seeds, "method": "llm",
                "confidence": out.get('confidence'), "reasoning": out.get('reasoning')}

    def _route_keyword(self, text):
        t = _fold(text)
        best, best_hits = None, 0
        for s in self.situations:
            hits = sum(1 for p in s['phrasings'] if _fold(p) in t)
            if hits > best_hits:
                best, best_hits = s, hits
        if not best:
            return {"situation": "none", "seeds": [], "method": "keyword",
                    "confidence": "low", "reasoning": "no phrasing matched"}
        return {"situation": best['slug'], "seeds": best['seeds'], "method": "keyword",
                "confidence": "high" if best_hits > 1 else "medium",
                "reasoning": f"matched {best_hits} phrasing(s)"}


# --- CLI / self-test ---------------------------------------------------------
if __name__ == '__main__':
    r = SituationRouter()
    mode = 'LLM (claude-haiku-4-5)' if r.client else 'keyword-fallback (no API key/SDK)'
    print(f"router mode: {mode}\n")
    if len(sys.argv) > 1:
        print(json.dumps(r.route(' '.join(sys.argv[1:])), indent=2, ensure_ascii=False))
        sys.exit(0)
    # self-test: hard free-text queries that the keyword matcher would MISS
    # (no exact phrasing overlap) — shows where the LLM path earns its keep.
    tests = [
        "i found out my brother has been lying to me for years",       # -> betrayed-by-family
        "my mum passed away last week and i can't stop crying",        # -> grieving-a-loss
        "everyone on instagram seems to have a perfect life and i don't",  # -> comparison-on-social-media
        "the doctor says it's stage 3 and i'm terrified",              # -> facing-illness-or-diagnosis
        "i keep promising myself i'll quit but i always go back",      # -> battling-addiction / tempted
        "a professor argued the quran was edited by later scribes",    # -> academic-critique-of-quran
        "i pray every night but it feels like shouting into a void",   # -> feel-unseen-by-god
        "how do i answer my daughter when she asks why hell exists",   # -> child-asked-a-hard-question
    ]
    for q in tests:
        res = r.route(q)
        print(f"  “{q[:54]}”")
        print(f"     -> {res['situation']:32s} [{res['method']}] seeds={res['seeds'][:4]}")
