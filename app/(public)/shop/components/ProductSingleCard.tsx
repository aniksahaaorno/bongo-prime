"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { handleWhatsApp } from "./handleWhatsApp";
import ProductVariant from "./ProductVariants";
import Link from "next/link";
import Image from "next/image";

export const SingleProductCard = ({ product }: { product: any }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const from = "cardButton";

  console.log({product: product})

  const productPrice =
    product?.discount?.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) *
              Number(product?.discount?.value)) /
              100,
        )
      : Math.max(
          Number(product.basePrice) - Number(product?.discount?.value),
          0,
        );

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const calculatePrice = () => {
    const base = parseInt(product.basePrice);
    if (product.discount.type === "flat") {
      return base - parseInt(product.discount.value);
    } else if (product.discount.type === "percentage") {
      return base - (base * parseInt(product.discount.value)) / 100;
    }
    return base;
  };

  const getDiscountLabel = () => {
    if (product.discount.type === "flat") {
      return `-৳${product.discount.value}`;
    } else if (product.discount.type === "percentage") {
      return `-${product.discount.value}%`;
    }
    return "";
  };

  const discountedPrice = calculatePrice();
  const hasDiscount = parseInt(product.discount.value) > 0;

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const handleBuyNow = () => {
    setIsCartModalOpen(true);
    setIsBuyNow(true);
  };

  const handleViewDetail = () => {
    router.push(`/shop/${product.categoryId}/${product.slug}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log({discountedPrice: discountedPrice})

  return (
    <div
      className="group/product bg-white overflow-hidden hover:shadow-lg transition-all duration-300 relative border border-gray-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1">
              {getDiscountLabel()}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {product.stockQuantity <= 10 && (
          <div
            className={`absolute bottom-3 left-3 z-20 transition-opacity duration-300 opacity-100`}
          >
            <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1">
              Only {product.stockQuantity} left
            </span>
          </div>
        )}

        {/* Quick Action Icons - Vertical Right Side */}
        <div
          className={`absolute top-3 right-0 z-20 flex flex-col gap-1 transition-transform duration-300 translate-x-0`}
        >
          <button
            onClick={handleViewDetail}
            className="bg-white text-gray-700 p-2.5 hover:bg-primary hover:text-white transition-colors border-l border-t border-b border-gray-200"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2.5 transition-colors border-l border-b border-gray-200 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-primary hover:text-white"
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => handleWhatsApp()}
            className="bg-white text-gray-700 p-2.5 hover:bg-green-500 hover:text-white transition-colors border-l border-b border-gray-200"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative">
          <Link
            className="block relative"
            href={`/shop/${product.categoryId}/${product.slug}`}
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-100 object-cover transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Add to Cart Button - Bottom overlay on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 opacity-100 translate-y-0`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            কার্টে এড করুন
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-medium mb-2 line-clamp-2 leading-relaxed min-h-10 hover:text-primary transition-colors cursor-pointer text-lg">
          <Link
            className="inline-block"
            href={`/shop/${product.categoryId}/${product.slug}`}
          >
            {product.title}
          </Link>
        </h3>

        {/* Description - shows on hover */}
        {/* <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: "100px",
            opacity: 1,
            marginBottom: "12px",
          }}
        >
          <p className="text-base text-gray-500 line-clamp-2">
            {product.description.slice(0, 80)}...
          </p>
        </div> */}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ৳{discountedPrice ? discountedPrice : product.basePrice}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ৳{product.basePrice}
              </span>
            </>
          )}
        </div>

        {/* Bottom Actions - Shows on hover */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: "50px",
            opacity: 1,
          }}
        >
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-white py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              অর্ডার করুন
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="bg-green-500 text-white px-3 py-2 text-xs hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stock Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{
            width: `${Math.min((product.stockQuantity / 50) * 100, 100)}%`,
          }}
        />
      </div>

      {isCartModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl leading-none"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-2">অর্ডার করুন</h2>

              <p className="text-sm text-gray-600 mb-4">{product.title}</p>
              <div>
                <ProductVariant
                  variants={product.variants}
                  from={from}
                  productDetails={productDetails}
                  onCloseModal={closeModal}
                  isBuyNow={isBuyNow}
                  product={product}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
