'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { urlForImage } from '~/sanity/lib/sanity.image';

interface SliderProps {
  images: any[];
}

export default function Slider({ images }: SliderProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <Image
        src={urlForImage(images[currentIndex]).url() }
        alt={`Slider Image ${currentIndex + 1}`}
        fill
        sizes="100vw"
        className="object-cover transition-all duration-500 ease-in-out"
      />
    </div>
  );
}
