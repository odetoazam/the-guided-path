# The Guided Path - Project Structure

## Directory Structure Created

```
src/
├── app/
│   ├── admin/
│   │   ├── posts/
│   │   │   ├── [id]/
│   │   │   └── new/
│   │   ├── subscribers/
│   │   ├── analytics/
│   │   └── settings/
│   ├── auth/
│   │   ├── login/
│   │   └── callback/
│   ├── api/
│   │   ├── posts/[id]/publish/
│   │   ├── subscribers/confirm/[token]/
│   │   ├── email/
│   │   │   ├── send/
│   │   │   └── webhook/
│   │   ├── upload/
│   │   └── cron/publish/
│   └── (public)/
│       ├── tadabbur/[slug]/
│       └── subscribe/
├── components/
│   ├── editor/
│   ├── admin/
│   ├── blog/
│   └── ui/
├── hooks/
│   └── useDebounce.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── email/
│   │   ├── templates/
│   │   └── resend.ts
│   ├── content/
│   ├── constants.ts
│   ├── utils.ts
│   └── validators.ts
├── styles/
├── types/
│   └── index.ts
└── layout.tsx

public/
└── fonts/
```

## Files Created

### Core Configuration Files
- `.env.example` - Template for environment variables
- `.env.local` - Local environment configuration with placeholders

### Supabase Integration
- `src/lib/supabase/client.ts` - Browser-side Supabase client
- `src/lib/supabase/server.ts` - Server-side Supabase client with cookie handling
- `src/lib/supabase/admin.ts` - Admin client using service role key

### Utilities & Helpers
- `src/lib/utils.ts` - Utility functions (cn, formatDate, generateSlug, etc.)
- `src/lib/constants.ts` - App-wide constants (site name, post status enums, colors)
- `src/lib/validators.ts` - Zod schemas for validation (posts, subscribers, auth)

### Type Definitions
- `src/types/index.ts` - TypeScript interfaces for all data models:
  - Post
  - QuranRef
  - Subscriber
  - EmailLog
  - Setting
  - Analytics
  - Profile
  - DashboardStats

### Email Service
- `src/lib/email/resend.ts` - Resend email service configuration
- `src/lib/email/templates/` - Email template directory (ready for templates)

### React Hooks
- `src/hooks/useDebounce.ts` - Debounce hook for form inputs and search

## Environment Variables

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Secret service role key

### Email
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM` - Email sender address
- `EMAIL_REPLY_TO` - Reply-to address

### Application
- `NEXT_PUBLIC_APP_URL` - Public app URL
- `CRON_SECRET` - Secret for cron jobs

## Key Features

1. **Database**: Supabase with separate client instances for browser and server
2. **Email**: Resend integration for transactional emails
3. **Type Safety**: Full TypeScript with Zod validation
4. **Utilities**: RTL detection, reading time calculation, slug generation
5. **Hooks**: Debounce hook for optimized form handling
6. **Constants**: Centralized configuration (status enums, colors, etc.)

## Next Steps

1. Run `npm install` to install dependencies
2. Update `.env.local` with real values
3. Set up Supabase database schema
4. Create page and component files
5. Implement API routes
6. Build email templates
