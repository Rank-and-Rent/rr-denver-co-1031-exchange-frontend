"use client";

import Link from "next/link";
import type { ServiceItem } from "@/data/types";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col bg-white p-6 text-left transition-all hover:bg-cream hover:shadow-luxury"
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
        {service.category || "Exchange"}
      </p>
      <h2 className="mt-3 text-lg font-medium text-gray-900">{service.name}</h2>
      <p className="mt-2 text-sm text-gray-600">{service.short}</p>
      <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
        View details
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  );
}

