import { StartHere } from '@/components/ui/start-here'
import { CANONICAL_URL } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Here',
  description: 'New to AyahGuide? Three ways in — a guided path, two long close readings, or how we read and handle contested verses.',
  alternates: {
    canonical: `${CANONICAL_URL}/start`,
  },
}

export default function StartPage() {
  return (
    <section className="px-6 pb-20 pt-24 sm:pt-28">
      <StartHere as="h1" />
    </section>
  )
}
