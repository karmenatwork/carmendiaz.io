import { ContactFormData } from '@/types';
import { z, ZodType } from 'zod'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Strong email regex
export const MAX_MESSAGE_LENGTH = 500
export const ContactFormSchema: ZodType<ContactFormData> = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  email: z
    .string()
    .min(5, 'Email is required')
    .max(100, "Email can't be longer than 100 characters")
    .email('Please enter a valid email address')
    .refine((email: string) => emailRegex.test(email), {
      message: 'Email format is incorrect',
    }),
  message: z
    .string()
    .min(4, 'Your message must contain at least 4 character(s) such as Hello!')
    .max(MAX_MESSAGE_LENGTH, `Message must be under ${MAX_MESSAGE_LENGTH} characters`),
})
