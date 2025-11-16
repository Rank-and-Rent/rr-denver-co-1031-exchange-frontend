import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";
import React from "react";
import { Inter, Lora } from "next/font/google";
import { RevealSection } from "@/components/RevealSection";
import { LeadForm } from "@/components/LeadForm";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

type Feature = {
  title: string;
  description: string;
  href: string;
};

type CardItem = {
  title: string;
  description: string;
  slug: string;
};

type CoverageItem = {
  name: string;
  description: string;
  slug: string;
};

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";
const BRAND_NAME = "1031 Exchange Denver";
const CO_TRANSFER_TAX_LINK =
  "https://cdola.colorado.gov/real-estate-transfer-tax";
const IRS_FORM_8824_LINK = "https://www.irs.gov/forms-pubs/about-form-8824";
const IRS_LIKE_KIND_LINK =
  "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips";
const IRS_REV_PROC_2008_16_LINK =
  "https://www.irs.gov/pub/irs-drop/rp-08-16.pdf";

const WHY_CHOOSE_FEATURES: Feature[] = [
  {
    title: "Colorado-specific 1031 knowledge",
    description:
      "Advisors trained on Colorado statutes, local transfer protocols, and state filings that complement federal guidance.",
    href: "#why-choose",
  },
  {
    title: "Denver tax and real-estate experience",
    description:
      "Market intelligence drawn from Denver metro transactions, cap rates, and appreciation trends for precise reinvestment planning.",
    href: "#why-choose",
  },
  {
    title: "Qualified intermediary network",
    description:
      "Curated relationships with bonded, insured qualified intermediaries positioned across Colorado for compliant escrow handling.",
    href: "#why-choose",
  },
  {
    title: "Attorney and CPA coordination",
    description:
      "Integrated review cycles with real-estate counsel and tax advisors to align purchase agreements and reporting packages.",
    href: "#why-choose",
  },
  {
    title: "Precise timeline and reporting discipline",
    description:
      "Deadline surveillance, milestone alerts, and Form 8824 documentation assembled for submission-ready accuracy.",
    href: "#why-choose",
  },
];

const TOP_SERVICES: CardItem[] = [
  {
    title: "Exchange Strategy Planning",
    description:
      "Design a compliant 1031 exchange blueprint with basis analysis, gain estimates, and intermediary selection.",
    slug: "exchange-strategy-planning",
  },
  {
    title: "Replacement Property Sourcing",
    description:
      "Source and vet Colorado replacement assets aligned with debt requirements, lease stability, and identification rules.",
    slug: "replacement-property-sourcing",
  },
  {
    title: "Qualified Intermediary Oversight",
    description:
      "Coordinate escrow instructions, assignment documentation, and fund disbursement checkpoints with your QI.",
    slug: "qualified-intermediary-oversight",
  },
  {
    title: "Timeline Compliance Tracking",
    description:
      "Monitor 45-day and 180-day targets with milestone reminders, contingency planning, and executive status updates.",
    slug: "timeline-compliance-tracking",
  },
  {
    title: "Due Diligence Coordination",
    description:
      "Organize inspections, environmental reviews, and lender deliverables to keep Colorado closings efficient.",
    slug: "due-diligence-coordination",
  },
  {
    title: "Reporting and Filing Support",
    description:
      "Assemble transaction summaries, expense logs, and Form 8824 data for streamlined CPA handoff.",
    slug: "reporting-and-filing-support",
  },
];

const PROPERTY_TYPES: CardItem[] = [
  {
    title: "Multifamily Assets",
    description:
      "Stabilize income with Denver and Front Range apartments while deferring capital gains across unit portfolios.",
    slug: "multifamily",
  },
  {
    title: "Industrial Flex",
    description:
      "Reposition proceeds into logistics and flex space serving Colorado’s manufacturing and aerospace sectors.",
    slug: "industrial",
  },
  {
    title: "Medical Office",
    description:
      "Capture long-term tenancy with healthcare providers anchored in high-growth Colorado corridors.",
    slug: "medical-office",
  },
  {
    title: "Retail Centers",
    description:
      "Leverage consumer traffic in urban and mountain gateway retail with tailored NOI expectations.",
    slug: "retail",
  },
  {
    title: "Hospitality and Resort",
    description:
      "Evaluate boutique hotels and resort properties that align with safe harbor use standards.",
    slug: "hospitality",
  },
  {
    title: "Agricultural Land",
    description:
      "Exchange into irrigated cropland and ranch assets with conservation-minded yield strategies.",
    slug: "agricultural",
  },
];

