"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Edit2, Trash2, CornerDownRight } from "lucide-react";
import StockStatusDropdown from "./stockStatusDropdown";
import { MdPublishedWithChanges } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Link from "next/link";

// ============ TYPE DEFINITIONS ============
interface Discount {
  type: "percentage" | "flat";
  value: string;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
}

interface VariantSize {
  size: string;
  stock: number;
  sku: string;
  price: string;
}

interface Variant {
  color: string;
  sizes: VariantSize[];
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  purchase?: string;
  discount: Discount;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock";
  categoryId: string;
  subCategoryId: string;
  category: string;
  subCategory: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: Variant[];
  seo: SEO;
  seoMetaTitle: string;
  isDraft: boolean;
  featured: boolean;
  isDelete: boolean;
  deletedAt: string;
  createdAt: string;
}

interface productDescription {
  title: string;
  subTitle: string;
}

interface ProductProps {
  INITIAL_PRODUCTS: Product[];
  description?: productDescription;
}

interface EditFormData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  purchase?: string;
  discountType: "percentage" | "flat";
  discountValue: string;
  discount: { type: "percentage" | "flat"; value: string };
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock";
  category: string;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  variants?: Variant[];
  seo: SEO;
}

type UpdateProductPayload = Omit<
  EditFormData,
  | "discountType"
  | "discountValue"
  | "seoMetaTitle"
  | "seoMetaDescription"
> & {
  discount: { type: "percentage" | "flat"; value: string };
  seo: SEO;
  variants: Variant[];
};

