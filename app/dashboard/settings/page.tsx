"use client";

import {
  CheckmarkCircle02Icon,
  LockKeyIcon,
  Mail01Icon,
  Shield01Icon,
} from "hugeicons-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="pb-6 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Settings &amp; Access Controls
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage your institutional identity, verified email domains, and cryptographic voter privacy parameters.
        </p>
      </div>

      {/* Account Identity Card */}
      <div className="bg-card border-2 border-border p-6 space-y-6">
        <h2 className="text-lg font-heading font-medium text-foreground pb-3 border-b border-border/60">
          Institutional Account Affiliation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
              Full Legal Name
            </label>
            <input
              type="text"
              readOnly
              value="Katherine Adeyemi"
              className="text-input h-11 w-full text-xs font-sans bg-muted/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
              Institutional Email
            </label>
            <div className="relative">
              <input
                type="email"
                readOnly
                value="k.adeyemi@oauife.edu.ng"
                className="text-input h-11 w-full text-xs font-mono bg-muted/40 !pl-10"
              />
              <Mail01Icon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
            <span className="text-[11px] font-mono text-status-confirmed flex items-center gap-1 mt-1">
              <CheckmarkCircle02Icon size={12} />
              Verified Campus Domain (@oauife.edu.ng)
            </span>
          </div>
        </div>
      </div>

      {/* Cryptographic Privacy Guarantee Card */}
      <div className="bg-card border-2 border-border p-6 space-y-4">
        <div className="flex items-center gap-2 text-brand text-xs font-mono uppercase tracking-wider">
          <Shield01Icon size={16} />
          <span>Voter Decoupling Policy</span>
        </div>

        <h2 className="text-lg font-heading font-medium text-foreground">
          Secret Ballot Cryptographic Architecture
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Your account credentials are valid for election access, but are strictly decoupled from ballot submissions. When you vote, the record verifying your participation is written independently of your candidate choices. No administrator, tally observer, or faculty head can connect your vote to your user record.
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <LockKeyIcon size={14} className="text-brand shrink-0" />
          <span>Section 3.1 &amp; 7.2 of Ballot Protocol Active</span>
        </div>
      </div>
    </div>
  );
}
