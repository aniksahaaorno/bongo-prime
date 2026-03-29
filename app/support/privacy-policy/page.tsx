import { Metadata } from "next";
import {
  Shield,
  User,
  Eye,
  Lock,
  Cookie,
  Link,
  Settings,
  RefreshCw,
  Mail,
  Phone,
  FileText,
  Bell,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Privacy Policy | Bongo Prime",
  description:
    "Learn how Bongo Prime collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Bongo Prime",
    description:
      "Understand how we handle your data and protect your privacy at Bongo Prime.",
    url: "https://www.crabfashionbd.com/privacy-policy",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const dataCollection = [
  "Full name",
  "Phone number",
  "Email address",
  "Delivery address",
  "Payment-related information (we do not store card or payment details)",
  "Order and purchase history",
];

const dataUsage = [
  {
    icon: <FileText className="text-pink-600" size={20} />,
    title: "Order Processing",
    description: "Process and deliver orders efficiently",
  },
  {
    icon: <Phone className="text-pink-600" size={20} />,
    title: "Customer Support",
    description: "Contact you regarding orders or support queries",
  },
  {
    icon: <Settings className="text-pink-600" size={20} />,
    title: "Service Improvement",
    description: "Improve our products and customer service",
  },
  {
    icon: <Bell className="text-pink-600" size={20} />,
    title: "Marketing Communication",
    description:
      "Send updates, offers, or promotional messages (with your consent)",
  },
];

const userRights = [
  "Access your personal information",
  "Request correction of inaccurate data",
  "Request deletion of your personal information",
  "Opt out of promotional communications",
  "Disable cookies through browser settings",
];

export default function PrivacyPolicyPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            At Bongo Prime, we respect and protect your privacy. This
            policy explains how we collect, use, and safeguard your
            personal information.
          </p>
        </header>

        {/* Information We Collect */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Information We Collect
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 mb-6">
              We may collect the following information when you place
              an order or contact us:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataCollection.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              How We Use Your Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataUsage.map((use, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    {use.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {use.title}
                  </h3>
                </div>
                <p className="text-gray-600">{use.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Data Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Information Sharing
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-700 font-medium">
                  We do not sell, trade, or rent your personal
                  information to third parties.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-blue-700">
                  Information may be shared only with trusted delivery
                  partners and payment gateways for order fulfillment.
                </p>
              </div>
            </div>
          </section>

          {/* Right Column - Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Data Security
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Shield className="text-green-600" size={14} />
                  </div>
                  <p className="text-gray-700">
                    We implement reasonable security measures to
                    protect your personal information.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Lock className="text-green-600" size={14} />
                  </div>
                  <p className="text-gray-700">
                    Access to personal data is limited to authorized
                    personnel only.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Additional Sections - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Cookies */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Cookies & Tracking
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Our website may use cookies to enhance user experience
              and analyze website performance.
            </p>
            <p className="text-gray-700 text-sm">
              You can choose to disable cookies through your browser
              settings.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Link className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Third-Party Links
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Our website or social media pages may contain links to
              third-party websites.
            </p>
            <p className="text-gray-700 text-sm">
              Bongo Prime is not responsible for the privacy practices
              of those websites.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="text-blue-600" size={20} />
              <h3 className="font-semibold text-gray-900">
                Policy Updates
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Bongo Prime reserves the right to update or modify this
              Privacy Policy at any time.
            </p>
            <p className="text-gray-700 text-sm">
              Changes will be posted on this page with immediate
              effect.
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Rights
            </h2>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <p className="text-gray-700 mb-6">
              You have the right to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRights.map((right, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-100"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-gray-700">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Privacy Questions?
            </h2>
            <p className="text-gray-700 mb-8 max-w-md mx-auto">
              For any questions regarding this Privacy Policy, please
              contact us
            </p>

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

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
