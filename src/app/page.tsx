import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { BookOpen } from 'lucide-react'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { SiteNav } from '@/components/ui/site-nav'
import { Logo } from '@/components/ui/logo'
import { SurahMapTeaser } from '@/components/surah/SurahMapTeaser'
import { PathCard } from '@/components/paths/PathCard'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { PATHS } from '@/data/paths'
import type { Metadata } from 'next'

const HOMEPAGE_OG_IMAGE = '/api/og/quote?text=A%20contemplative%20companion%20for%20reading%20the%20Qur%27an.&cite=AyahGuide'

export const metadata: Metadata = {
  description: 'Deep Quranic reflections (tadabbur) grounded in Ibn Kathir, al-Tabari, and classical Arabic morphology. 114 surahs, 200+ articles.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    url: CANONICAL_URL,
    images: [{ url: HOMEPAGE_OG_IMAGE, width: 1200, height: 630, alt: 'AyahGuide — a contemplative companion for reading the Quran' }],
  },
  twitter: {
    images: [HOMEPAGE_OG_IMAGE],
  },
}

interface HomeArticle {
  title: string
  slug: string
  excerpt: string | null
  reading_time_minutes: number | null
  entity_tags: { is_primary: boolean; entities: { name_arabic: string | null } | null }[]
}

async function getLatestArticles(): Promise<{ articles: HomeArticle[]; total: number }> {
  try {
    const supabase = await createClient()
    const [{ data }, { count }] = await Promise.all([
      supabase
        .from('posts')
        .select(
          'title, slug, excerpt, reading_time_minutes, featured, published_at, entity_tags ( is_primary, entities:entity_id ( name_arabic ) )'
        )
        .eq('status', 'published')
        .eq('type', 'article')
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false })
        .limit(4),
      supabase
        .from('posts')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'published')
        .eq('type', 'article'),
    ])
    return { articles: (data as unknown as HomeArticle[]) || [], total: count ?? 0 }
  } catch {
    return { articles: [], total: 0 }
  }
}

async function getPublishedSurahs(): Promise<number[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('surah_number')
      .not('surah_number', 'is', null)
      .eq('status', 'published')
    return (data || []).map((row: { surah_number: number }) => row.surah_number)
  } catch {
    return []
  }
}

