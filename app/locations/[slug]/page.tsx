import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { propertyTypesData } from "@/data/property-types";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  BRAND_NAME,
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
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);
  
  if (!location) {
    return {
      title: "Location Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `1031 Exchange Services in ${location.name}, CO | ${BRAND_NAME}`,
    description: `Location-specific 1031 exchange coordination for ${location.name}, ${PRIMARY_STATE_ABBR}. Identification help, underwriting, and intermediary alignment for regional investors.`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const parentLocation = location.parent ? locationsData.find((l) => l.slug === location.parent) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BRAND_NAME} - ${location.name}`,
    description: `1031 exchange coordination services for ${location.name}, ${PRIMARY_STATE_ABBR} investors.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: PRIMARY_STATE_ABBR,
      addressCountry: "US",
    },
    telephone: PRIMARY_PHONE_TEL,
    url: `https://www.1031exchangedenver.com/locations/${location.slug}`,
  };

  const featuredServices = servicesData
    .filter((service) => service.category === "Property Paths")
    .slice(0, 4);

  const faqs = [
    {
      question: `How fast can you mobilize in ${location.name}?`,
      answer: `We stage intake calls within one business day for ${location.name}, ${PRIMARY_STATE_ABBR} investors and begin property matching once debt and equity targets are confirmed.`,
    },
    {
      question: `Do you cover identification tours in ${location.name}?`,
      answer: `Yes, we coordinate broker and property tours in ${location.name}, ${PRIMARY_STATE_ABBR} when travel makes sense and supply remote alternatives when timelines are compressed.`,
    },
    {
      question: `Can you support reverse exchanges in ${location.name}?`,
      answer: `We align qualified intermediaries and exchange accommodation arrangements that meet IRS requirements for reverse exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      question: `Who manages closing calendars for ${location.name}?`,
      answer: `Our Denver desk tracks the 45 and 180 day milestones for ${location.name}, ${PRIMARY_STATE_ABBR} projects and updates your intermediary, lender, and attorney weekly.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-location"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section with Image */}
        <section className="relative">
          {location.heroImage && (
            <div className="relative h-80 md:h-96 w-full overflow-hidden">
              <Image
                src={location.heroImage}
                alt={`${location.name}, Colorado`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/60 to-warm-brown/90" />
            </div>
          )}
          <div className={`${location.heroImage ? 'absolute inset-0 flex items-end' : 'bg-warm-brown'}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16 w-full">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Locations", href: "/locations" },
                  { label: location.name },
                ]}
                className="mb-6 text-sm"
              />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                {location.type === "remote" ? "Remote Support" : "Local Focus"}
              </p>
              <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
                1031 exchange services in {location.name}
                {parentLocation ? `, ${parentLocation.name}` : ""}
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-white/80">
                Deadline surveillance, identification planning, and lender prep
                tailored to {location.name}, {PRIMARY_STATE_ABBR}.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown">
                Available Services
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                Featured services for {location.name}
              </h2>
              <p className="mt-4 text-gray-600">
                Property sourcing and underwriting paths Denver investors most
                often request for {location.name}.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-cream p-8 transition-all hover:bg-warm-brown"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown group-hover:text-white/70">
                    {service.category}
                  </p>
                  <h3 className={`mt-3 text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 group-hover:text-white/80">{service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown group-hover:text-white">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                href="/services"
                className="text-sm font-medium text-warm-brown underline underline-offset-4 hover:text-dark-brown"
              >
                View all {servicesData.length} services
              </Link>
              <Link
                href="/locations"
                className="text-sm font-medium text-warm-brown underline underline-offset-4 hover:text-dark-brown"
              >
                View all locations
              </Link>
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Investment Options
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                Property types popular in {location.name}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {propertyTypesData.slice(0, 3).map((propertyType) => (
                <Link
                  key={propertyType.slug}
                  href={`/property-types/${propertyType.slug}`}
                  className="group bg-white p-6 transition-all hover:shadow-luxury"
                >
                  <p className={`text-lg text-gray-900 ${playfair.className}`}>
                    {propertyType.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Explore {propertyType.name.toLowerCase()} use cases
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                    Explore
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Common Questions
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                {location.name} FAQ
              </h2>
            </div>
            <div className="divide-y divide-warm-brown/20">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-6"
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
              Plan your {location.name} 1031 exchange
            </h2>
            <p className="mt-4 text-lg font-light text-white/80">
              Call or message to confirm relinquished sale status, lender needs,
              and intermediary fit. We keep every milestone visible until the
              replacement closes.
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
                Tell us about your timelines
              </h2>
              <p className="mt-4 text-gray-600">
                The form routes to an encrypted intake workflow. We respond within
                one business day.
              </p>
            </div>
            <div className="bg-cream p-8">
              <LeadForm prepopulatedService={`${location.name} location`} />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

