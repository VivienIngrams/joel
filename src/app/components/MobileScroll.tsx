'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { urlForImage } from '~/sanity/lib/sanity.image';

interface ImageGalleryProps {
  images: any[]; // Expecting images with `dimensions` including `aspectRatio`
  slug: string;
  title: string;
}

const MobileScroll = ({ images, slug, title }: ImageGalleryProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const calculateHeight = () => {
      const height = window.innerHeight * 0.5; // Fixed height: 50% of the window height
      setContainerHeight(height);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  if (containerHeight === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
      <div className="flex flex-row space-x-4"> {/* Flex container for images */}
        {images.map((image, index) => {
          const aspectRatio = image.aspectRatio || 1; // Fallback to 1:1 if aspectRatio is missing
          const imgWidth = containerHeight * aspectRatio; // Calculate width based on aspect ratio and fixed height

          return (
            <div key={index} className="relative flex-shrink-0">
              {/* Clickable Image */}
              <div
                style={{
                  width: `${imgWidth}px`, // Set width to the calculated width
                  height: `${containerHeight}px`, // Fixed height
                }}
                onClick={() => setOverlayVisible((prev) => !prev)} // Toggle overlay visibility
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={image.alt || title}
                  layout="fill"
                  className="object-cover border-[#060b18] border-2"
                  loading="lazy" // Ensure lazy loading
                />
              </div>

              {/* Overlay for Title */}
              {isOverlayVisible && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-[#091129] bg-opacity-70 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling up
                    setOverlayVisible(false); // Close overlay
                  }}
                >
                  <Link href={`/posts/${slug}`}>
                    <h1 className="text-white uppercase text-2xl lg:text-3xl text-center font-thin">
                      {title}
                    </h1>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileScroll;
