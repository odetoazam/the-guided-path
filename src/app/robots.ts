import { MetadataRoute } from 'next'

const BLOCKED_BOTS = [
  'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot',
  'cohere-ai', 'Bytespider', 'Applebot-Extended', 'Google-Extended',
  'PerplexityBot', 'YouBot', 'AhrefsBot', 'SemrushBot', 'MJ12bot',
  'DotBot', 'PetalBot', 'DataForSeoBot', 'BLEXBot', 'serpstatbot',
  'Omgilibot', 'FacebookBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/'],
      },
      ...BLOCKED_BOTS.map(bot => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: 'https://www.ayahguide.com/sitemap.xml',
  }
}
