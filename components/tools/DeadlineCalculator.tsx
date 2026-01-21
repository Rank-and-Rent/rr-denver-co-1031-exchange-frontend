"use client";

import { useMemo, useState } from "react";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

const addDays = (base: Date, days: number) => {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export function DeadlineCalculator() {
  const [closingDate, setClosingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const deadlines = useMemo(() => {
    const base = new Date(closingDate);
    return {
      identifying: addDays(base, 45),
      closing: addDays(base, 180),
    };
  }, [closingDate]);

  return (
    <div className="space-y-6 bg-cream p-8">
      <div>
        <h3 className="text-xl font-medium text-gray-900">45 and 180 day deadlines</h3>
        <p className="mt-1 text-sm text-gray-600">
          Enter your relinquished closing date to calculate the IRS deadlines in{" "}
          {timezone}.
        </p>
      </div>
      <label className="block text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
        Closing date
        <input
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
        />
      </label>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Identification deadline
          </p>
          <p className="mt-2 text-lg font-medium text-gray-900">
            {formatDate(deadlines.identifying)}
          </p>
          <p className="mt-1 text-xs text-gray-500">45 days after closing</p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Replacement closing deadline
          </p>
          <p className="mt-2 text-lg font-medium text-gray-900">
            {formatDate(deadlines.closing)}
          </p>
          <p className="mt-1 text-xs text-gray-500">180 days after closing</p>
        </div>
      </div>
    </div>
  );
}

