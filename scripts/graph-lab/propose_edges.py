#!/usr/bin/env python3
"""
EDGE DISCOVERY / PROPOSAL PASS  (NORTH-STAR work item 2, Jul 2026)
==================================================================
Find cross-surah lexical-root connections the corpus has NOT authored —
i.e., pairs of passages sharing a distinctive Arabic root with no existing
related_ayahs edge between them. Pure discovery over the corpus cache +
frontmatter; **writes nothing into sacred files**. Output is a graph-lab
artifact with a promotion path.

Tier discipline (extends architecture-v1's "candidates, not facts"):
  The salvage pass marked lexical-root edges `objective` because TWO signals
  agreed: an author chose the link AND the roots verify it. Discovery has no
  author intent — the shared rare root is an objective FACT, but the resonance
  CLAIM is unreviewed. So every record here gets `confidence: 'proposed'` —
  a tier below thematic-asserted, NON-TRAVERSABLE until promoted by a review
  pass (human or skill-disciplined LLM reading both passages).

Strictness (deliberately tighter than salvage, since no author prior):
  - cross-surah pairs only (same-surah rare-root repetition is expected)
  - rarest shared root DF <= 50 ('strong'); DF <= 10 flagged 'very-strong'
  - pair must not already exist in edges-typed.json (any type/tier)

Inputs : scripts/.corpus-cache/quranic-corpus.json, edges-typed.json,
         content/tadabbur/*/ayah*.md (nodes + validation status)
Output : scripts/graph-lab/edges-proposed.json
Re-runnable.
"""
import re, glob, json
from collections import defaultdict, Counter
from itertools import combinations

CORPUS = 'scripts/.corpus-cache/quranic-corpus.json'
TYPED = 'scripts/graph-lab/edges-typed.json'
OUT = 'scripts/graph-lab/edges-proposed.json'

STRONG_DF = 50        # rarest shared root must be at or below this
VERY_STRONG_DF = 10   # sub-label for the highest-signal proposals
PER_ROOT_CAP = 40     # a root spanning >40 passages proposes nothing (combinatorial noise guard)

# ---------- 1. corpus roots + document frequency ------------------------------
corpus = json.load(open(CORPUS, encoding='utf-8'))
ayah_roots = {}
df = Counter()
for key, segs in corpus.items():
    roots = {s['root'] for s in segs if s.get('root')}
    ayah_roots[key] = roots
    for r in roots:
        df[r] += 1

# ---------- 2. nodes from frontmatter (same glob discipline as build_export) --
def parse_ref(s, lo, hi): return f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"

nodes = {}
for f in glob.glob('content/tadabbur/*/ayah*.md'):
    if any(x in f for x in ('.validation', 'report')):
        continue
    sm = re.match(r'(\d+)', f.split('/')[-2])
    nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
    if not sm or not nums:
        continue
    surah = int(sm.group(1)); lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
    ref = parse_ref(surah, lo, hi)
    txt = open(f, encoding='utf-8', errors='ignore').read()
    fm = txt.split('---')[1] if txt.count('---') >= 2 else ''
    vm = re.search(r'^validated:\s*(true|false)', fm, re.M)
    v = -1 if not vm else (1 if vm.group(1) == 'true' else 0)
    proots = set()
    for a in range(lo, hi + 1):
        proots |= ayah_roots.get(f"{surah}:{a}", set())
    nodes[ref] = {'surah': surah, 'roots': proots, 'v': v}

# ---------- 3. existing edges (unordered pairs, ALL tiers) --------------------
typed = json.load(open(TYPED, encoding='utf-8'))
existing = set()
for e in typed['edges']:
    existing.add(frozenset((e['src'], e['tgt'])))

# Also exclude pairs a promotion review already REJECTED — otherwise every run
# re-proposes them and they burn review budget again (adversarial-deliberation
# F4: dedup against seen, not just confirmed).
rejected = 0
try:
    prom = json.load(open('scripts/graph-lab/edges-promoted.json', encoding='utf-8'))
    for e in prom.get('edges', []):
        if e.get('verdict') == 'REJECT':
            existing.add(frozenset((e['src'], e['tgt'])))
            rejected += 1
except FileNotFoundError:
    pass

