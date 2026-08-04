#!/usr/bin/env python3
"""Mechanical verification of braintrust-v2 mined insights (GRAPH, BRACKET, RAREADJ lenses).
Every load-bearing count re-derived from scratch. Run from repo root."""
import json, re, sys

CORPUS = json.load(open('scripts/.corpus-cache/quranic-corpus.json'))   # dict "S:A" -> [segments], mushaf order
VERSES = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
TS = {f"{v['surah']}:{v['ayah']}": v['textSimple'] for v in VERSES}

# mushaf order = corpus key insertion order
ORDER = list(CORPUS.keys())
ORDER_IDX = {k: i for i, k in enumerate(ORDER)}

def feat(seg):
    return seg.get('features', '') or ''

def root_verses(root):
    """verses (in mushaf order) containing >=1 segment with this root; also token count."""
    vs, toks = [], 0
    for ref in ORDER:
        n = sum(1 for s in CORPUS[ref] if s.get('root') == root)
        if n:
            vs.append(ref); toks += n
    return vs, toks

def lemma_verses(lemma):
    vs, toks = [], 0
    for ref in ORDER:
        n = sum(1 for s in CORPUS[ref] if ('LEM:'+lemma) in feat(s))
        if n:
            vs.append(ref); toks += n
    return vs, toks

def first_last(vs):
    if not vs: return (None, None)
    sv = sorted(vs, key=lambda r: ORDER_IDX[r])
    return sv[0], sv[-1]

def phrase_hits(sub):
    return [ref for ref in ORDER if sub in TS.get(ref, '')]

def same_verse_law(rootA, rootB):
    """of verses containing rootA, how many also contain rootB (same verse)."""
    vs, _ = root_verses(rootA)
    hit = [r for r in vs if any(s.get('root') == rootB for s in CORPUS[r])]
    return len(vs), len(hit), vs, hit

def same_verse_lemma_law(rootA, lemmaB):
    vs, _ = root_verses(rootA)
    hit = [r for r in vs if any(('LEM:'+lemmaB) in feat(s) for s in CORPUS[r])]
    return len(vs), len(hit), vs, hit

R = []  # results
def check(id, desc, ok, detail):
    R.append((id, 'PASS' if ok else 'FAIL', desc, detail))

# ---------------- GRAPH ----------------
# G1 خنس exactly 2 verses 81:15,114:4
vs,t = root_verses('خنس'); check('GRAPH-1','خنس root =2 verses {81:15,114:4}', set(vs)=={'81:15','114:4'} and t==2, f'{t} tok / {vs}')
# G2 رتل 2 verses 25:32,73:4, 4 tokens
vs,t = root_verses('رتل'); check('GRAPH-2','رتل =4 tok /2 verses {25:32,73:4}', set(vs)=={'25:32','73:4'} and t==4, f'{t} tok / {vs}')
# G3 قبس 3 verses
vs,t = root_verses('قبس'); check('GRAPH-3','قبس =3 verses {20:10,27:7,57:13}', set(vs)=={'20:10','27:7','57:13'}, f'{t} tok / {vs}')
# G4 رهن 3 verses
vs,t = root_verses('رهن'); check('GRAPH-4','رهن =3 verses {2:283,52:21,74:38}', set(vs)=={'2:283','52:21','74:38'}, f'{t} tok / {vs}')
# G5 كظم 6 verses + phrase 16:58/43:17
vs,t = root_verses('كظم'); ph = phrase_hits('ظل وجهه مسودا وهو كظيم')
check('GRAPH-5','كظم =6 verses', set(vs)=={'3:134','12:84','16:58','40:18','43:17','68:48'}, f'{t} tok / {vs}')
check('GRAPH-5b','face-darkens phrase only 16:58,43:17', set(ph)=={'16:58','43:17'}, f'{ph}')
# G6 حنجر 2 verses
vs,t = root_verses('حنجر'); check('GRAPH-6','حنجر =2 verses {33:10,40:18}', set(vs)=={'33:10','40:18'}, f'{t} tok / {vs}')
# G7 برزخ 3 verses
vs,t = root_verses('برزخ'); check('GRAPH-7','برزخ =3 verses {23:100,25:53,55:20}', set(vs)=={'23:100','25:53','55:20'}, f'{t} tok / {vs}')
# G8 شحح 4 verses 5 tokens + repeated sentence 59:9/64:16
vs,t = root_verses('شحح'); ph = phrase_hits('ومن يوق شح نفسه فاولايك هم المفلحون')
check('GRAPH-8','شحح =5 tok /4 verses', set(vs)=={'4:128','33:19','59:9','64:16'} and t==5, f'{t} tok / {vs}')
check('GRAPH-8b','muflihun sentence only 59:9,64:16', set(ph)=={'59:9','64:16'}, f'{ph}')
# G9 زلزل verbs passive; root in 4 verses
vs,t = root_verses('زلزل')
verbs = {ref:[s for s in CORPUS[ref] if s['pos']=='V' and s.get('root')=='زلزل'] for ref in vs}
allpass = all('PASS' in feat(s) for ref in verbs for s in verbs[ref])
check('GRAPH-9','زلزل =4 verses {2:214,22:1,33:11,99:1}', set(vs)=={'2:214','22:1','33:11','99:1'}, f'{t} tok / {vs}')
check('GRAPH-9b','all زلزل verbs passive', allpass, f'{ {r:[feat(s) for s in verbs[r]] for r in verbs if verbs[r]} }')
# G10 خردل 2 verses + phrase
vs,t = root_verses('خردل'); ph = phrase_hits('مثقال حبة من خردل')
check('GRAPH-10','خردل =2 verses {21:47,31:16}', set(vs)=={'21:47','31:16'}, f'{t} tok / {vs}')
check('GRAPH-10b','mustard phrase only 21:47,31:16', set(ph)=={'21:47','31:16'}, f'{ph}')
# G11 مقت 5 verses 6 tokens (40:10 twice)
vs,t = root_verses('مقت')
check('GRAPH-11','مقت =6 tok /5 verses, 40:10 has 2', set(vs)=={'4:22','35:39','40:10','40:35','61:3'} and t==6, f'{t} tok / {vs}')
# G12 صرصر 3 verses, all Ad; phrase rihan sarsaran 41:16/54:19
vs,t = root_verses('صرصر'); ph = phrase_hits('ريحا صرصرا')
check('GRAPH-12','صرصر =3 verses {41:16,54:19,69:6}', set(vs)=={'41:16','54:19','69:6'}, f'{t} tok / {vs}')
check('GRAPH-12b','ريحا صرصرا only 41:16,54:19', set(ph)=={'41:16','54:19'}, f'{ph}')

