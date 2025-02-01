import { CarModel } from "@/data/cars";

interface CarModelCardProps {
  model: CarModel;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CarModelCard = ({ model, isSelected, onClick }: CarModelCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-raycast-accent" : "bg-raycast-card hover:bg-raycast-hover"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-raycast-text font-medium">{model.name}</span>
        <span className="text-raycast-text-secondary text-sm">{model.brand}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-raycast-text-secondary text-sm">{model.year}</span>
        <span className="text-raycast-text-secondary text-sm px-2 py-1 rounded-full bg-raycast-card">
          {model.type}
        </span>
      </div>
    </div>
  );
};