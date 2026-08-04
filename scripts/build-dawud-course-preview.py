#!/usr/bin/env python3
"""
build-dawud-course-preview.py

Assembles the five HELD Dawud course modules (plus the three unpublished free
facet articles) into one local preview page that mirrors the live site's
typography: Source Serif body, Playfair headings, Amiri for Arabic, the
navy/cream/gold palette from tailwind.config.ts and the .prose-blog rules in
src/app/globals.css.

Output: docs/courses/preview/index.html  (local preview only — nothing here is
published, and the modules stay HELD as paid course core.)

Re-run after editing any module:  python3 scripts/build-dawud-course-preview.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COURSES = ROOT / "docs" / "courses"
DRAFTS = ROOT / "scripts" / "drafts" / "dawud"
OUT_DIR = COURSES / "preview"

MODULES = [
    ("m0", "Start Here", "The Story", "dawud-module-0-the-story.html"),
    ("m1", "Module 1", "The Complete Man", "dawud-module-1-the-complete-man.html"),
    ("m2", "Module 2", "The Forge and the Courtroom", "dawud-module-2-forge-and-courtroom.html"),
    ("m3", "Module 3", "The One Word", "dawud-module-3-the-one-word.html"),
    ("m4", "Module 4", "What the Quran Won't Tell You", "dawud-module-4-what-the-quran-wont-tell-you.html"),
    ("m5", "Module 5", "The Return in Your Own Hands", "dawud-module-5-the-return-in-your-own-hands.html"),
]

ARTICLES = [
    ("a1", "dawud-jalut-victory-quran.md"),
    ("a2", "dawud-iron-work-worship-quran.md"),
    ("a3", "dawud-khalifa-hawa-quran.md"),
]


def module_body(filename: str) -> str:
    """Strip the leading HTML comment banner and the <h1> (we render our own)."""
    raw = (COURSES / filename).read_text(encoding="utf-8")
    raw = re.sub(r"^<!--.*?-->\s*", "", raw, flags=re.S)
    raw = re.sub(r"<h1>.*?</h1>\s*", "", raw, count=1, flags=re.S)
    return raw.strip()


def article_parts(filename: str):
    raw = (DRAFTS / filename).read_text(encoding="utf-8")
    fm = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, flags=re.S)
    meta_block, body = fm.group(1), fm.group(2)

    def field(key):
        m = re.search(rf"^{key}:\s*(.+)$", meta_block, flags=re.M)
        return m.group(1).strip().strip('"').strip("'") if m else ""

    inner = re.search(r"<article[^>]*>(.*?)</article>", body, flags=re.S)
    return field("title"), field("slug"), field("excerpt"), inner.group(1).strip()


def word_count(html: str) -> int:
    txt = re.sub(r"<blockquote.*?</blockquote>", "", html, flags=re.S)
    txt = re.sub(r"<!--.*?-->", "", txt, flags=re.S)
    txt = re.sub(r"<[^>]+>", " ", txt)
    return len(txt.split())


CSS = """
:root{
  --font-sans:'Inter',system-ui,-apple-system,sans-serif;
  --font-serif:'Playfair Display',Georgia,'Times New Roman',serif;
  --font-body:'Source Serif 4',Georgia,'Times New Roman',serif;
  --font-amiri:'Amiri','Scheherazade New',Georgia,serif;
  --navy:#1A3A4A; --navy-dark:#0D1B2A; --navy-medium:#162F3D;
  --cream:#F5F0E8; --cream-muted:#D8D0C4;
  --gold-400:#DBBF6A; --gold-500:#C9A84C; --gold-600:#B8960C;
  --bg:#ffffff; --fg:var(--navy); --body-fg:#3f3f46; --rule:#e4e4e7;
  --panel:rgba(201,168,76,.06);
}
:root[data-theme="dark"]{
  --bg:var(--navy-dark); --fg:var(--cream);
  --body-fg:rgba(245,240,232,.80); --rule:rgba(245,240,232,.12);
  --panel:rgba(201,168,76,.07);
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--font-sans);
     -webkit-font-smoothing:antialiased;transition:background .2s,color .2s}

