import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ReplacementPropertyValueCalculator from "@/components/tools/ReplacementPropertyValueCalculator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Replacement Property Value Calculator | 1031 Exchange Denver",
  description: "Calculate the minimum replacement property value needed to defer all gain in your 1031 exchange. Plan your reinvestment strategy in Denver, CO.",
  keywords: "replacement property value, 1031 exchange calculator, minimum replacement value, equity reinvestment, Denver 1031 exchange, Colorado tax deferral",
  openGraph: {
    title: "Replacement Property Value Calculator | 1031 Exchange Denver",
    description: "Calculate minimum replacement property value needed to defer all gain in your 1031 exchange. Free tool for Denver, CO investors.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/replacement-property-value-calculator",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/replacement-property-value-calculator",
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
      name: "Replacement Property Value Calculator",
      item: "https://www.1031exchangedenver.com/tools/replacement-property-value-calculator",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Replacement Property Value Calculator",
  applicationCategory: "FinanceApplication",
  description: "Calculate minimum replacement property value needed to defer all gain in a 1031 exchange",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/replacement-property-value-calculator",
};

export default function ReplacementPropertyValueCalculatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Replacement Property Value Calculator" },
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
              Replacement Property Value Calculator
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              Calculate the minimum replacement property value needed to defer all gain in your 1031 exchange. 
              To achieve full tax deferral, you must reinvest all net proceeds and ensure the replacement property 
              value equals or exceeds the sale price of your relinquished property.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ReplacementPropertyValueCalculator />
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
                <Link href="/tools/boot-calculator" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Boot Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/debt-relief-calculator" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Debt Relief Calculator
                </Link>
              </li>
              <li>
                <Link href="/services/replacement-property-sourcing" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Replacement Property Sourcing Services
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
