"use client";

import { useState } from "react";
import { Cancel01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import { VoterMember } from "./types";

interface VoterApprovalsPanelProps {
  voters: VoterMember[];
  onUpdateStatus: (voterId: string, status: "approved" | "rejected") => void;
}

type VoterFilter = "all" | "pending" | "approved" | "rejected";

export function VoterApprovalsPanel({
  voters,
  onUpdateStatus,
}: VoterApprovalsPanelProps) {
  const [filter, setFilter] = useState<VoterFilter>("all");

  const filtered = voters.filter(
    (v) => filter === "all" || v.status === filter,
  );

  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-mono text-muted-foreground">
          {voters.filter((v) => v.status === "pending").length} pending approval
        </span>

        <div className="flex flex-wrap items-center gap-1 border border-border bg-muted/40 p-1 text-xs font-sans">
          {(["all", "pending", "approved", "rejected"] as VoterFilter[]).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 capitalize transition-colors cursor-pointer ${
                  filter === tab
                    ? "bg-card text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs font-sans text-muted-foreground">
            No voters match this filter.
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {filtered.map((voter) => (
              <div
                key={voter.id}
                className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans"
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="font-medium text-foreground truncate">
                    {voter.name}
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground truncate">
                    {voter.email}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                      voter.status === "approved"
                        ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                        : voter.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-status-rejected/10 text-status-rejected border-status-rejected/30"
                    }`}
                  >
                    {voter.status}
                  </span>

                  {voter.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(voter.id, "approved")}
                      className="p-1.5 border border-border bg-muted/40 hover:border-status-confirmed hover:text-status-confirmed text-muted-foreground transition-colors cursor-pointer"
                      title="Approve voter"
                      aria-label={`Approve ${voter.name}`}
                    >
                      <CheckmarkCircle02Icon size={14} />
                    </button>
                  )}

                  {voter.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(voter.id, "rejected")}
                      className="p-1.5 border border-border bg-muted/40 hover:border-status-rejected hover:text-status-rejected text-muted-foreground transition-colors cursor-pointer"
                      title="Reject voter"
                      aria-label={`Reject ${voter.name}`}
                    >
                      <Cancel01Icon size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
