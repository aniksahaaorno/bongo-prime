import { getProductByCategory } from "@/lib/products";
import React from "react";
import ProductCard from "../components/productCard";
import { SingleProductCard } from "../components/ProductSingleCard";

interface ProductCategoryProps {
  params: {
    category: string;
  };
}

const Categories = async ({ params }: ProductCategoryProps) => {
  const { category } = await params;

  const products = await getProductByCategory(category);

  // console.log({products: products})



  if (!products || !products.success) {
    return (
      <div className="text-2xl text-primary flex justify-center min-h-screen items-center">
        No Data found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="my-5">
        <h1 className="text-4xl font-bold pl-4">All Product</h1>
        <p className="text-sm pl-4 text-gray-700">
          We provide our best quality
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <ProductCard product={products.data} /> */}
        {products?.data.map((p:any) => (
          <div className="pb-8 pt-2" key={p._id}>
            <SingleProductCard product={p} />
          </div>
        ))}
        {/* <SingleProductCard product={products.data} /> */}
      </div>
    </div>
  );
};

export default Categories;
