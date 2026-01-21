import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "./contact-form";
import {
  BRAND_NAME,
  OFFICE_ADDRESS,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_EMAIL,
  SUPPORT_HOURS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Contact Us | 1031 Exchange Denver",
  description:
    "Call, email, or send a secure intake form to reach 1031 Exchange Denver at 1510 York St, Denver, CO 80206.",
  alternates: {
    canonical: "https://1031exchangedenver.com/contact",
  },
};

type ContactPageProps = {
  searchParams?: { projectType?: string };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const prefill = searchParams?.projectType
    ? decodeURIComponent(searchParams.projectType)
    : undefined;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Contact {BRAND_NAME}
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              Talk with a Denver 1031 specialist
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              We coordinate replacement property identification, underwriting, and
              partner communication for investors across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
              We are not a Qualified Intermediary, law firm, broker, or CPA. We work
              with your selected professionals to keep every deadline organized.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
            {/* Form Column */}
            <div>
              <h2 className={`text-2xl text-gray-900 ${playfair.className}`}>Request a consultation</h2>
              <p className="mt-2 text-gray-600">
                Send the secure form. We respond within one business day with next steps.
              </p>
              <div className="mt-8 bg-cream p-8">
                <ContactForm prepopulatedProjectType={prefill} />
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-8">
              <div className="bg-cream p-8">
                <h3 className={`text-lg text-gray-900 ${playfair.className}`}>Contact information</h3>
                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      Phone
                    </p>
                    <Link
                      href={`tel:${PRIMARY_PHONE_TEL}`}
                      className="mt-1 block text-gray-900 hover:text-warm-brown"
                    >
                      {PRIMARY_PHONE_DISPLAY}
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      Email
                    </p>
                    <Link
                      href={`mailto:${PRIMARY_EMAIL}`}
                      className="mt-1 block text-gray-900 hover:text-warm-brown"
                    >
                      {PRIMARY_EMAIL}
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      Address
                    </p>
                    <p className="mt-1 text-gray-700">{OFFICE_ADDRESS}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                      Hours
                    </p>
                    <p className="mt-1 text-gray-700">{SUPPORT_HOURS}</p>
                  </div>
                </div>
              </div>
              <div className="bg-cream p-8">
                <h3 className={`text-lg text-gray-900 ${playfair.className}`}>Map</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Meetings by appointment only.
                </p>
                <div className="mt-4 overflow-hidden border border-warm-brown/20">
                  <iframe
                    src="https://www.google.com/maps?q=1510+York+St,+Denver,+CO+80206&output=embed"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${BRAND_NAME} Map`}
                    className="grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

