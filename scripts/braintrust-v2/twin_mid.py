import pickle, json
from collections import defaultdict
data = pickle.load(open('scripts/braintrust-v2/.ngram_cache.pkl','rb'))
NV = data['ngram_verses']
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
simple = {f"{v['surah']}:{v['ayah']}": v['textSimple'] for v in verses}
toks = {k:v.split() for k,v in simple.items()}
def surah(k): return int(k.split(':')[0])

pair_phrases=defaultdict(list)
for g,keys in NV.items():
    if len(keys)!=2: continue
    n=g.count(' ')+1
    if n<4: continue
    k1,k2=keys
    if surah(k1)==surah(k2): continue
    pair_phrases[tuple(sorted(keys))].append(g)

rows=[]
for pair,phrases in pair_phrases.items():
    k1,k2=pair
    t1,t2=set(toks[k1]),set(toks[k2])
    jac=len(t1&t2)/len(t1|t2)
    longest=max(phrases,key=lambda p:p.count(' '))
    maxlen=longest.count(' ')+1
    rows.append((jac,maxlen,longest,k1,k2))
rows.sort(key=lambda r:(r[0],-r[1]))
print("=== twins jac 0.10-0.22, 4-6w ===")
c=0
for jac,maxlen,longest,k1,k2 in rows:
    if maxlen>6: continue
    if jac<0.10 or jac>0.22: continue
    c+=1
    if c>55: break
    print(f"\njac={jac:.2f} [{maxlen}w] '{longest}'")
    print(f"   {k1}: {simple[k1][:100]}")
    print(f"   {k2}: {simple[k2][:100]}")
