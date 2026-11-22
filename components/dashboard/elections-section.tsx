"use client";

import { CheckListIcon } from "hugeicons-react";
import { ElectionCardItem, ElectionFilter, ElectionRoleFilter } from "./types";
import { ElectionCard } from "./election-card";

interface ElectionsSectionProps {
  elections: ElectionCardItem[];
  filter: ElectionFilter;
  onFilterChange: (filter: ElectionFilter) => void;
  roleFilter: ElectionRoleFilter;
  onRoleFilterChange: (role: ElectionRoleFilter) => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

export function ElectionsSection({
  elections,
  filter,
  onFilterChange,
  roleFilter,
  onRoleFilterChange,
  onCopyCode,
  copiedCode,
}: ElectionsSectionProps) {
  const filteredElections = elections.filter((e) => {
    const matchesStatus = filter === "All" || e.status === filter;
    const matchesRole =
      roleFilter === "All" ||
      (roleFilter === "Admin" && e.role === "admin") ||
      (roleFilter === "Voter" && e.role === "voter");
    return matchesStatus && matchesRole;
  });

  const adminCount = elections.filter((e) => e.role === "admin").length;
  const voterCount = elections.filter((e) => e.role === "voter").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b-2 border-border text-left">
        <h2 className="text-lg sm:text-xl font-medium font-heading text-foreground">
          All Institutional Elections
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-border bg-muted/40 p-0.5 text-xs font-sans">
            <button
              type="button"
              onClick={() => onRoleFilterChange("All")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                roleFilter === "All"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Roles ({elections.length})
            </button>
            <button
              type="button"
              onClick={() => onRoleFilterChange("Admin")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                roleFilter === "Admin"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin ({adminCount})
            </button>
            <button
              type="button"
              onClick={() => onRoleFilterChange("Voter")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                roleFilter === "Voter"
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Voter ({voterCount})
            </button>
          </div>

          <div className="flex items-center gap-1 font-heading text-xs uppercase font-bold tracking-wider">
            {(["All", "Active", "Upcoming", "Concluded"] as const).map(
              (tab) => (
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
                  {tab === "All" ? "All Status" : tab}
                </button>
              ),
            )}
          </div>
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
            status and {roleFilter.toLowerCase()} role filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              onCopyCode={onCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
