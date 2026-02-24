import { AllProduct } from "@/lib/products";
import React from "react";
import ProductTable from "../components/allProduct";

const AllProductShow = async () => {
  const res = await AllProduct();
  const products = res.data;

  const productDescription = {
    title: "Products",
    subTitle: "Manage your product inventory",
  };

  return (
    <div>
      <ProductTable
        INITIAL_PRODUCTS={products}
        description={productDescription}
      />
    </div>
  );
};

export default AllProductShow;
