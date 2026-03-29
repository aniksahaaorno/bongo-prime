import { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SupportNav } from "../components/supportNavbar";

export const metadata: Metadata = {
  title: "Contact Us | Bongo Prime",
  description:
    "Get in touch with Bongo Prime. Contact us for support, inquiries, or feedback.",
  alternates: {
    canonical: "https://www.crabfashionbd.com/support/contact",
  },
  openGraph: {
    title: "Contact Us | Bongo Prime",
    description:
      "Reach out to Bongo Prime for customer support, order inquiries, or general feedback.",
    url: "https://www.crabfashionbd.com/support/contact",
    siteName: "Bongo Prime",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Minimal Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
            We're here to help. Reach out to us for any inquiries or
            support.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions or need assistance? Our team is ready
                to help you with any inquiries about our services.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Government Officers & Employees Housing,
                    <br />
                    Paikpara, Mirpur-1,
                    <br />
                    Building No. 2, Shitalakhya,
                    <br />
                    Level 6, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+8801921617705"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    +880 1921 617 705
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:crabfashion@gmail.com"
                    className="text-gray-600 hover:text-primary transition-colors break-all"
                  >
                    crabfashion@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10">
              <div className="h-48 rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.041906482149!2d90.34653911466627!3d23.800440141116816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1f63ed9572b%3A0x61a9a38fdfc63777!2sGovernment%20Employees%20Housing%2C%20Mirpur-1!5e0!3m2!1sen!2sbd!4v1769496605056!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Send a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as
              soon as possible.
            </p>

            <form
              action="/api/contact"
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-foreground text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Business Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-gray-600">
                <p className="font-medium">Weekdays</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Saturday</p>
                <p>10:00 AM - 4:00 PM</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Sunday</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
