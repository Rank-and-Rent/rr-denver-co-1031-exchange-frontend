"use client";

import { useMemo, useState } from "react";

type FieldKey =
  | "propertyValue"
  | "qiFeePercentage"
  | "escrowFee"
  | "titleInsuranceRate"
  | "recordingFees";

type FieldState = Record<FieldKey, string>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function ExchangeCostEstimator() {
  const [fields, setFields] = useState<FieldState>({
    propertyValue: "",
    qiFeePercentage: "1",
    escrowFee: "1500",
    titleInsuranceRate: "0.5",
    recordingFees: "500",
  });

  const parsed = useMemo(() => {
    const entries = Object.entries(fields).map(([key, value]) => [
      key,
      value === "" ? null : Number(value),
    ]);
    return Object.fromEntries(entries) as Record<FieldKey, number | null>;
  }, [fields]);

  const errors = useMemo(() => {
    const result: Partial<Record<FieldKey, string>> = {};
    if (!parsed.propertyValue || parsed.propertyValue <= 0) {
      result.propertyValue = "Enter a value above zero";
    }
    if (
      parsed.qiFeePercentage === null ||
      parsed.qiFeePercentage < 0 ||
      parsed.qiFeePercentage > 100
    ) {
      result.qiFeePercentage = "Enter 0 - 100%";
    }
    (["escrowFee", "recordingFees"] as Array<"escrowFee" | "recordingFees">).forEach(
      (key) => {
        if (parsed[key] === null || parsed[key]! < 0) {
          result[key] = "Must be zero or greater";
        }
      }
    );
    if (
      parsed.titleInsuranceRate === null ||
      parsed.titleInsuranceRate < 0 ||
      parsed.titleInsuranceRate > 2
    ) {
      result.titleInsuranceRate = "Enter a realistic percent (0 - 2%)";
    }
    return result;
  }, [parsed]);

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
    const qiFee = (parsed.propertyValue ?? 0) * ((parsed.qiFeePercentage ?? 0) / 100);
    const titleInsurance =
      (parsed.propertyValue ?? 0) * ((parsed.titleInsuranceRate ?? 0) / 100);
    const escrowFee = parsed.escrowFee ?? 0;
    const recordingFees = parsed.recordingFees ?? 0;
    const totalCosts = qiFee + titleInsurance + escrowFee + recordingFees;
    return { qiFee, titleInsurance, escrowFee, recordingFees, totalCosts };
  }, [canShowResults, parsed]);

  const handleChange = (field: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value.replace(/[^0-9.]/g, "") }));
  };

  const getValue = (field: FieldKey) =>
    fields[field] === "" ? "" : fields[field];

  const fieldMeta: Array<{
    key: FieldKey;
    label: string;
    helper: string;
    placeholder: string;
  }> = [
    {
      key: "propertyValue",
      label: "Property Value ($)",
      helper: "Estimated purchase price of the Houston replacement property.",
      placeholder: "1,000,000",
    },
    {
      key: "qiFeePercentage",
      label: "QI Fee Percentage (%)",
      helper: "Typical Houston rates range from 0.5% to 1.5%.",
      placeholder: "1",
    },
    {
      key: "escrowFee",
      label: "Escrow Fee ($)",
      helper: "Flat fee charged by the escrow or title company.",
      placeholder: "1,500",
    },
    {
      key: "titleInsuranceRate",
      label: "Title Insurance Rate (%)",
      helper: "Texas promulgated rates often range near 0.5%.",
      placeholder: "0.5",
    },
    {
      key: "recordingFees",
      label: "Harris County Recording Fees ($)",
      helper: "Most filings fall between $275 - $525.",
      placeholder: "500",
    },
  ];

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">Cost Inputs</h2>
        <p className="mt-2 text-sm text-gray-600">
          Estimate core expenses for a Houston 1031 exchange. Adjust values to match your
          closing disclosure.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {fieldMeta.map(({ key, label, helper, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
              {label}
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={getValue(key)}
              onChange={(event) => handleChange(key, event.target.value)}
              placeholder={placeholder}
              className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
            />
            <span className="mt-1 block text-xs text-gray-500">{helper}</span>
            {errors[key] ? (
              <span className="mt-1 block text-xs text-red-600">{errors[key]}</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="bg-warm-brown p-6 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
          Total Estimated Exchange Costs
        </p>
        <p className="mt-2 text-3xl font-medium">
          {results ? currencyFormatter.format(results.totalCosts) : "—"}
        </p>
        <p className="mt-2 text-sm text-white/80">
          Includes qualified intermediary, escrow, title insurance, and Harris County
          recording fees.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Qualified Intermediary Fee
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.qiFee) : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Covers escrow of exchange proceeds, assignment paperwork, and tracking.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Escrow Fee
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.escrowFee) : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Houston escrow providers typically quote a flat transaction fee.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Title Insurance
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.titleInsurance) : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Texas title premiums are regulated; enter your expected rate above.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Recording Fees
          </p>
          <p className="mt-2 text-2xl font-medium text-gray-900">
            {results ? currencyFormatter.format(results.recordingFees) : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Harris County recording averages $275–$525 depending on page counts.
          </p>
        </div>
      </div>

      <div className="border-l-4 border-warm-brown bg-white p-6 text-sm text-gray-700">
        <p className="mb-2 font-medium text-warm-brown">Note on Texas Transfer Taxes</p>
        <p>
          Texas does not impose a state real estate transfer tax, but local recording,
          documentary, and courier fees still apply. Always reconcile these estimates
          with your preliminary closing statement.
        </p>
      </div>
    </div>
  );
}