# ---------------- BRACKET ----------------
def bracket(id, root, n, first, last, lemma=False):
    vs,t = (lemma_verses(root) if lemma else root_verses(root))
    f,l = first_last(vs)
    check(id, f'{"LEM" if lemma else "root"} {root} n={n} first={first} last={last}',
          len(vs)==n and f==first and l==last, f'n={len(vs)} first={f} last={l}')
    return vs

bracket('BRACKET-1','نعم',140,'1:7','102:8')
bracket('BRACKET-2','خلد',87,'2:25','104:3')
b3 = bracket('BRACKET-3','مرض',24,'2:10','74:31')
ph = phrase_hits('في قلوبهم مرض'); check('BRACKET-3b','phrase في قلوبهم مرض =11, first 2:10 last 74:31', len(ph)==11 and ph[0]=='2:10' and ph[-1]=='74:31', f'{len(ph)} hits, first {ph[0] if ph else None} last {ph[-1] if ph else None}')
bracket('BRACKET-4','عوذ',17,'2:67','114:1')
bracket('BRACKET-5','رفع',29,'2:63','94:4')
bracket('BRACKET-6','غرر',27,'3:24','82:6')
# B7 laugh/weep shared first 9:82; weep last 53:60; laugh last 83:34
vd,_ = root_verses('ضحك'); vb,_ = root_verses('بكي')
fd,ld = first_last(vd); fb,lb = first_last(vb)
check('BRACKET-7','ضحك n=10 first 9:82 last 83:34', len(vd)==10 and fd=='9:82' and ld=='83:34', f'ضحك n={len(vd)} first={fd} last={ld} all={vd}')
check('BRACKET-7b','بكي n=7 first 9:82 last 53:60', len(vb)==7 and fb=='9:82' and lb=='53:60', f'بكي n={len(vb)} first={fb} last={lb} all={vb}')
# B8 قمص 6 all in surah 12
vs,t = root_verses('قمص'); allsura12 = all(r.startswith('12:') for r in vs)
check('BRACKET-8','قمص n=6 all surah 12', len(vs)==6 and allsura12, f'n={len(vs)} {vs}')
# exactly-5 same-surah-bracket roots (freq 5-100)
sb = []
allroots = set()
for ref in ORDER:
    for s in CORPUS[ref]:
        if s.get('root'): allroots.add(s['root'])
for rt in allroots:
    vs,_ = root_verses(rt)
    if 5 <= len(vs) <= 100:
        f,l = first_last(vs)
        if f.split(':')[0]==l.split(':')[0]:
            sb.append(rt)
