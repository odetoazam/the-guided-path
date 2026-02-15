import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_FROM = process.env.EMAIL_FROM || 'The Guided Path <noreply@theguidedpath.com>'
export const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'support@theguidedpath.com'
