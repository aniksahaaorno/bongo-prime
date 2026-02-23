"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { UploadeImage } from "@/app/components/uploadeImage";
import { PreviewImages, ProductFormData } from "@/utils/product";
import { toast } from "sonner";
import DescriptionEditor from "./DescriptionEditor";

// interface CategoryProps {
//   allCategory:
// }

export default function AddProductForm({ allCategory }: any) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    basePrice: "",
    purchase: "",
    discount: { type: "percentage", value: "" },
    sku: "",
    stockQuantity: "",
    stockStatus: "in-stock",
    categoryId: "",
    subCategoryId: "",
    category: "",
    subCategory: "",
    tags: [],
    thumbnail: null,
    gallery: [],
    variants: [],
    videoLink: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
    },
    isDraft: false,
    featured: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [variantForm, setVariantForm] = useState({
    color: "",
    size: "",
    sku: "",
    price: "",
    stock: "",
  });
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<PreviewImages>({
    thumbnail: null,
    gallery: [],
  });
  const [thumbnailUpload, setThumbnailUpload] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [selectSubCategory, setSelectSubCategory] = useState<string | null>(
    null,
  );

  // Handle basic inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle nested inputs
  const handleNestedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof ProductFormData,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [name]: value,
      },
    }));
  };

  //   Record<string, unknown>;

  // Auto generate slug
  const generateSlug = (title: string) => {
    return title
      .normalize("NFC") // 🔥 Fix Bangla combining chars
      .trim()
      .replace(/[^\p{Script=Bengali}\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    handleInputChange(e);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(title),
    }));
  };

  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle thumbnail
  const handleThumbnailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploaded(false);

      try {
        const url = await UploadeImage(file);

        setThumbnailUpload(url);
        setPreviewImages((prev) => ({
          ...prev,
          thumbnail: url as string,
        }));
      } catch (error) {
        alert("Uploade faild");
      } finally {
        setIsUploading(false);
        setUploaded(true);
      }
    }
  };

  // Handle gallery
  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - formData.gallery.length;
    const toAdd = files.slice(0, remaining);

    toAdd.forEach(async (file) => {
      const url = await UploadeImage(file);

      setPreviewImages((prev) => ({
        ...prev,
        gallery: [...prev.gallery, url as string],
      }));
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, url],
      }));
    });
  };

  const generateSKU = (productTitle: string, color: string, size: string) => {
    const productCode = productTitle.substring(0, 3).toUpperCase();
    const colorCode = color ? color.substring(0, 3).toUpperCase() : "NA";
    const sizeCode = size ? size.substring(0, 3).toUpperCase() : "ST";
    const random = Math.floor(100 + Math.random() * 900);

    return `${productCode}-${colorCode}-${sizeCode}-${random}`;
  };

  // Example Usage:
  const productTitle = formData.title;

  const removeGalleryImage = (index: number) => {
    setPreviewImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const foundCategory = allCategory.find((ctg: any) => ctg._id === value);

    setFormData((prev) => ({
      ...prev,
      categoryId: value,
      subCategoryId: "",
    }));

    setSelectedCategory(foundCategory || null);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSubCategory(e.target.value);

    setFormData((prev) => ({
      ...prev,
      subCategoryId: e.target.value,
    }));
  };

  const handleVariantChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVariantForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // auto SKU generate only when color or size changes
      if (name === "color" || name === "size") {
        updated.sku = generateSKU(
          productTitle,
          name === "color" ? value : prev.color,
          name === "size" ? value : prev.size,
        );
      }

      return updated;
    });
  };

  const addVariant = () => {
    if (
      variantForm.color &&
      variantForm.size &&
      variantForm.sku &&
      variantForm.stock
    ) {
      setFormData((prev) => ({
        ...prev,
        variants: [
          ...prev.variants,
          {
            attributes: { color: variantForm.color, size: variantForm.size },
            sku: variantForm.sku,
            price: variantForm.price || undefined,
            stock: parseInt(variantForm.stock),
          },
        ],
      }));
      setVariantForm({ color: "", size: "", sku: "", price: "", stock: "" });
      setShowVariantForm(false);
    }
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      categoryId: selectedCategory._id,
      category: selectedCategory.name,
      thumbnail: thumbnailUpload,
      subCategoryId: selectSubCategory,
      isDelete: false,
      deletedAt: "",
      createdAt: new Date().toLocaleString(),
    };



    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!result.success) {
      toast.error(result.message);
    }

    if (result.success) {
      toast.success(result?.message || "Product Added successfully");
    }

    setFormData({
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      basePrice: "",
      purchase: "",
      discount: { type: "percentage", value: "" },
      sku: "",
      stockQuantity: "",
      stockStatus: "in-stock",
      categoryId: "",
      subCategoryId: "",
      category: "",
      subCategory: "",
      tags: [],
      thumbnail: null,
      gallery: [],
      variants: [],
      videoLink: "",
      seo: {
        metaTitle: "",
        metaDescription: "",
      },
      isDraft: false,
      featured: false,
    });
    setActiveTab("basic");
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "pricing", label: "Pricing" },
    { id: "inventory", label: "Inventory" },
    { id: "media", label: "Media" },
    { id: "variants", label: "Variants" },
    { id: "seo", label: "SEO" },
  ];

  const requiredFieldsByTab: Record<
    string,
    (keyof ProductFormData | string)[]
  > = {
    basic: ["title", "shortDescription", "description", "categoryId", "tags"],
    pricing: ["basePrice"],
    inventory: ["sku", "stockQuantity", "stockStatus"],
    media: ["thumbnail"],
    variants: [], // optional
    seo: [], // submit time এ handle হবে
  };

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const isCurrentTabValid = () => {
    const requiredFields = requiredFieldsByTab[activeTab] || [];

    return requiredFields.every((field) => {
      // tags array check
      if (field === "tags") {
        return formData.tags.length > 0;
      }

      // thumbnail check
      if (field === "thumbnail") {
        return formData.thumbnail !== null || previewImages.thumbnail !== null;
      }
      // normal string check
      const value = formData[field as keyof ProductFormData];
      return value !== "" && value !== null;
    });
  };

  const isLastTab = activeTab === "seo";

  const goNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const goPrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create Product
          </h1>
          <p className="text-gray-500 mt-2">Add a new product to your store</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden max-w-80 md:max-w-full">
          <div className="overflow-x-auto">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max sm:flex-none text-xs px-4 py-3 font-medium md:text-sm transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter product title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="slug-will-generate-automatically"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  required
                  onChange={handleInputChange}
                  placeholder="Brief description for listings"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Description
                </label>
                {/* <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Detailed product description"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                /> */}
                <DescriptionEditor
                  value={formData.description}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, description: val }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category *
                  </label>

                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select a category</option>

                    {allCategory.map((ctg: any) => (
                      <option key={ctg._id} value={ctg._id}>
                        {ctg.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    value={tagInput}
                    required
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag and press button"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-primary rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === "pricing" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Base Price (৳) *
                  </label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Purchase price (৳) *
                  </label>
                  <input
                    type="number"
                    name="purchase"
                    value={formData.purchase}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Discount (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Discount Type
                    </label>
                    <select
                      name="type"
                      value={formData.discount.type}
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: {
                            ...prev.discount,
                            type: e.target.value as "percentage" | "flat",
                          },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (৳)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.discount.value}
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: { ...prev.discount, value: e.target.value },
                        }))
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {activeTab === "inventory" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  SKU (Stock Keeping Unit) *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="e.g., PRD-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Stock Status *
                  </label>
                  <select
                    name="stockStatus"
                    value={formData.stockStatus}
                    required
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="pre-order">Pre Order</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA */}
          {activeTab === "media" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Thumbnail Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
                  {previewImages.thumbnail ? (
                    <div className="space-y-4">
                      {isUploading ? (
                        <div className="flex justify-center items-center h-40">
                          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <img
                          src={previewImages.thumbnail}
                          alt="Thumbnail"
                          className="w-full max-w-xs h-40 object-cover rounded-lg mx-auto"
                        />
                      )}

                      {uploaded && (
                        <div>
                          <span className="text-sm text-green-500">
                            Image uploaded successfully
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImages((prev) => ({
                            ...prev,
                            thumbnail: null,
                          }))
                        }
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="text-gray-400" size={32} />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Gallery Images (Max 5)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-gray-400" size={32} />
                      <span className="text-sm text-gray-600">
                        Click to upload {5 - formData.gallery.length} more
                        images
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryChange}
                      disabled={formData.gallery.length >= 5}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Gallery Preview */}
                {previewImages.gallery.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                    {previewImages.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Add Video Link(if have)
                </label>
                <input
                  type="text"
                  name="videoLink"
                  value={formData.videoLink}
                  required
                  onChange={handleVariantChange}
                  placeholder="Add your youtube product video link"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* VARIANTS */}
          {activeTab === "variants" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Variants List */}
              {formData.variants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Added Variants
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Color
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Size
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            SKU
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Stock
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.variants.map((variant, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-3">
                              {variant.attributes.color}
                            </td>
                            <td className="py-3 px-3">
                              {variant.attributes.size}
                            </td>
                            <td className="py-3 px-3">{variant.sku}</td>
                            <td className="py-3 px-3">{variant.stock}</td>
                            <td className="py-3 px-3">
                              <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Add Variant Form */}
              {showVariantForm ? (
                <div className="border border-gray-300 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={variantForm.color}
                        required
                        onChange={handleVariantChange}
                        placeholder="e.g., Red"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={variantForm.size}
                        onChange={handleVariantChange}
                        required
                        placeholder="e.g., M"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={variantForm.sku}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Price (Optional)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={variantForm.price}
                        required
                        onChange={handleVariantChange}
                        placeholder="0.00"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={variantForm.stock}
                      required
                      onChange={handleVariantChange}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3 flex-col sm:flex-row">
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
                    >
                      Add Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVariantForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowVariantForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-primary hover:bg-blue-50 transition"
                >
                  <Plus size={20} />
                  Add New Variant
                </button>
              )}
            </div>
          )}

          {/* SEO */}
          {activeTab === "seo" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Meta Title
                </label>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.seo.metaTitle}
                    required
                    onChange={(e) => handleNestedChange(e, "seo")}
                    placeholder="SEO title (max 60 characters)"
                    maxLength={60}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-gray-500">
                    {formData.seo.metaTitle.length}/60 characters
                  </p>
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Meta Description
                </label>
                <div className="space-y-1">
                  <textarea
                    name="metaDescription"
                    value={formData.seo.metaDescription}
                    onChange={(e) => handleNestedChange(e, "seo")}
                    required
                    placeholder="SEO description (max 160 characters)"
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-gray-500">
                    {formData.seo.metaDescription.length}/160 characters
                  </p>
                </div>
              </div>

              {/* Visibility */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Visibility</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDraft"
                      checked={formData.isDraft}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Save as Draft (not visible to customers)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Mark as Featured Product
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 flex-col sm:flex-row justify-between pt-6 border-t border-gray-200">
            {/* Previous Button (SEO ছাড়া সব tab এ, প্রথম tab বাদে) */}
            {currentTabIndex > 0 && (
              <button
                type="button"
                onClick={goPrevious}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Previous
              </button>
            )}

            <div className="flex gap-3 ml-auto">
              {/* SEO ছাড়া সব tab এ Next button */}

              {!isLastTab && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!isCurrentTabValid()}
                  className={`px-6 py-3 rounded-lg transition font-medium
                ${
                  isCurrentTabValid()
                    ? "bg-primary text-white hover:bg-primary"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
                `}
                >
                  Next
                </button>
              )}

              {/* শুধু SEO tab এ Publish button */}
              {isLastTab && (
                <button
                  type="submit"
                  disabled={!isCurrentTabValid()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition font-medium"
                >
                  <Save size={20} />
                  Publish Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
