import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import DepreciationRecaptureEstimator from "@/components/tools/DepreciationRecaptureEstimator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Depreciation Recapture Estimator | 1031 Exchange Denver",
  description: "Estimate depreciation recapture tax on your relinquished property sale. Calculate recapture tax and understand how 1031 exchanges can defer this tax in Denver, CO.",
  keywords: "depreciation recapture, 1031 exchange depreciation, Section 1250 gain, recapture tax calculator, Denver 1031 exchange, Colorado tax deferral",
  openGraph: {
    title: "Depreciation Recapture Estimator | 1031 Exchange Denver",
    description: "Estimate depreciation recapture tax and understand how 1031 exchanges can defer this tax. Free tool for Denver, CO investors.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
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
      name: "Depreciation Recapture Estimator",
      item: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Depreciation Recapture Estimator",
  applicationCategory: "FinanceApplication",
  description: "Estimate depreciation recapture tax on relinquished property and understand 1031 exchange deferral benefits",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
};

export default function DepreciationRecaptureEstimatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Depreciation Recapture Estimator" },
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
              Depreciation Recapture Estimator
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              Estimate depreciation recapture tax on your relinquished property sale. When you sell a rental property, 
              the IRS requires you to recapture depreciation deductions at a higher tax rate. A fully deferred 1031 exchange 
              can defer this recapture tax along with capital gains.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <DepreciationRecaptureEstimator />
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
                <Link href="/tools/replacement-property-value-calculator" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Replacement Property Value Calculator
                </Link>
              </li>
              <li>
                <Link href="/services/reporting-and-filing-support" className="text-warm-brown underline underline-offset-4 hover:text-dark-brown">
                  Reporting and Filing Support
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
