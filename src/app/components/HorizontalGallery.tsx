'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/legacy/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

import { urlForImage } from '~/sanity/lib/sanity.image'

interface HorizontalGalleryProps {
  mainImages: any[]
  layoutDimensions: {
    width: number
    height: number
    mobileHeight: number
    marginY: string
  }[]
}

export function HorizontalGallery({
  mainImages,
  layoutDimensions,
}: HorizontalGalleryProps) {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  const path = usePathname()
  const isMainPostsPage = path === '/posts'

  useEffect(() => {
    const totalWidth =
      (isMainPostsPage ? mainImages.length - 1 : mainImages.length) *
      (window.innerWidth * 0.9)

    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: `-${totalWidth}px`,
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `${totalWidth} top`,
          scrub: true,
          pin: true,
          // Adjust based on screen size
          toggleActions: 'restart pause resume pause',
        },
      }
    )

    return () => {
      pin.kill() // Clean up the animation on unmount
    }
  }, [mainImages, isMainPostsPage])

  // Check if the screen size is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section
      ref={triggerRef}
      className={`w-full h-full overflow-hidden relative bg-neutral-900 ${
        isMobile ? 'pb-12' : ''
      }`}
    >
      <div ref={sectionRef} className="flex pl-2 space-x-4">
        {mainImages.map((image: any, index: number) => {
          const { mobileHeight, height, width, marginY } = layoutDimensions[index]

          return (
            <div
              key={image._key || index.toString()}
              className="relative flex-shrink-0"
              style={{
                width: isMobile ? '90vw' : `${width}px`,
                height: isMobile ? mobileHeight : height,
                marginTop: marginY,
                marginBottom: marginY,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                title={image.alt || `Image ${index + 1}`}
                alt="gallery"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HorizontalGallery
