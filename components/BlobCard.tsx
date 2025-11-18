import React from 'react';
import { gsap } from 'gsap';

interface BlobCardProps {
  image: string;
  colorClass: string;
  svgBlob: string;
  colorValue?: string;
}

export const BlobCard: React.FC<BlobCardProps> = ({ image, colorClass, svgBlob, colorValue }) => {
  const handleMouseEnter = () => {
    gsap.to('#blob-flipper', {
      scale: 1.05,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to('#blob-flipper', {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.75)',
    });
  };

  return (
    <div
      id="blob-card"
      className="relative w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div id="blob-flipper" className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Large SVG Blob Background */}
        <svg
          className="absolute inset-0 w-full h-full drop-shadow-2xl opacity-60"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={colorValue ? '' : `${colorClass} transition-colors duration-500`}
            style={colorValue ? { fill: colorValue, transition: 'fill 0.5s ease' } : undefined}
            d={svgBlob}
            transform="translate(100 100)"
          />
        </svg>

        {/* Character Image - Full Size in Front */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={image}
            alt="Character"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};