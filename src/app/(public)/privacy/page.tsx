import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/privacy`

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AyahGuide collects, uses, and protects your personal information.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'How AyahGuide collects, uses, and protects your personal information.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="mb-3 mt-10 font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
      {title}
    </h2>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-500 dark:text-zinc-400">Home</Link>
          <span>/</span>
          <span className="text-zinc-500 dark:text-zinc-400">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Your Privacy Matters
          </p>
          <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            AyahGuide is committed to protecting your privacy. This policy explains what information
            we collect, how we use it, and the choices you have.
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-600">
            Last updated: March 22, 2026
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-700 dark:text-zinc-300">Disclaimer:</strong> This
            privacy policy is provided for informational purposes and does not constitute legal advice.
            If you have specific legal concerns about your data or privacy rights, please consult a
            qualified legal professional.
          </p>
        </div>

        {/* Content */}
        <div className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2 [&_p]:mt-3">

          <SectionHeading id="overview" title="1. Overview" />
          <p>
            AyahGuide (<Link href="https://www.ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">ayahguide.com</Link>)
            is a free Quranic reflection (tadabbur) platform. We believe your data belongs to you.
            We collect only what is necessary to provide and improve our service, and we never sell
            or share your personal information with third parties for marketing purposes.
          </p>

          <SectionHeading id="data-collected" title="2. Information We Collect" />

          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            Information you provide directly
          </h3>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Email address</strong> --
              when you subscribe to our newsletter.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Name</strong> (optional) --
              if you choose to provide it when subscribing.
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            Information collected automatically
          </h3>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Analytics data</strong> --
              we use Vercel Analytics, a privacy-friendly analytics service that does not use cookies
              and does not collect personally identifiable information. It provides aggregate data such
              as page views, referrer information, and general geographic region.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Server logs</strong> --
              standard server logs may temporarily record IP addresses and request metadata for security
              and operational purposes.
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            Future analytics (with consent)
          </h3>
          <p>
            We may introduce PostHog or similar analytics tools in the future to better understand how
            visitors use the site. If we do, these tools will only be activated with your explicit consent,
            and you will be able to opt out at any time.
          </p>

          <SectionHeading id="how-we-use" title="3. How We Use Your Information" />
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To send you our newsletter containing Quranic reflections and site updates.</li>
            <li>To improve the site experience based on aggregate analytics data.</li>
            <li>To respond to support inquiries you send us.</li>
            <li>To maintain the security and performance of the site.</li>
          </ul>

          <SectionHeading id="no-selling" title="4. No Selling or Sharing of Data" />
          <p>
            We do not sell, trade, rent, or otherwise share your personal information with third parties.
            We do not run advertisements on this site. Your email address is used solely for delivering
            our newsletter and will never be provided to external marketing services.
          </p>

          <SectionHeading id="third-party" title="5. Third-Party Services" />
          <p>We use a limited number of trusted third-party services to operate AyahGuide:</p>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Resend</strong> --
              for sending newsletter emails. Your email address is stored in Resend&apos;s system to
              facilitate email delivery.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Supabase</strong> --
              for our database and authentication infrastructure. Data is stored securely on
              Supabase&apos;s servers.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Vercel</strong> --
              for hosting and privacy-friendly analytics (no cookies, no personal data collection).
            </li>
          </ul>
          <p>
            Each of these services has their own privacy policies and data processing agreements.
            We select services that align with our commitment to user privacy.
          </p>

          <SectionHeading id="cookies" title="6. Cookies" />
          <p>
            AyahGuide currently does not use tracking cookies. Vercel Analytics, our analytics provider,
            is entirely cookieless. If we introduce any cookies in the future (for example, through
            consent-based analytics), we will update this policy and provide clear opt-in mechanisms
            before any cookies are set.
          </p>
          <p>
            Essential cookies may be used for basic site functionality (such as theme preference),
            but these do not track you or collect personal information.
          </p>

          <SectionHeading id="gdpr" title="7. Your Rights (Including GDPR)" />
          <p>
            If you are located in the European Economic Area (EEA), the United Kingdom, or any other
            jurisdiction with similar data protection laws, you have the following rights regarding
            your personal data:
          </p>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right of access</strong> --
              you may request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to rectification</strong> --
              you may request that we correct inaccurate data.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to erasure</strong> --
              you may request that we delete your personal data.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to data portability</strong> --
              you may request your data in a structured, machine-readable format.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to withdraw consent</strong> --
              you may unsubscribe from our newsletter at any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us
            at <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a>.
            We will respond to your request within 30 days.
          </p>

          <SectionHeading id="unsubscribe" title="8. Unsubscribing" />
          <p>
            Every newsletter email includes an unsubscribe link at the bottom. You can unsubscribe at
            any time with a single click. Once you unsubscribe, you will no longer receive newsletter
            emails from us. You may also contact us
            at <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a> to
            request removal from our mailing list.
          </p>

          <SectionHeading id="data-retention" title="9. Data Retention" />
          <p>
            We retain your email address for as long as you remain subscribed to our newsletter.
            When you unsubscribe, your email address is marked as unsubscribed in our system.
            You may request complete deletion of your data at any time by
            contacting <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a>.
          </p>
          <p>
            Aggregate analytics data (which does not identify individuals) may be retained indefinitely
            to help us understand long-term usage trends.
          </p>

          <SectionHeading id="data-security" title="10. Data Security" />
          <p>
            We take reasonable technical and organizational measures to protect your personal information,
            including encryption in transit (HTTPS), secure server infrastructure, and restricted access
            to personal data. However, no method of transmission over the Internet is 100% secure, and
            we cannot guarantee absolute security.
          </p>

          <SectionHeading id="children" title="11. Children's Privacy" />
          <p>
            AyahGuide is an educational resource intended for a general audience. We do not knowingly
            collect personal information from children under the age of 13. If you believe a child has
            provided us with personal information, please contact us so we can promptly remove it.
          </p>

          <SectionHeading id="changes" title="12. Changes to This Policy" />
          <p>
            We may update this privacy policy from time to time. If we make significant changes, we will
            notify subscribers via email and update the &quot;Last updated&quot; date at the top of this page.
            Your continued use of the site after changes are posted constitutes acceptance of the
            updated policy.
          </p>

          <SectionHeading id="contact" title="13. Contact Us" />
          <p>
            If you have any questions or concerns about this privacy policy or how your data is handled,
            please reach out to us:
          </p>
          <ul>
            <li>
              Email: <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a>
            </li>
            <li>
              Website: <Link href="/" className="text-[rgba(212,175,55,0.85)] hover:underline">ayahguide.com</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
