import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { servicesData } from "@/data/services";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Services | 1031 Exchange Denver",
  description:
    "Detailed 1031 exchange services for Denver investors. Identification, underwriting, intermediary coordination, and reporting support.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/services",
  },
};

export default function ServicesPage() {
  const itemsWithLabels = servicesData.map((service) => ({
    ...service,
    label: service.name,
    href: `/services/${service.slug}`,
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Exchange Operations
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              1031 exchange services for Denver investors
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              Every service aligns with IRS timelines, intermediary procedures, and
              Colorado market realities. Use the search field to jump directly to a
              service or request a consultation if you need a custom scope.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SearchPanel
            items={itemsWithLabels}
            type="service"
            emptyTitle="Need a different 1031 support path?"
            emptyDescription="Tell us what you are trying to identify and we will route you to the correct specialist."
          />
        </div>
      </section>

      <BottomCTA />
    </div>
  );
}

