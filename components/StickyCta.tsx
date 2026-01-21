"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CONTACT_ROUTE,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
} from "@/lib/constants";

export default function StickyCta() {
  const [mobileCollapsed, setMobileCollapsed] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex">
        <Link
          href={CONTACT_ROUTE}
          className="inline-flex items-center gap-3 bg-[#785530] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-luxury-lg transition hover:bg-[#4A3520] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#785530]"
        >
          Plan My Exchange
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#785530]/20 bg-white/95 backdrop-blur px-4 py-3 text-gray-900 shadow-luxury lg:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileCollapsed((prev) => !prev)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#785530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#785530]"
            aria-expanded={!mobileCollapsed}
          >
            {mobileCollapsed ? "Open" : "Close"}
          </button>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
            45 / 180 tracker
          </p>
        </div>
        {!mobileCollapsed && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center border border-[#785530] px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#785530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#785530]"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <Link
              href={CONTACT_ROUTE}
              className="inline-flex items-center justify-center bg-[#785530] px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#785530]"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </>
  );
}