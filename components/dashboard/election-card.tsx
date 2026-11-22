"use client";

import Link from "next/link";
import {
  CheckListIcon,
  Copy01Icon,
  Edit02Icon,
  LockKeyIcon,
  Shield01Icon,
  Time02Icon,
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
  const turnoutPercent = parseFloat(election.turnoutRate) || 0;

  return (
    <div className="bg-card border border-border/80 hover:border-brand/40 hover:shadow-xs transition-all flex flex-col justify-between text-left group">
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-muted/60 border border-border/80 flex items-center justify-center text-brand shrink-0">
              <CheckListIcon size={16} />
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border ${
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

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onInspect(election)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors cursor-pointer"
              title="Inspect Cryptographic Slip"
              aria-label={`Inspect ${election.title}`}
            >
              <ViewIcon size={15} />
            </button>

            <button
              type="button"
              onClick={() => onCopyCode(election.code)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors relative cursor-pointer"
              title="Copy Accession Code"
              aria-label={`Copy code for ${election.title}`}
            >
              <Copy01Icon size={15} />
              {isCopied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background font-mono text-[9px] uppercase font-bold whitespace-nowrap shadow-md border border-border">
                  Copied
                </span>
              )}
            </button>

            <Link
              href="/#how-it-works"
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors cursor-pointer"
              title="Configure Election"
              aria-label={`Configure ${election.title}`}
            >
              <Edit02Icon size={15} />
            </Link>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 bg-muted border border-border text-foreground font-semibold uppercase tracking-wider">
              {election.code}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
              <LockKeyIcon size={11} className="text-brand" />
              <span>Gated to {election.allowedDomain}</span>
            </span>
          </div>

          <h3
            onClick={() => onInspect(election)}
            className="text-base sm:text-lg font-heading font-medium text-foreground group-hover:text-brand transition-colors pt-1 leading-snug cursor-pointer"
          >
            {election.title}
          </h3>

          <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
            {election.description}
          </p>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground flex items-center gap-1">
              <Time02Icon size={11} />
              <span>{election.lastActivity}</span>
            </span>
            <span className="text-foreground font-semibold">
              {election.turnoutRate} Turnout
            </span>
          </div>
          <div className="h-1 w-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                election.status === "Active"
                  ? "bg-brand"
                  : "bg-status-confirmed"
              }`}
              style={{ width: `${Math.min(turnoutPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-border bg-muted/20 divide-x divide-border">
        <div className="p-3.5 text-left">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
            Verified Ballots
          </span>
          <span className="text-lg font-heading font-medium text-foreground">
            {election.ballotsCast.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 text-left flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
              Tally Proof
            </span>
            <span className="text-xs font-mono font-medium text-status-confirmed flex items-center gap-1">
              <Shield01Icon size={12} />
              <span>Sealed</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => onInspect(election)}
            className="text-[11px] font-heading uppercase font-bold tracking-wider text-brand hover:underline cursor-pointer"
          >
            Audit Slip &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
