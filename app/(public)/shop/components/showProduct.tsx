// "use client";

// import { ProductFormData } from "@/utils/product";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { CardButtons } from "./cardButtons";

// interface GroupedProducts {
//   [categoryName: string]: ProductFormData[];
// }

// const ProductCard = ({ products }: { products: ProductFormData[] }) => {
//   const groupedProducts: GroupedProducts = products.reduce((acc, pro) => {
//     const catName = pro.category;
//     if (!acc[catName]) acc[catName] = [];
//     acc[catName].push(pro);
//     return acc;
//   }, {} as GroupedProducts);

//   return (
//     <div className="w-full space-y-16 py-8 px-3">
//       {Object.entries(groupedProducts).map(
//         ([categoryName, categoryProducts]) => (
//           <CategoryCarousel
//             key={categoryName}
//             categoryName={categoryName}
//             products={categoryProducts}
//           />
//         ),
//       )}
//     </div>
//   );
// };

// // Carousel for each category
// const CategoryCarousel = ({
//   categoryName,
//   products,
// }: {
//   categoryName: string;
//   products: ProductFormData[];
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(4);

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

//   if (products.length === 0) return null;

//   return (
//     <section className="w-full mb-8">
//       <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left">
//         {categoryName}
//       </h2>

//       {/* Carousel */}
//       <div className="relative">
//         <div className="overflow-hidden rounded-xl">
//           <div
//             className="flex transition-transform duration-500 ease-in-out gap-4"
//             style={{
//               transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
//             }}
//           >
//             {products.map((pro) => {
//               const discountedPrice =
//                 pro.discount.type === "percentage"
//                   ? Math.floor(
//                       Number(pro.basePrice) -
//                         (Number(pro.basePrice) * Number(pro.discount.value)) /
//                           100,
//                     )
//                   : Math.max(
//                       Number(pro.basePrice) - Number(pro.discount.value),
//                       0,
//                     );

//               return (
//                 <div
//                   key={pro._id}
//                   className="shrink-0 "
//                   style={{ width: `${100 / visibleCards}%` }}
//                 >
//                   <div className="rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-primary transition-all duration-300 overflow-hidden h-full flex flex-col">
//                     <Link
//                       href={`/shop/${pro.categoryId}/${pro.slug}`}
//                       className="flex flex-col grow"
//                     >
//                       <div className="relative h-30 md:h-50 overflow-hidden bg-linear-to-br from-gray-900 to-gray-700">
//                         <Image
//                           src={
//                             typeof pro.thumbnail === "string"
//                               ? pro.thumbnail
//                               : ""
//                           }
//                           alt={pro.title}
//                           fill
//                           className="object-cover transition-transform duration-500 hover:scale-105"
//                         />
//                       </div>

//                       <div className="p-4 space-y-3 flex flex-col grow">
//                         <h3 className="font-semibold text-base md:text-lg text-gray-900 line-clamp-2">
//                           {pro.title}
//                         </h3>
//                         <p className="text-xs md:text-sm text-gray-600 line-clamp-3 grow">
//                           {pro.shortDescription}
//                         </p>

//                         <div className="flex items-center gap-3">
//                           <span className="text-lg md:text-xl font-bold text-gray-900">
//                             {discountedPrice}৳
//                           </span>
//                           {Number(pro.discount.value) > 0 && (
//                             <span className="text-sm md:text-base text-red-500 line-through">
//                               {pro.basePrice}৳
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </Link>

//                     <div className="px-2 border-t border-gray-100 mt-auto">
//                       <CardButtons product={pro} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Arrows - Desktop/Tablet */}
//         <button
//           onClick={handlePrev}
//           className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg items-center justify-center z-10 hidden md:flex"
//           aria-label="Previous"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-800" />
//         </button>

//         <button
//           onClick={handleNext}
//           className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 md:flex"
//           aria-label="Next"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-800" />
//         </button>

//         {/* Dots - Mobile */}
//         <div className="flex justify-center mt-6 gap-2 md:hidden">
//           {Array.from({
//             length: Math.ceil(products.length / visibleCards),
//           }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentIndex(i * visibleCards)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 Math.floor(currentIndex / visibleCards) === i
//                   ? "bg-primary w-8"
//                   : "bg-gray-300 w-2"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//       {/* <div className="w-full flex justify-center">
//         <div className="max-w-50 border border-primary text-primary text-center mt-2 rounded-lg text-lg cursor-pointer hover:bg-primary font-bold hover:text-white transition py-4 px-4 ">
//           See All Products
//         </div>
//       </div> */}
//     </section>
//   );
// };

