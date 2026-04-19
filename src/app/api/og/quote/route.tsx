import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

/**
 * Dynamic quote-card OG image.
 *
 * Usage:
 *   /api/og/quote?text=Your+line&cite=Al-Baqarah+2:255
 *
 * Parameters:
 *   text    — required, the quotation or reflection (max ~240 chars)
 *   cite    — optional, the citation string (surah + ayah, or article title)
 *   arabic  — optional, Arabic text to display above the English
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = (searchParams.get('text') ?? 'A tadabbur from AyahGuide').slice(0, 240)
  const cite = (searchParams.get('cite') ?? '').slice(0, 80)
  const arabic = (searchParams.get('arabic') ?? '').slice(0, 160)

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

        {/* Arabic (optional) */}
        {arabic && (
          <div
            style={{
              fontSize: 44,
              color: 'rgba(212,175,55,0.85)',
              textAlign: 'center',
              marginBottom: 36,
              lineHeight: 1.6,
              display: 'flex',
              maxWidth: 1000,
            }}
          >
            {arabic}
          </div>
        )}

        {/* Quote mark */}
        <div
          style={{
            fontSize: 80,
            color: 'rgba(212,175,55,0.35)',
            lineHeight: 0.4,
            marginBottom: 10,
            display: 'flex',
          }}
        >
          &ldquo;
        </div>

        {/* Main text */}
        <div
          style={{
            fontSize: text.length > 160 ? 32 : text.length > 80 ? 40 : 48,
            fontWeight: 500,
            color: '#f0e6d2',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 980,
            display: 'flex',
          }}
        >
          {text}
        </div>

        {/* Citation */}
        {cite && (
          <div
            style={{
              marginTop: 40,
              fontSize: 22,
              color: 'rgba(212,175,55,0.8)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            &mdash; {cite} &mdash;
          </div>
        )}

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

        {/* Brand */}
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
    { width: 1200, height: 630 },
  )
}
