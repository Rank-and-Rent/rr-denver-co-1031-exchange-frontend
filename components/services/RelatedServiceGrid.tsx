"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import { buildContactHref } from "@/lib/routing";

type RelatedServiceGridProps = {
  services: ServiceItem[];
};

export function RelatedServiceGrid({ services }: RelatedServiceGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return services;
    }
    const normalized = query.toLowerCase();
    return services.filter((service) =>
      service.name.toLowerCase().includes(normalized)
    );
  }, [query, services]);

  const showEmpty = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <label
          htmlFor="related-service-search"
          className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown"
        >
          Related services
        </label>
        <div className="relative">
          <input
            id="related-service-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter related services"
            className="w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-[0.1em] text-warm-brown hover:text-dark-brown"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
      {showEmpty ? (
        <div className="bg-white p-6 text-sm">
          <p className="font-medium text-gray-900">
            We can help with &quot;{query}&quot;
          </p>
          <p className="mt-2 text-gray-600">
            Send the request to intake and we will align the right specialist.
          </p>
          <Link
            href={buildContactHref(query)}
            className="mt-4 inline-flex items-center bg-warm-brown px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-dark-brown"
          >
            Contact team
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white p-6 transition-all hover:shadow-luxury"
            >
              <p className="font-medium text-gray-900 group-hover:text-warm-brown">{service.name}</p>
              <p className="mt-2 text-sm text-gray-500">{service.short}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
