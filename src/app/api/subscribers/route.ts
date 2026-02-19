import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { getResend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { subscriberSchema } from '@/lib/validators'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import crypto from 'crypto'

export async function GET(request: Request) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const adminClient = createAdminClient()
  let query = adminClient
    .from('subscribers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ subscribers: data, total: count })
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = subscriberSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
  }

  const { email, name, source } = parsed.data
  const adminClient = createAdminClient()

  // Check if already subscribed
  const { data: existing } = await adminClient
    .from('subscribers')
    .select('id, status')
    .eq('email', email)
    .single()

  if (existing) {
    if (existing.status === 'active') {
      return NextResponse.json({ error: 'You are already subscribed!' }, { status: 400 })
    }
    if (existing.status === 'pending') {
      return NextResponse.json({ message: 'Please check your email to confirm your subscription.' })
    }
  }

  const confirmationToken = crypto.randomUUID()
  const unsubscribeToken = crypto.randomUUID()

  if (existing) {
    // Re-subscribe
    await adminClient
      .from('subscribers')
      .update({
        status: 'pending',
        confirmation_token: confirmationToken,
        unsubscribe_token: unsubscribeToken,
        unsubscribed_at: null,
        name: name || existing.id,
      })
      .eq('id', existing.id)
  } else {
    const { error } = await adminClient.from('subscribers').insert({
      email,
      name: name || null,
      source: source || 'website',
      status: 'pending',
      confirmation_token: confirmationToken,
      unsubscribe_token: unsubscribeToken,
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email is already registered' }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Send confirmation email
  try {
    const confirmUrl = `${SITE_URL}/api/subscribers/confirm/${confirmationToken}`

    await getResend().emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: `Confirm your subscription to ${SITE_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#D4AF37;font-size:24px;margin:0;">${SITE_NAME}</h1>
            </div>
            <div style="background-color:#18181b;border-radius:12px;padding:32px;border:1px solid #27272a;text-align:center;">
              <h2 style="color:#ffffff;font-size:24px;margin:0 0 16px 0;">Confirm Your Subscription</h2>
              <p style="color:#a1a1aa;font-size:16px;line-height:1.6;">
                ${name ? `Assalamu Alaikum ${name},` : 'Assalamu Alaikum,'}<br><br>
                Thank you for subscribing to AyahGuide. Please confirm your email to start receiving weekly Quranic reflections.
              </p>
              <a href="${confirmUrl}" style="display:inline-block;margin-top:24px;background-color:#D4AF37;color:#000;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">
                Confirm Subscription
              </a>
              <p style="color:#52525b;font-size:13px;margin-top:24px;">
                If you didn't subscribe, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  } catch (emailError) {
    console.error('Confirmation email error:', emailError)
  }

  return NextResponse.json({ message: 'Check your email to confirm your subscription!' }, { status: 201 })
}
