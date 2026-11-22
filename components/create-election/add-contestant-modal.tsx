"use client";

import { useState } from "react";
import { Add01Icon, Cancel01Icon } from "hugeicons-react";
import { InitialCandidate } from "./types";

interface AddContestantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandidate: (candidate: Omit<InitialCandidate, "id">) => void;
}

export function AddContestantModal({
  isOpen,
  onClose,
  onAddCandidate,
}: AddContestantModalProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("President");
  const [department, setDepartment] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) {
      setFormError("Please provide both legal name and department.");
      return;
    }

    onAddCandidate({
      name: name.trim(),
      position,
      department: department.trim(),
      manifesto:
        manifesto.trim() ||
        "Dedicated to transparent student leadership and representation.",
    });

    setName("");
    setDepartment("");
    setManifesto("");
    setFormError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
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
          <div className="w-9 h-9 bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mb-3">
            <Add01Icon size={18} />
          </div>
          <h2 className="text-xl font-medium font-heading text-foreground">
            Add Contestant
          </h2>
          <p className="text-muted-foreground text-xs font-sans mt-1">
            Register a qualified candidate for this election.
          </p>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-status-rejected/10 border border-status-rejected/30 text-xs font-sans text-status-rejected">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Olamide Bakare"
              required
              className="text-input h-11 w-full text-xs font-sans"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Contested Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="text-input h-11 w-full text-xs font-sans bg-card cursor-pointer"
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="General Secretary">General Secretary</option>
              <option value="Financial Secretary">Financial Secretary</option>
              <option value="Public Relations Officer">
                Public Relations Officer
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Academic Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              required
              className="text-input h-11 w-full text-xs font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Campaign Manifesto
            </label>
            <textarea
              value={manifesto}
              onChange={(e) => setManifesto(e.target.value)}
              placeholder="Key campaign promises or agenda..."
              rows={3}
              className="text-input w-full p-2.5 text-xs font-sans resize-none"
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
              className="btn btn-primary h-10 px-5 text-xs font-bold cursor-pointer"
            >
              Register Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
