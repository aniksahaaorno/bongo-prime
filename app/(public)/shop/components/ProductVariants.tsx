"use client";

import { Minimize, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CardButtons } from "./cardButtons";
import { addToCart, getCart } from "@/utils/cartStorage";
import { toast } from "react-toastify";
import { fbEvent } from "@/utils/fbPixel";
import { handleWhatsApp } from "./handleWhatsApp";
import { ProductFormData } from "@/utils/product";
import axios from "axios";

interface Variant {
  color: string;
  price: string;
  sizes: {
    size: string;
    stock: number;
    sku: string;
  }[];
}

interface productDetails {
  productPrice: number;
  title: string;
  slug: string;
  thumbnail: File | null;
}

type Props = {
  variants: Variant[];
  from: string;
  productDetails: productDetails;
  onCloseModal?: () => void;
  isBuyNow?: boolean;
  product: ProductFormData;
};

// function that cover color name to hex code
function resolveColorFromName(colorName: string): string {
  const name = colorName.toLowerCase().trim();

  if (name.includes("black")) return "#000000";
  if (name.includes("white")) return "#ffffff";
  if (name.includes("blue")) return "#2563eb";
  if (name.includes("red")) return "#dc2626";
  if (name.includes("green")) return "#16a34a";
  if (name.includes("orange")) return "#f97316";
  if (name.includes("yellow")) return "#facc15";
  if (name.includes("pink")) return "#ec4899";
  if (name.includes("purple")) return "#9333ea";
  if (name.includes("silver")) return "#d1d5db";
  if (name.includes("gray") || name.includes("grey"))
    return "#9ca3af";
  if (name.includes("gold")) return "#f59e0b";

  return "#cccccc";
}

// if hex code exit than return the hex code form here otherwise resolveColorFromName function call

function resolveColor(color: string, hex?: string) {
  if (hex) return hex;
  return resolveColorFromName(color);
}

