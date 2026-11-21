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
      {/* Header */}
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

      {/* Receipts List */}
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

      {/* Cryptographic Receipt Slip Modal */}
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
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
                Proof of Submission
              </h2>
              <p className="text-muted-foreground text-xs font-mono mt-1">
                Receipt Serial: {selectedReceipt.receiptHash}
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs border-b-2 border-dashed border-border pb-5">
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Election Code:</span>
                <span className="font-bold text-foreground">{selectedReceipt.electionCode}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="text-foreground">{selectedReceipt.votedAt}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Voter Affiliation:</span>
                <span className="text-status-confirmed font-semibold">@oauife.edu.ng (Verified)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Merkle Root:</span>
                <span className="text-foreground">{selectedReceipt.merkleRoot}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Audit Status:</span>
                <span className="text-status-confirmed font-semibold">VERIFIED &amp; COUNTED</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/40 border border-border text-[11px] font-mono text-muted-foreground leading-relaxed">
              <strong>Cryptographic Decoupling:</strong> This receipt proves your ballot was committed into the immutable tally without revealing your candidate selections.
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => handleCopy(selectedReceipt.receiptHash)}
                className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Copy01Icon size={14} />
                <span>{copiedCode === selectedReceipt.receiptHash ? "Copied!" : "Copy Receipt Hash"}</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="btn btn-primary h-10 px-5 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
