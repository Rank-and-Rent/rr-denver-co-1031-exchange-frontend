"use client";

import { useState } from "react";

interface ReplacementValueResult {
  minimumReplacementValue: number;
  recommendedReplacementValue: number;
  equityToReinvest: number;
  isValid: boolean;
  errors: string[];
}

export default function ReplacementPropertyValueCalculator() {
  const [relinquishedSalePrice, setRelinquishedSalePrice] = useState<string>("");
  const [relinquishedMortgage, setRelinquishedMortgage] = useState<string>("");
  const [exchangeCosts, setExchangeCosts] = useState<string>("");
  const [cashToReceive, setCashToReceive] = useState<string>("0");
  const [newMortgageAmount, setNewMortgageAmount] = useState<string>("");
  const [results, setResults] = useState<ReplacementValueResult | null>(null);

  const calculateReplacementValue = () => {
    const errors: string[] = [];
    
    const salePrice = parseFloat(relinquishedSalePrice);
    const mortgage = parseFloat(relinquishedMortgage) || 0;
    const costs = parseFloat(exchangeCosts) || 0;
    const cashOut = parseFloat(cashToReceive) || 0;
    const newMortgage = parseFloat(newMortgageAmount) || 0;

    if (isNaN(salePrice) || salePrice <= 0) {
      errors.push("Relinquished property sale price must be greater than zero.");
    }
    if (mortgage < 0) {
      errors.push("Relinquished mortgage cannot be negative.");
    }
    if (costs < 0) {
      errors.push("Exchange costs cannot be negative.");
    }
    if (cashOut < 0) {
      errors.push("Cash to receive cannot be negative.");
    }
    if (newMortgage < 0) {
      errors.push("New mortgage amount cannot be negative.");
    }
    if (mortgage > salePrice) {
      errors.push("Mortgage balance cannot exceed sale price.");
    }
    if (cashOut + costs > salePrice - mortgage) {
      errors.push("Cash to receive plus exchange costs cannot exceed net proceeds.");
    }

    if (errors.length > 0) {
      setResults({ minimumReplacementValue: 0, recommendedReplacementValue: 0, equityToReinvest: 0, isValid: false, errors });
      return;
    }

    // Net proceeds from sale = sale price - mortgage - exchange costs - cash out
    const netProceeds = salePrice - mortgage - costs - cashOut;
    
    // Equity to reinvest = net proceeds
    const equityToReinvest = netProceeds;
    
    // Minimum replacement value = equity to reinvest + new mortgage
    // To defer all gain, replacement value must equal or exceed sale price
    // But we also need to account for the new mortgage
    const minimumReplacementValue = equityToReinvest + newMortgage;
    
    // Recommended replacement value adds a buffer (5% recommended)
    const recommendedReplacementValue = minimumReplacementValue * 1.05;

    setResults({
      minimumReplacementValue,
      recommendedReplacementValue,
      equityToReinvest,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "salePrice":
        setRelinquishedSalePrice(numValue);
        break;
      case "mortgage":
        setRelinquishedMortgage(numValue);
        break;
      case "costs":
        setExchangeCosts(numValue);
        break;
      case "cashOut":
        setCashToReceive(numValue);
        break;
      case "newMortgage":
        setNewMortgageAmount(numValue);
        break;
    }
    if (results) {
      calculateReplacementValue();
    }
  };

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">
          Replacement Property Value Calculator
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Calculate the minimum replacement property value needed to defer all gain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Relinquished Property Sale Price ($)
          </label>
          <input
            type="text"
            value={relinquishedSalePrice}
            onChange={(e) => handleInputChange("salePrice", e.target.value)}
            placeholder="1,000,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Sale price of the property you are selling
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Relinquished Mortgage Balance ($)
          </label>
          <input
            type="text"
            value={relinquishedMortgage}
            onChange={(e) => handleInputChange("mortgage", e.target.value)}
            placeholder="500,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Outstanding mortgage balance on relinquished property
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Exchange Costs ($)
          </label>
          <input
            type="text"
            value={exchangeCosts}
            onChange={(e) => handleInputChange("costs", e.target.value)}
            placeholder="15,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            QI fees, escrow, title insurance, recording fees
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Cash to Receive ($)
          </label>
          <input
            type="text"
            value={cashToReceive}
            onChange={(e) => handleInputChange("cashOut", e.target.value)}
            placeholder="0"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Cash you plan to take out (creates boot if not zero)
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            New Mortgage Amount ($)
          </label>
          <input
            type="text"
            value={newMortgageAmount}
            onChange={(e) => handleInputChange("newMortgage", e.target.value)}
            placeholder="600,000"
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mortgage amount on replacement property
          </p>
        </div>
      </div>

      <button
        onClick={calculateReplacementValue}
        className="w-full bg-warm-brown px-6 py-3 font-medium text-white transition hover:bg-warm-brown/90 focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2"
      >
        Calculate Minimum Replacement Value
      </button>

      {results && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-warm-brown">
            Replacement Value Results
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
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Net Proceeds from Sale</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${results.equityToReinvest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Sale price minus mortgage, costs, and cash out
                </p>
              </div>

              <div className="bg-warm-brown p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">Minimum Replacement Value</p>
                <p className="mt-2 text-3xl font-medium">
                  ${results.minimumReplacementValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Minimum value needed to defer all gain (equity + new mortgage)
                </p>
              </div>

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Recommended Replacement Value</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${results.recommendedReplacementValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Recommended value with 5% buffer for contingencies
                </p>
              </div>

              <div className="bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">Equity to Reinvest</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">
                  ${results.equityToReinvest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Amount of equity available for reinvestment
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="border-l-4 border-warm-brown bg-white p-6 text-sm text-gray-700">
        <h3 className="mb-3 font-medium text-warm-brown">Understanding Replacement Property Value Requirements</h3>
        <div className="space-y-2">
          <p>
            <strong>Minimum Replacement Value:</strong> To defer all gain in a 1031 exchange, the replacement property value must equal or exceed the sale price of the relinquished property. This calculator accounts for your equity, new mortgage, and exchange costs.
          </p>
          <p>
            <strong>Equity Reinvestment:</strong> All net proceeds from the sale (after paying off the mortgage, exchange costs, and any cash you take out) must be reinvested in the replacement property to achieve full tax deferral.
          </p>
          <p>
            <strong>Debt Replacement:</strong> The new mortgage should equal or exceed the old mortgage to avoid mortgage boot. If the new mortgage is less than the old mortgage, the difference creates taxable boot.
          </p>
          <p>
            <strong>Recommended Buffer:</strong> Adding a 5% buffer to the minimum replacement value helps account for unexpected costs, negotiation room, and ensures full deferral even if final costs differ slightly from estimates.
          </p>
        </div>
      </div>
    </div>
  );
}
