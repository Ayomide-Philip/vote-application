"use client";

import Link from "next/link";
import {
  Analytics01Icon,
  ArrowRight01Icon,
  CheckListIcon,
  SecurityCheckIcon,
  UserAdd01Icon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";
import { useElectionRole } from "./election-context";

export function OverviewClient({ electionId }: { electionId: string }) {
  const { role } = useElectionRole();
  const isAdmin = role === "admin";
  const basePath = `/dashboard/elections/${encodeURIComponent(electionId)}`;

  return (
    <div className="space-y-8 text-left">
      {/* Open Typographic Header (matching DashboardHero) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-border">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
            Faculty of Technology Executive Council Election
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed font-sans max-w-2xl">
            Executive leadership and departmental representative elections
            across engineering programs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <Link
            href={`${basePath}/results`}
            className="btn btn-secondary h-10 px-4 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Analytics01Icon size={15} />
            <span>Results</span>
          </Link>

          <Link
            href={`${basePath}/candidates`}
            className="btn btn-primary h-10 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAdmin ? <UserAdd01Icon size={15} /> : <UserIcon size={15} />}
            <span>{isAdmin ? "Candidates" : "Open Ballot"}</span>
          </Link>
        </div>
      </div>

      {/* Role-Aware 4-Card KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin ? (
          <Link
            href={`${basePath}/positions`}
            className="group bg-card border border-border hover:border-brand/50 p-5 transition-colors cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">
                Positions
              </span>
              <CheckListIcon size={16} className="text-brand shrink-0" />
            </div>
            <span className="block text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              5
            </span>
          </Link>
        ) : (
          <div className="bg-card border border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">
                Positions
              </span>
              <CheckListIcon size={16} className="text-brand shrink-0" />
            </div>
            <span className="block text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              5
            </span>
          </div>
        )}

        <Link
          href={`${basePath}/candidates`}
          className="group bg-card border border-border hover:border-brand/50 p-5 transition-colors cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans text-muted-foreground">
              Candidates
            </span>
            <UserIcon size={16} className="text-brand shrink-0" />
          </div>
          <span className="block text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
            3
          </span>
        </Link>

        {isAdmin ? (
          <Link
            href={`${basePath}/voters`}
            className="group bg-card border border-border hover:border-brand/50 p-5 transition-colors cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">
                Joined Voters
              </span>
              <UserGroupIcon size={16} className="text-brand shrink-0" />
            </div>
            <span className="block text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              2
            </span>
          </Link>
        ) : (
          <div className="bg-card border border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">
                Voter Status
              </span>
              <SecurityCheckIcon
                size={16}
                className="text-status-confirmed shrink-0"
              />
            </div>
            <span className="block text-xl sm:text-2xl font-heading font-semibold text-status-confirmed">
              Approved
            </span>
          </div>
        )}

        <Link
          href={`${basePath}/results`}
          className="group bg-card border border-border hover:border-brand/50 p-5 transition-colors cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans text-muted-foreground">
              Ballots Cast
            </span>
            <Analytics01Icon size={16} className="text-brand shrink-0" />
          </div>
          <span className="block text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
            1,320
          </span>
        </Link>
      </div>

      {/* Details & Role-Specific Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-border bg-card">
          <div className="px-5 py-3.5 border-b border-border bg-muted/20">
            <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
              Ballot Details
            </h2>
          </div>

          <div className="divide-y divide-border/60 text-xs font-sans">
            <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 text-status-confirmed font-medium w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed animate-pulse" />
                <span>Active</span>
              </span>
            </div>

            <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Visibility</span>
              <span className="text-foreground font-medium">Private</span>
            </div>

            <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Eligibility Scope</span>
              <span className="font-mono text-foreground">@oauife.edu.ng</span>
            </div>

            <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Voting Window</span>
              <span className="font-mono text-foreground">
                Nov 25, 2026 — Nov 28, 2026
              </span>
            </div>
          </div>
        </div>

        <div className="border border-border bg-card">
          <div className="px-5 py-3.5 border-b border-border bg-muted/20">
            <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
              {isAdmin ? "Quick Actions" : "Your Ballot"}
            </h2>
          </div>

          <div className="divide-y divide-border/60 text-xs font-sans">
            {(isAdmin
              ? [
                  { label: "Manage Positions", href: `${basePath}/positions` },
                  {
                    label: "Manage Candidates",
                    href: `${basePath}/candidates`,
                  },
                  { label: "Review Voters", href: `${basePath}/voters` },
                  { label: "Election Settings", href: `${basePath}/settings` },
                ]
              : [
                  { label: "Cast Your Vote", href: `${basePath}/candidates` },
                  { label: "View Live Results", href: `${basePath}/results` },
                ]
            ).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-3.5 flex items-center justify-between text-foreground hover:bg-muted/30 hover:text-brand transition-colors cursor-pointer group"
              >
                <span className="font-medium">{item.label}</span>
                <ArrowRight01Icon
                  size={14}
                  className="text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
