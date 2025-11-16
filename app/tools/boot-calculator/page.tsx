import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import BootCalculator from "@/components/tools/BootCalculator";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange Denver",
  description: "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange in Denver, CO.",
  keywords: "boot calculator, 1031 exchange boot, cash boot, mortgage boot, Denver 1031 exchange, Colorado tax deferral",
  openGraph: {
    title: "Boot Calculator | 1031 Exchange Denver",
    description: "Calculate boot and estimate tax implications for your 1031 exchange. Free tool for Denver, CO investors.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/boot-calculator",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/boot-calculator",
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
      name: "Boot Calculator",
      item: "https://www.1031exchangedenver.com/tools/boot-calculator",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boot Calculator",
  applicationCategory: "FinanceApplication",
  description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for 1031 exchanges",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/boot-calculator",
};

export default function BootCalculatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Boot Calculator" },
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
          Boot Calculator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Calculate boot (cash received, mortgage relief, and non-like-kind property) and estimate tax implications for your 1031 exchange. Boot is the portion of your exchange proceeds that is taxable because it was not reinvested in like-kind property.
        </p>

        <BootCalculator />

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
              <Link href="/services/boot-calculation-analysis" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Boot Calculation Analysis Services
              </Link>
            </li>
            <li>
              <Link href="/services/qualified-intermediary-coordination" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Qualified Intermediary Coordination
              </Link>
            </li>
            <li>
              <Link href="/tools/exchange-cost-estimator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Exchange Cost Estimator
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

