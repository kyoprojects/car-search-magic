import { CarModel } from '@/data/cars';
import { Command } from 'lucide-react';
import { useState } from 'react';

interface CarModelCardProps {
  model: CarModel;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CarModelCard = ({ model, isSelected, onClick }: CarModelCardProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = `https://placehold.co/300x200?text=${encodeURIComponent(model.name)}`;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div onClick={onClick} className={`group flex items-center p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-raycast-accent' : 'bg-raycast-card hover:bg-raycast-hover'}`}>
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        <div className='w-12 h-8 flex-shrink-0 rounded bg-raycast-hover overflow-hidden'>
          <div className='w-full h-full p-0.5'>
            <img src={imageError ? fallbackImage : model.thumbnail} alt={model.name} className='w-full h-full object-cover rounded-[2px]' onError={handleImageError} />
          </div>
        </div>
        <div className='flex flex-col flex-1 min-w-0'>
          <span className='text-raycast-text font-medium truncate'>{model.name}</span>
        </div>
      </div>
      <div className='flex items-center gap-2 flex-shrink-0 ml-2'>
        {!isNaN(model.year) && <span className='text-raycast-text-secondary text-sm whitespace-nowrap'>{model.year}</span>}
        <span className='text-raycast-text-secondary text-xs px-2 py-1 rounded-full bg-[#444] whitespace-nowrap'>{model.brand}</span>
      </div>
    </div>
  );
};
