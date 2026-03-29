import { Metadata } from "next";
import {
  FileText,
  Scale,
  Package,
  CreditCard,
  Truck,
  RefreshCw,
  Shield,
  AlertCircle,
  Mail,
  Globe,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Terms and Conditions | Bongo Prime",
  description:
    "Read the Terms and Conditions for Bongo Prime. Understand our policies, return guidelines, and conditions for using our premium clothing services.",
  alternates: {
    canonical: "https://www.crab-fashion.com/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Bongo Prime",
    description:
      "Terms, conditions, and policies governing the use of Bongo Prime website and premium clothing services.",
    url: "https://www.crab-fashion.com/terms-and-conditions",
    siteName: "Bongo Prime",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-rose-100 to-pink-100 mb-6">
            <FileText className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Terms & Conditions | শর্তাবলি
          </h1>
          <p className="text-sm text-gray-500">
            সর্বশেষ আপডেট: জানুয়ারি ২০২৬
          </p>
          <div className="mt-6 p-4 bg-linear-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
            <p className="text-gray-700">
              Bongo Prime ওয়েবসাইটে স্বাগতম। ওয়েবসাইট ব্যবহার করার
              মাধ্যমে আপনি নিচের শর্তাবলিতে সম্মত হচ্ছেন।
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Terms & Conditions */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <Scale className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Terms & Conditions
              </h2>
            </div>

            <div className="space-y-7">
              {/* Section 1 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ১. সাধারণ শর্ত
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Bongo Prime যেকোনো সময় শর্তাবলি পরিবর্তন বা
                      আপডেট করার অধিকার সংরক্ষণ করে। পরিবর্তনের পর
                      ওয়েবসাইট ব্যবহার করলে তা স্বয়ংক্রিয়ভাবে
                      গ্রহণযোগ্য বলে গণ্য হবে।
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ২. পণ্য ও মূল্য
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      পণ্যের মূল্য, বিবরণ ও স্টক যেকোনো সময় পরিবর্তন
                      হতে পারে। ডিভাইস বা স্ক্রিন সেটিংসের কারণে
                      পণ্যের রঙে সামান্য পার্থক্য হতে পারে।
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৩. অর্ডার ও পেমেন্ট
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>
                        অর্ডার কনফার্ম হওয়ার পর তা বাতিল করা যাবে না।
                      </li>
                      <li>
                        স্টক সমস্যা, মূল্য ভুল বা সন্দেহজনক লেনদেনের
                        ক্ষেত্রে Bongo Prime অর্ডার বাতিলের অধিকার
                        রাখে।
                      </li>
                      <li>
                        অনুমোদিত পেমেন্ট মেথডের মাধ্যমেই পেমেন্ট
                        সম্পন্ন করতে হবে।
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৪. ডেলিভারি
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      ডেলিভারি সময় এলাকা ও কুরিয়ার সার্ভিসের উপর
                      নির্ভরশীল। প্রাকৃতিক দুর্যোগ বা কুরিয়ারজনিত
                      দেরির জন্য Bongo Prime দায়ী নয়।
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৫. কপিরাইট
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      ওয়েবসাইটের সকল কনটেন্ট (লোগো, ছবি, লেখা,
                      ডিজাইন) CRAB Fashion এর সম্পত্তি। অনুমতি ছাড়া
                      ব্যবহার আইনত দণ্ডনীয়।
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৬. গ্রাহকের দায়িত্ব
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      সঠিক ঠিকানা প্রদান করা গ্রাহকের দায়িত্ব। ভুল
                      ঠিকানার কারণে পণ্য হারালে Bongo Prime দায়ী
                      থাকবে না।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column - Return & Refund Policy */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <RefreshCw className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Return & Refund Policy | রিটার্ন ও রিফান্ড নীতি
              </h2>
            </div>

            <div className="space-y-7">
              {/* Section 1 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ১. রিটার্নের শর্তাবলী
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>
                        পণ্য পাওয়ার ৩ দিনের মধ্যে রিটার্ন করতে হবে।
                      </li>
                      <li>
                        পণ্য অবশ্যই অব্যবহৃত, অপরিষ্কারহীন এবং ট্যাগসহ
                        থাকতে হবে।
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ২. রিটার্ন প্রযোজ্য নয়
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>
                        ডিসকাউন্ট বা সেল আইটেম রিটার্নযোগ্য নয়।
                      </li>
                      <li>
                        ইনারওয়্যার, কাস্টমাইজড ও ক্লিয়ারেন্স পণ্য
                        রিটার্ন হবে না।
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৩. রিটার্ন প্রক্রিয়া
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>
                        রিটার্নের আগে আমাদের অফিসিয়াল নম্বর বা ইমেইলে
                        যোগাযোগ করতে হবে।
                      </li>
                      <li>
                        পূর্ব অনুমতি ছাড়া পাঠানো পণ্য গ্রহণ করা হবে
                        না।
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৪. রিফান্ড নীতি
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>
                        শুধুমাত্র ভুল বা ডিফেক্টিভ পণ্যের ক্ষেত্রে
                        রিফান্ড প্রযোজ্য।
                      </li>
                      <li>
                        রিফান্ড মূল পেমেন্ট মেথড বা স্টোর ক্রেডিটে
                        দেওয়া হতে পারে।
                      </li>
                      <li>ডেলিভারি চার্জ ফেরতযোগ্য নয়।</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="group p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ৫. এক্সচেঞ্জ
                    </h3>
                    <ul className="text-gray-700 space-y-2 pl-1 list-disc list-inside">
                      <li>স্টক থাকা সাপেক্ষে এক্সচেঞ্জ করা যাবে।</li>
                      <li>
                        Bongo Prime এর ভুল না হলে রিটার্ন কুরিয়ার খরচ
                        গ্রাহককে বহন করতে হবে।
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-8 p-6 rounded-xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      গুরুত্বপূর্ণ নোট
                    </h4>
                    <p className="text-gray-700">
                      Bongo Prime রিটার্ন, রিফান্ড ও এক্সচেঞ্জ বিষয়ে
                      চূড়ান্ত সিদ্ধান্ত নেওয়ার অধিকার সংরক্ষণ করে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                আরো তথ্য প্রয়োজন?
              </h3>
              <p className="text-gray-700">
                আমাদের শর্তাবলি বা রিটার্ন নীতি সম্পর্কে আপনার কোন
                প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@crabfashion.com"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-medium">
                  support@crabfashion.com
                </span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">যোগাযোগ করুন</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
