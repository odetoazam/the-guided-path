# AyahGuide Site Optimization Digest

## Purpose
This document describes the weekly analysis workflow. The scheduled task in Claude Code
pulls data from all analytics sources, analyzes patterns, and presents recommendations
to the user — it does NOT make any changes autonomously.

## Data Sources
1. **Vercel Analytics** — via Vercel MCP tools (get_project, get_runtime_logs, list_deployments)
2. **PostHog** — via PostHog API (requires POSTHOG_PERSONAL_API_KEY in .env.local)
3. **Sentry** — via Sentry API (requires SENTRY_AUTH_TOKEN in .env.local)
4. **Supabase** — subscriber/email metrics via execute_sql
5. **Cloudflare** — network-layer traffic via GraphQL API (requires CLOUDFLARE_API_TOKEN + Zone ID `75519b73044774d7df280ec6c76128b6`)
   - Query: `httpRequests1dGroups` for last 7 days
   - Fields: requests, pageViews, threats, bytes, uniques, countryMap, browserMap, responseStatusMap

## Custom Events Being Tracked
- `subscribe_attempt` / `subscribe_success` / `subscribe_error` — with source attribution
- `share_click` — platform, content type, slug
- `scroll_depth` — 25/50/75/100% milestones per page
- `hub_tab_switch` — which tabs get used
- `glossary_category_filter` — which categories interest users
- `nav_click` — navigation patterns
- `subscribe_cta_click` — CTA engagement
- `surah_card_click` — surah map engagement
- `visual_page_view` — visual architecture page visits
- `go_deeper_click` — cross-linking engagement
- `entity_tag_click` — entity navigation
- `theme_toggle` — dark/light preference
- `branching_nav` — prev/next navigation

## Output Format
The digest presents:
1. **Traffic Overview** — pageviews, unique visitors, top pages, bounce rates
2. **Cloudflare Network Layer** — total requests vs real page views (bot ratio), threats blocked, top countries, 308/403/404 status breakdown, cache hit rate
3. **Conversion Funnel** — subscribe attempts vs success by source
4. **Content Engagement** — scroll depth, share clicks, time on page
5. **Performance** — CWV, slowest pages, error rates
6. **Recommendations** — ranked by expected impact, with specific code changes proposed

## API Keys Needed
Add these to `.env.local`:
- `POSTHOG_PERSONAL_API_KEY` — from PostHog Settings > Personal API Keys
- `SENTRY_AUTH_TOKEN` — from Sentry Settings > Auth Tokens
- `CLOUDFLARE_API_TOKEN` — read-only token from Cloudflare Dashboard > My Profile > API Tokens
