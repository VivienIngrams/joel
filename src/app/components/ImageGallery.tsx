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

const ImageGallery = ({ mainImages, layout, slug, title }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }[]>([]);

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
      const windowWidth = window.innerWidth -150; 

      const numberOfImages = mainImages.length;
     

      // Calculate width and height for each image

      const imageWidth = Math.floor(windowWidth / numberOfImages); // Width of each image

      const newDimensions = mainImages.map((_, index) => {
        const width = imageWidth; // Each image gets the calculated width
        const height = getHeightByLayout(width, layout); // Get height based on layout
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

  // Ensure dimensions are not empty before rendering
  if (dimensions.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="md:py-8 w-full">
      <div className="relative flex flex-col">
        <div className="flex flex-row justify-center">
          {mainImages.map((image, index) => (
            <Link key={index} href={`/posts/${slug}`}>
              <div
                className="relative px-2"
                style={{
                  width: `${dimensions[index].width}px`,
                  height: `${dimensions[index].height}px`,
                }}
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={image.alt || title}
                  layout="fill"
                  className="object-cover border-black border-2"
                  loading="lazy" // Ensure lazy loading
                />
              </div>
            </Link>
          ))}
        </div>
        {/* Overlay for Title */}
        <Link href={`/posts/${slug}`}>
          <div className="opacity-0 absolute inset-0 hover:opacity-100 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-50 transition-opacity duration-300">
            <h1 className="text-white uppercase text-4xl lg:text-5xl text-center font-thin">
              {title}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ImageGallery;
