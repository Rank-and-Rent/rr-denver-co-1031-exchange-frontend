"use client";

import { useMemo, useState } from "react";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

const addDays = (base: Date, days: number) => {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export function TimelineTracker() {
  const [closingDate, setClosingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const milestones = useMemo(() => {
    const base = new Date(closingDate);
    return [
      {
        label: "Sale Closed",
        date: base,
        notes: "Funds move directly to the intermediary.",
      },
      {
        label: "Identification Plan Drafted",
        date: addDays(base, 15),
        notes: "Begin documenting potential replacement properties.",
      },
      {
        label: "45 Day Deadline",
        date: addDays(base, 45),
        notes: "Identification letter delivered to intermediary.",
      },
      {
        label: "Financing and Diligence Complete",
        date: addDays(base, 120),
        notes: "Appraisals, inspections, and lender approvals on file.",
      },
      {
        label: "180 Day Deadline",
        date: addDays(base, 180),
        notes: "Replacement property closing complete.",
      },
    ];
  }, [closingDate]);

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">Timeline Tracker</h2>
        <p className="mt-2 text-sm text-gray-600">
          Visualize major actions between the relinquished sale and replacement closing.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
          Sale Closing Date
        </label>
        <input
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
        />
      </div>

      <ol className="space-y-4">
        {milestones.map((milestone, index) => (
          <li
            key={milestone.label}
            className={index === 2 || index === 4 ? "bg-warm-brown p-6 text-white" : "bg-white p-6"}
          >
            <p className={`text-xs font-medium uppercase tracking-[0.15em] ${index === 2 || index === 4 ? "text-white/70" : "text-warm-brown"}`}>
              {milestone.label}
            </p>
            <p className={`mt-2 text-2xl font-medium ${index === 2 || index === 4 ? "text-white" : "text-gray-900"}`}>
              {formatDate(milestone.date)}
            </p>
            <p className={`mt-1 text-sm ${index === 2 || index === 4 ? "text-white/80" : "text-gray-500"}`}>
              {milestone.notes}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
