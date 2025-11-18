import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { SECTIONS } from './constants';
import { useSwipe } from './hooks/useSwipe';
import { BlobCard } from './components/BlobCard';
import { Navigation } from './components/Navigation';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { ColorPicker, ColorOverride } from './components/ColorPicker';
import { CharacterSelector } from './components/CharacterSelector';
import { SectionData } from './types';

if (typeof window !== "undefined") {
    gsap.config({ nullTargetWarn: false });
}

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visualSection, setVisualSection] = useState<SectionData>(SECTIONS[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [blobColors, setBlobColors] = useState<ColorOverride | null>(null);
  const isInitialMount = useRef(true);
  const prevIndexRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleNavigation = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % SECTIONS.length;
      } else {
        return (prev - 1 + SECTIONS.length) % SECTIONS.length;
      }
    });
  }, [isAnimating]);

  const handleCharacterSelect = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    setActiveIndex(index);
  }, [isAnimating, activeIndex]);

  const swipeHandlers = useSwipe({ 
    onSwipedLeft: () => handleNavigation('next'), 
    onSwipedRight: () => handleNavigation('prev') 
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      gsap.set('#blob-flipper', { rotationY: 0, rotationZ: 0, scale: 1, x: 0, y: 0 }); // Ensure initial state
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
      return;
    }

    setIsAnimating(true);
    
    let direction: 'next' | 'prev' = 'next';
    const prevIndex = prevIndexRef.current;
    if (activeIndex === (prevIndex - 1 + SECTIONS.length) % SECTIONS.length) {
        direction = 'prev';
    } else if (activeIndex === prevIndex) {
        setIsAnimating(false);
        return;
    }

    const outRotation = direction === 'next' ? -90 : 90;
    const inRotation = direction === 'next' ? 90 : -90;
    const outX = direction === 'next' ? -150 : 150;
    const inX = direction === 'next' ? 150 : -150;
    const outZRot = direction === 'next' ? -10 : 10;
    const inZRot = direction === 'next' ? 10 : -10;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        prevIndexRef.current = activeIndex;
      }
    });

    // Animate OUT
    tl.to('#blob-flipper', {
      rotationY: outRotation,
      rotationZ: outZRot,
      y: 50,
      scale: 0.7,
      x: outX,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => {
        setVisualSection(SECTIONS[activeIndex]);
        gsap.set('#blob-flipper', {
          rotationY: inRotation,
          rotationZ: inZRot,
          y: -50,
          scale: 0.7,
          x: inX,
          opacity: 0,
        });
      }
    }, 0)
    .to(headingRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    }, 0);
    
    // Animate IN
    tl.to('#blob-flipper', {
      rotationY: 0,
      rotationZ: 0,
      y: 0,
      scale: 1,
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.75)',
    })
    .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
    }, "-=0.6");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const { bgColor, color, image, textColor, title, svgBlob, colorValue } = visualSection;
  const fillClass = color.replace('bg-', 'fill-');

  return (
    <main
      {...swipeHandlers}
      className={`relative w-screen h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${bgColor}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <BackgroundBlobs activeSection={visualSection} overrideColors={blobColors} />

        {/* Left Side Text */}
        <div className="absolute left-8 md:left-16 z-10 max-w-xs">
            <h1 ref={headingRef} className={`text-5xl md:text-7xl font-extrabold ${textColor} transition-colors duration-500 drop-shadow-md`}>
                {title}
            </h1>
        </div>

        {/* Center Image - Bigger */}
        <div className="z-10">
            <BlobCard colorClass={fillClass} image={image} svgBlob={svgBlob} colorValue={colorValue} />
        </div>

        {/* Right Side Character Selector */}
        <div className="absolute right-8 md:right-16 z-10">
            <CharacterSelector 
              sections={SECTIONS}
              activeIndex={activeIndex}
              onSelect={handleCharacterSelect}
              currentTextColor={textColor}
            />
        </div>

        <Navigation 
            onNext={() => handleNavigation('next')} 
            onPrev={() => handleNavigation('prev')} 
            color={textColor} 
        />
        <ColorPicker onColorChange={setBlobColors} />
    </main>
  );
};

export default App;
