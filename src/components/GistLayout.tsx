'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { type GistWithSlug } from '@/lib/gists'
import { formatDate } from '@/lib/formatDate'
// import ProseWrapper  from '@/components/ProseWrapper'
import { Prose }  from '@/components/Prose'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GistLayout({
  gist,
  children,
}: {
  gist: GistWithSlug;
  children: React.ReactNode;
}) {
  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to gists"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {gist.title}
              </h1>
              <div className="order-first flex flex-row-reverse">
                {gist.updated && gist.updated !== gist.created && (
                    <time
                      dateTime={gist.updated}
                      className="order-first text-base text-zinc-400 dark:text-zinc-500"
                    >
                      <span className="ml-3 mr-3">
                        Last updated: {formatDate(gist.updated)}
                      </span>
                    </time>
                )}
                <span className="h-6 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <time
                  dateTime={gist.created}
                  className="text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="ml-3 mr-3">
                    Created: {formatDate(gist.created)}
                  </span>
                </time>
              </div>
            </header>
            <Prose className="prose mt-8">{children}</Prose>
            <time
              dateTime={gist.created}
              className="items-right order-first flex text-base text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span className="ml-3 mr-3">
                Created at: {formatDate(gist.created)}
              </span>
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            </time>
          </article>
        </div>
      </div>
    </Container>
  )
}