# Roots whose MOTIF was already reviewed (F4) are done — confirmed participants
# became real edges via the promotion overlay; everything else about that root was
# judged and should not re-surface as a fresh discovery. Skip them wholesale.
reviewed_roots = set()
try:
    reviewed_roots = set(json.load(open('scripts/graph-lab/motifs-reviewed.json',
                                        encoding='utf-8')).get('roots', []))
except FileNotFoundError:
    pass

# ---------- 4. inverted index over DISTINCTIVE roots -> propose ---------------
root_to_refs = defaultdict(list)
for ref, n in nodes.items():
    for r in n['roots']:
        if df.get(r, 999) <= STRONG_DF and r not in reviewed_roots:
            root_to_refs[r].append(ref)

pair_roots = defaultdict(list)   # frozenset(pair) -> [(root, df)]
skipped_roots = []
for r, refs in root_to_refs.items():
    if len(refs) > PER_ROOT_CAP:
        skipped_roots.append((r, df[r], len(refs)))
        continue
    for a, b in combinations(refs, 2):
        if nodes[a]['surah'] == nodes[b]['surah']:
            continue                       # cross-surah only
        pair = frozenset((a, b))
        if pair in existing:
            continue                       # already authored
        pair_roots[pair].append((r, df[r]))

proposals = []
for pair, shared in pair_roots.items():
    a, b = sorted(pair, key=lambda x: (nodes[x]['surah'], x))
    shared.sort(key=lambda rd: rd[1])
    min_df = shared[0][1]
    proposals.append({
        'src': a, 'tgt': b,
        'type': 'lexical-root',
        'confidence': 'proposed',          # NON-TRAVERSABLE until promoted
        'strength': 'very-strong' if min_df <= VERY_STRONG_DF else 'strong',
        'basis': 'discovered shared distinctive root(s): '
                 + ', '.join(f"{r}(DF={d})" for r, d in shared[:6]),
        'source': 'propose_edges.py mechanical discovery (no author intent — needs promotion review)',
        'shared_roots': [{'root': r, 'df': d} for r, d in shared],
        'min_df': min_df,
        'n_shared': len(shared),
        'src_v': nodes[a]['v'], 'tgt_v': nodes[b]['v'],
    })

proposals.sort(key=lambda p: (p['min_df'], -p['n_shared']))

meta = {
    'generator': 'scripts/graph-lab/propose_edges.py',
    'discipline': "confidence='proposed' = objective FACT (shared rare root), unreviewed CLAIM "
                  "(resonance). Non-traversable until a promotion pass reads both passages.",
    'strong_df': STRONG_DF, 'very_strong_df': VERY_STRONG_DF, 'per_root_cap': PER_ROOT_CAP,
    'proposals': len(proposals),
    'very_strong': sum(1 for p in proposals if p['strength'] == 'very-strong'),
    'both_validated': sum(1 for p in proposals if p['src_v'] == 1 and p['tgt_v'] == 1),
    'multi_root': sum(1 for p in proposals if p['n_shared'] >= 2),
    'skipped_roots_over_cap': len(skipped_roots),
}
json.dump({'meta': meta, 'proposals': proposals}, open(OUT, 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

bar = "=" * 70
print(bar); print("EDGE DISCOVERY / PROPOSAL PASS"); print(bar)
print(f"nodes: {len(nodes)}  |  existing edge pairs (all tiers + {rejected} rejected): {len(existing)}")
print(f"distinctive roots (DF<={STRONG_DF}): {len(root_to_refs)}  "
      f"(skipped {len(skipped_roots)} over passage-cap {PER_ROOT_CAP})")
print(f"NEW proposed cross-surah edges: {len(proposals)}")
print(f"   very-strong (DF<={VERY_STRONG_DF}): {meta['very_strong']}")
print(f"   multi-root (>=2 shared rare roots): {meta['multi_root']}")
print(f"   both endpoints validated: {meta['both_validated']}")
print(f"\nwritten -> {OUT}")
print("\nTOP 15 (rarest root first — the promotion-review queue):")
for p in proposals[:15]:
    v = f"[v:{p['src_v']}/{p['tgt_v']}]"
    print(f"   {p['src']:10s} <-> {p['tgt']:10s} {v:9s} {p['basis'][:90]}")
