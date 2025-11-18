import React from 'react';

interface NavigationProps {
  onNext: () => void;
  onPrev: () => void;
  color: string;
}

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={`w-6 h-6 md:w-8 md:h-8 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);


export const Navigation: React.FC<NavigationProps> = ({ onNext, onPrev, color }) => {
  const buttonClasses = `absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 z-20`;
  
  return (
    <>
      <button
        onClick={onPrev}
        aria-label="Previous item"
        className={`${buttonClasses} left-4 md:left-10`}
      >
        <ArrowIcon className={`transform rotate-180 ${color}`} />
      </button>
      <button
        onClick={onNext}
        aria-label="Next item"
        className={`${buttonClasses} right-4 md:right-10`}
      >
        <ArrowIcon className={color} />
      </button>
    </>
  );
};
