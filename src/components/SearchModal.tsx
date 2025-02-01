import { useState, useRef, useEffect } from "react";
import { useKeyboard } from "@/hooks/useKeyboard";
import { carBrands, popularModels, type CarBrand, type CarModel } from "@/data/cars";
import { CarBrandCard } from "./CarBrandCard";
import { CarModelCard } from "./CarModelCard";
import { Search, Command } from "lucide-react";

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredModels = popularModels.filter(
    (model) =>
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.brand.toLowerCase().includes(search.toLowerCase())
  );

  const allItems = [...filteredBrands, ...filteredModels];

  useKeyboard({
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onArrowUp: () => setSelectedIndex((prev) => Math.max(0, prev - 1)),
    onArrowDown: () => setSelectedIndex((prev) => Math.min(allItems.length - 1, prev + 1)),
    onEnter: () => {
      const selected = allItems[selectedIndex];
      console.log("Selected:", selected);
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl animate-modal-open">
        <div className="overflow-hidden bg-raycast-background border border-raycast-border rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 p-3 border-b border-raycast-border">
            <Search className="w-5 h-5 text-raycast-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cars..."
              className="w-full bg-transparent text-raycast-text placeholder:text-raycast-text-secondary font-mono text-lg outline-none"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs rounded font-mono bg-raycast-card text-raycast-text-secondary">
              <Command className="w-3 h-3" />
              K
            </kbd>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredBrands.length > 0 && (
              <div className="p-3">
                <h3 className="text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2">
                  Car Brands
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {filteredBrands.map((brand, index) => (
                    <CarBrandCard
                      key={brand.id}
                      brand={brand}
                      isSelected={index === selectedIndex}
                      onClick={() => {
                        console.log("Selected brand:", brand);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {filteredModels.length > 0 && (
              <div className="p-3">
                <h3 className="text-raycast-text-secondary text-xs font-medium uppercase tracking-wider px-3 mb-2">
                  Popular Models
                </h3>
                <div className="flex flex-col gap-2">
                  {filteredModels.map((model, index) => (
                    <CarModelCard
                      key={model.id}
                      model={model}
                      isSelected={index + filteredBrands.length === selectedIndex}
                      onClick={() => {
                        console.log("Selected model:", model);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {filteredBrands.length === 0 && filteredModels.length === 0 && (
              <div className="p-8 text-center text-raycast-text-secondary">
                No results found for "{search}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};