import React from 'react';
import { SectionData } from '../types';

interface CharacterSelectorProps {
  sections: SectionData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  currentTextColor: string;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({ 
  sections, 
  activeIndex, 
  onSelect,
  currentTextColor 
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className={`text-sm md:text-base ${currentTextColor} opacity-70 font-semibold mb-2`}>
        Choose Character
      </p>
      <div className="flex flex-col gap-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSelect(index)}
            className={`
              px-4 py-2 rounded-lg text-sm md:text-base font-semibold
              transition-all duration-300 text-left
              ${activeIndex === index 
                ? `${section.bgColor} ${section.textColor} scale-105 shadow-lg` 
                : `bg-white/20 backdrop-blur-sm ${currentTextColor} hover:bg-white/30 hover:scale-102`
              }
            `}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
};


