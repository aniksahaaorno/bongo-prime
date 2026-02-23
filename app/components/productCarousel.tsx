// "use client";

// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { CardButtons } from "../(public)/shop/components/cardButtons";
// import { ProductFormData } from "@/utils/product";

// const ProductCarousel = ({
//   products,
//   topSelling,
// }: {
//   products: ProductFormData[];
//   topSelling?: string;
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(3);

//   // Responsive visible cards update
//   const updateVisibleCards = () => {
//     const width = window.innerWidth;
//     if (width < 640) setVisibleCards(2);
//     else if (width < 1024) setVisibleCards(3);
//     else setVisibleCards(4);
//   };

//   useEffect(() => {
//     updateVisibleCards();
//     window.addEventListener("resize", updateVisibleCards);
//     return () => window.removeEventListener("resize", updateVisibleCards);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev <= 0 ? Math.max(products.length - visibleCards, 0) : prev - 1,
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev + visibleCards >= products.length ? 0 : prev + 1,
//     );
//   };

//   // If no products, show nothing or placeholder
//   if (!products || products.length === 0) return null;

//   return (
//     <div className="w-full py-12">
//       <div className="max-w-7xl mx-auto">
//         {topSelling ? (
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
//               Top Selling Products
//             </h2>
//             <p className="text-gray-600 text-center mb-10">
//               Check out our latest top selling products and bestsellers.
//             </p>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
//               Featured Products
//             </h2>
//             <p className="text-gray-600 text-center mb-10">
//               Check out our latest products and bestsellers.
//             </p>
//           </div>
//         )}

//         <div className="relative">
//           {/* Carousel Container */}
//           <div className="overflow-hidden rounded-xl">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${
//                   (currentIndex * 100) / visibleCards
//                 }%)`,
//               }}
//             >
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="shrink-0 px-3"
//                   style={{ width: `${100 / visibleCards}%` }}
//                 >
//                   <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
//                     {/* Fixed Aspect Ratio Image */}
//                     <Link href={`/shop/${product.categoryId}/${product.slug}`}>
//                       <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
//                         <img
//                           src={product.thumbnail!}
//                           alt={product.title}
//                           className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
//                         />
//                       </div>

//                       {/* Content - Fixed height & consistent layout */}
//                       <div className="p-5 flex flex-col grow">
//                         <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 mb-3">
//                           {product.title}
//                         </h3>
//                         <p className="text-gray-600 text-sm line-clamp-3 grow">
//                           {product.shortDescription}
//                         </p>
//                       </div>
//                     </Link>
//                     {/* Buttons at bottom */}
//                     <div className="px-2 pb-5 mt-auto">
//                       <CardButtons product={product} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={handlePrev}
//             className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 backdrop-blur"
//             aria-label="Previous"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-800" />
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 backdrop-blur"
//             aria-label="Next"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-800" />
//           </button>

//           {/* Dots Indicator (Optional - for mobile) */}
//           <div className="flex justify-center mt-6 gap-2">
//             {Array.from({
//               length: Math.ceil(products.length / visibleCards),
//             }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentIndex(i * visibleCards)}
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   Math.floor(currentIndex / visibleCards) === i
//                     ? "bg-primary w-8"
//                     : "bg-[#e9dbcd]"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCarousel;

"use client";

import { ProductFormData } from "@/utils/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { SingleProductCard } from "../(public)/shop/components/ProductSingleCard";

const ProductCarousel = ({
  products,
  topSelling,
}: {
  products: ProductFormData[];
  topSelling?: string;
}) => {
  if (!products || products.length === 0) return null;

  const minSlidesForLoop = 5; // You can adjust this number
  const shouldLoop = products.length >= minSlidesForLoop;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {topSelling ? (
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Top Selling Products
            </h2>
            <p className="text-gray-600 text-center">
              Check out our latest top selling products and
              bestsellers.
            </p>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
              Featured Products
            </h2>
            <p className="text-gray-600 text-center">
              Check out our latest products and bestsellers.
            </p>
          </div>
        )}

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={shouldLoop}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            slidesPerView={2}
            spaceBetween={10}
            navigation={{
              nextEl: "#custom-next",
              prevEl: "#custom-prev",
              disabledClass: "opacity-30 cursor-not-allowed",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="h-full pb-8 pt-2">
                  <SingleProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            id="custom-prev"
            className="custom-prev absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 transform rounded-full bg-white hover:bg-gray-50 p-3 shadow-lg transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            id="custom-next"
            className="custom-next absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
            aria-label="Next slide"
          >
            <svg
              className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
