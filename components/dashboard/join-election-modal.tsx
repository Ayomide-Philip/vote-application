"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight01Icon, Cancel01Icon, Ticket01Icon } from "hugeicons-react";

interface JoinElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinElectionModal({
  isOpen,
  onClose,
}: JoinElectionModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError("Please enter a valid election code.");
      return;
    }

    setError(null);
    onClose();
    router.push(`/election/${trimmed}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <Cancel01Icon size={18} />
        </button>

        <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
          <div className="w-10 h-10 bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mb-3">
            <Ticket01Icon size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
            Join an Election
          </h2>
          <p className="text-muted-foreground text-xs font-sans mt-1">
            Enter the accession code provided by your department or faculty to access the live ballot.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-status-rejected/10 border border-status-rejected/30 text-xs font-sans text-status-rejected">
            {error}
          </div>
        )}

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label
              htmlFor="accessionCode"
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              Election Accession Code
            </label>
            <input
              id="accessionCode"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              placeholder="e.g. OAU-TECH-26"
              className="text-input h-11 w-full text-xs font-sans uppercase tracking-wider"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-sans text-muted-foreground">
            <span>Quick codes:</span>
            {["OAU-TECH-26", "OAU-SUG-26", "NACOS-2026"].map((quickCode) => (
              <button
                key={quickCode}
                type="button"
                onClick={() => setCode(quickCode)}
                className="px-2 py-0.5 bg-muted hover:bg-muted/80 border border-border text-foreground cursor-pointer transition-colors"
              >
                {quickCode}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary h-10 px-4 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary h-10 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Join Ballot</span>
              <ArrowRight01Icon size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
