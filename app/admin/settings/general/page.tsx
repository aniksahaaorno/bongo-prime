import React from "react";
import { Banner } from "../components/banner";
import ProductSliderSection from "@/app/components/heroSlider";
import BrandForm from "../components/socialInfo";
import { Controller } from "../components/controller";
import { getBrandInfo } from './../../../../lib/social';

const GeneralSection = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`,
    {
      next: { revalidate: 300 },
    }
  ).then((res) => res.json());

  const { mainBanner, secondBanner, thirdBanner } = result.data || {
    mainBanner: [],
    secondBanner: [],
    thirdBanner: [],
  };

  const toArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);

  const secondSlider =
    [
      { id: "side-1", images: toArray(secondBanner) },
      { id: "side-2", images: toArray(thirdBanner) },
    ].flat() || [];

  const mainSlider = { id: "main", images: toArray(mainBanner) };

  const brandInfo = await getBrandInfo();

  return (
    <div className="space-y-10">
      <div>
        <Controller mainSlider={mainSlider} sideSliders={secondSlider} brandInfo={brandInfo?.data || {}} />
      </div>
    </div>
  );
};

export default GeneralSection;
