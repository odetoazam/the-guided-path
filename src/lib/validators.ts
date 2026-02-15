import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format').optional(),
  excerpt: z.string().max(500).optional(),
  content_json: z.any(),
  content_html: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('draft'),
  scheduled_date: z.string().datetime().optional().nullable(),
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
  tags: z.array(z.string()).max(10).default([]),
  featured: z.boolean().default(false),
  quran_refs: z.any().optional(),
})

export const subscriberSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().max(100).optional(),
  source: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const settingsSchema = z.object({
  key: z.string(),
  value: z.any(),
})

export type PostInput = z.infer<typeof postSchema>
export type SubscriberInput = z.infer<typeof subscriberSchema>
export type LoginInput = z.infer<typeof loginSchema>
