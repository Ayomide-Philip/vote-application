"use client";

import Link from "next/link";
import { Add01Icon, Ticket01Icon } from "hugeicons-react";

interface DashboardHeroProps {
  onOpenJoinModal?: () => void;
}

export function DashboardHero({ onOpenJoinModal }: DashboardHeroProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Elections &amp; Institutional Ballots
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed font-sans">
          Join active campus elections or create verified ballots with
          cryptographic tally auditing.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
        <button
          type="button"
          onClick={onOpenJoinModal}
          className="btn btn-secondary h-11 px-4 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <Ticket01Icon size={16} />
          <span>Join with Code</span>
        </button>

        <Link
          href="/#how-it-works"
          className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <Add01Icon size={16} />
          <span>Create Election</span>
        </Link>
      </div>
    </div>
  );
}
