#!/usr/bin/env python3
"""
End-to-end validation of the semantic-graph architecture on REAL corpus data.
Builds an in-memory graph projection from frontmatter (no DB needed at this scale)
and runs two differentiated-pathway queries: constellation + free-roam.
Proves the architecture before any infra is built.
"""
import re, glob, json
from collections import defaultdict, Counter

# --- pragmatic merge map (subset of ontology-v1 §A — enough to validate) -------
MERGE = {}
def alias(canon, *aliases):
    for a in (canon,)+aliases: MERGE[a]=canon
alias('divine-mercy','mercy','rahmah','rahma','grace','fadl','divine-grace','divine-favor','ni\'mah','blessing','blessings')
alias('sabr','patience','steadfastness','perseverance','thabat','firmness')
alias('hidayah','guidance','huda','hudan','rushd','straight-path','sirat-mustaqim','misguidance','dalal')
alias('denial','takdhib','rejection','turning-away','tawalli','mockery','istihza','i\'rad')
alias('tawbah','repentance','inabah','ruju','return-to-allah')
alias('gratitude','shukr')
alias('akhirah','hereafter','afterlife')
alias('resurrection','ba\'th','revival','gathering')
alias('accountability','hisab','reckoning','mizan','responsibility','individual-accountability')
alias('divine-justice','justice','adl','qist')
alias('tawakkul','trust','reliance','dependence')
alias('tawhid','oneness','unity-of-god')
alias('shirk','idolatry','false-gods','idols','taghut')
alias('iman','faith','belief')
alias('kufr','disbelief')
alias('nifaq','hypocrisy')
alias('taqwa','god-consciousness')
alias('divine-testing','trial','test','testing','ibtila','fitnah','hardship','affliction')
alias('rizq','provision','sustenance')
alias('grief','suffering','distress','anxiety','despair','abandonment','sorrow')
alias('hope','raja','optimism')
alias('fear','khawf','khashyah','awe','dread')
alias('certainty','yaqin','conviction')
alias('doubt','conjecture','zann','suspicion','uncertainty')
alias('arrogance','kibr','istikbar','pride','ego')
alias('signs','ayat','signs-of-allah','divine-signs','bayyinat','evidence')
alias('qadar','divine-decree','decree','taqdir','divine-will','sunnat-allah','divine-promise')
alias('creation','khalq','human-origin')
alias('dunya','worldly-life','materialism','impermanence','transience')
alias('knowledge','ilm','epistemology')
alias('prophethood','messengership','risalah','prophets','messengers')
alias('revelation','wahy','tanzil','gradual-revelation')
alias('quran','kitab','scripture','furqan')
alias('jannah','paradise','gardens')
alias('jahannam','hellfire','hell','fire')
alias('intercession','shafaah')
alias('heedlessness','ghaflah','distraction','forgetting')
def canon(t):
    t=t.strip().strip('"\'').lower()
    return MERGE.get(t,t)

