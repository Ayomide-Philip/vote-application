"use client";

import { CheckListIcon } from "hugeicons-react";
import { ElectionCardItem, ElectionFilter } from "./types";
import { ElectionCard } from "./election-card";

interface ElectionsSectionProps {
  elections: ElectionCardItem[];
  filter: ElectionFilter;
  onFilterChange: (filter: ElectionFilter) => void;
  onInspect: (election: ElectionCardItem) => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

export function ElectionsSection({
  elections,
  filter,
  onFilterChange,
  onInspect,
  onCopyCode,
  copiedCode,
}: ElectionsSectionProps) {
  const filteredElections = elections.filter((e) => {
    if (filter === "All") return true;
    return e.status === filter;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b-2 border-border text-left">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-medium font-heading text-foreground">
            All Institutional Elections
          </h2>
        </div>

        <div className="flex items-center gap-1 font-heading text-xs uppercase font-bold tracking-wider">
          {(["All", "Active", "Concluded"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onFilterChange(tab)}
              className={`px-3 py-1.5 transition-colors border cursor-pointer ${
                filter === tab
                  ? "bg-foreground text-background border-foreground font-bold"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80"
              }`}
            >
              {tab === "All" ? "All Elections" : tab}
            </button>
          ))}
        </div>
      </div>

      {filteredElections.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center col-span-full">
          <div className="w-12 h-12 mx-auto bg-muted border border-border flex items-center justify-center text-muted-foreground mb-3">
            <CheckListIcon size={24} />
          </div>
          <h3 className="text-base font-heading font-medium text-foreground">
            No elections found
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto font-sans">
            There are no elections currently matching the {filter.toLowerCase()}{" "}
            filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              onInspect={onInspect}
              onCopyCode={onCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
