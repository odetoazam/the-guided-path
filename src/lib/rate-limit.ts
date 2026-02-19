/**
 * Simple in-memory rate limiter for serverless functions.
 * Tracks requests per IP with a sliding window.
 *
 * Note: In serverless, each instance has its own memory,
 * so this provides per-instance rate limiting. For stricter
 * limits, use Redis-backed rate limiting (e.g., @upstash/ratelimit).
 */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitOptions {
  /** Max requests allowed in the window */
  maxRequests: number
  /** Window duration in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now()
  const windowMs = options.windowSeconds * 1000

  const existing = rateLimitMap.get(key)

  if (!existing || now > existing.resetAt) {
    // New window
    const entry = { count: 1, resetAt: now + windowMs }
    rateLimitMap.set(key, entry)
    return { allowed: true, remaining: options.maxRequests - 1, resetAt: entry.resetAt }
  }

  if (existing.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count++
  return {
    allowed: true,
    remaining: options.maxRequests - existing.count,
    resetAt: existing.resetAt,
  }
}

/**
 * Extract client IP from request headers.
 * Works with Vercel, Cloudflare, and standard proxies.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}
