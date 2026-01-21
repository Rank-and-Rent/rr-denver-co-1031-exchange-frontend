import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { propertyTypesData } from "@/data/property-types";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  BRAND_NAME,
  PRIMARY_CITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return propertyTypesData.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);
  
  if (!propertyType) {
    return {
      title: "Property Type Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${propertyType.name} Replacement Properties | ${BRAND_NAME}`,
    description: `${propertyType.name} 1031 replacement strategies for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Underwriting notes, identification tips, and compliance reminders.`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/property-types/${propertyType.slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);

  if (!propertyType) {
    notFound();
  }

  const relatedServices = servicesData
    .filter(
      (service) =>
        service.name.toLowerCase().includes(propertyType.name.toLowerCase()) ||
        service.short.toLowerCase().includes(propertyType.name.toLowerCase())
    )
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${propertyType.name} Replacement Property Support`,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_NAME,
    },
    areaServed: {
      "@type": "State",
      name: PRIMARY_STATE_ABBR,
    },
    serviceType: propertyType.name,
    description: `${propertyType.name} identification and underwriting guidance for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges.`,
  };

  const faqs = [
    {
      question: `How do investors use ${propertyType.name.toLowerCase()} assets in ${PRIMARY_CITY}?`,
      answer: `${propertyType.name} assets in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} are often selected to balance yield with long-term depreciation schedules. We align the underwriting to your basis and debt targets before identification.`,
    },
    {
      question: `What diligence is required for ${propertyType.name.toLowerCase()}?`,
      answer: `We coordinate rent roll checks, trailing twelve reviews, and market comps specific to ${propertyType.name.toLowerCase()} replacements so you can deliver a complete package to your lender in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      question: `Are there timeline risks for ${propertyType.name.toLowerCase()}?`,
      answer: `${propertyType.name} assets can require longer negotiations. We build backup options and confirm that your intermediary can accept identification letters that reference build-to-suit or improvement exchange strategies when needed.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-property-type"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section with Image */}
        <section className="relative">
          {propertyType.heroImage && (
            <div className="relative h-80 md:h-96 w-full overflow-hidden">
              <Image
                src={propertyType.heroImage}
                alt={propertyType.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/60 to-warm-brown/90" />
            </div>
          )}
          <div className={`${propertyType.heroImage ? 'absolute inset-0 flex items-end' : 'bg-warm-brown'}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16 w-full">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Property Types", href: "/property-types" },
                  { label: propertyType.name },
                ]}
                className="mb-6 text-sm"
              />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Property Type
              </p>
              <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
                {propertyType.name} replacement properties
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-white/80">
                Understand how {propertyType.name.toLowerCase()} assets fit within
                IRS identification rules, debt replacement math, and lender
                expectations for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} exchanges.
              </p>
            </div>
          </div>
        </section>

        {/* Why Investors Choose Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown">
                  Investment Insights
                </p>
                <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                  Why investors choose {propertyType.name.toLowerCase()}
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  We surface rent roll considerations, operating expense norms, and
                  disposition risks unique to {propertyType.name.toLowerCase()} assets.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  `Basis planning and depreciation reset modeling for ${propertyType.name.toLowerCase()} portfolios.`,
                  `Identification strategy that covers both three property and 200 percent paths.`,
                  `Lender prep packages that highlight income durability for ${propertyType.name.toLowerCase()} replacements.`,
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 bg-cream p-6">
                    <span className={`text-2xl font-light text-warm-brown/40 ${playfair.className}`}>
                      0{index + 1}
                    </span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="bg-cream py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown">
                    Available Support
                  </p>
                  <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                    Related services
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="text-sm font-medium text-warm-brown underline underline-offset-4 hover:text-dark-brown"
                >
                  View all services
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group bg-white p-6 transition-all hover:shadow-luxury"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      {service.category}
                    </p>
                    <h3 className={`mt-2 text-lg text-gray-900 ${playfair.className}`}>
                      {service.name}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">{service.short}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular Markets Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Coverage Areas
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                Popular markets for {propertyType.name}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
              {locationsData
                .filter((location) => location.type === "city")
                .slice(0, 6)
                .map((location) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className="group bg-cream p-4 text-center transition-all hover:bg-warm-brown"
                  >
                    <p className={`text-lg text-gray-900 group-hover:text-white ${playfair.className}`}>
                      {location.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 group-hover:text-white/70">
                      Explore demand
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Common Questions
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                {propertyType.name} FAQ
              </h2>
            </div>
            <div className="divide-y divide-warm-brown/20 bg-white">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-6 px-8"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left">
                    <span className={`text-lg text-gray-900 group-open:text-warm-brown ${playfair.className}`}>
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-warm-brown/30 text-warm-brown transition group-open:bg-warm-brown group-open:text-white">
                      <svg className="h-4 w-4 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 pr-12">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-warm-brown py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
            <h2 className={`text-3xl text-white ${playfair.className}`}>
              Start a {propertyType.name} exchange plan
            </h2>
            <p className="mt-4 text-lg font-light text-white/80">
              We can review current debt, lender hurdles, and intermediary options
              for {propertyType.name.toLowerCase()} replacements.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-warm-brown"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-transparent hover:text-white"
              >
                Contact team
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Get Started
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                Request underwriting support
              </h2>
              <p className="mt-4 text-gray-600">
                Mention the property type so we can prefill lender-ready materials.
              </p>
            </div>
            <div className="bg-cream p-8">
              <LeadForm
                prepopulatedService={`${propertyType.name} 1031 Exchange`}
              />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

