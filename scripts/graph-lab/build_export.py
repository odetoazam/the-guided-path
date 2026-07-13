#!/usr/bin/env python3
"""
BUILD THE PROJECTION (architecture step 5) — emit the single artifact a UI/engine
consumes: scripts/graph-lab/graph-export.json.

INFRA DECISION (recorded in architecture-v1.md): in-memory build, shipped as a
static JSON projection rebuilt from frontmatter — NOT FalkorDB/Neo4j. At ~2.9k
nodes / ~12k typed edges (avg degree 8), 1-hop free-roam and theme-pooling are
trivial dict/set ops; a graph DB buys nothing and adds an external service, a
query language, and a sync pipeline. Source of truth stays the frontmatter; this
JSON is a derived, rebuildable projection. The engine keeps a clean interface so
FalkorDB can be swapped in later if scale (>100k nodes, multi-hop pathfinding,
live user-graph writes) ever demands it.

Inputs : edges-typed.json (typed edges), merge-map.csv (canonical vocab),
         content/tadabbur/*/ayah*.md (node titles + axis tags), situations.json
Output : graph-export.json
         { meta, nodes:{ref:{s,t,th[]}}, edges:[[src,tgt,typecode,conf]],
           themeIndex:{theme:[refs]}, situations:[...] }
Re-runnable.
"""
import re, glob, json, csv, unicodedata
from collections import defaultdict

OUT = 'scripts/graph-lab/graph-export.json'
TYPECODE = {'lexical-root': 'lex', 'story-continuation': 'cont',
            'shared-concept': 'concept', 'thematic-echo': 'echo',
            'external-reference': 'ext', 'promoted': 'prom'}
CONFCODE = {'objective': 'o', 'thematic-asserted': 't'}

def fold(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
    s = s.strip().strip('"\'').lower()
    return re.sub(r'[^a-z0-9\- ]', '', s).strip()

# canonical merge map (theme/state/attribute axes → the node's pool membership)
merge = {}
for row in csv.DictReader(open('scripts/graph-lab/merge-map.csv', encoding='utf-8')):
    a = fold(row['alias']); c = fold(row['canonical']); ax = row['axis'].strip().lower()
    if a and ax in ('theme', 'state', 'attribute'):   # bridge axis quarantined (call 9)
        merge[a] = c

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
    tm = re.search(r'title:\s*"?(.*?)"?\s*$', fm, re.M)
    title = (tm.group(1)[:80] if tm else '')
    # VALIDATION GATE (adversarial-review-2026-07 F1): carry node validation
    # status into the projection. 1 = validated:true, 0 = validated:false,
    # -1 = no flag (pre-flag era, untriaged). Same philosophy as edge min_df:
    # the data carries the signal, the consumer picks the operating point —
    # but PRODUCT surfaces must filter to v==1 (master validation policy).
    vm = re.search(r'^validated:\s*(true|false)', fm, re.M)
    v = -1 if not vm else (1 if vm.group(1) == 'true' else 0)
    themes = set()
    for field in ('concepts', 'tags'):
        m = re.search(rf'{field}:\s*\[(.*?)\]', fm, re.S)
        if m:
            for x in m.group(1).split(','):
                a = fold(x)
                if a in merge:
                    themes.add(merge[a])
    nodes[ref] = {'s': surah, 't': title, 'th': sorted(themes), 'v': v}

# typed edges (traversable tiers only: objective + thematic-asserted)
data = json.load(open('scripts/graph-lab/edges-typed.json', encoding='utf-8'))
edges = []
deg = defaultdict(int)
for e in data['edges']:
    if e['confidence'] == 'quarantine' or e['type'] == 'external-reference':
        continue
    s, t = e['src'], e['tgt']
    if s in nodes and t in nodes:
        # promotion-review edges (F2) carry type 'promoted:<connection_type>';
        # collapse to a single 'prom' typecode for the projection.
        tc = 'prom' if e['type'].startswith('promoted:') else TYPECODE.get(e['type'], '?')
        edges.append([s, t, tc, CONFCODE[e['confidence']]])
        deg[s] += 1; deg[t] += 1

# attach degree; theme index for constellation pooling
for ref, n in nodes.items():
    n['d'] = deg.get(ref, 0)
theme_index = defaultdict(list)
for ref, n in nodes.items():
    for th in n['th']:
        theme_index[th].append(ref)

situations = json.load(open('scripts/graph-lab/situations.json', encoding='utf-8'))['situations']

out = {
    'meta': {
        'generator': 'scripts/graph-lab/build_export.py',
        'infra': 'in-memory build / static JSON projection (not FalkorDB) — see architecture-v1.md',
        'nodes': len(nodes), 'edges': len(edges),
        'themes': len(theme_index), 'situations': len(situations),
        'typecodes': {v: k for k, v in TYPECODE.items()},
        'confcodes': {v: k for k, v in CONFCODE.items()},
        'validation': {
            'field': 'v (1=validated, 0=failed/pending, -1=unflagged)',
            'policy': 'product surfaces MUST filter nodes to v==1 (and drop edges with a filtered endpoint)',
            'counts': {str(k): sum(1 for n in nodes.values() if n['v'] == k) for k in (1, 0, -1)},
        },
    },
    'nodes': nodes,
    'edges': edges,
    'themeIndex': {k: v for k, v in theme_index.items()},
    'situations': [{'slug': s['slug'], 'description': s['description'], 'seeds': s['seeds']}
                   for s in situations],
}
json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

import os
size = os.path.getsize(OUT)
print(f"wrote {OUT}  ({size/1024:.0f} KB)")
print(f"  nodes={len(nodes)}  traversable edges={len(edges)}  themes={len(theme_index)}  situations={len(situations)}")
vc = out['meta']['validation']['counts']
v_edges = sum(1 for s, t, *_ in edges if nodes[s]['v'] == 1 and nodes[t]['v'] == 1)
print(f"  validation: v=1 {vc['1']} · v=0 {vc['0']} · v=-1 {vc['-1']}  |  validated-only view: {v_edges} edges")
top = sorted(nodes.items(), key=lambda kv: -kv[1]['d'])[:5]
print("  top hubs:", [f"{r}(d={n['d']})" for r, n in top])
