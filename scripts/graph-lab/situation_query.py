#!/usr/bin/env python3
"""
Experiment (c) — the situation -> theme bridge -> constellation.
The product's front door: a natural-language life-situation drives the engine,
not a theme slug. Reuses the validated graph + merge map.
"""
import re, glob, json, csv, unicodedata
from collections import defaultdict, Counter

def fold(s):
    s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode('ascii').strip().strip('"\'').lower()
    return re.sub(r'[^a-z0-9\- ]','',s).strip()

# merge map
merge={};
for row in csv.DictReader(open('scripts/graph-lab/merge-map.csv',encoding='utf-8')):
    a=fold(row['alias']); ax=row['axis'].strip().lower()
    if a and ax!='drop': merge[a]=(fold(row['canonical']),ax)

# corpus -> nodes + graph
nodes={}; ayah_index={}; raw=[]
for f in [f for f in glob.glob('content/tadabbur/*/ayah*.md') if not any(x in f for x in('.validation','report'))]:
    fm=open(f,encoding='utf-8',errors='ignore').read().split('---'); fm=fm[1] if len(fm)>1 else fm[0]
    sm=re.match(r'(\d+)',f.split('/')[-2]);
    if not sm: continue
    surah=int(sm.group(1)); nums=[int(n) for n in re.findall(r'\d+',f.split('/')[-1].replace('ayah','').replace('ayahs',''))]
    if not nums: continue
    lo,hi=nums[0],(nums[1] if len(nums)>1 else nums[0]); ref=f"{surah}:{lo}" if lo==hi else f"{surah}:{lo}-{hi}"
    tm=re.search(r'title:\s*"?(.*?)"?\s*$',fm,re.M); title=(tm.group(1)[:60] if tm else '')
    tags=set()
    for field in ('concepts','tags'):
        m=re.search(rf'{field}:\s*\[(.*?)\]',fm,re.S)
        if m:
            for x in m.group(1).split(','):
                a=fold(x)
                if a in merge: tags.add(merge[a][0])
    nodes[ref]={'surah':surah,'title':title,'tags':tags}
    for a in range(lo,hi+1): ayah_index[f"{surah}:{a}"]=ref
    mr=re.search(r'related_ayahs:\s*\[(.*?)\]',fm,re.S)
    if mr:
        for x in mr.group(1).split(','):
            x=x.strip().strip('"\'')
            if ':' in x: raw.append((ref,x.split('-')[0]))
adj=defaultdict(set)
for s,t in raw:
    t=ayah_index.get(t)
    if t and t!=s: adj[s].add(t); adj[t].add(s)
deg={r:len(adj[r]) for r in nodes}

SIT=json.load(open('scripts/graph-lab/situations.json'))['situations']
def route(text):
    t=fold(text)
    best=None
    for s in SIT:
        if any(fold(p) in t for p in s['phrasings']): return s
    return None

def constellation_from_seeds(seeds,k=3):
    seeds=set(seeds)
    # pool: nodes carrying >=1 seed; weight = #seeds matched (situational resonance)
    pool=[(r,len(nodes[r]['tags']&seeds)) for r in nodes if nodes[r]['tags']&seeds]
    poolset={r for r,_ in pool}
    within={r:len(adj[r]&poolset) for r,_ in pool}
    pool.sort(key=lambda x:(-x[1], -within[x[0]], -deg[x[0]]))   # seed-hits, then cluster-centrality
    picked=[]
    for r,hits in pool:
        if any(nodes[r]['surah']==nodes[p]['surah'] for p in picked): continue
        if any(r in adj[p] for p in picked): continue
        if any(len(nodes[r]['tags']&nodes[p]['tags'])>5 for p in picked): continue
        picked.append(r)
        if len(picked)==k: break
    return pool,picked,within

print(f"graph: {len(nodes)} nodes, {sum(deg.values())//2} edges\n")
tests=["I feel like a hypocrite — I pray but my heart isn't in it",
       "My brother betrayed me and I can't forgive him",
       "I'm so anxious about money I can't sleep",
       "My faith feels dry, I can't feel anything anymore",
       "I'm questioning whether any of this is even real",
       "I'm terrified of dying"]
for q in tests:
    s=route(q)
    print("="*68)
    print(f'USER: "{q}"')
    if not s: print("  (no situation matched)"); continue
    pool,picks,within=constellation_from_seeds(s['seeds'])
    print(f"  → situation: {s['slug']}   seeds: {', '.join(s['seeds'])}   ({len(pool)} candidate ayahs)")
    for r in picks:
        hits=len(nodes[r]['tags']&set(s['seeds']))
        why=sorted(nodes[r]['tags']&set(s['seeds']))
        print(f"     {r:9s} {nodes[r]['title']}")
        print(f"               speaks via: {', '.join(why)}   [cluster-central={within.get(r,0)}]")