check('BRACKET-8b','exactly 5 same-surah-bracket roots (freq5-100)', len(sb)==5, f'{len(sb)}: {sb}')
bracket('BRACKET-9','سَلام',42,'4:94','97:5', lemma=True)
b10y = bracket('BRACKET-10','يتم',23,'2:83','107:2')
vs,_ = root_verses('كذب'); f,l = first_last(vs)
check('BRACKET-10b','كذب n=282 last 107:1', len(vs)==282 and l=='107:1', f'n={len(vs)} last={l}')
bracket('BRACKET-11','نسي',45,'2:44','87:6')
# B12 LEM ودود exactly 2: 11:90, 85:14
vs,t = lemma_verses('وَدُود'); check('BRACKET-12','LEM ودود =2 {11:90,85:14}', set(vs)=={'11:90','85:14'}, f'n={len(vs)} {vs}')

# ---------------- RAREADJ ----------------
def adj(id, rootA, rootB, expect_verses):
    nA, nhit, vs, hit = same_verse_law(rootA, rootB)
    check(id, f'{rootA} n={expect_verses}, {rootB} same-verse {expect_verses}/{expect_verses}',
          nA==expect_verses and nhit==expect_verses, f'{rootA} in {nA} verses; {rootB} same-verse {nhit}; verses={vs}')

# RA1 طبع 11 verses all with lemma قَلْب ; قسو 6/6
nA,nhit,vs,hit = same_verse_lemma_law('طبع','قَلْب')
check('RAREADJ-1','طبع n=11 all same-verse lemma قلب', nA==11 and nhit==11, f'طبع n={nA} qalb-lemma hit={nhit} verses={vs}')
nA,nhit,vs,hit = same_verse_lemma_law('قسو','قَلْب')
check('RAREADJ-1b','قسو n=6 all same-verse lemma قلب', nA==6 and nhit==6, f'قسو n={nA} hit={nhit} {vs}')
# RA2 شرح 5 all with صدر
adj('RAREADJ-2','شرح','صدر',5)
# RA3 كرب 4 all with نجو
adj('RAREADJ-3','كرب','نجو',4)
# RA4 وجس 3 all with خوف
adj('RAREADJ-4','وجس','خوف',3)
# RA5 هاتوا surface: count هاتوا vs هاتوا برهانكم
h1 = phrase_hits('هاتوا'); h2 = phrase_hits('هاتوا برهانكم')
check('RAREADJ-5','هاتوا surface =4 and all برهانكم', len(h1)==4 and len(h2)==4 and set(h1)==set(h2), f'هاتوا={h1} برهانكم={h2}')
# RA6 حضض 3 all with طعم
adj('RAREADJ-6','حضض','طعم',3)
# RA7 نزغ 4 all with شطن
adj('RAREADJ-7','نزغ','شطن',4)
# RA8 طفأ 3 all with نور
adj('RAREADJ-8','طفأ','نور',3)
# RA9 كذب vs غفر zero same-verse; counts 257 & 202
vk,_ = root_verses('كذب'); vg,_ = root_verses('غفر')
inter = set(vk) & set(vg)
check('RAREADJ-9','كذب n=257, غفر n=202, same-verse=0', len(vk)==257 and len(vg)==202 and len(inter)==0, f'كذب={len(vk)} غفر={len(vg)} intersection={sorted(inter)}')
# RA10 فتل 3 all with ظلم
adj('RAREADJ-10','فتل','ظلم',3)
# RA11 جثم 5 all with أخذ, صبح, دور
nA,_,vs,_ = same_verse_law('جثم','أخذ'); _,ha,_,_ = same_verse_law('جثم','أخذ'); _,hs,_,_ = same_verse_law('جثم','صبح'); _,hd,_,_ = same_verse_law('جثم','دور')
check('RAREADJ-11','جثم n=5, أخذ/صبح/دور all 5/5', nA==5 and ha==5 and hs==5 and hd==5, f'جثم n={nA} اخذ={ha} صبح={hs} دور={hd} verses={vs}')
# RA12 سنبل 4 all with سبع
adj('RAREADJ-12','سنبل','سبع',4)

# ---------------- report ----------------
passes = [r for r in R if r[1]=='PASS']
fails = [r for r in R if r[1]=='FAIL']
print(f"\n{'='*70}\nBRAINTRUST V2 — MECHANICAL VERIFICATION")
print(f"{len(passes)}/{len(R)} checks PASS, {len(fails)} FAIL\n{'='*70}")
for id,st,desc,detail in R:
    mark = '✓' if st=='PASS' else '✗'
    print(f"{mark} {id:14s} {desc}")
    if st=='FAIL':
        print(f"    -> {detail}")
print(f"\n{'='*70}\nFAILURES REQUIRING CORRECTION:")
for id,st,desc,detail in fails:
    print(f"  {id}: {desc}\n     actual: {detail}")
