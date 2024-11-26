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

const ImageGallery = ({ images, layout, slug, title }: ImageGalleryProps) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }[]>([]);

  const getHeightByLayout = (width: number, layout: string) => {
    switch (layout) {
      case 'portrait':
        return width * (4 / 3); // 4:3 aspect ratio
      case 'landscape':
        return width * (9 / 12);
      case 'panorama':
        return width * (9 / 18); // 16:9 aspect ratio
      case 'square':
      default:
        return width; // 1:1 aspect ratio
    }
  };

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth - 150; // Space for padding/margins
      const numberOfImages = images.length;

      // Calculate precise width per image by dividing container width evenly
      const imageWidth = windowWidth / numberOfImages;

      const newDimensions = images.map(() => {
        const width = imageWidth; // Set precise width for each image
        const height = getHeightByLayout(width, layout); // Calculate height
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
      <div className="flex justify-center space-x-5 mb-4">
        {images.map((image, index) => (
          <Link key={index} href={`/posts/${slug}`}>
            <div
              className="relative"
              style={{
                width: `${dimensions[index].width}px`, // Precise width
                height: `${dimensions[index].height}px`, // Calculated height
              }}
            >
              <Image
                src={urlForImage(image).url() as string}
                alt={image.alt || title}
                layout="fill"
                className="object-cover border-[#060b18] border-2"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Title Section */}
      <div className="-mt-4 mb-12 w-[95vw] mx-auto bg-gradient-to-t from-transparent via-black/30 to-black/50">
        <Link href={`/posts/${slug}`}>
          <h1 className="text-white uppercase text-3xl lg:text-4xl text-center font-thin">
            {title}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default ImageGallery;
