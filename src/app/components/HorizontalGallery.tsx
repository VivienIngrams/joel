'use client'

import 'react-horizontal-scrolling-menu/dist/styles.css'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import { urlForImage } from '~/sanity/lib/sanity.image'
import usePreventBodyScroll from './UsePreventScroll'

interface HorizontalGalleryProps {
  mainImages: any[]
}

export default function HorizontalGallery({ mainImages }: HorizontalGalleryProps) {
  const { disableScroll } = usePreventBodyScroll()
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768)
    }

    // Set initial value
    handleResize()

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div onMouseEnter={disableScroll} className="h-[80vh] gallery-container w-full">
      <ScrollMenu
        onWheel={onWheel}
        transitionBehavior="smooth"  // Set smooth behavior
        transitionDuration={isMobileScreen ? 1500 : 2000}  // Increase duration for smoother scrolling
      >
        {mainImages?.map((image: any, index: number) => (
          <div key={image._key || index.toString()} style={{ width: '800px', flexShrink: 0 }}>
            <Image
              src={urlForImage(image).url() as string}
              title={image.alt || `Image ${index + 1}`}
              alt="gallery"
              width={800}
              height={600}
              className="object-cover p-4"
            />
          </div>
        ))}
      </ScrollMenu>
    </div>
  )
}

// onWheel handler for ScrollMenu
function onWheel(apiObj: React.ContextType<typeof VisibilityContext>, ev: React.WheelEvent): void {
  ev.preventDefault(); // Prevent default scroll behavior

  // Check for horizontal scroll intent
  if (ev.deltaY !== 0) {
    // Determine the direction of scroll based on deltaY
    if (ev.deltaY > 0) {
      // Scroll right on down scroll
      apiObj.scrollNext(); // Use default smooth transition
    } else if (ev.deltaY < 0) {
      // Scroll left on up scroll
      apiObj.scrollPrev(); // Use default smooth transition
    }
  }
}
