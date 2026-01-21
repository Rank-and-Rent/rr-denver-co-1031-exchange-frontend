import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange Denver",
  description: "Validate your replacement property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges in Denver, CO.",
  keywords: "1031 identification rules, 3 property rule, 200 percent rule, 95 percent rule, Denver 1031 exchange, Colorado identification",
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange Denver",
    description: "Validate your replacement property identification against IRS identification rules. Free tool for Denver, CO investors.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/identification-rules-checker",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/identification-rules-checker",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.1031exchangedenver.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://www.1031exchangedenver.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Identification Rules Checker",
      item: "https://www.1031exchangedenver.com/tools/identification-rules-checker",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Identification Rules Checker",
  applicationCategory: "FinanceApplication",
  description: "Validate replacement property identification against IRS 3-property, 200%, and 95% rules",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/identification-rules-checker",
};

export default function IdentificationRulesCheckerPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Identification Rules Checker" },
  ];

  return (
    <>
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="jsonld-tool"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <div className="bg-white">
        <section className="bg-warm-brown py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-8 text-sm" />
            <h1 className={`text-3xl tracking-wide text-white md:text-4xl ${playfair.className}`}>
              Identification Rules Checker
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              Validate your replacement property identification against IRS identification rules. You must satisfy at least one of three rules: the 3-property rule, the 200% rule, or the 95% rule. This tool helps ensure your identification complies with IRS requirements.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <IdentificationRulesChecker />
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="border-l-4 border-warm-brown bg-cream p-6 text-sm text-gray-700">
              <strong>Educational content only.</strong> Not tax, legal, or investment advice. 
              Results are estimates only. Consult a qualified intermediary and tax advisor before 
              making decisions. Colorado does not impose a state real estate transfer tax. Recording fees 
              and title insurance premiums still apply.
            </div>
          </div>
        </section>

        <section className="border-t border-warm-brown/20 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <h2 className={`text-2xl text-gray-900 mb-6 ${playfair.className}`}>
              Related Resources
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/services/forty-five-day-identification-strategy" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Forty Five Day Identification Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/replacement-property-identification" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Replacement Property Identification
                </Link>
              </li>
              <li>
                <Link href="/services/identification-rules-education" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Identification Rules Education
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
