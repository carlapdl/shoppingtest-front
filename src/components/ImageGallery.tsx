import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageGallery = ({ images, alt, className }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Thumbnail Images - Scrollable */}
      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto thumbnail-scroll">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "w-16 h-16 border-2 transition-all duration-200 overflow-hidden flex-shrink-0",
              selectedImageIndex === index
                ? "border-gray-900"
                : "border-gray-200 hover:border-gray-300",
            )}
          >
            <img
              src={image}
              alt={`${alt} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Navigation Arrows */}
      <div className="flex-1 relative">
        <div className="aspect-square overflow-hidden bg-gray-50 max-h-96">
          <img
            src={images[selectedImageIndex]}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Previous Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
