import { useState } from "react";
import { cn } from "@/lib/utils";

interface Color {
  name: string;
  value: string;
  bgClass: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  className?: string;
}

const ColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
  className,
}: ColorSelectorProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-900">COLOR:</label>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all duration-200",
              color.bgClass,
              selectedColor === color.value
                ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                : "border-gray-300 hover:border-gray-400",
            )}
            aria-label={`Select ${color.name} color`}
            data-testid={`product-color-${color.value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
