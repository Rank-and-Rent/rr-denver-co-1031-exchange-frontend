"use client";

import { useEffect, useState, type FocusEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { toolsData } from "@/data/tools";
import {
  BRAND_NAME,
  CONTACT_ROUTE,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
} from "@/lib/constants";

type MenuKey = "services" | "locations" | "tools" | null;

const locationMenu = locationsData
  .filter((location) => location.type === "city" || location.slug === "remote")
  .slice(0, 8);

const serviceMenu = [
  ...servicesData
    .filter((service) => service.category === "Property Paths")
    .slice(0, 5),
  ...servicesData
    .filter((service) => service.category === "Timelines")
    .slice(0, 3),
];

const utilityLinks = [
  { label: "Property Types", href: "/property-types" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMenuToggle = (menu: MenuKey) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpenMenu(null);
    }
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {label}
    </Link>
  );

  return (
    <header 
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-warm-brown/95 backdrop-blur shadow-lg" 
          : "bg-warm-brown"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8 lg:py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/1031-exchange-of-denver-co-logo.png"
              alt={BRAND_NAME}
              width={120}
              height={32}
              className="h-auto w-auto max-h-8 brightness-0 invert"
              priority
            />
            <span className="sr-only">{BRAND_NAME}</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
              aria-controls="services-menu"
              onFocus={() => setOpenMenu("services")}
            >
              Services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id="services-menu"
              role="menu"
              aria-label="Services"
              className={clsx(
                "absolute left-0 top-full mt-2 w-80 border border-warm-brown/20 bg-white p-4 shadow-luxury-lg transition-all duration-200",
                openMenu === "services"
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
              )}
            >
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown">
                Exchange Support
              </p>
              <ul className="mt-3 space-y-1">
                {serviceMenu.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 transition hover:bg-cream hover:text-warm-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
                    >
                      <span className="block font-medium text-gray-900">
                        {service.name}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        {service.short}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-4 inline-flex w-full items-center justify-center border border-warm-brown px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown transition hover:bg-warm-brown hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
              >
                View all {servicesData.length} services
              </Link>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu(null)}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "locations"}
              aria-controls="locations-menu"
              onFocus={() => setOpenMenu("locations")}
            >
              Locations
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id="locations-menu"
              role="menu"
              aria-label="Locations"
              className={clsx(
                "absolute left-0 top-full mt-2 w-72 border border-warm-brown/20 bg-white p-4 shadow-luxury-lg transition-all duration-200",
                openMenu === "locations"
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
              )}
            >
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown">
                Metro Coverage
              </p>
              <ul className="mt-3 space-y-1">
                {locationMenu.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 transition hover:bg-cream hover:text-warm-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
                    >
                      <span className="block font-medium text-gray-900">
                        {location.name}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        View exchange support
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="mt-4 inline-flex w-full items-center justify-center border border-warm-brown px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown transition hover:bg-warm-brown hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
              >
                View all locations
              </Link>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("tools")}
            onMouseLeave={() => setOpenMenu(null)}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "tools"}
              aria-controls="tools-menu"
              onFocus={() => setOpenMenu("tools")}
            >
              Tools
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id="tools-menu"
              role="menu"
              aria-label="Tools"
              className={clsx(
                "absolute left-0 top-full mt-2 w-80 border border-warm-brown/20 bg-white p-4 shadow-luxury-lg transition-all duration-200",
                openMenu === "tools"
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
              )}
            >
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown">
                Calculators
              </p>
              <ul className="mt-3 space-y-1">
                {toolsData.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.href}
                      className="block px-3 py-2 text-sm text-gray-700 transition hover:bg-cream hover:text-warm-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
                    >
                      <span className="block font-medium text-gray-900">
                        {tool.name}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        {tool.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/tools"
                className="mt-4 inline-flex w-full items-center justify-center border border-warm-brown px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown transition hover:bg-warm-brown hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown"
              >
                View all tools
              </Link>
            </div>
          </div>
          {utilityLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="px-4 py-2 text-sm font-medium text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {PRIMARY_PHONE_DISPLAY}
          </Link>
          <Link
            href={CONTACT_ROUTE}
            className="inline-flex items-center border border-white/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-warm-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-white transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        className={clsx(
          "border-t border-white/10 bg-warm-brown px-4 pb-6 pt-4 text-white lg:hidden overflow-y-auto max-h-[calc(100vh-80px)]",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Services
            </p>
            <ul className="mt-3 space-y-2">
              {serviceMenu.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block border-b border-white/10 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-3 inline-flex items-center text-sm font-semibold text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              View all services
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Locations
            </p>
            <ul className="mt-3 space-y-2">
              {locationMenu.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="block border-b border-white/10 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/locations"
              className="mt-3 inline-flex items-center text-sm font-semibold text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              View all locations
            </Link>
          </div>
          <div className="space-y-2">
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-white/10 py-2 text-sm font-medium text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Tools
            </p>
            <ul className="mt-3 space-y-2">
              {toolsData.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="block border-b border-white/10 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tools"
              className="mt-3 inline-flex items-center text-sm font-semibold text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              View all tools
            </Link>
          </div>
          <div className="space-y-3 pt-4">
            <Link
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="block text-center py-3 text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </Link>
            <Link
              href={CONTACT_ROUTE}
              className="block w-full border border-white py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-warm-brown"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

