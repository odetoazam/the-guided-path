import { MetadataRoute } from 'next'

// Training crawlers — blocked (content may not be used for AI model training)
const BLOCKED_BOTS = [
  'GPTBot', 'CCBot', 'anthropic-ai', 'ClaudeBot',
  'cohere-ai', 'Bytespider', 'Applebot-Extended', 'Google-Extended',
  'meta-externalagent', 'FacebookBot', 'Omgilibot',
  // SEO scrapers
  'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot',
  'DataForSeoBot', 'BLEXBot', 'serpstatbot',
]

// Retrieval-only crawlers — explicitly allowed for AI search & citation
// (these do not train models; blocking them contradicts Content-Signal: search=yes)
const ALLOWED_AI_SEARCH_BOTS = [
  'PerplexityBot', 'ChatGPT-User', 'Claude-Web', 'YouBot', 'OAI-SearchBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/'],
      },
      ...ALLOWED_AI_SEARCH_BOTS.map(bot => ({
        userAgent: bot,
        allow: '/',
      })),
      ...BLOCKED_BOTS.map(bot => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: 'https://www.ayahguide.com/sitemap.xml',
  }
}
