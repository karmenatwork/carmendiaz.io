import Link from 'next/link'
import Image from 'next/image'

 
export default function NotFound() {
  return (
    <>
      <div className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Sorry NOT FOUND 
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Could not find requested resource | 
            <Link href="/" className="text">  Return Home </Link>
          </p>
          <Image
        src={'/404page.jpeg'}
        alt="image"
        width={400}
        height={100}
        priority={true}
        className="rounded-xl py-4 w-auto h-auto"
    />
        </div>
      </div>
    </>


  )
}