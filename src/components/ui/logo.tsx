import Link from 'next/link'
import Image from 'next/image'

export function Logo({ size = 'default' }: { size?: 'default' | 'lg' }) {
  const dim = size === 'lg' ? 40 : 32

  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/logo.png"
        alt="AyahGuide"
        width={dim}
        height={dim}
        className="shrink-0"
        priority
      />
    </Link>
  )
}
