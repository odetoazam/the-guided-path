#!/usr/bin/env python3
"""
ENGINE PROPOSES — generate the real constellation for every situation against the
FULL graph projection (graph-export.json), so we can curate from real picks.

Recipe (the validated one): pool by seed-theme membership -> rank by
within-cluster edge-centrality + seed-hit count -> MMR diversify (different
surah, not directly adjacent, low secondary-theme overlap) -> top 3.

Outputs:
  scripts/graph-lab/constellation-proposals.json   {slug: [{ref,title,surah,via,central}]}
  + a human-readable report to stdout, flagging thin-coverage situations.
"""
import json
from collections import defaultdict

g = json.load(open('scripts/graph-lab/graph-export.json', encoding='utf-8'))
nodes = g['nodes']; TI = g['themeIndex']
adj = defaultdict(set)
for s, t, tc, cf in g['edges']:
    adj[s].add(t); adj[t].add(s)

def constellation(seeds, k=3):
    pool = defaultdict(int)
    for sd in seeds:
        for ref in TI.get(sd, []):
            pool[ref] += 1
    if not pool:
        return []
    poolset = set(pool)
    central = {r: len(adj[r] & poolset) for r in pool}
    ranked = sorted(pool, key=lambda r: (-pool[r], -central[r], -nodes[r]['d']))
    picked = []
    for r in ranked:
        if any(nodes[r]['s'] == nodes[p]['s'] for p in picked):
            continue
        if any(r in adj[p] for p in picked):
            continue
        if any(len(set(nodes[r]['th']) & set(nodes[p]['th'])) > 5 for p in picked):
            continue
        picked.append(r)
        if len(picked) == k:
            break
    out = []
    for r in picked:
        via = [th for th in nodes[r]['th'] if th in seeds][:4]
        out.append({'ref': r, 'title': nodes[r]['t'], 'surah': nodes[r]['s'],
                    'via': via, 'central': len(adj[r] & poolset), 'pool': len(poolset)})
    return out

proposals = {}
thin = []
print("=" * 74)
print("CONSTELLATION PROPOSALS (engine, full graph) — curate from these")
print("=" * 74)
for s in g['situations']:
    picks = constellation(s['seeds'])
    proposals[s['slug']] = picks
    flag = '' if len(picks) == 3 else '   ⚠ THIN'
    if len(picks) < 3:
        thin.append(s['slug'])
    print(f"\n● {s['slug']}{flag}")
    for p in picks:
        print(f"    {p['ref']:10s} c={p['central']:<3d} {p['title'][:54]}")
        print(f"               via: {', '.join(p['via']) or '—'}")

json.dump(proposals, open('scripts/graph-lab/constellation-proposals.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print("\n" + "=" * 74)
print(f"{len(g['situations'])} situations | full 3-verse: {len(g['situations'])-len(thin)} | thin (<3): {len(thin)}")
if thin:
    print("thin coverage (need a wider seed set or more written tadabbur):", thin)
print("wrote scripts/graph-lab/constellation-proposals.json")
