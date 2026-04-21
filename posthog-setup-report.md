<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into AyahGuide. The project already had a well-configured PostHog client-side setup (provider, reverse proxy, and an extensive `analytics.ts` event library). This integration extended it with:

- **User identification** added to the sign-in flow — `posthog.identify()` is now called on successful email sign-in and sign-up, linking all subsequent events to a known user
- **Auth event tracking** on the sign-in page for `user_signed_in`, `user_signed_up`, `google_sign_in_clicked`, and `auth_error`
- **Server-side PostHog** (`posthog-node`) installed and a `src/lib/posthog-server.ts` helper created, enabling server-side event capture in API routes
- **Server-side conversion events** added to three critical API routes: subscriber creation, email confirmation, and unsubscribe
- **`defaults: '2026-01-30'`** added to the client-side PostHog init for recommended baseline behaviour
- **`skipTrailingSlashRedirect: true`** added to `next.config.mjs` to support PostHog trailing-slash API requests
- **Environment variables** `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` set in `.env.local` with correct values

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signed in via email/password (with identify) | `src/app/auth/sign-in/page.tsx` |
| `user_signed_up` | User successfully created a new account via email (with identify) | `src/app/auth/sign-in/page.tsx` |
| `google_sign_in_clicked` | User clicked the Continue with Google button | `src/app/auth/sign-in/page.tsx` |
| `auth_error` | Authentication attempt failed (sign-in or sign-up error) | `src/app/auth/sign-in/page.tsx` |
| `subscriber_created` | New subscriber record inserted — server-side, before email confirmation | `src/app/api/subscribers/route.ts` |
| `subscription_confirmed` | Subscriber confirmed their email — primary newsletter conversion event | `src/app/api/subscribers/confirm/[token]/route.ts` |
| `user_unsubscribed` | Subscriber clicked unsubscribe link — primary newsletter churn event | `src/app/api/subscribers/unsubscribe/route.ts` |

## Next steps

We've built a dashboard and five insights to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/384273/dashboard/1474006
- **Newsletter subscription funnel** (subscribe attempt → created → confirmed): https://us.posthog.com/project/384273/insights/IqjBiDtn
- **New subscribers over time** (weekly confirmed vs unsubscribed): https://us.posthog.com/project/384273/insights/RXvy7hMM
- **Auth events: sign-ins and sign-ups** (daily trend): https://us.posthog.com/project/384273/insights/wVu7f0Bj
- **Content engagement by type** (surah clicks, shares, return visits, scroll depth): https://us.posthog.com/project/384273/insights/VkQkpZ8m
- **Subscriber acquisition by source** (breakdown by source property): https://us.posthog.com/project/384273/insights/6wxNjCR6

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
