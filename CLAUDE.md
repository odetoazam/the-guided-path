# AyahGuide - Claude Code Guidelines

## Project Overview
AyahGuide is a Quranic reflection (tadabbur) platform built with Next.js 14 App Router, Supabase, and Resend.

## Security Requirements

### Authentication & Authorization
- All admin API routes MUST verify auth via `verifyAuth(request)` from `@/lib/auth` (Bearer token + admin role check)
- Public GET endpoints (posts, single post) MUST filter to only return `status: 'published'` data unless the caller is an authenticated admin
- Never expose draft, scheduled, or archived content to unauthenticated users
- Settings endpoints require admin auth for both read and write

### Input Validation
- All user input MUST be validated with Zod schemas from `@/lib/validators`
- File uploads MUST validate: file extension whitelist, MIME type, and file size (max 5MB)
- Use `crypto.randomBytes()` for generating filenames, never `Math.random()`
- Validate UUID format on ID parameters before querying the database

### Error Handling
- NEVER return `error.message` from database/service errors to clients — these can leak table names, column names, and query details
- Always log the real error server-side with `console.error()`, then return a generic message to the client
- Example: `console.error('Post update error:', error)` then `return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })`

### Rate Limiting
- Public endpoints (subscribe, confirm) MUST use rate limiting via `@/lib/rate-limit`
- Subscribe endpoint: 5 requests per IP per 10 minutes
- Use `getClientIp(request)` to extract the real client IP from proxy headers

### Email Security
- All HTML content inserted into emails MUST be sanitized with `sanitize-html` before sending
- Use the shared `ALLOWED_HTML` config that restricts to safe tags and attributes
- Never inject raw `content_html` from the database directly into email templates

### Security Headers
- Security headers are configured in `next.config.mjs` — do not remove them
- Headers include: X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy

### Secrets & Environment
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `CRON_SECRET` are server-only secrets
- Only `NEXT_PUBLIC_*` variables are safe for client-side code
- Cron secret validation uses constant-time comparison (`timingSafeEqual`)

## Code Patterns

### API Route Template
```typescript
import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const user = await verifyAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminClient = createAdminClient()
  // ... use adminClient for all DB operations
}
```

### Client Auth Headers
```typescript
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
  }
}
```

## Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL + Auth)
- **Email**: Resend (with Contacts API for subscriber management)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Branch**: `claude/cranky-pare` worktree, merged to `main` for deploy
