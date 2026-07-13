#!/usr/bin/env python3
"""
Prove the TYPED edge file drives the differentiated pathways with confidence
gating — the payoff of the salvage pass. Loads scripts/graph-lab/edges-typed.json
(the derived projection) + node titles from frontmatter, then:

  1. FREE-ROAM with per-edge type/confidence labels (the map UI's data shape).
  2. CONSTELLATION at two operating points: objective-only vs +thematic.
  3. GAP REPORT: the quarantined edges name the most-cited ayahs that have no
     tadabbur node yet — a content-priority signal that falls out for free.

Re-runnable; depends only on edges-typed.json + frontmatter titles.
"""
import re, glob, json
from collections import defaultdict, Counter

EDGES = 'scripts/graph-lab/edges-typed.json'

# ---------- node titles from frontmatter -------------------------------------
def parse_ref(s, lo, hi): return f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"
title = {}
surah_of = {}
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
    title[ref] = tm.group(1)[:60] if tm else ''
    surah_of[ref] = surah

# ---------- typed adjacency ---------------------------------------------------
data = json.load(open(EDGES, encoding='utf-8'))
adj = defaultdict(list)        # ref -> [(neighbour, type, confidence, basis)]
TIER = {'objective': 2, 'thematic-asserted': 1, 'quarantine': 0}
for e in data['edges']:
    if e['confidence'] == 'quarantine':
        continue
    s, t = e['src'], e['tgt']
    adj[s].append((t, e['type'], e['confidence'], e.get('basis', '')))
    adj[t].append((s, e['type'], e['confidence'], e.get('basis', '')))

def deg(ref, min_tier=1):
    return sum(1 for _, _, c, _ in adj[ref] if TIER[c] >= min_tier)

bar = "=" * 72

# ---------- 1. FREE-ROAM with edge labels ------------------------------------
print(bar); print("1. FREE-ROAM — typed neighbours (the map UI's data shape)"); print(bar)
for seed in ['2:255', '12:18', '50:12']:
    print(f"\nfrom {seed}: {title.get(seed,'?')}")
    nbrs = sorted(adj[seed], key=lambda x: (-TIER[x[2]], x[1]))
    for t, typ, conf, basis in nbrs[:7]:
        flag = '●' if conf == 'objective' else '○'
        print(f"   {flag} {t:10s} [{typ:18s} {conf:17s}] {title.get(t,'?')[:38]}")
        print(f"        basis: {basis[:78]}")

# ---------- 2. CONSTELLATION at two operating points -------------------------
def constellation(seed_refs, min_tier, k=3):
    """seed_refs = ayahs known central to a theme; walk objective/thematic edges."""
    pool = Counter()
    for s in seed_refs:
        for t, _, c, _ in adj[s]:
            if TIER[c] >= min_tier:
                pool[t] += 1
    for s in seed_refs:
        pool.pop(s, None)
    ranked = sorted(pool, key=lambda r: (-pool[r], -deg(r, min_tier)))
    picked = []
    for r in ranked:
        if any(surah_of.get(r) == surah_of.get(p) for p in picked):
            continue
        picked.append(r)
        if len(picked) == k:
            break
    return picked

print("\n" + bar)
print("2. CONSTELLATION — objective-only vs +thematic (confidence gating)")
print(bar)
demos = {
    'patience under trial (2:155-157 / 39:10)': ['2:155-157', '39:10'],
    'divine sovereignty (2:255)': ['2:255'],
}
for label, seeds in demos.items():
    seeds = [s for s in seeds if s in adj]
    print(f"\nseed: {label}")
    for tier_name, mt in [('OBJECTIVE-ONLY', 2), ('+THEMATIC', 1)]:
        picks = constellation(seeds, mt)
        print(f"   [{tier_name:14s}] " + " · ".join(f"{r} {title.get(r,'')[:22]}" for r in picks))

# ---------- 3. GAP REPORT from the quarantine tier ---------------------------
print("\n" + bar); print("3. GAP REPORT — most-cited ayahs with NO tadabbur node yet"); print(bar)
missing = Counter()
for e in data['edges']:
    if e['type'] == 'unresolved':
        tgt = e['tgt'].split('-')[0].strip()
        missing[tgt] += 1
print(f"quarantined (unresolved-target) edges: {sum(missing.values())}  "
      f"pointing at {len(missing)} distinct unwritten ayahs")
print("top cited-but-unwritten ayahs (content-priority signal):")
for ref, c in missing.most_common(15):
    print(f"   {ref:10s} cited by {c} edge(s)")
