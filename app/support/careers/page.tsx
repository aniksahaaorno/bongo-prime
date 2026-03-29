import { Metadata } from "next";
import {
  Briefcase,
  Mail,
  Users,
  TrendingUp,
  Heart,
  Palette,
} from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Careers | Bongo Prime",
  description:
    "Join Bongo Prime's creative team. Explore opportunities in fashion, marketing, design, and e-commerce.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/careers",
  },
  openGraph: {
    title: "Careers | Bongo Prime",
    description:
      "Join our growing fashion team. Find opportunities in marketing, design, sales, and e-commerce operations.",
    url: "https://www.crabfashionbd.com/careers",
    siteName: "Bongo Prime",
    type: "website",
  },
};

const benefits = [
  {
    icon: <Users className="text-primary" size={24} />,
    title: "Dynamic Environment",
    description: "Fun, creative, and collaborative work culture",
  },
  {
    icon: <TrendingUp className="text-primary" size={24} />,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement",
  },
  {
    icon: <Heart className="text-primary" size={24} />,
    title: "Supportive Culture",
    description: "Team-oriented and inclusive workplace",
  },
  {
    icon: <Palette className="text-primary" size={24} />,
    title: "Creative Freedom",
    description: "Express your ideas in fashion and design",
  },
];

const opportunities = [
  "Marketing & Social Media",
  "Sales & Customer Service",
  "Graphic & Fashion Design",
  "Content Creation",
  "E-Commerce Operations",
  "Photography & Visual Merchandising",
];

export default function CareersPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Careers at Bongo Prime
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Join our team of creative, passionate individuals shaping
            the future of fashion
          </p>
        </header>

        {/* Intro Section */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Bongo Prime is always looking for creative, motivated,
              and passionate individuals to join our growing team. If
              you love fashion, digital innovation, and customer
              excellence, we'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Opportunities */}
        <section className="mb-20">
          <div className="bg-linear-to-br from-blue-50 to-sky-50 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-10">
              <Briefcase
                className="mx-auto text-primary mb-4"
                size={32}
              />
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Current Opportunities
              </h2>
              <p className="text-gray-600">
                We welcome applications for creative roles in fashion
                and e-commerce
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-pink-100 hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-gray-800 font-medium">
                        {role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-700 mb-6">
                  Don't see your dream role listed? Send us your CV
                  anyway — we're always open to talented people!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              📩 How to Apply
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-primary" size={24} />
                  <h3 className="font-semibold text-gray-900">
                    Send Your Application
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Please email your resume and portfolio (if any) to:
                </p>
                <a
                  href="mailto:careers@crabfashionbd.com"
                  className="text-lg font-medium text-primary hover:text-primary transition-colors break-all"
                >
                  careers@crabfashionbd.com
                </a>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  📍 Application Requirements
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Subject Line:</strong> Job Application —
                      [Position Name]
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Attachments:</strong> Resume/CV and
                      Portfolio (if applicable)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Note:</strong> We review every
                      application and will contact qualified
                      candidates
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="rounded-2xl bg-linear-to-r from-primary to-primary-foreground p-10 text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Join Our Fashion Journey?
            </h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Be part of a team that's redefining fashion e-commerce
              in Bangladesh
            </p>
            <a
              href="mailto:careers@crabfashionbd.com?subject=General%20Job%20Application%20-%20Crab%20Fashion"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-pink-50 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              <Mail size={20} />
              Send Your Resume
            </a>
          </div>
        </section>
      </main>
    </section>
  );
}
