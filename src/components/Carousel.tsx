// components/Carousel.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Image, {
  type ImageProps as NextImageProps,
  StaticImageData,
} from 'next/image'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export interface CarouselImageItem extends Pick<NextImageProps, 'alt'> {
  src: string | StaticImageData
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
  id?: string | number
}

interface CarouselProps {
  images: CarouselImageItem[]
  imagesPerView?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showControls?: boolean
  imageContainerClassName?: string // Class for the immediate div wrapping the Image
  imageWrapperClassName?: string // Class for the div that gets the rotation and width/height
  imageClassName?: string // Class for the Next/Image component itself
  gapBetweenImages?: string
  enableRotation?: boolean // New prop to toggle rotation
}

// The rotations from your original ImageGallery
const rotations = [
  'transform -rotate-2',
  'transform rotate-2',
  'transform -rotate-1',
  'transform rotate-1',
  'transform -rotate-3',
  'transform rotate-3',
]

export function Carousel({
  images,
  imagesPerView = 2,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  imageContainerClassName = '', // e.g. "h-full w-full"
  imageWrapperClassName = 'aspect-[9/10]', // This will get the rotation and define aspect/size
  imageClassName = 'absolute inset-0 h-full w-full object-cover',
  gapBetweenImages = 'gap-0',
  enableRotation = true, // Default to true to show rotation
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const effectiveImagesPerView = Math.max(1, imagesPerView)
  const totalSlides = Math.ceil(images.length / effectiveImagesPerView)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - effectiveImagesPerView
      if (newIndex < 0) {
        // If at the beginning, go to the last slide (handle non-even division)
        return Math.max(0, (totalSlides - 1) * effectiveImagesPerView)
      }
      return newIndex
    })
  }, [effectiveImagesPerView, totalSlides])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + effectiveImagesPerView
      if (newIndex >= images.length) {
        return 0 // Loop to start
      }
      // Ensure we don't skip the last few items if not a perfect multiple
      if (
        newIndex > images.length - effectiveImagesPerView &&
        prevIndex < images.length - effectiveImagesPerView
      ) {
        return images.length - effectiveImagesPerView
      }
      return newIndex
    })
  }, [effectiveImagesPerView, images.length])

  const goToSlide = (slidePageIndex: number) => {
    setCurrentIndex(slidePageIndex * effectiveImagesPerView)
  }

  useEffect(() => {
    if (!autoPlay || images.length <= effectiveImagesPerView) return
    const intervalId = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(intervalId)
  }, [
    autoPlay,
    autoPlayInterval,
    goToNext,
    images.length,
    effectiveImagesPerView,
  ])

  if (!images || images.length === 0) {
    return (
      <div className="mt-16 flex h-72 w-full items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 sm:mt-20 sm:h-96 dark:bg-zinc-800 dark:text-zinc-400">
        No images to display.
      </div>
    )
  }

  const itemWidthStyle = `calc(${100 / effectiveImagesPerView}% - (${gapBetweenImages !== 'gap-0' ? `((${effectiveImagesPerView} - 1) / ${effectiveImagesPerView}) * var(--carousel-gap, 0px)` : '0px'}) )`
  const gapValue = gapBetweenImages.startsWith('gap-')
    ? `${parseFloat(gapBetweenImages.substring(4)) * 0.35}rem`
    : '0px'

  return (
    <div
      className="relative mt-10 w-full overflow-hidden rounded-xl bg-zinc-100 py-4 ps-4 shadow-lg sm:mt-20 sm:rounded-2xl dark:bg-zinc-800" // Added py-4 for rotation overflow
      style={{ '--carousel-gap': gapValue } as React.CSSProperties}
    >
      <div
        className={clsx(
          'flex transition-transform duration-700 ease-in-out',
          gapBetweenImages,
        )}
        style={{
          transform: `translateX(-${(currentIndex / effectiveImagesPerView) * 100}%)`,
          // Add some padding to the sliding container if rotation makes edges clip
          // This depends on the amount of rotation. Alternatively, the main wrapper's overflow and padding handles it.
          // paddingLeft: enableRotation ? '1rem' : '0',
          // paddingRight: enableRotation ? '1rem' : '0',
        }}
      >
        {images.map((image, imageIndex) => (
          <div
            key={image.id || imageIndex}
            className={clsx('relative flex-none overflow-visible')} // overflow-visible for rotation
            style={{ width: itemWidthStyle }}
          >
            {/* This inner div will get the rotation and define the aspect ratio/size */}
            <div
              className={clsx(
                'relative rounded-xl bg-zinc-100 sm:rounded-2xl dark:bg-zinc-800', // Background for the rotated item
                imageWrapperClassName, // e.g., "aspect-[9/10]"
                enableRotation && rotations[imageIndex % rotations.length], // Apply rotation
                'overflow-hidden', // Clip the Image content within the rotated wrapper
              )}
            >
              <div
                className={clsx(
                  'h-full w-full rounded-xl sm:rounded-2xl overflow-hidden relative',
                  imageContainerClassName,
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Slide ${imageIndex + 1}`}
                  fill
                  sizes={`(min-width: 1024px) ${100 / effectiveImagesPerView}vw, (min-width: 640px) ${80 / effectiveImagesPerView}vw, ${50 / effectiveImagesPerView}vw`}
                  className={clsx(imageClassName)}
                  priority={
                    imageIndex >= currentIndex &&
                    imageIndex < currentIndex + effectiveImagesPerView
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {showControls && images.length > effectiveImagesPerView && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0 && !autoPlay}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 disabled:opacity-50 sm:left-4"
            aria-label="Previous set of slides"
          >
            <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          <button
            onClick={goToNext}
            disabled={
              currentIndex >= images.length - effectiveImagesPerView &&
              !(
                autoPlay &&
                images.length % effectiveImagesPerView !== 0 &&
                currentIndex + effectiveImagesPerView > images.length
              ) &&
              !(
                autoPlay &&
                currentIndex === 0 &&
                images.length % effectiveImagesPerView === 0
              )
            }
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 disabled:opacity-50 sm:right-4"
            aria-label="Next set of slides"
          >
            <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > effectiveImagesPerView && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
          {Array.from({ length: totalSlides }).map((_, slidePageIndex) => (
            <button
              key={slidePageIndex}
              onClick={() => goToSlide(slidePageIndex)}
              className={clsx(
                'h-2 w-2 rounded-full sm:h-3 sm:w-3',
                Math.floor(currentIndex / effectiveImagesPerView) ===
                  slidePageIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75',
              )}
              aria-label={`Go to slide ${slidePageIndex + 1}`}
              aria-current={
                Math.floor(currentIndex / effectiveImagesPerView) ===
                slidePageIndex
                  ? 'true'
                  : 'false'
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default Carousel