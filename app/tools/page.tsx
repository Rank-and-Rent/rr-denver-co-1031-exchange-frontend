import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeadlineCalculator } from "@/components/tools/DeadlineCalculator";
import { IdentificationRulesExplainer } from "@/components/tools/IdentificationRulesExplainer";
import { IdentificationLetterHelper } from "@/components/tools/IdentificationLetterHelper";
import { TimelineTracker } from "@/components/tools/TimelineTracker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Tools | 1031 Exchange Denver",
  description: "Free 1031 exchange calculators and tools for Denver, CO investors. Calculate boot, estimate costs, validate identification rules, and more.",
  keywords: "1031 exchange tools, 1031 calculators, boot calculator, exchange cost estimator, identification rules checker, Denver 1031 exchange",
  openGraph: {
    title: "1031 Exchange Tools | 1031 Exchange Denver",
    description: "Free calculators and tools to help Denver, CO investors plan and execute compliant 1031 exchanges.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools",
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
  ],
};

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your exchange.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your replacement property identification against the 3-property, 200%, or 95% identification rules.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Depreciation Recapture Estimator",
    slug: "depreciation-recapture-estimator",
    description: "Estimate depreciation recapture tax on your relinquished property and understand how 1031 exchanges can defer this tax.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Replacement Property Value Calculator",
    slug: "replacement-property-value-calculator",
    description: "Calculate the minimum replacement property value needed to defer all gain in your 1031 exchange.",
    icon: "M3 18h18M3 10l9-6 9 6v8H3z",
  },
  {
    name: "Debt Relief Calculator",
    slug: "debt-relief-calculator",
    description: "Calculate mortgage boot when new debt is less than old debt and understand debt relief tax implications.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-warm-brown py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} className="mb-8 text-sm" />
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Exchange Calculators
              </p>
              <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
                1031 exchange tools
              </h1>
              <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
                Calculators and templates that keep deadlines, underwriting, and documentation
                organized. Every tool is educational. Confirm details with your intermediary,
                lender, attorney, and CPA.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-cream p-8 transition-all hover:bg-warm-brown"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-warm-brown/30 group-hover:border-white/30">
                    <svg
                      className="h-6 w-6 text-warm-brown group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                    </svg>
                  </div>
                  <h2 className={`text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                    {tool.name}
                  </h2>
                  <p className="mt-3 text-sm text-gray-600 group-hover:text-white/80">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown group-hover:text-white">
                    Launch tool
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded Tools Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6 md:px-8 space-y-8">
            <DeadlineCalculator />
            <TimelineTracker />
            <IdentificationRulesExplainer />
            <IdentificationLetterHelper />
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="border-l-4 border-warm-brown bg-cream p-6 text-sm text-gray-700">
              <strong className="text-gray-900">Educational content only.</strong> Not tax, legal, or investment advice.
              Results are estimates. Confirm every step with your Qualified Intermediary and advisors.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

