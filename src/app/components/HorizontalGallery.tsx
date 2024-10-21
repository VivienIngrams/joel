'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from "next/legacy/image"
import React, { useEffect, useRef } from 'react'

import { urlForImage } from '~/sanity/lib/sanity.image'

interface HorizontalGalleryProps {
  mainImages: any[]
}

export function HorizontalGallery({ mainImages }: HorizontalGalleryProps) {
    const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    // Only apply the animation if the window width is above 768 pixels (non-mobile screens)
    if (window.innerWidth > 768) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: '-300vw', // depends on the number of ProjectListItems
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
            scrub: true,
            pin: true,
          },
        },
      )
      return () => {
        // A return function for killing the animation on component unmount
        pin.kill()
      }
    }
  }, []) // Empty dependency array means this effect runs only on mount
  return (
    <section
      ref={triggerRef}
      className="w-full h-screen overflow-hidden relative"
    >
      <div
        ref={sectionRef}
        className="flex space-x-4"
        style={{ width: `${mainImages.length * 70}vw` }} // Dynamically set the width based on number of images
      >
        {mainImages.map((image: any, index: number) => (
          <div
            key={image._key || index.toString()}
            className="relative flex-shrink-0 w-[70vw] h-[90vh] my-[5vh]"
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
        ))}
      </div>
    </section>
  )
}

export default HorizontalGallery
