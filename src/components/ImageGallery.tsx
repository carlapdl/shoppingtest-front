import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageGallery = ({ images, alt, className }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Thumbnail Images */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "w-16 h-16 border-2 transition-all duration-200 overflow-hidden",
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

      {/* Main Image */}
      <div className="flex-1 aspect-square overflow-hidden bg-gray-50">
        <img
          src={images[selectedImageIndex]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
