import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { propertyTypesData } from "@/data/property-types";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Property Types | 1031 Exchange Denver",
  description:
    "Review replacement property types for Colorado exchanges. Multifamily, industrial, medical, retail, and land options with underwriting support.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/property-types",
  },
};

export default function PropertyTypesPage() {
  const itemsWithLabels = propertyTypesData.map((propertyType) => ({
    ...propertyType,
    label: propertyType.name,
    href: `/property-types/${propertyType.slug}`,
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Property Types" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Replacement Inventory
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              Compare 1031 replacement property classes
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              Filter by property type to evaluate identification fit, underwriting
              implications, and timeline risk. The search bar jumps directly to the
              property page or routes you to intake if you need a different asset.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SearchPanel
            items={itemsWithLabels}
            type="property"
            emptyTitle="Need guidance on a different property class?"
            emptyDescription="Enter the asset type you are pursuing and we will assign an underwriter to review it."
          />
        </div>
      </section>

      <BottomCTA />
    </div>
  );
}

