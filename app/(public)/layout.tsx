import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../shared/navbar/page";
import { ToastContainer } from "react-toastify";
import { MenuNavbar } from "../shared/components/Menu";
import ShowFooter from "../shared/components/showFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bongo Prime",
  description: "Build your trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <div className="sticky -top-44 z-50">
        <Navbar />
      </div>
      <main>{children}</main>
      <div>
        <ShowFooter />
      </div>
    </div>
  );
}
