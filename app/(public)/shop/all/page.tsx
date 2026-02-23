import { AllProduct, getFeaturedProduct } from "@/lib/products";
import React from "react";
import ProductCarousel from "@/app/components/productCarousel";
import { ProductFormData } from "@/utils/product";
import { SingleProductCard } from "./../components/ProductSingleCard";

const ShowAllProduct = async () => {
  const res = await AllProduct();
  const result = await getFeaturedProduct();
  const products = res.data;


  if (products?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl text-blue-800">
        no data found
      </div>
    );
  }

  return (
    <div className="min-h-screen container max-w-7xl mx-auto my-10">
      <div className="my-5">
        <h1 className="text-4xl font-bold pl-4">All Product</h1>
        <p className="text-sm pl-4 text-gray-700">
          We provide our best quality
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 space-y-10 gap-4 px-5 lg:px-0">
        {products.map((p: ProductFormData) => (
          <div key={p._id}>
            <SingleProductCard product={p} />
          </div>
        ))}
      </div>
      {result.success && (
        <div className="mt-10">
          <div>
            <ProductCarousel products={result.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAllProduct;
