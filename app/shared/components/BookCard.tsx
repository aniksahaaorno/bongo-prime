"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const BookCard = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCart().length);
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  return (
    <Link href="/checkoutCart">
      <button className="group relative">
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white lg:border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300">
          
          {/* Cart Icon with Badge */}
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-200 group-hover:scale-110 transform" />
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-linear-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>

          {/* Cart Info - Desktop */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs text-gray-500 leading-none font-medium">
              Shopping Cart
            </span>
            <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>
      </button>
    </Link>
  );
};