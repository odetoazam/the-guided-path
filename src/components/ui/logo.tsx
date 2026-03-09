import Link from 'next/link'
import Image from 'next/image'

export function Logo({ size = 'default' }: { size?: 'default' | 'lg' }) {
  const dim = size === 'lg' ? 48 : 38

  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="AyahGuide"
        width={dim}
        height={dim}
        className="shrink-0 dark:brightness-[1.8]"
        priority
      />
      <span
        className={`font-amiri font-semibold tracking-tight text-zinc-700 dark:text-zinc-300 ${
          size === 'lg' ? 'text-xl' : 'text-base'
        }`}
      >
        AyahGuide
      </span>
    </Link>
  )
}
