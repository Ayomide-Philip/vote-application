"use client";

import { useState } from "react";
import {
  CheckmarkCircle02Icon,
  FileValidationIcon,
  LockKeyIcon,
  QrCodeIcon,
} from "hugeicons-react";

export function HeroReceiptPreview() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSimulateVerify = () => {
    if (verified) {
      setVerified(false);
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 450);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      {/* Container with Style 3 Crisp Geometry */}
      <div className="receipt-card bg-card border-2 border-border p-6 sm:p-7 relative">
        {/* Top Ledger Accession Header */}
        <div className="receipt-header flex items-center justify-between pb-4 mb-5 border-b-2 border-dashed border-border">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-subtle uppercase mb-0.5">
              OFFICIAL LEDGER SLIP
            </div>
            <h3 className="receipt-title text-base font-medium font-heading text-foreground">
              Certified Voting Receipt
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-confirmed">
              <span className="badge-dot" />
              RECORDED
            </span>
          </div>
        </div>

        {/* Ledger Metadata Rows */}
        <div className="space-y-3 font-mono text-xs mb-6">
          <div className="receipt-row flex justify-between items-center py-1.5 border-b border-border/40">
            <span className="receipt-label text-subtle uppercase tracking-wider text-[11px]">
              Election Code
            </span>
            <span className="receipt-value font-medium text-foreground">
              OAU-ENG-24
            </span>
          </div>

          <div className="receipt-row flex justify-between items-center py-1.5 border-b border-border/40">
            <span className="receipt-label text-subtle uppercase tracking-wider text-[11px]">
              Contest Title
            </span>
            <span className="text-foreground text-right truncate max-w-50">
              Faculty Executive Board
            </span>
          </div>

          <div className="receipt-row flex justify-between items-center py-1.5 border-b border-border/40">
            <span className="receipt-label text-subtle uppercase tracking-wider text-[11px]">
              Domain Gate
            </span>
            <span className="text-brand font-medium">@oauife.edu.ng</span>
          </div>

          <div className="receipt-row flex justify-between items-center py-1.5 border-b border-border/40">
            <span className="receipt-label text-subtle uppercase tracking-wider text-[11px]">
              Voter Privacy
            </span>
            <span className="text-status-confirmed flex items-center gap-1 font-medium">
              <LockKeyIcon size={12} />
              Identity Unlinked
            </span>
          </div>

          <div className="receipt-row flex justify-between items-center py-1.5 border-b border-border/40">
            <span className="receipt-label text-subtle uppercase tracking-wider text-[11px]">
              Audit Hash
            </span>
            <span className="text-brand font-medium">8f94a2b1...e78b20</span>
          </div>
        </div>

        {/* Verification Status Simulation Box */}
        {verified ? (
          <div className="p-4 bg-status-confirmed/10 border border-status-confirmed/30 mb-5 text-xs font-mono space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-status-confirmed font-medium uppercase tracking-wider">
              <CheckmarkCircle02Icon size={16} />
              <span>Ballot Confirmed in Tally</span>
            </div>
            <p className="text-muted-foreground text-[11px]">
              Cryptographic proof verified against public ledger block #1402.
              Choice integrity preserved.
            </p>
          </div>
        ) : (
          <div className="p-3.5 bg-muted/60 border border-border mb-5 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2 text-subtle">
              <QrCodeIcon size={18} className="text-brand" />
              <span>Public Verification Protocol</span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              SHA-256 Validated
            </span>
          </div>
        )}

        {/* Interactive Verification Action */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleSimulateVerify}
            disabled={verifying}
            className={`btn flex-1 text-xs py-2.5 ${
              verified ? "btn-secondary" : "btn-primary"
            }`}
          >
            {verifying ? (
              <span>Auditing Merkle Proof...</span>
            ) : verified ? (
              <span>Reset Sample</span>
            ) : (
              <>
                <FileValidationIcon size={15} />
                <span>Simulate Receipt Audit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
