"use client";

import {
  Analytics01Icon,
  CheckmarkCircle02Icon,
  Shield01Icon,
  Time02Icon,
} from "hugeicons-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-left pb-6 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Analytics &amp; Real-Time Tallies
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Cryptographically audited voter turnout metrics across participating academic departments and domains.
        </p>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border-2 border-border p-5 text-left">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Analytics01Icon size={16} className="text-brand" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Overall Participation</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            78.4%
          </div>
          <span className="text-[11px] font-mono text-status-confirmed mt-1 block">
            +4.2% higher than paper avg
          </span>
        </div>

        <div className="bg-card border-2 border-border p-5 text-left">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Shield01Icon size={16} className="text-brand" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Total Ballots Cast</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            3,273
          </div>
          <span className="text-[11px] font-mono text-muted-foreground mt-1 block">
            Across 12 elections
          </span>
        </div>

        <div className="bg-card border-2 border-border p-5 text-left">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Time02Icon size={16} className="text-brand" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Peak Voting Hour</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            13:00 UTC
          </div>
          <span className="text-[11px] font-mono text-muted-foreground mt-1 block">
            420 ballots/hr throughput
          </span>
        </div>

        <div className="bg-card border-2 border-border p-5 text-left">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <CheckmarkCircle02Icon size={16} className="text-brand" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Merkle Roots Verified</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            100%
          </div>
          <span className="text-[11px] font-mono text-status-confirmed mt-1 block">
            Zero duplicate attempts
          </span>
        </div>
      </div>

      {/* Domain Participation Breakdown */}
      <div className="bg-card border-2 border-border p-6 text-left space-y-5">
        <h2 className="text-lg font-heading font-medium text-foreground">
          Turnout Breakdown by Institutional Domain
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">@oauife.edu.ng (Faculty of Technology)</span>
              <span className="text-brand font-bold">78.1% (879/1,125)</span>
            </div>
            <div className="w-full h-2 bg-muted border border-border">
              <div className="h-full bg-brand" style={{ width: "78.1%" }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">@oauife.edu.ng (Student Union Government)</span>
              <span className="text-brand font-bold">82.4% (1,420/1,723)</span>
            </div>
            <div className="w-full h-2 bg-muted border border-border">
              <div className="h-full bg-brand" style={{ width: "82.4%" }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">@oauife.edu.ng (Postgraduate Studies)</span>
              <span className="text-brand font-bold">68.2% (532/780)</span>
            </div>
            <div className="w-full h-2 bg-muted border border-border">
              <div className="h-full bg-brand" style={{ width: "68.2%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
