import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isOutOfStock?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  isOutOfStock = false,
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={cn("group relative bg-white cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
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
            <button className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all duration-200 shadow-lg">
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
