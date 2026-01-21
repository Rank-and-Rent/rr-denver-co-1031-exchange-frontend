import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Privacy Policy | 1031 Exchange Denver",
  description: "Privacy policy for 1031 Exchange Denver",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
            className="mb-8 text-sm"
          />
          <h1 className={`text-3xl tracking-wide text-white md:text-4xl ${playfair.className}`}>
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="space-y-12">
            <div>
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information that you provide directly to us, including when you fill out our contact form, 
                request a consultation, or communicate with us. This may include your name, email address, phone number, 
                and information about your 1031 exchange needs.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect to respond to your inquiries, provide our services, 
                send you relevant information about 1031 exchanges, and improve our services.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information 
                with service providers who assist us in operating our website and conducting our business, 
                as long as those parties agree to keep this information confidential.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:team@1031exchangedenver.com" className="text-warm-brown hover:text-dark-brown underline underline-offset-4">
                  team@1031exchangedenver.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


