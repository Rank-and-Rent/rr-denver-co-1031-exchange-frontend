import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { locationsData } from "@/data/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";
import BottomCTA from "@/components/BottomCTA";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Locations | 1031 Exchange Denver",
  description:
    "Explore Denver metro 1031 exchange coverage. Neighborhood intelligence, nearby FAQs, and rapid contact options.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/locations",
  },
};

export default function LocationsPage() {
  const itemsWithLabels = locationsData.map((location) => ({
    ...location,
    label: location.name,
    href: `/locations/${location.slug}`,
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Metro Coverage
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              1031 exchange locations around Denver
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              Search cities, suburbs, and business districts served by our 1031
              exchange desk. Each page outlines FAQs, locally relevant services,
              and a quick path to secure intake if your location does not appear.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SearchPanel
            items={itemsWithLabels}
            type="location"
            emptyTitle="Need help outside this list?"
            emptyDescription="Send us your target market and we will coordinate remote sourcing support."
          />
        </div>
      </section>

      <BottomCTA />
    </div>
  );
}

