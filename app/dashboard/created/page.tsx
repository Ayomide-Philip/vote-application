"use client";

import { useState } from "react";
import Link from "next/link";
import { Add01Icon, CheckListIcon } from "hugeicons-react";
import {
  ElectionCardItem,
  ElectionFilter,
} from "@/components/dashboard/types";
import { ElectionCard } from "@/components/dashboard/election-card";

const CREATED_ELECTIONS: ElectionCardItem[] = [
  {
    id: "elec-1",
    code: "OAU-TECH-26",
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections across engineering programs.",
    status: "Active",
    role: "admin",
    ballotsCast: 879,
    turnoutRate: "78.1%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-3",
    code: "SCI-DEAN-26",
    title: "Faculty of Science Dean & Advisory Board Ballot",
    description:
      "Academic advisory representatives and departmental student delegates.",
    status: "Upcoming",
    role: "admin",
    ballotsCast: 0,
    turnoutRate: "0.0%",
    allowedDomain: "@oauife.edu.ng",
    startDate: "Starts in 2 days",
  },
];

const FILTERS: ElectionFilter[] = ["All", "Active", "Upcoming", "Concluded"];

export default function CreatedElectionsPage() {
  const [filter, setFilter] = useState<ElectionFilter>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = CREATED_ELECTIONS.filter(
    (e) => filter === "All" || e.status === filter,
  );

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            Created Ballots
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Elections you created and administer.
          </p>
        </div>

        <Link
          href="/dashboard/create"
          className="btn btn-primary h-10 px-4 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Add01Icon size={16} />
          <span>Create Election</span>
        </Link>
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
          <CheckListIcon
            size={32}
            className="mx-auto text-muted-foreground/50 mb-3"
          />
          <p className="font-heading font-medium text-base text-foreground">
            No created elections in this category
          </p>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            Create a new ballot or switch status filters.
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
    </div>
  );
}
