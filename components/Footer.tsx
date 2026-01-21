import Link from "next/link";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { toolsData } from "@/data/tools";
import {
  BRAND_NAME,
  CONTACT_ROUTE,
  OFFICE_ADDRESS,
  PRIMARY_CITY,
  PRIMARY_EMAIL,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
  SUPPORT_HOURS,
} from "@/lib/constants";

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.475792859084!2d-104.9599987!3d39.7407368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78a4d7d9da07%3A0xf7b2f8fc86fae1e9!2s1510%20York%20St%2C%20Denver%2C%20CO%2080206!5e0!3m2!1sen!2sus!4v1731715200";

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: CONTACT_ROUTE },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemaps", href: "/sitemap.xml" },
];

const topServices = servicesData
  .filter((service) => service.category === "Property Paths")
  .slice(0, 6);

const topLocations = locationsData
  .filter((location) => location.type === "city")
  .slice(0, 6);

export default function Footer() {

  return (
    <footer className="bg-[#4A3520] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              {BRAND_NAME}
            </p>
            <p className="text-3xl font-light text-white">
              Denver 1031 Exchange Desk
            </p>
            <p className="text-sm font-light text-white/70">
              Secure intake, property matching, and intermediary coordination
              for investors operating in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
              We organize every milestone from relinquished sale through
              replacement close.
            </p>
            <div className="border border-white/20 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">
                Visit by appointment
              </p>
              <p className="text-sm text-white/70">{OFFICE_ADDRESS}</p>
              <p className="text-xs text-white/50">
                Hours: {SUPPORT_HOURS} support line
              </p>
              <div className="mt-3 overflow-hidden border border-white/10">
                <iframe
                  title={`Map of ${OFFICE_ADDRESS}`}
                  src={mapSrc}
                  loading="lazy"
                  className="h-40 w-full grayscale"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-3 inline-flex text-sm font-medium text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View all services
            </Link>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Locations
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {topLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/locations"
              className="mt-3 inline-flex text-sm font-medium text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View all locations
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Contact
            </p>
            <Link
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="block text-sm text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </Link>
            <Link
              href={`mailto:${PRIMARY_EMAIL}`}
              className="block text-sm text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {PRIMARY_EMAIL}
            </Link>
            <Link
              href={CONTACT_ROUTE}
              className="inline-flex items-center justify-center border border-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#4A3520] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Start Intake
            </Link>
            <div className="pt-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                Resources
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Tools
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {toolsData.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tools"
              className="mt-3 inline-flex text-sm font-medium text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View all tools
            </Link>
          </div>
        </div>
        <div className="mt-12 space-y-4 border border-white/10 bg-white/5 p-6 text-xs text-white/60">
          <p>
            This site helps investors identify potential replacement properties
            for Section 1031 exchanges in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <p>
            This site is not a Qualified Intermediary, law firm, broker, or CPA.
          </p>
          <p>
            Users should consult a Qualified Intermediary and tax advisor before
            acting on educational material provided here.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/50 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/terms"
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/sitemap.xml"
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

