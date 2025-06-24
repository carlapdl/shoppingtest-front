import { useState } from "react";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  className?: string;
}

const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
  className,
}: SizeSelectorProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-900">SIZE:</label>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              "w-10 h-10 text-sm font-medium border transition-colors duration-200",
              selectedSize === size
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-400",
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
