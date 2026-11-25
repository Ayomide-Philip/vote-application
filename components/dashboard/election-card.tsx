"use client";

import Link from "next/link";
import { ArrowUpRight01Icon, Copy01Icon } from "hugeicons-react";
import { ElectionCardItem } from "./types";

interface ElectionCardProps {
  election: ElectionCardItem;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

function formatCompactDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function ElectionCard({
  election,
  onCopyCode,
  copiedCode,
}: ElectionCardProps) {
  const isCopied = copiedCode === election.election_code;
  const startLabel = formatCompactDate(election.start_time);
  const endLabel = formatCompactDate(election.end_time);

  return (
    <div className="bg-card border border-border/80 hover:border-border p-5 sm:p-6 flex flex-col justify-between gap-5 transition-colors text-left shadow-2xs">
      <div className="space-y-4">
        {/* Top Bar: Status, Role & Accession Code */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3.5 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-sans text-[11px] font-medium border ${
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
            </span>

            <span
              className={`px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider border ${
                election.role === "admin"
                  ? "bg-brand/10 text-brand border-brand/30"
                  : "bg-muted/60 text-muted-foreground border-border"
              }`}
            >
              {election.role}
            </span>

            {election.role === "voter" && election.voter_status && (
              <span
                className={`px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider border ${
                  election.voter_status === "approved"
                    ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                    : election.voter_status === "pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-status-rejected/10 text-status-rejected border-status-rejected/30"
                }`}
              >
                {election.voter_status}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onCopyCode(election.election_code)}
            className="group self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 hover:bg-muted border border-border/70 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative max-w-full shrink-0"
            title="Copy accession code"
            aria-label={`Copy accession code for ${election.election_title}`}
          >
            <span className="font-mono text-[11px] font-medium text-foreground truncate">
              {election.election_code}
            </span>
            <Copy01Icon
              size={12}
              className="text-muted-foreground group-hover:text-brand transition-colors shrink-0"
            />
            {isCopied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold whitespace-nowrap shadow-md border border-border">
                Copied
              </span>
            )}
          </button>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <Link
            href={`/dashboard/elections/${election.id}`}
            className="text-base sm:text-lg font-heading font-semibold text-foreground hover:text-brand transition-colors block leading-snug cursor-pointer"
          >
            {election.election_title}
          </Link>

          <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
            {election.election_description}
          </p>
        </div>
      </div>

      {/* Structured Meta Grid & Action */}
      <div className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-border/60 bg-muted/20 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          <div className="px-3 py-2.5 min-w-0">
            <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
              Organizer
            </span>
            <span className="block text-xs font-sans font-medium text-foreground truncate mt-0.5">
              {election.admin_fullname}
            </span>
          </div>

          <div className="px-3 py-2.5 min-w-0">
            <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
              Voters
            </span>
            <span className="block text-xs font-sans font-medium text-foreground truncate mt-0.5">
              {election.total_voters.toLocaleString()}{" "}
              <span className="text-muted-foreground font-normal capitalize">
                ({election.election_type})
              </span>
            </span>
          </div>

          <div className="px-3 py-2.5 min-w-0">
            <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
              Schedule
            </span>
            <span className="block text-xs font-sans font-medium text-foreground truncate mt-0.5">
              {startLabel && endLabel ? `${startLabel} – ${endLabel}` : "—"}
            </span>
          </div>
        </div>

        <Link
          href={`/dashboard/elections/${election.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-heading font-medium tracking-wide uppercase bg-muted/40 hover:bg-muted border border-border/80 hover:border-brand/50 text-foreground transition-all cursor-pointer group"
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
