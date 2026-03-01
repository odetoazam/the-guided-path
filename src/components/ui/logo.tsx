import Link from 'next/link'

function StarAccent({ size = 14 }: { size?: number }) {
  const cx = size / 2, cy = size / 2
  const outerR = size * 0.42, innerR = outerR * 0.44
  const points = 8
  const pts: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / points
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`)
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      <polygon
        points={pts.join(' ')}
        fill="none"
        stroke="url(#logo-star-grad)"
        strokeWidth="0.8"
        transform={`rotate(22.5,${cx},${cy})`}
      />
      <circle cx={cx} cy={cy} r={outerR * 0.35} fill="url(#logo-star-grad)" fillOpacity="0.5" />
      <defs>
        <linearGradient id="logo-star-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8960C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Logo({ size = 'default' }: { size?: 'default' | 'lg' }) {
  const textClass = size === 'lg'
    ? 'text-2xl'
    : 'text-xl'
  const starSize = size === 'lg' ? 18 : 14

  return (
    <Link href="/" className={`group inline-flex items-center gap-1.5 ${textClass}`}>
      <StarAccent size={starSize} />
      <span className="font-amiri font-bold tracking-tight text-gold-gradient">
        AyahGuide
      </span>
    </Link>
  )
}
