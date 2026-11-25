"use client";

import { CandidateItem } from "./types";

interface ResultsPanelProps {
  positions: string[];
  candidates: CandidateItem[];
}

export function ResultsPanel({ positions, candidates }: ResultsPanelProps) {
  return (
    <div className="space-y-6 text-left">
      {positions.map((pos) => {
        const group = candidates
          .filter((c) => c.position === pos)
          .sort((a, b) => b.votes - a.votes);
        if (group.length === 0) return null;

        const totalVotes = group.reduce((sum, c) => sum + c.votes, 0);

        return (
          <div key={pos} className="border border-border bg-card">
            <div className="px-4 sm:px-5 py-3 border-b border-border bg-muted/20 flex items-center justify-between gap-2">
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                {pos}
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">
                {totalVotes.toLocaleString()} votes
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {group.map((cand, index) => {
                const pct =
                  totalVotes > 0
                    ? Math.round((cand.votes / totalVotes) * 100)
                    : 0;
                const isLeading = index === 0 && cand.votes > 0;

                return (
                  <div key={cand.id} className="p-4 sm:px-5 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-sans">
                      <div className="min-w-0">
                        <span className="font-heading font-semibold text-foreground">
                          {cand.name}
                        </span>
                        <span className="text-muted-foreground ml-2 text-[11px]">
                          {cand.department}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-foreground shrink-0">
                        {cand.votes.toLocaleString()} ({pct}%)
                      </span>
                    </div>

                    <div className="h-2 bg-muted overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isLeading ? "bg-brand" : "bg-muted-foreground/50"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
