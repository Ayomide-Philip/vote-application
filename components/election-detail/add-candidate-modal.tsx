"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import { Add01Icon, Cancel01Icon } from "hugeicons-react";
import { CandidateItem } from "./types";

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  positions: string[];
  onAdd: (candidate: Omit<CandidateItem, "id" | "votes">) => void;
}

export function AddCandidateModal({
  isOpen,
  onClose,
  positions,
  onAdd,
}: AddCandidateModalProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(positions[0] || "President");
  const [department, setDepartment] = useState("");
  const [manifesto, setManifesto] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) {
      gooeyToast.error("Please provide candidate name and department.");
      return;
    }

    onAdd({
      name: name.trim(),
      position,
      department: department.trim(),
      manifesto:
        manifesto.trim() ||
        "Committed to transparent representation and student welfare.",
    });

    gooeyToast.success(`${name.trim()} added to ${position}.`);
    setName("");
    setDepartment("");
    setManifesto("");
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
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <Cancel01Icon size={18} />
        </button>

        <div className="mb-5 pb-4 border-b border-border">
          <div className="w-9 h-9 bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mb-3">
            <Add01Icon size={18} />
          </div>
          <h2 className="text-xl font-medium font-heading text-foreground">
            Add Candidate
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Full Name
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
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="text-input h-11 w-full text-xs font-sans bg-card cursor-pointer"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Computer Science"
              required
              className="text-input h-11 w-full text-xs font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
              Manifesto
            </label>
            <textarea
              value={manifesto}
              onChange={(e) => setManifesto(e.target.value)}
              placeholder="Key promises or agenda..."
              rows={3}
              className="text-input w-full text-xs font-sans resize-none"
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
