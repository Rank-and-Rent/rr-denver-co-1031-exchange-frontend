import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
        {/* Hero Section */}
        <section className="bg-warm-brown py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Tools", href: "/tools" },
                { label: "Boot Calculator" },
              ]}
              className="mb-8 text-sm"
            />
            <h1 className={`text-3xl tracking-wide text-white md:text-4xl ${playfair.className}`}>
              Boot Calculator
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              Calculate boot (cash received, mortgage relief, and non-like-kind property) and estimate tax implications for your 1031 exchange. Boot is the portion of your exchange proceeds that is taxable because it was not reinvested in like-kind property.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <BootCalculator />
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="border-l-4 border-warm-brown bg-cream p-6 text-sm text-gray-700">
              <strong className="text-gray-900">Educational content only.</strong> Not tax, legal, or investment advice. 
              Results are estimates only. Consult a qualified intermediary and tax advisor before 
              making decisions. Colorado does not impose a state real estate transfer tax. Recording fees 
              and title insurance premiums still apply.
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="border-t border-warm-brown/20 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <h2 className={`text-2xl text-gray-900 mb-6 ${playfair.className}`}>
              Related Resources
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/services/boot-calculation-analysis" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Boot Calculation Analysis Services
                </Link>
              </li>
              <li>
                <Link href="/services/qualified-intermediary-coordination" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Qualified Intermediary Coordination
                </Link>
              </li>
              <li>
                <Link href="/tools/exchange-cost-estimator" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Exchange Cost Estimator
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

