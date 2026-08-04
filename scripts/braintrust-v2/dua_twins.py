import pickle, json
from collections import defaultdict
data=pickle.load(open('scripts/braintrust-v2/.ngram_cache.pkl','rb'))
NV=data['ngram_verses']
verses=json.load(open('node_modules/quran-validator/data/quran-verses.json'))
simple={f"{v['surah']}:{v['ayah']}":v['textSimple'] for v in verses}
def surah(k): return int(k.split(':')[0])

# phrases starting with a prayer marker, df==2, different surah, n>=3
markers=('ربنا','ربي','رب ')
seen=set()
out=[]
for g,keys in NV.items():
    if len(keys)!=2: continue
    n=g.count(' ')+1
    if n<3: continue
    if not any(g.startswith(m) for m in markers): continue
    k1,k2=keys
    if surah(k1)==surah(k2): continue
    out.append((n,g,tuple(sorted(keys))))
# dedupe maximal by pair
out.sort(key=lambda x:-x[0])
best={}
for n,g,pair in out:
    if pair in best and g in best[pair][1]: continue
    if pair not in best: best[pair]=(n,g)
for pair,(n,g) in sorted(best.items(),key=lambda x:-x[1][0]):
    if n<3: continue
    print(f"\n[{n}w] '{g}'")
    for k in pair: print(f"   {k}: {simple[k][:100]}")
