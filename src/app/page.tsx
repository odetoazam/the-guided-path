import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { BookOpen, Mail } from 'lucide-react'
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
  const publishedSurahs = await getPublishedSurahs()

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
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: CANONICAL_URL,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://www.instagram.com/ayahguideus',
      'https://www.wikidata.org/wiki/Q139257356',
    ],
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

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_60%,_rgba(212,175,55,0.04),_transparent)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Bismillah */}
          <div className="mb-10 font-amiri text-4xl sm:text-5xl text-gold-500/40 leading-relaxed select-none" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-navy dark:text-cream">Receive Spiritual Guidance</span>
            <br />
            <span className="text-gold-gradient">From Quranic Contemplation</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-cream/60 leading-relaxed">
            A contemplative companion for reading the Quran. Grounded in classical tafsir and the Arabic corpus, AyahGuide helps you move past translation into the layered linguistic, thematic, and structural depth the text itself invites — a practice the Quran calls <em>tadabbur</em>.
          </p>

          {/* Scholarly DNA */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-400 dark:text-cream/30">
            <span>Grounded in classical tafsir</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Ibn Kathir</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Tabari</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Qurtubi</span>
            <span aria-hidden className="text-zinc-300 dark:text-cream/20">·</span>
            <span>Al-Zamakhshari</span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/surahs"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-dark hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20"
            >
              <BookOpen className="h-5 w-5" />
              Begin with the Surahs
            </Link>
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-navy-light/40 px-8 py-3.5 text-base font-medium text-navy dark:text-cream/80 hover:bg-zinc-100 dark:hover:bg-navy-medium/50 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Follow the Journey
            </Link>
          </div>

          {/* Start here hint */}
          <div className="mt-5 flex flex-col items-center gap-1.5 text-sm text-zinc-400 dark:text-cream/40">
            <p>
              ✦ New here?{' '}
              <Link href="/surahs/al-fatiha" className="underline underline-offset-2 text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors">
                Begin with Al-Fatiha — the original dua for guidance
              </Link>
            </p>
            <p className="text-xs">
              or{' '}
              <Link href="#paths" className="underline underline-offset-2 text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
                start from where you are →
              </Link>
            </p>
          </div>

          {/* Geometric star divider */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="text-[#C9A84C]/30">
              <polygon
                points="12,2 14.5,8.5 21.5,9 16,13.5 17.5,21 12,17 6.5,21 8,13.5 2.5,9 9.5,8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 flex flex-col items-center gap-2 animate-gentle-bounce">
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold-500/50 animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* Guided Paths — entry points for seekers */}
      <section id="paths" className="relative border-t border-zinc-200 dark:border-zinc-800/50 py-20 px-6 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-cream/30 mb-10">
              Most people find their way in through one of these
            </p>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {PATHS.map((path, i) => (
              <ScrollReveal key={path.slug} delay={i * 80}>
                <PathCard path={path} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Surah Map Teaser */}
      <SurahMapTeaser publishedSurahs={publishedSurahs} />

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
