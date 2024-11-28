'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

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
    <div className="relative w-full h-full max-w-full max-h-full">
      {/* Background Image */}
      <Image
        src={images[currentIndex].asset.url}
        alt={`Slider Image ${currentIndex + 1}`}
        fill
        sizes="100vw"
        className="object-cover object-center w-full h-full transition-all duration-500 ease-in-out"
      />
    </div>
  );
}
