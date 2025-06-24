import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isOutOfStock?: boolean;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid = ({ products, className }: ProductGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          isOutOfStock={product.isOutOfStock}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
