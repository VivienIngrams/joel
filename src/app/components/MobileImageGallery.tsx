'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { urlForImage } from '~/sanity/lib/sanity.image';

interface ImageGalleryProps {
  mainImages: any[];
  layout: string;
  slug: string;
  title: string;
}

const MobileImageGallery = ({ mainImages, layout, slug, title }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }[]>([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false); // State to manage overlay visibility

  const getHeightByLayout = (width: number, layout: string) => {
    switch (layout) {
      case 'portrait':
        return width * (4 / 3); // 4:3 aspect ratio for portrait
      case 'landscape':
        return width * (9 / 16); // 16:9 aspect ratio for landscape
      case 'square':
      default:
        return width; // 1:1 aspect ratio for square or default
    }
  };

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth * 0.8; // Set width to 80vw
      const newDimensions = mainImages.map(() => {
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
  }, [mainImages, layout]);

  if (dimensions.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
      <div className="flex flex-row"> {/* Flex container for images */}
        {mainImages.map((image, index) => (
          <div key={index} className="relative flex-shrink-0">
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
                className="object-cover border-black border-2"
                loading="lazy" // Ensure lazy loading
              />
            </div>

            {/* Overlay for Title */}
            {isOverlayVisible && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-70 transition-opacity duration-300"
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
        ))}
      </div>
    </div>
  );
};

export default MobileImageGallery;
