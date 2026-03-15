import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { BookOpen, Mail } from 'lucide-react'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { SiteNav } from '@/components/ui/site-nav'
import { Logo } from '@/components/ui/logo'
import { CANONICAL_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    url: CANONICAL_URL,
  },
}

export default async function LandingPage() {
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
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    <div className="min-h-screen bg-white dark:bg-zinc-950">
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
            <span className="text-zinc-900 dark:text-white">Appreciate Quranic depths</span>
            <br />
            <span className="text-gold-gradient">like never before</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Go beyond translation into the layered meanings, linguistic beauty,
            and timeless wisdom woven into every verse of the Quran.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-base font-semibold text-black hover:bg-[#B8960C] transition-colors shadow-lg shadow-gold-500/20"
            >
              <Mail className="h-5 w-5" />
              Begin the Journey
            </Link>
            <Link
              href="/surah"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-8 py-3.5 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Explore Surahs
            </Link>
          </div>

          {/* Free guide hint */}
          <p className="mt-5 text-sm text-zinc-400 dark:text-zinc-500">
            ✦ Free guide for new subscribers —{' '}
            <Link href="#subscribe" className="underline underline-offset-2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">
              A Practical Guide to Tafsir &amp; Tadabbur
            </Link>
          </p>

          {/* Geometric star divider */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="text-[#D4AF37]/30">
              <polygon
                points="12,2 14.5,8.5 21.5,9 16,13.5 17.5,21 12,17 6.5,21 8,13.5 2.5,9 9.5,8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 flex flex-col items-center gap-2 animate-gentle-bounce">
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold-500/50 animate-scroll-dot" />
          </div>
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

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              An invitation to journey deeper
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Receive Quranic insights in your inbox periodically.
            </p>
          </ScrollReveal>

          {/* Free guide offer */}
          <ScrollReveal delay={100}>
            <div className="mt-10 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] px-6 py-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3">
                  <BookOpen className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]/60">Free when you subscribe</p>
                  <p className="mt-1 font-serif text-base font-semibold text-zinc-900 dark:text-white">
                    A Practical Guide to Tafsir &amp; Tadabbur
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    A concise guide to reading the Quran with depth — covering the classical tools of tafsir and how to make tadabbur a living practice.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              No spam, ever. Unsubscribe with a single click.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
          <Logo />

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/surah" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Surahs
            </Link>
            <Link href="/understanding-quran" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Understanding Quran
            </Link>
            <Link href="#subscribe" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Subscribe
            </Link>
          </div>

          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-[#D4AF37]/20">
            <polygon
              points="12,2 14.5,8.5 21.5,9 16,13.5 17.5,21 12,17 6.5,21 8,13.5 2.5,9 9.5,8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} AyahGuide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
