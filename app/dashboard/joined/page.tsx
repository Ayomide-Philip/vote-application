"use client";

import { useState } from "react";
import { Ticket01Icon } from "hugeicons-react";
import {
  ElectionFilter,
  ElectionCard,
  JoinElectionModal,
  useElections,
} from "@/components/dashboard";

const FILTERS: ElectionFilter[] = ["All", "Active", "Upcoming", "Concluded"];

export default function JoinedElectionsPage() {
  const { elections, isLoading, reload } = useElections("voter");
  const [filter, setFilter] = useState<ElectionFilter>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = elections.filter(
    (e) => filter === "All" || e.status === filter,
  );

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            Joined Ballots
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Elections you joined as a voter.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsJoinOpen(true)}
          className="btn btn-primary h-10 px-4 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Ticket01Icon size={16} />
          <span>Join Election</span>
        </button>
      </div>

      <div className="flex justify-end">
        <div className="flex flex-wrap items-center gap-1 border border-border bg-muted/40 p-1 w-fit text-xs font-sans">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                filter === f
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="h-64 bg-card border border-border/60 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-2 border-dashed border-border p-12 text-center bg-card/50">
          <Ticket01Icon
            size={32}
            className="mx-auto text-muted-foreground/50 mb-3"
          />
          <p className="font-heading font-medium text-base text-foreground">
            No joined elections in this category
          </p>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Join an election using an accession code or switch status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              copiedCode={copiedCode}
              onCopyCode={handleCopyCode}
            />
          ))}
        </div>
      )}

      <JoinElectionModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onJoined={reload}
      />
    </div>
  );
}
