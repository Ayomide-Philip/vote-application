"use client";

import { useState } from "react";
import { Ticket01Icon } from "hugeicons-react";
import {
  ElectionCardItem,
  ElectionFilter,
} from "@/components/dashboard/types";
import { ElectionCard } from "@/components/dashboard/election-card";
import { JoinElectionModal } from "@/components/dashboard/join-election-modal";

const JOINED_ELECTIONS: ElectionCardItem[] = [
  {
    id: "elec-2",
    code: "OAU-SUG-26",
    title: "Student Union Government Presidential Ballot",
    description:
      "General campus election for the 2026/2027 academic session executive body.",
    status: "Active",
    role: "voter",
    ballotsCast: 1420,
    turnoutRate: "82.4%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-4",
    code: "NACOS-2026",
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels and computer labs.",
    status: "Upcoming",
    role: "voter",
    ballotsCast: 0,
    turnoutRate: "0.0%",
    allowedDomain: "@oauife.edu.ng",
    startDate: "Starts in 5 days",
  },
];

const FILTERS: ElectionFilter[] = ["All", "Active", "Upcoming", "Concluded"];

export default function JoinedElectionsPage() {
  const [filter, setFilter] = useState<ElectionFilter>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = JOINED_ELECTIONS.filter(
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

      {filtered.length === 0 ? (
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
      />
    </div>
  );
}
