# Quick Reference Guide

## File Locations & Purposes

### Supabase Clients
- **`src/lib/supabase/client.ts`** - Use in Client Components for browser operations
- **`src/lib/supabase/server.ts`** - Use in Server Components & Route Handlers
- **`src/lib/supabase/admin.ts`** - Use only in API routes (has admin permissions)

### Utilities
- **`src/lib/utils.ts`** - Helper functions (styling, dates, content processing)
  - `cn()` - Merge Tailwind classes
  - `formatDate()` - Format dates
  - `generateSlug()` - Create URL-safe slugs
  - `calculateReadingTime()` - Estimate reading duration
  - `isRTL()` - Detect Arabic/RTL text
  - `truncate()` - Trim long strings

- **`src/lib/constants.ts`** - App configuration
  - Status enums (POST_STATUS, SUBSCRIBER_STATUS, PUBLISHING_MODES)
  - Site metadata (SITE_NAME, SITE_DESCRIPTION)
  - Color scheme (COLORS - gold theme)

- **`src/lib/validators.ts`** - Zod validation schemas
  - `postSchema` - Validate post data
  - `subscriberSchema` - Validate subscriber email
  - `loginSchema` - Validate login credentials

### Types
- **`src/types/index.ts`** - TypeScript interfaces
  - Post, QuranRef, Subscriber, EmailLog, Setting, Analytics, Profile, DashboardStats

### Email
- **`src/lib/email/resend.ts`** - Email service setup
  - Provides: `resend`, `EMAIL_FROM`, `EMAIL_REPLY_TO`

### Hooks
- **`src/hooks/useDebounce.ts`** - Debounce hook for form inputs
  - Usage: `const debouncedValue = useDebounce(value, 300)`

---

## Usage Examples

### Get Supabase Client in Server Component
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select()
  return <div>{/* render data */}</div>
}
```

### Use Utilities
```typescript
import { cn, formatDate, generateSlug } from '@/lib/utils'

// Merge Tailwind classes
const className = cn('px-4', isActive && 'bg-blue-500')

// Format date for display
const displayDate = formatDate(new Date())

// Create slug from title
const slug = generateSlug('My Amazing Post Title')
```

### Validate Data with Zod
```typescript
import { postSchema } from '@/lib/validators'

const result = postSchema.safeParse(formData)
if (!result.success) {
  console.error(result.error.flatten())
}
```

### Use Debounce Hook
```typescript
'use client'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchComponent() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  
  // Use debouncedSearch for API calls
}
```

### Send Email via Resend
```typescript
import { resend, EMAIL_FROM } from '@/lib/email/resend'

await resend.emails.send({
  from: EMAIL_FROM,
  to: subscriber.email,
  subject: 'New Tadabbur Post',
  html: emailHtml,
})
```

---

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Get Supabase credentials:
   - Go to Supabase project settings
   - Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`
3. Get Resend API key from Resend dashboard
4. Set `NEXT_PUBLIC_APP_URL` to your app domain

---

## Common Tasks

### Create a new utility function
Add to `src/lib/utils.ts`

### Add a new type
Add to `src/types/index.ts`

### Add a new validation schema
Add to `src/lib/validators.ts`

### Create a new hook
Create file `src/hooks/useFeatured.ts`

### Store app constants
Add to `src/lib/constants.ts`

---

## Directory Structure Reminders

- `src/app/` - Next.js 13+ App Router pages and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Shared utilities and services
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `public/` - Static assets (images, fonts, etc.)

