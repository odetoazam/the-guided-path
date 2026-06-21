#!/usr/bin/env python3
"""
Experiment #1 — full normalization + multi-axis graph + hybrid constellation.

1. Parse ontology-v1.md -> a deterministic alias->{canonical, axis} merge map
   (the ontology's own §6 recommendation), cleaning the editorial noise.
2. Apply it to the whole corpus; measure how much of the 12,488-string theme
   space actually collapses (by USES, not just distinct strings).
3. Rebuild the graph with MULTI-AXIS canonical tags (theme / state / device /
   grammar / character / attribute / bridge kept separate).
4. Re-run constellation with hybrid scoring: within-cluster edge-centrality
   (resonance) + maximal-marginal-relevance diversity (distinctness).
"""
import re, glob, json, unicodedata
from collections import defaultdict, Counter

# ---------- 0. fold helper (diacritics -> ascii so takdhīb == takdhib) --------
def fold(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode('ascii')
    s = s.strip().strip('"\'').lower()
    s = re.sub(r'[^a-z0-9\- ]','',s).strip()
    return s

# ---------- 1. load authoritative merge map (merge-map.csv) ------------------
import csv
merge = {}            # folded alias -> (canonical, axis)
canon_axis = {}
dropped_aliases = set()
with open('scripts/graph-lab/merge-map.csv', newline='', encoding='utf-8') as fh:
    for row in csv.DictReader(fh):
        alias=fold(row['alias']); canonical=fold(row['canonical']); axis=row['axis'].strip().lower()
        if not alias: continue
        if axis=='drop': dropped_aliases.add(alias); continue
        merge[alias]=(canonical, axis); canon_axis.setdefault(canonical, axis)

print("="*70); print("MERGE MAP (authoritative merge-map.csv)"); print("="*70)
axis_canon = Counter(canon_axis.values())
print(f"canonical terms: {len(canon_axis)}  | alias rows: {len(merge)}  | explicit DROP aliases: {len(dropped_aliases)}")
print("canonical per axis:", dict(axis_canon))

# ---------- 2/3. parse corpus, apply map, build multi-axis graph --------------
files=[f for f in glob.glob('content/tadabbur/*/ayah*.md') if not any(x in f for x in('.validation','report'))]
nodes={}; ayah_index={}; raw_edges=[]
total_uses=mapped_uses=dropped_uses=0
unmapped=Counter()
def parse_ref(s,lo,hi): return f"{s}:{lo}" if lo==hi else f"{s}:{lo}-{hi}"
for f in files:
    txt=open(f,encoding='utf-8',errors='ignore').read()
    fm=txt.split('---')[1] if txt.count('---')>=2 else txt[:3000]
    sm=re.match(r'(\d+)', f.split('/')[-2]);
    if not sm: continue
    surah=int(sm.group(1))
    nums=[int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah','').replace('ayahs',''))]
    if not nums: continue
    lo,hi=nums[0],(nums[1] if len(nums)>1 else nums[0]); ref=parse_ref(surah,lo,hi)
    tm=re.search(r'title:\s*"?(.*?)"?\s*$',fm,re.M); title=(tm.group(1)[:62] if tm else '')
    axes=defaultdict(set)
    for field in ('concepts','tags'):
        m=re.search(rf'{field}:\s*\[(.*?)\]',fm,re.S)
        if not m: continue
        for x in m.group(1).split(','):
            a=fold(x)
            if not a or len(a)<2: continue
            total_uses+=1
            if a in merge:
                canon,ax=merge[a]; axes[ax].add(canon); mapped_uses+=1
            elif a in dropped_aliases: dropped_uses+=1
            else: unmapped[a]+=1
    nodes[ref]={'surah':surah,'title':title,'axes':axes,
                'all':set().union(*axes.values()) if axes else set()}
    for a in range(lo,hi+1): ayah_index[f"{surah}:{a}"]=ref
    mr=re.search(r'related_ayahs:\s*\[(.*?)\]',fm,re.S)
    if mr:
        for x in mr.group(1).split(','):
            x=x.strip().strip('"\'')
            if ':' in x: raw_edges.append((ref,x.split('-')[0]))

adj=defaultdict(set)
for src,tgt in raw_edges:
    t=ayah_index.get(tgt)
    if t and t!=src: adj[src].add(t); adj[t].add(src)
deg={r:len(adj[r]) for r in nodes}

print("\n"+"="*70); print("NORMALIZATION COVERAGE (the real test of the merge map)"); print("="*70)
signal=mapped_uses+sum(unmapped.values())   # excludes known-noise DROP
print(f"total theme/tag uses in corpus: {total_uses}")
print(f"  mapped to a canonical: {mapped_uses} ({100*mapped_uses//max(1,total_uses)}% of all)")
print(f"  explicitly DROPPED as known noise: {dropped_uses} ({100*dropped_uses//max(1,total_uses)}%)")
print(f"  still unmapped: {sum(unmapped.values())} across {len(unmapped)} strings")
print(f"  >>> SIGNAL COVERAGE (mapped / non-noise): {100*mapped_uses//max(1,signal)}%")
print(f"  -> distinct strings BEFORE: ~12,488   AFTER: {len(canon_axis)} canonical")
tail_recurring=sum(v for k,v in unmapped.items() if v>=5)
print(f"  unmapped uses that still RECUR (>=5x): {tail_recurring}")
print(f"  top still-unmapped recurring:", [k for k,_ in unmapped.most_common(12)])

# ---------- 4. hybrid constellation ------------------------------------------
def axis_of(term):
    return merge.get(term,(None,canon_axis.get(term)))[1]

def constellation(seed, k=3):
    seed=fold(seed)
    pool=[r for r in nodes if seed in nodes[r]['all']]
    if not pool: return seed,0,[]
    poolset=set(pool)
    # resonance = edges WITHIN the cluster (central exemplar of THIS theme), not raw degree
    within={r:len(adj[r]&poolset) for r in pool}
    pool.sort(key=lambda r:(-within[r], -deg[r]))
    picked=[]
    for r in pool:
        if any(nodes[r]['surah']==nodes[p]['surah'] for p in picked): continue      # surah diversity
        if any(r in adj[p] for p in picked): continue                                # not the "same point"
        if any(len(nodes[r]['all'] & nodes[p]['all'])>5 for p in picked): continue    # low tag overlap
        picked.append(r)
        if len(picked)==k: break
    return seed,len(pool),picked

print("\n"+"="*70); print("QUERY — HYBRID CONSTELLATION (within-cluster centrality + MMR)"); print("="*70)
for s in ['grief','arrogance','divine-testing','sabr','tawakkul']:
    seed,n,picks=constellation(s)
    print(f"\nseed '{seed}'  ({n} candidates, within-cluster resonance ranking)")
    for r in picks:
        ax=nodes[r]['axes']
        ang=sorted((ax.get('theme',set())|ax.get('state',set())) - {seed})[:4]
        dev=sorted(ax.get('device',set())|ax.get('grammar',set()))[:3]
        print(f"   {r:9s} w={len(adj[r]&{x for x in nodes if seed in nodes[x]['all']}):2d}  {nodes[r]['title']}")
        print(f"             theme/state: {', '.join(ang) or '—'}")
        if dev: print(f"             device/grammar: {', '.join(dev)}")
