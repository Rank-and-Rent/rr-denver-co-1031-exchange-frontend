import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { BRAND_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `About ${BRAND_NAME}`,
  description:
    "Learn how we guide Denver 1031 investors through intake, property matching, and partner coordination. Secure process. Not a Qualified Intermediary.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/about",
  },
};

const PILLARS = [
  {
    title: "Secure intake",
    description:
      "Every request enters an encrypted workflow. We confirm sale status, gain exposure, debt targets, and intermediary selection before sharing documents.",
  },
  {
    title: "Property matching",
    description:
      "We maintain a research bench covering multifamily, industrial, retail, medical, and land assets across the Front Range. Data packs include rent rolls, trailing twelve statements, and lender-ready comps.",
  },
  {
    title: "Partner coordination",
    description:
      "Attorneys, CPAs, lenders, and Qualified Intermediaries receive synchronized updates. We monitor the calendar and log every milestone.",
  },
];

const WORKFLOW = [
  {
    title: "1. Intake call",
    details:
      "Establish relinquished sale timing, targeted basis, financing expectations, and risk tolerances.",
  },
  {
    title: "2. Identification plan",
    details:
      "Draft three property and 200 percent rule strategies with backup assets. Deliver letters for intermediary signature.",
  },
  {
    title: "3. Execution",
    details:
      "Coordinate diligence, lender conditions, and closing statements. Prepare reporting packets for your CPA.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              About {BRAND_NAME}
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              Focused on 1031 exchange execution in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              We help investors identify replacement properties, coordinate underwriting, and
              guide every partner through the 45 and 180 day deadlines. We are not a Qualified
              Intermediary, brokerage, law firm, or CPA. We work beside those professionals to
              keep each exchange compliant and organized.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="grid gap-px bg-warm-brown/20 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className="group bg-cream p-8 transition-colors hover:bg-warm-brown"
              >
                <span className={`text-4xl font-light text-warm-brown/30 group-hover:text-white/30 ${playfair.className}`}>
                  0{index + 1}
                </span>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-warm-brown group-hover:text-white/70">
                  {pillar.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 group-hover:text-white/80">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
              Our Process
            </p>
            <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 ${playfair.className}`}>
              How our process works
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WORKFLOW.map((step) => (
              <div
                key={step.title}
                className="bg-white p-8"
              >
                <p className={`text-lg text-gray-900 ${playfair.className}`}>{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="bg-warm-brown py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="max-w-2xl">
            <h2 className={`text-3xl tracking-wide text-white ${playfair.className}`}>Why we exist</h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              Wide execution gaps remain between Qualified Intermediaries, lenders,
              attorneys, and investors. We fill that gap with disciplined project
              management, underwriting support, and transparent communication.
            </p>
            <p className="mt-4 text-lg font-light leading-relaxed text-white/80">
              You maintain direct relationships with your legal, tax, and brokerage
              teams. We keep everyone aligned with the IRS calendar.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-warm-brown"
              >
                View services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition hover:bg-transparent hover:text-white"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-warm-brown">
              Get Started
            </p>
            <h2 className={`mt-4 text-3xl tracking-wide text-gray-900 ${playfair.className}`}>
              Request a consultation
            </h2>
            <p className="mt-4 text-gray-600">
              Complete the secure form. We respond within one business day.
            </p>
          </div>
          <div className="bg-cream p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

