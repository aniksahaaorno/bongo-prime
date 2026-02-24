import Image from "next/image";
import { getProductDetails } from "@/lib/products";
import ProductHero from "./ProductThumbnail";
import ProductFeatures from "./ProductFeature";
import ProductSpecs from "./ProductSpecs";
import Footer from "./Footer";
import Header from "./Header";

export default async function ProductLanding({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product } = await getProductDetails(slug);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Header />
      <ProductHero product={product} />
      <ProductFeatures />
      <ProductSpecs product={product} />
    </main>
  );
}
