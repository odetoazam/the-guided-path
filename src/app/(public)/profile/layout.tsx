import type { Metadata } from 'next'
import { CANONICAL_URL } from '@/lib/constants'

// The profile page is a client component and can't export metadata itself.
// It is a signed-in reader's own page — not for search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: `${CANONICAL_URL}/profile` },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}
