import { Metadata } from "next";
import {
  Truck,
  MapPin,
  Clock,
  CreditCard,
  Package,
  AlertCircle,
  PhoneCall,
  Mail,
  Calendar,
  Shield,
  CheckCircle,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Shipping Information | Bongo Prime",
  description:
    "Learn about Bongo Prime's shipping areas, delivery times, charges, and tracking information.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/shipping-information",
  },
  openGraph: {
    title: "Shipping Information | Bongo Prime",
    description:
      "Shipping details including delivery areas, timeframes, charges, and tracking at Bongo Prime.",
    url: "https://www.crabfashionbd.com/shipping-information",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const shippingAreas = [
  {
    title: "Inside Dhaka",
    icon: <MapPin className="text-blue-600" size={20} />,
    details: "All areas within Dhaka city",
  },
  {
    title: "Outside Dhaka",
    icon: <MapPin className="text-blue-600" size={20} />,
    details: "All major cities and districts",
  },
  {
    title: "Nationwide",
    icon: <Truck className="text-blue-600" size={20} />,
    details: "Complete coverage across Bangladesh",
  },
];

const shippingTimeframes = [
  {
    area: "Inside Dhaka",
    time: "1–3 working days",
    note: "Metro areas: 1-2 days, Suburbs: 2-3 days",
  },
  {
    area: "Outside Dhaka",
    time: "3–5 working days",
    note: "Major cities: 3-4 days, Rural areas: 4-5 days",
  },
];

const orderProcessing = [
  {
    icon: <Clock className="text-blue-600" size={20} />,
    title: "Regular Processing",
    description:
      "Orders are processed within 24 hours after confirmation",
  },
  {
    icon: <Calendar className="text-blue-600" size={20} />,
    title: "Weekend & Holidays",
    description:
      "Orders placed on Friday or public holidays processed next working day",
  },
];

const deliveryNotes = [
  "Delivery time may vary due to weather, holidays, or courier issues",
  "Keep exact amount ready for Cash on Delivery",
  "Ensure correct address and contact number",
  "Be available at the provided address during delivery hours",
];

export default function ShippingInformationPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
            <Truck className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Shipping Information
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            At Bongo Prime, we aim to deliver your products quickly
            and safely across Bangladesh.
          </p>
        </header>

        {/* Shipping Areas */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Shipping Areas
            </h2>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-blue-50 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                We currently deliver all over Bangladesh
              </h3>
              <p className="text-gray-700">
                Complete nationwide coverage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {area.icon}
                    <h4 className="font-semibold text-gray-900">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">{area.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Shipping Time */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Shipping Time
              </h2>
            </div>

            <div className="space-y-4">
              {shippingTimeframes.map((timeframe, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {timeframe.area}
                    </h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {timeframe.time}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {timeframe.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="text-amber-600 mt-0.5"
                  size={20}
                />
                <p className="text-amber-800 text-sm">
                  Delivery time may vary due to weather, holidays, or
                  courier issues
                </p>
              </div>
            </div>
          </section>

          {/* Right Column - Shipping Charges */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Shipping Charges
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Standard Charges
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700">
                        Inside Dhaka
                      </span>
                      <span className="font-semibold text-gray-900">
                        BDT _
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-700">
                        Outside Dhaka
                      </span>
                      <span className="font-semibold text-gray-900">
                        BDT _
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">
                    Shipping charges may vary based on product weight
                    and location. Final charges will be shown at
                    checkout.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Processing */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Package className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Order Processing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {orderProcessing.map((process, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  {process.icon}
                  <h3 className="font-semibold text-gray-900">
                    {process.title}
                  </h3>
                </div>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Information - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* COD Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Cash on Delivery (COD)
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-500 mt-0.5"
                  size={16}
                />
                <span>Available in selected areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-500 mt-0.5"
                  size={16}
                />
                <span>Keep exact amount ready at delivery</span>
              </li>
            </ul>
          </div>

          {/* Courier Partner */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Courier Partner
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              We use reliable third-party courier services to ensure
              safe delivery.
            </p>
            <p className="text-gray-600 text-sm">
              Once shipped, you'll receive confirmation via
              SMS/WhatsApp
            </p>
          </div>

          {/* Order Tracking */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <PhoneCall className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Order Tracking
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Tracking information will be shared via:
            </p>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• SMS notification</li>
              <li>• WhatsApp message</li>
              <li>• Phone call (where available)</li>
            </ul>
          </div>
        </div>

        {/* Delivery Issues */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-amber-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Delivery Notes & Issues
            </h2>
          </div>

          <div className="bg-white border border-amber-100 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-2">
                  Important Information
                </h3>
                <ul className="space-y-2 text-amber-700">
                  {deliveryNotes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> If delivery fails due to
                  incorrect address or unreachable phone number,
                  re-delivery charges may apply.
                </p>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  Bongo Prime is not responsible for delays caused by
                  courier companies or natural circumstances beyond
                  our control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-linear-to-r from-blue-50 to-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Shipping Questions?
            </h2>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              For any shipping-related queries, please contact our
              support team
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href="mailto:crabfashion@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-medium transition-colors border border-blue-200"
              >
                <Mail size={20} />
                crabfashion@gmail.com
              </a>

              <a
                href="https://wa.me/8801706310521"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-green-50 text-green-700 px-6 py-4 rounded-lg font-medium transition-colors border border-green-200"
              >
                <PhoneCall size={20} />
                +880 1706 310 521
              </a>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
