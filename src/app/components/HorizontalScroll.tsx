'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/legacy/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { urlForImage } from '~/sanity/lib/sanity.image';

interface HorizontalGalleryProps {
  mainImages: any[];
  layout: string; // Define the layout type as a string
}

export function HorizontalScroll({ mainImages, layout }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  const path = usePathname();
  const isMainPostsPage = path === '/posts';

  // Define the height based on the window's height
  const height = window.innerHeight * 0.8; // 80% of viewport height
  let totalImagesWidth = 0;

  // Calculate width based on the layout property for each image
  const imageWidths = mainImages.map(() => {
    let width;
    switch (layout) {
      case 'portrait':
        width = height * (3 / 4); // 3:4 aspect ratio
        break;
      case 'landscape':
        width = height * (16 / 9); // 16:9 aspect ratio
        break;
      case 'square':
      default:
        width = height; // 1:1 aspect ratio for square or default
        break;
    }
    totalImagesWidth += width; // Accumulate the total width for scrolling
    return width;
  });

  useEffect(() => {
    const containerWidth = window.innerWidth * 0.75; // Adjust this as needed
    const totalWidth = totalImagesWidth - containerWidth;

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${totalWidth}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `${totalWidth} top`, // Adjust this based on the expected scroll length
          scrub: true,
          pin: true,
          markers: true, // Remove this in production
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, [totalImagesWidth]);

  return (
    <section
      ref={triggerRef}
      className={`w-full h-full overflow-hidden bg-neutral-800 ${!isMainPostsPage ? 'pl-[25vw]' : ''}`}
    >
      <div
        ref={sectionRef}
        className="flex pl-2 space-x-4 pb-24"
        style={{ width: `${totalImagesWidth}px` }}
      >
        {mainImages.map((image, index) => {
          const width = imageWidths[index]; // Use the calculated width

          return (
            <div
              key={image._key || index.toString()}
              className="relative flex-shrink-0 my-20"
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                title={image.alt || `Image ${index + 1}`}
                alt={image.alt || `Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HorizontalScroll;