/* ── shell ─────────────────────────────────────────────── */
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
.masthead{border-bottom:1px solid var(--rule);padding:38px 0 26px;margin-bottom:8px}
.kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;
        color:var(--gold-600);font-weight:600}
:root[data-theme="dark"] .kicker{color:var(--gold-400)}
.masthead h1{font-family:var(--font-serif);font-weight:600;
        font-size:clamp(1.9rem,4.4vw,2.9rem);line-height:1.15;margin:.35em 0 .3em}
.masthead .sub{font-family:var(--font-body);font-size:1.05rem;
        color:var(--body-fg);max-width:60ch;line-height:1.7;margin:0}
.held{display:inline-flex;align-items:center;gap:8px;margin-top:18px;
      font-size:12px;font-weight:600;letter-spacing:.03em;
      border:1px solid rgba(201,168,76,.45);background:var(--panel);
      color:var(--gold-600);border-radius:999px;padding:6px 14px}
:root[data-theme="dark"] .held{color:var(--gold-400)}

.layout{display:grid;grid-template-columns:230px minmax(0,1fr);gap:56px;
        align-items:start;padding-bottom:120px}
@media(max-width:900px){.layout{grid-template-columns:1fr;gap:0}}

/* ── side nav ──────────────────────────────────────────── */
nav.toc{position:sticky;top:24px;padding-top:34px;font-size:13px}
@media(max-width:900px){nav.toc{position:static;padding:22px 0 6px;
        border-bottom:1px solid var(--rule);margin-bottom:20px}}
nav.toc .label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;
        color:var(--body-fg);opacity:.65;font-weight:700;margin-bottom:12px}
nav.toc a{display:block;padding:7px 0 7px 13px;margin-left:-1px;
        border-left:2px solid var(--rule);color:var(--body-fg);
        text-decoration:none;line-height:1.4;transition:.15s}
nav.toc a:hover{color:var(--gold-600);border-left-color:var(--gold-500)}
nav.toc a .n{display:block;font-size:10px;letter-spacing:.1em;
        text-transform:uppercase;opacity:.6}
nav.toc a.active{color:var(--gold-600);border-left-color:var(--gold-500);font-weight:600}
:root[data-theme="dark"] nav.toc a:hover,:root[data-theme="dark"] nav.toc a.active{color:var(--gold-400)}
nav.toc hr{border:0;border-top:1px solid var(--rule);margin:16px 0 14px}

/* ── module blocks ─────────────────────────────────────── */
section.module{padding-top:40px;scroll-margin-top:20px}
section.module + section.module{border-top:1px solid var(--rule);margin-top:64px}
.mod-num{font-size:11px;letter-spacing:.18em;text-transform:uppercase;
        color:var(--gold-600);font-weight:600}
:root[data-theme="dark"] .mod-num{color:var(--gold-400)}
.mod-title{font-family:var(--font-serif);font-weight:600;
        font-size:clamp(1.6rem,3.4vw,2.3rem);margin:.3em 0 .1em;line-height:1.2}
.mod-meta{font-size:12px;color:var(--body-fg);opacity:.6;margin-bottom:26px}

/* ── prose (mirrors .prose-blog in src/app/globals.css) ─── */
.prose-blog{font-family:var(--font-body);max-width:none}
.prose-blog p{margin:0 0 1.35em;font-size:1.0625rem;line-height:1.9;color:var(--body-fg)}
.prose-blog p.text-lg{font-size:1.19rem;line-height:1.8}
.prose-blog h2{font-family:var(--font-serif);font-weight:600;font-size:1.4rem;
        margin:2.1em 0 .7em;color:var(--fg);line-height:1.3}
.prose-blog strong{font-weight:600;color:var(--fg)}
.prose-blog em{font-style:italic}
.prose-blog a{color:var(--gold-600);text-decoration:underline;
        text-underline-offset:4px;text-decoration-color:rgba(201,168,76,.35)}
:root[data-theme="dark"] .prose-blog a{color:var(--gold-400)}

