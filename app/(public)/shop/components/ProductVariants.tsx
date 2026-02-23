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

type Variant = {
  attributes: {
    color: string;
    colorHex?: string;
    size: string;
  };
  sku: string;
  stock: number;
  price?: string;
};

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
  onSelectionChange?: ((data: any) => void | undefined) | undefined;
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
  if (name.includes("gray") || name.includes("grey")) return "#9ca3af";
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
  onSelectionChange,
  isBuyNow,
  product,
}: Props) {
  const router = useRouter();

  // catch out all the color exit in the variants
  const colors = Array.from(
    new Map(
      variants.map((v) => [
        v.attributes.color,
        { name: v.attributes.color, hex: v.attributes.colorHex },
      ]),
    ).values(),
  );



  //   catch the available size in the variants
  const sizes = [...new Set(variants.map((v) => v.attributes.size))];

  // const [selectedColor, setSelectedColor] = useState(colors[0]);
  // const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");

  // const productSize = selectedSize.split(",");
  const productSize = selectedSize ? selectedSize.split(",") : [];

  // const [selectedProductSize, setSelectedProductSize] = useState(
  //   productSize[0],
  // );

  const [selectedProductSize, setSelectedProductSize] = useState(
    productSize[0] ?? "",
  );

  const [quantity, setQuantity] = useState(1);

  //   increase or decrease the quantity of product
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
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
      productPrice: productDetails.productPrice,
      slug: productDetails.slug,
      title: productDetails.title,
      thumbnail: productDetails.thumbnail,
    };
    addToCart(cartItem);

    fbEvent("AddToCart", {
      content_ids: [cartItem.sku || cartItem.slug],
      content_type: "product",
      content_name: cartItem.title,
      value: cartItem.productPrice,
      currency: "BDT",
    });

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
      productPrice: productDetails.productPrice,
      slug: productDetails.slug,
      title: productDetails.title,
      thumbnail: productDetails.thumbnail,
    };
    addToCart(cartItem);

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

  //   whole color change and depend on that change the sku and availability
  const handleColorChange = (colorObj: {
    name: string;
    hex: string | undefined;
  }) => {
    setSelectedColor(colorObj);

    const firstAvailableVariantForColor = variants.find(
      (v) => normalize(v.attributes.color) === normalize(colorObj.name),
    );

    if (firstAvailableVariantForColor) {
      setSelectedSize(firstAvailableVariantForColor.attributes.size);
    }
  };

  //   variant selected fun
  // const selectedVariant = variants.find(
  //   (v) =>
  //     normalize(v.attributes.color) === normalize(selectedColor.name) &&
  //     normalize(v.attributes.size) === normalize(selectedSize),
  // );

  const selectedVariant =
    variants.length === 0
      ? null
      : variants.find(
          (v) =>
            normalize(v.attributes.color) ===
              normalize(selectedColor?.name || "") &&
            normalize(v.attributes.size) === normalize(selectedSize),
        );

  const hasVariants = variants.length > 0;

  //   condition for display the stock
  // const availabilityText = selectedVariant
  //   ? selectedVariant.stock < 5
  //     ? "Stock almost finished"
  //     : "In Stock"
  //   : "Unavailable";

  const availabilityText = !hasVariants
    ? "No variant available"
    : selectedVariant
      ? selectedVariant.stock < 5
        ? "Stock almost finished"
        : "In Stock"
      : "Unavailable";

  // check the sku is exit or not
  const sku = selectedVariant?.sku ?? "N/A";

  useEffect(() => {
    if (!selectedVariant || onSelectionChange === undefined) return;

    onSelectionChange({
      selectedProductSize,
      quantity,
      selectedColor,
      selectedVariant,
      sku,
    });
  }, [selectedProductSize, quantity, selectedColor, selectedVariant]);

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
              <strong>Code:</strong> <span className="font-medium">{sku}</span>
            </span>
          )}
        </h2>
      </div>

      {/* COLOR */}
      <div className="rounded-lg bg-white border border-gray-200 p-4">
        <p className="mb-3 text-sm font-medium">
          Color: <span className="font-semibold">{selectedColor?.name}</span>
        </p>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const bgColor = resolveColor(color?.name, color?.hex);

            return (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
                  ${
                    selectedColor.name === color.name
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-300"
                  }`}
              >
                <span
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: bgColor }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="mb-2 text-sm font-medium">
          Size:{" "}
          <span className="font-semibold">{selectedSize.toUpperCase()}</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {productSize.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedProductSize(size)}
              className={`rounded-md border px-4 py-2 text-sm capitalize transition
                ${
                  selectedProductSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }`}
            >
              {size}
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
              <ShoppingCart size={18} /> Add to Cart
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
              ক্রয় করুন
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
            আরো ক্রয় করুন
          </button>
          {isBuyNow === true ? (
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary"
            >
              ক্রয় করুন
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary"
            >
              কার্টে এড করুন
            </button>
          )}
          {/* <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#269ED9] text-white py-2 rounded-lg text-sm hover:bg-[#1d82b5]"
          >
            Add to card
          </button> */}
        </div>
      )}
    </div>
  );
}
