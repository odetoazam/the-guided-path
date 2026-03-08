import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { getResend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

const GUIDE_URL = 'https://www.ayahguide.com/guides/tafsir-tadabbur-guide.pdf'

export async function POST(request: Request) {
  const user = await verifyAuth(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()

  const { data: subscribers } = await adminClient
    .from('subscribers')
    .select('email, name, unsubscribe_token')
    .eq('status', 'active')

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: 'No active subscribers' }, { status: 400 })
  }

  const emails = subscribers.map((sub) => {
    const unsubscribeUrl = `${SITE_URL}/api/subscribers/unsubscribe?token=${sub.unsubscribe_token}`
    const greeting = sub.name ? `Assalamu Alaikum ${sub.name},` : 'Assalamu Alaikum,'

    return {
      from: EMAIL_FROM,
      to: sub.email,
      subject: `A gift for your Quranic journey — ${SITE_NAME}`,
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
              <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px 0;">
                ${greeting}
              </h2>
              <p style="color:#a1a1aa;font-size:16px;line-height:1.7;margin:0 0 20px;">
                We've put together something for you — a free guide to help deepen the way you read and reflect on the Quran.
              </p>

              <div style="background-color:#111113;border:1px solid #D4AF37;border-radius:10px;padding:24px;margin:0 0 24px;text-align:center;">
                <p style="color:#D4AF37;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 8px;">Free Guide</p>
                <p style="color:#ffffff;font-size:18px;font-weight:600;margin:0 0 6px;font-family:Georgia,serif;">A Practical Guide to Tafsir &amp; Tadabbur</p>
                <p style="color:#71717a;font-size:14px;margin:0 0 20px;line-height:1.6;">
                  The classical tools of Quranic commentary — and how to turn them into a living practice of reflection.
                </p>
                <a href="${GUIDE_URL}" style="display:inline-block;background-color:#D4AF37;color:#000000;padding:13px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
                  Download the Guide (PDF)
                </a>
              </div>

              <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 20px;">
                If you know someone who would benefit from this — a friend, family member, or anyone seeking a deeper connection with the Quran — please pass it on. The guide is free to share.
              </p>
              <div style="text-align:center;margin:8px 0 0;">
                <a href="${SITE_URL}/posts" style="display:inline-block;background-color:#27272a;color:#ffffff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  Read the Latest Reflections
                </a>
              </div>
              <div style="border-top:1px solid #27272a;margin-top:32px;padding-top:20px;">
                <p style="color:#52525b;font-size:13px;line-height:1.6;margin:0;text-align:center;">
                  May Allah bless your journey with the Quran.
                </p>
              </div>
            </div>
            <div style="text-align:center;margin-top:24px;">
              <p style="color:#52525b;font-size:12px;margin:0 0 8px;">You received this because you subscribed to AyahGuide.</p>
              <a href="${unsubscribeUrl}" style="color:#52525b;font-size:12px;text-decoration:underline;">Unsubscribe</a>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  })

  try {
    // Send in batches of 100 (Resend batch limit)
    for (let i = 0; i < emails.length; i += 100) {
      await getResend().batch.send(emails.slice(i, i + 100))
    }

    return NextResponse.json({
      message: `Guide announcement sent to ${subscribers.length} subscriber${subscribers.length === 1 ? '' : 's'}`,
    })
  } catch (error: any) {
    console.error('Guide announcement error:', error)
    return NextResponse.json({ error: 'Failed to send announcement' }, { status: 500 })
  }
}
