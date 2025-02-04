
'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import ThankYouEmail from '@/emails/thank-you'
import { ContactFormSchema } from '@/lib/schemas'

type ContactFormValues = z.infer<typeof ContactFormSchema>

const resend = new Resend(process.env.RESEND_API_KEY)

const fromEmail = `Carmen Díaz <${process.env.RESEND_FROM_EMAIL}>`

export async function sendContactForm(values: ContactFormValues) {
    try{
        const {name, email, message} = ContactFormSchema.parse(values)

        await resend.emails.send({
            to: email,
            from: fromEmail,
            subject: `Hello ${name}. Thanks for reaching out!`,
            react: ThankYouEmail({ name: name }),
        })
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
  
}

