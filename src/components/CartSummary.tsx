import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface CartSummaryProps {
  className?: string;
}

const CartSummary = ({ className }: CartSummaryProps) => {
  const { getTotal } = useCart();

  return (
    <div className={cn("space-y-4 pt-6 border-t border-gray-200", className)}>
      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium text-gray-900">Total</span>
        <span className="text-lg font-medium text-gray-900" data-testid="cart-total">
          ${getTotal().toFixed(2)}
        </span>
      </div>

      {/* Place Order Button */}
      <button className="w-full bg-brand-green text-white py-3 px-6 font-medium text-sm tracking-wide hover:bg-opacity-90 transition-colors duration-200">
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartSummary;
