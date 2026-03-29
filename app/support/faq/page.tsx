import { Metadata } from "next";
import {
  ChevronDown,
  ShoppingCart,
  Truck,
  Clock,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "FAQs | Bongo Prime",
  description:
    "Find answers to common questions about orders, delivery, payments, returns, and more at Bongo Prime.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/faq",
  },
  openGraph: {
    title: "FAQs | Bongo Prime",
    description:
      "Get quick answers to frequently asked questions about shopping, delivery, returns, and customer support at Bongo Prime.",
    url: "https://www.crabfashionbd.com/faq",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const faqCategories = [
  {
    id: "ordering",
    title: "Ordering & Shopping",
    icon: <ShoppingCart className="text-blue-600" size={20} />,
    faqs: [
      {
        question: "How can I place an order?",
        answer:
          "You can place an order through multiple channels: 1) Our official website, 2) Facebook page, 3) By contacting us directly via WhatsApp, or 4) By calling our customer support. All methods provide the same secure shopping experience.",
      },
      {
        question: "What if I need help choosing products?",
        answer:
          "Our customer support team is available to assist you with product selection, sizing advice, and styling recommendations. Feel free to contact us via WhatsApp for personalized assistance.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Shipping",
    icon: <Truck className="text-blue-600" size={20} />,
    faqs: [
      {
        question: "Do you deliver all over Bangladesh?",
        answer:
          "Yes, we deliver nationwide across Bangladesh using reliable courier services. We cover all major cities and rural areas through our network of trusted delivery partners.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery times vary by location: • Inside Dhaka: 1–3 working days • Outside Dhaka: 3–5 working days Please note that delivery times may vary during holidays, festivals, or due to unforeseen circumstances.",
      },
      {
        question: "What are the shipping charges?",
        answer:
          "Shipping charges depend on your location and the total weight/dimensions of your order. The exact shipping cost will be calculated and displayed before you confirm your order. We strive to keep shipping rates competitive and transparent.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order is shipped, we'll send you a tracking number via SMS/email. You can use this to track your package's journey in real-time.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Methods",
    icon: <CreditCard className="text-blue-600" size={20} />,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We offer multiple secure payment options: • Cash on Delivery (COD) • bKash / Nagad / Rocket • Bank transfer (for advance payments) All digital payments are processed through secure gateways to ensure your financial safety.",
      },
      {
        question: "Is Cash on Delivery available everywhere?",
        answer:
          "Yes, Cash on Delivery is available for all locations within Bangladesh. There are no additional charges for COD orders.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: <RotateCcw className="text-blue-600" size={20} />,
    faqs: [
      {
        question: "Can I return or exchange a product?",
        answer:
          "Yes, we offer return or exchange within 7 days of delivery, subject to our Return & Exchange Policy. The product must be unused, unwashed, and in original condition with all tags attached.",
      },
      {
        question:
          "Which items are not eligible for return or refund?",
        answer:
          "The following items are not eligible: • Discounted/sale items • Innerwear and accessories • Customized/personalized products • Items damaged due to customer misuse • Products without original tags and packaging",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Approved refunds are processed within 7–10 working days after the returned product has been received and inspected by our quality team. Refunds are issued via the original payment method.",
      },
      {
        question: "What if I receive a damaged or wrong product?",
        answer:
          "Please contact us immediately within 24 hours of delivery. Send clear photos/videos of the issue to our support team via WhatsApp or email. We will arrange for a replacement or refund once verified.",
      },
    ],
  },
  {
    id: "product",
    title: "Product Information",
    icon: <AlertTriangle className="text-blue-600" size={20} />,
    faqs: [
      {
        question:
          "Will the product color be exactly the same as shown?",
        answer:
          "Slight color variations may occur due to differences in lighting conditions and screen resolutions. This is normal and not considered a defect. For color accuracy, please refer to multiple product photos from different angles.",
      },
      {
        question: "How do I know my correct size?",
        answer:
          "We provide detailed size charts for all clothing items. Please refer to the specific product's size guide and measure yourself according to the instructions. If unsure, our customer support can help you choose the right size.",
      },
      {
        question: "Are your products original?",
        answer:
          "Yes! All products sold by Bongo Prime are 100% authentic and sourced directly from authorized suppliers and brands.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & Support",
    icon: <MessageCircle className="text-blue-600" size={20} />,
    faqs: [
      {
        question: "How can I contact Bongo Prime?",
        answer:
          "You can reach us through multiple channels: • Email: crabfashion@gmail.com • Phone/WhatsApp: +880 1706 310 521 • Facebook Messenger: @crabfashion • Business Hours: Sat-Thu, 10:00 AM – 8:00 PM",
      },
      {
        question: "What are your customer support hours?",
        answer:
          "Our support team is available Saturday through Thursday from 10:00 AM to 8:00 PM. Messages received outside these hours will be responded to on the next working day.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Find quick answers to common questions about shopping with
            Crab Fashion
          </p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-3">
            Type keywords like "delivery", "return", "payment" to find
            specific answers
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section
              key={category.id}
              className="scroll-mt-20"
              id={category.id}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 rounded-xl hover:border-blue-200 transition-all duration-200"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                        <span className="font-medium text-gray-900 group-open:text-blue-700 transition-colors">
                          {faq.question}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Quick Contact Section */}
        <section className="mt-20">
          <div className="bg-linear-to-br from-blue-50 to-rose-50 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team
                is ready to help you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Email Support */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email Support
                    </h3>
                    <p className="text-sm text-gray-600">
                      24-hour response
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:crabfashion@gmail.com"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  crabfashion@gmail.com
                </a>
              </div>

              {/* WhatsApp Support */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MessageCircle
                      className="text-blue-600"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      WhatsApp Chat
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
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  +880 1706 310 521
                </a>
              </div>
            </div>

            {/* Support Hours */}
            <div className="max-w-md mx-auto mt-8">
              <div className="bg-white/80 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-900">
                    Support Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Saturday – Thursday
                    </span>
                    <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg">
                      10:00 AM – 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-16">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Need More Information?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/support/contact"
                className="px-6 py-3 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/support/help-center"
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Help Center
              </Link>
              <Link
                href="/support/privacy-policy"
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Our Policies
              </Link>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
