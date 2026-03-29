import { Metadata } from "next";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  Mail,
  Phone,
  FileText,
  Shield,
  Package,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Refund Policy | Bongo Prime",
  description:
    "Learn about Bongo Prime's refund policy, eligibility criteria, and refund process.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Bongo Prime",
    description:
      "Understand our refund process, eligibility, and timelines for returns at Bongo Prime.",
    url: "https://www.crabfashionbd.com/refund-policy",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const refundEligibility = [
  {
    icon: <CheckCircle className="text-green-600" size={20} />,
    title: "Refund Request Window",
    description: "Must be made within 7 days from delivery date",
  },
  {
    icon: <CheckCircle className="text-green-600" size={20} />,
    title: "Product Condition",
    description: "Unused, unwashed, with original tags and packaging",
  },
  {
    icon: <CheckCircle className="text-green-600" size={20} />,
    title: "Proof of Purchase",
    description: "Original invoice or order confirmation required",
  },
];

const nonRefundableItems = [
  "Discounted or sale items",
  "Innerwear and accessories",
  "Customized products",
  "Items damaged due to misuse",
  "Products without original packaging",
];

const validRefundReasons = [
  {
    title: "Wrong Product Delivered",
    description: "Received different item than ordered",
  },
  {
    title: "Manufacturing Defect",
    description: "Quality issues or damage (report within 24 hours)",
  },
  {
    title: "Description Mismatch",
    description:
      "Product significantly differs from online description",
  },
];

const refundProcessSteps = [
  {
    step: 1,
    title: "Contact Support",
    description: "Reach out within 24-48 hours of receiving product",
  },
  {
    step: 2,
    title: "Provide Details",
    description: "Share order number, reason, and photos/videos",
  },
  {
    step: 3,
    title: "Verification",
    description: "Our team reviews and approves the request",
  },
  {
    step: 4,
    title: "Refund Initiated",
    description: "Processed within 7-10 working days after approval",
  },
];

export default function RefundPolicyPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Refund Policy
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            At Bongo Prime, we value our customers and strive to
            ensure complete satisfaction with every purchase.
          </p>
        </header>

        {/* Refund Eligibility */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Refund Eligibility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {refundEligibility.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Non-Refundable Items */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="text-blue-700" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Non-Refundable Items
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <ul className="space-y-3">
                  {nonRefundableItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Important Notes */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-amber-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Important Notes
                </h2>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>
                      Slight color variation due to lighting or screen
                      resolution is not considered a defect
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>
                      Bongo Prime reserves the right to approve or
                      reject refund requests based on policy
                      compliance
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Valid Refund Reasons */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Package className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Valid Refund Reasons
                </h2>
              </div>

              <div className="space-y-4">
                {validRefundReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery Charges */}
            <section>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Delivery Charges
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-green-100">
                    <p className="text-green-700 font-medium">
                      Error from Bongo Prime: Full delivery charge
                      refund
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-700">
                      Customer preference (size, color, change of
                      mind): Delivery charges non-refundable
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Refund Process */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-10">
            <RotateCcw className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Refund Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundProcessSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {step.step < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Refund Timeline */}
        <section className="mt-16 bg-linear-to-r from-blue-50 to-blue-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Refund Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Processing Time
              </h3>
              <p className="text-gray-700">
                Refunds are processed within{" "}
                <span className="font-bold text-blue-700">
                  7–10 working days
                </span>{" "}
                after receiving and inspecting the returned item.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Refund Method
              </h3>
              <p className="text-gray-700">
                Refunds are issued via the{" "}
                <span className="font-bold">
                  original payment method
                </span>{" "}
                or as store credit, as applicable.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-16 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Need Refund Support?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href="mailto:crabfashion@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-4 rounded-lg font-medium transition-colors"
              >
                <Mail size={20} />
                crabfashion@gmail.com
              </a>

              <a
                href="https://wa.me/8801706310521"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 px-6 py-4 rounded-lg font-medium transition-colors"
              >
                <Phone size={20} />
                +880 1706 310 521
              </a>
            </div>

            <p className="text-gray-600 mt-6">
              Contact us for refund-related queries or assistance with
              the process
            </p>
          </div>
        </section>
      </main>
    </section>
  );
}
