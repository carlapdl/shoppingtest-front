import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

interface CartOverlayProps {
  className?: string;
}

/**
 * itemCountText
 * - number of items to be displayed in My Cart
 * - 1 = item
 * - more than 1 = items
 * 
 * @param itemCount 
 * @returns 
 */
const itemCountText = (itemCount) => {
    const itemText = itemCount === 1 ? ' item' : ' items';
    return itemCount + itemText;
};

const CartOverlay = ({ className }: CartOverlayProps) => {
  const { isOpen, items, getItemCount, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay - positioned below header */}
      <div
        className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-40 z-40"
        onClick={closeCart}
      />

      {/* Cart Sidebar - positioned below header */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col",
          className,
        )}
      >
        
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-medium text-gray-900">My Bag</h2>
            <p className="text-sm text-gray-600">
                {itemCountText(getItemCount())} 
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.size}-${item.color}`}
                  item={item}
                  className={
                    index !== items.length - 1
                      ? "border-b border-gray-100 pb-4"
                      : ""
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="p-6">
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default CartOverlay;