// ============ EDIT MODAL COMPONENT ============
interface EditModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (data: UpdateProductPayload) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  if (!product) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<EditFormData>({
    defaultValues: product
      ? {
          title: product.title,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          basePrice: product.basePrice,
          purchase: product.purchase,
          discountType: product.discount.type,
          discountValue: product.discount.value,
          sku: product.sku,
          stockQuantity: product.stockQuantity,
          stockStatus: product.stockStatus,
          category: product.category,
          seoMetaTitle: product.seo?.metaTitle,
          seoMetaDescription: product.seo?.metaDescription,
        }
      : undefined,
  });
  const [variants, setVariants] = React.useState(
    product?.variants || [],
  );

  console.log(variants);

  React.useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        basePrice: product.basePrice,
        discountType: product.discount.type,
        discountValue: product.discount.value,
        sku: product.sku,
        stockQuantity: product.stockQuantity,
        stockStatus: product.stockStatus,
        category: product.category,
        seoMetaTitle: product.seo?.metaTitle,
        seoMetaDescription: product.seo?.metaDescription,
      });
    }
  }, [product, reset]);

  const handleVariantChange = (
    variantIndex: number,
    sizeIndex: number | null,
    field: "color" | "size" | "stock" | "sku" | "price",
    value: string,
  ) => {
    setVariants((prev) => {
      const updated = [...prev];

      if (field === "color") {
        updated[variantIndex].color = value;

        // regenerate all size SKUs when color changes
        updated[variantIndex].sizes = updated[variantIndex].sizes.map(
          (sizeObj: any) => ({
            ...sizeObj,
            sku: generateSKU(watch("title"), value, sizeObj.size),
          }),
        );
      }

      if (sizeIndex !== null) {
        const sizeObj = updated[variantIndex].sizes[sizeIndex];

        if (field === "size") {
          sizeObj.size = value;

          // auto generate SKU when size changes
          sizeObj.sku = generateSKU(
            watch("title"),
            updated[variantIndex].color,
            value,
          );
        }

        if (field === "stock") sizeObj.stock = Number(value);

        if (field === "price") sizeObj.price = value;

        // allow manual override
        if (field === "sku") sizeObj.sku = value;
      }

      return updated;
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const generateSKU = (
    productTitle: string,
    color?: string,
    size?: string,
  ) => {
    const productCode = productTitle
      ? productTitle.substring(0, 3).toUpperCase()
      : "PRD";

    const colorCode = color
      ? color.substring(0, 3).toUpperCase()
      : "CLR";

    const sizeCode = size
      ? size.substring(0, 3).toUpperCase()
      : "SIZ";

    const random = Math.floor(100 + Math.random() * 900);

    return `${productCode}-${colorCode}-${sizeCode}-${random}`;
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        color: "",
        sizes: [
          {
            size: "",
            stock: 0,
            sku: "",
            price: "",
          },
        ],
      },
    ]);
  };

  const addSize = (variantIndex: number) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              sizes: [
                ...variant.sizes,
                {
                  size: "",
                  stock: 0,
                  sku: "",
                  price: "",
                },
              ],
            }
          : variant,
      ),
    );
  };

  const removeSize = (variantIndex: number, sizeIndex: number) => {
    setVariants((prev) =>
      prev.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter((_, i) => i !== sizeIndex),
            }
          : variant,
      ),
    );
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // EditFormData
  const onSubmit = (data: EditFormData) => {
    const {
      discountType,
      discountValue,
      seoMetaTitle,
      seoMetaDescription,
      ...payload
    } = data;

    onSave({
      ...payload,
      discount: {
        type: data.discountType,
        value: data.discountValue,
      },
      seo: {
        metaTitle: data.seoMetaTitle || "",
        metaDescription: data.seoMetaDescription || "",
      },
      variants,
    });
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                onChange: (e) => {
                  const slug = generateSlug(e.target.value);
                  setValue("slug", slug);
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              readOnly
              {...register("slug", { required: "Slug is required" })}
              className={`w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.slug ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price
              </label>
              <input
                type="text"
                {...register("basePrice", {
                  required: "Base Price is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.basePrice
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.basePrice.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price
              </label>
              <input
                type="text"
                {...register("purchase", {
                  required: "purchase price is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.basePrice
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.basePrice.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              {...register("category", {
                required: "Category is required",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short Description is required",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.shortDescription
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <select
                {...register("discountType")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value
              </label>
              <input
                type="text"
                {...register("discountValue")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Status
              </label>
              <select
                {...register("stockStatus")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Variants</h3>

            <div className="space-y-4">
              {variants.map((variant: any, variantIndex: number) => (
                <div
                  key={variantIndex}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-700">
                      Variant #{variantIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeVariant(variantIndex)}
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      value={variant.color}
                      onChange={(e) =>
                        handleVariantChange(
                          variantIndex,
                          null,
                          "color",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g. Black"
                    />
                  </div>

                  {variant.sizes.map(
                    (size: any, sizeIndex: number) => (
                      <div
                        className="mt-4 flex items-center justify-between gap-x-3"
                        key={sizeIndex}
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size
                          </label>
                          <input
                            value={size.size}
                            onChange={(e) =>
                              handleVariantChange(
                                variantIndex,
                                sizeIndex,
                                "size",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="e.g. M"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            SKU
                          </label>
                          <input
                            value={size.sku}
                            onChange={(e) =>
                              handleVariantChange(
                                variantIndex,
                                sizeIndex,
                                "sku",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="e.g. PROD-BLK-M"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock
                          </label>
                          <input
                            type="number"
                            value={size.stock}
                            onChange={(e) =>
                              handleVariantChange(
                                variantIndex,
                                sizeIndex,
                                "stock",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            min="0"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                          </label>
                          <input
                            type="text"
                            value={size.price}
                            onChange={(e) =>
                              handleVariantChange(
                                variantIndex,
                                sizeIndex,
                                "price",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            min="0"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              removeSize(variantIndex, sizeIndex)
                            }
                            className="px-2 py-1 bg-red-100 text-red-600 rounded-md ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ),
                  )}

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => addSize(variantIndex)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md"
                    >
                      Add Size
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Variant
              </button>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">
              SEO Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Meta Title
                </label>
                <input
                  {...register("seoMetaTitle")}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Meta Description
                </label>
                <textarea
                  {...register("seoMetaDescription")}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor=""></label>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: "#f58313" }}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ MAIN TABLE COMPONENT ============
const ProductTable = ({
  INITIAL_PRODUCTS,
  description,
}: ProductProps) => {
  const [products, setProducts] = useState<Product[]>(
    INITIAL_PRODUCTS || [],
  );
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const handleStatusToggle = (id: string, status: any): void => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              stockStatus: status,
            }
          : p,
      ),
    );
  };

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (
    formData: UpdateProductPayload,
  ) => {
    if (!editingProduct) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products/update-product/${editingProduct?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Update failed");
      }

      toast.success("Product updated successfully");
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProduct._id ? { ...p, ...formData } : p,
        ),
      );

      setEditingProduct(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleSaveEdit = (data: EditFormData): void => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p._id === editingProduct._id
            ? {
                ...p,
                title: data.title,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,
                basePrice: data.basePrice,
                discount: {
                  type: data.discountType,
                  value: data.discountValue,
                },
                sku: data.sku,
                stockQuantity: data.stockQuantity,
                stockStatus: data.stockStatus,
                category: data.category,
              }
            : p,
        ),
      );
      setEditingProduct(null);
    }
  };

  // const handleDelete = (id: string): void => {
  //   if (window.confirm("Are you sure you want to delete this product?")) {
  //     setProducts(products.filter((p) => p._id !== id));
  //   }
  // };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products/primary-delete/${id}`,
            {
              isDeleted: false,
            },
          );

          if (response.status === 200) {
            setProducts((prevProducts) =>
              prevProducts.filter((p) => p._id !== id),
            );

            toast.success("Product deleted successfully");
          }
        } catch (error) {
          console.error("Error delete product:", error);
          toast.error("Failed to delete product. Please try again.");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-400 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {description?.title}
          </h1>
          <p className="text-gray-600 mt-1">
            {description?.subTitle}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Base Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {product.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {product.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ৳{product.basePrice}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {product.stockQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StockStatusDropdown
                        product={product}
                        handleStatusToggle={handleStatusToggle}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-primary hover:text-primary"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-primary hover:text-primary"
                          title="Generate Landing"
                        >
                          <Link
                            href={`/${product.slug}/landing`}
                            target="_blank"
                          >
                            <CornerDownRight size={18} />
                          </Link>
                        </button>
                        {description?.title === "Manage Product" && (
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                        {description?.title === "Draft Product" && (
                          <button
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600 hover:text-green-700"
                            title="Publish Now"
                          >
                            <MdPublishedWithChanges size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4 max-w-75">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border "
            >
              <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {product.slug}
                    </p>

                    <div className="mt-2 flex gap-4 text-xs">
                      <span className="font-semibold text-primary">
                        ৳{product.basePrice}
                      </span>
                      <span className="text-gray-600">
                        Stock: {product.stockQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>Category</span>
                  <span className="font-medium text-gray-900">
                    {product.category}
                  </span>
                </div>

                <div>
                  <StockStatusDropdown
                    product={product}
                    handleStatusToggle={handleStatusToggle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "#f58313" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        // onSave={handleSaveEdit}
        onSave={handleUpdateProduct}
      />
    </div>
  );
};

export default ProductTable;