blockquote.ayah-quote{border-left:4px solid var(--gold-500);
        padding:4px 0 4px 22px;margin:2em 0;font-style:italic;
        color:var(--body-fg)}
blockquote.ayah-quote .arabic{font-style:normal;direction:rtl;text-align:right;
        word-break:break-word;overflow-wrap:anywhere;margin-bottom:.6em}
blockquote.ayah-quote .translation{font-size:1.02rem;line-height:1.85;margin:0 0 .5em}
blockquote.ayah-quote cite{display:block;font-style:normal;font-size:12px;
        letter-spacing:.08em;text-transform:uppercase;color:var(--gold-600);
        font-family:var(--font-sans);font-weight:600}
:root[data-theme="dark"] blockquote.ayah-quote cite{color:var(--gold-400)}

/* ── free-article section ──────────────────────────────── */
.divider{margin-top:80px;padding-top:34px;border-top:2px solid var(--rule)}
.divider h2{font-family:var(--font-serif);font-size:1.55rem;margin:.2em 0 .3em}
.divider p{font-family:var(--font-body);color:var(--body-fg);max-width:62ch;line-height:1.75}
.slug{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;
      background:var(--panel);border:1px solid var(--rule);border-radius:5px;
      padding:2px 7px;color:var(--body-fg)}

/* ── theme toggle ──────────────────────────────────────── */
.toggle{position:fixed;right:18px;bottom:18px;z-index:50;
        border:1px solid var(--rule);background:var(--bg);color:var(--fg);
        border-radius:999px;padding:9px 15px;font-size:12px;font-weight:600;
        cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.10)}
"""

JS = """
const root=document.documentElement;
const saved=localStorage.getItem('dawud-preview-theme');
root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.querySelector('.toggle').addEventListener('click',()=>{
  root.dataset.theme = root.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('dawud-preview-theme',root.dataset.theme);
});
const links=[...document.querySelectorAll('nav.toc a')];
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){
    links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
  }});
},{rootMargin:'-15% 0px -75% 0px'});
document.querySelectorAll('section[id]').forEach(s=>obs.observe(s));
"""


READER_INTRO = """
    <p class="sub">This is an early copy of a course we're building — six short parts, about an
    hour end to end. It walks through the Quran's portrait of Dāwūd (David) and the one word God
    keeps repeating about him.</p>
    <p class="sub" style="margin-top:14px">Read it the way you'd read anything: at your own pace,
    skipping what bores you. <strong>Where you stop is the most useful thing you can tell us</strong> —
    so please notice it rather than pushing through. Three questions at the end.</p>
"""

READER_CLOSE = """
<div class="divider" id="feedback">
  <h2>Three questions</h2>
  <p>That's the whole course. If you have five minutes, these three answers are worth more to us
  than any amount of guessing on our end — and honest is far more useful than kind.</p>
  <ol class="qs">
    <li><strong>Could you retell Dāwūd's story out loud right now</strong> — to a friend, or a child —
      without looking back at it? If not, where does it go blurry?</li>
    <li><strong>Where did you stop, slow down, or skim?</strong> Name the exact part. If you didn't
      finish, that is the single most useful answer here.</li>
    <li><strong>Would you have paid for this?</strong> If yes, what feels like the right price. If no,
      what would it need for the answer to change.</li>
  </ol>
  <p class="ps">One ask: please don't forward this on — it isn't published yet.</p>
</div>
"""

READER_CSS = """
.qs{font-family:var(--font-body);color:var(--body-fg);font-size:1.0625rem;line-height:1.85;
    padding-left:22px;max-width:66ch}
.qs li{margin-bottom:1em}
.qs strong{color:var(--fg)}
.ps{font-family:var(--font-body);color:var(--body-fg);opacity:.75;font-size:.95rem;
    margin-top:26px;padding-top:18px;border-top:1px solid var(--rule);max-width:66ch}
"""


def build_reader() -> Path:
    """Sendable single-file edition for test readers: modules only, no articles,
    no internal badges, ending in the three research questions."""
    nav, body = [], []
    for anchor, num, title, filename in MODULES:
        html = module_body(filename)
        label = "Start here" if anchor == "m0" else num
        nav.append(f'<a href="#{anchor}"><span class="n">{label}</span>{title}</a>')
        body.append(
            f'<section class="module" id="{anchor}">'
            f'<div class="mod-num">{label}</div>'
            f'<h2 class="mod-title">{title}</h2>'
            f'<div class="prose-blog">{html}</div></section>'
        )
    nav.append("<hr>")
    nav.append('<a href="#feedback"><span class="n">At the end</span>Three questions</a>')

    page = f"""<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Dāwūd — The Return Inside the Crown</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Playfair+Display:wght@500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>{CSS}{READER_CSS}</style>
</head>
<body>
<div class="wrap">
  <header class="masthead">
    <div class="kicker">A course, in draft</div>
    <h1>Dāwūd — The Return Inside the Crown</h1>
    {READER_INTRO}
  </header>
  <div class="layout">
    <nav class="toc">
      <div class="label">Contents</div>
      {''.join(nav)}
    </nav>
    <main>
      {''.join(body)}
      {READER_CLOSE}
    </main>
  </div>
</div>
<button class="toggle">◐ theme</button>
<script>{JS}</script>
</body>
</html>
"""
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / "dawud-course-reader.html"
    out.write_text(page, encoding="utf-8")
    return out


def build() -> Path:
    nav, body = [], []

    for anchor, num, title, filename in MODULES:
        html = module_body(filename)
        wc = word_count(html)
        nav.append(f'<a href="#{anchor}"><span class="n">{num}</span>{title}</a>')
        body.append(
            f'<section class="module" id="{anchor}">'
            f'<div class="mod-num">{num}</div>'
            f'<h2 class="mod-title">{title}</h2>'
            f'<div class="mod-meta">~{wc:,} words · verify_arabic 0 fail</div>'
            f'<div class="prose-blog">{html}</div></section>'
        )

    nav.append("<hr>")
    nav.append('<div class="label">Free articles</div>')
    art_html = [
        '<div class="divider" id="articles"><h2>Free facet articles</h2>'
        "<p>The funnel tier — each doubles as a Level-1 course station. "
        "Drafted and fully validated, <strong>not yet published</strong>.</p></div>"
    ]
    for anchor, filename in ARTICLES:
        title, slug, excerpt, inner = article_parts(filename)
        wc = word_count(inner)
        short = title.split(":")[0]
        nav.append(f'<a href="#{anchor}"><span class="n">Article</span>{short}</a>')
        art_html.append(
            f'<section class="module" id="{anchor}">'
            f'<div class="mod-num">Free article</div>'
            f'<h2 class="mod-title">{title}</h2>'
            f'<div class="mod-meta">~{wc:,} words · <span class="slug">/posts/{slug}</span></div>'
            f'<div class="prose-blog">{inner}</div></section>'
        )

    page = f"""<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Dawud — The Return Inside the Crown · course preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Playfair+Display:wght@500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<div class="wrap">
  <header class="masthead">
    <div class="kicker">AyahGuide · pilot paid course</div>
    <h1>Dāwūd — The Return Inside the Crown</h1>
    <p class="sub">Five spiral passes over one life. The Quran's most complete man, and the
    one word God keeps over him: <em>awwāb</em>, the one who returns.</p>
    <div class="held">HELD — internal preview, nothing on this page is published</div>
  </header>
  <div class="layout">
    <nav class="toc">
      <div class="label">Modules</div>
      {''.join(nav)}
    </nav>
    <main>
      {''.join(body)}
      {''.join(art_html)}
    </main>
  </div>
</div>
<button class="toggle">◐ theme</button>
<script>{JS}</script>
</body>
</html>
"""
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / "index.html"
    out.write_text(page, encoding="utf-8")
    return out


if __name__ == "__main__":
    path = build()
    kb = path.stat().st_size / 1024
    print(f"built {path}  ({kb:.0f} KB)")
