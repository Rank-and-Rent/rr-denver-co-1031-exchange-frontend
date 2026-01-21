"use client";

import Link from "next/link";
import Image from "next/image";
import type { LocationItem } from "@/data/types";

interface LocationCardProps {
  location: LocationItem;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex h-full flex-col bg-white text-left transition-all hover:shadow-luxury"
    >
      {location.heroImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={location.heroImage}
            alt={`${location.name}, Colorado`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-medium text-white">
              {location.name}
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
          {location.type}
        </p>
        {!location.heroImage && (
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            {location.name}
          </h2>
        )}
        <p className="mt-2 text-sm text-gray-600">
          View {location.name} 1031 exchange support
        </p>
        <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
          Explore
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

