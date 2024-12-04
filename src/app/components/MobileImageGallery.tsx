'use client'

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

  const getHeightByLayout = (width: number, layout: string) => {
    switch (layout) {
      case 'portrait':
        return width * (4 / 3); // 4:3 aspect ratio for portrait
      case 'landscape':
        return width * (9 / 12);
      case 'panorama':
        return width * (9 / 18); // 16:9 aspect ratio for landscape
      case 'square':
      default:
        return width; // 1:1 aspect ratio for square or default
    }
  };

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
    <div className="w-full">

      {/* Image Gallery */}
      <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
        <div className="flex flex-row ml-4 space-x-8"> {/* Flex container for images */} 
          {images.map((image, index) => (
            <Link key={index} href={`/posts/${slug}`} className="relative flex-shrink-0">
              <div
                style={{
                  width: `${dimensions[index].width}px`, // Set width to the calculated width
                  height: `${dimensions[index].height}px`, // Set height to the calculated height
                }}
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={image.alt || title}
                  fill
                  sizes="80vw"
                  className="object-cover shadow-lg shadow-gray-500 border-white border-[1.5px]"
                  loading="lazy" // Ensure lazy loading
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Title Section with custom middle line */}
      <div className="relative text-center mx-4 mt-2 mb-6">
        <Link href={`/posts/${slug}`}>
          <div className="relative">
            {/* White Line Spanning Full Width */}
            <span className="absolute left-0 right-0 bottom-1/2 transform  bg-white h-[1px] z-5"></span>

            {/* Title with Grey Background covering only text width */}
            <h1 className="text-white upper  text-2xl lg:text-3xl font-light inline-block relative z-6 px-1  bg-[#4b5563]">
              {title}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileImageGallery;

