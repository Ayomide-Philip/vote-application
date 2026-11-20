import Link from "next/link";
import { ArrowRight01Icon, Ticket01Icon } from "hugeicons-react";

export function CTASection() {
  return (
    <section className="relative w-full border-t-2 border-border py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Headline: 2 lines max, Satoshi font-medium */}
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium font-heading tracking-tight text-foreground leading-[1.12]">
          Ready to run a clean election?
        </h2>

        {/* Subheadline: DM Sans regular */}
        <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed mt-4 max-w-xl text-center">
          Set up your student union, departmental, or organization ballot in
          minutes.
        </p>

        {/* Actions with sliding micro-interaction */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <Link
            href="/login"
            className="btn btn-primary group h-12 px-7 text-xs font-bold tracking-wider"
          >
            <span>Create an Election</span>
            <ArrowRight01Icon size={16} className="btn-arrow-icon" />
          </Link>
          <Link
            href="/join"
            className="btn btn-secondary h-12 px-7 text-xs font-bold tracking-wider"
          >
            <Ticket01Icon size={16} className="text-brand" />
            <span>Join an Active Election</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
