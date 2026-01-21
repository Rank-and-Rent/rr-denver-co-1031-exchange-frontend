"use client";

import { useMemo, useState } from "react";

type FieldKey =
  | "relinquishedValue"
  | "replacementValue"
  | "cashReceived"
  | "oldMortgage"
  | "newMortgage";

type FieldState = Record<FieldKey, string>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function BootCalculator() {
  const [fields, setFields] = useState<FieldState>({
    relinquishedValue: "",
    replacementValue: "",
    cashReceived: "",
    oldMortgage: "",
    newMortgage: "",
  });

  const parsed = useMemo(() => {
    const entries = Object.entries(fields).map(([key, value]) => [
      key,
      value === "" ? null : Number(value),
    ]);
    return Object.fromEntries(entries) as Record<FieldKey, number | null>;
  }, [fields]);

  const errors = useMemo(() => {
    const map: Partial<Record<FieldKey, string>> = {};
    (Object.keys(fields) as FieldKey[]).forEach((key) => {
      const value = parsed[key];
      if (value === null) {
        map[key] = "Required";
      } else if (Number.isNaN(value)) {
        map[key] = "Enter a numeric value";
      } else if (value < 0) {
        map[key] = "Must be zero or greater";
      }
    });
    return map;
  }, [parsed, fields]);

  const canShowResults = useMemo(
    () =>
      (Object.keys(fields) as FieldKey[]).every(
        (key) => fields[key] !== "" && !errors[key]
      ),
    [errors, fields]
  );

  const results = useMemo(() => {
    if (!canShowResults) {
      return null;
    }
    const cashBoot = Math.max(parsed.cashReceived ?? 0, 0);
    const mortgageBoot = Math.max(
      (parsed.oldMortgage ?? 0) - (parsed.newMortgage ?? 0),
      0
    );
    const totalBoot = cashBoot + mortgageBoot;
    const estimatedTax = totalBoot * 0.2;
    return { cashBoot, mortgageBoot, totalBoot, estimatedTax };
  }, [canShowResults, parsed]);

  const handleChange = (field: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value.replace(/[^0-9.]/g, "") }));
  };

  const fieldMeta: Array<{
    key: FieldKey;
    label: string;
    helper: string;
    placeholder: string;
  }> = [
    {
      key: "relinquishedValue",
      label: "Relinquished Property Value ($)",
      helper: "Sale price of the property being sold",
      placeholder: "1,000,000",
    },
    {
      key: "replacementValue",
      label: "Replacement Property Value ($)",
      helper: "Purchase price of the incoming property",
      placeholder: "1,200,000",
    },
    {
      key: "cashReceived",
      label: "Cash Received ($)",
      helper: "Cash retained outside the exchange",
      placeholder: "0",
    },
    {
      key: "oldMortgage",
      label: "Old Mortgage Balance ($)",
      helper: "Debt paid off on relinquished property",
      placeholder: "500,000",
    },
    {
      key: "newMortgage",
      label: "New Mortgage Balance ($)",
      helper: "Debt on the replacement property",
      placeholder: "600,000",
    },
  ];

  return (
    <div className="tool-card space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-gray-900">Boot inputs</h2>
        <p className="mt-1 text-sm text-gray-600">
          Values update as you type. Leave the field at zero if it does not apply.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {fieldMeta.map(({ key, label, helper, placeholder }) => (
          <label key={key} className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            {label}
            <input
              type="number"
              inputMode="decimal"
              value={fields[key]}
              onChange={(event) => handleChange(key, event.target.value)}
              placeholder={placeholder}
              className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
            />
            <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-gray-500">{helper}</span>
            {errors[key] ? (
              <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-red-600">{errors[key]}</span>
            ) : null}
          </label>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Cash boot
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.cashBoot) : "—"}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Cash withheld from exchange proceeds and not reinvested.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Mortgage boot
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.mortgageBoot) : "—"}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Mortgage relief when the new loan is smaller than the old loan.
          </p>
        </div>
      </div>

      <div className="bg-warm-brown p-6 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
          Total boot
        </p>
        <p className="mt-2 text-3xl font-medium">
          {results ? currencyFormatter.format(results.totalBoot) : "—"}
        </p>
        <p className="mt-2 text-sm text-white/80">
          Total boot is the sum of cash boot and mortgage boot.
        </p>
      </div>

      <div className="bg-white p-6">
        <p className="text-sm font-medium text-gray-900">Illustrative tax (20%)</p>
        <p className="mt-2 text-2xl font-medium text-warm-brown">
          {results ? currencyFormatter.format(results.estimatedTax) : "—"}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Uses a 20% rate for demonstration. Confirm actual exposure with your tax advisor.
        </p>
      </div>

      <div className="border-l-4 border-warm-brown bg-white p-6 text-sm text-gray-700">
        <p className="mb-2 font-medium text-gray-900">Boot refresher</p>
        <p>
          <strong>Cash boot</strong> equals the equity removed from the exchange.{" "}
          <strong>Mortgage boot</strong> occurs when debt decreases. Both amounts are
          generally taxable to the extent of gain.
        </p>
      </div>
      <style jsx>{`
        @media print {
          .tool-card {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
