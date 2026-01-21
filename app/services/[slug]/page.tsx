import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedServiceGrid } from "@/components/services/RelatedServiceGrid";
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
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${service.name} | ${BRAND_NAME}`,
    description: service.short,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_NAME,
      telephone: PRIMARY_PHONE_TEL,
    },
    areaServed: {
      "@type": "State",
      name: PRIMARY_STATE_ABBR,
    },
  };

  const supportingLocations = locationsData.filter(
    (location) => location.type === "city"
  ).slice(0, 5);

  const relatedServices = servicesData
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 4);

  const faqs = [
    {
      question: `How does this service support ${PRIMARY_CITY}?`,
      answer: `${service.name} keeps ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges aligned with local lending, intermediary, and attorney requirements so deadlines never drift.`,
    },
    {
      question: `What do you need to begin ${service.name}?`,
      answer: `We confirm relinquished sale status, estimated gain, and lender expectations for every ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} project before kicking off ${service.name.toLowerCase()} so there are no surprises.`,
    },
    {
      question: `Does ${service.name} cover compliance reporting?`,
      answer: `Yes. We document every milestone and supply your CPA or attorney in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with organized records generated during ${service.name.toLowerCase()} support.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-warm-brown py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.name },
              ]}
              className="mb-8 text-sm"
            />
            <div className="max-w-3xl">
              {service.category ? (
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  {service.category}
                </p>
              ) : null}
              <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
                {service.name}
              </h1>
              <p className="mt-6 text-lg font-light leading-relaxed text-white/80">{service.short}</p>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown">
                  Service Details
                </p>
                <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                  What is included
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  This service keeps your exchange aligned with IRS guidance and the
                  lender, intermediary, and attorney teams supporting you.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Intake review covering gain, basis, and financing targets.",
                  "Calendar control for the 45 day identification and 180 day close.",
                  "Secure document exchange for intermediaries, attorneys, and lenders.",
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
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <RelatedServiceGrid services={relatedServices.length > 0 ? relatedServices : servicesData.slice(0, 4)} />
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
                Frequently asked questions
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

        {/* Locations Section */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
                Coverage Areas
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 ${playfair.className}`}>
                Where we deliver {service.name.toLowerCase()}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {supportingLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group bg-white p-6 transition-all hover:bg-warm-brown"
                >
                  <p className={`text-lg text-gray-900 group-hover:text-white ${playfair.className}`}>
                    {location.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 group-hover:text-white/70">
                    Learn about {location.name} exchanges
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-warm-brown py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
            <h2 className={`text-3xl text-white ${playfair.className}`}>
              Launch {service.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-lg font-light text-white/80">
              Share your objectives and we will confirm intermediary fit,
              diligence needs, and reporting steps.
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
                Tell us about your exchange
              </h2>
              <p className="mt-4 text-gray-600">
                Mention {service.name.toLowerCase()} so we can prefill workflow
                steps before the first call.
              </p>
            </div>
            <div className="bg-cream p-8">
              <LeadForm prepopulatedService={service.name} />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

