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
      <div className="pb-6 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
          Settings &amp; Access Controls
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage your institutional identity, verified email domains, and cryptographic voter privacy parameters.
        </p>
      </div>

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
                className="text-input h-11 w-full text-xs font-mono bg-muted/40 pl-9!"
              />
              <Mail01Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brand"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-brand/5 border border-brand/20 text-xs">
          <Shield01Icon size={18} className="text-brand shrink-0" />
          <p className="text-muted-foreground">
            Identity verified via institutional single sign-on with recognized campus domain{" "}
            <span className="font-mono text-brand font-semibold">@oauife.edu.ng</span>.
          </p>
        </div>
      </div>

      <div className="bg-card border-2 border-border p-6 space-y-6">
        <h2 className="text-lg font-heading font-medium text-foreground pb-3 border-b border-border/60">
          Voter Identity Decoupling Policy
        </h2>

        <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-start gap-3">
            <CheckmarkCircle02Icon size={18} className="text-status-confirmed shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground block font-heading text-sm">
                Blind Signature Guarantee
              </strong>
              Your institutional identity token authorizes ballot issuance, but is cryptographically separated from the final cast ballot.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LockKeyIcon size={18} className="text-brand shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground block font-heading text-sm">
                Tamper-Evident Receipts
              </strong>
              Audit receipts verify that your individual vote was counted in the final tally without revealing your candidate choices to administrators.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
