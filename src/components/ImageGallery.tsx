// import { ImageData } from '@/types' // Import ImageData from types.ts
import { type ImageProps } from 'next/image'
import Image from 'next/image'
import clsx from 'clsx'


interface ImageGalleryProps {
  images: ImageProps[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  console.log('Rendering ImageGallery with images:', images) // Log the images prop

  let rotations = [
    '-rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-12',
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image: ImageProps, imageIndex: number) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image.src}
              alt={image.alt || ''}
              width={parseInt(`${image.width}` || '640')}
              height={parseInt(`${image.height}` || '640')}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