// export default ProductCard;

// "use client";

// import React, { useState } from "react";
// import { ShoppingCart, Heart, Eye } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import { handleWhatsApp } from "./handleWhatsApp";
// import ProductVariant from "./ProductVariants";
// import { ProductFormData } from "@/utils/product";

// const ProductCard = ({ product }: { product: ProductFormData}) => {
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
//   const [isBuyNow, setIsBuyNow] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const router = useRouter();

//   const from = "cardButton";

//   const productPrice =
//     product.discount.type === "percentage"
//       ? Math.floor(
//           Number(product.basePrice) -
//             (Number(product.basePrice) * Number(product.discount.value)) / 100,
//         )
//       : Math.max(Number(product.basePrice) - Number(product.discount.value), 0);

//   const { title, slug, thumbnail } = product;

//   const productDetails = {
//     productPrice,
//     title,
//     slug,
//     thumbnail,
//   };

//   const calculatePrice = () => {
//     const base = parseInt(product.basePrice);
//     if (product.discount.type === "flat") {
//       return base - parseInt(product.discount.value);
//     } else if (product.discount.type === "percentage") {
//       return base - (base * parseInt(product.discount.value)) / 100;
//     }
//     return base;
//   };

//   const getDiscountLabel = () => {
//     if (product.discount.type === "flat") {
//       return `-৳${product.discount.value}`;
//     } else if (product.discount.type === "percentage") {
//       return `-${product.discount.value}%`;
//     }
//     return "";
//   };

//   const discountedPrice = calculatePrice();
//   const hasDiscount = parseInt(product.discount.value) > 0;

//   const handleAddToCart = () => {
//     setIsCartModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsCartModalOpen(false);
//   };

//   const handleBuyNow = () => {
//     setIsCartModalOpen(true);
//     setIsBuyNow(true);
//   };

//   const handleViewDetail = () => {
//     router.push(`/shop/${product.categoryId}/${product.slug}`);
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className="group/product bg-white overflow-hidden hover:shadow-lg transition-all duration-300 relative border border-gray-200"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden bg-white">
//         {/* Discount Badge */}
//         {hasDiscount && (
//           <div className="absolute top-3 left-3 z-20">
//             <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1">
//               {getDiscountLabel()}
//             </span>
//           </div>
//         )}

//         {/* Stock Badge */}
//         {product.stockQuantity <= 10 && (
//           <div
//             className={`absolute bottom-3 left-3 z-20 transition-opacity duration-300 ${
//               isHovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1">
//               Only {product.stockQuantity} left
//             </span>
//           </div>
//         )}

//         {/* Quick Action Icons - Vertical Right Side */}
//         <div
//           className={`absolute top-3 right-0 z-20 flex flex-col gap-1 transition-transform duration-300 ${
//             isHovered ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <button
//             onClick={handleViewDetail}
//             className="bg-white text-gray-700 p-2.5 hover:bg-primary hover:text-white transition-colors border-l border-t border-b border-gray-200"
//             title="Quick View"
//           >
//             <Eye className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setIsFavorite(!isFavorite)}
//             className={`p-2.5 transition-colors border-l border-b border-gray-200 ${
//               isFavorite
//                 ? "bg-red-500 text-white"
//                 : "bg-white text-gray-700 hover:bg-primary hover:text-white"
//             }`}
//             title="Add to Wishlist"
//           >
//             <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
//           </button>
//           <button
//             onClick={() => handleWhatsApp()}
//             className="bg-white text-gray-700 p-2.5 hover:bg-green-500 hover:text-white transition-colors border-l border-b border-gray-200"
//             title="WhatsApp"
//           >
//             <FaWhatsapp className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Product Image */}
//         <div className="relative">
//           <img
//             src={product.thumbnail}
//             alt={product.title}
//             className="w-full h-80 object-cover transition-opacity duration-300"
//             style={{ opacity: isHovered ? 0.9 : 1 }}
//           />
//         </div>

//         {/* Add to Cart Button - Bottom overlay on hover */}
//         <div
//           className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
//             isHovered
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-full"
//           }`}
//         >
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-primary text-white py-3 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
//           >
//             <ShoppingCart className="w-4 h-4" />
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* Category */}
//         <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
//           {product.category}
//         </div>

//         {/* Title */}
//         <h3 className="text-gray-900 font-normal text-sm mb-2 line-clamp-2 leading-relaxed min-h-10 hover:text-primary transition-colors cursor-pointer">
//           {product.title}
//         </h3>

