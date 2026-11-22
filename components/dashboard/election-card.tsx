"use client";

import Link from "next/link";
import {
  CheckListIcon,
  Copy01Icon,
  Edit02Icon,
  ViewIcon,
} from "hugeicons-react";
import { ElectionCardItem } from "./types";

interface ElectionCardProps {
  election: ElectionCardItem;
  onInspect: (election: ElectionCardItem) => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

export function ElectionCard({
  election,
  onInspect,
  onCopyCode,
  copiedCode,
}: ElectionCardProps) {
  const isCopied = copiedCode === election.code;

  return (
    <div className="bg-card border border-border/80 hover:border-brand/40 p-5 sm:p-6 flex flex-col justify-between transition-all text-left group">
      <div>
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="w-9 h-9 bg-muted/60 border border-border flex items-center justify-center text-brand shrink-0">
            <CheckListIcon size={18} />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onInspect(election)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors cursor-pointer"
              title="Inspect Ballot Slip"
              aria-label={`Inspect ${election.title}`}
            >
              <ViewIcon size={16} />
            </button>

            <button
              type="button"
              onClick={() => onCopyCode(election.code)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors relative cursor-pointer"
              title="Copy Accession Code"
              aria-label={`Copy code for ${election.title}`}
            >
              <Copy01Icon size={16} />
              {isCopied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold whitespace-nowrap shadow-md border border-border">
                  Copied
                </span>
              )}
            </button>

            <Link
              href={`/election/${election.id}`}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors cursor-pointer"
              title="Add Candidates & Manage"
              aria-label={`Manage candidates for ${election.title}`}
            >
              <Edit02Icon size={16} />
            </Link>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-sans text-xs font-medium border ${
                election.status === "Active"
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  election.status === "Active"
                    ? "bg-status-confirmed animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />
              <span>{election.status}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <Link
            href={`/election/${election.id}`}
            className="text-base sm:text-lg font-heading font-medium text-foreground hover:text-brand transition-colors block leading-snug cursor-pointer"
          >
            {election.title}
          </Link>

          <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
            {election.description} • {election.lastActivity}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 font-sans text-[11px]">
            <span className="px-2 py-0.5 bg-muted border border-border text-foreground font-medium">
              Code: {election.code}
            </span>
            <span className="text-muted-foreground">
              Gated to {election.allowedDomain}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-2 border border-border/60 bg-muted/30 divide-x divide-border/60 p-3.5">
          <div className="text-left pr-3">
            <span className="block text-xs font-sans text-muted-foreground mb-0.5">
              Ballots Cast
            </span>
            <span className="text-xl font-heading font-semibold text-foreground">
              {election.ballotsCast.toLocaleString()}
            </span>
          </div>

          <div className="text-left pl-3">
            <span className="block text-xs font-sans text-muted-foreground mb-0.5">
              Turnout Rate
            </span>
            <span className="text-xl font-heading font-semibold text-foreground">
              {election.turnoutRate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/election/${election.id}`}
            className="btn btn-secondary h-9 px-3.5 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Add Candidates</span>
            <span>&rarr;</span>
          </Link>

          <button
            type="button"
            onClick={() => onInspect(election)}
            className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Inspect Slip
          </button>
        </div>
      </div>
    </div>
  );
}
