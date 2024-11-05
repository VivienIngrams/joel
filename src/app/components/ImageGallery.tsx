// ImageGallery.tsx
'use client'

import HorizontalScroll from '~/app/components/HorizontalScroll'
import { useEffect, useState } from 'react'

interface ImageGalleryProps {
  mainImages: any[]
  layout: string
}

const ImageGallery = ({ mainImages, layout }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<any[]>([])

  const getDimensions = (layout: string, imageHeight: number, mobileWidth) => {
    switch (layout) {
      case 'portrait':
        return {
          width: imageHeight * 0.75, // 3:4 aspect ratio
          height: imageHeight,
          mobileHeight: mobileWidth * 1.25, // 5:4 ratio for mobile
          marginY: '10vh',
        }
      case 'landscape':
        return {
          width: imageHeight * 1.6, // 16:10 aspect ratio
          height: imageHeight,
          mobileHeight: mobileWidth * 0.5, // 16:5 ratio for mobile
          marginY: '30vh',
        }
      case 'square':
        return {
          width: imageHeight, // 1:1 aspect ratio
          height: imageHeight,
          mobileHeight: mobileWidth,
          marginY: '25vh',
        }
      default:
        return {
          width: imageHeight * 1.5, // 3:2 aspect ratio for default
          height: imageHeight,
          mobileHeight: mobileWidth * 1.1, // Slightly taller for mobile
          marginY: '25vh',
        }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const imageHeight = window.innerHeight * 0.75 // Get the window height on client side
      const mobileWidth = window.innerWidth * 0.9
      const newDimensions = mainImages.map(() =>
        getDimensions(layout, imageHeight, mobileWidth),
      )
      setDimensions(newDimensions)
    }

    // Set initial dimensions
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mainImages, layout])

  // Ensure dimensions are not empty before rendering
  if (dimensions.length === 0) {
    return null // or a loading spinner
  }

  return (
    <HorizontalScroll mainImages={mainImages} layoutDimensions={dimensions} />
  )
}

export default ImageGallery
