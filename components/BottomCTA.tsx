import Link from "next/link";

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";

export default function BottomCTA() {
  return (
    <section className="bg-warm-brown">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-light tracking-wide text-white md:text-3xl">
              Ready to Start Your 1031 Exchange?
            </h2>
            <p className="mt-2 text-white/80">
              Contact our Denver-based team for expert guidance on your Colorado 1031 exchange.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center border border-white bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-warm-brown transition hover:bg-transparent hover:text-white"
            >
              Call {PHONE_DISPLAY}
            </Link>
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center border border-white/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white hover:text-warm-brown"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}