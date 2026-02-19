import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'])
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
])
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
  }

  // Validate file extension
  const fileExt = file.name.split('.').pop()?.toLowerCase()
  if (!fileExt || !ALLOWED_EXTENSIONS.has(fileExt)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: jpg, jpeg, png, webp, gif, svg' },
      { status: 400 },
    )
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only images are allowed.' },
      { status: 400 },
    )
  }

  // Use cryptographically secure random for filename
  const randomId = crypto.randomBytes(12).toString('hex')
  const fileName = `${Date.now()}-${randomId}.${fileExt}`
  const filePath = `posts/${fileName}`

  const adminClient = createAdminClient()
  const { error } = await adminClient.storage
    .from('post-images')
    .upload(filePath, file)

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }

  const { data: { publicUrl } } = adminClient.storage
    .from('post-images')
    .getPublicUrl(filePath)

  return NextResponse.json({ url: publicUrl })
}
