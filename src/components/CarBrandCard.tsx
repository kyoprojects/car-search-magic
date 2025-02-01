import { CarBrand } from "@/data/cars";

interface CarBrandCardProps {
  brand: CarBrand;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CarBrandCard = ({ brand, isSelected, onClick }: CarBrandCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-raycast-accent" : "bg-raycast-card hover:bg-raycast-hover"
      }`}
    >
      <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
      <span className="text-raycast-text font-medium">{brand.name}</span>
    </div>
  );
};