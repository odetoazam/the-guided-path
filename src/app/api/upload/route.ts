import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

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

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `posts/${fileName}`

  const adminClient = createAdminClient()
  const { error } = await adminClient.storage
    .from('post-images')
    .upload(filePath, file)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = adminClient.storage
    .from('post-images')
    .getPublicUrl(filePath)

  return NextResponse.json({ url: publicUrl })
}
