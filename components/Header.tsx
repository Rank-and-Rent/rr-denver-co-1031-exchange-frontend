"use client";

import Link from "next/link";
import { useState } from "react";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";
const BRAND_NAME = "1031 Exchange Denver";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const topServices = servicesData.slice(0, 6);
  const topLocations = locationsData.filter((loc) => loc.type === "city").slice(0, 6);

  return (
    <header className="bg-[#F8FAFB]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <Link href="/" className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.28em] text-[#16324F]">
            ROCKY MOUNTAIN EQUITY
          </span>
          <p className="text-xl font-semibold text-[#16324F] font-serif">
            {BRAND_NAME}
          </p>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <div className="relative">
            <button
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              className="text-sm font-medium text-gray-700 transition hover:text-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
            >
              Services
            </button>
            {servicesOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="p-2">
                  {topServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block rounded px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#16324F]"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="block rounded px-3 py-2 text-sm font-semibold text-[#16324F] transition hover:bg-gray-50"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
              className="text-sm font-medium text-gray-700 transition hover:text-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
            >
              Locations
            </button>
            {locationsOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50"
                onMouseEnter={() => setLocationsOpen(true)}
                onMouseLeave={() => setLocationsOpen(false)}
              >
                <div className="p-2">
                  {topLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="block rounded px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#16324F]"
                    >
                      {location.name}
                    </Link>
                  ))}
                  <Link
                    href="/locations"
                    className="block rounded px-3 py-2 text-sm font-semibold text-[#16324F] transition hover:bg-gray-50"
                  >
                    View All Locations →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
              className="text-sm font-medium text-gray-700 transition hover:text-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
            >
              Tools
            </button>
            {toolsOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="p-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block rounded px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#16324F]"
                    >
                      {tool.name}
                    </Link>
                  ))}
                  <Link
                    href="/tools"
                    className="block rounded px-3 py-2 text-sm font-semibold text-[#16324F] transition hover:bg-gray-50"
                  >
                    View All Tools →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href={`tel:${PHONE_TEL}`}
            className="hidden rounded-full border border-[#16324F] px-4 py-2 text-sm font-semibold text-[#16324F] transition hover:bg-[#16324F] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F] md:inline-flex"
          >
            Call {PHONE_DISPLAY}
          </Link>
          <Link
            href="#lead-form"
            className="inline-flex items-center rounded-full bg-[#DAA520] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-gray-900 transition hover:bg-[#c4911b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
          >
            START REQUEST
          </Link>
        </div>
      </div>
    </header>
  );
}

