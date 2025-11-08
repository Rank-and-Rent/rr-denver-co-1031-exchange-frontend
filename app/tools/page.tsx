import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

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
];

export default function ToolsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools" },
  ];

  return (
    <>
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="mx-auto max-w-7xl px-6 pt-8 md:px-8" aria-label="Breadcrumb">
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
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          1031 Exchange Tools
        </h1>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl">
          Free calculators and tools to help Denver, CO investors plan and execute compliant 1031 exchanges. 
          Use these tools to estimate costs, calculate boot, validate identification rules, and more.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-center rounded-lg bg-[#0B3C5D]/10 p-3 w-fit">
                <svg
                  className="h-8 w-8 text-[#0B3C5D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={tool.icon}
                  />
                </svg>
              </div>
              <h2 className="mb-2 font-serif text-xl font-semibold text-[#0B3C5D] group-hover:text-[#C9A227] transition">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-700">
                {tool.description}
              </p>
              <div className="mt-4 text-sm font-semibold text-[#0B3C5D] group-hover:text-[#C9A227] transition">
                Use Tool →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. 
            Results are estimates only. Consult a qualified intermediary and tax advisor before 
            making decisions. Colorado does not impose a state real estate transfer tax. Recording fees 
            and title insurance premiums still apply.
          </p>
        </div>
      </div>
    </>
  );
}

