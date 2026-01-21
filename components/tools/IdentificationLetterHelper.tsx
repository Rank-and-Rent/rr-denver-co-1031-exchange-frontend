"use client";

import { useMemo, useState } from "react";

export function IdentificationLetterHelper() {
  const [investor, setInvestor] = useState("");
  const [intermediary, setIntermediary] = useState("");
  const [relinquished, setRelinquished] = useState("");
  const [replacementList, setReplacementList] = useState("");

  const template = useMemo(
    () =>
      `To: ${intermediary || "[Qualified Intermediary]"}
From: ${investor || "[Investor]"}

Relinquished property: ${relinquished || "[Property address]"}

Replacement properties:
${replacementList || "[List addresses, legal descriptions, or contract references]"}

This letter is delivered within the forty five day identification period. Please acknowledge receipt.`,
    [intermediary, investor, relinquished, replacementList]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<pre>${template}</pre>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-8 bg-cream p-8">
      <div>
        <h2 className="text-2xl font-medium text-warm-brown">Identification Letter Helper</h2>
        <p className="mt-2 text-sm text-gray-600">
          Draft a simple letter for your intermediary. Confirm the final format with your
          intermediary and counsel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Investor Name
          </label>
          <input
            value={investor}
            onChange={(event) => setInvestor(event.target.value)}
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
            placeholder="Jane Investor"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
            Intermediary Name
          </label>
          <input
            value={intermediary}
            onChange={(event) => setIntermediary(event.target.value)}
            className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
            placeholder="Example Intermediary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
          Relinquished Property
        </label>
        <input
          value={relinquished}
          onChange={(event) => setRelinquished(event.target.value)}
          className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          placeholder="123 Main St, Denver, CO"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-warm-brown">
          Replacement Properties (one per line)
        </label>
        <textarea
          value={replacementList}
          onChange={(event) => setReplacementList(event.target.value)}
          rows={4}
          className="mt-2 w-full border border-warm-brown/20 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
          placeholder="Property A&#10;Property B&#10;Property C"
        />
      </div>

      <div className="bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown mb-4">Letter Preview</p>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{template}</pre>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-warm-brown px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-warm-brown transition hover:bg-warm-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="border border-warm-brown px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-warm-brown transition hover:bg-warm-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-warm-brown focus:ring-offset-2"
        >
          Print
        </button>
      </div>
    </div>
  );
}
