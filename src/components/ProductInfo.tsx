import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

interface ProductInfoProps {
  id?: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  colors: Array<{ name: string; value: string; bgClass: string }>;
  image?: string;
  isOutOfStock?: boolean;
  className?: string;
}

const ProductInfo = ({
  id = "1",
  name,
  price,
  description,
  sizes,
  colors,
  image = "",
  isOutOfStock = true,
  className,
}: ProductInfoProps) => {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[1] || sizes[0]); // Default to "S" or first size
  const [selectedColor, setSelectedColor] = useState(
    colors[2]?.value || colors[0]?.value,
  ); // Default to green or first color

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: selectedColor,
    });
    openCart();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Product Title */}
      <div>
        <h1 className="text-2xl font-normal text-gray-900">{name}</h1>
      </div>

      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      {/* Color Selector */}
      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          PRICE:
        </label>
        <div className="text-2xl font-normal text-gray-900" 
          data-testid={`product-prize-${price}`}
        >
          ${price.toFixed(2)}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full py-3 px-6 font-medium text-sm tracking-wide transition-colors duration-200",
          isOutOfStock
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-brand-green text-white hover:bg-opacity-90",
        )}
        data-testid='add-to-cart'
      >
        {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
      </button>

      {/* Product Description */}
      <div className="pt-4">
        <p className="text-sm text-gray-600 leading-relaxed" data-testid='product-description'>{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
