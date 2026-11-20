import Link from "next/link";
import { HeroReceiptPreview } from "@/components/hero-receipt-preview";
import { ArrowRight01Icon, Ticket01Icon } from "hugeicons-react";

export function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium font-heading tracking-tight leading-[1.1] text-foreground">
            Institutional voting you can actually verify.
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl font-normal leading-relaxed mt-6 max-w-xl">
            Create an account with your school email to organize clean campus
            elections or join active ballots with an election code.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-8">
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
              <span>Join an Election</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <HeroReceiptPreview />
        </div>
      </div>
    </section>
  );
}