//         {/* Description - shows on hover */}
//         <div
//           className="overflow-hidden transition-all duration-500 ease-in-out"
//           style={{
//             maxHeight: isHovered ? "100px" : "0px",
//             opacity: isHovered ? 1 : 0,
//             marginBottom: isHovered ? "12px" : "0px",
//           }}
//         >
//           <p className="text-xs text-gray-500 line-clamp-2">
//             {product.description.slice(0, 80)}...
//           </p>
//         </div>

//         {/* Price */}
//         <div className="flex items-center gap-2 mb-3">
//           <span className="text-lg font-bold text-gray-900">
//             ৳{discountedPrice}
//           </span>
//           {hasDiscount && (
//             <>
//               <span className="text-sm text-gray-400 line-through">
//                 ৳{product.basePrice}
//               </span>
//             </>
//           )}
//         </div>

//         {/* Bottom Actions - Shows on hover */}
//         <div
//           className="overflow-hidden transition-all duration-500 ease-in-out"
//           style={{
//             maxHeight: isHovered ? "50px" : "0px",
//             opacity: isHovered ? 1 : 0,
//           }}
//         >
//           <div className="flex gap-2 pt-1">
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 bg-primary text-white py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
//             >
//               Order Now
//             </button>
//             <button
//               onClick={() => handleWhatsApp()}
//               className="bg-green-500 text-white px-3 py-2 text-xs hover:bg-green-600 transition-colors"
//             >
//               <FaWhatsapp className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stock Progress Bar */}
//       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
//         <div
//           className="h-full bg-primary transition-all duration-700"
//           style={{
//             width: `${Math.min((product.stockQuantity / 50) * 100, 100)}%`,
//           }}
//         />
//       </div>

//       {isCartModalOpen &&
//         createPortal(
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//             <div className="bg-white w-full max-w-md p-6 relative">
//               <button
//                 onClick={() => setIsCartModalOpen(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl leading-none"
//               >
//                 ×
//               </button>

//               <h2 className="text-lg font-semibold mb-2">
//                 Product added to cart
//               </h2>

//               <p className="text-sm text-gray-600 mb-4">{product.title}</p>
//               <div>
//                 <ProductVariant
//                   variants={product.variants}
//                   from={from}
//                   productDetails={productDetails}
//                   onCloseModal={closeModal}
//                   isBuyNow={isBuyNow}
//                   product={product}
//                 />
//               </div>
//             </div>
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardButtons } from "./cardButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { SingleProductCard } from "./ProductSingleCard";

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

const ProductCard = ({
  products,
}: {
  products: ProductFormData[];
}) => {
  const groupedProducts: GroupedProducts = products.reduce(
    (acc, pro) => {
      const catName = pro.category;
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(pro);
      return acc;
    },
    {} as GroupedProducts,
  );

  return (
    <div className="w-full space-y-16 py-8 px-3">
      {Object.entries(groupedProducts).map(
        ([categoryName, categoryProducts], i) => (
          <CategoryCarousel
            key={i}
            categoryName={categoryName}
            products={categoryProducts}
          />
        ),
      )}
    </div>
  );
};

// Carousel for each category
const CategoryCarousel = ({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductFormData[];
}) => {
  if (products.length === 0) return null;

  const minSlidesForLoop = 5; // You can adjust this number
  const shouldLoop = products.length >= minSlidesForLoop;

  return (
    <section className="w-full">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left uppercase">
        {categoryName}
      </h2>

      {/* Carousel */}
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
            nextEl: "#custom-show-product-next",
            prevEl: "#custom-show-product-prev",
            disabledClass: "opacity-30 cursor-not-allowed", // Optional: add disabled state
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
              <div className="pb-8 pt-2">
                <SingleProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows - Desktop/Tablet */}
        <button
          id="custom-show-product-prev"
          className="custom-show-product-prev absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 transform rounded-full bg-white hover:bg-gray-50 p-3 shadow-lg transition-all duration-300"
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
          id="custom-show-product-next"
          className="custom-show-product-next absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 transform rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
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
      {/* <div className="w-full flex justify-center">
        <div className="max-w-50 border border-primary text-primary text-center mt-2 rounded-lg text-lg cursor-pointer hover:bg-primary font-bold hover:text-white transition py-4 px-4 ">
          See All Products
        </div>
      </div> */}
    </section>
  );
};

export default ProductCard;
