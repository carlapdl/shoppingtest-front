import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, CartItem as CartItemType } from "@/contexts/CartContext";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

const sizes = ["XS", "S", "M", "L"];
const colors = [
  { name: "Light Gray", value: "light-gray", bgClass: "bg-gray-200" },
  { name: "Black", value: "black", bgClass: "bg-black" },
  { name: "Green", value: "green", bgClass: "bg-brand-green" },
  { name: "Orange", value: "orange", bgClass: "bg-orange-500" },
];

const CartItem = ({ item, className }: CartItemProps) => {
  const { updateQuantity, updateItemDetails } = useCart();
  const [localSize, setLocalSize] = useState(item.size);
  const [localColor, setLocalColor] = useState(item.color);

  const handleSizeChange = (newSize: string) => {
    updateItemDetails(item.id, item.size, item.color, newSize, localColor);
    setLocalSize(newSize);
  };

  const handleColorChange = (newColor: string) => {
    updateItemDetails(item.id, item.size, item.color, localSize, newColor);
    setLocalColor(newColor);
  };

  const handleQuantityDecrease = () => {
    updateQuantity(item.id, item.size, item.color, item.quantity - 1);
  };

  const handleQuantityIncrease = () => {
    updateQuantity(item.id, item.size, item.color, item.quantity + 1);
  };

  return (
    <div className={cn("flex gap-4 py-4", className)}>
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-3">
        {/* Product Name and Price */}
        <div className="flex justify-between items-start">
          <h3 className="font-normal text-gray-900">{item.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-900">${item.price.toFixed(2)}</span>
            <div className="flex items-center border border-gray-300">
              <button
                onClick={handleQuantityDecrease}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 h-6 flex items-center justify-center text-sm border-x border-gray-300">
                {item.quantity}
              </span>
              <button
                onClick={handleQuantityIncrease}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Size Selector - Compact Version */}
        <div className="space-y-2" data-testid="cart-item-attribute-size">
          <label className="block text-xs font-medium text-gray-900">
            Size:
          </label>
          <div className="flex gap-1">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                data-testid={`cart-item-attribute-size-${size.toLowerCase()}${localSize === size ? "-selected" : ""}`}
                className={cn(
                  "w-6 h-6 text-xs border transition-colors duration-200",
                  localSize === size
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-900 hover:border-gray-400",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector - Compact Version */}
        <div className="space-y-2" data-testid="cart-item-attribute-color">
          <label className="block text-xs font-medium text-gray-900">
            Color:
          </label>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                data-testid={`cart-item-attribute-color-${color.value}${localColor === color.value ? "-selected" : ""}`}
                className={cn(
                  "w-5 h-5 rounded-full border transition-all duration-200",
                  color.bgClass,
                  localColor === color.value
                    ? "border-gray-900 ring-1 ring-gray-900 ring-offset-1"
                    : "border-gray-300 hover:border-gray-400",
                )}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
