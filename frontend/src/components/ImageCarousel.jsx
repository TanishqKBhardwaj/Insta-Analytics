import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative  w-[40%] shadow-xl/30 shadow-pink-400 rounded-2xl">
      {/* Image container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={
       img
      ? `${import.meta.env.VITE_BACKEND_URL}/proxy-image?url=${encodeURIComponent(img)}`
      : "https://id-preview--e9fc7605-4fba-425e-a1e9-394971741dc0.lovable.app/assets/influencer-profile-CWMvux0e.jpg"
  }
              alt={`slide-${index}`}
              className="w-full flex-shrink-0 object-cover "
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4">
        <button
          onClick={prevSlide}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
         <MoveLeft />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
         <MoveRight/>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
