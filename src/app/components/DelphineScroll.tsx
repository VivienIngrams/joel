'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/legacy/image'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { urlForImage } from '~/sanity/lib/sanity.image'

interface HorizontalGalleryProps {
  images: any[]
  title: string
}

export function DelphineScroll({ images, title }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  gsap.registerPlugin(ScrollTrigger)
  const height = window.innerHeight * 0.78
  const width = window.innerWidth * 0.6
  // GSAP scroll logic
  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-1000px`,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'center center',
          end: `1000 top`,
          scrub: true,
          pin: true,
        },
      },
    )

    return () => {
      pin.kill()
    }
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
                height={height}
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
      <section
        ref={triggerRef}
        className="w-full h-full pt-16 overflow-hidden bg-[#818895] pl-[27vw] 2xl:pl-[25vw]"
      >
        <div ref={sectionRef} className="flex pl-2 space-x-8 pb-[75px]">
          <div
            className={`relative flex-shrink-0 cursor-pointer h-[700px] w-[1000px]`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            onClick={() => {
              setSelectedImage(urlForImage(images[0]).url() as string)
              setOverlayVisible(true)
            }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-md">
                <p className='mb-2'>A l’épreuve de nos corps</p>
                <p>
                  Le travail débuté mi février avait pour objet un corps
                  inconnu, parfois peu identifiable vu par le prisme de l’écran.
                  Ce travail extrêmement proche de ma sensibilité au départ,
                  s&apos;est peu à peu étiolé. J&apos;ai pris conscience que le
                  maintien à distance qu&apos;était l&apos;écran et qui me
                  rassurait au départ, ne me convenait plus et n&apos;apportait
                  plus à mon travail matière à toucher une forme de vérité
                  plastique et graphique. J&apos;avais besoin de plus. La
                  résidence d&apos;artiste proposée à La Maison Jaune m&apos;a
                  permis de reprendre ce travail avec un autre rapport au corps
                  de l&apos;autre et l&apos;étude de son expression intime via
                  des séances photo réalisées en studio.{' '}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`relative flex-shrink-0 cursor-pointer h-[700px] w-[1000px]`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            onClick={() => {
              setSelectedImage(urlForImage(images[0]).url() as string)
              setOverlayVisible(true)
            }}
          >
            <div className="relative h-1/3 w-1/4">
              <Image
                src={urlForImage(images[0]).url() as string}
                alt={title}
                layout="fill"
                className=" object-cover"
              />
            </div>
          </div>
          <div
            className={`relative flex-shrink-0 cursor-pointer h-[700px] w-[1000px]`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            onClick={() => {
              setSelectedImage(urlForImage(images[0]).url() as string)
              setOverlayVisible(true)
            }}
          >
            <div className="relative h-1/3 w-1/4"></div>
          </div>
        </div>
      </section>
    </>
  )
}

interface ImageGalleryProps {
  images: any[] // Expecting images with `dimensions` including `aspectRatio`
  title: string
}

export const DelphineMobileScroll = ({ images, title }: ImageGalleryProps) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Track selected image

  const closeModal = () => {
    setOverlayVisible(false)
    setSelectedImage(null)
  }

  return (
    <div className="w-full overflow-x-auto">
      {' '}
      {/* Enable horizontal scrolling */}
      <div className="flex flex-row space-x-4">
        {' '}
        {/* Flex container for images */}
        <div className="relative flex-shrink-0">
          {/* Clickable Image */}
          <div
            className="relative flex-shrink-0 w-32 h-32"
            onClick={() => {
              setSelectedImage(urlForImage(images[0]).url() as string)
              setOverlayVisible(true) // Open modal
            }}
          >
            <Image
              src={urlForImage(images[0]).url() as string}
              alt={title}
              sizes="100vw"
              layout="fill"
              className="object-cover shadow-lg shadow-gray-500 border-white border-[1.5px]"
              loading="lazy" // Ensure lazy loading
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOverlayVisible && selectedImage && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/80"
          onClick={closeModal} // Close modal on click outside the image
        >
          <div className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full View"
              width={800}
              height={600}
              className=""
              objectFit="contain"
            />
            <button
              className="absolute -top-12 right-0 text-white  p-2 hover:bg-opacity-70"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
