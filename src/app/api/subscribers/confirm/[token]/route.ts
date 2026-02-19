import { createAdminClient } from '@/lib/supabase/admin'
import { getResend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

interface Params {
  params: Promise<{ token: string }>
}

export async function GET(request: Request, { params }: Params) {
  const { token } = await params
  const adminClient = createAdminClient()

  const { data: subscriber, error } = await adminClient
    .from('subscribers')
    .update({
      status: 'active',
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
    })
    .eq('confirmation_token', token)
    .eq('status', 'pending')
    .select()
    .single()

  if (error || !subscriber) {
    return NextResponse.redirect(`${SITE_URL}?subscription=invalid`)
  }

  // Send welcome email
  try {
    const unsubscribeUrl = `${SITE_URL}/api/subscribers/unsubscribe?token=${subscriber.unsubscribe_token}`
    const name = subscriber.name

    await getResend().emails.send({
      from: EMAIL_FROM,
      to: subscriber.email,
      subject: `Welcome to ${SITE_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#D4AF37;font-size:28px;margin:0;letter-spacing:1px;">${SITE_NAME}</h1>
              <p style="color:#71717a;font-size:13px;margin:8px 0 0;">Deep Quranic Reflections</p>
            </div>
            <div style="background-color:#18181b;border-radius:12px;padding:40px 32px;border:1px solid #27272a;">
              <h2 style="color:#ffffff;font-size:22px;margin:0 0 20px 0;text-align:center;">
                ${name ? `Assalamu Alaikum ${name},` : 'Assalamu Alaikum,'}
              </h2>
              <p style="color:#a1a1aa;font-size:16px;line-height:1.7;margin:0 0 16px;">
                JazakAllahu Khairan for subscribing to AyahGuide. Your subscription is now confirmed.
              </p>
              <p style="color:#a1a1aa;font-size:16px;line-height:1.7;margin:0 0 24px;">
                You'll receive thoughtful Quranic reflections (tadabbur) straight to your inbox — exploring the deeper meanings, lessons, and beauty of the Quran's verses.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${SITE_URL}/tadabbur" style="display:inline-block;background-color:#D4AF37;color:#000;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">
                  Read Latest Reflections
                </a>
              </div>
              <div style="border-top:1px solid #27272a;margin-top:32px;padding-top:20px;">
                <p style="color:#52525b;font-size:13px;line-height:1.6;margin:0;text-align:center;">
                  May Allah bless your journey with the Quran.
                </p>
              </div>
            </div>
            <div style="text-align:center;margin-top:24px;">
              <a href="${unsubscribeUrl}" style="color:#52525b;font-size:12px;text-decoration:underline;">Unsubscribe</a>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  } catch (emailError) {
    console.error('Welcome email error:', emailError)
  }

  return NextResponse.redirect(`${SITE_URL}?subscription=confirmed`)
}
