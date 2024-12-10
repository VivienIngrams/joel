'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { urlForImage } from '~/sanity/lib/sanity.image'

interface ImageGalleryProps {
  images: any[]
  layout: string
  slug: string
  title: string
}

const ImageGallery = ({ images, layout, slug, title }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<
    { width: number; height: number; container: number }[]
  >([])

  const getHeightByLayout = (width: number, layout: string) => {
    switch (layout) {
      case 'portrait':
        return width * (4 / 3) // 4:3 aspect ratio
      case 'landscape':
        return width * (9 / 12)
      case 'panorama':
        return width * (9 / 18) // 16:9 aspect ratio
      case 'square':
      default:
        return width // 1:1 aspect ratio
    }
  }

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth
      const numberOfImages = images.length
      const containerWidth = windowWidth - 150 // Padding
      const marginsWidth = (numberOfImages - 1) * 64 // Total margins between images

      const imageWidth = (containerWidth - marginsWidth) / numberOfImages

      const newDimensions = images.map(() => {
        const width = imageWidth
        const height = getHeightByLayout(width, layout)
        return { width, height, container: containerWidth } // Subtract margins from container
      })

      setDimensions(newDimensions)
    }

    calculateDimensions()
    window.addEventListener('resize', calculateDimensions)

    return () => {
      window.removeEventListener('resize', calculateDimensions)
    }
  }, [images, layout])

  if (dimensions.length === 0) {
    return null // or a loading spinner
  }

  return (
    <div className="mx-auto max-w-full">
      {/* Title Section with custom middle line */}
      <div
        className="-mb-2 mt-16 mx-auto relative"
        style={{ width: `${dimensions[0].container}px` }}
      >
        <Link href={`/posts/${slug}`}>
          <div className="relative text-center">
            {/* White Line Spanning Full Width */}
            <span className="absolute left-0 right-0 bottom-1/2 transform translate-y-2px] bg-white h-[1px] z-5"></span>

            {/* Title with Grey Background covering only text width */}
            <h1 className="text-white upper  font-light text-3xl lg:text-4xl inline-block relative z-11 px-1 my-4 bg-[#4b5563]">
              {title}
            </h1>
          </div>
        </Link>
      </div>
      {/* Image Gallery */}
      <div className="flex justify-center space-x-16 mb-4 max-w-full">
        {images.map((image, index) => (
          <Link key={index} href={`/posts/${slug}`}>
            <div
             
              style={{ position: "relative",
                width: `${dimensions[index].width}px`,
                height: `${dimensions[index].height}px`,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                alt={image.alt || title}
                fill
                sizes="90vw"
                className="object-cover shadow-md shadow-gray-800 "
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      
    </div>
  )
}

export default ImageGallery

