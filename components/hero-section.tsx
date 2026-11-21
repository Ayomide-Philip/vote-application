import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";

export function HeroSection() {
  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20 lg:pb-28 w-full flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-heading tracking-tight leading-[1.1] text-foreground max-w-4xl">
        Institutional voting you can actually verify.
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg lg:text-xl font-normal leading-relaxed mt-6 max-w-2xl mx-auto">
        Create an account with your school email to organize clean campus
        elections and cast verified ballots.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
        <Link
          href="/login"
          className="btn btn-primary group h-12 px-8 text-xs font-bold tracking-wider"
        >
          <span>Create an Election</span>
          <ArrowRight01Icon size={16} className="btn-arrow-icon" />
        </Link>
        <Link
          href="/#how-it-works"
          className="btn btn-secondary h-12 px-8 text-xs font-bold tracking-wider"
        >
          <span>How It Works</span>
        </Link>
      </div>
    </section>
  );
}
