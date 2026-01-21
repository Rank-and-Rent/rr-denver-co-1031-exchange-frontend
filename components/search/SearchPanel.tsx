"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildContactHref } from "@/lib/routing";
import { ServiceCard } from "./ServiceCard";
import { LocationCard } from "./LocationCard";
import { PropertyCard } from "./PropertyCard";
import type { ServiceItem } from "@/data/types";
import type { LocationItem } from "@/data/types";
import type { PropertyTypeItem } from "@/data/types";

type SearchItem = 
  | (ServiceItem & { label: string; href: string })
  | (LocationItem & { label: string; href: string })
  | (PropertyTypeItem & { label: string; href: string });

type SearchPanelProps = {
  items: SearchItem[];
  type: "service" | "location" | "property";
  emptyTitle: string;
  emptyDescription: string;
  fallbackPrefill?: (query: string) => string;
};

export function SearchPanel({
  items,
  type,
  emptyTitle,
  emptyDescription,
  fallbackPrefill,
}: SearchPanelProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return items;
    }

    const normalized = query.trim().toLowerCase();
    const matches = items.filter((item) =>
      item.label.toLowerCase().includes(normalized)
    );

    return matches.sort((a, b) => {
      const aExact = a.label.toLowerCase() === normalized ? 0 : 1;
      const bExact = b.label.toLowerCase() === normalized ? 0 : 1;
      return aExact - bExact;
    });
  }, [items, query]);

  const exactMatchHref = useMemo(() => {
    if (!query) return null;
    const normalized = query.trim().toLowerCase();
    const exact = items.find(
      (item) => item.label.toLowerCase() === normalized
    );
    return exact ? exact.href : null;
  }, [items, query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (exactMatchHref) {
      router.push(exactMatchHref);
      return;
    }

    const fallbackValue =
      fallbackPrefill?.(query) ??
      (query || (type === "location" ? "Other" : ""));
    router.push(buildContactHref(fallbackValue || "Other"));
  };

  const handleClear = () => setQuery("");

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-warm-brown/20 bg-cream p-6"
      >
        <label
          htmlFor={`search-${type}`}
          className="text-xs font-medium uppercase tracking-[0.2em] text-warm-brown"
        >
          Search {type === "property" ? "property types" : `${type}s`}
        </label>
        <div className="relative">
          <input
            id={`search-${type}`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${type}s`}
            className="w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium uppercase tracking-[0.1em] text-warm-brown hover:text-dark-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
          <button
            type="submit"
            className="font-medium text-warm-brown hover:text-dark-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
          >
            {exactMatchHref ? "Open match" : "Contact us"}
          </button>
        </div>
      </form>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            if (type === "service") {
              return (
                <ServiceCard
                  key={item.label}
                  service={item as ServiceItem & { label: string; href: string }}
                />
              );
            } else if (type === "location") {
              return (
                <LocationCard
                  key={item.label}
                  location={item as LocationItem & { label: string; href: string }}
                />
              );
            } else {
              return (
                <PropertyCard
                  key={item.label}
                  propertyType={item as PropertyTypeItem & { label: string; href: string }}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="border border-warm-brown/20 bg-cream p-8 text-sm">
          <p className="text-lg font-medium text-gray-900">{emptyTitle}</p>
          <p className="mt-2 text-gray-600">{emptyDescription}</p>
          <button
            type="button"
            onClick={() =>
              router.push(buildContactHref(query || "Other"))
            }
            className="mt-6 inline-flex items-center bg-warm-brown px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-dark-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
          >
            Contact Team
          </button>
        </div>
      )}
    </div>
  );
}

