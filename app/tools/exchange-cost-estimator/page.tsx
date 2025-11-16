import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";

export const metadata: Metadata = {
  title: "Exchange Cost Estimator | 1031 Exchange Denver",
  description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange in Denver, CO.",
  keywords: "1031 exchange costs, QI fees, escrow costs, title insurance, recording fees, Denver 1031 exchange, Colorado closing costs",
  openGraph: {
    title: "Exchange Cost Estimator | 1031 Exchange Denver",
    description: "Estimate total costs for your 1031 exchange including QI fees, escrow, title insurance, and recording fees.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/exchange-cost-estimator",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/exchange-cost-estimator",
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
      name: "Exchange Cost Estimator",
      item: "https://www.1031exchangedenver.com/tools/exchange-cost-estimator",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Exchange Cost Estimator",
  applicationCategory: "FinanceApplication",
  description: "Calculate QI fees, escrow costs, title insurance, and recording fees for 1031 exchanges",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/exchange-cost-estimator",
};

export default function ExchangeCostEstimatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Exchange Cost Estimator" },
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
          Exchange Cost Estimator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Calculate qualified intermediary fees, escrow costs, title insurance premiums, recording fees, and other closing costs for your 1031 exchange. Colorado does not impose a state-level transfer tax, but recording fees and title insurance premiums still apply.
        </p>

        <ExchangeCostEstimator />

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
              <Link href="/services/qualified-intermediary-coordination" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Qualified Intermediary Coordination
              </Link>
            </li>
            <li>
              <Link href="/services/due-diligence-coordination" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Due Diligence Coordination
              </Link>
            </li>
            <li>
              <Link href="/tools/boot-calculator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Boot Calculator
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