const CO_CITIES_SLUGS: CoverageItem[] = [
  {
    name: "Denver",
    description:
      "Headquartered guidance for metro Denver exchanges, from Cherry Creek to the Tech Center.",
    slug: "denver",
  },
  {
    name: "Boulder",
    description:
      "Investor support for Boulder County assets with university and innovation-driven demand.",
    slug: "boulder",
  },
  {
    name: "Colorado Springs",
    description:
      "Military, aerospace, and logistics asset planning across El Paso County markets.",
    slug: "colorado-springs",
  },
  {
    name: "Fort Collins",
    description:
      "Northern Colorado opportunities balanced between CSU growth and technology tenants.",
    slug: "fort-collins",
  },
  {
    name: "Pueblo",
    description:
      "Industrial corridor repositioning with access to I-25 distribution and rail infrastructure.",
    slug: "pueblo",
  },
];

const FAQ_ENTRIES = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "The IRS allows 45 calendar days from the sale closing to identify potential replacement properties and 180 calendar days from the sale closing to complete the acquisition of selected replacements. Missing either deadline disqualifies the exchange.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Like-kind real property covers investment or business real estate held within the United States, including land, improved assets, and long-term leaseholds. Personal property and inventory do not qualify.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot refers to cash or non-like-kind property received in an exchange. Boot is recognized as taxable income to the extent of gain realized, including mortgage relief not replaced.",
  },
  {
    question: "Do I owe transfer taxes in Colorado?",
    answer:
      "Colorado does not impose a state-level transfer tax, but counties and municipalities may assess documentary or recording fees that remain payable even within a 1031 exchange.",
  },
  {
    question: "Can I complete a reverse exchange?",
    answer:
      "Yes. A reverse exchange requires parking arrangements and a qualified exchange accommodation agreement that complies with IRS Revenue Procedure 2000-37 timelines.",
  },
  {
    question: "How do I report using IRS Form 8824?",
    answer:
      "Form 8824 reports relinquished and replacement property details, timelines, basis calculations, and any recognized gain. Most investors file it with their federal return for the tax year in which the exchange closes.",
  },
];


