'use client'

import { useState } from 'react'
import Image from 'next/legacy/image'
import { createPortal } from 'react-dom'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { textBoxTexts } from './DelphineTexts'

interface ImageGalleryProps {
  images: any[] // Expecting images with `dimensions` including `aspectRatio`
  title: string
}

const textBoxIndices = [0, 1, 2, 5, 6, 8, 9, 11, 13, 15, 20, 22]

export const DelphineMobileScroll = ({ images, title }: ImageGalleryProps) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const closeModal = () => {
    setOverlayVisible(false)
    setSelectedImage(null)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const Modal = () =>
    isOverlayVisible && selectedImage
      ? createPortal(
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/80"
            onClick={handleClickOutside}
          >
            <div className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Full View"
                layout="intrinsic"
                width={800}
                height={600}
                objectFit="contain"
              />
              <button
                className="absolute top-4 right-4 text-gray-500 bg-gray-800 rounded-full p-2 hover:bg-opacity-80"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <div className="w-full flex flex-col space-y-6 p-4 overflow-y-auto">
      {images.map((image, index) => {
        const shouldInsertTextBox = textBoxIndices.includes(index)
        const textBoxIndex = textBoxIndices.indexOf(index)

        return (
          <div key={`gallery-item-${index}`}>
            {/* Render Image */}
            <div
              className="relative flex-shrink-0 cursor-pointer shadow-md shadow-gray-700 overflow-hidden"
              style={{
                aspectRatio: `${image.aspectRatio || 1}/1`,
                height: 'auto',
              }}
              onClick={() => {
                setSelectedImage(urlForImage(image).url() as string)
                setOverlayVisible(true)
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                alt={image.title}
                layout="fill"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Conditionally Render Text Box */}
            {shouldInsertTextBox && textBoxTexts[textBoxIndex]?.content && (
              <div className="mt-4 text-gray-500 text-justify">
                <div
                  className={textBoxTexts[textBoxIndex]?.className || 'text-base'}
                  dangerouslySetInnerHTML={{
                    __html: textBoxTexts[textBoxIndex]?.content,
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
      <Modal />
    </div>
  )
}
