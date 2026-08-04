import pickle, json
from collections import defaultdict
data = pickle.load(open('scripts/braintrust-v2/.ngram_cache.pkl','rb'))
NV = data['ngram_verses']
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
simple = {f"{v['surah']}:{v['ayah']}": v['textSimple'] for v in verses}
toks = {k: v.split() for k,v in simple.items()}
def surah(k): return int(k.split(':')[0])

# Group DF==2 phrases n>=3 by (verse pair). Record longest phrase per pair.
pair_phrases = defaultdict(list)
for g, keys in NV.items():
    if len(keys)!=2: continue
    n = g.count(' ')+1
    if n<3: continue
    k1,k2 = keys
    if surah(k1)==surah(k2): continue
    pair = tuple(sorted(keys))
    pair_phrases[pair].append(g)

rows=[]
for pair, phrases in pair_phrases.items():
    k1,k2 = pair
    t1,t2 = set(toks[k1]), set(toks[k2])
    jac = len(t1&t2)/len(t1|t2)
    longest = max(phrases, key=lambda p:p.count(' '))
    maxlen = longest.count(' ')+1
    # phrase token fraction of shorter verse
    minverselen = min(len(toks[k1]), len(toks[k2]))
    frac = maxlen/minverselen
    rows.append((jac, maxlen, frac, longest, k1,k2, len(t1&t2)))

# TWIN gold: low jaccard (verses otherwise different) but a solid shared phrase (>=3 words)
# Sort by jaccard asc (most different verses), require maxlen>=3 and shared token count small
rows.sort(key=lambda r:(r[0], -r[1]))
print("=== Twin candidates: LOW token-overlap verses sharing a 3-6w phrase ===")
cnt=0
for jac,maxlen,frac,longest,k1,k2,shared in rows:
    if maxlen<3 or maxlen>7: continue
    if jac>0.30: break
    cnt+=1
    if cnt>70: break
    print(f"\njac={jac:.2f} shared_tokens={shared} phrase[{maxlen}w]='{longest}'")
    print(f"   {k1}: {simple[k1][:95]}")
    print(f"   {k2}: {simple[k2][:95]}")
