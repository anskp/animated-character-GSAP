import React, { useState } from 'react';

interface ColorOption {
  id: string;
  name: string;
  color: string;
  colorValue: string;
  secondaryColor: string;
  secondaryColorValue: string;
}

export type ColorOverride = Omit<ColorOption, 'id' | 'name'>;

const BG_COLORS: ColorOption[] = [
  { id: 'rose', name: 'Rose', color: 'bg-rose-500', colorValue: '#f43f5e', secondaryColor: 'bg-rose-300', secondaryColorValue: '#fda4af' },
  { id: 'sky', name: 'Sky', color: 'bg-sky-500', colorValue: '#0ea5e9', secondaryColor: 'bg-sky-300', secondaryColorValue: '#7dd3fc' },
  { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500', colorValue: '#10b981', secondaryColor: 'bg-emerald-300', secondaryColorValue: '#6ee7b7' },
  { id: 'violet', name: 'Violet', color: 'bg-violet-500', colorValue: '#8b5cf6', secondaryColor: 'bg-violet-300', secondaryColorValue: '#c4b5fd' },
];

interface ColorPickerProps {
  onColorChange: (colors: ColorOverride | null) => void;
}

const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.152-.152.322-.286.5-.398l4.493-2.14a.75.75 0 0 1 .986.986l-2.14 4.493c-.112.178-.246.348-.398.5l-2.88 2.88m-3.75 3.75H12m-1.5-1.5h1.5" />
    </svg>
);

const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001a.75.75 0 0 1 .75.75c0 .414-.336.75-.75.75h-4.992v5.093a.75.75 0 0 1-.75.75s-2.186 0-2.186-.75v-5.093h-4.992a.75.75 0 0 1-.75-.75c0-.414.336.75.75.75h4.992v-2.062a.75.75 0 0 1 .75-.75s2.186 0 2.186.75v2.062Z" />
    </svg>
);


export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonBaseClasses = "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {isOpen && (
            <div className="flex flex-col items-end gap-3 p-3 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl">
                 <button
                    onClick={() => {
                        onColorChange(null);
                        setIsOpen(false);
                    }}
                    aria-label="Reset to default colors"
                    className={`${buttonBaseClasses} bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-600`}
                >
                    <ResetIcon className="w-6 h-6" />
                </button>
                {BG_COLORS.map(c => (
                     <button
                        key={c.id}
                        onClick={() => {
                            onColorChange({ 
                                color: c.color, 
                                secondaryColor: c.secondaryColor,
                                colorValue: c.colorValue,
                                secondaryColorValue: c.secondaryColorValue
                             });
                            setIsOpen(false);
                        }}
                        aria-label={`Set background color to ${c.name}`}
                        className={`${buttonBaseClasses} ${c.color} hover:scale-110 focus:ring-white`}
                    />
                ))}
            </div>
        )}
       
        <button
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? "Close color picker" : "Open color picker"}
            className={`${buttonBaseClasses} bg-white/80 hover:bg-white text-gray-700 focus:ring-gray-500 transform ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        >
           <PaletteIcon className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`} style={{ position: 'absolute' }}/>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-0'}`} style={{ position: 'absolute' }}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
           </svg>
        </button>
    </div>
  );
};