export default async function LandingPage() {
  const [publishedSurahs, { articles, total: articleCount }] = await Promise.all([
    getPublishedSurahs(),
    getLatestArticles(),
  ])

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: CANONICAL_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_URL}/posts?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: CANONICAL_URL,
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://www.instagram.com/ayahguideus',
      'https://www.wikidata.org/wiki/Q139257356',
    ],
    knowsAbout: [
      'Quran', 'Quranic exegesis', 'Tafsir', 'Tadabbur',
      'Quranic sciences', 'Islamic theology', 'Arabic linguistics',
    ],
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${CANONICAL_URL}/contact`,
      availableLanguage: 'English',
    },
  }

  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      <SiteNav />

      {/* Hero — compact: route readers into content, no email capture */}
      <section className="relative overflow-hidden px-6 pb-16 pt-24 sm:pb-20 sm:pt-28">
        {/* Conic gradient tessellation */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `repeating-conic-gradient(
              from 30deg at 50% 50%,
              rgba(212,175,55,0.6) 0deg 60deg,
              transparent 60deg 120deg
            )`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_40%,_rgba(212,175,55,0.08),_transparent)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Bismillah */}
          <div className="mb-8 font-amiri text-3xl sm:text-4xl text-gold-500/40 leading-relaxed select-none" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            <span className="text-navy dark:text-cream">Read the Quran </span>
            <span className="text-gold-gradient">the way it asks to be read</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-500 dark:text-cream/60 leading-relaxed">
            Close readings of what the Arabic is doing — grounded in classical
            tafsir, honest when it isn&apos;t simple, for any reader willing to go
            slowly. The Quran calls the practice <em>tadabbur</em>.
          </p>

          {/* Scholarly DNA + methodology */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-400 dark:text-cream/30">
            <span>Ibn Kathir</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Tabari</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Qurtubi</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Zamakhshari</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <Link href="/methodology" className="underline underline-offset-2 text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
              How we read →
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/surahs"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3 text-base font-semibold text-navy-dark hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20"
            >
              <BookOpen className="h-5 w-5" />
              Read the Surahs
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-navy-light/40 px-8 py-3 text-base font-medium text-navy dark:text-cream/80 hover:bg-zinc-100 dark:hover:bg-navy-medium/50 transition-colors"
            >
              Read the Articles
            </Link>
          </div>

          {/* Start here hint */}
          <div className="mt-4 text-sm text-zinc-400 dark:text-cream/40">
            ✦ New here?{' '}
            <Link href="/surahs/al-fatiha" className="underline underline-offset-2 text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors">
              Al-Fatiha — the original prayer for guidance
            </Link>
            {' '}· or{' '}
            <Link href="/paths" className="underline underline-offset-2 text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
              start from where you are →
            </Link>
          </div>
        </div>
      </section>

      {/* Article library */}
      {articles.length > 0 && (
        <section id="articles" className="relative border-t border-zinc-200 dark:border-zinc-800/50 py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-cream/30">
                From the article library
              </p>
              <h2 className="mt-3 text-center font-serif text-2xl sm:text-3xl font-bold text-navy dark:text-cream">
                The latest close readings
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
                {articleCount} articles — character studies, cross-surah connections, and single-word discoveries, every claim checked against the corpus and classical tafsir.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {articles.map((article, i) => {
                const arabic = article.entity_tags?.find(t => t.is_primary && t.entities)?.entities?.name_arabic
                return (
                  <ScrollReveal key={article.slug} delay={i * 80}>
                    <Link
                      href={`/posts/${article.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-300 hover:border-[rgba(212,175,55,0.35)] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-[rgba(212,175,55,0.3)]"
                    >
                      {arabic && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute right-5 top-4 select-none leading-none text-[rgba(212,175,55,0.12)] transition-colors duration-300 group-hover:text-[rgba(212,175,55,0.2)]"
                          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", fontSize: '2.6rem', direction: 'rtl' }}
                        >
                          {arabic}
                        </div>
                      )}
                      <h3 className="relative max-w-[85%] font-serif text-lg font-semibold leading-snug text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="relative mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="relative mt-auto pt-4 flex items-center gap-2 text-xs text-zinc-400 dark:text-cream/30">
                        <span className="font-medium text-[rgba(212,175,55,0.65)]">Read</span>
                        {article.reading_time_minutes && <span>· {article.reading_time_minutes} min</span>}
                      </div>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>

            <ScrollReveal delay={200}>
              <div className="mt-8 text-center">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-navy-light/40 px-6 py-2.5 text-sm font-medium text-navy dark:text-cream/80 hover:bg-zinc-100 dark:hover:bg-navy-medium/50 transition-colors"
                >
                  All {articleCount} articles →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Surah Map Teaser */}
      <SurahMapTeaser publishedSurahs={publishedSurahs} />


      {/* Guided paths — honest, compact band */}
      <section id="paths" className="relative border-t border-zinc-200 dark:border-zinc-800/50 py-20 px-6 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-cream/30">
              If you&apos;d rather be walked through it
            </p>
            <p className="mx-auto mt-3 mb-10 max-w-lg text-center text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
              Four short curated sequences — each one starts from a real arrival
              state and moves stop by stop through ayahs, concepts, and close readings.
            </p>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {PATHS.map((path, i) => (
              <ScrollReveal key={path.slug} delay={i * 80}>
                <PathCard path={path} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-center text-sm">
              <Link href="/paths" className="text-[rgba(212,175,55,0.65)] hover:text-[#C9A84C] transition-colors">
                All paths — including the study-circle plan →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="relative border-t border-zinc-200 dark:border-zinc-800/50 py-28 px-6">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_300px_at_50%_50%,_rgba(212,175,55,0.05),_transparent)]" />

        <div className="relative mx-auto max-w-xl text-center">
          <ScrollReveal>
            {/* Ornament */}
            <div className="mb-8 font-amiri text-3xl text-gold-500/30 select-none" dir="rtl">
              ﷽
            </div>

            <h2 className="text-3xl font-bold text-navy dark:text-cream sm:text-4xl">
              Begin the contemplation
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-cream/60 leading-relaxed">
              Linguistic depth, thematic connections, and classical scholarship — delivered when it&apos;s ready. No noise, just depth.
            </p>
          </ScrollReveal>

          {/* Free guide offer */}
          <ScrollReveal delay={100}>
            <div className="mt-10 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.04] px-6 py-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 p-3">
                  <BookOpen className="h-6 w-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]/60">Free when you subscribe</p>
                  <p className="mt-1 font-serif text-base font-semibold text-navy dark:text-cream">
                    The Architecture of Guidance
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-500 dark:text-cream/60 leading-relaxed">
                    How the Quran reshapes the world you see — a guide to understanding divine guidance, the self, and the signs that surround us.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-6">
              <NewsletterSignup source="homepage" />
            </div>
            <p className="mt-4 text-xs text-zinc-400 dark:text-cream/40">
              No spam, ever. Unsubscribe with a single click.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
          <Logo />

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-400 dark:text-cream/40">
            <Link href="/surahs" className="hover:text-navy dark:hover:text-cream transition-colors">
              Surahs
            </Link>
            <Link href="/glossary" className="hover:text-navy dark:hover:text-cream transition-colors">
              Glossary
            </Link>
            <Link href="/understanding-quran" className="hover:text-navy dark:hover:text-cream transition-colors">
              Understanding Quran
            </Link>
            <Link href="/articles" className="hover:text-navy dark:hover:text-cream transition-colors">
              Articles
            </Link>
            <Link href="/paths" className="hover:text-navy dark:hover:text-cream transition-colors">
              Paths
            </Link>
            <Link href="#subscribe" className="hover:text-navy dark:hover:text-cream transition-colors">
              Subscribe
            </Link>
            <Link href="/privacy" className="hover:text-navy dark:hover:text-cream transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-navy dark:hover:text-cream transition-colors">
              Terms
            </Link>
          </div>

          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-[#C9A84C]/20">
            <polygon
              points="12,2 14.5,8.5 21.5,9 16,13.5 17.5,21 12,17 6.5,21 8,13.5 2.5,9 9.5,8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>

          <p className="text-xs text-zinc-400 dark:text-cream/40">
            &copy; {new Date().getFullYear()} AyahGuide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
