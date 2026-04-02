import { NextRequest, NextResponse } from 'next/server'

const BLOCKED_BOT_PATTERNS = [
  // AI scrapers
  'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot',
  'cohere-ai', 'PerplexityBot', 'YouBot', 'Omgilibot',
  // SEO crawlers
  'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot',
  'DataForSeoBot', 'BLEXBot', 'serpstatbot',
  // Other
  'Bytespider', 'Applebot-Extended', 'Google-Extended', 'FacebookBot',
  // Headless browsers
  'HeadlessChrome', 'PhantomJS', 'Puppeteer',
]

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''

  const isBlocked = BLOCKED_BOT_PATTERNS.some(pattern =>
    ua.toLowerCase().includes(pattern.toLowerCase())
  )

  if (isBlocked) {
    return new NextResponse(null, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - API routes (let them handle their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/).*)',
  ],
}
