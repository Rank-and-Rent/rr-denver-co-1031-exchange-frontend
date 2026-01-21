import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      <div className="bg-white">
        <section className="bg-warm-brown py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-8 text-sm" />
            <h1 className={`text-3xl tracking-wide text-white md:text-4xl ${playfair.className}`}>
              Exchange Cost Estimator
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              Calculate qualified intermediary fees, escrow costs, title insurance premiums, recording fees, and other closing costs for your 1031 exchange. Colorado does not impose a state-level transfer tax, but recording fees and title insurance premiums still apply.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ExchangeCostEstimator />
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
                <Link href="/services/qualified-intermediary-coordination" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Qualified Intermediary Coordination
                </Link>
              </li>
              <li>
                <Link href="/services/due-diligence-coordination" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Due Diligence Coordination
                </Link>
              </li>
              <li>
                <Link href="/tools/boot-calculator" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Boot Calculator
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
