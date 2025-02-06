'use server'

import { revalidatePath } from 'next/cache'

import { resend } from '@/lib/resend'
import { z } from 'zod'
import ThankYouEmail from '@/emails/thank-you'
import { ContactFormSchema } from '@/lib/schemas'

import { db } from '@/lib/firebase/client'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'

type ContactFormValues = z.infer<typeof ContactFormSchema>

const fromEmail = `Carmen Díaz <${process.env.RESEND_FROM_EMAIL}>`

export async function saveContact(values: ContactFormValues) {
  console.log('Saving contact (saveContact)...', values)

  try {
    const { name, email, message } = ContactFormSchema.parse(values)

    const contactRef = await addDoc(collection(db, 'contacts'), {
      name,
      email,
      message,
      createdAt: new Date(),
    })

    console.log('Contact successfully saved! ')
    if (contactRef) {
      sendEmail(values)
    }

    revalidatePath('/contact')
    return { success: true }
  } catch (error) {
    console.error('Error saving contact:', error)
    return { success: false, error }
  }
}

export async function sendEmail(values: ContactFormValues) {
  console.log('Sending Thank you email ...', values)

  try {
    const { name, email, message } = ContactFormSchema.parse(values)

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
  return { success: true }
}
