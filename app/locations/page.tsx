import type { Metadata } from "next";
import Link from "next/link";
import { locationsData } from "@/data/locations";

export const metadata: Metadata = {
  title: "1031 Exchange Locations | 1031 Exchange Denver",
  description: "1031 exchange services available across Colorado. Denver, Boulder, Colorado Springs, Fort Collins, and more.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/locations",
  },
};

export default function LocationsPage() {
  const cities = locationsData.filter((loc) => loc.type === "city");
  const neighborhoods = locationsData.filter((loc) => loc.type === "neighborhood" || loc.type === "district");
  const suburbs = locationsData.filter((loc) => loc.type === "suburb");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
      <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
        1031 Exchange Locations
      </h1>
      <p className="text-lg text-gray-700 mb-12 max-w-3xl">
        Our Denver-based team provides 1031 exchange coordination services across Colorado. 
        Select a location below to learn more about 1031 exchange services in that area.
      </p>

      {cities.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Cities</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-[#0B3C5D] mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600">View 1031 exchange services</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {suburbs.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Suburbs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suburbs.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-[#0B3C5D] mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600">View 1031 exchange services</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {neighborhoods.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Neighborhoods & Districts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-[#0B3C5D] mb-2">{location.name}</h3>
                {location.parent && (
                  <p className="text-xs text-gray-500 mb-2">
                    {locationsData.find((l) => l.slug === location.parent)?.name}
                  </p>
                )}
                <p className="text-sm text-gray-600">View 1031 exchange services</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

