import { CarBrand } from '@/data/cars';
import { Command } from 'lucide-react';

interface CarBrandCardProps {
  brand: CarBrand;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CarBrandCard = ({ brand, isSelected, onClick }: CarBrandCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative flex items-center p-2 rounded-lg cursor-pointer transition-all min-h-[40px] ${isSelected ? 'bg-raycast-accent' : 'bg-raycast-card hover:bg-raycast-hover'}`}>
      <div className='flex items-center gap-2 flex-1 min-w-0'>
        <img src={brand.logo} alt={brand.name} className='w-5 h-5 object-contain flex-shrink-0' />
        <span className='text-raycast-text font-medium truncate'>{brand.name}</span>
      </div>
      <kbd className={`hidden group-hover:flex items-center px-2 py-1 text-xs rounded font-mono text-gray-400 absolute right-2 ${isSelected ? 'bg-raycast-selected/50' : 'bg-raycast-card'}`}>
        <Command className='w-3 h-3 mr-1 text-gray-400' />
        Select
      </kbd>
    </div>
  );
};
