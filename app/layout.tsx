import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { getFacebookPixelCredential } from "@/lib/facebook";
import TimeTracker from "./components/TimeTracker";
import { LocationTracker } from "./components/LocationTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crab Fashion BD",
  description: "Build your trust",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const facebookCredential = await getFacebookPixelCredential();

  return (
    <html lang="en">
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookCredential?.data?.fbPixelId || ""}');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* <!-- Google Tag Manager --> */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NK6BMW6N');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NK6BMW6N"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <AuthProvider>
          <TimeTracker />
          <LocationTracker />
          {children}
          <ToastContainer />
          <Toaster
            closeButton
            position="top-right"
            toastOptions={{
              style: {
                backgroundColor: "#0970B4",
                color: "white",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
