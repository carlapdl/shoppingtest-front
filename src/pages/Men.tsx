import Header from "@/components/Header";

const Men = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Section Title */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
            Men
          </h1>
        </div>

        {/* Placeholder Content */}
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Men's products coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default Men;
