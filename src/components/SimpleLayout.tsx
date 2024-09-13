import { Container } from '@/components/Container'
import Image from 'next/image'
import carmenLaptop from '@/images/home/carmen-laptop.jpeg'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <section className="relative flex w-full items-center justify-end overflow-hidden">
        <Image
          src={carmenLaptop}
          alt="Carmen coding on her laptop"
          // placeholder="blur"
          fill
          sizes="(min-width: 640px) 640px, 100vw"
          style={{ objectFit: 'cover' }}
          className="rounded-2xl opacity-60"
        />
        <header className="z-10 flex flex-col items-center justify-end p-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl dark:text-zinc-100">
            {title}
          </h1>
          <p className=" text-zinc-600 xs:text-lg mt-2 max-w-96 sm:text-zinc-600 dark:text-zinc-100">
            {intro}
          </p>
        </header>
      </section>

      <div>{children && <div className="mt-16 sm:mt-20">{children}</div>}</div>
    </Container>
  )
}
