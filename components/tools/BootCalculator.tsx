"use client";

import { useState } from "react";

interface BootCalculationResult {
  cashBoot: number;
  mortgageBoot: number;
  totalBoot: number;
  estimatedTax: number;
  isValid: boolean;
  errors: string[];
}

export default function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [replacementValue, setReplacementValue] = useState<string>("");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");
  const [results, setResults] = useState<BootCalculationResult | null>(null);

  const calculateBoot = () => {
    const errors: string[] = [];
    
    const relValue = parseFloat(relinquishedValue);
    const repValue = parseFloat(replacementValue);
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    if (isNaN(relValue) || relValue <= 0) {
      errors.push("Relinquished property value must be greater than zero.");
    }
    if (isNaN(repValue) || repValue <= 0) {
      errors.push("Replacement property value must be greater than zero.");
    }
    if (cash < 0) {
      errors.push("Cash received cannot be negative.");
    }
    if (oldMort < 0) {
      errors.push("Old mortgage cannot be negative.");
    }
    if (newMort < 0) {
      errors.push("New mortgage cannot be negative.");
    }

    if (errors.length > 0) {
      setResults({ cashBoot: 0, mortgageBoot: 0, totalBoot: 0, estimatedTax: 0, isValid: false, errors });
      return;
    }

    const cashBoot = Math.max(0, cash);
    const mortgageBoot = Math.max(0, oldMort - newMort);
    const totalBoot = cashBoot + mortgageBoot;
    const estimatedTax = totalBoot * 0.20;

    setResults({
      cashBoot,
      mortgageBoot,
      totalBoot,
      estimatedTax,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "relinquished":
        setRelinquishedValue(numValue);
        break;
      case "replacement":
        setReplacementValue(numValue);
        break;
      case "cash":
        setCashReceived(numValue);
        break;
      case "oldMortgage":
        setOldMortgage(numValue);
        break;
      case "newMortgage":
        setNewMortgage(numValue);
        break;
    }
    if (results) {
      calculateBoot();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Boot Calculator Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="relinquished-value"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Relinquished Property Value ($)
            </label>
            <input
              id="relinquished-value"
              type="text"
              value={relinquishedValue}
              onChange={(e) => handleInputChange("relinquished", e.target.value)}
              placeholder="1,000,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Sale price of the property you are selling
            </p>
          </div>

          <div>
            <label
              htmlFor="replacement-value"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Replacement Property Value ($)
            </label>
            <input
              id="replacement-value"
              type="text"
              value={replacementValue}
              onChange={(e) => handleInputChange("replacement", e.target.value)}
              placeholder="1,200,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Purchase price of the replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="cash-received"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Cash Received ($)
            </label>
            <input
              id="cash-received"
              type="text"
              value={cashReceived}
              onChange={(e) => handleInputChange("cash", e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Cash received from the sale (not reinvested)
            </p>
          </div>

          <div>
            <label
              htmlFor="old-mortgage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Old Mortgage Balance ($)
            </label>
            <input
              id="old-mortgage"
              type="text"
              value={oldMortgage}
              onChange={(e) => handleInputChange("oldMortgage", e.target.value)}
              placeholder="500,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mortgage balance on relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="new-mortgage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Mortgage Balance ($)
            </label>
            <input
              id="new-mortgage"
              type="text"
              value={newMortgage}
              onChange={(e) => handleInputChange("newMortgage", e.target.value)}
              placeholder="600,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mortgage balance on replacement property
            </p>
          </div>
        </div>

        <button
          onClick={calculateBoot}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Calculate Boot
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Boot Calculation Results
          </h2>

          {!results.isValid && results.errors.length > 0 && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-800">Please correct the following errors:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {results.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {results.isValid && (
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Cash Boot:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.cashBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Cash received and not reinvested in the replacement property
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Mortgage Boot:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.mortgageBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Mortgage relief when new debt is less than old debt
                </p>
              </div>

              <div className="rounded-lg border-2 border-[#0B3C5D] bg-[#0B3C5D]/5 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total Boot:</span>
                  <span className="text-2xl font-bold text-[#0B3C5D]">
                    ${results.totalBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Total boot equals cash boot plus mortgage boot
                </p>
              </div>

              <div className="rounded-lg border border-[#C9A227] bg-[#C9A227]/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Estimated Tax on Boot:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Estimated at 20% (illustrative only - actual rates vary)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Boot</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Cash Boot:</strong> Any cash received from the sale that is not reinvested in the replacement property. Cash boot is taxable to the extent of gain realized.
          </p>
          <p>
            <strong>Mortgage Boot:</strong> When the new mortgage is less than the old mortgage, the difference is considered mortgage relief and creates taxable boot. To avoid mortgage boot, ensure the replacement property debt equals or exceeds the relinquished property debt.
          </p>
          <p>
            <strong>Total Boot:</strong> The sum of cash boot and mortgage boot. This amount is recognized as taxable gain, subject to capital gains tax rates.
          </p>
        </div>
      </div>
    </div>
  );
}

