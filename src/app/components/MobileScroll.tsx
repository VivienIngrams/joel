'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { urlForImage } from '~/sanity/lib/sanity.image';

interface ImageGalleryProps {
  images: any[]; // Expecting images with `dimensions` including `aspectRatio`
  title: string;
}

const MobileScroll = ({ images,  title }: ImageGalleryProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track selected image

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

  const closeModal = () => {
    setOverlayVisible(false);
    setSelectedImage(null);
  };

  return (
    <div className="w-full overflow-x-auto"> {/* Enable horizontal scrolling */}
      <div className="flex flex-row space-x-4"> {/* Flex container for images */}
        {images.map((image, index) => {
          const aspectRatio = image.aspectRatio || 1; // Fallback to 1:1 if aspectRatio is missing
          const imgWidth = containerHeight * aspectRatio; // Calculate width based on aspect ratio and fixed height

          return (
            <div key={index} className="relative flex-shrink-0">
              {/* Clickable Image */}
              <div className="relative flex-shrink-0"
                style={{
                  width: `${imgWidth}px`, // Set width to the calculated width
                  height: `${containerHeight}px`, // Fixed height
                }}
                onClick={() => {
                  setSelectedImage(urlForImage(image).url() as string);
                  setOverlayVisible(true); // Open modal
                }}
              >
                <Image
                  src={urlForImage(image).url() as string}
                  alt={title}
                  sizes="80vw"
                  fill
                  className="object-cover shadow-lg shadow-gray-500 border-white border-[1.5px]"
                  loading="lazy" // Ensure lazy loading
                />
              </div>
            </div>
          );
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
  );
};

export default MobileScroll;