export default function ProductVariant({
  variants,
  from,
  productDetails,
  onCloseModal,
  isBuyNow,
  product,
}: Props) {
  const router = useRouter();

  const mappedVariants = variants.map((v) => ({
    ...v,
    hex: resolveColorFromName(v.color),
  }));

  const [selectedColor, setSelectedColor] = useState(
    mappedVariants[0]?.color ?? null,
  );

  const [selectedProductSize, setSelectedProductSize] = useState(
    mappedVariants[0].sizes[0]?.size ?? "",
  );

  const sizesForSelectedColor =
    mappedVariants.find(
      (v) => normalize(v.color) === normalize(selectedColor),
    )?.sizes || [];

  const [quantity, setQuantity] = useState(1);

  //   increase or decrease the quantity of product
  const handleIncrease = () => {
    setQuantity((prev) => {
      if (prev < (selectedVariant?.stock ?? 0)) {
        return prev + 1;
      }

      toast.error("Can not add more item than quantity!");

      return prev;
    });
  };

  const handleDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    const cartItem = {
      selectedProductSize,
      quantity,
      selectedColor,
      selectedVariant,
      sku,
      productPrice: selectedVariant.price
        ? selectedVariant.price
        : productDetails.productPrice,
      slug: productDetails.slug,
      title: productDetails.title,
      thumbnail: productDetails.thumbnail,
    };

    if (selectedVariant.stock !== 0) {
      addToCart(cartItem);
    } else {
      alert("Selected size is out of stock");
      return;
    }

    /* fbEvent("AddToCart", {
      content_ids: [cartItem.sku || cartItem.slug],
      content_type: "product",
      content_name: cartItem.title,
      value: cartItem.productPrice,
      currency: "BDT",
    }); */

    const cartPixelData = {
      content_ids: [cartItem.sku || cartItem.slug],
      content_type: "product",
      content_name: cartItem.title,
      value: cartItem.productPrice,
      currency: "BDT",
    };

    const cartPixelResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/add-to-cart-pixel-request`,
      cartPixelData,
    );

    toast.success("Product added successfully");
    onCloseModal?.();
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      toast.caller("Please select a variant");
      return;
    }

    const cartItem = {
      selectedProductSize,
      quantity,
      selectedColor,
      selectedVariant,
      sku,
      productPrice: selectedVariant.price
        ? selectedVariant.price
        : productDetails.productPrice,
      slug: productDetails.slug,
      title: productDetails.title,
      thumbnail: productDetails.thumbnail,
    };

    if (selectedVariant.stock !== 0) {
      addToCart(cartItem);
    } else {
      alert("Selected size is out of stock");
      return;
    }

    fbEvent("InitiateCheckout", {
      content_ids: [cartItem.sku || cartItem.slug],
      content_type: "product",
      content_name: cartItem.title,
      value: cartItem.productPrice,
      currency: "BDT",
    });

    setTimeout(() => {
      router.push("/checkout");
    }, 350);
  };

  // redirect on the what 's app
  const handleOrderWhatsApp = () => {
    handleWhatsApp(quantity);
  };

  //   function  normalize
  function normalize(value: string) {
    return value.toLowerCase().trim() || "";
  }

  const selectedVariant =
    variants.length === 0
      ? null
      : variants
            .find(
              (v) =>
                normalize(v.color) === normalize(selectedColor || ""),
            )
            ?.sizes.find(
              (size) =>
                size.size.toLowerCase() ===
                selectedProductSize.toLowerCase(),
            )
        ? {
            ...variants
              .find(
                (v) =>
                  normalize(v.color) ===
                  normalize(selectedColor || ""),
              )
              ?.sizes.find(
                (size) =>
                  size.size.toLowerCase() ===
                  selectedProductSize.toLowerCase(),
              ),
            price:
              variants.find(
                (v) =>
                  normalize(v.color) ===
                  normalize(selectedColor || ""),
              )?.price || null,
          }
        : null;

  const hasVariants = variants.length > 0;

  //   condition for display the stock

  const availabilityText = !hasVariants
    ? "No variant available"
    : selectedVariant &&
        selectedVariant.stock !== undefined &&
        selectedVariant.stock !== null
      ? selectedVariant!.stock < 5
        ? "Stock almost finished"
        : "In Stock"
      : "Out of stock";

  // check the sku is exit or not
  const sku = selectedVariant?.sku ?? "N/A";

  //   main components
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {selectedVariant?.price ? (
          <span className="text-2xl font-bold text-gray-900">
            {selectedVariant.price}৳
          </span>
        ) : (
          <span className="text-2xl font-bold text-gray-900">
            {productDetails.productPrice}৳
          </span>
        )}

        {product.discount.value && (
          <span className="text-lg text-red-500 line-through ml-2">
            {product.basePrice}৳
          </span>
        )}
      </div>

      <div className="flex">
        <h2>
          Availability:{" "}
          <span className="font-semibold">{availabilityText}</span>
        </h2>
        <h2>
          {selectedVariant && (
            <span className="ml-3 text-gray-500">
              <strong>Code:</strong>{" "}
              <span className="font-medium">{sku}</span>
            </span>
          )}
        </h2>
      </div>

      {/* COLOR */}
      <div className="rounded-lg bg-white border border-gray-200 p-4">
        <p className="mb-3 text-sm font-medium">
          Color:{" "}
          <span className="font-semibold">{selectedColor}</span>
        </p>

        <div className="flex flex-wrap gap-3">
          {mappedVariants.map((variant) => {
            const bgColor = resolveColor(variant.color, variant.hex);
            return (
              <button
                key={variant.color}
                onClick={() => setSelectedColor(variant.color)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
                  ${
                    normalize(selectedColor) ===
                    normalize(variant.color)
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-300"
                  }`}
              >
                <span
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: bgColor }}
                />

                {variant.color}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="mb-2 text-sm font-medium">
          Size:{" "}
          <span className="font-semibold">
            {selectedProductSize.toUpperCase()}
          </span>
        </p>

        <div className="flex flex-wrap gap-2">
          {sizesForSelectedColor.map((size) => (
            <button
              disabled={size.stock === 0}
              key={size.size}
              onClick={() => setSelectedProductSize(size.size)}
              className={`rounded-md border px-4 py-2 text-sm capitalize transition
                ${
                  size.stock === 0
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 line-through"
                    : selectedProductSize === size.size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black hover:text-black"
                }`}
            >
              {size.size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4 items-stretch">
        {/* Quantity selector */}
        <div className="flex items-center border rounded-lg border-gray-400 bg-blue-50">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 text-xl font-bold hover:bg-gray-100 rounded-l-lg"
          >
            <Minus />
          </button>

          <span className="px-6 py-2 border-x border-gray-400 bg-white font-semibold">
            {quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="px-4 py-2 text-xl font-bold hover:bg-gray-100 rounded-r-lg"
          >
            <Plus />
          </button>
        </div>

        {from === "productDetails" && (
          <>
            {/* Add to cart */}
            <button
              disabled={!hasVariants}
              onClick={() => handleAddToCart()}
              className="flex items-center gap-2 px-4 py-2 border text-primary border-primary rounded-lg hover:cursor-pointer hover:bg-primary hover:text-white! font-medium"
            >
              <ShoppingCart size={18} /> কার্টে এড করুন
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleOrderWhatsApp}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] text-white rounded-lg font-semibold hover:opacity-90 hover:cursor-pointer"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </button>

            {/* Buy Now */}
            <button
              disabled={!hasVariants}
              onClick={handleBuyNow}
              className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 hover:from-primary-foreground hover:cursor-pointer hover:to-primary w-full"
            >
              অর্ডার করুন
            </button>
          </>
        )}
      </div>
      {from === "cardButton" && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onCloseModal?.()}
            className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            আরো দেখুন
          </button>
          {isBuyNow === true ? (
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary"
            >
              অর্ডার করুন
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary"
            >
              কার্টে এড করুন
            </button>
          )}
        </div>
      )}
    </div>
  );
}
