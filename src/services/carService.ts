import { supabase } from '@/integrations/supabase/client';
import { CarBrand, CarModel } from '@/data/cars';

export const fetchCarBrands = async (): Promise<CarBrand[]> => {
  try {
    // Get distinct brands from cars table
    const { data, error } = await supabase.from('cars').select('brand, make').not('brand', 'is', null).order('brand');

    if (error) {
      console.error('Error fetching car brands:', error);
      throw new Error(error.message);
    }

    // Transform the data to match our CarBrand interface
    const uniqueBrands = Array.from(new Set(data.map(car => car.brand))).map(brandName => {
      // Find the first car with this brand to get the make
      const car = data.find(c => c.brand === brandName);
      return {
        id: brandName?.toLowerCase() || '',
        name: brandName || '',
        // Using a placeholder logo since we don't have logos in the database
        logo: `https://placehold.co/100x100?text=${brandName?.charAt(0) || 'X'}`
      };
    });

    return uniqueBrands;
  } catch (error) {
    console.error('Error in fetchCarBrands:', error);
    return [];
  }
};

export const fetchCarModels = async (): Promise<CarModel[]> => {
  try {
    const { data, error } = await supabase.from('cars').select('*').order('name');

    if (error) {
      console.error('Error fetching car models:', error);
      throw new Error(error.message);
    }

    // Transform the data to match our CarModel interface
    return data.map(car => ({
      id: car.id.toString(),
      name: car.name || '',
      brand: car.brand || '',
      year: parseInt(car.year || '2023'),
      type: 'Unknown', // We don't have type in the database, so using a default
      thumbnail: car.thumbnail || 'https://placehold.co/300x200?text=No+Image',
      model: car.model
    }));
  } catch (error) {
    console.error('Error in fetchCarModels:', error);
    return [];
  }
};
