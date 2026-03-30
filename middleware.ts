import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

// Known scraper/bot user-agent patterns
const BOT_UA_PATTERNS = [
  /GPTBot/i, /ChatGPT/i, /CCBot/i, /anthropic-ai/i, /Claude-Web/i, /ClaudeBot/i,
  /cohere-ai/i, /Bytespider/i, /Google-Extended/i, /PerplexityBot/i,
  /AhrefsBot/i, /SemrushBot/i, /MJ12bot/i, /DotBot/i, /PetalBot/i,
  /DataForSeoBot/i, /BLEXBot/i, /serpstatbot/i,
]

const CONTENT_PATHS = ['/surahs', '/posts', '/hub', '/glossary', '/ayah']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ua = request.headers.get('user-agent') || ''

  // Block known scraper bots on content pages
  const isContentPath = CONTENT_PATHS.some(p => pathname.startsWith(p))
  if (isContentPath) {
    if (BOT_UA_PATTERNS.some(pattern => pattern.test(ua))) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Rate limit: 60 page requests per minute per IP
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    const result = checkRateLimit(`page:${ip}`, { maxRequests: 60, windowSeconds: 60 })
    if (!result.allowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)) },
      })
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from login
  if (request.nextUrl.pathname.startsWith('/auth/login') && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
