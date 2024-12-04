'use client'

import Image from 'next/legacy/image'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { urlForImage } from '~/sanity/lib/sanity.image'

interface VerticalGalleryProps {
  images: { _key?: string; aspectRatio: number }[]
  title: string
}

export function DelphineScroll({ images, title }: VerticalGalleryProps) {
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Update screenWidth on window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeModal = () => {
    setOverlayVisible(false)
    setSelectedImage(null)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  // Modal rendered via React Portal
  const Modal = () =>
    isOverlayVisible && selectedImage
      ? createPortal(
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/80"
            style={{
              isolation: 'isolate',
              backdropFilter: 'blur(5px)',
            }}
            onClick={handleClickOutside}
          >
            <div className="relative w-auto h-auto max-w-[90vw] max-h-[99vh] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={title}
                layout="intrinsic"
                width={1200}
                height={800}
                objectFit="contain"
              />
              <button
                className="absolute top-5 -right-12 text-white border-[1px] rounded-full p-1 px-2 hover:bg-[#818895]"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
          </div>,
          document.body, // Render modal at root level
        )
      : null

  return (
    <>
      <Modal />
      <section className="w-full h-full pt-16 overflow-y-auto mx-2 bg-[#818895]">
        <div className="flex flex-col items-center space-y-8 pb-[75px]">
          {images.map((image, index) => {
            const isMobile = screenWidth <= 768 // Define mobile breakpoint
            const imageWidth = isMobile
              ? screenWidth * 0.8 // 80% of screen width for mobile
              : image.aspectRatio * 400 // Retain height-based logic for larger screens
            const imageHeight = isMobile
              ? imageWidth / image.aspectRatio // Maintain aspect ratio for mobile
              : 400 // Fixed height for larger screens

            return (
              <div
                key={image._key || index.toString()}
                className="relative cursor-pointer shadow-lg bg-white shadow-gray-500 border-white border-2"
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                }}
                onClick={() => {
                  setSelectedImage(urlForImage(image).url() as string)
                  setOverlayVisible(true)
                }}
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={title}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}




// export const DelphineMobileScroll = ({ images, title }: ImageGalleryProps) => {
//   const [isOverlayVisible, setOverlayVisible] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<string | null>(null) // Track selected image

//   const closeModal = () => {
//     setOverlayVisible(false)
//     setSelectedImage(null)
//   }

//   return (
//     <div className="w-full overflow-x-auto">
//       {' '}
//       {/* Enable horizontal scrolling */}
//       <div className="flex flex-row space-x-4">
//         {' '}
//         {/* Flex container for images */}
//         <div className="relative flex-shrink-0">
//           {/* Clickable Image */}
//           <div
//             className="relative flex-shrink-0 w-32 h-32"
//             onClick={() => {
//               setSelectedImage(urlForImage(images[0]).url() as string)
//               setOverlayVisible(true) // Open modal
//             }}
//           >
//             <Image
//               src={urlForImage(images[0]).url() as string}
//               alt={title}
//               sizes="100vw"
//               layout="fill"
//               className="object-cover shadow-lg shadow-gray-500 border-white border-[1.5px]"
//               loading="lazy" // Ensure lazy loading
//             />
//           </div>
//         </div>
//       </div>
//       {/* Modal */}
//       {isOverlayVisible && selectedImage && (
//         <div
//           className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/80"
//           onClick={closeModal} // Close modal on click outside the image
//         >
//           <div className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center">
//             <Image
//               src={selectedImage}
//               alt="Full View"
//               width={800}
//               height={600}
//               className=""
//               objectFit="contain"
//             />
//             <button
//               className="absolute -top-12 right-0 text-white  p-2 hover:bg-opacity-70"
//               onClick={closeModal}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
