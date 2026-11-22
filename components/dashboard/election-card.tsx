"use client";

import Link from "next/link";
import { ArrowUpRight01Icon, Copy01Icon } from "hugeicons-react";
import { ElectionCardItem } from "./types";

interface ElectionCardProps {
  election: ElectionCardItem;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

export function ElectionCard({
  election,
  onCopyCode,
  copiedCode,
}: ElectionCardProps) {
  const isCopied = copiedCode === election.code;

  return (
    <div className="bg-card border border-border/80 hover:border-border p-6 flex flex-col justify-between transition-colors text-left shadow-2xs">
      <div>
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
          <button
            type="button"
            onClick={() => onCopyCode(election.code)}
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 hover:bg-muted border border-border/70 hover:border-border text-xs font-sans text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative"
            title="Click to copy accession code"
            aria-label={`Copy accession code for ${election.title}`}
          >
            <span className="font-mono text-[11px] font-medium text-foreground">
              {election.code}
            </span>
            <Copy01Icon
              size={13}
              className="text-muted-foreground group-hover:text-brand transition-colors"
            />
            {isCopied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold whitespace-nowrap shadow-md border border-border">
                Copied
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider border ${
                election.role === "admin"
                  ? "bg-brand/10 text-brand border-brand/30"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {election.role === "admin" ? "Admin" : "Voter"}
            </span>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-sans text-xs font-medium border ${
                election.status === "Active"
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : election.status === "Upcoming"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  election.status === "Active"
                    ? "bg-status-confirmed animate-pulse"
                    : election.status === "Upcoming"
                      ? "bg-amber-400"
                      : "bg-muted-foreground"
                }`}
              />
              <span>{election.status}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <Link
            href={`/dashboard/elections/${election.id}`}
            className="text-base sm:text-lg font-heading font-medium text-foreground hover:text-brand transition-colors block leading-snug cursor-pointer"
          >
            {election.title}
          </Link>

          <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
            {election.description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-2 border border-border/60 bg-muted/30 divide-x divide-border/60 p-4">
          <div className="text-left pr-3">
            <span className="block text-xs font-sans text-muted-foreground mb-1">
              Ballots Cast
            </span>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {election.status === "Upcoming"
                ? "0"
                : election.ballotsCast.toLocaleString()}
            </span>
          </div>

          <div className="text-left pl-3">
            <span className="block text-xs font-sans text-muted-foreground mb-1">
              Turnout Rate
            </span>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {election.status === "Upcoming" ? "0.0%" : election.turnoutRate}
            </span>
          </div>
        </div>

        <Link
          href={`/dashboard/elections/${election.id}`}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-heading font-medium tracking-wide uppercase bg-muted/40 hover:bg-muted border border-border/80 hover:border-brand/50 text-foreground transition-all cursor-pointer group"
        >
          <span>View Election</span>
          <ArrowUpRight01Icon
            size={13}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
