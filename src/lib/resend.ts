import { Resend } from 'resend'

const apiKey =
  process.env.RESEND_API_KEY ||
  process.env.FUNCTIONS_EMULATOR

export const resend = new Resend(apiKey)
