export function IdentificationRulesExplainer() {
  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">Identification Rule Refresher</h2>
        <p className="mt-2 text-sm text-gray-600">
          These summaries are informational only. Confirm details with your Qualified
          Intermediary and advisors.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Three Property Rule
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Identify up to three properties without regard to value. You may close on
            any or all of them.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Two Hundred Percent Rule
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Identify any number of properties as long as the combined fair market value
            does not exceed 200% of the relinquished value.
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
            Ninety Five Percent Rule
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Identify any number of properties at any value. You must acquire at least
            95% of the total value identified.
          </p>
        </div>
      </div>
    </div>
  );
}
