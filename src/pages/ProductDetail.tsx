import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import ProductInfo from "@/components/ProductInfo";

// Mock product data - in a real app this would come from an API
const productData = {
  id: "1",
  name: "Running Shorts",
  price: 50.0,
  description:
    "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.",
  images: [
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
  ],
  sizes: ["XS", "S", "M", "L"],
  colors: [
    { name: "Light Gray", value: "light-gray", bgClass: "bg-gray-200" },
    { name: "Black", value: "black", bgClass: "bg-black" },
    { name: "Green", value: "green", bgClass: "bg-brand-green" },
  ],
  isOutOfStock: false, // Set to true to test out-of-stock functionality
  defaultSize: "XS", // First size option
  defaultColor: "light-gray",
};

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Image Gallery - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ImageGallery images={productData.images} alt={productData.name} />
          </div>

          {/* Product Info - spans 1 column */}
          <div className="lg:col-span-1">
            <ProductInfo
              id={productData.id}
              name={productData.name}
              price={productData.price}
              description={productData.description}
              sizes={productData.sizes}
              colors={productData.colors}
              image={productData.images[0]}
              isOutOfStock={productData.isOutOfStock}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
