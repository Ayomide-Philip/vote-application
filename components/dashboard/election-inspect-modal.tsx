"use client";

import { Cancel01Icon, Copy01Icon } from "hugeicons-react";
import { ElectionCardItem } from "./types";

interface ElectionInspectModalProps {
  election: ElectionCardItem | null;
  onClose: () => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

export function ElectionInspectModal({
  election,
  onClose,
  onCopyCode,
  copiedCode,
}: ElectionInspectModalProps) {
  if (!election) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-inspection-title"
    >
      <div
        className="w-full max-w-lg bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand cursor-pointer"
          aria-label="Close modal"
        >
          <Cancel01Icon size={18} />
        </button>

        <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
          <h2
            id="modal-inspection-title"
            className="text-xl sm:text-2xl font-medium font-heading text-foreground"
          >
            {election.title}
          </h2>
          <p className="text-muted-foreground text-xs font-sans mt-1">
            Accession Code: {election.code}
          </p>
        </div>

        <div className="space-y-3 font-sans text-xs border-b-2 border-dashed border-border pb-5">
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-bold text-foreground uppercase">
              {election.status}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">Institutional Domain:</span>
            <span className="text-status-confirmed font-semibold">
              {election.allowedDomain}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/40">
            <span className="text-muted-foreground">Total Ballots Cast:</span>
            <span className="text-foreground">
              {election.ballotsCast.toLocaleString()} verified ballots
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-muted-foreground">Certified Turnout:</span>
            <span className="text-foreground font-bold">
              {election.turnoutRate}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => onCopyCode(election.code)}
            className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Copy01Icon size={14} />
            <span>
              {copiedCode === election.code ? "Code Copied!" : "Copy Join Code"}
            </span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary h-10 px-5 text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
