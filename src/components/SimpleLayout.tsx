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
      <section className="80vh relative flex justify-end">
        <Image
          src={carmenLaptop}
          alt=""
          sizes="100vw"
          placeholder="blur"
          style={{ width: '100%', height: 'auto' }}
          className="rounded-2xl"
        />

        <header className="absolute z-10 pt-8 pe-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl dark:text-zinc-100">
            {title}
          </h1>
          <p className="mt-2 max-w-96  text-base text-zinc-100 dark:text-zinc-100">
            {intro}
          </p>
        </header>
      </section>

      <div>{children && <div className="mt-16 sm:mt-20">{children}</div>}</div>
    </Container>
  )
}
