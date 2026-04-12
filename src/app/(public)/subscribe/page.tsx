import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Journey — AyahGuide',
  description: 'When something illuminates the path, it finds you. Join those seeking guidance through contemplation of the Quran.',
}

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        Join the <span className="text-gold-gradient">journey</span>
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        When something illuminates the path, it finds you. No noise — just depth, when it&apos;s ready.
      </p>
      <div className="mt-8">
        <NewsletterSignup source="subscribe_page" />
      </div>
      <div className="mt-12 text-sm text-zinc-400 space-y-2">
        <p>Free. No spam. Unsubscribe anytime.</p>
        <p>Join a growing community of seekers.</p>
      </div>
    </div>
  )
}
