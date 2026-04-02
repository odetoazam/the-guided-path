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
            Last updated: April 1, 2026
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
            Optional analytics (with consent only)
          </h3>
          <p>
            We use PostHog for optional behavioral analytics (page views, navigation patterns). PostHog
            is only activated if you explicitly accept analytics cookies via the consent banner. If you
            decline or have not yet responded, PostHog does not load and no analytics cookies are set.
            You can change your preference at any time by clearing your browser&apos;s local storage for
            this site.
          </p>
          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            Error tracking
          </h3>
          <p>
            We use Sentry for error monitoring in production. Sentry captures technical error data
            (stack traces, browser/OS info, and session replay on errors only) to help us diagnose
            and fix bugs. It does not collect personal information beyond what is incidentally included
            in error context.
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
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Resend</strong> —
              for sending newsletter emails. Your email address is stored in Resend&apos;s system to
              facilitate email delivery.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Supabase</strong> —
              for our database and authentication infrastructure. Data is stored securely on
              Supabase&apos;s servers.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Vercel</strong> —
              for hosting and privacy-friendly analytics (no cookies, no personal data collection).
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">PostHog</strong> —
              for optional behavioral analytics (page views, session data). Only activated with your
              consent. PostHog stores data on servers in the United States.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Sentry</strong> —
              for error monitoring. Captures technical error data and session replays on errors only
              to help us diagnose bugs. No personal data is intentionally collected.
            </li>
          </ul>
          <p>
            Each of these services has their own privacy policies and data processing agreements.
            We select services that align with our commitment to user privacy.
          </p>

          <SectionHeading id="cookies" title="6. Cookies &amp; Local Storage" />
          <p>We use the following categories of cookies and browser storage:</p>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Strictly necessary</strong> —
              Authentication session cookies set by Supabase to keep you logged in (admin users only).
              These cannot be disabled as they are required for the site to function.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Analytics (optional)</strong> —
              PostHog cookies and local storage entries that track page views and session behavior.
              These are only set after you accept analytics cookies via our consent banner.
              Vercel Analytics does not use cookies.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Preference</strong> —
              A <code>cookie_consent</code> flag stored in local storage to remember your consent
              decision, and a theme preference value for dark/light mode. Neither contains
              personal information.
            </li>
          </ul>
          <p>
            You can withdraw analytics consent at any time by clearing local storage for this site
            in your browser settings, or by using your browser&apos;s built-in cookie management tools.
          </p>

          <SectionHeading id="gdpr" title="7. Your Rights (GDPR, CCPA, and Similar Laws)" />
          <p>
            Depending on where you live, you may have specific rights over your personal data.
            We honor these rights regardless of your location.
          </p>

          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            All users
          </h3>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right of access</strong> —
              request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to rectification</strong> —
              request correction of inaccurate data.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to erasure</strong> —
              request deletion of your personal data.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to data portability</strong> —
              request your data in a structured, machine-readable format.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to withdraw consent</strong> —
              unsubscribe from our newsletter at any time, or withdraw analytics consent by clearing
              your local storage.
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
            California residents (CCPA / CPRA)
          </h3>
          <p>
            Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act
            (CPRA), California residents have additional rights:
          </p>
          <ul>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to know</strong> —
              request disclosure of the categories and specific pieces of personal information we
              have collected about you in the past 12 months.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to delete</strong> —
              request deletion of personal information we have collected, subject to certain exceptions.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to correct</strong> —
              request correction of inaccurate personal information.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to opt out of sale or sharing</strong> —
              we do <strong>not</strong> sell or share your personal information with third parties for
              cross-context behavioral advertising. No opt-out is required, but you may contact us to
              confirm this in writing.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to limit use of sensitive personal information</strong> —
              we do not collect sensitive personal information as defined by CPRA.
            </li>
            <li>
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Right to non-discrimination</strong> —
              we will not discriminate against you for exercising any of your privacy rights.
            </li>
          </ul>
          <p>
            To submit a verifiable consumer request, contact us
            at <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a>.
            We will respond within 45 days (extendable by an additional 45 days when necessary).
            You may designate an authorized agent to make requests on your behalf.
          </p>
          <p>
            To exercise any other privacy right, contact us
            at <a href="mailto:support@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">support@ayahguide.com</a>.
            We will respond within 30 days.
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