const IconOutline: React.FC<{
  title: string;
  path: string;
}> = ({ title, path }) => (
  <svg
    aria-hidden="true"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    className="h-10 w-10 text-[#DAA520]"
  >
    <title>{title}</title>
    <path
      d={path}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const metadata: Metadata = {
  title: "Denver 1031 Exchange Experts | Colorado Qualified Intermediary Network",
  description:
    "Trusted 1031 exchange guidance for Colorado investors. Denver-based intermediary coordination, attorney review, and timeline management for compliant tax deferral.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/",
  },
  openGraph: {
    title: "Denver 1031 Exchange Experts",
    description:
      "Colorado 1031 exchange specialists offering full compliance support, intermediary coordination, and local attorney partnerships.",
    url: "https://www.1031exchangedenver.com/",
    siteName: "1031 Exchange Denver",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver 1031 Exchange Experts",
    description:
      "Defer capital gains taxes with a compliant 1031 exchange in Colorado. Local guidance, legal review, and precise deadline tracking.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: "https://www.1031exchangedenver.com/",
  logo: "https://www.1031exchangedenver.com/logo.svg",
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    addressRegion: "CO",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/1031-exchange-denver",
    "https://maps.google.com/?cid=1031",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange Denver",
  url: "https://www.1031exchangedenver.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.1031exchangedenver.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ENTRIES.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const skylineSvg =
  "data:image/svg+xml,%3Csvg width='1200' height='400' viewBox='0 0 1200 400' xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='g' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2316324F' stop-opacity='0.25'/%3E%3Cstop offset='100%25' stop-color='%23FFFFFF' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cpath d='M0 260 L80 220 L140 240 L200 180 L260 210 L320 160 L380 200 L440 150 L520 210 L580 170 L640 240 L720 190 L780 220 L860 200 L920 240 L980 210 L1060 250 L1120 220 L1200 260 L1200 400 L0 400 Z' fill='url(%23g)'/%3E%3C/svg%3E";

const gradientOverlay =
  "bg-[radial-gradient(circle_at_20%_20%,rgba(218,165,32,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.22),transparent_60%)]";

export default function Page() {
  const sections = [
    { id: "why-choose" },
    { id: "how-it-works" },
    { id: "services" },
    { id: "property-types" },
    { id: "coverage" },
    { id: "tools" },
    { id: "resources" },
    { id: "faq" },
    { id: "lead-form-section" },
  ];

  return (
    <>
      <Script
        id="jsonld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <a
        href="#main"
        className="absolute left-4 top-4 z-50 inline-flex h-10 -translate-y-12 items-center rounded-full bg-white px-4 text-sm font-semibold text-[#16324F] shadow-md outline-none transition focus:translate-y-0 focus:ring-2 focus:ring-[#16324F]"
      >
        Skip to main content
      </a>
      <div className={`bg-white ${inter.className} text-gray-900`}>
        <header className="bg-[#F8FAFB]">
          <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8`}>
            <div className="flex flex-col gap-1">
              <span className={`text-xs font-semibold tracking-[0.28em] text-[#16324F]`}>
                ROCKY MOUNTAIN EQUITY
              </span>
              <p className={`text-xl font-semibold text-[#16324F] ${lora.className}`}>
                {BRAND_NAME}
              </p>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm font-medium text-gray-700 transition hover:text-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  {section.id
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`tel:${PHONE_TEL}`}
                className="hidden rounded-full border border-[#16324F] px-4 py-2 text-sm font-semibold text-[#16324F] transition hover:bg-[#16324F] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F] md:inline-flex"
              >
                Call {PHONE_DISPLAY}
              </Link>
              <Link
                href="#lead-form"
                className="inline-flex items-center rounded-full bg-[#DAA520] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-gray-900 transition hover:bg-[#c4911b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
              >
                START REQUEST
              </Link>
            </div>
          </div>
        </header>
        <main id="main">
          <section className="relative overflow-hidden bg-[#F8FAFB]">
            <div
              className={`mx-auto flex max-w-7xl flex-col gap-14 rounded-3xl bg-gradient-to-br from-[#16324F] via-[#1f4570] to-white px-6 py-20 md:px-8 md:py-28 ${gradientOverlay}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
                style={{
                  backgroundImage: `url("${skylineSvg}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center bottom",
                }}
              />
              <div className="relative flex flex-col gap-8 text-white">
                <div className="inline-flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#DAA520]" />
                  <span className="text-xs uppercase tracking-[0.38em]">
                    Elevated Colorado Guidance
                  </span>
                </div>
                <h1
                  className={`max-w-3xl text-4xl leading-tight md:text-5xl ${lora.className}`}
                >
                  Denver 1031 Exchange Experts
                </h1>
                <p className="max-w-2xl text-lg text-slate-100 md:text-xl">
                  Investors have 45 days to identify replacement properties and 180 days to close. Local advisory keeps every Colorado deadline, intermediary instruction, and closing file on schedule.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-gray-900 transition hover:bg-[#c4911b] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#16324F] focus-visible:ring-offset-transparent"
                  >
                    CALL {PHONE_DISPLAY}
                  </Link>
                  <Link
                    href="#lead-form"
                    className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DAA520] focus-visible:ring-offset-[#16324F]"
                  >
                    START MY EXCHANGE
                  </Link>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">
                  45 Day identification. 180 Day closing. We help you stay compliant.
                </p>
              </div>
              <div className="relative grid gap-8 rounded-3xl bg-white/10 p-6 backdrop-blur-sm sm:grid-cols-3">
                {["CPA Alliance", "Attorney Review", "Qualified Intermediary"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white"
                    >
                      {badge}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <section
            id="why-choose"
            className="bg-white py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Why Choose {BRAND_NAME}
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Colorado 1031 exchange guidance engineered for precise compliance and investor confidence.
                </h2>
                <p className="max-w-3xl text-lg text-gray-700">
                  Our Denver-based team integrates tax law interpretation, real estate underwriting, and transaction management to coordinate every qualified intermediary, attorney, and lender partner across Colorado.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {WHY_CHOOSE_FEATURES.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <IconOutline
                        title={feature.title}
                        path="M4 12h16M12 4v16M6 18l-2 2M18 6l2-2"
                      />
                      <p className={`text-lg font-semibold text-[#16324F] ${lora.className}`}>
                        {feature.title}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {feature.description}
                    </p>
                    <Link
                      href={feature.href}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      Learn more
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="rounded-2xl border border-slate-200 bg-[#F8FAFB] p-6 md:p-8">
                <p className="text-sm text-gray-700">
                  A 1031 exchange defers federal and Colorado state income tax on qualifying real property. It does not remove county transfer or recording fees.{" "}
                  <Link
                    href={CO_TRANSFER_TAX_LINK}
                    className="font-semibold text-[#16324F] underline underline-offset-4"
                  >
                    Review Colorado transfer fee guidance
                  </Link>
                  .
                </p>
              </RevealSection>
            </div>
          </section>

          <section
            id="how-it-works"
            className="bg-[#F8FAFB] py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  How a 1031 Works
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Structure every phase of the exchange with documented reporting and partner oversight.
                </h2>
                <p className="max-w-3xl text-lg text-gray-700">
                  We synchronize relinquished property sale activities, qualified intermediary assignments, and replacement closings to maintain Colorado compliance throughout the 180-day lifecycle.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Sell the relinquished property",
                    description:
                      "Execute sale agreements, assign them to your qualified intermediary, and ensure proceeds flow directly into escrow.",
                    link: IRS_FORM_8824_LINK,
                  },
                  {
                    title: "Identify replacements within 45 days",
                    description:
                      "Document up to three properties or more under the 200 percent rule with traceable delivery to all parties.",
                    link: IRS_LIKE_KIND_LINK,
                  },
                  {
                    title: "Close within 180 days",
                    description:
                      "Complete financing, due diligence, and closing statements before the IRS deadline to secure tax deferral.",
                    link: IRS_FORM_8824_LINK,
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="flex h-full flex-col gap-4 rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <IconOutline
                      title={step.title}
                      path="M5 12h14M5 6h14M5 18h14"
                    />
                    <p className={`text-xl font-semibold text-[#16324F] ${lora.className}`}>
                      {step.title}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {step.description}
                    </p>
                    <Link
                      href={step.link}
                      className="mt-auto inline-flex text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      IRS Guidance
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="rounded-2xl border border-[#16324F]/15 bg-white p-6 md:p-8">
                <p className="text-sm text-gray-700">
                  Vacation and mixed-use properties may qualify under Rev. Proc. 2008-16 safe harbor.{" "}
                  <Link
                    href={IRS_REV_PROC_2008_16_LINK}
                    className="font-semibold text-[#16324F] underline underline-offset-4"
                  >
                    Review IRS Rev. Proc. 2008-16
                  </Link>
                  .
                </p>
              </RevealSection>
            </div>
          </section>

          <section
            id="services"
            className="bg-white py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Services Preview
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Services designed for Colorado exchanges, from planning through final reporting.
                </h2>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TOP_SERVICES.map((service) => (
                  <div
                    key={service.slug}
                    className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <IconOutline
                        title={service.title}
                        path="M4 12l8-8 8 8-8 8-8-8z"
                      />
                      <h3 className={`text-lg font-semibold text-[#16324F] ${lora.className}`}>
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      View service
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="flex justify-end">
                <Link
                  href="/services"
                  className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  See all services
                </Link>
              </RevealSection>
            </div>
          </section>

          <section
            id="property-types"
            className="bg-[#F8FAFB] py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Property Types
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Target the Colorado property classes that align with your reinvestment strategy.
                </h2>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map((property) => (
                  <div
                    key={property.slug}
                    className="flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <IconOutline
                        title={property.title}
                        path="M3 18h18M3 10l9-6 9 6v8H3z"
                      />
                      <h3 className={`text-lg font-semibold text-[#16324F] ${lora.className}`}>
                        {property.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {property.description}
                    </p>
                    <Link
                      href={`/property-types/${property.slug}`}
                      className="mt-auto inline-flex text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      Explore type
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="flex justify-end">
                <Link
                  href="/property-types"
                  className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  Explore property types
                </Link>
              </RevealSection>
            </div>
          </section>

          <section
            id="coverage"
            className="bg-white py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Colorado Coverage
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Statewide 1031 exchange coverage with Denver metro specialization.
                </h2>
                <p className="max-w-3xl text-lg text-gray-700">
                  From the Front Range to the Arkansas Valley, the Rocky Mountain Equity network coordinates qualified intermediaries, attorneys, and local brokers to keep your exchange compliant and on schedule.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {CO_CITIES_SLUGS.map((city) => (
                  <div
                    key={city.slug}
                    className="flex h-full flex-col rounded-2xl border border-gray-200/60 bg-[#F8FAFB] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <IconOutline
                        title={city.name}
                        path="M12 2l7 4v6c0 5.25-3.75 10.5-7 12-3.25-1.5-7-6.75-7-12V6l7-4z"
                      />
                      <h3 className={`text-lg font-semibold text-[#16324F] ${lora.className}`}>
                        {city.name}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {city.description}
                    </p>
                    <Link
                      href={`/locations/${city.slug}`}
                      className="mt-4 inline-flex text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      See location
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="flex justify-end">
                <Link
                  href="/locations"
                  className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  See locations
                </Link>
              </RevealSection>
            </div>
          </section>

          <section
            id="tools"
            className="bg-white py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Exchange Tools
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Free calculators and tools to help you plan your 1031 exchange.
                </h2>
                <p className="max-w-3xl text-lg text-gray-700">
                  Use our interactive tools to calculate boot, estimate exchange costs, validate identification rules, and more.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Boot Calculator",
                    description:
                      "Calculate boot (cash received, mortgage relief) and estimate tax implications for your exchange.",
                    href: "/tools/boot-calculator",
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    title: "Exchange Cost Estimator",
                    description:
                      "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs.",
                    href: "/tools/exchange-cost-estimator",
                    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                  },
                  {
                    title: "Identification Rules Checker",
                    description:
                      "Validate your replacement property identification against the 3-property, 200%, or 95% rules.",
                    href: "/tools/identification-rules-checker",
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-2xl border border-gray-200/60 bg-gradient-to-br from-[#16324F] to-[#1f4570] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 flex items-center justify-center rounded-lg bg-white/10 p-3 w-fit">
                      <svg
                        className="h-10 w-10 text-[#DAA520]"
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
                    <h3 className={`mb-2 text-2xl font-semibold ${lora.className}`}>
                      {tool.title}
                    </h3>
                    <p className="text-gray-100">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </RevealSection>
              <RevealSection className="flex justify-end">
                <Link
                  href="/tools"
                  className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  View All Tools
                </Link>
              </RevealSection>
            </div>
          </section>

          <section
            id="resources"
            className="bg-[#F8FAFB] py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Capital Gains Estimator",
                    description:
                      "Model potential capital gains exposure and evaluate the deferral impact before you list.",
                    href: "/resources/calculator",
                  },
                  {
                    title: "Timeline Reminders",
                    description:
                      "Subscribe to 45-day identification and 180-day closing alerts tailored to your transaction milestones.",
                    href: "/resources/timeline",
                  },
                ].map((resource) => (
                  <div
                    key={resource.href}
                    className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <IconOutline
                        title={resource.title}
                        path="M12 6v6l4 2M4 4h16v16H4z"
                      />
                      <h3 className={`text-lg font-semibold text-[#16324F] ${lora.className}`}>
                        {resource.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {resource.description}
                    </p>
                    <Link
                      href={resource.href}
                      className="mt-6 inline-flex text-sm font-semibold text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                    >
                      Open resource
                    </Link>
                  </div>
                ))}
              </RevealSection>
            </div>
          </section>

          <section
            id="faq"
            className="bg-white py-20 md:py-28"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Frequently Asked Questions
                </span>
                <h2
                  className={`max-w-3xl text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Clear answers for Colorado investors completing a 1031 exchange.
                </h2>
              </RevealSection>
              <RevealSection className="divide-y divide-gray-200 rounded-2xl border border-gray-200/60 bg-[#F8FAFB]">
                {FAQ_ENTRIES.map((item, index) => (
                  <details
                    key={item.question}
                    className="group"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-[#16324F] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F] sm:text-base">
                      <span>{item.question}</span>
                      <span className="text-xs font-bold tracking-[0.3em] text-[#DAA520]">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                    </summary>
                    <div className="bg-white px-6 pb-6 text-sm leading-relaxed text-gray-700">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </RevealSection>
            </div>
          </section>

          <section
            id="lead-form-section"
            className="bg-[#F8FAFB] py-20 md:py-28"
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.1fr_minmax(0,1fr)] md:px-8">
              <RevealSection className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#16324F]">
                  Start Your 1031 Exchange
                </span>
                <h2
                  className={`text-3xl md:text-4xl ${lora.className} text-[#16324F]`}
                >
                  Share your transaction goals and we will coordinate the qualified intermediary, attorney, and timeline.
                </h2>
                <p className="text-lg text-gray-700">
                  Provide your Colorado property details and any reinvestment criteria. A Denver 1031 exchange advisor will respond within one business day.
                </p>
                <div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
                  <p className="text-sm text-gray-700">
                    Business Hours:
                  </p>
                  <p className="text-sm font-semibold text-[#16324F]">
                    Monday to Friday, 8:00 AM to 6:00 PM Mountain
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Statewide coverage with Denver metro specialists ready to coordinate in-person meetings when required.
                  </p>
                </div>
              </RevealSection>
              <RevealSection as="div" className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-lg">
                <h3
                  id="lead-form"
                  className={`text-2xl ${lora.className} text-[#16324F]`}
                >
                  Request a Consultation
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Complete the form below and we will confirm timelines, qualified intermediary fit, and documentation requirements.
                </p>
                <div className="mt-6">
                  <LeadForm />
                </div>
              </RevealSection>
            </div>
          </section>
        </main>
        <footer className="bg-[#16324F] text-slate-100">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:grid md:grid-cols-4 md:gap-12 md:px-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#DAA520]">
                {BRAND_NAME}
              </span>
              <p className={`text-2xl ${lora.className}`}>
                Rocky Mountain Equity
              </p>
              <p className="text-sm text-slate-200">
                Trusted Colorado 1031 intermediary coordination, tax documentation, and statewide transaction management.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
                Contact
              </p>
              <Link
                href={`tel:${PHONE_TEL}`}
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Call {PHONE_DISPLAY}
              </Link>
              <Link
                href="mailto:team@1031exchangedenver.com"
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                team@1031exchangedenver.com
              </Link>
              <p className="text-sm text-slate-200">
                Statewide service with Denver headquarters available by appointment.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
                Quick Links
              </p>
              <Link
                href="/services"
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Services
              </Link>
              <Link
                href="/property-types"
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Property Types
              </Link>
              <Link
                href="/locations"
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Locations
              </Link>
              <Link
                href="/resources"
                className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Resources
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
                Compliance
              </p>
              <Link
                href={IRS_FORM_8824_LINK}
                className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                IRS Form 8824
              </Link>
              <Link
                href={IRS_LIKE_KIND_LINK}
                className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                IRS Like-Kind Property Rules
              </Link>
              <Link
                href={IRS_REV_PROC_2008_16_LINK}
                className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Rev. Proc. 2008-16
              </Link>
              <p className="text-xs text-slate-300">
                Information provided is for educational purposes. Consult your tax advisor and attorney before executing a 1031 exchange.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between md:px-8">
              <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
              <p>
                Privacy Policy · Terms of Service
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
