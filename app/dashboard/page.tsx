"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Add01Icon,
  Cancel01Icon,
  CheckListIcon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  Shield01Icon,
  Time02Icon,
  ViewIcon,
} from "hugeicons-react";

interface ElectionCardItem {
  id: string;
  code: string;
  title: string;
  description: string;
  status: "Active" | "Concluded" | "Upcoming";
  lastActivity: string;
  ballotsCast: number;
  turnoutRate: string;
  allowedDomain: string;
}

const ELECTIONS_DATA: ElectionCardItem[] = [
  {
    id: "elec-1",
    code: "OAU-TECH-26",
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections.",
    status: "Active",
    lastActivity: "Last ballot cast: 5 mins ago",
    ballotsCast: 879,
    turnoutRate: "78.1%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-2",
    code: "OAU-SUG-26",
    title: "Student Union Government Presidential Ballot",
    description: "General campus election for the 2026/2027 academic session.",
    status: "Concluded",
    lastActivity: "Concluded: 1 day ago",
    ballotsCast: 1420,
    turnoutRate: "82.4%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-3",
    code: "PG-HALL-26",
    title: "Postgraduate Hall of Residence Executive Representative",
    description: "Hall committee representative and floor delegate voting.",
    status: "Concluded",
    lastActivity: "Concluded: 3 days ago",
    ballotsCast: 532,
    turnoutRate: "68.2%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-4",
    code: "NACOS-2026",
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels.",
    status: "Active",
    lastActivity: "Last ballot cast: 3 mins ago",
    ballotsCast: 1015,
    turnoutRate: "84.6%",
    allowedDomain: "@oauife.edu.ng",
  },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState<"All" | "Active" | "Concluded">("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [inspectingElection, setInspectingElection] =
    useState<ElectionCardItem | null>(null);

  const filteredElections = ELECTIONS_DATA.filter((e) => {
    if (filter === "All") return true;
    return e.status === filter;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Page Header & Primary Action Row (Matching Image Header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
            Elections &amp; Institutional Ballots
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Create, configure, and monitor domain-verified elections with
            cryptographic tally auditing.
          </p>
        </div>

        {/* Primary Action Button (Right Aligned in Image) */}
        <Link
          href="/#how-it-works"
          className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Add01Icon size={16} />
          <span>Create New Election</span>
        </Link>
      </div>

      {/* 2. Top 4 KPI Metric Cards in a Row (Matching Image 4-Card Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1: Total Elections */}
        <div className="bg-card border-2 border-border p-5 text-left flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckmarkCircle02Icon size={16} className="text-brand" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                Total Elections
              </span>
            </div>
            <MoreHorizontalIcon size={16} className="text-subtle" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-medium font-heading text-foreground">
              12
            </span>
            <span className="px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[11px] font-semibold">
              ↗ +2
            </span>
          </div>
        </div>

        {/* Metric Card 2: Total Ballots Cast */}
        <div className="bg-card border-2 border-border p-5 text-left flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield01Icon size={16} className="text-brand" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                Total Ballots Cast
              </span>
            </div>
            <MoreHorizontalIcon size={16} className="text-subtle" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-medium font-heading text-foreground">
              3,273
            </span>
            <span className="px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[11px] font-semibold">
              ↗ +14%
            </span>
          </div>
        </div>

        {/* Metric Card 3: Avg Turnout Rate */}
        <div className="bg-card border-2 border-border p-5 text-left flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Time02Icon size={16} className="text-brand" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                Avg Turnout Rate
              </span>
            </div>
            <MoreHorizontalIcon size={16} className="text-subtle" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-medium font-heading text-foreground">
              78.4%
            </span>
            <span className="px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[11px] font-semibold">
              ↗ +3.2%
            </span>
          </div>
        </div>

        {/* Metric Card 4: Active Elections */}
        <div className="bg-card border-2 border-border p-5 text-left flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckListIcon size={16} className="text-brand" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                Active Elections
              </span>
            </div>
            <MoreHorizontalIcon size={16} className="text-subtle" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-medium font-heading text-foreground">
              09
            </span>
            <span className="px-2 py-0.5 bg-muted border border-border text-muted-foreground font-mono text-[11px]">
              3 concluded
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Section: Section Header with Filter Tabs (Matching Image) */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-border text-left">
          <h2 className="text-lg sm:text-xl font-medium font-heading text-foreground">
            All Institutional Elections
          </h2>

          {/* Filter Tabs on Right (Matching Image: All Forms / Active / Paused) */}
          <div className="flex items-center gap-1 font-heading text-xs uppercase font-bold tracking-wider">
            <button
              onClick={() => setFilter("All")}
              className={`px-3 py-1.5 transition-colors border ${
                filter === "All"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              All Elections
            </button>
            <button
              onClick={() => setFilter("Active")}
              className={`px-3 py-1.5 transition-colors border ${
                filter === "Active"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("Concluded")}
              className={`px-3 py-1.5 transition-colors border ${
                filter === "Concluded"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              Concluded
            </button>
          </div>
        </div>

        {/* 4. 2-Column Grid of Rich Cards (Matching 2x2 Grid in Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredElections.map((election) => (
            <div
              key={election.id}
              className="bg-card border-2 border-border p-6 text-left flex flex-col justify-between gap-5 transition-all"
            >
              <div>
                {/* Card Top Action Row (Matching Icons & Status in Image) */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
                  {/* Left: Election Document Icon */}
                  <div className="w-9 h-9 bg-muted/60 border border-border flex items-center justify-center text-brand">
                    <CheckListIcon size={18} />
                  </div>

                  {/* Right: Quick Action Controls + Status Badge */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInspectingElection(election)}
                      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
                      title="Inspect Election Slip"
                      aria-label="Inspect Election Slip"
                    >
                      <ViewIcon size={16} />
                    </button>

                    <button
                      onClick={() => handleCopyCode(election.code)}
                      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors relative"
                      title="Copy Election Join Code"
                      aria-label="Copy Election Join Code"
                    >
                      <Copy01Icon size={16} />
                      {copiedCode === election.code && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-foreground text-background font-mono text-[9px] uppercase font-bold whitespace-nowrap shadow">
                          Copied
                        </span>
                      )}
                    </button>

                    <Link
                      href="/#how-it-works"
                      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
                      title="Configure Contest"
                      aria-label="Configure Contest"
                    >
                      <Edit02Icon size={16} />
                    </Link>

                    {/* Status Indicator Chip */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border ${
                        election.status === "Active"
                          ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                          : "bg-status-rejected/10 text-status-rejected border-status-rejected/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          election.status === "Active"
                            ? "bg-status-confirmed animate-pulse"
                            : "bg-status-rejected"
                        }`}
                      />
                      <span>{election.status}</span>
                    </div>

                    <button
                      type="button"
                      className="p-1 text-subtle hover:text-foreground"
                      aria-label="Options"
                    >
                      <MoreHorizontalIcon size={16} />
                    </button>
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] px-1.5 py-0.5 bg-muted border border-border text-foreground font-semibold uppercase">
                      {election.code}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Gated to {election.allowedDomain}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-medium text-foreground pt-1">
                    {election.title}
                  </h3>

                  <p className="text-xs text-muted-foreground font-mono">
                    {election.description} • {election.lastActivity}
                  </p>
                </div>
              </div>

              {/* Inner Bottom Summary Strip (Matching Submissions & Conversion Rate Box in Image) */}
              <div className="grid grid-cols-2 border border-border bg-muted/30 divide-x divide-border">
                {/* Left Metric: Ballots Cast */}
                <div className="p-3 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Ballots Cast
                  </span>
                  <span className="text-xl font-heading font-medium text-foreground">
                    {election.ballotsCast}
                  </span>
                </div>

                {/* Right Metric: Turnout Rate */}
                <div className="p-3 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Turnout Rate
                  </span>
                  <span className="text-xl font-heading font-medium text-foreground">
                    {election.turnoutRate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Quick View / Inspection Modal */}
      {inspectingElection && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setInspectingElection(null)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
              aria-label="Close"
            >
              <Cancel01Icon size={18} />
            </button>

            {/* Slip Header */}
            <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-brand uppercase mb-1">
                <Shield01Icon size={14} />
                <span>ELECTION RECORD INSPECTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
                {inspectingElection.title}
              </h2>
              <p className="text-muted-foreground text-xs font-mono mt-1">
                Accession Code: {inspectingElection.code}
              </p>
            </div>

            {/* Data Rows */}
            <div className="space-y-3 font-mono text-xs border-b-2 border-dashed border-border pb-5">
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold text-foreground uppercase">
                  {inspectingElection.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">
                  Institutional Domain:
                </span>
                <span className="text-status-confirmed font-semibold">
                  {inspectingElection.allowedDomain}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">
                  Total Ballots Cast:
                </span>
                <span className="text-foreground">
                  {inspectingElection.ballotsCast} verified ballots
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">
                  Certified Turnout:
                </span>
                <span className="text-foreground font-bold">
                  {inspectingElection.turnoutRate}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => handleCopyCode(inspectingElection.code)}
                className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Copy01Icon size={14} />
                <span>
                  {copiedCode === inspectingElection.code
                    ? "Code Copied!"
                    : "Copy Join Code"}
                </span>
              </button>

              <button
                onClick={() => setInspectingElection(null)}
                className="btn btn-primary h-10 px-5 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
