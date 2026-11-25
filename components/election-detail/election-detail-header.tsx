"use client";

import Link from "next/link";
import {
  ArrowLeft01Icon,
  Copy01Icon,
  LockKeyIcon,
  SecurityCheckIcon,
  UserAdd01Icon,
} from "hugeicons-react";
import { ElectionDetailMeta } from "./types";

interface ElectionDetailHeaderProps {
  meta: ElectionDetailMeta;
  copiedCode: boolean;
  onCopyCode: () => void;
  onOpenAddCandidate: () => void;
  onToggleRole: (role: "admin" | "voter") => void;
}

export function ElectionDetailHeader({
  meta,
  copiedCode,
  onCopyCode,
  onOpenAddCandidate,
  onToggleRole,
}: ElectionDetailHeaderProps) {
  const isAdmin = meta.role === "admin";

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft01Icon size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center border border-border bg-muted/40 p-0.5 text-xs font-sans">
            <button
              type="button"
              onClick={() => onToggleRole("admin")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                isAdmin
                  ? "bg-card text-brand font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => onToggleRole("voter")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                !isAdmin
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Voter
            </button>
          </div>

          <button
            type="button"
            onClick={onCopyCode}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 hover:bg-muted border border-border text-xs font-mono text-foreground transition-colors cursor-pointer relative"
            title="Copy accession code"
          >
            <span>{meta.code}</span>
            <Copy01Icon size={12} className="text-muted-foreground" />
            {copiedCode && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold whitespace-nowrap shadow-md">
                Copied
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-card border border-border/80 p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border text-[11px] font-sans font-medium ${
                meta.status === "Active"
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : meta.status === "Upcoming"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  meta.status === "Active"
                    ? "bg-status-confirmed animate-pulse"
                    : meta.status === "Upcoming"
                      ? "bg-amber-400"
                      : "bg-muted-foreground"
                }`}
              />
              <span>{meta.status}</span>
            </span>

            <span className="px-2 py-0.5 border border-border bg-muted/40 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {meta.visibility}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-sans text-muted-foreground">
              <LockKeyIcon size={12} className="text-brand shrink-0" />
              <span>{meta.domain}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-heading font-semibold tracking-tight text-foreground break-words">
            {meta.title}
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-2xl leading-relaxed">
            {meta.description}
          </p>

          <p className="text-[11px] font-mono text-muted-foreground/80">
            Schedule: {meta.schedule}
          </p>
        </div>

        {isAdmin ? (
          <button
            type="button"
            onClick={onOpenAddCandidate}
            className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <UserAdd01Icon size={16} />
            <span>Add Candidate</span>
          </button>
        ) : (
          <div className="p-3.5 bg-muted/30 border border-border text-xs font-sans shrink-0 lg:max-w-xs space-y-1">
            <div className="flex items-center gap-1.5 text-foreground font-medium">
              <SecurityCheckIcon size={14} className="text-brand shrink-0" />
              <span>Verified Voter</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              One ballot per verified account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