# --- parse corpus -------------------------------------------------------------
files=[f for f in glob.glob('content/tadabbur/*/ayah*.md') if not any(x in f for x in('.validation','report'))]
nodes={}            # ref -> {surah, file, title, themes:set}
ayah_index={}       # "surah:ayah" -> ref
raw_edges=[]        # (src_ref, "surah:ayah")
def parse_ref(surah, lo, hi): return f"{surah}:{lo}" if lo==hi else f"{surah}:{lo}-{hi}"
for f in files:
    txt=open(f,encoding='utf-8',errors='ignore').read()
    fm=txt.split('---')[1] if txt.count('---')>=2 else txt[:3000]
    surm=re.match(r'(\d+)', f.split('/')[-2]);
    if not surm: continue
    surah=int(surm.group(1))
    # ayah range
    nums=[int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah','').replace('ayahs',''))]
    if not nums: continue
    lo,hi=nums[0],(nums[1] if len(nums)>1 else nums[0])
    ref=parse_ref(surah,lo,hi)
    title=(re.search(r'title:\s*"?(.*?)"?\s*$',fm,re.M) or [None,''])[1][:70]
    themes=set()
    for field in ('concepts','tags'):
        m=re.search(rf'{field}:\s*\[(.*?)\]',fm,re.S)
        if m:
            for x in m.group(1).split(','):
                x=canon(x)
                if x and len(x)>1: themes.add(x)
    nodes[ref]={'surah':surah,'file':f,'title':title,'themes':themes}
    for a in range(lo,hi+1): ayah_index[f"{surah}:{a}"]=ref
    mr=re.search(r'related_ayahs:\s*\[(.*?)\]',fm,re.S)
    if mr:
        for x in mr.group(1).split(','):
            x=x.strip().strip('"\'')
            if ':' in x: raw_edges.append((ref,x.split('-')[0]))  # range target -> start

# --- resolve edges to nodes ---------------------------------------------------
adj=defaultdict(set)
resolved=unresolved=0
for src,tgt in raw_edges:
    tnode=ayah_index.get(tgt)
    if tnode and tnode!=src:
        adj[src].add(tnode); adj[tnode].add(src); resolved+=1
    else: unresolved+=1

# --- graph stats --------------------------------------------------------------
deg={r:len(adj[r]) for r in nodes}
theme_count=Counter(t for n in nodes.values() for t in n['themes'])
print("="*66)
print("GRAPH PROJECTION (in-memory, from frontmatter)")
print("="*66)
print(f"nodes (ayah-passages): {len(nodes)}")
print(f"edges resolved: {resolved}  | unresolved targets: {unresolved}")
print(f"avg degree: {sum(deg.values())/max(1,len(deg)):.1f}  | isolated nodes: {sum(1 for d in deg.values() if d==0)}")
print(f"distinct normalized themes: {len(theme_count)}")
print("most-connected ayahs (graph hubs):")
for r,_ in sorted(deg.items(),key=lambda x:-x[1])[:6]:
    print(f"   {r:8s} deg={deg[r]:2d}  {nodes[r]['title']}")

# --- QUERY 1: CONSTELLATION (situation/theme -> resonant-but-distinct ayahs) ---
def constellation(theme, k=3):
    theme=canon(theme)
    cand=[r for r in nodes if theme in nodes[r]['themes']]
    cand.sort(key=lambda r:-deg[r])           # resonance = connectivity
    picked=[]
    for r in cand:
        # distinctness: different surah AND low secondary-theme overlap with picks
        if any(nodes[r]['surah']==nodes[p]['surah'] for p in picked): continue
        if any(len(nodes[r]['themes'] & nodes[p]['themes'])>4 for p in picked): continue
        picked.append(r)
        if len(picked)==k: break
    return theme,len(cand),picked

print("\n"+"="*66); print("QUERY 1 — CONSTELLATION (resonant but distinct)"); print("="*66)
for th in ['grief','arrogance','divine-testing']:
    theme,n,picks=constellation(th)
    print(f"\nseed theme: '{theme}'  ({n} candidate ayahs)")
    for r in picks:
        others=sorted(nodes[r]['themes']-{theme})[:5]
        print(f"   {r:8s} {nodes[r]['title']}")
        print(f"            angle via: {', '.join(others)}")

# --- QUERY 2: FREE-ROAM (from an ayah, where does the map go) ------------------
def roam(ref):
    print(f"\nfrom {ref}: {nodes.get(ref,{}).get('title','?')}")
    for nb in sorted(adj[ref],key=lambda x:-deg[x])[:6]:
        shared=sorted(nodes[ref]['themes'] & nodes[nb]['themes'])[:4]
        print(f"   → {nb:8s} {nodes[nb]['title']}")
        print(f"            shared: {', '.join(shared) if shared else '(cross-ref, no shared theme tag)'}")

print("\n"+"="*66); print("QUERY 2 — FREE-ROAM (walk the map from one ayah)"); print("="*66)
for seed in ['2:255','12:18']:
    if seed in nodes: roam(seed)
    elif ayah_index.get(seed): roam(ayah_index[seed])
