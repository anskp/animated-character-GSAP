import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SectionData } from '../types';
import { ColorOverride } from './ColorPicker';

interface BackgroundBlobsProps {
  activeSection: SectionData;
  overrideColors?: ColorOverride | null;
}

export const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ activeSection, overrideColors }) => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial movement animation for the background blobs
    gsap.to(blob1Ref.current, {
      x: 'random(-5vw, 5vw)',
      y: 'random(-5vh, 5vh)',
      scale: 'random(0.8, 1.2)',
      rotation: 'random(-15, 15)',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to(blob2Ref.current, {
      x: 'random(-8vw, 8vw)',
      y: 'random(-8vh, 8vh)',
      scale: 'random(0.9, 1.1)',
      rotation: 'random(-20, 20)',
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const { colorValue, secondaryColorValue, svgBlob } = activeSection;
  const targetColor1 = overrideColors ? overrideColors.secondaryColorValue : secondaryColorValue;
  const targetColor2 = overrideColors ? overrideColors.colorValue : colorValue;

  useEffect(() => {
    gsap.to(blob1Ref.current?.querySelector('path'), {
      fill: targetColor1,
      duration: 1,
      ease: 'power2.inOut',
    });
    gsap.to(blob2Ref.current?.querySelector('path'), {
      fill: targetColor2,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, [targetColor1, targetColor2]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div 
        ref={blob1Ref} 
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-30"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill={targetColor1} d={svgBlob} transform="translate(100 100)" />
        </svg>
      </div>
      <div 
        ref={blob2Ref} 
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-25"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill={targetColor2} d={svgBlob} transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};
