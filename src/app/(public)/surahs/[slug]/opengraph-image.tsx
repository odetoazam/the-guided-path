import { ImageResponse } from 'next/og'
import { surahBySlug } from '@/lib/surahs'

export const runtime = 'edge'
export const alt = 'AyahGuide — Quranic tadabbur'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default async function OpenGraphImage({ params }: Props) {
  const surah = surahBySlug(params.slug)
  const surahNum = surah?.n ?? 0
  const nameEn = surah?.nameEn ?? 'AyahGuide'
  const nameAr = surah?.nameAr ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #0b1a2e 0%, #06111f 100%)',
          color: '#f0e6d2',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          padding: 80,
        }}
      >
        {/* Gold accent line top */}
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 80,
            right: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
          }}
        />

        {/* Surah number */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: 8,
            color: 'rgba(212,175,55,0.7)',
            textTransform: 'uppercase',
            marginBottom: 24,
            display: 'flex',
          }}
        >
          {surahNum > 0 ? `Surah ${surahNum}` : 'Tadabbur'}
        </div>

        {/* Arabic name */}
        {nameAr && (
          <div
            style={{
              fontSize: 96,
              color: 'rgba(212,175,55,0.95)',
              marginBottom: 16,
              display: 'flex',
            }}
          >
            {nameAr}
          </div>
        )}

        {/* English name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#f0e6d2',
            marginBottom: 32,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          {nameEn}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(240,230,210,0.6)',
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: 800,
            display: 'flex',
          }}
        >
          A living map of Qur&apos;anic meaning
        </div>

        {/* Gold accent line bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            right: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
          }}
        />

        {/* Brand bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 18,
            color: 'rgba(212,175,55,0.7)',
            letterSpacing: 6,
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          AyahGuide
        </div>
      </div>
    ),
    { ...size },
  )
}
