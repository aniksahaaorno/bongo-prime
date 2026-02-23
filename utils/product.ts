// Define types
interface Discount {
  type: "percentage" | "flat";
  value: string;
}

interface Variant {
  color: string;
  price: string;
  sizes: {
    size: string;
    stock: number;
    sku: string;
  }[];
}

interface Seo {
  metaTitle: string;
  metaDescription: string;
}

export interface ProductFormData {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  purchase?: string;
  discount: Discount;
  stockStatus: "in-stock" | "out-of-stock" | "pre-order";
  categoryId: string;
  category: string;
  subCategory: string;
  subCategoryId: string;
  tags: string[];
  thumbnail: File | null;
  gallery: string[];
  variants: Variant[];
  seo: Seo;
  videoLink?: string;
  isDraft: boolean;
  featured: boolean;
}

export interface PreviewImages {
  thumbnail: string | null;
  gallery: string[];
}
