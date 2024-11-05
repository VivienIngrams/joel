'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/legacy/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { urlForImage } from '~/sanity/lib/sanity.image';

interface HorizontalGalleryProps {
  mainImages: any[];
  layout: 'portrait' | 'landscape' | 'square'; // Define the layout type as a specific string union
}

export function HorizontalScroll({ mainImages, layout }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ height: 0, totalImagesWidth: 0 });

  gsap.registerPlugin(ScrollTrigger);

  const path = usePathname();
  const isMainPostsPage = path === '/posts';

  useEffect(() => {
    // Only execute if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const height = window.innerHeight * 0.78; 
      let totalImagesWidth = 0;

      // Calculate total width based on layout property
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
        totalImagesWidth += width;
        return width;
      });

      setDimensions({ height, totalImagesWidth });
    }
  }, [mainImages, layout]);

  useEffect(() => {
    if (dimensions.totalImagesWidth > 0 && typeof window !== 'undefined') {
      const containerWidth = window.innerWidth * 0.7;
      const totalWidth = dimensions.totalImagesWidth - containerWidth;

      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: `-${totalWidth}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'center center',
            end: `${totalWidth} top`, // Adjust this based on the expected scroll length
            scrub: true,
            pin: true,
            // markers: true, // Remove this in production
          },
        }
      );

      return () => {
        pin.kill();
      };
    }
  }, [dimensions]);

  return (
    <section
      ref={triggerRef}
      className={`w-full h-full pt-16 overflow-hidden bg-neutral-800 ${!isMainPostsPage ? 'pl-[20vw]' : ''}`}
    >
      <div
        ref={sectionRef}
        className="flex pl-2 space-x-4 pb-24"
        style={{ width: `${dimensions.totalImagesWidth}px` }}
      >
        {mainImages.map((image, index) => {
          const width = dimensions.height * (layout === 'portrait' ? (3 / 4) : layout === 'landscape' ? (16 / 9) : 1);

          return (
            <div
              key={image._key || index.toString()}
              className="relative flex-shrink-0"
              style={{
                width: `${width}px`,
                height: `${dimensions.height}px`,
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                title={image.alt || `Image ${index + 1}`}
                alt={image.alt || `Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className='mt-24'
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HorizontalScroll;
