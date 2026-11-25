"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Share01Icon,
  Shield01Icon,
  Ticket01Icon,
} from "hugeicons-react";

interface VotingRecord {
  id: string;
  electionTitle: string;
  electionCode: string;
  votedAt: string;
  receiptHash: string;
  merkleRoot: string;
  status: "CONCLUDED" | "LIVE_SEALED";
}

const VOTING_HISTORY: VotingRecord[] = [
  {
    id: "rec-1",
    electionTitle: "Student Union Government General Presidential Ballot",
    electionCode: "OAU-SUG-26",
    votedAt: "2026-11-20 14:22:08 UTC",
    receiptHash: "0x7f4e91ba0482cf19028a38c019d5b",
    merkleRoot: "0x892a01ce9411ff2308bb",
    status: "LIVE_SEALED",
  },
  {
    id: "rec-2",
    electionTitle: "Postgraduate Hall of Residence Executive Representative",
    electionCode: "PG-HALL-25",
    votedAt: "2026-11-12 09:15:33 UTC",
    receiptHash: "0x3a19c8d55198ef01bc8900fa27b4",
    merkleRoot: "0x1174cd998b22fa40590a",
    status: "CONCLUDED",
  },
];

export default function VotingHistoryPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<VotingRecord | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedReceipt(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left pb-6 border-b-2 border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
            Voting History &amp; Audit Receipts
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review your submitted ballots, inspect cryptographic receipts, and verify tally inclusion.
          </p>
        </div>

        <Link
          href="/#how-it-works"
          className="btn btn-secondary h-11 px-5 text-xs font-bold tracking-wider flex items-center gap-2 self-start sm:self-auto"
        >
          <Ticket01Icon size={16} />
          <span>Join Active Ballot</span>
        </Link>
      </div>

      <div className="space-y-4">
        {VOTING_HISTORY.map((record) => (
          <div
            key={record.id}
            className="bg-card border-2 border-border p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-foreground/30 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 bg-muted border border-border text-foreground font-semibold uppercase">
                  {record.electionCode}
                </span>

                {record.status === "LIVE_SEALED" ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand/10 border border-brand/30 text-brand font-mono text-[10px] uppercase font-medium">
                    <Shield01Icon size={11} />
                    Ballot Sealed &amp; Counted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[10px] uppercase font-medium">
                    <CheckmarkCircle02Icon size={11} />
                    Election Concluded
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-heading font-medium text-foreground">
                {record.electionTitle}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                <span>Voted: {record.votedAt}</span>
                <span>•</span>
                <span className="text-brand">Receipt: {record.receiptHash}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSelectedReceipt(record)}
                className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-2"
              >
                <Share01Icon size={14} />
                <span>View Certified Slip</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedReceipt && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedReceipt(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              aria-label="Close"
            >
              <Cancel01Icon size={18} />
            </button>

            <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-brand/10 border border-brand/30 text-brand font-mono text-[10px] uppercase font-bold tracking-wider">
                  Official Cryptographic Receipt
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {selectedReceipt.electionCode}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
                {selectedReceipt.electionTitle}
              </h2>
            </div>

            <div className="space-y-4 font-mono text-xs border-b-2 border-dashed border-border pb-6">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Ballot Serial Hash
                </span>
                <div className="flex items-center justify-between p-2.5 bg-muted/50 border border-border">
                  <span className="text-brand truncate mr-2 font-mono text-xs">
                    {selectedReceipt.receiptHash}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedReceipt.receiptHash)}
                    className="p-1 hover:text-brand transition-colors shrink-0"
                    title="Copy Receipt Hash"
                  >
                    <Copy01Icon size={14} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Merkle Tree Root Commitment
                </span>
                <div className="flex items-center justify-between p-2.5 bg-muted/50 border border-border">
                  <span className="text-foreground truncate mr-2 font-mono text-xs">
                    {selectedReceipt.merkleRoot}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedReceipt.merkleRoot)}
                    className="p-1 hover:text-brand transition-colors shrink-0"
                    title="Copy Merkle Root"
                  >
                    <Copy01Icon size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                    Timestamp
                  </span>
                  <span className="text-foreground font-semibold">
                    {selectedReceipt.votedAt}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                    Proof Status
                  </span>
                  <span className="text-status-confirmed font-semibold uppercase">
                    Mathematical Proof Valid
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted-foreground">
                {copiedCode ? "Hash copied to clipboard!" : "Zero voter identity linkage."}
              </span>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="btn btn-primary h-10 px-5 text-xs font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
