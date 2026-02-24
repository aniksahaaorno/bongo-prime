"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Minus, Plus } from "lucide-react";
import { addToCart, clearCart } from "@/utils/cartStorage";
import { fbEvent } from "@/utils/fbPixel";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

export interface ProductSize {
  size: string;
  stock: number;
  sku: string;
}

export interface ProductVariant {
  color: string;
  price?: string;
  sizes: ProductSize[];
}

export interface ProductDiscount {
  type: "percentage" | "flat";
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discount: ProductDiscount;
  stockStatus: "in-stock" | "out-of-stock" | "low-stock";
  category: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: ProductVariant[];
  purchase?: string;
}

interface ProductHeroProps {
  product: Product;
}

/* ================= COMPONENT ================= */

const ProductHero = ({ product }: ProductHeroProps) => {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants[selectedVariantIndex];

  /* ================= PRICE ================= */

  const basePrice = parseFloat(product.basePrice);
  const discountValue = parseFloat(product.discount?.value || "0");

  const discountedPrice =
    product.discount?.type === "percentage"
      ? basePrice - (basePrice * discountValue) / 100
      : basePrice - discountValue;

  /* ================= STOCK ================= */

  const totalStock = useMemo(() => {
    return product.variants.reduce((total, variant) => {
      return (
        total +
        variant.sizes.reduce((s, size) => s + size.stock, 0)
      );
    }, 0);
  }, [product]);

  const selectedSizeData = selectedVariant?.sizes.find(
    (s) => s.size === selectedSize
  );

  const maxStock = selectedSizeData?.stock || 0;

  const isInStock = totalStock > 0;

  /* ================= HANDLERS ================= */

  const handleIncrease = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBuyNow = () => {
    if (!selectedSizeData) {
      alert("Please select a size.");
      return;
    }

    if (quantity > selectedSizeData.stock) {
      alert("Selected quantity exceeds available stock.");
      return;
    }

    clearCart();

    const orderData = {
      selectedProductSize: selectedSizeData.size,
      quantity,
      selectedColor: selectedVariant.color,
      sku: selectedSizeData.sku,
      productPrice: Number(product.purchase || discountedPrice),
      slug: product.slug,
      title: product.title,
      thumbnail: product.thumbnail,
    };

    addToCart(orderData);

    fbEvent("InitiateCheckout", {
      content_ids: [selectedSizeData.sku],
      content_type: "product",
      content_name: product.title,
      value: orderData.productPrice,
      currency: "BDT",
    });

    router.push("/checkout");
  };

  const allImages = [product.thumbnail, ...product.gallery];

  /* ================= UI ================= */

  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-lg">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === img
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-semibold mb-4">
              {product.title}
            </h1>

            <p className="text-muted-foreground mb-6">
              {product.shortDescription}
            </p>

            {/* ================= PRICE ================= */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-primary">
                ৳{discountedPrice.toLocaleString()}
              </span>

              {discountValue > 0 && (
                <span className="line-through text-muted-foreground">
                  ৳{basePrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* ================= COLOR ================= */}
            <div className="mb-6">
              <p className="mb-2 font-medium">
                Color: {selectedVariant?.color}
              </p>

              <div className="flex gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.color}
                    onClick={() => {
                      setSelectedVariantIndex(index);
                      setSelectedSize("");
                      setQuantity(1);
                    }}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedVariantIndex === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= SIZE ================= */}
            <div className="mb-6">
              <p className="mb-2 font-medium">Size</p>

              <div className="flex gap-2 flex-wrap">
                {selectedVariant?.sizes.map((size) => (
                  <button
                    key={size.size}
                    disabled={size.stock === 0}
                    onClick={() => {
                      setSelectedSize(size.size);
                      setQuantity(1);
                    }}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size.size
                        ? "border-primary"
                        : "border-border"
                    } ${
                      size.stock === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= QUANTITY ================= */}
            {selectedSizeData && (
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handleDecrease}
                  className="p-2 border rounded"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4">{quantity}</span>

                <button
                  onClick={handleIncrease}
                  className="p-2 border rounded"
                >
                  <Plus size={16} />
                </button>

                <span className="text-sm text-muted-foreground">
                  {maxStock} available
                </span>
              </div>
            )}

            {/* ================= BUTTON ================= */}
            <button
              onClick={handleBuyNow}
              disabled={!isInStock}
              className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
            >
              Buy Now
            </button>

            {/* ================= STOCK ================= */}
            <div className="mt-4 text-sm">
              {isInStock
                ? `${totalStock} items in stock`
                : "Out of stock"}
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">
                Description
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;