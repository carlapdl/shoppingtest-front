import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

// Mock product data matching the design
const products = [
  {
    id: "1",
    name: "Running Short",
    price: 50.0,
    image:
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
    isOutOfStock: false,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
  {
    id: "2",
    name: "Running Short",
    price: 50.0,
    image:
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    isOutOfStock: false,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
  {
    id: "3",
    name: "Running Short",
    price: 50.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isOutOfStock: true,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
  {
    id: "4",
    name: "Running Short",
    price: 50.0,
    image:
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
    isOutOfStock: false,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
  {
    id: "5",
    name: "Running Short",
    price: 50.0,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    isOutOfStock: false,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
  {
    id: "6",
    name: "Running Short",
    price: 50.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isOutOfStock: false,
    defaultSize: "XS", // First size option
    defaultColor: "light-gray", // First color option
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Section Title */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
            Women
          </h1>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />
      </main>
    </div>
  );
};

export default Index;
