import { Metadata } from "next";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  Package,
  Shield,
  Clock,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Help Center | Bongo Prime",
  description:
    "Get support with orders, delivery, returns, payments, and more at Bongo Prime Help Center.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/help-center",
  },
  openGraph: {
    title: "Help Center | Bongo Prime",
    description:
      "Find answers to common questions about orders, shipping, returns, and customer support at Bongo Prime.",
    url: "https://www.crabfashionbd.com/help-center",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const helpTopics = [
  {
    title: "Orders & Tracking",
    description: "Placing orders, order status, order modifications",
    icon: <ShoppingBag className="text-primary" size={24} />,
  },
  {
    title: "Delivery & Shipping",
    description: "Shipping time, tracking orders, delivery areas",
    icon: <Truck className="text-primary" size={24} />,
  },
  {
    title: "Returns & Exchanges",
    description: "Return process, exchange options, policy details",
    icon: <RotateCcw className="text-primary" size={24} />,
  },
  {
    title: "Payments & Refunds",
    description: "Payment methods, refund process, payment security",
    icon: <CreditCard className="text-primary" size={24} />,
  },
  {
    title: "Product Information",
    description: "Sizing, care instructions, product details",
    icon: <Package className="text-primary" size={24} />,
  },
  {
    title: "Policies & Safety",
    description: "Privacy policy, terms of service, data security",
    icon: <Shield className="text-primary" size={24} />,
  },
];

export default function HelpCenterPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Help Center
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Need help? We're here for you. Find answers or contact our
            support team.
          </p>
        </header>

        {/* Main Support Info */}
        <section className="mb-16">
          <div className="bg-linear-to-br from-blue-50 to-sky-50 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Support
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Contact us for support with orders, delivery, returns,
                exchanges, refunds, payments, or product information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Email */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-sm text-gray-600">
                      Direct support
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:crabfashion@gmail.com"
                  className="text-primary hover:text-primary font-medium break-all transition-colors"
                >
                  crabfashion@gmail.com
                </a>
              </div>

              {/* Phone/WhatsApp */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MessageCircle
                      className="text-primary"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phone / WhatsApp
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quick response
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/8801706310521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary font-medium transition-colors"
                >
                  +880 1706 310 521
                </a>
              </div>
            </div>

            {/* Support Hours */}
            <div className="max-w-md mx-auto mt-8">
              <div className="bg-white/80 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-primary" size={20} />
                  <h3 className="font-semibold text-gray-900">
                    Support Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sat–Thu</span>
                    <span className="font-medium text-gray-900">
                      10:00 AM – 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-medium text-gray-900">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic, idx) => (
              <a
                key={idx}
                href="#"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  {topic.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {topic.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Important Policies */}
        <section className="mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Important Information
            </h2>
            <p className="text-gray-700 text-center mb-6">
              For more details, please check our policies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <a
                href="/policies/return-exchange"
                className="text-center px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-primary font-medium">
                  Return & Exchange Policy
                </span>
              </a>
              <a
                href="/policies/refund"
                className="text-center px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-primary font-medium">
                  Refund Policy
                </span>
              </a>
              <a
                href="/policies/shipping"
                className="text-center px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-primary font-medium">
                  Shipping Information
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="rounded-2xl bg-linear-to-r from-primary to-blue-400 p-10 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Still Need Help?
          </h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Our dedicated support team is ready to assist you with any
            questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:crabfashion@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <Mail size={20} />
              Email Support
            </a>
            <a
              href="https://wa.me/8801706310521"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <MessageCircle size={20} />
              WhatsApp Chat
            </a>
          </div>
        </section>
      </main>
    </section>
  );
}
