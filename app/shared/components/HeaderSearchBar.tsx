"use client";

import { useState } from "react";
import { Search, Phone } from "lucide-react";
import Link from "next/link";

export default function HeaderSearchBar({ categories, name, phone }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in", selectCategory);
  };

  const hotlineNumber = phone || "(12) 345 67895";

  return (
    <div className="w-full">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex items-center border-2 border-gray-200 rounded-full bg-white hover:border-primary/60 focus-within:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
          
          {/* Category Dropdown - Desktop Only */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors border-r border-gray-200 whitespace-nowrap group"
            >
              <span className="max-w-30 truncate">{selectCategory}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute top-11 left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-9999 max-h-96 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    <button
                      type="button"
                      className="block w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors duration-150 z-999"
                      onClick={() => {
                        setSelectCategory("All Categories");
                        setIsOpen(false);
                      }}
                    >
                      All Categories
                    </button>
                    {categories?.map((category: any) => (
                      <Link
                        href={`/shop/${category._id}`}
                        key={category._id}
                        onClick={() => setIsOpen(false)}
                      >
                        <button
                          type="button"
                          className="block w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors duration-150 capitalize"
                          onClick={() => setSelectCategory(category.name)}
                        >
                          {category.name}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-5 py-3.5 text-gray-900 bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3.5 bg-primary text-white hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 group rounded-tr-full rounded-br-full"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden xl:inline text-sm font-semibold">Search</span>
          </button>
        </div>
      </form>

      {/* Contact Info - Mobile */}
      <div className="md:hidden mt-3 flex items-center justify-center gap-2 text-sm bg-gray-50 rounded-lg py-2 px-4">
        <Phone className="w-4 h-4 text-primary" />
        <span className="text-gray-600">Hotline:</span>
        <a
          href={`tel:${hotlineNumber}`}
          className="text-primary font-semibold hover:underline"
        >
          {phone}
        </a>
      </div>
    </div>
  );
}