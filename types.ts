export interface SectionData {
  id: number;
  title: string;
  color: string; // Tailwind class e.g. 'bg-red-500'
  colorValue: string; // Hex value e.g. '#ef4444'
  bgColor: string;
  textColor: string;
  secondaryColor: string; // Tailwind class e.g. 'bg-red-300'
  secondaryColorValue: string; // Hex value e.g. '#fca5a5'
  image: string;
  svgBlob: string; // SVG path data for blob shape
}
