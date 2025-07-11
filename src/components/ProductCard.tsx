import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isOutOfStock?: boolean;
  defaultSize?: string;
  defaultColor?: string;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  isOutOfStock = false,
  defaultSize = "XS", // First size option
  defaultColor = "light-gray", // First color option
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product detail
    addItem({
      id,
      name,
      price,
      image,
      size: defaultSize,
      color: defaultColor,
    });
  };

  /* Convert product name to kebab-case for data-testid */
  const kebabCaseName = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={cn("group relative bg-white cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      data-testid={`product-${kebabCaseName}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
            <span className="text-gray-500 font-medium text-sm tracking-wide">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Add to Cart Button - appears on hover */}
        {!isOutOfStock && isHovered && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleQuickAdd}
              className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all duration-200 shadow-lg"
              data-testid='cart-btn'
            >  
            <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-2">
        <h3 className="text-gray-900 font-normal text-base mb-1">{name}</h3>
        <p className="text-gray-900 font-normal text-base">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
