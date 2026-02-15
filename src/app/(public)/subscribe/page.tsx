import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Subscribe to The Guided Path for weekly Quranic reflections delivered to your inbox.',
}

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        Subscribe to <span className="text-gold-gradient">The Guided Path</span>
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Receive weekly Quranic tadabbur — contemplative reflections that go beyond translation — delivered straight to your inbox.
      </p>
      <div className="mt-8">
        <NewsletterSignup />
      </div>
      <div className="mt-12 text-sm text-zinc-400 space-y-2">
        <p>Free forever. No spam. Unsubscribe anytime.</p>
        <p>Join a growing community of seekers.</p>
      </div>
    </div>
  )
}
