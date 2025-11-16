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
      className="rounded-full px-3 py-1 text-sm font-semibold text-slate-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/1031-exchange-of-denver-co-logo.png"
              alt={BRAND_NAME}
              width={100}
              height={28}
              className="h-auto w-auto max-h-7"
              priority
            />
            <span className="sr-only">{BRAND_NAME}</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-4 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
            onFocus={() => setOpenMenu("services")}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="rounded-full px-4 py-1 text-sm font-semibold text-slate-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
              aria-controls="services-menu"
              onClick={() => handleMenuToggle("services")}
            >
              Services
            </button>
            <div
              id="services-menu"
              role="menu"
              aria-label="Services"
              className={clsx(
                "absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur transition-opacity",
                openMenu === "services"
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/70">
                Exchange Support
              </p>
              <ul className="mt-2 space-y-1">
                {serviceMenu.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="block font-semibold text-white">
                        {service.name}
                      </span>
                      <span className="block text-xs text-slate-300">
                        {service.short}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-amber-200/50 px-3 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                View all {servicesData.length} services
              </Link>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("locations")}
            onMouseLeave={() => setOpenMenu(null)}
            onFocus={() => setOpenMenu("locations")}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="rounded-full px-4 py-1 text-sm font-semibold text-slate-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "locations"}
              aria-controls="locations-menu"
              onClick={() => handleMenuToggle("locations")}
            >
              Locations
            </button>
            <div
              id="locations-menu"
              role="menu"
              aria-label="Locations"
              className={clsx(
                "absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur transition-opacity",
                openMenu === "locations"
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/70">
                Metro Coverage
              </p>
              <ul className="mt-2 space-y-1">
                {locationMenu.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="block font-semibold text-white">
                        {location.name}
                      </span>
                      <span className="block text-xs text-slate-300">
                        View exchange support
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-amber-200/50 px-3 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                View all locations
              </Link>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("tools")}
            onMouseLeave={() => setOpenMenu(null)}
            onFocus={() => setOpenMenu("tools")}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="rounded-full px-4 py-1 text-sm font-semibold text-slate-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={openMenu === "tools"}
              aria-controls="tools-menu"
              onClick={() => handleMenuToggle("tools")}
            >
              Tools
            </button>
            <div
              id="tools-menu"
              role="menu"
              aria-label="Tools"
              className={clsx(
                "absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur transition-opacity",
                openMenu === "tools"
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/70">
                Calculators
              </p>
              <ul className="mt-2 space-y-1">
                {toolsData.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.href}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="block font-semibold text-white">
                        {tool.name}
                      </span>
                      <span className="block text-xs text-slate-300">
                        {tool.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/tools"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-amber-200/50 px-3 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                View all tools
              </Link>
            </div>
          </div>
          {utilityLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Call {PRIMARY_PHONE_DISPLAY}
          </Link>
          <Link
            href={CONTACT_ROUTE}
            className="inline-flex items-center rounded-full bg-amber-300 px-3 py-1 text-sm font-semibold tracking-[0.18em] text-slate-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            CONTACT TEAM
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
      <div
        id="mobile-menu"
        className={clsx(
          "border-t border-white/5 bg-slate-950/95 px-4 pb-6 pt-2 text-white lg:hidden overflow-y-auto max-h-[calc(100vh-80px)]",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              Services
            </p>
            <ul className="mt-2 space-y-2">
              {serviceMenu.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block rounded-xl bg-white/5 px-4 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-2 inline-flex items-center text-sm font-semibold text-amber-200"
              onClick={() => setMobileOpen(false)}
            >
              View all services
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              Locations
            </p>
            <ul className="mt-2 space-y-2">
              {locationMenu.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="block rounded-xl bg-white/5 px-4 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/locations"
              className="mt-2 inline-flex items-center text-sm font-semibold text-amber-200"
              onClick={() => setMobileOpen(false)}
            >
              View all locations
            </Link>
          </div>
          <div className="grid gap-2">
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              Tools
            </p>
            <ul className="mt-2 space-y-2">
              {toolsData.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="block rounded-xl bg-white/5 px-4 py-2 text-sm text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tools"
              className="mt-2 inline-flex items-center text-sm font-semibold text-amber-200"
              onClick={() => setMobileOpen(false)}
            >
              View all tools
            </Link>
          </div>
          <div className="grid gap-2">
            <Link
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </Link>
            <Link
              href={CONTACT_ROUTE}
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold tracking-[0.2em] text-slate-950"
              onClick={() => setMobileOpen(false)}
            >
              CONTACT TEAM
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

