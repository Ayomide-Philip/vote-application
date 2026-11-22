"use client";

import Link from "next/link";
import { Add01Icon } from "hugeicons-react";

export function DashboardHero() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Elections &amp; Institutional Ballots
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
          Create, configure, and monitor domain-verified elections with
          cryptographic tally auditing.
        </p>
      </div>

      <Link
        href="/#how-it-works"
        className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <Add01Icon size={16} />
        <span>Create Election</span>
      </Link>
    </div>
  );
}
