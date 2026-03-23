import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/terms`

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using AyahGuide, a Quranic reflection platform.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'Terms and conditions for using AyahGuide, a Quranic reflection platform.',
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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-500 dark:text-zinc-400">Home</Link>
          <span>/</span>
          <span className="text-zinc-500 dark:text-zinc-400">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Terms &amp; Conditions
          </p>
          <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Terms of Service
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Please read these terms carefully before using AyahGuide. By accessing or using the site,
            you agree to be bound by these terms.
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-600">
            Last updated: March 22, 2026
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-700 dark:text-zinc-300">Disclaimer:</strong> These
            terms of service are provided for informational purposes and do not constitute legal advice.
            If you have specific legal concerns, please consult a qualified legal professional.
          </p>
        </div>

        {/* Content */}
        <div className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2 [&_p]:mt-3">

          <SectionHeading id="acceptance" title="1. Acceptance of Terms" />
          <p>
            By accessing and using AyahGuide (<Link href="https://www.ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">ayahguide.com</Link>),
            you accept and agree to be bound by these Terms of Service. If you do not agree to these
            terms, please do not use the site.
          </p>

          <SectionHeading id="nature-of-content" title="2. Nature of Content" />
          <p>
            AyahGuide provides Islamic educational content, including Quranic reflections (tadabbur),
            surah overviews, glossary entries, and related articles. This content is intended for
            educational and informational purposes only.
          </p>
          <p>
            <strong className="font-medium text-zinc-700 dark:text-zinc-300">Important:</strong> The
            content on AyahGuide does not constitute religious rulings (fatwa). The reflections,
            analyses, and commentaries presented are educational explorations of Quranic themes and
            should not be taken as definitive religious guidance.
          </p>
          <p>
            For specific religious rulings or personal matters requiring scholarly guidance, we
            strongly encourage you to consult qualified Islamic scholars (ulama) who can provide
            authoritative advice based on your individual circumstances.
          </p>

          <SectionHeading id="use-of-site" title="3. Use of the Site" />
          <p>AyahGuide is free to use. You may:</p>
          <ul>
            <li>Browse and read all published content without creating an account.</li>
            <li>Subscribe to our newsletter to receive Quranic reflections via email.</li>
            <li>Share links to our content with proper attribution.</li>
          </ul>

          <SectionHeading id="user-conduct" title="4. User Conduct" />
          <p>When using AyahGuide, you agree not to:</p>
          <ul>
            <li>Use the site for any unlawful purpose or in violation of any applicable laws.</li>
            <li>Attempt to gain unauthorized access to any part of the site, its servers, or any connected systems.</li>
            <li>Interfere with or disrupt the site or its infrastructure.</li>
            <li>Scrape, crawl, or use automated tools to extract content in bulk without permission.</li>
            <li>Misrepresent your identity when subscribing to the newsletter.</li>
            <li>Use the site to distribute spam, malware, or harmful content.</li>
          </ul>

          <SectionHeading id="intellectual-property" title="5. Intellectual Property" />
          <p>
            All original content on AyahGuide -- including written reflections, analyses, visual
            designs, and site structure -- is the intellectual property of AyahGuide and is protected
            by applicable copyright laws.
          </p>
          <p>
            Quranic text and translations referenced on the site are in the public domain or used
            under applicable scholarly and educational use principles.
          </p>
          <p>You may:</p>
          <ul>
            <li>Share links to our content freely.</li>
            <li>Quote brief excerpts with proper attribution and a link back to the original page.</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Reproduce, distribute, or republish substantial portions of our original content without written permission.</li>
            <li>Use our content for commercial purposes without authorization.</li>
            <li>Remove or alter any copyright notices or attributions.</li>
          </ul>

          <SectionHeading id="newsletter" title="6. Newsletter Terms" />
          <p>
            By subscribing to the AyahGuide newsletter, you agree to the following:
          </p>
          <ul>
            <li>You provide a valid email address that belongs to you.</li>
            <li>You consent to receiving periodic emails containing Quranic reflections, site updates, and related content.</li>
            <li>You may unsubscribe at any time using the unsubscribe link included in every email.</li>
            <li>
              Your email address is handled in accordance with our{' '}
              <Link href="/privacy" className="text-[rgba(212,175,55,0.85)] hover:underline">Privacy Policy</Link>.
            </li>
          </ul>
          <p>
            We reserve the right to remove subscribers who provide false information, engage in
            abusive behavior, or whose email addresses consistently bounce.
          </p>

          <SectionHeading id="disclaimer-warranties" title="7. Disclaimer of Warranties" />
          <p>
            AyahGuide is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
            warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul>
            <li>The site will be available at all times without interruption.</li>
            <li>The content will be free from errors or omissions.</li>
            <li>The site will be free from viruses or other harmful components.</li>
          </ul>
          <p>
            While we strive for accuracy in our Quranic reflections and educational content, we
            acknowledge that scholarly interpretation is a nuanced discipline. We encourage readers
            to cross-reference our content with established tafsir works and to seek scholarly
            guidance when needed.
          </p>

          <SectionHeading id="limitation-liability" title="8. Limitation of Liability" />
          <p>
            To the fullest extent permitted by applicable law, AyahGuide and its contributors shall
            not be liable for any indirect, incidental, special, consequential, or punitive damages
            arising out of or related to your use of the site, including but not limited to:
          </p>
          <ul>
            <li>Reliance on any content or information provided on the site.</li>
            <li>Any errors or omissions in the content.</li>
            <li>Any interruption or cessation of the site.</li>
            <li>Any decisions or actions taken based on the content of the site.</li>
          </ul>

          <SectionHeading id="third-party-links" title="9. Third-Party Links" />
          <p>
            AyahGuide may contain links to external websites or resources. We are not responsible for
            the content, accuracy, or practices of any third-party sites. The inclusion of a link does
            not imply endorsement. You access third-party sites at your own risk.
          </p>

          <SectionHeading id="modifications" title="10. Modifications to Terms" />
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be
            effective immediately upon posting to this page, and the &quot;Last updated&quot; date will
            be revised accordingly. Your continued use of the site after any changes constitutes
            acceptance of the updated terms.
          </p>
          <p>
            For significant changes, we will make reasonable efforts to notify subscribers via email.
          </p>

          <SectionHeading id="termination" title="11. Termination" />
          <p>
            We reserve the right to restrict or terminate access to the site for any user who violates
            these terms or engages in behavior that is harmful to the site, its users, or its mission.
          </p>

          <SectionHeading id="governing-law" title="12. Governing Law" />
          <p>
            These terms shall be governed by and construed in accordance with applicable laws. Any
            disputes arising from these terms or your use of the site will be resolved through good-faith
            dialogue wherever possible.
          </p>

          <SectionHeading id="contact" title="13. Contact Us" />
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>
              Email: <a href="mailto:contact@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:underline">contact@ayahguide.com</a>
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
