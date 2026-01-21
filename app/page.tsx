import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { RevealSection } from "@/components/RevealSection";
import { LeadForm } from "@/components/LeadForm";
import { RotatingHeroBackground } from "@/components/RotatingHeroBackground";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { propertyTypesData } from "@/data/property-types";
import { HomeServiceSearch } from "@/components/home/HomeServiceSearch";
import { HomeLocationSearch } from "@/components/home/HomeLocationSearch";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

const PHONE_DISPLAY = "(303) 835-0981";
const PHONE_TEL = "+13038350981";
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

const FEATURED_LOCATIONS = CO_CITIES_SLUGS.map((city) => {
  const match =
    locationsData.find((location) => location.name === city.name) ||
    locationsData.find((location) =>
      location.slug.replace("-co", "") === city.slug
    );
  return {
    name: city.name,
    description: city.description,
    slug: match?.slug ?? city.slug,
    heroImage: match?.heroImage,
  };
}).slice(0, 8);

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
    className="h-8 w-8 text-warm-brown"
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
  "@type": "ProfessionalService",
  name: BRAND_NAME,
  url: "https://www.1031exchangedenver.com/",
  logo: "https://www.1031exchangedenver.com/logo.svg",
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    addressRegion: "CO",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  ],
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


export default function Page() {
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
      <div className={`bg-white ${inter.className} text-gray-800`}>
        <main id="main">
          {/* Hero Section - Full screen with centered text */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <RotatingHeroBackground />
            <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/80">
                Elevated Colorado Guidance
              </p>
              <h1
                className={`text-4xl font-normal tracking-[0.08em] text-white md:text-6xl lg:text-7xl ${playfair.className}`}
              >
                Denver 1031 Exchange Experts
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
                Investors have 45 days to identify replacement properties and 180 days to close. Local advisory keeps every Colorado deadline, intermediary instruction, and closing file on schedule.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Call {PHONE_DISPLAY}
                </Link>
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-warm-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Start My Exchange
                </Link>
              </div>
              <p className="mt-12 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                45 Day identification. 180 Day closing. We help you stay compliant.
              </p>
            </div>
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
                <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </section>

          {/* Trust badges section */}
          <section className="bg-warm-brown py-8">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {["CPA Alliance", "Attorney Review", "Qualified Intermediary"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="flex items-center justify-center py-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/90 md:text-sm md:tracking-[0.25em]"
                    >
                      {badge}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Why Choose Section - Elegant two-column intro */}
          <section id="why-choose" className="bg-white py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  Why Choose {BRAND_NAME}
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Colorado 1031 exchange guidance engineered for precise compliance and investor confidence.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-gray-600">
                  Our Denver-based team integrates tax law interpretation, real estate underwriting, and transaction management to coordinate every qualified intermediary, attorney, and lender partner across Colorado.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {WHY_CHOOSE_FEATURES.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group relative bg-cream p-8 transition-all hover:bg-warm-brown"
                  >
                    <div className="mb-4">
                      <span className="text-xs font-semibold tracking-[0.2em] text-warm-brown group-hover:text-white/70">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className={`text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 group-hover:text-white/80">
                      {feature.description}
                    </p>
                    <Link
                      href={feature.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-warm-brown transition group-hover:text-white"
                    >
                      Learn more
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="mt-16 border-l-4 border-warm-brown bg-cream p-8">
                <p className="text-sm leading-relaxed text-gray-700">
                  A 1031 exchange defers federal and Colorado state income tax on qualifying real property. It does not remove county transfer or recording fees.{" "}
                  <Link
                    href={CO_TRANSFER_TAX_LINK}
                    className="font-semibold text-warm-brown underline underline-offset-4 hover:text-dark-brown"
                  >
                    Review Colorado transfer fee guidance
                  </Link>
                  .
                </p>
              </RevealSection>
            </div>
          </section>

          {/* How It Works Section - Clean steps with warm brown accent */}
          <section id="how-it-works" className="bg-cream py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  How a 1031 Works
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Structure every phase of the exchange with documented reporting and partner oversight.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-gray-600">
                  We synchronize relinquished property sale activities, qualified intermediary assignments, and replacement closings to maintain Colorado compliance throughout the 180-day lifecycle.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-px bg-warm-brown/20 md:grid-cols-3">
                {[
                  {
                    title: "Sell the relinquished property",
                    description:
                      "Execute sale agreements, assign them to your qualified intermediary, and ensure proceeds flow directly into escrow.",
                    link: IRS_FORM_8824_LINK,
                    step: "01",
                  },
                  {
                    title: "Identify replacements within 45 days",
                    description:
                      "Document up to three properties or more under the 200 percent rule with traceable delivery to all parties.",
                    link: IRS_LIKE_KIND_LINK,
                    step: "02",
                  },
                  {
                    title: "Close within 180 days",
                    description:
                      "Complete financing, due diligence, and closing statements before the IRS deadline to secure tax deferral.",
                    link: IRS_FORM_8824_LINK,
                    step: "03",
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="group flex h-full flex-col bg-white p-10 transition-colors hover:bg-warm-brown"
                  >
                    <span className={`text-5xl font-light text-warm-brown/30 group-hover:text-white/30 ${playfair.className}`}>
                      {step.step}
                    </span>
                    <h3 className={`mt-6 text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                      {step.title}
                    </h3>
                    <p className="mt-4 flex-grow text-sm leading-relaxed text-gray-600 group-hover:text-white/80">
                      {step.description}
                    </p>
                    <Link
                      href={step.link}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown transition group-hover:text-white"
                    >
                      IRS Guidance
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </RevealSection>
              <RevealSection className="mt-16 border-l-4 border-warm-brown bg-white p-8">
                <p className="text-sm leading-relaxed text-gray-700">
                  Vacation and mixed-use properties may qualify under Rev. Proc. 2008-16 safe harbor.{" "}
                  <Link
                    href={IRS_REV_PROC_2008_16_LINK}
                    className="font-semibold text-warm-brown underline underline-offset-4 hover:text-dark-brown"
                  >
                    Review IRS Rev. Proc. 2008-16
                  </Link>
                  .
                </p>
              </RevealSection>
            </div>
          </section>

          {/* Services Section - Full width with image overlay style like the screenshot */}
          <section id="services" className="bg-white py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  Services Preview
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Services designed for Colorado exchanges, from planning through final reporting.
                </h2>
              </RevealSection>
              <RevealSection>
                <HomeServiceSearch services={servicesData} featured={TOP_SERVICES} />
              </RevealSection>
              <RevealSection className="mt-12 flex justify-center">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-warm-brown px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-warm-brown hover:text-white"
                >
                  See all services
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealSection>
            </div>
          </section>

          {/* Property Types Section - Grid with hover effect */}
          <section id="property-types" className="bg-cream py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  Property Types
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Target the Colorado property classes that align with your reinvestment strategy.
                </h2>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map((property) => {
                  const propertyType = propertyTypesData.find((pt) => pt.slug === property.slug);
                  return (
                    <Link
                      key={property.slug}
                      href={`/property-types/${property.slug}`}
                      className="group relative overflow-hidden bg-white"
                    >
                      {propertyType?.heroImage && (
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={propertyType.heroImage}
                            alt={property.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className={`text-xl text-white ${playfair.className}`}>
                              {property.title}
                            </h3>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-sm leading-relaxed text-gray-600">
                          {property.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                          Explore type
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </RevealSection>
              <RevealSection className="mt-12 flex justify-center">
                <Link
                  href="/property-types"
                  className="inline-flex items-center gap-2 border border-warm-brown px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-warm-brown hover:text-white"
                >
                  Explore all property types
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealSection>
            </div>
          </section>

          {/* Coverage Section - Explore Communities style */}
          <section id="coverage" className="bg-white py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  Colorado Coverage
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Statewide 1031 exchange coverage with Denver metro specialization.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-gray-600">
                  From the Front Range to the Arkansas Valley, the Rocky Mountain Equity network coordinates qualified intermediaries, attorneys, and local brokers to keep your exchange compliant and on schedule.
                </p>
              </RevealSection>
              <RevealSection>
                <HomeLocationSearch cards={FEATURED_LOCATIONS} locations={locationsData} />
              </RevealSection>
              <RevealSection className="mt-12 flex justify-center">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 border border-warm-brown px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-warm-brown hover:text-white"
                >
                  See all locations
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealSection>
            </div>
          </section>

          {/* Tools Section - Luxury styled cards with warm brown */}
          <section id="tools" className="bg-warm-brown py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  Exchange Tools
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-white md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Free calculators and tools to help you plan your 1031 exchange.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/80">
                  Use our interactive tools to calculate boot, estimate exchange costs, validate identification rules, and more.
                </p>
              </RevealSection>
              <RevealSection className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  {
                    title: "Depreciation Recapture Estimator",
                    description:
                      "Estimate depreciation recapture tax on your relinquished property and understand 1031 deferral benefits.",
                    href: "/tools/depreciation-recapture-estimator",
                    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                  },
                  {
                    title: "Replacement Property Value Calculator",
                    description:
                      "Calculate the minimum replacement property value needed to defer all gain in your exchange.",
                    href: "/tools/replacement-property-value-calculator",
                    icon: "M3 18h18M3 10l9-6 9 6v8H3z",
                  },
                  {
                    title: "Debt Relief Calculator",
                    description:
                      "Calculate mortgage boot when new debt is less than old debt and understand tax implications.",
                    href: "/tools/debt-relief-calculator",
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group bg-white p-8 transition-all hover:bg-cream"
                  >
                    <div className="mb-6 flex items-center justify-center w-12 h-12 border border-warm-brown/30">
                      <svg
                        className="h-6 w-6 text-warm-brown"
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
                    <h3 className={`text-xl text-gray-900 ${playfair.className}`}>
                      {tool.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {tool.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      Use Tool
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </RevealSection>
              <RevealSection className="mt-12 flex justify-center">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 border border-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-warm-brown"
                >
                  View All Tools
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </RevealSection>
            </div>
          </section>

          {/* Resources Section - Clean two-column layout */}
          <section id="resources" className="bg-cream py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <RevealSection className="grid gap-8 md:grid-cols-2">
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
                    className="group flex h-full flex-col bg-white p-10 transition-all hover:shadow-luxury-lg"
                  >
                    <div className="mb-6 flex items-center justify-center w-12 h-12 border border-warm-brown/30">
                      <IconOutline
                        title={resource.title}
                        path="M12 6v6l4 2M4 4h16v16H4z"
                      />
                    </div>
                    <h3 className={`text-2xl text-gray-900 ${playfair.className}`}>
                      {resource.title}
                    </h3>
                    <p className="mt-4 flex-grow text-sm leading-relaxed text-gray-600">
                      {resource.description}
                    </p>
                    <Link
                      href={resource.href}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown transition group-hover:text-dark-brown"
                    >
                      Open resource
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </RevealSection>
            </div>
          </section>

          {/* FAQ Section - Clean accordion style */}
          <section id="faq" className="bg-white py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 md:px-8">
              <RevealSection className="text-center mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                  Frequently Asked Questions
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Clear answers for Colorado investors completing a 1031 exchange.
                </h2>
              </RevealSection>
              <RevealSection className="divide-y divide-warm-brown/20">
                {FAQ_ENTRIES.map((item, index) => (
                  <details
                    key={item.question}
                    className="group py-6"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown">
                      <span className={`text-lg text-gray-900 group-open:text-warm-brown ${playfair.className}`}>
                        {item.question}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-warm-brown/30 text-warm-brown transition group-open:bg-warm-brown group-open:text-white">
                        <svg className="h-4 w-4 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 text-sm leading-relaxed text-gray-600 pr-12">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </RevealSection>
            </div>
          </section>

          {/* Lead Form Section - Work With Us style from screenshots */}
          <section id="lead-form-section" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
              <Image
                src="/hero-images/denver-1.jpg"
                alt="Denver skyline"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-warm-brown/90" />
            </div>
            <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-8">
              <RevealSection className="flex flex-col justify-center">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  Start Your 1031 Exchange
                </p>
                <h2 className={`mt-4 text-3xl tracking-wide text-white md:text-4xl lg:text-5xl ${playfair.className}`}>
                  Share your transaction goals and we will coordinate the qualified intermediary, attorney, and timeline.
                </h2>
                <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
                  Provide your Colorado property details and any reinvestment criteria. A Denver 1031 exchange advisor will respond within one business day.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="#lead-form"
                    className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-transparent hover:text-white"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-warm-brown"
                  >
                    Browse Services
                  </Link>
                </div>
              </RevealSection>
              <RevealSection as="div" className="bg-white p-10">
                <h3
                  id="lead-form"
                  className={`text-2xl text-gray-900 ${playfair.className}`}
                >
                  Request a Consultation
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Complete the form below and we will confirm timelines, qualified intermediary fit, and documentation requirements.
                </p>
                <div className="mt-8 border-t border-warm-brown/20 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                    Business Hours
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Monday to Friday, 8:00 AM to 6:00 PM Mountain
                  </p>
                </div>
                <div className="mt-6">
                  <LeadForm />
                </div>
              </RevealSection>
            </div>
          </section>
        </main>
        {/* Footer with warm brown styling - keeping all content */}
        <footer className="bg-dark-brown text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:grid md:grid-cols-4 md:gap-12 md:px-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                {BRAND_NAME}
              </span>
              <p className={`text-2xl text-white ${playfair.className}`}>
                Rocky Mountain Equity
              </p>
              <p className="text-sm font-light text-white/70">
                Trusted Colorado 1031 intermediary coordination, tax documentation, and statewide transaction management.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Contact
              </p>
              <Link
                href={`tel:${PHONE_TEL}`}
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Call {PHONE_DISPLAY}
              </Link>
              <Link
                href="mailto:contact@1031exchangedenver.com"
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                contact@1031exchangedenver.com
              </Link>
              <p className="text-sm text-white/70">
                1510 York St, Denver, CO 80206
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Quick Links
              </p>
              <Link
                href="/services"
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Services
              </Link>
              <Link
                href="/property-types"
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Property Types
              </Link>
              <Link
                href="/locations"
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Locations
              </Link>
              <Link
                href="/resources"
                className="text-sm text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Resources
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Compliance
              </p>
              <Link
                href={IRS_FORM_8824_LINK}
                className="text-sm text-white/90 underline underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                IRS Form 8824
              </Link>
              <Link
                href={IRS_LIKE_KIND_LINK}
                className="text-sm text-white/90 underline underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                IRS Like-Kind Property Rules
              </Link>
              <Link
                href={IRS_REV_PROC_2008_16_LINK}
                className="text-sm text-white/90 underline underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Rev. Proc. 2008-16
              </Link>
              <p className="text-xs text-white/50">
                Information provided is for educational purposes. Consult your tax advisor and attorney before executing a 1031 exchange.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
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
