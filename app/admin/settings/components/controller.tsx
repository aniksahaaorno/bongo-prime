"use client";

import React from "react";
import BrandForm from "./socialInfo";
import { Banner } from "./banner";
import ProductSliderSection, {
  ProductSliderSectionProps,
} from "@/app/components/heroSlider";
import MarqueeForm from "./marquee";

export const Controller = ({
  mainSlider,
  sideSliders,
  brandInfo,
}: ProductSliderSectionProps & { brandInfo: any }) => {
  const [selected, setSelected] = React.useState<string>("Brand Info");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl text-black font-bold">
          General Setting
        </h1>
        <p className="text-sm text-gray-400">
          Added your brand logo, banner and social account
        </p>
      </div>

      <div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {["Brand Info", "Marquee", "Banner", "Banner Preview"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setSelected(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:cursor-pointer ${
                    selected === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </nav>
        </div>
        {/* Content based on selected tab */}
        <div>
          {selected === "Brand Info" && (
            <div>
              <BrandForm brandInfo={brandInfo} />
            </div>
          )}
          {selected === "Marquee" && (
            <div>
              <MarqueeForm />
            </div>
          )}
          {selected === "Banner" && (
            <div>
              <Banner />
            </div>
          )}

          {selected === "Banner Preview" && (
            <div>
              <ProductSliderSection
                mainSlider={mainSlider}
                sideSliders={sideSliders}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
