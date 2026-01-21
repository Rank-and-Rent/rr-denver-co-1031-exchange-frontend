"use client";

import { useState } from "react";

interface DebtReliefResult {
  mortgageBoot: number;
  estimatedTax: number;
  isValid: boolean;
  errors: string[];
}

export default function DebtReliefCalculator() {
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("20");
  const [results, setResults] = useState<DebtReliefResult | null>(null);

  const calculateDebtRelief = () => {
    const errors: string[] = [];
    
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;
    const rate = parseFloat(taxRate);

    if (oldMort < 0) {
      errors.push("Old mortgage balance cannot be negative.");
    }
    if (newMort < 0) {
      errors.push("New mortgage balance cannot be negative.");
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      errors.push("Tax rate must be between 0 and 100.");
    }

    if (errors.length > 0) {
      setResults({ mortgageBoot: 0, estimatedTax: 0, isValid: false, errors });
      return;
    }

    // Mortgage boot = old mortgage - new mortgage (only if positive)
    const mortgageBoot = Math.max(0, oldMort - newMort);
    
    // Estimated tax on mortgage boot
    const estimatedTaxAmount = mortgageBoot * (rate / 100);

    setResults({
      mortgageBoot,
      estimatedTax: estimatedTaxAmount,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "oldMortgage":
        setOldMortgage(numValue);
        break;
      case "newMortgage":
        setNewMortgage(numValue);
        break;
      case "taxRate":
        setTaxRate(numValue);
        break;
    }
    if (results) {
      calculateDebtRelief();
    }
  };

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">
          Debt Relief Calculator
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Calculate the potential mortgage boot when your new debt is less than your old debt.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Old Mortgage Balance ($)
          </label>
          <input
            type="text"
            value={oldMortgage}
            onChange={(e) => handleInputChange("oldMortgage", e.target.value)}
            placeholder="500,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mortgage balance on relinquished property
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            New Mortgage Balance ($)
          </label>
          <input
            type="text"
            value={newMortgage}
            onChange={(e) => handleInputChange("newMortgage", e.target.value)}
            placeholder="400,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mortgage balance on replacement property
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Estimated Tax Rate (%)
          </label>
          <input
            type="text"
            value={taxRate}
            onChange={(e) => handleInputChange("taxRate", e.target.value)}
            placeholder="20"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Estimated capital gains tax rate (illustrative only)
          </p>
        </div>
      </div>

      <button
        onClick={calculateDebtRelief}
        className="w-full bg-warm-brown px-6 py-3 font-medium text-white transition hover:bg-warm-brown/90 focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2"
      >
        Calculate Debt Relief
      </button>

      {results && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-warm-brown">
            Debt Relief Results
          </h3>

          {!results.isValid && results.errors.length > 0 && (
            <div className="border-l-4 border-red-500 bg-white p-6">
              <h4 className="font-medium text-red-800">Please correct the following errors:</h4>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-red-700">
                {results.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {results.isValid && (
            <div className="space-y-4">
              {results.mortgageBoot > 0 ? (
                <>
                  <div className="bg-white p-6 border-l-4 border-yellow-500">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Mortgage Boot</p>
                    <p className="mt-2 text-2xl font-medium text-gray-900">
                      ${results.mortgageBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Taxable boot created when new debt is less than old debt
                    </p>
                  </div>

                  <div className="bg-warm-brown p-6 text-white">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">Estimated Tax on Mortgage Boot</p>
                    <p className="mt-2 text-3xl font-medium">
                      ${results.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Estimated tax at {taxRate}% rate (illustrative only - actual rates vary)
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-white p-6 border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-800">No Mortgage Boot</p>
                      <p className="text-xs text-green-700 mt-1">
                        Your new mortgage equals or exceeds the old mortgage. No debt relief boot is created.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Debt Difference</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${(parseFloat(oldMortgage) - parseFloat(newMortgage)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Old mortgage minus new mortgage
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="border-l-4 border-warm-brown bg-white p-6 text-sm text-gray-700">
        <h3 className="mb-3 font-medium text-warm-brown">Understanding Debt Relief and Mortgage Boot</h3>
        <div className="space-y-2">
          <p>
            <strong>Mortgage Boot:</strong> When the new mortgage on your replacement property is less than the old mortgage on your relinquished property, the difference is considered "mortgage relief" or "mortgage boot." This creates taxable income even in a 1031 exchange.
          </p>
          <p>
            <strong>How It Works:</strong> If you had a $500,000 mortgage on the old property and only take out a $400,000 mortgage on the new property, you've received $100,000 in mortgage relief. This $100,000 is taxable boot, subject to capital gains tax.
          </p>
          <p>
            <strong>Avoiding Mortgage Boot:</strong> To avoid mortgage boot, ensure your new mortgage equals or exceeds your old mortgage. You can also add cash to the replacement property purchase to make up the difference.
          </p>
          <p>
            <strong>Tax Implications:</strong> Mortgage boot is recognized as taxable gain to the extent of your total gain on the exchange. The tax rate depends on your income bracket and how long you held the property.
          </p>
          <p>
            <strong>Important:</strong> This calculator provides illustrative estimates only. Actual tax rates and treatment depend on your specific situation. Consult a tax advisor for precise calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
