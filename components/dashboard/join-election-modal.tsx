"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
import { ArrowRight01Icon, Cancel01Icon, Ticket01Icon } from "hugeicons-react";

interface JoinElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoined?: () => void;
}

export function JoinElectionModal({
  isOpen,
  onClose,
  onJoined,
}: JoinElectionModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  if (!isOpen) return null;

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      gooeyToast.error("Please enter a valid election code.");
      return;
    }

    setIsJoining(true);
    try {
      const res = await fetch("/api/election/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ election_code: trimmed }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        gooeyToast.error(data.error || "Unable to join election.");
        setIsJoining(false);
        return;
      }

      gooeyToast.success(data.message || "Successfully joined election.");
      setCode("");
      setIsJoining(false);
      onJoined?.();
      onClose();

      if (data.data?.status === "approved" && data.data?.election_id) {
        router.push(`/dashboard/elections/${data.data.election_id}`);
      }
    } catch {
      gooeyToast.error("Network error while joining election.");
      setIsJoining(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
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
            Enter the accession code provided by your department or faculty.
          </p>
        </div>

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
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. OAU-CSC-1024"
              className="text-input h-11 w-full text-xs font-mono uppercase"
              autoFocus
            />
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
              disabled={isJoining}
              className="btn btn-primary h-10 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isJoining ? "Joining..." : "Join Ballot"}</span>
              <ArrowRight01Icon size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
