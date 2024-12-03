"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";

import { MailIcon } from "./CustomIcons";

import { sendContactForm } from "@/actions/contact";
import { ContactFormSchema, MAX_MESSAGE_LENGTH } from '@/lib/schemas'
import toast, { Toaster } from 'react-hot-toast'

let renderCount = 0;
const ContactForm: React.FC = () => {
  renderCount++
  const [messageLength, setMessageLength] = useState(0) // Track character count
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    setStatus('loading')
    const toastId = toast.loading('Sending your message...')
    try {
      console.log('Submitting form...', values)

      const respond = await sendContactForm(values)
      console.log('Response:', respond)
      if (respond?.success) {
        toast.success('Message sent successfully', { id: toastId })
        setStatus('success')
        reset()
        setMessageLength(0)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message', error)
      setStatus('error')
      toast.error('Failed to send message. Please try again later.', {
        id: toastId,
      })
    } finally {
      setStatus('idle')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Stay in touch </span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Fill in the form to start a conversation
        </p>
        <div className="mt-6">
          <div className="mb-2 mt-6">
            <input
              type="text"
              {...register('name', {
                required: 'Name must contain at least 4 character(s)',
                minLength: 4,
              })}
              placeholder="Your name"
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/10"
            />
          </div>
          <p className="mt-0 text-sm text-red-500">{errors.name?.message}</p>

          <div className="mb-2 mt-6">
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Email address"
              aria-label="Email address"
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/10"
            />
          </div>
          <p className="mt-0 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-1 w-full flex-auto space-y-2 text-xs">
          <label className="py-2 font-semibold text-gray-600">Message</label>
          <textarea
            {...register('message', {
              required:
                'Your message must contain at least 4 character(s) such as Hello!',
              minLength: 4,
              maxLength: 500,
            })}
            className="bg-grey-lighter text-grey-darker border-grey-lighter block h-28 max-h-[300px] min-h-[100px] w-full appearance-none rounded-lg border px-4 py-4 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/10"
            placeholder="Your message here..."
            onChange={(e) => setMessageLength(e.target.value.length)}
          ></textarea>
          <p className="mt-0 text-sm text-red-500">{errors.message?.message}</p>
          <p
            className={`text-right text-sm ${messageLength > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-400'}`}
          >
            {messageLength}/{MAX_MESSAGE_LENGTH} characters
          </p>
        </div>
        <button
          type="submit"
          className="w-full rounded border-zinc-900/10 bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-400 dark:bg-violet-600 dark:text-gray-50 hover:dark:ring-violet-600 focus:dark:ring-violet-600"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        <Toaster position="top-center" reverseOrder={false} />
      </form>
    </>
  )
};

export default ContactForm;
