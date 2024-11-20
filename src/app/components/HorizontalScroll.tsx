'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/legacy/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { urlForImage } from '~/sanity/lib/sanity.image'

interface HorizontalGalleryProps {
  mainImages: any[]
  layout: 'portrait' | 'landscape' | 'square'
}

export function HorizontalScroll({
  mainImages,
  layout,
}: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({
    height: 0,
    totalImagesWidth: 0,
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  gsap.registerPlugin(ScrollTrigger)

  const path = usePathname()
  const isMainPostsPage = path === '/posts'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight * 0.78
      let totalImagesWidth = 0

      const imageWidths = mainImages.map(() => {
        let width
        switch (layout) {
          case 'portrait':
            width = height * (3 / 4) // 3:4 aspect ratio
            break
          case 'landscape':
            width = height * (16 / 9) // 16:9 aspect ratio
            break
          case 'square':
          default:
            width = height // 1:1 aspect ratio for square or default
            break
        }
        totalImagesWidth += width
        return width
      })

      setDimensions({ height, totalImagesWidth })
    }
  }, [mainImages, layout])

  useEffect(() => {
    if (dimensions.totalImagesWidth > 0 && typeof window !== 'undefined') {
      const containerWidth = window.innerWidth * 0.7
      const totalWidth = dimensions.totalImagesWidth - containerWidth

      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: `-${totalWidth}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'center center',
            end: `${totalWidth} top`,
            scrub: true,
            pin: true,
          },
        }
      )

      return () => {
        pin.kill()
      }
    }
  }, [dimensions])

  // Close the modal if clicked outside the image
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null)
    }
  }

  useEffect(() => {
    // Disable scroll when modal is open
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedImage])

  return (
    <section
      ref={triggerRef}
      className={`w-full h-full pt-16 overflow-hidden bg-neutral-800 ${!isMainPostsPage ? 'pl-[20vw] 2xl:pl-[20vw]' : ''}`}
    >
      <div
        ref={sectionRef}
        className="flex pl-2 space-x-4 pb-24"
        style={{ width: `${dimensions.totalImagesWidth}px` }}
      >
        {mainImages.map((image, index) => {
          const width =
            dimensions.height *
            (layout === 'portrait'
              ? 3 / 4
              : layout === 'landscape'
              ? 16 / 9
              : 1)

          return (
            <div
              key={image._key || index.toString()}
              className="relative flex-shrink-0 cursor-pointer"
              style={{
                width: `${width}px`,
                height: `${dimensions.height}px`,
              }}
              onClick={() =>
                setSelectedImage(urlForImage(image).url() as string)
              } // Open modal on click
            >
              <Image
                src={urlForImage(image).url() as string}
                title={image.alt || `Image ${index + 1}`}
                alt={image.alt || `Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="mt-24"
              />
            </div>
          )
        })}
      </div>

      {/* Modal for viewing the image in full */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/90"
          style={{ overflow: 'hidden' }} // Prevent scrolling inside modal
          onClick={handleClickOutside} // Close modal if clicked outside the image
        >
          <div className="relative w-auto h-auto max-w-[90vw] max-h-[99vh] flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full View"
              layout="intrinsic"
              width={1200}
              height={800}
              className="rounded-lg"
              objectFit="contain"
            />
            <button
              className="z-[99999] absolute top-20 right-5 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              onClick={() => setSelectedImage(null)} // Close modal
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default HorizontalScroll
