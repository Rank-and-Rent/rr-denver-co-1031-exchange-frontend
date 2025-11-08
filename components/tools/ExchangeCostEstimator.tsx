"use client";

import { useState } from "react";

interface CostCalculationResult {
  qiFee: number;
  escrowFee: number;
  titleInsurance: number;
  recordingFees: number;
  totalCosts: number;
  isValid: boolean;
  errors: string[];
}

export default function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [qiFeePercentage, setQiFeePercentage] = useState<string>("1.0");
  const [escrowFee, setEscrowFee] = useState<string>("");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState<string>("0.5");
  const [recordingFees, setRecordingFees] = useState<string>("500");
  const [results, setResults] = useState<CostCalculationResult | null>(null);

  const calculateCosts = () => {
    const errors: string[] = [];
    
    const propValue = parseFloat(propertyValue);
    const qiRate = parseFloat(qiFeePercentage);
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate);
    const recording = parseFloat(recordingFees) || 0;

    if (isNaN(propValue) || propValue <= 0) {
      errors.push("Property value must be greater than zero.");
    }
    if (isNaN(qiRate) || qiRate < 0 || qiRate > 100) {
      errors.push("QI fee percentage must be between 0 and 100.");
    }
    if (escrow < 0) {
      errors.push("Escrow fee cannot be negative.");
    }
    if (isNaN(titleRate) || titleRate < 0 || titleRate > 100) {
      errors.push("Title insurance rate must be between 0 and 100.");
    }
    if (recording < 0) {
      errors.push("Recording fees cannot be negative.");
    }

    if (errors.length > 0) {
      setResults({ qiFee: 0, escrowFee: 0, titleInsurance: 0, recordingFees: 0, totalCosts: 0, isValid: false, errors });
      return;
    }

    const qiFee = propValue * (qiRate / 100);
    const titleInsurance = propValue * (titleRate / 100);
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    setResults({
      qiFee,
      escrowFee: escrow,
      titleInsurance,
      recordingFees: recording,
      totalCosts,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "property":
        setPropertyValue(numValue);
        break;
      case "qi":
        setQiFeePercentage(numValue);
        break;
      case "escrow":
        setEscrowFee(numValue);
        break;
      case "title":
        setTitleInsuranceRate(numValue);
        break;
      case "recording":
        setRecordingFees(numValue);
        break;
    }
    if (results) {
      calculateCosts();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Exchange Cost Estimator Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="property-value"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Property Value ($)
            </label>
            <input
              id="property-value"
              type="text"
              value={propertyValue}
              onChange={(e) => handleInputChange("property", e.target.value)}
              placeholder="1,000,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Purchase price of the replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="qi-fee"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              QI Fee Percentage (%)
            </label>
            <input
              id="qi-fee"
              type="text"
              value={qiFeePercentage}
              onChange={(e) => handleInputChange("qi", e.target.value)}
              placeholder="1.0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Qualified intermediary fee as percentage (typically 0.5% - 2%)
            </p>
          </div>

          <div>
            <label
              htmlFor="escrow-fee"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Escrow Fee ($)
            </label>
            <input
              id="escrow-fee"
              type="text"
              value={escrowFee}
              onChange={(e) => handleInputChange("escrow", e.target.value)}
              placeholder="1,500"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Escrow company fee (flat rate)
            </p>
          </div>

          <div>
            <label
              htmlFor="title-rate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title Insurance Rate (%)
            </label>
            <input
              id="title-rate"
              type="text"
              value={titleInsuranceRate}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="0.5"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Title insurance premium rate (varies by state and property value)
            </p>
          </div>

          <div>
            <label
              htmlFor="recording-fees"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Recording Fees ($)
            </label>
            <input
              id="recording-fees"
              type="text"
              value={recordingFees}
              onChange={(e) => handleInputChange("recording", e.target.value)}
              placeholder="500"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              County recording fees (varies by county)
            </p>
          </div>
        </div>

        <button
          onClick={calculateCosts}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Calculate Exchange Costs
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Exchange Cost Breakdown
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
                  <span className="text-sm font-medium text-gray-700">Qualified Intermediary Fee:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.qiFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Fee for QI services (escrow, assignment, documentation)
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Escrow Fee:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.escrowFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Escrow company processing fee
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Title Insurance:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.titleInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Title insurance premium (protects against title defects)
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Recording Fees:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.recordingFees.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  County recording fees (Colorado does not impose state transfer tax)
                </p>
              </div>

              <div className="rounded-lg border-2 border-[#0B3C5D] bg-[#0B3C5D]/5 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total Exchange Costs:</span>
                  <span className="text-2xl font-bold text-[#0B3C5D]">
                    ${results.totalCosts.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Total estimated costs for completing your 1031 exchange
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Exchange Costs</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Qualified Intermediary Fee:</strong> The QI holds exchange proceeds in escrow and coordinates documentation. Fees typically range from 0.5% to 2% of the property value, with minimum fees often applying.
          </p>
          <p>
            <strong>Escrow Fee:</strong> The escrow company processes the transaction, coordinates with all parties, and handles fund disbursement. This is typically a flat fee.
          </p>
          <p>
            <strong>Title Insurance:</strong> Protects against title defects and liens. Rates vary by state and property value, typically ranging from 0.3% to 1% of the property value.
          </p>
          <p>
            <strong>Recording Fees:</strong> County fees for recording the deed and mortgage documents. Colorado does not impose a state-level transfer tax, but recording fees still apply.
          </p>
        </div>
      </div>
    </div>
  );
}

