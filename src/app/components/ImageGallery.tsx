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
      const containerWidth = windowWidth - 60 // Padding
      const marginsWidth = (numberOfImages - 1) * 20 // Total margins between images

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
      {/* Image Gallery */}
      <div className="flex justify-center space-x-5 mb-4 max-w-full">
        {images.map((image, index) => (
          <Link key={index} href={`/posts/${slug}`}>
            <div
              className="relative"
              style={{
                width: `${dimensions[index].width}px`,
                height: `${dimensions[index].height}px`,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                alt={image.alt || title}
                layout="fill"
                className="object-cover border-[#060b18] border-2"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Title Section */}
      <div
        className="-mt-4 mb-12 mx-auto bg-gradient-to-t from-transparent via-black/30 to-black/50"
        style={{ width: `${dimensions[0].container}px` }}
      >
        <Link href={`/posts/${slug}`}>
          <h1 className="text-white uppercase text-3xl lg:text-4xl text-center font-thin">
            {title}
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default ImageGallery
