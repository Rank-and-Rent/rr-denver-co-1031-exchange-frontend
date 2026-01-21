"use client";

import { useState } from "react";

interface DepreciationResult {
  totalDepreciation: number;
  recaptureTax: number;
  netAfterRecapture: number;
  isValid: boolean;
  errors: string[];
}

export default function DepreciationRecaptureEstimator() {
  const [originalCost, setOriginalCost] = useState<string>("");
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [recaptureRate, setRecaptureRate] = useState<string>("25");
  const [results, setResults] = useState<DepreciationResult | null>(null);

  const calculateRecapture = () => {
    const errors: string[] = [];
    
    const cost = parseFloat(originalCost);
    const depreciation = parseFloat(accumulatedDepreciation) || 0;
    const sale = parseFloat(salePrice);
    const rate = parseFloat(recaptureRate);

    if (isNaN(cost) || cost <= 0) {
      errors.push("Original cost basis must be greater than zero.");
    }
    if (depreciation < 0) {
      errors.push("Accumulated depreciation cannot be negative.");
    }
    if (isNaN(sale) || sale <= 0) {
      errors.push("Sale price must be greater than zero.");
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      errors.push("Recapture tax rate must be between 0 and 100.");
    }
    if (depreciation > cost) {
      errors.push("Accumulated depreciation cannot exceed original cost basis.");
    }

    if (errors.length > 0) {
      setResults({ totalDepreciation: 0, recaptureTax: 0, netAfterRecapture: 0, isValid: false, errors });
      return;
    }

    // Adjusted basis = original cost - accumulated depreciation
    const adjustedBasis = cost - depreciation;
    
    // Gain = sale price - adjusted basis
    const totalGain = sale - adjustedBasis;
    
    // Depreciation recapture is the lesser of: accumulated depreciation or total gain
    const totalDepreciationRecapture = Math.min(depreciation, Math.max(0, totalGain));
    
    // Recapture tax (typically 25% for unrecaptured Section 1250 gain)
    const recaptureTaxAmount = totalDepreciationRecapture * (rate / 100);
    
    // Net proceeds after recapture tax
    const netAfterRecapture = sale - recaptureTaxAmount;

    setResults({
      totalDepreciation: totalDepreciationRecapture,
      recaptureTax: recaptureTaxAmount,
      netAfterRecapture,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "originalCost":
        setOriginalCost(numValue);
        break;
      case "depreciation":
        setAccumulatedDepreciation(numValue);
        break;
      case "salePrice":
        setSalePrice(numValue);
        break;
      case "rate":
        setRecaptureRate(numValue);
        break;
    }
    if (results) {
      calculateRecapture();
    }
  };

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">
          Depreciation Recapture Estimator
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Calculate the potential depreciation recapture tax on your property sale.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Original Cost Basis ($)
          </label>
          <input
            type="text"
            value={originalCost}
            onChange={(e) => handleInputChange("originalCost", e.target.value)}
            placeholder="500,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Original purchase price plus improvements
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Accumulated Depreciation ($)
          </label>
          <input
            type="text"
            value={accumulatedDepreciation}
            onChange={(e) => handleInputChange("depreciation", e.target.value)}
            placeholder="100,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Total depreciation taken over ownership period
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Sale Price ($)
          </label>
          <input
            type="text"
            value={salePrice}
            onChange={(e) => handleInputChange("salePrice", e.target.value)}
            placeholder="750,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Sale price of the relinquished property
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Recapture Tax Rate (%)
          </label>
          <input
            type="text"
            value={recaptureRate}
            onChange={(e) => handleInputChange("rate", e.target.value)}
            placeholder="25"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Typically 25% for unrecaptured Section 1250 gain (illustrative)
          </p>
        </div>
      </div>

      <button
        onClick={calculateRecapture}
        className="w-full bg-warm-brown px-6 py-3 font-medium text-white transition hover:bg-warm-brown/90 focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2"
      >
        Calculate Depreciation Recapture
      </button>

      {results && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-warm-brown">
            Recapture Results
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
              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Adjusted Basis</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${(parseFloat(originalCost) - (parseFloat(accumulatedDepreciation) || 0)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Original cost minus accumulated depreciation
                </p>
              </div>

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Total Gain</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${(parseFloat(salePrice) - (parseFloat(originalCost) - (parseFloat(accumulatedDepreciation) || 0))).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Sale price minus adjusted basis
                </p>
              </div>

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Depreciation Recapture</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${results.totalDepreciation.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Lesser of accumulated depreciation or total gain
                </p>
              </div>

              <div className="bg-warm-brown p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">Recapture Tax</p>
                <p className="mt-2 text-3xl font-medium">
                  ${results.recaptureTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Tax on depreciation recapture at {recaptureRate}% rate (illustrative)
                </p>
              </div>

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Net Proceeds After Recapture</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${results.netAfterRecapture.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Sale price minus recapture tax
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="border-l-4 border-warm-brown bg-white p-6 text-sm text-gray-700">
        <h3 className="mb-3 font-medium text-warm-brown">Understanding Depreciation Recapture</h3>
        <div className="space-y-2">
          <p>
            <strong>Depreciation Recapture:</strong> When you sell a rental property, the IRS requires you to "recapture" depreciation deductions you've taken. This recaptured depreciation is taxed at a higher rate (typically 25% for unrecaptured Section 1250 gain) than long-term capital gains.
          </p>
          <p>
            <strong>How It Works:</strong> The amount subject to recapture is the lesser of: (1) the total depreciation you've taken, or (2) your total gain on the sale. Even in a 1031 exchange, depreciation recapture may still apply if boot is received.
          </p>
          <p>
            <strong>1031 Exchange Impact:</strong> A fully deferred 1031 exchange can defer depreciation recapture along with capital gains. However, if you receive boot (cash or mortgage relief), a portion of the recapture may be recognized.
          </p>
          <p>
            <strong>Important:</strong> Actual tax rates vary based on your income bracket, property type, and other factors. Consult a tax advisor for precise calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
