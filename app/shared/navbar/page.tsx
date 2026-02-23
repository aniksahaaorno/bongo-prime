import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();
  const marqueeText = await getMarquee();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white sticky top-10 z-50 shadow-sm">
      {/* Top Bar - Info & Account */}
      <div className="bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-0">
          <div className="h-10 flex justify-between items-center text-sm">
            <p className="text-gray-600 font-medium hidden md:block">
              Welcome to {brandInfo.name} - Your Trusted Shop
            </p>
            <div className="flex items-center gap-6 ml-auto">
              <NavBarMenu />
              <div className="md:hidden">
                <AccountDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo, Search, Cart */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between md:py-6 gap-4 md:gap-6 mt-2">
            {/* Logo */}
            <div className="shrink-0">
              <ComLogo />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-3xl">
              <HeaderSearchBar
                categories={getAllCategories.data}
                name={brandInfo.name}
                phone={brandInfo.phone}
              />
            </div>

            {/* Cart */}
            <div className="flex items-center gap-3">
              <BookCard />
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden pb-4 my-5">
            <HeaderSearchBar
              categories={getAllCategories.data}
              name={brandInfo.name}
              phone={brandInfo.phone}
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-gray-200 pt-4">
        <MenuNavbar categories={getAllCategories.data} />
      </div>

      {/* Promotional Marquee */}
      <MarqueeText text={marqueeText?.data?.text || "marquee text here"} />
    </header>
  );
};

export default Navbar;
