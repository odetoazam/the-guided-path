import json, os
os.makedirs('scripts/braintrust-v2/ledgers', exist_ok=True)
corpus=json.load(open('scripts/.corpus-cache/quranic-corpus.json'))
verses=json.load(open('node_modules/quran-validator/data/quran-verses.json'))
vs={f"{v['surah']}:{v['ayah']}":v for v in verses}

def roots_verses(root):
    out=[]
    for k,segs in corpus.items():
        if any(s.get('root')==root for s in segs):
            out.append(k)
    return out

# order-preserving list already? dict preserves insertion (mushaf)
def keys_with(phrase):
    return [k for k,v in vs.items() if phrase in v['textSimple']]

print("=== SCENE-1 ===")
print("phrase اضرب بعصاك الحجر:", keys_with('اضرب بعصاك الحجر'))
print("root فجر:", roots_verses('فجر'), len(roots_verses('فجر')))
print("root بجس:", roots_verses('بجس'))
print("2:60 twelve:", 'اثنتا عشرة عينا' in vs['2:60']['textSimple'])
print("7:160 twelve:", 'اثنتا عشرة عينا' in vs['7:160']['textSimple'])

print("=== SCENE-2 ===")
print("phrase للملايكة اني:", keys_with('للملايكة اني'))
for k in ['2:30','15:28','38:71']:
    rs=set(s.get('root') for s in corpus[k])
    print(k, 'جعل' in rs, 'خلف' in rs, 'خلق' in rs, 'بشر' in rs, 'صلصل' in rs, 'حما' in rs, 'طين' in rs)
print("15:28 salsal text:", 'صلصال' in vs['15:28']['textSimple'], 'ح' )
print("15:28 textSimple:", vs['15:28']['textSimple'])
print("38:71 textSimple:", vs['38:71']['textSimple'])

print("=== SCENE-3 ===")
print("root ثعب:", roots_verses('ثعب'))
print("7:107 text:", vs['7:107']['textSimple'])
print("26:32 text:", vs['26:32']['textSimple'])
print("20:20 has حية:", 'حية' in vs['20:20']['textSimple'])
print("root جنن verses containing جان:")
for k in ['27:10','28:31']:
    print(k, vs[k]['textSimple'])
print("7:107 khawf:", any('خوف' in (s.get('root') or '') for s in corpus['7:107']))
print("26:32 khawf:", any('خوف' in (s.get('root') or '') for s in corpus['26:32']))

print("=== SCENE-4 ===")
print("root زلل:", roots_verses('زلل'))
print("root وسوس:", roots_verses('وسوس'))
print("2:36 start:", vs['2:36']['textSimple'][:30])
print("7:20:", 'فوسوس' in vs['7:20']['textSimple'], 'لهما' in vs['7:20']['textSimple'])
print("20:120:", 'فوسوس' in vs['20:120']['textSimple'], 'اليه' in vs['20:120']['textSimple'])
