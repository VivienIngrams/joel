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

export function HorizontalScroll({
  mainImages,
  layoutDimensions,
}: HorizontalGalleryProps) {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  const path = usePathname()
  const isMainPostsPage = path === '/posts'

  const totalImagesWidth =
    mainImages.length *
    ( layoutDimensions[0]?.width)

  const containerWidth = window.innerWidth * 0.75

  const totalWidth = totalImagesWidth - containerWidth

  const start =  'top top'
  const end =  'clamp(2500 center)'

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${totalWidth}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: start,
          end: end,
          scrub: true,
          pin: true,
          markers: true,
        },
      },
    )

    return () => {
      pin.kill()
    }
  }, [totalWidth, start, end])

  return (
    <section
      ref={triggerRef}
      className={`${ !isMainPostsPage ? 'pl-[25vw]' : ''} w-full h-full overflow-hidden  bg-neutral-900 
      `}
    >
      <div
        ref={sectionRef}
        className={`flex pl-2 space-x-4 ${
          'pb-24'
        }`}
        style={{ width: `${mainImages.length * layoutDimensions[0].width}px` }}
      >
        {mainImages.map((image: any, index: number) => {
          const { height, width, marginY } =
            layoutDimensions[index]

          return (
            <div
              key={image._key || index.toString()}
              className={`relative flex-shrink-0 ${ 'my-20'}`}
              style={{
                width: `${width}px`,
                height:`${height}px`,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                title={image.alt || `Image ${index + 1}`}
                alt="gallery"
                layout="fill"
                objectFit="cover"
                className=""
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HorizontalScroll
