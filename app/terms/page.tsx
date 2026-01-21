import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Terms of Service | 1031 Exchange Denver",
  description: "Terms of service for 1031 Exchange Denver",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Terms of Service" },
            ]}
            className="mb-8 text-sm"
          />
          <h1 className={`text-3xl tracking-wide text-white md:text-4xl ${playfair.className}`}>
            Terms of Service
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
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Educational Content Only
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The information provided on this website is for educational purposes only and does not constitute tax, legal, 
                or financial advice. You should consult with qualified tax advisors, attorneys, and financial professionals 
                before making any decisions regarding a 1031 exchange.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                No Professional Relationship
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Use of this website does not create a professional relationship between you and 1031 Exchange Denver. 
                Any information you provide through our contact forms does not create an attorney-client or tax advisor-client relationship.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                1031 Exchange Denver shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of or inability to use this website.
              </p>
            </div>

            <div className="border-t border-warm-brown/20 pt-12">
              <h2 className={`text-2xl text-gray-900 mb-4 ${playfair.className}`}>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms of Service, please contact us at{" "}
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


