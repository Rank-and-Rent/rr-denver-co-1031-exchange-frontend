import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";

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
      <nav className="mx-auto max-w-4xl px-6 pt-8 md:px-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[#0B3C5D] hover:text-[#C9A227] transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          Identification Rules Checker
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Validate your replacement property identification against IRS identification rules. You must satisfy at least one of three rules: the 3-property rule, the 200% rule, or the 95% rule. This tool helps ensure your identification complies with IRS requirements.
        </p>

        <IdentificationRulesChecker />

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. 
            Results are estimates only. Consult a qualified intermediary and tax advisor before 
            making decisions. Colorado does not impose a state real estate transfer tax. Recording fees 
            and title insurance premiums still apply.
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Related Resources
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services/forty-five-day-identification-strategy" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Forty Five Day Identification Strategy
              </Link>
            </li>
            <li>
              <Link href="/services/replacement-property-identification" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Replacement Property Identification
              </Link>
            </li>
            <li>
              <Link href="/services/identification-rules-education" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Identification Rules Education
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

