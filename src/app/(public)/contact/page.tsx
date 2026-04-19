import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/contact`

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach AyahGuide — corrections, scholar consultations, press inquiries, or general questions. Every credentialed correction is reviewed within fourteen days.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Contact AyahGuide',
    description: 'Corrections, scholar consultations, press inquiries, or general questions.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
    images: [{ url: `/api/og/quote?text=${encodeURIComponent('Reach AyahGuide — corrections, scholar consultations, and press inquiries.')}&cite=AyahGuide`, width: 1200, height: 630, alt: 'Contact AyahGuide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AyahGuide',
    description: 'Corrections, scholar consultations, press inquiries, or general questions.',
    images: [`/api/og/quote?text=${encodeURIComponent('Reach AyahGuide — corrections, scholar consultations, and press inquiries.')}&cite=AyahGuide`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': pageUrl,
      name: 'Contact AyahGuide',
      url: pageUrl,
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: pageUrl },
      ],
    },
  ],
}

interface ChannelProps {
  label: string
  email: string
  description: string
  turnaround: string
}

function Channel({ label, email, description, turnaround }: ChannelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">{label}</h3>
        <span className="text-[11px] uppercase tracking-[0.14em] text-[rgba(212,175,55,0.7)]">{turnaround}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
      <a
        href={`mailto:${email}`}
        className="mt-3 inline-block font-mono text-sm text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline transition-colors"
      >
        {email}
      </a>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-navy-dark">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
            <Link href="/" className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-400">Home</Link>
            <span>/</span>
            <span className="text-zinc-500 dark:text-zinc-400">Contact</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              Contact
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Every email is read by a human. Route your message to the right channel below.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <Channel
              label="Corrections"
              email="corrections@ayahguide.com"
              turnaround="14-day review"
              description="Found a mis-cited ḥadīth, an Arabic typo, a flattened ikhtilāf, or a tafsir attribution we got wrong? Please write. Every correction received from a credentialed source is reviewed within fourteen days, and substantive corrections that affect interpretation are logged in our changelog."
            />
            <Channel
              label="Scholars & Teachers"
              email="scholars@ayahguide.com"
              turnaround="Direct reply"
              description="For 'ulamāʾ, academic mufasirūn, students of sacred knowledge, and Islamic institutions. Feedback on methodology, inquiries about collaboration, requests to be listed as an advisor or reviewer, or formal endorsement conversations."
            />
            <Channel
              label="Press & Media"
              email="press@ayahguide.com"
              turnaround="48-hour response"
              description="For journalists, researchers, and institutional writers working on pieces that touch the Qurʾān. We can point you to well-sourced English treatments of contested verses, provide methodology context, and connect you to classical juridical framing where it's useful for your work."
            />
            <Channel
              label="General"
              email="hello@ayahguide.com"
              turnaround="When we can"
              description="Everything else. Feature requests, feedback on a specific tadabbur, questions, introductions. We read everything; response time varies."
            />
          </div>

          {/* Policy notes */}
          <section className="mt-12">
            <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">Before you write</h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              <p>
                <strong className="text-zinc-600 dark:text-zinc-300">On corrections:</strong>{' '}
                The most useful correction emails include (1) the URL of the page, (2) the specific
                line or claim you are correcting, (3) the classical source or evidentiary basis,
                and (4) your own background (we read unsourced corrections too, but sourced ones
                move faster). Corrections from anyone with relevant training &mdash; traditional
                ʿilm, academic Qur&apos;anic studies, or published scholarship &mdash; are prioritized.
              </p>

              <p>
                <strong className="text-zinc-600 dark:text-zinc-300">On rulings (fatwā):</strong>{' '}
                We do not issue fatwā and cannot answer ruling-specific questions about your life.
                For questions that require a ruling, please consult a qualified scholar within
                your <em>madhhab</em>. See{' '}
                <Link href="/methodology#tadabbur-not-fatwa" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                  our methodology on this
                </Link>.
              </p>

              <p>
                <strong className="text-zinc-600 dark:text-zinc-300">On pastoral questions:</strong>{' '}
                We are not equipped to give personal spiritual counsel over email. For pastoral
                care, reach out to a local imām, teacher, or mental-health professional as
                appropriate. We are happy to point you to resources; we are not the resource itself.
              </p>

              <p>
                <strong className="text-zinc-600 dark:text-zinc-300">On translation requests:</strong>{' '}
                We are a small team working primarily in English. We are not currently commissioning
                translations of the site into other languages, but we welcome conversations with
                translators interested in the material.
              </p>
            </div>
          </section>

          {/* Privacy note */}
          <section className="mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/30 p-5">
            <h3 className="font-serif text-sm font-semibold text-zinc-900 dark:text-white">A note on privacy</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Emails you send to our channels are not added to any mailing list without your
              explicit consent. If you include personal or sensitive information in a correction
              email, it is handled only by the editorial team and deleted from active review
              after the correction is processed. For more on how we handle data, see our{' '}
              <Link href="/privacy" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                privacy policy
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
