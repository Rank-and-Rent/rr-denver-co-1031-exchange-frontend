"use client";

import { useState } from "react";

interface RuleValidationResult {
  threePropertyRule: {
    satisfied: boolean;
    message: string;
  };
  twoHundredPercentRule: {
    satisfied: boolean;
    message: string;
    percentage: number;
  };
  ninetyFivePercentRule: {
    satisfied: boolean;
    message: string;
    percentage: number;
  };
  isValid: boolean;
  errors: string[];
}

export default function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState<string>("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState<string>("");
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [results, setResults] = useState<RuleValidationResult | null>(null);

  const validateRules = () => {
    const errors: string[] = [];
    
    const numProps = parseInt(numProperties);
    const totalValue = parseFloat(totalIdentifiedValue);
    const relValue = parseFloat(relinquishedValue);

    if (isNaN(numProps) || numProps <= 0) {
      errors.push("Number of properties identified must be greater than zero.");
    }
    if (isNaN(totalValue) || totalValue <= 0) {
      errors.push("Total value of identified properties must be greater than zero.");
    }
    if (isNaN(relValue) || relValue <= 0) {
      errors.push("Relinquished property value must be greater than zero.");
    }

    if (errors.length > 0) {
      setResults({
        threePropertyRule: { satisfied: false, message: "" },
        twoHundredPercentRule: { satisfied: false, message: "", percentage: 0 },
        ninetyFivePercentRule: { satisfied: false, message: "", percentage: 0 },
        isValid: false,
        errors,
      });
      return;
    }

    const threePropertyRule = numProps <= 3;
    const twoHundredPercentLimit = relValue * 2;
    const twoHundredPercentRule = totalValue <= twoHundredPercentLimit;
    const twoHundredPercentPercentage = (totalValue / relValue) * 100;

    const ninetyFivePercentRule = (totalValue / relValue) >= 0.95;
    const ninetyFivePercentPercentage = (totalValue / relValue) * 100;

    let threePropertyMessage = "";
    if (threePropertyRule) {
      threePropertyMessage = `✓ You can identify up to 3 properties without value limits. You have identified ${numProps} ${numProps === 1 ? "property" : "properties"}.`;
    } else {
      threePropertyMessage = `✗ You have identified ${numProps} properties. The 3-property rule allows only 3 properties without value limits. You must meet the 200% rule or 95% rule instead.`;
    }

    let twoHundredPercentMessage = "";
    if (twoHundredPercentRule) {
      twoHundredPercentMessage = `✓ The 200% rule is satisfied. Total identified value (${twoHundredPercentPercentage.toFixed(1)}% of relinquished value) does not exceed 200% of the relinquished property value.`;
    } else {
      twoHundredPercentMessage = `✗ The 200% rule is NOT satisfied. Total identified value (${twoHundredPercentPercentage.toFixed(1)}% of relinquished value) exceeds 200% of the relinquished property value.`;
    }

    let ninetyFivePercentMessage = "";
    if (ninetyFivePercentRule) {
      ninetyFivePercentMessage = `✓ The 95% rule is satisfied. You must acquire at least 95% of the total identified value. Your identified value is ${ninetyFivePercentPercentage.toFixed(1)}% of the relinquished value.`;
    } else {
      ninetyFivePercentMessage = `✗ The 95% rule requires acquiring at least 95% of the total identified value. Your identified value is ${ninetyFivePercentPercentage.toFixed(1)}% of the relinquished value.`;
    }

    setResults({
      threePropertyRule: {
        satisfied: threePropertyRule,
        message: threePropertyMessage,
      },
      twoHundredPercentRule: {
        satisfied: twoHundredPercentRule,
        message: twoHundredPercentMessage,
        percentage: twoHundredPercentPercentage,
      },
      ninetyFivePercentRule: {
        satisfied: ninetyFivePercentRule,
        message: ninetyFivePercentMessage,
        percentage: ninetyFivePercentPercentage,
      },
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "numProperties":
        setNumProperties(numValue);
        break;
      case "totalValue":
        setTotalIdentifiedValue(numValue);
        break;
      case "relinquished":
        setRelinquishedValue(numValue);
        break;
    }
    if (results) {
      validateRules();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Identification Rules Checker Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="num-properties"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Number of Properties Identified
            </label>
            <input
              id="num-properties"
              type="text"
              value={numProperties}
              onChange={(e) => handleInputChange("numProperties", e.target.value)}
              placeholder="3"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Total number of replacement properties identified
            </p>
          </div>

          <div>
            <label
              htmlFor="total-value"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Total Value of Identified Properties ($)
            </label>
            <input
              id="total-value"
              type="text"
              value={totalIdentifiedValue}
              onChange={(e) => handleInputChange("totalValue", e.target.value)}
              placeholder="2,000,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Sum of all identified property values
            </p>
          </div>

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
              Sale price of the relinquished property
            </p>
          </div>
        </div>

        <button
          onClick={validateRules}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Validate Identification Rules
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Identification Rules Validation
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
              <div className={`rounded-lg border-2 p-4 ${
                results.threePropertyRule.satisfied
                  ? "border-green-500 bg-green-50"
                  : "border-yellow-500 bg-yellow-50"
              }`}>
                <h3 className="mb-2 font-semibold text-[#0B3C5D]">3-Property Rule</h3>
                <p className={`text-sm ${
                  results.threePropertyRule.satisfied ? "text-green-800" : "text-yellow-800"
                }`}>
                  {results.threePropertyRule.message}
                </p>
              </div>

              <div className={`rounded-lg border-2 p-4 ${
                results.twoHundredPercentRule.satisfied
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}>
                <h3 className="mb-2 font-semibold text-[#0B3C5D]">200% Rule</h3>
                <p className={`text-sm ${
                  results.twoHundredPercentRule.satisfied ? "text-green-800" : "text-red-800"
                }`}>
                  {results.twoHundredPercentRule.message}
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Identified value: {results.twoHundredPercentRule.percentage.toFixed(1)}% of relinquished value
                </p>
              </div>

              <div className={`rounded-lg border-2 p-4 ${
                results.ninetyFivePercentRule.satisfied
                  ? "border-green-500 bg-green-50"
                  : "border-yellow-500 bg-yellow-50"
              }`}>
                <h3 className="mb-2 font-semibold text-[#0B3C5D]">95% Rule</h3>
                <p className={`text-sm ${
                  results.ninetyFivePercentRule.satisfied ? "text-green-800" : "text-yellow-800"
                }`}>
                  {results.ninetyFivePercentRule.message}
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Identified value: {results.ninetyFivePercentRule.percentage.toFixed(1)}% of relinquished value
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-[#0B3C5D]">Compliance Status</h3>
                <p className="text-sm text-gray-700">
                  {results.threePropertyRule.satisfied || results.twoHundredPercentRule.satisfied
                    ? "✓ Your identification appears to comply with IRS rules. You must meet at least one of the three identification rules."
                    : "⚠ Your identification may not comply with IRS rules. You must satisfy at least one of the three identification rules: 3-property rule, 200% rule, or 95% rule."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Identification Rules</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold mb-1">3-Property Rule:</p>
            <p>You can identify up to 3 replacement properties without any value limits. This is the simplest rule - if you identify 3 or fewer properties, you don't need to worry about value calculations.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">200% Rule:</p>
            <p>If you identify more than 3 properties, the total value of all identified properties cannot exceed 200% of the relinquished property value. This allows flexibility when identifying multiple properties.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">95% Rule:</p>
            <p>If you identify properties under the 200% rule, you must acquire at least 95% of the total identified value. This ensures you actually purchase most of what you identified.</p>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            <strong>Important:</strong> You must satisfy at least one of these rules. The 3-property rule is the most straightforward for most exchanges.
          </p>
        </div>
      </div>
    </div>
  );
}

