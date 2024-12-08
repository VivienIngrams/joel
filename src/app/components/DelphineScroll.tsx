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
const textBoxIndices = [0, 1, 2, 3, 6, 9, 12, 13, 16, 22, 23]
const textBoxTexts = [
  {
    content: `<h1>Delphine  Alliens
         </h1>
      
        <h2>
         La Maison Jaune Résidence d&apos;Artistes  </h2>  <h3></h3>
         <h4>
          Résidence artistique, Juin - Octobre 2022
        </h4>
     <p className="">
       
        Présentation de ce travail au Pavillon Blanc, centre d&apos;art Colomiers, et à La Maison Jaune
      </p>`,
    className: 'text-left text-black p-8',
  },

  {
    content: `<p>
        A l’épreuve de nos corps 
        </p>
        <br/>
        <p> Le travail débuté mi février avait pour objet un corps inconnu,
        parfois peu identifiable vu par le prisme de l’écran. Ce travail extrêmement proche de ma
        sensibilité au départ, s'est peu à peu étiolé. J’ai pris conscience que le maintien à
        distance qu'était l’écran et qui me rassurait au départ, ne me convenait plus et n'apportait
        plus à mon travail matière à toucher une forme de vérité plastique et graphique. J'avais
        besoin de plus. La résidence d'artiste proposée à La Maison Jaune m'a permis de reprendre ce
        travail avec un autre rapport au corps de l'autre et l’étude de son expression intime via des
        séances photo réalisées en studio.
      </p>`,
    className: 'mx-16',
  },
  {
    content: `
        <div>
          <p>
            On se pose souvent sur le résultat mais se pose t&apos;on sur le moment du faire, sur
            l&apos;instant ? À quoi penses tu ? Que ressens tu ? De quoi as tu envie ? Est-ce que tu as
            peur? 
          </p>
          <p>
             Montrer son corps comme confession intime. Et tenter de retranscrire l&apos;instant
            photographique, l&apos;instant graphique, le vrai de cet instant.
          </p>

          
        </div>
      `,
    className: 'px-24',
  },
  {
    content: `
        <div class="text-box-large">
        <p>
            Ici il sera question de réintroduire la question de l&apos;humanité ou de la déshumanisation
            du modèle. À quel moment le modèle ne joue plus ? À quel moment le modèle donne à voir une
            vérité ? A quel moment l&apos;acte de résistance de ce corps tombe .
          </p>
          <br/>
          <p>
           Le corps du modèle face au corps sensoriel
et au regard de l'artiste peintre
Le corps comme obstacle au dévoilement
de la vérité et le corps comme exposition
totale de cette même vérité. 
          </p>
          <br/>
          <p>
            Le dessin sera une description de cet instant
si il a lieu. 
          </p>
        </div>
      `,
    className: 'mx-12',
  },
  {
    content: `
       
          <p>
            Un premier travail photographique, réalisé en juin 2022, donne lieu à des corps objets ou
            des morceaux de corps, des sorties de champ, corps coupés, corps imaginés où le cadrage
            photographique rend compte d&apos;une autre réalité. Cette première étape est nécessaire
            car elle implique un regard différent par l&apos;aspect temporel immédiat de l&apos;instant
            photographique où le corps de l&apos;artiste modèle devient une forme d&apos;écriture.
          </p>
          <p>
            Je tiens au non décor puisque mon travail se concentre sur ce
corps de l'autre sans artifice, nu ou pas.


          </p>
          <p>
            
J'ai commencé les séances photo par des postures que j'avais
déjà réalisées.

          </p>
          <br/>
          <br/>
          <br/>
          <p>Puis, j’ai pensé que je voulais tronquer ces corps</p>
       
      `,
    className: '',
  },
  {
    content: `
   <p>pour ne retenir que des ensembles forme.</p>`,
    className: 'flex flex-col space-between',
  },
  
  {
    content: `
          <p>
            Plus qu&apos;un photographe, j&apos;avais l&apos;attitude d&apos;une exploratrice de ce
            corps que je voulais faire parler. La proximité des prises de vue s&apos;est peu à peu
            imposée comme les hors champs, les cadrages sont plus de l&apos;ordre d&apos;une
            réalisation graphique, picturale. Une sorte de jeu entre le plein et le vide. Cette intrusion à ce corps a amené le modèle à se confier soit par la parole, soit
par les gestes, soit par la sensibilité et l'émotion. Une forme courte de vérité
offerte par l'artiste modèle à l'artiste plasticienne.
Ensuite, la réflexion du peintre. 
          </p>
          <p>
             Cette intrusion à ce corps a amené le modèle à se confier soit par la parole, soit
par les gestes, soit par la sensibilité et l'émotion. Une forme courte de vérité
offerte par l'artiste modèle à l'artiste plasticienne.
</p> <p>
Ensuite, la réflexion du peintre. 
          </p>
      `,
    className: '',
  },
  {
    content: `
    <p>Carnet de dessins sur les intimités de Joël</p>
      
      `,
    className: '',
  },
  {
    content: `
        <p>
          Ce que j&apos;avais initié sans trop en avoir conscience, c&apos;est l&apos;évocation de ce
          corps représenté en pleine puissance évocatrice. Une sorte de mémoire sensorielle qui
          instinctivement se révélait au geste pictural.
        </p>
        <br/>
        <p>La résidence me permet de pleinement y travailler.</p>
        <br/> <p>
(5 juillet 2022, 4h30)</p>
      `,
    className: '',
  },
  {
    content: `
        <div class="">
          <p>
            Chaque prise de vue sera suivie par une réflexion plastique et graphique sur papier où le
            dessin, le découpage, le collage plastique et photographique, la peinture sera une réponse
            instinctive, mémorielle face à la confession de l&apos;intime du modèle. Le dessin sera réalisé de suite après la
séance photographique, puis sur des temps plus longs et éloignés. Un temps élastique dont les
réalisations attesteront de l’éloignement de ce moment entre nous deux. A voir si à mesure que
le temps effacera, d’autres évocations apparaitront en moi. 
          </p>
        </div>
      `,
    className: '',
  },
  {
    content: `
        <div class="">
          <p>
            J&apos;ai marché, j&apos;ai beaucoup marché, j&apos;ai marché
tous les jours. Pour me sortir la tête de ce corps
qui n&apos;est pas à moi. Je l&apos;étudie, je le transforme,
je le mémoire. 
          </p>
          <p>
           Oui je le mémoire, c&apos;est plus fort que je le
souvenir. 
          </p>
          <p>
            Je souvenir c&apos;est garder un peu une trace
quelque part. Je mémoire c&apos;est prendre
possession, c&apos;est revivre le temps de ce corps,
c&apos;est de la folie. 

          </p>
          <p>
           (7 juillet 2022)
          </p>
        </div>
      `,
    className: '',
  },
  {
    content: `
        <p>
          Comment rendre compte de cet instant de communion de confession et de sincérité. L&apos;idée
          ici n&apos;étant pas de réaliser une copie d&apos;une photographie mais bien de donner à
          voir l&apos;instant de vérité du corps mise à nu.
        </p>
        <p>
        Ces cylindres de papier qui cachent encore un peu du regard
l&apos;instant photographique, fragile. 
        </p><p>
        Proposition de présentation
des intimités de Joël</p>
      `,
    className: '',
  },
]

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
      const totalSpacing = (images.length + 9) * 32; // Space between items
      totalImagesWidth += totalSpacing;
  
      setDimensions({ height, totalImagesWidth });
    }
  }, [images]);
  
  console.log(images.length)
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
  console.log('Total Images Width:', dimensions.totalImagesWidth);

  
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
      <section
        ref={triggerRef}
        className="w-full h-full pt-16 overflow-hidden bg-[#4b5563] pl-[26vw]"
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
                  className="relative flex-shrink-0 cursor-pointer shadow-lg shadow-gray-800"
                  style={{
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
                    className="flex items-center justify-center text-black p-8 text-justify "
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

interface ImageGalleryProps {
  images: any[] // Expecting images with `dimensions` including `aspectRatio`
  title: string
}

export const DelphineMobileScroll = ({ images, title }: ImageGalleryProps) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Track selected image

  useEffect(() => {
    const calculateHeight = () => {
      const height = window.innerHeight * 0.5 // Fixed height: 50% of the window height
      setContainerHeight(height)
    }

    calculateHeight()
    window.addEventListener('resize', calculateHeight)

    return () => {
      window.removeEventListener('resize', calculateHeight)
    }
  }, [])

  if (containerHeight === 0) {
    return null // or a loading spinner
  }

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
        {images.map((image, index) => {
          const aspectRatio = image.aspectRatio || 1 // Fallback to 1:1 if aspectRatio is missing
          const imgWidth = containerHeight * aspectRatio // Calculate width based on aspect ratio and fixed height

          return (
            <div key={index} className="relative flex-shrink-0">
              {/* Clickable Image */}
              <div
                style={{
                  width: `${imgWidth}px`, // Set width to the calculated width
                  height: `${containerHeight}px`, // Fixed height
                }}
                onClick={() => {
                  setSelectedImage(urlForImage(image).url() as string)
                  setOverlayVisible(true) // Open modal
                }}
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={image.title}
                  layout="fill"
                  className="object-cover shadow-lg shadow-gray-800 "
                  loading="lazy" // Ensure lazy loading
                />
              </div>
            </div>
          )
        })}
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
              layout="intrinsic"
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
