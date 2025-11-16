import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "1031 Exchange Services | 1031 Exchange Denver",
  description: "Comprehensive 1031 exchange services for Denver, CO investors. Property identification, QI coordination, timeline management, and more.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/services",
  },
};

export default function ServicesPage() {
  const categories = Array.from(new Set(servicesData.map((s) => s.category).filter(Boolean)));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
      <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
        1031 Exchange Services
      </h1>
      <p className="text-lg text-gray-700 mb-12 max-w-3xl">
        Comprehensive 1031 exchange services for Denver, CO investors. From property identification 
        to closing coordination, we support every phase of your exchange.
      </p>

      {categories.map((category) => {
        const categoryServices = servicesData.filter((s) => s.category === category);
        return (
          <section key={category} className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-semibold text-[#0B3C5D] mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.short}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {servicesData.filter((s) => !s.category).length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Other Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicesData
              .filter((s) => !s.category)
              .map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="font-semibold text-[#0B3C5D] mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.short}</p>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

