'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { urlForImage } from '~/sanity/lib/sanity.image';

interface ImageGalleryProps {
  images: any[];
  layout: string;
  slug: string;
  title: string;
}

const MobileImageGallery = ({ images, layout, slug, title }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }[]>([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false); // State to manage overlay visibility

  const getHeightByLayout = (width: number, layout: string) => {
    switch (layout) {
      case 'portrait':
        return width * (4 / 3) // 4:3 aspect ratio for portrait
      case 'landscape':
        return width * (9 / 12)
      case 'panorama':
        return width * (9 / 18) // 16:9 aspect ratio for landscape
      case 'square':
      default:
        return width // 1:1 aspect ratio for square or default
    }
  }
  
//  width difers depending on layout, portrait 0.8, landscape 0.95, square 0.7
  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth * 0.8; // Set width to 80vw
      const newDimensions = images.map(() => {
        const width = windowWidth; // Each image will take up 80vw
        const height = getHeightByLayout(width, layout); // Calculate height based on layout
        return { width, height };
      });

      setDimensions(newDimensions);
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, [images, layout]);

  if (dimensions.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
      <div className="flex flex-row space-x-4 pl-4"> {/* Flex container for images */}
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0 ">
            {/* Clickable Image */}
            <div
              style={{
                width: `${dimensions[index].width}px`, // Set width to the calculated width
                height: `${dimensions[index].height}px`, // Set height to the calculated height
              }}
              onClick={() => setOverlayVisible(prev => !prev)} // Toggle overlay visibility
            >
              <Image
                src={urlForImage(image).url() as string}
                alt={image.alt || title}
                layout="fill"
                className="object-cover border-[#060b18]  border-2"
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
                  <h1 className="text-white uppercase underline underline-offset-2 decoration-1 text-2xl lg:text-3xl text-center font-thin">
                    {title}
                  </h1>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileImageGallery;
