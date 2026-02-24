"use client";

import { motion } from "framer-motion";

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
  subCategory?: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: ProductVariant[];
  purchase?: string;
}

interface ProductSpecsProps {
  product: Product;
}

/* ================= COMPONENT ================= */

const ProductSpecs = ({ product }: ProductSpecsProps) => {
  /* ================= DERIVED DATA ================= */

  const availableColors = product.variants.map((v) => v.color);

  const availableSizes = [
    ...new Set(
      product.variants.flatMap((v) =>
        v.sizes.map((s) => s.size)
      )
    ),
  ];

  const totalStock = product.variants.reduce((total, variant) => {
    return (
      total +
      variant.sizes.reduce((s, size) => s + size.stock, 0)
    );
  }, 0);

  const specs = [
    { label: "Category", value: product.category },
    ...(product.subCategory
      ? [{ label: "Sub Category", value: product.subCategory }]
      : []),
    { label: "Available Colors", value: availableColors.join(", ") },
    { label: "Available Sizes", value: availableSizes.join(", ") },
    { label: "Total Stock", value: `${totalStock} units` },
    { label: "Tags", value: product.tags.join(", ") },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
            Product <span className="text-gradient-gold">Details</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ================= SPECS TABLE ================= */}
            <div className="border border-border rounded-xl overflow-hidden">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex justify-between items-center p-4 ${
                    index !== specs.length - 1
                      ? "border-b border-border"
                      : ""
                  } hover:bg-secondary/50 transition-colors`}
                >
                  <span className="text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="font-medium text-foreground text-right max-w-[60%]">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ================= VARIANTS SUMMARY ================= */}
            <div>
              <h3 className="font-display text-xl font-semibold mb-4">
                Available Variants
              </h3>

              <div className="space-y-4">
                {product.variants.map((variant, index) => {
                  const variantStock = variant.sizes.reduce(
                    (total, size) => total + size.stock,
                    0
                  );

                  return (
                    <motion.div
                      key={variant.color}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                      }}
                      className="p-4 rounded-xl border border-border bg-secondary/30"
                    >
                      {/* Color + Stock */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium text-foreground">
                          {variant.color}
                        </span>

                        <span
                          className={`text-sm px-2 py-0.5 rounded-full ${
                            variantStock > 10
                              ? "bg-green-100 text-green-700"
                              : variantStock > 0
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {variantStock > 0
                            ? `${variantStock} in stock`
                            : "Out of stock"}
                        </span>
                      </div>

                      {/* Sizes */}
                      <div className="flex flex-wrap gap-2 text-sm">
                        {variant.sizes.map((size) => (
                          <span
                            key={size.sku}
                            className={`px-3 py-1 rounded-full border ${
                              size.stock > 0
                                ? "border-border"
                                : "border-destructive text-destructive"
                            }`}
                          >
                            {size.size} ({size.stock})
                          </span>
                        ))}
                      </div>

                      {/* Optional Variant Price */}
                      {variant.price && (
                        <div className="text-sm text-gold mt-3">
                          Special Price: ৳
                          {parseFloat(
                            variant.price
                          ).toLocaleString()}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSpecs;