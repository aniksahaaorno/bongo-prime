import { Metadata } from "next";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  CreditCard,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  UserCheck,
  Facebook,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Bongo Prime",
  description:
    "Learn about Bongo Prime's return and exchange policy, eligibility criteria, and process.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/return-exchange-policy",
  },
  openGraph: {
    title: "Return & Exchange Policy | Bongo Prime",
    description:
      "Understand our return and exchange process, eligibility, and timelines at Bongo Prime.",
    url: "https://www.crabfashionbd.com/return-exchange-policy",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const eligibilityPoints = [
  "Within 7 days from delivery date",
  "Unused, unwashed, in original condition",
  "All tags and packaging intact",
  "Original invoice or proof of purchase required",
];

const nonReturnableItems = [
  "Discounted or sale items",
  "Innerwear and accessories",
  "Customized products",
  "Items damaged due to customer misuse",
];

const validReasons = [
  {
    icon: <Package className="text-blue-600" size={18} />,
    title: "Wrong Size",
    description: "Incorrect size delivered",
  },
  {
    icon: <RotateCcw className="text-blue-600" size={18} />,
    title: "Wrong Product/Color",
    description: "Different item or color delivered",
  },
  {
    icon: <AlertCircle className="text-blue-600" size={18} />,
    title: "Manufacturing Defect",
    description: "Quality issues (report within 24 hours)",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Contact Support",
    description: "Reach out within 24-48 hours of delivery",
    icon: <MessageCircle className="text-blue-600" size={20} />,
  },
  {
    step: 2,
    title: "Provide Details",
    description: "Share order number, reason, and photos",
    icon: <FileText className="text-blue-600" size={20} />,
  },
  {
    step: 3,
    title: "Verification",
    description: "Our team reviews your request",
    icon: <UserCheck className="text-blue-600" size={20} />,
  },
  {
    step: 4,
    title: "Guidance",
    description: "We guide you through the process",
    icon: <CheckCircle className="text-blue-600" size={20} />,
  },
];

export default function ReturnExchangePolicyPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
            <RotateCcw className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Return & Exchange Policy
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            At Bongo Prime, customer satisfaction is our top priority.
            If you're not fully satisfied with your purchase, we're
            here to help.
          </p>
        </header>

        {/* Eligibility Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="text-green-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Eligibility for Return & Exchange
            </h2>
          </div>

          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibilityPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-100"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle
                      className="text-green-600"
                      size={16}
                    />
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Non-Returnable Items */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-rose-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Non-Returnable / Non-Exchangeable Items
              </h2>
            </div>

            <div className="bg-white border border-rose-100 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                The following items are not eligible for return or
                exchange:
              </p>
              <ul className="space-y-3">
                {nonReturnableItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <XCircle className="text-rose-600" size={14} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Right Column - Valid Reasons */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Valid Reasons for Return or Exchange
              </h2>
            </div>

            <div className="space-y-4">
              {validReasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-100 rounded-xl p-5 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {reason.icon}
                    <h3 className="font-semibold text-gray-900">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Process Steps */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Return & Exchange Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {step.step < 4 && (
                  <div className="hidden lg:block absolute top-6 -right-3 w-6 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Info - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Delivery Charges */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Delivery Charges
              </h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <p className="text-green-700 text-sm">
                  <span className="font-medium">
                    Mistake from Bongo Prime:
                  </span>{" "}
                  We bear delivery cost
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">
                    Customer preference:
                  </span>{" "}
                  Customer pays delivery charges
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Refund Policy
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={16} />
                <span className="text-gray-700 text-sm">
                  Processed within <strong>7–10 working days</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-blue-500" size={16} />
                <span className="text-gray-700 text-sm">
                  Via original payment method or store credit
                </span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white border border-amber-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-amber-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Important Notes
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>
                  Bongo Prime reserves the right to reject
                  non-compliant returns
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>
                  Slight color variation due to lighting/screen is not
                  a defect
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <section>
          <div className="bg-linear-to-r from-blue-50 to-rose-50 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Need Support with Returns or Exchanges?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {/* Email */}
              <a
                href="mailto:crabfashion@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-medium transition-colors border border-blue-200"
              >
                <Mail size={20} />
                crabfashion@gmail.com
              </a>

              {/* Phone/WhatsApp */}
              <a
                href="https://wa.me/8801706310521"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-green-50 text-green-700 px-6 py-4 rounded-lg font-medium transition-colors border border-green-200"
              >
                <Phone size={20} />
                +880 1706 310 521
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/crabfashion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-medium transition-colors border border-blue-200"
              >
                <Facebook size={20} />
                Official Bongo Prime
              </a>
            </div>

            <div className="bg-white/80 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 mb-3">
                Our customer support team is available to assist you
                with returns and exchanges
              </p>
              <p className="text-gray-600 text-sm">
                Please have your order number and relevant photos
                ready when contacting us
              </p>
            </div>
          </div>
        </section>

        {/* Additional Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full">
            <RotateCcw className="text-gray-500" size={18} />
            <span className="text-gray-600 text-sm">
              Please read all policy details carefully before
              initiating a return or exchange
            </span>
          </div>
        </div>
      </main>
    </section>
  );
}
