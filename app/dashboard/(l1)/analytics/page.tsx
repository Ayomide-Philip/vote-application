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
      <div className="text-left pb-6 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Analytics &amp; Real-Time Tallies
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Cryptographically audited voter turnout metrics across participating academic departments and domains.
        </p>
      </div>

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
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Avg Voting Time</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            42s
          </div>
          <span className="text-[11px] font-mono text-muted-foreground mt-1 block">
            From auth to receipt
          </span>
        </div>

        <div className="bg-card border-2 border-border p-5 text-left">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <CheckmarkCircle02Icon size={16} className="text-brand" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider">Proof Verification</span>
          </div>
          <div className="mt-3 text-3xl font-heading font-medium text-foreground">
            100%
          </div>
          <span className="text-[11px] font-mono text-status-confirmed mt-1 block">
            Zero mathematical discrepancies
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-heading font-medium text-foreground text-left">
          Turnout by Academic Unit / Department
        </h2>

        <div className="bg-card border-2 border-border overflow-x-auto text-left">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b-2 border-border bg-muted/40 font-heading font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 text-left">Department / Unit</th>
                <th className="py-3 px-4 text-left">Domain Filter</th>
                <th className="py-3 px-4 text-right">Registered</th>
                <th className="py-3 px-4 text-right">Ballots Cast</th>
                <th className="py-3 px-4 text-right">Turnout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/20">
                <td className="py-3.5 px-4 font-sans font-medium text-foreground">Computer Science &amp; Engineering</td>
                <td className="py-3.5 px-4 text-brand">@oauife.edu.ng</td>
                <td className="py-3.5 px-4 text-right text-muted-foreground">1,200</td>
                <td className="py-3.5 px-4 text-right text-foreground font-bold">1,015</td>
                <td className="py-3.5 px-4 text-right text-status-confirmed font-bold">84.6%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3.5 px-4 font-sans font-medium text-foreground">Faculty of Technology Exco</td>
                <td className="py-3.5 px-4 text-brand">@oauife.edu.ng</td>
                <td className="py-3.5 px-4 text-right text-muted-foreground">1,125</td>
                <td className="py-3.5 px-4 text-right text-foreground font-bold">879</td>
                <td className="py-3.5 px-4 text-right text-status-confirmed font-bold">78.1%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3.5 px-4 font-sans font-medium text-foreground">Postgraduate Hall Assembly</td>
                <td className="py-3.5 px-4 text-brand">@oauife.edu.ng</td>
                <td className="py-3.5 px-4 text-right text-muted-foreground">780</td>
                <td className="py-3.5 px-4 text-right text-foreground font-bold">532</td>
                <td className="py-3.5 px-4 text-right text-muted-foreground font-bold">68.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
