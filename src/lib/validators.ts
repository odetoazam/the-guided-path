import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format').optional(),
  type: z.enum(['article', 'surah']).default('article'),
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
  surah_number: z.number().int().min(1).max(114).nullable().optional(),
})

export const entityTagSchema = z.object({
  entity_id: z.string().uuid(),
  post_id: z.string().uuid().optional().nullable(),
  ayah_record_id: z.string().uuid().optional().nullable(),
  is_primary: z.boolean().default(false),
}).refine(
  (data) => {
    const set = [data.post_id, data.ayah_record_id].filter(Boolean).length
    return set === 1
  },
  { message: 'Exactly one of post_id or ayah_record_id must be provided' }
)

export const ayahRecordSchema = z.object({
  surah_number: z.number().int().min(1).max(114),
  ayah_start: z.number().int().min(1),
  ayah_end: z.number().int().min(1),
  arabic_text: z.string().min(1),
  translation: z.string().min(1),
  layer_a: z.record(z.string(), z.any()).default({}),
  layer_b: z.record(z.string(), z.any()).default({}),
  title: z.string().optional().nullable(),
  word_count: z.number().int().optional().nullable(),
  estimated_duration: z.string().optional().nullable(),
  passage_context: z.string().optional().nullable(),
  status: z.enum(['draft', 'published']).default('draft'),
}).refine(
  (data) => data.ayah_end >= data.ayah_start,
  { message: 'ayah_end must be >= ayah_start' }
).refine(
  (data) => data.ayah_end - data.ayah_start < 10,
  { message: 'Passage cannot span more than 9 ayahs' }
)

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
export type EntityTagInput = z.infer<typeof entityTagSchema>
export type AyahRecordInput = z.infer<typeof ayahRecordSchema>
