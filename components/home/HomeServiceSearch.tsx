"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ServiceItem } from "@/data/types";
import { buildContactHref } from "@/lib/routing";

type HomeServiceSearchProps = {
  services: ServiceItem[];
  featured: Array<{
    title: string;
    description: string;
    slug: string;
  }>;
};

export function HomeServiceSearch({ services, featured }: HomeServiceSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const displayServices = useMemo(() => {
    if (!query.trim()) {
      return featured;
    }
    const normalized = query.toLowerCase();
    return services
      .filter((service) => service.name.toLowerCase().includes(normalized))
      .slice(0, 6)
      .map((service) => ({
        title: service.name,
        description: service.short,
        slug: service.slug,
      }));
  }, [featured, query, services]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    const exact = services.find(
      (service) => service.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (exact) {
      router.push(`/services/${exact.slug}`);
      return;
    }
    router.push(buildContactHref(query));
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-3xl border border-gray-300 bg-gray-50 p-4"
      >
        <label
          htmlFor="home-service-search"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-brown"
        >
          Search services
        </label>
        <div className="flex gap-2">
          <input
            id="home-service-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Timeline tracking, replacement sourcing..."
            className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-warm-brown focus:outline-none focus:ring-2 focus:ring-warm-brown/20"
          />
          <button
            type="submit"
            className="rounded-2xl bg-warm-brown px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-dark-brown"
          >
            Go
          </button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayServices.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-warm-brown hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-gray-700">{service.description}</p>
            <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-warm-brown">
              View service
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

