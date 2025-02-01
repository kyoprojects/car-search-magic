import { CarModel } from "@/data/cars";
import { Command } from "lucide-react";

interface CarModelCardProps {
  model: CarModel;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CarModelCard = ({ model, isSelected, onClick }: CarModelCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? "bg-raycast-accent" : "bg-raycast-card hover:bg-raycast-hover"
      }`}
    >
      <div className="flex items-center gap-3">
        <img 
          src={model.thumbnail} 
          alt={model.name} 
          className="w-12 h-8 object-cover rounded bg-raycast-hover"
        />
        <div className="flex flex-col">
          <span className="text-raycast-text font-medium">{model.name}</span>
          <span className="text-raycast-text-secondary text-sm">{model.brand}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-raycast-text-secondary text-sm">{model.year}</span>
          <span className="text-raycast-text-secondary text-xs px-2 py-1 rounded-full bg-raycast-card">
            {model.type}
          </span>
        </div>
        <kbd className={`hidden group-hover:flex items-center px-2 py-1 text-xs rounded font-mono ${
          isSelected ? "bg-raycast-accent/50" : "bg-raycast-card"
        }`}>
          <Command className="w-3 h-3 mr-1" />
          Enter
        </kbd>
      </div>
    </div>
  );
};