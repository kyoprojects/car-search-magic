
import { useState, useRef, useEffect } from 'react';
import { type CarBrand, type CarModel } from '@/data/cars';
import { CarBrandCard } from './CarBrandCard';
import { CarModelCard } from './CarModelCard';
import { Search, ArrowDown, ArrowUp, CornerDownLeft } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fetchCarBrands, fetchCarModels } from '@/services/carService';

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal is always open by default
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [models, setModels] = useState<CarModel[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(search.toLowerCase()) || 
    model.brand.toLowerCase().includes(search.toLowerCase())
  );

  const allItems = [...filteredBrands, ...filteredModels];

  // Function to send postMessage to parent window
  const sendSelectedCarToParent = (item: CarBrand | CarModel) => {
    // Determine if it's a brand or model by checking for properties specific to models
    const isModel = 'year' in item;
    
    try {
      window.parent.postMessage({
        type: 'selectCar',
        data: item
      }, '*'); // Using * for now, can be restricted to specific origins later
      
      console.log(`Sent ${isModel ? 'model' : 'brand'} data to parent:`, item);
    } catch (error) {
      console.error('Error sending postMessage:', error);
    }
  };

  // Handle selection of an item (either by click or enter key)
  const handleSelection = (item: CarBrand | CarModel) => {
    sendSelectedCarToParent(item);
  };

  // Fetch data from Supabase
  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const [brandsData, modelsData] = await Promise.all([
            fetchCarBrands(),
            fetchCarModels()
          ]);
          
          setBrands(brandsData);
          setModels(modelsData);
        } catch (error) {
          console.error('Error loading car data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex(prev => Math.min(allItems.length - 1, prev + 1));
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected) {
          handleSelection(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allItems, selectedIndex]);

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-[20vh]'>
      <div className='fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in' />
      <div className='relative w-full max-w-2xl animate-modal-open'>
        <div className='overflow-hidden bg-raycast-background border border-raycast-border rounded-xl shadow-2xl'>
          <div className='flex items-center gap-3 p-3 border-b border-raycast-border'>
            <Search className='w-5 h-5 text-raycast-text-secondary' />
            <input ref={inputRef} type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search cars...' className='w-full bg-transparent text-raycast-text placeholder:text-raycast-text-secondary font-sans text-lg outline-none' />
          </div>
          <div className='max-h-[60vh] overflow-y-auto'>
            {isLoading ? (
              <>
                <div className='p-3'>
                  <h3 className='text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2'>Car Brands</h3>
                  <div className='grid grid-cols-2 gap-2'>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className='bg-raycast-card p-3 rounded-lg flex items-center gap-3'>
                        <Skeleton className='w-8 h-8 rounded-md bg-raycast-accent' />
                        <Skeleton className='h-4 w-24 bg-raycast-accent' />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='p-3'>
                  <h3 className='text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2'>Popular Models</h3>
                  <div className='flex flex-col gap-2'>
                    {[1, 2, 3].map(i => (
                      <div key={i} className='bg-raycast-card p-3 rounded-lg flex items-center gap-3'>
                        <Skeleton className='w-12 h-8 rounded-md bg-raycast-accent' />
                        <div className='flex flex-col gap-2 flex-1'>
                          <Skeleton className='h-4 w-32 bg-raycast-accent' />
                          <Skeleton className='h-3 w-24 bg-raycast-accent' />
                        </div>
                        <div className='flex items-center gap-2'>
                          <Skeleton className='h-4 w-12 bg-raycast-accent' />
                          <Skeleton className='h-6 w-16 rounded-full bg-raycast-accent' />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {filteredBrands.length > 0 && (
                  <div className='p-3'>
                    <h3 className='text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2'>Car Brands</h3>
                    <div className='grid grid-cols-2 gap-2'>
                      {filteredBrands.map((brand, index) => (
                        <CarBrandCard
                          key={brand.id}
                          brand={brand}
                          isSelected={index === selectedIndex}
                          onClick={() => handleSelection(brand)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {filteredModels.length > 0 && (
                  <div className='p-3'>
                    <h3 className='text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2'>Popular Models</h3>
                    <div className='flex flex-col gap-2'>
                      {filteredModels.map((model, index) => (
                        <CarModelCard
                          key={model.id}
                          model={model}
                          isSelected={index + filteredBrands.length === selectedIndex}
                          onClick={() => handleSelection(model)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {filteredBrands.length === 0 && filteredModels.length === 0 && <div className='p-8 text-center text-raycast-text-secondary'>No results found for "{search}"</div>}
              </>
            )}
          </div>

          {/* Footer */}
          <div className='border-t border-raycast-border px-4 py-3 flex justify-between items-center text-xs text-raycast-text-secondary'>
            <div className='flex items-center gap-2'>
              <img src='https://cdn.prod.website-files.com/6506f5c591feec8652f59597/653185e58d938f0b388d7989_star-webclip.png' alt='Logo' className='w-4 h-4' />
              <span className='font-medium'>Korbach Performance Room</span>
            </div>
            <div className='flex items-center gap-3'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='flex items-center gap-1'>
                      <ArrowUp className='w-3 h-3' />
                      <ArrowDown className='w-3 h-3' />
                      <span>to navigate</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use arrow keys to navigate</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='flex items-center gap-1 ml-3'>
                      <CornerDownLeft className='w-3 h-3' />
                      <span>to select</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Press enter to select</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
