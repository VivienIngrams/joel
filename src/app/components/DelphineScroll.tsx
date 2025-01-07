'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/legacy/image'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { urlForImage } from '~/sanity/lib/sanity.image'
import { textBoxTexts } from './DelphineTexts'

interface HorizontalGalleryProps {
  images: any[]
  title: string
}
const textBoxIndices = [0, 1, 2, 5, 6, 8, 9, 11, 13, 15, 20, 22]

export function DelphineScroll({ images, title }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({
    height: 0,
    totalImagesWidth: 0,
  })
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  gsap.registerPlugin(ScrollTrigger)

  // Set dimensions of images based on aspect ratio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight * 0.78; // Base height for images
      let totalImagesWidth = 0;
  
      images.forEach((image, index) => {
        const { aspectRatio } = image;
  
        if (aspectRatio) {
          const imgWidth = height * aspectRatio;
          totalImagesWidth += imgWidth;
        } else {
          console.warn(`Image at index ${index} is missing an aspectRatio`);
        }
  
        // Add space for text box if index is in textBoxIndices
        if (textBoxIndices.includes(index)) {
          totalImagesWidth += height;
        }
      });
  
      // Add spacing between images and text boxes
      const totalSpacing = (images.length + 11) * 32; // Space between items
      totalImagesWidth += totalSpacing;
  
      setDimensions({ height, totalImagesWidth });
    }
  }, [images]);
  
 
  // GSAP scroll logic
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
        },
      )

      return () => {
        pin.kill()
      }
    }
  }, [dimensions])

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
                className="absolute top-5 -right-12 text-gray-500 border-[1px] rounded-full p-1 px-2 hover:bg-[#818895]"
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
      <section
        ref={triggerRef}
        className="w-full h-full pt-16 overflow-hidden bg-white pl-[28vw]"
      >
        <div
          ref={sectionRef}
          className="flex pl-2 space-x-8 pb-[75px]"
          style={{ width: `${dimensions.totalImagesWidth}px` }}
        >
          {images.map((image, index) => {
            const { aspectRatio } = image
            const imgWidth = dimensions.height * aspectRatio

            // Find the index in textBoxIndices array
            const textBoxIndex = textBoxIndices.indexOf(index)
            const shouldInsertTextBox = textBoxIndex !== -1 // True if this index is in textBoxIndices

            return (
              <React.Fragment key={index}>
                {/* Render the image */}
                <div
                  className="flex-shrink-0 cursor-pointer shadow-lg shadow-gray-800"
                  style={{ position: "relative",
                    width: `${imgWidth}px`,
                    height: `${dimensions.height}px`,
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
                    className="mt-24 object-cover"
                  />
                </div>

                {/* Render a text box if the current index is in textBoxIndices */}
                {shouldInsertTextBox && (
                  <div
                    className="flex items-center justify-center text-gray-500 p-8 text-justify "
                    style={{
                      
                      width: `${dimensions.height}px`,
                      height: `${dimensions.height}px`,
                    }}
                  >
                    <div className={textBoxTexts[textBoxIndex].className}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: textBoxTexts[textBoxIndex].content,
                        }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
}
